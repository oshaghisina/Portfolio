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
const CARSPARENCY = 'Carsparency'
const KHODRO45 = 'Khodro45'
const CARSPARENCY_ROLE = 'Product designer'
const TAHA_GASHT = 'Taha Gasht'
const INDEPENDENT = 'Independent'
const YARAVAN_ROLE = 'Product designer, PM & builder'
const YARAVAN_SERVICE_ROLE = 'Service designer & process architect'

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
  // ── Digikala — Digital Gold siblings (chapters DGK-02…07 are retired into `digital-gold`) ──
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

  // ── Khodro45 / Carsparency ─────────────────────────────────────────────────────────────
  // Six real projects from `Docs/Experience/Carsparency-Khodro45/` (folder name kept for asset
  // paths). Company strings are separate: Khodro45 owns the dealer app; Carsparency owns the
  // five English surfaces. They replace Inventory placeholders — see `RETIRED_PROJECT_SLUGS`.
  {
    slug: 'khodro45-dealer-app',
    title: 'Khodro45 dealer app — a timed auction market for Iranian car dealers',
    summary:
      'The B2B side of Iran\u2019s Khodro45 marketplace: 241 screens across three market modes, an inspection report inside every car page, a six-stage settlement, a listing flow with self-inspection, two dealer memberships and a 24-screen prototype for transaction states.',
    company: KHODRO45,
    role: CARSPARENCY_ROLE,
    kind: ['product', 'systems'],
    order: 4,
    featured: true,
    status: 'published',
    cover: {
      path: 'Docs/Experience/Carsparency-Khodro45/khodro45-dealer-app/assets/car-list/car-list-live.png',
      name: 'khodro45-dealer-app--car-list-live.png',
      alt: 'Khodro45 dealer app, live auction list: each car card shows a countdown, the dealer\u2019s bid status and the fair market price',
    },
  },
  {
    slug: 'carsparency-pro',
    title: 'Carsparency Pro — the dealer platform, from bid to title transfer',
    summary:
      'The buy side of a UAE car marketplace, designed as an app and a desktop site: timed auctions with Fair Market Value under every bid, then a five-stage order path through negotiation, payment, delivery and title transfer.',
    company: CARSPARENCY,
    role: CARSPARENCY_ROLE,
    kind: ['product'],
    order: 20,
    status: 'published',
    cover: {
      path: 'Docs/Experience/Carsparency-Khodro45/carsparency-pro/assets/app/auction-list-cover.png',
      name: 'carsparency-pro--auction-list.png',
      alt: 'Carsparency Pro app — the live auction list filtered by make and year, each card showing a countdown, the current bid and its Fair Market Value',
    },
  },
  {
    slug: 'carsparency-back-office',
    title: 'Carsparency Back Office — the operator console behind the marketplace',
    summary:
      'The staff console behind the marketplace: 68 desktop screens across a seven-section sidebar, a request quick view with comment and price history, four prices side by side (target, seller, fair and dealer) and the printable inspection report.',
    company: CARSPARENCY,
    role: CARSPARENCY_ROLE,
    kind: ['product', 'data'],
    order: 21,
    status: 'published',
    cover: {
      path: 'Docs/Experience/Carsparency-Khodro45/carsparency-back-office/assets/back-office-list.png',
      name: 'carsparency-back-office--list.png',
      alt: 'Carsparency Back Office — the requests table beside a seven-section sidebar, with filter, search, group operation and create-request controls',
    },
  },
  {
    slug: 'carsparency-inspection',
    title: 'Carsparency Inspection — turning a physical survey into a structured record',
    summary:
      'The field tool that produces the evidence the marketplace trades on: a queue of cars, a car-details wizard, ten survey areas with pass or fail for each part, and defects recorded with their own photos — the source of the condition data dealers read.',
    company: CARSPARENCY,
    role: CARSPARENCY_ROLE,
    kind: ['product'],
    order: 22,
    status: 'published',
    cover: {
      path: 'Docs/Experience/Carsparency-Khodro45/carsparency-inspection/assets/2x/car-picture-cover.png',
      name: 'carsparency-inspection--sections.png',
      alt: 'Carsparency Inspection — the car pictures page, a grid of photo slots each named for a wheel or corner of the car',
    },
  },
  {
    slug: 'carsparency-web',
    title: 'Carsparency Web — a seller journey that prices the car first',
    summary:
      'The private seller’s side, on mobile and desktop: a three-step wizard that shows an estimated price before the detailed questions, turns blockers such as an outstanding loan into choices, and guides a self-inspection in sixteen photos.',
    company: CARSPARENCY,
    role: CARSPARENCY_ROLE,
    kind: ['product', 'growth'],
    order: 23,
    status: 'published',
    cover: {
      path: 'Docs/Experience/Carsparency-Khodro45/carsparency-web/assets/site/home-fold.png',
      name: 'carsparency-web--home-desktop.png',
      alt: 'Carsparency Web — the seller home page on desktop, with a valuation box offering licence plate, VIN or make and model',
    },
  },
  {
    slug: 'carsparency-design-system',
    title: 'Carsparency design system — one library under four products',
    summary:
      'The shared library under Pro, Back Office, Inspection and Web: twelve colour ramps, a five-weight type board and 15 component sets holding 265 variants, consumed by all four product files in a light and a dark theme.',
    company: CARSPARENCY,
    role: CARSPARENCY_ROLE,
    kind: ['systems'],
    order: 24,
    status: 'published',
    cover: {
      path: 'Docs/Experience/Carsparency-Khodro45/carsparency-design-system/assets/site/color-ramps.png',
      name: 'carsparency-design-system--color-ramps.png',
      alt: 'Carsparency design system — the colour board: primary green, gray and further ramps from 900 to 50, with 500 marked as the main step',
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
    // The first pitch deck's cover, with Sina's email repainted out of the laptop's tenant table.
    cover: {
      path: 'Docs/Experience/Hadish-Mall/mall-app/assets/crops/cover-hadish.png',
      name: 'mall-management-app-concept--cover.png',
      alt: 'The cover of the Hadish Mall pitch: the mall’s logo and the title “Hadish Mall commercial complex management” beside a laptop showing the tenant list',
    },
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
    summary:
      "Maz's public site and RTL learning panel — classes, exams, live class, wallet and package commerce — designed across a 32-page Figma file with the design system built in parallel.",
    company: 'Biomaze',
    role: 'Product manager & designer',
    kind: ['product', 'systems'],
    order: 70,
    status: 'published',
    cover: {
      path: 'Docs/Experience/Biomaze/website-education-panel/assets/biomaze--panel-classes-desktop.png',
      name: 'biomaze--panel-classes-desktop.png',
      alt: 'Biomaze education panel — the classes list on desktop in Persian, with teacher cards, schedule chips and the panel chrome',
    },
  },
  {
    slug: 'biomaze-design-system',
    title: 'Design system',
    summary:
      'Colour, type, buttons, forms and chrome boards in the BioMaze Design file — the shared kit built alongside the website and education panel so developers could ship faster.',
    company: 'Biomaze',
    role: 'Product manager & designer',
    kind: ['systems'],
    order: 71,
    status: 'published',
    cover: {
      path: 'Docs/Experience/Biomaze/design-system/assets/biomaze--ds-color.png',
      name: 'biomaze--ds-color.png',
      alt: 'Biomaze design system — the colour board from the shared UI kit',
    },
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
    // Type only: the site's photographs are of Arash himself, and none is used here.
    cover: {
      path: 'Docs/Experience/Projects/arash-rezvani/assets/capture-2026-09/mobile/experience-fa.png',
      name: 'arash-rezvani--cover.png',
      alt: 'Arash Rezvani on a phone — the Persian experience page opening on its headline, “More than a title”, inside ruled walls',
    },
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
    // Type-led: below its hero the home page carries third-party market prices.
    cover: {
      path: 'Docs/Experience/Projects/marqevon/assets/crops/cover.png',
      name: 'marqevon--cover.png',
      alt: 'Marqevon — the procedure page, “How a transaction runs, by delivery mode”, set on a dark petroleum ground',
    },
  },
  {
    slug: 'cproperty',
    title: 'CProperty — presale homes for Metro Vancouver, made comparable',
    summary:
      'A buyer-facing marketplace for presale condos and townhouses in Vancouver’s Lower Mainland: 76 responsive screens that set the deposit schedule, assignment fees and unit-by-unit costs side by side, replacing an earlier version that sold data to realtors.',
    company: INDEPENDENT,
    role: 'Product designer',
    kind: ['product'],
    order: 102,
    status: 'published',
    // No period: the file records no dates (README Q2). A phone crop of the property page, cut
    // above its map thumbnail (a map of Germany, not British Columbia).
    cover: {
      path: 'Docs/Experience/Projects/cproperty/assets/crops/cover.png',
      name: 'cproperty--cover.png',
      alt: 'CProperty on a phone — a presale property page with a price band and tiles for delivery year, deposit, investment rate, monthly payment, plan types and average rent',
    },
  },
  {
    slug: 'merikh-baft',
    title: 'Merikh Baft — tracking every fabric roll from warehouse to customer',
    summary:
      'Brand, website, back office and a five-role task app for an Iranian spacer-fabric mill: 128 screens in which every roll gets a QR label and is checked at each hand-off, from the dye house to the driver to the customer.',
    company: INDEPENDENT,
    role: 'Product designer',
    kind: ['product', 'systems'],
    order: 108,
    status: 'published',
    // No period: the file records no dates (SCAN.md Q3). The task app's labelling sheet, from a 2× export.
    cover: {
      path: 'Docs/Experience/Projects/merikh-baft/assets/crops/cover.png',
      name: 'merikh-baft--cover.png',
      alt: 'Merikh Baft task app on a phone — the sheet for labelling new fabric: enter the data, print a label for each roll, attach the labels',
    },
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
    // A phone capture of one category grid: the home page carries a live coupon and a sales number.
    cover: {
      path: 'Docs/Experience/Projects/faymen/assets/capture-2026-09/mobile/waistcoats.png',
      name: 'faymen--cover.png',
      alt: 'Fayman on a phone — the waistcoat collection as a right-to-left product grid priced in Toman',
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
    // The seller list re-exported at 2×: the desktop detail's footer carries a real address and phone.
    cover: {
      path: 'Docs/Experience/Projects/nim-dang/assets/2x/trading-hall/seller-list.png',
      name: 'nim-dang--cover.png',
      alt: 'Nim Dang — the trading hall seller list, where only peer resales carry a low, fair or high price gauge',
    },
  },
  // Yaravan is two case studies since 2026-09-26: the service design keeps /work/yaravan, the
  // platform built on it is /work/yaravan-platform. Order 104.5 keeps the pair adjacent.
  {
    slug: 'yaravan',
    title: 'Yaravan — service design for an after-sales operation nobody had written down',
    summary:
      'The service design behind a warranty brand: 22 after-sales processes drawn at six levels, from a macro map down to work instructions, only as far as the evidence allowed — with every gap marked, counted and owned instead of filled.',
    company: INDEPENDENT,
    role: YARAVAN_SERVICE_ROLE,
    kind: ['systems', 'research'],
    order: 104,
    status: 'published',
    period: { start: '2026-07-01T00:00:00.000Z' },
    cover: {
      path: 'Docs/Experience/Projects/yaravan/assets/crops/service-cover.png',
      name: 'yaravan--service-blueprint-cover.png',
      alt: 'Yaravan — the service blueprint for warranty activation in Persian: customer actions, touchpoints and the lines of interaction and visibility',
    },
  },
  {
    slug: 'yaravan-platform',
    title: 'Yaravan — a warranty platform that shows its open questions',
    summary:
      'A Persian warranty platform — public site, customer panel and staff panel — built on an operation still being defined, where every fact nobody had approved ships as a visible, owned open item instead of a confident sentence.',
    company: INDEPENDENT,
    role: YARAVAN_ROLE,
    kind: ['product'],
    order: 104.5,
    status: 'published',
    period: { start: '2026-07-01T00:00:00.000Z' },
    cover: {
      // The case study's crop of the customer panel home, without the dev-mode badge.
      path: 'Docs/Experience/Projects/yaravan/assets/crops/cover.png',
      name: 'yaravan--userpanel-desk.png',
      alt: 'Yaravan — the customer panel home on desktop in Persian: active warranties, open requests and a button to register a repair',
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
 *
 * The six Digikala Digital Gold chapter rows (DGK-02…07) were folded into the `digital-gold`
 * umbrella case study — they stay in Inventory as chapters, not as `/work` archive rows.
 */
export const RETIRED_PROJECT_SLUGS = [
  'uae-car-marketplace',
  'selling-conversion-programme',
  'zero-fee-campaign',
  'installment-campaign',
  'gift-card-campaign',
  'user-segmentation-model',
  'marketing-automation-flows',
  'gold-bi-dashboards',
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
