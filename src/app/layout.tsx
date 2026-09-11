import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import GlobalBackground from '@/components/ui/GlobalBackground'
import CookieBanner from '@/components/ui/CookieBanner'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

export const metadata: Metadata = {
  metadataBase: new URL('https://canadanocguide.com'),
  title: 'Canada NOC Guide: Find Your NOC Code, TEER & Wages (2026)',
  description:
    'Find your NOC code, check Express Entry eligibility, compare wages by province, and explore all 516 NOC unit groups. IRCC & ESDC 2025/2026 verified data.',
  alternates: {
    canonical: 'https://canadanocguide.com',
    languages: {
      'en-CA': 'https://canadanocguide.com',
      'x-default': 'https://canadanocguide.com',
    },
  },
  openGraph: {
    title: 'Canada NOC Guide — Find Your NOC Code, TEER & Wages',
    description: 'Complete guide to all 516 NOC codes, Express Entry draws, Job Bank wages, and provincial immigration pathways.',
    url: 'https://canadanocguide.com',
    siteName: 'CanadaNOCGuide',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/pr-card-3d.jpg',
        width: 1200,
        height: 630,
        alt: 'Canada NOC Guide - Find Your NOC Code, TEER & Wages',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canada NOC Guide — Complete NOC & Express Entry Portal',
    description: 'Find your NOC code, TEER category, Job Bank wages, and CRS draw cutoffs.',
    images: ['/pr-card-3d.jpg'],
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://canadanocguide.com/#website',
      url: 'https://canadanocguide.com',
      name: 'Canada NOC Guide',
      description: 'Complete directory of all 516 Canadian NOC 2021 codes, TEER categories, wages, and Express Entry draws.',
      inLanguage: 'en-CA',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://canadanocguide.com/noc?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://canadanocguide.com/#organization',
      name: 'Canada NOC Guide',
      url: 'https://canadanocguide.com',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://canadanocguide.com/#logo',
        url: 'https://canadanocguide.com/pr-card-3d.jpg',
        width: 1200,
        height: 630,
        caption: 'Canada NOC Guide',
      },
      sameAs: [
        'https://x.com/saddamh58509953',
        'https://canadanocguide.com/about',
      ],
    },
    {
      '@type': 'Person',
      '@id': 'https://canadanocguide.com/#author',
      name: 'Sahajul Haque',
      url: 'https://x.com/saddamh58509953',
      sameAs: [
        'https://x.com/saddamh58509953',
        'https://canadanocguide.com/about',
      ],
      jobTitle: 'Founder & Data Architect',
      worksFor: {
        '@id': 'https://canadanocguide.com/#organization',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body suppressHydrationWarning className="antialiased bg-[#030712] text-white overflow-x-hidden relative">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2.5 focus:bg-cyan-500 focus:text-black focus:rounded-xl focus:font-mono focus:text-xs focus:font-bold focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-cyan-300"
        >
          Skip to main content
        </a>
        <GlobalBackground />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <div id="main-content" className="relative z-10 min-h-screen flex flex-col">
          {children}
        </div>
        <CookieBanner />
      </body>
    </html>
  )
}
