import type { Payload } from 'payload'
import type { Page } from '@/payload-types'
import {
  DISCIPLINE_KEYS,
  isDisciplineKey,
  type DisciplineKey,
} from '@/components/ExperienceVisuals/copy'
import { LOCALES, type Locale } from '@/utilities/locale'

/** Match English labels once; apply the stable identity by row id across every translation. */
export function backfillDisciplineKeys(
  layout: Page['layout'],
  english: Page['layout'],
): Page['layout'] {
  const references = english.filter((block) => block.blockType === 'capabilityModel')
  return layout.map((block) => {
    if (block.blockType !== 'capabilityModel') return block
    const reference = references.find((candidate) => candidate.id === block.id)
    if (!reference) return block
    return {
      ...block,
      disciplines: block.disciplines?.map((row) => {
        if (isDisciplineKey(row.disciplineKey)) return row
        const original = reference.disciplines?.find((candidate) => candidate.id === row.id)
        if (!original) return row
        const label = original.label?.trim().toLowerCase()
        const key: DisciplineKey | undefined = isDisciplineKey(original.disciplineKey)
          ? original.disciplineKey
          : DISCIPLINE_KEYS.find((candidate) => candidate === label)
        return key ? { ...row, disciplineKey: key } : row
      }),
    }
  })
}

/** Narrow preview migration. All localized copy, row ids, relationships and draft status survive. */
export async function seedExperienceVisuals({ payload }: { payload: Payload }) {
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'experience' } },
    limit: 1,
    locale: 'en',
    fallbackLocale: false,
    draft: true,
    depth: 0,
    pagination: false,
  })
  const page = docs[0]
  if (!page) throw new Error('Experience page not found; no content was changed.')
  const snapshots = new Map<Locale, Page>([['en', page]])
  for (const locale of LOCALES.filter((locale) => locale !== 'en')) {
    snapshots.set(
      locale,
      await payload.findByID({
        collection: 'pages',
        id: page.id,
        locale,
        fallbackLocale: false,
        draft: true,
        depth: 0,
      }),
    )
  }
  let updatedLocales = 0
  for (const locale of LOCALES) {
    const snapshot = snapshots.get(locale)!
    const layout = backfillDisciplineKeys(snapshot.layout, page.layout)
    if (JSON.stringify(layout) === JSON.stringify(snapshot.layout)) continue
    await payload.update({
      collection: 'pages',
      id: page.id,
      locale,
      depth: 0,
      draft: snapshot._status === 'draft',
      context: { disableRevalidate: true },
      data: { layout, _status: snapshot._status },
    })
    updatedLocales++
  }
  return { pageId: page.id, updatedLocales }
}
