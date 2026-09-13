'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import eeDraws from '@/data/eeDraws.json'

interface SearchItem {
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

const latestDraw = eeDraws[0]

const QUICK_STATS = [
  { val: '516', title: 'Official NOC Codes', desc: 'Complete 2021 list' },
  { val: eeDraws.length.toString(), title: 'Express Entry Draws', desc: 'Latest CRS cutoffs' },
  { val: '44,376', title: 'Real Wage Records', desc: 'Job Bank 2025/26 data' },
  { val: '40,000+', title: 'Job Titles Covered', desc: 'Search any job role' }
]

export default function ModernHero() {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const imageBoxRef = useRef<HTMLDivElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const searchDbRef = useRef<SearchItem[] | null>(null)

  // Lazy-load 219KB search database only on demand
  const loadSearchDb = async () => {
    if (!searchDbRef.current) {
      const mod = await import('@/data/searchIndex.json')
      searchDbRef.current = mod.default as SearchItem[]
    }
    return searchDbRef.current
  }

  // Live Auto-Search over all 516 NOCs and 40,000+ aliases
  useEffect(() => {
    let active = true
    const timer = setTimeout(() => {
      if (searchInput.trim().length >= 2) {
        const q = searchInput.toLowerCase()
        loadSearchDb().then((db) => {
          if (!active) return
          const matches = db.filter((item) =>
            item.title.toLowerCase().includes(q) ||
            item.code.includes(q) ||
            (item.noc2016 && item.noc2016.some((c) => c.includes(q))) ||
            (item.noc2016Titles && item.noc2016Titles.some((t) => t.toLowerCase().includes(q))) ||
            item.category.toLowerCase().includes(q) ||
            (item.topTitles && item.topTitles.some((t) => t.toLowerCase().includes(q)))
          ).slice(0, 6)
          setSearchResults(matches)
          setIsDropdownOpen(matches.length > 0)
        })
      } else {
        if (active) {
          setSearchResults([])
          setIsDropdownOpen(false)
        }
      }
    }, 150)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [searchInput])

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = searchInput.trim()
    if (!trimmed) return

    if (searchResults.length > 0) {
      router.push(`/noc/${searchResults[0].code}`)
    } else {
      router.push(`/noc?q=${encodeURIComponent(trimmed)}`)
    }
    setIsDropdownOpen(false)
  }

  // Mouse tilt for image box - direct ref manipulation to prevent React re-renders at 60fps
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageBoxRef.current) return
    const rect = imageBoxRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const tiltX = -(y / rect.height) * 16
    const tiltY = (x / rect.width) * 16
    imageBoxRef.current.style.transform = `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    imageBoxRef.current.style.transition = 'transform 0.08s ease-out'
  }

  const handleMouseLeave = () => {
    if (!imageBoxRef.current) return
    imageBoxRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    imageBoxRef.current.style.transition = 'transform 0.5s ease-out'
  }

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-6 pt-24 sm:pt-28 pb-6 sm:pb-8 overflow-hidden bg-transparent">
      
      {/* ─── MAIN 2-COLUMN BALANCED HERO (PERFECT VERTICAL FILL) ─── */}
      <div className="relative max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-0 z-10 pointer-events-auto">
        
        {/* ─── LEFT 7 COLS: RICH SEO HEADLINE + LIVE OMNI-SEARCH + CATEGORY DRAWS + E-E-A-T PROOF ─── */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4 lg:space-y-5 pr-2">
          
          {/* Live System Indicator Badge */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/40 bg-slate-950/85 text-cyan-300 text-[11px] font-mono tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.2)] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>OFFICIAL 2026 DATA // LATEST DRAW #{latestDraw?.number || 441} (CRS {latestDraw?.crs || 475})</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
              UPDATED FOR 2026
            </span>
          </div>

          {/* Master SEO Headline */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-extrabold tracking-tight text-white font-[var(--font-space)] leading-[1.08] drop-shadow-md">
              Canada NOC Code Finder 2026:{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                Search NOC Codes &amp; TEER
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed pt-0.5">
              The free <strong className="text-white">Canada NOC code finder</strong> indexing all 516 <strong className="text-white">NOC codes (2021 version)</strong>. Check your <strong className="text-cyan-300">TEER categories</strong>, track latest <strong className="text-white">Express Entry draws (2026)</strong>, calculate CRS points, and compare official Job Bank salaries across all 13 provinces.
            </p>
          </div>

          {/* ─── MASSIVE OMNI SEARCH BAR WITH WORKING LIVE AUTOCOMPLETE ─── */}
          <div ref={searchContainerRef} className="relative max-w-xl">
            <form 
              onSubmit={handleSearchSubmit}
              className="relative flex items-center rounded-2xl border border-cyan-500/40 bg-slate-950/95 p-2 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.2)] transition-all focus-within:border-cyan-400 focus-within:shadow-[0_0_35px_rgba(6,182,212,0.4)]"
            >
              <div className="pl-3 pr-2 text-cyan-400 text-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                aria-label="Search job title or NOC code"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search job title (e.g. Software, Nurse, Cook) or NOC..."
                className="w-full bg-transparent py-2 px-2 text-white placeholder-slate-400 text-xs sm:text-sm outline-none font-medium"
              />
              {searchInput && (
                <button 
                  type="button"
                  onClick={() => setSearchInput('')}
                  className="px-2 text-slate-500 hover:text-slate-200 text-xs font-mono"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
              <button 
                type="submit"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 text-slate-950 text-xs font-bold tracking-wide transition-all shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
              >
                Find Pathways →
              </button>
            </form>

            {/* Live Autocomplete Results Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 p-2 rounded-2xl bg-slate-950/95 border border-cyan-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(6,182,212,0.25)] backdrop-blur-2xl z-50 space-y-1">
                <div className="px-2.5 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider flex justify-between border-b border-slate-800/80">
                  <span>MATCHING NOC UNIT GROUPS</span>
                  <span className="text-cyan-400">ESDC VERIFIED</span>
                </div>
                {searchResults.map((item) => (
                  <Link
                    key={item.code}
                    href={`/noc/${item.code}`}
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 hover:bg-cyan-950/40 border border-slate-800/60 hover:border-cyan-500/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        {item.code}
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5 flex-wrap">
                          <span>{item.title}</span>
                          {item.noc2016 && item.noc2016.length > 0 && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                              2016: {item.noc2016.join(', ')}
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          TEER {item.teer} · <span className="text-emerald-400">{item.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-slate-200">{item.wage}</div>
                      <div className="text-[9px] text-cyan-400 font-mono">
                        {item.isEE ? '✓ Express Entry' : 'PNP Stream'}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Quick Trending Chips */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
              <span className="text-xs text-slate-400 font-mono shrink-0">Trending:</span>
              {[
                { code: '21232', label: '21232 Software' },
                { code: '31301', label: '31301 Nurse' },
                { code: '72400', label: '72400 Electrician' },
                { code: '73300', label: '73300 Trucking' },
                { code: '62020', label: '62020 Food Mgr' }
              ].map((chip) => (
                <Link
                  key={chip.code}
                  href={`/noc/${chip.code}`}
                  className="px-2.5 py-1 rounded-lg text-xs bg-slate-950/80 text-slate-300 border border-slate-800 hover:border-cyan-400 hover:text-cyan-300 transition-all font-mono backdrop-blur-sm cursor-pointer"
                >
                  {chip.label}
                </Link>
              ))}
            </div>
          </div>


          {/* ─── NEW SEO SECTION 2: 3 CORE TRUST BADGES + E-E-A-T GOVT ATTRIBUTION ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-xl pt-1">
            <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/90 backdrop-blur-md">
              <div className="text-cyan-400 font-bold text-xs flex items-center gap-1.5">
                <span>🏛️</span>
                <span>StatCan NOC V1.0</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">516 Job Groups &amp; 40,000 Titles</div>
            </div>
            <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/90 backdrop-blur-md">
              <div className="text-purple-400 font-bold text-xs flex items-center gap-1.5">
                <span>💰</span>
                <span>Job Bank Wages</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Official 2025/2026 Pay Rates</div>
            </div>
            <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/90 backdrop-blur-md">
              <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                <span>🍁</span>
                <span>10 PNP Streams</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">OINP, BC PNP, AAIP & SINP</div>
            </div>
          </div>

        </div>

        {/* ─── RIGHT 5 COLS: FLOATING GLOWING IMAGE BOX OVER THE ROTATING TOPOLOGY ─── */}
        <div className="lg:col-span-5 relative flex items-center justify-center pointer-events-auto">
          
          {/* Glowing Ambient Cyan Halo */}
          <div className="absolute w-[400px] h-[400px] bg-cyan-500/35 rounded-full blur-[90px] pointer-events-none" />

          {/* Premium Glowing Card Box with 3D Mouse Parallax Tilt */}
          <div 
            ref={imageBoxRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[270px] sm:max-w-[360px] lg:max-w-[440px] aspect-square rounded-3xl p-[2px] overflow-hidden group shadow-[0_25px_60px_-10px_rgba(0,0,0,0.95),0_0_40px_rgba(6,182,212,0.35)] cursor-pointer"
          >
            {/* Spinning Neon Beam around border */}
            <div className="absolute -inset-[100%] animate-border-beam bg-[conic-gradient(from_0deg,transparent_0_300deg,#00f5ff_340deg,#ffffff_360deg)] pointer-events-none opacity-80" />

            <div className="w-full h-full rounded-[22px] overflow-hidden relative bg-slate-950/90 border border-cyan-500/30">
              <Image
                src="/pr-card-3d.jpg"
                alt="3D Canada Permanent Resident Card and Passport with Glowing Neon Border"
                fill
                sizes="(max-width: 768px) 340px, (max-width: 1024px) 400px, 440px"
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </div>

        </div>

      </div>

      {/* ─── BOTTOM 1-LINE STATS BAR ─── */}
      <div className="relative max-w-7xl mx-auto w-full mb-3 sm:mb-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 shrink-0 z-10">
        {QUICK_STATS.map((item, idx) => (
          <div 
            key={idx} 
            className="group relative h-full flex flex-col p-[1px] rounded-2xl overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(6,182,212,0.3)] transition-all duration-300 cursor-pointer"
          >
            {/* Animated Rotating Conic Gradient Light Beam on Border */}
            <div 
              className="absolute -inset-[150%] animate-border-beam bg-[conic-gradient(from_0deg,transparent_0_310deg,#22d3ee_340deg,#ffffff_360deg)] opacity-40 group-hover:opacity-100 transition-opacity duration-500" 
              style={{ animationDuration: `${3.5 + idx * 0.8}s` }}
            />

            {/* Inner Content Card (Uniform height and symmetrical layout across all screen sizes) */}
            <div className="relative h-full flex flex-col justify-between p-3 sm:p-3.5 rounded-[15px] bg-slate-950/90 border border-cyan-500/20 backdrop-blur-md">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-lg sm:text-xl font-extrabold text-white font-[var(--font-space)] tracking-tight group-hover:text-cyan-300 transition-colors">
                  {item.val}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 shadow-[0_0_8px_rgba(34,211,238,0.8)] shrink-0 sm:hidden" />
              </div>
              <div className="mt-1 sm:mt-1.5 border-t border-slate-800/80 pt-1.5 sm:pt-2">
                <div className="text-[11px] sm:text-xs font-semibold text-slate-200 leading-tight group-hover:text-cyan-300 transition-colors line-clamp-1 sm:line-clamp-none">
                  {item.title}
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 leading-tight line-clamp-1 sm:line-clamp-none">
                  {item.desc}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── SCROLL DOWN PROMPT ─── */}
      <div className="relative flex justify-center pb-2 z-10">
        <a 
          href="#categories" 
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-800 bg-slate-950/80 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-300 transition-all text-xs font-mono group"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>Scroll to explore</span>
          <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
        </a>
      </div>

    </section>
  )
}
