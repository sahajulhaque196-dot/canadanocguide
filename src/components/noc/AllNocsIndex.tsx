import React from 'react'
import Link from 'next/link'
import allNocs from '@/data/allNocsDetail.json'
import { BROAD_SECTORS } from '@/data/broadSectorsData'

interface NocSummary {
  code: string
  title: string
  teer: number
  priorityCategory?: string
}

export default function AllNocsIndex() {
  // Group all 516 NOCs by 1-digit broad category
  const grouped: Record<string, NocSummary[]> = {}
  for (let i = 0; i <= 9; i++) {
    grouped[i.toString()] = []
  }

  Object.entries(allNocs).forEach(([code, data]) => {
    const broadDigit = code[0]
    if (grouped[broadDigit]) {
      grouped[broadDigit].push({
        code,
        title: (data as { title: string }).title,
        teer: (data as { teer: number }).teer,
        priorityCategory: (data as { priorityCategory?: string }).priorityCategory,
      })
    }
  })

  // Sort each group by code
  Object.keys(grouped).forEach((digit) => {
    grouped[digit].sort((a, b) => a.code.localeCompare(b.code))
  })

  return (
    <section id="all-nocs-index" className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-10 space-y-8 backdrop-blur-xl">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-wider">
          Complete Occupational Index
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Browse All 516 Canadian NOC Codes by Sector
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          Direct directory access to all 516 unit groups in the official National Occupational Classification (NOC 2021 Version 1.0). Select any occupation to view daily duties, employment requirements, TEER levels, and regional prevailing wages.
        </p>
      </div>

      <div className="space-y-8">
        {BROAD_SECTORS.map((sector) => {
          const list = grouped[sector.code] || []
          return (
            <div
              key={sector.code}
              className="p-5 sm:p-6 rounded-2xl border border-slate-800/80 bg-slate-950/60 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl" aria-hidden="true">
                    {sector.icon}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      Sector {sector.code}: {sector.title}
                    </h3>
                    <span className="text-xs text-slate-400">
                      {sector.description}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full shrink-0 self-start sm:self-auto">
                  {list.length} Unit Groups
                </span>
              </div>

              {/* Grid of all NOCs in this sector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                {list.map((item) => (
                  <Link
                    key={item.code}
                    href={`/noc/${item.code}`}
                    className="group flex items-center justify-between p-2.5 rounded-xl border border-slate-800/60 bg-slate-900/40 hover:bg-slate-800/60 hover:border-cyan-500/40 transition-all text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span className="font-mono font-bold text-cyan-400 group-hover:text-cyan-300 shrink-0">
                        {item.code}
                      </span>
                      <span className="text-slate-300 group-hover:text-white truncate" title={item.title}>
                        {item.title}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 shrink-0">
                      T{item.teer}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
