import type { Metadata } from 'next'

export const SITE_URL = 'https://canadanocguide.com'

/**
 * Generates canonical and regional hreflang alternates.
 * Ensures en-CA and x-default are always preserved across all child pages in Next.js App Router.
 */
export function getAlternates(pathname: string = ''): NonNullable<Metadata['alternates']> {
  const cleanPath = pathname === '/' ? '' : pathname.startsWith('/') ? pathname : `/${pathname}`
  const fullUrl = `${SITE_URL}${cleanPath}`

  return {
    canonical: fullUrl,
    languages: {
      'en-CA': fullUrl,
      'x-default': fullUrl,
    },
  }
}

