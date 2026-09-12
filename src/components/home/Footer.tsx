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
                <Link href="/noc-converter" className="text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1 font-semibold">
                  <span>🔄 NOC Converter (2016 to 2021)</span>
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
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-cyan-400 transition-colors">
                  Legal Disclaimer (IRPA §91)
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

        {/* Deep Topic Silo & Internal Linking Matrix */}
        <div className="pt-8 border-t border-slate-850 space-y-6">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Canadian Immigration &amp; Labour Market Directory Index
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 text-xs text-slate-400">
            {/* Silo 1: Express Entry Categories */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] font-bold text-white uppercase tracking-wider block text-cyan-400">
                Express Entry Categories
              </span>
              <ul className="space-y-1.5">
                <li>
                  <Link href="/express-entry/stem" className="hover:text-cyan-300 transition-colors">
                    STEM Category Occupations
                  </Link>
                </li>
                <li>
                  <Link href="/express-entry/healthcare" className="hover:text-cyan-300 transition-colors">
                    Healthcare Stream NOCs
                  </Link>
                </li>
                <li>
                  <Link href="/express-entry/trades" className="hover:text-cyan-300 transition-colors">
                    Trade Occupations (Red Seal)
                  </Link>
                </li>
                <li>
                  <Link href="/express-entry/transport" className="hover:text-cyan-300 transition-colors">
                    Transport &amp; Trucking NOCs
                  </Link>
                </li>
                <li>
                  <Link href="/express-entry/agriculture" className="hover:text-cyan-300 transition-colors">
                    Agriculture &amp; Agri-Food
                  </Link>
                </li>
                <li>
                  <Link href="/express-entry/french" className="hover:text-cyan-300 transition-colors">
                    French Language Proficiency
                  </Link>
                </li>
              </ul>
            </div>

            {/* Silo 2: TEER Classification */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] font-bold text-white uppercase tracking-wider block text-emerald-400">
                TEER Classification Matrix
              </span>
              <ul className="space-y-1.5">
                <li>
                  <Link href="/teer/0" className="hover:text-emerald-300 transition-colors">
                    TEER 0: Management Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/teer/1" className="hover:text-emerald-300 transition-colors">
                    TEER 1: University Degree
                  </Link>
                </li>
                <li>
                  <Link href="/teer/2" className="hover:text-emerald-300 transition-colors">
                    TEER 2: College &amp; Apprenticeship
                  </Link>
                </li>
                <li>
                  <Link href="/teer/3" className="hover:text-emerald-300 transition-colors">
                    TEER 3: Intermediate Technical
                  </Link>
                </li>
                <li>
                  <Link href="/teer/4" className="hover:text-emerald-300 transition-colors">
                    TEER 4: Semi-Skilled &amp; PNP
                  </Link>
                </li>
                <li>
                  <Link href="/teer/5" className="hover:text-emerald-300 transition-colors">
                    TEER 5: Entry-Level Roles
                  </Link>
                </li>
              </ul>
            </div>

            {/* Silo 3: Provincial Wages & LMIA */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] font-bold text-white uppercase tracking-wider block text-purple-400">
                Provincial Wages &amp; LMIA
              </span>
              <ul className="space-y-1.5">
                <li>
                  <Link href="/wages/ontario" className="hover:text-purple-300 transition-colors">
                    Ontario Wage Rates &amp; OINP
                  </Link>
                </li>
                <li>
                  <Link href="/wages/british-columbia" className="hover:text-purple-300 transition-colors">
                    British Columbia (BC PNP)
                  </Link>
                </li>
                <li>
                  <Link href="/wages/alberta" className="hover:text-purple-300 transition-colors">
                    Alberta (AAIP) Benchmarks
                  </Link>
                </li>
                <li>
                  <Link href="/wages/quebec" className="hover:text-purple-300 transition-colors">
                    Quebec Prevailing Wages
                  </Link>
                </li>
                <li>
                  <Link href="/wages/nova-scotia" className="hover:text-purple-300 transition-colors">
                    Nova Scotia &amp; AIP Streams
                  </Link>
                </li>
                <li>
                  <Link href="/wages/saskatchewan" className="hover:text-purple-300 transition-colors">
                    Saskatchewan (SINP) Wages
                  </Link>
                </li>
              </ul>
            </div>

            {/* Silo 4: Core Calculators & Tools */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] font-bold text-white uppercase tracking-wider block text-amber-400">
                Immigration Tools
              </span>
              <ul className="space-y-1.5">
                <li>
                  <Link href="/crs-calculator" className="hover:text-amber-300 transition-colors">
                    CRS Score Calculator (2026)
                  </Link>
                </li>
                <li>
                  <Link href="/express-entry-draws" className="hover:text-amber-300 transition-colors">
                    Express Entry Draws (442 Rounds)
                  </Link>
                </li>
                <li>
                  <Link href="/noc-converter" className="hover:text-amber-300 transition-colors">
                    4-Digit to 5-Digit Converter
                  </Link>
                </li>
                <li>
                  <Link href="/noc" className="hover:text-amber-300 transition-colors">
                    516 NOC Code Finder
                  </Link>
                </li>
                <li>
                  <Link href="/wages" className="hover:text-amber-300 transition-colors">
                    All 13 Provincial Wage Grids
                  </Link>
                </li>
                <li>
                  <Link href="/teer" className="hover:text-amber-300 transition-colors">
                    TEER System Overview (0–5)
                  </Link>
                </li>
              </ul>
            </div>
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
