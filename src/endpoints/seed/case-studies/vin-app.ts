import type { Project } from '@/payload-types'

import { paragraph, prose, type TextDirection } from './lexical'
import type { MediaSpec, SeedLocale } from '../media'

/**
 * VIN — a connection-first networking app for Dubai's professional community. Every sentence
 * traces to `Docs/Experience/Projects/vin-app/README.md`; the project is pre-launch (design and
 * strategy work, audited against a running app built by a separate development team), so outcomes
 * are a mix of delivered design artifacts and a documented gap between the onboarding's promises
 * and the screens that exist. English is the source; Persian, Arabic and German are machine-drafted
 * twins flagged `translationReviewed: false` until a native review.
 *
 * Row ids are deterministic (`vin-s01`, `vin-d01` …) and identical in every locale payload, so
 * Payload merges each locale's copy into the same block rows instead of creating new ones.
 */
export const VIN_SLUG = 'vin-app'
export const VIN_ASSETS = 'Docs/Experience/Projects/vin-app/assets'
export const SEED_LOCALES: SeedLocale[] = ['en', 'fa', 'ar', 'de']

const DIRECTION: Record<SeedLocale, TextDirection> = { en: 'ltr', fa: 'rtl', ar: 'rtl', de: 'ltr' }

type L<T = string> = Record<SeedLocale, T>
const L = <T = string>(en: T, fa: T, ar: T, de: T): L<T> => ({ en, fa, ar, de })

// ── Media ──────────────────────────────────────────────────────────────────────────────────
// Filenames double as idempotency keys, prefixed so they never collide with another project's
// uploads. Chosen from the exported frames in `assets/` — the clean, representative screen per flow.
// One deliberate omission: onboarding slides 2–4 sit at 10% layer opacity in the Figma file and
// cannot be exported legibly, so the opener carries that chapter instead. The venue screens use a
// real coffee chain as placeholder branding; the figure caption says so rather than hiding it.

export const VIN_MEDIA = {
  heroGoalChips: {
    file: 'create-meetup/goal-chips.png',
    name: 'vin-app--create-meetup-goal-chips.png',
    alt: L(
      "VIN's meetup-creation opener: a chat bubble asking the goal of the meetup, with four intent chips including an honest 'just want to do an activity' escape hatch",
      'صفحهٔ آغازین ساخت میت‌آپ در وین: حباب گفت‌وگویی که هدف میت‌آپ را می‌پرسد، با چهار چیپ قصد از جمله گزینهٔ صادقانهٔ «فقط می‌خواهم فعالیتی انجام دهم»',
      'شاشة بدء إنشاء اللقاء في VIN: فقاعة محادثة تسأل عن هدف اللقاء، مع أربع رقائق نوايا من بينها خيار صريح «أريد فقط ممارسة نشاط»',
      'VIN-Einstieg zum Erstellen eines Meetups: eine Chat-Blase, die nach dem Ziel des Meetups fragt, mit vier Intent-Chips, darunter das ehrliche Fluchttor „Ich möchte nur eine Aktivität machen“',
    ),
  },
  heroVenueLanding: {
    file: 'sponsor/venue-landing.png',
    name: 'vin-app--sponsor-venue-landing.png',
    alt: L(
      "VIN Business landing page: 'Real Footfall, Real Revenue' headline over the four-step partner funnel — List Your Venue, Get Matched, Host & Activate, Measure & Grow",
      'صفحهٔ فرود VIN Business: تیتر «ترافیک واقعی، درآمد واقعی» روی قیف چهارمرحله‌ای شریک — ثبت مکان، تطبیق، میزبانی و فعال‌سازی، اندازه‌گیری و رشد',
      'صفحة هبوط VIN Business: عنوان «إقبال حقيقي، إيرادات حقيقية» فوق قمع الشريك المكوَّن من أربع خطوات — أدرج مكانك، طابِق، استضف وفعِّل، قِس ونمِّ',
      'VIN-Business-Landingpage: Überschrift „Echter Fußverkehr, echter Umsatz“ über dem vierstufigen Partner-Funnel — Venue listen, Match erhalten, Hosten & Aktivieren, Messen & Wachsen',
    ),
  },
  heroMeetupDetail: {
    file: 'meetup-detail/detail-default.png',
    name: 'vin-app--meetup-detail-default.png',
    alt: L(
      'A padel meetup detail screen: gallery, attendee roster, map, group chat and an ended-meetup state with a 12-person attendance count',
      'صفحهٔ جزئیات میت‌آپ پدل: گالری، فهرست شرکت‌کنندگان، نقشه، گفت‌وگوی گروهی و وضعیت پایان‌یافتهٔ میت‌آپ با شمار ۱۲ حاضر',
      'شاشة تفاصيل لقاء بادل: معرض، وقائمة الحضور، وخريطة، ودردشة جماعية، وحالة لقاء منتهٍ بعدد حضور 12 شخصًا',
      'Detailscreen eines Padel-Meetups: Galerie, Teilnehmerliste, Karte, Gruppenchat und ein beendeter Meetup-Status mit 12 Teilnehmenden',
    ),
  },
  dsColor: {
    file: 'design-system/color.png',
    name: 'vin-app--design-system-color.png',
    alt: L(
      "VIN's design-system color page: the phosphorescent accent ramp alongside gray, olive, green, red, orange, blue-purple, purple, blue and pink ramps, each in eleven steps",
      'صفحهٔ رنگ در سیستم طراحی وین: طیف رنگ فسفری شاخص در کنار طیف‌های خاکستری، زیتونی، سبز، قرمز، نارنجی، آبی‌بنفش، بنفش، آبی و صورتی، هرکدام در یازده پله',
      'صفحة الألوان في نظام تصميم VIN: تدرّج اللون الفسفوري المميز إلى جانب تدرّجات رمادي وزيتوني وأخضر وأحمر وبرتقالي وأزرق‌بنفسجي وبنفسجي وأزرق ووردي، كل منها بإحدى عشرة درجة',
      'VIN-Design-System-Farbseite: die phosphoreszierende Akzentrampe neben Grau-, Oliv-, Grün-, Rot-, Orange-, Blau-Lila-, Lila-, Blau- und Pink-Rampen, jede in elf Stufen',
    ),
  },
  dsTypography: {
    file: 'design-system/typography.png',
    name: 'vin-app--design-system-typography.png',
    alt: L(
      'VIN typography page: Hurme Geometric Sans 3 across 21 named styles — headings, subtitles, body and button text, each with its weight, size and line-height',
      'صفحهٔ تایپوگرافی وین: فونت Hurme Geometric Sans 3 در ۲۱ سبک نام‌گذاری‌شده — عنوان، زیرعنوان، متن و دکمه، هرکدام با وزن، اندازه و ارتفاع خط خود',
      'صفحة الطباعة في VIN: خط Hurme Geometric Sans 3 عبر 21 نمطًا مسمّى — عناوين، عناوين فرعية، نص أساسي وأزرار، لكل منها وزنه وحجمه وارتفاع سطره',
      'VIN-Typografieseite: Hurme Geometric Sans 3 über 21 benannte Stile — Überschriften, Untertitel, Fließtext und Buttons, jeweils mit Schriftschnitt, Größe und Zeilenhöhe',
    ),
  },
  dsCards: {
    file: 'design-system/cards.png',
    name: 'vin-app--design-system-cards.png',
    alt: L(
      'VIN card variants: meetup cards driven by Type (Upcoming/Past/Draft) and Save (True/False), plus people and meetup-gallery cards',
      'گونه‌های کارت در وین: کارت‌های میت‌آپ بر پایهٔ نوع (آینده/گذشته/پیش‌نویس) و ذخیره (بله/خیر)، به‌همراه کارت‌های افراد و گالری میت‌آپ',
      'أنماط بطاقات VIN: بطاقات اللقاءات المبنية على النوع (قادم/سابق/مسودة) والحفظ (نعم/لا)، إضافة إلى بطاقات الأشخاص ومعرض اللقاءات',
      'VIN-Kartenvarianten: Meetup-Karten gesteuert über Type (Upcoming/Past/Draft) und Save (True/False), dazu Personen- und Meetup-Galerie-Karten',
    ),
  },
  homeDefault: {
    file: 'home/home-default.png',
    name: 'vin-app--home-default.png',
    alt: L(
      "VIN's home feed: a greeting header, recommended meetups as two-up cards with the start time set in large phosphorescent type, category chips, people you may know, and a map section",
      'فید خانهٔ وین: سربرگ خوش‌آمد، میت‌آپ‌های پیشنهادی در کارت‌های دوتایی با زمان شروع در تایپ درشت فسفری، چیپ‌های دسته‌بندی، افرادی که شاید بشناسید، و بخش نقشه',
      'الصفحة الرئيسية في VIN: ترويسة ترحيب، ولقاءات مقترحة في بطاقات مزدوجة مع وقت البدء بخط فسفوري كبير، ورقائق التصنيفات، وأشخاص قد تعرفهم، وقسم الخريطة',
      'VIN-Home-Feed: Begrüßungsheader, empfohlene Meetups als zweispaltige Karten mit der Startzeit in großer phosphoreszierender Schrift, Kategorie-Chips, Personen, die du kennen könntest, und ein Kartenbereich',
    ),
  },
  tickets: {
    file: 'tickets/list-view.png',
    name: 'vin-app--tickets-list-view.png',
    alt: L(
      'The Tickets tab: the meetups a member has joined, each row carrying the time, the activity and the attendee count',
      'تب بلیت‌ها: میت‌آپ‌هایی که عضو به آن‌ها پیوسته، هر ردیف با زمان، فعالیت و شمار شرکت‌کنندگان',
      'تبويب التذاكر: اللقاءات التي انضم إليها العضو، وكل صف يحمل الوقت والنشاط وعدد الحاضرين',
      'Der Tickets-Tab: die Meetups, denen ein Mitglied beigetreten ist, jede Zeile mit Uhrzeit, Aktivität und Teilnehmerzahl',
    ),
  },
  chatSingle: {
    file: 'chat/single-chat.png',
    name: 'vin-app--chat-single-chat.png',
    alt: L(
      'A single chat thread inside VIN — the conversation layer that carries a meetup before and after it happens',
      'یک گفت‌وگوی تکی در وین — لایهٔ گفت‌وگویی که میت‌آپ را پیش و پس از برگزاری همراهی می‌کند',
      'محادثة مفردة داخل VIN — طبقة المحادثة التي تحمل اللقاء قبل انعقاده وبعده',
      'Ein einzelner Chat-Thread in VIN — die Konversationsebene, die ein Meetup davor und danach trägt',
    ),
  },
  activityMeets: {
    file: 'activity/meets.png',
    name: 'vin-app--activity-meets.png',
    alt: L(
      'The Activity tab, Meets segment: join requests, host decisions and meetup changes stacked as a reverse-chronological log',
      'تب فعالیت، بخش میت‌ها: درخواست‌های پیوستن، تصمیم‌های میزبان و تغییرهای میت‌آپ به‌صورت گزارشی معکوس‌زمانی',
      'تبويب النشاط، قسم اللقاءات: طلبات الانضمام وقرارات المضيف وتغييرات اللقاء مرتَّبة كسجل عكسي زمنيًا',
      'Der Activity-Tab, Segment „Meets“: Beitrittsanfragen, Host-Entscheidungen und Meetup-Änderungen als umgekehrt chronologisches Protokoll',
    ),
  },
  homeNoInternet: {
    file: 'home/home-no-internet.png',
    name: 'vin-app--home-no-internet.png',
    alt: L(
      "The offline state: 'No Internet Connection — VIN needs internet to work.' The tab bar stays in place, so the app never loses its frame",
      'وضعیت آفلاین: «اتصال اینترنت نیست — وین برای کار کردن به اینترنت نیاز دارد.» نوار تب سر جایش می‌ماند تا اپ هرگز قاب خود را از دست ندهد',
      'حالة انقطاع الشبكة: «لا يوجد اتصال بالإنترنت — يحتاج VIN إلى الإنترنت ليعمل.» يبقى شريط التبويب في مكانه، فلا يفقد التطبيق إطاره',
      'Der Offline-Zustand: „No Internet Connection — VIN braucht Internet.“ Die Tab-Bar bleibt stehen, damit die App ihren Rahmen nie verliert',
    ),
  },
  chatEmpty: {
    file: 'chat/empty.png',
    name: 'vin-app--chat-empty.png',
    alt: L(
      "The empty chat state: 'There is no message' under a Meetups segment, with an invitation to join a meetup",
      'حالت خالی گفت‌وگو: «پیامی نیست» زیر بخش میت‌آپ‌ها، با دعوت به پیوستن به یک میت‌آپ',
      'حالة الدردشة الفارغة: «لا توجد رسائل» تحت قسم اللقاءات، مع دعوة للانضمام إلى لقاء',
      'Der leere Chat-Zustand: „There is no message“ unter dem Segment „Meetups“, mit der Einladung, einem Meetup beizutreten',
    ),
  },
  cancelLastMinute: {
    file: 'meetup-detail/cancel-paid-last-minute.png',
    name: 'vin-app--meetup-cancel-paid-last-minute.png',
    alt: L(
      "One of four cancellation variants: cancelling a paid meetup inside 24 hours, stated plainly — 'This is within 24 hours — no refund available' — with the destructive action still offered",
      'یکی از چهار گونهٔ لغو: لغو میت‌آپ پولی در کمتر از ۲۴ ساعت، با بیان صریح «این در بازهٔ ۲۴ ساعت است — بازگشت وجه ندارد» و کنشِ ویرانگر همچنان در دسترس',
      'واحدة من أربع حالات إلغاء: إلغاء لقاء مدفوع خلال 24 ساعة، مذكورة بوضوح «هذا خلال 24 ساعة — لا يوجد استرداد»، مع إبقاء الإجراء المدمّر متاحًا',
      'Eine von vier Storno-Varianten: die Absage eines bezahlten Meetups innerhalb von 24 Stunden, klar benannt — „innerhalb von 24 Stunden, keine Rückerstattung“ — die destruktive Aktion bleibt verfügbar',
    ),
  },
  onboardingOpener: {
    file: 'onboarding/story-1-opener.png',
    name: 'vin-app--onboarding-opener.png',
    alt: L(
      "VIN's first onboarding slide, 'Meet Through Movement': 'Forget awkward networking events. Connect with professionals who share your passion for running, padel, yoga, or cycling.'",
      'نخستین اسلاید خوش‌آمدگویی وین، «از راه حرکت آشنا شو»: «رویدادهای شبکه‌سازیِ معذب را فراموش کن. با حرفه‌ای‌هایی آشنا شو که شور دویدن، پدل، یوگا یا دوچرخه‌سواری را با تو شریک‌اند.»',
      'أول شريحة ترحيب في VIN، «تعرَّف عبر الحركة»: «انسَ فعاليات التشبيك المحرجة. تواصل مع محترفين يشاركونك شغف الجري والبادل واليوغا والدراجات.»',
      'VINs erste Onboarding-Folie, „Meet Through Movement“: „Vergiss unangenehme Networking-Events. Triff Profis, die deine Leidenschaft für Laufen, Padel, Yoga oder Radfahren teilen.“',
    ),
  },
  meetupAttended: {
    file: 'meetup-detail/meetup-attended.png',
    name: 'vin-app--meetup-attended.png',
    alt: L(
      "'Meetup Attended' — the screen a member sees after a meetup ends: twelve people, each with a name and an industry line, and nothing that marks whether you actually met any of them",
      '«میت‌آپ حاضرشده» — صفحه‌ای که عضو پس از پایان میت‌آپ می‌بیند: دوازده نفر، هرکدام با نام و یک خط صنعت، و هیچ نشانه‌ای از اینکه واقعاً با کدام‌یک آشنا شده‌ای',
      '«اللقاء الذي حضرته» — الشاشة التي يراها العضو بعد انتهاء اللقاء: اثنا عشر شخصًا، لكل منهم اسم وسطر مجال عمل، ولا شيء يسجّل ما إذا كنت قد التقيت أيًّا منهم فعلًا',
      '„Meetup Attended“ — der Screen nach dem Ende eines Meetups: zwölf Personen mit Namen und Branchenzeile, und nichts, was festhält, ob man sie tatsächlich kennengelernt hat',
    ),
  },
  mutualConnections: {
    file: 'profile/mutual-connections.png',
    name: 'vin-app--profile-mutual-connections.png',
    alt: L(
      "'Mutual Connections' in the Profile section — the same twelve people, in the same order, under a different title",
      '«ارتباط‌های مشترک» در بخش پروفایل — همان دوازده نفر، به همان ترتیب، زیر عنوانی متفاوت',
      '«الصلات المشتركة» في قسم الملف الشخصي — الأشخاص الاثنا عشر أنفسهم، بالترتيب نفسه، تحت عنوان مختلف',
      '„Mutual Connections“ im Profilbereich — dieselben zwölf Personen, in derselben Reihenfolge, unter einem anderen Titel',
    ),
  },
  venueDetail: {
    file: 'sponsor/venue-detail.png',
    name: 'vin-app--sponsor-venue-detail.png',
    alt: L(
      "A partner venue's page inside VIN: cover photo and venue type, a one-line description, the meetups it is sponsoring, its location and distance, a gallery, and a 'Be my sponsor' button along the bottom. The venue is a real coffee chain standing in as placeholder content",
      'صفحهٔ یک مکان شریک در وین: عکس کاور و نوع مکان، توضیح یک‌خطی، میت‌آپ‌هایی که حمایت می‌کند، موقعیت و فاصله، گالری، و دکمهٔ «اسپانسر من باش» در پایین. مکان، یک برند واقعی قهوه است که نقش محتوای جایگزین را بازی می‌کند',
      'صفحة مكان شريك داخل VIN: صورة غلاف ونوع المكان، ووصف من سطر واحد، واللقاءات التي يرعاها، وموقعه والمسافة إليه، ومعرض صور، وزر «كن راعيًا لي» في الأسفل. المكان سلسلة قهوة حقيقية مستخدَمة كمحتوى بديل',
      'Die Seite eines Partner-Venues in VIN: Titelbild und Venue-Typ, eine Beschreibungszeile, die gesponserten Meetups, Standort und Entfernung, eine Galerie und unten ein „Be my sponsor“-Button. Das Venue ist eine reale Kaffeekette als Platzhalterinhalt',
    ),
  },
  sponsorBid: {
    file: 'sponsor/be-my-sponsor-bid.png',
    name: 'vin-app--sponsor-be-my-sponsor-bid.png',
    alt: L(
      "The 'Be my sponsor' request a host sends a venue: expected audience size, preferred date and time, activity type, sponsorship type, what the venue gets in return, and a free-text pitch above a Submit Request button",
      'درخواست «اسپانسر من باش» که میزبان برای مکان می‌فرستد: اندازهٔ تخمینی مخاطب، تاریخ و ساعت ترجیحی، نوع فعالیت، نوع حمایت، چیزی که مکان در ازای آن می‌گیرد، و یک متن آزاد بالای دکمهٔ ارسال درخواست',
      'طلب «كن راعيًا لي» الذي يرسله المضيف إلى المكان: الحجم المتوقع للحضور، والتاريخ والوقت المفضلان، ونوع النشاط، ونوع الرعاية، وما يحصل عليه المكان في المقابل، ونص حر فوق زر إرسال الطلب',
      'Die „Be my sponsor“-Anfrage, die ein Host an ein Venue schickt: erwartete Gruppengröße, Wunschdatum und -zeit, Aktivitätsart, Sponsoring-Art, was das Venue dafür bekommt, und ein Freitextfeld über dem Absenden-Button',
    ),
  },
} satisfies Record<string, MediaSpec>

export type VinMediaKey = keyof typeof VIN_MEDIA
export type VinMediaIds = Partial<Record<VinMediaKey, string>>

// ── Project fields ──────────────────────────────────────────────────────────────────────────

const TITLE = L(
  'VIN — Making Connections the Product, Not the Event',
  'وین — وقتی محصول، ارتباط است نه رویداد',
  'VIN — عندما يكون المنتج هو التواصل، لا الفعالية',
  'VIN — Wenn Verbindungen das Produkt sind, nicht das Event',
)

const COMPANY = L('Independent', 'مستقل', 'مستقل', 'Unabhängig')

const ROLE = L(
  'Product designer & strategist',
  'طراح محصول و استراتژیست',
  'مصمّم منتج واستراتيجي',
  'Produktdesigner & Stratege',
)

const SUMMARY = L(
  "A connection-first networking app for Dubai's professional community — a product brief, a 57-problem inventory with its own KPI dictionary, a brand architecture and a B2B venue-revenue layer, audited against the promises the product makes to its own users.",
  'یک اپلیکیشن شبکه‌سازیِ ارتباط‌محور برای جامعهٔ حرفه‌ای دبی — سند محصول، فهرست ۵۷ مسئله با واژه‌نامهٔ شاخص خودش، معماری برند و یک لایهٔ درآمدیِ B2B، که در برابر وعده‌های خودِ محصول به کاربرانش سنجیده شده است.',
  'تطبيق شبكة اجتماعية يضع التواصل أولًا لمجتمع دبي المهني — موجز منتج، وفهرس 57 مشكلة له قاموس مؤشرات أداء خاص، وهندسة علامة تجارية، وطبقة إيرادات B2B للأماكن، مُدقَّق في ضوء الوعود التي يقطعها المنتج لمستخدميه.',
  'Eine Connection-first-Networking-App für Dubais Berufscommunity — ein Produktbrief, ein Problem-Inventar mit 57 Einträgen samt eigenem KPI-Wörterbuch, eine Markenarchitektur und eine B2B-Venue-Umsatzebene, geprüft an den Versprechen, die das Produkt seinen eigenen Nutzern macht.',
)

const STATEMENT = L(
  "A connection-first networking app for Dubai, spec'd end-to-end — then audited against the promises its own onboarding makes.",
  'یک اپلیکیشن شبکه‌سازیِ ارتباط‌محور برای دبی که سرتاسر آن مشخص شده — و سپس در برابر وعده‌های خوش‌آمدگویی خودش سنجیده شده است.',
  'تطبيق شبكة اجتماعية يضع التواصل أولًا لدبي، مُحدَّد من البداية إلى النهاية — ثم مُدقَّق في ضوء الوعود التي يقطعها شريط الترحيب فيه نفسه.',
  'Eine Connection-first-Networking-App für Dubai, durchgängig spezifiziert — und dann an den Versprechen ihres eigenen Onboardings geprüft.',
)

const INDUSTRY = L(
  'Social · networking · Dubai',
  'اجتماعی · شبکه‌سازی · دبی',
  'اجتماعي · تواصل · دبي',
  'Social · Networking · Dubai',
)

const TEAM = L(
  'A separate development team built and shipped the running app and admin panel; Sina led product design and strategy.',
  'یک تیم توسعهٔ مستقل، اپ در حال اجرا و پنل مدیریت را ساخت و منتشر کرد؛ سینا لیدِ طراحی محصول و استراتژی بود.',
  'قام فريق تطوير مستقل ببناء وإطلاق التطبيق العامل ولوحة الإدارة؛ وقاد سينا تصميم المنتج والاستراتيجية.',
  'Ein separates Entwicklungsteam baute und veröffentlichte die laufende App und das Admin-Panel; Sina leitete Produktdesign und Strategie.',
)

const META_TITLE = L(
  'VIN — product strategy and design for a Dubai networking app',
  'وین — استراتژی و طراحی محصول برای یک اپ شبکه‌سازی در دبی',
  'VIN — استراتيجية وتصميم المنتج لتطبيق تواصل في دبي',
  'VIN — Produktstrategie und -design für eine Dubai-Networking-App',
)

const HERO_CAPTION = L(
  'Three of 120 screens: the chat-first creation flow, the venue-partner revenue layer, and a meetup in progress.',
  'سه نمونه از ۱۲۰ صفحه: جریان ساختِ چت‌محور، لایهٔ درآمدیِ شرکای مکان و یک میت‌آپ در جریان.',
  'ثلاث من 120 شاشة: تدفّق الإنشاء القائم على المحادثة، وطبقة إيرادات شركاء الأماكن، ولقاء قيد التنفيذ.',
  'Drei von 120 Screens: der Chat-first-Erstellungsflow, die Venue-Partner-Umsatzebene und ein laufendes Meetup.',
)

const SNAPSHOT = {
  problem: L(
    'Event-discovery apps optimise for ticket sales; social apps optimise for time spent. Neither is the right shape for someone who needs five useful conversations, not another feed.',
    'اپ‌های کشف رویداد برای فروش بلیت بهینه‌سازی می‌شوند؛ اپ‌های اجتماعی برای زمان صرف‌شده. هیچ‌کدام برای کسی که به پنج گفت‌وگوی مفید نیاز دارد نه یک فید دیگر، فرم درستی نیستند.',
    'تُحسَّن تطبيقات اكتشاف الفعاليات لبيع التذاكر؛ وتُحسَّن التطبيقات الاجتماعية للوقت المُستغرَق. لا يناسب أيّ منهما شخصًا يحتاج خمس محادثات مفيدة، لا موجزًا إضافيًا.',
    'Event-Discovery-Apps optimieren auf Ticketverkäufe; soziale Apps auf verbrachte Zeit. Keines von beidem ist die richtige Form für jemanden, der fünf nützliche Gespräche braucht, nicht einen weiteren Feed.',
  ),
  role: L(
    'Product design and strategy lead: the brief, the problem inventory and KPI model, the mobile UI and design system, the brand architecture and the B2B venue layer — alongside a separate development team.',
    'لیدِ طراحی محصول و استراتژی: سند محصول، فهرست مسئله‌ها و مدل شاخص، رابط موبایل و سیستم طراحی، معماری برند و لایهٔ B2B — در کنار یک تیم توسعهٔ مستقل.',
    'قيادة تصميم المنتج والاستراتيجية: الموجز، وفهرس المشكلات ونموذج المؤشرات، وواجهة الهاتف ونظام التصميم، وهندسة العلامة التجارية وطبقة B2B — إلى جانب فريق تطوير مستقل.',
    'Lead für Produktdesign und Strategie: der Brief, das Problem-Inventar und KPI-Modell, das Mobile-UI und Design-System, die Markenarchitektur und die B2B-Venue-Ebene — neben einem separaten Entwicklungsteam.',
  ),
  result: L(
    '120 screens on a documented system, a 57-problem inventory and a locked cultural-rules instrument — audited against itself: two of four onboarding promises still have no screen.',
    '۱۲۰ صفحه روی یک سیستم مستند، فهرست ۵۷ مسئله و ابزاری از قواعد فرهنگیِ قفل‌شده — در برابر خودش سنجیده شده: دو از چهار وعدهٔ خوش‌آمدگویی هنوز صفحه‌ای ندارند.',
    '120 شاشة على نظام موثّق، وفهرس 57 مشكلة، وأداة قواعد ثقافية مُقفَلة — مُدقَّقة في ضوء نفسها: اثنان من أربعة وعود ترحيبية ما زالا بلا شاشة.',
    '120 Screens auf einem dokumentierten System, ein 57-Probleme-Inventar und ein verriegeltes Instrument kultureller Regeln — an sich selbst geprüft: Zwei von vier Onboarding-Versprechen haben noch keinen Screen.',
  ),
}

// ── Sections ────────────────────────────────────────────────────────────────────────────────

type Sections = NonNullable<Project['sections']>

/** The block narrative for one locale, with the same row ids in every locale. */
export function vinSections(locale: SeedLocale, media: VinMediaIds): Sections {
  const l = <T>(value: L<T>): T => value[locale]
  const dir = DIRECTION[locale]
  const p = (value: L) => paragraph(l(value), dir)
  // A localized leaf inside an array is keyed by row position, so a row that used to carry a
  // caption keeps it unless the seed writes one — pass NO_CAPTION to clear it.
  const item = (key: VinMediaKey, id: string, caption?: L) =>
    media[key] ? [{ id, media: media[key]!, ...(caption ? { caption: l(caption) } : {}) }] : []

  return [
    {
      id: 'vin-s01',
      blockType: 'csNarrative',
      label: 'context',
      heading: l(
        L(
          'Events are not the product. Connections are.',
          'رویداد محصول نیست. ارتباط محصول است.',
          'الفعالية ليست المنتج. التواصل هو المنتج.',
          'Events sind nicht das Produkt. Verbindungen sind es.',
        ),
      ),
      body: prose(
        dir,
        p(
          L(
            "VIN — operated by Viwin L.L.C-FZ out of Meydan Free Zone, Dubai — is a connection-first networking platform for the city's professional community. A traditional event app reads browse events, then maybe connect, with success measured in tickets sold. VIN reads set a connection goal, get an AI-suggested event path, attend, then log the connection.",
            'وین — که زیر نظر Viwin L.L.C-FZ در Meydan Free Zone دبی اداره می‌شود — پلتفرمی شبکه‌سازیِ ارتباط‌محور برای جامعهٔ حرفه‌ای این شهر است. یک اپ رویدادِ سنتی این‌طور خوانده می‌شود: مرور رویدادها، شاید ارتباط — و موفقیت با بلیت فروخته‌شده سنجیده می‌شود. وین این‌طور خوانده می‌شود: تعیین هدف ارتباطی، دریافت مسیر رویداد پیشنهادیِ هوش مصنوعی، حضور، سپس ثبت ارتباط.',
            'وين — التي تديرها Viwin L.L.C-FZ من منطقة ميدان الحرة في دبي — منصّة شبكة اجتماعية تضع التواصل أولًا لمجتمع المدينة المهني. يُقرأ تطبيق فعاليات تقليدي كالتالي: تصفّح الفعاليات، ثم ربما التواصل، والنجاح يُقاس بالتذاكر المباعة. أما وين فتُقرأ كالتالي: حدِّد هدف تواصل، احصل على مسار فعالية يقترحه الذكاء الاصطناعي، احضر، ثم سجِّل التواصل.',
            'VIN — betrieben von Viwin L.L.C-FZ aus der Meydan Free Zone, Dubai — ist eine Connection-first-Networking-Plattform für die Berufscommunity der Stadt. Eine klassische Event-App liest sich als Events durchsuchen, dann vielleicht verbinden, mit Erfolg gemessen in verkauften Tickets. VIN liest sich als Verbindungsziel setzen, einen KI-vorgeschlagenen Event-Pfad erhalten, teilnehmen, dann die Verbindung protokollieren.',
          ),
        ),
        p(
          L(
            "The brief's north star is the Connection Logging Rate, targeted at 40%+ — explicitly not attendance, not app opens, not profile views. Dubai is the reason it works this way: high expat turnover, and networking that happens through activity — running clubs, padel, cycling — rather than conference halls.",
            'شاخص شمال‌نمای سند محصول نرخ ثبت ارتباط است، با هدف ۴۰٪ به بالا — به‌صراحت نه حضور، نه بازکردن اپ، نه بازدید پروفایل. دلیل این شکل، دبی است: جابه‌جاییِ بالای مهاجران، و شبکه‌سازی‌ای که از دل فعالیت می‌گذرد — باشگاه دو، پدل، دوچرخه‌سواری — نه سالن‌های کنفرانس.',
            'المقياس الشمالي في الموجز هو معدّل تسجيل التواصل، بهدف 40٪ فأعلى — وليس صراحةً الحضور، ولا فتح التطبيق، ولا مشاهدات الملف الشخصي. سبب هذا الشكل هو دبي: معدّل دوران مرتفع للمغتربين، وتواصل يحدث عبر النشاط — نوادي الجري، البادل، ركوب الدراجات — لا في قاعات المؤتمرات.',
            'Der Nordstern des Briefs ist die Connection Logging Rate, mit einem Ziel von 40%+ — ausdrücklich nicht Teilnahme, nicht App-Öffnungen, nicht Profilaufrufe. Dubai ist der Grund für diese Form: hohe Expat-Fluktuation und Networking, das über Aktivität stattfindet — Lauf­clubs, Padel, Radfahren — statt in Konferenzsälen.',
          ),
        ),
      ),
      insight: l(
        L(
          'Events are not the product. Connections are the product. Events are the medium.',
          'رویداد محصول نیست. ارتباط محصول است. رویداد رسانه است.',
          'الفعالية ليست المنتج. التواصل هو المنتج. الفعالية هي الوسيلة.',
          'Events sind nicht das Produkt. Verbindungen sind das Produkt. Events sind das Medium.',
        ),
      ),
    },
    {
      id: 'vin-s02',
      blockType: 'csFinding',
      kind: 'quote',
      text: l(
        L(
          'Events are not the product. Connections are the product. Events are the medium.',
          'رویداد محصول نیست. ارتباط محصول است. رویداد رسانه است.',
          'الفعالية ليست المنتج. التواصل هو المنتج. الفعالية هي الوسيلة.',
          'Events sind nicht das Produkt. Verbindungen sind das Produkt. Events sind das Medium.',
        ),
      ),
      attribution: l(L('VIN product brief', 'سند محصول وین', 'موجز منتج VIN', 'VIN-Produktbrief')),
    },
    {
      id: 'vin-s03',
      blockType: 'csNarrative',
      label: 'problem',
      heading: l(
        L(
          'Not another event app, and not a casino playbook.',
          'نه یک اپ رویداد دیگر، نه راهبرد کازینو.',
          'ليس تطبيق فعاليات آخر، ولا كتيّب لعب كازينو.',
          'Keine weitere Event-App, kein Casino-Playbook.',
        ),
      ),
      body: prose(
        dir,
        p(
          L(
            'Event-discovery apps optimise for ticket sales, so they succeed whether or not anything came of the event. Social platforms optimise for time spent, importing infinite scroll and vanity metrics. Both are the wrong shape for someone who moved to Dubai three months ago and needs five useful conversations.',
            'اپ‌های کشف رویداد برای فروش بلیت بهینه می‌شوند، پس موفق‌اند چه از رویداد چیزی حاصل شود چه نشود. پلتفرم‌های اجتماعی برای زمان صرف‌شده بهینه می‌شوند و اسکرول بی‌پایان و شاخص‌های نمایشی را با خود می‌آورند. هیچ‌کدام برای کسی که سه ماه پیش به دبی آمده و به پنج گفت‌وگوی مفید نیاز دارد فرم درستی نیستند.',
            'تُحسَّن تطبيقات اكتشاف الفعاليات لبيع التذاكر، فتنجح سواء نتج عن الفعالية شيء أم لا. أما المنصّات الاجتماعية فتُحسَّن للوقت المُستغرَق، فتستورد التمرير اللانهائي ومقاييس الاستعراض. كلاهما شكل خاطئ لشخص انتقل إلى دبي قبل ثلاثة أشهر ويحتاج خمس محادثات مفيدة.',
            'Event-Discovery-Apps optimieren auf Ticketverkäufe, sie sind also erfolgreich, egal ob aus dem Event etwas wurde. Soziale Plattformen optimieren auf verbrachte Zeit und importieren Endlos-Scroll und Vanity-Metriken. Beides ist die falsche Form für jemanden, der vor drei Monaten nach Dubai gezogen ist und fünf nützliche Gespräche braucht.',
          ),
        ),
        p(
          L(
            "The product's own anti-definition is blunt about it: not another event-discovery app, not a social platform, not a dating app, not a matchmaking service, not a ticketing system.",
            'ضدتعریف خودِ محصول در این باره صریح است: نه یک اپ کشف رویداد دیگر، نه پلتفرم اجتماعی، نه اپ دوستیابی، نه سرویس همتایابی، نه سیستم فروش بلیت.',
            'التعريف المضاد الخاص بالمنتج صريح في هذا: ليس تطبيق اكتشاف فعاليات آخر، ولا منصّة اجتماعية، ولا تطبيق مواعدة، ولا خدمة مطابقة، ولا نظام تذاكر.',
            'Die eigene Anti-Definition des Produkts ist unverblümt: keine weitere Event-Discovery-App, keine soziale Plattform, keine Dating-App, kein Matchmaking-Dienst, kein Ticketing-System.',
          ),
        ),
      ),
    },
    {
      id: 'vin-s04',
      blockType: 'csNarrative',
      label: 'constraints',
      heading: l(
        L(
          'Nine non-negotiable rules, before a single screen.',
          'نه قاعدهٔ غیرقابل‌مذاکره، پیش از یک صفحه.',
          'تسع قواعد غير قابلة للتفاوض، قبل أي شاشة واحدة.',
          'Neun nicht verhandelbare Regeln, vor einem einzigen Screen.',
        ),
      ),
      body: prose(
        dir,
        p(
          L(
            'Several engagement patterns that work elsewhere are culturally wrong here — public leaderboards and competitive framing among them. The brief carries a long section on cultural considerations for Dubai: Ramadan scheduling, gender dynamics, alcohol, Arabic RTL support, and a three-phase cultural launch moving from expat professional to broader expat to Emirati integration.',
            'چند الگوی تعامل که جاهای دیگر کار می‌کند، اینجا از نظر فرهنگی نادرست است — از جمله جدول رده‌بندی عمومی و قاب‌بندی رقابتی. سند محصول بخشی طولانی دربارهٔ ملاحظات فرهنگیِ دبی دارد: زمان‌بندی رمضان، پویایی جنسیتی، الکل، پشتیبانی راست‌به‌چپِ عربی، و راه‌اندازیِ سه‌مرحله‌ایِ فرهنگی از حرفه‌ای مهاجر تا مهاجران گسترده‌تر تا ادغام اماراتی.',
            'بعض أنماط التفاعل التي تنجح في أماكن أخرى خاطئة ثقافيًا هنا — من بينها لوحات الصدارة العامة والصياغة التنافسية. يحمل الموجز قسمًا طويلًا عن الاعتبارات الثقافية لدبي: توقيت رمضان، وديناميكيات الجندر، والكحول، ودعم العربية من اليمين إلى اليسار، وإطلاق ثقافي من ثلاث مراحل ينتقل من المغترب المهني إلى المغتربين عمومًا إلى الاندماج الإماراتي.',
            'Mehrere Engagement-Muster, die anderswo funktionieren, sind hier kulturell falsch — öffentliche Ranglisten und Wettbewerbs-Framing darunter. Der Brief enthält einen langen Abschnitt zu kulturellen Erwägungen für Dubai: Ramadan-Terminierung, Geschlechterdynamik, Alkohol, arabische RTL-Unterstützung, und ein dreiphasiger kultureller Launch vom Expat-Professional über breitere Expats bis zur emiratischen Integration.',
          ),
        ),
        p(
          L(
            'The process that produced VIN was later codified into a reusable design-and-audit protocol, with nine non-negotiable Dubai cultural rules and a locked table of intentional design decisions, each carrying its own reason.',
            'فرایندی که وین را تولید کرد، بعدتر به یک پروتکل طراحی-و-ممیزیِ قابل‌استفادهٔ مجدد تبدیل شد، با نه قاعدهٔ فرهنگیِ دبی و جدولی قفل‌شده از تصمیم‌های طراحیِ عامدانه، هرکدام با دلیل خودش.',
            'تحوّلت العملية التي أنتجت وين لاحقًا إلى بروتوكول تصميم وتدقيق قابل لإعادة الاستخدام، يضم تسع قواعد ثقافية غير قابلة للتفاوض لدبي وجدولًا مُقفَلًا من قرارات التصميم المتعمَّدة، لكل منها سببها الخاص.',
            'Der Prozess, der VIN hervorbrachte, wurde später zu einem wiederverwendbaren Design-und-Audit-Protokoll kodifiziert, mit neun nicht verhandelbaren Dubai-Kulturregeln und einer verriegelten Tabelle bewusster Designentscheidungen, jede mit eigener Begründung.',
          ),
        ),
      ),
    },
    {
      id: 'vin-s05',
      blockType: 'csOwnership',
      intro: l(
        L(
          'Product design and strategy, working alongside a separate development team that built and shipped the running app and the admin panel.',
          'طراحی و استراتژیِ محصول، در کنار یک تیم توسعهٔ مستقل که اپ در حال اجرا و پنل مدیریت را ساخت و منتشر کرد.',
          'تصميم المنتج والاستراتيجية، بالتعاون مع فريق تطوير مستقل قام ببناء وإطلاق التطبيق العامل ولوحة الإدارة.',
          'Produktdesign und -strategie, zusammen mit einem separaten Entwicklungsteam, das die laufende App und das Admin-Panel gebaut und veröffentlicht hat.',
        ),
      ),
      own: l(
        L(
          [
            'The product brief, the problem inventory and the KPI model',
            'The mobile UI and its design system',
            'The brand and naming architecture',
            'The B2B venue layer and its go-to-market copy',
            'A QA review of the built app and a function scan of the admin panel',
          ],
          [
            'سند محصول، فهرست مسئله‌ها و مدل شاخص‌ها',
            'رابط کاربری موبایل و سیستم طراحی آن',
            'معماری برند و نام‌گذاری',
            'لایهٔ B2B مکان‌ها و متن ورود به بازار آن',
            'بازبینی کیفیت اپِ ساخته‌شده و اسکن عملکردیِ پنل مدیریت',
          ],
          [
            'موجز المنتج، وفهرس المشكلات، ونموذج المؤشرات',
            'واجهة الهاتف ونظام التصميم الخاص بها',
            'هندسة العلامة التجارية والتسمية',
            'طبقة B2B للأماكن ونصوصها التسويقية لدخول السوق',
            'مراجعة جودة للتطبيق المبني ومسح وظيفي للوحة الإدارة',
          ],
          [
            'Der Produktbrief, das Problem-Inventar und das KPI-Modell',
            'Das Mobile-UI und sein Design-System',
            'Die Marken- und Namensarchitektur',
            'Die B2B-Venue-Ebene und ihre Go-to-Market-Texte',
            'Eine QA-Prüfung der gebauten App und ein Funktionsscan des Admin-Panels',
          ],
        ),
      ),
      collaborate: l(
        L(
          [
            'A separate development team that built and shipped the running app and the admin panel at admin.viwin.link',
          ],
          [
            'یک تیم توسعهٔ مستقل که اپ در حال اجرا و پنل مدیریت را در admin.viwin.link ساخت و منتشر کرد',
          ],
          ['فريق تطوير مستقل قام ببناء وإطلاق التطبيق العامل ولوحة الإدارة على admin.viwin.link'],
          [
            'Ein separates Entwicklungsteam, das die laufende App und das Admin-Panel unter admin.viwin.link gebaut und veröffentlicht hat',
          ],
        ),
      ),
      note: l(
        L(
          "The brief documents the design and strategy work in detail; it doesn't specify the exact split of implementation decisions with the development team, so ownership here is limited to what's documented.",
          'سند محصول کار طراحی و استراتژی را با جزئیات مستند می‌کند؛ تفکیک دقیق تصمیم‌های پیاده‌سازی با تیم توسعه را مشخص نمی‌کند، پس مالکیت در اینجا به آنچه مستند شده محدود است.',
          'يوثّق الموجز عمل التصميم والاستراتيجية بالتفصيل؛ لكنه لا يحدّد التقسيم الدقيق لقرارات التنفيذ مع فريق التطوير، لذا تقتصر الملكية هنا على ما هو موثّق.',
          'Der Brief dokumentiert die Design- und Strategiearbeit im Detail; er spezifiziert nicht die genaue Aufteilung der Implementierungsentscheidungen mit dem Entwicklungsteam, daher beschränkt sich die Zuordnung hier auf das Dokumentierte.',
        ),
      ),
    },
    {
      id: 'vin-s06',
      blockType: 'csProcess',
      kind: 'process',
      heading: l(
        L(
          'Six layers, each producing an artifact the next one used.',
          'شش لایه، هرکدام محصولی می‌سازد که لایهٔ بعدی از آن استفاده می‌کند.',
          'ست طبقات، تُنتج كل منها ناتجًا تستخدمه الطبقة التالية.',
          'Sechs Ebenen, jede erzeugt ein Artefakt, das die nächste nutzt.',
        ),
      ),
      steps: [
        {
          id: 'vin-p01',
          code: '01',
          label: l(L('Brief', 'سند محصول', 'الموجز', 'Brief')),
          note: l(
            L(
              '3,716 lines: philosophy, three named personas, seven core flows, ten design principles',
              '۳٬۷۱۶ خط: فلسفه، سه پرسونای نام‌دار، هفت جریان اصلی، ده اصل طراحی',
              '3,716 سطرًا: فلسفة، وثلاث شخصيات مسمّاة، وسبعة تدفقات أساسية، وعشرة مبادئ تصميم',
              '3.716 Zeilen: Philosophie, drei benannte Personas, sieben Kernflüsse, zehn Designprinzipien',
            ),
          ),
        },
        {
          id: 'vin-p02',
          code: '02',
          label: l(L('Inventory', 'فهرست مسئله', 'الفهرس', 'Inventar')),
          note: l(
            L(
              '57 problems across five difficulty tiers, an 8-sheet workbook',
              '۵۷ مسئله در پنج ردهٔ دشواری، یک کارپوشهٔ ۸برگه',
              '57 مشكلة عبر خمس مستويات صعوبة، وكتاب عمل من 8 أوراق',
              '57 Probleme über fünf Schwierigkeitsstufen, ein 8-Blatt-Arbeitsheft',
            ),
          ),
        },
        {
          id: 'vin-p03',
          code: '03',
          label: l(L('KPIs', 'شاخص‌ها', 'مؤشرات الأداء', 'KPIs')),
          note: l(
            L(
              "20 KPIs across nine domains — seven of them guardrails against growth's own damage",
              '۲۰ شاخص در نه حوزه — هفت‌تای آن‌ها نرده‌محافظ در برابر آسیب خودِ رشدند',
              '20 مؤشرًا عبر تسعة مجالات — سبعة منها حواجز أمان ضد الضرر الذي قد يُحدثه النمو نفسه',
              '20 KPIs über neun Domänen — sieben davon Leitplanken gegen den Schaden des Wachstums selbst',
            ),
          ),
        },
        {
          id: 'vin-p04',
          code: '04',
          label: l(L('UI', 'رابط کاربری', 'الواجهة', 'UI')),
          note: l(
            L(
              '120 screens across 11 sections, on a documented design system',
              '۱۲۰ صفحه در ۱۱ بخش، روی یک سیستم طراحی مستند',
              '120 شاشة عبر 11 قسمًا، على نظام تصميم موثّق',
              '120 Screens über 11 Bereiche, auf einem dokumentierten Design-System',
            ),
          ),
        },
        {
          id: 'vin-p05',
          code: '05',
          label: l(L('Brand', 'برند', 'العلامة التجارية', 'Marke')),
          note: l(
            L(
              "A naming architecture that retires 'Meetup' and 'Event' as vocabulary",
              'معماری نام‌گذاری‌ای که واژه‌های «میت‌آپ» و «رویداد» را بازنشسته می‌کند',
              'هندسة تسمية تُقاعد مصطلحي "Meetup" و"Event"',
              'Eine Namensarchitektur, die „Meetup“ und „Event“ als Vokabular ausmustert',
            ),
          ),
        },
        {
          id: 'vin-p06',
          code: '06',
          label: l(L('GTM & QA', 'ورود به بازار و کیفیت', 'دخول السوق والجودة', 'GTM & QA')),
          note: l(
            L(
              'An ASO pack, plus a dated QA review of the built app and admin panel',
              'یک بستهٔ ASO، به‌همراه بازبینی کیفیتِ تاریخ‌دار از اپ ساخته‌شده و پنل مدیریت',
              'حزمة ASO، إضافة إلى مراجعة جودة مؤرَّخة للتطبيق المبني ولوحة الإدارة',
              'Ein ASO-Paket, plus eine datierte QA-Prüfung der gebauten App und des Admin-Panels',
            ),
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
        L(
          'One tab each: the home feed, tickets, chat and the activity log. Four of eleven sections — 120 screens sit behind them, on one component system.',
          'هر تب یکی: فید خانه، بلیت‌ها، گفت‌وگو و گزارش فعالیت. چهار بخش از یازده بخش — ۱۲۰ صفحه پشت آن‌ها، روی یک سیستم کامپوننت.',
          'تبويب لكل واحدة: الصفحة الرئيسية، والتذاكر، والدردشة، وسجل النشاط. أربعة من أحد عشر قسمًا — خلفها 120 شاشة على نظام مكوّنات واحد.',
          'Je ein Tab: Home-Feed, Tickets, Chat und das Aktivitätsprotokoll. Vier von elf Sektionen — dahinter liegen 120 Screens auf einem Komponentensystem.',
        ),
      ),
    },
    {
      id: 'vin-s07',
      blockType: 'csNarrative',
      label: 'approach',
      heading: l(
        L(
          'Eleven sections, 120 screens, one documented system.',
          'یازده بخش، ۱۲۰ صفحه، یک سیستم مستند.',
          'أحد عشر قسمًا، 120 شاشة، نظام موثّق واحد.',
          'Elf Bereiche, 120 Screens, ein dokumentiertes System.',
        ),
      ),
      body: prose(
        dir,
        p(
          L(
            'One App canvas holds the whole product — 17,589 nodes across 11 Figma sections: Profile (27 screens), Meet up Detail (23, including four cancellation variants), Sponser (19, the B2B venue layer), Chat (13), the Final Wizard (11), Home (7), and six smaller flows.',
            'یک بوم App کل محصول را در خود دارد — ۱۷٬۵۸۹ گره در ۱۱ بخش فیگما: پروفایل (۲۷ صفحه)، جزئیات میت‌آپ (۲۳، شامل چهار گونهٔ لغو)، Sponser (۱۹، لایهٔ B2B مکان‌ها)، گفت‌وگو (۱۳)، ویزارد نهایی (۱۱)، خانه (۷)، و شش جریان کوچک‌تر.',
            'يحمل لوح App واحد المنتج كله — 17,589 عقدة عبر 11 قسمًا في Figma: الملف الشخصي (27 شاشة)، تفاصيل اللقاء (23، بما فيها أربعة أنماط إلغاء)، Sponser (19، طبقة B2B للأماكن)، الدردشة (13)، المعالج النهائي (11)، الرئيسية (7)، وستة تدفقات أصغر.',
            'Eine App-Canvas hält das gesamte Produkt — 17.589 Nodes über 11 Figma-Bereiche: Profile (27 Screens), Meet-up-Detail (23, inklusive vier Storno-Varianten), Sponser (19, die B2B-Venue-Ebene), Chat (13), der Final Wizard (11), Home (7) und sechs kleinere Flows.',
          ),
        ),
        p(
          L(
            'The design system runs on #1d2b3b with a phosphorescent #daed00 accent and Hurme Geometric Sans 3 — 21 named type styles and a deliberate radius system: 20px cards, 48px pill CTAs, 30px category chips, 32px tab bar. Cards are properly variant-driven, not duplicated per state.',
            'سیستم طراحی روی #1d2b3b با شاخصِ فسفریِ #daed00 و فونت Hurme Geometric Sans 3 کار می‌کند — ۲۱ سبک نام‌دار و سیستم شعاعی عامدانه: کارت‌های ۲۰پیکسل، دکمه‌های قرصیِ ۴۸پیکسل، چیپ‌های دسته‌بندیِ ۳۰پیکسل، نوار تب ۳۲پیکسل. کارت‌ها به‌درستی گونه‌محورند، نه تکراری برای هر وضعیت.',
            'يعمل نظام التصميم على #1d2b3b بلمسة فسفورية #daed00 وخط Hurme Geometric Sans 3 — 21 نمط نص مسمّى ونظام انحناء متعمَّد: بطاقات 20 بكسل، وأزرار حبوب 48 بكسل، وشرائح تصنيف 30 بكسل، وشريط تبويب 32 بكسل. البطاقات مبنية بشكل صحيح على الأنماط، لا مكررة لكل حالة.',
            'Das Design-System läuft auf #1d2b3b mit einem phosphoreszierenden #daed00-Akzent und Hurme Geometric Sans 3 — 21 benannte Typenstile und ein bewusstes Radius-System: 20px-Karten, 48px-Pill-CTAs, 30px-Kategorie-Chips, 32px-Tableiste. Karten sind sauber variantengetrieben, nicht pro Zustand dupliziert.',
          ),
        ),
      ),
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
        L(
          'Three of twelve component groups — 221 component nodes on their own design-system page, versioned independently of the app canvas.',
          'سه نمونه از دوازده گروه کامپوننت — ۲۲۱ گرهٔ کامپوننت روی صفحهٔ مستقل سیستم طراحی، با نسخه‌بندیِ مستقل از بوم اپ.',
          'ثلاث من اثنتي عشرة مجموعة مكوّنات — 221 عقدة مكوّن على صفحة نظام التصميم الخاصة بها، بترقيم إصدارات مستقل عن لوح التطبيق.',
          'Drei von zwölf Komponentengruppen — 221 Komponenten-Nodes auf einer eigenen Design-System-Seite, unabhängig von der App-Canvas versioniert.',
        ),
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
        L(
          'The states a spec gets judged by: an offline screen that keeps the tab bar in place, an empty chat that points back at joining a meetup, and cancelling a paid meetup inside 24 hours — one of four cancellation variants, each with its own refund sentence.',
          'حالت‌هایی که یک اسپک با آن‌ها سنجیده می‌شود: صفحهٔ آفلاین که نوار تب را سر جایش نگه می‌دارد، گفت‌وگوی خالی که به پیوستن به میت‌آپ بازمی‌گرداند، و لغو میت‌آپ پولی در کمتر از ۲۴ ساعت — یکی از چهار گونهٔ لغو، هرکدام با جملهٔ بازگشت وجه خودش.',
          'الحالات التي يُحكم بها على المواصفة: شاشة دون اتصال تُبقي شريط التبويب في مكانه، ودردشة فارغة تعيدك إلى الانضمام للقاء، وإلغاء لقاء مدفوع خلال 24 ساعة — واحدة من أربع حالات إلغاء، لكل منها جملتها عن الاسترداد.',
          'Die Zustände, an denen eine Spezifikation gemessen wird: ein Offline-Screen, der die Tab-Bar behält, ein leerer Chat, der auf das Beitreten zurückverweist, und die Absage eines bezahlten Meetups innerhalb von 24 Stunden — eine von vier Storno-Varianten, jede mit ihrem eigenen Erstattungssatz.',
        ),
      ),
    },
    {
      id: 'vin-s09',
      blockType: 'csNarrative',
      label: 'solution',
      heading: l(
        L(
          'The thesis sits in the first screen of the most-used flow.',
          'فرضیهٔ اصلی در اولین صفحهٔ پرکاربردترین جریان نشسته است.',
          'الفرضية الأساسية تقبع في الشاشة الأولى لأكثر التدفقات استخدامًا.',
          'Die These sitzt im ersten Screen des meistgenutzten Flows.',
        ),
      ),
      body: prose(
        dir,
        p(
          L(
            "Meetup creation opens as a conversation, not a form: 'Hi Sina, what is your goal of Create a Meet up?' — with four intents, the fourth an honest escape hatch for people who don't want the strategy layer at all: meet new people, analyse my network, strengthen existing connections, or just do an activity.",
            'ساخت میت‌آپ به‌جای فرم، مثل یک گفت‌وگو باز می‌شود: «سلام سینا، هدفت از ساخت میت‌آپ چیست؟» — با چهار قصد، که چهارمی‌شان دریچهٔ صادقانه‌ای است برای کسانی که اصلاً لایهٔ استراتژی را نمی‌خواهند: آشنایی با افراد جدید، تحلیل شبکه‌ام، تقویت ارتباط‌های موجود، یا فقط انجام یک فعالیت.',
            'يُفتح إنشاء اللقاء كمحادثة، لا كنموذج: «مرحبًا سينا، ما هدفك من إنشاء لقاء؟» — بأربع نوايا، رابعتها منفذ صريح لمن لا يريدون طبقة الاستراتيجية إطلاقًا: التعرّف على أشخاص جدد، تحليل شبكتي، تعزيز التواصلات القائمة، أو فقط ممارسة نشاط.',
            'Die Meetup-Erstellung öffnet als Gespräch, nicht als Formular: „Hi Sina, was ist dein Ziel beim Erstellen eines Meetups?“ — mit vier Intents, der vierte ein ehrliches Fluchttor für alle, die die Strategieebene gar nicht wollen: neue Leute treffen, mein Netzwerk analysieren, bestehende Verbindungen stärken, oder einfach eine Aktivität machen.',
          ),
        ),
        p(
          L(
            "Behind it sit four entry modes as a segment control — chat, interest, discovery, recent — and a composer labelled 'Create a Meetup with AI'.",
            'پشت آن چهار حالت ورود به‌صورت کنترل بخش‌بندی‌شده قرار دارد — گفت‌وگو، علاقه‌مندی، کشف، اخیر — و یک نگارنده با برچسب «ساخت میت‌آپ با هوش مصنوعی».',
            'خلفها أربعة أنماط دخول على هيئة عنصر تحكم مقسَّم — الدردشة، الاهتمام، الاكتشاف، الأخير — ومُحرِّر يحمل تسمية «أنشئ لقاءً بالذكاء الاصطناعي».',
            'Dahinter liegen vier Einstiegsmodi als Segment-Control — Chat, Interesse, Entdeckung, Kürzlich — und ein Composer mit der Beschriftung „Meetup mit KI erstellen“.',
          ),
        ),
      ),
      insight: l(
        L(
          "The fourth option — 'just want to do an activity' — is the product being honest about the users who don't want its thesis.",
          'گزینهٔ چهارم — «فقط می‌خواهم فعالیتی انجام دهم» — صداقتِ محصول است دربارهٔ کاربرانی که فرضیه‌اش را نمی‌خواهند.',
          'الخيار الرابع — «أريد فقط ممارسة نشاط» — هو صدق المنتج مع المستخدمين الذين لا يريدون فرضيته.',
          'Die vierte Option — „einfach eine Aktivität machen“ — ist das Produkt, das ehrlich zu Nutzern ist, die seine These gar nicht wollen.',
        ),
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
            L(
              'The flow opens as a conversation, not a form: "Hi Sina — what is your goal of create a Meet up?"',
              'جریان به‌جای فرم، با گفت‌وگو باز می‌شود: «سلام سینا — هدفت از ساخت این میت‌آپ چیست؟»',
              'يبدأ المسار كمحادثة لا كنموذج: «مرحبًا سينا — ما هدفك من إنشاء هذا اللقاء؟»',
              'Der Flow öffnet als Gespräch, nicht als Formular: „Hi Sina — was ist dein Ziel für dieses Meetup?“',
            ),
          ),
        },
        {
          id: 'vin-f09a-a2',
          text: l(
            L(
              '"Meet new people — expand your network in a specific area." The default for a newcomer with no network in the city yet.',
              '«آشنایی با آدم‌های تازه — شبکه‌ات را در حوزه‌ای مشخص گسترش بده.» پیش‌فرضِ تازه‌واردی که هنوز شبکه‌ای در شهر ندارد.',
              '«تعرَّف على أشخاص جدد — وسِّع شبكتك في مجال محدد.» الخيار الافتراضي لوافد جديد لا شبكة له في المدينة بعد.',
              '„Neue Leute treffen — erweitere dein Netzwerk in einem bestimmten Bereich.“ Der Default für Neuankömmlinge ohne Netzwerk in der Stadt.',
            ),
          ),
        },
        {
          id: 'vin-f09a-a3',
          text: l(
            L(
              '"Analysing my network" and "Strengthen existing connections" — the two intents for people who already have a network and want it to work harder.',
              '«تحلیل شبکه‌ام» و «تقویت ارتباط‌های موجود» — دو قصد برای کسانی که شبکه دارند و می‌خواهند بیشتر از آن بگیرند.',
              '«تحليل شبكتي» و«تقوية العلاقات القائمة» — نيّتان لمن لديه شبكة بالفعل ويريدها أن تعمل أكثر.',
              '„Mein Netzwerk analysieren“ und „Bestehende Kontakte stärken“ — die beiden Intents für Menschen, die bereits ein Netzwerk haben.',
            ),
          ),
        },
        {
          id: 'vin-f09a-a4',
          text: l(
            L(
              '"Just want to do an activity — skip the strategy, create a simple Meet up." The escape hatch, and the most honest line in the file.',
              '«فقط می‌خواهم فعالیتی انجام دهم — استراتژی را رد کن، یک میت‌آپ ساده بساز.» راه گریز، و صادقانه‌ترین جملهٔ فایل.',
              '«أريد فقط ممارسة نشاط — تخطَّ الاستراتيجية وأنشئ لقاءً بسيطًا.» مخرج الطوارئ، وأصدق سطر في الملف.',
              '„Ich will einfach etwas unternehmen — überspring die Strategie, mach ein einfaches Meetup.“ Das Fluchttor, und die ehrlichste Zeile der Datei.',
            ),
          ),
        },
        {
          id: 'vin-f09a-a5',
          text: l(
            L(
              'Chat, Interest, Discovery and Recent run across the top, and the composer below reads "Create a Meetup with AI" — four ways in, only one of them a conversation.',
              'گفت‌وگو، علاقه، کشف و اخیر در بالا کنار هم‌اند و نوار پایین می‌گوید «با هوش مصنوعی میت‌آپ بساز» — چهار راه ورود که تنها یکی‌شان گفت‌وگوست.',
              'الدردشة والاهتمام والاكتشاف والأحدث في الأعلى، وحقل الإدخال أسفلها يقول «أنشئ لقاءً بالذكاء الاصطناعي» — أربعة مداخل، واحد منها فقط محادثة.',
              'Chat, Interest, Discovery und Recent laufen oben durch, das Eingabefeld darunter sagt „Create a Meetup with AI“ — vier Einstiege, nur einer davon ein Gespräch.',
            ),
          ),
        },
      ],
      caption: l(
        L(
          'Meetup creation — the flow a host uses most — opens by asking what the meetup is for. The product thesis, stated as the first question anyone answers.',
          'ساخت میت‌آپ — پرکاربردترین جریان برای میزبان — با این پرسش باز می‌شود که این میت‌آپ برای چیست. فرضیهٔ محصول، در قالب نخستین پرسشی که هر کسی پاسخ می‌دهد.',
          'إنشاء اللقاء — المسار الأكثر استخدامًا لدى المضيف — يبدأ بسؤال: ما الغرض من هذا اللقاء؟ فرضية المنتج بوصفها أول سؤال يجيب عنه أي شخص.',
          'Das Erstellen eines Meetups — der meistgenutzte Flow — beginnt mit der Frage, wofür das Meetup da ist. Die Produktthese als erste Frage, die jemand beantwortet.',
        ),
      ),
    },
    {
      id: 'vin-s10',
      blockType: 'csDecisions',
      items: [
        {
          id: 'vin-d01',
          title: l(
            L(
              "Retire 'Meetup' and 'Event' as vocabulary",
              'بازنشستگیِ واژه‌های «میت‌آپ» و «رویداد»',
              'تقاعد مصطلحي "Meetup" و"Event"',
              '„Meetup“ und „Event“ als Vokabular ausmustern',
            ),
          ),
          why: l(
            L(
              "VIN is the platform; Meet is the action — a fixed usage rule ('Join a VIN Meet', never 'Download VIN Meet App') so five planned verticals (VIN Party, VIN Challenge, VIN Business Walk, VIN Retreat) never force a rename.",
              'وین پلتفرم است؛ Meet کنش است — قاعدهٔ کاربردیِ ثابتی («به یک VIN Meet بپیوندید»، هرگز «اپ VIN Meet را دانلود کنید») تا پنج عمود برنامه‌ریزی‌شده (VIN Party، VIN Challenge، VIN Business Walk، VIN Retreat) هرگز نیازی به تغییر نام نداشته باشند.',
              'وين هي المنصّة؛ وMeet هو الفعل — قاعدة استخدام ثابتة («انضم إلى VIN Meet»، أبدًا «حمِّل تطبيق VIN Meet») حتى لا تفرض خمس شرائح مخطَّطة (VIN Party، VIN Challenge، VIN Business Walk، VIN Retreat) أي إعادة تسمية أبدًا.',
              'VIN ist die Plattform; Meet ist die Aktion — eine feste Nutzungsregel („Einem VIN Meet beitreten“, niemals „VIN-Meet-App herunterladen“), damit fünf geplante Verticals (VIN Party, VIN Challenge, VIN Business Walk, VIN Retreat) nie eine Umbenennung erzwingen.',
            ),
          ),
          alternatives: l(
            L(
              'A softer style-guide suggestion, left to individual copywriters.',
              'پیشنهادی نرم‌تر در راهنمای سبک، وابسته به تشخیص هر کپی‌رایتر.',
              'اقتراح أليَن في دليل الأسلوب، متروك لتقدير كل كاتب إعلاني.',
              'Ein weicherer Style-Guide-Vorschlag, den einzelnen Copywritern überlassen.',
            ),
          ),
          tradeoff: l(
            L(
              "The lock gives the architecture teeth — but the file itself still uses 'Meetup' and 'Event' everywhere, including its own section names; a locked decision still needs a migration pass to become real.",
              'قفل‌شدن به معماری دندان می‌دهد — اما خودِ فایل هنوز همه‌جا از «میت‌آپ» و «رویداد» استفاده می‌کند، حتی در نام بخش‌های خودش؛ یک تصمیم قفل‌شده هنوز به یک گذرِ مهاجرت نیاز دارد تا واقعی شود.',
              'القفل يمنح الهندسة قوة تنفيذية — لكن الملف نفسه ما زال يستخدم "Meetup" و"Event" في كل مكان، حتى في أسماء أقسامه؛ فالقرار المُقفَل ما زال يحتاج تمريرة ترحيل ليصبح واقعًا.',
              'Die Verriegelung verleiht der Architektur Biss — aber die Datei selbst verwendet weiterhin überall „Meetup“ und „Event“, auch in ihren eigenen Abschnittsnamen; eine verriegelte Entscheidung braucht noch einen Migrationsdurchgang, um real zu werden.',
            ),
          ),
          evidence: l(
            L(
              'Brand Architecture document, dated after the UI work',
              'سند معماری برند، با تاریخِ پس از کار رابط کاربری',
              'وثيقة هندسة العلامة التجارية، مؤرَّخة بعد عمل الواجهة',
              'Brand-Architecture-Dokument, datiert nach der UI-Arbeit',
            ),
          ),
        },
        {
          id: 'vin-d02',
          title: l(
            L(
              'No public leaderboards, no competitive framing',
              'بدون جدول رده‌بندی عمومی، بدون قاب‌بندی رقابتی',
              'بلا لوحات صدارة عامة، بلا صياغة تنافسية',
              'Keine öffentlichen Ranglisten, kein Wettbewerbs-Framing',
            ),
          ),
          why: l(
            L(
              'Public leaderboards and competitive display read as culturally wrong for this market.',
              'جدول رده‌بندی عمومی و نمایش رقابتی از نظر فرهنگی برای این بازار نادرست خوانده می‌شوند.',
              'تُقرأ لوحات الصدارة العامة والعرض التنافسي على أنها خاطئة ثقافيًا لهذا السوق.',
              'Öffentliche Ranglisten und Wettbewerbsdarstellung gelten für diesen Markt als kulturell falsch.',
            ),
          ),
          alternatives: l(
            L(
              'A cross-game leaderboard, the pattern used elsewhere in competitive-platform design.',
              'جدول رده‌بندیِ میان‌بازی، الگویی که جاهای دیگر در طراحی پلتفرم‌های رقابتی به‌کار می‌رود.',
              'لوحة صدارة عابرة للألعاب، وهو النمط المستخدم في مواضع أخرى من تصميم المنصّات التنافسية.',
              'Ein spielübergreifendes Leaderboard, das Muster, das anderswo im Design von Wettbewerbsplattformen verwendet wird.',
            ),
          ),
          tradeoff: l(
            L(
              'Removes a proven engagement lever; replaced with curated matching and connection goals instead.',
              'اهرمی اثبات‌شده در تعامل را حذف می‌کند؛ به‌جایش تطبیق کیوریت‌شده و هدف‌های ارتباطی می‌آید.',
              'يزيل رافعة تفاعل مُثبَتة؛ ويستبدلها بمطابقة منسَّقة وأهداف تواصل.',
              'Entfernt einen bewährten Engagement-Hebel; ersetzt durch kuratiertes Matching und Verbindungsziele.',
            ),
          ),
          evidence: l(
            L(
              'Nine non-negotiable Dubai cultural rules, part of the reusable design-and-audit protocol',
              'نه قاعدهٔ فرهنگیِ غیرقابل‌مذاکرهٔ دبی، بخشی از پروتکل طراحی-و-ممیزیِ قابل‌استفادهٔ مجدد',
              'تسع قواعد ثقافية غير قابلة للتفاوض لدبي، جزء من بروتوكول التصميم والتدقيق القابل لإعادة الاستخدام',
              'Neun nicht verhandelbare Dubai-Kulturregeln, Teil des wiederverwendbaren Design-und-Audit-Protokolls',
            ),
          ),
        },
        {
          id: 'vin-d03',
          title: l(
            L(
              'Chat-first meetup creation, with a real escape hatch',
              'ساخت میت‌آپِ چت‌محور، با دریچهٔ فرارِ واقعی',
              'إنشاء لقاء قائم على المحادثة، مع منفذ حقيقي',
              'Chat-first-Meetup-Erstellung, mit einem echten Fluchttor',
            ),
          ),
          why: l(
            L(
              'Puts the AI-pathfinding thesis in front of every host at the moment of creation, rather than burying it in settings.',
              'فرضیهٔ مسیریابیِ هوش مصنوعی را در لحظهٔ ساخت جلوی چشم هر میزبان می‌گذارد، نه اینکه در تنظیمات دفن شود.',
              'يضع فرضية تحديد المسار بالذكاء الاصطناعي أمام كل مضيف لحظة الإنشاء، بدلًا من دفنها في الإعدادات.',
              'Stellt die KI-Pathfinding-These jedem Host im Moment der Erstellung vor Augen, statt sie in den Einstellungen zu vergraben.',
            ),
          ),
          alternatives: l(
            L(
              'A plain creation form — which is what actually ships behind the fourth intent chip.',
              'یک فرم سادهٔ ساخت — که همان چیزی است که پشت چیپ قصدِ چهارم واقعاً ارائه می‌شود.',
              'نموذج إنشاء بسيط — وهو ما يُقدَّم فعليًا خلف رقاقة النيّة الرابعة.',
              'Ein einfaches Erstellungsformular — genau das, was tatsächlich hinter dem vierten Intent-Chip steckt.',
            ),
          ),
          tradeoff: l(
            L(
              'Costs a small amount of friction for someone who just wants to book a padel session; the fourth chip pays that back honestly instead of forcing the strategy layer on everyone.',
              'مقداری اصطکاک برای کسی که فقط می‌خواهد یک جلسهٔ پدل رزرو کند هزینه دارد؛ چیپ چهارم این هزینه را صادقانه پس می‌دهد، به‌جای تحمیل لایهٔ استراتژی به همه.',
              'يكلّف قدرًا يسيرًا من الاحتكاك لمن يريد فقط حجز جلسة بادل؛ وتعوّض الرقاقة الرابعة ذلك بصدق بدل فرض طبقة الاستراتيجية على الجميع.',
              'Kostet etwas Reibung für jemanden, der nur eine Padel-Session buchen will; der vierte Chip zahlt das ehrlich zurück, statt allen die Strategieebene aufzuzwingen.',
            ),
          ),
          ...(media.heroGoalChips ? { media: media.heroGoalChips } : {}),
        },
        {
          id: 'vin-d04',
          title: l(
            L(
              'Design the venue layer as a two-sided product, not a landing page',
              'طراحی لایهٔ مکان‌ها به‌عنوان محصولی دوسویه، نه یک صفحهٔ فرود',
              'تصميم طبقة الأماكن كمنتج ثنائي الجانب، لا كصفحة هبوط',
              'Die Venue-Ebene als zweiseitiges Produkt gestalten, nicht als Landingpage',
            ),
          ),
          why: l(
            L(
              "Matching venues to groups turns 'off-peak covers' into a real scheduling and group-size constraint on the consumer side, not just a sales pitch.",
              'تطبیق مکان‌ها با گروه‌ها «پوشش ساعات کم‌ترافیک» را به محدودیت واقعیِ زمان‌بندی و اندازهٔ گروه در سمت مصرف‌کننده تبدیل می‌کند، نه فقط یک پیشنهاد فروش.',
              'مطابقة الأماكن بالمجموعات تحوّل «تغطية ساعات الركود» إلى قيد جدولة وحجم مجموعة حقيقي على الجانب الاستهلاكي، لا مجرد عرض بيع.',
              'Das Matching von Venues mit Gruppen macht „Off-Peak-Covers“ zu einer echten Scheduling- und Gruppengrößen-Beschränkung auf der Konsumentenseite, nicht nur zu einem Verkaufsargument.',
            ),
          ),
          alternatives: l(
            L(
              'A single static partner-inquiry page.',
              'یک صفحهٔ استاتیکِ واحد برای درخواست همکاری.',
              'صفحة استفسار شركاء ثابتة واحدة.',
              'Eine einzelne statische Partner-Anfrageseite.',
            ),
          ),
          tradeoff: l(
            L(
              "Adds real product surface — 19 screens, including a bidding flow and a fair-price indicator — but it's what makes the 'real footfall, real revenue' claim to venues checkable rather than promised.",
              'سطح واقعیِ محصول را زیاد می‌کند — ۱۹ صفحه، شامل جریان مزایده و نشانگر قیمتِ منصفانه — اما همین است که ادعای «ترافیک واقعی، درآمد واقعی» به مکان‌ها را قابل‌بررسی می‌کند نه فقط وعده.',
              'يضيف سطحًا حقيقيًا للمنتج — 19 شاشة، تشمل تدفّق مزايدة ومؤشر سعر عادل — لكنه ما يجعل ادّعاء «إقبال حقيقي، إيرادات حقيقية» للأماكن قابلًا للتحقق لا مجرد وعد.',
              'Fügt echte Produktfläche hinzu — 19 Screens, inklusive eines Bieting-Flows und eines Fair-Price-Indikators — aber genau das macht das Versprechen „echter Fußverkehr, echter Umsatz“ an Venues überprüfbar statt nur versprochen.',
            ),
          ),
          evidence: l(
            L(
              'Sponser section, 19 screens, with a considered legal disclaimer on performance figures',
              'بخش Sponser، ۱۹ صفحه، همراه با سلب مسئولیت حقوقیِ سنجیده دربارهٔ ارقام عملکرد',
              'قسم Sponser، 19 شاشة، مع إخلاء مسؤولية قانوني مدروس حول أرقام الأداء',
              'Sponser-Bereich, 19 Screens, mit einem durchdachten rechtlichen Disclaimer zu Leistungszahlen',
            ),
          ),
        },
      ],
    },
    {
      id: 'vin-s11',
      blockType: 'csNarrative',
      label: 'solution',
      heading: l(
        L(
          'The venue layer is the business model, not a landing page.',
          'لایهٔ مکان‌ها مدل کسب‌وکار است، نه یک صفحهٔ فرود.',
          'طبقة الأماكن هي نموذج العمل، لا صفحة هبوط.',
          'Die Venue-Ebene ist das Geschäftsmodell, keine Landingpage.',
        ),
      ),
      body: prose(
        dir,
        p(
          L(
            "The Sponser section runs a four-step partner funnel — list your venue, get matched, host and activate, measure and grow — and it's genuinely two-sided: hosts can bid for a venue through a 'Be my sponsor' flow with a suggested bid and a fair-price indicator, while venues review qualified requests instead of random traffic.",
            'بخش Sponser یک قیف چهارمرحله‌ایِ شریک را اجرا می‌کند — مکانت را ثبت کن، تطبیق بگیر، میزبانی و فعال‌سازی، اندازه‌گیری و رشد — و واقعاً دوسویه است: میزبانان می‌توانند از طریق جریان «حامی من باش» با پیشنهادِ مزایده و نشانگر قیمتِ منصفانه برای یک مکان مزایده بدهند، درحالی‌که مکان‌ها درخواست‌های واجدشرایط را بررسی می‌کنند نه ترافیک تصادفی را.',
            'يُشغّل قسم Sponser قمع شريك من أربع خطوات — أدرج مكانك، احصل على مطابقة، استضف وفعِّل، قِس ونمِّ — وهو ثنائي الجانب فعلًا: يمكن للمضيفين المزايدة على مكان عبر تدفّق «كن راعيّ» بعرض مقترح ومؤشر سعر عادل، بينما تراجع الأماكن طلبات مؤهَّلة لا حركة مرور عشوائية.',
            'Der Sponser-Bereich fährt einen vierstufigen Partner-Funnel — Venue listen, Match erhalten, Hosten und Aktivieren, Messen und Wachsen — und ist wirklich zweiseitig: Hosts können über einen „Be my sponsor“-Flow mit einem vorgeschlagenen Gebot und einem Fair-Price-Indikator um eine Venue bieten, während Venues qualifizierte Anfragen statt Zufallsverkehr prüfen.',
          ),
        ),
        p(
          L(
            "The pitch to venues is blunt: 'Empty seats aren't a marketing problem — they're a predictable demand problem.' The page even carries a legal disclaimer marking performance figures as indicative, not guaranteed, based on pilot data.",
            'پیشنهاد به مکان‌ها صریح است: «صندلی‌های خالی مسئلهٔ بازاریابی نیستند — مسئلهٔ تقاضای قابل‌پیش‌بینی‌اند.» صفحه حتی یک سلب مسئولیت حقوقی دارد که ارقام عملکرد را نشان‌دهنده می‌داند، نه تضمین‌شده، و بر پایهٔ داده‌های آزمایشی.',
            'العرض للأماكن صريح: «المقاعد الفارغة ليست مشكلة تسويقية — إنها مشكلة طلب يمكن التنبؤ بها.» بل تحمل الصفحة إخلاء مسؤولية قانوني يصف أرقام الأداء بأنها إرشادية لا مضمونة، مستندة إلى بيانات تجريبية.',
            'Das Angebot an Venues ist unverblümt: „Leere Plätze sind kein Marketingproblem — sie sind ein vorhersehbares Nachfrageproblem.“ Die Seite trägt sogar einen rechtlichen Disclaimer, der Leistungszahlen als indikativ, nicht garantiert, basierend auf Pilotdaten kennzeichnet.',
          ),
        ),
      ),
    },
    {
      id: 'vin-s12',
      blockType: 'csProcess',
      kind: 'process',
      heading: l(
        L(
          'The venue funnel, four steps.',
          'قیف مکان‌ها، چهار مرحله.',
          'قمع الأماكن، أربع خطوات.',
          'Der Venue-Funnel, vier Schritte.',
        ),
      ),
      steps: [
        {
          id: 'vin-p07',
          code: '01',
          label: l(L('List', 'ثبت مکان', 'أدرِج', 'Listen')),
          note: l(
            L(
              'Share your space in two minutes: location, capacity, peak/off-peak hours, target audience',
              'مکانت را در دو دقیقه معرفی کن: موقعیت، ظرفیت، ساعات پرترافیک و کم‌ترافیک، مخاطب هدف',
              'شارك مكانك في دقيقتين: الموقع، السعة، ساعات الذروة وخارجها، الجمهور المستهدف',
              'Teile deinen Space in zwei Minuten: Standort, Kapazität, Peak-/Off-Peak-Zeiten, Zielgruppe',
            ),
          ),
        },
        {
          id: 'vin-p08',
          code: '02',
          label: l(L('Match', 'تطبیق', 'المطابقة', 'Matchen')),
          note: l(
            L(
              'VIN suggests relevant meetup groups by area, timing and audience fit',
              'وین گروه‌های میت‌آپِ مرتبط را بر پایهٔ منطقه، زمان‌بندی و تناسب مخاطب پیشنهاد می‌دهد',
              'تقترح وين مجموعات لقاءات ذات صلة حسب المنطقة والتوقيت وملاءمة الجمهور',
              'VIN schlägt relevante Meetup-Gruppen nach Gebiet, Timing und Zielgruppenpassung vor',
            ),
          ),
        },
        {
          id: 'vin-p09',
          code: '03',
          label: l(L('Host', 'میزبانی', 'الاستضافة', 'Hosten')),
          note: l(
            L(
              'Turn visits into spend — normal operations or an activated sponsorship perk',
              'بازدیدها را به خرج تبدیل کن — عملیات معمول یا یک مزیت حمایتیِ فعال‌شده',
              'حوِّل الزيارات إلى إنفاق — عمليات عادية أو ميزة رعاية مُفعَّلة',
              'Besuche in Umsatz verwandeln — normaler Betrieb oder ein aktiviertes Sponsoring-Perk',
            ),
          ),
        },
        {
          id: 'vin-p10',
          code: '04',
          label: l(L('Measure', 'اندازه‌گیری', 'القياس', 'Messen')),
          note: l(
            L(
              'Review visits and spend signals, then schedule the next activation',
              'بازدیدها و نشانه‌های خرج را بررسی کن، سپس فعال‌سازیِ بعدی را زمان‌بندی کن',
              'راجع الزيارات وإشارات الإنفاق، ثم جدوِل التفعيل التالي',
              'Besuche und Spend-Signale prüfen, dann die nächste Aktivierung planen',
            ),
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
          L(
            'The venue page a member reaches from the feed',
            'صفحهٔ مکان، همان‌طور که عضو از فید به آن می‌رسد',
            'صفحة المكان كما يصل إليها العضو من الموجز',
            'Die Venue-Seite, die ein Mitglied aus dem Feed erreicht',
          ),
        ),
        ...item(
          'sponsorBid',
          'vin-f12a-2',
          L(
            'The request its bottom button opens',
            'درخواستی که دکمهٔ پایین آن باز می‌کند',
            'الطلب الذي يفتحه زرّها السفلي',
            'Die Anfrage, die ihr unterer Button öffnet',
          ),
        ),
      ],
      caption: l(
        L(
          'Both sides of the venue layer in one flow: the venue page ends in "Be my sponsor", and the sheet it opens asks for audience size, date, activity, sponsorship type and what the venue gets back. A landing page collects an enquiry; this collects a bookable offer. The venue itself is a real coffee chain standing in as placeholder content.',
          'هر دو سوی لایهٔ مکان در یک جریان: صفحهٔ مکان به «اسپانسر من باش» ختم می‌شود و شیتی که باز می‌کند، اندازهٔ مخاطب، تاریخ، فعالیت، نوع حمایت و آنچه مکان در ازایش می‌گیرد را می‌پرسد. یک صفحهٔ فرود، استعلام جمع می‌کند؛ این، پیشنهادی قابل‌رزرو. خودِ مکان یک برند واقعی قهوه است در نقش محتوای جایگزین.',
          'جانبا طبقة الأماكن في مسار واحد: تنتهي صفحة المكان بزر «كن راعيًا لي»، والورقة التي يفتحها تسأل عن حجم الحضور والتاريخ والنشاط ونوع الرعاية وما يحصل عليه المكان. صفحة الهبوط تجمع استفسارًا؛ وهذه تجمع عرضًا قابلًا للحجز. والمكان نفسه سلسلة قهوة حقيقية مستخدَمة كمحتوى بديل.',
          'Beide Seiten der Venue-Ebene in einem Flow: Die Venue-Seite endet mit „Be my sponsor“, und das Sheet dahinter fragt nach Gruppengröße, Datum, Aktivität, Sponsoring-Art und der Gegenleistung. Eine Landingpage sammelt eine Anfrage; das hier sammelt ein buchbares Angebot. Das Venue selbst ist eine reale Kaffeekette als Platzhalterinhalt.',
        ),
      ),
    },
    {
      id: 'vin-s13',
      blockType: 'csNarrative',
      label: 'outcome',
      heading: l(
        L(
          'Built, not just drawn — and audited against its own promises.',
          'ساخته شده، نه فقط طراحی‌شده — و در برابر وعده‌های خودش سنجیده شده.',
          'مبني، لا مرسوم فقط — ومُدقَّق في ضوء وعوده الخاصة.',
          'Gebaut, nicht nur gezeichnet — und an den eigenen Versprechen geprüft.',
        ),
      ),
      body: prose(
        dir,
        p(
          L(
            "The design is being built: a dated QA review lists real implementation bugs in a running app — a failing bookmark API, screens that don't refetch on focus, a back-navigation dead end, stale 'requested' state after a host rejects a private join. A function scan of the live admin panel covered eight routes at roughly 85–90% discovery coverage, deliberately stopping short of destructive testing on production data.",
            'طراحی در حال ساخته‌شدن است: یک بازبینی کیفیتِ تاریخ‌دار، باگ‌های واقعیِ پیاده‌سازی را در یک اپِ در حال اجرا فهرست می‌کند — یک API بوکمارک که کار نمی‌کند، صفحاتی که هنگام فوکوس دوباره واکشی نمی‌شوند، یک بن‌بست در ناوبریِ برگشت، وضعیت «درخواست‌شده»ی باقی‌مانده پس از رد یک پیوستنِ خصوصی توسط میزبان. اسکن عملکردیِ پنل مدیریتِ زنده هشت مسیر را با پوششِ کشفِ تقریباً ۸۵ تا ۹۰ درصد پوشش داد، و عمداً پیش از آزمون تخریبی روی داده‌های تولید متوقف شد.',
            'التصميم قيد البناء: تسرد مراجعة جودة مؤرَّخة أخطاء تنفيذ حقيقية في تطبيق عامل — واجهة برمجة إشارات مرجعية معطّلة، وشاشات لا تُعيد الجلب عند التركيز، وطريق مسدود في التنقل للخلف، وحالة «مطلوب» عالقة بعد رفض المضيف طلب انضمام خاص. غطّى مسح وظيفي للوحة الإدارة الحيّة ثمانية مسارات بتغطية اكتشاف نحو 85-90٪، متوقفًا عمدًا قبل الاختبار التخريبي على بيانات الإنتاج.',
            'Das Design wird gebaut: Eine datierte QA-Prüfung listet echte Implementierungsfehler in einer laufenden App auf — eine fehlschlagende Bookmark-API, Screens, die beim Fokussieren nicht neu laden, eine Sackgasse bei der Rück-Navigation, ein hängender „requested“-Status, nachdem ein Host einen privaten Beitritt ablehnt. Ein Funktionsscan des Live-Admin-Panels deckte acht Routen mit rund 85-90% Discovery-Abdeckung ab und stoppte bewusst vor destruktivem Testen an Produktionsdaten.',
          ),
        ),
        p(
          L(
            "But the onboarding screen makes four promises, and the file designs two of them. Across all 17,589 nodes, none contains the word 'path' and none contains 'log' — no goal-setting screen, no AI path, no connection-logging interface.",
            'اما صفحهٔ خوش‌آمدگویی چهار وعده می‌دهد، و فایل فقط دوتای آن‌ها را طراحی می‌کند. در میان کل ۱۷٬۵۸۹ گره، هیچ‌کدام حاوی واژهٔ «مسیر» و هیچ‌کدام حاوی «ثبت» نیستند — نه صفحهٔ تعیین هدف، نه مسیر هوش مصنوعی، نه رابط ثبت ارتباط.',
            'لكن شاشة الترحيب تقطع أربعة وعود، ويصمّم الملف اثنين منها فقط. عبر جميع العقد الـ17,589، لا تحتوي أي منها على كلمة "path" ولا "log" — لا شاشة لتحديد الهدف، ولا مسار ذكاء اصطناعي، ولا واجهة تسجيل تواصل.',
            'Aber der Onboarding-Screen macht vier Versprechen, und die Datei entwirft zwei davon. Von allen 17.589 Nodes enthält keiner das Wort „path“ und keiner „log“ — kein Zielsetzungs-Screen, kein KI-Pfad, keine Connection-Logging-Oberfläche.',
          ),
        ),
      ),
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
            L(
              '"Meet Through Movement" — connect with people who share your sport. Delivered: the home feed, the category chips, the map.',
              '«از راه حرکت آشنا شو» — با کسانی آشنا شو که ورزش‌شان مثل توست. تحویل‌شده: فید خانه، چیپ‌های دسته‌بندی، نقشه.',
              '«تعرَّف عبر الحركة» — تواصل مع من يشاركك رياضتك. مُنجَز: الصفحة الرئيسية، ورقائق التصنيفات، والخريطة.',
              '„Meet Through Movement“ — triff Menschen, die deinen Sport teilen. Geliefert: Home-Feed, Kategorie-Chips, Karte.',
            ),
          ),
        },
        {
          id: 'vin-f14-a2',
          text: l(
            L(
              '"Who You Want to Meet" — "define your connection goals and we\'ll find the right events to get you there." No goal-setting screen exists in the file.',
              '«چه کسی را می‌خواهی ملاقات کنی» — «هدف‌های ارتباطی‌ات را تعیین کن تا رویدادهای درست را برایت پیدا کنیم.» هیچ صفحهٔ تعیین هدفی در فایل نیست.',
              '«مَن تريد أن تلتقي» — «حدِّد أهداف تواصلك وسنجد لك الفعاليات المناسبة.» لا توجد شاشة لتحديد الأهداف في الملف.',
              '„Who You Want to Meet“ — „definiere deine Verbindungsziele, und wir finden die passenden Events.“ In der Datei gibt es keinen Screen dafür.',
            ),
          ),
        },
        {
          id: 'vin-f14-a3',
          text: l(
            L(
              '"Show Up, Stay Active" — join activities that fit your schedule. Delivered: meetup detail, tickets, the join and cancel flows.',
              '«حاضر شو، فعال بمان» — به فعالیت‌هایی بپیوند که با برنامه‌ات جور است. تحویل‌شده: جزئیات میت‌آپ، بلیت‌ها، جریان‌های پیوستن و لغو.',
              '«احضر وابقَ نشطًا» — انضم إلى أنشطة تناسب جدولك. مُنجَز: تفاصيل اللقاء، والتذاكر، ومسارا الانضمام والإلغاء.',
              '„Show Up, Stay Active“ — nimm an Aktivitäten teil, die in deinen Kalender passen. Geliefert: Meetup-Detail, Tickets, Beitritts- und Storno-Flows.',
            ),
          ),
        },
        {
          id: 'vin-f14-a4',
          text: l(
            L(
              '"Your Network Grows With You" — "track your events, your connections, and the relationships that matter." No connection-logging screen exists either.',
              '«شبکه‌ات با تو رشد می‌کند» — «رویدادها، ارتباط‌ها و روابط مهمت را پیگیری کن.» صفحهٔ ثبت ارتباط هم وجود ندارد.',
              '«شبكتك تنمو معك» — «تتبَّع فعالياتك وتواصلاتك والعلاقات المهمة.» ولا توجد شاشة لتسجيل التواصلات أيضًا.',
              '„Your Network Grows With You“ — „verfolge deine Events, deine Kontakte und die Beziehungen, die zählen.“ Auch dafür gibt es keinen Screen.',
            ),
          ),
        },
      ],
      caption: l(
        L(
          'Onboarding makes four promises across four slides. Searching all 17,589 named nodes for "path" and for "log" returns nothing: two of the four — the two the thesis rests on — have no screen behind them.',
          'خوش‌آمدگویی در چهار اسلاید، چهار وعده می‌دهد. جست‌وجوی هر ۱۷٬۵۸۹ گرهٔ نام‌دار برای «path» و «log» چیزی برنمی‌گرداند: دو تا از چهار وعده — همان دوتایی که فرضیه بر آن‌ها ایستاده — صفحه‌ای پشت‌شان ندارند.',
          'يقدّم الترحيب أربعة وعود عبر أربع شرائح. البحث في كل العقد المسمّاة البالغة 17,589 عن «path» و«log» لا يعيد شيئًا: وعدان من الأربعة — وهما ما تقوم عليه الفرضية — بلا شاشة خلفهما.',
          'Das Onboarding gibt auf vier Folien vier Versprechen. Eine Suche über alle 17.589 benannten Nodes nach „path“ und nach „log“ liefert nichts: Zwei der vier — die beiden, auf denen die These ruht — haben keinen Screen dahinter.',
        ),
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
          L(
            'Meet up Detail → Meetup Attended',
            'جزئیات میت‌آپ ← میت‌آپ حاضرشده',
            'تفاصيل اللقاء ← اللقاء الذي حضرته',
            'Meetup-Detail → Meetup Attended',
          ),
        ),
        ...item(
          'mutualConnections',
          'vin-f14a-2',
          L(
            'Profile → Mutual Connections',
            'پروفایل ← ارتباط‌های مشترک',
            'الملف الشخصي ← الصلات المشتركة',
            'Profil → Mutual Connections',
          ),
        ),
      ],
      caption: l(
        L(
          'Two sections, one screen: below the title these frames are pixel-identical — the same twelve people in the same order. Correct component reuse, and also the gap, because nothing in either screen separates "we were in the same room" from "we met."',
          'دو بخش، یک صفحه: زیر عنوان، این دو فریم پیکسل‌به‌پیکسل یکسان‌اند — همان دوازده نفر به همان ترتیب. هم استفادهٔ درست از کامپوننت است و هم همان شکاف، چون در هیچ‌کدام چیزی «در یک اتاق بودیم» را از «همدیگر را ملاقات کردیم» جدا نمی‌کند.',
          'قسمان، شاشة واحدة: تحت العنوان يتطابق الإطاران بكسلًا بكسل — الأشخاص الاثنا عشر أنفسهم بالترتيب نفسه. إعادة استخدام صحيحة للمكوّن، وهي أيضًا الفجوة، إذ لا شيء في أيٍّ من الشاشتين يفصل «كنّا في الغرفة نفسها» عن «التقينا».',
          'Zwei Sektionen, ein Screen: Unterhalb des Titels sind beide Frames pixelgleich — dieselben zwölf Personen in derselben Reihenfolge. Korrekte Komponenten-Wiederverwendung und zugleich die Lücke, denn nichts in beiden trennt „wir waren im selben Raum“ von „wir haben uns kennengelernt“.',
        ),
      ),
    },
    {
      id: 'vin-s15',
      blockType: 'csFinding',
      kind: 'finding',
      text: l(
        L(
          "Problem #52 assigns the still-unbuilt AI path a 60% target before it has a frame; problem #44 reasons about users who 'log connections but don't follow up.' The KPI has a target before the feature has a screen.",
          'مسئلهٔ #۵۲ به مسیرِ هوش مصنوعیِ هنوز ساخته‌نشده، هدف ۶۰٪ می‌دهد پیش از آنکه فریمی داشته باشد؛ مسئلهٔ #۴۴ دربارهٔ کاربرانی استدلال می‌کند که «ارتباط را ثبت می‌کنند اما پیگیری نمی‌کنند». شاخص، پیش از آنکه ویژگی صفحه‌ای داشته باشد، هدف دارد.',
          'تحدِّد المشكلة #52 هدفًا بنسبة 60٪ لمسار الذكاء الاصطناعي غير المبني بعد قبل أن يكون له إطار؛ وتُحلِّل المشكلة #44 مستخدمين «يسجّلون التواصلات لكن لا يتابعون». المؤشر له هدف قبل أن تكون للميزة شاشة.',
          'Problem #52 weist dem noch nicht gebauten KI-Pfad ein 60%-Ziel zu, bevor er einen Frame hat; Problem #44 argumentiert über Nutzer, die „Verbindungen protokollieren, aber nicht nachfassen“. Der KPI hat ein Ziel, bevor das Feature einen Screen hat.',
        ),
      ),
      attribution: l(
        L(
          'VIN problem inventory, problems #52 and #44',
          'فهرست مسئلهٔ وین، مسئله‌های #۵۲ و #۴۴',
          'فهرس مشكلات VIN، المشكلتان #52 و#44',
          'VIN-Problem-Inventar, Probleme #52 und #44',
        ),
      ),
      method: l(
        L(
          '17,589-node Figma file audit, cross-referenced against the 57-problem inventory',
          'ممیزیِ فایل فیگمای ۱۷٬۵۸۹گره‌ای، تطبیق‌داده‌شده با فهرست ۵۷مسئله‌ای',
          'تدقيق ملف Figma المكوَّن من 17,589 عقدة، مقارنًا بفهرس الـ57 مشكلة',
          'Audit der 17.589-Node-Figma-Datei, abgeglichen mit dem 57-Probleme-Inventar',
        ),
      ),
    },
    {
      id: 'vin-s16',
      blockType: 'csOutcomes',
      intro: l(
        L(
          'Pre-launch, so these are design and audit outputs, not product usage numbers.',
          'پیش از انتشار، پس این‌ها خروجی‌های طراحی و ممیزی‌اند، نه ارقام استفادهٔ محصول.',
          'قبل الإطلاق، لذا هذه نواتج تصميم وتدقيق، لا أرقام استخدام للمنتج.',
          'Vor dem Launch, daher sind dies Design- und Audit-Outputs, keine Produktnutzungszahlen.',
        ),
      ),
      items: [
        {
          id: 'vin-o01',
          value: '120',
          label: l(
            L(
              'screens shipped as spec',
              'صفحه به‌عنوان مشخصات تحویل شد',
              'شاشة سُلِّمت كمواصفات',
              'Screens als Spec geliefert',
            ),
          ),
          context: l(
            L(
              'Across 11 Figma sections, on a 12-group, 221-component design system',
              'در ۱۱ بخش فیگما، روی سیستم طراحیِ ۱۲گروهی با ۲۲۱ کامپوننت',
              'عبر 11 قسمًا في Figma، على نظام تصميم من 12 مجموعة و221 مكوّنًا',
              'Über 11 Figma-Bereiche, auf einem Design-System mit 12 Gruppen und 221 Komponenten',
            ),
          ),
          kind: 'measured',
          source: l(
            L('Figma file audit', 'ممیزی فایل فیگما', 'تدقيق ملف Figma', 'Figma-Datei-Audit'),
          ),
        },
        {
          id: 'vin-o02',
          value: '57',
          label: l(
            L(
              'problems inventoried',
              'مسئلهٔ فهرست‌شده',
              'مشكلة مُفهرَسة',
              'inventarisierte Probleme',
            ),
          ),
          context: l(
            L(
              'Across five difficulty tiers, each with an owning KPI and a difficulty rating',
              'در پنج ردهٔ دشواری، هرکدام با یک شاخص مالک و درجهٔ دشواری',
              'عبر خمس مستويات صعوبة، لكل منها مؤشر أداء مالك ودرجة صعوبة',
              'Über fünf Schwierigkeitsstufen, jede mit einem zugehörigen KPI und einer Schwierigkeitsbewertung',
            ),
          ),
          kind: 'measured',
          source: l(
            L(
              'Problem inventory workbook',
              'کارپوشهٔ فهرست مسئله',
              'كتاب عمل فهرس المشكلات',
              'Problem-Inventar-Arbeitsheft',
            ),
          ),
        },
        {
          id: 'vin-o03',
          value: '2 of 4',
          label: l(
            L(
              'onboarding promises with a matching screen',
              'وعدهٔ خوش‌آمدگویی با صفحهٔ متناظر',
              'وعد ترحيبي له شاشة مطابقة',
              'Onboarding-Versprechen mit passendem Screen',
            ),
          ),
          context: l(
            L(
              "The goal-setting and connection-logging screens the thesis depends on don't exist yet",
              'صفحات تعیین هدف و ثبت ارتباط که فرضیه به آن‌ها وابسته است هنوز وجود ندارند',
              'شاشتا تحديد الهدف وتسجيل التواصل اللتان تعتمد عليهما الفرضية غير موجودتين بعد',
              'Die Ziel­setzungs- und Connection-Logging-Screens, von denen die These abhängt, existieren noch nicht',
            ),
          ),
          kind: 'measured',
          source: l(
            L(
              '17,589-node file audit',
              'ممیزیِ فایل ۱۷٬۵۸۹گره‌ای',
              'تدقيق ملف بـ17,589 عقدة',
              '17.589-Node-Datei-Audit',
            ),
          ),
        },
        {
          id: 'vin-o04',
          value: '',
          label: l(
            L(
              'A dated, honest QA pass — not a launch',
              'یک بازبینی کیفیتِ تاریخ‌دار و صادقانه — نه یک انتشار',
              'مراجعة جودة مؤرَّخة وصادقة — لا إطلاق',
              'Eine datierte, ehrliche QA-Runde — kein Launch',
            ),
          ),
          context: l(
            L(
              '8 Feb review of real bugs in the running app, plus an 85–90%-coverage admin-panel function scan, stopped short of destructive testing',
              'بازبینیِ ۸ فوریه از باگ‌های واقعی در اپِ در حال اجرا، به‌همراه اسکن عملکردیِ پنل مدیریت با پوشش ۸۵ تا ۹۰ درصد، پیش از آزمون تخریبی متوقف شد',
              'مراجعة 8 فبراير لأخطاء حقيقية في التطبيق العامل، إضافة إلى مسح وظيفي للوحة الإدارة بتغطية 85-90٪، توقّف قبل الاختبار التخريبي',
              '8.-Februar-Prüfung echter Bugs in der laufenden App, plus ein Admin-Panel-Funktionsscan mit 85-90% Abdeckung, gestoppt vor destruktivem Testen',
            ),
          ),
          kind: 'delivered',
          source: l(
            L(
              'QA review + admin function scan',
              'بازبینی کیفیت + اسکن عملکردیِ مدیریت',
              'مراجعة الجودة + مسح وظيفي للإدارة',
              'QA-Prüfung + Admin-Funktionsscan',
            ),
          ),
        },
      ],
      shipped: l(
        L(
          [
            'Product brief (3,716 lines)',
            '57-problem inventory + 20-KPI dictionary (8- and 4-sheet workbooks)',
            '120-screen UI on a 12-group design system',
            'Brand & naming architecture',
            'B2B venue-revenue layer (19 screens)',
            'ASO pack + Arabic/RTL localisation checklist',
            'A reusable design-and-audit protocol (locked decisions, cultural rules, copy patterns)',
          ],
          [
            'سند محصول (۳٬۷۱۶ خط)',
            'فهرست ۵۷مسئله‌ای + واژه‌نامهٔ ۲۰شاخصی (کارپوشه‌های ۸ و ۴برگه)',
            'رابط کاربریِ ۱۲۰صفحه‌ای روی سیستم طراحیِ ۱۲گروهی',
            'معماری برند و نام‌گذاری',
            'لایهٔ درآمدیِ B2B مکان‌ها (۱۹ صفحه)',
            'بستهٔ ASO + چک‌لیست بومی‌سازیِ عربی/راست‌به‌چپ',
            'پروتکل طراحی-و-ممیزیِ قابل‌استفادهٔ مجدد (تصمیم‌های قفل‌شده، قواعد فرهنگی، الگوهای متنی)',
          ],
          [
            'موجز المنتج (3,716 سطرًا)',
            'فهرس 57 مشكلة + قاموس 20 مؤشر أداء (كتب عمل من 8 و4 أوراق)',
            'واجهة من 120 شاشة على نظام تصميم من 12 مجموعة',
            'هندسة العلامة التجارية والتسمية',
            'طبقة إيرادات B2B للأماكن (19 شاشة)',
            'حزمة ASO + قائمة تدقيق لتوطين العربية/RTL',
            'بروتوكول تصميم وتدقيق قابل لإعادة الاستخدام (قرارات مُقفَلة، قواعد ثقافية، أنماط نصوص)',
          ],
          [
            'Produktbrief (3.716 Zeilen)',
            '57-Probleme-Inventar + 20-KPI-Wörterbuch (8- und 4-Blatt-Arbeitshefte)',
            '120-Screen-UI auf einem Design-System mit 12 Gruppen',
            'Marken- & Namensarchitektur',
            'B2B-Venue-Umsatzebene (19 Screens)',
            'ASO-Paket + Checkliste zur arabischen/RTL-Lokalisierung',
            'Ein wiederverwendbares Design-und-Audit-Protokoll (verriegelte Entscheidungen, Kulturregeln, Copy-Muster)',
          ],
        ),
      ),
    },
    {
      id: 'vin-s17',
      blockType: 'csLessons',
      items: [
        {
          id: 'vin-l01',
          title: l(
            L(
              'A hard-to-move north star is a design constraint, not a metric choice',
              'شاخصِ شمال‌نمای سخت‌جابه‌جا یک محدودیت طراحی است، نه انتخاب یک متریک',
              'مقياس شمالي يصعب تحريكه هو قيد تصميم، لا اختيار مقياس',
              'Ein schwer bewegbarer Nordstern ist eine Designbeschränkung, keine Metrikwahl',
            ),
          ),
          body: l(
            L(
              "Connection Logging Rate can't be inflated by a notification or a better feed — it only moves if the product genuinely produced a connection worth logging. That one choice ruled out most of the standard engagement toolkit, which is what made the rest of the design coherent.",
              'نرخ ثبت ارتباط را نمی‌توان با یک اعلان یا فیدِ بهتر متورم کرد — فقط زمانی حرکت می‌کند که محصول واقعاً ارتباطی ارزش‌ثبت‌کردن تولید کرده باشد. همین یک انتخاب بیشتر جعبه‌ابزار استاندارد تعامل را کنار گذاشت، و همین بود که بقیهٔ طراحی را منسجم کرد.',
              'لا يمكن تضخيم معدّل تسجيل التواصل بإشعار أو موجز أفضل — لا يتحرّك إلا إذا أنتج المنتج فعلًا تواصلًا يستحق التسجيل. هذا الاختيار الواحد استبعد معظم عدة أدوات التفاعل القياسية، وهو ما جعل بقية التصميم متماسكًا.',
              'Die Connection Logging Rate lässt sich nicht durch eine Benachrichtigung oder einen besseren Feed aufblähen — sie bewegt sich nur, wenn das Produkt tatsächlich eine loggenswerte Verbindung erzeugt hat. Diese eine Entscheidung schloss den größten Teil des Standard-Engagement-Werkzeugkastens aus, was den Rest des Designs kohärent machte.',
            ),
          ),
        },
        {
          id: 'vin-l02',
          title: l(
            L(
              'Upstream work can feel like progress that screens would have tested',
              'کار بالادستی می‌تواند حسِ پیشرفتی را بدهد که صفحات باید آن را می‌آزمودند',
              'قد يبدو العمل التمهيدي تقدمًا كانت الشاشات لتختبره',
              'Upstream-Arbeit kann sich wie Fortschritt anfühlen, den Screens getestet hätten',
            ),
          ),
          body: l(
            L(
              'The brief was written, 57 problems inventoried, 20 KPIs defined, 120 screens drawn — and the two features the whole thesis depends on still have no frame, while one already has a 60% target. A thin, ugly frame of the goal-to-log loop in week one would have surfaced the hard question earlier.',
              'سند محصول نوشته شد، ۵۷ مسئله فهرست شد، ۲۰ شاخص تعریف شد، ۱۲۰ صفحه کشیده شد — و دو ویژگی‌ای که کل فرضیه به آن‌ها وابسته است هنوز فریمی ندارند، درحالی‌که یکی از آن‌ها هدفِ ۶۰٪ دارد. یک فریم نازک و ناپخته از حلقهٔ هدف‌تا‌ثبت در هفتهٔ اول، سؤال سخت را زودتر روی میز می‌آورد.',
              'كُتب الموجز، وفُهرست 57 مشكلة، وحُدِّد 20 مؤشرًا، ورُسمت 120 شاشة — والميزتان اللتان تعتمد عليهما الفرضية كلها ما زالتا بلا إطار، فيما إحداهما تحمل بالفعل هدف 60٪. إطار رقيق وغير أنيق لحلقة الهدف-إلى-التسجيل في الأسبوع الأول كان سيكشف السؤال الصعب أبكر.',
              'Der Brief wurde geschrieben, 57 Probleme inventarisiert, 20 KPIs definiert, 120 Screens gezeichnet — und die zwei Features, von denen die ganze These abhängt, haben noch keinen Frame, während eines bereits ein 60%-Ziel hat. Ein dünner, hässlicher Frame der Goal-to-Log-Schleife in Woche eins hätte die harte Frage früher zutage gebracht.',
            ),
          ),
        },
        {
          id: 'vin-l03',
          title: l(
            L(
              "Non-negotiable survives arguments that advisory doesn't",
              'غیرقابل‌مذاکره در برابر استدلال‌هایی دوام می‌آورد که توصیه‌ای نمی‌آورد',
              'غير القابل للتفاوض يصمد أمام حجج لا يصمد أمامها الاستشاري',
              'Nicht verhandelbar übersteht Argumente, die beratend nicht übersteht',
            ),
          ),
          body: l(
            L(
              "'No public leaderboards' as guidance loses the first argument it has with a growth idea; phrased as a locked constraint with a stated reason, it holds. The same technique on vocabulary — declaring 'Meetup' and 'Event' discontinued rather than discouraged — gives the brand architecture teeth, though the file shows a locked decision still needs a migration pass to become real.",
              '«بدون جدول رده‌بندی عمومی» به‌عنوان راهنمایی اولین بحث را با یک ایدهٔ رشد می‌بازد؛ اما وقتی به شکل یک محدودیت قفل‌شده با دلیل مشخص بیان شود، دوام می‌آورد. همین فن روی واژگان — اعلام کردن «میت‌آپ» و «رویداد» به‌عنوان متوقف‌شده به‌جای دلسردکننده — به معماری برند دندان می‌دهد، هرچند فایل نشان می‌دهد یک تصمیم قفل‌شده هنوز به گذرِ مهاجرت نیاز دارد تا واقعی شود.',
              '«بلا لوحات صدارة عامة» كإرشاد يخسر أول جدال له مع فكرة نمو؛ لكن مصاغًا كقيد مُقفَل بسبب معلن، يصمد. التقنية نفسها على المفردات — إعلان "Meetup" و"Event" متوقّفَين بدل مثبَّطَين — يمنح هندسة العلامة التجارية قوة، مع أن الملف يُظهر أن قرارًا مُقفَلًا ما زال يحتاج تمريرة ترحيل ليصبح واقعًا.',
              '„Keine öffentlichen Ranglisten“ als Empfehlung verliert das erste Argument mit einer Wachstumsidee; formuliert als verriegelte Beschränkung mit genanntem Grund, hält sie stand. Dieselbe Technik beim Vokabular — „Meetup“ und „Event“ als eingestellt statt nur abgeraten zu erklären — verleiht der Markenarchitektur Biss, auch wenn die Datei zeigt, dass eine verriegelte Entscheidung noch einen Migrationsdurchgang braucht, um real zu werden.',
            ),
          ),
        },
        {
          id: 'vin-l04',
          title: l(
            L(
              'Designing the revenue layer as a product changes the consumer brief',
              'طراحیِ لایهٔ درآمد به‌عنوان محصول، سند مصرف‌کننده را عوض می‌کند',
              'تصميم طبقة الإيرادات كمنتج يغيّر موجز المستهلك',
              'Die Umsatzebene als Produkt zu gestalten verändert den Consumer-Brief',
            ),
          ),
          body: l(
            L(
              "Once venues are matched to groups and hosts bid for sponsorship, 'off-peak covers' becomes a real constraint on scheduling, group size and category mix — a far more specific brief than 'help people network'.",
              'وقتی مکان‌ها با گروه‌ها تطبیق داده می‌شوند و میزبانان برای حمایت مزایده می‌دهند، «پوشش ساعات کم‌ترافیک» به محدودیتی واقعی روی زمان‌بندی، اندازهٔ گروه و ترکیب دسته‌بندی تبدیل می‌شود — سندی به‌مراتب دقیق‌تر از «به مردم در شبکه‌سازی کمک کن».',
              'حين تُطابَق الأماكن بالمجموعات ويزايد المضيفون على الرعاية، تصبح «تغطية ساعات الركود» قيدًا حقيقيًا على الجدولة وحجم المجموعة ومزيج الفئات — موجزًا أدق بكثير من «ساعد الناس على التواصل».',
              'Sobald Venues mit Gruppen gematcht werden und Hosts um Sponsoring bieten, wird „Off-Peak-Covers“ zu einer echten Beschränkung für Scheduling, Gruppengröße und Kategorie-Mix — ein weit spezifischerer Brief als „hilf Menschen beim Netzwerken“.',
            ),
          ),
        },
      ],
    },
  ]
}

// ── Assembly ────────────────────────────────────────────────────────────────────────────────

/** Localized project fields for one locale — everything a `fallback: false` site needs filled. */
export function vinLocalizedFields(locale: SeedLocale, media: VinMediaIds) {
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
