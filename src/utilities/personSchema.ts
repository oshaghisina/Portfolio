import type { About, Media } from '@/payload-types'

const mediaUrl = (
  serverUrl: string,
  media: Media | string | number | null | undefined,
): string | undefined => {
  if (!media || typeof media !== 'object' || !media.url) return undefined
  return /^https?:\/\//i.test(media.url) ? media.url : `${serverUrl}${media.url}`
}

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
  const image = mediaUrl(serverUrl, about.portrait)

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: about.name,
    url: serverUrl,
    ...(about.headline ? { jobTitle: about.headline } : {}),
    ...(image ? { image } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  }
}
