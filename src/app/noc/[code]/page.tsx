import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import HeaderNav from '@/components/home/HeaderNav'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import DutiesChecker from '@/components/noc/DutiesChecker'
import AccordionFaq from '@/components/ui/AccordionFaq'
import Footer from '@/components/home/Footer'

// Import all NOC data
import allNocs from '@/data/allNocsDetail.json'

interface PageProps {
  params: Promise<{ code: string }>
}

interface NocRecord {
  code: string
  title: string
  teer: number
  broadCategory: string
  definition: string
  leadStatement: string
  mainDuties: string[]
  employmentRequirements: string[]
  exclusions: string[]
  jobTitles: string[]
  priorityCategory: string
  isEEEligible: boolean
  wages: {
    national: {
      low: string | null
      median: string
      high: string | null
      avg: string | null
      isAnnual: boolean
      benefitPct: string
    } | null
    provinces: Record<string, {
      low: string | null
      median: string
      high: string | null
      isAnnual: boolean
    }>
  }
}

// Generate Static Params for all 516 NOC codes at build time
export async function generateStaticParams() {
  return Object.keys(allNocs).map((code) => ({
    code,
  }))
}

// Dynamic SEO Metadata for Rank #1 Google Rankings
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params
  const noc = (allNocs as Record<string, NocRecord>)[code]

  if (!noc) {
    return {
      title: 'NOC Code Not Found | CanadaNOCGuide',
    }
  }

  const wageText = noc.wages.national?.median || noc.wages.provinces?.['ON']?.median || 'Prevailing rate'

  // High-CTR title preserving full official occupational title, code, TEER level, and intent
  const cleanTitle = `NOC ${noc.code} ${noc.title} (TEER ${noc.teer}): Duties & Wages (2026)`

  const description = `NOC ${noc.code} (${noc.title}): TEER ${noc.teer} Express Entry eligibility, duties checklist, and official 2026 Job Bank wages (${wageText}).`

  return {
    title: cleanTitle,
    description,
    alternates: {
      canonical: `https://canadanocguide.com/noc/${noc.code}`,
    },
    openGraph: {
      title: cleanTitle,
      description,
      url: `https://canadanocguide.com/noc/${noc.code}`,
      siteName: 'CanadaNOCGuide',
      locale: 'en_CA',
      type: 'website',
      images: [
        {
          url: '/pr-card-3d.jpg',
          width: 1200,
          height: 630,
          alt: `NOC ${noc.code}: ${noc.title} Guide`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanTitle,
      description,
      images: ['/pr-card-3d.jpg'],
    },
  }
}

export default async function NocDetailPage({ params }: PageProps) {
  const { code } = await params
  const noc = (allNocs as Record<string, NocRecord>)[code]

  if (!noc) {
    notFound()
  }

  const provNames: Record<string, string> = {
    ON: 'Ontario',
    BC: 'British Columbia',
    AB: 'Alberta',
    QC: 'Quebec',
    MB: 'Manitoba',
    SK: 'Saskatchewan',
    NS: 'Nova Scotia',
    NB: 'New Brunswick',
    NL: 'Newfoundland and Labrador',
    PEI: 'Prince Edward Island',
    YK: 'Yukon',
    YT: 'Yukon',
    NWT: 'Northwest Territories',
    NT: 'Northwest Territories',
    NU: 'Nunavut'
  }

  const provSlugs: Record<string, string> = {
    ON: 'ontario',
    BC: 'british-columbia',
    AB: 'alberta',
    QC: 'quebec',
    MB: 'manitoba',
    SK: 'saskatchewan',
    NS: 'nova-scotia',
    NB: 'new-brunswick',
    NL: 'newfoundland',
    PEI: 'prince-edward-island',
    YK: 'yukon',
    YT: 'yukon',
    NWT: 'northwest-territories',
    NT: 'northwest-territories',
    NU: 'nunavut'
  }

  // Parse numeric wage with safe provincial fallback instead of flat 35.00
  const firstProvMedian = Object.values(noc.wages.provinces || {}).find((p) => p?.median)?.median
  const rawWage = noc.wages.national?.median || noc.wages.provinces?.['ON']?.median || firstProvMedian || (noc.teer >= 4 ? '$18.50/hr' : '$32.00/hr')
  const numericWage = parseFloat(rawWage.replace(/[^0-9.]/g, '')) || (noc.teer >= 4 ? 18.5 : 32.0)
  const isAnnual = rawWage.includes('/yr') || numericWage > 1000

  // 1. Occupation Schema with safe property access and country location
  const occupationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Occupation',
    name: noc.title,
    occupationalCategory: `NOC ${noc.code}`,
    description: noc.leadStatement,
    responsibilities: (noc.mainDuties || []).slice(0, 5).join('; '),
    qualifications: (noc.employmentRequirements || []).slice(0, 3).join('; '),
    occupationLocation: {
      '@type': 'Country',
      name: 'Canada',
    },
    estimatedSalary: [
      {
        '@type': 'MonetaryAmountDistribution',
        name: 'Canada Median Wage',
        currency: 'CAD',
        median: numericWage,
        duration: isAnnual ? 'P1Y' : 'PT1H',
        unitText: isAnnual ? 'YEAR' : 'HOUR'
      }
    ]
  }

  // 2. BreadcrumbList Schema for Google Rich Snippet Results
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://canadanocguide.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'NOC Directory',
        item: 'https://canadanocguide.com/noc'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `TEER ${noc.teer}`,
        item: `https://canadanocguide.com/teer/${noc.teer}`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: `NOC ${noc.code}`,
        item: `https://canadanocguide.com/noc/${noc.code}`
      }
    ]
  }

  return (
    <main className="min-h-screen bg-transparent text-slate-100 selection:bg-cyan-500 selection:text-black">
      
      {/* Schema Injections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(occupationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Universal Navigation Bar */}
      <HeaderNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 space-y-10">
        
        {/* Breadcrumb Trail */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'NOC Directory', href: '/noc' },
            { label: `TEER ${noc.teer}`, href: `/teer/${noc.teer}` },
            { label: `NOC ${noc.code} - ${noc.title}` }
          ]}
        />

        {/* Master Header Card */}
        <div className="relative p-6 sm:p-10 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-900/60 backdrop-blur-xl shadow-2xl overflow-hidden">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-5">
            
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-lg bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-sm shadow-sm">
                NOC {noc.code}
              </span>

              <Link
                href={`/teer/${noc.teer}`}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 font-mono text-slate-200 hover:text-cyan-300 font-bold text-xs transition-colors"
              >
                TEER {noc.teer} ↗
              </Link>

              {noc.priorityCategory !== 'General Stream' && (
                <Link
                  href={
                    noc.priorityCategory.includes('STEM')
                      ? '/express-entry/stem'
                      : noc.priorityCategory.includes('Health')
                      ? '/express-entry/healthcare'
                      : noc.priorityCategory.includes('Trade')
                      ? '/express-entry/trades'
                      : noc.priorityCategory.includes('Transport')
                      ? '/express-entry/transport'
                      : noc.priorityCategory.includes('Agri')
                      ? '/express-entry/agriculture'
                      : '/express-entry'
                  }
                  className="px-3 py-1 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs transition-colors"
                >
                  ★ {noc.priorityCategory} ↗
                </Link>
              )}

              <Link
                href="/express-entry"
                className={`px-3 py-1 rounded-full text-xs font-semibold hover:opacity-90 transition-opacity ${
                  noc.isEEEligible
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}
              >
                {noc.isEEEligible ? '✓ Express Entry Eligible (FSW & CEC)' : '⚠ PNP & Work Permits Only'}
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-[var(--font-space)]">
              {noc.title}
            </h1>

            {/* Lead Statement */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-1 max-w-4xl">
              {noc.leadStatement}
            </p>

          </div>

          {/* Quick Metrics Grid (4 Columns matching homepage) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-800/80">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block uppercase">Median Pay</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-1 block">
                {noc.wages.national?.median || noc.wages.provinces['ON']?.median || 'Varies by Prov.'}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Prevailing median rate</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block uppercase">TEER Level</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 mt-1 block">
                Level {noc.teer}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">{noc.isEEEligible ? 'Express Entry pool' : 'PNP streams'}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block uppercase">Priority Stream</span>
              <span className="text-sm font-bold text-slate-200 mt-1 block truncate">
                {noc.priorityCategory}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Category draws</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block uppercase">Official Titles</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-slate-200 mt-1 block">
                {noc.jobTitles.length} Titles
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Government aliases</span>
            </div>
          </div>

        </div>

        {/* Section 2: Interactive Duties Checklist */}
        {noc.mainDuties && noc.mainDuties.length > 0 && (
          <section id="duties">
            <DutiesChecker duties={noc.mainDuties} code={noc.code} jobTitles={noc.jobTitles || []} />
          </section>
        )}

        {/* Section 2.5: Strategic Canadian Labour & Immigration Insights */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white font-[var(--font-space)]">
              Canadian Labour Market &amp; PR Pathways for NOC {noc.code}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Under Canada&apos;s National Occupational Classification (NOC 2021 Version 1.0), <strong className="text-white font-semibold">{noc.title}</strong> is categorized under <strong className="text-cyan-300">TEER {noc.teer}</strong>.
            {noc.teer <= 1
              ? ' Occupations in this tier typically require a university degree (bachelor’s, master’s, or doctorate) or substantial managerial tenure.'
              : noc.teer <= 3
              ? ' Occupations in this tier typically require completion of a 2- to 3-year post-secondary diploma, apprenticeship training, or specialized technical certifications.'
              : ' Occupations in this tier typically require secondary school graduation or job-specific on-the-job training.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-1.5">
              <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase">Express Entry Alignment</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {noc.isEEEligible
                  ? `Qualifies directly for the Federal Skilled Worker Program (FSW) and Canadian Experience Class (CEC). Work experience must be full-time (or equivalent part-time) and continuous for at least one year.`
                  : `Classified under TEER ${noc.teer}, meaning this occupation does not qualify for direct Express Entry general pools. Candidates should focus on employer-driven Provincial Nominee Programs (PNP) or federal pilot pathways.`}
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-1.5">
              <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase">Target Category Status</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {noc.priorityCategory !== 'General Stream'
                  ? `Designated under IRCC's ${noc.priorityCategory} category. Candidates with 6 months of qualifying Canadian or foreign experience in this NOC can receive Invitations to Apply (ITAs) at significantly lower CRS cutoff thresholds.`
                  : `Currently evaluated under standard General and CEC invitation rounds, or targeted through provincial in-demand lists such as Ontario (OINP), British Columbia (BC PNP), or Alberta (AAIP).`}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Provincial Wages Breakdown */}
        <section id="wages" className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-2">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase mb-1">
                Job Bank Open Data (2025/2026)
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Regional Wages Across Canada
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Legal Benchmark for LMIA
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
            Under Canadian immigration law, an employer hiring you under an LMIA must pay you at least the median wage listed below for your province.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs font-mono uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Province / Territory</th>
                  <th className="pb-3 font-semibold text-right">Low Wage</th>
                  <th className="pb-3 font-semibold text-right">Median Wage</th>
                  <th className="pb-3 font-semibold text-right">High Wage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {noc.wages.national && (
                  <tr className="bg-cyan-500/5 font-semibold">
                    <td className="py-3.5 text-cyan-300 font-mono">Canada (National Average)</td>
                    <td className="py-3.5 font-mono text-slate-400 text-right">{noc.wages.national.low || '—'}</td>
                    <td className="py-3.5 font-mono text-emerald-400 font-bold text-right">{noc.wages.national.median}</td>
                    <td className="py-3.5 font-mono text-slate-300 text-right">{noc.wages.national.high || '—'}</td>
                  </tr>
                )}
                {(() => {
                  const rendered = new Set<string>()
                  return Object.entries(noc.wages.provinces).map(([prov, w]) => {
                    const slug = provSlugs[prov] || prov.toLowerCase()
                    if (rendered.has(slug)) return null
                    rendered.add(slug)

                    return (
                      <tr key={prov} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 text-slate-300">
                          {provSlugs[prov] ? (
                            <Link href={`/wages/${provSlugs[prov]}`} className="text-cyan-400 hover:text-cyan-300 hover:underline">
                              {provNames[prov] || prov} →
                            </Link>
                          ) : (
                            provNames[prov] || prov
                          )}
                        </td>
                        <td className="py-3 font-mono text-slate-400 text-right">{w.low || '—'}</td>
                        <td className="py-3 font-mono text-emerald-400 font-bold text-right">{w.median}</td>
                        <td className="py-3 font-mono text-slate-300 text-right">{w.high || '—'}</td>
                      </tr>
                    )
                  })
                })()}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Employment Requirements */}
        {noc.employmentRequirements && noc.employmentRequirements.length > 0 && (
          <section id="requirements" className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Employment Requirements
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
              These are the education, training, and certification standards usually required by Canadian employers for this occupation:
            </p>
            <ul className="space-y-3">
              {noc.employmentRequirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Section 5: Official Job Titles (All Aliases) */}
        {noc.jobTitles && noc.jobTitles.length > 0 && (
          <section id="titles" className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Official Job Titles for NOC {noc.code}
              </h2>
              <span className="text-xs font-mono text-cyan-400">
                {noc.jobTitles.length} Titles Listed
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
              If your current job title matches any of these official examples, this NOC code is likely the right choice for your Express Entry reference letter:
            </p>
            <div className="flex flex-wrap gap-2 max-h-96 overflow-y-auto pr-2">
              {noc.jobTitles.map((title, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-300 hover:border-slate-700"
                >
                  {title}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Section 6: Exclusions & Sister NOCs with Active Links */}
        {noc.exclusions && noc.exclusions.length > 0 && (
          <section id="exclusions" className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Exclusions (Similar Jobs with Different Codes)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
              Check this list to make sure your actual job is not classified under one of these related codes:
            </p>
            <ul className="space-y-2.5">
              {noc.exclusions.map((ex, idx) => {
                const codeMatch = ex.match(/\b([0-9]{5})\b/)
                const sisterCode = codeMatch ? codeMatch[1] : null
                return (
                  <li
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <span>{ex}</span>
                    {sisterCode && (
                      <Link
                        href={`/noc/${sisterCode}`}
                        className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-mono font-bold hover:underline transition-colors self-start sm:self-auto"
                      >
                        <span>View NOC {sisterCode}</span>
                        <span>→</span>
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {/* Section 7: Frequently Asked Questions about NOC with Smooth +/- Accordion */}
        <section id="faq" className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl">
          <AccordionFaq
            title={`Frequently Asked Questions for NOC ${noc.code} (${noc.title})`}
            subtitle="Essential answers regarding Express Entry eligibility, LMIA prevailing wage compliance, and official reference letter rules."
            includeSchema={true}
            items={[
              {
                id: 'ee-eligibility',
                question: `Is NOC ${noc.code} eligible for Canada Express Entry?`,
                answer: noc.isEEEligible
                  ? `Yes. Because NOC ${noc.code} is classified as TEER ${noc.teer}, it qualifies for the Federal Skilled Worker Program (FSW) and Canadian Experience Class (CEC) under Express Entry.`
                  : `NOC ${noc.code} is in TEER ${noc.teer}, which is not directly eligible for standard Express Entry pools. However, you can apply through Provincial Nominee Program (PNP) semi-skilled streams or employer-sponsored work permits.`,
                defaultOpen: true,
              },
              {
                id: 'lmia-wage',
                question: `What wage must my employer pay me for NOC ${noc.code}?`,
                plainTextAnswer: `For an LMIA work permit, your employer must offer at least the median wage of ${rawWage} (or the prevailing median rate in your specific Canadian province of employment).`,
                answer: (
                  <span>
                    For an LMIA work permit, your employer must offer at least the median wage of{' '}
                    <strong className="text-emerald-400">{rawWage}</strong> (or the prevailing median rate in your specific Canadian province of employment).
                  </span>
                ),
                defaultOpen: false,
              },
              {
                id: 'duties-match',
                question: `How many duties must match for my immigration reference letter?`,
                answer: `Under Section 75(2) of the Immigration and Refugee Protection Regulations (IRPR), your employment reference letter must confirm you perform the actions in the lead statement and a substantial number (recommended at least 60%) of the official main duties listed above. You do not need to perform 100% of the duties.`,
                defaultOpen: false,
              },
              ...(noc.priorityCategory === 'Healthcare Priority'
                ? [
                    {
                      id: 'licensing-faq',
                      question: `Do I need a Canadian license before receiving an Express Entry ITA for NOC ${noc.code}?`,
                      answer: `No. You do not need a provincial medical or nursing license just to submit your Express Entry profile or receive an Invitation to Apply (ITA). However, you must complete foreign credential evaluation (ECA) and will need licensing after landing in Canada to practice clinically.`,
                      defaultOpen: false,
                    },
                  ]
                : noc.priorityCategory === 'STEM Priority'
                ? [
                    {
                      id: 'tech-licensing-faq',
                      question: `Do tech workers under NOC ${noc.code} require professional engineering (P.Eng) registration?`,
                      answer: `Generally no. While provincial associations (like PEO in Ontario or EGBC in British Columbia) protect the title 'Engineer', IRCC evaluates immigration eligibility based on your actual job duties and university degrees rather than provincial P.Eng licensure.`,
                      defaultOpen: false,
                    },
                  ]
                : noc.priorityCategory === 'Trade Occupations'
                ? [
                    {
                      id: 'trades-faq',
                      question: `Does NOC ${noc.code} qualify for the 50 CRS points Red Seal bonus?`,
                      answer: `Yes. If you obtain a provincial Certificate of Qualification or Red Seal endorsement in an eligible trade, you receive +50 points under the Comprehensive Ranking System (CRS) skill transferability matrix.`,
                      defaultOpen: false,
                    },
                  ]
                : noc.teer >= 4
                ? [
                    {
                      id: 'pnp-pathway-faq',
                      question: `What is the best PR pathway for NOC ${noc.code} since it is TEER ${noc.teer}?`,
                      answer: `Because TEER ${noc.teer} is not eligible for direct Express Entry, your best routes are employer-supported Provincial Nominee Program (PNP) semi-skilled streams (such as SINP in Saskatchewan, AAIP in Alberta, or MPNP in Manitoba) or federal pilot programs like the Agri-Food Pilot.`,
                      defaultOpen: false,
                    },
                  ]
                : []),
            ]}
          />
        </section>

        {/* Section 8: Core Tool Next Steps Conversion Card */}
        <section className="p-6 sm:p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/30 via-slate-900/60 to-blue-950/30 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
              Next Steps for NOC {noc.code}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Check Your Express Entry Score &amp; Latest Cutoffs
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Calculate your exact Comprehensive Ranking System (CRS) score for NOC {noc.code} and check recent draw cutoffs to see if you qualify for category-based selection.
            </p>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/crs-calculator"
              className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs shadow-md transition-colors"
            >
              Calculate CRS Score →
            </Link>
            <Link
              href="/express-entry-draws"
              className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white font-mono text-xs transition-colors"
            >
              View Draw Trends →
            </Link>
          </div>
        </section>
      </div>

      <Footer />

    </main>
  )
}
