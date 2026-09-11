'use client'

import React, { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface NocItem {
  code: string
  title: string
  teer: number
  category: string
  wage: string
  isEE?: boolean
  topTitles?: string[]
  noc2016?: string[]
  noc2016Titles?: string[]
}

export interface NocDirectoryTableProps {
  initialItems?: NocItem[]
}

function NocDirectoryTableInner({ initialItems }: NocDirectoryTableProps) {
  const searchParams = useSearchParams()
  const qParam = searchParams.get('q') || ''
  const catParam = searchParams.get('category') || 'all'
  const teerParam = searchParams.get('teer') || 'all'

  // Manage user-override state, defaulting to URL parameters
  const [userQuery, setUserQuery] = useState<string | null>(null)
  const [userTeer, setUserTeer] = useState<string | null>(null)
  const [userCategory, setUserCategory] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [items, setItems] = useState<NocItem[]>(initialItems || [])
  const [isLoading, setIsLoading] = useState(!initialItems || initialItems.length === 0)

  const activeQuery = userQuery ?? qParam
  const activeTeer = userTeer ?? teerParam
  const activeCategory = userCategory ?? catParam

  useEffect(() => {
    import('@/data/searchIndex.json')
      .then((mod) => {
        setItems(mod.default as NocItem[])
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load search index:', err)
        setIsLoading(false)
      })
  }, [])

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // TEER filter
      if (activeTeer !== 'all' && item.teer.toString() !== activeTeer) {
        return false
      }

      // Priority Category or Broad Sector filter
      if (activeCategory !== 'all') {
        if (activeCategory === 'stem' && !item.category.includes('STEM')) return false
        if (activeCategory === 'health' && !item.category.includes('Health')) return false
        if (activeCategory === 'trades' && !item.category.includes('Trade')) return false
        if (activeCategory === 'transport' && !item.category.includes('Transport')) return false
        if (activeCategory === 'agri' && !item.category.includes('Agri')) return false
        if (activeCategory === 'ee' && !item.isEE) return false
        // 1-digit broad category check (e.g. category="2" matches item.code starting with "2")
        if (/^[0-9]$/.test(activeCategory) && !item.code.startsWith(activeCategory)) return false
      }

      // Search Query
      if (activeQuery.trim()) {
        const q = activeQuery.toLowerCase()
        const matchCode = item.code.includes(q)
        const matchTitle = item.title.toLowerCase().includes(q)
        const matchNoc2016 = item.noc2016 && item.noc2016.some((c) => c.includes(q))
        const matchNoc2016Title = item.noc2016Titles && item.noc2016Titles.some((t) => t.toLowerCase().includes(q))
        const matchAliases = item.topTitles && item.topTitles.some((t) => t.toLowerCase().includes(q))
        if (!matchCode && !matchTitle && !matchNoc2016 && !matchNoc2016Title && !matchAliases) return false
      }

      return true
    })
  }, [items, activeQuery, activeTeer, activeCategory])

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const startIdx = (currentPage - 1) * pageSize
  const paginatedItems = filteredItems.slice(startIdx, startIdx + pageSize)

  // Generate smart page numbers (e.g. 1 2 3 ... 52)
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
      
      {/* Search & Filter Controls */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={activeQuery}
            aria-label="Search all 516 occupations by title, keyword, or 5-digit code"
            onChange={(e) => {
              setUserQuery(e.target.value)
              setPage(1)
            }}
            placeholder="Search all 516 occupations by title, keyword (e.g. React, Chef, Electrician), or 5-digit code..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500 font-medium"
          />
          {activeQuery && (
            <button
              onClick={() => {
                setUserQuery('')
                setPage(1)
              }}
              className="absolute right-3.5 top-3 text-xs text-slate-500 hover:text-slate-200"
            >
              ✕ Clear
            </button>
          )}
        </div>

        {/* Filter Rows */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
          
          {/* TEER Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-slate-400 mr-1">TEER:</span>
            {['all', '0', '1', '2', '3', '4', '5'].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setUserTeer(t)
                  setPage(1)
                }}
                className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-all cursor-pointer ${
                  activeTeer === t
                    ? 'bg-cyan-500 text-black shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {t === 'all' ? 'All' : `TEER ${t}`}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-slate-400 mr-1">Stream:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'ee', label: 'Express Entry' },
              { id: 'stem', label: 'STEM' },
              { id: 'health', label: 'Health' },
              { id: 'trades', label: 'Trades' },
              { id: 'transport', label: 'Transport' },
              { id: 'agri', label: 'Agriculture' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setUserCategory(cat.id)
                  setPage(1)
                }}
                className={`px-2.5 py-1 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Results Header with Page Size Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
        <div>
          Showing <span className="text-cyan-400 font-bold">{filteredItems.length === 0 ? 0 : startIdx + 1}–{Math.min(startIdx + pageSize, filteredItems.length)}</span> of <span className="text-slate-200 font-bold">{filteredItems.length}</span> occupations
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

      {/* Directory Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs font-mono uppercase tracking-wider bg-slate-950/70">
                <th className="py-3.5 px-4 font-semibold">NOC Code</th>
                <th className="py-3.5 px-4 font-semibold">Job Title</th>
                <th className="py-3.5 px-4 font-semibold">TEER</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold text-right">Median Pay</th>
                <th className="py-3.5 px-4 font-semibold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-slate-400 font-mono text-sm">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                      <span>Loading NOC Directory database...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-mono text-xs">
                    No occupations found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedItems.map((item) => (
                  <tr key={item.code} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">
                      <Link href={`/noc/${item.code}`} className="hover:underline">
                        NOC {item.code}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-100">
                      <Link href={`/noc/${item.code}`} className="hover:text-cyan-300 transition-colors">
                        {item.title}
                      </Link>
                      {item.noc2016 && item.noc2016.length > 0 && (
                        <div className="text-[11px] font-mono text-amber-400/90 mt-0.5">
                          Former 2016: {item.noc2016.join(', ')}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                        TEER {item.teer}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-mono text-slate-400">
                      <span className={`${
                        item.category !== 'General Stream' ? 'text-emerald-400 font-semibold' : 'text-slate-400'
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold text-right">
                      {item.wage}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/noc/${item.code}`}
                        className="text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center gap-1"
                      >
                        <span>View</span>
                        <span>→</span>
                      </Link>
                    </td>
                  </tr>
                ))
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

export default function NocDirectoryTable({ initialItems }: NocDirectoryTableProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400 font-mono text-xs">Loading NOC Directory...</div>}>
      <NocDirectoryTableInner initialItems={initialItems} />
    </Suspense>
  )
}
