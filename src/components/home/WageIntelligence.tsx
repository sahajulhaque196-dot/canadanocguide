'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { PROVINCE_WAGE_BENCHMARKS } from '@/data/wageBenchmarks'

const PROV_SLUGS: Record<string, string> = {
  ON: 'ontario',
  BC: 'british-columbia',
  AB: 'alberta',
  QC: 'quebec',
}

export default function WageIntelligence() {
  const [activeProv, setActiveProv] = useState<string>('ON')
  const current = PROVINCE_WAGE_BENCHMARKS.find((p) => p.provCode === activeProv) || PROVINCE_WAGE_BENCHMARKS[0]

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-transparent border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
              Official Canada Wage Data (2025/2026)
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How Much Do Jobs Pay in Each Province?
            </h2>
            <p className="mt-2 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
              The Canadian government publishes real wage data every year. This number is very important: if an employer wants to hire you on an LMIA work permit, they must pay you at least the median wage shown here.
            </p>
          </div>

          {/* Quick Province Selector Pills */}
          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
            {PROVINCE_WAGE_BENCHMARKS.map((prov) => (
              <button
                key={prov.provCode}
                onClick={() => setActiveProv(prov.provCode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeProv === prov.provCode
                    ? 'bg-cyan-500 text-black shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {prov.provCode}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Province Wage Dashboard Card */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800/80 gap-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                Province Selected
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                {current.provName}
              </h3>
            </div>

            <div className="flex items-center gap-6 text-xs font-mono">
              <div>
                <span className="text-slate-500 block">General Min. Pay</span>
                <span className="text-slate-200 font-bold">{current.generalMinWage}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Tech Average</span>
                <span className="text-emerald-400 font-bold">{current.techMedianWage}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Nursing Average</span>
                <span className="text-emerald-400 font-bold">{current.healthMedianWage}</span>
              </div>
            </div>
          </div>

          {/* Table of Top In-Demand Occupations in this Province */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs font-mono uppercase tracking-wider">
                  <th className="pb-3 font-semibold">NOC Code</th>
                  <th className="pb-3 font-semibold">Official Job Title</th>
                  <th className="pb-3 font-semibold text-right">Median Hourly Pay</th>
                  <th className="pb-3 font-semibold text-right">Estimated Yearly Pay</th>
                  <th className="pb-3 font-semibold text-right">Has Benefits?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {current.topOccupations.map((job) => (
                  <tr key={job.noc} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="py-3.5 font-mono font-semibold">
                      <Link href={`/noc/${job.noc}`} className="text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center gap-1">
                        <span>{job.noc}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">↗</span>
                      </Link>
                    </td>
                    <td className="py-3.5 font-medium text-slate-200">
                      <Link href={`/noc/${job.noc}`} className="hover:text-cyan-300 transition-colors">
                        {job.title}
                      </Link>
                    </td>
                    <td className="py-3.5 font-mono text-emerald-400 font-bold text-right">{job.medianWage}</td>
                    <td className="py-3.5 font-mono text-slate-300 text-right">{job.annualEst}</td>
                    <td className="py-3.5 font-mono text-cyan-300 text-right">{job.benefitPct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Explore Full Province Hub Link */}
          <div className="mt-4 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-800/80">
            <div className="text-xs text-slate-400">
              Showing top 5 benchmark jobs. Check all occupations with median, low &amp; high rates in {current.provName.split('(')[0].trim()}.
            </div>
            <Link
              href={`/wages/${PROV_SLUGS[current.provCode] || 'ontario'}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-300 hover:text-white text-xs font-mono font-bold transition-all shrink-0 cursor-pointer"
            >
              <span>Explore All {current.provCode} Wages</span>
              <span>→</span>
            </Link>
          </div>

          {/* LMIA Pro Tip Alert */}
          <div className="mt-6 p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/20 flex items-start gap-3 text-xs text-slate-300">
            <span className="text-cyan-400 text-base">💡</span>
            <div>
              <strong className="text-cyan-300 font-semibold">Simple LMIA Rule:</strong>{' '}
              For your work permit to get approved, your job offer must pay at least the median wage for your job in that province. If it pays less, your employer has to follow much stricter hiring rules.
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
