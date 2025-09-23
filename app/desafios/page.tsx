'use client';
import { Typography, Space } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';
import ChallengeTable from '@/components/ChallengeTable';
import BackButton from '@/components/BackButton';
import SEOHead from '@/components/SEOHead';
import { getChallenges } from '@/lib/challenges';
import { useLocale } from '@/lib/locale-context';
import { getTranslations } from '@/lib/translations';

const { Title, Paragraph } = Typography;

export default function DesafiosPage() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const challenges = getChallenges();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": t.challenges.title,
    "description": t.challenges.subtitle,
    "url": "https://playwright-playground.vercel.app/desafios",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Desafios de Automação de Testes",
      "description": "Lista completa de desafios práticos para aprender Playwright e automação de testes",
      "numberOfItems": challenges.length,
      "itemListElement": challenges.map((challenge, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "LearningResource",
          "name": challenge.titulo,
          "description": challenge.descricao,
          "educationalLevel": challenge.nivel,
          "learningResourceType": "Challenge",
          "teaches": challenge.tags || ["Test Automation", "Playwright"]
        }
      }))
    }
  };

  return (
    <>
      <SEOHead
        title={t.challenges.title}
        description={`${t.challenges.subtitle}. Explore ${challenges.length} desafios práticos organizados por nível de dificuldade para aprender automação de testes com Playwright.`}
        keywords="desafios playwright, exercícios automação testes, prática playwright, testes web, QA challenges, aprendizado prático"
        canonicalUrl="/desafios"
        structuredData={structuredData}
      />
      <div data-testid="pp:desafios|page|container|root" style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <BackButton href="/" testId="pp:desafios|btn|voltar" />
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Space direction="vertical" size="large">
            <TrophyOutlined style={{ fontSize: '64px', color: '#fa8c16' }} />
            <div>
              <Title level={1}>{t.challenges.title}</Title>
              <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                {t.challenges.subtitle}
              </Paragraph>
            </div>
          </Space>
        </div>

        <div data-testid="pp:desafios|table|container|root">
          <ChallengeTable challenges={challenges} />
        </div>

        {/* Estatísticas */}
        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <Title level={3}>
            {locale === 'pt-BR' ? 'Estatísticas dos Desafios' : 
             locale === 'en-US' ? 'Challenge Statistics' : 
             'Statistiques des Défis'}
          </Title>
          <Space size="large" wrap>
            <div data-testid="pp:desafios|stats|total">
              <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
                {challenges.length}
              </Title>
              <Paragraph style={{ margin: 0 }}>
                {locale === 'pt-BR' ? 'Total de Desafios' : 
                 locale === 'en-US' ? 'Total Challenges' : 
                 'Total des Défis'}
              </Paragraph>
            </div>
            
            <div data-testid="pp:desafios|stats|facil">
              <Title level={4} style={{ margin: 0, color: '#52c41a' }}>
                {challenges.filter(c => c.nivel === 'Fácil').length}
              </Title>
              <Paragraph style={{ margin: 0 }}>{t.challenges.difficulty.easy}</Paragraph>
            </div>
            
            <div data-testid="pp:desafios|stats|medio">
              <Title level={4} style={{ margin: 0, color: '#fa8c16' }}>
                {challenges.filter(c => c.nivel === 'Médio').length}
              </Title>
              <Paragraph style={{ margin: 0 }}>{t.challenges.difficulty.medium}</Paragraph>
            </div>
            
            <div data-testid="pp:desafios|stats|dificil">
              <Title level={4} style={{ margin: 0, color: '#ff4d4f' }}>
                {challenges.filter(c => c.nivel === 'Difícil').length}
              </Title>
              <Paragraph style={{ margin: 0 }}>{t.challenges.difficulty.hard}</Paragraph>
            </div>
            
            <div data-testid="pp:desafios|stats|api">
              <Title level={4} style={{ margin: 0, color: '#722ed1' }}>
                {challenges.filter(c => c.nivel.includes('API')).length}
              </Title>
              <Paragraph style={{ margin: 0 }}>
                {locale === 'pt-BR' ? 'API' : 
                 locale === 'en-US' ? 'API' : 
                 'API'}
              </Paragraph>
            </div>
          </Space>
        </div>
      </div>
      </div>
    </>
  );
}
