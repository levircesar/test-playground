'use client';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  href?: string;
  testId?: string;
}

export default function BackButton({ href = '/home', testId }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <Button
      icon={<ArrowLeftOutlined />}
      onClick={handleClick}
      data-testid={testId || 'pp:back|btn|voltar'}
      style={{ marginBottom: '24px' }}
    >
      Voltar
    </Button>
  );
}
