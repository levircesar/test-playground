'use client';
import { Card, Typography, Button, Space, Row, Col, Tabs, Collapse, Divider, Alert, Tag, Modal } from 'antd';
import { 
  ApiOutlined, 
  PlayCircleOutlined, 
  CodeOutlined,
  BulbOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  CopyOutlined,
  ThunderboltOutlined,
  DatabaseOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import BackButton from '@/components/BackButton';
import { useLocale } from '@/lib/locale-context';
import { getTranslations } from '@/lib/translations';
import { useState } from 'react';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

export default function ApiIntroPage() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const [activeTab, setActiveTab] = useState('concepts');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState<any>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const conceptsData = [
    {
      key: 'restBasics',
      title: t.apiIntro.concepts.restBasics,
      description: t.apiIntro.concepts.restBasicsDesc,
      icon: <ApiOutlined style={{ color: '#1890ff' }} />,
      details: t.apiIntro.concepts.details.restBasics
    },
    {
      key: 'httpMethods',
      title: t.apiIntro.concepts.httpMethods,
      description: t.apiIntro.concepts.httpMethodsDesc,
      icon: <ThunderboltOutlined style={{ color: '#52c41a' }} />,
      details: t.apiIntro.concepts.details.httpMethods
    },
    {
      key: 'statusCodes',
      title: t.apiIntro.concepts.statusCodes,
      description: t.apiIntro.concepts.statusCodesDesc,
      icon: <CheckCircleOutlined style={{ color: '#fa8c16' }} />,
      details: t.apiIntro.concepts.details.statusCodes
    },
    {
      key: 'headers',
      title: t.apiIntro.concepts.headers,
      description: t.apiIntro.concepts.headersDesc,
      icon: <DatabaseOutlined style={{ color: '#722ed1' }} />,
      details: t.apiIntro.concepts.details.headers
    },
    {
      key: 'authentication',
      title: t.apiIntro.concepts.authentication,
      description: t.apiIntro.concepts.authenticationDesc,
      icon: <RocketOutlined style={{ color: '#eb2f96' }} />,
      details: t.apiIntro.concepts.details.authentication
    }
  ];

  const handleConceptClick = (concept: any) => {
    setSelectedConcept(concept);
    setModalVisible(true);
  };

  const methodsData = [
    {
      key: 'getRequest',
      title: t.apiIntro.commonMethods.getRequest,
      description: t.apiIntro.commonMethods.getRequestDesc,
      playwright: `// Playwright - Requisição GET
const response = await page.request.get('/api/users');
expect(response.status()).toBe(200);

const data = await response.json();
expect(data).toHaveProperty('users');
expect(Array.isArray(data.users)).toBe(true);`,
      cypress: `// Cypress - Requisição GET
cy.request('GET', '/api/users')
  .then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('users');
    expect(response.body.users).to.be.an('array');
  });`
    },
    {
      key: 'postRequest',
      title: t.apiIntro.commonMethods.postRequest,
      description: t.apiIntro.commonMethods.postRequestDesc,
      playwright: `// Playwright - Requisição POST
const response = await page.request.post('/api/users', {
  data: {
    name: 'João Silva',
    email: 'joao@exemplo.com',
    age: 30
  }
});

expect(response.status()).toBe(201);
const newUser = await response.json();
expect(newUser).toHaveProperty('id');`,
      cypress: `// Cypress - Requisição POST
cy.request({
  method: 'POST',
  url: '/api/users',
  body: {
    name: 'João Silva',
    email: 'joao@exemplo.com',
    age: 30
  }
}).then((response) => {
  expect(response.status).to.eq(201);
  expect(response.body).to.have.property('id');
});`
    },
    {
      key: 'validateResponse',
      title: t.apiIntro.commonMethods.validateResponse,
      description: t.apiIntro.commonMethods.validateResponseDesc,
      playwright: `// Playwright - Validar resposta
const response = await page.request.get('/api/products');
const data = await response.json();

// Validar estrutura
expect(data).toHaveProperty('products');
expect(data.products).toHaveLength(3);

// Validar conteúdo
const firstProduct = data.products[0];
expect(firstProduct).toHaveProperty('id');
expect(firstProduct).toHaveProperty('name');
expect(firstProduct.price).toBeGreaterThan(0);`,
      cypress: `// Cypress - Validar resposta
cy.request('GET', '/api/products')
  .then((response) => {
    // Validar estrutura
    expect(response.body).to.have.property('products');
    expect(response.body.products).to.have.length(3);
    
    // Validar conteúdo
    const firstProduct = response.body.products[0];
    expect(firstProduct).to.have.property('id');
    expect(firstProduct).to.have.property('name');
    expect(firstProduct.price).to.be.greaterThan(0);
  });`
    },
    {
      key: 'validateStatusCode',
      title: t.apiIntro.commonMethods.validateStatusCode,
      description: t.apiIntro.commonMethods.validateStatusCodeDesc,
      playwright: `// Playwright - Validar status codes
// Sucesso
const successResponse = await page.request.get('/api/users');
expect(successResponse.status()).toBe(200);

// Não encontrado
const notFoundResponse = await page.request.get('/api/users/999');
expect(notFoundResponse.status()).toBe(404);

// Erro do servidor
const errorResponse = await page.request.post('/api/users', {
  data: { invalid: 'data' }
});
expect(errorResponse.status()).toBe(400);`,
      cypress: `// Cypress - Validar status codes
// Sucesso
cy.request('GET', '/api/users')
  .then((response) => {
    expect(response.status).to.eq(200);
  });

// Não encontrado
cy.request({
  method: 'GET',
  url: '/api/users/999',
  failOnStatusCode: false
}).then((response) => {
  expect(response.status).to.eq(404);
});

// Erro do servidor
cy.request({
  method: 'POST',
  url: '/api/users',
  body: { invalid: 'data' },
  failOnStatusCode: false
}).then((response) => {
  expect(response.status).to.eq(400);
});`
    },
    {
      key: 'validateHeaders',
      title: t.apiIntro.commonMethods.validateHeaders,
      description: t.apiIntro.commonMethods.validateHeadersDesc,
      playwright: `// Playwright - Validar headers
const response = await page.request.get('/api/users');

// Validar headers de resposta
const headers = response.headers();
expect(headers['content-type']).toContain('application/json');
expect(headers['cache-control']).toBeDefined();

// Validar headers customizados
expect(response.headers()['x-api-version']).toBe('1.0');`,
      cypress: `// Cypress - Validar headers
cy.request('GET', '/api/users')
  .then((response) => {
    // Validar headers de resposta
    expect(response.headers).to.have.property('content-type');
    expect(response.headers['content-type']).to.include('application/json');
    
    // Validar headers customizados
    expect(response.headers).to.have.property('x-api-version');
    expect(response.headers['x-api-version']).to.eq('1.0');
  });`
    },
    {
      key: 'validateData',
      title: t.apiIntro.commonMethods.validateData,
      description: t.apiIntro.commonMethods.validateDataDesc,
      playwright: `// Playwright - Validar dados
const response = await page.request.get('/api/users/1');
const user = await response.json();

// Validar tipos de dados
expect(typeof user.id).toBe('number');
expect(typeof user.name).toBe('string');
expect(typeof user.email).toBe('string');

// Validar formato de email
expect(user.email).toMatch(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/);

// Validar valores obrigatórios
expect(user.name).toBeTruthy();
expect(user.email).toBeTruthy();`,
      cypress: `// Cypress - Validar dados
cy.request('GET', '/api/users/1')
  .then((response) => {
    const user = response.body;
    
    // Validar tipos de dados
    expect(user.id).to.be.a('number');
    expect(user.name).to.be.a('string');
    expect(user.email).to.be.a('string');
    
    // Validar formato de email
    expect(user.email).to.match(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/);
    
    // Validar valores obrigatórios
    expect(user.name).to.not.be.empty;
    expect(user.email).to.not.be.empty;
  });`
    }
  ];

  const httpMethods = [
    { method: 'GET', color: 'green', description: locale === 'pt-BR' ? 'Buscar dados' : locale === 'en-US' ? 'Fetch data' : 'Récupérer des données' },
    { method: 'POST', color: 'blue', description: locale === 'pt-BR' ? 'Criar novo recurso' : locale === 'en-US' ? 'Create new resource' : 'Créer une nouvelle ressource' },
    { method: 'PUT', color: 'orange', description: locale === 'pt-BR' ? 'Atualizar recurso completo' : locale === 'en-US' ? 'Update complete resource' : 'Mettre à jour la ressource complète' },
    { method: 'PATCH', color: 'purple', description: locale === 'pt-BR' ? 'Atualizar parcialmente' : locale === 'en-US' ? 'Partial update' : 'Mise à jour partielle' },
    { method: 'DELETE', color: 'red', description: locale === 'pt-BR' ? 'Remover recurso' : locale === 'en-US' ? 'Remove resource' : 'Supprimer la ressource' }
  ];

  const statusCodes = [
    { code: '200', color: 'green', description: locale === 'pt-BR' ? 'Sucesso' : locale === 'en-US' ? 'Success' : 'Succès' },
    { code: '201', color: 'green', description: locale === 'pt-BR' ? 'Criado' : locale === 'en-US' ? 'Created' : 'Créé' },
    { code: '400', color: 'orange', description: locale === 'pt-BR' ? 'Erro na requisição' : locale === 'en-US' ? 'Bad request' : 'Mauvaise requête' },
    { code: '401', color: 'red', description: locale === 'pt-BR' ? 'Não autorizado' : locale === 'en-US' ? 'Unauthorized' : 'Non autorisé' },
    { code: '404', color: 'red', description: locale === 'pt-BR' ? 'Não encontrado' : locale === 'en-US' ? 'Not found' : 'Non trouvé' },
    { code: '500', color: 'red', description: locale === 'pt-BR' ? 'Erro interno do servidor' : locale === 'en-US' ? 'Internal server error' : 'Erreur interne du serveur' }
  ];

  return (
    <div data-testid="pp:introducao-api|page|container|root" style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <BackButton href="/comecar" testId="pp:introducao-api|btn|voltar" />
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={1} style={{ color: '#2E8B57' }}>
            🔗 {t.apiIntro.title}
          </Title>
          <Paragraph style={{ fontSize: '18px', color: '#666', maxWidth: '800px', margin: '0 auto' }}>
            {t.apiIntro.description}
          </Paragraph>
        </div>

        <Alert
          message={locale === 'pt-BR' ? '💡 Dica' : locale === 'en-US' ? '💡 Tip' : '💡 Conseil'}
          description={locale === 'pt-BR' ? 
            'Esta página contém exemplos práticos de código para testes de API com Playwright e Cypress. Clique no botão de copiar para usar os códigos em seus próprios testes.' :
            locale === 'en-US' ?
            'This page contains practical code examples for API testing with Playwright and Cypress. Click the copy button to use the codes in your own tests.' :
            'Cette page contient des exemples de code pratiques pour les tests d\'API avec Playwright et Cypress. Cliquez sur le bouton copier pour utiliser les codes dans vos propres tests.'
          }
          type="info"
          showIcon
          style={{ marginBottom: '40px' }}
        />

        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={[
            {
              key: 'concepts',
              label: t.apiIntro.concepts.title,
              children: (
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <Row gutter={[24, 24]}>
                    {conceptsData.map((concept) => (
                      <Col xs={24} sm={12} lg={8} key={concept.key}>
                        <Card
                          data-testid={`pp:introducao-api|concept|${concept.key}`}
                          style={{ 
                            height: '100%',
                            border: '2px solid #f0f0f0',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          bodyStyle={{ padding: '24px' }}
                          hoverable
                          onClick={() => handleConceptClick(concept)}
                        >
                          <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                                {concept.icon}
                              </div>
                              <Title level={4} style={{ margin: 0 }}>
                                {concept.title}
                              </Title>
                            </div>
                            <Paragraph style={{ textAlign: 'center', margin: 0 }}>
                              {concept.description}
                            </Paragraph>
                            <div style={{ textAlign: 'center' }}>
                              <Button 
                                type="link" 
                                icon={<InfoCircleOutlined />}
                                size="small"
                              >
                                {locale === 'pt-BR' ? 'Ver detalhes' : 
                                 locale === 'en-US' ? 'View details' : 
                                 'Voir détails'}
                              </Button>
                            </div>
                          </Space>
                        </Card>
                      </Col>
                    ))}
                  </Row>

                  <Divider />

                  <Row gutter={[24, 24]}>
                    <Col xs={24} lg={12}>
                      <Card title="🔧 Métodos HTTP" style={{ height: '100%' }}>
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                          {httpMethods.map((method) => (
                            <div key={method.method} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <Tag color={method.color} style={{ minWidth: '60px', textAlign: 'center' }}>
                                {method.method}
                              </Tag>
                              <Text>{method.description}</Text>
                            </div>
                          ))}
                        </Space>
                      </Card>
                    </Col>
                    <Col xs={24} lg={12}>
                      <Card title="📊 Códigos de Status" style={{ height: '100%' }}>
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                          {statusCodes.map((status) => (
                            <div key={status.code} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <Tag color={status.color} style={{ minWidth: '60px', textAlign: 'center' }}>
                                {status.code}
                              </Tag>
                              <Text>{status.description}</Text>
                            </div>
                          ))}
                        </Space>
                      </Card>
                    </Col>
                  </Row>
                </Space>
              )
            },
            {
              key: 'methods',
              label: t.apiIntro.commonMethods.title,
              children: (
                <Collapse
                  defaultActiveKey={['getRequest']}
                  expandIconPosition="right"
                  size="large"
                >
                  {methodsData.map((method) => (
                    <Panel 
                      header={
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <CodeOutlined style={{ color: '#1890ff' }} />
                          <Title level={5} style={{ margin: 0 }}>
                            {method.title}
                          </Title>
                        </div>
                      } 
                      key={method.key}
                      data-testid={`pp:introducao-api|method|${method.key}`}
                    >
                      <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Paragraph style={{ margin: 0, fontSize: '16px' }}>
                          {method.description}
                        </Paragraph>
                        
                        <Divider style={{ margin: '16px 0' }} />
                        
                        <Tabs
                          defaultActiveKey="playwright"
                          size="small"
                          items={[
                            {
                              key: 'playwright',
                              label: (
                                <Space>
                                  <span>🎭</span>
                                  <span>{t.apiIntro.examples.playwright}</span>
                                </Space>
                              ),
                              children: (
                                <div style={{ position: 'relative' }}>
                                  <Button
                                    size="small"
                                    icon={<CopyOutlined />}
                                    onClick={() => copyToClipboard(method.playwright)}
                                    style={{ 
                                      position: 'absolute', 
                                      top: '8px', 
                                      right: '8px', 
                                      zIndex: 1 
                                    }}
                                  >
                                    {locale === 'pt-BR' ? 'Copiar' : locale === 'en-US' ? 'Copy' : 'Copier'}
                                  </Button>
                                  <pre style={{ 
                                    background: '#f6f8fa', 
                                    padding: '20px', 
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    overflow: 'auto',
                                    margin: 0
                                  }}>
                                    <code>{method.playwright}</code>
                                  </pre>
                                </div>
                              )
                            },
                            {
                              key: 'cypress',
                              label: (
                                <Space>
                                  <span>🌲</span>
                                  <span>{t.apiIntro.examples.cypress}</span>
                                </Space>
                              ),
                              children: (
                                <div style={{ position: 'relative' }}>
                                  <Button
                                    size="small"
                                    icon={<CopyOutlined />}
                                    onClick={() => copyToClipboard(method.cypress)}
                                    style={{ 
                                      position: 'absolute', 
                                      top: '8px', 
                                      right: '8px', 
                                      zIndex: 1 
                                    }}
                                  >
                                    {locale === 'pt-BR' ? 'Copiar' : locale === 'en-US' ? 'Copy' : 'Copier'}
                                  </Button>
                                  <pre style={{ 
                                    background: '#f6f8fa', 
                                    padding: '20px', 
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    overflow: 'auto',
                                    margin: 0
                                  }}>
                                    <code>{method.cypress}</code>
                                  </pre>
                                </div>
                              )
                            }
                          ]}
                        />
                      </Space>
                    </Panel>
                  ))}
                </Collapse>
              )
            }
          ]}
        />

        {/* Próximos Passos */}
        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <Card 
            data-testid="pp:introducao-api|next-steps|card|root"
            style={{ maxWidth: '800px', margin: '0 auto' }}
          >
            <Space direction="vertical" size="large">
              <Title level={3}>
                🚀 {t.apiIntro.nextSteps}
              </Title>
              
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12}>
                  <Link href="/introducao-web">
                    <Button
                      type="default"
                      size="large"
                      icon={<ArrowRightOutlined />}
                      style={{ width: '100%', height: '60px' }}
                      data-testid="pp:introducao-api|btn|web-intro"
                    >
                      <Space direction="vertical" size="small">
                        <span>{t.apiIntro.goToWebIntro}</span>
                      </Space>
                    </Button>
                  </Link>
                </Col>
                
                <Col xs={24} sm={12}>
                  <Link href="/comecar">
                    <Button
                      type="primary"
                      size="large"
                      icon={<RocketOutlined />}
                      style={{ width: '100%', height: '60px' }}
                      data-testid="pp:introducao-api|btn|back-to-start"
                    >
                      <Space direction="vertical" size="small">
                        <span>{t.apiIntro.backToStart}</span>
                      </Space>
                    </Button>
                  </Link>
                </Col>
              </Row>
              
              <Divider />
              
              <div>
                <Title level={5}>
                  {locale === 'pt-BR' ? '📚 Recursos Adicionais' : 
                   locale === 'en-US' ? '📚 Additional Resources' : 
                   '📚 Ressources Supplémentaires'}
                </Title>
                <Space direction="vertical" size="small">
                  <a href="https://playwright.dev/docs/api/class-apirequest" target="_blank" rel="noopener noreferrer">
                    📖 Playwright API Testing
                  </a>
                  <a href="https://docs.cypress.io/guides/guides/network-requests" target="_blank" rel="noopener noreferrer">
                    📖 Cypress API Testing
                  </a>
                  <a href="/api-docs" target="_blank" rel="noopener noreferrer">
                    📖 Test Playground APIs
                  </a>
                </Space>
              </div>
            </Space>
          </Card>
        </div>

        {/* Modal para detalhes dos conceitos */}
        <Modal
          title={
            <Space>
              {selectedConcept?.icon}
              <span>{selectedConcept?.details?.title}</span>
            </Space>
          }
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setModalVisible(false)}>
              {locale === 'pt-BR' ? 'Fechar' : locale === 'en-US' ? 'Close' : 'Fermer'}
            </Button>
          ]}
          width={800}
          data-testid="pp:introducao-api|modal|concept-details"
        >
          {selectedConcept && (
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Paragraph style={{ fontSize: '16px', margin: 0 }}>
                {selectedConcept.details.explanation}
              </Paragraph>
              
              <Divider />
              
              <div>
                <Title level={5}>
                  {locale === 'pt-BR' ? '📚 Conceitos Principais' : 
                   locale === 'en-US' ? '📚 Key Concepts' : 
                   '📚 Concepts Clés'}
                </Title>
                <ul style={{ paddingLeft: '20px' }}>
                  {selectedConcept.details.concepts.map((concept: string, index: number) => (
                    <li key={index} style={{ marginBottom: '8px' }}>
                      {concept}
                    </li>
                  ))}
                </ul>
              </div>
              
              <Divider />
              
              <div>
                <Title level={5}>
                  {locale === 'pt-BR' ? '💡 Dicas Práticas' : 
                   locale === 'en-US' ? '💡 Practical Tips' : 
                   '💡 Conseils Pratiques'}
                </Title>
                <ul style={{ paddingLeft: '20px' }}>
                  {selectedConcept.details.tips.map((tip: string, index: number) => (
                    <li key={index} style={{ marginBottom: '8px' }}>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </Space>
          )}
        </Modal>
      </div>
    </div>
  );
}
