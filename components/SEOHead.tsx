import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: any;
  noIndex?: boolean;
}

export default function SEOHead({
  title = 'Playwright Playground - Aprenda Automação de Testes',
  description = 'Plataforma interativa para aprender automação de testes web com Playwright através de desafios práticos e exemplos reais.',
  keywords = 'playwright, automação de testes, testes web, QA, cypress, selenium, testes e2e, testes de API, qualidade de software',
  canonicalUrl,
  ogImage = 'https://playwright-playground.vercel.app/og-image.png',
  ogType = 'website',
  structuredData,
  noIndex = false
}: SEOHeadProps) {
  const fullTitle = title.includes('Playwright Playground') ? title : `${title} | Playwright Playground`;
  const fullCanonicalUrl = canonicalUrl ? `https://playwright-playground.vercel.app${canonicalUrl}` : 'https://playwright-playground.vercel.app/';

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Playwright Playground" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:creator" content="@levircesar" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
    </Head>
  );
}
