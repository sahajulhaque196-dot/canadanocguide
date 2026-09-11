import React from 'react'
import type { Metadata } from 'next'
import HeaderNav from '@/components/home/HeaderNav'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import AccordionFaq from '@/components/ui/AccordionFaq'
import Footer from '@/components/home/Footer'

export const metadata: Metadata = {
  title: 'Contact Us & Data Feedback | CanadaNOCGuide',
  description: 'Have a question about NOC codes, spotted a wage data discrepancy, or want to suggest an update? Get in touch with the CanadaNOCGuide editorial team.',
  alternates: {
    canonical: 'https://canadanocguide.com/contact',
  },
}

const CONTACT_FAQS = [
  {
    id: 'contact-faq-1',
    question: 'Can you review my reference letter or give me immigration advice?',
    answer: 'No. Under Section 91 of Canada’s Immigration and Refugee Protection Act (IRPA), only licensed RCICs or Canadian immigration lawyers can advise or represent applicants for a fee. CanadaNOCGuide is strictly an educational reference tool. We do not provide individual case reviews or visa consulting.',
    defaultOpen: true,
  },
  {
    id: 'contact-faq-2',
    question: 'How fast do you update Express Entry draws on the site?',
    answer: 'We update our draw history within 24 to 48 hours of IRCC publishing official Ministerial Instructions rounds of invitations. This includes cutoffs, ITA counts, tie-breaking rules, and category breakdowns.',
  },
  {
    id: 'contact-faq-3',
    question: 'I noticed a wage or duty discrepancy. How should I report it?',
    answer: 'Please send an email to support@canadanocguide.com with your 5-digit NOC code, province, and the official Job Bank or ESDC link. Our data verification team will review and update the production database within 48 hours.',
  },
  {
    id: 'contact-faq-4',
    question: 'Are all tools, NOC directories, and calculators 100% free?',
    answer: 'Yes. All directories, CRS calculators, wage tables, and TEER guides on CanadaNOCGuide are completely free for all applicants worldwide. We do not charge subscriptions, paywalls, or fees.',
  },
]

export default function ContactPage() {
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
        name: 'Contact Us',
        item: 'https://canadanocguide.com/contact',
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 space-y-12">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]} />

        {/* Page Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            Get in Touch
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-[var(--font-space)]">
            Contact &amp; Data Verification
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We actively monitor and update Canada&apos;s National Occupational Classification (NOC 2021) and ESDC wage tables. Reach out if you have spotted a typo, noticed a wage discrepancy, or have suggestions to make this tool better.
          </p>
        </div>

        {/* Direct Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl space-y-5">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
              Direct Communication Channels
            </h2>
            
            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Creator Direct on X</span>
                <a
                  href="https://x.com/saddamh58509953"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-bold text-cyan-400 hover:underline block"
                >
                  @saddamh58509953 ↗
                </a>
                <span className="text-[11px] text-slate-400 block pt-0.5">Quick questions, feedback, and announcements</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Data Discrepancies &amp; Corrections</span>
                <a href="mailto:support@canadanocguide.com" className="font-mono text-cyan-400 hover:underline block">
                  support@canadanocguide.com
                </a>
                <span className="text-[11px] text-slate-400 block pt-0.5">Typical response time: Within 48 hours</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Location &amp; Operations</span>
                <span className="text-slate-200 block">Assam, India 🇮🇳</span>
                <span className="text-[11px] text-slate-400 block pt-0.5">Serving prospective immigrants and applicants worldwide</span>
              </div>
            </div>
          </div>

          {/* Legal Boundary Notice */}
          <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-white">Inquiry Boundaries</h2>
              
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed">
                <strong>Legal Compliance Notice:</strong> Under Canadian immigration regulations (IRPA Section 91), we are not authorized to evaluate personal visa chances, write employer letters, or give paid immigration advice.
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                If you need representation or customized case strategy, please consult a registered RCIC through the College of Immigration and Citizenship Consultants (CICC) or an authorized provincial bar lawyer.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 space-y-1">
              <span className="text-[10px] font-mono text-cyan-400 uppercase block">What We Can Help With</span>
              <p className="text-slate-300">
                Bug reports, UI suggestions, missing NOC job titles, calculator calculations, and open-source data verification.
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Correction Process */}
        <section className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/30 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase">
              Editorial Workflow
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              How We Handle Data Updates &amp; Corrections
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Accuracy is critical when applying for Canadian immigration. Here is our 3-step verification process:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">Step 1</span>
              <h3 className="text-sm font-bold text-white">Report &amp; Citation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                User submits a note with the 5-digit NOC code and an official reference URL (Job Bank, Statistics Canada, or IRCC).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">Step 2</span>
              <h3 className="text-sm font-bold text-white">Government Source Check</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our editorial team verifies the change directly against official ESDC or IRCC ministerial bulletins.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">Step 3</span>
              <h3 className="text-sm font-bold text-white">Live Verification &amp; Update Published</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Once validated, the updated static data is re-built and pushed to production within 48 business hours.
              </p>
            </div>
          </div>
        </section>

        {/* Contact FAQ with Schema */}
        <section className="space-y-6 pt-4">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Frequently Asked Support Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Clear answers regarding how CanadaNOCGuide works and how we interact with applicants.
            </p>
          </div>

          <AccordionFaq items={CONTACT_FAQS} includeSchema={true} />
        </section>
      </div>

      <Footer />
    </main>
  )
}
