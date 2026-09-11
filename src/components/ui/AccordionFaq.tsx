'use client'

import React, { useState } from 'react'

export interface AccordionFaqItem {
  id?: string | number
  question: string
  answer: React.ReactNode
  plainTextAnswer?: string
  defaultOpen?: boolean
}

function extractNodeText(node: React.ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractNodeText).join('')
  if (React.isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>
    return extractNodeText(el.props?.children)
  }
  return ''
}

interface AccordionFaqProps {
  items: AccordionFaqItem[]
  title?: string
  subtitle?: string
  badge?: string
  className?: string
  includeSchema?: boolean
  allowMultiple?: boolean
}

export default function AccordionFaq({
  items,
  title,
  subtitle,
  badge,
  className = '',
  includeSchema = false,
  allowMultiple = false,
}: AccordionFaqProps) {
  const [openIndices, setOpenIndices] = useState<number[]>(() => {
    const initial: number[] = []
    items.forEach((item, idx) => {
      if (item.defaultOpen) {
        initial.push(idx)
      }
    })
    return initial.length > 0 ? initial : [0]
  })

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      )
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]))
    }
  }

  const faqSchema = includeSchema
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.plainTextAnswer || extractNodeText(item.answer) || item.question,
          },
        })),
      }
    : null

  return (
    <div className={`w-full ${className}`}>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {(badge || title || subtitle) && (
        <div className="mb-6 space-y-2">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              {badge}
            </div>
          )}
          {title && (
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndices.includes(index)
          const itemId = item.id || `faq-item-${index}`

          return (
            <div
              key={itemId}
              className={`group rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-cyan-500/40 bg-slate-900/60 shadow-[0_0_25px_rgba(6,182,212,0.08)]'
                  : 'border-slate-800/80 bg-slate-900/30 hover:border-slate-700/80 hover:bg-slate-900/45'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-body-${itemId}`}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer select-none transition-colors"
              >
                <span
                  className={`text-sm sm:text-base font-semibold transition-colors duration-200 ${
                    isOpen ? 'text-cyan-300' : 'text-slate-100 group-hover:text-white'
                  }`}
                >
                  {item.question}
                </span>

                {/* Morphing +/- Toggle Icon with Smooth Transformation */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen
                      ? 'border-cyan-400/50 bg-cyan-500/20 text-cyan-300 rotate-90 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                      : 'border-slate-700 bg-slate-800/80 text-slate-300 group-hover:border-slate-600 group-hover:bg-slate-800'
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-300 ease-out"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Horizontal bar (always visible) */}
                    <line x1="2" y1="7" x2="12" y2="7" />
                    {/* Vertical bar (morphs: disappears when open to make a minus sign) */}
                    <line
                      x1="7"
                      y1="2"
                      x2="7"
                      y2="12"
                      className={`origin-center transition-all duration-300 ease-out ${
                        isOpen ? 'opacity-0 scale-0 rotate-90' : 'opacity-100 scale-100 rotate-0'
                      }`}
                    />
                  </svg>
                </div>
              </button>

              {/* Smooth Height Expansion via CSS Grid Rows */}
              <div
                id={`faq-body-${itemId}`}
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/50 mt-1">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
