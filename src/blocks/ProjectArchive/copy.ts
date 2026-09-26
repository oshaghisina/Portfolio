import type { Locale } from '@/utilities/locale'

interface ArchiveCopy {
  search: string
  company: string
  allCompanies: string
  grid: string
  list: string
  view: string
  clear: string
  noResults: string
  archiveEntry: string
  results: string
}

export const archiveCopy: Record<Locale, ArchiveCopy> = {
  en: {
    search: 'Search projects, companies or topics',
    company: 'Company',
    allCompanies: 'All companies',
    grid: 'Gallery view',
    list: 'List view',
    view: 'Project view',
    clear: 'Clear filters',
    noResults: 'No projects match these filters.',
    archiveEntry: 'Project overview',
    results: '{shown} of {total} projects',
  },
  fa: {
    search: 'جست‌وجوی پروژه، شرکت یا موضوع',
    company: 'شرکت',
    allCompanies: 'همهٔ شرکت‌ها',
    grid: 'نمای تصویری',
    list: 'نمای فهرستی',
    view: 'شیوهٔ نمایش پروژه‌ها',
    clear: 'پاک‌کردن فیلترها',
    noResults: 'پروژه‌ای با این فیلترها پیدا نشد.',
    archiveEntry: 'معرفی پروژه',
    results: '{shown} از {total} پروژه',
  },
  ar: {
    search: 'ابحث عن مشروع أو شركة أو موضوع',
    company: 'الشركة',
    allCompanies: 'كل الشركات',
    grid: 'عرض المعرض',
    list: 'عرض القائمة',
    view: 'طريقة عرض المشاريع',
    clear: 'مسح عوامل التصفية',
    noResults: 'لا توجد مشاريع تطابق هذه التصفية.',
    archiveEntry: 'نظرة عامة على المشروع',
    results: '{shown} من {total} مشروعًا',
  },
  es: {
    search: 'Buscar proyectos, empresas o temas',
    company: 'Empresa',
    allCompanies: 'Todas las empresas',
    grid: 'Vista de galería',
    list: 'Vista de lista',
    view: 'Vista de proyectos',
    clear: 'Borrar filtros',
    noResults: 'Ningún proyecto coincide con estos filtros.',
    archiveEntry: 'Resumen del proyecto',
    results: '{shown} de {total} proyectos',
  },
  de: {
    search: 'Projekte, Unternehmen oder Themen suchen',
    company: 'Unternehmen',
    allCompanies: 'Alle Unternehmen',
    grid: 'Galerieansicht',
    list: 'Listenansicht',
    view: 'Projektansicht',
    clear: 'Filter zurücksetzen',
    noResults: 'Keine Projekte entsprechen diesen Filtern.',
    archiveEntry: 'Projektübersicht',
    results: '{shown} von {total} Projekten',
  },
  fr: {
    search: 'Rechercher un projet, une entreprise ou un sujet',
    company: 'Entreprise',
    allCompanies: 'Toutes les entreprises',
    grid: 'Vue galerie',
    list: 'Vue liste',
    view: 'Affichage des projets',
    clear: 'Effacer les filtres',
    noResults: 'Aucun projet ne correspond à ces filtres.',
    archiveEntry: 'Aperçu du projet',
    results: '{shown} sur {total} projets',
  },
  ja: {
    search: 'プロジェクト・企業・テーマを検索',
    company: '企業',
    allCompanies: 'すべての企業',
    grid: 'ギャラリー表示',
    list: 'リスト表示',
    view: 'プロジェクトの表示',
    clear: 'フィルターを解除',
    noResults: '条件に一致するプロジェクトはありません。',
    archiveEntry: 'プロジェクト概要',
    results: '全{total}件中{shown}件',
  },
}
