'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { firestore } from '@/config/firebase';
import { useAuth } from '@/lib/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  Button, 
  Card, 
  Form, 
  Input, 
  Select, 
  Space, 
  Table, 
  Modal, 
  Typography, 
  Tag, 
  message, 
  Popconfirm,
  Row,
  Col,
  Divider,
  Spin,
  Empty
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  LogoutOutlined,
  CodeOutlined,
  TeamOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface Challenge {
  id: string;
  titulo: string;
  nivel: string;
  tipo: string;
  tags: string[];
  rota: string;
  descricao: string;
  resultadoEsperado: string;
  solucaoPlaywright: string;
  solucaoCypress: string;
  traducoes: {
    'pt-BR': {
      titulo: string;
      descricao: string;
      resultadoEsperado: string;
    };
    'en-US': {
      titulo: string;
      descricao: string;
      resultadoEsperado: string;
    };
    'fr-FR': {
      titulo: string;
      descricao: string;
      resultadoEsperado: string;
    };
  };
}

export default function AdminChallenges() {
  const { user, userRole, loading: authLoading, isAdmin, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading) {
      if (user && userRole) {
        // Verificar se o usuário tem permissão para acessar a página admin
        if (userRole.role !== 'admin') {
          console.log('🔐 Admin: Usuário sem permissão de admin. Role:', userRole.role);
          message.warning('Você não tem permissão para acessar esta área');
          router.push('/');
          return;
        }
        loadChallenges();
      } else if (user && !userRole) {
        // Aguardar o carregamento dos dados do usuário
        return;
      } else {
        router.push('/admin/login');
      }
    }
  }, [user, userRole, authLoading, router]);

  const loadChallenges = async () => {
    try {
      setLoading(true);
      console.log('🔄 Admin: Carregando desafios do Firebase...');
      const challengesRef = collection(firestore, 'playground', 'challenges', 'data');
      // Removendo ordenação temporariamente para debug
      const querySnapshot = await getDocs(challengesRef);
       
      
      const challengesData: Challenge[] = [];
      querySnapshot.forEach((doc) => {
        console.log('📄 Admin: Documento:', doc.id, doc.data());
        challengesData.push({ id: doc.id, ...doc.data() } as Challenge);
      });
      
      console.log('✅ Admin: Desafios carregados:', challengesData.length);
      setChallenges(challengesData);
    } catch (error) {
      console.error('❌ Admin: Erro ao carregar desafios:', error);
      message.error('Erro ao carregar desafios');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleGoToUsers = () => {
    router.push('/admin/users');
  };

  const handleAddChallenge = () => {
    setEditingChallenge(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditChallenge = (challenge: Challenge) => {
    setEditingChallenge(challenge);
    form.setFieldsValue({
      ...challenge,
      tags: challenge.tags.join(', ')
    });
    setModalVisible(true);
  };

  const handleDeleteChallenge = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, 'playground', 'challenges', 'data', id));
      setChallenges(challenges.filter(c => c.id !== id));
      message.success('Desafio excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir desafio:', error);
      message.error('Erro ao excluir desafio');
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const challengeData = {
        ...values,
        tags: values.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag),
        traducoes: {
          'pt-BR': {
            titulo: values.titulo,
            descricao: values.descricao,
            resultadoEsperado: values.resultadoEsperado
          },
          'en-US': {
            titulo: values.tituloEn || values.titulo,
            descricao: values.descricaoEn || values.descricao,
            resultadoEsperado: values.resultadoEsperadoEn || values.resultadoEsperado
          },
          'fr-FR': {
            titulo: values.tituloFr || values.titulo,
            descricao: values.descricaoFr || values.descricao,
            resultadoEsperado: values.resultadoEsperadoFr || values.resultadoEsperado
          }
        }
      };

      if (editingChallenge) {
        await updateDoc(doc(firestore, 'playground', 'challenges', 'data', editingChallenge.id), challengeData);
        setChallenges(challenges.map(c => c.id === editingChallenge.id ? { ...c, ...challengeData } : c));
        message.success('Desafio atualizado com sucesso!');
      } else {
        const docRef = await addDoc(collection(firestore, 'playground', 'challenges', 'data'), challengeData);
        setChallenges([...challenges, { id: docRef.id, ...challengeData }]);
        message.success('Desafio criado com sucesso!');
      }

      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Erro ao salvar desafio:', error);
      message.error('Erro ao salvar desafio');
    }
  };

  const columns = [
    {
      title: 'Título',
      dataIndex: 'titulo',
      key: 'titulo',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Nível',
      dataIndex: 'nivel',
      key: 'nivel',
      width: 100,
      render: (nivel: string) => {
        const color = nivel === 'Fácil' ? 'green' : 
                     nivel === 'Médio' ? 'orange' : 
                     nivel === 'Difícil' ? 'red' : 
                     nivel === 'API' ? 'blue' : 'purple';
        return <Tag color={color}>{nivel}</Tag>;
      },
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipo',
      width: 100,
      render: (tipo: string) => {
        const color = tipo === 'UI' ? 'cyan' : 
                     tipo === 'Upload' ? 'green' : 
                     tipo === 'Iframe' ? 'orange' : 
                     tipo === 'API' ? 'blue' : 'purple';
        return <Tag color={color}>{tipo}</Tag>;
      },
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <Space wrap>
          {tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Ações',
      key: 'actions',
      width: 150,
      fixed: 'right' as const,
      render: (_: any, record: Challenge) => (
        <Space size="small" style={{ width: '100%', justifyContent: 'center' }}>
          {isAdmin && (
            <>
              <Button
                type="primary"
                size="small"
                icon={<EditOutlined />}
                onClick={() => handleEditChallenge(record)}
                style={{ minWidth: '60px' }}
              >
                Editar
              </Button>
              <Popconfirm
                title="Tem certeza que deseja excluir este desafio?"
                onConfirm={() => handleDeleteChallenge(record.id)}
                okText="Sim"
                cancelText="Não"
              >
                <Button
                  type="primary"
                  danger
                  size="small"
                  icon={<DeleteOutlined />}
                  style={{ minWidth: '60px' }}
                >
                  Excluir
                </Button>
              </Popconfirm>
            </>
          )}
          {!isAdmin && (
            <span style={{ color: '#999', fontSize: '12px' }}>
              Apenas admins podem editar
            </span>
          )}
        </Space>
      ),
    },
  ];

  return (
    <ProtectedRoute>
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={2} style={{ marginBottom: 20 }}>
                🎯 Administração de Desafios
              </Title> 
            </Col>
            <Col>
              <Space>
                {isAdmin && (
                  <>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={handleAddChallenge}
                    >
                      Novo Desafio
                    </Button>
                    <Button
                      icon={<TeamOutlined />}
                      onClick={handleGoToUsers}
                    >
                      Gerenciar Usuários
                    </Button>
                  </>
                )}
                <Button
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                >
                  Sair
                </Button>
              </Space>
            </Col>
          </Row>

          <Divider />

          {loading ? (
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <Spin size="large" />
              <div style={{ marginTop: '16px', fontSize: '16px', color: '#666' }}>
                Carregando desafios...
              </div>
            </div>
          ) : challenges.length === 0 ? (
            <div style={{ padding: '50px' }}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Nenhum desafio cadastrado ainda"
                style={{ margin: '40px 0' }}
              >
                {isAdmin && (
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={handleAddChallenge}
                  >
                    Criar Primeiro Desafio
                  </Button>
                )}
              </Empty>
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={challenges}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `${range[0]}-${range[1]} de ${total} desafios`,
              }}
              scroll={{ x: 800 }}
            />
          )}
        </Space>
      </Card>

      <Modal
        title={editingChallenge ? 'Editar Desafio' : 'Novo Desafio'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={800}
        style={{ top: 20 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="titulo"
                label="Título (PT-BR)"
                rules={[{ required: true, message: 'Título é obrigatório' }]}
              >
                <Input placeholder="Digite o título em português" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tituloEn"
                label="Título (EN-US)"
              >
                <Input placeholder="Digite o título em inglês" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="tituloFr"
            label="Título (FR-FR)"
          >
            <Input placeholder="Digite o título em francês" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="nivel"
                label="Nível"
                rules={[{ required: true, message: 'Nível é obrigatório' }]}
              >
                <Select placeholder="Selecione o nível">
                  <Option value="Fácil">Fácil</Option>
                  <Option value="Médio">Médio</Option>
                  <Option value="Difícil">Difícil</Option>
                  <Option value="API">API</Option>
                  <Option value="API+Tela">API+Tela</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="tipo"
                label="Tipo"
                rules={[{ required: true, message: 'Tipo é obrigatório' }]}
              >
                <Select placeholder="Selecione o tipo">
                  <Option value="UI">UI</Option>
                  <Option value="Upload">Upload</Option>
                  <Option value="Iframe">Iframe</Option>
                  <Option value="API">API</Option>
                  <Option value="E2E">E2E</Option>
                  <Option value="Table">Table</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="rota"
                label="Rota"
                rules={[{ required: true, message: 'Rota é obrigatória' }]}
              >
                <Input placeholder="Ex: /roadmap/facil" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="tags"
            label="Tags (separadas por vírgula)"
            rules={[{ required: true, message: 'Tags são obrigatórias' }]}
          >
            <Input placeholder="Ex: button, state, modal" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="descricao"
                label="Descrição (PT-BR)"
                rules={[{ required: true, message: 'Descrição é obrigatória' }]}
              >
                <TextArea rows={3} placeholder="Digite a descrição em português" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="descricaoEn"
                label="Descrição (EN-US)"
              >
                <TextArea rows={3} placeholder="Digite a descrição em inglês" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="descricaoFr"
            label="Descrição (FR-FR)"
          >
            <TextArea rows={3} placeholder="Digite a descrição em francês" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="resultadoEsperado"
                label="Resultado Esperado (PT-BR)"
                rules={[{ required: true, message: 'Resultado esperado é obrigatório' }]}
              >
                <TextArea rows={3} placeholder="Digite o resultado esperado em português" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="resultadoEsperadoEn"
                label="Resultado Esperado (EN-US)"
              >
                <TextArea rows={3} placeholder="Digite o resultado esperado em inglês" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="resultadoEsperadoFr"
            label="Resultado Esperado (FR-FR)"
          >
            <TextArea rows={3} placeholder="Digite o resultado esperado em francês" />
          </Form.Item>

          <Divider>💻 Soluções</Divider>

          <Form.Item
            name="solucaoPlaywright"
            label="Solução Playwright"
            rules={[{ required: true, message: 'Solução Playwright é obrigatória' }]}
          >
            <TextArea 
              rows={8} 
              placeholder="Cole aqui o código completo do teste Playwright"
              style={{ fontFamily: 'monospace' }}
            />
          </Form.Item>

          <Form.Item
            name="solucaoCypress"
            label="Solução Cypress"
            rules={[{ required: true, message: 'Solução Cypress é obrigatória' }]}
          >
            <TextArea 
              rows={8} 
              placeholder="Cole aqui o código completo do teste Cypress"
              style={{ fontFamily: 'monospace' }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setModalVisible(false)}>
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit" icon={<CodeOutlined />}>
                {editingChallenge ? 'Atualizar' : 'Criar'} Desafio
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
    </ProtectedRoute>
  );
}
