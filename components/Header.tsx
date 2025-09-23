'use client';
import { Layout, Typography, Space, Button, Select } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useLocale } from '@/lib/locale-context';
import { getTranslations } from '@/lib/translations';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export default function Header() {
  const { locale, setLocale } = useLocale();
  const t = getTranslations(locale);

  const handleLocaleChange = (value: string) => {
    setLocale(value as 'pt-BR' | 'en-US' | 'fr-FR');
  };

  return (
    <AntHeader 
      data-testid="pp:layout|header|header|root"
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '0 24px',
        background: '#fff',
        borderBottom: '1px solid #f0f0f0'
      }}
    >
      {/* Título no canto esquerdo */}
      <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Title level={3} style={{ margin: 0, color: '#2E8B57' }}>
          {t.header.title}
        </Title>
      </Link>

      {/* Botões de navegação e seletor de idioma no canto direito */}
      <Space>
        <Link href="/comecar">
          <Button type="default" data-testid="pp:layout|header|btn|comecar">
            {t.header.start}
          </Button>
        </Link>
        <Link href="/desafios">
          <Button type="default" data-testid="pp:layout|header|btn|desafios">
            {t.header.challenges}
          </Button>
        </Link>
        <Link href="/doar">
          <Button type="primary" data-testid="pp:layout|header|btn|apoiar">
            {t.header.support}
          </Button>
        </Link>
        
        {/* Seletor de idioma */}
        <Select
          value={locale}
          onChange={handleLocaleChange}
          style={{ width: 140 }}
          suffixIcon={<GlobalOutlined />}
          options={[
            { value: 'pt-BR', label: '🇧🇷 Brasil' },
            { value: 'en-US', label: '🇺🇸 USA' },
            { value: 'fr-FR', label: '🇫🇷 France' }
          ]}
        />
      </Space>
    </AntHeader>
  );
}
