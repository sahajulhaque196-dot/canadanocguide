import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import HeaderNav from '@/components/home/HeaderNav'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import AccordionFaq from '@/components/ui/AccordionFaq'
import Footer from '@/components/home/Footer'

import allNocs from '@/data/allNocsDetail.json'
import { TEER_LEVELS } from '@/data/teerData'
import type { NocRecord } from '@/types/noc'
import TeerNocTable from '@/components/teer/TeerNocTable'
import { getAlternates } from '@/lib/seo'

interface PageProps {
  params: Promise<{ level: string }>
}

interface TeerDeepData {
  educationDeepDive: string
  crsImpact: string
  prPathwaysGuide: string
  highlightModule: {
    badge: string
    title: string
    intro: string
    keyPoints: { label: string; desc: string }[]
  }
  faqs: { question: string; answer: string }[]
}

const TEER_INSIGHTS: Record<number, TeerDeepData> = {
  0: {
    educationDeepDive:
      'TEER 0 occupations encompass management, director, and executive leadership roles across all industries. While many positions benefit from a university degree or college diploma, operational management roles (such as retail store managers, restaurant managers, or construction superintendents) allow extensive progressive supervisory experience to substitute for formal university degrees.',
    crsImpact:
      'Work experience in TEER 0 earns standard skilled experience points under Core Human Capital. However, job offers have a major advantage: if your approved LMIA or LMIA-exempt job offer falls under Major Group 00 (Senior Executive / Management), it awards 200 CRS bonus points. All other specialized or middle management jobs in TEER 0 receive 50 points.',
    prPathwaysGuide:
      'Directly eligible for the Federal Skilled Worker Program (FSWP) and Canadian Experience Class (CEC). Highly favoured in Provincial Nominee Programs (PNP) seeking corporate leaders, entrepreneurs, and senior operations managers.',
    highlightModule: {
      badge: 'Senior Executive Advantage',
      title: 'The Major Group 00 Rule: 200 CRS Points vs 50 Points',
      intro:
        'Not all managerial job offers receive the same CRS score bonus. IRCC divides TEER 0 management into two distinct tiers:',
      keyPoints: [
        {
          label: 'Senior Management (Major Group 00) = 200 Bonus Points',
          desc: 'Applies strictly to Legislators and Senior Managers (NOCs 00011 through 00015, such as Corporate Vice-Presidents, Financial Executives, and Government Senior Officials). An approved job offer in this group awards +200 bonus CRS points.'
        },
        {
          label: 'Middle & Specialized Management = 50 Bonus Points',
          desc: 'Positions like Restaurant Managers (NOC 60030), Retail Sales Managers (NOC 60020), and IT Managers (NOC 20012) receive +50 points for a valid job offer.'
        },
        {
          label: 'Managerial Reference Letter Audit Standards',
          desc: 'Your employer reference letter must clearly prove supervisory authority, budget control, and personnel oversight (hiring/firing). If duties match team coordination without executive discretion, IRCC officers may reclassify you to TEER 1 or 2.'
        }
      ]
    },
    faqs: [
      {
        question: 'Do I need a university degree to qualify for TEER 0 management jobs?',
        answer:
          'Not always. While technical managerial jobs (like engineering or IT directors) require relevant degrees, many operational management roles allow 3 to 5 years of progressive supervisory experience to substitute for a degree.'
      },
      {
        question: 'Does a manager job offer award 50 or 200 CRS points?',
        answer:
          'Only Senior Management positions classified under Major Group 00 (e.g. corporate senior executives, legislators) receive 200 points. All other specialized or middle management jobs in TEER 0 receive 50 points.'
      },
      {
        question: 'What proof of managerial duties does IRCC require?',
        answer:
          'Your employment reference letter must explicitly show that you managed personnel, held budgetary or operational oversight, and possessed hiring or disciplinary authority.'
      },
      {
        question: 'Can I qualify for Express Entry category-based draws with a TEER 0 job?',
        answer:
          'Yes. Certain management occupations in STEM (like computer and information systems managers - NOC 20012) or healthcare (managers in healthcare - NOC 30010) are specifically targeted in category-based invitation rounds.'
      }
    ]
  },
  1: {
    educationDeepDive:
      'TEER 1 occupations are professional roles that formally require a university degree (Bachelor’s, Master’s, or Doctorate). For international candidates, having an Educational Credential Assessment (ECA) from an IRCC-approved organization like WES, ICAS, or IQAS is mandatory to prove Canadian academic equivalency.',
    crsImpact:
      'Candidates with university degrees and TEER 1 experience score the highest possible points in Core Human Capital. A Master’s degree awards 135 points for education (compared to 120 for a Bachelor’s) and unlocks the maximum 50-point skill transferability bonus when paired with CLB 9 language proficiency.',
    prPathwaysGuide:
      'The primary talent pool for Federal Skilled Worker (FSWP), Canadian Experience Class (CEC), and priority category draws (STEM and Healthcare). TEER 1 professionals also benefit from fast-tracked provincial tech and healthcare streams across Ontario, BC, and Alberta.',
    highlightModule: {
      badge: 'Academic & Professional Route',
      title: 'ECA Degree Evaluation & The CLB 9 Booster (+50 Pts)',
      intro:
        'TEER 1 candidates form the backbone of the Express Entry pool. Here is how to maximize your competitive score:',
      keyPoints: [
        {
          label: 'ECA Equivalency Assessment (WES / ICAS / IQAS)',
          desc: 'Every foreign degree must have a valid Educational Credential Assessment completed within the last 5 years. For Indian degrees, 3-year Bachelor degrees (B.Com, B.Sc) from NAAC "A" accredited institutions are generally assessed as 3-year Canadian degrees, while 4-year B.Tech/BE degrees receive full 4-year Bachelor equivalency.'
        },
        {
          label: 'The CLB 9 Language Multiplier',
          desc: 'For TEER 1 professionals, scoring CLB 9 (IELTS: 8.0 Listening, 7.0 Reading, 7.0 Writing, 7.0 Speaking) triggers maximum skill transferability points, adding up to +50 points for education and +50 points for foreign work experience.'
        },
        {
          label: 'Licensing Reality for Foreign Engineers & Nurses',
          desc: 'You do not need a Canadian professional license (such as P.Eng or provincial nursing registration) to receive an Invitation to Apply (ITA) or Canada PR visa. IRCC evaluates your degrees and verified work experience.'
        }
      ]
    },
    faqs: [
      {
        question: 'Is an Educational Credential Assessment (ECA) mandatory for TEER 1 jobs?',
        answer:
          'Yes. If you completed your education outside of Canada, you must submit an official ECA report verifying that your degree is equivalent to a completed Canadian degree to claim education and skill transferability points.'
      },
      {
        question: 'Can work experience during university studies count toward TEER 1?',
        answer:
          'Under the Canadian Experience Class (CEC), Canadian student work experience does not count. However, under the Federal Skilled Worker Program (FSWP), foreign paid work experience gained while studying full-time can count, provided it was continuous and at least 30 hours per week.'
      },
      {
        question: 'Do TEER 1 professionals need Canadian licensing before immigrating?',
        answer:
          'No. IRCC issues Permanent Residency based on your verified past experience, education, and language tests. You do not need a Canadian license (such as P.Eng or medical registration) to receive an Invitation to Apply (ITA).'
      },
      {
        question: 'Which immigration programs are best suited for TEER 1 candidates?',
        answer:
          'Express Entry (FSWP and CEC) is the fastest route. If your CRS score is below 490, targeted category draws (STEM/Healthcare) and provincial nomination streams (like OINP Human Capital Priorities) provide rapid pathways.'
      }
    ]
  },
  2: {
    educationDeepDive:
      'TEER 2 occupations include technical, paraprofessional, and skilled trades jobs requiring 2 to 3 years of post-secondary college education, a 2- to 5-year apprenticeship training program, or extensive supervisory experience in a related field.',
    crsImpact:
      'A 2-year or 3-year college diploma provides solid education points (98 to 112 points for singles). When paired with 3 years of skilled foreign experience and CLB 7+ language scores, candidates remain highly competitive for Express Entry draws.',
    prPathwaysGuide:
      'Eligible for Federal Skilled Worker (FSWP), Canadian Experience Class (CEC), and the Federal Skilled Trades Program (FSTP). Skilled trades in TEER 2 (like electricians and plumbers) receive priority invitations under Category-Based Selection.',
    highlightModule: {
      badge: 'Skilled Technical & Trades',
      title: 'TEER 2 vs TEER 3 Comparison Matrix & Red Seal Trades',
      intro:
        'Understanding how TEER 2 differs from TEER 3 clarifies education and language requirements:',
      keyPoints: [
        {
          label: 'Education Duration Difference',
          desc: 'TEER 2 strictly requires 2 to 3 years of completed college/polytechnic diploma study or an extensive 2-to-5 year trade apprenticeship. TEER 3 requires less than 2 years of college or more than 6 months of on-the-job training.'
        },
        {
          label: 'CEC Language Requirement: CLB 5 (Not CLB 7!)',
          desc: 'Under the Canadian Experience Class (CEC), candidates with Canadian work experience in TEER 2 or TEER 3 only need CLB 5 in English or French across all four sections. This is a major advantage over TEER 0 and TEER 1, which require CLB 7.'
        },
        {
          label: 'Red Seal Trades & Certificate of Qualification',
          desc: 'Trade professionals in TEER 2 (e.g. Electricians NOC 72200, Plumbers NOC 72300, Welders NOC 72106) can challenge the provincial Red Seal examination based on foreign hours, earning a Certificate of Qualification and an instant +50 bonus CRS points.'
        }
      ]
    },
    faqs: [
      {
        question: 'What is the main difference between TEER 2 and TEER 3?',
        answer:
          'TEER 2 requires 2 to 3 years of post-secondary college or a 2- to 5-year trade apprenticeship. TEER 3 requires less than 2 years of college, an apprenticeship of less than 2 years, or more than 6 months of on-the-job training.'
      },
      {
        question: 'Can university degree holders apply under a TEER 2 occupation?',
        answer:
          'Yes. Your educational background can exceed the minimum requirement. For example, a candidate with a Bachelor’s degree in Computer Science who worked as a Computer Network Technician (TEER 2) claims full Bachelor’s degree education points.'
      },
      {
        question: 'Are TEER 2 skilled trades eligible for category-based draws?',
        answer:
          'Yes. High-demand trade occupations in TEER 2 (like electricians, plumbers, and carpenters) are explicitly invited in dedicated Category-Based Trades rounds with cutoffs averaging in the 430s.'
      },
      {
        question: 'What language benchmark is required for TEER 2 under Express Entry?',
        answer:
          'Under the Canadian Experience Class (CEC), TEER 2 candidates only need CLB 5 across all 4 sections. If applying under the Federal Skilled Worker Program (FSWP), you need CLB 7. If applying under the Federal Skilled Trades Program (FSTP), the minimum is CLB 5 in Speaking/Listening and CLB 4 in Reading/Writing.'
      }
    ]
  },
  3: {
    educationDeepDive:
      'TEER 3 occupations represent intermediate skilled positions that require a post-secondary college diploma of less than 2 years, an apprenticeship of less than 2 years, or more than 6 months of specialized on-the-job training following secondary school completion.',
    crsImpact:
      'Experience in TEER 3 receives full skilled work points in the Comprehensive Ranking System (CRS), identical to TEER 0, 1, and 2. Even a 1-year completed diploma grants 90 points for education in the CRS grid.',
    prPathwaysGuide:
      'Fully eligible for Federal Skilled Worker (FSWP) and Canadian Experience Class (CEC). Also targeted in category draws for Transport (truck drivers - NOC 73300) and Trades (cooks, mechanics).',
    highlightModule: {
      badge: 'Intermediate Skilled Roles',
      title: 'The NOC 2016 Skill Level B Split & High-Demand TEER 3 Jobs',
      intro:
        'When Canada introduced the 5-digit NOC 2021 system, old Skill Level B was split into TEER 2 and TEER 3:',
      keyPoints: [
        {
          label: 'The NOC 2016 "Skill Level B" Split',
          desc: 'Under the old 4-digit system, both 3-year technical diplomas and 6-month certificates were lumped together under "Skill Level B". NOC 2021 created TEER 3 to represent intermediate skilled roles while keeping them fully eligible for Express Entry.'
        },
        {
          label: 'High-Demand Priority Occupations in TEER 3',
          desc: 'Critical shortages exist in TEER 3 occupations: Transport Truck Drivers (NOC 73300) qualify for Transport category draws, Cooks (NOC 63200) qualify for Trades draws, and Dental Assistants (NOC 33100) qualify for Healthcare draws.'
        },
        {
          label: 'CEC Language Threshold: CLB 5',
          desc: 'Like TEER 2, foreign workers who complete 1 year of Canadian skilled experience in a TEER 3 role only need CLB 5 (e.g. IELTS Reading 4.0, Writing 5.0, Listening 5.0, Speaking 5.0) to qualify for the Canadian Experience Class.'
        }
      ]
    },
    faqs: [
      {
        question: 'Is TEER 3 eligible for Express Entry PR programs?',
        answer:
          'Yes! Under the NOC 2021 system, TEER 3 is 100% eligible for both the Federal Skilled Worker Program (FSWP) and the Canadian Experience Class (CEC).'
      },
      {
        question: 'Can I qualify for category-based draws with a TEER 3 occupation?',
        answer:
          'Yes. Key occupations like Transport truck drivers (NOC 73300), Cooks (NOC 63200), and Dental assistants (NOC 33100) are in TEER 3 and receive dedicated category draw invitations with lower cutoffs.'
      },
      {
        question: 'What if my post-secondary certificate was only 1 year long?',
        answer:
          'A 1-year certificate or diploma from an accredited institution satisfies the TEER 3 education requirement, provided your Educational Credential Assessment (ECA) confirms it as a completed post-secondary credential.'
      },
      {
        question: 'Do administrative assistants qualify under TEER 3?',
        answer:
          'Yes. Administrative assistants (NOC 13110) are classified under TEER 3 and qualify for Express Entry PR applications.'
      }
    ]
  },
  4: {
    educationDeepDive:
      'TEER 4 occupations are intermediate support roles that require secondary school (high school) graduation, job-specific training of several weeks, or several months of informal workplace training.',
    crsImpact:
      'TEER 4 work experience does NOT count toward Federal Express Entry eligibility (FSWP, CEC, or FSTP). However, it is fully recognized in Provincial Nominee Programs (PNP) and regional pilots.',
    prPathwaysGuide:
      'While not eligible for direct Express Entry, thousands of TEER 4 workers transition to Canadian Permanent Residency every year through Provincial Nominee Program (PNP) Semi-Skilled streams, the Atlantic Immigration Program (AIP), and Rural Community Immigration Pilots.',
    highlightModule: {
      badge: 'Regional PR Pathways',
      title: 'Can TEER 4 Jobs Get Canada PR? Top 5 Provincial PNP Routes',
      intro:
        'Thousands of applicants worry that a TEER 4 job offer means no PR pathway. Here are the top provincial options:',
      keyPoints: [
        {
          label: 'Top 5 Provincial Nominee Streams for TEER 4',
          desc: '1. BC PNP Entry-Level & Semi-Skilled (ELSS). 2. Alberta Opportunity Stream (AOS). 3. Saskatchewan Hard-to-Fill Skills Stream. 4. Ontario OINP In-Demand Skills Stream. 5. Manitoba Skilled Worker Stream.'
        },
        {
          label: 'Atlantic Immigration Program (AIP) Intermediate Stream',
          desc: 'In Nova Scotia, New Brunswick, PEI, and Newfoundland, candidates with full-time TEER 4 job offers from designated employers can apply directly for Canadian Permanent Residency with only CLB 4 English/French.'
        },
        {
          label: 'Career Laddering to TEER 2 or TEER 3',
          desc: 'Workers who start in TEER 4 positions (e.g. Retail store clerks NOC 64100 or Food servers NOC 65201) frequently get promoted to supervisory roles (e.g. Retail sales supervisor NOC 62010 in TEER 2), qualifying them directly for Express Entry CEC within 12 months.'
        }
      ]
    },
    faqs: [
      {
        question: 'Can I apply for Canada PR with a TEER 4 job?',
        answer:
          'Yes, but not through Federal Express Entry directly. You must apply through Provincial Nominee Program (PNP) streams like BC PNP Entry-Level/Semi-Skilled, Alberta Opportunity Stream, Saskatchewan Hard-to-Fill Skills, or the Atlantic Immigration Program (AIP).'
      },
      {
        question: 'What is the required language level for TEER 4 PNP streams?',
        answer:
          'Most provincial semi-skilled streams require only CLB 4 or CLB 5 in English or French, which is much easier to achieve than the CLB 7 required for Express Entry.'
      },
      {
        question: 'How much Canadian work experience is needed for TEER 4 PR?',
        answer:
          'Most provinces require 6 to 9 months of full-time work with an eligible provincial employer on a valid work permit before you can submit your provincial nomination application.'
      },
      {
        question: 'Can I upgrade from TEER 4 to TEER 3 while working in Canada?',
        answer:
          'Yes. Many workers gain experience in TEER 4 positions, get promoted to supervisory roles (e.g., retail sales supervisor - NOC 62010 in TEER 2), and then qualify directly for Express Entry CEC!'
      }
    ]
  },
  5: {
    educationDeepDive:
      'TEER 5 encompasses entry-level and labour occupations that have no formal educational requirements. Demonstration of job duties or brief on-the-job training provided by the employer is standard.',
    crsImpact:
      'TEER 5 experience does not qualify for Express Entry points. It is utilized primarily under the Temporary Foreign Worker Program (TFWP) with LMIA work permits and provincial pilot pathways.',
    prPathwaysGuide:
      'Transition to Permanent Residency is achieved through employer-supported regional programs, such as the Agri-Food Pilot (AFIP), Rural & Community Immigration Pilots (RCIP), and dedicated provincial semi-skilled streams in Alberta, Saskatchewan, Manitoba, and British Columbia.',
    highlightModule: {
      badge: 'Entry-Level & Pilot Programs',
      title: 'Entry-Level PR Pathways: Regional Pilots, AFIP & Provincial Streams',
      intro:
        'Labour and entry-level positions can transition to PR through employer-supported provincial programs:',
      keyPoints: [
        {
          label: 'Provincial Semi-Skilled Streams (Alberta, Saskatchewan, BC, Manitoba)',
          desc: 'Provinces with critical service and labour shortages operate specialized streams for TEER 5 workers on temporary work permits. Programs like the Alberta Tourism and Hospitality Stream, BC PNP Entry-Level/Semi-Skilled, and Saskatchewan Existing Work Permit stream accept cleaners, food counter attendants, and processing labourers with CLB 4 language scores.'
        },
        {
          label: 'Rural and Community Immigration Pilots (RCIP)',
          desc: 'Designated smaller communities across Ontario, Manitoba, Saskatchewan, Alberta, and BC operate community recommendation pathways accepting workers in local shortage occupations with accessible credential requirements.'
        },
        {
          label: 'The Agri-Food Immigration Pilot (AFIP)',
          desc: 'Provides a direct path to Permanent Residency for year-round agricultural workers in meat processing, greenhouse harvesting, and livestock operations who have 1 year of Canadian non-seasonal work experience.'
        }
      ]
    },
    faqs: [
      {
        question: 'Can entry-level (TEER 5) workers ever get Canadian Permanent Residency?',
        answer:
          'Yes. While TEER 5 jobs are ineligible for direct Express Entry and the Atlantic Immigration Program (which is statutorily capped at TEER 4), workers in food service, hospitality, and agriculture frequently secure PR through dedicated provincial streams (like the Alberta Tourism & Hospitality Stream or Saskatchewan Existing Work Permit stream) or the Agri-Food Pilot.'
      },
      {
        question: 'What are the main requirements for TEER 5 PR streams?',
        answer:
          'You typically need a permanent full-time job offer from an eligible Canadian employer, a valid work permit, 6 to 12 months of local work experience with that employer, and a minimum language score of CLB 4.'
      },
      {
        question: 'Is education assessed for TEER 5 PR applications?',
        answer:
          'While the job itself requires no formal education, most provincial immigration programs require applicants to have completed at least a high school diploma (verified with an ECA).'
      },
      {
        question: 'What is the fastest pathway to PR for a TEER 5 worker?',
        answer:
          'Securing employment under a closed LMIA work permit in a province with active semi-skilled streams (like Alberta, Saskatchewan, or Manitoba) or working year-round under the Agri-Food Pilot offers the most reliable route to Permanent Residency.'
      }
    ]
  }
}

export async function generateStaticParams() {
  return [0, 1, 2, 3, 4, 5].map((lvl) => ({
    level: lvl.toString(),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { level } = await params
  const teerNum = parseInt(level, 10)
  const teer = TEER_LEVELS.find((t) => t.level === teerNum)

  if (!teer) {
    return { title: 'TEER Level Not Found | CanadaNOCGuide' }
  }

  const title = `TEER ${teer.level} Occupations Canada: PR Eligibility (2026)`
  const description = `List of all ${teer.nocCount} TEER ${teer.level} occupations under Canada NOC 2021. Check education criteria, Express Entry CLB rules, and provincial PR pathways.`
  const canonicalUrl = `https://canadanocguide.com/teer/${teer.level}`

  return {
    title,
    description,
    alternates: getAlternates(`/teer/${teer.level}`),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'CanadaNOCGuide',
      locale: 'en_CA',
      type: 'website',
      images: [
        {
          url: '/pr-card-3d.jpg',
          width: 1200,
          height: 630,
          alt: `Canada TEER ${teer.level} Occupations Guide`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/pr-card-3d.jpg'],
    },
  }
}

export default async function TeerDetailPage({ params }: PageProps) {
  const { level } = await params
  const teerNum = parseInt(level, 10)
  const teer = TEER_LEVELS.find((t) => t.level === teerNum)

  if (!teer) {
    notFound()
  }

  const insights = TEER_INSIGHTS[teerNum]

  // Filter occupations matching this TEER
  const matchingNocs = Object.values(allNocs as Record<string, NocRecord>).filter(
    (noc) => noc.teer === teerNum
  )

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://canadanocguide.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'TEER Categories',
        item: 'https://canadanocguide.com/teer',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `TEER ${teer.level}`,
        item: `https://canadanocguide.com/teer/${teer.level}`,
      },
    ],
  }

  const schemaListItems = matchingNocs.slice(0, 50)
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `All TEER ${teer.level} Occupations in Canada`,
    description: `Complete list of ${matchingNocs.length} NOC 2021 occupations classified under TEER ${teer.level}.`,
    numberOfItems: matchingNocs.length,
    itemListElement: schemaListItems.map((noc, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: `${noc.code} - ${noc.title}`,
      url: `https://canadanocguide.com/noc/${noc.code}`,
    })),
  }

  const faqList = (insights?.faqs || []).map((f, idx) => ({
    id: `teer-faq-${idx}`,
    question: f.question,
    answer: f.answer,
    defaultOpen: idx === 0,
  }))

  return (
    <main className="min-h-screen bg-transparent text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <HeaderNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 space-y-12">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'TEER Categories', href: '/teer' },
            { label: `TEER ${teer.level}` },
          ]}
        />

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-10 backdrop-blur-xl">
          <div className="relative space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 uppercase tracking-wider">
                NOC 2021 Classification Standard
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-full border border-slate-800 bg-slate-950/70 text-slate-300">
                {teer.nocCount} Occupations
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                TEER {teer.level} Occupations in Canada: Requirements &amp; PR Pathways (2026)
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                {teer.shortDef}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase block">Express Entry Status</span>
                <span className={`text-base font-bold font-mono block ${teer.eeEligible ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {teer.eeEligible ? '✓ Eligible for Express Entry (FSW & CEC)' : '⚠ Regional PNP & Pilot Streams Only'}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase block">Minimum Education</span>
                <span className="text-sm font-semibold text-white block">
                  {teer.educationReq}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase block">Typical Experience</span>
                <span className="text-sm font-semibold text-white block">
                  {teer.experienceReq}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: Deep Education & CRS Criteria */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8 space-y-4 backdrop-blur-xl">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Education Standards</div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              TEER {teer.level} Education &amp; Minimum Experience Requirements
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {insights?.educationDeepDive}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8 space-y-4 backdrop-blur-xl">
            <div className="text-xs font-mono text-purple-400 uppercase tracking-wider">CRS Scoring Impact</div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              How TEER {teer.level} Work Experience Affects Your Express Entry CRS Score
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {insights?.crsImpact}
            </p>
          </div>
        </section>

        {/* SECTION 2: STREAM-SPECIFIC DEEP DIVE MODULE (Zero Boilerplate) */}
        {insights?.highlightModule && (
          <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-10 space-y-6 backdrop-blur-xl">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-xs font-mono uppercase tracking-wider">
                {insights.highlightModule.badge}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {insights.highlightModule.title}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {insights.highlightModule.intro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {insights.highlightModule.keyPoints.map((kp, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 block">Rule 0{idx + 1}</span>
                  <h3 className="text-sm font-bold text-white">{kp.label}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{kp.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 3: Immigration Pathways Card */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8 space-y-4 backdrop-blur-xl">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">PR Program Eligibility</div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Immigration Pathways for TEER {teer.level} Occupations
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {insights?.prPathwaysGuide}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {teer.programEligibility.map((prog, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl text-xs font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
              >
                ✓ {prog}
              </span>
            ))}
          </div>
        </section>

        {/* Matching NOCs Table */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                All TEER {teer.level} Occupations ({matchingNocs.length})
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Search by code or title to check official duties, regional salaries, and target streams.
              </p>
            </div>
          </div>

          <TeerNocTable
            nocs={matchingNocs.map((item) => ({
              code: item.code,
              title: item.title,
              priorityCategory: item.priorityCategory,
              medianWage: item.wages.national?.median || item.wages.provinces['ON']?.median || 'Varies by province',
            }))}
            teerLevel={teer.level}
          />
        </section>

        {/* Action Pathways */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {teer.eeEligible ? (
            <Link
              href="/crs-calculator"
              className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all group flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-mono text-cyan-400">CRS CALCULATOR</div>
                <div className="text-base font-bold text-white group-hover:text-cyan-300 mt-1">Calculate Your Points</div>
                <p className="text-xs text-slate-400 mt-1">Check how your TEER {teer.level} experience translates into CRS points.</p>
              </div>
              <svg className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/wages"
              className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all group flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-mono text-cyan-400">PROVINCIAL WAGES &amp; DEMAND</div>
                <div className="text-base font-bold text-white group-hover:text-cyan-300 mt-1">Check Provincial Wage Rates</div>
                <p className="text-xs text-slate-400 mt-1">Compare prevailing wages across 13 provinces for employer-supported PNP streams.</p>
              </div>
              <svg className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}

          <Link
            href="/noc"
            className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-purple-500/50 hover:bg-slate-900/60 transition-all group flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-mono text-purple-400">NOC DIRECTORY</div>
              <div className="text-base font-bold text-white group-hover:text-purple-300 mt-1">Search All 516 Occupations</div>
              <p className="text-xs text-slate-400 mt-1">Explore job descriptions, unit groups, and sister NOC codes.</p>
            </div>
            <svg className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Smooth +/- Accordion FAQ Section */}
        <section className="pt-4">
          <AccordionFaq
            title={`TEER ${teer.level} Immigration FAQ`}
            subtitle={`Common questions about TEER ${teer.level} education, work experience, and Canadian PR rules.`}
            badge={`TEER ${teer.level} FAQ`}
            items={faqList}
            includeSchema={true}
          />
        </section>

        {/* Other TEER Levels Navigation Mesh */}
        <section className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
            Explore All 6 TEER Categories in Canada NOC 2021
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {[
              { lvl: '0', label: 'TEER 0', sub: 'Management' },
              { lvl: '1', label: 'TEER 1', sub: 'Degree' },
              { lvl: '2', label: 'TEER 2', sub: 'College/Trade' },
              { lvl: '3', label: 'TEER 3', sub: 'Technical' },
              { lvl: '4', label: 'TEER 4', sub: 'Semi-Skilled' },
              { lvl: '5', label: 'TEER 5', sub: 'Entry-Level' },
            ].map((t) => (
              <Link
                key={t.lvl}
                href={`/teer/${t.lvl}`}
                className={`p-3 rounded-xl border text-center transition-all ${
                  t.lvl === String(teer.level)
                    ? 'border-cyan-500 bg-cyan-950/30 text-cyan-300 font-bold'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className="font-mono text-sm font-bold">{t.label}</div>
                <div className="text-[10px] text-slate-500 truncate">{t.sub}</div>
              </Link>
            ))}
          </div>
        </section>

      </div>

      <Footer />

    </main>
  )
}
