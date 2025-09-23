'use client';
import { Form, Input, Button, Select, message, Card, Typography } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title } = Typography;

export default function EmbedFormPage() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // Simular envio do formulário
    setTimeout(() => {
      message.success('Formulário enviado com sucesso!');
      
      // Enviar mensagem para o pai (iframe)
      if (window.parent !== window) {
        window.parent.postMessage({
          type: 'FORM_SUBMITTED',
          data: values
        }, '*');
      }
      
      form.resetFields();
    }, 1000);
  };

  return (
    <div 
      data-testid="pp:embed-form|page|container|root"
      style={{ 
        padding: '20px',
        background: '#fafafa',
        minHeight: '100vh'
      }}
    >
      <Card 
        data-testid="pp:embed-form|card|root"
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <Title level={3} style={{ textAlign: 'center', marginBottom: '24px' }}>
          Formulário no Iframe
        </Title>
        
        <Form
          form={form}
          name="embedForm"
          onFinish={onFinish}
          layout="vertical"
          data-testid="pp:embed-form|form|root"
        >
          <Form.Item
            name="nome"
            label="Nome Completo"
            rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Seu nome completo"
              data-testid="pp:embed-form|input|nome"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { required: true, message: 'Por favor, insira seu e-mail!' },
              { type: 'email', message: 'E-mail inválido!' }
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="seu@email.com"
              data-testid="pp:embed-form|input|email"
            />
          </Form.Item>

          <Form.Item
            name="telefone"
            label="Telefone"
            rules={[{ required: true, message: 'Por favor, insira seu telefone!' }]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="(11) 99999-9999"
              data-testid="pp:embed-form|input|telefone"
            />
          </Form.Item>

          <Form.Item
            name="cidade"
            label="Cidade"
            rules={[{ required: true, message: 'Por favor, selecione sua cidade!' }]}
          >
            <Select
              placeholder="Selecione sua cidade"
              data-testid="pp:embed-form|select|cidade"
              options={[
                { value: 'sp', label: 'São Paulo' },
                { value: 'rj', label: 'Rio de Janeiro' },
                { value: 'mg', label: 'Belo Horizonte' },
                { value: 'rs', label: 'Porto Alegre' },
                { value: 'pr', label: 'Curitiba' },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              data-testid="pp:embed-form|btn|enviar"
              style={{ width: '100%' }}
            >
              Enviar Formulário
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
