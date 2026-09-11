'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = typeof window !== 'undefined' ? localStorage.getItem('cng_cookie_consent') : null
    const timer = setTimeout(() => {
      setMounted(true)
      if (!consent) {
        setShowBanner(true)
      }
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  const handleConsent = (type: 'all' | 'essential') => {
    try {
      localStorage.setItem('cng_cookie_consent', type)
    } catch {
      // Ignore localstorage write errors if cookies disabled
    }
    setShowBanner(false)
  }

  if (!mounted || !showBanner) return null

  return (
    <aside
      aria-label="Cookie and Privacy Preferences"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 sm:p-5 rounded-2xl border border-slate-700 bg-slate-900/95 backdrop-blur-xl shadow-2xl text-xs text-slate-300 space-y-3 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3">
        <span className="text-xl shrink-0" aria-hidden="true">
          🍪
        </span>
        <div className="space-y-1">
          <p className="font-bold text-white text-sm">Privacy &amp; Cookie Notice</p>
          <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
            We use essential cookies and anonymized analytics to measure site traffic and ensure our free NOC search tools remain fast and reliable. Learn more in our{' '}
            <Link
              href="/privacy-policy"
              className="text-cyan-400 underline hover:text-cyan-300"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-1">
        <button
          onClick={() => handleConsent('essential')}
          className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono text-[11px] transition-colors"
        >
          Essential Only
        </button>
        <button
          onClick={() => handleConsent('all')}
          className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold font-mono text-[11px] shadow-sm transition-colors"
        >
          Accept All
        </button>
      </div>
    </aside>
  )
}
