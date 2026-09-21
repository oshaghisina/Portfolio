import type { RequiredDataFromCollectionSlug } from 'payload'

import { experiencesData } from './experiences'
import { heading, paragraph, richText } from './lexical-helpers'

type PageLayout = RequiredDataFromCollectionSlug<'pages'>['layout']
type PageHero = RequiredDataFromCollectionSlug<'pages'>['hero']

/**
 * About page content, English first (D-009's source locale) then the Persian overlay applied
 * after creation (see `localizeAboutLayoutFa`). Sourced from Docs/About-Me/Brand-Brief.md (hero,
 * biography), Docs/Experience/<Company>/README.md (career journey), and
 * Docs/Experience/Projects/game-design/README.md's Learnings section (thinking map, principles,
 * team process — the richest real evidence in the repo). "Corporate Welfare" never appears —
 * it isn't a real project. Personal content stays to what the resume actually lists.
 */

export const aboutHeroRichTextEn = richText(
  heading("I'm interested in the point where product, business and technology stop being separate disciplines.", 'h1'),
  paragraph(
    'Ten years of moving from interface design toward broader ownership — vision, growth, the systems and dashboards underneath — because that’s usually where the actual problem lives.',
  ),
)

export const aboutHeroRichTextFa = richText(
  heading(
    'به نقطه‌ای علاقه دارم که در آن محصول، کسبوکار و فناوری دیگر رشته‌های جدا از هم نیستند.',
    'h1',
  ),
  paragraph(
    'ده سال حرکت از طراحی رابط به‌سمت مالکیت گسترده‌تر — چشم‌انداز، رشد، و سیستم‌ها و داشبوردهای زیرش — چون معمولاً مسئله‌ی واقعی همانجاست.',
  ),
)

export const aboutMetaTitleEn = 'About — Sina Oshaghi'
export const aboutMetaDescriptionEn =
  'How a product designer became someone who thinks across product, business, growth and systems — trajectory, principles and current direction.'
export const aboutMetaTitleFa = 'درباره — سینا اوشاقی'
export const aboutMetaDescriptionFa =
  'چطور یک طراح محصول به کسی تبدیل شد که در محصول، کسبوکار، رشد و سیستم‌ها فکر می‌کند — مسیر، اصول و جهت فعلی.'

// ---------------------------------------------------------------------------
// Biography (Content block, layout: editorial)

const biographyHeadingEn = heading('A hybrid, by accident and then by choice.', 'h2')
const biographyBodyEn = [
  paragraph(
    "I design and manage digital products, and then make sure they grow. Over ten years the work has spanned fintech (Digikala's Digital Gold), cloud infrastructure (Arvan Cloud), automotive marketplaces (Carsparency and Khodro45), education (OTeacher, Biomaze), media (Didestan) and telecom (A1Paradise).",
  ),
  paragraph(
    "The pattern across those roles is unusual: the same person does the research, designs the product, runs the go-to-market, and builds the dashboards that say whether it worked. At Digikala that meant defining the vision and features for Digital Gold, designing the zero-fee, installment and gift-card campaigns, building segmentation models on assets, demographics and behaviour, and replacing the team's spreadsheets with BI dashboards tracking NMV, CTR, CPC and conversion — while introducing concepts such as buy-now-pay-later and gold-backed credit.",
  ),
  paragraph(
    "Earlier, at Arvan Cloud, a redesign of the platform's information architecture around the metrics users actually needed produced measurable NPS growth. At Carsparency, a complete buy-and-sell platform for the UAE market was designed and tested until selling conversion rose.",
  ),
  paragraph(
    'I trained in industrial design at Azad University and keep studying interaction design through the Interaction Design Foundation. Off-screen: motorcycles, mountains, and an enduring interest in psychoanalysis — which turns out to be useful for user research.',
  ),
]

const biographyHeadingFa = heading(
  'ترکیبی از تخصص‌ها، از سر اتفاق و بعد از سر انتخاب.',
  'h2',
)
const biographyBodyFa = [
  paragraph(
    'من محصولات دیجیتال را طراح و مدیریت می‌کنم، و بعد مطمئن می‌شوم که رشد می‌کنند. در طول ده سال، این کار حوزه‌های فین‌تک (طلای دیجیتال دیجی‌کالا)، زیرساخت ابری (آروان کلاود)، بازارهای خودرو (کارسپرنسی و خودرو۴۵)، آموزش (اوتیچر، بایومیز)، رسانه (دیدستان) و تلکام (A1Paradise) را در بر گرفته است.',
  ),
  paragraph(
    'الگویی که در این نقش‌ها تکرار شده غیرمعمول است: یک نفر پژوهش را انجام می‌دهد، محصول را طراحی می‌کند، ورود به بازار را پیش می‌برد، و داشبوردهایی می‌سازد که نشان می‌دهند نتیجه داده یا نه. در دیجی‌کالا این یعنی تعیین چشم‌انداز و ویژگی‌های طلای دیجیتال، طراحی کمپین‌های بدون‌کارمزد، اقساطی و کارت هدیه، ساخت مدل‌های بخش‌بندی کاربران، و جایگزینی اکسل‌های تیم با داشبوردهای هوش تجاری بود — همراه با معرفی مفاهیمی مثل خرید اقساطی بدون‌بهره و اعتبار طلاپشتوانه.',
  ),
  paragraph(
    'پیشتر، در آروان کلاود، بازطراحی معماری اطلاعات پلتفرم بر اساس معیارهایی که کاربران واقعاً به آن‌ها نیاز داشتند، رشدی محسوس در NPS ایجاد کرد. در کارسپرنسی، یک پلتفرم کامل خرید و فروش برای بازار امارات طراحی و آزموده شد تا نرخ فروش بالا رفت.',
  ),
  paragraph(
    'تحصیلاتم را در طراحی صنعتی در دانشگاه آزاد گذراندم و همچنان طراحی تعامل را از طریق Interaction Design Foundation دنبال می‌کنم. بیرون از صفحه‌نمایش: موتورسیکلت، کوهستان، و علاقه‌ای پایدار به روان‌کاوی — که برای پژوهش کاربر هم به‌کار می‌آید.',
  ),
]

// ---------------------------------------------------------------------------
// Career journey narratives (index-matched to experiencesData order 1, 2, 6, 1(again for Digikala already used) —
// selected stages only: A1Paradise(9) → Arvan Cloud(6) → Carsparency & Khodro45(2) → Digikala(1) → Independent(10))

export const careerStageOrder = [9, 6, 2, 1, 10]

const careerNarrativesEn: Record<number, string> = {
  9: 'The first real brief: turn a rough idea for microgames and a calling app into interfaces people could actually use. The craft came first — screens, flows, the discipline of shipping something that worked, not just something that looked right.',
  6: 'A shift from screens to systems. Redesigning a cloud platform meant learning what the metrics on the screen actually meant to the engineers reading them — the interface stopped being the product, and the information architecture became the real design problem.',
  2: 'Full platform ownership for the first time — not one screen or one flow, but a whole buy-and-sell marketplace. Usability testing stopped being a step at the end and became the way decisions got made throughout.',
  1: 'The point where design, product and growth stopped being separate jobs. Vision, interface, the zero-fee and installment campaigns, the segmentation models, and the dashboards that replaced the team’s spreadsheets — all one connected practice, owned end to end.',
  10: 'Now: independent, and using that range on my own terms — scoping a much larger vision down to what a small team can actually ship, keeping decisions documented as they’re made, and treating AI as a working layer for exploring more directions before committing to one.',
}
const careerNarrativesFa: Record<number, string> = {
  9: 'اولین بریف واقعی: تبدیل یک ایده‌ی خام برای بازی‌های کوچک و یک اپ‌ تماس به رابط‌هایی که واقعاً قابل‌استفاده باشند. مهارت طراحی اول شکل گرفت — صفحه‌ها، فلوها، و انضباط ساختن چیزی که کار می‌کند، نه فقط چیزی که درست به‌نظر می‌رسد.',
  6: 'گذار از صفحه به سیستم. بازطراحی یک پلتفرم ابری یعنی یادگرفتن اینکه اعداد روی صفحه واقعاً برای مهندسانی که آن‌ها را می‌خوانند چه معنایی دارد — رابط کاربری دیگر خودمحصول نبود، و معماری اطلاعات به مسئله‌ی اصلی طراحی تبدیل شد.',
  2: 'برای اولین بار، مالکیت کامل یک پلتفرم — نه یک صفحه یا یک فلو، بلکه یک بازار کامل خرید و فروش. تست کاربردپذیری دیگر یک مرحله‌ی پایانی نبود، بلکه روش گرفتن تصمیم در تمام مسیر شد.',
  1: 'نقطه‌ای که طراحی، محصول و رشد دیگر کارهای جدا از هم نبودند. چشم‌انداز، رابط کاربری، کمپین‌های بدون‌کارمزد و اقساطی، مدل‌های بخش‌بندی، و داشبوردهایی که جای اکسل تیم را گرفت — همه یک عمل بههم‌پیوسته، از ابتدا تا انتها.',
  10: 'حالا: مستقل، و استفاده از این دامنه به شرط خودم — کوچک کردن یک چشم‌انداز بزرگ به چیزی که یک تیم کوچک واقعاً بتواند بسازد، مستندسازی تصمیم‌ها همزمان با گرفتنشان، و استفاده از هوش مصنوعی به‌عنوان یک لایه‌ی کاری برای کاوش مسیرهای بیشتر پیش از قطعی کردن یکی از آن‌ها.',
}
const relatedProjectByOrder: Partial<Record<number, string>> = {
  1: 'Selected work → Digital Gold',
}
const relatedProjectByOrderFa: Partial<Record<number, string>> = {
  1: 'کار منتخب → طلای دیجیتال',
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
  { label: 'کسبوکار', annotation: 'هر تصمیم طراحی دیر یا زود به یک محدودیت کسبوکاری می‌رسد — بهتر است از همان ابتدا آن را بشناسیم.' },
  { label: 'محصول', annotation: 'جایی که نیاز کاربر و محدودیت‌های کسبوکار در یک نقشه‌راه با هم آشتی می‌کنند.' },
  { label: 'کاربر', annotation: 'پژوهش یک مرحله نیست — چیزی‌ست که سیستم را صادق نگه می‌دارد.' },
  { label: 'سیستم', annotation: 'پیش از بهینه‌سازی هر بخش، کل سیستم را نقشه‌برداری کن.' },
  { label: 'اجرا', annotation: 'کوچک‌ترین نسخه‌ای را بساز که واقعاً فرض را می‌آزماید.' },
  { label: 'یادگیری', annotation: 'داشبورد به‌جای حدس — تصمیم‌ها وقتی داده بگوید بازبینی می‌شوند.' },
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
    title: 'پیش از بهینه‌سازی سطح، سیستم را نقشه‌برداری کن.',
    description:
      'یک صفحه‌ی بازطراحی‌شده به‌اندازه‌ی معماری اطلاعاتی که زیرش قرار دارد خوب است — معمولاً رابط کاربری مسئله‌ی واقعی نیست.',
    evidenceLabel: 'دیده‌شده در → آروان کلاود',
  },
  {
    title: 'تصمیم‌ها با دلیلشان مستند می‌شوند، نه فقط نتیجه‌شان.',
    description:
      'یک لاگ تاریخ‌دار از اینکه چرا یک تصمیم گرفته شد — نه فقط چه تصمیمی — تیم را روی یک حقیقت مشترک به‌روز نگه می‌دارد، نه بحث از روی فرض‌های قدیمی.',
    evidenceLabel: 'دیده‌شده در → RP1 / مستقل',
  },
  {
    title: 'مالکیت یعنی داشبورد، نه فقط طراحی.',
    description:
      'مالکیت سراسری یک محصول یعنی مسئولیت عددی که نشان می‌دهد کار کرده، نه واگذاری آن بعد از تحویل رابط کاربری.',
    evidenceLabel: 'دیده‌شده در → طلای دیجیتال',
  },
  {
    title: 'دامنه را به چیزی کوچک کن که یک تیم کوچک واقعاً بتواند بسازد.',
    description:
      'توصیف یک چشم‌انداز بزرگ ساده است و ساختنش سخت — مهارت اصلی این است که آن را به کوچک‌ترین نسخه‌ای برسانی که هنوز فرض واقعی را می‌آزماید.',
    evidenceLabel: 'دیده‌شده در → RP1 / مستقل',
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
  { label: 'زمینه‌ی کسبوکار', annotation: 'جایی که محدودیت واقعاً از آن می‌آید — بودجه، زمان‌بندی، هدف واقعی یک ذی‌نفع.' },
  { label: 'تصمیم محصول', annotation: 'یک نفر مسئول تصمیم است، با زمینه‌ای که برای همه‌ی افراد درگیر قابل‌مشاهده است.' },
  { label: 'طراحی', annotation: 'پیش از قطعی‌کردن یک مسیر، فضای گزینه‌ها را می‌کاود.' },
  { label: 'مهندسی', annotation: 'به‌اندازه کافی زود وارد می‌شود تا امکان‌پذیری را شکل دهد، نه فقط چیزی را بسازد که از پیش تصمیم‌گیری شده.' },
  { label: 'اعتبارسنجی', annotation: 'تست کاربردپذیری و داده‌ی واقعی استفاده، نه نظر، اختلاف‌نظرها را حل می‌کند.' },
  { label: 'یادگیری', annotation: 'آنچه کار کرد و آنچه نکرد، مستقیماً به زمینه‌ی کسبوکار بعدی می‌رود.' },
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
    title: 'اختلاف‌نظرها بر اساس یک رکورد تاریخ‌دار حل می‌شوند، نه حافظه.',
    description:
      'وقتی دو مشخصات با هم تناقض داشتند، نسخه‌ی جدیدتر و ارجاع‌داده‌شده‌تر برنده بود — به‌صراحت علامت‌گذاری شد، نه بی‌سروصدا جایگزین، تا تیم روی همان حقیقت مشترک به‌روز کار کند.',
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
  { title: 'سفر', description: 'مواجهه با سیستم‌ها، بازارها و شیوه‌های متفاوت حل همان مسئله‌ها.' },
  {
    title: 'روان‌کاوی',
    description: 'علاقه‌ای پایدار که برای پژوهش کاربر هم به‌کار می‌آید — آدم‌ها معمولاً دلیل واقعی را اول نمی‌گویند.',
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
    'اینکه هوش مصنوعی چطور شیوه‌ی تعیین دامنه، طراحی و سنجش محصولات را تغییر می‌دهد — و ساختن آزمایش‌های کوچک برای محک‌زدنش، نه فقط خواندن درباره‌ش.',
  ),
)

// ---------------------------------------------------------------------------
// Contact CTA (mirrors the homepage's cta pattern)

export const contactRichTextEn = richText(
  heading("If this way of working sounds useful, let's talk.", 'h3'),
  paragraph('For product, design and growth work, or comparing notes on systems and AI.'),
)
export const contactRichTextFa = richText(
  heading('اگر این شیوه‌ی کارکردن به‌کارتان می‌آید، بیایید صحبت کنیم.', 'h3'),
  paragraph('برای کار محصول، طراحی و رشد، یا فقط هم‌فکری درباره‌ی سیستم‌ها و هوش مصنوعی.'),
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
