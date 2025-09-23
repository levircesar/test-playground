'use client';
import { Card, Button, Space, Typography, message, QRCode } from 'antd';
import { HeartOutlined, CopyOutlined } from '@ant-design/icons';
import { useLocale } from '@/lib/locale-context';
import { getTranslations } from '@/lib/translations';

const { Title, Text } = Typography;

export default function DoarPage() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const pixKey = '00020126580014BR.GOV.BCB.PIX0136e355a274-c19a-4569-ac2c-e44094a073705204000053039865802BR5925Levir Cesar Ribeiro Lemos6009SAO PAULO62140510IVJQYa4kvf63044324';

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      message.success(t.donation.pixKeyCopied);
    } catch (err) {
      message.error(t.common.error);
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
              {t.donation.title}
            </Title>
          </div>
          
          <Text>
            {t.donation.description}
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
              {t.donation.copyPixKey}
            </Button>
            
            <div data-testid="pp:doar|donation|qrcode|container">
              <QRCode 
                value={pixKey}
                size={200}
                style={{ marginBottom: '16px' }}
              />
              <Text type="secondary" style={{ display: 'block', marginTop: '8px' }}>
                {t.donation.qrCodeTitle}
              </Text>
            </div>
          </Space>
          
          <Text type="secondary" style={{ fontSize: '12px' }}>
            * {t.donation.optionalSupport}
          </Text>
        </Space>
      </Card>
    </div>
  );
}
