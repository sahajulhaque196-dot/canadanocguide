import React from 'react'
import Link from 'next/link'

export default function ImmigrationDisclaimer() {
  return (
    <aside
      role="note"
      aria-label="Educational content disclaimer"
      className="flex items-start gap-3 px-4 py-3 rounded-xl border border-amber-500/25 bg-amber-500/[0.08] text-amber-200 text-xs leading-relaxed"
    >
      <span className="shrink-0 mt-0.5 text-amber-400" aria-hidden="true">⚠</span>
      <p>
        <strong className="font-semibold text-amber-300">Educational Reference Only.</strong>{' '}
        This page presents publicly available government data for informational planning purposes.
        It does not constitute legal immigration advice. Under{' '}
        <strong>Section 91 of Canada&apos;s IRPA</strong>, only a licensed{' '}
        <a
          href="https://college-ic.ca/protecting-the-public/find-an-immigration-consultant"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-amber-100 transition-colors"
        >
          RCIC
        </a>{' '}
        or Canadian immigration lawyer can provide paid advice for your case.{' '}
        <Link
          href="/disclaimer"
          className="underline underline-offset-2 hover:text-amber-100 transition-colors"
        >
          Full Disclaimer &rarr;
        </Link>
      </p>
    </aside>
  )
}
