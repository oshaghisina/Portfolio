import type { Locale } from '@/utilities/locale'

/** Industry taxonomy agreed with Sina; retail includes e-commerce, media includes publishing. */
export const INDUSTRY_KEYS = [
  'finance',
  'automotive',
  'education',
  'cloud',
  'travel',
  'retail',
  'media',
  'telecom',
  'gaming',
  'real-estate',
  'energy',
  'logistics',
  'after-sales',
  'networking',
  'consulting',
] as const
export type IndustryKey = (typeof INDUSTRY_KEYS)[number]
export const INDUSTRY_COUNT = INDUSTRY_KEYS.length
export const industryCountLabel = (locale: Locale) =>
  locale === 'fa'
    ? String(INDUSTRY_COUNT).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]!)
    : String(INDUSTRY_COUNT)

const names: Record<Locale, readonly string[]> = {
  en: [
    'Finance & investment',
    'Automotive',
    'Education',
    'Cloud infrastructure',
    'Travel & tourism',
    'Retail & e-commerce',
    'Media & publishing',
    'Telecommunications',
    'Gaming',
    'Real estate & renovation',
    'Energy & petroleum',
    'Transport & logistics',
    'After-sales & warranty',
    'Professional networking',
    'Business consulting',
  ],
  fa: [
    'خدمات مالی و سرمایه‌گذاری',
    'خودرو',
    'آموزش',
    'زیرساخت و خدمات ابری',
    'سفر و گردشگری',
    'خرده‌فروشی و تجارت الکترونیک',
    'رسانه، محتوا و نشر',
    'مخابرات و ارتباطات',
    'بازی و سرگرمی تعاملی',
    'املاک و بازسازی',
    'انرژی و فرآورده‌های نفتی',
    'حمل‌ونقل و لجستیک',
    'خدمات پس از فروش و گارانتی',
    'شبکه‌سازی حرفه‌ای',
    'مشاوره‌ی کسب‌وکار',
  ],
  ar: [
    'الخدمات المالية والاستثمار',
    'السيارات',
    'التعليم',
    'البنية التحتية السحابية',
    'السفر والسياحة',
    'التجزئة والتجارة الإلكترونية',
    'الإعلام والمحتوى والنشر',
    'الاتصالات',
    'الألعاب والترفيه التفاعلي',
    'العقارات والتجديد',
    'الطاقة والمنتجات النفطية',
    'النقل والخدمات اللوجستية',
    'خدمات ما بعد البيع والضمان',
    'التواصل المهني',
    'استشارات الأعمال',
  ],
  es: [
    'Finanzas e inversión',
    'Automoción',
    'Educación',
    'Infraestructura en la nube',
    'Viajes y turismo',
    'Retail y comercio electrónico',
    'Medios y edición',
    'Telecomunicaciones',
    'Juegos',
    'Inmobiliario y reformas',
    'Energía y petróleo',
    'Transporte y logística',
    'Posventa y garantías',
    'Redes profesionales',
    'Consultoría de negocios',
  ],
  de: [
    'Finanzen & Investitionen',
    'Automobilbranche',
    'Bildung',
    'Cloud-Infrastruktur',
    'Reisen & Tourismus',
    'Handel & E-Commerce',
    'Medien & Verlagswesen',
    'Telekommunikation',
    'Gaming',
    'Immobilien & Renovierung',
    'Energie & Erdöl',
    'Transport & Logistik',
    'Kundendienst & Garantie',
    'Berufliche Vernetzung',
    'Unternehmensberatung',
  ],
  fr: [
    'Finance et investissement',
    'Automobile',
    'Éducation',
    'Infrastructure cloud',
    'Voyage et tourisme',
    'Commerce et e-commerce',
    'Médias et édition',
    'Télécommunications',
    'Jeux vidéo',
    'Immobilier et rénovation',
    'Énergie et pétrole',
    'Transport et logistique',
    'Après-vente et garantie',
    'Réseaux professionnels',
    'Conseil aux entreprises',
  ],
  ja: [
    '金融・投資',
    '自動車',
    '教育',
    'クラウド基盤',
    '旅行・観光',
    '小売・EC',
    'メディア・出版',
    '通信',
    'ゲーム',
    '不動産・リノベーション',
    'エネルギー・石油',
    '輸送・物流',
    'アフターサービス・保証',
    'ビジネスネットワーク',
    'ビジネスコンサルティング',
  ],
}

export const industryLabels = Object.fromEntries(
  Object.entries(names).map(([locale, labels]) => {
    if (labels.length !== INDUSTRY_COUNT) throw new Error(`Industry labels missing for ${locale}`)
    return [locale, Object.fromEntries(INDUSTRY_KEYS.map((key, index) => [key, labels[index]!]))]
  }),
) as Record<Locale, Record<IndustryKey, string>>

export const industryHeaders: Record<Locale, { lead: string; tail: string }> = {
  en: { lead: 'Industries', tail: 'I’ve worked in' },
  fa: { lead: 'صنایعی که', tail: 'در آن‌ها کار کرده‌ام' },
  ar: { lead: 'القطاعات', tail: 'التي عملتُ فيها' },
  es: { lead: 'Sectores', tail: 'en los que he trabajado' },
  de: { lead: 'Branchen,', tail: 'in denen ich gearbeitet habe' },
  fr: { lead: 'Les secteurs', tail: 'dans lesquels j’ai travaillé' },
  ja: { lead: 'これまで', tail: '携わってきた業界' },
}

export const isIndustryKey = (value: unknown): value is IndustryKey =>
  typeof value === 'string' && (INDUSTRY_KEYS as readonly string[]).includes(value)
