import type { Payload } from 'payload'

import path from 'path'

import type { ProjectKind } from '@/collections/Projects/kinds'
import type { Project } from '@/payload-types'
import { LOCALES, type Locale } from '@/utilities/locale'

import { upsertMedia } from '../media'
import type { MediaSpec } from '../media'

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

/**
 * `TLocale` is the set of locales this case study is written in — all seven for every case study
 * today. Every locale outside the set must stay unpublished — see `assertNoUnseededLocales`.
 */
export interface CaseStudySeedConfig<
  TMediaKey extends string = string,
  TLocale extends Locale = Locale,
> {
  /** For log lines only, e.g. "RP1", "VIN". */
  label: string
  slug: string
  /** Repo-relative path to the project's assets folder in `Docs/`. */
  assetsDir: string
  media: Record<TMediaKey, MediaSpec>
  /** Must include `en`. Readonly so `LOCALES` itself (an `as const` tuple) can be passed. */
  seedLocales: readonly TLocale[]
  /** Archive identity, used only on first create — normally Part A's seed row already exists. */
  createFields: {
    kind: ProjectKind[]
    order: number
    featured?: boolean
    coverMediaKey?: TMediaKey
  }
  /**
   * Also point the cover at `coverMediaKey` when the project already exists. Off by default: the
   * archive seed sets a cover once and never replaces it, so a case study that needs a different
   * lead visual than its archive row was seeded with has to say so.
   */
  replaceCover?: boolean
  /**
   * The second screen of the cover pair (`coverCompanion`). The archive seed never sets one, so
   * the case study owns it and writes it on every run.
   */
  coverCompanionMediaKey?: TMediaKey
  sharedFields: Pick<Project, 'projectStatus' | 'tools' | 'period'>
  localizedFields: (
    locale: TLocale,
    media: Partial<Record<TMediaKey, string>>,
  ) => CaseStudyLocalizedFields
}

export interface CaseStudySeedResult {
  projectId: string
  created: boolean
  media: Partial<Record<string, string>>
}

/**
 * Fails when the project is published in a locale its case study isn't written in. `sections` is
 * one shared block array (only the leaves are localized) and `caseStudyStatus` isn't localized at
 * all, so such a locale would pass every public gate and render the chapter scaffolding with no
 * text in it — linked from the archive, the mosaic and hreflang. Read-only; unpublish that locale
 * or add it to `seedLocales`.
 *
 * `draft: false` on purpose: a draft read returns the latest *version*, which an autosave can flip
 * to `draft` while the live locale is still published.
 */
export async function assertNoUnseededLocales(
  payload: Payload,
  config: Pick<CaseStudySeedConfig<string, Locale>, 'label' | 'seedLocales' | 'slug'>,
): Promise<void> {
  const seeded: readonly Locale[] = config.seedLocales
  for (const locale of LOCALES) {
    if (seeded.includes(locale)) continue
    const { docs } = await payload.find({
      collection: 'projects',
      depth: 0,
      draft: false,
      fallbackLocale: false,
      limit: 1,
      locale,
      overrideAccess: true,
      pagination: false,
      select: { _status: true },
      where: { slug: { equals: config.slug } },
    })
    if (docs[0]?._status === 'published') {
      throw new Error(
        `${config.label}: /${locale}/work/${config.slug} is published but its case study is not ` +
          `written in ${locale}, so it would render empty chapters. Unpublish ${locale} or add it to seedLocales.`,
      )
    }
  }
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
export async function seedCaseStudy<TMediaKey extends string, TLocale extends Locale>(
  payload: Payload,
  config: CaseStudySeedConfig<TMediaKey, TLocale>,
  rootDir: string = process.cwd(),
): Promise<CaseStudySeedResult> {
  const seeded: readonly Locale[] = config.seedLocales
  if (!seeded.includes('en')) throw new Error(`${config.label}: seedLocales must include en`)

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
  // `en` is in the set (checked above); the cast only tells the compiler so.
  const english = config.localizedFields('en' as TLocale, media)

  let id = existing.docs[0]?.id
  const created = !id
  const coverId = config.createFields.coverMediaKey
    ? media[config.createFields.coverMediaKey]
    : undefined
  const companionId = config.coverCompanionMediaKey
    ? media[config.coverCompanionMediaKey]
    : undefined

  if (!id) {
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
        ...(companionId ? { coverCompanion: companionId } : {}),
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
      data: {
        ...caseStudy,
        ...config.sharedFields,
        ...published,
        ...(config.replaceCover && coverId ? { cover: coverId } : {}),
        ...(companionId ? { coverCompanion: companionId } : {}),
        translationReviewed: true,
      },
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
