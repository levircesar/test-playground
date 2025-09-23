/** @type {import('next').NextConfig} */
const nextConfig = {
  // appDir is now stable in Next.js 14, no need for experimental flag
  
  // SEO Optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Headers for better SEO and security
  async headers() {
    return [
      // Headers for embed routes - allow iframe embedding
      {
        source: '/embeds/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Evite usar DENY. SAMEORIGIN permite iframes do mesmo domínio.
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Em CSP, use frame-ancestors para whitelistar quem pode embeber.
          {
            key: 'Content-Security-Policy',
            value:
              "frame-ancestors 'self' https://test-playground-theta.vercel.app https://*.vercel.app http://localhost:3000; default-src 'self';"
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      // Headers for all other routes - maintain security
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
    ];
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
