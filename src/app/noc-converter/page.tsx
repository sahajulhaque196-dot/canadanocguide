import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import HeaderNav from '@/components/home/HeaderNav'
import Footer from '@/components/home/Footer'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import AccordionFaq from '@/components/ui/AccordionFaq'
import NocConverterTool from '@/components/noc/NocConverterTool'
import { getAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'NOC 2016 to 2021 Converter: 4-Digit to 5-Digit Lookup (2026)',
  description: 'Convert any 4-digit NOC 2016 code to the new 5-digit NOC 2021 TEER code. Free official Statistics Canada concordance lookup for Express Entry & PR applicants.',
  alternates: getAlternates('/noc-converter'),
  openGraph: {
    title: 'NOC 2016 to NOC 2021 Converter | CanadaNOCGuide',
    description: 'Find your new 5-digit NOC 2021 code and TEER category from any 4-digit NOC 2016 code. Official concordance and Express Entry eligibility.',
    url: 'https://canadanocguide.com/noc-converter',
    siteName: 'CanadaNOCGuide',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/pr-card-3d.jpg',
        width: 1200,
        height: 630,
        alt: 'NOC 2016 to 2021 Converter Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOC 2016 to NOC 2021 Converter Tool (Canada PR)',
    description: 'Convert 4-digit NOC 2016 to 5-digit NOC 2021 TEER codes instantly. Official StatCan correspondence database.',
    images: ['/pr-card-3d.jpg'],
  },
}

export default function NocConverterPage() {
  // 1. BreadcrumbList Schema
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
        name: 'NOC Converter',
        item: 'https://canadanocguide.com/noc-converter',
      },
    ],
  }

  // 2. WebApplication Schema
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Canada NOC 2016 to 2021 Code Converter',
    url: 'https://canadanocguide.com/noc-converter',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CAD',
    },
    description: 'Interactive conversion tool mapping 4-digit NOC 2016 codes to 5-digit NOC 2021 codes with TEER levels and Express Entry eligibility.',
  }

  // 3. FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why did Canada switch from NOC 2016 to NOC 2021?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Canada updated the National Occupational Classification from NOC 2016 to NOC 2021 to replace the outdated 4-digit "Skill Level" system (0, A, B, C, D) with the 5-digit "TEER" system (Training, Education, Experience, and Responsibilities). This provides more granular classification of modern occupations, especially in STEM, healthcare, and technical services.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does TEER stand for in NOC 2021?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TEER stands for Training, Education, Experience, and Responsibilities. It categorizes jobs into 6 levels (TEER 0 to 5) based on the necessary qualifications required to perform the job, rather than an arbitrary skill tier.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which NOC 2021 TEER levels are eligible for Express Entry?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Occupations categorized under TEER 0, TEER 1, TEER 2, and TEER 3 are eligible for Express Entry programs (Federal Skilled Worker Program, Canadian Experience Class, and Federal Skilled Trades Program). TEER 4 and TEER 5 jobs are generally not eligible for general Express Entry pools, but qualify for Provincial Nominee Programs (PNP) and work permits.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happened to popular codes like NOC 2174 and NOC 2171?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Under NOC 2021, NOC 2174 (Computer programmers and interactive media developers) was retired and split into NOC 21230, NOC 21232 (Software developers and programmers), and NOC 21234 (Web developers). NOC 2171 was split into NOC 21211 (Data scientists), NOC 21220 (Cybersecurity specialists), NOC 21221, NOC 21222, and NOC 21233.',
        },
      },
      {
        '@type': 'Question',
        name: 'What should I write on my employment reference letter if my work was done under NOC 2016?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'IRCC requires you to choose the new 5-digit NOC 2021 code that best matches your past work duties. Even if your experience occurred prior to November 2022 when NOC 2016 was in effect, you must list the corresponding NOC 2021 code on your Express Entry profile and reference letter checklist.',
        },
      },
    ],
  }

  return (
    <main className="min-h-screen bg-transparent text-slate-100 selection:bg-cyan-500 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <HeaderNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 space-y-12">
        {/* Breadcrumb Trail */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'NOC Converter (2016 to 2021)' },
          ]}
        />

        {/* Hero Header Card */}
        <div className="relative p-6 sm:p-10 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-900/60 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/40 bg-slate-950/80 text-cyan-300 text-xs font-mono tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>OFFICIAL ESDC &amp; STATCAN CONCORDANCE DATABASE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-[var(--font-space)] leading-tight">
              NOC 2016 to NOC 2021 Converter:{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                4-Digit to 5-Digit Transition
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-1">
              On November 16, 2022, Immigration, Refugees and Citizenship Canada (IRCC) replaced the legacy 4-digit NOC 2016 system with the 5-digit <strong className="text-white">NOC 2021 TEER</strong> system. Use this free official concordance lookup tool to find the exact new 5-digit code, TEER category, and Express Entry eligibility for your occupation.
            </p>
          </div>

          {/* Quick Stat Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-800/80">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 uppercase block">Old Structure</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-amber-400 mt-1 block">
                500 Unit Groups
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">NOC 2016 (4 Digits)</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 uppercase block">New Structure</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 mt-1 block">
                516 Unit Groups
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">NOC 2021 (5 Digits)</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 uppercase block">New System</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-1 block">
                TEER 0 to 5
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Replaces Skill Levels</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 uppercase block">Total Mappings</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-purple-400 mt-1 block">
                585 Transitions
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Direct &amp; Split mappings</span>
            </div>
          </div>
        </div>

        {/* The Interactive Converter Tool */}
        <section id="converter-tool">
          <NocConverterTool />
        </section>

        {/* Educational Content Section 1: Skill Level vs TEER Matrix */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-10 backdrop-blur-xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
              Classification Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-[var(--font-space)]">
              NOC 2016 Skill Level vs NOC 2021 TEER Category Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Under NOC 2016, jobs were sorted into 4 skill levels (A, B, C, D) plus Skill Type 0. NOC 2021 introduces 6 TEER categories based on formal training, education, experience, and responsibilities.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs font-mono uppercase tracking-wider">
                  <th className="pb-3 px-3">Old NOC 2016 Skill Level</th>
                  <th className="pb-3 px-3">New NOC 2021 TEER</th>
                  <th className="pb-3 px-3">Minimum Educational &amp; Experience Standard</th>
                  <th className="pb-3 px-3">Express Entry Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="hover:bg-slate-900/40">
                  <td className="py-4 px-3 font-mono font-bold text-purple-300">
                    Skill Type 0
                  </td>
                  <td className="py-4 px-3 font-mono font-bold text-cyan-400">
                    TEER 0
                  </td>
                  <td className="py-4 px-3 text-xs text-slate-300">
                    Management occupations (corporate managers, directors, legislators).
                  </td>
                  <td className="py-4 px-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Eligible (FSW &amp; CEC)
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-900/40">
                  <td className="py-4 px-3 font-mono font-bold text-cyan-300">
                    Skill Level A
                  </td>
                  <td className="py-4 px-3 font-mono font-bold text-cyan-400">
                    TEER 1
                  </td>
                  <td className="py-4 px-3 text-xs text-slate-300">
                    Occupations usually requiring a university degree (bachelor&apos;s, master&apos;s, or doctorate).
                  </td>
                  <td className="py-4 px-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Eligible (FSW &amp; CEC)
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-900/40">
                  <td className="py-4 px-3 font-mono font-bold text-emerald-300" rowSpan={2}>
                    Skill Level B
                  </td>
                  <td className="py-4 px-3 font-mono font-bold text-cyan-400">
                    TEER 2
                  </td>
                  <td className="py-4 px-3 text-xs text-slate-300">
                    Occupations requiring 2 to 3 years post-secondary education, apprenticeship (2-5 yrs), or supervisory tenure.
                  </td>
                  <td className="py-4 px-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Eligible (FSW &amp; FST)
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-900/40">
                  <td className="py-4 px-3 font-mono font-bold text-cyan-400">
                    TEER 3
                  </td>
                  <td className="py-4 px-3 text-xs text-slate-300">
                    Occupations requiring post-secondary education of less than 2 years, apprenticeship (&lt;2 yrs), or 6+ months on-the-job training.
                  </td>
                  <td className="py-4 px-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Eligible (FSW &amp; FST)
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-900/40">
                  <td className="py-4 px-3 font-mono font-bold text-amber-300">
                    Skill Level C
                  </td>
                  <td className="py-4 px-3 font-mono font-bold text-amber-400">
                    TEER 4
                  </td>
                  <td className="py-4 px-3 text-xs text-slate-300">
                    Occupations requiring secondary school graduation, or several weeks of employer-provided on-the-job training.
                  </td>
                  <td className="py-4 px-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700">
                      PNP &amp; Pilots Only
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-900/40">
                  <td className="py-4 px-3 font-mono font-bold text-slate-400">
                    Skill Level D
                  </td>
                  <td className="py-4 px-3 font-mono font-bold text-slate-400">
                    TEER 5
                  </td>
                  <td className="py-4 px-3 text-xs text-slate-300">
                    Short work demonstration and no formal educational requirements.
                  </td>
                  <td className="py-4 px-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700">
                      PNP &amp; Work Permits
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Educational Content Section 2: Important Advice for Express Entry Candidates */}
        <section className="rounded-3xl border border-slate-800 bg-gradient-to-r from-cyan-950/20 via-slate-900/60 to-blue-950/20 p-6 sm:p-10 backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white font-[var(--font-space)]">
              Immigration Officer Guidelines: How Past Experience is Evaluated
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Many applicants ask: <em>&ldquo;My work experience was completed in 2018 or 2020 when NOC 2016 was in effect. Which code should I submit?&rdquo;</em>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <span className="text-cyan-400 font-mono font-bold text-xs uppercase block">1. Use NOC 2021 Codes</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                IRCC forms and the Express Entry portal exclusively accept 5-digit NOC 2021 codes. Do not enter old 4-digit codes on your electronic profile.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-mono font-bold text-xs uppercase block">2. Match Duties, Not Title</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                If your old NOC 2016 code was split into multiple 2021 unit groups (e.g. NOC 2174 split into 21230, 21232, and 21234), choose the specific unit group whose main duties match at least 60% of what you actually performed.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <span className="text-purple-400 font-mono font-bold text-xs uppercase block">3. Reference Letters</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your employer reference letter does not need to cite a NOC code. It only needs to accurately state your official job duties, working hours, and salary. The visa officer matches those duties against NOC 2021.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-10 backdrop-blur-xl">
          <AccordionFaq
            title="Frequently Asked Questions About the NOC 2016 to 2021 Transition"
            subtitle="Get clear answers on 4-digit vs 5-digit codes, TEER categories, and immigration eligibility."
            includeSchema={false}
            items={[
              {
                id: 'why-change',
                question: 'Why did Canada switch from NOC 2016 to NOC 2021?',
                answer: 'Canada updated the National Occupational Classification to replace the outdated 4-digit "Skill Level" system (0, A, B, C, D) with the 5-digit "TEER" system (Training, Education, Experience, and Responsibilities). This provides more granular classification of modern occupations, especially in STEM, healthcare, and technical services.',
                defaultOpen: true,
              },
              {
                id: 'what-is-teer',
                question: 'What does TEER stand for in NOC 2021?',
                answer: 'TEER stands for Training, Education, Experience, and Responsibilities. It categorizes jobs into 6 levels (TEER 0 to 5) based on the necessary qualifications required to perform the job, rather than an arbitrary skill tier.',
                defaultOpen: false,
              },
              {
                id: 'which-teer-ee',
                question: 'Which NOC 2021 TEER levels are eligible for Express Entry?',
                answer: 'Occupations categorized under TEER 0, TEER 1, TEER 2, and TEER 3 are eligible for Express Entry programs (Federal Skilled Worker Program, Canadian Experience Class, and Federal Skilled Trades Program). TEER 4 and TEER 5 jobs are generally not eligible for general Express Entry pools, but qualify for Provincial Nominee Programs (PNP) and work permits.',
                defaultOpen: false,
              },
              {
                id: 'popular-codes',
                question: 'What happened to popular codes like NOC 2174 and NOC 2171?',
                answer: 'Under NOC 2021, NOC 2174 (Computer programmers and interactive media developers) was retired and split into NOC 21230, NOC 21232 (Software developers and programmers), and NOC 21234 (Web developers). NOC 2171 was split into NOC 21211 (Data scientists), NOC 21220 (Cybersecurity specialists), NOC 21221, NOC 21222, and NOC 21233.',
                defaultOpen: false,
              },
              {
                id: 'ref-letter-old-work',
                question: 'What should I write on my employment reference letter if my work was done under NOC 2016?',
                answer: 'IRCC requires you to choose the new 5-digit NOC 2021 code that best matches your past work duties. Even if your experience occurred prior to November 2022 when NOC 2016 was in effect, you must list the corresponding NOC 2021 code on your Express Entry profile and reference letter checklist.',
                defaultOpen: false,
              },
            ]}
          />
        </section>

        {/* Footer CTA */}
        <section className="p-6 sm:p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/30 via-slate-900/60 to-blue-950/30 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
              Explore All 516 Occupations
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white font-[var(--font-space)]">
              Browse the Complete Canada NOC Directory (2026)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Access the complete directory of 516 NOC codes with interactive duties checklists, official Job Bank wage tables, and Express Entry category alignment.
            </p>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/noc"
              className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs shadow-md transition-colors"
            >
              Browse NOC Directory →
            </Link>
            <Link
              href="/crs-calculator"
              className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white font-mono text-xs transition-colors"
            >
              Calculate CRS Score →
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
