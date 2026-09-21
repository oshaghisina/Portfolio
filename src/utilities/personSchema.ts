import type { About } from '@/payload-types'

/**
 * `Person` JSON-LD for the About page, built only from real `about` global fields — no
 * fabricated `worksFor`/`address`/`alumniOf`. Net-new: no structured data exists anywhere else
 * on the site to stay consistent with.
 */
export function buildPersonJsonLd({
  about,
  serverUrl,
}: {
  about: About
  serverUrl: string
}): Record<string, unknown> | null {
  if (!about?.name) return null

  const sameAs = (about.links ?? []).map((l) => l.url).filter((url): url is string => Boolean(url))

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: about.name,
    url: serverUrl,
    ...(about.headline ? { jobTitle: about.headline } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  }
}
