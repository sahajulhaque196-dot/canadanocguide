'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'

// Types for CRS Calculator state
interface LanguageBands {
  reading: number
  writing: number
  listening: number
  speaking: number
}

export default function CrsCalculator() {
  // 1. Marital Status
  const [maritalStatus, setMaritalStatus] = useState<'single' | 'married'>('single')
  const [spouseAccompanying, setSpouseAccompanying] = useState<boolean>(true)
  const [spouseIsCanadian, setSpouseIsCanadian] = useState<boolean>(false)

  const isTreatedAsSingle = maritalStatus === 'single' || !spouseAccompanying || spouseIsCanadian

  // 2. Age
  const [age, setAge] = useState<number>(29)

  // 3. Education
  // 0: Less than secondary, 1: High school, 2: 1-yr, 3: 2-yr, 4: Bachelor's (3+ yr), 5: Two or more certificates, 6: Master's/Professional, 7: PhD
  const [education, setEducation] = useState<number>(4)

  // 4. First Official Language (CLB 4 to 10)
  const [firstLang, setFirstLang] = useState<LanguageBands>({
    reading: 9,
    writing: 9,
    listening: 9,
    speaking: 9,
  })

  // 5. Second Official Language
  const [hasSecondLang, setHasSecondLang] = useState<boolean>(false)
  const [secondLang, setSecondLang] = useState<LanguageBands>({
    reading: 0,
    writing: 0,
    listening: 0,
    speaking: 0,
  })

  // 6. Work Experience
  const [canadianWorkExp, setCanadianWorkExp] = useState<number>(0) // 0 to 5+
  const [foreignWorkExp, setForeignWorkExp] = useState<number>(3) // 0 to 3+
  const [hasTradeCert, setHasTradeCert] = useState<boolean>(false)

  // 7. Spouse Factors
  const [spouseEducation, setSpouseEducation] = useState<number>(4)
  const [spouseLang, setSpouseLang] = useState<LanguageBands>({
    reading: 7,
    writing: 7,
    listening: 7,
    speaking: 7,
  })
  const [spouseCanadianExp, setSpouseCanadianExp] = useState<number>(0)

  // 8. Additional Bonus Factors
  const [hasPnp, setHasPnp] = useState<boolean>(false)
  const [jobOfferType, setJobOfferType] = useState<'none' | 'teer00' | 'teer0123'>('none')
  const [canadianEducation, setCanadianEducation] = useState<'none' | 'one_two' | 'three_plus'>('none')
  const [hasFrenchNclc7, setHasFrenchNclc7] = useState<boolean>(false)
  const [hasSiblingInCanada, setHasSiblingInCanada] = useState<boolean>(false)

  // Active Tab for input navigation
  const [activeTab, setActiveTab] = useState<'core' | 'spouse' | 'transfer' | 'additional'>('core')

  // --- CALCULATION LOGIC (Official IRCC CRS Grid) ---
  const scores = useMemo(() => {
    // A. Core Human Capital Factors
    // 1. Age Points
    let agePoints = 0
    if (age <= 17) agePoints = 0
    else if (age === 18) agePoints = isTreatedAsSingle ? 99 : 90
    else if (age === 19) agePoints = isTreatedAsSingle ? 105 : 95
    else if (age >= 20 && age <= 29) agePoints = isTreatedAsSingle ? 110 : 100
    else if (age === 30) agePoints = isTreatedAsSingle ? 105 : 95
    else if (age === 31) agePoints = isTreatedAsSingle ? 99 : 90
    else if (age === 32) agePoints = isTreatedAsSingle ? 94 : 85
    else if (age === 33) agePoints = isTreatedAsSingle ? 88 : 80
    else if (age === 34) agePoints = isTreatedAsSingle ? 83 : 75
    else if (age === 35) agePoints = isTreatedAsSingle ? 77 : 70
    else if (age === 36) agePoints = isTreatedAsSingle ? 72 : 65
    else if (age === 37) agePoints = isTreatedAsSingle ? 66 : 60
    else if (age === 38) agePoints = isTreatedAsSingle ? 61 : 55
    else if (age === 39) agePoints = isTreatedAsSingle ? 55 : 50
    else if (age === 40) agePoints = isTreatedAsSingle ? 50 : 45
    else if (age === 41) agePoints = isTreatedAsSingle ? 39 : 35
    else if (age === 42) agePoints = isTreatedAsSingle ? 28 : 25
    else if (age === 43) agePoints = isTreatedAsSingle ? 17 : 15
    else if (age === 44) agePoints = isTreatedAsSingle ? 6 : 5
    else agePoints = 0

    // 2. Education Points
    const eduPointsSingle = [0, 30, 90, 98, 120, 128, 135, 150]
    const eduPointsMarried = [0, 28, 84, 91, 112, 119, 126, 140]
    const educationPoints = isTreatedAsSingle
      ? eduPointsSingle[education] || 0
      : eduPointsMarried[education] || 0

    // 3. First Language Points
    const getFirstLangBandPoints = (clb: number, single: boolean) => {
      if (clb >= 10) return single ? 34 : 32
      if (clb === 9) return single ? 31 : 29
      if (clb === 8) return single ? 23 : 22
      if (clb === 7) return single ? 17 : 16
      if (clb === 6) return single ? 9 : 8
      if (clb >= 4) return 6
      return 0
    }

    const firstLangPoints =
      getFirstLangBandPoints(firstLang.reading, isTreatedAsSingle) +
      getFirstLangBandPoints(firstLang.writing, isTreatedAsSingle) +
      getFirstLangBandPoints(firstLang.listening, isTreatedAsSingle) +
      getFirstLangBandPoints(firstLang.speaking, isTreatedAsSingle)

    // 4. Second Language Points (Max 24 single, 22 married)
    const getSecondLangBandPoints = (clb: number) => {
      if (clb >= 9) return 6
      if (clb >= 7) return 3 // Fixed: Official IRCC CRS rule gives 3 pts per band for CLB 7 and 8
      if (clb >= 5) return 1
      return 0
    }

    let secondLangPoints = 0
    if (hasSecondLang) {
      secondLangPoints =
        getSecondLangBandPoints(secondLang.reading) +
        getSecondLangBandPoints(secondLang.writing) +
        getSecondLangBandPoints(secondLang.listening) +
        getSecondLangBandPoints(secondLang.speaking)
      const maxSecond = isTreatedAsSingle ? 24 : 22
      secondLangPoints = Math.min(maxSecond, secondLangPoints)
    }

    // 5. Canadian Work Experience
    const cdnExpSingle = [0, 40, 53, 64, 72, 80]
    const cdnExpMarried = [0, 35, 46, 56, 63, 70]
    const expIdx = Math.min(5, Math.max(0, canadianWorkExp))
    const canadianWorkPoints = isTreatedAsSingle ? cdnExpSingle[expIdx] : cdnExpMarried[expIdx]

    // Core Subtotal
    const coreCapitalMax = isTreatedAsSingle ? 500 : 460
    const coreCapitalPoints = Math.min(
      coreCapitalMax,
      agePoints + educationPoints + firstLangPoints + secondLangPoints + canadianWorkPoints
    )

    // B. Spouse Factors (Max 40 points)
    let spousePoints = 0
    let spouseEduPoints = 0
    let spouseLangPoints = 0
    let spouseExpPoints = 0

    if (!isTreatedAsSingle) {
      // Spouse Education (Max 10)
      const spouseEduMap = [0, 2, 6, 7, 8, 9, 10, 10]
      spouseEduPoints = spouseEduMap[spouseEducation] || 0

      // Spouse Language (Max 20: CLB 9+=5, CLB 7-8=3, CLB 5-6=1)
      const getSpouseBandPoints = (clb: number) => {
        if (clb >= 9) return 5
        if (clb >= 7) return 3
        if (clb >= 5) return 1
        return 0
      }
      spouseLangPoints =
        getSpouseBandPoints(spouseLang.reading) +
        getSpouseBandPoints(spouseLang.writing) +
        getSpouseBandPoints(spouseLang.listening) +
        getSpouseBandPoints(spouseLang.speaking)

      // Spouse Canadian Work Experience (Max 10)
      const spouseExpMap = [0, 5, 7, 8, 9, 10]
      spouseExpPoints = spouseExpMap[Math.min(5, spouseCanadianExp)] || 0

      spousePoints = Math.min(40, spouseEduPoints + spouseLangPoints + spouseExpPoints)
    }

    // C. Skill Transferability Factors (Max 100 points)
    const isFirstLangClb7All =
      firstLang.reading >= 7 &&
      firstLang.writing >= 7 &&
      firstLang.listening >= 7 &&
      firstLang.speaking >= 7

    const isFirstLangClb9All =
      firstLang.reading >= 9 &&
      firstLang.writing >= 9 &&
      firstLang.listening >= 9 &&
      firstLang.speaking >= 9

    const isHighEducation = education >= 5 // Two or more certs, Master's, or PhD
    const isPostSecondary = education >= 2 // 1-year or more post-secondary

    // 1. Education + Language
    let eduLangPoints = 0
    if (isHighEducation) {
      if (isFirstLangClb9All) eduLangPoints = 50
      else if (isFirstLangClb7All) eduLangPoints = 25
    } else if (isPostSecondary) {
      if (isFirstLangClb9All) eduLangPoints = 25
      else if (isFirstLangClb7All) eduLangPoints = 13
    }

    // 2. Education + Canadian Experience
    let eduCdnExpPoints = 0
    if (isHighEducation) {
      if (canadianWorkExp >= 2) eduCdnExpPoints = 50
      else if (canadianWorkExp >= 1) eduCdnExpPoints = 25
    } else if (isPostSecondary) {
      if (canadianWorkExp >= 2) eduCdnExpPoints = 25
      else if (canadianWorkExp >= 1) eduCdnExpPoints = 13
    }
    const educationTransferability = Math.min(50, eduLangPoints + eduCdnExpPoints)

    // 3. Foreign Work Experience + Language
    let forLangPoints = 0
    if (foreignWorkExp >= 3) {
      if (isFirstLangClb9All) forLangPoints = 50
      else if (isFirstLangClb7All) forLangPoints = 25
    } else if (foreignWorkExp >= 1) {
      if (isFirstLangClb9All) forLangPoints = 25
      else if (isFirstLangClb7All) forLangPoints = 13
    }

    // 4. Foreign Work Experience + Canadian Experience
    let forCdnExpPoints = 0
    if (foreignWorkExp >= 3) {
      if (canadianWorkExp >= 2) forCdnExpPoints = 50
      else if (canadianWorkExp >= 1) forCdnExpPoints = 25
    } else if (foreignWorkExp >= 1) {
      if (canadianWorkExp >= 2) forCdnExpPoints = 25
      else if (canadianWorkExp >= 1) forCdnExpPoints = 13
    }
    const foreignTransferability = Math.min(50, forLangPoints + forCdnExpPoints)

    // 5. Trade Certificate + Language
    let tradePoints = 0
    if (hasTradeCert) {
      if (isFirstLangClb7All) tradePoints = 50
      else if (firstLang.reading >= 5 && firstLang.writing >= 5 && firstLang.listening >= 5 && firstLang.speaking >= 5) {
        tradePoints = 25
      }
    }

    const transferabilityTotal = Math.min(
      100,
      educationTransferability + foreignTransferability + tradePoints
    )

    // D. Additional Points (Max 600 points)
    const pnpPoints = hasPnp ? 600 : 0

    let jobOfferPoints = 0
    if (jobOfferType === 'teer00') jobOfferPoints = 200
    else if (jobOfferType === 'teer0123') jobOfferPoints = 50

    let canadianStudyPoints = 0
    if (canadianEducation === 'three_plus') canadianStudyPoints = 30
    else if (canadianEducation === 'one_two') canadianStudyPoints = 15

    let frenchBonusPoints = 0
    if (hasFrenchNclc7) {
      // If English CLB 5 or higher on all 4 skills -> +50, else +25
      const isEnglishClb5All =
        firstLang.reading >= 5 &&
        firstLang.writing >= 5 &&
        firstLang.listening >= 5 &&
        firstLang.speaking >= 5
      frenchBonusPoints = isEnglishClb5All ? 50 : 25
    }

    const siblingPoints = hasSiblingInCanada ? 15 : 0

    const additionalPoints = Math.min(
      600,
      pnpPoints + jobOfferPoints + canadianStudyPoints + frenchBonusPoints + siblingPoints
    )

    // Grand Total (Max 1200)
    const grandTotal = Math.min(
      1200,
      coreCapitalPoints + spousePoints + transferabilityTotal + additionalPoints
    )

    return {
      grandTotal,
      coreCapitalPoints,
      agePoints,
      educationPoints,
      firstLangPoints,
      secondLangPoints,
      canadianWorkPoints,
      spousePoints,
      spouseEduPoints,
      spouseLangPoints,
      spouseExpPoints,
      transferabilityTotal,
      educationTransferability,
      foreignTransferability,
      tradePoints,
      additionalPoints,
      pnpPoints,
      jobOfferPoints,
      canadianStudyPoints,
      frenchBonusPoints,
      siblingPoints,
      isFirstLangClb9All,
      isFirstLangClb7All,
    }
  }, [
    isTreatedAsSingle,
    age,
    education,
    firstLang,
    hasSecondLang,
    secondLang,
    canadianWorkExp,
    foreignWorkExp,
    hasTradeCert,
    spouseEducation,
    spouseLang,
    spouseCanadianExp,
    hasPnp,
    jobOfferType,
    canadianEducation,
    hasFrenchNclc7,
    hasSiblingInCanada,
  ])

  // Benchmark Comparisons with real 2026 cutoffs
  const CUTOFFS = [
    { label: 'French Language Rounds', crs: 382, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
    { label: 'Healthcare & Social Work', crs: 475, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    { label: 'Trades Category Rounds', crs: 477, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
    { label: 'STEM Priority Occupations', crs: 485, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
    { label: 'Canadian Experience Class', crs: 516, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
    { label: 'General / All-Program Rounds', crs: 525, color: 'text-slate-200', bg: 'bg-slate-800/40', border: 'border-slate-700' },
  ]

  // Personalized AI Booster Tips
  const boosterTips = useMemo(() => {
    const tips: string[] = []

    if (!scores.isFirstLangClb9All) {
      tips.push('Target CLB 9 in all 4 language bands to gain up to +50 Skill Transferability points.')
    }
    if (!hasFrenchNclc7) {
      tips.push('Achieving B2 Intermediate French (NCLC 7) awards up to +50 bonus points and qualifies you for ~380–400 cutoffs!')
    }
    if (foreignWorkExp < 3) {
      tips.push('Reaching 3+ years of foreign skilled work experience doubles your foreign transferability points.')
    }
    if (canadianWorkExp === 0) {
      tips.push('1 year of Canadian skilled work experience adds +40 core points + up to +25 transferability points.')
    }
    if (!hasPnp) {
      tips.push('A Provincial Nomination (PNP) guarantees an Invitation to Apply with +600 points.')
    }

    return tips.slice(0, 3)
  }, [scores.isFirstLangClb9All, hasFrenchNclc7, foreignWorkExp, canadianWorkExp, hasPnp])

  return (
    <div className="w-full">
      
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT 7-8 COLS: Interactive Tabs & Step-by-Step Question Form */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Navigation Pill Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl overflow-x-auto text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveTab('core')}
              className={`px-4 py-2 rounded-xl transition-all font-medium whitespace-nowrap cursor-pointer ${
                activeTab === 'core'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              1. Core Capital ({scores.coreCapitalPoints} pts)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('spouse')}
              className={`px-4 py-2 rounded-xl transition-all font-medium whitespace-nowrap cursor-pointer ${
                activeTab === 'spouse'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              2. Spouse ({scores.spousePoints} pts)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('transfer')}
              className={`px-4 py-2 rounded-xl transition-all font-medium whitespace-nowrap cursor-pointer ${
                activeTab === 'transfer'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              3. Transferability ({scores.transferabilityTotal} pts)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('additional')}
              className={`px-4 py-2 rounded-xl transition-all font-medium whitespace-nowrap cursor-pointer ${
                activeTab === 'additional'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              4. Additional Bonus ({scores.additionalPoints} pts)
            </button>
          </div>

          {/* TAB 1: CORE / HUMAN CAPITAL */}
          {activeTab === 'core' && (
            <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Section A: Core / Human Capital Factors
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Age, education level, language proficiency, and Canadian work experience.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30">
                  {scores.coreCapitalPoints} / {isTreatedAsSingle ? 500 : 460} Max
                </span>
              </div>

              {/* 1. Marital Status */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                  1. What is your marital status?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMaritalStatus('single')}
                    className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      maritalStatus === 'single'
                        ? 'border-cyan-500 bg-cyan-950/30 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    Never Married / Single
                  </button>
                  <button
                    type="button"
                    onClick={() => setMaritalStatus('married')}
                    className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      maritalStatus === 'married'
                        ? 'border-cyan-500 bg-cyan-950/30 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    Married / Common-Law
                  </button>
                </div>

                {maritalStatus === 'married' && (
                  <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/50 space-y-3 mt-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={spouseAccompanying}
                        onChange={(e) => setSpouseAccompanying(e.target.checked)}
                        className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500/20 bg-slate-900 border-slate-700"
                      />
                      <span className="text-xs sm:text-sm text-slate-200">
                        Will your spouse or common-law partner accompany you to Canada?
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={spouseIsCanadian}
                        onChange={(e) => setSpouseIsCanadian(e.target.checked)}
                        className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500/20 bg-slate-900 border-slate-700"
                      />
                      <span className="text-xs sm:text-sm text-slate-200">
                        Is your spouse a Canadian citizen or Permanent Resident?
                      </span>
                    </label>
                  </div>
                )}
              </div>

              {/* 2. Age Input */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                    2. How old are you?
                  </label>
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    Age {age} → {scores.agePoints} pts
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={17}
                    max={50}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <span className="w-12 text-center font-mono font-bold text-white text-base py-1 px-2 rounded-lg bg-slate-950 border border-slate-800">
                    {age}
                  </span>
                </div>
              </div>

              {/* 3. Level of Education */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                    3. What is your highest level of education?
                  </label>
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    {scores.educationPoints} pts
                  </span>
                </div>
                <select
                  value={education}
                  onChange={(e) => setEducation(Number(e.target.value))}
                  className="w-full p-3.5 rounded-2xl border border-slate-800 bg-slate-950 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value={0}>Less than secondary school (High school) [0 pts]</option>
                  <option value={1}>Secondary diploma (high school graduation) [30 pts]</option>
                  <option value={2}>One-year post-secondary program [90 pts]</option>
                  <option value={3}>Two-year post-secondary program [98 pts]</option>
                  <option value={4}>Bachelor’s degree OR 3+ year program [120 pts]</option>
                  <option value={5}>Two or more certificates, diplomas (one at least 3 yrs) [128 pts]</option>
                  <option value={6}>Master’s degree OR professional degree (Medicine, Law, etc.) [135 pts]</option>
                  <option value={7}>Doctoral degree (Ph.D.) [150 pts]</option>
                </select>
              </div>

              {/* 4. First Official Language (CLB) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                      4. Official First Language Test Scores (CLB Level)
                    </label>
                    <span className="text-[11px] text-slate-400">
                      IELTS: 8.5+ = CLB 10, 8.0 L / 7.0 RWS = CLB 9, 6.0 = CLB 7
                    </span>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    {scores.firstLangPoints} pts
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(['reading', 'writing', 'listening', 'speaking'] as const).map((band) => (
                    <div key={band} className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                      <span className="text-[11px] font-mono text-slate-400 uppercase block capitalize">
                        {band}
                      </span>
                      <select
                        value={firstLang[band]}
                        onChange={(e) => setFirstLang({ ...firstLang, [band]: Number(e.target.value) })}
                        className="w-full p-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono font-bold cursor-pointer"
                      >
                        <option value={10}>CLB 10+ (IELTS 8.5+)</option>
                        <option value={9}>CLB 9 (IELTS 8.0L / 7.0RWS)</option>
                        <option value={8}>CLB 8 (IELTS 7.5L / 6.5)</option>
                        <option value={7}>CLB 7 (IELTS 6.0 each)</option>
                        <option value={6}>CLB 6 (IELTS 5.5)</option>
                        <option value={5}>CLB 5 (IELTS 5.0)</option>
                        <option value={4}>CLB 4 (IELTS 4.0)</option>
                        <option value={0}>Below CLB 4</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Second Official Language */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasSecondLang}
                      onChange={(e) => setHasSecondLang(e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500/20 bg-slate-900 border-slate-700 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                        4. Second Official Language (English or French)
                      </span>
                      <span className="text-[11px] text-slate-400 block">
                        Check this if you have official language test results for your second language (up to +24 pts)
                      </span>
                    </div>
                  </label>
                  <span className="text-xs font-mono text-cyan-400 font-bold shrink-0">
                    {scores.secondLangPoints} pts
                  </span>
                </div>

                {hasSecondLang && (
                  <div className="pt-2 border-t border-slate-800/80 space-y-3">
                    <div className="text-[11px] text-cyan-300 font-mono">
                      Official IRCC points: CLB 9+ = 6 pts/band &bull; CLB 7–8 = 3 pts/band &bull; CLB 5–6 = 1 pt/band
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {(['reading', 'writing', 'listening', 'speaking'] as const).map((band) => (
                        <div key={band} className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                          <span className="text-[11px] font-mono text-slate-400 uppercase block capitalize">
                            {band}
                          </span>
                          <select
                            value={secondLang[band]}
                            onChange={(e) => setSecondLang({ ...secondLang, [band]: Number(e.target.value) })}
                            className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono font-bold cursor-pointer"
                          >
                            <option value={9}>CLB 9+ [6 pts]</option>
                            <option value={8}>CLB 8 [3 pts]</option>
                            <option value={7}>CLB 7 [3 pts]</option>
                            <option value={6}>CLB 6 [1 pt]</option>
                            <option value={5}>CLB 5 [1 pt]</option>
                            <option value={0}>Below CLB 5 [0 pts]</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Canadian Work Experience */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                    5. Canadian skilled work experience (in TEER 0, 1, 2, or 3)
                  </label>
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    {scores.canadianWorkPoints} pts
                  </span>
                </div>
                <select
                  value={canadianWorkExp}
                  onChange={(e) => setCanadianWorkExp(Number(e.target.value))}
                  className="w-full p-3.5 rounded-2xl border border-slate-800 bg-slate-950 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value={0}>None or less than 1 year [0 pts]</option>
                  <option value={1}>1 year of Canadian experience [40 pts]</option>
                  <option value={2}>2 years of Canadian experience [53 pts]</option>
                  <option value={3}>3 years of Canadian experience [64 pts]</option>
                  <option value={4}>4 years of Canadian experience [72 pts]</option>
                  <option value={5}>5 years or more [80 pts]</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTab(isTreatedAsSingle ? 'transfer' : 'spouse')}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                >
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SPOUSE FACTORS */}
          {activeTab === 'spouse' && (
            <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Section B: Spouse / Partner Factors
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Points for your spouse’s education, language, and Canadian work experience.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30">
                  {scores.spousePoints} / 40 Max
                </span>
              </div>

              {isTreatedAsSingle ? (
                <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 text-center space-y-2">
                  <p className="text-sm text-slate-300 font-semibold">
                    Not Applicable (Single or Non-Accompanying Spouse)
                  </p>
                  <p className="text-xs text-slate-400">
                    Because you are single or your spouse is a Canadian PR/citizen, your Core Capital maximum is automatically set to 500 points.
                  </p>
                </div>
              ) : (
                <>
                  {/* Spouse Education */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                        Spouse Highest Education
                      </label>
                      <span className="text-xs font-mono text-cyan-400 font-bold">
                        {scores.spouseEduPoints} / 10 pts
                      </span>
                    </div>
                    <select
                      value={spouseEducation}
                      onChange={(e) => setSpouseEducation(Number(e.target.value))}
                      className="w-full p-3.5 rounded-2xl border border-slate-800 bg-slate-950 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 cursor-pointer"
                    >
                      <option value={0}>Less than high school [0 pts]</option>
                      <option value={1}>High school graduation [2 pts]</option>
                      <option value={2}>One-year post-secondary program [6 pts]</option>
                      <option value={3}>Two-year post-secondary program [7 pts]</option>
                      <option value={4}>Bachelor’s degree or 3+ year program [8 pts]</option>
                      <option value={5}>Two or more certificates/diplomas [9 pts]</option>
                      <option value={6}>Master’s or professional degree [10 pts]</option>
                      <option value={7}>Doctoral degree (Ph.D.) [10 pts]</option>
                    </select>
                  </div>

                  {/* Spouse Language */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                        Spouse Language Test Scores (CLB)
                      </label>
                      <span className="text-xs font-mono text-cyan-400 font-bold">
                        {scores.spouseLangPoints} / 20 pts
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {(['reading', 'writing', 'listening', 'speaking'] as const).map((band) => (
                        <div key={band} className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                          <span className="text-[11px] font-mono text-slate-400 uppercase block capitalize">
                            {band}
                          </span>
                          <select
                            value={spouseLang[band]}
                            onChange={(e) => setSpouseLang({ ...spouseLang, [band]: Number(e.target.value) })}
                            className="w-full p-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono font-bold cursor-pointer"
                          >
                            <option value={9}>CLB 9+ (5 pts)</option>
                            <option value={7}>CLB 7-8 (3 pts)</option>
                            <option value={5}>CLB 5-6 (1 pt)</option>
                            <option value={0}>Below CLB 5 (0)</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Spouse Canadian Experience */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                        Spouse Canadian Skilled Work Experience
                      </label>
                      <span className="text-xs font-mono text-cyan-400 font-bold">
                        {scores.spouseExpPoints} / 10 pts
                      </span>
                    </div>
                    <select
                      value={spouseCanadianExp}
                      onChange={(e) => setSpouseCanadianExp(Number(e.target.value))}
                      className="w-full p-3.5 rounded-2xl border border-slate-800 bg-slate-950 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 cursor-pointer"
                    >
                      <option value={0}>None or less than 1 year [0 pts]</option>
                      <option value={1}>1 year in Canada [5 pts]</option>
                      <option value={2}>2 years in Canada [7 pts]</option>
                      <option value={3}>3 years in Canada [8 pts]</option>
                      <option value={4}>4 years in Canada [9 pts]</option>
                      <option value={5}>5+ years in Canada [10 pts]</option>
                    </select>
                  </div>
                </>
              )}

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('core')}
                  className="px-5 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:text-white text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('transfer')}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                >
                  Next: Transferability →
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SKILL TRANSFERABILITY */}
          {activeTab === 'transfer' && (
            <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Section C: Skill Transferability Factors
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Combinations of education, foreign experience, and language benchmarks.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30">
                  {scores.transferabilityTotal} / 100 Max
                </span>
              </div>

              {/* Foreign Work Experience */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                    Years of Foreign Skilled Work Experience (Outside Canada)
                  </label>
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    {scores.foreignTransferability} pts unlocked
                  </span>
                </div>
                <select
                  value={foreignWorkExp}
                  onChange={(e) => setForeignWorkExp(Number(e.target.value))}
                  className="w-full p-3.5 rounded-2xl border border-slate-800 bg-slate-950 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value={0}>None or less than 1 year [0 pts]</option>
                  <option value={1}>1 or 2 years foreign experience</option>
                  <option value={3}>3 years or more foreign experience (Maximum)</option>
                </select>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Foreign work experience combines with your language level (CLB 7/9) and Canadian work experience to grant up to 50 transferability points.
                </p>
              </div>

              {/* Trade Certificate */}
              <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasTradeCert}
                    onChange={(e) => setHasTradeCert(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-cyan-500 focus:ring-cyan-500/20 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      Do you have a Canadian Certificate of Qualification in a skilled trade?
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Issued by a Canadian provincial or territorial apprenticeship authority (adds up to 50 pts if combined with CLB 5+).
                    </span>
                  </div>
                </label>
              </div>

              {/* Transferability Breakdown Card */}
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-2">
                <span className="text-xs font-mono text-cyan-400 block font-bold uppercase tracking-wider">
                  Transferability Calculation Summary
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Education Factor</span>
                    <span className="font-mono font-bold text-white text-sm">{scores.educationTransferability} / 50</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Foreign Exp Factor</span>
                    <span className="font-mono font-bold text-white text-sm">{scores.foreignTransferability} / 50</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 col-span-2 sm:col-span-1">
                    <span className="text-slate-400 block text-[10px]">Trade Qualification</span>
                    <span className="font-mono font-bold text-white text-sm">{scores.tradePoints} / 50</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab(isTreatedAsSingle ? 'core' : 'spouse')}
                  className="px-5 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:text-white text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('additional')}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                >
                  Next: Bonus Points →
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: ADDITIONAL BONUS FACTORS */}
          {activeTab === 'additional' && (
            <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Section D: Additional Bonus Points
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    PNP nomination, Canadian education, arranged job offer, and French skills.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30">
                  {scores.additionalPoints} / 600 Max
                </span>
              </div>

              {/* 1. Provincial Nomination */}
              <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/15 space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasPnp}
                    onChange={(e) => setHasPnp(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-emerald-500 focus:ring-emerald-500/20 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-emerald-300 block">
                      Provincial Nomination Certificate (PNP) (+600 Points)
                    </span>
                    <span className="text-[11px] text-slate-300 block mt-0.5">
                      Received a nomination from Ontario (OINP), BC (BCPNP), Alberta (AAIP), etc.
                    </span>
                  </div>
                </label>
              </div>

              {/* 2. Arranged Employment */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                  Valid Canadian Job Offer supported by LMIA (or LMIA-exempt)
                </label>
                <select
                  value={jobOfferType}
                  onChange={(e) => setJobOfferType(e.target.value as 'none' | 'teer00' | 'teer0123')}
                  className="w-full p-3.5 rounded-2xl border border-slate-800 bg-slate-950 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="none">No job offer [0 pts]</option>
                  <option value="teer0123">Job offer in TEER 0, 1, 2, or 3 (+50 pts)</option>
                  <option value="teer00">Senior management role under TEER 0 Major Group 00 (+200 pts)</option>
                </select>
              </div>

              {/* 3. Canadian Education */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                  Post-Secondary Education Completed in Canada
                </label>
                <select
                  value={canadianEducation}
                  onChange={(e) => setCanadianEducation(e.target.value as 'none' | 'one_two' | 'three_plus')}
                  className="w-full p-3.5 rounded-2xl border border-slate-800 bg-slate-950 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="none">No Canadian post-secondary education [0 pts]</option>
                  <option value="one_two">Credential of 1 or 2 years in Canada (+15 pts)</option>
                  <option value="three_plus">Degree or program of 3+ years, Master&apos;s, or PhD (+30 pts)</option>
                </select>
              </div>

              {/* 4. French Skills */}
              <div className="p-4 rounded-2xl border border-purple-500/30 bg-purple-950/15 space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasFrenchNclc7}
                    onChange={(e) => setHasFrenchNclc7(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-purple-500 focus:ring-purple-500/20 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-purple-300 block">
                      French Language Skills: NCLC 7 or higher on all 4 bands (+25 to +50 Points)
                    </span>
                    <span className="text-[11px] text-slate-300 block mt-0.5">
                      TEF Canada or TCF Canada score of NCLC 7+ gives +50 pts if English CLB is 5+, or +25 pts otherwise.
                    </span>
                  </div>
                </label>
              </div>

              {/* 5. Sibling in Canada */}
              <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasSiblingInCanada}
                    onChange={(e) => setHasSiblingInCanada(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-cyan-500 focus:ring-cyan-500/20 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      Brother or sister living in Canada as a Citizen or PR (+15 Points)
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Must be 18 years or older, related by blood, marriage, common-law, or adoption.
                    </span>
                  </div>
                </label>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('transfer')}
                  className="px-5 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:text-white text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('core')}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                >
                  Review Core Capital ↺
                </button>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT 4-5 COLS: Sticky Live Score Gauge & Benchmarking */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
          
          {/* Main Live Score Card */}
          <div className="p-6 rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900/90 backdrop-blur-2xl shadow-[0_0_40px_rgba(6,182,212,0.15)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  Your Estimated CRS Score
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              {/* Big Score Display */}
              <div className="flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl font-black font-mono text-white tracking-tight">
                  {scores.grandTotal}
                </span>
                <span className="text-sm font-mono text-slate-400 font-medium">
                  / 1,200 pts
                </span>
              </div>

              {/* Visual Meter Bar */}
              <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min(100, Math.max(5, (scores.grandTotal / 1200) * 100))}%` }}
                />
              </div>

              {/* Points Breakdown Table */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-slate-400 block text-[10px]">A. Core Capital</span>
                  <span className="font-mono font-bold text-white text-sm">{scores.coreCapitalPoints}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-slate-400 block text-[10px]">B. Spouse Factors</span>
                  <span className="font-mono font-bold text-white text-sm">{scores.spousePoints}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-slate-400 block text-[10px]">C. Transferability</span>
                  <span className="font-mono font-bold text-white text-sm">{scores.transferabilityTotal}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-slate-400 block text-[10px]">D. Bonus Points</span>
                  <span className="font-mono font-bold text-white text-sm">{scores.additionalPoints}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Draw Cutoffs Comparison Card */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                Draw Cutoff Benchmark
              </span>
              <Link href="/express-entry-draws" className="text-[11px] font-mono text-cyan-400 hover:underline">
                View all 442 draws →
              </Link>
            </div>

            <div className="space-y-2 text-xs">
              {CUTOFFS.map((cut, idx) => {
                const isPassing = scores.grandTotal >= cut.crs
                const gap = cut.crs - scores.grandTotal
                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${cut.bg} ${cut.border}`}
                  >
                    <div>
                      <span className="font-medium text-slate-200 block">{cut.label}</span>
                      <span className="text-[10px] font-mono text-slate-400">Target: {cut.crs} CRS</span>
                    </div>
                    <div>
                      {isPassing ? (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px]">
                          ✓ Qualified (+{scores.grandTotal - cut.crs})
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-[10px]">
                          Needs {gap} pts
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* AI Advisor Booster Tips Card */}
          {boosterTips.length > 0 && (
            <div className="p-5 rounded-2xl border border-cyan-500/20 bg-cyan-950/15 backdrop-blur-xl space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="text-base">💡</span>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                  Score Booster Advice
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {boosterTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">▸</span>
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

      </div>

      {/* Mobile Bottom Sticky Score Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-cyan-500/30 backdrop-blur-xl p-3 px-4 flex items-center justify-between lg:hidden shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
        <div>
          <span className="text-[10px] font-mono uppercase text-slate-400 block">Total CRS Score</span>
          <span className="text-2xl font-black font-mono text-white tracking-tight">
            {scores.grandTotal} <span className="text-xs font-normal text-slate-400">/ 1,200</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-500/30">
            {activeTab.toUpperCase()}
          </span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })}
            className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono cursor-pointer hover:bg-cyan-400 transition-colors"
          >
            Review ↑
          </button>
        </div>
      </div>

    </div>
  )
}
