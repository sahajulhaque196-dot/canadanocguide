import React from 'react'
import type { Metadata } from 'next'
import HeaderNav from '@/components/home/HeaderNav'
import TerminalHero from '@/components/TerminalHero'
import CategoryFastPass from '@/components/home/CategoryFastPass'
import TeerMatrix from '@/components/home/TeerMatrix'
import BroadSectors from '@/components/home/BroadSectors'
import WageIntelligence from '@/components/home/WageIntelligence'
import NocGuideSection from '@/components/home/NocGuideSection'
import AuthorSection from '@/components/home/AuthorSection'
import FaqSection from '@/components/home/FaqSection'
import Footer from '@/components/home/Footer'

export const metadata: Metadata = {
  title: 'Canada NOC Code Finder (2026): 516 NOC Codes & TEER',
  description:
    'Free Canada NOC code finder indexing all 516 NOC codes (2021 list). Check your TEER categories, track Express Entry draws (2026), and compare Job Bank wages.',
  alternates: {
    canonical: 'https://canadanocguide.com',
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-100 selection:bg-cyan-500 selection:text-black">
      
      {/* Top Clean Glass Navigation */}
      <HeaderNav />

      {/* Hero Section (Untouched) */}
      <TerminalHero />

      {/* Section 2: Express Entry Priority Categories */}
      <section id="categories">
        <CategoryFastPass />
      </section>

      {/* Section 3: TEER Eligibility Matrix */}
      <section id="teer">
        <TeerMatrix />
      </section>

      {/* Section 4: 10 Broad Occupational Sectors */}
      <section id="sectors">
        <BroadSectors />
      </section>

      {/* Section 5: Provincial Wages & LMIA Benchmarks */}
      <section id="wages">
        <WageIntelligence />
      </section>

      {/* Section 6: How to Choose & Match Your NOC */}
      <section id="guide">
        <NocGuideSection />
      </section>

      {/* Section 7: Author & Transparency / E-E-A-T Section */}
      <section id="author">
        <AuthorSection />
      </section>

      {/* Section 8: Frequently Asked Questions */}
      <section id="faq">
        <FaqSection />
      </section>

      {/* Section 9: Modern Clean Footer */}
      <Footer />

    </main>
  )
}
