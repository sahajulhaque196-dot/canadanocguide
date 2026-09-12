import React from 'react'
import Link from 'next/link'
import allNocs from '@/data/allNocsDetail.json'
import type { NocRecord } from '@/types/noc'

interface RelatedNocsProps {
  currentCode: string
  currentTeer: number
  broadCategory: string
  priorityCategory: string
  title: string
}

const CATEGORY_SLUGS: Record<string, string> = {
  'STEM Priority': 'stem',
  'Healthcare Priority': 'healthcare',
  'Trade Occupations': 'trades',
  'Transport Occupations': 'transport',
  'Agriculture and Agri-Food Occupations': 'agriculture',
  'French Language Proficiency': 'french',
}

const SECTOR_NAMES: Record<string, string> = {
  '0': 'Legislative and Senior Management',
  '1': 'Business, Finance and Administration',
  '2': 'Natural and Applied Sciences (Tech & Engineering)',
  '3': 'Health Occupations',
  '4': 'Education, Law, Community and Government',
  '5': 'Art, Culture, Recreation and Sport',
  '6': 'Sales and Service Occupations',
  '7': 'Trades, Transport and Equipment Operators',
  '8': 'Natural Resources, Agriculture and Production',
  '9': 'Manufacturing and Utilities',
}

export default function RelatedNocs({
  currentCode,
  currentTeer,
  broadCategory,
  priorityCategory,
  title,
}: RelatedNocsProps) {
  const allNocsMap = allNocs as Record<string, NocRecord>
  const allEntries = Object.values(allNocsMap)

  // Get all peer NOCs in the same broad category
  const broadPeers = allEntries.filter(
    (n) => n.broadCategory === broadCategory && n.code !== currentCode
  )

  const currentMg = currentCode.slice(0, 2)

  // Sort by semantic proximity: same major group first, then numeric proximity in StatCan taxonomy
  const sortedPeers = [...broadPeers].sort((a, b) => {
    // 1. Priority Category match (e.g. STEM with STEM)
    const aPri = priorityCategory !== 'General Stream' && a.priorityCategory === priorityCategory ? 1 : 0
    const bPri = priorityCategory !== 'General Stream' && b.priorityCategory === priorityCategory ? 1 : 0
    if (aPri !== bPri) return bPri - aPri

    // 2. Same 2-digit Major Group
    const aMg = a.code.slice(0, 2) === currentMg ? 1 : 0
    const bMg = b.code.slice(0, 2) === currentMg ? 1 : 0
    if (aMg !== bMg) return bMg - aMg

    // 3. Numeric proximity
    const diffA = Math.abs(parseInt(a.code, 10) - parseInt(currentCode, 10))
    const diffB = Math.abs(parseInt(b.code, 10) - parseInt(currentCode, 10))
    return diffA - diffB
  })

  // Pick top 4 closest semantic peers
  const selected: NocRecord[] = []
  for (let i = 0; i < Math.min(4, sortedPeers.length); i++) {
    selected.push(sortedPeers[i])
  }

  // Pick remaining 2 cyclically from the sector list to guarantee complete graph traversal
  const peerCodes = broadPeers.map((p) => p.code).sort()
  const currentIndex = peerCodes.indexOf(currentCode)
  for (let step = 1; selected.length < 6 && step < peerCodes.length; step++) {
    const nextCode = peerCodes[(currentIndex + step) % peerCodes.length]
    if (nextCode !== currentCode && !selected.some((s) => s.code === nextCode)) {
      const found = allNocsMap[nextCode]
      if (found) selected.push(found)
    }
  }

  if (selected.length === 0) return null

  const sectorName = SECTOR_NAMES[broadCategory] || 'Similar Occupational Field'

  return (
    <section
      id="related-occupations"
      className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase mb-1">
            Topic Cluster &bull; {sectorName}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Related Occupations &amp; Alternative Career Codes
          </h2>
        </div>
        <Link
          href="/noc"
          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Browse All 516 NOCs</span>
          <span>→</span>
        </Link>
      </div>

      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
        If your daily responsibilities for <strong className="text-white">{title}</strong> overlap with other roles, compare duties and prevailing salaries across these closely related NOC codes:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {selected.map((peer) => {
          const categorySlug = CATEGORY_SLUGS[peer.priorityCategory]
          const medianWage =
            peer.wages?.national?.median ||
            peer.wages?.provinces?.['ON']?.median ||
            'Varies by province'

          return (
            <div
              key={peer.code}
              className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <Link
                    href={`/noc/${peer.code}`}
                    className="font-mono text-sm font-bold text-cyan-400 group-hover:text-cyan-300 hover:underline"
                  >
                    NOC {peer.code}
                  </Link>

                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/teer/${peer.teer}`}
                      className="text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700 bg-slate-900 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
                      title={`View TEER ${peer.teer} Education & PR Guide`}
                    >
                      TEER {peer.teer}
                    </Link>

                    {categorySlug && (
                      <Link
                        href={`/express-entry/${categorySlug}`}
                        className="text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                        title={`View Express Entry ${peer.priorityCategory} Rounds`}
                      >
                        {categorySlug.toUpperCase()}
                      </Link>
                    )}
                  </div>
                </div>

                <Link
                  href={`/noc/${peer.code}`}
                  className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors block line-clamp-2"
                >
                  {peer.title}
                </Link>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {peer.leadStatement}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Median Pay</span>
                  <span className="font-mono font-semibold text-emerald-400">{medianWage}</span>
                </div>

                <Link
                  href={`/noc/${peer.code}`}
                  className="font-mono text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-xs"
                >
                  <span>Duties</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
