'use client';
import React, { useState } from 'react';
import {
  Typography,
  Card,
  Row,
  Col,
  Space,
  Button,
  Input,
  Select,
  Tag,
  Collapse,
  Alert,
  message,
  Table,
  Badge,
  Divider,
  Tabs
} from 'antd';
import {
  ApiOutlined,
  SendOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CodeOutlined,
  DatabaseOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import BackButton from '@/components/BackButton';
import { useLocale } from '@/lib/locale-context';
import { getTranslations } from '@/lib/translations';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const { TabPane } = Tabs;

interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  title: string;
  description: string;
  parameters?: any[];
  requestBody?: any;
  responses: any;
  tags: string[];
  examples: any[];
}

const apiEndpoints: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/api/ping',
    title: 'Health Check',
    description: 'Endpoint para verificar se a API está funcionando',
    parameters: [],
    responses: {
      200: {
        description: 'Sucesso',
        example: {
          success: true,
          message: 'pong',
          timestamp: '2024-03-26T10:30:00Z',
          uptime: '2d 14h 32m'
        }
      }
    },
    tags: ['health', 'basic'],
    examples: [
      {
        name: 'Chamada básica',
        request: 'GET /api/ping',
        response: {
          success: true,
          message: 'pong',
          timestamp: '2024-03-26T10:30:00Z',
          uptime: '2d 14h 32m'
        }
      }
    ]
  },
  {
    method: 'POST',
    path: '/api/echo',
    title: 'Echo Data',
    description: 'Retorna os dados enviados junto com timestamp',
    parameters: [],
    requestBody: {
      type: 'object',
      description: 'Dados para ecoar (pode ser qualquer tipo)',
      example: { nome: 'João', idade: 30 }
    },
    responses: {
      200: {
        description: 'Sucesso',
        example: {
          success: true,
          data: { nome: 'João', idade: 30 },
          timestamp: '2024-03-26T10:30:00Z',
          echoed: true
        }
      }
    },
    tags: ['utility', 'basic'],
    examples: [
      {
        name: 'Eco de texto',
        request: 'POST /api/echo\nContent-Type: application/json\n\n"Olá mundo"',
        response: {
          success: true,
          data: 'Olá mundo',
          timestamp: '2024-03-26T10:30:00Z',
          echoed: true
        }
      },
      {
        name: 'Eco de objeto JSON',
        request: 'POST /api/echo\nContent-Type: application/json\n\n{"nome": "Maria", "skills": ["JavaScript", "Playwright"]}',
        response: {
          success: true,
          data: { nome: 'Maria', skills: ['JavaScript', 'Playwright'] },
          timestamp: '2024-03-26T10:30:00Z',
          echoed: true
        }
      }
    ]
  },
  {
    method: 'GET',
    path: '/api/users',
    title: 'List Users',
    description: 'Lista usuários com filtros opcionais',
    parameters: [
      { name: 'active', type: 'boolean', description: 'Filtrar usuários ativos', required: false },
      { name: 'role', type: 'string', description: 'Filtrar por função', required: false },
      { name: 'limit', type: 'number', description: 'Limitar número de resultados', required: false }
    ],
    responses: {
      200: {
        description: 'Lista de usuários',
        example: {
          success: true,
          data: [
            {
              id: 1,
              name: 'João Silva',
              email: 'joao@exemplo.com',
              age: 28,
              role: 'QA Engineer',
              skills: ['Playwright', 'Cypress', 'JavaScript'],
              active: true,
              createdAt: '2024-01-15T10:30:00Z',
              profile: {
                avatar: 'https://i.pravatar.cc/150?img=1',
                bio: 'Especialista em automação de testes',
                location: 'São Paulo, SP'
              }
            }
          ],
          meta: {
            total: 1,
            totalAvailable: 3,
            filters: { active: null, role: null, limit: null },
            timestamp: '2024-03-26T10:30:00Z'
          }
        }
      }
    },
    tags: ['users', 'data'],
    examples: [
      {
        name: 'Listar todos os usuários',
        request: 'GET /api/users',
        response: 'Ver resposta completa acima'
      },
      {
        name: 'Filtrar usuários ativos',
        request: 'GET /api/users?active=true',
        response: 'Retorna apenas usuários com active: true'
      },
      {
        name: 'Filtrar por função',
        request: 'GET /api/users?role=QA Engineer',
        response: 'Retorna apenas usuários com a função especificada'
      }
    ]
  },
  {
    method: 'POST',
    path: '/api/users',
    title: 'Create User',
    description: 'Cria um novo usuário',
    parameters: [],
    requestBody: {
      type: 'object',
      required: ['name', 'email'],
      properties: {
        name: { type: 'string', description: 'Nome do usuário' },
        email: { type: 'string', description: 'Email do usuário' },
        age: { type: 'number', description: 'Idade do usuário' },
        role: { type: 'string', description: 'Função do usuário' },
        skills: { type: 'array', description: 'Habilidades do usuário' },
        active: { type: 'boolean', description: 'Status ativo' },
        profile: { type: 'object', description: 'Informações do perfil' }
      },
      example: {
        name: 'Ana Costa',
        email: 'ana@exemplo.com',
        age: 26,
        role: 'Test Engineer',
        skills: ['Selenium', 'Python'],
        active: true,
        profile: {
          bio: 'Especialista em testes automatizados',
          location: 'Brasília, DF'
        }
      }
    },
    responses: {
      201: {
        description: 'Usuário criado com sucesso',
        example: {
          success: true,
          data: {
            id: 4,
            name: 'Ana Costa',
            email: 'ana@exemplo.com',
            age: 26,
            role: 'Test Engineer',
            skills: ['Selenium', 'Python'],
            active: true,
            createdAt: '2024-03-26T10:30:00Z',
            profile: {
              avatar: 'https://i.pravatar.cc/150?img=4',
              bio: 'Especialista em testes automatizados',
              location: 'Brasília, DF'
            }
          },
          message: 'Usuário criado com sucesso',
          timestamp: '2024-03-26T10:30:00Z'
        }
      },
      400: {
        description: 'Erro de validação',
        example: {
          success: false,
          error: 'Nome e email são obrigatórios',
          code: 'VALIDATION_ERROR'
        }
      }
    },
    tags: ['users', 'data'],
    examples: [
      {
        name: 'Criar usuário básico',
        request: 'POST /api/users\nContent-Type: application/json\n\n{"name": "Ana Costa", "email": "ana@exemplo.com"}',
        response: 'Usuário criado com dados mínimos'
      },
      {
        name: 'Criar usuário completo',
        request: 'POST /api/users\nContent-Type: application/json\n\n{"name": "Ana Costa", "email": "ana@exemplo.com", "age": 26, "role": "Test Engineer", "skills": ["Selenium", "Python"], "active": true}',
        response: 'Usuário criado com todos os dados'
      }
    ]
  },
  {
    method: 'GET',
    path: '/api/products',
    title: 'List Products',
    description: 'Lista produtos com filtros e ordenação',
    parameters: [
      { name: 'category', type: 'string', description: 'Filtrar por categoria', required: false },
      { name: 'status', type: 'string', description: 'Filtrar por status', required: false },
      { name: 'minPrice', type: 'number', description: 'Preço mínimo', required: false },
      { name: 'maxPrice', type: 'number', description: 'Preço máximo', required: false },
      { name: 'sortBy', type: 'string', description: 'Campo para ordenação (name, price, rating, stock, created)', required: false },
      { name: 'order', type: 'string', description: 'Ordem (asc, desc)', required: false }
    ],
    responses: {
      200: {
        description: 'Lista de produtos',
        example: {
          success: true,
          data: [
            {
              id: 'prod_001',
              name: 'Playwright Pro Course',
              description: 'Curso completo de automação de testes com Playwright',
              price: 299.90,
              currency: 'BRL',
              category: 'courses',
              tags: ['playwright', 'automation', 'testing'],
              inventory: { stock: 150, reserved: 25, available: 125 },
              ratings: { average: 4.8, count: 342 },
              features: ['50+ horas de conteúdo', 'Projetos práticos'],
              status: 'active',
              createdAt: '2024-01-01T00:00:00Z'
            }
          ],
          meta: {
            stats: {
              totalProducts: 3,
              averagePrice: 216.57,
              totalStock: 352,
              categories: ['courses', 'tools'],
              priceRange: { min: 149.90, max: 299.90 }
            }
          }
        }
      }
    },
    tags: ['products', 'ecommerce'],
    examples: [
      {
        name: 'Listar todos os produtos',
        request: 'GET /api/products',
        response: 'Lista completa de produtos'
      },
      {
        name: 'Filtrar por categoria',
        request: 'GET /api/products?category=courses',
        response: 'Apenas produtos da categoria courses'
      },
      {
        name: 'Ordenar por preço',
        request: 'GET /api/products?sortBy=price&order=desc',
        response: 'Produtos ordenados por preço decrescente'
      }
    ]
  },
  {
    method: 'GET',
    path: '/api/analytics',
    title: 'Analytics Data',
    description: 'Dados de analytics e métricas',
    parameters: [
      { name: 'type', type: 'string', description: 'Tipo de dados (overview, traffic, performance, trends, goals, summary)', required: false },
      { name: 'period', type: 'string', description: 'Período (7d, 30d, 90d)', required: false },
      { name: 'format', type: 'string', description: 'Formato (full, minimal)', required: false }
    ],
    responses: {
      200: {
        description: 'Dados de analytics',
        example: {
          success: true,
          data: {
            totalUsers: 1250,
            activeUsers: 892,
            newUsers: 156,
            sessions: 3456,
            avgSessionDuration: '8m 32s',
            bounceRate: 23.4,
            conversionRate: 12.8
          },
          meta: {
            type: 'overview',
            period: '7d',
            format: 'full',
            generatedAt: '2024-03-26T10:30:00Z'
          }
        }
      }
    },
    tags: ['analytics', 'metrics'],
    examples: [
      {
        name: 'Visão geral',
        request: 'GET /api/analytics?type=overview',
        response: 'Métricas gerais do site'
      },
      {
        name: 'Tráfego',
        request: 'GET /api/analytics?type=traffic',
        response: 'Dados de fontes de tráfego e dispositivos'
      },
      {
        name: 'Performance',
        request: 'GET /api/analytics?type=performance',
        response: 'Dados de performance de páginas e APIs'
      }
    ]
  }
];

const getMethodColor = (method: string) => {
  switch (method) {
    case 'GET': return 'blue';
    case 'POST': return 'green';
    case 'PUT': return 'orange';
    case 'DELETE': return 'red';
    default: return 'default';
  }
};

export default function ApiDocsPage() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const makeApiCall = async (endpoint: ApiEndpoint) => {
    setLoading(true);
    try {
      const url = endpoint.path;
      const options: RequestInit = {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (endpoint.method === 'POST' && requestBody.trim()) {
        try {
          options.body = JSON.stringify(JSON.parse(requestBody));
        } catch {
          options.body = JSON.stringify(requestBody);
        }
      }

      const res = await fetch(url, options);
      const data = await res.json();
      
      setResponse({
        status: res.status,
        statusText: res.statusText,
        data
      });
      
      message.success(t.apiDocs.callMade);
    } catch (error) {
      setResponse({
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
      message.error(t.apiDocs.callError);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success('Copiado para a área de transferência!');
  };

  const columns = [
    {
      title: t.apiDocs.method,
      dataIndex: 'method',
      key: 'method',
      render: (method: string) => (
        <Tag color={getMethodColor(method)}>{method}</Tag>
      ),
    },
    {
      title: t.apiDocs.endpoint,
      dataIndex: 'path',
      key: 'path',
      render: (path: string) => (
        <Text code style={{ fontSize: '14px' }}>{path}</Text>
      ),
    },
    {
      title: t.apiDocs.title_,
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t.apiDocs.tags,
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <Space>
          {tags.map(tag => (
            <Tag key={tag} color="blue">{tag}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: t.apiDocs.actions,
      key: 'actions',
      render: (_: any, record: ApiEndpoint) => (
        <Button
          type="primary"
          size="small"
          onClick={() => setSelectedEndpoint(record)}
        >
          {t.apiDocs.test}
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '40px 24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <BackButton href="/roadmap/api" testId="pp:api-docs|btn|voltar" />
        </div>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Title level={1} style={{ marginBottom: '16px' }}>
            <ApiOutlined style={{ marginRight: '12px', color: '#1890ff' }} />
            {t.apiDocs.title}
          </Title>
          <Paragraph style={{ fontSize: '18px', color: '#666', maxWidth: '800px', margin: '0 auto' }}>
            {t.apiDocs.description}
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Card>
              <Title level={3}>{t.apiDocs.endpoints}</Title>
              <Table
                dataSource={apiEndpoints}
                columns={columns}
                rowKey="path"
                pagination={false}
                size="small"
              />
            </Card>

            {selectedEndpoint && (
              <Card style={{ marginTop: '24px' }}>
                <Title level={3}>
                  <Tag color={getMethodColor(selectedEndpoint.method)}>
                    {selectedEndpoint.method}
                  </Tag>
                  {selectedEndpoint.path}
                </Title>
                
                <Paragraph>{selectedEndpoint.description}</Paragraph>

                <Tabs defaultActiveKey="details">
                  <TabPane tab={t.apiDocs.details} key="details">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      {selectedEndpoint.parameters && selectedEndpoint.parameters.length > 0 && (
                        <div>
                          <Title level={5}>Parâmetros</Title>
                          <Table
                            dataSource={selectedEndpoint.parameters}
                            columns={[
                              { title: 'Nome', dataIndex: 'name', key: 'name' },
                              { title: 'Tipo', dataIndex: 'type', key: 'type' },
                              { title: 'Descrição', dataIndex: 'description', key: 'description' },
                              { title: 'Obrigatório', dataIndex: 'required', key: 'required', render: (required) => required ? 'Sim' : 'Não' }
                            ]}
                            pagination={false}
                            size="small"
                          />
                        </div>
                      )}

                      {selectedEndpoint.requestBody && (
                        <div>
                          <Title level={5}>Request Body</Title>
                          <Alert
                            message="Estrutura do Body"
                            description={
                              <pre style={{ margin: 0, fontSize: '12px' }}>
                                {JSON.stringify(selectedEndpoint.requestBody, null, 2)}
                              </pre>
                            }
                            type="info"
                            showIcon
                          />
                        </div>
                      )}

                      <div>
                        <Title level={5}>Respostas</Title>
                        {Object.entries(selectedEndpoint.responses).map(([status, response]: [string, any]) => (
                          <div key={status} style={{ marginBottom: '16px' }}>
                            <Badge 
                              count={status} 
                              style={{ backgroundColor: status.startsWith('2') ? '#52c41a' : '#ff4d4f' }}
                            />
                            <Text style={{ marginLeft: '8px' }}>{response.description}</Text>
                            <pre style={{ 
                              marginTop: '8px', 
                              background: '#f5f5f5', 
                              padding: '12px', 
                              borderRadius: '4px',
                              fontSize: '12px'
                            }}>
                              {JSON.stringify(response.example, null, 2)}
                            </pre>
                          </div>
                        ))}
                      </div>
                    </Space>
                  </TabPane>

                  <TabPane tab={t.apiDocs.examples} key="examples">
                    <Collapse>
                      {selectedEndpoint.examples.map((example, index) => (
                        <Panel 
                          header={example.name} 
                          key={index}
                        >
                          <Space direction="vertical" style={{ width: '100%' }}>
                            <div>
                              <Text strong>{t.apiDocs.request}</Text>
                              <Button
                                type="text"
                                size="small"
                                icon={<CopyOutlined />}
                                onClick={() => copyToClipboard(example.request)}
                                style={{ marginLeft: '8px' }}
                              >
                                {t.apiDocs.copy}
                              </Button>
                              <pre style={{ 
                                background: '#f5f5f5', 
                                padding: '12px', 
                                borderRadius: '4px',
                                fontSize: '12px',
                                marginTop: '8px'
                              }}>
                                {example.request}
                              </pre>
                            </div>
                            <div>
                              <Text strong>{t.apiDocs.response}</Text>
                              <pre style={{ 
                                background: '#f0f9ff', 
                                padding: '12px', 
                                borderRadius: '4px',
                                fontSize: '12px',
                                marginTop: '8px'
                              }}>
                                {typeof example.response === 'string' 
                                  ? example.response 
                                  : JSON.stringify(example.response, null, 2)
                                }
                              </pre>
                            </div>
                          </Space>
                        </Panel>
                      ))}
                    </Collapse>
                  </TabPane>

                  <TabPane tab={t.apiDocs.test} key="test">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      {selectedEndpoint.method === 'POST' && (
                        <div>
                          <Text strong>Request Body (JSON):</Text>
                          <TextArea
                            placeholder="Digite o JSON para enviar..."
                            value={requestBody}
                            onChange={(e) => setRequestBody(e.target.value)}
                            rows={6}
                            style={{ marginTop: '8px' }}
                          />
                        </div>
                      )}

                      <Button
                        type="primary"
                        icon={<SendOutlined />}
                        onClick={() => makeApiCall(selectedEndpoint)}
                        loading={loading}
                        style={{ width: '100%' }}
                      >
                        {t.apiDocs.makeCall}
                      </Button>

                      {response && (
                        <div>
                          <Text strong>{t.apiDocs.response}</Text>
                          <Button
                            type="text"
                            size="small"
                            icon={<CopyOutlined />}
                            onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
                            style={{ marginLeft: '8px' }}
                          >
                            {t.apiDocs.copy}
                          </Button>
                          <pre style={{ 
                            background: response.error ? '#fff2f0' : '#f6ffed', 
                            padding: '12px', 
                            borderRadius: '4px',
                            fontSize: '12px',
                            marginTop: '8px'
                          }}>
                            {JSON.stringify(response, null, 2)}
                          </pre>
                        </div>
                      )}
                    </Space>
                  </TabPane>
                </Tabs>
              </Card>
            )}
          </Col>

          <Col xs={24} lg={8}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Card>
                <Title level={4}>
                  <InfoCircleOutlined style={{ marginRight: '8px' }} />
                  {t.apiDocs.aboutApis}
                </Title>
                <Paragraph>
                  {t.apiDocs.aboutApisDesc}
                </Paragraph>
                <ul>
                  <li><Text strong>GET /api/ping</Text> - Health check básico</li>
                  <li><Text strong>POST /api/echo</Text> - Eco de dados</li>
                  <li><Text strong>GET /api/users</Text> - Lista de usuários com filtros</li>
                  <li><Text strong>POST /api/users</Text> - Criação de usuários</li>
                  <li><Text strong>GET /api/products</Text> - Catálogo de produtos</li>
                  <li><Text strong>GET /api/analytics</Text> - Dados de analytics</li>
                </ul>
              </Card>

              <Card>
                <Title level={4}>
                  <CodeOutlined style={{ marginRight: '8px' }} />
                  {t.apiDocs.dataStructures}
                </Title>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Tag color="blue"><DatabaseOutlined /> {t.apiDocs.users}</Tag>
                    <Text type="secondary">{t.apiDocs.usersDesc}</Text>
                  </div>
                  <div>
                    <Tag color="green"><DatabaseOutlined /> {t.apiDocs.products}</Tag>
                    <Text type="secondary">{t.apiDocs.productsDesc}</Text>
                  </div>
                  <div>
                    <Tag color="orange"><BarChartOutlined /> {t.apiDocs.analytics}</Tag>
                    <Text type="secondary">{t.apiDocs.analyticsDesc}</Text>
                  </div>
                </Space>
              </Card>

              <Card>
                <Title level={4}>
                  <CheckCircleOutlined style={{ marginRight: '8px' }} />
                  {t.apiDocs.suggestedChallenges}
                </Title>
                <ul>
                  {t.apiDocs.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </Card>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
}
