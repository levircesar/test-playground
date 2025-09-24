import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Test Playground',
  description: 'Painel administrativo do Test Playground',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {children}
    </div>
  );
}
