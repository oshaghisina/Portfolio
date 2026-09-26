import type { Payload } from 'payload'

import path from 'path'

import { DEFAULT_LOCALE } from '@/utilities/locale'

import { EVIDENCE_PROJECT_SLUG } from './experience-page-content'
import { upsertMedia } from './media'
import { PROJECT_SEED, RETIRED_PROJECT_SLUGS, toProjectData, type ProjectSeedRow } from './projects'
import { syncCarsparencyNextProjects } from './sync-carsparency-next'
import { syncRetiredRedirects } from './sync-retired-redirects'

/**
 * Bring the `projects` collection in line with `PROJECT_SEED` **without wiping anything**:
 *
 *   pnpm seed:projects
 *
 * The destructive full seed (`POST /next/seed`) is the only other way a project is created, and it
 * clears nine collections to do it. This is the path to use when the Docs grow a project — it
 * creates what is missing, updates what drifted, deletes `RETIRED_PROJECT_SLUGS`, and leaves
 * everything else alone.
 *
 * **English only.** `projects` runs `localizeStatus: true`, so a write at `en` publishes English
 * and nothing else; the other six locales are `pnpm seed:translations projects`' job and writing
 * them here would race it.
 *
 * Runs with no Next server, so every write carries `disableRevalidate` and a hard refresh (or a
 * `pnpm dev` restart) is needed afterwards.
 */

/** Fields this seed owns on an existing document. Everything else is somebody else's. */
const ownedFields = (row: ProjectSeedRow) => ({
  title: row.title,
  summary: row.summary,
  company: row.company,
  role: row.role,
  kind: row.kind,
  order: row.order,
  featured: row.featured ?? false,
  ...(row.liveUrl ? { liveUrl: row.liveUrl } : {}),
  ...(row.period ? { period: { start: row.period.start } } : {}),
})

/** Composition only — what this seed still owns on a project whose copy a case study writes. */
const compositionFields = (row: ProjectSeedRow) => ({
  kind: row.kind,
  order: row.order,
  featured: row.featured ?? false,
})

export interface SyncProjectsResult {
  created: string[]
  updated: string[]
  unchanged: string[]
  deleted: string[]
  /** Slugs left to `seed:case-studies`, which owns their copy. */
  caseStudyOwned: string[]
  /** Covers named in `PROJECT_SEED` whose file is not on disk. */
  missingCovers: string[]
  redirects: { created: string[]; updated: string[]; unchanged: string[] }
  carsparencyNext: { updated: string[]; skipped: string[] }
}

export async function syncProjects({
  payload,
  rootDir = process.cwd(),
}: {
  payload: Payload
  /** Repo root — `Docs/` is resolved from here (dev only; `Docs/` is not deployed). */
  rootDir?: string
}): Promise<SyncProjectsResult> {
  const result: SyncProjectsResult = {
    created: [],
    updated: [],
    unchanged: [],
    deleted: [],
    caseStudyOwned: [],
    missingCovers: [],
    redirects: { created: [], updated: [], unchanged: [] },
    carsparencyNext: { updated: [], skipped: [] },
  }

  // `depth: 0` keeps `cover` an id, so comparing it never trips over a populated relationship.
  const { docs: existing } = await payload.find({
    collection: 'projects',
    depth: 0,
    draft: true,
    limit: 0,
    locale: DEFAULT_LOCALE,
    overrideAccess: true,
    pagination: false,
  })
  const bySlug = new Map(existing.map((doc) => [doc.slug ?? '', doc]))

  const context = { disableRevalidate: true }

  for (const row of PROJECT_SEED) {
    const current = bySlug.get(row.slug)

    // A cover is written once. Replacing one an editor chose in the admin is not this seed's call.
    let coverId: string | null | undefined
    if (row.cover && !current?.cover) {
      coverId = await upsertMedia(
        payload,
        path.resolve(rootDir, path.dirname(row.cover.path)),
        {
          file: path.basename(row.cover.path),
          name: row.cover.name,
          alt: { en: row.cover.alt },
        },
      )
      if (!coverId) result.missingCovers.push(row.slug)
    }

    if (!current) {
      await payload.create({
        collection: 'projects',
        depth: 0,
        locale: DEFAULT_LOCALE,
        context,
        data: { ...toProjectData(row, coverId ?? undefined), translationReviewed: true },
      })
      result.created.push(row.slug)
      continue
    }

    // Keyed off `sections`, not a slug list: a project with a case-study narrative has its copy
    // written per locale by `seed:case-studies`, and `toProjectData` would also reset
    // `caseStudyStatus` to `none` — which passes validation and silently unpublishes `/work/<slug>`.
    const caseStudyOwned = Boolean(current.sections?.length)
    if (caseStudyOwned) result.caseStudyOwned.push(row.slug)

    const data = {
      ...(caseStudyOwned ? compositionFields(row) : { ...ownedFields(row), _status: row.status }),
      ...(coverId ? { cover: coverId } : {}),
      // Autosave rewrites `slug` from `title` on every save unless this is pinned off.
      generateSlug: false,
    }

    if (!changed(current as unknown as Record<string, unknown>, data)) {
      result.unchanged.push(row.slug)
      continue
    }

    await payload.update({ collection: 'projects', id: current.id, depth: 0, locale: DEFAULT_LOCALE, context, data })
    result.updated.push(row.slug)
  }

  // Last: everything that could point at these has been created or repointed by now.
  for (const slug of RETIRED_PROJECT_SLUGS) {
    const doc = bySlug.get(slug)
    if (!doc) continue
    // `payload.delete`, not `db.deleteMany` — it also drops the document's versions and any
    // scheduled-publish job. `disableRevalidate` is mandatory: `revalidateDelete` calls
    // `revalidatePath`, which throws outside a Next request.
    try {
      await payload.delete({ collection: 'projects', id: doc.id, depth: 0, context })
      result.deleted.push(slug)
    } catch (error) {
      // Idempotent against races / already-removed docs (common on a second prod sync).
      if ((error as { status?: number } | null)?.status === 404) continue
      throw error
    }
  }

  // The guard `projects.ts` cannot make at import time without closing a module cycle.
  const live = new Set(PROJECT_SEED.map((row) => row.slug))
  for (const [key, slug] of Object.entries(EVIDENCE_PROJECT_SLUG) as [string, string | undefined][]) {
    if (slug && !live.has(slug)) {
      payload.logger.warn(`— /experience evidence "${key}" points at "${slug}", which no project defines`)
    }
  }

  result.redirects = await syncRetiredRedirects({ payload })
  result.carsparencyNext = await syncCarsparencyNextProjects({ payload })

  return result
}

/** Shallow compare against the stored document — a no-op write still costs a version. */
function changed(current: Record<string, unknown>, data: Record<string, unknown>): boolean {
  return Object.entries(data).some(([key, value]) => {
    if (key === 'generateSlug') return false
    const stored = current[key]
    if (key === 'period') {
      const start = (stored as { start?: string } | null | undefined)?.start ?? null
      const next = (value as { start?: string } | undefined)?.start ?? null
      return start !== next
    }
    if (Array.isArray(value)) {
      return JSON.stringify([...value].sort()) !== JSON.stringify([...((stored as unknown[]) ?? [])].sort())
    }
    return stored !== value
  })
}
