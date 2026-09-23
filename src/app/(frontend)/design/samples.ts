import type { Locale } from '@/utilities/locale'

/**
 * The style guide only ever previews English and Persian — the two scripts/directions the
 * design system's typography actually branches on (`:lang(fa)`). The other 5 site locales share
 * English's LTR/Latin typography, so a preview toggle for them would show nothing new; adding
 * real Spanish/German/French/Japanese/Arabic sample copy here would be invented content with no
 * home in the CMS.
 */
export type PreviewLocale = Extract<Locale, 'en' | 'fa'>
export const PREVIEW_LOCALES: readonly PreviewLocale[] = ['en', 'fa']
export const isPreviewLocale = (v: unknown): v is PreviewLocale => v === 'en' || v === 'fa'

/** Sample copy for the style guide — placeholders, not Sina's real content. */
export const SAMPLES: Record<
  PreviewLocale,
  {
    lead: string
    tail: string
    tag: string
    lede: string
    body: string
    eyebrow: string
    pangram: string
    nav: string[]
    metrics: { value: string; caption: string; source?: string }[]
    outcomes: string[]
    employers: { name: string; role: string; blurb: string }[]
    meta: { company: string; role: string; period: string; type: string; tools: string[] }
    footNote: string
  }
> = {
  en: {
    lead: 'Product designer',
    tail: 'who reads the dashboards.',
    tag: 'Work',
    lede: 'Design, growth and product on one surface — six case studies with numbers that have a source.',
    body: 'Owned the checkout redesign end to end: research, prototype, test, ship. Conversion moved from 2.1 % to 2.9 % in the first quarter after launch, measured on the same segment.',
    eyebrow: 'Case study · 2024',
    pangram: 'Sphinx of black quartz, judge my vow. 0123456789',
    nav: ['Work', 'Experience', 'About', 'Contact'],
    metrics: [
      { value: '+38%', caption: 'Checkout conversion', source: 'GA4, Q3 2024 vs Q2' },
      { value: '20+', caption: 'Dashboards shipped', source: 'Internal BI inventory' },
      { value: '−$0.03', caption: 'Cost per click', source: 'Google Ads, 90-day window' },
    ],
    outcomes: ['Redesigned onboarding, four screens fewer', 'Weekly cohort dashboard for the growth team', 'Design system adopted by two product squads'],
    employers: [
      { name: 'Company A', role: 'Product designer', blurb: 'Fintech onboarding and BI dashboards.' },
      { name: 'Company B', role: 'Growth marketer', blurb: 'Performance campaigns and automation.' },
      { name: 'Company C', role: 'Product manager', blurb: 'B2C marketplace, checkout and retention.' },
      { name: 'Company D', role: 'UX researcher', blurb: 'Interviews, surveys, usability tests.' },
      { name: 'Company E', role: 'Industrial designer', blurb: 'Where it started.' },
    ],
    meta: { company: 'Company A', role: 'Product designer', period: '2023 – 2024', type: 'Case study', tools: ['Figma', 'GA4', 'Metabase'] },
    footNote: 'Tehran · hello@example.com',
  },
  fa: {
    lead: 'طراح محصول',
    tail: 'که داشبوردها را می‌خواند.',
    tag: 'پروژه‌ها',
    lede: 'طراحی، رشد و محصول را در شش مطالعهٔ موردی، همراه با داده‌های منبع‌دار، نشان می‌دهم.',
    body: 'بازطراحی فرایند پرداخت را از پژوهش و نمونهٔ اولیه تا آزمون و انتشار پیش بردم. نرخ تبدیل در سه‌ماههٔ اول پس از انتشار، برای همان گروه کاربران، از ۲٫۱ درصد به ۲٫۹ درصد رسید.',
    eyebrow: 'مطالعهٔ موردی · ۲۰۲۴',
    pangram: 'بر جادهٔ خاکی، یکصد خرگوش چاق و بی‌قواره غلت زدند. ۰۱۲۳۴۵۶۷۸۹',
    nav: ['پروژه‌ها', 'تجربه', 'درباره', 'تماس'],
    metrics: [
      { value: '+۳۸٪', caption: 'نرخ تبدیل پرداخت', source: 'GA4، سه‌ماههٔ سوم ۲۰۲۴' },
      { value: '۲۰+', caption: 'داشبورد منتشرشده', source: 'فهرست داخلی BI' },
      { value: '−۰٫۰۳ دلار', caption: 'هزینهٔ هر کلیک', source: 'Google Ads، بازهٔ ۹۰ روزه' },
    ],
    outcomes: ['بازطراحی ورود کاربر با چهار صفحه کمتر', 'داشبورد هفتگی کوهورت برای تیم رشد', 'به‌کارگیری دیزاین‌سیستم در دو تیم محصول'],
    employers: [
      { name: 'شرکت الف', role: 'طراح محصول', blurb: 'ورود کاربر فین‌تک و داشبوردهای BI.' },
      { name: 'شرکت ب', role: 'بازاریاب رشد', blurb: 'کمپین‌های عملکردی و اتوماسیون.' },
      { name: 'شرکت پ', role: 'مدیر محصول', blurb: 'بازار B2C، پرداخت و بازگشت کاربر.' },
      { name: 'شرکت ت', role: 'پژوهشگر تجربهٔ کاربری', blurb: 'مصاحبه، پرسش‌نامه، آزمون کاربردپذیری.' },
      { name: 'شرکت ث', role: 'طراح صنعتی', blurb: 'جایی که شروع شد.' },
    ],
    meta: { company: 'شرکت الف', role: 'طراح محصول', period: '۱۴۰۲ – ۱۴۰۳', type: 'مطالعهٔ موردی', tools: ['Figma', 'GA4', 'Metabase'] },
    footNote: 'تهران · hello@example.com',
  },
}
