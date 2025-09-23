'use client';
import { Card, Typography, Button, Space, Row, Col, Tag } from 'antd';
import { 
  RocketOutlined, 
  UploadOutlined, 
  BorderOutlined, 
  ApiOutlined, 
  DesktopOutlined,
  CheckCircleOutlined 
} from '@ant-design/icons';
import Link from 'next/link';
import BackButton from '@/components/BackButton';
import { useLocale } from '@/lib/locale-context';
import { getTranslations } from '@/lib/translations';

const { Title, Paragraph } = Typography;

const roadmaps = [
  {
    id: 'facil',
    title: 'Fáceis',
    icon: <RocketOutlined style={{ fontSize: '48px', color: '#52c41a' }} />,
    description: 'Componentes básicos e interações simples',
    examples: ['Botões e contadores', 'Formulários simples', 'Tabelas básicas', 'Modais e tooltips'],
    color: '#52c41a',
    route: '/roadmap/facil',
    testId: 'pp:comecar|card|facil'
  },
  {
    id: 'medio',
    title: 'Médios',
    icon: <UploadOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
    description: 'Uploads de arquivos e validações',
    examples: ['Upload single/múltiplo', 'Validação de arquivos', 'Pré-visualização CSV', 'Drag & Drop'],
    color: '#1890ff',
    route: '/roadmap/medio',
    testId: 'pp:comecar|card|medio'
  },
  {
    id: 'dificil',
    title: 'Difíceis',
    icon: <BorderOutlined style={{ fontSize: '48px', color: '#fa8c16' }} />,
    description: 'Iframes e interações complexas',
    examples: ['Iframes aninhados', 'Comunicação entre frames', 'Formulários em iframe', 'PostMessage'],
    color: '#fa8c16',
    route: '/roadmap/dificil',
    testId: 'pp:comecar|card|dificil'
  },
  {
    id: 'api',
    title: 'Testes de API',
    icon: <ApiOutlined style={{ fontSize: '48px', color: '#722ed1' }} />,
    description: 'Testes de endpoints e persistência',
    examples: ['GET/POST requests', 'Persistência localStorage', 'Histórico de chamadas', 'Validação de respostas'],
    color: '#722ed1',
    route: '/roadmap/api',
    testId: 'pp:comecar|card|api'
  },
  {
    id: 'api-tela',
    title: 'API + Tela',
    icon: <DesktopOutlined style={{ fontSize: '48px', color: '#eb2f96' }} />,
    description: 'Integração completa UI + API',
    examples: ['App de TODOs', 'CRUD completo', 'Sincronização local', 'Fallback offline'],
    color: '#eb2f96',
    route: '/roadmap/api-tela',
    testId: 'pp:comecar|card|api-tela'
  }
];

export default function ComecarPage() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  const roadmaps = [
    {
      id: 'facil',
      title: t.roadmap.easy.title,
      icon: <RocketOutlined style={{ fontSize: '48px', color: '#52c41a' }} />,
      description: t.roadmap.easy.description,
      examples: [
        locale === 'pt-BR' ? 'Botões e contadores' : locale === 'en-US' ? 'Buttons and counters' : 'Boutons et compteurs',
        locale === 'pt-BR' ? 'Formulários simples' : locale === 'en-US' ? 'Simple forms' : 'Formulaires simples',
        locale === 'pt-BR' ? 'Tabelas básicas' : locale === 'en-US' ? 'Basic tables' : 'Tableaux de base',
        locale === 'pt-BR' ? 'Modais e tooltips' : locale === 'en-US' ? 'Modals and tooltips' : 'Modales et tooltips'
      ],
      color: '#52c41a',
      route: '/roadmap/facil',
      testId: 'pp:comecar|card|facil'
    },
    {
      id: 'medio',
      title: t.roadmap.medium.title,
      icon: <UploadOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
      description: t.roadmap.medium.description,
      examples: [
        locale === 'pt-BR' ? 'Upload single/múltiplo' : locale === 'en-US' ? 'Single/multiple upload' : 'Upload simple/multiple',
        locale === 'pt-BR' ? 'Validação de arquivos' : locale === 'en-US' ? 'File validation' : 'Validation de fichiers',
        locale === 'pt-BR' ? 'Pré-visualização CSV' : locale === 'en-US' ? 'CSV preview' : 'Aperçu CSV',
        locale === 'pt-BR' ? 'Drag & Drop' : locale === 'en-US' ? 'Drag & Drop' : 'Glisser-déposer'
      ],
      color: '#1890ff',
      route: '/roadmap/medio',
      testId: 'pp:comecar|card|medio'
    },
    {
      id: 'dificil',
      title: t.roadmap.hard.title,
      icon: <BorderOutlined style={{ fontSize: '48px', color: '#fa8c16' }} />,
      description: t.roadmap.hard.description,
      examples: [
        locale === 'pt-BR' ? 'Iframes aninhados' : locale === 'en-US' ? 'Nested iframes' : 'Iframes imbriqués',
        locale === 'pt-BR' ? 'Comunicação entre frames' : locale === 'en-US' ? 'Frame communication' : 'Communication entre frames',
        locale === 'pt-BR' ? 'Formulários em iframe' : locale === 'en-US' ? 'Forms in iframe' : 'Formulaires en iframe',
        locale === 'pt-BR' ? 'PostMessage' : locale === 'en-US' ? 'PostMessage' : 'PostMessage'
      ],
      color: '#fa8c16',
      route: '/roadmap/dificil',
      testId: 'pp:comecar|card|dificil'
    },
    {
      id: 'api',
      title: t.roadmap.api.title,
      icon: <ApiOutlined style={{ fontSize: '48px', color: '#722ed1' }} />,
      description: t.roadmap.api.description,
      examples: [
        locale === 'pt-BR' ? 'GET/POST requests' : locale === 'en-US' ? 'GET/POST requests' : 'Requêtes GET/POST',
        locale === 'pt-BR' ? 'Persistência localStorage' : locale === 'en-US' ? 'localStorage persistence' : 'Persistance localStorage',
        locale === 'pt-BR' ? 'Histórico de chamadas' : locale === 'en-US' ? 'Call history' : 'Historique des appels',
        locale === 'pt-BR' ? 'Validação de respostas' : locale === 'en-US' ? 'Response validation' : 'Validation des réponses'
      ],
      color: '#722ed1',
      route: '/roadmap/api',
      testId: 'pp:comecar|card|api'
    },
    {
      id: 'api-tela',
      title: t.roadmap.apiScreen.title,
      icon: <DesktopOutlined style={{ fontSize: '48px', color: '#eb2f96' }} />,
      description: t.roadmap.apiScreen.description,
      examples: [
        locale === 'pt-BR' ? 'App de TODOs' : locale === 'en-US' ? 'TODOs app' : 'App TODOs',
        locale === 'pt-BR' ? 'CRUD completo' : locale === 'en-US' ? 'Complete CRUD' : 'CRUD complet',
        locale === 'pt-BR' ? 'Sincronização local' : locale === 'en-US' ? 'Local sync' : 'Synchronisation locale',
        locale === 'pt-BR' ? 'Fallback offline' : locale === 'en-US' ? 'Offline fallback' : 'Fallback hors ligne'
      ],
      color: '#eb2f96',
      route: '/roadmap/api-tela',
      testId: 'pp:comecar|card|api-tela'
    }
  ];

  return (
    <div data-testid="pp:comecar|page|container|root" style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <BackButton href="/" testId="pp:comecar|btn|voltar" />
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={1}>{t.start.title}</Title>
          <Paragraph style={{ fontSize: '18px', color: '#666' }}>
            {t.start.subtitle}
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {roadmaps.map((roadmap) => (
            <Col xs={24} sm={12} lg={8} key={roadmap.id}>
              <Card
                data-testid={roadmap.testId}
                style={{ 
                  height: '100%',
                  border: `2px solid ${roadmap.color}20`,
                  borderRadius: '12px'
                }}
                bodyStyle={{ padding: '32px 24px' }}
              >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div style={{ textAlign: 'center' }}>
                    {roadmap.icon}
                    <Title level={3} style={{ marginTop: '16px', color: roadmap.color }}>
                      {roadmap.title}
                    </Title>
                  </div>

                  <div>
                    <Paragraph style={{ textAlign: 'center', fontSize: '16px' }}>
                      {roadmap.description}
                    </Paragraph>
                  </div>

                  <div>
                    <Title level={5}>
                      {locale === 'pt-BR' ? 'O que você vai praticar:' : 
                       locale === 'en-US' ? 'What you will practice:' : 
                       'Ce que vous allez pratiquer:'}
                    </Title>
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      {roadmap.examples.map((example, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                          <CheckCircleOutlined style={{ color: roadmap.color, marginRight: '8px' }} />
                          <span style={{ fontSize: '14px' }}>{example}</span>
                        </div>
                      ))}
                    </Space>
                  </div>

                  <Link href={roadmap.route}>
                    <Button
                      type="primary"
                      size="large"
                      data-testid={`pp:comecar|btn|ir#${roadmap.id}`}
                      style={{ 
                        width: '100%', 
                        height: '50px', 
                        fontSize: '16px',
                        backgroundColor: roadmap.color,
                        borderColor: roadmap.color
                      }}
                    >
                      {locale === 'pt-BR' ? `Ir para ${roadmap.title}` : 
                       locale === 'en-US' ? `Go to ${roadmap.title}` : 
                       `Aller à ${roadmap.title}`}
                    </Button>
                  </Link>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Dicas */}
        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <Card 
            data-testid="pp:comecar|dicas|card|root"
            style={{ maxWidth: '800px', margin: '0 auto' }}
          >
            <Space direction="vertical" size="large">
              <Title level={3}>
                {locale === 'pt-BR' ? '💡 Dicas para começar' : 
                 locale === 'en-US' ? '💡 Tips to get started' : 
                 '💡 Conseils pour commencer'}
              </Title>
              
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12}>
                  <div data-testid="pp:comecar|dicas|item|sequencia">
                    <Title level={5}>
                      {locale === 'pt-BR' ? '📚 Sequência Recomendada' : 
                       locale === 'en-US' ? '📚 Recommended Sequence' : 
                       '📚 Séquence Recommandée'}
                    </Title>
                    <Paragraph style={{ fontSize: '14px', margin: 0 }}>
                      {locale === 'pt-BR' ? 'Comece pelos Fáceis e evolua gradualmente até os Difíceis' : 
                       locale === 'en-US' ? 'Start with Easy and gradually evolve to Hard' : 
                       'Commencez par Facile et évoluez progressivement vers Difficile'}
                    </Paragraph>
                  </div>
                </Col>
                
                <Col xs={24} sm={12}>
                  <div data-testid="pp:comecar|dicas|item|xpath">
                    <Title level={5}>
                      {locale === 'pt-BR' ? '🔍 Use o XPath Tester' : 
                       locale === 'en-US' ? '🔍 Use the XPath Tester' : 
                       '🔍 Utilisez le Testeur XPath'}
                    </Title>
                    <Paragraph style={{ fontSize: '14px', margin: 0 }}>
                      {locale === 'pt-BR' ? 'Teste seletores XPath em tempo real em todas as páginas' : 
                       locale === 'en-US' ? 'Test XPath selectors in real time on all pages' : 
                       'Testez les sélecteurs XPath en temps réel sur toutes les pages'}
                    </Paragraph>
                  </div>
                </Col>
                
                <Col xs={24} sm={12}>
                  <div data-testid="pp:comecar|dicas|item|data-testid">
                    <Title level={5}>
                      {locale === 'pt-BR' ? '🏷️ Data-testid' : 
                       locale === 'en-US' ? '🏷️ Data-testid' : 
                       '🏷️ Data-testid'}
                    </Title>
                    <Paragraph style={{ fontSize: '14px', margin: 0 }}>
                      {locale === 'pt-BR' ? 'Quase todos os elementos têm data-testid únicos para facilitar os testes' : 
                       locale === 'en-US' ? 'Almost all elements have unique data-testid to facilitate testing' : 
                       'Presque tous les éléments ont des data-testid uniques pour faciliter les tests'}
                    </Paragraph>
                  </div>
                </Col>
                
                <Col xs={24} sm={12}>
                  <div data-testid="pp:comecar|dicas|item|playwright">
                    <Title level={5}>
                      {locale === 'pt-BR' ? '🎭 Playwright' : 
                       locale === 'en-US' ? '🎭 Playwright' : 
                       '🎭 Playwright'}
                    </Title>
                    <Paragraph style={{ fontSize: '14px', margin: 0 }}>
                      <a href="https://playwright.dev/docs/intro" target="_blank" rel="noopener noreferrer">
                        {locale === 'pt-BR' ? '📚 Documentação Playwright' : 
                         locale === 'en-US' ? '📚 Playwright Documentation' : 
                         '📚 Documentation Playwright'}
                      </a>
                      <br />
                      <a href="https://docs.cypress.io/guides/getting-started/installing-cypress" target="_blank" rel="noopener noreferrer">
                        {locale === 'pt-BR' ? '📚 Documentação Cypress' : 
                         locale === 'en-US' ? '📚 Cypress Documentation' : 
                         '📚 Documentation Cypress'}
                      </a>
                    </Paragraph>
                  </div>
                </Col>
              </Row>
            </Space>
          </Card>
        </div>
      </div>
    </div>
  );
}
