import type { Project } from '@/payload-types'

import { bullets, paragraph, prose, type TextDirection } from './lexical'
import type { MediaSpec, SeedLocale } from './media'

/**
 * RP1 — the validation case study (D-022). Every sentence traces to
 * `Docs/Experience/Projects/rp1-arena/README.md`; the project is pre-launch, so the outcomes are
 * delivered outputs with no numbers, and the ownership lists keep the README's own phrasing
 * (product owner and spec collaborator credited). English is the source; Persian, Arabic and
 * German are machine-drafted twins flagged `translationReviewed: false` until a native review.
 *
 * Row ids are deterministic (`rp1-s01`, `rp1-d01` …) and identical in every locale payload, so
 * Payload merges each locale's copy into the same block rows instead of creating new ones.
 */
export const RP1_SLUG = 'rp1-arena'
export const RP1_ASSETS = 'Docs/Experience/Projects/rp1-arena/assets'
export const SEED_LOCALES: SeedLocale[] = ['en', 'fa', 'ar', 'de']

const DIRECTION: Record<SeedLocale, TextDirection> = { en: 'ltr', fa: 'rtl', ar: 'rtl', de: 'ltr' }

type L<T = string> = Record<SeedLocale, T>
const L = <T = string>(en: T, fa: T, ar: T, de: T): L<T> => ({ en, fa, ar, de })

// ── Media ──────────────────────────────────────────────────────────────────────────────────
// Filenames double as idempotency keys; `duel-main.png` deliberately matches the archive cover
// D-021 seeds, so the same upload serves both.

export const RP1_MEDIA = {
  heroDuel: {
    file: 'games/games-main-duel.png',
    name: 'rp1-arena--games-main-duel.png',
    alt: L(
      'RP1 duel challenge sheet: an incoming Flappy Bird duel in race-to-target format with a 2 USDT stake, and Decline / Accept actions',
      'برگهٔ دعوت به دوئل در RP1: یک دوئل Flappy Bird با قالب مسابقه تا امتیاز هدف و ۲ USDT شرط، با دکمه‌های رد و قبول',
      'ورقة تحدّي مبارزة في RP1: مبارزة Flappy Bird واردة بصيغة السباق إلى الهدف برهان 2 USDT، مع زرّي الرفض والقبول',
      'RP1-Duell-Herausforderung: ein eingehendes Flappy-Bird-Duell im Race-to-Target-Format mit 2 USDT Einsatz und den Aktionen Ablehnen / Annehmen',
    ),
  },
  heroSpotlight: {
    file: 'today-spotlight/not-yet-played.png',
    name: 'rp1-arena--today-spotlight.png',
    alt: L(
      "Today's Spotlight screen: prize tiers, a live-rankings countdown and the leaderboard of the daily single-game competition",
      'صفحهٔ Today’s Spotlight: رده‌های جایزه، شمارش معکوس رده‌بندی زنده و جدول رقابت روزانهٔ تک‌بازی',
      'شاشة Today’s Spotlight: فئات الجوائز، وعدّاد تنازلي للترتيب المباشر، ولوحة صدارة المسابقة اليومية ذات اللعبة الواحدة',
      'Today’s-Spotlight-Screen: Preisstufen, ein Countdown der Live-Rangliste und das Leaderboard des täglichen Einzelspiel-Wettbewerbs',
    ),
  },
  heroLegend: {
    file: 'weekly-legend/ranking.png',
    name: 'rp1-arena--weekly-legend-ranking.png',
    alt: L(
      'Weekly Legend screen: a crown, prize tiers, a countdown in days and the weekly cross-game leaderboard',
      'صفحهٔ Weekly Legend: تاج، رده‌های جایزه، شمارش معکوس روزانه و جدول هفتگی چندبازی',
      'شاشة Weekly Legend: تاج، وفئات الجوائز، وعدّاد تنازلي بالأيام، ولوحة الصدارة الأسبوعية عبر الألعاب',
      'Weekly-Legend-Screen: eine Krone, Preisstufen, ein Countdown in Tagen und das wöchentliche spielübergreifende Leaderboard',
    ),
  },
  duelMain: {
    file: 'duel/duel-main.png',
    name: 'duel-main.png',
    alt: L(
      'Duel entry sheet: challenge a friend, or face a random opponent matched by skill',
      'برگهٔ ورود به دوئل: دعوت یک دوست، یا رویارویی با حریفی تصادفی هم‌سطح',
      'ورقة الدخول إلى المبارزة: تحدِّ صديقًا، أو واجه خصمًا عشوائيًا مطابقًا للمهارة',
      'Duell-Einstieg: einen Freund herausfordern oder gegen einen zufälligen, nach Können zugeordneten Gegner antreten',
    ),
  },
  duelSetup: {
    file: 'duel/duel-time-limited-3.png',
    name: 'rp1-arena--duel-setup.png',
    alt: L(
      'Duel setup: select a player, a format — time limited or race to target — and the prize',
      'تنظیم دوئل: انتخاب بازیکن، قالب — زمان‌دار یا مسابقه تا امتیاز هدف — و جایزه',
      'إعداد المبارزة: اختيار لاعب، وصيغة — محدودة الوقت أو سباق إلى الهدف — والجائزة',
      'Duell-Setup: einen Spieler, ein Format — zeitlich begrenzt oder Race to Target — und den Preis wählen',
    ),
  },
  duelSetupSelected: {
    file: 'duel/duel-race-to-target.png',
    name: 'rp1-arena--duel-race-to-target.png',
    alt: L(
      'Duel setup with a player selected, race to target chosen and the stake options from 0.50 to 10 USDT',
      'تنظیم دوئل با بازیکن انتخاب‌شده، قالب مسابقه تا امتیاز هدف و گزینه‌های شرط از ۰٫۵۰ تا ۱۰ USDT',
      'إعداد المبارزة مع لاعب مختار، وصيغة السباق إلى الهدف، وخيارات الرهان من 0.50 إلى 10 USDT',
      'Duell-Setup mit gewähltem Spieler, Race to Target und den Einsatzoptionen von 0,50 bis 10 USDT',
    ),
  },
  spotlightNearMiss: {
    file: 'today-spotlight/time-remaining.png',
    name: 'rp1-arena--spotlight-game-over.png',
    alt: L(
      "Game-over sheet in Today's Spotlight: score, rank, the points needed for the next rank and the remaining ticket time",
      'برگهٔ پایان بازی در Today’s Spotlight: امتیاز، رتبه، امتیاز لازم برای رتبهٔ بعدی و زمان باقی‌ماندهٔ بلیت',
      'ورقة انتهاء اللعبة في Today’s Spotlight: النقاط، والترتيب، والنقاط اللازمة للترتيب التالي، والوقت المتبقي من التذكرة',
      'Game-over-Sheet in Today’s Spotlight: Punkte, Rang, die für den nächsten Rang nötigen Punkte und die verbleibende Ticketzeit',
    ),
  },
  spotlightTop: {
    file: 'today-spotlight/high-rank.png',
    name: 'rp1-arena--spotlight-on-top.png',
    alt: L(
      "Today's Spotlight sheet for the player holding first place, with the remaining time and a prompt to push the score higher",
      'برگهٔ Today’s Spotlight برای بازیکن رتبهٔ اول، با زمان باقی‌مانده و دعوت به بالا بردن امتیاز',
      'ورقة Today’s Spotlight للاعب في المركز الأول، مع الوقت المتبقي ودعوة لرفع النقاط',
      'Today’s-Spotlight-Sheet für den Spieler auf Platz eins, mit Restzeit und der Aufforderung, den Score zu steigern',
    ),
  },
  spotlightEnded: {
    file: 'today-spotlight/spotlight-ended.png',
    name: 'rp1-arena--spotlight-ended.png',
    alt: L(
      "Spotlight-ended sheet: final score, final rank and the next Spotlight's start time",
      'برگهٔ پایان Spotlight: امتیاز نهایی، رتبهٔ نهایی و زمان شروع Spotlight بعدی',
      'ورقة انتهاء الـ Spotlight: النقاط النهائية، والترتيب النهائي، وموعد بدء الـ Spotlight التالي',
      'Spotlight-beendet-Sheet: Endpunktzahl, Endrang und Startzeit des nächsten Spotlights',
    ),
  },
  wallet: {
    file: 'wallet/wallet-balance.png',
    name: 'rp1-arena--wallet-balance.png',
    alt: L(
      'Wallet screen: total balance in USDT, withdraw and deposit, earnings by source, the on-chain wallet, and available, in-play and pending balances',
      'صفحهٔ کیف پول: موجودی کل به USDT، برداشت و واریز، درآمد به تفکیک منبع، کیف پول زنجیره‌ای و موجودی‌های در دسترس، در بازی و در انتظار',
      'شاشة المحفظة: الرصيد الإجمالي بـ USDT، والسحب والإيداع، والأرباح حسب المصدر، والمحفظة على السلسلة، والأرصدة المتاحة وقيد اللعب والمعلّقة',
      'Wallet-Screen: Gesamtguthaben in USDT, Auszahlen und Einzahlen, Erträge nach Quelle, die On-Chain-Wallet sowie verfügbare, im Spiel befindliche und ausstehende Guthaben',
    ),
  },
  levelUp1: {
    file: 'animations/anim-levelup-1.png',
    name: 'rp1-arena--level-up-1.png',
    alt: L(
      'Level-up animation, first keyframe: the profile with the avatar, achievements and the three-tab bar',
      'انیمیشن ارتقای سطح، فریم اول: پروفایل با آواتار، دستاوردها و نوار سه‌تبی',
      'حركة رفع المستوى، الإطار الأول: الملف الشخصي مع الصورة الرمزية والإنجازات وشريط التبويبات الثلاثة',
      'Level-up-Animation, erstes Keyframe: das Profil mit Avatar, Erfolgen und der Drei-Tab-Leiste',
    ),
  },
  levelUp2: {
    file: 'animations/anim-levelup-2.png',
    name: 'rp1-arena--level-up-2.png',
    alt: L(
      'Level-up animation, middle keyframe: the avatar card turning',
      'انیمیشن ارتقای سطح، فریم میانی: چرخش کارت آواتار',
      'حركة رفع المستوى، الإطار الأوسط: بطاقة الصورة الرمزية وهي تدور',
      'Level-up-Animation, mittleres Keyframe: die Avatar-Karte dreht sich',
    ),
  },
  levelUp3: {
    file: 'animations/anim-levelup-3.png',
    name: 'rp1-arena--level-up-3.png',
    alt: L(
      'Level-up animation, last keyframe: the new level number fills the profile card',
      'انیمیشن ارتقای سطح، فریم آخر: عدد سطح جدید کارت پروفایل را پر می‌کند',
      'حركة رفع المستوى، الإطار الأخير: رقم المستوى الجديد يملأ بطاقة الملف الشخصي',
      'Level-up-Animation, letztes Keyframe: die neue Levelnummer füllt die Profilkarte',
    ),
  },
  notifications: {
    file: 'notification/notification-friends.png',
    name: 'rp1-arena--notifications.png',
    alt: L(
      'Notification feed: transactional cards for deposits, withdrawals, prizes and duel results, each with its own actions',
      'فید اعلان‌ها: کارت‌های تراکنشی برای واریز، برداشت، جایزه و نتیجهٔ دوئل، هرکدام با اقدام‌های خودش',
      'موجز الإشعارات: بطاقات معاملاتية للإيداعات والسحوبات والجوائز ونتائج المبارزات، لكل منها إجراءاتها',
      'Benachrichtigungs-Feed: Transaktionskarten für Einzahlungen, Auszahlungen, Preise und Duellergebnisse, jede mit eigenen Aktionen',
    ),
  },
} satisfies Record<string, MediaSpec>

export type Rp1MediaKey = keyof typeof RP1_MEDIA
export type Rp1MediaIds = Partial<Record<Rp1MediaKey, string>>

// ── Project fields ──────────────────────────────────────────────────────────────────────────

const TITLE = L(
  'RP1 — Multi-Game Play-to-Earn Arena',
  'RP1 — آرنای چندبازیِ Play-to-Earn',
  'RP1 — ساحة Play-to-Earn متعددة الألعاب',
  'RP1 — Multi-Game-Play-to-Earn-Arena',
)

const COMPANY = L('Independent', 'مستقل', 'مستقل', 'Unabhängig')

const ROLE = L(
  'Product designer & strategist',
  'طراح محصول و استراتژیست',
  'مصمّم منتج واستراتيجي',
  'Produktdesigner & Stratege',
)

const SUMMARY = L(
  'Product design and strategy for a mobile play-to-earn arena that gathers HTML5 games under one competitive and economic layer — competitive-platform research, MVP scoping and a full wireframe spec across 16 sections.',
  'طراحی محصول و استراتژی برای یک آرنای موبایلی Play-to-Earn که بازی‌های HTML5 را زیر یک لایهٔ رقابتی و اقتصادی واحد گرد می‌آورد — پژوهش پلتفرم‌های رقابتی، تعیین دامنهٔ MVP و مشخصات کامل وایرفریم در ۱۶ بخش.',
  'تصميم المنتج والاستراتيجية لساحة Play-to-Earn على الهاتف تجمع ألعاب HTML5 تحت طبقة تنافسية واقتصادية واحدة — بحث في المنصات التنافسية، وتحديد نطاق الـ MVP، ومواصفات إطارات سلكية كاملة عبر 16 قسمًا.',
  'Produktdesign und Strategie für eine mobile Play-to-Earn-Arena, die HTML5-Spiele unter einer gemeinsamen Wettbewerbs- und Wirtschaftsebene bündelt — Research zu Wettbewerbsplattformen, MVP-Scoping und eine vollständige Wireframe-Spezifikation über 16 Bereiche.',
)

const STATEMENT = L(
  "A multi-game play-to-earn arena, spec'd end-to-end — from Octalysis-driven research to a 16-section wireframe pass — currently pre-launch.",
  'یک آرنای چندبازیِ Play-to-Earn که سرتاسر آن مشخص شده — از پژوهش مبتنی بر Octalysis تا وایرفریم ۱۶ بخش — و هنوز پیش از انتشار است.',
  'ساحة Play-to-Earn متعددة الألعاب مُحدَّدة من البداية إلى النهاية — من بحث قائم على Octalysis إلى إطارات سلكية عبر 16 قسمًا — ولم تُطلق بعد.',
  'Eine Multi-Game-Play-to-Earn-Arena, durchgängig spezifiziert — von Octalysis-basiertem Research bis zu Wireframes über 16 Bereiche — derzeit vor dem Launch.',
)

const INDUSTRY = L(
  'Gaming · play-to-earn',
  'بازی · Play-to-Earn',
  'ألعاب · Play-to-Earn',
  'Gaming · Play-to-Earn',
)

const TEAM = L(
  'A product owner, a game/community-spec collaborator, and Sina as product design & strategy lead',
  'یک مالک محصول، یک همکار برای مشخصات بازی و جامعه، و سینا به‌عنوان لیدِ طراحی محصول و استراتژی',
  'مالك منتج، ومتعاون على مواصفات الألعاب والمجتمع، وسينا قائدًا لتصميم المنتج والاستراتيجية',
  'Ein Product Owner, ein Mitwirkender für die Spiel- und Community-Spezifikation und Sina als Lead für Produktdesign und Strategie',
)

const META_TITLE = L(
  'RP1 — product design and strategy for a play-to-earn arena',
  'RP1 — طراحی محصول و استراتژی برای یک آرنای Play-to-Earn',
  'RP1 — تصميم المنتج والاستراتيجية لساحة Play-to-Earn',
  'RP1 — Produktdesign und Strategie für eine Play-to-Earn-Arena',
)

const HERO_CAPTION = L(
  "Three of the 73 exported screens: a duel challenge, Today's Spotlight and the Weekly Legend ranking.",
  'سه نمونه از ۷۳ صفحهٔ خروجی‌گرفته‌شده: یک دعوت به دوئل، Today’s Spotlight و رده‌بندی Weekly Legend.',
  'ثلاث من 73 شاشة مُصدَّرة: تحدّي مبارزة، وToday’s Spotlight، وترتيب Weekly Legend.',
  'Drei der 73 exportierten Screens: eine Duell-Herausforderung, Today’s Spotlight und das Weekly-Legend-Ranking.',
)

const SNAPSHOT = {
  problem: L(
    'Casual HTML5 games rarely have a durable competitive or monetization layer — and the platforms that add one tend to read as casino products first.',
    'بازی‌های تفننی HTML5 به‌ندرت لایهٔ رقابتی یا درآمدزایی ماندگاری دارند — و پلتفرم‌هایی که چنین لایه‌ای می‌افزایند، بیشتر شبیه کازینو به نظر می‌رسند تا بازی.',
    'نادرًا ما تملك ألعاب HTML5 العابرة طبقة تنافسية أو طبقة تحقيق دخل مستدامة — والمنصات التي تضيفها تبدو غالبًا منتجات كازينو أولًا.',
    'Casual-HTML5-Spiele haben selten eine tragfähige Wettbewerbs- oder Monetarisierungsebene — und Plattformen, die eine hinzufügen, wirken meist zuerst wie Casino-Produkte.',
  ),
  role: L(
    'Product design and strategy lead: the gamification research, the MVP scope and the full 16-section wireframe spec, alongside a product owner and a spec collaborator.',
    'لیدِ طراحی محصول و استراتژی: پژوهش گیمیفیکیشن، دامنهٔ MVP و مشخصات کامل وایرفریم در ۱۶ بخش، در کنار یک مالک محصول و یک همکارِ مشخصات.',
    'قيادة تصميم المنتج والاستراتيجية: بحث التلعيب، ونطاق الـ MVP، ومواصفات الإطارات السلكية الكاملة عبر 16 قسمًا، إلى جانب مالك منتج ومتعاون على المواصفات.',
    'Lead für Produktdesign und Strategie: das Gamification-Research, der MVP-Umfang und die vollständige Wireframe-Spezifikation über 16 Bereiche — neben einem Product Owner und einem Mitwirkenden an der Spezifikation.',
  ),
  result: L(
    'A fully resolved MVP scope, a 34-component build catalog with a 3-week build order, and a reusable interactive Octalysis tool — pre-launch, so no product metrics yet.',
    'یک دامنهٔ MVP کاملاً مشخص، یک کاتالوگ ساخت با ۳۴ کامپوننت و ترتیب ساخت سه‌هفته‌ای، و یک ابزار تعاملی Octalysis قابل استفادهٔ مجدد — پیش از انتشار، پس هنوز معیار محصولی در کار نیست.',
    'نطاق MVP محسوم بالكامل، وكتالوج بناء من 34 مكوّنًا مع ترتيب بناء لثلاثة أسابيع، وأداة Octalysis تفاعلية قابلة لإعادة الاستخدام — قبل الإطلاق، فلا مقاييس منتج بعد.',
    'Ein vollständig geklärter MVP-Umfang, ein Build-Katalog mit 34 Komponenten und einer dreiwöchigen Build-Reihenfolge sowie ein wiederverwendbares interaktives Octalysis-Werkzeug — vor dem Launch, also noch ohne Produktkennzahlen.',
  ),
}

// ── Sections ────────────────────────────────────────────────────────────────────────────────

type Sections = NonNullable<Project['sections']>

/** The block narrative for one locale, with the same row ids in every locale. */
export function rp1Sections(locale: SeedLocale, media: Rp1MediaIds): Sections {
  const l = <T>(value: L<T>): T => value[locale]
  const dir = DIRECTION[locale]
  const p = (value: L) => paragraph(l(value), dir)
  const item = (key: Rp1MediaKey, id: string, caption?: L) =>
    media[key] ? [{ id, media: media[key]!, ...(caption ? { caption: l(caption) } : {}) }] : []

  return [
    {
      id: 'rp1-s01',
      blockType: 'csNarrative',
      label: 'context',
      heading: l(
        L(
          'Many small games, one competitive and economic layer.',
          'بازی‌های کوچکِ فراوان، یک لایهٔ رقابتی و اقتصادی.',
          'ألعاب صغيرة كثيرة، وطبقة تنافسية واقتصادية واحدة.',
          'Viele kleine Spiele, eine Wettbewerbs- und Wirtschaftsebene.',
        ),
      ),
      body: prose(
        dir,
        p(
          L(
            'RP1 — ReadyPlayerOne in the project’s own docs — is a mobile-first arena that aggregates lightweight HTML5 arcade games — Flappy Bird, Snake, Temple Run, Subway Surf and others — under one competitive and economic layer: daily and weekly leaderboard competitions, 1v1 wagered duels and ticket-gated tournaments, all settled in USDT through an on-chain wallet (BNB Smart Chain, BEP-20).',
            'RP1 — که در اسناد خود پروژه ReadyPlayerOne نامیده می‌شود — آرنایی موبایل‌محور است که بازی‌های آرکید سبک HTML5 — Flappy Bird، Snake، Temple Run، Subway Surf و دیگران — را زیر یک لایهٔ رقابتی و اقتصادی گرد می‌آورد: رقابت‌های روزانه و هفتگی با جدول رده‌بندی، دوئل‌های یک‌به‌یک با شرط، و تورنمنت‌های بلیتی؛ همه با USDT و از طریق یک کیف پول زنجیره‌ای (BNB Smart Chain، BEP-20) تسویه می‌شوند.',
            'RP1 — أو ReadyPlayerOne في وثائق المشروع نفسها — ساحة موجّهة للهاتف أولًا تجمع ألعاب أركيد HTML5 خفيفة — Flappy Bird وSnake وTemple Run وSubway Surf وغيرها — تحت طبقة تنافسية واقتصادية واحدة: مسابقات يومية وأسبوعية بلوحات صدارة، ومبارزات فردية برهان، وبطولات بتذاكر، تُسوّى جميعها بـ USDT عبر محفظة على السلسلة (BNB Smart Chain، BEP-20).',
            'RP1 — in den Projektunterlagen ReadyPlayerOne — ist eine Mobile-first-Arena, die leichte HTML5-Arcade-Spiele — Flappy Bird, Snake, Temple Run, Subway Surf und andere — unter einer Wettbewerbs- und Wirtschaftsebene bündelt: tägliche und wöchentliche Leaderboard-Wettbewerbe, 1-gegen-1-Duelle mit Einsatz und ticketpflichtige Turniere, alle in USDT über eine On-Chain-Wallet (BNB Smart Chain, BEP-20) abgerechnet.',
          ),
        ),
        p(
          L(
            'It is not pitched as a social network — the project’s own docs call it a “competitive visibility engine”. The reference points named throughout the research are Skillz, MPL, WinZO, Kongregate and Plato.',
            'این محصول شبکهٔ اجتماعی معرفی نمی‌شود — اسناد پروژه آن را «موتور دیده‌شدنِ رقابتی» می‌نامند. مرجع‌هایی که در سراسر پژوهش نام برده شده‌اند Skillz، MPL، WinZO، Kongregate و Plato هستند.',
            'لا يُقدَّم كشبكة اجتماعية — فوثائق المشروع تسمّيه «محرّك ظهور تنافسي». والمراجع المذكورة في البحث كله هي Skillz وMPL وWinZO وKongregate وPlato.',
            'Es wird nicht als soziales Netzwerk positioniert — die Projektunterlagen nennen es eine „competitive visibility engine“. Die Referenzpunkte, die sich durch das Research ziehen, sind Skillz, MPL, WinZO, Kongregate und Plato.',
          ),
        ),
      ),
      insight: l(
        L(
          'Not a social network: a competitive visibility engine.',
          'نه یک شبکهٔ اجتماعی، بلکه موتور دیده‌شدنِ رقابتی.',
          'ليست شبكة اجتماعية، بل محرّك ظهور تنافسي.',
          'Kein soziales Netzwerk, sondern eine competitive visibility engine.',
        ),
      ),
    },
    {
      id: 'rp1-s02',
      blockType: 'csFinding',
      kind: 'finding',
      text: l(
        L(
          'Don’t become “the Telegram graveyard”: Hamster Kombat’s collapse from 300M to 23M users after its token airdrop faded was the cautionary case the research kept returning to.',
          'به «گورستان تلگرام» تبدیل نشوید: سقوط Hamster Kombat از ۳۰۰ میلیون به ۲۳ میلیون کاربر پس از فروکش کردن ایردراپ توکنش، نمونهٔ هشداردهنده‌ای بود که پژوهش بارها به آن بازمی‌گشت.',
          'لا تتحوّل إلى «مقبرة تيليغرام»: انهيار Hamster Kombat من 300 مليون إلى 23 مليون مستخدم بعد خفوت الإسقاط الجوي لعملته كان الحالة التحذيرية التي عاد إليها البحث مرارًا.',
          'Nicht zum „Telegram-Friedhof“ werden: Der Absturz von Hamster Kombat von 300 Mio. auf 23 Mio. Nutzer, nachdem der Token-Airdrop verpufft war, war der Warnfall, auf den das Research immer wieder zurückkam.',
        ),
      ),
      attribution: l(
        L(
          'RP1 competitive research',
          'پژوهش رقابتی RP1',
          'بحث RP1 التنافسي',
          'RP1-Wettbewerbsresearch',
        ),
      ),
      method: l(
        L(
          'Desk research across 20-plus competitive and casual-gaming platforms',
          'پژوهش کتابخانه‌ای روی بیش از ۲۰ پلتفرم بازی رقابتی و تفننی',
          'بحث مكتبي عبر أكثر من 20 منصة ألعاب تنافسية وعابرة',
          'Desk-Research über mehr als 20 Wettbewerbs- und Casual-Gaming-Plattformen',
        ),
      ),
    },
    {
      id: 'rp1-s03',
      blockType: 'csNarrative',
      label: 'problem',
      heading: l(
        L(
          'Competitive and rewarding without becoming a casino.',
          'رقابتی و پاداش‌دهنده، بی‌آنکه کازینو شود.',
          'تنافسية ومجزية من دون أن تصبح كازينو.',
          'Kompetitiv und belohnend, ohne zum Casino zu werden.',
        ),
      ),
      body: prose(
        dir,
        p(
          L(
            'Casual HTML5 games are plentiful but rarely have a durable competitive or monetization layer — and the platforms that do add one, in crypto-gaming and play-to-earn, tend to read as casino products first and games second.',
            'بازی‌های تفننی HTML5 فراوان‌اند اما به‌ندرت لایهٔ رقابتی یا درآمدزایی ماندگاری دارند — و پلتفرم‌هایی که در حوزهٔ بازی‌های کریپتویی و Play-to-Earn چنین لایه‌ای می‌افزایند، معمولاً اول کازینو به نظر می‌رسند و بعد بازی.',
            'ألعاب HTML5 العابرة وفيرة لكنها نادرًا ما تملك طبقة تنافسية أو طبقة تحقيق دخل مستدامة — والمنصات التي تضيفها، في ألعاب الكريبتو والـ Play-to-Earn، تبدو غالبًا منتجات كازينو أولًا وألعابًا ثانيًا.',
            'Casual-HTML5-Spiele gibt es viele, aber selten mit einer tragfähigen Wettbewerbs- oder Monetarisierungsebene — und die Plattformen, die eine hinzufügen, im Crypto-Gaming und Play-to-Earn, wirken meist zuerst wie Casino-Produkte und erst dann wie Spiele.',
          ),
        ),
        p(
          L(
            'RP1 set out to design a system that feels genuinely competitive and rewarding without tipping into exploitative mechanics: every mechanic was scored against the Octalysis framework’s White-Hat / Black-Hat balance.',
            'RP1 می‌خواست سیستمی طراحی کند که واقعاً رقابتی و پاداش‌دهنده باشد بی‌آنکه به مکانیک‌های استثمارگر بلغزد: هر مکانیک با تعادل White-Hat / Black-Hat در چارچوب Octalysis امتیازدهی شد.',
            'سعى RP1 إلى تصميم نظام يبدو تنافسيًا ومجزيًا بحق من دون الانزلاق إلى آليات استغلالية: قُيِّمت كل آلية وفق توازن White-Hat / Black-Hat في إطار Octalysis.',
            'RP1 wollte ein System entwerfen, das sich wirklich kompetitiv und belohnend anfühlt, ohne in ausbeuterische Mechaniken zu kippen: Jede Mechanik wurde an der White-Hat-/Black-Hat-Balance des Octalysis-Frameworks gemessen.',
          ),
        ),
      ),
    },
    {
      id: 'rp1-s04',
      blockType: 'csFinding',
      kind: 'quote',
      text: l(
        L(
          'ESPN app, not Stake.com — say a player “earned” a prize, never that they “won big” or hit a “jackpot”.',
          'اپ ESPN، نه Stake.com — بگویید بازیکن جایزه‌ای را «به دست آورد»، هرگز نگویید «برد بزرگ» کرد یا «جک‌پات» زد.',
          'تطبيق ESPN لا Stake.com — قل إن اللاعب «استحقّ» جائزة، ولا تقل أبدًا إنه «ربح بضخامة» أو أصاب «الجائزة الكبرى».',
          'ESPN-App, nicht Stake.com — ein Spieler hat sich einen Preis „verdient“, nie „groß gewonnen“ oder den „Jackpot geknackt“.',
        ),
      ),
      attribution: l(
        L('RP1 tone guideline', 'راهنمای لحن RP1', 'دليل نبرة RP1', 'RP1-Tonalitätsrichtlinie'),
      ),
    },
    {
      id: 'rp1-s05',
      blockType: 'csNarrative',
      label: 'constraints',
      heading: l(
        L(
          'A USDT-only economy, a mobile-first canvas, a component set with gaps.',
          'اقتصادی فقط با USDT، بومی موبایل‌محور، مجموعه‌ای از کامپوننت‌ها با کاستی‌ها.',
          'اقتصاد بـ USDT فقط، ولوحة موجّهة للهاتف أولًا، ومجموعة مكوّنات فيها ثغرات.',
          'Eine reine USDT-Ökonomie, eine Mobile-first-Fläche, ein Komponentensatz mit Lücken.',
        ),
      ),
      body: prose(
        dir,
        bullets(
          l(
            L(
              [
                'Settlement in USDT only, on BNB Smart Chain (BEP-20) — no utility token.',
                'Mobile-first: one app, navigation locked to three tabs.',
                'An existing component set with an 18-item gap list — no colour or type tokens, no motion spec, an undefined avatar system.',
                'A tone guideline that ruled out casino language.',
              ],
              [
                'تسویه فقط با USDT روی BNB Smart Chain (BEP-20) — بدون توکن کاربردی.',
                'موبایل‌محور: یک اپ، ناوبری قفل‌شده روی سه تب.',
                'مجموعه‌ای موجود از کامپوننت‌ها با فهرست ۱۸ موردی از کاستی‌ها — بدون توکن رنگ و تایپ، بدون مشخصات حرکت، سیستم آواتار تعریف‌نشده.',
                'راهنمای لحنی که زبان کازینویی را کنار می‌گذاشت.',
              ],
              [
                'التسوية بـ USDT فقط على BNB Smart Chain (BEP-20) — من دون عملة منفعة.',
                'الهاتف أولًا: تطبيق واحد، وتنقّل مثبَّت على ثلاثة تبويبات.',
                'مجموعة مكوّنات قائمة بقائمة ثغرات من 18 بندًا — لا رموز ألوان أو خطوط، ولا مواصفات حركة، ونظام صور رمزية غير محدد.',
                'دليل نبرة يستبعد لغة الكازينو.',
              ],
              [
                'Abrechnung nur in USDT auf der BNB Smart Chain (BEP-20) — kein Utility-Token.',
                'Mobile-first: eine App, Navigation fest auf drei Tabs.',
                'Ein bestehender Komponentensatz mit einer 18 Punkte langen Lückenliste — keine Farb- oder Typo-Tokens, keine Motion-Spezifikation, ein undefiniertes Avatar-System.',
                'Eine Tonalitätsrichtlinie, die Casino-Sprache ausschloss.',
              ],
            ),
          ),
          dir,
        ),
      ),
    },
    {
      id: 'rp1-s06',
      blockType: 'csOwnership',
      heading: l(
        L(
          'Research, scope and the spec — alongside a product owner.',
          'پژوهش، دامنه و مشخصات — در کنار یک مالک محصول.',
          'البحث والنطاق والمواصفات — إلى جانب مالك المنتج.',
          'Research, Umfang und Spezifikation — neben einem Product Owner.',
        ),
      ),
      intro: l(
        L(
          'Product design and strategy lead, working alongside a named product owner and a collaborator who authored the project’s later-stage game and community spec.',
          'لیدِ طراحی محصول و استراتژی، در کنار یک مالک محصول مشخص و همکاری که مشخصات بازی و جامعهٔ مراحل بعدی پروژه را نوشت.',
          'قيادة تصميم المنتج والاستراتيجية، بالعمل إلى جانب مالك منتج محدّد ومتعاون كتب مواصفات الألعاب والمجتمع في مرحلة لاحقة من المشروع.',
          'Lead für Produktdesign und Strategie, in Zusammenarbeit mit einem benannten Product Owner und einem Mitwirkenden, der die spätere Spiel- und Community-Spezifikation des Projekts verfasste.',
        ),
      ),
      own: l(
        L(
          [
            'Gamification research: Octalysis across all 8 core drives, turned into an interactive scoring tool in English and Persian',
            'MVP scoping: three-tab navigation, a single club, a USDT-only economy',
            'Documented calls in the conflict-resolution log, including the Duel / Tournament / Rumble naming',
            'The full wireframe spec across all 16 sections, each with a per-screen copy audit',
          ],
          [
            'پژوهش گیمیفیکیشن: Octalysis در هر ۸ محرک اصلی، تبدیل‌شده به ابزار امتیازدهی تعاملی به انگلیسی و فارسی',
            'تعیین دامنهٔ MVP: ناوبری سه‌تبی، یک باشگاه واحد، اقتصادی فقط با USDT',
            'تصمیم‌های مستند در لاگ حل تعارض، از جمله نام‌گذاری Duel / Tournament / Rumble',
            'مشخصات کامل وایرفریم در هر ۱۶ بخش، هرکدام با ممیزی متن صفحه‌به‌صفحه',
          ],
          [
            'بحث التلعيب: Octalysis عبر المحرّكات الأساسية الثمانية كلها، محوَّلًا إلى أداة تقييم تفاعلية بالإنجليزية والفارسية',
            'تحديد نطاق الـ MVP: تنقّل بثلاثة تبويبات، ونادٍ واحد، واقتصاد بـ USDT فقط',
            'قرارات موثّقة في سجل حل النزاعات، ومنها تسمية Duel / Tournament / Rumble',
            'مواصفات الإطارات السلكية الكاملة عبر الأقسام الـ 16، لكل منها تدقيق نصوص لكل شاشة',
          ],
          [
            'Gamification-Research: Octalysis über alle 8 Core Drives, umgesetzt in ein interaktives Bewertungswerkzeug auf Englisch und Persisch',
            'MVP-Scoping: Drei-Tab-Navigation, ein einziger Club, eine reine USDT-Ökonomie',
            'Dokumentierte Entscheidungen im Conflict-Resolution-Log, darunter die Benennung Duel / Tournament / Rumble',
            'Die vollständige Wireframe-Spezifikation über alle 16 Bereiche, jeweils mit Copy-Audit pro Screen',
          ],
        ),
      ),
      coOwn: l(
        L(
          ['Product direction, with the product owner'],
          ['جهت‌گیری محصول، همراه با مالک محصول'],
          ['توجّه المنتج، مع مالك المنتج'],
          ['Produktausrichtung, gemeinsam mit dem Product Owner'],
        ),
      ),
      collaborate: l(
        L(
          [
            'The canonical game and community spec — written by a collaborator; it superseded my earlier community draft',
          ],
          ['مشخصات مرجع بازی و جامعه — نوشتهٔ یک همکار؛ جایگزین پیش‌نویس اولیهٔ جامعهٔ من شد'],
          ['مواصفات الألعاب والمجتمع المرجعية — كتبها متعاون؛ وحلّت محل مسودّتي الأولى للمجتمع'],
          [
            'Die kanonische Spiel- und Community-Spezifikation — von einem Mitwirkenden verfasst; sie löste meinen früheren Community-Entwurf ab',
          ],
        ),
      ),
    },
    {
      id: 'rp1-s07',
      blockType: 'csNarrative',
      label: 'approach',
      heading: l(
        L(
          'Research first, then mechanics, then a ruthless descope.',
          'اول پژوهش، بعد مکانیک‌ها، بعد یک کاهش دامنهٔ بی‌رحمانه.',
          'البحث أولًا، ثم الآليات، ثم تقليص نطاق صارم.',
          'Erst Research, dann Mechaniken, dann ein rigoroser Descope.',
        ),
      ),
      body: prose(
        dir,
        p(
          L(
            'Research came first: a wide pass across 20-plus competitive and casual-gaming platforms — Skillz, MPL, WinZO, Kongregate, Telegram mini-apps and others — then an Octalysis deep dive detailed enough to turn into an interactive scoring tool: an 8-drive audit, an octagon radar chart, journey-phase and engagement-loop builders and an ethics checklist.',
            'پژوهش اول آمد: مروری گسترده روی بیش از ۲۰ پلتفرم بازی رقابتی و تفننی — Skillz، MPL، WinZO، Kongregate، مینی‌اپ‌های تلگرام و دیگران — و سپس بررسی عمیق Octalysis، آن‌قدر دقیق که به ابزاری تعاملی برای امتیازدهی تبدیل شود: ممیزی ۸ محرک، نمودار رادار هشت‌ضلعی، سازندهٔ فازهای سفر و حلقه‌های درگیری، و چک‌لیست اخلاقی.',
            'جاء البحث أولًا: مسح واسع لأكثر من 20 منصة ألعاب تنافسية وعابرة — Skillz وMPL وWinZO وKongregate وتطبيقات تيليغرام المصغّرة وغيرها — ثم غوص معمّق في Octalysis مفصّل بما يكفي ليتحوّل إلى أداة تقييم تفاعلية: تدقيق للمحرّكات الثمانية، ومخطط رادار ثماني، وأدوات بناء لمراحل الرحلة وحلقات الانخراط، وقائمة تحقق أخلاقية.',
            'Zuerst kam das Research: ein breiter Durchgang über mehr als 20 Wettbewerbs- und Casual-Gaming-Plattformen — Skillz, MPL, WinZO, Kongregate, Telegram-Mini-Apps und andere —, dann ein Octalysis-Deep-Dive, detailliert genug für ein interaktives Bewertungswerkzeug: ein Audit über 8 Drives, ein achteckiges Radardiagramm, Builder für Journey-Phasen und Engagement-Loops und eine Ethik-Checkliste.',
          ),
        ),
        p(
          L(
            'From there, mechanics design: three mapped systems — a value-creation loop (how a low-balance player earns their way back in), an engagement loop (tournament, duel or club-store choices for a funded player) and a club retention loop with a formal state machine.',
            'از آنجا، طراحی مکانیک‌ها: سه سیستم نقشه‌برداری‌شده — حلقهٔ خلق ارزش (بازیکن کم‌موجودی چگونه راه بازگشتش را به دست می‌آورد)، حلقهٔ درگیری (انتخاب تورنمنت، دوئل یا فروشگاه باشگاه برای بازیکن دارای موجودی) و حلقهٔ حفظ باشگاه با یک ماشین حالت رسمی.',
            'ومن هناك، تصميم الآليات: ثلاثة أنظمة مرسومة — حلقة خلق القيمة (كيف يكسب اللاعب منخفض الرصيد طريق عودته)، وحلقة الانخراط (خيارات البطولة أو المبارزة أو متجر النادي للاعب الممول)، وحلقة الاحتفاظ بالنادي بآلة حالات رسمية.',
            'Von dort das Mechanik-Design: drei abgebildete Systeme — ein Wertschöpfungs-Loop (wie sich ein Spieler mit niedrigem Guthaben den Weg zurück verdient), ein Engagement-Loop (Turnier-, Duell- oder Club-Store-Optionen für einen finanzierten Spieler) und ein Club-Retention-Loop mit einer formalen State Machine.',
          ),
        ),
        p(
          L(
            'MVP descoping followed, tracked in a dated conflict-resolution log rather than left as silent rewrites. A 20-component reuse audit, ranked by reuse score, fed a full wireframe pass across all 16 sections — each with its own per-screen copy audit and a P1/P2/P3 issue log.',
            'سپس کاهش دامنهٔ MVP آمد، ثبت‌شده در یک لاگ حل تعارضِ تاریخ‌دار به جای بازنویسی‌های خاموش. ممیزی استفادهٔ مجدد ۲۰ کامپوننت، رتبه‌بندی‌شده بر اساس امتیاز استفادهٔ مجدد، به وایرفریم کامل هر ۱۶ بخش خوراک داد — هرکدام با ممیزی متن صفحه‌به‌صفحه و لاگ مسائل P1/P2/P3.',
            'ثم جاء تقليص نطاق الـ MVP، متتبَّعًا في سجل حل نزاعات مؤرَّخ بدل تركه إعادات كتابة صامتة. وغذّى تدقيق لإعادة استخدام 20 مكوّنًا، مرتَّبًا بدرجة إعادة الاستخدام، مرورًا كاملًا بالإطارات السلكية عبر الأقسام الـ 16 — لكل منها تدقيق نصوص لكل شاشة وسجل مشكلات P1/P2/P3.',
            'Es folgte das MVP-Descoping, festgehalten in einem datierten Conflict-Resolution-Log statt in stillen Umschreibungen. Ein Reuse-Audit über 20 Komponenten, nach Reuse-Score sortiert, speiste einen vollständigen Wireframe-Durchgang über alle 16 Bereiche — jeder mit eigenem Copy-Audit pro Screen und einem P1/P2/P3-Issue-Log.',
          ),
        ),
      ),
    },
    {
      id: 'rp1-s08',
      blockType: 'csProcess',
      kind: 'process',
      heading: l(
        L(
          'Six passes, in order',
          'شش گذر، به ترتیب',
          'ستّ مراحل، بالترتيب',
          'Sechs Durchgänge, der Reihe nach',
        ),
      ),
      steps: [
        {
          id: 'rp1-p01',
          code: 'R1',
          label: l(L('Platform research', 'پژوهش پلتفرم‌ها', 'بحث المنصات', 'Plattform-Research')),
          note: l(
            L(
              '20-plus competitive and casual-gaming platforms',
              'بیش از ۲۰ پلتفرم بازی رقابتی و تفننی',
              'أكثر من 20 منصة ألعاب تنافسية وعابرة',
              'Mehr als 20 Wettbewerbs- und Casual-Gaming-Plattformen',
            ),
          ),
        },
        {
          id: 'rp1-p02',
          code: 'R2',
          label: l(L('Octalysis audit', 'ممیزی Octalysis', 'تدقيق Octalysis', 'Octalysis-Audit')),
          note: l(
            L(
              '8 core drives → an interactive scoring tool',
              '۸ محرک اصلی ← ابزار امتیازدهی تعاملی',
              '8 محرّكات أساسية ← أداة تقييم تفاعلية',
              '8 Core Drives → ein interaktives Bewertungswerkzeug',
            ),
          ),
        },
        {
          id: 'rp1-p03',
          code: 'M1',
          label: l(L('Mechanics loops', 'حلقه‌های مکانیک', 'حلقات الآليات', 'Mechanik-Loops')),
          note: l(
            L(
              'Value creation, engagement, club retention',
              'خلق ارزش، درگیری، حفظ باشگاه',
              'خلق القيمة، والانخراط، والاحتفاظ بالنادي',
              'Wertschöpfung, Engagement, Club-Retention',
            ),
          ),
        },
        {
          id: 'rp1-p04',
          code: 'S1',
          label: l(L('MVP descope', 'کاهش دامنهٔ MVP', 'تقليص نطاق الـ MVP', 'MVP-Descope')),
          note: l(
            L(
              'Dated conflict-resolution log',
              'لاگ حل تعارض تاریخ‌دار',
              'سجل حل نزاعات مؤرَّخ',
              'Datiertes Conflict-Resolution-Log',
            ),
          ),
        },
        {
          id: 'rp1-p05',
          code: 'C1',
          label: l(
            L(
              'Component reuse audit',
              'ممیزی استفادهٔ مجدد کامپوننت‌ها',
              'تدقيق إعادة استخدام المكوّنات',
              'Komponenten-Reuse-Audit',
            ),
          ),
          note: l(
            L(
              '20 components ranked, an 18-item gap list',
              '۲۰ کامپوننت رتبه‌بندی‌شده، فهرست ۱۸ موردی کاستی‌ها',
              '20 مكوّنًا مرتَّبًا، وقائمة ثغرات من 18 بندًا',
              '20 Komponenten bewertet, eine 18-Punkte-Lückenliste',
            ),
          ),
        },
        {
          id: 'rp1-p06',
          code: 'W1',
          label: l(
            L('Wireframe pass', 'گذر وایرفریم', 'مرور الإطارات السلكية', 'Wireframe-Durchgang'),
          ),
          note: l(
            L(
              '16 sections, copy audit, P1–P3 issue log',
              '۱۶ بخش، ممیزی متن، لاگ مسائل P1–P3',
              '16 قسمًا، وتدقيق نصوص، وسجل مشكلات P1–P3',
              '16 Bereiche, Copy-Audit, P1–P3-Issue-Log',
            ),
          ),
        },
      ],
    },
    {
      id: 'rp1-s09',
      blockType: 'csProcess',
      kind: 'loop',
      heading: l(
        L(
          'The club retention loop',
          'حلقهٔ حفظ باشگاه',
          'حلقة الاحتفاظ بالنادي',
          'Der Club-Retention-Loop',
        ),
      ),
      steps: [
        {
          id: 'rp1-l01',
          code: 'L1',
          label: l(L('Open the club', 'باز کردن باشگاه', 'فتح النادي', 'Den Club öffnen')),
        },
        {
          id: 'rp1-l02',
          code: 'L2',
          label: l(L('See an opportunity', 'دیدن یک فرصت', 'رؤية فرصة', 'Eine Gelegenheit sehen')),
        },
        { id: 'rp1-l03', code: 'L3', label: l(L('Compete', 'رقابت کردن', 'التنافس', 'Antreten')) },
        {
          id: 'rp1-l04',
          code: 'L4',
          label: l(
            L(
              'The result lands in the feed',
              'نتیجه در فید می‌نشیند',
              'تصل النتيجة إلى الموجز',
              'Das Ergebnis landet im Feed',
            ),
          ),
          note: l(
            L(
              'Win, near-miss, level-up, daily summary',
              'برد، نزدیک‌به‌برد، ارتقای سطح، خلاصهٔ روزانه',
              'فوز، أو اقتراب من الفوز، أو رفع مستوى، أو ملخص يومي',
              'Sieg, Beinahe-Treffer, Level-up, Tagesrückblick',
            ),
          ),
        },
      ],
    },
    {
      id: 'rp1-s10',
      blockType: 'csDecisions',
      heading: l(
        L(
          'Four calls that shaped the MVP',
          'چهار تصمیمی که MVP را شکل دادند',
          'أربعة قرارات شكّلت الـ MVP',
          'Vier Entscheidungen, die das MVP geprägt haben',
        ),
      ),
      lede: l(
        L(
          'Recorded in the project’s dated conflict-resolution log, not decided in passing.',
          'ثبت‌شده در لاگ حل تعارضِ تاریخ‌دار پروژه، نه تصمیم‌هایی گذرا.',
          'مسجَّلة في سجل حل النزاعات المؤرَّخ للمشروع، لا قرارات عابرة.',
          'Festgehalten im datierten Conflict-Resolution-Log des Projekts, nicht nebenbei entschieden.',
        ),
      ),
      items: [
        {
          id: 'rp1-d01',
          title: l(
            L(
              'Lock navigation to three tabs: Club, Game, Wallet.',
              'ناوبری را روی سه تب قفل کن: باشگاه، بازی، کیف پول.',
              'تثبيت التنقّل على ثلاثة تبويبات: النادي، واللعبة، والمحفظة.',
              'Die Navigation auf drei Tabs festlegen: Club, Game, Wallet.',
            ),
          ),
          why: l(
            L(
              'An earlier, much larger vision — a utility token, in-app betting, player-owned clubs and club stores — was cut down to a USDT-only, single-club product.',
              'چشم‌اندازی قدیمی‌تر و بسیار بزرگ‌تر — توکن کاربردی، شرط‌بندی درون‌برنامه‌ای، باشگاه‌های متعلق به بازیکنان و فروشگاه‌های باشگاه — به محصولی فقط با USDT و یک باشگاه واحد کاهش یافت.',
              'قُلِّصت رؤية سابقة أكبر بكثير — عملة منفعة، ورهان داخل التطبيق، وأندية يملكها اللاعبون، ومتاجر أندية — إلى منتج بـ USDT فقط ونادٍ واحد.',
              'Eine frühere, viel größere Vision — ein Utility-Token, In-App-Wetten, Clubs im Besitz der Spieler und Club-Stores — wurde auf ein reines USDT-Produkt mit einem einzigen Club zurechtgestutzt.',
            ),
          ),
          alternatives: l(
            L(
              'The earlier vision: a utility token, in-app betting, player-owned clubs and club stores.',
              'چشم‌انداز قبلی: توکن کاربردی، شرط‌بندی درون‌برنامه‌ای، باشگاه‌های متعلق به بازیکنان و فروشگاه‌های باشگاه.',
              'الرؤية السابقة: عملة منفعة، ورهان داخل التطبيق، وأندية يملكها اللاعبون، ومتاجر أندية.',
              'Die frühere Vision: ein Utility-Token, In-App-Wetten, Clubs im Spielerbesitz und Club-Stores.',
            ),
          ),
          tradeoff: l(
            L(
              'A smaller economy — one club, no club stores, no token — in exchange for a scope that could be fully resolved.',
              'اقتصادی کوچک‌تر — یک باشگاه، بدون فروشگاه باشگاه، بدون توکن — در ازای دامنه‌ای که می‌شد کاملاً مشخصش کرد.',
              'اقتصاد أصغر — نادٍ واحد، ولا متاجر أندية، ولا عملة — مقابل نطاق يمكن حسمه بالكامل.',
              'Eine kleinere Ökonomie — ein Club, keine Club-Stores, kein Token — im Tausch gegen einen Umfang, der sich vollständig klären ließ.',
            ),
          ),
          evidence: l(
            L(
              'A fully resolved MVP scope and a 34-component build catalog (9 reused, 25 net-new) with a 3-week build order.',
              'دامنهٔ MVP کاملاً مشخص و کاتالوگ ساخت ۳۴ کامپوننتی (۹ استفادهٔ مجدد، ۲۵ جدید) با ترتیب ساخت سه‌هفته‌ای.',
              'نطاق MVP محسوم بالكامل وكتالوج بناء من 34 مكوّنًا (9 مُعاد استخدامها و25 جديدة) مع ترتيب بناء لثلاثة أسابيع.',
              'Ein vollständig geklärter MVP-Umfang und ein Build-Katalog mit 34 Komponenten (9 wiederverwendet, 25 neu) mit einer dreiwöchigen Build-Reihenfolge.',
            ),
          ),
          ...(media.levelUp1 ? { media: media.levelUp1 } : {}),
        },
        {
          id: 'rp1-d02',
          title: l(
            L(
              'Rename the formats: Duel, Tournament, Rumble.',
              'قالب‌ها را بازنام‌گذاری کن: Duel، Tournament، Rumble.',
              'إعادة تسمية الصيغ: Duel وTournament وRumble.',
              'Die Formate umbenennen: Duel, Tournament, Rumble.',
            ),
          ),
          why: l(
            L(
              'Three plain names replaced the earlier scheme, resolved in the dated conflict-resolution log rather than by a silent rewrite, so the whole team worked from one current naming.',
              'سه نام ساده جایگزین طرح قبلی شد، در لاگ حل تعارضِ تاریخ‌دار حل‌وفصل شد نه با بازنویسی خاموش، تا کل تیم با یک نام‌گذاری روز کار کند.',
              'حلّت ثلاثة أسماء بسيطة محل المخطط السابق، وحُسم الأمر في سجل حل النزاعات المؤرَّخ لا بإعادة كتابة صامتة، فعمل الفريق كله من تسمية واحدة حالية.',
              'Drei schlichte Namen ersetzten das frühere Schema, geklärt im datierten Conflict-Resolution-Log statt durch stilles Umschreiben, sodass das ganze Team mit einer aktuellen Benennung arbeitete.',
            ),
          ),
          alternatives: l(
            L(
              'Keep “PVP / Public Battle / Family & Friends Battle”.',
              'حفظ «PVP / Public Battle / Family & Friends Battle».',
              'الإبقاء على «PVP / Public Battle / Family & Friends Battle».',
              '„PVP / Public Battle / Family & Friends Battle“ beibehalten.',
            ),
          ),
          evidence: l(
            L(
              'Credited in the project’s conflict-resolution log.',
              'در لاگ حل تعارض پروژه ثبت و اعتباردهی شده است.',
              'مُثبَت في سجل حل النزاعات الخاص بالمشروع.',
              'Im Conflict-Resolution-Log des Projekts vermerkt.',
            ),
          ),
        },
        {
          id: 'rp1-d03',
          title: l(
            L(
              'Turn the Octalysis analysis into a live scoring instrument.',
              'تحلیل Octalysis را به یک ابزار امتیازدهی زنده تبدیل کن.',
              'تحويل تحليل Octalysis إلى أداة تقييم حيّة.',
              'Die Octalysis-Analyse in ein lebendiges Bewertungsinstrument verwandeln.',
            ),
          ),
          why: l(
            L(
              'Rather than writing the framework analysis up as a document, a small interactive React tool made it a working instrument — an 8-drive audit, an octagon radar chart, journey-phase and engagement-loop builders and an ethics checklist — in English and Persian.',
              'به جای نوشتن تحلیل چارچوب در قالب یک سند، یک ابزار کوچک تعاملی با React آن را به ابزاری کارا تبدیل کرد — ممیزی ۸ محرک، نمودار رادار هشت‌ضلعی، سازندهٔ فازهای سفر و حلقه‌های درگیری، و چک‌لیست اخلاقی — به انگلیسی و فارسی.',
              'بدل كتابة تحليل الإطار كوثيقة، جعلته أداة React تفاعلية صغيرة أداةً عاملة — تدقيق للمحرّكات الثمانية، ومخطط رادار ثماني، وأدوات بناء لمراحل الرحلة وحلقات الانخراط، وقائمة تحقق أخلاقية — بالإنجليزية والفارسية.',
              'Statt die Framework-Analyse als Dokument aufzuschreiben, machte ein kleines interaktives React-Tool sie zum Arbeitsinstrument — ein Audit über 8 Drives, ein achteckiges Radardiagramm, Builder für Journey-Phasen und Engagement-Loops und eine Ethik-Checkliste — auf Englisch und Persisch.',
            ),
          ),
          tradeoff: l(
            L(
              'Time spent on tooling instead of more screens; the tool now stands as a reusable artifact independent of RP1.',
              'زمانی که به جای صفحه‌های بیشتر صرف ابزارسازی شد؛ ابزار اکنون مصنوعی قابل استفادهٔ مجدد و مستقل از RP1 است.',
              'وقت أُنفق على الأدوات بدل مزيد من الشاشات؛ والأداة تقف الآن كمُنتَج قابل لإعادة الاستخدام مستقل عن RP1.',
              'Zeit für Tooling statt für weitere Screens; das Werkzeug ist heute ein wiederverwendbares Artefakt unabhängig von RP1.',
            ),
          ),
          evidence: l(
            L(
              'Every mechanic scored against the framework’s White-Hat / Black-Hat balance.',
              'هر مکانیک با تعادل White-Hat / Black-Hat چارچوب امتیازدهی شد.',
              'قُيِّمت كل آلية وفق توازن White-Hat / Black-Hat في الإطار.',
              'Jede Mechanik wurde an der White-Hat-/Black-Hat-Balance des Frameworks gemessen.',
            ),
          ),
        },
        {
          id: 'rp1-d04',
          title: l(
            L(
              'Mark the older community spec as superseded instead of replacing it quietly.',
              'مشخصات قدیمی جامعه را منسوخ اعلام کن، به جای جایگزینی بی‌سروصدا.',
              'وسم مواصفات المجتمع الأقدم بأنها مُلغاة بدل استبدالها بهدوء.',
              'Die ältere Community-Spezifikation als abgelöst kennzeichnen, statt sie still zu ersetzen.',
            ),
          ),
          why: l(
            L(
              'Formally marking the earlier community draft as superseded by the collaborator’s canonical game and community spec kept the whole team working from the same current truth instead of arguing from stale docs.',
              'اعلام رسمیِ منسوخ شدن پیش‌نویس اولیهٔ جامعه به نفع مشخصات مرجع بازی و جامعهٔ همکار، کل تیم را روی یک حقیقت روز نگه داشت، به جای بحث بر سر اسناد کهنه.',
              'إن الوسم الرسمي لمسودّة المجتمع السابقة بأنها مُلغاة لصالح مواصفات الألعاب والمجتمع المرجعية التي كتبها المتعاون أبقى الفريق كله يعمل من الحقيقة الحالية نفسها بدل الجدال من وثائق قديمة.',
              'Den früheren Community-Entwurf formal als durch die kanonische Spiel- und Community-Spezifikation des Mitwirkenden abgelöst zu kennzeichnen, hielt das ganze Team bei derselben aktuellen Wahrheit, statt über veraltete Dokumente zu streiten.',
            ),
          ),
          tradeoff: l(
            L(
              'The superseded draft was my own.',
              'پیش‌نویس منسوخ‌شده، نوشتهٔ خودم بود.',
              'المسودّة المُلغاة كانت مسودّتي أنا.',
              'Der abgelöste Entwurf war mein eigener.',
            ),
          ),
          evidence: l(
            L(
              'Recorded in the conflict-resolution log.',
              'در لاگ حل تعارض ثبت شده است.',
              'مسجَّل في سجل حل النزاعات.',
              'Im Conflict-Resolution-Log festgehalten.',
            ),
          ),
        },
      ],
    },
    {
      id: 'rp1-s11',
      blockType: 'csNarrative',
      label: 'solution',
      heading: l(
        L(
          'One app, three tabs, every section wireframed.',
          'یک اپ، سه تب، وایرفریم برای همهٔ بخش‌ها.',
          'تطبيق واحد، وثلاثة تبويبات، وإطارات سلكية لكل قسم.',
          'Eine App, drei Tabs, jeder Bereich als Wireframe.',
        ),
      ),
      body: prose(
        dir,
        p(
          L(
            'The spec covers the whole app: onboarding with Google, Apple or email and OTP verification; a Games hub aggregating Solo Challenge, Duel, Team Battle and Tournaments; Today Spotlight, a daily single-game competition with a ticket buy-in and live leaderboard; Weekly Legend, a 7-day cross-game competition; Lucky Wheel; Chat; Notifications as rich transactional cards; a USDT-only Wallet with an earnings breakdown; Profile with achievements and an XP-style roadmap; and Settings.',
            'مشخصات کل اپ را پوشش می‌دهد: ورود با گوگل، اپل یا ایمیل و تأیید OTP؛ هاب بازی‌ها با Solo Challenge، Duel، Team Battle و Tournaments؛ Today Spotlight، رقابت روزانهٔ تک‌بازی با بلیت ورودی و جدول زنده؛ Weekly Legend، رقابت هفت‌روزهٔ چندبازی؛ Lucky Wheel؛ چت؛ اعلان‌ها به شکل کارت‌های تراکنشی غنی؛ کیف پول فقط با USDT و تفکیک درآمد؛ پروفایل با دستاوردها و نقشهٔ راهی به سبک XP؛ و تنظیمات.',
            'تغطي المواصفات التطبيق كله: تسجيل الدخول بحساب Google أو Apple أو البريد مع تحقق OTP؛ ومركز ألعاب يجمع Solo Challenge وDuel وTeam Battle وTournaments؛ وToday Spotlight، مسابقة يومية بلعبة واحدة بتذكرة دخول ولوحة صدارة مباشرة؛ وWeekly Legend، مسابقة عبر الألعاب لسبعة أيام؛ وLucky Wheel؛ والدردشة؛ والإشعارات كبطاقات معاملاتية غنية؛ ومحفظة بـ USDT فقط مع تفصيل الأرباح؛ وملف شخصي بإنجازات وخريطة طريق بأسلوب XP؛ والإعدادات.',
            'Die Spezifikation deckt die ganze App ab: Onboarding mit Google, Apple oder E-Mail und OTP-Verifizierung; ein Games-Hub mit Solo Challenge, Duel, Team Battle und Tournaments; Today Spotlight, ein täglicher Einzelspiel-Wettbewerb mit Ticket-Buy-in und Live-Leaderboard; Weekly Legend, ein siebentägiger spielübergreifender Wettbewerb; Lucky Wheel; Chat; Benachrichtigungen als reichhaltige Transaktionskarten; eine reine USDT-Wallet mit Ertragsaufschlüsselung; Profil mit Erfolgen und einer XP-artigen Roadmap; und Einstellungen.',
          ),
        ),
        p(
          L(
            'Navigation is locked to three tabs — Club, Game, Wallet — with a single reusable Feed Card pattern (win announcement, tournament starting, near-miss, level-up, daily summary) carrying the Club tab. Three animation systems complete the spec: a profile-entry sequence, a six-keyframe level-up and ten event-based overlays.',
            'ناوبری روی سه تب قفل شده — باشگاه، بازی، کیف پول — و یک الگوی Feed Card قابل استفادهٔ مجدد (اعلام برد، شروع تورنمنت، نزدیک‌به‌برد، ارتقای سطح، خلاصهٔ روزانه) تب باشگاه را می‌گرداند. سه سیستم انیمیشن مشخصات را کامل می‌کنند: توالی ورود به پروفایل، ارتقای سطح شش‌فریمی و ده روکش رویدادمحور.',
            'التنقّل مثبَّت على ثلاثة تبويبات — النادي، واللعبة، والمحفظة — مع نمط Feed Card واحد قابل لإعادة الاستخدام (إعلان فوز، وبدء بطولة، واقتراب من الفوز، ورفع مستوى، وملخص يومي) يحمل تبويب النادي. وتكمل المواصفات ثلاثة أنظمة حركة: تسلسل دخول الملف الشخصي، ورفع مستوى بستة إطارات مفتاحية، وعشر طبقات قائمة على الأحداث.',
            'Die Navigation ist auf drei Tabs festgelegt — Club, Game, Wallet — mit einem einzigen wiederverwendbaren Feed-Card-Muster (Siegmeldung, Turnierstart, Beinahe-Treffer, Level-up, Tagesrückblick), das den Club-Tab trägt. Drei Animationssysteme vervollständigen die Spezifikation: eine Profil-Einstiegssequenz, ein Level-up mit sechs Keyframes und zehn ereignisbasierte Overlays.',
          ),
        ),
      ),
    },
    {
      id: 'rp1-s12',
      blockType: 'csFigure',
      layout: 'sequence',
      treatment: 'auto',
      items: [
        ...item('duelMain', 'rp1-f12-1'),
        ...item('duelSetup', 'rp1-f12-2'),
        ...item('duelSetupSelected', 'rp1-f12-3'),
      ],
      caption: l(
        L(
          'The duel flow: pick an opponent — a friend or a skill-matched stranger — then a player, a format (time limited or race to target) and the stake.',
          'جریان دوئل: انتخاب حریف — یک دوست یا غریبه‌ای هم‌سطح — سپس بازیکن، قالب (زمان‌دار یا مسابقه تا امتیاز هدف) و شرط.',
          'مسار المبارزة: اختيار خصم — صديق أو غريب مطابق للمهارة — ثم لاعب، وصيغة (محدودة الوقت أو سباق إلى الهدف)، والرهان.',
          'Der Duell-Flow: einen Gegner wählen — einen Freund oder einen nach Können zugeordneten Fremden —, dann einen Spieler, ein Format (zeitlich begrenzt oder Race to Target) und den Einsatz.',
        ),
      ),
    },
    {
      id: 'rp1-s13',
      blockType: 'csFigure',
      layout: 'sequence',
      treatment: 'auto',
      items: [
        ...item('spotlightNearMiss', 'rp1-f13-1'),
        ...item('spotlightTop', 'rp1-f13-2'),
        ...item('spotlightEnded', 'rp1-f13-3'),
      ],
      caption: l(
        L(
          'Today’s Spotlight after a run: the near-miss sheet shows the points to the next rank while the ticket is still live; holding first place promises a notification if someone takes the spot; when the Spotlight ends, the final rank and tomorrow’s start time.',
          'Today’s Spotlight پس از یک دور بازی: برگهٔ نزدیک‌به‌برد تا وقتی بلیت زنده است، امتیاز لازم تا رتبهٔ بعدی را نشان می‌دهد؛ رتبهٔ اول وعدهٔ اعلان می‌دهد اگر کسی جایش را بگیرد؛ و با پایان Spotlight، رتبهٔ نهایی و زمان شروع فردا.',
          'Today’s Spotlight بعد جولة: تُظهر ورقة الاقتراب من الفوز النقاط اللازمة للترتيب التالي ما دامت التذكرة سارية؛ ويعد المركز الأول بإشعار إن أخذ أحدهم المكان؛ وعند انتهاء الـ Spotlight، الترتيب النهائي وموعد بدء الغد.',
          'Today’s Spotlight nach einer Runde: Das Beinahe-Treffer-Sheet zeigt die Punkte bis zum nächsten Rang, solange das Ticket läuft; Platz eins verspricht eine Benachrichtigung, falls jemand den Platz übernimmt; endet das Spotlight, folgen Endrang und die Startzeit von morgen.',
        ),
      ),
    },
    {
      id: 'rp1-s14',
      blockType: 'csFigure',
      layout: 'annotated',
      treatment: 'plain',
      items: item('wallet', 'rp1-f14-1'),
      annotations: [
        {
          id: 'rp1-a14-1',
          text: l(
            L(
              'Total balance in USDT — the only currency in the app',
              'موجودی کل به USDT — تنها ارز اپ',
              'الرصيد الإجمالي بـ USDT — العملة الوحيدة في التطبيق',
              'Gesamtguthaben in USDT — die einzige Währung der App',
            ),
          ),
        },
        {
          id: 'rp1-a14-2',
          text: l(
            L(
              'Withdraw and deposit',
              'برداشت و واریز',
              'السحب والإيداع',
              'Auszahlen und Einzahlen',
            ),
          ),
        },
        {
          id: 'rp1-a14-3',
          text: l(
            L(
              'Earnings broken down by source: ads, referral, deposit, battle',
              'درآمد به تفکیک منبع: تبلیغ، معرفی، واریز، نبرد',
              'الأرباح مفصّلة حسب المصدر: الإعلانات، والإحالة، والإيداع، والمعركة',
              'Erträge nach Quelle: Ads, Referral, Deposit, Battle',
            ),
          ),
        },
        {
          id: 'rp1-a14-4',
          text: l(
            L(
              'The on-chain wallet and sending money',
              'کیف پول زنجیره‌ای و ارسال پول',
              'المحفظة على السلسلة وإرسال المال',
              'Die On-Chain-Wallet und Geld senden',
            ),
          ),
        },
        {
          id: 'rp1-a14-5',
          text: l(
            L(
              'Available, in-play and pending balances',
              'موجودی‌های در دسترس، در بازی و در انتظار',
              'الأرصدة المتاحة وقيد اللعب والمعلّقة',
              'Verfügbare, im Spiel befindliche und ausstehende Guthaben',
            ),
          ),
        },
      ],
      caption: l(
        L(
          'The Wallet: one currency, every earning source visible, and the funds locked in play shown separately.',
          'کیف پول: یک ارز، هر منبع درآمد قابل مشاهده، و پول درگیر در بازی جداگانه نشان داده می‌شود.',
          'المحفظة: عملة واحدة، وكل مصادر الأرباح ظاهرة، والأموال المحجوزة في اللعب معروضة على حدة.',
          'Die Wallet: eine Währung, jede Ertragsquelle sichtbar, und die im Spiel gebundenen Mittel getrennt ausgewiesen.',
        ),
      ),
    },
    {
      id: 'rp1-s15',
      blockType: 'csFigure',
      layout: 'sequence',
      treatment: 'auto',
      items: [
        ...item('levelUp1', 'rp1-f15-1'),
        ...item('levelUp2', 'rp1-f15-2'),
        ...item('levelUp3', 'rp1-f15-3'),
      ],
      caption: l(
        L(
          'Three of the six keyframes of the level-up animation: the profile avatar gives way to the new level number.',
          'سه فریم از شش فریم کلیدی انیمیشن ارتقای سطح: آواتار پروفایل جای خود را به عدد سطح جدید می‌دهد.',
          'ثلاثة من الإطارات المفتاحية الستة لحركة رفع المستوى: الصورة الرمزية للملف الشخصي تفسح المجال لرقم المستوى الجديد.',
          'Drei der sechs Keyframes der Level-up-Animation: Der Profil-Avatar macht der neuen Levelnummer Platz.',
        ),
      ),
    },
    {
      id: 'rp1-s16',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'auto',
      items: item('notifications', 'rp1-f16-1'),
      caption: l(
        L(
          'Notifications are transactional cards — deposit, withdrawal, prize, duel and rumble results — each with its own actions.',
          'اعلان‌ها کارت‌های تراکنشی‌اند — واریز، برداشت، جایزه، نتیجهٔ دوئل و رامبل — هرکدام با اقدام‌های خودش.',
          'الإشعارات بطاقات معاملاتية — إيداع، وسحب، وجائزة، ونتائج مبارزات ورامبل — لكل منها إجراءاتها.',
          'Benachrichtigungen sind Transaktionskarten — Einzahlung, Auszahlung, Preis, Duell- und Rumble-Ergebnisse — jede mit eigenen Aktionen.',
        ),
      ),
    },
    {
      id: 'rp1-s17',
      blockType: 'csOutcomes',
      heading: l(
        L(
          'What came out of this phase',
          'حاصل این مرحله',
          'ما خرج من هذه المرحلة',
          'Was aus dieser Phase hervorging',
        ),
      ),
      intro: l(
        L(
          'RP1 is pre-launch — there is no shipped-product metric to report yet, and this case study doesn’t pretend otherwise.',
          'RP1 هنوز منتشر نشده — هنوز هیچ معیار محصولِ منتشرشده‌ای برای گزارش نیست، و این مطالعهٔ موردی وانمود نمی‌کند که هست.',
          'RP1 لم يُطلق بعد — لا مقياس منتج مُطلَق للإبلاغ عنه حتى الآن، وهذه الدراسة لا تدّعي غير ذلك.',
          'RP1 ist noch vor dem Launch — es gibt noch keine Kennzahl eines veröffentlichten Produkts, und diese Fallstudie tut nicht so, als gäbe es eine.',
        ),
      ),
      items: [
        {
          id: 'rp1-o01',
          kind: 'delivered',
          label: l(
            L(
              'A fully resolved MVP scope',
              'یک دامنهٔ MVP کاملاً مشخص',
              'نطاق MVP محسوم بالكامل',
              'Ein vollständig geklärter MVP-Umfang',
            ),
          ),
          context: l(
            L(
              'Three-tab navigation, a single club and a USDT-only economy.',
              'ناوبری سه‌تبی، یک باشگاه واحد و اقتصادی فقط با USDT.',
              'تنقّل بثلاثة تبويبات، ونادٍ واحد، واقتصاد بـ USDT فقط.',
              'Drei-Tab-Navigation, ein einziger Club und eine reine USDT-Ökonomie.',
            ),
          ),
          source: l(
            L(
              'RP1 MVP scope and conflict-resolution log',
              'دامنهٔ MVP و لاگ حل تعارض RP1',
              'نطاق MVP وسجل حل النزاعات في RP1',
              'RP1-MVP-Umfang und Conflict-Resolution-Log',
            ),
          ),
        },
        {
          id: 'rp1-o02',
          kind: 'delivered',
          label: l(
            L(
              'A build catalog of 34 components',
              'کاتالوگ ساخت با ۳۴ کامپوننت',
              'كتالوج بناء من 34 مكوّنًا',
              'Ein Build-Katalog mit 34 Komponenten',
            ),
          ),
          context: l(
            L(
              '9 reused, 25 net-new, sequenced into a 3-week build order.',
              '۹ استفادهٔ مجدد، ۲۵ جدید، چیده‌شده در ترتیب ساخت سه‌هفته‌ای.',
              '9 مُعاد استخدامها و25 جديدة، مرتَّبة في ترتيب بناء لثلاثة أسابيع.',
              '9 wiederverwendet, 25 neu, in eine dreiwöchige Build-Reihenfolge gebracht.',
            ),
          ),
          source: l(
            L('RP1 build catalog', 'کاتالوگ ساخت RP1', 'كتالوج بناء RP1', 'RP1-Build-Katalog'),
          ),
        },
        {
          id: 'rp1-o03',
          kind: 'delivered',
          label: l(
            L(
              'A wireframe spec across all 16 sections',
              'مشخصات وایرفریم در هر ۱۶ بخش',
              'مواصفات إطارات سلكية عبر الأقسام الـ 16',
              'Eine Wireframe-Spezifikation über alle 16 Bereiche',
            ),
          ),
          context: l(
            L(
              'Each with a per-screen copy audit and a P1/P2/P3 issue log; 73 exported screens.',
              'هرکدام با ممیزی متن صفحه‌به‌صفحه و لاگ مسائل P1/P2/P3؛ ۷۳ صفحهٔ خروجی‌گرفته‌شده.',
              'لكل منها تدقيق نصوص لكل شاشة وسجل مشكلات P1/P2/P3؛ و73 شاشة مُصدَّرة.',
              'Jeder mit Copy-Audit pro Screen und einem P1/P2/P3-Issue-Log; 73 exportierte Screens.',
            ),
          ),
          source: l(
            L(
              'Figma — Game Design file',
              'Figma — فایل Game Design',
              'Figma — ملف Game Design',
              'Figma — Game-Design-Datei',
            ),
          ),
        },
        {
          id: 'rp1-o04',
          kind: 'delivered',
          label: l(
            L(
              'A reusable interactive Octalysis tool',
              'یک ابزار تعاملی Octalysis قابل استفادهٔ مجدد',
              'أداة Octalysis تفاعلية قابلة لإعادة الاستخدام',
              'Ein wiederverwendbares interaktives Octalysis-Werkzeug',
            ),
          ),
          context: l(
            L(
              '8-drive audit, radar chart, journey and loop builders, ethics checklist — in English and Persian.',
              'ممیزی ۸ محرک، نمودار رادار، سازندهٔ سفر و حلقه، چک‌لیست اخلاقی — به انگلیسی و فارسی.',
              'تدقيق للمحرّكات الثمانية، ومخطط رادار، وأدوات بناء للرحلة والحلقات، وقائمة تحقق أخلاقية — بالإنجليزية والفارسية.',
              'Audit über 8 Drives, Radardiagramm, Journey- und Loop-Builder, Ethik-Checkliste — auf Englisch und Persisch.',
            ),
          ),
          source: l(
            L(
              'html5-game-gamification-system (React)',
              'html5-game-gamification-system (React)',
              'html5-game-gamification-system (React)',
              'html5-game-gamification-system (React)',
            ),
          ),
        },
      ],
      shipped: l(
        L(
          [
            'Onboarding, Games hub, Today Spotlight, Weekly Legend, Duel, Lucky Wheel, Chat, Notifications, Wallet, Profile and Settings — wireframed',
            'Three animation systems: profile entry, six-keyframe level-up, ten event overlays',
            'One reusable Feed Card pattern carrying the Club tab',
          ],
          [
            'ورود، هاب بازی‌ها، Today Spotlight، Weekly Legend، Duel، Lucky Wheel، چت، اعلان‌ها، کیف پول، پروفایل و تنظیمات — وایرفریم‌شده',
            'سه سیستم انیمیشن: ورود به پروفایل، ارتقای سطح شش‌فریمی، ده روکش رویدادمحور',
            'یک الگوی Feed Card قابل استفادهٔ مجدد که تب باشگاه را می‌گرداند',
          ],
          [
            'تسجيل الدخول، ومركز الألعاب، وToday Spotlight، وWeekly Legend، وDuel، وLucky Wheel، والدردشة، والإشعارات، والمحفظة، والملف الشخصي، والإعدادات — بإطارات سلكية',
            'ثلاثة أنظمة حركة: دخول الملف الشخصي، ورفع مستوى بستة إطارات مفتاحية، وعشر طبقات أحداث',
            'نمط Feed Card واحد قابل لإعادة الاستخدام يحمل تبويب النادي',
          ],
          [
            'Onboarding, Games-Hub, Today Spotlight, Weekly Legend, Duel, Lucky Wheel, Chat, Benachrichtigungen, Wallet, Profil und Einstellungen — als Wireframes',
            'Drei Animationssysteme: Profil-Einstieg, Level-up mit sechs Keyframes, zehn Event-Overlays',
            'Ein wiederverwendbares Feed-Card-Muster, das den Club-Tab trägt',
          ],
        ),
      ),
    },
    {
      id: 'rp1-s18',
      blockType: 'csLessons',
      items: [
        {
          id: 'rp1-x01',
          title: l(
            L(
              'A dated conflict-resolution log beats silent rewrites',
              'لاگ حل تعارضِ تاریخ‌دار از بازنویسی‌های خاموش بهتر است',
              'سجل حل نزاعات مؤرَّخ يتفوّق على إعادات الكتابة الصامتة',
              'Ein datiertes Conflict-Resolution-Log schlägt stille Umschreibungen',
            ),
          ),
          body: l(
            L(
              'Renaming Duel, Tournament and Rumble, or formally marking an older spec as superseded, kept the whole team working from the same current truth instead of arguing from stale docs.',
              'بازنام‌گذاری Duel، Tournament و Rumble، یا اعلام رسمی منسوخ شدن یک مشخصات قدیمی، کل تیم را روی یک حقیقت روز نگه داشت، به جای بحث بر سر اسناد کهنه.',
              'إعادة تسمية Duel وTournament وRumble، أو وسم مواصفات أقدم رسميًا بأنها مُلغاة، أبقى الفريق كله يعمل من الحقيقة الحالية نفسها بدل الجدال من وثائق قديمة.',
              'Duel, Tournament und Rumble umzubenennen oder eine ältere Spezifikation formal als abgelöst zu kennzeichnen, hielt das ganze Team bei derselben aktuellen Wahrheit, statt über veraltete Dokumente zu streiten.',
            ),
          ),
        },
        {
          id: 'rp1-x02',
          title: l(
            L(
              'Even a well-documented project drifts',
              'حتی پروژه‌ای خوب‌مستند هم دچار انحراف می‌شود',
              'حتى المشروع الموثَّق جيدًا ينحرف',
              'Auch ein gut dokumentiertes Projekt driftet',
            ),
          ),
          body: l(
            L(
              'The wallet flow names BNB Smart Chain (BEP-20) in the newer, Figma-linked documentation, while an earlier draft says TRC-20/ERC-20. Treating the more recent, cross-referenced source as canonical is right — and a reminder that only a full re-read surfaces small drifts.',
              'جریان کیف پول در مستندات جدیدتر و متصل به Figma از BNB Smart Chain (BEP-20) نام می‌برد، در حالی که پیش‌نویسی قدیمی‌تر TRC-20/ERC-20 را ذکر می‌کند. مرجع دانستن منبع جدیدتر و ارجاع‌شده درست است — و یادآوری اینکه فقط یک بازخوانی کامل، انحراف‌های کوچک را آشکار می‌کند.',
              'يذكر مسار المحفظة BNB Smart Chain (BEP-20) في الوثائق الأحدث المرتبطة بـ Figma، بينما تذكر مسودّة سابقة TRC-20/ERC-20. اعتماد المصدر الأحدث والمُحال إليه مرجعًا هو الصواب — وتذكير بأن إعادة قراءة كاملة وحدها تكشف الانحرافات الصغيرة.',
              'Der Wallet-Flow nennt in der neueren, mit Figma verknüpften Dokumentation die BNB Smart Chain (BEP-20), während ein früherer Entwurf TRC-20/ERC-20 angibt. Die neuere, querverwiesene Quelle als kanonisch zu behandeln, ist richtig — und eine Erinnerung daran, dass nur ein vollständiges Wiederlesen kleine Abweichungen aufdeckt.',
            ),
          ),
        },
      ],
    },
  ]
}

// ── Assembly ────────────────────────────────────────────────────────────────────────────────

/** Localized project fields for one locale — everything a `fallback: false` site needs filled. */
export function rp1LocalizedFields(locale: SeedLocale, media: Rp1MediaIds) {
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
      items: (['heroDuel', 'heroSpotlight', 'heroLegend'] as const)
        .filter((key) => media[key])
        .map((key, i) => ({ id: `rp1-h0${i + 1}`, media: media[key]! })),
      caption: l(HERO_CAPTION),
    },
    snapshot: { problem: l(SNAPSHOT.problem), role: l(SNAPSHOT.role), result: l(SNAPSHOT.result) },
    sections: rp1Sections(locale, media),
    meta: {
      title: l(META_TITLE),
      description: l(SUMMARY),
      ...(media.heroSpotlight ? { image: media.heroSpotlight } : {}),
    },
  }
}

/** Shared (non-localized) case-study fields, set once from the English pass. */
export const RP1_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  projectStatus: 'pre-launch',
  tools: ['Figma', 'React'],
  period: { start: '2026-02-01T00:00:00.000Z' },
}
