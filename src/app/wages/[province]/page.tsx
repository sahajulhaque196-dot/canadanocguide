import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import HeaderNav from '@/components/home/HeaderNav'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Footer from '@/components/home/Footer'
import allNocs from '@/data/allNocsDetail.json'
import type { NocRecord } from '@/types/noc'
import ProvinceWageTable from '@/components/wages/ProvinceWageTable'
import AccordionFaq from '@/components/ui/AccordionFaq'
import { PROVINCE_WAGE_BENCHMARKS } from '@/data/wageBenchmarks'

interface PageProps {
  params: Promise<{ province: string }>
}

interface ProvinceConfig {
  slug: string
  code: string
  name: string
  majorCities: string
  minWage: string
  provMedianBenchmark: string
  pnpProgram?: string
  pnpStream?: string
  pnpInsight?: string
}

const PROVINCES: ProvinceConfig[] = [
  {
    slug: 'ontario',
    code: 'ON',
    name: 'Ontario',
    majorCities: 'Toronto, Ottawa, Mississauga, Hamilton, Waterloo',
    minWage: '$17.20/hr',
    provMedianBenchmark: '$28.50/hr',
    pnpProgram: 'OINP (Ontario Immigrant Nominee Program)',
    pnpStream: 'Human Capital Priorities & Employer Job Offer',
    pnpInsight: 'The Greater Toronto Area (GTA) has high wage expectations. OINP Employer Job Offer streams require matching or exceeding the prevailing median wage in the specific economic region.',
  },
  {
    slug: 'british-columbia',
    code: 'BC',
    name: 'British Columbia',
    majorCities: 'Vancouver, Victoria, Surrey, Burnaby, Kelowna',
    minWage: '$17.40/hr',
    provMedianBenchmark: '$29.00/hr',
    pnpProgram: 'BC PNP (British Columbia Provincial Nominee Program)',
    pnpStream: 'Skills Immigration & BC Tech Stream',
    pnpInsight: 'BC PNP calculates points directly based on hourly wage offers. Wage offers outside Metro Vancouver receive regional bonus points under Skills Immigration.',
  },
  {
    slug: 'alberta',
    code: 'AB',
    name: 'Alberta',
    majorCities: 'Calgary, Edmonton, Red Deer, Lethbridge',
    minWage: '$15.00/hr',
    provMedianBenchmark: '$30.00/hr',
    pnpProgram: 'AAIP (Alberta Advantage Immigration Program)',
    pnpStream: 'Accelerated Tech & Alberta Opportunity Stream',
    pnpInsight: 'Alberta has no provincial general sales tax and features the highest median wages among the large provinces, particularly for engineering, trades, and energy professionals.',
  },
  {
    slug: 'quebec',
    code: 'QC',
    name: 'Quebec',
    majorCities: 'Montreal, Quebec City, Laval, Gatineau',
    minWage: '$15.75/hr',
    provMedianBenchmark: '$27.50/hr',
    pnpProgram: 'PSTQ / PEQ (Programme de l\'expérience québécoise)',
    pnpStream: 'Skilled Worker & French Proficiency Pathways',
    pnpInsight: 'Quebec selects candidates under its own independent immigration matrix. Intermediate-advanced French (Level 7 échelle québécoise) is mandatory for almost all economic PR streams.',
  },
  {
    slug: 'manitoba',
    code: 'MB',
    name: 'Manitoba',
    majorCities: 'Winnipeg, Brandon, Steinbach',
    minWage: '$15.80/hr',
    provMedianBenchmark: '$25.00/hr',
    pnpProgram: 'MPNP (Manitoba Provincial Nominee Program)',
    pnpStream: 'Skilled Worker in Manitoba & In-Demand Occupations',
    pnpInsight: 'MPNP is one of Canada\'s most active immigration programs, rewarding candidates who have completed 6 months of local employment on a valid work permit.',
  },
  {
    slug: 'saskatchewan',
    code: 'SK',
    name: 'Saskatchewan',
    majorCities: 'Saskatoon, Regina, Prince Albert',
    minWage: '$15.00/hr',
    provMedianBenchmark: '$26.50/hr',
    pnpProgram: 'SINP (Saskatchewan Immigrant Nominee Program)',
    pnpStream: 'International Skilled Worker: Occupations In-Demand',
    pnpInsight: 'SINP features dedicated pathways for occupations that do NOT require a job offer, provided your NOC code is on the province\'s in-demand list.',
  },
  {
    slug: 'nova-scotia',
    code: 'NS',
    name: 'Nova Scotia',
    majorCities: 'Halifax, Dartmouth, Sydney',
    minWage: '$15.20/hr',
    provMedianBenchmark: '$24.00/hr',
    pnpProgram: 'NSNP (Nova Scotia Nominee Program) & AIP',
    pnpStream: 'Labour Market Priorities & Skilled Worker',
    pnpInsight: 'Atlantic Immigration Program (AIP) and NSNP offer lower CRS barriers for healthcare and skilled trades workers who secure permanent full-time employment.',
  },
  {
    slug: 'new-brunswick',
    code: 'NB',
    name: 'New Brunswick',
    majorCities: 'Moncton, Saint John, Fredericton',
    minWage: '$15.30/hr',
    provMedianBenchmark: '$23.50/hr',
    pnpProgram: 'NBPNP (New Brunswick Provincial Nominee Program)',
    pnpStream: 'Skilled Worker & Strategic Initiative for Francophones',
    pnpInsight: 'As Canada\'s only officially bilingual province, New Brunswick offers prioritized immigration processing and lower score cutoffs for French and bilingual candidates.',
  },
  {
    slug: 'newfoundland',
    code: 'NL',
    name: 'Newfoundland and Labrador',
    majorCities: 'St. John’s, Mount Pearl, Corner Brook',
    minWage: '$15.60/hr',
    provMedianBenchmark: '$25.50/hr',
    pnpProgram: 'NLPNP & Priority Skills NL',
    pnpStream: 'Skilled Worker & Technology Pathways',
    pnpInsight: 'Priority Skills NL invites tech and medical specialists with master’s or PhD credentials and at least one year of work experience without requiring a job offer.',
  },
  {
    slug: 'prince-edward-island',
    code: 'PEI',
    name: 'Prince Edward Island',
    majorCities: 'Charlottetown, Summerside',
    minWage: '$16.00/hr',
    provMedianBenchmark: '$23.00/hr',
    pnpProgram: 'PEI PNP',
    pnpStream: 'Labour Impact & Critical Worker',
    pnpInsight: 'PEI conducts regular monthly invitation draws targeting food processing, healthcare, construction, and tourism occupations with lower prevailing wage thresholds.',
  },
  {
    slug: 'yukon',
    code: 'YK',
    name: 'Yukon',
    majorCities: 'Whitehorse, Dawson City, Watson Lake',
    minWage: '$17.59/hr',
    provMedianBenchmark: '$36.00/hr',
    pnpProgram: 'YNP (Yukon Nominee Program)',
    pnpStream: 'Critical Impact Worker & Skilled Worker',
    pnpInsight: 'Yukon pays among the highest median hourly wages in North America to offset the northern cost of living. Employers frequently sponsor foreign workers with expedited processing.',
  },
  {
    slug: 'northwest-territories',
    code: 'NWT',
    name: 'Northwest Territories',
    majorCities: 'Yellowknife, Inuvik, Hay River',
    minWage: '$16.70/hr',
    provMedianBenchmark: '$41.00/hr',
    pnpProgram: 'NTNP (Northwest Territories Nominee Program)',
    pnpStream: 'Critical Impact Worker & Skilled Worker',
    pnpInsight: 'NWT offers substantial northern allowances and wages exceeding $40/hr for skilled trades, mining, and healthcare professionals.',
  },
  {
    slug: 'nunavut',
    code: 'NU',
    name: 'Nunavut',
    majorCities: 'Iqaluit, Rankin Inlet, Arviat',
    minWage: '$19.00/hr',
    provMedianBenchmark: '$45.00/hr',
    pnpProgram: 'Nunavut Labour Market',
    pnpStream: 'Direct Employer Sponsorship & Public Service',
    pnpInsight: 'Nunavut has the highest statutory minimum wage ($19.00/hr) in Canada, with isolated-post allowances and high demand for educators and healthcare professionals.',
  },
]

export async function generateStaticParams() {
  return PROVINCES.map((p) => ({
    province: p.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { province: slug } = await params
  const prov = PROVINCES.find((p) => p.slug === slug || p.code.toLowerCase() === slug)

  if (!prov) {
    return { title: 'Province Not Found | CanadaNOCGuide' }
  }

  const title = `${prov.name} Wage Rates & LMIA Pay Table (2026)`
  const description = `Official 2025/2026 ESDC Job Bank wage table for ${prov.name}. Check low, median, and high wages across all occupations and LMIA prevailing wage requirements.`
  const canonicalUrl = `https://canadanocguide.com/wages/${prov.slug}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
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
          alt: `${prov.name} Wage Rates & LMIA Pay Table`,
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

export default async function ProvinceWagePage({ params }: PageProps) {
  const { province: slug } = await params
  const prov = PROVINCES.find((p) => p.slug === slug || p.code.toLowerCase() === slug)

  if (!prov) {
    notFound()
  }

  // Get occupations that have wage data for this province
  const nocList = Object.values(allNocs as Record<string, NocRecord>).map((noc) => {
    const provWage = noc.wages.provinces[prov.code] || noc.wages.national || null
    return {
      code: noc.code,
      title: noc.title,
      teer: noc.teer,
      category: noc.priorityCategory,
      low: provWage?.low || '—',
      median: provWage?.median || 'N/A',
      high: provWage?.high || '—',
    }
  })

  // Calculate ESDC High-Wage stream threshold (+20% rule)
  const medianNum = parseFloat(prov.provMedianBenchmark.replace(/[^0-9.]/g, '')) || 30.0
  const highWageThreshold = `$${(medianNum * 1.2).toFixed(2)}/hr`

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
      {
        '@type': 'ListItem',
        position: 3,
        name: `${prov.name} Wage Rates`,
        item: `https://canadanocguide.com/wages/${prov.slug}`,
      },
    ],
  }

  return (
    <main className="min-h-screen bg-transparent text-slate-100 selection:bg-cyan-500 selection:text-black">
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
            { label: 'Canada Wages & LMIA', href: '/wages' },
            { label: `${prov.name} Wage Rates` }
          ]}
        />

        {/* Hero Section */}
        <div className="relative rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-10 backdrop-blur-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              <span>🇨🇦</span>
              <span>ESDC Job Bank 2025/2026 Dataset</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {prov.name} Wage Rates &amp; LMIA Benchmarks
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              Official Canadian government wage statistics for <strong className="text-white">{prov.name}</strong> ({prov.majorCities}). Check prevailing median wages required for LMIA work permit approval and job offers.
            </p>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">General Minimum Wage</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-white mt-0.5 block">
                  {prov.minWage}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Provincial Median</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-0.5 block">
                  {prov.provMedianBenchmark}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-500/30 bg-cyan-950/20">
                <span className="text-[11px] font-mono text-cyan-400 block uppercase">High-Wage Stream (+20%)</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-300 mt-0.5 block">
                  {highWageThreshold}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Total Occupations</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-slate-200 mt-0.5 block">
                  516 Occupations
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Provincial PNP Pathways & Strategic Intelligence Section */}
        {prov.pnpProgram && (
          <section className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-mono uppercase mb-1">
                  Provincial Nominee Program (PNP)
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {prov.pnpProgram}
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Primary Stream: <strong className="text-slate-200">{prov.pnpStream}</strong>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {prov.pnpInsight}
            </p>
          </section>
        )}

        {/* LMIA Compliance Guide Box */}
        <section className="p-6 sm:p-8 rounded-2xl border border-cyan-500/20 bg-cyan-950/15">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              <h2 className="text-base font-bold text-cyan-300">
                How the LMIA Prevailing Wage Works in {prov.name}
              </h2>
              <p className="leading-relaxed">
                When a Canadian employer applies for a Labour Market Impact Assessment (LMIA) in {prov.name}, they must offer you an hourly wage that is at least equal to the <strong className="text-white">median wage</strong> for your specific NOC code.
              </p>
              <p className="leading-relaxed text-slate-400">
                Under ESDC rules, the High-Wage Stream threshold is calculated as the <strong className="text-white">Provincial Median Hourly Wage plus 20%</strong> ({prov.provMedianBenchmark} + 20% = <strong className="text-cyan-300">{highWageThreshold}</strong>). Any wage offer below this amount falls under the <strong>Low-Wage Stream</strong>, which is subject to employer hiring caps and refusal-to-process moratoriums in census metropolitan areas with 6%+ unemployment.
              </p>
            </div>
          </div>
        </section>

        {/* Top Paying In-Demand Occupations Benchmark Section */}
        {(() => {
          const benchmark = PROVINCE_WAGE_BENCHMARKS.find((b) => b.provCode === prov.code)
          if (!benchmark) return null
          return (
            <section className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase mb-1">
                    ESDC Labour Market Benchmark
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Top In-Demand Occupations in {prov.name}
                  </h2>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Median Wages &amp; Annual Earnings
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-xs font-mono uppercase tracking-wider">
                      <th className="pb-3 font-semibold">NOC Code</th>
                      <th className="pb-3 font-semibold">Occupation Title</th>
                      <th className="pb-3 font-semibold text-right">Median Hourly</th>
                      <th className="pb-3 font-semibold text-right">Annual Est.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {benchmark.topOccupations.map((occ) => (
                      <tr key={occ.noc} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 font-mono font-bold text-cyan-400">
                          <Link href={`/noc/${occ.noc}`} className="hover:underline">
                            NOC {occ.noc}
                          </Link>
                        </td>
                        <td className="py-3 text-slate-200 font-medium">
                          <Link href={`/noc/${occ.noc}`} className="hover:text-cyan-300">
                            {occ.title}
                          </Link>
                        </td>
                        <td className="py-3 font-mono text-emerald-400 font-bold text-right">
                          {occ.medianWage}
                        </td>
                        <td className="py-3 font-mono text-slate-300 text-right">
                          {occ.annualEst}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        })()}

        {/* Full Wage Table with Search, Filter & Pagination */}
        <ProvinceWageTable initialRows={nocList} provName={prov.name} />

        {/* Province Wage FAQ with Smooth +/- Accordion */}
        <section className="pt-4">
          <AccordionFaq
            title={`${prov.name} Wage & LMIA FAQ`}
            subtitle={`Frequently asked questions about minimum wages, median benchmarks, and LMIA approval in ${prov.name}.`}
            badge="PROVINCIAL BENCHMARKS"
            includeSchema={true}
            items={[
              {
                id: 'min-wage-rate',
                question: `What is the official minimum wage in ${prov.name}?`,
                answer: `As of 2026, the general minimum wage in ${prov.name} is ${prov.minWage}. All employers must pay at least this rate regardless of employment type.`,
                defaultOpen: true,
              },
              {
                id: 'high-wage-threshold',
                question: `What is the ESDC High-Wage stream threshold for ${prov.name}?`,
                answer: `The High-Wage stream threshold in ${prov.name} is ${highWageThreshold} (${prov.provMedianBenchmark} provincial median + 20%). Wage offers at or above this amount qualify for standard LMIA processing without low-wage caps or metropolitan moratoriums.`,
                defaultOpen: false,
              },
              {
                id: 'regional-variations',
                question: `Do wages differ across cities in ${prov.name}?`,
                answer: `Yes. Major centres like ${prov.majorCities} command higher median salaries than rural areas. Employers filing an LMIA must offer a wage meeting or exceeding the specific economic region median for your NOC code.`,
                defaultOpen: false,
              },
              {
                id: 'pnp-wage-relevance',
                question: `How does prevailing wage impact ${prov.pnpProgram || 'PNP'} nomination?`,
                answer: `For ${prov.pnpProgram || `${prov.name} PNP`}, employer job offers must pay the prevailing regional wage. Under ${prov.pnpStream || 'provincial streams'}, higher wage offers often award additional points in provincial expression of interest matrices.`,
                defaultOpen: false,
              },
            ]}
          />
        </section>

        {/* Other Provinces Navigation */}
        <section className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
            Compare Wages in Other Provinces
          </span>
          <div className="flex flex-wrap gap-2">
            {PROVINCES.map((p) => (
              <Link
                key={p.slug}
                href={`/wages/${p.slug}`}
                className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                  p.slug === prov.slug
                    ? 'border-cyan-500 bg-cyan-950/30 text-cyan-300 font-bold'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {p.name}
              </Link>
            ))}
          </div>
        </section>

      </div>

      <Footer />

    </main>
  )
}
