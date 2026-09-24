import type { Project } from '@/payload-types'
import { dirFor, LOCALES, type Locale } from '@/utilities/locale'

import type { MediaSpec } from '../media'
import { archiveIdentity } from './archive'
import { bullets, paragraph, prose } from './lexical'

/**
 * Nim Dang (`/work/nim-dang`) — a fractional Tehran property exchange, from a single Figma file.
 * Every sentence comes from `Docs/Experience/Projects/nim-dang/README.md`, corrected 2026-09-23
 * against 2× re-exports of the file (`assets/2x/`).
 *
 * Publication gates (held here and in `tests/int/case-study-seeds.int.spec.ts`):
 * - Never the person-verification, wizard step 1, register/login or profile frames: they carry a
 *   national ID that passes the checksum, a real name and a phone number.
 * - Never a desktop footer (company name, phone, address). The street address every detail screen
 *   carries is filled over in the three exports that show it.
 * - No lineage: the design system's origin is not stated (README Q4).
 * - No claim that it shipped, no client, no dates beyond the start the file itself implies.
 * - The dark-mode critique in the README's first draft was wrong (both themes exist on the market
 *   screens); the system chapter says what the file actually shows.
 */
export const ND_SLUG = 'nim-dang'
export const ND_ASSETS = 'Docs/Experience/Projects/nim-dang/assets'
export const ND_LOCALES = LOCALES

const ARCHIVE = archiveIdentity(ND_SLUG)

const MEDIA_FILES = {
  cover: { file: '2x/trading-hall/seller-list.png', name: ARCHIVE.row.cover.name },
  listMobile: { file: '2x/property-list/list-view-mobile.png', name: 'nim-dang--list-mobile.png' },
  detailMobile: {
    file: '2x/property-detail/detail-mobile.png',
    name: 'nim-dang--detail-mobile.png',
  },
  hallList: { file: '2x/trading-hall/list-view-mobile.png', name: 'nim-dang--hall-list.png' },
  visitDate: { file: '2x/request-a-visit/date.png', name: 'nim-dang--visit-date.png' },
  visitTime: { file: '2x/request-a-visit/time.png', name: 'nim-dang--visit-time.png' },
  visitVerify: { file: '2x/request-a-visit/visit-verify.png', name: 'nim-dang--visit-verify.png' },
  stockHalls: { file: '2x/stock-halls/stock-halls-v1.png', name: 'nim-dang--stock-halls.png' },
  sellerFirst: {
    file: '2x/trading-hall/seller-list-first.png',
    name: 'nim-dang--seller-list-first.png',
  },
  stepPricing: { file: '2x/wizard/step-4-pricing.png', name: 'nim-dang--step-pricing.png' },
  selectAmount: {
    file: '2x/trading-hall/select-amount-to-buy.png',
    name: 'nim-dang--select-amount.png',
  },
  sellProperty: { file: '2x/my-properties/sell-property.png', name: 'nim-dang--sell-property.png' },
  colorBoard: { file: 'design-system/color.png', name: 'nim-dang--design-system-color.png' },
  walletLight: { file: '2x/wallet/wallet-light.png', name: 'nim-dang--wallet-light.png' },
  walletDark: { file: '2x/wallet/wallet-dark.png', name: 'nim-dang--wallet-dark.png' },
  listDark: {
    file: '2x/property-list/list-view-mobile-dark.png',
    name: 'nim-dang--list-mobile-dark.png',
  },
  hallDark: {
    file: '2x/trading-hall/list-view-mobile-dark.png',
    name: 'nim-dang--hall-list-dark.png',
  },
  sellDark: {
    file: '2x/my-properties/sell-property-dark.png',
    name: 'nim-dang--sell-property-dark.png',
  },
} as const

export type NdMediaKey = keyof typeof MEDIA_FILES
type NdMediaIds = Partial<Record<NdMediaKey, string>>
type Sections = NonNullable<Project['sections']>

type Two<T = string> = [T, T]
type Three<T = string> = [T, T, T]
type Four<T = string> = [T, T, T, T]
type Eight<T = string> = [T, T, T, T, T, T, T, T]

export interface NdCopy {
  statement: string
  industry: string
  team: string
  heroCaption: string
  snapshot: { problem: string; role: string; result: string }
  alt: Record<NdMediaKey, string>
  context: { heading: string; body: Two }
  problem: { heading: string; body: Two; figureItems: Three; figureCaption: string }
  approach: {
    heading: string
    body: Two
    processHeading: string
    steps: Eight<{ label: string; note: string }>
    figureItems: Two
    figureCaption: string
  }
  solution: {
    heading: string
    body: Two
    annotations: Four
    annotatedCaption: string
    pricingCaption: string
  }
  decisions: {
    heading: string
    lede: string
    items: Three<{ title: string; why: string; tradeoff: string }>
  }
  critique: {
    label: string
    heading: string
    body: string
    bullets: Three
    finding: string
    findingMethod: string
    figureItems: Two
    figureCaption: string
  }
  system: {
    label: string
    heading: string
    body: Two
    colorCaption: string
    walletItems: Two
    walletCaption: string
    darkCaption: string
  }
  outcomes: { heading: string; intro: string; items: Three<{ label: string; context: string }> }
  lessons: { heading: string; items: Three<{ title: string; body: string }> }
}

const EN: NdCopy = {
  statement:
    'Tehran property sold by the square metre, then resold between holders, with a low/fair/high gauge grading every peer asking price but never the platform’s own.',
  industry: 'Real estate · fractional ownership',
  team: 'One designer’s file: a single component library and 191 screens',
  heroCaption:
    'The primary market on a phone: listings priced per metre, a property with its appraisal and title documents, and the trading hall where holders resell.',
  snapshot: {
    problem:
      'Make an indivisible asset divisible, then liquid, with no market maker to set the resale price.',
    role: 'Product designer and strategist across a 430-component design system and 191 screens.',
    result:
      'A complete design record — primary sale, visit booking, portfolio and a peer exchange — with no launch evidence on file.',
  },
  alt: {
    cover: ARCHIVE.row.cover.alt,
    listMobile:
      'Nim Dang on a phone — listings in the Pasdaran neighbourhood, each card priced per square metre with the metres left to sell',
    detailMobile:
      'Nim Dang on a phone — a property page with its base price per metre, minimum investment, appraisal report and title documents',
    hallList:
      'Nim Dang on a phone — the trading hall, where holders list the metres they want to resell',
    visitDate:
      'Nim Dang — the visit request sheet, a Shamsi calendar marking free, booked and selected days',
    visitTime: 'Nim Dang — choosing a time for an in-person property visit',
    visitVerify: 'Nim Dang — confirmation that the visit request was registered',
    stockHalls:
      'Nim Dang — the first exchange, “stock halls”: one listing card with its terms as a bulleted list',
    sellerFirst:
      'Nim Dang — the rebuilt trading hall’s seller list: a direct offer, then peer offers with the seller-pricing gauge',
    stepPricing:
      'Nim Dang — the pricing step of the add-property flow: a price stepper, suggested prices and a live low, fair or high gauge',
    selectAmount:
      'Nim Dang — the buy sheet: value per share, 25 metres per share, and a 25-metre purchase totalled as 2 shares',
    sellProperty:
      'Nim Dang — the sell sheet: a holding of 2 shares (100 metres), a share stepper, a price per share and the pricing gauge',
    colorBoard: 'Nim Dang design system, version 0.0.1 — the colour board with its labelled ramps',
    walletLight: 'Nim Dang — the wallet in the light theme, a balance above a list of transactions',
    walletDark: 'Nim Dang — the same wallet in the dark theme',
    listDark: 'Nim Dang — the property list in the dark theme',
    hallDark: 'Nim Dang — the trading hall list in the dark theme',
    sellDark: 'Nim Dang — the sell sheet in the dark theme',
  },
  context: {
    heading: 'Half a dang',
    body: [
      'Nim Dang names itself after the unit it is trying to break. A dang is the traditional Persian unit of property title — a property is held in six dangs — and “nim dang” is half of one. The footer says the rest out loud: «نیم دانگ، فروش ملک متری», selling property by the metre.',
      'In Iran, real estate is the default store of value against inflation, and a Tehran flat is priced far beyond an ordinary saver. The product’s answer is fractional ownership with a secondary market attached: buy two square metres of a building you could never buy outright, watch it revalue, sell the metres on.',
    ],
  },
  problem: {
    heading: 'Divisible, then liquid',
    body: [
      'First, a flat has to become a quantity a person can hold a little of — a price per unit, a minimum ticket, a valuation anyone can check, and enough legal and physical evidence that a stranger will pay for it: an appraisal report, title documents, and a visit booking for people who will not buy a building from photographs.',
      'Then it has to be liquid. Fractional ownership without an exit is an illiquid asset in smaller pieces, so holders need a second market where they sell to each other — which means discovering a price with no market maker, without letting the floor become a place to overcharge the next buyer.',
    ],
    figureItems: ['Pick a day on the Shamsi calendar.', 'Pick a time.', 'The visit is registered.'],
    figureCaption:
      'A physical visit booked inside the purchase flow, for buyers who need to see the building.',
  },
  approach: {
    heading: 'The file records its own order of work',
    body: [
      'Figma node IDs increase as nodes are created, so reading each section’s ID range gives the order it was drawn in. The sequence is not the one a tidy case study would claim afterwards: the transaction was designed before the shell. Selling and visiting came first, browsing and valuation second, and log-in, splash, rules and profile — where most products start — came later.',
      'The exchange was attempted early as “stock halls”, abandoned, and rebuilt in the final phase as the trading hall, at roughly ten times the size.',
    ],
    processHeading: 'Sections in the order they were drawn',
    steps: [
      { label: 'Onboarding', note: 'The first frames in the file' },
      { label: 'Stock halls', note: 'The exchange, first attempt — 2 screens' },
      { label: 'Selling', note: 'The add-property flow and its pricing step' },
      { label: 'Visits', note: 'Booking an in-person visit — 14 screens' },
      { label: 'Buying', note: 'Property list and detail, mobile and desktop' },
      { label: 'Shell', note: 'Log-in, splash, rules, wallet and profile' },
      { label: 'Portfolio', note: 'My properties, drawn alongside the hall' },
      { label: 'Trading hall', note: 'The exchange, rebuilt — 1,706 nodes' },
    ],
    figureItems: [
      'Stock halls: one card, terms as a list.',
      'The trading hall: offers compared side by side.',
    ],
    figureCaption: 'The same exchange drawn twice — abandoned early, rebuilt last.',
  },
  solution: {
    heading: 'A gauge on both sides of the trade',
    body: [
      'On the seller list, every offer states how it is being offered, and there are two kinds: a direct offer from the platform, and a resale by another holder in the trading hall. Peer resales, and only peer resales, carry a three-segment gauge labelled “the seller’s pricing” — low, fair, high — with the offer’s position marked. Direct offers carry none: the platform does not grade itself.',
      'The same gauge appears on the other side of the trade. The pricing step shows a price stepper, suggested prices and the identical bar, relabelled “your pricing”, moving as the seller sets a number. It anchors a seller before they list and warns a buyer at the point of purchase, with a soft signal rather than a hard cap.',
    ],
    annotations: [
      '«عرضه نیم‌دانگ» — the platform’s own offer carries no gauge',
      '«ایوان معاملات» — a resale by another holder',
      '«قیمت گذاری فروشنده» — the seller’s price, marked low, fair or high',
      'Price per metre and price per share read the same, while 30 shares are 24 metres',
    ],
    annotatedCaption: 'The seller list: only peer resales are graded.',
    pricingCaption: 'The seller’s side: “your pricing” moves as the price is set.',
  },
  decisions: {
    heading: 'Market design in three choices',
    lede: 'The exchange rests on three decisions the file makes visible.',
    items: [
      {
        title: 'Grade only peer resales, never the platform’s own offers',
        why: 'A platform grading its own price is not a signal; grading other holders’ prices is. Direct offers carry no gauge at all.',
        tradeoff: 'The platform’s own pricing has to be trusted on its appraisal alone.',
      },
      {
        title: 'A soft signal, not a price cap',
        why: 'A cap would simply be worked around. A gauge anchors a seller before listing and warns a buyer at purchase, without forbidding a price.',
        tradeoff: 'An overpriced offer can still be listed, and bought.',
      },
      {
        title: 'Design the transaction before the shell',
        why: 'Selling, visiting and valuation are the product; log-in, splash and profile are commodity screens. The build order puts them last.',
        tradeoff: 'The shell reached its final form late, after the flows it frames.',
      },
    ],
  },
  critique: {
    label: 'Critique',
    heading: 'What is a square metre called?',
    body: 'The product never settles on a name for the thing it sells, and the inconsistency runs through the core flow:',
    bullets: [
      'List cards price it per metre, and the detail page gives the same quantity a second label.',
      'The trading hall and the portfolio switch to shares.',
      'The brand is named after a third unit entirely: the dang.',
    ],
    finding:
      'The two sheets where money moves state three different ratios: 25 metres per share on the buy sheet, which then totals 25 metres as 2 shares; 2 shares described as 100 metres on the sell sheet; and 30 shares shown as 24 metres on the seller list.',
    findingMethod: 'Read from 2× exports of the buy sheet, the sell sheet and the seller list',
    figureItems: [
      'Buy: 25 metres per share — and 25 metres is 2 shares.',
      'Sell: 2 shares are 100 metres.',
    ],
    figureCaption:
      'Area, equity and traditional title — three mental models for one asset, inside one purchase.',
  },
  system: {
    label: 'System',
    heading: 'A design system at 0.0.1',
    body: [
      '430 components across colour, typography, form fields, buttons, modals, toasts, headers, tab bars and icons, labelled in the file as version 0.0.1 — one hand, one set of colour and type tokens, and 191 screens drawn against them.',
      'Both themes are real where they exist: the wallet swaps true tokens rather than tinting an overlay, and the property list, the trading hall and the sell sheet all have dark versions. The portfolio list and the add-property flow stayed light only.',
    ],
    colorCaption: 'The colour board: labelled ramps, one accent, version 0.0.1.',
    walletItems: ['Light', 'Dark'],
    walletCaption: 'The wallet in both themes — a token swap, not an overlay.',
    darkCaption:
      'The market screens in the dark theme: the property list, the trading hall and the sell sheet.',
  },
  outcomes: {
    heading: 'A design record, not a launch',
    intro:
      'There is no evidence in the file that Nim Dang shipped, and no numbers to report. What it holds is a complete design for both markets.',
    items: [
      {
        label: 'A primary sale with appraisal, countdown and visit booking',
        context:
          'Listings priced per metre, title documents on every property, visits booked on a Shamsi calendar.',
      },
      {
        label: 'A peer exchange with a two-sided fairness gauge',
        context: 'The trading hall, the seller list, and the buy and sell sheets.',
      },
      {
        label: 'A 430-component Persian design system',
        context: '191 screens drawn against one library, in two themes where it counts.',
      },
    ],
  },
  lessons: {
    heading: 'What I’d change',
    items: [
      {
        title: 'Name the unit before you design the market',
        body: 'Metre, share and dang are three mental models for one asset, and the product uses all three inside a single purchase. Everything downstream — the cards, the gauge, the portfolio — inherits the ambiguity. It was a vocabulary decision, and taking it late made it expensive.',
      },
      {
        title: 'The strongest idea deserves the loudest treatment',
        body: 'The low/fair/high gauge on both sides of a peer resale is the most defensible thing in the file, and it appears as one small bar inside a bottom sheet. It should have been what the product led with.',
      },
      {
        title: 'Clear the placeholders before they become the product',
        body: 'English placeholder strings still sit where the gauge’s value belongs. Left long enough, a placeholder stops reading as unfinished and starts reading as the design.',
      },
    ],
  },
}

const FA: NdCopy = {
  statement:
    'ملک تهران متری فروخته می‌شود و بعد میان دارندگان دست‌به‌دست می‌شود؛ نشانگر پایین/منصفانه/بالا قیمت هر دارنده را می‌سنجد، اما هرگز قیمت خود پلتفرم را.',
  industry: 'املاک · مالکیت کسری',
  team: 'فایل یک طراح: یک کتابخانهٔ کامپوننت و ۱۹۱ صفحه',
  heroCaption:
    'بازار اول روی گوشی: آگهی‌هایی با قیمت هر متر، ملکی با گزارش کارشناسی و اسناد مالکیتش، و ایوان معاملات که دارندگان در آن سهمشان را دوباره می‌فروشند.',
  snapshot: {
    problem:
      'دارایی‌ای تقسیم‌ناپذیر را تقسیم‌پذیر کن، بعد نقدشونده، بی‌آنکه بازارسازی باشد که قیمت بازفروش را تعیین کند.',
    role: 'طراح محصول و استراتژیست، در سیستم طراحی‌ای با ۴۳۰ کامپوننت و ۱۹۱ صفحه.',
    result:
      'کارنامهٔ کامل طراحی — فروش اولیه، رزرو بازدید، سبد دارایی و بازار میان دارندگان — بی‌آنکه نشانه‌ای از راه‌اندازی در سوابق باشد.',
  },
  alt: {
    cover:
      'نیم‌دانگ — فهرست فروشندگان در ایوان معاملات، که فقط بازفروش‌های میان دارندگان نشانگر قیمت پایین، منصفانه یا بالا دارند',
    listMobile:
      'نیم‌دانگ روی گوشی — آگهی‌هایی در محلهٔ پاسداران، هر کارت با قیمت هر متر و مترهای باقی‌مانده برای فروش',
    detailMobile:
      'نیم‌دانگ روی گوشی — صفحهٔ یک ملک با قیمت پایهٔ هر متر، حداقل سرمایه‌گذاری، گزارش کارشناسی و اسناد مالکیت',
    hallList:
      'نیم‌دانگ روی گوشی — ایوان معاملات، جایی که دارندگان مترهایی را که می‌خواهند دوباره بفروشند عرضه می‌کنند',
    visitDate:
      'نیم‌دانگ — برگهٔ درخواست بازدید، با تقویم شمسی که روزهای آزاد، رزروشده و انتخاب‌شده را نشان می‌دهد',
    visitTime: 'نیم‌دانگ — انتخاب ساعت برای بازدید حضوری از ملک',
    visitVerify: 'نیم‌دانگ — تأیید ثبت درخواست بازدید',
    stockHalls:
      'نیم‌دانگ — نخستین بازار مبادله، «ایوان» (نسخهٔ اول): یک کارت آگهی با شرایطش به‌صورت فهرست نشانه‌دار',
    sellerFirst:
      'نیم‌دانگ — فهرست فروشندگان در ایوان معاملات بازسازی‌شده: یک عرضهٔ مستقیم، و بعد پیشنهادهای دارندگان با نشانگر «قیمت گذاری فروشنده»',
    stepPricing:
      'نیم‌دانگ — مرحلهٔ قیمت‌گذاری در جریان افزودن ملک: کنترل کم‌وزیاد قیمت، قیمت‌های پیشنهادی و نشانگر زندهٔ پایین، منصفانه یا بالا',
    selectAmount:
      'نیم‌دانگ — برگهٔ خرید: ارزش هر سهم، ۲۵ متر در هر سهم، و خریدی ۲۵ متری که جمعش ۲ سهم نوشته شده',
    sellProperty:
      'نیم‌دانگ — برگهٔ فروش: دارایی ۲ سهمی (۱۰۰ متر)، کنترل کم‌وزیاد سهم، قیمت هر سهم و نشانگر قیمت‌گذاری',
    colorBoard: 'سیستم طراحی نیم‌دانگ، نسخهٔ 0.0.1 — صفحهٔ رنگ با طیف‌های برچسب‌دار',
    walletLight: 'نیم‌دانگ — کیف پول در تم روشن، موجودی بالای فهرست تراکنش‌ها',
    walletDark: 'نیم‌دانگ — همان کیف پول در تم تیره',
    listDark: 'نیم‌دانگ — فهرست املاک در تم تیره',
    hallDark: 'نیم‌دانگ — فهرست ایوان معاملات در تم تیره',
    sellDark: 'نیم‌دانگ — برگهٔ فروش در تم تیره',
  },
  context: {
    heading: 'نیمی از یک دانگ',
    body: [
      'نیم‌دانگ نامش را از همان واحدی گرفته که می‌خواهد آن را بشکند. دانگ واحد سنتی مالکیت ملک در ایران است — هر ملک شش دانگ است — و «نیم‌دانگ» یعنی نصف یک دانگ. فوتر بقیهٔ حرف را صریح می‌گوید: «نیم دانگ، فروش ملک متری».',
      'در ایران، ملک راه پیش‌فرض حفظ ارزش پول در برابر تورم است، و قیمت یک آپارتمان در تهران بسیار فراتر از توان یک پس‌اندازکنندهٔ معمولی است. پاسخ محصول، مالکیت کسری همراه با یک بازار دوم است: دو متر از ساختمانی را بخر که هرگز نمی‌توانستی یکجا بخری، تغییر ارزشش را دنبال کن، و بعد مترها را به دیگری بفروش.',
    ],
  },
  problem: {
    heading: 'تقسیم‌پذیر، سپس نقدشونده',
    body: [
      'اول، آپارتمان باید به مقداری تبدیل شود که آدم بتواند کمی از آن را داشته باشد — قیمتی برای هر واحد، حداقل مبلغ ورود، ارزش‌گذاری‌ای که هر کسی بتواند بررسی‌اش کند، و آن‌قدر شواهد حقوقی و فیزیکی که غریبه‌ای حاضر شود برایش پول بدهد: گزارش کارشناسی، اسناد مالکیت، و رزرو بازدید برای کسانی که ساختمان را از روی عکس نمی‌خرند.',
      'بعد باید نقدشونده شود. مالکیت کسری بدون راه خروج همان دارایی غیرنقد است در تکه‌های کوچک‌تر، پس دارندگان به بازار دومی نیاز دارند که در آن به یکدیگر بفروشند — یعنی کشف قیمت بدون بازارساز، بی‌آنکه این بازار به جایی برای گران‌فروشی به خریدار بعدی تبدیل شود.',
    ],
    figureItems: ['روزی را در تقویم شمسی انتخاب کن.', 'ساعتی را انتخاب کن.', 'بازدید ثبت می‌شود.'],
    figureCaption:
      'بازدید حضوری، رزروشده در دل جریان خرید، برای خریدارانی که باید ساختمان را ببینند.',
  },
  approach: {
    heading: 'فایل ترتیب کار را خودش ثبت کرده است',
    body: [
      'شناسهٔ نودها در Figma با ساخته‌شدن هر نود بزرگ‌تر می‌شود، پس خواندن بازهٔ شناسه‌های هر بخش ترتیب کشیده‌شدنش را نشان می‌دهد. این ترتیب آن چیزی نیست که یک مطالعهٔ موردی مرتب بعداً ادعا می‌کرد: تراکنش پیش از پوسته طراحی شد. فروش و بازدید اول آمدند، مرور و ارزش‌گذاری دوم، و ورود، اسپلش، قوانین و پروفایل — جایی که بیشتر محصولات از آن شروع می‌کنند — بعدتر.',
      'بازار مبادله زود با نام «ایوان» (نسخهٔ اول) امتحان شد، کنار گذاشته شد، و در مرحلهٔ آخر با نام ایوان معاملات، حدوداً ده برابر بزرگ‌تر، از نو ساخته شد.',
    ],
    processHeading: 'بخش‌ها به ترتیب کشیده‌شدن',
    steps: [
      { label: 'آشنایی', note: 'نخستین فریم‌های فایل' },
      { label: '«ایوان» (نسخهٔ اول)', note: 'بازار مبادله، تلاش اول — ۲ صفحه' },
      { label: 'فروش', note: 'جریان افزودن ملک و مرحلهٔ قیمت‌گذاری‌اش' },
      { label: 'بازدید', note: 'رزرو بازدید حضوری — ۱۴ صفحه' },
      { label: 'خرید', note: 'فهرست و جزئیات ملک، موبایل و دسکتاپ' },
      { label: 'پوسته', note: 'ورود، اسپلش، قوانین، کیف پول و پروفایل' },
      { label: 'سبد دارایی', note: 'املاک من، هم‌زمان با ایوان کشیده شد' },
      { label: 'ایوان معاملات', note: 'بازار مبادله، بازسازی‌شده — ۱٬۷۰۶ نود' },
    ],
    figureItems: [
      '«ایوان» (نسخهٔ اول): یک کارت، شرایط به‌صورت فهرست.',
      'ایوان معاملات: پیشنهادها کنار هم مقایسه می‌شوند.',
    ],
    figureCaption:
      'یک بازار مبادله که دو بار کشیده شد — زود کنار گذاشته شد، و آخر از همه از نو ساخته شد.',
  },
  solution: {
    heading: 'نشانگری در هر دو سوی معامله',
    body: [
      'در فهرست فروشندگان، هر پیشنهاد می‌گوید به چه شکلی عرضه شده، و دو نوع وجود دارد: عرضهٔ مستقیم از سوی پلتفرم، و بازفروش دارنده‌ای دیگر در ایوان معاملات. بازفروش‌های دارندگان، و فقط همین‌ها، نشانگری سه‌بخشی با برچسب «قیمت گذاری فروشنده» دارند — پایین، منصفانه، بالا — که جایگاه آن پیشنهاد رویش مشخص شده است. عرضه‌های مستقیم هیچ نشانگری ندارند: پلتفرم به خودش نمره نمی‌دهد.',
      'همین نشانگر در سوی دیگر معامله هم هست. مرحلهٔ قیمت‌گذاری یک کنترل کم‌وزیاد قیمت، قیمت‌های پیشنهادی و همان نوار را نشان می‌دهد، این بار با برچسب «قیمت گذاری شما»، که با تعیین عدد از سوی فروشنده جابه‌جا می‌شود. برای فروشنده پیش از عرضه نقطهٔ مرجعی می‌سازد و به خریدار در لحظهٔ خرید هشدار می‌دهد، با علامتی نرم به‌جای سقفی سخت.',
    ],
    annotations: [
      '«عرضه نیم‌دانگ» — عرضهٔ خود پلتفرم هیچ نشانگری ندارد',
      '«ایوان معاملات» — بازفروش دارنده‌ای دیگر',
      '«قیمت گذاری فروشنده» — قیمت فروشنده، با علامت پایین، منصفانه یا بالا',
      'قیمت هر متر و قیمت هر سهم یکسان‌اند، در حالی که ۳۰ سهم برابر ۲۴ متر است',
    ],
    annotatedCaption: 'فهرست فروشندگان: فقط بازفروش‌های دارندگان سنجیده می‌شوند.',
    pricingCaption: 'سوی فروشنده: «قیمت گذاری شما» با تعیین قیمت جابه‌جا می‌شود.',
  },
  decisions: {
    heading: 'طراحی بازار در سه انتخاب',
    lede: 'بازار مبادله بر سه تصمیم استوار است که فایل آن‌ها را آشکار می‌کند.',
    items: [
      {
        title: 'سنجیدن فقط بازفروش‌های دارندگان، و هرگز عرضه‌های خود پلتفرم',
        why: 'پلتفرمی که قیمت خودش را بسنجد علامتی نمی‌دهد؛ سنجیدن قیمت دیگر دارندگان علامت است. عرضه‌های مستقیم اصلاً نشانگری ندارند.',
        tradeoff: 'به قیمت‌گذاری خود پلتفرم باید فقط بر پایهٔ گزارش کارشناسی‌اش اعتماد کرد.',
      },
      {
        title: 'علامتی نرم، نه سقف قیمت',
        why: 'سقف قیمت به‌سادگی دور زده می‌شد. نشانگر برای فروشنده پیش از عرضه نقطهٔ مرجع می‌سازد و به خریدار هنگام خرید هشدار می‌دهد، بی‌آنکه قیمتی را ممنوع کند.',
        tradeoff: 'پیشنهادی با قیمت بیش از حد هنوز می‌تواند عرضه شود، و خریده شود.',
      },
      {
        title: 'طراحی تراکنش پیش از پوسته',
        why: 'فروش، بازدید و ارزش‌گذاری خود محصول‌اند؛ ورود، اسپلش و پروفایل صفحه‌هایی تکراری‌اند که هر محصولی دارد. ترتیب ساخت آن‌ها را آخر گذاشته است.',
        tradeoff: 'پوسته دیر به شکل نهایی‌اش رسید، پس از جریان‌هایی که قاب آن‌هاست.',
      },
    ],
  },
  critique: {
    label: 'نقد',
    heading: 'اسم یک متر مربع چیست؟',
    body: 'محصول هیچ‌وقت برای چیزی که می‌فروشد به یک نام ثابت نمی‌رسد، و این ناهماهنگی در سراسر جریان اصلی دیده می‌شود:',
    bullets: [
      'کارت‌های فهرست قیمت را برای هر متر می‌دهند، و صفحهٔ جزئیات به همان مقدار برچسب دومی می‌زند.',
      'ایوان معاملات و سبد دارایی سراغ سهم می‌روند.',
      'نام برند از واحد سومی به‌کلی متفاوت آمده است: دانگ.',
    ],
    finding:
      'دو برگه‌ای که پول در آن‌ها جابه‌جا می‌شود سه نسبت متفاوت اعلام می‌کنند: ۲۵ متر در هر سهم در برگهٔ خرید، که بعد ۲۵ متر را ۲ سهم جمع می‌زند؛ ۲ سهم که در برگهٔ فروش ۱۰۰ متر توصیف شده است؛ و ۳۰ سهم که در فهرست فروشندگان ۲۴ متر نشان داده شده است.',
    findingMethod: 'خوانده‌شده از خروجی‌های 2× برگهٔ خرید، برگهٔ فروش و فهرست فروشندگان',
    figureItems: ['خرید: ۲۵ متر در هر سهم — و ۲۵ متر می‌شود ۲ سهم.', 'فروش: ۲ سهم می‌شود ۱۰۰ متر.'],
    figureCaption: 'مساحت، سهم و مالکیت سنتی — سه مدل ذهنی برای یک دارایی، درون یک خرید.',
  },
  system: {
    label: 'سیستم',
    heading: 'سیستم طراحی در نسخهٔ 0.0.1',
    body: [
      '۴۳۰ کامپوننت در رنگ، تایپوگرافی، فیلدهای فرم، دکمه‌ها، مودال‌ها، توست‌ها، هدرها، تب‌بارها و آیکن‌ها، که در فایل با برچسب نسخهٔ 0.0.1 آمده‌اند — کار یک دست، یک مجموعه توکن رنگ و تایپ، و ۱۹۱ صفحه که بر پایهٔ آن‌ها کشیده شده‌اند.',
      'هر دو تم هر جا که هستند واقعی‌اند: کیف پول به‌جای رنگ‌کردن یک لایهٔ رویی، توکن‌های واقعی را عوض می‌کند، و فهرست املاک، ایوان معاملات و برگهٔ فروش همه نسخهٔ تیره دارند. فهرست سبد دارایی و جریان افزودن ملک فقط روشن ماندند.',
    ],
    colorCaption: 'صفحهٔ رنگ: طیف‌های برچسب‌دار، یک رنگ تأکیدی، نسخهٔ 0.0.1.',
    walletItems: ['روشن', 'تیره'],
    walletCaption: 'کیف پول در هر دو تم — جابه‌جایی توکن، نه لایهٔ رویی.',
    darkCaption: 'صفحه‌های بازار در تم تیره: فهرست املاک، ایوان معاملات و برگهٔ فروش.',
  },
  outcomes: {
    heading: 'کارنامهٔ طراحی، نه راه‌اندازی',
    intro:
      'در فایل هیچ نشانه‌ای نیست که نیم‌دانگ راه‌اندازی شده باشد، و عددی هم برای گزارش وجود ندارد. آنچه در آن هست طراحی کاملی برای هر دو بازار است.',
    items: [
      {
        label: 'فروش اولیه با گزارش کارشناسی، شمارش معکوس و رزرو بازدید',
        context:
          'آگهی‌هایی با قیمت هر متر، اسناد مالکیت برای هر ملک، و بازدیدهایی که روی تقویم شمسی رزرو می‌شوند.',
      },
      {
        label: 'بازار میان دارندگان با نشانگر انصاف در هر دو سو',
        context: 'ایوان معاملات، فهرست فروشندگان، و برگه‌های خرید و فروش.',
      },
      {
        label: 'سیستم طراحی فارسی با ۴۳۰ کامپوننت',
        context: '۱۹۱ صفحه بر پایهٔ یک کتابخانه، با دو تم هر جا که اهمیت داشت.',
      },
    ],
  },
  lessons: {
    heading: 'آنچه تغییر می‌دادم',
    items: [
      {
        title: 'پیش از طراحی بازار، واحد را نام‌گذاری کن',
        body: 'متر، سهم و دانگ سه مدل ذهنی برای یک دارایی‌اند، و محصول هر سه را درون یک خرید به کار می‌برد. هر چه پس از آن می‌آید — کارت‌ها، نشانگر، سبد دارایی — این ابهام را به ارث می‌برد. این یک تصمیم واژگانی بود، و دیر گرفتنش آن را پرهزینه کرد.',
      },
      {
        title: 'قوی‌ترین ایده سزاوار پررنگ‌ترین جایگاه است',
        body: 'نشانگر پایین/منصفانه/بالا در هر دو سوی بازفروش میان دارندگان دفاع‌پذیرترین چیز در فایل است، و فقط به شکل یک نوار کوچک درون یک برگهٔ پایینی آمده است. محصول باید با همین خودش را معرفی می‌کرد.',
      },
      {
        title: 'متن‌های موقت را پیش از آنکه به محصول تبدیل شوند پاک کن',
        body: 'متن‌های موقت انگلیسی هنوز جایی نشسته‌اند که مقدار نشانگر باید آنجا باشد. اگر به‌قدر کافی بمانند، متن موقت دیگر ناتمام به نظر نمی‌رسد و خود طراحی به نظر می‌رسد.',
      },
    ],
  },
}

const AR: NdCopy = {
  statement:
    'عقارات طهران تُباع بالمتر المربع ثم يُعاد بيعها بين المالكين، مع مؤشر منخفض/عادل/مرتفع يقيّم كل سعر يطلبه مالك، لا سعر المنصة نفسها أبدًا.',
  industry: 'العقارات · الملكية الجزئية',
  team: 'ملف مصمم واحد: مكتبة مكوّنات واحدة و191 شاشة',
  heroCaption:
    'السوق الأولية على الهاتف: عروض مسعّرة بالمتر، وعقار مع تقرير تقييمه ووثائق ملكيته، وقاعة التداول («ایوان معاملات») حيث يعيد المالكون البيع.',
  snapshot: {
    problem:
      'تحويل أصل غير قابل للتجزئة إلى أصل قابل للتجزئة، ثم إلى أصل سائل، من دون صانع سوق يحدد سعر إعادة البيع.',
    role: 'مصمم منتج واستراتيجي عبر نظام تصميم من 430 مكوّنًا و191 شاشة.',
    result:
      'سجل تصميم كامل — البيع الأولي، وحجز المعاينة، والمحفظة الاستثمارية، وسوق بين المالكين — من دون أي دليل موثّق على إطلاقه.',
  },
  alt: {
    cover:
      'نيم دانگ (Nim Dang) — قائمة البائعين في قاعة التداول، حيث تحمل عروض إعادة البيع بين المالكين وحدها مؤشر سعر منخفض أو عادل أو مرتفع',
    listMobile:
      'نيم دانگ على الهاتف — عروض في حي باسداران، كل بطاقة مسعّرة بالمتر المربع مع الأمتار المتبقية للبيع',
    detailMobile:
      'نيم دانگ على الهاتف — صفحة عقار مع سعره الأساسي للمتر، والحد الأدنى للاستثمار، وتقرير التقييم، ووثائق الملكية',
    hallList:
      'نيم دانگ على الهاتف — قاعة التداول، حيث يعرض المالكون الأمتار التي يريدون إعادة بيعها',
    visitDate:
      'نيم دانگ — نافذة طلب المعاينة، مع تقويم شمسي هجري يميّز الأيام المتاحة والمحجوزة والمختارة',
    visitTime: 'نيم دانگ — اختيار موعد لمعاينة العقار حضوريًا',
    visitVerify: 'نيم دانگ — تأكيد تسجيل طلب المعاينة',
    stockHalls:
      'نيم دانگ — البورصة الأولى، «قاعات الأسهم» («ایوان»، النسخة الأولى): بطاقة عرض واحدة وشروطها في قائمة نقطية',
    sellerFirst:
      'نيم دانگ — قائمة البائعين في قاعة التداول المُعاد بناؤها: عرض مباشر، ثم عروض المالكين مع مؤشر تسعير البائع',
    stepPricing:
      'نيم دانگ — خطوة التسعير في مسار إضافة العقار: أداة لرفع السعر وخفضه، وأسعار مقترحة، ومؤشر حيّ منخفض أو عادل أو مرتفع',
    selectAmount:
      'نيم دانگ — نافذة الشراء: قيمة الحصة، و25 مترًا لكل حصة، وشراء 25 مترًا مجموعه حصتان',
    sellProperty:
      'نيم دانگ — نافذة البيع: حيازة من حصتين (100 متر)، وأداة لضبط عدد الحصص، وسعر للحصة، ومؤشر التسعير',
    colorBoard: 'نظام تصميم نيم دانگ، الإصدار 0.0.1 — لوحة الألوان بتدرجاتها المعنونة',
    walletLight: 'نيم دانگ — المحفظة في الوضع الفاتح، رصيد فوق قائمة المعاملات',
    walletDark: 'نيم دانگ — المحفظة نفسها في الوضع الداكن',
    listDark: 'نيم دانگ — قائمة العقارات في الوضع الداكن',
    hallDark: 'نيم دانگ — قائمة قاعة التداول في الوضع الداكن',
    sellDark: 'نيم دانگ — نافذة البيع في الوضع الداكن',
  },
  context: {
    heading: 'نصف دانگ',
    body: [
      'يحمل نيم دانگ (Nim Dang) اسم الوحدة التي يحاول تفكيكها. الدانگ هو الوحدة الفارسية التقليدية لملكية العقار — فالعقار الواحد يتألف من ستة دانگ — و«نيم دانگ» نصف دانگ واحد. ويقول التذييل الباقي صراحةً: «نیم دانگ، فروش ملک متری»، أي بيع العقار بالمتر.',
      'في إيران، العقار هو المخزن الافتراضي للقيمة في مواجهة التضخم، وسعر شقة في طهران يفوق بكثير قدرة المدّخر العادي. وجواب المنتج هو الملكية الجزئية مع سوق ثانوية ملحقة بها: اشترِ مترين مربعين في مبنى لم تكن لتستطيع شراءه كاملًا، وراقب إعادة تقييمه، ثم بِع الأمتار لغيرك.',
    ],
  },
  problem: {
    heading: 'قابل للتجزئة، ثم سائل',
    body: [
      'أولًا، يجب أن تتحول الشقة إلى كمية يستطيع المرء أن يملك منها القليل — سعر للوحدة، وحد أدنى للدخول، وتقييم يستطيع أي شخص التحقق منه، وما يكفي من الأدلة القانونية والمادية ليدفع غريب ثمنها: تقرير تقييم، ووثائق ملكية، وحجز معاينة لمن لن يشتري مبنى من الصور.',
      'ثم يجب أن تصبح سائلة. فالملكية الجزئية بلا مخرج هي أصل غير سائل مقسّم إلى قطع أصغر، لذا يحتاج المالكون إلى سوق ثانية يبيع فيها بعضهم لبعض — أي اكتشاف السعر من دون صانع سوق، ومن دون أن تتحول السوق إلى مكان لرفع السعر على المشتري التالي.',
    ],
    figureItems: ['اختر يومًا في التقويم الشمسي الهجري.', 'اختر موعدًا.', 'تُسجَّل المعاينة.'],
    figureCaption: 'معاينة حضورية تُحجز داخل مسار الشراء، للمشترين الذين يحتاجون إلى رؤية المبنى.',
  },
  approach: {
    heading: 'الملف يسجّل ترتيب العمل بنفسه',
    body: [
      'تتزايد معرّفات العُقد (node IDs) في Figma مع إنشاء العقد، لذا فإن قراءة نطاق المعرّفات في كل قسم تكشف ترتيب رسمه. وليس التسلسل ما قد تدّعيه دراسة حالة مرتبة لاحقًا: صُمّمت المعاملة قبل الهيكل. جاء البيع والمعاينة أولًا، والتصفح والتقييم ثانيًا، أما تسجيل الدخول وشاشة البداية والقواعد والملف الشخصي — حيث تبدأ معظم المنتجات — فجاءت لاحقًا.',
      'جُرّبت البورصة مبكرًا باسم «قاعات الأسهم»، ثم تُركت، وأُعيد بناؤها في المرحلة الأخيرة باسم قاعة التداول، بحجم يقارب عشرة أضعاف.',
    ],
    processHeading: 'الأقسام بترتيب رسمها',
    steps: [
      { label: 'التعريف', note: 'أولى الإطارات في الملف' },
      { label: 'قاعات الأسهم', note: 'البورصة، المحاولة الأولى — شاشتان' },
      { label: 'البيع', note: 'مسار إضافة العقار وخطوة التسعير فيه' },
      { label: 'المعاينة', note: 'حجز معاينة حضورية — 14 شاشة' },
      { label: 'الشراء', note: 'قائمة العقارات وتفاصيلها، للهاتف وسطح المكتب' },
      { label: 'الهيكل', note: 'تسجيل الدخول، وشاشة البداية، والقواعد، والمحفظة، والملف الشخصي' },
      { label: 'المحفظة الاستثمارية', note: 'عقاراتي، رُسمت بالتوازي مع القاعة' },
      { label: 'قاعة التداول', note: 'البورصة بعد إعادة بنائها — 1,706 عقدة' },
    ],
    figureItems: [
      'قاعات الأسهم: بطاقة واحدة، والشروط في قائمة.',
      'قاعة التداول: العروض تُقارَن جنبًا إلى جنب.',
    ],
    figureCaption: 'البورصة نفسها مرسومة مرتين — تُركت مبكرًا، وأُعيد بناؤها أخيرًا.',
  },
  solution: {
    heading: 'مؤشر على طرفي الصفقة',
    body: [
      'في قائمة البائعين، يذكر كل عرض طريقة عرضه، وهناك نوعان: عرض مباشر من المنصة، وإعادة بيع من مالك آخر في قاعة التداول. تحمل عروض إعادة البيع بين المالكين، وهي وحدها، مؤشرًا من ثلاثة أجزاء بعنوان «قیمت گذاری فروشنده» (تسعير البائع) — منخفض، عادل، مرتفع — مع تحديد موقع العرض عليه. أما العروض المباشرة فلا تحمل أي مؤشر: المنصة لا تقيّم نفسها.',
      'ويظهر المؤشر نفسه على الطرف الآخر من الصفقة. تعرض خطوة التسعير أداة لرفع السعر وخفضه، وأسعارًا مقترحة، والشريط نفسه بعنوان جديد هو «قیمت گذاری شما» (تسعيرك)، يتحرك كلما حدد البائع رقمًا. إنه يمنح البائع نقطة مرجعية قبل أن يعرض، وينبّه المشتري لحظة الشراء، بإشارة ناعمة بدلًا من سقف صارم.',
    ],
    annotations: [
      '«عرضه نیم‌دانگ» — عرض المنصة نفسها لا يحمل أي مؤشر',
      '«ایوان معاملات» — إعادة بيع من مالك آخر',
      '«قیمت گذاری فروشنده» — سعر البائع، مصنّفًا منخفضًا أو عادلًا أو مرتفعًا',
      'سعر المتر وسعر الحصة يُقرآن بالقيمة نفسها، بينما 30 حصة تساوي 24 مترًا',
    ],
    annotatedCaption: 'قائمة البائعين: عروض إعادة البيع بين المالكين وحدها تخضع للتقييم.',
    pricingCaption: 'طرف البائع: «قیمت گذاری شما» يتحرك مع تحديد السعر.',
  },
  decisions: {
    heading: 'تصميم السوق في ثلاثة خيارات',
    lede: 'تقوم البورصة على ثلاثة قرارات يُظهرها الملف.',
    items: [
      {
        title: 'تقييم عروض إعادة البيع بين المالكين وحدها، لا عروض المنصة أبدًا',
        why: 'المنصة التي تقيّم سعرها بنفسها لا تقدّم إشارة؛ أما تقييم أسعار المالكين الآخرين فإشارة. العروض المباشرة لا تحمل أي مؤشر على الإطلاق.',
        tradeoff: 'يجب الوثوق بتسعير المنصة نفسها استنادًا إلى تقرير تقييمها وحده.',
      },
      {
        title: 'إشارة ناعمة، لا سقف للسعر',
        why: 'كان السقف سيُلتفّ عليه ببساطة. المؤشر يمنح البائع نقطة مرجعية قبل العرض وينبّه المشتري عند الشراء، من دون أن يمنع أي سعر.',
        tradeoff: 'لا يزال ممكنًا طرح عرض مبالغ في سعره، وشراؤه.',
      },
      {
        title: 'تصميم المعاملة قبل الهيكل',
        why: 'البيع والمعاينة والتقييم هي المنتج؛ أما تسجيل الدخول وشاشة البداية والملف الشخصي فشاشات نمطية. وترتيب البناء يضعها في النهاية.',
        tradeoff: 'بلغ الهيكل شكله النهائي متأخرًا، بعد المسارات التي يؤطّرها.',
      },
    ],
  },
  critique: {
    label: 'نقد',
    heading: 'ما اسم المتر المربع؟',
    body: 'لا يستقر المنتج أبدًا على اسم لما يبيعه، ويمتد هذا التضارب عبر المسار الأساسي كله:',
    bullets: [
      'تسعّره بطاقات القائمة بالمتر، وتعطي صفحة التفاصيل الكمية نفسها تسمية ثانية.',
      'تنتقل قاعة التداول والمحفظة الاستثمارية إلى الحصص.',
      'والعلامة التجارية تحمل اسم وحدة ثالثة تمامًا: الدانگ.',
    ],
    finding:
      'تذكر النافذتان اللتان تنتقل فيهما الأموال ثلاث نسب مختلفة: 25 مترًا لكل حصة في نافذة الشراء، التي تجمع بعد ذلك 25 مترًا على أنها حصتان؛ وحصتان توصفان بأنهما 100 متر في نافذة البيع؛ و30 حصة تظهر على أنها 24 مترًا في قائمة البائعين.',
    findingMethod: 'مقروءة من تصديرات 2× لنافذة الشراء ونافذة البيع وقائمة البائعين',
    figureItems: [
      'الشراء: 25 مترًا لكل حصة — و25 مترًا تساوي حصتين.',
      'البيع: حصتان تساويان 100 متر.',
    ],
    figureCaption:
      'المساحة، والحصة، والملكية التقليدية — ثلاثة نماذج ذهنية لأصل واحد، داخل عملية شراء واحدة.',
  },
  system: {
    label: 'النظام',
    heading: 'نظام تصميم عند الإصدار 0.0.1',
    body: [
      '430 مكوّنًا تشمل الألوان، والطباعة، وحقول النماذج، والأزرار، والنوافذ المنبثقة، والإشعارات، والترويسات، وأشرطة التبويب، والأيقونات، معنونة في الملف بالإصدار 0.0.1 — يد واحدة، ومجموعة واحدة من رموز الألوان والخطوط، و191 شاشة مرسومة وفقها.',
      'الوضعان حقيقيان حيثما وُجدا: تبدّل المحفظة رموزًا فعلية بدلًا من تلوين طبقة علوية، ولقائمة العقارات وقاعة التداول ونافذة البيع جميعها نسخ داكنة. أما قائمة المحفظة الاستثمارية ومسار إضافة العقار فبقيا بالوضع الفاتح فقط.',
    ],
    colorCaption: 'لوحة الألوان: تدرجات معنونة، ولون إبراز واحد، الإصدار 0.0.1.',
    walletItems: ['فاتح', 'داكن'],
    walletCaption: 'المحفظة في الوضعين — تبديل للرموز، لا طبقة علوية.',
    darkCaption: 'شاشات السوق في الوضع الداكن: قائمة العقارات، وقاعة التداول، ونافذة البيع.',
  },
  outcomes: {
    heading: 'سجل تصميم، لا إطلاق',
    intro:
      'لا دليل في الملف على أن نيم دانگ أُطلق، ولا أرقام لعرضها. ما يحويه هو تصميم كامل للسوقين كلتيهما.',
    items: [
      {
        label: 'بيع أولي مع تقييم، وعدّ تنازلي، وحجز معاينة',
        context:
          'عروض مسعّرة بالمتر، ووثائق ملكية لكل عقار، ومعاينات تُحجز على التقويم الشمسي الهجري.',
      },
      {
        label: 'بورصة بين المالكين مع مؤشر إنصاف على الطرفين',
        context: 'قاعة التداول، وقائمة البائعين، ونافذتا الشراء والبيع.',
      },
      {
        label: 'نظام تصميم فارسي من 430 مكوّنًا',
        context: '191 شاشة مرسومة وفق مكتبة واحدة، بوضعين حيث يهمّ ذلك.',
      },
    ],
  },
  lessons: {
    heading: 'ما كنت سأغيّره',
    items: [
      {
        title: 'سمِّ الوحدة قبل أن تصمّم السوق',
        body: 'المتر والحصة والدانگ ثلاثة نماذج ذهنية لأصل واحد، والمنتج يستخدمها كلها داخل عملية شراء واحدة. وكل ما يأتي بعدها — البطاقات، والمؤشر، والمحفظة الاستثمارية — يرث هذا الغموض. كان قرارًا يتعلق بالمفردات، واتخاذه متأخرًا جعله مكلفًا.',
      },
      {
        title: 'أقوى فكرة تستحق أبرز معالجة',
        body: 'مؤشر منخفض/عادل/مرتفع على طرفي إعادة البيع بين المالكين هو أمتن ما في الملف، ولا يظهر إلا شريطًا صغيرًا واحدًا داخل نافذة سفلية. كان يجب أن يكون ما يتصدّر به المنتج.',
      },
      {
        title: 'أزِل النصوص المؤقتة قبل أن تصبح هي المنتج',
        body: 'لا تزال نصوص مؤقتة بالإنجليزية تشغل المكان المخصص لقيمة المؤشر. وإذا بقي النص المؤقت طويلًا بما يكفي، يكفّ عن أن يُقرأ على أنه ناقص ويبدأ يُقرأ على أنه التصميم.',
      },
    ],
  },
}

const ES: NdCopy = {
  statement:
    'Inmuebles de Teherán vendidos por metro cuadrado y revendidos entre titulares; un indicador bajo/justo/alto califica cada reventa, nunca a la plataforma.',
  industry: 'Inmobiliario · propiedad fraccionada',
  team: 'El archivo de un solo diseñador: una única biblioteca de componentes y 191 pantallas',
  heroCaption:
    'El mercado primario en un móvil: anuncios con precio por metro, un inmueble con su tasación y sus títulos de propiedad, y la sala de negociación donde los titulares revenden.',
  snapshot: {
    problem:
      'Hacer divisible un activo indivisible, y después líquido, sin un creador de mercado que fije el precio de reventa.',
    role: 'Diseñador de producto y estratega de un sistema de diseño de 430 componentes y 191 pantallas.',
    result:
      'Un registro de diseño completo —venta primaria, reserva de visitas, cartera y un mercado entre titulares— sin pruebas de lanzamiento en el archivo.',
  },
  alt: {
    cover:
      'Nim Dang: la lista de vendedores de la sala de negociación, donde solo las reventas entre titulares llevan un indicador de precio bajo, justo o alto',
    listMobile:
      'Nim Dang en un móvil: anuncios en el barrio de Pasdaran, cada tarjeta con su precio por metro cuadrado y los metros que quedan por vender',
    detailMobile:
      'Nim Dang en un móvil: la página de un inmueble con su precio base por metro, la inversión mínima, el informe de tasación y los títulos de propiedad',
    hallList:
      'Nim Dang en un móvil: la sala de negociación, donde los titulares publican los metros que quieren revender',
    visitDate:
      'Nim Dang: el panel de solicitud de visita, un calendario solar hegírico (Shamsi) que marca los días libres, reservados y seleccionados',
    visitTime: 'Nim Dang: la elección de una hora para visitar el inmueble en persona',
    visitVerify: 'Nim Dang: la confirmación de que la solicitud de visita quedó registrada',
    stockHalls:
      'Nim Dang: el primer mercado, «salas de bolsa»: una sola tarjeta de anuncio con sus condiciones en una lista de viñetas',
    sellerFirst:
      'Nim Dang: la lista de vendedores de la sala de negociación rehecha: una oferta directa y, después, ofertas entre titulares con el indicador de precio del vendedor',
    stepPricing:
      'Nim Dang: el paso de precio del flujo para añadir un inmueble: un selector de precio, precios sugeridos y un indicador en vivo de bajo, justo o alto',
    selectAmount:
      'Nim Dang: el panel de compra: valor por participación, 25 metros por participación y una compra de 25 metros totalizada como 2 participaciones',
    sellProperty:
      'Nim Dang: el panel de venta: una tenencia de 2 participaciones (100 metros), un selector de participaciones, un precio por participación y el indicador de precio',
    colorBoard:
      'Sistema de diseño de Nim Dang, versión 0.0.1: el tablero de color con sus escalas etiquetadas',
    walletLight:
      'Nim Dang: el monedero en el tema claro, un saldo sobre una lista de transacciones',
    walletDark: 'Nim Dang: el mismo monedero en el tema oscuro',
    listDark: 'Nim Dang: la lista de inmuebles en el tema oscuro',
    hallDark: 'Nim Dang: la lista de la sala de negociación en el tema oscuro',
    sellDark: 'Nim Dang: el panel de venta en el tema oscuro',
  },
  context: {
    heading: 'Medio dang',
    body: [
      'Nim Dang toma su nombre de la unidad que intenta romper. El dang es la unidad persa tradicional de titularidad inmobiliaria —un inmueble se divide en seis dangs— y «nim dang» es la mitad de uno. El pie de página dice el resto en voz alta: «نیم دانگ، فروش ملک متری», vender inmuebles por metros.',
      'En Irán, el inmueble es el refugio de valor por defecto frente a la inflación, y un piso en Teherán tiene un precio muy por encima del alcance de un ahorrador corriente. La respuesta del producto es la propiedad fraccionada con un mercado secundario incorporado: comprar dos metros cuadrados de un edificio que nunca podrías comprar entero, ver cómo se revalúa y vender esos metros.',
    ],
  },
  problem: {
    heading: 'Divisible, y después líquido',
    body: [
      'Primero, un piso tiene que convertirse en una cantidad de la que alguien pueda poseer un poco: un precio por unidad, una inversión mínima, una valoración que cualquiera pueda comprobar y suficientes pruebas legales y físicas para que un desconocido pague por ella, es decir, un informe de tasación, los títulos de propiedad y una reserva de visita para quienes no comprarían un edificio por fotos.',
      'Después tiene que ser líquido. La propiedad fraccionada sin salida es un activo ilíquido en trozos más pequeños, así que los titulares necesitan un segundo mercado donde venderse entre sí, lo que significa descubrir un precio sin creador de mercado y sin dejar que el parqué se convierta en un lugar para cobrar de más al siguiente comprador.',
    ],
    figureItems: [
      'Elegir un día en el calendario solar hegírico (Shamsi).',
      'Elegir una hora.',
      'La visita queda registrada.',
    ],
    figureCaption:
      'Una visita física reservada dentro del flujo de compra, para compradores que necesitan ver el edificio.',
  },
  approach: {
    heading: 'El archivo registra su propio orden de trabajo',
    body: [
      'Los node IDs de Figma aumentan a medida que se crean los nodos, así que leer el rango de IDs de cada sección da el orden en que se dibujó. La secuencia no es la que un caso de estudio pulcro afirmaría a posteriori: la transacción se diseñó antes que el armazón. Primero vinieron la venta y las visitas, después la exploración y la valoración, y el inicio de sesión, la pantalla de bienvenida, las normas y el perfil —por donde empiezan la mayoría de los productos— llegaron más tarde.',
      'El mercado se intentó pronto como «salas de bolsa», se abandonó y se reconstruyó en la fase final como la sala de negociación, con aproximadamente diez veces su tamaño.',
    ],
    processHeading: 'Las secciones en el orden en que se dibujaron',
    steps: [
      { label: 'Onboarding', note: 'Los primeros frames del archivo' },
      { label: 'Salas de bolsa', note: 'El mercado, primer intento: 2 pantallas' },
      { label: 'Venta', note: 'El flujo para añadir un inmueble y su paso de precio' },
      { label: 'Visitas', note: 'Reservar una visita en persona: 14 pantallas' },
      { label: 'Compra', note: 'Lista y detalle de inmuebles, en móvil y escritorio' },
      { label: 'Armazón', note: 'Inicio de sesión, bienvenida, normas, monedero y perfil' },
      { label: 'Cartera', note: 'Mis inmuebles, dibujado junto a la sala' },
      { label: 'Sala de negociación', note: 'El mercado, reconstruido: 1706 nodos' },
    ],
    figureItems: [
      'Salas de bolsa: una tarjeta, condiciones en lista.',
      'La sala de negociación: ofertas comparadas una junto a otra.',
    ],
    figureCaption: 'El mismo mercado dibujado dos veces: abandonado pronto, reconstruido al final.',
  },
  solution: {
    heading: 'Un indicador a ambos lados de la operación',
    body: [
      'En la lista de vendedores, cada oferta indica cómo se ofrece, y hay dos tipos: una oferta directa de la plataforma y una reventa de otro titular en la sala de negociación. Las reventas entre titulares, y solo ellas, llevan un indicador de tres segmentos etiquetado «el precio del vendedor» —bajo, justo, alto— con la posición de la oferta marcada. Las ofertas directas no llevan ninguno: la plataforma no se califica a sí misma.',
      'El mismo indicador aparece al otro lado de la operación. El paso de precio muestra un selector de precio, precios sugeridos y la misma barra, reetiquetada como «tu precio», que se mueve a medida que el vendedor fija una cifra. Ancla al vendedor antes de publicar y advierte al comprador en el momento de la compra, con una señal suave en lugar de un límite estricto.',
    ],
    annotations: [
      '«عرضه نیم‌دانگ»: la oferta propia de la plataforma no lleva indicador',
      '«ایوان معاملات»: una reventa de otro titular',
      '«قیمت گذاری فروشنده»: el precio del vendedor, marcado como bajo, justo o alto',
      'El precio por metro y el precio por participación coinciden, mientras que 30 participaciones son 24 metros',
    ],
    annotatedCaption: 'La lista de vendedores: solo se califican las reventas entre titulares.',
    pricingCaption: 'El lado del vendedor: «tu precio» se mueve a medida que se fija el precio.',
  },
  decisions: {
    heading: 'Diseño de mercado en tres decisiones',
    lede: 'El mercado se apoya en tres decisiones que el archivo hace visibles.',
    items: [
      {
        title: 'Calificar solo las reventas entre titulares, nunca las ofertas de la plataforma',
        why: 'Que una plataforma califique su propio precio no es una señal; calificar los precios de otros titulares sí lo es. Las ofertas directas no llevan ningún indicador.',
        tradeoff: 'Hay que confiar en el precio de la plataforma solo por su tasación.',
      },
      {
        title: 'Una señal suave, no un límite de precio',
        why: 'Un límite simplemente se sortearía. Un indicador ancla al vendedor antes de publicar y advierte al comprador al comprar, sin prohibir ningún precio.',
        tradeoff: 'Una oferta con sobreprecio puede publicarse igualmente, y comprarse.',
      },
      {
        title: 'Diseñar la transacción antes que el armazón',
        why: 'La venta, las visitas y la valoración son el producto; el inicio de sesión, la bienvenida y el perfil son pantallas genéricas. El orden de construcción las deja para el final.',
        tradeoff: 'El armazón alcanzó su forma final tarde, después de los flujos que enmarca.',
      },
    ],
  },
  critique: {
    label: 'Crítica',
    heading: '¿Cómo se llama un metro cuadrado?',
    body: 'El producto nunca se decide por un nombre para lo que vende, y la incoherencia recorre el flujo principal:',
    bullets: [
      'Las tarjetas de la lista le ponen precio por metro, y la página de detalle da a la misma cantidad una segunda etiqueta.',
      'La sala de negociación y la cartera pasan a participaciones.',
      'La marca lleva el nombre de una tercera unidad completamente distinta: el dang.',
    ],
    finding:
      'Los dos paneles donde se mueve el dinero expresan tres proporciones distintas: 25 metros por participación en el panel de compra, que luego totaliza 25 metros como 2 participaciones; 2 participaciones descritas como 100 metros en el panel de venta; y 30 participaciones mostradas como 24 metros en la lista de vendedores.',
    findingMethod:
      'Leído en exportaciones a 2× del panel de compra, el panel de venta y la lista de vendedores',
    figureItems: [
      'Compra: 25 metros por participación, y 25 metros son 2 participaciones.',
      'Venta: 2 participaciones son 100 metros.',
    ],
    figureCaption:
      'Superficie, participación y titularidad tradicional: tres modelos mentales para un solo activo, dentro de una sola compra.',
  },
  system: {
    label: 'Sistema',
    heading: 'Un sistema de diseño en la 0.0.1',
    body: [
      '430 componentes de color, tipografía, campos de formulario, botones, modales, toasts, cabeceras, barras de pestañas e iconos, etiquetados en el archivo como versión 0.0.1: una sola mano, un único conjunto de tokens de color y tipografía, y 191 pantallas dibujadas sobre ellos.',
      'Ambos temas son reales allí donde existen: el monedero intercambia tokens de verdad en lugar de teñir una capa superpuesta, y la lista de inmuebles, la sala de negociación y el panel de venta tienen versiones oscuras. La lista de la cartera y el flujo para añadir un inmueble se quedaron solo en claro.',
    ],
    colorCaption: 'El tablero de color: escalas etiquetadas, un acento, versión 0.0.1.',
    walletItems: ['Claro', 'Oscuro'],
    walletCaption: 'El monedero en ambos temas: un intercambio de tokens, no una capa superpuesta.',
    darkCaption:
      'Las pantallas del mercado en el tema oscuro: la lista de inmuebles, la sala de negociación y el panel de venta.',
  },
  outcomes: {
    heading: 'Un registro de diseño, no un lanzamiento',
    intro:
      'No hay pruebas en el archivo de que Nim Dang se lanzara, ni cifras que reportar. Lo que contiene es un diseño completo para ambos mercados.',
    items: [
      {
        label: 'Una venta primaria con tasación, cuenta atrás y reserva de visitas',
        context:
          'Anuncios con precio por metro, títulos de propiedad en cada inmueble y visitas reservadas en un calendario solar hegírico (Shamsi).',
      },
      {
        label: 'Un mercado entre titulares con un indicador de precio justo a ambos lados',
        context: 'La sala de negociación, la lista de vendedores y los paneles de compra y venta.',
      },
      {
        label: 'Un sistema de diseño persa de 430 componentes',
        context: '191 pantallas dibujadas sobre una sola biblioteca, en dos temas donde importa.',
      },
    ],
  },
  lessons: {
    heading: 'Qué cambiaría',
    items: [
      {
        title: 'Nombrar la unidad antes de diseñar el mercado',
        body: 'Metro, participación y dang son tres modelos mentales para un solo activo, y el producto usa los tres dentro de una única compra. Todo lo que viene después —las tarjetas, el indicador, la cartera— hereda la ambigüedad. Era una decisión de vocabulario, y tomarla tarde la encareció.',
      },
      {
        title: 'La idea más fuerte merece el tratamiento más visible',
        body: 'El indicador bajo/justo/alto a ambos lados de una reventa entre titulares es lo más defendible del archivo, y aparece como una pequeña barra dentro de un panel inferior. Debería haber sido lo primero que mostrara el producto.',
      },
      {
        title: 'Quitar los textos provisionales antes de que se conviertan en el producto',
        body: 'Todavía hay textos provisionales en inglés donde debería ir el valor del indicador. Si se dejan el tiempo suficiente, un texto provisional deja de leerse como algo inacabado y empieza a leerse como el diseño.',
      },
    ],
  },
}

const DE: NdCopy = {
  statement:
    'Teheraner Immobilien, pro Quadratmeter verkauft, dann unter Eigentümern gehandelt; eine Skala niedrig/fair/hoch bewertet ihre Preise, nie den der Plattform.',
  industry: 'Immobilien · Bruchteilseigentum',
  team: 'Die Datei eines einzigen Designers: eine Komponentenbibliothek und 191 Screens',
  heroCaption:
    'Der Primärmarkt auf dem Smartphone: Angebote mit Preis pro Meter, eine Immobilie mit Gutachten und Eigentumsurkunden und der Handelssaal, in dem Eigentümer weiterverkaufen.',
  snapshot: {
    problem:
      'Einen unteilbaren Vermögenswert teilbar machen, dann liquide – ohne Market Maker, der den Wiederverkaufspreis festlegt.',
    role: 'Produktdesigner und Stratege für ein Designsystem mit 430 Komponenten und 191 Screens.',
    result:
      'Eine vollständige Designdokumentation – Erstverkauf, Besichtigungsbuchung, Portfolio und ein Handelsplatz unter Eigentümern – ohne Belege für einen Launch in der Datei.',
  },
  alt: {
    cover:
      'Nim Dang: die Verkäuferliste im Handelssaal, in der nur Weiterverkäufe von Eigentümern eine Preisskala niedrig, fair oder hoch tragen',
    listMobile:
      'Nim Dang auf dem Smartphone: Angebote im Viertel Pasdaran, jede Karte mit Preis pro Quadratmeter und den noch zu verkaufenden Metern',
    detailMobile:
      'Nim Dang auf dem Smartphone: eine Immobilienseite mit Grundpreis pro Meter, Mindestinvestition, Gutachten und Eigentumsurkunden',
    hallList:
      'Nim Dang auf dem Smartphone: der Handelssaal, in dem Eigentümer die Meter einstellen, die sie weiterverkaufen wollen',
    visitDate:
      'Nim Dang: das Sheet für Besichtigungsanfragen, ein Shamsi-Kalender mit freien, gebuchten und ausgewählten Tagen',
    visitTime: 'Nim Dang: die Wahl einer Uhrzeit für eine Besichtigung vor Ort',
    visitVerify: 'Nim Dang: die Bestätigung, dass die Besichtigungsanfrage registriert wurde',
    stockHalls:
      'Nim Dang: der erste Handelsplatz, „Börsensäle“: eine einzige Angebotskarte mit ihren Konditionen als Aufzählung',
    sellerFirst:
      'Nim Dang: die Verkäuferliste des neu gebauten Handelssaals – ein Direktangebot, danach Angebote von Eigentümern mit der Skala zur Preisgestaltung des Verkäufers',
    stepPricing:
      'Nim Dang: der Preisschritt im Ablauf zum Einstellen einer Immobilie – ein Preis-Stepper, Preisvorschläge und eine Live-Skala niedrig, fair oder hoch',
    selectAmount:
      'Nim Dang: das Kauf-Sheet – Wert pro Anteil, 25 Meter pro Anteil und ein Kauf von 25 Metern, summiert als 2 Anteile',
    sellProperty:
      'Nim Dang: das Verkaufs-Sheet – ein Bestand von 2 Anteilen (100 Meter), ein Anteils-Stepper, ein Preis pro Anteil und die Preisskala',
    colorBoard:
      'Nim Dang Designsystem, Version 0.0.1: das Farbboard mit beschrifteten Farbabstufungen',
    walletLight:
      'Nim Dang: die Wallet im hellen Theme, ein Kontostand über einer Liste von Transaktionen',
    walletDark: 'Nim Dang: dieselbe Wallet im dunklen Theme',
    listDark: 'Nim Dang: die Immobilienliste im dunklen Theme',
    hallDark: 'Nim Dang: die Liste des Handelssaals im dunklen Theme',
    sellDark: 'Nim Dang: das Verkaufs-Sheet im dunklen Theme',
  },
  context: {
    heading: 'Ein halber Dang',
    body: [
      'Nim Dang benennt sich nach der Einheit, die es aufbrechen will. Ein Dang ist die traditionelle persische Einheit für Immobilieneigentum – eine Immobilie wird in sechs Dang gehalten –, und „nim dang“ ist die Hälfte davon. Die Fußzeile spricht den Rest offen aus: «نیم دانگ، فروش ملک متری», Immobilien meterweise verkaufen.',
      'Im Iran sind Immobilien der übliche Wertspeicher gegen die Inflation, und eine Teheraner Wohnung kostet weit mehr, als ein gewöhnlicher Sparer aufbringen kann. Die Antwort des Produkts ist Bruchteilseigentum mit angeschlossenem Sekundärmarkt: zwei Quadratmeter eines Gebäudes kaufen, das man nie ganz kaufen könnte, zusehen, wie sie neu bewertet werden, und die Meter weiterverkaufen.',
    ],
  },
  problem: {
    heading: 'Teilbar, dann liquide',
    body: [
      'Zuerst muss eine Wohnung zu einer Menge werden, von der ein Mensch ein kleines Stück halten kann – ein Preis pro Einheit, ein Mindestbetrag, eine Bewertung, die jeder prüfen kann, und genug rechtliche und physische Belege, dass ein Fremder dafür bezahlt: ein Gutachten, Eigentumsurkunden und eine Besichtigungsbuchung für Menschen, die kein Gebäude nach Fotos kaufen.',
      'Dann muss sie liquide werden. Bruchteilseigentum ohne Ausstieg ist ein illiquider Vermögenswert in kleineren Stücken, also brauchen Eigentümer einen zweiten Markt, auf dem sie untereinander verkaufen – und das heißt, einen Preis ohne Market Maker zu finden, ohne dass das Parkett zu einem Ort wird, an dem man dem nächsten Käufer zu viel abverlangt.',
    ],
    figureItems: [
      'Einen Tag im Shamsi-Kalender wählen.',
      'Eine Uhrzeit wählen.',
      'Die Besichtigung ist registriert.',
    ],
    figureCaption:
      'Eine Besichtigung vor Ort, gebucht im Kaufablauf, für Käufer, die das Gebäude sehen müssen.',
  },
  approach: {
    heading: 'Die Datei dokumentiert ihre eigene Arbeitsreihenfolge',
    body: [
      'Die Node-IDs in Figma steigen mit jedem neu angelegten Node, also verrät der ID-Bereich jedes Abschnitts, in welcher Reihenfolge er gezeichnet wurde. Die Abfolge ist nicht die, die eine aufgeräumte Case Study im Nachhinein behaupten würde: Die Transaktion wurde vor der App-Shell entworfen. Verkaufen und Besichtigen kamen zuerst, Stöbern und Bewertung als Zweites, und Login, Splash, Regeln und Profil – wo die meisten Produkte anfangen – kamen später.',
      'Der Handelsplatz wurde früh als „Börsensäle“ versucht, verworfen und in der letzten Phase als Handelssaal neu gebaut, etwa zehnmal so groß.',
    ],
    processHeading: 'Abschnitte in der Reihenfolge, in der sie gezeichnet wurden',
    steps: [
      { label: 'Onboarding', note: 'Die ersten Frames der Datei' },
      { label: 'Börsensäle', note: 'Der Handelsplatz, erster Versuch – 2 Screens' },
      {
        label: 'Verkaufen',
        note: 'Der Ablauf zum Einstellen einer Immobilie und sein Preisschritt',
      },
      { label: 'Besichtigungen', note: 'Eine Besichtigung vor Ort buchen – 14 Screens' },
      { label: 'Kaufen', note: 'Immobilienliste und -detail, mobil und Desktop' },
      { label: 'App-Shell', note: 'Login, Splash, Regeln, Wallet und Profil' },
      { label: 'Portfolio', note: 'Meine Immobilien, parallel zum Handelssaal gezeichnet' },
      { label: 'Handelssaal', note: 'Der Handelsplatz, neu gebaut – 1.706 Nodes' },
    ],
    figureItems: [
      'Börsensäle: eine Karte, Konditionen als Liste.',
      'Der Handelssaal: Angebote nebeneinander verglichen.',
    ],
    figureCaption: 'Derselbe Handelsplatz zweimal gezeichnet – früh verworfen, zuletzt neu gebaut.',
  },
  solution: {
    heading: 'Eine Skala auf beiden Seiten des Handels',
    body: [
      'In der Verkäuferliste gibt jedes Angebot an, wie es angeboten wird, und es gibt zwei Arten: ein Direktangebot der Plattform und einen Weiterverkauf durch einen anderen Eigentümer im Handelssaal. Weiterverkäufe von Eigentümern, und nur sie, tragen eine dreiteilige Skala mit der Beschriftung „Preisgestaltung des Verkäufers“ – niedrig, fair, hoch –, auf der die Position des Angebots markiert ist. Direktangebote tragen keine: Die Plattform bewertet sich nicht selbst.',
      'Dieselbe Skala erscheint auf der anderen Seite des Handels. Der Preisschritt zeigt einen Preis-Stepper, Preisvorschläge und denselben Balken, umbenannt in „Ihre Preisgestaltung“, der sich bewegt, während der Verkäufer eine Zahl festlegt. Die Skala verankert den Verkäufer vor dem Einstellen und warnt den Käufer im Moment des Kaufs – mit einem weichen Signal statt einer harten Obergrenze.',
    ],
    annotations: [
      '«عرضه نیم‌دانگ» – das eigene Angebot der Plattform trägt keine Skala',
      '«ایوان معاملات» – ein Weiterverkauf durch einen anderen Eigentümer',
      '«قیمت گذاری فروشنده» – der Preis des Verkäufers, markiert als niedrig, fair oder hoch',
      'Preis pro Meter und Preis pro Anteil sind gleich, während 30 Anteile 24 Meter sind',
    ],
    annotatedCaption: 'Die Verkäuferliste: Nur Weiterverkäufe von Eigentümern werden bewertet.',
    pricingCaption:
      'Die Seite des Verkäufers: „Ihre Preisgestaltung“ bewegt sich, während der Preis festgelegt wird.',
  },
  decisions: {
    heading: 'Marktdesign in drei Entscheidungen',
    lede: 'Der Handelsplatz beruht auf drei Entscheidungen, die die Datei sichtbar macht.',
    items: [
      {
        title: 'Nur Weiterverkäufe von Eigentümern bewerten, nie die Angebote der Plattform',
        why: 'Wenn eine Plattform ihren eigenen Preis bewertet, ist das kein Signal; die Preise anderer Eigentümer zu bewerten schon. Direktangebote tragen überhaupt keine Skala.',
        tradeoff:
          'Der Preisgestaltung der Plattform muss man allein aufgrund ihres Gutachtens vertrauen.',
      },
      {
        title: 'Ein weiches Signal, keine Preisobergrenze',
        why: 'Eine Obergrenze würde einfach umgangen. Eine Skala verankert den Verkäufer vor dem Einstellen und warnt den Käufer beim Kauf, ohne einen Preis zu verbieten.',
        tradeoff: 'Ein überteuertes Angebot kann trotzdem eingestellt werden – und gekauft.',
      },
      {
        title: 'Die Transaktion vor der App-Shell entwerfen',
        why: 'Verkaufen, Besichtigen und Bewerten sind das Produkt; Login, Splash und Profil sind Standard-Screens. Die Baureihenfolge setzt sie ans Ende.',
        tradeoff:
          'Die App-Shell erreichte ihre endgültige Form spät, nach den Abläufen, die sie einrahmt.',
      },
    ],
  },
  critique: {
    label: 'Kritik',
    heading: 'Wie heißt ein Quadratmeter?',
    body: 'Das Produkt legt sich nie auf einen Namen für das fest, was es verkauft, und die Inkonsistenz zieht sich durch den Kernablauf:',
    bullets: [
      'Die Listenkarten nennen einen Preis pro Meter, und die Detailseite gibt derselben Menge eine zweite Bezeichnung.',
      'Handelssaal und Portfolio wechseln zu Anteilen.',
      'Die Marke ist nach einer ganz anderen, dritten Einheit benannt: dem Dang.',
    ],
    finding:
      'Die beiden Sheets, in denen Geld bewegt wird, nennen drei verschiedene Verhältnisse: 25 Meter pro Anteil im Kauf-Sheet, das dann 25 Meter als 2 Anteile summiert; 2 Anteile, beschrieben als 100 Meter, im Verkaufs-Sheet; und 30 Anteile, angezeigt als 24 Meter, in der Verkäuferliste.',
    findingMethod:
      'Abgelesen aus 2×-Exporten des Kauf-Sheets, des Verkaufs-Sheets und der Verkäuferliste',
    figureItems: [
      'Kauf: 25 Meter pro Anteil – und 25 Meter sind 2 Anteile.',
      'Verkauf: 2 Anteile sind 100 Meter.',
    ],
    figureCaption:
      'Fläche, Anteil und traditioneller Eigentumstitel – drei mentale Modelle für einen Vermögenswert, innerhalb eines Kaufs.',
  },
  system: {
    label: 'System',
    heading: 'Ein Designsystem in Version 0.0.1',
    body: [
      '430 Komponenten für Farbe, Typografie, Formularfelder, Buttons, Modals, Toasts, Header, Tab-Bars und Icons, in der Datei als Version 0.0.1 beschriftet – eine Hand, ein Satz Farb- und Typografie-Tokens und 191 Screens, die darauf aufbauen.',
      'Beide Themes sind echt, wo es sie gibt: Die Wallet tauscht echte Tokens aus, statt ein Overlay einzufärben, und Immobilienliste, Handelssaal und Verkaufs-Sheet haben alle dunkle Versionen. Die Portfolioliste und der Ablauf zum Einstellen einer Immobilie blieben nur hell.',
    ],
    colorCaption: 'Das Farbboard: beschriftete Farbabstufungen, ein Akzent, Version 0.0.1.',
    walletItems: ['Hell', 'Dunkel'],
    walletCaption: 'Die Wallet in beiden Themes – ein Token-Tausch, kein Overlay.',
    darkCaption:
      'Die Marktscreens im dunklen Theme: Immobilienliste, Handelssaal und Verkaufs-Sheet.',
  },
  outcomes: {
    heading: 'Eine Designdokumentation, kein Launch',
    intro:
      'In der Datei gibt es keinen Beleg dafür, dass Nim Dang veröffentlicht wurde, und keine Zahlen zu berichten. Sie enthält ein vollständiges Design für beide Märkte.',
    items: [
      {
        label: 'Ein Erstverkauf mit Gutachten, Countdown und Besichtigungsbuchung',
        context:
          'Angebote mit Preis pro Meter, Eigentumsurkunden zu jeder Immobilie, Besichtigungen im Shamsi-Kalender gebucht.',
      },
      {
        label: 'Ein Handelsplatz unter Eigentümern mit einer zweiseitigen Fairness-Skala',
        context: 'Der Handelssaal, die Verkäuferliste sowie Kauf- und Verkaufs-Sheet.',
      },
      {
        label: 'Ein persisches Designsystem mit 430 Komponenten',
        context: '191 Screens auf Basis einer Bibliothek, in zwei Themes, wo es darauf ankommt.',
      },
    ],
  },
  lessons: {
    heading: 'Was ich ändern würde',
    items: [
      {
        title: 'Die Einheit benennen, bevor man den Markt entwirft',
        body: 'Meter, Anteil und Dang sind drei mentale Modelle für einen Vermögenswert, und das Produkt nutzt alle drei innerhalb eines einzigen Kaufs. Alles, was darauf aufbaut – die Karten, die Skala, das Portfolio –, erbt die Mehrdeutigkeit. Es war eine Entscheidung über das Vokabular, und sie spät zu treffen, machte sie teuer.',
      },
      {
        title: 'Die stärkste Idee verdient den lautesten Auftritt',
        body: 'Die Skala niedrig/fair/hoch auf beiden Seiten eines Weiterverkaufs unter Eigentümern ist das Belastbarste in der Datei, und sie erscheint als ein kleiner Balken in einem Bottom Sheet. Sie hätte das Erste sein sollen, was das Produkt zeigt.',
      },
      {
        title: 'Platzhalter entfernen, bevor sie zum Produkt werden',
        body: 'Englische Platzhaltertexte stehen noch dort, wo der Wert der Skala hingehört. Bleibt ein Platzhalter lange genug stehen, liest er sich nicht mehr als unfertig, sondern als das Design.',
      },
    ],
  },
}

const FR: NdCopy = {
  statement:
    'L’immobilier de Téhéran vendu au mètre carré puis revendu entre pairs ; une jauge bas/juste/élevé note chaque prix demandé, sauf ceux de la plateforme.',
  industry: 'Immobilier · propriété fractionnée',
  team: 'Le fichier d’un seul designer : une bibliothèque de composants et 191 écrans',
  heroCaption:
    'Le marché primaire sur mobile : des annonces au prix du mètre, un bien avec son rapport d’expertise et ses titres de propriété, et la salle des transactions où les détenteurs revendent.',
  snapshot: {
    problem:
      'Rendre divisible un actif indivisible, puis liquide, sans teneur de marché pour fixer le prix de revente.',
    role: 'Designer produit et stratège, sur un design system de 430 composants et 191 écrans.',
    result:
      'Un dossier de design complet — vente primaire, réservation de visites, portefeuille et bourse entre pairs — sans aucune trace de lancement au dossier.',
  },
  alt: {
    cover:
      'Nim Dang — la liste des vendeurs de la salle des transactions, où seules les reventes entre pairs portent une jauge de prix bas, juste ou élevé',
    listMobile:
      'Nim Dang sur mobile — des annonces dans le quartier de Pasdaran, chaque carte affichant le prix au mètre carré et les mètres restant à vendre',
    detailMobile:
      'Nim Dang sur mobile — la page d’un bien avec son prix de base au mètre, l’investissement minimum, le rapport d’expertise et les titres de propriété',
    hallList:
      'Nim Dang sur mobile — la salle des transactions, où les détenteurs mettent en vente les mètres qu’ils veulent revendre',
    visitDate:
      'Nim Dang — le panneau de demande de visite, un calendrier solaire hégirien qui distingue les jours libres, réservés et sélectionnés',
    visitTime: 'Nim Dang — le choix d’un horaire pour visiter un bien sur place',
    visitVerify: 'Nim Dang — la confirmation que la demande de visite a bien été enregistrée',
    stockHalls:
      'Nim Dang — la première bourse, les « salles d’actions » : une seule carte d’annonce, avec ses conditions en liste à puces',
    sellerFirst:
      'Nim Dang — la liste des vendeurs de la salle des transactions reconstruite : une offre directe, puis des offres entre pairs avec la jauge de prix du vendeur',
    stepPricing:
      'Nim Dang — l’étape de tarification du parcours d’ajout de bien : un sélecteur de prix, des prix suggérés et une jauge bas, juste ou élevé en temps réel',
    selectAmount:
      'Nim Dang — le panneau d’achat : la valeur par part, 25 mètres par part, et un achat de 25 mètres totalisé en 2 parts',
    sellProperty:
      'Nim Dang — le panneau de vente : une détention de 2 parts (100 mètres), un sélecteur de parts, un prix par part et la jauge de prix',
    colorBoard:
      'Design system Nim Dang, version 0.0.1 — la planche des couleurs et ses gammes annotées',
    walletLight:
      'Nim Dang — le porte-monnaie en thème clair, un solde au-dessus d’une liste de transactions',
    walletDark: 'Nim Dang — le même porte-monnaie en thème sombre',
    listDark: 'Nim Dang — la liste des biens en thème sombre',
    hallDark: 'Nim Dang — la liste de la salle des transactions en thème sombre',
    sellDark: 'Nim Dang — le panneau de vente en thème sombre',
  },
  context: {
    heading: 'Un demi-dang',
    body: [
      'Nim Dang tire son nom de l’unité qu’il cherche à fractionner. Le dang est l’unité persane traditionnelle du titre de propriété — un bien se détient en six dangs — et « nim dang » en désigne la moitié. Le pied de page dit le reste en toutes lettres : «نیم دانگ، فروش ملک متری», vendre de l’immobilier au mètre.',
      'En Iran, l’immobilier est la réserve de valeur par défaut face à l’inflation, et un appartement à Téhéran coûte bien au-delà des moyens d’un épargnant ordinaire. La réponse du produit : la propriété fractionnée, adossée à un marché secondaire. Acheter deux mètres carrés d’un immeuble qu’on ne pourrait jamais acheter entier, le voir se réévaluer, revendre les mètres.',
    ],
  },
  problem: {
    heading: 'Divisible, puis liquide',
    body: [
      'D’abord, un appartement doit devenir une quantité dont on peut détenir un peu — un prix unitaire, un ticket minimum, une valorisation que chacun peut vérifier, et assez de preuves juridiques et matérielles pour qu’un inconnu accepte de payer : un rapport d’expertise, des titres de propriété, et une réservation de visite pour ceux qui n’achèteront pas un immeuble sur photos.',
      'Ensuite, il doit devenir liquide. Une propriété fractionnée sans porte de sortie n’est qu’un actif illiquide en plus petits morceaux ; les détenteurs ont donc besoin d’un second marché où se vendre entre eux — ce qui suppose de découvrir un prix sans teneur de marché, sans laisser le parquet devenir un lieu où l’on surfacture l’acheteur suivant.',
    ],
    figureItems: [
      'Choisir un jour dans le calendrier solaire hégirien.',
      'Choisir un horaire.',
      'La visite est enregistrée.',
    ],
    figureCaption:
      'Une visite physique réservée au sein du parcours d’achat, pour les acheteurs qui ont besoin de voir l’immeuble.',
  },
  approach: {
    heading: 'Le fichier garde la trace de son propre ordre de travail',
    body: [
      'Dans Figma, les node ID augmentent à mesure que les nœuds sont créés : lire la plage d’ID de chaque section donne l’ordre dans lequel elle a été dessinée. Cette séquence n’est pas celle qu’une étude de cas bien rangée revendiquerait après coup : la transaction a été conçue avant l’enveloppe. La vente et les visites d’abord, la navigation et la valorisation ensuite ; la connexion, l’écran de démarrage, les règles et le profil — par où commencent la plupart des produits — sont venus plus tard.',
      'La bourse a été tentée tôt sous le nom de « salles d’actions », abandonnée, puis reconstruite dans la phase finale sous la forme de la salle des transactions, environ dix fois plus grande.',
    ],
    processHeading: 'Les sections dans l’ordre où elles ont été dessinées',
    steps: [
      { label: 'Onboarding', note: 'Les premières frames du fichier' },
      { label: 'Salles d’actions', note: 'La bourse, premier essai — 2 écrans' },
      { label: 'Vente', note: 'Le parcours d’ajout de bien et son étape de tarification' },
      { label: 'Visites', note: 'Réserver une visite sur place — 14 écrans' },
      { label: 'Achat', note: 'Liste et page des biens, mobile et desktop' },
      { label: 'Enveloppe', note: 'Connexion, démarrage, règles, porte-monnaie et profil' },
      { label: 'Portefeuille', note: 'Mes biens, dessinés en parallèle de la salle' },
      { label: 'Salle des transactions', note: 'La bourse, reconstruite — 1 706 nœuds' },
    ],
    figureItems: [
      'Salles d’actions : une carte, les conditions en liste.',
      'La salle des transactions : les offres comparées côte à côte.',
    ],
    figureCaption: 'La même bourse dessinée deux fois — abandonnée tôt, reconstruite en dernier.',
  },
  solution: {
    heading: 'Une jauge des deux côtés de la transaction',
    body: [
      'Dans la liste des vendeurs, chaque offre indique sa nature, et il en existe deux : une offre directe de la plateforme, et une revente par un autre détenteur dans la salle des transactions. Les reventes entre pairs, et elles seules, portent une jauge en trois segments intitulée « la tarification du vendeur » — bas, juste, élevé — où la position de l’offre est marquée. Les offres directes n’en portent aucune : la plateforme ne se note pas elle-même.',
      'La même jauge apparaît de l’autre côté de la transaction. L’étape de tarification affiche un sélecteur de prix, des prix suggérés et la même barre, renommée « votre tarification », qui bouge à mesure que le vendeur fixe un montant. Elle ancre le vendeur avant la mise en vente et avertit l’acheteur au moment de l’achat, par un signal doux plutôt qu’un plafond strict.',
    ],
    annotations: [
      '«عرضه نیم‌دانگ» — l’offre de la plateforme elle-même ne porte aucune jauge',
      '«ایوان معاملات» — une revente par un autre détenteur',
      '«قیمت گذاری فروشنده» — le prix du vendeur, marqué bas, juste ou élevé',
      'Le prix au mètre et le prix par part affichent le même montant, alors que 30 parts font 24 mètres',
    ],
    annotatedCaption: 'La liste des vendeurs : seules les reventes entre pairs sont notées.',
    pricingCaption: 'Côté vendeur : « votre tarification » bouge à mesure que le prix est fixé.',
  },
  decisions: {
    heading: 'Le design de marché en trois choix',
    lede: 'La bourse repose sur trois décisions que le fichier rend visibles.',
    items: [
      {
        title: 'Noter uniquement les reventes entre pairs, jamais les offres de la plateforme',
        why: 'Une plateforme qui note son propre prix n’envoie aucun signal ; noter les prix des autres détenteurs, si. Les offres directes ne portent aucune jauge.',
        tradeoff: 'Le prix de la plateforme doit être cru sur la seule foi de son expertise.',
      },
      {
        title: 'Un signal doux, pas un plafond de prix',
        why: 'Un plafond serait tout simplement contourné. Une jauge ancre le vendeur avant la mise en vente et avertit l’acheteur à l’achat, sans interdire aucun prix.',
        tradeoff: 'Une offre trop chère peut toujours être mise en vente, et achetée.',
      },
      {
        title: 'Concevoir la transaction avant l’enveloppe',
        why: 'La vente, les visites et la valorisation sont le produit ; la connexion, l’écran de démarrage et le profil sont des écrans génériques. L’ordre de construction les place en dernier.',
        tradeoff: 'L’enveloppe a trouvé sa forme finale tard, après les parcours qu’elle encadre.',
      },
    ],
  },
  critique: {
    label: 'Critique',
    heading: 'Comment s’appelle un mètre carré ?',
    body: 'Le produit ne tranche jamais sur le nom de ce qu’il vend, et l’incohérence traverse tout le parcours principal :',
    bullets: [
      'Les cartes de la liste affichent un prix au mètre, et la page du bien donne à la même quantité un second libellé.',
      'La salle des transactions et le portefeuille passent aux parts.',
      'La marque porte le nom d’une troisième unité, tout autre : le dang.',
    ],
    finding:
      'Les deux panneaux où l’argent circule affichent trois ratios différents : 25 mètres par part sur le panneau d’achat, qui totalise ensuite 25 mètres en 2 parts ; 2 parts décrites comme 100 mètres sur le panneau de vente ; et 30 parts affichées comme 24 mètres dans la liste des vendeurs.',
    findingMethod:
      'Relevé sur des exports 2× du panneau d’achat, du panneau de vente et de la liste des vendeurs',
    figureItems: [
      'Achat : 25 mètres par part — et 25 mètres font 2 parts.',
      'Vente : 2 parts font 100 mètres.',
    ],
    figureCaption:
      'Surface, capital et titre traditionnel — trois modèles mentaux pour un seul actif, au sein d’un seul achat.',
  },
  system: {
    label: 'Système',
    heading: 'Un design system en 0.0.1',
    body: [
      '430 composants couvrant couleur, typographie, champs de formulaire, boutons, modales, toasts, en-têtes, barres d’onglets et icônes, étiquetés dans le fichier comme version 0.0.1 — une seule main, un seul jeu de tokens de couleur et de typographie, et 191 écrans dessinés sur cette base.',
      'Les deux thèmes sont réels là où ils existent : le porte-monnaie permute de vrais tokens au lieu de teinter un calque, et la liste des biens, la salle des transactions et le panneau de vente ont tous une version sombre. La liste du portefeuille et le parcours d’ajout de bien sont restés en thème clair uniquement.',
    ],
    colorCaption: 'La planche des couleurs : des gammes annotées, un seul accent, version 0.0.1.',
    walletItems: ['Clair', 'Sombre'],
    walletCaption:
      'Le porte-monnaie dans les deux thèmes — une permutation de tokens, pas un calque.',
    darkCaption:
      'Les écrans du marché en thème sombre : la liste des biens, la salle des transactions et le panneau de vente.',
  },
  outcomes: {
    heading: 'Un dossier de design, pas un lancement',
    intro:
      'Rien dans le fichier n’indique que Nim Dang a été lancé, et il n’y a aucun chiffre à présenter. Ce qu’il contient, c’est un design complet pour les deux marchés.',
    items: [
      {
        label: 'Une vente primaire avec expertise, compte à rebours et réservation de visite',
        context:
          'Des annonces au prix du mètre, des titres de propriété sur chaque bien, des visites réservées dans un calendrier solaire hégirien.',
      },
      {
        label: 'Une bourse entre pairs avec une jauge d’équité des deux côtés',
        context:
          'La salle des transactions, la liste des vendeurs, et les panneaux d’achat et de vente.',
      },
      {
        label: 'Un design system persan de 430 composants',
        context:
          '191 écrans dessinés sur une seule bibliothèque, en deux thèmes là où cela compte.',
      },
    ],
  },
  lessons: {
    heading: 'Ce que je changerais',
    items: [
      {
        title: 'Nommer l’unité avant de concevoir le marché',
        body: 'Mètre, part et dang sont trois modèles mentaux pour un seul actif, et le produit utilise les trois au sein d’un seul achat. Tout ce qui en découle — les cartes, la jauge, le portefeuille — hérite de l’ambiguïté. C’était une décision de vocabulaire, et la prendre tard l’a rendue coûteuse.',
      },
      {
        title: 'L’idée la plus forte mérite le traitement le plus visible',
        body: 'La jauge bas/juste/élevé des deux côtés d’une revente entre pairs est ce que le fichier a de plus défendable, et elle n’apparaît que sous la forme d’une petite barre dans un panneau en bas d’écran. C’est avec elle que le produit aurait dû s’ouvrir.',
      },
      {
        title: 'Retirer les textes provisoires avant qu’ils ne deviennent le produit',
        body: 'Des textes provisoires en anglais occupent encore la place de la valeur de la jauge. Laissé assez longtemps, un texte provisoire cesse de se lire comme inachevé et commence à se lire comme le design.',
      },
    ],
  },
}

const JA: NdCopy = {
  statement:
    'テヘランの不動産を平米単位で販売し、保有者同士で転売する。保有者間の売値はすべて安い・適正・高いのゲージで評価されるが、プラットフォーム自身の価格は評価されない。',
  industry: '不動産・小口所有',
  team: 'デザイナー1人のファイル：単一のコンポーネントライブラリと191画面',
  heroCaption:
    'スマートフォン上の一次市場。平米単価で表示される物件一覧、鑑定書と権利証書を備えた物件ページ、そして保有者が転売する取引ホール。',
  snapshot: {
    problem:
      '分割できない資産を分割可能にし、さらに流動化する。しかも転売価格を決めるマーケットメイカーはいない。',
    role: '430コンポーネントのデザインシステムと191画面にわたるプロダクトデザイナー兼ストラテジスト。',
    result:
      '一次販売、内見予約、ポートフォリオ、保有者間取引までを網羅した完全なデザイン記録。ただしローンチを示す記録はない。',
  },
  alt: {
    cover:
      'Nim Dang — 取引ホールの売り手一覧。保有者同士の転売にだけ、安い・適正・高いの価格ゲージが付く',
    listMobile:
      'スマートフォン上のNim Dang — パースダーラーン地区の物件一覧。各カードに平米単価と残りの販売平米数が表示されている',
    detailMobile:
      'スマートフォン上のNim Dang — 平米あたりの基準価格、最低投資額、鑑定書、権利証書を載せた物件ページ',
    hallList: 'スマートフォン上のNim Dang — 保有者が転売したい平米数を出品する取引ホール',
    visitDate:
      'Nim Dang — 内見申し込みシート。イラン暦のカレンダーで空き日、予約済みの日、選択中の日を示す',
    visitTime: 'Nim Dang — 物件の現地内見の時間を選ぶ画面',
    visitVerify: 'Nim Dang — 内見の申し込みが登録されたことを伝える確認画面',
    stockHalls: 'Nim Dang — 最初の取引所「株式ホール」。出品カードは1枚だけで、条件は箇条書き',
    sellerFirst:
      'Nim Dang — 作り直した取引ホールの売り手一覧。直接販売の後に、売り手価格ゲージ付きの保有者間の出品が並ぶ',
    stepPricing:
      'Nim Dang — 物件登録フローの価格設定ステップ。価格ステッパー、推奨価格、リアルタイムで動く安い・適正・高いのゲージ',
    selectAmount:
      'Nim Dang — 購入シート。1口あたりの価値、1口あたり25平米、そして25平米の購入が合計2口と表示される',
    sellProperty:
      'Nim Dang — 売却シート。2口（100平米）の保有、口数ステッパー、1口あたりの価格、価格ゲージ',
    colorBoard:
      'Nim Dang デザインシステム バージョン0.0.1 — ラベル付きのカラーランプを並べたカラーボード',
    walletLight: 'Nim Dang — ライトテーマのウォレット。残高の下に取引一覧が並ぶ',
    walletDark: 'Nim Dang — 同じウォレットのダークテーマ',
    listDark: 'Nim Dang — ダークテーマの物件一覧',
    hallDark: 'Nim Dang — ダークテーマの取引ホール一覧',
    sellDark: 'Nim Dang — ダークテーマの売却シート',
  },
  context: {
    heading: '半ダング',
    body: [
      'ニムダング（Nim Dang）という名前は、このプロダクトが分割しようとしている単位そのものから来ている。ダングはペルシャの伝統的な不動産所有権の単位で、1つの物件は6ダングで保有される。「ニムダング」はその半分だ。フッターが残りをはっきり言っている。«نیم دانگ، فروش ملک متری»、つまり不動産の平米売りだ。',
      'イランでは不動産がインフレに対する定番の価値保存手段であり、テヘランのマンションは普通の貯蓄者の手が届く価格をはるかに超えている。プロダクトの答えは、二次市場を備えた小口所有だ。丸ごとは決して買えない建物の2平米を買い、価値の見直しを見届け、その平米を売る。',
    ],
  },
  problem: {
    heading: '分割可能に、そして流動的に',
    body: [
      'まず、マンションを「少しだけ持てる量」に変える必要がある。単価、最低購入額、誰でも確認できる評価額、そして見知らぬ人がお金を払うに足る法的・物理的な裏付けだ。鑑定書、権利証書、そして写真だけでは建物を買わない人のための内見予約である。',
      '次に、流動性が必要になる。出口のない小口所有は、流動性のない資産を小さく切り分けただけだ。だから保有者には互いに売買できる二次市場が要る。つまりマーケットメイカーなしで価格を見つけ、しかも取引の場を次の買い手に高値をふっかける場所にしないことだ。',
    ],
    figureItems: ['イラン暦のカレンダーで日を選ぶ。', '時間を選ぶ。', '内見が登録される。'],
    figureCaption: '建物を実際に見たい買い手のために、購入フローの中で現地内見を予約する。',
  },
  approach: {
    heading: 'ファイルは自らの作業順序を記録している',
    body: [
      'FigmaのノードIDはノードが作られるたびに増えていく。各セクションのID範囲を読めば、描かれた順番がわかる。その順序は、整った事例紹介が後から語りそうなものではない。取引は外枠より先に設計された。売却と内見が最初、閲覧と評価が次で、多くのプロダクトが出発点にするログイン、スプラッシュ、規約、プロフィールは後から来た。',
      '取引所は早い段階で「株式ホール」として試みられ、一度放棄され、最終フェーズで約10倍の規模の取引ホールとして作り直された。',
    ],
    processHeading: '描かれた順に並べたセクション',
    steps: [
      { label: 'オンボーディング', note: 'ファイル内で最初のフレーム' },
      { label: '株式ホール', note: '取引所の最初の試み — 2画面' },
      { label: '売却', note: '物件登録フローとその価格設定ステップ' },
      { label: '内見', note: '現地内見の予約 — 14画面' },
      { label: '購入', note: '物件一覧と物件ページ、モバイルとデスクトップ' },
      { label: '外枠', note: 'ログイン、スプラッシュ、規約、ウォレット、プロフィール' },
      { label: 'ポートフォリオ', note: '保有物件。取引ホールと並行して描かれた' },
      { label: '取引ホール', note: '作り直された取引所 — 1,706ノード' },
    ],
    figureItems: [
      '株式ホール：カード1枚、条件は箇条書き。',
      '取引ホール：オファーを横並びで比較。',
    ],
    figureCaption: '同じ取引所を2度描いた。早くに放棄し、最後に作り直した。',
  },
  solution: {
    heading: '取引の両側にゲージを',
    body: [
      '売り手一覧では、すべてのオファーが自らの出品形態を示す。形態は2種類で、プラットフォームによる直接販売と、取引ホールでの他の保有者による転売だ。保有者同士の転売、そしてそれだけに、「売り手の価格設定」と題した3段階のゲージ（安い・適正・高い）が付き、オファーの位置が示される。直接販売には何も付かない。プラットフォームは自らを評価しない。',
      '同じゲージが取引の反対側にも現れる。価格設定ステップには価格ステッパー、推奨価格、そして「あなたの価格設定」と名前を変えた同じバーがあり、売り手が金額を決めるにつれて動く。出品前の売り手には目安を与え、購入時の買い手には注意を促す。厳格な上限ではなく、ゆるやかなシグナルとして。',
    ],
    annotations: [
      '«عرضه نیم‌دانگ» — プラットフォーム自身のオファーにはゲージがない',
      '«ایوان معاملات» — 他の保有者による転売',
      '«قیمت گذاری فروشنده» — 売り手の価格。安い・適正・高いで示される',
      '平米単価と1口あたりの価格は同じ表示なのに、30口が24平米になっている',
    ],
    annotatedCaption: '売り手一覧：評価されるのは保有者同士の転売だけ。',
    pricingCaption: '売り手側：「あなたの価格設定」は価格の入力に合わせて動く。',
  },
  decisions: {
    heading: '3つの選択による市場設計',
    lede: '取引所は、ファイルから読み取れる3つの判断の上に成り立っている。',
    items: [
      {
        title: '評価するのは保有者同士の転売だけ。プラットフォーム自身のオファーは評価しない',
        why: 'プラットフォームが自らの価格を評価してもシグナルにならない。他の保有者の価格を評価してこそシグナルになる。直接販売にはゲージが一切付かない。',
        tradeoff: 'プラットフォーム自身の価格は、鑑定だけを根拠に信頼してもらうしかない。',
      },
      {
        title: '価格の上限ではなく、ゆるやかなシグナル',
        why: '上限を設けても抜け道が探されるだけだ。ゲージなら、価格を禁じることなく、出品前の売り手に目安を与え、購入時の買い手に注意を促せる。',
        tradeoff: '割高なオファーでも出品でき、買われてしまう。',
      },
      {
        title: '外枠より先に取引を設計する',
        why: '売却、内見、評価こそがプロダクトであり、ログイン、スプラッシュ、プロフィールはありふれた画面だ。制作順もそれらを最後に回している。',
        tradeoff: '外枠が最終形になったのは遅く、それが包むフローの後だった。',
      },
    ],
  },
  critique: {
    label: '批評',
    heading: '1平米を何と呼ぶのか',
    body: 'このプロダクトは、自らが売るものの呼び名を最後まで決めていない。その不統一は中核フロー全体に及んでいる。',
    bullets: [
      '一覧のカードは平米単価で表示し、物件ページは同じ量に別のラベルを付けている。',
      '取引ホールとポートフォリオでは「口」に切り替わる。',
      'ブランド名はまったく別の3つ目の単位、ダングに由来している。',
    ],
    finding:
      'お金が動く2つのシートには、3通りの異なる比率が載っている。購入シートでは1口あたり25平米なのに、25平米の合計が2口になる。売却シートでは2口が100平米とされ、売り手一覧では30口が24平米と表示される。',
    findingMethod: '購入シート、売却シート、売り手一覧の2×書き出しから読み取った',
    figureItems: ['購入：1口あたり25平米。そして25平米は2口。', '売却：2口は100平米。'],
    figureCaption:
      '面積、持分、伝統的な所有権。1つの資産に3つのメンタルモデルが、1回の購入の中に同居している。',
  },
  system: {
    label: 'システム',
    heading: 'バージョン0.0.1のデザインシステム',
    body: [
      'カラー、タイポグラフィ、フォーム項目、ボタン、モーダル、トースト、ヘッダー、タブバー、アイコンにわたる430のコンポーネント。ファイル内ではバージョン0.0.1とラベル付けされている。作り手は1人、カラーと文字のトークンは1セット、それに沿って描かれた191画面。',
      '2つのテーマは、存在する画面では本物だ。ウォレットはオーバーレイで色をかぶせるのではなく実際のトークンを差し替えており、物件一覧、取引ホール、売却シートにはすべてダーク版がある。ポートフォリオ一覧と物件登録フローはライトのみのままだった。',
    ],
    colorCaption: 'カラーボード：ラベル付きのカラーランプ、アクセントは1色、バージョン0.0.1。',
    walletItems: ['ライト', 'ダーク'],
    walletCaption: '両テーマのウォレット。オーバーレイではなく、トークンの差し替え。',
    darkCaption: 'ダークテーマの市場画面：物件一覧、取引ホール、売却シート。',
  },
  outcomes: {
    heading: 'ローンチではなく、デザインの記録',
    intro:
      'Nim Dangがリリースされたことを示す証拠はファイルになく、報告できる数字もない。そこにあるのは、2つの市場の完全なデザインだ。',
    items: [
      {
        label: '鑑定、カウントダウン、内見予約を備えた一次販売',
        context:
          '平米単価で表示される物件一覧、すべての物件に付いた権利証書、イラン暦で予約する内見。',
      },
      {
        label: '取引の両側に公正さのゲージを備えた保有者間取引',
        context: '取引ホール、売り手一覧、購入シートと売却シート。',
      },
      {
        label: '430コンポーネントのペルシャ語デザインシステム',
        context: '1つのライブラリに沿って描かれた191画面。要所では2つのテーマで。',
      },
    ],
  },
  lessons: {
    heading: '今ならどう変えるか',
    items: [
      {
        title: '市場を設計する前に、単位に名前を付ける',
        body: '平米、口、ダングは1つの資産に対する3つのメンタルモデルであり、プロダクトは1回の購入の中でその3つすべてを使っている。カード、ゲージ、ポートフォリオと、その先のすべてがこの曖昧さを引き継ぐ。これは用語の決定であり、後回しにしたことで高くついた。',
      },
      {
        title: 'いちばん強いアイデアには、いちばん目立つ扱いを',
        body: '保有者間の転売の両側に置いた安い・適正・高いのゲージは、このファイルで最も説得力のある要素だ。それがボトムシートの中の小さなバー1本として現れるだけになっている。プロダクトの顔にすべきだった。',
      },
      {
        title: 'プレースホルダーは、プロダクトになる前に片付ける',
        body: 'ゲージの値が入るべき場所に、英語のプレースホルダー文字列がまだ残っている。長く放置すると、プレースホルダーは未完成には見えなくなり、デザインそのものに見え始める。',
      },
    ],
  },
}

const COPY: Record<Locale, NdCopy> = { en: EN, fa: FA, ar: AR, es: ES, de: DE, fr: FR, ja: JA }

export const ND_MEDIA = Object.fromEntries(
  (Object.keys(MEDIA_FILES) as NdMediaKey[]).map((key) => [
    key,
    {
      ...MEDIA_FILES[key],
      alt: Object.fromEntries(LOCALES.map((locale) => [locale, COPY[locale].alt[key]])),
    },
  ]),
) as Record<NdMediaKey, MediaSpec>

const PROCESS_CODES: Eight = ['ONB', 'STK', 'SELL', 'VIS', 'BUY', 'SHEL', 'PORT', 'TRD']

const pad = (n: number) => String(n).padStart(2, '0')

export function ndSections(locale: Locale, media: NdMediaIds): Sections {
  const c = COPY[locale]
  const dir = dirFor(locale)
  const body = (values: string[]) => prose(dir, ...values.map((value) => paragraph(value, dir)))
  const item = (key: NdMediaKey, id: string, caption?: string) =>
    media[key] ? [{ id, media: media[key]!, ...(caption ? { caption } : {}) }] : []

  return [
    {
      id: 'nd-s01',
      blockType: 'csNarrative',
      label: 'context',
      heading: c.context.heading,
      body: body(c.context.body),
    },
    {
      id: 'nd-s02',
      blockType: 'csNarrative',
      label: 'problem',
      heading: c.problem.heading,
      body: body(c.problem.body),
    },
    {
      id: 'nd-s03',
      blockType: 'csFigure',
      layout: 'sequence',
      treatment: 'screen',
      items: [
        ...item('visitDate', 'nd-f03-1', c.problem.figureItems[0]),
        ...item('visitTime', 'nd-f03-2', c.problem.figureItems[1]),
        ...item('visitVerify', 'nd-f03-3', c.problem.figureItems[2]),
      ],
      caption: c.problem.figureCaption,
    },
    {
      id: 'nd-s04',
      blockType: 'csNarrative',
      label: 'approach',
      heading: c.approach.heading,
      body: body(c.approach.body),
    },
    {
      id: 'nd-s05',
      blockType: 'csProcess',
      kind: 'process',
      heading: c.approach.processHeading,
      steps: c.approach.steps.map((step, index) => ({
        id: `nd-p${pad(index + 1)}`,
        code: PROCESS_CODES[index],
        label: step.label,
        note: step.note,
      })),
    },
    {
      id: 'nd-s06',
      blockType: 'csFigure',
      layout: 'compare',
      treatment: 'screen',
      items: [
        ...item('stockHalls', 'nd-f06-1', c.approach.figureItems[0]),
        ...item('sellerFirst', 'nd-f06-2', c.approach.figureItems[1]),
      ],
      caption: c.approach.figureCaption,
    },
    {
      id: 'nd-s07',
      blockType: 'csNarrative',
      label: 'solution',
      heading: c.solution.heading,
      body: body(c.solution.body),
    },
    {
      id: 'nd-s08',
      blockType: 'csFigure',
      layout: 'annotated',
      treatment: 'screen',
      items: item('cover', 'nd-f08-1'),
      annotations: c.solution.annotations.map((text, index) => ({
        id: `nd-a08-${index + 1}`,
        text,
      })),
      caption: c.solution.annotatedCaption,
    },
    {
      id: 'nd-s09',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'screen',
      items: item('stepPricing', 'nd-f09-1'),
      caption: c.solution.pricingCaption,
    },
    {
      id: 'nd-s10',
      blockType: 'csDecisions',
      heading: c.decisions.heading,
      lede: c.decisions.lede,
      items: c.decisions.items.map((decision, index) => ({
        id: `nd-d${pad(index + 1)}`,
        title: decision.title,
        why: decision.why,
        tradeoff: decision.tradeoff,
      })),
    },
    {
      id: 'nd-s11',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: c.critique.label,
      heading: c.critique.heading,
      body: prose(dir, paragraph(c.critique.body, dir), bullets(c.critique.bullets, dir)),
    },
    {
      id: 'nd-s12',
      blockType: 'csFinding',
      kind: 'finding',
      text: c.critique.finding,
      method: c.critique.findingMethod,
    },
    {
      id: 'nd-s13',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'screen',
      items: [
        ...item('selectAmount', 'nd-f13-1', c.critique.figureItems[0]),
        ...item('sellProperty', 'nd-f13-2', c.critique.figureItems[1]),
      ],
      caption: c.critique.figureCaption,
    },
    {
      id: 'nd-s14',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: c.system.label,
      heading: c.system.heading,
      body: body(c.system.body),
    },
    {
      id: 'nd-s15',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'diagram',
      items: item('colorBoard', 'nd-f15-1'),
      caption: c.system.colorCaption,
    },
    {
      id: 'nd-s16',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'screen',
      items: [
        ...item('walletLight', 'nd-f16-1', c.system.walletItems[0]),
        ...item('walletDark', 'nd-f16-2', c.system.walletItems[1]),
      ],
      caption: c.system.walletCaption,
    },
    {
      id: 'nd-s17',
      blockType: 'csFigure',
      layout: 'sequence',
      treatment: 'screen',
      items: [
        ...item('listDark', 'nd-f17-1'),
        ...item('hallDark', 'nd-f17-2'),
        ...item('sellDark', 'nd-f17-3'),
      ],
      caption: c.system.darkCaption,
    },
    {
      id: 'nd-s18',
      blockType: 'csOutcomes',
      heading: c.outcomes.heading,
      intro: c.outcomes.intro,
      items: c.outcomes.items.map((outcome, index) => ({
        id: `nd-o${pad(index + 1)}`,
        kind: 'delivered' as const,
        label: outcome.label,
        context: outcome.context,
      })),
    },
    {
      id: 'nd-s19',
      blockType: 'csLessons',
      heading: c.lessons.heading,
      items: c.lessons.items.map((lesson, index) => ({
        id: `nd-l${pad(index + 1)}`,
        title: lesson.title,
        body: lesson.body,
      })),
    },
  ]
}

export function ndLocalizedFields(locale: Locale, media: NdMediaIds) {
  const c = COPY[locale]
  const identity = ARCHIVE.text(locale)
  return {
    ...identity,
    statement: c.statement,
    industry: c.industry,
    team: c.team,
    hero: {
      items: (['listMobile', 'detailMobile', 'hallList'] as const)
        .filter((key) => media[key])
        .map((key, index) => ({ id: `nd-h${pad(index + 1)}`, media: media[key]! })),
      caption: c.heroCaption,
    },
    snapshot: c.snapshot,
    sections: ndSections(locale, media),
    meta: {
      title: identity.title,
      description: identity.summary,
      ...(media.cover ? { image: media.cover } : {}),
    },
  }
}

// No `projectStatus`: nothing in the file says whether it shipped (README Q6).
export const ND_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  tools: ['Figma'],
  period: { start: '2022-06-01T00:00:00.000Z' },
}
