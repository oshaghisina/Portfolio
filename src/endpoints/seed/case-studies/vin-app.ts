import type { Project } from '@/payload-types'

import { paragraph, prose, type TextDirection } from './lexical'
import { LOCALES, type Locale } from '@/utilities/locale'

import { projectCompanyCopy, projectRoleCopy, projectTextCopy } from '../project-copy'
import type { MediaSpec } from '../media'
import { VIN_SCREEN_MEDIA, type VinScreenMediaKey, vinScreenSections } from './vin-app-screens'

/**
 * VIN — a connection-first networking app for Dubai's professional community. Every sentence
 * traces to `Docs/Experience/Projects/vin-app/README.md`; the project is pre-launch (design and
 * strategy work, audited against a running app built by a separate development team), so outcomes
 * are a mix of delivered design artifacts and a documented gap between the onboarding's promises
 * and the screens that exist. English is the source; the other six locales are machine-drafted
 * twins flagged `translationReviewed: false` until a native review.
 *
 * Row ids are deterministic (`vin-s01`, `vin-d01` …) and identical in every locale payload, so
 * Payload merges each locale's copy into the same block rows instead of creating new ones.
 */
export const VIN_SLUG = 'vin-app'
export const VIN_ASSETS = 'Docs/Experience/Projects/vin-app/assets'
export const SEED_LOCALES = LOCALES

const DIRECTION: Record<Locale, TextDirection> = {
  en: 'ltr',
  fa: 'rtl',
  ar: 'rtl',
  es: 'ltr',
  de: 'ltr',
  fr: 'ltr',
  ja: 'ltr',
}

// Keyed, not positional: a missing locale is a type error, and a transposed `fr`/`de` pair can't
// typecheck — with seven unlabelled paragraphs per call, a positional helper would ship either.
type L<T = string> = Record<Locale, T>
const L = <T = string>(value: L<T>): L<T> => value

// The es/fr/ja archive fields (title, summary, company, role) are read from `project-copy.ts` — the
// table the index rows use — so the archive and the case study cannot disagree in those locales.
type ArchiveLocale = 'es' | 'fr' | 'ja'
const archiveText = (locale: ArchiveLocale) => {
  const text = projectTextCopy[VIN_SLUG]?.[locale]
  const company = projectCompanyCopy[locale]['Independent']
  const role = projectRoleCopy[locale]['Product designer & strategist']
  if (!text || !company || !role)
    throw new Error(`vin-app case study: no archive copy in ${locale}`)
  return { ...text, company, role }
}

// ── Media ──────────────────────────────────────────────────────────────────────────────────
// Filenames double as idempotency keys, prefixed so they never collide with another project's
// uploads. Chosen from the exported frames in `assets/` — the clean, representative screen per flow.
// One deliberate omission: onboarding slides 2–4 sit at 10% layer opacity in the Figma file and
// cannot be exported legibly, so the opener carries that chapter instead. The venue screens use a
// real coffee chain as placeholder branding; the figure caption says so rather than hiding it.

const STORY_MEDIA = {
  heroGoalChips: {
    file: 'create-meetup/goal-chips.png',
    name: 'vin-app--create-meetup-goal-chips.png',
    alt: L({
      en: "VIN's meetup-creation opener: a chat bubble asking the goal of the meetup, with four intent chips including an honest 'just want to do an activity' escape hatch",
      fa: 'صفحه‌ی آغاز ساخت دورهمی در VIN: پرسش درباره‌ی هدف دیدار و چهار گزینه‌ی پاسخ، از جمله «فقط می‌خواهم فعالیتی انجام دهم»',
      ar: 'شاشة بدء إنشاء اللقاء في VIN: فقاعة محادثة تسأل عن هدف اللقاء، مع أربع رقائق نوايا من بينها خيار صريح «أريد فقط ممارسة نشاط»',
      de: 'VIN-Einstieg zum Erstellen eines Meetups: eine Chat-Blase, die nach dem Ziel des Meetups fragt, mit vier Intent-Chips, darunter das ehrliche Fluchttor „Ich möchte nur eine Aktivität machen“',
      es: 'Inicio de la creación de un meetup en VIN: una burbuja de chat que pregunta el objetivo del meetup, con cuatro chips de intención, entre ellos una honesta vía de escape: «just want to do an activity»',
      fr: 'L’ouverture de la création d’un meetup dans VIN : une bulle de chat qui demande le but du meetup, avec quatre puces d’intention, dont une porte de sortie honnête : « just want to do an activity »',
      ja: 'VINのミートアップ作成の最初の画面：ミートアップの目的を尋ねるチャットの吹き出しと4つの意図チップ。そのひとつは「just want to do an activity」という正直な逃げ道',
    }),
  },
  heroVenueLanding: {
    file: 'sponsor/venue-landing.png',
    name: 'vin-app--sponsor-venue-landing.png',
    alt: L({
      en: "VIN Business landing page: 'Real Footfall, Real Revenue' headline over the four-step partner funnel — List Your Venue, Get Matched, Host & Activate, Measure & Grow",
      fa: 'صفحه‌ی فرود VIN Business با عنوان «مراجعه‌ی واقعی، درآمد واقعی» و چهار مرحله برای مکان‌های همکار: ثبت مکان، یافتن گروه مناسب، میزبانی و سنجش نتیجه',
      ar: 'صفحة هبوط VIN Business: عنوان «إقبال حقيقي، إيرادات حقيقية» فوق قمع الشريك المكوَّن من أربع خطوات — أدرج مكانك، طابِق، استضف وفعِّل، قِس ونمِّ',
      de: 'VIN-Business-Landingpage: Überschrift „Echter Fußverkehr, echter Umsatz“ über dem vierstufigen Partner-Funnel — Venue listen, Match erhalten, Hosten & Aktivieren, Messen & Wachsen',
      es: 'Página de aterrizaje de VIN Business: el titular «Real Footfall, Real Revenue» sobre el embudo de socios en cuatro pasos — List Your Venue, Get Matched, Host & Activate, Measure & Grow',
      fr: 'Page d’accueil de VIN Business : le titre « Real Footfall, Real Revenue » au-dessus du tunnel partenaires en quatre étapes — List Your Venue, Get Matched, Host & Activate, Measure & Grow',
      ja: 'VIN Businessのランディングページ：「Real Footfall, Real Revenue」の見出しの下に、4段階のパートナーファネル——List Your Venue、Get Matched、Host & Activate、Measure & Grow',
    }),
  },
  heroMeetupDetail: {
    file: 'meetup-detail/detail-default.png',
    name: 'vin-app--meetup-detail-default.png',
    alt: L({
      en: 'A padel meetup detail screen: gallery, attendee roster, map, group chat and an ended-meetup state with a 12-person attendance count',
      fa: 'صفحه‌ی جزئیات میت‌آپ پدل: گالری، فهرست شرکت‌کنندگان، نقشه، گفت‌وگوی گروهی و وضعیت پایان‌یافته‌ی میت‌آپ با شمار ۱۲ حاضر',
      ar: 'شاشة تفاصيل لقاء بادل: معرض، وقائمة الحضور، وخريطة، ودردشة جماعية، وحالة لقاء منتهٍ بعدد حضور 12 شخصًا',
      de: 'Detailscreen eines Padel-Meetups: Galerie, Teilnehmerliste, Karte, Gruppenchat und ein beendeter Meetup-Status mit 12 Teilnehmenden',
      es: 'Pantalla de detalle de un meetup de pádel: galería, lista de asistentes, mapa, chat de grupo y un estado de meetup finalizado con una asistencia de 12 personas',
      fr: 'Écran de détail d’un meetup de padel : galerie, liste des participants, carte, chat de groupe et un état de meetup terminé affichant 12 participants',
      ja: 'パデルのミートアップ詳細画面：ギャラリー、参加者一覧、地図、グループチャット、そして参加者12人と表示された終了済みの状態',
    }),
  },
  dsColor: {
    file: 'design-system/color.png',
    name: 'vin-app--design-system-color.png',
    alt: L({
      en: "VIN's design-system color page: the phosphorescent accent ramp alongside gray, olive, green, red, orange, blue-purple, purple, blue and pink ramps, each in eleven steps",
      fa: 'صفحه‌ی رنگ در سیستم طراحی وین: طیف رنگ فسفری شاخص در کنار طیف‌های خاکستری، زیتونی، سبز، قرمز، نارنجی، آبی‌بنفش، بنفش، آبی و صورتی، هرکدام در یازده پله',
      ar: 'صفحة الألوان في نظام تصميم VIN: تدرّج اللون الفسفوري المميز إلى جانب تدرّجات رمادي وزيتوني وأخضر وأحمر وبرتقالي وأزرق‌بنفسجي وبنفسجي وأزرق ووردي، كل منها بإحدى عشرة درجة',
      de: 'VIN-Design-System-Farbseite: die phosphoreszierende Akzentrampe neben Grau-, Oliv-, Grün-, Rot-, Orange-, Blau-Lila-, Lila-, Blau- und Pink-Rampen, jede in elf Stufen',
      es: 'Página de color del sistema de diseño de VIN: la escala del acento fosforescente junto a las escalas de gris, oliva, verde, rojo, naranja, azul violáceo, morado, azul y rosa, cada una en once pasos',
      fr: 'La page couleurs du design system de VIN : la gamme de l’accent phosphorescent à côté des gammes gris, olive, vert, rouge, orange, bleu-violet, violet, bleu et rose, chacune en onze nuances',
      ja: 'VINのデザインシステムのカラーページ：蛍光色のアクセントのランプと、グレー、オリーブ、グリーン、レッド、オレンジ、ブルーパープル、パープル、ブルー、ピンクの各ランプ。それぞれ11段階',
    }),
  },
  dsTypography: {
    file: 'design-system/typography.png',
    name: 'vin-app--design-system-typography.png',
    alt: L({
      en: 'VIN typography page: Hurme Geometric Sans 3 across 21 named styles — headings, subtitles, body and button text, each with its weight, size and line-height',
      fa: 'صفحه‌ی تایپوگرافی وین: فونت Hurme Geometric Sans 3 در ۲۱ سبک نام‌گذاری‌شده — عنوان، زیرعنوان، متن و دکمه، هرکدام با وزن، اندازه و ارتفاع خط خود',
      ar: 'صفحة الطباعة في VIN: خط Hurme Geometric Sans 3 عبر 21 نمطًا مسمّى — عناوين، عناوين فرعية، نص أساسي وأزرار، لكل منها وزنه وحجمه وارتفاع سطره',
      de: 'VIN-Typografieseite: Hurme Geometric Sans 3 über 21 benannte Stile — Überschriften, Untertitel, Fließtext und Buttons, jeweils mit Schriftschnitt, Größe und Zeilenhöhe',
      es: 'Página tipográfica de VIN: Hurme Geometric Sans 3 en 21 estilos con nombre — títulos, subtítulos, texto de cuerpo y de botón, cada uno con su peso, tamaño e interlineado',
      fr: 'La page typographie de VIN : Hurme Geometric Sans 3 déclinée en 21 styles nommés — titres, sous-titres, texte courant et texte de bouton, chacun avec sa graisse, sa taille et son interlignage',
      ja: 'VINのタイポグラフィページ：Hurme Geometric Sans 3による21の名前付きスタイル——見出し、サブタイトル、本文、ボタンテキスト。それぞれにウェイト、サイズ、行間を指定',
    }),
  },
  dsCards: {
    file: 'design-system/cards.png',
    name: 'vin-app--design-system-cards.png',
    alt: L({
      en: 'VIN card variants: meetup cards driven by Type (Upcoming/Past/Draft) and Save (True/False), plus people and meetup-gallery cards',
      fa: 'گونه‌های کارت در وین: کارت‌های میت‌آپ بر پایه‌ی نوع (آینده/گذشته/پیش‌نویس) و ذخیره (بله/خیر)، به‌همراه کارت‌های افراد و گالری میت‌آپ',
      ar: 'أنماط بطاقات VIN: بطاقات اللقاءات المبنية على النوع (قادم/سابق/مسودة) والحفظ (نعم/لا)، إضافة إلى بطاقات الأشخاص ومعرض اللقاءات',
      de: 'VIN-Kartenvarianten: Meetup-Karten gesteuert über Type (Upcoming/Past/Draft) und Save (True/False), dazu Personen- und Meetup-Galerie-Karten',
      es: 'Variantes de tarjeta de VIN: tarjetas de meetup controladas por Type (Upcoming/Past/Draft) y Save (True/False), además de tarjetas de personas y de galería de meetups',
      fr: 'Les variantes de cartes de VIN : des cartes de meetup pilotées par Type (Upcoming/Past/Draft) et Save (True/False), plus des cartes de personnes et de galerie de meetups',
      ja: 'VINのカードバリアント：Type（Upcoming/Past/Draft）とSave（True/False）で切り替わるミートアップカードに加え、人物カードとミートアップギャラリーのカード',
    }),
  },
  homeDefault: {
    file: 'home/home-default.png',
    name: 'vin-app--home-default.png',
    alt: L({
      en: "VIN's home feed: a greeting header, recommended meetups as two-up cards with the start time set in large phosphorescent type, category chips, people you may know, and a map section",
      fa: 'صفحه‌ی اصلی VIN: پیام خوش‌آمد، دورهمی‌های پیشنهادی در دو ستون، زمان شروع با نوشته‌ی درشت فسفری، دسته‌بندی‌ها، افراد پیشنهادی و نقشه',
      ar: 'الصفحة الرئيسية في VIN: ترويسة ترحيب، ولقاءات مقترحة في بطاقات مزدوجة مع وقت البدء بخط فسفوري كبير، ورقائق التصنيفات، وأشخاص قد تعرفهم، وقسم الخريطة',
      de: 'VIN-Home-Feed: Begrüßungsheader, empfohlene Meetups als zweispaltige Karten mit der Startzeit in großer phosphoreszierender Schrift, Kategorie-Chips, Personen, die du kennen könntest, und ein Kartenbereich',
      es: 'El feed de inicio de VIN: un encabezado de saludo, meetups recomendados en tarjetas de dos en dos con la hora de inicio en tipografía grande y fosforescente, chips de categoría, personas que quizá conozcas y una sección de mapa',
      fr: 'Le fil d’accueil de VIN : un en-tête de salutation, des meetups recommandés en cartes deux par deux avec l’heure de début composée en grands caractères phosphorescents, des puces de catégorie, des personnes que vous connaissez peut-être et une section carte',
      ja: 'VINのホームフィード：あいさつのヘッダー、開始時刻を大きな蛍光色の文字で示した2列カードのおすすめミートアップ、カテゴリーチップ、知り合いかもしれない人、そして地図セクション',
    }),
  },
  tickets: {
    file: 'tickets/list-view.png',
    name: 'vin-app--tickets-list-view.png',
    alt: L({
      en: 'The Tickets tab: the meetups a member has joined, each row carrying the time, the activity and the attendee count',
      fa: 'تب بلیت‌ها: میت‌آپ‌هایی که عضو به آن‌ها پیوسته، هر ردیف با زمان، فعالیت و شمار شرکت‌کنندگان',
      ar: 'تبويب التذاكر: اللقاءات التي انضم إليها العضو، وكل صف يحمل الوقت والنشاط وعدد الحاضرين',
      de: 'Der Tickets-Tab: die Meetups, denen ein Mitglied beigetreten ist, jede Zeile mit Uhrzeit, Aktivität und Teilnehmerzahl',
      es: 'La pestaña Tickets: los meetups a los que se ha unido un miembro, cada fila con la hora, la actividad y el número de asistentes',
      fr: 'L’onglet Tickets : les meetups qu’un membre a rejoints, chaque ligne indiquant l’heure, l’activité et le nombre de participants',
      ja: 'Ticketsタブ：メンバーが参加したミートアップの一覧。各行に時刻、アクティビティ、参加者数',
    }),
  },
  chatSingle: {
    file: 'chat/single-chat.png',
    name: 'vin-app--chat-single-chat.png',
    alt: L({
      en: 'A single chat thread inside VIN — the conversation layer that carries a meetup before and after it happens',
      fa: 'صفحه‌ی گفت‌وگوی خصوصی در VIN برای هماهنگی و ادامه‌ی ارتباط پیش و پس از دورهمی',
      ar: 'محادثة مفردة داخل VIN — طبقة المحادثة التي تحمل اللقاء قبل انعقاده وبعده',
      de: 'Ein einzelner Chat-Thread in VIN — die Konversationsebene, die ein Meetup davor und danach trägt',
      es: 'Un hilo de chat dentro de VIN — la capa de conversación que sostiene un meetup antes y después de que suceda',
      fr: 'Un fil de discussion dans VIN — la couche de conversation qui porte un meetup avant et après sa tenue',
      ja: 'VIN内のひとつのチャットスレッド——ミートアップの前後を支える会話のレイヤー',
    }),
  },
  activityMeets: {
    file: 'activity/meets.png',
    name: 'vin-app--activity-meets.png',
    alt: L({
      en: 'The Activity tab, Meets segment: join requests, host decisions and meetup changes stacked as a reverse-chronological log',
      fa: 'تب فعالیت، بخش میت‌ها: درخواست‌های پیوستن، تصمیم‌های میزبان و تغییرهای میت‌آپ به‌صورت گزارشی معکوس‌زمانی',
      ar: 'تبويب النشاط، قسم اللقاءات: طلبات الانضمام وقرارات المضيف وتغييرات اللقاء مرتَّبة كسجل عكسي زمنيًا',
      de: 'Der Activity-Tab, Segment „Meets“: Beitrittsanfragen, Host-Entscheidungen und Meetup-Änderungen als umgekehrt chronologisches Protokoll',
      es: 'La pestaña Activity, segmento Meets: solicitudes para unirse, decisiones del anfitrión y cambios en los meetups apilados como un registro en orden cronológico inverso',
      fr: 'L’onglet Activity, segment Meets : demandes de participation, décisions de l’organisateur et modifications de meetups empilées dans un journal antichronologique',
      ja: 'Activityタブ、Meetsセグメント：参加リクエスト、ホストの判断、ミートアップの変更を新しい順に積み上げたログ',
    }),
  },
  homeNoInternet: {
    file: 'home/home-no-internet.png',
    name: 'vin-app--home-no-internet.png',
    alt: L({
      en: "The offline state: 'No Internet Connection — VIN needs internet to work.' The tab bar stays in place, so the app never loses its frame",
      fa: 'وضعیت آفلاین: «اتصال اینترنت نیست — وین برای کار کردن به اینترنت نیاز دارد.» نوار تب سر جایش می‌ماند تا اپ هرگز قاب خود را از دست ندهد',
      ar: 'حالة انقطاع الشبكة: «لا يوجد اتصال بالإنترنت — يحتاج VIN إلى الإنترنت ليعمل.» يبقى شريط التبويب في مكانه، فلا يفقد التطبيق إطاره',
      de: 'Der Offline-Zustand: „No Internet Connection — VIN braucht Internet.“ Die Tab-Bar bleibt stehen, damit die App ihren Rahmen nie verliert',
      es: 'El estado sin conexión: «No Internet Connection — VIN needs internet to work.» La barra de pestañas se mantiene en su sitio, así que la app nunca pierde su marco',
      fr: 'L’état hors ligne : « No Internet Connection — VIN needs internet to work. » La barre d’onglets reste en place, de sorte que l’app ne perd jamais son cadre',
      ja: 'オフライン状態：「No Internet Connection — VIN needs internet to work.」タブバーはそのまま残り、アプリが枠組みを失うことはない',
    }),
  },
  chatEmpty: {
    file: 'chat/empty.png',
    name: 'vin-app--chat-empty.png',
    alt: L({
      en: "The empty chat state: 'There is no message' under a Meetups segment, with an invitation to join a meetup",
      fa: 'حالت خالی گفت‌وگو: «پیامی نیست» زیر بخش میت‌آپ‌ها، با دعوت به پیوستن به یک میت‌آپ',
      ar: 'حالة الدردشة الفارغة: «لا توجد رسائل» تحت قسم اللقاءات، مع دعوة للانضمام إلى لقاء',
      de: 'Der leere Chat-Zustand: „There is no message“ unter dem Segment „Meetups“, mit der Einladung, einem Meetup beizutreten',
      es: 'El estado de chat vacío: «There is no message» bajo un segmento Meetups, con una invitación a unirse a un meetup',
      fr: 'L’état de chat vide : « There is no message » sous un segment Meetups, avec une invitation à rejoindre un meetup',
      ja: 'チャットの空状態：Meetupsセグメントの下に「There is no message」と、ミートアップへの参加を促す案内',
    }),
  },
  cancelLastMinute: {
    file: 'meetup-detail/cancel-paid-last-minute.png',
    name: 'vin-app--meetup-cancel-paid-last-minute.png',
    alt: L({
      en: "One of four cancellation variants: cancelling a paid meetup inside 24 hours, stated plainly — 'This is within 24 hours — no refund available' — with the destructive action still offered",
      fa: 'یکی از چهار حالت لغو دورهمی پولی: وقتی کمتر از ۲۴ ساعت مانده، پیام صریحِ بازنگشتن وجه نمایش داده می‌شود و گزینه‌ی لغو همچنان در دسترس است',
      ar: 'واحدة من أربع حالات إلغاء: إلغاء لقاء مدفوع خلال 24 ساعة، مذكورة بوضوح «هذا خلال 24 ساعة — لا يوجد استرداد»، مع إبقاء الإجراء المدمّر متاحًا',
      de: 'Eine von vier Storno-Varianten: die Absage eines bezahlten Meetups innerhalb von 24 Stunden, klar benannt — „innerhalb von 24 Stunden, keine Rückerstattung“ — die destruktive Aktion bleibt verfügbar',
      es: 'Una de las cuatro variantes de cancelación: cancelar un meetup de pago con menos de 24 horas de antelación, dicho sin rodeos — «This is within 24 hours — no refund available» — con la acción destructiva todavía disponible',
      fr: 'L’une des quatre variantes d’annulation : annuler un meetup payant à moins de 24 heures, dit sans détour — « This is within 24 hours — no refund available » — avec l’action destructive toujours proposée',
      ja: '4つのキャンセルバリアントのひとつ：有料ミートアップを24時間以内にキャンセルする場合を「This is within 24 hours — no refund available」と率直に伝えたうえで、破壊的な操作もそのまま提示している',
    }),
  },
  onboardingOpener: {
    file: 'onboarding/story-1-opener.png',
    name: 'vin-app--onboarding-opener.png',
    alt: L({
      en: "VIN's first onboarding slide, 'Meet Through Movement': 'Forget awkward networking events. Connect with professionals who share your passion for running, padel, yoga, or cycling.'",
      fa: 'نخستین اسلاید خوش‌آمدگویی وین، «از راه حرکت آشنا شو»: «رویدادهای شبکه‌سازیِ معذب را فراموش کن. با حرفه‌ای‌هایی آشنا شو که شور دویدن، پدل، یوگا یا دوچرخه‌سواری را با تو شریک‌اند.»',
      ar: 'أول شريحة ترحيب في VIN، «تعرَّف عبر الحركة»: «انسَ فعاليات التشبيك المحرجة. تواصل مع محترفين يشاركونك شغف الجري والبادل واليوغا والدراجات.»',
      de: 'VINs erste Onboarding-Folie, „Meet Through Movement“: „Vergiss unangenehme Networking-Events. Triff Profis, die deine Leidenschaft für Laufen, Padel, Yoga oder Radfahren teilen.“',
      es: 'La primera diapositiva de onboarding de VIN, «Meet Through Movement»: «Forget awkward networking events. Connect with professionals who share your passion for running, padel, yoga, or cycling.»',
      fr: 'La première diapositive d’onboarding de VIN, « Meet Through Movement » : « Forget awkward networking events. Connect with professionals who share your passion for running, padel, yoga, or cycling. »',
      ja: 'VINのオンボーディング最初のスライド「Meet Through Movement」：「Forget awkward networking events. Connect with professionals who share your passion for running, padel, yoga, or cycling.」',
    }),
  },
  meetupAttended: {
    file: 'meetup-detail/meetup-attended.png',
    name: 'vin-app--meetup-attended.png',
    alt: L({
      en: "'Meetup Attended' — the screen a member sees after a meetup ends: twelve people, each with a name and an industry line, and nothing that marks whether you actually met any of them",
      fa: '«میت‌آپ حاضرشده» — صفحه‌ای که عضو پس از پایان میت‌آپ می‌بیند: دوازده نفر، هرکدام با نام و یک خط صنعت، و هیچ نشانه‌ای از اینکه واقعاً با کدام‌یک آشنا شده‌ای',
      ar: '«اللقاء الذي حضرته» — الشاشة التي يراها العضو بعد انتهاء اللقاء: اثنا عشر شخصًا، لكل منهم اسم وسطر مجال عمل، ولا شيء يسجّل ما إذا كنت قد التقيت أيًّا منهم فعلًا',
      de: '„Meetup Attended“ — der Screen nach dem Ende eines Meetups: zwölf Personen mit Namen und Branchenzeile, und nichts, was festhält, ob man sie tatsächlich kennengelernt hat',
      es: '«Meetup Attended» — la pantalla que ve un miembro cuando termina un meetup: doce personas, cada una con su nombre y una línea de sector, y nada que indique si de verdad conociste a alguna de ellas',
      fr: '« Meetup Attended » — l’écran qu’un membre voit à la fin d’un meetup : douze personnes, chacune avec un nom et une ligne de secteur, et rien qui indique si vous en avez réellement rencontré une',
      ja: '「Meetup Attended」——ミートアップ終了後にメンバーが目にする画面：12人の名前と業界が並ぶが、実際にその誰かと会えたかどうかを示すものは何もない',
    }),
  },
  mutualConnections: {
    file: 'profile/mutual-connections.png',
    name: 'vin-app--profile-mutual-connections.png',
    alt: L({
      en: "'Mutual Connections' in the Profile section — the same twelve people, in the same order, under a different title",
      fa: '«ارتباط‌های مشترک» در بخش پروفایل — همان دوازده نفر، به همان ترتیب، زیر عنوانی متفاوت',
      ar: '«الصلات المشتركة» في قسم الملف الشخصي — الأشخاص الاثنا عشر أنفسهم، بالترتيب نفسه، تحت عنوان مختلف',
      de: '„Mutual Connections“ im Profilbereich — dieselben zwölf Personen, in derselben Reihenfolge, unter einem anderen Titel',
      es: '«Mutual Connections» en la sección Profile — las mismas doce personas, en el mismo orden, bajo otro título',
      fr: '« Mutual Connections » dans la section Profile — les mêmes douze personnes, dans le même ordre, sous un autre titre',
      ja: 'Profileセクションの「Mutual Connections」——同じ12人が同じ順番で、別のタイトルの下に並ぶ',
    }),
  },
  venueDetail: {
    file: 'sponsor/venue-detail.png',
    name: 'vin-app--sponsor-venue-detail.png',
    alt: L({
      en: "A partner venue's page inside VIN: cover photo and venue type, a one-line description, the meetups it is sponsoring, its location and distance, a gallery, and a 'Be my sponsor' button along the bottom. The venue is a real coffee chain standing in as placeholder content",
      fa: 'صفحه‌ی یک مکان شریک در وین: عکس کاور و نوع مکان، توضیح یک‌خطی، میت‌آپ‌هایی که حمایت می‌کند، موقعیت و فاصله، گالری، و دکمه‌ی «اسپانسر من باش» در پایین. مکان، یک برند واقعی قهوه است که نقش محتوای جایگزین را بازی می‌کند',
      ar: 'صفحة مكان شريك داخل VIN: صورة غلاف ونوع المكان، ووصف من سطر واحد، واللقاءات التي يرعاها، وموقعه والمسافة إليه، ومعرض صور، وزر «كن راعيًا لي» في الأسفل. المكان سلسلة قهوة حقيقية مستخدَمة كمحتوى بديل',
      de: 'Die Seite eines Partner-Venues in VIN: Titelbild und Venue-Typ, eine Beschreibungszeile, die gesponserten Meetups, Standort und Entfernung, eine Galerie und unten ein „Be my sponsor“-Button. Das Venue ist eine reale Kaffeekette als Platzhalterinhalt',
      es: 'La página de un local asociado dentro de VIN: foto de portada y tipo de local, una descripción de una línea, los meetups que patrocina, su ubicación y distancia, una galería y un botón «Be my sponsor» en la parte inferior. El local es una cadena de cafeterías real usada como contenido de relleno',
      fr: 'La page d’un lieu partenaire dans VIN : photo de couverture et type de lieu, une description d’une ligne, les meetups qu’il sponsorise, son emplacement et sa distance, une galerie et un bouton « Be my sponsor » en bas. Le lieu est une vraie chaîne de cafés utilisée comme contenu provisoire',
      ja: 'VIN内のパートナー店舗のページ：カバー写真と店舗の種類、1行の説明、協賛しているミートアップ、所在地と距離、ギャラリー、そして下部の「Be my sponsor」ボタン。店舗は実在のコーヒーチェーンで、仮のコンテンツとして使われている',
    }),
  },
  sponsorBid: {
    file: 'sponsor/be-my-sponsor-bid.png',
    name: 'vin-app--sponsor-be-my-sponsor-bid.png',
    alt: L({
      en: "The 'Be my sponsor' request a host sends a venue: expected audience size, preferred date and time, activity type, sponsorship type, what the venue gets in return, and a free-text pitch above a Submit Request button",
      fa: 'درخواست «اسپانسر من باش» که میزبان برای مکان می‌فرستد: اندازه‌ی تخمینی مخاطب، تاریخ و ساعت ترجیحی، نوع فعالیت، نوع حمایت، چیزی که مکان در ازای آن می‌گیرد، و یک متن آزاد بالای دکمه‌ی ارسال درخواست',
      ar: 'طلب «كن راعيًا لي» الذي يرسله المضيف إلى المكان: الحجم المتوقع للحضور، والتاريخ والوقت المفضلان، ونوع النشاط، ونوع الرعاية، وما يحصل عليه المكان في المقابل، ونص حر فوق زر إرسال الطلب',
      de: 'Die „Be my sponsor“-Anfrage, die ein Host an ein Venue schickt: erwartete Gruppengröße, Wunschdatum und -zeit, Aktivitätsart, Sponsoring-Art, was das Venue dafür bekommt, und ein Freitextfeld über dem Absenden-Button',
      es: 'La solicitud «Be my sponsor» que un anfitrión envía a un local: tamaño de público previsto, fecha y hora preferidas, tipo de actividad, tipo de patrocinio, qué recibe el local a cambio y una propuesta en texto libre sobre un botón Submit Request',
      fr: 'La demande « Be my sponsor » qu’un organisateur envoie à un lieu : taille d’audience attendue, date et heure souhaitées, type d’activité, type de sponsoring, ce que le lieu obtient en retour, et un argumentaire en texte libre au-dessus d’un bouton Submit Request',
      ja: 'ホストが店舗に送る「Be my sponsor」リクエスト：想定参加人数、希望日時、アクティビティの種類、協賛の種類、店舗が得る見返り、そしてSubmit Requestボタンの上の自由記述のアピール欄',
    }),
  },
  // The two workbooks behind the roadmap chapter, offered as downloads. They sit beside the README
  // rather than in `assets/`, as Sina handed them over.
  problemInventory: {
    file: '../VIN-problem-inventory.xlsx',
    name: 'vin-app--problem-inventory.xlsx',
    alt: L({
      en: 'VIN problem inventory — an Excel workbook of 57 problems on eight sheets',
      fa: 'فایل اکسل فهرست مسئله‌های وین: ۵۷ مسئله در هشت برگه',
      ar: 'ملف Excel لفهرس مشكلات VIN: 57 مشكلة في ثماني أوراق',
      de: 'VIN-Problem-Inventar — eine Excel-Arbeitsmappe mit 57 Problemen auf acht Blättern',
      es: 'Inventario de problemas de VIN: un libro de Excel con 57 problemas en ocho hojas',
      fr: 'Inventaire des problèmes de VIN : un classeur Excel de 57 problèmes sur huit feuilles',
      ja: 'VINの課題インベントリ：8シートに57の課題をまとめたExcelワークブック',
    }),
  },
  kpiStarterPack: {
    file: '../vin-kpi-starter-pack.xlsx',
    name: 'vin-app--kpi-starter-pack.xlsx',
    alt: L({
      en: 'VIN KPI starter pack — an Excel workbook of 20 KPIs on four sheets',
      fa: 'فایل اکسل بسته‌ی شروع KPI وین: ۲۰ شاخص در چهار برگه',
      ar: 'ملف Excel لحزمة مؤشرات أداء VIN: 20 مؤشرًا في أربع أوراق',
      de: 'VIN-KPI-Starterpaket — eine Excel-Arbeitsmappe mit 20 KPIs auf vier Blättern',
      es: 'Paquete inicial de KPI de VIN: un libro de Excel con 20 KPI en cuatro hojas',
      fr: 'Kit de démarrage KPI de VIN : un classeur Excel de 20 KPI sur quatre feuilles',
      ja: 'VINのKPIスターターパック：4シートに20のKPIをまとめたExcelワークブック',
    }),
  },
} satisfies Record<string, MediaSpec>

/** The story's figures and downloads, then every screen for the index chapter. */
export const VIN_MEDIA = { ...STORY_MEDIA, ...VIN_SCREEN_MEDIA } as Record<
  keyof typeof STORY_MEDIA | VinScreenMediaKey,
  MediaSpec
>

export type VinMediaKey = keyof typeof VIN_MEDIA
export type VinMediaIds = Partial<Record<VinMediaKey, string>>

// ── Project fields ──────────────────────────────────────────────────────────────────────────

const TITLE = L({
  en: 'VIN — Making Connections the Product, Not the Event',
  fa: 'وین — وقتی محصول، ارتباط است نه رویداد',
  ar: 'VIN — عندما يكون المنتج هو التواصل، لا الفعالية',
  de: 'VIN — Wenn Verbindungen das Produkt sind, nicht das Event',
  es: archiveText('es').title,
  fr: archiveText('fr').title,
  ja: archiveText('ja').title,
})

const COMPANY = L({
  en: 'Independent',
  fa: 'مستقل',
  ar: 'مستقل',
  de: 'Unabhängig',
  es: archiveText('es').company,
  fr: archiveText('fr').company,
  ja: archiveText('ja').company,
})

const ROLE = L({
  en: 'Product designer & strategist',
  fa: 'طراح محصول و استراتژیست',
  ar: 'مصمّم منتج واستراتيجي',
  de: 'Produktdesigner & Stratege',
  es: archiveText('es').role,
  fr: archiveText('fr').role,
  ja: archiveText('ja').role,
})

const SUMMARY = L({
  en: "A connection-first networking app for Dubai's professional community — a product brief, a 57-problem inventory with its own KPI dictionary, a brand architecture and a B2B venue-revenue layer, audited against the promises the product makes to its own users.",
    fa: 'برای جامعه‌ی حرفه‌ای دبی، اپی طراحی کردم که هدفش شکل‌دادن به ارتباط است. سند محصول، فهرست ۵۷ مسئله و شاخص‌هایشان، معماری برند و مدل درآمد B2B را تدوین کردم و سپس طراحی را با وعده‌هایی که به کاربر می‌داد سنجیدم.',
  ar: 'تطبيق شبكة اجتماعية يضع التواصل أولًا لمجتمع دبي المهني — موجز منتج، وفهرس 57 مشكلة له قاموس مؤشرات أداء خاص، وهندسة علامة تجارية، وطبقة إيرادات B2B للأماكن، مُدقَّق في ضوء الوعود التي يقطعها المنتج لمستخدميه.',
  de: 'Eine Connection-first-Networking-App für Dubais Berufscommunity — ein Produktbrief, ein Problem-Inventar mit 57 Einträgen samt eigenem KPI-Wörterbuch, eine Markenarchitektur und eine B2B-Venue-Umsatzebene, geprüft an den Versprechen, die das Produkt seinen eigenen Nutzern macht.',
  es: archiveText('es').summary,
  fr: archiveText('fr').summary,
  ja: archiveText('ja').summary,
})

const STATEMENT = L({
  en: "A connection-first networking app for Dubai, spec'd end-to-end — then audited against the promises its own onboarding makes.",
    fa: 'طرح کامل یک اپ شبکه‌سازی برای دبی؛ سپس بررسی اینکه صفحه‌های طراحی‌شده تا چه حد وعده‌های آغاز کار را برآورده می‌کنند.',
  ar: 'تطبيق شبكة اجتماعية يضع التواصل أولًا لدبي، مُحدَّد من البداية إلى النهاية — ثم مُدقَّق في ضوء الوعود التي يقطعها شريط الترحيب فيه نفسه.',
  de: 'Eine Connection-first-Networking-App für Dubai, durchgängig spezifiziert — und dann an den Versprechen ihres eigenen Onboardings geprüft.',
  es: 'Una app de networking para Dubái centrada en las conexiones, especificada de principio a fin — y luego auditada frente a las promesas de su propio onboarding.',
  fr: 'Une app de networking pour Dubaï centrée sur les connexions, spécifiée de bout en bout — puis auditée à l’aune des promesses de son propre onboarding.',
  ja: 'つながりを軸にしたドバイのネットワーキングアプリを端から端まで仕様化し——その上で、自らのオンボーディングが掲げる約束に照らして監査した。',
})

const INDUSTRY = L({
  en: 'Social · networking · Dubai',
  fa: 'اجتماعی · شبکه‌سازی · دبی',
  ar: 'اجتماعي · تواصل · دبي',
  de: 'Social · Networking · Dubai',
  es: 'Social · networking · Dubái',
  fr: 'Social · networking · Dubaï',
  ja: 'ソーシャル・ネットワーキング・ドバイ',
})

const TEAM = L({
  en: 'A separate development team built and shipped the running app and admin panel; Sina led product design and strategy.',
    fa: 'تیم توسعه‌ای مستقل، اپ و پنل مدیریت را ساخت و منتشر کرد. راهبری طراحی و راهبرد محصول با سینا بود.',
  ar: 'قام فريق تطوير مستقل ببناء وإطلاق التطبيق العامل ولوحة الإدارة؛ وقاد سينا تصميم المنتج والاستراتيجية.',
  de: 'Ein separates Entwicklungsteam baute und veröffentlichte die laufende App und das Admin-Panel; Sina leitete Produktdesign und Strategie.',
  es: 'Un equipo de desarrollo independiente construyó y lanzó la app en funcionamiento y el panel de administración; Sina dirigió el diseño de producto y la estrategia.',
  fr: 'Une équipe de développement distincte a construit et livré l’app en service et le panneau d’administration ; Sina a dirigé le design produit et la stratégie.',
  ja: '稼働中のアプリと管理画面は別の開発チームが構築・リリースし、Sinaはプロダクトデザインと戦略をリードした。',
})

const META_TITLE = L({
  en: 'VIN — product strategy and design for a Dubai networking app',
  fa: 'وین — استراتژی و طراحی محصول برای یک اپ شبکه‌سازی در دبی',
  ar: 'VIN — استراتيجية وتصميم المنتج لتطبيق تواصل في دبي',
  de: 'VIN — Produktstrategie und -design für eine Dubai-Networking-App',
  es: 'VIN — estrategia y diseño de producto para una app de networking en Dubái',
  fr: 'VIN — stratégie et design produit pour une app de networking à Dubaï',
  ja: 'VIN——ドバイのネットワーキングアプリのプロダクト戦略とデザイン',
})

const HERO_CAPTION = L({
  en: 'Three of 126 screens: the chat-first creation flow, the venue-partner revenue layer, and a meetup in progress.',
  fa: 'سه نمونه از ۱۲۶ صفحه: جریان ساختِ چت‌محور، لایه‌ی درآمدیِ شرکای مکان و یک میت‌آپ در جریان.',
  ar: 'ثلاث من 126 شاشة: تدفّق الإنشاء القائم على المحادثة، وطبقة إيرادات شركاء الأماكن، ولقاء قيد التنفيذ.',
  de: 'Drei von 126 Screens: der Chat-first-Erstellungsflow, die Venue-Partner-Umsatzebene und ein laufendes Meetup.',
  es: 'Tres de las 126 pantallas: el flujo de creación basado en el chat, la capa de ingresos de los locales asociados y un meetup en curso.',
  fr: 'Trois des 126 écrans : le parcours de création par le chat, la couche de revenus des lieux partenaires et un meetup en cours.',
  ja: '126画面のうちの3つ：チャットから始まる作成フロー、パートナー店舗による収益レイヤー、そして進行中のミートアップ。',
})

const SNAPSHOT = {
  problem: L({
    en: 'Event-discovery apps optimise for ticket sales; social apps optimise for time spent. Neither is the right shape for someone who needs five useful conversations, not another feed.',
    fa: 'اپ‌های رویداد بر فروش بلیت تمرکز دارند و شبکه‌های اجتماعی بر زمان حضور کاربر. برای کسی که پنج گفت‌وگوی مفید می‌خواهد، هیچ‌کدام پاسخ مناسبی نیست.',
    ar: 'تُحسَّن تطبيقات اكتشاف الفعاليات لبيع التذاكر؛ وتُحسَّن التطبيقات الاجتماعية للوقت المُستغرَق. لا يناسب أيّ منهما شخصًا يحتاج خمس محادثات مفيدة، لا موجزًا إضافيًا.',
    de: 'Event-Discovery-Apps optimieren auf Ticketverkäufe; soziale Apps auf verbrachte Zeit. Keines von beidem ist die richtige Form für jemanden, der fünf nützliche Gespräche braucht, nicht einen weiteren Feed.',
    es: 'Las apps de descubrimiento de eventos optimizan la venta de entradas; las apps sociales, el tiempo de uso. Ninguna tiene la forma adecuada para alguien que necesita cinco conversaciones útiles, no otro feed.',
    fr: 'Les apps de découverte d’événements optimisent la vente de billets ; les apps sociales, le temps passé. Aucune n’a la bonne forme pour quelqu’un qui a besoin de cinq conversations utiles, pas d’un fil de plus.',
    ja: 'イベント発見アプリはチケット販売を、ソーシャルアプリは利用時間を最適化する。どちらも、もうひとつのフィードではなく5つの有意義な会話を必要とする人に合った形ではない。',
  }),
  role: L({
    en: 'Product design and strategy lead: the brief, the problem inventory and KPI model, the mobile UI and design system, the brand architecture and the B2B venue layer — alongside a separate development team.',
    fa: 'راهبری طراحی و راهبرد محصول، از سند محصول و فهرست مسئله‌ها تا رابط موبایل، سیستم طراحی، معماری برند و بخش B2B؛ در کنار یک تیم توسعه‌ی مستقل.',
    ar: 'قيادة تصميم المنتج والاستراتيجية: الموجز، وفهرس المشكلات ونموذج المؤشرات، وواجهة الهاتف ونظام التصميم، وهندسة العلامة التجارية وطبقة B2B — إلى جانب فريق تطوير مستقل.',
    de: 'Lead für Produktdesign und Strategie: der Brief, das Problem-Inventar und KPI-Modell, das Mobile-UI und Design-System, die Markenarchitektur und die B2B-Venue-Ebene — neben einem separaten Entwicklungsteam.',
    es: 'Responsable de diseño de producto y estrategia: el brief, el inventario de problemas y el modelo de KPI, la UI móvil y el sistema de diseño, la arquitectura de marca y la capa B2B de locales — junto a un equipo de desarrollo independiente.',
    fr: 'Responsable du design produit et de la stratégie : le brief, l’inventaire des problèmes et le modèle de KPI, l’UI mobile et le design system, l’architecture de marque et la couche B2B des lieux — aux côtés d’une équipe de développement distincte.',
    ja: 'プロダクトデザインと戦略のリード：ブリーフ、課題インベントリとKPIモデル、モバイルUIとデザインシステム、ブランドアーキテクチャ、店舗向けB2Bレイヤー——別の開発チームと並行して。',
  }),
  result: L({
    en: '126 screens on a documented system, a 57-problem inventory and a locked cultural-rules instrument — audited against itself: two of four onboarding promises still have no screen.',
    fa: '۱۲۶ صفحه با سیستم طراحی مستند، فهرست ۵۷ مسئله و قواعد فرهنگیِ ثبت‌شده تهیه شد. بررسی طراحی نشان داد برای دو مورد از چهار وعده‌ی آغاز کار، هنوز صفحه‌ای وجود ندارد.',
    ar: '126 شاشة على نظام موثّق، وفهرس 57 مشكلة، وأداة قواعد ثقافية مُقفَلة — مُدقَّقة في ضوء نفسها: اثنان من أربعة وعود ترحيبية ما زالا بلا شاشة.',
    de: '126 Screens auf einem dokumentierten System, ein 57-Probleme-Inventar und ein verriegeltes Instrument kultureller Regeln — an sich selbst geprüft: Zwei von vier Onboarding-Versprechen haben noch keinen Screen.',
    es: '126 pantallas sobre un sistema documentado, un inventario de 57 problemas y un instrumento de reglas culturales cerrado — auditados contra sí mismos: dos de las cuatro promesas del onboarding siguen sin pantalla.',
    fr: '126 écrans sur un système documenté, un inventaire de 57 problèmes et un instrument de règles culturelles verrouillé — audités à l’aune d’eux-mêmes : deux des quatre promesses de l’onboarding n’ont toujours pas d’écran.',
    ja: '文書化されたシステム上の126画面、57項目の課題インベントリ、固定された文化ルールの指針——それ自体に照らして監査した結果、オンボーディングの4つの約束のうち2つにはまだ画面がない。',
  }),
}

// ── Sections ────────────────────────────────────────────────────────────────────────────────

type Sections = NonNullable<Project['sections']>

/** The block narrative for one locale, with the same row ids in every locale. */
export function vinSections(locale: Locale, media: VinMediaIds): Sections {
  const l = <T>(value: L<T>): T => value[locale]
  const dir = DIRECTION[locale]
  const p = (value: L) => paragraph(l(value), dir)
  // A localized leaf inside an array is keyed by row position: a row keeps what the row that used
  // to sit at its index carried unless the seed writes that leaf (the roadmap chapter's insert gave
  // vin-s07 the old vin-s09 insight). So optional leaves are written empty, never left out.
  const item = (key: VinMediaKey, id: string, caption?: L) =>
    media[key] ? [{ id, media: media[key]!, ...(caption ? { caption: l(caption) } : {}) }] : []
  // A download row exists only once its upload does — the same rule `item` applies to figures.
  const download = (key: VinMediaKey, id: string, title: L, description: L) =>
    media[key] ? [{ id, file: media[key]!, title: l(title), description: l(description) }] : []

  return [
    {
      id: 'vin-s01',
      blockType: 'csNarrative',
      label: 'context',
      heading: l(
        L({
          en: 'Events are not the product. Connections are.',
          fa: 'رویداد محصول نیست. ارتباط محصول است.',
          ar: 'الفعالية ليست المنتج. التواصل هو المنتج.',
          de: 'Events sind nicht das Produkt. Verbindungen sind es.',
          es: 'Los eventos no son el producto. Las conexiones sí.',
          fr: 'Les événements ne sont pas le produit. Les connexions, si.',
          ja: 'イベントはプロダクトではない。つながりこそがプロダクトだ。',
        }),
      ),
      body: prose(
        dir,
        p(
          L({
            en: "VIN — operated by Viwin L.L.C-FZ out of Meydan Free Zone, Dubai — is a connection-first networking platform for the city's professional community. A traditional event app reads browse events, then maybe connect, with success measured in tickets sold. VIN reads set a connection goal, get an AI-suggested event path, attend, then log the connection.",
              fa: 'وین را شرکت Viwin L.L.C-FZ در منطقه‌ی آزاد Meydan دبی اداره می‌کند. این پلتفرم برای شبکه‌سازی میان حرفه‌ای‌های شهر طراحی شده است. در اپ‌های معمول رویداد، کاربر رویدادی پیدا می‌کند و شاید با کسی آشنا شود؛ معیار موفقیت هم اغلب فروش بلیت است. در طرح وین، کاربر هدف ارتباطی تعیین می‌کند، مسیر پیشنهادی هوش مصنوعی را می‌بیند، در رویداد شرکت می‌کند و ارتباط حاصل را ثبت می‌کند.',
            ar: 'وين — التي تديرها Viwin L.L.C-FZ من منطقة ميدان الحرة في دبي — منصّة شبكة اجتماعية تضع التواصل أولًا لمجتمع المدينة المهني. يُقرأ تطبيق فعاليات تقليدي كالتالي: تصفّح الفعاليات، ثم ربما التواصل، والنجاح يُقاس بالتذاكر المباعة. أما وين فتُقرأ كالتالي: حدِّد هدف تواصل، احصل على مسار فعالية يقترحه الذكاء الاصطناعي، احضر، ثم سجِّل التواصل.',
            de: 'VIN — betrieben von Viwin L.L.C-FZ aus der Meydan Free Zone, Dubai — ist eine Connection-first-Networking-Plattform für die Berufscommunity der Stadt. Eine klassische Event-App liest sich als Events durchsuchen, dann vielleicht verbinden, mit Erfolg gemessen in verkauften Tickets. VIN liest sich als Verbindungsziel setzen, einen KI-vorgeschlagenen Event-Pfad erhalten, teilnehmen, dann die Verbindung protokollieren.',
            es: 'VIN — operada por Viwin L.L.C-FZ desde la Meydan Free Zone, Dubái — es una plataforma de networking centrada en las conexiones para la comunidad profesional de la ciudad. Una app de eventos tradicional sigue la secuencia explorar eventos y quizá conectar, y el éxito se mide en entradas vendidas. VIN sigue la secuencia fijar un objetivo de conexión, recibir una ruta de eventos sugerida por IA, asistir y registrar la conexión.',
            fr: 'VIN — exploitée par Viwin L.L.C-FZ depuis la Meydan Free Zone, à Dubaï — est une plateforme de networking centrée sur les connexions pour la communauté professionnelle de la ville. Une app d’événements classique se lit ainsi : parcourir des événements, puis peut-être se connecter, le succès se mesurant en billets vendus. VIN se lit ainsi : fixer un objectif de connexion, recevoir un parcours d’événements suggéré par l’IA, y assister, puis enregistrer la connexion.',
            ja: 'VIN（ドバイのMeydan Free ZoneからViwin L.L.C-FZが運営）は、この街のプロフェッショナル・コミュニティのための、つながりを軸にしたネットワーキングプラットフォームだ。従来のイベントアプリは、イベントを探し、もしかしたら人とつながる、という流れで、成功はチケットの販売数で測られる。VINは、つながりの目標を決め、AIが提案するイベントの道筋を受け取り、参加し、そのつながりを記録する、という流れになる。',
          }),
        ),
        p(
          L({
            en: "The brief's north star is the Connection Logging Rate, targeted at 40%+ — explicitly not attendance, not app opens, not profile views. Dubai is the reason it works this way: high expat turnover, and networking that happens through activity — running clubs, padel, cycling — rather than conference halls.",
              fa: 'شاخص اصلی سند محصول «نرخ ثبت ارتباط» با هدف بیش از ۴۰٪ است؛ حضور در رویداد، بازکردن اپ یا دیدن پروفایل جای آن را نمی‌گیرد. این انتخاب با شرایط دبی پیوند دارد: جابه‌جایی زیاد مهاجران و آشنایی‌هایی که بیشتر در فعالیت‌هایی مثل دویدن، پدل و دوچرخه‌سواری شکل می‌گیرند.',
            ar: 'المقياس الشمالي في الموجز هو معدّل تسجيل التواصل، بهدف 40٪ فأعلى — وليس صراحةً الحضور، ولا فتح التطبيق، ولا مشاهدات الملف الشخصي. سبب هذا الشكل هو دبي: معدّل دوران مرتفع للمغتربين، وتواصل يحدث عبر النشاط — نوادي الجري، البادل، ركوب الدراجات — لا في قاعات المؤتمرات.',
            de: 'Der Nordstern des Briefs ist die Connection Logging Rate, mit einem Ziel von 40%+ — ausdrücklich nicht Teilnahme, nicht App-Öffnungen, nicht Profilaufrufe. Dubai ist der Grund für diese Form: hohe Expat-Fluktuation und Networking, das über Aktivität stattfindet — Lauf­clubs, Padel, Radfahren — statt in Konferenzsälen.',
            es: 'La estrella polar del brief es la Connection Logging Rate, con un objetivo del 40 % o más — explícitamente no la asistencia, ni las aperturas de la app, ni las visitas al perfil. Dubái es la razón de que funcione así: una alta rotación de expatriados y un networking que ocurre a través de la actividad — clubes de running, pádel, ciclismo — y no en salas de conferencias.',
            fr: 'L’étoile polaire du brief est le Connection Logging Rate, avec un objectif de 40 % ou plus — explicitement pas la participation, ni les ouvertures de l’app, ni les vues de profil. C’est Dubaï qui explique ce fonctionnement : un fort renouvellement des expatriés, et un networking qui passe par l’activité — clubs de course, padel, vélo — plutôt que par les salles de conférence.',
            ja: 'ブリーフが掲げる北極星指標はConnection Logging Rate（つながりの記録率）で、目標は40%以上——参加数でもアプリの起動数でもプロフィール閲覧数でもないと明言している。こうした仕組みになっている理由はドバイにある。外国人居住者の入れ替わりが激しく、ネットワーキングは会議場ではなく、ランニングクラブやパデル、サイクリングといったアクティビティを通じて生まれるからだ。',
          }),
        ),
      ),
      insight: l(
        L({
          en: 'Events are not the product. Connections are the product. Events are the medium.',
      fa: 'محصول اصلی، ارتباط میان آدم‌هاست؛ رویداد فرصتی برای شکل‌گرفتن آن است.',
          ar: 'الفعالية ليست المنتج. التواصل هو المنتج. الفعالية هي الوسيلة.',
          de: 'Events sind nicht das Produkt. Verbindungen sind das Produkt. Events sind das Medium.',
          es: 'Los eventos no son el producto. Las conexiones son el producto. Los eventos son el medio.',
          fr: 'Les événements ne sont pas le produit. Les connexions sont le produit. Les événements sont le moyen.',
          ja: 'イベントはプロダクトではない。つながりがプロダクトだ。イベントはその媒体だ。',
        }),
      ),
    },
    {
      id: 'vin-s02',
      blockType: 'csFinding',
      kind: 'quote',
      text: l(
        L({
          en: 'Events are not the product. Connections are the product. Events are the medium.',
      fa: 'محصول اصلی، ارتباط میان آدم‌هاست؛ رویداد فرصتی برای شکل‌گرفتن آن است.',
          ar: 'الفعالية ليست المنتج. التواصل هو المنتج. الفعالية هي الوسيلة.',
          de: 'Events sind nicht das Produkt. Verbindungen sind das Produkt. Events sind das Medium.',
          es: 'Los eventos no son el producto. Las conexiones son el producto. Los eventos son el medio.',
          fr: 'Les événements ne sont pas le produit. Les connexions sont le produit. Les événements sont le moyen.',
          ja: 'イベントはプロダクトではない。つながりがプロダクトだ。イベントはその媒体だ。',
        }),
      ),
      attribution: l(
        L({
          en: 'VIN product brief',
          fa: 'سند محصول وین',
          ar: 'موجز منتج VIN',
          de: 'VIN-Produktbrief',
          es: 'Brief de producto de VIN',
          fr: 'Brief produit de VIN',
          ja: 'VINプロダクトブリーフ',
        }),
      ),
      method: '',
    },
    {
      id: 'vin-s03',
      blockType: 'csNarrative',
      label: 'problem',
      heading: l(
        L({
          en: 'Not another event app, and not a casino playbook.',
      fa: 'فراتر از کشف رویداد، بدون سازوکارهای اعتیادآور.',
          ar: 'ليس تطبيق فعاليات آخر، ولا كتيّب لعب كازينو.',
          de: 'Keine weitere Event-App, kein Casino-Playbook.',
          es: 'Ni otra app de eventos, ni un manual de casino.',
          fr: 'Ni une app d’événements de plus, ni un manuel de casino.',
          ja: 'ありふれたイベントアプリでも、カジノの手法でもない。',
        }),
      ),
      body: prose(
        dir,
        p(
          L({
            en: 'Event-discovery apps optimise for ticket sales, so they succeed whether or not anything came of the event. Social platforms optimise for time spent, importing infinite scroll and vanity metrics. Both are the wrong shape for someone who moved to Dubai three months ago and needs five useful conversations.',
              fa: 'اپ‌های کشف رویداد فروش بلیت را می‌سنجند، حتی اگر شرکت‌کننده با کسی آشنا نشود. شبکه‌های اجتماعی زمان حضور را با پیمایش بی‌پایان و شاخص‌های ظاهری بالا می‌برند. کسی که سه ماه پیش به دبی آمده و دنبال پنج گفت‌وگوی مفید است، به مسیر دیگری نیاز دارد.',
            ar: 'تُحسَّن تطبيقات اكتشاف الفعاليات لبيع التذاكر، فتنجح سواء نتج عن الفعالية شيء أم لا. أما المنصّات الاجتماعية فتُحسَّن للوقت المُستغرَق، فتستورد التمرير اللانهائي ومقاييس الاستعراض. كلاهما شكل خاطئ لشخص انتقل إلى دبي قبل ثلاثة أشهر ويحتاج خمس محادثات مفيدة.',
            de: 'Event-Discovery-Apps optimieren auf Ticketverkäufe, sie sind also erfolgreich, egal ob aus dem Event etwas wurde. Soziale Plattformen optimieren auf verbrachte Zeit und importieren Endlos-Scroll und Vanity-Metriken. Beides ist die falsche Form für jemanden, der vor drei Monaten nach Dubai gezogen ist und fünf nützliche Gespräche braucht.',
            es: 'Las apps de descubrimiento de eventos optimizan la venta de entradas, así que tienen éxito tanto si el evento dio fruto como si no. Las plataformas sociales optimizan el tiempo de uso e importan el scroll infinito y las métricas de vanidad. Ambas tienen la forma equivocada para alguien que se mudó a Dubái hace tres meses y necesita cinco conversaciones útiles.',
            fr: 'Les apps de découverte d’événements optimisent la vente de billets : elles réussissent donc, que l’événement ait débouché sur quelque chose ou non. Les plateformes sociales optimisent le temps passé, en important le défilement infini et les métriques de vanité. Les deux ont la mauvaise forme pour quelqu’un qui s’est installé à Dubaï il y a trois mois et a besoin de cinq conversations utiles.',
            ja: 'イベント発見アプリはチケット販売を最適化するため、イベントから何かが生まれたかどうかに関係なく成功したことになる。ソーシャルプラットフォームは利用時間を最適化し、無限スクロールや虚栄の指標を持ち込む。どちらも、3か月前にドバイに移り住み、5つの有意義な会話を必要としている人には合わない形だ。',
          }),
        ),
        p(
          L({
            en: "The product's own anti-definition is blunt about it: not another event-discovery app, not a social platform, not a dating app, not a matchmaking service, not a ticketing system.",
              fa: 'سند محصول مرزهای VIN را روشن کرده است: این محصول اپ کشف رویداد، شبکه‌ی اجتماعی، اپ دوستیابی، سرویس همتایابی یا سامانه‌ی فروش بلیت نیست.',
            ar: 'التعريف المضاد الخاص بالمنتج صريح في هذا: ليس تطبيق اكتشاف فعاليات آخر، ولا منصّة اجتماعية، ولا تطبيق مواعدة، ولا خدمة مطابقة، ولا نظام تذاكر.',
            de: 'Die eigene Anti-Definition des Produkts ist unverblümt: keine weitere Event-Discovery-App, keine soziale Plattform, keine Dating-App, kein Matchmaking-Dienst, kein Ticketing-System.',
            es: 'La propia antidefinición del producto lo dice sin rodeos: no es otra app de descubrimiento de eventos, ni una plataforma social, ni una app de citas, ni un servicio de emparejamiento, ni un sistema de venta de entradas.',
            fr: 'L’anti-définition que se donne le produit est sans détour : ni une app de découverte d’événements de plus, ni une plateforme sociale, ni une app de rencontres, ni un service de matchmaking, ni un système de billetterie.',
            ja: 'プロダクト自身による「〜ではない」という定義は率直だ。ありふれたイベント発見アプリでも、ソーシャルプラットフォームでも、出会い系アプリでも、マッチングサービスでも、チケット販売システムでもない。',
          }),
        ),
      ),
      insight: '',
    },
    {
      id: 'vin-s04',
      blockType: 'csNarrative',
      label: 'constraints',
      heading: l(
        L({
          en: 'Nine non-negotiable rules, before a single screen.',
          fa: 'نه قاعده‌ی غیرقابل‌مذاکره، پیش از یک صفحه.',
          ar: 'تسع قواعد غير قابلة للتفاوض، قبل أي شاشة واحدة.',
          de: 'Neun nicht verhandelbare Regeln, vor einem einzigen Screen.',
          es: 'Nueve reglas innegociables, antes de una sola pantalla.',
          fr: 'Neuf règles non négociables, avant le moindre écran.',
          ja: '1画面も描く前に、譲れない9つのルール。',
        }),
      ),
      body: prose(
        dir,
        p(
          L({
            en: 'Several engagement patterns that work elsewhere are culturally wrong here — public leaderboards and competitive framing among them. The brief carries a long section on cultural considerations for Dubai: Ramadan scheduling, gender dynamics, alcohol, Arabic RTL support, and a three-phase cultural launch moving from expat professional to broader expat to Emirati integration.',
              fa: 'بعضی الگوهای رایج تعامل، مانند جدول رتبه‌بندی عمومی و رقابت آشکار، با زمینه‌ی فرهنگی این محصول سازگار نیستند. سند محصول به زمان‌بندی رمضان، روابط میان جنسیت‌ها، الکل و پشتیبانی از عربیِ راست‌به‌چپ می‌پردازد و عرضه را در سه مرحله پیش‌بینی می‌کند: حرفه‌ای‌های مهاجر، جامعه‌ی گسترده‌تر مهاجران و سپس کاربران اماراتی.',
            ar: 'بعض أنماط التفاعل التي تنجح في أماكن أخرى خاطئة ثقافيًا هنا — من بينها لوحات الصدارة العامة والصياغة التنافسية. يحمل الموجز قسمًا طويلًا عن الاعتبارات الثقافية لدبي: توقيت رمضان، وديناميكيات الجندر، والكحول، ودعم العربية من اليمين إلى اليسار، وإطلاق ثقافي من ثلاث مراحل ينتقل من المغترب المهني إلى المغتربين عمومًا إلى الاندماج الإماراتي.',
            de: 'Mehrere Engagement-Muster, die anderswo funktionieren, sind hier kulturell falsch — öffentliche Ranglisten und Wettbewerbs-Framing darunter. Der Brief enthält einen langen Abschnitt zu kulturellen Erwägungen für Dubai: Ramadan-Terminierung, Geschlechterdynamik, Alkohol, arabische RTL-Unterstützung, und ein dreiphasiger kultureller Launch vom Expat-Professional über breitere Expats bis zur emiratischen Integration.',
            es: 'Varios patrones de engagement que funcionan en otros lugares son culturalmente inadecuados aquí — entre ellos, las clasificaciones públicas y el enfoque competitivo. El brief incluye una larga sección sobre consideraciones culturales para Dubái: la programación durante el Ramadán, las dinámicas de género, el alcohol, el soporte de árabe RTL y un lanzamiento cultural en tres fases que avanza del profesional expatriado al expatriado en general y a la integración emiratí.',
            fr: 'Plusieurs mécaniques d’engagement qui fonctionnent ailleurs sont culturellement inadaptées ici — dont les classements publics et le cadrage compétitif. Le brief comporte une longue section sur les considérations culturelles propres à Dubaï : la programmation pendant le Ramadan, les dynamiques de genre, l’alcool, la prise en charge de l’arabe en RTL, et un lancement culturel en trois phases, du professionnel expatrié aux expatriés au sens large, puis à l’intégration émiratie.',
            ja: '他の場所では機能するエンゲージメントのパターンのいくつかは、ここでは文化的にふさわしくない——公開ランキングや競争をあおる見せ方もそのひとつだ。ブリーフにはドバイの文化的配慮についての長い章がある。ラマダン中のスケジュール、ジェンダーをめぐる力学、アルコール、アラビア語のRTL対応、そして外国人プロフェッショナルから外国人居住者全体へ、さらにエミラティ（UAE国民）の取り込みへと進む3段階の文化的ローンチ。',
          }),
        ),
        p(
          L({
            en: 'The process that produced VIN was later codified into a reusable design-and-audit protocol, with nine non-negotiable Dubai cultural rules and a locked table of intentional design decisions, each carrying its own reason.',
              fa: 'روش طراحی و بررسی VIN بعداً به پروتکلی قابل استفاده‌ی دوباره تبدیل شد؛ شامل نُه قاعده‌ی فرهنگی برای دبی و جدول تصمیم‌های طراحی که دلیل هر تصمیم در آن ثبت شده است.',
            ar: 'تحوّلت العملية التي أنتجت وين لاحقًا إلى بروتوكول تصميم وتدقيق قابل لإعادة الاستخدام، يضم تسع قواعد ثقافية غير قابلة للتفاوض لدبي وجدولًا مُقفَلًا من قرارات التصميم المتعمَّدة، لكل منها سببها الخاص.',
            de: 'Der Prozess, der VIN hervorbrachte, wurde später zu einem wiederverwendbaren Design-und-Audit-Protokoll kodifiziert, mit neun nicht verhandelbaren Dubai-Kulturregeln und einer verriegelten Tabelle bewusster Designentscheidungen, jede mit eigener Begründung.',
            es: 'El proceso que dio lugar a VIN se codificó después en un protocolo reutilizable de diseño y auditoría, con nueve reglas culturales innegociables para Dubái y una tabla cerrada de decisiones de diseño intencionadas, cada una con su propia razón.',
            fr: 'Le processus qui a produit VIN a ensuite été codifié en un protocole réutilisable de design et d’audit, avec neuf règles culturelles non négociables pour Dubaï et un tableau verrouillé de décisions de design délibérées, chacune avec sa propre justification.',
            ja: 'VINを生んだプロセスは、のちに再利用可能なデザイン・監査プロトコルとして体系化された。ドバイの文化に関する譲れない9つのルールと、意図的なデザイン判断を固定した表があり、判断にはそれぞれ理由が添えられている。',
          }),
        ),
      ),
      insight: '',
    },
    {
      id: 'vin-s05',
      blockType: 'csOwnership',
      intro: l(
        L({
          en: 'Product design and strategy, working alongside a separate development team that built and shipped the running app and the admin panel.',
          fa: 'طراحی و استراتژیِ محصول، در کنار یک تیم توسعه‌ی مستقل که اپ در حال اجرا و پنل مدیریت را ساخت و منتشر کرد.',
          ar: 'تصميم المنتج والاستراتيجية، بالتعاون مع فريق تطوير مستقل قام ببناء وإطلاق التطبيق العامل ولوحة الإدارة.',
          de: 'Produktdesign und -strategie, zusammen mit einem separaten Entwicklungsteam, das die laufende App und das Admin-Panel gebaut und veröffentlicht hat.',
          es: 'Diseño de producto y estrategia, junto a un equipo de desarrollo independiente que construyó y lanzó la app en funcionamiento y el panel de administración.',
          fr: 'Design produit et stratégie, aux côtés d’une équipe de développement distincte qui a construit et livré l’app en service et le panneau d’administration.',
          ja: 'プロダクトデザインと戦略。稼働中のアプリと管理画面を構築・リリースした別の開発チームと協働した。',
        }),
      ),
      own: l(
        L({
          en: [
            'The product brief, the problem inventory and the KPI model',
            'The mobile UI and its design system',
            'The brand and naming architecture',
            'The B2B venue layer and its go-to-market copy',
            'A QA review of the built app and a function scan of the admin panel',
          ],
          fa: [
            'سند محصول، فهرست مسئله‌ها و مدل شاخص‌ها',
            'رابط کاربری موبایل و سیستم طراحی آن',
            'معماری برند و نام‌گذاری',
            'لایه‌ی B2B مکان‌ها و متن ورود به بازار آن',
            'بازبینی کیفیت اپِ ساخته‌شده و اسکن عملکردیِ پنل مدیریت',
          ],
          ar: [
            'موجز المنتج، وفهرس المشكلات، ونموذج المؤشرات',
            'واجهة الهاتف ونظام التصميم الخاص بها',
            'هندسة العلامة التجارية والتسمية',
            'طبقة B2B للأماكن ونصوصها التسويقية لدخول السوق',
            'مراجعة جودة للتطبيق المبني ومسح وظيفي للوحة الإدارة',
          ],
          de: [
            'Der Produktbrief, das Problem-Inventar und das KPI-Modell',
            'Das Mobile-UI und sein Design-System',
            'Die Marken- und Namensarchitektur',
            'Die B2B-Venue-Ebene und ihre Go-to-Market-Texte',
            'Eine QA-Prüfung der gebauten App und ein Funktionsscan des Admin-Panels',
          ],
          es: [
            'El brief de producto, el inventario de problemas y el modelo de KPI',
            'La UI móvil y su sistema de diseño',
            'La arquitectura de marca y de nombres',
            'La capa B2B de locales y sus textos de salida al mercado',
            'Una revisión de QA de la app construida y un análisis funcional del panel de administración',
          ],
          fr: [
            'Le brief produit, l’inventaire des problèmes et le modèle de KPI',
            'L’UI mobile et son design system',
            'L’architecture de marque et de nommage',
            'La couche B2B des lieux et ses textes de mise sur le marché',
            'Une revue QA de l’app construite et un passage en revue fonctionnel du panneau d’administration',
          ],
          ja: [
            'プロダクトブリーフ、課題インベントリ、KPIモデル',
            'モバイルUIとそのデザインシステム',
            'ブランドとネーミングのアーキテクチャ',
            '店舗向けB2Bレイヤーとその市場投入コピー',
            '完成したアプリのQAレビューと、管理画面の機能スキャン',
          ],
        }),
      ),
      collaborate: l(
        L({
          en: [
            'A separate development team that built and shipped the running app and the admin panel at admin.viwin.link',
          ],
          fa: [
            'یک تیم توسعه‌ی مستقل که اپ در حال اجرا و پنل مدیریت را در admin.viwin.link ساخت و منتشر کرد',
          ],
          ar: [
            'فريق تطوير مستقل قام ببناء وإطلاق التطبيق العامل ولوحة الإدارة على admin.viwin.link',
          ],
          de: [
            'Ein separates Entwicklungsteam, das die laufende App und das Admin-Panel unter admin.viwin.link gebaut und veröffentlicht hat',
          ],
          es: [
            'Un equipo de desarrollo independiente que construyó y lanzó la app en funcionamiento y el panel de administración en admin.viwin.link',
          ],
          fr: [
            'Une équipe de développement distincte qui a construit et livré l’app en service et le panneau d’administration sur admin.viwin.link',
          ],
          ja: ['稼働中のアプリとadmin.viwin.linkの管理画面を構築・リリースした別の開発チーム'],
        }),
      ),
      note: l(
        L({
          en: "The brief documents the design and strategy work in detail; it doesn't specify the exact split of implementation decisions with the development team, so ownership here is limited to what's documented.",
              fa: 'سند محصول، کار طراحی و راهبرد را با جزئیات ثبت کرده، اما سهم دقیق من و تیم توسعه را در تصمیم‌های پیاده‌سازی مشخص نمی‌کند. بنابراین فقط کارهایی را به خود نسبت می‌دهم که مستند شده‌اند.',
          ar: 'يوثّق الموجز عمل التصميم والاستراتيجية بالتفصيل؛ لكنه لا يحدّد التقسيم الدقيق لقرارات التنفيذ مع فريق التطوير، لذا تقتصر الملكية هنا على ما هو موثّق.',
          de: 'Der Brief dokumentiert die Design- und Strategiearbeit im Detail; er spezifiziert nicht die genaue Aufteilung der Implementierungsentscheidungen mit dem Entwicklungsteam, daher beschränkt sich die Zuordnung hier auf das Dokumentierte.',
          es: 'El brief documenta en detalle el trabajo de diseño y estrategia; no especifica el reparto exacto de las decisiones de implementación con el equipo de desarrollo, así que la autoría aquí se limita a lo documentado.',
          fr: 'Le brief documente en détail le travail de design et de stratégie ; il ne précise pas la répartition exacte des décisions d’implémentation avec l’équipe de développement, si bien que la paternité revendiquée ici se limite à ce qui est documenté.',
          ja: 'ブリーフはデザインと戦略の仕事を詳しく記録しているが、実装上の判断を開発チームとどう分担したかまでは明記していない。そのため、ここで示す担当範囲は記録にあるものに限っている。',
        }),
      ),
    },
    {
      id: 'vin-s06',
      blockType: 'csProcess',
      kind: 'process',
      heading: l(
        L({
          en: 'Six layers, each producing an artifact the next one used.',
    fa: 'شش مرحله که خروجی هرکدام، ورودی مرحله‌ی بعد است.',
          ar: 'ست طبقات، تُنتج كل منها ناتجًا تستخدمه الطبقة التالية.',
          de: 'Sechs Ebenen, jede erzeugt ein Artefakt, das die nächste nutzt.',
          es: 'Seis capas, cada una produciendo un artefacto que usó la siguiente.',
          fr: 'Six couches, chacune produisant un livrable repris par la suivante.',
          ja: '6つのレイヤー。それぞれが生んだ成果物を、次のレイヤーが使った。',
        }),
      ),
      steps: [
        {
          id: 'vin-p01',
          code: '01',
          label: l(
            L({
              en: 'Brief',
              fa: 'سند محصول',
              ar: 'الموجز',
              de: 'Brief',
              es: 'Brief',
              fr: 'Brief',
              ja: 'ブリーフ',
            }),
          ),
          note: l(
            L({
              en: '3,716 lines: philosophy, three named personas, seven core flows, ten design principles',
              fa: '۳٬۷۱۶ خط: فلسفه، سه پرسونای نام‌دار، هفت جریان اصلی، ده اصل طراحی',
              ar: '3,716 سطرًا: فلسفة، وثلاث شخصيات مسمّاة، وسبعة تدفقات أساسية، وعشرة مبادئ تصميم',
              de: '3.716 Zeilen: Philosophie, drei benannte Personas, sieben Kernflüsse, zehn Designprinzipien',
              es: '3716 líneas: filosofía, tres personas con nombre, siete flujos principales, diez principios de diseño',
              fr: '3 716 lignes : philosophie, trois personas nommées, sept parcours clés, dix principes de design',
              ja: '3,716行：思想、名前付きの3つのペルソナ、7つのコアフロー、10のデザイン原則',
            }),
          ),
        },
        {
          id: 'vin-p02',
          code: '02',
          label: l(
            L({
              en: 'Inventory',
              fa: 'فهرست مسئله',
              ar: 'الفهرس',
              de: 'Inventar',
              es: 'Inventario',
              fr: 'Inventaire',
              ja: '課題インベントリ',
            }),
          ),
          note: l(
            L({
              en: '57 problems across five difficulty tiers, an 8-sheet workbook',
      fa: '۵۷ مسئله در پنج سطح دشواری، ثبت‌شده در فایلی با ۸ برگه',
              ar: '57 مشكلة عبر خمس مستويات صعوبة، وكتاب عمل من 8 أوراق',
              de: '57 Probleme über fünf Schwierigkeitsstufen, ein 8-Blatt-Arbeitsheft',
              es: '57 problemas en cinco niveles de dificultad, un libro de cálculo de 8 hojas',
              fr: '57 problèmes répartis sur cinq niveaux de difficulté, un classeur de 8 feuilles',
              ja: '5段階の難易度にわたる57の課題、8シートのワークブック',
            }),
          ),
        },
        {
          id: 'vin-p03',
          code: '03',
          label: l(
            L({
              en: 'KPIs',
              fa: 'شاخص‌ها',
              ar: 'مؤشرات الأداء',
              de: 'KPIs',
              es: 'KPI',
              fr: 'KPI',
              ja: 'KPI群',
            }),
          ),
          note: l(
            L({
              en: "20 KPIs across nine domains — seven of them guardrails against growth's own damage",
      fa: '۲۰ شاخص در نُه حوزه؛ هفت شاخص برای پیشگیری از پیامدهای منفی رشد',
              ar: '20 مؤشرًا عبر تسعة مجالات — سبعة منها حواجز أمان ضد الضرر الذي قد يُحدثه النمو نفسه',
              de: '20 KPIs über neun Domänen — sieben davon Leitplanken gegen den Schaden des Wachstums selbst',
              es: '20 KPI en nueve ámbitos — siete de ellos, salvaguardas contra el daño que causa el propio crecimiento',
              fr: '20 KPI répartis sur neuf domaines — dont sept garde-fous contre les dommages causés par la croissance elle-même',
              ja: '9領域にわたる20のKPI——うち7つは、成長そのものがもたらす害を防ぐガードレール',
            }),
          ),
        },
        {
          id: 'vin-p04',
          code: '04',
          label: l(
            L({
              en: 'UI',
              fa: 'رابط کاربری',
              ar: 'الواجهة',
              de: 'UI',
              es: 'UI',
              fr: 'UI',
              ja: 'UIデザイン',
            }),
          ),
          note: l(
            L({
              en: '126 screens across 11 sections, on a documented design system',
              fa: '۱۲۶ صفحه در ۱۱ بخش، روی یک سیستم طراحی مستند',
              ar: '126 شاشة عبر 11 قسمًا، على نظام تصميم موثّق',
              de: '126 Screens über 11 Bereiche, auf einem dokumentierten Design-System',
              es: '126 pantallas en 11 secciones, sobre un sistema de diseño documentado',
              fr: '126 écrans répartis en 11 sections, sur un design system documenté',
              ja: '11セクションにわたる126画面。文書化されたデザインシステムの上に構築',
            }),
          ),
        },
        {
          id: 'vin-p05',
          code: '05',
          label: l(
            L({
              en: 'Brand',
              fa: 'برند',
              ar: 'العلامة التجارية',
              de: 'Marke',
              es: 'Marca',
              fr: 'Marque',
              ja: 'ブランド',
            }),
          ),
          note: l(
            L({
              en: "A naming architecture that retires 'Meetup' and 'Event' as vocabulary",
      fa: 'معماری نام‌گذاری برای کنارگذاشتن واژه‌های «میت‌آپ» و «رویداد»',
              ar: 'هندسة تسمية تُقاعد مصطلحي "Meetup" و"Event"',
              de: 'Eine Namensarchitektur, die „Meetup“ und „Event“ als Vokabular ausmustert',
              es: 'Una arquitectura de nombres que retira «Meetup» y «Event» del vocabulario',
              fr: 'Une architecture de nommage qui retire « Meetup » et « Event » du vocabulaire',
              ja: '「Meetup」と「Event」を語彙から外すネーミングアーキテクチャ',
            }),
          ),
        },
        {
          id: 'vin-p06',
          code: '06',
          label: l(
            L({
              en: 'GTM & QA',
              fa: 'ورود به بازار و کیفیت',
              ar: 'دخول السوق والجودة',
              de: 'GTM & QA',
              es: 'GTM y QA',
              fr: 'GTM et QA',
              ja: 'GTMとQA',
            }),
          ),
          note: l(
            L({
              en: 'An ASO pack, plus a dated QA review of the built app and admin panel',
              fa: 'یک بسته‌ی ASO، به‌همراه بازبینی کیفیتِ تاریخ‌دار از اپ ساخته‌شده و پنل مدیریت',
              ar: 'حزمة ASO، إضافة إلى مراجعة جودة مؤرَّخة للتطبيق المبني ولوحة الإدارة',
              de: 'Ein ASO-Paket, plus eine datierte QA-Prüfung der gebauten App und des Admin-Panels',
              es: 'Un paquete de ASO, además de una revisión de QA fechada de la app construida y del panel de administración',
              fr: 'Un kit ASO, plus une revue QA datée de l’app construite et du panneau d’administration',
              ja: 'ASOパッケージに加え、完成したアプリと管理画面の日付入りQAレビュー',
            }),
          ),
        },
      ],
    },
    {
      id: 'vin-s06a',
      blockType: 'csFigure',
      layout: 'sequence',
      treatment: 'screen',
      items: [
        ...item('homeDefault', 'vin-f06a-1'),
        ...item('tickets', 'vin-f06a-2'),
        ...item('chatSingle', 'vin-f06a-3'),
        ...item('activityMeets', 'vin-f06a-4'),
      ],
      caption: l(
        L({
          en: 'One tab each: the home feed, tickets, chat and the activity log. Four of eleven sections — 126 screens sit behind them, on one component system.',
          fa: 'هر تب یکی: فید خانه، بلیت‌ها، گفت‌وگو و گزارش فعالیت. چهار بخش از یازده بخش — ۱۲۶ صفحه پشت آن‌ها، روی یک سیستم کامپوننت.',
          ar: 'تبويب لكل واحدة: الصفحة الرئيسية، والتذاكر، والدردشة، وسجل النشاط. أربعة من أحد عشر قسمًا — خلفها 126 شاشة على نظام مكوّنات واحد.',
          de: 'Je ein Tab: Home-Feed, Tickets, Chat und das Aktivitätsprotokoll. Vier von elf Sektionen — dahinter liegen 126 Screens auf einem Komponentensystem.',
          es: 'Una pestaña cada una: el feed de inicio, los tickets, el chat y el registro de actividad. Cuatro de las once secciones — detrás de ellas hay 126 pantallas, sobre un único sistema de componentes.',
          fr: 'Un onglet chacun : le fil d’accueil, les billets, le chat et le journal d’activité. Quatre des onze sections — 126 écrans se tiennent derrière, sur un seul système de composants.',
          ja: '各タブからひとつずつ：ホームフィード、チケット、チャット、アクティビティログ。11セクションのうちの4つ——その背後に、ひとつのコンポーネントシステム上の126画面が控えている。',
        }),
      ),
    },
    // How the roadmap was made — layers 02 and 03 above, opened up. Every number traces to the two
    // workbooks, which the chapter then offers as downloads.
    {
      id: 'vin-s06b',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: l(
        L({
          en: 'Roadmap',
          fa: 'نقشه‌ی راه',
          ar: 'خارطة الطريق',
          de: 'Roadmap',
          es: 'Hoja de ruta',
          fr: 'Feuille de route',
          ja: 'ロードマップ',
        }),
      ),
      heading: l(
        L({
          en: 'The roadmap started as a list of 57 problems.',
          fa: 'نقشه‌ی راه با فهرست ۵۷ مسئله شروع شد.',
          ar: 'بدأت خارطة الطريق بقائمة من 57 مشكلة.',
          de: 'Die Roadmap begann mit einer Liste von 57 Problemen.',
          es: 'La hoja de ruta empezó como una lista de 57 problemas.',
          fr: 'La feuille de route est partie d’une liste de 57 problèmes.',
          ja: 'ロードマップは、57の課題のリストから始まった。',
        }),
      ),
      body: prose(
        dir,
        p(
          L({
            en: "Before any sprint was planned, every problem the product would face went into one inventory: 57 in all, each tagged with where it sits — attendees, hosts, the platform or VIN's own model. Each problem lists the features that could solve it and a KPI with a target. Then it goes into one of five tiers by effort, from quick wins that take days to fundamental tensions that are managed, never solved.",
            fa: 'پیش از برنامه‌ریزی اسپرینت‌ها، همه‌ی مسئله‌هایی که محصول با آن‌ها روبه‌رو می‌شد در یک فهرست جمع شد: ۵۷ مسئله. برای هر مسئله مشخص است به شرکت‌کننده‌ها، میزبان‌ها، پلتفرم یا مدل خاص وین مربوط می‌شود. کنار هرکدام، قابلیت‌هایی که می‌توانند حلش کنند و یک KPI با عدد هدف آمده است. بعد هر مسئله بر اساس حجم کار در یکی از پنج سطح قرار گرفت؛ از کارهای سریعی که چند روز طول می‌کشند تا تنش‌های بنیادی که حل نمی‌شوند و فقط باید مدیریت شوند.',
            ar: 'قبل التخطيط لأي سبرنت، جُمعت كل مشكلة قد يواجهها المنتج في قائمة واحدة: 57 مشكلة، لكلٍّ منها وسمٌ يحدد موقعها — الحضور، أو المضيفون، أو المنصّة، أو نموذج VIN نفسه. تسرد كل مشكلة الميزات التي قد تحلّها ومؤشر أداء بهدف محدد. ثم توضع في واحد من خمسة مستويات بحسب الجهد، من مكاسب سريعة تستغرق أيامًا إلى توترات جوهرية تُدار ولا تُحل.',
            de: 'Bevor ein Sprint geplant wurde, kam jedes Problem, auf das das Produkt stoßen würde, in ein Inventar: 57 insgesamt, jedes danach markiert, wo es liegt — bei Teilnehmenden, Hosts, der Plattform oder VINs eigenem Modell. Zu jedem Problem gehören die Features, die es lösen könnten, und ein KPI mit Zielwert. Dann landet es nach Aufwand in einer von fünf Stufen, von Quick Wins, die Tage dauern, bis zu grundlegenden Spannungen, die man steuert und nie löst.',
            es: 'Antes de planificar ningún sprint, cada problema al que se enfrentaría el producto entró en un inventario: 57 en total, cada uno etiquetado según dónde se sitúa — asistentes, anfitriones, la plataforma o el propio modelo de VIN. Cada problema recoge las funcionalidades que podrían resolverlo y un KPI con un objetivo. Después pasa a uno de cinco niveles según el esfuerzo, desde victorias rápidas que llevan días hasta tensiones de fondo que se gestionan y nunca se resuelven.',
            fr: 'Avant de planifier le moindre sprint, chaque problème que le produit allait rencontrer est entré dans un inventaire : 57 au total, chacun classé selon l’endroit où il se situe — participants, organisateurs, plateforme ou modèle propre à VIN. Chaque problème indique les fonctionnalités qui pourraient le résoudre et un KPI avec une cible. Il est ensuite rangé dans l’un des cinq niveaux selon l’effort, des gains rapides qui prennent quelques jours aux tensions de fond, que l’on gère sans jamais les résoudre.',
            ja: 'スプリントを計画する前に、プロダクトが直面しうる課題をすべてひとつのインベントリにまとめた。全部で57。それぞれに、参加者、ホスト、プラットフォーム、VIN独自のモデルのどこに属するかのタグを付けた。各課題には、解決につながる機能と、目標値つきのKPIを記している。そのうえで工数に応じて5つの段階に振り分けた。数日で終わるクイックウィンから、解決はできず管理し続けるしかない根本的な緊張関係までだ。',
          }),
        ),
        p(
          L({
            en: 'The KPI pack defines those numbers once. Each of its 20 KPIs has a plain formula, the segments to cut it by and a tracking status: one north star, twelve drivers and seven guardrails that watch for damage from growth. Only six could be measured on day one. The order of work then came from the tiers, as the four phases below.',
            fa: 'بسته‌ی KPI این عددها را یک‌جا تعریف می‌کند. هرکدام از ۲۰ شاخص فرمولی ساده، بخش‌بندی‌های لازم برای تحلیل و وضعیت ردیابی دارد. یکی از آن‌ها شاخص اصلی است، دوازده شاخص آن را جلو می‌برند و هفت شاخص مراقب پیامدهای منفی رشد هستند. از روز اول فقط شش شاخص قابل اندازه‌گیری بود. ترتیب کار هم از همین سطح‌ها به دست آمد و در چهار مرحله‌ی زیر آمده است.',
            ar: 'تعرّف حزمة المؤشرات هذه الأرقام مرة واحدة. لكل مؤشر من مؤشراتها العشرين صيغة واضحة، والشرائح التي يُقسَّم بحسبها، وحالة التتبّع: مؤشر شمالي واحد، واثنا عشر مؤشرًا دافعًا، وسبعة حواجز أمان ترصد الضرر الذي قد يسببه النمو. ستة منها فقط كانت قابلة للقياس من اليوم الأول. ثم جاء ترتيب العمل من المستويات، في المراحل الأربع أدناه.',
            de: 'Das KPI-Paket definiert diese Zahlen einmal. Jeder der 20 KPIs hat eine einfache Formel, die Segmente, nach denen man ihn aufschlüsselt, und einen Tracking-Status: ein Nordstern, zwölf Treiber und sieben Leitplanken, die auf Schäden durch Wachstum achten. Nur sechs ließen sich ab dem ersten Tag messen. Die Reihenfolge der Arbeit ergab sich dann aus den Stufen, in den vier Phasen unten.',
            es: 'El paquete de KPI define esas cifras una sola vez. Cada uno de sus 20 KPI tiene una fórmula sencilla, los segmentos por los que desglosarlo y un estado de seguimiento: una estrella polar, doce impulsores y siete salvaguardas que vigilan el daño que puede causar el crecimiento. Solo seis se podían medir desde el primer día. El orden del trabajo salió después de los niveles, en las cuatro fases de abajo.',
            fr: 'Le kit de KPI définit ces chiffres une seule fois. Chacun de ses 20 KPI a une formule simple, les segments selon lesquels le ventiler et un statut de suivi : une étoile polaire, douze leviers et sept garde-fous qui surveillent les dégâts que la croissance peut causer. Seuls six étaient mesurables dès le premier jour. L’ordre du travail découle ensuite des niveaux, dans les quatre phases ci-dessous.',
            ja: 'KPIパックは、それらの数字を一度だけ定義する。20のKPIそれぞれに、簡潔な計算式、分析の切り口となるセグメント、計測の準備状況がある。北極星指標が1つ、それを動かすドライバーが12、成長がもたらす害を見張るガードレールが7つ。初日から計測できたのは6つだけだった。作業の順番は段階から決まり、下の4つのフェーズになった。',
          }),
        ),
      ),
      insight: l(
        L({
          en: 'Each item on the roadmap is a problem with a number attached, so the team can tell when it is solved.',
          fa: 'هر قدم نقشه‌ی راه یک مسئله است با یک عدد مشخص؛ عددی که نشان می‌دهد مسئله حل شده است یا نه.',
          ar: 'كل بند في خارطة الطريق مشكلةٌ مرتبطة برقم، ليعرف الفريق متى حُلّت.',
          de: 'Jeder Punkt der Roadmap ist ein Problem mit einer Zahl daneben, damit das Team erkennt, wann es gelöst ist.',
          es: 'Cada punto de la hoja de ruta es un problema con una cifra al lado, para que el equipo sepa cuándo está resuelto.',
          fr: 'Chaque ligne de la feuille de route est un problème associé à un chiffre, pour que l’équipe sache quand il est résolu.',
          ja: 'ロードマップの各項目は、数字と対になった課題だ。だからチームは、いつ解決したかがわかる。',
        }),
      ),
    },
    {
      id: 'vin-s06c',
      blockType: 'csProcess',
      kind: 'process',
      heading: l(
        L({
          en: "The order of work, from the inventory's summary sheet",
          fa: 'ترتیب کار، بر اساس برگه‌ی خلاصه‌ی فهرست مسئله‌ها',
          ar: 'ترتيب العمل، من ورقة الملخص في فهرس المشكلات',
          de: 'Die Reihenfolge der Arbeit, aus dem Übersichtsblatt des Inventars',
          es: 'El orden del trabajo, según la hoja de resumen del inventario',
          fr: 'L’ordre du travail, d’après la feuille de synthèse de l’inventaire',
          ja: 'インベントリのサマリーシートが示す作業の順番',
        }),
      ),
      steps: [
        {
          id: 'vin-r01',
          code: '01',
          label: l(
            L({
              en: 'Sprints 1–2',
              fa: 'اسپرینت ۱ و ۲',
              ar: 'السبرنت 1–2',
              de: 'Sprints 1–2',
              es: 'Sprints 1–2',
              fr: 'Sprints 1–2',
              ja: 'スプリント1–2',
            }),
          ),
          note: l(
            L({
              en: 'All eight quick wins: small fixes that remove obvious friction',
              fa: 'هر هشت کار سریع: اصلاح‌های کوچکی که مانع‌های آشکار را برمی‌دارند',
              ar: 'المكاسب السريعة الثمانية كلها: إصلاحات صغيرة تزيل العوائق الواضحة',
              de: 'Alle acht Quick Wins: kleine Korrekturen, die offensichtliche Reibung entfernen',
              es: 'Las ocho victorias rápidas: arreglos pequeños que quitan la fricción evidente',
              fr: 'Les huit gains rapides : de petites corrections qui retirent les frictions évidentes',
              ja: '8つのクイックウィンすべて：明らかな摩擦を取り除く小さな修正',
            }),
          ),
        },
        {
          id: 'vin-r02',
          code: '02',
          label: l(
            L({
              en: 'Sprints 3–5',
              fa: 'اسپرینت ۳ تا ۵',
              ar: 'السبرنت 3–5',
              de: 'Sprints 3–5',
              es: 'Sprints 3–5',
              fr: 'Sprints 3–5',
              ja: 'スプリント3–5',
            }),
          ),
          note: l(
            L({
              en: 'Connection logging, positioning and the first visit: what VIN is to a new user',
              fa: 'ثبت ارتباط، جایگاه محصول و اولین ورود: اینکه وین برای کاربر تازه چیست',
              ar: 'تسجيل التواصل، والتموضع، والزيارة الأولى: ما هو VIN للمستخدم الجديد',
              de: 'Verbindungen protokollieren, Positionierung und der erste Besuch: was VIN für neue Nutzer ist',
              es: 'Registro de conexiones, posicionamiento y la primera visita: qué es VIN para un usuario nuevo',
              fr: 'Enregistrement des connexions, positionnement et première visite : ce qu’est VIN pour un nouvel utilisateur',
              ja: 'つながりの記録、ポジショニング、初回訪問：新しいユーザーにとってVINとは何か',
            }),
          ),
        },
        {
          id: 'vin-r03',
          code: '03',
          label: l(
            L({
              en: 'Sprints 6–10',
              fa: 'اسپرینت ۶ تا ۱۰',
              ar: 'السبرنت 6–10',
              de: 'Sprints 6–10',
              es: 'Sprints 6–10',
              fr: 'Sprints 6–10',
              ja: 'スプリント6–10',
            }),
          ),
          note: l(
            L({
              en: 'No-shows, trust, social anxiety and host tools: what makes each meetup work',
              fa: 'غیبت در دورهمی، اعتماد، اضطراب اجتماعی و ابزارهای میزبان: آنچه هر دورهمی را به نتیجه می‌رساند',
              ar: 'الغياب، والثقة، والقلق الاجتماعي، وأدوات المضيف: ما يجعل كل لقاء ينجح',
              de: 'No-Shows, Vertrauen, soziale Angst und Host-Werkzeuge: was jedes Meetup funktionieren lässt',
              es: 'Ausencias, confianza, ansiedad social y herramientas del anfitrión: lo que hace que cada meetup funcione',
              fr: 'Absences, confiance, anxiété sociale et outils de l’organisateur : ce qui fait fonctionner chaque meetup',
              ja: 'ノーショー、信頼、社会的な不安、ホスト向けツール：各ミートアップを成り立たせるもの',
            }),
          ),
        },
        {
          id: 'vin-r04',
          code: '04',
          label: l(
            L({
              en: 'Ongoing',
              fa: 'مداوم',
              ar: 'مستمر',
              de: 'Laufend',
              es: 'Continuo',
              fr: 'En continu',
              ja: '継続',
            }),
          ),
          note: l(
            L({
              en: 'The very hard tier and the fundamental tensions, as the user base grows',
              fa: 'سطح خیلی سخت و تنش‌های بنیادی، هم‌زمان با رشد کاربران',
              ar: 'المستوى الأصعب والتوترات الجوهرية، مع نمو قاعدة المستخدمين',
              de: 'Die sehr schwere Stufe und die grundlegenden Spannungen, während die Nutzerbasis wächst',
              es: 'El nivel muy difícil y las tensiones de fondo, a medida que crece la base de usuarios',
              fr: 'Le niveau très difficile et les tensions de fond, au fil de la croissance de la base d’utilisateurs',
              ja: '非常に難しい段階と根本的な緊張関係。ユーザー基盤の成長に合わせて',
            }),
          ),
        },
      ],
    },
    {
      id: 'vin-s06d',
      blockType: 'csDownloads',
      heading: l(
        L({
          en: 'The two workbooks behind the roadmap',
          fa: 'دو فایل اکسل این نقشه‌ی راه',
          ar: 'الملفان وراء خارطة الطريق',
          de: 'Die zwei Arbeitsmappen hinter der Roadmap',
          es: 'Los dos libros de cálculo detrás de la hoja de ruta',
          fr: 'Les deux classeurs derrière la feuille de route',
          ja: 'ロードマップの元になった2つのワークブック',
        }),
      ),
      items: [
        ...download(
          'problemInventory',
          'vin-dl01',
          L({
            en: 'Problem inventory',
            fa: 'فهرست مسئله‌ها',
            ar: 'فهرس المشكلات',
            de: 'Problem-Inventar',
            es: 'Inventario de problemas',
            fr: 'Inventaire des problèmes',
            ja: '課題インベントリ',
          }),
          L({
            en: '57 problems in five tiers, each with the features that could solve it and a KPI target. Eight sheets, ending in a summary with the order of work.',
            fa: '۵۷ مسئله در پنج سطح، هرکدام با قابلیت‌های پیشنهادی و یک KPI با عدد هدف. فایل هشت برگه دارد و برگه‌ی آخر، خلاصه و ترتیب کار است.',
            ar: '57 مشكلة في خمسة مستويات، لكلٍّ منها الميزات التي قد تحلّها وهدف لمؤشر الأداء. ثماني أوراق، آخرها ملخص بترتيب العمل.',
            de: '57 Probleme in fünf Stufen, jedes mit den Features, die es lösen könnten, und einem KPI-Ziel. Acht Blätter, am Ende eine Übersicht mit der Reihenfolge der Arbeit.',
            es: '57 problemas en cinco niveles, cada uno con las funcionalidades que podrían resolverlo y un objetivo de KPI. Ocho hojas, que terminan en un resumen con el orden del trabajo.',
            fr: '57 problèmes répartis en cinq niveaux, chacun avec les fonctionnalités qui pourraient le résoudre et une cible de KPI. Huit feuilles, dont la dernière résume l’ordre du travail.',
            ja: '5段階に分けた57の課題。それぞれに解決につながる機能とKPIの目標値がある。全8シートで、最後のシートに作業の順番をまとめている。',
          }),
        ),
        ...download(
          'kpiStarterPack',
          'vin-dl02',
          L({
            en: 'KPI starter pack',
            fa: 'بسته‌ی شروع KPI',
            ar: 'حزمة البداية لمؤشرات الأداء',
            de: 'KPI-Starterpaket',
            es: 'Paquete inicial de KPI',
            fr: 'Kit de démarrage KPI',
            ja: 'KPIスターターパック',
          }),
          L({
            en: '20 KPIs with formulas, segments and tracking status, plus templates for a dashboard, a metric tree, and baselines and targets.',
            fa: '۲۰ شاخص با فرمول، بخش‌بندی و وضعیت ردیابی، به‌همراه قالب‌هایی برای داشبورد، درخت شاخص‌ها و مقدار پایه و هدف.',
            ar: '20 مؤشرًا بصيغها وشرائحها وحالة تتبّعها، مع قوالب للوحة المتابعة، وشجرة المؤشرات، والقيم الأساسية والأهداف.',
            de: '20 KPIs mit Formeln, Segmenten und Tracking-Status, dazu Vorlagen für ein Dashboard, einen Metrikbaum sowie Ausgangswerte und Ziele.',
            es: '20 KPI con fórmulas, segmentos y estado de seguimiento, además de plantillas para un panel, un árbol de métricas y los valores de base y objetivos.',
            fr: '20 KPI avec formules, segments et statut de suivi, plus des modèles pour un tableau de bord, un arbre de métriques, et les valeurs de référence et cibles.',
            ja: '計算式、セグメント、計測状況つきの20のKPIに加え、ダッシュボード、メトリクスツリー、ベースラインと目標値のテンプレート。',
          }),
        ),
      ],
    },
    {
      id: 'vin-s07',
      blockType: 'csNarrative',
      label: 'approach',
      heading: l(
        L({
          en: 'Eleven sections, 126 screens, one documented system.',
          fa: 'یازده بخش، ۱۲۶ صفحه، یک سیستم مستند.',
          ar: 'أحد عشر قسمًا، 126 شاشة، نظام موثّق واحد.',
          de: 'Elf Bereiche, 126 Screens, ein dokumentiertes System.',
          es: 'Once secciones, 126 pantallas, un sistema documentado.',
          fr: 'Onze sections, 126 écrans, un système documenté.',
          ja: '11セクション、126画面、ひとつの文書化されたシステム。',
        }),
      ),
      body: prose(
        dir,
        p(
          L({
            en: 'One App canvas holds the whole product — 17,589 nodes across 11 Figma sections: Profile (27 screens), Meet up Detail (23, including four cancellation variants), Sponser (19, the B2B venue layer), Chat (13), the Final Wizard (11), Home (7), and six smaller flows.',
            fa: 'یک بوم App کل محصول را در خود دارد — ۱۷٬۵۸۹ گره در ۱۱ بخش فیگما: پروفایل (۲۷ صفحه)، جزئیات میت‌آپ (۲۳، شامل چهار گونه‌ی لغو)، Sponser (۱۹، لایه‌ی B2B مکان‌ها)، گفت‌وگو (۱۳)، ویزارد نهایی (۱۱)، خانه (۷)، و شش جریان کوچک‌تر.',
            ar: 'يحمل لوح App واحد المنتج كله — 17,589 عقدة عبر 11 قسمًا في Figma: الملف الشخصي (27 شاشة)، تفاصيل اللقاء (23، بما فيها أربعة أنماط إلغاء)، Sponser (19، طبقة B2B للأماكن)، الدردشة (13)، المعالج النهائي (11)، الرئيسية (7)، وستة تدفقات أصغر.',
            de: 'Eine App-Canvas hält das gesamte Produkt — 17.589 Nodes über 11 Figma-Bereiche: Profile (27 Screens), Meet-up-Detail (23, inklusive vier Storno-Varianten), Sponser (19, die B2B-Venue-Ebene), Chat (13), der Final Wizard (11), Home (7) und sechs kleinere Flows.',
            es: 'Un único lienzo App contiene todo el producto — 17 589 nodos en 11 secciones de Figma: Profile (27 pantallas), Meet up Detail (23, incluidas cuatro variantes de cancelación), Sponser (19, la capa B2B de locales), Chat (13), el Final Wizard (11), Home (7) y seis flujos más pequeños.',
            fr: 'Un seul canevas App contient tout le produit — 17 589 nœuds répartis sur 11 sections Figma : Profile (27 écrans), Meet up Detail (23, dont quatre variantes d’annulation), Sponser (19, la couche B2B des lieux), Chat (13), le Final Wizard (11), Home (7) et six parcours plus petits.',
            ja: 'ひとつのAppキャンバスにプロダクト全体が収まっている——11のFigmaセクションにわたる17,589ノード：Profile（27画面）、Meet up Detail（23画面、キャンセルバリアント4つを含む）、Sponser（19画面、店舗向けB2Bレイヤー）、Chat（13画面）、Final Wizard（11画面）、Home（7画面）、そして6つの小さなフロー。',
          }),
        ),
        p(
          L({
            en: 'The design system runs on #1d2b3b with a phosphorescent #daed00 accent and Hurme Geometric Sans 3 — 21 named type styles and a deliberate radius system: 20px cards, 48px pill CTAs, 30px category chips, 32px tab bar. Cards are properly variant-driven, not duplicated per state.',
            fa: 'سیستم طراحی روی #1d2b3b با شاخصِ فسفریِ #daed00 و فونت Hurme Geometric Sans 3 کار می‌کند — ۲۱ سبک نام‌دار و سیستم شعاعی عامدانه: کارت‌های ۲۰پیکسل، دکمه‌های قرصیِ ۴۸پیکسل، چیپ‌های دسته‌بندیِ ۳۰پیکسل، نوار تب ۳۲پیکسل. کارت‌ها به‌درستی گونه‌محورند، نه تکراری برای هر وضعیت.',
            ar: 'يعمل نظام التصميم على #1d2b3b بلمسة فسفورية #daed00 وخط Hurme Geometric Sans 3 — 21 نمط نص مسمّى ونظام انحناء متعمَّد: بطاقات 20 بكسل، وأزرار حبوب 48 بكسل، وشرائح تصنيف 30 بكسل، وشريط تبويب 32 بكسل. البطاقات مبنية بشكل صحيح على الأنماط، لا مكررة لكل حالة.',
            de: 'Das Design-System läuft auf #1d2b3b mit einem phosphoreszierenden #daed00-Akzent und Hurme Geometric Sans 3 — 21 benannte Typenstile und ein bewusstes Radius-System: 20px-Karten, 48px-Pill-CTAs, 30px-Kategorie-Chips, 32px-Tableiste. Karten sind sauber variantengetrieben, nicht pro Zustand dupliziert.',
            es: 'El sistema de diseño se apoya en #1d2b3b con un acento fosforescente #daed00 y Hurme Geometric Sans 3 — 21 estilos tipográficos con nombre y un sistema de radios deliberado: tarjetas de 20px, CTA en forma de píldora de 48px, chips de categoría de 30px y barra de pestañas de 32px. Las tarjetas se controlan de verdad mediante variantes, sin duplicarse por estado.',
            fr: 'Le design system repose sur #1d2b3b avec un accent phosphorescent #daed00 et Hurme Geometric Sans 3 — 21 styles typographiques nommés et un système de rayons délibéré : cartes à 20px, CTA en pilule à 48px, puces de catégorie à 30px, barre d’onglets à 32px. Les cartes sont réellement pilotées par des variantes, et non dupliquées pour chaque état.',
            ja: 'デザインシステムは#1d2b3bをベースに、蛍光色の#daed00をアクセントとし、書体はHurme Geometric Sans 3——21の名前付きタイプスタイルと、意図的な角丸のシステム：カードは20px、ピル型のCTAは48px、カテゴリーチップは30px、タブバーは32px。カードは状態ごとに複製されるのではなく、きちんとバリアントで制御されている。',
          }),
        ),
      ),
      insight: '',
    },
    {
      id: 'vin-s08',
      blockType: 'csFigure',
      layout: 'sequence',
      treatment: 'plain',
      items: [
        ...item('dsColor', 'vin-f08-1'),
        ...item('dsTypography', 'vin-f08-2'),
        ...item('dsCards', 'vin-f08-3'),
      ],
      caption: l(
        L({
          en: 'Three of twelve component groups — 221 component nodes on their own design-system page, versioned independently of the app canvas.',
          fa: 'سه نمونه از دوازده گروه کامپوننت — ۲۲۱ گره‌ی کامپوننت روی صفحه‌ی مستقل سیستم طراحی، با نسخه‌بندیِ مستقل از بوم اپ.',
          ar: 'ثلاث من اثنتي عشرة مجموعة مكوّنات — 221 عقدة مكوّن على صفحة نظام التصميم الخاصة بها، بترقيم إصدارات مستقل عن لوح التطبيق.',
          de: 'Drei von zwölf Komponentengruppen — 221 Komponenten-Nodes auf einer eigenen Design-System-Seite, unabhängig von der App-Canvas versioniert.',
          es: 'Tres de los doce grupos de componentes — 221 nodos de componente en su propia página del sistema de diseño, versionada de forma independiente del lienzo de la app.',
          fr: 'Trois des douze groupes de composants — 221 nœuds de composants sur leur propre page de design system, versionnée indépendamment du canevas de l’app.',
          ja: '12のコンポーネントグループのうちの3つ——221のコンポーネントノードが専用のデザインシステムページにあり、アプリのキャンバスとは別にバージョン管理されている。',
        }),
      ),
    },
    {
      id: 'vin-s08a',
      blockType: 'csFigure',
      layout: 'sequence',
      treatment: 'screen',
      items: [
        ...item('homeNoInternet', 'vin-f08a-1'),
        ...item('chatEmpty', 'vin-f08a-2'),
        ...item('cancelLastMinute', 'vin-f08a-3'),
      ],
      caption: l(
        L({
          en: 'The states a spec gets judged by: an offline screen that keeps the tab bar in place, an empty chat that points back at joining a meetup, and cancelling a paid meetup inside 24 hours — one of four cancellation variants, each with its own refund sentence.',
          fa: 'حالت‌هایی که یک اسپک با آن‌ها سنجیده می‌شود: صفحه‌ی آفلاین که نوار تب را سر جایش نگه می‌دارد، گفت‌وگوی خالی که به پیوستن به میت‌آپ بازمی‌گرداند، و لغو میت‌آپ پولی در کمتر از ۲۴ ساعت — یکی از چهار گونه‌ی لغو، هرکدام با جمله‌ی بازگشت وجه خودش.',
          ar: 'الحالات التي يُحكم بها على المواصفة: شاشة دون اتصال تُبقي شريط التبويب في مكانه، ودردشة فارغة تعيدك إلى الانضمام للقاء، وإلغاء لقاء مدفوع خلال 24 ساعة — واحدة من أربع حالات إلغاء، لكل منها جملتها عن الاسترداد.',
          de: 'Die Zustände, an denen eine Spezifikation gemessen wird: ein Offline-Screen, der die Tab-Bar behält, ein leerer Chat, der auf das Beitreten zurückverweist, und die Absage eines bezahlten Meetups innerhalb von 24 Stunden — eine von vier Storno-Varianten, jede mit ihrem eigenen Erstattungssatz.',
          es: 'Los estados por los que se juzga una especificación: una pantalla sin conexión que mantiene la barra de pestañas en su sitio, un chat vacío que remite a unirse a un meetup y la cancelación de un meetup de pago con menos de 24 horas de antelación — una de las cuatro variantes de cancelación, cada una con su propia frase sobre el reembolso.',
          fr: 'Les états sur lesquels on juge une spécification : un écran hors ligne qui garde la barre d’onglets en place, un chat vide qui renvoie vers la participation à un meetup, et l’annulation d’un meetup payant à moins de 24 heures — l’une des quatre variantes d’annulation, chacune avec sa propre phrase sur le remboursement.',
          ja: '仕様の出来が問われる状態：タブバーを残したままのオフライン画面、ミートアップへの参加へと誘導する空のチャット、そして有料ミートアップの24時間以内のキャンセル——4つあるキャンセルバリアントのひとつで、それぞれに返金についての一文がある。',
        }),
      ),
    },
    {
      id: 'vin-s09',
      blockType: 'csNarrative',
      label: 'solution',
      heading: l(
        L({
          en: 'The thesis sits in the first screen of the most-used flow.',
          fa: 'فرضیه‌ی اصلی در اولین صفحه‌ی پرکاربردترین جریان نشسته است.',
          ar: 'الفرضية الأساسية تقبع في الشاشة الأولى لأكثر التدفقات استخدامًا.',
          de: 'Die These sitzt im ersten Screen des meistgenutzten Flows.',
          es: 'La tesis está en la primera pantalla del flujo más usado.',
          fr: 'La thèse tient dans le premier écran du parcours le plus utilisé.',
          ja: 'テーゼは、最もよく使われるフローの最初の画面にある。',
        }),
      ),
      body: prose(
        dir,
        p(
          L({
            en: "Meetup creation opens as a conversation, not a form: 'Hi Sina, what is your goal of Create a Meet up?' — with four intents, the fourth an honest escape hatch for people who don't want the strategy layer at all: meet new people, analyse my network, strengthen existing connections, or just do an activity.",
            fa: 'ساخت میت‌آپ به‌جای فرم، مثل یک گفت‌وگو باز می‌شود: «سلام سینا، هدفت از ساخت میت‌آپ چیست؟» — با چهار قصد، که چهارمی‌شان دریچه‌ی صادقانه‌ای است برای کسانی که اصلاً لایه‌ی استراتژی را نمی‌خواهند: آشنایی با افراد جدید، تحلیل شبکه‌ام، تقویت ارتباط‌های موجود، یا فقط انجام یک فعالیت.',
            ar: 'يُفتح إنشاء اللقاء كمحادثة، لا كنموذج: «مرحبًا سينا، ما هدفك من إنشاء لقاء؟» — بأربع نوايا، رابعتها منفذ صريح لمن لا يريدون طبقة الاستراتيجية إطلاقًا: التعرّف على أشخاص جدد، تحليل شبكتي، تعزيز التواصلات القائمة، أو فقط ممارسة نشاط.',
            de: 'Die Meetup-Erstellung öffnet als Gespräch, nicht als Formular: „Hi Sina, was ist dein Ziel beim Erstellen eines Meetups?“ — mit vier Intents, der vierte ein ehrliches Fluchttor für alle, die die Strategieebene gar nicht wollen: neue Leute treffen, mein Netzwerk analysieren, bestehende Verbindungen stärken, oder einfach eine Aktivität machen.',
            es: 'La creación de un meetup se abre como una conversación, no como un formulario: «Hi Sina, what is your goal of Create a Meet up?» — con cuatro intenciones, la cuarta una honesta vía de escape para quien no quiere en absoluto la capa estratégica: conocer gente nueva, analizar mi red, fortalecer conexiones existentes o simplemente hacer una actividad.',
            fr: 'La création d’un meetup s’ouvre comme une conversation, pas comme un formulaire : « Hi Sina, what is your goal of Create a Meet up? » — avec quatre intentions, la quatrième étant une porte de sortie honnête pour ceux qui ne veulent pas du tout de la couche stratégique : rencontrer de nouvelles personnes, analyser mon réseau, renforcer des liens existants, ou simplement faire une activité.',
            ja: 'ミートアップ作成は、フォームではなく会話として始まる：「Hi Sina, what is your goal of Create a Meet up?」——4つの意図が並び、4つ目は戦略のレイヤーをまったく求めない人のための正直な逃げ道だ。新しい人と出会う、自分のネットワークを分析する、既存のつながりを強める、あるいは単にアクティビティをする。',
          }),
        ),
        p(
          L({
            en: "Behind it sit four entry modes as a segment control — chat, interest, discovery, recent — and a composer labelled 'Create a Meetup with AI'.",
            fa: 'پشت آن چهار حالت ورود به‌صورت کنترل بخش‌بندی‌شده قرار دارد — گفت‌وگو، علاقه‌مندی، کشف، اخیر — و یک نگارنده با برچسب «ساخت میت‌آپ با هوش مصنوعی».',
            ar: 'خلفها أربعة أنماط دخول على هيئة عنصر تحكم مقسَّم — الدردشة، الاهتمام، الاكتشاف، الأخير — ومُحرِّر يحمل تسمية «أنشئ لقاءً بالذكاء الاصطناعي».',
            de: 'Dahinter liegen vier Einstiegsmodi als Segment-Control — Chat, Interesse, Entdeckung, Kürzlich — und ein Composer mit der Beschriftung „Meetup mit KI erstellen“.',
            es: 'Detrás hay cuatro modos de entrada en un control segmentado — Chat, Interest, Discovery, Recent — y un campo de mensaje con la etiqueta «Create a Meetup with AI».',
            fr: 'Derrière se trouvent quatre modes d’entrée sous forme de contrôle segmenté — Chat, Interest, Discovery, Recent — et une zone de saisie intitulée « Create a Meetup with AI ».',
            ja: 'その背後には、セグメントコントロールとして並ぶ4つの入口——Chat、Interest、Discovery、Recent——と、「Create a Meetup with AI」と書かれた入力欄がある。',
          }),
        ),
      ),
      insight: l(
        L({
          en: "The fourth option — 'just want to do an activity' — is the product being honest about the users who don't want its thesis.",
          fa: 'گزینه‌ی چهارم — «فقط می‌خواهم فعالیتی انجام دهم» — صداقتِ محصول است درباره‌ی کاربرانی که فرضیه‌اش را نمی‌خواهند.',
          ar: 'الخيار الرابع — «أريد فقط ممارسة نشاط» — هو صدق المنتج مع المستخدمين الذين لا يريدون فرضيته.',
          de: 'Die vierte Option — „einfach eine Aktivität machen“ — ist das Produkt, das ehrlich zu Nutzern ist, die seine These gar nicht wollen.',
          es: 'La cuarta opción — «just want to do an activity» — es el producto siendo honesto con los usuarios que no quieren su tesis.',
          fr: 'La quatrième option — « just want to do an activity » — c’est le produit qui se montre honnête envers les utilisateurs qui ne veulent pas de sa thèse.',
          ja: '4つ目の選択肢「just want to do an activity」——それは、テーゼを求めないユーザーに対してプロダクトが正直であろうとする姿だ。',
        }),
      ),
    },
    {
      id: 'vin-s09a',
      blockType: 'csFigure',
      layout: 'annotated',
      treatment: 'screen',
      items: [...item('heroGoalChips', 'vin-f09a-1')],
      annotations: [
        {
          id: 'vin-f09a-a1',
          text: l(
            L({
              en: 'The flow opens as a conversation, not a form: "Hi Sina — what is your goal of create a Meet up?"',
              fa: 'جریان به‌جای فرم، با گفت‌وگو باز می‌شود: «سلام سینا — هدفت از ساخت این میت‌آپ چیست؟»',
              ar: 'يبدأ المسار كمحادثة لا كنموذج: «مرحبًا سينا — ما هدفك من إنشاء هذا اللقاء؟»',
              de: 'Der Flow öffnet als Gespräch, nicht als Formular: „Hi Sina — was ist dein Ziel für dieses Meetup?“',
              es: 'El flujo se abre como una conversación, no como un formulario: «Hi Sina — what is your goal of create a Meet up?»',
              fr: 'Le parcours s’ouvre comme une conversation, pas comme un formulaire : « Hi Sina — what is your goal of create a Meet up? »',
              ja: 'フローはフォームではなく会話として始まる：「Hi Sina — what is your goal of create a Meet up?」',
            }),
          ),
        },
        {
          id: 'vin-f09a-a2',
          text: l(
            L({
              en: '"Meet new people — expand your network in a specific area." The default for a newcomer with no network in the city yet.',
              fa: '«آشنایی با آدم‌های تازه — شبکه‌ات را در حوزه‌ای مشخص گسترش بده.» پیش‌فرضِ تازه‌واردی که هنوز شبکه‌ای در شهر ندارد.',
              ar: '«تعرَّف على أشخاص جدد — وسِّع شبكتك في مجال محدد.» الخيار الافتراضي لوافد جديد لا شبكة له في المدينة بعد.',
              de: '„Neue Leute treffen — erweitere dein Netzwerk in einem bestimmten Bereich.“ Der Default für Neuankömmlinge ohne Netzwerk in der Stadt.',
              es: '«Meet new people — expand your network in a specific area.» La opción por defecto para un recién llegado que aún no tiene red en la ciudad.',
              fr: '« Meet new people — expand your network in a specific area. » Le choix par défaut pour un nouvel arrivant qui n’a pas encore de réseau dans la ville.',
              ja: '「Meet new people — expand your network in a specific area.」まだこの街にネットワークを持たない新参者にとってのデフォルト。',
            }),
          ),
        },
        {
          id: 'vin-f09a-a3',
          text: l(
            L({
              en: '"Analysing my network" and "Strengthen existing connections" — the two intents for people who already have a network and want it to work harder.',
              fa: '«تحلیل شبکه‌ام» و «تقویت ارتباط‌های موجود» — دو قصد برای کسانی که شبکه دارند و می‌خواهند بیشتر از آن بگیرند.',
              ar: '«تحليل شبكتي» و«تقوية العلاقات القائمة» — نيّتان لمن لديه شبكة بالفعل ويريدها أن تعمل أكثر.',
              de: '„Mein Netzwerk analysieren“ und „Bestehende Kontakte stärken“ — die beiden Intents für Menschen, die bereits ein Netzwerk haben.',
              es: '«Analysing my network» y «Strengthen existing connections» — las dos intenciones para quienes ya tienen una red y quieren que rinda más.',
              fr: '« Analysing my network » et « Strengthen existing connections » — les deux intentions destinées à ceux qui ont déjà un réseau et veulent le faire travailler davantage.',
              ja: '「Analysing my network」と「Strengthen existing connections」——すでにネットワークを持ち、それをもっと活かしたい人のための2つの意図。',
            }),
          ),
        },
        {
          id: 'vin-f09a-a4',
          text: l(
            L({
              en: '"Just want to do an activity — skip the strategy, create a simple Meet up." The escape hatch, and the most honest line in the file.',
              fa: '«فقط می‌خواهم فعالیتی انجام دهم — استراتژی را رد کن، یک میت‌آپ ساده بساز.» راه گریز، و صادقانه‌ترین جمله‌ی فایل.',
              ar: '«أريد فقط ممارسة نشاط — تخطَّ الاستراتيجية وأنشئ لقاءً بسيطًا.» مخرج الطوارئ، وأصدق سطر في الملف.',
              de: '„Ich will einfach etwas unternehmen — überspring die Strategie, mach ein einfaches Meetup.“ Das Fluchttor, und die ehrlichste Zeile der Datei.',
              es: '«Just want to do an activity — skip the strategy, create a simple Meet up.» La vía de escape, y la línea más honesta del archivo.',
              fr: '« Just want to do an activity — skip the strategy, create a simple Meet up. » La porte de sortie, et la ligne la plus honnête du fichier.',
              ja: '「Just want to do an activity — skip the strategy, create a simple Meet up.」逃げ道であり、このファイルで最も正直な一行。',
            }),
          ),
        },
        {
          id: 'vin-f09a-a5',
          text: l(
            L({
              en: 'Chat, Interest, Discovery and Recent run across the top, and the composer below reads "Create a Meetup with AI" — four ways in, only one of them a conversation.',
              fa: 'گفت‌وگو، علاقه، کشف و اخیر در بالا کنار هم‌اند و نوار پایین می‌گوید «با هوش مصنوعی میت‌آپ بساز» — چهار راه ورود که تنها یکی‌شان گفت‌وگوست.',
              ar: 'الدردشة والاهتمام والاكتشاف والأحدث في الأعلى، وحقل الإدخال أسفلها يقول «أنشئ لقاءً بالذكاء الاصطناعي» — أربعة مداخل، واحد منها فقط محادثة.',
              de: 'Chat, Interest, Discovery und Recent laufen oben durch, das Eingabefeld darunter sagt „Create a Meetup with AI“ — vier Einstiege, nur einer davon ein Gespräch.',
              es: 'Chat, Interest, Discovery y Recent recorren la parte superior, y el campo de mensaje de abajo dice «Create a Meetup with AI» — cuatro vías de entrada, y solo una de ellas es una conversación.',
              fr: 'Chat, Interest, Discovery et Recent s’alignent en haut, et la zone de saisie en dessous indique « Create a Meetup with AI » — quatre entrées, dont une seule est une conversation.',
              ja: '上部にはChat、Interest、Discovery、Recentが並び、その下の入力欄には「Create a Meetup with AI」とある——入口は4つ、そのうち会話はひとつだけ。',
            }),
          ),
        },
      ],
      caption: l(
        L({
          en: 'Meetup creation — the flow a host uses most — opens by asking what the meetup is for. The product thesis, stated as the first question anyone answers.',
          fa: 'ساخت میت‌آپ — پرکاربردترین جریان برای میزبان — با این پرسش باز می‌شود که این میت‌آپ برای چیست. فرضیه‌ی محصول، در قالب نخستین پرسشی که هر کسی پاسخ می‌دهد.',
          ar: 'إنشاء اللقاء — المسار الأكثر استخدامًا لدى المضيف — يبدأ بسؤال: ما الغرض من هذا اللقاء؟ فرضية المنتج بوصفها أول سؤال يجيب عنه أي شخص.',
          de: 'Das Erstellen eines Meetups — der meistgenutzte Flow — beginnt mit der Frage, wofür das Meetup da ist. Die Produktthese als erste Frage, die jemand beantwortet.',
          es: 'La creación de un meetup — el flujo que más usa un anfitrión — empieza preguntando para qué es el meetup. La tesis del producto, planteada como la primera pregunta que responde cualquiera.',
          fr: 'La création d’un meetup — le parcours qu’un organisateur utilise le plus — commence par demander à quoi sert le meetup. La thèse du produit, posée comme la première question à laquelle chacun répond.',
          ja: 'ミートアップ作成——ホストが最もよく使うフロー——は、そのミートアップが何のためのものかを尋ねるところから始まる。プロダクトのテーゼを、誰もが最初に答える問いとして示している。',
        }),
      ),
    },
    {
      id: 'vin-s10',
      blockType: 'csDecisions',
      items: [
        {
          id: 'vin-d01',
          title: l(
            L({
              en: "Retire 'Meetup' and 'Event' as vocabulary",
              fa: 'بازنشستگیِ واژه‌های «میت‌آپ» و «رویداد»',
              ar: 'تقاعد مصطلحي "Meetup" و"Event"',
              de: '„Meetup“ und „Event“ als Vokabular ausmustern',
              es: 'Retirar «Meetup» y «Event» del vocabulario',
              fr: 'Retirer « Meetup » et « Event » du vocabulaire',
              ja: '「Meetup」と「Event」を語彙から外す',
            }),
          ),
          why: l(
            L({
              en: "VIN is the platform; Meet is the action — a fixed usage rule ('Join a VIN Meet', never 'Download VIN Meet App') so five planned verticals (VIN Party, VIN Challenge, VIN Business Walk, VIN Retreat) never force a rename.",
              fa: 'وین پلتفرم است؛ Meet کنش است — قاعده‌ی کاربردیِ ثابتی («به یک VIN Meet بپیوندید»، هرگز «اپ VIN Meet را دانلود کنید») تا پنج عمود برنامه‌ریزی‌شده (VIN Party، VIN Challenge، VIN Business Walk، VIN Retreat) هرگز نیازی به تغییر نام نداشته باشند.',
              ar: 'وين هي المنصّة؛ وMeet هو الفعل — قاعدة استخدام ثابتة («انضم إلى VIN Meet»، أبدًا «حمِّل تطبيق VIN Meet») حتى لا تفرض خمس شرائح مخطَّطة (VIN Party، VIN Challenge، VIN Business Walk، VIN Retreat) أي إعادة تسمية أبدًا.',
              de: 'VIN ist die Plattform; Meet ist die Aktion — eine feste Nutzungsregel („Einem VIN Meet beitreten“, niemals „VIN-Meet-App herunterladen“), damit fünf geplante Verticals (VIN Party, VIN Challenge, VIN Business Walk, VIN Retreat) nie eine Umbenennung erzwingen.',
              es: 'VIN es la plataforma; Meet es la acción: una regla de uso fija («Únete a un VIN Meet», nunca «Descarga la app VIN Meet») para que cinco verticales previstas (VIN Party, VIN Challenge, VIN Business Walk, VIN Retreat) nunca obliguen a cambiar de nombre.',
              fr: 'VIN est la plateforme ; Meet est l’action — une règle d’usage fixe (« Rejoindre un VIN Meet », jamais « Télécharger l’app VIN Meet ») pour que cinq verticales prévues (VIN Party, VIN Challenge, VIN Business Walk, VIN Retreat) n’imposent jamais de changement de nom.',
              ja: 'VINはプラットフォームで、Meetはアクション。「VIN Meetに参加する」とは言っても「VIN Meetアプリをダウンロード」とは決して言わない、という固定の使用ルールにより、計画中の5つのバーティカル（VIN Party、VIN Challenge、VIN Business Walk、VIN Retreat）が名前の変更を迫ることはない。',
            }),
          ),
          alternatives: l(
            L({
              en: 'A softer style-guide suggestion, left to individual copywriters.',
              fa: 'پیشنهادی نرم‌تر در راهنمای سبک، وابسته به تشخیص هر کپی‌رایتر.',
              ar: 'اقتراح أليَن في دليل الأسلوب، متروك لتقدير كل كاتب إعلاني.',
              de: 'Ein weicherer Style-Guide-Vorschlag, den einzelnen Copywritern überlassen.',
              es: 'Una sugerencia más suave en la guía de estilo, a criterio de cada redactor.',
              fr: 'Une suggestion plus souple dans le guide de style, laissée à l’appréciation de chaque rédacteur.',
              ja: 'スタイルガイド上のゆるやかな提案にとどめ、個々のコピーライターに委ねる。',
            }),
          ),
          tradeoff: l(
            L({
              en: "The lock gives the architecture teeth — but the file itself still uses 'Meetup' and 'Event' everywhere, including its own section names; a locked decision still needs a migration pass to become real.",
              fa: 'این قاعده، نام‌گذاری را یکدست می‌کند. بااین‌حال، در فایل طراحی هنوز واژه‌های «میت‌آپ» و «رویداد» دیده می‌شوند، حتی در نام بخش‌ها. برای اجرای کامل تصمیم، متن‌های موجود هم باید بازنویسی شوند.',
              ar: 'القفل يمنح الهندسة قوة تنفيذية — لكن الملف نفسه ما زال يستخدم "Meetup" و"Event" في كل مكان، حتى في أسماء أقسامه؛ فالقرار المُقفَل ما زال يحتاج تمريرة ترحيل ليصبح واقعًا.',
              de: 'Die Verriegelung verleiht der Architektur Biss — aber die Datei selbst verwendet weiterhin überall „Meetup“ und „Event“, auch in ihren eigenen Abschnittsnamen; eine verriegelte Entscheidung braucht noch einen Migrationsdurchgang, um real zu werden.',
              es: 'El bloqueo le da dientes a la arquitectura, pero el propio archivo sigue usando «Meetup» y «Event» en todas partes, incluso en los nombres de sus secciones; una decisión bloqueada aún necesita una pasada de migración para hacerse realidad.',
              fr: 'Le verrouillage donne du mordant à l’architecture — mais le fichier lui-même emploie encore « Meetup » et « Event » partout, jusque dans les noms de ses propres sections ; une décision verrouillée a encore besoin d’une passe de migration pour devenir réelle.',
              ja: 'ロックしたことで、このアーキテクチャに強制力が生まれた。だがファイル自体はいまも、自らのセクション名も含めて至るところで「Meetup」と「Event」を使っている。ロックした決定も、移行作業を経なければ現実にはならない。',
            }),
          ),
          evidence: l(
            L({
              en: 'Brand Architecture document, dated after the UI work',
              fa: 'سند معماری برند، با تاریخِ پس از کار رابط کاربری',
              ar: 'وثيقة هندسة العلامة التجارية، مؤرَّخة بعد عمل الواجهة',
              de: 'Brand-Architecture-Dokument, datiert nach der UI-Arbeit',
              es: 'Documento de arquitectura de marca, fechado después del trabajo de UI',
              fr: 'Document d’architecture de marque, daté d’après le travail d’UI',
              ja: 'UI作業より後の日付のブランドアーキテクチャ文書',
            }),
          ),
        },
        {
          id: 'vin-d02',
          title: l(
            L({
              en: 'No public leaderboards, no competitive framing',
              fa: 'بدون جدول رده‌بندی عمومی، بدون قاب‌بندی رقابتی',
              ar: 'بلا لوحات صدارة عامة، بلا صياغة تنافسية',
              de: 'Keine öffentlichen Ranglisten, kein Wettbewerbs-Framing',
              es: 'Sin rankings públicos ni enfoque competitivo',
              fr: 'Pas de classements publics, pas de cadrage compétitif',
              ja: '公開ランキングも、競争的な見せ方もなし',
            }),
          ),
          why: l(
            L({
              en: 'Public leaderboards and competitive display read as culturally wrong for this market.',
              fa: 'جدول رده‌بندی عمومی و نمایش رقابتی با زمینه‌ی فرهنگی این بازار سازگار نیستند.',
              ar: 'تُقرأ لوحات الصدارة العامة والعرض التنافسي على أنها خاطئة ثقافيًا لهذا السوق.',
              de: 'Öffentliche Ranglisten und Wettbewerbsdarstellung gelten für diesen Markt als kulturell falsch.',
              es: 'Los rankings públicos y la exhibición competitiva se perciben como culturalmente inadecuados para este mercado.',
              fr: 'Les classements publics et l’affichage compétitif sont perçus comme culturellement déplacés sur ce marché.',
              ja: '公開ランキングや競争を見せる表示は、この市場では文化的にふさわしくないと受け取られる。',
            }),
          ),
          alternatives: l(
            L({
              en: 'A cross-game leaderboard, the pattern used elsewhere in competitive-platform design.',
              fa: 'جدول رده‌بندیِ میان‌بازی، الگویی که جاهای دیگر در طراحی پلتفرم‌های رقابتی به‌کار می‌رود.',
              ar: 'لوحة صدارة عابرة للألعاب، وهو النمط المستخدم في مواضع أخرى من تصميم المنصّات التنافسية.',
              de: 'Ein spielübergreifendes Leaderboard, das Muster, das anderswo im Design von Wettbewerbsplattformen verwendet wird.',
              es: 'Un ranking entre juegos, el patrón que se usa en otros diseños de plataformas competitivas.',
              fr: 'Un classement multi-jeux, le schéma utilisé ailleurs dans la conception de plateformes compétitives.',
              ja: 'ゲーム横断のリーダーボード。競争型プラットフォームのデザインで他に使われているパターン。',
            }),
          ),
          tradeoff: l(
            L({
              en: 'Removes a proven engagement lever; replaced with curated matching and connection goals instead.',
              fa: 'یک روش شناخته‌شده برای افزایش تعامل کنار می‌رود؛ به‌جای آن، تطبیق سنجیده و هدف‌های ارتباطی قرار می‌گیرند.',
              ar: 'يزيل رافعة تفاعل مُثبَتة؛ ويستبدلها بمطابقة منسَّقة وأهداف تواصل.',
              de: 'Entfernt einen bewährten Engagement-Hebel; ersetzt durch kuratiertes Matching und Verbindungsziele.',
              es: 'Elimina una palanca de engagement probada; en su lugar, emparejamiento curado y objetivos de conexión.',
              fr: 'Supprime un levier d’engagement éprouvé, remplacé par une mise en relation choisie avec soin et des objectifs de connexion.',
              ja: '実績のあるエンゲージメントの手段を手放し、代わりにキュレーションされたマッチングとつながりの目標を置く。',
            }),
          ),
          evidence: l(
            L({
              en: 'Nine non-negotiable Dubai cultural rules, part of the reusable design-and-audit protocol',
              fa: 'نه قاعده‌ی فرهنگیِ غیرقابل‌مذاکره‌ی دبی، بخشی از پروتکل طراحی-و-ممیزیِ قابل‌استفاده‌ی مجدد',
              ar: 'تسع قواعد ثقافية غير قابلة للتفاوض لدبي، جزء من بروتوكول التصميم والتدقيق القابل لإعادة الاستخدام',
              de: 'Neun nicht verhandelbare Dubai-Kulturregeln, Teil des wiederverwendbaren Design-und-Audit-Protokolls',
              es: 'Nueve reglas culturales innegociables para Dubái, parte del protocolo reutilizable de diseño y auditoría',
              fr: 'Neuf règles culturelles non négociables pour Dubaï, partie intégrante du protocole réutilisable de design et d’audit',
              ja: 'ドバイ向けの譲れない9つの文化ルール。再利用できるデザイン・監査プロトコルの一部',
            }),
          ),
        },
        {
          id: 'vin-d03',
          title: l(
            L({
              en: 'Chat-first meetup creation, with a real escape hatch',
              fa: 'ساخت میت‌آپِ چت‌محور، با دریچه‌ی فرارِ واقعی',
              ar: 'إنشاء لقاء قائم على المحادثة، مع منفذ حقيقي',
              de: 'Chat-first-Meetup-Erstellung, mit einem echten Fluchttor',
              es: 'Creación de meetups desde el chat, con una salida real',
              fr: 'Création de meetup par le chat d’abord, avec une vraie porte de sortie',
              ja: 'チャットから始めるミートアップ作成と、本物の逃げ道',
            }),
          ),
          why: l(
            L({
              en: 'Puts the AI-pathfinding thesis in front of every host at the moment of creation, rather than burying it in settings.',
              fa: 'فرضیه‌ی مسیریابیِ هوش مصنوعی را در لحظه‌ی ساخت جلوی چشم هر میزبان می‌گذارد، نه اینکه در تنظیمات دفن شود.',
              ar: 'يضع فرضية تحديد المسار بالذكاء الاصطناعي أمام كل مضيف لحظة الإنشاء، بدلًا من دفنها في الإعدادات.',
              de: 'Stellt die KI-Pathfinding-These jedem Host im Moment der Erstellung vor Augen, statt sie in den Einstellungen zu vergraben.',
              es: 'Pone la tesis del pathfinding con IA delante de cada anfitrión en el momento de crear, en lugar de enterrarla en los ajustes.',
              fr: 'Place la thèse du pathfinding par l’IA sous les yeux de chaque hôte au moment de la création, au lieu de l’enfouir dans les réglages.',
              ja: 'AIによるパスファインディングという仮説を、設定の奥に埋もれさせず、作成の瞬間にすべてのホストの目の前に置く。',
            }),
          ),
          alternatives: l(
            L({
              en: 'A plain creation form — which is what actually ships behind the fourth intent chip.',
              fa: 'یک فرم ساده‌ی ساخت — که همان چیزی است که پشت چیپ قصدِ چهارم واقعاً ارائه می‌شود.',
              ar: 'نموذج إنشاء بسيط — وهو ما يُقدَّم فعليًا خلف رقاقة النيّة الرابعة.',
              de: 'Ein einfaches Erstellungsformular — genau das, was tatsächlich hinter dem vierten Intent-Chip steckt.',
              es: 'Un formulario de creación simple, que es justo lo que se entrega tras el cuarto chip de intención.',
              fr: 'Un simple formulaire de création — c’est d’ailleurs ce qui est réellement livré derrière la quatrième puce d’intention.',
              ja: 'シンプルな作成フォーム。実際、4つ目の目的チップの先に用意されているのはこれだ。',
            }),
          ),
          tradeoff: l(
            L({
              en: 'Costs a small amount of friction for someone who just wants to book a padel session; the fourth chip pays that back honestly instead of forcing the strategy layer on everyone.',
              fa: 'برای کسی که فقط می‌خواهد یک جلسه‌ی پدل رزرو کند، این مرحله کار را طولانی‌تر می‌کند. گزینه‌ی چهارم راه ساده‌تری پیش پای او می‌گذارد تا مجبور نباشد مسیر راهبردی را طی کند.',
              ar: 'يكلّف قدرًا يسيرًا من الاحتكاك لمن يريد فقط حجز جلسة بادل؛ وتعوّض الرقاقة الرابعة ذلك بصدق بدل فرض طبقة الاستراتيجية على الجميع.',
              de: 'Kostet etwas Reibung für jemanden, der nur eine Padel-Session buchen will; der vierte Chip zahlt das ehrlich zurück, statt allen die Strategieebene aufzuzwingen.',
              es: 'Supone algo de fricción para quien solo quiere reservar una sesión de pádel; el cuarto chip lo compensa con honestidad en vez de imponer a todos la capa de estrategia.',
              fr: 'Coûte un peu de friction à qui veut simplement réserver une session de padel ; la quatrième puce rend honnêtement ce coût au lieu d’imposer la couche stratégique à tout le monde.',
              ja: 'パデルのセッションを予約したいだけの人には、少し手間が増える。4つ目のチップはその分を正直に埋め合わせ、全員に戦略レイヤーを押しつけない。',
            }),
          ),
          ...(media.heroGoalChips ? { media: media.heroGoalChips } : {}),
        },
        {
          id: 'vin-d04',
          title: l(
            L({
              en: 'Design the venue layer as a two-sided product, not a landing page',
              fa: 'طراحی لایه‌ی مکان‌ها به‌عنوان محصولی دوسویه، نه یک صفحه‌ی فرود',
              ar: 'تصميم طبقة الأماكن كمنتج ثنائي الجانب، لا كصفحة هبوط',
              de: 'Die Venue-Ebene als zweiseitiges Produkt gestalten, nicht als Landingpage',
              es: 'Diseñar la capa de locales como un producto de dos lados, no como una landing page',
              fr: 'Concevoir la couche des lieux comme un produit biface, pas comme une landing page',
              ja: '店舗レイヤーを、ランディングページではなく両面型のプロダクトとして設計する',
            }),
          ),
          why: l(
            L({
              en: "Matching venues to groups turns 'off-peak covers' into a real scheduling and group-size constraint on the consumer side, not just a sales pitch.",
              fa: 'تطبیق مکان‌ها با گروه‌ها «پوشش ساعات کم‌ترافیک» را به محدودیت واقعیِ زمان‌بندی و اندازه‌ی گروه در سمت مصرف‌کننده تبدیل می‌کند، نه فقط یک پیشنهاد فروش.',
              ar: 'مطابقة الأماكن بالمجموعات تحوّل «تغطية ساعات الركود» إلى قيد جدولة وحجم مجموعة حقيقي على الجانب الاستهلاكي، لا مجرد عرض بيع.',
              de: 'Das Matching von Venues mit Gruppen macht „Off-Peak-Covers“ zu einer echten Scheduling- und Gruppengrößen-Beschränkung auf der Konsumentenseite, nicht nur zu einem Verkaufsargument.',
              es: 'Emparejar locales con grupos convierte los «cubiertos en horas valle» en una restricción real de programación y de tamaño de grupo del lado del consumidor, no solo en un argumento de venta.',
              fr: 'Associer lieux et groupes transforme les « couverts en heures creuses » en une vraie contrainte de planning et de taille de groupe côté consommateur, et pas seulement en argument commercial.',
              ja: '店舗とグループをマッチングすることで、「オフピークの来店数」は単なるセールストークではなく、利用者側のスケジュールとグループ規模に対する現実の制約になる。',
            }),
          ),
          alternatives: l(
            L({
              en: 'A single static partner-inquiry page.',
              fa: 'یک صفحه‌ی استاتیکِ واحد برای درخواست همکاری.',
              ar: 'صفحة استفسار شركاء ثابتة واحدة.',
              de: 'Eine einzelne statische Partner-Anfrageseite.',
              es: 'Una única página estática de solicitud para socios.',
              fr: 'Une simple page statique de demande de partenariat.',
              ja: '静的なパートナー問い合わせページ1枚。',
            }),
          ),
          tradeoff: l(
            L({
              en: "Adds real product surface — 19 screens, including a bidding flow and a fair-price indicator — but it's what makes the 'real footfall, real revenue' claim to venues checkable rather than promised.",
              fa: 'سطح واقعیِ محصول را زیاد می‌کند — ۱۹ صفحه، شامل جریان مزایده و نشانگر قیمتِ منصفانه — اما همین است که ادعای «ترافیک واقعی، درآمد واقعی» به مکان‌ها را قابل‌بررسی می‌کند نه فقط وعده.',
              ar: 'يضيف سطحًا حقيقيًا للمنتج — 19 شاشة، تشمل تدفّق مزايدة ومؤشر سعر عادل — لكنه ما يجعل ادّعاء «إقبال حقيقي، إيرادات حقيقية» للأماكن قابلًا للتحقق لا مجرد وعد.',
              de: 'Fügt echte Produktfläche hinzu — 19 Screens, inklusive eines Bieting-Flows und eines Fair-Price-Indikators — aber genau das macht das Versprechen „echter Fußverkehr, echter Umsatz“ an Venues überprüfbar statt nur versprochen.',
              es: 'Añade superficie de producto real —19 pantallas, entre ellas un flujo de pujas y un indicador de precio justo—, pero es lo que hace que la promesa de «afluencia real, ingresos reales» a los locales sea verificable y no solo una promesa.',
              fr: 'Ajoute une vraie surface produit — 19 écrans, dont un parcours d’enchères et un indicateur de juste prix — mais c’est ce qui rend vérifiable, plutôt que simplement promise, l’affirmation faite aux lieux : « une vraie fréquentation, un vrai chiffre d’affaires ».',
              ja: '入札フローや適正価格インジケーターを含む19画面と、プロダクトの面は確実に増える。だがそれによって、店舗に向けた「本物の来店、本物の売上」という主張が、約束ではなく検証できるものになる。',
            }),
          ),
          evidence: l(
            L({
              en: 'Sponser section, 19 screens, with a considered legal disclaimer on performance figures',
              fa: 'بخش Sponser، ۱۹ صفحه، همراه با سلب مسئولیت حقوقیِ سنجیده درباره‌ی ارقام عملکرد',
              ar: 'قسم Sponser، 19 شاشة، مع إخلاء مسؤولية قانوني مدروس حول أرقام الأداء',
              de: 'Sponser-Bereich, 19 Screens, mit einem durchdachten rechtlichen Disclaimer zu Leistungszahlen',
              es: 'Sección Sponser, 19 pantallas, con un aviso legal cuidado sobre las cifras de rendimiento',
              fr: 'Section Sponser, 19 écrans, avec une mention légale réfléchie sur les chiffres de performance',
              ja: 'Sponserセクション（19画面）。成果の数値について配慮された法的な免責事項つき',
            }),
          ),
        },
      ],
    },
    {
      id: 'vin-s11',
      blockType: 'csNarrative',
      label: 'solution',
      heading: l(
        L({
          en: 'The venue layer is the business model, not a landing page.',
          fa: 'لایه‌ی مکان‌ها مدل کسب‌وکار است، نه یک صفحه‌ی فرود.',
          ar: 'طبقة الأماكن هي نموذج العمل، لا صفحة هبوط.',
          de: 'Die Venue-Ebene ist das Geschäftsmodell, keine Landingpage.',
          es: 'La capa de locales es el modelo de negocio, no una landing page.',
          fr: 'La couche des lieux est le modèle économique, pas une landing page.',
          ja: '店舗レイヤーはランディングページではなく、ビジネスモデルそのものだ。',
        }),
      ),
      body: prose(
        dir,
        p(
          L({
            en: "The Sponser section runs a four-step partner funnel — list your venue, get matched, host and activate, measure and grow — and it's genuinely two-sided: hosts can bid for a venue through a 'Be my sponsor' flow with a suggested bid and a fair-price indicator, while venues review qualified requests instead of random traffic.",
            fa: 'همکاری با مکان‌ها در بخش Sponser چهار مرحله دارد: ثبت مکان، پیدا کردن گروه مناسب، میزبانی و سنجش نتیجه. این رابطه دوسویه است. میزبان می‌تواند در مسیر «حامی من باش» با مبلغ پیشنهادی و راهنمای قیمت منصفانه برای استفاده از یک مکان پیشنهاد بدهد؛ مکان هم درخواست‌های مرتبط را بررسی می‌کند، نه بازدیدهای اتفاقی را.',
            ar: 'يُشغّل قسم Sponser قمع شريك من أربع خطوات — أدرج مكانك، احصل على مطابقة، استضف وفعِّل، قِس ونمِّ — وهو ثنائي الجانب فعلًا: يمكن للمضيفين المزايدة على مكان عبر تدفّق «كن راعيّ» بعرض مقترح ومؤشر سعر عادل، بينما تراجع الأماكن طلبات مؤهَّلة لا حركة مرور عشوائية.',
            de: 'Der Sponser-Bereich fährt einen vierstufigen Partner-Funnel — Venue listen, Match erhalten, Hosten und Aktivieren, Messen und Wachsen — und ist wirklich zweiseitig: Hosts können über einen „Be my sponsor“-Flow mit einem vorgeschlagenen Gebot und einem Fair-Price-Indikator um eine Venue bieten, während Venues qualifizierte Anfragen statt Zufallsverkehr prüfen.',
            es: 'La sección Sponser plantea un embudo de socios en cuatro pasos —registra tu local, recibe coincidencias, acoge y activa, mide y crece— y es de verdad de dos lados: los anfitriones pueden pujar por un local mediante un flujo «Be my sponsor» con una puja sugerida y un indicador de precio justo, mientras los locales revisan solicitudes cualificadas en lugar de tráfico aleatorio.',
            fr: 'La section Sponser déroule un tunnel partenaire en quatre étapes — référencer son lieu, être mis en relation, accueillir et activer, mesurer et grandir — et elle est réellement biface : les hôtes peuvent enchérir pour un lieu via un parcours « Be my sponsor », avec une enchère suggérée et un indicateur de juste prix, tandis que les lieux examinent des demandes qualifiées plutôt qu’un trafic aléatoire.',
            ja: 'Sponserセクションは、店舗を登録する、マッチングされる、ホストして活性化する、測定して伸ばす、という4段階のパートナーファネルで構成され、しかも本当に両面型だ。ホストは推奨入札額と適正価格インジケーターのついた「Be my sponsor」フローで店舗に入札でき、店舗側は無作為な流入ではなく、条件を満たしたリクエストを審査する。',
          }),
        ),
        p(
          L({
            en: "The pitch to venues is blunt: 'Empty seats aren't a marketing problem — they're a predictable demand problem.' The page even carries a legal disclaimer marking performance figures as indicative, not guaranteed, based on pilot data.",
            fa: 'پیام به مکان‌ها روشن است: «صندلی‌های خالی مشکل تبلیغات نیستند؛ مسئله، پیش‌بینی تقاضاست.» در صفحه توضیح حقوقی هم آمده است که ارقام عملکرد، برآوردی بر پایه‌ی داده‌های آزمایشی‌اند و نتیجه‌ای را تضمین نمی‌کنند.',
            ar: 'العرض للأماكن صريح: «المقاعد الفارغة ليست مشكلة تسويقية — إنها مشكلة طلب يمكن التنبؤ بها.» بل تحمل الصفحة إخلاء مسؤولية قانوني يصف أرقام الأداء بأنها إرشادية لا مضمونة، مستندة إلى بيانات تجريبية.',
            de: 'Das Angebot an Venues ist unverblümt: „Leere Plätze sind kein Marketingproblem — sie sind ein vorhersehbares Nachfrageproblem.“ Die Seite trägt sogar einen rechtlichen Disclaimer, der Leistungszahlen als indikativ, nicht garantiert, basierend auf Pilotdaten kennzeichnet.',
            es: 'El mensaje a los locales es directo: «Los asientos vacíos no son un problema de marketing: son un problema de demanda predecible». La página incluso lleva un aviso legal que presenta las cifras de rendimiento como orientativas, no garantizadas, basadas en datos piloto.',
            fr: 'Le discours aux lieux est sans détour : « Les places vides ne sont pas un problème de marketing — c’est un problème de demande prévisible. » La page porte même une mention légale qui présente les chiffres de performance comme indicatifs, non garantis, fondés sur des données pilotes.',
            ja: '店舗への売り文句は率直だ。「空席はマーケティングの問題ではない。予測できる需要の問題だ」。ページには、成果の数値はパイロットデータに基づく目安であり保証ではない、と明記した法的な免責事項まで載っている。',
          }),
        ),
      ),
      insight: '',
    },
    {
      id: 'vin-s12',
      blockType: 'csProcess',
      kind: 'process',
      heading: l(
        L({
          en: 'The venue funnel, four steps.',
          fa: 'قیف مکان‌ها، چهار مرحله.',
          ar: 'قمع الأماكن، أربع خطوات.',
          de: 'Der Venue-Funnel, vier Schritte.',
          es: 'El embudo de locales, en cuatro pasos.',
          fr: 'Le tunnel des lieux, en quatre étapes.',
          ja: '店舗ファネル、4つのステップ。',
        }),
      ),
      steps: [
        {
          id: 'vin-p07',
          code: '01',
          label: l(
            L({
              en: 'List',
              fa: 'ثبت مکان',
              ar: 'أدرِج',
              de: 'Listen',
              es: 'Registrar',
              fr: 'Référencer',
              ja: '登録',
            }),
          ),
          note: l(
            L({
              en: 'Share your space in two minutes: location, capacity, peak/off-peak hours, target audience',
              fa: 'مکانت را در دو دقیقه معرفی کن: موقعیت، ظرفیت، ساعات پرترافیک و کم‌ترافیک، مخاطب هدف',
              ar: 'شارك مكانك في دقيقتين: الموقع، السعة، ساعات الذروة وخارجها، الجمهور المستهدف',
              de: 'Teile deinen Space in zwei Minuten: Standort, Kapazität, Peak-/Off-Peak-Zeiten, Zielgruppe',
              es: 'Comparte tu espacio en dos minutos: ubicación, aforo, horas punta y valle, público objetivo',
              fr: 'Présentez votre espace en deux minutes : emplacement, capacité, heures pleines et creuses, public cible',
              ja: '2分でスペースを登録：所在地、収容人数、ピーク／オフピークの時間帯、ターゲット層',
            }),
          ),
        },
        {
          id: 'vin-p08',
          code: '02',
          label: l(
            L({
              en: 'Match',
              fa: 'تطبیق',
              ar: 'المطابقة',
              de: 'Matchen',
              es: 'Emparejar',
              fr: 'Associer',
              ja: 'マッチング',
            }),
          ),
          note: l(
            L({
              en: 'VIN suggests relevant meetup groups by area, timing and audience fit',
              fa: 'وین گروه‌های میت‌آپِ مرتبط را بر پایه‌ی منطقه، زمان‌بندی و تناسب مخاطب پیشنهاد می‌دهد',
              ar: 'تقترح وين مجموعات لقاءات ذات صلة حسب المنطقة والتوقيت وملاءمة الجمهور',
              de: 'VIN schlägt relevante Meetup-Gruppen nach Gebiet, Timing und Zielgruppenpassung vor',
              es: 'VIN sugiere grupos de meetup relevantes según la zona, el horario y el encaje con el público',
              fr: 'VIN propose des groupes de meetup pertinents selon le quartier, le créneau et l’adéquation avec le public',
              ja: 'VINが、エリア、タイミング、客層との相性から、関連するミートアップのグループを提案する',
            }),
          ),
        },
        {
          id: 'vin-p09',
          code: '03',
          label: l(
            L({
              en: 'Host',
              fa: 'میزبانی',
              ar: 'الاستضافة',
              de: 'Hosten',
              es: 'Acoger',
              fr: 'Accueillir',
              ja: '開催',
            }),
          ),
          note: l(
            L({
              en: 'Turn visits into spend — normal operations or an activated sponsorship perk',
              fa: 'بازدیدها را به خرج تبدیل کن — عملیات معمول یا یک مزیت حمایتیِ فعال‌شده',
              ar: 'حوِّل الزيارات إلى إنفاق — عمليات عادية أو ميزة رعاية مُفعَّلة',
              de: 'Besuche in Umsatz verwandeln — normaler Betrieb oder ein aktiviertes Sponsoring-Perk',
              es: 'Convierte las visitas en gasto, con la operación habitual o con una ventaja de patrocinio activada',
              fr: 'Transformez les visites en dépenses — en fonctionnement normal ou avec un avantage de sponsoring activé',
              ja: '来店を売上に変える。通常営業でも、有効化したスポンサー特典でも',
            }),
          ),
        },
        {
          id: 'vin-p10',
          code: '04',
          label: l(
            L({
              en: 'Measure',
              fa: 'اندازه‌گیری',
              ar: 'القياس',
              de: 'Messen',
              es: 'Medir',
              fr: 'Mesurer',
              ja: '測定',
            }),
          ),
          note: l(
            L({
              en: 'Review visits and spend signals, then schedule the next activation',
              fa: 'بازدیدها و نشانه‌های خرج را بررسی کن، سپس فعال‌سازیِ بعدی را زمان‌بندی کن',
              ar: 'راجع الزيارات وإشارات الإنفاق، ثم جدوِل التفعيل التالي',
              de: 'Besuche und Spend-Signale prüfen, dann die nächste Aktivierung planen',
              es: 'Revisa las visitas y las señales de gasto, y programa la siguiente activación',
              fr: 'Analysez les visites et les signaux de dépense, puis planifiez la prochaine activation',
              ja: '来店数と消費のシグナルを確認し、次の施策を計画する',
            }),
          ),
        },
      ],
    },
    {
      id: 'vin-s12a',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'screen',
      items: [
        ...item(
          'venueDetail',
          'vin-f12a-1',
          L({
            en: 'The venue page a member reaches from the feed',
            fa: 'صفحه‌ی مکان، همان‌طور که عضو از فید به آن می‌رسد',
            ar: 'صفحة المكان كما يصل إليها العضو من الموجز',
            de: 'Die Venue-Seite, die ein Mitglied aus dem Feed erreicht',
            es: 'La página del local a la que un miembro llega desde el feed',
            fr: 'La page du lieu à laquelle un membre accède depuis le fil',
            ja: 'メンバーがフィードからたどり着く店舗ページ',
          }),
        ),
        ...item(
          'sponsorBid',
          'vin-f12a-2',
          L({
            en: 'The request its bottom button opens',
            fa: 'درخواستی که دکمه‌ی پایین آن باز می‌کند',
            ar: 'الطلب الذي يفتحه زرّها السفلي',
            de: 'Die Anfrage, die ihr unterer Button öffnet',
            es: 'La solicitud que abre su botón inferior',
            fr: 'La demande qu’ouvre son bouton du bas',
            ja: 'その下部のボタンで開くリクエスト',
          }),
        ),
      ],
      caption: l(
        L({
          en: 'Both sides of the venue layer in one flow: the venue page ends in "Be my sponsor", and the sheet it opens asks for audience size, date, activity, sponsorship type and what the venue gets back. A landing page collects an enquiry; this collects a bookable offer. The venue itself is a real coffee chain standing in as placeholder content.',
          fa: 'هر دو سوی لایه‌ی مکان در یک جریان: صفحه‌ی مکان به «اسپانسر من باش» ختم می‌شود و شیتی که باز می‌کند، اندازه‌ی مخاطب، تاریخ، فعالیت، نوع حمایت و آنچه مکان در ازایش می‌گیرد را می‌پرسد. یک صفحه‌ی فرود، استعلام جمع می‌کند؛ این، پیشنهادی قابل‌رزرو. خودِ مکان یک برند واقعی قهوه است در نقش محتوای جایگزین.',
          ar: 'جانبا طبقة الأماكن في مسار واحد: تنتهي صفحة المكان بزر «كن راعيًا لي»، والورقة التي يفتحها تسأل عن حجم الحضور والتاريخ والنشاط ونوع الرعاية وما يحصل عليه المكان. صفحة الهبوط تجمع استفسارًا؛ وهذه تجمع عرضًا قابلًا للحجز. والمكان نفسه سلسلة قهوة حقيقية مستخدَمة كمحتوى بديل.',
          de: 'Beide Seiten der Venue-Ebene in einem Flow: Die Venue-Seite endet mit „Be my sponsor“, und das Sheet dahinter fragt nach Gruppengröße, Datum, Aktivität, Sponsoring-Art und der Gegenleistung. Eine Landingpage sammelt eine Anfrage; das hier sammelt ein buchbares Angebot. Das Venue selbst ist eine reale Kaffeekette als Platzhalterinhalt.',
          es: 'Los dos lados de la capa de locales en un solo flujo: la página del local termina en «Be my sponsor», y la hoja que abre pide el tamaño del público, la fecha, la actividad, el tipo de patrocinio y lo que recibe el local a cambio. Una landing page recoge una consulta; esto recoge una oferta reservable. El local en sí es una cadena de cafeterías real que hace de contenido provisional.',
          fr: 'Les deux côtés de la couche des lieux dans un seul parcours : la page du lieu se termine sur « Be my sponsor », et la feuille qu’il ouvre demande la taille du public, la date, l’activité, le type de sponsoring et ce que le lieu obtient en retour. Une landing page recueille une demande de renseignements ; ceci recueille une offre réservable. Le lieu lui-même est une vraie chaîne de cafés, utilisée comme contenu provisoire.',
          ja: '店舗レイヤーの両面をひとつのフローで。店舗ページは「Be my sponsor」で終わり、そこから開くシートでは、参加人数、日付、アクティビティ、スポンサーシップの種類、店舗が得る見返りを尋ねる。ランディングページが集めるのは問い合わせだが、これが集めるのは予約できるオファーだ。なお店舗自体は、仮のコンテンツとして置かれた実在のコーヒーチェーンである。',
        }),
      ),
    },
    {
      id: 'vin-s13',
      blockType: 'csNarrative',
      label: 'outcome',
      heading: l(
        L({
          en: 'Built, not just drawn — and audited against its own promises.',
          fa: 'ساخته شده، نه فقط طراحی‌شده — و در برابر وعده‌های خودش سنجیده شده.',
          ar: 'مبني، لا مرسوم فقط — ومُدقَّق في ضوء وعوده الخاصة.',
          de: 'Gebaut, nicht nur gezeichnet — und an den eigenen Versprechen geprüft.',
          es: 'Construido, no solo dibujado, y contrastado con sus propias promesas.',
          fr: 'Construit, pas seulement dessiné — et audité à l’aune de ses propres promesses.',
          ja: '描くだけでなく、作られている。そして自らの約束に照らして監査されている。',
        }),
      ),
      body: prose(
        dir,
        p(
          L({
            en: "The design is being built: a dated QA review lists real implementation bugs in a running app — a failing bookmark API, screens that don't refetch on focus, a back-navigation dead end, stale 'requested' state after a host rejects a private join. A function scan of the live admin panel covered eight routes at roughly 85–90% discovery coverage, deliberately stopping short of destructive testing on production data.",
            fa: 'طراحی در حال ساخته‌شدن است: یک بازبینی کیفیتِ تاریخ‌دار، باگ‌های واقعیِ پیاده‌سازی را در یک اپِ در حال اجرا فهرست می‌کند — یک API بوکمارک که کار نمی‌کند، صفحاتی که هنگام فوکوس دوباره واکشی نمی‌شوند، یک بن‌بست در ناوبریِ برگشت، وضعیت «درخواست‌شده»ی باقی‌مانده پس از رد یک پیوستنِ خصوصی توسط میزبان. اسکن عملکردیِ پنل مدیریتِ زنده هشت مسیر را با پوششِ کشفِ تقریباً ۸۵ تا ۹۰ درصد پوشش داد، و عمداً پیش از آزمون تخریبی روی داده‌های تولید متوقف شد.',
            ar: 'التصميم قيد البناء: تسرد مراجعة جودة مؤرَّخة أخطاء تنفيذ حقيقية في تطبيق عامل — واجهة برمجة إشارات مرجعية معطّلة، وشاشات لا تُعيد الجلب عند التركيز، وطريق مسدود في التنقل للخلف، وحالة «مطلوب» عالقة بعد رفض المضيف طلب انضمام خاص. غطّى مسح وظيفي للوحة الإدارة الحيّة ثمانية مسارات بتغطية اكتشاف نحو 85-90٪، متوقفًا عمدًا قبل الاختبار التخريبي على بيانات الإنتاج.',
            de: 'Das Design wird gebaut: Eine datierte QA-Prüfung listet echte Implementierungsfehler in einer laufenden App auf — eine fehlschlagende Bookmark-API, Screens, die beim Fokussieren nicht neu laden, eine Sackgasse bei der Rück-Navigation, ein hängender „requested“-Status, nachdem ein Host einen privaten Beitritt ablehnt. Ein Funktionsscan des Live-Admin-Panels deckte acht Routen mit rund 85-90% Discovery-Abdeckung ab und stoppte bewusst vor destruktivem Testen an Produktionsdaten.',
            es: 'El diseño se está construyendo: una revisión de QA fechada enumera bugs de implementación reales en una app en funcionamiento —una API de marcadores que falla, pantallas que no recargan los datos al recuperar el foco, un callejón sin salida en la navegación hacia atrás, un estado «requested» obsoleto después de que un anfitrión rechaza una solicitud privada de unión—. Un escaneo funcional del panel de administración en producción cubrió ocho rutas con una cobertura de descubrimiento de aproximadamente el 85–90 %, y se detuvo deliberadamente antes de las pruebas destructivas sobre datos de producción.',
            fr: 'Le design est en cours de construction : une revue QA datée recense de vrais bugs d’implémentation dans une app qui tourne — une API de favoris qui échoue, des écrans qui ne se rechargent pas au retour du focus, une impasse dans la navigation arrière, un état « requested » périmé après qu’un hôte a refusé une demande d’adhésion privée. Un scan fonctionnel du panneau d’administration en production a couvert huit routes, avec une couverture de découverte d’environ 85–90 %, en s’arrêtant volontairement avant tout test destructif sur les données de production.',
            ja: 'デザインは実装が進んでいる。日付入りのQAレビューには、稼働中のアプリの実際の実装バグが並ぶ。失敗するブックマークAPI、フォーカス時に再取得しない画面、戻る操作の行き止まり、ホストが非公開の参加申請を拒否した後も残る「requested」状態。本番の管理画面の機能スキャンは8つのルートをおよそ85–90%の網羅率でカバーし、本番データへの破壊的なテストの手前で意図的に止めている。',
          }),
        ),
        p(
          L({
            en: "But the onboarding screen makes four promises, and the file designs two of them. Across all 17,589 nodes, none contains the word 'path' and none contains 'log' — no goal-setting screen, no AI path, no connection-logging interface.",
            fa: 'اما صفحه‌ی خوش‌آمدگویی چهار وعده می‌دهد، و فایل فقط دوتای آن‌ها را طراحی می‌کند. در میان کل ۱۷٬۵۸۹ گره، هیچ‌کدام حاوی واژه‌ی «مسیر» و هیچ‌کدام حاوی «ثبت» نیستند — نه صفحه‌ی تعیین هدف، نه مسیر هوش مصنوعی، نه رابط ثبت ارتباط.',
            ar: 'لكن شاشة الترحيب تقطع أربعة وعود، ويصمّم الملف اثنين منها فقط. عبر جميع العقد الـ17,589، لا تحتوي أي منها على كلمة "path" ولا "log" — لا شاشة لتحديد الهدف، ولا مسار ذكاء اصطناعي، ولا واجهة تسجيل تواصل.',
            de: 'Aber der Onboarding-Screen macht vier Versprechen, und die Datei entwirft zwei davon. Von allen 17.589 Nodes enthält keiner das Wort „path“ und keiner „log“ — kein Zielsetzungs-Screen, kein KI-Pfad, keine Connection-Logging-Oberfläche.',
            es: 'Pero la pantalla de onboarding hace cuatro promesas, y el archivo diseña dos de ellas. De los 17 589 nodos, ninguno contiene la palabra «path» y ninguno contiene «log»: no hay pantalla para fijar objetivos, ni ruta de IA, ni interfaz para registrar conexiones.',
            fr: 'Mais l’écran d’onboarding fait quatre promesses, et le fichier en conçoit deux. Sur les 17 589 nœuds, aucun ne contient le mot « path » et aucun ne contient « log » — pas d’écran de définition d’objectifs, pas de parcours IA, pas d’interface d’enregistrement des connexions.',
            ja: 'しかしオンボーディング画面は4つの約束をしていて、ファイルがデザインしているのはそのうち2つだけだ。17,589あるノードのどれにも「path」という語はなく、「log」を含むものもない。目標設定の画面も、AIのパスも、つながりを記録するインターフェースもない。',
          }),
        ),
      ),
      insight: '',
    },
    {
      id: 'vin-s14',
      blockType: 'csFigure',
      layout: 'annotated',
      treatment: 'screen',
      items: media.onboardingOpener
        ? [{ id: 'vin-f14-s1', media: media.onboardingOpener, caption: '' }]
        : [],
      annotations: [
        {
          id: 'vin-f14-a1',
          text: l(
            L({
              en: '"Meet Through Movement" — connect with people who share your sport. Delivered: the home feed, the category chips, the map.',
              fa: '«از راه حرکت آشنا شو» — با کسانی آشنا شو که ورزش‌شان مثل توست. تحویل‌شده: فید خانه، چیپ‌های دسته‌بندی، نقشه.',
              ar: '«تعرَّف عبر الحركة» — تواصل مع من يشاركك رياضتك. مُنجَز: الصفحة الرئيسية، ورقائق التصنيفات، والخريطة.',
              de: '„Meet Through Movement“ — triff Menschen, die deinen Sport teilen. Geliefert: Home-Feed, Kategorie-Chips, Karte.',
              es: '«Meet Through Movement»: conecta con personas que comparten tu deporte. Entregado: el feed de inicio, los chips de categoría y el mapa.',
              fr: '« Meet Through Movement » — rencontrez des personnes qui partagent votre sport. Livré : le fil d’accueil, les puces de catégorie, la carte.',
              ja: '「Meet Through Movement」：同じスポーツを楽しむ人とつながる。実現済み：ホームフィード、カテゴリーチップ、マップ。',
            }),
          ),
        },
        {
          id: 'vin-f14-a2',
          text: l(
            L({
              en: '"Who You Want to Meet" — "define your connection goals and we\'ll find the right events to get you there." No goal-setting screen exists in the file.',
              fa: '«چه کسی را می‌خواهی ملاقات کنی» — «هدف‌های ارتباطی‌ات را تعیین کن تا رویدادهای درست را برایت پیدا کنیم.» هیچ صفحه‌ی تعیین هدفی در فایل نیست.',
              ar: '«مَن تريد أن تلتقي» — «حدِّد أهداف تواصلك وسنجد لك الفعاليات المناسبة.» لا توجد شاشة لتحديد الأهداف في الملف.',
              de: '„Who You Want to Meet“ — „definiere deine Verbindungsziele, und wir finden die passenden Events.“ In der Datei gibt es keinen Screen dafür.',
              es: '«Who You Want to Meet»: «define tus objetivos de conexión y encontraremos los eventos adecuados para llegar a ellos». En el archivo no existe ninguna pantalla para fijar objetivos.',
              fr: '« Who You Want to Meet » — « définissez vos objectifs de connexion, et nous trouverons les bons événements pour les atteindre ». Aucun écran de définition d’objectifs n’existe dans le fichier.',
              ja: '「Who You Want to Meet」：「つながりの目標を決めれば、そこへ導くイベントを見つけます」。ファイルに目標設定の画面は存在しない。',
            }),
          ),
        },
        {
          id: 'vin-f14-a3',
          text: l(
            L({
              en: '"Show Up, Stay Active" — join activities that fit your schedule. Delivered: meetup detail, tickets, the join and cancel flows.',
              fa: '«حاضر شو، فعال بمان» — به فعالیت‌هایی بپیوند که با برنامه‌ات جور است. تحویل‌شده: جزئیات میت‌آپ، بلیت‌ها، جریان‌های پیوستن و لغو.',
              ar: '«احضر وابقَ نشطًا» — انضم إلى أنشطة تناسب جدولك. مُنجَز: تفاصيل اللقاء، والتذاكر، ومسارا الانضمام والإلغاء.',
              de: '„Show Up, Stay Active“ — nimm an Aktivitäten teil, die in deinen Kalender passen. Geliefert: Meetup-Detail, Tickets, Beitritts- und Storno-Flows.',
              es: '«Show Up, Stay Active»: únete a actividades que encajan con tu agenda. Entregado: el detalle del meetup, las entradas y los flujos para unirse y cancelar.',
              fr: '« Show Up, Stay Active » — rejoignez des activités adaptées à votre emploi du temps. Livré : le détail du meetup, les billets, les parcours d’inscription et d’annulation.',
              ja: '「Show Up, Stay Active」：予定に合うアクティビティに参加する。実現済み：ミートアップ詳細、チケット、参加とキャンセルのフロー。',
            }),
          ),
        },
        {
          id: 'vin-f14-a4',
          text: l(
            L({
              en: '"Your Network Grows With You" — "track your events, your connections, and the relationships that matter." No connection-logging screen exists either.',
              fa: '«شبکه‌ات با تو رشد می‌کند» — «رویدادها، ارتباط‌ها و روابط مهمت را پیگیری کن.» صفحه‌ی ثبت ارتباط هم وجود ندارد.',
              ar: '«شبكتك تنمو معك» — «تتبَّع فعالياتك وتواصلاتك والعلاقات المهمة.» ولا توجد شاشة لتسجيل التواصلات أيضًا.',
              de: '„Your Network Grows With You“ — „verfolge deine Events, deine Kontakte und die Beziehungen, die zählen.“ Auch dafür gibt es keinen Screen.',
              es: '«Your Network Grows With You»: «sigue tus eventos, tus conexiones y las relaciones que importan». Tampoco existe ninguna pantalla para registrar conexiones.',
              fr: '« Your Network Grows With You » — « suivez vos événements, vos connexions et les relations qui comptent ». Aucun écran d’enregistrement des connexions n’existe non plus.',
              ja: '「Your Network Grows With You」：「イベント、つながり、大切な関係を記録しよう」。つながりを記録する画面も存在しない。',
            }),
          ),
        },
      ],
      caption: l(
        L({
          en: 'Onboarding makes four promises across four slides. Searching all 17,589 named nodes for "path" and for "log" returns nothing: two of the four — the two the thesis rests on — have no screen behind them.',
          fa: 'خوش‌آمدگویی در چهار اسلاید، چهار وعده می‌دهد. جست‌وجوی هر ۱۷٬۵۸۹ گره‌ی نام‌دار برای «path» و «log» چیزی برنمی‌گرداند: دو تا از چهار وعده — همان دوتایی که فرضیه بر آن‌ها ایستاده — صفحه‌ای پشت‌شان ندارند.',
          ar: 'يقدّم الترحيب أربعة وعود عبر أربع شرائح. البحث في كل العقد المسمّاة البالغة 17,589 عن «path» و«log» لا يعيد شيئًا: وعدان من الأربعة — وهما ما تقوم عليه الفرضية — بلا شاشة خلفهما.',
          de: 'Das Onboarding gibt auf vier Folien vier Versprechen. Eine Suche über alle 17.589 benannten Nodes nach „path“ und nach „log“ liefert nichts: Zwei der vier — die beiden, auf denen die These ruht — haben keinen Screen dahinter.',
          es: 'El onboarding hace cuatro promesas en cuatro diapositivas. Buscar «path» y «log» en los 17 589 nodos con nombre no devuelve nada: dos de las cuatro —justo las dos en las que se apoya la tesis— no tienen ninguna pantalla detrás.',
          fr: 'L’onboarding fait quatre promesses sur quatre diapositives. Chercher « path » et « log » parmi les 17 589 nœuds nommés ne renvoie rien : deux des quatre — les deux sur lesquelles repose la thèse — n’ont aucun écran derrière elles.',
          ja: 'オンボーディングは4枚のスライドで4つの約束をする。名前のついた17,589のノードすべてを「path」と「log」で検索しても、何も見つからない。4つのうち2つ、それも仮説の土台となる2つには、裏づける画面がない。',
        }),
      ),
    },
    {
      id: 'vin-s14a',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'screen',
      items: [
        ...item(
          'meetupAttended',
          'vin-f14a-1',
          L({
            en: 'Meet up Detail → Meetup Attended',
            fa: 'جزئیات میت‌آپ ← میت‌آپ حاضرشده',
            ar: 'تفاصيل اللقاء ← اللقاء الذي حضرته',
            de: 'Meetup-Detail → Meetup Attended',
            es: 'Detalle del meetup → Meetup Attended',
            fr: 'Détail du meetup → Meetup Attended',
            ja: 'ミートアップ詳細 → Meetup Attended',
          }),
        ),
        ...item(
          'mutualConnections',
          'vin-f14a-2',
          L({
            en: 'Profile → Mutual Connections',
            fa: 'پروفایل ← ارتباط‌های مشترک',
            ar: 'الملف الشخصي ← الصلات المشتركة',
            de: 'Profil → Mutual Connections',
            es: 'Perfil → Mutual Connections',
            fr: 'Profil → Mutual Connections',
            ja: 'プロフィール → Mutual Connections',
          }),
        ),
      ],
      caption: l(
        L({
          en: 'Two sections, one screen: below the title these frames are pixel-identical — the same twelve people in the same order. Correct component reuse, and also the gap, because nothing in either screen separates "we were in the same room" from "we met."',
          fa: 'دو بخش، یک صفحه: زیر عنوان، این دو فریم پیکسل‌به‌پیکسل یکسان‌اند — همان دوازده نفر به همان ترتیب. هم استفاده‌ی درست از کامپوننت است و هم همان شکاف، چون در هیچ‌کدام چیزی «در یک اتاق بودیم» را از «همدیگر را ملاقات کردیم» جدا نمی‌کند.',
          ar: 'قسمان، شاشة واحدة: تحت العنوان يتطابق الإطاران بكسلًا بكسل — الأشخاص الاثنا عشر أنفسهم بالترتيب نفسه. إعادة استخدام صحيحة للمكوّن، وهي أيضًا الفجوة، إذ لا شيء في أيٍّ من الشاشتين يفصل «كنّا في الغرفة نفسها» عن «التقينا».',
          de: 'Zwei Sektionen, ein Screen: Unterhalb des Titels sind beide Frames pixelgleich — dieselben zwölf Personen in derselben Reihenfolge. Korrekte Komponenten-Wiederverwendung und zugleich die Lücke, denn nichts in beiden trennt „wir waren im selben Raum“ von „wir haben uns kennengelernt“.',
          es: 'Dos secciones, una pantalla: bajo el título, estos frames son idénticos píxel a píxel, con las mismas doce personas en el mismo orden. Una reutilización de componentes correcta, y también la brecha, porque nada en ninguna de las dos pantallas distingue «estuvimos en la misma sala» de «nos conocimos».',
          fr: 'Deux sections, un seul écran : sous le titre, ces frames sont identiques au pixel près — les mêmes douze personnes dans le même ordre. Une réutilisation de composant correcte, et aussi la faille, car rien dans l’un ou l’autre écran ne distingue « nous étions dans la même pièce » de « nous nous sommes rencontrés ».',
          ja: '2つのセクション、1つの画面。タイトルの下は、2つのフレームがピクセル単位で同一だ。同じ12人が同じ順に並ぶ。コンポーネントの再利用としては正しいが、同時にそれが欠落でもある。どちらの画面にも、「同じ部屋にいた」と「知り合った」を区別するものが何もないからだ。',
        }),
      ),
    },
    {
      id: 'vin-s15',
      blockType: 'csFinding',
      kind: 'finding',
      text: l(
        L({
          en: "Problem #52 assigns the still-unbuilt AI path a 60% target before it has a frame; problem #44 reasons about users who 'log connections but don't follow up.' The KPI has a target before the feature has a screen.",
          fa: 'برای مسیر هوش مصنوعی در مسئله‌ی #۵۲، پیش از طراحی حتی یک صفحه، هدف ۶۰٪ تعیین شده بود. مسئله‌ی #۴۴ هم به کاربرانی می‌پردازد که «ارتباط را ثبت می‌کنند اما پیگیری نمی‌کنند». به این ترتیب، شاخص‌ها پیش از وجود رابطی برای این رفتارها تعریف شده بودند.',
          ar: 'تحدِّد المشكلة #52 هدفًا بنسبة 60٪ لمسار الذكاء الاصطناعي غير المبني بعد قبل أن يكون له إطار؛ وتُحلِّل المشكلة #44 مستخدمين «يسجّلون التواصلات لكن لا يتابعون». المؤشر له هدف قبل أن تكون للميزة شاشة.',
          de: 'Problem #52 weist dem noch nicht gebauten KI-Pfad ein 60%-Ziel zu, bevor er einen Frame hat; Problem #44 argumentiert über Nutzer, die „Verbindungen protokollieren, aber nicht nachfassen“. Der KPI hat ein Ziel, bevor das Feature einen Screen hat.',
          es: 'El problema #52 asigna a la ruta de IA, aún sin construir, un objetivo del 60 % antes de que tenga un frame; el problema #44 razona sobre usuarios que «registran conexiones pero no hacen seguimiento». El KPI tiene objetivo antes de que la funcionalidad tenga pantalla.',
          fr: 'Le problème #52 fixe au parcours IA, encore non construit, un objectif de 60 % avant même qu’il ait une frame ; le problème #44 raisonne sur des utilisateurs qui « enregistrent des connexions mais ne relancent pas ». Le KPI a un objectif avant que la fonctionnalité ait un écran.',
          ja: '問題#52は、まだ作られていないAIパスに、フレームすら存在しないうちから60%という目標を割り当てている。問題#44は、「つながりを記録するがフォローアップしない」ユーザーについて論じている。機能に画面ができる前に、KPIに目標がある。',
        }),
      ),
      attribution: l(
        L({
          en: 'VIN problem inventory, problems #52 and #44',
          fa: 'فهرست مسئله‌ی وین، مسئله‌های #۵۲ و #۴۴',
          ar: 'فهرس مشكلات VIN، المشكلتان #52 و#44',
          de: 'VIN-Problem-Inventar, Probleme #52 und #44',
          es: 'Inventario de problemas de VIN, problemas #52 y #44',
          fr: 'Inventaire des problèmes de VIN, problèmes #52 et #44',
          ja: 'VINの問題インベントリ、問題#52と#44',
        }),
      ),
      method: l(
        L({
          en: '17,589-node Figma file audit, cross-referenced against the 57-problem inventory',
          fa: 'ممیزیِ فایل فیگمای ۱۷٬۵۸۹گره‌ای، تطبیق‌داده‌شده با فهرست ۵۷مسئله‌ای',
          ar: 'تدقيق ملف Figma المكوَّن من 17,589 عقدة، مقارنًا بفهرس الـ57 مشكلة',
          de: 'Audit der 17.589-Node-Figma-Datei, abgeglichen mit dem 57-Probleme-Inventar',
          es: 'Auditoría del archivo de Figma de 17 589 nodos, contrastada con el inventario de 57 problemas',
          fr: 'Audit du fichier Figma de 17 589 nœuds, recoupé avec l’inventaire des 57 problèmes',
          ja: '17,589ノードのFigmaファイルの監査を、57項目の問題インベントリと照合',
        }),
      ),
    },
    // Every screen, flow by flow — before the outcomes, as Marqevon's page index sits.
    ...vinScreenSections(locale, dir, media),
    {
      id: 'vin-s16',
      blockType: 'csOutcomes',
      intro: l(
        L({
          en: 'Pre-launch, so these are design and audit outputs, not product usage numbers.',
          fa: 'پیش از انتشار، پس این‌ها خروجی‌های طراحی و ممیزی‌اند، نه ارقام استفاده‌ی محصول.',
          ar: 'قبل الإطلاق، لذا هذه نواتج تصميم وتدقيق، لا أرقام استخدام للمنتج.',
          de: 'Vor dem Launch, daher sind dies Design- und Audit-Outputs, keine Produktnutzungszahlen.',
          es: 'Antes del lanzamiento, así que son resultados de diseño y auditoría, no cifras de uso del producto.',
          fr: 'Avant le lancement : ce sont donc des livrables de design et d’audit, pas des chiffres d’usage du produit.',
          ja: 'ローンチ前のため、これらはプロダクトの利用数値ではなく、デザインと監査の成果である。',
        }),
      ),
      items: [
        {
          id: 'vin-o01',
          value: '126',
          label: l(
            L({
              en: 'screens shipped as spec',
              fa: 'صفحه به‌عنوان مشخصات تحویل شد',
              ar: 'شاشة سُلِّمت كمواصفات',
              de: 'Screens als Spec geliefert',
              es: 'pantallas entregadas como especificación',
              fr: 'écrans livrés sous forme de spécification',
              ja: '画面を仕様として納品',
            }),
          ),
          context: l(
            L({
              en: 'Across 11 Figma sections, on a 12-group, 221-component design system',
              fa: 'در ۱۱ بخش فیگما، روی سیستم طراحیِ ۱۲گروهی با ۲۲۱ کامپوننت',
              ar: 'عبر 11 قسمًا في Figma، على نظام تصميم من 12 مجموعة و221 مكوّنًا',
              de: 'Über 11 Figma-Bereiche, auf einem Design-System mit 12 Gruppen und 221 Komponenten',
              es: 'En 11 secciones de Figma, sobre un sistema de diseño de 12 grupos y 221 componentes',
              fr: 'Sur 11 sections Figma, avec un design system de 12 groupes et 221 composants',
              ja: '11のFigmaセクションにわたり、12グループ・221コンポーネントのデザインシステム上で',
            }),
          ),
          kind: 'measured',
          source: l(
            L({
              en: 'Figma file audit',
              fa: 'ممیزی فایل فیگما',
              ar: 'تدقيق ملف Figma',
              de: 'Figma-Datei-Audit',
              es: 'Auditoría del archivo de Figma',
              fr: 'Audit du fichier Figma',
              ja: 'Figmaファイルの監査',
            }),
          ),
        },
        {
          id: 'vin-o02',
          value: '57',
          label: l(
            L({
              en: 'problems inventoried',
              fa: 'مسئله‌ی فهرست‌شده',
              ar: 'مشكلة مُفهرَسة',
              de: 'inventarisierte Probleme',
              es: 'problemas inventariados',
              fr: 'problèmes inventoriés',
              ja: '件の問題を棚卸し',
            }),
          ),
          context: l(
            L({
              en: 'Across five difficulty tiers, each with an owning KPI and a difficulty rating',
              fa: 'در پنج رده‌ی دشواری، هرکدام با یک شاخص مالک و درجه‌ی دشواری',
              ar: 'عبر خمس مستويات صعوبة، لكل منها مؤشر أداء مالك ودرجة صعوبة',
              de: 'Über fünf Schwierigkeitsstufen, jede mit einem zugehörigen KPI und einer Schwierigkeitsbewertung',
              es: 'En cinco niveles de dificultad, cada uno con un KPI responsable y una valoración de dificultad',
              fr: 'Répartis sur cinq niveaux de difficulté, chacun avec un KPI de rattachement et une note de difficulté',
              ja: '5段階の難易度にわたり、それぞれに対応するKPIと難易度評価がある',
            }),
          ),
          kind: 'measured',
          source: l(
            L({
              en: 'Problem inventory workbook',
              fa: 'کارپوشه‌ی فهرست مسئله',
              ar: 'كتاب عمل فهرس المشكلات',
              de: 'Problem-Inventar-Arbeitsheft',
              es: 'Hoja de cálculo del inventario de problemas',
              fr: 'Classeur de l’inventaire des problèmes',
              ja: '問題インベントリのワークブック',
            }),
          ),
        },
        {
          id: 'vin-o03',
          value: '2 of 4',
          label: l(
            L({
              en: 'onboarding promises with a matching screen',
              fa: 'وعده‌ی خوش‌آمدگویی با صفحه‌ی متناظر',
              ar: 'وعد ترحيبي له شاشة مطابقة',
              de: 'Onboarding-Versprechen mit passendem Screen',
              es: 'promesas del onboarding con una pantalla que les corresponde',
              fr: 'promesses d’onboarding dotées d’un écran correspondant',
              ja: '対応する画面があるオンボーディングの約束',
            }),
          ),
          context: l(
            L({
              en: "The goal-setting and connection-logging screens the thesis depends on don't exist yet",
              fa: 'صفحات تعیین هدف و ثبت ارتباط که فرضیه به آن‌ها وابسته است هنوز وجود ندارند',
              ar: 'شاشتا تحديد الهدف وتسجيل التواصل اللتان تعتمد عليهما الفرضية غير موجودتين بعد',
              de: 'Die Ziel­setzungs- und Connection-Logging-Screens, von denen die These abhängt, existieren noch nicht',
              es: 'Las pantallas para fijar objetivos y registrar conexiones de las que depende la tesis aún no existen',
              fr: 'Les écrans de définition d’objectifs et d’enregistrement des connexions dont dépend la thèse n’existent pas encore',
              ja: '仮説が依存する目標設定とつながり記録の画面は、まだ存在しない',
            }),
          ),
          kind: 'measured',
          source: l(
            L({
              en: '17,589-node file audit',
              fa: 'ممیزیِ فایل ۱۷٬۵۸۹گره‌ای',
              ar: 'تدقيق ملف بـ17,589 عقدة',
              de: '17.589-Node-Datei-Audit',
              es: 'Auditoría del archivo de 17 589 nodos',
              fr: 'Audit du fichier de 17 589 nœuds',
              ja: '17,589ノードのファイル監査',
            }),
          ),
        },
        {
          id: 'vin-o04',
          value: '',
          label: l(
            L({
              en: 'A dated, honest QA pass — not a launch',
              fa: 'یک بازبینی کیفیتِ تاریخ‌دار و صادقانه — نه یک انتشار',
              ar: 'مراجعة جودة مؤرَّخة وصادقة — لا إطلاق',
              de: 'Eine datierte, ehrliche QA-Runde — kein Launch',
              es: 'Una pasada de QA fechada y honesta, no un lanzamiento',
              fr: 'Une passe QA datée et honnête — pas un lancement',
              ja: '日付入りの誠実なQA。ローンチではない',
            }),
          ),
          context: l(
            L({
              en: '8 Feb review of real bugs in the running app, plus an 85–90%-coverage admin-panel function scan, stopped short of destructive testing',
              fa: 'بازبینیِ ۸ فوریه از باگ‌های واقعی در اپِ در حال اجرا، به‌همراه اسکن عملکردیِ پنل مدیریت با پوشش ۸۵ تا ۹۰ درصد، پیش از آزمون تخریبی متوقف شد',
              ar: 'مراجعة 8 فبراير لأخطاء حقيقية في التطبيق العامل، إضافة إلى مسح وظيفي للوحة الإدارة بتغطية 85-90٪، توقّف قبل الاختبار التخريبي',
              de: '8.-Februar-Prüfung echter Bugs in der laufenden App, plus ein Admin-Panel-Funktionsscan mit 85-90% Abdeckung, gestoppt vor destruktivem Testen',
              es: 'Revisión del 8 de febrero de bugs reales en la app en funcionamiento, más un escaneo funcional del panel de administración con una cobertura del 85–90 %, detenido antes de las pruebas destructivas',
              fr: 'Revue du 8 février des vrais bugs de l’app en fonctionnement, plus un scan fonctionnel du panneau d’administration couvrant 85–90 %, arrêté avant les tests destructifs',
              ja: '2月8日に稼働中のアプリの実際のバグをレビューし、管理画面の機能スキャン（網羅率85–90%）も実施。破壊的テストの手前で停止',
            }),
          ),
          kind: 'delivered',
          source: l(
            L({
              en: 'QA review + admin function scan',
              fa: 'بازبینی کیفیت + اسکن عملکردیِ مدیریت',
              ar: 'مراجعة الجودة + مسح وظيفي للإدارة',
              de: 'QA-Prüfung + Admin-Funktionsscan',
              es: 'Revisión de QA + escaneo funcional del panel de administración',
              fr: 'Revue QA + scan fonctionnel de l’administration',
              ja: 'QAレビュー + 管理画面の機能スキャン',
            }),
          ),
        },
      ],
      shipped: l(
        L({
          en: [
            'Product brief (3,716 lines)',
            '57-problem inventory + 20-KPI dictionary (8- and 4-sheet workbooks)',
            '126-screen UI on a 12-group design system',
            'Brand & naming architecture',
            'B2B venue-revenue layer (19 screens)',
            'ASO pack + Arabic/RTL localisation checklist',
            'A reusable design-and-audit protocol (locked decisions, cultural rules, copy patterns)',
          ],
          fa: [
            'سند محصول (۳٬۷۱۶ خط)',
            'فهرست ۵۷مسئله‌ای + واژه‌نامه‌ی ۲۰شاخصی (کارپوشه‌های ۸ و ۴برگه)',
            'رابط کاربریِ ۱۲۶صفحه‌ای روی سیستم طراحیِ ۱۲گروهی',
            'معماری برند و نام‌گذاری',
            'لایه‌ی درآمدیِ B2B مکان‌ها (۱۹ صفحه)',
            'بسته‌ی ASO + چک‌لیست بومی‌سازیِ عربی/راست‌به‌چپ',
            'پروتکل طراحی-و-ممیزیِ قابل‌استفاده‌ی مجدد (تصمیم‌های قفل‌شده، قواعد فرهنگی، الگوهای متنی)',
          ],
          ar: [
            'موجز المنتج (3,716 سطرًا)',
            'فهرس 57 مشكلة + قاموس 20 مؤشر أداء (كتب عمل من 8 و4 أوراق)',
            'واجهة من 126 شاشة على نظام تصميم من 12 مجموعة',
            'هندسة العلامة التجارية والتسمية',
            'طبقة إيرادات B2B للأماكن (19 شاشة)',
            'حزمة ASO + قائمة تدقيق لتوطين العربية/RTL',
            'بروتوكول تصميم وتدقيق قابل لإعادة الاستخدام (قرارات مُقفَلة، قواعد ثقافية، أنماط نصوص)',
          ],
          de: [
            'Produktbrief (3.716 Zeilen)',
            '57-Probleme-Inventar + 20-KPI-Wörterbuch (8- und 4-Blatt-Arbeitshefte)',
            '126-Screen-UI auf einem Design-System mit 12 Gruppen',
            'Marken- & Namensarchitektur',
            'B2B-Venue-Umsatzebene (19 Screens)',
            'ASO-Paket + Checkliste zur arabischen/RTL-Lokalisierung',
            'Ein wiederverwendbares Design-und-Audit-Protokoll (verriegelte Entscheidungen, Kulturregeln, Copy-Muster)',
          ],
          es: [
            'Brief de producto (3716 líneas)',
            'Inventario de 57 problemas + diccionario de 20 KPI (hojas de cálculo de 8 y 4 pestañas)',
            'UI de 126 pantallas sobre un sistema de diseño de 12 grupos',
            'Arquitectura de marca y de naming',
            'Capa B2B de ingresos para locales (19 pantallas)',
            'Paquete ASO + checklist de localización al árabe y RTL',
            'Un protocolo reutilizable de diseño y auditoría (decisiones bloqueadas, reglas culturales, patrones de copy)',
          ],
          fr: [
            'Brief produit (3 716 lignes)',
            'Inventaire de 57 problèmes + dictionnaire de 20 KPI (classeurs de 8 et 4 onglets)',
            'UI de 126 écrans sur un design system de 12 groupes',
            'Architecture de marque et de nommage',
            'Couche B2B de revenus pour les lieux (19 écrans)',
            'Pack ASO + checklist de localisation arabe/RTL',
            'Un protocole réutilisable de design et d’audit (décisions verrouillées, règles culturelles, modèles de copy)',
          ],
          ja: [
            'プロダクトブリーフ（3,716行）',
            '57項目の問題インベントリ + 20のKPI辞書（8シートと4シートのワークブック）',
            '12グループのデザインシステム上に構築した126画面のUI',
            'ブランドとネーミングのアーキテクチャ',
            'B2Bの店舗収益レイヤー（19画面）',
            'ASOパック + アラビア語・RTLローカライズのチェックリスト',
            '再利用できるデザイン・監査プロトコル（ロックした決定、文化ルール、コピーのパターン）',
          ],
        }),
      ),
      heading: '',
    },
    {
      id: 'vin-s17',
      blockType: 'csLessons',
      items: [
        {
          id: 'vin-l01',
          title: l(
            L({
              en: 'A hard-to-move north star is a design constraint, not a metric choice',
    fa: 'شاخص اصلی محصول، مسیر طراحی را محدود و روشن می‌کند',
              ar: 'مقياس شمالي يصعب تحريكه هو قيد تصميم، لا اختيار مقياس',
              de: 'Ein schwer bewegbarer Nordstern ist eine Designbeschränkung, keine Metrikwahl',
              es: 'Una estrella polar difícil de mover es una restricción de diseño, no una elección de métrica',
              fr: 'Une étoile du Nord difficile à faire bouger est une contrainte de design, pas un choix de métrique',
              ja: '動かしにくいノーススターは、指標の選択ではなくデザインの制約だ',
            }),
          ),
          body: l(
            L({
              en: "Connection Logging Rate can't be inflated by a notification or a better feed — it only moves if the product genuinely produced a connection worth logging. That one choice ruled out most of the standard engagement toolkit, which is what made the rest of the design coherent.",
              fa: 'نرخ ثبت ارتباط با اعلان بیشتر یا فید جذاب‌تر بالا نمی‌رود؛ باید ارتباطی شکل بگیرد که کاربر بخواهد آن را ثبت کند. انتخاب این شاخص، بسیاری از الگوهای معمول افزایش تعامل را کنار گذاشت و به طراحی جهت داد.',
              ar: 'لا يمكن تضخيم معدّل تسجيل التواصل بإشعار أو موجز أفضل — لا يتحرّك إلا إذا أنتج المنتج فعلًا تواصلًا يستحق التسجيل. هذا الاختيار الواحد استبعد معظم عدة أدوات التفاعل القياسية، وهو ما جعل بقية التصميم متماسكًا.',
              de: 'Die Connection Logging Rate lässt sich nicht durch eine Benachrichtigung oder einen besseren Feed aufblähen — sie bewegt sich nur, wenn das Produkt tatsächlich eine loggenswerte Verbindung erzeugt hat. Diese eine Entscheidung schloss den größten Teil des Standard-Engagement-Werkzeugkastens aus, was den Rest des Designs kohärent machte.',
              es: 'La Connection Logging Rate no se puede inflar con una notificación o un feed mejor: solo se mueve si el producto generó de verdad una conexión que valga la pena registrar. Esa única decisión descartó la mayor parte del kit estándar de engagement, y eso es lo que dio coherencia al resto del diseño.',
              fr: 'Le Connection Logging Rate ne peut pas être gonflé par une notification ou un meilleur fil — il ne bouge que si le produit a réellement créé une connexion qui mérite d’être enregistrée. Ce seul choix a écarté l’essentiel de la boîte à outils habituelle de l’engagement, et c’est ce qui a rendu le reste du design cohérent.',
              ja: 'Connection Logging Rateは、通知やフィードの改善では水増しできない。プロダクトが記録に値するつながりを本当に生んだときにだけ動く。このひとつの選択が、標準的なエンゲージメント施策のほとんどを除外し、それが残りのデザインに一貫性をもたらした。',
            }),
          ),
        },
        {
          id: 'vin-l02',
          title: l(
            L({
              en: 'Upstream work can feel like progress that screens would have tested',
    fa: 'مستندسازی پیشرفت است، اما جای آزمودن محصول را نمی‌گیرد',
              ar: 'قد يبدو العمل التمهيدي تقدمًا كانت الشاشات لتختبره',
              de: 'Upstream-Arbeit kann sich wie Fortschritt anfühlen, den Screens getestet hätten',
              es: 'El trabajo previo puede parecer un avance que las pantallas habrían puesto a prueba',
              fr: 'Le travail en amont peut ressembler à un progrès que des écrans auraient mis à l’épreuve',
              ja: '上流の作業は、画面なら試されたはずの前進に見えてしまう',
            }),
          ),
          body: l(
            L({
              en: 'The brief was written, 57 problems inventoried, 20 KPIs defined, 126 screens drawn — and the two features the whole thesis depends on still have no frame, while one already has a 60% target. A thin, ugly frame of the goal-to-log loop in week one would have surfaced the hard question earlier.',
              fa: 'سند محصول، ۵۷ مسئله، ۲۰ شاخص و ۱۲۶ صفحه آماده شد؛ اما دو ویژگی اصلیِ فرضیه هنوز صفحه‌ای نداشتند و برای یکی از آن‌ها هدف ۶۰٪ تعیین شده بود. یک نمونه‌ی ساده از مسیر تعیین هدف تا ثبت ارتباط در هفته‌ی اول، این شکاف را زودتر آشکار می‌کرد.',
              ar: 'كُتب الموجز، وفُهرست 57 مشكلة، وحُدِّد 20 مؤشرًا، ورُسمت 126 شاشة — والميزتان اللتان تعتمد عليهما الفرضية كلها ما زالتا بلا إطار، فيما إحداهما تحمل بالفعل هدف 60٪. إطار رقيق وغير أنيق لحلقة الهدف-إلى-التسجيل في الأسبوع الأول كان سيكشف السؤال الصعب أبكر.',
              de: 'Der Brief wurde geschrieben, 57 Probleme inventarisiert, 20 KPIs definiert, 126 Screens gezeichnet — und die zwei Features, von denen die ganze These abhängt, haben noch keinen Frame, während eines bereits ein 60%-Ziel hat. Ein dünner, hässlicher Frame der Goal-to-Log-Schleife in Woche eins hätte die harte Frage früher zutage gebracht.',
              es: 'Se escribió el brief, se inventariaron 57 problemas, se definieron 20 KPI y se dibujaron 126 pantallas, y las dos funcionalidades de las que depende toda la tesis siguen sin frame, mientras que una ya tiene un objetivo del 60 %. Un frame fino y feo del ciclo del objetivo al registro en la primera semana habría sacado a la luz antes la pregunta difícil.',
              fr: 'Le brief a été écrit, 57 problèmes inventoriés, 20 KPI définis, 126 écrans dessinés — et les deux fonctionnalités dont dépend toute la thèse n’ont toujours pas de frame, alors que l’une a déjà un objectif de 60 %. Une frame sommaire et laide de la boucle de l’objectif à l’enregistrement dès la première semaine aurait fait émerger plus tôt la question difficile.',
              ja: 'ブリーフを書き、57の問題を洗い出し、20のKPIを定義し、126画面を描いた。それでも仮説全体が依存する2つの機能にはまだフレームがなく、一方にはすでに60%の目標がある。1週目に、目標から記録までのループを粗く不格好なフレームで描いていれば、難しい問いはもっと早く浮かび上がっていたはずだ。',
            }),
          ),
        },
        {
          id: 'vin-l03',
          title: l(
            L({
              en: "Non-negotiable survives arguments that advisory doesn't",
    fa: 'قاعده‌ی روشن و مستدل، در تصمیم‌های بعدی دوام می‌آورد',
              ar: 'غير القابل للتفاوض يصمد أمام حجج لا يصمد أمامها الاستشاري',
              de: 'Nicht verhandelbar übersteht Argumente, die beratend nicht übersteht',
              es: 'Lo innegociable resiste discusiones que lo orientativo no resiste',
              fr: 'Le non négociable survit aux débats auxquels le consultatif ne survit pas',
              ja: '譲れないルールは、助言なら持ちこたえられない議論にも耐える',
            }),
          ),
          body: l(
            L({
              en: "'No public leaderboards' as guidance loses the first argument it has with a growth idea; phrased as a locked constraint with a stated reason, it holds. The same technique on vocabulary — declaring 'Meetup' and 'Event' discontinued rather than discouraged — gives the brand architecture teeth, though the file shows a locked decision still needs a migration pass to become real.",
              fa: 'اگر «بدون جدول رده‌بندی عمومی» فقط یک توصیه باشد، ممکن است با نخستین ایده‌ی رشد کنار برود. وقتی دلیل فرهنگی آن ثبت و به قاعده‌ای قطعی تبدیل شود، در تصمیم‌های بعدی هم پابرجا می‌ماند. همین رویکرد برای کنار گذاشتن واژه‌های «میت‌آپ» و «رویداد» به نام‌گذاری جهت می‌دهد؛ هرچند فایل طراحی نشان می‌دهد متن‌های موجود هنوز باید با این تصمیم هماهنگ شوند.',
              ar: '«بلا لوحات صدارة عامة» كإرشاد يخسر أول جدال له مع فكرة نمو؛ لكن مصاغًا كقيد مُقفَل بسبب معلن، يصمد. التقنية نفسها على المفردات — إعلان "Meetup" و"Event" متوقّفَين بدل مثبَّطَين — يمنح هندسة العلامة التجارية قوة، مع أن الملف يُظهر أن قرارًا مُقفَلًا ما زال يحتاج تمريرة ترحيل ليصبح واقعًا.',
              de: '„Keine öffentlichen Ranglisten“ als Empfehlung verliert das erste Argument mit einer Wachstumsidee; formuliert als verriegelte Beschränkung mit genanntem Grund, hält sie stand. Dieselbe Technik beim Vokabular — „Meetup“ und „Event“ als eingestellt statt nur abgeraten zu erklären — verleiht der Markenarchitektur Biss, auch wenn die Datei zeigt, dass eine verriegelte Entscheidung noch einen Migrationsdurchgang braucht, um real zu werden.',
              es: '«Sin rankings públicos» como pauta pierde la primera discusión que tiene con una idea de crecimiento; formulada como restricción bloqueada y con su motivo explícito, se mantiene. La misma técnica aplicada al vocabulario —declarar «Meetup» y «Event» descontinuados en lugar de desaconsejados— da dientes a la arquitectura de marca, aunque el archivo muestra que una decisión bloqueada aún necesita una pasada de migración para hacerse realidad.',
              fr: '« Pas de classements publics », en tant que recommandation, perd le premier débat qu’il a avec une idée de croissance ; formulé comme une contrainte verrouillée assortie d’une raison explicite, il tient. La même technique appliquée au vocabulaire — déclarer « Meetup » et « Event » abandonnés plutôt que déconseillés — donne du mordant à l’architecture de marque, même si le fichier montre qu’une décision verrouillée a encore besoin d’une passe de migration pour devenir réelle.',
              ja: '「公開ランキングなし」は、ガイダンスにとどめれば、グロース施策のアイデアとの最初の議論で負ける。理由を明記したロック済みの制約として書けば、持ちこたえる。同じ手法を語彙に使い、「Meetup」と「Event」を非推奨ではなく廃止と宣言したことで、ブランドアーキテクチャに強制力が生まれた。ただしファイルが示すとおり、ロックした決定も移行作業を経なければ現実にはならない。',
            }),
          ),
        },
        {
          id: 'vin-l04',
          title: l(
            L({
              en: 'Designing the revenue layer as a product changes the consumer brief',
              fa: 'طراحیِ لایه‌ی درآمد به‌عنوان محصول، سند مصرف‌کننده را عوض می‌کند',
              ar: 'تصميم طبقة الإيرادات كمنتج يغيّر موجز المستهلك',
              de: 'Die Umsatzebene als Produkt zu gestalten verändert den Consumer-Brief',
              es: 'Diseñar la capa de ingresos como producto cambia el brief del consumidor',
              fr: 'Concevoir la couche de revenus comme un produit change le brief côté consommateur',
              ja: '収益レイヤーをプロダクトとして設計すると、利用者側のブリーフが変わる',
            }),
          ),
          body: l(
            L({
              en: "Once venues are matched to groups and hosts bid for sponsorship, 'off-peak covers' becomes a real constraint on scheduling, group size and category mix — a far more specific brief than 'help people network'.",
              fa: 'وقتی مکان‌ها با گروه‌ها تطبیق داده می‌شوند و میزبانان برای حمایت مزایده می‌دهند، «پوشش ساعات کم‌ترافیک» به محدودیتی واقعی روی زمان‌بندی، اندازه‌ی گروه و ترکیب دسته‌بندی تبدیل می‌شود — سندی به‌مراتب دقیق‌تر از «به مردم در شبکه‌سازی کمک کن».',
              ar: 'حين تُطابَق الأماكن بالمجموعات ويزايد المضيفون على الرعاية، تصبح «تغطية ساعات الركود» قيدًا حقيقيًا على الجدولة وحجم المجموعة ومزيج الفئات — موجزًا أدق بكثير من «ساعد الناس على التواصل».',
              de: 'Sobald Venues mit Gruppen gematcht werden und Hosts um Sponsoring bieten, wird „Off-Peak-Covers“ zu einer echten Beschränkung für Scheduling, Gruppengröße und Kategorie-Mix — ein weit spezifischerer Brief als „hilf Menschen beim Netzwerken“.',
              es: 'Cuando los locales se emparejan con grupos y los anfitriones pujan por patrocinios, los «cubiertos en horas valle» se convierten en una restricción real de programación, tamaño de grupo y combinación de categorías: un brief mucho más concreto que «ayudar a la gente a hacer networking».',
              fr: 'Dès lors que les lieux sont associés à des groupes et que les hôtes enchérissent pour un sponsoring, les « couverts en heures creuses » deviennent une vraie contrainte de planning, de taille de groupe et de mix de catégories — un brief bien plus précis que « aider les gens à réseauter ».',
              ja: '店舗がグループとマッチングされ、ホストがスポンサーシップに入札するようになると、「オフピークの来店数」は、スケジュール、グループ規模、カテゴリー構成に対する現実の制約になる。「人々のネットワーキングを助ける」よりはるかに具体的なブリーフだ。',
            }),
          ),
        },
      ],
    },
  ]
}

// ── Assembly ────────────────────────────────────────────────────────────────────────────────

/** Localized project fields for one locale — everything a `fallback: false` site needs filled. */
export function vinLocalizedFields(locale: Locale, media: VinMediaIds) {
  const l = <T>(value: L<T>): T => value[locale]
  return {
    title: l(TITLE),
    company: l(COMPANY),
    role: l(ROLE),
    summary: l(SUMMARY),
    statement: l(STATEMENT),
    industry: l(INDUSTRY),
    team: l(TEAM),
    hero: {
      items: (['heroGoalChips', 'heroVenueLanding', 'heroMeetupDetail'] as const)
        .filter((key) => media[key])
        .map((key, i) => ({ id: `vin-h0${i + 1}`, media: media[key]! })),
      caption: l(HERO_CAPTION),
    },
    snapshot: { problem: l(SNAPSHOT.problem), role: l(SNAPSHOT.role), result: l(SNAPSHOT.result) },
    sections: vinSections(locale, media),
    meta: {
      title: l(META_TITLE),
      description: l(SUMMARY),
      ...(media.heroGoalChips ? { image: media.heroGoalChips } : {}),
    },
  }
}

/** Shared (non-localized) case-study fields, set once from the English pass. */
export const VIN_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  projectStatus: 'pre-launch',
  tools: ['Figma', 'Excel', 'Word'],
  period: { start: '2026-02-01T00:00:00.000Z', present: true },
}
