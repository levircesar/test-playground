'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Card, 
  Form, 
  Input, 
  Upload, 
  Button, 
  message, 
  Space, 
  Typography, 
  Row, 
  Col,
  Table,
  Popconfirm,
  Modal,
  Spin,
  Checkbox
} from 'antd';
import { 
  UploadOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  PlusOutlined,
  PlayCircleOutlined,
  ArrowLeftOutlined,
  YoutubeOutlined
} from '@ant-design/icons';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useVideos, Video, VideoUploadData } from '@/lib/hooks/useVideos';
import ProtectedRoute from '@/components/ProtectedRoute';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function AdminVideosPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const { videos, loading, uploadVideo, updateVideo, deleteVideo } = useVideos();
  
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [uploadForm] = Form.useForm();
  const [editForm] = Form.useForm();

  // Verificar se é admin
  if (!isAdmin) {
    return (
      <ProtectedRoute>
        <div style={{ padding: '50px', textAlign: 'center' }}>
          <Title level={2}>Acesso Negado</Title>
          <Text>Apenas administradores podem acessar esta página.</Text>
        </div>
      </ProtectedRoute>
    );
  }

  const handleUpload = async (values: any) => {
    try {
      console.log('📤 Valores do formulário:', values);
      
      // Verificar se está usando YouTube
      const useYoutube = values.useYoutube || false;
      const youtubeUrl = values.youtubeUrl || '';
      
      // Se não está usando YouTube, verificar se há arquivo de vídeo
      if (!useYoutube) {
        if (!values.videoFile || !Array.isArray(values.videoFile) || values.videoFile.length === 0) {
          console.log('❌ Nenhum arquivo de vídeo selecionado e não está usando YouTube');
          message.error('Por favor, selecione um vídeo ou marque para usar YouTube');
          return;
        }

        const videoFile = values.videoFile[0];
        console.log('📁 Arquivo de vídeo:', videoFile);
        
        if (!videoFile || !videoFile.originFileObj) {
          console.log('❌ Arquivo de vídeo inválido:', videoFile);
          message.error('Arquivo de vídeo inválido');
          return;
        }
      }

      const videoData: VideoUploadData = {
        title: values.title,
        description: values.description,
        videoFile: values.videoFile?.[0]?.originFileObj || new File([], 'placeholder.mp4', { type: 'video/mp4' }),
        thumbnailFile: values.thumbnailFile?.[0]?.originFileObj,
        youtubeUrl: youtubeUrl,
        useYoutube: useYoutube,
      };

      console.log('📤 Dados do vídeo preparados:', videoData);

      await uploadVideo(videoData, user?.email || '');
      message.success('Vídeo enviado com sucesso!');
      uploadForm.resetFields();
      setUploadModalVisible(false);
    } catch (error) {
      console.error('Erro no upload:', error);
      message.error('Erro ao enviar vídeo');
    }
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    editForm.setFieldsValue({
      title: video.title,
      description: video.description,
      youtubeUrl: video.youtubeUrl,
      useYoutube: video.useYoutube,
    });
    setEditModalVisible(true);
  };

  const handleUpdate = async (values: any) => {
    if (!editingVideo) return;

    try {
      const updates: any = {
        title: values.title,
        description: values.description,
        youtubeUrl: values.youtubeUrl || '',
        useYoutube: values.useYoutube || false,
      };

      // Verificar se há novo arquivo de vídeo
      if (values.videoFile && Array.isArray(values.videoFile) && values.videoFile.length > 0) {
        const videoFile = values.videoFile[0];
        if (videoFile && videoFile.originFileObj) {
          updates.videoFile = videoFile.originFileObj;
        }
      }

      // Verificar se há nova thumbnail
      if (values.thumbnailFile && Array.isArray(values.thumbnailFile) && values.thumbnailFile.length > 0) {
        const thumbnailFile = values.thumbnailFile[0];
        if (thumbnailFile && thumbnailFile.originFileObj) {
          updates.thumbnailFile = thumbnailFile.originFileObj;
        }
      }

      await updateVideo(editingVideo.id, updates, user?.email || '');
      message.success('Vídeo atualizado com sucesso!');
      editForm.resetFields();
      setEditModalVisible(false);
      setEditingVideo(null);
    } catch (error) {
      console.error('Erro na atualização:', error);
      message.error('Erro ao atualizar vídeo');
    }
  };

  const handleDelete = async (videoId: string) => {
    try {
      await deleteVideo(videoId);
      message.success('Vídeo deletado com sucesso!');
    } catch (error) {
      console.error('Erro na exclusão:', error);
      message.error('Erro ao deletar vídeo');
    }
  };

  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      render: (title: string, record: Video) => (
        <Space>
          <span>{title}</span>
          {record.useYoutube && (
            <YoutubeOutlined style={{ color: '#ff0000', fontSize: '16px' }} title="Vídeo do YouTube" />
          )}
        </Space>
      ),
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      width: 300,
    },
    {
      title: 'Data de Criação',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (date: Date) => date.toLocaleDateString('pt-BR'),
    },
    {
      title: 'Ações',
      key: 'actions',
      width: 150,
      render: (_: any, record: Video) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => window.open(record.videoUrl, '_blank')}
            title="Visualizar vídeo"
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            title="Editar"
          />
          <Popconfirm
            title="Tem certeza que deseja deletar este vídeo?"
            onConfirm={() => handleDelete(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              title="Deletar"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <ProtectedRoute>
      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
          <Col>
            <Space>
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => router.push('/admin/challenges')}
              >
                Voltar ao Painel Admin
              </Button>
              <Title level={2} style={{ margin: 0 }}>
                <PlayCircleOutlined style={{ marginRight: '8px' }} />
                Gerenciamento de Vídeos
              </Title>
            </Space>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setUploadModalVisible(true)}
            >
              Adicionar Vídeo
            </Button>
          </Col>
        </Row>

        <Card>
          <Spin spinning={loading}>
            <Table
              columns={columns}
              dataSource={videos}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Total: ${total} vídeos`,
              }}
            />
          </Spin>
        </Card>

        {/* Modal de Upload */}
        <Modal
          title="Adicionar Novo Vídeo"
          open={uploadModalVisible}
          onCancel={() => {
            setUploadModalVisible(false);
            uploadForm.resetFields();
          }}
          footer={null}
          width={600}
        >
          <Form
            form={uploadForm}
            layout="vertical"
            onFinish={handleUpload}
          >
            <Form.Item
              name="title"
              label="Título"
              rules={[{ required: true, message: 'Por favor, insira o título' }]}
            >
              <Input placeholder="Título do vídeo" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Descrição"
              rules={[{ required: true, message: 'Por favor, insira a descrição' }]}
            >
              <TextArea
                rows={4}
                placeholder="Descrição do vídeo"
              />
            </Form.Item>

            <Form.Item
              name="youtubeUrl"
              label="Link do YouTube (Opcional)"
              rules={[
                {
                  validator: (_, value) => {
                    const form = uploadForm;
                    const useYoutube = form?.getFieldValue('useYoutube');
                    
                    // Se está usando YouTube, validar se a URL foi fornecida
                    if (useYoutube && (!value || value.trim() === '')) {
                      return Promise.reject(new Error('Por favor, forneça um link do YouTube'));
                    }
                    
                    // Se tem URL, validar formato básico
                    if (value && value.trim() !== '') {
                      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
                      if (!youtubeRegex.test(value)) {
                        return Promise.reject(new Error('Por favor, forneça um link válido do YouTube'));
                      }
                    }
                    
                    return Promise.resolve();
                  }
                }
              ]}
            >
              <Input 
                placeholder="https://www.youtube.com/watch?v=..." 
                prefix={<YoutubeOutlined style={{ color: '#ff0000' }} />}
              />
            </Form.Item>

            <Form.Item
              name="useYoutube"
              valuePropName="checked"
            >
              <Checkbox>
                Exibir vídeo do YouTube em vez do arquivo enviado
              </Checkbox>
            </Form.Item>

            <Form.Item
              name="videoFile"
              label="Vídeo"
              rules={[
                {
                  validator: (_, value) => {
                    const form = uploadForm;
                    const useYoutube = form?.getFieldValue('useYoutube');
                    const youtubeUrl = form?.getFieldValue('youtubeUrl');
                    
                    // Se não está usando YouTube, o vídeo é obrigatório
                    if (!useYoutube && (!value || !Array.isArray(value) || value.length === 0)) {
                      return Promise.reject(new Error('Por favor, selecione um vídeo ou marque para usar YouTube'));
                    }
                    
                    // Se tem vídeo, validar se é válido
                    if (value && Array.isArray(value) && value.length > 0) {
                      const file = value[0];
                      if (!file || !file.originFileObj) {
                        return Promise.reject(new Error('Arquivo de vídeo inválido'));
                      }
                    }
                    
                    // Se está usando YouTube, validar URL
                    if (useYoutube && (!youtubeUrl || youtubeUrl.trim() === '')) {
                      return Promise.reject(new Error('Por favor, forneça um link do YouTube'));
                    }
                    
                    return Promise.resolve();
                  }
                }
              ]}
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              }}
            >
              <Upload.Dragger
                accept="video/*"
                maxCount={1}
                beforeUpload={() => false} // Prevent auto upload
                listType="text"
                showUploadList={{
                  showPreviewIcon: false,
                  showRemoveIcon: true,
                }}
              >
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="ant-upload-text">Clique ou arraste um vídeo aqui</p>
                <p className="ant-upload-hint">
                  Suporte para arquivos de vídeo (MP4, AVI, MOV, etc.)
                </p>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item
              name="thumbnailFile"
              label="Thumbnail (Opcional)"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              }}
            >
              <Upload.Dragger
                accept="image/*"
                maxCount={1}
                beforeUpload={() => false}
                listType="text"
                showUploadList={{
                  showPreviewIcon: true,
                  showRemoveIcon: true,
                }}
              >
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="ant-upload-text">Clique ou arraste uma imagem aqui</p>
                <p className="ant-upload-hint">
                  Imagem de capa para o vídeo (opcional)
                </p>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Space>
                <Button onClick={() => setUploadModalVisible(false)}>
                  Cancelar
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Enviar Vídeo
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal de Edição */}
        <Modal
          title="Editar Vídeo"
          open={editModalVisible}
          onCancel={() => {
            setEditModalVisible(false);
            setEditingVideo(null);
            editForm.resetFields();
          }}
          footer={null}
          width={600}
        >
          <Form
            form={editForm}
            layout="vertical"
            onFinish={handleUpdate}
          >
            <Form.Item
              name="title"
              label="Título"
              rules={[{ required: true, message: 'Por favor, insira o título' }]}
            >
              <Input placeholder="Título do vídeo" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Descrição"
              rules={[{ required: true, message: 'Por favor, insira a descrição' }]}
            >
              <TextArea
                rows={4}
                placeholder="Descrição do vídeo"
              />
            </Form.Item>

            <Form.Item
              name="youtubeUrl"
              label="Link do YouTube (Opcional)"
            >
              <Input 
                placeholder="https://www.youtube.com/watch?v=..." 
                prefix={<YoutubeOutlined style={{ color: '#ff0000' }} />}
              />
            </Form.Item>

            <Form.Item
              name="useYoutube"
              valuePropName="checked"
            >
              <Checkbox>
                Exibir vídeo do YouTube em vez do arquivo enviado
              </Checkbox>
            </Form.Item>

            <Form.Item
              name="videoFile"
              label="Novo Vídeo (Opcional)"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              }}
            >
              <Upload.Dragger
                accept="video/*"
                maxCount={1}
                beforeUpload={() => false}
                listType="text"
              >
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="ant-upload-text">Clique ou arraste um novo vídeo aqui</p>
                <p className="ant-upload-hint">
                  Deixe em branco para manter o vídeo atual
                </p>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item
              name="thumbnailFile"
              label="Nova Thumbnail (Opcional)"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              }}
            >
              <Upload.Dragger
                accept="image/*"
                maxCount={1}
                beforeUpload={() => false}
                listType="text"
              >
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="ant-upload-text">Clique ou arraste uma nova imagem aqui</p>
                <p className="ant-upload-hint">
                  Deixe em branco para manter a thumbnail atual
                </p>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Space>
                <Button onClick={() => setEditModalVisible(false)}>
                  Cancelar
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Atualizar Vídeo
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </ProtectedRoute>
  );
}
