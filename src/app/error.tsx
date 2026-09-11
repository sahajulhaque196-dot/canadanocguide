'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import HeaderNav from '@/components/home/HeaderNav'
import Footer from '@/components/home/Footer'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log exception to error monitoring service if available
    console.error('Application runtime error:', error)
  }, [error])

  return (
    <main className="min-h-screen bg-transparent text-slate-100 selection:bg-cyan-500 selection:text-black flex flex-col justify-between">
      <HeaderNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 text-center space-y-8 my-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-500/30 bg-rose-950/40 text-rose-400 text-xs font-mono uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
          Application Error
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-[var(--font-space)]">
            Something Went Wrong
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            We encountered an unexpected error while loading this Canadian occupational record or tool. Please try reloading or navigate back to the directory.
          </p>
          {error?.digest && (
            <p className="text-[11px] font-mono text-slate-500">
              Error Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all cursor-pointer"
          >
            Try Again ↻
          </button>
          <Link
            href="/noc"
            className="px-5 py-3 rounded-xl border border-slate-700 bg-slate-900/70 hover:bg-slate-800 text-white font-mono text-sm transition-colors cursor-pointer"
          >
            NOC Directory
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
