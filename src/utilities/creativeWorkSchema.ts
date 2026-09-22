import type { Media, Project } from '@/payload-types'

import type { Locale } from '@/utilities/locale'

const mediaUrl = (
  serverUrl: string,
  media: Media | string | number | null | undefined,
): string | undefined =>
  media && typeof media === 'object' && media.url ? `${serverUrl}${media.url}` : undefined

/**
 * `CreativeWork` JSON-LD for a case study, built only from fields the project really has —
 * the same discipline as `personSchema.ts`: no invented publisher, no ratings, no fabricated
 * dates. `headline` is the positioning statement, `description` the archive summary.
 */
export function buildCreativeWorkJsonLd({
  locale,
  project,
  serverUrl,
  url,
}: {
  project: Project
  locale: Locale
  /** Absolute, locale-prefixed URL of this page. */
  url: string
  serverUrl: string
}): Record<string, unknown> {
  const image =
    mediaUrl(serverUrl, project.meta?.image) ??
    mediaUrl(serverUrl, project.cover) ??
    mediaUrl(serverUrl, project.hero?.items?.[0]?.media)

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    ...(project.statement ? { headline: project.statement } : {}),
    description: project.summary,
    inLanguage: locale,
    url,
    ...(image ? { image } : {}),
    ...(project.publishedAt ? { datePublished: project.publishedAt } : {}),
    dateModified: project.updatedAt,
    author: { '@type': 'Person', name: 'Sina Oshaghi', url: serverUrl },
  }
}
