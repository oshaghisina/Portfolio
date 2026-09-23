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
  /** Form block: the inline error under a field left empty. */
  fieldRequired: string
  /** Form block: the generic failure line when a submission does not go through. */
  formError: string
  /** Form block: the in-flight line while a submission is being sent. */
  formSubmitting: string
  /** Form block: screen-reader suffix marking a required input, rendered after the `*`. */
  requiredField: string
  /** Post hero byline labels. */
  author: string
  /** 404 page: the action back to this locale's homepage. */
  goHome: string
  /** Pagination: the ellipsis between page-number runs, screen-reader only. */
  morePages: string
  /** Pagination: `aria-label` on the `<nav>` wrapping the page numbers. */
  pagination: string
  /** Card: placeholder where a document has no cover image. */
  noImage: string
  /** 404 page: the line under the numeral. */
  notFoundLede: string
  published: string
  /** `<button type="submit">` label in the search form, screen-reader only. */
  submit: string
  /** Card: fallback when a category has no title. */
  untitledCategory: string
  /** Homepage hero console: the small "running" badge. Chrome, not CMS content. */
  heroConsoleStatus: string
  /** Homepage hero console title — the wordmark stays Latin, the noun is translated. */
  heroConsoleTitle: string
  /**
   * The four disciplines listed in the homepage hero console and its rail. Decorative chrome
   * mirroring the Workbench below, so it lives here rather than in the CMS. Stored Title Case:
   * `.eyebrow` uppercases Latin scripts and exempts fa/ar.
   */
  heroDisciplines: [string, string, string, string]
  /**
   * About hero intersection diagram: the three domain labels, the convergence node and its
   * annotation. Decorative chrome that mirrors the hero sentence rather than adding data, so it
   * lives here and not in the CMS — same reasoning as `heroDisciplines`. Stored Title Case;
   * `.eyebrow` uppercases Latin scripts and exempts fa/ar.
   */
  aboutIntersection: {
    /** Product, Business, Technology — in that order, matching the 01/02/03 ornaments. */
    domains: [string, string, string]
    /** The convergence node at the centre of the diagram. */
    centre: string
    /** Small annotation under the centre, in the accent colour. */
    caption: string
    /** `sr-only` figcaption — the SVG itself is `aria-hidden`. */
    description: string
  }
  /**
   * The `/experience` opener's group navigation. Its marks are code-owned geometry and its
   * translated group labels are interface chrome rather than page content an editor would retitle.
   */
  capabilityIndex: {
    /** Core, Systems, Execution, Specialized — in that order, matching the 01–04 ornaments. */
    groups: [string, string, string, string]
    /** Makes the four anchor links' destination explicit. */
    indexLabel: string
    /** Accent caption under the index; `{n}` is replaced with the capability count. */
    total: string
    /** Screen-reader summary — the marks themselves are `aria-hidden`. */
    description: string
  }
  /**
   * Homepage “How I work” panel chrome — Output / Seen in / Next labels. Stage narrative lives
   * in the CMS; these are interface chrome that translators own beside other UI strings.
   */
  workbench: {
    output: string
    seenIn: string
    /** Prefix before the next stage name, e.g. "Next:". */
    next: string
    /** Measure → Frame control label. */
    backToFrame: string
  }
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
  switchToDarkMode: string
  switchToLightMode: string
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
    fieldRequired: 'This field is required',
    formError: 'Something went wrong.',
    formSubmitting: 'Loading, please wait...',
    requiredField: '(required)',
    author: 'Author',
    goHome: 'Go home',
    morePages: 'More pages',
    pagination: 'Pagination',
    noImage: 'No image',
    notFoundLede: 'This page could not be found.',
    published: 'Published',
    submit: 'Submit',
    untitledCategory: 'Untitled category',
    heroConsoleStatus: 'Active',
    heroConsoleTitle: 'sina — workspace',
    heroDisciplines: ['Product', 'Design', 'Research', 'Growth'],
    aboutIntersection: {
      domains: ['Product', 'Business', 'Technology'],
      centre: 'Where I Work',
      caption: 'Intersection',
      description: 'Diagram: product, business and technology converging on one shared working point.',
    },
    capabilityIndex: {
      groups: ['Core', 'Systems', 'Execution', 'Specialized'],
      indexLabel: 'On this page',
      total: '{n} capabilities',
      description:
        'Index: sixteen capabilities in four groups — core, systems, execution and specialized experience.',
    },
    workbench: {
      output: 'Output',
      seenIn: 'Seen in',
      next: 'Next:',
      backToFrame: 'Back to Frame',
    },
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
    switchToDarkMode: 'Switch to dark mode',
    switchToLightMode: 'Switch to light mode',
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
    fieldRequired: 'این فیلد الزامی است',
    formError: 'مشکلی پیش آمد.',
    formSubmitting: 'در حال ارسال، لطفاً صبر کنید…',
    requiredField: '(الزامی)',
    author: 'نویسنده',
    goHome: 'رفتن به خانه',
    morePages: 'صفحه‌های بیشتر',
    pagination: 'صفحه‌بندی',
    noImage: 'بدون تصویر',
    notFoundLede: 'این صفحه پیدا نشد.',
    published: 'منتشرشده',
    submit: 'ارسال',
    untitledCategory: 'دستهٔ بدون عنوان',
    heroConsoleStatus: 'فعال',
    heroConsoleTitle: 'سینا — میز کار',
    heroDisciplines: ['محصول', 'طراحی', 'پژوهش', 'رشد'],
    aboutIntersection: {
      domains: ['محصول', 'کسب‌وکار', 'فناوری'],
      centre: 'جایی که کار می‌کنم',
      caption: 'تقاطع',
      description: 'نمودار: محصول، کسب‌وکار و فناوری که روی یک نقطه‌ی کاری مشترک هم‌گرا می‌شوند.',
    },
    capabilityIndex: {
      groups: ['هسته', 'سیستم‌ها', 'اجرا', 'تخصصی'],
      indexLabel: 'در این صفحه',
      total: '{n} توانمندی',
      description: 'فهرست: شانزده توانمندی در چهار گروه — هسته، سیستم‌ها، اجرا و تجربه‌ی تخصصی.',
    },
    workbench: {
      output: 'خروجی',
      seenIn: 'دیده‌شده در',
      next: 'بعدی:',
      backToFrame: 'بازگشت به قاب‌بندی',
    },
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
    switchToDarkMode: 'تغییر به حالت تیره',
    switchToLightMode: 'تغییر به حالت روشن',
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
    fieldRequired: 'هذا الحقل مطلوب',
    formError: 'حدث خطأ ما.',
    formSubmitting: 'جارٍ الإرسال، يُرجى الانتظار…',
    requiredField: '(مطلوب)',
    author: 'الكاتب',
    goHome: 'إلى الرئيسية',
    morePages: 'صفحات أخرى',
    pagination: 'ترقيم الصفحات',
    noImage: 'بلا صورة',
    notFoundLede: 'تعذّر العثور على هذه الصفحة.',
    published: 'تاريخ النشر',
    submit: 'إرسال',
    untitledCategory: 'تصنيف بلا عنوان',
    heroConsoleStatus: 'نشط',
    heroConsoleTitle: 'سينا — مساحة العمل',
    heroDisciplines: ['منتج', 'تصميم', 'بحث', 'نمو'],
    aboutIntersection: {
      domains: ['منتج', 'أعمال', 'تقنية'],
      centre: 'حيث أعمل',
      caption: 'التقاطع',
      description: 'رسم تخطيطي: المنتج والأعمال والتقنية تتلاقى عند نقطة عمل مشتركة واحدة.',
    },
    capabilityIndex: {
      groups: ['الأساس', 'الأنظمة', 'التنفيذ', 'متخصصة'],
      indexLabel: 'في هذه الصفحة',
      total: '{n} قدرة',
      description: 'فهرس: ست عشرة قدرة في أربع مجموعات — الأساس والأنظمة والتنفيذ والخبرة المتخصصة.',
    },
    workbench: {
      output: 'المخرج',
      seenIn: 'ظَهر في',
      next: 'التالي:',
      backToFrame: 'العودة إلى التأطير',
    },
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
    switchToDarkMode: 'التبديل إلى الوضع الداكن',
    switchToLightMode: 'التبديل إلى الوضع الفاتح',
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
    fieldRequired: 'Este campo es obligatorio',
    formError: 'Algo ha salido mal.',
    formSubmitting: 'Enviando, espera un momento…',
    requiredField: '(obligatorio)',
    author: 'Autor',
    goHome: 'Ir al inicio',
    morePages: 'Más páginas',
    pagination: 'Paginación',
    noImage: 'Sin imagen',
    notFoundLede: 'No se ha encontrado esta página.',
    published: 'Publicado',
    submit: 'Enviar',
    untitledCategory: 'Categoría sin título',
    heroConsoleStatus: 'Activo',
    heroConsoleTitle: 'sina — espacio de trabajo',
    heroDisciplines: ['Producto', 'Diseño', 'Investigación', 'Crecimiento'],
    aboutIntersection: {
      domains: ['Producto', 'Negocio', 'Tecnología'],
      centre: 'Donde Trabajo',
      caption: 'Intersección',
      description: 'Diagrama: producto, negocio y tecnología convergiendo en un mismo punto de trabajo.',
    },
    capabilityIndex: {
      groups: ['Núcleo', 'Sistemas', 'Ejecución', 'Especializada'],
      indexLabel: 'En esta página',
      total: '{n} capacidades',
      description:
        'Índice: dieciséis capacidades en cuatro grupos — núcleo, sistemas, ejecución y experiencia especializada.',
    },
    workbench: {
      output: 'Salida',
      seenIn: 'Visto en',
      next: 'Siguiente:',
      backToFrame: 'Volver a Enmarcar',
    },
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
    switchToDarkMode: 'Cambiar al modo oscuro',
    switchToLightMode: 'Cambiar al modo claro',
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
    fieldRequired: 'Dieses Feld ist erforderlich',
    formError: 'Etwas ist schiefgelaufen.',
    formSubmitting: 'Wird gesendet, bitte warten …',
    requiredField: '(Pflichtfeld)',
    author: 'Autor',
    goHome: 'Zur Startseite',
    morePages: 'Weitere Seiten',
    pagination: 'Seitennummerierung',
    noImage: 'Kein Bild',
    notFoundLede: 'Diese Seite wurde nicht gefunden.',
    published: 'Veröffentlicht',
    submit: 'Senden',
    untitledCategory: 'Kategorie ohne Titel',
    heroConsoleStatus: 'Aktiv',
    heroConsoleTitle: 'sina — Werkbank',
    heroDisciplines: ['Produkt', 'Design', 'Research', 'Wachstum'],
    aboutIntersection: {
      domains: ['Produkt', 'Business', 'Technologie'],
      centre: 'Wo Ich Arbeite',
      caption: 'Schnittmenge',
      description: 'Diagramm: Produkt, Business und Technologie, die in einem gemeinsamen Arbeitspunkt zusammenlaufen.',
    },
    capabilityIndex: {
      groups: ['Kern', 'Systeme', 'Umsetzung', 'Spezialisiert'],
      indexLabel: 'Auf dieser Seite',
      total: '{n} Fähigkeiten',
      description:
        'Index: sechzehn Fähigkeiten in vier Gruppen — Kern, Systeme, Umsetzung und spezialisierte Erfahrung.',
    },
    workbench: {
      output: 'Ergebnis',
      seenIn: 'Zu sehen in',
      next: 'Weiter:',
      backToFrame: 'Zurück zu Rahmen',
    },
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
    switchToDarkMode: 'Zum Dunkelmodus wechseln',
    switchToLightMode: 'Zum Hellmodus wechseln',
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
    fieldRequired: 'Ce champ est obligatoire',
    formError: 'Une erreur est survenue.',
    formSubmitting: 'Envoi en cours, veuillez patienter…',
    requiredField: '(obligatoire)',
    author: 'Auteur',
    goHome: 'Aller à l’accueil',
    morePages: 'Autres pages',
    pagination: 'Pagination',
    noImage: 'Pas d’image',
    notFoundLede: 'Cette page est introuvable.',
    published: 'Publié',
    submit: 'Envoyer',
    untitledCategory: 'Catégorie sans titre',
    heroConsoleStatus: 'Actif',
    heroConsoleTitle: 'sina — établi',
    heroDisciplines: ['Produit', 'Design', 'Recherche', 'Croissance'],
    aboutIntersection: {
      domains: ['Produit', 'Business', 'Technologie'],
      centre: 'Là Où Je Travaille',
      caption: 'Intersection',
      description: 'Schéma : produit, business et technologie convergeant vers un même point de travail.',
    },
    capabilityIndex: {
      groups: ['Noyau', 'Systèmes', 'Exécution', 'Spécialisée'],
      indexLabel: 'Sur cette page',
      total: '{n} compétences',
      description:
        'Index : seize compétences en quatre groupes — noyau, systèmes, exécution et expérience spécialisée.',
    },
    workbench: {
      output: 'Livrable',
      seenIn: 'Vu dans',
      next: 'Suivant :',
      backToFrame: 'Retour à Cadrer',
    },
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
    switchToDarkMode: 'Passer au mode sombre',
    switchToLightMode: 'Passer au mode clair',
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
    fieldRequired: 'この項目は必須です',
    formError: '問題が発生しました。',
    formSubmitting: '送信中です。お待ちください…',
    requiredField: '(必須)',
    author: '著者',
    goHome: 'ホームへ',
    morePages: 'その他のページ',
    pagination: 'ページ送り',
    noImage: '画像なし',
    notFoundLede: 'ページが見つかりませんでした。',
    published: '公開日',
    submit: '送信',
    untitledCategory: 'タイトルのないカテゴリ',
    heroConsoleStatus: '稼働中',
    heroConsoleTitle: 'sina — ワークスペース',
    heroDisciplines: ['プロダクト', 'デザイン', 'リサーチ', 'グロース'],
    aboutIntersection: {
      domains: ['プロダクト', 'ビジネス', 'テクノロジー'],
      centre: '私の仕事の場',
      caption: '交点',
      description: '図：プロダクト、ビジネス、テクノロジーが一つの共通する仕事の地点へ収束する様子。',
    },
    capabilityIndex: {
      groups: ['コア', 'システム', '実行', '専門'],
      indexLabel: 'このページ内',
      total: '{n}の能力',
      description: '索引：16の能力を4つのグループに — コア、システム、実行、専門経験。',
    },
    workbench: {
      output: '成果物',
      seenIn: '事例',
      next: '次:',
      backToFrame: 'フレーミングに戻る',
    },
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
    switchToDarkMode: 'ダークモードに切り替え',
    switchToLightMode: 'ライトモードに切り替え',
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
