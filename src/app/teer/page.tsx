import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import HeaderNav from '@/components/home/HeaderNav'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import AccordionFaq from '@/components/ui/AccordionFaq'
import Footer from '@/components/home/Footer'
import { TEER_LEVELS } from '@/data/teerData'

export const metadata: Metadata = {
  title: 'Canada TEER Categories (0–5): PR Guide (2026)',
  description:
    'Complete guide to Canadian TEER levels (0 to 5). Check which education levels qualify for Express Entry (FSW & CEC) vs Provincial Nominee Programs (PNP).',
  alternates: {
    canonical: 'https://canadanocguide.com/teer',
  },
  openGraph: {
    title: 'Canada TEER Categories (0–5): PR Eligibility Guide',
    description:
      'Learn how the Canadian TEER classification works, which jobs qualify for Express Entry PR, and compare all 6 TEER levels.',
    url: 'https://canadanocguide.com/teer',
    siteName: 'CanadaNOCGuide',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/pr-card-3d.jpg',
        width: 1200,
        height: 630,
        alt: 'Canada TEER Categories Guide (0-5)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canada TEER Categories (0–5): PR Guide (2026)',
    description: 'Check your job TEER level and see if you qualify for Express Entry PR.',
    images: ['/pr-card-3d.jpg'],
  },
}

export default function TeerIndexPage() {
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
        name: 'TEER Categories',
        item: 'https://canadanocguide.com/teer',
      },
    ],
  }

  const teerFaqItems = [
    {
      id: 'why-teer-replaced-skill-levels',
      question: 'Why did Canada replace Skill Levels (0, A, B, C, D) with TEER?',
      answer:
        'The old 4-level system was outdated. Skill Level B lumped together jobs requiring 3-year diplomas with jobs requiring short apprenticeships. The 6-tier TEER system provides a fairer, more granular breakdown of actual Training, Education, Experience, and Responsibilities required for modern jobs.',
      defaultOpen: true,
    },
    {
      id: 'teer-crs-points-difference',
      question: 'Does TEER 0 give more CRS points than TEER 1 or 2?',
      answer:
        'No. In the Comprehensive Ranking System (CRS), all skilled work experience in TEER 0, 1, 2, and 3 earns the exact same points for foreign or Canadian work history. The only exception is a qualifying job offer: senior management jobs under TEER 0 Major Group 00 receive 200 points, whereas all other TEER 0, 1, 2, and 3 jobs receive 50 points.',
      defaultOpen: false,
    },
    {
      id: 'teer-2-vs-3',
      question: 'What is the difference between TEER 2 and TEER 3?',
      answer:
        'TEER 2 occupations require 2 to 3 years of post-secondary college education, a 2- to 5-year apprenticeship training program, or supervisory responsibilities. TEER 3 occupations require a college diploma of less than 2 years, an apprenticeship of less than 2 years, or more than 6 months of on-the-job training.',
      defaultOpen: false,
    },
    {
      id: 'teer-4-and-5-pr-pathways',
      question: 'Can I apply for Canada PR if my job is in TEER 4 or TEER 5?',
      answer:
        'Yes, but not through Federal Express Entry directly. Candidates in TEER 4 and 5 (such as delivery drivers, food counter attendants, and cleaners) frequently secure Canadian PR through Provincial Nominee Program (PNP) Semi-Skilled streams, the Atlantic Immigration Program (AIP), and Rural Immigration Pilots.',
      defaultOpen: false,
    },
  ]

  return (
    <main className="min-h-screen bg-transparent text-slate-100 selection:bg-cyan-500 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Universal Navigation */}
      <HeaderNav />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-20 space-y-12">
        {/* Breadcrumb Trail */}
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'TEER Categories' }]} />

        {/* Master Header Card */}
        <div className="relative p-6 sm:p-10 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-900/60 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              <span>🇨🇦</span>
              <span>NOC 2021 V1.0 Official Framework</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Canada TEER Categories &amp; Express Entry System Explained (2026)
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Every job in Canada is classified into one of 6 TEER levels (0 to 5) based on <strong className="text-white">Training, Education, Experience, and Responsibilities</strong>. Learn which TEER levels qualify for Express Entry and how to verify your occupation code.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Total Levels</span>
                <span className="text-xl font-bold font-mono text-cyan-400 mt-0.5 block">6 TEERs (0–5)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Express Entry Eligible</span>
                <span className="text-xl font-bold font-mono text-emerald-400 mt-0.5 block">TEER 0, 1, 2, 3</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">PNP / Pilot Streams</span>
                <span className="text-xl font-bold font-mono text-amber-400 mt-0.5 block">TEER 4 &amp; 5</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Total Occupations</span>
                <span className="text-xl font-bold font-mono text-slate-200 mt-0.5 block">516 NOC Codes</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: TEER Levels 0 to 5 Cards */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Compare TEER Levels 0 to 5
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Check educational credentials, typical job responsibilities, and immigration eligibility.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEER_LEVELS.map((t) => (
              <div
                key={t.level}
                className="p-6 rounded-3xl border border-slate-800 bg-slate-900/40 hover:border-slate-700 transition-all flex flex-col justify-between backdrop-blur-xl group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border bg-gradient-to-r ${t.color} ${t.accentBorder}`}
                    >
                      TEER {t.level}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{t.eeEligible ? 'Express Entry' : 'PNP / Pilots'}</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {t.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      {t.shortDef}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Typical Education</span>
                    <span className="text-slate-200 block">{t.educationReq}</span>
                  </div>

                  <div className="text-xs text-slate-400">
                    <span className="font-mono text-slate-500 block mb-1">SAMPLE OCCUPATIONS:</span>
                    <div className="space-y-1">
                      {t.sampleNocs.map((item) => (
                        <div key={item.code} className="truncate">
                          <Link href={`/noc/${item.code}`} className="font-mono text-cyan-400 text-[11px] mr-1.5 hover:underline font-semibold">
                            NOC {item.code}
                          </Link>
                          <span className="text-slate-300">{item.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">{t.nocCount} Occupations</span>
                  <Link
                    href={`/teer/${t.level}`}
                    className="inline-flex items-center gap-1 font-mono font-bold text-cyan-400 hover:text-cyan-300 hover:underline"
                  >
                    <span>View All Jobs</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: Old Skill Level vs Modern TEER Conversion */}
        <section className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/30 space-y-6 backdrop-blur-xl">
          <div className="space-y-2">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Conversion Reference</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Old NOC Skill Levels vs. Modern TEER Categories
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              If you prepared your documents using older immigration forums, here is how the legacy 4-digit NOC 2016 skill levels map directly into the modern 5-digit NOC 2021 TEER system:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300">
                  <th className="py-3 px-4 font-semibold text-white">Legacy Skill Level</th>
                  <th className="py-3 px-4 font-semibold text-cyan-400">New TEER Level</th>
                  <th className="py-3 px-4 font-semibold text-slate-200">Education Requirement</th>
                  <th className="py-3 px-4 font-semibold text-emerald-400">Express Entry Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-200">Skill Type 0</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">TEER 0</td>
                  <td className="py-3.5 px-4">Management occupations</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-medium">✓ Eligible</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-200">Skill Level A</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">TEER 1</td>
                  <td className="py-3.5 px-4">University degree (Bachelor, Master, Doctorate)</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-medium">✓ Eligible</td>
                </tr>
                <tr className="bg-cyan-950/20">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-200">Skill Level B</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">TEER 2 &amp; TEER 3</td>
                  <td className="py-3.5 px-4">College diploma or apprenticeship (2+ yrs vs &lt;2 yrs)</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-medium">✓ Both Eligible</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-200">Skill Level C</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-400">TEER 4</td>
                  <td className="py-3.5 px-4">Secondary school (high school) diploma</td>
                  <td className="py-3.5 px-4 text-amber-400 font-medium">⚠ Ineligible (PNP only)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-200">Skill Level D</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-400">TEER 5</td>
                  <td className="py-3.5 px-4">Short work demonstration / on-the-job training</td>
                  <td className="py-3.5 px-4 text-amber-400 font-medium">⚠ Ineligible (PNP only)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* PR Qualification Guide */}
        <section className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/30 space-y-4 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-white">
            Which TEER Level Do You Need for Canadian PR?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <h3 className="font-bold text-emerald-400 text-sm">
                TEER 0, 1, 2, and 3: Direct Express Entry
              </h3>
              <p>
                If your occupation falls in TEER 0, 1, 2, or 3, you meet the minimum skill requirement for Canada&apos;s primary economic immigration programs:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Federal Skilled Worker Program (FSWP)</li>
                <li>Canadian Experience Class (CEC)</li>
                <li>Federal Skilled Trades Program (FSTP)</li>
                <li>Category-Based Selection (STEM, Health, Trades, Transport, Agri)</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-400 text-sm">
                TEER 4 and 5: Regional &amp; Pilot Pathways
              </h3>
              <p>
                TEER 4 and 5 jobs are not eligible for standard Express Entry pools. However, thousands of candidates transition to Permanent Residency every year through:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Provincial Nominee Programs (PNP semi-skilled streams)</li>
                <li>Atlantic Immigration Program (AIP)</li>
                <li>Rural and Northern Community Immigration Pilots</li>
                <li>Caregiver and Agri-Food Immigration Pilots</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation Action Pathway */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/noc"
            className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all group flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-mono text-cyan-400">DIRECTORY LOOKUP</div>
              <div className="text-base font-bold text-white group-hover:text-cyan-300 mt-1">Search All 516 NOC Codes</div>
              <p className="text-xs text-slate-400 mt-1">Filter occupations by TEER 0, 1, 2, 3, 4, or 5.</p>
            </div>
            <svg className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/crs-calculator"
            className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-emerald-500/50 hover:bg-slate-900/60 transition-all group flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-mono text-emerald-400">POINTS TOOL</div>
              <div className="text-base font-bold text-white group-hover:text-emerald-300 mt-1">Calculate Your CRS Score</div>
              <p className="text-xs text-slate-400 mt-1">Verify how your TEER experience translates to PR points.</p>
            </div>
            <svg className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Smooth +/- Accordion FAQ Section */}
        <section className="pt-4">
          <AccordionFaq
            title="Canadian TEER Framework FAQ"
            subtitle="Understand how TEER levels impact immigration eligibility, work permits, and permanent residency."
            badge="TEER GUIDE"
            items={teerFaqItems}
            includeSchema={true}
          />
        </section>

      </div>

      <Footer />
    </main>
  )
}

