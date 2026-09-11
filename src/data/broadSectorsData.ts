export interface BroadSector {
  code: string
  title: string
  shortTitle: string
  icon: string
  description: string
  nocCount: number
  avgHourlyWage: string
  topNocs: { code: string; title: string }[]
  accentColor: string
}

export const BROAD_SECTORS: BroadSector[] = [
  {
    code: "0",
    title: "Legislative and senior management occupations",
    shortTitle: "Management & Leaders",
    icon: "👔",
    description: "Company directors, general managers, store managers, and team leaders.",
    nocCount: 32,
    avgHourlyWage: "$62.50/hr",
    topNocs: [
      { code: "00018", title: "Senior managers - finance & communication" },
      { code: "20012", title: "Computer & IT managers" },
      { code: "10010", title: "Financial managers" }
    ],
    accentColor: "from-amber-500/20 border-amber-500/30 text-amber-400"
  },
  {
    code: "1",
    title: "Business, finance and administration occupations",
    shortTitle: "Business & Office",
    icon: "📊",
    description: "Accountants, bookkeepers, HR staff, payroll clerks, and office supervisors.",
    nocCount: 57,
    avgHourlyWage: "$38.20/hr",
    topNocs: [
      { code: "11100", title: "Accountants and auditors" },
      { code: "11200", title: "Human resources specialists" },
      { code: "12200", title: "Bookkeepers and accounting staff" }
    ],
    accentColor: "from-blue-500/20 border-blue-500/30 text-blue-400"
  },
  {
    code: "2",
    title: "Natural and applied sciences and related occupations",
    shortTitle: "Tech, IT & Engineering",
    icon: "💻",
    description: "Software developers, web designers, data analysts, and civil engineers.",
    nocCount: 68,
    avgHourlyWage: "$48.90/hr",
    topNocs: [
      { code: "21232", title: "Software developers and programmers" },
      { code: "21231", title: "Software engineers" },
      { code: "21211", title: "Data scientists and analysts" }
    ],
    accentColor: "from-cyan-500/20 border-cyan-500/30 text-cyan-400"
  },
  {
    code: "3",
    title: "Health occupations",
    shortTitle: "Healthcare & Medicine",
    icon: "🩺",
    description: "Registered nurses, family doctors, pharmacists, and medical lab techs.",
    nocCount: 44,
    avgHourlyWage: "$42.30/hr",
    topNocs: [
      { code: "31301", title: "Registered nurses (RN)" },
      { code: "31102", title: "Family doctors and general physicians" },
      { code: "32101", title: "Licensed practical nurses (LPN)" }
    ],
    accentColor: "from-emerald-500/20 border-emerald-500/30 text-emerald-400"
  },
  {
    code: "4",
    title: "Occupations in education, law and social, community and government services",
    shortTitle: "Teaching, Law & Social Work",
    icon: "⚖️",
    description: "School teachers, university professors, lawyers, social workers, and daycare staff.",
    nocCount: 48,
    avgHourlyWage: "$36.80/hr",
    topNocs: [
      { code: "41101", title: "Lawyers and notaries" },
      { code: "41200", title: "University professors" },
      { code: "42202", title: "Early childhood educators" }
    ],
    accentColor: "from-purple-500/20 border-purple-500/30 text-purple-400"
  },
  {
    code: "5",
    title: "Occupations in art, culture, recreation and sport",
    shortTitle: "Design, Media & Creative",
    icon: "🎨",
    description: "Graphic designers, content writers, translators, video editors, and artists.",
    nocCount: 38,
    avgHourlyWage: "$31.40/hr",
    topNocs: [
      { code: "52120", title: "Graphic designers and illustrators" },
      { code: "51111", title: "Writers and editors" },
      { code: "51114", title: "Translators and interpreters" }
    ],
    accentColor: "from-pink-500/20 border-pink-500/30 text-pink-400"
  },
  {
    code: "6",
    title: "Sales and service occupations",
    shortTitle: "Sales, Food & Hospitality",
    icon: "🛎️",
    description: "Cooks, kitchen supervisors, retail store leads, and customer care workers.",
    nocCount: 88,
    avgHourlyWage: "$23.60/hr",
    topNocs: [
      { code: "62020", title: "Food service supervisors" },
      { code: "63200", title: "Cooks and culinary staff" },
      { code: "62010", title: "Retail sales supervisors" }
    ],
    accentColor: "from-yellow-500/20 border-yellow-500/30 text-yellow-400"
  },
  {
    code: "7",
    title: "Trades, transport and equipment operators and related occupations",
    shortTitle: "Trades, Transport & Drivers",
    icon: "⚡",
    description: "Electricians, plumbers, truck drivers, carpenters, and auto mechanics.",
    nocCount: 102,
    avgHourlyWage: "$34.80/hr",
    topNocs: [
      { code: "72400", title: "Electricians" },
      { code: "73300", title: "Transport truck drivers" },
      { code: "72300", title: "Plumbers" }
    ],
    accentColor: "from-orange-500/20 border-orange-500/30 text-orange-400"
  },
  {
    code: "8",
    title: "Natural resources, agriculture and related production occupations",
    shortTitle: "Farming, Forestry & Mining",
    icon: "🌾",
    description: "Farm supervisors, logging crews, miners, and agricultural specialists.",
    nocCount: 21,
    avgHourlyWage: "$29.70/hr",
    topNocs: [
      { code: "82030", title: "Farming and agricultural supervisors" },
      { code: "82010", title: "Forestry and logging supervisors" },
      { code: "83100", title: "Miners and quarry workers" }
    ],
    accentColor: "from-lime-500/20 border-lime-500/30 text-lime-400"
  },
  {
    code: "9",
    title: "Occupations in manufacturing and utilities",
    shortTitle: "Factory & Manufacturing",
    icon: "🏭",
    description: "Machine operators, food packaging workers, and water plant operators.",
    nocCount: 18,
    avgHourlyWage: "$27.40/hr",
    topNocs: [
      { code: "92010", title: "Metal processing supervisors" },
      { code: "92012", title: "Food processing supervisors" },
      { code: "92100", title: "Power plant operators" }
    ],
    accentColor: "from-teal-500/20 border-teal-500/30 text-teal-400"
  }
];
