import React from 'react'
import Link from 'next/link'
import { EE_CATEGORIES } from '@/data/provinces'

export default function CategoryFastPass() {
  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-gradient-to-b from-[#030712] via-slate-950 to-[#030712]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Priority Jobs for PR
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Express Entry Priority Categories
            </h2>
            <p className="mt-2 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
              Canada now invites people based on their job. If your job falls in one of these 6 categories, you need a <span className="text-cyan-300 font-semibold">much lower CRS score</span> to get your permanent residency (PR).
            </p>
          </div>
          
          <Link 
            href="/express-entry-draws" 
            className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors group self-start md:self-auto"
          >
            <span>See All 442 Past Express Entry Draws</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EE_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/express-entry/${cat.id}`}
              className="relative group p-6 rounded-2xl border border-slate-800/90 bg-slate-900/40 hover:bg-slate-900/80 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              {/* Subtle top glow highlight */}
              <div 
                className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-15 group-hover:opacity-35 transition-opacity"
                style={{ backgroundColor: cat.color }}
              />

              <div>
                {/* Icon & Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-2xl shadow-inner">
                    {cat.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                      Recent Cutoff
                    </span>
                    <span className="text-lg font-bold font-mono text-emerald-400">
                      {cat.lastCRS > 0 ? `CRS ${cat.lastCRS}` : 'Pilot Stream'}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {cat.name}
                </h3>

                {/* Stats Breakdown */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-800/60 text-xs">
                  <div>
                    <span className="text-slate-500 block">Jobs Included</span>
                    <span className="font-semibold text-slate-200">
                      {cat.nocCount === 516 ? 'All Jobs (Universal)' : `${cat.nocCount} Occupations`}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Latest Draw</span>
                    <span className="font-semibold text-slate-200">{cat.lastDraw}</span>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-6 pt-3 flex items-center justify-between text-xs text-slate-400 group-hover:text-cyan-300">
                <span className="font-medium">Check Eligible NOCs</span>
                <span className="font-mono text-sm group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
