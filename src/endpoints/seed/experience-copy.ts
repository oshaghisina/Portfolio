import type { Locale } from '@/utilities/locale'

/**
 * The `experiences` collection in the five locales it was missing — `ar`, `es`, `de`, `fr`, `ja`.
 *
 * English and Persian already exist in `experiences.ts` (`experienceEnData` / `experienceFaData`,
 * D-009's en+fa baseline), so this table deliberately does not include them: it can add the
 * missing languages without being able to touch the two that are already right.
 *
 * Keyed by `order`, which is the stable identity `experiencesData` and the About page's career
 * journey both use — row position is not. `0` is Taha Gasht, which entered ahead of Digikala
 * without renumbering the rest; see the note in `experiences.ts`.
 *
 * Only localized leaves. `employment`, `order` and `period.present` / `period.approx` are shared
 * and never re-sent (see `experienceFaData`, which set that precedent).
 *
 * `durationLabel` carries locale digits in fa and ar per the convention already in
 * `experiences.ts`; the Latin-script locales keep Latin digits, and Japanese uses its own
 * counters (年 / か月).
 */
export type ExperienceLocale = Exclude<Locale, 'en' | 'fa'>

export interface ExperienceFields {
  title: string
  company: string
  product?: string
  role: string
  domain?: string
  summary: string
  durationLabel: string
}

export const experienceCopy: Record<ExperienceLocale, Record<number, ExperienceFields>> = {
  ar: {
    0: {
      title: 'طاها غشت',
      company: 'طاها غشت',
      role: 'مصمم منتج واستراتيجي',
      domain: 'السفر / الحجز',
      summary: 'تصميم واستراتيجية المنتج عبر موقع الحجز ونظام التصميم المشترك واللوحة الداخلية لشركة سفر.',
      durationLabel: '',
    },
    1: {
      title: 'ديجيكالا — الذهب الرقمي',
      company: 'ديجيكالا',
      product: 'الذهب الرقمي',
      role: 'مصمم / مسوّق / مطوّر ذكاء أعمال',
      domain: 'التقنية المالية',
      summary: 'تملّكتُ الذهب الرقمي من البداية إلى النهاية — الرؤية والتصميم والحملات والتقسيم ولوحات ذكاء الأعمال خلفها.',
      durationLabel: 'سنتان ونصف',
    },
    2: {
      title: 'Carsparency',
      company: 'Carsparency',
      role: 'مصمم منتج',
      domain: 'السيارات',
      summary:
        'صمّمتُ سوق السيارات الإنجليزية/الإماراتية عبر Pro وكنسول المشغّل وأداة الفحص وويب البائع، على نظام تصميم واحد.',
      durationLabel: 'سنة',
    },
    3: {
      title: 'هديش مول',
      company: 'هديش مول',
      role: 'تسويق',
      domain: 'التجزئة',
      summary: 'زدتُ إقبال الزوّار عبر الحملات وشراكات المؤثّرين، واقترحتُ تطبيقًا لإدارة المركز التجاري.',
      durationLabel: 'سنة',
    },
    4: {
      title: 'فيبونا',
      company: 'فيبونا',
      domain: 'استشارات الأعمال',
      role: 'مدير منتج',
      summary: 'واءمتُ أصحاب المصلحة حول هوية علامة وشعار وموقع جديد من الصفر.',
      durationLabel: 'سنتان',
    },
    5: {
      title: 'أوتيتشر',
      company: 'أوتيتشر',
      role: 'مدير منتج ومصمم',
      domain: 'تقنيات التعليم',
      summary: 'حوّلتُ بحث المعلّمين والمتعلّمين إلى خارطة طريق مُتحقَّق منها لمطابقة المعلّم بالطالب.',
      durationLabel: 'سنة',
    },
    6: {
      title: 'أروان كلاود',
      company: 'أروان كلاود',
      role: 'مصمم منتج',
      domain: 'السحابة',
      summary: 'أعدتُ تصميم المنصّة حول مؤشّرات الخوادم التي احتاجها المستخدمون فعلًا، فارتفع مؤشّر NPS.',
      durationLabel: 'سنتان',
    },
    7: {
      title: 'بايوميز',
      company: 'بايوميز',
      role: 'مدير منتج ومصمم',
      domain: 'تقنيات التعليم',
      summary: 'بنيتُ الموقع ولوحة التعليم ونظام تصميم مكّن المطوّرين من الشحن بسرعة.',
      durationLabel: 'ثلاث سنوات',
    },
    8: {
      title: 'ديدستان',
      company: 'ديدستان',
      role: 'مصمم واجهات وتجربة',
      domain: 'الإعلام',
      summary: 'صمّمتُ نموذجًا أوّليًا لمنصّة فيديو قائمة على البيانات انطلاقًا من بحث تجربة مستخدم مُقتصد.',
      durationLabel: 'ثمانية أشهر',
    },
    9: {
      title: 'A1Paradise',
      company: 'A1Paradise',
      role: 'مصمم واجهات وتجربة',
      domain: 'الاتصالات / الألعاب',
      summary: 'صمّمتُ ألعابًا مصغّرة مُلعَّبة وتطبيق اتصال لسطح المكتب وللمستهلك.',
      durationLabel: 'سنة وشهران',
    },
    10: {
      title: 'مستقل — RP1 / المنتج والاستراتيجية',
      company: 'مستقل',
      product: 'RP1',
      role: 'مصمم منتج واستراتيجي',
      summary: 'تحديد نطاق وتصميم ساحة Play-to-Earn متعدّدة الألعاب، بقرارات منتج وأعمال تُتّخذ معًا.',
      durationLabel: 'مستمر',
    },
    11: {
      title: 'Khodro45',
      company: 'Khodro45',
      role: 'مصمم منتج',
      domain: 'السيارات',
      summary:
        'صمّمتُ تطبيق التجّار الفارسي RTL لسوق إيران — مزاد موقّت وسعر عادل وتدفّقات الضمان.',
      durationLabel: 'سنة ونصف',
    },
  },

  es: {
    0: {
      title: 'Taha Gasht',
      company: 'Taha Gasht',
      role: 'Diseñador de producto y estratega',
      domain: 'Viajes / reservas',
      summary: 'Diseño y estrategia de producto para el sitio de reservas, el sistema de diseño compartido y el panel interno de una empresa de viajes.',
      durationLabel: '',
    },
    1: {
      title: 'Digikala — Digital Gold',
      company: 'Digikala',
      product: 'Digital Gold',
      role: 'Diseñador / Marketer / Desarrollador BI',
      domain: 'Fintech',
      summary: 'Asumí Digital Gold de principio a fin: visión, diseño, campañas, segmentación y los paneles de BI que había detrás.',
      durationLabel: '2,5 años',
    },
    2: {
      title: 'Carsparency',
      company: 'Carsparency',
      role: 'Diseñador de producto',
      domain: 'Automoción',
      summary:
        'Diseñé el marketplace de coches en inglés/EAU en Pro, consola del operador, herramienta de inspección y web del vendedor, sobre un mismo sistema de diseño.',
      durationLabel: '1 año',
    },
    3: {
      title: 'Hadish Mall',
      company: 'Hadish Mall',
      role: 'Marketing',
      domain: 'Retail',
      summary: 'Aumenté la afluencia con campañas y acuerdos con influencers; propuse una app de gestión del centro comercial.',
      durationLabel: '1 año',
    },
    4: {
      title: 'Fibona',
      company: 'Fibona',
      domain: 'Consultoría de negocios',
      role: 'Product Manager',
      summary: 'Alineé a las partes interesadas en torno a una nueva identidad de marca, eslogan y web desde cero.',
      durationLabel: '2 años',
    },
    5: {
      title: 'OTeacher',
      company: 'OTeacher',
      role: 'Product Manager y diseñador',
      domain: 'Edtech',
      summary: 'Convertí la investigación con docentes y estudiantes en una hoja de ruta validada de emparejamiento profesor–alumno.',
      durationLabel: '1 año',
    },
    6: {
      title: 'Arvan Cloud',
      company: 'Arvan Cloud',
      role: 'Diseñador de producto',
      domain: 'Cloud',
      summary: 'Rediseñé la plataforma en torno a las métricas de servidor que los usuarios realmente necesitaban, subiendo el NPS.',
      durationLabel: '2 años',
    },
    7: {
      title: 'Biomaze',
      company: 'Biomaze',
      role: 'Product Manager y diseñador',
      domain: 'Edtech',
      summary: 'Construí la web, el panel de formación y un sistema de diseño que permitió a los desarrolladores lanzar rápido.',
      durationLabel: '3 años',
    },
    8: {
      title: 'Didestan',
      company: 'Didestan',
      role: 'Diseñador UI/UX',
      domain: 'Medios',
      summary: 'Diseñé el prototipo de una plataforma de vídeo basada en datos a partir de investigación lean UX.',
      durationLabel: '8 meses',
    },
    9: {
      title: 'A1Paradise',
      company: 'A1Paradise',
      role: 'Diseñador UI/UX',
      domain: 'Telecomunicaciones / videojuegos',
      summary: 'Diseñé microjuegos gamificados y una app de llamadas de escritorio y B2C.',
      durationLabel: '1,2 años',
    },
    10: {
      title: 'Independiente — RP1 / Producto y estrategia',
      company: 'Independiente',
      product: 'RP1',
      role: 'Diseñador de producto y estratega',
      summary: 'Acotando y diseñando una arena play-to-earn multijuego, con las decisiones de producto y de negocio tomadas a la vez.',
      durationLabel: 'En curso',
    },
    11: {
      title: 'Khodro45',
      company: 'Khodro45',
      role: 'Diseñador de producto',
      domain: 'Automoción',
      summary:
        'Diseñé la app de concesionarios en persa RTL para el marketplace de Irán: subasta temporizada, precio justo y flujos de custodia.',
      durationLabel: '1,5 años',
    },
  },

  de: {
    0: {
      title: 'Taha Gasht',
      company: 'Taha Gasht',
      role: 'Produktdesigner & Stratege',
      domain: 'Reisen / Buchung',
      summary: 'Produktdesign und -strategie für Buchungsseite, gemeinsames Designsystem und internes Panel eines Reiseunternehmens.',
      durationLabel: '',
    },
    1: {
      title: 'Digikala — Digital Gold',
      company: 'Digikala',
      product: 'Digital Gold',
      role: 'Designer / Marketer / BI-Entwickler',
      domain: 'Fintech',
      summary: 'Digital Gold Ende zu Ende verantwortet – Vision, Design, Kampagnen, Segmentierung und die BI-Dashboards dahinter.',
      durationLabel: '2,5 Jahre',
    },
    2: {
      title: 'Carsparency',
      company: 'Carsparency',
      role: 'Produktdesigner',
      domain: 'Automotive',
      summary:
        'Den englischsprachigen/VAE-Automarktplatz über Pro, Operator-Konsole, Prüfwerkzeug und Verkäufer-Website gestaltet — auf einem Designsystem.',
      durationLabel: '1 Jahr',
    },
    3: {
      title: 'Hadish Mall',
      company: 'Hadish Mall',
      role: 'Marketing',
      domain: 'Handel',
      summary: 'Besucherzahlen über Kampagnen und Influencer-Partnerschaften gesteigert; eine App zur Center-Verwaltung vorgeschlagen.',
      durationLabel: '1 Jahr',
    },
    4: {
      title: 'Fibona',
      company: 'Fibona',
      domain: 'Unternehmensberatung',
      role: 'Product Manager',
      summary: 'Stakeholder um eine neue Markenidentität, Tagline und Website von Grund auf ausgerichtet.',
      durationLabel: '2 Jahre',
    },
    5: {
      title: 'OTeacher',
      company: 'OTeacher',
      role: 'Product Manager & Designer',
      domain: 'Edtech',
      summary: 'Recherche mit Lehrenden und Lernenden in eine validierte Roadmap für Lehrer-Schüler-Matching übersetzt.',
      durationLabel: '1 Jahr',
    },
    6: {
      title: 'Arvan Cloud',
      company: 'Arvan Cloud',
      role: 'Produktdesigner',
      domain: 'Cloud',
      summary: 'Die Plattform um die Servermetriken herum neu gestaltet, die Nutzer wirklich brauchten – der NPS stieg.',
      durationLabel: '2 Jahre',
    },
    7: {
      title: 'Biomaze',
      company: 'Biomaze',
      role: 'Product Manager & Designer',
      domain: 'Edtech',
      summary: 'Website, Schulungspanel und ein Design-System gebaut, mit dem Entwickler schnell ausliefern konnten.',
      durationLabel: '3 Jahre',
    },
    8: {
      title: 'Didestan',
      company: 'Didestan',
      role: 'UI/UX-Designer',
      domain: 'Medien',
      summary: 'Aus schlanker UX-Recherche den Prototyp einer datengetriebenen Videoplattform gestaltet.',
      durationLabel: '8 Monate',
    },
    9: {
      title: 'A1Paradise',
      company: 'A1Paradise',
      role: 'UI/UX-Designer',
      domain: 'Telekommunikation / Gaming',
      summary: 'Gamifizierte Microgames und eine Desktop- und B2C-Calling-App gestaltet.',
      durationLabel: '1,2 Jahre',
    },
    10: {
      title: 'Unabhängig — RP1 / Produkt & Strategie',
      company: 'Unabhängig',
      product: 'RP1',
      role: 'Produktdesigner & Stratege',
      summary: 'Zuschnitt und Gestaltung einer Multi-Game-Play-to-Earn-Arena, Produkt- und Geschäftsentscheidungen gemeinsam getroffen.',
      durationLabel: 'Laufend',
    },
    11: {
      title: 'Khodro45',
      company: 'Khodro45',
      role: 'Produktdesigner',
      domain: 'Automotive',
      summary:
        'Die persische RTL-Händler-App für den iranischen Marktplatz gestaltet — zeitgesteuerte Auktion, Fair Price und Treuhand-Flows.',
      durationLabel: '1,5 Jahre',
    },
  },

  fr: {
    0: {
      title: 'Taha Gasht',
      company: 'Taha Gasht',
      role: 'Designer produit & stratège',
      domain: 'Voyage / réservation',
      summary: "Design et stratégie produit pour le site de réservation, le design system partagé et le panneau interne d'une entreprise de voyage.",
      durationLabel: '',
    },
    1: {
      title: 'Digikala — Digital Gold',
      company: 'Digikala',
      product: 'Digital Gold',
      role: 'Designer / Marketeur / Développeur BI',
      domain: 'Fintech',
      summary: 'J’ai porté Digital Gold de bout en bout — vision, design, campagnes, segmentation et les tableaux de bord BI derrière.',
      durationLabel: '2,5 ans',
    },
    2: {
      title: 'Carsparency',
      company: 'Carsparency',
      role: 'Designer produit',
      domain: 'Automobile',
      summary:
        'J’ai conçu la marketplace auto anglophone/Émirats sur Pro, console opérateur, outil d’inspection et web vendeur, sur un même design system.',
      durationLabel: '1 an',
    },
    3: {
      title: 'Hadish Mall',
      company: 'Hadish Mall',
      role: 'Marketing',
      domain: 'Commerce',
      summary: 'J’ai fait croître la fréquentation via des campagnes et des partenariats d’influence ; j’ai proposé une app de gestion du centre commercial.',
      durationLabel: '1 an',
    },
    4: {
      title: 'Fibona',
      company: 'Fibona',
      domain: 'Conseil aux entreprises',
      role: 'Product manager',
      summary: 'J’ai aligné les parties prenantes autour d’une nouvelle identité de marque, d’une accroche et d’un site, partis de zéro.',
      durationLabel: '2 ans',
    },
    5: {
      title: 'OTeacher',
      company: 'OTeacher',
      role: 'Product manager et designer',
      domain: 'Edtech',
      summary: 'J’ai transformé la recherche auprès des enseignants et des apprenants en une feuille de route validée d’appariement professeur–élève.',
      durationLabel: '1 an',
    },
    6: {
      title: 'Arvan Cloud',
      company: 'Arvan Cloud',
      role: 'Designer produit',
      domain: 'Cloud',
      summary: 'J’ai repensé la plateforme autour des métriques serveur dont les utilisateurs avaient réellement besoin, faisant monter le NPS.',
      durationLabel: '2 ans',
    },
    7: {
      title: 'Biomaze',
      company: 'Biomaze',
      role: 'Product manager et designer',
      domain: 'Edtech',
      summary: 'J’ai construit le site, le panneau de formation et un design system qui a permis aux développeurs de livrer vite.',
      durationLabel: '3 ans',
    },
    8: {
      title: 'Didestan',
      company: 'Didestan',
      role: 'Designer UI/UX',
      domain: 'Médias',
      summary: 'J’ai conçu le prototype d’une plateforme vidéo pilotée par les données, à partir d’une recherche lean UX.',
      durationLabel: '8 mois',
    },
    9: {
      title: 'A1Paradise',
      company: 'A1Paradise',
      role: 'Designer UI/UX',
      domain: 'Télécoms / jeu vidéo',
      summary: 'J’ai conçu des micro-jeux gamifiés et une app d’appels desktop et B2C.',
      durationLabel: '1,2 an',
    },
    10: {
      title: 'Indépendant — RP1 / Produit et stratégie',
      company: 'Indépendant',
      product: 'RP1',
      role: 'Designer produit et stratège',
      summary: 'Cadrage et conception d’une arène play-to-earn multi-jeux, décisions produit et business prises ensemble.',
      durationLabel: 'En cours',
    },
    11: {
      title: 'Khodro45',
      company: 'Khodro45',
      role: 'Designer produit',
      domain: 'Automobile',
      summary:
        'J’ai conçu l’app concessionnaires persane RTL pour le marketplace iranien — enchère minutée, prix équitable et flux d’escrow.',
      durationLabel: '1,5 an',
    },
  },

  ja: {
    0: {
      title: 'Taha Gasht',
      company: 'Taha Gasht',
      role: 'プロダクトデザイナー兼ストラテジスト',
      domain: '旅行 / 予約',
      summary: '旅行事業の予約サイト、共通デザインシステム、社内管理画面にわたるプロダクトデザインと戦略。',
      durationLabel: '',
    },
    1: {
      title: 'Digikala — Digital Gold',
      company: 'Digikala',
      product: 'Digital Gold',
      role: 'デザイナー／マーケター／BI開発',
      domain: 'フィンテック',
      summary: 'Digital Goldを最初から最後まで担当。ビジョン、デザイン、キャンペーン、セグメンテーション、そしてその裏にあるBIダッシュボードまで。',
      durationLabel: '2.5年',
    },
    2: {
      title: 'Carsparency',
      company: 'Carsparency',
      role: 'プロダクトデザイナー',
      domain: '自動車',
      summary:
        '英語圏／UAEの自動車マーケットプレイスを、Pro・オペレーターコンソール・点検ツール・出品者ウェブとして1つのデザインシステム上に設計。',
      durationLabel: '1年',
    },
    3: {
      title: 'Hadish Mall',
      company: 'Hadish Mall',
      role: 'マーケティング',
      domain: '小売',
      summary: 'キャンペーンとインフルエンサー連携で来場者を増やし、モール管理アプリを提案した。',
      durationLabel: '1年',
    },
    4: {
      title: 'Fibona',
      company: 'Fibona',
      domain: 'ビジネスコンサルティング',
      role: 'プロダクトマネージャー',
      summary: '新しいブランドアイデンティティ、タグライン、ウェブサイトをゼロから立ち上げ、関係者の合意を形成した。',
      durationLabel: '2年',
    },
    5: {
      title: 'OTeacher',
      company: 'OTeacher',
      role: 'プロダクトマネージャー／デザイナー',
      domain: 'エドテック',
      summary: '教える側と学ぶ側へのリサーチを、検証済みの教師・生徒マッチングのロードマップに落とし込んだ。',
      durationLabel: '1年',
    },
    6: {
      title: 'Arvan Cloud',
      company: 'Arvan Cloud',
      role: 'プロダクトデザイナー',
      domain: 'クラウド',
      summary: 'ユーザーが実際に必要としていたサーバー指標を軸にプラットフォームを再設計し、NPSを改善した。',
      durationLabel: '2年',
    },
    7: {
      title: 'Biomaze',
      company: 'Biomaze',
      role: 'プロダクトマネージャー／デザイナー',
      domain: 'エドテック',
      summary: '開発者が速くリリースできるよう、ウェブサイト、教育パネル、デザインシステムを構築した。',
      durationLabel: '3年',
    },
    8: {
      title: 'Didestan',
      company: 'Didestan',
      role: 'UI/UXデザイナー',
      domain: 'メディア',
      summary: 'リーンUXリサーチから、データドリブンな動画プラットフォームのプロトタイプを設計した。',
      durationLabel: '8か月',
    },
    9: {
      title: 'A1Paradise',
      company: 'A1Paradise',
      role: 'UI/UXデザイナー',
      domain: '通信／ゲーム',
      summary: 'ゲーミフィケーションを取り入れたミニゲームと、デスクトップおよびB2Cの通話アプリを設計した。',
      durationLabel: '1.2年',
    },
    10: {
      title: '独立 — RP1／プロダクトと戦略',
      company: '独立',
      product: 'RP1',
      role: 'プロダクトデザイナー／ストラテジスト',
      summary: 'マルチゲームのPlay-to-Earnアリーナのスコープ定義とデザイン。プロダクトと事業の判断を同時に行っている。',
      durationLabel: '進行中',
    },
    11: {
      title: 'Khodro45',
      company: 'Khodro45',
      role: 'プロダクトデザイナー',
      domain: '自動車',
      summary:
        'イラン向けマーケットプレイスのペルシア語RTLディーラーアプリを設計。時間制オークション、公正価格、エスクローフロー。',
      durationLabel: '1.5年',
    },
  },
}
