import React from 'react'
import Link from 'next/link'
import { BROAD_SECTORS } from '@/data/broadSectorsData'

export default function BroadSectors() {
  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#030712] via-slate-950/90 to-[#030712] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-mono uppercase tracking-wider mb-3">
              All 10 Job Sectors
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Browse Canadian Jobs by Industry
            </h2>
            <p className="mt-2 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
              Every job in Canada belongs to one of these 10 sectors. Pick your industry to check average pay, job duties, and PR options.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 self-start md:self-auto">
            10 Sectors • 516 Occupations
          </div>
        </div>

        {/* 10 Broad Sectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {BROAD_SECTORS.map((sector) => (
            <Link
              key={sector.code}
              href={`/noc?category=${sector.code}`}
              className="p-5 rounded-2xl border border-slate-800/90 bg-slate-900/30 hover:bg-slate-900/70 hover:border-cyan-500/40 transition-all duration-200 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{sector.icon}</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold group-hover:text-cyan-300">
                    SEC {sector.code}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                  {sector.shortTitle}
                </h3>

                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {sector.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/70">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Avg. Pay</span>
                  <span className="font-semibold text-emerald-400 font-mono">{sector.avgHourlyWage}</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-slate-400 font-mono">Job Groups</span>
                  <span className="font-semibold text-slate-300 font-mono">{sector.nocCount} groups</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
