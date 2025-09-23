'use client';
import { Typography, Space } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';
import ChallengeTable from '@/components/ChallengeTable';
import BackButton from '@/components/BackButton';
import { getChallenges } from '@/lib/challenges';

const { Title, Paragraph } = Typography;

export default function DesafiosPage() {
  const challenges = getChallenges();

  return (
    <div data-testid="pp:desafios|page|container|root" style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <BackButton href="/" testId="pp:desafios|btn|voltar" />
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Space direction="vertical" size="large">
            <TrophyOutlined style={{ fontSize: '64px', color: '#fa8c16' }} />
            <div>
              <Title level={1}>Desafios de Automação</Title>
              <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                Explore nossa coleção completa de desafios organizados por nível de dificuldade. 
                Cada desafio foi criado para testar habilidades específicas em automação de testes.
              </Paragraph>
            </div>
          </Space>
        </div>

        <div data-testid="pp:desafios|table|container|root">
          <ChallengeTable challenges={challenges} />
        </div>

        {/* Estatísticas */}
        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <Title level={3}>Estatísticas dos Desafios</Title>
          <Space size="large" wrap>
            <div data-testid="pp:desafios|stats|total">
              <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
                {challenges.length}
              </Title>
              <Paragraph style={{ margin: 0 }}>Total de Desafios</Paragraph>
            </div>
            
            <div data-testid="pp:desafios|stats|facil">
              <Title level={4} style={{ margin: 0, color: '#52c41a' }}>
                {challenges.filter(c => c.nivel === 'Fácil').length}
              </Title>
              <Paragraph style={{ margin: 0 }}>Fáceis</Paragraph>
            </div>
            
            <div data-testid="pp:desafios|stats|medio">
              <Title level={4} style={{ margin: 0, color: '#fa8c16' }}>
                {challenges.filter(c => c.nivel === 'Médio').length}
              </Title>
              <Paragraph style={{ margin: 0 }}>Médios</Paragraph>
            </div>
            
            <div data-testid="pp:desafios|stats|dificil">
              <Title level={4} style={{ margin: 0, color: '#ff4d4f' }}>
                {challenges.filter(c => c.nivel === 'Difícil').length}
              </Title>
              <Paragraph style={{ margin: 0 }}>Difíceis</Paragraph>
            </div>
            
            <div data-testid="pp:desafios|stats|api">
              <Title level={4} style={{ margin: 0, color: '#722ed1' }}>
                {challenges.filter(c => c.nivel.includes('API')).length}
              </Title>
              <Paragraph style={{ margin: 0 }}>API</Paragraph>
            </div>
          </Space>
        </div>
      </div>
    </div>
  );
}
