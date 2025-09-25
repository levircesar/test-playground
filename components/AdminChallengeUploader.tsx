'use client';
import { useState } from 'react';
import { Button, Card, Typography, Space, message, Progress, Alert } from 'antd';
import { UploadOutlined, CheckCircleOutlined, FireOutlined } from '@ant-design/icons';
import { collection, addDoc, writeBatch, doc } from 'firebase/firestore';
import { firestore } from '@/config/firebase';
import { useAuth } from '@/lib/contexts/AuthContext';

const { Title, Paragraph, Text } = Typography;

interface Challenge {
  id: number;
  title: {
    'pt-BR': string;
    'en-US': string;
    'fr-FR': string;
  };
  description: {
    'pt-BR': string;
    'en-US': string;
    'fr-FR': string;
  };
  level: string;
  type: string;
  dataTestId: string;
  expectedResult: {
    'pt-BR': string;
    'en-US': string;
    'fr-FR': string;
  };
  playwrightSolution: string;
  cypressSolution: string;
  route: string;
}

export default function AdminChallengeUploader() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedCount, setUploadedCount] = useState(0);
  const { user, isAuthenticated, isAdmin } = useAuth();

  const uploadChallengesToFirebase = async () => {
    if (!isAuthenticated) {
      message.error('Você precisa estar logado para enviar desafios');
      return;
    }
    
    if (!isAdmin) {
      message.error('Apenas administradores podem enviar desafios');
      return;
    }

    try {
      setLoading(true);
      setProgress(0);
      setUploadedCount(0);

      // Importar os dados dos desafios
      const challengesData = await import('@/data/challenges-firebase.json');
      const challenges: Challenge[] = challengesData.default;

      // Criar batch para inserção em lote
      const batch = writeBatch(firestore);
      const challengesRef = collection(firestore, 'playground', 'challenges', 'data');

      // Adicionar cada desafio ao batch
      challenges.forEach((challenge, index) => {
        const docRef = doc(challengesRef);
        batch.set(docRef, {
          titulo: challenge.title['pt-BR'],
          nivel: challenge.level === 'easy' ? 'Fácil' : 
                 challenge.level === 'medium' ? 'Médio' : 
                 challenge.level === 'hard' ? 'Difícil' : 
                 challenge.level === 'api' ? 'API' : 'API+Tela',
          tipo: challenge.type === 'ui' ? 'UI' : 
                challenge.type === 'upload' ? 'Upload' : 
                challenge.type === 'iframe' ? 'Iframe' : 
                challenge.type === 'api' ? 'API' : 'E2E',
          tags: [challenge.type, challenge.level],
          rota: challenge.route,
          descricao: challenge.description['pt-BR'],
          resultadoEsperado: challenge.expectedResult['pt-BR'],
          solucaoPlaywright: challenge.playwrightSolution,
          solucaoCypress: challenge.cypressSolution,
          dataTestId: challenge.dataTestId,
          traducoes: {
            'pt-BR': {
              titulo: challenge.title['pt-BR'],
              descricao: challenge.description['pt-BR'],
              resultadoEsperado: challenge.expectedResult['pt-BR']
            },
            'en-US': {
              titulo: challenge.title['en-US'],
              descricao: challenge.description['en-US'],
              resultadoEsperado: challenge.expectedResult['en-US']
            },
            'fr-FR': {
              titulo: challenge.title['fr-FR'],
              descricao: challenge.description['fr-FR'],
              resultadoEsperado: challenge.expectedResult['fr-FR']
            }
          },
          createdAt: new Date(),
          createdBy: user?.uid || 'admin',
          createdByEmail: user?.email || 'admin@example.com',
          version: 1,
          status: 'active'
        });
      });

      // Executar batch
      await batch.commit();

      // Simular progresso
      for (let i = 0; i <= challenges.length; i++) {
        setProgress((i / challenges.length) * 100);
        setUploadedCount(i);
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      message.success(`✅ ${challenges.length} desafios enviados com sucesso para o Firebase!`);
      
    } catch (error) {
      console.error('Erro ao enviar desafios:', error);
      message.error('Erro ao enviar desafios para o Firebase');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Card 
        data-testid="pp:admin|card|uploader|login-required"
        style={{ margin: '20px 0' }}
      >
        <Alert
          message="Login Necessário"
          description="Você precisa fazer login para enviar desafios ao Firebase"
          type="warning"
          showIcon
        />
      </Card>
    );
  }

  if (!isAdmin) {
    return (
      <Card 
        data-testid="pp:admin|card|uploader|no-permission"
        style={{ margin: '20px 0' }}
      >
        <Alert
          message="Permissão Insuficiente"
          description="Apenas administradores podem enviar desafios ao Firebase"
          type="error"
          showIcon
        />
      </Card>
    );
  }

  return (
    <Card 
      data-testid="pp:admin|card|uploader|root"
      title={
        <Space>
          <FireOutlined style={{ color: '#ff4d4f' }} />
          <span>Enviar Desafios para Firebase</span>
        </Space>
      }
      style={{ margin: '20px 0' }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={4}>📊 Resumo dos Desafios</Title>
          <Paragraph>
            <Text strong>Total de desafios:</Text> 17<br />
            <Text strong>Fáceis:</Text> 7 desafios (botões, formulários, busca, seleção)<br />
            <Text strong>Médios:</Text> 2 desafios (validação de email, autocomplete)<br />
            <Text strong>Difíceis:</Text> 2 desafios (drag & drop, canvas)<br />
            <Text strong>Web API:</Text> 2 desafios (WebSocket, geolocalização)<br />
            <Text strong>API:</Text> 4 desafios (CRUD completo de usuários)
          </Paragraph>
        </div>

        <div>
          <Title level={4}>🎯 Características</Title>
          <Paragraph>
            ✅ Cada desafio possui traduções em PT-BR, EN-US e FR-FR<br />
            ✅ Soluções completas para Playwright e Cypress<br />
            ✅ Data-testid únicos seguindo padrão do projeto<br />
            ✅ Descrições detalhadas e resultados esperados<br />
            ✅ Organizados por nível de dificuldade
          </Paragraph>
        </div>

        {loading && (
          <div data-testid="pp:admin|div|progress">
            <Text strong>Enviando desafios...</Text>
            <Progress 
              percent={Math.round(progress)} 
              status={progress === 100 ? 'success' : 'active'}
              style={{ marginTop: '8px' }}
            />
            <Text type="secondary">
              {uploadedCount} de 17 desafios enviados
            </Text>
          </div>
        )}

        <Button
          type="primary"
          size="large"
          icon={<UploadOutlined />}
          loading={loading}
          onClick={uploadChallengesToFirebase}
          data-testid="pp:admin|btn|upload-challenges"
          style={{
            background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
            border: 'none',
            height: '50px',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          🚀 Enviar 17 Desafios para Firebase
        </Button>

        <Alert
          message="⚠️ Atenção"
          description="Esta ação irá enviar todos os 17 desafios para o Firebase. Certifique-se de que você tem permissões adequadas."
          type="info"
          showIcon
        />
      </Space>
    </Card>
  );
}
