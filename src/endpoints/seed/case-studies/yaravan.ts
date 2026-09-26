import type { Project } from '@/payload-types'
import { dirFor, LOCALES, type Locale } from '@/utilities/locale'

import type { MediaSpec } from '../media'
import { archiveIdentity } from './archive'
import { paragraph, prose } from './lexical'

/**
 * Yaravan (`/work/yaravan`) — a warranty and after-sales platform built on an operation nobody had
 * written down, where every unconfirmed fact ships as a visible, owned gap. Every sentence comes
 * from `Docs/Experience/Projects/yaravan/README.md` and its Figma coverage audit
 * (`assets/figma/COVERAGE.md`, 2026-09-26).
 *
 * Publication gates, decided with Sina on 2026-09-26 (held here and in
 * `tests/int/case-study-seeds.int.spec.ts`):
 * - Product name only: the parent retailer, its holding, its legal entity, every person and every
 *   competitor stay unnamed. The support system the agents already use is "the existing support
 *   system".
 * - Sina is the lead within a team, not the sole author: the client's engineering team contributed.
 * - The economics deck is current: warranty extension is out of scope and is never presented as a
 *   revenue line. The business-line charter (confidential) contributes nothing.
 * - Allowed evidence: product screenshots, process-architecture crops (not the access matrices),
 *   the market finding in aggregate, and the economics method. No legal exposure, no code
 *   weakness, no warranty terms, prices or SLA figures, no staging hostname, no comment authors.
 * - Every crop was checked for names; owners are filled in the approval boxes and the RACI banner,
 *   and the retailer's number is filled on the macro map.
 *
 * Copy lives in one `Copy` object per locale; the sections builder is a pure template over it, so
 * a missing string or a wrong tuple length is a type error. Shared fields (codes, media, layout,
 * treatment) live in the builder and are identical in every locale.
 */
export const YAR_SLUG = 'yaravan'
export const YAR_ASSETS = 'Docs/Experience/Projects/yaravan/assets'
export const YAR_LOCALES = LOCALES

const ARCHIVE = archiveIdentity(YAR_SLUG)

const MEDIA_FILES = {
  // Same name as the archive cover, so the seed replaces its bytes (the dev badge is cropped out)
  // and keeps the media id.
  cover: { file: 'crops/cover.png', name: ARCHIVE.row.cover.name },
  map: { file: 'crops/l0-map.png', name: 'yaravan--l0-macro-map.png' },
  library: { file: 'crops/component-library.png', name: 'yaravan--component-library.png' },
  notice: { file: 'crops/wi-notice.png', name: 'yaravan--work-instruction-notice.png' },
  swimlane: { file: 'crops/pr024-swimlane.png', name: 'yaravan--activation-swimlane.png' },
  raci: { file: 'crops/raci.png', name: 'yaravan--raci-matrix.png' },
  pending: { file: 'crops/contact-pending.png', name: 'yaravan--pending-approval.png' },
  request: { file: 'crops/request-detail.png', name: 'yaravan--request-detail.png' },
  staff: { file: 'crops/staff-home.png', name: 'yaravan--staff-home.png' },
  market: { file: 'crops/market-cliff.png', name: 'yaravan--market-cliff.png' },
  controls: { file: 'crops/economics-controls.png', name: 'yaravan--economics-controls.png' },
} as const

export type YarMediaKey = keyof typeof MEDIA_FILES
type YarMediaIds = Partial<Record<YarMediaKey, string>>
type Sections = NonNullable<Project['sections']>

type Two<T = string> = [T, T]
type Three<T = string> = [T, T, T]
type Four<T = string> = [T, T, T, T]
type Five<T = string> = [T, T, T, T, T]
type Six<T = string> = [T, T, T, T, T, T]

export interface YarCopy {
  statement: string
  industry: string
  team: string
  heroCaption: string
  snapshot: { problem: string; role: string; result: string }
  alt: Record<YarMediaKey, string>
  context: { heading: string; body: Two }
  problem: { heading: string; body: Three }
  audit: { text: string; attribution: string; method: string }
  ownership: {
    heading: string
    intro: string
    own: Five
    coOwn: [string]
    collaborate: Two
    note: string
  }
  approach: {
    heading: string
    body: Two
    insight: string
    processHeading: string
    steps: Six<{ label: string; note: string }>
  }
  research: {
    heading: string
    body: Three
    libraryCaption: string
    noticeCaption: string
  }
  findings: {
    label: string
    heading: string
    body: Two
    swimlaneCaption: string
    raciCaption: string
  }
  solution: {
    heading: string
    body: Two
    annotations: Four
    pendingCaption: string
    requestCaption: string
  }
  decisions: {
    heading: string
    lede: string
    items: Six<{ title: string; why: string; alternatives: string; tradeoff: string }>
    staffEvidence: string
  }
  economics: {
    label: string
    heading: string
    body: Three
    insight: string
    marketCaption: string
    controlsCaption: string
  }
  outcomes: {
    heading: string
    intro: string
    delivered: Four<{ label: string; context: string }>
    shipped: Six
  }
  lessons: { heading: string; items: Four<{ title: string; body: string }> }
}

const EN: YarCopy = {
  statement:
    'A warranty platform built on an operation nobody had written down, so every unconfirmed fact became a visible, owned gap.',
  industry: 'Retail · after-sales and warranty',
  team: 'Lead designer, process architect and PM, with the client’s engineering team and its business and after-sales leads',
  heroCaption:
    'The macro process map: eighteen processes in five lanes, each card with an owner, an output and a status badge.',
  snapshot: {
    problem:
      'The brand’s public promises outran the operation, and the operation itself was written in no document.',
    role: 'Lead designer, process architect and PM: requirements, a 145-board process architecture, the product and the market case.',
    result:
      'A tested platform waiting on business decisions, and the first drawn account of the after-sales operation. No business metrics yet.',
  },
  alt: {
    cover:
      'Yaravan — the customer panel home on desktop in Persian: active warranties, open requests and a button to register a repair',
    map: 'Yaravan — the macro process map in Persian: eighteen process cards in five lanes, each with a status badge, and a notice that closes the count',
    library:
      'Yaravan — the diagram component library: seven flow shapes, a four-state status badge, lane headers, breadcrumbs and process cards',
    notice:
      'Yaravan — a notice board in Persian naming the work instructions that cannot yet be written, and the reason for each',
    swimlane:
      'Yaravan — the swimlane for customer warranty activation in Persian: customer, system and SMS lanes, one decision and two end states',
    raci: 'Yaravan — the RACI matrix in Persian, with a red banner marking the Accountable column as open and red cells for deliberate exclusions',
    pending:
      'Yaravan — the contact page in Persian: six dashed orange boxes, each naming a fact that still awaits approval',
    request:
      'Yaravan — a repair request on mobile in Persian: the tracking code, the problem reported and a status timeline',
    staff:
      'Yaravan — the staff panel home in Persian: four counters for dealership requests, invoices, open orders and parts requests',
    market:
      'Yaravan market study — a chart of twelve repair-journey stages: the first five mostly digital, stages six to twelve between zero and eleven percent',
    controls:
      'Yaravan warranty economics — five control levers in Persian, ordered from cheapest to costliest, each with its status today',
  },
  context: {
    heading: 'A dormant identity, a working product',
    body: [
      'Yaravan is the warranty and after-sales brand of an Iranian mobile-phone retailer. An outside agency wrote its brand identity in 2024 — a strategy deck and a visual guideline — and then nothing was built on it.',
      'From July 2026 the job was to turn that identity into a working product: an independent Persian website, a customer panel and a staff panel. The existing support system keeps the ticket queue and the repair operation; for the processes Yaravan owns, Yaravan is the reference, and the support system records rather than runs them.',
    ],
  },
  problem: {
    heading: 'Where a fact should be',
    body: [
      'The existing site promised more than the operation delivered. The requirements work found that its headline claims were not operational truth, and that no real warranty database existed — no data migration was needed, because there was no data.',
      'Underneath, the operation had never been written down. The source documents cited for the real ticketing and repair processes existed in no repository, so every process map had to be a design of the desired state, not a record of the current one. And the brand’s ambitions — branches, round-the-clock service, delivery, bundled insurance — outran all of it.',
      'That left one real design question: what do you put on the page where a fact should be, when nobody can yet confirm the fact?',
    ],
  },
  audit: {
    text: '“NOT_READY is not to be replaced by any positive percentage or optimistic narrative.”',
    attribution: 'The input-readiness audit, round one',
    method: 'A rule written into the audit before it ran',
  },
  ownership: {
    heading: 'Leading the work, with the client’s team',
    intro:
      'I led the design of the product and of the operation underneath it, and the build that followed, with the client’s engineering team contributing. Business ownership stayed with the client: its business lead owned the commercial decisions and its after-sales lead owned the support operation the product depends on.',
    own: [
      'Requirements and scope',
      'Brand system, derived from the source files',
      'Process architecture, macro map to work instruction',
      'Product and interface specification',
      'Market analysis and warranty economics',
    ],
    coOwn: ['The platform build, with the client’s engineering team'],
    collaborate: [
      'Commercial decisions (the business lead)',
      'The support operation (the after-sales lead)',
    ],
    note: 'The build and the process diagrams were AI-assisted, and the repository says so openly: its guide sets the source-of-truth order and the conflict rules that made that safe on a business where most facts were still open.',
  },
  approach: {
    heading: 'Gates, not deliverables',
    body: [
      'Each stage ended in a gate rather than a document. The requirements came from fifty direct multiple-choice questions to the business lead, against one success test: engineering can start without re-asking any fundamental question. The brand system was reverse-engineered from the source files, and where they were silent the documentation says so instead of filling the gap.',
      'Then a readiness audit ran — and failed. Across 59 sources and 31 processes it returned NOT_READY. The second round did not argue with the verdict; it cut the scope to the 13 processes the brand actually owns, and a later amendment widened it again to 22, adding intake, diagnosis, repair, return delivery and parts.',
    ],
    insight:
      'Cutting scope raised structural readiness from 49% to 78% and evidence confidence from 58% to 92% — because the processes left in scope could be read off executable code and passing tests.',
    processHeading: 'Six gates, in order',
    steps: [
      {
        label: 'Requirements',
        note: 'Fifty questions to the business lead; nine competitors benchmarked',
      },
      {
        label: 'Brand system',
        note: 'Colour read from the logo’s vector paths, not sampled from a render',
      },
      {
        label: 'Readiness audit',
        note: 'NOT_READY: 12 blockers, 4 conflicts, roles in three taxonomies',
      },
      {
        label: 'Scope cut',
        note: 'Only the processes the brand owns; the audit re-run on that scope',
      },
      { label: 'Architecture', note: '22 processes drawn, macro map to work instruction' },
      { label: 'Business case', note: 'A market study and a warranty-economics model' },
    ],
  },
  research: {
    heading: 'Draw the rules before the diagrams',
    body: [
      'The Figma file holds no screens: the interface was specified in writing, and the design effort went into the part nobody could describe — the operation. Its first page is not a cover but a rules page: a fourteen-part component library and six house rules. Flow runs right to left, as the language does. Blanks are marked “needs determination”, never filled with a guessed name or number. Conflicts are recorded, not resolved. Colour never carries meaning alone; it always travels with a shape and an icon.',
      'One rule decides the shape of the whole file: what may be drawn depends on the evidence behind it, claim by claim. Five evidence tiers run from executable code, which licenses a full swimlane, down to no source at all, for which drawing is forbidden and only a notice may appear. The lower the tier, the less you may draw.',
      'So the file is honest about its absences. Where a level stops short, a notice board names what is missing and why, and the service-map and swimlane notices close their own arithmetic back to 22. A diagram of an undocumented sequence would be the same invention the rules forbid — only more convincing.',
    ],
    libraryCaption:
      'Page 00: the library every diagram is built from — seven flow shapes, a four-state status badge and the furniture that makes a map navigable.',
    noticeCaption:
      'An absence, drawn: six work instructions that cannot be written yet, each with the missing mechanism or policy that blocks it.',
  },
  findings: {
    label: 'What the maps found',
    heading: 'A map that may come back incomplete is a research instrument',
    body: [
      'Drawing the operation produced findings no document had. Of the fourteen processes drawn as swimlanes, only two send an SMS at all — the login code and the warranty activation — so the draft message copy went into exactly those two maps. Four processes on the macro map have no card, because the sources cited for them do not exist.',
      'And the responsibility matrix could only be three-quarters derived. Responsible, consulted and informed came out of the code; accountable could not, because the code says who can execute an action, not who answers for its result. The matrix ships with that column open and a banner saying so, and it marks deliberate exclusions — segregation of duties — in red so they cannot be mistaken for gaps.',
    ],
    swimlaneCaption:
      'Customer warranty activation: the customer, the system and the SMS gateway in three lanes, with the one decision that sends a used code to rejection.',
    raciCaption:
      'The first eleven rows of the 22-process matrix. The main column ships empty, and says why. The banner states the gap and who holds the decision; the name is hidden here.',
  },
  solution: {
    heading: 'The unconfirmed-claim marker',
    body: [
      'Where a page needs a fact nobody has approved, it renders an orange dashed box naming the missing item and its owner — a content block that editors place like any other. A sweep in mid-August counted 32 live open items on seven of the eight public pages, and found that five recurring subjects account for most of them. Closing five things closes most of the site.',
      'Underneath is a Payload and Next.js platform on PostgreSQL: a public site, a customer panel and a staff panel, all Persian and right to left, with 26 collections and 92 test files across five levels.',
    ],
    annotations: [
      'Each box names one fact the page needs, instead of a confident sentence.',
      'The dashed orange frame sets an open item apart from the content around it.',
      'Every box carries the name of whoever must approve it; the names are hidden here.',
      'Six on this page alone: the support phone, phone and chat hours, email, the store’s address and the legal registration.',
    ],
    pendingCaption: 'The contact page: the facts it still needs, listed where they will go.',
    requestCaption:
      'A repair request in the customer panel, with the status timeline the customer follows. Demo data.',
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
  },
  economics: {
    label: 'Economics',
    heading: 'A warranty is a liability, not a service',
    body: [
      'The commercial case began with the market. A study of 100 companies in Iran’s digital-goods warranty and repair market, 18 of them assessed in depth against a twelve-stage repair journey, found a cliff: the first five stages are largely digital, and from device handover onward almost nothing is. The best platform digitises six stages of twelve; the average is 4.1. As the study put it, the market built the customer a website, not a way back.',
      'A second deck asked what the warranty itself costs, and to whom. A warranty is a contingent liability — a promise whose whether, when and how much are all unknown — so money has to be set aside for it today. The deck sets out who could fund it, and each answer says what the brand is: if the retailer absorbs the cost, a cost centre; if sellers buy the codes, an independent business; if the importer pays, a partner running the network. The recommendation is labelled “a proposal, not a decision”.',
      'It ends in controls ranked by cost — the cheapest is a single field — and ten decisions with owners and options, eight of which can be taken today without any number at all.',
    ],
    insight:
      'The only numbers allowed in the deck are ones extracted from the code, a hypothetical labelled as one, or an external benchmark with its source, population, date and confidence — and every slide carries a badge saying which.',
    marketCaption:
      'The cliff: stages one to five of the repair journey are 33–100% digital across the platforms studied; stages six to twelve, 0–11%.',
    controlsCaption:
      'Five control levers, ordered from cheapest to costliest, each tied to the factor of the cost equation it moves.',
  },
  outcomes: {
    heading: 'A platform waiting on decisions',
    intro:
      'There are no business metrics, and there should not be: the platform is on staging, and the agreed measures have no approved formula or data source yet. The six-week Phase 1 target was missed. The three items blocking integration — access to the existing support system, a customer-sync contract, and a written security and privacy approval — are decisions, not engineering, and every other open item was re-tiered to gate only its own feature.',
    delivered: [
      {
        label: 'A tested platform on staging',
        context:
          'A public site, a customer panel and a staff panel: 26 collections, 92 test files across five levels, and CI on every push.',
      },
      {
        label: 'A 145-board process architecture',
        context:
          '22 processes drawn from macro map to work instruction, with the gaps marked rather than filled.',
      },
      {
        label: 'A market study of 100 companies',
        context: 'The case for which stages of the repair journey are worth building next.',
      },
      {
        label: 'A warranty-economics model',
        context: 'Liability, funding and controls, set out without a single invented number.',
      },
    ],
    shipped: [
      'Public site',
      'Customer panel',
      'Staff panel',
      'Process architecture',
      'Market study',
      'Warranty-economics deck',
    ],
  },
  lessons: {
    heading: 'One discipline, every artefact',
    items: [
      {
        title: 'Publishing the gap beats papering over it',
        body: 'The dashed orange box is the whole project in one component. The same instinct runs through every artefact: NOT_READY instead of a percentage, “needs determination” on the process cards, an empty Accountable column with a banner saying so, and an evidence badge on every slide.',
      },
      {
        title: 'Design the operation, not just the interface',
        body: 'The screens were the known part. Drawing what nobody could describe is what produced the findings no document had. A process map that is allowed to come back incomplete is a research instrument; one that must look finished is decoration.',
      },
      {
        title: 'A readiness score means nothing until the scope is honest',
        body: 'The first audit failed because it measured an operation this product does not own. Restricting it to the processes the brand owns did not lower the standard — it raised evidence confidence to 92%.',
      },
      {
        title: 'Turn each review comment into a rule',
        body: 'Answering a comment fixes one node; naming the rule behind it fixes every future one. One note on Persian spelling became a named rule and a single pass over 1,088 text nodes on all thirteen pages.',
      },
    ],
  },
}

const FA: YarCopy = {
  statement:
    'پلتفرم گارانتی‌ای بنا‌شده بر عملیاتی که هیچ‌کس مکتوبش نکرده بود؛ از این رو هر واقعیت تأییدنشده به شکافی آشکار و صاحب‌دار تبدیل شد.',
  industry: 'خرده‌فروشی · خدمات پس از فروش و گارانتی',
  team: 'طراح ارشد، معمار فرایند و مدیر محصول، همراه با تیم مهندسی کارفرما و مسئولان کسب‌وکار و خدمات پس از فروش آن',
  heroCaption:
    'نقشهٔ کلان فرایندها: هجده فرایند در پنج مسیر، هر کارت با یک مالک، یک خروجی و یک نشان وضعیت.',
  snapshot: {
    problem:
      'وعده‌های عمومی برند از توان عملیات جلو زده بود، و خود عملیات در هیچ سندی نوشته نشده بود.',
    role: 'طراح ارشد، معمار فرایند و مدیر محصول: نیازمندی‌ها، معماری فرایندی در ۱۴۵ بورد، محصول و توجیه بازار.',
    result:
      'پلتفرمی تست‌شده که در انتظار تصمیم‌های کسب‌وکار است، و نخستین روایت ترسیم‌شده از عملیات خدمات پس از فروش. هنوز شاخص کسب‌وکاری در کار نیست.',
  },
  alt: {
    cover:
      'یاراوان — صفحهٔ اصلی پنل مشتری روی دسکتاپ به فارسی: گارانتی‌های فعال، درخواست‌های باز و دکمه‌ای برای ثبت تعمیر',
    map: 'یاراوان — نقشهٔ کلان فرایندها به فارسی: هجده کارت فرایند در پنج مسیر، هر یک با نشان وضعیت، و اطلاعیه‌ای که شمارش را کامل می‌کند',
    library:
      'یاراوان — کتابخانهٔ اجزای نمودار: هفت شکل جریان، نشان وضعیت چهارحالته، سرعنوان مسیرها، بردکرامب‌ها و کارت‌های فرایند',
    notice:
      'یاراوان — تابلوی اطلاعیه‌ای به فارسی که دستورالعمل‌های کاری‌ای را نام می‌برد که هنوز نوشتنی نیستند، همراه با دلیل هر یک',
    swimlane:
      'یاراوان — نمودار سوئیم‌لین فعال‌سازی گارانتی توسط مشتری به فارسی: مسیرهای مشتری، سامانه و پیامک، یک تصمیم و دو وضعیت پایانی',
    raci: 'یاراوان — ماتریس RACI به فارسی، با نواری قرمز که ستون «پاسخ‌گو» را باز اعلام می‌کند و خانه‌هایی قرمز برای استثناهای عامدانه',
    pending:
      'یاراوان — صفحهٔ تماس با ما به فارسی: شش کادر خط‌چین نارنجی، هر یک با نام واقعیتی که هنوز در انتظار تأیید است',
    request:
      'یاراوان — یک درخواست تعمیر روی تلفن همراه به فارسی: کد پیگیری، مشکل گزارش‌شده و خط زمانی وضعیت',
    staff:
      'یاراوان — صفحهٔ اصلی پنل کارکنان به فارسی: چهار شمارنده برای درخواست‌های نمایندگی، فاکتورها، سفارش‌های باز و درخواست‌های قطعه',
    market:
      'مطالعهٔ بازار یاراوان — نموداری از دوازده مرحلهٔ مسیر تعمیر: پنج مرحلهٔ نخست عمدتاً دیجیتال، مراحل شش تا دوازده میان صفر تا یازده درصد',
    controls:
      'اقتصاد گارانتی یاراوان — پنج اهرم کنترلی به فارسی، مرتب از کم‌هزینه‌ترین تا پرهزینه‌ترین، هر یک با وضعیت امروزش',
  },
  context: {
    heading: 'هویتی خفته، محصولی کارا',
    body: [
      'یاراوان برند گارانتی و خدمات پس از فروش یک خرده‌فروش ایرانی تلفن همراه است. یک آژانس بیرونی در سال ۲۰۲۴ هویت برند آن را نوشت — یک سند استراتژی و یک راهنمای بصری — و پس از آن هیچ چیز بر پایه‌اش ساخته نشد.',
      'از ژوئیهٔ ۲۰۲۶ کار این بود که آن هویت به محصولی کارا تبدیل شود: یک وب‌سایت فارسی مستقل، یک پنل مشتری و یک پنل کارکنان. سامانهٔ پشتیبانی موجود همچنان صف تیکت‌ها و عملیات تعمیر را در دست دارد؛ برای فرایندهایی که مالکشان یاراوان است، یاراوان مرجع است و سامانهٔ پشتیبانی آن‌ها را ثبت می‌کند، نه اجرا.',
    ],
  },
  problem: {
    heading: 'جایی که باید واقعیتی باشد',
    body: [
      'سایت موجود بیش از آنچه عملیات ارائه می‌داد وعده می‌داد. کار نیازمندی‌ها نشان داد که ادعاهای اصلی آن حقیقت عملیاتی نبودند، و هیچ پایگاه دادهٔ واقعی‌ای برای گارانتی وجود نداشت — به مهاجرت داده نیازی نبود، چون داده‌ای در کار نبود.',
      'در لایهٔ زیرین، عملیات هرگز مکتوب نشده بود. اسناد مرجعی که برای فرایندهای واقعی تیکتینگ و تعمیر به آن‌ها استناد می‌شد، در هیچ مخزنی وجود نداشتند؛ پس هر نقشهٔ فرایند باید طراحی وضعیت مطلوب می‌بود، نه ثبت وضعیت فعلی. و بلندپروازی‌های برند — شعبه‌ها، خدمات شبانه‌روزی، ارسال و بیمهٔ همراه — از همهٔ این‌ها جلوتر بود.',
      'این یک پرسش واقعی طراحی باقی گذاشت: وقتی هنوز هیچ‌کس نمی‌تواند واقعیتی را تأیید کند، در جایی از صفحه که آن واقعیت باید باشد چه می‌گذارید؟',
    ],
  },
  audit: {
    text: '«NOT_READY نباید با هیچ درصد مثبت یا روایت خوش‌بینانه‌ای جایگزین شود.»',
    attribution: 'ممیزی آمادگی ورودی‌ها، دور نخست',
    method: 'قاعده‌ای که پیش از اجرای ممیزی در آن نوشته شد',
  },
  ownership: {
    heading: 'رهبری کار، همراه با تیم کارفرما',
    intro:
      'طراحی محصول و عملیاتِ زیر آن، و ساختی را که در پی آمد، رهبری کردم و تیم مهندسی کارفرما در آن مشارکت داشت. مالکیت کسب‌وکار نزد کارفرما ماند: مسئول کسب‌وکار آن مالک تصمیم‌های تجاری بود و مسئول خدمات پس از فروش آن مالک عملیات پشتیبانی‌ای که محصول به آن وابسته است.',
    own: [
      'نیازمندی‌ها و دامنهٔ کار',
      'سیستم برند، برگرفته از فایل‌های مرجع',
      'معماری فرایند، از نقشهٔ کلان تا دستورالعمل کاری',
      'مشخصات محصول و رابط کاربری',
      'تحلیل بازار و اقتصاد گارانتی',
    ],
    coOwn: ['ساخت پلتفرم، همراه با تیم مهندسی کارفرما'],
    collaborate: ['تصمیم‌های تجاری (مسئول کسب‌وکار)', 'عملیات پشتیبانی (مسئول خدمات پس از فروش)'],
    note: 'ساخت و نمودارهای فرایند با کمک هوش مصنوعی انجام شد، و مخزن این را آشکارا می‌گوید: راهنمای آن ترتیب منابع مرجع و قواعد حل تعارض را تعیین می‌کند، همان چیزی که این کار را در کسب‌وکاری که بیشتر واقعیت‌هایش هنوز باز بود ایمن کرد.',
  },
  approach: {
    heading: 'دروازه‌ها، نه تحویل‌دادنی‌ها',
    body: [
      'هر مرحله به یک دروازه ختم می‌شد، نه به یک سند. نیازمندی‌ها از پنجاه پرسش چندگزینه‌ای مستقیم از مسئول کسب‌وکار به دست آمد، با یک محک موفقیت: تیم مهندسی بتواند کار را آغاز کند بی‌آنکه هیچ پرسش بنیادینی را دوباره بپرسد. سیستم برند با مهندسی معکوس از فایل‌های مرجع بازسازی شد، و هر جا آن فایل‌ها ساکت بودند، مستندات به‌جای پر کردن جای خالی همین را می‌گوید.',
      'سپس یک ممیزی آمادگی اجرا شد — و رد شد. در ۵۹ منبع و ۳۱ فرایند، نتیجه NOT_READY بود. دور دوم با این حکم بحث نکرد؛ دامنه را به ۱۳ فرایندی که برند واقعاً مالک آن‌هاست محدود کرد، و اصلاحیه‌ای بعدی آن را دوباره به ۲۲ رساند و پذیرش، عیب‌یابی، تعمیر، ارسال بازگشتی و قطعات را افزود.',
    ],
    insight:
      'محدود کردن دامنه، آمادگی ساختاری را از ۴۹٪ به ۷۸٪ و اطمینان شواهد را از ۵۸٪ به ۹۲٪ رساند — چون فرایندهای باقی‌مانده در دامنه را می‌شد از روی کد اجرایی و تست‌های موفق خواند.',
    processHeading: 'شش دروازه، به ترتیب',
    steps: [
      { label: 'نیازمندی‌ها', note: 'پنجاه پرسش از مسئول کسب‌وکار؛ بنچمارک نُه رقیب' },
      {
        label: 'سیستم برند',
        note: 'رنگ از مسیرهای برداری لوگو خوانده شد، نه نمونه‌برداری از یک رندر',
      },
      { label: 'ممیزی آمادگی', note: 'NOT_READY: ۱۲ مانع، ۴ تعارض، نقش‌ها در سه طبقه‌بندی' },
      {
        label: 'محدودسازی دامنه',
        note: 'فقط فرایندهایی که برند مالک آن‌هاست؛ ممیزی روی همین دامنه دوباره اجرا شد',
      },
      { label: 'معماری', note: '۲۲ فرایند ترسیم شد، از نقشهٔ کلان تا دستورالعمل کاری' },
      { label: 'توجیه کسب‌وکار', note: 'یک مطالعهٔ بازار و یک مدل اقتصاد گارانتی' },
    ],
  },
  research: {
    heading: 'پیش از نمودارها، قواعد را ترسیم کن',
    body: [
      'فایل Figma هیچ صفحهٔ رابط کاربری‌ای ندارد: رابط به‌صورت مکتوب مشخص شد، و تلاش طراحی صرف بخشی شد که هیچ‌کس نمی‌توانست توصیفش کند — عملیات. صفحهٔ نخست آن جلد نیست، صفحهٔ قواعد است: یک کتابخانهٔ اجزای چهارده‌بخشی و شش قاعدهٔ داخلی. جریان از راست به چپ پیش می‌رود، همان‌گونه که زبان. جاهای خالی با «نیازمند تعیین» علامت می‌خورند و هرگز با نام یا عددی حدسی پر نمی‌شوند. تعارض‌ها ثبت می‌شوند، نه حل. رنگ هرگز به‌تنهایی معنا را حمل نمی‌کند؛ همیشه با یک شکل و یک آیکون همراه است.',
      'یک قاعده شکل کل فایل را تعیین می‌کند: آنچه مجاز به ترسیم است به شواهد پشت آن بستگی دارد، ادعا به ادعا. پنج ردهٔ شواهد از کد اجرایی، که مجوز یک سوئیم‌لین کامل را می‌دهد، تا نبود هیچ منبعی امتداد دارند؛ در این ردهٔ آخر ترسیم ممنوع است و فقط یک اطلاعیه می‌تواند بیاید. هرچه رده پایین‌تر، مجال ترسیم کمتر.',
      'پس فایل دربارهٔ غیاب‌هایش صادق است. هر جا سطحی ناتمام می‌ماند، یک تابلوی اطلاعیه نام می‌برد که چه چیزی کم است و چرا، و اطلاعیه‌های نقشهٔ خدمات و سوئیم‌لین حساب خود را تا ۲۲ می‌بندند. نمودار یک توالی مستندنشده همان جعلی است که قواعد منع می‌کنند — فقط باورپذیرتر.',
    ],
    libraryCaption:
      'صفحهٔ ۰۰: کتابخانه‌ای که هر نمودار از آن ساخته می‌شود — هفت شکل جریان، نشان وضعیت چهارحالته، و اجزایی که یک نقشه را پیمایش‌پذیر می‌کنند.',
    noticeCaption:
      'غیابی ترسیم‌شده: شش دستورالعمل کاری که هنوز نوشتنی نیستند، هر یک با سازوکار یا سیاست ناموجودی که مانعش است.',
  },
  findings: {
    label: 'آنچه نقشه‌ها یافتند',
    heading: 'نقشه‌ای که اجازه دارد ناقص بازگردد، ابزار پژوهش است',
    body: [
      'ترسیم عملیات به یافته‌هایی رسید که در هیچ سندی نبود. از چهارده فرایندی که به‌صورت سوئیم‌لین ترسیم شدند، فقط دو فرایند اصلاً پیامک می‌فرستند — کد ورود و فعال‌سازی گارانتی — پس پیش‌نویس متن پیامک‌ها دقیقاً به همین دو نقشه رفت. چهار فرایند در نقشهٔ کلان کارت ندارند، چون منابعی که برایشان ذکر شده وجود ندارند.',
      'و ماتریس مسئولیت را فقط تا سه‌چهارم می‌شد استخراج کرد. مسئول اجرا، مشورت‌شونده و مطلع‌شونده از کد به دست آمدند؛ پاسخ‌گو نه، چون کد می‌گوید چه کسی می‌تواند اقدامی را اجرا کند، نه اینکه چه کسی پاسخ‌گوی نتیجهٔ آن است. ماتریس با همین ستونِ باز و نواری که این را اعلام می‌کند منتشر می‌شود، و استثناهای عامدانه — تفکیک وظایف — را قرمز علامت می‌زند تا با جای خالی اشتباه گرفته نشوند.',
    ],
    swimlaneCaption:
      'فعال‌سازی گارانتی توسط مشتری: مشتری، سامانه و درگاه پیامک در سه مسیر، با تنها تصمیمی که کد استفاده‌شده را به رد شدن می‌فرستد.',
    raciCaption:
      'یازده ردیف نخست ماتریس ۲۲ فرایند. ستون اصلی خالی منتشر می‌شود، و می‌گوید چرا. نوار، شکاف و دارندهٔ تصمیم را اعلام می‌کند؛ نام در این‌جا پنهان شده است.',
  },
  solution: {
    heading: 'نشانگر ادعای تأییدنشده',
    body: [
      'هر جا صفحه به واقعیتی نیاز دارد که هیچ‌کس تأییدش نکرده، یک کادر خط‌چین نارنجی نمایش می‌دهد که مورد ناموجود و مالک آن را نام می‌برد — بلوکی محتوایی که ویراستاران مانند هر بلوک دیگری جای‌گذاری می‌کنند. یک بررسی سراسری در نیمهٔ اوت ۳۲ مورد باز فعال را در هفت صفحه از هشت صفحهٔ عمومی شمرد، و نشان داد که پنج موضوع تکرارشونده بیشتر آن‌ها را تشکیل می‌دهند. بستن پنج مورد، بیشتر سایت را کامل می‌کند.',
      'در زیر آن، پلتفرمی بر پایهٔ Payload و Next.js روی PostgreSQL قرار دارد: یک سایت عمومی، یک پنل مشتری و یک پنل کارکنان، همه فارسی و راست‌به‌چپ، با ۲۶ کالکشن و ۹۲ فایل تست در پنج سطح.',
    ],
    annotations: [
      'هر کادر یک واقعیت موردنیاز صفحه را نام می‌برد، به‌جای جمله‌ای از سر اطمینان.',
      'قاب خط‌چین نارنجی، مورد باز را از محتوای پیرامونش جدا می‌کند.',
      'هر کادر نام کسی را دارد که باید تأییدش کند؛ نام‌ها در این‌جا پنهان شده‌اند.',
      'فقط در همین صفحه شش مورد: تلفن پشتیبانی، ساعت‌های پاسخ‌گویی تلفن و گفت‌وگو، ایمیل، نشانی فروشگاه و ثبت حقوقی.',
    ],
    pendingCaption:
      'صفحهٔ تماس با ما: واقعیت‌هایی که هنوز لازم دارد، فهرست‌شده در همان جایی که قرار خواهند گرفت.',
    requestCaption:
      'یک درخواست تعمیر در پنل مشتری، با خط زمانی وضعیتی که مشتری دنبال می‌کند. داده‌های نمایشی.',
  },
  decisions: {
    heading: 'شش مرز',
    lede: 'بیشتر طراحی دربارهٔ چیزهایی است که محصول از انجام دادن یا گفتنشان سر باز می‌زند.',
    items: [
      {
        title: 'شکاف و مالکش را نشان بده، نه یک حدس',
        why: 'سایتی که وعده‌ای تأییدنشده را بیان کند، آن را به تعهد تبدیل می‌کند. نمایش مورد باز — همراه با کسی که پاسخ آن را بر عهده دارد — سایت را در دوران ناتمامی‌اش صادق نگه می‌دارد، و یک مشکل محتوایی را به فهرستی تبدیل می‌کند که می‌توان پیگیری و بسته‌اش کرد.',
        alternatives: 'متن جای‌نگهدار باورپذیر، یا پنهان کردن بخش',
        tradeoff: 'تا کسب‌وکار پاسخ ندهد، سایت آشکارا ناتمام به نظر می‌رسد.',
      },
      {
        title: 'پنل کارکنانی که پنل عملیات نیست',
        why: 'کارشناسان هم‌اکنون در سامانهٔ پشتیبانی موجود کار می‌کنند، و سامانهٔ دوم حقیقت را دوپاره می‌کند. پنل کارکنان فقط فرایندهایی را پوشش می‌دهد که محصول مالک آن‌هاست — فاکتورها، کدهای فعال‌سازی، دریافت قطعات، بررسی نمایندگی‌ها — و نقشهٔ سایت آن می‌گوید که هرگز نباید به صف تیکت‌ها، عیب‌یابی یا تعمیر گسترش یابد.',
        alternatives: 'بازسازی تیکتینگ درون محصول جدید',
        tradeoff: 'کارکنان تا زمان اتصال این دو سامانه، در هر دو کار می‌کنند.',
      },
      {
        title: 'هیچ یکپارچه‌سازی‌ای پیش‌شرط راه‌اندازی نیست',
        why: 'سه سطح اتصال تعریف شد، و سطح یک مستقل است: اگر سامانهٔ پشتیبانی هرگز متصل نشود، چیزی از کار نمی‌افتد. اتصال بهره‌وری می‌افزاید، نه توان کار کردن را؛ پس ارزش محصول منتظر قرارداد هیچ‌کس دیگری نمی‌ماند.',
        alternatives: 'راه‌اندازی فقط پس از فعال شدن همهٔ یکپارچه‌سازی‌ها',
        tradeoff: 'تا امضای قراردادها، تحویل‌وتحول‌ها دستی است.',
      },
      {
        title: 'یکپارچه‌سازی‌ها در حالت بسته شکست می‌خورند',
        why: 'هر سامانهٔ بیرونی پشت یک لایهٔ درگاه واحد قرار دارد که در برابر هفت سناریوی مرزی تست شده است — موفقیت، خطای اعتبارسنجی، اتمام مهلت، تکرار، بازپخش، خارج از ترتیب و وضعیت نامعلوم، که به‌جای حدس زده شدن در حالت معلق می‌ماند. بیرون از محیط تولید، نبود اعتبارنامه به یک شبیه‌ساز بازمی‌گردد؛ محیط تولید به‌جای گزارش ارسالی که هرگز انجام نشده، خطا می‌دهد.',
        alternatives: 'وضعیت‌های موفقیت خوش‌بینانه',
        tradeoff: 'وضعیت‌های بیشتری برای طراحی، و خطاهایی که کاربر می‌بیند.',
      },
      {
        title: 'تفکیک وظایف در خود محصول، نه فقط روی کاغذ',
        why: 'کسی که فاکتور صادر می‌کند نمی‌تواند به‌تنهایی ابطالی بزرگ را تأیید کند، و نقشی که سقف ابطال را تعیین می‌کند نمی‌تواند ابطال‌ها را تأیید کند — نمی‌تواند سقف خودش را بالا ببرد. منو، محافظ صفحه و بررسی سرور همه از یک ماژول می‌خوانند، پس رابط کاربری و سرور نمی‌توانند دربارهٔ یک مجوز اختلاف داشته باشند.',
        alternatives: 'مجوزهایی که در ماتریس ترسیم و با عادت اجرا می‌شوند',
        tradeoff: 'برخی اقدام‌های روزمره به نفر دوم نیاز دارند.',
      },
      {
        title: 'آنچه ساخته نشد و دلیلش را نام ببر',
        why: 'کیف پول به دلیل نبود منبع داده حذف شد، گفت‌وگوی پشتیبانی به تعویق افتاد، و گزارش‌های مدیریتی کنار گذاشته شدند چون فرمول‌هایشان تأیید نشده است: عدد نادرست از نبود عدد بدتر است. عیب‌یابی و تعمیر کار کارگاه است، نه یک فرایند نرم‌افزاری.',
        alternatives: 'عرضهٔ داشبوردها با فرمول‌های موقت',
        tradeoff: 'مدیران تا زمانی که کسب‌وکار شاخص‌ها را تعریف نکند، گزارشی نمی‌گیرند.',
      },
    ],
    staffEvidence:
      'صفحهٔ اصلی پنل کارکنان: چهار شمارنده برای کارهایی که محصول مالک آن‌هاست، و هیچ چیز از صف تیکت‌ها.',
  },
  economics: {
    label: 'اقتصاد',
    heading: 'گارانتی یک بدهی است، نه یک خدمت',
    body: [
      'استدلال تجاری از بازار آغاز شد. مطالعه‌ای روی ۱۰۰ شرکت در بازار گارانتی و تعمیر کالاهای دیجیتال ایران، که ۱۸ مورد از آن‌ها به‌طور عمیق در برابر مسیر تعمیر دوازده‌مرحله‌ای ارزیابی شدند، به یک پرتگاه رسید: پنج مرحلهٔ نخست تا حد زیادی دیجیتال‌اند، و از تحویل دستگاه به بعد تقریباً هیچ چیز دیجیتال نیست. بهترین پلتفرم شش مرحله از دوازده را دیجیتال کرده است؛ میانگین ۴٫۱ است. به تعبیر خود مطالعه، بازار برای مشتری وب‌سایت ساخت، نه راه بازگشت.',
      'ارائهٔ دوم پرسید خود گارانتی چه هزینه‌ای دارد، و برای چه کسی. گارانتی یک بدهی احتمالی است — وعده‌ای که وقوع، زمان و میزانش همه نامعلوم‌اند — پس باید از امروز برایش پول کنار گذاشت. ارائه نشان می‌دهد چه کسی می‌تواند آن را تأمین مالی کند، و هر پاسخ می‌گوید برند چیست: اگر خرده‌فروش هزینه را جذب کند، یک مرکز هزینه؛ اگر فروشندگان کدها را بخرند، یک کسب‌وکار مستقل؛ اگر واردکننده بپردازد، شریکی که شبکه را اداره می‌کند. توصیهٔ آن با برچسب «یک پیشنهاد، نه یک تصمیم» آمده است.',
      'و با کنترل‌هایی مرتب‌شده بر اساس هزینه به پایان می‌رسد — ارزان‌ترینشان تنها یک فیلد است — و ده تصمیم با مالکان و گزینه‌هایشان، که هشت تای آن‌ها را می‌توان همین امروز و بدون هیچ عددی گرفت.',
    ],
    insight:
      'تنها اعدادی که در این ارائه مجازند، اعدادی‌اند که از کد استخراج شده‌اند، فرضی‌ای که برچسب فرضی خورده، یا بنچمارکی بیرونی همراه با منبع، جامعهٔ آماری، تاریخ و میزان اطمینانش — و هر اسلاید نشانی دارد که می‌گوید کدام.',
    marketCaption:
      'پرتگاه: مراحل یک تا پنج مسیر تعمیر در پلتفرم‌های بررسی‌شده ۳۳–۱۰۰٪ دیجیتال‌اند؛ مراحل شش تا دوازده، ۰–۱۱٪.',
    controlsCaption:
      'پنج اهرم کنترلی، مرتب از کم‌هزینه‌ترین تا پرهزینه‌ترین، هر یک پیوسته به عاملی از معادلهٔ هزینه که آن را جابه‌جا می‌کند.',
  },
  outcomes: {
    heading: 'پلتفرمی در انتظار تصمیم‌ها',
    intro:
      'هیچ شاخص کسب‌وکاری در کار نیست، و نباید هم باشد: پلتفرم روی محیط آزمایشی است، و شاخص‌های توافق‌شده هنوز فرمول یا منبع دادهٔ تأییدشده‌ای ندارند. هدف شش‌هفته‌ای فاز ۱ محقق نشد. سه موردی که یکپارچه‌سازی را متوقف کرده‌اند — دسترسی به سامانهٔ پشتیبانی موجود، قرارداد همگام‌سازی مشتریان، و تأیید مکتوب امنیت و حریم خصوصی — تصمیم‌اند، نه کار مهندسی، و هر مورد باز دیگر دوباره رده‌بندی شد تا فقط مانع ویژگی خودش باشد.',
    delivered: [
      {
        label: 'پلتفرمی تست‌شده روی محیط آزمایشی',
        context:
          'یک سایت عمومی، یک پنل مشتری و یک پنل کارکنان: ۲۶ کالکشن، ۹۲ فایل تست در پنج سطح، و CI روی هر push.',
      },
      {
        label: 'معماری فرایندی در ۱۴۵ بورد',
        context:
          '۲۲ فرایند ترسیم‌شده از نقشهٔ کلان تا دستورالعمل کاری، با شکاف‌هایی که علامت خورده‌اند، نه پر شده‌اند.',
      },
      {
        label: 'مطالعهٔ بازار روی ۱۰۰ شرکت',
        context: 'استدلالی برای اینکه ساختن کدام مراحل مسیر تعمیر در گام بعد ارزش دارد.',
      },
      {
        label: 'مدل اقتصاد گارانتی',
        context: 'بدهی، تأمین مالی و کنترل‌ها، بی‌آنکه حتی یک عدد ساختگی در آن باشد.',
      },
    ],
    shipped: [
      'سایت عمومی',
      'پنل مشتری',
      'پنل کارکنان',
      'معماری فرایند',
      'مطالعهٔ بازار',
      'ارائهٔ اقتصاد گارانتی',
    ],
  },
  lessons: {
    heading: 'یک انضباط، در هر خروجی',
    items: [
      {
        title: 'انتشار شکاف بهتر از پوشاندن آن است',
        body: 'کادر خط‌چین نارنجی کل پروژه در یک کامپوننت است. همین غریزه در همهٔ خروجی‌ها جریان دارد: NOT_READY به‌جای یک درصد، «نیازمند تعیین» روی کارت‌های فرایند، ستون خالی «پاسخ‌گو» با نواری که همین را می‌گوید، و نشان شواهد روی هر اسلاید.',
      },
      {
        title: 'عملیات را طراحی کن، نه فقط رابط کاربری را',
        body: 'صفحه‌ها بخش شناخته‌شده بودند. ترسیم آنچه هیچ‌کس نمی‌توانست توصیف کند، همان چیزی بود که یافته‌هایی را پدید آورد که در هیچ سندی نبود. نقشهٔ فرایندی که اجازه دارد ناقص بازگردد ابزار پژوهش است؛ نقشه‌ای که باید تمام‌شده به نظر برسد، تزئین است.',
      },
      {
        title: 'امتیاز آمادگی تا دامنه صادقانه نباشد معنایی ندارد',
        body: 'ممیزی نخست رد شد چون عملیاتی را می‌سنجید که این محصول مالکش نیست. محدود کردن آن به فرایندهایی که برند مالکشان است، استاندارد را پایین نیاورد — اطمینان شواهد را به ۹۲٪ رساند.',
      },
      {
        title: 'هر نظر بازبینی را به یک قاعده تبدیل کن',
        body: 'پاسخ دادن به یک نظر، یک نود را اصلاح می‌کند؛ نام‌گذاری قاعدهٔ پشت آن، همهٔ نودهای آینده را. یک یادداشت دربارهٔ املای فارسی به قاعده‌ای نام‌دار و یک دور اصلاح یکجا روی ۱٬۰۸۸ نود متنی در هر سیزده صفحه انجام شد.',
      },
    ],
  },
}

const AR: YarCopy = {
  statement:
    'منصة ضمان بُنيت على تشغيلٍ لم يدوّنه أحد، فصارت كل حقيقة غير مؤكدة فجوةً ظاهرة لها مالك.',
  industry: 'التجزئة · خدمات ما بعد البيع والضمان',
  team: 'المصمم الرئيسي ومهندس العمليات ومدير المنتج، مع فريق الهندسة لدى العميل ومسؤولَيه عن الأعمال وخدمات ما بعد البيع',
  heroCaption:
    'خريطة العمليات الكلية: ثماني عشرة عملية في خمسة مسارات، لكل بطاقة مالك ومُخرَج وشارة حالة.',
  snapshot: {
    problem:
      'تجاوزت وعود العلامة المعلنة ما يقدّمه التشغيل فعليًا، والتشغيل نفسه لم يكن مكتوبًا في أي وثيقة.',
    role: 'المصمم الرئيسي ومهندس العمليات ومدير المنتج: المتطلبات، وهندسة عمليات من 145 لوحة، والمنتج، والحجة السوقية.',
    result:
      'منصة مختبَرة تنتظر قرارات الأعمال، وأول توصيف مرسوم لعمليات ما بعد البيع. لا مؤشرات أعمال بعد.',
  },
  alt: {
    cover:
      'ياراوان — الصفحة الرئيسية للوحة العميل على سطح المكتب بالفارسية: الضمانات السارية، والطلبات المفتوحة، وزر لتسجيل طلب إصلاح',
    map: 'ياراوان — خريطة العمليات الكلية بالفارسية: ثماني عشرة بطاقة عملية في خمسة مسارات، لكلٍّ منها شارة حالة، وإشعار يُكمل الحصيلة',
    library:
      'ياراوان — مكتبة مكوّنات المخططات: سبعة أشكال للتدفق، وشارة حالة بأربع حالات، وترويسات المسارات، وشرائط التنقل التسلسلي، وبطاقات العمليات',
    notice:
      'ياراوان — لوحة إشعارات بالفارسية تسمّي تعليمات العمل التي لا يمكن كتابتها بعد، وسبب كلٍّ منها',
    swimlane:
      'ياراوان — مخطط المسارات لتفعيل ضمان العميل بالفارسية: مسارات العميل والنظام والرسائل النصية، وقرار واحد وحالتان للنهاية',
    raci: 'ياراوان — مصفوفة RACI بالفارسية، مع شريط أحمر يشير إلى أن عمود المساءلة لا يزال مفتوحًا، وخلايا حمراء للاستثناءات المتعمَّدة',
    pending:
      'ياراوان — صفحة التواصل بالفارسية: ستة مربعات برتقالية متقطعة الإطار، يسمّي كلٌّ منها معلومة لا تزال بانتظار الموافقة',
    request:
      'ياراوان — طلب إصلاح على الهاتف المحمول بالفارسية: رمز التتبع، والمشكلة المُبلَّغ عنها، وخط زمني للحالة',
    staff:
      'ياراوان — الصفحة الرئيسية للوحة الموظفين بالفارسية: أربعة عدّادات لطلبات الوكالات والفواتير والطلبيات المفتوحة وطلبات قطع الغيار',
    market:
      'ياراوان — دراسة السوق: مخطط لاثنتي عشرة مرحلة من رحلة الإصلاح، المراحل الخمس الأولى رقمية في معظمها، والمراحل من السادسة إلى الثانية عشرة بين صفر وأحد عشر بالمئة',
    controls:
      'ياراوان — اقتصاديات الضمان: خمس روافع للتحكم بالفارسية، مرتّبة من الأرخص إلى الأعلى كلفة، مع حالة كلٍّ منها اليوم',
  },
  context: {
    heading: 'هوية خاملة، ومنتج يعمل',
    body: [
      'ياراوان هي علامة الضمان وخدمات ما بعد البيع التابعة لشركة إيرانية لبيع الهواتف المحمولة بالتجزئة. كتبت وكالة خارجية هويتها التجارية في عام 2024 — وثيقة استراتيجية ودليلًا بصريًا — ثم لم يُبنَ عليها شيء.',
      'منذ يوليو 2026 كانت المهمة تحويل تلك الهوية إلى منتج يعمل: موقع فارسي مستقل، ولوحة للعملاء، ولوحة للموظفين. ويحتفظ نظام الدعم القائم بطابور التذاكر وعمليات الإصلاح؛ أما العمليات التي تملكها ياراوان، فياراوان هي المرجع فيها، ونظام الدعم يسجّلها ولا يديرها.',
    ],
  },
  problem: {
    heading: 'حيث ينبغي أن تكون الحقيقة',
    body: [
      'وعد الموقع القائم بأكثر مما كان التشغيل يقدّمه. فقد وجد عمل المتطلبات أن ادعاءاته الرئيسية لم تكن حقيقة تشغيلية، وأنه لم تكن هناك قاعدة بيانات حقيقية للضمانات — ولم يكن ترحيل البيانات لازمًا، لأنه لم تكن هناك بيانات.',
      'وفي العمق، لم يُدوَّن التشغيل قط. فالوثائق المصدرية المستشهد بها لعمليات التذاكر والإصلاح الفعلية لم تكن موجودة في أي مستودع، ولذلك كان على كل خريطة عمليات أن تكون تصميمًا للحالة المنشودة، لا سجلًا للحالة الراهنة. وتجاوزت طموحات العلامة — الفروع، والخدمة على مدار الساعة، والتوصيل، والتأمين المضمَّن — ذلك كله.',
      'فبقي سؤال تصميم حقيقي واحد: ماذا تضع في الصفحة حيث ينبغي أن تكون الحقيقة، حين لا يستطيع أحد بعدُ تأكيدها؟',
    ],
  },
  audit: {
    text: '«لا يُستبدَل NOT_READY بأي نسبة مئوية إيجابية أو سرد متفائل.»',
    attribution: 'تدقيق جاهزية المدخلات، الجولة الأولى',
    method: 'قاعدة كُتبت في التدقيق قبل تشغيله',
  },
  ownership: {
    heading: 'قيادة العمل، مع فريق العميل',
    intro:
      'قُدتُ تصميم المنتج والتشغيل الذي يقوم عليه، والبناء الذي تلاه، بمساهمة فريق الهندسة لدى العميل. وبقيت ملكية الأعمال لدى العميل: فمسؤول الأعمال لديه امتلك القرارات التجارية، ومسؤول خدمات ما بعد البيع امتلك عمليات الدعم التي يعتمد عليها المنتج.',
    own: [
      'المتطلبات والنطاق',
      'نظام العلامة، مستمدًّا من الملفات المصدرية',
      'هندسة العمليات، من الخريطة الكلية إلى تعليمات العمل',
      'مواصفات المنتج والواجهة',
      'تحليل السوق واقتصاديات الضمان',
    ],
    coOwn: ['بناء المنصة، مع فريق الهندسة لدى العميل'],
    collaborate: ['القرارات التجارية (مسؤول الأعمال)', 'عمليات الدعم (مسؤول خدمات ما بعد البيع)'],
    note: 'أُنجز البناء ومخططات العمليات بمساعدة الذكاء الاصطناعي، ويقول المستودع ذلك صراحةً: يحدّد دليله ترتيب مصادر الحقيقة وقواعد حل التعارضات التي جعلت ذلك آمنًا في نشاط تجاري كانت معظم حقائقه لا تزال مفتوحة.',
  },
  approach: {
    heading: 'بوابات لا مُخرَجات',
    body: [
      'انتهت كل مرحلة ببوابة لا بوثيقة. جاءت المتطلبات من خمسين سؤالًا مباشرًا متعدد الخيارات وُجِّهت إلى مسؤول الأعمال، في مواجهة معيار نجاح واحد: أن يستطيع فريق الهندسة البدء دون أن يعيد طرح أي سؤال أساسي. واستُخلص نظام العلامة بالهندسة العكسية من الملفات المصدرية، وحيث سكتت تلك الملفات تقول الوثائق ذلك بدلًا من سدّ الفجوة.',
      'ثم أُجري تدقيق للجاهزية — وأخفق. فعبر 59 مصدرًا و31 عملية أعاد النتيجة NOT_READY. ولم تجادل الجولة الثانية في الحكم؛ بل قلّصت النطاق إلى العمليات الـ13 التي تملكها العلامة فعلًا، ثم وسّعه تعديل لاحق مجددًا إلى 22، بإضافة الاستلام والتشخيص والإصلاح وإعادة التسليم وقطع الغيار.',
    ],
    insight:
      'رفع تقليص النطاق الجاهزية البنيوية من 49% إلى 78%، والثقة بالأدلة من 58% إلى 92% — لأن العمليات التي بقيت ضمن النطاق أمكن قراءتها من شيفرة قابلة للتنفيذ واختبارات ناجحة.',
    processHeading: 'ست بوابات، بالترتيب',
    steps: [
      { label: 'المتطلبات', note: 'خمسون سؤالًا لمسؤول الأعمال؛ ومقارنة مرجعية مع تسعة منافسين' },
      {
        label: 'نظام العلامة',
        note: 'قُرئ اللون من المسارات المتجهية للشعار، لا من عيّنة من صورة معروضة',
      },
      {
        label: 'تدقيق الجاهزية',
        note: 'NOT_READY: 12 عائقًا، و4 تعارضات، وأدوار في ثلاثة تصنيفات',
      },
      {
        label: 'تقليص النطاق',
        note: 'العمليات التي تملكها العلامة فقط؛ وأُعيد التدقيق على هذا النطاق',
      },
      { label: 'هندسة العمليات', note: '22 عملية مرسومة، من الخريطة الكلية إلى تعليمات العمل' },
      { label: 'الحجة التجارية', note: 'دراسة سوق ونموذج لاقتصاديات الضمان' },
    ],
  },
  research: {
    heading: 'ارسم القواعد قبل المخططات',
    body: [
      'لا يحتوي ملف Figma على أي شاشات: فقد حُدِّدت الواجهة كتابةً، وذهب الجهد التصميمي إلى الجزء الذي لم يستطع أحد وصفه — التشغيل. وصفحته الأولى ليست غلافًا بل صفحة قواعد: مكتبة مكوّنات من أربعة عشر جزءًا وست قواعد داخلية. يسير التدفق من اليمين إلى اليسار، كما تسير اللغة. وتُوسَم الفراغات بعبارة «يحتاج إلى تحديد»، ولا تُملأ أبدًا باسم أو رقم مُخمَّن. وتُسجَّل التعارضات ولا تُحسَم. ولا يحمل اللون معنى وحده أبدًا؛ بل يرافقه دائمًا شكل وأيقونة.',
      'قاعدة واحدة تحدّد شكل الملف كله: ما يجوز رسمه يتوقف على الأدلة التي تسنده، ادعاءً بادعاء. تمتد خمس درجات للأدلة من الشيفرة القابلة للتنفيذ، التي تُجيز مخطط مسارات كاملًا، نزولًا إلى انعدام أي مصدر، حيث يُحظر الرسم ولا يجوز أن يظهر إلا إشعار. وكلما انخفضت الدرجة، قلّ ما يجوز رسمه.',
      'وهكذا يكون الملف صادقًا بشأن ما يغيب عنه. فحيث يتوقف مستوى قبل اكتماله، تسمّي لوحة إشعارات ما هو مفقود ولماذا، وتُكمل إشعارات خريطة الخدمة ومخططات المسارات حسابها ليعود المجموع إلى 22. فمخطط لتسلسل غير موثَّق سيكون الاختلاق نفسه الذي تحظره القواعد — لكنه أكثر إقناعًا.',
    ],
    libraryCaption:
      'الصفحة 00: المكتبة التي يُبنى منها كل مخطط — سبعة أشكال للتدفق، وشارة حالة بأربع حالات، والعناصر التي تجعل الخريطة قابلة للتنقل.',
    noticeCaption:
      'غيابٌ مرسوم: ست تعليمات عمل لا يمكن كتابتها بعد، ومع كلٍّ منها الآلية أو السياسة المفقودة التي تعوقها.',
  },
  findings: {
    label: 'ما وجدته الخرائط',
    heading: 'الخريطة التي قد تعود ناقصة أداةُ بحث',
    body: [
      'أنتج رسم التشغيل نتائج لم تتضمنها أي وثيقة. فمن بين العمليات الأربع عشرة المرسومة مخططاتِ مسارات، لا ترسل رسالة نصية سوى اثنتين — رمز تسجيل الدخول وتفعيل الضمان — ولذلك دخلت مسودة نصوص الرسائل في هاتين الخريطتين تحديدًا. وأربع عمليات على الخريطة الكلية ليست لها بطاقة، لأن المصادر المستشهد بها لها غير موجودة.',
      'ولم يكن ممكنًا استخلاص مصفوفة المسؤوليات إلا بمقدار ثلاثة أرباعها. فقد خرجت أدوار المنفِّذ والمستشار والمُطَّلِع من الشيفرة؛ أما المساءلة فلم تخرج، لأن الشيفرة تقول من يستطيع تنفيذ إجراء، لا من يُسأل عن نتيجته. وتُشحن المصفوفة بهذا العمود مفتوحًا مع شريط يقول ذلك، وتُعلِّم الاستثناءات المتعمَّدة — الفصل بين المهام — باللون الأحمر كي لا تُحسَب فجوات.',
    ],
    swimlaneCaption:
      'تفعيل ضمان العميل: العميل والنظام وبوابة الرسائل النصية في ثلاثة مسارات، مع القرار الوحيد الذي يحيل رمزًا مستخدَمًا إلى الرفض.',
    raciCaption:
      'الصفوف الأحد عشر الأولى من مصفوفة العمليات الـ22. يُشحن العمود الرئيسي فارغًا، ويقول السبب. يذكر الشريط الفجوة ومن يملك القرار؛ والاسم مخفيّ هنا.',
  },
  solution: {
    heading: 'مؤشر الادعاء غير المؤكد',
    body: [
      'حيث تحتاج الصفحة إلى معلومة لم يوافق عليها أحد، تعرض مربعًا برتقاليًا متقطع الإطار يسمّي العنصر المفقود ومالكه — كتلة محتوى يضعها المحررون كأي كتلة أخرى. وأحصى مسح في منتصف أغسطس 32 عنصرًا مفتوحًا قائمًا في سبع من الصفحات العامة الثماني، ووجد أن خمسة موضوعات متكررة تستأثر بمعظمها. فإغلاق خمسة أمور يُغلق معظم الموقع.',
      'وفي الأساس منصة Payload وNext.js على PostgreSQL: موقع عام، ولوحة للعملاء، ولوحة للموظفين، كلها بالفارسية ومن اليمين إلى اليسار، مع 26 مجموعة و92 ملف اختبار على خمسة مستويات.',
    ],
    annotations: [
      'يسمّي كل مربع معلومة واحدة تحتاجها الصفحة، بدلًا من جملة واثقة.',
      'يميّز الإطار البرتقالي المتقطع العنصرَ المفتوح عن المحتوى المحيط به.',
      'يحمل كل مربع اسم من يجب أن يوافق عليه؛ والأسماء مخفية هنا.',
      'ستة في هذه الصفحة وحدها: هاتف الدعم، وساعات الهاتف والمحادثة، والبريد الإلكتروني، وعنوان المتجر، والتسجيل القانوني.',
    ],
    pendingCaption: 'صفحة التواصل: المعلومات التي لا تزال تحتاجها، مُدرجة حيث ستوضع.',
    requestCaption:
      'طلب إصلاح في لوحة العميل، مع الخط الزمني للحالة الذي يتابعه العميل. بيانات تجريبية.',
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
  },
  economics: {
    label: 'الاقتصاديات',
    heading: 'الضمان التزامٌ مالي، لا خدمة',
    body: [
      'بدأت الحجة التجارية من السوق. فقد وجدت دراسة شملت 100 شركة في سوق ضمان السلع الرقمية وإصلاحها في إيران، قُيِّمت 18 منها بعمق في مواجهة رحلة إصلاح من اثنتي عشرة مرحلة، هاويةً حادة: المراحل الخمس الأولى رقمية إلى حد كبير، ومن تسليم الجهاز فصاعدًا لا يكاد يكون أي شيء رقميًا. وأفضل منصة ترقمن ست مراحل من اثنتي عشرة؛ والمتوسط 4.1. وكما عبّرت الدراسة، بنت السوق للعميل موقعًا إلكترونيًا، لا طريقًا للعودة.',
      'وسألت وثيقة عرض ثانية عمّا يكلّفه الضمان نفسه، ولمن. فالضمان التزام محتمل — وعدٌ لا يُعرف هل يُستحق ولا متى ولا بكم — ولذلك يجب أن يُجنَّب له مال اليوم. وتعرض الوثيقة من يمكن أن يموّله، وكل إجابة تقول ما هي العلامة: إذا تحمّل تاجر التجزئة الكلفة، فهي مركز تكلفة؛ وإذا اشترى البائعون الرموز، فهي نشاط تجاري مستقل؛ وإذا دفع المستورد، فهي شريك يدير الشبكة. والتوصية موسومة بعبارة «مقترح، لا قرار».',
      'وتنتهي بضوابط مرتّبة بحسب الكلفة — أرخصها حقل واحد — وعشرة قرارات لها مالكون وخيارات، ثمانية منها يمكن اتخاذها اليوم دون أي رقم على الإطلاق.',
    ],
    insight:
      'الأرقام الوحيدة المسموح بها في الوثيقة هي تلك المستخرجة من الشيفرة، أو فرضية موسومة بأنها فرضية، أو معيار مرجعي خارجي مع مصدره ومجتمعه وتاريخه ودرجة الثقة به — وتحمل كل شريحة شارة تقول أيّها.',
    marketCaption:
      'الهاوية: المراحل من الأولى إلى الخامسة من رحلة الإصلاح رقمية بنسبة 33–100% عبر المنصات المدروسة؛ والمراحل من السادسة إلى الثانية عشرة بنسبة 0–11%.',
    controlsCaption:
      'خمس روافع للتحكم، مرتّبة من الأرخص إلى الأعلى كلفة، كلٌّ منها مرتبط بعامل معادلة الكلفة الذي يحرّكه.',
  },
  outcomes: {
    heading: 'منصة تنتظر القرارات',
    intro:
      'لا توجد مؤشرات أعمال، ولا ينبغي أن توجد: فالمنصة في بيئة ما قبل الإنتاج، والمقاييس المتفق عليها ليس لها بعد معادلة معتمدة أو مصدر بيانات. وقد فات هدف المرحلة الأولى البالغ ستة أسابيع. والعناصر الثلاثة التي تعوق التكامل — الوصول إلى نظام الدعم القائم، وعقد لمزامنة بيانات العملاء، وموافقة مكتوبة على الأمن والخصوصية — قرارات لا أعمال هندسية، وأُعيد تصنيف كل عنصر مفتوح آخر بحيث لا يعوق إلا الميزة الخاصة به.',
    delivered: [
      {
        label: 'منصة مختبَرة في بيئة ما قبل الإنتاج',
        context:
          'موقع عام ولوحة للعملاء ولوحة للموظفين: 26 مجموعة، و92 ملف اختبار على خمسة مستويات، وتشغيل CI مع كل دفع إلى المستودع.',
      },
      {
        label: 'هندسة عمليات من 145 لوحة',
        context:
          'رُسمت 22 عملية من الخريطة الكلية إلى تعليمات العمل، مع وسم الفجوات بدلًا من ملئها.',
      },
      {
        label: 'دراسة سوق لـ100 شركة',
        context: 'الحجة لتحديد مراحل رحلة الإصلاح الجديرة بأن تُبنى تاليًا.',
      },
      {
        label: 'نموذج لاقتصاديات الضمان',
        context: 'الالتزام والتمويل والضوابط، معروضة دون رقم مختلَق واحد.',
      },
    ],
    shipped: [
      'الموقع العام',
      'لوحة العملاء',
      'لوحة الموظفين',
      'هندسة العمليات',
      'دراسة السوق',
      'وثيقة اقتصاديات الضمان',
    ],
  },
  lessons: {
    heading: 'انضباط واحد في كل مُخرَج',
    items: [
      {
        title: 'إعلان الفجوة خير من التستّر عليها',
        body: 'المربع البرتقالي المتقطع هو المشروع كله في مكوّن واحد. والغريزة نفسها تسري في كل ناتج: NOT_READY بدلًا من نسبة مئوية، و«يحتاج إلى تحديد» على بطاقات العمليات، وعمود مساءلة فارغ مع شريط يقول ذلك، وشارة أدلة على كل شريحة.',
      },
      {
        title: 'صمِّم التشغيل، لا الواجهة فحسب',
        body: 'كانت الشاشات الجزء المعروف. ورسمُ ما لم يستطع أحد وصفه هو ما أنتج النتائج التي لم تتضمنها أي وثيقة. فخريطة العمليات المسموح لها بأن تعود ناقصة أداةُ بحث؛ أما تلك التي يجب أن تبدو مكتملة فزينة.',
      },
      {
        title: 'لا معنى لدرجة الجاهزية ما لم يكن النطاق صادقًا',
        body: 'أخفق التدقيق الأول لأنه قاس تشغيلًا لا يملكه هذا المنتج. وحصره في العمليات التي تملكها العلامة لم يخفض المعيار — بل رفع الثقة بالأدلة إلى 92%.',
      },
      {
        title: 'حوِّل كل تعليق مراجعة إلى قاعدة',
        body: 'الرد على تعليق يصلح عقدة واحدة؛ وتسمية القاعدة الكامنة وراءه تصلح كل عقدة مقبلة. فقد تحوّلت ملاحظة واحدة عن الإملاء الفارسي إلى قاعدة مسمّاة وإلى مرور واحد على 1,088 عقدة نصية في الصفحات الثلاث عشرة كلها.',
      },
    ],
  },
}

const ES: YarCopy = {
  statement:
    'Una plataforma de garantías sobre una operación que nadie había puesto por escrito: cada dato sin confirmar se volvió un hueco visible y con responsable.',
  industry: 'Retail · posventa y garantías',
  team: 'Diseñador principal, arquitecto de procesos y PM, con el equipo de ingeniería del cliente y sus responsables de negocio y de posventa',
  heroCaption:
    'El mapa macro de procesos: dieciocho procesos en cinco carriles, cada tarjeta con un responsable, un resultado y una insignia de estado.',
  snapshot: {
    problem:
      'Las promesas públicas de la marca iban por delante de la operación, y la propia operación no estaba escrita en ningún documento.',
    role: 'Diseñador principal, arquitecto de procesos y PM: requisitos, una arquitectura de procesos de 145 tableros, el producto y el caso de mercado.',
    result:
      'Una plataforma probada a la espera de decisiones de negocio, y la primera descripción dibujada de la operación de posventa. Aún no hay métricas de negocio.',
  },
  alt: {
    cover:
      'Yaravan — la página de inicio del panel de clientes en escritorio, en persa: garantías activas, solicitudes abiertas y un botón para registrar una reparación',
    map: 'Yaravan — el mapa macro de procesos en persa: dieciocho tarjetas de proceso en cinco carriles, cada una con una insignia de estado, y un aviso que cierra el recuento',
    library:
      'Yaravan — la biblioteca de componentes de diagramas: siete formas de flujo, una insignia de estado de cuatro estados, cabeceras de carril, migas de pan y tarjetas de proceso',
    notice:
      'Yaravan — un tablón de avisos en persa que nombra las instrucciones de trabajo que aún no pueden redactarse, y el motivo de cada una',
    swimlane:
      'Yaravan — el diagrama de carriles de la activación de la garantía por el cliente, en persa: carriles de cliente, sistema y SMS, una decisión y dos estados finales',
    raci: 'Yaravan — la matriz RACI en persa, con un banner rojo que marca como abierta la columna de Aprobador y celdas rojas para las exclusiones deliberadas',
    pending:
      'Yaravan — la página de contacto en persa: seis recuadros naranjas discontinuos, cada uno con un dato que sigue pendiente de aprobación',
    request:
      'Yaravan — una solicitud de reparación en móvil, en persa: el código de seguimiento, el problema declarado y una cronología de estados',
    staff:
      'Yaravan — la página de inicio del panel del personal en persa: cuatro contadores para solicitudes de concesionarios, facturas, pedidos abiertos y solicitudes de piezas',
    market:
      'Yaravan, estudio de mercado — un gráfico de las doce etapas del recorrido de reparación: las cinco primeras, mayoritariamente digitales; de la sexta a la duodécima, entre el cero y el once por ciento',
    controls:
      'Yaravan, economía de la garantía — cinco palancas de control en persa, ordenadas de la más barata a la más costosa, cada una con su estado actual',
  },
  context: {
    heading: 'Una identidad dormida, un producto en funcionamiento',
    body: [
      'Yaravan es la marca de garantías y posventa de un minorista iraní de teléfonos móviles. Una agencia externa redactó su identidad de marca en 2024 — un documento de estrategia y una guía visual — y después no se construyó nada sobre ella.',
      'Desde julio de 2026, el encargo fue convertir esa identidad en un producto en funcionamiento: un sitio web independiente en persa, un panel de clientes y un panel del personal. El sistema de soporte existente conserva la cola de tickets y la operación de reparación; en los procesos que son de Yaravan, Yaravan es la referencia, y el sistema de soporte los registra en lugar de ejecutarlos.',
    ],
  },
  problem: {
    heading: 'Donde debería haber un dato',
    body: [
      'El sitio existente prometía más de lo que la operación cumplía. El trabajo de requisitos descubrió que sus afirmaciones principales no reflejaban la realidad operativa y que no existía una base de datos real de garantías: no hacía falta migrar datos, porque no había datos.',
      'Por debajo, la operación nunca se había puesto por escrito. Los documentos de origen citados para los procesos reales de tickets y reparación no existían en ningún repositorio, así que cada mapa de procesos tenía que diseñar el estado deseado, no registrar el actual. Y las ambiciones de la marca — sucursales, servicio ininterrumpido, entrega a domicilio, seguro incluido — iban por delante de todo ello.',
      'Eso dejaba una sola pregunta de diseño real: ¿qué se pone en la página donde debería haber un dato, cuando nadie puede confirmarlo todavía?',
    ],
  },
  audit: {
    text: '«NOT_READY no debe sustituirse por ningún porcentaje positivo ni por un relato optimista.»',
    attribution: 'La auditoría de preparación de insumos, primera ronda',
    method: 'Una regla escrita en la auditoría antes de ejecutarla',
  },
  ownership: {
    heading: 'Liderar el trabajo, con el equipo del cliente',
    intro:
      'Dirigí el diseño del producto y de la operación que lo sostiene, y el desarrollo posterior, con la contribución del equipo de ingeniería del cliente. La responsabilidad de negocio siguió en manos del cliente: su responsable de negocio asumía las decisiones comerciales y su responsable de posventa, la operación de soporte de la que depende el producto.',
    own: [
      'Requisitos y alcance',
      'Sistema de marca, derivado de los archivos de origen',
      'Arquitectura de procesos, del mapa macro a la instrucción de trabajo',
      'Especificación del producto y de la interfaz',
      'Análisis de mercado y economía de la garantía',
    ],
    coOwn: ['El desarrollo de la plataforma, con el equipo de ingeniería del cliente'],
    collaborate: [
      'Decisiones comerciales (el responsable de negocio)',
      'La operación de soporte (el responsable de posventa)',
    ],
    note: 'El desarrollo y los diagramas de procesos contaron con asistencia de IA, y el repositorio lo dice abiertamente: su guía fija el orden de las fuentes de verdad y las reglas de conflicto que lo hicieron seguro en un negocio donde la mayoría de los datos seguían abiertos.',
  },
  approach: {
    heading: 'Puertas, no entregables',
    body: [
      'Cada etapa terminaba en una puerta de control y no en un documento. Los requisitos salieron de cincuenta preguntas directas de opción múltiple al responsable de negocio, con una única prueba de éxito: ingeniería puede empezar sin volver a preguntar nada fundamental. El sistema de marca se reconstruyó por ingeniería inversa a partir de los archivos de origen, y donde estos callaban, la documentación lo dice en lugar de rellenar el hueco.',
      'Después se ejecutó una auditoría de preparación, y no la superó. Sobre 59 fuentes y 31 procesos, el veredicto fue NOT_READY. La segunda ronda no discutió el veredicto: redujo el alcance a los 13 procesos que la marca realmente posee, y una enmienda posterior lo amplió de nuevo a 22, sumando recepción, diagnóstico, reparación, entrega de vuelta y piezas.',
    ],
    insight:
      'Reducir el alcance elevó la preparación estructural del 49% al 78% y la confianza en la evidencia del 58% al 92%, porque los procesos que quedaron dentro podían leerse en código ejecutable y en pruebas superadas.',
    processHeading: 'Seis puertas, en orden',
    steps: [
      {
        label: 'Requisitos',
        note: 'Cincuenta preguntas al responsable de negocio; nueve competidores analizados',
      },
      {
        label: 'Sistema de marca',
        note: 'El color, leído de los trazados vectoriales del logotipo, no muestreado de una imagen renderizada',
      },
      {
        label: 'Auditoría de preparación',
        note: 'NOT_READY: 12 bloqueos, 4 conflictos, roles en tres taxonomías',
      },
      {
        label: 'Recorte de alcance',
        note: 'Solo los procesos que son de la marca; la auditoría, repetida sobre ese alcance',
      },
      {
        label: 'Arquitectura',
        note: '22 procesos dibujados, del mapa macro a la instrucción de trabajo',
      },
      {
        label: 'Caso de negocio',
        note: 'Un estudio de mercado y un modelo de economía de la garantía',
      },
    ],
  },
  research: {
    heading: 'Dibujar las reglas antes que los diagramas',
    body: [
      'El archivo de Figma no contiene pantallas: la interfaz se especificó por escrito, y el esfuerzo de diseño se dedicó a la parte que nadie sabía describir, la operación. Su primera página no es una portada, sino una página de reglas: una biblioteca de componentes de catorce piezas y seis reglas de la casa. El flujo va de derecha a izquierda, como el idioma. Los vacíos se marcan «por determinar», nunca se rellenan con un nombre o un número supuestos. Los conflictos se registran, no se resuelven. El color nunca transmite significado por sí solo; siempre va acompañado de una forma y un icono.',
      'Una regla decide la forma de todo el archivo: lo que puede dibujarse depende de la evidencia que lo respalda, afirmación por afirmación. Cinco niveles de evidencia van desde el código ejecutable, que autoriza un diagrama de carriles completo, hasta la ausencia total de fuente, para la que dibujar está prohibido y solo puede aparecer un aviso. Cuanto más bajo el nivel, menos se puede dibujar.',
      'Así, el archivo es honesto sobre sus ausencias. Donde un nivel se queda corto, un tablón de avisos nombra lo que falta y por qué, y los avisos del mapa de servicios y de los diagramas de carriles cuadran su propia aritmética hasta 22. Un diagrama de una secuencia sin documentar sería la misma invención que prohíben las reglas, solo que más convincente.',
    ],
    libraryCaption:
      'Página 00: la biblioteca con la que se construye cada diagrama — siete formas de flujo, una insignia de estado de cuatro estados y los elementos que hacen navegable un mapa.',
    noticeCaption:
      'Una ausencia, dibujada: seis instrucciones de trabajo que aún no pueden redactarse, cada una con el mecanismo o la política que falta y que la bloquea.',
  },
  findings: {
    label: 'Lo que encontraron los mapas',
    heading: 'Un mapa que puede quedar incompleto es un instrumento de investigación',
    body: [
      'Dibujar la operación produjo hallazgos que ningún documento recogía. De los catorce procesos dibujados como diagramas de carriles, solo dos envían algún SMS — el código de acceso y la activación de la garantía —, así que el borrador de los mensajes fue exactamente a esos dos mapas. Cuatro procesos del mapa macro no tienen tarjeta, porque las fuentes citadas para ellos no existen.',
      'Y la matriz de responsabilidades solo pudo derivarse en tres cuartas partes. Responsable, consultado e informado salieron del código; el aprobador no, porque el código dice quién puede ejecutar una acción, no quién responde de su resultado. La matriz se entrega con esa columna abierta y un banner que lo indica, y marca en rojo las exclusiones deliberadas — segregación de funciones — para que no se confundan con huecos.',
    ],
    swimlaneCaption:
      'Activación de la garantía por el cliente: el cliente, el sistema y la pasarela de SMS en tres carriles, con la única decisión que envía un código ya usado al rechazo.',
    raciCaption:
      'Las once primeras filas de la matriz de 22 procesos. La columna principal se entrega vacía y dice por qué. El banner declara el hueco y quién tiene la decisión; aquí el nombre está oculto.',
  },
  solution: {
    heading: 'El marcador de afirmación sin confirmar',
    body: [
      'Donde una página necesita un dato que nadie ha aprobado, muestra un recuadro naranja discontinuo con el elemento que falta y su responsable: un bloque de contenido que los editores colocan como cualquier otro. Una revisión a mediados de agosto contó 32 elementos abiertos en vivo en siete de las ocho páginas públicas, y encontró que cinco temas recurrentes explican la mayoría. Cerrar cinco cosas cierra casi todo el sitio.',
      'Por debajo hay una plataforma Payload y Next.js sobre PostgreSQL: un sitio público, un panel de clientes y un panel del personal, todo en persa y de derecha a izquierda, con 26 colecciones y 92 archivos de pruebas en cinco niveles.',
    ],
    annotations: [
      'Cada recuadro nombra un dato que la página necesita, en lugar de una frase segura de sí misma.',
      'El marco naranja discontinuo separa un elemento abierto del contenido que lo rodea.',
      'Cada recuadro lleva el nombre de quien debe aprobarlo; aquí los nombres están ocultos.',
      'Seis solo en esta página: el teléfono de soporte, el horario de teléfono y chat, el correo electrónico, la dirección de la tienda y el registro legal.',
    ],
    pendingCaption: 'La página de contacto: los datos que aún necesita, listados donde irán.',
    requestCaption:
      'Una solicitud de reparación en el panel de clientes, con la cronología de estados que sigue el cliente. Datos de demostración.',
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
        why: 'Cada sistema externo está detrás de una sola capa de pasarela, probada frente a siete escenarios límite: éxito, error de validación, tiempo de espera agotado, duplicado, repetición, fuera de orden y estado desconocido, que queda pendiente en lugar de suponerse. Fuera de producción, una credencial ausente recurre a un simulador; en producción se lanza un error en lugar de informar de un envío que nunca ocurrió.',
        alternatives: 'Estados de éxito optimistas',
        tradeoff: 'Más estados que diseñar, y errores que el usuario puede ver.',
      },
      {
        title: 'Segregación de funciones en el producto, no solo en el papel',
        why: 'Quien emite una factura no puede aprobar por sí solo una anulación grande, y el rol que fija el límite de anulación no puede aprobar anulaciones: no puede elevar su propio límite. El menú, la protección de página y la comprobación en el servidor leen un mismo módulo, así que la interfaz y el servidor no pueden discrepar sobre un permiso.',
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
  },
  economics: {
    label: 'Economía',
    heading: 'Una garantía es un pasivo, no un servicio',
    body: [
      'El caso comercial empezó por el mercado. Un estudio de 100 empresas del mercado iraní de garantías y reparación de productos digitales, 18 de ellas evaluadas en profundidad frente a un recorrido de reparación de doce etapas, encontró un precipicio: las cinco primeras etapas son en gran parte digitales, y a partir de la entrega del dispositivo casi nada lo es. La mejor plataforma digitaliza seis etapas de doce; la media es 4,1. Como lo resumió el estudio, el mercado le construyó al cliente un sitio web, no un camino de vuelta.',
      'Un segundo documento preguntaba cuánto cuesta la propia garantía, y a quién. Una garantía es un pasivo contingente — una promesa cuyo si, cuándo y cuánto son desconocidos —, así que hay que reservar dinero para ella hoy. El documento expone quién podría financiarla, y cada respuesta dice qué es la marca: si el minorista absorbe el coste, un centro de costes; si los vendedores compran los códigos, un negocio independiente; si paga el importador, un socio que gestiona la red. La recomendación está etiquetada como «una propuesta, no una decisión».',
      'Termina con controles ordenados por coste — el más barato es un solo campo — y diez decisiones con responsables y opciones, ocho de las cuales pueden tomarse hoy sin ningún número.',
    ],
    insight:
      'Los únicos números permitidos en el documento son los extraídos del código, una hipótesis etiquetada como tal o una referencia externa con su fuente, población, fecha y nivel de confianza, y cada diapositiva lleva una insignia que indica cuál.',
    marketCaption:
      'El precipicio: las etapas uno a cinco del recorrido de reparación son digitales en un 33–100% en las plataformas estudiadas; las etapas seis a doce, en un 0–11%.',
    controlsCaption:
      'Cinco palancas de control, ordenadas de la más barata a la más costosa, cada una ligada al factor de la ecuación de costes que modifica.',
  },
  outcomes: {
    heading: 'Una plataforma a la espera de decisiones',
    intro:
      'No hay métricas de negocio, y no debería haberlas: la plataforma está en un entorno de preproducción, y las medidas acordadas aún no tienen fórmula aprobada ni fuente de datos. El objetivo de seis semanas de la Fase 1 no se cumplió. Los tres elementos que bloquean la integración — el acceso al sistema de soporte existente, un contrato de sincronización de clientes y una aprobación escrita de seguridad y privacidad — son decisiones, no ingeniería, y todos los demás elementos abiertos se reclasificaron para que solo bloqueen su propia funcionalidad.',
    delivered: [
      {
        label: 'Una plataforma probada en preproducción',
        context:
          'Un sitio público, un panel de clientes y un panel del personal: 26 colecciones, 92 archivos de pruebas en cinco niveles e integración continua en cada push.',
      },
      {
        label: 'Una arquitectura de procesos de 145 tableros',
        context:
          '22 procesos dibujados del mapa macro a la instrucción de trabajo, con los huecos marcados en lugar de rellenados.',
      },
      {
        label: 'Un estudio de mercado de 100 empresas',
        context:
          'Los argumentos sobre qué etapas del recorrido de reparación conviene construir a continuación.',
      },
      {
        label: 'Un modelo de economía de la garantía',
        context: 'Pasivo, financiación y controles, expuestos sin un solo número inventado.',
      },
    ],
    shipped: [
      'Sitio público',
      'Panel de clientes',
      'Panel del personal',
      'Arquitectura de procesos',
      'Estudio de mercado',
      'Documento de economía de la garantía',
    ],
  },
  lessons: {
    heading: 'Una sola disciplina, en cada entregable',
    items: [
      {
        title: 'Publicar el hueco es mejor que disimularlo',
        body: 'El recuadro naranja discontinuo es todo el proyecto en un solo componente. El mismo instinto recorre cada entregable: NOT_READY en lugar de un porcentaje, «por determinar» en las tarjetas de proceso, una columna de Aprobador vacía con un banner que lo indica y una insignia de evidencia en cada diapositiva.',
      },
      {
        title: 'Diseñar la operación, no solo la interfaz',
        body: 'Las pantallas eran la parte conocida. Dibujar lo que nadie sabía describir es lo que produjo los hallazgos que ningún documento recogía. Un mapa de procesos al que se le permite quedar incompleto es un instrumento de investigación; uno que tiene que parecer terminado es decoración.',
      },
      {
        title: 'Una puntuación de preparación no significa nada hasta que el alcance es honesto',
        body: 'La primera auditoría no se superó porque medía una operación que este producto no posee. Restringirla a los procesos que son de la marca no rebajó el listón: elevó la confianza en la evidencia al 92%.',
      },
      {
        title: 'Convertir cada comentario de revisión en una regla',
        body: 'Responder a un comentario corrige un nodo; nombrar la regla que hay detrás corrige todos los futuros. Una sola observación sobre la ortografía persa se convirtió en una regla con nombre y en una única pasada sobre 1088 nodos de texto en las trece páginas.',
      },
    ],
  },
}

const DE: YarCopy = {
  statement:
    'Eine Garantieplattform auf einem Betrieb, den niemand aufgeschrieben hatte: Jede unbestätigte Tatsache wurde zur sichtbaren Lücke mit Verantwortlichem.',
  industry: 'Einzelhandel · Kundendienst und Garantie',
  team: 'Lead Designer, Prozessarchitekt und PM, mit dem Engineering-Team des Kunden und seinen Verantwortlichen für Geschäft und Kundendienst',
  heroCaption:
    'Die Makro-Prozesslandkarte: achtzehn Prozesse in fünf Bahnen, jede Karte mit Verantwortlichem, Ergebnis und Status-Badge.',
  snapshot: {
    problem:
      'Die öffentlichen Versprechen der Marke gingen über den Betrieb hinaus, und der Betrieb selbst stand in keinem Dokument.',
    role: 'Lead Designer, Prozessarchitekt und PM: Anforderungen, eine Prozessarchitektur aus 145 Boards, das Produkt und der Marktbefund.',
    result:
      'Eine getestete Plattform, die auf geschäftliche Entscheidungen wartet, und die erste gezeichnete Darstellung des Kundendienstbetriebs. Noch keine Geschäftskennzahlen.',
  },
  alt: {
    cover:
      'Yaravan — die Startseite des Kundenbereichs auf dem Desktop, auf Persisch: aktive Garantien, offene Anfragen und eine Schaltfläche, um eine Reparatur anzumelden',
    map: 'Yaravan — die Makro-Prozesslandkarte auf Persisch: achtzehn Prozesskarten in fünf Bahnen, jede mit Status-Badge, und ein Hinweis, der die Zählung abschließt',
    library:
      'Yaravan — die Komponentenbibliothek der Diagramme: sieben Ablaufformen, ein Status-Badge mit vier Zuständen, Bahnköpfe, Breadcrumbs und Prozesskarten',
    notice:
      'Yaravan — eine Hinweistafel auf Persisch, die die Arbeitsanweisungen nennt, die sich noch nicht schreiben lassen, jeweils mit Begründung',
    swimlane:
      'Yaravan — das Swimlane-Diagramm der Garantieaktivierung durch den Kunden, auf Persisch: Bahnen für Kunde, System und SMS, eine Entscheidung und zwei Endzustände',
    raci: 'Yaravan — die RACI-Matrix auf Persisch, mit einem roten Banner, das die Spalte „Accountable“ als offen markiert, und roten Zellen für bewusste Ausschlüsse',
    pending:
      'Yaravan — die Kontaktseite auf Persisch: sechs gestrichelte orangefarbene Kästen, jeder benennt eine Tatsache, die noch auf Freigabe wartet',
    request:
      'Yaravan — eine Reparaturanfrage auf dem Smartphone, auf Persisch: der Tracking-Code, das gemeldete Problem und eine Status-Zeitleiste',
    staff:
      'Yaravan — die Startseite des Mitarbeiterbereichs auf Persisch: vier Zähler für Händleranfragen, Rechnungen, offene Aufträge und Ersatzteilanfragen',
    market:
      'Yaravan-Marktstudie — ein Diagramm mit zwölf Stationen der Reparatur-Journey: die ersten fünf überwiegend digital, die Stationen sechs bis zwölf zwischen null und elf Prozent',
    controls:
      'Yaravan-Garantieökonomie — fünf Steuerungshebel auf Persisch, vom günstigsten zum teuersten geordnet, jeder mit seinem heutigen Status',
  },
  context: {
    heading: 'Eine ruhende Identität, ein funktionierendes Produkt',
    body: [
      'Yaravan ist die Garantie- und Kundendienstmarke eines iranischen Mobiltelefonhändlers. Eine externe Agentur schrieb 2024 ihre Markenidentität — ein Strategiedeck und einen visuellen Leitfaden —, und dann wurde nichts darauf aufgebaut.',
      'Ab Juli 2026 bestand die Aufgabe darin, aus dieser Identität ein funktionierendes Produkt zu machen: eine eigenständige persische Website, einen Kundenbereich und einen Mitarbeiterbereich. Das bestehende Supportsystem behält die Ticket-Warteschlange und den Reparaturbetrieb; für die Prozesse, die Yaravan verantwortet, ist Yaravan die Referenz, und das Supportsystem dokumentiert sie, statt sie zu steuern.',
    ],
  },
  problem: {
    heading: 'Wo eine Tatsache stehen sollte',
    body: [
      'Die bestehende Website versprach mehr, als der Betrieb leistete. Die Anforderungsarbeit ergab, dass ihre zentralen Aussagen nicht der betrieblichen Wirklichkeit entsprachen und dass es keine echte Garantiedatenbank gab — eine Datenmigration war unnötig, weil es keine Daten gab.',
      'Darunter war der Betrieb nie aufgeschrieben worden. Die Quelldokumente, auf die sich die realen Ticket- und Reparaturprozesse beriefen, lagen in keinem Repository, also musste jede Prozesslandkarte ein Entwurf des Soll-Zustands sein, keine Aufzeichnung des Ist-Zustands. Und die Ambitionen der Marke — Filialen, Service rund um die Uhr, Lieferung, eine gebündelte Versicherung — gingen über all das hinaus.',
      'Damit blieb eine echte Designfrage: Was gehört auf die Seite, wo eine Tatsache stehen sollte, wenn noch niemand diese Tatsache bestätigen kann?',
    ],
  },
  audit: {
    text: '„NOT_READY darf durch keinen positiven Prozentsatz und keine optimistische Erzählung ersetzt werden.“',
    attribution: 'Das Audit der Input-Reife, erste Runde',
    method: 'Eine Regel, die vor dem Durchlauf in das Audit geschrieben wurde',
  },
  ownership: {
    heading: 'Die Arbeit leiten, mit dem Team des Kunden',
    intro:
      'Ich leitete das Design des Produkts und des Betriebs darunter sowie die anschließende Umsetzung, mit Beiträgen des Engineering-Teams des Kunden. Die geschäftliche Verantwortung blieb beim Kunden: Sein Verantwortlicher für das Geschäft traf die kaufmännischen Entscheidungen, und sein Verantwortlicher für den Kundendienst trug den Supportbetrieb, von dem das Produkt abhängt.',
    own: [
      'Anforderungen und Umfang',
      'Markensystem, aus den Quelldateien abgeleitet',
      'Prozessarchitektur, von der Makro-Landkarte bis zur Arbeitsanweisung',
      'Produkt- und Interface-Spezifikation',
      'Marktanalyse und Garantieökonomie',
    ],
    coOwn: ['Die Umsetzung der Plattform, mit dem Engineering-Team des Kunden'],
    collaborate: [
      'Kaufmännische Entscheidungen (der Verantwortliche für das Geschäft)',
      'Der Supportbetrieb (der Verantwortliche für den Kundendienst)',
    ],
    note: 'Die Umsetzung und die Prozessdiagramme entstanden KI-gestützt, und das Repository sagt das offen: Sein Leitfaden legt die Rangfolge der Quellen und die Konfliktregeln fest, die das in einem Geschäft sicher machten, in dem die meisten Tatsachen noch offen waren.',
  },
  approach: {
    heading: 'Prüftore statt Liefergegenstände',
    body: [
      'Jede Phase endete an einem Prüftor statt mit einem Dokument. Die Anforderungen stammten aus fünfzig direkten Multiple-Choice-Fragen an den Verantwortlichen für das Geschäft, gemessen an einem einzigen Erfolgstest: Das Engineering kann beginnen, ohne eine grundlegende Frage erneut stellen zu müssen. Das Markensystem wurde aus den Quelldateien rekonstruiert, und wo sie schwiegen, sagt die Dokumentation das, statt die Lücke zu füllen.',
      'Dann lief ein Reife-Audit — und scheiterte. Über 59 Quellen und 31 Prozesse hinweg lautete das Ergebnis NOT_READY. Die zweite Runde stritt nicht mit dem Urteil; sie beschränkte den Umfang auf die 13 Prozesse, die die Marke tatsächlich verantwortet, und eine spätere Ergänzung erweiterte ihn wieder auf 22, mit Annahme, Diagnose, Reparatur, Rücklieferung und Ersatzteilen.',
    ],
    insight:
      'Der kleinere Umfang hob die strukturelle Reife von 49 % auf 78 % und die Belastbarkeit der Nachweise von 58 % auf 92 % — weil sich die verbliebenen Prozesse aus ausführbarem Code und bestandenen Tests ablesen ließen.',
    processHeading: 'Sechs Prüftore, in dieser Reihenfolge',
    steps: [
      {
        label: 'Anforderungen',
        note: 'Fünfzig Fragen an den Verantwortlichen für das Geschäft; neun Wettbewerber im Benchmark',
      },
      {
        label: 'Markensystem',
        note: 'Farbe aus den Vektorpfaden des Logos gelesen, nicht aus einem Rendering abgegriffen',
      },
      {
        label: 'Reife-Audit',
        note: 'NOT_READY: 12 Blocker, 4 Konflikte, Rollen in drei Taxonomien',
      },
      {
        label: 'Umfang gekürzt',
        note: 'Nur die Prozesse, die die Marke verantwortet; das Audit auf diesem Umfang wiederholt',
      },
      {
        label: 'Architektur',
        note: '22 Prozesse gezeichnet, von der Makro-Landkarte bis zur Arbeitsanweisung',
      },
      {
        label: 'Business Case',
        note: 'Eine Marktstudie und ein Modell der Garantieökonomie',
      },
    ],
  },
  research: {
    heading: 'Erst die Regeln zeichnen, dann die Diagramme',
    body: [
      'Die Figma-Datei enthält keine Screens: Das Interface wurde schriftlich spezifiziert, und der Designaufwand floss in den Teil, den niemand beschreiben konnte — den Betrieb. Ihre erste Seite ist kein Deckblatt, sondern eine Regelseite: eine Komponentenbibliothek aus vierzehn Teilen und sechs Hausregeln. Abläufe laufen von rechts nach links, wie die Sprache. Leerstellen werden als „noch festzulegen“ markiert, nie mit einem geratenen Namen oder einer geratenen Zahl gefüllt. Konflikte werden festgehalten, nicht aufgelöst. Farbe trägt nie allein eine Bedeutung; sie tritt immer zusammen mit einer Form und einem Icon auf.',
      'Eine Regel bestimmt die Gestalt der ganzen Datei: Was gezeichnet werden darf, hängt von den Nachweisen dahinter ab, Aussage für Aussage. Fünf Nachweisstufen reichen von ausführbarem Code, der ein vollständiges Swimlane-Diagramm erlaubt, bis zu gar keiner Quelle, bei der Zeichnen verboten ist und nur ein Hinweis erscheinen darf. Je niedriger die Stufe, desto weniger darf gezeichnet werden.',
      'So ist die Datei ehrlich über ihre Leerstellen. Wo eine Ebene vorzeitig endet, nennt eine Hinweistafel, was fehlt und warum, und die Hinweise zur Service-Landkarte und zu den Swimlanes rechnen ihre eigene Zählung auf 22 zurück. Ein Diagramm einer undokumentierten Abfolge wäre dieselbe Erfindung, die die Regeln verbieten — nur überzeugender.',
    ],
    libraryCaption:
      'Seite 00: die Bibliothek, aus der jedes Diagramm gebaut ist — sieben Ablaufformen, ein Status-Badge mit vier Zuständen und das Mobiliar, das eine Landkarte navigierbar macht.',
    noticeCaption:
      'Eine Leerstelle, gezeichnet: sechs Arbeitsanweisungen, die sich noch nicht schreiben lassen, jede mit dem fehlenden Mechanismus oder der fehlenden Richtlinie, die sie blockiert.',
  },
  findings: {
    label: 'Was die Landkarten fanden',
    heading: 'Eine Landkarte, die unvollständig zurückkommen darf, ist ein Forschungsinstrument',
    body: [
      'Das Zeichnen des Betriebs brachte Befunde hervor, die kein Dokument enthielt. Von den vierzehn als Swimlanes gezeichneten Prozessen versenden nur zwei überhaupt eine SMS — der Anmeldecode und die Garantieaktivierung —, also kamen die Entwürfe der Nachrichtentexte in genau diese beiden Landkarten. Vier Prozesse auf der Makro-Landkarte haben keine Karte, weil die für sie angeführten Quellen nicht existieren.',
      'Und die Verantwortungsmatrix ließ sich nur zu drei Vierteln ableiten. Responsible, Consulted und Informed ergaben sich aus dem Code; Accountable nicht, denn der Code sagt, wer eine Aktion ausführen kann, nicht, wer für ihr Ergebnis einsteht. Die Matrix wird mit dieser Spalte offen und einem Banner ausgeliefert, das genau das sagt, und sie markiert bewusste Ausschlüsse — Funktionstrennung — in Rot, damit sie nicht mit Lücken verwechselt werden.',
    ],
    swimlaneCaption:
      'Garantieaktivierung durch den Kunden: Kunde, System und SMS-Gateway in drei Bahnen, mit der einen Entscheidung, die einen bereits verwendeten Code zur Ablehnung schickt.',
    raciCaption:
      'Die ersten elf Zeilen der Matrix über 22 Prozesse. Die Hauptspalte wird leer ausgeliefert und sagt, warum. Das Banner benennt die Lücke und wer die Entscheidung trägt; der Name ist hier ausgeblendet.',
  },
  solution: {
    heading: 'Der Marker für unbestätigte Aussagen',
    body: [
      'Wo eine Seite eine Tatsache braucht, die niemand freigegeben hat, zeigt sie einen orangefarbenen, gestrichelten Kasten, der das fehlende Element und seinen Verantwortlichen nennt — einen Inhaltsblock, den die Redaktion wie jeden anderen platziert. Eine Durchsicht Mitte August zählte 32 offene Punkte auf sieben der acht öffentlichen Seiten und ergab, dass fünf wiederkehrende Themen den Großteil davon ausmachen. Fünf Dinge zu klären, klärt den größten Teil der Website.',
      'Darunter liegt eine Plattform aus Payload und Next.js auf PostgreSQL: eine öffentliche Website, ein Kundenbereich und ein Mitarbeiterbereich, alle auf Persisch und von rechts nach links, mit 26 Collections und 92 Testdateien auf fünf Ebenen.',
    ],
    annotations: [
      'Jeder Kasten nennt eine Tatsache, die die Seite braucht, statt eines selbstsicheren Satzes.',
      'Der gestrichelte orangefarbene Rahmen hebt einen offenen Punkt vom umgebenden Inhalt ab.',
      'Jeder Kasten trägt den Namen dessen, der ihn freigeben muss; die Namen sind hier ausgeblendet.',
      'Sechs allein auf dieser Seite: die Support-Telefonnummer, die Telefon- und Chatzeiten, die E-Mail-Adresse, die Adresse des Geschäfts und die Handelsregistereintragung.',
    ],
    pendingCaption:
      'Die Kontaktseite: die Tatsachen, die ihr noch fehlen, dort aufgeführt, wo sie hingehören.',
    requestCaption:
      'Eine Reparaturanfrage im Kundenbereich, mit der Status-Zeitleiste, der der Kunde folgt. Demodaten.',
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
  },
  economics: {
    label: 'Ökonomie',
    heading: 'Eine Garantie ist eine Verbindlichkeit, keine Dienstleistung',
    body: [
      'Der kaufmännische Befund begann mit dem Markt. Eine Studie über 100 Unternehmen im iranischen Garantie- und Reparaturmarkt für digitale Geräte, 18 davon eingehend anhand einer Reparatur-Journey mit zwölf Stationen bewertet, fand eine Klippe: Die ersten fünf Stationen sind weitgehend digital, und ab der Übergabe des Geräts ist es fast nichts mehr. Die beste Plattform digitalisiert sechs von zwölf Stationen; der Durchschnitt liegt bei 4,1. Wie es die Studie formulierte: Der Markt hat dem Kunden eine Website gebaut, keinen Weg zurück.',
      'Ein zweites Deck fragte, was die Garantie selbst kostet, und wen. Eine Garantie ist eine Eventualverbindlichkeit — ein Versprechen, bei dem Ob, Wann und Wie viel unbekannt sind —, also muss heute Geld dafür zurückgelegt werden. Das Deck legt dar, wer sie finanzieren könnte, und jede Antwort sagt, was die Marke ist: Trägt der Händler die Kosten, ist sie ein Kostenzentrum; kaufen Verkäufer die Codes, ist sie ein eigenständiges Geschäft; zahlt der Importeur, ist sie ein Partner, der das Netzwerk betreibt. Die Empfehlung ist als „ein Vorschlag, keine Entscheidung“ gekennzeichnet.',
      'Es endet mit Steuerungshebeln, nach Kosten geordnet — der günstigste ist ein einzelnes Feld —, und zehn Entscheidungen mit Verantwortlichen und Optionen, von denen acht heute getroffen werden können, ganz ohne Zahl.',
    ],
    insight:
      'Die einzigen Zahlen, die im Deck erlaubt sind, stammen aus dem Code, sind ausdrücklich als hypothetisch gekennzeichnet oder sind ein externer Benchmark mit Quelle, Grundgesamtheit, Datum und Belastbarkeit — und jede Folie trägt ein Badge, das sagt, welche davon.',
    marketCaption:
      'Die Klippe: Die Stationen eins bis fünf der Reparatur-Journey sind über die untersuchten Plattformen hinweg zu 33–100 % digital; die Stationen sechs bis zwölf zu 0–11 %.',
    controlsCaption:
      'Fünf Steuerungshebel, vom günstigsten zum teuersten geordnet, jeder an den Faktor der Kostengleichung gebunden, den er bewegt.',
  },
  outcomes: {
    heading: 'Eine Plattform, die auf Entscheidungen wartet',
    intro:
      'Es gibt keine Geschäftskennzahlen, und es sollte auch keine geben: Die Plattform läuft auf Staging, und die vereinbarten Kennzahlen haben noch keine freigegebene Formel und keine Datenquelle. Das sechswöchige Ziel für Phase 1 wurde verfehlt. Die drei Punkte, die die Integration blockieren — Zugang zum bestehenden Supportsystem, ein Vertrag für die Kundensynchronisierung und eine schriftliche Freigabe zu Sicherheit und Datenschutz —, sind Entscheidungen, kein Engineering, und jeder andere offene Punkt wurde neu eingestuft, sodass er nur noch sein eigenes Feature blockiert.',
    delivered: [
      {
        label: 'Eine getestete Plattform auf Staging',
        context:
          'Eine öffentliche Website, ein Kundenbereich und ein Mitarbeiterbereich: 26 Collections, 92 Testdateien auf fünf Ebenen und CI bei jedem Push.',
      },
      {
        label: 'Eine Prozessarchitektur aus 145 Boards',
        context:
          '22 Prozesse, gezeichnet von der Makro-Landkarte bis zur Arbeitsanweisung, mit markierten statt gefüllten Lücken.',
      },
      {
        label: 'Eine Marktstudie über 100 Unternehmen',
        context:
          'Die Begründung dafür, welche Stationen der Reparatur-Journey als Nächstes gebaut werden sollten.',
      },
      {
        label: 'Ein Modell der Garantieökonomie',
        context:
          'Verbindlichkeit, Finanzierung und Steuerung, dargelegt ohne eine einzige erfundene Zahl.',
      },
    ],
    shipped: [
      'Öffentliche Website',
      'Kundenbereich',
      'Mitarbeiterbereich',
      'Prozessarchitektur',
      'Marktstudie',
      'Deck zur Garantieökonomie',
    ],
  },
  lessons: {
    heading: 'Eine Disziplin, in jedem Artefakt',
    items: [
      {
        title: 'Die Lücke zu veröffentlichen ist besser, als sie zu übertünchen',
        body: 'Der gestrichelte orangefarbene Kasten ist das ganze Projekt in einer Komponente. Derselbe Instinkt zieht sich durch jedes Artefakt: NOT_READY statt eines Prozentsatzes, „noch festzulegen“ auf den Prozesskarten, eine leere Spalte „Accountable“ mit einem Banner, das das sagt, und ein Nachweis-Badge auf jeder Folie.',
      },
      {
        title: 'Den Betrieb gestalten, nicht nur das Interface',
        body: 'Die Screens waren der bekannte Teil. Zu zeichnen, was niemand beschreiben konnte, brachte die Befunde hervor, die kein Dokument enthielt. Eine Prozesslandkarte, die unvollständig zurückkommen darf, ist ein Forschungsinstrument; eine, die fertig aussehen muss, ist Dekoration.',
      },
      {
        title: 'Ein Reifewert bedeutet nichts, solange der Umfang nicht ehrlich ist',
        body: 'Das erste Audit scheiterte, weil es einen Betrieb maß, den dieses Produkt nicht verantwortet. Die Beschränkung auf die Prozesse, die die Marke verantwortet, senkte den Maßstab nicht — sie hob die Belastbarkeit der Nachweise auf 92 %.',
      },
      {
        title: 'Jeden Review-Kommentar in eine Regel verwandeln',
        body: 'Einen Kommentar zu beantworten, korrigiert einen Knoten; die Regel dahinter zu benennen, korrigiert jeden künftigen. Ein Hinweis zur persischen Rechtschreibung wurde zu einer benannten Regel und einem einzigen Durchgang über 1.088 Textknoten auf allen dreizehn Seiten.',
      },
    ],
  },
}

const FR: YarCopy = {
  statement:
    'Une plateforme de garantie bâtie sur une opération que personne n’avait décrite : chaque fait non confirmé y devient une lacune visible, avec un responsable.',
  industry: 'Commerce de détail · après-vente et garantie',
  team: 'Designer principal, architecte des processus et chef de produit, avec l’équipe d’ingénierie du client et ses responsables métier et après-vente',
  heroCaption:
    'La carte macro des processus : dix-huit processus en cinq couloirs, chaque carte avec un responsable, un livrable et une pastille de statut.',
  snapshot: {
    problem:
      'Les promesses publiques de la marque dépassaient l’opération, et l’opération elle-même n’était consignée dans aucun document.',
    role: 'Designer principal, architecte des processus et chef de produit : exigences, une architecture des processus de 145 planches, le produit et le dossier marché.',
    result:
      'Une plateforme testée en attente de décisions métier, et la première description dessinée de l’opération d’après-vente. Pas encore d’indicateurs métier.',
  },
  alt: {
    cover:
      'Yaravan — l’accueil de l’espace client sur ordinateur, en persan : garanties actives, demandes en cours et un bouton pour déclarer une réparation',
    map: 'Yaravan — la carte macro des processus en persan : dix-huit cartes de processus en cinq couloirs, chacune avec une pastille de statut, et un avis qui boucle le décompte',
    library:
      'Yaravan — la bibliothèque de composants des diagrammes : sept formes de flux, une pastille de statut à quatre états, des en-têtes de couloir, un fil d’Ariane et des cartes de processus',
    notice:
      'Yaravan — un panneau d’avis en persan qui nomme les instructions de travail impossibles à rédiger pour l’instant, et la raison de chacune',
    swimlane:
      'Yaravan — le diagramme en couloirs de l’activation de la garantie par le client, en persan : couloirs client, système et SMS, une décision et deux états finaux',
    raci: 'Yaravan — la matrice RACI en persan, avec un bandeau rouge signalant que la colonne A (approbateur) reste ouverte, et des cellules rouges pour les exclusions délibérées',
    pending:
      'Yaravan — la page contact en persan : six encadrés orange en pointillés, chacun nommant un fait encore en attente de validation',
    request:
      'Yaravan — une demande de réparation sur mobile, en persan : le code de suivi, le problème signalé et une frise de statuts',
    staff:
      'Yaravan — l’accueil de l’espace collaborateurs en persan : quatre compteurs pour les demandes des concessionnaires, les factures, les commandes en cours et les demandes de pièces',
    market:
      'Étude de marché Yaravan — un graphique des douze étapes du parcours de réparation : les cinq premières majoritairement numériques, les étapes six à douze entre zéro et onze pour cent',
    controls:
      'Économie de la garantie Yaravan — cinq leviers de contrôle en persan, classés du moins cher au plus coûteux, chacun avec son statut actuel',
  },
  context: {
    heading: 'Une identité en sommeil, un produit qui fonctionne',
    body: [
      'Yaravan est la marque de garantie et d’après-vente d’un distributeur iranien de téléphones mobiles. Une agence extérieure a rédigé son identité de marque en 2024 — un document de stratégie et une charte graphique —, puis rien n’a été construit dessus.',
      'À partir de juillet 2026, il s’agissait de faire de cette identité un produit qui fonctionne : un site indépendant en persan, un espace client et un espace collaborateurs. Le système de support existant conserve la file de tickets et l’opération de réparation ; pour les processus que possède Yaravan, Yaravan fait référence, et le système de support les enregistre au lieu de les piloter.',
    ],
  },
  problem: {
    heading: 'Là où devrait figurer un fait',
    body: [
      'Le site existant promettait plus que ce que l’opération délivrait. Le travail sur les exigences a montré que ses promesses phares ne correspondaient pas à la réalité opérationnelle, et qu’aucune véritable base de données de garanties n’existait — aucune migration de données n’était nécessaire, faute de données.',
      'En dessous, l’opération n’avait jamais été consignée par écrit. Les documents sources cités pour les vrais processus de ticketing et de réparation n’existaient dans aucun dépôt, si bien que chaque carte de processus devait être le design de l’état souhaité, et non le relevé de l’état actuel. Et les ambitions de la marque — des agences, un service à toute heure, la livraison, une assurance incluse — dépassaient tout cela.',
      'Restait une seule vraie question de design : que mettre sur la page, là où devrait figurer un fait, quand personne ne peut encore le confirmer ?',
    ],
  },
  audit: {
    text: '« NOT_READY ne doit être remplacé par aucun pourcentage positif ni par aucun récit optimiste. »',
    attribution: 'L’audit de préparation des intrants, premier tour',
    method: 'Une règle inscrite dans l’audit avant son exécution',
  },
  ownership: {
    heading: 'Mener le travail, avec l’équipe du client',
    intro:
      'J’ai mené le design du produit et de l’opération qui le sous-tend, puis le développement qui a suivi, avec la contribution de l’équipe d’ingénierie du client. La responsabilité métier est restée au client : son responsable métier portait les décisions commerciales, et son responsable après-vente l’opération de support dont dépend le produit.',
    own: [
      'Exigences et périmètre',
      'Système de marque, dérivé des fichiers sources',
      'Architecture des processus, de la carte macro à l’instruction de travail',
      'Spécification du produit et de l’interface',
      'Analyse de marché et économie de la garantie',
    ],
    coOwn: ['Le développement de la plateforme, avec l’équipe d’ingénierie du client'],
    collaborate: [
      'Les décisions commerciales (le responsable métier)',
      'L’opération de support (le responsable après-vente)',
    ],
    note: 'Le développement et les diagrammes de processus ont été réalisés avec l’aide de l’IA, et le dépôt le dit ouvertement : son guide fixe l’ordre des sources de vérité et les règles de conflit qui ont rendu cela sûr, dans une activité où la plupart des faits restaient ouverts.',
  },
  approach: {
    heading: 'Des jalons, pas des livrables',
    body: [
      'Chaque étape se terminait par un jalon plutôt que par un document. Les exigences sont issues de cinquante questions directes à choix multiples posées au responsable métier, avec un seul critère de réussite : l’ingénierie peut démarrer sans avoir à reposer la moindre question fondamentale. Le système de marque a été reconstitué par rétro-ingénierie à partir des fichiers sources, et là où ils se taisaient, la documentation le dit au lieu de combler le vide.',
      'Puis un audit de préparation a été mené — et a échoué. Sur 59 sources et 31 processus, il a rendu NOT_READY. Le second tour n’a pas contesté le verdict : il a réduit le périmètre aux 13 processus que la marque possède réellement, et un amendement ultérieur l’a de nouveau élargi à 22, en ajoutant la réception, le diagnostic, la réparation, la livraison de retour et les pièces.',
    ],
    insight:
      'Réduire le périmètre a fait passer la préparation structurelle de 49 % à 78 % et la confiance dans les preuves de 58 % à 92 % — parce que les processus restés dans le périmètre pouvaient être lus dans du code exécutable et des tests qui passent.',
    processHeading: 'Six jalons, dans l’ordre',
    steps: [
      {
        label: 'Exigences',
        note: 'Cinquante questions au responsable métier ; neuf concurrents comparés',
      },
      {
        label: 'Système de marque',
        note: 'La couleur lue dans les tracés vectoriels du logo, pas prélevée sur un rendu',
      },
      {
        label: 'Audit de préparation',
        note: 'NOT_READY : 12 points bloquants, 4 conflits, des rôles répartis dans trois taxonomies',
      },
      {
        label: 'Réduction du périmètre',
        note: 'Uniquement les processus que possède la marque ; l’audit relancé sur ce périmètre',
      },
      {
        label: 'Architecture',
        note: '22 processus dessinés, de la carte macro à l’instruction de travail',
      },
      {
        label: 'Dossier économique',
        note: 'Une étude de marché et un modèle d’économie de la garantie',
      },
    ],
  },
  research: {
    heading: 'Dessiner les règles avant les diagrammes',
    body: [
      'Le fichier Figma ne contient aucun écran : l’interface a été spécifiée par écrit, et l’effort de design s’est porté sur la partie que personne ne savait décrire — l’opération. Sa première page n’est pas une couverture mais une page de règles : une bibliothèque de composants en quatorze parties et six règles maison. Le flux se lit de droite à gauche, comme la langue. Les blancs sont marqués « à déterminer », jamais remplis par un nom ou un chiffre deviné. Les conflits sont consignés, pas résolus. La couleur ne porte jamais seule un sens ; elle va toujours avec une forme et une icône.',
      'Une règle détermine la forme de tout le fichier : ce qui peut être dessiné dépend des preuves qui l’étayent, affirmation par affirmation. Cinq niveaux de preuve vont du code exécutable, qui autorise un diagramme en couloirs complet, à l’absence totale de source, pour laquelle le dessin est interdit et seul un avis peut apparaître. Plus le niveau est bas, moins on peut dessiner.',
      'Le fichier est donc honnête sur ses absences. Là où un niveau s’arrête court, un panneau d’avis nomme ce qui manque et pourquoi, et les avis de la carte des services et des diagrammes en couloirs bouclent leur propre calcul pour retomber sur 22. Un diagramme d’une séquence non documentée serait la même invention que les règles interdisent — seulement plus convaincante.',
    ],
    libraryCaption:
      'Page 00 : la bibliothèque à partir de laquelle chaque diagramme est construit — sept formes de flux, une pastille de statut à quatre états et le mobilier qui rend une carte navigable.',
    noticeCaption:
      'Une absence, dessinée : six instructions de travail qui ne peuvent pas encore être rédigées, chacune avec le mécanisme ou la politique manquante qui la bloque.',
  },
  findings: {
    label: 'Ce que les cartes ont révélé',
    heading: 'Une carte autorisée à revenir incomplète est un instrument de recherche',
    body: [
      'Dessiner l’opération a produit des constats qu’aucun document ne contenait. Sur les quatorze processus dessinés en couloirs, deux seulement envoient un SMS — le code de connexion et l’activation de la garantie —, si bien que les brouillons des textes de messages sont allés exactement dans ces deux cartes. Quatre processus de la carte macro n’ont pas de carte, parce que les sources citées pour eux n’existent pas.',
      'Et la matrice des responsabilités ne pouvait être dérivée qu’aux trois quarts. Réalisation, consultation et information sont sorties du code ; l’approbation (le A de RACI) ne le pouvait pas, car le code dit qui peut exécuter une action, pas qui répond de son résultat. La matrice est livrée avec cette colonne ouverte et un bandeau qui le signale, et elle marque en rouge les exclusions délibérées — la séparation des tâches — pour qu’on ne puisse pas les prendre pour des lacunes.',
    ],
    swimlaneCaption:
      'Activation de la garantie par le client : le client, le système et la passerelle SMS sur trois couloirs, avec l’unique décision qui envoie un code déjà utilisé vers le rejet.',
    raciCaption:
      'Les onze premières lignes de la matrice des 22 processus. La colonne principale est livrée vide, et dit pourquoi. Le bandeau énonce la lacune et qui détient la décision ; le nom est masqué ici.',
  },
  solution: {
    heading: 'Le marqueur d’affirmation non confirmée',
    body: [
      'Là où une page a besoin d’un fait que personne n’a validé, elle affiche un encadré orange en pointillés qui nomme l’élément manquant et son responsable — un bloc de contenu que les éditeurs placent comme n’importe quel autre. Un recensement à la mi-août a compté 32 éléments ouverts en ligne sur sept des huit pages publiques, et a montré que cinq sujets récurrents en représentent la plupart. Régler cinq choses règle l’essentiel du site.',
      'En dessous, une plateforme Payload et Next.js sur PostgreSQL : un site public, un espace client et un espace collaborateurs, entièrement en persan et de droite à gauche, avec 26 collections et 92 fichiers de tests sur cinq niveaux.',
    ],
    annotations: [
      'Chaque encadré nomme un fait dont la page a besoin, au lieu d’une phrase assurée.',
      'Le cadre orange en pointillés distingue un élément ouvert du contenu qui l’entoure.',
      'Chaque encadré porte le nom de la personne qui doit le valider ; les noms sont masqués ici.',
      'Six sur cette seule page : le téléphone du support, les horaires du téléphone et du chat, l’e-mail, l’adresse du magasin et l’immatriculation légale.',
    ],
    pendingCaption: 'La page contact : les faits qui lui manquent encore, listés là où ils iront.',
    requestCaption:
      'Une demande de réparation dans l’espace client, avec la frise de statuts que suit le client. Données de démonstration.',
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
  },
  economics: {
    label: 'Économie',
    heading: 'Une garantie est un passif, pas un service',
    body: [
      'Le dossier commercial est parti du marché. Une étude de 100 entreprises du marché iranien de la garantie et de la réparation des biens numériques, dont 18 évaluées en profondeur au regard d’un parcours de réparation en douze étapes, a mis au jour une falaise : les cinq premières étapes sont largement numériques et, à partir de la remise de l’appareil, presque rien ne l’est. La meilleure plateforme numérise six étapes sur douze ; la moyenne est de 4,1. Comme le dit l’étude, le marché a construit au client un site web, pas un chemin de retour.',
      'Un second document a demandé ce que coûte la garantie elle-même, et à qui. Une garantie est un passif éventuel — une promesse dont on ignore si elle jouera, quand et pour combien —, si bien qu’il faut mettre de l’argent de côté pour elle dès aujourd’hui. Le document expose qui pourrait la financer, et chaque réponse dit ce qu’est la marque : si le distributeur absorbe le coût, un centre de coûts ; si les vendeurs achètent les codes, une activité indépendante ; si l’importateur paie, un partenaire qui gère le réseau. La recommandation porte la mention « une proposition, pas une décision ».',
      'Il se termine par des leviers de contrôle classés par coût — le moins cher est un simple champ — et par dix décisions avec leurs responsables et leurs options, dont huit peuvent être prises dès aujourd’hui sans le moindre chiffre.',
    ],
    insight:
      'Les seuls chiffres admis dans le document sont ceux extraits du code, une hypothèse présentée comme telle, ou un benchmark externe avec sa source, sa population, sa date et son niveau de confiance — et chaque diapositive porte une pastille qui indique lequel.',
    marketCaption:
      'La falaise : les étapes un à cinq du parcours de réparation sont numériques à 33–100 % selon les plateformes étudiées ; les étapes six à douze, à 0–11 %.',
    controlsCaption:
      'Cinq leviers de contrôle, classés du moins cher au plus coûteux, chacun rattaché au facteur de l’équation de coût sur lequel il agit.',
  },
  outcomes: {
    heading: 'Une plateforme en attente de décisions',
    intro:
      'Il n’y a pas d’indicateurs métier, et il ne devrait pas y en avoir : la plateforme est en préproduction, et les mesures convenues n’ont encore ni formule validée ni source de données. L’objectif de six semaines de la phase 1 n’a pas été tenu. Les trois points qui bloquent l’intégration — l’accès au système de support existant, un contrat de synchronisation des clients et une validation écrite en matière de sécurité et de confidentialité — sont des décisions, pas de l’ingénierie, et chaque autre point ouvert a été reclassé pour ne bloquer que sa propre fonctionnalité.',
    delivered: [
      {
        label: 'Une plateforme testée en préproduction',
        context:
          'Un site public, un espace client et un espace collaborateurs : 26 collections, 92 fichiers de tests sur cinq niveaux, et une CI à chaque push.',
      },
      {
        label: 'Une architecture des processus de 145 planches',
        context:
          '22 processus dessinés de la carte macro à l’instruction de travail, avec les lacunes signalées plutôt que comblées.',
      },
      {
        label: 'Une étude de marché portant sur 100 entreprises',
        context:
          'L’argumentaire sur les étapes du parcours de réparation qui méritent d’être construites ensuite.',
      },
      {
        label: 'Un modèle d’économie de la garantie',
        context:
          'Passif, financement et leviers de contrôle, exposés sans un seul chiffre inventé.',
      },
    ],
    shipped: [
      'Site public',
      'Espace client',
      'Espace collaborateurs',
      'Architecture des processus',
      'Étude de marché',
      'Document sur l’économie de la garantie',
    ],
  },
  lessons: {
    heading: 'Une seule discipline, dans chaque livrable',
    items: [
      {
        title: 'Publier la lacune vaut mieux que la masquer',
        body: 'L’encadré orange en pointillés, c’est tout le projet en un seul composant. Le même réflexe traverse chaque livrable : NOT_READY au lieu d’un pourcentage, « à déterminer » sur les cartes de processus, une colonne A (approbateur) vide avec un bandeau qui le signale, et une pastille de preuve sur chaque diapositive.',
      },
      {
        title: 'Concevoir l’opération, pas seulement l’interface',
        body: 'Les écrans étaient la partie connue. C’est en dessinant ce que personne ne savait décrire que sont apparus les constats qu’aucun document ne contenait. Une carte de processus autorisée à revenir incomplète est un instrument de recherche ; une carte qui doit paraître finie est une décoration.',
      },
      {
        title: 'Un score de préparation ne veut rien dire tant que le périmètre n’est pas honnête',
        body: 'Le premier audit a échoué parce qu’il mesurait une opération que ce produit ne possède pas. Le restreindre aux processus que possède la marque n’a pas abaissé l’exigence — cela a porté la confiance dans les preuves à 92 %.',
      },
      {
        title: 'Transformer chaque commentaire de revue en règle',
        body: 'Répondre à un commentaire corrige un nœud ; nommer la règle qui le sous-tend corrige tous les suivants. Une remarque sur l’orthographe persane est devenue une règle nommée et une passe unique sur 1 088 nœuds de texte, sur les treize pages.',
      },
    ],
  },
}

const JA: YarCopy = {
  statement:
    '誰も書き留めてこなかった業務の上に築いた保証プラットフォーム。未確認の事実はすべて、担当者が明示された「見える空白」になった。',
  industry: '小売 · アフターサービスと保証',
  team: 'リードデザイナー、プロセスアーキテクト兼PM。クライアントのエンジニアリングチーム、事業部門とアフターサービス部門の責任者とともに',
  heroCaption:
    'マクロプロセスマップ。5つのレーンに18のプロセスが並び、各カードに担当者、アウトプット、ステータスバッジが付く。',
  snapshot: {
    problem:
      'ブランドが公に掲げる約束は業務の実態を追い越し、その業務自体はどの文書にも書かれていなかった。',
    role: 'リードデザイナー、プロセスアーキテクト兼PM：要件定義、145ボードのプロセスアーキテクチャ、製品、そして市場面の根拠。',
    result:
      '事業上の判断を待つ、テスト済みのプラットフォーム。そしてアフターサービス業務を初めて図として描いた記録。事業指標はまだない。',
  },
  alt: {
    cover:
      'Yaravan — ペルシア語のデスクトップ版カスタマーパネルのホーム。有効な保証、対応中のリクエスト、修理を登録するボタン',
    map: 'Yaravan — ペルシア語のマクロプロセスマップ。5つのレーンに18のプロセスカードが並び、それぞれにステータスバッジが付く。数の内訳を締めくくる注記も添えている',
    library:
      'Yaravan — 図のコンポーネントライブラリ。7つのフロー図形、4状態のステータスバッジ、レーンの見出し、パンくずリスト、プロセスカード',
    notice:
      'Yaravan — ペルシア語の注記ボード。まだ書けない作業手順書と、それぞれの理由を挙げている',
    swimlane:
      'Yaravan — ペルシア語の、顧客による保証有効化のスイムレーン。顧客、システム、SMSの3つのレーンに、1つの分岐と2つの終了状態',
    raci: 'Yaravan — ペルシア語のRACIマトリクス。赤いバナーがAccountable（説明責任者）の列を未決と示し、意図的な除外は赤いセルで示す',
    pending:
      'Yaravan — ペルシア語の問い合わせページ。オレンジの破線の枠が6つあり、それぞれがまだ承認待ちの事実を示す',
    request:
      'Yaravan — ペルシア語のモバイル版修理リクエスト。追跡コード、申告された不具合、ステータスのタイムライン',
    staff:
      'Yaravan — ペルシア語のスタッフパネルのホーム。販売店からのリクエスト、請求書、未完了の注文、部品リクエストの4つのカウンター',
    market:
      'Yaravan市場調査 — 修理ジャーニーの12段階を示すグラフ。最初の5段階はおおむねデジタル化され、6段階目から12段階目は0%から11%のあいだ',
    controls:
      'Yaravan保証の経済性 — ペルシア語で示した5つの管理レバー。最も安いものから最も高いものへ並び、それぞれに現在の状況が付く',
  },
  context: {
    heading: '眠っていたアイデンティティと、動く製品',
    body: [
      'Yaravanは、イランの携帯電話小売企業の保証・アフターサービスブランドである。2024年に外部のエージェンシーがブランドアイデンティティ — 戦略資料とビジュアルガイドライン — を作ったが、その上には何も築かれなかった。',
      '2026年7月からの仕事は、そのアイデンティティを動く製品に変えることだった。独立したペルシア語のウェブサイト、カスタマーパネル、スタッフパネルである。既存のサポートシステムは、チケットの処理待ち列と修理業務を引き続き担う。Yaravanが所有するプロセスについてはYaravanが基準となり、サポートシステムはそれを実行するのではなく記録する。',
    ],
  },
  problem: {
    heading: '事実があるべき場所',
    body: [
      '既存のサイトは、業務が実際に提供できる以上のことを約束していた。要件定義の作業で、その主要な主張が業務上の事実ではないこと、そして実際の保証データベースが存在しないことがわかった。データ移行は必要なかった。移すべきデータがなかったからである。',
      'その根底で、業務はこれまで一度も文書化されていなかった。実際のチケット処理と修理のプロセスの根拠として挙げられた資料は、どのリポジトリにも存在しなかった。そのため、どのプロセスマップも現状の記録ではなく、望ましい状態の設計にならざるをえなかった。さらにブランドの構想 — 支店網、24時間対応のサービス、配送、保険の付帯 — は、そのすべてを追い越していた。',
      'そこに残ったのは、本当の意味でのデザインの問いが一つだけだった。事実を確認できる人がまだ誰もいないとき、事実があるべき場所には何を置くのか。',
    ],
  },
  audit: {
    text: '「NOT_READYを、いかなる肯定的な割合や楽観的な説明で置き換えてはならない。」',
    attribution: '入力準備度の監査、第1ラウンド',
    method: '監査の実施前に、監査そのものに書き込まれたルール',
  },
  ownership: {
    heading: 'クライアントのチームとともに、仕事を率いる',
    intro:
      '私は製品とその根底にある業務のデザイン、そしてそれに続く実装を率い、クライアントのエンジニアリングチームがそこに加わった。事業上の責任はクライアント側に残った。事業部門の責任者が商業上の判断を担い、アフターサービス部門の責任者が、製品が依存するサポート業務を担った。',
    own: [
      '要件と範囲',
      'ソースファイルから導いたブランドシステム',
      'マクロマップから作業手順書までのプロセスアーキテクチャ',
      '製品とインターフェースの仕様',
      '市場分析と保証の経済性',
    ],
    coOwn: ['プラットフォームの実装（クライアントのエンジニアリングチームと共同）'],
    collaborate: [
      '商業上の判断（事業部門の責任者）',
      'サポート業務（アフターサービス部門の責任者）',
    ],
    note: '実装とプロセス図にはAIの支援を用いており、リポジトリはそれを隠さず明記している。そのガイドが情報源の優先順位と矛盾の扱いのルールを定めたことで、事実の大半がまだ未決の事業でも、それを安全に行えた。',
  },
  approach: {
    heading: '成果物ではなく、関門',
    body: [
      '各工程は文書ではなく関門で終わった。要件は、事業部門の責任者に向けた50の直接的な選択式の質問から得たもので、成功の基準は一つ。エンジニアリングが根本的な問いを一つも聞き直さずに着手できることである。ブランドシステムはソースファイルからリバースエンジニアリングし、ファイルが何も語っていない箇所は、空白を埋めずにその旨を文書に記した。',
      'そこで準備度の監査を実施し、結果は不合格だった。59の情報源と31のプロセスを対象に、判定はNOT_READY。第2ラウンドは判定に反論しなかった。範囲をブランドが実際に所有する13のプロセスに絞り、その後の修正で受付、診断、修理、返送、部品を加えて22まで再び広げた。',
    ],
    insight:
      '範囲を絞ったことで、構造面の準備度は49%から78%に、証拠の信頼度は58%から92%に上がった。範囲に残ったプロセスは、実行可能なコードと合格したテストから読み取れたからである。',
    processHeading: '6つの関門を、順に',
    steps: [
      { label: '要件定義', note: '事業部門の責任者への50の質問。競合9社をベンチマーク' },
      {
        label: 'ブランドシステム',
        note: '色はレンダリングから抽出せず、ロゴのベクターパスから読み取った',
      },
      { label: '準備度の監査', note: 'NOT_READY：阻害要因12、矛盾4、役割は3つの分類体系に分散' },
      {
        label: '範囲の絞り込み',
        note: 'ブランドが所有するプロセスだけに絞り、その範囲で監査を再実施',
      },
      { label: 'アーキテクチャ', note: 'マクロマップから作業手順書まで、22のプロセスを図示' },
      { label: '事業面の根拠', note: '市場調査と保証の経済性モデル' },
    ],
  },
  research: {
    heading: '図を描く前に、ルールを描く',
    body: [
      'Figmaファイルには画面が一つもない。インターフェースは文章で仕様化し、デザインの労力は誰も説明できなかった部分、つまり業務に注いだ。最初のページは表紙ではなくルールのページで、14の部品からなるコンポーネントライブラリと6つのハウスルールが置かれている。フローは言語と同じく右から左へ流れる。空白には「要確定」と記し、推測した名前や数字で埋めることはない。矛盾は解消せずに記録する。色だけで意味を伝えることはなく、必ず形とアイコンを伴わせる。',
      'ファイル全体の形を決めるルールが一つある。何を描いてよいかは、主張ごとに、その裏付けとなる証拠で決まる。証拠は5段階に分かれ、最上位の実行可能なコードならスイムレーンを完全に描けるが、最下位の根拠がまったくないものは描くことが禁じられ、注記だけが許される。段階が低いほど、描いてよいものは少なくなる。',
      'だからファイルは、欠けているものについて正直である。ある階層が途中で止まる箇所では、注記ボードが何が欠けていて、なぜなのかを示す。サービスマップとスイムレーンの注記は、自らの数の内訳を22に合わせて締めくくる。文書化されていない手順を図にすれば、ルールが禁じる創作と同じものになる。ただ、より説得力があるだけだ。',
    ],
    libraryCaption:
      'ページ00：すべての図の元になるライブラリ。7つのフロー図形、4状態のステータスバッジ、そしてマップを見て回れるようにする備品。',
    noticeCaption:
      '描かれた欠落。まだ書けない6つの作業手順書と、それぞれを阻んでいる欠けた仕組みや方針。',
  },
  findings: {
    label: 'マップが見つけたこと',
    heading: '不完全なまま戻ってきてよいマップは、調査の道具になる',
    body: [
      '業務を図にしたことで、どの文書にもなかった発見が生まれた。スイムレーンとして描いた14のプロセスのうち、SMSを送るのは2つだけ — ログインコードと保証の有効化 — だった。そのため、メッセージ文面の草案はちょうどその2つのマップに入れた。マクロマップ上の4つのプロセスにはカードがない。根拠として挙げられた資料が存在しないからである。',
      'そして責任分担マトリクスは、4分の3までしか導けなかった。Responsible（実行責任者）、Consulted（相談先）、Informed（報告先）はコードから導けたが、Accountable（説明責任者）は導けなかった。コードが語るのは誰が操作を実行できるかであって、誰がその結果に責任を負うかではないからだ。マトリクスはその列を空けたまま、そう明記したバナーを付けて出荷され、意図的な除外 — 職務の分離 — を赤で示して、空白と取り違えられないようにしている。',
    ],
    swimlaneCaption:
      '顧客による保証の有効化。顧客、システム、SMSゲートウェイの3つのレーンと、使用済みのコードを却下へ送る唯一の分岐。',
    raciCaption:
      '22プロセスのマトリクスの最初の11行。主要な列は空のまま出荷され、その理由を述べている。バナーは空白と、その判断を握る人を示す。名前はここでは伏せている。',
  },
  solution: {
    heading: '未確認の主張を示すマーカー',
    body: [
      'ページに誰も承認していない事実が必要な箇所では、欠けている項目とその担当者を記したオレンジの破線の枠を表示する。編集者がほかのブロックと同じように配置できるコンテンツブロックである。8月中旬の点検では、8つの公開ページのうち7ページで32の未決項目が見つかり、その大半が繰り返し現れる5つの主題に集中していることがわかった。5つを片づければ、サイトの大部分が片づく。',
      'その基盤は、PostgreSQL上のPayloadとNext.jsのプラットフォームである。公開サイト、カスタマーパネル、スタッフパネルがあり、すべてペルシア語で右から左に組まれ、26のコレクションと、5つのレベルにわたる92のテストファイルを持つ。',
    ],
    annotations: [
      '各枠は、自信ありげな一文の代わりに、ページが必要とする事実を一つ示す。',
      'オレンジの破線の枠が、未決の項目を周囲のコンテンツから区別する。',
      'どの枠にも承認すべき人の名前が入る。名前はここでは伏せている。',
      'このページだけで6つ：サポート窓口の電話番号、電話とチャットの対応時間、メールアドレス、店舗の住所、法人登記。',
    ],
    pendingCaption: '問い合わせページ。まだ必要な事実を、それが入る場所に並べている。',
    requestCaption:
      'カスタマーパネルの修理リクエストと、顧客が追うステータスのタイムライン。デモデータ。',
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
        alternatives: '暫定の計算式でダッシュボードを出荷する',
        tradeoff: '事業側が指標を定義するまで、管理者はレポートを得られない。',
      },
    ],
    staffEvidence:
      'スタッフパネルのホーム。製品が所有する仕事の4つのカウンターがあり、チケットの処理待ち列からは何も入っていない。',
  },
  economics: {
    label: '経済性',
    heading: '保証はサービスではなく、負債である',
    body: [
      '事業面の根拠は市場から始まった。イランのデジタル製品の保証・修理市場で100社を調べ、そのうち18社を12段階の修理ジャーニーに照らして詳しく評価した調査は、崖を見つけた。最初の5段階はおおむねデジタル化されているが、端末の引き渡しから先はほとんど何もデジタル化されていない。最も進んだプラットフォームでも12段階のうち6段階で、平均は4.1段階である。調査の言葉を借りれば、市場は顧客にウェブサイトを作ったが、戻ってくる道は作らなかった。',
      '2つ目の資料は、保証そのものにいくらかかり、誰が負担するのかを問うた。保証は偶発債務 — 発生するか、いつか、いくらかがすべて不明な約束 — であり、そのための資金を今日のうちに取り置かなければならない。資料は誰がそれを賄いうるかを示し、それぞれの答えがブランドの正体を語る。小売企業がコストを吸収するならコストセンター、販売者がコードを買うなら独立した事業、輸入業者が支払うならネットワークを運営するパートナーである。推奨には「決定ではなく提案」と明記している。',
      '資料の結びは、コスト順に並べた管理策 — 最も安いものはフィールド一つ — と、担当者と選択肢を付けた10の判断で、そのうち8つは数字が一つもなくても今日下せる。',
    ],
    insight:
      '資料で使ってよい数字は、コードから抽出したもの、仮定であると明示した仮定、あるいは出典、母集団、日付、信頼度を添えた外部のベンチマークに限られる。そして、どのスライドにもそのどれかを示すバッジが付いている。',
    marketCaption:
      '崖。修理ジャーニーの1〜5段階は、調査したプラットフォーム全体で33〜100%がデジタル化されているが、6〜12段階は0〜11%にとどまる。',
    controlsCaption:
      '最も安いものから最も高いものへ並べた5つの管理レバー。それぞれが、コスト方程式のどの要素を動かすかに結びついている。',
  },
  outcomes: {
    heading: '判断を待つプラットフォーム',
    intro:
      '事業指標はないし、あるべきでもない。プラットフォームはステージング環境にあり、合意した指標にはまだ承認された計算式もデータソースもない。6週間のフェーズ1の目標は達成できなかった。連携を阻んでいる3つの項目 — 既存のサポートシステムへのアクセス、顧客同期の契約、書面によるセキュリティとプライバシーの承認 — はエンジニアリングではなく判断の問題であり、ほかの未決項目はすべて、それぞれ自らの機能だけを止めるよう段階を振り直した。',
    delivered: [
      {
        label: 'ステージング環境の、テスト済みプラットフォーム',
        context:
          '公開サイト、カスタマーパネル、スタッフパネル。26のコレクション、5つのレベルにわたる92のテストファイル、そしてプッシュのたびに走るCI。',
      },
      {
        label: '145ボードのプロセスアーキテクチャ',
        context: 'マクロマップから作業手順書まで22のプロセスを図示し、空白は埋めずに明示した。',
      },
      {
        label: '100社を対象とした市場調査',
        context: '修理ジャーニーのどの段階を次に作る価値があるのか、その根拠。',
      },
      {
        label: '保証の経済性モデル',
        context: '負債、資金、管理策を、創作した数字を一つも使わずに示した。',
      },
    ],
    shipped: [
      '公開サイト',
      'カスタマーパネル',
      'スタッフパネル',
      'プロセスアーキテクチャ',
      '市場調査',
      '保証の経済性の資料',
    ],
  },
  lessons: {
    heading: 'ひとつの規律を、すべての成果物に',
    items: [
      {
        title: '空白は、取り繕うより公開するほうがいい',
        body: 'オレンジの破線の枠は、一つのコンポーネントに凝縮したプロジェクトそのものである。同じ姿勢はすべての成果物に通じている。割合の代わりのNOT_READY、プロセスカードの「要確定」、そう明記したバナー付きの空のAccountable列、そしてすべてのスライドに付いた証拠のバッジ。',
      },
      {
        title: 'インターフェースだけでなく、業務をデザインする',
        body: '画面はわかっている部分だった。誰も説明できなかったものを図にしたことが、どの文書にもなかった発見を生んだ。不完全なまま戻ってきてよいプロセスマップは調査の道具であり、完成して見えなければならないマップは飾りにすぎない。',
      },
      {
        title: '準備度のスコアは、範囲が正直になるまで何の意味もない',
        body: '最初の監査が不合格だったのは、この製品が所有していない業務を測っていたからである。ブランドが所有するプロセスに対象を絞っても、基準は下がらなかった。むしろ証拠の信頼度は92%まで上がった。',
      },
      {
        title: 'レビューのコメントを、一つずつルールに変える',
        body: 'コメントに答えれば一つのノードが直る。その背後にあるルールに名前を付ければ、この先のすべてのノードが直る。ペルシア語の綴りについての一つの指摘が、名前の付いたルールになり、13ページすべての1,088のテキストノードを一度で見直すことにつながった。',
      },
    ],
  },
}

const COPY: Record<Locale, YarCopy> = { en: EN, fa: FA, ar: AR, es: ES, de: DE, fr: FR, ja: JA }

export const YAR_MEDIA = Object.fromEntries(
  (Object.keys(MEDIA_FILES) as YarMediaKey[]).map((key) => [
    key,
    {
      ...MEDIA_FILES[key],
      alt: Object.fromEntries(LOCALES.map((locale) => [locale, COPY[locale].alt[key]])),
    },
  ]),
) as Record<YarMediaKey, MediaSpec>

const PROCESS_CODES: Six = ['REQ', 'BRND', 'AUD', 'SCOP', 'MAP', 'CASE']

export function yarSections(locale: Locale, media: YarMediaIds): Sections {
  const c = COPY[locale]
  const dir = dirFor(locale)
  const item = (key: YarMediaKey, id: string, caption?: string) =>
    media[key] ? [{ id, media: media[key]!, ...(caption ? { caption } : {}) }] : []
  const pad = (n: number) => String(n).padStart(2, '0')

  return [
    {
      id: 'yar-s01',
      blockType: 'csNarrative',
      label: 'context',
      heading: c.context.heading,
      body: prose(dir, ...c.context.body.map((value) => paragraph(value, dir))),
    },
    {
      id: 'yar-s02',
      blockType: 'csNarrative',
      label: 'problem',
      heading: c.problem.heading,
      body: prose(dir, ...c.problem.body.map((value) => paragraph(value, dir))),
    },
    {
      id: 'yar-s03',
      blockType: 'csOwnership',
      heading: c.ownership.heading,
      intro: c.ownership.intro,
      own: c.ownership.own,
      coOwn: c.ownership.coOwn,
      collaborate: c.ownership.collaborate,
      note: c.ownership.note,
    },
    {
      id: 'yar-s04',
      blockType: 'csNarrative',
      label: 'approach',
      heading: c.approach.heading,
      body: prose(dir, ...c.approach.body.map((value) => paragraph(value, dir))),
      insight: c.approach.insight,
    },
    {
      id: 'yar-s05',
      blockType: 'csFinding',
      kind: 'quote',
      text: c.audit.text,
      attribution: c.audit.attribution,
      method: c.audit.method,
    },
    {
      id: 'yar-s06',
      blockType: 'csProcess',
      kind: 'process',
      heading: c.approach.processHeading,
      steps: c.approach.steps.map((step, index) => ({
        id: `yar-p${pad(index + 1)}`,
        code: PROCESS_CODES[index],
        label: step.label,
        note: step.note,
      })),
    },
    {
      id: 'yar-s07',
      blockType: 'csNarrative',
      label: 'research',
      heading: c.research.heading,
      body: prose(dir, ...c.research.body.map((value) => paragraph(value, dir))),
    },
    {
      id: 'yar-s08',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'diagram',
      items: item('library', 'yar-f08-1'),
      caption: c.research.libraryCaption,
    },
    {
      id: 'yar-s09',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'diagram',
      items: item('notice', 'yar-f09-1'),
      caption: c.research.noticeCaption,
    },
    {
      id: 'yar-s10',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: c.findings.label,
      heading: c.findings.heading,
      body: prose(dir, ...c.findings.body.map((value) => paragraph(value, dir))),
    },
    {
      id: 'yar-s11',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'diagram',
      items: item('swimlane', 'yar-f11-1'),
      caption: c.findings.swimlaneCaption,
    },
    {
      id: 'yar-s12',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'diagram',
      items: item('raci', 'yar-f12-1'),
      // Was annotated until 2026-09-26; an explicit empty key clears the old localized rows.
      annotations: [],
      caption: c.findings.raciCaption,
    },
    {
      id: 'yar-s13',
      blockType: 'csNarrative',
      label: 'solution',
      heading: c.solution.heading,
      body: prose(dir, ...c.solution.body.map((value) => paragraph(value, dir))),
    },
    {
      id: 'yar-s14',
      blockType: 'csFigure',
      layout: 'annotated',
      treatment: 'plain',
      items: item('pending', 'yar-f14-1'),
      annotations: c.solution.annotations.map((text, index) => ({
        id: `yar-a${pad(index + 5)}`,
        text,
      })),
      caption: c.solution.pendingCaption,
    },
    {
      id: 'yar-s15',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'screen',
      items: item('request', 'yar-f15-1'),
      caption: c.solution.requestCaption,
    },
    {
      id: 'yar-s16',
      blockType: 'csDecisions',
      heading: c.decisions.heading,
      lede: c.decisions.lede,
      items: c.decisions.items.map((decision, index) => ({
        id: `yar-d${pad(index + 1)}`,
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
      id: 'yar-s17',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: c.economics.label,
      heading: c.economics.heading,
      body: prose(dir, ...c.economics.body.map((value) => paragraph(value, dir))),
      insight: c.economics.insight,
    },
    {
      id: 'yar-s18',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'plain',
      items: item('market', 'yar-f18-1'),
      caption: c.economics.marketCaption,
    },
    {
      id: 'yar-s19',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'plain',
      items: item('controls', 'yar-f19-1'),
      caption: c.economics.controlsCaption,
    },
    {
      id: 'yar-s20',
      blockType: 'csOutcomes',
      heading: c.outcomes.heading,
      intro: c.outcomes.intro,
      items: c.outcomes.delivered.map((outcome, index) => ({
        id: `yar-o${pad(index + 1)}`,
        kind: 'delivered' as const,
        label: outcome.label,
        context: outcome.context,
      })),
      shipped: c.outcomes.shipped,
    },
    {
      id: 'yar-s21',
      blockType: 'csLessons',
      heading: c.lessons.heading,
      items: c.lessons.items.map((lesson, index) => ({
        id: `yar-l${pad(index + 1)}`,
        title: lesson.title,
        body: lesson.body,
      })),
    },
  ]
}

export function yarLocalizedFields(locale: Locale, media: YarMediaIds) {
  const c = COPY[locale]
  const identity = ARCHIVE.text(locale)
  return {
    ...identity,
    statement: c.statement,
    industry: c.industry,
    team: c.team,
    hero: {
      items: media.map ? [{ id: 'yar-h01', media: media.map }] : [],
      caption: c.heroCaption,
    },
    snapshot: c.snapshot,
    sections: yarSections(locale, media),
    meta: {
      title: identity.title,
      description: identity.summary,
      ...(media.cover ? { image: media.cover } : {}),
    },
  }
}

export const YAR_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  projectStatus: 'pre-launch',
  tools: [
    'Figma',
    'Payload',
    'Next.js',
    'PostgreSQL',
    'Tailwind CSS',
    'Docker',
    'Playwright',
    'Vitest',
  ],
  period: { start: '2026-07-01T00:00:00.000Z' },
}
