import type { RequiredDataFromCollectionSlug } from 'payload'

/**
 * Company/role/period reference data, sourced from Docs/Experience/Timeline.md and each
 * company's README.md. No confirmed calendar dates exist anywhere in those docs (the Timeline
 * table is entirely blank) — only durations, so `period.start`/`period.end` stay empty and
 * `durationLabel` carries the only date-shaped fact. Resume order preserved as `order`.
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
        'مالکیت سراسری طلای دیجیتال — چشم‌انداز، طراحی، کمپین‌ها، بخش‌بندی و داشبوردهای هوش تجاری پشتشان.',
      domain: 'فین‌تک',
      durationLabel: '۲.۵ سال',
    },
  },
  {
    order: 2,
    employment: 'full-time',
    en: {
      title: 'Carsparency & Khodro45',
      company: 'Carsparency & Khodro45',
      role: 'Product designer',
      summary: 'Designed a full car buy-and-sell platform for the UAE market; raised conversion through usability testing.',
      domain: 'Automotive',
      durationLabel: '2.5 yrs',
    },
    fa: {
      title: 'کارسپرنسی و خودرو۴۵',
      company: 'کارسپرنسی و خودرو۴۵',
      role: 'طراح محصول',
      summary: 'یک پلتفرم کامل خرید و فروش خودرو برای بازار امارات طراحی شد؛ با تست‌های کاربردپذیری نرخ تبدیل را بالا برد.',
      domain: 'خودرو',
      durationLabel: '۲.۵ سال',
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
      summary: 'رشد تردد بازدیدکنندگان از طریق کمپین و همکاری با اینفلوئنسرها؛ پیشنهاددهندهی اپ مدیریت مرکز خرید.',
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
      role: 'Product Manager',
      summary: 'Aligned stakeholders around a new brand identity, tagline and website from the ground up.',
      durationLabel: '2 yrs',
    },
    fa: {
      title: 'فیبونا',
      company: 'فیبونا',
      role: 'مدیر محصول',
      summary: 'همسویی ذی‌نفعان را حول هویت برند، تگلاین و وب‌سایتی تازه از صفر فراهم کرد.',
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
      summary: 'پژوهش معلمان و زبان‌آموزان را به یک نقشه‌راه تأییدشدهی تطبیق معلم–دانش‌آموز تبدیل کرد.',
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
      summary: 'پلتفرم را حول معیارهای سروری که کاربران واقعاً به آن نیاز داشتند بازطراحی کرد، و NPS را بالا برد.',
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
      summary: 'وب‌سایت، پنل آموزشی و یک سیستم طراحی ساخت که تیم فنی بتواند سریع بسازد.',
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
      summary: 'پروتوتایپ یک پلتفرم ویدئویی داده‌محور را بر اساس پژوهش سبک UX طراحی کرد.',
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
      summary: 'بازی‌های کوچک گیمیفیکی‌شده و یک اپ‌ تماس‌تصویری‌۲‌مشتری و دسکتاپ طراحی کرد.',
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
      summary: 'تعیین دامنه و طراحی یک ارنای چندبازی، جایی که تصمیم‌های محصول و کسبوکار با هم گرفته می‌شوند.',
      durationLabel: 'درحال انجام',
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
