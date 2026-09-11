import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import HeaderNav from '@/components/home/HeaderNav'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import AccordionFaq from '@/components/ui/AccordionFaq'
import Footer from '@/components/home/Footer'

export const metadata: Metadata = {
  title: 'Canada LMIA Prevailing Wage Rates by Province (2026)',
  description:
    'Compare Canadian median wages and LMIA prevailing wage thresholds across all provinces and territories. Official ESDC Job Bank data for work permits.',
  alternates: {
    canonical: 'https://canadanocguide.com/wages',
  },
  openGraph: {
    title: 'Canada LMIA Prevailing Wage Rates by Province (2026)',
    description:
      'Check official prevailing wages required for LMIA job offers across Ontario, BC, Alberta, and all provinces. Sourced from ESDC Job Bank.',
    url: 'https://canadanocguide.com/wages',
    siteName: 'CanadaNOCGuide',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/pr-card-3d.jpg',
        width: 1200,
        height: 630,
        alt: 'Canada Wage Rates & LMIA Prevailing Wage Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canada LMIA Prevailing Wage Rates by Province (2026)',
    description: 'Explore provincial median salaries and LMIA prevailing wage thresholds across Canada.',
    images: ['/pr-card-3d.jpg'],
  },
}

const PROVINCE_CARDS = [
  { slug: 'ontario', code: 'ON', name: 'Ontario', minWage: '$17.20/hr', provMedian: '$28.50/hr', highWage: '$34.20/hr', topCities: 'Toronto, Ottawa, Hamilton, Waterloo' },
  { slug: 'british-columbia', code: 'BC', name: 'British Columbia', minWage: '$17.40/hr', provMedian: '$29.00/hr', highWage: '$34.80/hr', topCities: 'Vancouver, Victoria, Surrey, Kelowna' },
  { slug: 'alberta', code: 'AB', name: 'Alberta', minWage: '$15.00/hr', provMedian: '$30.00/hr', highWage: '$36.00/hr', topCities: 'Calgary, Edmonton, Red Deer, Lethbridge' },
  { slug: 'quebec', code: 'QC', name: 'Quebec', minWage: '$15.75/hr', provMedian: '$27.50/hr', highWage: '$33.00/hr', topCities: 'Montreal, Quebec City, Laval, Gatineau' },
  { slug: 'manitoba', code: 'MB', name: 'Manitoba', minWage: '$15.80/hr', provMedian: '$25.00/hr', highWage: '$30.00/hr', topCities: 'Winnipeg, Brandon, Steinbach' },
  { slug: 'saskatchewan', code: 'SK', name: 'Saskatchewan', minWage: '$15.00/hr', provMedian: '$26.50/hr', highWage: '$31.80/hr', topCities: 'Saskatoon, Regina, Prince Albert' },
  { slug: 'nova-scotia', code: 'NS', name: 'Nova Scotia', minWage: '$15.20/hr', provMedian: '$24.00/hr', highWage: '$28.80/hr', topCities: 'Halifax, Dartmouth, Sydney' },
  { slug: 'new-brunswick', code: 'NB', name: 'New Brunswick', minWage: '$15.30/hr', provMedian: '$23.50/hr', highWage: '$28.20/hr', topCities: 'Moncton, Saint John, Fredericton' },
  { slug: 'newfoundland', code: 'NL', name: 'Newfoundland and Labrador', minWage: '$15.60/hr', provMedian: '$25.50/hr', highWage: '$30.60/hr', topCities: 'St. John’s, Mount Pearl, Corner Brook' },
  { slug: 'prince-edward-island', code: 'PEI', name: 'Prince Edward Island', minWage: '$16.00/hr', provMedian: '$23.00/hr', highWage: '$27.60/hr', topCities: 'Charlottetown, Summerside' },
  { slug: 'yukon', code: 'YK', name: 'Yukon', minWage: '$17.59/hr', provMedian: '$36.00/hr', highWage: '$43.20/hr', topCities: 'Whitehorse, Dawson City, Watson Lake' },
  { slug: 'northwest-territories', code: 'NWT', name: 'Northwest Territories', minWage: '$16.70/hr', provMedian: '$41.00/hr', highWage: '$49.20/hr', topCities: 'Yellowknife, Inuvik, Hay River' },
  { slug: 'nunavut', code: 'NU', name: 'Nunavut', minWage: '$19.00/hr', provMedian: '$45.00/hr', highWage: '$54.00/hr', topCities: 'Iqaluit, Rankin Inlet, Arviat' }
]

export default function WagesHubPage() {
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
        name: 'Canada Wages & LMIA',
        item: 'https://canadanocguide.com/wages',
      },
    ],
  }

  const wagesFaqItems = [
    {
      id: 'median-requirement',
      question: 'What is the LMIA prevailing median wage requirement?',
      answer:
        'When a Canadian business applies for a Labour Market Impact Assessment (LMIA) to hire a foreign worker, the offered hourly wage must equal or exceed the official Job Bank median rate for that NOC code in the exact local economic region. Offering even 25 cents below the median rate causes immediate rejection by ESDC.',
      defaultOpen: true,
    },
    {
      id: 'high-vs-low-wage',
      question: 'What is the new +20% High-Wage Stream rule?',
      answer:
        'Under updated ESDC guidelines, the High-Wage stream threshold is calculated as the Provincial Median Hourly Wage plus 20%. Positions paid at or above this mark qualify for standard processing and a 2-year work permit. Positions paid below this mark fall into the Low-Wage Stream, which is strictly subject to hiring caps (10%–20%) and automatic refusals in metro areas where unemployment reaches 6% or higher.',
      defaultOpen: false,
    },
    {
      id: 'overtime-and-bonus',
      question: 'Can bonuses, commissions, or overtime be included to meet the median wage?',
      answer:
        'No. ESDC only counts the guaranteed base hourly wage. Tips, anticipated overtime, performance bonuses, profit sharing, and housing allowances cannot be counted toward satisfying the mandatory prevailing wage rate.',
      defaultOpen: false,
    },
    {
      id: 'annual-vs-hourly',
      question: 'How is an annual salary converted to an hourly rate for LMIA verification?',
      answer:
        'ESDC divides the annual salary by the annual hours (standard 37.5 or 40 hours per week multiplied by 52 weeks = 1,950 or 2,080 hours). For example, a $60,000 salary for 40 hours per week equals $28.85 per hour. If the local median is $30.00/hr, the job offer fails compliance.',
      defaultOpen: false,
    },
    {
      id: 'wage-updates',
      question: 'When does Canada update prevailing wage rates?',
      answer:
        'Employment and Social Development Canada (ESDC) releases updated wage figures annually every autumn. The wage in effect on the exact day your LMIA application is submitted governs your approval.',
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
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Canada Wages & LMIA' }]} />

        {/* Master Header Card */}
        <div className="relative p-6 sm:p-10 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-900/60 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <span>🇨🇦</span>
              <span>Official ESDC Job Bank 2025/2026 Dataset</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Canada LMIA Prevailing Wage Rates by Province (2026)
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Employers sponsoring foreign workers under the Temporary Foreign Worker Program (TFWP) must pay at least the <strong className="text-white">provincial prevailing median wage</strong> for that NOC code. Explore certified hourly and annual rates across all 10 provinces and 3 territories.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Regions Covered</span>
                <span className="text-xl font-bold font-mono text-cyan-400 mt-0.5 block">13 Provinces &amp; Terr.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Highest Prov. Median</span>
                <span className="text-xl font-bold font-mono text-emerald-400 mt-0.5 block">Alberta ($30.00/hr)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Highest Min. Wage</span>
                <span className="text-xl font-bold font-mono text-white mt-0.5 block">BC ($17.40/hr)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">ESDC Rule</span>
                <span className="text-xl font-bold font-mono text-amber-400 mt-0.5 block">+20% High-Wage</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: Province Cards Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Select a Province or Territory
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Review regional median wages, mandatory minimum wage floors, and prevailing wage thresholds.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROVINCE_CARDS.map((p) => (
              <Link
                key={p.slug}
                href={`/wages/${p.slug}`}
                className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/50 hover:bg-slate-900/70 transition-all duration-200 group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs font-bold text-cyan-400">
                      {p.code}
                    </span>
                    <span className="text-xs font-mono text-slate-400">ESDC Validated</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 truncate">
                      {p.topCities}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px] font-mono uppercase">Minimum Wage</span>
                      <span className="font-semibold text-slate-200 font-mono">{p.minWage}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] font-mono uppercase">High-Wage (+20%)</span>
                      <span className="font-semibold text-cyan-300 font-mono">{p.highWage}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-cyan-300">
                  <span className="font-medium">Browse All 516 Wages</span>
                  <span className="font-mono text-sm group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION: LMIA Prevailing Wage Rulebook */}
        <section className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/30 space-y-6 backdrop-blur-xl">
          <div className="space-y-2">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Compliance Guide</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              The 3 Rules for Canadian LMIA Prevailing Wage Compliance
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              When an employer files for an LMIA, Employment and Social Development Canada (ESDC) checks that the wage offered is the <strong className="text-white">highest of the following three figures</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 font-mono text-emerald-400 font-bold text-sm flex items-center justify-center">
                1
              </div>
              <h3 className="font-bold text-white text-sm">Regional Job Bank Median</h3>
              <p className="text-slate-400">
                The prevailing median hourly wage posted on ESDC Job Bank for that specific NOC unit group in the region where the worker will actually perform their duties.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 font-mono text-cyan-400 font-bold text-sm flex items-center justify-center">
                2
              </div>
              <h3 className="font-bold text-white text-sm">Company Internal Wage Parity</h3>
              <p className="text-slate-400">
                The wage rate currently paid to Canadian citizens or permanent residents doing the exact same occupation at the same workplace with comparable experience.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 font-mono text-purple-400 font-bold text-sm flex items-center justify-center">
                3
              </div>
              <h3 className="font-bold text-white text-sm">Provincial Minimum Wage</h3>
              <p className="text-slate-400">
                The legal minimum wage mandated by the province or territory. Even if an occupation’s reported median were lower, the statutory minimum wage always acts as the hard floor.
              </p>
            </div>
          </div>
        </section>

        {/* Action Pathways */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/noc"
            className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all group flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-mono text-cyan-400">NOC DIRECTORY</div>
              <div className="text-base font-bold text-white group-hover:text-cyan-300 mt-1">Search Your NOC Code</div>
              <p className="text-xs text-slate-400 mt-1">Find your job code to check its specific provincial wage grid.</p>
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
              <div className="text-xs font-mono text-emerald-400">CRS POINTS TOOL</div>
              <div className="text-base font-bold text-white group-hover:text-emerald-300 mt-1">Calculate CRS Score</div>
              <p className="text-xs text-slate-400 mt-1">Check how your job offer (+50 or +200 pts) impacts your score.</p>
            </div>
            <svg className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* LMIA Rules & Wage Policy FAQ with Smooth +/- Accordion */}
        <section className="pt-4">
          <AccordionFaq
            title="Canada Wages & LMIA Prevailing Wage FAQ"
            subtitle="Understanding provincial medians, the ESDC +20% high-wage threshold, and employer compliance."
            badge="LMIA WAGE GUIDE"
            items={wagesFaqItems}
            includeSchema={true}
          />
        </section>
      </div>

      <Footer />
    </main>
  )
}

