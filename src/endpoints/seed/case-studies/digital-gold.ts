import type { Project } from '@/payload-types'
import { dirFor, LOCALES, type Locale } from '@/utilities/locale'

import type { MediaSpec } from '../media'
import {
  projectCompanyCopy,
  projectRoleCopy,
  projectTextCopy,
  type ProjectLocale,
} from '../project-copy'
import { PROJECT_SEED } from '../projects'
import { bullets, paragraph, prose } from './lexical'

/**
 * Digital Gold — the one umbrella Digikala case study (decided 2026-09-22): the zero-fee,
 * installment and gift-card campaigns, the segmentation model, the automation flows and the BI
 * dashboards are chapters inside it, not pages of their own. Every sentence traces to
 * `Docs/Experience/Digikala/digital-gold/README.md` or to the exported assets beside it.
 *
 * The first case study written in all seven locales (D-026): English is the source, the other six
 * are machine-drafted and flagged `translationReviewed: false`. Per-locale copy is a keyed
 * `Record<Locale, …>` rather than a positional helper — with seven arguments, a positional call
 * would silently swap `es` and `de` against RP1's argument order.
 *
 * Publication gates, all enforced in the copy below and in `case-study-seeds.int.spec.ts`:
 * - the business-review slide is a public company's internal P&L — achievement percentages only,
 *   never absolute figures, anywhere (alt text and meta included);
 * - brochure page 5 (personal phone numbers and an address) is never exported or referenced;
 * - the persona is a composite and is labelled as one; its card is published without the
 *   portrait (`persona-card.png` is cropped to the text panels — the photo's origin is unknown);
 * - installment purchase ran; gold-backed credit is only ever a proposed concept;
 * - Digikala's design system belonged to another team — the product design is claimed, not it.
 *
 * Non-localized block fields (`label`, `layout`, `treatment`, `kind`, process `code`, outcome
 * `value`, media ids) are identical Latin strings in every locale: they are shared across
 * locales, so the last locale written would win them for everyone.
 *
 * Row ids are deterministic (`dg-s01`, `dg-d01` …) and identical in every locale payload, so
 * Payload merges each locale's copy into the same block rows instead of creating new ones.
 */
export const DG_SLUG = 'digital-gold'
export const DG_ASSETS = 'Docs/Experience/Digikala/digital-gold/assets'
export const DG_LOCALES = LOCALES

type L<T = string> = Record<Locale, T>

// The archive row is the English source of truth for the fields the archive owns (title, summary,
// company, role, cover alt); `project-copy.ts` holds their six translations. Reading both here
// means the archive and the case study cannot disagree.
const ARCHIVE_ROW = PROJECT_SEED.find((row) => row.slug === DG_SLUG)
if (!ARCHIVE_ROW?.cover) throw new Error(`digital-gold case study: no archive row with a cover`)
const ARCHIVE = ARCHIVE_ROW

const archiveText = (locale: Locale) => {
  if (locale === 'en') {
    return { title: ARCHIVE.title, summary: ARCHIVE.summary, company: ARCHIVE.company, role: ARCHIVE.role }
  }
  const other = locale as ProjectLocale
  const text = projectTextCopy[DG_SLUG]?.[other]
  const company = projectCompanyCopy[other][ARCHIVE.company]
  const role = projectRoleCopy[other][ARCHIVE.role]
  if (!text || !company || !role) throw new Error(`digital-gold case study: no archive copy in ${locale}`)
  return { title: text.title, summary: text.summary, company, role }
}

// ── Media ──────────────────────────────────────────────────────────────────────────────────
// Filenames are the idempotency key, so every one is slug-prefixed. `cover` is the same name the
// archive row uploads, so the archive seed and this one converge on one media document.

export const DG_MEDIA = {
  cover: {
    file: 'order/digital-gold--order-mobile-cover.png',
    name: 'digital-gold--order-mobile-cover.png',
    alt: {
      en: ARCHIVE.cover!.alt,
      fa: 'صفحهٔ سفارش طلای دیجیتال دیجی‌کالا در موبایل: تب‌های طلا و نقره، نرخ لحظه‌ای هر میلی‌گرم، خرید یا فروش، و مبلغ به ریال یا مقدار به میلی‌گرم',
      ar: 'شاشة الطلب في الذهب الرقمي من ديجيكالا على الهاتف: تبويبا الذهب والفضة، والسعر اللحظي لكل مليغرام، والشراء أو البيع، والمبلغ بالريال أو الكمية بالمليغرام',
      es: 'Pantalla de pedido de Digital Gold de Digikala en el móvil: pestañas de oro y plata, el precio en vivo por miligramo, compra o venta, y un importe en riales o en miligramos',
      de: 'Bestellscreen von Digikala Digital Gold auf dem Smartphone: Tabs für Gold und Silber, der Live-Preis pro Milligramm, Kauf oder Verkauf und ein Betrag in Rial oder in Milligramm',
      fr: 'Écran de commande de Digital Gold de Digikala sur mobile : onglets or et argent, prix en direct au milligramme, achat ou vente, et un montant en rials ou en milligrammes',
      ja: 'DigikalaのDigital Gold注文画面（モバイル）：金と銀のタブ、1ミリグラムあたりのリアルタイム価格、購入／売却、リアルまたはミリグラムでの入力',
    },
  },
  heroOrder: {
    file: 'order/digital-gold--order-mobile.png',
    name: 'digital-gold--order-mobile.png',
    alt: {
      en: 'The order screen: the live price per milligram, buy or sell, an amount in rials or a quantity in milligrams, the order limits, and the wallet balance and buy fee above the Buy gold button',
      fa: 'صفحهٔ سفارش: نرخ لحظه‌ای هر میلی‌گرم، خرید یا فروش، مبلغ به ریال یا مقدار به میلی‌گرم، سقف و کف سفارش، و موجودی کیف پول و کارمزد خرید بالای دکمهٔ «خرید طلا»',
      ar: 'شاشة الطلب: السعر اللحظي لكل مليغرام، والشراء أو البيع، والمبلغ بالريال أو الكمية بالمليغرام، وحدود الطلب، ورصيد المحفظة ورسوم الشراء فوق زر «شراء الذهب»',
      es: 'La pantalla de pedido: el precio en vivo por miligramo, compra o venta, un importe en riales o una cantidad en miligramos, los límites del pedido, y el saldo del monedero y la comisión de compra encima del botón «Comprar oro»',
      de: 'Der Bestellscreen: der Live-Preis pro Milligramm, Kauf oder Verkauf, ein Betrag in Rial oder eine Menge in Milligramm, die Bestellgrenzen sowie Wallet-Guthaben und Kaufgebühr über dem Button „Gold kaufen“',
      fr: 'L’écran de commande : le prix en direct au milligramme, achat ou vente, un montant en rials ou une quantité en milligrammes, les limites de commande, puis le solde du portefeuille et les frais d’achat au-dessus du bouton « Acheter de l’or »',
      ja: '注文画面：1ミリグラムあたりのリアルタイム価格、購入／売却、リアルでの金額またはミリグラムでの数量、注文の上限と下限、そして「金を購入」ボタンの上にウォレット残高と購入手数料',
    },
  },
  heroHoldings: {
    file: 'holdings/digital-gold--my-assets-mobile.png',
    name: 'digital-gold--my-assets-mobile.png',
    alt: {
      en: 'My Assets: total holdings in toman, the gold and silver balances, a show-or-hide balance toggle, physical delivery, buy and sell summaries and recent transactions',
      fa: 'دارایی من: کل دارایی به تومان، موجودی طلا و نقره، کلید نمایش یا پنهان‌کردن موجودی، تحویل فیزیکی، خلاصهٔ خرید و فروش و تراکنش‌های اخیر',
      ar: 'أصولي: إجمالي الأصول بالتومان، ورصيدا الذهب والفضة، ومفتاح إظهار الرصيد أو إخفائه، والتسليم المادي، وملخّصا الشراء والبيع، والمعاملات الأخيرة',
      es: 'Mis activos: el total en tomanes, los saldos de oro y plata, un control para mostrar u ocultar el saldo, la entrega física, los resúmenes de compra y venta y las transacciones recientes',
      de: 'Meine Assets: Gesamtbestand in Toman, die Gold- und Silberbestände, ein Schalter zum Ein- und Ausblenden des Guthabens, physische Auslieferung, Kauf- und Verkaufsübersicht und die letzten Transaktionen',
      fr: 'Mes actifs : le total en tomans, les soldes or et argent, un bouton pour afficher ou masquer le solde, la livraison physique, les récapitulatifs d’achat et de vente et les transactions récentes',
      ja: 'マイアセット：トマン建ての総資産、金と銀の残高、残高の表示／非表示の切り替え、現物受け取り、購入・売却のサマリー、最近の取引',
    },
  },
  heroHistory: {
    file: 'profile/digital-gold--profile-mobile.png',
    name: 'digital-gold--profile-mobile.png',
    alt: {
      en: 'Buy and sell history: All, Sell and Buy tabs, status filters for successful, pending approval, paying out and failed orders, and each order with its fee, price at sale and order number',
      fa: 'تاریخچهٔ خرید و فروش: تب‌های همه، فروش و خرید، فیلترهای وضعیت برای سفارش‌های موفق، در انتظار تایید، در حال واریز و ناموفق، و هر سفارش با کارمزد، قیمت لحظهٔ فروش و شمارهٔ سفارش',
      ar: 'سجلّ الشراء والبيع: تبويبات الكل والبيع والشراء، ومرشّحات الحالة للطلبات الناجحة والمنتظرة للتأكيد وقيد الإيداع والفاشلة، وكل طلب برسومه وسعره لحظة البيع ورقمه',
      es: 'Historial de compras y ventas: pestañas Todo, Venta y Compra, filtros de estado para pedidos completados, pendientes de aprobación, en pago y fallidos, y cada pedido con su comisión, el precio en el momento de la venta y su número',
      de: 'Kauf- und Verkaufsverlauf: Tabs für Alle, Verkauf und Kauf, Statusfilter für erfolgreiche, auf Bestätigung wartende, in Auszahlung befindliche und fehlgeschlagene Bestellungen, und jede Bestellung mit Gebühr, Preis zum Verkaufszeitpunkt und Bestellnummer',
      fr: 'Historique des achats et ventes : onglets Tout, Vente et Achat, filtres de statut pour les commandes réussies, en attente de validation, en cours de versement et échouées, et chaque commande avec ses frais, le prix au moment de la vente et son numéro',
      ja: '売買履歴：「すべて」「売却」「購入」のタブ、成功・承認待ち・入金処理中・失敗のステータスフィルター、各注文の手数料・売却時の価格・注文番号',
    },
  },
  matrix: {
    file: 'order/digital-gold--transaction-matrix.png',
    name: 'digital-gold--transaction-matrix.png',
    alt: {
      en: 'Figma board “Final Transaction Gold”: an order’s success and failed states, each drawn at desktop and at mobile',
      fa: 'بورد فیگما «Final Transaction Gold»: حالت‌های موفق و ناموفق یک سفارش، هرکدام یک بار در دسکتاپ و یک بار در موبایل',
      ar: 'لوحة Figma «Final Transaction Gold»: حالتا النجاح والفشل لطلب ما، كلٌّ منهما مرسومة لسطح المكتب وللهاتف',
      es: 'Tablero de Figma «Final Transaction Gold»: los estados de éxito y de fallo de un pedido, cada uno dibujado en escritorio y en móvil',
      de: 'Figma-Board „Final Transaction Gold“: Erfolgs- und Fehlerzustand einer Bestellung, jeweils für Desktop und für Mobile gezeichnet',
      fr: 'Planche Figma « Final Transaction Gold » : les états de réussite et d’échec d’une commande, chacun dessiné pour le bureau et pour le mobile',
      ja: 'Figmaボード「Final Transaction Gold」：注文の成功と失敗の状態を、それぞれデスクトップとモバイルで描いたもの',
    },
  },
  balanceHidden: {
    file: 'holdings/digital-gold--balance-hidden.png',
    name: 'digital-gold--balance-hidden.png',
    alt: {
      en: 'The holdings card with the balance hidden: every value masked, the card’s layout unchanged',
      fa: 'کارت دارایی با موجودیِ پنهان: همهٔ مقدارها پوشانده شده و چیدمان کارت دست‌نخورده است',
      ar: 'بطاقة الأصول والرصيد مخفيّ: كل القيم محجوبة وتخطيط البطاقة كما هو',
      es: 'La tarjeta de activos con el saldo oculto: todos los valores enmascarados y la disposición de la tarjeta intacta',
      de: 'Die Bestandskarte mit ausgeblendetem Guthaben: alle Werte maskiert, das Layout der Karte unverändert',
      fr: 'La carte des avoirs avec le solde masqué : toutes les valeurs occultées, la mise en page de la carte inchangée',
      ja: '残高を非表示にした資産カード：すべての値が伏せられ、カードのレイアウトはそのまま',
    },
  },
  personaCard: {
    file: 'persona/digital-gold--persona-card.png',
    name: 'digital-gold--persona-card.png',
    alt: {
      en: 'Persona card for the silver extension, in Persian: her always-on line, about her, goals, concerns, motivations and behaviours',
      fa: 'کارت پرسونا برای توسعهٔ نقره: جملهٔ همیشگی، دربارهٔ او، اهداف، نگرانی‌ها، انگیزه‌ها و رفتارها',
      ar: 'بطاقة الشخصية لتوسعة الفضة، بالفارسية: عبارتها الدائمة، ونبذة عنها، وأهدافها، ومخاوفها، ودوافعها، وسلوكياتها',
      es: 'Ficha de persona para la extensión a la plata, en persa: su frase de siempre, quién es, objetivos, preocupaciones, motivaciones y comportamientos',
      de: 'Persona-Karte für die Silber-Erweiterung, auf Persisch: ihr Standardsatz, über sie, Ziele, Bedenken, Motivationen und Verhaltensweisen',
      fr: 'Fiche persona pour l’extension à l’argent, en persan : sa phrase fétiche, qui elle est, ses objectifs, ses inquiétudes, ses motivations et ses comportements',
      ja: '銀への拡張のためのペルソナカード（ペルシア語）：口癖、人物像、目標、懸念、動機、行動',
    },
  },
  slide1: {
    file: 'story/digital-gold--onboarding-slide-1.png',
    name: 'digital-gold--onboarding-slide-1.png',
    alt: {
      en: 'Onboarding slide 1: “Digikala digital gold — buy and sell digital gold online, with physical backing”, over the order widget',
      fa: 'اسلاید ۱ آشنایی: «طلای دیجیتال دیجی‌کالا — خرید و فروش طلای دیجیتال در بستر آنلاین با پشتوانهٔ فیزیکی» روی ویجت سفارش',
      ar: 'شريحة التعريف 1: «ذهب ديجيكالا الرقمي — شراء الذهب الرقمي وبيعه عبر الإنترنت بغطاء مادي» فوق أداة الطلب',
      es: 'Diapositiva 1 de bienvenida: «El oro digital de Digikala: compra y vende oro digital en línea, con respaldo físico», sobre el widget de pedido',
      de: 'Onboarding-Slide 1: „Digitales Gold von Digikala — digitales Gold online kaufen und verkaufen, physisch gedeckt“, über dem Bestell-Widget',
      fr: 'Diapositive d’accueil 1 : « L’or numérique de Digikala — acheter et vendre de l’or numérique en ligne, adossé à de l’or physique », au-dessus du module de commande',
      ja: 'オンボーディング1枚目：「Digikalaのデジタルゴールド——現物の裏付けのあるデジタルゴールドをオンラインで売買」と注文ウィジェット',
    },
  },
  slide2: {
    file: 'story/digital-gold--onboarding-slide-2.png',
    name: 'digital-gold--onboarding-slide-2.png',
    alt: {
      en: 'Slide 2: “Buy gold in any amount — from one milligram”',
      fa: 'اسلاید ۲: «خرید طلا به مقدار دلخواه — خرید از یک میلی‌گرم»',
      ar: 'الشريحة 2: «اشترِ الذهب بالكمية التي تريد — بدءًا من مليغرام واحد»',
      es: 'Diapositiva 2: «Compra oro en la cantidad que quieras, desde un miligramo»',
      de: 'Slide 2: „Gold in jeder Menge kaufen — ab einem Milligramm“',
      fr: 'Diapositive 2 : « Achetez de l’or en quantité libre — dès un milligramme »',
      ja: '2枚目：「好きな量だけ金を購入——1ミリグラムから」',
    },
  },
  slide3: {
    file: 'story/digital-gold--onboarding-slide-3.png',
    name: 'digital-gold--onboarding-slide-3.png',
    alt: {
      en: 'Slide 3: “Fast liquidity — from decision to sale in a few clicks”',
      fa: 'اسلاید ۳: «نقدشوندگی سریع — از تصمیم تا فروش فقط با چند کلیک»',
      ar: 'الشريحة 3: «سيولة سريعة — من القرار إلى البيع ببضع نقرات»',
      es: 'Diapositiva 3: «Liquidez rápida: de la decisión a la venta en unos clics»',
      de: 'Slide 3: „Schnelle Liquidität — von der Entscheidung zum Verkauf mit wenigen Klicks“',
      fr: 'Diapositive 3 : « Liquidité rapide — de la décision à la vente en quelques clics »',
      ja: '3枚目：「すばやく現金化——決めてから売るまで数クリック」',
    },
  },
  slide4: {
    file: 'story/digital-gold--onboarding-slide-4.png',
    name: 'digital-gold--onboarding-slide-4.png',
    alt: {
      en: 'Slide 4: “Physical gold backing — no storage worries; Digikala holds the equivalent of your gold”, with a Start buying gold button',
      fa: 'اسلاید ۴: «پشتوانهٔ طلای فیزیکی — بدون دغدغهٔ نگهداری، دیجی‌کالا معادل طلای شما را حفظ می‌کند» با دکمهٔ «شروع خرید طلا»',
      ar: 'الشريحة 4: «غطاء من الذهب المادي — بلا همّ التخزين، تحفظ ديجيكالا ما يعادل ذهبك»، مع زر «ابدأ شراء الذهب»',
      es: 'Diapositiva 4: «Respaldo en oro físico: sin preocuparte por guardarlo, Digikala custodia el equivalente de tu oro», con el botón «Empezar a comprar oro»',
      de: 'Slide 4: „Physisch gedecktes Gold — keine Sorge um die Aufbewahrung, Digikala verwahrt den Gegenwert Ihres Goldes“, mit dem Button „Gold kaufen starten“',
      fr: 'Diapositive 4 : « Adossé à de l’or physique — sans souci de stockage, Digikala conserve l’équivalent de votre or », avec le bouton « Commencer à acheter de l’or »',
      ja: '4枚目：「現物の金の裏付け——保管の心配なし、Digikalaがあなたの金に相当する量を保管」と「金の購入を始める」ボタン',
    },
  },
  zeroFee: {
    file: 'campaign/digital-gold--zero-fee-story.png',
    name: 'digital-gold--zero-fee-story.png',
    alt: {
      en: 'DigiPay story creative: “Digital gold, with installment purchase”, a zero-fee badge, and “Zero fee until the end of Friday, 3 Mordad”',
      fa: 'کریتیو استوری دیجی‌پی: «طلای دیجیتال همراه با امکان خرید قسطی»، نشان «کارمزد صفر» و «کارمزد صفر تا پایان روز جمعه ۳ مرداد»',
      ar: 'تصميم قصة من DigiPay: «الذهب الرقمي مع إمكانية الشراء بالتقسيط»، وشارة «بلا رسوم»، و«بلا رسوم حتى نهاية يوم الجمعة 3 مرداد»',
      es: 'Creatividad de story de DigiPay: «Oro digital, con compra a plazos», una insignia de comisión cero y «Comisión cero hasta el final del viernes 3 de mordad»',
      de: 'Story-Creative von DigiPay: „Digitales Gold, mit Ratenkauf“, ein Null-Gebühr-Badge und „Keine Gebühr bis Ende Freitag, 3. Mordad“',
      fr: 'Visuel story DigiPay : « L’or numérique, avec achat en plusieurs fois », un badge zéro frais et « Zéro frais jusqu’à la fin du vendredi 3 mordad »',
      ja: 'DigiPayのストーリー広告：「分割購入もできるデジタルゴールド」、手数料ゼロのバッジ、「モルダード月3日（金）終日まで手数料ゼロ」',
    },
  },
  brochure1: {
    file: 'b2b/digital-gold--welfare-brochure-01.png',
    name: 'digital-gold--welfare-brochure-01.png',
    alt: {
      en: 'Corporate-welfare brochure, page 1: “An integrated solution — corporate welfare services”, Digikala',
      fa: 'بروشور خدمات رفاهی سازمانی، صفحهٔ ۱: «راه‌حل یکپارچه — خدمات رفاهی سازمانی»، دیجی‌کالا',
      ar: 'كتيّب خدمات الرفاه المؤسسي، الصفحة 1: «حلّ متكامل — خدمات الرفاه المؤسسي»، ديجيكالا',
      es: 'Folleto de bienestar corporativo, página 1: «Una solución integral: servicios de bienestar para empresas», Digikala',
      de: 'Broschüre für betriebliche Sozialleistungen, Seite 1: „Eine integrierte Lösung — betriebliche Sozialleistungen“, Digikala',
      fr: 'Brochure avantages salariés, page 1 : « Une solution intégrée — services d’avantages aux salariés », Digikala',
      ja: '法人向け福利厚生パンフレット1ページ：「一体型ソリューション——法人向け福利厚生サービス」、Digikala',
    },
  },
  brochure2: {
    file: 'b2b/digital-gold--welfare-brochure-02.png',
    name: 'digital-gold--welfare-brochure-02.png',
    alt: {
      en: 'Page 2: four value propositions — easy and reliable, exceptional variety, exclusive discounts, time saved',
      fa: 'صفحهٔ ۲: چهار ارزش پیشنهادی — آسان و مطمئن، تنوع استثنایی، تخفیف اختصاصی، صرفه‌جویی در زمان',
      ar: 'الصفحة 2: أربع قيم مقترحة — سهل وموثوق، وتنوّع استثنائي، وخصم حصري، وتوفير للوقت',
      es: 'Página 2: cuatro propuestas de valor: fácil y fiable, variedad excepcional, descuentos exclusivos y ahorro de tiempo',
      de: 'Seite 2: vier Nutzenversprechen — einfach und verlässlich, außergewöhnliche Vielfalt, exklusive Rabatte, Zeitersparnis',
      fr: 'Page 2 : quatre propositions de valeur — simple et fiable, variété exceptionnelle, remises exclusives, gain de temps',
      ja: '2ページ：4つの価値提案——簡単で確実、圧倒的な品揃え、限定割引、時間の節約',
    },
  },
  brochure3: {
    file: 'b2b/digital-gold--welfare-brochure-03.png',
    name: 'digital-gold--welfare-brochure-03.png',
    alt: {
      en: 'Page 3: the sixteen partner brands behind the offer',
      fa: 'صفحهٔ ۳: شانزده برند همکار پشت این پیشنهاد',
      ar: 'الصفحة 3: العلامات الشريكة الست عشرة وراء العرض',
      es: 'Página 3: las dieciséis marcas asociadas detrás de la oferta',
      de: 'Seite 3: die sechzehn Partnermarken hinter dem Angebot',
      fr: 'Page 3 : les seize marques partenaires derrière l’offre',
      ja: '3ページ：このサービスを支える16のパートナーブランド',
    },
  },
  brochure4: {
    file: 'b2b/digital-gold--welfare-brochure-04.png',
    name: 'digital-gold--welfare-brochure-04.png',
    alt: {
      en: 'Page 4: the service lines — brand-basket credit, long- and short-term employee loans, bulk goods and Nowruz and Yalda packages',
      fa: 'صفحهٔ ۴: خطوط خدمت — سبد برندها، وام‌های بلندمدت و کوتاه‌مدت کارکنان، تامین عمدهٔ کالا و بسته‌های مناسبتی نوروز و یلدا',
      ar: 'الصفحة 4: خطوط الخدمة — رصيد لسلّة العلامات، وقروض طويلة وقصيرة الأجل للموظفين، وتوريد السلع بالجملة وباقات النوروز ويلدا',
      es: 'Página 4: las líneas de servicio: crédito para una cesta de marcas, préstamos a empleados a largo y corto plazo, y compras al por mayor con lotes de Nouruz y Yalda',
      de: 'Seite 4: die Leistungsbereiche — Guthaben für einen Markenkorb, lang- und kurzfristige Mitarbeiterdarlehen sowie Großeinkauf mit Paketen zu Nouruz und Yalda',
      fr: 'Page 4 : les offres — crédit sur un panier de marques, prêts aux salariés à long et court terme, achats en gros et coffrets de Norouz et de Yalda',
      ja: '4ページ：サービス内容——ブランドバスケットのクレジット、従業員向けの長期・短期ローン、商品の一括調達とノウルーズ・ヤルダーのギフトセット',
    },
  },
  review: {
    file: 'bi/digital-gold--business-review.png',
    name: 'digital-gold--business-review.png',
    alt: {
      en: 'Q1 snapshot from the Non-Inventory weekly business review, achievement only: NMV 97%, PC1 121%, PC2 130%, PC3 145%, PBT 91%',
      fa: 'نمای فصل اول از مرور هفتگی کسب‌وکار واحد Non-Inventory، فقط درصد تحقق: NMV ۹۷٪، PC1 ۱۲۱٪، PC2 ۱۳۰٪، PC3 ۱۴۵٪، PBT ۹۱٪',
      ar: 'لقطة الربع الأول من المراجعة الأسبوعية للأعمال في وحدة Non-Inventory، نسب التحقيق فقط: NMV 97%، PC1 121%، PC2 130%، PC3 145%، PBT 91%',
      es: 'Resumen del T1 de la revisión semanal de negocio de Non-Inventory, solo el cumplimiento: NMV 97 %, PC1 121 %, PC2 130 %, PC3 145 %, PBT 91 %',
      de: 'Q1-Snapshot aus dem wöchentlichen Business-Review von Non-Inventory, nur die Zielerreichung: NMV 97 %, PC1 121 %, PC2 130 %, PC3 145 %, PBT 91 %',
      fr: 'Instantané du T1 issu de la revue hebdomadaire de Non-Inventory, taux d’atteinte seulement : NMV 97 %, PC1 121 %, PC2 130 %, PC3 145 %, PBT 91 %',
      ja: 'Non-Inventory週次ビジネスレビューのQ1スナップショット（達成率のみ）：NMV 97%、PC1 121%、PC2 130%、PC3 145%、PBT 91%',
    },
  },
} satisfies Record<string, MediaSpec>

export type DgMediaKey = keyof typeof DG_MEDIA
export type DgMediaIds = Partial<Record<DgMediaKey, string>>

// ── Project fields ──────────────────────────────────────────────────────────────────────────

const STATEMENT: L = {
  en: 'Making one milligram of gold feel as safe to buy as a ten-gram bar — the product, the campaigns and the numbers.',
  fa: 'تا خرید یک میلی‌گرم طلا همان‌قدر مطمئن باشد که خرید یک شمش ده‌گرمی — محصول، کمپین‌ها و عددها.',
  ar: 'أن يبدو شراء مليغرام واحد من الذهب آمنًا كشراء سبيكة من عشرة غرامات — المنتج والحملات والأرقام.',
  es: 'Que comprar un miligramo de oro se sienta tan seguro como comprar un lingote de diez gramos: el producto, las campañas y las cifras.',
  de: 'Ein Milligramm Gold so sicher kaufen wie einen Zehn-Gramm-Barren — das Produkt, die Kampagnen und die Zahlen.',
  fr: 'Rendre l’achat d’un milligramme d’or aussi sûr que celui d’un lingot de dix grammes — le produit, les campagnes et les chiffres.',
  ja: '1ミリグラムの金を、10グラムの延べ棒と同じくらい安心して買えるように——プロダクト、キャンペーン、そして数字。',
}

const INDUSTRY: L = {
  en: 'Fintech · e-commerce',
  fa: 'فین‌تک · تجارت الکترونیک',
  ar: 'التقنية المالية · التجارة الإلكترونية',
  es: 'Fintech · comercio electrónico',
  de: 'Fintech · E-Commerce',
  fr: 'Fintech · e-commerce',
  ja: 'フィンテック・Eコマース',
}

const TEAM: L = {
  en: 'Digikala’s Non-Inventory unit, with engineering, PR and performance media, and legal',
  fa: 'واحد Non-Inventory دیجی‌کالا، همراه با مهندسی، روابط عمومی و رسانهٔ پرفورمنس، و حقوقی',
  ar: 'وحدة Non-Inventory في ديجيكالا، مع الهندسة والعلاقات العامة والإعلام الأدائي والقسم القانوني',
  es: 'La unidad Non-Inventory de Digikala, con ingeniería, relaciones públicas y medios de performance, y el equipo legal',
  de: 'Die Non-Inventory-Unit von Digikala, mit Engineering, PR und Performance-Media sowie Legal',
  fr: 'L’unité Non-Inventory de Digikala, avec l’ingénierie, les relations presse et le média de performance, et le juridique',
  ja: 'DigikalaのNon-Inventory部門。エンジニアリング、PRとパフォーマンスメディア、法務と連携',
}

const META_TITLE: L = {
  en: 'Digital Gold — product, campaigns and reporting for Digikala’s gold and silver',
  fa: 'طلای دیجیتال — محصول، کمپین‌ها و گزارش‌گیری برای طلا و نقرهٔ دیجی‌کالا',
  ar: 'الذهب الرقمي — المنتج والحملات والتقارير لذهب ديجيكالا وفضّتها',
  es: 'Digital Gold: producto, campañas y reporting para el oro y la plata de Digikala',
  de: 'Digital Gold — Produkt, Kampagnen und Reporting für Gold und Silber bei Digikala',
  fr: 'Digital Gold — produit, campagnes et reporting pour l’or et l’argent de Digikala',
  ja: 'Digital Gold——Digikalaの金と銀のプロダクト、キャンペーン、レポーティング',
}

const HERO_CAPTION: L = {
  en: 'Three of the 42 screens: the order screen, My Assets and the buy-and-sell history — gold and silver on one set of screens.',
  fa: 'سه صفحه از ۴۲ صفحه: سفارش، دارایی من و تاریخچهٔ خرید و فروش — طلا و نقره روی یک مجموعه صفحه.',
  ar: 'ثلاث من 42 شاشة: شاشة الطلب، وأصولي، وسجلّ الشراء والبيع — الذهب والفضة على مجموعة شاشات واحدة.',
  es: 'Tres de las 42 pantallas: el pedido, Mis activos y el historial de compras y ventas; oro y plata en un mismo conjunto de pantallas.',
  de: 'Drei der 42 Screens: Bestellung, Meine Assets und der Kauf- und Verkaufsverlauf — Gold und Silber auf einem gemeinsamen Satz Screens.',
  fr: 'Trois des 42 écrans : la commande, Mes actifs et l’historique des achats et ventes — l’or et l’argent sur un même jeu d’écrans.',
  ja: '42画面のうちの3つ：注文、マイアセット、売買履歴。金と銀をひとつの画面群で扱う。',
}

const SNAPSHOT: { problem: L; role: L; result: L } = {
  problem: {
    en: 'Gold is Iran’s default hedge against inflation, but buying it is analogue — a dealer, a making charge, purity on trust and somewhere to keep it.',
    fa: 'طلا پناهگاه پیش‌فرض ایرانی‌ها در برابر تورم است، اما خریدش سنتی است — طلافروش، اجرت ساخت، عیاری که باید به آن اعتماد کرد و جایی امن برای نگهداری.',
    ar: 'الذهب هو الملاذ الافتراضي من التضخم في إيران، لكن شراءه تقليدي — تاجر، وأجرة صياغة، وعيار يُؤخذ على الثقة، ومكان آمن لحفظه.',
    es: 'El oro es la protección por defecto contra la inflación en Irán, pero comprarlo es analógico: un comerciante, un coste de fabricación, una pureza que hay que creer y un lugar donde guardarlo.',
    de: 'Gold ist im Iran die Standardabsicherung gegen Inflation, doch der Kauf ist analog — ein Händler, ein Macherlohn, eine Reinheit, der man vertrauen muss, und ein sicherer Aufbewahrungsort.',
    fr: 'L’or est la protection par défaut contre l’inflation en Iran, mais l’acheter reste analogique : un négociant, des frais de façon, une pureté qu’il faut croire sur parole et un endroit où le garder.',
    ja: 'イランでは金がインフレ対策の定番だが、その購入はアナログだ。販売店、加工賃、信じるしかない純度、そして保管場所。',
  },
  role: {
    en: 'Designer, marketer and BI developer on one product: the order and holdings screens, the campaigns around them and the weekly review behind both.',
    fa: 'طراح، بازاریاب و توسعه‌دهندهٔ BI روی یک محصول: صفحه‌های سفارش و دارایی، کمپین‌های پیرامونشان و مرور هفتگی پشت هر دو.',
    ar: 'مصمّم ومسوّق ومطوّر ذكاء أعمال على منتج واحد: شاشات الطلب والأصول، والحملات من حولها، والمراجعة الأسبوعية وراءهما.',
    es: 'Diseñador, marketer y desarrollador BI en un mismo producto: las pantallas de pedido y de activos, las campañas a su alrededor y la revisión semanal que las respalda.',
    de: 'Designer, Marketer und BI-Entwickler für ein Produkt: die Bestell- und Bestandsscreens, die Kampagnen darum herum und das wöchentliche Review dahinter.',
    fr: 'Designer, marketeur et développeur BI sur un même produit : les écrans de commande et d’avoirs, les campagnes autour et la revue hebdomadaire derrière les deux.',
    ja: 'ひとつのプロダクトでデザイナー、マーケター、BI開発者を兼任。注文と資産の画面、その周りのキャンペーン、両方を支える週次レビュー。',
  },
  result: {
    en: 'A 42-screen responsive system, a silver extension on the same rails, consumer and corporate campaigns, and a weekly review that put product, marketing and PR on one set of numbers.',
    fa: 'یک سیستم واکنش‌گرا با ۴۲ صفحه، توسعهٔ نقره روی همان ریل‌ها، کمپین‌های مصرف‌کننده و سازمانی، و مرور هفتگی‌ای که محصول، بازاریابی و روابط عمومی را روی یک مجموعه عدد نشاند.',
    ar: 'نظام متجاوب من 42 شاشة، وتوسعة للفضة على المسار نفسه، وحملات للمستهلكين والمؤسسات، ومراجعة أسبوعية جمعت المنتج والتسويق والعلاقات العامة على مجموعة أرقام واحدة.',
    es: 'Un sistema responsive de 42 pantallas, una extensión a la plata sobre los mismos raíles, campañas para consumidores y empresas, y una revisión semanal que puso a producto, marketing y relaciones públicas ante las mismas cifras.',
    de: 'Ein responsives System aus 42 Screens, eine Silber-Erweiterung auf denselben Schienen, Kampagnen für Privat- und Firmenkunden und ein wöchentliches Review, das Produkt, Marketing und PR auf dieselben Zahlen brachte.',
    fr: 'Un système responsive de 42 écrans, une extension à l’argent sur les mêmes rails, des campagnes grand public et entreprises, et une revue hebdomadaire qui a mis produit, marketing et relations presse face aux mêmes chiffres.',
    ja: '42画面のレスポンシブなシステム、同じ仕組みに載せた銀への拡張、個人向けと法人向けのキャンペーン、そしてプロダクト・マーケティング・PRが同じ数字を見るようにした週次レビュー。',
  },
}

/** One source line for all three business-review outcomes. */
const REVIEW_SOURCE: L = {
  en: 'Non-Inventory weekly business review, Q1 snapshot',
  fa: 'مرور هفتگی کسب‌وکار Non-Inventory، نمای فصل اول',
  ar: 'المراجعة الأسبوعية للأعمال في Non-Inventory، لقطة الربع الأول',
  es: 'Revisión semanal de negocio de Non-Inventory, resumen del T1',
  de: 'Wöchentliches Business-Review von Non-Inventory, Q1-Snapshot',
  fr: 'Revue hebdomadaire de Non-Inventory, instantané du T1',
  ja: 'Non-Inventory週次ビジネスレビュー、Q1スナップショット',
}

// ── Sections ────────────────────────────────────────────────────────────────────────────────

type Sections = NonNullable<Project['sections']>

/** The block narrative for one locale, with the same row ids in every locale. */
export function dgSections(locale: Locale, media: DgMediaIds): Sections {
  const l = <T>(value: L<T>): T => value[locale]
  const dir = dirFor(locale)
  const p = (value: L) => paragraph(l(value), dir)
  const item = (key: DgMediaKey, id: string, caption?: L) =>
    media[key] ? [{ id, media: media[key]!, ...(caption ? { caption: l(caption) } : {}) }] : []

  return [
    {
      id: 'dg-s01',
      blockType: 'csNarrative',
      label: 'context',
      heading: l({
        en: 'Gold, sold by the milligram, inside Iran’s largest marketplace.',
        fa: 'طلا، به میلی‌گرم، در بزرگ‌ترین بازار آنلاین ایران.',
        ar: 'ذهب يُباع بالمليغرام، داخل أكبر سوق إلكترونية في إيران.',
        es: 'Oro, vendido por miligramos, dentro del mayor marketplace de Irán.',
        de: 'Gold, verkauft nach Milligramm, im größten Marktplatz des Iran.',
        fr: 'De l’or, vendu au milligramme, au sein de la plus grande place de marché d’Iran.',
        ja: 'イラン最大のマーケットプレイスで、ミリグラム単位で売る金。',
      }),
      body: prose(
        dir,
        p({
          en: 'Digital Gold is Digikala’s melted digital gold and silver, sold at digikala.com/gold with physical backing: Digikala holds the metal equivalent to each purchase, and a holding can be sold back or taken out as bullion.',
          fa: 'طلای دیجیتال، طلا و نقرهٔ آب‌شدهٔ دیجیتال دیجی‌کالاست که در digikala.com/gold با پشتوانهٔ فیزیکی فروخته می‌شود: دیجی‌کالا معادل فلزِ هر خرید را نگه می‌دارد و دارایی را می‌توان دوباره فروخت یا به‌صورت شمش تحویل گرفت.',
          ar: 'الذهب الرقمي هو ذهب ديجيكالا وفضّتها المصهوران رقميًا، يُباعان في digikala.com/gold بغطاء مادي: تحفظ ديجيكالا ما يعادل كل عملية شراء من المعدن، ويمكن بيع الرصيد مجددًا أو استلامه سبائك.',
          es: 'Digital Gold es el oro y la plata fundidos digitales de Digikala, que se venden en digikala.com/gold con respaldo físico: Digikala custodia el metal equivalente a cada compra, y el saldo puede venderse de nuevo o retirarse en lingotes.',
          de: 'Digital Gold ist Digikalas digitales geschmolzenes Gold und Silber, verkauft auf digikala.com/gold mit physischer Deckung: Digikala verwahrt das Metall, das jedem Kauf entspricht, und ein Bestand lässt sich zurückverkaufen oder als Barren ausliefern.',
          fr: 'Digital Gold, c’est l’or et l’argent fondus numériques de Digikala, vendus sur digikala.com/gold et adossés à du métal physique : Digikala conserve l’équivalent de chaque achat, et l’avoir peut être revendu ou retiré en lingots.',
          ja: 'Digital Goldは、Digikalaが digikala.com/gold で販売する、現物の裏付けがあるデジタルの溶解金と銀だ。Digikalaは購入ごとに相当する金属を保管し、保有分は売り戻すことも延べ棒で受け取ることもできる。',
        }),
        p({
          en: 'It sits in Digikala’s Non-Inventory unit — the part of the marketplace that sells what isn’t physical stock: precious metals, gift cards, services, travel. The role covered the product, the campaigns around it and the reporting behind both.',
          fa: 'این محصول در واحد Non-Inventory دیجی‌کالا قرار دارد — بخشی از بازار که چیزهایی را می‌فروشد که موجودی فیزیکی نیستند: فلزات گران‌بها، کارت هدیه، خدمات و سفر. این نقش محصول، کمپین‌های پیرامونش و گزارش‌گیریِ پشت هر دو را در بر می‌گرفت.',
          ar: 'يقع ضمن وحدة Non-Inventory في ديجيكالا — الجزء من السوق الذي يبيع ما ليس مخزونًا ماديًا: المعادن الثمينة وبطاقات الهدايا والخدمات والسفر. شمل الدور المنتج والحملات من حوله والتقارير وراءهما.',
          es: 'Forma parte de la unidad Non-Inventory de Digikala, la parte del marketplace que vende lo que no es stock físico: metales preciosos, tarjetas regalo, servicios y viajes. El rol abarcaba el producto, las campañas a su alrededor y el reporting detrás de ambos.',
          de: 'Es gehört zur Non-Inventory-Unit von Digikala — dem Teil des Marktplatzes, der verkauft, was kein physischer Lagerbestand ist: Edelmetalle, Geschenkkarten, Services, Reisen. Die Rolle umfasste das Produkt, die Kampagnen darum herum und das Reporting hinter beidem.',
          fr: 'Il relève de l’unité Non-Inventory de Digikala — la partie de la place de marché qui vend ce qui n’est pas du stock physique : métaux précieux, cartes cadeaux, services, voyages. Le rôle couvrait le produit, les campagnes autour et le reporting derrière les deux.',
          ja: 'このプロダクトはDigikalaのNon-Inventory部門に属する。貴金属、ギフトカード、サービス、旅行など、物理的な在庫ではないものを売る部門だ。役割はプロダクト、その周りのキャンペーン、両方を支えるレポーティングに及んだ。',
        }),
      ),
      insight: l({
        en: 'The design problem was custody and disclosure, not trading.',
        fa: 'مسئلهٔ طراحی، امانت‌داری و شفافیت بود، نه معامله‌گری.',
        ar: 'كانت مشكلة التصميم الحفظ والإفصاح، لا التداول.',
        es: 'El problema de diseño era la custodia y la transparencia, no el trading.',
        de: 'Das Designproblem war Verwahrung und Offenlegung, nicht Trading.',
        fr: 'Le problème de design était la garde et la transparence, pas le trading.',
        ja: 'デザインの課題は取引ではなく、保管と開示だった。',
      }),
    },
    {
      id: 'dg-s02',
      blockType: 'csNarrative',
      label: 'problem',
      heading: l({
        en: 'Three questions every screen has to answer.',
        fa: 'سه پرسشی که هر صفحه باید به آن پاسخ دهد.',
        ar: 'ثلاثة أسئلة على كل شاشة أن تجيب عنها.',
        es: 'Tres preguntas que cada pantalla tiene que responder.',
        de: 'Drei Fragen, die jeder Screen beantworten muss.',
        fr: 'Trois questions auxquelles chaque écran doit répondre.',
        ja: 'すべての画面が答えるべき3つの問い。',
      }),
      body: prose(
        dir,
        p({
          en: 'Gold is the default inflation hedge in Iran, but buying it is analogue: a bullion dealer, a making charge, purity you have to take on trust, and somewhere safe to keep it.',
          fa: 'طلا در ایران پناهگاه پیش‌فرض در برابر تورم است، اما خریدش سنتی است: طلافروش، اجرت ساخت، عیاری که باید به آن اعتماد کرد و جایی امن برای نگهداری.',
          ar: 'الذهب في إيران هو الملاذ الافتراضي من التضخم، لكن شراءه تقليدي: تاجر سبائك، وأجرة صياغة، وعيار عليك أن تثق به، ومكان آمن لحفظه.',
          es: 'En Irán, el oro es la protección por defecto contra la inflación, pero comprarlo es analógico: un comerciante de lingotes, un coste de fabricación, una pureza que hay que dar por buena y un lugar seguro donde guardarlo.',
          de: 'Im Iran ist Gold die Standardabsicherung gegen Inflation, doch der Kauf ist analog: ein Barrenhändler, ein Macherlohn, eine Reinheit, der man vertrauen muss, und ein sicherer Ort zur Aufbewahrung.',
          fr: 'En Iran, l’or est la protection par défaut contre l’inflation, mais l’acheter reste analogique : un négociant en lingots, des frais de façon, une pureté qu’il faut croire sur parole et un endroit sûr où le garder.',
          ja: 'イランでは金がインフレ対策の定番だが、買い方はアナログだ。地金商、加工賃、信じるしかない純度、そして安全な保管場所。',
        }),
        p({
          en: 'The product’s bet was that a one-milligram purchase could feel as safe as a ten-gram bar. That puts three questions on every screen: is my gold real, what exactly am I paying, and can I get it back?',
          fa: 'شرط‌بندی محصول این بود که خرید یک میلی‌گرم هم می‌تواند به اندازهٔ یک شمش ده‌گرمی مطمئن باشد. این یعنی سه پرسش روی هر صفحه: آیا طلای من واقعی است، دقیقاً چه چیزی می‌پردازم، و آیا می‌توانم پسش بگیرم؟',
          ar: 'كان رهان المنتج أن شراء مليغرام واحد يمكن أن يبدو آمنًا كسبيكة من عشرة غرامات. وهذا يضع ثلاثة أسئلة على كل شاشة: هل ذهبي حقيقي، وماذا أدفع بالضبط، وهل أستطيع استرداده؟',
          es: 'La apuesta del producto era que una compra de un miligramo pudiera sentirse tan segura como un lingote de diez gramos. Eso pone tres preguntas en cada pantalla: ¿mi oro es real?, ¿qué estoy pagando exactamente? y ¿puedo recuperarlo?',
          de: 'Die Wette des Produkts: Ein Kauf von einem Milligramm kann sich so sicher anfühlen wie ein Zehn-Gramm-Barren. Damit stellen sich auf jedem Screen drei Fragen: Ist mein Gold echt, was genau bezahle ich, und bekomme ich es zurück?',
          fr: 'Le pari du produit : qu’un achat d’un milligramme puisse sembler aussi sûr qu’un lingot de dix grammes. Cela pose trois questions sur chaque écran : mon or est-il réel, qu’est-ce que je paie exactement, et puis-je le récupérer ?',
          ja: 'プロダクトの賭けは、1ミリグラムの購入でも10グラムの延べ棒と同じ安心感を持てるということだった。そのため、どの画面にも3つの問いがある。私の金は本物か、正確にいくら払うのか、取り戻せるのか。',
        }),
      ),
    },
    {
      id: 'dg-s03',
      blockType: 'csNarrative',
      label: 'constraints',
      heading: l({
        en: 'Real money and real metal, on someone else’s design system.',
        fa: 'پول واقعی و فلز واقعی، روی سیستم طراحیِ تیمی دیگر.',
        ar: 'مال حقيقي ومعدن حقيقي، على نظام تصميم يملكه فريق آخر.',
        es: 'Dinero real y metal real, sobre el sistema de diseño de otro equipo.',
        de: 'Echtes Geld und echtes Metall, auf dem Designsystem eines anderen Teams.',
        fr: 'De la vraie monnaie et du vrai métal, sur le design system d’une autre équipe.',
        ja: '本物のお金と本物の金属を、他チームのデザインシステムの上で。',
      }),
      body: prose(
        dir,
        bullets(
          l({
            en: [
              'Buy and sell from one milligram, between 5,000 and 200,000,000 toman per order.',
              'Payouts to the DigiPay wallet, in four daily settlement windows.',
              'Physical redemption as 10-gram bullion.',
              'Persian, right to left, with Persian digits throughout.',
              'Desktop at 1440 and mobile at 390, shipped as one responsive system.',
              'Built on Digikala’s house design system, which another team owned.',
            ],
            fa: [
              'خرید و فروش از یک میلی‌گرم، با حداقل ۵ هزار و حداکثر ۲۰۰ میلیون تومان در هر سفارش.',
              'واریز به کیف پول دیجی‌پی، در چهار نوبت تسویهٔ روزانه.',
              'تحویل فیزیکی به‌صورت شمش ۱۰ گرمی.',
              'فارسی، راست‌به‌چپ، با ارقام فارسی در همه‌جا.',
              'دسکتاپ ۱۴۴۰ و موبایل ۳۹۰، به‌عنوان یک سیستم واکنش‌گرای واحد.',
              'ساخته‌شده روی سیستم طراحی دیجی‌کالا که مالکش تیم دیگری بود.',
            ],
            ar: [
              'الشراء والبيع بدءًا من مليغرام واحد، بين 5 آلاف و200 مليون تومان للطلب الواحد.',
              'الدفع إلى محفظة DigiPay، في أربع نوافذ تسوية يومية.',
              'الاسترداد المادي على شكل سبائك من 10 غرامات.',
              'بالفارسية، من اليمين إلى اليسار، بالأرقام الفارسية في كل مكان.',
              'سطح المكتب بعرض 1440 والهاتف بعرض 390، كنظام متجاوب واحد.',
              'مبنيّ على نظام التصميم الخاص بديجيكالا، الذي كان يملكه فريق آخر.',
            ],
            es: [
              'Compra y venta desde un miligramo, entre 5.000 y 200.000.000 tomanes por pedido.',
              'Pagos al monedero DigiPay, en cuatro ventanas de liquidación diarias.',
              'Canje físico en lingotes de 10 gramos.',
              'En persa, de derecha a izquierda, con cifras persas en todo el producto.',
              'Escritorio a 1440 y móvil a 390, lanzados como un único sistema responsive.',
              'Construido sobre el sistema de diseño de Digikala, que pertenecía a otro equipo.',
            ],
            de: [
              'Kauf und Verkauf ab einem Milligramm, zwischen 5.000 und 200.000.000 Toman pro Bestellung.',
              'Auszahlung in die DigiPay-Wallet, in vier täglichen Abrechnungsfenstern.',
              'Physische Einlösung als 10-Gramm-Barren.',
              'Persisch, von rechts nach links, durchgehend mit persischen Ziffern.',
              'Desktop mit 1440 und Mobile mit 390 Pixeln, ausgeliefert als ein responsives System.',
              'Gebaut auf Digikalas hauseigenem Designsystem, das einem anderen Team gehörte.',
            ],
            fr: [
              'Achat et vente dès un milligramme, entre 5 000 et 200 000 000 tomans par commande.',
              'Versements sur le portefeuille DigiPay, en quatre fenêtres de règlement par jour.',
              'Retrait physique sous forme de lingots de 10 grammes.',
              'En persan, de droite à gauche, avec des chiffres persans partout.',
              'Bureau en 1440 et mobile en 390, livrés comme un seul système responsive.',
              'Construit sur le design system maison de Digikala, qui appartenait à une autre équipe.',
            ],
            ja: [
              '1ミリグラムから売買でき、1回の注文は5,000〜200,000,000トマン。',
              'DigiPayウォレットへの支払いは、1日4回の決済枠で。',
              '10グラムの延べ棒として現物で受け取れる。',
              'ペルシア語、右から左、数字もすべてペルシア数字。',
              'デスクトップ1440とモバイル390を、ひとつのレスポンシブなシステムとしてリリース。',
              '別チームが管理するDigikalaの社内デザインシステムの上に構築。',
            ],
          }),
          dir,
        ),
      ),
    },
    {
      id: 'dg-s04',
      blockType: 'csOwnership',
      heading: l({
        en: 'Three hats: designer, marketer, BI developer.',
        fa: 'سه کلاه: طراح، بازاریاب، توسعه‌دهندهٔ BI.',
        ar: 'ثلاث قبعات: مصمّم، ومسوّق، ومطوّر ذكاء أعمال.',
        es: 'Tres sombreros: diseñador, marketer y desarrollador BI.',
        de: 'Drei Hüte: Designer, Marketer, BI-Entwickler.',
        fr: 'Trois casquettes : designer, marketeur, développeur BI.',
        ja: '3つの役割：デザイナー、マーケター、BI開発者。',
      }),
      intro: l({
        en: 'The role title names three jobs, and the three Figma files split along exactly those lines: the product, the campaigns, and the weekly business review.',
        fa: 'عنوان نقش سه کار را نام می‌برد و سه فایل فیگما دقیقاً در همین مرزها از هم جدا می‌شوند: محصول، کمپین‌ها و مرور هفتگی کسب‌وکار.',
        ar: 'يسمّي المسمّى الوظيفي ثلاث مهام، وتنقسم ملفات Figma الثلاثة على هذه الحدود بالضبط: المنتج، والحملات، والمراجعة الأسبوعية للأعمال.',
        es: 'El título del rol nombra tres trabajos, y los tres archivos de Figma se dividen exactamente así: el producto, las campañas y la revisión semanal de negocio.',
        de: 'Der Rollentitel nennt drei Aufgaben, und die drei Figma-Dateien teilen sich genau entlang dieser Linien: das Produkt, die Kampagnen und das wöchentliche Business-Review.',
        fr: 'L’intitulé du poste nomme trois métiers, et les trois fichiers Figma se répartissent exactement ainsi : le produit, les campagnes et la revue hebdomadaire.',
        ja: '役職名は3つの仕事を示し、3つのFigmaファイルもまさにその線で分かれている。プロダクト、キャンペーン、週次ビジネスレビューだ。',
      }),
      own: l({
        en: [
          'Product vision and roadmap',
          'The order, holdings and profile flows',
          'Campaign concepts',
          'The segmentation model',
          'The BI dashboards',
        ],
        fa: [
          'چشم‌انداز و نقشهٔ راه محصول',
          'جریان‌های سفارش، دارایی و پروفایل',
          'ایده‌های کمپین',
          'مدل بخش‌بندی کاربران',
          'داشبوردهای BI',
        ],
        ar: [
          'رؤية المنتج وخارطة طريقه',
          'مسارات الطلب والأصول والملف الشخصي',
          'مفاهيم الحملات',
          'نموذج تقسيم المستخدمين',
          'لوحات ذكاء الأعمال',
        ],
        es: [
          'Visión y roadmap del producto',
          'Los flujos de pedido, activos y perfil',
          'Los conceptos de campaña',
          'El modelo de segmentación',
          'Los dashboards de BI',
        ],
        de: [
          'Produktvision und Roadmap',
          'Die Flows für Bestellung, Bestand und Profil',
          'Kampagnenkonzepte',
          'Das Segmentierungsmodell',
          'Die BI-Dashboards',
        ],
        fr: [
          'Vision et roadmap produit',
          'Les parcours commande, avoirs et profil',
          'Les concepts de campagne',
          'Le modèle de segmentation',
          'Les tableaux de bord BI',
        ],
        ja: [
          'プロダクトのビジョンとロードマップ',
          '注文・資産・プロフィールのフロー',
          'キャンペーンのコンセプト',
          'セグメンテーションモデル',
          'BIダッシュボード',
        ],
      }),
      coOwn: l({
        en: [
          'Fee and pricing presentation, with the business',
          'The silver extension',
          'The corporate gift-card offer, with the Non-Inventory unit',
        ],
        fa: [
          'نحوهٔ نمایش کارمزد و قیمت، با تیم کسب‌وکار',
          'توسعهٔ نقره',
          'پیشنهاد کارت هدیهٔ سازمانی، با واحد Non-Inventory',
        ],
        ar: [
          'طريقة عرض الرسوم والتسعير، مع فريق الأعمال',
          'توسعة الفضة',
          'عرض بطاقات الهدايا للمؤسسات، مع وحدة Non-Inventory',
        ],
        es: [
          'La presentación de comisiones y precios, con negocio',
          'La extensión a la plata',
          'La oferta de tarjetas regalo para empresas, con la unidad Non-Inventory',
        ],
        de: [
          'Die Darstellung von Gebühren und Preisen, mit dem Business',
          'Die Silber-Erweiterung',
          'Das Firmenangebot für Geschenkkarten, mit der Non-Inventory-Unit',
        ],
        fr: [
          'La présentation des frais et des prix, avec le business',
          'L’extension à l’argent',
          'L’offre de cartes cadeaux pour les entreprises, avec l’unité Non-Inventory',
        ],
        ja: [
          '手数料と価格の見せ方（ビジネスチームと）',
          '銀への拡張',
          '法人向けギフトカード（Non-Inventory部門と）',
        ],
      }),
      collaborate: l({
        en: ['Engineering', 'PR and performance media', 'Legal and compliance'],
        fa: ['مهندسی', 'روابط عمومی و رسانهٔ پرفورمنس', 'حقوقی و انطباق'],
        ar: ['الهندسة', 'العلاقات العامة والإعلام الأدائي', 'الشؤون القانونية والامتثال'],
        es: ['Ingeniería', 'Relaciones públicas y medios de performance', 'Legal y cumplimiento'],
        de: ['Engineering', 'PR und Performance-Media', 'Legal und Compliance'],
        fr: ['Ingénierie', 'Relations presse et média de performance', 'Juridique et conformité'],
        ja: ['エンジニアリング', 'PRとパフォーマンスメディア', '法務・コンプライアンス'],
      }),
      note: l({
        en: 'Digikala’s design system and platform engineering belonged to other teams — these screens are built on the house system and carry the production header and footer.',
        fa: 'سیستم طراحی و مهندسی پلتفرم دیجی‌کالا متعلق به تیم‌های دیگر بود — این صفحه‌ها روی سیستم طراحی خود دیجی‌کالا ساخته شده‌اند و هدر و فوتر اصلی سایت را دارند.',
        ar: 'كان نظام تصميم ديجيكالا وهندسة المنصة ملكًا لفرق أخرى — هذه الشاشات مبنية على نظام ديجيكالا نفسه وتحمل ترويسة الموقع وتذييله الفعليين.',
        es: 'El sistema de diseño y la ingeniería de plataforma de Digikala eran de otros equipos: estas pantallas se apoyan en el sistema de la casa y llevan la cabecera y el pie de producción.',
        de: 'Digikalas Designsystem und das Plattform-Engineering gehörten anderen Teams — diese Screens bauen auf dem hauseigenen System auf und tragen den Header und Footer der Produktion.',
        fr: 'Le design system et l’ingénierie plateforme de Digikala appartenaient à d’autres équipes — ces écrans reposent sur le système maison et portent l’en-tête et le pied de page de production.',
        ja: 'Digikalaのデザインシステムとプラットフォームのエンジニアリングは他チームの担当だった。これらの画面は社内システムの上に作られ、本番のヘッダーとフッターを使っている。',
      }),
    },
    {
      id: 'dg-s05',
      blockType: 'csNarrative',
      label: 'approach',
      heading: l({
        en: 'Every state drawn twice.',
        fa: 'هر حالت، دو بار کشیده شده.',
        ar: 'كل حالة مرسومة مرتين.',
        es: 'Cada estado, dibujado dos veces.',
        de: 'Jeder Zustand zweimal gezeichnet.',
        fr: 'Chaque état, dessiné deux fois.',
        ja: 'すべての状態を2回ずつ描く。',
      }),
      body: prose(
        dir,
        p({
          en: 'The Figma canvas is organised as a matrix, not a screen dump: each flow opens on a title card, splits into its states, and every state is drawn once at desktop and once at mobile.',
          fa: 'بوم فیگما به‌شکل یک ماتریس چیده شده، نه انبوهی از صفحه‌ها: هر جریان با یک کارت عنوان شروع می‌شود، به حالت‌هایش تقسیم می‌شود و هر حالت یک بار در دسکتاپ و یک بار در موبایل کشیده شده است.',
          ar: 'لوحة Figma منظّمة كمصفوفة، لا كومة شاشات: يبدأ كل مسار ببطاقة عنوان، ثم يتفرّع إلى حالاته، وتُرسم كل حالة مرة لسطح المكتب ومرة للهاتف.',
          es: 'El lienzo de Figma está organizado como una matriz, no como un volcado de pantallas: cada flujo abre con una tarjeta de título, se divide en sus estados y cada estado se dibuja una vez en escritorio y otra en móvil.',
          de: 'Das Figma-Canvas ist als Matrix organisiert, nicht als Screen-Sammlung: Jeder Flow beginnt mit einer Titelkarte, teilt sich in seine Zustände, und jeder Zustand ist einmal für Desktop und einmal für Mobile gezeichnet.',
          fr: 'Le canevas Figma est organisé en matrice, pas en vrac d’écrans : chaque parcours s’ouvre sur une carte titre, se divise en états, et chaque état est dessiné une fois pour le bureau et une fois pour le mobile.',
          ja: 'Figmaのキャンバスは画面の寄せ集めではなく、マトリクスとして構成されている。各フローはタイトルカードから始まり、状態ごとに分かれ、すべての状態がデスクトップとモバイルで1回ずつ描かれている。',
        }),
        p({
          en: 'Order, My Assets and Profile come to 42 screens — 20, 12 and 10 — which is 21 states, each drawn at both widths, plus four explorations of how to show holdings.',
          fa: 'سفارش، دارایی من و پروفایل روی هم ۴۲ صفحه‌اند — ۲۰، ۱۲ و ۱۰ — یعنی ۲۱ حالت که هرکدام در هر دو عرض کشیده شده، به‌اضافهٔ چهار طرح اکتشافی برای نمایش دارایی.',
          ar: 'تبلغ شاشات الطلب وأصولي والملف الشخصي 42 شاشة — 20 و12 و10 — أي 21 حالة، كلٌّ منها مرسومة بالعرضين، إضافة إلى أربعة استكشافات لطريقة عرض الأصول.',
          es: 'Pedido, Mis activos y Perfil suman 42 pantallas —20, 12 y 10—, es decir, 21 estados dibujados en los dos anchos, además de cuatro exploraciones sobre cómo mostrar los activos.',
          de: 'Bestellung, Meine Assets und Profil ergeben 42 Screens — 20, 12 und 10 —, also 21 Zustände, jeder in beiden Breiten gezeichnet, dazu vier Explorationen zur Darstellung des Bestands.',
          fr: 'Commande, Mes actifs et Profil totalisent 42 écrans — 20, 12 et 10 —, soit 21 états dessinés aux deux largeurs, plus quatre explorations sur la manière d’afficher les avoirs.',
          ja: '注文、マイアセット、プロフィールで合計42画面（20・12・10）。つまり21の状態を両方の幅で描き、さらに資産の見せ方を探った4案がある。',
        }),
        p({
          en: 'Failure is one of those states. A failed order has its own copy, its own tracking code and its own next step, laid out like the success — not an error page.',
          fa: 'شکست هم یکی از همین حالت‌هاست. سفارش ناموفق متن خودش، کد رهگیری خودش و قدم بعدی خودش را دارد و مثل حالت موفق چیده شده — نه یک صفحهٔ خطا.',
          ar: 'الفشل إحدى هذه الحالات. للطلب الفاشل نصّه الخاص ورمز تتبّعه الخاص وخطوته التالية الخاصة، بتخطيط مماثل للنجاح — لا صفحة خطأ.',
          es: 'El fallo es uno de esos estados. Un pedido fallido tiene su propio texto, su propio código de seguimiento y su propio siguiente paso, con la misma disposición que el éxito: no una página de error.',
          de: 'Scheitern ist einer dieser Zustände. Eine fehlgeschlagene Bestellung hat eigenen Text, einen eigenen Tracking-Code und einen eigenen nächsten Schritt, aufgebaut wie der Erfolg — keine Fehlerseite.',
          fr: 'L’échec est l’un de ces états. Une commande échouée a son propre texte, son propre code de suivi et sa propre étape suivante, avec la même mise en page que la réussite — pas une page d’erreur.',
          ja: '失敗もそうした状態のひとつだ。失敗した注文には専用の文言、追跡コード、次の一歩があり、成功と同じレイアウトで描かれている。エラーページではない。',
        }),
      ),
      insight: l({
        en: 'Failure got its own copy and layout, not an error page.',
        fa: 'شکست متن و چیدمان خودش را گرفت، نه یک صفحهٔ خطا.',
        ar: 'نال الفشل نصّه وتخطيطه الخاصين، لا صفحة خطأ.',
        es: 'El fallo tuvo su propio texto y su propia disposición, no una página de error.',
        de: 'Scheitern bekam eigenen Text und eigenes Layout, keine Fehlerseite.',
        fr: 'L’échec a eu son propre texte et sa propre mise en page, pas une page d’erreur.',
        ja: '失敗にはエラーページではなく、専用の文言とレイアウトを与えた。',
      }),
    },
    {
      id: 'dg-s06',
      blockType: 'csProcess',
      kind: 'process',
      heading: l({
        en: 'Flow → state → breakpoint',
        fa: 'جریان ← حالت ← بریک‌پوینت',
        ar: 'المسار ← الحالة ← نقطة التوقّف',
        es: 'Flujo → estado → breakpoint',
        de: 'Flow → Zustand → Breakpoint',
        fr: 'Parcours → état → breakpoint',
        ja: 'フロー → 状態 → ブレークポイント',
      }),
      steps: [
        {
          id: 'dg-p01',
          code: 'F',
          label: l({
            en: 'Flow',
            fa: 'جریان',
            ar: 'المسار',
            es: 'Flujo',
            de: 'Flow',
            fr: 'Parcours',
            ja: 'フロー',
          }),
          note: l({
            en: 'Order · My Assets · Profile',
            fa: 'سفارش · دارایی من · پروفایل',
            ar: 'الطلب · أصولي · الملف الشخصي',
            es: 'Pedido · Mis activos · Perfil',
            de: 'Bestellung · Meine Assets · Profil',
            fr: 'Commande · Mes actifs · Profil',
            ja: '注文・マイアセット・プロフィール',
          }),
        },
        {
          id: 'dg-p02',
          code: 'S',
          label: l({
            en: 'State',
            fa: 'حالت',
            ar: 'الحالة',
            es: 'Estado',
            de: 'Zustand',
            fr: 'État',
            ja: '状態',
          }),
          note: l({
            en: 'Successful · failed · pending approval · in progress · paying out',
            fa: 'موفق · ناموفق · در انتظار تایید · در حال انجام · در حال واریز',
            ar: 'ناجح · فاشل · بانتظار التأكيد · قيد التنفيذ · قيد الإيداع',
            es: 'Completado · fallido · pendiente de aprobación · en curso · en pago',
            de: 'Erfolgreich · fehlgeschlagen · wartet auf Bestätigung · in Bearbeitung · in Auszahlung',
            fr: 'Réussi · échoué · en attente de validation · en cours · en cours de versement',
            ja: '成功・失敗・承認待ち・処理中・入金処理中',
          }),
        },
        {
          id: 'dg-p03',
          code: 'B',
          label: l({
            en: 'Breakpoint',
            fa: 'بریک‌پوینت',
            ar: 'نقطة التوقّف',
            es: 'Breakpoint',
            de: 'Breakpoint',
            fr: 'Breakpoint',
            ja: 'ブレークポイント',
          }),
          note: l({
            en: 'Desktop 1440 · mobile 390',
            fa: 'دسکتاپ ۱۴۴۰ · موبایل ۳۹۰',
            ar: 'سطح المكتب 1440 · الهاتف 390',
            es: 'Escritorio 1440 · móvil 390',
            de: 'Desktop 1440 · Mobile 390',
            fr: 'Bureau 1440 · mobile 390',
            ja: 'デスクトップ1440・モバイル390',
          }),
        },
      ],
    },
    {
      id: 'dg-s07',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'plain',
      items: item('matrix', 'dg-f07-1'),
      caption: l({
        en: '“Final Transaction Gold”: an order’s success and failed states, each at desktop and at mobile. The success spells out the four settlement windows; the failure keeps the same layout and adds a tracking code.',
        fa: '«Final Transaction Gold»: حالت‌های موفق و ناموفق یک سفارش، هرکدام در دسکتاپ و موبایل. حالت موفق چهار نوبت تسویه را توضیح می‌دهد؛ حالت ناموفق همان چیدمان را نگه می‌دارد و کد رهگیری اضافه می‌کند.',
        ar: '«Final Transaction Gold»: حالتا النجاح والفشل لطلب ما، كلٌّ منهما لسطح المكتب وللهاتف. تشرح حالة النجاح نوافذ التسوية الأربع؛ وتحتفظ حالة الفشل بالتخطيط نفسه وتضيف رمز تتبّع.',
        es: '«Final Transaction Gold»: los estados de éxito y de fallo de un pedido, en escritorio y en móvil. El éxito detalla las cuatro ventanas de liquidación; el fallo conserva la misma disposición y añade un código de seguimiento.',
        de: '„Final Transaction Gold“: Erfolgs- und Fehlerzustand einer Bestellung, jeweils für Desktop und Mobile. Der Erfolg erklärt die vier Abrechnungsfenster; der Fehler behält das Layout und ergänzt einen Tracking-Code.',
        fr: '« Final Transaction Gold » : les états de réussite et d’échec d’une commande, sur bureau et sur mobile. La réussite détaille les quatre fenêtres de règlement ; l’échec garde la même mise en page et ajoute un code de suivi.',
        ja: '「Final Transaction Gold」：注文の成功と失敗の状態を、デスクトップとモバイルそれぞれで。成功画面は4つの決済枠を説明し、失敗画面は同じレイアウトのまま追跡コードを加える。',
      }),
    },
    {
      id: 'dg-s08',
      blockType: 'csDecisions',
      heading: l({
        en: 'Four calls on the order and holdings screens',
        fa: 'چهار تصمیم در صفحه‌های سفارش و دارایی',
        ar: 'أربعة قرارات في شاشتي الطلب والأصول',
        es: 'Cuatro decisiones en las pantallas de pedido y activos',
        de: 'Vier Entscheidungen auf den Bestell- und Bestandsscreens',
        fr: 'Quatre choix sur les écrans de commande et d’avoirs',
        ja: '注文と資産の画面での4つの判断',
      }),
      lede: l({
        en: 'Each one answers one of the three questions before the user has to ask it.',
        fa: 'هرکدام به یکی از آن سه پرسش پاسخ می‌دهد، پیش از آنکه کاربر مجبور به پرسیدنش شود.',
        ar: 'كلٌّ منها يجيب عن أحد الأسئلة الثلاثة قبل أن يضطر المستخدم إلى طرحه.',
        es: 'Cada una responde a una de las tres preguntas antes de que el usuario tenga que hacerla.',
        de: 'Jede beantwortet eine der drei Fragen, bevor der Nutzer sie stellen muss.',
        fr: 'Chacun répond à l’une des trois questions avant que l’utilisateur n’ait à la poser.',
        ja: 'どれも、ユーザーが尋ねる前に3つの問いのひとつに答えている。',
      }),
      items: [
        {
          id: 'dg-d01',
          title: l({
            en: 'Put the fee and the limits above the button.',
            fa: 'کارمزد و محدودیت‌ها را بالای دکمه بگذار.',
            ar: 'ضع الرسوم والحدود فوق الزر.',
            es: 'Poner la comisión y los límites encima del botón.',
            de: 'Gebühr und Grenzen über den Button setzen.',
            fr: 'Placer les frais et les limites au-dessus du bouton.',
            ja: '手数料と上限・下限をボタンの上に置く。',
          }),
          why: l({
            en: 'The buy fee, the minimum and maximum and the wallet balance sit in the order card above Buy gold, so nothing about the cost appears for the first time after the commit.',
            fa: 'کارمزد خرید، حداقل و حداکثر خرید و موجودی کیف پول در کارت سفارش و بالای «خرید طلا» می‌نشینند تا هیچ چیزی دربارهٔ هزینه برای اولین بار بعد از تایید دیده نشود.',
            ar: 'تظهر رسوم الشراء والحدّان الأدنى والأقصى ورصيد المحفظة في بطاقة الطلب فوق «شراء الذهب»، فلا يظهر أي شيء عن التكلفة لأول مرة بعد التأكيد.',
            es: 'La comisión de compra, el mínimo y el máximo y el saldo del monedero están en la tarjeta de pedido, encima de «Comprar oro», así que nada del coste aparece por primera vez después de confirmar.',
            de: 'Kaufgebühr, Minimum und Maximum sowie das Wallet-Guthaben stehen in der Bestellkarte über „Gold kaufen“ — nichts an den Kosten taucht erst nach der Bestätigung auf.',
            fr: 'Les frais d’achat, le minimum et le maximum et le solde du portefeuille figurent dans la carte de commande, au-dessus d’« Acheter de l’or » : rien du coût n’apparaît pour la première fois après la validation.',
            ja: '購入手数料、最小・最大購入量、ウォレット残高は、注文カードの「金を購入」ボタンの上にある。確定した後で初めて費用の情報が出てくることはない。',
          }),
          evidence: l({
            en: 'The order screen lists the wallet balance, maximum, minimum and buy fee before the button.',
            fa: 'صفحهٔ سفارش موجودی کیف پول، حداکثر، حداقل و کارمزد خرید را پیش از دکمه فهرست می‌کند.',
            ar: 'تسرد شاشة الطلب رصيد المحفظة والحدّ الأقصى والأدنى ورسوم الشراء قبل الزر.',
            es: 'La pantalla de pedido enumera el saldo, el máximo, el mínimo y la comisión de compra antes del botón.',
            de: 'Der Bestellscreen listet Wallet-Guthaben, Maximum, Minimum und Kaufgebühr vor dem Button.',
            fr: 'L’écran de commande liste le solde, le maximum, le minimum et les frais d’achat avant le bouton.',
            ja: '注文画面は、ボタンより前にウォレット残高、最大・最小購入量、購入手数料を並べている。',
          }),
        },
        {
          id: 'dg-d02',
          title: l({
            en: 'Show the price clock, not a promise.',
            fa: 'ساعت قیمت را نشان بده، نه وعده.',
            ar: 'اعرض ساعة السعر، لا وعدًا.',
            es: 'Mostrar el reloj del precio, no una promesa.',
            de: 'Die Preisuhr zeigen, kein Versprechen.',
            fr: 'Montrer l’horloge du prix, pas une promesse.',
            ja: '約束ではなく、価格の時計を見せる。',
          }),
          why: l({
            en: 'The live price refreshes on a visible 20-second countdown. A timer says the price is live and when it will move; a sentence could only claim it.',
            fa: 'نرخ لحظه‌ای با شمارش معکوس ۲۰ ثانیه‌ایِ قابل‌دیدن به‌روز می‌شود. تایمر می‌گوید قیمت زنده است و کی تغییر می‌کند؛ یک جمله فقط می‌توانست ادعایش را بکند.',
            ar: 'يتجدّد السعر اللحظي مع عدّاد تنازلي ظاهر من 20 ثانية. يقول العدّاد إن السعر حيّ ومتى سيتغيّر؛ أما الجملة فلا تستطيع إلا الادّعاء.',
            es: 'El precio en vivo se actualiza con una cuenta atrás visible de 20 segundos. Un temporizador dice que el precio está vivo y cuándo cambiará; una frase solo podría afirmarlo.',
            de: 'Der Live-Preis aktualisiert sich mit einem sichtbaren 20-Sekunden-Countdown. Ein Timer zeigt, dass der Preis live ist und wann er sich ändert; ein Satz könnte es nur behaupten.',
            fr: 'Le prix en direct se met à jour avec un compte à rebours visible de 20 secondes. Un minuteur montre que le prix est vivant et quand il bougera ; une phrase ne pourrait que l’affirmer.',
            ja: 'リアルタイム価格は、目に見える20秒のカウントダウンで更新される。タイマーは価格が生きていること、そしていつ動くかを示す。文章では主張することしかできない。',
          }),
          evidence: l({
            en: 'Order-flow copy: “20 seconds until the price updates”.',
            fa: 'متن جریان سفارش: «۲۰ ثانیه مانده تا بروزرسانی قیمت».',
            ar: 'نصّ مسار الطلب: «20 ثانية حتى تحديث السعر».',
            es: 'Texto del flujo de pedido: «20 segundos para que se actualice el precio».',
            de: 'Text im Bestell-Flow: „20 Sekunden bis zur Preisaktualisierung“.',
            fr: 'Texte du parcours de commande : « 20 secondes avant la mise à jour du prix ».',
            ja: '注文フローの文言：「価格更新まであと20秒」。',
          }),
        },
        {
          id: 'dg-d03',
          title: l({
            en: 'Let people think in money or in milligrams.',
            fa: 'بگذار آدم‌ها با پول فکر کنند یا با میلی‌گرم.',
            ar: 'دع الناس يفكّرون بالمال أو بالمليغرام.',
            es: 'Dejar que la gente piense en dinero o en miligramos.',
            de: 'Menschen in Geld oder in Milligramm denken lassen.',
            fr: 'Laisser raisonner en montant ou en milligrammes.',
            ja: 'お金でもミリグラムでも考えられるようにする。',
          }),
          why: l({
            en: 'Amount paid and quantity of gold derive each other, so a first-time buyer can start from a budget and a saver from a weight.',
            fa: 'مبلغ پرداختی و مقدار طلا از هم محاسبه می‌شوند؛ پس خریدار تازه‌کار می‌تواند از بودجه شروع کند و پس‌اندازکننده از وزن.',
            ar: 'يُشتقّ المبلغ المدفوع وكمية الذهب كلٌّ من الآخر، فيبدأ المشتري الجديد من ميزانيته والمدّخر من الوزن.',
            es: 'Importe pagado y cantidad de oro se calculan el uno a partir del otro, así que quien compra por primera vez puede empezar por un presupuesto y quien ahorra, por un peso.',
            de: 'Gezahlter Betrag und Goldmenge leiten sich gegenseitig ab — Erstkäufer können beim Budget beginnen, Sparer beim Gewicht.',
            fr: 'Le montant payé et la quantité d’or se déduisent l’un de l’autre : un primo-acheteur part d’un budget, un épargnant d’un poids.',
            ja: '支払額と金の量は互いに換算されるので、初めての人は予算から、貯める人は重さから始められる。',
          }),
          evidence: l({
            en: 'Two linked fields on the order screen: amount paid in rials, quantity of gold in milligrams.',
            fa: 'دو فیلد پیوسته در صفحهٔ سفارش: مبلغ پرداختی به ریال و مقدار طلا به میلی‌گرم.',
            ar: 'حقلان مترابطان في شاشة الطلب: المبلغ المدفوع بالريال، وكمية الذهب بالمليغرام.',
            es: 'Dos campos vinculados en la pantalla de pedido: importe pagado en riales y cantidad de oro en miligramos.',
            de: 'Zwei verknüpfte Felder im Bestellscreen: gezahlter Betrag in Rial, Goldmenge in Milligramm.',
            fr: 'Deux champs liés sur l’écran de commande : montant payé en rials, quantité d’or en milligrammes.',
            ja: '注文画面の連動する2つの入力欄：リアル建ての支払額と、ミリグラム単位の金の量。',
          }),
        },
        {
          id: 'dg-d04',
          title: l({
            en: 'Hide the balance with one tap.',
            fa: 'موجودی را با یک لمس پنهان کن.',
            ar: 'أخفِ الرصيد بلمسة واحدة.',
            es: 'Ocultar el saldo con un toque.',
            de: 'Das Guthaben mit einem Tippen ausblenden.',
            fr: 'Masquer le solde d’un geste.',
            ja: 'ワンタップで残高を隠す。',
          }),
          why: l({
            en: 'Holdings are savings, and a phone screen is often seen by someone else. The eye toggle masks every value while the card keeps its shape.',
            fa: 'دارایی یعنی پس‌انداز، و صفحهٔ گوشی را اغلب کس دیگری هم می‌بیند. کلید چشم همهٔ مقدارها را می‌پوشاند و کارت شکلش را حفظ می‌کند.',
            ar: 'الأصول مدّخرات، وشاشة الهاتف كثيرًا ما يراها شخص آخر. يحجب مفتاح العين كل القيم بينما تحتفظ البطاقة بشكلها.',
            es: 'Los activos son ahorros, y la pantalla del móvil a menudo la ve otra persona. El icono del ojo enmascara todos los valores y la tarjeta conserva su forma.',
            de: 'Bestände sind Ersparnisse, und ein Handybildschirm wird oft von anderen gesehen. Der Augen-Schalter maskiert alle Werte, die Karte behält ihre Form.',
            fr: 'Les avoirs sont une épargne, et un écran de téléphone est souvent vu par quelqu’un d’autre. L’icône en forme d’œil masque chaque valeur tandis que la carte garde sa forme.',
            ja: '資産は貯蓄であり、スマホの画面は他人に見られることも多い。目のアイコンですべての値を伏せても、カードの形は変わらない。',
          }),
          evidence: l({
            en: 'The holdings card with the balance hidden; the explorations for this card tried different masks.',
            fa: 'کارت دارایی با موجودیِ پنهان؛ طرح‌های اکتشافی این کارت ماسک‌های مختلفی را آزمودند.',
            ar: 'بطاقة الأصول والرصيد مخفيّ؛ جرّبت استكشافات هذه البطاقة أقنعة مختلفة.',
            es: 'La tarjeta de activos con el saldo oculto; las exploraciones de esta tarjeta probaron distintas máscaras.',
            de: 'Die Bestandskarte mit ausgeblendetem Guthaben; die Explorationen zu dieser Karte testeten verschiedene Masken.',
            fr: 'La carte des avoirs avec le solde masqué ; les explorations de cette carte ont essayé plusieurs masques.',
            ja: '残高を隠した資産カード。このカードの検討案では、伏せ字の表現をいくつか試している。',
          }),
          ...(media.balanceHidden ? { media: media.balanceHidden } : {}),
        },
      ],
    },
    {
      id: 'dg-s09',
      blockType: 'csNarrative',
      label: 'research',
      heading: l({
        en: 'Silver, for someone who buys small and learns by doing.',
        fa: 'نقره، برای کسی که کم می‌خرد و با تجربه یاد می‌گیرد.',
        ar: 'الفضة، لمن يشتري قليلًا ويتعلّم بالتجربة.',
        es: 'Plata, para alguien que compra poco y aprende haciendo.',
        de: 'Silber, für jemanden, der klein kauft und durch Ausprobieren lernt.',
        fr: 'L’argent, pour quelqu’un qui achète petit et apprend en faisant.',
        ja: '少額で買い、やりながら学ぶ人のための銀。',
      }),
      body: prose(
        dir,
        p({
          en: 'Silver came later, as an extension of the gold product, and it was designed around a composite persona rather than the original gold buyer: 27, a freelancer and decoration designer, with low investment knowledge, medium brand loyalty and a self-imposed cap of 20% of her savings in gold.',
          fa: 'نقره بعدتر و به‌عنوان توسعهٔ محصول طلا آمد و حول یک پرسونای ترکیبی طراحی شد، نه خریدار اولیهٔ طلا: ۲۷ ساله، فریلنسر و طراح دکوراسیون، با دانش سرمایه‌گذاری پایین، وفاداری متوسط به برند و سقف سرمایه‌گذاری ۲۰ درصد در طلا.',
          ar: 'جاءت الفضة لاحقًا توسعةً لمنتج الذهب، وصُمّمت حول شخصية مركّبة لا حول مشتري الذهب الأصلي: 27 عامًا، مستقلّة ومصمّمة ديكور، بمعرفة استثمارية منخفضة، وولاء متوسط للعلامة، وسقف ذاتي يبلغ 20% من مدّخراتها في الذهب.',
          es: 'La plata llegó después, como extensión del producto de oro, y se diseñó en torno a una persona compuesta y no al comprador original de oro: 27 años, freelance y diseñadora de interiores, con poco conocimiento de inversión, una fidelidad a la marca media y un límite autoimpuesto del 20 % de sus ahorros en oro.',
          de: 'Silber kam später, als Erweiterung des Goldprodukts, und wurde um eine zusammengesetzte Persona herum entworfen statt um die ursprünglichen Goldkäufer: 27, Freelancerin und Dekorationsdesignerin, mit geringem Anlagewissen, mittlerer Markentreue und einer selbst gesetzten Obergrenze von 20 % ihrer Ersparnisse in Gold.',
          fr: 'L’argent est arrivé plus tard, comme extension du produit or, et a été conçu autour d’une persona composite plutôt que de l’acheteur d’or d’origine : 27 ans, freelance et décoratrice, peu de connaissances en investissement, une fidélité moyenne à la marque et un plafond qu’elle s’impose de 20 % de son épargne en or.',
          ja: '銀は後から、金のプロダクトの拡張として加わった。設計の軸は元の金の購入者ではなく、合成ペルソナだ。27歳、フリーランスのインテリアデザイナー。投資の知識は少なく、ブランドへの忠誠心は中程度、貯蓄の20%までを金にするという自分なりの上限を持つ。',
        }),
        p({
          en: 'Her concerns were the ones the product already answered for gold — little knowledge of how the silver market works, doubts about the security of investing on a digital platform, and sensitivity to price swings. She follows friends’ recommendations and online ads, and tries a small purchase first.',
          fa: 'نگرانی‌هایش همان‌هایی بود که محصول برای طلا پاسخ داده بود — آگاهی کم از نحوهٔ کار بازار نقره، تردید دربارهٔ امنیت سرمایه‌گذاری در پلتفرم‌های دیجیتال و حساسیت به نوسان قیمت. به پیشنهاد دوستان و تبلیغات آنلاین توجه می‌کند و اول یک خرید کوچک را امتحان می‌کند.',
          ar: 'كانت مخاوفها هي نفسها التي أجاب عنها المنتج للذهب — معرفة محدودة بكيفية عمل سوق الفضة، وشكوك حول أمان الاستثمار في منصة رقمية، وحساسية لتقلّبات السعر. تتبع توصيات الأصدقاء والإعلانات عبر الإنترنت، وتجرّب شراءً صغيرًا أولًا.',
          es: 'Sus preocupaciones eran las que el producto ya respondía para el oro: poco conocimiento de cómo funciona el mercado de la plata, dudas sobre la seguridad de invertir en una plataforma digital y sensibilidad a las oscilaciones del precio. Se guía por recomendaciones de amigos y anuncios en línea, y prueba primero con una compra pequeña.',
          de: 'Ihre Bedenken waren die, die das Produkt für Gold schon beantwortete — wenig Wissen darüber, wie der Silbermarkt funktioniert, Zweifel an der Sicherheit digitaler Anlageplattformen und Empfindlichkeit gegenüber Preisschwankungen. Sie folgt Empfehlungen von Freunden und Online-Werbung und probiert zuerst einen kleinen Kauf.',
          fr: 'Ses inquiétudes étaient celles auxquelles le produit répondait déjà pour l’or : peu de connaissances sur le fonctionnement du marché de l’argent, des doutes sur la sécurité d’un investissement sur une plateforme numérique et une sensibilité aux variations de prix. Elle suit les recommandations de ses amis et les publicités en ligne, et commence par un petit achat.',
          ja: '彼女の懸念は、プロダクトがすでに金で答えていたものだった。銀市場の仕組みをよく知らないこと、デジタルプラットフォームで投資する安全性への不安、価格変動への敏感さ。友人の勧めやネット広告を参考にし、まず少額の購入から試す。',
        }),
        p({
          en: 'So silver arrived on the same rails: the same order flow and the same holdings card, behind a metal tab.',
          fa: 'پس نقره روی همان ریل‌ها آمد: همان جریان سفارش و همان کارت دارایی، پشت یک تب فلز.',
          ar: 'لذا جاءت الفضة على المسار نفسه: مسار الطلب نفسه وبطاقة الأصول نفسها، خلف تبويب للمعدن.',
          es: 'Así que la plata llegó por los mismos raíles: el mismo flujo de pedido y la misma tarjeta de activos, tras una pestaña de metal.',
          de: 'Also kam Silber auf denselben Schienen: derselbe Bestell-Flow und dieselbe Bestandskarte, hinter einem Metall-Tab.',
          fr: 'L’argent est donc arrivé sur les mêmes rails : le même parcours de commande et la même carte d’avoirs, derrière un onglet de métal.',
          ja: 'だから銀は同じ仕組みの上に載った。同じ注文フロー、同じ資産カードに、金属を選ぶタブを加えただけだ。',
        }),
      ),
      insight: l({
        en: 'The answer was a tab, not a second product.',
        fa: 'پاسخ یک تب بود، نه یک محصول دوم.',
        ar: 'كان الجواب تبويبًا، لا منتجًا ثانيًا.',
        es: 'La respuesta fue una pestaña, no un segundo producto.',
        de: 'Die Antwort war ein Tab, kein zweites Produkt.',
        fr: 'La réponse était un onglet, pas un second produit.',
        ja: '答えは2つ目のプロダクトではなく、ひとつのタブだった。',
      }),
    },
    {
      id: 'dg-s10',
      blockType: 'csFinding',
      kind: 'quote',
      text: l({
        en: '“Let’s just buy and see what happens!”',
        fa: '«حالا بخریم ببینیم چیمیشه؟!»',
        ar: '«لنشترِ الآن ونرَ ماذا سيحدث!»',
        es: '«¡Compremos y a ver qué pasa!»',
        de: '„Jetzt kaufen wir einfach und schauen, was passiert!“',
        fr: '« Achetons, on verra bien ce qui se passe ! »',
        ja: '「とりあえず買ってみて、どうなるか見てみよう！」',
      }),
      attribution: l({
        en: 'Silver persona (composite)',
        fa: 'پرسونای نقره (ترکیبی)',
        ar: 'شخصية الفضة (مركّبة)',
        es: 'Persona de la plata (compuesta)',
        de: 'Silber-Persona (zusammengesetzt)',
        fr: 'Persona argent (composite)',
        ja: '銀のペルソナ（合成）',
      }),
      method: l({
        en: 'Composite persona, not an interview',
        fa: 'پرسونای ترکیبی، نه مصاحبه',
        ar: 'شخصية مركّبة، لا مقابلة',
        es: 'Persona compuesta, no una entrevista',
        de: 'Zusammengesetzte Persona, kein Interview',
        fr: 'Persona composite, pas un entretien',
        ja: '合成ペルソナであり、インタビューではない',
      }),
    },
    {
      id: 'dg-s11',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'plain',
      items: item('personaCard', 'dg-f11-1'),
      caption: l({
        en: 'The persona card, in Persian: her line, goals, concerns, motivations and behaviours. Built for the silver extension — a composite, not a real customer.',
        fa: 'کارت پرسونا: جملهٔ همیشگی، اهداف، نگرانی‌ها، انگیزه‌ها و رفتارها. ساخته‌شده برای توسعهٔ نقره — یک پرسونای ترکیبی، نه یک مشتری واقعی.',
        ar: 'بطاقة الشخصية بالفارسية: عبارتها، وأهدافها، ومخاوفها، ودوافعها، وسلوكياتها. صُنعت لتوسعة الفضة — شخصية مركّبة، لا عميلة حقيقية.',
        es: 'La ficha de persona, en persa: su frase, objetivos, preocupaciones, motivaciones y comportamientos. Hecha para la extensión a la plata: una persona compuesta, no una clienta real.',
        de: 'Die Persona-Karte, auf Persisch: ihr Satz, Ziele, Bedenken, Motivationen und Verhaltensweisen. Erstellt für die Silber-Erweiterung — zusammengesetzt, keine echte Kundin.',
        fr: 'La fiche persona, en persan : sa phrase, ses objectifs, ses inquiétudes, ses motivations et ses comportements. Créée pour l’extension à l’argent — une persona composite, pas une vraie cliente.',
        ja: 'ペルシア語のペルソナカード：口癖、目標、懸念、動機、行動。銀への拡張のために作った合成ペルソナで、実在の顧客ではない。',
      }),
    },
    {
      id: 'dg-s12',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: l({
        en: 'Growth',
        fa: 'رشد',
        ar: 'النمو',
        es: 'Crecimiento',
        de: 'Wachstum',
        fr: 'Croissance',
        ja: 'グロース',
      }),
      heading: l({
        en: 'Four ways in: the product, a story, a campaign, an HR department.',
        fa: 'چهار راه ورود: محصول، یک استوری، یک کمپین، یک واحد منابع انسانی.',
        ar: 'أربعة مداخل: المنتج، وقصة، وحملة، وقسم موارد بشرية.',
        es: 'Cuatro puertas de entrada: el producto, una story, una campaña y un departamento de RR. HH.',
        de: 'Vier Wege hinein: das Produkt, eine Story, eine Kampagne, eine Personalabteilung.',
        fr: 'Quatre portes d’entrée : le produit, une story, une campagne, un service RH.',
        ja: '4つの入口：プロダクト、ストーリー、キャンペーン、人事部。',
      }),
      body: prose(
        dir,
        p({
          en: 'An onboarding story on digikala.com/gold walks the three questions in four slides — what it is, buying from one milligram, fast liquidity and physical backing — and ends on Start buying gold.',
          fa: 'یک استوری آشنایی در digikala.com/gold آن سه پرسش را در چهار اسلاید مرور می‌کند — اینکه چیست، خرید از یک میلی‌گرم، نقدشوندگی سریع و پشتوانهٔ فیزیکی — و با «شروع خرید طلا» تمام می‌شود.',
          ar: 'تمرّ قصة تعريفية على digikala.com/gold بالأسئلة الثلاثة في أربع شرائح — ما هو المنتج، والشراء من مليغرام واحد، والسيولة السريعة، والغطاء المادي — وتنتهي بزر «ابدأ شراء الذهب».',
          es: 'Una story de bienvenida en digikala.com/gold recorre las tres preguntas en cuatro diapositivas —qué es, comprar desde un miligramo, liquidez rápida y respaldo físico— y termina en «Empezar a comprar oro».',
          de: 'Eine Onboarding-Story auf digikala.com/gold führt in vier Slides durch die drei Fragen — was es ist, Kauf ab einem Milligramm, schnelle Liquidität und physische Deckung — und endet bei „Gold kaufen starten“.',
          fr: 'Une story d’accueil sur digikala.com/gold parcourt les trois questions en quatre diapositives — ce que c’est, l’achat dès un milligramme, la liquidité rapide et l’adossement physique — et se termine sur « Commencer à acheter de l’or ».',
          ja: 'digikala.com/goldのオンボーディングストーリーは、4枚のスライドで3つの問いをたどる。何なのか、1ミリグラムから買えること、すばやく現金化できること、現物の裏付け。そして「金の購入を始める」で終わる。',
        }),
        p({
          en: 'Consumer campaigns ran on DigiPay: one creative sold zero fee and installment purchase together. A corporate-welfare offer took the Non-Inventory range to HR departments — brand-basket credit, employee loans and occasion packages, across a 16-partner marketplace.',
          fa: 'کمپین‌های مصرف‌کننده روی دیجی‌پی اجرا شدند: یک کریتیو کارمزد صفر و خرید قسطی را با هم عرضه می‌کرد. پیشنهاد خدمات رفاهی سازمانی هم سبد Non-Inventory را به واحدهای منابع انسانی برد — اعتبار سبد برندها، وام کارکنان و بسته‌های مناسبتی، در بازاری با ۱۶ همکار.',
          ar: 'نُفّذت حملات المستهلكين على DigiPay: تصميم واحد عرض الرسوم الصفرية والشراء بالتقسيط معًا. وحمل عرض الرفاه المؤسسي مجموعة Non-Inventory إلى أقسام الموارد البشرية — رصيد لسلّة العلامات، وقروض للموظفين، وباقات للمناسبات، عبر سوق من 16 شريكًا.',
          es: 'Las campañas para consumidores se lanzaron en DigiPay: una misma creatividad vendía comisión cero y compra a plazos. Una oferta de bienestar corporativo llevó la gama Non-Inventory a los departamentos de RR. HH.: crédito para una cesta de marcas, préstamos a empleados y lotes para fechas señaladas, en un marketplace de 16 socios.',
          de: 'Die Kampagnen für Privatkunden liefen über DigiPay: Ein Creative verkaufte null Gebühren und Ratenkauf zugleich. Ein Angebot für betriebliche Sozialleistungen brachte das Non-Inventory-Sortiment zu Personalabteilungen — Guthaben für einen Markenkorb, Mitarbeiterdarlehen und Anlasspakete, über einen Marktplatz mit 16 Partnern.',
          fr: 'Les campagnes grand public passaient par DigiPay : un même visuel vendait le zéro frais et l’achat en plusieurs fois. Une offre d’avantages salariés a porté la gamme Non-Inventory auprès des services RH — crédit sur un panier de marques, prêts aux salariés et coffrets d’occasion, sur une place de marché de 16 partenaires.',
          ja: '個人向けキャンペーンはDigiPay上で展開した。ひとつのクリエイティブで手数料ゼロと分割購入を同時に打ち出した。法人向け福利厚生の提案では、Non-Inventoryの品揃えを人事部に届けた。ブランドバスケットのクレジット、従業員ローン、季節のギフトセットを、16社のパートナーによるマーケットプレイスで提供した。',
        }),
        p({
          en: 'Targeting ran on a segmentation model built on assets, demographics and behaviour, and event-driven flows sent the next message on what people actually did. Gold-backed credit was proposed alongside, as a concept; it did not ship.',
          fa: 'هدف‌گیری بر پایهٔ یک مدل بخش‌بندی بر اساس دارایی، جمعیت‌شناسی و رفتار انجام می‌شد و جریان‌های رویدادمحور پیام بعدی را بر اساس کاری که آدم‌ها واقعاً می‌کردند می‌فرستادند. اعتبار با پشتوانهٔ طلا هم در کنارش به‌عنوان یک کانسپت پیشنهاد شد؛ عرضه نشد.',
          ar: 'اعتمد الاستهداف على نموذج تقسيم مبني على الأصول والديموغرافيا والسلوك، وكانت مسارات قائمة على الأحداث ترسل الرسالة التالية بحسب ما فعله الناس فعلًا. واقتُرح الائتمان المضمون بالذهب إلى جانب ذلك كمفهوم؛ ولم يُطلق.',
          es: 'La segmentación se basaba en un modelo construido sobre activos, datos demográficos y comportamiento, y flujos basados en eventos enviaban el siguiente mensaje según lo que la gente hacía de verdad. En paralelo se propuso el crédito respaldado por oro, como concepto; no se lanzó.',
          de: 'Das Targeting lief über ein Segmentierungsmodell auf Basis von Bestand, Demografie und Verhalten, und ereignisgesteuerte Flows schickten die nächste Nachricht nach dem, was Menschen tatsächlich taten. Goldgedeckter Kredit wurde daneben als Konzept vorgeschlagen; er ging nicht live.',
          fr: 'Le ciblage reposait sur un modèle de segmentation fondé sur les avoirs, la démographie et le comportement, et des parcours déclenchés par des événements envoyaient le message suivant selon ce que les gens faisaient vraiment. Un crédit adossé à l’or a été proposé en parallèle, comme concept ; il n’a pas été lancé.',
          ja: 'ターゲティングは、資産・属性・行動にもとづくセグメンテーションモデルで行い、イベント駆動のフローが、人が実際にとった行動に応じて次のメッセージを送った。金を担保にした与信もあわせてコンセプトとして提案したが、リリースはされていない。',
        }),
      ),
    },
    {
      id: 'dg-s13',
      blockType: 'csFigure',
      layout: 'sequence',
      treatment: 'screen',
      items: [
        ...item('slide1', 'dg-f13-1'),
        ...item('slide2', 'dg-f13-2'),
        ...item('slide3', 'dg-f13-3'),
        ...item('slide4', 'dg-f13-4'),
      ],
      caption: l({
        en: 'The four onboarding slides: what it is, how little you can buy, how fast you can sell, and who holds the metal.',
        fa: 'چهار اسلاید آشنایی: چیست، چقدر کم می‌شود خرید، چقدر سریع می‌شود فروخت و فلز را چه کسی نگه می‌دارد.',
        ar: 'شرائح التعريف الأربع: ما هو، وكم يمكن أن تشتري قليلًا، وبأي سرعة تبيع، ومن يحفظ المعدن.',
        es: 'Las cuatro diapositivas de bienvenida: qué es, qué poco se puede comprar, qué rápido se puede vender y quién guarda el metal.',
        de: 'Die vier Onboarding-Slides: was es ist, wie wenig man kaufen kann, wie schnell man verkaufen kann und wer das Metall verwahrt.',
        fr: 'Les quatre diapositives d’accueil : ce que c’est, le peu qu’on peut acheter, la vitesse à laquelle on peut vendre et qui garde le métal.',
        ja: '4枚のオンボーディングスライド：何なのか、どれだけ少額で買えるか、どれだけ早く売れるか、金属を誰が保管するか。',
      }),
    },
    {
      id: 'dg-s14',
      blockType: 'csFigure',
      layout: 'annotated',
      treatment: 'plain',
      items: item('zeroFee', 'dg-f14-1'),
      annotations: [
        {
          id: 'dg-a14-1',
          text: l({
            en: 'DigiPay-branded: the campaign ran on Digikala’s payment wallet',
            fa: 'با برند دیجی‌پی: کمپین روی کیف پول پرداخت دیجی‌کالا اجرا شد',
            ar: 'بعلامة DigiPay: جرت الحملة على محفظة الدفع التابعة لديجيكالا',
            es: 'Con la marca DigiPay: la campaña corrió sobre el monedero de pagos de Digikala',
            de: 'Unter der Marke DigiPay: Die Kampagne lief über Digikalas Payment-Wallet',
            fr: 'Aux couleurs de DigiPay : la campagne passait par le portefeuille de paiement de Digikala',
            ja: 'DigiPayブランド：キャンペーンはDigikalaの決済ウォレット上で展開',
          }),
        },
        {
          id: 'dg-a14-2',
          text: l({
            en: '“Digital gold, with installment purchase”',
            fa: '«طلای دیجیتال همراه با امکان خرید قسطی»',
            ar: '«الذهب الرقمي مع إمكانية الشراء بالتقسيط»',
            es: '«Oro digital, con compra a plazos»',
            de: '„Digitales Gold, mit Ratenkauf“',
            fr: '« L’or numérique, avec achat en plusieurs fois »',
            ja: '「分割購入もできるデジタルゴールド」',
          }),
        },
        {
          id: 'dg-a14-3',
          text: l({
            en: '“Zero fee until the end of Friday, 3 Mordad”',
            fa: '«کارمزد صفر تا پایان روز جمعه ۳ مرداد»',
            ar: '«بلا رسوم حتى نهاية يوم الجمعة 3 مرداد»',
            es: '«Comisión cero hasta el final del viernes 3 de mordad»',
            de: '„Keine Gebühr bis Ende Freitag, 3. Mordad“',
            fr: '« Zéro frais jusqu’à la fin du vendredi 3 mordad »',
            ja: '「モルダード月3日（金）終日まで手数料ゼロ」',
          }),
        },
      ],
      caption: l({
        en: 'One story creative, two offers: zero fee and installments.',
        fa: 'یک کریتیو استوری، دو پیشنهاد: کارمزد صفر و خرید قسطی.',
        ar: 'تصميم قصة واحد، وعرضان: بلا رسوم، وبالتقسيط.',
        es: 'Una creatividad de story, dos ofertas: comisión cero y compra a plazos.',
        de: 'Ein Story-Creative, zwei Angebote: keine Gebühr und Ratenkauf.',
        fr: 'Un visuel story, deux offres : zéro frais et paiement en plusieurs fois.',
        ja: 'ひとつのストーリー広告に2つのオファー：手数料ゼロと分割購入。',
      }),
    },
    {
      id: 'dg-s15',
      blockType: 'csFigure',
      layout: 'sequence',
      treatment: 'plain',
      items: [
        ...item('brochure1', 'dg-f15-1'),
        ...item('brochure2', 'dg-f15-2'),
        ...item('brochure3', 'dg-f15-3'),
        ...item('brochure4', 'dg-f15-4'),
      ],
      caption: l({
        en: 'The corporate-welfare brochure: the cover, four value propositions, the sixteen partners and the service lines.',
        fa: 'بروشور خدمات رفاهی سازمانی: جلد، چهار ارزش پیشنهادی، شانزده برند همکار و خطوط خدمت.',
        ar: 'كتيّب الرفاه المؤسسي: الغلاف، وأربع قيم مقترحة، والشركاء الستة عشر، وخطوط الخدمة.',
        es: 'El folleto de bienestar corporativo: la portada, cuatro propuestas de valor, los dieciséis socios y las líneas de servicio.',
        de: 'Die Broschüre für betriebliche Sozialleistungen: Titel, vier Nutzenversprechen, die sechzehn Partner und die Leistungsbereiche.',
        fr: 'La brochure avantages salariés : la couverture, quatre propositions de valeur, les seize partenaires et les offres.',
        ja: '法人向け福利厚生パンフレット：表紙、4つの価値提案、16のパートナー、サービス内容。',
      }),
    },
    {
      id: 'dg-s16',
      blockType: 'csOutcomes',
      heading: l({
        en: 'What the weekly review showed',
        fa: 'آنچه مرور هفتگی نشان داد',
        ar: 'ما أظهرته المراجعة الأسبوعية',
        es: 'Lo que mostró la revisión semanal',
        de: 'Was das wöchentliche Review zeigte',
        fr: 'Ce que montrait la revue hebdomadaire',
        ja: '週次レビューが示したこと',
      }),
      intro: l({
        en: 'These are the Non-Inventory unit’s Q1 results against plan, from the weekly business review this role built. Only achievement is published — the absolute figures are Digikala’s — and they describe the unit, not the effect of any one design. The dashboards behind the review replaced the campaign spreadsheets and tracked NMV, CTR, CPC and conversion.',
        fa: 'این‌ها نتایج فصل اول واحد Non-Inventory نسبت به برنامه‌اند، از مرور هفتگی کسب‌وکاری که این نقش ساخت. فقط درصد تحقق منتشر می‌شود — عددهای مطلق متعلق به دیجی‌کالاست — و این‌ها وضعیت واحد را توصیف می‌کنند، نه اثر یک طراحی خاص را. داشبوردهای پشت این مرور جای اسپردشیت‌های کمپین را گرفتند و NMV، CTR، CPC و نرخ تبدیل را دنبال می‌کردند.',
        ar: 'هذه نتائج وحدة Non-Inventory في الربع الأول مقارنة بالخطة، من المراجعة الأسبوعية للأعمال التي بناها هذا الدور. تُنشر نسب التحقيق فقط — فالأرقام المطلقة ملك ديجيكالا — وهي تصف الوحدة، لا أثر تصميم بعينه. وحلّت اللوحات التي تغذّي المراجعة محل جداول الحملات، وتابعت NMV وCTR وCPC ومعدّل التحويل.',
        es: 'Son los resultados del T1 de la unidad Non-Inventory frente al plan, sacados de la revisión semanal de negocio que construyó este rol. Solo se publica el cumplimiento —las cifras absolutas son de Digikala— y describen la unidad, no el efecto de un diseño concreto. Los dashboards detrás de la revisión sustituyeron las hojas de cálculo de campañas y seguían NMV, CTR, CPC y conversión.',
        de: 'Das sind die Q1-Ergebnisse der Non-Inventory-Unit gegenüber dem Plan, aus dem wöchentlichen Business-Review, das diese Rolle aufgebaut hat. Veröffentlicht wird nur die Zielerreichung — die absoluten Zahlen gehören Digikala —, und sie beschreiben die Unit, nicht die Wirkung eines einzelnen Designs. Die Dashboards hinter dem Review ersetzten die Kampagnen-Spreadsheets und verfolgten NMV, CTR, CPC und Conversion.',
        fr: 'Voici les résultats du T1 de l’unité Non-Inventory par rapport au plan, tirés de la revue hebdomadaire construite dans ce rôle. Seul le taux d’atteinte est publié — les chiffres absolus appartiennent à Digikala — et ils décrivent l’unité, pas l’effet d’un design en particulier. Les tableaux de bord derrière la revue ont remplacé les tableurs de campagne et suivaient NMV, CTR, CPC et conversion.',
        ja: 'これはNon-Inventory部門のQ1の計画比の結果で、この役割で構築した週次ビジネスレビューから引いたものだ。公開するのは達成率だけで、絶対値はDigikalaのものだ。また、これは部門全体の数字であり、特定のデザインの効果を示すものではない。レビューを支えるダッシュボードはキャンペーンのスプレッドシートに代わり、NMV、CTR、CPC、コンバージョン率を追跡した。',
      }),
      items: [
        {
          id: 'dg-o01',
          kind: 'delivered',
          label: l({
            en: '42 screens across order, holdings and profile, at two widths',
            fa: '۴۲ صفحه در سفارش، دارایی و پروفایل، در دو عرض',
            ar: '42 شاشة عبر الطلب والأصول والملف الشخصي، بعرضين',
            es: '42 pantallas de pedido, activos y perfil, en dos anchos',
            de: '42 Screens für Bestellung, Bestand und Profil, in zwei Breiten',
            fr: '42 écrans de commande, d’avoirs et de profil, en deux largeurs',
            ja: '注文・資産・プロフィールの42画面、2つの幅で',
          }),
          context: l({
            en: '21 states, each drawn at desktop and at mobile — failure included.',
            fa: '۲۱ حالت، هرکدام در دسکتاپ و موبایل — از جمله شکست.',
            ar: '21 حالة، كلٌّ منها لسطح المكتب وللهاتف — بما في ذلك الفشل.',
            es: '21 estados, cada uno en escritorio y en móvil, incluido el fallo.',
            de: '21 Zustände, jeder für Desktop und Mobile — das Scheitern eingeschlossen.',
            fr: '21 états, chacun sur bureau et sur mobile — échec compris.',
            ja: '21の状態を、失敗も含めてデスクトップとモバイルで描いた。',
          }),
          source: l({
            en: 'Figma — Gold & Silver | Main',
            fa: 'Figma — فایل Gold & Silver | Main',
            ar: 'Figma — ملف Gold & Silver | Main',
            es: 'Figma — archivo Gold & Silver | Main',
            de: 'Figma — Datei Gold & Silver | Main',
            fr: 'Figma — fichier Gold & Silver | Main',
            ja: 'Figma — Gold & Silver | Main ファイル',
          }),
        },
        {
          id: 'dg-o02',
          kind: 'measured',
          value: '121–145%',
          label: l({
            en: 'Contribution profit against plan',
            fa: 'سود مشارکت نسبت به برنامه',
            ar: 'ربح المساهمة مقارنة بالخطة',
            es: 'Margen de contribución frente al plan',
            de: 'Deckungsbeitrag gegenüber Plan',
            fr: 'Marge de contribution par rapport au plan',
            ja: '貢献利益の計画比',
          }),
          context: l({
            en: 'PC1 121%, PC2 130%, PC3 145% — above plan at all three margin tiers.',
            fa: 'PC1 ۱۲۱٪، PC2 ۱۳۰٪، PC3 ۱۴۵٪ — بالاتر از برنامه در هر سه سطح حاشیه.',
            ar: 'PC1 121% وPC2 130% وPC3 145% — فوق الخطة في مستويات الهامش الثلاثة.',
            es: 'PC1 121 %, PC2 130 %, PC3 145 %: por encima del plan en los tres niveles de margen.',
            de: 'PC1 121 %, PC2 130 %, PC3 145 % — über Plan auf allen drei Margenstufen.',
            fr: 'PC1 121 %, PC2 130 %, PC3 145 % — au-dessus du plan aux trois niveaux de marge.',
            ja: 'PC1 121%、PC2 130%、PC3 145%。3つのマージン階層すべてで計画を上回った。',
          }),
          source: l(REVIEW_SOURCE),
        },
        {
          id: 'dg-o03',
          kind: 'measured',
          value: '97%',
          label: l({
            en: 'NMV against plan',
            fa: 'NMV نسبت به برنامه',
            ar: 'NMV مقارنة بالخطة',
            es: 'NMV frente al plan',
            de: 'NMV gegenüber Plan',
            fr: 'NMV par rapport au plan',
            ja: 'NMVの計画比',
          }),
          context: l({
            en: 'Net merchandise value landed just under plan.',
            fa: 'ارزش خالص کالای فروخته‌شده کمی پایین‌تر از برنامه ماند.',
            ar: 'جاءت القيمة الصافية للبضائع دون الخطة بقليل.',
            es: 'El valor neto de mercancía quedó justo por debajo del plan.',
            de: 'Der Netto-Warenwert landete knapp unter Plan.',
            fr: 'La valeur nette des marchandises est restée juste sous le plan.',
            ja: '純取扱高は計画をわずかに下回った。',
          }),
          source: l(REVIEW_SOURCE),
        },
        {
          id: 'dg-o04',
          kind: 'measured',
          value: '91%',
          label: l({
            en: 'PBT against plan',
            fa: 'PBT نسبت به برنامه',
            ar: 'PBT مقارنة بالخطة',
            es: 'PBT frente al plan',
            de: 'PBT gegenüber Plan',
            fr: 'PBT par rapport au plan',
            ja: 'PBTの計画比',
          }),
          context: l({
            en: 'Profit before tax came in below plan.',
            fa: 'سود پیش از مالیات پایین‌تر از برنامه بود.',
            ar: 'جاء الربح قبل الضريبة دون الخطة.',
            es: 'El beneficio antes de impuestos quedó por debajo del plan.',
            de: 'Der Gewinn vor Steuern lag unter Plan.',
            fr: 'Le résultat avant impôt est ressorti sous le plan.',
            ja: '税引前利益は計画を下回った。',
          }),
          source: l(REVIEW_SOURCE),
        },
      ],
      shipped: l({
        en: [
          'Order, holdings and profile, at desktop and mobile',
          'The silver extension',
          'The four-slide onboarding story',
          'The zero-fee and installment campaign',
          'The corporate-welfare offer',
          'The weekly business review and its dashboards',
        ],
        fa: [
          'سفارش، دارایی و پروفایل، در دسکتاپ و موبایل',
          'توسعهٔ نقره',
          'استوری آشنایی چهاراسلایدی',
          'کمپین کارمزد صفر و خرید قسطی',
          'پیشنهاد خدمات رفاهی سازمانی',
          'مرور هفتگی کسب‌وکار و داشبوردهایش',
        ],
        ar: [
          'الطلب والأصول والملف الشخصي، لسطح المكتب والهاتف',
          'توسعة الفضة',
          'القصة التعريفية ذات الشرائح الأربع',
          'حملة الرسوم الصفرية والتقسيط',
          'عرض الرفاه المؤسسي',
          'المراجعة الأسبوعية للأعمال ولوحاتها',
        ],
        es: [
          'Pedido, activos y perfil, en escritorio y móvil',
          'La extensión a la plata',
          'La story de bienvenida de cuatro diapositivas',
          'La campaña de comisión cero y compra a plazos',
          'La oferta de bienestar corporativo',
          'La revisión semanal de negocio y sus dashboards',
        ],
        de: [
          'Bestellung, Bestand und Profil, für Desktop und Mobile',
          'Die Silber-Erweiterung',
          'Die Onboarding-Story mit vier Slides',
          'Die Kampagne für null Gebühren und Ratenkauf',
          'Das Angebot für betriebliche Sozialleistungen',
          'Das wöchentliche Business-Review und seine Dashboards',
        ],
        fr: [
          'Commande, avoirs et profil, sur bureau et mobile',
          'L’extension à l’argent',
          'La story d’accueil en quatre diapositives',
          'La campagne zéro frais et paiement en plusieurs fois',
          'L’offre d’avantages salariés',
          'La revue hebdomadaire et ses tableaux de bord',
        ],
        ja: [
          '注文・資産・プロフィール（デスクトップとモバイル）',
          '銀への拡張',
          '4枚構成のオンボーディングストーリー',
          '手数料ゼロと分割購入のキャンペーン',
          '法人向け福利厚生の提案',
          '週次ビジネスレビューとそのダッシュボード',
        ],
      }),
    },
    {
      id: 'dg-s17',
      blockType: 'csFigure',
      layout: 'annotated',
      treatment: 'plain',
      items: item('review', 'dg-f17-1'),
      annotations: [
        {
          id: 'dg-a17-1',
          text: l({
            en: 'NMV — net merchandise value, the value of everything sold',
            fa: 'NMV — ارزش خالص کالای فروخته‌شده',
            ar: 'NMV — القيمة الصافية للبضائع المبيعة',
            es: 'NMV: valor neto de la mercancía vendida',
            de: 'NMV — Netto-Warenwert, der Wert alles Verkauften',
            fr: 'NMV — valeur nette des marchandises vendues',
            ja: 'NMV——純取扱高。販売したすべての価値',
          }),
        },
        {
          id: 'dg-a17-2',
          text: l({
            en: 'PC1–PC3 — contribution profit at three margin tiers',
            fa: 'PC1 تا PC3 — سود مشارکت در سه سطح حاشیه',
            ar: 'PC1–PC3 — ربح المساهمة في ثلاثة مستويات للهامش',
            es: 'PC1–PC3: margen de contribución en tres niveles',
            de: 'PC1–PC3 — Deckungsbeitrag auf drei Margenstufen',
            fr: 'PC1–PC3 — marge de contribution à trois niveaux',
            ja: 'PC1〜PC3——3段階のマージンでの貢献利益',
          }),
        },
        {
          id: 'dg-a17-3',
          text: l({
            en: 'PBT — profit before tax',
            fa: 'PBT — سود پیش از مالیات',
            ar: 'PBT — الربح قبل الضريبة',
            es: 'PBT: beneficio antes de impuestos',
            de: 'PBT — Gewinn vor Steuern',
            fr: 'PBT — résultat avant impôt',
            ja: 'PBT——税引前利益',
          }),
        },
        {
          id: 'dg-a17-4',
          text: l({
            en: 'Achievement only: actual and target are withheld',
            fa: 'فقط درصد تحقق: مقدار واقعی و هدف منتشر نمی‌شود',
            ar: 'نسب التحقيق فقط: القيم الفعلية والمستهدفة محجوبة',
            es: 'Solo el cumplimiento: los valores reales y objetivo no se publican',
            de: 'Nur die Zielerreichung: Ist- und Zielwerte bleiben unveröffentlicht',
            fr: 'Taux d’atteinte seulement : réel et objectif ne sont pas publiés',
            ja: '達成率のみ：実績値と目標値は非公開',
          }),
        },
      ],
      caption: l({
        en: 'The Q1 snapshot as published here: the achievement column alone.',
        fa: 'نمای فصل اول به همان شکلی که اینجا منتشر می‌شود: فقط ستون درصد تحقق.',
        ar: 'لقطة الربع الأول كما تُنشر هنا: عمود نسب التحقيق وحده.',
        es: 'El resumen del T1 tal como se publica aquí: solo la columna de cumplimiento.',
        de: 'Der Q1-Snapshot, wie er hier erscheint: nur die Spalte der Zielerreichung.',
        fr: 'L’instantané du T1 tel que publié ici : la seule colonne du taux d’atteinte.',
        ja: 'ここで公開するQ1スナップショット：達成率の列のみ。',
      }),
    },
    {
      id: 'dg-s18',
      blockType: 'csLessons',
      items: [
        {
          id: 'dg-l01',
          title: l({
            en: 'A visible countdown buys more trust than a reassuring sentence.',
            fa: 'یک شمارش معکوسِ قابل‌دیدن بیش از یک جملهٔ اطمینان‌بخش اعتماد می‌خرد.',
            ar: 'العدّاد التنازلي الظاهر يكسب ثقة أكثر من جملة مطمئِنة.',
            es: 'Una cuenta atrás visible genera más confianza que una frase tranquilizadora.',
            de: 'Ein sichtbarer Countdown schafft mehr Vertrauen als ein beruhigender Satz.',
            fr: 'Un compte à rebours visible inspire plus confiance qu’une phrase rassurante.',
            ja: '目に見えるカウントダウンは、安心させる一文より信頼を生む。',
          }),
          body: l({
            en: 'The price could have said it was fair. The timer showed that it was live and when it would change — and left the moment to commit with the user.',
            fa: 'قیمت می‌توانست بگوید منصفانه است. تایمر نشان داد که زنده است و کی تغییر می‌کند — و لحظهٔ تایید را به خود کاربر سپرد.',
            ar: 'كان بإمكان السعر أن يقول إنه عادل. أما العدّاد فأظهر أنه حيّ ومتى سيتغيّر — وترك لحظة التأكيد للمستخدم.',
            es: 'El precio podría haber dicho que era justo. El temporizador mostró que estaba vivo y cuándo cambiaría, y dejó en manos del usuario el momento de confirmar.',
            de: 'Der Preis hätte behaupten können, fair zu sein. Der Timer zeigte, dass er live war und wann er sich ändert — und überließ den Moment der Bestätigung dem Nutzer.',
            fr: 'Le prix aurait pu dire qu’il était juste. Le minuteur a montré qu’il était vivant et quand il changerait — et a laissé à l’utilisateur le moment de valider.',
            ja: '価格は「公正です」と言うこともできた。タイマーは価格が生きていること、いつ変わるかを示し、確定のタイミングをユーザーに委ねた。',
          }),
        },
        {
          id: 'dg-l02',
          title: l({
            en: 'A segmentation model is worth only what the trigger downstream does with it.',
            fa: 'ارزش یک مدل بخش‌بندی فقط به کاری است که محرکِ بعد از آن با آن می‌کند.',
            ar: 'لا يساوي نموذج التقسيم إلا ما يفعله به المُحفِّز الذي يليه.',
            es: 'Un modelo de segmentación vale lo que haga con él el disparador que viene después.',
            de: 'Ein Segmentierungsmodell ist nur so viel wert wie der Trigger, der danach damit arbeitet.',
            fr: 'Un modèle de segmentation ne vaut que ce qu’en fait le déclencheur en aval.',
            ja: 'セグメンテーションモデルの価値は、その後のトリガーがそれで何をするかで決まる。',
          }),
          body: l({
            en: 'Segments on assets, demographics and behaviour mattered once an event-driven flow acted on them. A segment nobody messages is a report.',
            fa: 'بخش‌ها بر پایهٔ دارایی، جمعیت‌شناسی و رفتار وقتی اهمیت پیدا کردند که یک جریان رویدادمحور بر اساسشان عمل کرد. بخشی که کسی به آن پیام نمی‌دهد، فقط یک گزارش است.',
            ar: 'اكتسبت الشرائح القائمة على الأصول والديموغرافيا والسلوك أهميتها حين تصرّف مسار قائم على الأحداث بناءً عليها. الشريحة التي لا يراسلها أحد مجرّد تقرير.',
            es: 'Los segmentos por activos, datos demográficos y comportamiento importaron cuando un flujo basado en eventos actuó sobre ellos. Un segmento al que nadie escribe es un informe.',
            de: 'Segmente nach Bestand, Demografie und Verhalten zählten erst, als ein ereignisgesteuerter Flow auf sie reagierte. Ein Segment, dem niemand schreibt, ist ein Report.',
            fr: 'Les segments par avoirs, démographie et comportement ont compté dès qu’un parcours déclenché par des événements a agi sur eux. Un segment à qui personne n’écrit n’est qu’un rapport.',
            ja: '資産・属性・行動によるセグメントが意味を持ったのは、イベント駆動のフローがそれに基づいて動いたときだった。誰にもメッセージを送らないセグメントは、ただのレポートだ。',
          }),
        },
        {
          id: 'dg-l03',
          title: l({
            en: 'The dashboard’s real product was one shared set of numbers.',
            fa: 'محصول واقعی داشبورد یک مجموعه عددِ مشترک بود.',
            ar: 'كان المنتج الحقيقي للوحة مجموعة أرقام مشتركة واحدة.',
            es: 'El verdadero producto del dashboard era un único conjunto de cifras compartido.',
            de: 'Das eigentliche Produkt des Dashboards war ein gemeinsamer Satz Zahlen.',
            fr: 'Le vrai produit du tableau de bord, c’était un seul jeu de chiffres partagé.',
            ja: 'ダッシュボードの本当のプロダクトは、共有されたひとつの数字だった。',
          }),
          body: l({
            en: 'Replacing the spreadsheets gave product, marketing and PR the same NMV, CTR, CPC and conversion to argue from. The charts were the least of it.',
            fa: 'جایگزین‌کردن اسپردشیت‌ها به محصول، بازاریابی و روابط عمومی همان NMV، CTR، CPC و نرخ تبدیل را داد تا بر سرش بحث کنند. نمودارها کم‌اهمیت‌ترین بخشش بودند.',
            ar: 'منح استبدال جداول البيانات فرقَ المنتج والتسويق والعلاقات العامة الأرقام نفسها من NMV وCTR وCPC ومعدّل التحويل للنقاش حولها. أما الرسوم البيانية فكانت أقل ما في الأمر.',
            es: 'Sustituir las hojas de cálculo dio a producto, marketing y relaciones públicas el mismo NMV, CTR, CPC y conversión sobre los que discutir. Los gráficos eran lo de menos.',
            de: 'Die Spreadsheets abzulösen gab Produkt, Marketing und PR dieselben Werte für NMV, CTR, CPC und Conversion als Diskussionsgrundlage. Die Charts waren das Geringste daran.',
            fr: 'Remplacer les tableurs a donné au produit, au marketing et aux relations presse les mêmes NMV, CTR, CPC et taux de conversion pour débattre. Les graphiques étaient le moindre des enjeux.',
            ja: 'スプレッドシートを置き換えたことで、プロダクト、マーケティング、PRが同じNMV、CTR、CPC、コンバージョン率をもとに議論できるようになった。グラフはおまけにすぎない。',
          }),
        },
      ],
    },
  ]
}

// ── Assembly ────────────────────────────────────────────────────────────────────────────────

/** Localized project fields for one locale — everything a `fallback: false` site needs filled. */
export function dgLocalizedFields(locale: Locale, media: DgMediaIds) {
  const l = <T>(value: L<T>): T => value[locale]
  return {
    ...archiveText(locale),
    statement: l(STATEMENT),
    industry: l(INDUSTRY),
    team: l(TEAM),
    hero: {
      items: (['heroOrder', 'heroHoldings', 'heroHistory'] as const)
        .filter((key) => media[key])
        .map((key, i) => ({ id: `dg-h0${i + 1}`, media: media[key]! })),
      caption: l(HERO_CAPTION),
    },
    snapshot: { problem: l(SNAPSHOT.problem), role: l(SNAPSHOT.role), result: l(SNAPSHOT.result) },
    sections: dgSections(locale, media),
    meta: {
      title: l(META_TITLE),
      description: archiveText(locale).summary,
      ...(media.matrix ? { image: media.matrix } : {}),
    },
  }
}

/** Shared (non-localized) case-study fields. No `period`: the Digikala dates are not confirmed. */
export const DG_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  projectStatus: 'shipped',
  tools: ['Figma'],
}
