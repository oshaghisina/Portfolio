import type { RequiredDataFromCollectionSlug } from 'payload'

import type { Project } from '@/payload-types'

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

export const heroRichText = richText(
  heading('Product designer who also runs growth', 'h1'),
  paragraph(
    'From research to campaigns to the dashboards that prove it — ten years across fintech, cloud, automotive, edtech and media.',
  ),
)

export const homeMetaTitle = 'Sina Oshaghi — Product Designer & Manager'
export const homeMetaDescription =
  'Product designer and manager who also runs growth — from research to campaigns to the dashboards that prove it.'

export const heroLinks: NonNullable<PageHero['links']> = [
  {
    link: {
      type: 'custom',
      appearance: 'default',
      label: 'Selected work',
      url: '#selected-work',
    },
  },
  {
    link: {
      type: 'custom',
      appearance: 'outline',
      label: 'Email Sina',
      url: 'mailto:sinaoshaghi@gmail.com',
    },
  },
]

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
export const toolsStackBlock: NonNullable<PageLayout>[number] = {
  blockName: 'Tools / Stack',
  blockType: 'workflowStages',
  sectionHeader: {
    tag: 'Tools / Stack',
    lead: 'The systems behind how I',
    tail: 'think, design & ship.',
    lede: 'Research, design, build, measurement and the infrastructure it runs on \u2014 one connected stack, not six separate toolkits.',
  },
  categories: [
    {
      key: 'designPrototyping',
      title: 'Design & Prototyping',
      tools: [{ toolKey: 'figma' }, { toolKey: 'figjam' }, { toolKey: 'higgsfield' }],
    },
    {
      key: 'aiAgents',
      title: 'AI & Agents',
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
      title: 'Build & Delivery',
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
      title: 'Data & Product Intelligence',
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
      title: 'Growth & Measurement',
      tools: [
        { toolKey: 'googleTagManager' },
        { toolKey: 'googleAds' },
        { toolKey: 'googleSearchConsole' },
      ],
    },
    {
      key: 'infraOperations',
      title: 'Infrastructure & Operations',
      tools: [
        { toolKey: 'supabase' },
        { toolKey: 'vercel' },
        { toolKey: 'coolify' },
        { toolKey: 'gitea' },
        { toolKey: 'sentry' },
      ],
    },
  ],
}

export const buildHomeLayout = ({ project }: { project: string | Project }): PageLayout => [
  {
    blockName: 'Workbench',
    blockType: 'workspace',
    sectionHeader: {
      tag: 'Workspace',
      lead: 'How I',
      tail: 'work',
      lede: 'Own the problem, ship something real, measure what happened, and learn from it.',
    },
    tracks: [
      {
        code: 'S1',
        label: 'Own',
        description: 'Take a vague business problem and turn it into a clear vision and roadmap.',
      },
      {
        code: 'S2',
        label: 'Ship',
        description: 'Design and build the product, campaign or system, end to end.',
      },
      {
        code: 'S3',
        label: 'Measure',
        description: 'Instrument it so the dashboards say what actually happened, not what we hoped.',
      },
      {
        code: 'S4',
        label: 'Learn',
        description: 'Feed the data back into the next iteration.',
      },
    ],
  },
  {
    blockName: 'Tracks',
    blockType: 'tracks',
    sectionHeader: {
      tag: 'Tracks',
      lead: 'Primarily',
      tail: 'focused on',
      lede: 'Ten years across product design, day-to-day AI tooling, and the systems that hold it together.',
    },
    tracks: [
      {
        key: 'productDesign',
        title: 'Product Design',
        experience: '10 yrs',
        description:
          'Product ownership and roadmapping, interaction design, and the research that proves what shipped actually worked.',
      },
      {
        key: 'aiWorkflow',
        title: 'AI Workflow',
        description:
          'Day-to-day work runs through Cursor and Claude, plus the analytics stack — GA4, Amplitude, Search Console — that keeps decisions instrumented.',
      },
      {
        key: 'designSystems',
        title: 'Design Systems',
        description:
          'Built a design system at Biomaze that let developers ship fast — the product became the first mover in its category.',
      },
    ],
  },
  {
    blockName: 'Proof',
    blockType: 'metricsStrip',
    sectionHeader: {
      tag: 'Proof',
      lead: 'Ten years,',
      tail: 'by the numbers.',
    },
    metrics: [
      {
        value: '10 yrs',
        caption: 'Experience across product design and growth',
        source: 'Resume.md',
      },
      {
        value: '9',
        caption: 'Companies and products',
        source: 'Resume.md',
      },
      {
        value: '7',
        caption: 'Industries spanned',
        source: 'Brand-Brief.md',
      },
    ],
  },
  toolsStackBlock,
  {
    blockName: 'Experience',
    blockType: 'experienceCatalogue',
    sectionHeader: {
      tag: 'Experience',
      lead: "Where I've",
      tail: 'worked',
      lede: 'Selected roles across product, design, growth and technical collaboration.',
    },
    items: [
      {
        index: 'A1',
        name: 'Digikala (Digital Gold)',
        role: 'Designer / Marketer / BI developer · 2.5 yr',
        blurb: 'Replaced spreadsheets with BI dashboards and ran the campaigns that grew acquisition and engagement.',
      },
      {
        index: 'A2',
        name: 'Carsparency & Khodro45',
        role: 'Product designer · 2.5 yr',
        blurb: 'Raised sell-through with usability testing and validated prototypes across the full car marketplace.',
      },
      {
        index: 'A3',
        name: 'Hadish Mall',
        role: 'Marketing · 1 yr',
        blurb: 'Grew visitor turnout through campaigns and influencer partnerships, and proposed a mall management app.',
      },
      {
        index: 'A4',
        name: 'Fibona',
        role: 'Product Manager · 2 yr',
        blurb: 'Aligned stakeholders around a new brand identity, tagline and website from the ground up.',
      },
      {
        index: 'A5',
        name: 'OTeacher',
        role: 'Product Manager & designer · 1 yr',
        blurb: 'Turned educator and learner research into a validated teacher–student matchmaking roadmap.',
      },
      {
        index: 'A6',
        name: 'Arvan Cloud',
        role: 'Product designer · 2 yr',
        blurb: 'Redesigned the platform around the server metrics users actually needed, lifting NPS.',
      },
      {
        index: 'A7',
        name: 'Biomaze',
        role: 'Product Manager & designer · 3 yr',
        blurb: 'Built the website, education panel and a design system so developers could ship fast.',
      },
      {
        index: 'A8',
        name: 'Didestan',
        role: 'UI/UX designer · 8 mos',
        blurb: 'Designed a data-driven video platform prototype from lean UX research.',
      },
      {
        index: 'A9',
        name: 'A1Paradise',
        role: 'UI/UX designer · 1.2 yr',
        blurb: 'Designed gamified microgames and a desktop and B2C calling app.',
      },
    ],
  },
  {
    blockName: 'Featured Project',
    blockType: 'selectedWork',
    sectionHeader: {
      tag: 'Work',
      lead: 'Featured',
      tail: 'project',
      lede: 'One project from the range — product, growth and research across nine companies.',
    },
    project,
  },
  {
    blockName: 'Contact',
    blockType: 'cta',
    richText: richText(
      heading("Let's talk", 'h3'),
      paragraph("If you're hiring, building something, or want to compare notes on product and growth — reach out."),
    ),
    links: [
      {
        link: {
          type: 'custom',
          appearance: 'default',
          label: 'Email Sina',
          url: 'mailto:sinaoshaghi@gmail.com',
        },
      },
      {
        link: {
          type: 'custom',
          appearance: 'outline',
          label: 'LinkedIn',
          newTab: true,
          url: 'https://ir.linkedin.com/in/sinaoshaghi',
        },
      },
    ],
  },
]
