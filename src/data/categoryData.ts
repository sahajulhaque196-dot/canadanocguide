export interface CategoryFaq {
  question: string
  answer: string
}

export interface DeepDivePoint {
  label: string
  desc: string
}

export interface CategoryConfig {
  id: string
  slugs: string[]
  title: string
  shortLabel: string
  icon: string
  color: string
  filterKey: string
  description: string
  criteria: string[]
  licensingReality: {
    title: string
    summary: string
    takeaway: string
  }
  deepDive: {
    badge: string
    title: string
    intro: string
    points: DeepDivePoint[]
  }
  strategyTips: {
    title: string
    desc: string
  }[]
  faqs: CategoryFaq[]
}

export const CATEGORIES: CategoryConfig[] = [
  {
    id: 'stem',
    slugs: ['stem', 'stem-occupations'],
    title: 'STEM Occupations (Science, Technology, Engineering & Math)',
    shortLabel: 'STEM',
    icon: '💻',
    color: '#00D4FF',
    filterKey: 'STEM Priority',
    description:
      'Canada targets developers, cloud architects, cybersecurity specialists, and data engineers to power tech hubs across Toronto, Vancouver, Montreal, and Waterloo.',
    criteria: [
      'At least 6 months of continuous paid work experience in an eligible STEM NOC within the past 3 years.',
      'Active Express Entry profile under Federal Skilled Worker (FSWP) or Canadian Experience Class (CEC).',
      'Minimum language proficiency of CLB 7 in English (IELTS 6.0 in all bands) or French (NCLC 7).',
      'Foreign work experience (performed anywhere outside Canada) is 100% valid.'
    ],
    licensingReality: {
      title: 'P.Eng Licensing vs. Immigration Assessment',
      summary:
        'You do NOT need a Canadian Professional Engineer (P.Eng) license to receive an Express Entry ITA or Permanent Residency. Tech professionals (Software Engineers, Data Scientists, Web Developers) apply using university degrees, ECA reports, and employment verification letters alone.',
      takeaway:
        'Software roles do not require provincial engineering council registration. You can land as a Permanent Resident and start working in Canadian tech immediately.'
    },
    deepDive: {
      badge: 'Tech Applicant Reality Check',
      title: 'Engineering Title Protection & Remote Work for US Clients',
      intro:
        'Understanding how IRCC evaluates technical job duties and remote employment saves months of processing delays:',
      points: [
        {
          label: 'Provincial "Engineer" Title Protection vs NOC 21231',
          desc: 'Provincial bodies like PEO (Ontario) protect the title "Professional Engineer". However, IRCC assesses your daily job duties against the NOC lead statement, not provincial regulator membership. Having a computer science degree (BCA, MCA, B.Tech) and working as a Software Engineer is fully recognized by IRCC under NOC 21231/21232.'
        },
        {
          label: 'Why STEM Cutoffs Sit at 480–495',
          desc: 'Because the Express Entry talent pool has high numbers of Indian and international tech professionals with Master’s degrees and CLB 9/10, STEM cutoffs remain higher than Healthcare (440s) or French (380s). Hitting CLB 9 is essential for direct STEM selection.'
        },
        {
          label: 'Remote Work Documentation Protocol',
          desc: 'If you worked remotely for a US, European, or Canadian tech firm while living in India or elsewhere, it is fully counted. Submit bank statements showing monthly deposits, your remote employment contract, and a reference letter detailing your programming stack and code ownership.'
        }
      ]
    },
    strategyTips: [
      {
        title: 'Target CLB 9 (The +50 Point Leap)',
        desc: 'Scoring 8.0 in Listening and 7.0 in Reading, Writing, and Speaking unlocks maximum Skill Transferability points, giving you the necessary 485+ score for STEM category draws.'
      },
      {
        title: 'Leverage Provincial Tech Streams',
        desc: 'Ontario (OINP Tech Draws) and British Columbia (BC PNP Tech) frequently issue invitations to tech candidates directly from the Express Entry pool with scores in the 460–480 range.'
      },
      {
        title: 'Detail Your Modern Tech Stack',
        desc: 'Do not simply copy-paste NOC duties. Have your employer reference letter mention real technical frameworks (e.g. AWS, React, Python, Kubernetes, CI/CD) to prove genuine engineering responsibilities.'
      }
    ],
    faqs: [
      {
        question: 'Do remote software engineering jobs qualify for STEM category draws?',
        answer:
          'Yes. Whether you worked remotely from India, Dubai, or anywhere else, as long as your employment was continuous, paid, and for at least 6 months in an eligible STEM NOC within the last 3 years, it qualifies for category draws.'
      },
      {
        question: 'Do I need a Canadian job offer to get invited under STEM draws?',
        answer:
          'No. The majority of candidates invited in STEM category rounds do not have a Canadian job offer. You only need a competitive CRS score meeting the category cutoff (typically ~480–495).'
      },
      {
        question: 'Does freelance or contract work count toward the 6-month STEM requirement?',
        answer:
          'Contract work counts if you were paid directly and can prove full-time equivalent hours (30 hrs/week) with client invoices, bank deposits, and reference letters detailing your technical duties. Pure self-employment without third-party documentation faces heavy scrutiny.'
      },
      {
        question: 'Which STEM occupations receive the most invitations?',
        answer:
          'NOC 21231 (Software engineers and designers), NOC 21232 (Software developers and programmers), NOC 21234 (Web developers and programmers), and NOC 21211 (Data scientists) consistently represent the largest share of STEM invitations.'
      }
    ]
  },
  {
    id: 'healthcare',
    slugs: ['healthcare', 'healthcare-occupations'],
    title: 'Healthcare & Social Services Occupations',
    shortLabel: 'Healthcare',
    icon: '🩺',
    color: '#10B981',
    filterKey: 'Healthcare Priority',
    description:
      'To address healthcare staffing shortages across all provinces, IRCC conducts regular healthcare category rounds for nurses, physicians, pharmacists, and medical lab technologists.',
    criteria: [
      'At least 6 months of continuous paid work experience in an eligible healthcare NOC within the past 3 years.',
      'Active Express Entry profile meeting general criteria (minimum 67 FSW points or 1 year CEC experience).',
      'Language benchmark of at least CLB 7 in English (IELTS 6.0 in all bands) or French (NCLC 7).',
      'Experience completed in foreign hospitals, clinics, or laboratories is 100% recognized.'
    ],
    licensingReality: {
      title: 'Canadian Medical Licensing vs. Express Entry ITA',
      summary:
        'A Canadian nursing or medical license is NOT required to receive an Express Entry ITA or become a Permanent Resident. IRCC evaluates your foreign work experience and Educational Credential Assessment (ECA). Provincial licensing (such as NNAS or provincial colleges) is completed after receiving PR.',
      takeaway:
        'Secure your Canada PR visa first through healthcare draws. Once you land with permanent residency, you can complete local bridging or supervised clinical practice.'
    },
    deepDive: {
      badge: 'Clinical Pathway Guide',
      title: 'Post-Landing Licensing Journey & US NCLEX Reciprocity',
      intro:
        'Healthcare is one of the lowest-cutoff Express Entry streams (CRS 440s–470s). Here is how international medical professionals navigate the journey:',
      points: [
        {
          label: 'The 4-Stage Nurse Licensing Journey',
          desc: 'Stage 1: Get Educational Credential Assessment (WES). Stage 2: Receive Express Entry ITA with low healthcare cutoffs (445–475). Stage 3: Initiate NNAS (National Nursing Assessment Service) credential evaluation. Stage 4: Pass NCLEX-RN and register with a provincial nursing regulatory body upon arrival in Canada.'
        },
        {
          label: 'Direct US NCLEX-RN Reciprocity (Ontario & Alberta)',
          desc: 'Foreign nurses who have already passed the US NCLEX-RN exam can qualify for expedited clinical registration in Ontario (College of Nurses of Ontario - CNO) or Alberta without re-sitting the examination.'
        },
        {
          label: 'Regulated Clinicians vs Non-Regulated Allied Health',
          desc: 'While Registered Nurses (NOC 31301) and Doctors (NOC 31100) require post-landing licensing, allied healthcare roles like Medical Laboratory Assistants (NOC 33101) and Pharmacy Technicians (NOC 32124) can start working with much simpler certification.'
        }
      ]
    },
    strategyTips: [
      {
        title: 'Take Advantage of the 445–475 Cutoffs',
        desc: 'Healthcare cutoffs are consistently 50 to 80 points lower than General draws, making this one of Canada’s most accessible routes to Permanent Residency for qualified medical professionals.'
      },
      {
        title: 'Include Patient Care Duties in Letters',
        desc: 'Ensure your hospital or clinic reference letters clearly describe your daily clinical responsibilities, patient assessments, medication administration, or diagnostic procedures.'
      },
      {
        title: 'Check Dedicated Healthcare PNP Streams',
        desc: 'Provinces like British Columbia (BC PNP Healthcare Priority) and Nova Scotia frequently issue provincial nominations with even lower CRS points for international nurses.'
      }
    ],
    faqs: [
      {
        question: 'Do foreign nurses need to pass the NCLEX-RN before receiving an Express Entry ITA?',
        answer:
          'No. Passing the NCLEX or registering with the National Nursing Assessment Service (NNAS) is NOT required to receive an Express Entry invitation or PR visa. Licensing is only required when you start clinical practice in Canada after arrival.'
      },
      {
        question: 'Does medical internship or residency count toward the 6-month requirement?',
        answer:
          'Paid medical internships or residency positions count if they were continuous and full-time (at least 30 hours per week). Unpaid clinical rotations completed as a student do not qualify.'
      },
      {
        question: 'Which healthcare professions are eligible for category draws?',
        answer:
          'The list covers 35 specific NOCs including Registered Nurses (31301), Physicians (31100/31102), Pharmacists (31120), Physiotherapists (31202), and Medical Laboratory Technologists (32120).'
      },
      {
        question: 'Can healthcare workers bring their family to Canada?',
        answer:
          'Yes. Your spouse and dependent children are included in your Permanent Residency application and will receive full PR status, open work permits, and access to public Canadian healthcare.'
      }
    ]
  },
  {
    id: 'trades',
    slugs: ['trades', 'trade-occupations', 'skilled-trades'],
    title: 'Trade & Construction Occupations',
    shortLabel: 'Trades',
    icon: '🛠️',
    color: '#F59E0B',
    filterKey: 'Trades Priority',
    description:
      'Electricians, plumbers, carpenters, welders, and heavy-duty mechanics are in massive demand across Canada to support rapid residential construction and national infrastructure projects.',
    criteria: [
      'At least 6 months of continuous paid trade experience in an eligible NOC within the past 3 years.',
      'Eligible under Federal Skilled Trades (FSTP), Federal Skilled Worker (FSWP), or Canadian Experience Class (CEC).',
      'Language benchmark of CLB 5 in Speaking/Listening and CLB 4 in Reading/Writing (if applying under FSTP).',
      'Foreign trade experience and paid apprenticeships are fully accepted.'
    ],
    licensingReality: {
      title: 'Red Seal Endorsement vs. Immigration Approval',
      summary:
        'A Canadian Red Seal endorsement or provincial Certificate of Qualification is NOT mandatory to receive an Express Entry category ITA. You only need verified paid employment experience. However, obtaining a Certificate of Qualification gives you a massive +50 bonus CRS points.',
      takeaway:
        'You can receive your PR visa without a Canadian Red Seal. Once in Canada, you can challenge the Red Seal exam based on your verified international trade hours.'
    },
    deepDive: {
      badge: 'Skilled Trades Blueprint',
      title: 'The FSTP Job Offer Trap & The Red Seal +50 Point Challenge',
      intro:
        'Trade category draws feature low cutoffs (CRS 430s–470s). Here is how foreign tradespeople navigate the program:',
      points: [
        {
          label: 'The FSTP Job Offer Trap vs FSWP',
          desc: 'To enter the pool under the Federal Skilled Trades Program (FSTP), you must have either a 1-year Canadian job offer OR a provincial trade certificate. If you have neither, apply under Federal Skilled Worker (FSWP), which requires CLB 7 and 67 points, but allows you to receive Trade Category invitations!'
        },
        {
          label: 'Challenging the Red Seal Exam (Trade Equivalency Assessment)',
          desc: 'Foreign tradespeople with 5+ years (usually 9,000+ hours) of verified trade experience can apply for a Trade Equivalency Assessment (TEA) through SkilledTradesBC or Ontario. You can visit Canada on a visitor visa to write the Red Seal exam, earn your Certificate of Qualification, and get an instant +50 bonus CRS points.'
        },
        {
          label: 'Compulsory vs Non-Compulsory Trades in Canada',
          desc: 'Compulsory trades (e.g. Electrician NOC 72200, Plumber NOC 72300, Refrigeration Tech NOC 72105) legally require a provincial license to work in Canada. Non-compulsory trades (e.g. Carpenter NOC 72310, Welder NOC 72106, Heavy Duty Mechanic NOC 72401) allow you to start working immediately under employer supervision upon landing.'
        }
      ]
    },
    strategyTips: [
      {
        title: 'Take Advantage of the Lower Score Barrier',
        desc: 'Trade category draws invite candidates with cutoffs often below 460 points—far lower than the 515+ cutoffs seen in standard CEC and General draws.'
      },
      {
        title: 'Document Every Trade Tool and Procedure',
        desc: 'Your employer reference letters must explicitly mention the specific tools, diagnostic meters, safety codes (e.g. electrical/plumbing codes), and blueprints you handled.'
      },
      {
        title: 'Explore Alberta and BC Trade PNP Streams',
        desc: 'Provinces with huge construction demands (Alberta and British Columbia) have dedicated trade streams that nominate foreign certified tradespeople directly from the pool.'
      }
    ],
    faqs: [
      {
        question: 'Do I need a Canadian Red Seal certificate to qualify for Trades draws?',
        answer:
          'No. You only need at least 6 months of verified, continuous paid work experience in an eligible trade NOC within the past 3 years. A Red Seal is beneficial for bonus points but not required for an ITA.'
      },
      {
        question: 'What is the minimum language score needed for trades candidates?',
        answer:
          'If applying under the Federal Skilled Trades Program (FSTP), the minimum is only CLB 5 in Speaking and Listening, and CLB 4 in Reading and Writing—much lower than the CLB 7 required for FSWP.'
      },
      {
        question: 'Can apprenticeship experience outside Canada be counted?',
        answer:
          'Yes, provided the apprenticeship was paid and you performed the full scope of duties corresponding to the skilled trade NOC code.'
      },
      {
        question: 'Which trade occupations have the highest demand in Canada?',
        answer:
          'Electricians (72200), Carpenters (72310), Plumbers (72300), Welders (72106), and Heavy-duty equipment mechanics (72401) are in critical demand across all provinces.'
      }
    ]
  },
  {
    id: 'transport',
    slugs: ['transport', 'transport-occupations'],
    title: 'Transport & Logistics Occupations',
    shortLabel: 'Transport',
    icon: '🚛',
    color: '#6366F1',
    filterKey: 'Transport Priority',
    description:
      'Keeping national and cross-border supply chains moving is a critical Canadian priority. Commercial truck drivers, aircraft pilots, and railway conductors receive dedicated invitation rounds.',
    criteria: [
      'At least 6 months of continuous paid work experience in an eligible transport NOC within the past 3 years.',
      'Active Express Entry profile under FSWP, CEC, or FSTP.',
      'Standard Educational Credential Assessment (ECA) report for secondary or post-secondary education.',
      'Language benchmark of CLB 7 for FSWP, or CLB 5 for CEC (TEER 2/3) and FSTP.'
    ],
    licensingReality: {
      title: 'Commercial Driver License (Class 1/AZ) vs. Express Entry ITA',
      summary:
        'You do NOT need a Canadian commercial truck driver license (Class 1 or AZ) to receive an Express Entry ITA or Permanent Residency. IRCC evaluates your foreign driving experience. However, once you arrive in Canada as a PR, you must complete provincial MELT training and road testing to drive commercially.',
      takeaway:
        'Get your Canada PR approved first through NOC 73300. After landing as a Permanent Resident, you can complete the short provincial commercial driving course (MELT) and obtain your Class 1 license.'
    },
    deepDive: {
      badge: 'Supply Chain Reality Check',
      title: 'The Commercial Truck Driver MELT Hurdle & Pilot Licensing',
      intro:
        'Transport category draws offer viable immigration pathways for drivers and aviation crew. Here are the practical realities:',
      points: [
        {
          label: 'The Commercial Driver Catch-22 (MELT & Insurance)',
          desc: 'A PR visa allows you to live in Canada, but Canadian transport fleets cannot hire you to drive an 18-wheeler without a provincial Class 1/AZ license. Upon landing, plan for Mandatory Entry-Level Training (MELT: 103.5 hours in Ontario, 121.5 hours in Alberta, costing $5,000–$10,000 CAD) and pass the provincial road test.'
        },
        {
          label: 'NOC 73300 Reference Letter Logbook Standards',
          desc: 'For transport truck drivers, IRCC strictly scrutinizes reference letters. Your letter must clearly specify tractor-trailer Gross Vehicle Weight (GVW over 4,500 kg), interprovincial or cross-border long-haul routes, electronic logbook maintenance, and cargo safety inspection duties.'
        },
        {
          label: 'Aircraft Pilots (NOC 72600) License Conversion',
          desc: 'Foreign commercial pilots must convert their FAA or ICAO commercial pilot license (CPL/ATPL) to a Transport Canada license. This involves passing the Transport Canada written conversion exam, medical examination (Category 1), and a flight check.'
        }
      ]
    },
    strategyTips: [
      {
        title: 'Highlight Long-Haul Vehicle Tonnage',
        desc: 'Ensure your reference letters state you operated articulated commercial vehicles over 4,500 kg. Local delivery van drivers (NOC 75102) do not qualify for NOC 73300.'
      },
      {
        title: 'Budget for Post-Landing MELT Training',
        desc: 'Having $7,000–$10,000 CAD set aside for your provincial MELT course and testing ensures you can transition directly into Canadian long-haul trucking within 6 to 8 weeks of landing.'
      },
      {
        title: 'Explore Saskatchewan & Ontario Transport PNP Streams',
        desc: 'Saskatchewan (SINP Long-Haul Truck Driver Project) and Ontario (OINP In-Demand) operate fast-track streams for experienced commercial drivers.'
      }
    ],
    faqs: [
      {
        question: 'Does long-haul truck driving experience outside Canada count for this category?',
        answer:
          'Yes. Work experience in India, the UAE, the UK, or anywhere else is fully recognized, provided you have at least 6 months of continuous paid employment in NOC 73300 within the last 3 years.'
      },
      {
        question: 'What proof of transport experience does IRCC require?',
        answer:
          'IRCC requires an official employer reference letter stating your hours, salary, vehicle types operated, driving licenses held, and daily duties matching NOC 73300.'
      },
      {
        question: 'Are airline pilots and aircraft mechanics included in transport draws?',
        answer:
          'Yes. Air transport pilots (NOC 72600) and Aircraft maintenance engineers (NOC 72404) are official target occupations in the transport category.'
      },
      {
        question: 'Can I convert my foreign driving license directly to a Canadian Class 1 license?',
        answer:
          'No direct swap exists for commercial semi-truck licenses. You must hold a standard Class 5 (car) license, complete the provincial Mandatory Entry-Level Training (MELT), and pass the official commercial road test.'
      }
    ]
  },
  {
    id: 'agriculture',
    slugs: ['agriculture', 'agriculture-occupations', 'agriculture-agri-food'],
    title: 'Agriculture & Agri-Food Occupations',
    shortLabel: 'Agriculture',
    icon: '🌾',
    color: '#84CC16',
    filterKey: 'Agriculture Priority',
    description:
      'Agricultural supervisors, greenhouse contractors, and industrial retail butchers are critical to sustaining Canada’s national farming operations and multi-billion dollar food processing industry.',
    criteria: [
      'At least 6 months of qualifying continuous paid agriculture work within the past 3 years.',
      'Active Express Entry profile under FSWP, CEC, or FSTP.',
      'Experience in agricultural supervision, farm contracting, or retail butchery.',
      'Language benchmark of CLB 7 for FSWP, or CLB 5 for CEC (TEER 2/3) and FSTP.'
    ],
    licensingReality: {
      title: 'Agricultural Qualifications vs. Red Tape',
      summary:
        'Agriculture occupations do not require mandatory government licenses. Proof of commercial employment, formal agricultural diplomas or certificates, and detailed employer reference letters verifying supervisory responsibilities or butchery craftsmanship are sufficient for IRCC approval.',
      takeaway:
        'No Canadian trade certification is required for farm supervisors or butchers. Clear, documented commercial farm work experience is the primary requirement.'
    },
    deepDive: {
      badge: 'Eligibility Alert',
      title: 'The #1 Trap: TEER 4/5 Labourers are Ineligible for Category Draws',
      intro:
        'Many applicants confuse general farm labour with Express Entry category draws. Here are the crucial distinctions:',
      points: [
        {
          label: 'General Farm Workers (TEER 5) Do NOT Qualify for Express Entry',
          desc: 'General farm workers (NOC 85100), fruit pickers, and harvesting labourers are classified as TEER 5. Express Entry category draws strictly require TEER 0, 1, 2, or 3. Only Contractors and supervisors in agriculture (NOC 82030) and Agricultural service contractors (NOC 84120) qualify for agricultural Express Entry rounds.'
        },
        {
          label: 'Category Express Entry vs. Agri-Food Pilot (AFIP)',
          desc: 'If you work in agricultural labour or meat processing in Canada, the Agri-Food Immigration Pilot (AFIP) is an employer-driven pathway that does NOT use the CRS points grid and accepts lower language (CLB 4). In contrast, Express Entry category selection is points-based and requires 6 months of skilled experience.'
        },
        {
          label: 'Butcher (NOC 63201) Reference Letter Requirements',
          desc: 'For retail butchers and meat cutters, IRCC requires proof of whole-carcass breakdown, preparing standard retail cuts of beef/pork/poultry, and knowledge of HACCP sanitary food safety standards.'
        }
      ]
    },
    strategyTips: [
      {
        title: 'Emphasize Supervisory Responsibilities',
        desc: 'If applying under NOC 82030 or 84120, your letter must prove you supervised farm workers, scheduled harvests, managed livestock feeding programs, or operated heavy agricultural machinery.'
      },
      {
        title: 'Ensure Farm Compensation is Verifiable',
        desc: 'Experience on family farms requires official business registration, bank account records of regular wages, and tax filings. IRCC will reject unsubstantiated cash transactions.'
      },
      {
        title: 'Compare with the Agri-Food Pilot (AFIP)',
        desc: 'If you already hold a job offer in Canada from an eligible meat processor or greenhouse farm, review the Agri-Food Pilot as a lower-language alternative to Express Entry.'
      }
    ],
    faqs: [
      {
        question: 'Which specific occupations qualify for the Agriculture category?',
        answer:
          'The category focuses on Contractors and supervisors in agriculture (NOC 82030), Agricultural service contractors and farm supervisors (NOC 84120), and Retail butchers and meat cutters (NOC 63201).'
      },
      {
        question: 'Does seasonal farm work count toward the 6-month requirement?',
        answer:
          'Only if the seasonal work was continuous for at least 6 full months (at least 30 hours/week). Short intermittent contracts that do not add up to 6 continuous months will not qualify.'
      },
      {
        question: 'Can experience on a family-owned farm be used?',
        answer:
          'Yes, provided the farm was a registered commercial business and you can provide official registration certificates, tax returns, and bank statements proving you received regular compensation.'
      },
      {
        question: 'What is the difference between this draw and the Agri-Food Pilot?',
        answer:
          'Category-Based Express Entry is points-based and faster (processed in ~6 months). The Agri-Food Pilot is an employer-driven program that does not use the CRS points grid and accepts lower language scores.'
      }
    ]
  },
  {
    id: 'french',
    slugs: ['french', 'french-language-occupations', 'french-proficiency'],
    title: 'French-Language Proficiency Category',
    shortLabel: 'French',
    icon: '🇫🇷',
    color: '#A78BFA',
    filterKey: 'Universal',
    description:
      'Canada prioritizes bilingual and Francophone candidates to strengthen French-speaking communities outside Quebec. French draws regularly feature the lowest CRS cutoffs in Express Entry history.',
    criteria: [
      'Minimum NCLC 7 across all 4 language abilities (Listening, Reading, Writing, Speaking) on TEF Canada or TCF Canada.',
      'No specific occupation restriction—candidates with experience in ANY TEER 0, 1, 2, or 3 job qualify.',
      'Active Express Entry profile under FSWP, CEC, or FSTP.',
      'Must intend to live and work in any Canadian province or territory OUTSIDE Quebec.'
    ],
    licensingReality: {
      title: 'Language Benchmark is Your Primary Credential',
      summary:
        'Unlike healthcare or engineering, there are zero trade or licensing hurdles. Your qualifying credential is your official test report form showing NCLC 7 in all four abilities from either TEF Canada or TCF Canada.',
      takeaway:
        'Any professional in any skilled field who scores NCLC 7 in French can get invited with CRS scores as low as 380–410 points.'
    },
    deepDive: {
      badge: 'Fast-Track Advantage',
      title: 'The Mobilité Francophone (Code C16) & 2026 Expansion Targets',
      intro:
        'French proficiency is the single most powerful advantage in Canadian immigration today. Here is why:',
      points: [
        {
          label: '2026 Francophone Expansion Targets (8% to 10%)',
          desc: 'Under the official Immigration Levels Plan, Canada has legislated targets to increase Francophone immigration outside Quebec to 8.5% in 2026 and 10% by 2027. This mandates massive regular invitation rounds (often 3,000–6,000 ITAs per draw) with cutoffs below 410 points.'
        },
        {
          label: 'The Mobilité Francophone Secret Weapon (Work Permit Code C16)',
          desc: 'French speakers with moderate conversational French (NCLC 5+ in speaking/listening) who have a job offer from an employer outside Quebec in any TEER 0, 1, 2, or 3 role can obtain an LMIA-exempt work permit under International Mobility Program code C16. Your employer does not need to pay for an LMIA or prove no Canadians were available!'
        },
        {
          label: 'Exact NCLC 7 Score Requirements (TEF vs TCF Canada)',
          desc: 'You must achieve NCLC 7 in all 4 abilities: On TEF Canada: Listening 249+, Reading 207+, Writing 310+, Speaking 310+. On TCF Canada: Listening 458+, Reading 453+, Writing 10+, Speaking 10+.'
        }
      ]
    },
    strategyTips: [
      {
        title: 'Earn +50 Bonus CRS Points',
        desc: 'Scoring NCLC 7 in French along with CLB 5+ in English awards an automatic +50 bonus points to your overall CRS profile, in addition to qualifying you for French-only category draws.'
      },
      {
        title: 'Open to All 516 Skilled Occupations',
        desc: 'Whether you are an accountant, software engineer, teacher, cook, or marketer—if your NOC is in TEER 0, 1, 2, or 3, you are eligible for French draws.'
      },
      {
        title: 'Choose Between TEF Canada and TCF Canada',
        desc: 'Both exams are equally accepted by IRCC. Many test-takers find TCF Canada’s multiple-choice format slightly more approachable for listening and reading sections.'
      }
    ],
    faqs: [
      {
        question: 'What exact test score is needed to reach NCLC 7?',
        answer:
          'On TEF Canada: Listening (249+), Reading (207+), Writing (310+), Speaking (310+). On TCF Canada: Listening (458+), Reading (453+), Writing (10+), Speaking (10+). You must achieve NCLC 7 in all four sections.'
      },
      {
        question: 'Can I use French category selection to immigrate to Quebec?',
        answer:
          'No. Express Entry is strictly for candidates who intend to live and work in Canada OUTSIDE of the province of Quebec (such as Ontario, BC, Alberta, or New Brunswick). Quebec manages its own separate immigration system.'
      },
      {
        question: 'Do I need work experience in a French-speaking country?',
        answer:
          'No. You can learn French anywhere in the world (India, Nigeria, France, etc.). IRCC only evaluates your official TEF or TCF Canada test results, not where you learned the language.'
      },
      {
        question: 'Can I qualify for French category draws with any profession?',
        answer:
          'Yes! Unlike STEM or Healthcare which restrict eligibility to specific NOCs, French category draws invite candidates with experience in ANY skilled occupation across TEER 0, 1, 2, or 3.'
      }
    ]
  }
]
