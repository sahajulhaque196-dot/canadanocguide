import React from 'react'
import Link from 'next/link'

export default function NocGuideSection() {
  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#030712] via-slate-950 to-[#030712] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono uppercase tracking-wider mb-3">
            Simple Step-by-Step Guide
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How to Pick the Right NOC Code (And Avoid Rejection)
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Many people get their Canada PR application refused simply because they picked the wrong NOC code. Visa officers don&apos;t just read your job title—they check what you actually do at work every day. Here are 3 simple rules to get it right.
          </p>
        </div>

        {/* 3 Practical Rules Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Rule 1 */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-amber-400 mb-4">
                01
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                1. Don&apos;t Just Look at Your Job Title
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Companies give all kinds of fancy titles like <em className="text-amber-300 not-italic">&ldquo;Tech Ninja&rdquo;</em> or <em className="text-amber-300 not-italic">&ldquo;Customer Happiness Lead&rdquo;</em>.
              </p>
              <p className="text-sm text-slate-400 mt-2.5 leading-relaxed">
                The Canadian government does not care about fancy titles. What matters is what tasks you actually perform every day at work.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800/80 text-xs font-mono text-amber-400">
              ✓ Focus on your daily work, not your title
            </div>
          </div>

          {/* Rule 2 */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-cyan-400 mb-4">
                02
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                2. The 60% Job Duties Rule
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Your employer reference letter must demonstrate that you performed the lead statement duties and a substantial number of the main duties.
              </p>
              <p className="text-sm text-slate-400 mt-2.5 leading-relaxed">
                You do not need to do 100% of the duties. Matching at least 60% of the main duties is what IRCC visa officers look for during evaluation.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800/80 text-xs font-mono text-cyan-400">
              ✓ Match more than half of the duties
            </div>
          </div>

          {/* Rule 3 */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-400 mb-4">
                03
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                3. Always Check the &ldquo;Exclusions&rdquo;
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Every NOC page has an <strong className="text-white">&ldquo;Exclusions&rdquo;</strong> section. These are similar-sounding jobs that have a completely different code.
              </p>
              <p className="text-sm text-slate-400 mt-2.5 leading-relaxed">
                For example, a Software Developer (TEER 1) is different from a Computer Network Technician (TEER 2). Always check this list so you don&apos;t pick the wrong one by mistake.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800/80 text-xs font-mono text-emerald-400">
              ✓ Double-check similar jobs
            </div>
          </div>

        </div>

        {/* Reference Letter Checklist Banner */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/30 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">IRCC Proof of Work Standard</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                The 4 Must-Haves on Your Work Experience Letter
              </h3>
            </div>
            <span className="text-xs font-mono bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
              Avoid Procedural Fairness Letters (PFL)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <span className="font-mono text-amber-400 font-bold block">1. Company Letterhead</span>
              <p className="text-slate-300">
                Must show the official company logo, physical address, supervisor&apos;s direct phone number, and corporate email.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <span className="font-mono text-cyan-400 font-bold block">2. Hours Per Week</span>
              <p className="text-slate-300">
                Clearly state &ldquo;30+ hours/week (full-time)&rdquo;. IRCC will reject letters that only state &ldquo;full-time&rdquo; without exact weekly hours.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <span className="font-mono text-emerald-400 font-bold block">3. Annual or Hourly Salary</span>
              <p className="text-slate-300">
                All Canadian immigration streams require proof that your work was paid. Volunteer or unpaid internships do not count.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <span className="font-mono text-rose-400 font-bold block">4. Original Daily Duties</span>
              <p className="text-slate-300">
                Never copy-paste the NOC duties word-for-word. Describe what you actually did at that specific company in plain language.
              </p>
            </div>
          </div>
        </div>

        {/* High-Intent Internal Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <Link
            href="/noc"
            className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all group block"
          >
            <span className="text-xs font-mono text-cyan-400 block mb-1">516 NOC Codes →</span>
            <div className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
              NOC 2021 Directory
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Search all unit groups, lead statements, duties, and exclusions.
            </p>
          </Link>

          <Link
            href="/crs-calculator"
            className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all group block"
          >
            <span className="text-xs font-mono text-teal-400 block mb-1">1,200 Point Grid →</span>
            <div className="font-bold text-white text-base group-hover:text-teal-300 transition-colors">
              CRS Points Calculator
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Calculate your exact score with instant CLB conversion.
            </p>
          </Link>

          <Link
            href="/express-entry-draws"
            className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all group block"
          >
            <span className="text-xs font-mono text-indigo-400 block mb-1">Draw #441 History →</span>
            <div className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors">
              Express Entry Draws
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Latest cutoffs, invitation volumes, and category draw trends.
            </p>
          </Link>

          <Link
            href="/wages"
            className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all group block"
          >
            <span className="text-xs font-mono text-amber-400 block mb-1">LMIA Benchmarks →</span>
            <div className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">
              Provincial Median Wages
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Compare Job Bank low, median, and high wages across 13 provinces.
            </p>
          </Link>
        </div>

      </div>
    </section>
  )
}
