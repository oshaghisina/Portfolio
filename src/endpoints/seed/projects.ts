import type { RequiredDataFromCollectionSlug } from 'payload'

import type { Project } from '@/payload-types'

import type { ProjectKind } from '@/collections/Projects/kinds'

/**
 * The single static source of project facts (D-021): the database seed, the homepage static
 * fallback and the `/work` static fallback all read this list — nothing about a project is typed
 * twice. One row per `Docs/Experience/Inventory.md` entry; copy comes from the Inventory
 * one-liners, the resume duties and the project files, with the Brand Brief's vocabulary.
 * No dates (none are confirmed), no numbers (none are publishable), no links (none exist).
 */
export interface ProjectSeedRow {
  slug: string
  title: string
  summary: string
  company: string
  role: string
  kind: ProjectKind[]
  order: number
  featured?: boolean
  /** `draft` keeps a row in the CMS without exposing it — used where the Docs still flag the facts. */
  status: 'published' | 'draft'
  period?: { start: string }
  /** Repo-relative path of a real cover, read at seed time (dev only — `Docs/` is not deployed). */
  cover?: { path: string; alt: string }
}

const DIGIKALA = 'Digikala'
const DIGIKALA_ROLE = 'Designer, Marketer, BI developer'
const OTEACHER = 'OTeacher'

export const PROJECT_SEED: ProjectSeedRow[] = [
  // ── Featured (order 1–3) ──────────────────────────────────────────────────────────────────
  {
    slug: 'digital-gold',
    title: 'Digital Gold — product vision & growth',
    summary:
      "Defined the product vision, features and growth strategy for Digikala's gold-trading product — from campaigns and segmentation to the BI dashboards that tracked them.",
    company: DIGIKALA,
    role: DIGIKALA_ROLE,
    kind: ['product', 'growth', 'data'],
    order: 1,
    featured: true,
    status: 'published',
  },
  {
    slug: 'rp1-arena',
    title: 'RP1 — Multi-Game Play-to-Earn Arena',
    summary:
      'Product design and strategy for a mobile play-to-earn arena that gathers HTML5 games under one competitive and economic layer — competitive-platform research, MVP scoping and a full wireframe spec across 16 sections.',
    company: 'Independent',
    role: 'Product designer & strategist',
    kind: ['product'],
    order: 2,
    featured: true,
    status: 'published',
    period: { start: '2026-02-01T00:00:00.000Z' },
    cover: {
      path: 'Docs/Experience/Projects/rp1-arena/assets/duel/duel-main.png',
      alt: 'RP1 arena — the Duel sheet: choosing a friend or a random, skill-matched opponent for a Flappy Bird duel',
    },
  },
  {
    slug: 'arvan-cloud-platform-redesign',
    title: 'Cloud platform redesign & information architecture',
    summary:
      "Led the UI/UX and information-architecture redesign of Arvan's cloud platform, using behaviour data to decide which server metrics users actually needed to see.",
    company: 'Arvan Cloud',
    role: 'Product designer',
    kind: ['product'],
    order: 3,
    featured: true,
    status: 'published',
  },

  // ── Digikala — Digital Gold ─────────────────────────────────────────────────────────────
  {
    slug: 'zero-fee-campaign',
    title: 'Zero-fee campaign',
    summary:
      "A fee-free trading campaign to drive acquisition for Digikala's Digital Gold — concept, creative and execution across product and marketing.",
    company: DIGIKALA,
    role: DIGIKALA_ROLE,
    kind: ['growth'],
    order: 10,
    status: 'published',
  },
  {
    slug: 'installment-campaign',
    title: 'Installment campaign',
    summary:
      'Buy gold in installments — campaign design and execution across the product surface and the marketing channels behind it.',
    company: DIGIKALA,
    role: DIGIKALA_ROLE,
    kind: ['growth'],
    order: 11,
    status: 'published',
  },
  {
    slug: 'gift-card-campaign',
    title: 'Gift-card campaign',
    summary: 'Gold gift cards for Digital Gold — campaign design and execution, from the product surface to the marketing push.',
    company: DIGIKALA,
    role: DIGIKALA_ROLE,
    kind: ['growth'],
    order: 12,
    status: 'published',
  },
  {
    slug: 'user-segmentation-model',
    title: 'User segmentation model',
    summary:
      'Built the segmentation model for Digital Gold users on assets, demographics and behaviour — the basis for campaign targeting and marketing automation.',
    company: DIGIKALA,
    role: DIGIKALA_ROLE,
    kind: ['data', 'research'],
    order: 13,
    status: 'published',
  },
  {
    slug: 'marketing-automation-flows',
    title: 'Marketing automation & event-driven flows',
    summary:
      'Automated engagement flows triggered by user events, built on the segmentation model so messages followed what people actually did.',
    company: DIGIKALA,
    role: DIGIKALA_ROLE,
    kind: ['growth', 'product'],
    order: 14,
    status: 'published',
  },
  {
    slug: 'gold-bi-dashboards',
    title: 'BI dashboards — NMV, CTR, CPC, conversion',
    summary:
      'Replaced the campaign spreadsheets with structured BI dashboards for NMV, CTR, CPC and conversion rate, so product, marketing and PR worked from one set of numbers.',
    company: DIGIKALA,
    role: DIGIKALA_ROLE,
    kind: ['data'],
    order: 15,
    status: 'published',
  },
  {
    slug: 'bnpl-concept',
    title: 'BNPL for gold — concept',
    summary: 'A buy now, pay later concept for gold purchases — a new financial-service idea proposed inside Digital Gold.',
    company: DIGIKALA,
    role: DIGIKALA_ROLE,
    kind: ['concept'],
    order: 16,
    status: 'published',
  },
  {
    slug: 'gold-backed-credit-concept',
    title: 'Gold-backed credit — concept',
    summary: "Credit secured by a user's gold holdings — a second financial-service concept proposed alongside BNPL.",
    company: DIGIKALA,
    role: DIGIKALA_ROLE,
    kind: ['concept'],
    order: 17,
    status: 'published',
  },
  {
    slug: 'pr-brand-awareness',
    title: 'PR & brand-awareness program',
    summary: "Coordinated strategic PR coverage with performance marketing to expand Digital Gold's brand awareness.",
    company: DIGIKALA,
    role: DIGIKALA_ROLE,
    kind: ['growth'],
    order: 18,
    status: 'published',
  },

  // ── Carsparency & Khodro45 ──────────────────────────────────────────────────────────────
  {
    slug: 'uae-car-marketplace',
    title: 'UAE car buy & sell platform',
    summary: 'Designed the whole car buy-and-sell platform for sellers and buyers in the UAE.',
    company: 'Carsparency & Khodro45',
    role: 'Product designer',
    kind: ['product'],
    order: 20,
    status: 'published',
  },
  {
    slug: 'selling-conversion-programme',
    title: 'Selling-conversion programme',
    summary:
      'Gathered data on seller pain points, prototyped fixes and ran usability tests to make the selling flow more efficient and lift conversion.',
    company: 'Carsparency & Khodro45',
    role: 'Product designer',
    kind: ['research', 'product'],
    order: 21,
    status: 'published',
  },

  // ── Hadish Mall ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'mall-traffic-campaigns',
    title: 'Traffic campaigns & influencer program',
    summary:
      'Events, social campaigns and influencer partnerships to raise footfall at Hadish Mall — online and offline awareness for a physical place.',
    company: 'Hadish Mall',
    role: 'Marketer',
    kind: ['growth'],
    order: 30,
    status: 'published',
  },
  {
    slug: 'mall-management-app-concept',
    title: 'Mall-management app — concept',
    summary: 'Proposed and designed a concept for a mall-management app to improve engagement between tenants and customers.',
    company: 'Hadish Mall',
    role: 'Marketer',
    kind: ['concept'],
    order: 31,
    status: 'published',
  },

  // ── Fibona ──────────────────────────────────────────────────────────────────────────────
  {
    slug: 'fibona-brand-positioning',
    title: 'Brand positioning & tagline',
    summary:
      'Stakeholder interviews to read the business, then a positioning and an identity-aligned tagline the team could align around.',
    company: 'Fibona',
    role: 'Product manager',
    kind: ['growth'],
    order: 40,
    status: 'published',
  },
  {
    slug: 'fibona-website',
    title: 'Fibona website',
    summary: "A website built from an analysis of the company's traditional business processes, as part of the same positioning work.",
    company: 'Fibona',
    role: 'Product manager',
    kind: ['product'],
    order: 41,
    status: 'published',
  },

  // ── OTeacher ────────────────────────────────────────────────────────────────────────────
  {
    slug: 'oteacher-matchmaking-redesign',
    title: 'Matchmaking redesign — two-sided research',
    summary:
      'Research with both teachers and students that surfaced match quality as the sharpest pain point, feeding a matchmaking roadmap item — research and direction, not a shipped redesign.',
    company: OTEACHER,
    role: 'Product manager & designer',
    kind: ['research', 'product'],
    order: 50,
    status: 'published',
  },
  {
    slug: 'oteacher-product-roadmap',
    title: 'Product strategy & roadmap',
    summary:
      "Brand-positioning analysis translated into a phased product roadmap for OTeacher, framed against the company's funding and launch history.",
    company: OTEACHER,
    role: 'Product manager & designer',
    kind: ['research'],
    order: 51,
    status: 'published',
  },
  {
    slug: 'oteacher-panel-redesign',
    title: 'Panel redesign — packages, wallet, reports, profile, calendar & messenger',
    summary: "Redesign of OTeacher's user panel across seven areas, iterated a second time on most of them.",
    company: OTEACHER,
    role: 'Product designer',
    kind: ['product'],
    order: 52,
    status: 'published',
  },
  {
    // Inventory ❓Q4: no confirmed design source yet — kept in the CMS, not exposed.
    slug: 'oteacher-website-redesign',
    title: 'Website redesign',
    summary: "Named as a 'new website' initiative in OTeacher's strategy deck; the design source is not yet confirmed.",
    company: OTEACHER,
    role: 'Product designer',
    kind: ['product'],
    order: 53,
    status: 'draft',
  },
  {
    slug: 'oteacher-education-unit-program',
    title: 'Education unit program — teacher vetting, standards & upskilling',
    summary:
      'Stood up a formal education unit at OTeacher: a teacher supervisory team, an interview and standards process for every teacher, and specialised upskilling classes.',
    company: OTEACHER,
    role: 'Product manager & designer',
    kind: ['research'],
    order: 54,
    status: 'published',
  },

  // ── Arvan Cloud ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'arvan-server-metrics-research',
    title: 'Server-metrics dashboard research',
    summary:
      "Behaviour-data research into which server metrics cloud users actually need — the evidence behind the platform's dashboard redesign.",
    company: 'Arvan Cloud',
    role: 'Product designer',
    kind: ['research', 'data'],
    order: 60,
    status: 'published',
  },

  // ── Biomaze ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'biomaze-website-education-panel',
    title: 'Website & education panel',
    summary: "Designed Biomaze's public website and its learning panel.",
    company: 'Biomaze',
    role: 'Product manager & designer',
    kind: ['product'],
    order: 70,
    status: 'published',
  },
  {
    slug: 'biomaze-design-system',
    title: 'Design system',
    summary: "A component system that let Biomaze's developers ship fast — built alongside the website and the education panel.",
    company: 'Biomaze',
    role: 'Product manager & designer',
    kind: ['systems'],
    order: 71,
    status: 'published',
  },

  // ── Didestan ────────────────────────────────────────────────────────────────────────────
  {
    slug: 'didestan-video-platform',
    title: 'Video platform',
    summary: 'A data-driven video platform: mid-fidelity prototypes on Google Material, research run on Lean UX.',
    company: 'Didestan',
    role: 'UI/UX designer',
    kind: ['product', 'research'],
    order: 80,
    status: 'published',
  },

  // ── A1Paradise ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'a1paradise-call-apps',
    title: 'Desktop call app & WiFon B2C app',
    summary: 'A desktop calling app and WiFon, a consumer calling app — early UI/UX work.',
    company: 'A1Paradise',
    role: 'UI/UX designer',
    kind: ['product'],
    order: 90,
    status: 'published',
  },
]

/** Payload create data for one row; `coverId` is the seeded media document when the row has one. */
export const toProjectData = (
  row: ProjectSeedRow,
  coverId?: string,
): RequiredDataFromCollectionSlug<'projects'> => ({
  slug: row.slug, // explicit → `generateSlug` stays off, so a later Persian title never rewrites it
  _status: row.status,
  title: row.title,
  summary: row.summary,
  company: row.company,
  role: row.role,
  kind: row.kind,
  order: row.order,
  featured: row.featured ?? false,
  caseStudyStatus: 'none',
  ...(row.period ? { period: { start: row.period.start } } : {}),
  ...(coverId ? { cover: coverId } : {}),
})

const STATIC_TIMESTAMP = '2026-09-21T00:00:00.000Z'

/** A full `Project` document for the static fallbacks — same facts, placeholder id and timestamps. */
export const toStaticProject = (row: ProjectSeedRow): Project => ({
  id: `static-${row.slug}`,
  slug: row.slug,
  _status: row.status,
  title: row.title,
  summary: row.summary,
  company: row.company,
  role: row.role,
  kind: row.kind,
  order: row.order,
  featured: row.featured ?? false,
  caseStudyStatus: 'none',
  period: row.period ? { start: row.period.start } : undefined,
  createdAt: STATIC_TIMESTAMP,
  updatedAt: STATIC_TIMESTAMP,
})

export const FEATURED_HOME_SLUG = 'digital-gold'

const homeRow = PROJECT_SEED.find((row) => row.slug === FEATURED_HOME_SLUG)
if (!homeRow) throw new Error(`projects seed: no row with slug "${FEATURED_HOME_SLUG}"`)

/** The homepage's featured project as a static document (for `homeStatic`). */
export const featuredHomeProjectStatic: Project = toStaticProject(homeRow)
