import type { Payload } from 'payload'

import path from 'path'

import { upsertMedia } from './media'
import {
  RP1_ASSETS,
  RP1_MEDIA,
  RP1_SHARED_FIELDS,
  RP1_SLUG,
  rp1LocalizedFields,
  SEED_LOCALES,
  type Rp1MediaIds,
  type Rp1MediaKey,
} from './rp1-arena'

export interface SeedCaseStudiesResult {
  projectId: string
  created: boolean
  media: Rp1MediaIds
}

/**
 * Seeds the RP1 case study on top of the archive entry D-021 creates — additive and idempotent,
 * so it can run against a live dev database without wiping anything:
 *
 * 1. media: upload-or-reuse by filename, localized `alt` in every seed locale;
 * 2. English: create the project if the archive seed hasn't, else add only the case-study layer
 *    (the archive facts — title, summary, kind, order, cover — stay D-021's);
 * 3. fa / ar / de: the same block structure with identical row ids and translated leaves, each
 *    published for its own locale (`localizeStatus`) and flagged `translationReviewed: false`.
 */
export async function seedCaseStudies({
  payload,
  rootDir = process.cwd(),
}: {
  payload: Payload
  /** Repo root — `Docs/` is resolved from here (dev only; `Docs/` is not deployed). */
  rootDir?: string
}): Promise<SeedCaseStudiesResult> {
  payload.logger.info('— Seeding the RP1 case study...')
  const assetsDir = path.resolve(rootDir, RP1_ASSETS)

  const media: Rp1MediaIds = {}
  for (const key of Object.keys(RP1_MEDIA) as Rp1MediaKey[]) {
    const id = await upsertMedia(payload, assetsDir, RP1_MEDIA[key])
    if (id) media[key] = id
  }

  const existing = await payload.find({
    collection: 'projects',
    depth: 0,
    draft: true,
    limit: 1,
    locale: 'en',
    pagination: false,
    where: { slug: { equals: RP1_SLUG } },
  })

  const context = { disableRevalidate: true }
  const published = {
    _status: 'published' as const,
    caseStudyStatus: 'published' as const,
    generateSlug: false,
  }
  const english = rp1LocalizedFields('en', media)

  let id = existing.docs[0]?.id
  const created = !id

  if (!id) {
    const doc = await payload.create({
      collection: 'projects',
      depth: 0,
      locale: 'en',
      context,
      data: {
        ...english,
        ...RP1_SHARED_FIELDS,
        ...published,
        slug: RP1_SLUG,
        kind: ['product'],
        order: 2,
        featured: true,
        ...(media.duelMain ? { cover: media.duelMain } : {}),
        translationReviewed: true,
      },
    })
    id = doc.id
  } else {
    // The archive facts belong to the archive seed; only the case-study layer is (re)written.
    const {
      company: _company,
      role: _role,
      summary: _summary,
      title: _title,
      ...caseStudy
    } = english
    await payload.update({
      collection: 'projects',
      id,
      depth: 0,
      locale: 'en',
      context,
      data: { ...caseStudy, ...RP1_SHARED_FIELDS, ...published, translationReviewed: true },
    })
  }

  for (const locale of SEED_LOCALES) {
    if (locale === 'en') continue
    await payload.update({
      collection: 'projects',
      id,
      depth: 0,
      locale,
      context,
      data: { ...rp1LocalizedFields(locale, media), ...published, translationReviewed: false },
    })
  }

  payload.logger.info(
    `— RP1 case study ${created ? 'created' : 'updated'} (${id}) in ${SEED_LOCALES.join(', ')}`,
  )
  return { projectId: id, created, media }
}
