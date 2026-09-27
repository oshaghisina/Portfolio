import type { Project } from '@/payload-types'
import { dirFor, LOCALES, type Locale } from '@/utilities/locale'

import type { MediaSpec } from '../media'
import { archiveIdentity } from './archive'
import { bullets, paragraph, prose } from './lexical'

/**
 * Yaravan: the platform (`/work/yaravan-platform`). The public site, customer panel and staff
 * panel built on an after-sales operation still being defined, where every unapproved fact ships
 * as a visible, owned open item. Its companion is the service-design study, `yaravan.ts`
 * (`/work/yaravan`), which links here. Every sentence comes from
 * `Docs/Experience/Projects/yaravan/README.md` and the product report deck
 * (`assets/decks/product-report`, indexed in `assets/decks/README.md`).
 *
 * Split out of the single Yaravan study on 2026-09-26. The publication gates are the service
 * study's (see `yaravan.ts`) and are held by the same entry in
 * `tests/int/case-study-seeds.int.spec.ts`. For the screens in particular:
 * - Only redacted crops are uploaded. Every capture carries the dev-mode badge: the mobile crops
 *   stop above the tab bar that holds it, the desktop crops leave it out.
 * - The hero drops the subtitle that names the retailer's store; the parts crop drops the line
 *   that names its warehouse; the staff crops leave out the header naming the support system.
 * - No invoice, extension-order or warranty screen: they carry prices or extension terms.
 * - The `pages` figure and the hero (asked for by Sina on 2026-09-26) are the live public site,
 *   every page at desktop and phone width. The company's and the retailer's names, the address,
 *   the phone number, the store photograph, the sample warranty card and the warranty lengths are
 *   masked in the page itself before capture (`assets/capture-2026-09-26/masked.mjs`, which also
 *   fails a page whose unmasked text still names any of them).
 *
 * Copy lives in one `Copy` object per locale; the sections builder is a pure template over it.
 */
export const YAP_SLUG = 'yaravan-platform'
export const YAP_ASSETS = 'Docs/Experience/Projects/yaravan/assets'
export const YAP_LOCALES = LOCALES

const ARCHIVE = archiveIdentity(YAP_SLUG)

const MEDIA_FILES = {
  // The archive cover: the customer panel home, first uploaded by the single Yaravan study.
  cover: { file: 'crops/cover.png', name: ARCHIVE.row.cover.name },
  home: { file: 'gallery/desktop/home.webp', name: 'yaravan-platform--website-home.webp' },
  pending: { file: 'crops/contact-pending.png', name: 'yaravan--pending-approval.png' },
  addDevice: { file: 'crops/m-add-device.png', name: 'yaravan--add-device.png' },
  newRequest: { file: 'crops/m-new-request.png', name: 'yaravan--new-request.png' },
  requests: { file: 'crops/m-requests.png', name: 'yaravan--requests.png' },
  request: { file: 'crops/request-detail.png', name: 'yaravan--request-detail.png' },
  empty: { file: 'crops/m-history-empty.png', name: 'yaravan--history-empty.png' },
  requestDesktop: { file: 'crops/request-desktop.png', name: 'yaravan--request-desktop.png' },
  staff: { file: 'crops/staff-home.png', name: 'yaravan--staff-home.png' },
  dealership: { file: 'crops/staff-dealership.png', name: 'yaravan--staff-dealership.png' },
  parts: { file: 'crops/staff-parts.png', name: 'yaravan--staff-parts.png' },
  market: { file: 'crops/market-cliff.png', name: 'yaravan--market-cliff.png' },
} as const

/** Every page of the public site in navigation order: the `pages` figure (D-044). */
export const YAP_PAGES = [
  'home',
  'services',
  'why',
  'warranty-terms',
  'customer-charter',
  'about',
  'dealerships',
  'faq',
  'contact',
  'feedback',
  'feedback-and-complains',
  'login',
] as const
export type YapPage = (typeof YAP_PAGES)[number]

/** First screens are WebP; whole pages are JPEG, since a phone page can pass WebP's 16,383 px. */
const PAGE_VARIANTS = {
  desktop: { dir: 'desktop', ext: 'webp' },
  mobile: { dir: 'mobile', ext: 'webp' },
  desktopFull: { dir: 'desktop-full', ext: 'jpg' },
  mobileFull: { dir: 'mobile-full', ext: 'jpg' },
} as const
type PageVariant = keyof typeof PAGE_VARIANTS
const PAGE_VARIANT_KEYS = Object.keys(PAGE_VARIANTS) as PageVariant[]
type PageMediaKey = `page:${YapPage}:${PageVariant}`
const pageKey = (page: YapPage, variant: PageVariant): PageMediaKey => `page:${page}:${variant}`

type YapCropKey = keyof typeof MEDIA_FILES
export type YapMediaKey = YapCropKey | PageMediaKey
type YapMediaIds = Partial<Record<YapMediaKey, string>>
type Sections = NonNullable<Project['sections']>

type Two<T = string> = [T, T]
type Three<T = string> = [T, T, T]
type Four<T = string> = [T, T, T, T]
type Five<T = string> = [T, T, T, T, T]
type Six<T = string> = [T, T, T, T, T, T]
type Seven<T = string> = [T, T, T, T, T, T, T]

export interface YapCopy {
  statement: string
  industry: string
  team: string
  heroCaption: string
  snapshot: { problem: string; role: string; result: string }
  alt: Record<YapCropKey, string>
  context: { heading: string; body: Two }
  problem: { heading: string; body: Three }
  ownership: {
    heading: string
    intro: string
    own: Five
    coOwn: [string]
    collaborate: Two
    note: string
  }
  approach: { heading: string; body: Two; insight: string }
  brand: { label: string; heading: string; body: Two }
  marker: { heading: string; body: Two; annotations: Four; pendingCaption: string }
  panel: {
    label: string
    heading: string
    intro: string
    principles: Seven
    outro: string
    flowCaption: string
    emptyAnnotations: Three
    emptyCaption: string
  }
  status: { label: string; heading: string; body: Two; insight: string; requestCaption: string }
  decisions: {
    heading: string
    lede: string
    items: Six<{ title: string; why: string; alternatives: string; tradeoff: string }>
    staffEvidence: string
    staffCaption: string
  }
  next: { label: string; heading: string; body: Two; marketCaption: string }
  pages: {
    label: string
    heading: string
    body: Two
    figureCaption: string
    /** Each page's name, as the index and the viewer show it. */
    names: Record<YapPage, string>
    /** Alt templates; `{page}` is the page's name. */
    alt: Record<PageVariant, string>
    /** Appended to every alt of a page with masked details (all but sign-in). */
    masked: string
  }
  outcomes: {
    heading: string
    intro: string
    delivered: Four<{ label: string; context: string }>
    shipped: Six
  }
  lessons: { heading: string; items: Four<{ title: string; body: string }> }
}

const EN: YapCopy = {
  statement:
    'A warranty platform built on an operation still being defined, where every fact nobody had approved ships as a visible, owned open item.',
  industry: 'Retail · after-sales and warranty',
  team: 'Lead designer and PM, with the client’s engineering team and its business and after-sales leads',
  heroCaption:
    'The public site as it stood on 26 September 2026: “From request to delivery, we’re with you.” The company’s name is masked.',
  snapshot: {
    problem:
      'The brand’s public promises outran the operation, and a customer-facing site could quietly turn any of them into a commitment.',
    role: 'Lead designer and PM: requirements, the interface specification, the unconfirmed-claim pattern, and the customer and staff panels.',
    result:
      'A tested platform on staging — public site, customer panel and staff panel — waiting on business decisions, not engineering. No business metrics yet.',
  },
  alt: {
    cover:
      'Yaravan — the customer panel home on desktop in Persian: active warranties, open requests and a button to register a repair',
    home:
      'Yaravan — the public site’s home page on desktop in Persian: “From request to delivery, we’re with you”, beside a technician repairing a phone above a four-step strip — request, inspection, repair, delivery — with the company’s name masked in grey',
    pending:
      'Yaravan — the contact page in Persian: six dashed orange boxes, each naming a fact that still awaits approval',
    addDevice:
      'Yaravan — adding a device on mobile in Persian: a name, an optional brand, model and serial or IMEI, and a checkbox for a device that already has a problem',
    newRequest:
      'Yaravan — step one of a new request on mobile in Persian: choose repair or warranty, complaint, or general question',
    requests:
      'Yaravan — the request list on mobile in Persian: three requests of different types, each with its current status',
    request:
      'Yaravan — a repair request on mobile in Persian: the tracking code, the problem reported and a status timeline',
    empty:
      'Yaravan — an empty repair history on mobile in Persian that explains what will appear there and offers a button to view requests',
    requestDesktop:
      'Yaravan — a request in the customer panel on desktop in Persian: a four-stage progress bar, a sentence explaining the current stage and a dated status history',
    staff:
      'Yaravan — the staff panel home in Persian: four counters for dealership requests, invoices, open orders and parts requests',
    dealership:
      'Yaravan — dealership applications in the staff panel in Persian: each request with its status and approve or reject buttons, the applicant marked as not yet defined',
    parts:
      'Yaravan — parts in the staff panel in Persian: a search, filters for requested and received, and three parts with their status',
    market:
      'Yaravan market study — a chart of twelve repair-journey stages: the first five mostly digital, stages six to twelve between zero and eleven percent',
  },
  context: {
    heading: 'A dormant identity, a working product',
    body: [
      'Yaravan is the warranty and after-sales brand of an Iranian mobile-phone retailer. An outside agency wrote its brand identity in 2024 — a strategy deck and a visual guideline — and then nothing was built on it.',
      'From July 2026 the job was to turn that identity into a working product: an independent Persian website, a customer panel and a staff panel. The existing support system keeps the ticket queue and the repair operation; the product covers what the brand itself owns. The operation underneath, drawn process by process, is a case study of its own.',
    ],
  },
  problem: {
    heading: 'Where a fact should be',
    body: [
      'The existing site promised more than the operation delivered. The requirements work found that its headline claims were not operational truth, and that no real warranty database existed — no data migration was needed, because there was no data.',
      'The brand strategy promised more again — branches, round-the-clock service, delivery, bundled insurance — and the operation that would have to keep those promises was still being defined. A customer-facing site could quietly turn any of them into a commitment.',
      'That left one real design question: what do you put on the page where a fact should be, when nobody can yet confirm the fact?',
    ],
  },
  ownership: {
    heading: 'Leading the work, with the client’s team',
    intro:
      'I led the product — requirements, the interface specification and the build — with the client’s engineering team contributing. Business ownership stayed with the client: its business lead owned the commercial decisions and its after-sales lead owned the support operation the product depends on.',
    own: [
      'Requirements and scope',
      'Brand system, derived from the source files',
      'Interface specification',
      'The unconfirmed-claim pattern',
      'Customer and staff panel design',
    ],
    coOwn: ['The platform build, with the client’s engineering team'],
    collaborate: [
      'Commercial decisions (the business lead)',
      'The support operation (the after-sales lead)',
    ],
    note: 'The build was AI-assisted, and the repository says so openly: its guide sets the source-of-truth order and the conflict rules that made that safe on a business where most facts were still open.',
  },
  approach: {
    heading: 'Specified in writing, governed question by question',
    body: [
      'The requirements came from fifty direct multiple-choice questions to the business lead, against one success test: engineering can start without re-asking any fundamental question. The interface was then specified in writing rather than drawn — 49 component files — because the screens were the known part. The design effort went into the operation underneath and into the rules for what the screens may say.',
      'Those rules are a conflict protocol, and it decides which source wins by type of question rather than once for all. The business documents win on service, warranty, price, SLA and behaviour; the brand files win on logo, colour and type. A customer-facing claim needs both a brand source and a confirmed operational basis, or it does not ship.',
    ],
    insight:
      'The 2024 brand strategy and the 2026 reality contradict each other constantly. The fix was never to pick a winner globally — it was to govern the gap, one kind of question at a time.',
  },
  brand: {
    label: 'Brand',
    heading: 'Derived, never redrawn',
    body: [
      'The brand system was reverse-engineered from the agency’s two source files, and every statement in it is traceable to a page of them; where the files are silent, the documentation says so instead of filling the gap. Colour was read from the logo’s vector fill operators rather than sampled from a render — which settled a discrepancy between two blues as a colour-space conversion, not a second brand colour. A bright yellow that appears only as a one-pixel “you are here” outline became a functional highlight, never a brand colour.',
      'The type pairing came with its licensing risk written down rather than discovered later: the display face is commercial and needs web-embedding rights confirmed. The logo library — 15 SVGs, 75 PNGs, 75 WebPs and 12 favicons — was generated from the original vector paths, and the lockup follows reading direction: symbol on the right in Persian, on the left in English. A logo is never mirrored to fake the other direction.',
    ],
  },
  marker: {
    heading: 'The unconfirmed-claim marker',
    body: [
      'Where a page needs a fact nobody has approved, it renders an orange dashed box naming the missing item and its owner — a content block that editors place like any other. A sweep in mid-August counted 32 live open items on seven of the eight public pages, and found that five recurring subjects account for most of them. Closing five things closes most of the site.',
      'The marker is the product’s answer to the design question. It turns a content problem — pages that need facts nobody will yet approve — into a list that can be counted, assigned and closed, and it keeps the site honest while it is incomplete: nothing a customer reads is a promise the business has not made.',
    ],
    annotations: [
      'Each box names one fact the page needs, instead of a confident sentence.',
      'The dashed orange frame sets an open item apart from the content around it.',
      'Every box carries the name of whoever must approve it; the names are hidden here.',
      'Six on this page alone: the support phone, phone and chat hours, email, the store’s address and the legal registration.',
    ],
    pendingCaption: 'The contact page: the facts it still needs, listed where they will go.',
  },
  panel: {
    label: 'Customer panel',
    heading: 'Seven principles on every page',
    intro:
      'The customer panel replaces phone calls with a place to look. Eight destinations cover what a customer actually does — sign in, see where they stand, register a device, check a warranty, open a request, follow it, find past repairs and invoices, keep an address on file — and on a phone the four most used sit in the bottom bar, one tap away. Seven principles hold on all eleven pages:',
    principles: [
      'No password: a mobile number and an SMS code, so there is nothing to forget.',
      'Private by default: customers see only their own data, enforced on the server rather than hidden in the interface.',
      'Mobile first: the four most-used destinations in the bottom bar.',
      'Fully Persian: text, calendar and digits — with serials and IMEI kept left to right so they read correctly.',
      'Empty states that teach: every empty page says why it is empty and what to do next.',
      'Explicit, not ambiguous: “not yet synced” is kept apart from “you have no warranty” — two completely different states that most systems show as “nothing found”.',
      'Accessible: the panel has its own accessibility test suite.',
    ],
    outro:
      'Small decisions carry the same care. Ticking “this device has a problem” while adding a device opens a repair request at the same time — two jobs in one form. The customer is told to write the tracking code inside the parcel, so the device joins its case the moment it arrives. And a case that belongs to someone else returns “not found”, never a message that reveals it exists.',
    flowCaption:
      'From device to tracking on a phone: add a device, choose a request type, see every request with its status, follow one on its timeline. Demo data; the bottom bar is cropped out.',
    emptyAnnotations: [
      'The page says what it holds: a read-only archive of closed or cancelled repairs.',
      'The empty state says how it fills — a case and its final status stay here once a request closes.',
      'And it offers the next step instead of a dead end.',
    ],
    emptyCaption:
      'An empty state that teaches: the repair history before there is any history. Demo data.',
  },
  status: {
    label: 'Status',
    heading: 'Status never goes backwards',
    body: [
      'A repair or warranty request moves through four stages the customer can see — registered, under review or repair, ready for delivery, delivered — while a complaint or a question closes after review. Every change stays on the timeline with its date and time. Skipping a stage, going back, or changing a finalised status is rejected on the server, not just hidden in the interface, and sending the same form twice does not create a second request.',
      'Behind those four stages, six happen at headquarters: intake and triage, receiving the device, diagnosis, the warranty-eligibility check, repair and quality control, and handover. The customer sees four, and the difference is deliberate — the panel says so in plain words, telling the customer that only the general stages are shown and the internal detail is kept out of view.',
    ],
    insight:
      'The status shown to the customer never lies: an unknown response from an outside system stays pending until it is reconciled, and is never shown as success.',
    requestCaption:
      'A request on desktop: the four-stage bar, a sentence explaining the current stage, and the dated status history. Demo data.',
  },
  decisions: {
    heading: 'Six boundaries',
    lede: 'Most of the design is about what the product refuses to do or say.',
    items: [
      {
        title: 'Show the gap and its owner, not a guess',
        why: 'A site that states an unapproved promise turns it into a commitment. Rendering the open item — with the person who owes the answer — keeps the site honest while it is incomplete, and turns a content problem into a list that can be tracked and closed.',
        alternatives: 'Plausible placeholder copy, or hiding the section',
        tradeoff: 'The site visibly looks unfinished until the business answers.',
      },
      {
        title: 'A staff panel that is not an operations panel',
        why: 'Agents already work in the existing support system, and a second one would split the truth. The staff panel covers only the processes the product owns — invoices, activation codes, parts receipt, dealership review — and its sitemap says it must never grow into ticket queues, diagnosis or repair.',
        alternatives: 'Rebuilding ticketing inside the new product',
        tradeoff: 'Staff work in two systems until the two are connected.',
      },
      {
        title: 'No integration is a launch prerequisite',
        why: 'Three connection levels were defined, and level one is independent: if the support system never connects, nothing breaks. Connection adds productivity, not the ability to work, so the product’s value does not wait on anyone else’s contract.',
        alternatives: 'Launch only once every integration is live',
        tradeoff: 'Manual handoffs until the contracts are signed.',
      },
      {
        title: 'Integrations fail closed',
        why: 'Every external system sits behind one gateway layer, tested against seven boundary scenarios — success, validation error, timeout, duplicate, replay, out of order and unknown state, which stays pending rather than guessed. Outside production a missing credential falls back to a simulator; production throws rather than report a send that never happened.',
        alternatives: 'Optimistic success states',
        tradeoff: 'More states to design, and errors a user can see.',
      },
      {
        title: 'Segregation of duties in the product, not only on paper',
        why: 'Whoever issues an invoice cannot alone approve a large void, and the role that sets the void ceiling cannot approve voids — it cannot raise its own ceiling. Menu, page guard and server check read one module, so the interface and the server cannot disagree about a permission.',
        alternatives: 'Permissions drawn in a matrix and enforced by habit',
        tradeoff: 'Some routine actions need a second person.',
      },
      {
        title: 'Name what was not built, and why',
        why: 'The wallet was removed for want of a data source, support chat deferred, and management reports held back because their formulas are unapproved: a wrong number is worse than no number. Diagnosis and repair are workshop work, not a software process.',
        alternatives: 'Ship dashboards with provisional formulas',
        tradeoff: 'Managers get no report until the business defines the measures.',
      },
    ],
    staffEvidence:
      'The staff panel home: four counters for the work the product owns, and nothing from the ticket queue.',
    staffCaption:
      'Inside the staff panel’s scope: dealership applications that admit their own open question — the applicant fields are not defined yet — and parts tracked with only two statuses, because ordering happens outside the product. One line naming the supplier is removed.',
  },
  next: {
    label: 'What’s next',
    heading: 'The market built the customer a website, not a way back',
    body: [
      'A study of 100 companies in Iran’s digital-goods warranty and repair market, 18 of them assessed in depth against a twelve-stage repair journey, found a cliff: the first five stages are largely digital, and from device handover onward almost nothing is. The best platform digitises six stages of twelve; the average is 4.1.',
      'The study’s reframe is a data-model argument, which is why it reaches the product: the unit of information in this market is not the ticket or the invoice but the service case — one device’s whole life, from its condition at intake through diagnosis, cost approval, repair, quality control and return. The first decision it put forward is an itemised pre-invoice the customer approves online, which no company in the study offered. The product stops at the workshop door on purpose; the case for going further is now written down.',
    ],
    marketCaption:
      'The cliff: stages one to five of the repair journey are 33–100% digital across the platforms studied; stages six to twelve, 0–11%.',
  },
  pages: {
    label: 'Every page',
    heading: 'The public site, page by page',
    body: [
      'Every page of the public site, captured on 26 September 2026 at 1,440 pixels wide and on a 390-pixel phone: the home page, services, why us, the warranty terms, the customer charter, about, the dealership application, the FAQ, contact, the satisfaction survey, the feedback and complaints form, and sign-in.',
      'The pages share one system: white pages broken by deep-blue bands, the same four-step request strip — request, inspection, repair, delivery — on the home and why-us pages, and on a phone a single column with the navigation behind a menu button. The company’s and the retailer’s names, the address, the phone number, the store photograph, the sample warranty card and the warranty lengths are masked in grey before capture; nothing else is retouched.',
    ],
    figureCaption: 'Every page of the public site, first screen at desktop and phone width; open any page to see all of it.',
    names: {
      home: 'Home',
      services: 'Services',
      why: 'Why us',
      'warranty-terms': 'Warranty terms',
      'customer-charter': 'Customer charter',
      about: 'About',
      dealerships: 'Dealership application',
      faq: 'FAQ',
      contact: 'Contact',
      feedback: 'Satisfaction survey',
      'feedback-and-complains': 'Feedback and complaints',
      login: 'Sign in',
    },
    alt: {
      desktop: 'Yaravan on desktop — {page}, the first screen',
      mobile: 'Yaravan on mobile — {page}, the first screen',
      desktopFull: 'Yaravan on desktop — {page}, the whole page',
      mobileFull: 'Yaravan on mobile — {page}, the whole page',
    },
    masked: ', with identifying details masked',
  },
  outcomes: {
    heading: 'A platform waiting on decisions',
    intro:
      'There are no business metrics, and there should not be: the platform is on staging, and the agreed measures have no approved formula or data source yet. The six-week Phase 1 target was missed. The three items blocking integration — access to the existing support system, a customer-sync contract, and a written security and privacy approval — are decisions, not engineering, and every other open item was re-tiered to gate only its own feature.',
    delivered: [
      {
        label: 'A public site',
        context:
          'Eight pages, all Persian and right to left, with every unapproved fact shown as an owned open item.',
      },
      {
        label: 'A customer panel',
        context:
          'Built on seven principles: no password, private by default, mobile first, and empty states that teach.',
      },
      {
        label: 'A staff panel',
        context:
          'Only the work the product owns — invoices, activation codes, parts and dealership review — with segregation of duties enforced in the code.',
      },
      {
        label: 'A tested build',
        context: '26 collections and 92 test files across five levels, with CI on every push.',
      },
    ],
    shipped: [
      'Public site',
      'Customer panel',
      'Staff panel',
      'Unconfirmed-claim marker',
      'Brand asset library',
      'Integration layer',
    ],
  },
  lessons: {
    heading: 'The honest version of a product',
    items: [
      {
        title: 'Publishing the gap beats papering over it',
        body: 'The dashed orange box is the whole project in one component. It turned a content problem into a tracked, owned, countable list, and it made the site honest while it was still incomplete.',
      },
      {
        title: 'Say the difference out loud',
        body: '“Not yet synced” and “you have no warranty” look alike in a database and mean opposite things to a customer. So do four stages and six. Naming the difference on the screen cost a sentence and saved a phone call.',
      },
      {
        title: 'A brand strategy is not a product spec',
        body: 'The fix for a strategy that contradicts reality is not to pick a winner once. It is a rule that says which source wins for which kind of question — and that no customer-facing claim ships without both.',
      },
      {
        title: 'Guardrails must keep pace with the build',
        body: 'The repository’s guide still described a codebase with no application source long after it had 26 collections and a staging deployment. Documentation that governs an AI-assisted build has to be maintained at the speed of the build, or it starts governing a codebase that no longer exists.',
      },
    ],
  },
}

const FA: YapCopy = {
  statement:
    'پلتفرم گارانتی‌ای بر پایه‌ی عملیاتی که هنوز در حال تعریف است، که در آن هر واقعیتی که هیچ‌کس تأییدش نکرده بود، به شکل موردی باز، آشکار و صاحب‌دار منتشر می‌شود.',
  industry: 'خرده‌فروشی · خدمات پس از فروش و گارانتی',
  team: 'طراح ارشد و مدیر محصول، همراه با تیم مهندسی کارفرما و مسئولان کسب‌وکار و خدمات پس از فروش آن',
  heroCaption:
    'سایت عمومی در ۴ مهر ۱۴۰۵: «از ثبت درخواست تا تحویل همراه شما هستیم.» نام شرکت پوشانده شده است.',
  snapshot: {
    problem:
      'وعده‌های عمومی برند از توان عملیات جلو زده بود، و سایتی رو به مشتری می‌توانست بی‌صدا هر یک از آن‌ها را به تعهد تبدیل کند.',
    role: 'طراح ارشد و مدیر محصول: نیازمندی‌ها، مشخصات رابط کاربری، الگوی ادعای تأییدنشده، و پنل‌های مشتری و کارکنان.',
    result:
      'پلتفرمی تست‌شده روی محیط آزمایشی — سایت عمومی، پنل مشتری و پنل کارکنان — که در انتظار تصمیم‌های کسب‌وکار است، نه کار مهندسی. هنوز شاخص کسب‌وکاری در کار نیست.',
  },
  alt: {
    cover:
      'یاراوان — صفحه‌ی اصلی پنل مشتری روی دسکتاپ به فارسی: گارانتی‌های فعال، درخواست‌های باز و دکمه‌ای برای ثبت تعمیر',
    home:
      'یاراوان — صفحه‌ی اصلی سایت عمومی روی دسکتاپ به فارسی: «از ثبت درخواست تا تحویل همراه شما هستیم»، کنار تعمیرکاری که گوشی‌ای را تعمیر می‌کند و بالای نوار چهارمرحله‌ای ثبت درخواست، بررسی، تعمیر و تحویل؛ نام شرکت با خاکستری پوشانده شده است',
    pending:
      'یاراوان — صفحه‌ی تماس با ما به فارسی: شش کادر خط‌چین نارنجی، هر یک با نام واقعیتی که هنوز در انتظار تأیید است',
    addDevice:
      'یاراوان — افزودن دستگاه روی تلفن همراه به فارسی: یک نام، برند، مدل و شماره‌ی سریال یا IMEI به‌صورت اختیاری، و یک چک‌باکس برای دستگاهی که همین حالا مشکل دارد',
    newRequest:
      'یاراوان — گام نخست درخواست جدید روی تلفن همراه به فارسی: انتخاب میان تعمیر یا گارانتی، شکایت، یا پرسش عمومی',
    requests:
      'یاراوان — فهرست درخواست‌ها روی تلفن همراه به فارسی: سه درخواست از نوع‌های مختلف، هر یک با وضعیت فعلی‌اش',
    request:
      'یاراوان — یک درخواست تعمیر روی تلفن همراه به فارسی: کد پیگیری، مشکل گزارش‌شده و خط زمانی وضعیت',
    empty:
      'یاراوان — سوابق تعمیر خالی روی تلفن همراه به فارسی که توضیح می‌دهد چه چیزی در آن نمایش داده خواهد شد و دکمه‌ای برای دیدن درخواست‌ها پیش می‌گذارد',
    requestDesktop:
      'یاراوان — یک درخواست در پنل مشتری روی دسکتاپ به فارسی: نوار پیشرفت چهارمرحله‌ای، جمله‌ای که مرحله‌ی فعلی را توضیح می‌دهد و تاریخچه‌ی وضعیت تاریخ‌دار',
    staff:
      'یاراوان — صفحه‌ی اصلی پنل کارکنان به فارسی: چهار شمارنده برای درخواست‌های نمایندگی، فاکتورها، سفارش‌های باز و درخواست‌های قطعه',
    dealership:
      'یاراوان — درخواست‌های نمایندگی در پنل کارکنان به فارسی: هر درخواست با وضعیتش و دکمه‌های تأیید یا رد، و متقاضی‌ای که هنوز تعریف‌نشده علامت خورده است',
    parts:
      'یاراوان — قطعات در پنل کارکنان به فارسی: جست‌وجو، فیلترهای درخواست‌شده و دریافت‌شده، و سه قطعه با وضعیتشان',
    market:
      'مطالعه‌ی بازار یاراوان — نموداری از دوازده مرحله‌ی مسیر تعمیر: پنج مرحله‌ی نخست عمدتاً دیجیتال، مراحل شش تا دوازده میان صفر تا یازده درصد',
  },
  context: {
    heading: 'هویتی خفته، محصولی کارا',
    body: [
      'یاراوان برند گارانتی و خدمات پس از فروش یک خرده‌فروش ایرانی تلفن همراه است. یک آژانس بیرونی در سال ۲۰۲۴ هویت برند آن را نوشت — یک سند استراتژی و یک راهنمای بصری — و پس از آن هیچ چیز بر پایه‌اش ساخته نشد.',
      'از ژوئیه‌ی ۲۰۲۶ کار این بود که آن هویت به محصولی کارا تبدیل شود: یک وب‌سایت فارسی مستقل، یک پنل مشتری و یک پنل کارکنان. سامانه‌ی پشتیبانی موجود صف تیکت‌ها و عملیات تعمیر را در دست دارد؛ محصول آنچه را پوشش می‌دهد که مالکش خود برند است. عملیات زیرین، که فرایند به فرایند ترسیم شد، مطالعه‌ی موردی جداگانه‌ی خودش را دارد.',
    ],
  },
  problem: {
    heading: 'جایی که باید واقعیتی باشد',
    body: [
      'سایت موجود بیش از آنچه عملیات ارائه می‌داد وعده می‌داد. کار نیازمندی‌ها نشان داد که ادعاهای اصلی آن حقیقت عملیاتی نبودند، و هیچ پایگاه داده‌ی واقعی‌ای برای گارانتی وجود نداشت — به مهاجرت داده نیازی نبود، چون داده‌ای در کار نبود.',
      'استراتژی برند از این هم بیشتر وعده می‌داد — شعبه‌ها، خدمات شبانه‌روزی، ارسال و بیمه‌ی همراه — و عملیاتی که باید این وعده‌ها را محقق می‌کرد هنوز در حال تعریف بود. سایتی رو به مشتری می‌توانست بی‌صدا هر یک از آن‌ها را به تعهد تبدیل کند.',
      'این یک پرسش واقعی طراحی باقی گذاشت: وقتی هنوز هیچ‌کس نمی‌تواند واقعیتی را تأیید کند، در جایی از صفحه که آن واقعیت باید باشد چه می‌گذارید؟',
    ],
  },
  ownership: {
    heading: 'رهبری کار، همراه با تیم کارفرما',
    intro:
      'محصول را رهبری کردم — نیازمندی‌ها، مشخصات رابط کاربری و ساخت — و تیم مهندسی کارفرما در آن مشارکت داشت. مالکیت کسب‌وکار نزد کارفرما ماند: مسئول کسب‌وکار آن مالک تصمیم‌های تجاری بود و مسئول خدمات پس از فروش آن مالک عملیات پشتیبانی‌ای که محصول به آن وابسته است.',
    own: [
      'نیازمندی‌ها و دامنه‌ی کار',
      'سیستم برند، برگرفته از فایل‌های مرجع',
      'مشخصات رابط کاربری',
      'الگوی ادعای تأییدنشده',
      'طراحی پنل‌های مشتری و کارکنان',
    ],
    coOwn: ['ساخت پلتفرم، همراه با تیم مهندسی کارفرما'],
    collaborate: ['تصمیم‌های تجاری (مسئول کسب‌وکار)', 'عملیات پشتیبانی (مسئول خدمات پس از فروش)'],
    note: 'ساخت با کمک هوش مصنوعی انجام شد، و مخزن این را آشکارا می‌گوید: راهنمای آن ترتیب منابع مرجع و قواعد حل تعارض را تعیین می‌کند، همان چیزی که این کار را در کسب‌وکاری که بیشتر واقعیت‌هایش هنوز باز بود ایمن کرد.',
  },
  approach: {
    heading: 'مکتوب مشخص شد، پرسش به پرسش اداره شد',
    body: [
      'نیازمندی‌ها از پنجاه پرسش چندگزینه‌ای مستقیم از مسئول کسب‌وکار به دست آمد، با یک محک موفقیت: تیم مهندسی بتواند کار را آغاز کند بی‌آنکه هیچ پرسش بنیادینی را دوباره بپرسد. سپس رابط کاربری به‌جای ترسیم، به‌صورت مکتوب مشخص شد — ۴۹ فایل کامپوننت — چون صفحه‌ها بخش شناخته‌شده بودند. تلاش طراحی صرف عملیات زیرین و قواعدی شد که تعیین می‌کنند صفحه‌ها مجازند چه بگویند.',
      'این قواعد یک پروتکل حل تعارض‌اند، و تعیین می‌کنند کدام منبع برنده است — بر حسب نوع پرسش، نه یک بار برای همیشه. اسناد کسب‌وکار در خدمات، گارانتی، قیمت، SLA و رفتار برنده‌اند؛ فایل‌های برند در لوگو، رنگ و تایپوگرافی. هر ادعای رو به مشتری هم به یک منبع برند نیاز دارد و هم به پشتوانه‌ی عملیاتی تأییدشده، وگرنه منتشر نمی‌شود.',
    ],
    insight:
      'استراتژی برند ۲۰۲۴ و واقعیت ۲۰۲۶ مدام با هم در تناقض‌اند. راه‌حل هرگز انتخاب یک برنده‌ی کلی نبود — اداره کردن این شکاف بود، هر بار برای یک نوع پرسش.',
  },
  brand: {
    label: 'برند',
    heading: 'استخراج شد، هرگز از نو ترسیم نشد',
    body: [
      'سیستم برند با مهندسی معکوس از دو فایل مرجع آژانس بازسازی شد، و هر گزاره در آن تا صفحه‌ای از آن فایل‌ها ردیابی‌پذیر است؛ هر جا آن فایل‌ها ساکت‌اند، مستندات به‌جای پر کردن جای خالی همین را می‌گوید. رنگ از عملگرهای پرکننده‌ی برداری لوگو خوانده شد، نه با نمونه‌برداری از یک رندر — و همین نشان داد که اختلاف میان دو آبی ناشی از تبدیل فضای رنگی است، نه رنگ دومی برای برند. زرد روشنی که فقط به‌صورت یک خط دور تک‌پیکسلی «شما این‌جا هستید» دیده می‌شود، به یک برجسته‌ساز کارکردی تبدیل شد، هرگز رنگ برند.',
      'ریسک مجوز جفت‌فونت‌ها از پیش مکتوب شد، نه اینکه بعدها کشف شود: فونت نمایشی تجاری است و حق جاسازی آن در وب باید تأیید شود. کتابخانه‌ی لوگو — ۱۵ SVG، ۷۵ PNG، ۷۵ WebP و ۱۲ فاوآیکن — از مسیرهای برداری اصلی تولید شد، و چیدمان نماد و نوشتار لوگو از جهت خواندن پیروی می‌کند: نماد در فارسی سمت راست، در انگلیسی سمت چپ. لوگو هرگز برای جعل جهت دیگر قرینه نمی‌شود.',
    ],
  },
  marker: {
    heading: 'نشانگر ادعای تأییدنشده',
    body: [
      'هر جا صفحه به واقعیتی نیاز دارد که هیچ‌کس تأییدش نکرده، یک کادر خط‌چین نارنجی نمایش می‌دهد که مورد ناموجود و مالک آن را نام می‌برد — بلوکی محتوایی که ویراستاران مانند هر بلوک دیگری جای‌گذاری می‌کنند. یک بررسی سراسری در نیمه‌ی اوت ۳۲ مورد باز فعال را در هفت صفحه از هشت صفحه‌ی عمومی شمرد، و نشان داد که پنج موضوع تکرارشونده بیشتر آن‌ها را تشکیل می‌دهند. بستن پنج مورد، بیشتر سایت را کامل می‌کند.',
      'این نشانگر پاسخ محصول به پرسش طراحی است. یک مشکل محتوایی — صفحه‌هایی که به واقعیت‌هایی نیاز دارند که هنوز هیچ‌کس حاضر به تأییدشان نیست — را به فهرستی تبدیل می‌کند که می‌توان شمرد، به کسی سپرد و بست، و سایت را در دوران ناتمامی‌اش صادق نگه می‌دارد: هیچ چیزی که مشتری می‌خواند، وعده‌ای نیست که کسب‌وکار نداده باشد.',
    ],
    annotations: [
      'هر کادر یک واقعیت موردنیاز صفحه را نام می‌برد، به‌جای جمله‌ای از سر اطمینان.',
      'قاب خط‌چین نارنجی، مورد باز را از محتوای پیرامونش جدا می‌کند.',
      'هر کادر نام کسی را دارد که باید تأییدش کند؛ نام‌ها در این‌جا پنهان شده‌اند.',
      'فقط در همین صفحه شش مورد: تلفن پشتیبانی، ساعت‌های پاسخ‌گویی تلفن و گفت‌وگو، ایمیل، نشانی فروشگاه و ثبت حقوقی.',
    ],
    pendingCaption:
      'صفحه‌ی تماس با ما: واقعیت‌هایی که هنوز لازم دارد، فهرست‌شده در همان جایی که قرار خواهند گرفت.',
  },
  panel: {
    label: 'پنل مشتری',
    heading: 'هفت اصل در هر صفحه',
    intro:
      'پنل مشتری به‌جای تماس تلفنی، جایی برای سر زدن و دیدن فراهم می‌کند. هشت مقصد آنچه را مشتری واقعاً انجام می‌دهد پوشش می‌دهند — ورود، دیدن اینکه کارش به کجا رسیده، ثبت دستگاه، بررسی گارانتی، ثبت درخواست، پیگیری آن، یافتن تعمیرها و فاکتورهای گذشته، و نگه‌داشتن نشانی در پرونده — و روی تلفن همراه، چهار مقصد پرکاربرد در نوار پایین قرار دارند، به فاصله‌ی یک لمس. هفت اصل در هر یازده صفحه برقرارند:',
    principles: [
      'بدون رمز عبور: یک شماره‌ی تلفن همراه و یک کد پیامکی، پس چیزی برای فراموش کردن نیست.',
      'خصوصی به‌صورت پیش‌فرض: هر مشتری فقط داده‌ی خودش را می‌بیند، و این در سرور اعمال می‌شود، نه با پنهان کردن در رابط کاربری.',
      'اول موبایل: چهار مقصد پرکاربرد در نوار پایین.',
      'کاملاً فارسی: متن، تقویم و ارقام — و شماره‌های سریال و IMEI چپ‌به‌راست نگه داشته می‌شوند تا درست خوانده شوند.',
      'حالت‌های خالیِ آموزنده: هر صفحه‌ی خالی می‌گوید چرا خالی است و گام بعد چیست.',
      'صریح، نه مبهم: «هنوز همگام‌سازی نشده» از «گارانتی ندارید» جدا نگه داشته می‌شود — دو وضعیت کاملاً متفاوت که بیشتر سامانه‌ها هر دو را «چیزی یافت نشد» نشان می‌دهند.',
      'دسترس‌پذیر: پنل مجموعه‌ی تست دسترس‌پذیری خودش را دارد.',
    ],
    outro:
      'تصمیم‌های کوچک هم با همین دقت گرفته شده‌اند. زدن تیک «این دستگاه مشکل دارد» هنگام افزودن دستگاه، هم‌زمان یک درخواست تعمیر باز می‌کند — دو کار در یک فرم. به مشتری گفته می‌شود کد پیگیری را داخل بسته بنویسد، تا دستگاه همان لحظه‌ی رسیدن به پرونده‌اش بپیوندد. و پرونده‌ای که متعلق به شخص دیگری است، «یافت نشد» برمی‌گرداند، هرگز پیامی که وجودش را فاش کند.',
    flowCaption:
      'از دستگاه تا پیگیری روی تلفن همراه: افزودن دستگاه، انتخاب نوع درخواست، دیدن همه‌ی درخواست‌ها با وضعیتشان، و دنبال کردن یکی روی خط زمانی‌اش. داده‌های نمایشی؛ نوار پایین برش خورده است.',
    emptyAnnotations: [
      'صفحه می‌گوید چه چیزی در خود دارد: بایگانی فقط‌خواندنی تعمیرهای بسته‌شده یا لغوشده.',
      'حالت خالی می‌گوید چگونه پر می‌شود — وقتی درخواستی بسته شود، پرونده و وضعیت نهایی‌اش این‌جا می‌ماند.',
      'و به‌جای بن‌بست، گام بعدی را پیش می‌گذارد.',
    ],
    emptyCaption:
      'حالت خالی‌ای که آموزش می‌دهد: سوابق تعمیر پیش از آنکه سابقه‌ای در کار باشد. داده‌های نمایشی.',
  },
  status: {
    label: 'وضعیت',
    heading: 'وضعیت هرگز به عقب برنمی‌گردد',
    body: [
      'درخواست تعمیر یا گارانتی از چهار مرحله‌ای می‌گذرد که مشتری می‌بیند — ثبت‌شده، در حال بررسی یا تعمیر، آماده‌ی تحویل، تحویل‌شده — در حالی که شکایت یا پرسش پس از بررسی بسته می‌شود. هر تغییر با تاریخ و ساعتش روی خط زمانی می‌ماند. پریدن از یک مرحله، بازگشت به عقب، یا تغییر وضعیتی نهایی‌شده در سرور رد می‌شود، نه اینکه فقط در رابط کاربری پنهان شود، و دو بار فرستادن همان فرم درخواست دومی نمی‌سازد.',
      'پشت این چهار مرحله، شش مرحله در دفتر مرکزی رخ می‌دهد: پذیرش و اولویت‌بندی، دریافت دستگاه، عیب‌یابی، بررسی شمول گارانتی، تعمیر و کنترل کیفیت، و تحویل. مشتری چهار مرحله می‌بیند، و این تفاوت عامدانه است — پنل این را با کلماتی ساده می‌گوید و به مشتری اطلاع می‌دهد که فقط مراحل کلی نمایش داده می‌شوند و جزئیات داخلی از دید پنهان می‌ماند.',
    ],
    insight:
      'وضعیتی که به مشتری نشان داده می‌شود هرگز دروغ نمی‌گوید: پاسخ نامعلوم از یک سامانه‌ی بیرونی تا زمان تطبیق در حالت معلق می‌ماند، و هرگز موفق نشان داده نمی‌شود.',
    requestCaption:
      'یک درخواست روی دسکتاپ: نوار چهارمرحله‌ای، جمله‌ای که مرحله‌ی فعلی را توضیح می‌دهد، و تاریخچه‌ی وضعیت تاریخ‌دار. داده‌های نمایشی.',
  },
  decisions: {
    heading: 'شش مرز',
    lede: 'بیشتر طراحی درباره‌ی چیزهایی است که محصول از انجام دادن یا گفتنشان سر باز می‌زند.',
    items: [
      {
        title: 'شکاف و مالکش را نشان بده، نه یک حدس',
        why: 'سایتی که وعده‌ای تأییدنشده را بیان کند، آن را به تعهد تبدیل می‌کند. نمایش مورد باز — همراه با کسی که پاسخ آن را بر عهده دارد — سایت را در دوران ناتمامی‌اش صادق نگه می‌دارد، و یک مشکل محتوایی را به فهرستی تبدیل می‌کند که می‌توان پیگیری و بسته‌اش کرد.',
        alternatives: 'متن جای‌نگهدار باورپذیر، یا پنهان کردن بخش',
        tradeoff: 'تا کسب‌وکار پاسخ ندهد، سایت آشکارا ناتمام به نظر می‌رسد.',
      },
      {
        title: 'پنل کارکنانی که پنل عملیات نیست',
        why: 'کارشناسان هم‌اکنون در سامانه‌ی پشتیبانی موجود کار می‌کنند، و سامانه‌ی دوم حقیقت را دوپاره می‌کند. پنل کارکنان فقط فرایندهایی را پوشش می‌دهد که محصول مالک آن‌هاست — فاکتورها، کدهای فعال‌سازی، دریافت قطعات، بررسی نمایندگی‌ها — و نقشه‌ی سایت آن می‌گوید که هرگز نباید به صف تیکت‌ها، عیب‌یابی یا تعمیر گسترش یابد.',
        alternatives: 'بازسازی تیکتینگ درون محصول جدید',
        tradeoff: 'کارکنان تا زمان اتصال این دو سامانه، در هر دو کار می‌کنند.',
      },
      {
        title: 'هیچ یکپارچه‌سازی‌ای پیش‌شرط راه‌اندازی نیست',
        why: 'سه سطح اتصال تعریف شد، و سطح یک مستقل است: اگر سامانه‌ی پشتیبانی هرگز متصل نشود، چیزی از کار نمی‌افتد. اتصال بهره‌وری می‌افزاید، نه توان کار کردن را؛ پس ارزش محصول منتظر قرارداد هیچ‌کس دیگری نمی‌ماند.',
        alternatives: 'راه‌اندازی فقط پس از فعال شدن همه‌ی یکپارچه‌سازی‌ها',
        tradeoff: 'تا امضای قراردادها، تحویل‌وتحول‌ها دستی است.',
      },
      {
        title: 'یکپارچه‌سازی‌ها در حالت بسته شکست می‌خورند',
        why: 'هر سامانه‌ی بیرونی پشت یک لایه‌ی درگاه واحد قرار دارد که در برابر هفت سناریوی مرزی تست شده است — موفقیت، خطای اعتبارسنجی، اتمام مهلت، تکرار، بازپخش، خارج از ترتیب و وضعیت نامعلوم، که به‌جای حدس زده شدن در حالت معلق می‌ماند. بیرون از محیط تولید، نبود اعتبارنامه به یک شبیه‌ساز بازمی‌گردد؛ محیط تولید به‌جای گزارش ارسالی که هرگز انجام نشده، خطا می‌دهد.',
        alternatives: 'وضعیت‌های موفقیت خوش‌بینانه',
        tradeoff: 'وضعیت‌های بیشتری برای طراحی، و خطاهایی که کاربر می‌بیند.',
      },
      {
        title: 'تفکیک وظایف در خود محصول، نه فقط روی کاغذ',
        why: 'کسی که فاکتور صادر می‌کند نمی‌تواند به‌تنهایی ابطالی بزرگ را تأیید کند، و نقشی که سقف ابطال را تعیین می‌کند نمی‌تواند ابطال‌ها را تأیید کند — نمی‌تواند سقف خودش را بالا ببرد. منو، محافظ صفحه و بررسی سرور همه از یک ماژول می‌خوانند، پس رابط کاربری و سرور نمی‌توانند درباره‌ی یک مجوز اختلاف داشته باشند.',
        alternatives: 'مجوزهایی که در ماتریس ترسیم و با عادت اجرا می‌شوند',
        tradeoff: 'برخی اقدام‌های روزمره به نفر دوم نیاز دارند.',
      },
      {
        title: 'آنچه ساخته نشد و دلیلش را نام ببر',
        why: 'کیف پول به دلیل نبود منبع داده حذف شد، گفت‌وگوی پشتیبانی به تعویق افتاد، و گزارش‌های مدیریتی کنار گذاشته شدند چون فرمول‌هایشان تأیید نشده است: عدد نادرست از نبود عدد بدتر است. عیب‌یابی و تعمیر کار کارگاه است، نه یک فرایند نرم‌افزاری.',
        alternatives: 'عرضه‌ی داشبوردها با فرمول‌های موقت',
        tradeoff: 'مدیران تا زمانی که کسب‌وکار شاخص‌ها را تعریف نکند، گزارشی نمی‌گیرند.',
      },
    ],
    staffEvidence:
      'صفحه‌ی اصلی پنل کارکنان: چهار شمارنده برای کارهایی که محصول مالک آن‌هاست، و هیچ چیز از صف تیکت‌ها.',
    staffCaption:
      'درون دامنه‌ی پنل کارکنان: درخواست‌های نمایندگی که به پرسش باز خودشان اذعان می‌کنند — فیلدهای متقاضی هنوز تعریف نشده‌اند — و قطعاتی که فقط با دو وضعیت پیگیری می‌شوند، چون سفارش‌دهی بیرون از محصول انجام می‌شود. یک خط که نام تأمین‌کننده را می‌آورد حذف شده است.',
  },
  next: {
    label: 'گام بعد',
    heading: 'بازار برای مشتری وب‌سایت ساخت، نه راه بازگشت',
    body: [
      'مطالعه‌ای روی ۱۰۰ شرکت در بازار گارانتی و تعمیر کالاهای دیجیتال ایران، که ۱۸ مورد از آن‌ها به‌طور عمیق در برابر مسیر تعمیر دوازده‌مرحله‌ای ارزیابی شدند، به یک پرتگاه رسید: پنج مرحله‌ی نخست تا حد زیادی دیجیتال‌اند، و از تحویل دستگاه به بعد تقریباً هیچ چیز دیجیتال نیست. بهترین پلتفرم شش مرحله از دوازده را دیجیتال کرده است؛ میانگین ۴٫۱ است.',
      'بازتعریف این مطالعه استدلالی درباره‌ی مدل داده است، و به همین دلیل به محصول می‌رسد: واحد اطلاعات در این بازار تیکت یا فاکتور نیست، بلکه پرونده‌ی خدمت است — کل عمر یک دستگاه، از وضعیتش هنگام پذیرش تا عیب‌یابی، تأیید هزینه، تعمیر، کنترل کیفیت و بازگشت. نخستین تصمیمی که پیش گذاشت، پیش‌فاکتوری جزءبه‌جزء است که مشتری آنلاین تأییدش می‌کند، چیزی که هیچ شرکتی در این مطالعه ارائه نمی‌داد. محصول عامدانه پشت در کارگاه می‌ایستد؛ استدلال برای فراتر رفتن اکنون مکتوب شده است.',
    ],
    marketCaption:
      'پرتگاه: مراحل یک تا پنج مسیر تعمیر در پلتفرم‌های بررسی‌شده ۳۳–۱۰۰٪ دیجیتال‌اند؛ مراحل شش تا دوازده، ۰–۱۱٪.',
  },
  pages: {
    label: 'همه‌ی صفحه‌ها',
    heading: 'سایت عمومی، صفحه به صفحه',
    body: [
      'همه‌ی صفحه‌های سایت عمومی، ثبت‌شده در ۴ مهر ۱۴۰۵ در عرض ۱۴۴۰ پیکسل و روی گوشی ۳۹۰ پیکسلی: صفحه‌ی اصلی، خدمات، چرا ما، شرایط گارانتی، منشور مشتریان، درباره‌ی ما، درخواست نمایندگی، پرسش‌های متداول، تماس با ما، فرم نظرسنجی، فرم نظرسنجی و ثبت شکایات، و ورود.',
      'صفحه‌ها از یک سیستم پیروی می‌کنند: صفحه‌های سفید با نوارهای سرمه‌ای، همان نوار چهارمرحله‌ای درخواست — ثبت درخواست، بررسی، تعمیر، تحویل — در صفحه‌ی اصلی و «چرا ما»، و روی گوشی یک ستون که ناوبری پشت دکمه‌ی منو قرار می‌گیرد. نام شرکت و خرده‌فروش، نشانی، شماره‌ی تلفن، عکس فروشگاه، نمونه‌ی کارت گارانتی و مدت‌های گارانتی پیش از ثبت تصویر با خاکستری پوشانده شده‌اند؛ هیچ چیز دیگری دست‌کاری نشده است.',
    ],
    figureCaption: 'همه‌ی صفحه‌های سایت عمومی، نمای نخست در عرض دسکتاپ و گوشی؛ هر صفحه را باز کنید تا تمامش را ببینید.',
    names: {
      home: 'صفحه‌ی اصلی',
      services: 'خدمات',
      why: 'چرا ما',
      'warranty-terms': 'شرایط گارانتی',
      'customer-charter': 'منشور مشتریان',
      about: 'درباره‌ی ما',
      dealerships: 'درخواست نمایندگی',
      faq: 'پرسش‌های متداول',
      contact: 'تماس با ما',
      feedback: 'فرم نظرسنجی',
      'feedback-and-complains': 'نظرسنجی و ثبت شکایات',
      login: 'ورود',
    },
    alt: {
      desktop: 'یاراوان روی دسکتاپ — {page}، نمای نخست',
      mobile: 'یاراوان روی موبایل — {page}، نمای نخست',
      desktopFull: 'یاراوان روی دسکتاپ — {page}، کل صفحه',
      mobileFull: 'یاراوان روی موبایل — {page}، کل صفحه',
    },
    masked: '، با جزئیات شناسایی‌کننده‌ی پوشانده‌شده',
  },
  outcomes: {
    heading: 'پلتفرمی در انتظار تصمیم‌ها',
    intro:
      'هیچ شاخص کسب‌وکاری در کار نیست، و نباید هم باشد: پلتفرم روی محیط آزمایشی است، و شاخص‌های توافق‌شده هنوز فرمول یا منبع داده‌ی تأییدشده‌ای ندارند. هدف شش‌هفته‌ای فاز ۱ محقق نشد. سه موردی که یکپارچه‌سازی را متوقف کرده‌اند — دسترسی به سامانه‌ی پشتیبانی موجود، قرارداد همگام‌سازی مشتریان، و تأیید مکتوب امنیت و حریم خصوصی — تصمیم‌اند، نه کار مهندسی، و هر مورد باز دیگر دوباره رده‌بندی شد تا فقط مانع ویژگی خودش باشد.',
    delivered: [
      {
        label: 'یک سایت عمومی',
        context:
          'هشت صفحه، همه فارسی و راست‌به‌چپ، که هر واقعیت تأییدنشده در آن‌ها به شکل موردی باز و صاحب‌دار نمایش داده می‌شود.',
      },
      {
        label: 'یک پنل مشتری',
        context:
          'ساخته‌شده بر هفت اصل: بدون رمز عبور، خصوصی به‌صورت پیش‌فرض، اول موبایل، و حالت‌های خالیِ آموزنده.',
      },
      {
        label: 'یک پنل کارکنان',
        context:
          'فقط کارهایی که محصول مالک آن‌هاست — فاکتورها، کدهای فعال‌سازی، قطعات و بررسی نمایندگی‌ها — با تفکیک وظایفی که در کد اعمال شده است.',
      },
      {
        label: 'ساختی تست‌شده',
        context: '۲۶ کالکشن و ۹۲ فایل تست در پنج سطح، با CI روی هر push.',
      },
    ],
    shipped: [
      'سایت عمومی',
      'پنل مشتری',
      'پنل کارکنان',
      'نشانگر ادعای تأییدنشده',
      'کتابخانه‌ی دارایی‌های برند',
      'لایه‌ی یکپارچه‌سازی',
    ],
  },
  lessons: {
    heading: 'نسخه‌ی صادق یک محصول',
    items: [
      {
        title: 'انتشار شکاف بهتر از پوشاندن آن است',
        body: 'کادر خط‌چین نارنجی کل پروژه در یک کامپوننت است. یک مشکل محتوایی را به فهرستی پیگیری‌شده، صاحب‌دار و شمردنی تبدیل کرد، و سایت را در دورانی که هنوز ناتمام بود صادق نگه داشت.',
      },
      {
        title: 'تفاوت را به زبان بیاور',
        body: '«هنوز همگام‌سازی نشده» و «گارانتی ندارید» در پایگاه داده شبیه هم‌اند و برای مشتری معنایی متضاد دارند. چهار مرحله و شش مرحله هم همین‌طور. نام بردن از این تفاوت روی صفحه به قیمت یک جمله تمام شد و جلوی یک تماس تلفنی را گرفت.',
      },
      {
        title: 'استراتژی برند، مشخصات محصول نیست',
        body: 'راه‌حل استراتژی‌ای که با واقعیت در تناقض است، یک بار برای همیشه انتخاب کردن برنده نیست. قاعده‌ای است که می‌گوید برای کدام نوع پرسش کدام منبع برنده است — و اینکه هیچ ادعای رو به مشتری‌ای بدون هر دو منتشر نمی‌شود.',
      },
      {
        title: 'حفاظ‌ها باید هم‌پای ساخت پیش بروند',
        body: 'راهنمای مخزن مدت‌ها پس از آنکه کدبیس ۲۶ کالکشن و یک استقرار روی محیط آزمایشی داشت، هنوز آن را کدبیسی بدون کد اپلیکیشن توصیف می‌کرد. مستنداتی که بر ساختی با کمک هوش مصنوعی حاکم است باید با سرعت خود ساخت به‌روز نگه داشته شود، وگرنه بر کدبیسی حکم می‌راند که دیگر وجود ندارد.',
      },
    ],
  },
}

const AR: YapCopy = {
  statement:
    'منصة ضمان بُنيت على تشغيلٍ لا يزال قيد التحديد، حيث تُعرض كل حقيقة لم يوافق عليها أحد بوصفها عنصرًا مفتوحًا ظاهرًا له مالك.',
  industry: 'التجزئة · خدمات ما بعد البيع والضمان',
  team: 'المصمم الرئيسي ومدير المنتج، مع فريق الهندسة لدى العميل ومسؤولَيه عن الأعمال وخدمات ما بعد البيع',
  heroCaption:
    'الموقع العام كما كان في 26 سبتمبر 2026: «من تسجيل الطلب حتى التسليم، نحن معك.» اسم الشركة محجوب.',
  snapshot: {
    problem:
      'تجاوزت وعود العلامة المعلنة ما يقدّمه التشغيل، وكان بوسع موقع موجَّه إلى العملاء أن يحوّل أيًّا منها بصمت إلى التزام.',
    role: 'المصمم الرئيسي ومدير المنتج: المتطلبات، ومواصفات الواجهة، ونمط الادعاء غير المؤكد، ولوحتا العملاء والموظفين.',
    result:
      'منصة مختبَرة في بيئة ما قبل الإنتاج — موقع عام ولوحة للعملاء ولوحة للموظفين — تنتظر قرارات الأعمال، لا الأعمال الهندسية. لا مؤشرات أعمال بعد.',
  },
  alt: {
    cover:
      'ياراوان — الصفحة الرئيسية للوحة العميل على سطح المكتب بالفارسية: الضمانات السارية، والطلبات المفتوحة، وزر لتسجيل طلب إصلاح',
    home:
      'ياراوان — الصفحة الرئيسية للموقع العام على سطح المكتب بالفارسية: «من تسجيل الطلب حتى التسليم، نحن معك»، بجانب فنيّ يصلح هاتفًا فوق شريط من أربع خطوات — تسجيل الطلب، الفحص، الإصلاح، التسليم — مع حجب اسم الشركة باللون الرمادي',
    pending:
      'ياراوان — صفحة التواصل بالفارسية: ستة مربعات برتقالية متقطعة الإطار، يسمّي كلٌّ منها معلومة لا تزال بانتظار الموافقة',
    addDevice:
      'ياراوان — إضافة جهاز على الهاتف المحمول بالفارسية: اسم، وحقول اختيارية للعلامة التجارية والطراز والرقم التسلسلي أو IMEI، وخانة اختيار لجهاز به مشكلة أصلًا',
    newRequest:
      'ياراوان — الخطوة الأولى من طلب جديد على الهاتف المحمول بالفارسية: اختيار إصلاح أو ضمان، أو شكوى، أو سؤال عام',
    requests:
      'ياراوان — قائمة الطلبات على الهاتف المحمول بالفارسية: ثلاثة طلبات من أنواع مختلفة، لكلٍّ منها حالته الحالية',
    request:
      'ياراوان — طلب إصلاح على الهاتف المحمول بالفارسية: رمز التتبع، والمشكلة المُبلَّغ عنها، وخط زمني للحالة',
    empty:
      'ياراوان — سجل إصلاحات فارغ على الهاتف المحمول بالفارسية يشرح ما سيظهر فيه ويقدّم زرًّا لعرض الطلبات',
    requestDesktop:
      'ياراوان — طلب في لوحة العميل على سطح المكتب بالفارسية: شريط تقدّم من أربع مراحل، وجملة تشرح المرحلة الحالية، وسجل حالات مؤرَّخ',
    staff:
      'ياراوان — الصفحة الرئيسية للوحة الموظفين بالفارسية: أربعة عدّادات لطلبات الوكالات والفواتير والطلبيات المفتوحة وطلبات قطع الغيار',
    dealership:
      'ياراوان — طلبات الوكالات في لوحة الموظفين بالفارسية: كل طلب مع حالته وزرّي القبول والرفض، ومقدّم الطلب موسوم بأنه لم يُعرَّف بعد',
    parts:
      'ياراوان — قطع الغيار في لوحة الموظفين بالفارسية: بحث، ومرشّحات للمطلوب والمستلَم، وثلاث قطع مع حالاتها',
    market:
      'ياراوان — دراسة السوق: مخطط لاثنتي عشرة مرحلة من رحلة الإصلاح، المراحل الخمس الأولى رقمية في معظمها، والمراحل من السادسة إلى الثانية عشرة بين صفر وأحد عشر بالمئة',
  },
  context: {
    heading: 'هوية خاملة، ومنتج يعمل',
    body: [
      'ياراوان هي علامة الضمان وخدمات ما بعد البيع التابعة لشركة إيرانية لبيع الهواتف المحمولة بالتجزئة. كتبت وكالة خارجية هويتها التجارية في عام 2024 — وثيقة استراتيجية ودليلًا بصريًا — ثم لم يُبنَ عليها شيء.',
      'منذ يوليو 2026 كانت المهمة تحويل تلك الهوية إلى منتج يعمل: موقع فارسي مستقل، ولوحة للعملاء، ولوحة للموظفين. ويحتفظ نظام الدعم القائم بطابور التذاكر وعمليات الإصلاح؛ ويغطي المنتج ما تملكه العلامة نفسها. أما التشغيل الذي يقوم تحته، مرسومًا عمليةً عملية، فله دراسة حالة مستقلة.',
    ],
  },
  problem: {
    heading: 'حيث ينبغي أن تكون الحقيقة',
    body: [
      'وعد الموقع القائم بأكثر مما كان التشغيل يقدّمه. فقد وجد عمل المتطلبات أن ادعاءاته الرئيسية لم تكن حقيقة تشغيلية، وأنه لم تكن هناك قاعدة بيانات حقيقية للضمانات — ولم يكن ترحيل البيانات لازمًا، لأنه لم تكن هناك بيانات.',
      'ووعدت استراتيجية العلامة بأكثر من ذلك — الفروع، والخدمة على مدار الساعة، والتوصيل، والتأمين المضمَّن — بينما كان التشغيل الذي سيتعيّن عليه الوفاء بتلك الوعود لا يزال قيد التحديد. وكان بوسع موقع موجَّه إلى العملاء أن يحوّل أيًّا منها بصمت إلى التزام.',
      'فبقي سؤال تصميم حقيقي واحد: ماذا تضع في الصفحة حيث ينبغي أن تكون الحقيقة، حين لا يستطيع أحد بعدُ تأكيدها؟',
    ],
  },
  ownership: {
    heading: 'قيادة العمل، مع فريق العميل',
    intro:
      'قُدتُ المنتج — المتطلبات، ومواصفات الواجهة، والبناء — بمساهمة فريق الهندسة لدى العميل. وبقيت ملكية الأعمال لدى العميل: فمسؤول الأعمال لديه امتلك القرارات التجارية، ومسؤول خدمات ما بعد البيع امتلك عمليات الدعم التي يعتمد عليها المنتج.',
    own: [
      'المتطلبات والنطاق',
      'نظام العلامة، مستمدًّا من الملفات المصدرية',
      'مواصفات الواجهة',
      'نمط الادعاء غير المؤكد',
      'تصميم لوحتي العملاء والموظفين',
    ],
    coOwn: ['بناء المنصة، مع فريق الهندسة لدى العميل'],
    collaborate: ['القرارات التجارية (مسؤول الأعمال)', 'عمليات الدعم (مسؤول خدمات ما بعد البيع)'],
    note: 'أُنجز البناء بمساعدة الذكاء الاصطناعي، ويقول المستودع ذلك صراحةً: يحدّد دليله ترتيب مصادر الحقيقة وقواعد حل التعارضات التي جعلت ذلك آمنًا في نشاط تجاري كانت معظم حقائقه لا تزال مفتوحة.',
  },
  approach: {
    heading: 'محدَّد كتابةً، ومحكوم سؤالًا بسؤال',
    body: [
      'جاءت المتطلبات من خمسين سؤالًا مباشرًا متعدد الخيارات وُجِّهت إلى مسؤول الأعمال، في مواجهة معيار نجاح واحد: أن يستطيع فريق الهندسة البدء دون أن يعيد طرح أي سؤال أساسي. ثم حُدِّدت الواجهة كتابةً بدلًا من رسمها — 49 ملفًا للمكوّنات — لأن الشاشات كانت الجزء المعروف. وذهب الجهد التصميمي إلى التشغيل الذي يقوم تحتها، وإلى القواعد التي تحدّد ما يجوز للشاشات أن تقوله.',
      'تلك القواعد بروتوكول لحل التعارضات، يقرر أي مصدر يُرجَّح بحسب نوع السؤال، لا مرةً واحدة وللأبد. فوثائق الأعمال هي المرجَّحة في الخدمة والضمان والسعر وSLA والسلوك؛ وملفات العلامة هي المرجَّحة في الشعار واللون والخطوط. ويحتاج أي ادعاء موجَّه إلى العملاء إلى مصدر من العلامة وأساس تشغيلي مؤكد معًا، وإلا فلا يُنشر.',
    ],
    insight:
      'تتناقض استراتيجية العلامة لعام 2024 وواقع عام 2026 باستمرار. ولم يكن الحل قط ترجيح طرف واحد في كل شيء — بل إدارة الفجوة، نوعًا واحدًا من الأسئلة في كل مرة.',
  },
  brand: {
    label: 'العلامة',
    heading: 'مستخلَص، ولم يُعَد رسمه قط',
    body: [
      'استُخلص نظام العلامة بالهندسة العكسية من الملفين المصدريين للوكالة، وكل عبارة فيه يمكن تتبّعها إلى صفحة منهما؛ وحيث يسكت الملفان، تقول الوثائق ذلك بدلًا من سدّ الفجوة. وقُرئ اللون من أوامر التعبئة المتجهية في الشعار بدلًا من أخذ عيّنة من صورة معروضة — وهو ما حسم تباينًا بين درجتين من الأزرق بوصفه تحويلًا بين فضاءات الألوان، لا لونًا ثانيًا للعلامة. أما الأصفر الساطع الذي لا يظهر إلا في إطار بعرض بكسل واحد يشير إلى «أنت هنا» فقد صار إبرازًا وظيفيًا، لا لونًا للعلامة أبدًا.',
      'جاء اقتران الخطوط مع مخاطر ترخيصه مكتوبة سلفًا بدلًا من اكتشافها لاحقًا: فخط العناوين تجاري ويحتاج إلى تأكيد حقوق تضمينه في الويب. وقد وُلِّدت مكتبة الشعارات — 15 ملف SVG، و75 ملف PNG، و75 ملف WebP، و12 أيقونة موقع — من المسارات المتجهية الأصلية، ويتبع تركيب الشعار اتجاه القراءة: الرمز على اليمين في الفارسية، وعلى اليسار في الإنجليزية. ولا يُعكس الشعار أبدًا لتزييف الاتجاه الآخر.',
    ],
  },
  marker: {
    heading: 'مؤشر الادعاء غير المؤكد',
    body: [
      'حيث تحتاج الصفحة إلى معلومة لم يوافق عليها أحد، تعرض مربعًا برتقاليًا متقطع الإطار يسمّي العنصر المفقود ومالكه — كتلة محتوى يضعها المحررون كأي كتلة أخرى. وأحصى مسح في منتصف أغسطس 32 عنصرًا مفتوحًا قائمًا في سبع من الصفحات العامة الثماني، ووجد أن خمسة موضوعات متكررة تستأثر بمعظمها. فإغلاق خمسة أمور يُغلق معظم الموقع.',
      'المؤشر هو جواب المنتج عن سؤال التصميم. فهو يحوّل مشكلة محتوى — صفحات تحتاج إلى معلومات لن يوافق عليها أحد بعد — إلى قائمة يمكن عدّها وإسنادها وإغلاقها، ويُبقي الموقع صادقًا وهو غير مكتمل: فلا شيء مما يقرؤه العميل وعدٌ لم يقطعه الجانب التجاري.',
    ],
    annotations: [
      'يسمّي كل مربع معلومة واحدة تحتاجها الصفحة، بدلًا من جملة واثقة.',
      'يميّز الإطار البرتقالي المتقطع العنصرَ المفتوح عن المحتوى المحيط به.',
      'يحمل كل مربع اسم من يجب أن يوافق عليه؛ والأسماء مخفية هنا.',
      'ستة في هذه الصفحة وحدها: هاتف الدعم، وساعات الهاتف والمحادثة، والبريد الإلكتروني، وعنوان المتجر، والتسجيل القانوني.',
    ],
    pendingCaption: 'صفحة التواصل: المعلومات التي لا تزال تحتاجها، مُدرجة حيث ستوضع.',
  },
  panel: {
    label: 'لوحة العملاء',
    heading: 'سبعة مبادئ في كل صفحة',
    intro:
      'تُغني لوحة العملاء عن المكالمات الهاتفية بمكانٍ يُرجَع إليه. وتغطي ثماني وجهات ما يفعله العميل فعلًا — تسجيل الدخول، ومعرفة موقفه، وتسجيل جهاز، والتحقق من ضمان، وفتح طلب، ومتابعته، والعثور على الإصلاحات والفواتير السابقة، وحفظ عنوان — وعلى الهاتف تستقر الوجهات الأربع الأكثر استخدامًا في الشريط السفلي، على بُعد نقرة واحدة. وتسري سبعة مبادئ على الصفحات الإحدى عشرة كلها:',
    principles: [
      'بلا كلمة مرور: رقم هاتف محمول ورمز برسالة نصية، فلا شيء يُنسى.',
      'الخصوصية افتراضيًا: لا يرى العملاء إلا بياناتهم، ويُفرض ذلك على الخادم لا بالإخفاء في الواجهة.',
      'الهاتف المحمول أولًا: الوجهات الأربع الأكثر استخدامًا في الشريط السفلي.',
      'فارسية بالكامل: النصوص والتقويم والأرقام — مع إبقاء الأرقام التسلسلية وIMEI من اليسار إلى اليمين كي تُقرأ بشكل صحيح.',
      'حالات فارغة تُعلِّم: كل صفحة فارغة تقول لماذا هي فارغة وما الذي ينبغي فعله بعد ذلك.',
      'صريحة لا ملتبسة: تُفصل حالة «لم تتم المزامنة بعد» عن «ليس لديك ضمان» — وهما حالتان مختلفتان تمامًا تعرضهما معظم الأنظمة على أنهما «لم يُعثر على شيء».',
      'سهولة الوصول: للوحة مجموعة اختبارات خاصة بإمكانية الوصول.',
    ],
    outro:
      'وتحظى القرارات الصغيرة بالعناية نفسها. فتحديد خانة «هذا الجهاز به مشكلة» أثناء إضافة جهاز يفتح طلب إصلاح في الوقت نفسه — مهمتان في نموذج واحد. ويُطلب من العميل أن يكتب رمز التتبع داخل الطرد، كي ينضم الجهاز إلى ملفه لحظة وصوله. والملف الذي يخص شخصًا آخر يُرجع «غير موجود»، ولا يُرجع أبدًا رسالة تكشف أنه موجود.',
    flowCaption:
      'من الجهاز إلى التتبّع على الهاتف: أضف جهازًا، واختر نوع الطلب، واطّلع على كل طلب مع حالته، وتابع أحدها على خطه الزمني. بيانات تجريبية؛ والشريط السفلي مقصوص من الصورة.',
    emptyAnnotations: [
      'تقول الصفحة ما تحتويه: أرشيف للقراءة فقط للإصلاحات المغلقة أو الملغاة.',
      'وتقول الحالة الفارغة كيف تمتلئ — يبقى الملف وحالته النهائية هنا بمجرد إغلاق الطلب.',
      'وتقدّم الخطوة التالية بدلًا من طريق مسدود.',
    ],
    emptyCaption: 'حالة فارغة تُعلِّم: سجل الإصلاحات قبل أن يكون هناك أي سجل. بيانات تجريبية.',
  },
  status: {
    label: 'الحالة',
    heading: 'الحالة لا تعود إلى الوراء أبدًا',
    body: [
      'يمرّ طلب الإصلاح أو الضمان بأربع مراحل يراها العميل — مسجَّل، وقيد المراجعة أو الإصلاح، وجاهز للتسليم، وتم التسليم — بينما تُغلق الشكوى أو السؤال بعد المراجعة. ويبقى كل تغيير على الخط الزمني بتاريخه ووقته. وتخطّي مرحلة، أو الرجوع إلى الوراء، أو تغيير حالة نهائية، كلها تُرفض على الخادم، لا تُخفى في الواجهة فحسب، وإرسال النموذج نفسه مرتين لا يُنشئ طلبًا ثانيًا.',
      'وخلف تلك المراحل الأربع، تجري ست مراحل في المقر الرئيسي: الاستقبال والفرز، واستلام الجهاز، والتشخيص، والتحقق من الأهلية للضمان، والإصلاح ومراقبة الجودة، والتسليم. يرى العميل أربعًا، والفرق مقصود — واللوحة تقول ذلك بكلمات واضحة، إذ تخبر العميل بأن المراحل العامة وحدها هي المعروضة وأن التفاصيل الداخلية تبقى بعيدة عن الأنظار.',
    ],
    insight:
      'الحالة المعروضة للعميل لا تكذب أبدًا: فالاستجابة المجهولة من نظام خارجي تبقى معلّقة إلى أن تُطابَق، ولا تُعرض أبدًا على أنها نجاح.',
    requestCaption:
      'طلب على سطح المكتب: الشريط ذو المراحل الأربع، وجملة تشرح المرحلة الحالية، وسجل الحالات المؤرَّخ. بيانات تجريبية.',
  },
  decisions: {
    heading: 'ستة حدود',
    lede: 'يدور معظم التصميم حول ما يرفض المنتج فعله أو قوله.',
    items: [
      {
        title: 'أظهِر الفجوة ومالكها، لا تخمينًا',
        why: 'الموقع الذي يعلن وعدًا غير معتمد يحوّله إلى التزام. وعرض العنصر المفتوح — مع الشخص المدين بالإجابة — يُبقي الموقع صادقًا وهو غير مكتمل، ويحوّل مشكلة المحتوى إلى قائمة يمكن تتبّعها وإغلاقها.',
        alternatives: 'نص نائب معقول، أو إخفاء القسم',
        tradeoff: 'يبدو الموقع غير مكتمل بشكل ظاهر حتى يُجيب الجانب التجاري.',
      },
      {
        title: 'لوحة موظفين ليست لوحة عمليات',
        why: 'يعمل موظفو الدعم أصلًا في نظام الدعم القائم، ونظامٌ ثانٍ من شأنه أن يقسم الحقيقة. تغطي لوحة الموظفين العمليات التي يملكها المنتج فقط — الفواتير، ورموز التفعيل، واستلام قطع الغيار، ومراجعة الوكالات — وتنصّ خريطة موقعها على ألا تتوسع أبدًا لتشمل طوابير التذاكر أو التشخيص أو الإصلاح.',
        alternatives: 'إعادة بناء نظام التذاكر داخل المنتج الجديد',
        tradeoff: 'يعمل الموظفون في نظامين إلى أن يُربط النظامان.',
      },
      {
        title: 'لا يُشترط أي تكامل للإطلاق',
        why: 'حُدِّدت ثلاثة مستويات للربط، والمستوى الأول مستقل: إذا لم يُربط نظام الدعم أبدًا، لا ينكسر شيء. فالربط يضيف إنتاجية لا القدرة على العمل، ولذلك لا تنتظر قيمة المنتج عقد أي طرف آخر.',
        alternatives: 'الإطلاق فقط بعد أن تعمل كل عمليات التكامل',
        tradeoff: 'عمليات تسليم يدوية إلى أن تُوقَّع العقود.',
      },
      {
        title: 'التكاملات تفشل نحو الإغلاق',
        why: 'يقف كل نظام خارجي خلف طبقة بوابة واحدة، مختبَرة في مواجهة سبعة سيناريوهات حدّية — النجاح، وخطأ التحقق، وانتهاء المهلة، والتكرار، وإعادة الإرسال، والخروج عن الترتيب، والحالة المجهولة التي تبقى معلّقة بدلًا من تخمينها. وخارج بيئة الإنتاج، يُحال غياب بيانات الاعتماد إلى محاكٍ؛ أما في الإنتاج فيُطلَق خطأ بدلًا من الإبلاغ عن إرسال لم يحدث قط.',
        alternatives: 'حالات نجاح متفائلة',
        tradeoff: 'حالات أكثر يجب تصميمها، وأخطاء يمكن للمستخدم أن يراها.',
      },
      {
        title: 'الفصل بين المهام في المنتج، لا على الورق فقط',
        why: 'من يُصدر فاتورة لا يستطيع وحده الموافقة على إلغاء كبير، والدور الذي يحدّد سقف الإلغاء لا يستطيع الموافقة على الإلغاءات — فلا يمكنه رفع سقفه بنفسه. وتقرأ القائمة وحارس الصفحة والتحقق على الخادم وحدةً برمجية واحدة، فلا يمكن أن تختلف الواجهة والخادم بشأن صلاحية.',
        alternatives: 'صلاحيات مرسومة في مصفوفة ومطبَّقة بحكم العادة',
        tradeoff: 'بعض الإجراءات الروتينية تحتاج إلى شخص ثانٍ.',
      },
      {
        title: 'سمِّ ما لم يُبنَ، ولماذا',
        why: 'أُزيلت المحفظة لغياب مصدر للبيانات، وأُرجئت محادثة الدعم، وحُجبت تقارير الإدارة لأن معادلاتها غير معتمدة: فالرقم الخاطئ أسوأ من غياب الرقم. أما التشخيص والإصلاح فعمل ورشة، لا عملية برمجية.',
        alternatives: 'إطلاق لوحات بيانات بمعادلات مؤقتة',
        tradeoff: 'لا يحصل المديرون على أي تقرير حتى يحدّد الجانب التجاري المقاييس.',
      },
    ],
    staffEvidence:
      'الصفحة الرئيسية للوحة الموظفين: أربعة عدّادات للعمل الذي يملكه المنتج، ولا شيء من طابور التذاكر.',
    staffCaption:
      'ضمن نطاق لوحة الموظفين: طلبات وكالات تُقرّ بسؤالها المفتوح — فحقول مقدّم الطلب لم تُعرَّف بعد — وقطع غيار تُتتبَّع بحالتين فقط، لأن إصدار الطلبيات يجري خارج المنتج. وقد أُزيل سطر واحد يسمّي المورّد.',
  },
  next: {
    label: 'ما التالي',
    heading: 'بنت السوق للعميل موقعًا إلكترونيًا، لا طريقًا للعودة',
    body: [
      'وجدت دراسة شملت 100 شركة في سوق ضمان السلع الرقمية وإصلاحها في إيران، قُيِّمت 18 منها بعمق في مواجهة رحلة إصلاح من اثنتي عشرة مرحلة، هاويةً حادة: المراحل الخمس الأولى رقمية إلى حد كبير، ومن تسليم الجهاز فصاعدًا لا يكاد يكون أي شيء رقميًا. وأفضل منصة ترقمن ست مراحل من اثنتي عشرة؛ والمتوسط 4.1.',
      'وإعادة الصياغة التي تقترحها الدراسة حجةٌ تتعلق بنموذج البيانات، ولهذا تطال المنتج: فوحدة المعلومات في هذه السوق ليست التذكرة ولا الفاتورة، بل ملف الخدمة — حياة جهاز واحد كاملة، من حالته عند الاستلام مرورًا بالتشخيص، والموافقة على الكلفة، والإصلاح، ومراقبة الجودة، والإعادة. وأول قرار طرحته فاتورة مبدئية مفصَّلة البنود يوافق عليها العميل عبر الإنترنت، وهو ما لم تقدّمه أي شركة في الدراسة. ويتوقف المنتج عند باب الورشة عن قصد؛ أما الحجة للمضي أبعد فصارت الآن مكتوبة.',
    ],
    marketCaption:
      'الهاوية: المراحل من الأولى إلى الخامسة من رحلة الإصلاح رقمية بنسبة 33–100% عبر المنصات المدروسة؛ والمراحل من السادسة إلى الثانية عشرة بنسبة 0–11%.',
  },
  pages: {
    label: 'كل الصفحات',
    heading: 'الموقع العام، صفحةً صفحة',
    body: [
      'كل صفحات الموقع العام، التُقطت في 26 سبتمبر 2026 بعرض 1440 بكسلًا وعلى هاتف بعرض 390 بكسلًا: الصفحة الرئيسية، والخدمات، ولماذا نحن، وشروط الضمان، وميثاق العملاء، ومن نحن، وطلب الوكالة، والأسئلة الشائعة، والتواصل، واستبيان الرضا، ونموذج الآراء والشكاوى، وتسجيل الدخول.',
      'تتبع الصفحات نظامًا واحدًا: صفحات بيضاء تتخللها أشرطة زرقاء داكنة، وشريط الطلب نفسه ذو الخطوات الأربع — تسجيل الطلب، الفحص، الإصلاح، التسليم — في الصفحة الرئيسية وصفحة «لماذا نحن»، وعلى الهاتف عمود واحد يُطوى فيه التنقل خلف زر القائمة. حُجبت باللون الرمادي قبل الالتقاط أسماءُ الشركة وتاجر التجزئة، والعنوان، ورقم الهاتف، وصورة المتجر، ونموذج بطاقة الضمان، ومدد الضمان؛ ولم يُعدَّل شيء آخر.',
    ],
    figureCaption: 'كل صفحات الموقع العام، الشاشة الأولى بعرض سطح المكتب والهاتف؛ افتح أي صفحة لتراها كاملة.',
    names: {
      home: 'الصفحة الرئيسية',
      services: 'الخدمات',
      why: 'لماذا نحن',
      'warranty-terms': 'شروط الضمان',
      'customer-charter': 'ميثاق العملاء',
      about: 'من نحن',
      dealerships: 'طلب الوكالة',
      faq: 'الأسئلة الشائعة',
      contact: 'التواصل',
      feedback: 'استبيان الرضا',
      'feedback-and-complains': 'الآراء والشكاوى',
      login: 'تسجيل الدخول',
    },
    alt: {
      desktop: 'ياراوان على سطح المكتب — {page}، الشاشة الأولى',
      mobile: 'ياراوان على الجوال — {page}، الشاشة الأولى',
      desktopFull: 'ياراوان على سطح المكتب — {page}، الصفحة كاملة',
      mobileFull: 'ياراوان على الجوال — {page}، الصفحة كاملة',
    },
    masked: '، مع حجب التفاصيل التعريفية',
  },
  outcomes: {
    heading: 'منصة تنتظر القرارات',
    intro:
      'لا توجد مؤشرات أعمال، ولا ينبغي أن توجد: فالمنصة في بيئة ما قبل الإنتاج، والمقاييس المتفق عليها ليس لها بعد معادلة معتمدة أو مصدر بيانات. وقد فات هدف المرحلة الأولى البالغ ستة أسابيع. والعناصر الثلاثة التي تعوق التكامل — الوصول إلى نظام الدعم القائم، وعقد لمزامنة بيانات العملاء، وموافقة مكتوبة على الأمن والخصوصية — قرارات لا أعمال هندسية، وأُعيد تصنيف كل عنصر مفتوح آخر بحيث لا يعوق إلا الميزة الخاصة به.',
    delivered: [
      {
        label: 'موقع عام',
        context:
          'ثماني صفحات، كلها بالفارسية ومن اليمين إلى اليسار، وكل معلومة غير معتمدة فيها معروضة بوصفها عنصرًا مفتوحًا له مالك.',
      },
      {
        label: 'لوحة للعملاء',
        context:
          'مبنية على سبعة مبادئ: بلا كلمة مرور، والخصوصية افتراضيًا، والهاتف المحمول أولًا، وحالات فارغة تُعلِّم.',
      },
      {
        label: 'لوحة للموظفين',
        context:
          'العمل الذي يملكه المنتج فقط — الفواتير، ورموز التفعيل، وقطع الغيار، ومراجعة الوكالات — مع فرض الفصل بين المهام في الشيفرة.',
      },
      {
        label: 'بناء مختبَر',
        context: '26 مجموعة، و92 ملف اختبار على خمسة مستويات، وتشغيل CI مع كل دفع إلى المستودع.',
      },
    ],
    shipped: [
      'الموقع العام',
      'لوحة العملاء',
      'لوحة الموظفين',
      'مؤشر الادعاء غير المؤكد',
      'مكتبة أصول العلامة',
      'طبقة التكامل',
    ],
  },
  lessons: {
    heading: 'النسخة الصادقة من المنتج',
    items: [
      {
        title: 'إعلان الفجوة خير من التستّر عليها',
        body: 'المربع البرتقالي المتقطع هو المشروع كله في مكوّن واحد. فقد حوّل مشكلة محتوى إلى قائمة متتبَّعة يمكن عدّها ولكل بند فيها مالك، وجعل الموقع صادقًا وهو لا يزال غير مكتمل.',
      },
      {
        title: 'صرِّح بالفرق',
        body: 'تبدو حالتا «لم تتم المزامنة بعد» و«ليس لديك ضمان» متشابهتين في قاعدة البيانات، لكنهما تعنيان للعميل أمرين متناقضين. وكذلك المراحل الأربع والست. وتسمية الفرق على الشاشة كلّفت جملة ووفّرت مكالمة هاتفية.',
      },
      {
        title: 'استراتيجية العلامة ليست مواصفات منتج',
        body: 'علاج الاستراتيجية التي تناقض الواقع ليس ترجيح طرف مرة واحدة. بل قاعدة تقول أي مصدر يُرجَّح في أي نوع من الأسئلة — وأن أي ادعاء موجَّه إلى العملاء لا يُنشر من دون الاثنين معًا.',
      },
      {
        title: 'يجب أن تواكب الضوابطُ وتيرةَ البناء',
        body: 'ظلّ دليل المستودع يصف قاعدة شيفرة بلا أي شيفرة مصدرية للتطبيق، بعد وقت طويل من احتوائها على 26 مجموعة ونشرٍ في بيئة ما قبل الإنتاج. والوثائق التي تحكم بناءً بمساعدة الذكاء الاصطناعي يجب أن تُحدَّث بسرعة البناء نفسها، وإلا صارت تحكم قاعدة شيفرة لم تعد موجودة.',
      },
    ],
  },
}

const ES: YapCopy = {
  statement:
    'Una plataforma de garantías sobre una operación aún en definición, donde cada dato no aprobado se publica como un elemento abierto, visible y con responsable.',
  industry: 'Retail · posventa y garantías',
  team: 'Diseñador principal y PM, con el equipo de ingeniería del cliente y sus responsables de negocio y de posventa',
  heroCaption:
    'El sitio público tal como estaba el 26 de septiembre de 2026: «Desde la solicitud hasta la entrega, estamos contigo». El nombre de la empresa está enmascarado.',
  snapshot: {
    problem:
      'Las promesas públicas de la marca iban por delante de la operación, y un sitio de cara al cliente podía convertir discretamente cualquiera de ellas en un compromiso.',
    role: 'Diseñador principal y PM: requisitos, la especificación de la interfaz, el patrón de afirmación sin confirmar y los paneles de clientes y del personal.',
    result:
      'Una plataforma probada en preproducción — sitio público, panel de clientes y panel del personal — a la espera de decisiones de negocio, no de ingeniería. Aún no hay métricas de negocio.',
  },
  alt: {
    cover:
      'Yaravan — la página de inicio del panel de clientes en escritorio, en persa: garantías activas, solicitudes abiertas y un botón para registrar una reparación',
    home:
      'Yaravan — la página de inicio del sitio público en escritorio, en persa: «Desde la solicitud hasta la entrega, estamos contigo», junto a un técnico que repara un teléfono sobre una franja de cuatro pasos —solicitud, revisión, reparación, entrega—, con el nombre de la empresa enmascarado en gris',
    pending:
      'Yaravan — la página de contacto en persa: seis recuadros naranjas discontinuos, cada uno con un dato que sigue pendiente de aprobación',
    addDevice:
      'Yaravan — añadir un dispositivo en móvil, en persa: un nombre, y como opcionales la marca, el modelo y el número de serie o IMEI, y una casilla para un dispositivo que ya tiene un problema',
    newRequest:
      'Yaravan — el primer paso de una nueva solicitud en móvil, en persa: elegir reparación o garantía, reclamación o consulta general',
    requests:
      'Yaravan — la lista de solicitudes en móvil, en persa: tres solicitudes de distintos tipos, cada una con su estado actual',
    request:
      'Yaravan — una solicitud de reparación en móvil, en persa: el código de seguimiento, el problema declarado y una cronología de estados',
    empty:
      'Yaravan — un historial de reparaciones vacío en móvil, en persa, que explica lo que aparecerá allí y ofrece un botón para ver las solicitudes',
    requestDesktop:
      'Yaravan — una solicitud en el panel de clientes en escritorio, en persa: una barra de progreso de cuatro etapas, una frase que explica la etapa actual y un historial de estados con fechas',
    staff:
      'Yaravan — la página de inicio del panel del personal en persa: cuatro contadores para solicitudes de concesionarios, facturas, pedidos abiertos y solicitudes de piezas',
    dealership:
      'Yaravan — las solicitudes de concesionario en el panel del personal, en persa: cada solicitud con su estado y botones para aprobar o rechazar, con el solicitante marcado como aún no definido',
    parts:
      'Yaravan — las piezas en el panel del personal, en persa: un buscador, filtros de solicitadas y recibidas, y tres piezas con su estado',
    market:
      'Yaravan, estudio de mercado — un gráfico de las doce etapas del recorrido de reparación: las cinco primeras, mayoritariamente digitales; de la sexta a la duodécima, entre el cero y el once por ciento',
  },
  context: {
    heading: 'Una identidad dormida, un producto en funcionamiento',
    body: [
      'Yaravan es la marca de garantías y posventa de un minorista iraní de teléfonos móviles. Una agencia externa redactó su identidad de marca en 2024 — un documento de estrategia y una guía visual — y después no se construyó nada sobre ella.',
      'Desde julio de 2026, el encargo fue convertir esa identidad en un producto en funcionamiento: un sitio web independiente en persa, un panel de clientes y un panel del personal. El sistema de soporte existente conserva la cola de tickets y la operación de reparación; el producto cubre lo que es de la propia marca. La operación que hay debajo, dibujada proceso a proceso, tiene su propio caso de estudio.',
    ],
  },
  problem: {
    heading: 'Donde debería haber un dato',
    body: [
      'El sitio existente prometía más de lo que la operación cumplía. El trabajo de requisitos descubrió que sus afirmaciones principales no reflejaban la realidad operativa y que no existía una base de datos real de garantías — no hacía falta migrar datos, porque no había datos.',
      'La estrategia de marca prometía todavía más — sucursales, servicio ininterrumpido, entrega a domicilio, seguro incluido — y la operación que tendría que cumplir esas promesas aún se estaba definiendo. Un sitio de cara al cliente podía convertir discretamente cualquiera de ellas en un compromiso.',
      'Eso dejaba una sola pregunta de diseño real: ¿qué se pone en la página donde debería haber un dato, cuando nadie puede confirmarlo todavía?',
    ],
  },
  ownership: {
    heading: 'Liderar el trabajo, con el equipo del cliente',
    intro:
      'Dirigí el producto — los requisitos, la especificación de la interfaz y el desarrollo — con la contribución del equipo de ingeniería del cliente. La responsabilidad de negocio siguió en manos del cliente: su responsable de negocio asumía las decisiones comerciales y su responsable de posventa, la operación de soporte de la que depende el producto.',
    own: [
      'Requisitos y alcance',
      'Sistema de marca, derivado de los archivos de origen',
      'Especificación de la interfaz',
      'El patrón de afirmación sin confirmar',
      'Diseño de los paneles de clientes y del personal',
    ],
    coOwn: ['El desarrollo de la plataforma, con el equipo de ingeniería del cliente'],
    collaborate: [
      'Decisiones comerciales (el responsable de negocio)',
      'La operación de soporte (el responsable de posventa)',
    ],
    note: 'El desarrollo contó con asistencia de IA, y el repositorio lo dice abiertamente: su guía fija el orden de las fuentes de verdad y las reglas de conflicto que lo hicieron seguro en un negocio donde la mayoría de los datos seguían abiertos.',
  },
  approach: {
    heading: 'Especificado por escrito, gobernado pregunta a pregunta',
    body: [
      'Los requisitos salieron de cincuenta preguntas directas de opción múltiple al responsable de negocio, con una única prueba de éxito: ingeniería puede empezar sin volver a preguntar nada fundamental. Después, la interfaz se especificó por escrito en lugar de dibujarse — 49 archivos de componentes — porque las pantallas eran la parte conocida. El esfuerzo de diseño se dedicó a la operación subyacente y a las reglas sobre lo que pueden decir las pantallas.',
      'Esas reglas forman un protocolo de conflictos, que decide qué fuente prevalece según el tipo de pregunta y no de una vez para siempre. Los documentos de negocio prevalecen en servicio, garantía, precio, SLA y comportamiento; los archivos de marca, en logotipo, color y tipografía. Una afirmación de cara al cliente necesita a la vez una fuente de marca y una base operativa confirmada, o no se publica.',
    ],
    insight:
      'La estrategia de marca de 2024 y la realidad de 2026 se contradicen constantemente. La solución nunca fue elegir un ganador global — fue gobernar la brecha, un tipo de pregunta cada vez.',
  },
  brand: {
    label: 'Marca',
    heading: 'Derivada, nunca redibujada',
    body: [
      'El sistema de marca se reconstruyó por ingeniería inversa a partir de los dos archivos de origen de la agencia, y cada afirmación que contiene puede rastrearse hasta una de sus páginas; donde los archivos callan, la documentación lo dice en lugar de rellenar el hueco. El color se leyó de los operadores de relleno vectorial del logotipo, no se muestreó de una imagen renderizada — lo que resolvió una discrepancia entre dos azules como una conversión de espacio de color, no como un segundo color de marca. Un amarillo brillante que solo aparece como un contorno de un píxel de «estás aquí» se convirtió en un resaltado funcional, nunca en un color de marca.',
      'La combinación tipográfica llegó con su riesgo de licencia puesto por escrito en lugar de descubrirse después: la tipografía de titulares es comercial y necesita que se confirmen los derechos de incrustación web. La biblioteca de logotipos — 15 SVG, 75 PNG, 75 WebP y 12 favicons — se generó a partir de los trazados vectoriales originales, y la composición del logotipo sigue la dirección de lectura: el símbolo a la derecha en persa y a la izquierda en inglés. Un logotipo nunca se refleja para simular la otra dirección.',
    ],
  },
  marker: {
    heading: 'El marcador de afirmación sin confirmar',
    body: [
      'Donde una página necesita un dato que nadie ha aprobado, muestra un recuadro naranja discontinuo con el elemento que falta y su responsable — un bloque de contenido que los editores colocan como cualquier otro. Una revisión a mediados de agosto contó 32 elementos abiertos en vivo en siete de las ocho páginas públicas, y encontró que cinco temas recurrentes explican la mayoría. Cerrar cinco cosas cierra casi todo el sitio.',
      'El marcador es la respuesta del producto a la pregunta de diseño. Convierte un problema de contenido — páginas que necesitan datos que nadie aprueba todavía — en una lista que puede contarse, asignarse y cerrarse, y mantiene honesto el sitio mientras está incompleto: nada de lo que lee un cliente es una promesa que el negocio no haya hecho.',
    ],
    annotations: [
      'Cada recuadro nombra un dato que la página necesita, en lugar de una frase segura de sí misma.',
      'El marco naranja discontinuo separa un elemento abierto del contenido que lo rodea.',
      'Cada recuadro lleva el nombre de quien debe aprobarlo; aquí los nombres están ocultos.',
      'Seis solo en esta página: el teléfono de soporte, el horario de teléfono y chat, el correo electrónico, la dirección de la tienda y el registro legal.',
    ],
    pendingCaption: 'La página de contacto: los datos que aún necesita, listados donde irán.',
  },
  panel: {
    label: 'Panel de clientes',
    heading: 'Siete principios en cada página',
    intro:
      'El panel de clientes sustituye las llamadas telefónicas por un lugar donde consultar. Ocho destinos cubren lo que un cliente hace realmente — iniciar sesión, ver en qué punto está, registrar un dispositivo, comprobar una garantía, abrir una solicitud, seguirla, encontrar reparaciones y facturas anteriores, guardar una dirección — y en el teléfono los cuatro más usados están en la barra inferior, a un toque. Siete principios se cumplen en las once páginas:',
    principles: [
      'Sin contraseña: un número de móvil y un código por SMS, así que no hay nada que olvidar.',
      'Privado por defecto: los clientes solo ven sus propios datos, algo que se impone en el servidor y no se limita a ocultarse en la interfaz.',
      'Primero el móvil: los cuatro destinos más usados, en la barra inferior.',
      'Totalmente en persa: texto, calendario y dígitos — con los números de serie y el IMEI de izquierda a derecha para que se lean correctamente.',
      'Estados vacíos que enseñan: cada página vacía dice por qué está vacía y qué hacer a continuación.',
      'Explícito, no ambiguo: «aún no sincronizado» se mantiene separado de «no tienes ninguna garantía» — dos estados completamente distintos que la mayoría de los sistemas muestran como «no se encontró nada».',
      'Accesible: el panel tiene su propio conjunto de pruebas de accesibilidad.',
    ],
    outro:
      'Las decisiones pequeñas reciben el mismo cuidado. Marcar «este dispositivo tiene un problema» al añadir un dispositivo abre a la vez una solicitud de reparación — dos tareas en un solo formulario. Se indica al cliente que escriba el código de seguimiento dentro del paquete, para que el dispositivo se una a su caso en cuanto llega. Y un caso que pertenece a otra persona devuelve «no encontrado», nunca un mensaje que revele que existe.',
    flowCaption:
      'Del dispositivo al seguimiento en un teléfono: añadir un dispositivo, elegir un tipo de solicitud, ver todas las solicitudes con su estado y seguir una en su cronología. Datos de demostración; la barra inferior está recortada.',
    emptyAnnotations: [
      'La página dice lo que contiene: un archivo de solo lectura de reparaciones cerradas o canceladas.',
      'El estado vacío explica cómo se llena — un caso y su estado final quedan aquí cuando se cierra una solicitud.',
      'Y ofrece el siguiente paso en lugar de un callejón sin salida.',
    ],
    emptyCaption:
      'Un estado vacío que enseña: el historial de reparaciones antes de que haya historial. Datos de demostración.',
  },
  status: {
    label: 'Estado',
    heading: 'El estado nunca retrocede',
    body: [
      'Una solicitud de reparación o de garantía avanza por cuatro etapas que el cliente puede ver — registrada, en revisión o en reparación, lista para entrega, entregada — mientras que una reclamación o una consulta se cierra tras su revisión. Cada cambio queda en la cronología con su fecha y hora. Saltarse una etapa, retroceder o cambiar un estado finalizado se rechaza en el servidor, no solo se oculta en la interfaz, y enviar dos veces el mismo formulario no crea una segunda solicitud.',
      'Detrás de esas cuatro etapas, en la sede central ocurren seis: admisión y clasificación, recepción del dispositivo, diagnóstico, comprobación de la cobertura de la garantía, reparación y control de calidad, y entrega. El cliente ve cuatro, y la diferencia es deliberada — el panel lo dice con palabras sencillas: le indica al cliente que solo se muestran las etapas generales y que el detalle interno queda fuera de la vista.',
    ],
    insight:
      'El estado que ve el cliente nunca miente: una respuesta desconocida de un sistema externo queda pendiente hasta que se concilia, y nunca se muestra como éxito.',
    requestCaption:
      'Una solicitud en escritorio: la barra de cuatro etapas, una frase que explica la etapa actual y el historial de estados con fechas. Datos de demostración.',
  },
  decisions: {
    heading: 'Seis límites',
    lede: 'La mayor parte del diseño trata de lo que el producto se niega a hacer o a decir.',
    items: [
      {
        title: 'Mostrar el hueco y su responsable, no una suposición',
        why: 'Un sitio que enuncia una promesa no aprobada la convierte en un compromiso. Mostrar el elemento abierto — con la persona que debe la respuesta — mantiene honesto el sitio mientras está incompleto, y convierte un problema de contenido en una lista que se puede seguir y cerrar.',
        alternatives: 'Textos provisionales verosímiles, u ocultar la sección',
        tradeoff: 'El sitio parece visiblemente inacabado hasta que el negocio responde.',
      },
      {
        title: 'Un panel del personal que no es un panel de operaciones',
        why: 'Los agentes ya trabajan en el sistema de soporte existente, y un segundo sistema dividiría la verdad. El panel del personal cubre solo los procesos que son del producto — facturas, códigos de activación, recepción de piezas, revisión de concesionarios — y su mapa del sitio establece que nunca debe crecer hacia colas de tickets, diagnóstico o reparación.',
        alternatives: 'Reconstruir la gestión de tickets dentro del nuevo producto',
        tradeoff: 'El personal trabaja en dos sistemas hasta que ambos se conecten.',
      },
      {
        title: 'Ninguna integración es requisito para el lanzamiento',
        why: 'Se definieron tres niveles de conexión, y el nivel uno es independiente: si el sistema de soporte nunca se conecta, nada se rompe. La conexión añade productividad, no la capacidad de trabajar, así que el valor del producto no espera al contrato de nadie más.',
        alternatives: 'Lanzar solo cuando todas las integraciones estén activas',
        tradeoff: 'Traspasos manuales hasta que se firmen los contratos.',
      },
      {
        title: 'Las integraciones fallan de forma cerrada',
        why: 'Cada sistema externo está detrás de una sola capa de pasarela, probada frente a siete escenarios límite — éxito, error de validación, tiempo de espera agotado, duplicado, repetición, fuera de orden y estado desconocido, que queda pendiente en lugar de suponerse. Fuera de producción, una credencial ausente recurre a un simulador; en producción se lanza un error en lugar de informar de un envío que nunca ocurrió.',
        alternatives: 'Estados de éxito optimistas',
        tradeoff: 'Más estados que diseñar, y errores que el usuario puede ver.',
      },
      {
        title: 'Segregación de funciones en el producto, no solo en el papel',
        why: 'Quien emite una factura no puede aprobar por sí solo una anulación grande, y el rol que fija el límite de anulación no puede aprobar anulaciones — no puede elevar su propio límite. El menú, la protección de página y la comprobación en el servidor leen un mismo módulo, así que la interfaz y el servidor no pueden discrepar sobre un permiso.',
        alternatives: 'Permisos dibujados en una matriz y aplicados por costumbre',
        tradeoff: 'Algunas acciones rutinarias necesitan una segunda persona.',
      },
      {
        title: 'Nombrar lo que no se construyó, y por qué',
        why: 'El monedero se eliminó por falta de una fuente de datos, el chat de soporte se aplazó y los informes de gestión se retuvieron porque sus fórmulas no están aprobadas: un número erróneo es peor que ningún número. El diagnóstico y la reparación son trabajo de taller, no un proceso de software.',
        alternatives: 'Entregar paneles con fórmulas provisionales',
        tradeoff:
          'Los responsables no reciben ningún informe hasta que el negocio defina las medidas.',
      },
    ],
    staffEvidence:
      'La página de inicio del panel del personal: cuatro contadores para el trabajo que es del producto, y nada de la cola de tickets.',
    staffCaption:
      'Dentro del alcance del panel del personal: solicitudes de concesionario que reconocen su propia pregunta abierta — los campos del solicitante aún no están definidos — y piezas con solo dos estados, porque los pedidos se hacen fuera del producto. Se ha eliminado una línea que nombra al proveedor.',
  },
  next: {
    label: 'Lo que viene',
    heading: 'El mercado le construyó al cliente un sitio web, no un camino de vuelta',
    body: [
      'Un estudio de 100 empresas del mercado iraní de garantías y reparación de productos digitales, 18 de ellas evaluadas en profundidad frente a un recorrido de reparación de doce etapas, encontró un precipicio: las cinco primeras etapas son en gran parte digitales, y a partir de la entrega del dispositivo casi nada lo es. La mejor plataforma digitaliza seis etapas de doce; la media es 4,1.',
      'El replanteamiento del estudio es un argumento de modelo de datos, y por eso llega hasta el producto: la unidad de información en este mercado no es el ticket ni la factura, sino el caso de servicio — toda la vida de un dispositivo, desde su estado en la recepción, pasando por el diagnóstico, la aprobación del coste, la reparación y el control de calidad, hasta la devolución. La primera decisión que propuso es una prefactura desglosada que el cliente aprueba en línea, algo que ninguna empresa del estudio ofrecía. El producto se detiene a propósito en la puerta del taller; los argumentos para ir más allá ya están por escrito.',
    ],
    marketCaption:
      'El precipicio: las etapas uno a cinco del recorrido de reparación son digitales en un 33–100% en las plataformas estudiadas; las etapas seis a doce, en un 0–11%.',
  },
  pages: {
    label: 'Todas las páginas',
    heading: 'El sitio público, página a página',
    body: [
      'Todas las páginas del sitio público, capturadas el 26 de septiembre de 2026 a 1440 píxeles de ancho y en un teléfono de 390 píxeles: la página de inicio, servicios, por qué nosotros, las condiciones de garantía, la carta de clientes, quiénes somos, la solicitud de concesión, las preguntas frecuentes, contacto, la encuesta de satisfacción, el formulario de opiniones y reclamaciones, y el acceso.',
      'Las páginas comparten un sistema: páginas blancas interrumpidas por franjas azul oscuro, la misma franja de solicitud de cuatro pasos —solicitud, revisión, reparación, entrega— en la página de inicio y en «Por qué nosotros», y en el teléfono una sola columna con la navegación tras un botón de menú. Los nombres de la empresa y del minorista, la dirección, el teléfono, la fotografía de la tienda, la tarjeta de garantía de muestra y la duración de las garantías se enmascaran en gris antes de la captura; nada más se retoca.',
    ],
    figureCaption: 'Todas las páginas del sitio público, primera pantalla en escritorio y en teléfono; abra cualquiera para verla completa.',
    names: {
      home: 'Inicio',
      services: 'Servicios',
      why: 'Por qué nosotros',
      'warranty-terms': 'Condiciones de garantía',
      'customer-charter': 'Carta de clientes',
      about: 'Quiénes somos',
      dealerships: 'Solicitud de concesión',
      faq: 'Preguntas frecuentes',
      contact: 'Contacto',
      feedback: 'Encuesta de satisfacción',
      'feedback-and-complains': 'Opiniones y reclamaciones',
      login: 'Acceso',
    },
    alt: {
      desktop: 'Yaravan en escritorio — {page}, la primera pantalla',
      mobile: 'Yaravan en móvil — {page}, la primera pantalla',
      desktopFull: 'Yaravan en escritorio — {page}, la página completa',
      mobileFull: 'Yaravan en móvil — {page}, la página completa',
    },
    masked: ', con los datos identificativos enmascarados',
  },
  outcomes: {
    heading: 'Una plataforma a la espera de decisiones',
    intro:
      'No hay métricas de negocio, y no debería haberlas: la plataforma está en un entorno de preproducción, y las medidas acordadas aún no tienen fórmula aprobada ni fuente de datos. El objetivo de seis semanas de la Fase 1 no se cumplió. Los tres elementos que bloquean la integración — el acceso al sistema de soporte existente, un contrato de sincronización de clientes y una aprobación escrita de seguridad y privacidad — son decisiones, no ingeniería, y todos los demás elementos abiertos se reclasificaron para que solo bloqueen su propia funcionalidad.',
    delivered: [
      {
        label: 'Un sitio público',
        context:
          'Ocho páginas, todas en persa y de derecha a izquierda, con cada dato no aprobado mostrado como un elemento abierto con responsable.',
      },
      {
        label: 'Un panel de clientes',
        context:
          'Construido sobre siete principios: sin contraseña, privado por defecto, primero el móvil y estados vacíos que enseñan.',
      },
      {
        label: 'Un panel del personal',
        context:
          'Solo el trabajo que es del producto — facturas, códigos de activación, piezas y revisión de concesionarios — con la segregación de funciones aplicada en el código.',
      },
      {
        label: 'Un desarrollo probado',
        context: '26 colecciones y 92 archivos de pruebas en cinco niveles, con CI en cada push.',
      },
    ],
    shipped: [
      'Sitio público',
      'Panel de clientes',
      'Panel del personal',
      'Marcador de afirmación sin confirmar',
      'Biblioteca de recursos de marca',
      'Capa de integración',
    ],
  },
  lessons: {
    heading: 'La versión honesta de un producto',
    items: [
      {
        title: 'Publicar el hueco es mejor que disimularlo',
        body: 'El recuadro naranja discontinuo es todo el proyecto en un solo componente. Convirtió un problema de contenido en una lista con seguimiento, con responsables y contable, e hizo que el sitio fuera honesto mientras aún estaba incompleto.',
      },
      {
        title: 'Decir la diferencia en voz alta',
        body: '«Aún no sincronizado» y «no tienes ninguna garantía» se parecen en una base de datos y significan cosas opuestas para un cliente. Lo mismo ocurre con cuatro etapas y seis. Nombrar la diferencia en la pantalla costó una frase y ahorró una llamada.',
      },
      {
        title: 'Una estrategia de marca no es una especificación de producto',
        body: 'La solución para una estrategia que contradice la realidad no es elegir un ganador una sola vez. Es una regla que dice qué fuente prevalece para cada tipo de pregunta — y que ninguna afirmación de cara al cliente se publica sin ambas.',
      },
      {
        title: 'Las salvaguardas deben seguir el ritmo del desarrollo',
        body: 'La guía del repositorio seguía describiendo una base de código sin código fuente de la aplicación mucho después de que tuviera 26 colecciones y un despliegue en preproducción. La documentación que gobierna un desarrollo asistido por IA tiene que mantenerse a la velocidad del desarrollo, o empieza a gobernar una base de código que ya no existe.',
      },
    ],
  },
}

const DE: YapCopy = {
  statement:
    'Eine Garantieplattform auf einem Betrieb, der noch definiert wird: Jede nicht freigegebene Tatsache erscheint als sichtbarer offener Punkt mit Verantwortlichem.',
  industry: 'Einzelhandel · Kundendienst und Garantie',
  team: 'Lead Designer und PM, mit dem Engineering-Team des Kunden und seinen Verantwortlichen für Geschäft und Kundendienst',
  heroCaption:
    'Die öffentliche Website am 26. September 2026: „Von der Anfrage bis zur Übergabe sind wir an Ihrer Seite.“ Der Firmenname ist abgedeckt.',
  snapshot: {
    problem:
      'Die öffentlichen Versprechen der Marke gingen über den Betrieb hinaus, und eine Website für Kunden konnte jedes davon stillschweigend zu einer Verpflichtung machen.',
    role: 'Lead Designer und PM: Anforderungen, die Interface-Spezifikation, das Muster für unbestätigte Aussagen sowie Kunden- und Mitarbeiterbereich.',
    result:
      'Eine getestete Plattform auf Staging — öffentliche Website, Kundenbereich und Mitarbeiterbereich —, die auf geschäftliche Entscheidungen wartet, nicht auf Engineering. Noch keine Geschäftskennzahlen.',
  },
  alt: {
    cover:
      'Yaravan — die Startseite des Kundenbereichs auf dem Desktop, auf Persisch: aktive Garantien, offene Anfragen und eine Schaltfläche, um eine Reparatur anzumelden',
    home:
      'Yaravan — die Startseite der öffentlichen Website auf dem Desktop, auf Persisch: „Von der Anfrage bis zur Übergabe sind wir an Ihrer Seite“, neben einem Techniker, der ein Smartphone repariert, über einer Leiste mit vier Schritten — Anfrage, Prüfung, Reparatur, Übergabe —, der Firmenname grau abgedeckt',
    pending:
      'Yaravan — die Kontaktseite auf Persisch: sechs gestrichelte orangefarbene Kästen, jeder benennt eine Tatsache, die noch auf Freigabe wartet',
    addDevice:
      'Yaravan — ein Gerät auf dem Smartphone hinzufügen, auf Persisch: ein Name, optional Marke, Modell und Seriennummer oder IMEI sowie ein Kontrollkästchen für ein Gerät, das bereits ein Problem hat',
    newRequest:
      'Yaravan — Schritt eins einer neuen Anfrage auf dem Smartphone, auf Persisch: Reparatur oder Garantie, Beschwerde oder allgemeine Frage wählen',
    requests:
      'Yaravan — die Anfragenliste auf dem Smartphone, auf Persisch: drei Anfragen unterschiedlicher Art, jede mit ihrem aktuellen Status',
    request:
      'Yaravan — eine Reparaturanfrage auf dem Smartphone, auf Persisch: der Tracking-Code, das gemeldete Problem und eine Status-Zeitleiste',
    empty:
      'Yaravan — ein leerer Reparaturverlauf auf dem Smartphone, auf Persisch, der erklärt, was dort erscheinen wird, und eine Schaltfläche zum Anzeigen der Anfragen anbietet',
    requestDesktop:
      'Yaravan — eine Anfrage im Kundenbereich auf dem Desktop, auf Persisch: ein Fortschrittsbalken mit vier Stufen, ein Satz, der die aktuelle Stufe erklärt, und ein datierter Statusverlauf',
    staff:
      'Yaravan — die Startseite des Mitarbeiterbereichs auf Persisch: vier Zähler für Händleranfragen, Rechnungen, offene Aufträge und Ersatzteilanfragen',
    dealership:
      'Yaravan — Händlerbewerbungen im Mitarbeiterbereich, auf Persisch: jede Anfrage mit ihrem Status und Schaltflächen zum Genehmigen oder Ablehnen, der Antragsteller als noch nicht definiert markiert',
    parts:
      'Yaravan — Ersatzteile im Mitarbeiterbereich, auf Persisch: eine Suche, Filter für angefordert und erhalten sowie drei Ersatzteile mit ihrem Status',
    market:
      'Yaravan-Marktstudie — ein Diagramm mit zwölf Stationen der Reparatur-Journey: die ersten fünf überwiegend digital, die Stationen sechs bis zwölf zwischen null und elf Prozent',
  },
  context: {
    heading: 'Eine ruhende Identität, ein funktionierendes Produkt',
    body: [
      'Yaravan ist die Garantie- und Kundendienstmarke eines iranischen Mobiltelefonhändlers. Eine externe Agentur schrieb 2024 ihre Markenidentität — ein Strategiedeck und einen visuellen Leitfaden —, und dann wurde nichts darauf aufgebaut.',
      'Ab Juli 2026 bestand die Aufgabe darin, aus dieser Identität ein funktionierendes Produkt zu machen: eine eigenständige persische Website, einen Kundenbereich und einen Mitarbeiterbereich. Das bestehende Supportsystem behält die Ticket-Warteschlange und den Reparaturbetrieb; das Produkt deckt ab, was die Marke selbst verantwortet. Der Betrieb darunter, Prozess für Prozess gezeichnet, ist eine eigene Fallstudie.',
    ],
  },
  problem: {
    heading: 'Wo eine Tatsache stehen sollte',
    body: [
      'Die bestehende Website versprach mehr, als der Betrieb leistete. Die Anforderungsarbeit ergab, dass ihre zentralen Aussagen nicht der betrieblichen Wirklichkeit entsprachen und dass es keine echte Garantiedatenbank gab — eine Datenmigration war unnötig, weil es keine Daten gab.',
      'Die Markenstrategie versprach noch mehr — Filialen, Service rund um die Uhr, Lieferung, eine gebündelte Versicherung —, und der Betrieb, der diese Versprechen würde halten müssen, wurde erst noch definiert. Eine Website für Kunden konnte jedes davon stillschweigend zu einer Verpflichtung machen.',
      'Damit blieb eine echte Designfrage: Was gehört auf die Seite, wo eine Tatsache stehen sollte, wenn noch niemand diese Tatsache bestätigen kann?',
    ],
  },
  ownership: {
    heading: 'Die Arbeit leiten, mit dem Team des Kunden',
    intro:
      'Ich leitete das Produkt — Anforderungen, die Interface-Spezifikation und die Umsetzung —, mit Beiträgen des Engineering-Teams des Kunden. Die geschäftliche Verantwortung blieb beim Kunden: Sein Verantwortlicher für das Geschäft traf die kaufmännischen Entscheidungen, und sein Verantwortlicher für den Kundendienst trug den Supportbetrieb, von dem das Produkt abhängt.',
    own: [
      'Anforderungen und Umfang',
      'Markensystem, aus den Quelldateien abgeleitet',
      'Interface-Spezifikation',
      'Das Muster für unbestätigte Aussagen',
      'Design von Kunden- und Mitarbeiterbereich',
    ],
    coOwn: ['Die Umsetzung der Plattform, mit dem Engineering-Team des Kunden'],
    collaborate: [
      'Kaufmännische Entscheidungen (der Verantwortliche für das Geschäft)',
      'Der Supportbetrieb (der Verantwortliche für den Kundendienst)',
    ],
    note: 'Die Umsetzung entstand KI-gestützt, und das Repository sagt das offen: Sein Leitfaden legt die Rangfolge der Quellen und die Konfliktregeln fest, die das in einem Geschäft sicher machten, in dem die meisten Tatsachen noch offen waren.',
  },
  approach: {
    heading: 'Schriftlich spezifiziert, Frage für Frage gesteuert',
    body: [
      'Die Anforderungen stammten aus fünfzig direkten Multiple-Choice-Fragen an den Verantwortlichen für das Geschäft, gemessen an einem einzigen Erfolgstest: Das Engineering kann beginnen, ohne eine grundlegende Frage erneut stellen zu müssen. Das Interface wurde dann schriftlich spezifiziert statt gezeichnet — 49 Komponentendateien —, weil die Screens der bekannte Teil waren. Der Designaufwand floss in den Betrieb darunter und in die Regeln dafür, was die Screens sagen dürfen.',
      'Diese Regeln sind ein Konfliktprotokoll, und es entscheidet nach Art der Frage, welche Quelle gewinnt, statt ein für alle Mal. Die Geschäftsdokumente gewinnen bei Service, Garantie, Preis, SLA und Verhalten; die Markendateien bei Logo, Farbe und Schrift. Eine Aussage gegenüber Kunden braucht sowohl eine Markenquelle als auch eine bestätigte betriebliche Grundlage, sonst wird sie nicht ausgeliefert.',
    ],
    insight:
      'Die Markenstrategie von 2024 und die Wirklichkeit von 2026 widersprechen einander ständig. Die Lösung war nie, global einen Gewinner zu wählen — sondern die Lücke zu steuern, eine Art von Frage nach der anderen.',
  },
  brand: {
    label: 'Marke',
    heading: 'Abgeleitet, nie neu gezeichnet',
    body: [
      'Das Markensystem wurde aus den zwei Quelldateien der Agentur rekonstruiert, und jede Aussage darin lässt sich auf eine ihrer Seiten zurückführen; wo die Dateien schweigen, sagt die Dokumentation das, statt die Lücke zu füllen. Die Farbe wurde aus den Vektor-Füllanweisungen des Logos gelesen, nicht aus einem Rendering abgegriffen — was eine Abweichung zwischen zwei Blautönen als Farbraumkonvertierung klärte, nicht als zweite Markenfarbe. Ein helles Gelb, das nur als ein Pixel breite „Sie sind hier“-Kontur vorkommt, wurde zu einer funktionalen Hervorhebung, nie zu einer Markenfarbe.',
      'Die Schriftkombination kam mit ihrem Lizenzrisiko, schriftlich festgehalten statt später entdeckt: Die Display-Schrift ist kommerziell, und ihre Rechte zur Web-Einbettung müssen bestätigt werden. Die Logo-Bibliothek — 15 SVGs, 75 PNGs, 75 WebPs und 12 Favicons — wurde aus den originalen Vektorpfaden generiert, und das Lockup folgt der Leserichtung: Symbol rechts auf Persisch, links auf Englisch. Ein Logo wird nie gespiegelt, um die andere Richtung vorzutäuschen.',
    ],
  },
  marker: {
    heading: 'Der Marker für unbestätigte Aussagen',
    body: [
      'Wo eine Seite eine Tatsache braucht, die niemand freigegeben hat, zeigt sie einen orangefarbenen, gestrichelten Kasten, der das fehlende Element und seinen Verantwortlichen nennt — einen Inhaltsblock, den die Redaktion wie jeden anderen platziert. Eine Durchsicht Mitte August zählte 32 aktive offene Punkte auf sieben der acht öffentlichen Seiten und ergab, dass fünf wiederkehrende Themen den Großteil davon ausmachen. Fünf Dinge zu klären, klärt den größten Teil der Website.',
      'Der Marker ist die Antwort des Produkts auf die Designfrage. Er macht aus einem Inhaltsproblem — Seiten, die Tatsachen brauchen, die noch niemand freigeben will — eine Liste, die sich zählen, zuweisen und abarbeiten lässt, und er hält die Website ehrlich, solange sie unvollständig ist: Nichts, was ein Kunde liest, ist ein Versprechen, das das Geschäft nicht gegeben hat.',
    ],
    annotations: [
      'Jeder Kasten nennt eine Tatsache, die die Seite braucht, statt eines selbstsicheren Satzes.',
      'Der gestrichelte orangefarbene Rahmen hebt einen offenen Punkt vom umgebenden Inhalt ab.',
      'Jeder Kasten trägt den Namen dessen, der ihn freigeben muss; die Namen sind hier ausgeblendet.',
      'Sechs allein auf dieser Seite: die Support-Telefonnummer, die Telefon- und Chatzeiten, die E-Mail-Adresse, die Adresse des Geschäfts und die Handelsregistereintragung.',
    ],
    pendingCaption:
      'Die Kontaktseite: die Tatsachen, die ihr noch fehlen, dort aufgeführt, wo sie hingehören.',
  },
  panel: {
    label: 'Kundenbereich',
    heading: 'Sieben Prinzipien auf jeder Seite',
    intro:
      'Der Kundenbereich ersetzt Telefonanrufe durch einen Ort zum Nachsehen. Acht Ziele decken ab, was ein Kunde tatsächlich tut — sich anmelden, sehen, wo er steht, ein Gerät registrieren, eine Garantie prüfen, eine Anfrage stellen, sie verfolgen, frühere Reparaturen und Rechnungen finden, eine Adresse hinterlegen —, und auf dem Smartphone liegen die vier meistgenutzten in der unteren Leiste, einen Tipp entfernt. Sieben Prinzipien gelten auf allen elf Seiten:',
    principles: [
      'Kein Passwort: eine Mobilnummer und ein SMS-Code, also gibt es nichts zu vergessen.',
      'Standardmäßig privat: Kunden sehen nur ihre eigenen Daten, durchgesetzt auf dem Server statt nur im Interface verborgen.',
      'Mobile First: die vier meistgenutzten Ziele in der unteren Leiste.',
      'Vollständig persisch: Text, Kalender und Ziffern — wobei Seriennummern und IMEI von links nach rechts bleiben, damit sie korrekt gelesen werden.',
      'Leere Zustände, die anleiten: Jede leere Seite sagt, warum sie leer ist und was als Nächstes zu tun ist.',
      'Eindeutig statt mehrdeutig: „noch nicht synchronisiert“ wird von „Sie haben keine Garantie“ getrennt gehalten — zwei völlig verschiedene Zustände, die die meisten Systeme als „nichts gefunden“ anzeigen.',
      'Barrierefrei: Der Bereich hat eine eigene Testsuite für Barrierefreiheit.',
    ],
    outro:
      'Kleine Entscheidungen bekommen dieselbe Sorgfalt. Wer beim Hinzufügen eines Geräts „dieses Gerät hat ein Problem“ ankreuzt, eröffnet gleichzeitig eine Reparaturanfrage — zwei Aufgaben in einem Formular. Der Kunde wird angewiesen, den Tracking-Code im Paket zu vermerken, sodass das Gerät seinem Fall zugeordnet wird, sobald es ankommt. Und ein Fall, der jemand anderem gehört, liefert „nicht gefunden“, nie eine Meldung, die seine Existenz verrät.',
    flowCaption:
      'Vom Gerät bis zur Nachverfolgung auf dem Smartphone: ein Gerät hinzufügen, eine Anfrageart wählen, jede Anfrage mit ihrem Status sehen, eine auf ihrer Zeitleiste verfolgen. Demodaten; die untere Leiste ist abgeschnitten.',
    emptyAnnotations: [
      'Die Seite sagt, was sie enthält: ein schreibgeschütztes Archiv abgeschlossener oder stornierter Reparaturen.',
      'Der leere Zustand sagt, wie er sich füllt — ein Fall und sein endgültiger Status bleiben hier, sobald eine Anfrage abgeschlossen ist.',
      'Und er bietet den nächsten Schritt statt einer Sackgasse.',
    ],
    emptyCaption:
      'Ein leerer Zustand, der anleitet: der Reparaturverlauf, bevor es einen Verlauf gibt. Demodaten.',
  },
  status: {
    label: 'Status',
    heading: 'Der Status geht nie zurück',
    body: [
      'Eine Reparatur- oder Garantieanfrage durchläuft vier Stufen, die der Kunde sehen kann — registriert, in Prüfung oder Reparatur, bereit zur Auslieferung, ausgeliefert —, während eine Beschwerde oder eine Frage nach der Prüfung geschlossen wird. Jede Änderung bleibt mit Datum und Uhrzeit auf der Zeitleiste. Eine Stufe zu überspringen, zurückzugehen oder einen abgeschlossenen Status zu ändern, wird auf dem Server abgelehnt, nicht nur im Interface verborgen, und dasselbe Formular zweimal abzusenden, erzeugt keine zweite Anfrage.',
      'Hinter diesen vier Stufen laufen in der Zentrale sechs ab: Annahme und Triage, Empfang des Geräts, Diagnose, die Prüfung des Garantieanspruchs, Reparatur und Qualitätskontrolle sowie die Übergabe. Der Kunde sieht vier, und der Unterschied ist gewollt — der Bereich sagt das in klaren Worten und teilt dem Kunden mit, dass nur die allgemeinen Stufen angezeigt werden und die internen Details verborgen bleiben.',
    ],
    insight:
      'Der Status, den der Kunde sieht, lügt nie: Eine unbekannte Antwort eines externen Systems bleibt ausstehend, bis sie abgeglichen ist, und wird nie als Erfolg angezeigt.',
    requestCaption:
      'Eine Anfrage auf dem Desktop: der Balken mit vier Stufen, ein Satz, der die aktuelle Stufe erklärt, und der datierte Statusverlauf. Demodaten.',
  },
  decisions: {
    heading: 'Sechs Grenzen',
    lede: 'Der größte Teil des Designs betrifft das, was das Produkt bewusst nicht tut oder sagt.',
    items: [
      {
        title: 'Die Lücke und ihren Verantwortlichen zeigen, keine Vermutung',
        why: 'Eine Website, die ein nicht freigegebenes Versprechen ausspricht, macht es zu einer Verpflichtung. Den offenen Punkt zu zeigen — mit der Person, die die Antwort schuldet —, hält die Website ehrlich, solange sie unvollständig ist, und macht aus einem Inhaltsproblem eine Liste, die sich verfolgen und abarbeiten lässt.',
        alternatives: 'Plausibler Platzhaltertext oder den Abschnitt ausblenden',
        tradeoff: 'Die Website wirkt sichtbar unfertig, bis das Geschäft antwortet.',
      },
      {
        title: 'Ein Mitarbeiterbereich, der kein Betriebsbereich ist',
        why: 'Die Mitarbeitenden arbeiten bereits im bestehenden Supportsystem, und ein zweites würde die Wahrheit aufspalten. Der Mitarbeiterbereich deckt nur die Prozesse ab, die das Produkt verantwortet — Rechnungen, Aktivierungscodes, Ersatzteilannahme, Händlerprüfung —, und seine Sitemap legt fest, dass er nie zu Ticket-Warteschlangen, Diagnose oder Reparatur anwachsen darf.',
        alternatives: 'Das Ticketing im neuen Produkt nachbauen',
        tradeoff: 'Die Mitarbeitenden arbeiten in zwei Systemen, bis beide verbunden sind.',
      },
      {
        title: 'Keine Integration ist Voraussetzung für den Start',
        why: 'Drei Verbindungsstufen wurden definiert, und Stufe eins ist unabhängig: Wird das Supportsystem nie angebunden, bricht nichts. Die Anbindung bringt Produktivität, nicht die Fähigkeit zu arbeiten, also wartet der Wert des Produkts nicht auf den Vertrag eines anderen.',
        alternatives: 'Erst starten, wenn jede Integration live ist',
        tradeoff: 'Manuelle Übergaben, bis die Verträge unterschrieben sind.',
      },
      {
        title: 'Integrationen scheitern geschlossen',
        why: 'Jedes externe System liegt hinter einer einzigen Gateway-Schicht, getestet gegen sieben Grenzszenarien — Erfolg, Validierungsfehler, Timeout, Duplikat, Wiederholung, falsche Reihenfolge und unbekannter Zustand, der ausstehend bleibt, statt geraten zu werden. Außerhalb der Produktion fällt ein fehlender Zugangsschlüssel auf einen Simulator zurück; die Produktion wirft einen Fehler, statt einen Versand zu melden, der nie stattfand.',
        alternatives: 'Optimistische Erfolgszustände',
        tradeoff: 'Mehr Zustände zu gestalten und Fehler, die Nutzer sehen können.',
      },
      {
        title: 'Funktionstrennung im Produkt, nicht nur auf dem Papier',
        why: 'Wer eine Rechnung ausstellt, kann eine große Stornierung nicht allein genehmigen, und die Rolle, die die Stornogrenze festlegt, kann keine Stornierungen genehmigen — sie kann ihre eigene Grenze nicht anheben. Menü, Seitenschutz und serverseitige Prüfung lesen ein einziges Modul, sodass Interface und Server sich über eine Berechtigung nicht uneinig sein können.',
        alternatives: 'Berechtigungen in einer Matrix gezeichnet und per Gewohnheit durchgesetzt',
        tradeoff: 'Manche Routineaktionen brauchen eine zweite Person.',
      },
      {
        title: 'Benennen, was nicht gebaut wurde, und warum',
        why: 'Die Wallet wurde mangels Datenquelle entfernt, der Support-Chat verschoben und die Management-Berichte zurückgehalten, weil ihre Formeln nicht freigegeben sind: Eine falsche Zahl ist schlimmer als keine Zahl. Diagnose und Reparatur sind Werkstattarbeit, kein Softwareprozess.',
        alternatives: 'Dashboards mit vorläufigen Formeln ausliefern',
        tradeoff:
          'Führungskräfte bekommen keinen Bericht, bis das Geschäft die Kennzahlen definiert.',
      },
    ],
    staffEvidence:
      'Die Startseite des Mitarbeiterbereichs: vier Zähler für die Arbeit, die das Produkt verantwortet, und nichts aus der Ticket-Warteschlange.',
    staffCaption:
      'Innerhalb des Umfangs des Mitarbeiterbereichs: Händlerbewerbungen, die ihre eigene offene Frage eingestehen — die Felder zum Antragsteller sind noch nicht definiert —, und Ersatzteile, die mit nur zwei Status verfolgt werden, weil die Bestellung außerhalb des Produkts stattfindet. Eine Zeile, die den Lieferanten nennt, ist entfernt.',
  },
  next: {
    label: 'Wie es weitergeht',
    heading: 'Der Markt hat dem Kunden eine Website gebaut, keinen Weg zurück',
    body: [
      'Eine Studie über 100 Unternehmen im iranischen Garantie- und Reparaturmarkt für digitale Geräte, 18 davon eingehend anhand einer Reparatur-Journey mit zwölf Stationen bewertet, fand eine Klippe: Die ersten fünf Stationen sind weitgehend digital, und ab der Übergabe des Geräts ist es fast nichts mehr. Die beste Plattform digitalisiert sechs von zwölf Stationen; der Durchschnitt liegt bei 4,1.',
      'Die Neudeutung der Studie ist ein Argument über das Datenmodell, und deshalb reicht sie bis ins Produkt: Die Informationseinheit in diesem Markt ist nicht das Ticket oder die Rechnung, sondern der Servicefall — das ganze Leben eines Geräts, von seinem Zustand bei der Annahme über Diagnose, Kostenfreigabe, Reparatur und Qualitätskontrolle bis zur Rückgabe. Die erste Entscheidung, die sie vorlegte, ist eine aufgeschlüsselte Vorabrechnung, die der Kunde online freigibt und die kein Unternehmen der Studie anbot. Das Produkt endet bewusst an der Werkstatttür; die Begründung, weiterzugehen, ist jetzt aufgeschrieben.',
    ],
    marketCaption:
      'Die Klippe: Die Stationen eins bis fünf der Reparatur-Journey sind über die untersuchten Plattformen hinweg zu 33–100 % digital; die Stationen sechs bis zwölf zu 0–11 %.',
  },
  pages: {
    label: 'Alle Seiten',
    heading: 'Die öffentliche Website, Seite für Seite',
    body: [
      'Jede Seite der öffentlichen Website, aufgenommen am 26. September 2026 bei 1.440 Pixeln Breite und auf einem 390 Pixel breiten Smartphone: Startseite, Leistungen, Warum wir, Garantiebedingungen, Kundencharta, Über uns, Händlerbewerbung, FAQ, Kontakt, Zufriedenheitsumfrage, das Formular für Feedback und Beschwerden sowie die Anmeldung.',
      'Die Seiten folgen einem System: weiße Seiten, unterbrochen von tiefblauen Bändern, dieselbe Anfrageleiste mit vier Schritten — Anfrage, Prüfung, Reparatur, Übergabe — auf der Startseite und unter „Warum wir“, und auf dem Smartphone eine einzige Spalte, die Navigation hinter einem Menüknopf. Die Namen des Unternehmens und des Händlers, die Adresse, die Telefonnummer, das Foto des Geschäfts, die Muster-Garantiekarte und die Garantielaufzeiten sind vor der Aufnahme grau abgedeckt; sonst ist nichts retuschiert.',
    ],
    figureCaption: 'Jede Seite der öffentlichen Website, erster Bildschirm auf Desktop und Smartphone; jede Seite lässt sich ganz öffnen.',
    names: {
      home: 'Startseite',
      services: 'Leistungen',
      why: 'Warum wir',
      'warranty-terms': 'Garantiebedingungen',
      'customer-charter': 'Kundencharta',
      about: 'Über uns',
      dealerships: 'Händlerbewerbung',
      faq: 'FAQ',
      contact: 'Kontakt',
      feedback: 'Zufriedenheitsumfrage',
      'feedback-and-complains': 'Feedback und Beschwerden',
      login: 'Anmeldung',
    },
    alt: {
      desktop: 'Yaravan auf dem Desktop — {page}, der erste Bildschirm',
      mobile: 'Yaravan auf dem Smartphone — {page}, der erste Bildschirm',
      desktopFull: 'Yaravan auf dem Desktop — {page}, die ganze Seite',
      mobileFull: 'Yaravan auf dem Smartphone — {page}, die ganze Seite',
    },
    masked: ', identifizierende Angaben abgedeckt',
  },
  outcomes: {
    heading: 'Eine Plattform, die auf Entscheidungen wartet',
    intro:
      'Es gibt keine Geschäftskennzahlen, und es sollte auch keine geben: Die Plattform läuft auf Staging, und die vereinbarten Kennzahlen haben noch keine freigegebene Formel und keine Datenquelle. Das sechswöchige Ziel für Phase 1 wurde verfehlt. Die drei Punkte, die die Integration blockieren — Zugang zum bestehenden Supportsystem, ein Vertrag für die Kundensynchronisierung und eine schriftliche Freigabe zu Sicherheit und Datenschutz —, sind Entscheidungen, kein Engineering, und jeder andere offene Punkt wurde neu eingestuft, sodass er nur noch sein eigenes Feature blockiert.',
    delivered: [
      {
        label: 'Eine öffentliche Website',
        context:
          'Acht Seiten, alle auf Persisch und von rechts nach links, auf denen jede nicht freigegebene Tatsache als offener Punkt mit Verantwortlichem erscheint.',
      },
      {
        label: 'Ein Kundenbereich',
        context:
          'Auf sieben Prinzipien gebaut: kein Passwort, standardmäßig privat, Mobile First und leere Zustände, die anleiten.',
      },
      {
        label: 'Ein Mitarbeiterbereich',
        context:
          'Nur die Arbeit, die das Produkt verantwortet — Rechnungen, Aktivierungscodes, Ersatzteile und Händlerprüfung —, mit im Code durchgesetzter Funktionstrennung.',
      },
      {
        label: 'Eine getestete Umsetzung',
        context: '26 Collections und 92 Testdateien auf fünf Ebenen, mit CI bei jedem Push.',
      },
    ],
    shipped: [
      'Öffentliche Website',
      'Kundenbereich',
      'Mitarbeiterbereich',
      'Marker für unbestätigte Aussagen',
      'Bibliothek der Marken-Assets',
      'Integrationsschicht',
    ],
  },
  lessons: {
    heading: 'Die ehrliche Version eines Produkts',
    items: [
      {
        title: 'Die Lücke zu veröffentlichen ist besser, als sie zu übertünchen',
        body: 'Der gestrichelte orangefarbene Kasten ist das ganze Projekt in einer Komponente. Er machte aus einem Inhaltsproblem eine verfolgte, zählbare Liste mit Verantwortlichen, und er hielt die Website ehrlich, solange sie noch unvollständig war.',
      },
      {
        title: 'Den Unterschied aussprechen',
        body: '„Noch nicht synchronisiert“ und „Sie haben keine Garantie“ sehen in einer Datenbank gleich aus und bedeuten für einen Kunden Gegensätzliches. Ebenso vier Stufen und sechs. Den Unterschied auf dem Bildschirm zu benennen, kostete einen Satz und ersparte einen Anruf.',
      },
      {
        title: 'Eine Markenstrategie ist keine Produktspezifikation',
        body: 'Die Lösung für eine Strategie, die der Wirklichkeit widerspricht, ist nicht, einmal einen Gewinner zu wählen. Es ist eine Regel, die sagt, welche Quelle bei welcher Art von Frage gewinnt — und dass keine Aussage gegenüber Kunden ohne beide ausgeliefert wird.',
      },
      {
        title: 'Leitplanken müssen mit der Umsetzung Schritt halten',
        body: 'Der Leitfaden des Repositorys beschrieb noch lange eine Codebasis ohne Anwendungsquellcode, als diese längst 26 Collections und ein Staging-Deployment hatte. Dokumentation, die eine KI-gestützte Umsetzung steuert, muss im Tempo der Umsetzung gepflegt werden, sonst steuert sie bald eine Codebasis, die es nicht mehr gibt.',
      },
    ],
  },
}

const FR: YapCopy = {
  statement:
    'Une plateforme de garantie sur une opération encore en définition, où chaque fait non validé devient un élément ouvert, visible et doté d’un responsable.',
  industry: 'Commerce de détail · après-vente et garantie',
  team: 'Designer principal et chef de produit, avec l’équipe d’ingénierie du client et ses responsables métier et après-vente',
  heroCaption:
    'Le site public tel qu’il était le 26 septembre 2026 : « De la demande à la livraison, nous sommes à vos côtés. » Le nom de l’entreprise est masqué.',
  snapshot: {
    problem:
      'Les promesses publiques de la marque dépassaient l’opération, et un site destiné aux clients pouvait discrètement transformer n’importe laquelle d’entre elles en engagement.',
    role: 'Designer principal et chef de produit : les exigences, la spécification de l’interface, le pattern d’affirmation non confirmée, et les espaces client et collaborateurs.',
    result:
      'Une plateforme testée en préproduction — site public, espace client et espace collaborateurs — en attente de décisions métier, pas d’ingénierie. Pas encore d’indicateurs métier.',
  },
  alt: {
    cover:
      'Yaravan — l’accueil de l’espace client sur ordinateur, en persan : garanties actives, demandes en cours et un bouton pour déclarer une réparation',
    home:
      'Yaravan — la page d’accueil du site public sur ordinateur, en persan : « De la demande à la livraison, nous sommes à vos côtés », à côté d’un technicien qui répare un téléphone, au-dessus d’un bandeau en quatre étapes — demande, examen, réparation, livraison —, le nom de l’entreprise masqué en gris',
    pending:
      'Yaravan — la page contact en persan : six encadrés orange en pointillés, chacun nommant un fait encore en attente de validation',
    addDevice:
      'Yaravan — l’ajout d’un appareil sur mobile, en persan : un nom, une marque, un modèle et un numéro de série ou IMEI facultatifs, et une case à cocher pour un appareil qui a déjà un problème',
    newRequest:
      'Yaravan — la première étape d’une nouvelle demande sur mobile, en persan : choisir entre réparation ou garantie, réclamation, ou question générale',
    requests:
      'Yaravan — la liste des demandes sur mobile, en persan : trois demandes de types différents, chacune avec son statut actuel',
    request:
      'Yaravan — une demande de réparation sur mobile, en persan : le code de suivi, le problème signalé et une frise de statuts',
    empty:
      'Yaravan — un historique de réparations vide sur mobile, en persan, qui explique ce qui y apparaîtra et propose un bouton pour voir les demandes',
    requestDesktop:
      'Yaravan — une demande dans l’espace client sur ordinateur, en persan : une barre de progression en quatre étapes, une phrase qui explique l’étape en cours et un historique des statuts daté',
    staff:
      'Yaravan — l’accueil de l’espace collaborateurs en persan : quatre compteurs pour les demandes des concessionnaires, les factures, les commandes en cours et les demandes de pièces',
    dealership:
      'Yaravan — les candidatures de concessionnaires dans l’espace collaborateurs, en persan : chaque demande avec son statut et des boutons pour approuver ou refuser, le demandeur marqué comme pas encore défini',
    parts:
      'Yaravan — les pièces dans l’espace collaborateurs, en persan : une recherche, des filtres pour les pièces demandées et reçues, et trois pièces avec leur statut',
    market:
      'Étude de marché Yaravan — un graphique des douze étapes du parcours de réparation : les cinq premières majoritairement numériques, les étapes six à douze entre zéro et onze pour cent',
  },
  context: {
    heading: 'Une identité en sommeil, un produit qui fonctionne',
    body: [
      'Yaravan est la marque de garantie et d’après-vente d’un distributeur iranien de téléphones mobiles. Une agence extérieure a rédigé son identité de marque en 2024 — un document de stratégie et une charte graphique —, puis rien n’a été construit dessus.',
      'À partir de juillet 2026, il s’agissait de faire de cette identité un produit qui fonctionne : un site indépendant en persan, un espace client et un espace collaborateurs. Le système de support existant conserve la file de tickets et l’opération de réparation ; le produit couvre ce que la marque possède elle-même. L’opération qui le sous-tend, dessinée processus par processus, fait l’objet d’une étude de cas à part entière.',
    ],
  },
  problem: {
    heading: 'Là où devrait figurer un fait',
    body: [
      'Le site existant promettait plus que ce que l’opération délivrait. Le travail sur les exigences a montré que ses promesses phares ne correspondaient pas à la réalité opérationnelle, et qu’aucune véritable base de données de garanties n’existait — aucune migration de données n’était nécessaire, faute de données.',
      'La stratégie de marque promettait plus encore — des agences, un service à toute heure, la livraison, une assurance incluse — et l’opération qui devrait tenir ces promesses était encore en cours de définition. Un site destiné aux clients pouvait discrètement transformer n’importe laquelle d’entre elles en engagement.',
      'Restait une seule vraie question de design : que mettre sur la page, là où devrait figurer un fait, quand personne ne peut encore le confirmer ?',
    ],
  },
  ownership: {
    heading: 'Mener le travail, avec l’équipe du client',
    intro:
      'J’ai mené le produit — les exigences, la spécification de l’interface et le développement —, avec la contribution de l’équipe d’ingénierie du client. La responsabilité métier est restée au client : son responsable métier portait les décisions commerciales, et son responsable après-vente l’opération de support dont dépend le produit.',
    own: [
      'Exigences et périmètre',
      'Système de marque, dérivé des fichiers sources',
      'Spécification de l’interface',
      'Le pattern d’affirmation non confirmée',
      'Design des espaces client et collaborateurs',
    ],
    coOwn: ['Le développement de la plateforme, avec l’équipe d’ingénierie du client'],
    collaborate: [
      'Les décisions commerciales (le responsable métier)',
      'L’opération de support (le responsable après-vente)',
    ],
    note: 'Le développement a été réalisé avec l’aide de l’IA, et le dépôt le dit ouvertement : son guide fixe l’ordre des sources de vérité et les règles de conflit qui ont rendu cela sûr, dans une activité où la plupart des faits restaient ouverts.',
  },
  approach: {
    heading: 'Spécifié par écrit, gouverné question par question',
    body: [
      'Les exigences sont issues de cinquante questions directes à choix multiples posées au responsable métier, avec un seul critère de réussite : l’ingénierie peut démarrer sans avoir à reposer la moindre question fondamentale. L’interface a ensuite été spécifiée par écrit plutôt que dessinée — 49 fichiers de composants —, parce que les écrans étaient la partie connue. L’effort de design s’est porté sur l’opération sous-jacente et sur les règles qui fixent ce que les écrans ont le droit de dire.',
      'Ces règles forment un protocole de conflit, qui décide quelle source l’emporte selon le type de question plutôt qu’une fois pour toutes. Les documents métier l’emportent sur le service, la garantie, le prix, le SLA et le comportement ; les fichiers de marque l’emportent sur le logo, la couleur et la typographie. Une affirmation destinée aux clients a besoin à la fois d’une source de marque et d’une base opérationnelle confirmée, sinon elle n’est pas publiée.',
    ],
    insight:
      'La stratégie de marque de 2024 et la réalité de 2026 se contredisent sans cesse. La solution n’a jamais été de désigner globalement un gagnant — c’était de gouverner l’écart, un type de question à la fois.',
  },
  brand: {
    label: 'Marque',
    heading: 'Dérivé, jamais redessiné',
    body: [
      'Le système de marque a été reconstitué par rétro-ingénierie à partir des deux fichiers sources de l’agence, et chacune de ses affirmations peut être rattachée à l’une de leurs pages ; là où les fichiers se taisent, la documentation le dit au lieu de combler le vide. La couleur a été lue dans les opérateurs de remplissage vectoriels du logo plutôt que prélevée sur un rendu — ce qui a permis de trancher un écart entre deux bleus comme une conversion d’espace colorimétrique, et non comme une seconde couleur de marque. Un jaune vif qui n’apparaît que sous la forme d’un contour « vous êtes ici » d’un pixel est devenu une mise en évidence fonctionnelle, jamais une couleur de marque.',
      'Le couple typographique est arrivé avec son risque de licence consigné par écrit plutôt que découvert plus tard : la police de titrage est commerciale et ses droits d’intégration web doivent être confirmés. La bibliothèque de logos — 15 SVG, 75 PNG, 75 WebP et 12 favicons — a été générée à partir des tracés vectoriels d’origine, et le bloc-marque suit le sens de lecture : le symbole à droite en persan, à gauche en anglais. Un logo n’est jamais inversé en miroir pour simuler l’autre sens.',
    ],
  },
  marker: {
    heading: 'Le marqueur d’affirmation non confirmée',
    body: [
      'Là où une page a besoin d’un fait que personne n’a validé, elle affiche un encadré orange en pointillés qui nomme l’élément manquant et son responsable — un bloc de contenu que les éditeurs placent comme n’importe quel autre. Un recensement à la mi-août a compté 32 éléments ouverts en ligne sur sept des huit pages publiques, et a montré que cinq sujets récurrents en représentent la plupart. Régler cinq choses règle l’essentiel du site.',
      'Le marqueur est la réponse du produit à la question de design. Il transforme un problème de contenu — des pages qui ont besoin de faits que personne n’acceptera encore de valider — en une liste que l’on peut compter, attribuer et clore, et il garde le site honnête tant qu’il est incomplet : rien de ce que lit un client n’est une promesse que l’entreprise n’a pas faite.',
    ],
    annotations: [
      'Chaque encadré nomme un fait dont la page a besoin, au lieu d’une phrase assurée.',
      'Le cadre orange en pointillés distingue un élément ouvert du contenu qui l’entoure.',
      'Chaque encadré porte le nom de la personne qui doit le valider ; les noms sont masqués ici.',
      'Six sur cette seule page : le téléphone du support, les horaires du téléphone et du chat, l’e-mail, l’adresse du magasin et l’immatriculation légale.',
    ],
    pendingCaption: 'La page contact : les faits qui lui manquent encore, listés là où ils iront.',
  },
  panel: {
    label: 'Espace client',
    heading: 'Sept principes sur chaque page',
    intro:
      'L’espace client remplace les appels téléphoniques par un endroit où consulter. Huit destinations couvrent ce que fait réellement un client — se connecter, voir où il en est, enregistrer un appareil, vérifier une garantie, ouvrir une demande, la suivre, retrouver ses réparations et factures passées, conserver une adresse — et, sur téléphone, les quatre plus utilisées se trouvent dans la barre inférieure, à portée d’un seul toucher. Sept principes valent sur les onze pages :',
    principles: [
      'Pas de mot de passe : un numéro de mobile et un code SMS, si bien qu’il n’y a rien à oublier.',
      'Privé par défaut : les clients ne voient que leurs propres données, ce qui est imposé côté serveur plutôt que masqué dans l’interface.',
      'Mobile d’abord : les quatre destinations les plus utilisées dans la barre inférieure.',
      'Entièrement en persan : texte, calendrier et chiffres — avec les numéros de série et l’IMEI maintenus de gauche à droite pour qu’ils se lisent correctement.',
      'Des états vides pédagogiques : chaque page vide dit pourquoi elle est vide et quoi faire ensuite.',
      'Explicite, pas ambigu : « pas encore synchronisé » est distingué de « vous n’avez aucune garantie » — deux états complètement différents que la plupart des systèmes affichent comme « aucun résultat ».',
      'Accessible : l’espace dispose de sa propre suite de tests d’accessibilité.',
    ],
    outro:
      'Les petites décisions bénéficient du même soin. Cocher « cet appareil a un problème » en ajoutant un appareil ouvre en même temps une demande de réparation — deux tâches dans un seul formulaire. Le client est invité à écrire le code de suivi à l’intérieur du colis, si bien que l’appareil rejoint son dossier dès son arrivée. Et un dossier qui appartient à quelqu’un d’autre renvoie « introuvable », jamais un message qui révèle son existence.',
    flowCaption:
      'De l’appareil au suivi, sur téléphone : ajouter un appareil, choisir un type de demande, voir chaque demande avec son statut, en suivre une sur sa frise. Données de démonstration ; la barre inférieure est rognée.',
    emptyAnnotations: [
      'La page dit ce qu’elle contient : une archive en lecture seule des réparations closes ou annulées.',
      'L’état vide dit comment il se remplit — un dossier et son statut final restent ici une fois la demande close.',
      'Et il propose l’étape suivante au lieu d’une impasse.',
    ],
    emptyCaption:
      'Un état vide pédagogique : l’historique des réparations avant qu’il y ait le moindre historique. Données de démonstration.',
  },
  status: {
    label: 'Statut',
    heading: 'Le statut ne revient jamais en arrière',
    body: [
      'Une demande de réparation ou de garantie passe par quatre étapes visibles par le client — enregistrée, en cours d’examen ou de réparation, prête à être livrée, livrée —, tandis qu’une réclamation ou une question se clôt après examen. Chaque changement reste sur la frise avec sa date et son heure. Sauter une étape, revenir en arrière ou modifier un statut finalisé est rejeté par le serveur, pas seulement masqué dans l’interface, et envoyer deux fois le même formulaire ne crée pas de seconde demande.',
      'Derrière ces quatre étapes, six se déroulent au siège : prise en charge et tri, réception de l’appareil, diagnostic, vérification de l’éligibilité à la garantie, réparation et contrôle qualité, et remise. Le client en voit quatre, et l’écart est délibéré — l’espace le dit en toutes lettres, en indiquant au client que seules les étapes générales sont affichées et que le détail interne reste hors de vue.',
    ],
    insight:
      'Le statut affiché au client ne ment jamais : une réponse inconnue d’un système extérieur reste en attente jusqu’à son rapprochement, et n’est jamais affichée comme un succès.',
    requestCaption:
      'Une demande sur ordinateur : la barre en quatre étapes, une phrase qui explique l’étape en cours et l’historique des statuts daté. Données de démonstration.',
  },
  decisions: {
    heading: 'Six limites',
    lede: 'L’essentiel du design porte sur ce que le produit refuse de faire ou de dire.',
    items: [
      {
        title: 'Montrer la lacune et son responsable, pas une supposition',
        why: 'Un site qui énonce une promesse non validée la transforme en engagement. Afficher l’élément ouvert — avec la personne qui doit la réponse — garde le site honnête tant qu’il est incomplet, et transforme un problème de contenu en une liste que l’on peut suivre et clore.',
        alternatives: 'Un texte provisoire plausible, ou masquer la section',
        tradeoff: 'Le site a visiblement l’air inachevé jusqu’à ce que l’entreprise réponde.',
      },
      {
        title: 'Un espace collaborateurs qui n’est pas un espace d’exploitation',
        why: 'Les agents travaillent déjà dans le système de support existant, et un second système scinderait la vérité. L’espace collaborateurs ne couvre que les processus que possède le produit — factures, codes d’activation, réception des pièces, examen des concessionnaires — et son plan de site précise qu’il ne doit jamais s’étendre aux files de tickets, au diagnostic ou à la réparation.',
        alternatives: 'Reconstruire le ticketing dans le nouveau produit',
        tradeoff: 'Le personnel travaille dans deux systèmes tant qu’ils ne sont pas connectés.',
      },
      {
        title: 'Aucune intégration n’est un prérequis au lancement',
        why: 'Trois niveaux de connexion ont été définis, et le premier est autonome : si le système de support n’est jamais connecté, rien ne casse. La connexion ajoute de la productivité, pas la capacité de travailler, si bien que la valeur du produit n’attend le contrat de personne.',
        alternatives: 'Lancer seulement une fois toutes les intégrations en service',
        tradeoff: 'Des transferts manuels jusqu’à la signature des contrats.',
      },
      {
        title: 'Les intégrations échouent en mode fermé',
        why: 'Chaque système externe se trouve derrière une même couche de passerelle, testée sur sept scénarios limites — succès, erreur de validation, délai dépassé, doublon, rejeu, désordre et état inconnu, qui reste en attente au lieu d’être deviné. Hors production, un identifiant manquant bascule sur un simulateur ; en production, le système lève une erreur plutôt que de signaler un envoi qui n’a jamais eu lieu.',
        alternatives: 'Des états de succès optimistes',
        tradeoff: 'Plus d’états à concevoir, et des erreurs visibles par l’utilisateur.',
      },
      {
        title: 'La séparation des tâches dans le produit, pas seulement sur le papier',
        why: 'Qui émet une facture ne peut pas approuver seul une annulation importante, et le rôle qui fixe le plafond d’annulation ne peut pas approuver d’annulations — il ne peut pas relever son propre plafond. Le menu, la protection de page et la vérification côté serveur lisent un même module, si bien que l’interface et le serveur ne peuvent pas diverger sur une permission.',
        alternatives: 'Des permissions dessinées dans une matrice et appliquées par habitude',
        tradeoff: 'Certaines actions courantes exigent une seconde personne.',
      },
      {
        title: 'Nommer ce qui n’a pas été construit, et pourquoi',
        why: 'Le portefeuille a été retiré faute de source de données, le chat du support reporté, et les rapports de gestion retenus parce que leurs formules ne sont pas validées : un chiffre faux est pire que pas de chiffre. Le diagnostic et la réparation relèvent de l’atelier, pas d’un processus logiciel.',
        alternatives: 'Livrer des tableaux de bord avec des formules provisoires',
        tradeoff:
          'Les managers n’ont aucun rapport tant que l’entreprise n’a pas défini les indicateurs.',
      },
    ],
    staffEvidence:
      'L’accueil de l’espace collaborateurs : quatre compteurs pour le travail que possède le produit, et rien de la file de tickets.',
    staffCaption:
      'Dans le périmètre de l’espace collaborateurs : des candidatures de concessionnaires qui assument leur propre question ouverte — les champs du demandeur ne sont pas encore définis — et des pièces suivies avec deux statuts seulement, parce que la commande se fait en dehors du produit. Une ligne qui nomme le fournisseur est retirée.',
  },
  next: {
    label: 'Et ensuite',
    heading: 'Le marché a construit au client un site web, pas un chemin de retour',
    body: [
      'Une étude de 100 entreprises du marché iranien de la garantie et de la réparation des biens numériques, dont 18 évaluées en profondeur au regard d’un parcours de réparation en douze étapes, a mis au jour une falaise : les cinq premières étapes sont largement numériques et, à partir de la remise de l’appareil, presque rien ne l’est. La meilleure plateforme numérise six étapes sur douze ; la moyenne est de 4,1.',
      'Le recadrage proposé par l’étude est un argument de modèle de données, et c’est pourquoi il touche le produit : l’unité d’information de ce marché n’est ni le ticket ni la facture, mais le dossier de service — toute la vie d’un appareil, de son état à la prise en charge jusqu’au retour, en passant par le diagnostic, l’approbation du coût, la réparation et le contrôle qualité. La première décision qu’elle a mise en avant est une pré-facture détaillée que le client approuve en ligne, ce qu’aucune entreprise de l’étude ne proposait. Le produit s’arrête volontairement à la porte de l’atelier ; l’argumentaire pour aller plus loin est désormais écrit.',
    ],
    marketCaption:
      'La falaise : les étapes un à cinq du parcours de réparation sont numériques à 33–100 % selon les plateformes étudiées ; les étapes six à douze, à 0–11 %.',
  },
  pages: {
    label: 'Toutes les pages',
    heading: 'Le site public, page par page',
    body: [
      'Toutes les pages du site public, capturées le 26 septembre 2026 sur 1 440 pixels de large et sur un téléphone de 390 pixels : l’accueil, les services, pourquoi nous, les conditions de garantie, la charte client, à propos, la demande de concession, la FAQ, le contact, l’enquête de satisfaction, le formulaire d’avis et de réclamations, et la connexion.',
      'Les pages partagent un même système : des pages blanches rythmées par des bandeaux bleu profond, le même bandeau de demande en quatre étapes — demande, examen, réparation, livraison — sur l’accueil et sur « Pourquoi nous », et sur téléphone une seule colonne, la navigation derrière un bouton de menu. Les noms de l’entreprise et du distributeur, l’adresse, le numéro de téléphone, la photo du magasin, la carte de garantie d’exemple et les durées de garantie sont masqués en gris avant la capture ; rien d’autre n’est retouché.',
    ],
    figureCaption: 'Toutes les pages du site public, premier écran sur ordinateur et sur téléphone ; ouvrez une page pour la voir en entier.',
    names: {
      home: 'Accueil',
      services: 'Services',
      why: 'Pourquoi nous',
      'warranty-terms': 'Conditions de garantie',
      'customer-charter': 'Charte client',
      about: 'À propos',
      dealerships: 'Demande de concession',
      faq: 'FAQ',
      contact: 'Contact',
      feedback: 'Enquête de satisfaction',
      'feedback-and-complains': 'Avis et réclamations',
      login: 'Connexion',
    },
    alt: {
      desktop: 'Yaravan sur ordinateur — {page}, le premier écran',
      mobile: 'Yaravan sur mobile — {page}, le premier écran',
      desktopFull: 'Yaravan sur ordinateur — {page}, la page entière',
      mobileFull: 'Yaravan sur mobile — {page}, la page entière',
    },
    masked: ', les informations identifiantes masquées',
  },
  outcomes: {
    heading: 'Une plateforme en attente de décisions',
    intro:
      'Il n’y a pas d’indicateurs métier, et il ne devrait pas y en avoir : la plateforme est en préproduction, et les mesures convenues n’ont encore ni formule validée ni source de données. L’objectif de six semaines de la phase 1 n’a pas été tenu. Les trois points qui bloquent l’intégration — l’accès au système de support existant, un contrat de synchronisation des clients et une validation écrite en matière de sécurité et de confidentialité — sont des décisions, pas de l’ingénierie, et chaque autre point ouvert a été reclassé pour ne bloquer que sa propre fonctionnalité.',
    delivered: [
      {
        label: 'Un site public',
        context:
          'Huit pages, entièrement en persan et de droite à gauche, où chaque fait non validé apparaît comme un élément ouvert doté d’un responsable.',
      },
      {
        label: 'Un espace client',
        context:
          'Bâti sur sept principes : pas de mot de passe, privé par défaut, mobile d’abord, et des états vides pédagogiques.',
      },
      {
        label: 'Un espace collaborateurs',
        context:
          'Uniquement le travail que possède le produit — factures, codes d’activation, pièces et examen des concessionnaires — avec la séparation des tâches appliquée dans le code.',
      },
      {
        label: 'Un développement testé',
        context:
          '26 collections et 92 fichiers de tests sur cinq niveaux, avec une CI à chaque push.',
      },
    ],
    shipped: [
      'Site public',
      'Espace client',
      'Espace collaborateurs',
      'Marqueur d’affirmation non confirmée',
      'Bibliothèque des ressources de marque',
      'Couche d’intégration',
    ],
  },
  lessons: {
    heading: 'La version honnête d’un produit',
    items: [
      {
        title: 'Publier la lacune vaut mieux que la masquer',
        body: 'L’encadré orange en pointillés, c’est tout le projet en un seul composant. Il a transformé un problème de contenu en une liste suivie, dénombrable et dotée de responsables, et il a rendu le site honnête tant qu’il était encore incomplet.',
      },
      {
        title: 'Dire la différence à voix haute',
        body: '« Pas encore synchronisé » et « vous n’avez aucune garantie » se ressemblent dans une base de données et signifient des choses opposées pour un client. Il en va de même de quatre étapes et de six. Nommer la différence à l’écran a coûté une phrase et évité un appel téléphonique.',
      },
      {
        title: 'Une stratégie de marque n’est pas une spécification produit',
        body: 'La solution face à une stratégie qui contredit la réalité n’est pas de désigner un gagnant une fois pour toutes. C’est une règle qui dit quelle source l’emporte pour quel type de question — et qu’aucune affirmation destinée aux clients n’est publiée sans les deux.',
      },
      {
        title: 'Les garde-fous doivent suivre le rythme du développement',
        body: 'Le guide du dépôt décrivait encore une base de code sans aucun code source applicatif bien après qu’elle eut 26 collections et un déploiement en préproduction. Une documentation qui gouverne un développement assisté par l’IA doit être tenue à jour au rythme du développement, sinon elle se met à gouverner une base de code qui n’existe plus.',
      },
    ],
  },
}

const JA: YapCopy = {
  statement:
    'まだ定義の途中にある業務の上に築いた保証プラットフォーム。誰も承認していない事実はすべて、担当者が明示された、目に見える未決項目として示される。',
  industry: '小売 · アフターサービスと保証',
  team: 'リードデザイナー兼PM。クライアントのエンジニアリングチーム、事業部門とアフターサービス部門の責任者とともに',
  heroCaption:
    '2026年9月26日時点の公開サイト。「申し込みから引き渡しまで、私たちが寄り添います。」会社名は隠している。',
  snapshot: {
    problem:
      'ブランドが公に掲げる約束は業務の実態を追い越しており、顧客向けのサイトは、そのどれをも知らぬ間に確約に変えてしまいかねなかった。',
    role: 'リードデザイナー兼PM：要件定義、インターフェースの仕様、未確認の主張のためのパターン、そしてカスタマーパネルとスタッフパネル。',
    result:
      'ステージング環境にある、テスト済みのプラットフォーム — 公開サイト、カスタマーパネル、スタッフパネル。待っているのはエンジニアリングではなく、事業上の判断である。事業指標はまだない。',
  },
  alt: {
    cover:
      'Yaravan — ペルシア語のデスクトップ版カスタマーパネルのホーム。有効な保証、対応中のリクエスト、修理を登録するボタン',
    home:
      'Yaravan — デスクトップで見たペルシア語の公開サイトのホームページ。「申し込みから引き渡しまで、私たちが寄り添います」の一文の隣に、携帯電話を修理する技術者と、申し込み・点検・修理・引き渡しの4段階の帯。会社名はグレーで隠している',
    pending:
      'Yaravan — ペルシア語の問い合わせページ。オレンジの破線の枠が6つあり、それぞれがまだ承認待ちの事実を示す',
    addDevice:
      'Yaravan — ペルシア語のモバイル版の端末登録。名前と、任意入力のブランド、モデル、シリアル番号またはIMEI、そしてすでに不具合のある端末のためのチェックボックス',
    newRequest:
      'Yaravan — ペルシア語のモバイル版の新規リクエストのステップ1。修理または保証、苦情、一般的な質問から選ぶ',
    requests:
      'Yaravan — ペルシア語のモバイル版リクエスト一覧。種類の異なる3つのリクエストと、それぞれの現在のステータス',
    request:
      'Yaravan — ペルシア語のモバイル版修理リクエスト。追跡コード、申告された不具合、ステータスのタイムライン',
    empty:
      'Yaravan — ペルシア語のモバイル版の空の修理履歴。そこに何が表示されるかを説明し、リクエストを見るためのボタンを示す',
    requestDesktop:
      'Yaravan — ペルシア語のデスクトップ版カスタマーパネルのリクエスト。4段階の進捗バー、現在の段階を説明する一文、日付入りのステータス履歴',
    staff:
      'Yaravan — ペルシア語のスタッフパネルのホーム。販売店からのリクエスト、請求書、未完了の注文、部品リクエストの4つのカウンター',
    dealership:
      'Yaravan — ペルシア語のスタッフパネルの販売店申請。各申請にステータスと承認・却下のボタンがあり、申請者は未定義と示されている',
    parts:
      'Yaravan — ペルシア語のスタッフパネルの部品画面。検索、「リクエスト済み」と「受領済み」のフィルター、そして3つの部品とそのステータス',
    market:
      'Yaravan市場調査 — 修理ジャーニーの12段階を示すグラフ。最初の5段階はおおむねデジタル化され、6段階目から12段階目は0%から11%のあいだ',
  },
  context: {
    heading: '眠っていたアイデンティティと、動く製品',
    body: [
      'Yaravanは、イランの携帯電話小売企業の保証・アフターサービスブランドである。2024年に外部のエージェンシーがブランドアイデンティティ — 戦略資料とビジュアルガイドライン — を作ったが、その上には何も築かれなかった。',
      '2026年7月からの仕事は、そのアイデンティティを動く製品に変えることだった。独立したペルシア語のウェブサイト、カスタマーパネル、スタッフパネルである。既存のサポートシステムは、チケットの処理待ち列と修理業務を引き続き担い、製品はブランド自身が所有するものを扱う。その根底にある業務は、プロセスごとに図にしたうえで、別のケーススタディで紹介している。',
    ],
  },
  problem: {
    heading: '事実があるべき場所',
    body: [
      '既存のサイトは、業務が実際に提供している以上のことを約束していた。要件定義の作業で、その主要な主張が業務上の事実ではないこと、そして実際の保証データベースが存在しないことがわかった。データ移行は必要なかった。移すべきデータがなかったからである。',
      'ブランド戦略はさらに多くを約束していた — 支店網、24時間対応のサービス、配送、保険の付帯。そして、それらの約束を守らなければならない業務は、まだ定義の途中にあった。顧客向けのサイトは、そのどれをも知らぬ間に確約に変えてしまいかねなかった。',
      'そこに残ったのは、本当の意味でのデザインの問いが一つだけだった。事実を確認できる人がまだ誰もいないとき、事実があるべき場所には何を置くのか。',
    ],
  },
  ownership: {
    heading: 'クライアントのチームとともに、仕事を率いる',
    intro:
      '私は製品 — 要件定義、インターフェースの仕様、実装 — を率い、クライアントのエンジニアリングチームがそこに加わった。事業上の責任はクライアント側に残った。事業部門の責任者が商業上の判断を担い、アフターサービス部門の責任者が、製品が依存するサポート業務を担った。',
    own: [
      '要件と範囲',
      'ソースファイルから導いたブランドシステム',
      'インターフェースの仕様',
      '未確認の主張のためのパターン',
      'カスタマーパネルとスタッフパネルのデザイン',
    ],
    coOwn: ['プラットフォームの実装（クライアントのエンジニアリングチームと共同）'],
    collaborate: [
      '商業上の判断（事業部門の責任者）',
      'サポート業務（アフターサービス部門の責任者）',
    ],
    note: '実装にはAIの支援を用いており、リポジトリはそれを隠さず明記している。そのガイドが情報源の優先順位と矛盾の扱いのルールを定めたことで、事実の大半がまだ未決の事業でも、それを安全に行えた。',
  },
  approach: {
    heading: '文章で仕様化し、問いごとに統制する',
    body: [
      '要件は、事業部門の責任者に向けた50の直接的な選択式の質問から得たもので、成功の基準は一つ。エンジニアリングが根本的な問いを一つも聞き直さずに着手できることである。続いてインターフェースを、描くのではなく文章で仕様化した — 49のコンポーネントファイルである。画面はわかっている部分だったからだ。デザインの労力は、その根底にある業務と、画面が何を言ってよいかを定めるルールに注いだ。',
      'そのルールとは矛盾の扱いを定めたプロトコルであり、どの情報源を優先するかを一度にすべて決めるのではなく、問いの種類ごとに決める。サービス、保証、価格、SLA、振る舞いについては事業側の文書が優先し、ロゴ、色、書体についてはブランドのファイルが優先する。顧客向けの主張は、ブランド上の出典と、確認済みの業務上の根拠の両方がなければ公開されない。',
    ],
    insight:
      '2024年のブランド戦略と2026年の現実は、絶えず食い違う。解決策は、全体としてどちらかを勝たせることでは決してなかった。問いの種類ごとに、その隔たりを統制することだった。',
  },
  brand: {
    label: 'ブランド',
    heading: '導き出し、決して描き直さない',
    body: [
      'ブランドシステムはエージェンシーの2つのソースファイルからリバースエンジニアリングしたもので、その記述はすべて、ファイルのどのページに基づくかまでたどれる。ファイルが何も語っていない箇所は、空白を埋めずにその旨を文書に記した。色はレンダリングからサンプリングせず、ロゴのベクターの塗りの演算子から読み取った。これにより、2つの青のあいだの食い違いは、2つ目のブランドカラーではなく色空間の変換によるものだと決着した。1ピクセルの「現在地」の輪郭線としてだけ現れる明るい黄色は、機能的なハイライトとし、ブランドカラーにはしなかった。',
      '書体の組み合わせには、後から発覚するのではなく、ライセンス上のリスクをあらかじめ書き添えた。ディスプレイ書体は商用で、ウェブ埋め込みの権利を確認する必要がある。ロゴライブラリ — SVG 15点、PNG 75点、WebP 75点、ファビコン12点 — は元のベクターパスから生成し、ロックアップは読む方向に従う。ペルシア語ではシンボルが右、英語では左に来る。逆方向を装うためにロゴを反転させることは決してない。',
    ],
  },
  marker: {
    heading: '未確認の主張を示すマーカー',
    body: [
      'ページに誰も承認していない事実が必要な箇所では、欠けている項目とその担当者を記したオレンジの破線の枠を表示する。編集者がほかのブロックと同じように配置できるコンテンツブロックである。8月中旬の点検では、8つの公開ページのうち7ページで32の未決項目が見つかり、その大半が繰り返し現れる5つの主題に集中していることがわかった。5つを片づければ、サイトの大部分が片づく。',
      'このマーカーが、デザインの問いに対する製品の答えである。コンテンツの問題 — まだ誰も承認しようとしない事実を必要とするページ — を、数え、担当者を割り当て、片づけられるリストに変える。そして未完成のあいだもサイトを正直に保つ。顧客が読むものの中に、事業側がしていない約束は一つもない。',
    ],
    annotations: [
      '各枠は、自信ありげな一文の代わりに、ページが必要とする事実を一つ示す。',
      'オレンジの破線の枠が、未決の項目を周囲のコンテンツから区別する。',
      'どの枠にも承認すべき人の名前が入る。名前はここでは伏せている。',
      'このページだけで6つ：サポート窓口の電話番号、電話とチャットの対応時間、メールアドレス、店舗の住所、法人登記。',
    ],
    pendingCaption: '問い合わせページ。まだ必要な事実を、それが入る場所に並べている。',
  },
  panel: {
    label: 'カスタマーパネル',
    heading: 'すべてのページに通じる7つの原則',
    intro:
      'カスタマーパネルは、電話の代わりに、見に行ける場所を提供する。8つの行き先が、顧客が実際に行うことを網羅する — ログインする、自分の状況を確認する、端末を登録する、保証を確かめる、リクエストを出す、その経過を追う、過去の修理と請求書を探す、住所を登録しておく。スマートフォンでは、最もよく使う4つが下部のバーに置かれ、ワンタップで届く。11ページすべてで、7つの原則が守られている：',
    principles: [
      'パスワードなし：携帯電話番号とSMSコードだけなので、忘れるものが何もない。',
      'デフォルトで非公開：顧客が見られるのは自分のデータだけ。インターフェースで隠すのではなく、サーバー側で強制している。',
      'モバイルファースト：最もよく使う4つの行き先を下部のバーに。',
      '完全なペルシア語：文章、暦、数字まで。ただしシリアル番号とIMEIは、正しく読めるよう左から右のまま保つ。',
      '教えてくれる空の状態：空のページはどれも、なぜ空なのか、次に何をすればよいかを伝える。',
      '曖昧ではなく明示的に：「まだ同期されていません」と「保証がありません」を区別する。多くのシステムがどちらも「見つかりません」と表示する、まったく異なる2つの状態である。',
      'アクセシブル：パネルには専用のアクセシビリティのテストスイートがある。',
    ],
    outro:
      '小さな判断にも、同じ配慮が行き届いている。端末を登録するときに「この端末には不具合がある」にチェックを入れると、同時に修理リクエストが開かれる。1つのフォームで2つの用事が済む。顧客には追跡コードを荷物の中に書き入れるよう案内するので、端末は届いた瞬間に自分のケースと結びつく。そして他人のケースに対しては「見つかりません」を返し、その存在を明かすメッセージは決して返さない。',
    flowCaption:
      'スマートフォンで、端末の登録から追跡まで。端末を追加し、リクエストの種類を選び、すべてのリクエストをステータスとともに確認し、一つをタイムラインで追う。デモデータ。下部のバーは切り取っている。',
    emptyAnnotations: [
      'ページは自らが何を収めるかを伝える。完了または取り消しとなった修理の、閲覧専用のアーカイブである。',
      '空の状態は、どうやって埋まっていくかを伝える。リクエストが完了すると、ケースとその最終ステータスがここに残る。',
      'そして、行き止まりではなく次の一歩を示す。',
    ],
    emptyCaption: '教えてくれる空の状態。まだ履歴が一つもないときの修理履歴。デモデータ。',
  },
  status: {
    label: 'ステータス',
    heading: 'ステータスは決して後戻りしない',
    body: [
      '修理や保証のリクエストは、顧客に見える4つの段階 — 登録済み、確認中または修理中、引き渡し準備完了、引き渡し済み — を進む。一方、苦情や質問は確認の後に完了する。すべての変更は、日付と時刻とともにタイムラインに残る。段階を飛ばすこと、後戻りすること、確定したステータスを変えることは、インターフェースで隠すだけでなくサーバー側で拒否され、同じフォームを2回送信しても2つ目のリクエストはできない。',
      'その4つの段階の裏では、本部で6つの段階が進む。受付と振り分け、端末の受領、診断、保証の適用可否の確認、修理と品質管理、そして引き渡しである。顧客に見えるのは4つで、この違いは意図したものだ。パネルはそれを平易な言葉で伝え、表示しているのは大まかな段階だけで、内部の詳細は見えないようにしていると顧客に知らせる。',
    ],
    insight:
      '顧客に示すステータスは決して嘘をつかない。外部システムからの不明な応答は、照合されるまで保留のまま残り、成功として表示されることはない。',
    requestCaption:
      'デスクトップで見るリクエスト。4段階のバー、現在の段階を説明する一文、日付入りのステータス履歴。デモデータ。',
  },
  decisions: {
    heading: '6つの境界線',
    lede: 'デザインの大半は、製品がしないこと、言わないことに関わる。',
    items: [
      {
        title: '推測ではなく、空白とその担当者を示す',
        why: '承認されていない約束を述べるサイトは、それを確約に変えてしまう。未決の項目を、答えを出すべき人とともに表示すれば、未完成のあいだもサイトは正直でいられる。そしてコンテンツの問題を、追跡して片づけられるリストに変えられる。',
        alternatives: 'もっともらしい仮の文章、あるいはセクションを隠す',
        tradeoff: '事業側が答えるまで、サイトは目に見えて未完成に見える。',
      },
      {
        title: '業務パネルではないスタッフパネル',
        why: 'エージェントはすでに既存のサポートシステムで働いており、2つ目を作れば事実が分裂する。スタッフパネルが扱うのは製品が所有するプロセスだけ — 請求書、有効化コード、部品の受領、販売店の審査 — で、そのサイトマップは、チケットの処理待ち列や診断、修理にまで決して広げてはならないと定めている。',
        alternatives: '新しい製品の中にチケット処理を作り直す',
        tradeoff: '2つが接続されるまで、スタッフは2つのシステムで働く。',
      },
      {
        title: 'どの連携も、公開の前提条件にしない',
        why: '接続には3つのレベルを定め、レベル1は独立している。サポートシステムが一度も接続されなくても、何も壊れない。接続がもたらすのは生産性であって、仕事ができるかどうかではない。だから製品の価値は、ほかの誰かの契約を待たない。',
        alternatives: 'すべての連携が稼働してから公開する',
        tradeoff: '契約が結ばれるまでは、手作業での引き継ぎになる。',
      },
      {
        title: '連携はフェイルクローズにする',
        why: '外部システムはすべて一つのゲートウェイ層の背後に置き、7つの境界シナリオでテストしている。成功、検証エラー、タイムアウト、重複、リプレイ、順序の乱れ、そして不明な状態で、最後のものは推測せずに保留のまま残す。本番以外の環境では、認証情報が欠けていればシミュレーターに切り替わる。本番環境では、実際には行われなかった送信を報告するくらいなら、エラーを投げる。',
        alternatives: '楽観的な成功状態',
        tradeoff: 'デザインすべき状態が増え、ユーザーの目に見えるエラーも出る。',
      },
      {
        title: '職務の分離を、書類の上だけでなく製品の中で',
        why: '請求書を発行した人は、高額の取り消しを一人で承認できない。取り消しの上限額を設定する役割は、取り消しを承認できない。自分の上限を自分で引き上げることはできないのである。メニュー、ページのガード、サーバー側のチェックは一つのモジュールを読み込むため、インターフェースとサーバーが権限について食い違うことはない。',
        alternatives: 'マトリクスに描き、慣習で守らせる権限',
        tradeoff: '日常的な操作の一部に、2人目が必要になる。',
      },
      {
        title: '作らなかったものと、その理由を明示する',
        why: 'ウォレットはデータソースがないため外し、サポートチャットは先送りにし、管理レポートは計算式が承認されていないため保留にした。誤った数字は、数字がないより悪い。診断と修理は作業場の仕事であって、ソフトウェアのプロセスではない。',
        alternatives: '暫定の計算式でダッシュボードを公開する',
        tradeoff: '事業側が指標を定義するまで、管理者はレポートを得られない。',
      },
    ],
    staffEvidence:
      'スタッフパネルのホーム。製品が所有する仕事の4つのカウンターがあり、チケットの処理待ち列からは何も入っていない。',
    staffCaption:
      'スタッフパネルの範囲の内側。自らの未決の問いを認める販売店申請 — 申請者の項目はまだ定義されていない — と、発注が製品の外で行われるため2つのステータスだけで追跡される部品。仕入先の名前を記した1行は削除している。',
  },
  next: {
    label: 'この先',
    heading: '市場は顧客にウェブサイトを作ったが、戻ってくる道は作らなかった',
    body: [
      'イランのデジタル製品の保証・修理市場で100社を調べ、そのうち18社を12段階の修理ジャーニーに照らして詳しく評価した調査は、崖を見つけた。最初の5段階はおおむねデジタル化されているが、端末の引き渡しから先はほとんど何もデジタル化されていない。最も進んだプラットフォームでも12段階のうち6段階で、平均は4.1段階である。',
      'この調査による捉え直しはデータモデルについての議論であり、だからこそ製品にまで届く。この市場における情報の単位は、チケットでも請求書でもなく、サービスケースである。一台の端末の生涯全体 — 受付時の状態から、診断、費用の承認、修理、品質管理、返却まで。調査が最初に提示した判断は、顧客がオンラインで承認する明細付きの事前請求書で、調査対象のどの企業も提供していなかった。製品は意図して作業場の入り口で止まっている。その先へ進むべき根拠は、いまや文書になっている。',
    ],
    marketCaption:
      '崖。修理ジャーニーの1〜5段階は、調査したプラットフォーム全体で33〜100%がデジタル化されているが、6〜12段階は0〜11%にとどまる。',
  },
  pages: {
    label: '全ページ',
    heading: '公開サイトを1ページずつ',
    body: [
      '公開サイトの全ページを、2026年9月26日に幅1440ピクセルと幅390ピクセルのスマートフォンで記録した。ホーム、サービス、選ばれる理由、保証規約、顧客憲章、会社概要、代理店申し込み、よくある質問、お問い合わせ、満足度アンケート、ご意見・苦情フォーム、ログインである。',
      '各ページはひとつのシステムに従う。白いページを濃紺の帯が区切り、ホームと「選ばれる理由」には申し込み・点検・修理・引き渡しの同じ4段階の帯があり、スマートフォンでは1列に並び、ナビゲーションはメニューボタンの奥に収まる。会社名と小売企業名、住所、電話番号、店舗の写真、保証カードの見本、保証期間は、記録の前にグレーで隠している。それ以外は一切手を加えていない。',
    ],
    figureCaption: '公開サイトの全ページ。デスクトップとスマートフォンの最初の画面で、各ページを開くと全体を見られる。',
    names: {
      home: 'ホーム',
      services: 'サービス',
      why: '選ばれる理由',
      'warranty-terms': '保証規約',
      'customer-charter': '顧客憲章',
      about: '会社概要',
      dealerships: '代理店申し込み',
      faq: 'よくある質問',
      contact: 'お問い合わせ',
      feedback: '満足度アンケート',
      'feedback-and-complains': 'ご意見・苦情',
      login: 'ログイン',
    },
    alt: {
      desktop: 'Yaravan デスクトップ — {page}、最初の画面',
      mobile: 'Yaravan モバイル — {page}、最初の画面',
      desktopFull: 'Yaravan デスクトップ — {page}、ページ全体',
      mobileFull: 'Yaravan モバイル — {page}、ページ全体',
    },
    masked: '(識別情報は隠している)',
  },
  outcomes: {
    heading: '判断を待つプラットフォーム',
    intro:
      '事業指標はないし、あるべきでもない。プラットフォームはステージング環境にあり、合意した指標にはまだ承認された計算式もデータソースもない。6週間のフェーズ1の目標は達成できなかった。連携を阻んでいる3つの項目 — 既存のサポートシステムへのアクセス、顧客同期の契約、書面によるセキュリティとプライバシーの承認 — はエンジニアリングではなく判断の問題であり、ほかの未決項目はすべて、それぞれ自らの機能だけを止めるよう段階を振り直した。',
    delivered: [
      {
        label: '公開サイト',
        context:
          '8ページ、すべてペルシア語で右から左に組まれ、承認されていない事実はすべて、担当者が明示された未決項目として表示される。',
      },
      {
        label: 'カスタマーパネル',
        context:
          '7つの原則の上に築いた。パスワードなし、デフォルトで非公開、モバイルファースト、そして教えてくれる空の状態。',
      },
      {
        label: 'スタッフパネル',
        context:
          '製品が所有する仕事だけ — 請求書、有効化コード、部品、販売店の審査 — を扱い、職務の分離をコードで強制している。',
      },
      {
        label: 'テスト済みの実装',
        context:
          '26のコレクションと、5つのレベルにわたる92のテストファイル。そしてプッシュのたびに走るCI。',
      },
    ],
    shipped: [
      '公開サイト',
      'カスタマーパネル',
      'スタッフパネル',
      '未確認の主張を示すマーカー',
      'ブランドアセットライブラリ',
      '連携レイヤー',
    ],
  },
  lessons: {
    heading: '製品の、正直なかたち',
    items: [
      {
        title: '空白は、取り繕うより公開するほうがいい',
        body: 'オレンジの破線の枠は、一つのコンポーネントに凝縮したプロジェクトそのものである。コンテンツの問題を、追跡され、担当者が決まり、数えられるリストに変え、まだ未完成のあいだもサイトを正直なものにした。',
      },
      {
        title: '違いは、はっきり口にする',
        body: '「まだ同期されていません」と「保証がありません」は、データベースの中では似て見えるが、顧客にとっては正反対の意味を持つ。4つの段階と6つの段階も同じだ。画面上でその違いを言葉にするのにかかったのは一文で、それで電話が一本減った。',
      },
      {
        title: 'ブランド戦略は製品の仕様書ではない',
        body: '現実と食い違う戦略への対処は、一度だけどちらかを勝たせることではない。どの種類の問いにはどの情報源が優先するかを定め、そして顧客向けの主張は両方の裏付けがなければ公開しないと定めるルールである。',
      },
      {
        title: 'ガードレールは、実装と歩調を合わせなければならない',
        body: 'リポジトリのガイドは、コードベースに26のコレクションが揃い、ステージング環境へデプロイされてからずっと後になっても、アプリケーションのソースを持たないコードベースを記述したままだった。AIの支援を受けた実装を統制する文書は、実装と同じ速さで保守しなければならない。さもなければ、もう存在しないコードベースを統制しはじめる。',
      },
    ],
  },
}

const COPY: Record<Locale, YapCopy> = { en: EN, fa: FA, ar: AR, es: ES, de: DE, fr: FR, ja: JA }

/** A page capture's alt in one locale; every page but sign-in says what is masked. */
const pageAlt = (locale: Locale, page: YapPage, variant: PageVariant) => {
  const copy = COPY[locale].pages
  const alt = copy.alt[variant].replace('{page}', copy.names[page])
  return page === 'login' ? alt : `${alt}${copy.masked}`
}

export const YAP_MEDIA = {
  ...Object.fromEntries(
    (Object.keys(MEDIA_FILES) as YapCropKey[]).map((key) => [
      key,
      {
        ...MEDIA_FILES[key],
        alt: Object.fromEntries(LOCALES.map((locale) => [locale, COPY[locale].alt[key]])),
      },
    ]),
  ),
  ...Object.fromEntries(
    YAP_PAGES.flatMap((page) =>
      PAGE_VARIANT_KEYS.map((variant) => {
        const { dir, ext } = PAGE_VARIANTS[variant]
        const spec: MediaSpec = {
          file: `gallery/${dir}/${page}.${ext}`,
          name: `yaravan-platform--page-${page}--${dir}.${ext}`,
          alt: Object.fromEntries(LOCALES.map((locale) => [locale, pageAlt(locale, page, variant)])),
        }
        return [pageKey(page, variant), spec]
      }),
    ),
  ),
} as Record<YapMediaKey, MediaSpec>

export function yapSections(locale: Locale, media: YapMediaIds): Sections {
  const c = COPY[locale]
  const dir = dirFor(locale)
  const items = (...rows: [YapMediaKey, string][]) =>
    rows.flatMap(([key, id]) => (media[key] ? [{ id, media: media[key]!, caption: '' }] : []))
  const pad = (n: number) => String(n).padStart(2, '0')
  const body = (paragraphs: readonly string[]) =>
    prose(dir, ...paragraphs.map((value) => paragraph(value, dir)))

  return [
    {
      id: 'yap-s01',
      blockType: 'csNarrative',
      label: 'context',
      heading: c.context.heading,
      body: body(c.context.body),
    },
    {
      id: 'yap-s02',
      blockType: 'csNarrative',
      label: 'problem',
      heading: c.problem.heading,
      body: body(c.problem.body),
    },
    {
      id: 'yap-s03',
      blockType: 'csOwnership',
      heading: c.ownership.heading,
      intro: c.ownership.intro,
      own: c.ownership.own,
      coOwn: c.ownership.coOwn,
      collaborate: c.ownership.collaborate,
      note: c.ownership.note,
    },
    {
      id: 'yap-s04',
      blockType: 'csNarrative',
      label: 'approach',
      heading: c.approach.heading,
      body: body(c.approach.body),
      insight: c.approach.insight,
    },
    {
      id: 'yap-s05',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: c.brand.label,
      heading: c.brand.heading,
      body: body(c.brand.body),
    },
    {
      id: 'yap-s06',
      blockType: 'csNarrative',
      label: 'solution',
      heading: c.marker.heading,
      body: body(c.marker.body),
    },
    {
      id: 'yap-s07',
      blockType: 'csFigure',
      layout: 'annotated',
      treatment: 'plain',
      items: items(['pending', 'yap-f07-1']),
      annotations: c.marker.annotations.map((text, index) => ({
        id: `yap-a${pad(index + 1)}`,
        text,
      })),
      caption: c.marker.pendingCaption,
    },
    {
      id: 'yap-s08',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: c.panel.label,
      heading: c.panel.heading,
      body: prose(
        dir,
        paragraph(c.panel.intro, dir),
        bullets([...c.panel.principles], dir),
        paragraph(c.panel.outro, dir),
      ),
    },
    {
      id: 'yap-s09',
      blockType: 'csFigure',
      layout: 'sequence',
      treatment: 'screen',
      items: items(
        ['addDevice', 'yap-f09-1'],
        ['newRequest', 'yap-f09-2'],
        ['requests', 'yap-f09-3'],
        ['request', 'yap-f09-4'],
      ),
      caption: c.panel.flowCaption,
    },
    {
      id: 'yap-s10',
      blockType: 'csFigure',
      layout: 'annotated',
      treatment: 'screen',
      items: items(['empty', 'yap-f10-1']),
      annotations: c.panel.emptyAnnotations.map((text, index) => ({
        id: `yap-a${pad(index + 5)}`,
        text,
      })),
      caption: c.panel.emptyCaption,
    },
    {
      id: 'yap-s11',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: c.status.label,
      heading: c.status.heading,
      body: body(c.status.body),
      insight: c.status.insight,
    },
    {
      id: 'yap-s12',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'plain',
      items: items(['requestDesktop', 'yap-f12-1']),
      caption: c.status.requestCaption,
    },
    {
      id: 'yap-s13',
      blockType: 'csDecisions',
      heading: c.decisions.heading,
      lede: c.decisions.lede,
      items: c.decisions.items.map((decision, index) => ({
        id: `yap-d${pad(index + 1)}`,
        title: decision.title,
        why: decision.why,
        alternatives: decision.alternatives,
        tradeoff: decision.tradeoff,
        ...(index === 1
          ? { evidence: c.decisions.staffEvidence, ...(media.staff ? { media: media.staff } : {}) }
          : {}),
      })),
    },
    {
      id: 'yap-s14',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'plain',
      items: items(['dealership', 'yap-f14-1'], ['parts', 'yap-f14-2']),
      caption: c.decisions.staffCaption,
    },
    {
      id: 'yap-s15',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: c.next.label,
      heading: c.next.heading,
      body: body(c.next.body),
    },
    {
      id: 'yap-s16',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'plain',
      items: items(['market', 'yap-f16-1']),
      caption: c.next.marketCaption,
    },
    {
      id: 'yap-s19',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: c.pages.label,
      heading: c.pages.heading,
      body: body(c.pages.body),
      insight: '',
    },
    {
      id: 'yap-s20',
      blockType: 'csFigure',
      layout: 'pages',
      treatment: 'plain',
      items: YAP_PAGES.flatMap((page, index) => {
        const desktop = media[pageKey(page, 'desktop')]
        if (!desktop) return []
        return [
          {
            id: `yap-g${pad(index + 1)}`,
            media: desktop,
            mobile: media[pageKey(page, 'mobile')] ?? null,
            full: media[pageKey(page, 'desktopFull')] ?? null,
            mobileFull: media[pageKey(page, 'mobileFull')] ?? null,
            caption: c.pages.names[page],
          },
        ]
      }),
      annotations: [],
      caption: c.pages.figureCaption,
    },
    {
      id: 'yap-s17',
      blockType: 'csOutcomes',
      heading: c.outcomes.heading,
      intro: c.outcomes.intro,
      items: c.outcomes.delivered.map((outcome, index) => ({
        id: `yap-o${pad(index + 1)}`,
        kind: 'delivered' as const,
        label: outcome.label,
        context: outcome.context,
      })),
      shipped: c.outcomes.shipped,
    },
    {
      id: 'yap-s18',
      blockType: 'csLessons',
      heading: c.lessons.heading,
      items: c.lessons.items.map((lesson, index) => ({
        id: `yap-l${pad(index + 1)}`,
        title: lesson.title,
        body: lesson.body,
      })),
    },
  ]
}

export function yapLocalizedFields(locale: Locale, media: YapMediaIds) {
  const c = COPY[locale]
  const identity = ARCHIVE.text(locale)
  return {
    ...identity,
    statement: c.statement,
    industry: c.industry,
    team: c.team,
    hero: {
      items: media.home ? [{ id: 'yap-h01', media: media.home }] : [],
      caption: c.heroCaption,
    },
    snapshot: c.snapshot,
    sections: yapSections(locale, media),
    meta: {
      title: identity.title,
      description: identity.summary,
      ...(media.cover ? { image: media.cover } : {}),
    },
  }
}

export const YAP_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  projectStatus: 'pre-launch',
  tools: [
    'Payload',
    'Next.js',
    'PostgreSQL',
    'Tailwind CSS',
    'Docker',
    'Coolify',
    'Playwright',
    'Vitest',
  ],
  period: { start: '2026-07-01T00:00:00.000Z' },
}
