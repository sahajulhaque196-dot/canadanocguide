'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'

export interface ProvinceWageRow {
  code: string
  title: string
  teer: number
  category: string
  low: string
  median: string
  high: string
}

interface ProvinceWageTableProps {
  initialRows: ProvinceWageRow[]
  provName: string
}

export default function ProvinceWageTable({ initialRows, provName }: ProvinceWageTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTeer, setSelectedTeer] = useState<string>('all')
  const [page, setPage] = useState(1)
  const itemsPerPage = 35

  const filteredRows = useMemo(() => {
    return initialRows.filter((item) => {
      // TEER filter
      if (selectedTeer !== 'all' && item.teer.toString() !== selectedTeer) {
        return false
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchCode = item.code.includes(q)
        const matchTitle = item.title.toLowerCase().includes(q)
        if (!matchCode && !matchTitle) return false
      }

      return true
    })
  }, [initialRows, searchQuery, selectedTeer])

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage)
  const paginatedRows = filteredRows.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            All 516 Occupation Wages in {provName}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Search any occupation code or job title to check regional LMIA prevailing rates.
          </p>
        </div>
        <div className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 self-start md:self-auto">
          Showing {filteredRows.length} Occupations
        </div>
      </div>

      {/* Controls: Search & TEER Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setPage(1)
            }}
            placeholder={`Search ${provName} wages (e.g. Software, Nurse, 21232)...`}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-200"
            >
              ✕
            </button>
          )}
        </div>

        {/* TEER Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-mono text-slate-400 mr-1">TEER:</span>
          {['all', '0', '1', '2', '3', '4', '5'].map((t) => (
            <button
              key={t}
              onClick={() => {
                setSelectedTeer(t)
                setPage(1)
              }}
              className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-all cursor-pointer ${
                selectedTeer === t
                  ? 'bg-cyan-500 text-black shadow-sm'
                  : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {t === 'all' ? 'All' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-xs font-mono uppercase tracking-wider">
              <th className="pb-3 font-semibold">NOC Code</th>
              <th className="pb-3 font-semibold">Job Title</th>
              <th className="pb-3 font-semibold">TEER</th>
              <th className="pb-3 font-semibold text-right">Low Pay</th>
              <th className="pb-3 font-semibold text-right">Median Pay</th>
              <th className="pb-3 font-semibold text-right">High Pay</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {paginatedRows.length > 0 ? (
              paginatedRows.map((item) => (
                <tr key={item.code} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 font-mono font-bold text-cyan-400">
                    <Link href={`/noc/${item.code}`} className="hover:underline">
                      NOC {item.code}
                    </Link>
                  </td>
                  <td className="py-3 font-medium text-slate-200">
                    <Link href={`/noc/${item.code}`} className="hover:text-cyan-300 transition-colors">
                      {item.title}
                    </Link>
                  </td>
                  <td className="py-3 font-mono text-xs text-slate-300">
                    TEER {item.teer}
                  </td>
                  <td className="py-3 font-mono text-slate-400 text-right">
                    {item.low}
                  </td>
                  <td className="py-3 font-mono text-emerald-400 font-bold text-right">
                    {item.median}
                  </td>
                  <td className="py-3 font-mono text-slate-300 text-right">
                    {item.high}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400 font-mono text-xs">
                  No occupations found matching &quot;{searchQuery}&quot;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-mono">
          <span className="text-slate-400">
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-slate-700 cursor-pointer"
            >
              ← Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-slate-700 cursor-pointer"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
