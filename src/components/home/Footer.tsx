import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Legal Disclaimer (Placed directly above footer navigation as requested) */}
        <div className="p-5 sm:p-6 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl">
          <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed">
            <strong className="text-white font-semibold">Disclaimer:</strong> CanadaNOCGuide.com is a free educational and informational resource built using public Canadian government data. We are not immigration lawyers, registered immigration consultants (RCIC), or affiliated with IRCC or ESDC. Under Section 91 of the Immigration and Refugee Protection Act (IRPA), only authorized representatives regulated by the College of Immigration and Citizenship Consultants (CICC) or provincial law societies can provide immigration legal advice for a fee. Always verify your information directly on official government websites.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Mission */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                🍁
              </div>
              <span className="font-bold tracking-tight text-white text-base">
                Canada<span className="text-cyan-400">NOC</span>Guide
              </span>
            </Link>

            <p className="text-slate-400 max-w-md leading-relaxed">
              A free, simple guide to help you find your Canada NOC code, check your TEER category, explore Express Entry priority draws, and see real Canadian salaries.
            </p>

            <div className="pt-2">
              <span className="text-slate-500 block font-mono text-[11px] uppercase tracking-wider">
                Official Canadian Open Data Sources:
              </span>
              <p className="text-slate-400 text-[11px] leading-relaxed mt-1">
                Verified with{' '}
                <a
                  href="https://www.statcan.gc.ca/en/subjects/standard/noc/2021/indexV1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  Statistics Canada (NOC 2021)
                </a>
                ,{' '}
                <a
                  href="https://www.jobbank.gc.ca/trend-analysis/search-wages"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  ESDC Job Bank Wages
                </a>
                , and{' '}
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  IRCC Ministerial Instructions
                </a>
                .
              </p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2.5">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-3">
              Explore Guide
            </span>
            <ul className="space-y-2">
              <li>
                <Link href="/teer" className="hover:text-cyan-400 transition-colors">
                  TEER Categories (0–5)
                </Link>
              </li>
              <li>
                <Link href="/express-entry" className="hover:text-cyan-400 transition-colors">
                  Priority Categories (PR)
                </Link>
              </li>
              <li>
                <Link href="/noc" className="hover:text-cyan-400 transition-colors">
                  Browse All 516 NOCs
                </Link>
              </li>
              <li>
                <Link href="/express-entry-draws" className="hover:text-cyan-400 transition-colors">
                  Express Entry Draws Tracker
                </Link>
              </li>
              <li>
                <Link href="/wages" className="hover:text-cyan-400 transition-colors">
                  Canada Wages &amp; LMIA
                </Link>
              </li>
              <li>
                <Link href="/crs-calculator" className="hover:text-cyan-400 transition-colors">
                  CRS Points Calculator (2026)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Trust & Legal */}
          <div className="space-y-2.5">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-3">
              Trust &amp; Legal
            </span>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About &amp; Methodology
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact &amp; Feedback
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-cyan-400 transition-colors">
                  Terms of Use &amp; Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Creator */}
          <div className="space-y-2.5">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-3">
              About the Creator
            </span>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://x.com/saddamh58509953"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Sahajul Haque on X</span>
                  <span className="font-mono text-[10px]">↗</span>
                </a>
              </li>
              <li className="text-slate-400">Assam, India 🇮🇳</li>
              <li>
                <span className="inline-block px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-400">
                  2026 Edition
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <p>Official Canadian Open Data: Statistics Canada, ESDC Job Bank &amp; IRCC.</p>
          <div className="shrink-0">
            © 2026 CanadaNOCGuide. Built with care by Sahajul Haque.
          </div>
        </div>

      </div>
    </footer>
  )
}
