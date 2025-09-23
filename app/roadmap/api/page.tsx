'use client';
import { 
  Typography, 
  Card, 
  Row, 
  Col, 
  Space, 
  Button, 
  Input, 
  Alert, 
  message,
  Divider,
  List,
  Tag
} from 'antd';
import { 
  ApiOutlined, 
  SendOutlined, 
  ClearOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import XPathTester from '@/components/XPathTester';
import BackButton from '@/components/BackButton';
import RoadmapChallengesButton from '@/components/RoadmapChallengesButton';
import { getJSON, setJSON, STORAGE_KEYS } from '@/lib/storage';
import { useLocale } from '@/lib/locale-context';
import { getTranslations } from '@/lib/translations';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

interface ApiCall {
  id: string;
  method: 'GET' | 'POST';
  url: string;
  request?: any;
  response: any;
  timestamp: string;
  status: 'success' | 'error';
}

export default function ApiPage() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const [pingResponse, setPingResponse] = useState<any>(null);
  const [echoRequest, setEchoRequest] = useState('');
  const [echoResponse, setEchoResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [apiHistory, setApiHistory] = useState<ApiCall[]>([]);

  useEffect(() => {
    // Carregar histórico do localStorage
    const savedHistory = getJSON(STORAGE_KEYS.API_HISTORY, []);
    setApiHistory(savedHistory);
  }, []);

  const saveToHistory = (call: ApiCall) => {
    const newHistory = [call, ...apiHistory].slice(0, 20); // Manter apenas os últimos 20
    setApiHistory(newHistory);
    setJSON(STORAGE_KEYS.API_HISTORY, newHistory);
  };

  const callPing = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ping');
      const data = await response.json();
      
      setPingResponse(data);
      
      const apiCall: ApiCall = {
        id: Date.now().toString(),
        method: 'GET',
        url: '/api/ping',
        response: data,
        timestamp: new Date().toISOString(),
        status: 'success'
      };
      
      saveToHistory(apiCall);
      message.success('Ping realizado com sucesso!');
    } catch (error) {
      message.error('Erro ao fazer ping');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const callEcho = async () => {
    if (!echoRequest.trim()) {
      message.warning('Digite algo para enviar');
      return;
    }

    setLoading(true);
    try {
      let requestData;
      try {
        requestData = JSON.parse(echoRequest);
      } catch {
        requestData = echoRequest;
      }

      const response = await fetch('/api/echo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      
      const data = await response.json();
      
      setEchoResponse(data);
      
      const apiCall: ApiCall = {
        id: Date.now().toString(),
        method: 'POST',
        url: '/api/echo',
        request: requestData,
        response: data,
        timestamp: new Date().toISOString(),
        status: 'success'
      };
      
      saveToHistory(apiCall);
      message.success('Echo realizado com sucesso!');
    } catch (error) {
      message.error('Erro ao fazer echo');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setApiHistory([]);
    setJSON(STORAGE_KEYS.API_HISTORY, []);
    message.success('Histórico limpo!');
  };

  const clearResponses = () => {
    setPingResponse(null);
    setEchoResponse(null);
    setEchoRequest('');
    message.info('Respostas limpas!');
  };

  return (
    <div data-testid="pp:api|page|container|root" style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <BackButton href="/desafios" testId="pp:api|btn|voltar" />
          <Space>
            <Link href="/api-docs">
              <Button
                type="default"
                icon={<ApiOutlined />}
                data-testid="pp:api|btn|ver-apis"
              >
                {t.apiDocs.viewApis}
              </Button>
            </Link>
            <RoadmapChallengesButton level={t.roadmap.levels.api} testId="pp:api|btn|desafios" />
          </Space>
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Title level={1}>Testes de API</Title>
          <Paragraph style={{ fontSize: '18px', color: '#666' }}>
            Pratique chamadas de API e observe como os dados são persistidos no localStorage.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {/* Ping API */}
          <Col xs={24} lg={12}>
            <Card 
              data-testid="pp:api|section|card|ping"
              title="GET /api/ping"
              style={{ height: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <Alert
                  message="Endpoint de Teste"
                  description="Este endpoint retorna um status OK e timestamp do servidor"
                  type="info"
                  showIcon
                  data-testid="pp:api|alert|ping-info"
                />
                
                <Button
                  type="primary"
                  icon={<ApiOutlined />}
                  onClick={callPing}
                  loading={loading}
                  data-testid="pp:api|btn|ping"
                  style={{ width: '100%' }}
                >
                  Fazer Ping
                </Button>

                {pingResponse && (
                  <div data-testid="pp:api|response|ping">
                    <Text strong>Resposta:</Text>
                    <pre style={{ 
                      background: '#f5f5f5', 
                      padding: '12px', 
                      borderRadius: '4px',
                      fontSize: '12px',
                      overflow: 'auto'
                    }}>
                      {JSON.stringify(pingResponse, null, 2)}
                    </pre>
                  </div>
                )}
              </Space>
            </Card>
          </Col>

          {/* Echo API */}
          <Col xs={24} lg={12}>
            <Card 
              data-testid="pp:api|section|card|echo"
              title="POST /api/echo"
              style={{ height: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <Alert
                  message="Eco de Dados"
                  description="Este endpoint ecoa os dados enviados junto com timestamp do servidor"
                  type="info"
                  showIcon
                  data-testid="pp:api|alert|echo-info"
                />
                
                <div>
                  <Text strong>Dados para enviar:</Text>
                  <TextArea
                    placeholder='Digite texto ou JSON: {"nome": "João", "idade": 30}'
                    value={echoRequest}
                    onChange={(e) => setEchoRequest(e.target.value)}
                    data-testid="pp:api|input|echo"
                    rows={4}
                  />
                </div>

                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={callEcho}
                  loading={loading}
                  data-testid="pp:api|btn|echo"
                  style={{ width: '100%' }}
                >
                  Enviar Echo
                </Button>

                {echoResponse && (
                  <div data-testid="pp:api|response|echo">
                    <Text strong>Resposta:</Text>
                    <pre style={{ 
                      background: '#f5f5f5', 
                      padding: '12px', 
                      borderRadius: '4px',
                      fontSize: '12px',
                      overflow: 'auto'
                    }}>
                      {JSON.stringify(echoResponse, null, 2)}
                    </pre>
                  </div>
                )}
              </Space>
            </Card>
          </Col>

          {/* Controles */}
          <Col xs={24}>
            <Card 
              data-testid="pp:api|section|card|controles"
              title="Controles"
            >
              <Space>
                <Button
                  icon={<ClearOutlined />}
                  onClick={clearResponses}
                  data-testid="pp:api|btn|clear-responses"
                >
                  Limpar Respostas
                </Button>
                <Button
                  icon={<ClearOutlined />}
                  onClick={clearHistory}
                  data-testid="pp:api|btn|clear-history"
                >
                  Limpar Histórico
                </Button>
              </Space>
            </Card>
          </Col>

          {/* Histórico */}
          <Col xs={24}>
            <Card 
              data-testid="pp:api|section|card|historico"
              title="Histórico de Chamadas (localStorage)"
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <div data-testid="pp:api|stats|historico">
                  <Text strong>Total de chamadas: </Text>
                  <Text style={{ color: '#1890ff' }}>{apiHistory.length}</Text>
                  <Text style={{ marginLeft: '16px' }}>
                    <Text strong>Sucessos: </Text>
                    <Text type="success">{apiHistory.filter(h => h.status === 'success').length}</Text>
                  </Text>
                  <Text style={{ marginLeft: '16px' }}>
                    <Text strong>Erros: </Text>
                    <Text type="danger">{apiHistory.filter(h => h.status === 'error').length}</Text>
                  </Text>
                </div>

                {apiHistory.length === 0 ? (
                  <Alert
                    message="Nenhuma chamada realizada ainda"
                    description="Faça algumas chamadas de API para ver o histórico aqui"
                    type="info"
                    showIcon
                    data-testid="pp:api|alert|empty-history"
                  />
                ) : (
                  <List
                    data-testid="pp:api|list|historico"
                    dataSource={apiHistory}
                    renderItem={(item, index) => (
                      <List.Item
                        key={item.id}
                        data-testid={`pp:api|item|historico#${index}`}
                      >
                        <List.Item.Meta
                          avatar={
                            <Tag color={item.status === 'success' ? 'green' : 'red'}>
                              {item.method}
                            </Tag>
                          }
                          title={
                            <Space>
                              <Text strong>{item.url}</Text>
                              <Tag color="blue">{item.status}</Tag>
                            </Space>
                          }
                          description={
                            <Space direction="vertical" size="small">
                              <Text type="secondary">
                                {new Date(item.timestamp).toLocaleString()}
                              </Text>
                              {item.request && (
                                <Text code style={{ fontSize: '11px' }}>
                                  Request: {JSON.stringify(item.request).substring(0, 100)}...
                                </Text>
                              )}
                              <Text code style={{ fontSize: '11px' }}>
                                Response: {JSON.stringify(item.response).substring(0, 100)}...
                              </Text>
                            </Space>
                          }
                        />
                      </List.Item>
                    )}
                  />
                )}
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Desafios */}
        <div style={{ marginTop: '60px' }}>
          <Card 
            data-testid="pp:api|desafios|card|root"
            title="Desafios para Praticar"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <div data-testid="pp:api|desafio|ping">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Ping:</Text> Faça uma chamada GET para /api/ping
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:api|desafio|echo-texto">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Echo Texto:</Text> Envie um texto simples via POST
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:api|desafio|echo-json">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Echo JSON:</Text> Envie um objeto JSON via POST
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:api|desafio|persistencia">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Persistência:</Text> Verifique que o histórico é salvo no localStorage
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:api|desafio|validacao">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Validação:</Text> Teste envio de dados inválidos
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:api|desafio|limpar">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Limpar:</Text> Use os botões para limpar respostas e histórico
                </div>
              </Col>
            </Row>
          </Card>
        </div>

        {/* Informações Técnicas */}
        <div style={{ marginTop: '40px' }}>
          <Card 
            data-testid="pp:api|info|tecnica"
            title="Informações Técnicas"
            size="small"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <div data-testid="pp:api|info|endpoints">
                  <Title level={5}>Endpoints Disponíveis:</Title>
                  <ul>
                    <li><Text code>GET /api/ping</Text> - Status e timestamp</li>
                    <li><Text code>POST /api/echo</Text> - Eco de dados</li>
                  </ul>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:api|info|storage">
                  <Title level={5}>Persistência:</Title>
                  <ul>
                    <li>Histórico salvo em <Text code>localStorage</Text></li>
                    <li>Chave: <Text code>pp_api_history</Text></li>
                    <li>Máximo de 20 registros</li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
      
      <XPathTester pageId="api" />
    </div>
  );
}
