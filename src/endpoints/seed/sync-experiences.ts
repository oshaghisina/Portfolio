import type { Payload } from 'payload'

import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/utilities/locale'

import { experienceCopy, type ExperienceLocale } from './experience-copy'
import {
  experienceEnData,
  experienceFaData,
  experiencesData,
  type ExperienceSeedEntry,
} from './experiences'

/**
 * Bring the `experiences` collection in line with `experiencesData` without a full wipe.
 *
 * Used for the Carsparency / Khodro45 split: update the existing `order: 2` row to Carsparency,
 * create `order: 11` (Khodro45) if missing, and refresh every locale leaf from seed + copy tables.
 */
export async function syncExperiences({ payload }: { payload: Payload }) {
  const { docs } = await payload.find({
    collection: 'experiences',
    depth: 0,
    limit: 100,
    locale: DEFAULT_LOCALE,
    pagination: false,
  })

  const byOrder = new Map(docs.map((doc) => [doc.order, doc] as const))
  const created: number[] = []
  const updated: number[] = []

  for (const entry of experiencesData) {
    const existing = byOrder.get(entry.order)
    if (!existing) {
      const doc = await payload.create({
        collection: 'experiences',
        context: { disableRevalidate: true },
        data: experienceEnData(entry),
        depth: 0,
      })
      byOrder.set(entry.order, doc)
      created.push(entry.order)
      await applyLocales(payload, doc.id, entry)
      continue
    }

    await payload.update({
      collection: 'experiences',
      id: existing.id,
      context: { disableRevalidate: true },
      data: experienceEnData(entry),
      depth: 0,
      locale: DEFAULT_LOCALE,
    })
    await applyLocales(payload, existing.id, entry)
    updated.push(entry.order)
  }

  payload.logger.info(
    `— Experiences synced (${created.length} created, ${updated.length} updated; orders ${[...created, ...updated].sort((a, b) => a - b).join(', ')})`,
  )

  return { created, updated }
}

async function applyLocales(payload: Payload, id: string | number, entry: ExperienceSeedEntry) {
  await payload.update({
    collection: 'experiences',
    id,
    context: { disableRevalidate: true },
    data: experienceFaData(entry),
    depth: 0,
    locale: 'fa',
  })

  for (const locale of LOCALES) {
    if (locale === 'en' || locale === 'fa') continue
    const fields = experienceCopy[locale as ExperienceLocale]?.[entry.order]
    if (!fields) continue
    await payload.update({
      collection: 'experiences',
      id,
      context: { disableRevalidate: true },
      data: {
        title: fields.title,
        company: fields.company,
        product: fields.product,
        role: fields.role,
        domain: fields.domain,
        summary: fields.summary,
        period: { durationLabel: fields.durationLabel },
      },
      depth: 0,
      locale: locale as Locale,
    })
  }
}
