import type { Payload } from 'payload'

import { DEFAULT_LOCALE } from '@/utilities/locale'

import { buildToolsStackBlock } from './home-content'
import { homeCopy } from './home-copy'
import { seedHomeTranslations } from './translations/home'

/**
 * Swap the homepage's `workflowStages` block for the current TOOLS / STACK content without
 * touching anything else — additive and idempotent, so it can run against a live database
 * instead of the destructive full seed.
 *
 * The block keeps its existing row `id`, and every other block is passed through by reference so
 * its id survives too: block row ids must round-trip, or any non-default-locale leaves keyed to
 * them are lost.
 *
 * English only, then a re-run of the per-locale pass. Writing the swapped layout under another
 * locale would write *English* into that locale — `layout` is the whole array, so every leaf in
 * it lands as that locale's value. Adding or reordering a category also changes the shared rows
 * every locale is keyed to, so the six other languages have to be rewritten from `homeCopy`
 * afterwards or they would carry titles for categories that no longer exist.
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
    locale: DEFAULT_LOCALE,
    pagination: false,
    where: { slug: { equals: 'home' } },
  })

  const page = docs[0]
  if (!page) throw new Error('No `home` page in this database — run the full seed first.')

  const existing = (page.layout ?? []).find((block) => block.blockType === 'workflowStages')
  if (!existing) throw new Error('The `home` layout has no `workflowStages` block to replace.')

  const toolsBlock = buildToolsStackBlock(homeCopy[DEFAULT_LOCALE])
  const layout = (page.layout ?? []).map((block) =>
    block.blockType === 'workflowStages' ? { ...toolsBlock, id: block.id } : block,
  )

  await payload.update({
    collection: 'pages',
    id: page.id,
    // Explicit: on a drafts-enabled collection, omitting this leaves a draft the public page
    // never reads.
    context: { disableRevalidate: true },
    data: { _status: 'published', layout },
    depth: 0,
    locale: DEFAULT_LOCALE,
  })

  payload.logger.info(`— Homepage TOOLS / STACK block updated (page ${page.id})`)

  // Re-apply every locale against the layout this just changed, so the other six languages
  // cannot be left keyed to category rows that moved.
  const translations = await seedHomeTranslations({ payload })

  return { blockId: existing.id, locales: translations.locales, pageId: page.id }
}
