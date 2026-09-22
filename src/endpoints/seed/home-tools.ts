import type { Payload } from 'payload'

import { toolsStackBlock } from './home-content'

/**
 * Swap the homepage's `workflowStages` block for the current TOOLS / STACK content without
 * touching anything else — additive and idempotent, so it can run against a live database
 * instead of the destructive full seed.
 *
 * The block keeps its existing row `id`, and every other block is passed through by reference so
 * its id survives too: block row ids must round-trip, or any non-default-locale leaves keyed to
 * them are lost.
 *
 * No `next/cache` import anywhere under this directory — the module also runs outside Next, via
 * `pnpm seed:home-tools`, where that import would throw.
 */
export async function seedHomeTools({ payload }: { payload: Payload }) {
  const { docs } = await payload.find({
    collection: 'pages',
    // depth 0 keeps the selectedWork block's `project` as an id; a populated document would be
    // written back as a reshaped relationship.
    depth: 0,
    draft: true,
    limit: 1,
    locale: 'en',
    pagination: false,
    where: { slug: { equals: 'home' } },
  })

  const page = docs[0]
  if (!page) throw new Error('No `home` page in this database — run the full seed first.')

  const existing = (page.layout ?? []).find((block) => block.blockType === 'workflowStages')
  if (!existing) throw new Error('The `home` layout has no `workflowStages` block to replace.')

  const layout = (page.layout ?? []).map((block) =>
    block.blockType === 'workflowStages' ? { ...toolsStackBlock, id: block.id } : block,
  )

  await payload.update({
    collection: 'pages',
    id: page.id,
    // Explicit: on a drafts-enabled collection, omitting this leaves a draft the public page
    // never reads.
    context: { disableRevalidate: true },
    data: { _status: 'published', layout },
    depth: 0,
    locale: 'en',
  })

  payload.logger.info(`— Homepage TOOLS / STACK block updated (page ${page.id})`)

  return { blockId: existing.id, pageId: page.id }
}
