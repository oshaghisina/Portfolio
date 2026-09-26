import type { Payload } from 'payload'
import type { IndustryGridBlock, Page } from '@/payload-types'
import { INDUSTRY_KEYS, industryCountLabel } from '@/blocks/IndustryGrid/catalogue'
import { LOCALES, type Locale } from '@/utilities/locale'
import { buildIndustryGridBlock } from './home-content'
import { homeCopy } from './home-copy'

/** Only the new block and the existing industry total change. All other localized leaves,
 * relationship ids, block ids and nested row ids round-trip unchanged. Industries always lead
 * the layout (after the hero); every other block keeps its place. */
export function upsertHomeIndustries(
  layout: Page['layout'],
  locale: Locale,
  identity?: IndustryGridBlock,
): Page['layout'] {
  if (!layout.some((block) => block.blockType === 'workspace')) {
    throw new Error('Home has no workspace block: refusing to mutate a non-home layout.')
  }
  const existing = layout.find((block) => block.blockType === 'industryGrid')
  const base = existing ?? buildIndustryGridBlock(locale)
  const rows = identity?.industries ?? base.industries
  const industry: IndustryGridBlock = {
    ...base,
    ...(identity?.id ? { id: identity.id } : {}),
    industries: INDUSTRY_KEYS.map((key) => rows?.find((row) => row.key === key) ?? { key }),
  }
  const industryCaption = homeCopy[locale].proof.metrics[2]!.caption
  const otherBlocks = layout
    .filter((block) => block.blockType !== 'industryGrid')
    .map((block) => {
      if (block.blockType !== 'experienceTeaser') return block
      return {
        ...block,
        metrics: block.metrics?.map((metric) =>
          metric.caption === industryCaption || metric.source === 'Experience/Industries.md'
            ? { ...metric, value: industryCountLabel(locale), source: 'Experience/Industries.md' }
            : metric,
        ),
      }
    })
  return [industry, ...otherBlocks]
}

/** Snapshot every translation BEFORE writing the shared blocks array. Unlike a full translation
 * seed, this preserves editorial changes in each locale. Rerunning an unchanged page is a no-op.
 * Drafts stay drafts; this migration never publishes an editor's pending work. */
export async function seedHomeIndustries({ payload }: { payload: Payload }) {
  const { docs } = await payload.find({
    collection: 'pages',
    depth: 0,
    draft: true,
    locale: 'en',
    fallbackLocale: false,
    limit: 1,
    pagination: false,
    where: { slug: { equals: 'home' } },
  })
  const page = docs[0]
  if (!page) throw new Error('No home page found. Run the initial seed first.')
  const snapshots = new Map<Locale, Page>([['en', page]])
  for (const locale of LOCALES.filter((locale) => locale !== 'en')) {
    snapshots.set(
      locale,
      await payload.findByID({
        collection: 'pages',
        id: page.id,
        locale,
        fallbackLocale: false,
        depth: 0,
        draft: true,
      }),
    )
  }

  let identity = page.layout.find((block) => block.blockType === 'industryGrid')
  let updatedLocales = 0
  for (const locale of LOCALES) {
    const snapshot = snapshots.get(locale)!
    const layout = upsertHomeIndustries(snapshot.layout, locale, identity)
    if (JSON.stringify(layout) === JSON.stringify(snapshot.layout)) continue
    const saved = await payload.update({
      collection: 'pages',
      id: page.id,
      locale,
      depth: 0,
      draft: snapshot._status === 'draft',
      context: { disableRevalidate: true },
      data: { layout, _status: snapshot._status },
    })
    identity = saved.layout.find((block) => block.blockType === 'industryGrid')
    updatedLocales++
  }
  return {
    pageId: page.id,
    blockId: identity?.id,
    industries: INDUSTRY_KEYS.length,
    updatedLocales,
  }
}
