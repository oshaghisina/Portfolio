import type { Payload, RequiredDataFromCollectionSlug } from 'payload'

import { DEFAULT_LOCALE, dirFor } from '@/utilities/locale'

import type { AboutCopy, AboutLocale } from '../about-copy'
import { aboutCopy } from '../about-copy'
import { careerStageOrder } from '../about-page-content'
import { heading, paragraph, richText } from '../lexical-helpers'

type PageLayout = RequiredDataFromCollectionSlug<'pages'>['layout']
type PageHero = RequiredDataFromCollectionSlug<'pages'>['hero']

/**
 * The About page in `ar`, `es`, `de`, `fr` and `ja`.
 *
 * English and Persian are left alone on purpose — they are already seeded and correct, and the
 * seed's own `localizeAboutLayoutFa` still owns Persian. This module only fills the five locales
 * that had nothing, which is why it lives beside `about-page.ts` rather than replacing it.
 *
 * Overlay, never rebuild: every write starts from the English document, so each block row, each
 * nested array row, each career stage's `experience` relationship and each `personalSide` item's
 * `media` keep the ids and values Payload generated.
 *
 * Only the `relatedProjectLabel` on the Digikala stage is set; `careerStageOrder` is
 * `[9, 6, 2, 1, 10]`, so that is index 3. The other four stages carry `null`, matching the
 * English document, rather than an empty string that would read as a broken label.
 */
const DIGIKALA_STAGE_INDEX = careerStageOrder.indexOf(1)

const localizeAboutHero = (locale: AboutLocale, enHero: PageHero): PageHero => {
  const copy = aboutCopy[locale]
  const dir = dirFor(locale)
  const hero = enHero as unknown as Record<string, unknown>

  return {
    ...hero,
    richText: richText(heading(copy.hero.heading, 'h1', dir), paragraph(copy.hero.lede, dir)),
  } as unknown as PageHero
}

const localizeAboutLayout = (locale: AboutLocale, enLayout: NonNullable<PageLayout>): PageLayout => {
  const copy: AboutCopy = aboutCopy[locale]
  const dir = dirFor(locale)

  return (enLayout as unknown as Array<Record<string, unknown>>).map((block) => {
    const header = block.sectionHeader as Record<string, unknown> | undefined
    const rows = (key: string) => (block[key] ?? []) as Record<string, unknown>[]

    switch (block.blockType) {
      case 'content':
        return {
          ...block,
          columns: rows('columns').map((column, i) => ({
            ...column,
            richText:
              i === 0
                ? richText(heading(copy.biography.heading, 'h2', dir))
                : richText(...copy.biography.body.map((line) => paragraph(line, dir))),
          })),
        }
      case 'careerJourney':
        return {
          ...block,
          sectionHeader: { ...header, ...copy.journey.header },
          stages: rows('stages').map((stage, i) => ({
            ...stage,
            narrative: richText(paragraph(copy.journey.narratives[i]!, dir)),
            relatedProjectLabel: i === DIGIKALA_STAGE_INDEX ? copy.journey.relatedProjectLabel : null,
          })),
        }
      case 'thinkingMap':
        return {
          ...block,
          sectionHeader: { ...header, ...copy.thinking.header },
          nodes: rows('nodes').map((node, i) => ({ ...node, ...copy.thinking.nodes[i] })),
        }
      case 'principles':
        return {
          ...block,
          sectionHeader: { ...header, ...copy.principles.header },
          items: rows('items').map((item, i) => ({ ...item, ...copy.principles.items[i] })),
        }
      case 'teamProcess':
        return {
          ...block,
          sectionHeader: { ...header, ...copy.teamProcess.header },
          nodes: rows('nodes').map((node, i) => ({ ...node, ...copy.teamProcess.nodes[i] })),
          statements: rows('statements').map((s, i) => ({ ...s, ...copy.teamProcess.statements[i] })),
        }
      case 'personalSide':
        return {
          ...block,
          sectionHeader: { ...header, ...copy.personal.header },
          items: rows('items').map((item, i) => ({ ...item, ...copy.personal.items[i] })),
        }
      case 'nowSection':
        return {
          ...block,
          sectionHeader: { ...header, ...copy.now.header },
          statement: richText(paragraph(copy.now.statement, dir)),
        }
      case 'cta': {
        const labels = [copy.contact.primaryLabel, copy.contact.secondaryLabel]
        return {
          ...block,
          richText: richText(heading(copy.contact.heading, 'h3', dir), paragraph(copy.contact.body, dir)),
          links: rows('links').map((row, i) => ({
            ...row,
            link: { ...(row.link as Record<string, unknown>), label: labels[i] ?? '' },
          })),
        }
      }
      default:
        return block
    }
  }) as unknown as PageLayout
}

export async function seedAboutTranslations({ payload }: { payload: Payload }) {
  const { docs } = await payload.find({
    collection: 'pages',
    depth: 0,
    draft: true,
    limit: 1,
    locale: DEFAULT_LOCALE,
    pagination: false,
    where: { slug: { equals: 'about' } },
  })

  const page = docs[0]
  if (!page) throw new Error('No `about` page in this database — run the full seed first.')
  if (!page.layout?.length) throw new Error('The `about` page has an empty layout — run the full seed first.')

  const locales = Object.keys(aboutCopy) as AboutLocale[]

  for (const locale of locales) {
    const copy = aboutCopy[locale]

    await payload.update({
      collection: 'pages',
      id: page.id,
      context: { disableRevalidate: true },
      data: {
        _status: 'published',
        hero: localizeAboutHero(locale, page.hero),
        layout: localizeAboutLayout(locale, page.layout),
        meta: { ...page.meta, description: copy.meta.description, title: copy.meta.title },
        title: copy.title,
        translationReviewed: false,
      },
      depth: 0,
      locale,
    })
  }

  payload.logger.info(`— About page written in ${locales.join(', ')} (page ${page.id})`)

  return { locales, pageId: page.id }
}
