import type { Payload } from 'payload'

import { DEFAULT_LOCALE } from '@/utilities/locale'

import { buildWorkMosaicBlock, HOME_MOSAIC } from './home-content'
import { homeCopy } from './home-copy'
import { seedHomeTranslations } from './translations/home'

/**
 * Replace the homepage's superseded single-project `selectedWork` block with the work mosaic,
 * without touching anything else — additive and idempotent, so it can run against a live
 * database instead of the destructive full seed. Re-running it refreshes the mosaic in place.
 *
 * The block keeps the existing row `id` and every other block is passed through by reference so
 * its id survives too: block row ids must round-trip, or any non-default-locale leaves keyed to
 * them are lost.
 *
 * English only, then a re-run of the per-locale pass. Writing this layout under another locale
 * would write *English* into that locale — `layout` is the whole array, so every leaf in it lands
 * as that locale's value.
 *
 * No `next/cache` import anywhere under this directory — the module also runs outside Next, via
 * `pnpm seed:home-mosaic`, where that import would throw.
 */
export async function seedHomeMosaic({ payload }: { payload: Payload }) {
  const { docs } = await payload.find({
    collection: 'pages',
    // depth 0 keeps the mosaic's `items[].project` as ids; a populated document would be written
    // back as a reshaped relationship.
    depth: 0,
    draft: true,
    limit: 1,
    locale: DEFAULT_LOCALE,
    pagination: false,
    where: { slug: { equals: 'home' } },
  })

  const page = docs[0]
  if (!page) throw new Error('No `home` page in this database — run the full seed first.')

  const found = await payload.find({
    collection: 'projects',
    depth: 0,
    draft: true,
    locale: DEFAULT_LOCALE,
    pagination: false,
    where: { slug: { in: HOME_MOSAIC.map(({ slug }) => slug) } },
  })

  // Every slug must resolve: a mosaic silently short a tile would reflow every row after it.
  const ids = new Map(found.docs.map((project) => [project.slug, project.id]))
  const projects = Object.fromEntries(
    HOME_MOSAIC.map(({ slug }) => {
      const id = ids.get(slug)
      if (!id) throw new Error(`No project with slug "${slug}" in this database.`)
      return [slug, id]
    }),
  )

  const target = (page.layout ?? []).find(
    (block) => block.blockType === 'selectedWork' || block.blockType === 'workMosaic',
  )
  if (!target) throw new Error('The `home` layout has no selected-work block to replace.')

  const mosaic = buildWorkMosaicBlock(homeCopy[DEFAULT_LOCALE], projects)
  const layout = (page.layout ?? []).map((block) =>
    block === target ? { ...mosaic, id: block.id } : block,
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

  payload.logger.info(`— Homepage work mosaic updated (page ${page.id}, ${HOME_MOSAIC.length} tiles)`)

  // Re-apply every locale against the layout this just changed, so the other six languages
  // cannot be left keyed to a block that no longer exists.
  const translations = await seedHomeTranslations({ payload })

  return { blockId: target.id, locales: translations.locales, pageId: page.id, tiles: HOME_MOSAIC.length }
}
