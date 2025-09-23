'use client';
import { Card, Button, Space, Typography, message, QRCode } from 'antd';
import { HeartOutlined, CopyOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function DoarPage() {
  const pixKey = '00020126580014BR.GOV.BCB.PIX0136e355a274-c19a-4569-ac2c-e44094a073705204000053039865802BR5925Levir Cesar Ribeiro Lemos6009SAO PAULO62140510IVJQYa4kvf63044324';

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      message.success('Chave PIX copiada para a área de transferência!');
    } catch (err) {
      message.error('Erro ao copiar a chave PIX');
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Card
        data-testid="pp:doar|donation|card|root"
        style={{ textAlign: 'center', maxWidth: 400, margin: '0 auto' }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <HeartOutlined style={{ fontSize: '48px', color: '#ff4d4f' }} />
            <Title level={3} style={{ marginTop: '16px' }}>
              Apoie o Projeto
            </Title>
          </div>
          
          <Text>
            Olá! Eu sou o Levir, criador deste playground. Se este projeto te ajuda a aprender automação de testes, 
            ficaria muito feliz com seu apoio 💙
          </Text>
          
          <Space direction="vertical" size="middle">
            <Button
              type="primary"
              size="large"
              data-testid="pp:doar|donation|btn|apoiar"
              style={{ width: '200px' }}
              onClick={copyPixKey}
              icon={<CopyOutlined />}
            >
              Copiar Chave PIX
            </Button>
            
            <div data-testid="pp:doar|donation|qrcode|container">
              <QRCode 
                value={pixKey}
                size={200}
                style={{ marginBottom: '16px' }}
              />
              <Text type="secondary" style={{ display: 'block', marginTop: '8px' }}>
                QR Code PIX
              </Text>
            </div>
          </Space>
          
          <Text type="secondary" style={{ fontSize: '12px' }}>
            * Apoios são opcionais e ajudam a manter o projeto gratuito
          </Text>
        </Space>
      </Card>
    </div>
  );
}
