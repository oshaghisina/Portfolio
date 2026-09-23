import type { RequiredDataFromCollectionSlug } from 'payload'

import type { Project } from '@/payload-types'

import type { ProjectKind } from '@/collections/Projects/kinds'

import { HOME_MOSAIC } from './home-content'

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
  /**
   * A real cover, read at seed time (dev only — `Docs/` is not deployed). `path` is repo-relative;
   * `name` is the stored filename and the media collection's idempotency key, so it must be unique
   * across every row — basenames collide (`home-desktop.png`, `detail-desktop.png`, `buttons.png`
   * all recur), and two rows sharing one would silently share a single media document.
   */
  cover?: { path: string; name: string; alt: string }
  liveUrl?: string
}

const DIGIKALA = 'Digikala'
const DIGIKALA_ROLE = 'Designer, Marketer, BI developer'
const OTEACHER = 'OTeacher'
const CARSPARENCY = 'Carsparency & Khodro45'
const CARSPARENCY_ROLE = 'Product designer'
const TAHA_GASHT = 'Taha Gasht'
const INDEPENDENT = 'Independent'
const YARAVAN_ROLE = 'Product designer, PM & builder'

export const PROJECT_SEED: ProjectSeedRow[] = [
  // ── Featured (order 1–6) ──────────────────────────────────────────────────────────────
  // `order` is the archive position and must be unique across every row: `/work` sorts
  // `['order', 'title']` and `title` is localized, so a tie numbers the same project differently
  // in English and Persian. 1–6 are the featured chapters; the rest sit in per-company bands.
  // `vin-app` (1), `khodro45-dealer-app` (4), `faymen` (5) and `nim-dang` (6) are featured from
  // inside their company groups below.
  {
    slug: 'digital-gold',
    title: 'Digital Gold — product vision & growth',
    summary:
      "Defined the product vision, features and growth strategy for Digikala's gold-trading product — from campaigns and segmentation to the BI dashboards that tracked them.",
    company: DIGIKALA,
    role: DIGIKALA_ROLE,
    kind: ['product', 'growth', 'data'],
    order: 3,
    featured: true,
    status: 'published',
    // The order screen's first phone-height, not the 5.2:1 marketing banner: a cover slot crops
    // landscape media to fill it, and a strip that wide lost most of itself in every slot.
    cover: {
      path: 'Docs/Experience/Digikala/digital-gold/assets/order/digital-gold--order-mobile-cover.png',
      name: 'digital-gold--order-mobile-cover.png',
      alt: 'Digikala Digital Gold order screen on mobile: gold and silver tabs, the live price per milligram, buy or sell, and an amount entered in rials or in milligrams',
    },
  },
  {
    slug: 'rp1-arena',
    title: 'RP1 — Multi-Game Play-to-Earn Arena',
    summary:
      'Product design and strategy for a mobile play-to-earn arena that gathers HTML5 games under one competitive and economic layer — competitive-platform research, MVP scoping and a full wireframe spec across 16 sections.',
    company: INDEPENDENT,
    role: 'Product designer & strategist',
    kind: ['product'],
    order: 2, // must match `case-studies/index.ts` — that seed owns composition on re-runs
    featured: true,
    status: 'published',
    period: { start: '2026-02-01T00:00:00.000Z' },
    cover: {
      path: 'Docs/Experience/Projects/rp1-arena/assets/duel/duel-main.png',
      // The exact name `case-studies/rp1-arena.ts` stores it under, so the two seeders reuse one
      // media document instead of each orphaning the other's copy of identical bytes.
      name: 'rp1-arena--duel-main.png',
      alt: 'RP1 arena — the Duel sheet: choosing a friend or a random, skill-matched opponent for a Flappy Bird duel',
    },
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
  // Six real projects, from the six Figma files scanned into `Docs/Experience/Carsparency-Khodro45/`
  // on 2026-09-22. They replace the two Inventory placeholders (`uae-car-marketplace`,
  // `selling-conversion-programme`) whose CAR-01/CAR-02 ids the Docs reassigned to these — see
  // `RETIRED_PROJECT_SLUGS` at the bottom of this file.
  {
    slug: 'khodro45-dealer-app',
    title: 'Khodro45 dealer app — a timed auction market for Iranian car dealers',
    summary:
      'The B2B side of Iran\u2019s Khodro45 marketplace: 241 screens across three parallel market modes, a fair-price-guided bidding system, a six-step escrowed settlement pipeline, two generations of dealer monetisation, and a 28-frame prototype built to test the transaction state machine.',
    company: CARSPARENCY,
    role: CARSPARENCY_ROLE,
    kind: ['product', 'systems'],
    order: 4,
    featured: true,
    status: 'published',
    cover: {
      path: 'Docs/Experience/Carsparency-Khodro45/khodro45-dealer-app/assets/car-list/car-list-live.png',
      name: 'khodro45-dealer-app--car-list-live.png',
      alt: 'Khodro45 dealer app — the live auction list in Persian, each car card carrying its countdown, current bid and fair-price guide',
    },
  },
  {
    slug: 'carsparency-pro',
    title: 'Carsparency Pro — the dealer app rebuilt for an English-speaking market',
    summary:
      'The buy-side app rebuilt in English on a dark green system: live and upcoming auctions, a panel-by-panel damage report inside a 5,779px car detail, win and lose bid states, and a Fair Market Value on every card — the direct descendant of Khodro45\u2019s fair-price anchor.',
    company: CARSPARENCY,
    role: CARSPARENCY_ROLE,
    kind: ['product'],
    order: 20,
    status: 'published',
    cover: {
      path: 'Docs/Experience/Carsparency-Khodro45/carsparency-pro/assets/auction-list.png',
      name: 'carsparency-pro--auction-list.png',
      alt: 'Carsparency Pro — the auction list on the dark green system, each card showing the current bid against its Fair Market Value',
    },
  },
  {
    slug: 'carsparency-back-office',
    title: 'Carsparency Back Office — the operator console behind the marketplace',
    summary:
      'The internal console the marketplace actually runs on: 68 desktop screens across a seven-section sidebar, a four-way price model — target, seller, fair, dealer — that makes the pricing negotiation visible, and threaded internal and dealer comment histories.',
    company: CARSPARENCY,
    role: CARSPARENCY_ROLE,
    kind: ['product', 'data'],
    order: 21,
    status: 'published',
    cover: {
      path: 'Docs/Experience/Carsparency-Khodro45/carsparency-back-office/assets/back-office-list.png',
      name: 'carsparency-back-office--list.png',
      alt: 'Carsparency Back Office — the operator list view: a dense table of cars in negotiation beside the seven-section sidebar',
    },
  },
  {
    slug: 'carsparency-inspection',
    title: 'Carsparency Inspection — turning a physical survey into a structured record',
    summary:
      'The field tool that produces the evidence the whole marketplace trades on: 25 mobile screens and 22 reusable inspection components covering a nine-area vehicle survey, ownership and title questions, and a resumable workflow — the source of the condition data the dealer app prints.',
    company: CARSPARENCY,
    role: CARSPARENCY_ROLE,
    kind: ['product'],
    order: 22,
    status: 'published',
    cover: {
      path: 'Docs/Experience/Carsparency-Khodro45/carsparency-inspection/assets/inspection-sections.png',
      name: 'carsparency-inspection--sections.png',
      alt: 'Carsparency Inspection — the nine-area vehicle survey on mobile, each area showing its completion state',
    },
  },
  {
    slug: 'carsparency-web',
    title: 'Carsparency Web — the seller\u2019s side, built responsively from a benchmark',
    summary:
      'The consumer-facing seller journey designed desktop and mobile in parallel — 42 screens at 1440px and 38 at 375px — openly modelled on Motorway, with a licence-plate-first valuation entry, a four-promise value proposition, a four-step explainer and a multi-section car profile builder.',
    company: CARSPARENCY,
    role: CARSPARENCY_ROLE,
    kind: ['product', 'growth'],
    order: 23,
    status: 'published',
    cover: {
      path: 'Docs/Experience/Carsparency-Khodro45/carsparency-web/assets/home-desktop.png',
      name: 'carsparency-web--home-desktop.png',
      alt: 'Carsparency Web — the seller home page on desktop, opening on the licence-plate valuation entry',
    },
  },
  {
    slug: 'carsparency-design-system',
    title: 'Carsparency design system — twelve ramps, five weights and a borrowed vocabulary',
    summary:
      'The shared foundation under Pro, Back Office, Inspection and Web: 12 colour ramps of 10 steps published as Figma variables, a five-weight type scale, a full button state matrix, eleven component boards and an icon library of 11,326 nodes.',
    company: CARSPARENCY,
    role: CARSPARENCY_ROLE,
    kind: ['systems'],
    order: 24,
    status: 'published',
    cover: {
      path: 'Docs/Experience/Carsparency-Khodro45/carsparency-design-system/assets/color-ramps.png',
      name: 'carsparency-design-system--color-ramps.png',
      alt: 'Carsparency design system — the twelve colour ramps, ten steps each, published as Figma variables',
    },
  },

  // ── Taha Gasht ──────────────────────────────────────────────────────────────────────────
  {
    // Thin by design: `Docs/Experience/Taha-Gasht/` was opened from three Figma files and its
    // dates, team and launch status are still open questions. Nothing here goes beyond the README.
    slug: 'taha-gasht-platform',
    title: 'Taha Gasht — booking site and internal booking panel',
    summary:
      'A travel business selling flights, hotels and tours, designed across three files: the public booking site, the internal booking panel the agents work in, and the design system shared between them.',
    company: TAHA_GASHT,
    role: 'Product designer & strategist',
    kind: ['product'],
    order: 8,
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
    // Inventory Q4: confirmed list-only — no Figma source, so an index row with no case study.
    slug: 'oteacher-website-redesign',
    title: 'Website redesign',
    summary: "Named as a 'new website' initiative in OTeacher's strategy deck; the design source is not yet confirmed.",
    company: OTEACHER,
    role: 'Product designer',
    kind: ['product'],
    order: 53,
    status: 'published',
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
    slug: 'arvan-cloud-platform-redesign',
    title: 'Cloud platform redesign & information architecture',
    summary:
      "Led the UI/UX and information-architecture redesign of Arvan's cloud platform, using behaviour data to decide which server metrics users actually needed to see.",
    company: 'Arvan Cloud',
    role: 'Product designer',
    kind: ['product'],
    order: 59,
    status: 'published',
  },
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

  // ── Independent — freelance projects ────────────────────────────────────────────────────
  {
    slug: 'arash-rezvani',
    title: 'Arash Rezvani — personal brand & blog',
    summary:
      'A Persian-default bilingual site and blog for a writer, teacher and photographer — a written design language, a Shamsi booking system, and a stack kept entirely inside Iran.',
    company: INDEPENDENT,
    role: 'Product designer & developer',
    kind: ['product'],
    order: 100,
    status: 'published',
    period: { start: '2026-08-01T00:00:00.000Z' },
    liveUrl: 'https://arashrezvani.me',
  },
  {
    slug: 'marqevon',
    title: 'Marqevon — corporate site for a petroleum trading principal',
    summary:
      'A seven-locale corporate site for a physical petroleum trading principal, designed around the question a counterparty is silently asking: is this entity real and checkable?',
    company: INDEPENDENT,
    role: 'Product designer & developer',
    kind: ['product'],
    order: 101,
    status: 'published',
    period: { start: '2026-06-01T00:00:00.000Z' },
  },
  {
    slug: 'faymen',
    title: 'Fayman — Persian RTL menswear storefront',
    summary:
      'A live Persian RTL menswear storefront — an international commerce template rebuilt around Iranian payments, phone-only identity and an in-country stack.',
    company: INDEPENDENT,
    role: 'Product designer & developer',
    kind: ['product'],
    order: 5,
    featured: true,
    status: 'published',
    period: { start: '2026-06-01T00:00:00.000Z' },
    liveUrl: 'https://faymen.ir',
    cover: {
      path: 'Docs/Experience/Projects/faymen/assets/home/home.png',
      name: 'faymen--home.png',
      alt: 'Fayman — the Persian RTL storefront home page, opening on the seasonal menswear edit',
    },
  },
  {
    slug: 'renova-plus',
    title: 'Renova+ — managed-renovation platform & portfolio OS',
    summary:
      'Two surfaces for one Dubai product: a full design phase for a managed-renovation platform, and a working prototype of the institutional portfolio layer that sells it.',
    company: INDEPENDENT,
    role: 'Product designer & strategist',
    kind: ['product'],
    order: 103,
    status: 'published',
    period: { start: '2026-02-01T00:00:00.000Z' },
  },
  {
    slug: 'vin-app',
    title: 'VIN — connection-first networking for Dubai',
    summary:
      "A connection-first networking app for Dubai's professional community — a product brief, a 57-problem inventory with its own KPI dictionary, a brand architecture and a B2B venue-revenue layer, audited against the promises the product makes to its own users.",
    company: INDEPENDENT,
    role: 'Product designer & strategist',
    kind: ['product'],
    order: 1,
    featured: true,
    status: 'published',
    period: { start: '2026-02-01T00:00:00.000Z' },
  },
  {
    slug: 'razhmana',
    title: 'Razhmana — freight marketplace process audit',
    summary:
      "A forensic audit of an Iranian freight marketplace's design file, turned into a 42-process architecture and an input-readiness gate.",
    company: INDEPENDENT,
    role: 'Design researcher & process architect',
    kind: ['research'],
    order: 105,
    status: 'published',
    period: { start: '2026-08-01T00:00:00.000Z' },
  },
  {
    slug: 'nim-dang',
    title: 'Nim Dang — a stock exchange for square metres of Tehran',
    summary:
      'An Iranian platform that sells Tehran property by the square metre and then lets owners resell it: 191 screens and a 430-component design system, whose sharpest idea is a low/fair/high gauge that grades both sides of a peer resale.',
    company: INDEPENDENT,
    role: 'Product designer & strategist',
    kind: ['product', 'systems'],
    order: 6,
    featured: true,
    status: 'published',
    period: { start: '2022-06-01T00:00:00.000Z' },
    cover: {
      path: 'Docs/Experience/Projects/nim-dang/assets/property-detail/detail-desktop.png',
      name: 'nim-dang--detail-desktop.png',
      alt: 'Nim Dang — a Tehran property detail page on desktop, priced by the square metre beside its ownership breakdown',
    },
  },
  {
    slug: 'yaravan',
    title: 'Yaravan — an after-sales brand that publishes its own open questions',
    summary:
      'An independent Persian warranty brand built as a full platform on top of an after-sales operation nobody had ever written down — a process architecture, a role and responsibility model, and a product where every unapproved claim ships as a visible open question instead of a confident sentence.',
    company: INDEPENDENT,
    role: YARAVAN_ROLE,
    kind: ['product', 'systems', 'research'],
    order: 104,
    status: 'published',
    period: { start: '2026-07-01T00:00:00.000Z' },
    cover: {
      path: 'Docs/Experience/Projects/yaravan/assets/userpanel/desktop/01-desk.png',
      name: 'yaravan--userpanel-desk.png',
      alt: 'Yaravan — the customer panel desk on desktop in Persian, listing registered products and their warranty state',
    },
  },
  {
    slug: 'greenrest',
    title: 'GreenRest — e-commerce UX audit',
    summary:
      'A scored, bilingual UX audit of a live Iranian mattress storefront, with a prioritised redesign roadmap built on a reusable e-commerce analysis toolkit.',
    company: INDEPENDENT,
    role: 'UX researcher',
    kind: ['research'],
    order: 106,
    status: 'published',
    period: { start: '2026-02-01T00:00:00.000Z' },
    liveUrl: 'https://greenrest.ir',
  },
  {
    // PRJ-11. Designed in full and never run: listed as a concept, not featured, and no case study
    // until the README's open questions close. See Docs/Experience/Projects/narian-summer-passport/.
    slug: 'narian-summer-passport',
    title: 'Narian Summer Passport — retail campaign',
    summary:
      'A summer retail campaign that turned every store into an airport and every purchase into a ticket — tier economics, a nine-stamp collection and a governed bilingual copy canon, built to grow basket size without ever discounting. Never launched.',
    company: INDEPENDENT,
    role: 'Campaign strategist & marketer',
    kind: ['growth', 'concept'],
    order: 107,
    status: 'published',
    period: { start: '2026-06-01T00:00:00.000Z' },
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
  ...(row.liveUrl ? { liveUrl: row.liveUrl } : {}),
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
  liveUrl: row.liveUrl,
  createdAt: STATIC_TIMESTAMP,
  updatedAt: STATIC_TIMESTAMP,
})

/**
 * The homepage mosaic's projects as static documents (for `homeStatic`), keyed by slug. Throws at
 * import time if the editorial composition names a project this seed does not define, so a typo
 * can never reach the page as a missing tile.
 *
 * These carry no `cover` and no `hero` — `toStaticProject` has neither — so the no-database
 * fallback renders every tile on the pending plate. That is honest rather than ideal; the plate
 * is a deliberate drafting state, not a broken image.
 */
export const homeMosaicProjectsStatic: Record<string, Project> = Object.fromEntries(
  HOME_MOSAIC.map(({ slug }) => {
    const row = PROJECT_SEED.find((r) => r.slug === slug)
    if (!row) throw new Error(`projects seed: no row with slug "${slug}"`)
    return [slug, toStaticProject(row)]
  }),
)

/**
 * Slugs that once had a row here and must now be **deleted** from any database that still holds
 * them. `pnpm seed:projects` removes them; the destructive full seed never creates them again.
 *
 * `uae-car-marketplace` and `selling-conversion-programme` were the two Inventory placeholders for
 * Carsparency. The six Figma files scanned on 2026-09-22 reassigned CAR-01/CAR-02 to real projects
 * (`khodro45-dealer-app`, `carsparency-pro`), so the placeholders are superseded, not renamed —
 * nothing on the site should keep pointing at them.
 */
export const RETIRED_PROJECT_SLUGS = [
  'uae-car-marketplace',
  'selling-conversion-programme',
] as const

/**
 * Retiring a slug and repointing everything that named it is one atomic change. This turns half of
 * it into an import-time failure rather than a silently dropped mosaic tile — the same contract as
 * `homeMosaicProjectsStatic` above.
 *
 * `EVIDENCE_PROJECT_SLUG` on `/experience` is checked in `syncProjects` instead: importing
 * `PROJECT_SEED` from `experience-page-content.ts` would close the cycle
 * `projects → home-content → experience-page-content → projects` around a top-level throw.
 */
for (const slug of RETIRED_PROJECT_SLUGS) {
  if (PROJECT_SEED.some((row) => row.slug === slug)) {
    throw new Error(`projects seed: "${slug}" is retired but still in PROJECT_SEED`)
  }
  if (HOME_MOSAIC.some((tile) => tile.slug === slug)) {
    throw new Error(`projects seed: HOME_MOSAIC still points at retired "${slug}"`)
  }
}

/** `order` is the archive sort key and ties break on a localized field — it must be unique. */
{
  const seen = new Set<number>()
  for (const row of PROJECT_SEED) {
    if (seen.has(row.order)) {
      throw new Error(`projects seed: duplicate order ${row.order} ("${row.slug}")`)
    }
    seen.add(row.order)
  }
}
