import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import HeaderNav from '@/components/home/HeaderNav'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import AccordionFaq from '@/components/ui/AccordionFaq'
import Footer from '@/components/home/Footer'
import { getAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Express Entry Priority Categories (2026): Eligible NOCs',
  description:
    'Explore IRCC category-based selection for Express Entry (2026). Check eligible NOC codes for STEM, Healthcare, Trades, Transport, Agriculture, and French.',
  alternates: getAlternates('/express-entry'),
  openGraph: {
    title: 'Express Entry Priority Categories (2026): Eligible NOCs',
    description:
      'Check eligible NOC codes for STEM, Healthcare, Trades, Transport, Agriculture, and French with lower CRS cutoffs.',
    url: 'https://canadanocguide.com/express-entry',
    siteName: 'CanadaNOCGuide',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/pr-card-3d.jpg',
        width: 1200,
        height: 630,
        alt: 'Express Entry Priority Categories Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Express Entry Priority Categories (2026): Eligible NOCs',
    description: 'Check category-based selection draws, cutoff scores, and qualifying job codes.',
    images: ['/pr-card-3d.jpg'],
  },
}

const CATEGORIES_LIST = [
  {
    id: 'stem',
    title: 'STEM Occupations',
    sub: 'Science, Technology, Engineering & Math',
    icon: '💻',
    color: '#00D4FF',
    cutoff: 'CRS ~480–495',
    nocCount: '35 NOCs',
    desc: 'Software engineers, data scientists, cybersecurity specialists, and civil/mechanical engineers targeted for Canadian tech growth.'
  },
  {
    id: 'healthcare',
    title: 'Healthcare Occupations',
    sub: 'Doctors, Nurses, Pharmacists & Allied Health',
    icon: '🩺',
    color: '#10B981',
    cutoff: 'CRS ~445–475',
    nocCount: '35 NOCs',
    desc: 'Registered nurses, physicians, medical laboratory technologists, and physiotherapists urgently needed across Canadian provinces.'
  },
  {
    id: 'trades',
    title: 'Trade & Construction',
    sub: 'Electricians, Plumbers, Mechanics & Carpenters',
    icon: '🛠️',
    color: '#F59E0B',
    cutoff: 'CRS ~430–460',
    nocCount: '10 NOCs',
    desc: 'Skilled tradespeople in high demand for nationwide residential housing and critical infrastructure construction projects.'
  },
  {
    id: 'transport',
    title: 'Transport & Logistics',
    sub: 'Commercial Drivers, Pilots & Rail Crew',
    icon: '🚛',
    color: '#6366F1',
    cutoff: 'CRS ~430–470',
    nocCount: '10 NOCs',
    desc: 'Long-haul truck drivers, aircraft maintenance engineers, and transport logistics supervisors keeping national supply chains running.'
  },
  {
    id: 'agriculture',
    title: 'Agriculture & Agri-Food',
    sub: 'Farm Managers, Butchers & Food Supervisors',
    icon: '🌾',
    color: '#84CC16',
    cutoff: 'CRS ~430–450',
    nocCount: '3 NOCs',
    desc: 'Specialized agricultural service contractors, farm supervisors, and industrial retail butchers supporting food security.'
  },
  {
    id: 'french',
    title: 'French-Language Proficiency',
    sub: 'NCLC 7 in all 4 French abilities (Any TEER 0-3)',
    icon: '🇫🇷',
    color: '#A78BFA',
    cutoff: 'CRS ~380–410',
    nocCount: 'All 516 NOCs',
    desc: 'Consistently the lowest CRS cutoff in Express Entry history. Candidates with strong French receive priority regardless of profession.'
  }
]

export default function ExpressEntryHubPage() {
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
        name: 'Express Entry Priority Categories',
        item: 'https://canadanocguide.com/express-entry',
      },
    ],
  }

  const categoryFaqItems = [
    {
      id: 'foreign-experience-counts',
      question: 'Does foreign work experience count for category-based Express Entry draws?',
      answer:
        'Yes! Work experience does NOT need to be in Canada. As long as you have at least 6 months of continuous, paid, full-time (or equivalent part-time) work experience in an eligible NOC within the past 3 years—earned in India, the UAE, the UK, or anywhere else—you qualify for category draws.',
      defaultOpen: true,
    },
    {
      id: 'multiple-categories',
      question: 'Can I qualify for more than one category at the same time?',
      answer:
        'Yes. If your work history spans different roles (for example, 6 months as a software developer and NCLC 7 in French), IRCC’s automated system will consider your profile in both STEM draws and French-language draws, maximizing your chances of an invitation.',
      defaultOpen: false,
    },
    {
      id: 'general-vs-category',
      question: 'Why are category-based cutoffs so much lower than General draws?',
      answer:
        'General draws pool every candidate in the system together, including Canadian Master’s graduates with Canadian work experience who naturally hold 520+ points. Category draws isolate only candidates with specific in-demand skillsets (like nurses or tradespeople), where the pool size is smaller, resulting in cutoffs 40 to 120 points lower.',
      defaultOpen: false,
    },
    {
      id: 'lookback-period',
      question: 'What is the "3-year lookback period" rule for category draws?',
      answer:
        'To qualify for a category draw, your 6 months of continuous work in the targeted NOC must have occurred within the 3 years immediately preceding the date your invitation is issued. Older experience (e.g., 4 or 5 years ago) counts for general CRS points, but does not qualify you for targeted category selection.',
      defaultOpen: false,
    },
    {
      id: 'french-clb-requirement',
      question: 'What exact score is required for the French category?',
      answer:
        'You must score at least NCLC 7 across all four language abilities (Listening, Reading, Writing, and Speaking) on either TEF Canada or TCF Canada. Scoring NCLC 7 also automatically gives you up to 50 additional bonus CRS points.',
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
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Express Entry Priority Categories' }]} />

        {/* Master Header Card */}
        <div className="relative p-6 sm:p-10 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-900/60 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              <span>🇨🇦</span>
              <span>Official IRCC Category-Based Selection (2026)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Express Entry Priority Categories (2026 Selection)
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Instead of only inviting candidates with the highest overall CRS points, Canada conducts dedicated invitation rounds for key shortage sectors. Candidates in these streams regularly receive Invitations to Apply (ITAs) with significantly lower CRS cutoffs.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Target Streams</span>
                <span className="text-xl font-bold font-mono text-cyan-400 mt-0.5 block">6 Categories</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">French Cutoff</span>
                <span className="text-xl font-bold font-mono text-purple-400 mt-0.5 block">CRS ~380–410</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Trades Cutoff</span>
                <span className="text-xl font-bold font-mono text-amber-400 mt-0.5 block">CRS ~430–460</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Experience Required</span>
                <span className="text-xl font-bold font-mono text-emerald-400 mt-0.5 block">6 Months Only</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Category Cards Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Explore the 6 Priority Streams
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Click any category to check all eligible NOC unit codes, recent draw cutoffs, and requirements.
              </p>
            </div>
            <Link
              href="/express-entry-draws"
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <span>See All 442+ Past Draws</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES_LIST.map((cat) => (
              <Link
                key={cat.id}
                href={`/express-entry/${cat.id}`}
                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 hover:border-slate-700 transition-all flex flex-col justify-between group backdrop-blur-xl cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl p-2.5 rounded-2xl bg-slate-950 border border-slate-800">
                      {cat.icon}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
                      {cat.cutoff}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {cat.title}
                    </h3>
                    <div className="text-xs font-mono text-slate-400 mt-0.5">
                      {cat.sub}
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">{cat.nocCount}</span>
                  <span className="font-mono font-bold text-cyan-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>Check Eligible NOCs</span>
                    <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Qualification Criteria Guide */}
        <section className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/30 space-y-4 backdrop-blur-xl">
          <div className="space-y-1">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Eligibility Rulebook</div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              How to Qualify for Category-Based Selection
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Meeting these three mandatory conditions qualifies your Express Entry profile for category-specific rounds:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <h3 className="font-bold text-cyan-400 text-sm">
                1. 6 Months Continuous Experience
              </h3>
              <p>
                You must have accumulated at least <strong className="text-white">6 months of continuous full-time</strong> (or equal part-time) work experience within the past 3 years in one of the eligible NOC codes for that category. Foreign experience is 100% valid!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <h3 className="font-bold text-emerald-400 text-sm">
                2. Standard Pool Eligibility
              </h3>
              <p>
                You must still qualify for at least one of the three core Express Entry programs: Federal Skilled Worker (FSW), Canadian Experience Class (CEC), or Federal Skilled Trades (FST).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <h3 className="font-bold text-purple-400 text-sm">
                3. Language Benchmark
              </h3>
              <p>
                For French category draws, you must score at least NCLC 7 in all 4 abilities on TEF or TCF Canada. For English streams, standard minimum CLB 7 (FSW/CEC) or CLB 5 (Trades) is required.
              </p>
            </div>
          </div>
        </section>

        {/* Action Pathway Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/crs-calculator"
            className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all group flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="text-xs font-mono text-cyan-400">CRS CALCULATOR</div>
              <div className="text-base font-bold text-white group-hover:text-cyan-300 mt-1">Calculate Your Points</div>
              <p className="text-xs text-slate-400 mt-1">See how your score measures up against category cutoffs.</p>
            </div>
            <span className="text-xs font-mono text-cyan-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Estimate Score →
            </span>
          </Link>

          <Link
            href="/express-entry-draws"
            className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-emerald-500/50 hover:bg-slate-900/60 transition-all group flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="text-xs font-mono text-emerald-400">DRAWS ARCHIVE</div>
              <div className="text-base font-bold text-white group-hover:text-emerald-300 mt-1">Check Category Draws</div>
              <p className="text-xs text-slate-400 mt-1">Track 442+ historical draws and cutoff drops across streams.</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              View Draw Trends →
            </span>
          </Link>

          <Link
            href="/wages"
            className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-amber-500/50 hover:bg-slate-900/60 transition-all group flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="text-xs font-mono text-amber-400">PROVINCIAL SALARIES</div>
              <div className="text-base font-bold text-white group-hover:text-amber-300 mt-1">LMIA Prevailing Wages</div>
              <p className="text-xs text-slate-400 mt-1">Compare regional pay benchmarks across 13 provinces.</p>
            </div>
            <span className="text-xs font-mono text-amber-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Compare Salaries →
            </span>
          </Link>

          <Link
            href="/noc"
            className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-purple-500/50 hover:bg-slate-900/60 transition-all group flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="text-xs font-mono text-purple-400">NOC DIRECTORY</div>
              <div className="text-base font-bold text-white group-hover:text-purple-300 mt-1">Look Up Your NOC Code</div>
              <p className="text-xs text-slate-400 mt-1">Verify if your occupation is listed in priority categories.</p>
            </div>
            <span className="text-xs font-mono text-purple-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Search All 516 NOCs →
            </span>
          </Link>
        </div>

        {/* Smooth +/- Accordion FAQ Section */}
        <section className="pt-4">
          <AccordionFaq
            title="Category-Based Selection FAQ"
            subtitle="Understand how IRCC invites candidates through targeted streams with lower CRS scores."
            badge="CATEGORY GUIDE"
            items={categoryFaqItems}
            includeSchema={true}
          />
        </section>

      </div>

      <Footer />
    </main>
  )
}

