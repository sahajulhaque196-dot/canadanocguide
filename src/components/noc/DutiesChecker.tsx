'use client'

import React, { useState } from 'react'

interface DutiesCheckerProps {
  duties: string[]
  code: string
  jobTitles?: string[]
}

export default function DutiesChecker({ duties, code, jobTitles = [] }: DutiesCheckerProps) {
  const [checkedIndices, setCheckedIndices] = useState<number[]>([])
  const [titleQuery, setTitleQuery] = useState('')

  const toggleDuty = (index: number) => {
    if (checkedIndices.includes(index)) {
      setCheckedIndices(checkedIndices.filter((i) => i !== index))
    } else {
      setCheckedIndices([...checkedIndices, index])
    }
  }

  const selectAll = () => {
    setCheckedIndices(duties.map((_, i) => i))
  }

  const clearAll = () => {
    setCheckedIndices([])
  }

  const matchedTitles = titleQuery.trim()
    ? jobTitles.filter((t) => t.toLowerCase().includes(titleQuery.toLowerCase().trim())).slice(0, 5)
    : []

  const total = duties.length
  const matched = checkedIndices.length
  const percentage = total > 0 ? Math.round((matched / total) * 100) : 0
  const isPassing = percentage >= 60
  const requiredForPass = Math.ceil(total * 0.60)
  const remainingNeeded = Math.max(0, requiredForPass - matched)

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Interactive Reference Letter Tool
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Official Main Duties for NOC {code}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Select the duties you perform in your actual job. Under IRCC guidelines, you must perform at least <span className="text-cyan-300 font-semibold">60%</span> of these duties for a successful work permit or PR reference letter.
          </p>
        </div>

        {/* Quick Bulk Actions */}
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
          <button
            type="button"
            onClick={selectAll}
            className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Select All
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 text-xs font-mono text-slate-400 hover:text-slate-300 transition-colors cursor-pointer"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Optional Job Title Alias Quick Matcher */}
      {jobTitles.length > 0 && (
        <div className="mb-6 p-4 rounded-xl border border-slate-800/80 bg-slate-950/60">
          <div className="flex items-center justify-between gap-2 mb-2">
            <label htmlFor="title-search" className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
              🔎 Check Your Company Job Title
            </label>
            <span className="text-[11px] text-slate-500 font-mono">{jobTitles.length} official aliases</span>
          </div>
          <input
            id="title-search"
            type="text"
            value={titleQuery}
            onChange={(e) => setTitleQuery(e.target.value)}
            placeholder="Type your title (e.g. Software Engineer, Team Lead, Associate)..."
            className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors"
          />
          {titleQuery.trim() && (
            <div className="mt-2.5 space-y-1">
              {matchedTitles.length > 0 ? (
                <div>
                  <span className="text-[11px] font-mono text-emerald-400 block mb-1">
                    ✓ Matches Official Canadian Aliases:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {matchedTitles.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-[11px] text-slate-400 font-mono">
                  No exact match in the {jobTitles.length} official aliases. Remember: Your job title does not have to match word-for-word, but your main duties must match!
                </div>
              )}
            </div>
          )}
        </div>
      )}


      {/* 2-Column Split: Left = Scrolling Duties, Right = Sticky Live Scoring */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (7 cols): Scrollable List of Duties */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between pb-1">
            <span>Checklist ({duties.length} official duties):</span>
            <span className="text-slate-500">Click each to toggle</span>
          </div>

          {duties.map((duty, idx) => {
            const isChecked = checkedIndices.includes(idx)
            return (
              <button
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                key={idx}
                onClick={() => toggleDuty(idx)}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault()
                    toggleDuty(idx)
                  }
                }}
                className={`w-full text-left flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-cyan-400 ${
                  isChecked
                    ? 'border-cyan-500/60 bg-cyan-950/25 text-white shadow-sm'
                    : 'border-slate-800/80 bg-slate-950/40 text-slate-300 hover:border-slate-700 hover:bg-slate-900/40'
                }`}
              >
                <div 
                  aria-hidden="true"
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    isChecked
                      ? 'border-cyan-400 bg-cyan-500 text-black font-bold text-xs shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                      : 'border-slate-700 bg-slate-900 text-transparent'
                  }`}
                >
                  ✓
                </div>
                <span className="text-xs sm:text-sm leading-relaxed select-none">
                  {duty}
                </span>
              </button>
            )
          })}

          {/* Practical Visa Letter Writing Advice */}
          <div className="mt-6 p-4 rounded-xl border border-slate-800/80 bg-slate-950/60 text-xs text-slate-400 flex items-start gap-3">
            <span className="text-cyan-400 text-base shrink-0">💡</span>
            <div className="space-y-1">
              <strong className="text-slate-200 block">IRCC Reference Letter Rule:</strong>
              <p className="leading-relaxed">
                Your employer reference letter must confirm you performed the main actions described in the duties above. Avoid copying words directly from the NOC description — officers expect natural job descriptions with specific company context.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Sticky Live Scoring Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/90 shadow-2xl backdrop-blur-xl space-y-5">
            
            {/* Card Header & Status Badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Live Match Score
              </span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border transition-colors ${
                isPassing
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                  : 'bg-amber-500/15 text-amber-300 border-amber-500/40'
              }`}>
                {isPassing ? '✓ Meets 51% Rule' : `⚠ Needs ${remainingNeeded} More`}
              </span>
            </div>

            {/* Percentage Display */}
            <div className="flex items-baseline justify-between">
              <div className={`text-5xl font-black font-mono tracking-tight transition-colors ${
                isPassing ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {percentage}%
              </div>
              <div className="text-right text-xs font-mono text-slate-400">
                <span className="text-white font-bold text-base">{matched}</span> of {total} selected
              </div>
            </div>

            {/* Progress Bar with 51% Threshold Marker */}
            <div className="space-y-1.5">
              <div className="relative w-full h-3.5 bg-slate-900 rounded-full border border-slate-800 overflow-hidden">
                {/* 51% Minimum Target Line */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-cyan-400/80 z-20 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  style={{ left: '51%' }}
                  title="51% IRCC Passing Line"
                />
                
                {/* Active Progress Fill */}
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    isPassing
                      ? 'bg-gradient-to-r from-cyan-500 to-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-400'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Progress Labels */}
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>0%</span>
                <span className="text-cyan-400 font-bold">60% Recommended</span>
                <span>100%</span>
              </div>
            </div>

            {/* Compliance Verdict Box */}
            <div className={`p-4 rounded-xl border text-xs leading-relaxed transition-colors ${
              isPassing
                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                : 'bg-slate-900/80 border-slate-800 text-slate-300'
            }`}>
              {isPassing ? (
                <div>
                  <strong className="text-emerald-300 block font-semibold mb-1">
                    ✓ Ready for Reference Letter
                  </strong>
                  You have confirmed {matched} out of {total} duties ({percentage}%). This satisfies Section 75(2) of the IRPR requirement that applicants perform the substantial majority of actions in the lead statement.
                </div>
              ) : (
                <div>
                  <strong className="text-amber-300 block font-semibold mb-1">
                    Below 60% Target ({percentage}%)
                  </strong>
                  To qualify for NOC {code}, your employer letter should verify at least {requiredForPass} main duties. Select {remainingNeeded} more to see if your experience matches.
                </div>
              )}
            </div>

            {/* Quick Summary Metadata */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block uppercase">Minimum Needed</span>
                <span className="text-slate-200 font-bold mt-0.5 block">{requiredForPass} Duties</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block uppercase">Current Status</span>
                <span className={`font-bold mt-0.5 block ${isPassing ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isPassing ? 'Eligible' : 'Incomplete'}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}
