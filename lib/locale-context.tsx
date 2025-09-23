'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Locale = 'pt-BR' | 'en-US' | 'fr-FR';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('pt-BR');

  // Carregar idioma salvo do localStorage na inicialização
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && (savedLocale === 'pt-BR' || savedLocale === 'en-US' || savedLocale === 'fr-FR')) {
      setLocale(savedLocale);
    }
  }, []);

  // Salvar idioma no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
