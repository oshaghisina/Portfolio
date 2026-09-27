import type { RequiredDataFromCollectionSlug } from 'payload'

import type { Locale } from '@/utilities/locale'

import { heading, richText } from './lexical-helpers'

type PageLayout = RequiredDataFromCollectionSlug<'pages'>['layout']

/**
 * The `/work` page's own copy — intro, closing transition and metadata. This is page chrome,
 * not project content, so it is hand-translated for every site locale like `uiCopy`; the
 * projects the page lists are managed (and published per locale) in the `projects` collection.
 *
 * The count line under the intro is computed from published projects, never typed here.
 */
export interface WorkPageCopy {
  /** Admin/document title. */
  title: string
  meta: { title: string; description: string }
  intro: { tag: string; lead: string; tail: string; lede: string }
  cta: { heading: string; linkLabel: string }
}

export const WORK_SLUG = 'work'

/** Where the closing transition points: the Experience page (capability story), matching nav. */
const EXPERIENCE_HREF = '/experience'

export const workCopy: Record<Locale, WorkPageCopy> = {
  en: {
    title: 'Work',
    meta: {
      title: 'Work — Sina Oshaghi',
      description:
        'An archive of product, growth, data and systems work across ten years and ten roles — from Digikala’s Digital Gold to independent projects.',
    },
    intro: {
      tag: 'Work / Selected projects / Archive',
      lead: 'Work across product, growth,',
      tail: 'data and systems.',
      lede:
        'Projects from ten years and ten roles, with different levels of ownership — some I led end to end, some I designed inside a larger team. Case studies are added as they are written.',
    },
    cta: { heading: 'Want to understand how I think?', linkLabel: 'Experience' },
  },
  fa: {
    title: 'پروژه‌ها',
    meta: {
      title: 'پروژه‌ها — سینا عشاقی',
      description:
        'آرشیو پروژه‌های محصول، رشد، داده و سیستم در ده سال و ده نقش؛ از طلای دیجیتال دیجی‌کالا تا پروژه‌های مستقل.',
    },
    intro: {
      tag: 'پروژه‌ها / پروژه‌های منتخب / آرشیو',
      lead: 'از محصول و رشد',
      tail: 'تا داده و سیستم‌ها',
      lede:
        'این پروژه‌ها حاصل ده سال کار در ده نقش‌اند. بعضی را از آغاز تا پایان هدایت کرده‌ام و در بعضی، بخشی از تیمی بزرگ‌تر بوده‌ام. مطالعه‌های موردی را به‌تدریج اضافه می‌کنم.',
    },
    cta: { heading: 'می‌خواهید با شیوه‌ی کارم آشنا شوید؟', linkLabel: 'دیدن تجربه' },
  },
  ar: {
    title: 'العمل',
    meta: {
      title: 'العمل — سينا أوشاقي',
      description:
        'أرشيف لأعمال المنتج والنمو والبيانات والأنظمة عبر عشر سنوات وعشرة أدوار — من الذهب الرقمي في ديجيكالا إلى مشاريع مستقلة.',
    },
    intro: {
      tag: 'العمل / مشاريع مختارة / الأرشيف',
      lead: 'عمل يمتد عبر المنتج والنمو',
      tail: 'والبيانات والأنظمة.',
      lede:
        'مشاريع من عشر سنوات وعشرة أدوار بمستويات مختلفة من الملكية — بعضها قدتُه من البداية إلى النهاية، وبعضها صممتُه داخل فريق أكبر. تُضاف دراسات الحالة تدريجيًا كلما كُتبت.',
    },
    cta: { heading: 'تريد أن تفهم كيف أفكّر؟', linkLabel: 'الخبرة' },
  },
  es: {
    title: 'Trabajo',
    meta: {
      title: 'Trabajo — Sina Oshaghi',
      description:
        'Un archivo de trabajo en producto, crecimiento, datos y sistemas a lo largo de diez años y diez roles: del Digital Gold de Digikala a proyectos independientes.',
    },
    intro: {
      tag: 'Trabajo / Proyectos seleccionados / Archivo',
      lead: 'Trabajo en producto, crecimiento,',
      tail: 'datos y sistemas.',
      lede:
        'Proyectos de diez años y diez roles, con distintos niveles de responsabilidad: algunos los lideré de principio a fin, otros los diseñé dentro de un equipo mayor. Los casos de estudio se añaden a medida que se escriben.',
    },
    cta: { heading: '¿Quieres entender cómo pienso?', linkLabel: 'Experiencia' },
  },
  de: {
    title: 'Arbeit',
    meta: {
      title: 'Arbeit — Sina Oshaghi',
      description:
        'Ein Archiv von Produkt-, Wachstums-, Daten- und Systemarbeit aus zehn Jahren und zehn Rollen – von Digikalas Digital Gold bis zu unabhängigen Projekten.',
    },
    intro: {
      tag: 'Arbeit / Ausgewählte Projekte / Archiv',
      lead: 'Arbeit in Produkt, Wachstum,',
      tail: 'Daten und Systemen.',
      lede:
        'Projekte aus zehn Jahren und zehn Rollen mit unterschiedlich viel Verantwortung – manche habe ich von Anfang bis Ende geführt, andere in einem größeren Team gestaltet. Fallstudien kommen hinzu, sobald sie geschrieben sind.',
    },
    cta: { heading: 'Wollen Sie verstehen, wie ich denke?', linkLabel: 'Erfahrung' },
  },
  fr: {
    title: 'Travail',
    meta: {
      title: 'Travail — Sina Oshaghi',
      description:
        'Une archive de travaux en produit, croissance, données et systèmes sur dix ans et dix rôles — du Digital Gold de Digikala aux projets indépendants.',
    },
    intro: {
      tag: 'Travail / Projets sélectionnés / Archives',
      lead: 'Du travail en produit, croissance,',
      tail: 'données et systèmes.',
      lede:
        'Des projets issus de dix ans et dix rôles, avec des niveaux de responsabilité variés : certains menés de bout en bout, d’autres conçus au sein d’une équipe plus large. Les études de cas s’ajoutent au fil de leur rédaction.',
    },
    cta: { heading: 'Envie de comprendre ma façon de penser ?', linkLabel: 'Expérience' },
  },
  ja: {
    title: '仕事',
    meta: {
      title: '仕事 — Sina Oshaghi',
      description:
        '10年・10の役割にわたるプロダクト、グロース、データ、システムの仕事のアーカイブ。DigikalaのDigital Goldから独立プロジェクトまで。',
    },
    intro: {
      tag: '仕事 / 主なプロジェクト / アーカイブ',
      lead: 'プロダクト、グロース、',
      tail: 'データ、システムにわたる仕事。',
      lede:
        '10年・10の役割にわたるプロジェクト。責任の範囲はさまざまで、最初から最後まで主導したものも、大きなチームの中でデザインしたものもあります。ケーススタディは執筆に合わせて追加していきます。',
    },
    cta: { heading: '私の考え方を知りたいですか？', linkLabel: '経歴' },
  },
}

/**
 * The page's two blocks. Pass the block row `id`s captured after the English create when
 * updating other locales — rows without ids count as new rows and the English leaves are lost.
 */
export const buildWorkLayout = (copy: WorkPageCopy, ids: { archive?: string; cta?: string } = {}): PageLayout => [
  {
    ...(ids.archive ? { id: ids.archive } : {}),
    blockName: 'Project archive',
    blockType: 'projectArchive',
    sectionHeader: copy.intro,
  },
  {
    ...(ids.cta ? { id: ids.cta } : {}),
    blockName: 'Next: Experience',
    blockType: 'cta',
    richText: richText(heading(copy.cta.heading, 'h3')),
    links: [
      {
        link: {
          type: 'custom',
          appearance: 'default',
          label: copy.cta.linkLabel,
          url: EXPERIENCE_HREF,
        },
      },
    ],
  },
]

export const buildWorkPage = (copy: WorkPageCopy): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: WORK_SLUG, // explicit → `generateSlug` stays off (see projects seed)
  _status: 'published',
  title: copy.title,
  hero: { type: 'none' },
  layout: buildWorkLayout(copy),
  meta: copy.meta,
})
