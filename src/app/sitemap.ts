import type { MetadataRoute } from 'next'
import allNocs from '@/data/allNocsDetail.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://canadanocguide.com'
  // Use stable dates — update these only when the page content actually changes
  const nocReferenceDate = new Date('2026-09-01')
  // Express Entry draws updates are frequent; use a recent stable date
  const drawsUpdatedDate = new Date('2026-09-10')

  // 1. Core Pages & Hubs
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: nocReferenceDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/noc`,
      lastModified: nocReferenceDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/noc-converter`,
      lastModified: nocReferenceDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/express-entry-draws`,
      lastModified: drawsUpdatedDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/crs-calculator`,
      lastModified: nocReferenceDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/express-entry`,
      lastModified: nocReferenceDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/teer`,
      lastModified: nocReferenceDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/wages`,
      lastModified: nocReferenceDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: nocReferenceDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: nocReferenceDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: nocReferenceDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: nocReferenceDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: nocReferenceDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ]

  // 2. Category Priority Hubs
  const categories = ['stem', 'healthcare', 'trades', 'transport', 'agriculture', 'french']
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/express-entry/${cat}`,
    lastModified: nocReferenceDate,
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  // 3. TEER Level Pages (0-5)
  const teerLevels = ['0', '1', '2', '3', '4', '5']
  const teerPages: MetadataRoute.Sitemap = teerLevels.map((lvl) => ({
    url: `${baseUrl}/teer/${lvl}`,
    lastModified: nocReferenceDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // 4. Provincial & Territorial Wage Hubs (13 Regions)
  const provinces = [
    'ontario', 'british-columbia', 'alberta', 'quebec', 'manitoba',
    'saskatchewan', 'nova-scotia', 'new-brunswick', 'newfoundland', 'prince-edward-island',
    'yukon', 'northwest-territories', 'nunavut'
  ]
  const wagePages: MetadataRoute.Sitemap = provinces.map((p) => ({
    url: `${baseUrl}/wages/${p}`,
    lastModified: nocReferenceDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // 5. All 516 NOC Pages
  const nocPages: MetadataRoute.Sitemap = Object.keys(allNocs).map((code) => ({
    url: `${baseUrl}/noc/${code}`,
    lastModified: nocReferenceDate,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  return [...corePages, ...categoryPages, ...teerPages, ...wagePages, ...nocPages]
}
