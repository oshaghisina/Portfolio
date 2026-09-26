import type { Payload } from 'payload'

import type { Page } from '@/payload-types'
import { isCapabilityKey } from '@/blocks/WorkflowStages/capabilities'
import { LOCALES, type Locale } from '@/utilities/locale'
import { homeCopy } from './home-copy'

/** Change only the new contribution sentences and the Skills intro; preserve every row identity. */
export function withSkillNotes(layout: Page['layout'], locale: Locale): Page['layout'] {
  const copy = homeCopy[locale].tools
  return layout.map((block) => {
    if (block.blockType !== 'workflowStages') return block
    return {
      ...block,
      sectionHeader: { ...block.sectionHeader, ...copy.header },
      capabilities: block.capabilities?.map((row) =>
        isCapabilityKey(row.key)
          ? { ...row, contribution: copy.capabilities[row.key].contribution }
          : row,
      ),
    }
  })
}

/** Per-locale, additive and repeatable. No other home blocks, translations or statuses are owned here. */
export async function seedHomeSkillNotes({ payload }: { payload: Payload }) {
  const result: { updated: Locale[]; unchanged: Locale[]; skipped: Locale[] } = {
    updated: [],
    unchanged: [],
    skipped: [],
  }
  for (const locale of LOCALES) {
    const { docs } = await payload.find({
      collection: 'pages',
      depth: 0,
      draft: true,
      fallbackLocale: false,
      locale,
      limit: 1,
      pagination: false,
      where: { slug: { equals: 'home' } },
    })
    const page = docs[0]
    if (!page?.title || !page.layout?.some((block) => block.blockType === 'workflowStages')) {
      result.skipped.push(locale)
      continue
    }
    const layout = withSkillNotes(page.layout, locale)
    if (JSON.stringify(layout) === JSON.stringify(page.layout)) {
      result.unchanged.push(locale)
      continue
    }
    await payload.update({
      collection: 'pages',
      id: page.id,
      locale,
      depth: 0,
      draft: page._status !== 'published',
      context: { disableRevalidate: true },
      data: { layout, _status: page._status },
    })
    result.updated.push(locale)
  }
  return result
}
