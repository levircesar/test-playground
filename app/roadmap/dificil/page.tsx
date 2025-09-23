'use client';
import { 
  Typography, 
  Card, 
  Row, 
  Col, 
  Space, 
  Button, 
  Alert, 
  message,
  Divider
} from 'antd';
import { 
  BorderOutlined, 
  MessageOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import XPathTester from '@/components/XPathTester';
import BackButton from '@/components/BackButton';

const { Title, Paragraph, Text } = Typography;

interface PostMessageData {
  type: string;
  data: any;
}

export default function DificilPage() {
  const [formMessages, setFormMessages] = useState<any[]>([]);
  const [tableMessages, setTableMessages] = useState<any[]>([]);
  const [lastMessage, setLastMessage] = useState<string>('');

  useEffect(() => {
    const handleMessage = (event: MessageEvent<PostMessageData>) => {
      const { type, data } = event.data;
      
      setLastMessage(`${type}: ${JSON.stringify(data)}`);
      
      switch (type) {
        case 'FORM_SUBMITTED':
          setFormMessages(prev => [...prev, { ...data, timestamp: new Date().toISOString() }]);
          message.success('Formulário do iframe foi enviado!');
          break;
        case 'PRODUCT_ADDED':
          setTableMessages(prev => [...prev, { action: 'ADDED', ...data, timestamp: new Date().toISOString() }]);
          message.info('Produto adicionado na tabela do iframe!');
          break;
        case 'PRODUCT_EDIT':
          setTableMessages(prev => [...prev, { action: 'EDITED', ...data, timestamp: new Date().toISOString() }]);
          message.info('Produto editado na tabela do iframe!');
          break;
        case 'PRODUCT_DELETED':
          setTableMessages(prev => [...prev, { action: 'DELETED', ...data, timestamp: new Date().toISOString() }]);
          message.warning('Produto removido da tabela do iframe!');
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const sendMessageToIframe = (iframeId: string, message: any) => {
    const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(message, '*');
    }
  };

  return (
    <div data-testid="pp:dificil|page|container|root" style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <BackButton href="/desafios" testId="pp:dificil|btn|voltar" />
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Title level={1}>Roadmap Difícil</Title>
          <Paragraph style={{ fontSize: '18px', color: '#666' }}>
            Domine interações com iframes, comunicação entre elementos e cenários complexos.
          </Paragraph>
        </div>

        {/* Controles de Comunicação */}
        <Card 
          data-testid="pp:dificil|section|card|controles"
          title="Controles de Comunicação"
          style={{ marginBottom: '24px' }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text strong>Enviar mensagem para Formulário:</Text>
                <Button
                  type="primary"
                  icon={<MessageOutlined />}
                  onClick={() => sendMessageToIframe('iframe-form', { type: 'FOCUS_FORM' })}
                  data-testid="pp:dificil|btn|focus-form"
                >
                  Focar no Formulário
                </Button>
                <Button
                  onClick={() => sendMessageToIframe('iframe-form', { type: 'CLEAR_FORM' })}
                  data-testid="pp:dificil|btn|clear-form"
                >
                  Limpar Formulário
                </Button>
              </Space>
            </Col>
            
            <Col xs={24} sm={12}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text strong>Enviar mensagem para Tabela:</Text>
                <Button
                  type="primary"
                  icon={<MessageOutlined />}
                  onClick={() => sendMessageToIframe('iframe-table', { type: 'REFRESH_TABLE' })}
                  data-testid="pp:dificil|btn|refresh-table"
                >
                  Atualizar Tabela
                </Button>
                <Button
                  onClick={() => sendMessageToIframe('iframe-table', { type: 'HIGHLIGHT_ROWS' })}
                  data-testid="pp:dificil|btn|highlight-table"
                >
                  Destacar Linhas
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Status das Mensagens */}
        <Card 
          data-testid="pp:dificil|section|card|status"
          title="Status das Comunicações"
          style={{ marginBottom: '24px' }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Alert
              message="Última mensagem recebida"
              description={lastMessage || 'Nenhuma mensagem recebida ainda'}
              type="info"
              showIcon
              data-testid="pp:dificil|alert|ultima-mensagem"
            />
            
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <div data-testid="pp:dificil|stats|form">
                  <Text strong>Mensagens do Formulário: </Text>
                  <Text style={{ color: '#1890ff' }}>{formMessages.length}</Text>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:dificil|stats|table">
                  <Text strong>Mensagens da Tabela: </Text>
                  <Text style={{ color: '#1890ff' }}>{tableMessages.length}</Text>
                </div>
              </Col>
            </Row>
          </Space>
        </Card>

        <Row gutter={[24, 24]}>
          {/* Iframe do Formulário */}
          <Col xs={24} lg={12}>
            <Card 
              data-testid="pp:dificil|section|card|iframe-form"
              title="Iframe - Formulário"
              style={{ height: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <Alert
                  message="Formulário Interativo"
                  description="Preencha o formulário dentro do iframe e observe as mensagens no pai"
                  type="info"
                  showIcon
                  data-testid="pp:dificil|alert|form-info"
                />
                
                <iframe
                  id="iframe-form"
                  src="/embeds/form"
                  width="100%"
                  height="500"
                  data-testid="pp:dificil|iframe|form"
                  style={{ border: '1px solid #d9d9d9', borderRadius: '6px' }}
                  title="Formulário no Iframe"
                />
              </Space>
            </Card>
          </Col>

          {/* Iframe da Tabela */}
          <Col xs={24} lg={12}>
            <Card 
              data-testid="pp:dificil|section|card|iframe-table"
              title="Iframe - Tabela"
              style={{ height: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <Alert
                  message="Tabela Interativa"
                  description="Interaja com a tabela dentro do iframe e observe as mensagens no pai"
                  type="info"
                  showIcon
                  data-testid="pp:dificil|alert|table-info"
                />
                
                <iframe
                  id="iframe-table"
                  src="/embeds/table"
                  width="100%"
                  height="500"
                  data-testid="pp:dificil|iframe|table"
                  style={{ border: '1px solid #d9d9d9', borderRadius: '6px' }}
                  title="Tabela no Iframe"
                />
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Iframe Aninhado */}
        <div style={{ marginTop: '40px' }}>
          <Card 
            data-testid="pp:dificil|section|card|iframe-aninhado"
            title="Iframe Aninhado (Iframe dentro de Iframe)"
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Alert
                message="Iframe Aninhado"
                description="Este é um iframe que contém outro iframe - teste a navegação entre eles"
                type="warning"
                showIcon
                data-testid="pp:dificil|alert|nested-info"
              />
              
              <iframe
                src="/embeds/form"
                width="100%"
                height="400"
                data-testid="pp:dificil|iframe|nested"
                style={{ border: '2px solid #fa8c16', borderRadius: '6px' }}
                title="Iframe Aninhado"
              />
            </Space>
          </Card>
        </div>

        {/* Histórico de Mensagens */}
        <div style={{ marginTop: '40px' }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card 
                data-testid="pp:dificil|section|card|historico-form"
                title="Histórico - Formulário"
                size="small"
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  {formMessages.length === 0 ? (
                    <Text type="secondary">Nenhuma mensagem do formulário ainda</Text>
                  ) : (
                    formMessages.slice(-5).map((msg, index) => (
                      <div key={index} data-testid={`pp:dificil|msg|form#${index}`}>
                        <Text strong>{msg.nome}</Text> - {msg.email}
                        <br />
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </Text>
                      </div>
                    ))
                  )}
                </Space>
              </Card>
            </Col>
            
            <Col xs={24} lg={12}>
              <Card 
                data-testid="pp:dificil|section|card|historico-table"
                title="Histórico - Tabela"
                size="small"
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  {tableMessages.length === 0 ? (
                    <Text type="secondary">Nenhuma mensagem da tabela ainda</Text>
                  ) : (
                    tableMessages.slice(-5).map((msg, index) => (
                      <div key={index} data-testid={`pp:dificil|msg|table#${index}`}>
                        <Text strong>{msg.action}</Text> - {msg.name} (R$ {msg.price})
                        <br />
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </Text>
                      </div>
                    ))
                  )}
                </Space>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Desafios */}
        <div style={{ marginTop: '60px' }}>
          <Card 
            data-testid="pp:dificil|desafios|card|root"
            title="Desafios para Praticar"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <div data-testid="pp:dificil|desafio|form-iframe">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Formulário no Iframe:</Text> Preencha e envie o formulário dentro do iframe
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:dificil|desafio|table-iframe">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Tabela no Iframe:</Text> Adicione, edite ou remova produtos na tabela
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:dificil|desafio|comunicacao">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Comunicação:</Text> Use os botões para enviar mensagens aos iframes
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:dificil|desafio|postmessage">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>PostMessage:</Text> Observe as mensagens sendo trocadas entre pai e iframe
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:dificil|desafio|iframe-aninhado">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Iframe Aninhado:</Text> Interaja com o iframe dentro de outro iframe
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:dificil|desafio|historico">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Histórico:</Text> Monitore o histórico de mensagens recebidas
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
      
      <XPathTester pageId="dificil" />
    </div>
  );
}
