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
  return (
    <div data-testid="pp:comecar|page|container|root" style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <BackButton href="/" testId="pp:comecar|btn|voltar" />
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={1}>Escolha seu Roadmap</Title>
          <Paragraph style={{ fontSize: '18px', color: '#666' }}>
            Selecione um caminho de aprendizado estruturado. Cada roadmap contém exercícios 
            práticos organizados por nível de complexidade.
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
                    <Title level={5}>O que você vai praticar:</Title>
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
                      Ir para {roadmap.title}
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
              <Title level={3}>💡 Dicas para começar</Title>
              
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12}>
                  <div data-testid="pp:comecar|dicas|item|sequencia">
                    <Title level={5}>📚 Sequência Recomendada</Title>
                    <Paragraph style={{ fontSize: '14px', margin: 0 }}>
                      Comece pelos <strong>Fáceis</strong> e evolua gradualmente até os <strong>Difíceis</strong>
                    </Paragraph>
                  </div>
                </Col>
                
                <Col xs={24} sm={12}>
                  <div data-testid="pp:comecar|dicas|item|xpath">
                    <Title level={5}>🔍 Use o XPath Tester</Title>
                    <Paragraph style={{ fontSize: '14px', margin: 0 }}>
                      Teste seletores XPath em tempo real em todas as páginas
                    </Paragraph>
                  </div>
                </Col>
                
                <Col xs={24} sm={12}>
                  <div data-testid="pp:comecar|dicas|item|data-testid">
                    <Title level={5}>🏷️ Data-testid</Title>
                    <Paragraph style={{ fontSize: '14px', margin: 0 }}>
                      Todos os elementos têm <code>data-testid</code> únicos para facilitar os testes
                    </Paragraph>
                  </div>
                </Col>
                
                <Col xs={24} sm={12}>
                  <div data-testid="pp:comecar|dicas|item|playwright">
                    <Title level={5}>🎭 Playwright</Title>
                    <Paragraph style={{ fontSize: '14px', margin: 0 }}>
                      <a href="https://playwright.dev/docs/intro" target="_blank" rel="noopener noreferrer">
                        📚 Documentação Playwright
                      </a>
                      <br />
                      <a href="https://docs.cypress.io/guides/getting-started/installing-cypress" target="_blank" rel="noopener noreferrer">
                        📚 Documentação Cypress
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
