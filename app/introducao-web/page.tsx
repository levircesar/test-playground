'use client';
import { Card, Typography, Button, Space, Row, Col, Tabs, Collapse, Divider, Alert, Modal } from 'antd';
import { 
  GlobalOutlined, 
  PlayCircleOutlined, 
  CodeOutlined,
  BulbOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  CopyOutlined,
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

export default function WebIntroPage() {
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
      key: 'basicConcepts',
      title: t.webIntro.concepts.basicConcepts,
      description: t.webIntro.concepts.basicConceptsDesc,
      icon: <BulbOutlined style={{ color: '#1890ff' }} />,
      details: t.webIntro.concepts.details.basicConcepts
    },
    {
      key: 'selectors',
      title: t.webIntro.concepts.selectors,
      description: t.webIntro.concepts.selectorsDesc,
      icon: <GlobalOutlined style={{ color: '#52c41a' }} />,
      details: t.webIntro.concepts.details.selectors
    },
    {
      key: 'assertions',
      title: t.webIntro.concepts.assertions,
      description: t.webIntro.concepts.assertionsDesc,
      icon: <CheckCircleOutlined style={{ color: '#fa8c16' }} />,
      details: t.webIntro.concepts.details.assertions
    },
    {
      key: 'interactions',
      title: t.webIntro.concepts.interactions,
      description: t.webIntro.concepts.interactionsDesc,
      icon: <PlayCircleOutlined style={{ color: '#722ed1' }} />,
      details: t.webIntro.concepts.details.interactions
    },
    {
      key: 'waiting',
      title: t.webIntro.concepts.waiting,
      description: t.webIntro.concepts.waitingDesc,
      icon: <RocketOutlined style={{ color: '#eb2f96' }} />,
      details: t.webIntro.concepts.details.waiting
    }
  ];

  const handleConceptClick = (concept: any) => {
    setSelectedConcept(concept);
    setModalVisible(true);
  };

  const methodsData = [
    {
      key: 'clickButton',
      title: t.webIntro.commonMethods.clickButton,
      description: t.webIntro.commonMethods.clickButtonDesc,
      playwright: `// Playwright - Clicar em botão
await page.click('button[data-testid="submit-btn"]');
await expect(page.locator('.success-message')).toBeVisible();`,
      cypress: `// Cypress - Clicar em botão
cy.get('[data-testid="submit-btn"]').click();
cy.get('.success-message').should('be.visible');`
    },
    {
      key: 'selectDropdown',
      title: t.webIntro.commonMethods.selectDropdown,
      description: t.webIntro.commonMethods.selectDropdownDesc,
      playwright: `// Playwright - Selecionar dropdown
await page.selectOption('select[data-testid="country-select"]', 'BR');
await expect(page.locator('text=Brasil')).toBeVisible();`,
      cypress: `// Cypress - Selecionar dropdown
cy.get('[data-testid="country-select"]').select('BR');
cy.contains('Brasil').should('be.visible');`
    },
    {
      key: 'fillInput',
      title: t.webIntro.commonMethods.fillInput,
      description: t.webIntro.commonMethods.fillInputDesc,
      playwright: `// Playwright - Preencher input
await page.fill('input[data-testid="username"]', 'usuario123');
await page.fill('input[data-testid="password"]', 'senha456');`,
      cypress: `// Cypress - Preencher input
cy.get('[data-testid="username"]').type('usuario123');
cy.get('[data-testid="password"]').type('senha456');`
    },
    {
      key: 'validateVisible',
      title: t.webIntro.commonMethods.validateVisible,
      description: t.webIntro.commonMethods.validateVisibleDesc,
      playwright: `// Playwright - Validar elemento visível
await expect(page.locator('.modal')).toBeVisible();
await expect(page.locator('.loading-spinner')).toBeHidden();`,
      cypress: `// Cypress - Validar elemento visível
cy.get('.modal').should('be.visible');
cy.get('.loading-spinner').should('not.exist');`
    },
    {
      key: 'validateText',
      title: t.webIntro.commonMethods.validateText,
      description: t.webIntro.commonMethods.validateTextDesc,
      playwright: `// Playwright - Validar texto
await expect(page.locator('h1')).toHaveText('Bem-vindo ao Test Playground');
await expect(page.locator('.counter')).toContainText('5');`,
      cypress: `// Cypress - Validar texto
cy.get('h1').should('have.text', 'Bem-vindo ao Test Playground');
cy.get('.counter').should('contain.text', '5');`
    },
    {
      key: 'navigate',
      title: t.webIntro.commonMethods.navigate,
      description: t.webIntro.commonMethods.navigateDesc,
      playwright: `// Playwright - Navegar
await page.goto('/comecar');
await page.goBack();
await page.goForward();
await page.reload();`,
      cypress: `// Cypress - Navegar
cy.visit('/comecar');
cy.go('back');
cy.go('forward');
cy.reload();`
    }
  ];

  return (
    <div data-testid="pp:introducao-web|page|container|root" style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <BackButton href="/comecar" testId="pp:introducao-web|btn|voltar" />
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={1} style={{ color: '#2E8B57' }}>
            🌐 {t.webIntro.title}
          </Title>
          <Paragraph style={{ fontSize: '18px', color: '#666', maxWidth: '800px', margin: '0 auto' }}>
            {t.webIntro.description}
          </Paragraph>
        </div>

        <Alert
          message={locale === 'pt-BR' ? '💡 Dica' : locale === 'en-US' ? '💡 Tip' : '💡 Conseil'}
          description={locale === 'pt-BR' ? 
            'Esta página contém exemplos práticos de código para Playwright e Cypress. Clique no botão de copiar para usar os códigos em seus próprios testes.' :
            locale === 'en-US' ?
            'This page contains practical code examples for Playwright and Cypress. Click the copy button to use the codes in your own tests.' :
            'Cette page contient des exemples de code pratiques pour Playwright et Cypress. Cliquez sur le bouton copier pour utiliser les codes dans vos propres tests.'
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
              label: t.webIntro.concepts.title,
              children: (
                <Row gutter={[24, 24]}>
                  {conceptsData.map((concept) => (
                    <Col xs={24} sm={12} lg={8} key={concept.key}>
                      <Card
                        data-testid={`pp:introducao-web|concept|${concept.key}`}
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
              )
            },
            {
              key: 'methods',
              label: t.webIntro.commonMethods.title,
              children: (
                <Collapse
                  defaultActiveKey={['clickButton']}
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
                      data-testid={`pp:introducao-web|method|${method.key}`}
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
                                  <span>{t.webIntro.examples.playwright}</span>
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
                                  <span>{t.webIntro.examples.cypress}</span>
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
            data-testid="pp:introducao-web|next-steps|card|root"
            style={{ maxWidth: '800px', margin: '0 auto' }}
          >
            <Space direction="vertical" size="large">
              <Title level={3}>
                🚀 {t.webIntro.nextSteps}
              </Title>
              
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12}>
                  <Link href="/introducao-api">
                    <Button
                      type="primary"
                      size="large"
                      icon={<ArrowRightOutlined />}
                      style={{ width: '100%', height: '60px' }}
                      data-testid="pp:introducao-web|btn|api-intro"
                    >
                      <Space direction="vertical" size="small">
                        <span>{t.webIntro.goToApiIntro}</span>
                      </Space>
                    </Button>
                  </Link>
                </Col>
                
                <Col xs={24} sm={12}>
                  <Link href="/comecar">
                    <Button
                      type="default"
                      size="large"
                      icon={<RocketOutlined />}
                      style={{ width: '100%', height: '60px' }}
                      data-testid="pp:introducao-web|btn|back-to-start"
                    >
                      <Space direction="vertical" size="small">
                        <span>{t.webIntro.backToStart}</span>
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
                  <a href="https://playwright.dev/docs/intro" target="_blank" rel="noopener noreferrer">
                    📖 Documentação Playwright
                  </a>
                  <a href="https://docs.cypress.io/guides/getting-started/installing-cypress" target="_blank" rel="noopener noreferrer">
                    📖 Documentação Cypress
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
          data-testid="pp:introducao-web|modal|concept-details"
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
