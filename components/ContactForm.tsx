'use client';
import { Form, Input, Button, message, Space } from 'antd';
import { UserOutlined, MailOutlined, MessageOutlined } from '@ant-design/icons';
import { setJSON, getJSON, STORAGE_KEYS } from '@/lib/storage';
import { useLocale } from '@/lib/locale-context';
import { getTranslations } from '@/lib/translations';

interface ContactFormData {
  nome: string;
  email: string;
  mensagem: string;
}

export default function ContactForm() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
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
      
      message.success(t.components.contactForm.success);
      form.resetFields();
    } catch (error) {
      message.error(t.components.contactForm.error);
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
          label={t.components.contactForm.name}
          rules={[{ required: true, message: locale === 'pt-BR' ? 'Por favor, insira seu nome!' : 
                                   locale === 'en-US' ? 'Please enter your name!' : 
                                   'Veuillez entrer votre nom!' }]}
        >
          <Input
            data-testid="pp:landing|contact|input|nome"
            prefix={<UserOutlined />}
            placeholder={locale === 'pt-BR' ? 'Seu nome completo' : 
                        locale === 'en-US' ? 'Your full name' : 
                        'Votre nom complet'}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={t.components.contactForm.email}
          rules={[
            { required: true, message: locale === 'pt-BR' ? 'Por favor, insira seu e-mail!' : 
                             locale === 'en-US' ? 'Please enter your email!' : 
                             'Veuillez entrer votre email!' },
            { type: 'email', message: locale === 'pt-BR' ? 'E-mail inválido!' : 
                             locale === 'en-US' ? 'Invalid email!' : 
                             'Email invalide!' }
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
          label={t.components.contactForm.message}
          rules={[{ required: true, message: locale === 'pt-BR' ? 'Por favor, insira sua mensagem!' : 
                                   locale === 'en-US' ? 'Please enter your message!' : 
                                   'Veuillez entrer votre message!' }]}
        >
          <Input.TextArea
            data-testid="pp:landing|contact|input|mensagem"
            placeholder={locale === 'pt-BR' ? 'Sua mensagem aqui...' : 
                        locale === 'en-US' ? 'Your message here...' : 
                        'Votre message ici...'}
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
            {t.components.contactForm.send}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
