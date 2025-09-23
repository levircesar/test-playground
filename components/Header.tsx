'use client';
import { Layout, Typography, Space, Button } from 'antd';
import Link from 'next/link';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export default function Header() {
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
          Playground
        </Title>
      </Link>

      {/* Botões de navegação no canto direito */}
      <Space>
        <Link href="/comecar">
          <Button type="default" data-testid="pp:layout|header|btn|comecar">
            Começar
          </Button>
        </Link>
        <Link href="/desafios">
          <Button type="default" data-testid="pp:layout|header|btn|desafios">
            Desafios
          </Button>
        </Link>
        <Link href="/doar">
          <Button type="primary" data-testid="pp:layout|header|btn|apoiar">
            Apoiar
          </Button>
        </Link>
      </Space>
    </AntHeader>
  );
}
