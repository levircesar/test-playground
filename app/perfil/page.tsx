'use client';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Space, 
  Tag, 
  Button, 
  Avatar, 
  Divider,
  Row,
  Col,
  Alert
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  CalendarOutlined, 
  ClockCircleOutlined,
  LogoutOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function PerfilPage() {
  const { user, userRole, isAuthenticated, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (!isAuthenticated || !user || !userRole) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <Card>
          <Space direction="vertical" align="center">
            <UserOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
            <Title level={3}>Carregando perfil...</Title>
          </Space>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Button 
                icon={<ArrowLeftOutlined />} 
                onClick={handleBack}
              >
                Voltar
              </Button>
            </Col>
            <Col>
              <Button 
                icon={<LogoutOutlined />} 
                onClick={handleLogout}
                danger
              >
                Sair
              </Button>
            </Col>
          </Row>

          <Divider />

          <Row gutter={[24, 24]} align="middle">
            <Col>
              <Avatar 
                size={80} 
                icon={<UserOutlined />} 
                src={user.photoURL}
                style={{ backgroundColor: '#1890ff' }}
              />
            </Col>
            <Col flex={1}>
              <Title level={2} style={{ margin: 0 }}>
                {userRole.displayName || 'Usuário'}
              </Title>
              <Space align="center" style={{ marginTop: '8px' }}>
                <Tag 
                  color={userRole.role === 'admin' ? 'red' : 'blue'}
                  style={{ fontSize: '14px', padding: '4px 12px' }}
                >
                  {userRole.role === 'admin' ? '👑 Administrador' : '👤 Usuário Básico'}
                </Tag>
              </Space>
            </Col>
          </Row>

          <Divider />

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={4}>📧 Informações de Conta</Title>
            </Col>
            <Col span={12}>
              <Space direction="vertical" size="small">
                <Text strong>
                  <MailOutlined /> Email:
                </Text>
                <Text copyable>{userRole.email}</Text>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction="vertical" size="small">
                <Text strong>
                  🆔 ID do Usuário:
                </Text>
                <Text copyable code>{userRole.uid}</Text>
              </Space>
            </Col>
          </Row>

          <Divider />

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={4}>📅 Informações de Acesso</Title>
            </Col>
            <Col span={12}>
              <Space direction="vertical" size="small">
                <Text strong>
                  <CalendarOutlined /> Conta criada em:
                </Text>
                <Text>{userRole.createdAt.toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</Text>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction="vertical" size="small">
                <Text strong>
                  <ClockCircleOutlined /> Último acesso:
                </Text>
                <Text>{userRole.lastLogin.toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric', 
                  hour: '2-digit',
                  minute: '2-digit'
                })}</Text>
              </Space>
            </Col>
          </Row>

          <Divider />

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={4}>🔐 Permissões</Title>
            </Col>
            <Col span={24}>
              {userRole.role === 'admin' ? (
                <Alert
                  message="Administrador"
                  description="Você tem acesso completo ao sistema, incluindo criação, edição e exclusão de desafios."
                  type="success"
                  showIcon
                />
              ) : (
                <Alert
                  message="Usuário Básico"
                  description="Você pode visualizar e usar os desafios, mas não pode criar, editar ou excluir conteúdo."
                  type="info"
                  showIcon
                />
              )}
            </Col>
          </Row>

          {userRole.role === 'basic' && (
            <>
              <Divider />
              <Alert
                message="Quer se tornar um administrador?"
                description="Entre em contato com os desenvolvedores do projeto para solicitar acesso de administrador."
                type="warning"
                showIcon
              />
            </>
          )}
        </Space>
      </Card>
    </div>
  );
}
