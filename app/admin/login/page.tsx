'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/config/firebase';
import { Button, Card, Typography, Space, Spin, message } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import FirebaseErrorBoundary from '@/components/FirebaseErrorBoundary';
import { useAuth } from '@/lib/contexts/AuthContext';

const { Title, Paragraph } = Typography;

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (user && !authLoading) {
      router.push('/admin/challenges');
    }
  }, [user, authLoading, router]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      
      if (result.user) {
        message.success('Login realizado com sucesso!');
        router.push('/admin/challenges');
      }
    } catch (error: any) {
      console.error('Erro no login:', error);
      message.error('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Mostrar loading enquanto verifica autenticação
  if (authLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <Card style={{ padding: '40px', textAlign: 'center' }}>
          <Spin size="large" />
          <p style={{ marginTop: '16px', color: '#666' }}>Verificando autenticação...</p>
        </Card>
      </div>
    );
  }

  return (
    <FirebaseErrorBoundary>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px'
      }}>
        <Card 
          style={{ 
            width: '100%', 
            maxWidth: 400,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255,255,255,0.95)'
          }}
        >
          <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
            <div>
              <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
                🔐 Admin Login
              </Title>
            <Paragraph style={{ marginTop: '8px', color: '#666' }}>
              Faça login para acessar o painel administrativo
            </Paragraph>
            <Paragraph style={{ fontSize: '12px', color: '#999', margin: '8px 0 0 0' }}>
              ⚠️ Apenas usuários com role <strong>admin</strong> podem acessar esta área.<br />
              Usuários comuns recebem role <strong>basic</strong> automaticamente.
            </Paragraph>
            </div>

            <Button
              type="primary"
              size="large"
              icon={<GoogleOutlined />}
              loading={loading}
              onClick={handleGoogleLogin}
              style={{ 
                width: '100%',
                height: '48px',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Entrar com Google
            </Button>

            <Paragraph style={{ fontSize: '12px', color: '#999', margin: 0 }}>
              Apenas usuários autorizados podem acessar esta área
            </Paragraph>
          </Space>
        </Card>
      </div>
    </FirebaseErrorBoundary>
  );
}
