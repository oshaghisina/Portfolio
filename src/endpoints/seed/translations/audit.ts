import type { Payload } from 'payload'

import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/utilities/locale'

/**
 * Proves the three things a translation pass can silently get wrong, none of which a route
 * returning 200 would reveal.
 *
 * 1. **Forked row ids.** Block and array rows are shared across locales and merge by `id`. A
 *    locale written without the English ids appends *new* rows instead, so the English page
 *    silently grows duplicate sections carrying text in one language only. Comparing the ordered
 *    id list across all seven locales catches it; so does an unexpected row count.
 * 2. **Published but blank.** `fallbackLocale: false` means a missing leaf renders as nothing.
 *    A locale published before its copy landed is a 200 with an empty heading — worse than the
 *    404 it replaced, because `contentReady` then advertises it in hreflang.
 * 3. **A review flag claiming more than is true.** `translationReviewed` must be `true` only for
 *    the source locale; if a seed ever sets it on a drafted locale, D-022's guarantee is void.
 *
 * Deliberately narrow: it checks the surfaces the translation seeds own, by name, rather than
 * walking the whole config. A broad walker would need an allow-list of every legitimately empty
 * field on day one, and an audit that cries wolf gets muted.
 */
export interface Finding {
  detail: string
  id: string
  kind: 'blank' | 'forked-ids' | 'review-flag' | 'unpublished'
  locale: Locale
}

const PAGE_SLUGS = ['home', 'about', 'work', 'contact'] as const

/** Collects every `id` in a blocks/array tree, in document order. */
const collectIds = (value: unknown, out: string[] = []): string[] => {
  if (Array.isArray(value)) {
    for (const item of value) collectIds(item, out)
  } else if (value && typeof value === 'object') {
    const row = value as Record<string, unknown>
    if (typeof row.id === 'string') out.push(row.id)
    for (const key of Object.keys(row)) {
      if (key !== 'id') collectIds(row[key], out)
    }
  }
  return out
}

/** True when a value is a present, non-empty leaf — including a Lexical tree with real text. */
const hasText = (value: unknown): boolean => {
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.some(hasText)
  if (value && typeof value === 'object') {
    const node = value as Record<string, unknown>
    if (typeof node.text === 'string') return node.text.trim().length > 0
    return Object.values(node).some(hasText)
  }
  return false
}

export async function auditTranslations({ payload }: { payload: Payload }): Promise<Finding[]> {
  const findings: Finding[] = []

  for (const slug of PAGE_SLUGS) {
    const byLocale = new Map<Locale, Record<string, unknown>>()

    for (const locale of LOCALES) {
      const { docs } = await payload.find({
        collection: 'pages',
        depth: 0,
        draft: true,
        fallbackLocale: false,
        limit: 1,
        locale,
        overrideAccess: true,
        pagination: false,
        where: { slug: { equals: slug } },
      })
      const doc = docs[0] as unknown as Record<string, unknown> | undefined
      if (!doc) continue
      byLocale.set(locale, doc)

      if (doc._status !== 'published') {
        findings.push({ detail: `page "${slug}" is ${doc._status}`, id: slug, kind: 'unpublished', locale })
      }
      if (!hasText(doc.title)) {
        findings.push({ detail: `page "${slug}" has no title`, id: slug, kind: 'blank', locale })
      }
      const expectedFlag = locale === DEFAULT_LOCALE
      if (Boolean(doc.translationReviewed) !== expectedFlag) {
        findings.push({
          detail: `page "${slug}" translationReviewed=${doc.translationReviewed}, expected ${expectedFlag}`,
          id: slug,
          kind: 'review-flag',
          locale,
        })
      }
    }

    const english = byLocale.get(DEFAULT_LOCALE)
    if (!english) continue
    const reference = collectIds(english.layout).join(',')

    for (const [locale, doc] of byLocale) {
      if (locale === DEFAULT_LOCALE) continue
      const ids = collectIds(doc.layout).join(',')
      if (ids !== reference) {
        findings.push({
          detail: `page "${slug}" layout row ids differ from ${DEFAULT_LOCALE}`,
          id: slug,
          kind: 'forked-ids',
          locale,
        })
      }
    }
  }

  // Projects: every locale that is published must carry a title and a summary.
  const { docs: projects } = await payload.find({
    collection: 'projects',
    depth: 0,
    draft: true,
    limit: 500,
    locale: DEFAULT_LOCALE,
    overrideAccess: true,
    pagination: false,
    select: { slug: true },
  })

  for (const project of projects) {
    for (const locale of LOCALES) {
      const doc = (await payload.findByID({
        collection: 'projects',
        id: project.id,
        depth: 0,
        draft: true,
        fallbackLocale: false,
        locale,
        overrideAccess: true,
      })) as unknown as Record<string, unknown>

      if (doc._status !== 'published') continue
      if (!hasText(doc.title) || !hasText(doc.summary)) {
        findings.push({
          detail: `project "${project.slug}" is published but has no title/summary`,
          id: project.slug!,
          kind: 'blank',
          locale,
        })
      }
    }
  }

  return findings
}
