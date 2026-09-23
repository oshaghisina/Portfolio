import type { Project } from '@/payload-types'

import { bullets, paragraph, prose, type TextDirection } from './lexical'
import { LOCALES, type Locale } from '@/utilities/locale'

import { projectCompanyCopy, projectRoleCopy, projectTextCopy } from '../project-copy'
import type { MediaSpec } from '../media'

/**
 * RP1 — the validation case study (D-022). Every sentence traces to
 * `Docs/Experience/Projects/rp1-arena/README.md`; the project is pre-launch, so the outcomes are
 * delivered outputs with no numbers, and the ownership lists keep the README's own phrasing
 * (product owner and spec collaborator credited). English is the source; the other six locales
 * are machine-drafted twins flagged `translationReviewed: false` until a native review.
 *
 * Row ids are deterministic (`rp1-s01`, `rp1-d01` …) and identical in every locale payload, so
 * Payload merges each locale's copy into the same block rows instead of creating new ones.
 */
export const RP1_SLUG = 'rp1-arena'
export const RP1_ASSETS = 'Docs/Experience/Projects/rp1-arena/assets'
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
  const text = projectTextCopy[RP1_SLUG]?.[locale]
  const company = projectCompanyCopy[locale]['Independent']
  const role = projectRoleCopy[locale]['Product designer & strategist']
  if (!text || !company || !role)
    throw new Error(`rp1-arena case study: no archive copy in ${locale}`)
  return { ...text, company, role }
}

// ── Media ──────────────────────────────────────────────────────────────────────────────────
// Filenames double as idempotency keys, so every name here is prefixed with the project slug —
// including `duelMain`, which the archive cover (D-021) also points at, so the same upload
// serves both. An earlier bare `duel-main.png` looked like it matched that cover but never
// did: no media *document* carried that filename, while the name itself was occupied on disk
// by an untracked leftover — so the lookup missed on every run and Payload suffixed each
// fresh upload. Eleven identical orphans accumulated before the name was corrected.

export const RP1_MEDIA = {
  heroDuel: {
    file: 'games/games-main-duel.png',
    name: 'rp1-arena--games-main-duel.png',
    alt: L({
      en: 'RP1 duel challenge sheet: an incoming Flappy Bird duel in race-to-target format with a 2 USDT stake, and Decline / Accept actions',
      fa: 'برگهٔ دعوت به دوئل در RP1: یک دوئل Flappy Bird با قالب مسابقه تا امتیاز هدف و ۲ USDT شرط، با دکمه‌های رد و قبول',
      ar: 'ورقة تحدّي مبارزة في RP1: مبارزة Flappy Bird واردة بصيغة السباق إلى الهدف برهان 2 USDT، مع زرّي الرفض والقبول',
      de: 'RP1-Duell-Herausforderung: ein eingehendes Flappy-Bird-Duell im Race-to-Target-Format mit 2 USDT Einsatz und den Aktionen Ablehnen / Annehmen',
      es: 'Hoja de desafío a duelo de RP1: un duelo entrante de Flappy Bird en formato carrera hasta el objetivo, con una apuesta de 2 USDT y las acciones Rechazar / Aceptar',
      fr: 'Feuille de défi en duel de RP1 : un duel Flappy Bird entrant au format course à l’objectif, avec une mise de 2 USDT et les actions Refuser / Accepter',
      ja: 'RP1のデュエル挑戦シート：目標到達レース形式で届いたFlappy Birdのデュエル。賭け金は2 USDTで、「辞退」／「承諾」のアクション付き',
    }),
  },
  heroSpotlight: {
    file: 'today-spotlight/not-yet-played.png',
    name: 'rp1-arena--today-spotlight.png',
    alt: L({
      en: "Today's Spotlight screen: prize tiers, a live-rankings countdown and the leaderboard of the daily single-game competition",
      fa: 'صفحهٔ Today’s Spotlight: رده‌های جایزه، شمارش معکوس رده‌بندی زنده و جدول رقابت روزانهٔ تک‌بازی',
      ar: 'شاشة Today’s Spotlight: فئات الجوائز، وعدّاد تنازلي للترتيب المباشر، ولوحة صدارة المسابقة اليومية ذات اللعبة الواحدة',
      de: 'Today’s-Spotlight-Screen: Preisstufen, ein Countdown der Live-Rangliste und das Leaderboard des täglichen Einzelspiel-Wettbewerbs',
      es: 'Pantalla de Today’s Spotlight: niveles de premios, una cuenta atrás de la clasificación en directo y la tabla de líderes de la competición diaria de un solo juego',
      fr: 'Écran Today’s Spotlight : paliers de récompenses, un compte à rebours du classement en direct et le tableau des scores de la compétition quotidienne sur un seul jeu',
      ja: 'Today’s Spotlight画面：賞金ティア、ライブランキングのカウントダウン、1つのゲームで競うデイリー大会のリーダーボード',
    }),
  },
  heroLegend: {
    file: 'weekly-legend/ranking.png',
    name: 'rp1-arena--weekly-legend-ranking.png',
    alt: L({
      en: 'Weekly Legend screen: a crown, prize tiers, a countdown in days and the weekly cross-game leaderboard',
      fa: 'صفحهٔ Weekly Legend: تاج، رده‌های جایزه، شمارش معکوس روزانه و جدول هفتگی چندبازی',
      ar: 'شاشة Weekly Legend: تاج، وفئات الجوائز، وعدّاد تنازلي بالأيام، ولوحة الصدارة الأسبوعية عبر الألعاب',
      de: 'Weekly-Legend-Screen: eine Krone, Preisstufen, ein Countdown in Tagen und das wöchentliche spielübergreifende Leaderboard',
      es: 'Pantalla de Weekly Legend: una corona, niveles de premios, una cuenta atrás en días y la tabla de líderes semanal entre juegos',
      fr: 'Écran Weekly Legend : une couronne, des paliers de récompenses, un compte à rebours en jours et le tableau des scores hebdomadaire multijeu',
      ja: 'Weekly Legend画面：王冠、賞金ティア、日数でのカウントダウン、ゲームをまたいだ週間リーダーボード',
    }),
  },
  duelMain: {
    file: 'duel/duel-main.png',
    name: 'rp1-arena--duel-main.png',
    alt: L({
      en: 'Duel entry sheet: challenge a friend, or face a random opponent matched by skill',
      fa: 'برگهٔ ورود به دوئل: دعوت یک دوست، یا رویارویی با حریفی تصادفی هم‌سطح',
      ar: 'ورقة الدخول إلى المبارزة: تحدِّ صديقًا، أو واجه خصمًا عشوائيًا مطابقًا للمهارة',
      de: 'Duell-Einstieg: einen Freund herausfordern oder gegen einen zufälligen, nach Können zugeordneten Gegner antreten',
      es: 'Hoja de entrada al duelo: desafía a un amigo o enfréntate a un rival aleatorio emparejado según su habilidad',
      fr: 'Feuille d’entrée en duel : défier un ami ou affronter un adversaire aléatoire apparié selon son niveau',
      ja: 'デュエルの入口シート：友だちに挑戦するか、スキルでマッチングされたランダムな相手と対戦する',
    }),
  },
  duelSetup: {
    file: 'duel/duel-time-limited-3.png',
    name: 'rp1-arena--duel-setup.png',
    alt: L({
      en: 'Duel setup: select a player, a format — time limited or race to target — and the prize',
      fa: 'تنظیم دوئل: انتخاب بازیکن، قالب — زمان‌دار یا مسابقه تا امتیاز هدف — و جایزه',
      ar: 'إعداد المبارزة: اختيار لاعب، وصيغة — محدودة الوقت أو سباق إلى الهدف — والجائزة',
      de: 'Duell-Setup: einen Spieler, ein Format — zeitlich begrenzt oder Race to Target — und den Preis wählen',
      es: 'Configuración del duelo: elegir un jugador, un formato —tiempo limitado o carrera hasta el objetivo— y el premio',
      fr: 'Configuration du duel : choisir un joueur, un format — temps limité ou course à l’objectif — et le prix',
      ja: 'デュエルの設定：プレイヤー、形式——時間制限か目標到達レースか——、そして賞金を選ぶ',
    }),
  },
  duelSetupSelected: {
    file: 'duel/duel-race-to-target.png',
    name: 'rp1-arena--duel-race-to-target.png',
    alt: L({
      en: 'Duel setup with a player selected, race to target chosen and the stake options from 0.50 to 10 USDT',
      fa: 'تنظیم دوئل با بازیکن انتخاب‌شده، قالب مسابقه تا امتیاز هدف و گزینه‌های شرط از ۰٫۵۰ تا ۱۰ USDT',
      ar: 'إعداد المبارزة مع لاعب مختار، وصيغة السباق إلى الهدف، وخيارات الرهان من 0.50 إلى 10 USDT',
      de: 'Duell-Setup mit gewähltem Spieler, Race to Target und den Einsatzoptionen von 0,50 bis 10 USDT',
      es: 'Configuración del duelo con un jugador seleccionado, la carrera hasta el objetivo elegida y las opciones de apuesta de 0,50 a 10 USDT',
      fr: 'Configuration du duel avec un joueur sélectionné, la course à l’objectif choisie et les options de mise de 0,50 à 10 USDT',
      ja: 'プレイヤーを選び、目標到達レースを選択した状態のデュエル設定。賭け金の選択肢は0.50〜10 USDT',
    }),
  },
  spotlightNearMiss: {
    file: 'today-spotlight/time-remaining.png',
    name: 'rp1-arena--spotlight-game-over.png',
    alt: L({
      en: "Game-over sheet in Today's Spotlight: score, rank, the points needed for the next rank and the remaining ticket time",
      fa: 'برگهٔ پایان بازی در Today’s Spotlight: امتیاز، رتبه، امتیاز لازم برای رتبهٔ بعدی و زمان باقی‌ماندهٔ بلیت',
      ar: 'ورقة انتهاء اللعبة في Today’s Spotlight: النقاط، والترتيب، والنقاط اللازمة للترتيب التالي، والوقت المتبقي من التذكرة',
      de: 'Game-over-Sheet in Today’s Spotlight: Punkte, Rang, die für den nächsten Rang nötigen Punkte und die verbleibende Ticketzeit',
      es: 'Hoja de fin de partida en Today’s Spotlight: puntuación, puesto, los puntos que faltan para el siguiente puesto y el tiempo restante del ticket',
      fr: 'Feuille de fin de partie dans Today’s Spotlight : score, rang, les points nécessaires pour le rang suivant et le temps de ticket restant',
      ja: 'Today’s Spotlightのゲームオーバーシート：スコア、順位、次の順位までに必要なポイント、チケットの残り時間',
    }),
  },
  spotlightTop: {
    file: 'today-spotlight/high-rank.png',
    name: 'rp1-arena--spotlight-on-top.png',
    alt: L({
      en: "Today's Spotlight sheet for the player holding first place, with the remaining time and a prompt to push the score higher",
      fa: 'برگهٔ Today’s Spotlight برای بازیکن رتبهٔ اول، با زمان باقی‌مانده و دعوت به بالا بردن امتیاز',
      ar: 'ورقة Today’s Spotlight للاعب في المركز الأول، مع الوقت المتبقي ودعوة لرفع النقاط',
      de: 'Today’s-Spotlight-Sheet für den Spieler auf Platz eins, mit Restzeit und der Aufforderung, den Score zu steigern',
      es: 'Hoja de Today’s Spotlight para el jugador en primer puesto, con el tiempo restante y una invitación a subir aún más la puntuación',
      fr: 'Feuille Today’s Spotlight pour le joueur en tête, avec le temps restant et une incitation à pousser le score plus haut',
      ja: '1位のプレイヤーに表示されるToday’s Spotlightシート：残り時間と、さらにスコアを伸ばすよう促すメッセージ',
    }),
  },
  spotlightEnded: {
    file: 'today-spotlight/spotlight-ended.png',
    name: 'rp1-arena--spotlight-ended.png',
    alt: L({
      en: "Spotlight-ended sheet: final score, final rank and the next Spotlight's start time",
      fa: 'برگهٔ پایان Spotlight: امتیاز نهایی، رتبهٔ نهایی و زمان شروع Spotlight بعدی',
      ar: 'ورقة انتهاء الـ Spotlight: النقاط النهائية، والترتيب النهائي، وموعد بدء الـ Spotlight التالي',
      de: 'Spotlight-beendet-Sheet: Endpunktzahl, Endrang und Startzeit des nächsten Spotlights',
      es: 'Hoja de Spotlight finalizado: puntuación final, puesto final y la hora de inicio del próximo Spotlight',
      fr: 'Feuille de fin de Spotlight : score final, rang final et l’heure de début du prochain Spotlight',
      ja: 'Spotlight終了シート：最終スコア、最終順位、次回Spotlightの開始時刻',
    }),
  },
  wallet: {
    file: 'wallet/wallet-balance.png',
    name: 'rp1-arena--wallet-balance.png',
    alt: L({
      en: 'Wallet screen: total balance in USDT, withdraw and deposit, earnings by source, the on-chain wallet, and available, in-play and pending balances',
      fa: 'صفحهٔ کیف پول: موجودی کل به USDT، برداشت و واریز، درآمد به تفکیک منبع، کیف پول زنجیره‌ای و موجودی‌های در دسترس، در بازی و در انتظار',
      ar: 'شاشة المحفظة: الرصيد الإجمالي بـ USDT، والسحب والإيداع، والأرباح حسب المصدر، والمحفظة على السلسلة، والأرصدة المتاحة وقيد اللعب والمعلّقة',
      de: 'Wallet-Screen: Gesamtguthaben in USDT, Auszahlen und Einzahlen, Erträge nach Quelle, die On-Chain-Wallet sowie verfügbare, im Spiel befindliche und ausstehende Guthaben',
      es: 'Pantalla del monedero: saldo total en USDT, retirar y depositar, ganancias por origen, el monedero on-chain y los saldos disponible, en juego y pendiente',
      fr: 'Écran du portefeuille : solde total en USDT, retrait et dépôt, gains par source, le portefeuille on-chain, et les soldes disponible, en jeu et en attente',
      ja: 'ウォレット画面：USDT建ての総残高、出金と入金、収益の内訳、オンチェーンウォレット、利用可能・プレイ中・保留中の残高',
    }),
  },
  levelUp1: {
    file: 'animations/anim-levelup-1.png',
    name: 'rp1-arena--level-up-1.png',
    alt: L({
      en: 'Level-up animation, first keyframe: the profile with the avatar, achievements and the three-tab bar',
      fa: 'انیمیشن ارتقای سطح، فریم اول: پروفایل با آواتار، دستاوردها و نوار سه‌تبی',
      ar: 'حركة رفع المستوى، الإطار الأول: الملف الشخصي مع الصورة الرمزية والإنجازات وشريط التبويبات الثلاثة',
      de: 'Level-up-Animation, erstes Keyframe: das Profil mit Avatar, Erfolgen und der Drei-Tab-Leiste',
      es: 'Animación de subida de nivel, primer fotograma clave: el perfil con el avatar, los logros y la barra de tres pestañas',
      fr: 'Animation de passage de niveau, première image clé : le profil avec l’avatar, les succès et la barre à trois onglets',
      ja: 'レベルアップアニメーションの最初のキーフレーム：アバター、実績、3タブのバーを備えたプロフィール',
    }),
  },
  levelUp2: {
    file: 'animations/anim-levelup-2.png',
    name: 'rp1-arena--level-up-2.png',
    alt: L({
      en: 'Level-up animation, middle keyframe: the avatar card turning',
      fa: 'انیمیشن ارتقای سطح، فریم میانی: چرخش کارت آواتار',
      ar: 'حركة رفع المستوى، الإطار الأوسط: بطاقة الصورة الرمزية وهي تدور',
      de: 'Level-up-Animation, mittleres Keyframe: die Avatar-Karte dreht sich',
      es: 'Animación de subida de nivel, fotograma clave intermedio: la tarjeta del avatar girando',
      fr: 'Animation de passage de niveau, image clé intermédiaire : la carte de l’avatar qui pivote',
      ja: 'レベルアップアニメーションの中間キーフレーム：回転するアバターカード',
    }),
  },
  levelUp3: {
    file: 'animations/anim-levelup-3.png',
    name: 'rp1-arena--level-up-3.png',
    alt: L({
      en: 'Level-up animation, last keyframe: the new level number fills the profile card',
      fa: 'انیمیشن ارتقای سطح، فریم آخر: عدد سطح جدید کارت پروفایل را پر می‌کند',
      ar: 'حركة رفع المستوى، الإطار الأخير: رقم المستوى الجديد يملأ بطاقة الملف الشخصي',
      de: 'Level-up-Animation, letztes Keyframe: die neue Levelnummer füllt die Profilkarte',
      es: 'Animación de subida de nivel, último fotograma clave: el nuevo número de nivel llena la tarjeta de perfil',
      fr: 'Animation de passage de niveau, dernière image clé : le nouveau numéro de niveau remplit la carte de profil',
      ja: 'レベルアップアニメーションの最後のキーフレーム：新しいレベルの数字がプロフィールカードいっぱいに広がる',
    }),
  },
  notifications: {
    file: 'notification/notification-friends.png',
    name: 'rp1-arena--notifications.png',
    alt: L({
      en: 'Notification feed: transactional cards for deposits, withdrawals, prizes and duel results, each with its own actions',
      fa: 'فید اعلان‌ها: کارت‌های تراکنشی برای واریز، برداشت، جایزه و نتیجهٔ دوئل، هرکدام با اقدام‌های خودش',
      ar: 'موجز الإشعارات: بطاقات معاملاتية للإيداعات والسحوبات والجوائز ونتائج المبارزات، لكل منها إجراءاتها',
      de: 'Benachrichtigungs-Feed: Transaktionskarten für Einzahlungen, Auszahlungen, Preise und Duellergebnisse, jede mit eigenen Aktionen',
      es: 'Feed de notificaciones: tarjetas transaccionales de depósitos, retiros, premios y resultados de duelos, cada una con sus propias acciones',
      fr: 'Fil de notifications : cartes transactionnelles pour les dépôts, les retraits, les prix et les résultats de duels, chacune avec ses propres actions',
      ja: '通知フィード：入金、出金、賞金、デュエル結果のトランザクションカード。それぞれに固有のアクションがある',
    }),
  },
} satisfies Record<string, MediaSpec>

export type Rp1MediaKey = keyof typeof RP1_MEDIA
export type Rp1MediaIds = Partial<Record<Rp1MediaKey, string>>

// ── Project fields ──────────────────────────────────────────────────────────────────────────

const TITLE = L({
  en: 'RP1 — Multi-Game Play-to-Earn Arena',
  fa: 'RP1 — آرنای چندبازیِ Play-to-Earn',
  ar: 'RP1 — ساحة Play-to-Earn متعددة الألعاب',
  de: 'RP1 — Multi-Game-Play-to-Earn-Arena',
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
  en: 'Product design and strategy for a mobile play-to-earn arena that gathers HTML5 games under one competitive and economic layer — competitive-platform research, MVP scoping and a full wireframe spec across 16 sections.',
  fa: 'راهبرد و طراحی محصول برای آرنای موبایلی Play-to-Earn با بازی‌های HTML5 و سازوکار مشترک رقابت و درآمد. پژوهش نمونه‌های مشابه، تعیین دامنهٔ MVP و وایرفریم ۱۶ بخش را انجام دادم.',
  ar: 'تصميم المنتج والاستراتيجية لساحة Play-to-Earn على الهاتف تجمع ألعاب HTML5 تحت طبقة تنافسية واقتصادية واحدة — بحث في المنصات التنافسية، وتحديد نطاق الـ MVP، ومواصفات إطارات سلكية كاملة عبر 16 قسمًا.',
  de: 'Produktdesign und Strategie für eine mobile Play-to-Earn-Arena, die HTML5-Spiele unter einer gemeinsamen Wettbewerbs- und Wirtschaftsebene bündelt — Research zu Wettbewerbsplattformen, MVP-Scoping und eine vollständige Wireframe-Spezifikation über 16 Bereiche.',
  es: archiveText('es').summary,
  fr: archiveText('fr').summary,
  ja: archiveText('ja').summary,
})

const STATEMENT = L({
  en: "A multi-game play-to-earn arena, spec'd end-to-end — from Octalysis-driven research to a 16-section wireframe pass — currently pre-launch.",
  fa: 'مشخصات این آرنای چندبازیِ Play-to-Earn را از پژوهش با Octalysis تا وایرفریم ۱۶ بخش تدوین کردم. محصول هنوز منتشر نشده است.',
  ar: 'ساحة Play-to-Earn متعددة الألعاب مُحدَّدة من البداية إلى النهاية — من بحث قائم على Octalysis إلى إطارات سلكية عبر 16 قسمًا — ولم تُطلق بعد.',
  de: 'Eine Multi-Game-Play-to-Earn-Arena, durchgängig spezifiziert — von Octalysis-basiertem Research bis zu Wireframes über 16 Bereiche — derzeit vor dem Launch.',
  es: 'Una arena play-to-earn multijuego, especificada de principio a fin —de la investigación con Octalysis a wireframes de 16 secciones—, aún sin lanzar.',
  fr: 'Une arène play-to-earn multijeu, spécifiée de bout en bout — de la recherche guidée par Octalysis aux wireframes de 16 sections — pas encore lancée.',
  ja: 'Octalysisに基づくリサーチから16セクションのワイヤーフレームまで、端から端まで仕様化したマルチゲームのPlay-to-Earnアリーナ。現在はローンチ前。',
})

const INDUSTRY = L({
  en: 'Gaming · play-to-earn',
  fa: 'بازی · Play-to-Earn',
  ar: 'ألعاب · Play-to-Earn',
  de: 'Gaming · Play-to-Earn',
  es: 'Gaming · play-to-earn',
  fr: 'Gaming · play-to-earn',
  ja: 'ゲーム・Play-to-Earn',
})

const TEAM = L({
  en: 'A product owner, a game/community-spec collaborator, and Sina as product design & strategy lead',
  fa: 'سینا در راهبری طراحی و راهبرد محصول، همراه با مالک محصول و نویسندهٔ مشخصات بازی و جامعه',
  ar: 'مالك منتج، ومتعاون على مواصفات الألعاب والمجتمع، وسينا قائدًا لتصميم المنتج والاستراتيجية',
  de: 'Ein Product Owner, ein Mitwirkender für die Spiel- und Community-Spezifikation und Sina als Lead für Produktdesign und Strategie',
  es: 'Un product owner, un colaborador en la especificación del juego y la comunidad, y Sina como líder de diseño de producto y estrategia',
  fr: 'Un product owner, un collaborateur pour la spécification jeu et communauté, et Sina comme lead design produit et stratégie',
  ja: 'プロダクトオーナー、ゲームとコミュニティの仕様を担う協力者、そしてプロダクトデザインと戦略のリードを務めるSina',
})

const META_TITLE = L({
  en: 'RP1 — product design and strategy for a play-to-earn arena',
  fa: 'RP1 — طراحی محصول و استراتژی برای یک آرنای Play-to-Earn',
  ar: 'RP1 — تصميم المنتج والاستراتيجية لساحة Play-to-Earn',
  de: 'RP1 — Produktdesign und Strategie für eine Play-to-Earn-Arena',
  es: 'RP1: diseño de producto y estrategia para una arena play-to-earn',
  fr: 'RP1 — design produit et stratégie pour une arène play-to-earn',
  ja: 'RP1——Play-to-Earnアリーナのプロダクトデザインと戦略',
})

const HERO_CAPTION = L({
  en: "Three of the 73 exported screens: a duel challenge, Today's Spotlight and the Weekly Legend ranking.",
  fa: 'سه نمونه از ۷۳ صفحهٔ خروجی‌گرفته‌شده: یک دعوت به دوئل، Today’s Spotlight و رده‌بندی Weekly Legend.',
  ar: 'ثلاث من 73 شاشة مُصدَّرة: تحدّي مبارزة، وToday’s Spotlight، وترتيب Weekly Legend.',
  de: 'Drei der 73 exportierten Screens: eine Duell-Herausforderung, Today’s Spotlight und das Weekly-Legend-Ranking.',
  es: 'Tres de las 73 pantallas exportadas: un desafío a duelo, Today’s Spotlight y la clasificación Weekly Legend.',
  fr: 'Trois des 73 écrans exportés : un défi en duel, Today’s Spotlight et le classement Weekly Legend.',
  ja: '書き出した73画面のうちの3つ：デュエルの挑戦、Today’s Spotlight、Weekly Legendのランキング。',
})

const SNAPSHOT = {
  problem: L({
    en: 'Casual HTML5 games rarely have a durable competitive or monetization layer — and the platforms that add one tend to read as casino products first.',
    fa: 'بازی‌های تفننی HTML5 به‌ندرت لایهٔ رقابتی یا درآمدزایی ماندگاری دارند — و پلتفرم‌هایی که چنین لایه‌ای می‌افزایند، بیشتر شبیه کازینو به نظر می‌رسند تا بازی.',
    ar: 'نادرًا ما تملك ألعاب HTML5 العابرة طبقة تنافسية أو طبقة تحقيق دخل مستدامة — والمنصات التي تضيفها تبدو غالبًا منتجات كازينو أولًا.',
    de: 'Casual-HTML5-Spiele haben selten eine tragfähige Wettbewerbs- oder Monetarisierungsebene — und Plattformen, die eine hinzufügen, wirken meist zuerst wie Casino-Produkte.',
    es: 'Los juegos casuales en HTML5 rara vez tienen una capa competitiva o de monetización duradera, y las plataformas que la añaden suelen parecer ante todo productos de casino.',
    fr: 'Les jeux casual en HTML5 ont rarement une couche compétitive ou de monétisation durable — et les plateformes qui en ajoutent une ressemblent d’abord à des produits de casino.',
    ja: 'HTML5のカジュアルゲームには、長続きする競争やマネタイズの仕組みがほとんどない。そして、それを加えるプラットフォームは、まずカジノ製品のように見えてしまいがちだ。',
  }),
  role: L({
    en: 'Product design and strategy lead: the gamification research, the MVP scope and the full 16-section wireframe spec, alongside a product owner and a spec collaborator.',
    fa: 'راهبری طراحی و راهبرد محصول، شامل پژوهش بازی‌وارسازی، تعیین دامنهٔ MVP و مشخصات وایرفریم در ۱۶ بخش؛ در کنار مالک محصول و نویسندهٔ مشخصات بازی.',
    ar: 'قيادة تصميم المنتج والاستراتيجية: بحث التلعيب، ونطاق الـ MVP، ومواصفات الإطارات السلكية الكاملة عبر 16 قسمًا، إلى جانب مالك منتج ومتعاون على المواصفات.',
    de: 'Lead für Produktdesign und Strategie: das Gamification-Research, der MVP-Umfang und die vollständige Wireframe-Spezifikation über 16 Bereiche — neben einem Product Owner und einem Mitwirkenden an der Spezifikation.',
    es: 'Líder de diseño de producto y estrategia: la investigación de gamificación, el alcance del MVP y la especificación completa de wireframes en 16 secciones, junto a un product owner y un colaborador de especificación.',
    fr: 'Lead design produit et stratégie : la recherche sur la gamification, le périmètre du MVP et la spécification complète des wireframes sur 16 sections, aux côtés d’un product owner et d’un collaborateur à la spécification.',
    ja: 'プロダクトデザインと戦略のリード。ゲーミフィケーションのリサーチ、MVPのスコープ、16セクションにわたるワイヤーフレーム仕様の全体を、プロダクトオーナーと仕様の協力者とともに担った。',
  }),
  result: L({
    en: 'A fully resolved MVP scope, a 34-component build catalog with a 3-week build order, and a reusable interactive Octalysis tool — pre-launch, so no product metrics yet.',
    fa: 'دامنهٔ مشخص MVP، فهرست ساخت با ۳۴ جزء و برنامهٔ سه‌هفته‌ای، و ابزار تعاملی Octalysis که دوباره هم می‌شود از آن استفاده کرد. محصول هنوز منتشر نشده و داده‌ای از عملکرد آن وجود ندارد.',
    ar: 'نطاق MVP محسوم بالكامل، وكتالوج بناء من 34 مكوّنًا مع ترتيب بناء لثلاثة أسابيع، وأداة Octalysis تفاعلية قابلة لإعادة الاستخدام — قبل الإطلاق، فلا مقاييس منتج بعد.',
    de: 'Ein vollständig geklärter MVP-Umfang, ein Build-Katalog mit 34 Komponenten und einer dreiwöchigen Build-Reihenfolge sowie ein wiederverwendbares interaktives Octalysis-Werkzeug — vor dem Launch, also noch ohne Produktkennzahlen.',
    es: 'Un alcance del MVP totalmente resuelto, un catálogo de construcción de 34 componentes con un orden de construcción de 3 semanas y una herramienta interactiva de Octalysis reutilizable; aún sin lanzar, así que todavía no hay métricas de producto.',
    fr: 'Un périmètre MVP entièrement tranché, un catalogue de build de 34 composants avec un ordre de build sur 3 semaines, et un outil Octalysis interactif réutilisable — avant le lancement, donc pas encore de métriques produit.',
    ja: '完全に確定したMVPのスコープ、3週間の構築順序を備えた34コンポーネントの構築カタログ、再利用できるインタラクティブなOctalysisツール。ローンチ前のため、プロダクト指標はまだない。',
  }),
}

// ── Sections ────────────────────────────────────────────────────────────────────────────────

type Sections = NonNullable<Project['sections']>

/** The block narrative for one locale, with the same row ids in every locale. */
export function rp1Sections(locale: Locale, media: Rp1MediaIds): Sections {
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
        L({
          en: 'Many small games, one competitive and economic layer.',
          fa: 'بازی‌های کوچکِ فراوان، یک لایهٔ رقابتی و اقتصادی.',
          ar: 'ألعاب صغيرة كثيرة، وطبقة تنافسية واقتصادية واحدة.',
          de: 'Viele kleine Spiele, eine Wettbewerbs- und Wirtschaftsebene.',
          es: 'Muchos juegos pequeños, una sola capa competitiva y económica.',
          fr: 'Beaucoup de petits jeux, une seule couche compétitive et économique.',
          ja: 'たくさんの小さなゲームに、ひとつの競争と経済のレイヤー。',
        }),
      ),
      body: prose(
        dir,
        p(
          L({
            en: 'RP1 — ReadyPlayerOne in the project’s own docs — is a mobile-first arena that aggregates lightweight HTML5 arcade games — Flappy Bird, Snake, Temple Run, Subway Surf and others — under one competitive and economic layer: daily and weekly leaderboard competitions, 1v1 wagered duels and ticket-gated tournaments, all settled in USDT through an on-chain wallet (BNB Smart Chain, BEP-20).',
              fa: 'RP1 که در اسناد پروژه ReadyPlayerOne نام دارد، مجموعه‌ای موبایلی از بازی‌های سبک HTML5 مانند Flappy Bird، Snake، Temple Run و Subway Surf است. رقابت‌های روزانه و هفتگی، دوئل‌های یک‌به‌یک با شرط و تورنمنت‌های بلیتی، لایهٔ مشترک رقابت و درآمد آن را می‌سازند. تسویه با USDT از طریق کیف پول مبتنی بر BNB Smart Chain (BEP-20) انجام می‌شود.',
            ar: 'RP1 — أو ReadyPlayerOne في وثائق المشروع نفسها — ساحة موجّهة للهاتف أولًا تجمع ألعاب أركيد HTML5 خفيفة — Flappy Bird وSnake وTemple Run وSubway Surf وغيرها — تحت طبقة تنافسية واقتصادية واحدة: مسابقات يومية وأسبوعية بلوحات صدارة، ومبارزات فردية برهان، وبطولات بتذاكر، تُسوّى جميعها بـ USDT عبر محفظة على السلسلة (BNB Smart Chain، BEP-20).',
            de: 'RP1 — in den Projektunterlagen ReadyPlayerOne — ist eine Mobile-first-Arena, die leichte HTML5-Arcade-Spiele — Flappy Bird, Snake, Temple Run, Subway Surf und andere — unter einer Wettbewerbs- und Wirtschaftsebene bündelt: tägliche und wöchentliche Leaderboard-Wettbewerbe, 1-gegen-1-Duelle mit Einsatz und ticketpflichtige Turniere, alle in USDT über eine On-Chain-Wallet (BNB Smart Chain, BEP-20) abgerechnet.',
            es: 'RP1 —ReadyPlayerOne en la documentación del propio proyecto— es una arena mobile-first que reúne juegos arcade ligeros en HTML5 —Flappy Bird, Snake, Temple Run, Subway Surf y otros— bajo una sola capa competitiva y económica: competiciones diarias y semanales por clasificación, duelos 1 contra 1 con apuesta y torneos con acceso por ticket, todo liquidado en USDT a través de un monedero on-chain (BNB Smart Chain, BEP-20).',
            fr: 'RP1 — ReadyPlayerOne dans la documentation du projet — est une arène mobile-first qui regroupe des jeux d’arcade HTML5 légers — Flappy Bird, Snake, Temple Run, Subway Surf et d’autres — sous une seule couche compétitive et économique : des compétitions quotidiennes et hebdomadaires au classement, des duels en 1 contre 1 avec mise et des tournois accessibles par ticket, le tout réglé en USDT via un portefeuille on-chain (BNB Smart Chain, BEP-20).',
            ja: 'RP1（プロジェクト自身のドキュメントではReadyPlayerOne）は、Flappy Bird、Snake、Temple Run、Subway Surfなどの軽量なHTML5アーケードゲームを、ひとつの競争と経済のレイヤーのもとに集めたモバイルファーストのアリーナだ。日次・週次のリーダーボード大会、賭け金ありの1対1デュエル、チケット制のトーナメントがあり、すべてオンチェーンウォレット（BNB Smart Chain、BEP-20）を通じてUSDTで精算される。',
          }),
        ),
        p(
          L({
            en: 'It is not pitched as a social network — the project’s own docs call it a “competitive visibility engine”. The reference points named throughout the research are Skillz, MPL, WinZO, Kongregate and Plato.',
              fa: 'RP1 قرار نیست یک شبکهٔ اجتماعی باشد. در اسناد پروژه از آن به‌عنوان «موتور دیده‌شدن در رقابت» یاد شده است. پژوهش به نمونه‌هایی مانند Skillz، MPL، WinZO، Kongregate و Plato رجوع می‌کند.',
            ar: 'لا يُقدَّم كشبكة اجتماعية — فوثائق المشروع تسمّيه «محرّك ظهور تنافسي». والمراجع المذكورة في البحث كله هي Skillz وMPL وWinZO وKongregate وPlato.',
            de: 'Es wird nicht als soziales Netzwerk positioniert — die Projektunterlagen nennen es eine „competitive visibility engine“. Die Referenzpunkte, die sich durch das Research ziehen, sind Skillz, MPL, WinZO, Kongregate und Plato.',
            es: 'No se presenta como una red social: la propia documentación del proyecto lo llama un «motor de visibilidad competitiva». Los referentes que aparecen a lo largo de la investigación son Skillz, MPL, WinZO, Kongregate y Plato.',
            fr: 'Il n’est pas présenté comme un réseau social — la documentation du projet parle d’un « moteur de visibilité compétitive ». Les références citées tout au long de la recherche sont Skillz, MPL, WinZO, Kongregate et Plato.',
            ja: 'ソーシャルネットワークとしては位置づけられていない。プロジェクト自身のドキュメントは、これを「競争で可視性を生むエンジン」と呼んでいる。リサーチを通じて参照されたのは、Skillz、MPL、WinZO、Kongregate、Platoだ。',
          }),
        ),
      ),
      insight: l(
        L({
          en: 'Not a social network: a competitive visibility engine.',
    fa: 'دیده‌شدن از راه رقابت، نه شبکه‌سازی اجتماعی.',
          ar: 'ليست شبكة اجتماعية، بل محرّك ظهور تنافسي.',
          de: 'Kein soziales Netzwerk, sondern eine competitive visibility engine.',
          es: 'No una red social: un motor de visibilidad competitiva.',
          fr: 'Pas un réseau social : un moteur de visibilité compétitive.',
          ja: 'ソーシャルネットワークではなく、競争で可視性を生むエンジン。',
        }),
      ),
    },
    {
      id: 'rp1-s02',
      blockType: 'csFinding',
      kind: 'finding',
      text: l(
        L({
          en: 'Don’t become “the Telegram graveyard”: Hamster Kombat’s collapse from 300M to 23M users after its token airdrop faded was the cautionary case the research kept returning to.',
    fa: 'پژوهش بارها به افت کاربران Hamster Kombat از ۳۰۰ میلیون به ۲۳ میلیون پس از فروکش‌کردن ایردراپ توکن اشاره می‌کند؛ هشداری دربارهٔ رشد کوتاه‌مدت بدون ماندگاری.',
          ar: 'لا تتحوّل إلى «مقبرة تيليغرام»: انهيار Hamster Kombat من 300 مليون إلى 23 مليون مستخدم بعد خفوت الإسقاط الجوي لعملته كان الحالة التحذيرية التي عاد إليها البحث مرارًا.',
          de: 'Nicht zum „Telegram-Friedhof“ werden: Der Absturz von Hamster Kombat von 300 Mio. auf 23 Mio. Nutzer, nachdem der Token-Airdrop verpufft war, war der Warnfall, auf den das Research immer wieder zurückkam.',
          es: 'No convertirse en «el cementerio de Telegram»: la caída de Hamster Kombat de 300M a 23M de usuarios, tras desvanecerse el airdrop de su token, fue el caso de advertencia al que la investigación volvía una y otra vez.',
          fr: 'Ne pas devenir « le cimetière de Telegram » : l’effondrement de Hamster Kombat, passé de 300M à 23M d’utilisateurs une fois l’airdrop de son token retombé, était le contre-exemple auquel la recherche revenait sans cesse.',
          ja: '「Telegramの墓場」にはならないこと。トークンのエアドロップの熱が冷めた後、Hamster Kombatのユーザーが300Mから23Mへと激減した例は、リサーチが何度も立ち返った教訓だった。',
        }),
      ),
      attribution: l(
        L({
          en: 'RP1 competitive research',
          fa: 'پژوهش رقابتی RP1',
          ar: 'بحث RP1 التنافسي',
          de: 'RP1-Wettbewerbsresearch',
          es: 'Investigación competitiva de RP1',
          fr: 'Recherche concurrentielle RP1',
          ja: 'RP1の競合リサーチ',
        }),
      ),
      method: l(
        L({
          en: 'Desk research across 20-plus competitive and casual-gaming platforms',
          fa: 'پژوهش کتابخانه‌ای روی بیش از ۲۰ پلتفرم بازی رقابتی و تفننی',
          ar: 'بحث مكتبي عبر أكثر من 20 منصة ألعاب تنافسية وعابرة',
          de: 'Desk-Research über mehr als 20 Wettbewerbs- und Casual-Gaming-Plattformen',
          es: 'Investigación documental en más de 20 plataformas de juego competitivo y casual',
          fr: 'Recherche documentaire sur plus de 20 plateformes de jeu compétitif et casual',
          ja: '20以上の競技系・カジュアルゲームプラットフォームを対象としたデスクリサーチ',
        }),
      ),
    },
    {
      id: 'rp1-s03',
      blockType: 'csNarrative',
      label: 'problem',
      heading: l(
        L({
          en: 'Competitive and rewarding without becoming a casino.',
      fa: 'رقابت و پاداش، بدون تقلید از قمار.',
          ar: 'تنافسية ومجزية من دون أن تصبح كازينو.',
          de: 'Kompetitiv und belohnend, ohne zum Casino zu werden.',
          es: 'Competitivo y gratificante sin convertirse en un casino.',
          fr: 'Compétitif et gratifiant sans devenir un casino.',
          ja: 'カジノにならずに、競い合えて報われるものに。',
        }),
      ),
      body: prose(
        dir,
        p(
          L({
            en: 'Casual HTML5 games are plentiful but rarely have a durable competitive or monetization layer — and the platforms that do add one, in crypto-gaming and play-to-earn, tend to read as casino products first and games second.',
            fa: 'بازی‌های تفننی HTML5 فراوان‌اند اما به‌ندرت لایهٔ رقابتی یا درآمدزایی ماندگاری دارند — و پلتفرم‌هایی که در حوزهٔ بازی‌های کریپتویی و Play-to-Earn چنین لایه‌ای می‌افزایند، معمولاً اول کازینو به نظر می‌رسند و بعد بازی.',
            ar: 'ألعاب HTML5 العابرة وفيرة لكنها نادرًا ما تملك طبقة تنافسية أو طبقة تحقيق دخل مستدامة — والمنصات التي تضيفها، في ألعاب الكريبتو والـ Play-to-Earn، تبدو غالبًا منتجات كازينو أولًا وألعابًا ثانيًا.',
            de: 'Casual-HTML5-Spiele gibt es viele, aber selten mit einer tragfähigen Wettbewerbs- oder Monetarisierungsebene — und die Plattformen, die eine hinzufügen, im Crypto-Gaming und Play-to-Earn, wirken meist zuerst wie Casino-Produkte und erst dann wie Spiele.',
            es: 'Los juegos casuales en HTML5 abundan, pero rara vez tienen una capa competitiva o de monetización duradera, y las plataformas que sí la añaden, en el crypto-gaming y el play-to-earn, suelen parecer primero productos de casino y después juegos.',
            fr: 'Les jeux casual en HTML5 abondent, mais ont rarement une couche compétitive ou de monétisation durable — et les plateformes qui en ajoutent une, dans le crypto-gaming et le play-to-earn, ressemblent d’abord à des produits de casino et seulement ensuite à des jeux.',
            ja: 'HTML5のカジュアルゲームは数多くあるが、長続きする競争やマネタイズの仕組みを持つものはまれだ。そして、それを加えるクリプトゲーミングやPlay-to-Earnのプラットフォームは、ゲームである前にカジノ製品に見えてしまいがちだ。',
          }),
        ),
        p(
          L({
            en: 'RP1 set out to design a system that feels genuinely competitive and rewarding without tipping into exploitative mechanics: every mechanic was scored against the Octalysis framework’s White-Hat / Black-Hat balance.',
              fa: 'هدف RP1 ساخت تجربه‌ای رقابتی و پاداش‌دهنده بود، بدون سازوکارهای بهره‌کشانه. برای همین، هر سازوکار را با معیار تعادل White-Hat و Black-Hat در چارچوب Octalysis ارزیابی کردم.',
            ar: 'سعى RP1 إلى تصميم نظام يبدو تنافسيًا ومجزيًا بحق من دون الانزلاق إلى آليات استغلالية: قُيِّمت كل آلية وفق توازن White-Hat / Black-Hat في إطار Octalysis.',
            de: 'RP1 wollte ein System entwerfen, das sich wirklich kompetitiv und belohnend anfühlt, ohne in ausbeuterische Mechaniken zu kippen: Jede Mechanik wurde an der White-Hat-/Black-Hat-Balance des Octalysis-Frameworks gemessen.',
            es: 'RP1 se propuso diseñar un sistema que se sintiera de verdad competitivo y gratificante sin caer en mecánicas abusivas: cada mecánica se puntuó según el equilibrio White-Hat / Black-Hat del framework Octalysis.',
            fr: 'RP1 s’est donné pour but de concevoir un système réellement compétitif et gratifiant, sans basculer dans des mécaniques abusives : chaque mécanique a été évaluée selon l’équilibre White-Hat / Black-Hat du framework Octalysis.',
            ja: 'RP1が目指したのは、搾取的なメカニクスに傾くことなく、本当に競い合えて報われると感じられるシステムの設計だった。すべてのメカニクスを、OctalysisフレームワークのWhite-Hat／Black-Hatのバランスで評価した。',
          }),
        ),
      ),
    },
    {
      id: 'rp1-s04',
      blockType: 'csFinding',
      kind: 'quote',
      text: l(
        L({
          en: 'ESPN app, not Stake.com — say a player “earned” a prize, never that they “won big” or hit a “jackpot”.',
          fa: 'اپ ESPN، نه Stake.com — بگویید بازیکن جایزه‌ای را «به دست آورد»، هرگز نگویید «برد بزرگ» کرد یا «جک‌پات» زد.',
          ar: 'تطبيق ESPN لا Stake.com — قل إن اللاعب «استحقّ» جائزة، ولا تقل أبدًا إنه «ربح بضخامة» أو أصاب «الجائزة الكبرى».',
          de: 'ESPN-App, nicht Stake.com — ein Spieler hat sich einen Preis „verdient“, nie „groß gewonnen“ oder den „Jackpot geknackt“.',
          es: 'La app de ESPN, no Stake.com: di que un jugador «obtuvo» un premio, nunca que «ganó a lo grande» o que se llevó el «jackpot».',
          fr: 'L’appli ESPN, pas Stake.com — dire qu’un joueur a « mérité » un prix, jamais qu’il a « gagné gros » ou décroché le « jackpot ».',
          ja: '目指すのはStake.comではなくESPNのアプリ——プレイヤーは賞金を「獲得した」と言い、「大勝ちした」「ジャックポットを当てた」とは決して言わない。',
        }),
      ),
      attribution: l(
        L({
          en: 'RP1 tone guideline',
          fa: 'راهنمای لحن RP1',
          ar: 'دليل نبرة RP1',
          de: 'RP1-Tonalitätsrichtlinie',
          es: 'Guía de tono de RP1',
          fr: 'Guide de ton RP1',
          ja: 'RP1のトーンガイドライン',
        }),
      ),
    },
    {
      id: 'rp1-s05',
      blockType: 'csNarrative',
      label: 'constraints',
      heading: l(
        L({
          en: 'A USDT-only economy, a mobile-first canvas, a component set with gaps.',
      fa: 'اقتصاد مبتنی بر USDT، طراحی موبایل‌محور و اجزایی که هنوز به تکمیل نیاز داشتند.',
          ar: 'اقتصاد بـ USDT فقط، ولوحة موجّهة للهاتف أولًا، ومجموعة مكوّنات فيها ثغرات.',
          de: 'Eine reine USDT-Ökonomie, eine Mobile-first-Fläche, ein Komponentensatz mit Lücken.',
          es: 'Una economía solo en USDT, un lienzo mobile-first y un conjunto de componentes con huecos.',
          fr: 'Une économie en USDT uniquement, un canevas mobile-first, un jeu de composants lacunaire.',
          ja: 'USDTだけの経済、モバイルファーストのキャンバス、穴のあるコンポーネントセット。',
        }),
      ),
      body: prose(
        dir,
        bullets(
          l(
            L({
              en: [
                'Settlement in USDT only, on BNB Smart Chain (BEP-20) — no utility token.',
                'Mobile-first: one app, navigation locked to three tabs.',
                'An existing component set with an 18-item gap list — no colour or type tokens, no motion spec, an undefined avatar system.',
                'A tone guideline that ruled out casino language.',
              ],
              fa: [
                'تسویه فقط با USDT روی BNB Smart Chain (BEP-20) — بدون توکن کاربردی.',
                'موبایل‌محور: یک اپ، ناوبری قفل‌شده روی سه تب.',
                'مجموعه‌ای موجود از کامپوننت‌ها با فهرست ۱۸ موردی از کاستی‌ها — بدون توکن رنگ و تایپ، بدون مشخصات حرکت، سیستم آواتار تعریف‌نشده.',
                'راهنمای لحنی که زبان کازینویی را کنار می‌گذاشت.',
              ],
              ar: [
                'التسوية بـ USDT فقط على BNB Smart Chain (BEP-20) — من دون عملة منفعة.',
                'الهاتف أولًا: تطبيق واحد، وتنقّل مثبَّت على ثلاثة تبويبات.',
                'مجموعة مكوّنات قائمة بقائمة ثغرات من 18 بندًا — لا رموز ألوان أو خطوط، ولا مواصفات حركة، ونظام صور رمزية غير محدد.',
                'دليل نبرة يستبعد لغة الكازينو.',
              ],
              de: [
                'Abrechnung nur in USDT auf der BNB Smart Chain (BEP-20) — kein Utility-Token.',
                'Mobile-first: eine App, Navigation fest auf drei Tabs.',
                'Ein bestehender Komponentensatz mit einer 18 Punkte langen Lückenliste — keine Farb- oder Typo-Tokens, keine Motion-Spezifikation, ein undefiniertes Avatar-System.',
                'Eine Tonalitätsrichtlinie, die Casino-Sprache ausschloss.',
              ],
              es: [
                'Liquidación solo en USDT, en BNB Smart Chain (BEP-20), sin token de utilidad.',
                'Mobile-first: una sola app, con la navegación fijada en tres pestañas.',
                'Un conjunto de componentes existente con una lista de 18 carencias: sin tokens de color ni de tipografía, sin especificación de movimiento y con un sistema de avatares sin definir.',
                'Una guía de tono que descartaba el lenguaje de casino.',
              ],
              fr: [
                'Règlement uniquement en USDT, sur BNB Smart Chain (BEP-20) — pas de token utilitaire.',
                'Mobile-first : une seule app, une navigation verrouillée sur trois onglets.',
                'Un jeu de composants existant avec une liste de 18 lacunes — pas de tokens de couleur ni de typographie, pas de spécification de motion, un système d’avatars non défini.',
                'Un guide de ton qui excluait le vocabulaire du casino.',
              ],
              ja: [
                '精算はBNB Smart Chain（BEP-20）上のUSDTのみ——ユーティリティトークンはなし。',
                'モバイルファースト：アプリはひとつ、ナビゲーションは3タブに固定。',
                '既存のコンポーネントセットには18項目の不足リストがあった——カラーやタイポグラフィのトークンがなく、モーションの仕様もなく、アバターシステムは未定義。',
                'カジノ的な言葉づかいを排除したトーンガイドライン。',
              ],
            }),
          ),
          dir,
        ),
      ),
    },
    {
      id: 'rp1-s06',
      blockType: 'csOwnership',
      heading: l(
        L({
          en: 'Research, scope and the spec — alongside a product owner.',
    fa: 'پژوهش، تعیین دامنه و تدوین مشخصات در کنار مالک محصول.',
          ar: 'البحث والنطاق والمواصفات — إلى جانب مالك المنتج.',
          de: 'Research, Umfang und Spezifikation — neben einem Product Owner.',
          es: 'Investigación, alcance y la especificación, junto a un product owner.',
          fr: 'Recherche, périmètre et spécification — aux côtés d’un product owner.',
          ja: 'リサーチ、スコープ、仕様——プロダクトオーナーとともに。',
        }),
      ),
      intro: l(
        L({
          en: 'Product design and strategy lead, working alongside a named product owner and a collaborator who authored the project’s later-stage game and community spec.',
    fa: 'راهبری طراحی و راهبرد محصول را در کنار مالک محصول بر عهده داشتم. مشخصات بازی و جامعه برای مراحل بعدی را همکار دیگری نوشت.',
          ar: 'قيادة تصميم المنتج والاستراتيجية، بالعمل إلى جانب مالك منتج محدّد ومتعاون كتب مواصفات الألعاب والمجتمع في مرحلة لاحقة من المشروع.',
          de: 'Lead für Produktdesign und Strategie, in Zusammenarbeit mit einem benannten Product Owner und einem Mitwirkenden, der die spätere Spiel- und Community-Spezifikation des Projekts verfasste.',
          es: 'Líder de diseño de producto y estrategia, junto a un product owner designado y a un colaborador que redactó la especificación de juego y comunidad de la etapa posterior del proyecto.',
          fr: 'Lead design produit et stratégie, aux côtés d’un product owner désigné et d’un collaborateur qui a rédigé la spécification jeu et communauté de la phase ultérieure du projet.',
          ja: 'プロダクトデザインと戦略のリード。担当として名前が明記されたプロダクトオーナーと、プロジェクト後期のゲームとコミュニティの仕様を執筆した協力者とともに取り組んだ。',
        }),
      ),
      own: l(
        L({
          en: [
            'Gamification research: Octalysis across all 8 core drives, turned into an interactive scoring tool in English and Persian',
            'MVP scoping: three-tab navigation, a single club, a USDT-only economy',
            'Documented calls in the conflict-resolution log, including the Duel / Tournament / Rumble naming',
            'The full wireframe spec across all 16 sections, each with a per-screen copy audit',
          ],
          fa: [
            'پژوهش گیمیفیکیشن: Octalysis در هر ۸ محرک اصلی، تبدیل‌شده به ابزار امتیازدهی تعاملی به انگلیسی و فارسی',
            'تعیین دامنهٔ MVP: ناوبری سه‌تبی، یک باشگاه واحد، اقتصادی فقط با USDT',
            'تصمیم‌های مستند در لاگ حل تعارض، از جمله نام‌گذاری Duel / Tournament / Rumble',
            'مشخصات کامل وایرفریم در هر ۱۶ بخش، هرکدام با ممیزی متن صفحه‌به‌صفحه',
          ],
          ar: [
            'بحث التلعيب: Octalysis عبر المحرّكات الأساسية الثمانية كلها، محوَّلًا إلى أداة تقييم تفاعلية بالإنجليزية والفارسية',
            'تحديد نطاق الـ MVP: تنقّل بثلاثة تبويبات، ونادٍ واحد، واقتصاد بـ USDT فقط',
            'قرارات موثّقة في سجل حل النزاعات، ومنها تسمية Duel / Tournament / Rumble',
            'مواصفات الإطارات السلكية الكاملة عبر الأقسام الـ 16، لكل منها تدقيق نصوص لكل شاشة',
          ],
          de: [
            'Gamification-Research: Octalysis über alle 8 Core Drives, umgesetzt in ein interaktives Bewertungswerkzeug auf Englisch und Persisch',
            'MVP-Scoping: Drei-Tab-Navigation, ein einziger Club, eine reine USDT-Ökonomie',
            'Dokumentierte Entscheidungen im Conflict-Resolution-Log, darunter die Benennung Duel / Tournament / Rumble',
            'Die vollständige Wireframe-Spezifikation über alle 16 Bereiche, jeweils mit Copy-Audit pro Screen',
          ],
          es: [
            'Investigación de gamificación: Octalysis en sus 8 core drives, convertido en una herramienta de puntuación interactiva en inglés y persa',
            'Definición del alcance del MVP: navegación de tres pestañas, un solo club y una economía solo en USDT',
            'Decisiones documentadas en el registro de resolución de conflictos, incluida la nomenclatura Duel / Tournament / Rumble',
            'La especificación completa de wireframes en las 16 secciones, cada una con su auditoría de copy por pantalla',
          ],
          fr: [
            'Recherche sur la gamification : Octalysis sur l’ensemble des 8 core drives, transformé en outil de notation interactif en anglais et en persan',
            'Cadrage du MVP : navigation à trois onglets, un seul club, une économie en USDT uniquement',
            'Des arbitrages documentés dans le journal de résolution des conflits, dont la dénomination Duel / Tournament / Rumble',
            'La spécification complète des wireframes sur les 16 sections, chacune avec son audit de copy écran par écran',
          ],
          ja: [
            'ゲーミフィケーションのリサーチ：8つのコアドライブすべてにわたるOctalysis分析を、英語とペルシア語のインタラクティブな採点ツールにした',
            'MVPのスコーピング：3タブのナビゲーション、単一のクラブ、USDTだけの経済',
            'コンフリクト解決ログに記録した判断。Duel／Tournament／Rumbleの命名も含む',
            '16セクションすべてにわたるワイヤーフレーム仕様の全体。各セクションに画面ごとのコピー監査付き',
          ],
        }),
      ),
      coOwn: l(
        L({
          en: ['Product direction, with the product owner'],
          fa: ['جهت‌گیری محصول، همراه با مالک محصول'],
          ar: ['توجّه المنتج، مع مالك المنتج'],
          de: ['Produktausrichtung, gemeinsam mit dem Product Owner'],
          es: ['La dirección de producto, con el product owner'],
          fr: ['La direction produit, avec le product owner'],
          ja: ['プロダクトの方向性（プロダクトオーナーと共同）'],
        }),
      ),
      collaborate: l(
        L({
          en: [
            'The canonical game and community spec — written by a collaborator; it superseded my earlier community draft',
          ],
          fa: ['مشخصات مرجع بازی و جامعه — نوشتهٔ یک همکار؛ جایگزین پیش‌نویس اولیهٔ جامعهٔ من شد'],
          ar: [
            'مواصفات الألعاب والمجتمع المرجعية — كتبها متعاون؛ وحلّت محل مسودّتي الأولى للمجتمع',
          ],
          de: [
            'Die kanonische Spiel- und Community-Spezifikation — von einem Mitwirkenden verfasst; sie löste meinen früheren Community-Entwurf ab',
          ],
          es: [
            'La especificación canónica de juego y comunidad, escrita por un colaborador; sustituyó mi borrador anterior de comunidad',
          ],
          fr: [
            'La spécification de référence du jeu et de la communauté — rédigée par un collaborateur ; elle a remplacé mon premier brouillon sur la communauté',
          ],
          ja: [
            '正式なゲームとコミュニティの仕様——協力者が執筆したもので、私が先に書いたコミュニティの草案に取って代わった',
          ],
        }),
      ),
    },
    {
      id: 'rp1-s07',
      blockType: 'csNarrative',
      label: 'approach',
      heading: l(
        L({
          en: 'Research first, then mechanics, then a ruthless descope.',
    fa: 'از پژوهش تا طراحی سازوکارها و محدودکردن دامنهٔ MVP.',
          ar: 'البحث أولًا، ثم الآليات، ثم تقليص نطاق صارم.',
          de: 'Erst Research, dann Mechaniken, dann ein rigoroser Descope.',
          es: 'Primero la investigación, luego las mecánicas y después un recorte implacable.',
          fr: 'D’abord la recherche, puis les mécaniques, puis un recadrage sans concession.',
          ja: 'まずリサーチ、次にメカニクス、そして容赦ないスコープの削減。',
        }),
      ),
      body: prose(
        dir,
        p(
          L({
            en: 'Research came first: a wide pass across 20-plus competitive and casual-gaming platforms — Skillz, MPL, WinZO, Kongregate, Telegram mini-apps and others — then an Octalysis deep dive detailed enough to turn into an interactive scoring tool: an 8-drive audit, an octagon radar chart, journey-phase and engagement-loop builders and an ethics checklist.',
              fa: 'ابتدا بیش از ۲۰ پلتفرم بازی رقابتی و تفننی، از جمله Skillz، MPL، WinZO، Kongregate و مینی‌اپ‌های تلگرام، را بررسی کردم. سپس چارچوب Octalysis را به ابزار تعاملی امتیازدهی تبدیل کردم: ارزیابی ۸ محرک، نمودار هشت‌ضلعی، طراحی مراحل سفر و چرخه‌های تعامل، و چک‌لیست اخلاقی.',
            ar: 'جاء البحث أولًا: مسح واسع لأكثر من 20 منصة ألعاب تنافسية وعابرة — Skillz وMPL وWinZO وKongregate وتطبيقات تيليغرام المصغّرة وغيرها — ثم غوص معمّق في Octalysis مفصّل بما يكفي ليتحوّل إلى أداة تقييم تفاعلية: تدقيق للمحرّكات الثمانية، ومخطط رادار ثماني، وأدوات بناء لمراحل الرحلة وحلقات الانخراط، وقائمة تحقق أخلاقية.',
            de: 'Zuerst kam das Research: ein breiter Durchgang über mehr als 20 Wettbewerbs- und Casual-Gaming-Plattformen — Skillz, MPL, WinZO, Kongregate, Telegram-Mini-Apps und andere —, dann ein Octalysis-Deep-Dive, detailliert genug für ein interaktives Bewertungswerkzeug: ein Audit über 8 Drives, ein achteckiges Radardiagramm, Builder für Journey-Phasen und Engagement-Loops und eine Ethik-Checkliste.',
            es: 'Primero vino la investigación: un repaso amplio de más de 20 plataformas de juego competitivo y casual —Skillz, MPL, WinZO, Kongregate, mini-apps de Telegram y otras—, y después una inmersión en Octalysis lo bastante detallada como para convertirse en una herramienta de puntuación interactiva: una auditoría de 8 drives, un gráfico de radar octogonal, constructores de fases del recorrido y de bucles de engagement, y una lista de verificación ética.',
            fr: 'La recherche d’abord : un large tour de plus de 20 plateformes de jeu compétitif et casual — Skillz, MPL, WinZO, Kongregate, les mini-apps Telegram et d’autres —, puis une plongée dans Octalysis assez poussée pour devenir un outil de notation interactif : un audit sur 8 drives, un graphique radar octogonal, des constructeurs de phases de parcours et de boucles d’engagement, et une checklist éthique.',
            ja: '最初はリサーチだった。Skillz、MPL、WinZO、Kongregate、Telegramのミニアプリなど、20以上の競技系・カジュアルゲームプラットフォームを幅広く調べ、続いてOctalysisを深く掘り下げた。その深さは、インタラクティブな採点ツールにできるほどだった。8つのドライブの監査、八角形のレーダーチャート、ジャーニーのフェーズとエンゲージメントループのビルダー、そして倫理チェックリスト。',
          }),
        ),
        p(
          L({
            en: 'From there, mechanics design: three mapped systems — a value-creation loop (how a low-balance player earns their way back in), an engagement loop (tournament, duel or club-store choices for a funded player) and a club retention loop with a formal state machine.',
              fa: 'در مرحلهٔ بعد، سه سازوکار را ترسیم کردم: چرخهٔ خلق ارزش برای بازگشت بازیکن با موجودی کم، چرخهٔ تعامل برای انتخاب میان تورنمنت، دوئل و فروشگاه باشگاه، و چرخهٔ حفظ کاربران باشگاه با وضعیت‌های تعریف‌شده.',
            ar: 'ومن هناك، تصميم الآليات: ثلاثة أنظمة مرسومة — حلقة خلق القيمة (كيف يكسب اللاعب منخفض الرصيد طريق عودته)، وحلقة الانخراط (خيارات البطولة أو المبارزة أو متجر النادي للاعب الممول)، وحلقة الاحتفاظ بالنادي بآلة حالات رسمية.',
            de: 'Von dort das Mechanik-Design: drei abgebildete Systeme — ein Wertschöpfungs-Loop (wie sich ein Spieler mit niedrigem Guthaben den Weg zurück verdient), ein Engagement-Loop (Turnier-, Duell- oder Club-Store-Optionen für einen finanzierten Spieler) und ein Club-Retention-Loop mit einer formalen State Machine.',
            es: 'A partir de ahí llegó el diseño de mecánicas, con tres sistemas mapeados: un bucle de creación de valor (cómo un jugador con poco saldo se gana la vuelta), un bucle de engagement (torneo, duelo o tienda del club como opciones para un jugador con fondos) y un bucle de retención del club con una máquina de estados formal.',
            fr: 'Ensuite, la conception des mécaniques : trois systèmes cartographiés — une boucle de création de valeur (comment un joueur au solde faible regagne sa place), une boucle d’engagement (tournoi, duel ou boutique du club pour un joueur disposant de fonds) et une boucle de rétention du club avec une machine à états formelle.',
            ja: 'そこからメカニクスの設計に移った。マッピングした仕組みは3つ——価値創出ループ（残高の少ないプレイヤーがどう稼いで復帰するか）、エンゲージメントループ（資金のあるプレイヤーにとってのトーナメント、デュエル、クラブストアという選択肢）、そして形式的なステートマシンを備えたクラブのリテンションループ。',
          }),
        ),
        p(
          L({
            en: 'MVP descoping followed, tracked in a dated conflict-resolution log rather than left as silent rewrites. A 20-component reuse audit, ranked by reuse score, fed a full wireframe pass across all 16 sections — each with its own per-screen copy audit and a P1/P2/P3 issue log.',
              fa: 'سپس دامنهٔ MVP را کاهش دادم و دلیل تصمیم‌ها را در گزارش تاریخ‌دار حل تعارض ثبت کردم. ۲۰ جزء را از نظر قابلیت استفادهٔ دوباره بررسی و رتبه‌بندی کردم و بر اساس نتیجه، وایرفریم هر ۱۶ بخش را با بازبینی متن صفحه‌ها و فهرست مسائل P1/P2/P3 آماده کردم.',
            ar: 'ثم جاء تقليص نطاق الـ MVP، متتبَّعًا في سجل حل نزاعات مؤرَّخ بدل تركه إعادات كتابة صامتة. وغذّى تدقيق لإعادة استخدام 20 مكوّنًا، مرتَّبًا بدرجة إعادة الاستخدام، مرورًا كاملًا بالإطارات السلكية عبر الأقسام الـ 16 — لكل منها تدقيق نصوص لكل شاشة وسجل مشكلات P1/P2/P3.',
            de: 'Es folgte das MVP-Descoping, festgehalten in einem datierten Conflict-Resolution-Log statt in stillen Umschreibungen. Ein Reuse-Audit über 20 Komponenten, nach Reuse-Score sortiert, speiste einen vollständigen Wireframe-Durchgang über alle 16 Bereiche — jeder mit eigenem Copy-Audit pro Screen und einem P1/P2/P3-Issue-Log.',
            es: 'Después llegó el recorte del MVP, registrado en un registro fechado de resolución de conflictos en lugar de quedar como reescrituras silenciosas. Una auditoría de reutilización de 20 componentes, ordenada por puntuación de reutilización, alimentó una pasada completa de wireframes por las 16 secciones, cada una con su propia auditoría de copy por pantalla y un registro de incidencias P1/P2/P3.',
            fr: 'Vint ensuite le recadrage du MVP, suivi dans un journal daté de résolution des conflits plutôt que laissé en réécritures silencieuses. Un audit de réutilisation de 20 composants, classés par score de réutilisation, a alimenté une passe complète de wireframes sur les 16 sections — chacune avec son propre audit de copy écran par écran et un journal d’anomalies P1/P2/P3.',
            ja: '続いてMVPのスコープ削減を行い、黙って書き換えるのではなく、日付入りのコンフリクト解決ログで追跡した。再利用スコアで順位づけした20コンポーネントの再利用監査が、16セクションすべてにわたるワイヤーフレームの作業につながった。各セクションには、画面ごとのコピー監査とP1/P2/P3の課題ログがある。',
          }),
        ),
      ),
    },
    {
      id: 'rp1-s08',
      blockType: 'csProcess',
      kind: 'process',
      heading: l(
        L({
          en: 'Six passes, in order',
          fa: 'شش گذر، به ترتیب',
          ar: 'ستّ مراحل، بالترتيب',
          de: 'Sechs Durchgänge, der Reihe nach',
          es: 'Seis pasadas, en orden',
          fr: 'Six passes, dans l’ordre',
          ja: '順を追った6つの工程',
        }),
      ),
      steps: [
        {
          id: 'rp1-p01',
          code: 'R1',
          label: l(
            L({
              en: 'Platform research',
              fa: 'پژوهش پلتفرم‌ها',
              ar: 'بحث المنصات',
              de: 'Plattform-Research',
              es: 'Investigación de plataformas',
              fr: 'Recherche sur les plateformes',
              ja: 'プラットフォームのリサーチ',
            }),
          ),
          note: l(
            L({
              en: '20-plus competitive and casual-gaming platforms',
              fa: 'بیش از ۲۰ پلتفرم بازی رقابتی و تفننی',
              ar: 'أكثر من 20 منصة ألعاب تنافسية وعابرة',
              de: 'Mehr als 20 Wettbewerbs- und Casual-Gaming-Plattformen',
              es: 'Más de 20 plataformas de juego competitivo y casual',
              fr: 'Plus de 20 plateformes de jeu compétitif et casual',
              ja: '20以上の競技系・カジュアルゲームプラットフォーム',
            }),
          ),
        },
        {
          id: 'rp1-p02',
          code: 'R2',
          label: l(
            L({
              en: 'Octalysis audit',
              fa: 'ممیزی Octalysis',
              ar: 'تدقيق Octalysis',
              de: 'Octalysis-Audit',
              es: 'Auditoría Octalysis',
              fr: 'Audit Octalysis',
              ja: 'Octalysis監査',
            }),
          ),
          note: l(
            L({
              en: '8 core drives → an interactive scoring tool',
              fa: '۸ محرک اصلی ← ابزار امتیازدهی تعاملی',
              ar: '8 محرّكات أساسية ← أداة تقييم تفاعلية',
              de: '8 Core Drives → ein interaktives Bewertungswerkzeug',
              es: '8 core drives → una herramienta de puntuación interactiva',
              fr: '8 core drives → un outil de notation interactif',
              ja: '8つのコアドライブ → インタラクティブな採点ツール',
            }),
          ),
        },
        {
          id: 'rp1-p03',
          code: 'M1',
          label: l(
            L({
              en: 'Mechanics loops',
              fa: 'چرخه‌های بازی',
              ar: 'حلقات الآليات',
              de: 'Mechanik-Loops',
              es: 'Bucles de mecánicas',
              fr: 'Boucles de mécaniques',
              ja: 'メカニクスのループ',
            }),
          ),
          note: l(
            L({
              en: 'Value creation, engagement, club retention',
              fa: 'خلق ارزش، تعامل و بازگشت به باشگاه',
              ar: 'خلق القيمة، والانخراط، والاحتفاظ بالنادي',
              de: 'Wertschöpfung, Engagement, Club-Retention',
              es: 'Creación de valor, engagement, retención del club',
              fr: 'Création de valeur, engagement, rétention du club',
              ja: '価値創出、エンゲージメント、クラブのリテンション',
            }),
          ),
        },
        {
          id: 'rp1-p04',
          code: 'S1',
          label: l(
            L({
              en: 'MVP descope',
              fa: 'کاهش دامنهٔ MVP',
              ar: 'تقليص نطاق الـ MVP',
              de: 'MVP-Descope',
              es: 'Recorte del MVP',
              fr: 'Recadrage du MVP',
              ja: 'MVPのスコープ削減',
            }),
          ),
          note: l(
            L({
              en: 'Dated conflict-resolution log',
              fa: 'لاگ حل تعارض تاریخ‌دار',
              ar: 'سجل حل نزاعات مؤرَّخ',
              de: 'Datiertes Conflict-Resolution-Log',
              es: 'Registro fechado de resolución de conflictos',
              fr: 'Journal daté de résolution des conflits',
              ja: '日付入りのコンフリクト解決ログ',
            }),
          ),
        },
        {
          id: 'rp1-p05',
          code: 'C1',
          label: l(
            L({
              en: 'Component reuse audit',
              fa: 'ممیزی استفادهٔ مجدد کامپوننت‌ها',
              ar: 'تدقيق إعادة استخدام المكوّنات',
              de: 'Komponenten-Reuse-Audit',
              es: 'Auditoría de reutilización de componentes',
              fr: 'Audit de réutilisation des composants',
              ja: 'コンポーネントの再利用監査',
            }),
          ),
          note: l(
            L({
              en: '20 components ranked, an 18-item gap list',
              fa: '۲۰ کامپوننت رتبه‌بندی‌شده، فهرست ۱۸ موردی کاستی‌ها',
              ar: '20 مكوّنًا مرتَّبًا، وقائمة ثغرات من 18 بندًا',
              de: '20 Komponenten bewertet, eine 18-Punkte-Lückenliste',
              es: '20 componentes clasificados, una lista de 18 carencias',
              fr: '20 composants classés, une liste de 18 lacunes',
              ja: '20コンポーネントを順位づけ、18項目の不足リスト',
            }),
          ),
        },
        {
          id: 'rp1-p06',
          code: 'W1',
          label: l(
            L({
              en: 'Wireframe pass',
              fa: 'تدوین وایرفریم',
              ar: 'مرور الإطارات السلكية',
              de: 'Wireframe-Durchgang',
              es: 'Pasada de wireframes',
              fr: 'Passe de wireframes',
              ja: 'ワイヤーフレーム作業',
            }),
          ),
          note: l(
            L({
              en: '16 sections, copy audit, P1–P3 issue log',
              fa: '۱۶ بخش، ممیزی متن، لاگ مسائل P1–P3',
              ar: '16 قسمًا، وتدقيق نصوص، وسجل مشكلات P1–P3',
              de: '16 Bereiche, Copy-Audit, P1–P3-Issue-Log',
              es: '16 secciones, auditoría de copy, registro de incidencias P1–P3',
              fr: '16 sections, audit de copy, journal d’anomalies P1–P3',
              ja: '16セクション、コピー監査、P1–P3の課題ログ',
            }),
          ),
        },
      ],
    },
    {
      id: 'rp1-s09',
      blockType: 'csProcess',
      kind: 'loop',
      heading: l(
        L({
          en: 'The club retention loop',
          fa: 'حلقهٔ حفظ باشگاه',
          ar: 'حلقة الاحتفاظ بالنادي',
          de: 'Der Club-Retention-Loop',
          es: 'El bucle de retención del club',
          fr: 'La boucle de rétention du club',
          ja: 'クラブのリテンションループ',
        }),
      ),
      steps: [
        {
          id: 'rp1-l01',
          code: 'L1',
          label: l(
            L({
              en: 'Open the club',
              fa: 'باز کردن باشگاه',
              ar: 'فتح النادي',
              de: 'Den Club öffnen',
              es: 'Abrir el club',
              fr: 'Ouvrir le club',
              ja: 'クラブを開く',
            }),
          ),
        },
        {
          id: 'rp1-l02',
          code: 'L2',
          label: l(
            L({
              en: 'See an opportunity',
              fa: 'دیدن یک فرصت',
              ar: 'رؤية فرصة',
              de: 'Eine Gelegenheit sehen',
              es: 'Ver una oportunidad',
              fr: 'Repérer une opportunité',
              ja: 'チャンスを見つける',
            }),
          ),
        },
        {
          id: 'rp1-l03',
          code: 'L3',
          label: l(
            L({
              en: 'Compete',
              fa: 'رقابت کردن',
              ar: 'التنافس',
              de: 'Antreten',
              es: 'Competir',
              fr: 'Entrer en compétition',
              ja: '競う',
            }),
          ),
        },
        {
          id: 'rp1-l04',
          code: 'L4',
          label: l(
            L({
              en: 'The result lands in the feed',
              fa: 'نتیجه در فید نمایش داده می‌شود',
              ar: 'تصل النتيجة إلى الموجز',
              de: 'Das Ergebnis landet im Feed',
              es: 'El resultado llega al feed',
              fr: 'Le résultat arrive dans le fil',
              ja: '結果がフィードに流れる',
            }),
          ),
          note: l(
            L({
              en: 'Win, near-miss, level-up, daily summary',
              fa: 'برد، نزدیک‌به‌برد، ارتقای سطح، خلاصهٔ روزانه',
              ar: 'فوز، أو اقتراب من الفوز، أو رفع مستوى، أو ملخص يومي',
              de: 'Sieg, Beinahe-Treffer, Level-up, Tagesrückblick',
              es: 'Victoria, casi victoria, subida de nivel, resumen diario',
              fr: 'Victoire, quasi-victoire, montée de niveau, résumé quotidien',
              ja: '勝利、惜敗、レベルアップ、デイリーサマリー',
            }),
          ),
        },
      ],
    },
    {
      id: 'rp1-s10',
      blockType: 'csDecisions',
      heading: l(
        L({
          en: 'Four calls that shaped the MVP',
          fa: 'چهار تصمیمی که MVP را شکل دادند',
          ar: 'أربعة قرارات شكّلت الـ MVP',
          de: 'Vier Entscheidungen, die das MVP geprägt haben',
          es: 'Cuatro decisiones que dieron forma al MVP',
          fr: 'Quatre décisions qui ont façonné le MVP',
          ja: 'MVPを形づくった4つの決断',
        }),
      ),
      lede: l(
        L({
          en: 'Recorded in the project’s dated conflict-resolution log, not decided in passing.',
          fa: 'ثبت‌شده در لاگ حل تعارضِ تاریخ‌دار پروژه، نه تصمیم‌هایی گذرا.',
          ar: 'مسجَّلة في سجل حل النزاعات المؤرَّخ للمشروع، لا قرارات عابرة.',
          de: 'Festgehalten im datierten Conflict-Resolution-Log des Projekts, nicht nebenbei entschieden.',
          es: 'Anotadas en el registro fechado de resolución de conflictos del proyecto, no decididas de pasada.',
          fr: 'Consignées dans le journal daté de résolution des conflits du projet, pas tranchées en passant.',
          ja: 'その場の判断ではなく、プロジェクトの日付入り対立解決ログに記録された決定。',
        }),
      ),
      items: [
        {
          id: 'rp1-d01',
          title: l(
            L({
              en: 'Lock navigation to three tabs: Club, Game, Wallet.',
              fa: 'ناوبری را روی سه تب قفل کن: باشگاه، بازی، کیف پول.',
              ar: 'تثبيت التنقّل على ثلاثة تبويبات: النادي، واللعبة، والمحفظة.',
              de: 'Die Navigation auf drei Tabs festlegen: Club, Game, Wallet.',
              es: 'Fijar la navegación en tres pestañas: Club, Game, Wallet.',
              fr: 'Limiter la navigation à trois onglets : Club, Game, Wallet.',
              ja: 'ナビゲーションをClub、Game、Walletの3タブに固定する。',
            }),
          ),
          why: l(
            L({
              en: 'An earlier, much larger vision — a utility token, in-app betting, player-owned clubs and club stores — was cut down to a USDT-only, single-club product.',
              fa: 'چشم‌اندازی قدیمی‌تر و بسیار بزرگ‌تر — توکن کاربردی، شرط‌بندی درون‌برنامه‌ای، باشگاه‌های متعلق به بازیکنان و فروشگاه‌های باشگاه — به محصولی فقط با USDT و یک باشگاه واحد کاهش یافت.',
              ar: 'قُلِّصت رؤية سابقة أكبر بكثير — عملة منفعة، ورهان داخل التطبيق، وأندية يملكها اللاعبون، ومتاجر أندية — إلى منتج بـ USDT فقط ونادٍ واحد.',
              de: 'Eine frühere, viel größere Vision — ein Utility-Token, In-App-Wetten, Clubs im Besitz der Spieler und Club-Stores — wurde auf ein reines USDT-Produkt mit einem einzigen Club zurechtgestutzt.',
              es: 'Una visión anterior, mucho más amplia —un token de utilidad, apuestas dentro de la app, clubes propiedad de los jugadores y tiendas de club—, se redujo a un producto solo en USDT y con un único club.',
              fr: 'Une vision antérieure, bien plus vaste — un utility token, des paris dans l’app, des clubs détenus par les joueurs et des boutiques de club —, a été ramenée à un produit uniquement en USDT, avec un seul club.',
              ja: '以前のはるかに大きな構想——ユーティリティトークン、アプリ内ベッティング、プレイヤー所有のクラブ、クラブストア——は、USDTのみ・クラブひとつのプロダクトへと絞り込まれた。',
            }),
          ),
          alternatives: l(
            L({
              en: 'The earlier vision: a utility token, in-app betting, player-owned clubs and club stores.',
              fa: 'چشم‌انداز قبلی: توکن کاربردی، شرط‌بندی درون‌برنامه‌ای، باشگاه‌های متعلق به بازیکنان و فروشگاه‌های باشگاه.',
              ar: 'الرؤية السابقة: عملة منفعة، ورهان داخل التطبيق، وأندية يملكها اللاعبون، ومتاجر أندية.',
              de: 'Die frühere Vision: ein Utility-Token, In-App-Wetten, Clubs im Spielerbesitz und Club-Stores.',
              es: 'La visión anterior: un token de utilidad, apuestas dentro de la app, clubes propiedad de los jugadores y tiendas de club.',
              fr: 'La vision antérieure : un utility token, des paris dans l’app, des clubs détenus par les joueurs et des boutiques de club.',
              ja: '以前の構想：ユーティリティトークン、アプリ内ベッティング、プレイヤー所有のクラブ、クラブストア。',
            }),
          ),
          tradeoff: l(
            L({
              en: 'A smaller economy — one club, no club stores, no token — in exchange for a scope that could be fully resolved.',
              fa: 'اقتصاد محصول محدودتر شد: یک باشگاه، بدون فروشگاه و توکن. در مقابل، می‌شد دامنهٔ MVP را به‌طور کامل مشخص کرد.',
              ar: 'اقتصاد أصغر — نادٍ واحد، ولا متاجر أندية، ولا عملة — مقابل نطاق يمكن حسمه بالكامل.',
              de: 'Eine kleinere Ökonomie — ein Club, keine Club-Stores, kein Token — im Tausch gegen einen Umfang, der sich vollständig klären ließ.',
              es: 'Una economía más pequeña —un club, sin tiendas de club, sin token— a cambio de un alcance que pudiera resolverse por completo.',
              fr: 'Une économie plus réduite — un club, pas de boutiques de club, pas de token — en échange d’un périmètre qui pouvait être entièrement tranché.',
              ja: 'クラブはひとつ、クラブストアもトークンもない小さな経済圏。その代わりに、完全に確定できるスコープを得た。',
            }),
          ),
          evidence: l(
            L({
              en: 'A fully resolved MVP scope and a 34-component build catalog (9 reused, 25 net-new) with a 3-week build order.',
              fa: 'دامنهٔ MVP و فهرست ساخت ۳۴ جزء مشخص شد: ۹ جزء قابل استفادهٔ دوباره و ۲۵ جزء جدید، با ترتیب ساخت سه‌هفته‌ای.',
              ar: 'نطاق MVP محسوم بالكامل وكتالوج بناء من 34 مكوّنًا (9 مُعاد استخدامها و25 جديدة) مع ترتيب بناء لثلاثة أسابيع.',
              de: 'Ein vollständig geklärter MVP-Umfang und ein Build-Katalog mit 34 Komponenten (9 wiederverwendet, 25 neu) mit einer dreiwöchigen Build-Reihenfolge.',
              es: 'Un alcance del MVP totalmente resuelto y un catálogo de construcción de 34 componentes (9 reutilizados, 25 nuevos) con un orden de construcción de 3 semanas.',
              fr: 'Un périmètre MVP entièrement tranché et un catalogue de build de 34 composants (9 réutilisés, 25 entièrement nouveaux) avec un ordre de build sur 3 semaines.',
              ja: '完全に確定したMVPスコープと、34コンポーネント（再利用9、新規25）のビルドカタログ、そして3週間のビルド順序。',
            }),
          ),
          ...(media.levelUp1 ? { media: media.levelUp1 } : {}),
        },
        {
          id: 'rp1-d02',
          title: l(
            L({
              en: 'Rename the formats: Duel, Tournament, Rumble.',
              fa: 'نام قالب‌ها را یکدست کن: Duel، Tournament و Rumble.',
              ar: 'إعادة تسمية الصيغ: Duel وTournament وRumble.',
              de: 'Die Formate umbenennen: Duel, Tournament, Rumble.',
              es: 'Renombrar los formatos: Duel, Tournament, Rumble.',
              fr: 'Renommer les formats : Duel, Tournament, Rumble.',
              ja: 'フォーマット名をDuel、Tournament、Rumbleに改める。',
            }),
          ),
          why: l(
            L({
              en: 'Three plain names replaced the earlier scheme, resolved in the dated conflict-resolution log rather than by a silent rewrite, so the whole team worked from one current naming.',
              fa: 'سه نام ساده جایگزین طرح قبلی شد، در لاگ حل تعارضِ تاریخ‌دار حل‌وفصل شد نه با بازنویسی خاموش، تا کل تیم با یک نام‌گذاری روز کار کند.',
              ar: 'حلّت ثلاثة أسماء بسيطة محل المخطط السابق، وحُسم الأمر في سجل حل النزاعات المؤرَّخ لا بإعادة كتابة صامتة، فعمل الفريق كله من تسمية واحدة حالية.',
              de: 'Drei schlichte Namen ersetzten das frühere Schema, geklärt im datierten Conflict-Resolution-Log statt durch stilles Umschreiben, sodass das ganze Team mit einer aktuellen Benennung arbeitete.',
              es: 'Tres nombres sencillos sustituyeron al esquema anterior, algo que se resolvió en el registro fechado de resolución de conflictos y no con una reescritura silenciosa, para que todo el equipo trabajara con una única nomenclatura vigente.',
              fr: 'Trois noms simples ont remplacé l’ancien schéma, tranchés dans le journal daté de résolution des conflits plutôt que par une réécriture silencieuse, pour que toute l’équipe travaille avec une seule nomenclature à jour.',
              ja: '3つのシンプルな名前が以前の体系に取って代わった。黙って書き換えるのではなく日付入りの対立解決ログで決着させたので、チーム全員がひとつの最新の名称で作業できた。',
            }),
          ),
          alternatives: l(
            L({
              en: 'Keep “PVP / Public Battle / Family & Friends Battle”.',
              fa: 'حفظ «PVP / Public Battle / Family & Friends Battle».',
              ar: 'الإبقاء على «PVP / Public Battle / Family & Friends Battle».',
              de: '„PVP / Public Battle / Family & Friends Battle“ beibehalten.',
              es: 'Mantener «PVP / Public Battle / Family & Friends Battle».',
              fr: 'Conserver « PVP / Public Battle / Family & Friends Battle ».',
              ja: '「PVP / Public Battle / Family & Friends Battle」を維持する。',
            }),
          ),
          evidence: l(
            L({
              en: 'Credited in the project’s conflict-resolution log.',
              fa: 'در لاگ حل تعارض پروژه ثبت و اعتباردهی شده است.',
              ar: 'مُثبَت في سجل حل النزاعات الخاص بالمشروع.',
              de: 'Im Conflict-Resolution-Log des Projekts vermerkt.',
              es: 'Consignado en el registro de resolución de conflictos del proyecto.',
              fr: 'Consigné dans le journal de résolution des conflits du projet.',
              ja: 'プロジェクトの対立解決ログに記載。',
            }),
          ),
        },
        {
          id: 'rp1-d03',
          title: l(
            L({
              en: 'Turn the Octalysis analysis into a live scoring instrument.',
              fa: 'تحلیل Octalysis را به ابزار تعاملی امتیازدهی تبدیل کن.',
              ar: 'تحويل تحليل Octalysis إلى أداة تقييم حيّة.',
              de: 'Die Octalysis-Analyse in ein lebendiges Bewertungsinstrument verwandeln.',
              es: 'Convertir el análisis Octalysis en un instrumento de puntuación vivo.',
              fr: 'Faire de l’analyse Octalysis un instrument de notation vivant.',
              ja: 'Octalysisの分析を、実際に使える採点ツールにする。',
            }),
          ),
          why: l(
            L({
              en: 'Rather than writing the framework analysis up as a document, a small interactive React tool made it a working instrument — an 8-drive audit, an octagon radar chart, journey-phase and engagement-loop builders and an ethics checklist — in English and Persian.',
              fa: 'به‌جای ثبت تحلیل Octalysis در یک سند، با React ابزاری تعاملی ساختم: ارزیابی ۸ محرک، نمودار هشت‌ضلعی، طراحی مرحله‌های سفر و چرخه‌های تعامل، و چک‌لیست اخلاقی. ابزار به فارسی و انگلیسی کار می‌کند.',
              ar: 'بدل كتابة تحليل الإطار كوثيقة، جعلته أداة React تفاعلية صغيرة أداةً عاملة — تدقيق للمحرّكات الثمانية، ومخطط رادار ثماني، وأدوات بناء لمراحل الرحلة وحلقات الانخراط، وقائمة تحقق أخلاقية — بالإنجليزية والفارسية.',
              de: 'Statt die Framework-Analyse als Dokument aufzuschreiben, machte ein kleines interaktives React-Tool sie zum Arbeitsinstrument — ein Audit über 8 Drives, ein achteckiges Radardiagramm, Builder für Journey-Phasen und Engagement-Loops und eine Ethik-Checkliste — auf Englisch und Persisch.',
              es: 'En lugar de redactar el análisis del framework como un documento, una pequeña herramienta interactiva en React lo convirtió en un instrumento de trabajo —una auditoría de 8 drives, un gráfico de radar octogonal, constructores de fases del recorrido y de bucles de engagement y una checklist ética—, en inglés y persa.',
              fr: 'Plutôt que de rédiger l’analyse du framework sous forme de document, un petit outil React interactif en a fait un instrument de travail — un audit des 8 drives, un graphique radar octogonal, des constructeurs de phases de parcours et de boucles d’engagement et une checklist éthique —, en anglais et en persan.',
              ja: 'フレームワークの分析を文書にまとめる代わりに、小さなインタラクティブReactツールでそれを実際に使える道具にした。8つのドライブの監査、八角形のレーダーチャート、ジャーニーフェーズとエンゲージメントループのビルダー、倫理チェックリストを備え、英語とペルシア語に対応する。',
            }),
          ),
          tradeoff: l(
            L({
              en: 'Time spent on tooling instead of more screens; the tool now stands as a reusable artifact independent of RP1.',
      fa: 'این کار از زمان طراحی صفحه‌های بیشتر کم کرد، اما ابزار حاصل مستقل از RP1 و قابل استفادهٔ دوباره است.',
              ar: 'وقت أُنفق على الأدوات بدل مزيد من الشاشات؛ والأداة تقف الآن كمُنتَج قابل لإعادة الاستخدام مستقل عن RP1.',
              de: 'Zeit für Tooling statt für weitere Screens; das Werkzeug ist heute ein wiederverwendbares Artefakt unabhängig von RP1.',
              es: 'Tiempo dedicado a herramientas en lugar de a más pantallas; la herramienta es hoy un artefacto reutilizable, independiente de RP1.',
              fr: 'Du temps consacré à l’outillage plutôt qu’à davantage d’écrans ; l’outil est désormais un artefact réutilisable, indépendant de RP1.',
              ja: '画面を増やす代わりにツール作りに時間を使った。そのツールは今、RP1から独立した再利用可能な成果物になっている。',
            }),
          ),
          evidence: l(
            L({
              en: 'Every mechanic scored against the framework’s White-Hat / Black-Hat balance.',
              fa: 'هر مکانیک با تعادل White-Hat / Black-Hat چارچوب امتیازدهی شد.',
              ar: 'قُيِّمت كل آلية وفق توازن White-Hat / Black-Hat في الإطار.',
              de: 'Jede Mechanik wurde an der White-Hat-/Black-Hat-Balance des Frameworks gemessen.',
              es: 'Cada mecánica puntuada según el equilibrio White-Hat / Black-Hat del framework.',
              fr: 'Chaque mécanique notée selon l’équilibre White-Hat / Black-Hat du framework.',
              ja: 'すべてのメカニクスを、フレームワークのWhite-Hat / Black-Hatのバランスで採点。',
            }),
          ),
        },
        {
          id: 'rp1-d04',
          title: l(
            L({
              en: 'Mark the older community spec as superseded instead of replacing it quietly.',
              fa: 'مشخصات قدیمی جامعه را منسوخ اعلام کن، به جای جایگزینی بی‌سروصدا.',
              ar: 'وسم مواصفات المجتمع الأقدم بأنها مُلغاة بدل استبدالها بهدوء.',
              de: 'Die ältere Community-Spezifikation als abgelöst kennzeichnen, statt sie still zu ersetzen.',
              es: 'Marcar la especificación de comunidad anterior como sustituida en lugar de reemplazarla en silencio.',
              fr: 'Marquer l’ancienne spécification communautaire comme remplacée au lieu de la substituer en silence.',
              ja: '古いコミュニティ仕様を黙って差し替えず、廃止版として明示する。',
            }),
          ),
          why: l(
            L({
              en: 'Formally marking the earlier community draft as superseded by the collaborator’s canonical game and community spec kept the whole team working from the same current truth instead of arguing from stale docs.',
              fa: 'پیش‌نویس اولیهٔ من دربارهٔ جامعهٔ بازیکنان رسماً کنار گذاشته شد و سندی که همکارم نوشته بود مرجع قرار گرفت. به این ترتیب، همهٔ اعضای تیم به یک نسخه رجوع می‌کردند.',
              ar: 'إن الوسم الرسمي لمسودّة المجتمع السابقة بأنها مُلغاة لصالح مواصفات الألعاب والمجتمع المرجعية التي كتبها المتعاون أبقى الفريق كله يعمل من الحقيقة الحالية نفسها بدل الجدال من وثائق قديمة.',
              de: 'Den früheren Community-Entwurf formal als durch die kanonische Spiel- und Community-Spezifikation des Mitwirkenden abgelöst zu kennzeichnen, hielt das ganze Team bei derselben aktuellen Wahrheit, statt über veraltete Dokumente zu streiten.',
              es: 'Marcar formalmente el borrador de comunidad anterior como sustituido por la especificación canónica de juego y comunidad del colaborador mantuvo a todo el equipo trabajando sobre la misma verdad vigente, en lugar de discutir a partir de documentos desfasados.',
              fr: 'Marquer formellement l’ancien brouillon communautaire comme remplacé par la spécification canonique du jeu et de la communauté rédigée par le collaborateur a permis à toute l’équipe de travailler sur la même vérité à jour, au lieu de débattre à partir de documents périmés.',
              ja: '以前のコミュニティ草案を、協力者による正式なゲーム・コミュニティ仕様に置き換えられたものとして明示したことで、チーム全員が古い文書をもとに議論するのではなく、同じ最新の事実に基づいて作業できた。',
            }),
          ),
          tradeoff: l(
            L({
              en: 'The superseded draft was my own.',
              fa: 'پیش‌نویس منسوخ‌شده، نوشتهٔ خودم بود.',
              ar: 'المسودّة المُلغاة كانت مسودّتي أنا.',
              de: 'Der abgelöste Entwurf war mein eigener.',
              es: 'El borrador sustituido era mío.',
              fr: 'Le brouillon remplacé était le mien.',
              ja: '廃止された草案は、私自身が書いたものだった。',
            }),
          ),
          evidence: l(
            L({
              en: 'Recorded in the conflict-resolution log.',
              fa: 'در لاگ حل تعارض ثبت شده است.',
              ar: 'مسجَّل في سجل حل النزاعات.',
              de: 'Im Conflict-Resolution-Log festgehalten.',
              es: 'Consignado en el registro de resolución de conflictos.',
              fr: 'Consigné dans le journal de résolution des conflits.',
              ja: '対立解決ログに記録。',
            }),
          ),
        },
      ],
    },
    {
      id: 'rp1-s11',
      blockType: 'csNarrative',
      label: 'solution',
      heading: l(
        L({
          en: 'One app, three tabs, every section wireframed.',
          fa: 'یک اپ، سه تب، وایرفریم برای همهٔ بخش‌ها.',
          ar: 'تطبيق واحد، وثلاثة تبويبات، وإطارات سلكية لكل قسم.',
          de: 'Eine App, drei Tabs, jeder Bereich als Wireframe.',
          es: 'Una app, tres pestañas, cada sección en wireframe.',
          fr: 'Une app, trois onglets, chaque section en wireframe.',
          ja: 'ひとつのアプリ、3つのタブ、すべてのセクションをワイヤーフレームに。',
        }),
      ),
      body: prose(
        dir,
        p(
          L({
            en: 'The spec covers the whole app: onboarding with Google, Apple or email and OTP verification; a Games hub aggregating Solo Challenge, Duel, Team Battle and Tournaments; Today Spotlight, a daily single-game competition with a ticket buy-in and live leaderboard; Weekly Legend, a 7-day cross-game competition; Lucky Wheel; Chat; Notifications as rich transactional cards; a USDT-only Wallet with an earnings breakdown; Profile with achievements and an XP-style roadmap; and Settings.',
            fa: 'مشخصات کل اپ را پوشش می‌دهد: ورود با گوگل، اپل یا ایمیل و تأیید OTP؛ هاب بازی‌ها با Solo Challenge، Duel، Team Battle و Tournaments؛ Today Spotlight، رقابت روزانهٔ تک‌بازی با بلیت ورودی و جدول زنده؛ Weekly Legend، رقابت هفت‌روزهٔ چندبازی؛ Lucky Wheel؛ چت؛ اعلان‌ها به شکل کارت‌های تراکنشی غنی؛ کیف پول فقط با USDT و تفکیک درآمد؛ پروفایل با دستاوردها و نقشهٔ راهی به سبک XP؛ و تنظیمات.',
            ar: 'تغطي المواصفات التطبيق كله: تسجيل الدخول بحساب Google أو Apple أو البريد مع تحقق OTP؛ ومركز ألعاب يجمع Solo Challenge وDuel وTeam Battle وTournaments؛ وToday Spotlight، مسابقة يومية بلعبة واحدة بتذكرة دخول ولوحة صدارة مباشرة؛ وWeekly Legend، مسابقة عبر الألعاب لسبعة أيام؛ وLucky Wheel؛ والدردشة؛ والإشعارات كبطاقات معاملاتية غنية؛ ومحفظة بـ USDT فقط مع تفصيل الأرباح؛ وملف شخصي بإنجازات وخريطة طريق بأسلوب XP؛ والإعدادات.',
            de: 'Die Spezifikation deckt die ganze App ab: Onboarding mit Google, Apple oder E-Mail und OTP-Verifizierung; ein Games-Hub mit Solo Challenge, Duel, Team Battle und Tournaments; Today Spotlight, ein täglicher Einzelspiel-Wettbewerb mit Ticket-Buy-in und Live-Leaderboard; Weekly Legend, ein siebentägiger spielübergreifender Wettbewerb; Lucky Wheel; Chat; Benachrichtigungen als reichhaltige Transaktionskarten; eine reine USDT-Wallet mit Ertragsaufschlüsselung; Profil mit Erfolgen und einer XP-artigen Roadmap; und Einstellungen.',
            es: 'La especificación cubre toda la app: onboarding con Google, Apple o correo electrónico y verificación OTP; un hub de juegos que reúne Solo Challenge, Duel, Team Battle y Tournaments; Today Spotlight, una competición diaria de un solo juego con entrada por ticket y clasificación en directo; Weekly Legend, una competición de 7 días entre juegos; Lucky Wheel; chat; notificaciones como tarjetas transaccionales enriquecidas; una billetera solo en USDT con desglose de ganancias; un perfil con logros y una hoja de ruta al estilo XP; y ajustes.',
            fr: 'La spécification couvre toute l’app : onboarding avec Google, Apple ou e-mail et vérification OTP ; un hub de jeux réunissant Solo Challenge, Duel, Team Battle et Tournaments ; Today Spotlight, une compétition quotidienne sur un seul jeu avec ticket d’entrée et classement en direct ; Weekly Legend, une compétition de 7 jours sur plusieurs jeux ; Lucky Wheel ; le chat ; des notifications sous forme de cartes transactionnelles enrichies ; un portefeuille uniquement en USDT avec la ventilation des gains ; un profil avec succès et une feuille de route façon XP ; et les réglages.',
            ja: '仕様はアプリ全体を網羅する。Google、Apple、メールでのオンボーディングとOTP認証。Solo Challenge、Duel、Team Battle、Tournamentsを集約したゲームハブ。チケット制の参加費とライブリーダーボードを備えた、1タイトルで競うデイリー大会Today Spotlight。複数のゲームにまたがる7日間の大会Weekly Legend。Lucky Wheel。チャット。リッチなトランザクションカードとしての通知。収益の内訳を示すUSDT専用のウォレット。実績とXP風のロードマップを備えたプロフィール。そして設定。',
          }),
        ),
        p(
          L({
            en: 'Navigation is locked to three tabs — Club, Game, Wallet — with a single reusable Feed Card pattern (win announcement, tournament starting, near-miss, level-up, daily summary) carrying the Club tab. Three animation systems complete the spec: a profile-entry sequence, a six-keyframe level-up and ten event-based overlays.',
            fa: 'ناوبری به سه تب باشگاه، بازی و کیف پول محدود است. محتوای تب باشگاه با یک الگوی کارتِ قابل استفادهٔ دوباره ساخته می‌شود: اعلام برد، آغاز تورنمنت، نزدیک‌شدن به برد، ارتقای سطح و خلاصهٔ روزانه. سه مجموعه انیمیشن هم در مشخصات آمده است: ورود به پروفایل، ارتقای سطح در شش فریم و ده پوشش تصویری که با رویدادها فعال می‌شوند.',
            ar: 'التنقّل مثبَّت على ثلاثة تبويبات — النادي، واللعبة، والمحفظة — مع نمط Feed Card واحد قابل لإعادة الاستخدام (إعلان فوز، وبدء بطولة، واقتراب من الفوز، ورفع مستوى، وملخص يومي) يحمل تبويب النادي. وتكمل المواصفات ثلاثة أنظمة حركة: تسلسل دخول الملف الشخصي، ورفع مستوى بستة إطارات مفتاحية، وعشر طبقات قائمة على الأحداث.',
            de: 'Die Navigation ist auf drei Tabs festgelegt — Club, Game, Wallet — mit einem einzigen wiederverwendbaren Feed-Card-Muster (Siegmeldung, Turnierstart, Beinahe-Treffer, Level-up, Tagesrückblick), das den Club-Tab trägt. Drei Animationssysteme vervollständigen die Spezifikation: eine Profil-Einstiegssequenz, ein Level-up mit sechs Keyframes und zehn ereignisbasierte Overlays.',
            es: 'La navegación queda fijada en tres pestañas —Club, Game, Wallet— y un único patrón reutilizable de Feed Card (anuncio de victoria, torneo que empieza, casi victoria, subida de nivel, resumen diario) sostiene la pestaña Club. Tres sistemas de animación completan la especificación: una secuencia de entrada al perfil, una subida de nivel en seis fotogramas clave y diez overlays basados en eventos.',
            fr: 'La navigation est limitée à trois onglets — Club, Game, Wallet —, et un unique motif réutilisable de Feed Card (annonce de victoire, tournoi qui commence, quasi-victoire, montée de niveau, résumé quotidien) porte l’onglet Club. Trois systèmes d’animation complètent la spécification : une séquence d’entrée dans le profil, une montée de niveau en six images clés et dix overlays déclenchés par des événements.',
            ja: 'ナビゲーションはClub、Game、Walletの3タブに固定され、Clubタブは再利用可能な単一のFeed Cardパターン（勝利の告知、トーナメント開始、惜敗、レベルアップ、デイリーサマリー）で構成される。仕様を締めくくるのは3つのアニメーションシステムだ。プロフィール登場のシーケンス、6キーフレームのレベルアップ、イベントに応じた10種のオーバーレイ。',
          }),
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
        L({
          en: 'The duel flow: pick an opponent — a friend or a skill-matched stranger — then a player, a format (time limited or race to target) and the stake.',
          fa: 'جریان دوئل: انتخاب حریف — یک دوست یا غریبه‌ای هم‌سطح — سپس بازیکن، قالب (زمان‌دار یا مسابقه تا امتیاز هدف) و شرط.',
          ar: 'مسار المبارزة: اختيار خصم — صديق أو غريب مطابق للمهارة — ثم لاعب، وصيغة (محدودة الوقت أو سباق إلى الهدف)، والرهان.',
          de: 'Der Duell-Flow: einen Gegner wählen — einen Freund oder einen nach Können zugeordneten Fremden —, dann einen Spieler, ein Format (zeitlich begrenzt oder Race to Target) und den Einsatz.',
          es: 'El flujo del duelo: elegir un rival —un amigo o un desconocido emparejado por nivel— y después un jugador, un formato (con límite de tiempo o carrera hasta un objetivo) y la apuesta.',
          fr: 'Le parcours du duel : choisir un adversaire — un ami ou un inconnu de niveau équivalent —, puis un joueur, un format (limité dans le temps ou course à l’objectif) et la mise.',
          ja: 'デュエルのフロー：対戦相手（友人か、スキルでマッチングされた見知らぬ相手）を選び、次にプレイヤー、フォーマット（時間制限制か目標到達レース）、そして賭け金を決める。',
        }),
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
        L({
          en: 'Today’s Spotlight after a run: the near-miss sheet shows the points to the next rank while the ticket is still live; holding first place promises a notification if someone takes the spot; when the Spotlight ends, the final rank and tomorrow’s start time.',
          fa: 'Today’s Spotlight پس از یک دور بازی: برگهٔ نزدیک‌به‌برد تا وقتی بلیت زنده است، امتیاز لازم تا رتبهٔ بعدی را نشان می‌دهد؛ رتبهٔ اول وعدهٔ اعلان می‌دهد اگر کسی جایش را بگیرد؛ و با پایان Spotlight، رتبهٔ نهایی و زمان شروع فردا.',
          ar: 'Today’s Spotlight بعد جولة: تُظهر ورقة الاقتراب من الفوز النقاط اللازمة للترتيب التالي ما دامت التذكرة سارية؛ ويعد المركز الأول بإشعار إن أخذ أحدهم المكان؛ وعند انتهاء الـ Spotlight، الترتيب النهائي وموعد بدء الغد.',
          de: 'Today’s Spotlight nach einer Runde: Das Beinahe-Treffer-Sheet zeigt die Punkte bis zum nächsten Rang, solange das Ticket läuft; Platz eins verspricht eine Benachrichtigung, falls jemand den Platz übernimmt; endet das Spotlight, folgen Endrang und die Startzeit von morgen.',
          es: 'Today’s Spotlight tras una partida: la hoja de casi victoria muestra los puntos que faltan para el siguiente puesto mientras el ticket sigue activo; quien ocupa el primer puesto recibe la promesa de un aviso si alguien se lo arrebata; cuando termina el Spotlight, el puesto final y la hora de inicio de mañana.',
          fr: 'Today’s Spotlight après une partie : la feuille de quasi-victoire indique les points qui manquent pour le rang suivant tant que le ticket est encore actif ; la première place promet une notification si quelqu’un la prend ; à la fin du Spotlight, le rang final et l’heure de départ du lendemain.',
          ja: 'プレイ後のToday’s Spotlight。チケットが有効なうちは、惜敗シートが次の順位までのポイントを示す。1位を守っていれば、誰かに抜かれたときに通知すると約束する。Spotlightが終わると、最終順位と明日の開始時刻を表示する。',
        }),
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
            L({
              en: 'Total balance in USDT — the only currency in the app',
              fa: 'موجودی کل به USDT — تنها ارز اپ',
              ar: 'الرصيد الإجمالي بـ USDT — العملة الوحيدة في التطبيق',
              de: 'Gesamtguthaben in USDT — die einzige Währung der App',
              es: 'Saldo total en USDT — la única moneda de la app',
              fr: 'Solde total en USDT — la seule devise de l’app',
              ja: 'USDT建ての総残高——アプリ唯一の通貨',
            }),
          ),
        },
        {
          id: 'rp1-a14-2',
          text: l(
            L({
              en: 'Withdraw and deposit',
              fa: 'برداشت و واریز',
              ar: 'السحب والإيداع',
              de: 'Auszahlen und Einzahlen',
              es: 'Retirar y depositar',
              fr: 'Retrait et dépôt',
              ja: '出金と入金',
            }),
          ),
        },
        {
          id: 'rp1-a14-3',
          text: l(
            L({
              en: 'Earnings broken down by source: ads, referral, deposit, battle',
              fa: 'درآمد به تفکیک منبع: تبلیغ، معرفی، واریز، نبرد',
              ar: 'الأرباح مفصّلة حسب المصدر: الإعلانات، والإحالة، والإيداع، والمعركة',
              de: 'Erträge nach Quelle: Ads, Referral, Deposit, Battle',
              es: 'Ganancias desglosadas por origen: anuncios, referidos, depósito, batalla',
              fr: 'Gains ventilés par source : publicités, parrainage, dépôt, combat',
              ja: '収益の内訳：広告、紹介、入金、バトル',
            }),
          ),
        },
        {
          id: 'rp1-a14-4',
          text: l(
            L({
              en: 'The on-chain wallet and sending money',
              fa: 'کیف پول زنجیره‌ای و ارسال پول',
              ar: 'المحفظة على السلسلة وإرسال المال',
              de: 'Die On-Chain-Wallet und Geld senden',
              es: 'La billetera on-chain y el envío de dinero',
              fr: 'Le portefeuille on-chain et l’envoi d’argent',
              ja: 'オンチェーンウォレットと送金',
            }),
          ),
        },
        {
          id: 'rp1-a14-5',
          text: l(
            L({
              en: 'Available, in-play and pending balances',
              fa: 'موجودی‌های در دسترس، در بازی و در انتظار',
              ar: 'الأرصدة المتاحة وقيد اللعب والمعلّقة',
              de: 'Verfügbare, im Spiel befindliche und ausstehende Guthaben',
              es: 'Saldos disponible, en juego y pendiente',
              fr: 'Soldes disponible, en jeu et en attente',
              ja: '利用可能、プレイ中、保留中の残高',
            }),
          ),
        },
      ],
      caption: l(
        L({
          en: 'The Wallet: one currency, every earning source visible, and the funds locked in play shown separately.',
          fa: 'کیف پول: یک ارز، هر منبع درآمد قابل مشاهده، و پول درگیر در بازی جداگانه نشان داده می‌شود.',
          ar: 'المحفظة: عملة واحدة، وكل مصادر الأرباح ظاهرة، والأموال المحجوزة في اللعب معروضة على حدة.',
          de: 'Die Wallet: eine Währung, jede Ertragsquelle sichtbar, und die im Spiel gebundenen Mittel getrennt ausgewiesen.',
          es: 'La billetera: una sola moneda, todas las fuentes de ganancias a la vista y los fondos bloqueados en juego mostrados aparte.',
          fr: 'Le portefeuille : une seule devise, chaque source de gains visible, et les fonds engagés en jeu affichés à part.',
          ja: 'ウォレット：通貨はひとつ、すべての収益源が見え、プレイ中にロックされた資金は別に表示される。',
        }),
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
        L({
          en: 'Three of the six keyframes of the level-up animation: the profile avatar gives way to the new level number.',
          fa: 'سه فریم از شش فریم کلیدی انیمیشن ارتقای سطح: آواتار پروفایل جای خود را به عدد سطح جدید می‌دهد.',
          ar: 'ثلاثة من الإطارات المفتاحية الستة لحركة رفع المستوى: الصورة الرمزية للملف الشخصي تفسح المجال لرقم المستوى الجديد.',
          de: 'Drei der sechs Keyframes der Level-up-Animation: Der Profil-Avatar macht der neuen Levelnummer Platz.',
          es: 'Tres de los seis fotogramas clave de la animación de subida de nivel: el avatar del perfil da paso al número del nuevo nivel.',
          fr: 'Trois des six images clés de l’animation de montée de niveau : l’avatar du profil laisse place au numéro du nouveau niveau.',
          ja: 'レベルアップアニメーションの6キーフレームのうち3つ。プロフィールのアバターが新しいレベル番号へと切り替わる。',
        }),
      ),
    },
    {
      id: 'rp1-s16',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'auto',
      items: item('notifications', 'rp1-f16-1'),
      caption: l(
        L({
          en: 'Notifications are transactional cards — deposit, withdrawal, prize, duel and rumble results — each with its own actions.',
          fa: 'اعلان‌ها کارت‌های تراکنشی‌اند — واریز، برداشت، جایزه، نتیجهٔ دوئل و رامبل — هرکدام با اقدام‌های خودش.',
          ar: 'الإشعارات بطاقات معاملاتية — إيداع، وسحب، وجائزة، ونتائج مبارزات ورامبل — لكل منها إجراءاتها.',
          de: 'Benachrichtigungen sind Transaktionskarten — Einzahlung, Auszahlung, Preis, Duell- und Rumble-Ergebnisse — jede mit eigenen Aktionen.',
          es: 'Las notificaciones son tarjetas transaccionales —depósito, retiro, premio, resultados de duelos y de Rumble—, cada una con sus propias acciones.',
          fr: 'Les notifications sont des cartes transactionnelles — dépôt, retrait, prix, résultats de duels et de Rumble —, chacune avec ses propres actions.',
          ja: '通知はトランザクションカードだ。入金、出金、賞金、デュエルやRumbleの結果が、それぞれ専用のアクションとともに届く。',
        }),
      ),
    },
    {
      id: 'rp1-s17',
      blockType: 'csOutcomes',
      heading: l(
        L({
          en: 'What came out of this phase',
          fa: 'حاصل این مرحله',
          ar: 'ما خرج من هذه المرحلة',
          de: 'Was aus dieser Phase hervorging',
          es: 'Lo que salió de esta fase',
          fr: 'Ce qui est sorti de cette phase',
          ja: 'このフェーズで生まれたもの',
        }),
      ),
      intro: l(
        L({
          en: 'RP1 is pre-launch — there is no shipped-product metric to report yet, and this case study doesn’t pretend otherwise.',
          fa: 'RP1 هنوز منتشر نشده — هنوز هیچ معیار محصولِ منتشرشده‌ای برای گزارش نیست، و این مطالعهٔ موردی وانمود نمی‌کند که هست.',
          ar: 'RP1 لم يُطلق بعد — لا مقياس منتج مُطلَق للإبلاغ عنه حتى الآن، وهذه الدراسة لا تدّعي غير ذلك.',
          de: 'RP1 ist noch vor dem Launch — es gibt noch keine Kennzahl eines veröffentlichten Produkts, und diese Fallstudie tut nicht so, als gäbe es eine.',
          es: 'RP1 aún no se ha lanzado — todavía no hay ninguna métrica de producto publicado que reportar, y este caso de estudio no finge lo contrario.',
          fr: 'RP1 n’est pas encore lancé — il n’y a pas encore de métrique de produit livré à présenter, et cette étude de cas ne prétend pas le contraire.',
          ja: 'RP1はローンチ前だ。リリース済みプロダクトとして報告できる指標はまだなく、このケーススタディもそうでないふりはしない。',
        }),
      ),
      items: [
        {
          id: 'rp1-o01',
          kind: 'delivered',
          label: l(
            L({
              en: 'A fully resolved MVP scope',
              fa: 'یک دامنهٔ MVP کاملاً مشخص',
              ar: 'نطاق MVP محسوم بالكامل',
              de: 'Ein vollständig geklärter MVP-Umfang',
              es: 'Un alcance del MVP totalmente resuelto',
              fr: 'Un périmètre MVP entièrement tranché',
              ja: '完全に確定したMVPスコープ',
            }),
          ),
          context: l(
            L({
              en: 'Three-tab navigation, a single club and a USDT-only economy.',
              fa: 'ناوبری سه‌تبی، یک باشگاه واحد و اقتصادی فقط با USDT.',
              ar: 'تنقّل بثلاثة تبويبات، ونادٍ واحد، واقتصاد بـ USDT فقط.',
              de: 'Drei-Tab-Navigation, ein einziger Club und eine reine USDT-Ökonomie.',
              es: 'Navegación de tres pestañas, un único club y una economía solo en USDT.',
              fr: 'Navigation à trois onglets, un club unique et une économie uniquement en USDT.',
              ja: '3タブのナビゲーション、単一のクラブ、USDTのみの経済圏。',
            }),
          ),
          source: l(
            L({
              en: 'RP1 MVP scope and conflict-resolution log',
              fa: 'دامنهٔ MVP و لاگ حل تعارض RP1',
              ar: 'نطاق MVP وسجل حل النزاعات في RP1',
              de: 'RP1-MVP-Umfang und Conflict-Resolution-Log',
              es: 'Alcance del MVP de RP1 y registro de resolución de conflictos',
              fr: 'Périmètre MVP de RP1 et journal de résolution des conflits',
              ja: 'RP1のMVPスコープと対立解決ログ',
            }),
          ),
        },
        {
          id: 'rp1-o02',
          kind: 'delivered',
          label: l(
            L({
              en: 'A build catalog of 34 components',
              fa: 'فهرست ساخت با ۳۴ جزء',
              ar: 'كتالوج بناء من 34 مكوّنًا',
              de: 'Ein Build-Katalog mit 34 Komponenten',
              es: 'Un catálogo de construcción de 34 componentes',
              fr: 'Un catalogue de build de 34 composants',
              ja: '34コンポーネントのビルドカタログ',
            }),
          ),
          context: l(
            L({
              en: '9 reused, 25 net-new, sequenced into a 3-week build order.',
              fa: '۹ استفادهٔ مجدد، ۲۵ جدید، چیده‌شده در ترتیب ساخت سه‌هفته‌ای.',
              ar: '9 مُعاد استخدامها و25 جديدة، مرتَّبة في ترتيب بناء لثلاثة أسابيع.',
              de: '9 wiederverwendet, 25 neu, in eine dreiwöchige Build-Reihenfolge gebracht.',
              es: '9 reutilizados, 25 nuevos, ordenados en un plan de construcción de 3 semanas.',
              fr: '9 réutilisés, 25 entièrement nouveaux, ordonnés selon un ordre de build sur 3 semaines.',
              ja: '再利用9、新規25を、3週間のビルド順序に並べた。',
            }),
          ),
          source: l(
            L({
              en: 'RP1 build catalog',
              fa: 'فهرست ساخت RP1',
              ar: 'كتالوج بناء RP1',
              de: 'RP1-Build-Katalog',
              es: 'Catálogo de construcción de RP1',
              fr: 'Catalogue de build de RP1',
              ja: 'RP1ビルドカタログ',
            }),
          ),
        },
        {
          id: 'rp1-o03',
          kind: 'delivered',
          label: l(
            L({
              en: 'A wireframe spec across all 16 sections',
              fa: 'مشخصات وایرفریم در هر ۱۶ بخش',
              ar: 'مواصفات إطارات سلكية عبر الأقسام الـ 16',
              de: 'Eine Wireframe-Spezifikation über alle 16 Bereiche',
              es: 'Una especificación de wireframes para las 16 secciones',
              fr: 'Une spécification de wireframes couvrant les 16 sections',
              ja: '全16セクションのワイヤーフレーム仕様',
            }),
          ),
          context: l(
            L({
              en: 'Each with a per-screen copy audit and a P1/P2/P3 issue log; 73 exported screens.',
              fa: 'هرکدام با ممیزی متن صفحه‌به‌صفحه و لاگ مسائل P1/P2/P3؛ ۷۳ صفحهٔ خروجی‌گرفته‌شده.',
              ar: 'لكل منها تدقيق نصوص لكل شاشة وسجل مشكلات P1/P2/P3؛ و73 شاشة مُصدَّرة.',
              de: 'Jeder mit Copy-Audit pro Screen und einem P1/P2/P3-Issue-Log; 73 exportierte Screens.',
              es: 'Cada una con una auditoría de textos por pantalla y un registro de incidencias P1/P2/P3; 73 pantallas exportadas.',
              fr: 'Chacune avec un audit des textes écran par écran et un journal des problèmes P1/P2/P3 ; 73 écrans exportés.',
              ja: '各セクションに画面ごとのコピー監査とP1/P2/P3の課題ログ。書き出した画面は73。',
            }),
          ),
          source: l(
            L({
              en: 'Figma — Game Design file',
              fa: 'Figma — فایل Game Design',
              ar: 'Figma — ملف Game Design',
              de: 'Figma — Game-Design-Datei',
              es: 'Figma — archivo Game Design',
              fr: 'Figma — fichier Game Design',
              ja: 'Figma——Game Designファイル',
            }),
          ),
        },
        {
          id: 'rp1-o04',
          kind: 'delivered',
          label: l(
            L({
              en: 'A reusable interactive Octalysis tool',
              fa: 'یک ابزار تعاملی Octalysis قابل استفادهٔ مجدد',
              ar: 'أداة Octalysis تفاعلية قابلة لإعادة الاستخدام',
              de: 'Ein wiederverwendbares interaktives Octalysis-Werkzeug',
              es: 'Una herramienta interactiva y reutilizable de Octalysis',
              fr: 'Un outil Octalysis interactif et réutilisable',
              ja: '再利用可能なインタラクティブOctalysisツール',
            }),
          ),
          context: l(
            L({
              en: '8-drive audit, radar chart, journey and loop builders, ethics checklist — in English and Persian.',
              fa: 'ممیزی ۸ محرک، نمودار رادار، سازندهٔ سفر و حلقه، چک‌لیست اخلاقی — به انگلیسی و فارسی.',
              ar: 'تدقيق للمحرّكات الثمانية، ومخطط رادار، وأدوات بناء للرحلة والحلقات، وقائمة تحقق أخلاقية — بالإنجليزية والفارسية.',
              de: 'Audit über 8 Drives, Radardiagramm, Journey- und Loop-Builder, Ethik-Checkliste — auf Englisch und Persisch.',
              es: 'Auditoría de 8 drives, gráfico de radar, constructores de recorridos y bucles, checklist ética — en inglés y persa.',
              fr: 'Audit des 8 drives, graphique radar, constructeurs de parcours et de boucles, checklist éthique — en anglais et en persan.',
              ja: '8つのドライブの監査、レーダーチャート、ジャーニーとループのビルダー、倫理チェックリスト。英語とペルシア語に対応。',
            }),
          ),
          source: l(
            L({
              en: 'html5-game-gamification-system (React)',
              fa: 'html5-game-gamification-system (React)',
              ar: 'html5-game-gamification-system (React)',
              de: 'html5-game-gamification-system (React)',
              es: 'html5-game-gamification-system (React)',
              fr: 'html5-game-gamification-system (React)',
              ja: 'html5-game-gamification-system (React)',
            }),
          ),
        },
      ],
      shipped: l(
        L({
          en: [
            'Onboarding, Games hub, Today Spotlight, Weekly Legend, Duel, Lucky Wheel, Chat, Notifications, Wallet, Profile and Settings — wireframed',
            'Three animation systems: profile entry, six-keyframe level-up, ten event overlays',
            'One reusable Feed Card pattern carrying the Club tab',
          ],
          fa: [
            'ورود، هاب بازی‌ها، Today Spotlight، Weekly Legend، Duel، Lucky Wheel، چت، اعلان‌ها، کیف پول، پروفایل و تنظیمات — وایرفریم‌شده',
            'سه سیستم انیمیشن: ورود به پروفایل، ارتقای سطح شش‌فریمی، ده روکش رویدادمحور',
            'یک الگوی کارتِ قابل استفادهٔ دوباره برای محتوای تب باشگاه',
          ],
          ar: [
            'تسجيل الدخول، ومركز الألعاب، وToday Spotlight، وWeekly Legend، وDuel، وLucky Wheel، والدردشة، والإشعارات، والمحفظة، والملف الشخصي، والإعدادات — بإطارات سلكية',
            'ثلاثة أنظمة حركة: دخول الملف الشخصي، ورفع مستوى بستة إطارات مفتاحية، وعشر طبقات أحداث',
            'نمط Feed Card واحد قابل لإعادة الاستخدام يحمل تبويب النادي',
          ],
          de: [
            'Onboarding, Games-Hub, Today Spotlight, Weekly Legend, Duel, Lucky Wheel, Chat, Benachrichtigungen, Wallet, Profil und Einstellungen — als Wireframes',
            'Drei Animationssysteme: Profil-Einstieg, Level-up mit sechs Keyframes, zehn Event-Overlays',
            'Ein wiederverwendbares Feed-Card-Muster, das den Club-Tab trägt',
          ],
          es: [
            'Onboarding, hub de juegos, Today Spotlight, Weekly Legend, Duel, Lucky Wheel, chat, notificaciones, billetera, perfil y ajustes — en wireframe',
            'Tres sistemas de animación: entrada al perfil, subida de nivel en seis fotogramas clave, diez overlays de eventos',
            'Un único patrón reutilizable de Feed Card que sostiene la pestaña Club',
          ],
          fr: [
            'Onboarding, hub de jeux, Today Spotlight, Weekly Legend, Duel, Lucky Wheel, chat, notifications, portefeuille, profil et réglages — en wireframes',
            'Trois systèmes d’animation : entrée dans le profil, montée de niveau en six images clés, dix overlays d’événements',
            'Un unique motif réutilisable de Feed Card qui porte l’onglet Club',
          ],
          ja: [
            'オンボーディング、ゲームハブ、Today Spotlight、Weekly Legend、Duel、Lucky Wheel、チャット、通知、ウォレット、プロフィール、設定——すべてワイヤーフレーム化',
            '3つのアニメーションシステム：プロフィール登場、6キーフレームのレベルアップ、10種のイベントオーバーレイ',
            'Clubタブを支える、再利用可能な単一のFeed Cardパターン',
          ],
        }),
      ),
    },
    {
      id: 'rp1-s18',
      blockType: 'csLessons',
      items: [
        {
          id: 'rp1-x01',
          title: l(
            L({
              en: 'A dated conflict-resolution log beats silent rewrites',
    fa: 'دلیل تغییر تصمیم‌ها را با تاریخ ثبت کنید',
              ar: 'سجل حل نزاعات مؤرَّخ يتفوّق على إعادات الكتابة الصامتة',
              de: 'Ein datiertes Conflict-Resolution-Log schlägt stille Umschreibungen',
              es: 'Un registro fechado de resolución de conflictos vale más que las reescrituras silenciosas',
              fr: 'Un journal daté de résolution des conflits vaut mieux que des réécritures silencieuses',
              ja: '黙った書き換えより、日付入りの対立解決ログ',
            }),
          ),
          body: l(
            L({
              en: 'Renaming Duel, Tournament and Rumble, or formally marking an older spec as superseded, kept the whole team working from the same current truth instead of arguing from stale docs.',
              fa: 'وقتی نام‌های Duel، Tournament و Rumble تغییر کرد و سند قدیمی رسماً کنار گذاشته شد، تیم می‌دانست به کدام نسخه رجوع کند. ثبت تاریخ و دلیل تصمیم، جلوی اختلاف بر سر اسناد قدیمی را گرفت.',
              ar: 'إعادة تسمية Duel وTournament وRumble، أو وسم مواصفات أقدم رسميًا بأنها مُلغاة، أبقى الفريق كله يعمل من الحقيقة الحالية نفسها بدل الجدال من وثائق قديمة.',
              de: 'Duel, Tournament und Rumble umzubenennen oder eine ältere Spezifikation formal als abgelöst zu kennzeichnen, hielt das ganze Team bei derselben aktuellen Wahrheit, statt über veraltete Dokumente zu streiten.',
              es: 'Renombrar Duel, Tournament y Rumble, o marcar formalmente una especificación anterior como sustituida, mantuvo a todo el equipo trabajando sobre la misma verdad vigente en lugar de discutir a partir de documentos desfasados.',
              fr: 'Renommer Duel, Tournament et Rumble, ou marquer formellement une ancienne spécification comme remplacée, a permis à toute l’équipe de travailler sur la même vérité à jour au lieu de débattre à partir de documents périmés.',
              ja: 'Duel、Tournament、Rumbleへの改名や、古い仕様を廃止版として正式に明示したことで、チーム全員が古い文書をもとに議論するのではなく、同じ最新の事実に基づいて作業できた。',
            }),
          ),
        },
        {
          id: 'rp1-x02',
          title: l(
            L({
              en: 'Even a well-documented project drifts',
    fa: 'مستندسازی هم به بازبینی منظم نیاز دارد',
              ar: 'حتى المشروع الموثَّق جيدًا ينحرف',
              de: 'Auch ein gut dokumentiertes Projekt driftet',
              es: 'Incluso un proyecto bien documentado se desvía',
              fr: 'Même un projet bien documenté dérive',
              ja: 'よく文書化されたプロジェクトでも、ずれは生じる',
            }),
          ),
          body: l(
            L({
              en: 'The wallet flow names BNB Smart Chain (BEP-20) in the newer, Figma-linked documentation, while an earlier draft says TRC-20/ERC-20. Treating the more recent, cross-referenced source as canonical is right — and a reminder that only a full re-read surfaces small drifts.',
              fa: 'در مستندات جدیدترِ متصل به Figma، شبکهٔ کیف پول BNB Smart Chain (BEP-20) است؛ در پیش‌نویسی قدیمی‌تر TRC-20/ERC-20 آمده بود. منبع جدیدتر مرجع قرار گرفت، اما این اختلاف نشان داد حتی در پروژهٔ مستند هم باید همهٔ نسخه‌ها را دوباره بررسی کرد.',
              ar: 'يذكر مسار المحفظة BNB Smart Chain (BEP-20) في الوثائق الأحدث المرتبطة بـ Figma، بينما تذكر مسودّة سابقة TRC-20/ERC-20. اعتماد المصدر الأحدث والمُحال إليه مرجعًا هو الصواب — وتذكير بأن إعادة قراءة كاملة وحدها تكشف الانحرافات الصغيرة.',
              de: 'Der Wallet-Flow nennt in der neueren, mit Figma verknüpften Dokumentation die BNB Smart Chain (BEP-20), während ein früherer Entwurf TRC-20/ERC-20 angibt. Die neuere, querverwiesene Quelle als kanonisch zu behandeln, ist richtig — und eine Erinnerung daran, dass nur ein vollständiges Wiederlesen kleine Abweichungen aufdeckt.',
              es: 'El flujo de la billetera cita BNB Smart Chain (BEP-20) en la documentación más reciente, vinculada a Figma, mientras que un borrador anterior dice TRC-20/ERC-20. Tratar como canónica la fuente más reciente y con referencias cruzadas es lo correcto — y un recordatorio de que solo una relectura completa saca a la luz las pequeñas desviaciones.',
              fr: 'Le parcours du portefeuille mentionne BNB Smart Chain (BEP-20) dans la documentation la plus récente, liée à Figma, alors qu’un brouillon antérieur indique TRC-20/ERC-20. Considérer comme canonique la source la plus récente et recoupée est la bonne décision — et un rappel que seule une relecture complète fait apparaître les petites dérives.',
              ja: 'ウォレットのフローは、Figmaと紐づいた新しいドキュメントではBNB Smart Chain（BEP-20）を挙げているが、以前の草案ではTRC-20/ERC-20となっている。より新しく相互参照されたソースを正とするのは正しい判断だ。同時に、小さなずれは全体を読み直さなければ見つからないという教訓でもある。',
            }),
          ),
        },
      ],
    },
  ]
}

// ── Assembly ────────────────────────────────────────────────────────────────────────────────

/** Localized project fields for one locale — everything a `fallback: false` site needs filled. */
export function rp1LocalizedFields(locale: Locale, media: Rp1MediaIds) {
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
