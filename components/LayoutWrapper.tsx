'use client';
import { useLocale } from '@/lib/locale-context';
import { useEffect } from 'react';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { locale } = useLocale();

  useEffect(() => {
    // Atualizar o atributo lang do HTML quando o idioma mudar
    document.documentElement.lang = locale;
  }, [locale]);

  return <>{children}</>;
}
