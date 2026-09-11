import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import HeaderNav from '@/components/home/HeaderNav'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import NocDirectoryTable from '@/components/noc/NocDirectoryTable'
import AccordionFaq from '@/components/ui/AccordionFaq'
import Footer from '@/components/home/Footer'
import searchIndexData from '@/data/searchIndex.json'
import { getAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Canada NOC Directory: Search All 516 Occupations & TEER (2026)',
  description:
    'Search all 516 Canadian NOC 2021 codes. Verify TEER categories, Express Entry eligibility, Job Bank wages, and official job duties in one directory.',
  alternates: getAlternates('/noc'),
  openGraph: {
    title: 'Canada NOC Directory: Search All 516 Occupations & TEER (2026)',
    description: 'Search the complete directory of all 516 Canadian National Occupational Classification codes with our fast NOC code finder.',
    url: 'https://canadanocguide.com/noc',
    siteName: 'CanadaNOCGuide',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/pr-card-3d.jpg',
        width: 1200,
        height: 630,
        alt: 'Canada NOC Code Finder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canada NOC Directory: Search All 516 Occupations & TEER (2026)',
    description: 'Search the complete directory of all 516 Canadian National Occupational Classification codes with our fast NOC code finder.',
    images: ['/pr-card-3d.jpg'],
  },
}

export default function NocDirectoryPage() {
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
        name: 'NOC Directory',
        item: 'https://canadanocguide.com/noc',
      },
    ],
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': 'https://canadanocguide.com/noc#howto',
    name: 'How to Find Your Right NOC Code in 3 Steps',
    description:
      'Official guidelines for identifying and matching your occupation code under the Canadian National Occupational Classification (NOC 2021) system for Express Entry and PNP applications.',
    totalTime: 'PT5M',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Focus on Duties, Not Job Titles',
        text: 'Search by the keywords of your actual day-to-day responsibilities rather than your employer’s internal title.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Apply the 60% Duties Rule',
        text: 'Ensure your work reference letter shows you perform the lead statement and at least 60% to 70% of the official main duties.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Verify Education & TEER Level',
        text: 'Review the employment requirements to confirm your post-secondary credential meets the minimum TEER education standard.',
      },
    ],
  }

  const nocFaqItems = [
    {
      id: 'what-is-noc',
      question: 'What is a NOC code and why does it matter for Canada PR?',
      answer:
        'The National Occupational Classification (NOC) is Canada’s official system for classifying jobs. Every job in Canada has a 5-digit code that defines its required education, daily duties, and TEER level. Your NOC code determines whether you qualify for Express Entry, Provincial Nominee Programs (PNP), and targeted category draws.',
      defaultOpen: true,
    },
    {
      id: 'duty-matching-rule',
      question: 'Do my company job duties have to match the NOC code 100%?',
      answer:
        'No. Under IRCC guidelines, you do not need a 100% word-for-word match. Immigration officers check that your actual day-to-day responsibilities on your employment reference letter match the "Lead Statement" and at least 60% to 70% of the listed "Main Duties" of that NOC code.',
      defaultOpen: false,
    },
    {
      id: 'copy-paste-warning',
      question: 'Can I copy and paste the official NOC duties into my employer reference letter?',
      answer:
        'Never copy-paste official NOC duties into your work reference letter. Visa officers use automated text-comparison tools. If your reference letter matches the government website word-for-word, the officer will suspect a fraudulent letter and issue a Procedural Fairness Letter (PFL) or refuse your application for misrepresentation.',
      defaultOpen: false,
    },
    {
      id: 'teer-difference',
      question: 'Which TEER categories qualify for Express Entry?',
      answer:
        'TEER 0 (Management), TEER 1 (Professional/Degree), TEER 2 (Technical/2-3 yr Diploma), and TEER 3 (Intermediate/Apprenticeship or College) qualify for Express Entry programs (FSWP and CEC). Jobs in TEER 4 and TEER 5 do not qualify for Express Entry, but are widely eligible for Provincial Nominee Programs (PNP) and the Atlantic Immigration Program (AIP).',
      defaultOpen: false,
    },
    {
      id: 'job-title-matching',
      question: 'What if my employer job title is completely different from the NOC title?',
      answer:
        'Your official company job title does not have to match the NOC title. For example, your company may call you a "Growth Hacker", but based on your daily responsibilities, your correct NOC code could be 11202 (Advertising, marketing and public relations specialists). Job duties always override job titles.',
      defaultOpen: false,
    },
    {
      id: 'change-noc-after-ita',
      question: 'Can I change my NOC code after receiving an Invitation to Apply (ITA)?',
      answer:
        'You can correct your NOC code before or at the time of submitting your post-ITA application, provided the corrected NOC code does not drop your CRS score below the cutoff of the draw in which you were invited, and you still meet the minimum eligibility requirements of that draw.',
      defaultOpen: false,
    },
    {
      id: 'cross-two-nocs',
      question: 'What should I do if my work experience covers two different NOC codes?',
      answer:
        'Choose the NOC code that covers the majority of your daily hours and primary responsibilities. Your primary NOC must account for at least 1 continuous year of full-time (or equivalent part-time) work within the last 10 years to meet the Federal Skilled Worker Program requirement.',
      defaultOpen: false,
    },
  ]

  return (
    <main className="relative min-h-screen bg-transparent text-slate-100 selection:bg-cyan-500 selection:text-black overflow-hidden">
      {/* Background Ambient Radial Glow Orbs */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute top-[450px] -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none -z-0" />
      <div className="absolute top-[900px] -right-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none -z-0" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Universal Navigation Bar */}
      <HeaderNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-20 space-y-12">
        
        {/* Breadcrumb Trail */}
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'NOC Directory' }]} />

        {/* Directory Header Card */}
        <div className="relative rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-10 backdrop-blur-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              <span>🇨🇦</span>
              <span>Official NOC 2021 Version 1.0 Dataset (516 Unit Groups)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Canada NOC Code Finder &amp; TEER Directory (2026)
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Find your exact 5-digit National Occupational Classification (NOC 2021) code. Filter by TEER level (0 to 5), check eligibility for Express Entry category-based draws, and explore official median wages across all Canadian provinces.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                All 516 Official Unit Groups
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                40,000+ Job Title Aliases
              </span>
              <span className="flex items-center gap-1.5 text-violet-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Target Category Badges
              </span>
            </div>
          </div>
        </div>

        {/* Directory Table */}
        <section>
          <NocDirectoryTable initialItems={searchIndexData.slice(0, 30)} />
        </section>

        {/* SECTION 1: How to Choose Your Correct NOC Code */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-10 space-y-8 backdrop-blur-xl">
          <div className="space-y-2">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Step-by-Step Guide</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              How to Find Your Right NOC Code in 3 Steps
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Choosing the wrong NOC code is the #1 reason immigration officers issue procedural fairness letters or reject permanent residence applications. Follow this simple rulebook:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400 text-sm">
                01
              </div>
              <h3 className="text-base font-semibold text-white">Focus on Duties, Not Job Titles</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Employers often give fancy or internal job titles. An immigration officer does not care what your company calls you. They look at what you actually did every day. Search by keywords of your daily tasks in our search box above.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center font-bold text-violet-400 text-sm">
                02
              </div>
              <h3 className="text-base font-semibold text-white">Apply the 60% Duties Rule</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Open the NOC detail page and read the &quot;Main Duties&quot; section. Your employment reference letter must show that you performed the lead statement and at least 60% to 70% of the listed responsibilities during your tenure.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 text-sm">
                03
              </div>
              <h3 className="text-base font-semibold text-white">Verify Education & TEER Level</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Check the &quot;Employment Requirements&quot; of the code. If a NOC 1 code mandates a university degree, but you only possess a 1-year high school certificate, IRCC may determine you do not meet the minimum entry requirements of that occupation.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Anatomy of the 5-Digit NOC 2021 Code */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-10 space-y-6 backdrop-blur-xl">
          <div className="space-y-2">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Understanding the 5-Digit Code</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Anatomy of a 5-Digit Canadian NOC Code
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              In 2022, Canada retired the old 4-digit NOC 2016 system and introduced 5-digit NOC 2021. Every single digit tells you specific details about the occupation:
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-cyan-500/20 bg-cyan-950/10 space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 py-4 border-b border-cyan-500/20">
              <div className="text-center">
                <div className="w-12 h-14 sm:w-14 sm:h-16 rounded-xl bg-cyan-500/20 border border-cyan-400 text-white font-mono text-2xl sm:text-3xl font-black flex items-center justify-center mx-auto">
                  2
                </div>
                <div className="text-[11px] font-mono text-cyan-300 mt-2">Digit 1</div>
                <div className="text-[10px] text-slate-400">Broad Category (Natural Sciences)</div>
              </div>

              <div className="text-xl text-slate-600 font-bold">+</div>

              <div className="text-center">
                <div className="w-12 h-14 sm:w-14 sm:h-16 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-mono text-2xl sm:text-3xl font-black flex items-center justify-center mx-auto">
                  1
                </div>
                <div className="text-[11px] font-mono text-emerald-300 mt-2">Digit 2</div>
                <div className="text-[10px] text-emerald-400 font-semibold">TEER Level (TEER 1: Degree)</div>
              </div>

              <div className="text-xl text-slate-600 font-bold">+</div>

              <div className="text-center">
                <div className="w-12 h-14 sm:w-14 sm:h-16 rounded-xl bg-violet-500/20 border border-violet-400 text-white font-mono text-2xl sm:text-3xl font-black flex items-center justify-center mx-auto">
                  2
                </div>
                <div className="text-[11px] font-mono text-violet-300 mt-2">Digit 3</div>
                <div className="text-[10px] text-slate-400">Major Group</div>
              </div>

              <div className="text-xl text-slate-600 font-bold">+</div>

              <div className="text-center">
                <div className="w-12 h-14 sm:w-14 sm:h-16 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-2xl sm:text-3xl font-black flex items-center justify-center mx-auto">
                  3
                </div>
                <div className="text-[11px] font-mono text-slate-300 mt-2">Digit 4</div>
                <div className="text-[10px] text-slate-400">Sub-Major Group</div>
              </div>

              <div className="text-xl text-slate-600 font-bold">+</div>

              <div className="text-center">
                <div className="w-12 h-14 sm:w-14 sm:h-16 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-2xl sm:text-3xl font-black flex items-center justify-center mx-auto">
                  2
                </div>
                <div className="text-[11px] font-mono text-slate-300 mt-2">Digit 5</div>
                <div className="text-[10px] text-slate-400">Unit Group</div>
              </div>
            </div>

            <p className="text-xs text-center text-slate-300 max-w-2xl mx-auto">
              <strong>Example:</strong> In NOC code{' '}
              <Link href="/noc/21232" className="text-cyan-400 font-bold hover:underline">
                21232
              </Link>{' '}
              (Software developers and programmers), the 2nd digit <strong className="text-emerald-400">&apos;1&apos;</strong> indicates <strong className="text-white">TEER 1</strong>, meaning university degree level education is the standard requirement.
            </p>
          </div>
        </section>

        {/* SECTION 3: Common NOC Mistakes to Avoid */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-10 space-y-8 backdrop-blur-xl">
          <div className="space-y-2">
            <div className="text-xs font-mono text-rose-400 uppercase tracking-wider">Critical Pitfalls</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Top 4 Mistakes Indian & International Applicants Make
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Avoiding these common errors will protect your application from delays, Procedural Fairness Letters (PFL), or 5-year bans for misrepresentation:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl border border-rose-500/20 bg-rose-950/10 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                1. Copy-Pasting Official Duties Verbatim
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                If your employer&apos;s reference letter uses the exact same sentences found on the official government website, visa officers will flag it as manufactured. Always write duties in your employer’s genuine business context.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-rose-500/20 bg-rose-950/10 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                2. Matching Only the Job Title
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Choosing a NOC code simply because its title matches your business card is a classic mistake. If your actual letters show duties of an assistant or junior coordinator, the officer will reject your points under that NOC.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-rose-500/20 bg-rose-950/10 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                3. Overlooking TEER 4 & 5 Pathways
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Many candidates assume that if their job is in TEER 4 or 5, they can never immigrate to Canada. That is untrue: numerous Provincial Nominee Program (PNP) streams and Atlantic programs specifically invite TEER 4 and 5 workers.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-rose-500/20 bg-rose-950/10 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                4. Forgetting the Continuous 1-Year Rule
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                For the Federal Skilled Worker Program (FSWP), your primary NOC must have at least 1 year of continuous, full-time (or 30 hrs/week equivalent) paid work experience. Piecing together different 3-month jobs in different NOCs does not qualify.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Quick Navigation to Other Core Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <Link
            href="/crs-calculator"
            className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all group"
          >
            <div className="text-xs font-mono text-cyan-400">POINTS TOOL</div>
            <div className="text-base font-bold text-white group-hover:text-cyan-300 mt-1">Calculate Your CRS Points</div>
            <p className="text-xs text-slate-400 mt-1">Check how your NOC and experience score in the 1,200 grid.</p>
          </Link>

          <Link
            href="/teer"
            className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-violet-500/50 hover:bg-slate-900/60 transition-all group"
          >
            <div className="text-xs font-mono text-violet-400">TEER MATRIX</div>
            <div className="text-base font-bold text-white group-hover:text-violet-300 mt-1">Explore TEER Levels 0 to 5</div>
            <p className="text-xs text-slate-400 mt-1">Compare education thresholds and immigration eligibility.</p>
          </Link>

          <Link
            href="/wages"
            className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-emerald-500/50 hover:bg-slate-900/60 transition-all group"
          >
            <div className="text-xs font-mono text-emerald-400">SALARY HUB</div>
            <div className="text-base font-bold text-white group-hover:text-emerald-300 mt-1">Check Canadian Median Wages</div>
            <p className="text-xs text-slate-400 mt-1">Provincial prevailing wages required for LMIA work permits.</p>
          </Link>
        </div>

        {/* NOC Directory FAQ Section with Smooth +/- Accordion */}
        <section className="pt-4">
          <AccordionFaq
            title="Canadian NOC & TEER System FAQ"
            subtitle="Clear answers on finding your occupation code, TEER level requirements, and immigration eligibility."
            badge="DIRECTORY GUIDE"
            items={nocFaqItems}
            includeSchema={true}
          />
        </section>

      </div>

      <Footer />

    </main>
  )
}

