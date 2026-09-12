import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import HeaderNav from '@/components/home/HeaderNav'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import AccordionFaq from '@/components/ui/AccordionFaq'
import ImmigrationDisclaimer from '@/components/ui/ImmigrationDisclaimer'
import Footer from '@/components/home/Footer'

import allNocs from '@/data/allNocsDetail.json'
import eeDraws from '@/data/eeDraws.json'
import { CATEGORIES } from '@/data/categoryData'
import type { NocRecord, EEDrawItem } from '@/types/noc'
import CategoryNocTable from '@/components/category/CategoryNocTable'
import { getAlternates } from '@/lib/seo'

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.id,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params
  const cat = CATEGORIES.find((c) => c.id === slug || c.slugs.includes(slug))

  if (!cat) {
    return { title: 'Category Not Found | CanadaNOCGuide' }
  }

  // Find latest real CRS from draws data
  const matchingDraw = (eeDraws as EEDrawItem[]).find((d) => {
    const nameLower = d.name.toLowerCase()
    if (cat.id === 'stem') return nameLower.includes('stem')
    if (cat.id === 'healthcare') return nameLower.includes('health')
    if (cat.id === 'trades') return nameLower.includes('trade')
    if (cat.id === 'transport') return nameLower.includes('transport')
    if (cat.id === 'agriculture') return nameLower.includes('agri')
    if (cat.id === 'french') return nameLower.includes('french')
    return false
  })
  const latestCrs = matchingDraw?.crs || 480

  const title = `Express Entry ${cat.shortLabel} Draws (2026): NOCs & Cutoffs`
  const description = `Check official Express Entry ${cat.shortLabel} category requirements, latest CRS cutoffs (${latestCrs}), eligible NOC codes, and immigration pathways.`
  const canonicalUrl = `https://canadanocguide.com/express-entry/${cat.id}`

  return {
    title,
    description,
    alternates: getAlternates(`/express-entry/${cat.id}`),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'CanadaNOCGuide',
      locale: 'en_CA',
      type: 'website',
      images: [
        {
          url: '/pr-card-3d.jpg',
          width: 1200,
          height: 630,
          alt: `Express Entry ${cat.title} Draws Guide`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/pr-card-3d.jpg'],
    },
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params
  const cat = CATEGORIES.find((c) => c.id === slug || c.slugs.includes(slug))

  if (!cat) {
    notFound()
  }

  // Filter eligible NOCs strictly enforcing TEER 0-3 (Express Entry statutory requirement)
  const eligibleNocs = Object.values(allNocs as Record<string, NocRecord>).filter((noc) => {
    if (cat.id === 'french') {
      return noc.teer >= 0 && noc.teer <= 3 // All TEER 0-3 eligible for French
    }
    return (
      noc.priorityCategory === cat.filterKey &&
      noc.teer >= 0 &&
      noc.teer <= 3 &&
      noc.isEEEligible !== false
    )
  })

  // Filter related draws from eeDraws.json
  const relatedDraws = (eeDraws as EEDrawItem[]).filter((d) => {
    const nameLower = d.name.toLowerCase()
    if (cat.id === 'stem') return nameLower.includes('stem')
    if (cat.id === 'healthcare') return nameLower.includes('health') || nameLower.includes('physician')
    if (cat.id === 'trades') return nameLower.includes('trade')
    if (cat.id === 'transport') return nameLower.includes('transport')
    if (cat.id === 'agriculture') return nameLower.includes('agri')
    if (cat.id === 'french') return nameLower.includes('french')
    return false
  }).slice(0, 10)

  // Find effective CRS from draws
  const matchingDraw = (eeDraws as EEDrawItem[]).find((d) => {
    const nameLower = d.name.toLowerCase()
    if (cat.id === 'stem') return nameLower.includes('stem')
    if (cat.id === 'healthcare') return nameLower.includes('health')
    if (cat.id === 'trades') return nameLower.includes('trade')
    if (cat.id === 'transport') return nameLower.includes('transport')
    if (cat.id === 'agriculture') return nameLower.includes('agri')
    if (cat.id === 'french') return nameLower.includes('french')
    return false
  })
  const fallbackCrs: Record<string, number> = {
    stem: 491,
    healthcare: 475,
    trades: 477,
    transport: 470,
    agriculture: 437,
    french: 382,
  }
  const effectiveCrs = matchingDraw?.crs || fallbackCrs[cat.id] || 450

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
        name: 'Express Entry Categories',
        item: 'https://canadanocguide.com/express-entry',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: cat.title,
        item: `https://canadanocguide.com/express-entry/${cat.id}`,
      },
    ],
  }

  const schemaListItems = eligibleNocs.slice(0, 50)
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Eligible Occupations for Express Entry ${cat.shortLabel} Category`,
    description: `Official NOC 2021 occupations eligible for Canada Express Entry ${cat.title} rounds.`,
    numberOfItems: eligibleNocs.length,
    itemListElement: schemaListItems.map((noc, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: `${noc.code} - ${noc.title}`,
      url: `https://canadanocguide.com/noc/${noc.code}`,
    })),
  }

  const faqList = cat.faqs.map((f, idx) => ({
    id: `cat-faq-${idx}`,
    question: f.question,
    answer: f.answer,
    defaultOpen: idx === 0,
  }))

  return (
    <main className="min-h-screen bg-transparent text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <HeaderNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 space-y-12">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Express Entry Categories', href: '/express-entry' },
            { label: cat.shortLabel },
          ]}
        />

        {/* Educational disclaimer — required for immigration-niche AdSense compliance */}
        <ImmigrationDisclaimer />

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-10 backdrop-blur-xl">
          <div
            className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: cat.color }}
          />

          <div className="relative space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-3xl">{cat.icon}</span>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-800/80 text-xs font-mono uppercase tracking-wider text-slate-200">
                Target Category Stream &bull; Canada Immigration 2026
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Express Entry {cat.shortLabel} Category: Eligible NOCs &amp; Cutoffs (2026)
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                {cat.description}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Latest Draw Cutoff</span>
                <span className="text-xl font-bold font-mono text-emerald-400 mt-0.5 block">
                  CRS {effectiveCrs}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Eligible Occupations</span>
                <span className="text-xl font-bold font-mono text-cyan-400 mt-0.5 block">
                  {cat.id === 'french' ? 'All TEER 0–3' : `${eligibleNocs.length} NOCs`}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">
                  {cat.id === 'french' ? 'Language Standard' : 'Experience Required'}
                </span>
                <span className="text-xl font-bold font-mono text-amber-400 mt-0.5 block">
                  {cat.id === 'french' ? 'NCLC 7 in 4 Skills' : '6 Mos. in 3 Yrs'}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Programs Covered</span>
                <span className="text-xl font-bold font-mono text-purple-400 mt-0.5 block">
                  FSW &bull; CEC &bull; FST
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: Criteria & Licensing Fact-Check */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8 space-y-4 backdrop-blur-xl">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Official Criteria</div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              How to Qualify for {cat.shortLabel} Category Draws
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              {cat.criteria.map((c, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-cyan-400 font-bold mt-0.5">✓</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8 space-y-4 backdrop-blur-xl">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Licensing Fact-Check</div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {cat.licensingReality.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {cat.licensingReality.summary}
            </p>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-1">
              <strong className="text-white block">Key Takeaway for International Applicants:</strong>
              <span className="text-slate-300">{cat.licensingReality.takeaway}</span>
            </div>
          </div>
        </section>

        {/* SECTION 2: STREAM-SPECIFIC DEEP DIVE (Zero Boilerplate) */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-10 space-y-6 backdrop-blur-xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              {cat.deepDive.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {cat.deepDive.title}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {cat.deepDive.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {cat.deepDive.points.map((point, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-400 block">Insight 0{idx + 1}</span>
                <h3 className="text-sm font-bold text-white">{point.label}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Strategy Playbook */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8 space-y-4 backdrop-blur-xl">
          <div className="text-xs font-mono text-purple-400 uppercase tracking-wider">FastPass Strategy</div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Top 3 Application Strategies for {cat.shortLabel}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cat.strategyTips.map((tip, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <span className="w-6 h-6 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold font-mono flex items-center justify-center">
                  0{idx + 1}
                </span>
                <h3 className="text-xs font-bold text-white">{tip.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Eligible NOCs Table */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                All Eligible Occupations ({eligibleNocs.length})
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Search by NOC code or job title to check duties, wage benchmarks, and TEER levels.
              </p>
            </div>
          </div>

          <CategoryNocTable
            nocs={eligibleNocs.map((item) => ({
              code: item.code,
              title: item.title,
              teer: item.teer,
              medianWage: item.wages.national?.median || item.wages.provinces['ON']?.median || 'Varies by province',
            }))}
            categoryTitle={cat.title}
          />
        </section>

        {/* Recent Category Draws Table */}
        {relatedDraws.length > 0 && (
          <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Recent Draw History for This Category
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Historical cutoff scores and invitations issued for this stream.</p>
              </div>
              <Link href="/express-entry-draws" className="text-xs font-mono text-cyan-400 hover:underline">
                View All Draws →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs font-mono uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Draw #</th>
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold text-right">Invitations</th>
                    <th className="pb-3 font-semibold text-right">Cutoff Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {relatedDraws.map((d) => (
                    <tr key={d.number} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 font-mono font-bold text-cyan-400">
                        #{d.number}
                        {d.name.toLowerCase().includes('physician') && (
                          <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-sans font-normal border border-amber-500/30">
                            Physicians
                          </span>
                        )}
                      </td>
                      <td className="py-3 font-mono text-xs text-slate-300">{d.date}</td>
                      <td className="py-3 font-mono text-slate-300 text-right">{d.size}</td>
                      <td className="py-3 font-mono font-bold text-emerald-400 text-right">CRS {d.crs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Action Pathways & Strategic Interlinks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/crs-calculator"
            className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all group flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="text-xs font-mono text-cyan-400">CRS CALCULATOR</div>
              <div className="text-base font-bold text-white group-hover:text-cyan-300 mt-1">Calculate Your Points</div>
              <p className="text-xs text-slate-400 mt-1">See how close you are to the {cat.shortLabel} cutoff ({effectiveCrs}).</p>
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
              <div className="text-base font-bold text-white group-hover:text-emerald-300 mt-1">All {cat.shortLabel} Draws</div>
              <p className="text-xs text-slate-400 mt-1">Review invitation sizes and historical cutoff drops since 2023.</p>
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
              <div className="text-base font-bold text-white group-hover:text-amber-300 mt-1">Compare LMIA Wages</div>
              <p className="text-xs text-slate-400 mt-1">Check prevailing wage medians across Ontario, BC, and Alberta.</p>
            </div>
            <span className="text-xs font-mono text-amber-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Check Salaries →
            </span>
          </Link>

          <Link
            href="/express-entry"
            className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-purple-500/50 hover:bg-slate-900/60 transition-all group flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="text-xs font-mono text-purple-400">ALL 6 STREAMS</div>
              <div className="text-base font-bold text-white group-hover:text-purple-300 mt-1">Compare Categories</div>
              <p className="text-xs text-slate-400 mt-1">Explore Healthcare, Trades, STEM, Transport &amp; French streams.</p>
            </div>
            <span className="text-xs font-mono text-purple-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Compare Streams →
            </span>
          </Link>
        </div>

        {/* Smooth +/- Accordion FAQ Section */}
        <section className="pt-4">
          <AccordionFaq
            title={`${cat.shortLabel} Category FAQ`}
            subtitle="Common questions about eligibility, foreign experience, licensing, and draw cutoffs."
            badge="CATEGORY IMMIGRATION FAQ"
            items={faqList}
            includeSchema={true}
          />
        </section>

      </div>

      <Footer />

    </main>
  )
}
