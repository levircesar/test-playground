'use client';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Spin, Card } from 'antd';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  redirectTo = '/admin/login' 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
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

  // Redirecionar se não estiver logado
  if (!user) {
    router.push(redirectTo);
    return null;
  }

  // Renderizar conteúdo se estiver logado
  return <>{children}</>;
}
