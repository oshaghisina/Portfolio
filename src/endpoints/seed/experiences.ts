import type { RequiredDataFromCollectionSlug } from 'payload'

/**
 * Company/role/period reference data, sourced from Docs/Experience/Timeline.md and each
 * company's README.md. Timeline's company rows still carry no calendar dates — only durations, so
 * `period.start`/`period.end` stay empty and `durationLabel` carries the only date-shaped fact.
 * (The independent projects under Docs/Experience/Projects/ *do* have real months, but they are
 * one `Independent` row here, not eleven.)
 *
 * `order` is a stable identity, not a row position — `experience-copy.ts` keys its five extra
 * locales off it and the About page's `careerStageOrder` points at it. So Taha Gasht, which the
 * docs added in 2026-09 as the most recent role (`resume_order: 1`, ahead of Digikala), enters at
 * `order: 0` rather than renumbering all ten existing keys. Khodro45 enters at `order: 11` for the
 * same reason after splitting from Carsparency (`order: 2`).
 */
type ExperienceLocaleFields = {
  title: string
  company: string
  product?: string
  role: string
  summary: string
  domain?: string
  durationLabel: string
}

export interface ExperienceSeedEntry {
  order: number
  employment: 'contract' | 'freelance' | 'full-time' | 'part-time'
  present?: boolean
  en: ExperienceLocaleFields
  fa: ExperienceLocaleFields
}

export const experiencesData: ExperienceSeedEntry[] = [
  {
    // Docs/Experience/Taha-Gasht/README.md — not on Resume.pdf; tenure months are still open
    // (that file's Q1), so `durationLabel` stays empty and CareerJourney simply omits it.
    order: 0,
    employment: 'part-time',
    en: {
      title: 'Taha Gasht',
      company: 'Taha Gasht',
      role: 'Product designer & strategist',
      summary:
        "Product design and strategy across a travel business's booking site, shared design system and internal panel.",
      domain: 'Travel / booking',
      durationLabel: '',
    },
    fa: {
      title: 'طاهاگشت',
      company: 'طاهاگشت',
      role: 'طراح و استراتژیست محصول',
      summary: 'برای کسب‌وکار گردشگری طاهاگشت، سایت رزرو، پنل داخلی و سیستم طراحی مشترکشان را طراحی کردم.',
      domain: 'سفر و رزرو',
      durationLabel: '',
    },
  },
  {
    order: 1,
    employment: 'full-time',
    en: {
      title: 'Digikala — Digital Gold',
      company: 'Digikala',
      product: 'Digital Gold',
      role: 'Designer / Marketer / BI developer',
      summary:
        "Owned Digital Gold end to end — vision, design, campaigns, segmentation and the BI dashboards behind them.",
      domain: 'Fintech',
      durationLabel: '2.5 yrs',
    },
    fa: {
      title: 'دیجی‌کالا — طلای دیجیتال',
      company: 'دیجی‌کالا',
      product: 'طلای دیجیتال',
      role: 'طراح / بازاریاب / توسعه‌دهندهٔ هوش تجاری',
      summary:
        'از چشم‌انداز و طراحی طلای دیجیتال تا کمپین‌ها، بخش‌بندی کاربران و داشبوردهای هوش تجاری آن را پیش بردم.',
      domain: 'فین‌تک',
      durationLabel: '۲.۵ سال',
    },
  },
  {
    // Docs/Experience/Carsparency-Khodro45 — Carsparency span (Timeline Q6: 1 yr after Khodro45).
    // Stable `order: 2` kept so About `careerStageOrder` and experience-copy locale keys stay put.
    order: 2,
    employment: 'full-time',
    en: {
      title: 'Carsparency',
      company: 'Carsparency',
      role: 'Product designer',
      summary:
        'Designed the English/UAE car marketplace across Pro, operator console, inspection tool and seller web, on one design system.',
      domain: 'Automotive',
      durationLabel: '1 yr',
    },
    fa: {
      title: 'Carsparency',
      company: 'Carsparency',
      role: 'طراح محصول',
      summary:
        'برای بازار انگلیسی‌زبان امارات، چهار بخش Carsparency را بر پایهٔ یک سیستم طراحی کردم: Pro، پنل عملیاتی، ابزار بازرسی و وب‌سایت فروشنده.',
      domain: 'خودرو',
      durationLabel: '۱ سال',
    },
  },
  {
    // Docs/Experience/Carsparency-Khodro45 — Khodro45 span (Timeline Q6: 1.5 yr, before Carsparency).
    // New stable identity `order: 11` — do not renumber existing experience-copy / About keys.
    order: 11,
    employment: 'full-time',
    en: {
      title: 'Khodro45',
      company: 'Khodro45',
      role: 'Product designer',
      summary:
        'Designed the Persian RTL dealer app for the Iran marketplace — timed auction, fair-price and escrow flows.',
      domain: 'Automotive',
      durationLabel: '1.5 yrs',
    },
    fa: {
      title: 'Khodro45',
      company: 'Khodro45',
      role: 'طراح محصول',
      summary:
        'اپ فارسی و راست‌به‌چپ نمایشگاه‌داران Khodro45 را با مزایدهٔ زمان‌دار، قیمت منصفانه و فرایند تسویه طراحی کردم.',
      domain: 'خودرو',
      durationLabel: '۱.۵ سال',
    },
  },
  {
    order: 3,
    employment: 'part-time',
    en: {
      title: 'Hadish Mall',
      company: 'Hadish Mall',
      role: 'Marketing',
      summary: 'Grew visitor turnout through campaigns and influencer partnerships; proposed a mall management app.',
      domain: 'Retail',
      durationLabel: '1 yr',
    },
    fa: {
      title: 'هدیش مال',
      company: 'هدیش مال',
      role: 'بازاریابی',
      summary: 'با کمپین‌ها و همکاری با اینفلوئنسرها به افزایش مراجعه به هدیش مال کمک کردم و ایدهٔ اپ مدیریت مجتمع را پیشنهاد دادم.',
      domain: 'خرده‌فروشی',
      durationLabel: '۱ سال',
    },
  },
  {
    order: 4,
    employment: 'part-time',
    en: {
      title: 'Fibona',
      company: 'Fibona',
      domain: 'Business consulting',
      role: 'Product Manager',
      summary: 'Aligned stakeholders around a new brand identity, tagline and website from the ground up.',
      durationLabel: '2 yrs',
    },
    fa: {
      title: 'فیبونا',
      company: 'فیبونا',
      domain: 'مشاورهٔ کسب‌وکار',
      role: 'مدیر محصول',
      summary: 'ذی‌نفعان فیبونا را برای شکل‌دادن به هویت برند، شعار و وب‌سایتی تازه هم‌سو کردم.',
      durationLabel: '۲ سال',
    },
  },
  {
    order: 5,
    employment: 'part-time',
    en: {
      title: 'OTeacher',
      company: 'OTeacher',
      role: 'Product Manager & designer',
      summary: 'Turned educator and learner research into a validated teacher–student matchmaking roadmap.',
      domain: 'Edtech',
      durationLabel: '1 yr',
    },
    fa: {
      title: 'اوتیچر',
      company: 'اوتیچر',
      role: 'مدیر محصول و طراح',
      summary: 'با پژوهش دربارهٔ معلمان و زبان‌آموزان، نقشهٔ راه تأییدشده‌ای برای بهبود تطبیق آن‌ها تدوین کردم.',
      domain: 'آموزش',
      durationLabel: '۱ سال',
    },
  },
  {
    order: 6,
    employment: 'full-time',
    en: {
      title: 'Arvan Cloud',
      company: 'Arvan Cloud',
      role: 'Product designer',
      summary: 'Redesigned the platform around the server metrics users actually needed, lifting NPS.',
      domain: 'Cloud',
      durationLabel: '2 yrs',
    },
    fa: {
      title: 'آروان کلاود',
      company: 'آروان کلاود',
      role: 'طراح محصول',
      summary: 'پلتفرم ابر آروان را بر پایهٔ شاخص‌های سرور موردنیاز کاربران بازطراحی کردم؛ این کار به افزایش NPS کمک کرد.',
      domain: 'ابری',
      durationLabel: '۲ سال',
    },
  },
  {
    order: 7,
    employment: 'part-time',
    en: {
      title: 'Biomaze',
      company: 'Biomaze',
      role: 'Product Manager & designer',
      summary: 'Built the website, education panel and a design system that let developers ship fast.',
      domain: 'Edtech',
      durationLabel: '3 yrs',
    },
    fa: {
      title: 'بایومیز',
      company: 'بایومیز',
      role: 'مدیر محصول و طراح',
      summary: 'وب‌سایت، پنل آموزش و سیستم طراحی بایومیز را ساختم تا تیم فنی بتواند سریع‌تر محصول را منتشر کند.',
      domain: 'آموزش',
      durationLabel: '۳ سال',
    },
  },
  {
    order: 8,
    employment: 'full-time',
    en: {
      title: 'Didestan',
      company: 'Didestan',
      role: 'UI/UX designer',
      summary: 'Designed a data-driven video platform prototype from lean UX research.',
      domain: 'Media',
      durationLabel: '8 mos',
    },
    fa: {
      title: 'دیدستان',
      company: 'دیدستان',
      role: 'طراح UI/UX',
      summary: 'بر پایهٔ پژوهش Lean UX، نمونهٔ تعاملی پلتفرم ویدئویی داده‌محور دیدستان را طراحی کردم.',
      domain: 'رسانه',
      durationLabel: '۸ ماه',
    },
  },
  {
    order: 9,
    employment: 'full-time',
    en: {
      title: 'A1Paradise',
      company: 'A1Paradise',
      role: 'UI/UX designer',
      summary: 'Designed gamified microgames and a desktop and B2C calling app.',
      domain: 'Telecom / gaming',
      durationLabel: '1.2 yrs',
    },
    fa: {
      title: 'A1Paradise',
      company: 'A1Paradise',
      role: 'طراح UI/UX',
      summary: 'بازی‌های کوچک با سازوکارهای بازی‌وارسازی و اپ‌های تماس برای دسکتاپ و کاربران عادی را طراحی کردم.',
      domain: 'تلکام / بازی',
      durationLabel: '۱.۲ سال',
    },
  },
  {
    order: 10,
    employment: 'freelance',
    present: true,
    en: {
      title: 'Independent — RP1 / Product & Strategy',
      company: 'Independent',
      product: 'RP1',
      role: 'Product Designer & Strategist',
      summary: 'Scoping and designing a multi-game play-to-earn arena, product and business decisions made together.',
      durationLabel: 'Ongoing',
    },
    fa: {
      title: 'مستقل — RP1 / محصول و استراتژی',
      company: 'مستقل',
      product: 'RP1',
      role: 'طراح محصول و استراتژیست',
      summary: 'دامنه و طراحی RP1 Arena را پیش می‌برم؛ مجموعه‌ای چندبازی که تصمیم‌های محصول و کسب‌وکار در آن به هم وابسته‌اند.',
      durationLabel: 'در حال انجام',
    },
  },
]

export const experienceEnData = (entry: ExperienceSeedEntry): RequiredDataFromCollectionSlug<'experiences'> => ({
  title: entry.en.title,
  company: entry.en.company,
  product: entry.en.product,
  role: entry.en.role,
  employment: entry.employment,
  domain: entry.en.domain,
  summary: entry.en.summary,
  order: entry.order,
  period: {
    present: entry.present ?? false,
    approx: false,
    durationLabel: entry.en.durationLabel,
  },
})

/** The `fa` locale's leaf fields only — `employment`/`order`/`period.present`/`period.approx` are
 * not localized and were already set by `experienceEnData` on create. */
export const experienceFaData = (entry: ExperienceSeedEntry): Partial<RequiredDataFromCollectionSlug<'experiences'>> => ({
  title: entry.fa.title,
  company: entry.fa.company,
  product: entry.fa.product,
  role: entry.fa.role,
  domain: entry.fa.domain,
  summary: entry.fa.summary,
  period: {
    durationLabel: entry.fa.durationLabel,
  },
})
