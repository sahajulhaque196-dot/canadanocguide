import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import HeaderNav from '@/components/home/HeaderNav'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import AccordionFaq from '@/components/ui/AccordionFaq'
import Footer from '@/components/home/Footer'
import { getAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'About Us & Editorial Methodology | CanadaNOCGuide',
  description: 'Learn about CanadaNOCGuide, our creator Sahajul Haque, our mission to simplify Canadian immigration data, and our government data verification methodology.',
  alternates: getAlternates('/about'),
  openGraph: {
    title: 'About CanadaNOCGuide & Editorial Methodology | Sahajul Haque',
    description: 'Learn about our mission to make Canadian NOC data free and accessible. Verified with IRCC and ESDC open data.',
    url: 'https://canadanocguide.com/about',
    siteName: 'CanadaNOCGuide',
    locale: 'en_CA',
    type: 'profile',
    images: [
      {
        url: '/sahajul-haque.jpg',
        width: 800,
        height: 800,
        alt: 'Sahajul Haque - Creator of CanadaNOCGuide',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'About CanadaNOCGuide | Sahajul Haque',
    description: 'Independent Canadian immigration data directory and open-source project by Sahajul Haque.',
    images: ['/sahajul-haque.jpg'],
  },
}

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About CanadaNOCGuide',
    url: 'https://canadanocguide.com/about',
    description: 'Independent educational directory indexing official Canadian National Occupational Classification (NOC 2021) data, wages, and Express Entry draws.',
    publisher: {
      '@type': 'Organization',
      name: 'CanadaNOCGuide',
      url: 'https://canadanocguide.com',
      founder: {
        '@type': 'Person',
        name: 'Sahajul Haque',
        jobTitle: 'Founder & Data Architect',
      },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://canadanocguide.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About Us',
        item: 'https://canadanocguide.com/about',
      },
    ],
  }

  const aboutFaqs = [
    {
      id: 'affiliation-check',
      question: 'Is CanadaNOCGuide affiliated with the Government of Canada or IRCC?',
      answer:
        'No. CanadaNOCGuide is an independent educational research directory. We are not government officials, a law firm, or a licensed Regulated Canadian Immigration Consultant (RCIC). We structure public open data published under the Open Government Licence – Canada to make immigration research free, fast, and accessible.',
      defaultOpen: true,
    },
    {
      id: 'update-frequency',
      question: 'How frequently is the data on CanadaNOCGuide updated?',
      answer:
        'Express Entry invitation rounds and CRS cutoffs are updated within hours of official IRCC ministerial announcements. Prevailing wage datasets are synchronized annually when ESDC Job Bank publishes new reports (typically each autumn).',
      defaultOpen: false,
    },
    {
      id: 'is-it-free',
      question: 'Is CanadaNOCGuide completely free to use?',
      answer:
        'Yes. All 516 NOC codes, duty checklists, wage comparisons, draw archives, and the CRS Points Calculator are 100% free with no sign-up, paywalls, or hidden charges.',
      defaultOpen: false,
    },
    {
      id: 'consultancy-services',
      question: 'Does CanadaNOCGuide offer paid visa filing or consulting services?',
      answer:
        'No. In strict compliance with Section 91 of Canada’s Immigration and Refugee Protection Act (IRPA), we do not provide paid immigration consulting, profile representation, or legal document reviews. For legal filing, always engage an authorized lawyer or licensed RCIC.',
      defaultOpen: false,
    },
  ]

  return (
    <main className="min-h-screen bg-transparent text-slate-100 selection:bg-cyan-500 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <HeaderNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-20 space-y-12">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            Editorial Standards &amp; Transparency
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-[var(--font-space)]">
            About CanadaNOCGuide
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Making Canadian immigration and occupation data transparent, structured, and 100% free for applicants, students, and workers worldwide.
          </p>
        </div>

        {/* Creator Bio Card */}
        <div className="p-7 sm:p-10 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-950 to-slate-900/60 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-cyan-500/40 relative shrink-0 shadow-lg">
            <Image
              src="/sahajul-haque.jpg"
              alt="Sahajul Haque - Founder and Developer of CanadaNOCGuide"
              fill
              className="object-cover object-top"
              sizes="128px"
            />
          </div>

          <div className="space-y-3 text-center sm:text-left">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[11px] font-mono text-cyan-400 mb-1">
                Founder &amp; Data Architect
              </div>
              <h2 className="text-2xl font-bold text-white">Sahajul Haque</h2>
              <p className="text-xs font-mono text-slate-400">Assam, India 🇮🇳</p>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              When I was exploring Canadian immigration, I noticed how hard it was to find clear facts. Key datasets were scattered across complex government portals, CSV spreadsheets, and legal bulletins. Many candidates paid unnecessary fees to private agencies simply to find their job classification code.
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              I built CanadaNOCGuide to organize this open public data into a fast, transparent, and structured interface that anyone can use free of charge.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono">
              <a
                href="https://x.com/saddamh58509953"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 hover:underline"
              >
                <span>Connect on X (@saddamh58509953)</span>
                <span>↗</span>
              </a>
              <Link href="/contact" className="text-slate-400 hover:text-white hover:underline">
                Contact &amp; Feedback →
              </Link>
            </div>
          </div>
        </div>

        {/* Data Methodology Section */}
        <div className="space-y-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-8">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Our Data Sources &amp; Verification Methodology</h2>
            <p className="text-xs sm:text-sm text-slate-400">All information is parsed directly from official Canadian government open repositories:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
              <span className="text-2xl">🏛️</span>
              <h3 className="font-bold text-white text-sm flex items-center justify-between">
                <span>Statistics Canada</span>
                <a
                  href="https://www.statcan.gc.ca/en/subjects/standard/noc/2021/indexV1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-400 hover:underline font-mono"
                >
                  statcan.gc.ca ↗
                </a>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All 516 NOC unit groups, definitions, main duties, exclusions, and job title aliases are parsed directly from official NOC 2021 V1.0 tables.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
              <span className="text-2xl">💼</span>
              <h3 className="font-bold text-white text-sm flex items-center justify-between">
                <span>ESDC Job Bank</span>
                <a
                  href="https://www.jobbank.gc.ca/trend-analysis/search-wages"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-400 hover:underline font-mono"
                >
                  jobbank.gc.ca ↗
                </a>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Provincial low, median, and high wage reports are sourced from the ESDC 2025/2026 open wage database used for legal LMIA prevailing wage assessments.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
              <span className="text-2xl">🍁</span>
              <h3 className="font-bold text-white text-sm flex items-center justify-between">
                <span>IRCC Ministerial Orders</span>
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-400 hover:underline font-mono"
                >
                  canada.ca ↗
                </a>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Express Entry draw cutoffs and rounds of invitations are synchronized with official Ministerial Instructions published after every draw round.
              </p>
            </div>
          </div>
        </div>

        {/* Editorial Standards & Fact-Checking */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/30 space-y-3">
          <h2 className="text-lg font-bold text-white">Editorial Standards &amp; Correction Commitment</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Our content is written and audited to eliminate immigration misconceptions. We review Ministerial Instructions, ESDC wage updates, and provincial nominee program guidelines regularly. If any user spots an out-of-date salary benchmark or an unlisted job alias, our team commits to reviewing and updating the database within <strong className="text-white">48 hours</strong> of verification.
          </p>
        </div>

        {/* About FAQ Section */}
        <section className="pt-2">
          <AccordionFaq
            title="About CanadaNOCGuide FAQ"
            subtitle="Transparency, data accuracy, and organizational scope."
            badge="EDITORIAL TRANSPARENCY"
            items={aboutFaqs}
            includeSchema={true}
          />
        </section>
      </div>

      <Footer />
    </main>
  )
}

