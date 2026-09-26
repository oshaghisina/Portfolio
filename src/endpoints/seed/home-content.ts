import { INDUSTRY_KEYS, industryHeaders } from '@/blocks/IndustryGrid/catalogue'
import type { RequiredDataFromCollectionSlug } from 'payload'

import type { Project } from '@/payload-types'

import type { MosaicSize } from '@/blocks/WorkMosaic/sizes'
import type { CategoryKey } from '@/blocks/WorkflowStages/toolLogos'
import { STAGE_EVIDENCE_SLUGS, STAGE_KEYS, type StageKey } from '@/blocks/Workspace/stages'
import { DEFAULT_LOCALE, dirFor, type Locale } from '@/utilities/locale'

import type { HomeCopy } from './home-copy'
import {
  buildExperienceTeaserBlock,
  localizeExperienceTeaserBlock,
  type TeaserMetric,
} from './experience-page-content'
import { homeCopy } from './home-copy'
import { heading, paragraph, richText } from './lexical-helpers'

type PageLayout = RequiredDataFromCollectionSlug<'pages'>['layout']
type PageHero = RequiredDataFromCollectionSlug<'pages'>['hero']

/**
 * The homepage content shared by the static fallback (`home-static.ts`) and the database seed
 * (`home.ts`). Both need the identical Sina-specific narrative, so it lives here once rather than
 * drifting between two hand-kept copies.
 *
 * V4: rebuilt into a long, sparse editorial composition — Hero → Industries → Tracks →
 * Tools / Stack → Experience → Selected work → Workbench → Contact — with a dominant
 * workbench artifact, one calm focus and real whitespace intervals, instead of a sequence of
 * roughly equal-weight catalogue blocks (see Docs/Benchmarks/Design/pleurat-com.md).
 *
 * V5 replaced the single Featured Project with the project mosaic: the same evidence layer,
 * but showing the breadth of the work rather than one example of it. Workbench sits after
 * Selected work so case studies lead and the operating model follows.
 * Hero H1 revised to describe the work, not the name (Sina Oshaghi moves to a small kicker),
 * sourced from the already-drafted headline option in Docs/About-Me/Brand-Brief.md — no new
 * marketing copy invented.
 *
 * V6 (D-043, after an outside review): the hero says what the work is in plain words instead of a
 * positioning line. Tools / Stack briefly became a Skills list and was then restored to the
 * categorised logo matrix at the owner's request.
 *
 * V7 (owner's reorder): Where I've worked (with the Experience preview that backs its counts)
 * follows Industries, and Selected work follows that preview, so the page reads where I worked →
 * the work → what I focus on, before the tools and the method.
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
 * The homepage mosaic: which projects appear, in what order and at what weight. This is the
 * editorial composition, so it lives beside the layout rather than in `projects.ts` — the project
 * records say what the work is, this says how much of Home each one is worth.
 *
 * Two visual stories open the selection, followed by a wide feature and four compact notes.
 * The archive has a separate full-width footer. CMS order remains the reading order.
 */
export const HOME_MOSAIC: { slug: string; size: MosaicSize }[] = [
  { slug: 'vin-app', size: 'large' },
  { slug: 'rp1-arena', size: 'large' },
  { slug: 'digital-gold', size: 'wide' },
  { slug: 'arvan-cloud-platform-redesign', size: 'medium' },
  { slug: 'khodro45-dealer-app', size: 'small' },
  { slug: 'oteacher-matchmaking-redesign', size: 'small' },
  { slug: 'fibona-website', size: 'small' },
]

/**
 * The homepage layout. `projects` maps every `HOME_MOSAIC` slug to its record — database ids when
 * seeding, full static documents for the no-database fallback — so the block carries no project
 * copy of its own (D-021).
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
      // Interface design first, then the motion and encoding pair, then generative video.
      tools: [
        { toolKey: 'figma' },
        { toolKey: 'sketch' },
        { toolKey: 'afterEffects' },
        { toolKey: 'mediaEncoder' },
        { toolKey: 'higgsfield' },
      ],
    },
    {
      key: 'aiAgents',
      title: copy.tools.categories.aiAgents,
      // Assistants, then the agents, then the plumbing they all run through. At `lg` this lands
      // as two rows of six, and the break falls exactly between the agents and the plumbing.
      tools: [
        { toolKey: 'chatgpt' },
        { toolKey: 'claude' },
        { toolKey: 'gemini' },
        { toolKey: 'grok' },
        { toolKey: 'codex' },
        { toolKey: 'hermes' },
        { toolKey: 'grokBot' },
        { toolKey: 'openclaw' },
        { toolKey: 'openrouter' },
        { toolKey: 'langchain' },
        { toolKey: 'typesafeAi' },
      ],
    },
    {
      key: 'buildDelivery',
      title: copy.tools.categories.buildDelivery,
      // Editors, then the app stack, then the 3D and motion libraries, then shipping. At `lg`
      // nine lands as rows of five and four, and the break falls between Next.js and Three.js.
      tools: [
        { toolKey: 'cursor' },
        { toolKey: 'antigravity' },
        { toolKey: 'vscode' },
        { toolKey: 'payloadCms' },
        { toolKey: 'nextjs' },
        { toolKey: 'threejs' },
        { toolKey: 'motion' },
        { toolKey: 'gsap' },
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
      // Data and hosting, then the three git platforms as one run, then what watches it all.
      tools: [
        { toolKey: 'supabase' },
        { toolKey: 'vercel' },
        { toolKey: 'coolify' },
        { toolKey: 'github' },
        { toolKey: 'gitlab' },
        { toolKey: 'gitea' },
        { toolKey: 'sentry' },
      ],
    },
    {
      key: 'knowledgeResearch',
      title: copy.tools.categories.knowledgeResearch,
      tools: [{ toolKey: 'obsidian' }],
    },
  ],
})

/**
 * Ornament and shared facts, Latin in every locale (DS-10) and therefore deliberately absent
 * from `HomeCopy`: a translator must not be offered "A1" to translate. Stage keys and track keys
 * are code-owned; `METRIC_SOURCES` is a document filename — a localized leaf whose value happens
 * to be identical everywhere, so it is written once here and carried into each locale by the
 * overlay rather than retyped.
 */
const TRACK_KEYS = ['productDesign', 'aiWorkflow', 'designSystems'] as const
const EXPERIENCE_INDEXES = [
  'A1',
  'A2',
  'A3',
  'A4',
  'A5',
  'A6',
  'A7',
  'A8',
  'A9',
  'A10',
  'A11',
] as const
/** Stable `companyKey` per index — resolves marks in `companyLogos.ts`. Not localized. */
export const EXPERIENCE_COMPANY_KEYS = [
  'tahaGasht',
  'digikala',
  'carsparency',
  'khodro45',
  'hadishMall',
  'fibona',
  'oteacher',
  'arvanCloud',
  'biomaze',
  'didestan',
  'a1paradise',
] as const
// Only the first metric is still the résumé's own claim. The company and industry counts are
// counted off Docs/Experience/ frontmatter, so they cite the folder that can be re-counted.
const METRIC_SOURCES = ['Resume.md', 'Experience/', 'Experience/Industries.md'] as const

/**
 * The proof metrics, as the Experience section wants them. They live in `homeCopy` rather than
 * beside `/experience`'s copy because they are Home's own claim — `/experience` argues capability
 * and never restates the counts, so there is nothing here for the two pages to disagree about.
 */
const teaserMetrics = (copy: HomeCopy): TeaserMetric[] =>
  copy.proof.metrics.map((metric, i) => ({ ...metric, source: METRIC_SOURCES[i]! }))

/** The English proof rows, for seeders that write the section outside `buildHomeLayout`. */
export const HOME_TEASER_METRICS: TeaserMetric[] = teaserMetrics(homeCopy[DEFAULT_LOCALE])

/**
 * SELECTED WORK. Exported on its own so the additive `seed:home-mosaic` script and
 * `buildHomeLayout` can never drift apart.
 */
export const buildWorkMosaicBlock = (
  copy: HomeCopy,
  projects: Record<string, string | Project>,
): NonNullable<PageLayout>[number] => ({
  blockName: 'Selected work',
  blockType: 'workMosaic',
  sectionHeader: copy.selectedWork.header,
  // Throwing beats skipping: a missing project would silently reflow every row after it.
  items: HOME_MOSAIC.map(({ size, slug }) => {
    const project = projects[slug]
    if (!project) throw new Error(`home mosaic: no project for slug "${slug}"`)
    return { project, size }
  }),
})

export const buildIndustryGridBlock = (
  locale: Locale,
): Extract<NonNullable<PageLayout>[number], { blockType: 'industryGrid' }> => ({
  blockName: 'Industries',
  blockType: 'industryGrid',
  sectionHeader: industryHeaders[locale],
  industries: INDUSTRY_KEYS.map((key) => ({ key })),
})

/**
 * The homepage's section order, one entry per block. `buildHomeLayout` writes its blocks in this
 * order, and `orderHomeLayout` moves an already-stored layout into it.
 */
export const HOME_BLOCK_ORDER = [
  'industryGrid',
  'experienceCatalogue',
  'experienceTeaser',
  'workMosaic',
  'tracks',
  'workflowStages',
  'workspace',
  'cta',
] as const

/**
 * Moves a stored homepage layout into `HOME_BLOCK_ORDER` without touching any block, so ids,
 * nested row ids and relationships survive. Returns the same array when nothing moves. Throws
 * unless every block type appears exactly once: guessing where an unknown block belongs could
 * quietly reshuffle a page someone edited in the CMS.
 */
export const orderHomeLayout = (layout: NonNullable<PageLayout>): NonNullable<PageLayout> => {
  const types = layout.map((block) => block.blockType)
  const expected: readonly string[] = HOME_BLOCK_ORDER
  if (
    types.length !== expected.length ||
    expected.some((type) => types.filter((t) => t === type).length !== 1)
  ) {
    throw new Error(`home layout: expected one each of ${expected.join(', ')}; got ${types.join(', ')}`)
  }
  if (types.every((type, i) => type === expected[i])) return layout
  return expected.map((type) => layout.find((block) => block.blockType === type)!)
}

export const buildHomeLayout = ({
  locale,
  projects,
}: {
  locale: Locale
  projects: Record<string, string | Project>
}): PageLayout => {
  const copy = homeCopy[locale]
  const dir = dirFor(locale)

  return [
    buildIndustryGridBlock(locale),
    {
      blockName: 'Experience',
      blockType: 'experienceCatalogue',
      sectionHeader: copy.experience.header,
      items: copy.experience.items.map((item, i) => ({
        index: EXPERIENCE_INDEXES[i]!,
        companyKey: EXPERIENCE_COMPANY_KEYS[i]!,
        name: item.name,
        role: item.role,
        blurb: item.blurb,
      })),
    },
    buildExperienceTeaserBlock(locale, teaserMetrics(copy)),
    buildWorkMosaicBlock(copy, projects),
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
    buildToolsStackBlock(copy),
    {
      blockName: 'Workbench',
      blockType: 'workspace',
      sectionHeader: copy.workbench.header,
      principle: copy.workbench.principle,
      loopLabel: copy.workbench.loopLabel,
      stages: STAGE_KEYS.map((key, i) => {
        const stage = copy.workbench.stages[i]!
        const evidenceSlug = STAGE_EVIDENCE_SLUGS[key]
        const evidence = evidenceSlug ? projects[evidenceSlug] : undefined
        return {
          key,
          label: stage.label,
          statement: stage.statement,
          question: stage.question,
          description: stage.description,
          output: stage.output,
          ...(evidence ? { evidence } : {}),
        }
      }),
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
 * `...row` preserves those ids, the mosaic's project relationships and every non-localized leaf;
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
      case 'industryGrid':
        return { ...block, sectionHeader: { ...header, ...industryHeaders[locale] } }
      case 'workspace': {
        // Keyed overlay: stage order is editable in the CMS, and `key` is the stable identity
        // the copy table and the bench visuals are written against.
        const stageByKey = Object.fromEntries(
          STAGE_KEYS.map((key, i) => [key, copy.workbench.stages[i]!]),
        ) as Record<StageKey, (typeof copy.workbench.stages)[number]>
        return {
          ...block,
          sectionHeader: { ...header, ...copy.workbench.header },
          principle: copy.workbench.principle,
          loopLabel: copy.workbench.loopLabel,
          stages: rows('stages').map((row) => {
            const key = row.key as StageKey
            const overlay = stageByKey[key]
            return overlay ? { ...row, ...overlay } : row
          }),
        }
      }
      case 'tracks': {
        // Keyed overlay: row order is editable in the CMS; `key` is the stable identity.
        const itemByKey = Object.fromEntries(
          TRACK_KEYS.map((key, i) => [key, copy.tracks.items[i]!]),
        )
        return {
          ...block,
          sectionHeader: { ...header, ...copy.tracks.header },
          tracks: rows('tracks').map((row) => {
            const overlay = itemByKey[row.key as (typeof TRACK_KEYS)[number]]
            return overlay ? { ...row, ...overlay } : row
          }),
        }
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
      // Capability words live in `experience-page-copy.ts` beside the page they advertise, not in
      // `homeCopy` — the preview and `/experience` must never drift into describing themselves
      // differently — so the overlay for this one block belongs there too. Only the metrics are
      // Home's, and they are passed in.
      case 'experienceTeaser':
        return localizeExperienceTeaserBlock(locale, block, teaserMetrics(copy))
      // `...block` carries `items` through untouched: the project relationship, the size and the
      // media override are structure, shared by every locale, and the tiles' words all come from
      // the project records themselves.
      case 'workMosaic':
        return { ...block, sectionHeader: { ...header, ...copy.selectedWork.header } }
      // Retained for pages still holding the superseded single-project block.
      case 'selectedWork':
        return { ...block, sectionHeader: { ...header, ...copy.selectedWork.header } }
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
