export interface TeerLevel {
  level: number
  name: string
  shortDef: string
  educationReq: string
  experienceReq: string
  eeEligible: boolean
  programEligibility: string[]
  nocCount: number
  color: string
  accentBorder: string
  sampleNocs: { code: string; title: string }[]
}

export const TEER_LEVELS: TeerLevel[] = [
  {
    level: 0,
    name: "TEER 0 - Management Jobs",
    shortDef: "Managers, directors, and executives across every industry.",
    educationReq: "University degree or college diploma, plus years of work experience.",
    experienceReq: "Proven track record managing teams or business units.",
    eeEligible: true,
    programEligibility: ["Federal Skilled Worker (FSW)", "Canadian Experience Class (CEC)", "Provincial Nominee (PNP)"],
    nocCount: 48,
    color: "from-amber-500/20 to-orange-600/10",
    accentBorder: "border-amber-500/40 text-amber-400",
    sampleNocs: [
      { code: "00012", title: "Senior managers - financial, communications and other business services" },
      { code: "20012", title: "Computer and information systems managers" },
      { code: "10010", title: "Financial managers" }
    ]
  },
  {
    level: 1,
    name: "TEER 1 - Professional Jobs",
    shortDef: "Jobs that usually require a university degree (bachelor's or master's).",
    educationReq: "University degree (bachelor's, master's, or PhD).",
    experienceReq: "Professional license or certification often required.",
    eeEligible: true,
    programEligibility: ["Federal Skilled Worker (FSWP)", "Canadian Experience Class (CEC)", "STEM & Healthcare Priority Draws"],
    nocCount: 97,
    color: "from-cyan-500/20 to-blue-600/10",
    accentBorder: "border-cyan-500/40 text-cyan-400",
    sampleNocs: [
      { code: "21232", title: "Software developers and programmers" },
      { code: "21211", title: "Data scientists and analysts" },
      { code: "31301", title: "Registered nurses and psychiatric nurses" }
    ]
  },
  {
    level: 2,
    name: "TEER 2 - Skilled & Technical Jobs",
    shortDef: "Jobs that need 2 to 3 years of college study or trade apprenticeship.",
    educationReq: "2 to 3 years of college, or apprenticeship training.",
    experienceReq: "Trade certificate, Red Seal license, or supervisory experience.",
    eeEligible: true,
    programEligibility: ["Federal Skilled Worker (FSWP)", "Canadian Experience Class (CEC)", "Federal Skilled Trades (FST)"],
    nocCount: 162,
    color: "from-emerald-500/20 to-teal-600/10",
    accentBorder: "border-emerald-500/40 text-emerald-400",
    sampleNocs: [
      { code: "72200", title: "Electricians (except industrial and power system)" },
      { code: "32101", title: "Licensed practical nurses" },
      { code: "62020", title: "Food service supervisors" }
    ]
  },
  {
    level: 3,
    name: "TEER 3 - Intermediate Skilled Jobs",
    shortDef: "Jobs that need less than 2 years of college or on-the-job training.",
    educationReq: "High school completion plus less than 2 years of college.",
    experienceReq: "More than 6 months of specialized job training.",
    eeEligible: true,
    programEligibility: ["Federal Skilled Worker (FSWP)", "Canadian Experience Class (CEC)", "Transport & Trades Priority"],
    nocCount: 69,
    color: "from-purple-500/20 to-indigo-600/10",
    accentBorder: "border-purple-500/40 text-purple-400",
    sampleNocs: [
      { code: "73300", title: "Transport truck drivers" },
      { code: "63200", title: "Cooks" },
      { code: "33102", title: "Nurse aides and patient care associates" }
    ]
  },
  {
    level: 4,
    name: "TEER 4 - Support & Service Jobs",
    shortDef: "Jobs that need a high school diploma or a few weeks of job training.",
    educationReq: "High school diploma.",
    experienceReq: "Several weeks of on-the-job training.",
    eeEligible: false,
    programEligibility: ["Provincial Nominee Program (PNP)", "Atlantic Immigration Program", "Rural Pilot Streams"],
    nocCount: 95,
    color: "from-slate-700/30 to-slate-800/10",
    accentBorder: "border-slate-600/40 text-slate-300",
    sampleNocs: [
      { code: "64100", title: "Retail salespersons and store clerks" },
      { code: "65201", title: "Food and beverage servers" },
      { code: "74200", title: "Railway and track maintenance workers" }
    ]
  },
  {
    level: 5,
    name: "TEER 5 - Entry-Level Jobs",
    shortDef: "Jobs with no formal education or training requirements.",
    educationReq: "No formal schooling needed.",
    experienceReq: "Short work demonstration provided by employer.",
    eeEligible: false,
    programEligibility: ["Provincial Semi-Skilled Streams", "Agri-Food Immigration Pilot (AFIP)", "Rural & Community Pilots"],
    nocCount: 45,
    color: "from-rose-500/15 to-slate-900/10",
    accentBorder: "border-rose-500/30 text-rose-300",
    sampleNocs: [
      { code: "65310", title: "Light duty cleaners" },
      { code: "75110", title: "Construction helpers and labourers" },
      { code: "85100", title: "Livestock and farm labourers" }
    ]
  }
];
