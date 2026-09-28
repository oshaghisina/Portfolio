import type { Locale } from '@/utilities/locale'

/**
 * The `projects` archive in every locale but English.
 *
 * This is what makes `/xx/work` a real page: the archive query runs with `fallbackLocale: false`
 * and `overrideAccess: false`, so before this existed the archive listed 28 projects in English,
 * 2 in Persian and **0** in Spanish, French and Japanese.
 *
 * Split three ways on purpose. `company` and `role` repeat across the 35 rows — eleven distinct
 * companies and ten distinct roles — so they are translated once and keyed by their English
 * value rather than retyped 35 times, which is also the only way they stay consistent with each
 * other. Only `title` and `summary` are genuinely per-project.
 *
 * `en` is absent by construction: `PROJECT_SEED` is the English source of truth and this table
 * must never be able to overwrite it.
 */
export type ProjectLocale = Exclude<Locale, 'en'>

export interface ProjectText {
  title: string
  summary: string
}

/**
 * `rp1-arena`, `vin-app` and `digital-gold` have entries below even though the translation seeder
 * skips any project carrying a case study: their case-study modules read them instead, because
 * the archive fields and the `sections` chapters have to be written in the same call — several
 * chapter leaves are `required` and Payload validates the whole document per locale.
 */

/** Keyed by the English company string exactly as `PROJECT_SEED` spells it. */
export const projectCompanyCopy: Record<ProjectLocale, Record<string, string>> = {
  fa: {
    Digikala: 'دیجی‌کالا',
    Independent: 'مستقل',
    'Arvan Cloud': 'ابر آروان',
    Carsparency: 'Carsparency',
    Khodro45: 'Khodro45',
    'Hadish Mall': 'مجتمع هدیش',
    Fibona: 'فیبونا',
    OTeacher: 'اوتیچر',
    Biomaze: 'بایومیز',
    Didestan: 'دیدستان',
    A1Paradise: 'A1Paradise',
    'Taha Gasht': 'طاهاگشت',
  },
  ar: {
    Digikala: 'ديجيكالا',
    Independent: 'مستقل',
    'Arvan Cloud': 'أروان كلاود',
    Carsparency: 'Carsparency',
    Khodro45: 'Khodro45',
    'Hadish Mall': 'هديش مول',
    Fibona: 'فيبونا',
    OTeacher: 'أوتيتشر',
    Biomaze: 'بايوميز',
    Didestan: 'ديدستان',
    A1Paradise: 'A1Paradise',
    'Taha Gasht': 'طاها غشت',
  },
  es: {
    Digikala: 'Digikala',
    Independent: 'Independiente',
    'Arvan Cloud': 'Arvan Cloud',
    Carsparency: 'Carsparency',
    Khodro45: 'Khodro45',
    'Hadish Mall': 'Hadish Mall',
    Fibona: 'Fibona',
    OTeacher: 'OTeacher',
    Biomaze: 'Biomaze',
    Didestan: 'Didestan',
    A1Paradise: 'A1Paradise',
    'Taha Gasht': 'Taha Gasht',
  },
  de: {
    Digikala: 'Digikala',
    Independent: 'Unabhängig',
    'Arvan Cloud': 'Arvan Cloud',
    Carsparency: 'Carsparency',
    Khodro45: 'Khodro45',
    'Hadish Mall': 'Hadish Mall',
    Fibona: 'Fibona',
    OTeacher: 'OTeacher',
    Biomaze: 'Biomaze',
    Didestan: 'Didestan',
    A1Paradise: 'A1Paradise',
    'Taha Gasht': 'Taha Gasht',
  },
  fr: {
    Digikala: 'Digikala',
    Independent: 'Indépendant',
    'Arvan Cloud': 'Arvan Cloud',
    Carsparency: 'Carsparency',
    Khodro45: 'Khodro45',
    'Hadish Mall': 'Hadish Mall',
    Fibona: 'Fibona',
    OTeacher: 'OTeacher',
    Biomaze: 'Biomaze',
    Didestan: 'Didestan',
    A1Paradise: 'A1Paradise',
    'Taha Gasht': 'Taha Gasht',
  },
  ja: {
    Digikala: 'Digikala',
    Independent: '独立',
    'Arvan Cloud': 'Arvan Cloud',
    Carsparency: 'Carsparency',
    Khodro45: 'Khodro45',
    'Hadish Mall': 'Hadish Mall',
    Fibona: 'Fibona',
    OTeacher: 'OTeacher',
    Biomaze: 'Biomaze',
    Didestan: 'Didestan',
    A1Paradise: 'A1Paradise',
    'Taha Gasht': 'Taha Gasht',
  },
}

/** Keyed by the English role string exactly as `PROJECT_SEED` spells it. */
export const projectRoleCopy: Record<ProjectLocale, Record<string, string>> = {
  fa: {
    'Designer, Marketer, BI developer': 'طراح، بازاریاب، توسعه‌دهنده‌ی BI',
    'Product designer & strategist': 'طراح محصول و استراتژیست',
    'Product designer': 'طراح محصول',
    Marketer: 'بازاریاب',
    'Product manager': 'مدیر محصول',
    'Product manager & designer': 'مدیر محصول و طراح',
    'UI/UX designer': 'طراح UI/UX',
    'Product designer & developer': 'طراح و توسعه‌دهنده‌ی محصول',
    'Design researcher & process architect': 'پژوهشگر طراحی و معمار فرایند',
    'UX researcher': 'پژوهشگر تجربه‌ی کاربری',
    'Product designer, PM & builder': 'طراح محصول، مدیر محصول و سازنده',
    'Service designer & process architect': 'طراح خدمت و معمار فرایند',
    'Campaign strategist & marketer': 'استراتژیست کمپین و بازاریاب',
  },
  ar: {
    'Designer, Marketer, BI developer': 'مصمم ومسوّق ومطوّر ذكاء أعمال',
    'Product designer & strategist': 'مصمم منتج واستراتيجي',
    'Product designer': 'مصمم منتج',
    Marketer: 'مسوّق',
    'Product manager': 'مدير منتج',
    'Product manager & designer': 'مدير منتج ومصمم',
    'UI/UX designer': 'مصمم واجهات وتجربة',
    'Product designer & developer': 'مصمم ومطوّر منتج',
    'Design researcher & process architect': 'باحث تصميم ومهندس عمليات',
    'UX researcher': 'باحث تجربة مستخدم',
    'Product designer, PM & builder': 'مصمم منتج ومدير منتج ومنفّذ',
    'Service designer & process architect': 'مصمم خدمات ومهندس عمليات',
    'Campaign strategist & marketer': 'استراتيجي حملات ومسوّق',
  },
  es: {
    'Designer, Marketer, BI developer': 'Diseñador, marketer y desarrollador BI',
    'Product designer & strategist': 'Diseñador de producto y estratega',
    'Product designer': 'Diseñador de producto',
    Marketer: 'Marketer',
    'Product manager': 'Product manager',
    'Product manager & designer': 'Product manager y diseñador',
    'UI/UX designer': 'Diseñador UI/UX',
    'Product designer & developer': 'Diseñador y desarrollador de producto',
    'Design researcher & process architect': 'Investigador de diseño y arquitecto de procesos',
    'UX researcher': 'Investigador UX',
    'Product designer, PM & builder': 'Diseñador de producto, PM y desarrollador',
    'Service designer & process architect': 'Diseñador de servicios y arquitecto de procesos',
    'Campaign strategist & marketer': 'Estratega de campañas y marketer',
  },
  de: {
    'Designer, Marketer, BI developer': 'Designer, Marketer, BI-Entwickler',
    'Product designer & strategist': 'Produktdesigner & Stratege',
    'Product designer': 'Produktdesigner',
    Marketer: 'Marketer',
    'Product manager': 'Product Manager',
    'Product manager & designer': 'Product Manager & Designer',
    'UI/UX designer': 'UI/UX-Designer',
    'Product designer & developer': 'Produktdesigner & Entwickler',
    'Design researcher & process architect': 'Design-Researcher & Prozessarchitekt',
    'UX researcher': 'UX-Researcher',
    'Product designer, PM & builder': 'Produktdesigner, PM & Umsetzer',
    'Service designer & process architect': 'Service-Designer & Prozessarchitekt',
    'Campaign strategist & marketer': 'Kampagnenstratege & Marketer',
  },
  fr: {
    'Designer, Marketer, BI developer': 'Designer, marketeur, développeur BI',
    'Product designer & strategist': 'Designer produit et stratège',
    'Product designer': 'Designer produit',
    Marketer: 'Marketeur',
    'Product manager': 'Product manager',
    'Product manager & designer': 'Product manager et designer',
    'UI/UX designer': 'Designer UI/UX',
    'Product designer & developer': 'Designer et développeur produit',
    'Design researcher & process architect': 'Chercheur en design et architecte de processus',
    'UX researcher': 'Chercheur UX',
    'Product designer, PM & builder': 'Designer produit, PM et développeur',
    'Service designer & process architect': 'Designer de services et architecte de processus',
    'Campaign strategist & marketer': 'Stratège de campagne et marketeur',
  },
  ja: {
    'Designer, Marketer, BI developer': 'デザイナー／マーケター／BI開発',
    'Product designer & strategist': 'プロダクトデザイナー／ストラテジスト',
    'Product designer': 'プロダクトデザイナー',
    Marketer: 'マーケター',
    'Product manager': 'プロダクトマネージャー',
    'Product manager & designer': 'プロダクトマネージャー／デザイナー',
    'UI/UX designer': 'UI/UXデザイナー',
    'Product designer & developer': 'プロダクトデザイナー／デベロッパー',
    'Design researcher & process architect': 'デザインリサーチャー／プロセスアーキテクト',
    'UX researcher': 'UXリサーチャー',
    'Product designer, PM & builder': 'プロダクトデザイナー / PM / ビルダー',
    'Service designer & process architect': 'サービスデザイナー／プロセスアーキテクト',
    'Campaign strategist & marketer': 'キャンペーンストラテジスト / マーケター',
  },
}

export const projectTextCopy: Record<string, Record<ProjectLocale, ProjectText>> = {
  // ── Khodro45 + Carsparency (six projects, from the 2026-09-22 Figma scan) ───────────────
  'khodro45-dealer-app': {
    fa: {
      title: 'اپلیکیشن نمایشگاه‌داران Khodro45 — مزایده‌ی زمان‌دار خودرو',
      summary:
        'بخش B2B خودرو۴۵، بازار آنلاین خودرو در ایران: ۲۴۱ صفحه در سه حالت بازار، گزارش کارشناسی درون هر صفحه‌ی خودرو، تسویه‌ای شش‌مرحله‌ای، جریان ثبت آگهی با خودکارشناسی، دو نوع عضویت برای نمایشگاه‌داران و پروتوتایپی با ۲۴ صفحه برای حالت‌های تراکنش.',
    },
    ar: {
      title: 'تطبيق تجّار خودرو45 — سوق مزادات موقوتة لتجّار السيارات في إيران',
      summary:
        'جانب التجار (B2B) من سوق خودرو45 الإيراني: 241 شاشة عبر ثلاثة أوضاع للسوق، وتقرير فحص داخل كل صفحة سيارة، وتسوية من ست مراحل، ومسار لعرض السيارات للبيع مع فحص ذاتي، ونوعان من عضوية التجار، ونموذج أولي من 24 شاشة لحالات المعاملات.',
    },
    es: {
      title: 'App de concesionarios Khodro45 — un mercado de subastas con temporizador',
      summary:
        'El lado B2B del marketplace iraní Khodro45: 241 pantallas en tres modos de mercado, un informe de inspección dentro de cada ficha de coche, una liquidación en seis etapas, un flujo de publicación con autoinspección, dos membresías para concesionarios y un prototipo de 24 pantallas para los estados de la transacción.',
    },
    de: {
      title: 'Khodro45 Händler-App — ein Auktionsmarkt auf Zeit für iranische Autohändler',
      summary:
        'Die B2B-Seite des iranischen Marktplatzes Khodro45: 241 Screens in drei Marktmodi, ein Inspektionsbericht in jeder Fahrzeugseite, eine sechsstufige Abwicklung, ein Flow zum Einstellen mit Selbstinspektion, zwei Händlermitgliedschaften und ein Prototyp mit 24 Screens für Transaktionszustände.',
    },
    fr: {
      title: 'Application concessionnaires Khodro45 — un marché aux enchères minuté',
      summary:
        'Le côté B2B de la place de marché iranienne Khodro45 : 241 écrans répartis sur trois modes de marché, un rapport d\'inspection dans chaque fiche véhicule, un règlement en six étapes, un parcours de mise en vente avec auto-inspection, deux adhésions pour négociants et un prototype de 24 écrans pour les états de transaction.',
    },
    ja: {
      title: 'Khodro45 ディーラーアプリ — イラン自動車ディーラー向けの時限オークション市場',
      summary:
        'イランのマーケットプレイスKhodro45のB2B側。3つのマーケットモードにわたる241画面、すべての車両ページに組み込まれた検査レポート、6段階の精算、セルフ検査付きの出品フロー、2つのディーラー会員制度、そして取引状態のための24画面のプロトタイプ。',
    },
  },
  'carsparency-pro': {
    fa: {
      title: 'Carsparency Pro — پلتفرم نمایشگاه‌داران، از پیشنهاد تا انتقال سند',
      summary:
        'بخش خرید یک بازار آنلاین خودرو در امارات، طراحی‌شده به‌صورت اپ و سایت دسکتاپ: مزایده‌های زمان‌دار با ارزش منصفانه‌ی بازار (Fair Market Value) زیر هر پیشنهاد، و سپس مسیری پنج‌مرحله‌ای برای سفارش، از مذاکره و پرداخت تا تحویل و انتقال سند.',
    },
    ar: {
      title: 'Carsparency Pro — منصة التجار، من العرض حتى نقل الملكية',
      summary:
        'جانب الشراء في سوق سيارات إماراتي، صُمّم تطبيقًا وموقعًا لسطح المكتب: مزادات موقوتة تُظهر القيمة السوقية العادلة (Fair Market Value) تحت كل عرض، ثم مسار طلب من خمس مراحل يمر بالتفاوض والدفع والتسليم ونقل الملكية.',
    },
    es: {
      title: 'Carsparency Pro — la plataforma para concesionarios, de la puja al traspaso de titularidad',
      summary:
        'El lado comprador de un marketplace de coches en EAU, diseñado como app y como web de escritorio: subastas cronometradas con el Fair Market Value bajo cada puja y, después, un recorrido de pedido en cinco etapas por la negociación, el pago, la entrega y el traspaso de titularidad.',
    },
    de: {
      title: 'Carsparency Pro — die Händlerplattform, vom Gebot bis zur Eigentumsübertragung',
      summary:
        'Die Einkaufsseite eines Automarktplatzes in den VAE, gestaltet als App und Desktop-Website: zeitlich begrenzte Auktionen mit dem Fair Market Value unter jedem Gebot, danach ein fünfstufiger Auftragsweg über Verhandlung, Zahlung, Lieferung und Eigentumsübertragung.',
    },
    fr: {
      title: 'Carsparency Pro — la plateforme négociants, de l\'offre au transfert de propriété',
      summary:
        'Le côté achat d\'une place de marché automobile aux EAU, conçu comme app et comme site desktop : des enchères chronométrées avec la Fair Market Value sous chaque offre, puis un parcours de commande en cinq étapes, de la négociation au paiement, à la livraison et au transfert de propriété.',
    },
    ja: {
      title: 'Carsparency Pro — 入札から名義変更までのディーラー向けプラットフォーム',
      summary:
        'UAEの自動車マーケットプレイスの購入側を、アプリとデスクトップサイトとして設計。すべての入札の下にFair Market Value（適正市場価格）を示す時間制オークションと、交渉、支払い、納車、名義変更へと続く5段階の注文フロー。',
    },
  },
  'carsparency-back-office': {
    fa: {
      title: 'بک‌آفیس Carsparency — کنسول اپراتور در پشت بازار آنلاین',
      summary:
        'کنسول کارکنان در پشت بازار آنلاین: ۶۸ صفحه‌ی دسکتاپ با نوار کناری هفت‌بخشی، نمای سریع درخواست با تاریخچه‌ی کامنت و قیمت، چهار قیمت کنار هم (هدف، فروشنده، منصفانه و نمایشگاه‌دار) و گزارش کارشناسی قابل چاپ.',
    },
    ar: {
      title: 'المكتب الخلفي لـ Carsparency — لوحة المشغّلين خلف السوق الإلكترونية',
      summary:
        'لوحة الموظفين خلف السوق: 68 شاشة مكتبية عبر شريط جانبي من سبعة أقسام، وعرض سريع للطلب مع سجل التعليقات والأسعار، وأربعة أسعار جنبًا إلى جنب (المستهدف والبائع والعادل والتاجر)، وتقرير الفحص القابل للطباعة.',
    },
    es: {
      title: 'Back office de Carsparency — la consola de operaciones detrás del marketplace',
      summary:
        'La consola del equipo detrás del marketplace: 68 pantallas de escritorio con una barra lateral de siete secciones, una vista rápida de solicitudes con historial de comentarios y precios, cuatro precios uno junto a otro (objetivo, del vendedor, justo y del concesionario) y el informe de inspección imprimible.',
    },
    de: {
      title: 'Carsparency Back Office — die Operator-Konsole hinter dem Marktplatz',
      summary:
        'Die interne Konsole hinter dem Marktplatz: 68 Desktop-Screens mit einer Seitenleiste aus sieben Bereichen, eine Schnellansicht für Anfragen mit Kommentar- und Preisverlauf, vier Preise nebeneinander (Ziel-, Verkäufer-, fairer und Händlerpreis) und der druckbare Inspektionsbericht.',
    },
    fr: {
      title: 'Back-office Carsparency — la console opérateur derrière la place de marché',
      summary:
        'La console interne derrière la place de marché : 68 écrans desktop organisés par une barre latérale en sept sections, une vue rapide des demandes avec historique des commentaires et des prix, quatre prix côte à côte (cible, vendeur, juste et marchand) et le rapport d’inspection imprimable.',
    },
    ja: {
      title: 'Carsparencyバックオフィス — マーケットプレイスを支えるオペレーターコンソール',
      summary:
        'マーケットプレイスの裏側を担うスタッフ用コンソール。7セクションのサイドバーにまたがる68のデスクトップ画面、コメント履歴と価格履歴を備えた依頼のクイックビュー、目標・売り手・適正・ディーラーの四つの価格の並列表示、そして印刷可能な検査レポート。',
    },
  },
  'carsparency-inspection': {
    fa: {
      title: 'Carsparency Inspection — تبدیل بازدیدی فیزیکی به سابقه‌ای ساختاریافته',
      summary:
        'ابزار میدانی‌ای که مدرکِ مبنای معاملات بازار را می‌سازد: صفی از خودروها، ویزارد مشخصات خودرو، ده بخش کارشناسی با قبول یا رد برای هر قطعه، و ایرادهایی که با عکس‌های خودشان ثبت می‌شوند — سرچشمه‌ی داده‌های وضعیت خودرو که نمایشگاه‌دارها می‌خوانند.',
    },
    ar: {
      title: 'Carsparency Inspection — تحويل المعاينة الفعلية إلى سجلّ منظَّم',
      summary:
        'الأداة الميدانية التي تُنتج الأدلة التي يقوم عليها التداول في السوق: قائمة بالسيارات، ومعالج لتفاصيل السيارة، وعشرة مجالات فحص مع نجاح أو إخفاق لكل قطعة، وعيوب تُسجَّل بصورها الخاصة — مصدر بيانات الحالة التي يقرؤها التجّار.',
    },
    es: {
      title: 'Carsparency Inspection — convertir una revisión física en un registro estructurado',
      summary:
        'La herramienta de campo que produce la evidencia sobre la que opera el marketplace: una cola de coches, un asistente de datos del coche, diez áreas de inspección con aprobado o rechazado para cada pieza y defectos registrados con sus propias fotos — la fuente de los datos de estado que leen los concesionarios.',
    },
    de: {
      title: 'Carsparency Inspection — aus einer physischen Begutachtung wird ein strukturiertes Protokoll',
      summary:
        'Das Außendienst-Tool, das die Belege liefert, auf denen der Marktplatz handelt: eine Warteschlange von Autos, ein Fahrzeugdaten-Assistent, zehn Prüfbereiche mit Bestanden oder Nicht bestanden für jedes Teil und Mängel mit eigenen Fotos — die Quelle der Zustandsdaten, die Händler lesen.',
    },
    fr: {
      title: 'Carsparency Inspection — transformer un examen physique en dossier structuré',
      summary:
        'L’outil de terrain qui produit les preuves sur lesquelles repose le marché : une file de voitures, un assistant de saisie du véhicule, dix zones d’inspection avec conforme ou non conforme pour chaque pièce, et des défauts enregistrés avec leurs propres photos — la source des données d’état que lisent les marchands.',
    },
    ja: {
      title: 'Carsparency Inspection — 物理的な車両確認を構造化された記録へ',
      summary:
        'マーケットプレイスの取引を支える証拠を生み出す現場ツール。車両のキュー、車両情報ウィザード、部位ごとに合格・不合格を付ける10の検査エリア、そして専用の写真とともに記録される不具合。ディーラーが読む車両状態データの源泉。',
    },
  },
  'carsparency-web': {
    fa: {
      title: 'Carsparency Web — مسیر فروشنده‌ای که اول قیمت خودرو را اعلام می‌کند',
      summary:
        'سمت فروشنده‌ی شخصی، در موبایل و دسکتاپ: ویزاردی سه‌مرحله‌ای که پیش از پرسش‌های جزئی قیمتی تخمینی نشان می‌دهد، مانع‌هایی مانند وام باقی‌مانده را به گزینه تبدیل می‌کند و فروشنده را در خودبازرسی با شانزده عکس هدایت می‌کند.',
    },
    ar: {
      title: 'Carsparency Web — رحلة بائع تبدأ بتسعير السيارة',
      summary:
        'جانب البائع الفرد، على الجوال وسطح المكتب: معالج من ثلاث خطوات يعرض سعرًا تقديريًا قبل الأسئلة التفصيلية، ويحوّل العوائق مثل القرض القائم إلى خيارات، ويرشد البائع إلى فحص ذاتي عبر ست عشرة صورة.',
    },
    es: {
      title: 'Carsparency Web — un recorrido de venta que pone precio al coche primero',
      summary:
        'El lado del vendedor particular, en móvil y escritorio: un asistente de tres pasos que muestra un precio estimado antes de las preguntas detalladas, convierte obstáculos como un préstamo pendiente en opciones y guía una autoinspección en dieciséis fotos.',
    },
    de: {
      title: 'Carsparency Web — eine Verkaufsstrecke, die zuerst den Preis nennt',
      summary:
        'Die Seite privater Verkäufer, mobil und auf dem Desktop: ein dreistufiger Assistent, der vor den Detailfragen einen Schätzpreis zeigt, Hindernisse wie einen offenen Kredit in Wahlmöglichkeiten verwandelt und durch eine Selbstinspektion in sechzehn Fotos führt.',
    },
    fr: {
      title: 'Carsparency Web — un parcours vendeur qui estime d\'abord la voiture',
      summary:
        'Le côté du vendeur particulier, sur mobile et desktop : un assistant en trois étapes qui affiche un prix estimé avant les questions détaillées, transforme les blocages comme un prêt en cours en choix, et guide une auto-inspection en seize photos.',
    },
    ja: {
      title: 'Carsparency Web — まず車の価格を示す売却体験',
      summary:
        '個人の売り手側を、モバイルとデスクトップで。詳細な質問の前に査定価格を示す3ステップのウィザードが、残っているローンなどの障害を選択肢に変え、16枚の写真によるセルフ点検へと導く。',
    },
  },
  'carsparency-design-system': {
    fa: {
      title: 'دیزاین سیستم Carsparency — یک کتابخانه زیر چهار محصول',
      summary:
        'کتابخانه‌ی مشترکی که زیر Pro، بک‌آفیس، کارشناسی و وب قرار دارد: دوازده طیف رنگی، بورد تایپوگرافی با پنج وزن و ۱۵ مجموعه‌ی کامپوننت با ۲۶۵ واریانت، که هر چهار فایل محصول در یک تم روشن و یک تم تیره از آن استفاده می‌کنند.',
    },
    ar: {
      title: 'نظام التصميم في Carsparency — مكتبة واحدة تحت أربعة منتجات',
      summary:
        'المكتبة المشتركة التي تقوم عليها Pro ولوحة الإدارة والفحص والموقع: اثنا عشر تدرّجًا لونيًا، ولوحة خطوط بخمسة أوزان، و15 مجموعة مكوّنات تضم 265 متغيّرًا، تستخدمها ملفات المنتجات الأربعة كلها بسمة فاتحة وأخرى داكنة.',
    },
    es: {
      title: 'Sistema de diseño de Carsparency — una biblioteca bajo cuatro productos',
      summary:
        'La biblioteca compartida bajo Pro, Back Office, Inspección y Web: doce rampas de color, un tablero tipográfico de cinco pesos y 15 conjuntos de componentes con 265 variantes, que consumen los cuatro archivos de producto en un tema claro y uno oscuro.',
    },
    de: {
      title: 'Carsparency-Designsystem — eine Bibliothek unter vier Produkten',
      summary:
        'Die gemeinsame Bibliothek unter Pro, Backoffice, Prüfung und Web: zwölf Farbskalen, ein Typo-Board mit fünf Schnitten und 15 Komponentensets mit 265 Varianten, genutzt von allen vier Produktdateien in einem hellen und einem dunklen Theme.',
    },
    fr: {
      title: 'Système de design Carsparency — une bibliothèque sous quatre produits',
      summary:
        'La bibliothèque partagée sous Pro, Back-office, Inspection et Web : douze gammes de couleur, une planche typographique à cinq graisses et 15 jeux de composants totalisant 265 variantes, consommés par les quatre fichiers produit en thème clair et en thème sombre.',
    },
    ja: {
      title: 'Carsparencyデザインシステム — 4つのプロダクトを支えるひとつのライブラリ',
      summary:
        'Pro、バックオフィス、検査、ウェブを支える共有ライブラリ。12のカラーランプ、5ウェイトのタイプボード、265のバリアントを持つ15のコンポーネントセットを、4つのプロダクトファイルすべてがライトとダークの2テーマで利用している。',
    },
  },

  // ── Taha Gasht ──────────────────────────────────────────────────────────────────────────
  'taha-gasht-platform': {
    fa: {
      title: 'طاهاگشت — بازطراحی سایت رزرو',
      summary:
        'سایت رزرو یک آژانس سی‌ساله را برای پرواز، هتل و تور بازطراحی کردم؛ با بنچمارک دوازده سایت و معماری اطلاعات شروع شد و حالا روی سایت است. کانسپت برنامه‌ریز سفر و بخش اجتماعی هم طراحی شد.',
    },
    ar: {
      title: 'طاها غشت — إعادة تصميم موقع الحجز',
      summary:
        'موقع الحجز لوكالة سفر عمرها ثلاثون عامًا، أُعيد تصميمه للرحلات الجوية والفنادق والجولات: من مقارنة اثني عشر موقعًا وهندسة المعلومات إلى صفحات منشورة، مع تصوّر لمخطِّط رحلات وطبقة اجتماعية.',
    },
    es: {
      title: 'Taha Gasht — rediseño del sitio de reservas',
      summary:
        'El sitio de reservas de una agencia de viajes con treinta años, rediseñado para vuelos, hoteles y tours: de un análisis de doce sitios y la arquitectura de información a páginas publicadas, más un concepto de planificador de viajes y capa social.',
    },
    de: {
      title: 'Taha Gasht — Redesign der Buchungsseite',
      summary:
        'Die Buchungsseite einer dreißig Jahre alten Reiseagentur, neu gestaltet für Flüge, Hotels und Touren: vom Vergleich mit zwölf anderen Seiten und der Informationsarchitektur bis zu Live-Seiten, dazu ein Konzept für Reiseplaner und Social-Ebene.',
    },
    fr: {
      title: 'Taha Gasht — refonte du site de réservation',
      summary:
        'Le site de réservation d’une agence de voyages de trente ans, repensé pour les vols, les hôtels et les circuits : de douze sites comparés et de l’architecture de l’information jusqu’aux pages en ligne, avec un concept de planificateur de voyage et de couche sociale.',
    },
    ja: {
      title: 'Taha Gasht — 予約サイトのリデザイン',
      summary:
        '創業30年の旅行会社の予約サイトを、航空券・ホテル・ツアーのためにリデザイン。12サイトの比較と情報設計から公開中のページまで。旅行プランナーとソーシャル機能のコンセプトも。',
    },
  },

  // ── Independent ─────────────────────────────────────────────────────────────────────────
  'nim-dang': {
    fa: {
      title: 'نیم‌دانگ — بازار خرید و فروش متری ملک در تهران',
      summary:
        'پلتفرم خرید متری ملک در تهران با امکان فروش دوباره‌ی سهم: ۱۹۱ صفحه و سیستم طراحی با ۴۳۰ جزء. نشانگر «پایین / منصفانه / بالا» به خریدار و فروشنده‌ی بازار ثانویه در ارزیابی قیمت کمک می‌کند.',
    },
    ar: {
      title: 'نيم دانغ — بورصة لأمتار طهران المربّعة',
      summary:
        'منصّة إيرانية تبيع عقارات طهران بالمتر المربّع ثم تتيح لمالكيها إعادة بيعها: 191 شاشة ونظام تصميم من 430 مكوّنًا، وأحدّ أفكارها مؤشّر منخفض/عادل/مرتفع يقيّم طرفَي إعادة البيع معًا.',
    },
    es: {
      title: 'Nim Dang — una bolsa para los metros cuadrados de Teherán',
      summary:
        'Una plataforma iraní que vende inmuebles de Teherán por metro cuadrado y luego deja que sus dueños los revendan: 191 pantallas y un sistema de diseño de 430 componentes, cuya idea más afilada es un medidor bajo/justo/alto que califica los dos lados de una reventa entre particulares.',
    },
    de: {
      title: 'Nim Dang — eine Börse für Teherans Quadratmeter',
      summary:
        'Eine iranische Plattform, die Teheraner Immobilien nach Quadratmetern verkauft und ihre Eigentümer danach weiterverkaufen lässt: 191 Screens und ein Design System aus 430 Komponenten, dessen schärfste Idee eine Anzeige niedrig/fair/hoch ist, die beide Seiten eines Weiterverkaufs bewertet.',
    },
    fr: {
      title: 'Nim Dang — une bourse pour les mètres carrés de Téhéran',
      summary:
        'Une plateforme iranienne qui vend l’immobilier de Téhéran au mètre carré, puis laisse ses propriétaires le revendre : 191 écrans et un design system de 430 composants, dont l’idée la plus fine est une jauge bas/juste/haut qui note les deux côtés d’une revente entre particuliers.',
    },
    ja: {
      title: 'Nim Dang — テヘランの1平米を売買する取引所',
      summary:
        'テヘランの不動産を平米単位で販売し、その後は保有者どうしの転売も可能にするイランのプラットフォーム。191画面と430コンポーネントのデザインシステムからなり、最も鋭いアイデアは、個人間転売の売り手と買い手の双方を採点する「安い／妥当／高い」のゲージ。',
    },
  },
  yaravan: {
    fa: {
      title: 'یاراوان — طراحی خدمت برای عملیات پس از فروشی که هیچ‌کس مکتوبش نکرده بود',
      summary:
        'طراحی خدمتی که یک برند گارانتی بر آن استوار است: ۲۲ فرایند پس از فروش در شش سطح، از نقشه‌ی کلان تا دستورالعمل‌های کاری، فقط تا جایی ترسیم شد که شواهد اجازه می‌داد — و هر شکاف به‌جای پر شدن، علامت خورد، شمرده شد و صاحب پیدا کرد.',
    },
    ar: {
      title: 'ياراوان — تصميم خدمة لعمليات ما بعد البيع التي لم يدوّنها أحد',
      summary:
        'تصميم الخدمة وراء علامة ضمان: 22 عملية لما بعد البيع مرسومة على ستة مستويات، من الخريطة الكلية نزولًا إلى تعليمات العمل، لا أبعد مما سمحت به الأدلة — وكل فجوة موسومة ومعدودة ولها مالك بدلًا من أن تُملأ.',
    },
    es: {
      title:
        'Yaravan — diseño de servicios para una operación de posventa que nadie había puesto por escrito',
      summary:
        'El diseño de servicios detrás de una marca de garantías: 22 procesos de posventa dibujados en seis niveles, desde un mapa macro hasta las instrucciones de trabajo, solo hasta donde lo permitía la evidencia — con cada hueco marcado, contado y con responsable en lugar de rellenado.',
    },
    de: {
      title:
        'Yaravan — Service-Design für einen Kundendienstbetrieb, den niemand aufgeschrieben hatte',
      summary:
        'Das Service-Design hinter einer Garantiemarke: 22 Kundendienstprozesse, auf sechs Ebenen gezeichnet, von einer Makro-Landkarte bis hinunter zu Arbeitsanweisungen und nur so weit, wie die Nachweise es erlaubten — jede Lücke markiert, gezählt und mit Verantwortlichem versehen, statt gefüllt.',
    },
    fr: {
      title:
        'Yaravan — le design de services d’une opération d’après-vente que personne n’avait décrite',
      summary:
        'Le design de services derrière une marque de garantie : 22 processus d’après-vente dessinés sur six niveaux, d’une carte macro jusqu’aux instructions de travail, sans aller au-delà de ce que les preuves permettaient — chaque lacune étant signalée, comptée et dotée d’un responsable au lieu d’être comblée.',
    },
    ja: {
      title: 'Yaravan — 誰も書き留めてこなかったアフターサービス業務のサービスデザイン',
      summary:
        '保証ブランドを支えるサービスデザイン。22のアフターサービスのプロセスを、マクロマップから作業手順書まで6つの階層で、証拠が許す範囲でだけ描いた。空白は埋めずに、すべて明示し、数え、担当者を割り当てた。',
    },
  },
  'yaravan-platform': {
    fa: {
      title: 'یاراوان — پلتفرم خدمات پس از فروش و گارانتی',
      summary:
        'پلتفرم گارانتی فارسی — سایت عمومی، پنل مشتری و پنل کارکنان — بر پایه‌ی عملیاتی که هنوز در حال تعریف است، که در آن هر واقعیتی که هیچ‌کس تأییدش نکرده بود، به‌جای جمله‌ای از سر اطمینان، به شکل موردی باز، آشکار و صاحب‌دار منتشر می‌شود.',
    },
    ar: {
      title: 'ياراوان — منصة ضمان تُظهر أسئلتها المفتوحة',
      summary:
        'منصة ضمان فارسية — موقع عام ولوحة للعملاء ولوحة للموظفين — بُنيت على تشغيلٍ لا يزال قيد التحديد، حيث تُعرض كل حقيقة لم يوافق عليها أحد بوصفها عنصرًا مفتوحًا ظاهرًا له مالك، بدلًا من جملة واثقة.',
    },
    es: {
      title: 'Yaravan — una plataforma de garantías que muestra sus preguntas abiertas',
      summary:
        'Una plataforma de garantías en persa — sitio público, panel de clientes y panel del personal — construida sobre una operación que aún se está definiendo, donde cada dato que nadie había aprobado se publica como un elemento abierto, visible y con responsable, en lugar de una frase segura de sí misma.',
    },
    de: {
      title: 'Yaravan — eine Garantieplattform, die ihre offenen Fragen zeigt',
      summary:
        'Eine persische Garantieplattform — öffentliche Website, Kundenbereich und Mitarbeiterbereich — auf einem Betrieb, der erst noch definiert wurde: Jede Tatsache, die niemand freigegeben hatte, wird als sichtbarer offener Punkt mit Verantwortlichem ausgeliefert statt als selbstsicherer Satz.',
    },
    fr: {
      title: 'Yaravan — une plateforme de garantie qui montre ses questions ouvertes',
      summary:
        'Une plateforme de garantie en persan — site public, espace client et espace collaborateurs — bâtie sur une opération encore en cours de définition, où chaque fait que personne n’avait validé est livré sous la forme d’un élément ouvert visible, doté d’un responsable, au lieu d’une phrase assurée.',
    },
    ja: {
      title: 'Yaravan — 未決の問いを隠さず示す保証プラットフォーム',
      summary:
        'ペルシア語の保証プラットフォーム — 公開サイト、カスタマーパネル、スタッフパネル。まだ定義の途中にある業務の上に築き、誰も承認していない事実はすべて、自信ありげな一文ではなく、担当者が明示された、目に見える未決項目として示される。',
    },
  },
  'digital-gold': {
    fa: {
      title: 'طلای دیجیتال — چشم‌انداز محصول و رشد',
      summary:
        'چشم‌انداز، ویژگی‌ها و راهبرد رشد محصول معامله‌ی طلای دیجی‌کالا را تعریف کردم؛ از کمپین‌ها و بخش‌بندی کاربران تا داشبوردهای BI برای سنجش نتیجه.',
    },
    ar: {
      title: 'الذهب الرقمي — رؤية المنتج والنمو',
      summary:
        'حدّدتُ رؤية المنتج ومزاياه واستراتيجية النمو لمنتج تداول الذهب في ديجيكالا — من الحملات والتقسيم إلى لوحات ذكاء الأعمال التي تتابعها.',
    },
    es: {
      title: 'Digital Gold — visión de producto y crecimiento',
      summary:
        'Definí la visión, las funcionalidades y la estrategia de crecimiento del producto de compraventa de oro de Digikala: de las campañas y la segmentación a los paneles de BI que las medían.',
    },
    de: {
      title: 'Digital Gold — Produktvision & Growth',
      summary:
        'Vision, Funktionen und Growth-Strategie für Digikalas Goldhandelsprodukt definiert – von den Kampagnen und der Segmentierung bis zu den BI-Dashboards, die sie nachverfolgten.',
    },
    fr: {
      title: 'Digital Gold — vision produit et croissance',
      summary:
        'J’ai défini la vision, les fonctionnalités et la stratégie de croissance du produit d’achat-vente d’or de Digikala — des campagnes et de la segmentation aux tableaux de bord BI qui les suivaient.',
    },
    ja: {
      title: 'Digital Gold — プロダクトビジョンとグロース',
      summary:
        'Digikalaの金取引プロダクトについて、プロダクトビジョン、機能、グロース戦略を定義。キャンペーンとセグメンテーションから、それを追うBIダッシュボードまで。',
    },
  },
  'rp1-arena': {
    fa: {
      title: 'RP1 Arena — مجموعه‌ی بازی‌های Play-to-Earn',
      summary:
        'راهبرد و طراحی محصول برای مجموعه‌ای موبایلی از بازی‌های HTML5 با یک سازوکار مشترک رقابت و درآمدزایی. پژوهش نمونه‌های رقابتی، تعیین دامنه‌ی MVP و مشخصات کامل وایرفریم در ۱۶ بخش را انجام دادم.',
    },
    ar: {
      title: 'RP1 — ساحة Play-to-Earn متعدّدة الألعاب',
      summary:
        'تصميم منتج واستراتيجية لساحة Play-to-Earn على الهاتف تجمع ألعاب HTML5 تحت طبقة تنافسية واقتصادية واحدة — بحث في المنصّات المنافسة، وتحديد نطاق MVP، ومواصفات إطارية كاملة عبر 16 قسمًا.',
    },
    es: {
      title: 'RP1 — arena play-to-earn multijuego',
      summary:
        'Diseño de producto y estrategia para una arena móvil play-to-earn que reúne juegos HTML5 bajo una única capa competitiva y económica: investigación de plataformas competidoras, acotación del MVP y una especificación completa de wireframes en 16 secciones.',
    },
    de: {
      title: 'RP1 — Multi-Game-Play-to-Earn-Arena',
      summary:
        'Produktdesign und Strategie für eine mobile Play-to-Earn-Arena, die HTML5-Spiele unter einer gemeinsamen Wettbewerbs- und Ökonomieschicht bündelt – Recherche zu Wettbewerbsplattformen, MVP-Zuschnitt und eine vollständige Wireframe-Spezifikation über 16 Bereiche.',
    },
    fr: {
      title: 'RP1 — arène play-to-earn multi-jeux',
      summary:
        'Design produit et stratégie pour une arène mobile play-to-earn réunissant des jeux HTML5 sous une même couche compétitive et économique — recherche sur les plateformes concurrentes, cadrage du MVP et une spécification complète de wireframes sur 16 sections.',
    },
    ja: {
      title: 'RP1 — マルチゲームのPlay-to-Earnアリーナ',
      summary:
        'HTML5ゲームをひとつの競争・経済レイヤーの下に集めるモバイルPlay-to-Earnアリーナのプロダクトデザインと戦略。競合プラットフォームのリサーチ、MVPのスコープ定義、16セクションにわたるワイヤーフレーム仕様。',
    },
  },
  'arvan-cloud-platform-redesign': {
    fa: {
      title: 'بازطراحی پلتفرم ابری و معماری اطلاعات',
      summary:
        'بازطراحی تجربه‌ی کاربری و معماری اطلاعات پلتفرم ابری آروان را هدایت کردم. داده‌های رفتاری نشان داد کدام شاخص‌های سرور برای کاربران اهمیت دارند.',
    },
    ar: {
      title: 'إعادة تصميم المنصّة السحابية ومعمارية المعلومات',
      summary:
        'قدتُ إعادة تصميم واجهة وتجربة المستخدم ومعمارية المعلومات لمنصّة أروان السحابية، مستخدمًا بيانات السلوك لتحديد مؤشّرات الخوادم التي يحتاج المستخدمون رؤيتها فعلًا.',
    },
    es: {
      title: 'Rediseño de plataforma cloud y arquitectura de información',
      summary:
        'Lideré el rediseño de UI/UX y de la arquitectura de información de la plataforma cloud de Arvan, usando datos de comportamiento para decidir qué métricas de servidor necesitaban ver realmente los usuarios.',
    },
    de: {
      title: 'Cloud-Plattform-Redesign & Informationsarchitektur',
      summary:
        'Das UI/UX- und Informationsarchitektur-Redesign von Arvans Cloud-Plattform geleitet und anhand von Verhaltensdaten entschieden, welche Servermetriken Nutzer wirklich sehen mussten.',
    },
    fr: {
      title: 'Refonte de plateforme cloud et architecture de l’information',
      summary:
        'J’ai piloté la refonte UI/UX et de l’architecture de l’information de la plateforme cloud d’Arvan, en m’appuyant sur les données de comportement pour décider quelles métriques serveur les utilisateurs avaient réellement besoin de voir.',
    },
    ja: {
      title: 'クラウドプラットフォームの再設計と情報設計',
      summary:
        'Arvanのクラウドプラットフォームについて、UI/UXと情報設計の刷新を主導。行動データをもとに、ユーザーが実際に見る必要のあるサーバー指標を判断した。',
    },
  },
  'bnpl-concept': {
    fa: {
      title: 'خرید اقساطی طلا — طرح مفهومی',
      summary: 'ایده‌ی خرید اقساطی طلا با مدل «الان بخر، بعداً بپرداز» را به‌عنوان خدمتی تازه در طلای دیجیتال پیشنهاد کردم.',
    },
    ar: {
      title: 'الشراء الآن والدفع لاحقًا للذهب — مفهوم',
      summary: 'مفهوم «اشترِ الآن وادفع لاحقًا» لشراء الذهب — فكرة خدمة مالية جديدة اقتُرحت داخل الذهب الرقمي.',
    },
    es: {
      title: 'BNPL para oro — concepto',
      summary:
        'Un concepto de compra ahora y pago después para la compra de oro: una nueva idea de servicio financiero propuesta dentro de Digital Gold.',
    },
    de: {
      title: 'BNPL für Gold — Konzept',
      summary:
        'Ein Buy-now-pay-later-Konzept für Goldkäufe – eine neue Finanzdienstleistungsidee, vorgeschlagen innerhalb von Digital Gold.',
    },
    fr: {
      title: 'BNPL pour l’or — concept',
      summary:
        'Un concept de paiement différé pour l’achat d’or — une nouvelle idée de service financier proposée au sein de Digital Gold.',
    },
    ja: {
      title: '金の後払い（BNPL）— コンセプト',
      summary: '金の購入に後払いを導入するコンセプト。Digital Gold内部で提案した新しい金融サービスの構想。',
    },
  },
  'gold-backed-credit-concept': {
    fa: {
      title: 'اعتبار با پشتوانه‌ی طلا — طرح مفهومی',
      summary: 'در کنار ایده‌ی خرید اقساطی، طرح اعتباری با پشتوانه‌ی موجودی طلای کاربر را پیشنهاد کردم.',
    },
    ar: {
      title: 'ائتمان مضمون بالذهب — مفهوم',
      summary: 'ائتمان مضمون برصيد المستخدم من الذهب — مفهوم خدمة مالية ثانٍ اقتُرح إلى جانب الشراء الآن والدفع لاحقًا.',
    },
    es: {
      title: 'Crédito respaldado por oro — concepto',
      summary:
        'Crédito garantizado por las tenencias de oro del usuario: un segundo concepto de servicio financiero propuesto junto al BNPL.',
    },
    de: {
      title: 'Goldgedeckter Kredit — Konzept',
      summary:
        'Kredit, besichert durch die Goldbestände eines Nutzers – ein zweites Finanzdienstleistungskonzept, neben BNPL vorgeschlagen.',
    },
    fr: {
      title: 'Crédit adossé à l’or — concept',
      summary:
        'Un crédit garanti par les avoirs en or de l’utilisateur — un deuxième concept de service financier proposé en parallèle du BNPL.',
    },
    ja: {
      title: '金担保の与信 — コンセプト',
      summary: 'ユーザーの金の保有残高を担保とする与信。BNPLと並んで提案した2つ目の金融サービス構想。',
    },
  },
  'pr-brand-awareness': {
    fa: {
      title: 'برنامه‌ی روابط‌عمومی و آگاهی از برند',
      summary: 'برای افزایش آگاهی از برند طلای دیجیتال، برنامه‌ی روابط‌عمومی را با بازاریابی عملکردی هماهنگ کردم.',
    },
    ar: {
      title: 'برنامج العلاقات العامة والوعي بالعلامة',
      summary: 'نسّقتُ تغطية علاقات عامة استراتيجية مع التسويق الأدائي لتوسيع الوعي بعلامة الذهب الرقمي.',
    },
    es: {
      title: 'Programa de PR y notoriedad de marca',
      summary:
        'Coordiné una cobertura de PR estratégica con marketing de resultados para ampliar la notoriedad de marca de Digital Gold.',
    },
    de: {
      title: 'PR- & Markenbekanntheitsprogramm',
      summary:
        'Strategische PR-Berichterstattung mit Performance-Marketing verzahnt, um die Markenbekanntheit von Digital Gold auszuweiten.',
    },
    fr: {
      title: 'Programme RP et notoriété de marque',
      summary:
        'J’ai coordonné une couverture RP stratégique avec le marketing à la performance pour élargir la notoriété de la marque Digital Gold.',
    },
    ja: {
      title: 'PRとブランド認知プログラム',
      summary: '戦略的なPR露出とパフォーマンスマーケティングを連携させ、Digital Goldのブランド認知を広げた。',
    },
  },
  'mall-traffic-campaigns': {
    fa: {
      title: 'کمپین‌های جذب بازدیدکننده و برنامه‌ی اینفلوئنسری',
      summary:
        'برای افزایش مراجعه به مجتمع هدیش، رویداد، کمپین شبکه‌های اجتماعی و همکاری با اینفلوئنسرها را به کار گرفتم؛ فعالیت آنلاین در خدمت یک مقصد فیزیکی بود.',
    },
    ar: {
      title: 'حملات جذب الزوّار وبرنامج المؤثّرين',
      summary:
        'فعاليات وحملات على وسائل التواصل وشراكات مع مؤثّرين لرفع عدد زوّار هديش مول — وعي عبر الإنترنت وخارجه لمكان مادي.',
    },
    es: {
      title: 'Campañas de afluencia y programa de influencers',
      summary:
        'Eventos, campañas en redes y acuerdos con influencers para elevar la afluencia en Hadish Mall: notoriedad online y offline para un lugar físico.',
    },
    de: {
      title: 'Besucherkampagnen & Influencer-Programm',
      summary:
        'Events, Social-Kampagnen und Influencer-Partnerschaften, um die Besucherzahlen der Hadish Mall zu steigern – Online- und Offline-Bekanntheit für einen physischen Ort.',
    },
    fr: {
      title: 'Campagnes de fréquentation et programme d’influence',
      summary:
        'Événements, campagnes sociales et partenariats d’influence pour augmenter la fréquentation du Hadish Mall — notoriété en ligne et hors ligne pour un lieu physique.',
    },
    ja: {
      title: '集客キャンペーンとインフルエンサープログラム',
      summary:
        'イベント、SNSキャンペーン、インフルエンサー連携でHadish Mallの来場者を増やした。物理的な場所のための、オンラインとオフライン両方の認知づくり。',
    },
  },
  'mall-management-app-concept': {
    fa: {
      title: 'اپ مدیریت مجتمع — طرح مفهومی',
      summary: 'ایده‌ی اپ مدیریت مجتمع را برای بهترشدن ارتباط میان واحدهای تجاری و مشتریان پیشنهاد و طراحی کردم.',
    },
    ar: {
      title: 'تطبيق إدارة المركز التجاري — مفهوم',
      summary: 'اقترحتُ وصمّمتُ مفهومًا لتطبيق إدارة مركز تجاري لتحسين التفاعل بين المستأجرين والعملاء.',
    },
    es: {
      title: 'App de gestión del centro comercial — concepto',
      summary:
        'Propuse y diseñé el concepto de una app de gestión del centro comercial para mejorar la relación entre locales y clientes.',
    },
    de: {
      title: 'Mall-Management-App — Konzept',
      summary:
        'Ein Konzept für eine Mall-Management-App vorgeschlagen und gestaltet, um das Zusammenspiel zwischen Mietern und Kunden zu verbessern.',
    },
    fr: {
      title: 'App de gestion du centre commercial — concept',
      summary:
        'J’ai proposé et conçu le concept d’une application de gestion du centre commercial pour améliorer la relation entre les enseignes et les clients.',
    },
    ja: {
      title: 'モール管理アプリ — コンセプト',
      summary: 'テナントと来場者のやり取りを良くするためのモール管理アプリのコンセプトを提案し、設計した。',
    },
  },
  'fibona-brand-positioning': {
    fa: {
      title: 'جایگاه‌یابی برند و شعار',
      summary:
        'با ذی‌نفعان مصاحبه کردم تا کسب‌وکار را بشناسم؛ سپس جایگاه برند و شعاری متناسب با هویت آن تدوین کردم که تیم بر سرش توافق داشت.',
    },
    ar: {
      title: 'تموضع العلامة والشعار',
      summary:
        'مقابلات مع أصحاب المصلحة لقراءة العمل، ثم تموضع وشعار متوائم مع الهوية يمكن للفريق أن يلتفّ حوله.',
    },
    es: {
      title: 'Posicionamiento de marca y eslogan',
      summary:
        'Entrevistas con las partes interesadas para leer el negocio y, después, un posicionamiento y un eslogan alineados con la identidad en torno a los cuales el equipo pudiera converger.',
    },
    de: {
      title: 'Markenpositionierung & Tagline',
      summary:
        'Stakeholder-Interviews, um das Geschäft zu verstehen, und daraus eine Positionierung und eine identitätskonforme Tagline, auf die sich das Team einigen konnte.',
    },
    fr: {
      title: 'Positionnement de marque et accroche',
      summary:
        'Des entretiens avec les parties prenantes pour lire l’activité, puis un positionnement et une accroche alignés sur l’identité, autour desquels l’équipe pouvait converger.',
    },
    ja: {
      title: 'ブランドポジショニングとタグライン',
      summary:
        'ステークホルダーへのインタビューで事業を読み解き、そこからアイデンティティに沿ったポジショニングとタグラインを定義。チームが合意できる軸をつくった。',
    },
  },
  'fibona-website': {
    fa: {
      title: 'وب‌سایت فیبونا',
      summary: 'وب‌سایت فیبونا را بر پایه‌ی بررسی فرایندهای سنتی کسب‌وکار و در ادامه‌ی کار جایگاه‌یابی برند طراحی کردم.',
    },
    ar: {
      title: 'موقع فيبونا',
      summary: 'موقع بُني انطلاقًا من تحليل عمليات الشركة التقليدية، كجزء من عمل التموضع نفسه.',
    },
    es: {
      title: 'Web de Fibona',
      summary:
        'Una web construida a partir de un análisis de los procesos tradicionales de la empresa, como parte del mismo trabajo de posicionamiento.',
    },
    de: {
      title: 'Fibona-Website',
      summary:
        'Eine Website, gebaut aus einer Analyse der traditionellen Geschäftsprozesse des Unternehmens – Teil derselben Positionierungsarbeit.',
    },
    fr: {
      title: 'Site de Fibona',
      summary:
        'Un site construit à partir d’une analyse des processus métier traditionnels de l’entreprise, dans le cadre du même travail de positionnement.',
    },
    ja: {
      title: 'Fibonaのウェブサイト',
      summary: '同社の従来の業務プロセスの分析から立ち上げたウェブサイト。同じポジショニング作業の一部。',
    },
  },
  'oteacher-matchmaking-redesign': {
    fa: {
      title: 'بازطراحی تطبیق — پژوهش دوطرفه',
      summary:
        'پژوهش با معلمان و دانش‌آموزان نشان داد کیفیت تطبیق مهم‌ترین مسئله است. نتیجه به نقشه‌ی راه محصول راه یافت؛ این کار پژوهش و تعیین مسیر بود، نه بازطراحی منتشرشده.',
    },
    ar: {
      title: 'إعادة تصميم المطابقة — بحث ثنائي الجانب',
      summary:
        'بحث مع المعلّمين والطلاب أظهر جودة المطابقة كأحدّ نقاط الألم، وغذّى بندًا في خارطة الطريق — بحث واتجاه، لا إعادة تصميم مشحونة.',
    },
    es: {
      title: 'Rediseño del emparejamiento — investigación con ambas partes',
      summary:
        'Investigación con profesores y alumnos que señaló la calidad del emparejamiento como el punto de fricción más agudo, y alimentó un elemento de la hoja de ruta: investigación y dirección, no un rediseño lanzado.',
    },
    de: {
      title: 'Matching-Redesign — beidseitige Recherche',
      summary:
        'Recherche mit Lehrenden und Lernenden, die die Match-Qualität als schärfsten Pain Point zeigte und in ein Roadmap-Item einfloss – Recherche und Richtung, kein ausgeliefertes Redesign.',
    },
    fr: {
      title: 'Refonte de l’appariement — recherche des deux côtés',
      summary:
        'Une recherche auprès des enseignants et des élèves qui a fait ressortir la qualité de l’appariement comme le point de friction le plus vif, alimentant un item de la feuille de route — recherche et direction, pas une refonte livrée.',
    },
    ja: {
      title: 'マッチング再設計 — 双方向リサーチ',
      summary:
        '教師と生徒の双方へのリサーチから、マッチングの質が最も鋭い課題だと明らかになり、ロードマップ項目につながった。リリースされた再設計ではなく、リサーチと方向づけ。',
    },
  },
  'oteacher-product-roadmap': {
    fa: {
      title: 'استراتژی محصول و نقشه‌ی راه',
      summary:
        'فرایند چهارهفته‌ای استراتژی: بیست سؤال برای هر یک از هشت واحد، مصاحبه‌های عمیق با اساتید، نُه پرسونا، و جایگاه برند و نقشه‌ی راهی در سه افق که از دل همین‌ها بیرون آمد.',
    },
    ar: {
      title: 'استراتيجية المنتج وخارطة الطريق',
      summary:
        'عملية لوضع الاستراتيجية على مدى أربعة أسابيع: عشرون سؤالًا لكلٍّ من ثمانية أقسام، ومقابلات معمّقة مع المعلّمين، وتسع شخصيات للمستخدمين، ومنها خرجت مكانة العلامة وخارطة طريق على ثلاث مراحل.',
    },
    es: {
      title: 'Estrategia de producto y hoja de ruta',
      summary:
        'Un proceso de estrategia de cuatro semanas: veinte preguntas para cada uno de los ocho departamentos, entrevistas a fondo con el profesorado, nueve personas de usuario, y el posicionamiento de marca y la hoja de ruta en tres horizontes que surgieron de todo ello.',
    },
    de: {
      title: 'Produktstrategie & Roadmap',
      summary:
        'Ein vierwöchiger Strategieprozess: zwanzig Fragen für jede der acht Abteilungen, Tiefeninterviews mit Lehrkräften, neun Personas sowie die Markenpositionierung und die Roadmap in drei Horizonten, die daraus entstanden.',
    },
    fr: {
      title: 'Stratégie produit et feuille de route',
      summary:
        'Un processus stratégique de quatre semaines : vingt questions pour chacun des huit départements, des entretiens approfondis avec le corps enseignant, neuf personas, puis le positionnement de marque et la feuille de route sur trois horizons qui en sont issus.',
    },
    ja: {
      title: 'プロダクト戦略とロードマップ',
      summary:
        '4週間の戦略づくり：8つの部門それぞれへの20の質問、講師へのデプスインタビュー、9人のペルソナ、そしてそこから生まれたブランドのポジションと3つの時期のロードマップ。',
    },
  },
  'oteacher-panel-redesign': {
    fa: {
      title: 'بازطراحی پنل — بسته‌ها، کیف پول، گزارش‌ها، پروفایل، تقویم و پیام‌رسان',
      summary: 'پنل کاربری اوتیچر را در هفت حوزه بازطراحی کردم و بیشتر بخش‌ها را یک بار دیگر بازبینی و اصلاح کردم.',
    },
    ar: {
      title: 'إعادة تصميم اللوحة — الباقات والمحفظة والتقارير والملف والتقويم والمراسلة',
      summary: 'إعادة تصميم لوحة مستخدم أوتيتشر عبر سبعة مجالات، مع جولة تكرار ثانية على معظمها.',
    },
    es: {
      title: 'Rediseño del panel: paquetes, cartera, informes, perfil, calendario y mensajería',
      summary: 'Rediseño del panel de usuario de OTeacher en siete áreas, con una segunda iteración sobre la mayoría.',
    },
    de: {
      title: 'Panel-Redesign — Pakete, Wallet, Berichte, Profil, Kalender & Messenger',
      summary: 'Redesign von OTeachers Nutzerpanel über sieben Bereiche, die meisten davon in einer zweiten Iteration.',
    },
    fr: {
      title: 'Refonte du panneau — offres, portefeuille, rapports, profil, calendrier et messagerie',
      summary: 'Refonte du panneau utilisateur d’OTeacher sur sept zones, avec une seconde itération sur la plupart d’entre elles.',
    },
    ja: {
      title: 'パネル再設計 — プラン、ウォレット、レポート、プロフィール、カレンダー、メッセージ',
      summary: 'OTeacherのユーザーパネルを7領域にわたり再設計。その多くは2回目のイテレーションまで行った。',
    },
  },
  'oteacher-website-redesign': {
    fa: {
      title: 'بازطراحی وب‌سایت',
      summary: '«وب‌سایت جدید» در سند راهبرد اوتیچر آمده است، اما مستند طراحی آن هنوز تأیید نشده است.',
    },
    ar: {
      title: 'إعادة تصميم الموقع',
      summary: 'ورد كمبادرة «موقع جديد» في عرض استراتيجية أوتيتشر؛ مصدر التصميم لم يُؤكَّد بعد.',
    },
    es: {
      title: 'Rediseño de la web',
      summary: 'Aparece como iniciativa de «nueva web» en el dosier de estrategia de OTeacher; la fuente del diseño aún no está confirmada.',
    },
    de: {
      title: 'Website-Redesign',
      summary: 'In OTeachers Strategiedeck als „neue Website“-Initiative benannt; die Designquelle ist noch nicht bestätigt.',
    },
    fr: {
      title: 'Refonte du site',
      summary: 'Mentionné comme initiative « nouveau site » dans le deck stratégique d’OTeacher ; la source du design n’est pas encore confirmée.',
    },
    ja: {
      title: 'ウェブサイト再設計',
      summary: 'OTeacherの戦略資料に「新サイト」施策として記載。デザインの出所は未確認。',
    },
  },
  'oteacher-education-unit-program': {
    fa: {
      title: 'برنامه‌ی واحد آموزش — ارزیابی معلم، استانداردها و ارتقای مهارت',
      summary:
        'واحد آموزش اوتیچر را راه‌اندازی کردم: تیم نظارت بر معلمان، فرایند مصاحبه و ارزیابی هر معلم و کلاس‌های تخصصی ارتقای مهارت.',
    },
    ar: {
      title: 'برنامج وحدة التعليم — تقييم المعلّمين والمعايير ورفع المهارات',
      summary:
        'أسّستُ وحدة تعليم رسمية في أوتيتشر: فريق إشراف على المعلّمين، وعملية مقابلات ومعايير لكل معلّم، وصفوفًا متخصّصة لرفع المهارات.',
    },
    es: {
      title: 'Programa de unidad educativa: selección de profesores, estándares y formación',
      summary:
        'Puse en marcha una unidad educativa formal en OTeacher: un equipo de supervisión docente, un proceso de entrevistas y estándares para cada profesor, y clases especializadas de mejora de competencias.',
    },
    de: {
      title: 'Bildungseinheit — Lehrerprüfung, Standards & Weiterbildung',
      summary:
        'Bei OTeacher eine formale Bildungseinheit aufgebaut: ein Aufsichtsteam für Lehrende, ein Interview- und Standardprozess für jede Lehrkraft und spezialisierte Weiterbildungskurse.',
    },
    fr: {
      title: 'Programme d’unité pédagogique — sélection des enseignants, standards et montée en compétences',
      summary:
        'J’ai mis en place une unité pédagogique formelle chez OTeacher : une équipe de supervision des enseignants, un processus d’entretien et de standards pour chacun, et des cours spécialisés de montée en compétences.',
    },
    ja: {
      title: '教育ユニットの立ち上げ — 講師審査、基準、スキル向上',
      summary:
        'OTeacherに正式な教育ユニットを立ち上げた。講師を監督するチーム、全講師に対する面接と基準のプロセス、そして専門的なスキル向上講座。',
    },
  },
  'arvan-server-metrics-research': {
    fa: {
      title: 'پژوهش داشبورد شاخص‌های سرور',
      summary:
        'با بررسی داده‌های رفتاری، مشخص کردم کاربران سرویس ابری به کدام شاخص‌های سرور نیاز دارند. یافته‌ها مبنای بازطراحی داشبورد پلتفرم شد.',
    },
    ar: {
      title: 'بحث لوحة مؤشّرات الخوادم',
      summary:
        'بحث قائم على بيانات السلوك في مؤشّرات الخوادم التي يحتاجها مستخدمو السحابة فعلًا — الدليل وراء إعادة تصميم لوحة المنصّة.',
    },
    es: {
      title: 'Investigación del panel de métricas de servidor',
      summary:
        'Investigación con datos de comportamiento sobre qué métricas de servidor necesitan realmente los usuarios cloud: la evidencia detrás del rediseño del panel de la plataforma.',
    },
    de: {
      title: 'Research zum Servermetriken-Dashboard',
      summary:
        'Verhaltensdaten-Research dazu, welche Servermetriken Cloud-Nutzer tatsächlich brauchen – die Evidenz hinter dem Dashboard-Redesign der Plattform.',
    },
    fr: {
      title: 'Recherche sur le tableau de bord des métriques serveur',
      summary:
        'Une recherche fondée sur les données de comportement portant sur les métriques serveur dont les utilisateurs cloud ont réellement besoin — la preuve derrière la refonte du tableau de bord de la plateforme.',
    },
    ja: {
      title: 'サーバー指標ダッシュボードのリサーチ',
      summary:
        'クラウド利用者が実際に必要とするサーバー指標は何かを、行動データから調べたリサーチ。プラットフォームのダッシュボード再設計の根拠になった。',
    },
  },
  'biomaze-website-education-panel': {
    fa: {
      title: 'وب‌سایت و پنل آموزش',
      summary:
        'وب‌سایت عمومی ماز و پنل یادگیری راست‌به‌چپ — کلاس‌ها، آزمون‌ها، کلاس زنده، کیف پول و فروش بسته — در یک فایل ۳۲صفحه‌ای Figma همراه با سیستم طراحی موازی.',
    },
    ar: {
      title: 'الموقع ولوحة التعليم',
      summary:
        'موقع ماز العام ولوحة التعلّم من اليمين لليسار — صفوف وامتحانات وبث مباشر ومحفظة وتجارة الحزم — عبر ملف Figma من 32 صفحة مع نظام تصميم موازٍ.',
    },
    es: {
      title: 'Web y panel de formación',
      summary:
        'El sitio público de Maz y su panel RTL: clases, exámenes, clase en vivo, monedero y comercio de paquetes — en un archivo Figma de 32 páginas con el design system en paralelo.',
    },
    de: {
      title: 'Website & Schulungspanel',
      summary:
        'Maz’ öffentliche Website und RTL-Lernpanel — Kurse, Prüfungen, Live-Klasse, Wallet und Paketkauf — in einer 32-Seiten-Figma-Datei mit parallel gebautem Design-System.',
    },
    fr: {
      title: 'Site et panneau de formation',
      summary:
        'Le site public de Maz et son panneau RTL : cours, examens, classe en direct, portefeuille et vente de forfaits — dans un fichier Figma de 32 pages, design system en parallèle.',
    },
    ja: {
      title: 'ウェブサイトと教育パネル',
      summary:
        'Mazの公開サイトとRTL学習パネル。授業・試験・ライブ授業・ウォレット・パッケージ販売を、32ページのFigmaファイルでデザインシステムと並行して設計した。',
    },
  },
  'biomaze-design-system': {
    fa: {
      title: 'سیستم طراحی',
      summary:
        'بردهای رنگ، تایپ، دکمه، فرم و کروم در فایل BioMaze Design — کیت مشترکی که کنار وب‌سایت و پنل آموزش ساخته شد تا تیم فنی سریع‌تر منتشر کند.',
    },
    ar: {
      title: 'نظام التصميم',
      summary:
        'لوحات اللون والنوع والأزرار والنماذج والإطار في ملف BioMaze Design — العدّة المشتركة بُنيت إلى جانب الموقع ولوحة التعليم ليُشحن المطوّرون أسرع.',
    },
    es: {
      title: 'Sistema de diseño',
      summary:
        'Tableros de color, tipografía, botones, formularios y chrome en el archivo BioMaze Design — el kit compartido construido junto a la web y el panel para que los desarrolladores lanzaran más rápido.',
    },
    de: {
      title: 'Design-System',
      summary:
        'Farb-, Typo-, Button-, Formular- und Chrome-Boards in der BioMaze-Design-Datei — das gemeinsame Kit, parallel zu Website und Panel gebaut, damit Entwickler schneller ausliefern konnten.',
    },
    fr: {
      title: 'Design system',
      summary:
        'Planches couleur, type, boutons, formulaires et chrome dans le fichier BioMaze Design — le kit partagé bâti avec le site et le panneau pour que les développeurs livrent plus vite.',
    },
    ja: {
      title: 'デザインシステム',
      summary:
        'BioMaze Designファイル内のカラー・タイプ・ボタン・フォーム・クロムボード。ウェブサイトと教育パネルと並行して作った共有キットで、開発の出荷を速くした。',
    },
  },
  'didestan-video-platform': {
    fa: {
      title: 'پلتفرم ویدئو',
      summary: 'برای پلتفرم ویدئویی داده‌محور، پژوهش را با رویکرد Lean UX پیش بردم و نمونه‌های تعاملی با جزئیات متوسط بر پایه‌ی Google Material ساختم.',
    },
    ar: {
      title: 'منصّة فيديو',
      summary: 'منصّة فيديو قائمة على البيانات: نماذج أوّلية متوسّطة الدقة على Google Material، وبحث أُجري وفق Lean UX.',
    },
    es: {
      title: 'Plataforma de vídeo',
      summary: 'Una plataforma de vídeo basada en datos: prototipos de fidelidad media sobre Google Material e investigación ejecutada con Lean UX.',
    },
    de: {
      title: 'Videoplattform',
      summary: 'Eine datengetriebene Videoplattform: Mid-Fidelity-Prototypen auf Google Material, Research nach Lean UX.',
    },
    fr: {
      title: 'Plateforme vidéo',
      summary: 'Une plateforme vidéo pilotée par les données : prototypes de fidélité moyenne sur Google Material, recherche menée en Lean UX.',
    },
    ja: {
      title: '動画プラットフォーム',
      summary: 'データドリブンな動画プラットフォーム。Google Material上のミドルフィデリティ・プロトタイプと、Lean UXで進めたリサーチ。',
    },
  },
  'a1paradise-call-apps': {
    fa: {
      title: 'اپ تماس دسکتاپ و اپ B2C وای‌فون',
      summary: 'طراحی اولیه‌ی تجربه و رابط کاربری یک اپ تماس دسکتاپ و WiFon، اپ تماس برای کاربران عادی.',
    },
    ar: {
      title: 'تطبيق اتصال لسطح المكتب وتطبيق WiFon للمستهلك',
      summary: 'تطبيق اتصال لسطح المكتب وتطبيق WiFon للمستهلك — أعمال واجهات وتجربة مبكّرة.',
    },
    es: {
      title: 'App de llamadas de escritorio y app B2C WiFon',
      summary: 'Una app de llamadas de escritorio y WiFon, una app de llamadas de consumo: trabajo temprano de UI/UX.',
    },
    de: {
      title: 'Desktop-Calling-App & WiFon-B2C-App',
      summary: 'Eine Desktop-Calling-App und WiFon, eine Consumer-Calling-App – frühe UI/UX-Arbeit.',
    },
    fr: {
      title: 'App d’appels desktop et app B2C WiFon',
      summary: 'Une application d’appels desktop et WiFon, une application d’appels grand public — travaux UI/UX des débuts.',
    },
    ja: {
      title: 'デスクトップ通話アプリとWiFon（B2C）',
      summary: 'デスクトップ向け通話アプリと、一般消費者向け通話アプリWiFon。初期のUI/UXの仕事。',
    },
  },
  'arash-rezvani': {
    fa: {
      title: 'آرش رضوانی — برند شخصی و وبلاگ',
      summary:
        'برای یک نویسنده، مدرس و عکاس، سایت و وبلاگی دوزبانه با زبان پیش‌فرض فارسی ساختم؛ همراه با راهنمای طراحی مکتوب، سیستم رزرو با تقویم شمسی و زیرساختی که در ایران میزبانی می‌شود.',
    },
    ar: {
      title: 'آرش رضواني — علامة شخصية ومدوّنة',
      summary:
        'موقع ومدوّنة ثنائيا اللغة بالفارسية افتراضيًا لكاتب ومعلّم ومصوّر — لغة تصميم مكتوبة، ونظام حجز بالتقويم الشمسي، وحزمة تقنية داخل إيران بالكامل.',
    },
    es: {
      title: 'Arash Rezvani — marca personal y blog',
      summary:
        'Un sitio y blog bilingüe con persa por defecto para un escritor, profesor y fotógrafo: un lenguaje de diseño documentado, un sistema de reservas con calendario persa y un stack íntegramente alojado en Irán.',
    },
    de: {
      title: 'Arash Rezvani — Personal Brand & Blog',
      summary:
        'Eine zweisprachige Website und ein Blog mit Persisch als Standard für einen Autor, Lehrer und Fotografen – eine schriftlich festgehaltene Designsprache, ein Schamsi-Buchungssystem und ein Stack vollständig innerhalb des Iran.',
    },
    fr: {
      title: 'Arash Rezvani — marque personnelle et blog',
      summary:
        'Un site et un blog bilingues, persan par défaut, pour un écrivain, enseignant et photographe — un langage de design écrit, un système de réservation en calendrier persan, et une stack entièrement hébergée en Iran.',
    },
    ja: {
      title: 'Arash Rezvani — パーソナルブランドとブログ',
      summary:
        '作家・講師・写真家のための、ペルシャ語を既定とするバイリンガルのサイトとブログ。文書化されたデザイン言語、シャムシー暦の予約システム、そしてすべてイラン国内で完結するスタック。',
    },
  },
  marqevon: {
    fa: {
      title: 'مارکوون — سایت شرکتی برای یک تاجر فیزیکی نفت',
      summary:
        'سایتی شرکتی به هفت زبان برای فعال تجارت فیزیکی فرآورده‌های نفتی طراحی کردم. ساختار آن به پرسش اصلی طرف معامله پاسخ می‌دهد: آیا این شرکت واقعی است و می‌شود اعتبارش را بررسی کرد؟',
    },
    ar: {
      title: 'مارقفون — موقع مؤسسي لأصيل تجارة نفطية فعلية',
      summary:
        'موقع مؤسسي بسبع لغات لأصيل في تجارة المشتقات النفطية الفعلية، مصمَّم حول السؤال الذي يطرحه الطرف المقابل بصمت: هل هذا الكيان حقيقي وقابل للتحقّق؟',
    },
    es: {
      title: 'Marqevon — web corporativa para un operador físico de petróleo',
      summary:
        'Una web corporativa en siete idiomas para un principal del comercio físico de petróleo, diseñada en torno a la pregunta que una contraparte se hace en silencio: ¿esta entidad es real y verificable?',
    },
    de: {
      title: 'Marqevon — Unternehmensseite für einen physischen Ölhändler',
      summary:
        'Eine Unternehmensseite in sieben Sprachen für einen Principal im physischen Ölhandel, gebaut um die Frage, die eine Gegenpartei stillschweigend stellt: Ist diese Firma echt und überprüfbar?',
    },
    fr: {
      title: 'Marqevon — site corporate pour un négociant pétrolier physique',
      summary:
        'Un site corporate en sept langues pour un principal du négoce pétrolier physique, conçu autour de la question qu’une contrepartie se pose en silence : cette entité est-elle réelle et vérifiable ?',
    },
    ja: {
      title: 'Marqevon — 現物石油トレーダーのコーポレートサイト',
      summary:
        '現物の石油取引を行うプリンシパルのための7言語コーポレートサイト。取引相手が口に出さずに抱く問い——この会社は実在し、検証できるのか——を軸に設計した。',
    },
  },
  cproperty: {
    fa: {
      title: 'CProperty — خانه‌های پیش‌فروش ونکوور بزرگ، قابل مقایسه با هم',
      summary:
        'مارکت‌پلیسی برای خریداران آپارتمان و تاون‌هاوس پیش‌فروش در لوئر مین‌لند ونکوور: ۷۶ صفحه‌ی واکنش‌گرا که جدول پیش‌پرداخت، هزینه‌ی واگذاری قرارداد و هزینه‌های هر واحد را کنار هم می‌گذارند. این طراحی جایگزین نسخه‌ی قبلی‌ای است که داده را به مشاوران املاک می‌فروخت.',
    },
    ar: {
      title: 'CProperty — مقارنة واضحة لمساكن البيع على المخطط في فانكوفر الكبرى',
      summary:
        'سوق إلكترونية تخدم المشترين، لشقق ومنازل متلاصقة تُباع على المخطط في منطقة لوار ماينلاند حول فانكوفر: 76 شاشة متجاوبة تضع جدول الدفعة المقدّمة ورسوم التنازل عن العقد وتكاليف كل وحدة جنبًا إلى جنب، وتحلّ محل نسخة سابقة كانت تبيع البيانات للوسطاء العقاريين.',
    },
    es: {
      title: 'CProperty — vivienda en preventa en Metro Vancouver, ahora comparable',
      summary:
        'Un marketplace para compradores de apartamentos y casas adosadas en preventa en el Lower Mainland de Vancouver: 76 pantallas responsive que ponen lado a lado el calendario del depósito, las tarifas de cesión y los costes unidad por unidad, y que sustituyen a una versión anterior que vendía datos a agentes inmobiliarios.',
    },
    de: {
      title: 'CProperty — Presale-Wohnungen in Metro Vancouver, vergleichbar gemacht',
      summary:
        'Ein Marktplatz für Käufer von Presale-Eigentumswohnungen und -Townhouses im Lower Mainland rund um Vancouver: 76 responsive Screens, die Anzahlungsplan, Abtretungsgebühren und Kosten Einheit für Einheit nebeneinanderstellen und eine frühere Version ablösen, die Daten an Makler verkaufte.',
    },
    fr: {
      title: 'CProperty — les logements sur plan de Metro Vancouver, rendus comparables',
      summary:
        'Une marketplace pour les acheteurs d’appartements et de maisons de ville vendus sur plan dans le Lower Mainland, autour de Vancouver : 76 écrans responsive qui mettent côte à côte l’échéancier du dépôt, les frais de cession et les coûts logement par logement, en remplacement d’une version précédente qui vendait des données aux agents immobiliers.',
    },
    ja: {
      title: 'CProperty — メトロバンクーバーのプレセール住宅を、比べられるものに',
      summary:
        'バンクーバー周辺のローワーメインランドで、プレセール（竣工前販売）のコンドミニアムやタウンハウスを探す買い手のためのマーケットプレイス。デポジット（手付金）のスケジュール、契約譲渡手数料、住戸ごとの費用を並べて示す76のレスポンシブ画面が、不動産エージェントにデータを販売していた以前のバージョンに取って代わった。',
    },
  },
  'merikh-baft': {
    fa: {
      title: 'مریخ بافت — ردیابی هر طاقه پارچه از انبار تا مشتری',
      summary:
        'برند، وب‌سایت، پنل مدیریت و اپ وظایف پنج‌نقشی برای یک کارخانه‌ی پارچه‌ی اسپیسر در ایران: ۱۲۸ صفحه که در آن هر طاقه برچسب QR می‌گیرد و در هر تحویل، از رنگرزی تا راننده و مشتری، بررسی می‌شود.',
    },
    ar: {
      title: 'مريخ بافت — تتبّع كل لفّة قماش من المستودع إلى العميل',
      summary:
        'هوية بصرية وموقع ولوحة إدارة وتطبيق مهام بخمسة أدوار لمصنع إيراني لأقمشة السبيسر: 128 شاشة تحصل فيها كل لفّة على ملصق QR وتُفحص عند كل تسليم، من المصبغة إلى السائق إلى العميل.',
    },
    es: {
      title: 'Merikh Baft — cada rollo de tela seguido del almacén al cliente',
      summary:
        'Marca, web, back office y una app de tareas con cinco roles para una fábrica iraní de tejido spacer: 128 pantallas en las que cada rollo lleva una etiqueta QR y se verifica en cada entrega, de la tintorería al conductor y al cliente.',
    },
    de: {
      title: 'Merikh Baft — jede Stoffrolle vom Lager bis zum Kunden verfolgt',
      summary:
        'Marke, Website, Backoffice und eine Aufgaben-App mit fünf Rollen für eine iranische Abstandsgewirke-Fabrik: 128 Screens, in denen jede Rolle ein QR-Etikett bekommt und bei jeder Übergabe geprüft wird – von der Färberei über den Fahrer bis zum Kunden.',
    },
    fr: {
      title: 'Merikh Baft — suivre chaque rouleau de tissu, de l’entrepôt au client',
      summary:
        'Marque, site, back-office et une app de tâches à cinq rôles pour une usine iranienne de tissu 3D spacer : 128 écrans où chaque rouleau reçoit une étiquette QR et est vérifié à chaque passage de main, de la teinturerie au chauffeur puis au client.',
    },
    ja: {
      title: 'メリフ・バフト — 生地ロールを倉庫から顧客まで追跡する',
      summary:
        'イランのスペーサーファブリック工場のためのブランド、ウェブサイト、バックオフィス、5つの役割を持つタスクアプリ。128の画面で、すべてのロールにQRラベルを付け、染色工場からドライバー、顧客へと渡るたびに照合する。',
    },
  },
  faymen: {
    fa: {
      title: 'فیمن — فروشگاه فارسی پوشاک مردانه',
      summary:
        'فروشگاه آنلاین پوشاک مردانه که از ابتدا تا انتها طراحی و ساخته شد: فروشگاه، صفحه‌ی محصول، پرداخت با درگاه‌های ایرانی، حساب مشتری و پنل مدیریت، روی زیرساختی داخل کشور.',
    },
    ar: {
      title: 'فيمن — متجر ملابس رجالية فارسي من اليمين إلى اليسار',
      summary:
        'متجر ملابس رجالية فارسي حيّ، صُمِّم وبُني من البداية إلى النهاية: المتجر وصفحات المنتجات والدفع عبر البوابات الإيرانية وحساب العميل ولوحة الإدارة، على بنية تحتية داخل البلاد.',
    },
    es: {
      title: 'Fayman — tienda de moda masculina en persa RTL',
      summary:
        'Una tienda de moda masculina en persa, en producción, diseñada y construida de principio a fin: tienda, fichas de producto, pago con pasarelas iraníes, cuenta de cliente y panel de administración, sobre una infraestructura alojada en el país.',
    },
    de: {
      title: 'Fayman — persischer RTL-Herrenmode-Shop',
      summary:
        'Ein produktiver persischer Herrenmode-Shop, von Anfang bis Ende gestaltet und gebaut: Shop, Produktseiten, Checkout mit iranischen Zahlungsanbietern, Kundenkonto und Admin, auf einer Infrastruktur im Land.',
    },
    fr: {
      title: 'Fayman — boutique de mode masculine en persan RTL',
      summary:
        'Une boutique de mode masculine en persan, en production, conçue et construite de bout en bout : boutique, fiches produit, paiement par passerelles iraniennes, compte client et administration, sur une infrastructure hébergée dans le pays.',
    },
    ja: {
      title: 'Fayman — ペルシャ語RTLのメンズウェア店舗',
      summary:
        '稼働中のペルシャ語メンズウェアEC。ショップ、商品ページ、イランの決済ゲートウェイによるチェックアウト、顧客アカウント、管理画面までを一貫して設計・構築し、国内完結のインフラで運用する。',
    },
  },
  'renova-plus': {
    fa: {
      title: 'رنووا+ — پلتفرم بازسازی و مدیریت پرتفوی',
      summary:
        'برای محصولی در دبی، پلتفرم بازسازی مدیریت‌شده را طراحی کردم و نمونه‌ی تعاملیِ بخش مدیریت پرتفوی نهادی آن را ساختم.',
    },
    ar: {
      title: 'رينوفا+ — منصّة تجديد مُدارة ونظام محفظة',
      summary:
        'سطحان لمنتج واحد في دبي: مرحلة تصميم كاملة لمنصّة تجديد مُدارة، ونموذج أوّلي عامل لطبقة المحفظة المؤسسية التي تبيعها.',
    },
    es: {
      title: 'Renova+ — plataforma de reformas gestionadas y OS de cartera',
      summary:
        'Dos superficies para un mismo producto en Dubái: una fase de diseño completa para una plataforma de reformas gestionadas y un prototipo funcional de la capa institucional de cartera que la vende.',
    },
    de: {
      title: 'Renova+ — Plattform für betreute Renovierungen & Portfolio-OS',
      summary:
        'Zwei Oberflächen für ein Produkt in Dubai: eine vollständige Designphase für eine Plattform für betreute Renovierungen und ein funktionierender Prototyp der institutionellen Portfolio-Ebene, die sie verkauft.',
    },
    fr: {
      title: 'Renova+ — plateforme de rénovation gérée et OS de portefeuille',
      summary:
        'Deux surfaces pour un même produit à Dubaï : une phase de design complète pour une plateforme de rénovation gérée, et un prototype fonctionnel de la couche institutionnelle de portefeuille qui la vend.',
    },
    ja: {
      title: 'Renova+ — 管理型リノベーション基盤とポートフォリオOS',
      summary:
        'ドバイのひとつのプロダクトに対する2つの面。管理型リノベーション基盤の設計フェーズ一式と、それを販売する機関向けポートフォリオ層の動作プロトタイプ。',
    },
  },
  'vin-app': {
    fa: {
      title: 'وین — شبکه‌سازی ارتباط‌محور برای دبی',
      summary:
        'برای جامعه‌ی حرفه‌ای دبی، اپ شبکه‌سازی مبتنی بر روابط طراحی کردم؛ با سند محصول، فهرست ۵۷ مسئله و تعریف شاخص‌هایشان، معماری برند و مدل درآمد B2B. تصمیم‌ها را با وعده‌ی محصول به کاربران سنجیدم.',
    },
    ar: {
      title: 'وين — شبكة تواصل تضع الارتباط أولًا في دبي',
      summary:
        'تطبيق شبكة تواصل يضع الارتباط أولًا لمجتمع دبي المهني — موجز منتج، وفهرس 57 مشكلة بقاموس مؤشّرات خاص به، وهندسة علامة، وطبقة إيراد B2B، مُدقَّقة في ضوء ما يعد به المنتج مستخدميه.',
    },
    es: {
      title: 'VIN — networking centrado en la conexión para Dubái',
      summary:
        'Una app de networking centrada en la conexión para la comunidad profesional de Dubái: un brief de producto, un inventario de 57 problemas con su propio diccionario de KPI, una arquitectura de marca y una capa de ingresos B2B, auditados frente a las promesas que el producto hace a sus usuarios.',
    },
    de: {
      title: 'VIN — Connection-first-Networking für Dubai',
      summary:
        'Eine Connection-first-Networking-App für Dubais Berufscommunity – ein Produkt-Brief, ein Inventar aus 57 Problemen mit eigenem KPI-Wörterbuch, eine Markenarchitektur und eine B2B-Umsatzebene, geprüft an den Versprechen, die das Produkt seinen Nutzern macht.',
    },
    fr: {
      title: 'VIN — networking centré sur la connexion pour Dubaï',
      summary:
        'Une app de networking centrée sur la connexion pour la communauté professionnelle de Dubaï — un brief produit, un inventaire de 57 problèmes avec son propre dictionnaire de KPI, une architecture de marque et une couche de revenus B2B, auditée face aux promesses que le produit fait à ses utilisateurs.',
    },
    ja: {
      title: 'VIN — ドバイ向けコネクション起点のネットワーキング',
      summary:
        'ドバイのプロフェッショナル向け、つながりを起点としたネットワーキングアプリ。プロダクトブリーフ、独自のKPI辞書を備えた57件の課題インベントリ、ブランドアーキテクチャ、B2Bの収益レイヤーを、プロダクト自身がユーザーに約束した内容に照らして監査した。',
    },
  },
  razhmana: {
    fa: {
      title: 'راژمانا — ممیزی فرایند مارکت‌پلیس حمل بار',
      summary:
        'فایل طراحی بازارگاه حمل بار را ممیزی کردم و بر اساس آن معماری ۴۲ فرایند و معیار آمادگی برای آغاز اجرا را تدوین کردم.',
    },
    ar: {
      title: 'راژمانا — تدقيق عمليات لسوق شحن',
      summary:
        'تدقيق جنائي لملف تصميم سوق شحن إيراني، تحوّل إلى معمارية من 42 عملية وبوّابة جاهزية للمدخلات.',
    },
    es: {
      title: 'Razhmana — auditoría de procesos de un marketplace de transporte',
      summary:
        'Una auditoría forense del archivo de diseño de un marketplace iraní de transporte de mercancías, convertida en una arquitectura de 42 procesos y una puerta de comprobación de entradas.',
    },
    de: {
      title: 'Razhmana — Prozessaudit eines Frachtmarktplatzes',
      summary:
        'Ein forensisches Audit der Designdatei eines iranischen Frachtmarktplatzes, überführt in eine Architektur aus 42 Prozessen und ein Input-Readiness-Gate.',
    },
    fr: {
      title: 'Razhmana — audit des processus d’une marketplace de fret',
      summary:
        'Un audit forensique du fichier de design d’une marketplace iranienne de fret, transformé en une architecture de 42 processus et un point de contrôle de complétude des entrées.',
    },
    ja: {
      title: 'Razhmana — 貨物マーケットプレイスのプロセス監査',
      summary:
        'イランの貨物マーケットプレイスのデザインファイルを精査し、42のプロセスからなるアーキテクチャと、入力の準備状況を判定するゲートに落とし込んだ。',
    },
  },
  greenrest: {
    fa: {
      title: 'گرین‌رست — بررسی تجربه‌ی کاربری فروشگاه آنلاین',
      summary:
        'تجربه‌ی کاربری فروشگاه آنلاین تشک را به دو زبان و با معیارهای امتیازدهی بررسی کردم. نتیجه، نقشه‌ی راه اولویت‌بندی‌شده‌ی بازطراحی و مجموعه‌ابزاری قابل استفاده‌ی دوباره برای تحلیل فروشگاه‌ها بود.',
    },
    ar: {
      title: 'غرين‌رست — تدقيق تجربة مستخدم لمتجر إلكتروني',
      summary:
        'تدقيق تجربة مستخدم مُقيَّم وثنائي اللغة لمتجر مراتب إيراني حيّ، مع خارطة طريق لإعادة تصميم مرتّبة بالأولوية مبنية على عدّة تحليل تجارة إلكترونية قابلة لإعادة الاستخدام.',
    },
    es: {
      title: 'GreenRest — auditoría UX de comercio electrónico',
      summary:
        'Una auditoría UX puntuada y bilingüe de una tienda iraní de colchones en producción, con una hoja de ruta de rediseño priorizada construida sobre un kit reutilizable de análisis de comercio electrónico.',
    },
    de: {
      title: 'GreenRest — E-Commerce-UX-Audit',
      summary:
        'Ein bewertetes, zweisprachiges UX-Audit eines produktiven iranischen Matratzen-Shops, mit einer priorisierten Redesign-Roadmap auf Basis eines wiederverwendbaren E-Commerce-Analysebaukastens.',
    },
    fr: {
      title: 'GreenRest — audit UX e-commerce',
      summary:
        'Un audit UX noté et bilingue d’une boutique de matelas iranienne en production, assorti d’une feuille de route de refonte priorisée, bâtie sur une boîte à outils d’analyse e-commerce réutilisable.',
    },
    ja: {
      title: 'GreenRest — ECのUX監査',
      summary:
        '稼働中のイランのマットレス店舗に対する、スコア付きのバイリンガルUX監査。再利用可能なEC分析ツールキットに基づく、優先度付きのリデザイン・ロードマップを添えて。',
    },
  },
  'narian-summer-passport': {
    fa: {
      title: 'پاسپورت تابستانی ناریان — کمپین خرده‌فروشی',
      summary:
        'برای کمپین تابستانی ناریان، هر فروشگاه را مانند یک فرودگاه و هر خرید را مانند یک بلیت تصور کردم. مدل سطح‌بندی خرید، مجموعه‌ی نُه مهر و متن‌های دوزبانه برای افزایش ارزش سبد بدون تخفیف طراحی شد. کمپین اجرا نشد.',
    },
    ar: {
      title: 'جواز صيف ناريان — حملة تجزئة',
      summary:
        'حملة صيفية للتجزئة حوّلت كل متجر إلى مطار وكل عملية شراء إلى تذكرة — اقتصاد الدرجات، ومجموعة من تسعة أختام، وكنون تحريري ثنائي اللغة، لرفع قيمة السلة دون أي خصم. لم تُطلَق قط.',
    },
    es: {
      title: 'Narian Summer Passport — campaña de retail',
      summary:
        'Una campaña de verano que convirtió cada tienda en un aeropuerto y cada compra en un billete: economía de clases, una colección de nueve sellos y un canon de copy bilingüe, para subir el ticket medio sin descuentos. Nunca se lanzó.',
    },
    de: {
      title: 'Narian Summer Passport — Retail-Kampagne',
      summary:
        'Eine Sommerkampagne, die jeden Store zum Flughafen und jeden Kauf zum Ticket machte – Klassen-Ökonomie, eine Sammlung aus neun Stempeln und ein verbindlicher zweisprachiger Copy-Kanon, um den Warenkorb ganz ohne Rabatte zu steigern. Nie gelauncht.',
    },
    fr: {
      title: 'Narian Summer Passport — campagne retail',
      summary:
        'Une campagne d’été qui transformait chaque boutique en aéroport et chaque achat en billet — économie des classes, une collection de neuf tampons et un canon éditorial bilingue, pour augmenter le panier sans la moindre remise. Jamais lancée.',
    },
    ja: {
      title: 'ナリアン サマーパスポート — 小売キャンペーン',
      summary:
        'すべての店舗を空港に、すべての購入をチケットに変えた夏の小売キャンペーン。搭乗クラスの経済設計、9種のスタンプ収集、統制された二言語コピー規範で、値引きなしに客単価を伸ばす設計。実施には至らず。',
    },
  },
}
