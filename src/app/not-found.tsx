import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import HeaderNav from '@/components/home/HeaderNav'
import Footer from '@/components/home/Footer'

export const metadata: Metadata = {
  title: '404: Page or NOC Code Not Found | CanadaNOCGuide',
  description: 'The requested page or NOC occupation code could not be found. Search our comprehensive directory of all 516 Canadian NOC 2021 codes.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-transparent text-slate-100 selection:bg-cyan-500 selection:text-black flex flex-col justify-between">
      <HeaderNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 text-center space-y-8 my-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-xs font-mono uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Error 404 — Resource Not Found
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-[var(--font-space)]">
            NOC Code or Page Not Found
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            The Canadian occupation code or URL you requested does not exist or has been relocated under the updated NOC 2021 classification.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/noc"
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all cursor-pointer"
          >
            Search All 516 NOC Codes →
          </Link>
          <Link
            href="/express-entry-draws"
            className="px-5 py-3 rounded-xl border border-slate-700 bg-slate-900/70 hover:bg-slate-800 text-white font-mono text-sm transition-colors cursor-pointer"
          >
            Express Entry Draws
          </Link>
          <Link
            href="/crs-calculator"
            className="px-5 py-3 rounded-xl border border-slate-700 bg-slate-900/70 hover:bg-slate-800 text-white font-mono text-sm transition-colors cursor-pointer"
          >
            CRS Calculator
          </Link>
          <Link
            href="/"
            className="px-5 py-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 hover:text-white font-mono text-sm transition-colors cursor-pointer"
          >
            Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
