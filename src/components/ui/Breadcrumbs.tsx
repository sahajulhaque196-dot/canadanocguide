import React from 'react'
import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="w-full flex items-center mb-6">
      <ol className="inline-flex items-center flex-wrap gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-800/80 bg-slate-950/70 backdrop-blur-md text-xs font-mono shadow-sm">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1

          return (
            <li key={idx} className="inline-flex items-center gap-1.5">
              {idx === 0 ? (
                <Link
                  href={item.href || '/'}
                  className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  <span className="text-[11px]">🍁</span>
                  <span>{item.label}</span>
                </Link>
              ) : isLast ? (
                <span
                  aria-current="page"
                  className="text-cyan-400 font-bold max-w-[200px] sm:max-w-xs md:max-w-md truncate"
                  title={item.label}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href || '#'}
                  className="text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  {item.label}
                </Link>
              )}

              {!isLast && (
                <span className="text-slate-600 select-none font-sans text-[11px]" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
