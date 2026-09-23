import type { Locale } from '@/utilities/locale'

/**
 * The `projects` archive in every locale but English.
 *
 * This is what makes `/xx/work` a real page: the archive query runs with `fallbackLocale: false`
 * and `overrideAccess: false`, so before this existed the archive listed 28 projects in English,
 * 2 in Persian and **0** in Spanish, French and Japanese.
 *
 * Split three ways on purpose. `company` and `role` repeat across the 35 rows — ten distinct
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
    'Carsparency & Khodro45': 'کارسپرنسی و خودرو۴۵',
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
    'Carsparency & Khodro45': 'كارسبارنسي وخودرو45',
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
    'Carsparency & Khodro45': 'Carsparency y Khodro45',
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
    'Carsparency & Khodro45': 'Carsparency & Khodro45',
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
    'Carsparency & Khodro45': 'Carsparency et Khodro45',
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
    'Carsparency & Khodro45': 'Carsparency・Khodro45',
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
    'Designer, Marketer, BI developer': 'طراح، بازاریاب، توسعه‌دهندهٔ BI',
    'Product designer & strategist': 'طراح محصول و استراتژیست',
    'Product designer': 'طراح محصول',
    Marketer: 'بازاریاب',
    'Product manager': 'مدیر محصول',
    'Product manager & designer': 'مدیر محصول و طراح',
    'UI/UX designer': 'طراح UI/UX',
    'Product designer & developer': 'طراح و توسعه‌دهندهٔ محصول',
    'Design researcher & process architect': 'پژوهشگر طراحی و معمار فرایند',
    'UX researcher': 'پژوهشگر تجربهٔ کاربری',
    'Product designer, PM & builder': 'طراح محصول، مدیر محصول و سازنده',
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
    'Campaign strategist & marketer': 'キャンペーンストラテジスト / マーケター',
  },
}

export const projectTextCopy: Record<string, Record<ProjectLocale, ProjectText>> = {
  // ── Carsparency & Khodro45 (six projects, from the 2026-09-22 Figma scan) ────────────────
  'khodro45-dealer-app': {
    fa: {
      title: 'اپلیکیشن نمایشگاه‌داران خودرو۴۵ — بازار مزایدهٔ زمان‌دار برای دلالان خودرو',
      summary:
        'سمت B2B بازار خودرو۴۵: ۲۴۱ صفحه در سه حالت بازار موازی، سامانهٔ پیشنهاد قیمت مبتنی بر قیمت منصفانه، خط لولهٔ تسویهٔ شش‌مرحله‌ای، دو نسل درآمدزایی از نمایشگاه‌داران، و یک پروتوتایپ ۲۸ فریمی برای آزمودن ماشین حالت معامله.',
    },
    ar: {
      title: 'تطبيق تجّار خودرو45 — سوق مزادات موقوتة لتجّار السيارات في إيران',
      summary:
        'الجانب B2B من سوق خودرو45: ‏241 شاشة عبر ثلاثة أنماط سوق متوازية، ونظام مزايدة يرتكز على السعر العادل، وخط تسوية من ست خطوات، وجيلان من نماذج تحقيق الدخل من التجّار، ونموذج تفاعلي من 28 إطارًا لاختبار آلة حالات الصفقة.',
    },
    es: {
      title: 'App de concesionarios Khodro45 — un mercado de subastas con temporizador',
      summary:
        'El lado B2B del marketplace iraní Khodro45: 241 pantallas con tres modos de mercado en paralelo, un sistema de pujas guiado por precio justo, una liquidación con depósito en seis pasos, dos generaciones de monetización de concesionarios y un prototipo de 28 marcos para probar la máquina de estados de la transacción.',
    },
    de: {
      title: 'Khodro45 Händler-App — ein Auktionsmarkt auf Zeit für iranische Autohändler',
      summary:
        'Die B2B-Seite des iranischen Marktplatzes Khodro45: 241 Screens über drei parallele Marktmodi, ein am Fair Price ausgerichtetes Bietsystem, eine sechsstufige Treuhand-Abwicklung, zwei Generationen Händler-Monetarisierung und ein 28-Frame-Prototyp, um die Zustandsmaschine der Transaktion zu testen.',
    },
    fr: {
      title: 'Application concessionnaires Khodro45 — un marché aux enchères minuté',
      summary:
        'Le versant B2B de la place de marché iranienne Khodro45 : 241 écrans sur trois modes de marché parallèles, un système d’enchères guidé par un prix juste, un règlement sous séquestre en six étapes, deux générations de monétisation des concessionnaires et un prototype de 28 frames pour éprouver la machine à états de la transaction.',
    },
    ja: {
      title: 'Khodro45 ディーラーアプリ — イラン自動車ディーラー向けの時限オークション市場',
      summary:
        'イランのマーケットプレイスKhodro45のB2B側。3つの並行マーケットモードにまたがる241画面、フェアプライスに基づく入札システム、6段階のエスクロー決済、2世代にわたるディーラー収益化、そして取引のステートマシンを検証するための28フレームのプロトタイプ。',
    },
  },
  'carsparency-pro': {
    fa: {
      title: 'کارسپرنسی پرو — اپلیکیشن نمایشگاه‌داران، بازسازی‌شده برای بازار انگلیسی‌زبان',
      summary:
        'اپلیکیشن سمت خرید، بازسازی‌شده به انگلیسی روی سیستمی سبز تیره: مزایده‌های زنده و پیش‌رو، گزارش خسارت قطعه‌به‌قطعه در صفحهٔ جزئیاتی ۵۷۷۹ پیکسلی، وضعیت برد و باخت پیشنهاد، و «ارزش منصفانهٔ بازار» روی هر کارت — وارث مستقیم لنگرِ قیمت منصفانهٔ خودرو۴۵.',
    },
    ar: {
      title: 'Carsparency Pro — تطبيق التجّار معادًا بناؤه لسوق ناطق بالإنجليزية',
      summary:
        'تطبيق جانب الشراء معادًا بناؤه بالإنجليزية على نظام أخضر داكن: مزادات جارية وقادمة، وتقرير أضرار قطعة بقطعة داخل صفحة تفاصيل بارتفاع 5779 بكسل، وحالات ربح وخسارة المزايدة، و«القيمة السوقية العادلة» على كل بطاقة — الوريث المباشر لمرتكز السعر العادل في خودرو45.',
    },
    es: {
      title: 'Carsparency Pro — la app de concesionarios, rehecha para un mercado anglófono',
      summary:
        'La app del lado comprador rehecha en inglés sobre un sistema verde oscuro: subastas en curso y próximas, un informe de daños panel por panel dentro de una ficha de 5.779 px, estados de puja ganada y perdida, y un Fair Market Value en cada tarjeta, heredero directo del ancla de precio justo de Khodro45.',
    },
    de: {
      title: 'Carsparency Pro — die Händler-App, neu gebaut für einen englischsprachigen Markt',
      summary:
        'Die Käuferseite, auf einem dunkelgrünen System in Englisch neu gebaut: laufende und kommende Auktionen, ein Schadensbericht Teil für Teil in einer 5.779 px hohen Detailseite, Gewinn- und Verlust-Zustände des Gebots und ein Fair Market Value auf jeder Karte — direkter Nachfahre von Khodro45s Fair-Price-Anker.',
    },
    fr: {
      title: 'Carsparency Pro — l’app concessionnaires, refaite pour un marché anglophone',
      summary:
        'L’application côté acheteur refaite en anglais sur un système vert sombre : enchères en cours et à venir, rapport de dommages panneau par panneau dans une fiche de 5 779 px, états d’enchère gagnée et perdue, et une Fair Market Value sur chaque carte — héritière directe de l’ancrage au prix juste de Khodro45.',
    },
    ja: {
      title: 'Carsparency Pro — 英語圏市場向けに作り直したディーラーアプリ',
      summary:
        'ダークグリーンのシステム上に英語で作り直した購入側アプリ。進行中および今後のオークション、高さ5,779pxの車両詳細に収めたパネル単位のダメージレポート、入札の勝敗ステート、そして全カードに表示されるFair Market Value — Khodro45のフェアプライス基準を直接受け継いだもの。',
    },
  },
  'carsparency-back-office': {
    fa: {
      title: 'بک‌آفیس کارسپرنسی — کنسول اپراتوری پشت بازارگاه',
      summary:
        'کنسول داخلی که بازارگاه واقعاً روی آن می‌چرخد: ۶۸ صفحهٔ دسکتاپ در نواری کناری با هفت بخش، مدل قیمت چهارگانه — هدف، فروشنده، منصفانه، نمایشگاه‌دار — که چانه‌زنی قیمت را دیدنی می‌کند، و تاریخچهٔ گفتگوی داخلی و گفتگو با نمایشگاه‌دار.',
    },
    ar: {
      title: 'Carsparency Back Office — لوحة المشغّل خلف السوق',
      summary:
        'اللوحة الداخلية التي يدور عليها السوق فعليًا: 68 شاشة سطح مكتب عبر شريط جانبي من سبعة أقسام، ونموذج سعر رباعي — المستهدف والبائع والعادل والتاجر — يجعل التفاوض على السعر مرئيًا، وسجلّا محادثات داخلي ومع التاجر.',
    },
    es: {
      title: 'Carsparency Back Office — la consola de operaciones detrás del marketplace',
      summary:
        'La consola interna sobre la que funciona realmente el marketplace: 68 pantallas de escritorio en una barra lateral de siete secciones, un modelo de precio a cuatro bandas —objetivo, vendedor, justo, concesionario— que hace visible la negociación, e historiales de comentarios internos y con el concesionario.',
    },
    de: {
      title: 'Carsparency Back Office — die Operator-Konsole hinter dem Marktplatz',
      summary:
        'Die interne Konsole, auf der der Marktplatz tatsächlich läuft: 68 Desktop-Screens in einer Sidebar mit sieben Bereichen, ein vierteiliges Preismodell — Ziel, Verkäufer, Fair, Händler —, das die Preisverhandlung sichtbar macht, und zwei Kommentarverläufe, intern und mit dem Händler.',
    },
    fr: {
      title: 'Carsparency Back Office — la console opérateur derrière la place de marché',
      summary:
        'La console interne sur laquelle la place de marché tourne réellement : 68 écrans desktop dans une barre latérale de sept sections, un modèle de prix à quatre entrées — cible, vendeur, juste, concessionnaire — qui rend la négociation visible, et deux fils de commentaires, interne et avec le concessionnaire.',
    },
    ja: {
      title: 'Carsparency Back Office — マーケットプレイスを支えるオペレーターコンソール',
      summary:
        'マーケットプレイスが実際に動く内部コンソール。7セクションのサイドバーにまたがる68のデスクトップ画面、価格交渉を可視化する4系統の価格モデル（ターゲット／売り手／フェア／ディーラー）、そして社内とディーラー双方のコメント履歴。',
    },
  },
  'carsparency-inspection': {
    fa: {
      title: 'بازرسی کارسپرنسی — تبدیل معاینهٔ فیزیکی خودرو به یک سند ساختاریافته',
      summary:
        'ابزار میدانی که مدرکِ مورد معاملهٔ کل بازارگاه را تولید می‌کند: ۲۵ صفحهٔ موبایل و ۲۲ کامپوننت بازرسی قابل‌استفادهٔ مجدد برای معاینهٔ نُه‌بخشی خودرو، پرسش‌های مالکیت و سند، و گردش‌کاری که می‌توان آن را از سر گرفت — سرچشمهٔ داده‌های وضعیتی که اپلیکیشن نمایشگاه‌داران چاپ می‌کند.',
    },
    ar: {
      title: 'Carsparency Inspection — تحويل الفحص المادي إلى سجل منظّم',
      summary:
        'الأداة الميدانية التي تنتج الدليل الذي يتداوله السوق كله: 25 شاشة للهاتف و22 مكوّن فحص قابلًا لإعادة الاستخدام تغطي فحصًا للسيارة من تسعة أقسام، وأسئلة الملكية وسند التسجيل، وسير عمل يمكن استئنافه — مصدر بيانات الحالة التي يعرضها تطبيق التجّار.',
    },
    es: {
      title: 'Carsparency Inspection — convertir una revisión física en un registro estructurado',
      summary:
        'La herramienta de campo que produce la evidencia con la que comercia todo el marketplace: 25 pantallas móviles y 22 componentes de inspección reutilizables que cubren una revisión del vehículo en nueve áreas, las preguntas de propiedad y titularidad, y un flujo que se puede retomar: el origen de los datos de estado que imprime la app de concesionarios.',
    },
    de: {
      title: 'Carsparency Inspection — eine physische Begutachtung in einen strukturierten Befund verwandeln',
      summary:
        'Das Feldwerkzeug, das den Nachweis erzeugt, mit dem der ganze Marktplatz handelt: 25 Mobile-Screens und 22 wiederverwendbare Inspektionsbausteine für eine Fahrzeugbegutachtung in neun Bereichen, die Fragen zu Eigentum und Fahrzeugbrief und ein wiederaufnehmbarer Ablauf — die Quelle der Zustandsdaten, die die Händler-App ausgibt.',
    },
    fr: {
      title: 'Carsparency Inspection — transformer une expertise physique en dossier structuré',
      summary:
        'L’outil de terrain qui produit la preuve sur laquelle toute la place de marché échange : 25 écrans mobiles et 22 composants d’inspection réutilisables couvrant une expertise du véhicule en neuf zones, les questions de propriété et de carte grise, et un flux que l’on peut reprendre — la source des données d’état qu’imprime l’app concessionnaires.',
    },
    ja: {
      title: 'Carsparency Inspection — 現車確認を構造化された記録に変える',
      summary:
        'マーケットプレイス全体が取引する「証拠」を生み出す現場ツール。9領域の車両点検、所有権と登録書類の設問、そして中断して再開できるワークフローを、25のモバイル画面と22の再利用可能な点検コンポーネントで構成 — ディーラーアプリが表示するコンディションデータの出どころ。',
    },
  },
  'carsparency-web': {
    fa: {
      title: 'وب کارسپرنسی — سمت فروشنده، ساخته‌شده به‌صورت واکنش‌گرا از روی یک الگوی مرجع',
      summary:
        'مسیر فروشنده در وب، طراحی‌شده هم‌زمان برای دسکتاپ و موبایل — ۴۲ صفحه در ۱۴۴۰ و ۳۸ صفحه در ۳۷۵ پیکسل — آشکارا بر پایهٔ الگوی Motorway، با ورود از شمارهٔ پلاک، چهار وعدهٔ ارزش، توضیحی چهارمرحله‌ای، و سازندهٔ چندبخشی پروفایل خودرو.',
    },
    ar: {
      title: 'Carsparency Web — جانب البائع، مبنيًّا بشكل متجاوب انطلاقًا من مرجع',
      summary:
        'رحلة البائع على الويب، مصمّمة لسطح المكتب والهاتف بالتوازي — 42 شاشة عند 1440 بكسل و38 عند 375 — مبنية صراحةً على نموذج Motorway، بمدخل تقييم يبدأ من لوحة الترخيص، وأربعة وعود قيمة، وشرح من أربع خطوات، ومُنشئ ملف للسيارة متعدّد الأقسام.',
    },
    es: {
      title: 'Carsparency Web — el lado del vendedor, construido responsive a partir de un referente',
      summary:
        'El recorrido del vendedor diseñado en paralelo para escritorio y móvil —42 pantallas a 1440 px y 38 a 375— abiertamente modelado sobre Motorway, con una entrada de tasación que empieza por la matrícula, cuatro promesas de valor, un explicador en cuatro pasos y un constructor de ficha del coche en varias secciones.',
    },
    de: {
      title: 'Carsparency Web — die Verkäuferseite, responsiv nach einem Vorbild gebaut',
      summary:
        'Die Verkäuferstrecke, parallel für Desktop und Mobile entworfen — 42 Screens bei 1440 px und 38 bei 375 —, offen am Modell von Motorway gebaut, mit einem Bewertungseinstieg über das Kennzeichen, vier Wertversprechen, einer Erklärung in vier Schritten und einem mehrteiligen Fahrzeugprofil-Builder.',
    },
    fr: {
      title: 'Carsparency Web — le côté vendeur, construit en responsive à partir d’un modèle',
      summary:
        'Le parcours vendeur conçu en parallèle pour desktop et mobile — 42 écrans en 1440 px et 38 en 375 —, ouvertement bâti sur le modèle de Motorway, avec une entrée d’estimation par la plaque d’immatriculation, quatre promesses de valeur, une explication en quatre étapes et un constructeur de profil véhicule en plusieurs sections.',
    },
    ja: {
      title: 'Carsparency Web — ベンチマークから起こした、売り手側のレスポンシブサイト',
      summary:
        'デスクトップとモバイルを並行して設計した売り手の導線 — 1440pxで42画面、375pxで38画面。Motorwayのモデルを明示的に下敷きにし、ナンバープレートから始まる査定入力、4つの価値の約束、4ステップの説明、そして複数セクションからなる車両プロフィールビルダーを備える。',
    },
  },
  'carsparency-design-system': {
    fa: {
      title: 'دیزاین‌سیستم کارسپرنسی — دوازده طیف رنگ، پنج وزن قلم و واژگانی وام‌گرفته',
      summary:
        'شالودهٔ مشترک زیر پرو، بک‌آفیس، بازرسی و وب: ۱۲ طیف رنگ ده‌پله‌ای منتشرشده به‌صورت متغیرهای فیگما، مقیاس تایپی پنج‌وزنه، ماتریس کامل حالت‌های دکمه، یازده برد کامپوننت، و کتابخانهٔ آیکونی با ۱۱٬۳۲۶ نود.',
    },
    ar: {
      title: 'نظام تصميم Carsparency — اثنا عشر تدرّجًا وخمسة أوزان ومفردات مستعارة',
      summary:
        'الأساس المشترك تحت Pro وBack Office وInspection وWeb: ‏12 تدرّجًا لونيًا من عشر درجات منشورة كمتغيّرات في فيغما، وسلّم طباعي بخمسة أوزان، ومصفوفة كاملة لحالات الأزرار، وأحد عشر لوحًا للمكوّنات، ومكتبة أيقونات من 11٬326 عقدة.',
    },
    es: {
      title: 'Sistema de diseño Carsparency — doce rampas, cinco pesos y un vocabulario prestado',
      summary:
        'La base compartida bajo Pro, Back Office, Inspection y Web: 12 rampas de color de 10 pasos publicadas como variables de Figma, una escala tipográfica de cinco pesos, una matriz completa de estados de botón, once tableros de componentes y una librería de iconos de 11.326 nodos.',
    },
    de: {
      title: 'Carsparency Design System — zwölf Farbrampen, fünf Schnitte und ein geliehenes Vokabular',
      summary:
        'Das gemeinsame Fundament unter Pro, Back Office, Inspection und Web: 12 zehnstufige Farbrampen als Figma-Variablen veröffentlicht, eine Typoskala mit fünf Schnitten, eine vollständige Matrix der Button-Zustände, elf Komponenten-Boards und eine Icon-Bibliothek aus 11.326 Knoten.',
    },
    fr: {
      title: 'Design system Carsparency — douze rampes, cinq graisses et un vocabulaire emprunté',
      summary:
        'La fondation partagée sous Pro, Back Office, Inspection et Web : 12 rampes de couleur de 10 paliers publiées en variables Figma, une échelle typographique à cinq graisses, une matrice complète des états de bouton, onze planches de composants et une bibliothèque d’icônes de 11 326 nœuds.',
    },
    ja: {
      title: 'Carsparency デザインシステム — 12のカラーランプ、5つのウェイト、借りてきた語彙',
      summary:
        'Pro、Back Office、Inspection、Webを支える共通基盤。Figma変数として公開した10段階×12本のカラーランプ、5ウェイトのタイプスケール、ボタン状態の完全なマトリクス、11枚のコンポーネントボード、そして11,326ノードのアイコンライブラリ。',
    },
  },

  // ── Taha Gasht ──────────────────────────────────────────────────────────────────────────
  'taha-gasht-platform': {
    fa: {
      title: 'طاهاگشت — سایت رزرو و پنل داخلی',
      summary:
        'کسب‌وکاری گردشگری که پرواز، هتل و تور می‌فروشد؛ طراحی‌شده در سه فایل: سایت عمومی رزرو، پنل داخلی که کارشناسان در آن کار می‌کنند، و دیزاین‌سیستم مشترک میان آن دو.',
    },
    ar: {
      title: 'طاها غشت — موقع الحجز ولوحة الحجز الداخلية',
      summary:
        'شركة سفر تبيع الرحلات الجوية والفنادق والجولات، مصمَّمة عبر ثلاثة ملفات: موقع الحجز العام، ولوحة الحجز الداخلية التي يعمل عليها الموظفون، ونظام التصميم المشترك بينهما.',
    },
    es: {
      title: 'Taha Gasht — sitio de reservas y panel interno',
      summary:
        'Un negocio de viajes que vende vuelos, hoteles y circuitos, diseñado en tres archivos: el sitio público de reservas, el panel interno en el que trabajan los agentes y el sistema de diseño compartido entre ambos.',
    },
    de: {
      title: 'Taha Gasht — Buchungsseite und internes Buchungspanel',
      summary:
        'Ein Reiseunternehmen, das Flüge, Hotels und Touren verkauft, entworfen über drei Dateien: die öffentliche Buchungsseite, das interne Panel, in dem die Agenten arbeiten, und das gemeinsame Design System dazwischen.',
    },
    fr: {
      title: 'Taha Gasht — site de réservation et panneau interne',
      summary:
        'Une agence de voyage qui vend des vols, des hôtels et des circuits, conçue à travers trois fichiers : le site public de réservation, le panneau interne où travaillent les agents, et le design system partagé entre les deux.',
    },
    ja: {
      title: 'Taha Gasht — 予約サイトと社内予約パネル',
      summary:
        '航空券・ホテル・ツアーを販売する旅行事業を、3つのファイルで設計。一般向けの予約サイト、担当者が実際に使う社内パネル、そしてその二つで共有するデザインシステム。',
    },
  },

  // ── Independent ─────────────────────────────────────────────────────────────────────────
  'nim-dang': {
    fa: {
      title: 'نیم‌دانگ — بورسی برای مترمربع‌های تهران',
      summary:
        'پلتفرمی ایرانی که ملک تهران را متری می‌فروشد و بعد به مالکان اجازهٔ فروش مجدد می‌دهد: ۱۹۱ صفحه و دیزاین‌سیستمی ۴۳۰ کامپوننتی، که بهترین ایده‌اش نشانگر پایین/منصفانه/بالا است — سنجه‌ای که هر دو سوی معاملهٔ ثانویه را نمره می‌دهد.',
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
      title: 'یاراوان — برند خدمات پس از فروشی که پرسش‌های بی‌پاسخش را منتشر می‌کند',
      summary:
        'یک برند مستقل گارانتی فارسی، ساخته‌شده به‌صورت پلتفرمی کامل روی عملیات پس از فروشی که هیچ‌کس هرگز مکتوبش نکرده بود — معماری فرایند، مدل نقش‌ها و مسئولیت‌ها، و محصولی که در آن هر ادعای تأییدنشده به‌جای یک جملهٔ مطمئن، به شکل یک پرسش بازِ دیدنی منتشر می‌شود.',
    },
    ar: {
      title: 'ياراوان — علامة خدمات ما بعد البيع التي تنشر أسئلتها المفتوحة',
      summary:
        'علامة ضمان فارسية مستقلّة، بُنيت كمنصّة كاملة فوق عملية خدمات ما بعد بيع لم يوثّقها أحد من قبل — معمارية عمليات، ونموذج للأدوار والمسؤوليات، ومنتج يُنشَر فيه كل ادّعاء غير معتمَد كسؤال مفتوح ظاهر بدلًا من جملة واثقة.',
    },
    es: {
      title: 'Yaravan — una marca de posventa que publica sus propias preguntas abiertas',
      summary:
        'Una marca persa independiente de garantías, construida como una plataforma completa sobre una operación de posventa que nadie había puesto por escrito: una arquitectura de procesos, un modelo de roles y responsabilidades, y un producto en el que toda afirmación no aprobada se publica como una pregunta abierta visible en lugar de una frase segura.',
    },
    de: {
      title: 'Yaravan — eine After-Sales-Marke, die ihre eigenen offenen Fragen veröffentlicht',
      summary:
        'Eine unabhängige persische Garantiemarke, als vollständige Plattform auf einem After-Sales-Betrieb gebaut, den nie jemand aufgeschrieben hatte — eine Prozessarchitektur, ein Rollen- und Verantwortungsmodell und ein Produkt, in dem jede ungeprüfte Behauptung als sichtbare offene Frage erscheint statt als selbstsicherer Satz.',
    },
    fr: {
      title: 'Yaravan — une marque d’après-vente qui publie ses propres questions ouvertes',
      summary:
        'Une marque de garantie persane indépendante, construite comme une plateforme complète par-dessus une activité d’après-vente que personne n’avait jamais mise par écrit — une architecture de processus, un modèle de rôles et de responsabilités, et un produit où toute affirmation non validée est publiée comme une question ouverte visible plutôt que comme une phrase assurée.',
    },
    ja: {
      title: 'Yaravan — 自らの未解決の問いを公開するアフターサービスブランド',
      summary:
        '誰も文書化してこなかったアフターサービス業務の上に、完全なプラットフォームとして構築した独立系のペルシャ語保証ブランド。プロセスアーキテクチャ、役割と責任のモデル、そして未承認の主張を自信ありげな一文ではなく「見える未解決の問い」として出す製品。',
    },
  },
  'digital-gold': {
    fa: {
      title: 'طلای دیجیتال — چشم‌انداز محصول و رشد',
      summary:
        'چشم‌انداز، ویژگی‌ها و استراتژی رشد محصول معاملهٔ طلای دیجی‌کالا را تعریف کردم — از کمپین‌ها و بخش‌بندی تا داشبوردهای BI که آن‌ها را رصد می‌کرد.',
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
      title: 'RP1 — آرنای چندبازیِ Play-to-Earn',
      summary:
        'طراحی محصول و استراتژی برای یک آرنای موبایلی Play-to-Earn که بازی‌های HTML5 را زیر یک لایهٔ رقابتی و اقتصادی واحد گرد می‌آورد — پژوهش پلتفرم‌های رقابتی، تعیین دامنهٔ MVP و یک مشخصات وایرفریم کامل در ۱۶ بخش.',
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
        'بازطراحی UI/UX و معماری اطلاعات پلتفرم ابری آروان را هدایت کردم و با داده‌های رفتاری تصمیم گرفتم کاربران واقعاً به دیدن کدام شاخص‌های سرور نیاز دارند.',
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
  'zero-fee-campaign': {
    fa: {
      title: 'کمپین بدون کارمزد',
      summary:
        'کمپین معاملهٔ بدون کارمزد برای جذب کاربر طلای دیجیتال دیجی‌کالا — ایده، خلاقیت و اجرا در محصول و بازاریابی.',
    },
    ar: {
      title: 'حملة بلا رسوم',
      summary:
        'حملة تداول بلا رسوم لدفع الاكتساب للذهب الرقمي في ديجيكالا — الفكرة والعمل الإبداعي والتنفيذ عبر المنتج والتسويق.',
    },
    es: {
      title: 'Campaña sin comisiones',
      summary:
        'Una campaña de operaciones sin comisiones para impulsar la captación de Digital Gold de Digikala: concepto, creatividad y ejecución en producto y marketing.',
    },
    de: {
      title: 'Gebührenfreie Kampagne',
      summary:
        'Eine gebührenfreie Handelskampagne zur Neukundengewinnung für Digikalas Digital Gold – Konzept, Kreation und Umsetzung über Produkt und Marketing hinweg.',
    },
    fr: {
      title: 'Campagne sans frais',
      summary:
        'Une campagne de transactions sans frais pour stimuler l’acquisition de Digital Gold chez Digikala — concept, création et exécution côté produit et marketing.',
    },
    ja: {
      title: '手数料ゼロキャンペーン',
      summary:
        'DigikalaのDigital Goldの新規獲得を狙った手数料ゼロの取引キャンペーン。コンセプト、クリエイティブ、プロダクトとマーケティング両面での実行。',
    },
  },
  'installment-campaign': {
    fa: {
      title: 'کمپین اقساطی',
      summary: 'خرید اقساطی طلا — طراحی و اجرای کمپین در سطح محصول و کانال‌های بازاریابی پشت آن.',
    },
    ar: {
      title: 'حملة التقسيط',
      summary: 'شراء الذهب بالتقسيط — تصميم الحملة وتنفيذها عبر سطح المنتج وقنوات التسويق خلفه.',
    },
    es: {
      title: 'Campaña de pago a plazos',
      summary:
        'Comprar oro a plazos: diseño y ejecución de la campaña en la superficie del producto y en los canales de marketing que la sostenían.',
    },
    de: {
      title: 'Ratenkampagne',
      summary:
        'Gold in Raten kaufen – Kampagnendesign und Umsetzung auf der Produktoberfläche und in den Marketingkanälen dahinter.',
    },
    fr: {
      title: 'Campagne de paiement en plusieurs fois',
      summary:
        'Acheter de l’or en plusieurs fois — conception et exécution de la campagne sur la surface produit et dans les canaux marketing associés.',
    },
    ja: {
      title: '分割払いキャンペーン',
      summary: '金を分割で購入できるキャンペーンの設計と実行。プロダクト面と、その背後のマーケティングチャネルの両方で。',
    },
  },
  'gift-card-campaign': {
    fa: {
      title: 'کمپین کارت هدیه',
      summary: 'کارت هدیهٔ طلا برای طلای دیجیتال — طراحی و اجرای کمپین، از سطح محصول تا فشار بازاریابی.',
    },
    ar: {
      title: 'حملة بطاقات الهدايا',
      summary: 'بطاقات هدايا ذهبية للذهب الرقمي — تصميم الحملة وتنفيذها، من سطح المنتج إلى الدفع التسويقي.',
    },
    es: {
      title: 'Campaña de tarjetas regalo',
      summary:
        'Tarjetas regalo de oro para Digital Gold: diseño y ejecución de la campaña, desde la superficie del producto hasta el empuje de marketing.',
    },
    de: {
      title: 'Geschenkkarten-Kampagne',
      summary:
        'Gold-Geschenkkarten für Digital Gold – Kampagnendesign und Umsetzung, von der Produktoberfläche bis zum Marketing-Push.',
    },
    fr: {
      title: 'Campagne de cartes cadeaux',
      summary:
        'Des cartes cadeaux en or pour Digital Gold — conception et exécution de la campagne, de la surface produit jusqu’à la poussée marketing.',
    },
    ja: {
      title: 'ギフトカードキャンペーン',
      summary: 'Digital Gold向けの金のギフトカード。プロダクト面からマーケティング施策まで、キャンペーンの設計と実行。',
    },
  },
  'user-segmentation-model': {
    fa: {
      title: 'مدل بخش‌بندی کاربران',
      summary:
        'مدل بخش‌بندی کاربران طلای دیجیتال را بر پایهٔ دارایی، جمعیت‌شناسی و رفتار ساختم — مبنای هدف‌گذاری کمپین و اتوماسیون بازاریابی.',
    },
    ar: {
      title: 'نموذج تقسيم المستخدمين',
      summary:
        'بنيتُ نموذج تقسيم مستخدمي الذهب الرقمي بحسب الأصول والخصائص السكانية والسلوك — أساس استهداف الحملات وأتمتة التسويق.',
    },
    es: {
      title: 'Modelo de segmentación de usuarios',
      summary:
        'Construí el modelo de segmentación de los usuarios de Digital Gold por activos, demografía y comportamiento: la base de la segmentación de campañas y de la automatización de marketing.',
    },
    de: {
      title: 'Nutzersegmentierungsmodell',
      summary:
        'Das Segmentierungsmodell für Digital-Gold-Nutzer nach Vermögen, Demografie und Verhalten gebaut – die Grundlage für Kampagnen-Targeting und Marketing-Automation.',
    },
    fr: {
      title: 'Modèle de segmentation des utilisateurs',
      summary:
        'J’ai construit le modèle de segmentation des utilisateurs de Digital Gold selon les actifs, la démographie et le comportement — la base du ciblage des campagnes et de l’automatisation marketing.',
    },
    ja: {
      title: 'ユーザーセグメンテーションモデル',
      summary:
        'Digital Goldのユーザーを資産・属性・行動でセグメント化するモデルを構築。キャンペーンのターゲティングとマーケティングオートメーションの土台になった。',
    },
  },
  'marketing-automation-flows': {
    fa: {
      title: 'اتوماسیون بازاریابی و فلوهای رویدادمحور',
      summary:
        'فلوهای تعامل خودکار که با رویدادهای کاربر فعال می‌شدند، روی مدل بخش‌بندی ساخته شد تا پیام‌ها دنبال کاری باشند که آدم‌ها واقعاً انجام داده‌اند.',
    },
    ar: {
      title: 'أتمتة التسويق والتدفّقات المدفوعة بالأحداث',
      summary:
        'تدفّقات تفاعل مؤتمتة تنطلق بأحداث المستخدم، مبنية على نموذج التقسيم كي تتبع الرسائل ما فعله الناس فعلًا.',
    },
    es: {
      title: 'Automatización de marketing y flujos por eventos',
      summary:
        'Flujos de interacción automatizados disparados por eventos de usuario, construidos sobre el modelo de segmentación para que los mensajes siguieran lo que la gente hacía de verdad.',
    },
    de: {
      title: 'Marketing-Automation & ereignisgesteuerte Flows',
      summary:
        'Automatisierte Engagement-Flows, ausgelöst durch Nutzerereignisse und auf dem Segmentierungsmodell aufgebaut, damit Nachrichten dem folgten, was Menschen tatsächlich taten.',
    },
    fr: {
      title: 'Automatisation marketing et flux événementiels',
      summary:
        'Des flux d’engagement automatisés déclenchés par les événements utilisateurs, bâtis sur le modèle de segmentation pour que les messages suivent ce que les gens faisaient réellement.',
    },
    ja: {
      title: 'マーケティングオートメーションとイベント駆動フロー',
      summary:
        'ユーザーの行動イベントをきっかけに走る自動エンゲージメントフロー。セグメンテーションモデルの上に構築し、実際の行動にメッセージが追随するようにした。',
    },
  },
  'gold-bi-dashboards': {
    fa: {
      title: 'داشبوردهای BI — NMV، CTR، CPC، نرخ تبدیل',
      summary:
        'صفحه‌گسترده‌های کمپین را با داشبوردهای ساخت‌یافتهٔ BI برای NMV، CTR، CPC و نرخ تبدیل جایگزین کردم تا محصول، بازاریابی و روابط‌عمومی از یک مجموعه عدد کار کنند.',
    },
    ar: {
      title: 'لوحات ذكاء الأعمال — NMV وCTR وCPC والتحويل',
      summary:
        'استبدلتُ جداول الحملات بلوحات ذكاء أعمال منظَّمة لـ NMV وCTR وCPC ومعدّل التحويل، ليعمل المنتج والتسويق والعلاقات العامة من مجموعة أرقام واحدة.',
    },
    es: {
      title: 'Paneles de BI: NMV, CTR, CPC y conversión',
      summary:
        'Sustituí las hojas de cálculo de campañas por paneles de BI estructurados de NMV, CTR, CPC y tasa de conversión, para que producto, marketing y PR trabajaran con las mismas cifras.',
    },
    de: {
      title: 'BI-Dashboards — NMV, CTR, CPC, Conversion',
      summary:
        'Die Kampagnentabellen durch strukturierte BI-Dashboards für NMV, CTR, CPC und Conversion Rate ersetzt, damit Produkt, Marketing und PR mit denselben Zahlen arbeiteten.',
    },
    fr: {
      title: 'Tableaux de bord BI — NMV, CTR, CPC, conversion',
      summary:
        'J’ai remplacé les tableurs de campagne par des tableaux de bord BI structurés pour le NMV, le CTR, le CPC et le taux de conversion, afin que produit, marketing et RP travaillent sur les mêmes chiffres.',
    },
    ja: {
      title: 'BIダッシュボード — NMV・CTR・CPC・CVR',
      summary:
        'キャンペーンのスプレッドシートを、NMV・CTR・CPC・コンバージョン率を扱う構造化されたBIダッシュボードに置き換え、プロダクト・マーケティング・PRが同じ数字で動けるようにした。',
    },
  },
  'bnpl-concept': {
    fa: {
      title: 'خرید اقساطی طلا — کانسپت',
      summary: 'کانسپت «الان بخر، بعداً بپرداز» برای خرید طلا — ایدهٔ یک خدمت مالی تازه که درون طلای دیجیتال پیشنهاد شد.',
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
      title: 'اعتبار با پشتوانهٔ طلا — کانسپت',
      summary: 'اعتباری که با موجودی طلای کاربر تضمین می‌شود — دومین کانسپت خدمت مالی، در کنار BNPL.',
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
      title: 'برنامهٔ روابط‌عمومی و آگاهی از برند',
      summary: 'پوشش راهبردی روابط‌عمومی را با بازاریابی عملکردی هماهنگ کردم تا آگاهی از برند طلای دیجیتال گسترده‌تر شود.',
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
      title: 'کمپین‌های جذب بازدیدکننده و برنامهٔ اینفلوئنسری',
      summary:
        'رویداد، کمپین شبکه‌های اجتماعی و همکاری با اینفلوئنسرها برای بالا بردن حضور در مجتمع هدیش — آگاهی آنلاین و آفلاین برای یک مکان فیزیکی.',
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
      title: 'اپ مدیریت مجتمع — کانسپت',
      summary: 'کانسپت یک اپ مدیریت مرکز خرید را برای بهبود تعامل میان واحدها و مشتریان پیشنهاد و طراحی کردم.',
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
        'مصاحبه با ذی‌نفعان برای خواندن کسب‌وکار، و بعد یک جایگاه‌یابی و شعاری هم‌راستا با هویت که تیم می‌توانست حولش هم‌نظر شود.',
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
      summary: 'وب‌سایتی که از دل تحلیل فرایندهای سنتی کسب‌وکار شرکت ساخته شد، به‌عنوان بخشی از همان کار جایگاه‌یابی.',
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
        'پژوهش با معلم‌ها و دانش‌آموزها که کیفیت تطبیق را به‌عنوان تیزترین نقطهٔ درد آشکار کرد و به یک آیتم نقشهٔ راه تبدیل شد — پژوهش و جهت‌گیری، نه بازطراحی منتشرشده.',
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
      title: 'استراتژی محصول و نقشهٔ راه',
      summary:
        'تحلیل جایگاه‌یابی برند را به یک نقشهٔ راه محصول مرحله‌بندی‌شده برای اوتیچر ترجمه کردم، در قاب تاریخچهٔ سرمایه‌گذاری و عرضهٔ شرکت.',
    },
    ar: {
      title: 'استراتيجية المنتج وخارطة الطريق',
      summary:
        'ترجمتُ تحليل تموضع العلامة إلى خارطة طريق منتج مرحلية لأوتيتشر، في إطار تاريخ التمويل والإطلاق لدى الشركة.',
    },
    es: {
      title: 'Estrategia de producto y hoja de ruta',
      summary:
        'Traduje el análisis de posicionamiento de marca en una hoja de ruta de producto por fases para OTeacher, enmarcada en el historial de financiación y lanzamientos de la empresa.',
    },
    de: {
      title: 'Produktstrategie & Roadmap',
      summary:
        'Die Markenpositionierungsanalyse in eine phasenweise Produkt-Roadmap für OTeacher übersetzt, eingeordnet in die Finanzierungs- und Launch-Historie des Unternehmens.',
    },
    fr: {
      title: 'Stratégie produit et feuille de route',
      summary:
        'J’ai traduit l’analyse de positionnement de marque en une feuille de route produit par phases pour OTeacher, replacée dans l’historique de financement et de lancement de l’entreprise.',
    },
    ja: {
      title: 'プロダクト戦略とロードマップ',
      summary:
        'ブランドポジショニングの分析を、OTeacherの段階的なプロダクトロードマップに落とし込んだ。同社の資金調達とローンチの経緯を踏まえて構成。',
    },
  },
  'oteacher-panel-redesign': {
    fa: {
      title: 'بازطراحی پنل — بسته‌ها، کیف پول، گزارش‌ها، پروفایل، تقویم و پیام‌رسان',
      summary: 'بازطراحی پنل کاربری اوتیچر در هفت حوزه، با یک دور تکرار دوم روی بیشترشان.',
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
      summary: 'در سند استراتژی اوتیچر به‌عنوان ابتکار «وب‌سایت جدید» نام برده شده؛ منبع طراحی هنوز تأیید نشده است.',
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
      title: 'برنامهٔ واحد آموزش — ارزیابی معلم، استانداردها و ارتقای مهارت',
      summary:
        'یک واحد آموزش رسمی در اوتیچر راه انداختم: تیم نظارت بر معلم‌ها، فرایند مصاحبه و استاندارد برای هر معلم، و کلاس‌های تخصصی ارتقای مهارت.',
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
        'پژوهش مبتنی بر دادهٔ رفتاری دربارهٔ اینکه کاربران ابری واقعاً به کدام شاخص‌های سرور نیاز دارند — شواهد پشت بازطراحی داشبورد پلتفرم.',
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
    fa: { title: 'وب‌سایت و پنل آموزش', summary: 'وب‌سایت عمومی بایومیز و پنل یادگیری آن را طراحی کردم.' },
    ar: { title: 'الموقع ولوحة التعليم', summary: 'صمّمتُ موقع بايوميز العام ولوحة التعلّم الخاصة به.' },
    es: { title: 'Web y panel de formación', summary: 'Diseñé la web pública de Biomaze y su panel de aprendizaje.' },
    de: { title: 'Website & Schulungspanel', summary: 'Biomazes öffentliche Website und ihr Lernpanel gestaltet.' },
    fr: { title: 'Site et panneau de formation', summary: 'J’ai conçu le site public de Biomaze et son panneau d’apprentissage.' },
    ja: { title: 'ウェブサイトと教育パネル', summary: 'Biomazeの公開ウェブサイトと学習パネルを設計した。' },
  },
  'biomaze-design-system': {
    fa: {
      title: 'سیستم طراحی',
      summary: 'یک سیستم کامپوننت که به توسعه‌دهنده‌های بایومیز اجازه داد سریع منتشر کنند — کنار وب‌سایت و پنل آموزش ساخته شد.',
    },
    ar: {
      title: 'نظام التصميم',
      summary: 'نظام مكوّنات مكّن مطوّري بايوميز من الشحن بسرعة — بُني إلى جانب الموقع ولوحة التعليم.',
    },
    es: {
      title: 'Sistema de diseño',
      summary: 'Un sistema de componentes que permitió a los desarrolladores de Biomaze lanzar rápido, construido junto a la web y el panel de formación.',
    },
    de: {
      title: 'Design-System',
      summary: 'Ein Komponentensystem, mit dem Biomazes Entwickler schnell ausliefern konnten – parallel zur Website und zum Schulungspanel gebaut.',
    },
    fr: {
      title: 'Design system',
      summary: 'Un système de composants qui a permis aux développeurs de Biomaze de livrer vite — construit en parallèle du site et du panneau de formation.',
    },
    ja: {
      title: 'デザインシステム',
      summary: 'Biomazeの開発者が速くリリースできるようにしたコンポーネントシステム。ウェブサイトと教育パネルと並行して構築した。',
    },
  },
  'didestan-video-platform': {
    fa: {
      title: 'پلتفرم ویدئو',
      summary: 'یک پلتفرم ویدئوی داده‌محور: پروتوتایپ‌های میان‌وفاداری روی Google Material، با پژوهشی که بر پایهٔ Lean UX اجرا شد.',
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
      summary: 'یک اپ تماس دسکتاپ و WiFon، یک اپ تماس مصرف‌کننده — کارهای اولیهٔ UI/UX.',
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
        'سایت و وبلاگی دوزبانه با پیش‌فرض فارسی برای یک نویسنده، مدرس و عکاس — یک زبان طراحی مکتوب، سیستم رزرو شمسی، و پشته‌ای که تماماً داخل ایران می‌ماند.',
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
        'یک سایت شرکتی هفت‌زبانه برای یک اصیلِ تجارت فیزیکی فرآورده‌های نفتی، طراحی‌شده حول پرسشی که طرف مقابل بی‌صدا می‌پرسد: آیا این نهاد واقعی و قابل‌راستی‌آزمایی است؟',
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
  faymen: {
    fa: {
      title: 'فایمن — فروشگاه پوشاک مردانهٔ فارسی RTL',
      summary:
        'یک فروشگاه زندهٔ پوشاک مردانهٔ فارسی و راست‌به‌چپ — قالبی تجاری بین‌المللی که حول پرداخت‌های ایرانی، هویت فقط با شمارهٔ تلفن و پشته‌ای داخلی بازسازی شد.',
    },
    ar: {
      title: 'فايمن — متجر ملابس رجالية فارسي من اليمين إلى اليسار',
      summary:
        'متجر ملابس رجالية فارسي حيّ باتجاه من اليمين إلى اليسار — قالب تجارة إلكترونية عالمي أُعيد بناؤه حول المدفوعات الإيرانية والهوية بالهاتف فقط وحزمة داخل البلاد.',
    },
    es: {
      title: 'Fayman — tienda de moda masculina en persa RTL',
      summary:
        'Una tienda de moda masculina en persa y de derecha a izquierda, en producción: una plantilla de comercio internacional reconstruida en torno a los pagos iraníes, la identidad solo por teléfono y un stack alojado en el país.',
    },
    de: {
      title: 'Fayman — persischer RTL-Herrenmode-Shop',
      summary:
        'Ein produktiver persischer Herrenmode-Shop in RTL – ein internationales Commerce-Template, neu gebaut um iranische Zahlungsarten, reine Telefon-Identität und einen Stack im Land.',
    },
    fr: {
      title: 'Fayman — boutique de mode masculine en persan RTL',
      summary:
        'Une boutique de mode masculine en persan et de droite à gauche, en production — un template e-commerce international reconstruit autour des paiements iraniens, d’une identité par téléphone uniquement et d’une stack hébergée dans le pays.',
    },
    ja: {
      title: 'Fayman — ペルシャ語RTLのメンズウェア店舗',
      summary:
        '稼働中のペルシャ語・右から左のメンズウェアEC。国際的なコマーステンプレートを、イランの決済手段、電話番号のみの本人確認、国内完結のスタックに合わせて作り直した。',
    },
  },
  'renova-plus': {
    fa: {
      title: 'رنووا+ — پلتفرم بازسازی مدیریت‌شده و OS پرتفوی',
      summary:
        'دو سطح برای یک محصول دبی: یک فاز طراحی کامل برای پلتفرم بازسازی مدیریت‌شده، و یک پروتوتایپ کارا از لایهٔ پرتفوی نهادی که آن را می‌فروشد.',
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
        'اپی شبکه‌سازی ارتباط‌محور برای جامعهٔ حرفه‌ای دبی — سند محصول، فهرست ۵۷ مسئله با دیکشنری شاخص خودش، معماری برند و لایهٔ درآمد B2B، سنجیده‌شده در برابر وعده‌هایی که محصول به کاربرانش می‌دهد.',
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
        'ممیزی دقیق فایل طراحی یک مارکت‌پلیس ایرانی حمل بار، که به معماری ۴۲ فرایند و یک دروازهٔ آمادگی ورودی تبدیل شد.',
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
      title: 'گرین‌رست — ممیزی UX تجارت الکترونیک',
      summary:
        'ممیزی UX امتیازدهی‌شده و دوزبانه از یک فروشگاه زندهٔ تشک ایرانی، همراه با نقشهٔ راه بازطراحی اولویت‌بندی‌شده بر پایهٔ یک جعبه‌ابزار تحلیل تجارت الکترونیک قابل‌استفادهٔ مجدد.',
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
      title: 'پاسپورت تابستانه‌ی ناریان — کمپین خرده‌فروشی',
      summary:
        'کمپین تابستانه‌ای که هر فروشگاه را به یک فرودگاه و هر خرید را به یک بلیت تبدیل می‌کرد — اقتصادِ کلاس‌های پروازی، مجموعه‌ی نُه مهر و کنونِ دوزبانه‌ی کپی، برای رشد سبد خرید بدون هیچ تخفیفی. هرگز اجرا نشد.',
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
