'use client';
import { ReactNode } from 'react';
import { Alert, Button, Card, Space, Typography } from 'antd';
import { ExclamationCircleOutlined, ReloadOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface FirebaseErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function FirebaseErrorBoundary({ children, fallback }: FirebaseErrorBoundaryProps) {
  try {
    return <>{children}</>;
  } catch (error: any) {
    console.error('Firebase Error:', error);
    
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div style={{ padding: '40px 24px', maxWidth: '600px', margin: '0 auto' }}>
        <Card>
          <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
            <ExclamationCircleOutlined style={{ fontSize: '64px', color: '#ff4d4f' }} />
            
            <div>
              <Title level={2} style={{ color: '#ff4d4f' }}>
                🔥 Erro de Configuração Firebase
              </Title>
              <Paragraph style={{ fontSize: '16px', color: '#666' }}>
                O Firebase não está configurado corretamente
              </Paragraph>
            </div>

            <Alert
              message="Configuração Necessária"
              description={
                <div>
                  <p>Para usar o painel administrativo, você precisa:</p>
                  <ol style={{ textAlign: 'left', marginTop: '12px' }}>
                    <li>Criar um projeto no <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer">Firebase Console</a></li>
                    <li>Ativar a autenticação com Google</li>
                    <li>Ativar o Firestore Database</li>
                    <li>Criar um arquivo <code>.env.local</code> na raiz do projeto</li>
                  </ol>
                </div>
              }
              type="warning"
              showIcon
              style={{ textAlign: 'left' }}
            />

            <div style={{ 
              background: '#f5f5f5', 
              padding: '16px', 
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '14px',
              textAlign: 'left'
            }}>
              <Title level={5}>📝 Exemplo de .env.local:</Title>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
{`NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id`}
              </pre>
            </div>

            <Button 
              type="primary" 
              icon={<ReloadOutlined />}
              onClick={() => window.location.reload()}
            >
              Tentar Novamente
            </Button>

            <Paragraph style={{ fontSize: '12px', color: '#999', margin: 0 }}>
              💡 Consulte o arquivo ADMIN_SETUP.md para instruções detalhadas
            </Paragraph>
          </Space>
        </Card>
      </div>
    );
  }
}
