'use client';
import { Form, Input, Button, message, Space } from 'antd';
import { UserOutlined, MailOutlined, MessageOutlined } from '@ant-design/icons';
import { setJSON, getJSON, STORAGE_KEYS } from '@/lib/storage';

interface ContactFormData {
  nome: string;
  email: string;
  mensagem: string;
}

export default function ContactForm() {
  const [form] = Form.useForm();

  const onFinish = (values: ContactFormData) => {
    try {
      const existingMessages = getJSON(STORAGE_KEYS.CONTACT_MSGS, []);
      const newMessage = {
        ...values,
        timestamp: new Date().toISOString(),
        id: Date.now()
      };
      
      const updatedMessages = [...existingMessages, newMessage];
      setJSON(STORAGE_KEYS.CONTACT_MSGS, updatedMessages);
      
      message.success('Mensagem enviada com sucesso!');
      form.resetFields();
    } catch (error) {
      message.error('Erro ao enviar mensagem. Tente novamente.');
    }
  };

  return (
    <div data-testid="pp:landing|contact|form|root">
      <Form
        form={form}
        name="contact"
        onFinish={onFinish}
        layout="vertical"
        size="large"
      >
        <Form.Item
          name="nome"
          label="Nome"
          rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
        >
          <Input
            data-testid="pp:landing|contact|input|nome"
            prefix={<UserOutlined />}
            placeholder="Seu nome completo"
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
            data-testid="pp:landing|contact|input|email"
            prefix={<MailOutlined />}
            placeholder="seu@email.com"
          />
        </Form.Item>

        <Form.Item
          name="mensagem"
          label="Mensagem"
          rules={[{ required: true, message: 'Por favor, insira sua mensagem!' }]}
        >
          <Input.TextArea
            data-testid="pp:landing|contact|input|mensagem"
            prefix={<MessageOutlined />}
            placeholder="Sua mensagem aqui..."
            rows={4}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            data-testid="pp:landing|contact|btn|enviar"
            style={{ width: '100%' }}
          >
            Enviar Mensagem
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
