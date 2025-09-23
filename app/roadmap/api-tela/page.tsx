'use client';
import { 
  Typography, 
  Card, 
  Row, 
  Col, 
  Space, 
  Button, 
  Input, 
  Alert, 
  message,
  List,
  Tag,
  Checkbox,
  Divider
} from 'antd';
import { 
  PlusOutlined, 
  DeleteOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import XPathTester from '@/components/XPathTester';
import BackButton from '@/components/BackButton';
import RoadmapChallengesButton from '@/components/RoadmapChallengesButton';
import { getJSON, setJSON, STORAGE_KEYS } from '@/lib/storage';

const { Title, Paragraph, Text } = Typography;

interface Todo {
  id: number;
  text: string;
  done: boolean;
  createdAt: string;
}

interface ApiResponse {
  todos: Todo[];
  total: number;
  completed: number;
  pending: number;
}

export default function ApiTelaPage() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string>('');
  const [apiStatus, setApiStatus] = useState<'online' | 'offline'>('online');

  useEffect(() => {
    // Carregar TODOs do localStorage
    const savedTodos = getJSON(STORAGE_KEYS.TODOS, []);
    setTodos(savedTodos);
    
    // Tentar sincronizar com a API
    syncWithApi();
  }, []);

  const syncWithApi = async () => {
    setSyncing(true);
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) throw new Error('API offline');
      
      const data: ApiResponse = await response.json();
      setTodos(data.todos);
      setJSON(STORAGE_KEYS.TODOS, data.todos);
      setApiStatus('online');
      setLastSync(new Date().toLocaleString());
      message.success('Sincronizado com a API!');
    } catch (error) {
      setApiStatus('offline');
      message.warning('API offline - usando dados locais');
    } finally {
      setSyncing(false);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) {
      message.warning('Digite um texto para o TODO');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTodo.trim() }),
      });

      if (!response.ok) throw new Error('Erro na API');

      const data = await response.json();
      const updatedTodos = [...todos, data.todo];
      
      setTodos(updatedTodos);
      setJSON(STORAGE_KEYS.TODOS, updatedTodos);
      setNewTodo('');
      setApiStatus('online');
      setLastSync(new Date().toLocaleString());
      message.success('TODO criado com sucesso!');
    } catch (error) {
      // Fallback local
      const localTodo: Todo = {
        id: Date.now(),
        text: newTodo.trim(),
        done: false,
        createdAt: new Date().toISOString()
      };
      
      const updatedTodos = [...todos, localTodo];
      setTodos(updatedTodos);
      setJSON(STORAGE_KEYS.TODOS, updatedTodos);
      setNewTodo('');
      setApiStatus('offline');
      message.warning('API offline - TODO salvo localmente');
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/todos?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro na API');

      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
      setJSON(STORAGE_KEYS.TODOS, updatedTodos);
      setApiStatus('online');
      setLastSync(new Date().toLocaleString());
      message.success('TODO removido com sucesso!');
    } catch (error) {
      // Fallback local
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
      setJSON(STORAGE_KEYS.TODOS, updatedTodos);
      setApiStatus('offline');
      message.warning('API offline - TODO removido localmente');
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
    setJSON(STORAGE_KEYS.TODOS, updatedTodos);
  };

  const clearCompleted = () => {
    const updatedTodos = todos.filter(todo => !todo.done);
    setTodos(updatedTodos);
    setJSON(STORAGE_KEYS.TODOS, updatedTodos);
    message.success('TODOs concluídos removidos!');
  };

  const clearAll = () => {
    setTodos([]);
    setJSON(STORAGE_KEYS.TODOS, []);
    message.success('Todos os TODOs foram removidos!');
  };

  const completedCount = todos.filter(todo => todo.done).length;
  const pendingCount = todos.filter(todo => !todo.done).length;

  return (
    <div data-testid="pp:api-tela|page|container|root" style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <BackButton href="/desafios" testId="pp:api-tela|btn|voltar" />
          <RoadmapChallengesButton level="API+Tela" testId="pp:api-tela|btn|desafios" />
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Title level={1}>API + Tela - App de TODOs</Title>
          <Paragraph style={{ fontSize: '18px', color: '#666' }}>
            Aplicação completa que integra interface com API, com fallback para localStorage.
          </Paragraph>
        </div>

        {/* Status da API */}
        <Card 
          data-testid="pp:api-tela|section|card|status"
          style={{ marginBottom: '24px' }}
        >
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12}>
              <Space>
                <Tag color={apiStatus === 'online' ? 'green' : 'red'} data-testid="pp:api-tela|tag|status">
                  {apiStatus === 'online' ? 'Online' : 'Offline'}
                </Tag>
                <Text strong>Status da API</Text>
              </Space>
            </Col>
            <Col xs={24} sm={12}>
              <Space>
                <Button
                  icon={<SyncOutlined />}
                  onClick={syncWithApi}
                  loading={syncing}
                  data-testid="pp:api-tela|btn|sync"
                  size="small"
                >
                  Sincronizar
                </Button>
                {lastSync && (
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    Última sync: {lastSync}
                  </Text>
                )}
              </Space>
            </Col>
          </Row>
        </Card>

        <Row gutter={[24, 24]}>
          {/* Adicionar TODO */}
          <Col xs={24}>
            <Card 
              data-testid="pp:api-tela|section|card|add"
              title="Adicionar TODO"
            >
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  placeholder="Digite um novo TODO..."
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onPressEnter={addTodo}
                  data-testid="pp:api-tela|input|new-todo"
                  size="large"
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={addTodo}
                  loading={loading}
                  data-testid="pp:api-tela|btn|add"
                  size="large"
                >
                  Adicionar
                </Button>
              </Space.Compact>
            </Card>
          </Col>

          {/* Estatísticas */}
          <Col xs={24}>
            <Card 
              data-testid="pp:api-tela|section|card|stats"
              title="Estatísticas"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                  <div data-testid="pp:api-tela|stat|total" style={{ textAlign: 'center' }}>
                    <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
                      {todos.length}
                    </Title>
                    <Text>Total</Text>
                  </div>
                </Col>
                <Col xs={24} sm={8}>
                  <div data-testid="pp:api-tela|stat|completed" style={{ textAlign: 'center' }}>
                    <Title level={2} style={{ margin: 0, color: '#52c41a' }}>
                      {completedCount}
                    </Title>
                    <Text>Concluídos</Text>
                  </div>
                </Col>
                <Col xs={24} sm={8}>
                  <div data-testid="pp:api-tela|stat|pending" style={{ textAlign: 'center' }}>
                    <Title level={2} style={{ margin: 0, color: '#fa8c16' }}>
                      {pendingCount}
                    </Title>
                    <Text>Pendentes</Text>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Lista de TODOs */}
          <Col xs={24}>
            <Card 
              data-testid="pp:api-tela|section|card|todos"
              title="Lista de TODOs"
              extra={
                <Space>
                  <Button
                    onClick={clearCompleted}
                    data-testid="pp:api-tela|btn|clear-completed"
                    size="small"
                  >
                    Limpar Concluídos
                  </Button>
                  <Button
                    danger
                    onClick={clearAll}
                    data-testid="pp:api-tela|btn|clear-all"
                    size="small"
                  >
                    Limpar Todos
                  </Button>
                </Space>
              }
            >
              {todos.length === 0 ? (
                <Alert
                  message="Nenhum TODO encontrado"
                  description="Adicione seu primeiro TODO usando o formulário acima"
                  type="info"
                  showIcon
                  data-testid="pp:api-tela|alert|empty"
                />
              ) : (
                <List
                  data-testid="pp:api-tela|list|todos"
                  dataSource={todos}
                  renderItem={(todo, index) => (
                    <List.Item
                      key={todo.id}
                      data-testid={`pp:api-tela|item|todo#${todo.id}`}
                      actions={[
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => deleteTodo(todo.id)}
                          loading={loading}
                          data-testid={`pp:api-tela|btn|delete#${todo.id}`}
                        >
                          Excluir
                        </Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Checkbox
                            checked={todo.done}
                            onChange={() => toggleTodo(todo.id)}
                            data-testid={`pp:api-tela|checkbox|done#${todo.id}`}
                          />
                        }
                        title={
                          <Text 
                            style={{ 
                              textDecoration: todo.done ? 'line-through' : 'none',
                              color: todo.done ? '#999' : 'inherit'
                            }}
                          >
                            {todo.text}
                          </Text>
                        }
                        description={
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            Criado em: {new Date(todo.createdAt).toLocaleString()}
                          </Text>
                        }
                      />
                    </List.Item>
                  )}
                />
              )}
            </Card>
          </Col>
        </Row>

        {/* Informações sobre Fallback */}
        <div style={{ marginTop: '40px' }}>
          <Card 
            data-testid="pp:api-tela|section|card|fallback"
            title="Sistema de Fallback"
            size="small"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <div data-testid="pp:api-tela|info|online">
                  <Title level={5}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                    Modo Online
                  </Title>
                  <ul>
                    <li>TODOs são salvos na API</li>
                    <li>Sincronização automática</li>
                    <li>Dados replicados no localStorage</li>
                  </ul>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:api-tela|info|offline">
                  <Title level={5}>
                    <WarningOutlined style={{ color: '#fa8c16', marginRight: '8px' }} />
                    Modo Offline
                  </Title>
                  <ul>
                    <li>TODOs salvos apenas localmente</li>
                    <li>Fallback automático</li>
                    <li>Sincronização quando API voltar</li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Card>
        </div>

        {/* Desafios */}
        <div style={{ marginTop: '60px' }}>
          <Card 
            data-testid="pp:api-tela|desafios|card|root"
            title="Desafios para Praticar"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <div data-testid="pp:api-tela|desafio|add-todo">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Adicionar TODO:</Text> Crie um novo TODO via interface
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:api-tela|desafio|toggle-todo">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Marcar como Concluído:</Text> Use o checkbox para marcar TODOs
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:api-tela|desafio|delete-todo">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Excluir TODO:</Text> Remova TODOs usando o botão excluir
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:api-tela|desafio|sync">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Sincronizar:</Text> Use o botão sincronizar para atualizar dados
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:api-tela|desafio|persistencia">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Persistência:</Text> Recarregue a página e verifique que os dados persistem
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:api-tela|desafio|fallback">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Fallback:</Text> Simule falha da API e teste o modo offline
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
      
      <XPathTester pageId="api-tela" />
    </div>
  );
}
