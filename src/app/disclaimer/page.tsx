import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import HeaderNav from '@/components/home/HeaderNav'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import AccordionFaq from '@/components/ui/AccordionFaq'
import Footer from '@/components/home/Footer'
import { getAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Legal Disclaimer & Non-Consultancy Notice | CanadaNOCGuide',
  description:
    'Legal disclaimer for CanadaNOCGuide: Non-consultancy notice under Section 91 IRPA, Open Government Licence Canada attribution, and liability limitations.',
  alternates: getAlternates('/disclaimer'),
  openGraph: {
    title: 'Legal Disclaimer & Non-Consultancy Notice | CanadaNOCGuide',
    description: 'Statutory disclaimer under Section 91 IRPA and Open Government Licence data attribution.',
    url: 'https://canadanocguide.com/disclaimer',
    siteName: 'CanadaNOCGuide',
    locale: 'en_CA',
    type: 'website',
  },
}

const DISCLAIMER_FAQS = [
  {
    id: 'disclaimer-faq-1',
    question: 'Is CanadaNOCGuide affiliated with the Government of Canada or IRCC?',
    answer:
      'No. CanadaNOCGuide is an independent informational and research portal. We are not government officials, a law firm, or a licensed Regulated Canadian Immigration Consultant (RCIC). We structure public open data published under the Open Government Licence – Canada to make immigration research free, fast, and accessible.',
    defaultOpen: true,
  },
  {
    id: 'disclaimer-faq-2',
    question: 'Can CanadaNOCGuide guarantee my CRS score or visa approval?',
    answer:
      'No. All tools, CRS calculators, wage comparisons, and TEER guides are provided strictly for informational planning. Visa decisions, Invitation to Apply (ITA) issuances, and permanent residency approvals are at the sole legal discretion of Immigration, Refugees and Citizenship Canada (IRCC) visa officers.',
  },
  {
    id: 'disclaimer-faq-3',
    question: 'Where can I find authorized legal representation for my Canadian visa?',
    answer:
      'If you need legal advice, customized case reviews, or official representation, you should consult a licensed Regulated Canadian Immigration Consultant (RCIC) registered with the College of Immigration and Citizenship Consultants (CICC) or a lawyer who is a member in good standing of a provincial Canadian law society.',
  },
]

export default function DisclaimerPage() {
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
        name: 'Disclaimer',
        item: 'https://canadanocguide.com/disclaimer',
      },
    ],
  }

  return (
    <main className="min-h-screen bg-transparent text-slate-100 selection:bg-cyan-500 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HeaderNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 space-y-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Legal Disclaimer' }]} />

        {/* Page Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono uppercase tracking-wider">
            Legal Transparency
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-[var(--font-space)]">
            Legal Disclaimer &amp; Statutory Notice
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Effective Date: September 1, 2026 &bull; Strict Non-Consultancy Notice
          </p>
        </div>

        {/* Statutory Notice Card */}
        <section className="space-y-4 p-6 sm:p-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 backdrop-blur-sm">
          <h2 className="text-base sm:text-lg font-bold text-amber-300 flex items-center gap-2">
            <span>⚠️</span> Statutory Notice: Section 91 of Canada&apos;s IRPA
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong>CanadaNOCGuide (https://canadanocguide.com) is an independent educational and research portal.</strong> We are <strong>not</strong> immigration lawyers, licensed Regulated Canadian Immigration Consultants (RCICs), or government representatives.
          </p>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Under <strong>Section 91 of the Immigration and Refugee Protection Act (IRPA)</strong>, only members in good standing of a Canadian provincial law society or the College of Immigration and Citizenship Consultants (CICC) are legally authorized to represent or advise clients on Canadian visa applications for direct or indirect compensation. CanadaNOCGuide does not provide paid legal advice, profile representation, or individual case management.
          </p>
        </section>

        {/* Disclaimer Core Articles */}
        <div className="space-y-8 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-6">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Informational &amp; Educational Purpose Only</h2>
            <p>
              All information, tools, tables, CRS point simulations, and wage benchmarks provided on CanadaNOCGuide are intended solely for general informational, educational, and reference purposes. Nothing on this website constitutes legal, immigration, financial, or career advice.
            </p>
            <p className="text-xs text-slate-400">
              Immigration policies, Comprehensive Ranking System (CRS) draw cutoffs, provincial Labour Market Impact Assessment (LMIA) wage requirements, and Ministerial Instructions change frequently without advance warning. Always cross-verify information directly against official Canadian government resources (canada.ca and jobbank.gc.ca).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Open Government Data Licensing &amp; Attribution</h2>
            <p>
              Occupational structures, duty descriptions, education requirements, and prevailing wage distributions presented across our directory are parsed from public datasets published by the Government of Canada under the{' '}
              <a
                href="https://open.canada.ca/en/open-government-licence-canada"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                Open Government Licence – Canada ↗
              </a>
              :
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-400 pl-2">
              <li><strong>NOC 2021 Version 1.0:</strong> Statistics Canada and Employment and Social Development Canada (ESDC).</li>
              <li><strong>Regional Wage Surveys:</strong> ESDC Job Bank prevailing median wage benchmarks.</li>
              <li><strong>Express Entry Rounds:</strong> IRCC official Ministerial Instructions rounds of invitations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Limitation of Liability</h2>
            <p>
              CanadaNOCGuide, its creator, and contributors expressly disclaim any liability for actions taken or not taken based on the contents of this site. Under no circumstances shall CanadaNOCGuide be liable for:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-400 pl-2">
              <li>Visa refusals, delays, or procedural fairness letters (PFLs) from IRCC.</li>
              <li>Inaccurate self-assessments of CRS scores or educational credentials.</li>
              <li>Employment disputes or wage discrepancies with Canadian employers.</li>
              <li>Any direct, indirect, consequential, or punitive damages arising from the use of our guides.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. No Endorsement or Government Sponsorship</h2>
            <p>
              References to trademarks, provincial programs (e.g. OINP, BC PNP, AAIP), or government agencies (IRCC, ESDC, Statistics Canada) do not constitute endorsement, sponsorship, or affiliation by those bodies. CanadaNOCGuide operates independently as a digital open data project.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Reporting Discrepancies &amp; Corrections</h2>
            <p>
              We are committed to maintaining accurate, up-to-date data. If you notice an outdated wage benchmark, broken link, or duty typo, please report it via our{' '}
              <Link href="/contact" className="text-cyan-400 hover:underline">
                Contact &amp; Feedback page
              </Link>{' '}
              or email support@canadanocguide.com. Our editorial team commits to reviewing verified submissions within 48 hours.
            </p>
          </section>
        </div>

        {/* Disclaimer FAQ with Schema */}
        <section className="space-y-6 pt-4 border-t border-slate-800/80">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Legal Disclaimer FAQ
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Clear clarifications concerning legal advice boundaries and government data usage.
            </p>
          </div>

          <AccordionFaq items={DISCLAIMER_FAQS} includeSchema={true} />
        </section>
      </div>

      <Footer />
    </main>
  )
}
