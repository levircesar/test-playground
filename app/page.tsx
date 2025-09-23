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
import { useState, useEffect } from 'react';
import ContactForm from '@/components/ContactForm';
import Donation from '@/components/Donation';
import { useLocale } from '@/lib/locale-context';
import { getTranslations } from '@/lib/translations';

const { Title, Paragraph, Text } = Typography;

export default function LandingPage() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Verificar no mount
    checkIsMobile();

    // Adicionar listener para mudanças de tamanho
    window.addEventListener('resize', checkIsMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

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
          <Badge.Ribbon text={locale === 'pt-BR' ? '100% Gratuito' : '100% Free'} color="green" data-testid="pp:landing|badge|gratuito">
            <Title level={1} style={{ color: 'white', fontSize: '4rem', margin: '20px 0', fontWeight: 'bold' }}>
              🧪 {t.home.title}
            </Title>
          </Badge.Ribbon>
          
          <Paragraph style={{ 
            color: 'white', 
            fontSize: '1.4rem', 
            maxWidth: '700px', 
            margin: '0 auto',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            <strong>{t.home.subtitle}</strong>
            <br />
            {t.home.description}
          </Paragraph>
          
          <div className="hero-buttons" style={{ marginTop: '40px' }}>
            <Space 
              size="large" 
              direction={isMobile ? 'vertical' : 'horizontal'}
              style={{ width: '100%', justifyContent: 'center' }}
            >
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
                    border: 'none',
                    width: isMobile ? '100%' : 'auto',
                    maxWidth: isMobile ? '300px' : 'none'
                  }}
                >
                  🚀 {t.home.startButton}
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
                    backdropFilter: 'blur(10px)',
                    width: isMobile ? '100%' : 'auto',
                    maxWidth: isMobile ? '300px' : 'none'
                  }}
                >
                  🏆 {t.home.challengesButton}
                </Button>
              </Link>
            </Space>
          </div>
          
          {/* Stats */}
          <Row gutter={[32, 16]} style={{ marginTop: '60px', maxWidth: '800px', margin: '60px auto 0' }}>
            <Col xs={24} sm={8}>
              <Statistic
                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>{t.home.stats.challenges}</span>}
                value={20}
                valueStyle={{ color: '#fff', fontSize: '2rem' }}
                prefix={<TrophyOutlined />}
                data-testid="pp:landing|stat|desafios"
              />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic
                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>{t.home.stats.tools}</span>}
                value="Playwright + Cypress"
                valueStyle={{ color: '#fff', fontSize: '1.2rem' }}
                prefix={<ThunderboltOutlined />}
                data-testid="pp:landing|stat|ferramentas"
              />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic
                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>{t.home.stats.levels}</span>}
                value={locale === 'pt-BR' ? 'Fácil → Difícil' : locale === 'en-US' ? 'Easy → Hard' : 'Facile → Difficile'}
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
              🎯 {t.home.howItWorks}
            </Title>
            <Paragraph style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              {t.home.howItWorksDesc}
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
                  <Title level={3} style={{ margin: 0 }}>{t.home.features.playwright}</Title>
                  <Text style={{ fontSize: '16px', lineHeight: '1.6' }}>
                    {t.home.features.playwrightDesc}
                  </Text>
                  <Badge count={t.challenges.difficulty.easy} style={{ backgroundColor: '#52c41a' }} />
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
                  <Title level={3} style={{ margin: 0 }}>{t.home.features.cypress}</Title>
                  <Text style={{ fontSize: '16px', lineHeight: '1.6' }}>
                    {t.home.features.cypressDesc}
                  </Text>
                  <Badge count={t.challenges.difficulty.medium} style={{ backgroundColor: '#fa8c16' }} />
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
                  <Title level={3} style={{ margin: 0 }}>{t.home.features.e2e}</Title>
                  <Text style={{ fontSize: '16px', lineHeight: '1.6' }}>
                    {t.home.features.e2eDesc}
                  </Text>
                  <Badge count={t.challenges.difficulty.hard} style={{ backgroundColor: '#ff4d4f' }} />
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
            👥 {t.home.forWho}
          </Title>
          <Paragraph style={{ fontSize: '1.2rem', color: '#666', marginBottom: '60px' }}>
            {t.home.forWhoDesc}
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
                  <Title level={4} style={{ margin: 0, color: '#52c41a' }}>{t.home.audience.qaBeginner}</Title>
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    {t.home.audience.qaBeginnerDesc}
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
                  <Title level={4} style={{ margin: 0, color: '#1890ff' }}>{t.home.audience.automation}</Title>
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    {t.home.audience.automationDesc}
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
                  <Title level={4} style={{ margin: 0, color: '#722ed1' }}>{t.home.audience.apiTesting}</Title>
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    {t.home.audience.apiTestingDesc}
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
                  <Title level={4} style={{ margin: 0, color: '#fa8c16' }}>{t.home.audience.e2e}</Title>
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    {t.home.audience.e2eDesc}
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
            🚀 {t.home.readyToStart}
          </Title>
          <Paragraph style={{ color: 'white', fontSize: '1.2rem', marginBottom: '40px' }}>
            {t.home.readyToStartDesc}
          </Paragraph>
          
          <div className="cta-buttons">
            <Space 
              size="large" 
              direction={isMobile ? 'vertical' : 'horizontal'}
              style={{ width: '100%', justifyContent: 'center' }}
            >
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
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    width: isMobile ? '100%' : 'auto',
                    maxWidth: isMobile ? '300px' : 'none'
                  }}
                >
                  🎯 {t.home.startButton}
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
                    backdropFilter: 'blur(10px)',
                    width: isMobile ? '100%' : 'auto',
                    maxWidth: isMobile ? '300px' : 'none'
                  }}
                >
                  🏆 {t.home.challengesButton}
                </Button>
              </Link>
            </Space>
          </div>
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
              👨‍💻 {t.home.aboutCreator}
            </Title>
            {/*
            <Paragraph style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              {t.home.aboutCreatorDesc}
            </Paragraph>
            */}
            
          </div>
          
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} md={8} style={{ textAlign: 'center', marginBottom: isMobile ? '20px' : '0' }}>
              <div className="profile-photo" style={{
                width: isMobile ? '150px' : '200px',
                height: isMobile ? '150px' : '200px',
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
                  width: isMobile ? '130px' : '180px',
                  height: isMobile ? '130px' : '180px',
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
                    {t.home.creator.name}
                  </Title>
                  <Text style={{ fontSize: '1.2rem', color: '#666', fontWeight: '500' }}>
                    {t.home.creator.title}
                  </Text>
                </div>
                
                <Paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                  {t.home.creator.description}
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
                          <Text strong style={{ display: 'block' }}>{t.home.creator.education}</Text>
                          <Text type="secondary">{t.home.creator.educationDesc}</Text>
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
                          <Text strong style={{ display: 'block' }}>{t.home.creator.specialty}</Text>
                          <Text type="secondary">{t.home.creator.specialtyDesc}</Text>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                </Row>
                
                <div className="social-buttons">
                  <Space 
                    size="large" 
                    wrap
                    style={{ 
                      width: '100%', 
                      justifyContent: isMobile ? 'center' : 'flex-start' 
                    }}
                  >
                    <Link 
                      href="https://github.com/levircesar" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      data-testid="pp:landing|about|link|github"
                    >
                      <Button 
                        icon={<GithubOutlined />} 
                        size={isMobile ? 'middle' : 'large'}
                        style={{ 
                          borderRadius: '25px',
                          width: typeof window !== 'undefined' && window.innerWidth <= 480 ? '100%' : 'auto',
                          minWidth: typeof window !== 'undefined' && window.innerWidth <= 480 ? '120px' : 'auto'
                        }}
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
                        size={isMobile ? 'middle' : 'large'}
                        style={{ 
                          borderRadius: '25px',
                          width: typeof window !== 'undefined' && window.innerWidth <= 480 ? '100%' : 'auto',
                          minWidth: typeof window !== 'undefined' && window.innerWidth <= 480 ? '120px' : 'auto'
                        }}
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
                        size={isMobile ? 'middle' : 'large'}
                        style={{ 
                          borderRadius: '25px',
                          width: typeof window !== 'undefined' && window.innerWidth <= 480 ? '100%' : 'auto',
                          minWidth: typeof window !== 'undefined' && window.innerWidth <= 480 ? '120px' : 'auto'
                        }}
                      >
                        Email
                      </Button>
                    </Link>
                  </Space>
                </div>
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
