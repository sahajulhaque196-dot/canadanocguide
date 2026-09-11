'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'

export interface CategoryNocItem {
  code: string
  title: string
  teer: number
  medianWage: string
}

interface CategoryNocTableProps {
  nocs: CategoryNocItem[]
  categoryTitle?: string
}

export default function CategoryNocTable({ nocs }: CategoryNocTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTeer, setSelectedTeer] = useState<string>('all')
  const [page, setPage] = useState(1)
  const pageSize = 20

  const filteredNocs = useMemo(() => {
    return nocs.filter((item) => {
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        item.code.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q)

      const matchesTeer =
        selectedTeer === 'all' || item.teer.toString() === selectedTeer

      return matchesSearch && matchesTeer
    })
  }, [nocs, searchQuery, selectedTeer])

  const totalPages = Math.max(1, Math.ceil(filteredNocs.length / pageSize))
  const currentPage = Math.min(page, totalPages)

  const paginatedNocs = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredNocs.slice(start, start + pageSize)
  }, [filteredNocs, currentPage, pageSize])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setPage(1)
  }

  const handleTeerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeer(e.target.value)
    setPage(1)
  }

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <svg
            className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={`Search ${nocs.length} eligible occupations by code or job title...`}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedTeer}
            onChange={handleTeerChange}
            className="px-3 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-cyan-500/60"
          >
            <option value="all">All TEER Levels</option>
            <option value="0">TEER 0 (Management)</option>
            <option value="1">TEER 1 (Degree)</option>
            <option value="2">TEER 2 (Diploma/Trade)</option>
            <option value="3">TEER 3 (Short College)</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Showing {filteredNocs.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–
          {Math.min(currentPage * pageSize, filteredNocs.length)} of {filteredNocs.length} occupations
          {filteredNocs.length !== nocs.length && ` (filtered from ${nocs.length})`}
        </span>
        {totalPages > 1 && (
          <span>
            Page {currentPage} of {totalPages}
          </span>
        )}
      </div>

      {/* Occupations Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800/80 bg-slate-950/50">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-xs font-mono uppercase tracking-wider bg-slate-900/50">
              <th className="py-3 px-4 font-semibold">NOC Code</th>
              <th className="py-3 px-4 font-semibold">Occupation Title</th>
              <th className="py-3 px-4 font-semibold">TEER</th>
              <th className="py-3 px-4 font-semibold text-right">Median Pay</th>
              <th className="py-3 px-4 font-semibold text-right">Check Duties</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {paginatedNocs.length > 0 ? (
              paginatedNocs.map((item) => (
                <tr key={item.code} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-cyan-400 whitespace-nowrap">
                    <Link href={`/noc/${item.code}`} className="hover:underline">
                      NOC {item.code}
                    </Link>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-200 min-w-[220px]">
                    <Link href={`/noc/${item.code}`} className="hover:text-cyan-300 transition-colors">
                      {item.title}
                    </Link>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-xs text-slate-300 border border-slate-700">
                      TEER {item.teer}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold text-right whitespace-nowrap">
                    {item.medianWage}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <Link
                      href={`/noc/${item.code}`}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
                    >
                      View Duties →
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-400 text-sm">
                  No occupations found matching &quot;{searchQuery}&quot;.
                  <br />
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedTeer('all')
                    }}
                    className="mt-3 text-xs font-mono text-cyan-400 hover:underline"
                  >
                    Clear search filters
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl text-xs font-mono font-medium border border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>

          <span className="text-xs font-mono text-slate-400">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl text-xs font-mono font-medium border border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}
