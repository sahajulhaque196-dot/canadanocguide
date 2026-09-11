'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { TEER_LEVELS } from '@/data/teerData'

export default function TeerMatrix() {
  const [activeLevel, setActiveLevel] = useState<number>(1)
  const current = TEER_LEVELS.find((t) => t.level === activeLevel) || TEER_LEVELS[1]

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-transparent border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-mono uppercase tracking-wider mb-3">
            How TEER Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Find Out Which TEER Level Your Job Belongs To
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Canada groups all jobs into 6 <strong className="text-slate-200 font-semibold">TEER levels (0 to 5)</strong> based on the education and experience needed. Your TEER number tells you if you can apply directly for Express Entry or if you need to use a Provincial Nominee Program (PNP).
          </p>
        </div>

        {/* Interactive Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
          {TEER_LEVELS.map((t) => {
            const isSelected = t.level === activeLevel
            return (
              <button
                key={t.level}
                onClick={() => setActiveLevel(t.level)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-cyan-400/80 bg-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400/40'
                    : 'border-slate-800 bg-slate-950/60 hover:bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="font-mono text-xs font-bold text-slate-400">LEVEL</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      t.eeEligible ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                </div>
                <div className="text-xl font-extrabold font-mono text-white">TEER {t.level}</div>
                <div className="text-[11px] text-slate-400 mt-1 truncate">
                  {t.eeEligible ? '✓ Express Entry' : 'PNP & Pilots'}
                </div>
              </button>
            )
          })}
        </div>

        {/* Detailed Active TEER Card */}
        <div className="relative p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Overview & Requirements */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 font-mono text-cyan-400 font-bold text-sm">
                  TEER {current.level}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    current.eeEligible
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {current.eeEligible
                    ? '✓ Qualifies for Express Entry (FSW & CEC)'
                    : '⚠ Apply through Provincial Nominee (PNP) or Work Permit'}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white">{current.name}</h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{current.shortDef}</p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Education Needed
                  </span>
                  <p className="text-sm text-slate-200">{current.educationReq}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Experience &amp; Training
                  </span>
                  <p className="text-sm text-slate-200">{current.experienceReq}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Representative Occupations & Quick Stats */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Common Jobs in this TEER
                  </span>
                  <span className="text-xs font-mono text-cyan-400">
                    {current.nocCount} jobs in Canada
                  </span>
                </div>

                <div className="space-y-2.5">
                  {current.sampleNocs.map((item) => (
                    <Link
                      key={item.code}
                      href={`/noc/${item.code}`}
                      className="p-3 rounded-xl border border-slate-800/80 bg-slate-950/60 flex items-center justify-between hover:border-slate-700 transition-colors group cursor-pointer"
                    >
                      <div className="pr-3">
                        <span className="font-mono text-xs font-bold text-cyan-400 mr-2 group-hover:underline">
                          NOC {item.code}
                        </span>
                        <span className="text-xs text-slate-200 font-medium group-hover:text-white">{item.title}</span>
                      </div>
                      <span className="text-slate-500 text-xs font-mono group-hover:text-cyan-400 transition-colors">→</span>
                    </Link>
                  ))}
                </div>

                <Link
                  href={`/teer/${current.level}`}
                  className="mt-3 block text-center py-2 px-3 rounded-xl border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-950/40 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  View All {current.nocCount} Occupations in TEER {current.level} →
                </Link>
              </div>

              {/* PR Program Pathways */}
              <div className="pt-4 border-t border-slate-800/80">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                  PR Programs You Can Apply For
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {current.programEligibility.map((prog, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-slate-800 text-[11px] font-medium text-slate-300 border border-slate-700/60"
                    >
                      {prog}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
