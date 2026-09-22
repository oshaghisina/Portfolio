import type { Locale } from './locale'

/** A count template per CLDR plural category; `other` is the fallback. `{n}` is the number. */
export type PluralCopy = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string }

export interface UiCopy {
  /** `/lab` and `/search` chrome: the "no docs matched" line under `PageRange`. */
  archiveNoResults: string
  /** `/lab` and `/search` chrome: `{range}` is `"start–end"` (or a bare count), `{total}` is `pluralCopy(docsLabel)`. */
  archiveRange: string
  closeMenu: string
  /** Generic plural label for `PageRange`'s count line — e.g. "3 docs". */
  docsLabel: PluralCopy
  /** `/lab` archive index title and nav label. */
  labArchiveTitle: string
  language: string
  next: string
  /** Screen-reader suffix for links that open a new tab. */
  opensInNewTab: string
  openMenu: string
  previous: string
  search: string
  /** `/search` input's `<Input placeholder>` — distinct from the `search` label. */
  searchPlaceholder: string
  /** `/search` empty-state line. */
  searchNoResults: string
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
    archiveNoResults: 'Search produced no results.',
    archiveRange: 'Showing {range} of {total}',
    closeMenu: 'Close menu',
    docsLabel: { one: '{n} doc', other: '{n} docs' },
    labArchiveTitle: 'Lab',
    language: 'Language',
    next: 'Next',
    opensInNewTab: 'opens in a new tab',
    openMenu: 'Open menu',
    previous: 'Previous',
    search: 'Search',
    searchNoResults: 'No results found.',
    searchPlaceholder: 'Search',
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
    archiveNoResults: 'جستجو نتیجه‌ای نداشت.',
    archiveRange: 'نمایش {range} از {total}',
    closeMenu: 'بستن منو',
    docsLabel: { other: '{n} مورد' },
    labArchiveTitle: 'آزمایشگاه',
    language: 'زبان',
    next: 'بعدی',
    opensInNewTab: 'در برگهٴ جدید باز می‌شود',
    openMenu: 'باز کردن منو',
    previous: 'قبلی',
    search: 'جستجو',
    searchNoResults: 'نتیجه‌ای یافت نشد.',
    searchPlaceholder: 'جستجو',
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
    archiveNoResults: 'لم يُسفر البحث عن أي نتائج.',
    archiveRange: 'عرض {range} من {total}',
    closeMenu: 'إغلاق القائمة',
    docsLabel: { one: 'مستند واحد', two: 'مستندان', few: '{n} مستندات', other: '{n} مستندًا' },
    labArchiveTitle: 'المختبر',
    language: 'اللغة',
    next: 'التالي',
    opensInNewTab: 'يُفتح في علامة تبويب جديدة',
    openMenu: 'فتح القائمة',
    previous: 'السابق',
    search: 'بحث',
    searchNoResults: 'لم يتم العثور على نتائج.',
    searchPlaceholder: 'بحث',
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
    archiveNoResults: 'La búsqueda no produjo resultados.',
    archiveRange: 'Mostrando {range} de {total}',
    closeMenu: 'Cerrar menú',
    docsLabel: { one: '{n} documento', other: '{n} documentos' },
    labArchiveTitle: 'Laboratorio',
    language: 'Idioma',
    next: 'Siguiente',
    opensInNewTab: 'se abre en una pestaña nueva',
    openMenu: 'Abrir menú',
    previous: 'Anterior',
    search: 'Buscar',
    searchNoResults: 'No se encontraron resultados.',
    searchPlaceholder: 'Buscar',
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
    archiveNoResults: 'Die Suche ergab keine Treffer.',
    archiveRange: '{range} von {total} werden angezeigt',
    closeMenu: 'Menü schließen',
    docsLabel: { one: '{n} Dokument', other: '{n} Dokumente' },
    labArchiveTitle: 'Labor',
    language: 'Sprache',
    next: 'Weiter',
    opensInNewTab: 'öffnet in neuem Tab',
    openMenu: 'Menü öffnen',
    previous: 'Zurück',
    search: 'Suche',
    searchNoResults: 'Keine Ergebnisse gefunden.',
    searchPlaceholder: 'Suche',
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
    archiveNoResults: "La recherche n'a produit aucun résultat.",
    archiveRange: 'Affichage de {range} sur {total}',
    closeMenu: 'Fermer le menu',
    docsLabel: { one: '{n} document', other: '{n} documents' },
    labArchiveTitle: 'Laboratoire',
    language: 'Langue',
    next: 'Suivant',
    opensInNewTab: "s'ouvre dans un nouvel onglet",
    openMenu: 'Ouvrir le menu',
    previous: 'Précédent',
    search: 'Rechercher',
    searchNoResults: 'Aucun résultat trouvé.',
    searchPlaceholder: 'Rechercher',
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
    archiveNoResults: '検索結果はありませんでした。',
    archiveRange: '{total}件中{range}件を表示',
    closeMenu: 'メニューを閉じる',
    docsLabel: { other: '{n}件のドキュメント' },
    labArchiveTitle: 'ラボ',
    language: '言語',
    next: '次へ',
    opensInNewTab: '新しいタブで開きます',
    openMenu: 'メニューを開く',
    previous: '前へ',
    search: '検索',
    searchNoResults: '該当する結果がありません。',
    searchPlaceholder: '検索',
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
