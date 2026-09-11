import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import HeaderNav from '@/components/home/HeaderNav'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import DrawsTable from '@/components/draws/DrawsTable'
import AccordionFaq from '@/components/ui/AccordionFaq'
import Footer from '@/components/home/Footer'
import { getAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Express Entry Draws (2026): Latest CRS Cutoffs & History',
  description:
    'Track official Express Entry draws (2026). Check latest CRS cutoff scores, ITA invitation volumes, and category trends for STEM, Healthcare, and Trades.',
  alternates: getAlternates('/express-entry-draws'),
  openGraph: {
    title: 'Express Entry Draws & Latest CRS Cutoffs (2026)',
    description: 'Complete archive of all 442 official Express Entry invitation rounds, CRS scores, and category streams.',
    url: 'https://canadanocguide.com/express-entry-draws',
    siteName: 'CanadaNOCGuide',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/pr-card-3d.jpg',
        width: 1200,
        height: 630,
        alt: 'Express Entry Draws Tracker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Express Entry Draws Tracker (442 Rounds)',
    description: 'Track the latest CRS cutoffs for STEM, Healthcare, Trades, and CEC.',
    images: ['/pr-card-3d.jpg'],
  },
}

export default function ExpressEntryDrawsPage() {
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
        name: 'Express Entry Draws',
        item: 'https://canadanocguide.com/express-entry-draws',
      },
    ],
  }

  const drawsFaqItems = [
    {
      id: 'good-crs-score',
      question: 'What is a realistic CRS score needed to receive an ITA in 2026?',
      answer:
        'For standard General rounds and Canadian Experience Class (CEC) draws, cutoff scores consistently range between 510 and 535 points. However, targeted category draws offer a much lower entry barrier: Healthcare draws invite candidates with scores in the 445–475 range, STEM cutoffs sit around 480–495, Trades cutoffs range from 430–460, and French proficiency cutoffs have dropped below 390 points.',
      defaultOpen: true,
    },
    {
      id: 'draw-schedule',
      question: 'How often does IRCC conduct Express Entry draws?',
      answer:
        'IRCC typically holds rounds of invitations every two weeks, most commonly on Wednesdays or Thursdays. However, IRCC has full discretion to conduct back-to-back draws, surprise Friday draws, or pause rounds during system maintenance without prior notice.',
      defaultOpen: false,
    },
    {
      id: 'post-ita-deadline',
      question: 'How much time do I have to submit my PR application after receiving an ITA?',
      answer:
        'You have exactly 60 calendar days from the date you receive your Invitation to Apply (ITA) to upload all supporting documents (PCC, medical exams, reference letters, proof of funds) and submit your complete e-APR (electronic Application for Permanent Residence). There are no extensions.',
      defaultOpen: false,
    },
    {
      id: 'score-drop-after-ita',
      question: 'What happens if my CRS score drops below the draw cutoff after receiving an ITA?',
      answer:
        'If your CRS score drops below the cutoff score of the round in which you were invited (for example, if you celebrated a birthday that decreased your age points, or if your language test expired), your application will be refused. Birthday age-drops occurring during the 60-day window are officially exempted under IRCC public policy, but loss of job offer or expired test results are not.',
      defaultOpen: false,
    },
    {
      id: 'proof-of-funds',
      question: 'Who is required to show Proof of Funds (POF) upon receiving an ITA?',
      answer:
        'Candidates applying under the Federal Skilled Worker Program (FSWP) or Federal Skilled Trades Program (FSTP) must show proof of unencumbered settlement funds. Candidates invited under the Canadian Experience Class (CEC) or those who hold a valid, LMIA-supported Canadian job offer are legally exempt from showing proof of funds.',
      defaultOpen: false,
    },
    {
      id: 'tie-breaking-rule',
      question: 'How does the Express Entry tie-breaking rule work?',
      answer:
        'When multiple candidates hold the exact cutoff score, IRCC uses the tie-breaking rule based on profile submission timestamp. Only profiles created and submitted into the pool before the published cut-off date and time receive an invitation.',
      defaultOpen: false,
    },
  ]

  return (
    <main className="relative min-h-screen bg-transparent text-slate-100 selection:bg-cyan-500 selection:text-black overflow-hidden">
      {/* Background Ambient Radial Glow Orbs */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute top-[450px] -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-[130px] pointer-events-none -z-0" />
      <div className="absolute top-[900px] -right-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none -z-0" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Universal Navigation Bar */}
      <HeaderNav />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-20 space-y-12">
        
        {/* Breadcrumb Trail */}
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Express Entry Draws' }]} />

        {/* Page Header */}
        <div className="relative p-6 sm:p-10 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-900/60 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="absolute -top-16 -right-16 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Real-Time IRCC Ministerial Instructions Sync
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Express Entry Draws Archive &amp; Latest CRS Cutoffs
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Track all 442 official rounds of invitations held by Immigration, Refugees and Citizenship Canada (IRCC). Compare cutoffs across General, CEC, and Category-Based draws (STEM, Healthcare, Trades, French, Transport, Agriculture).
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Archive Size</span>
                <span className="text-xl font-bold font-mono text-cyan-400 mt-0.5 block">442 Rounds</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">General Draw Range</span>
                <span className="text-xl font-bold font-mono text-slate-200 mt-0.5 block">510 – 535</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Healthcare Target</span>
                <span className="text-xl font-bold font-mono text-emerald-400 mt-0.5 block">CRS ~445–475</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">French Proficiency</span>
                <span className="text-xl font-bold font-mono text-purple-400 mt-0.5 block">CRS ~380–410</span>
              </div>
            </div>

          </div>
        </div>

        {/* Draws Table Component */}
        <section>
          <DrawsTable />
        </section>

        {/* SECTION 1: Draw Dynamics (Category vs General) */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-10 space-y-8 backdrop-blur-xl">
          <div className="space-y-2">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Draw Analysis &amp; Trends</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Understanding Express Entry Draw Types in 2026
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Not all Express Entry draws are identical. IRCC splits invitations across distinct categories, meaning your required cutoff depends heavily on your professional profile:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 space-y-3">
              <div className="text-xs font-mono text-cyan-400 uppercase">Stream 01</div>
              <h3 className="text-base font-semibold text-white">General &amp; CEC Draws</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Invites all eligible candidates regardless of occupation. Because the pool has many Canadian master&apos;s graduates with Canadian work experience, cutoffs remain high (510–535+ points).
              </p>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-900">
                Best for: Candidates with Canadian degrees + Canadian job experience
              </div>
            </div>

            {/* Box 2 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 space-y-3">
              <div className="text-xs font-mono text-emerald-400 uppercase">Stream 02</div>
              <h3 className="text-base font-semibold text-white">Category-Based Selection</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Targets specific occupations with acute Canadian shortages (STEM, Healthcare, Trades, Transport, Agriculture). Cutoffs are 40 to 80 points lower than general draws.
              </p>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-900">
                Requirement: 6 months continuous experience in designated NOC code
              </div>
            </div>

            {/* Box 3 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 space-y-3">
              <div className="text-xs font-mono text-purple-400 uppercase">Stream 03</div>
              <h3 className="text-base font-semibold text-white">French Language Category</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Canada has a constitutional mandate to promote Francophone immigration outside Quebec. Candidates with NCLC 7 in French regularly receive ITAs with scores under 400.
              </p>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-900">
                Test required: TEF Canada or TCF Canada (Level 7 in all 4 bands)
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: What Happens After ITA Roadmap */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-10 space-y-8 backdrop-blur-xl">
          <div className="space-y-2">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Post-Invitation Action Plan</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              What Happens After You Receive an Invitation to Apply (ITA)?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Receiving an ITA is a major milestone, but your 60-day deadline begins immediately. Here is the exact checklist to complete:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-sm flex items-center justify-center">
                1
              </div>
              <h4 className="text-sm font-semibold text-white">Accept the Invitation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Log in to your IRCC account and accept the invitation within 60 days. This converts your profile into an electronic Application for Permanent Residence (e-APR).
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-sm flex items-center justify-center">
                2
              </div>
              <h4 className="text-sm font-semibold text-white">Police Clearance (PCC)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Order police certificates from every country where you have lived for 6 or more consecutive months since turning 18. Some countries (like the US FBI or India Passport Office) take several weeks.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-sm flex items-center justify-center">
                3
              </div>
              <h4 className="text-sm font-semibold text-white">Upfront Medical Exam</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Book an immigration medical examination with an approved IRCC Panel Physician. Obtain the Information Sheet / eMedical tracking printout to upload.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-sm flex items-center justify-center">
                4
              </div>
              <h4 className="text-sm font-semibold text-white">Proof of Funds &amp; Work Proof</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upload formal bank settlement letters showing 6 months of average balance, along with employer reference letters confirming job duties, salary, and hours.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <Link
            href="/crs-calculator"
            className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all group flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-mono text-cyan-400">CRS CALCULATOR</div>
              <div className="text-base font-bold text-white group-hover:text-cyan-300 mt-1">Calculate Your Personal Score</div>
              <p className="text-xs text-slate-400 mt-1">Benchmark your score against recent cutoffs in real-time.</p>
            </div>
            <svg className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/express-entry"
            className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-purple-500/50 hover:bg-slate-900/60 transition-all group flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-mono text-purple-400">CATEGORY SELECTION</div>
              <div className="text-base font-bold text-white group-hover:text-purple-300 mt-1">Explore Targeted Occupations</div>
              <p className="text-xs text-slate-400 mt-1">Check the list of designated NOC codes for STEM, Health &amp; Trades.</p>
            </div>
            <svg className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Educational FAQ Section with Smooth +/- Accordion */}
        <section className="pt-4">
          <AccordionFaq
            title="Express Entry Draws & CRS Score FAQ"
            subtitle="Understand CRS score fluctuations, category selections, and IRCC invitation timing."
            badge="EXPRESS ENTRY GUIDE"
            items={drawsFaqItems}
            includeSchema={true}
          />
        </section>

      </div>

      <Footer />

    </main>
  )
}

