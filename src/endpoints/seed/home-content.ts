import type { RequiredDataFromCollectionSlug } from 'payload'

import { heading, paragraph, richText } from './lexical-helpers'

type PageLayout = RequiredDataFromCollectionSlug<'pages'>['layout']
type PageHero = RequiredDataFromCollectionSlug<'pages'>['hero']

/**
 * The homepage content shared by the static fallback (`home-static.ts`) and the database seed
 * (`home.ts`). Both need the identical Sina-specific narrative, so it lives here once rather than
 * drifting between two hand-kept copies.
 *
 * V4: rebuilt into a long, sparse editorial composition — Hero → Workbench → Primary Focus →
 * Metrics → AI tooling → Experience matrix → Featured Project → Contact — with a dominant
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

export const homeLayout: PageLayout = [
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
    blockName: 'Primary Focus',
    blockType: 'capabilities',
    sectionHeader: {
      tag: 'Focus',
      lead: 'What I',
      tail: 'bring',
    },
    groups: [
      {
        index: '01',
        title: 'Product, design and growth — in one person',
        description:
          'Product ownership and roadmapping, interaction design and design systems, research and testing, and the growth and BI work that proves it — carried by one person from insight to measurable outcome, instead of handed off between three roles.',
      },
    ],
  },
  {
    blockName: 'Proof',
    blockType: 'metricsStrip',
    sectionHeader: {
      tag: 'Proof',
      lead: 'By the',
      tail: 'numbers',
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
  {
    blockName: 'AI & Daily Tooling',
    blockType: 'workflowStages',
    sectionHeader: {
      tag: 'Tooling',
      lead: 'Tools &',
      tail: 'AI workflow',
    },
    stages: [
      {
        code: 'R1',
        label: 'Research',
        tools: 'GA4, Amplitude',
      },
      {
        code: 'M1',
        label: 'Model & prototype',
        tools: 'Figma, FigJam',
      },
      {
        code: 'B1',
        label: 'Build',
        tools: 'Cursor, Claude',
      },
      {
        code: 'I1',
        label: 'Instrument & learn',
        tools: 'Google Ads',
      },
    ],
  },
  {
    blockName: 'Experience',
    blockType: 'experienceCatalogue',
    sectionHeader: {
      tag: 'Experience',
      lead: '10 years,',
      tail: 'nine roles',
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
    items: [
      {
        title: 'Digital Gold — product vision & growth',
        category: 'Product · Growth',
        role: 'Designer, Marketer, BI developer',
        featured: true,
        summary:
          "Defined the product vision, features and growth strategy for Digikala's gold-trading product — from campaigns and segmentation to the BI dashboards that tracked them.",
      },
    ],
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
