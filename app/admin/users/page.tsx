'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { firestore } from '@/config/firebase';
import { useAuth } from '@/lib/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  Button, 
  Card, 
  Space, 
  Table, 
  Typography, 
  Tag, 
  message, 
  Input,
  Select,
  Modal,
  Form,
  Row,
  Col,
  Divider,
  Spin,
  Empty,
  Tooltip
} from 'antd';
import { 
  LogoutOutlined,
  UserOutlined,
  SearchOutlined,
  EditOutlined,
  CrownOutlined,
  TeamOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  role: 'basic' | 'admin';
  createdAt: Date;
  lastLogin: Date;
}

export default function AdminUsers() {
  const { user, userRole, loading: authLoading, isAdmin, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading) {
      if (user && userRole) {
        if (userRole.role !== 'admin') {
          console.log('🔐 Admin: Usuário sem permissão de admin. Role:', userRole.role);
          message.warning('Você não tem permissão para acessar esta área');
          router.push('/');
          return;
        }
        loadUsers();
      } else if (user && !userRole) {
        return;
      } else {
        router.push('/admin/login');
      }
    }
  }, [user, userRole, authLoading, router]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      console.log('🔄 Admin: Carregando usuários do Firebase...');
      
      const playgroundRef = collection(firestore, 'playground');
      const querySnapshot = await getDocs(playgroundRef);
       
      
      const usersData: UserData[] = [];
      querySnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        // Verificar se é um documento de usuário (tem os campos necessários)
        if (data.uid && data.email && data.role) {
          usersData.push({
            uid: data.uid,
            email: data.email,
            displayName: data.displayName || 'Sem nome',
            role: data.role,
            createdAt: data.createdAt?.toDate() || new Date(),
            lastLogin: data.lastLogin?.toDate() || new Date()
          });
        }
      });
      
      console.log('✅ Admin: Usuários carregados:', usersData.length);
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (error) {
      console.error('❌ Admin: Erro ao carregar usuários:', error);
      message.error('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleBackToChallenges = () => {
    router.push('/admin/challenges');
  };

  const handleSearch = (value: string) => {
    if (!value.trim()) {
      setFilteredUsers(users);
      return;
    }
    
    const filtered = users.filter(user => 
      user.email.toLowerCase().includes(value.toLowerCase()) ||
      user.displayName.toLowerCase().includes(value.toLowerCase()) ||
      user.uid.toLowerCase().includes(value.toLowerCase())
    );
    
    setFilteredUsers(filtered);
  };

  const handleRoleFilter = (value: string) => {
    if (value === 'all') {
      setFilteredUsers(users);
      return;
    }
    
    const filtered = users.filter(user => user.role === value);
    setFilteredUsers(filtered);
  };

  const handleEditUser = (userData: UserData) => {
    setEditingUser(userData);
    form.setFieldsValue({
      role: userData.role
    });
    setModalVisible(true);
  };

  const handleUpdateRole = async (values: { role: 'basic' | 'admin' }) => {
    if (!editingUser) return;

    try {
      const userRef = doc(firestore, 'playground', editingUser.uid);
      await updateDoc(userRef, {
        role: values.role
      });

      // Atualizar estado local
      setUsers(users.map(u => 
        u.uid === editingUser.uid ? { ...u, role: values.role } : u
      ));
      setFilteredUsers(filteredUsers.map(u => 
        u.uid === editingUser.uid ? { ...u, role: values.role } : u
      ));

      message.success(`Role do usuário ${editingUser.email} atualizada para ${values.role === 'admin' ? 'Administrador' : 'Básico'}!`);
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Erro ao atualizar role:', error);
      message.error('Erro ao atualizar role do usuário');
    }
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'displayName',
      key: 'avatar',
      width: 80,
      render: (name: string, record: UserData) => (
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: record.role === 'admin' ? '#ff4d4f' : '#1890ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              margin: '0 auto'
            }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
        </div>
      ),
    },
    {
      title: 'Nome',
      dataIndex: 'displayName',
      key: 'displayName',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: (role: string) => (
        <Tag 
          color={role === 'admin' ? 'red' : 'blue'}
          icon={role === 'admin' ? <CrownOutlined /> : <UserOutlined />}
        >
          {role === 'admin' ? '👑 Admin' : '👤 Básico'}
        </Tag>
      ),
    },
    {
      title: 'Conta Criada',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (date: Date) => date.toLocaleDateString('pt-BR'),
    },
    {
      title: 'Último Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      width: 150,
      render: (date: Date) => date.toLocaleDateString('pt-BR'),
    },
    {
      title: 'UID',
      dataIndex: 'uid',
      key: 'uid',
      width: 120,
      render: (uid: string) => (
        <Tooltip title={uid}>
          <Text code style={{ fontSize: '10px' }}>
            {uid.substring(0, 8)}...
          </Text>
        </Tooltip>
      ),
    },
    {
      title: 'Ações',
      key: 'actions',
      width: 100,
      fixed: 'right' as const,
      render: (_: any, record: UserData) => (
        <Button
          type="primary"
          size="small"
          icon={<EditOutlined />}
          onClick={() => handleEditUser(record)}
          style={{ minWidth: '80px' }}
        >
          Editar Role
        </Button>
      ),
    },
  ];

  return (
    <ProtectedRoute>
      <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        <Card>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={2} style={{ margin: 0 }}>
                  👥 Gerenciamento de Usuários
                </Title>
                <Paragraph style={{ margin: 0, color: '#666' }}>
                  Gerencie roles e permissões dos usuários do sistema
                </Paragraph>
              </Col>
              <Col>
                <Space>
                  <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBackToChallenges}
                  >
                    Voltar aos Desafios
                  </Button>
                  <Button
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                  >
                    Sair
                  </Button>
                </Space>
              </Col>
            </Row>

            <Divider />

            {/* Filtros */}
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={12} md={8}>
                <Search
                  placeholder="Buscar por email, nome ou UID..."
                  allowClear
                  enterButton={<SearchOutlined />}
                  onSearch={handleSearch}
                  onChange={(e) => {
                    if (!e.target.value) {
                      setFilteredUsers(users);
                    }
                  }}
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Select
                  placeholder="Filtrar por role"
                  style={{ width: '100%' }}
                  onChange={handleRoleFilter}
                  allowClear
                >
                  <Option value="all">Todos</Option>
                  <Option value="admin">👑 Administradores</Option>
                  <Option value="basic">👤 Usuários Básicos</Option>
                </Select>
              </Col>
              <Col xs={24} sm={24} md={10}>
                <Space>
                  <TeamOutlined />
                  <Text strong>Total: {users.length} usuários</Text>
                  <Text type="secondary">
                    ({filteredUsers.length} {filteredUsers.length !== users.length ? 'filtrados' : 'exibidos'})
                  </Text>
                </Space>
              </Col>
            </Row>

            <Divider />

            {loading ? (
              <div style={{ padding: '50px', textAlign: 'center' }}>
                <Spin size="large" />
                <div style={{ marginTop: '16px', fontSize: '16px', color: '#666' }}>
                  Carregando usuários...
                </div>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div style={{ padding: '50px' }}>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Nenhum usuário encontrado"
                  style={{ margin: '40px 0' }}
                />
              </div>
            ) : (
              <Table
                columns={columns}
                dataSource={filteredUsers}
                rowKey="uid"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => 
                    `${range[0]}-${range[1]} de ${total} usuários`,
                }}
                scroll={{ x: 1000 }}
              />
            )}
          </Space>
        </Card>

        {/* Modal para editar role */}
        <Modal
          title={
            <Space>
              <EditOutlined />
              <span>Editar Role do Usuário</span>
            </Space>
          }
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            form.resetFields();
          }}
          footer={null}
          width={500}
        >
          {editingUser && (
            <div style={{ marginBottom: '24px' }}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Space direction="vertical" size="small">
                    <Text strong>Usuário:</Text>
                    <Text>{editingUser.displayName}</Text>
                    <Text type="secondary">{editingUser.email}</Text>
                  </Space>
                </Col>
              </Row>
            </div>
          )}

          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdateRole}
          >
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Selecione uma role' }]}
            >
              <Select placeholder="Selecione a role">
                <Option value="basic">
                  <Space>
                    <UserOutlined />
                    <span>👤 Usuário Básico</span>
                  </Space>
                </Option>
                <Option value="admin">
                  <Space>
                    <CrownOutlined />
                    <span>👑 Administrador</span>
                  </Space>
                </Option>
              </Select>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Space>
                <Button onClick={() => setModalVisible(false)}>
                  Cancelar
                </Button>
                <Button type="primary" htmlType="submit" icon={<EditOutlined />}>
                  Atualizar Role
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </ProtectedRoute>
  );
}
