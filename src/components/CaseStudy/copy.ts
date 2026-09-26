import type { Locale } from '@/utilities/locale'

/** Controlled chapter keys: narrative labels plus the four structured chapter blocks. */
export type ChapterKey =
  | 'context'
  | 'problem'
  | 'constraints'
  | 'approach'
  | 'solution'
  | 'research'
  | 'outcome'
  | 'ownership'
  | 'decisions'
  | 'outcomes'
  | 'lessons'
  | 'custom'

export type ProjectStatus = 'shipped' | 'in-progress' | 'pre-launch' | 'paused' | 'concept'

export interface CaseStudyCopy {
  /** Accessible name of the section index. */
  contents: string
  /** "Figure" — prefix of the tiny figure labels. */
  figure: string
  snapshot: { problem: string; role: string; result: string }
  sectionLabels: Record<ChapterKey, string>
  ownership: { own: string; coOwn: string; collaborate: string }
  decision: { why: string; alternatives: string; tradeoff: string; evidence: string }
  outcomeKind: { measured: string; delivered: string }
  /** Label of the terse "what was delivered" list under the outcomes. */
  delivered: string
  compare: { before: string; after: string }
  /** The `pages` figure (DS-25): viewport tabs, sheets of twelve, the whole-page viewer. */
  pages: {
    /** Accessible name of the viewport tabs. */
    views: string
    desktop: string
    mobile: string
    /** Accessible name of the sheet buttons; each button is named by `sheet`. */
    sheets: string
    /** `{from}` and `{to}` are the first and last page numbers on a sheet. */
    sheet: string
    /** Appended to a page's name on its thumbnail. */
    open: string
    previous: string
    next: string
    close: string
  }
  /** "returns to" — the loop annotation of a process map. */
  loopsTo: string
  /** The button on each file of a downloads block. */
  download: string
  status: Record<ProjectStatus, string>
  nextProject: string
  /** Heading of the sibling-case-study strip; `{company}` is replaced with the company name. */
  moreFrom: string
  explore: string
  allWork: string
}

/**
 * Hand-translated page chrome for `/work/<slug>` — labels the design system owns, not CMS
 * content (same rule as `uiCopy`). Editors write the argument; the page names its parts.
 */
export const caseStudyCopy: Record<Locale, CaseStudyCopy> = {
  en: {
    contents: 'Contents',
    figure: 'Figure',
    snapshot: { problem: 'The problem', role: 'The role', result: 'The result' },
    sectionLabels: {
      context: 'Context',
      problem: 'Problem',
      constraints: 'Constraints',
      approach: 'Approach',
      solution: 'Solution',
      research: 'Research',
      outcome: 'Result',
      ownership: 'My role',
      decisions: 'Key decisions',
      outcomes: 'Outcomes',
      lessons: 'What I learned',
      custom: 'Section',
    },
    ownership: { own: 'Owned', coOwn: 'Co-owned', collaborate: 'Collaborated' },
    decision: {
      why: 'Why',
      alternatives: 'Alternatives',
      tradeoff: 'Trade-off',
      evidence: 'Evidence',
    },
    outcomeKind: { measured: 'Measured outcome', delivered: 'Delivered output' },
    delivered: 'What was delivered',
    compare: { before: 'Before', after: 'After' },
    pages: {
      views: 'Screen width',
      desktop: 'Desktop',
      mobile: 'Mobile',
      sheets: 'Sheets of pages',
      sheet: 'Pages {from}–{to}',
      open: 'open the whole page',
      previous: 'Previous page',
      next: 'Next page',
      close: 'Close',
    },
    loopsTo: 'returns to',
    download: 'Download',
    status: {
      shipped: 'Shipped',
      'in-progress': 'In progress',
      'pre-launch': 'Pre-launch',
      paused: 'Paused',
      concept: 'Concept',
    },
    nextProject: 'Next project',
    moreFrom: 'More from {company}',
    explore: 'Read the case study',
    allWork: 'All work',
  },
  fa: {
    contents: 'فهرست',
    figure: 'شکل',
    snapshot: { problem: 'مسئله', role: 'نقش', result: 'نتیجه' },
    sectionLabels: {
      context: 'زمینه',
      problem: 'مسئله',
      constraints: 'محدودیت‌ها',
      approach: 'رویکرد',
      solution: 'راه‌حل',
      research: 'پژوهش',
      outcome: 'نتیجه',
      ownership: 'نقش من',
      decisions: 'تصمیم‌های کلیدی',
      outcomes: 'دستاوردها',
      lessons: 'چه آموختم',
      custom: 'بخش',
    },
    ownership: { own: 'مالکیت', coOwn: 'مالکیت مشترک', collaborate: 'همکاری' },
    decision: {
      why: 'چرا',
      alternatives: 'گزینه‌های دیگر',
      tradeoff: 'بده‌بستان',
      evidence: 'شواهد',
    },
    outcomeKind: { measured: 'نتیجهٔ اندازه‌گیری‌شده', delivered: 'خروجی تحویل‌شده' },
    delivered: 'چه چیزی تحویل شد',
    compare: { before: 'قبل', after: 'بعد' },
    pages: {
      views: 'عرض صفحه‌نمایش',
      desktop: 'دسکتاپ',
      mobile: 'موبایل',
      sheets: 'برگه‌های صفحه‌ها',
      sheet: 'صفحه‌های {from} تا {to}',
      open: 'باز کردن کل صفحه',
      previous: 'صفحهٔ قبلی',
      next: 'صفحهٔ بعدی',
      close: 'بستن',
    },
    loopsTo: 'بازگشت به',
    download: 'دانلود',
    status: {
      shipped: 'منتشرشده',
      'in-progress': 'در حال انجام',
      'pre-launch': 'پیش از انتشار',
      paused: 'متوقف',
      concept: 'کانسپت',
    },
    nextProject: 'پروژهٔ بعدی',
    moreFrom: 'کارهای دیگر در {company}',
    explore: 'خواندن مطالعهٔ موردی',
    allWork: 'همهٔ پروژه‌ها',
  },
  ar: {
    contents: 'المحتويات',
    figure: 'شكل',
    snapshot: { problem: 'المشكلة', role: 'الدور', result: 'النتيجة' },
    sectionLabels: {
      context: 'السياق',
      problem: 'المشكلة',
      constraints: 'القيود',
      approach: 'المنهج',
      solution: 'الحل',
      research: 'البحث',
      outcome: 'النتيجة',
      ownership: 'دوري',
      decisions: 'القرارات الرئيسية',
      outcomes: 'النتائج',
      lessons: 'ما تعلّمته',
      custom: 'قسم',
    },
    ownership: { own: 'مسؤوليتي', coOwn: 'مسؤولية مشتركة', collaborate: 'تعاون' },
    decision: { why: 'لماذا', alternatives: 'البدائل', tradeoff: 'المفاضلة', evidence: 'الأدلة' },
    outcomeKind: { measured: 'نتيجة مقاسة', delivered: 'مخرج مُسلَّم' },
    delivered: 'ما تم تسليمه',
    compare: { before: 'قبل', after: 'بعد' },
    pages: {
      views: 'عرض الشاشة',
      desktop: 'سطح المكتب',
      mobile: 'الجوال',
      sheets: 'مجموعات الصفحات',
      sheet: 'الصفحات من {from} إلى {to}',
      open: 'فتح الصفحة كاملة',
      previous: 'الصفحة السابقة',
      next: 'الصفحة التالية',
      close: 'إغلاق',
    },
    loopsTo: 'يعود إلى',
    download: 'تنزيل',
    status: {
      shipped: 'أُطلق',
      'in-progress': 'قيد التنفيذ',
      'pre-launch': 'قبل الإطلاق',
      paused: 'متوقف',
      concept: 'مفهوم',
    },
    nextProject: 'المشروع التالي',
    moreFrom: 'المزيد من {company}',
    explore: 'قراءة دراسة الحالة',
    allWork: 'كل الأعمال',
  },
  es: {
    contents: 'Contenido',
    figure: 'Figura',
    snapshot: { problem: 'El problema', role: 'El rol', result: 'El resultado' },
    sectionLabels: {
      context: 'Contexto',
      problem: 'Problema',
      constraints: 'Restricciones',
      approach: 'Enfoque',
      solution: 'Solución',
      research: 'Investigación',
      outcome: 'Resultado',
      ownership: 'Mi rol',
      decisions: 'Decisiones clave',
      outcomes: 'Resultados',
      lessons: 'Lo que aprendí',
      custom: 'Sección',
    },
    ownership: { own: 'Responsable', coOwn: 'Corresponsable', collaborate: 'Colaboración' },
    decision: {
      why: 'Por qué',
      alternatives: 'Alternativas',
      tradeoff: 'Compromiso',
      evidence: 'Evidencia',
    },
    outcomeKind: { measured: 'Resultado medido', delivered: 'Entregable' },
    delivered: 'Qué se entregó',
    compare: { before: 'Antes', after: 'Después' },
    pages: {
      views: 'Ancho de pantalla',
      desktop: 'Escritorio',
      mobile: 'Móvil',
      sheets: 'Grupos de páginas',
      sheet: 'Páginas {from}–{to}',
      open: 'abrir la página completa',
      previous: 'Página anterior',
      next: 'Página siguiente',
      close: 'Cerrar',
    },
    loopsTo: 'vuelve a',
    download: 'Descargar',
    status: {
      shipped: 'Lanzado',
      'in-progress': 'En curso',
      'pre-launch': 'Prelanzamiento',
      paused: 'En pausa',
      concept: 'Concepto',
    },
    nextProject: 'Siguiente proyecto',
    moreFrom: 'Más de {company}',
    explore: 'Leer el caso de estudio',
    allWork: 'Todo el trabajo',
  },
  de: {
    contents: 'Inhalt',
    figure: 'Abbildung',
    snapshot: { problem: 'Das Problem', role: 'Die Rolle', result: 'Das Ergebnis' },
    sectionLabels: {
      context: 'Kontext',
      problem: 'Problem',
      constraints: 'Rahmen',
      approach: 'Vorgehen',
      solution: 'Lösung',
      research: 'Research',
      outcome: 'Ergebnis',
      ownership: 'Meine Rolle',
      decisions: 'Entscheidungen',
      outcomes: 'Ergebnisse',
      lessons: 'Gelernt',
      custom: 'Abschnitt',
    },
    ownership: { own: 'Verantwortet', coOwn: 'Mitverantwortet', collaborate: 'Mitgearbeitet' },
    decision: {
      why: 'Warum',
      alternatives: 'Alternativen',
      tradeoff: 'Abwägung',
      evidence: 'Belege',
    },
    outcomeKind: { measured: 'Gemessenes Ergebnis', delivered: 'Gelieferter Output' },
    delivered: 'Was geliefert wurde',
    compare: { before: 'Vorher', after: 'Nachher' },
    pages: {
      views: 'Bildschirmbreite',
      desktop: 'Desktop',
      mobile: 'Mobil',
      sheets: 'Seitengruppen',
      sheet: 'Seiten {from}–{to}',
      open: 'ganze Seite öffnen',
      previous: 'Vorherige Seite',
      next: 'Nächste Seite',
      close: 'Schließen',
    },
    loopsTo: 'zurück zu',
    download: 'Herunterladen',
    status: {
      shipped: 'Veröffentlicht',
      'in-progress': 'In Arbeit',
      'pre-launch': 'Vor dem Launch',
      paused: 'Pausiert',
      concept: 'Konzept',
    },
    nextProject: 'Nächstes Projekt',
    moreFrom: 'Mehr von {company}',
    explore: 'Fallstudie lesen',
    allWork: 'Alle Arbeiten',
  },
  fr: {
    contents: 'Sommaire',
    figure: 'Figure',
    snapshot: { problem: 'Le problème', role: 'Le rôle', result: 'Le résultat' },
    sectionLabels: {
      context: 'Contexte',
      problem: 'Problème',
      constraints: 'Contraintes',
      approach: 'Approche',
      solution: 'Solution',
      research: 'Recherche',
      outcome: 'Résultat',
      ownership: 'Mon rôle',
      decisions: 'Décisions clés',
      outcomes: 'Résultats',
      lessons: 'Ce que j’ai appris',
      custom: 'Section',
    },
    ownership: { own: 'Responsable', coOwn: 'Coresponsable', collaborate: 'Collaboration' },
    decision: {
      why: 'Pourquoi',
      alternatives: 'Alternatives',
      tradeoff: 'Compromis',
      evidence: 'Preuves',
    },
    outcomeKind: { measured: 'Résultat mesuré', delivered: 'Livrable' },
    delivered: 'Ce qui a été livré',
    compare: { before: 'Avant', after: 'Après' },
    pages: {
      views: 'Largeur d’écran',
      desktop: 'Ordinateur',
      mobile: 'Mobile',
      sheets: 'Groupes de pages',
      sheet: 'Pages {from} à {to}',
      open: 'ouvrir la page entière',
      previous: 'Page précédente',
      next: 'Page suivante',
      close: 'Fermer',
    },
    loopsTo: 'revient à',
    download: 'Télécharger',
    status: {
      shipped: 'Lancé',
      'in-progress': 'En cours',
      'pre-launch': 'Pré-lancement',
      paused: 'En pause',
      concept: 'Concept',
    },
    nextProject: 'Projet suivant',
    moreFrom: 'Plus de {company}',
    explore: 'Lire l’étude de cas',
    allWork: 'Tous les projets',
  },
  ja: {
    contents: '目次',
    figure: '図',
    snapshot: { problem: '課題', role: '役割', result: '成果' },
    sectionLabels: {
      context: '背景',
      problem: '課題',
      constraints: '制約',
      approach: 'アプローチ',
      solution: 'ソリューション',
      research: 'リサーチ',
      outcome: '結果',
      ownership: '私の役割',
      decisions: '主要な意思決定',
      outcomes: '成果',
      lessons: '学んだこと',
      custom: 'セクション',
    },
    ownership: { own: '担当', coOwn: '共同担当', collaborate: '協働' },
    decision: { why: '理由', alternatives: '代替案', tradeoff: 'トレードオフ', evidence: '根拠' },
    outcomeKind: { measured: '測定された成果', delivered: '納品物' },
    delivered: '納品したもの',
    compare: { before: '改善前', after: '改善後' },
    pages: {
      views: '画面幅',
      desktop: 'デスクトップ',
      mobile: 'モバイル',
      sheets: 'ページのまとまり',
      sheet: '{from}〜{to}ページ',
      open: 'ページ全体を開く',
      previous: '前のページ',
      next: '次のページ',
      close: '閉じる',
    },
    loopsTo: '戻る：',
    download: 'ダウンロード',
    status: {
      shipped: 'リリース済み',
      'in-progress': '進行中',
      'pre-launch': 'リリース前',
      paused: '一時停止',
      concept: 'コンセプト',
    },
    nextProject: '次のプロジェクト',
    moreFrom: '{company} のほかの事例',
    explore: 'ケーススタディを読む',
    allWork: 'すべての作品',
  },
}
