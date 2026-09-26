import type { Project } from '@/payload-types'
import { dirFor, LOCALES, type Locale } from '@/utilities/locale'

import type { MediaSpec } from '../media'
import { archiveIdentity } from './archive'
import { paragraph, prose } from './lexical'

/**
 * Marqevon (`/work/marqevon`) — a seven-locale corporate site for a physical petroleum trading
 * principal, deployed but not launched. Every sentence comes from
 * `Docs/Experience/Projects/marqevon/README.md`, corrected 2026-09-24 against the source repository.
 *
 * Publication gates (held here and in `tests/int/case-study-seeds.int.spec.ts`):
 * - Product name only: no real identity, registration, licence or regulatory position, and no
 *   competitor names.
 * - No market prices or price-feed names: every home-page figure is cropped above the market
 *   snapshot, and the price-feed integration is not described.
 * - No server address, domain or launch claim; the site is presented as not launched.
 * - Client feedback is paraphrased, never quoted.
 * - Evidence is crops of the 2026-09-22 captures, type only: no stock photography, no empty frames.
 *   The one exception, asked for by Sina on 2026-09-26, is the `pages` figure: every English page
 *   of the 2026-09-26 capture, first screens and whole pages, photography included. The home
 *   page's market-price panel is masked in the page itself before capture.
 *
 * Copy lives in one `Copy` object per locale; the sections builder is a pure template over it, so
 * a missing string or a wrong tuple length is a type error. Shared fields (codes, values, media,
 * layout, treatment) live in the builder and are identical in every locale.
 */
export const MQV_SLUG = 'marqevon'
export const MQV_ASSETS = 'Docs/Experience/Projects/marqevon/assets'
export const MQV_LOCALES = LOCALES

const ARCHIVE = archiveIdentity(MQV_SLUG)

const MEDIA_FILES = {
  cover: { file: 'crops/cover.png', name: ARCHIVE.row.cover.name },
  home: { file: 'crops/hero.png', name: 'marqevon--desktop-home.png' },
  faq: { file: 'crops/faq.png', name: 'marqevon--desktop-faq.png' },
  procedure: { file: 'crops/procedure.png', name: 'marqevon--desktop-procedure.png' },
  manifest: { file: 'crops/manifest.png', name: 'marqevon--desktop-governance-manifest.png' },
  products: { file: 'crops/products.png', name: 'marqevon--desktop-products.png' },
  trackRecord: { file: 'crops/track.png', name: 'marqevon--desktop-track-record.png' },
  team: { file: 'crops/team.png', name: 'marqevon--desktop-team.png' },
  homeFa: { file: 'crops/home-fa.png', name: 'marqevon--desktop-home-fa.png' },
  homeAr: { file: 'crops/home-ar.png', name: 'marqevon--desktop-home-ar.png' },
} as const

/**
 * Every English page of the deployment in information-architecture order: the `pages` figure
 * (DS-25). `gallery/` holds the exports of `capture-2026-09-26/`. The screening article's key
 * leaves out the gated word; its capture keeps the real slug.
 */
export const MQV_PAGES = [
  'home',
  'about',
  'team',
  'track-record',
  'products',
  'petroleum-derivatives',
  'how-we-work',
  'procedure',
  'capabilities',
  'compliance',
  'governance',
  'sustainability',
  'faq',
  'insights',
  'insights--verify-oil-trading-counterparty',
  'insights--inspection-sampling-certificates',
  'insights--oil-trade-documents-checklist',
  'insights--product-specifications-guide',
  'insights--en-590-diesel-specification',
  'insights--jet-a1-specification',
  'insights--iso-8217-fuel-oil-bunkers',
  'insights--incoterms-oil-products',
  'insights--reading-the-diesel-curve',
  'insights--letters-of-credit-plainly',
  'insights--screening-discipline',
  'insights--inspection-at-custody-transfer',
  'careers',
  'careers--distillates-trader',
  'careers--operations-analyst',
  'contact',
  'qualify',
  'legal--terms',
  'legal--privacy',
  'legal--cookies',
] as const
export type MqvPage = (typeof MQV_PAGES)[number]

/** First screens are WebP; whole pages are JPEG, since a phone page can pass WebP's 16,383 px. */
const PAGE_VARIANTS = {
  desktop: { dir: 'desktop', ext: 'webp' },
  mobile: { dir: 'mobile', ext: 'webp' },
  desktopFull: { dir: 'desktop-full', ext: 'jpg' },
  mobileFull: { dir: 'mobile-full', ext: 'jpg' },
} as const
type PageVariant = keyof typeof PAGE_VARIANTS
const PAGE_VARIANT_KEYS = Object.keys(PAGE_VARIANTS) as PageVariant[]
type PageMediaKey = `page:${MqvPage}:${PageVariant}`
const pageKey = (page: MqvPage, variant: PageVariant): PageMediaKey => `page:${page}:${variant}`

type MqvCropKey = keyof typeof MEDIA_FILES
export type MqvMediaKey = MqvCropKey | PageMediaKey
type MqvMediaIds = Partial<Record<MqvMediaKey, string>>
type Sections = NonNullable<Project['sections']>

type Two<T = string> = [T, T]
type Three<T = string> = [T, T, T]
type Four<T = string> = [T, T, T, T]
type Five<T = string> = [T, T, T, T, T]
type Six<T = string> = [T, T, T, T, T, T]

export interface MqvCopy {
  statement: string
  industry: string
  team: string
  heroCaption: string
  snapshot: { problem: string; role: string; result: string }
  alt: Record<MqvCropKey, string>
  context: { heading: string; body: Two }
  problem: { heading: string; body: Two }
  question: { text: string; attribution: string; method: string }
  research: { heading: string; body: Two; figureCaption: string }
  approach: {
    heading: string
    body: Two
    insight: string
    processHeading: string
    steps: Four<{ label: string; note: string }>
    figureCaption: string
  }
  solution: {
    heading: string
    body: Three
    annotations: Four
    manifestCaption: string
    figureItems: Two
    figureCaption: string
  }
  decisions: {
    heading: string
    lede: string
    items: Five<{ title: string; why: string; alternatives: string; tradeoff: string }>
    teamEvidence: string
  }
  locales: { label: string; heading: string; body: Two; figureItems: Two; figureCaption: string }
  pages: {
    label: string
    heading: string
    body: Two
    figureCaption: string
    /** Each page's name, as the index and the viewer show it. */
    names: Record<MqvPage, string>
    /** Alt templates; `{page}` is the page's name. */
    alt: Record<PageVariant, string>
    /** Appended to the home page's whole-page alts. */
    masked: string
  }
  outcomes: {
    heading: string
    intro: string
    measured: Two<{ label: string; context: string; source: string }>
    delivered: Two<{ label: string; context: string }>
    shipped: Six
  }
  lessons: { heading: string; items: Four<{ title: string; body: string }> }
}

const EN: MqvCopy = {
  statement:
    'A seven-locale site for a petroleum trading principal, built to answer one question in the first screen: is this firm real and checkable?',
  industry: 'Energy · physical commodity trading',
  team: 'Sole designer and developer',
  heroCaption:
    'The English home page: the product scope in one sentence, and the legal name still marked to be supplied.',
  snapshot: {
    problem:
      'Fraudulent brokers share a dialect, and a real firm that echoes it reads as one of them.',
    role: 'Designer and builder: benchmark, information architecture, design system, seven-locale content model, build and CI guards.',
    result:
      'Deployed but not launched: seven locales in exact key parity and two CI guards, with identity facts still placeholders.',
  },
  alt: {
    cover: ARCHIVE.row.cover.alt,
    home: 'Marqevon on desktop — the English home page, “We source, ship, finance, and deliver specified petroleum products”, over a map of shipping lanes',
    faq: 'Marqevon on desktop — the FAQ list, closing on a “What we don’t do” group about leased bank instruments and below-market discounts',
    procedure:
      'Marqevon on desktop — seven numbered steps shared by every delivery mode, from qualification to reconciliation',
    manifest:
      'Marqevon on desktop — the governance manifest, a monospace table of identity facts with registry and LEI chips and values still to be supplied',
    products:
      'Marqevon on desktop — three products listed by specification: EN 590 diesel, Jet A-1 and naphtha',
    trackRecord:
      'Marqevon on desktop — the rule for publishing a track record: only after commercial and legal validation, without counterparty names',
    team: 'Marqevon on desktop — a note in place of a team: named people are published only after business and legal validation',
    homeFa:
      'Marqevon on desktop — the Persian home page, mirrored right to left with the navigation reversed',
    homeAr: 'Marqevon on desktop — the Arabic home page, mirrored right to left',
  },
  context: {
    heading: 'A principal, not a broker',
    body: [
      'Marqevon is a physical petroleum trading principal: it buys from producers and refiners and delivers to refiners, distributors, airlines, utilities and industrial users. Its site speaks to counterparties first, then banks and trade-finance partners, then candidates, then press and regulators.',
      'The work was spec-driven from the start. A 46 KB specification fixed the information architecture, the design system and all 15 pages before the build, and it opens by rejecting the usual brief: in this industry a website’s job is not marketing, it is projecting verifiable legitimacy.',
    ],
  },
  problem: {
    heading: 'The fraud channel has a dialect',
    body: [
      'Physical commodity trading has a fraud problem, and the fraud has a vocabulary: informal brokers announce themselves with a recognisable set of instrument acronyms and mandate titles — TTT, TTV, DTA, ATB. A legitimate mid-size principal that uses any of it reads as one of them.',
      'So the whole site had to answer one question, in seven languages, two of them written right to left.',
    ],
  },
  question: {
    text: '“Is this entity real and checkable, or is it another broker-chain front? Design so the answer is obvious within the first screen.”',
    attribution: 'The information-architecture and design specification',
    method: 'Written before the build, as the test for every page',
  },
  research: {
    heading: 'Whitespace the majors don’t market',
    body: [
      'A competitive benchmark scored the intended design against the largest trading houses and a set of mid-size peers. The gap it found was worth owning: none of the majors explicitly markets an anti-fraud position, or says what it will not do.',
      'That finding became structure rather than a slogan: a “What we don’t do” group in the FAQ, an open welcome to independent verification, and a list of terms the copy must never use.',
    ],
    figureCaption:
      'The FAQ ends on what the firm will not do: leased bank instruments, off-market set-asides, guaranteed below-market discounts.',
  },
  approach: {
    heading: 'A precision instrument for a market built on trust',
    body: [
      'The specification fixed the direction in one line — “Precision instrument for a market built on trust” — somewhere between an institutional energy desk and a verified inspection document, and named what to avoid: cream with a serif and terracotta, black with acid green, and hairlines as the whole aesthetic.',
      'The work ran benchmark, specification, build, then one round of client feedback, and the feedback was audited against the code before any of it was applied.',
    ],
    insight:
      'Of roughly 67 instructions in the client’s feedback, 33 survived the audit as cards; 8 needed a correction first, 22 were blocked on open decisions, and 4 were questions.',
    processHeading: 'Four passes, each one written down',
    steps: [
      {
        label: 'Benchmark',
        note: 'The majors and mid-size peers, scored against the intended design',
      },
      { label: 'Specification', note: 'Information architecture, design system and 15 pages' },
      { label: 'Build', note: 'Payload and Next.js in seven locales, with two CI guards' },
      { label: 'Feedback', note: 'A Persian feedback document turned into audited cards' },
    ],
    figureCaption:
      'One shared sequence for every delivery mode: independently verifiable evidence comes before any financial commitment.',
  },
  solution: {
    heading: 'The Ledger Reference System',
    body: [
      'The specification says where to spend: “Spend the boldness here; keep everything else quiet.” The signature has three parts — reference chips attached to credibility claims, data manifests set as hairline-ruled monospace inspection certificates, and a monospace identity bar at the foot of every page.',
      'The palette is built for it: an abyssal petroleum ground, maritime steel, document paper, brass as the one accent, a verified teal kept well away from acid green, and rust for red flags only. IBM Plex Mono carries every number, reference and chip.',
      'Underneath: Payload 3.85 and Next.js 16.2 with next-intl on MongoDB — 10 collections and 4 globals — served through nginx, with a buyer-qualification intake that scores each enquiry and flags it for the desk.',
    ],
    annotations: [
      'Each identity fact is a row with a named basis, not a sentence of reassurance.',
      'Unconfirmed values stay visibly unconfirmed: “to be supplied”.',
      'Reference chips mark what a counterparty can check: a company registry, the global LEI index.',
      'Set in IBM Plex Mono, like an inspection certificate.',
    ],
    manifestCaption:
      'The governance manifest: the firm’s identity as a checkable table, every unconfirmed value left as a placeholder.',
    figureItems: [
      'Products: three grades, each defined by its specification.',
      'Track record: published only after commercial and legal validation, never with counterparty names.',
    ],
    figureCaption: 'Claims the firm can stand behind, and rules for the ones it cannot yet.',
  },
  decisions: {
    heading: 'Five decisions about trust',
    lede: 'Most of them are about what the site refuses to say.',
    items: [
      {
        title: 'Spend the boldness in one place',
        why: 'A trading firm that looks designed reads as marketing. The signature system carries all the visual confidence and every other surface stays quiet, so the manifests are what a reader remembers.',
        alternatives: 'A bold brand across every surface',
        tradeoff: 'The site looks sparse to anyone expecting a campaign.',
      },
      {
        title: 'Make the rules fail the build',
        why: 'Two guards run in CI. One fails on the fraud channel’s vocabulary and on American spelling in the site’s copy; the other on physical-direction layout utilities, hard-coded fonts and untranslated strings. The second has already caught a real miss: an accessible label that escaped translation.',
        alternatives: 'A written style guide',
        tradeoff: 'A guard protects only the files it reads.',
      },
      {
        title: 'Escalate legal exposure instead of deciding it',
        why: 'Questions that carried legal exposure were not the designer’s to settle. They went to the client in a written memo, and one recommended wording was declined there in favour of contract-qualified, non-promissory language.',
        alternatives: 'Settle the wording in the copy',
        tradeoff: 'Pages wait on answers the build cannot supply.',
      },
      {
        title: 'Audit client feedback before applying it',
        why: 'A four-page Persian feedback document became a board of cards, each quoting the request with a translation and checked against the real code first. Requests that rested on a wrong premise were corrected before anyone built them.',
        alternatives: 'Apply the feedback as written',
        tradeoff: 'A slower first response, and fewer changes to undo.',
      },
      {
        title: 'Leave placeholders rather than invent identity',
        why: 'A legal name, registrations and the people behind a firm are facts, not design. Each stays visibly “to be supplied” until the firm confirms it, and the team page says in plain words that only real people will be published.',
        alternatives: 'Plausible sample names and numbers',
        tradeoff: 'The site cannot launch until the firm supplies them.',
      },
    ],
    teamEvidence: 'The team page, in place of a team: publish real people only.',
  },
  locales: {
    label: 'Seven locales',
    heading: 'Seven locales, two right to left',
    body: [
      'English, French, Arabic, Spanish, Japanese, Chinese and Persian carry every message key in exact parity — 222 keys in each file at the last commit. Arabic and Persian run on CSS logical properties, so the layout mirrors instead of being rebuilt.',
      'Two details only showed up in use. A per-language font swap written inside a cascade layer was silently overridden, so it now sits outside the layers; and the manifests use tabular numerals, so monospace columns still align under right-to-left and CJK text.',
    ],
    figureItems: ['Persian: the same hero, mirrored.', 'Arabic: the same hero, mirrored.'],
    figureCaption:
      'Both right-to-left locales, navigation included, from the same components as the English.',
  },
  pages: {
    label: 'Every page',
    heading: 'Thirty-four pages, one system',
    body: [
      'Every English page of the deployment, captured on 26 September 2026 at 1,440 pixels wide and on a 390-pixel phone: the sixteen top-level pages, the buyer-qualification intake, two career postings, twelve insight articles and three legal pages.',
      'The interior pages carry the same hairline data manifests and monospace identity bar as the signature ones, and on a phone each page stacks into a single column, the navigation behind a menu button. On the home page, the market-price panel is masked.',
    ],
    figureCaption: 'Every English page, first screen at desktop and phone width; open any page to see all of it.',
    names: {
      home: 'Home',
      about: 'About',
      team: 'Team & leadership',
      'track-record': 'Track record',
      products: 'Products',
      'petroleum-derivatives': 'Petroleum derivatives',
      'how-we-work': 'How we work',
      procedure: 'Procedure',
      capabilities: 'Capabilities',
      compliance: 'Compliance & KYC',
      governance: 'Governance',
      sustainability: 'Responsibility',
      faq: 'FAQ',
      insights: 'Insights',
      'insights--verify-oil-trading-counterparty': 'Insights · Verifying a counterparty',
      'insights--inspection-sampling-certificates': 'Insights · Inspection, sampling and certificates',
      'insights--oil-trade-documents-checklist': 'Insights · Trade documents checklist',
      'insights--product-specifications-guide': 'Insights · Product specifications guide',
      'insights--en-590-diesel-specification': 'Insights · EN 590 diesel specification',
      'insights--jet-a1-specification': 'Insights · Jet A-1 specification',
      'insights--iso-8217-fuel-oil-bunkers': 'Insights · ISO 8217 fuel oil and bunkers',
      'insights--incoterms-oil-products': 'Insights · Incoterms for petroleum cargoes',
      'insights--reading-the-diesel-curve': 'Insights · Reading the diesel curve',
      'insights--letters-of-credit-plainly': 'Insights · Letters of credit, plainly',
      'insights--screening-discipline': 'Insights · Screening as an operating discipline',
      'insights--inspection-at-custody-transfer': 'Insights · Inspection at custody transfer',
      careers: 'Careers',
      'careers--distillates-trader': 'Careers · Distillates trader',
      'careers--operations-analyst': 'Careers · Operations analyst',
      contact: 'Contact',
      qualify: 'Buyer qualification',
      'legal--terms': 'Legal · Terms of use',
      'legal--privacy': 'Legal · Privacy policy',
      'legal--cookies': 'Legal · Cookie policy',
    },
    alt: {
      desktop: 'Marqevon on desktop — {page}, the first screen',
      mobile: 'Marqevon on mobile — {page}, the first screen',
      desktopFull: 'Marqevon on desktop — {page}, the whole page',
      mobileFull: 'Marqevon on mobile — {page}, the whole page',
    },
    masked: ', with the market-price panel masked',
  },
  outcomes: {
    heading: 'Deployed, not launched',
    intro:
      'The site is deployed and serving, but not launched: it has no domain, stays out of search on purpose, and its identity facts are still placeholders. The applied feedback sits in an unpushed commit, not on the server. There is no analytics, only container health checks.',
    measured: [
      {
        label: 'Integration tests passing',
        context: 'Beside lint, both guards and a production build, on the feedback branch.',
        source: 'Design-feedback board, 7 September 2026',
      },
      {
        label: 'Feedback cards applied in code',
        context: 'One held on an open decision; none yet verified on a running app.',
        source: 'Design-feedback roadmap',
      },
    ],
    delivered: [
      {
        label: 'Restore-verified backups',
        context:
          'Nightly, each one restored to prove it works, plus a recovery package before any release that migrates content.',
      },
      {
        label: 'An immutable-image deploy path',
        context:
          'Releases ship as fixed images; the mutable latest tag and polled updates are retired.',
      },
    ],
    shipped: [
      'Seven locales in parity',
      'Two CI guards',
      'Governance manifest',
      'Buyer-qualification intake',
      'Reference chips',
      'Right-to-left layouts',
    ],
  },
  lessons: {
    heading: 'The trust device that didn’t do anything',
    items: [
      {
        title: 'The most useful output was a lint rule',
        body: 'Encoding “don’t speak the fraud channel’s dialect” as a guard moved it from an intention someone has to remember into a property of the repository.',
      },
      {
        title: 'A guard protects only what it reads',
        body: 'The content guard scans copy and message files, not the form’s option lists, so the buyer-qualification form still offers two of the banned terms as delivery options. On the one page where the firm screens others, it speaks the dialect it forbids.',
      },
      {
        title: 'A trust device has to do something',
        body: 'The reference chips name a registry or the LEI index but link to neither. Until they point at a real record, the signature device only looks like verification — the exact failure the project set out to avoid.',
      },
      {
        title: 'Confirm structural decisions in writing first',
        body: 'Seven locales shipped weeks before a client governance document called the language question undecided. Keeping them was right, since deleting finished, guarded work is the costlier mistake, but the decision belonged in writing before the keys existed.',
      },
    ],
  },
}

// Locale packs beyond EN land here when translated; until then every locale reads EN so tsc
// and the seven-locale seed stay green.
const FA: MqvCopy = {
  statement:
    'سایتی به هفت زبان برای یک معامله‌گر اصیل فرآورده‌های نفتی، ساخته‌شده تا در همان صفحهٔ نخست به یک پرسش پاسخ دهد: آیا این شرکت واقعی و قابل راستی‌آزمایی است؟',
  industry: 'انرژی · تجارت فیزیکی کالا',
  team: 'تنها طراح و توسعه‌دهنده',
  heroCaption:
    'صفحهٔ اصلی انگلیسی: دامنهٔ محصولات در یک جمله، و نام حقوقی که هنوز با «بعداً اعلام می‌شود» مشخص شده است.',
  snapshot: {
    problem:
      'دلال‌های متقلب به یک گویش حرف می‌زنند، و شرکت واقعی‌ای که همان گویش را تکرار کند، یکی از آن‌ها به نظر می‌رسد.',
    role: 'طراح و سازنده: بنچمارک رقابتی، معماری اطلاعات، سیستم طراحی، مدل محتوای هفت‌زبانه، ساخت و نگهبان‌های CI.',
    result:
      'مستقر شده اما راه‌اندازی نشده: هفت زبان با برابری دقیق کلیدها و دو نگهبان CI، در حالی که اطلاعات هویتی هنوز جای‌نگهدارند.',
  },
  alt: {
    cover:
      'Marqevon — صفحهٔ روند معامله، «یک معامله بسته به شیوهٔ تحویل چگونه پیش می‌رود»، بر زمینه‌ای تیره به رنگ نفت',
    home: 'Marqevon روی دسکتاپ — صفحهٔ اصلی انگلیسی، «ما فرآورده‌های نفتی با مشخصات معین را تهیه، حمل، تأمین مالی و تحویل می‌کنیم»، بر نقشه‌ای از مسیرهای کشتیرانی',
    faq: 'Marqevon روی دسکتاپ — فهرست پرسش‌های متداول، که با گروه «آنچه انجام نمی‌دهیم» دربارهٔ ابزارهای بانکی اجاره‌ای و تخفیف‌های زیر قیمت بازار به پایان می‌رسد',
    procedure:
      'Marqevon روی دسکتاپ — هفت گام شماره‌دار که همهٔ شیوه‌های تحویل در آن مشترک‌اند، از احراز صلاحیت تا تطبیق حساب‌ها',
    manifest:
      'Marqevon روی دسکتاپ — مانیفست حاکمیت، جدولی با قلم تک‌فاصله از اطلاعات هویتی، با برچسب‌های مرجع ثبت شرکت‌ها و LEI و مقادیری که هنوز «بعداً اعلام می‌شود»',
    products:
      'Marqevon روی دسکتاپ — سه محصول که با مشخصات فنی‌شان فهرست شده‌اند: گازوئیل EN 590، سوخت Jet A-1 و نفتا',
    trackRecord:
      'Marqevon روی دسکتاپ — قاعدهٔ انتشار سوابق کاری: تنها پس از تأیید تجاری و حقوقی، و بدون نام طرف‌های معامله',
    team: 'Marqevon روی دسکتاپ — یادداشتی به جای معرفی تیم: نام افراد تنها پس از تأیید تجاری و حقوقی منتشر می‌شود',
    homeFa: 'Marqevon روی دسکتاپ — صفحهٔ اصلی فارسی، آینه‌شده به‌صورت راست‌به‌چپ با ناوبری معکوس',
    homeAr: 'Marqevon روی دسکتاپ — صفحهٔ اصلی عربی، آینه‌شده به‌صورت راست‌به‌چپ',
  },
  context: {
    heading: 'معامله‌گر اصیل، نه دلال',
    body: [
      'Marqevon یک معامله‌گر اصیل (نه دلال) در تجارت فیزیکی فرآورده‌های نفتی است: از تولیدکنندگان و پالایشگاه‌ها می‌خرد و به پالایشگاه‌ها، توزیع‌کنندگان، شرکت‌های هواپیمایی، شرکت‌های خدمات عمومی و مصرف‌کنندگان صنعتی تحویل می‌دهد. سایت آن پیش از همه با طرف‌های معامله سخن می‌گوید، سپس با بانک‌ها و شرکای تأمین مالی تجاری، بعد با متقاضیان استخدام، و در پایان با مطبوعات و نهادهای ناظر.',
      'کار از آغاز بر پایهٔ مشخصات پیش رفت. یک مشخصات‌نامهٔ ۴۶ کیلوبایتی پیش از ساخت، معماری اطلاعات، سیستم طراحی و هر ۱۵ صفحه را تثبیت کرد، و با کنار گذاشتن بریف معمول آغاز می‌شود: در این صنعت کار وب‌سایت بازاریابی نیست، بلکه نمایش مشروعیتی است که بتوان آن را راستی‌آزمایی کرد.',
    ],
  },
  problem: {
    heading: 'کانال تقلب گویش خودش را دارد',
    body: [
      'تجارت فیزیکی کالا با مشکل تقلب روبه‌روست، و این تقلب واژگان خودش را دارد: دلال‌های غیررسمی خود را با مجموعه‌ای آشنا از سرواژه‌های ابزارهای مالی و عنوان‌های نمایندگی معرفی می‌کنند — TTT، TTV، DTA، ATB. معامله‌گر اصیل مشروع و میان‌اندازه‌ای که هر یک از این‌ها را به کار ببرد، یکی از آن‌ها به نظر می‌رسد.',
      'پس کل سایت باید به یک پرسش پاسخ می‌داد، به هفت زبان، که دو تای آن‌ها راست‌به‌چپ نوشته می‌شوند.',
    ],
  },
  question: {
    text: '«آیا این نهاد واقعی و قابل راستی‌آزمایی است، یا پوشش زنجیرهٔ دلالی دیگری است؟ طوری طراحی کنید که پاسخ در همان صفحهٔ نخست آشکار باشد.»',
    attribution: 'مشخصات‌نامهٔ معماری اطلاعات و طراحی',
    method: 'پیش از ساخت نوشته شد، به‌عنوان محک هر صفحه',
  },
  research: {
    heading: 'فضای خالی‌ای که بزرگان بازار تبلیغش را نمی‌کنند',
    body: [
      'یک بنچمارک رقابتی، طراحی موردنظر را در برابر بزرگ‌ترین شرکت‌های بازرگانی و گروهی از همتایان میان‌اندازه سنجید. شکافی که یافت ارزش تصاحب داشت: هیچ‌یک از بزرگان بازار به‌صراحت موضعی ضدتقلب را تبلیغ نمی‌کند، یا نمی‌گوید چه کارهایی را انجام نخواهد داد.',
      'این یافته به ساختار تبدیل شد، نه شعار: گروه «آنچه انجام نمی‌دهیم» در پرسش‌های متداول، دعوتی آشکار به راستی‌آزمایی مستقل، و فهرستی از اصطلاحاتی که متن سایت هرگز نباید به کار ببرد.',
    ],
    figureCaption:
      'پرسش‌های متداول با آنچه شرکت انجام نخواهد داد پایان می‌یابد: ابزارهای بانکی اجاره‌ای، سهمیه‌های خارج از بازار، و تخفیف‌های تضمینی زیر قیمت بازار.',
  },
  approach: {
    heading: 'ابزاری دقیق برای بازاری که بر اعتماد بنا شده است',
    body: [
      'مشخصات‌نامه جهت کار را در یک سطر تثبیت کرد — «ابزاری دقیق برای بازاری که بر اعتماد بنا شده است» — جایی میان میز معاملات یک نهاد انرژی و یک سند بازرسی تأییدشده، و آنچه باید از آن پرهیز کرد را نام برد: کرم با قلم سریف و رنگ سفالی، مشکی با سبز اسیدی، و خطوط مویی به‌عنوان تمام زیبایی‌شناسی.',
      'کار به ترتیب از بنچمارک رقابتی، مشخصات‌نامه و ساخت گذشت و سپس به یک دور بازخورد کارفرما رسید، و آن بازخورد پیش از اعمال هر بخشی از آن، در برابر کد ممیزی شد.',
    ],
    insight:
      'از حدود ۶۷ دستورالعمل در بازخورد کارفرما، ۳۳ مورد از ممیزی گذشتند و به کارت تبدیل شدند؛ ۸ مورد نخست به اصلاح نیاز داشتند، ۲۲ مورد در انتظار تصمیم‌های باز ماندند، و ۴ مورد پرسش بودند.',
    processHeading: 'چهار مرحله، هر کدام مکتوب',
    steps: [
      {
        label: 'بنچمارک رقابتی',
        note: 'بزرگان بازار و همتایان میان‌اندازه، سنجیده در برابر طراحی موردنظر',
      },
      { label: 'مشخصات‌نامه', note: 'معماری اطلاعات، سیستم طراحی و ۱۵ صفحه' },
      { label: 'ساخت', note: 'Payload و Next.js به هفت زبان، با دو نگهبان CI' },
      { label: 'بازخورد', note: 'یک سند بازخورد فارسی که به کارت‌های ممیزی‌شده تبدیل شد' },
    ],
    figureCaption:
      'یک توالی مشترک برای همهٔ شیوه‌های تحویل: شواهدی که به‌طور مستقل قابل راستی‌آزمایی‌اند، پیش از هر تعهد مالی می‌آیند.',
  },
  solution: {
    heading: 'سامانهٔ مرجع دفتری',
    body: [
      'مشخصات‌نامه می‌گوید جسارت را کجا خرج کنیم: «جسارت را این‌جا خرج کن؛ همه‌چیز دیگر را آرام نگه دار.» این امضای بصری سه بخش دارد — برچسب‌های مرجع که به ادعاهای اعتبار پیوست می‌شوند، مانیفست‌های داده که به شکل گواهی‌های بازرسی با قلم تک‌فاصله و خطوط مویی چیده می‌شوند، و یک نوار هویت با قلم تک‌فاصله در پای هر صفحه.',
      'پالت رنگ برای همین ساخته شده است: زمینه‌ای به رنگ نفتِ اعماق، فولاد دریایی، کاغذ اسناد، برنجی به‌عنوان تنها رنگ تأکیدی، سبزآبیِ «تأییدشده» که فاصلهٔ زیادی از سبز اسیدی دارد، و رنگ زنگ‌آهن فقط برای نشانه‌های هشدار. IBM Plex Mono همهٔ اعداد، مرجع‌ها و برچسب‌ها را حمل می‌کند.',
      'در زیر آن: Payload 3.85 و Next.js 16.2 با next-intl روی MongoDB — ۱۰ کالکشن و ۴ گلوبال — که از طریق nginx ارائه می‌شود، همراه با فرم احراز صلاحیت خریدار که به هر درخواست امتیاز می‌دهد و آن را برای میز معاملات علامت‌گذاری می‌کند.',
    ],
    annotations: [
      'هر واقعیت هویتی یک ردیف با مبنایی مشخص است، نه جمله‌ای برای اطمینان‌بخشی.',
      'مقادیر تأییدنشده آشکارا تأییدنشده می‌مانند: «بعداً اعلام می‌شود».',
      'برچسب‌های مرجع نشان می‌دهند طرف معامله چه چیزی را می‌تواند بررسی کند: ثبت شرکت‌ها، نمایهٔ جهانی LEI.',
      'حروف‌چینی‌شده با IBM Plex Mono، مانند یک گواهی بازرسی.',
    ],
    manifestCaption:
      'مانیفست حاکمیت: هویت شرکت به‌صورت جدولی قابل بررسی، که هر مقدار تأییدنشده‌اش به‌صورت جای‌نگهدار باقی مانده است.',
    figureItems: [
      'محصولات: سه گرید، هر یک تعریف‌شده با مشخصات فنی خود.',
      'سوابق کاری: تنها پس از تأیید تجاری و حقوقی منتشر می‌شود، و هرگز با نام طرف‌های معامله.',
    ],
    figureCaption:
      'ادعاهایی که شرکت می‌تواند پشتشان بایستد، و قاعده‌هایی برای آن‌هایی که هنوز نمی‌تواند.',
  },
  decisions: {
    heading: 'پنج تصمیم دربارهٔ اعتماد',
    lede: 'بیشترشان دربارهٔ چیزهایی است که سایت از گفتنشان سر باز می‌زند.',
    items: [
      {
        title: 'جسارت را در یک جا خرج کن',
        why: 'شرکت بازرگانی‌ای که «طراحی‌شده» به نظر برسد، بازاریابی خوانده می‌شود. سامانهٔ امضا تمام اعتمادبه‌نفس بصری را بر دوش می‌کشد و هر سطح دیگری آرام می‌ماند، تا آنچه در ذهن خواننده می‌ماند مانیفست‌ها باشند.',
        alternatives: 'برندی پرجسارت در همهٔ سطوح',
        tradeoff: 'سایت برای کسی که انتظار یک کمپین تبلیغاتی دارد، خلوت به نظر می‌رسد.',
      },
      {
        title: 'نقض قاعده، ساخت را متوقف کند',
        why: 'دو نگهبان در CI اجرا می‌شوند. یکی با دیدن واژگان کانال تقلب و املای آمریکایی در متن سایت خطا می‌دهد؛ دیگری با ابزارهای چیدمانی وابسته به جهت فیزیکی، قلم‌های سخت‌کدشده و رشته‌های ترجمه‌نشده. دومی تاکنون یک جاافتادگی واقعی را گرفته است: برچسب دسترس‌پذیری‌ای که از ترجمه جا مانده بود.',
        alternatives: 'یک راهنمای سبک مکتوب',
        tradeoff: 'نگهبان فقط از فایل‌هایی که می‌خواند محافظت می‌کند.',
      },
      {
        title: 'ریسک حقوقی را ارجاع بده، به‌جای تصمیم‌گیری دربارهٔ آن',
        why: 'حل‌وفصل پرسش‌هایی که ریسک حقوقی داشتند کار طراح نبود. آن‌ها در قالب یک یادداشت مکتوب به کارفرما رفتند، و در آن‌جا یکی از عبارت‌های پیشنهادی کنار گذاشته شد و زبانی مشروط به قرارداد و بدون وعده جایش را گرفت.',
        alternatives: 'تعیین عبارت در خود متن سایت',
        tradeoff: 'صفحه‌ها منتظر پاسخ‌هایی می‌مانند که ساخت نمی‌تواند فراهم کند.',
      },
      {
        title: 'بازخورد کارفرما را پیش از اعمال ممیزی کن',
        why: 'یک سند بازخورد فارسی چهارصفحه‌ای به تخته‌ای از کارت‌ها تبدیل شد؛ هر کارت درخواست را همراه با ترجمه‌اش نقل می‌کرد و نخست در برابر کد واقعی بررسی می‌شد. درخواست‌هایی که بر فرضی نادرست استوار بودند، پیش از آن‌که کسی آن‌ها را بسازد اصلاح شدند.',
        alternatives: 'اعمال بازخورد همان‌طور که نوشته شده',
        tradeoff: 'پاسخ نخست کندتر، و تغییرات کمتری برای بازگرداندن.',
      },
      {
        title: 'جای‌نگهدار بگذار، هویت جعل نکن',
        why: 'نام حقوقی، ثبت‌ها و افرادی که پشت یک شرکت‌اند واقعیت‌اند، نه طراحی. هر یک آشکارا «بعداً اعلام می‌شود» می‌ماند تا شرکت آن را تأیید کند، و صفحهٔ تیم با کلماتی ساده می‌گوید که تنها افراد واقعی معرفی خواهند شد.',
        alternatives: 'نام‌ها و شماره‌های نمونهٔ باورپذیر',
        tradeoff: 'سایت تا زمانی که شرکت این‌ها را فراهم نکند، نمی‌تواند راه‌اندازی شود.',
      },
    ],
    teamEvidence: 'صفحهٔ تیم، به جای یک تیم: فقط افراد واقعی معرفی شوند.',
  },
  locales: {
    label: 'هفت زبان',
    heading: 'هفت زبان، دو تا راست‌به‌چپ',
    body: [
      'انگلیسی، فرانسوی، عربی، اسپانیایی، ژاپنی، چینی و فارسی همهٔ کلیدهای پیام را با برابری دقیق دارند — در آخرین کامیت، ۲۲۲ کلید در هر فایل. عربی و فارسی بر ویژگی‌های منطقی CSS تکیه دارند، از این رو چیدمان به‌جای بازسازی، آینه می‌شود.',
      'دو نکته فقط در عمل آشکار شد. جایگزینی قلم برای هر زبان که درون یک لایهٔ آبشاری (cascade layer) نوشته شده بود، بی‌صدا نادیده گرفته می‌شد، پس اکنون بیرون از لایه‌ها قرار دارد؛ و مانیفست‌ها از ارقام جدولی استفاده می‌کنند، تا ستون‌های تک‌فاصله زیر متن راست‌به‌چپ و CJK هم هم‌تراز بمانند.',
    ],
    figureItems: ['فارسی: همان بخش آغازین، آینه‌شده.', 'عربی: همان بخش آغازین، آینه‌شده.'],
    figureCaption:
      'هر دو زبان راست‌به‌چپ، از جمله ناوبری، ساخته‌شده از همان کامپوننت‌های نسخهٔ انگلیسی.',
  },
  pages: {
    label: 'همهٔ صفحه‌ها',
    heading: 'سی‌وچهار صفحه، یک سیستم',
    body: [
      'همهٔ صفحه‌های انگلیسی نسخهٔ مستقرشده، ثبت‌شده در ۴ مهر ۱۴۰۵ در عرض ۱۴۴۰ پیکسل و روی گوشی ۳۹۰ پیکسلی: شانزده صفحهٔ سطح نخست، فرم احراز صلاحیت خریدار، دو آگهی شغلی، دوازده مقالهٔ تحلیلی و سه صفحهٔ حقوقی.',
      'صفحه‌های داخلی همان مانیفست‌های داده با خطوط مویی و همان نوار هویت با قلم تک‌فاصله را دارند که صفحه‌های شاخص دارند، و روی گوشی هر صفحه در یک ستون چیده می‌شود و ناوبری پشت دکمهٔ منو قرار می‌گیرد. در صفحهٔ اصلی، بخش قیمت‌های بازار پوشانده شده است.',
    ],
    figureCaption: 'همهٔ صفحه‌های انگلیسی، نمای نخست در عرض دسکتاپ و گوشی؛ هر صفحه را باز کنید تا تمامش را ببینید.',
    names: {
      home: 'صفحهٔ اصلی',
      about: 'دربارهٔ ما',
      team: 'تیم و مدیریت',
      'track-record': 'سابقهٔ کاری',
      products: 'محصولات',
      'petroleum-derivatives': 'فرآورده‌های نفتی',
      'how-we-work': 'شیوهٔ کار ما',
      procedure: 'رویهٔ معامله',
      capabilities: 'توانمندی‌ها',
      compliance: 'انطباق و KYC',
      governance: 'حاکمیت شرکتی',
      sustainability: 'مسئولیت‌پذیری',
      faq: 'پرسش‌های متداول',
      insights: 'تحلیل‌ها',
      'insights--verify-oil-trading-counterparty': 'تحلیل‌ها · راستی‌آزمایی طرف معامله',
      'insights--inspection-sampling-certificates': 'تحلیل‌ها · بازرسی، نمونه‌برداری و گواهی‌ها',
      'insights--oil-trade-documents-checklist': 'تحلیل‌ها · چک‌لیست اسناد تجارت نفت',
      'insights--product-specifications-guide': 'تحلیل‌ها · راهنمای مشخصات محصولات',
      'insights--en-590-diesel-specification': 'تحلیل‌ها · مشخصات گازوئیل EN 590',
      'insights--jet-a1-specification': 'تحلیل‌ها · مشخصات سوخت Jet A-1',
      'insights--iso-8217-fuel-oil-bunkers': 'تحلیل‌ها · نفت کوره و سوخت کشتی طبق ISO 8217',
      'insights--incoterms-oil-products': 'تحلیل‌ها · اینکوترمز برای محموله‌های نفتی',
      'insights--reading-the-diesel-curve': 'تحلیل‌ها · خوانش منحنی گازوئیل',
      'insights--letters-of-credit-plainly': 'تحلیل‌ها · اعتبار اسنادی به زبان ساده',
      'insights--screening-discipline': 'تحلیل‌ها · غربالگری به‌عنوان انضباط عملیاتی',
      'insights--inspection-at-custody-transfer': 'تحلیل‌ها · بازرسی هنگام تحویل محموله',
      careers: 'فرصت‌های شغلی',
      'careers--distillates-trader': 'فرصت‌های شغلی · معامله‌گر میان‌تقطیرها',
      'careers--operations-analyst': 'فرصت‌های شغلی · تحلیلگر عملیات',
      contact: 'تماس',
      qualify: 'احراز صلاحیت خریدار',
      'legal--terms': 'حقوقی · شرایط استفاده',
      'legal--privacy': 'حقوقی · سیاست حریم خصوصی',
      'legal--cookies': 'حقوقی · سیاست کوکی‌ها',
    },
    alt: {
      desktop: 'Marqevon روی دسکتاپ — {page}، نمای نخست',
      mobile: 'Marqevon روی موبایل — {page}، نمای نخست',
      desktopFull: 'Marqevon روی دسکتاپ — {page}، کل صفحه',
      mobileFull: 'Marqevon روی موبایل — {page}، کل صفحه',
    },
    masked: '، با بخش قیمت‌های بازار پوشانده‌شده',
  },
  outcomes: {
    heading: 'مستقر، اما راه‌اندازی‌نشده',
    intro:
      'سایت مستقر شده و در حال سرویس‌دهی است، اما راه‌اندازی نشده: دامنه ندارد، عمداً از نتایج جست‌وجو بیرون نگه داشته شده، و اطلاعات هویتی‌اش هنوز جای‌نگهدارند. بازخورد اعمال‌شده در کامیتی است که هنوز به مخزن فرستاده نشده، نه روی سرور. هیچ ابزار تحلیلی در کار نیست، فقط بررسی سلامت کانتینرها.',
    measured: [
      {
        label: 'تست‌های یکپارچگی موفق',
        context: 'در کنار lint، هر دو نگهبان و یک ساخت تولیدی، روی شاخهٔ بازخورد.',
        source: 'تختهٔ بازخورد طراحی، ۱۶ شهریور ۱۴۰۵',
      },
      {
        label: 'کارت‌های بازخورد اعمال‌شده در کد',
        context:
          'یکی در انتظار یک تصمیم باز؛ هیچ‌کدام هنوز روی برنامهٔ در حال اجرا تأیید نشده‌اند.',
        source: 'نقشهٔ راه بازخورد طراحی',
      },
    ],
    delivered: [
      {
        label: 'پشتیبان با بازیابی آزموده',
        context:
          'هر شب، و هر نسخه بازیابی می‌شود تا کارکردش اثبات شود؛ به‌علاوهٔ یک بستهٔ بازیابی پیش از هر انتشاری که محتوا را مهاجرت می‌دهد.',
      },
      {
        label: 'مسیر استقرار با ایمیج تغییرناپذیر',
        context:
          'انتشارها به شکل ایمیج‌های ثابت عرضه می‌شوند؛ برچسب تغییرپذیر latest و به‌روزرسانی‌های مبتنی بر سرکشی دوره‌ای کنار گذاشته شده‌اند.',
      },
    ],
    shipped: [
      'هفت زبان با برابری کامل',
      'دو نگهبان CI',
      'مانیفست حاکمیت',
      'فرم احراز صلاحیت خریدار',
      'برچسب‌های مرجع',
      'چیدمان‌های راست‌به‌چپ',
    ],
  },
  lessons: {
    heading: 'ابزار اعتمادی که هیچ کاری نکرد',
    items: [
      {
        title: 'مفیدترین خروجی یک قاعدهٔ lint بود',
        body: 'رمزگذاری «به گویش کانال تقلب سخن نگو» به‌صورت یک نگهبان، آن را از نیتی که کسی باید به خاطر بسپارد به ویژگی‌ای از خود مخزن کد تبدیل کرد.',
      },
      {
        title: 'نگهبان فقط از آنچه می‌خواند محافظت می‌کند',
        body: 'نگهبان محتوا متن‌ها و فایل‌های پیام را می‌خواند، نه فهرست گزینه‌های فرم را؛ به همین دلیل فرم احراز صلاحیت خریدار هنوز دو اصطلاح ممنوع را به‌عنوان گزینه‌های تحویل پیشنهاد می‌کند. در تنها صفحه‌ای که شرکت دیگران را غربال می‌کند، به همان گویشی سخن می‌گوید که ممنوعش کرده است.',
      },
      {
        title: 'ابزار اعتماد باید کاری انجام دهد',
        body: 'برچسب‌های مرجع نام یک ثبت شرکت‌ها یا نمایهٔ LEI را می‌برند، اما به هیچ‌کدام پیوند نمی‌دهند. تا زمانی که به سابقه‌ای واقعی اشاره نکنند، این ابزار امضایی فقط شبیه راستی‌آزمایی است — دقیقاً همان شکستی که پروژه برای پرهیز از آن آغاز شد.',
      },
      {
        title: 'تصمیم‌های ساختاری را نخست مکتوب تأیید کن',
        body: 'هفت زبان هفته‌ها پیش از آن تحویل داده شد که یکی از اسناد حاکمیتی کارفرما مسئلهٔ زبان را هنوز تصمیم‌نگرفته بخواند. نگه داشتنشان درست بود، چون حذف کاری تمام‌شده و محافظت‌شده خطای پرهزینه‌تری است، اما این تصمیم باید پیش از ساخته شدن کلیدها مکتوب می‌شد.',
      },
    ],
  },
}

const AR: MqvCopy = {
  statement:
    'موقع بسبع لغات لتاجر أصيل في المنتجات البترولية، صُمِّم ليجيب عن سؤال واحد في الشاشة الأولى: هل هذه الشركة حقيقية ويمكن التحقق منها؟',
  industry: 'الطاقة · تجارة السلع المادية',
  team: 'المصمم والمطوّر الوحيد',
  heroCaption:
    'الصفحة الرئيسية بالإنجليزية: نطاق المنتجات في جملة واحدة، والاسم القانوني لا يزال موسومًا بعبارة «يُزوَّد لاحقًا».',
  snapshot: {
    problem: 'للوسطاء المحتالين لهجة مشتركة، والشركة الحقيقية التي تردّدها تبدو واحدة منهم.',
    role: 'المصمم والمنفّذ: المقارنة المرجعية، وهندسة المعلومات، ونظام التصميم، ونموذج المحتوى بسبع لغات، والبناء، وحُرّاس CI.',
    result:
      'منشور لكنه لم يُطلق بعد: سبع لغات بتطابق تام في المفاتيح وحارسان في CI، فيما لا تزال بيانات الهوية عناصر نائبة.',
  },
  alt: {
    cover:
      'Marqevon — صفحة الإجراءات، «كيف تسير المعاملة بحسب نمط التسليم»، على خلفية داكنة بلون النفط',
    home: 'Marqevon على سطح المكتب — الصفحة الرئيسية بالإنجليزية، «نورّد المنتجات البترولية المحدّدة المواصفات ونشحنها ونموّلها ونسلّمها»، فوق خريطة لخطوط الملاحة البحرية',
    faq: 'Marqevon على سطح المكتب — قائمة الأسئلة الشائعة، وتُختتم بمجموعة «ما لا نقوم به» حول الأدوات المصرفية المؤجَّرة والخصومات دون سعر السوق',
    procedure:
      'Marqevon على سطح المكتب — سبع خطوات مرقّمة تشترك فيها كل أنماط التسليم، من التأهيل إلى المطابقة',
    manifest:
      'Marqevon على سطح المكتب — بيان الحوكمة، جدول بخط أحادي المسافة لبيانات الهوية، مع شارات مرجعية لسجل الشركات وLEI، وقيم لا تزال «يُزوَّد لاحقًا»',
    products:
      'Marqevon على سطح المكتب — ثلاثة منتجات مدرجة بحسب مواصفاتها: ديزل EN 590 ووقود Jet A-1 والنافثا',
    trackRecord:
      'Marqevon على سطح المكتب — قاعدة نشر سجل الأعمال: فقط بعد التحقق التجاري والقانوني، ومن دون أسماء الأطراف المقابلة',
    team: 'Marqevon على سطح المكتب — ملاحظة بدلًا من فريق: لا تُنشر أسماء الأشخاص إلا بعد التحقق التجاري والقانوني',
    homeFa:
      'Marqevon على سطح المكتب — الصفحة الرئيسية بالفارسية، معكوسة من اليمين إلى اليسار مع قلب اتجاه التنقل',
    homeAr: 'Marqevon على سطح المكتب — الصفحة الرئيسية بالعربية، معكوسة من اليمين إلى اليسار',
  },
  context: {
    heading: 'تاجر أصيل، لا وسيط',
    body: [
      'Marqevon تاجر أصيل (لا وسيط) في تجارة المنتجات البترولية المادية: يشتري من المنتجين والمصافي، ويسلّم إلى المصافي والموزعين وشركات الطيران وشركات المرافق والمستخدمين الصناعيين. ويخاطب موقعه الأطراف المقابلة أولًا، ثم البنوك وشركاء تمويل التجارة، ثم المرشحين للتوظيف، ثم الصحافة والجهات الرقابية.',
      'انطلق العمل من المواصفات منذ البداية. فقد ثبّتت وثيقة مواصفات بحجم 46 كيلوبايت هندسةَ المعلومات ونظامَ التصميم وجميع الصفحات الـ15 قبل البناء، وهي تبدأ برفض الموجز المعتاد: في هذا القطاع ليست مهمة الموقع التسويق، بل إظهار شرعية يمكن التحقق منها.',
    ],
  },
  problem: {
    heading: 'لقناة الاحتيال لهجتها',
    body: [
      'تعاني تجارة السلع المادية من مشكلة احتيال، وللاحتيال مفرداته: يعرّف الوسطاء غير الرسميين أنفسهم بمجموعة مألوفة من اختصارات الأدوات المالية وألقاب التفويض — TTT وTTV وDTA وATB. والتاجر الأصيل المشروع متوسط الحجم الذي يستخدم أيًّا منها يبدو واحدًا منهم.',
      'لذا كان على الموقع كله أن يجيب عن سؤال واحد، بسبع لغات، اثنتان منها تُكتبان من اليمين إلى اليسار.',
    ],
  },
  question: {
    text: '«هل هذا الكيان حقيقي ويمكن التحقق منه، أم أنه واجهة أخرى لسلسلة وسطاء؟ صمِّموا بحيث يكون الجواب واضحًا في الشاشة الأولى.»',
    attribution: 'وثيقة المواصفات لهندسة المعلومات والتصميم',
    method: 'كُتبت قبل البناء، معيارًا لكل صفحة',
  },
  research: {
    heading: 'مساحة بيضاء لا يسوّقها الكبار',
    body: [
      'قيّمت مقارنة مرجعية تنافسية التصميمَ المقصود في مواجهة أكبر بيوت التجارة ومجموعة من النظراء متوسطي الحجم. وكانت الفجوة التي كشفتها جديرة بأن تُمتلك: لا أحد من الكبار يسوّق صراحةً موقفًا مناهضًا للاحتيال، أو يقول ما لن يفعله.',
      'تحوّلت تلك النتيجة إلى بنية لا إلى شعار: مجموعة «ما لا نقوم به» في الأسئلة الشائعة، وترحيب صريح بالتحقق المستقل، وقائمة بمصطلحات يجب ألا تستخدمها نصوص الموقع أبدًا.',
    ],
    figureCaption:
      'تنتهي الأسئلة الشائعة بما لن تفعله الشركة: الأدوات المصرفية المؤجَّرة، والحصص المخصّصة خارج السوق، والخصومات المضمونة دون سعر السوق.',
  },
  approach: {
    heading: 'أداة دقيقة لسوق قائمة على الثقة',
    body: [
      'حدّدت وثيقة المواصفات الاتجاه في سطر واحد — «أداة دقيقة لسوق قائمة على الثقة» — في موضع ما بين مكتب طاقة مؤسسي ووثيقة فحص موثَّقة، وسمّت ما يجب تجنّبه: اللون الكريمي مع خط مذيّل واللون الطيني، والأسود مع الأخضر الحمضي، والخطوط الشعرية بوصفها الجمالية كلها.',
      'سار العمل من المقارنة المرجعية إلى وثيقة المواصفات ثم البناء، ثم جولة واحدة من ملاحظات العميل، وقد خضعت تلك الملاحظات للتدقيق مقابل الشيفرة قبل تطبيق أيٍّ منها.',
    ],
    insight:
      'من بين نحو 67 تعليمة في ملاحظات العميل، اجتازت 33 منها التدقيق وتحوّلت إلى بطاقات؛ واحتاجت 8 منها إلى تصحيح أولًا، وتوقّفت 22 على قرارات معلّقة، وكانت 4 منها أسئلة.',
    processHeading: 'أربع مراحل، كلٌّ منها مدوَّنة',
    steps: [
      {
        label: 'المقارنة المرجعية',
        note: 'كبار السوق والنظراء متوسطو الحجم، مقيَّمين مقابل التصميم المقصود',
      },
      { label: 'وثيقة المواصفات', note: 'هندسة المعلومات ونظام التصميم و15 صفحة' },
      { label: 'البناء', note: 'Payload وNext.js بسبع لغات، مع حارسين في CI' },
      { label: 'الملاحظات', note: 'وثيقة ملاحظات بالفارسية تحوّلت إلى بطاقات مُدقَّقة' },
    ],
    figureCaption:
      'تسلسل واحد مشترك لكل أنماط التسليم: الأدلة القابلة للتحقق المستقل تأتي قبل أي التزام مالي.',
  },
  solution: {
    heading: 'نظام المرجع الدفتري',
    body: [
      'تحدّد وثيقة المواصفات أين تُنفَق الجرأة: «أنفِقوا الجرأة هنا، وأبقوا كل ما عداها هادئًا.» وللبصمة ثلاثة أجزاء — شارات مرجعية تُلحَق بادعاءات المصداقية، وبيانات للبيانات مصفوفة على هيئة شهادات فحص بخط أحادي المسافة تفصلها خطوط شعرية، وشريط هوية بخط أحادي المسافة في أسفل كل صفحة.',
      'وقد بُنيت لوحة الألوان لأجلها: أرضية بلون النفط في الأعماق، وفولاذ بحري، وورق المستندات، والنحاس الأصفر لونًا مميِّزًا وحيدًا، وأزرق مخضرّ «موثَّق» يبقى بعيدًا عن الأخضر الحمضي، ولون الصدأ للإشارات التحذيرية فقط. ويحمل خط IBM Plex Mono كل رقم ومرجع وشارة.',
      'وفي الأساس: Payload 3.85 وNext.js 16.2 مع next-intl على MongoDB — 10 مجموعات و4 إعدادات عامة — تُقدَّم عبر nginx، مع نموذج تأهيل المشتري الذي يمنح كل استفسار درجة ويُعلِّمه لمكتب التداول.',
    ],
    annotations: [
      'كل معلومة هوية صفٌّ له أساس مُسمّى، لا جملة طمأنة.',
      'تبقى القيم غير المؤكدة غير مؤكدة بشكل ظاهر: «يُزوَّد لاحقًا».',
      'تشير الشارات المرجعية إلى ما يستطيع الطرف المقابل التحقق منه: سجل الشركات، والفهرس العالمي لـLEI.',
      'مكتوب بخط IBM Plex Mono، مثل شهادة فحص.',
    ],
    manifestCaption:
      'بيان الحوكمة: هوية الشركة في جدول يمكن التحقق منه، وكل قيمة غير مؤكدة متروكة عنصرًا نائبًا.',
    figureItems: [
      'المنتجات: ثلاث درجات، تُعرَّف كلٌّ منها بمواصفاتها.',
      'سجل الأعمال: لا يُنشر إلا بعد التحقق التجاري والقانوني، ولا يتضمن أبدًا أسماء الأطراف المقابلة.',
    ],
    figureCaption: 'ادعاءات تستطيع الشركة أن تقف وراءها، وقواعد لتلك التي لا تستطيع بعد.',
  },
  decisions: {
    heading: 'خمسة قرارات بشأن الثقة',
    lede: 'معظمها يتعلق بما يرفض الموقع قوله.',
    items: [
      {
        title: 'أنفِق الجرأة في مكان واحد',
        why: 'شركة التجارة التي تبدو «مصمَّمة» تُقرأ على أنها تسويق. يحمل نظام البصمة كل الثقة البصرية وتبقى كل الأسطح الأخرى هادئة، فيكون ما يعلق في ذهن القارئ هو جداول البيان.',
        alternatives: 'علامة تجارية جريئة على كل الأسطح',
        tradeoff: 'يبدو الموقع شحيحًا لمن يتوقع حملة إعلانية.',
      },
      {
        title: 'اجعل القواعد تُفشل البناء',
        why: 'يعمل حارسان في CI. يفشل أحدهما عند ظهور مفردات قناة الاحتيال أو التهجئة الأمريكية في نصوص الموقع؛ والآخر عند أدوات التخطيط المرتبطة بالاتجاهات المادية، والخطوط المثبّتة في الشيفرة، والنصوص غير المترجمة. وقد التقط الثاني بالفعل سهوًا حقيقيًا: تسمية لإمكانية الوصول أفلتت من الترجمة.',
        alternatives: 'دليل أسلوب مكتوب',
        tradeoff: 'لا يحمي الحارس إلا الملفات التي يقرؤها.',
      },
      {
        title: 'صعّد المخاطر القانونية بدلًا من البتّ فيها',
        why: 'لم يكن حسم المسائل ذات المخاطر القانونية من شأن المصمم. فقد أُحيلت إلى العميل في مذكرة مكتوبة، ورُفضت هناك إحدى الصيغ الموصى بها لصالح لغة مقيَّدة بالعقد وخالية من الوعود.',
        alternatives: 'حسم الصياغة داخل النص',
        tradeoff: 'تنتظر الصفحات إجابات لا يستطيع البناء توفيرها.',
      },
      {
        title: 'دقّق ملاحظات العميل قبل تطبيقها',
        why: 'تحوّلت وثيقة ملاحظات فارسية من أربع صفحات إلى لوحة بطاقات، تقتبس كلٌّ منها الطلب مع ترجمته، وتُفحص أولًا مقابل الشيفرة الفعلية. وصُحّحت الطلبات القائمة على فرضية خاطئة قبل أن ينفّذها أحد.',
        alternatives: 'تطبيق الملاحظات كما كُتبت',
        tradeoff: 'استجابة أولى أبطأ، وتغييرات أقل يلزم التراجع عنها.',
      },
      {
        title: 'اترك عناصر نائبة بدلًا من اختلاق الهوية',
        why: 'الاسم القانوني والتسجيلات والأشخاص الذين يقفون وراء الشركة حقائق لا تصميم. يبقى كلٌّ منها ظاهرًا بعبارة «يُزوَّد لاحقًا» حتى تؤكده الشركة، وتقول صفحة الفريق بكلمات واضحة إنه لن يُنشر إلا الأشخاص الحقيقيون.',
        alternatives: 'أسماء وأرقام نموذجية معقولة',
        tradeoff: 'لا يمكن إطلاق الموقع حتى تزوّد الشركة بهذه البيانات.',
      },
    ],
    teamEvidence: 'صفحة الفريق، بدلًا من فريق: لا يُنشر إلا الأشخاص الحقيقيون.',
  },
  locales: {
    label: 'سبع لغات',
    heading: 'سبع لغات، اثنتان من اليمين إلى اليسار',
    body: [
      'تحمل الإنجليزية والفرنسية والعربية والإسبانية واليابانية والصينية والفارسية كل مفاتيح الرسائل بتطابق تام — 222 مفتاحًا في كل ملف عند آخر إيداع. وتعتمد العربية والفارسية على الخصائص المنطقية في CSS، فينعكس التخطيط بدلًا من إعادة بنائه.',
      'ظهرت تفصيلتان فقط أثناء الاستخدام. فقد كان تبديل الخط لكل لغة، المكتوب داخل طبقة التتالي، يُتجاوَز بصمت، فصار الآن خارج الطبقات؛ وتستخدم جداول البيان أرقامًا جدولية، فتبقى الأعمدة أحادية المسافة متراصفة تحت النصوص المكتوبة من اليمين إلى اليسار ونصوص CJK.',
    ],
    figureItems: [
      'الفارسية: الواجهة الافتتاحية نفسها، معكوسة.',
      'العربية: الواجهة الافتتاحية نفسها، معكوسة.',
    ],
    figureCaption:
      'كلتا اللغتين المكتوبتين من اليمين إلى اليسار، بما في ذلك التنقل، من المكوّنات نفسها التي بُنيت بها النسخة الإنجليزية.',
  },
  pages: {
    label: 'كل الصفحات',
    heading: 'أربع وثلاثون صفحة ونظام واحد',
    body: [
      'كل الصفحات الإنجليزية في النسخة المنشورة، التُقطت في 26 سبتمبر 2026 بعرض 1440 بكسلًا وعلى هاتف بعرض 390 بكسلًا: الصفحات الست عشرة في المستوى الأول، ونموذج تأهيل المشتري، وإعلانا توظيف، واثنتا عشرة مقالة تحليلية، وثلاث صفحات قانونية.',
      'تحمل الصفحات الداخلية جداول البيان نفسها بخطوطها الشعرية وشريط الهوية نفسه بالخط أحادي المسافة، كما في الصفحات الأبرز، وعلى الهاتف تتراص كل صفحة في عمود واحد ويُطوى التنقل خلف زر القائمة. وفي الصفحة الرئيسية، حُجبت لوحة أسعار السوق.',
    ],
    figureCaption: 'كل الصفحات الإنجليزية، الشاشة الأولى بعرض سطح المكتب والهاتف؛ افتح أي صفحة لتراها كاملة.',
    names: {
      home: 'الصفحة الرئيسية',
      about: 'من نحن',
      team: 'الفريق والقيادة',
      'track-record': 'سجل الإنجازات',
      products: 'المنتجات',
      'petroleum-derivatives': 'المشتقات النفطية',
      'how-we-work': 'كيف نعمل',
      procedure: 'إجراءات المعاملة',
      capabilities: 'القدرات',
      compliance: 'الامتثال واعرف عميلك',
      governance: 'الحوكمة',
      sustainability: 'المسؤولية',
      faq: 'الأسئلة الشائعة',
      insights: 'رؤى',
      'insights--verify-oil-trading-counterparty': 'رؤى · التحقق من الطرف المقابل',
      'insights--inspection-sampling-certificates': 'رؤى · التفتيش وأخذ العينات والشهادات',
      'insights--oil-trade-documents-checklist': 'رؤى · قائمة مستندات تجارة النفط',
      'insights--product-specifications-guide': 'رؤى · دليل مواصفات المنتجات',
      'insights--en-590-diesel-specification': 'رؤى · مواصفات ديزل EN 590',
      'insights--jet-a1-specification': 'رؤى · مواصفات وقود Jet A-1',
      'insights--iso-8217-fuel-oil-bunkers': 'رؤى · زيت الوقود ووقود السفن وفق ISO 8217',
      'insights--incoterms-oil-products': 'رؤى · مصطلحات إنكوترمز لشحنات النفط',
      'insights--reading-the-diesel-curve': 'رؤى · قراءة منحنى الديزل',
      'insights--letters-of-credit-plainly': 'رؤى · الاعتمادات المستندية ببساطة',
      'insights--screening-discipline': 'رؤى · الفحص بوصفه انضباطًا تشغيليًا',
      'insights--inspection-at-custody-transfer': 'رؤى · التفتيش عند نقل العهدة',
      careers: 'الوظائف',
      'careers--distillates-trader': 'الوظائف · متداول المقطرات',
      'careers--operations-analyst': 'الوظائف · محلل العمليات',
      contact: 'اتصل بنا',
      qualify: 'تأهيل المشتري',
      'legal--terms': 'قانوني · شروط الاستخدام',
      'legal--privacy': 'قانوني · سياسة الخصوصية',
      'legal--cookies': 'قانوني · سياسة ملفات تعريف الارتباط',
    },
    alt: {
      desktop: 'Marqevon على سطح المكتب — {page}، الشاشة الأولى',
      mobile: 'Marqevon على الجوال — {page}، الشاشة الأولى',
      desktopFull: 'Marqevon على سطح المكتب — {page}، الصفحة كاملة',
      mobileFull: 'Marqevon على الجوال — {page}، الصفحة كاملة',
    },
    masked: '، مع حجب لوحة أسعار السوق',
  },
  outcomes: {
    heading: 'منشور، لم يُطلق',
    intro:
      'الموقع منشور ويعمل، لكنه لم يُطلق: ليس له نطاق، ويبقى خارج محركات البحث عن قصد، ولا تزال بيانات هويته عناصر نائبة. والملاحظات المطبّقة موجودة في إيداع لم يُدفع بعد إلى المستودع، لا على الخادم. ولا توجد أي تحليلات، بل فحوص سلامة الحاويات فقط.',
    measured: [
      {
        label: 'اختبارات تكامل ناجحة',
        context: 'إلى جانب فحص lint، والحارسين كليهما، وبناء إنتاجي، على فرع الملاحظات.',
        source: 'لوحة ملاحظات التصميم، 7 سبتمبر 2026',
      },
      {
        label: 'بطاقات ملاحظات مطبّقة في الشيفرة',
        context:
          'واحدة معلّقة على قرار مفتوح؛ ولم يُتحقَّق من أيٍّ منها بعد على تطبيق قيد التشغيل.',
        source: 'خارطة طريق ملاحظات التصميم',
      },
    ],
    delivered: [
      {
        label: 'نسخ احتياطية مُتحقَّق من استعادتها',
        context:
          'كل ليلة، وتُستعاد كل نسخة لإثبات أنها تعمل، إضافةً إلى حزمة استرداد قبل أي إصدار ينقل المحتوى.',
      },
      {
        label: 'مسار نشر بصور ثابتة غير قابلة للتعديل',
        context:
          'تُشحن الإصدارات صورًا ثابتة؛ وأُلغي الوسم المتغيّر latest والتحديثات القائمة على الاستطلاع الدوري.',
      },
    ],
    shipped: [
      'سبع لغات متطابقة',
      'حارسان في CI',
      'بيان الحوكمة',
      'نموذج تأهيل المشتري',
      'الشارات المرجعية',
      'تخطيطات من اليمين إلى اليسار',
    ],
  },
  lessons: {
    heading: 'أداة الثقة التي لم تفعل شيئًا',
    items: [
      {
        title: 'كان أنفع ناتج قاعدةَ lint',
        body: 'إن ترميز «لا تتحدث بلهجة قناة الاحتيال» في صورة حارس نقلها من نيّة ينبغي لأحد أن يتذكرها إلى خاصية من خصائص المستودع.',
      },
      {
        title: 'لا يحمي الحارس إلا ما يقرؤه',
        body: 'يفحص حارس المحتوى النصوص وملفات الرسائل، لا قوائم الخيارات في النموذج، ولذلك لا يزال نموذج تأهيل المشتري يعرض اثنين من المصطلحات المحظورة خيارين للتسليم. ففي الصفحة الوحيدة التي تفحص فيها الشركة الآخرين، تتحدث باللهجة التي تحظرها.',
      },
      {
        title: 'على أداة الثقة أن تفعل شيئًا',
        body: 'تذكر الشارات المرجعية سجلًا للشركات أو فهرس LEI، لكنها لا ترتبط بأيٍّ منهما. وإلى أن تشير إلى سجل حقيقي، تبدو أداة البصمة كأنها تحقّق فحسب — وهو بالضبط الإخفاق الذي انطلق المشروع لتجنّبه.',
      },
      {
        title: 'ثبّت القرارات البنيوية كتابةً أولًا',
        body: 'سُلِّمت اللغات السبع قبل أسابيع من وثيقة حوكمة للعميل وصفت مسألة اللغة بأنها لم تُحسم. وكان الإبقاء عليها صائبًا، لأن حذف عمل منجز ومحميّ هو الخطأ الأعلى كلفة، لكن القرار كان ينبغي أن يُدوَّن كتابةً قبل أن توجد المفاتيح.',
      },
    ],
  },
}

const ES: MqvCopy = {
  statement:
    'Un sitio en siete idiomas para un operador principal de petróleo, pensado para responder en la primera pantalla: ¿es esta empresa real y verificable?',
  industry: 'Energía · comercio físico de materias primas',
  team: 'Único diseñador y desarrollador',
  heroCaption:
    'La página de inicio en inglés: el alcance del producto en una frase y la razón social todavía marcada como «por aportar».',
  snapshot: {
    problem:
      'Los intermediarios fraudulentos comparten una jerga, y una empresa real que la repite parece uno de ellos.',
    role: 'Diseñador y constructor: benchmark competitivo, arquitectura de la información, sistema de diseño, modelo de contenido en siete idiomas, desarrollo y guardias de CI.',
    result:
      'Desplegado pero no lanzado: siete idiomas con paridad exacta de claves y dos guardias de CI, con los datos de identidad aún como marcadores provisionales.',
  },
  alt: {
    cover:
      'Marqevon — la página de procedimiento, «Cómo se desarrolla una transacción, según la modalidad de entrega», sobre un fondo oscuro color petróleo',
    home: 'Marqevon en escritorio — la página de inicio en inglés, «Abastecemos, transportamos, financiamos y entregamos productos petrolíferos especificados», sobre un mapa de rutas marítimas',
    faq: 'Marqevon en escritorio — la lista de preguntas frecuentes, que cierra con un grupo «Lo que no hacemos» sobre instrumentos bancarios arrendados y descuentos por debajo del mercado',
    procedure:
      'Marqevon en escritorio — siete pasos numerados comunes a todas las modalidades de entrega, de la cualificación a la conciliación',
    manifest:
      'Marqevon en escritorio — el manifiesto de gobernanza, una tabla monoespaciada de datos de identidad con etiquetas de referencia de registro y LEI y valores aún por aportar',
    products:
      'Marqevon en escritorio — tres productos listados por especificación: gasóleo EN 590, Jet A-1 y nafta',
    trackRecord:
      'Marqevon en escritorio — la regla para publicar un historial de operaciones: solo tras la validación comercial y jurídica, sin nombres de contrapartes',
    team: 'Marqevon en escritorio — una nota en lugar de un equipo: las personas con nombre solo se publican tras la validación comercial y jurídica',
    homeFa:
      'Marqevon en escritorio — la página de inicio en persa, reflejada de derecha a izquierda con la navegación invertida',
    homeAr:
      'Marqevon en escritorio — la página de inicio en árabe, reflejada de derecha a izquierda',
  },
  context: {
    heading: 'Un operador principal, no un intermediario',
    body: [
      'Marqevon es un operador principal (no intermediario) de comercio físico de petróleo: compra a productores y refinerías y entrega a refinerías, distribuidores, aerolíneas, empresas de servicios públicos y usuarios industriales. Su sitio se dirige primero a las contrapartes, después a bancos y socios de financiación comercial, luego a candidatos y, por último, a prensa y reguladores.',
      'El trabajo partió de una especificación desde el principio. Una especificación de 46 KB fijó la arquitectura de la información, el sistema de diseño y las 15 páginas antes del desarrollo, y empieza rechazando el encargo habitual: en este sector, la función de un sitio web no es el marketing, sino proyectar una legitimidad verificable.',
    ],
  },
  problem: {
    heading: 'El canal del fraude tiene su propia jerga',
    body: [
      'El comercio físico de materias primas tiene un problema de fraude, y el fraude tiene un vocabulario: los intermediarios informales se delatan con un conjunto reconocible de siglas de instrumentos y títulos de mandato — TTT, TTV, DTA, ATB. Un operador principal legítimo de tamaño medio que use cualquiera de ellos parece uno más.',
      'Así que todo el sitio tenía que responder a una sola pregunta, en siete idiomas, dos de ellos escritos de derecha a izquierda.',
    ],
  },
  question: {
    text: '«¿Es esta entidad real y verificable, o es otra fachada de una cadena de intermediarios? Diseñar para que la respuesta sea evidente en la primera pantalla.»',
    attribution: 'La especificación de arquitectura de la información y diseño',
    method: 'Escrita antes del desarrollo, como prueba para cada página',
  },
  research: {
    heading: 'Un hueco que los grandes no ocupan',
    body: [
      'Un benchmark competitivo puntuó el diseño previsto frente a las mayores casas de trading y un grupo de competidores de tamaño medio. El hueco que encontró merecía ocuparse: ninguno de los grandes comunica explícitamente una postura antifraude, ni dice lo que no hará.',
      'Ese hallazgo se convirtió en estructura y no en eslogan: un grupo «Lo que no hacemos» en las preguntas frecuentes, una invitación abierta a la verificación independiente y una lista de términos que los textos nunca deben usar.',
    ],
    figureCaption:
      'Las preguntas frecuentes terminan con lo que la empresa no hará: instrumentos bancarios arrendados, reservas fuera de mercado, descuentos garantizados por debajo del mercado.',
  },
  approach: {
    heading: 'Un instrumento de precisión para un mercado basado en la confianza',
    body: [
      'La especificación fijó la dirección en una línea — «Instrumento de precisión para un mercado basado en la confianza» — a medio camino entre una mesa institucional de energía y un documento de inspección verificado, y nombró lo que había que evitar: crema con serif y terracota, negro con verde ácido, y los filetes finos como toda la estética.',
      'El trabajo siguió este orden: benchmark competitivo, especificación, desarrollo y una ronda de comentarios del cliente, y esos comentarios se auditaron contra el código antes de aplicar ninguno.',
    ],
    insight:
      'De unas 67 instrucciones en los comentarios del cliente, 33 superaron la auditoría como tarjetas; 8 necesitaron antes una corrección, 22 quedaron bloqueadas por decisiones pendientes y 4 eran preguntas.',
    processHeading: 'Cuatro fases, cada una por escrito',
    steps: [
      {
        label: 'Benchmark',
        note: 'Los grandes y los competidores de tamaño medio, puntuados frente al diseño previsto',
      },
      {
        label: 'Especificación',
        note: 'Arquitectura de la información, sistema de diseño y 15 páginas',
      },
      { label: 'Desarrollo', note: 'Payload y Next.js en siete idiomas, con dos guardias de CI' },
      {
        label: 'Comentarios',
        note: 'Un documento de comentarios en persa convertido en tarjetas auditadas',
      },
    ],
    figureCaption:
      'Una secuencia común para todas las modalidades de entrega: las pruebas verificables de forma independiente llegan antes de cualquier compromiso financiero.',
  },
  solution: {
    heading: 'El Ledger Reference System',
    body: [
      'La especificación dice dónde invertir: «Pon aquí toda la audacia; mantén todo lo demás en calma.» La firma visual tiene tres partes: etiquetas de referencia unidas a las afirmaciones de credibilidad, manifiestos de datos compuestos como certificados de inspección monoespaciados con filetes finos, y una barra de identidad monoespaciada al pie de cada página.',
      'La paleta está pensada para ello: un fondo abisal color petróleo, acero marítimo, papel de documento, latón como único acento, un verde azulado de verificación bien alejado del verde ácido y óxido solo para las señales de alerta. IBM Plex Mono lleva cada número, referencia y etiqueta.',
      'Por debajo: Payload 3.85 y Next.js 16.2 con next-intl sobre MongoDB — 10 colecciones y 4 globales —, servidos a través de nginx, con un formulario de cualificación de compradores que puntúa cada consulta y la señala a la mesa de operaciones.',
    ],
    annotations: [
      'Cada dato de identidad es una fila con una base declarada, no una frase tranquilizadora.',
      'Los valores sin confirmar siguen visiblemente sin confirmar: «por aportar».',
      'Las etiquetas de referencia marcan lo que una contraparte puede comprobar: un registro mercantil, el índice global LEI.',
      'Compuesto en IBM Plex Mono, como un certificado de inspección.',
    ],
    manifestCaption:
      'El manifiesto de gobernanza: la identidad de la empresa como una tabla verificable, con cada valor sin confirmar dejado como marcador provisional.',
    figureItems: [
      'Productos: tres grados, cada uno definido por su especificación.',
      'Historial de operaciones: se publica solo tras la validación comercial y jurídica, nunca con nombres de contrapartes.',
    ],
    figureCaption:
      'Afirmaciones que la empresa puede respaldar, y reglas para las que todavía no puede.',
  },
  decisions: {
    heading: 'Cinco decisiones sobre la confianza',
    lede: 'La mayoría tratan de lo que el sitio se niega a decir.',
    items: [
      {
        title: 'Concentrar la audacia en un solo lugar',
        why: 'Una empresa de trading que parece diseñada se lee como marketing. El sistema de firma carga con toda la confianza visual y el resto de superficies se mantiene en calma, de modo que los manifiestos son lo que el lector recuerda.',
        alternatives: 'Una marca llamativa en todas las superficies',
        tradeoff: 'El sitio parece escueto a quien espera una campaña.',
      },
      {
        title: 'Hacer que las reglas rompan la compilación',
        why: 'Dos guardias de CI se ejecutan en cada compilación. Una falla ante el vocabulario del canal del fraude y la ortografía estadounidense en los textos del sitio; la otra, ante utilidades de maquetación con direcciones físicas, fuentes fijadas en el código y cadenas sin traducir. La segunda ya ha detectado un fallo real: una etiqueta accesible que se había escapado de la traducción.',
        alternatives: 'Una guía de estilo escrita',
        tradeoff: 'Una guardia solo protege los archivos que lee.',
      },
      {
        title: 'Escalar el riesgo legal en lugar de decidirlo',
        why: 'Zanjar las preguntas con riesgo legal no le correspondía al diseñador. Se enviaron al cliente en un memorando escrito, y allí se descartó una redacción recomendada en favor de un lenguaje sujeto al contrato y sin promesas.',
        alternatives: 'Resolver la redacción en los textos',
        tradeoff: 'Las páginas esperan respuestas que el desarrollo no puede aportar.',
      },
      {
        title: 'Auditar los comentarios del cliente antes de aplicarlos',
        why: 'Un documento de comentarios en persa de cuatro páginas se convirtió en un tablero de tarjetas, cada una con la petición citada y su traducción, y contrastada primero con el código real. Las peticiones basadas en una premisa errónea se corrigieron antes de que nadie las construyera.',
        alternatives: 'Aplicar los comentarios tal como estaban escritos',
        tradeoff: 'Una primera respuesta más lenta, y menos cambios que deshacer.',
      },
      {
        title: 'Dejar marcadores provisionales en lugar de inventar la identidad',
        why: 'Una razón social, los registros y las personas detrás de una empresa son hechos, no diseño. Cada uno sigue visiblemente «por aportar» hasta que la empresa lo confirma, y la página del equipo dice con palabras sencillas que solo se publicarán personas reales.',
        alternatives: 'Nombres y números de ejemplo verosímiles',
        tradeoff: 'El sitio no puede lanzarse hasta que la empresa los aporte.',
      },
    ],
    teamEvidence: 'La página del equipo, en lugar de un equipo: publicar solo personas reales.',
  },
  locales: {
    label: 'Siete idiomas',
    heading: 'Siete idiomas, dos de derecha a izquierda',
    body: [
      'Inglés, francés, árabe, español, japonés, chino y persa contienen todas las claves de mensajes con paridad exacta: 222 claves en cada archivo en el último commit. El árabe y el persa funcionan con propiedades lógicas de CSS, de modo que la maquetación se refleja en lugar de reconstruirse.',
      'Dos detalles solo aparecieron con el uso. Un cambio de fuente por idioma escrito dentro de una capa de cascada quedaba anulado sin aviso, así que ahora está fuera de las capas; y los manifiestos usan cifras tabulares, para que las columnas monoespaciadas sigan alineadas con texto de derecha a izquierda y CJK.',
    ],
    figureItems: ['Persa: la misma cabecera, reflejada.', 'Árabe: la misma cabecera, reflejada.'],
    figureCaption:
      'Los dos idiomas de derecha a izquierda, navegación incluida, a partir de los mismos componentes que el inglés.',
  },
  pages: {
    label: 'Todas las páginas',
    heading: 'Treinta y cuatro páginas, un solo sistema',
    body: [
      'Todas las páginas en inglés del despliegue, capturadas el 26 de septiembre de 2026 a 1440 píxeles de ancho y en un teléfono de 390 píxeles: las dieciséis páginas de primer nivel, el formulario de calificación del comprador, dos ofertas de empleo, doce artículos de análisis y tres páginas legales.',
      'Las páginas interiores llevan los mismos manifiestos de datos con filetes finos y la misma barra de identidad monoespaciada que las páginas emblemáticas, y en el teléfono cada página se apila en una sola columna, con la navegación tras un botón de menú. En la página de inicio, el panel de precios de mercado aparece enmascarado.',
    ],
    figureCaption: 'Todas las páginas en inglés, primera pantalla en escritorio y en teléfono; abra cualquiera para verla completa.',
    names: {
      home: 'Inicio',
      about: 'Acerca de',
      team: 'Equipo y dirección',
      'track-record': 'Trayectoria',
      products: 'Productos',
      'petroleum-derivatives': 'Derivados del petróleo',
      'how-we-work': 'Cómo trabajamos',
      procedure: 'Procedimiento',
      capabilities: 'Capacidades',
      compliance: 'Cumplimiento y KYC',
      governance: 'Gobernanza',
      sustainability: 'Responsabilidad',
      faq: 'Preguntas frecuentes',
      insights: 'Análisis',
      'insights--verify-oil-trading-counterparty': 'Análisis · Verificar a una contraparte',
      'insights--inspection-sampling-certificates': 'Análisis · Inspección, muestreo y certificados',
      'insights--oil-trade-documents-checklist': 'Análisis · Lista de documentos comerciales',
      'insights--product-specifications-guide': 'Análisis · Guía de especificaciones de producto',
      'insights--en-590-diesel-specification': 'Análisis · Especificación del diésel EN 590',
      'insights--jet-a1-specification': 'Análisis · Especificación del Jet A-1',
      'insights--iso-8217-fuel-oil-bunkers': 'Análisis · Fuelóleo y búnker según ISO 8217',
      'insights--incoterms-oil-products': 'Análisis · Incoterms para cargamentos de petróleo',
      'insights--reading-the-diesel-curve': 'Análisis · Leer la curva del diésel',
      'insights--letters-of-credit-plainly': 'Análisis · Cartas de crédito, en claro',
      'insights--screening-discipline': 'Análisis · El cribado como disciplina operativa',
      'insights--inspection-at-custody-transfer': 'Análisis · Inspección en la transferencia de custodia',
      careers: 'Empleo',
      'careers--distillates-trader': 'Empleo · Operador de destilados',
      'careers--operations-analyst': 'Empleo · Analista de operaciones',
      contact: 'Contacto',
      qualify: 'Calificación del comprador',
      'legal--terms': 'Legal · Condiciones de uso',
      'legal--privacy': 'Legal · Política de privacidad',
      'legal--cookies': 'Legal · Política de cookies',
    },
    alt: {
      desktop: 'Marqevon en escritorio — {page}, la primera pantalla',
      mobile: 'Marqevon en móvil — {page}, la primera pantalla',
      desktopFull: 'Marqevon en escritorio — {page}, la página completa',
      mobileFull: 'Marqevon en móvil — {page}, la página completa',
    },
    masked: ', con el panel de precios de mercado enmascarado',
  },
  outcomes: {
    heading: 'Desplegado, no lanzado',
    intro:
      'El sitio está desplegado y en servicio, pero no lanzado: no tiene dominio, se mantiene fuera de los buscadores a propósito y sus datos de identidad siguen siendo marcadores provisionales. Los comentarios aplicados están en un commit sin subir, no en el servidor. No hay analítica, solo comprobaciones de estado de los contenedores.',
    measured: [
      {
        label: 'Pruebas de integración superadas',
        context:
          'Junto con el lint, las dos guardias y una compilación de producción, en la rama de comentarios.',
        source: 'Tablero de comentarios de diseño, 7 de septiembre de 2026',
      },
      {
        label: 'Tarjetas de comentarios aplicadas en el código',
        context:
          'Una retenida por una decisión pendiente; ninguna verificada aún en una aplicación en ejecución.',
        source: 'Hoja de ruta de comentarios de diseño',
      },
    ],
    delivered: [
      {
        label: 'Copias de seguridad con restauración verificada',
        context:
          'Cada noche, y cada una se restaura para demostrar que funciona, además de un paquete de recuperación antes de cualquier versión que migre contenido.',
      },
      {
        label: 'Un despliegue con imágenes inmutables',
        context:
          'Las versiones se publican como imágenes fijas; la etiqueta mutable latest y las actualizaciones por sondeo se han retirado.',
      },
    ],
    shipped: [
      'Siete idiomas en paridad',
      'Dos guardias de CI',
      'Manifiesto de gobernanza',
      'Formulario de cualificación de compradores',
      'Etiquetas de referencia',
      'Maquetaciones de derecha a izquierda',
    ],
  },
  lessons: {
    heading: 'El recurso de confianza que no hacía nada',
    items: [
      {
        title: 'El resultado más útil fue una regla de lint',
        body: 'Codificar «no hables la jerga del canal del fraude» como una guardia la convirtió de una intención que alguien tiene que recordar en una propiedad del repositorio.',
      },
      {
        title: 'Una guardia solo protege lo que lee',
        body: 'La guardia de contenido analiza los archivos de textos y mensajes, no las listas de opciones del formulario, así que el formulario de cualificación de compradores aún ofrece dos de los términos prohibidos como modalidades de entrega. En la única página donde la empresa evalúa a otros, habla la jerga que prohíbe.',
      },
      {
        title: 'Un recurso de confianza tiene que hacer algo',
        body: 'Las etiquetas de referencia nombran un registro o el índice LEI, pero no enlazan a ninguno. Mientras no apunten a un registro real, el recurso distintivo solo aparenta verificación: justo el fallo que el proyecto quería evitar.',
      },
      {
        title: 'Confirmar primero por escrito las decisiones estructurales',
        body: 'Los siete idiomas se entregaron semanas antes de que un documento de gobernanza del cliente declarara pendiente la cuestión del idioma. Mantenerlos fue lo correcto, porque borrar trabajo terminado y protegido es el error más caro, pero la decisión debía quedar por escrito antes de que existieran las claves.',
      },
    ],
  },
}

const DE: MqvCopy = {
  statement:
    'Eine Website in sieben Sprachen für einen Eigenhändler im Mineralölhandel, die auf dem ersten Bildschirm eine Frage klärt: Ist die Firma echt und prüfbar?',
  industry: 'Energie · physischer Rohstoffhandel',
  team: 'Alleiniger Designer und Entwickler',
  heroCaption:
    'Die englische Startseite: der Leistungsumfang in einem Satz, der Firmenname noch als „wird nachgereicht“ markiert.',
  snapshot: {
    problem:
      'Betrügerische Makler sprechen einen gemeinsamen Jargon, und eine echte Firma, die ihn aufgreift, wirkt wie einer von ihnen.',
    role: 'Designer und Entwickler: Wettbewerbs-Benchmark, Informationsarchitektur, Designsystem, Content-Modell in sieben Sprachen, Umsetzung und CI-Wächter.',
    result:
      'Bereitgestellt, aber nicht gestartet: sieben Sprachen mit exakter Schlüsselparität und zwei CI-Wächter, die Identitätsangaben noch als Platzhalter.',
  },
  alt: {
    cover:
      'Marqevon — die Ablaufseite „Wie eine Transaktion abläuft, nach Liefermodus“ auf dunklem, erdölfarbenem Grund',
    home: 'Marqevon auf dem Desktop — die englische Startseite, „Wir beschaffen, verschiffen, finanzieren und liefern spezifizierte Mineralölprodukte“, über einer Karte der Schifffahrtsrouten',
    faq: 'Marqevon auf dem Desktop — die FAQ-Liste, die mit einer Gruppe „Was wir nicht tun“ zu geleasten Bankinstrumenten und Rabatten unter Marktpreis endet',
    procedure:
      'Marqevon auf dem Desktop — sieben nummerierte Schritte, die für jeden Liefermodus gelten, von der Qualifizierung bis zum Abgleich',
    manifest:
      'Marqevon auf dem Desktop — das Governance-Manifest, eine Monospace-Tabelle mit Identitätsangaben, Referenz-Chips für Register und LEI und Werten, die noch nachgereicht werden',
    products:
      'Marqevon auf dem Desktop — drei Produkte, nach Spezifikation aufgeführt: Diesel nach EN 590, Jet A-1 und Naphtha',
    trackRecord:
      'Marqevon auf dem Desktop — die Regel für die Veröffentlichung einer Erfolgsbilanz: erst nach kaufmännischer und rechtlicher Prüfung, ohne Namen von Gegenparteien',
    team: 'Marqevon auf dem Desktop — ein Hinweis anstelle eines Teams: Namentlich genannte Personen erscheinen erst nach geschäftlicher und rechtlicher Prüfung',
    homeFa:
      'Marqevon auf dem Desktop — die persische Startseite, von rechts nach links gespiegelt, mit umgekehrter Navigation',
    homeAr: 'Marqevon auf dem Desktop — die arabische Startseite, von rechts nach links gespiegelt',
  },
  context: {
    heading: 'Ein Eigenhändler, kein Makler',
    body: [
      'Marqevon ist ein Eigenhändler (kein Makler) im physischen Mineralölhandel: Das Unternehmen kauft bei Produzenten und Raffinerien und liefert an Raffinerien, Distributoren, Fluggesellschaften, Versorgungsunternehmen und Industriekunden. Die Website richtet sich zuerst an Gegenparteien, dann an Banken und Partner der Handelsfinanzierung, dann an Bewerber, dann an Presse und Aufsichtsbehörden.',
      'Die Arbeit folgte von Anfang an einer Spezifikation. Eine 46 KB große Spezifikation legte Informationsarchitektur, Designsystem und alle 15 Seiten vor der Umsetzung fest, und sie beginnt damit, das übliche Briefing zu verwerfen: In dieser Branche besteht die Aufgabe einer Website nicht im Marketing, sondern darin, überprüfbare Legitimität auszustrahlen.',
    ],
  },
  problem: {
    heading: 'Der Betrugskanal hat einen eigenen Jargon',
    body: [
      'Der physische Rohstoffhandel hat ein Betrugsproblem, und der Betrug hat ein Vokabular: Informelle Makler geben sich durch ein erkennbares Set von Instrumentenkürzeln und Mandatstiteln zu erkennen — TTT, TTV, DTA, ATB. Ein seriöser mittelgroßer Eigenhändler, der auch nur einen davon verwendet, wirkt wie einer von ihnen.',
      'Die ganze Website musste also eine einzige Frage beantworten, in sieben Sprachen, zwei davon von rechts nach links geschrieben.',
    ],
  },
  question: {
    text: '„Ist dieses Unternehmen echt und prüfbar, oder ist es die nächste Fassade einer Maklerkette? So gestalten, dass die Antwort schon auf dem ersten Bildschirm offensichtlich ist.“',
    attribution: 'Die Spezifikation für Informationsarchitektur und Design',
    method: 'Vor der Umsetzung verfasst, als Prüfstein für jede Seite',
  },
  research: {
    heading: 'Eine Lücke, die die Großen nicht besetzen',
    body: [
      'Ein Wettbewerbs-Benchmark bewertete das geplante Design im Vergleich zu den größten Handelshäusern und einer Reihe mittelgroßer Wettbewerber. Die gefundene Lücke war es wert, besetzt zu werden: Keiner der Großen vermarktet ausdrücklich eine Haltung gegen Betrug oder sagt, was er nicht tun wird.',
      'Dieser Befund wurde zur Struktur statt zum Slogan: eine Gruppe „Was wir nicht tun“ in den FAQ, eine offene Einladung zur unabhängigen Überprüfung und eine Liste von Begriffen, die der Text nie verwenden darf.',
    ],
    figureCaption:
      'Die FAQ enden mit dem, was die Firma nicht tun wird: geleaste Bankinstrumente, Sonderkontingente außerhalb des Marktes, garantierte Rabatte unter Marktpreis.',
  },
  approach: {
    heading: 'Ein Präzisionsinstrument für einen Markt, der auf Vertrauen beruht',
    body: [
      'Die Spezifikation legte die Richtung in einer Zeile fest — „Präzisionsinstrument für einen Markt, der auf Vertrauen beruht“ —, irgendwo zwischen einem institutionellen Energie-Desk und einem geprüften Inspektionsdokument, und benannte, was zu vermeiden war: Creme mit Serifenschrift und Terrakotta, Schwarz mit Säuregrün und Haarlinien als gesamte Ästhetik.',
      'Die Arbeit lief in dieser Reihenfolge: Benchmark, Spezifikation, Umsetzung, dann eine Runde Kundenfeedback, und das Feedback wurde am Code geprüft, bevor irgendetwas davon umgesetzt wurde.',
    ],
    insight:
      'Von rund 67 Anweisungen im Feedback des Kunden bestanden 33 die Prüfung als Karten; 8 brauchten zuerst eine Korrektur, 22 hingen an offenen Entscheidungen, und 4 waren Fragen.',
    processHeading: 'Vier Durchgänge, jeder schriftlich festgehalten',
    steps: [
      {
        label: 'Benchmark',
        note: 'Die Großen und mittelgroße Wettbewerber, gemessen am geplanten Design',
      },
      { label: 'Spezifikation', note: 'Informationsarchitektur, Designsystem und 15 Seiten' },
      { label: 'Umsetzung', note: 'Payload und Next.js in sieben Sprachen, mit zwei CI-Wächtern' },
      { label: 'Feedback', note: 'Ein persisches Feedbackdokument, in geprüfte Karten überführt' },
    ],
    figureCaption:
      'Ein gemeinsamer Ablauf für jeden Liefermodus: Unabhängig überprüfbare Nachweise kommen vor jeder finanziellen Verpflichtung.',
  },
  solution: {
    heading: 'Das Ledger Reference System',
    body: [
      'Die Spezifikation sagt, wohin die Kühnheit gehört: „Die Kühnheit hier einsetzen; alles andere bleibt ruhig.“ Die Signatur hat drei Teile — Referenz-Chips an Glaubwürdigkeitsaussagen, Datenmanifeste, gesetzt wie Inspektionszertifikate in Monospace mit Haarlinien, und eine Monospace-Identitätsleiste am Fuß jeder Seite.',
      'Die Palette ist darauf ausgelegt: ein abgründig dunkler Erdölgrund, maritimer Stahl, Dokumentenpapier, Messing als einziger Akzent, ein Verifikations-Türkis mit deutlichem Abstand zu Säuregrün und Rost nur für Warnsignale. IBM Plex Mono trägt jede Zahl, jede Referenz und jeden Chip.',
      'Darunter: Payload 3.85 und Next.js 16.2 mit next-intl auf MongoDB — 10 Collections und 4 Globals —, ausgeliefert über nginx, mit einer Käuferqualifizierung, die jede Anfrage bewertet und für den Desk markiert.',
    ],
    annotations: [
      'Jede Identitätsangabe ist eine Zeile mit benannter Grundlage, kein beruhigender Satz.',
      'Unbestätigte Werte bleiben sichtbar unbestätigt: „wird nachgereicht“.',
      'Referenz-Chips markieren, was eine Gegenpartei prüfen kann: ein Unternehmensregister, den globalen LEI-Index.',
      'In IBM Plex Mono gesetzt, wie ein Inspektionszertifikat.',
    ],
    manifestCaption:
      'Das Governance-Manifest: die Identität der Firma als prüfbare Tabelle, jeder unbestätigte Wert als Platzhalter belassen.',
    figureItems: [
      'Produkte: drei Sorten, jede durch ihre Spezifikation definiert.',
      'Erfolgsbilanz: erst nach kaufmännischer und rechtlicher Prüfung veröffentlicht, nie mit Namen von Gegenparteien.',
    ],
    figureCaption:
      'Aussagen, für die die Firma einstehen kann, und Regeln für die, bei denen sie es noch nicht kann.',
  },
  decisions: {
    heading: 'Fünf Entscheidungen über Vertrauen',
    lede: 'Die meisten betreffen das, was die Website bewusst nicht sagt.',
    items: [
      {
        title: 'Die Kühnheit an einer Stelle bündeln',
        why: 'Eine Handelsfirma, die gestaltet aussieht, wirkt wie Marketing. Das Signatursystem trägt die gesamte visuelle Selbstsicherheit, alle anderen Flächen bleiben ruhig, sodass die Manifeste das sind, woran sich Leser erinnern.',
        alternatives: 'Eine auffällige Marke auf jeder Fläche',
        tradeoff: 'Wer eine Kampagne erwartet, findet die Website karg.',
      },
      {
        title: 'Regeln den Build scheitern lassen',
        why: 'Zwei Wächter laufen in der CI. Der eine schlägt beim Vokabular des Betrugskanals und bei amerikanischer Schreibweise im Text der Website an, der andere bei Layout-Utilities mit physischen Richtungen, fest codierten Schriften und unübersetzten Strings. Der zweite hat bereits einen echten Fehler gefunden: ein barrierefreies Label, das der Übersetzung entgangen war.',
        alternatives: 'Ein schriftlicher Styleguide',
        tradeoff: 'Ein Wächter schützt nur die Dateien, die er liest.',
      },
      {
        title: 'Rechtliche Risiken eskalieren, statt sie zu entscheiden',
        why: 'Fragen mit rechtlichem Risiko hatte nicht der Designer zu klären. Sie gingen in einem schriftlichen Memo an den Kunden, und dort wurde eine empfohlene Formulierung zugunsten vertragsgebundener, unverbindlicher Sprache abgelehnt.',
        alternatives: 'Die Formulierung im Text festlegen',
        tradeoff: 'Seiten warten auf Antworten, die die Umsetzung nicht liefern kann.',
      },
      {
        title: 'Kundenfeedback prüfen, bevor es umgesetzt wird',
        why: 'Ein vierseitiges persisches Feedbackdokument wurde zu einem Board aus Karten, jede mit der zitierten Anfrage samt Übersetzung und zuerst am echten Code geprüft. Anfragen, die auf einer falschen Prämisse beruhten, wurden korrigiert, bevor jemand sie baute.',
        alternatives: 'Das Feedback so umsetzen, wie es geschrieben ist',
        tradeoff:
          'Eine langsamere erste Antwort, und weniger Änderungen, die rückgängig zu machen sind.',
      },
      {
        title: 'Platzhalter lassen, statt Identität zu erfinden',
        why: 'Ein Firmenname, Registrierungen und die Menschen hinter einer Firma sind Fakten, kein Design. Jede Angabe bleibt sichtbar „wird nachgereicht“, bis die Firma sie bestätigt, und die Teamseite sagt in klaren Worten, dass nur echte Personen veröffentlicht werden.',
        alternatives: 'Plausible Beispielnamen und -zahlen',
        tradeoff: 'Die Website kann erst starten, wenn die Firma sie liefert.',
      },
    ],
    teamEvidence: 'Die Teamseite anstelle eines Teams: nur echte Personen veröffentlichen.',
  },
  locales: {
    label: 'Sieben Sprachen',
    heading: 'Sieben Sprachen, zwei von rechts nach links',
    body: [
      'Englisch, Französisch, Arabisch, Spanisch, Japanisch, Chinesisch und Persisch führen jeden Nachrichtenschlüssel in exakter Parität — 222 Schlüssel pro Datei beim letzten Commit. Arabisch und Persisch laufen auf logischen CSS-Eigenschaften, sodass sich das Layout spiegelt, statt neu gebaut zu werden.',
      'Zwei Details zeigten sich erst im Gebrauch. Ein Schriftwechsel pro Sprache, der innerhalb eines Cascade Layer stand, wurde stillschweigend überschrieben und steht deshalb jetzt außerhalb der Layer; und die Manifeste verwenden Tabellenziffern, damit Monospace-Spalten auch unter Rechts-nach-links- und CJK-Text bündig bleiben.',
    ],
    figureItems: ['Persisch: derselbe Hero, gespiegelt.', 'Arabisch: derselbe Hero, gespiegelt.'],
    figureCaption:
      'Beide Rechts-nach-links-Sprachen, Navigation inklusive, aus denselben Komponenten wie die englische Fassung.',
  },
  pages: {
    label: 'Alle Seiten',
    heading: 'Vierunddreißig Seiten, ein System',
    body: [
      'Jede englische Seite des Deployments, aufgenommen am 26. September 2026 bei 1.440 Pixeln Breite und auf einem 390 Pixel breiten Smartphone: die sechzehn Seiten der obersten Ebene, das Formular zur Käuferqualifizierung, zwei Stellenanzeigen, zwölf Fachartikel und drei Rechtsseiten.',
      'Die Innenseiten tragen dieselben Datenmanifeste mit Haarlinien und dieselbe Monospace-Identitätsleiste wie die Vorzeigeseiten, und auf dem Smartphone stapelt sich jede Seite in einer Spalte, die Navigation hinter einem Menüknopf. Auf der Startseite ist das Feld mit den Marktpreisen abgedeckt.',
    ],
    figureCaption: 'Jede englische Seite, erster Bildschirm auf Desktop und Smartphone; jede Seite lässt sich ganz öffnen.',
    names: {
      home: 'Startseite',
      about: 'Über uns',
      team: 'Team und Leitung',
      'track-record': 'Referenzen',
      products: 'Produkte',
      'petroleum-derivatives': 'Erdölderivate',
      'how-we-work': 'Wie wir arbeiten',
      procedure: 'Ablauf',
      capabilities: 'Kompetenzen',
      compliance: 'Compliance und KYC',
      governance: 'Unternehmensführung',
      sustainability: 'Verantwortung',
      faq: 'Häufige Fragen',
      insights: 'Analysen',
      'insights--verify-oil-trading-counterparty': 'Analysen · Gegenparteien prüfen',
      'insights--inspection-sampling-certificates': 'Analysen · Inspektion, Probenahme und Zertifikate',
      'insights--oil-trade-documents-checklist': 'Analysen · Checkliste der Handelsdokumente',
      'insights--product-specifications-guide': 'Analysen · Leitfaden zu Produktspezifikationen',
      'insights--en-590-diesel-specification': 'Analysen · Dieselspezifikation EN 590',
      'insights--jet-a1-specification': 'Analysen · Spezifikation für Jet A-1',
      'insights--iso-8217-fuel-oil-bunkers': 'Analysen · Heizöl und Bunkerkraftstoffe nach ISO 8217',
      'insights--incoterms-oil-products': 'Analysen · Incoterms für Mineralölladungen',
      'insights--reading-the-diesel-curve': 'Analysen · Die Dieselkurve lesen',
      'insights--letters-of-credit-plainly': 'Analysen · Akkreditive, einfach erklärt',
      'insights--screening-discipline': 'Analysen · Screening als betriebliche Disziplin',
      'insights--inspection-at-custody-transfer': 'Analysen · Inspektion bei der Übergabe',
      careers: 'Karriere',
      'careers--distillates-trader': 'Karriere · Händler für Mitteldestillate',
      'careers--operations-analyst': 'Karriere · Operations-Analyst',
      contact: 'Kontakt',
      qualify: 'Käuferqualifizierung',
      'legal--terms': 'Rechtliches · Nutzungsbedingungen',
      'legal--privacy': 'Rechtliches · Datenschutzerklärung',
      'legal--cookies': 'Rechtliches · Cookie-Richtlinie',
    },
    alt: {
      desktop: 'Marqevon auf dem Desktop — {page}, der erste Bildschirm',
      mobile: 'Marqevon auf dem Smartphone — {page}, der erste Bildschirm',
      desktopFull: 'Marqevon auf dem Desktop — {page}, die ganze Seite',
      mobileFull: 'Marqevon auf dem Smartphone — {page}, die ganze Seite',
    },
    masked: ', das Feld mit den Marktpreisen abgedeckt',
  },
  outcomes: {
    heading: 'Bereitgestellt, nicht gestartet',
    intro:
      'Die Website ist bereitgestellt und läuft, ist aber nicht gestartet: Sie hat keine Domain, bleibt bewusst aus Suchmaschinen heraus, und ihre Identitätsangaben sind noch Platzhalter. Das umgesetzte Feedback liegt in einem nicht gepushten Commit, nicht auf dem Server. Es gibt keine Analytics, nur Health-Checks der Container.',
    measured: [
      {
        label: 'Bestandene Integrationstests',
        context:
          'Neben Lint, beiden Wächtern und einem Produktions-Build, auf dem Feedback-Branch.',
        source: 'Design-Feedback-Board, 7. September 2026',
      },
      {
        label: 'Im Code umgesetzte Feedback-Karten',
        context:
          'Eine wartet auf eine offene Entscheidung; noch keine an einer laufenden App verifiziert.',
        source: 'Design-Feedback-Roadmap',
      },
    ],
    delivered: [
      {
        label: 'Wiederherstellungsgeprüfte Backups',
        context:
          'Jede Nacht, jedes einzeln wiederhergestellt, um zu beweisen, dass es funktioniert, dazu ein Recovery-Paket vor jedem Release, das Inhalte migriert.',
      },
      {
        label: 'Ein Deployment mit unveränderlichen Images',
        context:
          'Releases werden als feste Images ausgeliefert; das veränderliche latest-Tag und Updates per Polling sind abgeschafft.',
      },
    ],
    shipped: [
      'Sieben Sprachen in Parität',
      'Zwei CI-Wächter',
      'Governance-Manifest',
      'Käuferqualifizierung',
      'Referenz-Chips',
      'Rechts-nach-links-Layouts',
    ],
  },
  lessons: {
    heading: 'Das Vertrauenselement, das nichts bewirkte',
    items: [
      {
        title: 'Das nützlichste Ergebnis war eine Lint-Regel',
        body: 'Seit „Sprich nicht den Jargon des Betrugskanals“ als Wächter kodiert ist, ist daraus statt einer Absicht, an die jemand denken muss, eine Eigenschaft des Repositorys geworden.',
      },
      {
        title: 'Ein Wächter schützt nur, was er liest',
        body: 'Der Content-Wächter prüft Text- und Nachrichtendateien, nicht die Optionslisten des Formulars, daher bietet das Formular zur Käuferqualifizierung noch zwei der verbotenen Begriffe als Lieferoptionen an. Auf der einzigen Seite, auf der die Firma andere prüft, spricht sie den Jargon, den sie verbietet.',
      },
      {
        title: 'Ein Vertrauenselement muss etwas bewirken',
        body: 'Die Referenz-Chips nennen ein Register oder den LEI-Index, verlinken aber auf keines von beiden. Solange sie nicht auf einen echten Eintrag verweisen, sieht das Signaturelement nur nach Verifikation aus — genau das Scheitern, das das Projekt vermeiden wollte.',
      },
      {
        title: 'Strukturelle Entscheidungen zuerst schriftlich bestätigen',
        body: 'Die sieben Sprachen waren Wochen fertig, bevor ein Governance-Dokument des Kunden die Sprachfrage als offen bezeichnete. Sie zu behalten war richtig, denn fertige, abgesicherte Arbeit zu löschen ist der teurere Fehler, aber die Entscheidung gehörte schriftlich festgehalten, bevor die Schlüssel existierten.',
      },
    ],
  },
}

const FR: MqvCopy = {
  statement:
    'Un site en sept langues pour un négociant principal en pétrole, conçu pour répondre dès le premier écran : cette société est-elle réelle et vérifiable ?',
  industry: 'Énergie · négoce physique de matières premières',
  team: 'Seul designer et développeur',
  heroCaption:
    'La page d’accueil en anglais : le périmètre des produits en une phrase, et la raison sociale encore marquée « à fournir ».',
  snapshot: {
    problem:
      'Les courtiers frauduleux partagent un même jargon, et une vraie société qui le reprend passe pour l’un d’eux.',
    role: 'Designer et développeur : benchmark concurrentiel, architecture de l’information, design system, modèle de contenu en sept langues, développement et garde-fous CI.',
    result:
      'Déployé mais pas lancé : sept langues en parité exacte de clés et deux garde-fous CI, les faits d’identité restant des valeurs provisoires.',
  },
  alt: {
    cover:
      'Marqevon — la page de procédure, « Le déroulement d’une transaction, selon le mode de livraison », sur un fond pétrole sombre',
    home: 'Marqevon sur ordinateur — la page d’accueil en anglais, « Nous sourçons, expédions, finançons et livrons des produits pétroliers spécifiés », sur une carte des routes maritimes',
    faq: 'Marqevon sur ordinateur — la liste de la FAQ, qui se termine par un groupe « Ce que nous ne faisons pas » sur les instruments bancaires loués et les remises sous le prix du marché',
    procedure:
      'Marqevon sur ordinateur — sept étapes numérotées communes à tous les modes de livraison, de la qualification au rapprochement',
    manifest:
      'Marqevon sur ordinateur — le manifeste de gouvernance, un tableau à chasse fixe des faits d’identité, avec des pastilles de registre et de LEI et des valeurs encore « à fournir »',
    products:
      'Marqevon sur ordinateur — trois produits présentés par spécification : gazole EN 590, Jet A-1 et naphta',
    trackRecord:
      'Marqevon sur ordinateur — la règle de publication des références : uniquement après validation commerciale et juridique, sans nom de contrepartie',
    team: 'Marqevon sur ordinateur — une note à la place d’une équipe : les personnes nommées ne sont publiées qu’après validation commerciale et juridique',
    homeFa:
      'Marqevon sur ordinateur — la page d’accueil en persan, en miroir de droite à gauche, navigation inversée',
    homeAr: 'Marqevon sur ordinateur — la page d’accueil en arabe, en miroir de droite à gauche',
  },
  context: {
    heading: 'Un négociant principal, pas un courtier',
    body: [
      'Marqevon est un négociant principal en produits pétroliers physiques : il achète auprès de producteurs et de raffineurs et livre des raffineurs, des distributeurs, des compagnies aériennes, des opérateurs de services publics et des industriels. Son site s’adresse d’abord aux contreparties, puis aux banques et aux partenaires de financement du commerce, puis aux candidats, enfin à la presse et aux régulateurs.',
      'Le travail a été guidé par la spécification dès le départ. Une spécification de 46 KB a fixé l’architecture de l’information, le design system et les 15 pages avant le développement, et elle s’ouvre en rejetant le brief habituel : dans ce secteur, le rôle d’un site n’est pas le marketing, c’est de projeter une légitimité vérifiable.',
    ],
  },
  problem: {
    heading: 'Le canal de la fraude a son jargon',
    body: [
      'Le négoce physique de matières premières a un problème de fraude, et cette fraude a un vocabulaire : les courtiers informels se signalent par un ensemble reconnaissable de sigles d’instruments et de titres de mandat — TTT, TTV, DTA, ATB. Un négociant principal légitime de taille moyenne qui en emploie un seul passe pour l’un d’eux.',
      'Tout le site devait donc répondre à une seule question, en sept langues, dont deux s’écrivent de droite à gauche.',
    ],
  },
  question: {
    text: '« Cette entité est-elle réelle et vérifiable, ou n’est-ce qu’une façade de plus d’une chaîne de courtiers ? Concevoir pour que la réponse soit évidente dès le premier écran. »',
    attribution: 'La spécification d’architecture de l’information et de design',
    method: 'Rédigée avant le développement, comme critère pour chaque page',
  },
  research: {
    heading: 'L’espace que les majors ne revendiquent pas',
    body: [
      'Un benchmark concurrentiel a évalué le design visé face aux plus grandes maisons de négoce et à un groupe de pairs de taille moyenne. L’écart relevé méritait d’être occupé : aucune des majors ne met explicitement en avant une position antifraude, ni ne dit ce qu’elle ne fera pas.',
      'Ce constat est devenu une structure plutôt qu’un slogan : un groupe « Ce que nous ne faisons pas » dans la FAQ, une invitation ouverte à la vérification indépendante, et une liste de termes que les textes ne doivent jamais employer.',
    ],
    figureCaption:
      'La FAQ se termine sur ce que la société ne fera pas : instruments bancaires loués, allocations hors marché, remises garanties sous le prix du marché.',
  },
  approach: {
    heading: 'Un instrument de précision pour un marché fondé sur la confiance',
    body: [
      'La spécification a fixé la direction en une ligne — « Un instrument de précision pour un marché fondé sur la confiance » —, quelque part entre un desk énergie institutionnel et un document d’inspection vérifié, et a nommé ce qu’il fallait éviter : le crème avec une serif et du terracotta, le noir avec un vert acide, et les filets fins comme seule esthétique.',
      'Le travail a enchaîné benchmark, spécification et développement, puis une série de retours du client, et ces retours ont été audités face au code avant d’en appliquer le moindre.',
    ],
    insight:
      'Sur environ 67 instructions dans les retours du client, 33 ont passé l’audit sous forme de cartes ; 8 demandaient d’abord une correction, 22 étaient bloquées par des décisions en suspens, et 4 étaient des questions.',
    processHeading: 'Quatre passes, chacune consignée par écrit',
    steps: [
      {
        label: 'Benchmark',
        note: 'Les majors et les pairs de taille moyenne, évalués face au design visé',
      },
      { label: 'Spécification', note: 'Architecture de l’information, design system et 15 pages' },
      {
        label: 'Développement',
        note: 'Payload et Next.js en sept langues, avec deux garde-fous CI',
      },
      { label: 'Retours', note: 'Un document de retours en persan transformé en cartes auditées' },
    ],
    figureCaption:
      'Une séquence commune à tous les modes de livraison : des preuves vérifiables de façon indépendante passent avant tout engagement financier.',
  },
  solution: {
    heading: 'Le Ledger Reference System',
    body: [
      'La spécification dit où investir : « Mettre l’audace ici ; garder tout le reste discret. » La signature compte trois éléments — des pastilles de référence rattachées aux affirmations de crédibilité, des manifestes de données composés comme des certificats d’inspection à chasse fixe et à filets fins, et une barre d’identité à chasse fixe au pied de chaque page.',
      'La palette est conçue pour elle : un fond pétrole abyssal, un acier maritime, un papier de document, le laiton comme unique accent, un bleu-vert « vérifié » tenu à distance du vert acide, et la rouille réservée aux signaux d’alerte. IBM Plex Mono porte chaque chiffre, chaque référence et chaque pastille.',
      'En dessous : Payload 3.85 et Next.js 16.2 avec next-intl sur MongoDB — 10 collections et 4 globals —, servis par nginx, avec un formulaire de qualification des acheteurs qui note chaque demande et la signale au desk.',
    ],
    annotations: [
      'Chaque fait d’identité est une ligne avec une base nommée, pas une phrase rassurante.',
      'Les valeurs non confirmées restent visiblement non confirmées : « à fournir ».',
      'Les pastilles de référence signalent ce qu’une contrepartie peut vérifier : un registre des sociétés, l’index mondial des LEI.',
      'Composé en IBM Plex Mono, comme un certificat d’inspection.',
    ],
    manifestCaption:
      'Le manifeste de gouvernance : l’identité de la société sous forme de tableau vérifiable, chaque valeur non confirmée laissée en valeur provisoire.',
    figureItems: [
      'Produits : trois qualités, chacune définie par sa spécification.',
      'Références : publiées uniquement après validation commerciale et juridique, jamais avec des noms de contreparties.',
    ],
    figureCaption:
      'Ce que la société peut garantir, et des règles pour ce qu’elle ne peut pas encore garantir.',
  },
  decisions: {
    heading: 'Cinq décisions sur la confiance',
    lede: 'La plupart portent sur ce que le site refuse de dire.',
    items: [
      {
        title: 'Concentrer l’audace en un seul endroit',
        why: 'Une société de négoce qui a l’air « designée » passe pour du marketing. Le système de signature porte toute l’assurance visuelle et toutes les autres surfaces restent discrètes, si bien que ce sont les manifestes dont le lecteur se souvient.',
        alternatives: 'Une marque affirmée sur toutes les surfaces',
        tradeoff: 'Le site paraît dépouillé à qui attend une campagne.',
      },
      {
        title: 'Faire échouer le build quand une règle est enfreinte',
        why: 'Deux garde-fous tournent en CI. L’un échoue sur le vocabulaire du canal de la fraude et sur l’orthographe américaine dans les textes du site ; l’autre sur les utilitaires de mise en page à direction physique, les polices codées en dur et les chaînes non traduites. Le second a déjà attrapé un vrai oubli : un libellé d’accessibilité qui avait échappé à la traduction.',
        alternatives: 'Un guide de style écrit',
        tradeoff: 'Un garde-fou ne protège que les fichiers qu’il lit.',
      },
      {
        title: 'Faire remonter le risque juridique au lieu de trancher',
        why: 'Les questions porteuses d’un risque juridique n’étaient pas au designer de les régler. Elles sont parties chez le client dans une note écrite, et une formulation recommandée y a été écartée au profit d’un langage encadré par le contrat et non engageant.',
        alternatives: 'Trancher la formulation dans les textes',
        tradeoff: 'Des pages attendent des réponses que le développement ne peut pas fournir.',
      },
      {
        title: 'Auditer les retours du client avant de les appliquer',
        why: 'Un document de retours de quatre pages en persan est devenu un tableau de cartes, chacune citant la demande avec une traduction et vérifiée d’abord face au vrai code. Les demandes fondées sur une prémisse erronée ont été corrigées avant que quiconque ne les développe.',
        alternatives: 'Appliquer les retours tels quels',
        tradeoff: 'Une première réponse plus lente, et moins de changements à défaire.',
      },
      {
        title: 'Laisser des valeurs provisoires plutôt qu’inventer une identité',
        why: 'Une raison sociale, des immatriculations et les personnes derrière une société sont des faits, pas du design. Chacun reste visiblement « à fournir » jusqu’à ce que la société le confirme, et la page équipe dit en termes simples que seules de vraies personnes seront publiées.',
        alternatives: 'Des noms et des numéros d’exemple plausibles',
        tradeoff: 'Le site ne peut pas être lancé tant que la société ne les a pas fournis.',
      },
    ],
    teamEvidence: 'La page équipe, à la place d’une équipe : ne publier que de vraies personnes.',
  },
  locales: {
    label: 'Sept langues',
    heading: 'Sept langues, dont deux de droite à gauche',
    body: [
      'L’anglais, le français, l’arabe, l’espagnol, le japonais, le chinois et le persan portent chaque clé de message en parité exacte — 222 clés dans chaque fichier au dernier commit. L’arabe et le persan reposent sur les propriétés logiques CSS, si bien que la mise en page se reflète au lieu d’être reconstruite.',
      'Deux détails ne sont apparus qu’à l’usage. Un changement de police par langue écrit dans une couche de cascade était écrasé sans bruit ; il se trouve désormais hors des couches. Et les manifestes utilisent des chiffres tabulaires, si bien que les colonnes à chasse fixe restent alignées sous un texte de droite à gauche ou CJK.',
    ],
    figureItems: ['Persan : le même en-tête, en miroir.', 'Arabe : le même en-tête, en miroir.'],
    figureCaption:
      'Les deux langues de droite à gauche, navigation comprise, à partir des mêmes composants que l’anglais.',
  },
  pages: {
    label: 'Toutes les pages',
    heading: 'Trente-quatre pages, un seul système',
    body: [
      'Toutes les pages anglaises du déploiement, capturées le 26 septembre 2026 à 1 440 pixels de large et sur un téléphone de 390 pixels : les seize pages de premier niveau, le formulaire de qualification de l’acheteur, deux offres d’emploi, douze articles d’analyse et trois pages juridiques.',
      'Les pages intérieures portent les mêmes manifestes de données à filets fins et la même barre d’identité à chasse fixe que les pages phares, et sur téléphone chaque page s’empile en une seule colonne, la navigation repliée derrière un bouton de menu. Sur la page d’accueil, le panneau des prix du marché est masqué.',
    ],
    figureCaption: 'Toutes les pages anglaises, premier écran sur ordinateur et sur téléphone ; ouvrez une page pour la voir en entier.',
    names: {
      home: 'Accueil',
      about: 'À propos',
      team: 'Équipe et direction',
      'track-record': 'Références',
      products: 'Produits',
      'petroleum-derivatives': 'Dérivés pétroliers',
      'how-we-work': 'Notre méthode',
      procedure: 'Procédure',
      capabilities: 'Capacités',
      compliance: 'Conformité et KYC',
      governance: 'Gouvernance',
      sustainability: 'Responsabilité',
      faq: 'Questions fréquentes',
      insights: 'Analyses',
      'insights--verify-oil-trading-counterparty': 'Analyses · Vérifier une contrepartie',
      'insights--inspection-sampling-certificates': 'Analyses · Inspection, échantillonnage et certificats',
      'insights--oil-trade-documents-checklist': 'Analyses · Liste des documents commerciaux',
      'insights--product-specifications-guide': 'Analyses · Guide des spécifications produit',
      'insights--en-590-diesel-specification': 'Analyses · Spécification du diesel EN 590',
      'insights--jet-a1-specification': 'Analyses · Spécification du Jet A-1',
      'insights--iso-8217-fuel-oil-bunkers': 'Analyses · Fioul et soutes selon l’ISO 8217',
      'insights--incoterms-oil-products': 'Analyses · Incoterms pour les cargaisons pétrolières',
      'insights--reading-the-diesel-curve': 'Analyses · Lire la courbe du diesel',
      'insights--letters-of-credit-plainly': 'Analyses · Les crédits documentaires, simplement',
      'insights--screening-discipline': 'Analyses · Le filtrage comme discipline opérationnelle',
      'insights--inspection-at-custody-transfer': 'Analyses · L’inspection au transfert de garde',
      careers: 'Carrières',
      'careers--distillates-trader': 'Carrières · Négociant en distillats',
      'careers--operations-analyst': 'Carrières · Analyste opérations',
      contact: 'Contact',
      qualify: 'Qualification de l’acheteur',
      'legal--terms': 'Juridique · Conditions d’utilisation',
      'legal--privacy': 'Juridique · Politique de confidentialité',
      'legal--cookies': 'Juridique · Politique relative aux cookies',
    },
    alt: {
      desktop: 'Marqevon sur ordinateur — {page}, le premier écran',
      mobile: 'Marqevon sur mobile — {page}, le premier écran',
      desktopFull: 'Marqevon sur ordinateur — {page}, la page entière',
      mobileFull: 'Marqevon sur mobile — {page}, la page entière',
    },
    masked: ', le panneau des prix du marché masqué',
  },
  outcomes: {
    heading: 'Déployé, pas lancé',
    intro:
      'Le site est déployé et en service, mais pas lancé : il n’a pas de domaine, reste volontairement hors des moteurs de recherche, et ses faits d’identité sont encore des valeurs provisoires. Les retours appliqués se trouvent dans un commit non poussé, pas sur le serveur. Il n’y a aucune mesure d’audience, seulement des contrôles de santé des conteneurs.',
    measured: [
      {
        label: 'Tests d’intégration réussis',
        context:
          'Aux côtés du lint, des deux garde-fous et d’un build de production, sur la branche des retours.',
        source: 'Tableau des retours de design, 7 septembre 2026',
      },
      {
        label: 'Cartes de retours appliquées dans le code',
        context:
          'Une en attente d’une décision ouverte ; aucune encore vérifiée sur une application en fonctionnement.',
        source: 'Feuille de route des retours de design',
      },
    ],
    delivered: [
      {
        label: 'Sauvegardes à restauration vérifiée',
        context:
          'Chaque nuit, chacune restaurée pour prouver qu’elle fonctionne, plus un paquet de récupération avant toute version qui migre du contenu.',
      },
      {
        label: 'Un déploiement par images immuables',
        context:
          'Les versions sont livrées sous forme d’images figées ; le tag latest mutable et les mises à jour par interrogation sont abandonnés.',
      },
    ],
    shipped: [
      'Sept langues en parité',
      'Deux garde-fous CI',
      'Manifeste de gouvernance',
      'Formulaire de qualification des acheteurs',
      'Pastilles de référence',
      'Mises en page de droite à gauche',
    ],
  },
  lessons: {
    heading: 'Le dispositif de confiance qui ne faisait rien',
    items: [
      {
        title: 'Le résultat le plus utile a été une règle de lint',
        body: 'Encoder « ne pas parler le jargon du canal de la fraude » sous forme de garde-fou l’a fait passer d’une intention dont quelqu’un doit se souvenir à une propriété du dépôt.',
      },
      {
        title: 'Un garde-fou ne protège que ce qu’il lit',
        body: 'Le garde-fou de contenu analyse les fichiers de textes et de messages, pas les listes d’options du formulaire ; le formulaire de qualification des acheteurs propose donc encore deux des termes interdits comme options de livraison. Sur la seule page où la société filtre les autres, elle parle le jargon qu’elle interdit.',
      },
      {
        title: 'Un dispositif de confiance doit faire quelque chose',
        body: 'Les pastilles de référence nomment un registre ou l’index des LEI, mais ne renvoient vers aucun des deux. Tant qu’elles ne pointent pas vers un enregistrement réel, le dispositif de signature ne fait que ressembler à une vérification — l’échec exact que le projet voulait éviter.',
      },
      {
        title: 'Confirmer d’abord par écrit les décisions structurelles',
        body: 'Sept langues ont été livrées des semaines avant qu’un document de gouvernance du client ne qualifie la question des langues de non tranchée. Les garder était juste, car supprimer un travail fini et protégé est l’erreur la plus coûteuse, mais la décision devait être écrite avant que les clés n’existent.',
      },
    ],
  },
}

const JA: MqvCopy = {
  statement:
    '自己勘定の石油トレーダーのための7言語サイト。「この会社は実在し、確認できるのか」という一つの問いに、最初の画面で答えるよう設計した。',
  industry: 'エネルギー · 現物コモディティ取引',
  team: '単独のデザイナー兼開発者',
  heroCaption:
    '英語版ホームページ。製品の範囲を一文で示し、法人名はまだ「追って提供」と表示されている。',
  snapshot: {
    problem: '詐欺的なブローカーには共通の符丁があり、それをなぞる本物の会社も同類に見えてしまう。',
    role: 'デザイナー兼開発者：競合ベンチマーク、情報設計、デザインシステム、7言語のコンテンツモデル、実装とCIガード。',
    result:
      'デプロイ済みだが未公開。7言語のキーは完全に一致し、CIガードは2つ。会社の実体情報はまだプレースホルダーのままである。',
  },
  alt: {
    cover: 'Marqevon — 手続きのページ「引き渡し方式別の取引の流れ」、暗い石油色の地に配置',
    home: 'デスクトップ版Marqevon — 英語版ホームページ。「仕様を定めた石油製品を、調達し、輸送し、資金を手当てし、引き渡す」という見出しが航路の地図に重なる',
    faq: 'デスクトップ版Marqevon — FAQの一覧。リースされた銀行証書や市場価格を下回る割引を扱う「私たちがしないこと」のグループで締めくくられる',
    procedure:
      'デスクトップ版Marqevon — すべての引き渡し方式に共通する、番号付きの7つのステップ。審査から照合まで',
    manifest:
      'デスクトップ版Marqevon — ガバナンス・マニフェスト。会社の実体情報を並べた等幅フォントの表で、登記簿とLEIのチップが付き、値はまだ「追って提供」のまま',
    products: 'デスクトップ版Marqevon — 仕様書で定義した3つの製品：EN 590軽油、Jet A-1、ナフサ',
    trackRecord:
      'デスクトップ版Marqevon — 取引実績を公開するルール。商務・法務の確認を経た後にのみ、取引相手の名前を伏せて公開する',
    team: 'デスクトップ版Marqevon — チームの代わりに置いた注記。実名の人物は、事業・法務の確認を経た後にのみ公開する',
    homeFa:
      'デスクトップ版Marqevon — ペルシア語版ホームページ。右から左へ反転し、ナビゲーションも逆順になっている',
    homeAr: 'デスクトップ版Marqevon — アラビア語版ホームページ。右から左へ反転している',
  },
  context: {
    heading: 'ブローカーではなく、自己勘定のトレーダー',
    body: [
      'Marqevonは、石油の現物を自己勘定で取引する会社である。生産者と製油所から買い、製油所、販売業者、航空会社、公益事業者、産業需要家に引き渡す。サイトが語りかける相手は、まず取引相手、次に銀行と貿易金融のパートナー、次に採用候補者、そして報道機関と規制当局である。',
      '仕事は最初から仕様書主導で進めた。46 KBの仕様書が、実装に入る前に情報設計、デザインシステム、15ページすべてを確定させた。その冒頭は通常のブリーフを退けている。この業界でウェブサイトの役割はマーケティングではなく、検証可能な正当性を示すことだ、と。',
    ],
  },
  problem: {
    heading: '詐欺の経路には符丁がある',
    body: [
      '現物コモディティ取引には詐欺の問題があり、その詐欺には語彙がある。非公式のブローカーは、見覚えのある証書の略語や委任の肩書き — TTT、TTV、DTA、ATB — で自らを名乗る。正当な中規模の自己勘定トレーダーでも、そのどれか一つを使えば同類に見えてしまう。',
      'だからサイト全体が、一つの問いに答えなければならなかった。しかも7言語で、そのうち2言語は右から左に書かれる。',
    ],
  },
  question: {
    text: '「この事業体は実在し、確認できるのか。それとも、またひとつのブローカー連鎖の隠れ蓑なのか。最初の画面のうちに答えが明らかになるよう設計すること。」',
    attribution: '情報設計とデザインの仕様書',
    method: '実装の前に、すべてのページを測る基準として書かれた',
  },
  research: {
    heading: '大手が打ち出していない空白',
    body: [
      '競合ベンチマークでは、目指すデザインを最大手のトレーディングハウス群と中規模の同業数社に照らして採点した。見つかった空白は、取りにいく価値があった。大手のどこも不正防止の姿勢を明示的に打ち出しておらず、自社がしないことも語っていない。',
      'この発見はスローガンではなく構造になった。FAQの「私たちがしないこと」のグループ、独立した検証を率直に歓迎する姿勢、そして文章で決して使ってはならない用語のリストである。',
    ],
    figureCaption:
      'FAQは会社がしないことで締めくくられる。リースされた銀行証書、市場外の割り当て、市場価格を下回る割引の保証。',
  },
  approach: {
    heading: '信頼の上に成り立つ市場のための精密機器',
    body: [
      '仕様書は方向性を一行で定めた。「信頼の上に成り立つ市場のための精密機器」。機関投資家向けのエネルギーデスクと検証済みの検査書類のあいだに位置づけ、避けるべきものも名指しした。クリーム地にセリフ体とテラコッタ、黒地にアシッドグリーン、そして細罫だけで成り立つ美学である。',
      '仕事は競合ベンチマーク、仕様書、実装の順に進み、その後クライアントのフィードバックを一度受けた。フィードバックは、どれかを適用する前に、まずコードと照らして監査した。',
    ],
    insight:
      'クライアントのフィードバックに含まれた約67の指示のうち、33が監査を通ってカードになった。8は先に修正が必要で、22は未決の判断待ちで止まり、4は質問だった。',
    processHeading: '4つの工程、それぞれを文書に残す',
    steps: [
      { label: '競合ベンチマーク', note: '大手と中規模の同業を、目指すデザインに照らして採点' },
      { label: '仕様書', note: '情報設計、デザインシステム、15ページ' },
      { label: '実装', note: 'PayloadとNext.jsで7言語、2つのCIガード付き' },
      { label: 'フィードバック', note: 'ペルシア語のフィードバック文書を、監査済みのカードに変換' },
    ],
    figureCaption:
      'すべての引き渡し方式に共通する一つの流れ。独立して検証できる証拠が、あらゆる金銭的な約束より先に来る。',
  },
  solution: {
    heading: 'Ledger Reference System（台帳参照システム）',
    body: [
      '仕様書は力を注ぐ場所を示している。「大胆さはここに注ぎ、ほかはすべて静かに保つ。」シグネチャーは3つの要素からなる。信頼性に関わる主張に添える参照チップ、細罫で区切った等幅フォントの検査証明書のように組んだデータマニフェスト、そしてすべてのページの下端に置く等幅フォントの識別バーである。',
      'カラーパレットはそのために組まれている。深い石油色の地、海の鋼色、書類の紙色、唯一のアクセントとしての真鍮色、アシッドグリーンから十分に離した「検証済み」のティール、そして警告にだけ使う錆色。IBM Plex Monoが、すべての数字、参照、チップを担う。',
      '基盤はPayload 3.85とNext.js 16.2、next-intl、MongoDBで、10のコレクションと4つのグローバルを持ち、nginxで配信する。買い手の審査フォームは問い合わせごとに点数を付け、デスクに知らせる。',
    ],
    annotations: [
      '実体情報の一つひとつは、根拠を明示した行であり、安心させるための文ではない。',
      '未確認の値は、未確認であることが見える形で残す：「追って提供」。',
      '参照チップは、取引相手が確認できるものを示す。会社登記簿や、世界共通のLEIインデックスである。',
      '検査証明書のように、IBM Plex Monoで組む。',
    ],
    manifestCaption:
      'ガバナンス・マニフェスト。会社の実体を確認可能な表として示し、未確認の値はすべてプレースホルダーのまま残した。',
    figureItems: [
      '製品：3つの等級、それぞれを仕様書で定義。',
      '取引実績：商務・法務の確認を経た後にのみ公開し、取引相手の名前は決して出さない。',
    ],
    figureCaption: '会社が責任を持てる主張と、まだ持てない主張のためのルール。',
  },
  decisions: {
    heading: '信頼をめぐる5つの判断',
    lede: 'その大半は、サイトが言わないと決めたことに関わる。',
    items: [
      {
        title: '大胆さは一か所に注ぐ',
        why: 'デザインされて見えるトレーディング会社は、マーケティングとして読まれる。視覚的な自信はすべてシグネチャーの仕組みが担い、ほかの面はすべて静かに保つ。だから読み手の記憶に残るのはマニフェストになる。',
        alternatives: 'すべての面に大胆なブランド表現',
        tradeoff: 'キャンペーンを期待する人には、簡素すぎるサイトに見える。',
      },
      {
        title: 'ルール違反でビルドを失敗させる',
        why: 'CIでは2つのガードが動く。一つはサイトの文章に含まれる詐欺の経路の語彙とアメリカ式の綴りで失敗し、もう一つは物理方向のレイアウトユーティリティ、ハードコードされたフォント、未翻訳の文字列で失敗する。後者はすでに実際の見落としを捕まえた。翻訳から漏れていたアクセシビリティ用のラベルである。',
        alternatives: '文書化したスタイルガイド',
        tradeoff: 'ガードが守れるのは、読み込むファイルだけである。',
      },
      {
        title: '法的リスクは自分で決めず、判断を仰ぐ',
        why: '法的リスクを伴う問いは、デザイナーが決着をつけるものではなかった。書面のメモでクライアントに回し、推奨した文言の一つはそこで退けられ、契約条件に基づく、確約を含まない表現が選ばれた。',
        alternatives: '文章の中で文言を決めてしまう',
        tradeoff: '実装では出せない回答を、ページが待つことになる。',
      },
      {
        title: 'クライアントのフィードバックは適用前に監査する',
        why: '4ページのペルシア語のフィードバック文書を、カードのボードに置き換えた。各カードは依頼を訳文付きで引用し、まず実際のコードと照合した。誤った前提に立つ依頼は、誰かが実装する前に正した。',
        alternatives: 'フィードバックを書かれたとおりに適用する',
        tradeoff: '最初の返答は遅くなるが、あとで取り消す変更は減る。',
      },
      {
        title: '実体を創作せず、プレースホルダーを残す',
        why: '法人名、登記情報、会社を支える人々は事実であって、デザインではない。会社が確認するまで、それぞれは見える形で「追って提供」のまま残り、チームページは実在の人物しか公開しないと平易な言葉で述べている。',
        alternatives: 'もっともらしいサンプルの名前と番号',
        tradeoff: '会社がそれらを提供するまで、サイトは公開できない。',
      },
    ],
    teamEvidence: 'チームの代わりに置いたチームページ：実在の人物だけを公開する。',
  },
  locales: {
    label: '7言語',
    heading: '7言語、そのうち2言語は右から左',
    body: [
      '英語、フランス語、アラビア語、スペイン語、日本語、中国語、ペルシア語のすべてが、メッセージキーを完全に一致させている。最新のコミット時点で、各ファイルに222のキーがある。アラビア語とペルシア語はCSSの論理プロパティで動くため、レイアウトは作り直すのではなく反転する。',
      '使ってみて初めて見えた細部が2つある。カスケードレイヤーの中に書いた言語ごとのフォント切り替えが気づかないうちに上書きされていたため、今はレイヤーの外に置いている。また、マニフェストは等幅数字を使うので、右から左の文章やCJKの文章の下でも等幅の列がそろう。',
    ],
    figureItems: ['ペルシア語：同じヒーローを反転。', 'アラビア語：同じヒーローを反転。'],
    figureCaption:
      '右から左の2言語。ナビゲーションも含め、英語版と同じコンポーネントから作られている。',
  },
  pages: {
    label: '全ページ',
    heading: '34ページ、ひとつのシステム',
    body: [
      'デプロイ済みサイトの英語版全ページを、2026年9月26日に幅1440ピクセルと幅390ピクセルのスマートフォンで記録した。最上位の16ページ、バイヤー適格性確認フォーム、2件の求人、12本の分析記事、3つの法務ページである。',
      '内側のページも象徴的なページと同じ細罫のデータマニフェストと等幅フォントの識別バーを備え、スマートフォンでは各ページが1列に積み重なり、ナビゲーションはメニューボタンの奥に収まる。ホームページでは、市場価格のパネルを隠している。',
    ],
    figureCaption: '英語版の全ページ。デスクトップとスマートフォンの最初の画面で、各ページを開くと全体を見られる。',
    names: {
      home: 'ホーム',
      about: '会社概要',
      team: 'チームと経営陣',
      'track-record': '取引実績',
      products: '製品',
      'petroleum-derivatives': '石油派生品',
      'how-we-work': '取引の進め方',
      procedure: '手順',
      capabilities: '能力・体制',
      compliance: 'コンプライアンスとKYC',
      governance: 'ガバナンス',
      sustainability: '責任ある事業',
      faq: 'よくある質問',
      insights: 'インサイト',
      'insights--verify-oil-trading-counterparty': 'インサイト · 取引相手の確認',
      'insights--inspection-sampling-certificates': 'インサイト · 検査・サンプリング・証明書',
      'insights--oil-trade-documents-checklist': 'インサイト · 取引書類チェックリスト',
      'insights--product-specifications-guide': 'インサイト · 製品仕様ガイド',
      'insights--en-590-diesel-specification': 'インサイト · EN 590ディーゼルの仕様',
      'insights--jet-a1-specification': 'インサイト · Jet A-1の仕様',
      'insights--iso-8217-fuel-oil-bunkers': 'インサイト · ISO 8217の燃料油とバンカー',
      'insights--incoterms-oil-products': 'インサイト · 石油貨物のインコタームズ',
      'insights--reading-the-diesel-curve': 'インサイト · ディーゼル・カーブを読む',
      'insights--letters-of-credit-plainly': 'インサイト · 信用状をわかりやすく',
      'insights--screening-discipline': 'インサイト · 業務規律としてのスクリーニング',
      'insights--inspection-at-custody-transfer': 'インサイト · 受渡時の検査',
      careers: '採用情報',
      'careers--distillates-trader': '採用情報 · 留分トレーダー',
      'careers--operations-analyst': '採用情報 · オペレーションアナリスト',
      contact: 'お問い合わせ',
      qualify: 'バイヤー適格性確認',
      'legal--terms': '法務 · 利用規約',
      'legal--privacy': '法務 · プライバシーポリシー',
      'legal--cookies': '法務 · Cookieポリシー',
    },
    alt: {
      desktop: 'デスクトップ版Marqevon — {page}、最初の画面',
      mobile: 'モバイル版Marqevon — {page}、最初の画面',
      desktopFull: 'デスクトップ版Marqevon — {page}、ページ全体',
      mobileFull: 'モバイル版Marqevon — {page}、ページ全体',
    },
    masked: '（市場価格のパネルは隠している）',
  },
  outcomes: {
    heading: 'デプロイ済み、未公開',
    intro:
      'サイトはデプロイされ稼働しているが、公開はしていない。ドメインはなく、意図的に検索対象から外し、会社の実体情報はまだプレースホルダーのままである。適用済みのフィードバックはプッシュしていないコミットにあり、サーバーには載っていない。アクセス解析はなく、あるのはコンテナのヘルスチェックだけである。',
    measured: [
      {
        label: '合格した統合テスト',
        context: 'フィードバック用のブランチで、lint、両方のガード、本番ビルドとあわせて実施。',
        source: 'デザインフィードバックのボード、2026年9月7日',
      },
      {
        label: 'コードに適用したフィードバックカード',
        context: '一つは未決の判断待ちで保留。稼働中のアプリで検証したものはまだない。',
        source: 'デザインフィードバックのロードマップ',
      },
    ],
    delivered: [
      {
        label: '復元検証済みのバックアップ',
        context:
          '毎晩取得し、そのたびに復元して動作を確かめる。コンテンツを移行するリリースの前には、復旧用のパッケージも用意する。',
      },
      {
        label: 'イミュータブルイメージによるデプロイ',
        context:
          'リリースは固定のイメージとして出荷する。変更可能なlatestタグと、ポーリングによる更新は廃止した。',
      },
    ],
    shipped: [
      'キーが一致した7言語',
      '2つのCIガード',
      'ガバナンス・マニフェスト',
      '買い手の審査フォーム',
      '参照チップ',
      '右から左のレイアウト',
    ],
  },
  lessons: {
    heading: '何もしなかった信頼の仕掛け',
    items: [
      {
        title: '最も役に立った成果物はlintルールだった',
        body: '「詐欺の経路の符丁を話さない」をガードとして書き込んだことで、それは誰かが覚えておくべき意図から、リポジトリの性質へと変わった。',
      },
      {
        title: 'ガードが守れるのは、読み込むものだけ',
        body: 'コンテンツのガードは文章とメッセージのファイルを走査するが、フォームの選択肢リストは見ない。そのため買い手の審査フォームは、禁止した用語のうち2つを今も引き渡しの選択肢として示している。会社が相手を審査する唯一のページで、自ら禁じた符丁を話しているのである。',
      },
      {
        title: '信頼の仕掛けは、何かをしなければならない',
        body: '参照チップは登記簿やLEIインデックスの名前を示すが、どちらにもリンクしていない。実際の記録を指し示すまで、このシグネチャーの仕掛けは検証に見えるだけである。まさにプロジェクトが避けようとした失敗だ。',
      },
      {
        title: '構造に関わる判断は、先に書面で確認する',
        body: '7言語は、クライアントのガバナンス文書が言語の問題を未決と呼ぶ数週間前に出荷されていた。完成しガードで守られた仕事を消すほうが高くつく誤りなので、残したのは正しかった。だが、その判断はキーが生まれる前に書面にしておくべきだった。',
      },
    ],
  },
}

const COPY: Record<Locale, MqvCopy> = { en: EN, fa: FA, ar: AR, es: ES, de: DE, fr: FR, ja: JA }

/** A page capture's alt in one locale; the home page's whole pages say that the prices are masked. */
const pageAlt = (locale: Locale, page: MqvPage, variant: PageVariant) => {
  const copy = COPY[locale].pages
  const alt = copy.alt[variant].replace('{page}', copy.names[page])
  const whole = variant === 'desktopFull' || variant === 'mobileFull'
  return page === 'home' && whole ? `${alt}${copy.masked}` : alt
}

export const MQV_MEDIA = {
  ...Object.fromEntries(
    (Object.keys(MEDIA_FILES) as MqvCropKey[]).map((key) => [
      key,
      {
        ...MEDIA_FILES[key],
        alt: Object.fromEntries(LOCALES.map((locale) => [locale, COPY[locale].alt[key]])),
      },
    ]),
  ),
  ...Object.fromEntries(
    MQV_PAGES.flatMap((page) =>
      PAGE_VARIANT_KEYS.map((variant) => {
        const { dir, ext } = PAGE_VARIANTS[variant]
        const spec: MediaSpec = {
          file: `gallery/${dir}/${page}.${ext}`,
          name: `marqevon--page-${page}--${dir}.${ext}`,
          alt: Object.fromEntries(LOCALES.map((locale) => [locale, pageAlt(locale, page, variant)])),
        }
        return [pageKey(page, variant), spec]
      }),
    ),
  ),
} as Record<MqvMediaKey, MediaSpec>

const PROCESS_CODES: Four = ['BNCH', 'SPEC', 'BLD', 'FDBK']
const MEASURED_VALUES: Two = ['142', '32 / 33']

export function mqvSections(locale: Locale, media: MqvMediaIds): Sections {
  const c = COPY[locale]
  const dir = dirFor(locale)
  const item = (key: MqvMediaKey, id: string, caption?: string) =>
    media[key] ? [{ id, media: media[key]!, ...(caption ? { caption } : {}) }] : []
  const pad = (n: number) => String(n).padStart(2, '0')

  return [
    {
      id: 'mqv-s01',
      blockType: 'csNarrative',
      label: 'context',
      heading: c.context.heading,
      body: prose(dir, ...c.context.body.map((value) => paragraph(value, dir))),
    },
    {
      id: 'mqv-s02',
      blockType: 'csNarrative',
      label: 'problem',
      heading: c.problem.heading,
      body: prose(dir, ...c.problem.body.map((value) => paragraph(value, dir))),
    },
    {
      id: 'mqv-s03',
      blockType: 'csFinding',
      kind: 'quote',
      text: c.question.text,
      attribution: c.question.attribution,
      method: c.question.method,
    },
    {
      id: 'mqv-s04',
      blockType: 'csNarrative',
      label: 'research',
      heading: c.research.heading,
      body: prose(dir, ...c.research.body.map((value) => paragraph(value, dir))),
    },
    {
      id: 'mqv-s05',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'plain',
      items: item('faq', 'mqv-f05-1'),
      caption: c.research.figureCaption,
    },
    {
      id: 'mqv-s06',
      blockType: 'csNarrative',
      label: 'approach',
      heading: c.approach.heading,
      body: prose(dir, ...c.approach.body.map((value) => paragraph(value, dir))),
      insight: c.approach.insight,
    },
    {
      id: 'mqv-s07',
      blockType: 'csProcess',
      kind: 'process',
      heading: c.approach.processHeading,
      steps: c.approach.steps.map((step, index) => ({
        id: `mqv-p${pad(index + 1)}`,
        code: PROCESS_CODES[index],
        label: step.label,
        note: step.note,
      })),
    },
    {
      id: 'mqv-s08',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'plain',
      items: item('procedure', 'mqv-f08-1'),
      caption: c.approach.figureCaption,
    },
    {
      id: 'mqv-s09',
      blockType: 'csNarrative',
      label: 'solution',
      heading: c.solution.heading,
      body: prose(dir, ...c.solution.body.map((value) => paragraph(value, dir))),
    },
    {
      id: 'mqv-s10',
      blockType: 'csFigure',
      layout: 'annotated',
      treatment: 'plain',
      items: item('manifest', 'mqv-f10-1'),
      annotations: c.solution.annotations.map((text, index) => ({
        id: `mqv-a${pad(index + 1)}`,
        text,
      })),
      caption: c.solution.manifestCaption,
    },
    {
      id: 'mqv-s11',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'plain',
      items: [
        ...item('products', 'mqv-f11-1', c.solution.figureItems[0]),
        ...item('trackRecord', 'mqv-f11-2', c.solution.figureItems[1]),
      ],
      caption: c.solution.figureCaption,
    },
    {
      id: 'mqv-s12',
      blockType: 'csDecisions',
      heading: c.decisions.heading,
      lede: c.decisions.lede,
      items: c.decisions.items.map((decision, index) => ({
        id: `mqv-d${pad(index + 1)}`,
        title: decision.title,
        why: decision.why,
        alternatives: decision.alternatives,
        tradeoff: decision.tradeoff,
        ...(index === 4
          ? { evidence: c.decisions.teamEvidence, ...(media.team ? { media: media.team } : {}) }
          : {}),
      })),
    },
    {
      id: 'mqv-s13',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: c.locales.label,
      heading: c.locales.heading,
      body: prose(dir, ...c.locales.body.map((value) => paragraph(value, dir))),
    },
    {
      id: 'mqv-s14',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'plain',
      items: [
        ...item('homeFa', 'mqv-f14-1', c.locales.figureItems[0]),
        ...item('homeAr', 'mqv-f14-2', c.locales.figureItems[1]),
      ],
      caption: c.locales.figureCaption,
    },
    {
      id: 'mqv-s17',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: c.pages.label,
      heading: c.pages.heading,
      body: prose(dir, ...c.pages.body.map((value) => paragraph(value, dir))),
    },
    {
      id: 'mqv-s18',
      blockType: 'csFigure',
      layout: 'pages',
      treatment: 'plain',
      items: MQV_PAGES.flatMap((page, index) => {
        const desktop = media[pageKey(page, 'desktop')]
        if (!desktop) return []
        return [
          {
            id: `mqv-g${pad(index + 1)}`,
            media: desktop,
            mobile: media[pageKey(page, 'mobile')] ?? null,
            full: media[pageKey(page, 'desktopFull')] ?? null,
            mobileFull: media[pageKey(page, 'mobileFull')] ?? null,
            caption: c.pages.names[page],
          },
        ]
      }),
      caption: c.pages.figureCaption,
    },
    {
      id: 'mqv-s15',
      blockType: 'csOutcomes',
      heading: c.outcomes.heading,
      intro: c.outcomes.intro,
      items: [
        ...c.outcomes.measured.map((outcome, index) => ({
          id: `mqv-o${pad(index + 1)}`,
          kind: 'measured' as const,
          value: MEASURED_VALUES[index],
          label: outcome.label,
          context: outcome.context,
          source: outcome.source,
        })),
        ...c.outcomes.delivered.map((outcome, index) => ({
          id: `mqv-o${pad(index + 3)}`,
          kind: 'delivered' as const,
          label: outcome.label,
          context: outcome.context,
        })),
      ],
      shipped: c.outcomes.shipped,
    },
    {
      id: 'mqv-s16',
      blockType: 'csLessons',
      heading: c.lessons.heading,
      items: c.lessons.items.map((lesson, index) => ({
        id: `mqv-l${pad(index + 1)}`,
        title: lesson.title,
        body: lesson.body,
      })),
    },
  ]
}

export function mqvLocalizedFields(locale: Locale, media: MqvMediaIds) {
  const c = COPY[locale]
  const identity = ARCHIVE.text(locale)
  return {
    ...identity,
    statement: c.statement,
    industry: c.industry,
    team: c.team,
    hero: {
      items: media.home ? [{ id: 'mqv-h01', media: media.home }] : [],
      caption: c.heroCaption,
    },
    snapshot: c.snapshot,
    sections: mqvSections(locale, media),
    meta: {
      title: identity.title,
      description: identity.summary,
      ...(media.cover ? { image: media.cover } : {}),
    },
  }
}

export const MQV_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  projectStatus: 'pre-launch',
  tools: [
    'Payload',
    'Next.js',
    'next-intl',
    'MongoDB',
    'Tailwind CSS',
    'Docker',
    'nginx',
    'GitHub Actions',
  ],
  period: { start: '2026-06-01T00:00:00.000Z', end: '2026-09-01T00:00:00.000Z' },
}
