import type { RequiredDataFromCollectionSlug } from 'payload'

import { heading, paragraph, richText } from './lexical-helpers'

type PageLayout = RequiredDataFromCollectionSlug<'pages'>['layout']
type PageHero = RequiredDataFromCollectionSlug<'pages'>['hero']

/**
 * The homepage content shared by the static fallback (`home-static.ts`) and the database seed
 * (`home.ts`). Both need the identical Sina-specific narrative — Hero → Selected Work → How I
 * Work → Capabilities → Proof/Metrics → Tools/AI workflow → Experience → Contact — so it lives
 * here once rather than drifting between two hand-kept copies.
 *
 * V2: recomposed into art-directed, purpose-built sections (dedicated hero, feature-rail
 * Selected Work, connected-rail Workspace/WorkflowStages, indexed Capabilities catalogue,
 * typographic Experience catalogue, plain editorial Contact close) instead of stacked generic
 * `content` blocks. No new facts — same source material as V1, regrouped to fit the new
 * section vocabulary.
 */

export const heroRichText = richText(
  heading('Sina Oshaghi', 'h1'),
  paragraph(
    'Product designer and manager who also runs growth — from research to campaigns to the dashboards that prove it.',
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
    blockName: 'Selected Work',
    blockType: 'selectedWork',
    sectionHeader: {
      tag: 'Work',
      lead: 'Selected',
      tail: 'work',
      lede: 'A sample of the range — product, growth and research work across nine companies.',
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
      {
        title: 'Cloud platform redesign & IA',
        category: 'Product Design',
        role: 'Product Designer',
        featured: true,
        summary:
          "Redesigned Arvan Cloud's UI/UX and information architecture around the server metrics users actually needed.",
      },
      {
        title: 'UAE car buy & sell platform',
        category: 'Product Design',
        role: 'Product Designer',
        summary:
          'Designed a complete car buy-and-sell marketplace for UAE sellers and buyers, refined through usability testing.',
      },
      {
        title: 'Teacher–student matchmaking redesign',
        category: 'Product & Research',
        role: 'PM & Designer',
        summary:
          "Redesigned OTeacher's matchmaking from research with both educators and learners into a validated roadmap.",
      },
      {
        title: 'Design system for fast development',
        category: 'Design System',
        role: 'PM & Designer',
        summary:
          'Built a component design system at Biomaze so developers could ship the website and education panel quickly.',
      },
    ],
  },
  {
    blockName: 'How I Work',
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
    blockName: 'Capabilities',
    blockType: 'capabilities',
    sectionHeader: {
      tag: 'Capabilities',
      lead: 'What I',
      tail: 'bring',
    },
    groups: [
      {
        index: '01',
        title: 'Product strategy & roadmapping',
        description:
          'Product ownership, vision-setting and roadmapping — from a fintech product line to a brand strategy engagement.',
      },
      {
        index: '02',
        title: 'Design systems & UX',
        description: 'Interaction design, rapid prototyping and design-system management that lets teams ship fast.',
      },
      {
        index: '03',
        title: 'Research & testing',
        description: 'User research, usability testing and A/B/n testing to validate before building.',
      },
      {
        index: '04',
        title: 'Growth & data',
        description: 'Marketing automation, behavioural segmentation and the BI dashboards that track what happened.',
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
    blockName: 'Tools & AI workflow',
    blockType: 'workflowStages',
    sectionHeader: {
      tag: 'Workflow',
      lead: 'Tools &',
      tail: 'AI workflow',
    },
    stages: [
      {
        code: 'R1',
        label: 'Research',
        tools: 'GA4, Amplitude, Heap, FullStory, Clarity, Hotjar',
      },
      {
        code: 'M1',
        label: 'Model & prototype',
        tools: 'Figma, FigJam, Higgsfield',
      },
      {
        code: 'B1',
        label: 'Build',
        tools: 'Cursor, Copilot, VS Code, Claude, OpenAI tools',
      },
      {
        code: 'I1',
        label: 'Instrument & learn',
        tools: 'Tag Manager, Google Ads, Search Console, Sentry, Google Optimize',
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
      { index: 'A1', name: 'Digikala (Digital Gold)', role: 'Designer / Marketer / BI developer · 2.5 yr' },
      { index: 'A2', name: 'Carsparency & Khodro45', role: 'Product designer · 2.5 yr' },
      { index: 'A3', name: 'Hadish Mall', role: 'Marketing · 1 yr' },
      { index: 'A4', name: 'Fibona', role: 'Product Manager · 2 yr' },
      { index: 'A5', name: 'OTeacher', role: 'Product Manager & designer · 1 yr' },
      { index: 'A6', name: 'Arvan Cloud', role: 'Product designer · 2 yr' },
      { index: 'A7', name: 'Biomaze', role: 'Product Manager & designer · 3 yr' },
      { index: 'A8', name: 'Didestan', role: 'UI/UX designer · 8 mos' },
      { index: 'A9', name: 'A1Paradise', role: 'UI/UX designer · 1.2 yr' },
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
