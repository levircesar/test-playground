'use client';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light'|'dark'>('light');

  const handleThemeChange = (newMode: 'light' | 'dark') => {
    setMode(newMode);
  };

  return (
    <html lang="pt-BR">
      <body>
        <ConfigProvider
          theme={{
            algorithm: mode === 'dark'
              ? antdTheme.darkAlgorithm
              : antdTheme.defaultAlgorithm,
          }}
        >
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header onThemeChange={handleThemeChange} />
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
          </div>
        </ConfigProvider>
      </body>
    </html>
  );
}
