'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'

interface ConcordanceItem {
  code2016: string
  title2016: string
  changeType: string
  code2021: string
  title2021: string
  notes: string
}

// Skill level mapping for 2016 codes based on second digit
function getSkillLevel(code2016: string): { level: string; desc: string; color: string } {
  if (code2016.startsWith('0')) {
    return { level: 'Skill Type 0', desc: 'Management', color: 'border-purple-500/40 bg-purple-500/10 text-purple-300' }
  }
  const second = code2016[1]
  if (second === '1') {
    return { level: 'Skill Level A', desc: 'Professional (Degree)', color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300' }
  }
  if (second === '2' || second === '3') {
    return { level: 'Skill Level B', desc: 'Technical & Skilled Trades', color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' }
  }
  if (second === '4' || second === '5') {
    return { level: 'Skill Level C', desc: 'Intermediate (Secondary)', color: 'border-amber-500/40 bg-amber-500/10 text-amber-300' }
  }
  return { level: 'Skill Level D', desc: 'Labor & On-the-job', color: 'border-slate-500/40 bg-slate-500/10 text-slate-300' }
}

// TEER category from 2021 code second digit
function getTeerLevel(code2021: string): { teer: number; isEE: boolean } {
  const teer = parseInt(code2021[1], 10) || 0
  return {
    teer,
    isEE: teer <= 3
  }
}

export default function NocConverterTool() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<'all' | 'code-change' | 'split' | 'transfer'>('all')
  const [page, setPage] = useState(1)
  const pageSize = 15

  const [items, setItems] = useState<ConcordanceItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    import('@/data/nocConcordance.json')
      .then((mod) => {
        setItems(((mod.default as { concordanceList?: ConcordanceItem[] }).concordanceList) || [])
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load concordance data:', err)
        setIsLoading(false)
      })
  }, [])

  // Quick preset queries for high-volume searches
  const POPULAR_CONVERSIONS = [
    { code: '2174', label: '2174 (Programmers)' },
    { code: '2171', label: '2171 (Analysts)' },
    { code: '2173', label: '2173 (Software Eng)' },
    { code: '3012', label: '3012 (RNs & Nurses)' },
    { code: '6311', label: '6311 (Food Supervisors)' },
    { code: '7511', label: '7511 (Truck Drivers)' },
    { code: '7241', label: '7241 (Electricians)' },
    { code: '0111', label: '0111 (Finance Mgrs)' },
  ]

  // Filtered and Searched items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Type filter
      if (activeFilter === 'code-change' && !item.changeType.includes('Code Change')) return false
      if (activeFilter === 'split' && !item.changeType.includes('Split')) return false
      if (activeFilter === 'transfer' && !item.changeType.includes('Transfer')) return false

      // Query filter
      if (query.trim()) {
        const q = query.toLowerCase().trim()
        const match2016 = item.code2016.includes(q)
        const match2021 = item.code2021.includes(q)
        const matchTitle16 = item.title2016.toLowerCase().includes(q)
        const matchTitle21 = item.title2021.toLowerCase().includes(q)
        const matchNotes = item.notes.toLowerCase().includes(q)
        return match2016 || match2021 || matchTitle16 || matchTitle21 || matchNotes
      }

      return true
    })
  }, [items, query, activeFilter])

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const paginatedItems = filteredItems.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Direct conversion focus if user types exact 4 or 5 digit code
  const exactMatch2016 = useMemo(() => {
    const q = query.trim()
    if (q.length === 4 && /^\d+$/.test(q)) {
      return items.filter(i => i.code2016 === q)
    }
    return []
  }, [items, query])

  return (
    <div className="space-y-8">
      {/* Search Bar Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-slate-950/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
              Official StatCan Concordance Lookup
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white font-[var(--font-space)]">
              Search Any 2016 Code, 2021 Code, or Occupation Title
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800 shrink-0">
            585 Official Transitions
          </span>
        </div>

        {/* Input */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(1)
            }}
            placeholder="Type old 4-digit code (e.g. 2174), new 5-digit code (e.g. 21232), or job title..."
            className="w-full px-4 py-3.5 pl-11 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base">
            🔍
          </span>
          {query && (
            <button
              onClick={() => { setQuery(''); setPage(1); }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-mono px-2 py-1 rounded bg-slate-800"
            >
              Clear
            </button>
          )}
        </div>

        {/* Popular chips */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-xs text-slate-400 font-mono">Popular Conversions:</span>
          {POPULAR_CONVERSIONS.map((chip) => (
            <button
              key={chip.code}
              onClick={() => {
                setQuery(chip.code)
                setPage(1)
              }}
              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Conversion Box (when 4-digit exact code is typed) */}
      {exactMatch2016.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl border border-amber-500/40 bg-gradient-to-br from-slate-950 via-slate-900/90 to-amber-950/20 backdrop-blur-xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <h3 className="text-base sm:text-lg font-bold text-white font-[var(--font-space)]">
                NOC {exactMatch2016[0].code2016} Transition Details
              </h3>
            </div>
            <span className="text-xs font-mono text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              {exactMatch2016.length === 1 ? '1 New NOC 2021 Code' : `Split into ${exactMatch2016.length} NOC 2021 Codes`}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Old 2016 Card */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">Legacy NOC 2016 System</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${getSkillLevel(exactMatch2016[0].code2016).color}`}>
                  {getSkillLevel(exactMatch2016[0].code2016).level}
                </span>
              </div>
              <div className="font-mono text-2xl font-extrabold text-amber-400">
                NOC {exactMatch2016[0].code2016}
              </div>
              <div className="text-sm font-semibold text-slate-100">
                {exactMatch2016[0].title2016}
              </div>
              <p className="text-xs text-slate-400">
                Category: {getSkillLevel(exactMatch2016[0].code2016).desc}
              </p>
            </div>

            {/* New 2021 Target Cards */}
            <div className="space-y-3">
              {exactMatch2016.map((m) => {
                const teerInfo = getTeerLevel(m.code2021)
                return (
                  <div
                    key={m.code2021}
                    className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-slate-900/80 border border-cyan-500/30 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-lg font-bold text-cyan-400">
                          NOC {m.code2021}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                          TEER {teerInfo.teer}
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        teerInfo.isEE ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {teerInfo.isEE ? '✓ Express Entry' : 'PNP Only'}
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-white">
                      {m.title2021}
                    </div>

                    {m.notes && (
                      <div className="text-xs text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800 font-mono">
                        {m.notes}
                      </div>
                    )}

                    <div className="pt-1">
                      <Link
                        href={`/noc/${m.code2021}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <span>View Duties, Wages &amp; Reference Letter Checklist for NOC {m.code2021}</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Concordance Directory Table */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-950/70 backdrop-blur-xl space-y-6">
        {/* Table Filters & Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: `All Mappings (${items.length})` },
              { id: 'code-change', label: 'Direct Code Changes' },
              { id: 'split', label: 'Split Occupations' },
              { id: 'transfer', label: 'Transferred Roles' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setActiveFilter(f.id as 'all' | 'code-change' | 'split' | 'transfer')
                  setPage(1)
                }}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-cyan-500 text-black font-bold shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-slate-400">
            Showing <strong className="text-white">{filteredItems.length}</strong> matching records
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs font-mono uppercase tracking-wider">
                <th className="pb-3 px-3">Old NOC 2016 (4-Digit)</th>
                <th className="pb-3 px-3">Type of Change</th>
                <th className="pb-3 px-3">New NOC 2021 (5-Digit)</th>
                <th className="pb-3 px-3">TEER Level</th>
                <th className="pb-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-slate-400 font-mono text-xs">
                    <div className="w-6 h-6 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mx-auto mb-3" />
                    Loading official concordance database...
                  </td>
                </tr>
              ) : paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 font-mono text-xs">
                    No conversion records found matching &ldquo;{query}&rdquo;.
                  </td>
                </tr>
              ) : (
                paginatedItems.map((item, idx) => {
                  const teerInfo = getTeerLevel(item.code2021)
                  const skill = getSkillLevel(item.code2016)

                  return (
                    <tr key={`${item.code2016}-${item.code2021}-${idx}`} className="hover:bg-slate-900/50 transition-colors">
                      {/* Old NOC 2016 */}
                      <td className="py-3.5 px-3">
                        <div className="font-mono font-bold text-amber-400 text-sm">
                          NOC {item.code2016}
                        </div>
                        <div className="text-xs text-slate-200 mt-0.5 max-w-xs">
                          {item.title2016}
                        </div>
                        <span className="inline-block mt-1 text-[10px] font-mono text-slate-400">
                          {skill.level}
                        </span>
                      </td>

                      {/* Change Type */}
                      <td className="py-3.5 px-3 font-mono text-[11px] text-slate-400 max-w-xs">
                        <span className={`px-2 py-0.5 rounded ${
                          item.changeType.includes('Split')
                            ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                            : item.changeType.includes('Transfer')
                            ? 'bg-blue-500/10 text-blue-300 border border-blue-500/30'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {item.changeType.split(',')[0]}
                        </span>
                        {item.notes && (
                          <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                            {item.notes}
                          </div>
                        )}
                      </td>

                      {/* New NOC 2021 */}
                      <td className="py-3.5 px-3">
                        <Link
                          href={`/noc/${item.code2021}`}
                          className="font-mono font-bold text-cyan-400 hover:text-cyan-300 hover:underline text-sm"
                        >
                          NOC {item.code2021}
                        </Link>
                        <div className="text-xs text-white font-medium mt-0.5 max-w-xs">
                          {item.title2021}
                        </div>
                      </td>

                      {/* TEER */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-xs font-bold border border-slate-700">
                            TEER {teerInfo.teer}
                          </span>
                          {teerInfo.isEE ? (
                            <span className="text-[10px] text-emerald-400 font-mono font-bold">
                              ✓ EE
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-500 font-mono">
                              PNP
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-3 text-right">
                        <Link
                          href={`/noc/${item.code2021}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold transition-all"
                        >
                          <span>Guide</span>
                          <span>→</span>
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
            <div className="text-xs text-slate-400 font-mono">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                ← Previous
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
