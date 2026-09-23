import type { Project } from '@/payload-types'
import { LOCALES, type Locale } from '@/utilities/locale'

import { projectCompanyCopy, projectRoleCopy, projectTextCopy } from '../project-copy'
import type { MediaSpec } from '../media'
import { paragraph, prose, type TextDirection } from './lexical'

export const K45_SLUG = 'khodro45-dealer-app'
export const K45_ASSETS = 'Docs/Experience/Carsparency-Khodro45/khodro45-dealer-app/assets'
export const K45_LOCALES = LOCALES

const DIRECTION: Record<Locale, TextDirection> = {
  en: 'ltr',
  fa: 'rtl',
  ar: 'rtl',
  es: 'ltr',
  de: 'ltr',
  fr: 'ltr',
  ja: 'ltr',
}

type L<T = string> = Record<Locale, T>
const L = <T = string>(value: L<T>): L<T> => value

const alt = (value: L): L => value

export const K45_MEDIA = {
  carListLive: {
    file: 'car-list/car-list-live.png',
    // Shared with projects.ts: both seeds must resolve to the same media document.
    name: 'khodro45-dealer-app--car-list-live.png',
    alt: alt({
      en: 'Khodro45 dealer app live auction list in Persian, with countdowns, current bids and a fair-price guide on each car card',
      fa: 'فهرست مزایدهٔ زندهٔ اپ نمایشگاه‌داران خودرو۴۵ با شمارش معکوس، پیشنهاد فعلی و راهنمای قیمت منصفانه روی هر کارت خودرو',
      ar: 'قائمة المزاد المباشر في تطبيق تجّار خودرو45، مع عدّ تنازلي والمزايدة الحالية ودليل السعر العادل على كل بطاقة سيارة',
      es: 'Lista de subastas Live de Khodro45, con cuenta atrás, puja actual y guía de precio justo en cada coche',
      de: 'Live-Auktionsliste der Khodro45-Händler-App mit Countdown, aktuellem Gebot und Fair-Price-Hinweis je Fahrzeug',
      fr: 'Liste des enchères Live de Khodro45, avec compte à rebours, enchère actuelle et guide de prix juste sur chaque voiture',
      ja: 'Khodro45ディーラーアプリのライブオークション一覧。各車両カードに残り時間、現在の入札、適正価格ガイドを表示',
    }),
  },
  carDetailLive: {
    file: 'car-detail/car-detail-live.png',
    name: 'khodro45-dealer-app--car-detail-live.png',
    alt: alt({
      en: 'Khodro45 live-auction car detail with vehicle facts, fair-price comparisons and the structured inspection report',
      fa: 'جزئیات خودروی مزایدهٔ زندهٔ خودرو۴۵ با مشخصات خودرو، مقایسهٔ قیمت منصفانه و گزارش ساختاریافتهٔ کارشناسی',
      ar: 'تفاصيل سيارة في مزاد خودرو45 المباشر مع بيانات المركبة ومقارنات السعر العادل وتقرير الفحص المنظّم',
      es: 'Detalle de coche de una subasta Live de Khodro45 con datos, comparación de precio justo e informe de inspección',
      de: 'Fahrzeugdetail einer Khodro45-Live-Auktion mit Daten, Fair-Price-Vergleich und strukturiertem Prüfbericht',
      fr: 'Fiche voiture d’une enchère Live Khodro45 avec données, comparaison du prix juste et rapport d’inspection structuré',
      ja: 'Khodro45ライブオークションの車両詳細。車両情報、適正価格比較、構造化された点検レポートを表示',
    }),
  },
  bidSheet: {
    file: 'bid/bid-sheet.png',
    name: 'khodro45-dealer-app--bid-sheet.png',
    alt: alt({
      en: 'Khodro45 bid sheet showing the fair-price anchor beside the dealer bid amount',
      fa: 'برگهٔ ثبت پیشنهاد خودرو۴۵ که قیمت منصفانه را کنار مبلغ پیشنهادی نمایشگاه‌دار نشان می‌دهد',
      ar: 'ورقة المزايدة في خودرو45 تعرض مرجع السعر العادل بجانب مبلغ عرض التاجر',
      es: 'Hoja de puja de Khodro45 con el precio justo junto al importe ofrecido por el concesionario',
      de: 'Khodro45-Gebotsblatt mit Fair-Price-Anker neben dem Händlergebot',
      fr: 'Feuille d’enchère Khodro45 montrant le prix juste à côté du montant proposé par le concessionnaire',
      ja: 'Khodro45の入札シート。ディーラーの入札額の横に適正価格の基準を表示',
    }),
  },
  ordersNotSettled: {
    file: 'orders/orders-not-settled.png',
    name: 'khodro45-dealer-app--orders-not-settled.png',
    alt: alt({
      en: 'Khodro45 unsettled orders list with the numbered six-step escrow settlement status',
      fa: 'فهرست سفارش‌های تسویه‌نشدهٔ خودرو۴۵ با وضعیت شماره‌گذاری‌شدهٔ تسویهٔ امانی شش‌مرحله‌ای',
      ar: 'قائمة الطلبات غير المسوّاة في خودرو45 مع حالة التسوية المضمونة المرقّمة من ست خطوات',
      es: 'Pedidos pendientes de Khodro45 con el estado numerado de la liquidación en depósito de seis pasos',
      de: 'Nicht abgewickelte Khodro45-Bestellungen mit nummeriertem sechsstufigem Treuhandstatus',
      fr: 'Commandes non réglées de Khodro45 avec l’état numéroté du séquestre en six étapes',
      ja: 'Khodro45の未決済注文一覧。6段階のエスクロー決済状況を番号付きで表示',
    }),
  },
  orderDetails: {
    file: 'orders/order-details.png',
    name: 'khodro45-dealer-app--order-details.png',
    alt: alt({
      en: 'Khodro45 order detail showing staged payments, documents and the current transaction status',
      fa: 'جزئیات سفارش خودرو۴۵ با پرداخت‌های مرحله‌ای، مدارک و وضعیت فعلی معامله',
      ar: 'تفاصيل طلب خودرو45 تعرض الدفعات المرحلية والمستندات وحالة الصفقة الحالية',
      es: 'Detalle de pedido de Khodro45 con pagos por etapas, documentos y estado actual de la transacción',
      de: 'Khodro45-Bestelldetail mit gestaffelten Zahlungen, Dokumenten und aktuellem Transaktionsstatus',
      fr: 'Détail d’une commande Khodro45 avec paiements échelonnés, documents et état actuel de la transaction',
      ja: 'Khodro45の注文詳細。段階的な支払い、書類、現在の取引状況を表示',
    }),
  },
  loyaltyLadder: {
    file: 'membership/loyalty-ladder.png',
    name: 'khodro45-dealer-app--loyalty-ladder.png',
    alt: alt({
      en: 'Khodro45 Customer Club loyalty ladder with the current tier, turnover progress and next-tier rewards',
      fa: 'نردبان وفاداری باشگاه مشتریان خودرو۴۵ با سطح فعلی، پیشرفت گردش معامله و پاداش‌های سطح بعد',
      ar: 'سُلّم ولاء نادي عملاء خودرو45 مع المستوى الحالي وتقدّم حجم التداول ومكافآت المستوى التالي',
      es: 'Escalera de fidelidad del Club de Clientes de Khodro45 con nivel actual, progreso y recompensas siguientes',
      de: 'Khodro45-Treueleiter mit aktueller Stufe, Umsatzfortschritt und Belohnungen der nächsten Stufe',
      fr: 'Échelle de fidélité du Club Client Khodro45 avec niveau actuel, progression du volume et récompenses suivantes',
      ja: 'Khodro45顧客クラブのロイヤルティ段階。現在のランク、取引高の進捗、次ランクの特典を表示',
    }),
  },
  subscriptionTiers: {
    file: 'membership/subscription-tiers.png',
    name: 'khodro45-dealer-app--subscription-tiers.png',
    alt: alt({
      en: 'Khodro45 paid membership screen with five annual subscription tiers and auction-volume limits',
      fa: 'صفحهٔ عضویت پولی خودرو۴۵ با پنج سطح اشتراک سالانه و سقف حجم شرکت در مزایده',
      ar: 'شاشة العضوية المدفوعة في خودرو45 مع خمس فئات اشتراك سنوية وحدود لحجم المشاركة في المزاد',
      es: 'Membresía de pago de Khodro45 con cinco niveles anuales y límites de volumen en subastas',
      de: 'Bezahlte Khodro45-Mitgliedschaft mit fünf Jahresstufen und Grenzen für das Auktionsvolumen',
      fr: 'Adhésion payante Khodro45 avec cinq niveaux annuels et plafonds de volume d’enchères',
      ja: 'Khodro45の有料会員画面。5つの年間プランとオークション参加額の上限を表示',
    }),
  },
  designPlayground: {
    file: 'prototype/design-playground.png',
    name: 'khodro45-dealer-app--design-playground.png',
    alt: alt({
      en: 'Khodro45 Design Playground prototype hub for choosing a test path and switching between dark and light themes',
      fa: 'هاب پروتوتایپ Design Playground خودرو۴۵ برای انتخاب مسیر آزمون و جابه‌جایی میان تم روشن و تاریک',
      ar: 'مركز نموذج Design Playground في خودرو45 لاختيار مسار الاختبار والتبديل بين النمطين الفاتح والداكن',
      es: 'Hub del prototipo Design Playground de Khodro45 para elegir recorrido y cambiar entre tema claro y oscuro',
      de: 'Khodro45 Design Playground als Prototyp-Hub für Testpfade und den Wechsel zwischen hellem und dunklem Theme',
      fr: 'Hub du prototype Design Playground de Khodro45 pour choisir un parcours et basculer entre thèmes clair et sombre',
      ja: 'Khodro45のDesign Playgroundプロトタイプ。テスト経路を選び、ライトとダークのテーマを切り替える入口',
    }),
  },
  wallet: {
    file: 'wallet/wallet.png',
    name: 'khodro45-dealer-app--wallet.png',
    alt: alt({
      en: 'Khodro45 dealer wallet screen for balances and marketplace money movements',
      fa: 'صفحهٔ کیف پول نمایشگاه‌دار خودرو۴۵ برای موجودی‌ها و جابه‌جایی‌های مالی بازار',
      ar: 'شاشة محفظة تاجر خودرو45 للأرصدة وحركات الأموال في السوق',
      es: 'Cartera del concesionario Khodro45 para saldos y movimientos de dinero del marketplace',
      de: 'Khodro45-Händlerwallet für Guthaben und Geldbewegungen im Marktplatz',
      fr: 'Portefeuille du concessionnaire Khodro45 pour les soldes et mouvements d’argent de la marketplace',
      ja: 'Khodro45ディーラーのウォレット画面。残高とマーケット内の資金移動を表示',
    }),
  },
  registerLogin: {
    file: 'auth/register-login.png',
    name: 'khodro45-dealer-app--register-login.png',
    alt: alt({
      en: 'Khodro45 registration and login flow for dealership owners, brokers and car-sector investors',
      fa: 'جریان ثبت‌نام و ورود خودرو۴۵ برای نمایشگاه‌داران، واسطه‌گران و سرمایه‌گذاران حوزهٔ خودرو',
      ar: 'مسار التسجيل والدخول في خودرو45 لأصحاب المعارض والوسطاء والمستثمرين في قطاع السيارات',
      es: 'Registro e inicio de sesión de Khodro45 para concesionarios, intermediarios e inversores del automóvil',
      de: 'Khodro45-Registrierung für Autohausbesitzer, Vermittler und Investoren im Fahrzeugsektor',
      fr: 'Inscription et connexion Khodro45 pour concessionnaires, intermédiaires et investisseurs automobiles',
      ja: 'Khodro45の登録・ログイン。販売店オーナー、仲介業者、自動車分野の投資家向け',
    }),
  },
  onboarding: {
    file: 'onboarding/onboarding.png',
    name: 'khodro45-dealer-app--onboarding.png',
    alt: alt({
      en: 'Khodro45 dealer app onboarding screens shown in parallel light and dark themes',
      fa: 'صفحه‌های آشنایی اپ نمایشگاه‌داران خودرو۴۵ در تم‌های روشن و تاریکِ موازی',
      ar: 'شاشات تقديم تطبيق تجّار خودرو45 في نمطين متوازيين فاتح وداكن',
      es: 'Pantallas de onboarding de Khodro45 en temas claro y oscuro en paralelo',
      de: 'Onboarding der Khodro45-Händler-App parallel im hellen und dunklen Theme',
      fr: 'Écrans d’onboarding de Khodro45 déclinés en parallèle en thèmes clair et sombre',
      ja: 'Khodro45ディーラーアプリのオンボーディング画面。ライトとダークの両テーマを並行表示',
    }),
  },
  filter: {
    file: 'filter-sort/filter.png',
    name: 'khodro45-dealer-app--filter.png',
    alt: alt({
      en: 'Khodro45 car-list filter sheet for narrowing the dealer marketplace inventory',
      fa: 'برگهٔ فیلتر فهرست خودرو۴۵ برای محدودکردن موجودی بازار نمایشگاه‌داران',
      ar: 'ورقة تصفية قائمة سيارات خودرو45 لتضييق مخزون سوق التجّار',
      es: 'Hoja de filtros de Khodro45 para acotar el inventario del mercado de concesionarios',
      de: 'Khodro45-Filterblatt zum Eingrenzen des Händlerbestands',
      fr: 'Feuille de filtres Khodro45 pour affiner l’inventaire du marché des concessionnaires',
      ja: 'Khodro45の車両一覧フィルター。ディーラー市場の在庫を絞り込む画面',
    }),
  },
  superAppDark: {
    file: 'super-app/super-app-dark.png',
    name: 'khodro45-dealer-app--super-app-dark.png',
    alt: alt({
      en: 'Khodro45 dark-theme super-app hub linking vehicle buying to ownership services',
      fa: 'هاب سوپراپ خودرو۴۵ در تم تاریک که خرید خودرو را به خدمات چرخهٔ مالکیت پیوند می‌دهد',
      ar: 'مركز التطبيق الشامل خودرو45 بالنمط الداكن، يربط شراء السيارة بخدمات دورة الملكية',
      es: 'Hub super-app oscuro de Khodro45 que conecta la compra con servicios de propiedad del vehículo',
      de: 'Dunkler Khodro45-Super-App-Hub, der Fahrzeugkauf und Besitzdienste verbindet',
      fr: 'Hub super-app sombre de Khodro45 reliant l’achat aux services liés à la possession du véhicule',
      ja: 'Khodro45のダークテーマのスーパーアプリ。車の購入と所有関連サービスをつなぐハブ',
    }),
  },
  addCarForm: {
    file: 'add-car/add-car-form.png',
    name: 'khodro45-dealer-app--add-car-form.png',
    alt: alt({
      en: 'Khodro45 stepped add-a-car form covering vehicle facts, ownership documents, photos and entry to inspection',
      fa: 'فرم مرحله‌ای افزودن خودرو در خودرو۴۵ شامل مشخصات، مدارک مالکیت، عکس‌ها و ورود به کارشناسی',
      ar: 'نموذج إضافة سيارة المتدرّج في خودرو45، ويغطي البيانات ووثائق الملكية والصور والدخول إلى الفحص',
      es: 'Formulario por pasos para añadir un coche en Khodro45: datos, propiedad, fotos y entrada a inspección',
      de: 'Mehrstufiges Khodro45-Formular für Fahrzeugdaten, Eigentumsdokumente, Fotos und den Einstieg in die Prüfung',
      fr: 'Formulaire progressif Khodro45 couvrant données du véhicule, propriété, photos et entrée en inspection',
      ja: 'Khodro45の車両追加フォーム。車両情報、所有書類、写真、点検への移行を段階的に構成',
    }),
  },
  kycDocuments: {
    file: 'profile/kyc-documents.png',
    name: 'khodro45-dealer-app--kyc-documents.png',
    alt: alt({
      en: 'Khodro45 dealer profile screen for uploading identity and KYC documents',
      fa: 'صفحهٔ پروفایل نمایشگاه‌دار خودرو۴۵ برای بارگذاری مدارک هویتی و احراز هویت',
      ar: 'شاشة ملف تاجر خودرو45 لرفع وثائق الهوية والتحقّق من العميل',
      es: 'Perfil de concesionario Khodro45 para subir documentos de identidad y KYC',
      de: 'Khodro45-Händlerprofil zum Hochladen von Identitäts- und KYC-Dokumenten',
      fr: 'Profil concessionnaire Khodro45 pour téléverser les pièces d’identité et documents KYC',
      ja: 'Khodro45のディーラープロフィール。本人確認とKYC書類をアップロードする画面',
    }),
  },
} satisfies Record<string, MediaSpec>

export type K45MediaKey = keyof typeof K45_MEDIA
type K45MediaIds = Partial<Record<K45MediaKey, string>>
type Sections = NonNullable<Project['sections']>

interface Copy {
  statement: string
  industry: string
  team: string
  heroCaption: string
  snapshot: { problem: string; role: string; result: string }
  headings: [string, string, string, string]
  bodies: [string, string, string, string]
  finding: string
  processHeading: string
  process: [string, string, string, string, string]
  processNotes: [string, string, string, string, string]
  decisions: [string, string, string]
  decisionWhy: [string, string, string]
  captions: [string, string, string, string, string]
  outcomesIntro: string
  outcomes: [string, string, string]
  outcomeContext: [string, string, string]
  lessons: [string, string, string]
  lessonBodies: [string, string, string]
}

const COPY: Record<Locale, Copy> = {
  en: {
    statement:
      'A timed dealer auction anchored by fair prices, inspection evidence and a six-step escrow settlement.',
    industry: 'Automotive · B2B marketplace',
    team: 'Product design with product and development teams',
    heroCaption:
      'The live market, the inspection-rich car detail and the bid sheet — the core dealer buying loop.',
    snapshot: {
      problem:
        'Dealers had to price, inspect and pay for used cars in a market shaped by opaque pricing and personal trust.',
      role: 'Product design across information architecture, bidding, settlement, monetisation, RTL UI and prototypes.',
      result:
        'A shipped v3.1 rebuild documented in 241 screens, 43 sections and a dedicated transaction-state prototype.',
    },
    headings: [
      'The trade side of an Iranian used-car marketplace',
      'Three trust failures shaped the product',
      'One transaction model, three market modes',
      'The business model changed from access to activity',
    ],
    bodies: [
      'Khodro45 is an online car marketplace operated by Marikh Car Pars Asia. Its dealer app serves dealership owners, brokers and car-sector investors—the trade side buying cars sourced from private sellers.',
      'A dealer could not easily know a car’s worth, verify its condition without seeing it, or trust the other party with money during title transfer. Divar, Bama and Sheypoor listed cars, but did not price, clear or carry the transaction.',
      'Live, Market and Bazaar each received their own list and detail sections. The car detail combined the fair-price comparison with the structured inspection report; the order flow carried the deal through six escrow stages.',
      'The file preserves two generations of dealer monetisation: five paid subscription tiers that capped auction volume, followed by a Customer Club loyalty ladder that rewarded turnover with credit and services.',
    ],
    finding:
      'The fair-price anchor appeared beside the bid and against Khodro45, Divar, Bama and Sheypoor prices—transparency built into the decision point.',
    processHeading: 'A rebuild tested as flows and states',
    process: ['Map', 'Structure', 'Prototype', 'Stress-test', 'Ship'],
    processNotes: [
      'Mapped 241 screens across 43 Figma sections.',
      'Separated Live, Market and Bazaar into dedicated lists and details.',
      'Built the Design Playground with path and theme selection.',
      'Used a 28-frame prototype to test transaction statuses.',
      'Carried the working app into its v3.1 rebuild.',
    ],
    decisions: [
      'Put fair price beside every bid',
      'Embed inspection inside car detail',
      'Model settlement as six visible stages',
    ],
    decisionWhy: [
      'Dealers needed a price anchor at the moment of commitment, not a separate reference page.',
      'Condition evidence belonged where the dealer valued the car, alongside title, mileage and options.',
      'Deposits, final settlement, delivery and plate transfer each needed an explicit, time-aware state.',
    ],
    captions: [
      'From Live list to inspected detail, bid sheet and filtering: the buying decision keeps price and condition together.',
      'The unsettled-order list and order detail expose the six-stage path; wallet and KYC support the money and identity around it.',
      'Two monetisation generations preserved in one file: paid access and the later turnover-based loyalty ladder.',
      'The Design Playground, onboarding, registration and super-app hub frame the transaction with entry, identity, themes and services.',
      'The add-a-car flow connects vehicle facts, ownership paperwork, photos and entry into inspection.',
    ],
    outcomesIntro:
      'The README records shipped software and delivered design artifacts, but no publishable performance metrics.',
    outcomes: [
      'A shipped v3.1 dealer app',
      'A 241-screen product specification',
      'A transaction-state prototype',
    ],
    outcomeContext: [
      'The splash screen identifies Dealer App v3.1 as a working product rebuild.',
      'Forty-three Figma sections cover market, detail, bidding, listing, orders, money, identity and entry.',
      'Twenty-eight frames focus on what a dealer sees at each point in a deal.',
    ],
    lessons: [
      'Competitor prices can be a trust mechanism',
      'Marketplace access fees work against liquidity',
      'A state machine deserves its own prototype',
    ],
    lessonBodies: [
      'Showing Divar, Bama and Sheypoor beside Khodro45 made the fair-price anchor read as evidence rather than a sales claim.',
      'The move from paid access to a turnover ladder changed the incentive from limiting participation to rewarding activity.',
      'Escrow countdowns, negotiation states and penalties made transaction status important enough to test as a system.',
    ],
  },
  fa: {
    statement:
      'مزایده‌ای زمان‌دار برای نمایشگاه‌داران، متکی بر قیمت منصفانه، شواهد کارشناسی و تسویهٔ امانی شش‌مرحله‌ای.',
    industry: 'خودرو · بازارگاه B2B',
    team: 'طراحی محصول در کنار تیم‌های محصول و توسعه',
    heroCaption:
      'بازار زنده، جزئیات خودرو با گزارش کارشناسی و برگهٔ پیشنهاد — حلقهٔ اصلی خرید نمایشگاه‌دار.',
    snapshot: {
      problem:
        'نمایشگاه‌داران باید در بازاری با قیمت‌گذاری مبهم و اعتماد شخصی، خودرو را قیمت‌گذاری، بررسی و تسویه می‌کردند.',
      role: 'طراحی محصول در معماری اطلاعات، پیشنهاد قیمت، تسویه، درآمدزایی، رابط راست‌به‌چپ و پروتوتایپ‌ها.',
      result:
        'بازسازی منتشرشدهٔ نسخهٔ ۳.۱ در ۲۴۱ صفحه، ۴۳ بخش و یک پروتوتایپ اختصاصی وضعیت معامله.',
    },
    headings: [
      'سمت تجاری یک بازار خودروی دست‌دوم ایرانی',
      'سه شکست اعتماد، شکل محصول را تعیین کرد',
      'یک مدل معامله، سه حالت بازار',
      'مدل کسب‌وکار از دسترسی به فعالیت تغییر کرد',
    ],
    bodies: [
      'خودرو۴۵ بازار آنلاین خودرو زیر نظر شرکت مریخ خودرو پارس آسیاست. اپ نمایشگاه‌داران برای صاحبان نمایشگاه، واسطه‌ها و سرمایه‌گذاران خودرو ساخته شد؛ سمت تجاری‌ای که خودروهای فروشندگان خصوصی را می‌خرد.',
      'نمایشگاه‌دار به‌سادگی ارزش خودرو را نمی‌دانست، بدون دیدن آن از وضعیتش مطمئن نمی‌شد و هنگام انتقال سند به طرف مقابل اعتماد نداشت. دیوار، باما و شیپور آگهی می‌دادند اما معامله را قیمت‌گذاری یا تسویه نمی‌کردند.',
      'Live، Market و Bazaar هرکدام فهرست و جزئیات مستقل گرفتند. جزئیات خودرو مقایسهٔ قیمت منصفانه را با گزارش کارشناسی ترکیب کرد و سفارش معامله را از شش مرحلهٔ امانی عبور داد.',
      'فایل دو نسل درآمدزایی را نگه داشته است: پنج اشتراک پولی با سقف حجم مزایده و سپس نردبان وفاداری باشگاه مشتریان که گردش معامله را با اعتبار و خدمات پاداش می‌دهد.',
    ],
    finding:
      'قیمت منصفانه کنار پیشنهاد و در مقایسه با قیمت خودرو۴۵، دیوار، باما و شیپور دیده می‌شد؛ شفافیت در نقطهٔ تصمیم.',
    processHeading: 'بازسازی‌ای که با جریان و وضعیت آزموده شد',
    process: ['نقشه‌برداری', 'ساختار', 'پروتوتایپ', 'آزمون فشار', 'انتشار'],
    processNotes: [
      'نقشه‌برداری ۲۴۱ صفحه در ۴۳ بخش فیگما.',
      'جداسازی Live، Market و Bazaar در فهرست و جزئیات.',
      'ساخت Design Playground با انتخاب مسیر و تم.',
      'آزمون وضعیت‌های معامله با پروتوتایپ ۲۸ فریمی.',
      'رساندن اپ در حال کار به بازسازی نسخهٔ ۳.۱.',
    ],
    decisions: [
      'قیمت منصفانه کنار هر پیشنهاد',
      'گزارش کارشناسی داخل جزئیات خودرو',
      'تسویه در شش مرحلهٔ آشکار',
    ],
    decisionWhy: [
      'نمایشگاه‌دار هنگام تعهد به لنگر قیمت نیاز داشت، نه در صفحه‌ای جدا.',
      'شواهد وضعیت باید کنار سند، کارکرد و آپشن‌ها در محل ارزش‌گذاری خودرو می‌بود.',
      'پیش‌پرداخت، تسویه، تحویل و فک پلاک هرکدام به وضعیت روشن و زمان‌دار نیاز داشتند.',
    ],
    captions: [
      'از فهرست Live تا جزئیات، پیشنهاد و فیلتر؛ قیمت و وضعیت در یک تصمیم کنار هم می‌مانند.',
      'سفارش‌های تسویه‌نشده و جزئیات، مسیر شش‌مرحله‌ای را نشان می‌دهند؛ کیف پول و احراز هویت از پول و هویت پشتیبانی می‌کنند.',
      'دو نسل درآمدزایی در یک فایل: دسترسی پولی و نردبان وفاداری مبتنی بر گردش معامله.',
      'Design Playground، آشنایی، ثبت‌نام و سوپراپ، ورود، هویت، تم و خدمات پیرامون معامله را می‌سازند.',
      'افزودن خودرو، مشخصات، مدارک مالکیت، عکس‌ها و ورود به کارشناسی را پیوند می‌دهد.',
    ],
    outcomesIntro:
      'README نرم‌افزار منتشرشده و خروجی‌های طراحی را ثبت می‌کند، اما معیار عملکرد قابل انتشار ندارد.',
    outcomes: [
      'اپ نمایشگاه‌داران نسخهٔ ۳.۱ منتشرشده',
      'مشخصات محصول ۲۴۱ صفحه‌ای',
      'پروتوتایپ وضعیت معامله',
    ],
    outcomeContext: [
      'صفحهٔ آغاز، Dealer App v3.1 را بازسازی یک محصول در حال کار معرفی می‌کند.',
      '۴۳ بخش فیگما بازار، جزئیات، پیشنهاد، فهرست‌کردن، سفارش، پول، هویت و ورود را پوشش می‌دهد.',
      '۲۸ فریم روی چیزی تمرکز دارد که نمایشگاه‌دار در هر نقطهٔ معامله می‌بیند.',
    ],
    lessons: [
      'قیمت رقبا می‌تواند سازوکار اعتماد باشد',
      'هزینهٔ ورود با نقدشوندگی بازار در تضاد است',
      'ماشین حالت پروتوتایپ خودش را می‌خواهد',
    ],
    lessonBodies: [
      'نمایش دیوار، باما و شیپور کنار خودرو۴۵ باعث شد قیمت منصفانه به‌جای ادعای فروش، شبیه مدرک خوانده شود.',
      'حرکت از دسترسی پولی به نردبان گردش معامله، انگیزه را از محدودکردن مشارکت به پاداش‌دادن فعالیت تغییر داد.',
      'شمارش معکوس، وضعیت‌های مذاکره و جریمه‌ها، وضعیت معامله را به سیستمی مستقل برای آزمون تبدیل کردند.',
    ],
  },
  ar: {
    statement: 'مزاد موقوت للتجّار يرتكز على السعر العادل ودليل الفحص وتسوية مضمونة من ست خطوات.',
    industry: 'السيارات · سوق B2B',
    team: 'تصميم المنتج مع فريقي المنتج والتطوير',
    heroCaption:
      'السوق المباشر وتفاصيل السيارة الغنية بالفحص وورقة المزايدة — حلقة الشراء الأساسية للتاجر.',
    snapshot: {
      problem:
        'كان على التجّار تسعير السيارات المستعملة وفحصها ودفع ثمنها في سوق تحكمه أسعار غامضة وثقة شخصية.',
      role: 'تصميم المنتج عبر هندسة المعلومات والمزايدة والتسوية وتحقيق الدخل وواجهة RTL والنماذج.',
      result:
        'إعادة بناء مشحونة للإصدار 3.1 موثّقة في 241 شاشة و43 قسمًا ونموذج مخصّص لحالات الصفقة.',
    },
    headings: [
      'الجانب التجاري من سوق إيراني للسيارات المستعملة',
      'ثلاث فجوات في الثقة شكّلت المنتج',
      'نموذج صفقة واحد وثلاثة أنماط سوق',
      'انتقل نموذج العمل من الوصول إلى النشاط',
    ],
    bodies: [
      'خودرو45 سوق سيارات عبر الإنترنت تديره شركة مريخ خودرو بارس آسيا. يخدم تطبيق التجّار أصحاب المعارض والوسطاء ومستثمري السيارات، أي جانب التجارة الذي يشتري سيارات البائعين الأفراد.',
      'لم يكن التاجر يعرف القيمة بسهولة أو يتحقق من الحالة دون رؤية السيارة أو يثق بالطرف الآخر أثناء نقل الملكية. كانت Divar وBama وSheypoor لوحات إعلانات لا تسعّر الصفقة ولا تسوّيها.',
      'حصلت Live وMarket وBazaar على قوائم وصفحات تفاصيل مستقلة. جمعت تفاصيل السيارة مقارنة السعر العادل وتقرير الفحص، وحمل الطلب الصفقة عبر ست مراحل مضمونة.',
      'يحفظ الملف جيلين من تحقيق الدخل: خمس فئات اشتراك مدفوعة تحدّ حجم المزاد، ثم سُلّم ولاء يكافئ حجم التداول بالائتمان والخدمات.',
    ],
    finding:
      'ظهر السعر العادل بجانب العرض ومقابل أسعار خودرو45 وDivar وBama وSheypoor؛ شفافية داخل لحظة القرار.',
    processHeading: 'إعادة بناء اختُبرت كتدفّقات وحالات',
    process: ['رسم الخريطة', 'الهيكلة', 'النموذج', 'اختبار الضغط', 'الشحن'],
    processNotes: [
      'رسم 241 شاشة عبر 43 قسمًا في Figma.',
      'فصل Live وMarket وBazaar إلى قوائم وتفاصيل.',
      'بناء Design Playground لاختيار المسار والنمط.',
      'اختبار حالات الصفقة بنموذج من 28 إطارًا.',
      'نقل التطبيق العامل إلى إعادة بناء الإصدار 3.1.',
    ],
    decisions: [
      'السعر العادل بجانب كل مزايدة',
      'الفحص داخل تفاصيل السيارة',
      'التسوية في ست مراحل ظاهرة',
    ],
    decisionWhy: [
      'احتاج التاجر مرجع السعر لحظة الالتزام، لا في صفحة منفصلة.',
      'وجب أن يكون دليل الحالة حيث يقيّم التاجر السيارة بجانب الملكية والمسافة والمزايا.',
      'احتاج العربون والتسوية والتسليم ونقل اللوحة إلى حالات واضحة مرتبطة بالوقت.',
    ],
    captions: [
      'من قائمة Live إلى التفاصيل والفحص والمزايدة والتصفية؛ يبقى السعر والحالة داخل قرار واحد.',
      'تعرض قائمة غير المسوّى والتفاصيل المسار السداسي؛ وتدعم المحفظة وKYC المال والهوية.',
      'جيلان للدخل في ملف واحد: الوصول المدفوع وسُلّم الولاء المبني على التداول.',
      'يؤطّر Design Playground والتقديم والتسجيل ومركز الخدمات الصفقة بالدخول والهوية والنمط والخدمات.',
      'يربط مسار إضافة السيارة البيانات ووثائق الملكية والصور والدخول إلى الفحص.',
    ],
    outcomesIntro:
      'يوثّق README برنامجًا مشحونًا ومخرجات تصميم، لكنه لا يقدّم مقاييس أداء قابلة للنشر.',
    outcomes: ['تطبيق تجّار مشحون بإصدار 3.1', 'مواصفات منتج من 241 شاشة', 'نموذج لحالات الصفقة'],
    outcomeContext: [
      'تعرّف شاشة البداية Dealer App v3.1 بوصفه إعادة بناء لمنتج عامل.',
      'تغطي 43 منطقة Figma السوق والتفاصيل والمزايدة والإدراج والطلبات والمال والهوية والدخول.',
      'يركز 28 إطارًا على ما يراه التاجر في كل نقطة من الصفقة.',
    ],
    lessons: [
      'أسعار المنافسين قد تكون آلية ثقة',
      'رسوم الدخول تعاكس سيولة السوق',
      'آلة الحالات تستحق نموذجًا مستقلًا',
    ],
    lessonBodies: [
      'جعل عرض Divar وBama وSheypoor بجانب خودرو45 السعر العادل يبدو دليلًا لا ادّعاء بيع.',
      'حوّل الانتقال من الوصول المدفوع إلى سُلّم التداول الحافز من تقييد المشاركة إلى مكافأة النشاط.',
      'جعل العدّ التنازلي وحالات التفاوض والعقوبات حالة الصفقة نظامًا يستحق الاختبار.',
    ],
  },
  es: {
    statement:
      'Una subasta para concesionarios guiada por precio justo, inspección y liquidación en depósito de seis pasos.',
    industry: 'Automoción · marketplace B2B',
    team: 'Diseño de producto con los equipos de producto y desarrollo',
    heroCaption: 'Mercado Live, ficha con inspección y hoja de puja: el ciclo principal de compra.',
    snapshot: {
      problem:
        'Los concesionarios debían valorar, revisar y pagar coches en un mercado de precios opacos y confianza personal.',
      role: 'Diseño de producto en arquitectura, pujas, liquidación, monetización, UI RTL y prototipos.',
      result:
        'Una reconstrucción v3.1 lanzada, documentada en 241 pantallas, 43 secciones y un prototipo de estados.',
    },
    headings: [
      'El lado profesional del coche usado iraní',
      'Tres fallos de confianza dieron forma al producto',
      'Una transacción y tres modos de mercado',
      'El negocio pasó del acceso a la actividad',
    ],
    bodies: [
      'Khodro45 es un marketplace operado por Marikh Car Pars Asia. La app sirve a concesionarios, intermediarios e inversores: el lado profesional que compra coches de vendedores privados.',
      'Era difícil saber el valor, verificar el estado sin ver el coche o confiar el dinero durante la transferencia. Divar, Bama y Sheypoor publicaban anuncios, pero no resolvían la transacción.',
      'Live, Market y Bazaar recibieron listas y detalles propios. La ficha unió precio justo e inspección, y el pedido llevó el trato por seis fases de depósito.',
      'El archivo conserva dos generaciones: cinco suscripciones que limitaban volumen y un Club de Clientes que premiaba la actividad con crédito y servicios.',
    ],
    finding:
      'El precio justo aparecía junto a la puja y frente a Khodro45, Divar, Bama y Sheypoor: transparencia en la decisión.',
    processHeading: 'Una reconstrucción probada como flujos y estados',
    process: ['Mapear', 'Estructurar', 'Prototipar', 'Probar', 'Lanzar'],
    processNotes: [
      'Mapear 241 pantallas en 43 secciones.',
      'Separar Live, Market y Bazaar.',
      'Crear Design Playground con ruta y tema.',
      'Probar estados en 28 frames.',
      'Llevar la app activa a v3.1.',
    ],
    decisions: [
      'Precio justo junto a cada puja',
      'Inspección dentro de la ficha',
      'Seis fases visibles de liquidación',
    ],
    decisionWhy: [
      'La referencia debía estar en el momento de compromiso.',
      'La evidencia debía convivir con los datos de valoración.',
      'Cada movimiento de dinero y entrega necesitaba un estado temporal claro.',
    ],
    captions: [
      'Lista, detalle, puja y filtro mantienen precio y estado juntos.',
      'Pedidos, detalle, cartera y KYC sostienen las seis fases.',
      'Acceso de pago frente a fidelidad por actividad.',
      'Prototipo, onboarding, registro y servicios enmarcan la transacción.',
      'Añadir coche conecta datos, documentos, fotos e inspección.',
    ],
    outcomesIntro:
      'El README registra software lanzado y entregables, pero no métricas de rendimiento publicables.',
    outcomes: [
      'App v3.1 lanzada',
      'Especificación de 241 pantallas',
      'Prototipo de estados de transacción',
    ],
    outcomeContext: [
      'La pantalla inicial identifica una app funcional reconstruida.',
      '43 secciones cubren todo el sistema.',
      '28 frames se centran en el estado del trato.',
    ],
    lessons: [
      'Los precios rivales pueden generar confianza',
      'Cobrar acceso perjudica la liquidez',
      'Una máquina de estados merece su prototipo',
    ],
    lessonBodies: [
      'La comparación convirtió el precio justo en evidencia.',
      'La fidelidad cambió el incentivo hacia la actividad.',
      'Relojes, negociación y penalizaciones exigían una prueba sistémica.',
    ],
  },
  de: {
    statement:
      'Eine Händlerauktion mit Fair Price, Prüfbericht und sechsstufiger Treuhandabwicklung.',
    industry: 'Automotive · B2B-Marktplatz',
    team: 'Produktdesign mit Produkt- und Entwicklungsteams',
    heroCaption:
      'Live-Markt, prüfungsreiches Fahrzeugdetail und Gebotsblatt: der zentrale Kaufkreislauf.',
    snapshot: {
      problem:
        'Händler mussten Fahrzeuge in einem Markt mit intransparenten Preisen und persönlichem Vertrauen bewerten und bezahlen.',
      role: 'Produktdesign für Architektur, Gebote, Abwicklung, Monetarisierung, RTL-UI und Prototypen.',
      result:
        'Ein ausgelieferter v3.1-Neubau mit 241 Screens, 43 Bereichen und eigenem Statusprototyp.',
    },
    headings: [
      'Die Handelsseite des iranischen Gebrauchtwagenmarkts',
      'Drei Vertrauenslücken formten das Produkt',
      'Eine Transaktion, drei Marktmodi',
      'Das Geschäftsmodell wechselte von Zugang zu Aktivität',
    ],
    bodies: [
      'Khodro45 ist ein von Marikh Car Pars Asia betriebener Automarktplatz. Die Händler-App richtet sich an Autohäuser, Vermittler und Investoren, die Fahrzeuge privater Verkäufer kaufen.',
      'Wert, Zustand und sichere Zahlung waren schwer zu beurteilen. Divar, Bama und Sheypoor waren Anzeigenmärkte, die Transaktionen weder bepreisten noch abwickelten.',
      'Live, Market und Bazaar erhielten eigene Listen und Details. Das Fahrzeugdetail verband Fair Price und Prüfbericht; die Bestellung führte durch sechs Treuhandstufen.',
      'Die Datei bewahrt fünf bezahlte Zugangsstufen und die spätere Treueleiter, die Handelsvolumen mit Kredit und Diensten belohnt.',
    ],
    finding:
      'Der Fair Price stand neben dem Gebot und im Vergleich zu Khodro45, Divar, Bama und Sheypoor: Transparenz am Entscheidungspunkt.',
    processHeading: 'Ein Neubau, getestet als Flows und Zustände',
    process: ['Kartieren', 'Strukturieren', 'Prototypen', 'Belasten', 'Ausliefern'],
    processNotes: [
      '241 Screens in 43 Bereichen kartiert.',
      'Live, Market und Bazaar getrennt.',
      'Design Playground mit Pfad und Theme gebaut.',
      'Status in 28 Frames getestet.',
      'Die laufende App als v3.1 neu aufgebaut.',
    ],
    decisions: [
      'Fair Price neben jedes Gebot',
      'Prüfung ins Fahrzeugdetail',
      'Abwicklung in sechs sichtbaren Stufen',
    ],
    decisionWhy: [
      'Der Preisanker musste beim Gebot sichtbar sein.',
      'Zustandsbelege gehörten zu den Bewertungsdaten.',
      'Jeder Geld- und Übergabeschritt brauchte einen klaren Zeitstatus.',
    ],
    captions: [
      'Liste, Detail, Gebot und Filter halten Preis und Zustand zusammen.',
      'Bestellungen, Detail, Wallet und KYC tragen die sechs Stufen.',
      'Bezahlter Zugang gegenüber umsatzbasierter Treue.',
      'Prototyp, Onboarding, Registrierung und Dienste rahmen die Transaktion.',
      'Fahrzeug hinzufügen verbindet Daten, Dokumente, Fotos und Prüfung.',
    ],
    outcomesIntro:
      'Das README belegt ausgelieferte Software und Designartefakte, aber keine publizierbaren Leistungskennzahlen.',
    outcomes: [
      'Ausgelieferte Händler-App v3.1',
      'Produktspezifikation mit 241 Screens',
      'Transaktionsstatus-Prototyp',
    ],
    outcomeContext: [
      'Der Splash-Screen nennt eine laufende v3.1-App.',
      '43 Bereiche decken das System ab.',
      '28 Frames behandeln ausschließlich Deal-Zustände.',
    ],
    lessons: [
      'Wettbewerberpreise können Vertrauen schaffen',
      'Zugangsgebühren schaden Liquidität',
      'Eine Zustandsmaschine braucht einen Prototyp',
    ],
    lessonBodies: [
      'Der Vergleich machte Fair Price zur Evidenz.',
      'Die Treueleiter belohnte Aktivität statt Zugang zu begrenzen.',
      'Countdowns, Verhandlung und Strafen mussten als System getestet werden.',
    ],
  },
  fr: {
    statement:
      'Une enchère concessionnaires guidée par le prix juste, l’inspection et un séquestre en six étapes.',
    industry: 'Automobile · marketplace B2B',
    team: 'Design produit avec les équipes produit et développement',
    heroCaption:
      'Marché Live, fiche riche en inspection et feuille d’enchère : la boucle d’achat principale.',
    snapshot: {
      problem:
        'Les concessionnaires devaient estimer, inspecter et payer dans un marché aux prix opaques fondé sur la confiance personnelle.',
      role: 'Design produit : architecture, enchères, règlement, monétisation, UI RTL et prototypes.',
      result:
        'Une refonte v3.1 livrée, documentée par 241 écrans, 43 sections et un prototype des états.',
    },
    headings: [
      'Le versant professionnel du marché iranien de l’occasion',
      'Trois failles de confiance ont structuré le produit',
      'Une transaction, trois modes de marché',
      'Le modèle est passé de l’accès à l’activité',
    ],
    bodies: [
      'Khodro45 est une marketplace opérée par Marikh Car Pars Asia. L’app sert concessionnaires, intermédiaires et investisseurs : le côté professionnel qui achète aux particuliers.',
      'Valeur, état et sécurité du paiement étaient difficiles à établir. Divar, Bama et Sheypoor publiaient des annonces sans tarifer ni régler la transaction.',
      'Live, Market et Bazaar ont reçu listes et fiches propres. La fiche réunit prix juste et inspection ; la commande porte le marché sur six étapes de séquestre.',
      'Le fichier conserve cinq abonnements payants puis le Club Client, qui récompense le volume par du crédit et des services.',
    ],
    finding:
      'Le prix juste apparaît près de l’offre et face à Khodro45, Divar, Bama et Sheypoor : la transparence au point de décision.',
    processHeading: 'Une refonte éprouvée par les parcours et les états',
    process: ['Cartographier', 'Structurer', 'Prototyper', 'Éprouver', 'Livrer'],
    processNotes: [
      'Cartographier 241 écrans en 43 sections.',
      'Séparer Live, Market et Bazaar.',
      'Créer Design Playground avec parcours et thème.',
      'Tester les états sur 28 frames.',
      'Porter l’app active vers v3.1.',
    ],
    decisions: [
      'Prix juste près de chaque offre',
      'Inspection dans la fiche',
      'Six étapes visibles de règlement',
    ],
    decisionWhy: [
      'Le repère devait être visible au moment de s’engager.',
      'La preuve d’état devait côtoyer les données de valeur.',
      'Chaque paiement et transfert exigeait un état temporel clair.',
    ],
    captions: [
      'Liste, fiche, enchère et filtre gardent prix et état ensemble.',
      'Commandes, détail, portefeuille et KYC soutiennent les six étapes.',
      'Accès payant face à fidélité par volume.',
      'Prototype, onboarding, inscription et services encadrent la transaction.',
      'L’ajout d’un véhicule relie données, documents, photos et inspection.',
    ],
    outcomesIntro:
      'Le README atteste le logiciel livré et les artefacts, mais aucune métrique de performance publiable.',
    outcomes: [
      'App concessionnaires v3.1 livrée',
      'Spécification de 241 écrans',
      'Prototype des états de transaction',
    ],
    outcomeContext: [
      'Le splash identifie une app active reconstruite.',
      '43 sections couvrent le système.',
      '28 frames se concentrent sur les états du marché.',
    ],
    lessons: [
      'Les prix concurrents peuvent créer la confiance',
      'Faire payer l’accès nuit à la liquidité',
      'Une machine à états mérite son prototype',
    ],
    lessonBodies: [
      'La comparaison transforme le prix juste en preuve.',
      'La fidélité récompense l’activité au lieu de limiter l’accès.',
      'Délais, négociations et pénalités exigeaient un test systémique.',
    ],
  },
  ja: {
    statement:
      '適正価格、点検情報、6段階のエスクロー決済を軸にした、ディーラー向け時限オークション。',
    industry: '自動車・B2Bマーケットプレイス',
    team: 'プロダクト・開発チームと進めたプロダクトデザイン',
    heroCaption: 'ライブ市場、点検情報を備えた車両詳細、入札シート——ディーラー購入の中心ループ。',
    snapshot: {
      problem:
        'ディーラーは、不透明な価格と個人的な信用に依存する市場で、中古車の値付け、確認、支払いを行う必要があった。',
      role: '情報設計、入札、決済、収益化、RTL UI、プロトタイプを含むプロダクトデザイン。',
      result:
        '241画面、43セクション、取引状態専用プロトタイプとして記録された、稼働中のv3.1再構築。',
    },
    headings: [
      'イラン中古車市場の業者向け側面',
      '3つの信頼の欠落がプロダクトを形づくった',
      'ひとつの取引モデル、3つの市場モード',
      'ビジネスモデルはアクセス課金から活動報酬へ',
    ],
    bodies: [
      'Khodro45はMarikh Car Pars Asiaが運営するオンライン自動車市場だ。ディーラーアプリは販売店、仲介業者、投資家が個人売り手の車を買う業者側を担う。',
      '価値、現車の状態、名義変更中の支払いの安全を判断しにくかった。Divar、Bama、Sheypoorは掲載板であり、価格判断や取引決済を担わなかった。',
      'Live、Market、Bazaarに個別の一覧と詳細を用意した。車両詳細は適正価格比較と点検レポートを統合し、注文は6段階のエスクローを進む。',
      'ファイルには、取引上限付きの5つの有料プランと、取引高に応じて与信やサービスを与える顧客クラブの2世代が残る。',
    ],
    finding:
      '適正価格を入札の横に置き、Khodro45、Divar、Bama、Sheypoorとも比較した——意思決定の場に透明性を組み込んだ。',
    processHeading: 'フローと状態として検証した再構築',
    process: ['把握', '構造化', '試作', '負荷検証', 'リリース'],
    processNotes: [
      '43セクション、241画面を整理。',
      'Live、Market、Bazaarを分離。',
      '経路とテーマを選ぶDesign Playgroundを構築。',
      '28フレームで取引状態を検証。',
      '稼働アプリをv3.1として再構築。',
    ],
    decisions: ['全入札の横に適正価格', '車両詳細に点検を統合', '決済を見える6段階に'],
    decisionWhy: [
      '価格基準は確定の瞬間に必要だった。',
      '状態の証拠は価値判断の情報と同居すべきだった。',
      '支払いと引き渡しの各段階に明確な時間状態が必要だった。',
    ],
    captions: [
      '一覧、詳細、入札、絞り込みで価格と状態を一体に保つ。',
      '未決済注文、詳細、ウォレット、KYCが6段階を支える。',
      '有料アクセスと取引高ベースのロイヤルティ。',
      'プロトタイプ、導入、登録、サービスが取引を囲む。',
      '車両追加が情報、書類、写真、点検をつなぐ。',
    ],
    outcomesIntro: 'READMEはリリース済みソフトウェアと成果物を示すが、公開可能な成果指標はない。',
    outcomes: [
      'リリース済みv3.1ディーラーアプリ',
      '241画面のプロダクト仕様',
      '取引状態プロトタイプ',
    ],
    outcomeContext: [
      '起動画面が稼働中アプリのv3.1を示す。',
      '43セクションが全システムを網羅する。',
      '28フレームが取引の各状態を扱う。',
    ],
    lessons: [
      '競合価格は信頼の仕組みになる',
      'アクセス課金は流動性を損なう',
      'ステートマシンには専用プロトタイプが必要',
    ],
    lessonBodies: [
      '比較により適正価格は宣伝ではなく証拠になった。',
      'ロイヤルティは参加制限から活動報酬へ動機を変えた。',
      '期限、交渉、罰則をひとつの状態システムとして検証した。',
    ],
  },
}

type ArchiveLocale = Exclude<Locale, 'en'>
const archiveIdentity = (locale: ArchiveLocale) => {
  const text = projectTextCopy[K45_SLUG]?.[locale]
  const company = projectCompanyCopy[locale]['Khodro45']
  const role = projectRoleCopy[locale]['Product designer']
  if (!text || !company || !role)
    throw new Error(`khodro45-dealer-app case study: no archive copy in ${locale}`)
  return { ...text, company, role }
}

export function k45Sections(locale: Locale, media: K45MediaIds): Sections {
  const c = COPY[locale]
  const dir = DIRECTION[locale]
  const body = (value: string) => prose(dir, paragraph(value, dir))
  const item = (key: K45MediaKey, id: string) => (media[key] ? [{ id, media: media[key]! }] : [])

  return [
    {
      id: 'k45-s01',
      blockType: 'csNarrative',
      label: 'context',
      heading: c.headings[0],
      body: body(c.bodies[0]),
    },
    {
      id: 'k45-s02',
      blockType: 'csNarrative',
      label: 'problem',
      heading: c.headings[1],
      body: body(c.bodies[1]),
    },
    {
      id: 'k45-s03',
      blockType: 'csFinding',
      kind: 'finding',
      text: c.finding,
      attribution: 'Khodro45 dealer app design file',
      method: 'Figma file audit documented in the project README',
    },
    {
      id: 'k45-s04',
      blockType: 'csProcess',
      kind: 'process',
      heading: c.processHeading,
      steps: c.process.map((label, index) => ({
        id: `k45-p0${index + 1}`,
        code: `0${index + 1}`,
        label,
        note: c.processNotes[index],
      })),
    },
    {
      id: 'k45-s05',
      blockType: 'csFigure',
      layout: 'sequence',
      treatment: 'screen',
      items: [
        ...item('carListLive', 'k45-f05-1'),
        ...item('carDetailLive', 'k45-f05-2'),
        ...item('bidSheet', 'k45-f05-3'),
        ...item('filter', 'k45-f05-4'),
      ],
      caption: c.captions[0],
    },
    {
      id: 'k45-s06',
      blockType: 'csNarrative',
      label: 'solution',
      heading: c.headings[2],
      body: body(c.bodies[2]),
    },
    {
      id: 'k45-s07',
      blockType: 'csDecisions',
      items: c.decisions.map((title, index) => ({
        id: `k45-d0${index + 1}`,
        title,
        why: c.decisionWhy[index],
        evidence: c.captions[index],
      })),
    },
    {
      id: 'k45-s08',
      blockType: 'csFigure',
      layout: 'sequence',
      treatment: 'screen',
      items: [
        ...item('ordersNotSettled', 'k45-f08-1'),
        ...item('orderDetails', 'k45-f08-2'),
        ...item('wallet', 'k45-f08-3'),
        ...item('kycDocuments', 'k45-f08-4'),
      ],
      caption: c.captions[1],
    },
    {
      id: 'k45-s09',
      blockType: 'csNarrative',
      label: 'approach',
      heading: c.headings[3],
      body: body(c.bodies[3]),
    },
    {
      id: 'k45-s10',
      blockType: 'csFigure',
      layout: 'compare',
      treatment: 'screen',
      items: [...item('subscriptionTiers', 'k45-f10-1'), ...item('loyaltyLadder', 'k45-f10-2')],
      caption: c.captions[2],
    },
    {
      id: 'k45-s11',
      blockType: 'csFigure',
      layout: 'sequence',
      treatment: 'screen',
      items: [
        ...item('designPlayground', 'k45-f11-1'),
        ...item('onboarding', 'k45-f11-2'),
        ...item('registerLogin', 'k45-f11-3'),
        ...item('superAppDark', 'k45-f11-4'),
      ],
      caption: c.captions[3],
    },
    {
      id: 'k45-s12',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'screen',
      items: item('addCarForm', 'k45-f12-1'),
      caption: c.captions[4],
    },
    {
      id: 'k45-s13',
      blockType: 'csOutcomes',
      intro: c.outcomesIntro,
      items: c.outcomes.map((label, index) => ({
        id: `k45-o0${index + 1}`,
        kind: 'delivered',
        label,
        context: c.outcomeContext[index],
        source: 'Khodro45 dealer app README and Figma file audit',
      })),
      shipped: c.outcomes,
    },
    {
      id: 'k45-s14',
      blockType: 'csLessons',
      items: c.lessons.map((title, index) => ({
        id: `k45-l0${index + 1}`,
        title,
        body: c.lessonBodies[index],
      })),
    },
  ]
}

export function k45LocalizedFields(locale: Locale, media: K45MediaIds) {
  const c = COPY[locale]
  const identity =
    locale === 'en'
      ? {
          title: 'Khodro45 dealer app — a timed auction market for Iranian car dealers',
          summary:
            'The B2B side of Iran’s Khodro45 marketplace: 241 screens across three parallel market modes, a fair-price-guided bidding system, a six-step escrowed settlement pipeline, two generations of dealer monetisation, and a 28-frame prototype built to test the transaction state machine.',
          company: 'Khodro45',
          role: 'Product designer',
        }
      : archiveIdentity(locale)

  return {
    ...identity,
    statement: c.statement,
    industry: c.industry,
    team: c.team,
    hero: {
      items: (['carListLive', 'carDetailLive', 'bidSheet'] as const)
        .filter((key) => media[key])
        .map((key, index) => ({ id: `k45-h0${index + 1}`, media: media[key]! })),
      caption: c.heroCaption,
    },
    snapshot: c.snapshot,
    sections: k45Sections(locale, media),
    meta: {
      title: identity.title,
      description: identity.summary,
      ...(media.carListLive ? { image: media.carListLive } : {}),
    },
  }
}

export const K45_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  projectStatus: 'shipped',
  tools: ['Figma'],
}
