import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { HomeOutlined } from '@ant-design/icons';

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const breadcrumbItems = [
    {
      title: (
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <HomeOutlined />
          Início
        </Link>
      ),
    },
    ...items.map((item, index) => ({
      title: item.href ? (
        <Link href={item.href}>{item.title}</Link>
      ) : (
        item.title
      ),
    })),
  ];

  return (
    <Breadcrumb
      items={breadcrumbItems}
      style={{ marginBottom: '16px' }}
    />
  );
}
