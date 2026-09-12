import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import HeaderNav from '@/components/home/HeaderNav'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import CrsCalculator from '@/components/calculator/CrsCalculator'
import AccordionFaq from '@/components/ui/AccordionFaq'
import ImmigrationDisclaimer from '@/components/ui/ImmigrationDisclaimer'
import Footer from '@/components/home/Footer'
import { getAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'CRS Calculator (2026): Estimate Your Canada Express Entry Points',
  description:
    'Estimate your Canada Express Entry CRS score for free (2026). Check points for age, education, language CLB, work experience, and discover score boosters.',
  alternates: getAlternates('/crs-calculator'),
  openGraph: {
    title: 'Canada Express Entry CRS Score Calculator (2026)',
    description:
      'Free Comprehensive Ranking System (CRS) estimator. Check your score against recent draw cutoffs and discover actionable point boosters.',
    url: 'https://canadanocguide.com/crs-calculator',
    siteName: 'CanadaNOCGuide',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/pr-card-3d.jpg',
        width: 1200,
        height: 630,
        alt: 'Canada Express Entry CRS Points Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canada Express Entry CRS Score Estimator (2026)',
    description: 'Estimate your CRS points and compare against latest draw cutoffs.',
    images: ['/pr-card-3d.jpg'],
  },
}

export default function CrsCalculatorPage() {
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
        name: 'CRS Calculator',
        item: 'https://canadanocguide.com/crs-calculator',
      },
    ],
  }

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Canada Express Entry CRS Score Calculator',
    url: 'https://canadanocguide.com/crs-calculator',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All',
    description:
      'Interactive Comprehensive Ranking System (CRS) points calculator based on official IRCC ministerial criteria for Canada Express Entry.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CAD',
    },
  }

  const faqItems = [
    {
      id: 'score-simulation',
      question: 'How does the CRS calculator determine my score against current cutoff thresholds?',
      answer:
        'Our calculator evaluates your age, degrees (ECA), language bands (CLB), work experience, and bonus factors across all 4 official IRCC modules. If your total score falls below the 510+ CEC or General cutoff, you can simulate personal boosters—such as retaking IELTS for CLB 9 (+50 to +80 pts), adding French NCLC 7 (+50 pts), or securing a Provincial Nomination (+600 pts) to bridge your score gap.',
      defaultOpen: true,
    },
    {
      id: 'clb-8-vs-9',
      question: 'Why is CLB 9 called the "Golden Benchmark" in Express Entry?',
      answer:
        'Scoring CLB 9 in all 4 sections (IELTS: 8.0 in Listening, 7.0 in Reading, 7.0 in Writing, 7.0 in Speaking) unlocks maximum Skill Transferability points (+50 for education combo and +50 for foreign work experience combo). Jumping from CLB 8 to CLB 9 often gives candidates a massive jump of 50 to 80+ total CRS points.',
      defaultOpen: false,
    },
    {
      id: 'age-drop',
      question: 'How fast do CRS points drop after turning 30 years old?',
      answer:
        'You get the maximum 110 points for age between 20 and 29. Starting at age 30, you lose 5 points every year (105 at age 30, 95 at age 32). After age 35, the drop speeds up to 10 points per year. By age 40, you receive only 45 points, and at age 45 or older, you receive 0 age points.',
      defaultOpen: false,
    },
    {
      id: 'fsw-67-vs-crs',
      question: 'What is the difference between the 67-point FSW grid and the 1,200 CRS score?',
      answer:
        'They are two separate checks. The 67-point grid (Federal Skilled Worker eligibility) is just the entry ticket to get into the Express Entry pool. Once you pass that hurdle with at least 67/100 points, your actual ranking in the pool is decided strictly by your Comprehensive Ranking System (CRS) score out of 1,200 points.',
      defaultOpen: false,
    },
    {
      id: 'job-offer-points',
      question: 'Does a Canadian job offer give 50 points or 200 points?',
      answer:
        'A valid job offer backed by an approved LMIA (or an LMIA-exempt work permit) gives 200 points only if it is for senior executive positions in TEER 0 Major Group 00. For all other skilled professions in TEER 0, 1, 2, or 3 (like engineers, accountants, software developers, or supervisors), it gives 50 points.',
      defaultOpen: false,
    },
    {
      id: 'eca-required',
      question: 'Do I need an Educational Credential Assessment (ECA) before calculating CRS?',
      answer:
        'Yes. If your degrees or diplomas were completed outside of Canada (for example in India, the UK, or the Philippines), you cannot claim any education points in your Express Entry profile without an official ECA report from an authorized organization like WES, IQAS, ICAS, or CES.',
      defaultOpen: false,
    },
    {
      id: 'spouse-points-impact',
      question: 'Does having a spouse increase or decrease my CRS points?',
      answer:
        'When you apply with an accompanying spouse, your personal Core Human Capital points drop from 500 down to 460. The remaining 40 points come from your spouse: up to 10 for education, 20 for language tests, and 10 for Canadian work experience. If your spouse has high English bands and a degree, your score stays high. If not, declaring your spouse as "non-accompanying" lets you claim the full single score of 500 points.',
      defaultOpen: false,
    },
    {
      id: 'boost-score-fast',
      question: 'What is the fastest way to increase my CRS score by 50+ points?',
      answer:
        'The two fastest strategies are: 1) Retake your IELTS or CELPIP test until you hit CLB 9 across all sections (adds up to 80 points); and 2) Learn French up to NCLC 7 level (adds +50 bonus points and opens Category draws with sub-400 cutoffs). If you receive a Provincial Nomination (PNP), you get an immediate +600 points boost.',
      defaultOpen: false,
    },
  ]

  return (
    <main className="min-h-screen bg-transparent text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Schema Injections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      {/* Universal Navigation */}
      <HeaderNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-20 space-y-12">
        
        {/* Breadcrumb Trail */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'CRS Calculator' },
          ]}
        />

        {/* Educational disclaimer — required for immigration-niche AdSense compliance */}
        <ImmigrationDisclaimer />

        {/* Master Header Card */}
        <div className="relative rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-10 backdrop-blur-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              <span>🇨🇦</span>
              <span>Based on IRCC Criteria (1,200 Points Grid)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Canada Express Entry CRS Score Calculator (2026)
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Calculate your exact Comprehensive Ranking System (CRS) score for Canadian Permanent Residency (PR).
              Get an instant breakdown for Age, Education, Language (IELTS/CELPIP), and Work Experience, and compare your score directly with the latest <strong className="text-white">2026 draw cutoffs</strong>.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                100% Free & No Sign-up
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Live Category Cutoff Benchmark
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Updated for 2026 IRCC Ministerial Rules
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Calculator Engine */}
        <section>
          <CrsCalculator />
        </section>

        {/* SECTION 1: How the CRS Points Grid Works */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-10 space-y-8 backdrop-blur-xl">
          <div className="space-y-2">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Points Grid Breakdown</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              How the 1,200-Point Express Entry CRS Grid Works
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Immigration, Refugees and Citizenship Canada (IRCC) evaluates every profile in the Express Entry pool based on four core sections. Your total score decides when and if you receive an Invitation to Apply (ITA) for Canada PR.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Box 1 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 uppercase">Part A</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">Max 500 Pts</span>
              </div>
              <h3 className="text-base font-semibold text-white">Core Human Capital</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Points for your age, highest level of education (ECA verified), first language test scores, and Canadian skilled work experience.
              </p>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-900">
                Single applicant: 500 max | With spouse: 460 max
              </div>
            </div>

            {/* Box 2 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-violet-400 uppercase">Part B</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">Max 40 Pts</span>
              </div>
              <h3 className="text-base font-semibold text-white">Spouse Factors</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                If applying together, your spouse can contribute up to 10 points for education, 20 points for language, and 10 points for Canadian work.
              </p>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-900">
                Only applies if spouse is accompanying to Canada
              </div>
            </div>

            {/* Box 3 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-400 uppercase">Part C</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">Max 100 Pts</span>
              </div>
              <h3 className="text-base font-semibold text-white">Skill Transferability</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Combination bonuses when high language levels (CLB 7/9) are paired with education or foreign work experience.
              </p>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-900">
                Hitting CLB 9 unlocks the full 100 points
              </div>
            </div>

            {/* Box 4 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 uppercase">Part D</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Max 600 Pts</span>
              </div>
              <h3 className="text-base font-semibold text-white">Additional Bonuses</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Provincial Nomination (+600), French skills (+50), Canadian education (+15 to +30), Canadian job offer (+50 or +200), or sibling in Canada (+15).
              </p>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-900">
                PNP gives a guaranteed invitation in the next draw
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Step-by-Step Guide */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-10 space-y-8 backdrop-blur-xl">
          <div className="space-y-2">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Clear Action Guide</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              How to Calculate Your Express Entry Score in 4 Simple Steps
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Follow these simple steps before submitting your profile to the IRCC portal. Calculating your points accurately prevents surprises or refusals later.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Step 1 */}
            <div className="flex gap-4 p-5 rounded-2xl border border-slate-800/80 bg-slate-950/40">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400">
                1
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-semibold text-white">Check Your Age and Education (ECA)</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  You get the highest points for age between 20 and 29 (110 points). For foreign education, make sure you have an official ECA report (e.g., from WES). A Master’s degree or having two degrees yields significantly higher points than a single Bachelor’s.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 p-5 rounded-2xl border border-slate-800/80 bg-slate-950/40">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400">
                2
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-semibold text-white">Convert Your Test Scores to CLB</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  IRCC does not use raw IELTS bands. They convert your scores into Canadian Language Benchmarks (CLB). Hitting CLB 9 across all four sections (Listening, Reading, Writing, Speaking) is the single biggest booster for your profile.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 p-5 rounded-2xl border border-slate-800/80 bg-slate-950/40">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400">
                3
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-semibold text-white">Confirm Your NOC Code & Skilled Work Experience</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Your work experience must be continuous, paid, and in TEER 0, 1, 2, or 3. You reach the maximum foreign work points at 3 years. Check our{' '}
                  <Link href="/noc" className="text-cyan-400 hover:underline">NOC Directory</Link> and{' '}
                  <Link href="/teer" className="text-cyan-400 hover:underline">TEER Guide</Link> to ensure your job duties match official IRCC specifications.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4 p-5 rounded-2xl border border-slate-800/80 bg-slate-950/40">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400">
                4
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-semibold text-white">Claim Valid Additional Bonus Points</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Only claim a job offer if you have an approved LMIA or qualify for an official LMIA exemption. If you studied in Canada, have a sibling living in Canada as a citizen/PR, or learned French to NCLC 7 level, add those bonus points here.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: IELTS / CELPIP to CLB Benchmark Table */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-10 space-y-6 backdrop-blur-xl">
          <div className="space-y-2">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Language Reference</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              IELTS & CELPIP to CLB Score Conversion Table
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Use this quick reference to find your official Canadian Language Benchmark (CLB) level. Compare your actual test bands below:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300">
                  <th className="py-3 px-4 font-semibold text-white">CLB Level</th>
                  <th className="py-3 px-4 font-semibold text-cyan-400">Listening</th>
                  <th className="py-3 px-4 font-semibold text-cyan-400">Reading</th>
                  <th className="py-3 px-4 font-semibold text-cyan-400">Writing</th>
                  <th className="py-3 px-4 font-semibold text-cyan-400">Speaking</th>
                  <th className="py-3 px-4 font-semibold text-slate-200">CELPIP General</th>
                  <th className="py-3 px-4 font-semibold text-emerald-400">CRS Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="bg-emerald-950/20 border-l-2 border-l-emerald-500">
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">CLB 10</td>
                  <td className="py-3.5 px-4">8.5+</td>
                  <td className="py-3.5 px-4">8.0+</td>
                  <td className="py-3.5 px-4">7.5+</td>
                  <td className="py-3.5 px-4">7.5+</td>
                  <td className="py-3.5 px-4">10</td>
                  <td className="py-3.5 px-4 text-emerald-300 font-medium">Full Max Points (34 pts/ability)</td>
                </tr>
                <tr className="bg-cyan-950/20 border-l-2 border-l-cyan-500">
                  <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">CLB 9 (Magic Target)</td>
                  <td className="py-3.5 px-4 font-semibold text-white">8.0</td>
                  <td className="py-3.5 px-4 font-semibold text-white">7.0</td>
                  <td className="py-3.5 px-4 font-semibold text-white">7.0</td>
                  <td className="py-3.5 px-4 font-semibold text-white">7.0</td>
                  <td className="py-3.5 px-4 font-semibold text-white">9</td>
                  <td className="py-3.5 px-4 text-cyan-300 font-medium">Unlocks 100 Skill Transferability Pts</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-200">CLB 8</td>
                  <td className="py-3.5 px-4">7.5</td>
                  <td className="py-3.5 px-4">6.5</td>
                  <td className="py-3.5 px-4">6.5</td>
                  <td className="py-3.5 px-4">6.5</td>
                  <td className="py-3.5 px-4">8</td>
                  <td className="py-3.5 px-4 text-slate-400">Partial transferability (25 pts)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-200">CLB 7</td>
                  <td className="py-3.5 px-4">6.0</td>
                  <td className="py-3.5 px-4">6.0</td>
                  <td className="py-3.5 px-4">6.0</td>
                  <td className="py-3.5 px-4">6.0</td>
                  <td className="py-3.5 px-4">7</td>
                  <td className="py-3.5 px-4 text-slate-400">Minimum threshold for FSW program</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400">
            * Note: If any single ability drops below 7.0 (or below 8.0 in listening), that specific component is scored at CLB 8 or lower, which lowers your total skill transferability points.
          </p>
        </section>

        {/* SECTION 4: 5 Proven Ways to Increase CRS Points */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-10 space-y-8 backdrop-blur-xl">
          <div className="space-y-2">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Points Booster Guide</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5 Practical Ways to Increase Your CRS Score by 50+ Points
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              If your current score is below the 500 mark, here are the most realistic, field-tested ways Indian and international candidates boost their score:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Strategy 1 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-semibold text-white">Retake IELTS to Hit CLB 9</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                If you have CLB 8, retaking the test to achieve 8 in Listening and 7 in Reading, Writing, and Speaking triggers maximum skill transferability. This alone can increase your score by <strong className="text-cyan-300">50 to 80 points</strong> without waiting for any job offer.
              </p>
            </div>

            {/* Strategy 2 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-semibold text-white">Learn French to NCLC 7</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Reaching NCLC 7 in French (via TEF Canada or TCF Canada) awards up to <strong className="text-violet-300">+50 bonus CRS points</strong>. More importantly, French category draws invite candidates with cutoffs as low as 380–410 points.
              </p>
            </div>

            {/* Strategy 3 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-semibold text-white">Target Provincial Nominee Programs (PNP)</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Provinces like Ontario (OINP Human Capital), Alberta (AAIP), and Saskatchewan (SINP) select candidates directly from the Express Entry pool. A provincial nomination awards an instant <strong className="text-emerald-300">+600 points</strong>, practically guaranteeing an invitation in the next draw.
              </p>
            </div>

            {/* Strategy 4 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
                04
              </div>
              <h3 className="text-base font-semibold text-white">Add a Second Diploma or Certificate</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                If you have a 3-year or 4-year Bachelor’s degree, completing a 1-year recognized postgraduate certificate elevates your education status to &quot;Two or more certificates, diplomas, or degrees&quot;, adding <strong className="text-amber-300">up to 33 extra points</strong>.
              </p>
            </div>

            {/* Strategy 5 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-bold text-sm">
                05
              </div>
              <h3 className="text-base font-semibold text-white">Evaluate Your Spouse’s Points</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                If your spouse has low language scores or does not hold higher education credentials, calculating your score with your spouse marked as &quot;non-accompanying&quot; allows you to compete under the 500-point single scale. You can sponsor your spouse after you land as a permanent resident.
              </p>
            </div>

            {/* Strategy 6 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">
                06
              </div>
              <h3 className="text-base font-semibold text-white">Gain 1 Year of Canadian Experience</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                One year of skilled Canadian work experience under a Post-Graduation Work Permit (PGWP) or LMIA work permit awards 40 direct points plus massive skill transferability points, often boosting candidates by <strong className="text-blue-300">70 to 85 points</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: 2026 Reality Check: Where Do You Stand? */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-10 space-y-6 backdrop-blur-xl">
          <div className="space-y-2">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Cutoff Benchmarks</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2026 Cutoff Reality Check: Where Do You Stand?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Check how your calculated score compares with typical invitations sent across different Express Entry streams:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-1">
              <div className="text-xs text-slate-400">General / CEC Draws</div>
              <div className="text-xl font-bold text-white">510 – 535 Pts</div>
              <div className="text-[11px] text-slate-400">High competition. Requires Canadian work or Master’s + CLB 9/10.</div>
            </div>

            <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/10 space-y-1">
              <div className="text-xs text-cyan-400 font-medium">STEM Occupations</div>
              <div className="text-xl font-bold text-cyan-300">480 – 495 Pts</div>
              <div className="text-[11px] text-slate-400">Developers, engineers, data scientists with 6 months continuous experience.</div>
            </div>

            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/10 space-y-1">
              <div className="text-xs text-emerald-400 font-medium">Healthcare Occupations</div>
              <div className="text-xl font-bold text-emerald-300">445 – 475 Pts</div>
              <div className="text-[11px] text-slate-400">Nurses, physiotherapists, and medical specialists. Consistently lower cutoffs.</div>
            </div>

            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/10 space-y-1">
              <div className="text-xs text-amber-400 font-medium">Trades Occupations</div>
              <div className="text-xl font-bold text-amber-300">430 – 460 Pts</div>
              <div className="text-[11px] text-slate-400">Carpenters, electricians, welders, plumbers. High Canada labour demand.</div>
            </div>

            <div className="p-4 rounded-xl border border-violet-500/30 bg-violet-950/10 space-y-1">
              <div className="text-xs text-violet-400 font-medium">French Language Proficiency</div>
              <div className="text-xl font-bold text-violet-300">380 – 410 Pts</div>
              <div className="text-[11px] text-slate-400">Lowest cutoffs in the entire system. Massive invitations for NCLC 7 holders.</div>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-1">
              <div className="text-xs text-slate-400">Provincial Nominee Program (PNP)</div>
              <div className="text-xl font-bold text-white">720 – 850 Pts</div>
              <div className="text-[11px] text-slate-400">Always high because it includes the automatic +600 points provincial bonus.</div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between flex-wrap gap-4 text-xs sm:text-sm text-slate-400 border-t border-slate-800/80">
            <span>Want to see every past invitation round?</span>
            <Link
              href="/express-entry-draws"
              className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-medium"
            >
              <span>Explore All 442+ Express Entry Draws</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Smooth +/- Accordion FAQ Section with Schema */}
        <section className="pt-4">
          <AccordionFaq
            title="Express Entry CRS Points FAQ"
            subtitle="Common questions about calculating points, language benchmarks, and maximizing your score."
            badge="CRS SCORING GUIDE"
            items={faqItems}
            includeSchema={true}
          />
        </section>

      </div>

      <Footer />
    </main>
  )
}

