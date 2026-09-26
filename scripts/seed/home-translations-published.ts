/**
 * Write homepage locale overlays from the *published* English home layout.
 *
 * Use when `pnpm seed:translations home` fails because the English *draft* is stale
 * (e.g. empty Workspace stages / pre-split catalogue) while published EN is correct.
 * Same overlay + publish behaviour as `seedHomeTranslations`, but the id-preserving base
 * is `draft: false`.
 *
 *   DATABASE_URL=… PAYLOAD_SECRET=… pnpm exec tsx scripts/seed/home-translations-published.ts
 *
 * Prefer `pnpm seed:translations home` once draft and published EN are aligned again.
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import { localizeHomeHero, localizeHomeLayout } from '../../src/endpoints/seed/home-content'
import { homeCopy } from '../../src/endpoints/seed/home-copy'
import config from '../../src/payload.config'
import { DEFAULT_LOCALE, LOCALES } from '../../src/utilities/locale'

const payload = await getPayload({ config })

const { docs } = await payload.find({
  collection: 'pages',
  depth: 0,
  draft: false,
  limit: 1,
  locale: DEFAULT_LOCALE,
  pagination: false,
  where: { slug: { equals: 'home' } },
})

const page = docs[0]
if (!page) throw new Error('No published `home` page — aborting.')
if (!page.layout?.length) throw new Error('Published `home` has empty layout — aborting.')

const exp = page.layout.find((b) => b.blockType === 'experienceCatalogue') as
  | { items?: unknown[] }
  | undefined
const ws = page.layout.find((b) => b.blockType === 'workspace') as
  | { stages?: { key?: string }[] }
  | undefined

const stageKeys = (ws?.stages ?? []).map((s) => s.key).filter(Boolean)
if (stageKeys.length !== 5) {
  throw new Error(`Published workspace stages unexpected: ${JSON.stringify(stageKeys)}`)
}
if ((exp?.items?.length ?? 0) !== 11) {
  throw new Error(`Published experienceCatalogue expected 11 rows, got ${exp?.items?.length}`)
}

const written: string[] = []

for (const locale of LOCALES) {
  const copy = homeCopy[locale]
  await payload.update({
    collection: 'pages',
    id: page.id,
    context: { disableRevalidate: true },
    data: {
      _status: 'published',
      hero: localizeHomeHero(locale, page.hero),
      layout: localizeHomeLayout(locale, page.layout),
      meta: { ...page.meta, description: copy.meta.description, title: copy.meta.title },
      title: copy.title,
      translationReviewed: locale === DEFAULT_LOCALE,
    },
    depth: 0,
    locale,
  })
  written.push(locale)
  payload.logger.info(`— home locale written: ${locale}`)
}

console.log(JSON.stringify({ pageId: page.id, locales: written }, null, 2))
process.exit(0)
