import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      { source: '/express-entry/stem-occupations', destination: '/express-entry/stem', permanent: true },
      { source: '/express-entry/healthcare-occupations', destination: '/express-entry/healthcare', permanent: true },
      { source: '/express-entry/trade-occupations', destination: '/express-entry/trades', permanent: true },
      { source: '/express-entry/skilled-trades', destination: '/express-entry/trades', permanent: true },
      { source: '/express-entry/transport-occupations', destination: '/express-entry/transport', permanent: true },
      { source: '/express-entry/agriculture-occupations', destination: '/express-entry/agriculture', permanent: true },
      { source: '/express-entry/agriculture-agri-food', destination: '/express-entry/agriculture', permanent: true },
      { source: '/express-entry/french-language-occupations', destination: '/express-entry/french', permanent: true },
      { source: '/express-entry/french-proficiency', destination: '/express-entry/french', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://pagead2.googlesyndication.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https:",
              "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://pagead2.googlesyndication.com",
              "connect-src 'self' https:",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
