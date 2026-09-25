import type { Locale } from '@/utilities/locale'
import { SITE_NAME } from '@/utilities/site'

/**
 * `WebSite` JSON-LD for the homepage — factual site identity only. No SearchAction (search is
 * noindex) and no fabricated publisher Organization.
 */
export function buildWebSiteJsonLd({
  locale,
  serverUrl,
}: {
  locale: Locale
  serverUrl: string
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: serverUrl,
    inLanguage: locale,
  }
}
