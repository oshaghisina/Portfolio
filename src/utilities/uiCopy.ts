import type { Locale } from './locale'

/** A count template per CLDR plural category; `other` is the fallback. `{n}` is the number. */
export type PluralCopy = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string }

export interface UiCopy {
  closeMenu: string
  openMenu: string
  language: string
  next: string
  /** Screen-reader suffix for links that open a new tab. */
  opensInNewTab: string
  postsArchiveTitle: string
  previous: string
  search: string
  /** `{language}` is replaced with the target locale's native name — see `switchToLanguageLabel`. */
  switchToLanguage: string
  theme: string
  /** `/work` archive chrome. */
  workArchiveTag: string
  workCaseStudy: string
  workCompanies: PluralCopy
  workEmpty: string
  workFilterAll: string
  workFilterLabel: string
  workIndexTitle: string
  workLive: string
  workMediaPending: string
  workProjects: PluralCopy
}

/** Hand-translated interface chrome — not CMS content, so translating it directly is safe. */
export const uiCopy: Record<Locale, UiCopy> = {
  en: {
    closeMenu: 'Close menu',
    openMenu: 'Open menu',
    language: 'Language',
    next: 'Next',
    opensInNewTab: 'opens in a new tab',
    postsArchiveTitle: 'Posts',
    previous: 'Previous',
    search: 'Search',
    switchToLanguage: 'Switch to {language}',
    theme: 'Toggle theme',
    workArchiveTag: 'Archive',
    workCaseStudy: 'Case study',
    workCompanies: { one: '{n} company', other: '{n} companies' },
    workEmpty: 'Nothing is published in this language yet.',
    workFilterAll: 'All',
    workFilterLabel: 'Filter by kind of work',
    workIndexTitle: 'All projects',
    workLive: 'Live',
    workMediaPending: 'Project media pending',
    workProjects: { one: '{n} project', other: '{n} projects' },
  },
  fa: {
    closeMenu: 'بستن منو',
    openMenu: 'باز کردن منو',
    language: 'زبان',
    next: 'بعدی',
    opensInNewTab: 'در برگهٴ جدید باز می‌شود',
    postsArchiveTitle: 'نوشته‌ها',
    previous: 'قبلی',
    search: 'جستجو',
    switchToLanguage: 'تغییر زبان به {language}',
    theme: 'تغییر پوسته',
    workArchiveTag: 'آرشیو',
    workCaseStudy: 'مطالعهٴ موردی',
    workCompanies: { other: '{n} شرکت' },
    workEmpty: 'هنوز چیزی به این زبان منتشر نشده است.',
    workFilterAll: 'همه',
    workFilterLabel: 'فیلتر بر اساس نوع کار',
    workIndexTitle: 'همهٴ پروژه‌ها',
    workLive: 'نسخهٴ زنده',
    workMediaPending: 'تصویر پروژه در انتظار',
    workProjects: { other: '{n} پروژه' },
  },
  ar: {
    closeMenu: 'إغلاق القائمة',
    openMenu: 'فتح القائمة',
    language: 'اللغة',
    next: 'التالي',
    opensInNewTab: 'يُفتح في علامة تبويب جديدة',
    postsArchiveTitle: 'المقالات',
    previous: 'السابق',
    search: 'بحث',
    switchToLanguage: 'التبديل إلى {language}',
    theme: 'تبديل المظهر',
    workArchiveTag: 'الأرشيف',
    workCaseStudy: 'دراسة حالة',
    workCompanies: { one: 'شركة واحدة', two: 'شركتان', few: '{n} شركات', other: '{n} شركة' },
    workEmpty: 'لم يُنشر شيء بهذه اللغة بعد.',
    workFilterAll: 'الكل',
    workFilterLabel: 'تصفية حسب نوع العمل',
    workIndexTitle: 'كل المشاريع',
    workLive: 'مباشر',
    workMediaPending: 'وسائط المشروع قيد الإعداد',
    workProjects: { one: 'مشروع واحد', two: 'مشروعان', few: '{n} مشاريع', other: '{n} مشروعًا' },
  },
  es: {
    closeMenu: 'Cerrar menú',
    openMenu: 'Abrir menú',
    language: 'Idioma',
    next: 'Siguiente',
    opensInNewTab: 'se abre en una pestaña nueva',
    postsArchiveTitle: 'Publicaciones',
    previous: 'Anterior',
    search: 'Buscar',
    switchToLanguage: 'Cambiar a {language}',
    theme: 'Cambiar tema',
    workArchiveTag: 'Archivo',
    workCaseStudy: 'Caso de estudio',
    workCompanies: { one: '{n} empresa', other: '{n} empresas' },
    workEmpty: 'Aún no hay nada publicado en este idioma.',
    workFilterAll: 'Todos',
    workFilterLabel: 'Filtrar por tipo de trabajo',
    workIndexTitle: 'Todos los proyectos',
    workLive: 'En vivo',
    workMediaPending: 'Material del proyecto pendiente',
    workProjects: { one: '{n} proyecto', other: '{n} proyectos' },
  },
  de: {
    closeMenu: 'Menü schließen',
    openMenu: 'Menü öffnen',
    language: 'Sprache',
    next: 'Weiter',
    opensInNewTab: 'öffnet in neuem Tab',
    postsArchiveTitle: 'Beiträge',
    previous: 'Zurück',
    search: 'Suche',
    switchToLanguage: 'Zu {language} wechseln',
    theme: 'Design wechseln',
    workArchiveTag: 'Archiv',
    workCaseStudy: 'Fallstudie',
    workCompanies: { other: '{n} Unternehmen' },
    workEmpty: 'In dieser Sprache ist noch nichts veröffentlicht.',
    workFilterAll: 'Alle',
    workFilterLabel: 'Nach Art der Arbeit filtern',
    workIndexTitle: 'Alle Projekte',
    workLive: 'Live',
    workMediaPending: 'Projektmedien folgen',
    workProjects: { one: '{n} Projekt', other: '{n} Projekte' },
  },
  fr: {
    closeMenu: 'Fermer le menu',
    openMenu: 'Ouvrir le menu',
    language: 'Langue',
    next: 'Suivant',
    opensInNewTab: "s'ouvre dans un nouvel onglet",
    postsArchiveTitle: 'Articles',
    previous: 'Précédent',
    search: 'Rechercher',
    switchToLanguage: 'Passer en {language}',
    theme: 'Changer de thème',
    workArchiveTag: 'Archives',
    workCaseStudy: 'Étude de cas',
    workCompanies: { one: '{n} entreprise', other: '{n} entreprises' },
    workEmpty: "Rien n'est encore publié dans cette langue.",
    workFilterAll: 'Tous',
    workFilterLabel: 'Filtrer par type de travail',
    workIndexTitle: 'Tous les projets',
    workLive: 'En ligne',
    workMediaPending: 'Visuels du projet à venir',
    workProjects: { one: '{n} projet', other: '{n} projets' },
  },
  ja: {
    closeMenu: 'メニューを閉じる',
    openMenu: 'メニューを開く',
    language: '言語',
    next: '次へ',
    opensInNewTab: '新しいタブで開きます',
    postsArchiveTitle: '記事',
    previous: '前へ',
    search: '検索',
    switchToLanguage: '{language}に切り替え',
    theme: 'テーマを切り替え',
    workArchiveTag: 'アーカイブ',
    workCaseStudy: 'ケーススタディ',
    workCompanies: { other: '{n}社' },
    workEmpty: 'この言語ではまだ何も公開されていません。',
    workFilterAll: 'すべて',
    workFilterLabel: '仕事の種類で絞り込む',
    workIndexTitle: 'すべてのプロジェクト',
    workLive: '公開中',
    workMediaPending: 'プロジェクト画像は準備中',
    workProjects: { other: '{n}件のプロジェクト' },
  },
}

/** Fills `uiCopy[locale].switchToLanguage`'s `{language}` placeholder with a target locale's native name. */
export const switchToLanguageLabel = (locale: Locale, targetName: string): string =>
  uiCopy[locale].switchToLanguage.replace('{language}', targetName)

/**
 * Resolves a count template through CLDR plural rules. Digits stay Latin in every locale (DS-10:
 * codes and numbers are mono/Latin site-wide), so `{n}` is the plain number.
 */
export const pluralCopy = (locale: Locale, copy: PluralCopy, n: number): string => {
  const rule = new Intl.PluralRules(locale).select(n)
  return (copy[rule] ?? copy.other).replace('{n}', String(n))
}
