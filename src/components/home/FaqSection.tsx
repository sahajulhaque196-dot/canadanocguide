'use client'

import React from 'react'
import { HOMEPAGE_FAQS } from '@/data/faqsData'
import AccordionFaq from '@/components/ui/AccordionFaq'

export default function FaqSection() {
  const faqItems = HOMEPAGE_FAQS.map((f, idx) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    defaultOpen: idx === 0,
  }))

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-transparent border-t border-slate-800/60">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base">
            Simple answers to common questions about NOC codes, TEER levels, and Canadian PR rules.
          </p>
        </div>

        <AccordionFaq items={faqItems} includeSchema={true} />
      </div>
    </section>
  )
}
