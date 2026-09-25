import type { Payload } from 'payload'

/**
 * Intentional Next-project chain for the Carsparency / Khodro45 case-study cluster.
 * Only applied when both the source and target have `caseStudyStatus: published` — archive-only
 * rows stay untouched so NextProject keeps using its order-based fallback.
 *
 * Pro → Back Office → Inspection → Web → Design System → Khodro45 dealer app → Pro
 */
export const CARSPARENCY_NEXT_CHAIN: readonly { slug: string; nextSlug: string }[] = [
  { slug: 'carsparency-pro', nextSlug: 'carsparency-back-office' },
  { slug: 'carsparency-back-office', nextSlug: 'carsparency-inspection' },
  { slug: 'carsparency-inspection', nextSlug: 'carsparency-web' },
  { slug: 'carsparency-web', nextSlug: 'carsparency-design-system' },
  { slug: 'carsparency-design-system', nextSlug: 'khodro45-dealer-app' },
  { slug: 'khodro45-dealer-app', nextSlug: 'carsparency-pro' },
] as const

export async function syncCarsparencyNextProjects({
  payload,
}: {
  payload: Payload
}): Promise<{ updated: string[]; skipped: string[] }> {
  const result = { updated: [] as string[], skipped: [] as string[] }
  const context = { disableRevalidate: true }

  const slugs = Array.from(
    new Set(CARSPARENCY_NEXT_CHAIN.flatMap(({ slug, nextSlug }) => [slug, nextSlug])),
  )

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

    const currentNextId = typeof source.nextProject === 'string' ? source.nextProject : null

    if (currentNextId === target.id) {
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

  return result
}
