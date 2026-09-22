import type { RequiredDataFromCollectionSlug } from 'payload'

import type { Project } from '@/payload-types'

import type { CategoryKey } from '@/blocks/WorkflowStages/toolLogos'
import { DEFAULT_LOCALE, dirFor, type Locale } from '@/utilities/locale'

import type { HomeCopy } from './home-copy'
import { homeCopy } from './home-copy'
import { heading, paragraph, richText } from './lexical-helpers'

type PageLayout = RequiredDataFromCollectionSlug<'pages'>['layout']
type PageHero = RequiredDataFromCollectionSlug<'pages'>['hero']

/**
 * The homepage content shared by the static fallback (`home-static.ts`) and the database seed
 * (`home.ts`). Both need the identical Sina-specific narrative, so it lives here once rather than
 * drifting between two hand-kept copies.
 *
 * V4: rebuilt into a long, sparse editorial composition — Hero → Workbench → Primary Focus →
 * Metrics → Tools / Stack → Experience matrix → Featured Project → Contact — with a dominant
 * workbench artifact, one calm focus, one featured project and real whitespace intervals, instead
 * of a sequence of roughly equal-weight catalogue blocks (see Docs/Benchmarks/Design/pleurat-com.md).
 * Hero H1 revised to describe the work, not the name (Sina Oshaghi moves to a small kicker),
 * sourced from the already-drafted headline option in Docs/About-Me/Brand-Brief.md — no new
 * marketing copy invented.
 */

/** Hrefs are structure, not copy: identical in every locale, so they never enter `HomeCopy`. */
const SELECTED_WORK_HREF = '#selected-work'
const EMAIL_HREF = 'mailto:sinaoshaghi@gmail.com'
const LINKEDIN_HREF = 'https://ir.linkedin.com/in/sinaoshaghi'

export const buildHeroRichText = (locale: Locale) => {
  const copy = homeCopy[locale]
  const dir = dirFor(locale)
  return richText(heading(copy.hero.heading, 'h1', dir), paragraph(copy.hero.lede, dir))
}

export const buildHeroLinks = (copy: HomeCopy): NonNullable<PageHero['links']> => [
  {
    link: {
      type: 'custom',
      appearance: 'default',
      label: copy.hero.primaryLabel,
      url: SELECTED_WORK_HREF,
    },
  },
  {
    link: {
      type: 'custom',
      appearance: 'outline',
      label: copy.hero.secondaryLabel,
      url: EMAIL_HREF,
    },
  },
]

/**
 * English bindings for the two callers that are English by definition: the seed's English create
 * and `home-static.ts`, the no-database fallback `staticFallback` refuses to serve under any
 * other locale. Every other locale goes through `localizeHomeHero` / `localizeHomeLayout`.
 */
export const heroRichText = buildHeroRichText(DEFAULT_LOCALE)
export const heroLinks = buildHeroLinks(homeCopy.en)
export const homeMetaTitle = homeCopy.en.meta.title
export const homeMetaDescription = homeCopy.en.meta.description

/**
 * The homepage layout. `project` is the Featured Project record — a database id when seeding,
 * the full static document for the no-database fallback — so the block carries no project copy
 * of its own (D-021).
 */
/**
 * TOOLS / STACK. Exported on its own so the additive `seed:home-tools` script and
 * `buildHomeLayout` can never drift apart.
 *
 * `tag` is stored Title Case: the `eyebrow` utility uppercases it for Latin locales and leaves it
 * alone for fa/ar, where uppercase does not exist. Storing it pre-uppercased would break Persian.
 * Category titles are the only localized leaves here — tool names are brand names and come from
 * the shared resolver, never from content.
 */
export const buildToolsStackBlock = (copy: HomeCopy): NonNullable<PageLayout>[number] => ({
  blockName: 'Tools / Stack',
  blockType: 'workflowStages',
  sectionHeader: copy.tools.header,
  categories: [
    {
      key: 'designPrototyping',
      title: copy.tools.categories.designPrototyping,
      tools: [{ toolKey: 'figma' }, { toolKey: 'higgsfield' }],
    },
    {
      key: 'aiAgents',
      title: copy.tools.categories.aiAgents,
      // Assistants, then the coding agents, then the plumbing they all run through.
      tools: [
        { toolKey: 'chatgpt' },
        { toolKey: 'claude' },
        { toolKey: 'grok' },
        { toolKey: 'codex' },
        { toolKey: 'githubCopilot' },
        { toolKey: 'openrouter' },
        { toolKey: 'langchain' },
        { toolKey: 'typesafeAi' },
      ],
    },
    {
      key: 'buildDelivery',
      title: copy.tools.categories.buildDelivery,
      tools: [
        { toolKey: 'cursor' },
        { toolKey: 'antigravity' },
        { toolKey: 'vscode' },
        { toolKey: 'payloadCms' },
        { toolKey: 'nextjs' },
        { toolKey: 'docker' },
      ],
    },
    {
      key: 'dataIntelligence',
      title: copy.tools.categories.dataIntelligence,
      tools: [
        { toolKey: 'ga4' },
        { toolKey: 'amplitude' },
        { toolKey: 'heap' },
        { toolKey: 'fullstory' },
        { toolKey: 'clarity' },
        { toolKey: 'hotjar' },
        { toolKey: 'umami' },
      ],
    },
    {
      key: 'growthMeasurement',
      title: copy.tools.categories.growthMeasurement,
      tools: [
        { toolKey: 'googleTagManager' },
        { toolKey: 'googleAds' },
        { toolKey: 'googleSearchConsole' },
      ],
    },
    {
      key: 'infraOperations',
      title: copy.tools.categories.infraOperations,
      tools: [
        { toolKey: 'supabase' },
        { toolKey: 'vercel' },
        { toolKey: 'coolify' },
        { toolKey: 'gitea' },
        { toolKey: 'sentry' },
      ],
    },
  ],
})

/**
 * Ornament and shared facts, Latin in every locale (DS-10) and therefore deliberately absent
 * from `HomeCopy`: a translator must not be offered "A1" or "S3" to translate. `METRIC_SOURCES`
 * is a document filename — a localized leaf whose value happens to be identical everywhere, so
 * it is written once here and carried into each locale by the overlay rather than retyped.
 */
const WORKBENCH_CODES = ['S1', 'S2', 'S3', 'S4'] as const
const TRACK_KEYS = ['productDesign', 'aiWorkflow', 'designSystems'] as const
const EXPERIENCE_INDEXES = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'] as const
const METRIC_SOURCES = ['Resume.md', 'Resume.md', 'Brand-Brief.md'] as const

export const buildHomeLayout = ({
  locale,
  project,
}: {
  locale: Locale
  project: string | Project
}): PageLayout => {
  const copy = homeCopy[locale]
  const dir = dirFor(locale)

  return [
    {
      blockName: 'Workbench',
      blockType: 'workspace',
      sectionHeader: copy.workbench.header,
      tracks: copy.workbench.stages.map((stage, i) => ({
        code: WORKBENCH_CODES[i]!,
        label: stage.label,
        description: stage.description,
      })),
    },
    {
      blockName: 'Tracks',
      blockType: 'tracks',
      sectionHeader: copy.tracks.header,
      tracks: copy.tracks.items.map((item, i) => ({
        key: TRACK_KEYS[i]!,
        title: item.title,
        ...(item.experience ? { experience: item.experience } : {}),
        description: item.description,
      })),
    },
    {
      blockName: 'Proof',
      blockType: 'metricsStrip',
      sectionHeader: copy.proof.header,
      metrics: copy.proof.metrics.map((metric, i) => ({
        value: metric.value,
        caption: metric.caption,
        source: METRIC_SOURCES[i]!,
      })),
    },
    buildToolsStackBlock(copy),
    {
      blockName: 'Experience',
      blockType: 'experienceCatalogue',
      sectionHeader: copy.experience.header,
      items: copy.experience.items.map((item, i) => ({
        index: EXPERIENCE_INDEXES[i]!,
        name: item.name,
        role: item.role,
        blurb: item.blurb,
      })),
    },
    {
      blockName: 'Featured Project',
      blockType: 'selectedWork',
      sectionHeader: copy.featured.header,
      project,
    },
    {
      blockName: 'Contact',
      blockType: 'cta',
      richText: richText(
        heading(copy.contact.heading, 'h3', dir),
        paragraph(copy.contact.body, dir),
      ),
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: copy.contact.primaryLabel,
            url: EMAIL_HREF,
          },
        },
        {
          link: {
            type: 'custom',
            appearance: 'outline',
            label: copy.contact.secondaryLabel,
            newTab: true,
            url: LINKEDIN_HREF,
          },
        },
      ],
    },
  ]
}

/**
 * Overlays one locale's copy onto the English hero and layout Payload just returned — which now
 * carry a generated `id` for every block and every nested array row. Spreading `...block` /
 * `...row` preserves those ids, the `selectedWork` relationship and every non-localized leaf;
 * only known localized leaves are replaced, index-matched against `HomeCopy`'s arrays, which
 * have the same order and counts as `buildHomeLayout` produced.
 *
 * Rebuilding instead of overlaying is the one thing that must never happen here. A row sent
 * without its `id` is treated as a new row, and because the blocks array is shared across
 * locales, the English page would silently grow a duplicate section whose text exists in only
 * one language. That is why these take the fetched document, not a builder's output.
 */
export const localizeHomeHero = (locale: Locale, enHero: PageHero): PageHero => {
  const copy = homeCopy[locale]
  const hero = enHero as unknown as Record<string, unknown>
  const labels = [copy.hero.primaryLabel, copy.hero.secondaryLabel]

  return {
    ...hero,
    richText: buildHeroRichText(locale),
    links: ((hero.links ?? []) as Record<string, unknown>[]).map((row, i) => ({
      ...row,
      link: { ...(row.link as Record<string, unknown>), label: labels[i] ?? '' },
    })),
  } as unknown as PageHero
}

export const localizeHomeLayout = (
  locale: Locale,
  enLayout: NonNullable<PageLayout>,
): PageLayout => {
  const copy = homeCopy[locale]
  const dir = dirFor(locale)

  return (enLayout as unknown as Array<Record<string, unknown>>).map((block) => {
    const header = block.sectionHeader as Record<string, unknown> | undefined
    const rows = (key: string) => (block[key] ?? []) as Record<string, unknown>[]

    switch (block.blockType) {
      case 'workspace':
        return {
          ...block,
          sectionHeader: { ...header, ...copy.workbench.header },
          tracks: rows('tracks').map((row, i) => ({ ...row, ...copy.workbench.stages[i] })),
        }
      case 'tracks':
        return {
          ...block,
          sectionHeader: { ...header, ...copy.tracks.header },
          tracks: rows('tracks').map((row, i) => ({ ...row, ...copy.tracks.items[i] })),
        }
      case 'metricsStrip':
        // `source` is not in `HomeCopy`; `...row` carries the English filename into this locale,
        // which is the point — it is a localized leaf with one value everywhere.
        return {
          ...block,
          sectionHeader: { ...header, ...copy.proof.header },
          metrics: rows('metrics').map((row, i) => ({ ...row, ...copy.proof.metrics[i] })),
        }
      case 'workflowStages':
        // Keyed, not index-matched: category order is editable in the CMS, and `key` is the
        // stable identity the copy table is written against.
        return {
          ...block,
          sectionHeader: { ...header, ...copy.tools.header },
          categories: rows('categories').map((row) => ({
            ...row,
            title: copy.tools.categories[row.key as CategoryKey] ?? row.title,
          })),
        }
      case 'experienceCatalogue':
        return {
          ...block,
          sectionHeader: { ...header, ...copy.experience.header },
          items: rows('items').map((row, i) => ({ ...row, ...copy.experience.items[i] })),
        }
      case 'selectedWork':
        return { ...block, sectionHeader: { ...header, ...copy.featured.header } }
      case 'cta': {
        const labels = [copy.contact.primaryLabel, copy.contact.secondaryLabel]
        return {
          ...block,
          richText: richText(
            heading(copy.contact.heading, 'h3', dir),
            paragraph(copy.contact.body, dir),
          ),
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
