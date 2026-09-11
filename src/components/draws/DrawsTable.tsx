'use client'

import React, { useState, useMemo } from 'react'
import drawsData from '@/data/eeDraws.json'

interface DrawItem {
  number: number
  date: string
  dateFull: string
  name: string
  size: string
  crs: number
}

const CATEGORY_FILTERS = [
  { id: 'all', label: `All Draws (${(drawsData as DrawItem[]).length})` },
  { id: 'general', label: 'General' },
  { id: 'cec', label: 'CEC' },
  { id: 'pnp', label: 'PNP' },
  { id: 'stem', label: 'STEM' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'trade', label: 'Trades' },
  { id: 'transport', label: 'Transport' },
  { id: 'agri', label: 'Agriculture' },
  { id: 'french', label: 'French' },
]

export default function DrawsTable() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const filteredDraws = useMemo(() => {
    return (drawsData as DrawItem[]).filter((d) => {
      const nameLower = d.name.toLowerCase()
      const queryLower = searchQuery.toLowerCase()

      // Category filter
      if (activeCategory !== 'all') {
        if (activeCategory === 'general' && !nameLower.includes('general') && !nameLower.includes('no program specified')) return false
        if (activeCategory === 'stem' && !nameLower.includes('stem')) return false
        if (activeCategory === 'healthcare' && !nameLower.includes('health') && !nameLower.includes('physician')) return false
        if (activeCategory === 'trade' && !nameLower.includes('trade')) return false
        if (activeCategory === 'transport' && !nameLower.includes('transport')) return false
        if (activeCategory === 'agri' && !nameLower.includes('agri')) return false
        if (activeCategory === 'french' && !nameLower.includes('french')) return false
        if (activeCategory === 'cec' && !nameLower.includes('canadian experience class') && !nameLower.includes('cec')) return false
        if (activeCategory === 'pnp' && !nameLower.includes('provincial nominee') && !nameLower.includes('pnp')) return false
      }

      // Search query
      if (searchQuery.trim()) {
        const matchesName = nameLower.includes(queryLower)
        const matchesDate = d.date.includes(queryLower)
        const matchesNum = d.number.toString().includes(queryLower)
        if (!matchesName && !matchesDate && !matchesNum) return false
      }

      return true
    })
  }, [activeCategory, searchQuery])

  const totalPages = Math.max(1, Math.ceil(filteredDraws.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const startIdx = (currentPage - 1) * pageSize
  const displayedDraws = filteredDraws.slice(startIdx, startIdx + pageSize)

  // Generate smart page numbers (e.g. 1 2 3 ... 45)
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) {
        pages.push('...')
      }
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i)
      }
      if (currentPage < totalPages - 2) {
        pages.push('...')
      }
      if (!pages.includes(totalPages)) pages.push(totalPages)
    }
    return pages
  }

  return (
    <div className="space-y-6">
      
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id)
                setPage(1)
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Quick Search Input */}
        <div className="relative min-w-[240px]">
          <input
            type="text"
            value={searchQuery}
            aria-label="Search draws by year or program"
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setPage(1)
            }}
            placeholder="Search draws by year or program..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('')
                setPage(1)
              }}
              aria-label="Clear draws search"
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

      </div>

      {/* Results Header with Page Size Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
        <div>
          Showing <span className="text-cyan-400 font-bold">{filteredDraws.length === 0 ? 0 : startIdx + 1}–{Math.min(startIdx + pageSize, filteredDraws.length)}</span> of <span className="text-slate-200 font-bold">{filteredDraws.length}</span> draws
        </div>
        
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          {[10, 25, 50].map((size) => (
            <button
              key={size}
              onClick={() => {
                setPageSize(size)
                setPage(1)
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                pageSize === size
                  ? 'bg-cyan-500 text-black shadow-sm'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Draws Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[580px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs font-mono uppercase tracking-wider bg-slate-950/70">
                <th className="py-3.5 px-4 font-semibold">Draw #</th>
                <th className="py-3.5 px-4 font-semibold">Date</th>
                <th className="py-3.5 px-4 font-semibold">Program / Category Stream</th>
                <th className="py-3.5 px-4 font-semibold text-right">Invitations (ITAs)</th>
                <th className="py-3.5 px-4 font-semibold text-right">CRS Cutoff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {displayedDraws.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 font-mono text-xs">
                    No rounds found matching your search criteria.
                  </td>
                </tr>
              ) : (
                displayedDraws.map((d) => {
                  const isLowScore = d.crs > 0 && d.crs <= 485
                  return (
                    <tr key={d.number} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">
                        #{d.number}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-mono text-slate-300">
                        {d.date}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-100">
                        {d.name}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300 text-right">
                        {d.size}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-right">
                        {d.crs > 0 ? (
                          <span className={`px-2.5 py-1 rounded-lg inline-block ${
                            isLowScore
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-200'
                          }`}>
                            {d.crs}
                          </span>
                        ) : (
                          <span className="text-slate-500 text-xs font-normal">Pilot / PNP</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Numbered Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs font-mono text-slate-400">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {/* Previous Button */}
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/80 text-xs font-mono text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
            >
              ← Prev
            </button>

            {/* Page Number Buttons */}
            {getPageNumbers().map((p, idx) => {
              if (p === '...') {
                return (
                  <span key={`dots-${idx}`} className="px-2 text-slate-500 font-mono text-xs">
                    …
                  </span>
                )
              }
              const pageNum = p as number
              const isActive = pageNum === currentPage
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`min-w-[34px] h-[34px] px-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}

            {/* Next Button */}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/80 text-xs font-mono text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
            >
              Next →
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
