import type { Payload } from 'payload'

import path from 'path'

import type { ProjectKind } from '@/collections/Projects/kinds'
import type { Project } from '@/payload-types'

import { upsertMedia } from '../media'
import type { MediaSpec, SeedLocale } from '../media'

/** One locale's case-study fields — everything a `fallback: false` site needs filled per locale.
 *  Omit `hero` entirely (don't pass `hero: undefined`) for a project with no real screenshots yet. */
export interface CaseStudyLocalizedFields {
  title: string
  company: string
  role: string
  summary: string
  statement: string
  industry: string
  team: string
  hero?: { items: { id: string; media: string }[]; caption?: string }
  snapshot: { problem: string; role: string; result: string }
  sections: NonNullable<Project['sections']>
  meta: { title: string; description: string; image?: string }
}

export interface CaseStudySeedConfig<TMediaKey extends string = string> {
  /** For log lines only, e.g. "RP1", "VIN". */
  label: string
  slug: string
  /** Repo-relative path to the project's `Docs/Experience/Projects/<slug>/assets` folder. */
  assetsDir: string
  media: Record<TMediaKey, MediaSpec>
  seedLocales: SeedLocale[]
  /** Archive identity, used only on first create — normally Part A's seed row already exists. */
  createFields: {
    kind: ProjectKind[]
    order: number
    featured?: boolean
    coverMediaKey?: TMediaKey
  }
  sharedFields: Pick<Project, 'projectStatus' | 'tools' | 'period'>
  localizedFields: (
    locale: SeedLocale,
    media: Partial<Record<TMediaKey, string>>,
  ) => CaseStudyLocalizedFields
}

export interface CaseStudySeedResult {
  projectId: string
  created: boolean
  media: Partial<Record<string, string>>
}

/**
 * Seeds one project's case study on top of its archive entry (D-021/D-022) — additive and
 * idempotent, so it can run against a live dev database without wiping anything:
 *
 * 1. media: upload-or-reuse by filename, localized `alt` in every seed locale;
 * 2. English: create the project if the archive seed hasn't, else add only the case-study layer
 *    (the archive facts — title, summary, kind, order, cover — stay the archive seed's);
 * 3. every other `seedLocales` entry: the same block structure with identical row ids and
 *    translated leaves, published for its own locale (`localizeStatus`) and flagged
 *    `translationReviewed: false`.
 *
 * Generalized from the RP1 case study's original orchestration (D-022) — see `rp1-arena.ts` for
 * a worked example of building a `CaseStudySeedConfig`.
 */
export async function seedCaseStudy<TMediaKey extends string>(
  payload: Payload,
  config: CaseStudySeedConfig<TMediaKey>,
  rootDir: string = process.cwd(),
): Promise<CaseStudySeedResult> {
  payload.logger.info(`— Seeding the ${config.label} case study...`)
  const assetsDir = path.resolve(rootDir, config.assetsDir)

  const media: Partial<Record<TMediaKey, string>> = {}
  for (const key of Object.keys(config.media) as TMediaKey[]) {
    const id = await upsertMedia(payload, assetsDir, config.media[key])
    if (id) media[key] = id
  }

  const existing = await payload.find({
    collection: 'projects',
    depth: 0,
    draft: true,
    limit: 1,
    locale: 'en',
    pagination: false,
    where: { slug: { equals: config.slug } },
  })

  const context = { disableRevalidate: true }
  const published = {
    _status: 'published' as const,
    caseStudyStatus: 'published' as const,
    generateSlug: false,
  }
  const english = config.localizedFields('en', media)

  let id = existing.docs[0]?.id
  const created = !id

  if (!id) {
    const coverId = config.createFields.coverMediaKey
      ? media[config.createFields.coverMediaKey]
      : undefined
    const doc = await payload.create({
      collection: 'projects',
      depth: 0,
      locale: 'en',
      context,
      data: {
        ...english,
        ...config.sharedFields,
        ...published,
        slug: config.slug,
        kind: config.createFields.kind,
        order: config.createFields.order,
        featured: config.createFields.featured ?? false,
        ...(coverId ? { cover: coverId } : {}),
        translationReviewed: true,
      },
    })
    id = doc.id
  } else {
    // The archive facts belong to the archive seed; only the case-study layer is (re)written.
    const { company: _company, role: _role, summary: _summary, title: _title, ...caseStudy } =
      english
    await payload.update({
      collection: 'projects',
      id,
      depth: 0,
      locale: 'en',
      context,
      data: { ...caseStudy, ...config.sharedFields, ...published, translationReviewed: true },
    })
  }

  for (const locale of config.seedLocales) {
    if (locale === 'en') continue
    await payload.update({
      collection: 'projects',
      id,
      depth: 0,
      locale,
      context,
      data: { ...config.localizedFields(locale, media), ...published, translationReviewed: false },
    })
  }

  payload.logger.info(
    `— ${config.label} case study ${created ? 'created' : 'updated'} (${id}) in ${config.seedLocales.join(', ')}`,
  )
  return { projectId: id, created, media }
}
