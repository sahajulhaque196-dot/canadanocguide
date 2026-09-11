'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function HeaderNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isHomeActive = pathname === '/'
  const isNocActive = pathname === '/noc' || pathname.startsWith('/noc/')
  const isDrawsActive = pathname === '/express-entry-draws'
  const isCrsActive = pathname === '/crs-calculator'

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 py-4 pointer-events-none">
      <div className="relative max-w-7xl mx-auto pointer-events-auto">
        <div className="flex items-center justify-between px-5 py-3 rounded-2xl border border-slate-800 bg-slate-950/85 backdrop-blur-xl shadow-lg">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              🍁
            </div>
            <span className="font-bold tracking-tight text-white font-[var(--font-space)] text-lg">
              Canada<span className="text-cyan-400">NOC</span>Guide
            </span>
          </Link>

          {/* Right-aligned Navigation & Action CTA */}
          <div className="flex items-center gap-6 ml-auto">
            
            {/* Page Links on the Right */}
            <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
              <Link
                href="/"
                className={`transition-colors ${
                  isHomeActive ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link
                href="/noc"
                className={`transition-colors ${
                  isNocActive ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                NOC Directory
              </Link>
              <Link
                href="/teer"
                className={`transition-colors ${
                  pathname.startsWith('/teer') ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                TEER Guide
              </Link>
              <Link
                href="/noc-converter"
                className={`transition-colors ${
                  pathname === '/noc-converter' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                NOC Converter
              </Link>
              <Link
                href="/wages"
                className={`transition-colors ${
                  pathname.startsWith('/wages') ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Wages
              </Link>
              <Link
                href="/express-entry-draws"
                className={`transition-colors ${
                  isDrawsActive ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Draws Tracker
              </Link>
              <Link
                href="/crs-calculator"
                className={`transition-colors ${
                  isCrsActive ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                CRS Calculator
              </Link>
            </nav>

            {/* Action CTA Button */}
            <Link
              href="/noc"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/15 to-blue-500/15 hover:from-cyan-500/25 hover:to-blue-500/25 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-mono font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] cursor-pointer"
            >
              <span>Browse All 516 NOCs</span>
              <span>→</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-2 p-4 rounded-2xl border border-slate-800 bg-slate-950/95 backdrop-blur-2xl shadow-2xl space-y-2 text-sm font-mono">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block p-3 rounded-xl border transition-colors ${
                isHomeActive
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border-cyan-500/40'
                  : 'bg-slate-900/60 hover:bg-cyan-950/30 text-slate-200 font-medium border-slate-800'
              }`}
            >
              🏠 Home
            </Link>
            <Link
              href="/noc"
              onClick={() => setMobileMenuOpen(false)}
              className={`block p-3 rounded-xl border transition-colors ${
                isNocActive
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border-cyan-500/40'
                  : 'bg-slate-900/60 hover:bg-cyan-950/30 text-cyan-400 font-bold border-cyan-500/20'
              }`}
            >
              📋 All 516 NOC Codes Directory →
            </Link>
            <Link
              href="/express-entry-draws"
              onClick={() => setMobileMenuOpen(false)}
              className={`block p-3 rounded-xl border transition-colors ${
                isDrawsActive
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border-cyan-500/40'
                  : 'bg-slate-900/60 hover:bg-cyan-950/30 text-cyan-400 font-bold border-cyan-500/20'
              }`}
            >
              📊 Express Entry Draws Tracker (442 Draws) →
            </Link>
            <Link
              href="/crs-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className={`block p-3 rounded-xl border transition-colors ${
                isCrsActive
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border-cyan-500/40'
                  : 'bg-slate-900/60 hover:bg-cyan-950/30 text-cyan-400 font-bold border-cyan-500/20'
              }`}
            >
              🧮 CRS Points Calculator (2026) →
            </Link>
            <Link
              href="/express-entry"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-cyan-950/30 text-slate-200 hover:text-white transition-colors text-xs font-mono"
            >
              🚀 Priority Category FastPass →
            </Link>
            <Link
              href="/teer"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-cyan-950/30 text-slate-200 hover:text-white transition-colors text-xs font-mono"
            >
              📐 TEER Categories Guide (0 to 5) →
            </Link>
            <Link
              href="/noc-converter"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold transition-colors text-xs font-mono"
            >
              🔄 NOC 2016 to 2021 Converter (4 to 5 Digit) →
            </Link>
            <Link
              href="/wages"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-cyan-950/30 text-slate-200 hover:text-white transition-colors text-xs font-mono"
            >
              💰 Provincial Wages &amp; LMIA Prevailing Rates →
            </Link>
          </div>
        )}

      </div>
    </header>
  )
}
