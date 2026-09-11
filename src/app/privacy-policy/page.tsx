import React from 'react'
import type { Metadata } from 'next'
import HeaderNav from '@/components/home/HeaderNav'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import AccordionFaq from '@/components/ui/AccordionFaq'
import Footer from '@/components/home/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | CanadaNOCGuide',
  description: 'Privacy Policy for CanadaNOCGuide. Learn how we handle cookies, analytics, and user privacy in compliance with PIPEDA and GDPR.',
  alternates: {
    canonical: 'https://canadanocguide.com/privacy-policy',
  },
}

const PRIVACY_FAQS = [
  {
    id: 'privacy-faq-1',
    question: 'Does CanadaNOCGuide store my CRS calculator scores or work history?',
    answer: 'No. All calculations on our CRS Calculator and NOC tools run 100% client-side inside your browser’s JavaScript engine. Your age, language scores, degrees, and work history are never sent to, recorded on, or saved on our servers.',
    defaultOpen: true,
  },
  {
    id: 'privacy-faq-2',
    question: 'Do I need to sign up or provide an email to use this site?',
    answer: 'No. CanadaNOCGuide is completely public and free. We do not require accounts, logins, email submissions, or credit card information to view any NOC codes, wage benchmarks, or Express Entry draw records.',
  },
  {
    id: 'privacy-faq-3',
    question: 'How do you comply with PIPEDA and GDPR?',
    answer: 'We collect zero personally identifiable information (PII) during standard browsing. Any analytics metrics collected are strictly anonymized technical logs used solely for monitoring server uptime and page performance.',
  },
]

export default function PrivacyPolicyPage() {
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
        name: 'Privacy Policy',
        item: 'https://canadanocguide.com/privacy-policy',
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
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />

        {/* Page Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            Legal &amp; Compliance
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-[var(--font-space)]">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Last Updated: September 1, 2026 &bull; Strict Client-Side Privacy Standard
          </p>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800/80 pt-6">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1.5">
            <span className="text-xs font-mono text-cyan-400 uppercase block font-bold">100% Client-Side</span>
            <p className="text-xs text-slate-300">
              CRS calculator inputs are evaluated strictly in your browser. No score data touches our servers.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1.5">
            <span className="text-xs font-mono text-emerald-400 uppercase block font-bold">No Account Required</span>
            <p className="text-xs text-slate-300">
              No registration, login walls, or forced email signups to browse occupational data or cutoffs.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1.5">
            <span className="text-xs font-mono text-amber-400 uppercase block font-bold">PIPEDA &amp; GDPR</span>
            <p className="text-xs text-slate-300">
              Built with privacy-by-design following Canadian and European data protection standards.
            </p>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-6">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Introduction &amp; Scope</h2>
            <p>
              Welcome to <strong>CanadaNOCGuide</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to respecting your privacy and protecting any information collected during your visit to our website (https://canadanocguide.com).
            </p>
            <p>
              This Privacy Policy outlines how we treat data under Canada&apos;s <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA), the EU General Data Protection Regulation (GDPR), and relevant international privacy frameworks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Information We Do NOT Collect</h2>
            <p>
              CanadaNOCGuide is an open educational public reference resource. We do <strong>not</strong> collect or store:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-400 pl-2">
              <li>Personal identification numbers (passports, UCI numbers, SIN cards).</li>
              <li>Calculated CRS points, language test scores, or uploaded CVs/resumes.</li>
              <li>Account credentials, passwords, or payment card records.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Information Collected Automatically (Log Files &amp; Analytics)</h2>
            <p>
              Like standard web applications, our web hosting servers automatically record basic technical data:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-400 pl-2">
              <li>Browser type, version, and device viewport resolution.</li>
              <li>Referring URLs and timestamps of page requests.</li>
              <li>Anonymized IP addresses (used exclusively for rate limiting and server health monitoring).</li>
            </ul>
            <p>
              This aggregate data helps us identify broken links, fix technical bugs, and ensure fast search query performance across our database.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Cookies and Local Storage</h2>
            <p>
              We utilize minimal client-side cookies or browser local storage to preserve non-personal user preferences, such as your dark/light theme setting or search filter states. You can clear or block cookies at any time through your browser settings without losing access to our NOC directory.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Advertising &amp; Third-Party Partners</h2>
            <p>
              To maintain our server infrastructure and keep all 516 NOC guides 100% free, we may display non-intrusive advertisements served by third-party ad networks (including Google AdSense):
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-400 pl-2">
              <li>Third-party vendors, including Google, use cookies (including the DoubleClick / Google advertising cookie) to serve ads based on prior visits to this or other websites across the Internet.</li>
              <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visits to our site and/or other sites on the Internet.</li>
              <li>
                You may opt out of personalized advertising anytime by visiting{' '}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline font-mono"
                >
                  Google Ads Settings ↗
                </a>
                .
              </li>
              <li>
                Alternatively, you can opt out of third-party vendor cookies for personalized advertising by visiting{' '}
                <a
                  href="https://optout.aboutads.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline font-mono"
                >
                  aboutads.info ↗
                </a>{' '}
                or the{' '}
                <a
                  href="https://optout.networkadvertising.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline font-mono"
                >
                  Network Advertising Initiative (NAI) ↗
                </a>
                .
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">6. PIPEDA, GDPR &amp; CCPA Compliance Rights</h2>
            <p>
              We respect international data privacy regulations:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-400 pl-2">
              <li><strong>Canada (PIPEDA):</strong> Canadian residents have the right to challenge our compliance with fair information principles and request access to or correction of any personal information held.</li>
              <li><strong>European Union (GDPR):</strong> EU visitors have the right to access, rectify, or erase any personal data, and the right to object to data processing.</li>
              <li><strong>California (CCPA):</strong> California consumers have the right to request what personal information is collected, request deletion, and opt out of the sale or sharing of personal data (CanadaNOCGuide never sells personal data).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">7. Contact Regarding Privacy Inquiries</h2>
            <p>
              If you have any questions regarding our privacy practices or wish to make an inquiry, please contact our data team at{' '}
              <a href="mailto:privacy@canadanocguide.com" className="text-cyan-400 font-mono hover:underline">
                privacy@canadanocguide.com
              </a>
              .
            </p>
          </section>
        </div>

        {/* Privacy FAQ with Schema */}
        <section className="space-y-6 pt-4 border-t border-slate-800/80">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Privacy &amp; Data Security FAQ
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Direct clarifications on how your data remains private and protected while browsing.
            </p>
          </div>

          <AccordionFaq items={PRIVACY_FAQS} includeSchema={true} />
        </section>
      </div>

      <Footer />
    </main>
  )
}
