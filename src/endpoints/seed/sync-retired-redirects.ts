import type { Payload } from 'payload'

import { WORK_PATH } from '@/i18n/routes'

import { RETIRED_PROJECT_SLUGS } from './projects'

/**
 * Permanent redirects for retired `/work/<slug>` URLs → `/work`.
 * Idempotent: creates missing rows, updates drifted destinations, leaves unrelated redirects alone.
 */
export async function syncRetiredRedirects({
  payload,
}: {
  payload: Payload
}): Promise<{ created: string[]; updated: string[]; unchanged: string[] }> {
  const result = { created: [] as string[], updated: [] as string[], unchanged: [] as string[] }
  const context = { disableRevalidate: true }

  const { docs: existing } = await payload.find({
    collection: 'redirects',
    depth: 0,
    limit: 1000,
    overrideAccess: true,
    pagination: false,
  })

  const byFrom = new Map(existing.map((doc) => [doc.from, doc]))

  for (const slug of RETIRED_PROJECT_SLUGS) {
    const from = `/work/${slug}`
    const desired = {
      from,
      to: { type: 'custom' as const, url: WORK_PATH },
    }
    const current = byFrom.get(from)

    if (!current) {
      await payload.create({ collection: 'redirects', data: desired, depth: 0, context })
      result.created.push(from)
      continue
    }

    const url = current.to?.url ?? null
    const type = current.to?.type ?? null
    if (type === 'custom' && url === WORK_PATH) {
      result.unchanged.push(from)
      continue
    }

    await payload.update({
      collection: 'redirects',
      id: current.id,
      data: desired,
      depth: 0,
      context,
    })
    result.updated.push(from)
  }

  return result
}
