'use client';
import { 
  Upload, 
  Button, 
  Typography, 
  Card, 
  Row, 
  Col, 
  Space, 
  Alert, 
  Table, 
  message,
  Progress
} from 'antd';
import { 
  UploadOutlined, 
  InboxOutlined, 
  FileTextOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import XPathTester from '@/components/XPathTester';
import BackButton from '@/components/BackButton';
import RoadmapChallengesButton from '@/components/RoadmapChallengesButton';

const { Title, Paragraph, Text } = Typography;
const { Dragger } = Upload;

interface CSVData {
  headers: string[];
  rows: string[][];
}

export default function MedioPage() {
  const [fileList, setFileList] = useState<any[]>([]);
  const [csvData, setCsvData] = useState<CSVData | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const beforeUpload = (file: File) => {
    const isValidType = file.type === 'text/csv' || file.name.endsWith('.csv');
    if (!isValidType) {
      message.error('Apenas arquivos CSV são permitidos!');
      return false;
    }

    const isValidSize = file.size / 1024 / 1024 < 5; // 5MB
    if (!isValidSize) {
      message.error('Arquivo deve ser menor que 5MB!');
      return false;
    }

    return true;
  };

  const handleUpload = async (options: any) => {
    const { file, onSuccess, onError, onProgress } = options;
    
    setUploading(true);
    setUploadProgress(0);

    // Simular upload com progresso
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          onSuccess('ok');
          message.success('Upload realizado com sucesso!');
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simular leitura do CSV
    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim());
        const rows = lines.slice(1).map(line => 
          line.split(',').map(cell => cell.trim())
        );
        
        setCsvData({ headers, rows });
      };
      reader.readAsText(file);
    }, 1000);
  };

  const handleDragUpload = (info: any) => {
    const { fileList } = info;
    setFileList(fileList);
  };

  const csvColumns = csvData ? csvData.headers.map((header, index) => ({
    title: header,
    dataIndex: index,
    key: index,
  })) : [];

  const csvTableData = csvData ? csvData.rows.map((row, index) => ({
    key: index,
    ...row.reduce((acc, cell, cellIndex) => {
      acc[cellIndex] = cell;
      return acc;
    }, {} as any)
  })) : [];

  return (
    <div data-testid="pp:medio|page|container|root" style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <BackButton href="/desafios" testId="pp:medio|btn|voltar" />
          <RoadmapChallengesButton level="Médio" testId="pp:medio|btn|desafios" />
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Title level={1}>Roadmap Médio</Title>
          <Paragraph style={{ fontSize: '18px', color: '#666' }}>
            Pratique uploads de arquivos, validações e pré-visualização de conteúdo CSV.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {/* Upload Simples */}
          <Col xs={24} lg={12}>
            <Card 
              data-testid="pp:medio|section|card|upload-simples"
              title="Upload Simples"
              style={{ height: '100%' }}
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Upload
                  beforeUpload={beforeUpload}
                  customRequest={handleUpload}
                  fileList={fileList}
                  onChange={handleDragUpload}
                  data-testid="pp:medio|upload|simples"
                  accept=".csv"
                >
                  <Button 
                    icon={<UploadOutlined />} 
                    data-testid="pp:medio|btn|upload-simples"
                  >
                    Selecionar CSV
                  </Button>
                </Upload>

                {uploading && (
                  <div data-testid="pp:medio|progress|upload">
                    <Text>Fazendo upload...</Text>
                    <Progress 
                      percent={uploadProgress} 
                      status={uploadProgress === 100 ? 'success' : 'active'}
                    />
                  </div>
                )}

                <Alert
                  message="Validações"
                  description="Arquivo deve ser CSV e menor que 5MB"
                  type="info"
                  showIcon
                  data-testid="pp:medio|alert|validacoes"
                />
              </Space>
            </Card>
          </Col>

          {/* Upload Drag & Drop */}
          <Col xs={24} lg={12}>
            <Card 
              data-testid="pp:medio|section|card|upload-drag"
              title="Upload Drag & Drop"
              style={{ height: '100%' }}
            >
              <Dragger
                beforeUpload={beforeUpload}
                customRequest={handleUpload}
                fileList={fileList}
                onChange={handleDragUpload}
                data-testid="pp:medio|upload|drag"
                accept=".csv"
                multiple={false}
              >
                <p className="ant-upload-drag-icon" data-testid="pp:medio|drag|icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text" data-testid="pp:medio|drag|text">
                  Clique ou arraste um arquivo CSV para esta área
                </p>
                <p className="ant-upload-hint" data-testid="pp:medio|drag|hint">
                  Suporte para upload de um único arquivo CSV
                </p>
              </Dragger>
            </Card>
          </Col>

          {/* Upload Múltiplo */}
          <Col xs={24}>
            <Card 
              data-testid="pp:medio|section|card|upload-multiplo"
              title="Upload Múltiplo"
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Upload
                  beforeUpload={beforeUpload}
                  customRequest={handleUpload}
                  fileList={fileList}
                  onChange={handleDragUpload}
                  data-testid="pp:medio|upload|multiplo"
                  accept=".csv"
                  multiple
                >
                  <Button 
                    icon={<UploadOutlined />} 
                    data-testid="pp:medio|btn|upload-multiplo"
                  >
                    Selecionar Múltiplos CSVs
                  </Button>
                </Upload>

                <Text type="secondary">
                  Você pode selecionar múltiplos arquivos CSV de uma vez
                </Text>
              </Space>
            </Card>
          </Col>

          {/* Pré-visualização CSV */}
          {csvData && (
            <Col xs={24}>
              <Card 
                data-testid="pp:medio|section|card|preview"
                title="Pré-visualização do CSV"
              >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div data-testid="pp:medio|csv|info">
                    <Text strong>Arquivo processado:</Text>
                    <br />
                    <Text>Colunas: {csvData.headers.length}</Text>
                    <br />
                    <Text>Linhas: {csvData.rows.length}</Text>
                  </div>

                  <Table
                    data-testid="pp:medio|table|csv"
                    columns={csvColumns}
                    dataSource={csvTableData}
                    pagination={{
                      pageSize: 5,
                      showSizeChanger: true,
                      showQuickJumper: true,
                    }}
                    scroll={{ x: 800 }}
                    size="small"
                  />

                  <Button 
                    type="primary" 
                    icon={<FileTextOutlined />}
                    data-testid="pp:medio|btn|download-csv"
                    onClick={() => {
                      const csvContent = [csvData.headers.join(','), ...csvData.rows.map(row => row.join(','))].join('\n');
                      const blob = new Blob([csvContent], { type: 'text/csv' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'processed_data.csv';
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    Baixar CSV Processado
                  </Button>
                </Space>
              </Card>
            </Col>
          )}
        </Row>

        {/* Desafios */}
        <div style={{ marginTop: '60px' }}>
          <Card 
            data-testid="pp:medio|desafios|card|root"
            title="Desafios para Praticar"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <div data-testid="pp:medio|desafio|upload-valido">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Upload Válido:</Text> Faça upload de um arquivo CSV válido
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:medio|desafio|upload-invalido">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Upload Inválido:</Text> Tente fazer upload de um arquivo não-CSV
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:medio|desafio|drag-drop">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Drag & Drop:</Text> Use a área de drag & drop para upload
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:medio|desafio|preview">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Pré-visualização:</Text> Visualize os dados do CSV na tabela
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:medio|desafio|download">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Download:</Text> Baixe o CSV processado
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:medio|desafio|multiplo">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Múltiplo:</Text> Teste upload de múltiplos arquivos
                </div>
              </Col>
            </Row>
          </Card>
        </div>

        {/* Exemplo de CSV */}
        <div style={{ marginTop: '40px' }}>
          <Card 
            data-testid="pp:medio|exemplo|csv"
            title="Exemplo de CSV para Teste"
          >
            <Space direction="vertical" size="middle">
              <Text strong>Arquivo de exemplo (salve como .csv):</Text>
              <pre 
                data-testid="pp:medio|exemplo|conteudo"
                style={{ 
                  background: '#f5f5f5', 
                  padding: '16px', 
                  borderRadius: '4px',
                  overflow: 'auto'
                }}
              >
{`Nome,Idade,Cidade,Profissão
João Silva,25,São Paulo,Desenvolvedor
Maria Santos,30,Rio de Janeiro,Designer
Pedro Costa,28,Belo Horizonte,Analista
Ana Oliveira,35,Porto Alegre,Gerente`}
              </pre>
            </Space>
          </Card>
        </div>
      </div>
      
      <XPathTester pageId="medio" />
    </div>
  );
}
