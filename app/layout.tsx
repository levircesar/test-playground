'use client';
import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LayoutWrapper from '@/components/LayoutWrapper';
import { LocaleProvider } from '@/lib/locale-context';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#667eea" />
        
        {/* SEO Básico */}
        <title>Test Playground - Aprenda Automação de Testes de Forma Prática</title>
        <meta name="description" content="Plataforma interativa para aprender automação de testes web com Playwright através de desafios práticos e exemplos reais. 100% gratuito para a comunidade QA." />
        <meta name="keywords" content="playwright, automação de testes, testes web, QA, cypress, selenium, testes e2e, testes de API, qualidade de software" />
        <meta name="author" content="Levir Lemos" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://playwright-playground.vercel.app/" />
        <meta property="og:title" content="Test Playground - Aprenda Automação de Testes" />
        <meta property="og:description" content="Plataforma interativa para aprender automação de testes web com Playwright através de desafios práticos e exemplos reais." />
        <meta property="og:image" content="https://playwright-playground.vercel.app/og-image.png" />
        <meta property="og:site_name" content="Test Playground" />
        <meta property="og:locale" content="pt_BR" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://playwright-playground.vercel.app/" />
        <meta property="twitter:title" content="Test Playground - Aprenda Automação de Testes" />
        <meta property="twitter:description" content="Plataforma interativa para aprender automação de testes web com Playwright através de desafios práticos e exemplos reais." />
        <meta property="twitter:image" content="https://playwright-playground.vercel.app/og-image.png" />
        <meta property="twitter:creator" content="@levircesar" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://playwright-playground.vercel.app/" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Test Playground",
              "description": "Plataforma interativa para aprender automação de testes web com Playwright através de desafios práticos e exemplos reais.",
              "url": "https://playwright-playground.vercel.app/",
              "logo": "https://playwright-playground.vercel.app/logo.png",
              "founder": {
                "@type": "Person",
                "name": "Levir Lemos",
                "jobTitle": "Quality Assurance Analyst & Test Automation Specialist",
                "url": "https://www.linkedin.com/in/levirlemos/"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "BRL",
                "description": "Plataforma 100% gratuita para aprendizado de automação de testes"
              },
              "educationalLevel": ["Beginner", "Intermediate", "Advanced"],
              "teaches": ["Playwright", "Cypress", "Test Automation", "Web Testing", "API Testing", "E2E Testing"],
              "audience": {
                "@type": "Audience",
                "audienceType": "QA Engineers, Test Automation Engineers, Software Developers"
              }
            })
          }}
        />
      </Head>
      <body>
        <AntdRegistry>
          <LocaleProvider>
            <LayoutWrapper>
              <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header />
                <main style={{ flex: 1 }}>
                  {children}
                </main>
                <Footer />
              </div>
            </LayoutWrapper>
          </LocaleProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
