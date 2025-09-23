'use client';
import { Button, Typography, Card, Row, Col, Space, Divider, Statistic, Badge } from 'antd';
import { 
  PlayCircleOutlined, 
  TrophyOutlined, 
  RocketOutlined, 
  ApiOutlined, 
  UploadOutlined, 
  BorderOutlined,
  StarOutlined,
  UserOutlined,
  BookOutlined,
  ThunderboltOutlined,
  HeartOutlined,
  CheckCircleOutlined,
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import Donation from '@/components/Donation';

const { Title, Paragraph, Text } = Typography;

export default function LandingPage() {
  return (
    <div data-testid="pp:landing|page|container|root">
      {/* Hero Section */}
      <section 
        data-testid="pp:landing|hero|section|root"
        style={{ 
          padding: '100px 24px', 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'float 6s ease-in-out infinite'
        }} />
        
        <Space direction="vertical" size="large" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
          <Badge.Ribbon text="100% Gratuito" color="green" data-testid="pp:landing|badge|gratuito">
            <Title level={1} style={{ color: 'white', fontSize: '4rem', margin: '20px 0', fontWeight: 'bold' }}>
              🧪 Test Automation Playground
            </Title>
          </Badge.Ribbon>
          
          <Paragraph style={{ 
            color: 'white', 
            fontSize: '1.4rem', 
            maxWidth: '700px', 
            margin: '0 auto',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            <strong>A plataforma definitiva</strong> para aprender automação de testes com Playwright, Cypress e outras ferramentas. 
            <br />
            Domine cenários reais com componentes interativos e desafios práticos.
          </Paragraph>
          
          <Space size="large" style={{ marginTop: '40px' }}>
            <Link href="/comecar">
              <Button
                type="primary"
                size="large"
                icon={<ThunderboltOutlined />}
                data-testid="pp:landing|hero|btn|comecar"
                style={{ 
                  height: '60px', 
                  fontSize: '18px',
                  padding: '0 40px',
                  borderRadius: '30px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
                  border: 'none'
                }}
              >
                🚀 Começar Agora
              </Button>
            </Link>
            
            <Link href="/desafios">
              <Button
                size="large"
                icon={<TrophyOutlined />}
                data-testid="pp:landing|hero|btn|desafios"
                style={{ 
                  height: '60px', 
                  fontSize: '18px',
                  padding: '0 40px',
                  borderRadius: '30px',
                  background: 'rgba(255,255,255,0.2)', 
                  border: '2px solid rgba(255,255,255,0.5)', 
                  color: 'white',
                  backdropFilter: 'blur(10px)'
                }}
              >
                🏆 Ver Desafios
              </Button>
            </Link>
          </Space>
          
          {/* Stats */}
          <Row gutter={[32, 16]} style={{ marginTop: '60px', maxWidth: '800px', margin: '60px auto 0' }}>
            <Col xs={24} sm={8}>
              <Statistic
                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Desafios</span>}
                value={20}
                valueStyle={{ color: '#fff', fontSize: '2rem' }}
                prefix={<TrophyOutlined />}
                data-testid="pp:landing|stat|desafios"
              />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic
                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Ferramentas</span>}
                value="Playwright + Cypress"
                valueStyle={{ color: '#fff', fontSize: '1.2rem' }}
                prefix={<ThunderboltOutlined />}
                data-testid="pp:landing|stat|ferramentas"
              />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic
                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Níveis</span>}
                value="Fácil → Difícil"
                valueStyle={{ color: '#fff', fontSize: '1.2rem' }}
                prefix={<StarOutlined />}
                data-testid="pp:landing|stat|niveis"
              />
            </Col>
          </Row>
        </Space>
      </section>

      {/* Como Funciona */}
      <section 
        data-testid="pp:landing|como-funciona|section|root"
        style={{ padding: '100px 24px', background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <Title level={2} style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
              🎯 Como Funciona
            </Title>
            <Paragraph style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              Aprenda através de <strong>cenários práticos</strong> com Playwright, Cypress e outras ferramentas de automação
            </Paragraph>
          </div>
          
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={12} md={8}>
              <Card 
                data-testid="pp:landing|como-funciona|card|ui"
                style={{ 
                  textAlign: 'center', 
                  height: '100%',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  border: 'none',
                  transition: 'transform 0.3s ease'
                }}
                hoverable
              >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '50%',
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto'
                  }}>
                    <RocketOutlined style={{ fontSize: '40px', color: 'white' }} />
                  </div>
                  <Title level={3} style={{ margin: 0 }}>Playwright</Title>
                  <Text style={{ fontSize: '16px', lineHeight: '1.6' }}>
                    Pratique com <strong>botões, formulários, tabelas</strong> usando a ferramenta mais moderna 
                    para automação de testes.
                  </Text>
                  <Badge count="Fácil" style={{ backgroundColor: '#52c41a' }} />
                </Space>
              </Card>
            </Col>
            
            <Col xs={24} sm={12} md={8}>
              <Card 
                data-testid="pp:landing|como-funciona|card|upload"
                style={{ 
                  textAlign: 'center', 
                  height: '100%',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  border: 'none',
                  transition: 'transform 0.3s ease'
                }}
                hoverable
              >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #52c41a, #73d13d)',
                    borderRadius: '50%',
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto'
                  }}>
                    <UploadOutlined style={{ fontSize: '40px', color: 'white' }} />
                  </div>
                  <Title level={3} style={{ margin: 0 }}>Cypress</Title>
                  <Text style={{ fontSize: '16px', lineHeight: '1.6' }}>
                    Teste <strong>uploads, validações</strong> de arquivo e cenários complexos 
                    com a ferramenta mais popular do mercado.
                  </Text>
                  <Badge count="Médio" style={{ backgroundColor: '#fa8c16' }} />
                </Space>
              </Card>
            </Col>
            
            <Col xs={24} sm={12} md={8}>
              <Card 
                data-testid="pp:landing|como-funciona|card|iframe"
                style={{ 
                  textAlign: 'center', 
                  height: '100%',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  border: 'none',
                  transition: 'transform 0.3s ease'
                }}
                hoverable
              >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #fa8c16, #ffa940)',
                    borderRadius: '50%',
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto'
                  }}>
                    <BorderOutlined style={{ fontSize: '40px', color: 'white' }} />
                  </div>
                  <Title level={3} style={{ margin: 0 }}>E2E & APIs</Title>
                  <Text style={{ fontSize: '16px', lineHeight: '1.6' }}>
                    Domine <strong>iframes, comunicação</strong> entre elementos e 
                    testes de API completos com ambas as ferramentas.
                  </Text>
                  <Badge count="Difícil" style={{ backgroundColor: '#ff4d4f' }} />
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Para Quem É */}
      <section 
        data-testid="pp:landing|para-quem|section|root"
        style={{ padding: '100px 24px', background: '#f8f9fa' }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <Title level={2} style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
            👥 Para Quem É?
          </Title>
          <Paragraph style={{ fontSize: '1.2rem', color: '#666', marginBottom: '60px' }}>
            <strong>Desenvolvido para todos os níveis</strong> de conhecimento em automação de testes com Playwright, Cypress e mais
          </Paragraph>
          
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={6}>
              <Card 
                data-testid="pp:landing|para-quem|card|qa-iniciante"
                style={{ 
                  borderRadius: '16px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  border: 'none',
                  textAlign: 'center',
                  height: '100%'
                }}
                hoverable
              >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #52c41a, #73d13d)',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto'
                  }}>
                    <UserOutlined style={{ fontSize: '30px', color: 'white' }} />
                  </div>
                  <Title level={4} style={{ margin: 0, color: '#52c41a' }}>QA Iniciante</Title>
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    Aprenda os conceitos básicos de automação
                  </Text>
                </Space>
              </Card>
            </Col>
            
            <Col xs={24} sm={12} md={6}>
              <Card 
                data-testid="pp:landing|para-quem|card|automacao"
                style={{ 
                  borderRadius: '16px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  border: 'none',
                  textAlign: 'center',
                  height: '100%'
                }}
                hoverable
              >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #1890ff, #40a9ff)',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto'
                  }}>
                    <ThunderboltOutlined style={{ fontSize: '30px', color: 'white' }} />
                  </div>
                  <Title level={4} style={{ margin: 0, color: '#1890ff' }}>Automação</Title>
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    Pratique cenários complexos de teste
                  </Text>
                </Space>
              </Card>
            </Col>
            
            <Col xs={24} sm={12} md={6}>
              <Card 
                data-testid="pp:landing|para-quem|card|api"
                style={{ 
                  borderRadius: '16px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  border: 'none',
                  textAlign: 'center',
                  height: '100%'
                }}
                hoverable
              >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #722ed1, #9254de)',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto'
                  }}>
                    <ApiOutlined style={{ fontSize: '30px', color: 'white' }} />
                  </div>
                  <Title level={4} style={{ margin: 0, color: '#722ed1' }}>Testes de API</Title>
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    Integre testes de API com interface
                  </Text>
                </Space>
              </Card>
            </Col>
            
            <Col xs={24} sm={12} md={6}>
              <Card 
                data-testid="pp:landing|para-quem|card|e2e"
                style={{ 
                  borderRadius: '16px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  border: 'none',
                  textAlign: 'center',
                  height: '100%'
                }}
                hoverable
              >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #fa8c16, #ffa940)',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto'
                  }}>
                    <CheckCircleOutlined style={{ fontSize: '30px', color: 'white' }} />
                  </div>
                  <Title level={4} style={{ margin: 0, color: '#fa8c16' }}>E2E</Title>
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    Fluxos completos de ponta a ponta
                  </Text>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        data-testid="pp:landing|cta|section|root"
        style={{ 
          padding: '100px 24px', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          textAlign: 'center',
          color: 'white'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Title level={2} style={{ color: 'white', fontSize: '2.5rem', marginBottom: '20px' }}>
            🚀 Pronto para Começar?
          </Title>
          <Paragraph style={{ color: 'white', fontSize: '1.2rem', marginBottom: '40px' }}>
            Junte-se a milhares de desenvolvedores que já dominam automação de testes com Playwright, Cypress e outras ferramentas
          </Paragraph>
          
          <Space size="large">
            <Link href="/comecar">
              <Button
                type="primary"
                size="large"
                icon={<ThunderboltOutlined />}
                data-testid="pp:landing|cta|btn|comecar"
                style={{ 
                  height: '60px', 
                  fontSize: '18px',
                  padding: '0 40px',
                  borderRadius: '30px',
                  background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
                  border: 'none',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                }}
              >
                🎯 Começar Agora
              </Button>
            </Link>
            
            <Link href="/desafios">
              <Button
                size="large"
                icon={<TrophyOutlined />}
                data-testid="pp:landing|cta|btn|desafios"
                style={{ 
                  height: '60px', 
                  fontSize: '18px',
                  padding: '0 40px',
                  borderRadius: '30px',
                  background: 'rgba(255,255,255,0.2)', 
                  border: '2px solid rgba(255,255,255,0.5)', 
                  color: 'white',
                  backdropFilter: 'blur(10px)'
                }}
              >
                🏆 Ver Desafios
              </Button>
            </Link>
          </Space>
        </div>
      </section>

      {/* Sobre o Criador */}
      <section 
        data-testid="pp:landing|about|section|root"
        style={{ padding: '100px 24px', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
              👨‍💻 Sobre o Criador
            </Title>
            <Paragraph style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              Conheça quem desenvolveu esta plataforma para a comunidade de QA
            </Paragraph>
          </div>
          
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} md={8} style={{ textAlign: 'center' }}>
              <div style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  background: 'url("https://media.licdn.com/dms/image/v2/D4D03AQExiACxG47WFA/profile-displayphoto-scale_200_200/B4DZlxAjheIEAc-/0/1758537596850?e=1761782400&v=beta&t=aOSMi0pMyXNslCGh-acuQ-RI2Z_L4hVNR9Kz8j9p1X0") center/cover',
                  border: '4px solid white'
                }} />
              </div>
            </Col>
            
            <Col xs={24} md={16}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Title level={2} style={{ margin: 0, color: '#2E8B57' }}>
                    Levir Lemos
                  </Title>
                  <Text style={{ fontSize: '1.2rem', color: '#666', fontWeight: '500' }}>
                    Quality Assurance Analyst & Test Automation Specialist
                  </Text>
                </div>
                
                <Paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                  Apaixonado por automação de testes e qualidade de software, Levir é um especialista em QA 
                  com experiência em <strong>Playwright, Cypress, Selenium</strong> e outras ferramentas de teste. 
                  Como SDET (Software Development Engineer in Test), ele criou esta plataforma para democratizar 
                  o aprendizado de automação de testes.
                </Paragraph>
                
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Card 
                      size="small" 
                      style={{ 
                        borderRadius: '12px',
                        border: '1px solid #e8e8e8',
                        background: 'linear-gradient(135deg, #f8f9fa, #ffffff)'
                      }}
                    >
                      <Space>
                        <BookOutlined style={{ color: '#1890ff', fontSize: '20px' }} />
                        <div>
                          <Text strong style={{ display: 'block' }}>Formação</Text>
                          <Text type="secondary">Bacharel em Sistemas de informação</Text>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                  
                  <Col xs={24} sm={12}>
                    <Card 
                      size="small" 
                      style={{ 
                        borderRadius: '12px',
                        border: '1px solid #e8e8e8',
                        background: 'linear-gradient(135deg, #f8f9fa, #ffffff)'
                      }}
                    >
                      <Space>
                        <ThunderboltOutlined style={{ color: '#52c41a', fontSize: '20px' }} />
                        <div>
                          <Text strong style={{ display: 'block' }}>Especialidade</Text>
                          <Text type="secondary">Test Automation & QA</Text>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                </Row>
                
                <Space size="large">
                  <Link 
                    href="https://github.com/levircesar" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-testid="pp:landing|about|link|github"
                  >
                    <Button 
                      icon={<GithubOutlined />} 
                      size="large"
                      style={{ borderRadius: '25px' }}
                    >
                      GitHub
                    </Button>
                  </Link>
                  
                  <Link 
                    href="https://www.linkedin.com/in/levirlemos/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-testid="pp:landing|about|link|linkedin"
                  >
                    <Button 
                      icon={<LinkedinOutlined />} 
                      size="large"
                      style={{ borderRadius: '25px' }}
                    >
                      LinkedIn
                    </Button>
                  </Link>
                  
                  <Link 
                    href="mailto:levirlemos@gmail.com"
                    data-testid="pp:landing|about|link|email"
                  >
                    <Button 
                      icon={<MailOutlined />} 
                      size="large"
                      style={{ borderRadius: '25px' }}
                    >
                      Email
                    </Button>
                  </Link>
                </Space>
              </Space>
            </Col>
          </Row>
        </div>
      </section>

      {/* Doação */}
      <section 
        data-testid="pp:landing|donation|section|root"
        style={{ padding: '80px 24px', background: '#fafafa' }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Donation />
        </div>
      </section>

    </div>
  );
}
