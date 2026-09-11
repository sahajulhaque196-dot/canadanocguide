export interface ProvinceWageHighlight {
  provCode: string
  provName: string
  generalMinWage: string
  techMedianWage: string
  healthMedianWage: string
  tradesMedianWage: string
  topOccupations: {
    noc: string
    title: string
    medianWage: string
    annualEst: string
    benefitPct: string
  }[]
}

export const PROVINCE_WAGE_BENCHMARKS: ProvinceWageHighlight[] = [
  {
    provCode: "ON",
    provName: "Ontario (Toronto, Ottawa, Hamilton)",
    generalMinWage: "$17.20/hr",
    techMedianWage: "$51.28/hr",
    healthMedianWage: "$44.50/hr",
    tradesMedianWage: "$38.00/hr",
    topOccupations: [
      { noc: "21232", title: "Software developers and programmers", medianWage: "$51.28/hr", annualEst: "$106,662/yr", benefitPct: "88%" },
      { noc: "31301", title: "Registered nurses (RN)", medianWage: "$44.50/hr", annualEst: "$92,560/yr", benefitPct: "94%" },
      { noc: "72400", title: "Electricians", medianWage: "$38.00/hr", annualEst: "$79,040/yr", benefitPct: "82%" },
      { noc: "11100", title: "Accountants and auditors", medianWage: "$43.27/hr", annualEst: "$90,000/yr", benefitPct: "89%" },
      { noc: "62020", title: "Food service supervisors", medianWage: "$18.50/hr", annualEst: "$38,480/yr", benefitPct: "51%" },
    ]
  },
  {
    provCode: "BC",
    provName: "British Columbia (Vancouver, Victoria)",
    generalMinWage: "$17.40/hr",
    techMedianWage: "$50.00/hr",
    healthMedianWage: "$46.00/hr",
    tradesMedianWage: "$37.50/hr",
    topOccupations: [
      { noc: "21232", title: "Software developers and programmers", medianWage: "$50.00/hr", annualEst: "$104,000/yr", benefitPct: "86%" },
      { noc: "31301", title: "Registered nurses (RN)", medianWage: "$46.00/hr", annualEst: "$95,680/yr", benefitPct: "95%" },
      { noc: "73300", title: "Transport truck drivers", medianWage: "$29.00/hr", annualEst: "$60,320/yr", benefitPct: "68%" },
      { noc: "63200", title: "Cooks and kitchen staff", medianWage: "$18.50/hr", annualEst: "$38,480/yr", benefitPct: "45%" },
      { noc: "21211", title: "Data scientists and analysts", medianWage: "$48.50/hr", annualEst: "$100,880/yr", benefitPct: "87%" },
    ]
  },
  {
    provCode: "AB",
    provName: "Alberta (Calgary, Edmonton)",
    generalMinWage: "$15.00/hr",
    techMedianWage: "$49.00/hr",
    healthMedianWage: "$45.80/hr",
    tradesMedianWage: "$41.00/hr",
    topOccupations: [
      { noc: "72401", title: "Industrial electricians", medianWage: "$42.50/hr", annualEst: "$88,400/yr", benefitPct: "91%" },
      { noc: "21231", title: "Software engineers", medianWage: "$51.00/hr", annualEst: "$106,080/yr", benefitPct: "85%" },
      { noc: "73300", title: "Transport truck drivers", medianWage: "$30.00/hr", annualEst: "$62,400/yr", benefitPct: "74%" },
      { noc: "32101", title: "Licensed practical nurses (LPN)", medianWage: "$34.00/hr", annualEst: "$70,720/yr", benefitPct: "89%" },
      { noc: "82030", title: "Farm and agricultural supervisors", medianWage: "$28.00/hr", annualEst: "$58,240/yr", benefitPct: "63%" },
    ]
  },
  {
    provCode: "QC",
    provName: "Quebec (Montreal, Quebec City)",
    generalMinWage: "$15.75/hr",
    techMedianWage: "$46.15/hr",
    healthMedianWage: "$42.00/hr",
    tradesMedianWage: "$35.00/hr",
    topOccupations: [
      { noc: "21234", title: "Web developers", medianWage: "$38.46/hr", annualEst: "$80,000/yr", benefitPct: "82%" },
      { noc: "21232", title: "Software developers", medianWage: "$46.15/hr", annualEst: "$96,000/yr", benefitPct: "88%" },
      { noc: "31301", title: "Registered nurses", medianWage: "$42.00/hr", annualEst: "$87,360/yr", benefitPct: "92%" },
      { noc: "72400", title: "Electricians", medianWage: "$36.50/hr", annualEst: "$75,920/yr", benefitPct: "80%" },
      { noc: "62020", title: "Food service supervisors", medianWage: "$17.75/hr", annualEst: "$36,920/yr", benefitPct: "48%" },
    ]
  }
];
