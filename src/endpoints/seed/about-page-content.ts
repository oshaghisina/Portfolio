import type { RequiredDataFromCollectionSlug } from 'payload'

import { experiencesData } from './experiences'
import { heading, paragraph, richText } from './lexical-helpers'

type PageLayout = RequiredDataFromCollectionSlug<'pages'>['layout']
type PageHero = RequiredDataFromCollectionSlug<'pages'>['hero']

/**
 * About page content, English first (D-009's source locale) then the Persian overlay applied
 * after creation (see `localizeAboutLayoutFa`). Sourced from Docs/About-Me/Brand-Brief.md (hero,
 * biography), Docs/Experience/<Company>/README.md (career journey), and the Learnings sections
 * across Docs/Experience/Projects/ (thinking map, principles, team process).
 *
 * The biography was rewritten 2026-09-23 against Brand-Brief.md's `### Long bio`, which now covers
 * the independent practice as well as the salaried roles. Nothing here may assert a Tier 1 claim
 * from Brand-Brief.md §3b — that rules out the Carsparency conversion lift, the OTeacher
 * engagement increase and the Biomaze "first player" line, all removed on 2026-09-23. Tier 2
 * claims (the unquantified Arvan NPS line) stay, attributed to the résumé and without a number.
 * "Corporate Welfare" never appears — it isn't a real project. Personal content stays to what the
 * resume actually lists.
 */

export const aboutHeroRichTextEn = richText(
  heading("I'm interested in the point where product, business and technology stop being separate disciplines.", 'h1'),
  paragraph(
    'Ten years of moving from interface design toward broader ownership — vision, growth, the systems and dashboards underneath — because that’s usually where the actual problem lives.',
  ),
)

export const aboutHeroRichTextFa = richText(
  heading(
    'جذاب‌ترین بخش کارم، پیوند محصول، کسب‌وکار و فناوری است.',
    'h1',
  ),
  paragraph(
    'در ده سال گذشته از طراحی رابط به مسئولیت گسترده‌تری در چشم‌انداز محصول، رشد، سیستم‌ها و سنجش نتیجه رسیده‌ام؛ چون مسئلهٔ اصلی اغلب همان‌جاست.',
  ),
)

export const aboutMetaTitleEn = 'About — Sina Oshaghi'
export const aboutMetaDescriptionEn =
  'How a product designer became someone who thinks across product, business, growth and systems — trajectory, principles and current direction.'
export const aboutMetaTitleFa = 'درباره — سینا اوشاقی'
export const aboutMetaDescriptionFa =
  'مسیر من از طراحی محصول تا کار در پیوند محصول، کسب‌وکار، رشد و سیستم‌ها؛ همراه با اصول کار و مسیر امروز.'

// ---------------------------------------------------------------------------
// Biography (Content block, layout: editorial)

const biographyHeadingEn = heading('A hybrid, by accident and then by choice.', 'h2')
const biographyBodyEn = [
  paragraph(
    "I design and manage digital products, and then make sure they grow. Over ten years the work has spanned fintech (Digikala's Digital Gold), cloud infrastructure (Arvan Cloud), automotive marketplaces (Carsparency and Khodro45), education (OTeacher, Biomaze), media (Didestan), telecom (A1Paradise) and travel (Taha Gasht).",
  ),
  paragraph(
    "The pattern across those roles is unusual: the same person does the research, designs the product, runs the go-to-market, and builds the dashboards that say whether it worked. At Digikala that meant defining the vision and features for Digital Gold, designing the zero-fee, installment and gift-card campaigns, building segmentation models on assets, demographics and behaviour, and replacing the team's spreadsheets with BI dashboards tracking NMV, CTR, CPC and conversion.",
  ),
  paragraph(
    'Since 2022, working independently, the range has widened again — into the operation underneath the interface, and into the build itself. That has meant process architecture for an after-sales platform and a freight marketplace; an input-readiness audit that returned a documented no; and two products designed and shipped solo, both live and taking real traffic.',
  ),
  paragraph(
    'A rule runs through all of it: a wrong number is worse than no number. Unknowns get marked rather than guessed, contradictions get recorded rather than resolved, and every project file ends with what didn’t work.',
  ),
  paragraph(
    'I trained in industrial design at Azad University and keep studying interaction design through the Interaction Design Foundation. Off-screen: motorcycles, mountains, and an enduring interest in psychoanalysis — which turns out to be useful for user research.',
  ),
]

const biographyHeadingFa = heading(
  'چندمسیره؛ اول اتفاقی، بعد آگاهانه.',
  'h2',
)
const biographyBodyFa = [
  paragraph(
    'محصولات دیجیتال را طراحی و مدیریت می‌کنم و برای رشدشان هم کار می‌کنم. در این ده سال، از فین‌تک و زیرساخت ابری تا بازار خودرو، آموزش، رسانه، مخابرات و سفر کار کرده‌ام؛ در پروژه‌هایی مانند طلای دیجیتال دیجی‌کالا، ابر آروان، Carsparency، Khodro45، OTeacher، Biomaze، دیدستان، A1Paradise و طاهاگشت.',
  ),
  paragraph(
    'وجه مشترک این نقش‌ها، همراه‌کردن چند مسئولیت است: پژوهش، طراحی محصول، ورود به بازار و ساخت داشبوردهایی که نتیجه را نشان می‌دهند. در دیجی‌کالا، چشم‌انداز و قابلیت‌های طلای دیجیتال را تعریف کردم، کمپین‌های بدون کارمزد، اقساط و کارت هدیه را طراحی کردم، کاربران را بر اساس دارایی، ویژگی‌های جمعیتی و رفتار بخش‌بندی کردم و داشبوردهای هوش تجاری را جایگزین صفحه‌گسترده‌های تیم کردم.',
  ),
  paragraph(
    'از سال ۲۰۲۲ به‌صورت مستقل کار می‌کنم و بیش از پیش درگیر عملیات و ساخت محصول شده‌ام. برای یک پلتفرم خدمات پس از فروش و یک بازارگاه حمل‌ونقل فرایند طراحی کرده‌ام؛ در یک پروژه، پس از بررسی آمادگی داده‌های ورودی، با دلیل مکتوب توصیه کردم کار هنوز شروع نشود؛ و دو محصول را به‌تنهایی طراحی و عرضه کرده‌ام که اکنون هر دو کاربر واقعی دارند.',
  ),
  paragraph(
    'یک قاعده در همهٔ این کارها ثابت مانده است: عدد اشتباه از بی‌عددی بدتر است. مجهول‌ها را مشخص می‌کنم، تناقض‌ها را ثبت می‌کنم و در پروندهٔ هر پروژه می‌نویسم چه چیزهایی جواب نداد.',
  ),
  paragraph(
    'طراحی صنعتی را در دانشگاه آزاد خوانده‌ام و مطالعهٔ طراحی تعامل را از طریق Interaction Design Foundation ادامه می‌دهم. بیرون از کار، به موتورسیکلت، کوهستان و روان‌کاوی علاقه دارم؛ علاقهٔ آخری در پژوهش کاربر هم به کارم آمده است.',
  ),
]

// ---------------------------------------------------------------------------
// Career journey narratives (index-matched to experiencesData order) —
// selected stages only: A1Paradise(9) → Arvan Cloud(6) → Carsparency(2) → Digikala(1) → Independent(10)

export const careerStageOrder = [9, 6, 2, 1, 10]

const careerNarrativesEn: Record<number, string> = {
  9: 'The first real brief: turn a rough idea for microgames and a calling app into interfaces people could actually use. The craft came first — screens, flows, the discipline of shipping something that worked, not just something that looked right.',
  6: 'A shift from screens to systems. Redesigning a cloud platform meant learning what the metrics on the screen actually meant to the engineers reading them — the interface stopped being the product, and the information architecture became the real design problem.',
  2: 'Full platform ownership for the first time — not one screen or one flow, but Carsparency’s English/UAE marketplace. Four surfaces at once: Pro, the operator console, the inspector’s field tool and the seller’s web journey, all on one design system I authored.',
  1: 'The point where design, product and growth stopped being separate jobs. Vision, interface, the zero-fee and installment campaigns, the segmentation models, and the dashboards that replaced the team’s spreadsheets — all one connected practice, owned end to end.',
  10: 'Now: independent, and using that range on my own terms — eleven engagements since 2022, across warranty operations, freight, proptech, commodities and retail. Some end in a shipped product I built myself; some end in a written verdict that the work isn’t ready to start. Decisions get documented as they’re made, and AI is a working layer for exploring more directions before committing to one.',
}
const careerNarrativesFa: Record<number, string> = {
  9: 'اولین پروژهٔ جدی‌ام، تبدیل ایدهٔ بازی‌های کوچک و یک اپ تماس به رابط‌هایی بود که مردم بتوانند از آن‌ها استفاده کنند. آنجا کار با صفحه‌ها و جریان‌ها را یاد گرفتم و فهمیدم طراحی باید به محصولی کارآمد برسد.',
  6: 'در بازطراحی پلتفرم ابری، از طراحی صفحه به درک سیستم رسیدم. باید می‌فهمیدم شاخص‌های روی صفحه برای مهندسان چه معنایی دارند؛ مسئلهٔ اصلی، معماری اطلاعات بود.',
  2: 'برای نخستین بار مسئولیت یک پلتفرم کامل را بر عهده گرفتم: بازارگاه انگلیسی‌زبان Carsparency برای امارات. Pro، کنسول اپراتور، ابزار میدانی بازرس و وب فروشنده را بر پایهٔ سیستم طراحی‌ای که خودم تدوین کردم، پیش بردم.',
  1: 'در طلای دیجیتال، طراحی محصول و رشد در یک مسیر قرار گرفتند: از چشم‌انداز و رابط کاربری تا کمپین‌های بدون کارمزد و اقساط، بخش‌بندی کاربران و داشبوردهایی که جای صفحه‌گسترده‌های تیم را گرفتند.',
  10: 'از سال ۲۰۲۲ مستقل کار می‌کنم و در یازده همکاری در خدمات پس از فروش، حمل‌ونقل، املاک، کالاهای پایه و خرده‌فروشی نقش داشته‌ام. بعضی کارها به محصولی رسیده‌اند که خودم ساخته‌ام؛ در بعضی دیگر، با دلیل مکتوب گفته‌ام هنوز وقت شروع نیست. تصمیم‌ها را در زمان وقوع ثبت می‌کنم و از هوش مصنوعی برای بررسی مسیرهای بیشتر پیش از انتخاب یکی از آن‌ها کمک می‌گیرم.',
}
const relatedProjectByOrder: Partial<Record<number, string>> = {
  1: 'Selected work → Digital Gold',
}
const relatedProjectByOrderFa: Partial<Record<number, string>> = {
  1: 'پروژهٔ منتخب ← طلای دیجیتال',
}

// ---------------------------------------------------------------------------
// Thinking map (6 fixed nodes: Business, Product, User, System, Execution, Learning)

export const thinkingMapNodesEn = [
  { label: 'Business', annotation: 'Every design decision meets a business constraint eventually — better to know it going in.' },
  { label: 'Product', annotation: 'Where user needs and business constraints get reconciled into one roadmap.' },
  { label: 'User', annotation: "Research isn't a phase — it's what keeps the system honest." },
  { label: 'System', annotation: 'Map the whole system before optimizing any one surface of it.' },
  { label: 'Execution', annotation: 'Ship the smallest version that actually tests the assumption.' },
  { label: 'Learning', annotation: 'Dashboards over guesses — decisions get revisited when the data says to.' },
]
export const thinkingMapNodesFa = [
  { label: 'کسب‌وکار', annotation: 'هر تصمیم طراحی بالاخره با محدودیتی در کسب‌وکار روبه‌رو می‌شود. بهتر است آن را از ابتدا بشناسیم.' },
  { label: 'محصول', annotation: 'جایی که نیاز کاربر و محدودیت‌های کسب‌وکار در یک نقشهٔ راه به تصمیم تبدیل می‌شوند.' },
  { label: 'کاربر', annotation: 'پژوهش یک مرحلهٔ جداگانه نیست؛ کمک می‌کند تصمیم‌ها بر واقعیت تکیه داشته باشند.' },
  { label: 'سیستم', annotation: 'پیش از بهبود هر بخش، ارتباط آن را با کل سیستم روشن کن.' },
  { label: 'اجرا', annotation: 'کوچک‌ترین نسخه‌ای را بساز که بتواند فرض اصلی را بیازماید.' },
  { label: 'یادگیری', annotation: 'وقتی داده نتیجهٔ دیگری نشان می‌دهد، تصمیم را بازنگری کن.' },
]

// ---------------------------------------------------------------------------
// Principles (4)

export const principlesEn = [
  {
    title: 'Map the system before optimizing the surface.',
    description:
      'A redesigned screen is only as good as the information architecture underneath it — the interface is usually not the actual problem.',
    evidenceLabel: 'Seen in → Arvan Cloud',
  },
  {
    title: 'Decisions are documented with rationale, not just outcomes.',
    description:
      'A dated log of why a decision was made — not just what was decided — keeps a team working from the same current truth instead of arguing from stale assumptions.',
    evidenceLabel: 'Seen in → RP1 / Independent',
  },
  {
    title: 'Ownership means the dashboard, not just the design.',
    description:
      'Owning a product end to end means being responsible for the number that proves it worked, not handing that off once the interface ships.',
    evidenceLabel: 'Seen in → Digital Gold',
  },
  {
    title: 'Scope down to what a small team can actually ship.',
    description:
      'A large vision is easy to describe and hard to build — the useful skill is cutting it to the smallest version that still tests the real assumption.',
    evidenceLabel: 'Seen in → RP1 / Independent',
  },
]
export const principlesFa = [
  {
    title: 'پیش از بهبود صفحه، سیستم را بشناس.',
    description:
      'کیفیت یک صفحهٔ بازطراحی‌شده به معماری اطلاعات پشت آن بستگی دارد. مشکل اصلی اغلب خودِ رابط نیست.',
    evidenceLabel: 'نمونه در ابر آروان',
  },
  {
    title: 'دلیل تصمیم را هم ثبت کن.',
    description:
      'ثبتِ تاریخ‌دارِ دلیل هر تصمیم کمک می‌کند همهٔ تیم به یک مبنای به‌روز رجوع کنند، نه به برداشت‌های قدیمی.',
    evidenceLabel: 'نمونه در RP1 و پروژه‌های مستقل',
  },
  {
    title: 'مسئولیت محصول با تحویل طراحی تمام نمی‌شود.',
    description:
      'اگر مسئولیت محصول را از ابتدا تا انتها می‌پذیرم، باید شاخصی را هم پیگیری کنم که نشان می‌دهد نتیجه گرفته‌ایم یا نه.',
    evidenceLabel: 'نمونه در طلای دیجیتال',
  },
  {
    title: 'دامنه را به اندازهٔ توان تیم کوچک کن.',
    description:
      'چشم‌انداز بزرگ را می‌شود توضیح داد؛ دشوارتر این است که به کوچک‌ترین نسخه‌ای برسیم که هنوز فرض اصلی را می‌آزماید.',
    evidenceLabel: 'نمونه در RP1 و پروژه‌های مستقل',
  },
]

// ---------------------------------------------------------------------------
// Team process (6 fixed nodes + 1 statement)

export const teamProcessNodesEn = [
  { label: 'Business Context', annotation: "Where the constraint actually comes from — budget, timeline, a stakeholder's real goal." },
  { label: 'Product Decision', annotation: 'One person owns the call, with the context visible to everyone affected by it.' },
  { label: 'Design', annotation: 'Explores the option space before committing to one direction.' },
  { label: 'Engineering', annotation: "Enters early enough to shape what's feasible, not just build what's already decided." },
  { label: 'Validation', annotation: 'Usability testing and real usage data, not opinion, settle disagreements.' },
  { label: 'Learning', annotation: 'What worked and what didn’t feeds directly into the next Business Context.' },
]
export const teamProcessNodesFa = [
  { label: 'بستر کسب‌وکار', annotation: 'محدودیت از کجا می‌آید: بودجه، زمان‌بندی یا هدف واقعی ذی‌نفع؟' },
  { label: 'تصمیم محصول', annotation: 'مسئول تصمیم مشخص است و همهٔ افراد درگیر به اطلاعات لازم دسترسی دارند.' },
  { label: 'طراحی', annotation: 'پیش از انتخاب یک مسیر، گزینه‌های ممکن را بررسی می‌کند.' },
  { label: 'مهندسی', annotation: 'از ابتدا در تصمیم‌گیری حضور دارد و به تعیین راه‌حل شدنی کمک می‌کند.' },
  { label: 'اعتبارسنجی', annotation: 'آزمون کاربردپذیری و دادهٔ استفادهٔ واقعی، اختلاف‌نظرها را روشن می‌کنند.' },
  { label: 'یادگیری', annotation: 'نتیجهٔ کار، مبنای تصمیم بعدی در کسب‌وکار می‌شود.' },
]
export const teamProcessStatementsEn = [
  {
    title: 'Disagreements get resolved against a dated record, not memory.',
    description:
      'When two specs disagreed, the more recent and more thoroughly cross-referenced one won — marked explicitly, not quietly replaced, so the team kept working from the same current truth.',
  },
]
export const teamProcessStatementsFa = [
  {
    title: 'برای حل اختلاف‌نظر به سابقهٔ ثبت‌شده برگردید.',
    description:
      'وقتی دو سند مشخصات با هم تناقض داشتند، نسخهٔ جدیدتر و مستندتر را مبنا قرار دادیم و این انتخاب را صریح ثبت کردیم تا تیم بر اساس اطلاعات یکسان کار کند.',
  },
]

// ---------------------------------------------------------------------------
// Personal side (3)

export const personalSideItemsEn = [
  { title: 'Motorcycle & mountains', description: 'Adventure and nature, mostly on two wheels.' },
  { title: 'Travel', description: 'Exposure to different systems, markets and ways people solve the same problems.' },
  {
    title: 'Psychoanalysis',
    description: 'An enduring interest that turns out to be useful for user research — people rarely say the real reason first.',
  },
]
export const personalSideItemsFa = [
  { title: 'موتورسیکلت و کوهستان', description: 'ماجراجویی و طبیعت، بیشتر روی دو چرخ.' },
  { title: 'سفر', description: 'دیدن راه‌های متفاوتی که آدم‌ها و بازارها برای حل مسئله‌های مشابه پیدا می‌کنند.' },
  {
    title: 'روان‌کاوی',
    description: 'علاقه‌ای دیرینه که در پژوهش کاربر هم به کارم می‌آید؛ آدم‌ها معمولاً در ابتدا دلیل اصلی رفتارشان را نمی‌گویند.',
  },
]

// ---------------------------------------------------------------------------
// Now section

export const nowStatementEn = richText(
  paragraph(
    'Thinking about how AI changes the way products get scoped, designed and measured — and building small experiments to test it, not just reading about it.',
  ),
)
export const nowStatementFa = richText(
  paragraph(
    'این روزها بررسی می‌کنم هوش مصنوعی چطور بر تعیین دامنه، طراحی و سنجش محصول اثر می‌گذارد. برای آزمودن این تغییرها، آزمایش‌های کوچک می‌سازم.',
  ),
)

// ---------------------------------------------------------------------------
// Contact CTA (mirrors the homepage's cta pattern)

export const contactRichTextEn = richText(
  heading("If this way of working sounds useful, let's talk.", 'h3'),
  paragraph('For product, design and growth work, or comparing notes on systems and AI.'),
)
export const contactRichTextFa = richText(
  heading('اگر این شیوهٔ کار برایتان مفید است، گفت‌وگو کنیم.', 'h3'),
  paragraph('برای همکاری در محصول، طراحی و رشد، یا هم‌فکری دربارهٔ سیستم‌ها و هوش مصنوعی.'),
)

export {
  biographyBodyEn,
  biographyBodyFa,
  biographyHeadingEn,
  biographyHeadingFa,
  careerNarrativesEn,
  careerNarrativesFa,
  relatedProjectByOrder,
  relatedProjectByOrderFa,
}

export type { PageHero, PageLayout }
export { experiencesData }
