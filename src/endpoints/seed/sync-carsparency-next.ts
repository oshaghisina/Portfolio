import type { Payload } from 'payload'

/**
 * Intentional Next-project chain for the Carsparency case studies, following the car's path
 * through the business: the seller's web journey, the inspector's app, the operators' back office,
 * the dealers' platform, and the design system underneath all four — then back to the start.
 * Only applied when both the source and target have `caseStudyStatus: published` — archive-only
 * rows stay untouched so NextProject keeps using its order-based fallback.
 *
 * Web → Inspection → Back Office → Pro → Design System → Web
 *
 * Khodro45 is a separate employer (commit ca60301). It used to close this loop; `DETACHED` clears
 * any explicit link it still holds into the Carsparency cluster so it falls back to `order`.
 */
export const CARSPARENCY_NEXT_CHAIN: readonly { slug: string; nextSlug: string }[] = [
  { slug: 'carsparency-web', nextSlug: 'carsparency-inspection' },
  { slug: 'carsparency-inspection', nextSlug: 'carsparency-back-office' },
  { slug: 'carsparency-back-office', nextSlug: 'carsparency-pro' },
  { slug: 'carsparency-pro', nextSlug: 'carsparency-design-system' },
  { slug: 'carsparency-design-system', nextSlug: 'carsparency-web' },
] as const

const DETACHED: readonly string[] = ['khodro45-dealer-app']

export async function syncCarsparencyNextProjects({
  payload,
}: {
  payload: Payload
}): Promise<{ updated: string[]; skipped: string[] }> {
  const result = { updated: [] as string[], skipped: [] as string[] }
  const context = { disableRevalidate: true }

  const chainSlugs = Array.from(
    new Set(CARSPARENCY_NEXT_CHAIN.flatMap(({ slug, nextSlug }) => [slug, nextSlug])),
  )
  const slugs = [...chainSlugs, ...DETACHED]

  const { docs } = await payload.find({
    collection: 'projects',
    depth: 0,
    limit: slugs.length,
    overrideAccess: true,
    pagination: false,
    where: { slug: { in: slugs } },
    select: { slug: true, caseStudyStatus: true, nextProject: true },
  })

  const bySlug = new Map(docs.map((doc) => [doc.slug, doc]))
  const nextId = (doc: (typeof docs)[number]) =>
    typeof doc.nextProject === 'string'
      ? doc.nextProject
      : doc.nextProject && typeof doc.nextProject === 'object'
        ? doc.nextProject.id
        : null

  for (const { slug, nextSlug } of CARSPARENCY_NEXT_CHAIN) {
    const source = bySlug.get(slug)
    const target = bySlug.get(nextSlug)

    if (!source || !target) {
      result.skipped.push(slug)
      continue
    }
    if (source.caseStudyStatus !== 'published' || target.caseStudyStatus !== 'published') {
      result.skipped.push(slug)
      continue
    }
    if (nextId(source) === target.id) {
      result.skipped.push(slug)
      continue
    }

    await payload.update({
      collection: 'projects',
      id: source.id,
      depth: 0,
      context,
      data: { nextProject: target.id, generateSlug: false },
    })
    result.updated.push(slug)
  }

  const clusterIds = new Set(chainSlugs.map((slug) => bySlug.get(slug)?.id).filter(Boolean))
  for (const slug of DETACHED) {
    const doc = bySlug.get(slug)
    const current = doc ? nextId(doc) : null
    if (!doc || !current || !clusterIds.has(current)) {
      result.skipped.push(slug)
      continue
    }
    await payload.update({
      collection: 'projects',
      id: doc.id,
      depth: 0,
      context,
      data: { nextProject: null, generateSlug: false },
    })
    result.updated.push(slug)
  }

  return result
}
