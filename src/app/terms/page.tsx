import React from 'react'
import type { Metadata } from 'next'
import HeaderNav from '@/components/home/HeaderNav'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import AccordionFaq from '@/components/ui/AccordionFaq'
import Footer from '@/components/home/Footer'

export const metadata: Metadata = {
  title: 'Terms of Use & Legal Disclaimer | CanadaNOCGuide',
  description: 'Terms of Use, legal disclaimer under Section 91 IRPA, and Open Government Licence data attribution for CanadaNOCGuide.',
  alternates: {
    canonical: 'https://canadanocguide.com/terms',
  },
}

const TERMS_FAQS = [
  {
    id: 'terms-faq-1',
    question: 'Is CanadaNOCGuide an official Canadian government agency?',
    answer: 'No. CanadaNOCGuide is an independent educational portal and research tool. We are not affiliated with, endorsed by, or operated by Immigration, Refugees and Citizenship Canada (IRCC), Employment and Social Development Canada (ESDC), or Statistics Canada.',
    defaultOpen: true,
  },
  {
    id: 'terms-faq-2',
    question: 'Does using this site guarantee an Invitation to Apply (ITA) or visa approval?',
    answer: 'No. CRS scores, draw cutoffs, and wage thresholds are provided strictly for informational planning. Visa decisions, ITA issuances, and PR approvals are at the sole legal discretion of IRCC visa officers.',
  },
  {
    id: 'terms-faq-3',
    question: 'Can I copy the tables or content for my own immigration consultancy?',
    answer: 'Raw government occupational data is licensed under the Open Government Licence – Canada. However, our original editorial guides, custom visual layouts, comparative analyses, and software code are proprietary to CanadaNOCGuide and may not be republished or scraped without prior attribution.',
  },
]

export default function TermsPage() {
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
        name: 'Terms of Use',
        item: 'https://canadanocguide.com/terms',
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
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms of Use' }]} />

        {/* Page Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            Terms &amp; Disclaimers
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-[var(--font-space)]">
            Terms of Use &amp; Legal Notice
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Effective Date: September 1, 2026 &bull; Strict Non-Consultancy Notice
          </p>
        </div>

        {/* Prominent Legal Disclaimer Box */}
        <section className="space-y-3 p-6 sm:p-7 rounded-2xl border border-amber-500/30 bg-amber-500/5 backdrop-blur-sm">
          <h2 className="text-base font-bold text-amber-300 flex items-center gap-2">
            <span>⚠️</span> Statutory Notice: Section 91 of Canada&apos;s IRPA
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong>CanadaNOCGuide is an independent informational and research portal.</strong> We are <strong>not</strong> immigration lawyers, licensed Regulated Canadian Immigration Consultants (RCICs), or government representatives.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Under <strong>Section 91 of the Immigration and Refugee Protection Act (IRPA)</strong>, only members in good standing of a Canadian provincial law society or the College of Immigration and Citizenship Consultants (CICC) are legally authorized to represent or advise clients on Canadian visa applications for direct or indirect compensation. CanadaNOCGuide does not offer paid representation or individual case management.
          </p>
        </section>

        {/* Core Terms */}
        <div className="space-y-8 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-6">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing or using CanadaNOCGuide (https://canadanocguide.com), you acknowledge and agree to comply with these Terms of Use and all applicable laws and regulations. If you disagree with any part of these terms, your sole remedy is to discontinue use of this site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Open Government Data Attribution</h2>
            <p>
              Portions of the occupational structures, TEER categories, and median wage distributions presented on this site are derived from public datasets published by the Government of Canada under the{' '}
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
              <li><strong>NOC 2021 V1.0:</strong> Statistics Canada and Employment and Social Development Canada (ESDC).</li>
              <li><strong>Regional Wage Data:</strong> ESDC Job Bank annual prevailing wage survey benchmarks.</li>
              <li><strong>Express Entry Rounds:</strong> IRCC official Ministerial Instructions rounds of invitations.</li>
            </ul>
            <p className="text-xs text-slate-400">
              Government criteria, CRS draw categories, and provincial LMIA thresholds change frequently. Always verify the latest numbers on official government portals (canada.ca / jobbank.gc.ca).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Acceptable Use Policy</h2>
            <p>
              You agree to use CanadaNOCGuide solely for legitimate educational, career planning, and reference purposes. You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-400 pl-2">
              <li>Misrepresent CanadaNOCGuide as an official government agency or licensed legal representative.</li>
              <li>Use our tools or guides to facilitate fraudulent employment letters or deceptive visa submissions.</li>
              <li>Engage in aggressive automated scraping that degrades system availability for other public users.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Limitation of Liability</h2>
            <p>
              In no event shall CanadaNOCGuide, its author, or contributors be held liable for any direct, indirect, incidental, or consequential damages resulting from visa refusals, procedural fairness letters (PFLs), lost application fees, or career decisions arising from your use of this site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Governing Law</h2>
            <p>
              These Terms shall be interpreted in accordance with applicable consumer laws, respecting Canadian federal open data regulations and international digital fair use standards.
            </p>
          </section>
        </div>

        {/* Terms FAQ with Schema */}
        <section className="space-y-6 pt-4 border-t border-slate-800/80">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Legal &amp; Terms FAQ
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Frequently asked questions concerning site ownership, legal disclaimers, and fair data usage.
            </p>
          </div>

          <AccordionFaq items={TERMS_FAQS} includeSchema={true} />
        </section>
      </div>

      <Footer />
    </main>
  )
}
