'use client';
import { Layout, Typography, Space, Button, Select, Drawer, Menu } from 'antd';
import { GlobalOutlined, MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useState } from 'react';
import { useLocale } from '@/lib/locale-context';
import { getTranslations } from '@/lib/translations';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export default function Header() {
  const { locale, setLocale } = useLocale();
  const t = getTranslations(locale);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLocaleChange = (value: string) => {
    setLocale(value as 'pt-BR' | 'en-US' | 'fr-FR');
  };

  const menuItems = [
    {
      key: 'comecar',
      label: (
        <Link href="/comecar" onClick={() => setMobileMenuOpen(false)}>
          {t.header.start}
        </Link>
      ),
    },
    {
      key: 'desafios',
      label: (
        <Link href="/desafios" onClick={() => setMobileMenuOpen(false)}>
          {t.header.challenges}
        </Link>
      ),
    },
    {
      key: 'doar',
      label: (
        <Link href="/doar" onClick={() => setMobileMenuOpen(false)}>
          {t.header.support}
        </Link>
      ),
    },
  ];

  return (
    <>
      <AntHeader 
        data-testid="pp:layout|header|header|root"
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '0 24px',
          background: '#fff',
          borderBottom: '1px solid #f0f0f0',
          position: 'relative',
          zIndex: 1000
        }}
      >
        {/* Título no canto esquerdo */}
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Title level={3} style={{ margin: 0, color: '#2E8B57' }}>
            {t.header.title}
          </Title>
        </Link>

        {/* Desktop Navigation */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center' }}>
          <Space className="nav-buttons">
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
          </Space>
          
          {/* Seletor de idioma */}
          <Select
            value={locale}
            onChange={handleLocaleChange}
            style={{ width: 140, marginLeft: 16 }}
            suffixIcon={<GlobalOutlined />}
            options={[
              { value: 'pt-BR', label: '🇧🇷 Brasil' },
              { value: 'en-US', label: '🇺🇸 USA' },
              { value: 'fr-FR', label: '🇫🇷 France' }
            ]}
          />
        </div>

        {/* Mobile Menu Button */}
        <Button
          type="primary"
          icon={<MenuOutlined />}
          onClick={() => setMobileMenuOpen(true)}
          className="mobile-menu-btn"
          size="large"
        >
          Menu
        </Button>
      </AntHeader>

      {/* Mobile Drawer */}
      <Drawer
        title={t.header.title}
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
        styles={{
          body: { padding: 0 }
        }}
      >
        <Menu
          mode="vertical"
          items={menuItems}
          style={{ border: 'none', padding: '16px 0' }}
        />
        
        <div style={{ padding: '16px', borderTop: '1px solid #f0f0f0', marginTop: '16px' }}>
          <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>Idioma:</div>
          <Select
            value={locale}
            onChange={handleLocaleChange}
            style={{ width: '100%' }}
            suffixIcon={<GlobalOutlined />}
            options={[
              { value: 'pt-BR', label: '🇧🇷 Brasil' },
              { value: 'en-US', label: '🇺🇸 USA' },
              { value: 'fr-FR', label: '🇫🇷 France' }
            ]}
          />
        </div>
      </Drawer>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          
          .mobile-menu-btn {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            visibility: visible !important;
            opacity: 1 !important;
          }
          
          .ant-layout-header {
            padding: 0 16px !important;
          }
          
          .ant-typography h3 {
            font-size: 18px !important;
          }
        }
        
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
          }
          
          .mobile-menu-btn {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
          }
        }
      `}</style>
    </>
  );
}
