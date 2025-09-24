'use client';
import { Button, Typography, Card, Space, Row, Col, Spin, Statistic } from 'antd';
import { TrophyOutlined, PlayCircleOutlined, BookOutlined, RocketOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useChallengeStatistics } from '@/lib/hooks/useChallengeStatistics';
import { useLocale } from '@/lib/locale-context';

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const { locale } = useLocale();
  const { statistics, loading: statsLoading } = useChallengeStatistics();

  return (
    <div data-testid="pp:home|page|container|root" style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={1}>Escolha seu Caminho</Title>
          <Paragraph style={{ fontSize: '18px', color: '#666' }}>
            Selecione como você quer começar sua jornada de aprendizado em automação de testes
          </Paragraph>
        </div>

        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={12}>
            <Card
              data-testid="pp:home|main|card|desafios"
              style={{ height: '100%', textAlign: 'center' }}
              bodyStyle={{ padding: '40px 24px' }}
            >
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <TrophyOutlined style={{ fontSize: '64px', color: '#fa8c16' }} />
                
                <div>
                  <Title level={3}>Desafios</Title>
                  <Paragraph>
                    Explore uma lista completa de desafios organizados por nível de dificuldade. 
                    Cada desafio tem um objetivo específico e te guia através de cenários reais.
                  </Paragraph>
                  
                  <div style={{ margin: '16px 0' }}>
                    <Statistic
                      title={locale === 'pt-BR' ? 'Total de Desafios' : 
                             locale === 'en-US' ? 'Total Challenges' : 
                             'Total des Défis'}
                      value={statsLoading ? undefined : (statistics?.total || 0)}
                      valueStyle={{ color: '#fa8c16', fontSize: '24px' }}
                      loading={statsLoading}
                    />
                  </div>
                </div>

                <Link href="/desafios">
                  <Button
                    type="primary"
                    size="large"
                    icon={<TrophyOutlined />}
                    data-testid="pp:home|main|btn|desafios"
                    style={{ width: '200px', height: '50px', fontSize: '16px' }}
                  >
                    Ver Desafios
                  </Button>
                </Link>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card
              data-testid="pp:home|main|card|comecar"
              style={{ height: '100%', textAlign: 'center' }}
              bodyStyle={{ padding: '40px 24px' }}
            >
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <PlayCircleOutlined style={{ fontSize: '64px', color: '#1890ff' }} />
                
                <div>
                  <Title level={3}>Começar</Title>
                  <Paragraph>
                    Siga um roadmap estruturado com exercícios práticos. 
                    Comece do básico e evolua até cenários complexos de automação.
                  </Paragraph>
                </div>

                <Link href="/comecar">
                  <Button
                    type="primary"
                    size="large"
                    icon={<PlayCircleOutlined />}
                    data-testid="pp:home|main|btn|comecar"
                    style={{ width: '200px', height: '50px', fontSize: '16px' }}
                  >
                    Começar Agora
                  </Button>
                </Link>
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Estatísticas dos Desafios */}
        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <Title level={2} style={{ marginBottom: '40px' }}>
            {locale === 'pt-BR' ? 'Nossos Desafios' : 
             locale === 'en-US' ? 'Our Challenges' : 
             'Nos Défis'}
          </Title>
          
          <Row gutter={[24, 24]} justify="center">
            <Col xs={12} sm={6}>
              <Card style={{ textAlign: 'center' }}>
                <Statistic
                  title={locale === 'pt-BR' ? 'Fáceis' : 
                         locale === 'en-US' ? 'Easy' : 
                         'Faciles'}
                  value={statsLoading ? undefined : (statistics?.byLevel.facil || 0)}
                  valueStyle={{ color: '#52c41a' }}
                  loading={statsLoading}
                />
              </Card>
            </Col>
            
            <Col xs={12} sm={6}>
              <Card style={{ textAlign: 'center' }}>
                <Statistic
                  title={locale === 'pt-BR' ? 'Médios' : 
                         locale === 'en-US' ? 'Medium' : 
                         'Moyens'}
                  value={statsLoading ? undefined : (statistics?.byLevel.medio || 0)}
                  valueStyle={{ color: '#fa8c16' }}
                  loading={statsLoading}
                />
              </Card>
            </Col>
            
            <Col xs={12} sm={6}>
              <Card style={{ textAlign: 'center' }}>
                <Statistic
                  title={locale === 'pt-BR' ? 'Difíceis' : 
                         locale === 'en-US' ? 'Hard' : 
                         'Difficiles'}
                  value={statsLoading ? undefined : (statistics?.byLevel.dificil || 0)}
                  valueStyle={{ color: '#ff4d4f' }}
                  loading={statsLoading}
                />
              </Card>
            </Col>
            
            <Col xs={12} sm={6}>
              <Card style={{ textAlign: 'center' }}>
                <Statistic
                  title="API"
                  value={statsLoading ? undefined : ((statistics?.byLevel.api || 0) + (statistics?.byLevel.apiTela || 0))}
                  valueStyle={{ color: '#722ed1' }}
                  loading={statsLoading}
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* Resumo dos Caminhos */}
        <div style={{ marginTop: '80px' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
            O que você vai aprender
          </Title>
          
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={8}>
              <Card 
                data-testid="pp:home|resumo|card|basico"
                style={{ textAlign: 'center', height: '100%' }}
              >
                <Space direction="vertical" size="middle">
                  <BookOutlined style={{ fontSize: '32px', color: '#52c41a' }} />
                  <Title level={4}>Básico</Title>
                  <Paragraph style={{ fontSize: '14px' }}>
                    Componentes simples, formulários e interações básicas
                  </Paragraph>
                </Space>
              </Card>
            </Col>
            
            <Col xs={24} sm={8}>
              <Card 
                data-testid="pp:home|resumo|card|intermedio"
                style={{ textAlign: 'center', height: '100%' }}
              >
                <Space direction="vertical" size="middle">
                  <RocketOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
                  <Title level={4}>Intermediário</Title>
                  <Paragraph style={{ fontSize: '14px' }}>
                    Uploads, validações e cenários mais complexos
                  </Paragraph>
                </Space>
              </Card>
            </Col>
            
            <Col xs={24} sm={8}>
              <Card 
                data-testid="pp:home|resumo|card|avancado"
                style={{ textAlign: 'center', height: '100%' }}
              >
                <Space direction="vertical" size="middle">
                  <TrophyOutlined style={{ fontSize: '32px', color: '#fa8c16' }} />
                  <Title level={4}>Avançado</Title>
                  <Paragraph style={{ fontSize: '14px' }}>
                    Iframes, APIs e testes end-to-end completos
                  </Paragraph>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
