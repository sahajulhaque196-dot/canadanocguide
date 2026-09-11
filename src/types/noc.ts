export interface NocRecord {
  code: string
  title: string
  teer: number
  broadCategory: string
  definition: string
  leadStatement: string
  mainDuties: string[]
  employmentRequirements: string[]
  exclusions: string[]
  jobTitles: string[]
  priorityCategory: string
  isEEEligible: boolean
  wages: {
    national: {
      low: string | null
      median: string
      high: string | null
      avg: string | null
      isAnnual: boolean
      benefitPct: string
    } | null
    provinces: Record<string, {
      low: string | null
      median: string
      high: string | null
      isAnnual: boolean
    }>
  }
}

export interface EEDrawItem {
  number: number
  date: string
  dateFull: string
  name: string
  size: string
  crs: number
}
