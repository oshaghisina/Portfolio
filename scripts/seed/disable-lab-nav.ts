/**
 * Rebuild Header/Footer nav without Lab (Work, About, Experience, [Contact]), then
 * re-apply locale labels via seedNavTranslations.
 *
 *   pnpm exec tsx scripts/seed/disable-lab-nav.ts
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import { seedNavTranslations } from '../../src/endpoints/seed/translations/nav'
import { DEFAULT_LOCALE } from '../../src/utilities/locale'
import config from '../../src/payload.config'

const payload = await getPayload({ config })

async function pageId(slug: string): Promise<string | number> {
  const { docs } = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 1,
    locale: DEFAULT_LOCALE,
    pagination: false,
    where: { slug: { equals: slug } },
  })
  const id = docs[0]?.id
  if (id == null) throw new Error(`Missing published page slug=${slug}`)
  return id
}

const [workId, aboutId, experienceId, contactId] = await Promise.all([
  pageId('work'),
  pageId('about'),
  pageId('experience'),
  pageId('contact'),
])

const ref = (label: string, id: string | number) => ({
  link: {
    type: 'reference' as const,
    label,
    reference: { relationTo: 'pages' as const, value: id },
  },
})

const headerNav = [
  ref('Work', workId),
  ref('About', aboutId),
  ref('Experience', experienceId),
  ref('Contact', contactId),
]

const footerNav = [ref('Work', workId), ref('About', aboutId), ref('Experience', experienceId)]

await payload.updateGlobal({
  slug: 'header',
  locale: DEFAULT_LOCALE,
  depth: 0,
  context: { disableRevalidate: true },
  data: { _status: 'published', navItems: headerNav },
})

await payload.updateGlobal({
  slug: 'footer',
  locale: DEFAULT_LOCALE,
  depth: 0,
  context: { disableRevalidate: true },
  data: { _status: 'published', navItems: footerNav },
})

const { locales } = await seedNavTranslations({ payload })

const header = await payload.findGlobal({ slug: 'header', depth: 0, locale: DEFAULT_LOCALE })
const footer = await payload.findGlobal({ slug: 'footer', depth: 0, locale: DEFAULT_LOCALE })

console.log(
  JSON.stringify(
    {
      ok: true,
      locales,
      header: (header.navItems ?? []).map((r) => ({ label: r.link?.label, type: r.link?.type })),
      footer: (footer.navItems ?? []).map((r) => ({ label: r.link?.label, type: r.link?.type })),
    },
    null,
    2,
  ),
)

process.exit(0)
