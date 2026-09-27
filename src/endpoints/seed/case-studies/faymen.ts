import type { Project } from '@/payload-types'
import { dirFor, LOCALES, type Locale } from '@/utilities/locale'

import type { MediaSpec } from '../media'
import { archiveIdentity } from './archive'
import { bullets, paragraph, prose } from './lexical'

/**
 * Fayman (`/work/faymen`) — a live Persian storefront built from an international commerce
 * template. Every sentence comes from `Docs/Experience/Projects/faymen/README.md`, corrected
 * 2026-09-23 against the live site and the source repository.
 *
 * Publication gates (held here and in `tests/int/case-study-seeds.int.spec.ts`):
 * - No home, search, cart or contact capture: they carry a live coupon, a sales number, phones and
 *   the showroom address. Evidence is the 2026-09-23 recapture of category, product, guide, log-in
 *   and support pages only.
 * - No lifestyle, lookbook or made-to-measure imagery (origin unconfirmed), and no security
 *   incident, patch or endpoint detail.
 * - No commercial figures: the numbers are engineering facts from the repository, labelled as such.
 * - In Persian the brand is فیمن.
 *
 * Copy lives in one `Copy` object per locale; the sections builder is a pure template over it, so
 * a missing string or a wrong tuple length is a type error. Shared fields (codes, values, media,
 * layout, treatment) live in the builder and are identical in every locale.
 */
export const FAY_SLUG = 'faymen'
export const FAY_ASSETS = 'Docs/Experience/Projects/faymen/assets/capture-2026-09'
export const FAY_LOCALES = LOCALES

const ARCHIVE = archiveIdentity(FAY_SLUG)

const MEDIA_FILES = {
  cover: { file: 'mobile/waistcoats.png', name: ARCHIVE.row.cover.name },
  shop: { file: 'mobile/shop.png', name: 'faymen--mobile-shop.png' },
  shoesProduct: { file: 'mobile/shoes-product.png', name: 'faymen--mobile-shoes-product.png' },
  sizeGuideMobile: { file: 'mobile/size-guide.png', name: 'faymen--mobile-size-guide.png' },
  login: { file: 'mobile/login.png', name: 'faymen--mobile-login.png' },
  shipping: { file: 'mobile/shipping.png', name: 'faymen--mobile-shipping.png' },
  faq: { file: 'mobile/faq.png', name: 'faymen--mobile-faq.png' },
  waistcoatsDesk: { file: 'desktop/waistcoats-crop.png', name: 'faymen--desktop-waistcoats.png' },
  sizeGuideDesk: { file: 'desktop/size-guide-crop.png', name: 'faymen--desktop-size-guide.png' },
  fabricGuideDesk: {
    file: 'desktop/fabric-guide-crop.png',
    name: 'faymen--desktop-fabric-guide.png',
  },
} as const

export type FayMediaKey = keyof typeof MEDIA_FILES
type FayMediaIds = Partial<Record<FayMediaKey, string>>
type Sections = NonNullable<Project['sections']>

type Two<T = string> = [T, T]
type Three<T = string> = [T, T, T]
type Four<T = string> = [T, T, T, T]
type Five<T = string> = [T, T, T, T, T]
type Six<T = string> = [T, T, T, T, T, T]

export interface FayCopy {
  statement: string
  industry: string
  team: string
  heroCaption: string
  snapshot: { problem: string; role: string; result: string }
  alt: Record<FayMediaKey, string>
  context: { heading: string; body: Two; figureCaption: string }
  problem: { heading: string; intro: string; bullets: Five }
  ownership: { heading: string; intro: string; own: Five; collaborate: [string]; note: string }
  approach: {
    heading: string
    body: Two
    insight: string
    processHeading: string
    steps: Five<{ label: string; note: string }>
    figureItems: Two
    figureCaption: string
  }
  decisions: {
    heading: string
    lede: string
    items: Four<{ title: string; why: string; alternatives: string; tradeoff: string }>
    loginEvidence: string
  }
  solution: {
    heading: string
    body: string
    bullets: Four
    figureItems: Two
    figureCaption: string
  }
  outcomes: {
    heading: string
    intro: string
    measured: Three<{ label: string; context: string; source: string }>
    delivered: { label: string; context: string }
    shipped: Six
  }
  funnel: { text: string; attribution: string; method: string }
  lessons: { heading: string; items: Three<{ title: string; body: string }> }
}

const EN: FayCopy = {
  statement:
    'An international commerce template rebuilt for Iran: Shaparak payments, phone-only identity, integer Rial shown as Toman, and an in-country stack.',
  industry: 'Retail · menswear e-commerce',
  team: 'Sole designer and developer, working with AI coding agents',
  heroCaption:
    'The storefront on a phone: a category grid, a product priced in Toman with its discount, and the size finder.',
  snapshot: {
    problem:
      'Every assumption in the commerce template — Stripe, dollars, email log-in, a reachable registry — fails for an Iranian store.',
    role: 'Sole designer and developer across the design language, content model, storefront, admin, payments, identity, infrastructure and releases.',
    result:
      'Live at faymen.ir and taking payments; one feedback rule surfaced 113 of 166 products returning 404.',
  },
  alt: {
    cover: ARCHIVE.row.cover.alt,
    shop: 'Fayman on a phone — the shop page with a search field, category tabs and trousers priced in Toman',
    shoesProduct:
      'Fayman on a phone — a leather derby shoe product page with its discounted Toman price and an add-to-cart button',
    sizeGuideMobile:
      'Fayman on a phone — the size and measurement guide, opening on free returns and the Size Finder tool',
    login:
      'Fayman on a phone — the log-in page with a single mobile-number field and a button requesting a verification code',
    shipping:
      'Fayman on a phone — the shipping page promising free delivery above a Toman threshold, with order tracking',
    faq: 'Fayman on a phone — the searchable frequently asked questions page, grouped by topic',
    waistcoatsDesk:
      'Fayman on desktop — the waistcoat category as a right-to-left grid with filters on the right and struck-through prices',
    sizeGuideDesk:
      'Fayman on desktop — the Size Finder form beside the guide’s promises of free returns and advice',
    fabricGuideDesk:
      'Fayman on desktop — the fabric guide, matching cloth to season with a comparison table and fabric swatches',
  },
  context: {
    heading: 'A template built for somewhere else',
    body: [
      'Fayman (فیمن) sells tailored menswear — suits, trousers, shirts and shoes — with a made-to-measure service, a fabric guide and a size finder. The build started from the official Payload ecommerce template: the first commit is the untouched template, and the 490 commits after it replaced the entire commercial layer.',
      'That provenance is the story rather than an embarrassment. What the template assumes — Stripe, US dollars, email-and-password identity, hosted CI, a reachable package registry — is precisely the list of things that do not hold for a store in Iran.',
    ],
    figureCaption:
      'A category page at desktop width: a right-to-left grid, filters on the right, Toman prices with the pre-discount price struck through.',
  },
  problem: {
    heading: 'Five assumptions that don’t hold in Iran',
    intro:
      'Every assumption in an international commerce template had to be replaced, not configured:',
    bullets: [
      'Payments — Stripe does not operate here; Iranian commerce runs on Shaparak gateways.',
      'Currency — prices are stored in Rial and spoken in Toman, a factor of ten that charges a customer 10× or 0.1× if one integration gets it backwards.',
      'Identity — shoppers relate to a store through a phone number, not an email address.',
      'Infrastructure — GitHub and Docker Hub are not reliably reachable from an Iranian host, so a pipeline that depends on them fails at the worst moment.',
      'Typography — a design language written for left-to-right English software had to serve Persian retail.',
    ],
  },
  ownership: {
    heading: 'One person, the whole surface',
    intro:
      'Sole designer and developer, with AI coding agents doing much of the implementation against written specs.',
    own: [
      'The design language and its Persian adaptation',
      'Content model, storefront and admin experience',
      'Payments and phone-only identity',
      'In-country infrastructure',
      'The release process and its deploy ledger',
    ],
    collaborate: ['The client’s feedback, run through a tracker'],
    note: 'Every raw comment lands in a tracker and is investigated against the real code before it becomes a spec an agent can implement without a follow-up question.',
  },
  approach: {
    heading: 'Adapt a design language, and write down where it disagrees',
    body: [
      'The work ran as baseline, performance, design system, commercial layer, then the phone-first migration. The design language was adapted rather than invented: an explicit adaptation layer, “Precision Minimalism × فیمن”, names the mismatch — a system built for left-to-right English software, applied to a Persian menswear atelier — and settles that where the two disagree, the adaptation wins.',
      'Three decisions were locked. The sharpest is typographic: zero letter-spacing on Persian, because letter-spacing severs Persian’s joined letters. No case transforms, no italic, and a purely photographic and typographic language with no illustration.',
    ],
    insight:
      'Every release passes one gate: type generation and import-map checks, then type checking, lint, 772 unit and 1,086 integration tests, and a production build.',
    processHeading: 'Five passes over one codebase',
    steps: [
      { label: 'Baseline', note: 'The official template, untouched, as the first commit' },
      { label: 'Performance', note: 'Speed work before any redesign' },
      { label: 'Design system', note: 'The Persian adaptation layer and its locked decisions' },
      { label: 'Commerce layer', note: 'Gateways, Rial and Toman, wallet and discounts' },
      {
        label: 'Phone-first',
        note: 'Identity, checkout and the newsletter move to the phone number',
      },
    ],
    figureItems: [
      'The size finder: fit, measurements and a recommended size.',
      'The fabric guide: which cloth suits which season, use and care.',
    ],
    figureCaption:
      'Photographic and typographic only: the guides carry the brand without an illustration programme.',
  },
  decisions: {
    heading: 'Four replacements, not configurations',
    lede: 'Each one swaps a template default for the constraint it ignored.',
    items: [
      {
        title: 'Store integer Rial, display Toman',
        why: 'Prices are spoken in Toman but settled in Rial. Storing whole Rial with no decimals and converting only for display keeps a factor-of-ten error from ever reaching a charge.',
        alternatives: 'Store Toman and convert per gateway',
        tradeoff: 'Every integration has to declare its unit at one boundary.',
      },
      {
        title: 'Make the phone number the only identity',
        why: 'Sign-in, sign-up and checkout take a mobile number and a one-time code; the template’s email-and-password paths were retired, and the newsletter moved to SMS.',
        alternatives: 'Keep email log-in beside the code',
        tradeoff: 'Every sign-in depends on SMS delivery.',
      },
      {
        title: 'Keep every deploy dependency inside the country',
        why: 'Object storage, a self-hosted Git server with a GitHub mirror, the deploy platform and analytics all run in-country, so a deploy does not break when GitHub or Docker Hub are unreachable.',
        alternatives: 'Hosted CI and public registries',
        tradeoff: 'More infrastructure to run, watch and back up.',
      },
      {
        title: 'Treat every gateway setting as a required credential',
        why: 'A provider’s amount unit decides whether a customer is charged ten times too much or too little, and a missing endpoint fails at checkout, so a gateway cannot be switched on until every setting it needs is filled in.',
        alternatives: 'Let an admin enable a gateway and complete it later',
        tradeoff: 'Integrated providers wait on onboarding instead of going live with the code.',
      },
    ],
    loginEvidence:
      'The live log-in page: one field, a mobile number, and a request for a verification code.',
  },
  solution: {
    heading: 'A local commerce surface',
    body: 'Payload 3.88 inside Next.js 16 on MongoDB, with 13 hand-authored collections, 25 page blocks and 4 globals. Around the gateways and the phone identity sit the pieces an Iranian shopper expects:',
    bullets: [
      'A customer wallet as store credit, and a three-phase discount engine: per product, per category and coupon codes.',
      'SMS through a local provider for codes, sale notifications and corporate leads, plus a phone-based newsletter.',
      'Torob marketplace tags carrying price and old price in Toman, the E-namad trust seal, Shamsi dates and Persian numerals.',
      'An admin panel in Farsi by default, with its fonts self-hosted so nothing depends on Google at runtime.',
    ],
    figureItems: [
      'Shipping: free delivery above a Toman threshold, sent nationwide, with tracking.',
      'Questions grouped by topic and searchable in Persian.',
    ],
    figureCaption: 'Support pages written for the market, right to left throughout.',
  },
  outcomes: {
    heading: 'Live, and honest about the dark funnel',
    intro:
      'Live at faymen.ir and taking real payments, with an append-only ledger of every production release. The version is held at 0.9.0 on purpose: 1.0.0 is reserved for the production launch. No commercial figures are published.',
    measured: [
      {
        label: 'Products found returning 404, and fixed',
        context:
          'Persian titles generated broken slugs; more than two thirds of the catalogue was invisible on a live store.',
        source: 'Feedback tracker, investigated against the code',
      },
      {
        label: 'Unit and integration tests at the ship gate',
        context: 'Run on every release, beside type checks, lint and a production build.',
        source: 'Project changelog',
      },
      {
        label: 'Outdated dependencies updated one at a time',
        context: 'Each update verified on its own, so a break points to one package.',
        source: 'Project changelog',
      },
    ],
    delivered: {
      label: 'A live store taking payments',
      context:
        '491 commits in about twelve weeks, from the untouched template to phone-first checkout.',
    },
    shipped: [
      'Phone-only sign-in',
      'Customer wallet',
      'Three-phase discount engine',
      'Torob price feed',
      'E-namad trust seal',
      'Farsi-first admin',
    ],
  },
  funnel: {
    text: '“Of pageview, product view, add-to-cart, checkout start, payment redirect and purchase, only the last is visible at all.”',
    attribution: 'The store’s event-tracking plan',
    method: 'Written when analytics went live on 2026-08-31',
  },
  lessons: {
    heading: 'What the network taught',
    items: [
      {
        title: 'Constraints that look like chores are product decisions',
        body: '“Docker Hub is unreachable” is not a footnote when it decides whether the store can deploy a fix during a sale; “email does not fit the market” rewrites identity, checkout and the newsletter.',
      },
      {
        title: 'A comment is not a task until it is checked against the code',
        body: '“The wrong products show up” was a vague complaint. Investigating it produced the 113-of-166 finding; a tracker that took it at face value would have fixed a symptom.',
      },
      {
        title: 'Write down where a borrowed design language disagrees',
        body: 'Adapting an existing language was cheaper than authoring a second, and the disagreements — Persian letter-spacing, no illustration — became the most useful part of the document.',
      },
    ],
  },
}

const FA: FayCopy = {
  statement:
    'قالب تجارت الکترونیک بین‌المللی، بازسازی‌شده برای ایران: پرداخت شاپرک، هویت فقط با تلفن، ریال صحیح با نمایش تومان و زیرساختی درون کشور.',
  industry: 'خرده‌فروشی · فروشگاه اینترنتی پوشاک مردانه',
  team: 'تنها طراح و توسعه‌دهنده، با همکاری ایجنت‌های کدنویسی هوش مصنوعی',
  heroCaption:
    'فروشگاه روی گوشی: شبکه‌ی دسته‌بندی‌ها، محصولی با قیمت تومانی و تخفیفش، و ابزار انتخاب سایز.',
  snapshot: {
    problem:
      'همه‌ی پیش‌فرض‌های قالب تجارت الکترونیک — Stripe، دلار، ورود با ایمیل، رجیستری در دسترس — برای یک فروشگاه ایرانی از کار می‌افتند.',
    role: 'تنها طراح و توسعه‌دهنده در همه‌ی لایه‌ها: زبان طراحی، مدل محتوا، فروشگاه، پنل مدیریت، پرداخت، هویت، زیرساخت و انتشار نسخه‌ها.',
    result:
      'روی faymen.ir فعال است و پرداخت می‌گیرد؛ یک قاعده‌ی بررسی بازخورد نشان داد ۱۱۳ از ۱۶۶ محصول خطای 404 می‌دادند.',
  },
  alt: {
    cover: 'فیمن روی گوشی — مجموعه‌ی جلیقه‌ها در شبکه‌ی محصولات راست‌به‌چپ با قیمت تومانی',
    shop: 'فیمن روی گوشی — صفحه‌ی فروشگاه با کادر جست‌وجو، زبانه‌های دسته‌بندی و شلوارهایی با قیمت تومانی',
    shoesProduct:
      'فیمن روی گوشی — صفحه‌ی محصول یک کفش دربی چرمی با قیمت تخفیف‌خورده به تومان و دکمه‌ی افزودن به سبد خرید',
    sizeGuideMobile:
      'فیمن روی گوشی — راهنمای سایز و اندازه‌گیری که با بازگشت رایگان و ابزار انتخاب سایز آغاز می‌شود',
    login:
      'فیمن روی گوشی — صفحه‌ی ورود با تنها یک فیلد برای شماره‌ی موبایل و دکمه‌ای برای دریافت کد تأیید',
    shipping:
      'فیمن روی گوشی — صفحه‌ی ارسال با وعده‌ی ارسال رایگان برای سفارش‌های بالای مبلغی مشخص به تومان، همراه با پیگیری سفارش',
    faq: 'فیمن روی گوشی — صفحه‌ی پرسش‌های متداول با امکان جست‌وجو، دسته‌بندی‌شده بر اساس موضوع',
    waistcoatsDesk:
      'فیمن روی دسکتاپ — دسته‌ی جلیقه‌ها در شبکه‌ای راست‌به‌چپ با فیلترها در سمت راست و قیمت‌های خط‌خورده',
    sizeGuideDesk:
      'فیمن روی دسکتاپ — فرم انتخاب سایز در کنار وعده‌های راهنما برای بازگشت رایگان و مشاوره',
    fabricGuideDesk:
      'فیمن روی دسکتاپ — راهنمای پارچه که پارچه را با فصل تطبیق می‌دهد، همراه با جدول مقایسه و نمونه‌های پارچه',
  },
  context: {
    heading: 'قالبی ساخته‌شده برای جایی دیگر',
    body: [
      'فیمن پوشاک مردانه‌ی خیاطی — کت‌وشلوار، شلوار، پیراهن و کفش — را همراه با خدمت دوخت سفارشی، راهنمای پارچه و ابزار انتخاب سایز می‌فروشد. ساخت از قالب رسمی تجارت الکترونیک Payload آغاز شد: نخستین کامیت همان قالب دست‌نخورده است و ۴۹۰ کامیت پس از آن کل لایه‌ی تجاری را جایگزین کردند.',
      'این پیشینه خودِ داستان است، نه مایه‌ی شرمندگی. آنچه قالب فرض می‌گیرد — Stripe، دلار آمریکا، هویت با ایمیل و رمز عبور، CI میزبانی‌شده، رجیستری بسته‌ها در دسترس — دقیقاً فهرست چیزهایی است که برای فروشگاهی در ایران صدق نمی‌کند.',
    ],
    figureCaption:
      'صفحه‌ی یک دسته در عرض دسکتاپ: شبکه‌ای راست‌به‌چپ، فیلترها در سمت راست، قیمت‌های تومانی با قیمت پیش از تخفیفِ خط‌خورده.',
  },
  problem: {
    heading: 'پنج پیش‌فرض که در ایران صدق نمی‌کنند',
    intro: 'هر پیش‌فرض یک قالب تجارت الکترونیک بین‌المللی باید جایگزین می‌شد، نه پیکربندی:',
    bullets: [
      'پرداخت — Stripe در ایران کار نمی‌کند؛ تجارت ایرانی روی درگاه‌های شاپرک می‌چرخد.',
      'ارز — قیمت‌ها به ریال ذخیره و به تومان گفته می‌شوند؛ ضریبی ده‌برابری که اگر یک یکپارچه‌سازی آن را وارونه بگیرد، از مشتری ۱۰ برابر یا ۰٫۱ برابر مبلغ را می‌گیرد.',
      'هویت — خریداران از راه شماره‌ی تلفن با فروشگاه ارتباط می‌گیرند، نه آدرس ایمیل.',
      'زیرساخت — GitHub و Docker Hub از سرورهای داخل ایران به‌طور پایدار در دسترس نیستند، پس پایپ‌لاینی که به آن‌ها وابسته باشد درست در بدترین لحظه از کار می‌افتد.',
      'تایپوگرافی — زبان طراحی‌ای که برای نرم‌افزار انگلیسی چپ‌به‌راست نوشته شده بود باید در خدمت خرده‌فروشی فارسی قرار می‌گرفت.',
    ],
  },
  ownership: {
    heading: 'یک نفر، تمام سطح کار',
    intro:
      'تنها طراح و توسعه‌دهنده، با ایجنت‌های کدنویسی هوش مصنوعی که بخش بزرگی از پیاده‌سازی را بر پایه‌ی مشخصات مکتوب انجام دادند.',
    own: [
      'زبان طراحی و انطباق فارسی آن',
      'مدل محتوا، فروشگاه و تجربه‌ی پنل مدیریت',
      'پرداخت و هویت فقط با تلفن',
      'زیرساخت درون کشور',
      'فرایند انتشار و دفتر ثبت استقرارها',
    ],
    collaborate: ['بازخوردهای کارفرما، از مسیر یک سامانه‌ی پیگیری'],
    note: 'هر نظر خام در سامانه‌ی پیگیری ثبت می‌شود و پیش از آنکه به مشخصاتی تبدیل شود که یک ایجنت بتواند بی‌پرسش تکمیلی پیاده‌اش کند، در برابر کد واقعی بررسی می‌شود.',
  },
  approach: {
    heading: 'یک زبان طراحی را تطبیق بده و جاهای اختلافش را بنویس',
    body: [
      'کار به این ترتیب پیش رفت: خط مبنا، کارایی، سیستم طراحی، لایه‌ی تجاری و سپس مهاجرت تلفن‌محور. زبان طراحی تطبیق داده شد، نه از نو ابداع: یک لایه‌ی انطباق صریح، «Precision Minimalism × فیمن»، این ناهمخوانی را نام می‌برد — سیستمی ساخته‌شده برای نرم‌افزار انگلیسی چپ‌به‌راست، به‌کاررفته برای یک آتلیه‌ی پوشاک مردانه‌ی ایرانی — و تکلیف را روشن می‌کند: هرجا این دو با هم اختلاف دارند، انطباق برنده است.',
      'سه تصمیم قطعی شد. تیزترینشان تایپوگرافیک است: فاصله‌ی حروف صفر برای فارسی، چون فاصله‌گذاری میان حروف، حروف پیوسته‌ی فارسی را از هم جدا می‌کند. بدون تبدیل حالت حروف، بدون ایتالیک، و زبانی یکسره عکاسانه و تایپوگرافیک، بی هیچ تصویرسازی.',
    ],
    insight:
      'هر نسخه از یک دروازه می‌گذرد: تولید تایپ‌ها و بررسی نقشه‌ی ایمپورت‌ها، سپس بررسی تایپ، لینت، ۷۷۲ تست واحد و ۱٬۰۸۶ تست یکپارچگی، و یک بیلد نسخه‌ی عملیاتی.',
    processHeading: 'پنج دور کار روی یک کدبیس',
    steps: [
      { label: 'خط مبنا', note: 'قالب رسمی، دست‌نخورده، به‌عنوان نخستین کامیت' },
      { label: 'کارایی', note: 'کار روی سرعت، پیش از هر بازطراحی' },
      { label: 'سیستم طراحی', note: 'لایه‌ی انطباق فارسی و تصمیم‌های قطعی‌اش' },
      { label: 'لایه‌ی تجاری', note: 'درگاه‌ها، ریال و تومان، کیف پول و تخفیف‌ها' },
      { label: 'تلفن‌محور', note: 'هویت، فرایند خرید و خبرنامه به شماره‌ی تلفن منتقل می‌شوند' },
    ],
    figureItems: [
      'ابزار انتخاب سایز: فیت، اندازه‌ها و سایز پیشنهادی.',
      'راهنمای پارچه: کدام پارچه برای کدام فصل و کاربرد مناسب است و چطور نگهداری می‌شود.',
    ],
    figureCaption:
      'فقط عکاسی و تایپوگرافی: راهنماها بی‌نیاز از برنامه‌ی تصویرسازی، برند را منتقل می‌کنند.',
  },
  decisions: {
    heading: 'چهار جایگزینی، نه پیکربندی',
    lede: 'هرکدام یک پیش‌فرض قالب را با محدودیتی عوض می‌کند که نادیده‌اش گرفته بود.',
    items: [
      {
        title: 'ذخیره به ریال صحیح، نمایش به تومان',
        why: 'قیمت‌ها به تومان گفته اما به ریال تسویه می‌شوند. ذخیره‌ی ریال کامل بدون اعشار و تبدیل فقط هنگام نمایش، نمی‌گذارد خطای ده‌برابری هرگز به یک تراکنش برسد.',
        alternatives: 'ذخیره به تومان و تبدیل برای هر درگاه',
        tradeoff: 'هر یکپارچه‌سازی باید واحدش را در یک مرز مشخص اعلام کند.',
      },
      {
        title: 'شماره‌ی تلفن، تنها هویت',
        why: 'ورود، ثبت‌نام و فرایند خرید با شماره‌ی موبایل و یک کد یک‌بارمصرف انجام می‌شوند؛ مسیرهای ایمیل و رمز عبور قالب کنار گذاشته شدند و خبرنامه به SMS منتقل شد.',
        alternatives: 'حفظ ورود با ایمیل در کنار کد',
        tradeoff: 'هر ورود به رسیدن SMS وابسته است.',
      },
      {
        title: 'همه‌ی وابستگی‌های استقرار، درون کشور',
        why: 'ذخیره‌سازی آبجکت، یک سرور Git خودمیزبان با آینه‌ای در GitHub، پلتفرم استقرار و آنالیتیکس همه درون کشور اجرا می‌شوند، تا وقتی GitHub یا Docker Hub در دسترس نیستند استقرار نشکند.',
        alternatives: 'CI میزبانی‌شده و رجیستری‌های عمومی',
        tradeoff: 'زیرساخت بیشتری برای اجرا، پایش و پشتیبان‌گیری.',
      },
      {
        title: 'هر تنظیم درگاه، یک اعتبارنامه‌ی الزامی',
        why: 'واحد مبلغ هر ارائه‌دهنده تعیین می‌کند که از مشتری ده برابر بیشتر گرفته شود یا ده برابر کمتر، و نقطه‌ی اتصالی که جا افتاده باشد در لحظه‌ی پرداخت شکست می‌خورد؛ پس هیچ درگاهی تا وقتی همه‌ی تنظیمات لازمش پر نشده روشن نمی‌شود.',
        alternatives: 'مدیر درگاه را فعال کند و بعداً تکمیلش کند',
        tradeoff:
          'ارائه‌دهندگانِ یکپارچه‌شده به‌جای فعال‌شدن همراه کد، منتظر تکمیل فرایند پذیرش می‌مانند.',
      },
    ],
    loginEvidence: 'صفحه‌ی ورود زنده: یک فیلد، شماره‌ی موبایل، و درخواست کد تأیید.',
  },
  solution: {
    heading: 'یک سطح تجاری بومی',
    body: 'Payload 3.88 درون Next.js 16 روی MongoDB، با ۱۳ کالکشن دست‌نویس، ۲۵ بلوک صفحه و ۴ گلوبال. پیرامون درگاه‌ها و هویت تلفنی، اجزایی قرار گرفته‌اند که خریدار ایرانی انتظارشان را دارد:',
    bullets: [
      'کیف پول مشتری به‌عنوان اعتبار خرید، و موتور تخفیف سه‌مرحله‌ای: برای هر محصول، هر دسته و کدهای تخفیف.',
      'SMS از طریق یک ارائه‌دهنده‌ی داخلی برای کدها، اطلاع‌رسانی حراج و سرنخ‌های سازمانی، به‌علاوه‌ی خبرنامه‌ای مبتنی بر تلفن.',
      'تگ‌های ترب با قیمت و قیمت قبلی به تومان، نماد اعتماد اینماد، تاریخ شمسی و ارقام فارسی.',
      'پنل مدیریت با زبان پیش‌فرض فارسی و فونت‌های خودمیزبان، تا در زمان اجرا هیچ وابستگی‌ای به گوگل نباشد.',
    ],
    figureItems: [
      'ارسال: رایگان برای سفارش‌های بالای مبلغی مشخص به تومان، به سراسر کشور، با امکان پیگیری.',
      'پرسش‌ها، دسته‌بندی‌شده بر اساس موضوع و قابل جست‌وجو به فارسی.',
    ],
    figureCaption: 'صفحه‌های پشتیبانی نوشته‌شده برای همین بازار، سراسر راست‌به‌چپ.',
  },
  outcomes: {
    heading: 'زنده، و صادق درباره‌ی قیف تاریک',
    intro:
      'روی faymen.ir فعال است و پرداخت واقعی می‌گیرد، با دفتری فقط‌افزودنی از همه‌ی انتشارهای عملیاتی. نسخه عمداً روی 0.9.0 نگه داشته شده است: 1.0.0 برای راه‌اندازی رسمی کنار گذاشته شده. هیچ رقم تجاری‌ای منتشر نمی‌شود.',
    measured: [
      {
        label: 'محصولاتی که خطای 404 می‌دادند، پیدا و اصلاح شدند',
        context:
          'عنوان‌های فارسی اسلاگ‌های خراب می‌ساختند؛ بیش از دو سوم کاتالوگ در فروشگاهی زنده دیده نمی‌شد.',
        source: 'سامانه‌ی پیگیری بازخورد، بررسی‌شده در برابر کد',
      },
      {
        label: 'تست‌های واحد و یکپارچگی در دروازه‌ی انتشار',
        context: 'در هر انتشار، در کنار بررسی تایپ، لینت و بیلد نسخه‌ی عملیاتی اجرا می‌شوند.',
        source: 'تغییرنامه‌ی پروژه',
      },
      {
        label: 'وابستگی‌های قدیمی، یکی‌یکی به‌روز شدند',
        context: 'هر به‌روزرسانی جداگانه تأیید شد تا هر خرابی به یک بسته برسد.',
        source: 'تغییرنامه‌ی پروژه',
      },
    ],
    delivered: {
      label: 'فروشگاهی زنده که پرداخت می‌گیرد',
      context: '۴۹۱ کامیت در حدود دوازده هفته، از قالب دست‌نخورده تا فرایند خرید تلفن‌محور.',
    },
    shipped: [
      'ورود فقط با تلفن',
      'کیف پول مشتری',
      'موتور تخفیف سه‌مرحله‌ای',
      'فید قیمت ترب',
      'نماد اعتماد اینماد',
      'پنل مدیریت فارسی‌محور',
    ],
  },
  funnel: {
    text: '«از بازدید صفحه، بازدید محصول، افزودن به سبد، شروع پرداخت، انتقال به درگاه و خرید، فقط آخری اصلاً دیده می‌شود.»',
    attribution: 'طرح ردیابی رویدادهای فروشگاه',
    method: 'نوشته‌شده هنگام راه‌اندازی آنالیتیکس در ۲۰۲۶-۰۸-۳۱',
  },
  lessons: {
    heading: 'آنچه شبکه یاد داد',
    items: [
      {
        title: 'محدودیت‌هایی که شبیه کارهای جانبی‌اند، تصمیم‌های محصولی‌اند',
        body: '«Docker Hub در دسترس نیست» وقتی تعیین می‌کند فروشگاه می‌تواند وسط حراج اصلاحیه‌ای مستقر کند یا نه، یک پانویس نیست؛ «ایمیل به این بازار نمی‌خورد» هویت، فرایند خرید و خبرنامه را از نو می‌نویسد.',
      },
      {
        title: 'نظر تا در برابر کد بررسی نشده، وظیفه نیست',
        body: '«محصولات اشتباه نشان داده می‌شوند» شکایتی مبهم بود. بررسی‌اش به یافته‌ی ۱۱۳ از ۱۶۶ رسید؛ سامانه‌ای که آن را به همان ظاهر می‌پذیرفت، فقط یک نشانه را درمان می‌کرد.',
      },
      {
        title: 'جاهای اختلاف یک زبان طراحی قرضی را بنویس',
        body: 'تطبیق یک زبان موجود ارزان‌تر از نوشتن زبانی دوم بود، و اختلاف‌ها — فاصله‌ی حروف در فارسی، نبودِ تصویرسازی — به مفیدترین بخش سند تبدیل شدند.',
      },
    ],
  },
}

const AR: FayCopy = {
  statement:
    'قالب تجارة إلكترونية عالمي أُعيد بناؤه لإيران: مدفوعات شاپرك، وهوية بالهاتف فقط، وريال صحيح يُعرض بالتومان، وبنية تحتية داخل البلاد.',
  industry: 'التجزئة · تجارة إلكترونية للأزياء الرجالية',
  team: 'المصمم والمطوّر الوحيد، بالعمل مع وكلاء برمجة بالذكاء الاصطناعي',
  heroCaption: 'المتجر على الهاتف: شبكة فئات، ومنتج مسعّر بالتومان مع خصمه، وأداة اختيار المقاس.',
  snapshot: {
    problem:
      'كل افتراض في قالب التجارة — Stripe، والدولار، وتسجيل الدخول بالبريد الإلكتروني، وسجلّ حزم متاح — يسقط أمام متجر إيراني.',
    role: 'المصمم والمطوّر الوحيد عبر لغة التصميم، ونموذج المحتوى، والمتجر، ولوحة الإدارة، والمدفوعات، والهوية، والبنية التحتية، والإصدارات.',
    result:
      'يعمل على faymen.ir ويستقبل المدفوعات؛ كشفت قاعدة واحدة لمراجعة الملاحظات أن 113 من 166 منتجًا كانت تُرجع 404.',
  },
  alt: {
    cover: 'فيمن على الهاتف — مجموعة الصديريات في شبكة منتجات من اليمين إلى اليسار بأسعار بالتومان',
    shop: 'فيمن على الهاتف — صفحة المتجر مع حقل بحث وتبويبات للفئات وسراويل مسعّرة بالتومان',
    shoesProduct:
      'فيمن على الهاتف — صفحة منتج لحذاء ديربي جلدي بسعره المخفّض بالتومان وزر الإضافة إلى السلة',
    sizeGuideMobile:
      'فيمن على الهاتف — دليل المقاسات والقياسات، يبدأ بالإرجاع المجاني وأداة اختيار المقاس',
    login: 'فيمن على الهاتف — صفحة تسجيل الدخول بحقل واحد لرقم الجوال وزر لطلب رمز التحقق',
    shipping:
      'فيمن على الهاتف — صفحة الشحن تَعِد بتوصيل مجاني فوق حدّ معيّن بالتومان، مع تتبّع الطلبات',
    faq: 'فيمن على الهاتف — صفحة الأسئلة الشائعة القابلة للبحث، مصنّفة حسب الموضوع',
    waistcoatsDesk:
      'فيمن على سطح المكتب — فئة الصديريات في شبكة من اليمين إلى اليسار، مع الفلاتر على اليمين وأسعار مشطوبة',
    sizeGuideDesk:
      'فيمن على سطح المكتب — نموذج اختيار المقاس بجانب وعود الدليل بالإرجاع المجاني والاستشارة',
    fabricGuideDesk:
      'فيمن على سطح المكتب — دليل الأقمشة يطابق القماش مع الموسم، مع جدول مقارنة وعيّنات أقمشة',
  },
  context: {
    heading: 'قالب صُمّم لمكان آخر',
    body: [
      'تبيع فيمن أزياء رجالية مفصّلة — بدلات وسراويل وقمصان وأحذية — مع خدمة تفصيل حسب المقاس، ودليل للأقمشة، وأداة لاختيار المقاس. بدأ البناء من قالب التجارة الإلكترونية الرسمي لـ Payload: الإيداع الأول هو القالب دون أي تعديل، والإيداعات الـ 490 التي تلته استبدلت الطبقة التجارية بالكامل.',
      'هذا الأصل هو القصة، لا مصدر حرج. ما يفترضه القالب — Stripe، والدولار الأمريكي، والهوية بالبريد الإلكتروني وكلمة المرور، وCI مستضاف، وسجلّ حزم متاح — هو بالضبط قائمة ما لا يصحّ لمتجر في إيران.',
    ],
    figureCaption:
      'صفحة فئة بعرض سطح المكتب: شبكة من اليمين إلى اليسار، والفلاتر على اليمين، وأسعار بالتومان مع شطب السعر قبل الخصم.',
  },
  problem: {
    heading: 'خمسة افتراضات لا تصحّ في إيران',
    intro: 'كان لا بد من استبدال كل افتراض في قالب تجارة عالمي، لا ضبطه:',
    bullets: [
      'المدفوعات — لا تعمل Stripe هنا؛ التجارة الإيرانية تمرّ عبر بوابات شاپرك.',
      'العملة — تُخزَّن الأسعار بالريال ويُتحدَّث بها بالتومان، بفارق عشرة أضعاف يُحمّل العميل 10× أو 0.1× إذا عكسه تكامل واحد.',
      'الهوية — يتعامل المتسوقون مع المتجر عبر رقم الهاتف، لا عبر البريد الإلكتروني.',
      'البنية التحتية — لا يمكن الوصول إلى GitHub وDocker Hub بشكل موثوق من خادم في إيران، لذا يتعطّل أي خط نشر يعتمد عليهما في أسوأ لحظة.',
      'الطباعة — لغة تصميم كُتبت لبرمجيات إنجليزية من اليسار إلى اليمين كان عليها أن تخدم تجارة تجزئة فارسية.',
    ],
  },
  ownership: {
    heading: 'شخص واحد، والواجهة كلها',
    intro:
      'المصمم والمطوّر الوحيد، مع وكلاء برمجة بالذكاء الاصطناعي تولّوا جزءًا كبيرًا من التنفيذ وفق مواصفات مكتوبة.',
    own: [
      'لغة التصميم وتكييفها للفارسية',
      'نموذج المحتوى والمتجر وتجربة لوحة الإدارة',
      'المدفوعات والهوية بالهاتف فقط',
      'البنية التحتية داخل البلاد',
      'عملية الإصدار وسجلّ عمليات النشر',
    ],
    collaborate: ['ملاحظات العميل، عبر نظام تتبّع'],
    note: 'يصل كل تعليق خام إلى نظام التتبّع ويُفحَص مقابل الشيفرة الفعلية قبل أن يتحوّل إلى مواصفة يستطيع وكيلٌ تنفيذها دون سؤال متابعة.',
  },
  approach: {
    heading: 'كيِّف لغة تصميم، ودوِّن أين تختلف',
    body: [
      'سار العمل على مراحل: خط الأساس، ثم الأداء، ثم نظام التصميم، ثم الطبقة التجارية، ثم الانتقال إلى الهاتف أولًا. كُيِّفت لغة التصميم ولم تُخترَع من جديد: طبقة تكييف صريحة، «Precision Minimalism × فیمن»، تسمّي هذا التعارض — نظام بُني لبرمجيات إنجليزية من اليسار إلى اليمين، يُطبَّق على مشغل أزياء رجالية فارسي — وتحسم أنه حيث يختلف الاثنان، يفوز التكييف.',
      'حُسمت ثلاثة قرارات. أحدّها طباعي: تباعد أحرف صفري للفارسية، لأن تباعد الأحرف يقطع الحروف الفارسية المتصلة. لا تحويل لحالة الأحرف، ولا خط مائل، ولغة فوتوغرافية وطباعية خالصة بلا رسوم توضيحية.',
    ],
    insight:
      'يمرّ كل إصدار عبر بوابة واحدة: توليد الأنواع وفحوص خريطة الاستيراد، ثم فحص الأنواع، وlint، و772 اختبار وحدة و1,086 اختبار تكامل، وبناء للإنتاج.',
    processHeading: 'خمس جولات على قاعدة شيفرة واحدة',
    steps: [
      { label: 'خط الأساس', note: 'القالب الرسمي دون تعديل، كأول إيداع' },
      { label: 'الأداء', note: 'تحسين السرعة قبل أي إعادة تصميم' },
      { label: 'نظام التصميم', note: 'طبقة التكييف الفارسية وقراراتها المحسومة' },
      { label: 'الطبقة التجارية', note: 'البوابات، والريال والتومان، والمحفظة والخصومات' },
      { label: 'الهاتف أولًا', note: 'الهوية والدفع والنشرة الإخبارية تنتقل إلى رقم الهاتف' },
    ],
    figureItems: [
      'أداة اختيار المقاس: القَصّة والقياسات ومقاس مقترح.',
      'دليل الأقمشة: أي قماش يناسب أي موسم واستخدام، وكيف يُعتنى به.',
    ],
    figureCaption: 'فوتوغرافيا وطباعة فقط: تحمل الأدلة العلامة التجارية دون برنامج رسوم توضيحية.',
  },
  decisions: {
    heading: 'أربعة استبدالات، لا إعدادات',
    lede: 'كلٌّ منها يستبدل افتراضًا من القالب بالقيد الذي تجاهله.',
    items: [
      {
        title: 'خزّن الريال عددًا صحيحًا، واعرض التومان',
        why: 'تُذكر الأسعار بالتومان وتُسوّى بالريال. تخزين الريال كاملًا بلا كسور والتحويل عند العرض فقط يمنع خطأ العشرة أضعاف من الوصول إلى أي عملية دفع.',
        alternatives: 'تخزين التومان والتحويل لكل بوابة',
        tradeoff: 'على كل تكامل أن يصرّح بوحدته عند حدّ واحد.',
      },
      {
        title: 'اجعل رقم الهاتف الهوية الوحيدة',
        why: 'يتم تسجيل الدخول وإنشاء الحساب والدفع برقم جوال ورمز لمرة واحدة؛ أُلغيت مسارات البريد الإلكتروني وكلمة المرور في القالب، وانتقلت النشرة الإخبارية إلى SMS.',
        alternatives: 'إبقاء الدخول بالبريد الإلكتروني إلى جانب الرمز',
        tradeoff: 'كل تسجيل دخول يعتمد على وصول SMS.',
      },
      {
        title: 'أبقِ كل تبعيات النشر داخل البلاد',
        why: 'تخزين الكائنات، وخادم Git مستضاف ذاتيًا مع نسخة مرآة على GitHub، ومنصة النشر، والتحليلات، كلها تعمل داخل البلاد، فلا يتعطّل النشر حين يتعذّر الوصول إلى GitHub أو Docker Hub.',
        alternatives: 'CI مستضاف وسجلّات عامة',
        tradeoff: 'بنية تحتية أكثر للتشغيل والمراقبة والنسخ الاحتياطي.',
      },
      {
        title: 'عامِل كل إعداد للبوابة كبيانات اعتماد إلزامية',
        why: 'وحدة المبلغ لدى المزوّد تحدد ما إذا كان العميل سيُحاسَب بعشرة أضعاف المبلغ أو بعُشره، ونقطة اتصال ناقصة تفشل عند الدفع، لذا لا يمكن تفعيل أي بوابة قبل ملء كل إعداد تحتاجه.',
        alternatives: 'السماح للمسؤول بتفعيل البوابة وإكمالها لاحقًا',
        tradeoff: 'ينتظر المزوّدون المدمَجون استكمال التسجيل بدل أن يعملوا مع الشيفرة مباشرة.',
      },
    ],
    loginEvidence: 'صفحة تسجيل الدخول الحية: حقل واحد، رقم جوال، وطلب رمز تحقق.',
  },
  solution: {
    heading: 'واجهة تجارية محلية',
    body: 'Payload 3.88 داخل Next.js 16 على MongoDB، مع 13 مجموعة مكتوبة يدويًا، و25 كتلة للصفحات، و4 إعدادات عامة. وحول البوابات والهوية بالهاتف تأتي العناصر التي يتوقعها المتسوّق الإيراني:',
    bullets: [
      'محفظة للعميل كرصيد في المتجر، ومحرّك خصومات من ثلاث مراحل: لكل منتج، ولكل فئة، وبرموز القسائم.',
      'SMS عبر مزوّد محلي للرموز وإشعارات التخفيضات والعملاء المحتملين من الشركات، إضافة إلى نشرة إخبارية عبر الهاتف.',
      'وسوم ترب تحمل السعر والسعر السابق بالتومان، وختم الثقة إي‌نماد (e-Namad)، والتواريخ الشمسية، والأرقام الفارسية.',
      'لوحة إدارة بالفارسية افتراضيًا، مع خطوط مستضافة ذاتيًا حتى لا يعتمد شيء على غوغل أثناء التشغيل.',
    ],
    figureItems: [
      'الشحن: توصيل مجاني فوق حدّ معيّن بالتومان، إلى جميع أنحاء البلاد، مع التتبّع.',
      'أسئلة مصنّفة حسب الموضوع وقابلة للبحث بالفارسية.',
    ],
    figureCaption: 'صفحات دعم كُتبت لهذا السوق، من اليمين إلى اليسار بالكامل.',
  },
  outcomes: {
    heading: 'حيّ، وصريح بشأن القمع المظلم',
    intro:
      'يعمل على faymen.ir ويستقبل مدفوعات حقيقية، مع سجلّ لا يقبل إلا الإضافة لكل إصدار إنتاجي. يُبقى الإصدار عند 0.9.0 عمدًا: الرقم 1.0.0 محجوز للإطلاق الرسمي. لا تُنشر أي أرقام تجارية.',
    measured: [
      {
        label: 'منتجات اكتُشف أنها تُرجع 404، وأُصلحت',
        context:
          'كانت العناوين الفارسية تولّد روابط معطوبة؛ أكثر من ثلثي الكتالوج كان غير مرئي في متجر حيّ.',
        source: 'نظام تتبّع الملاحظات، بعد فحصها مقابل الشيفرة',
      },
      {
        label: 'اختبارات الوحدة والتكامل عند بوابة الإصدار',
        context: 'تُشغَّل مع كل إصدار، إلى جانب فحص الأنواع وlint وبناء الإنتاج.',
        source: 'سجلّ تغييرات المشروع',
      },
      {
        label: 'تبعيات قديمة حُدّثت واحدة تلو الأخرى',
        context: 'جرى التحقق من كل تحديث على حدة، فيشير أي عطل إلى حزمة واحدة.',
        source: 'سجلّ تغييرات المشروع',
      },
    ],
    delivered: {
      label: 'متجر حيّ يستقبل المدفوعات',
      context:
        '491 إيداعًا في نحو اثني عشر أسبوعًا، من القالب دون تعديل إلى دفع يعتمد الهاتف أولًا.',
    },
    shipped: [
      'تسجيل دخول بالهاتف فقط',
      'محفظة العميل',
      'محرّك خصومات من ثلاث مراحل',
      'موجز أسعار ترب',
      'ختم الثقة إي‌نماد',
      'لوحة إدارة بالفارسية أولًا',
    ],
  },
  funnel: {
    text: '«من مشاهدة الصفحة، ومشاهدة المنتج، والإضافة إلى السلة، وبدء الدفع، والتحويل إلى البوابة، والشراء، لا يظهر إلا الأخير أصلًا.»',
    attribution: 'خطة تتبّع الأحداث في المتجر',
    method: 'كُتبت عند تفعيل التحليلات في 2026-08-31',
  },
  lessons: {
    heading: 'ما علّمته الشبكة',
    items: [
      {
        title: 'القيود التي تبدو أعمالًا روتينية هي قرارات منتج',
        body: '«Docker Hub غير متاح» ليست حاشية حين تحدد ما إذا كان المتجر يستطيع نشر إصلاح خلال موسم التخفيضات؛ و«البريد الإلكتروني لا يناسب السوق» يعيد كتابة الهوية والدفع والنشرة الإخبارية.',
      },
      {
        title: 'التعليق ليس مهمة حتى يُفحَص مقابل الشيفرة',
        body: '«تظهر منتجات خاطئة» كانت شكوى غامضة. أدى التحقيق فيها إلى اكتشاف 113 من 166؛ ونظام تتبّع يأخذها على ظاهرها كان سيعالج عَرَضًا فقط.',
      },
      {
        title: 'دوِّن أين تختلف لغة التصميم المستعارة',
        body: 'كان تكييف لغة قائمة أقل كلفة من تأليف لغة ثانية، وأصبحت نقاط الاختلاف — تباعد الأحرف في الفارسية، وغياب الرسوم التوضيحية — أنفع ما في الوثيقة.',
      },
    ],
  },
}

const ES: FayCopy = {
  statement:
    'Una plantilla de comercio internacional rehecha para Irán: pagos Shaparak, identidad solo por teléfono, Rial entero mostrado en Toman y un stack en el país.',
  industry: 'Retail · e-commerce de moda masculina',
  team: 'Único diseñador y desarrollador, trabajando con agentes de programación de IA',
  heroCaption:
    'La tienda en un móvil: una cuadrícula de categoría, un producto con su precio en Toman y su descuento, y el buscador de tallas.',
  snapshot: {
    problem:
      'Cada supuesto de la plantilla de comercio —Stripe, dólares, inicio de sesión por email, un registro de paquetes accesible— falla en una tienda iraní.',
    role: 'Único diseñador y desarrollador del lenguaje de diseño, el modelo de contenido, la tienda, la administración, los pagos, la identidad, la infraestructura y las versiones.',
    result:
      'En producción en faymen.ir y cobrando pagos; una sola regla de feedback reveló que 113 de 166 productos devolvían 404.',
  },
  alt: {
    cover:
      'Fayman en un móvil: la colección de chalecos como cuadrícula de productos de derecha a izquierda, con precios en Toman',
    shop: 'Fayman en un móvil: la página de la tienda con un campo de búsqueda, pestañas de categoría y pantalones con precios en Toman',
    shoesProduct:
      'Fayman en un móvil: la página de producto de un zapato derby de piel, con su precio rebajado en Toman y un botón para añadir al carrito',
    sizeGuideMobile:
      'Fayman en un móvil: la guía de tallas y medidas, que abre con las devoluciones gratuitas y la herramienta Size Finder',
    login:
      'Fayman en un móvil: la página de inicio de sesión con un único campo para el número de móvil y un botón que solicita un código de verificación',
    shipping:
      'Fayman en un móvil: la página de envíos, que promete entrega gratuita a partir de un umbral en Toman, con seguimiento de pedidos',
    faq: 'Fayman en un móvil: la página de preguntas frecuentes con buscador, agrupada por temas',
    waistcoatsDesk:
      'Fayman en escritorio: la categoría de chalecos como cuadrícula de derecha a izquierda, con filtros a la derecha y precios tachados',
    sizeGuideDesk:
      'Fayman en escritorio: el formulario del Size Finder junto a las promesas de la guía de devoluciones gratuitas y asesoramiento',
    fabricGuideDesk:
      'Fayman en escritorio: la guía de tejidos, que relaciona cada tela con una estación mediante una tabla comparativa y muestras de tejido',
  },
  context: {
    heading: 'Una plantilla hecha para otro lugar',
    body: [
      'Fayman (فیمن) vende sastrería masculina —trajes, pantalones, camisas y zapatos— con un servicio a medida, una guía de tejidos y un buscador de tallas. El desarrollo partió de la plantilla oficial de ecommerce de Payload: el primer commit es la plantilla intacta, y los 490 commits posteriores sustituyeron toda la capa comercial.',
      'Ese origen es la historia, no algo que ocultar. Lo que la plantilla da por hecho —Stripe, dólares estadounidenses, identidad por email y contraseña, CI alojado, un registro de paquetes accesible— es exactamente la lista de cosas que no se cumplen para una tienda en Irán.',
    ],
    figureCaption:
      'Una página de categoría en escritorio: cuadrícula de derecha a izquierda, filtros a la derecha y precios en Toman con el precio anterior al descuento tachado.',
  },
  problem: {
    heading: 'Cinco supuestos que no se cumplen en Irán',
    intro:
      'Cada supuesto de una plantilla de comercio internacional tuvo que sustituirse, no configurarse:',
    bullets: [
      'Pagos: Stripe no opera aquí; el comercio iraní funciona con pasarelas Shaparak.',
      'Moneda: los precios se guardan en Rial y se dicen en Toman, un factor de diez que cobra a un cliente 10× o 0,1× si una integración lo invierte.',
      'Identidad: los compradores se relacionan con una tienda a través de un número de teléfono, no de una dirección de email.',
      'Infraestructura: GitHub y Docker Hub no son accesibles de forma fiable desde un servidor iraní, así que un pipeline que depende de ellos falla en el peor momento.',
      'Tipografía: un lenguaje de diseño escrito para software en inglés, de izquierda a derecha, tuvo que servir al comercio minorista persa.',
    ],
  },
  ownership: {
    heading: 'Una persona, toda la superficie',
    intro:
      'Único diseñador y desarrollador, con agentes de programación de IA encargados de buena parte de la implementación a partir de especificaciones escritas.',
    own: [
      'El lenguaje de diseño y su adaptación al persa',
      'Modelo de contenido, tienda y experiencia de administración',
      'Pagos e identidad solo por teléfono',
      'Infraestructura dentro del país',
      'El proceso de versiones y su registro de despliegues',
    ],
    collaborate: ['El feedback del cliente, gestionado en un sistema de seguimiento'],
    note: 'Cada comentario en bruto entra en el sistema de seguimiento y se investiga contra el código real antes de convertirse en una especificación que un agente pueda implementar sin preguntas adicionales.',
  },
  approach: {
    heading: 'Adaptar un lenguaje de diseño y dejar por escrito dónde discrepa',
    body: [
      'El trabajo avanzó en este orden: base, rendimiento, sistema de diseño, capa comercial y, por último, la migración a teléfono primero. El lenguaje de diseño se adaptó en lugar de inventarse: una capa de adaptación explícita, “Precision Minimalism × فیمن”, nombra el desajuste —un sistema creado para software en inglés de izquierda a derecha, aplicado a un taller persa de moda masculina— y establece que, donde ambos discrepan, gana la adaptación.',
      'Tres decisiones quedaron fijadas. La más tajante es tipográfica: cero espaciado entre letras en persa, porque el espaciado separa las letras enlazadas del persa. Sin transformaciones de mayúsculas, sin cursiva, y un lenguaje puramente fotográfico y tipográfico, sin ilustración.',
    ],
    insight:
      'Cada versión supera un único control: generación de tipos y comprobación del import map, después comprobación de tipos, lint, 772 pruebas unitarias y 1.086 de integración, y un build de producción.',
    processHeading: 'Cinco pasadas sobre una misma base de código',
    steps: [
      { label: 'Base', note: 'La plantilla oficial, intacta, como primer commit' },
      { label: 'Rendimiento', note: 'Velocidad antes de cualquier rediseño' },
      {
        label: 'Sistema de diseño',
        note: 'La capa de adaptación al persa y sus decisiones fijadas',
      },
      { label: 'Capa comercial', note: 'Pasarelas, Rial y Toman, monedero y descuentos' },
      {
        label: 'Teléfono primero',
        note: 'La identidad, el checkout y el boletín pasan al número de teléfono',
      },
    ],
    figureItems: [
      'El buscador de tallas: ajuste, medidas y una talla recomendada.',
      'La guía de tejidos: qué tela conviene a cada estación, uso y cuidado.',
    ],
    figureCaption:
      'Solo fotografía y tipografía: las guías transmiten la marca sin un programa de ilustración.',
  },
  decisions: {
    heading: 'Cuatro sustituciones, no configuraciones',
    lede: 'Cada una cambia un valor por defecto de la plantilla por la restricción que ignoraba.',
    items: [
      {
        title: 'Guardar Rial entero, mostrar Toman',
        why: 'Los precios se dicen en Toman pero se liquidan en Rial. Guardar Rial enteros, sin decimales, y convertir solo al mostrar impide que un error de factor diez llegue nunca a un cobro.',
        alternatives: 'Guardar Toman y convertir en cada pasarela',
        tradeoff: 'Cada integración tiene que declarar su unidad en una única frontera.',
      },
      {
        title: 'Hacer del número de teléfono la única identidad',
        why: 'El inicio de sesión, el registro y el checkout piden un número de móvil y un código de un solo uso; se retiraron los flujos de email y contraseña de la plantilla, y el boletín pasó a SMS.',
        alternatives: 'Mantener el inicio de sesión por email junto al código',
        tradeoff: 'Cada inicio de sesión depende de la entrega del SMS.',
      },
      {
        title: 'Mantener en el país cada dependencia del despliegue',
        why: 'El almacenamiento de objetos, un servidor Git propio con espejo en GitHub, la plataforma de despliegue y la analítica funcionan dentro del país, así que un despliegue no se rompe cuando GitHub o Docker Hub no son accesibles.',
        alternatives: 'CI alojado y registros públicos',
        tradeoff: 'Más infraestructura que operar, vigilar y respaldar.',
      },
      {
        title: 'Tratar cada ajuste de pasarela como una credencial obligatoria',
        why: 'La unidad de importe de un proveedor decide si a un cliente se le cobra diez veces de más o de menos, y un endpoint ausente falla en el checkout, así que una pasarela no puede activarse hasta completar todos los ajustes que necesita.',
        alternatives: 'Dejar que un administrador active una pasarela y la complete después',
        tradeoff:
          'Los proveedores integrados esperan a su alta en lugar de entrar en producción con el código.',
      },
    ],
    loginEvidence:
      'La página de inicio de sesión en producción: un campo, un número de móvil y la solicitud de un código de verificación.',
  },
  solution: {
    heading: 'Una superficie de comercio local',
    body: 'Payload 3.88 dentro de Next.js 16 sobre MongoDB, con 13 colecciones escritas a mano, 25 bloques de página y 4 globales. Alrededor de las pasarelas y la identidad por teléfono están las piezas que espera un comprador iraní:',
    bullets: [
      'Un monedero de cliente como saldo en tienda y un motor de descuentos en tres fases: por producto, por categoría y códigos de cupón.',
      'SMS a través de un proveedor local para códigos, avisos de rebajas y leads corporativos, además de un boletín basado en el teléfono.',
      'Etiquetas del marketplace Torob con el precio y el precio anterior en Toman, el sello de confianza E-namad, fechas Shamsi y numerales persas.',
      'Un panel de administración en farsi por defecto, con sus fuentes alojadas en el propio servidor para que nada dependa de Google en tiempo de ejecución.',
    ],
    figureItems: [
      'Envíos: entrega gratuita a partir de un umbral en Toman, a todo el país, con seguimiento.',
      'Preguntas agrupadas por temas y con búsqueda en persa.',
    ],
    figureCaption:
      'Páginas de soporte escritas para el mercado, de derecha a izquierda de principio a fin.',
  },
  outcomes: {
    heading: 'En producción, y honesto sobre el embudo oscuro',
    intro:
      'En producción en faymen.ir y cobrando pagos reales, con un registro de solo adición de cada versión en producción. La versión se mantiene en 0.9.0 a propósito: 1.0.0 queda reservada para el lanzamiento en producción. No se publican cifras comerciales.',
    measured: [
      {
        label: 'Productos detectados devolviendo 404, y corregidos',
        context:
          'Los títulos en persa generaban slugs rotos; más de dos tercios del catálogo eran invisibles en una tienda en producción.',
        source: 'Sistema de seguimiento de feedback, investigado contra el código',
      },
      {
        label: 'Pruebas unitarias y de integración en el control de salida',
        context:
          'Se ejecutan en cada versión, junto a la comprobación de tipos, el lint y un build de producción.',
        source: 'Registro de cambios del proyecto',
      },
      {
        label: 'Dependencias obsoletas actualizadas de una en una',
        context:
          'Cada actualización se verificó por separado, así que un fallo apunta a un solo paquete.',
        source: 'Registro de cambios del proyecto',
      },
    ],
    delivered: {
      label: 'Una tienda en producción que cobra pagos',
      context:
        '491 commits en unas doce semanas, de la plantilla intacta al checkout con teléfono primero.',
    },
    shipped: [
      'Inicio de sesión solo por teléfono',
      'Monedero de cliente',
      'Motor de descuentos en tres fases',
      'Feed de precios para Torob',
      'Sello de confianza E-namad',
      'Administración en farsi por defecto',
    ],
  },
  funnel: {
    text: '«De vista de página, vista de producto, añadido al carrito, inicio del checkout, redirección al pago y compra, solo el último paso es visible siquiera.»',
    attribution: 'El plan de seguimiento de eventos de la tienda',
    method: 'Redactado cuando la analítica se activó el 2026-08-31',
  },
  lessons: {
    heading: 'Lo que enseñó la red',
    items: [
      {
        title: 'Las restricciones que parecen tareas menores son decisiones de producto',
        body: '«Docker Hub no es accesible» no es una nota al pie cuando decide si la tienda puede desplegar una corrección en plenas rebajas; «el email no encaja en el mercado» reescribe la identidad, el checkout y el boletín.',
      },
      {
        title: 'Un comentario no es una tarea hasta que se contrasta con el código',
        body: '«Aparecen los productos equivocados» era una queja vaga. Investigarla produjo el hallazgo de 113 de 166; un sistema de seguimiento que la hubiera tomado al pie de la letra habría corregido un síntoma.',
      },
      {
        title: 'Dejar por escrito dónde discrepa un lenguaje de diseño prestado',
        body: 'Adaptar un lenguaje existente salió más barato que crear uno segundo, y las discrepancias —el espaciado entre letras en persa, la ausencia de ilustración— se convirtieron en la parte más útil del documento.',
      },
    ],
  },
}

const DE: FayCopy = {
  statement:
    'Ein internationales Commerce-Template, für den Iran neu gebaut: Shaparak-Zahlungen, Identität nur per Telefon, ganzzahlige Rial als Toman, ein Stack im Inland.',
  industry: 'Einzelhandel · E-Commerce für Herrenmode',
  team: 'Alleiniger Designer und Entwickler, zusammen mit KI-Coding-Agents',
  heroCaption:
    'Der Shop auf dem Smartphone: ein Kategorieraster, ein Produkt mit Toman-Preis und Rabatt und der Größenfinder.',
  snapshot: {
    problem:
      'Jede Annahme des Commerce-Templates – Stripe, Dollar, E-Mail-Login, eine erreichbare Registry – scheitert bei einem iranischen Shop.',
    role: 'Alleiniger Designer und Entwickler für Designsprache, Content-Modell, Storefront, Admin, Zahlungen, Identität, Infrastruktur und Releases.',
    result:
      'Live unter faymen.ir und nimmt Zahlungen an; eine einzige Feedback-Regel deckte auf, dass 113 von 166 Produkten 404 lieferten.',
  },
  alt: {
    cover:
      'Fayman auf dem Smartphone: die Westenkollektion als Produktraster von rechts nach links, mit Preisen in Toman',
    shop: 'Fayman auf dem Smartphone: die Shop-Seite mit Suchfeld, Kategorie-Tabs und Hosen mit Preisen in Toman',
    shoesProduct:
      'Fayman auf dem Smartphone: die Produktseite eines Derby-Schuhs aus Leder mit rabattiertem Toman-Preis und einem Warenkorb-Button',
    sizeGuideMobile:
      'Fayman auf dem Smartphone: der Größen- und Maßratgeber, der mit kostenlosen Retouren und dem Tool Size Finder beginnt',
    login:
      'Fayman auf dem Smartphone: die Login-Seite mit einem einzigen Feld für die Mobilnummer und einem Button, der einen Bestätigungscode anfordert',
    shipping:
      'Fayman auf dem Smartphone: die Versandseite, die ab einem Toman-Schwellenwert kostenlose Lieferung verspricht, mit Sendungsverfolgung',
    faq: 'Fayman auf dem Smartphone: die durchsuchbare FAQ-Seite, nach Themen gruppiert',
    waistcoatsDesk:
      'Fayman auf dem Desktop: die Kategorie Westen als Raster von rechts nach links, mit Filtern rechts und durchgestrichenen Preisen',
    sizeGuideDesk:
      'Fayman auf dem Desktop: das Formular des Size Finder neben den Versprechen des Ratgebers zu kostenlosen Retouren und Beratung',
    fabricGuideDesk:
      'Fayman auf dem Desktop: der Stoffratgeber, der Stoffe mit Vergleichstabelle und Stoffmustern der passenden Jahreszeit zuordnet',
  },
  context: {
    heading: 'Ein Template, gebaut für einen anderen Ort',
    body: [
      'Fayman (فیمن) verkauft geschneiderte Herrenmode – Anzüge, Hosen, Hemden und Schuhe – mit Maßservice, Stoffratgeber und Größenfinder. Der Build begann mit dem offiziellen E-Commerce-Template von Payload: Der erste Commit ist das unveränderte Template, und die 490 Commits danach ersetzten die gesamte kommerzielle Schicht.',
      'Diese Herkunft ist die Geschichte, kein Makel. Was das Template voraussetzt – Stripe, US-Dollar, Identität per E-Mail und Passwort, gehostetes CI, eine erreichbare Paket-Registry –, ist genau die Liste dessen, was für einen Shop im Iran nicht gilt.',
    ],
    figureCaption:
      'Eine Kategorieseite in Desktop-Breite: ein Raster von rechts nach links, Filter rechts, Toman-Preise mit durchgestrichenem Preis vor Rabatt.',
  },
  problem: {
    heading: 'Fünf Annahmen, die im Iran nicht gelten',
    intro:
      'Jede Annahme eines internationalen Commerce-Templates musste ersetzt werden, nicht konfiguriert:',
    bullets: [
      'Zahlungen: Stripe ist hier nicht verfügbar; der iranische Handel läuft über Shaparak-Gateways.',
      'Währung: Preise werden in Rial gespeichert und in Toman genannt – ein Faktor zehn, der einem Kunden 10× oder 0,1× berechnet, wenn eine Integration ihn umdreht.',
      'Identität: Kunden verbinden sich mit einem Shop über eine Telefonnummer, nicht über eine E-Mail-Adresse.',
      'Infrastruktur: GitHub und Docker Hub sind von einem iranischen Host aus nicht zuverlässig erreichbar, also scheitert eine Pipeline, die von ihnen abhängt, im ungünstigsten Moment.',
      'Typografie: Eine Designsprache für englische Software von links nach rechts musste persischen Einzelhandel tragen.',
    ],
  },
  ownership: {
    heading: 'Eine Person, die ganze Oberfläche',
    intro:
      'Alleiniger Designer und Entwickler; KI-Coding-Agents übernahmen einen Großteil der Implementierung nach schriftlichen Specs.',
    own: [
      'Die Designsprache und ihre persische Adaption',
      'Content-Modell, Storefront und Admin-Erlebnis',
      'Zahlungen und Identität nur per Telefon',
      'Infrastruktur im Inland',
      'Der Release-Prozess und sein Deploy-Ledger',
    ],
    collaborate: ['Das Feedback des Kunden, geführt in einem Tracker'],
    note: 'Jeder Rohkommentar landet in einem Tracker und wird am echten Code geprüft, bevor er zu einer Spec wird, die ein Agent ohne Rückfrage umsetzen kann.',
  },
  approach: {
    heading: 'Eine Designsprache adaptieren und festhalten, wo sie widerspricht',
    body: [
      'Die Arbeit verlief in dieser Reihenfolge: Basis, Leistung, Designsystem, kommerzielle Schicht, dann die Umstellung auf Telefon zuerst. Die Designsprache wurde adaptiert statt erfunden: Eine explizite Adaptionsschicht, “Precision Minimalism × فیمن”, benennt den Widerspruch – ein System für englische Software von links nach rechts, angewandt auf ein persisches Herrenmode-Atelier – und legt fest, dass bei Widersprüchen die Adaption gewinnt.',
      'Drei Entscheidungen wurden festgeschrieben. Die schärfste ist typografisch: null Laufweite im Persischen, weil Sperrung die verbundenen Buchstaben des Persischen auseinanderreißt. Keine Umwandlung in Groß- oder Kleinbuchstaben, keine Kursive und eine rein fotografische und typografische Sprache ohne Illustration.',
    ],
    insight:
      'Jedes Release durchläuft ein einziges Gate: Typgenerierung und Import-Map-Prüfung, dann Typprüfung, Lint, 772 Unit- und 1.086 Integrationstests sowie ein Produktions-Build.',
    processHeading: 'Fünf Durchgänge über eine Codebasis',
    steps: [
      { label: 'Basis', note: 'Das offizielle Template, unverändert, als erster Commit' },
      { label: 'Leistung', note: 'Geschwindigkeit vor jedem Redesign' },
      {
        label: 'Designsystem',
        note: 'Die persische Adaptionsschicht und ihre festgeschriebenen Entscheidungen',
      },
      { label: 'Commerce-Schicht', note: 'Gateways, Rial und Toman, Wallet und Rabatte' },
      {
        label: 'Telefon zuerst',
        note: 'Identität, Checkout und Newsletter wechseln zur Telefonnummer',
      },
    ],
    figureItems: [
      'Der Größenfinder: Passform, Maße und eine empfohlene Größe.',
      'Der Stoffratgeber: welcher Stoff zu welcher Jahreszeit, Nutzung und Pflege passt.',
    ],
    figureCaption:
      'Nur Fotografie und Typografie: Die Ratgeber tragen die Marke ohne Illustrationsprogramm.',
  },
  decisions: {
    heading: 'Vier Ersetzungen, keine Konfigurationen',
    lede: 'Jede tauscht einen Template-Standard gegen die Einschränkung, die er ignorierte.',
    items: [
      {
        title: 'Ganzzahlige Rial speichern, Toman anzeigen',
        why: 'Preise werden in Toman genannt, aber in Rial abgerechnet. Ganze Rial ohne Nachkommastellen zu speichern und nur für die Anzeige umzurechnen, verhindert, dass ein Fehler um den Faktor zehn je eine Abbuchung erreicht.',
        alternatives: 'Toman speichern und pro Gateway umrechnen',
        tradeoff: 'Jede Integration muss ihre Einheit an einer einzigen Grenze deklarieren.',
      },
      {
        title: 'Die Telefonnummer zur einzigen Identität machen',
        why: 'Login, Registrierung und Checkout verlangen eine Mobilnummer und einen Einmalcode; die E-Mail-und-Passwort-Pfade des Templates wurden stillgelegt, und der Newsletter wechselte zu SMS.',
        alternatives: 'E-Mail-Login neben dem Code behalten',
        tradeoff: 'Jeder Login hängt von der SMS-Zustellung ab.',
      },
      {
        title: 'Jede Deploy-Abhängigkeit im Land halten',
        why: 'Object Storage, ein selbst gehosteter Git-Server mit GitHub-Mirror, die Deploy-Plattform und die Analytics laufen im Inland, sodass ein Deploy nicht bricht, wenn GitHub oder Docker Hub nicht erreichbar sind.',
        alternatives: 'Gehostetes CI und öffentliche Registries',
        tradeoff: 'Mehr Infrastruktur zu betreiben, zu überwachen und zu sichern.',
      },
      {
        title: 'Jede Gateway-Einstellung als Pflicht-Zugangsdatum behandeln',
        why: 'Die Betragseinheit eines Anbieters entscheidet, ob ein Kunde um den Faktor zehn zu viel oder zu wenig belastet wird, und ein fehlender Endpoint scheitert im Checkout – deshalb lässt sich ein Gateway erst aktivieren, wenn jede nötige Einstellung ausgefüllt ist.',
        alternatives: 'Einen Admin ein Gateway aktivieren und später vervollständigen lassen',
        tradeoff:
          'Integrierte Anbieter warten auf das Onboarding, statt mit dem Code live zu gehen.',
      },
    ],
    loginEvidence:
      'Die Live-Login-Seite: ein Feld, eine Mobilnummer und die Anforderung eines Bestätigungscodes.',
  },
  solution: {
    heading: 'Eine lokale Commerce-Oberfläche',
    body: 'Payload 3.88 in Next.js 16 auf MongoDB, mit 13 von Hand geschriebenen Collections, 25 Seitenblöcken und 4 Globals. Rund um die Gateways und die Telefon-Identität liegen die Bausteine, die ein iranischer Kunde erwartet:',
    bullets: [
      'Ein Kunden-Wallet als Shop-Guthaben und eine dreistufige Rabatt-Engine: pro Produkt, pro Kategorie und Gutscheincodes.',
      'SMS über einen lokalen Anbieter für Codes, Sale-Benachrichtigungen und Firmen-Leads, dazu ein telefonbasierter Newsletter.',
      'Torob-Marktplatz-Tags mit Preis und Altpreis in Toman, das E-namad-Vertrauenssiegel, Shamsi-Daten und persische Ziffern.',
      'Ein Admin-Panel standardmäßig auf Farsi, mit selbst gehosteten Schriften, damit zur Laufzeit nichts von Google abhängt.',
    ],
    figureItems: [
      'Versand: kostenlose Lieferung ab einem Toman-Schwellenwert, landesweit, mit Sendungsverfolgung.',
      'Fragen nach Themen gruppiert und auf Persisch durchsuchbar.',
    ],
    figureCaption: 'Support-Seiten für den Markt geschrieben, durchgehend von rechts nach links.',
  },
  outcomes: {
    heading: 'Live, und ehrlich über den dunklen Funnel',
    intro:
      'Live unter faymen.ir und nimmt echte Zahlungen an, mit einem Append-only-Ledger jedes Produktions-Releases. Die Version steht bewusst bei 0.9.0: 1.0.0 ist für den Produktionslaunch reserviert. Kommerzielle Zahlen werden nicht veröffentlicht.',
    measured: [
      {
        label: 'Produkte mit 404 gefunden und behoben',
        context:
          'Persische Titel erzeugten kaputte Slugs; mehr als zwei Drittel des Katalogs waren in einem Live-Shop unsichtbar.',
        source: 'Feedback-Tracker, am Code geprüft',
      },
      {
        label: 'Unit- und Integrationstests am Ship-Gate',
        context: 'Laufen bei jedem Release, neben Typprüfung, Lint und einem Produktions-Build.',
        source: 'Projekt-Changelog',
      },
      {
        label: 'Veraltete Abhängigkeiten, einzeln aktualisiert',
        context:
          'Jedes Update für sich verifiziert, sodass ein Bruch auf ein einziges Paket zeigt.',
        source: 'Projekt-Changelog',
      },
    ],
    delivered: {
      label: 'Ein Live-Shop, der Zahlungen annimmt',
      context:
        '491 Commits in etwa zwölf Wochen, vom unveränderten Template bis zum telefonbasierten Checkout.',
    },
    shipped: [
      'Login nur per Telefon',
      'Kunden-Wallet',
      'Dreistufige Rabatt-Engine',
      'Torob-Preisfeed',
      'E-namad-Vertrauenssiegel',
      'Admin mit Farsi als Standard',
    ],
  },
  funnel: {
    text: '„Von Seitenaufruf, Produktansicht, In-den-Warenkorb, Checkout-Start, Zahlungsweiterleitung und Kauf ist überhaupt nur der letzte Schritt sichtbar.“',
    attribution: 'Der Event-Tracking-Plan des Shops',
    method: 'Verfasst, als die Analytics am 2026-08-31 live gingen',
  },
  lessons: {
    heading: 'Was das Netz gelehrt hat',
    items: [
      {
        title: 'Einschränkungen, die nach Pflichtarbeit aussehen, sind Produktentscheidungen',
        body: '„Docker Hub ist nicht erreichbar“ ist keine Fußnote, wenn es entscheidet, ob der Shop während eines Sales einen Fix deployen kann; „E-Mail passt nicht zum Markt“ schreibt Identität, Checkout und Newsletter neu.',
      },
      {
        title: 'Ein Kommentar ist erst eine Aufgabe, wenn er am Code geprüft ist',
        body: '„Es werden die falschen Produkte angezeigt“ war eine vage Beschwerde. Die Untersuchung ergab den Befund 113 von 166; ein Tracker, der sie für bare Münze genommen hätte, hätte ein Symptom behoben.',
      },
      {
        title: 'Festhalten, wo eine geliehene Designsprache widerspricht',
        body: 'Eine bestehende Sprache zu adaptieren war günstiger, als eine zweite zu schreiben, und die Widersprüche – Laufweite im Persischen, keine Illustration – wurden zum nützlichsten Teil des Dokuments.',
      },
    ],
  },
}

const FR: FayCopy = {
  statement:
    'Un modèle e-commerce international refait pour l’Iran : paiement Shaparak, identité par téléphone, Rial entier affiché en Toman, infrastructure locale.',
  industry: 'Commerce de détail · e-commerce de mode masculine',
  team: 'Seul designer et développeur, avec des agents de code IA',
  heroCaption:
    'La boutique sur mobile : une grille de catégorie, un produit en Toman avec sa remise, et le Size Finder.',
  snapshot: {
    problem:
      'Chaque présupposé du modèle e-commerce — Stripe, le dollar, la connexion par e-mail, un registre accessible — échoue pour une boutique iranienne.',
    role: 'Seul designer et développeur : langage de design, modèle de contenu, boutique, administration, paiements, identité, infrastructure et mises en production.',
    result:
      'En ligne sur faymen.ir et encaisse des paiements ; une seule règle de traitement des retours a révélé que 113 produits sur 166 renvoyaient une 404.',
  },
  alt: {
    cover:
      'Fayman sur mobile — la collection de gilets en grille produit de droite à gauche, prix en Toman',
    shop: 'Fayman sur mobile — la page boutique avec un champ de recherche, des onglets de catégories et des pantalons affichés en Toman',
    shoesProduct:
      'Fayman sur mobile — la fiche produit d’un derby en cuir, avec son prix remisé en Toman et un bouton d’ajout au panier',
    sizeGuideMobile:
      'Fayman sur mobile — le guide des tailles et mesures, qui s’ouvre sur les retours gratuits et l’outil Size Finder',
    login:
      'Fayman sur mobile — la page de connexion avec un seul champ de numéro de mobile et un bouton pour demander un code de vérification',
    shipping:
      'Fayman sur mobile — la page de livraison, gratuite au-delà d’un seuil en Toman, avec suivi de commande',
    faq: 'Fayman sur mobile — la foire aux questions avec recherche, classée par thème',
    waistcoatsDesk:
      'Fayman sur ordinateur — la catégorie gilets en grille de droite à gauche, filtres à droite et prix barrés',
    sizeGuideDesk:
      'Fayman sur ordinateur — le formulaire Size Finder à côté des engagements du guide : retours gratuits et conseils',
    fabricGuideDesk:
      'Fayman sur ordinateur — le guide des tissus, qui associe chaque étoffe à une saison, avec un tableau comparatif et des échantillons',
  },
  context: {
    heading: 'Un modèle conçu pour ailleurs',
    body: [
      'Fayman (فیمن) vend de la mode masculine tailleur — costumes, pantalons, chemises et chaussures — avec un service sur mesure, un guide des tissus et un Size Finder. Le projet est parti du modèle e-commerce officiel de Payload : le premier commit est le modèle intact, et les 490 commits suivants ont remplacé toute la couche commerciale.',
      'Cette origine est le sujet, pas un aveu. Ce que le modèle suppose — Stripe, le dollar américain, l’identité par e-mail et mot de passe, une CI hébergée, un registre de paquets accessible — est précisément la liste de ce qui ne tient pas pour une boutique en Iran.',
    ],
    figureCaption:
      'Une page catégorie sur ordinateur : grille de droite à gauche, filtres à droite, prix en Toman avec le prix avant remise barré.',
  },
  problem: {
    heading: 'Cinq présupposés qui ne tiennent pas en Iran',
    intro:
      'Chaque présupposé d’un modèle e-commerce international devait être remplacé, pas configuré :',
    bullets: [
      'Paiement — Stripe n’opère pas ici ; le commerce iranien passe par les passerelles Shaparak.',
      'Devise — les prix sont stockés en Rial et annoncés en Toman, un facteur dix qui facture 10× ou 0,1× au client si une intégration l’inverse.',
      'Identité — les clients s’identifient auprès d’une boutique par leur numéro de téléphone, pas par une adresse e-mail.',
      'Infrastructure — GitHub et Docker Hub ne sont pas accessibles de façon fiable depuis un hébergeur iranien : un pipeline qui en dépend échoue au pire moment.',
      'Typographie — un langage de design écrit pour des logiciels anglais de gauche à droite devait servir le commerce persan.',
    ],
  },
  ownership: {
    heading: 'Une seule personne, toute la surface',
    intro:
      'Seul designer et développeur, avec des agents de code IA qui réalisent une grande partie de l’implémentation à partir de spécifications écrites.',
    own: [
      'Le langage de design et son adaptation persane',
      'Le modèle de contenu, la boutique et l’expérience d’administration',
      'Le paiement et l’identité par téléphone uniquement',
      'L’infrastructure dans le pays',
      'Le processus de mise en production et son registre de déploiements',
    ],
    collaborate: ['Les retours du client, traités dans un outil de suivi'],
    note: 'Chaque commentaire brut arrive dans l’outil de suivi et est vérifié sur le code réel avant de devenir une spécification qu’un agent peut implémenter sans question complémentaire.',
  },
  approach: {
    heading: 'Adapter un langage de design, et écrire où il diverge',
    body: [
      'Le travail s’est déroulé ainsi : base, performance, design system, couche commerciale, puis migration vers le téléphone. Le langage de design a été adapté, pas inventé : une couche d’adaptation explicite, « Precision Minimalism × فیمن », nomme le décalage — un système conçu pour des logiciels anglais de gauche à droite, appliqué à un atelier persan de mode masculine — et tranche : là où les deux divergent, l’adaptation l’emporte.',
      'Trois décisions ont été verrouillées. La plus nette est typographique : aucun interlettrage en persan, car l’interlettrage sépare les lettres liées du persan. Aucune transformation de casse, pas d’italique, et un langage purement photographique et typographique, sans illustration.',
    ],
    insight:
      'Chaque mise en production passe une seule porte : génération des types et vérification de l’import map, puis contrôle des types, lint, 772 tests unitaires et 1 086 tests d’intégration, et un build de production.',
    processHeading: 'Cinq passes sur une seule base de code',
    steps: [
      { label: 'Base', note: 'Le modèle officiel, intact, comme premier commit' },
      { label: 'Performance', note: 'Le travail sur la vitesse avant toute refonte' },
      {
        label: 'Design system',
        note: 'La couche d’adaptation persane et ses décisions verrouillées',
      },
      { label: 'Couche commerce', note: 'Passerelles, Rial et Toman, portefeuille et remises' },
      {
        label: 'Téléphone d’abord',
        note: 'L’identité, le paiement et la newsletter passent au numéro de téléphone',
      },
    ],
    figureItems: [
      'Le Size Finder : coupe, mesures et taille recommandée.',
      'Le guide des tissus : quelle étoffe pour quelle saison, quel usage et quel entretien.',
    ],
    figureCaption:
      'Uniquement photographique et typographique : les guides portent la marque sans programme d’illustration.',
  },
  decisions: {
    heading: 'Quatre remplacements, pas des configurations',
    lede: 'Chacun remplace un réglage par défaut du modèle par la contrainte qu’il ignorait.',
    items: [
      {
        title: 'Stocker le Rial entier, afficher le Toman',
        why: 'Les prix s’annoncent en Toman mais se règlent en Rial. Stocker des Rial entiers, sans décimales, et ne convertir qu’à l’affichage empêche une erreur d’un facteur dix d’atteindre un paiement.',
        alternatives: 'Stocker en Toman et convertir pour chaque passerelle',
        tradeoff: 'Chaque intégration doit déclarer son unité à une frontière unique.',
      },
      {
        title: 'Faire du numéro de téléphone la seule identité',
        why: 'Connexion, inscription et paiement demandent un numéro de mobile et un code à usage unique ; les parcours e-mail et mot de passe du modèle ont été retirés, et la newsletter est passée au SMS.',
        alternatives: 'Garder la connexion par e-mail à côté du code',
        tradeoff: 'Chaque connexion dépend de la livraison des SMS.',
      },
      {
        title: 'Garder chaque dépendance de déploiement dans le pays',
        why: 'Le stockage objet, un serveur Git auto-hébergé avec un miroir GitHub, la plateforme de déploiement et l’analytics tournent dans le pays : un déploiement ne casse pas quand GitHub ou Docker Hub sont inaccessibles.',
        alternatives: 'CI hébergée et registres publics',
        tradeoff: 'Plus d’infrastructure à exploiter, surveiller et sauvegarder.',
      },
      {
        title: 'Traiter chaque réglage de passerelle comme un identifiant obligatoire',
        why: 'L’unité de montant d’un prestataire décide si un client paie dix fois trop ou trop peu, et un endpoint manquant échoue au paiement : une passerelle ne peut donc être activée que lorsque tous ses réglages sont renseignés.',
        alternatives: 'Laisser un admin activer une passerelle et la compléter plus tard',
        tradeoff:
          'Les prestataires intégrés attendent la fin de leur onboarding au lieu de passer en ligne avec le code.',
      },
    ],
    loginEvidence:
      'La page de connexion en ligne : un seul champ, un numéro de mobile, et une demande de code de vérification.',
  },
  solution: {
    heading: 'Une surface commerciale locale',
    body: 'Payload 3.88 dans Next.js 16 sur MongoDB, avec 13 collections écrites à la main, 25 blocs de page et 4 globals. Autour des passerelles et de l’identité par téléphone, les éléments qu’attend un client iranien :',
    bullets: [
      'Un portefeuille client comme avoir, et un moteur de remises en trois phases : par produit, par catégorie et par code promo.',
      'Des SMS via un prestataire local pour les codes, les notifications de vente et les contacts entreprises, plus une newsletter par téléphone.',
      'Des balises marketplace Torob avec prix et ancien prix en Toman, le sceau de confiance E-namad, des dates en calendrier solaire hégirien (Shamsi) et des chiffres persans.',
      'Un panneau d’administration en farsi par défaut, avec ses polices auto-hébergées pour que rien ne dépende de Google à l’exécution.',
    ],
    figureItems: [
      'Livraison : gratuite au-delà d’un seuil en Toman, dans tout le pays, avec suivi.',
      'Des questions classées par thème, avec recherche en persan.',
    ],
    figureCaption: 'Des pages d’aide écrites pour le marché, de droite à gauche de bout en bout.',
  },
  outcomes: {
    heading: 'En ligne, et honnête sur l’entonnoir invisible',
    intro:
      'En ligne sur faymen.ir et encaissant de vrais paiements, avec un registre en ajout seul de chaque mise en production. La version reste volontairement à 0.9.0 : 1.0.0 est réservée au lancement en production. Aucun chiffre commercial n’est publié.',
    measured: [
      {
        label: 'Produits trouvés en 404, puis corrigés',
        context:
          'Les titres persans généraient des slugs cassés ; plus des deux tiers du catalogue étaient invisibles sur une boutique en ligne.',
        source: 'Outil de suivi des retours, vérifié sur le code',
      },
      {
        label: 'Tests unitaires et d’intégration à la porte de livraison',
        context:
          'Lancés à chaque mise en production, avec le contrôle des types, le lint et un build de production.',
        source: 'Journal des modifications du projet',
      },
      {
        label: 'Dépendances obsolètes mises à jour une par une',
        context: 'Chaque mise à jour est vérifiée seule, pour qu’une casse désigne un seul paquet.',
        source: 'Journal des modifications du projet',
      },
    ],
    delivered: {
      label: 'Une boutique en ligne qui encaisse des paiements',
      context:
        '491 commits en une douzaine de semaines, du modèle intact au paiement centré sur le téléphone.',
    },
    shipped: [
      'Connexion par téléphone uniquement',
      'Portefeuille client',
      'Moteur de remises en trois phases',
      'Flux de prix Torob',
      'Sceau de confiance E-namad',
      'Administration en farsi par défaut',
    ],
  },
  funnel: {
    text: '« Page vue, fiche produit, ajout au panier, début du paiement, redirection vers la passerelle, achat : seul le dernier est visible. »',
    attribution: 'Le plan de suivi des événements de la boutique',
    method: 'Rédigé à la mise en service de l’analytics, le 31 août 2026',
  },
  lessons: {
    heading: 'Ce que le réseau a appris',
    items: [
      {
        title: 'Les contraintes qui ressemblent à des corvées sont des décisions produit',
        body: '« Docker Hub est inaccessible » n’est pas une note de bas de page quand cela décide si la boutique peut déployer un correctif pendant des soldes ; « l’e-mail ne convient pas au marché » réécrit l’identité, le paiement et la newsletter.',
      },
      {
        title: 'Un commentaire n’est pas une tâche tant qu’il n’est pas vérifié sur le code',
        body: '« Les mauvais produits s’affichent » était une plainte vague. L’examiner a produit le constat des 113 sur 166 ; un outil de suivi qui l’aurait pris au pied de la lettre aurait corrigé un symptôme.',
      },
      {
        title: 'Écrire où un langage de design emprunté diverge',
        body: 'Adapter un langage existant coûtait moins cher que d’en écrire un second, et les divergences — l’interlettrage persan, l’absence d’illustration — sont devenues la partie la plus utile du document.',
      },
    ],
  },
}

const JA: FayCopy = {
  statement:
    '海外向けコマーステンプレートをイラン向けに作り直した。シャパラク決済、電話番号だけの本人確認、整数リアルのトマン表示、国内で完結するインフラ。',
  industry: '小売 · メンズウェアEC',
  team: 'デザイナー兼開発者として単独で担当し、AIコーディングエージェントと協働',
  heroCaption:
    'スマートフォンで見たストア。カテゴリのグリッド、割引付きのトマン価格の商品、そしてSize Finder。',
  snapshot: {
    problem:
      'Stripe、ドル、メールでのログイン、到達できるレジストリ。コマーステンプレートの前提は、イランのストアではすべて成り立たない。',
    role: 'デザイン言語、コンテンツモデル、ストアフロント、管理画面、決済、本人確認、インフラ、リリースまで、デザインと開発を一人で担当。',
    result:
      'faymen.irで稼働し、決済を受け付けている。フィードバックのルールひとつで、166商品中113件が404を返していたことが判明した。',
  },
  alt: {
    cover:
      'スマートフォンのFayman — ベストのコレクションを右から左の商品グリッドで表示、価格はトマン',
    shop: 'スマートフォンのFayman — 検索欄、カテゴリタブ、トマン価格のパンツが並ぶショップページ',
    shoesProduct:
      'スマートフォンのFayman — レザーのダービーシューズの商品ページ。割引後のトマン価格とカートに追加ボタン',
    sizeGuideMobile:
      'スマートフォンのFayman — サイズと採寸のガイド。冒頭に無料返品とSize Finderツール',
    login:
      'スマートフォンのFayman — 携帯番号の入力欄ひとつと、認証コードを求めるボタンだけのログインページ',
    shipping:
      'スマートフォンのFayman — 一定のトマン金額以上で送料無料をうたう配送ページ。注文追跡付き',
    faq: 'スマートフォンのFayman — トピック別にまとめた、検索できるよくある質問ページ',
    waistcoatsDesk:
      'デスクトップのFayman — ベストのカテゴリを右から左のグリッドで表示。右側にフィルター、取り消し線付きの価格',
    sizeGuideDesk:
      'デスクトップのFayman — Size Finderのフォームと、無料返品と相談を約束するガイドの文面',
    fabricGuideDesk:
      'デスクトップのFayman — 生地と季節を対応させる生地ガイド。比較表と生地見本付き',
  },
  context: {
    heading: '別の場所のために作られたテンプレート',
    body: [
      'Fayman (فیمن) はスーツ、パンツ、シャツ、靴などのテーラードメンズウェアを販売し、オーダーメイドのサービス、生地ガイド、Size Finderを備える。開発はPayload公式のECテンプレートから始めた。最初のコミットは手つかずのテンプレートで、その後の490コミットでコマース層をすべて置き換えた。',
      'この出自は恥ではなく、物語の核心だ。テンプレートが前提とするもの——Stripe、米ドル、メールとパスワードによる本人確認、ホスティング型のCI、到達できるパッケージレジストリ——は、そのままイランのストアでは成り立たないものの一覧だった。',
    ],
    figureCaption:
      'デスクトップ幅のカテゴリページ。右から左のグリッド、右側のフィルター、割引前の価格に取り消し線を引いたトマン価格。',
  },
  problem: {
    heading: 'イランでは成り立たない5つの前提',
    intro: '海外向けコマーステンプレートの前提は、設定ではなく、すべて置き換える必要があった。',
    bullets: [
      '決済 — Stripeはイランで利用できず、国内のコマースはシャパラクのゲートウェイで動いている。',
      '通貨 — 価格はリアルで保存され、トマンで語られる。その差は10倍で、連携がひとつでも逆に扱えば顧客に10倍か0.1倍を請求してしまう。',
      '本人確認 — 顧客がストアとつながる手段は、メールアドレスではなく電話番号だ。',
      'インフラ — イランのサーバーからはGitHubやDocker Hubに安定して接続できず、それに依存するパイプラインは最悪のタイミングで止まる。',
      'タイポグラフィ — 左から右に書く英語ソフトウェア向けのデザイン言語を、ペルシア語の小売に使う必要があった。',
    ],
  },
  ownership: {
    heading: '一人で、すべての領域を',
    intro:
      'デザイナー兼開発者として単独で担当。実装の多くは、書面の仕様に基づいてAIコーディングエージェントが行った。',
    own: [
      'デザイン言語とそのペルシア語への適応',
      'コンテンツモデル、ストアフロント、管理画面の体験',
      '決済と電話番号のみの本人確認',
      '国内で完結するインフラ',
      'リリースプロセスとデプロイ台帳',
    ],
    collaborate: ['トラッカーで管理するクライアントからのフィードバック'],
    note: '寄せられたコメントはすべてトラッカーに入り、実際のコードと照らして調査したうえで、エージェントが追加の質問なしに実装できる仕様になる。',
  },
  approach: {
    heading: 'デザイン言語を適応させ、食い違う点を書き残す',
    body: [
      '作業はベースライン、パフォーマンス、デザインシステム、コマース層、電話番号中心への移行の順に進めた。デザイン言語は新たに作らず、適応させた。明示的な適応レイヤー「Precision Minimalism × فیمن」が、左から右の英語ソフトウェア向けのシステムをペルシアのメンズウェアのアトリエに当てはめるというずれを明文化し、両者が食い違うときは適応側を優先すると定めている。',
      '3つの決定を固定した。最も鋭いのはタイポグラフィで、ペルシア語の字間はゼロ。字間を空けると、つなげて書くペルシア文字が切れてしまうからだ。大文字・小文字の変換もイタリックも使わず、イラストを用いない写真とタイポグラフィだけの表現とした。',
    ],
    insight:
      'すべてのリリースは同じゲートを通る。型生成とインポートマップのチェック、型チェック、lint、772件のユニットテストと1,086件の統合テスト、そして本番ビルド。',
    processHeading: 'ひとつのコードベースに5つのパス',
    steps: [
      { label: 'ベースライン', note: '手つかずの公式テンプレートを最初のコミットに' },
      { label: 'パフォーマンス', note: 'リデザインの前に速度を改善' },
      { label: 'デザインシステム', note: 'ペルシア語の適応レイヤーと固定した決定' },
      { label: 'コマース層', note: 'ゲートウェイ、リアルとトマン、ウォレット、割引' },
      { label: '電話番号中心', note: '本人確認、チェックアウト、ニュースレターを電話番号へ移行' },
    ],
    figureItems: [
      'Size Finder：フィット、採寸、推奨サイズ。',
      '生地ガイド：季節、用途、手入れに合う生地。',
    ],
    figureCaption: '写真とタイポグラフィだけ。イラストに頼らず、ガイドがブランドを伝える。',
  },
  decisions: {
    heading: '設定ではなく、4つの置き換え',
    lede: 'どれも、テンプレートの初期設定を、それが無視していた制約に置き換えたものだ。',
    items: [
      {
        title: '整数のリアルで保存し、トマンで表示する',
        why: '価格はトマンで語られ、リアルで決済される。小数なしの整数リアルで保存し、表示のときだけ換算すれば、10倍の誤りが請求に届くことはない。',
        alternatives: 'トマンで保存し、ゲートウェイごとに換算する',
        tradeoff: 'すべての連携が、ひとつの境界で単位を明示しなければならない。',
      },
      {
        title: '電話番号を唯一の本人確認にする',
        why: 'ログイン、新規登録、チェックアウトでは携帯番号とワンタイムコードを使う。テンプレートのメールとパスワードの経路は廃止し、ニュースレターもSMSに移した。',
        alternatives: 'コードと並べてメールでのログインも残す',
        tradeoff: 'すべてのログインがSMSの到達に依存する。',
      },
      {
        title: 'デプロイの依存先をすべて国内に置く',
        why: 'オブジェクトストレージ、GitHubミラー付きのセルフホストGitサーバー、デプロイ基盤、アナリティクスをすべて国内で運用し、GitHubやDocker Hubに届かなくてもデプロイが壊れないようにした。',
        alternatives: 'ホスティング型のCIと公開レジストリ',
        tradeoff: '運用、監視、バックアップするインフラが増える。',
      },
      {
        title: 'ゲートウェイの設定はすべて必須の認証情報として扱う',
        why: '決済事業者の金額単位ひとつで、顧客への請求が10倍多くも少なくもなり、エンドポイントが欠ければチェックアウトで失敗する。そのため、必要な設定がすべて埋まるまでゲートウェイを有効にできない。',
        alternatives: '管理者がゲートウェイを有効にし、後から設定を補う',
        tradeoff:
          '連携済みの事業者も、コードと同時には公開されず、オンボーディングを待つことになる。',
      },
    ],
    loginEvidence: '公開中のログインページ。入力欄は携帯番号ひとつで、認証コードを求めるだけ。',
  },
  solution: {
    heading: '現地のためのコマース',
    body: 'MongoDB上のNext.js 16にPayload 3.88を組み込み、手書きのコレクション13個、ページブロック25個、グローバル4個で構成。ゲートウェイと電話番号の本人確認のまわりに、イランの買い物客が期待する要素をそろえた。',
    bullets: [
      'ストアクレジットとしての顧客ウォレットと、商品別、カテゴリ別、クーポンコードの3段階の割引エンジン。',
      '国内事業者を通じたSMSで、認証コード、販売通知、法人の問い合わせを送信。電話番号ベースのニュースレターも。',
      '価格と旧価格をトマンで伝えるTorobマーケットプレイスのタグ、E-namadの信頼シール、イラン暦（Shamsi）の日付、ペルシア数字。',
      '既定でペルシア語の管理画面。フォントはセルフホストで、実行時にGoogleに依存しない。',
    ],
    figureItems: [
      '配送：一定のトマン金額以上で送料無料、全国発送、追跡付き。',
      'トピック別にまとめ、ペルシア語で検索できる質問。',
    ],
    figureCaption: '市場に合わせて書いたサポートページ。すべて右から左。',
  },
  outcomes: {
    heading: '稼働中、そして見えないファネルに正直に',
    intro:
      'faymen.irで稼働し、実際の決済を受け付けている。本番リリースはすべて追記専用の台帳に記録。バージョンはあえて0.9.0に据え置き、1.0.0は本番ローンチのために取ってある。商業上の数値は公開していない。',
    measured: [
      {
        label: '404を返していた商品を発見し、修正',
        context:
          'ペルシア語のタイトルが壊れたスラッグを生成し、稼働中のストアでカタログの3分の2以上が見えなくなっていた。',
        source: 'フィードバックトラッカー、コードと照らして調査',
      },
      {
        label: 'リリースゲートのユニットテストと統合テスト',
        context: '型チェック、lint、本番ビルドとともに、リリースごとに実行。',
        source: 'プロジェクトの変更履歴',
      },
      {
        label: '古くなった依存関係を1つずつ更新',
        context: '更新を1件ずつ検証し、不具合の原因をひとつのパッケージに絞れるようにした。',
        source: 'プロジェクトの変更履歴',
      },
    ],
    delivered: {
      label: '決済を受け付ける稼働中のストア',
      context:
        '約12週間で491コミット。手つかずのテンプレートから、電話番号中心のチェックアウトまで。',
    },
    shipped: [
      '電話番号だけのログイン',
      '顧客ウォレット',
      '3段階の割引エンジン',
      'Torob価格フィード',
      'E-namad信頼シール',
      'ペルシア語優先の管理画面',
    ],
  },
  funnel: {
    text: '「ページビュー、商品閲覧、カート追加、チェックアウト開始、決済へのリダイレクト、購入。このうち見えるのは最後だけだ」',
    attribution: 'ストアのイベントトラッキング計画',
    method: '2026年8月31日、アナリティクスの稼働時に作成',
  },
  lessons: {
    heading: 'ネットワークが教えてくれたこと',
    items: [
      {
        title: '雑務に見える制約こそ、プロダクトの決定である',
        body: '「Docker Hubに接続できない」は、セール中に修正をデプロイできるかを左右するなら脚注ではない。「メールは市場に合わない」は、本人確認、チェックアウト、ニュースレターを書き換える。',
      },
      {
        title: 'コメントは、コードで確かめるまでタスクではない',
        body: '「違う商品が表示される」は曖昧な苦情だった。調べた結果が、166商品中113件という発見になった。額面どおりに受け取るトラッカーなら、症状を直すだけで終わっていた。',
      },
      {
        title: '借りたデザイン言語が食い違う点を書き残す',
        body: '既存の言語を適応させるほうが、もうひとつ作るより安く済んだ。そして食い違い——ペルシア語の字間、イラストなし——こそが、ドキュメントで最も役に立つ部分になった。',
      },
    ],
  },
}

const COPY: Record<Locale, FayCopy> = { en: EN, fa: FA, ar: AR, es: ES, de: DE, fr: FR, ja: JA }

export const FAY_MEDIA = Object.fromEntries(
  (Object.keys(MEDIA_FILES) as FayMediaKey[]).map((key) => [
    key,
    {
      ...MEDIA_FILES[key],
      alt: Object.fromEntries(LOCALES.map((locale) => [locale, COPY[locale].alt[key]])),
    },
  ]),
) as Record<FayMediaKey, MediaSpec>

const PROCESS_CODES: Five = ['BASE', 'PERF', 'DSYS', 'COMM', 'PHON']
const MEASURED_VALUES: Three = ['113 / 166', '772 + 1,086', '54 / 58']

export function faySections(locale: Locale, media: FayMediaIds): Sections {
  const c = COPY[locale]
  const dir = dirFor(locale)
  const item = (key: FayMediaKey, id: string, caption?: string) =>
    media[key] ? [{ id, media: media[key]!, ...(caption ? { caption } : {}) }] : []

  return [
    {
      id: 'fay-s01',
      blockType: 'csNarrative',
      label: 'context',
      heading: c.context.heading,
      body: prose(dir, ...c.context.body.map((value) => paragraph(value, dir))),
    },
    {
      id: 'fay-s02',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'plain',
      items: item('waistcoatsDesk', 'fay-f02-1'),
      caption: c.context.figureCaption,
    },
    {
      id: 'fay-s03',
      blockType: 'csNarrative',
      label: 'problem',
      heading: c.problem.heading,
      body: prose(dir, paragraph(c.problem.intro, dir), bullets(c.problem.bullets, dir)),
    },
    {
      id: 'fay-s04',
      blockType: 'csOwnership',
      heading: c.ownership.heading,
      intro: c.ownership.intro,
      own: c.ownership.own,
      collaborate: c.ownership.collaborate,
      note: c.ownership.note,
    },
    {
      id: 'fay-s05',
      blockType: 'csNarrative',
      label: 'approach',
      heading: c.approach.heading,
      body: prose(dir, ...c.approach.body.map((value) => paragraph(value, dir))),
      insight: c.approach.insight,
    },
    {
      id: 'fay-s06',
      blockType: 'csProcess',
      kind: 'process',
      heading: c.approach.processHeading,
      steps: c.approach.steps.map((step, index) => ({
        id: `fay-p${String(index + 1).padStart(2, '0')}`,
        code: PROCESS_CODES[index],
        label: step.label,
        note: step.note,
      })),
    },
    {
      id: 'fay-s07',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'plain',
      items: [
        ...item('sizeGuideDesk', 'fay-f07-1', c.approach.figureItems[0]),
        ...item('fabricGuideDesk', 'fay-f07-2', c.approach.figureItems[1]),
      ],
      caption: c.approach.figureCaption,
    },
    {
      id: 'fay-s08',
      blockType: 'csDecisions',
      heading: c.decisions.heading,
      lede: c.decisions.lede,
      items: c.decisions.items.map((decision, index) => ({
        id: `fay-d${String(index + 1).padStart(2, '0')}`,
        title: decision.title,
        why: decision.why,
        alternatives: decision.alternatives,
        tradeoff: decision.tradeoff,
        ...(index === 1
          ? { evidence: c.decisions.loginEvidence, ...(media.login ? { media: media.login } : {}) }
          : {}),
      })),
    },
    {
      id: 'fay-s09',
      blockType: 'csNarrative',
      label: 'solution',
      heading: c.solution.heading,
      body: prose(dir, paragraph(c.solution.body, dir), bullets(c.solution.bullets, dir)),
    },
    {
      id: 'fay-s10',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'screen',
      items: [
        ...item('shipping', 'fay-f10-1', c.solution.figureItems[0]),
        ...item('faq', 'fay-f10-2', c.solution.figureItems[1]),
      ],
      caption: c.solution.figureCaption,
    },
    {
      id: 'fay-s11',
      blockType: 'csOutcomes',
      heading: c.outcomes.heading,
      intro: c.outcomes.intro,
      items: [
        ...c.outcomes.measured.map((outcome, index) => ({
          id: `fay-o${String(index + 1).padStart(2, '0')}`,
          kind: 'measured' as const,
          value: MEASURED_VALUES[index],
          label: outcome.label,
          context: outcome.context,
          source: outcome.source,
        })),
        {
          id: 'fay-o04',
          kind: 'delivered' as const,
          label: c.outcomes.delivered.label,
          context: c.outcomes.delivered.context,
        },
      ],
      shipped: c.outcomes.shipped,
    },
    {
      id: 'fay-s12',
      blockType: 'csFinding',
      kind: 'quote',
      text: c.funnel.text,
      attribution: c.funnel.attribution,
      method: c.funnel.method,
    },
    {
      id: 'fay-s13',
      blockType: 'csLessons',
      heading: c.lessons.heading,
      items: c.lessons.items.map((lesson, index) => ({
        id: `fay-l${String(index + 1).padStart(2, '0')}`,
        title: lesson.title,
        body: lesson.body,
      })),
    },
  ]
}

export function fayLocalizedFields(locale: Locale, media: FayMediaIds) {
  const c = COPY[locale]
  const identity = ARCHIVE.text(locale)
  return {
    ...identity,
    statement: c.statement,
    industry: c.industry,
    team: c.team,
    hero: {
      items: (['shop', 'shoesProduct', 'sizeGuideMobile'] as const)
        .filter((key) => media[key])
        .map((key, index) => ({
          id: `fay-h${String(index + 1).padStart(2, '0')}`,
          media: media[key]!,
        })),
      caption: c.heroCaption,
    },
    snapshot: c.snapshot,
    sections: faySections(locale, media),
    meta: {
      title: identity.title,
      description: identity.summary,
      ...(media.cover ? { image: media.cover } : {}),
    },
  }
}

export const FAY_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  projectStatus: 'shipped',
  tools: [
    'Payload',
    'Next.js',
    'MongoDB',
    'Tailwind CSS',
    'ArvanCloud',
    'Coolify',
    'Gitea',
    'Playwright',
    'Vitest',
  ],
  period: { start: '2026-06-01T00:00:00.000Z', present: true },
}
