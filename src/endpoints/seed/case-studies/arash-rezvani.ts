import type { Project } from '@/payload-types'
import { dirFor, LOCALES, type Locale } from '@/utilities/locale'

import type { MediaSpec } from '../media'
import { archiveIdentity } from './archive'
import {
  ARR_IMAGERY_COPY,
  ARR_LIVE_COPY,
  ARR_LIVE_DESKTOP_HERO,
  ARR_LIVE_DIR,
  ARR_LIVE_LOWER,
  ARR_LIVE_PHONE,
  ARR_LIVE_WAYS,
  ARR_SITE_IMAGES,
  ARR_STUDIES,
  ARR_TURNAROUNDS,
} from './arash-rezvani-imagery'
import { bullets, paragraph, prose } from './lexical'

/**
 * Arash Rezvani (`/work/arash-rezvani`) — a live Persian-first site for a writer, poet and
 * teacher. Every sentence comes from `Docs/Experience/Projects/arash-rezvani/README.md`, corrected
 * 2026-09-24 against the source repository and the live site.
 *
 * Publication gates (held here and in `tests/int/case-study-seeds.int.spec.ts`):
 * - Screenshots are type only. The site's photographs, book covers and posters show Arash himself
 *   or his work, so no page that carries them is captured: no home, about, music, teach, road or
 *   looking page, and nothing below the books page's opening screen. The one exception is the home
 *   page (`live-2026-09-26/`, Sina's call 2026-09-26): only its sections that carry type and the
 *   generated images, never the books shelf or the songs row, with his family name hidden.
 * - The imagery chapter shows only images Sina generated (`arash-rezvani-imagery.ts`, Sina's call
 *   2026-09-26): never a crop of Arash's own photographs and never a book cover.
 * - No birth year or place, family origin or family members, and no contact address or handle.
 * - Every number is one the biography's sourced-numbers table states, as the site's own rule asks.
 * - His English biography has not been reviewed by him, so he is paraphrased, never quoted.
 *
 * Copy lives in one `Copy` object per locale; the sections builder is a pure template over it, so
 * a missing string or a wrong tuple length is a type error. Shared fields (codes, values, media,
 * layout, treatment) live in the builder and are identical in every locale.
 */
export const ARR_SLUG = 'arash-rezvani'
export const ARR_ASSETS = 'Docs/Experience/Projects/arash-rezvani/assets'
const CAPTURE_DIR = 'capture-2026-09'
export const ARR_LOCALES = LOCALES

const ARCHIVE = archiveIdentity(ARR_SLUG)

const MEDIA_FILES = {
  cover: { file: 'mobile/experience-fa.png', name: ARCHIVE.row.cover.name },
  practicesMobile: {
    file: 'mobile/experience-fa-practices.png',
    name: 'arash-rezvani--mobile-practices.png',
  },
  poetryMobile: { file: 'mobile/poetry-fa.png', name: 'arash-rezvani--mobile-poetry.png' },
  calendarMobile: {
    file: 'mobile/contact-fa-calendar.png',
    name: 'arash-rezvani--mobile-calendar.png',
  },
  experienceEn: {
    file: 'desktop/experience-en-fold.png',
    name: 'arash-rezvani--desktop-experience-en.png',
  },
  experienceFa: {
    file: 'desktop/experience-fa-fold.png',
    name: 'arash-rezvani--desktop-experience-fa.png',
  },
  booksFa: { file: 'desktop/books-fa-fold.png', name: 'arash-rezvani--desktop-books.png' },
  lattice: {
    file: 'desktop/experience-fa-lattice.png',
    name: 'arash-rezvani--desktop-lattice.png',
  },
  hoursEn: { file: 'desktop/contact-en-hours-crop.png', name: 'arash-rezvani--desktop-hours.png' },
  calendarFa: {
    file: 'desktop/contact-fa-calendar-crop.png',
    name: 'arash-rezvani--desktop-calendar.png',
  },
  postsFa: { file: 'desktop/posts-fa-fold.png', name: 'arash-rezvani--desktop-journal.png' },
} as const

type CaptureKey = keyof typeof MEDIA_FILES
/** Imagery is keyed by its path under `assets/imagery/`, without the extension. */
type ImageryKey = `${'turnarounds' | 'site' | 'studies'}/${string}`
/** Live home-page captures are keyed `live/<path under assets/live-…/>`, without the extension. */
type LiveKey = `live/${string}`
export type ArrMediaKey = CaptureKey | ImageryKey | LiveKey
type ArrMediaIds = Partial<Record<ArrMediaKey, string>>
type Sections = NonNullable<Project['sections']>

type Two<T = string> = [T, T]
type Three<T = string> = [T, T, T]
type Four<T = string> = [T, T, T, T]
type Five<T = string> = [T, T, T, T, T]
type Six<T = string> = [T, T, T, T, T, T]

export interface ArrCopy {
  statement: string
  industry: string
  team: string
  heroCaption: string
  snapshot: { problem: string; role: string; result: string }
  alt: Record<CaptureKey, string>
  context: { heading: string; body: Two; figureItems: Two; figureCaption: string }
  problem: { heading: string; body: Two; figureCaption: string }
  rule: { text: string; attribution: string; method: string }
  ownership: { heading: string; intro: string; own: Five; collaborate: [string]; note: string }
  approach: {
    heading: string
    body: Two
    insight: string
    processHeading: string
    steps: Five<{ label: string; note: string }>
    annotations: Four
    figureCaption: string
  }
  decisions: {
    heading: string
    lede: string
    items: Four<{ title: string; why: string; alternatives: string; tradeoff: string }>
    hoursEvidence: string
  }
  solution: {
    heading: string
    body: string
    bullets: Four
    figureItems: Two
    figureCaption: string
  }
  outcomes: {
    heading: string
    intro: string
    measured: Two<{ label: string; context: string; source: string }>
    delivered: Two<{ label: string; context: string }>
    shipped: Six
  }
  lessons: { heading: string; items: Three<{ title: string; body: string }> }
}

const EN: ArrCopy = {
  statement:
    'A Persian-first site for a writer, poet and teacher, built on a written design language and a rule that no unsourced number reaches the page.',
  industry: 'Personal site · publishing',
  team: 'Sole designer and developer, working directly with the author',
  heroCaption:
    'The Persian site on a phone: the nine practices as ruled rows, the poetry page, and the Shamsi booking calendar.',
  snapshot: {
    problem:
      'A varied life invites rounding up, and a Persian writer’s site is worth little if crawlers never reach the Persian.',
    role: 'Sole designer and developer: brand, design language, content model, the Payload and Next.js build, and an in-country stack.',
    result:
      'Live since 30 August 2026 with Persian on its own crawlable URLs; no analytics yet, and that gap is on the record.',
  },
  alt: {
    cover: ARCHIVE.row.cover.alt,
    practicesMobile:
      'Arash Rezvani on a phone — the nine practices as numbered rows, each rule ending on the column’s edge',
    poetryMobile:
      'Arash Rezvani on a phone — the poetry page in Persian, a large headline over one line on the ghazal, qasida, rubai and free verse',
    calendarMobile:
      'Arash Rezvani on a phone — the booking calendar for the month of Mehr in Persian numerals, Saturday first, with Fridays closed',
    experienceEn:
      'Arash Rezvani on desktop — the English experience page, headed “More than a title”, inside two ruled walls',
    experienceFa:
      'Arash Rezvani on desktop — the same experience page in Persian, set right to left with no letter-spacing',
    booksFa:
      'Arash Rezvani on desktop — the Persian books page, whose opening says six of close to ten titles are listed and the rest are not yet',
    lattice:
      'Arash Rezvani on desktop — the practices list with its row and column rules, closed by an ink band of sourced figures',
    hoursEn:
      'Arash Rezvani on desktop — a chosen day, Saturday 4 Mehr 1405 with its Gregorian date, and its free quarter-hours in Tehran time',
    calendarFa:
      'Arash Rezvani on desktop — the Persian booking calendar, a square grid with past days and Fridays greyed out',
    postsFa:
      'Arash Rezvani on desktop — the Persian journal, its entries dated in Shamsi and filtered by practice',
  },
  context: {
    heading: 'A career that resists a single headline',
    body: [
      'Arash Rezvani is a writer, poet, teacher, photographer and adventurer. By his own account he has published close to ten books and more than a hundred poems, coached cycling for fifteen years, climbed for more than twenty-five and photographed for more than thirty. The brief was a personal site and a journal for all of it.',
      'Persian is his language and his readers’, so Persian is the site’s default, with English beside it. His experience page names the difficulty in its headline: more than a title.',
    ],
    figureItems: [
      '/en/experience: the English page, set in Latin capitals.',
      '/fa/experience: the same page in Persian, which is never letter-spaced.',
    ],
    figureCaption:
      'One page, two URLs: each language is its own document, not a translation switched by a cookie.',
  },
  problem: {
    heading: 'Truth control and reachability',
    body: [
      'The first problem was truth. A life this varied invites rounding up, so the biography became a source-of-truth document with a table of sourced numbers, each one stated by Arash in writing or in a message, and nothing inferred.',
      'The second was reach. For a writer whose books and readers are Persian, the Persian pages have to be findable at their own addresses. A site that renders Persian well but serves it to no crawler has failed at the one thing it is for.',
    ],
    figureCaption:
      'The books page states its own limits: close to ten titles written, translated and published, six of them listed, the rest not yet.',
  },
  rule: {
    text: '“Nothing here is inferred, and no number outside this table may appear on the site.”',
    attribution: 'The biography’s sourced-numbers table',
    method: 'Built from Arash’s own account and ten messages he sent, one per practice',
  },
  ownership: {
    heading: 'One designer-developer, one author',
    intro:
      'Sole designer and developer, working directly with Arash; the deploy log records several changes made at his word.',
    own: [
      'The brand and the written design language',
      'The content model: 8 collections, 4 globals and 21 page blocks',
      'The Payload and Next.js build, in two languages',
      'The booking system and its calendar',
      'The in-country stack and its deploy log',
    ],
    collaborate: ['Arash: his biography, his practice statements and his calls on content'],
    note: 'Every figure on the site traces back to his own words; where the site and a draft disagree, the biography wins.',
  },
  approach: {
    heading: 'One axiom, and every page measured against it',
    body: [
      'The site first went live on an editorial brand system with a palette drawn from Arash’s own photography: a warm ink, amber, paper, a cool mist and cobalt. Every pair was measured. Amber on paper came out at 2.1:1, so amber is never text on white, and one amber per view became a rule.',
      'Three days later the design language was written down as one sentence, “No line without an end”, with three legal ways for a line to stop: on a wall, on another line, or on a change of ground. Anything else is a defect, not a style, and every page was rebuilt and measured against it.',
    ],
    insight:
      'A second rule applies the same axiom to content: a page says a thing once. Its rollout audit found fourteen repetitions across five pages, and every fix was a subtraction.',
    processHeading: 'From a build to a live, bilingual stack',
    steps: [
      { label: 'Build-out', note: 'Payload inside Next.js, a Persian admin and a deploy pipeline' },
      { label: 'Brand system', note: 'A palette measured from his photography, live on 30 August' },
      {
        label: 'The Lattice',
        note: 'One axiom for every line; pages rebuilt on the real biography',
      },
      { label: 'Own URLs', note: 'Each language at its own prefix, with hreflang and sitemaps' },
      {
        label: 'Booking',
        note: 'A Shamsi calendar for fifteen-minute calls, open since 12 September',
      },
    ],
    annotations: [
      'Row rules end on the column rule: a line stops on another line.',
      'The column rule ends on the band rule under the list.',
      'The walls stop where paper turns to ink: a change of ground is an edge.',
      'Every figure in the band comes from the sourced table, its ≈ and + kept.',
    ],
    figureCaption:
      'The experience page in Persian: walls, row rules and a column rule, closed by the ink band of figures.',
  },
  decisions: {
    heading: 'Four decisions that held',
    lede: 'Each was forced by the audience or the network, not by taste.',
    items: [
      {
        title: 'Give each language its own URL',
        why: 'The first Persian release chose the language by cookie: one URL, two renders. A crawler carries no cookie, so every translated page was reachable at no URL and no hreflang could be emitted. Now English lives under /en, Persian under /fa, and a bare URL redirects to Persian.',
        alternatives: 'One URL, with the language chosen by cookie',
        tradeoff:
          'Every internal link must carry its prefix, and the language toggle has to be a full page load.',
      },
      {
        title: 'Guard bookings with a database index, not a hook',
        why: 'Two confirmed calls can never share a start time. Payload’s own index options cannot say “unique among confirmed rows only”, so the app builds a partial unique index at boot, and public bookings go through one endpoint. Tested as a race: one 201, one 409, one row.',
        alternatives: 'A duplicate check in a save hook',
        tradeoff:
          'If the index fails to build, the site runs on without the guarantee, so the boot log has to be read.',
      },
      {
        title: 'Load a video only when it is asked for',
        why: 'Inside Iran a YouTube player needs a VPN. Each song is a click-to-load card whose poster and title come from the site’s own storage, so the card is whole without one and no player loads until the click.',
        alternatives: 'Embed the player on the page',
        tradeoff: 'Posters are stored, and replaced, by hand.',
      },
      {
        title: 'Keep the whole stack inside Iran',
        why: 'Docker Hub answers the server with 403: five deployments failed at the base-image pull before it came through an Iranian mirror. Storage, Git, the deploy platform and mail all run inside the country.',
        alternatives: 'Public registries and hosted Git',
        tradeoff:
          'More to run on one small server: one build ran out of memory and took the Git server down with it.',
      },
    ],
    hoursEvidence:
      'One day’s free quarter-hours in Tehran time; in English the Shamsi date carries its Gregorian date beneath it.',
  },
  solution: {
    heading: 'Shamsi booking, reach, a Persian admin',
    body: 'Payload 3.88 inside Next.js 16.3 on MongoDB: 8 collections, 4 globals and 21 page blocks, with drafts, live preview and scheduled publishing, carrying 11 pages, 21 posts, 6 books and 5 songs in both languages. Around the content:',
    bullets: [
      'Booking on a Saturday-first Shamsi calendar in Tehran time; a day with nothing free is disabled and says why.',
      'Reach: canonical URLs, hreflang pairs with x-default on Persian, structured data for people, articles, books and videos, share images per language, an RSS feed per language and sitemaps.',
      'Search that reads the index in the page’s own language, so Persian results carry Persian titles.',
      'A Persian admin panel, with the Payload wordmark replaced by Arash’s drawn signature.',
    ],
    figureItems: [
      'The calendar: Saturday first, Persian numerals, Fridays closed.',
      'The journal: every entry dated in Shamsi and filtered by practice.',
    ],
    figureCaption: 'Both in Persian, where the site begins.',
  },
  outcomes: {
    heading: 'Live, with the gaps named',
    intro:
      'Live at arashrezvani.me since 30 August 2026 and taking bookings since 12 September. There are no visitor numbers because there is no analytics of any kind — a gap, not a stance. The CI runner was never installed, so a push to main still reaches the site without lint or type checks.',
    measured: [
      {
        label: 'Repetitions found and removed',
        context: 'The say-it-once audit across five pages; every fix was a subtraction.',
        source: 'The design language’s rollout audit',
      },
      {
        label: 'Tests passing at the last release gate',
        context: 'Beside type checks, lint, a production build and a smoke test before the push.',
        source: 'Deployment log, 18 September 2026',
      },
    ],
    delivered: [
      {
        label: 'Persian and English at their own URLs',
        context: 'Persian by default, both halves in hreflang and in the sitemaps.',
      },
      {
        label: 'A deploy log that keeps its failures',
        context:
          '18 production runs recorded, five of them failed, beside a separate log of every content write and rollback.',
      },
    ],
    shipped: [
      'Shamsi booking',
      'A URL per language',
      'Structured data',
      'Click-to-load video',
      'Persian admin',
      'RSS per language',
    ],
  },
  lessons: {
    heading: 'What I’d keep, and what bit',
    items: [
      {
        title: 'State the language as one sentence',
        body: '“No line without an end” settled arguments without another meeting, because every disagreement reduced to one question: does this line arrive somewhere?',
      },
      {
        title: 'A bilingual site is not bilingual until each language has a URL',
        body: 'The cookie scheme passed every test a person could run, and failed completely for the one visitor that matters most to a writer’s site: the crawler.',
      },
      {
        title: 'An enhancement that cannot fail closed is not one',
        body: 'A WebGL scroll reveal threw in browsers without WebGL and replaced a whole Persian page with an error. It came back behind a capability check and an error boundary that settles to the plain picture.',
      },
    ],
  },
}

const FA: ArrCopy = {
  statement:
    'سایتی فارسی‌محور برای یک نویسنده، شاعر و معلم، بنا شده بر زبان طراحی‌ای مکتوب و قاعده‌ای که نمی‌گذارد هیچ عدد بی‌منبعی به صفحه راه پیدا کند.',
  industry: 'سایت شخصی · نشر',
  team: 'تنها طراح و توسعه‌دهنده، در همکاری مستقیم با نویسنده',
  heroCaption:
    'سایت فارسی روی گوشی: نه حوزه‌ی کار به شکل ردیف‌های خط‌کشی‌شده، صفحه‌ی شعر و تقویم رزرو شمسی.',
  snapshot: {
    problem:
      'زندگی‌ای این‌قدر گوناگون آدم را به گرد کردن رو به بالا وسوسه می‌کند، و سایت یک نویسنده‌ی فارسی‌زبان اگر خزنده‌های موتور جست‌وجو هرگز به صفحه‌های فارسی‌اش نرسند، ارزش چندانی ندارد.',
    role: 'تنها طراح و توسعه‌دهنده: برند، زبان طراحی، مدل محتوا، ساخت با Payload و Next.js، و زیرساخت داخل کشور.',
    result:
      'از ۸ شهریور ۱۴۰۵ روی خط است و فارسی نشانی‌های مستقلی دارد که خزنده‌ها به آن‌ها می‌رسند؛ هنوز هیچ ابزار تحلیل بازدیدی ندارد و این کمبود صراحتاً ثبت شده است.',
  },
  alt: {
    cover:
      'آرش رضوانی روی گوشی — صفحه‌ی فارسی تجربه که با تیترش، «بیشتر از یک عنوان»، میان دیواره‌های خط‌کشی‌شده باز می‌شود',
    practicesMobile:
      'آرش رضوانی روی گوشی — نه حوزه‌ی کار در ردیف‌های شماره‌دار، که خط هر ردیف روی لبه‌ی ستون تمام می‌شود',
    poetryMobile:
      'آرش رضوانی روی گوشی — صفحه‌ی شعر به فارسی، تیتری درشت بالای یک سطر درباره‌ی غزل، قصیده، رباعی و شعر آزاد',
    calendarMobile:
      'آرش رضوانی روی گوشی — تقویم رزرو ماه مهر با ارقام فارسی، با شنبه در آغاز هفته و جمعه‌های بسته',
    experienceEn:
      'آرش رضوانی روی دسکتاپ — صفحه‌ی انگلیسی تجربه، با همان تیتر «بیشتر از یک عنوان» به انگلیسی، میان دو دیواره‌ی خط‌کشی‌شده',
    experienceFa:
      'آرش رضوانی روی دسکتاپ — همان صفحه‌ی تجربه به فارسی، راست‌به‌چپ و بی هیچ فاصله‌گذاری میان حروف',
    booksFa:
      'آرش رضوانی روی دسکتاپ — صفحه‌ی فارسی کتاب‌ها، که در آغازش می‌گوید از نزدیک به ده عنوان کتاب، شش عنوان فهرست شده و بقیه هنوز نه',
    lattice:
      'آرش رضوانی روی دسکتاپ — فهرست حوزه‌ها با خط‌های ردیف و ستونش، که نواری به رنگ جوهر از اعداد مستند آن را می‌بندد',
    hoursEn:
      'آرش رضوانی روی دسکتاپ — روزی انتخاب‌شده، شنبه ۴ مهر ۱۴۰۵ همراه با تاریخ میلادی‌اش، و ربع‌ساعت‌های آزاد آن روز به وقت تهران',
    calendarFa:
      'آرش رضوانی روی دسکتاپ — تقویم فارسی رزرو، جدولی مربعی که روزهای گذشته و جمعه‌ها در آن خاکستری شده‌اند',
    postsFa:
      'آرش رضوانی روی دسکتاپ — یادداشت‌های فارسی، با نوشته‌هایی به تاریخ شمسی که بر اساس حوزه فیلتر می‌شوند',
  },
  context: {
    heading: 'کارنامه‌ای که در یک تیتر نمی‌گنجد',
    body: [
      'آرش رضوانی نویسنده، شاعر، معلم، عکاس و ماجراجوست. به روایت خودش، نزدیک به ده عنوان کتاب و بیش از صد شعر منتشر کرده، پانزده سال مربی دوچرخه‌سواری بوده، بیش از بیست‌وپنج سال کوهنوردی کرده و بیش از سی سال عکاسی. سفارش کار، یک سایت شخصی و یک دفتر یادداشت برای همه‌ی این‌ها بود.',
      'فارسی زبان او و زبان خوانندگان اوست، پس فارسی زبان پیش‌فرض سایت است و انگلیسی در کنارش. صفحه‌ی تجربه‌ی او همین دشواری را در تیترش نام می‌برد: «بیشتر از یک عنوان».',
    ],
    figureItems: [
      '/en/experience: صفحه‌ی انگلیسی، با حروف بزرگ لاتین.',
      '/fa/experience: همان صفحه به فارسی، که هیچ‌وقت فاصله‌گذاری حروف نمی‌گیرد.',
    ],
    figureCaption: 'یک صفحه، دو نشانی: هر زبان سندی مستقل است، نه ترجمه‌ای که با یک کوکی عوض شود.',
  },
  problem: {
    heading: 'کنترل صحت و دسترس‌پذیری',
    body: [
      'مسئله‌ی اول درستی بود. زندگی‌ای این‌قدر گوناگون آدم را به گرد کردن رو به بالا وسوسه می‌کند، پس زندگی‌نامه به سندی مرجع تبدیل شد با یک جدول اعداد مستند؛ هر عدد را خود آرش به‌صورت مکتوب یا در پیامی گفته است و هیچ چیزش استنباطی نیست.',
      'مسئله‌ی دوم دسترسی بود. برای نویسنده‌ای که کتاب‌ها و خوانندگانش فارسی‌اند، صفحه‌های فارسی باید در نشانی‌های خودشان پیدا شوند. سایتی که فارسی را خوب نمایش می‌دهد اما آن را به هیچ خزنده‌ی موتور جست‌وجویی نمی‌رساند، در تنها کاری که برایش ساخته شده شکست خورده است.',
    ],
    figureCaption:
      'صفحه‌ی کتاب‌ها حدود خودش را صریح می‌گوید: نزدیک به ده عنوان کتاب نوشته، ترجمه و منتشر شده، شش عنوانش فهرست شده و بقیه هنوز نه.',
  },
  rule: {
    text: '«هیچ چیز در اینجا استنباطی نیست، و هیچ عددی بیرون از این جدول نباید در سایت بیاید.»',
    attribution: 'جدول اعداد مستند زندگی‌نامه',
    method: 'برگرفته از روایت خود آرش و ده پیامی که فرستاد، یکی برای هر حوزه',
  },
  ownership: {
    heading: 'یک طراح و توسعه‌دهنده، یک نویسنده',
    intro:
      'تنها طراح و توسعه‌دهنده، در همکاری مستقیم با آرش؛ دفتر استقرار چند تغییر را ثبت کرده که به خواست خود او انجام شده است.',
    own: [
      'برند و زبان طراحی مکتوب',
      'مدل محتوا: ۸ مجموعه، ۴ بخش سراسری و ۲۱ بلوک صفحه',
      'ساخت سایت با Payload و Next.js، به دو زبان',
      'سامانه‌ی رزرو و تقویمش',
      'زیرساخت داخل کشور و دفتر استقرارش',
    ],
    collaborate: ['آرش: زندگی‌نامه‌اش، شرح حوزه‌های کارش و تصمیم‌هایش درباره‌ی محتوا'],
    note: 'هر عددی در سایت به حرف خود او برمی‌گردد؛ هر جا سایت با یک پیش‌نویس ناهمخوان باشد، حرف آخر را زندگی‌نامه می‌زند.',
  },
  approach: {
    heading: 'یک اصل، و هر صفحه سنجیده با آن',
    body: [
      'سایت نخست با یک سیستم برند نشریه‌وار روی خط رفت، با پالتی برگرفته از عکس‌های خود آرش: جوهری گرم، کهربایی، کاغذ، مهی خنک و کبالتی. کنتراست هر جفت رنگ سنجیده شد. کهربایی روی کاغذ به ۲٫۱:۱ رسید، پس کهربایی هیچ‌وقت رنگ متن روی سفید نمی‌شود، و «فقط یک کهربایی در هر نما» قاعده شد.',
      'سه روز بعد، زبان طراحی در یک جمله نوشته شد، «هیچ خطی بی‌پایان نیست»، با سه راه مجاز برای پایان یافتن یک خط: روی یک دیواره، روی خطی دیگر، یا روی تغییر زمینه. هر چیز دیگری نقص است، نه سبک، و همه‌ی صفحه‌ها از نو ساخته و با آن سنجیده شدند.',
    ],
    insight:
      'قاعده‌ی دوم همین اصل را بر محتوا اعمال می‌کند: هر صفحه هر چیز را یک بار می‌گوید. ممیزی اجرای قاعده چهارده تکرار در پنج صفحه پیدا کرد، و هر اصلاح یک حذف بود.',
    processHeading: 'از ساخت تا زیرساختی زنده و دوزبانه',
    steps: [
      { label: 'ساخت پایه', note: 'Payload درون Next.js، پنل مدیریت فارسی و خط لوله‌ی استقرار' },
      { label: 'سیستم برند', note: 'پالتی سنجیده از عکس‌هایش، روی خط از ۸ شهریور' },
      {
        label: 'شبکه (The Lattice)',
        note: 'یک اصل برای همه‌ی خط‌ها؛ صفحه‌ها از نو بر پایه‌ی زندگی‌نامه‌ی واقعی ساخته شدند',
      },
      {
        label: 'نشانی‌های مستقل',
        note: 'هر زبان با پیشوند خودش، همراه با hreflang و نقشه‌های سایت',
      },
      { label: 'رزرو', note: 'تقویمی شمسی برای تماس‌های پانزده‌دقیقه‌ای، باز از ۲۱ شهریور' },
    ],
    annotations: [
      'خط‌های ردیف روی خط ستون تمام می‌شوند: خطی روی خطی دیگر می‌ایستد.',
      'خط ستون روی خط نوار زیر فهرست تمام می‌شود.',
      'دیواره‌ها جایی می‌ایستند که زمینه از کاغذ به جوهر می‌رسد: تغییر زمینه خودش لبه است.',
      'هر عدد در نوار از جدول مستند آمده، با همان ≈ و + خودش.',
    ],
    figureCaption:
      'صفحه‌ی تجربه به فارسی: دیواره‌ها، خط‌های ردیف و یک خط ستون، که نوار اعداد به رنگ جوهر آن را می‌بندد.',
  },
  decisions: {
    heading: 'چهار تصمیمی که پابرجا ماند',
    lede: 'هر کدام را مخاطب یا شبکه تحمیل کرد، نه سلیقه.',
    items: [
      {
        title: 'نشانی مستقل برای هر زبان',
        why: 'نخستین نسخه‌ی فارسی زبان را با کوکی انتخاب می‌کرد: یک نشانی، دو خروجی. خزنده‌ی موتور جست‌وجو کوکی با خود ندارد، پس هیچ صفحه‌ی ترجمه‌شده‌ای نشانی‌ای نداشت که بشود به آن رسید و امکان تولید هیچ برچسب hreflang هم نبود. حالا انگلیسی زیر /en است، فارسی زیر /fa، و نشانی بی‌پیشوند به فارسی هدایت می‌شود.',
        alternatives: 'یک نشانی، با انتخاب زبان از راه کوکی',
        tradeoff:
          'هر پیوند داخلی باید پیشوندش را همراه داشته باشد، و تعویض زبان باید با بارگذاری کامل صفحه انجام شود.',
      },
      {
        title: 'محافظت از رزروها با ایندکس پایگاه داده، نه با هوک',
        why: 'دو تماس تأییدشده هرگز نمی‌توانند زمان شروع یکسانی داشته باشند. گزینه‌های ایندکس خود Payload نمی‌توانند بگویند «یکتا فقط در میان ردیف‌های تأییدشده»، پس برنامه هنگام راه‌اندازی یک ایندکس یکتای جزئی می‌سازد و رزروهای عمومی همه از یک مسیر واحد در API می‌گذرند. در آزمون رقابت هم‌زمان: یک 201، یک 409، یک ردیف.',
        alternatives: 'بررسی تکراری بودن در یک هوک ذخیره',
        tradeoff:
          'اگر ساخت ایندکس شکست بخورد، سایت بی این تضمین به کارش ادامه می‌دهد، پس گزارش راه‌اندازی را باید خواند.',
      },
      {
        title: 'بارگذاری ویدیو فقط وقتی خواسته شود',
        why: 'در ایران، پخش‌کننده‌ی YouTube بدون VPN کار نمی‌کند. هر آهنگ کارتی است که با کلیک بارگذاری می‌شود و پوستر و عنوانش از فضای ذخیره‌سازی خود سایت می‌آید، پس کارت بی VPN هم کامل است و تا پیش از کلیک هیچ پخش‌کننده‌ای بارگذاری نمی‌شود.',
        alternatives: 'جاسازی پخش‌کننده در صفحه',
        tradeoff: 'پوسترها دستی ذخیره و دستی جایگزین می‌شوند.',
      },
      {
        title: 'نگه داشتن کل زیرساخت داخل ایران',
        why: 'سرور از Docker Hub پاسخ 403 می‌گیرد: پنج استقرار در مرحله‌ی دریافت ایمیج پایه شکست خوردند تا اینکه ایمیج از یک آینه‌ی ایرانی رسید. فضای ذخیره‌سازی، Git، سکوی استقرار و ایمیل همه داخل کشور اجرا می‌شوند.',
        alternatives: 'رجیستری‌های عمومی و Git میزبانی‌شده',
        tradeoff:
          'بار بیشتری روی یک سرور کوچک: یک بار ساخت، حافظه را تمام کرد و سرور Git را هم با خودش از کار انداخت.',
      },
    ],
    hoursEvidence:
      'ربع‌ساعت‌های آزاد یک روز به وقت تهران؛ در نسخه‌ی انگلیسی، تاریخ میلادی زیر تاریخ شمسی می‌آید.',
  },
  solution: {
    heading: 'رزرو شمسی، دسترس‌پذیری، پنل مدیریت فارسی',
    body: 'Payload 3.88 درون Next.js 16.3 روی MongoDB: ۸ مجموعه، ۴ بخش سراسری و ۲۱ بلوک صفحه، با پیش‌نویس، پیش‌نمایش زنده و انتشار زمان‌بندی‌شده، که ۱۱ صفحه، ۲۱ نوشته، ۶ کتاب و ۵ آهنگ را به هر دو زبان در خود دارد. پیرامون محتوا:',
    bullets: [
      'رزرو روی تقویم شمسی با شنبه در آغاز هفته، به وقت تهران؛ روزی که وقت آزاد ندارد غیرفعال است و دلیلش را می‌گوید.',
      'دسترس‌پذیری: نشانی‌های مرجع (canonical)، جفت‌های hreflang با x-default روی فارسی، داده‌ی ساختاریافته برای اشخاص، مقاله‌ها، کتاب‌ها و ویدیوها، تصویر اشتراک‌گذاری برای هر زبان، یک خوراک RSS برای هر زبان و نقشه‌های سایت.',
      'جست‌وجویی که نمایه را به زبان خود صفحه می‌خواند، پس نتیجه‌های فارسی عنوان فارسی دارند.',
      'پنل مدیریت فارسی، که در آن امضای دست‌نویس آرش جای لوگوی نوشتاری Payload را گرفته است.',
    ],
    figureItems: [
      'تقویم: شنبه در آغاز هفته، ارقام فارسی، جمعه‌ها بسته.',
      'یادداشت‌ها: هر نوشته با تاریخ شمسی و قابل فیلتر بر اساس حوزه.',
    ],
    figureCaption: 'هر دو به فارسی، زبانی که سایت از آن آغاز می‌شود.',
  },
  outcomes: {
    heading: 'روی خط، با کمبودهایی که نامشان برده شده',
    intro:
      'از ۸ شهریور ۱۴۰۵ در arashrezvani.me روی خط است و از ۲۱ شهریور رزرو می‌پذیرد. آماری از بازدیدکنندگان در دست نیست، چون هیچ ابزار تحلیلی از هیچ نوعی در کار نیست — این یک کمبود است، نه یک موضع. اجراکننده‌ی CI هرگز نصب نشد، پس هر ارسال کد به شاخه‌ی main همچنان بدون lint و بررسی نوع‌ها به سایت می‌رسد.',
    measured: [
      {
        label: 'تکرارهای پیداشده و حذف‌شده',
        context: 'ممیزی قاعده‌ی «هر چیز یک بار» در پنج صفحه؛ هر اصلاح یک حذف بود.',
        source: 'ممیزی اجرای قاعده در زبان طراحی',
      },
      {
        label: 'آزمون‌های موفق در آخرین دروازه‌ی انتشار',
        context: 'در کنار بررسی نوع‌ها، lint، ساخت نسخه‌ی تولید و یک آزمون سلامت سریع پیش از ارسال.',
        source: 'دفتر استقرار، ۲۷ شهریور ۱۴۰۵',
      },
    ],
    delivered: [
      {
        label: 'فارسی و انگلیسی در نشانی‌های خودشان',
        context: 'فارسی پیش‌فرض است، و هر دو نیمه در hreflang و نقشه‌های سایت آمده‌اند.',
      },
      {
        label: 'دفتر استقراری که شکست‌هایش را نگه می‌دارد',
        context:
          '۱۸ اجرای تولید ثبت شده که پنج‌تایش شکست خورده، در کنار دفتری جداگانه از هر نوشتن محتوا و هر بازگردانی.',
      },
    ],
    shipped: [
      'رزرو شمسی',
      'یک نشانی برای هر زبان',
      'داده‌ی ساختاریافته',
      'ویدیوی بارگذاری با کلیک',
      'پنل مدیریت فارسی',
      'RSS برای هر زبان',
    ],
  },
  lessons: {
    heading: 'آنچه می‌ماند، و آنچه دردسر شد',
    items: [
      {
        title: 'زبان طراحی را در یک جمله بنویس',
        body: '«هیچ خطی بی‌پایان نیست» بحث‌ها را بی‌نیاز به جلسه‌ای دیگر فیصله داد، چون هر اختلافی به یک پرسش خلاصه می‌شد: آیا این خط به جایی می‌رسد؟',
      },
      {
        title: 'سایت دوزبانه تا هر زبانش نشانی خودش را نداشته باشد، دوزبانه نیست',
        body: 'طرح کوکی از هر آزمونی که یک آدم می‌توانست انجام دهد سربلند بیرون آمد، و برای همان بازدیدکننده‌ای که برای سایت یک نویسنده از همه مهم‌تر است، کاملاً شکست خورد: خزنده‌ی موتور جست‌وجو.',
      },
      {
        title: 'بهبودی که نتواند بی‌خطر شکست بخورد، بهبود نیست',
        body: 'یک جلوه‌ی آشکارسازی با اسکرول مبتنی بر WebGL در مرورگرهای بی WebGL خطا داد و یک صفحه‌ی کامل فارسی را با پیام خطا جایگزین کرد. این جلوه پشت یک بررسی توانایی مرورگر و یک مرز خطا برگشت که در صورت خطا به همان تصویر ساده برمی‌گردد.',
      },
    ],
  },
}

const AR: ArrCopy = {
  statement:
    'موقع بالفارسية أولًا لكاتب وشاعر ومعلّم، قائم على لغة تصميم مكتوبة وعلى قاعدة تمنع أي رقم غير موثّق من الوصول إلى الصفحة.',
  industry: 'موقع شخصي · نشر',
  team: 'المصمّم والمطوّر الوحيد، بالعمل مباشرة مع الكاتب',
  heroCaption:
    'الموقع الفارسي على الهاتف: مجالاته التسعة صفوفًا مسطّرة، وصفحة الشعر، وتقويم الحجز الشمسي.',
  snapshot: {
    problem:
      'الحياة المتنوّعة تغري بتضخيم الأرقام، وموقع كاتب فارسي لا يساوي الكثير إن لم تبلغ زواحف محركات البحث صفحاته الفارسية أبدًا.',
    role: 'المصمّم والمطوّر الوحيد: هوية العلامة، ولغة التصميم، ونموذج المحتوى، والبناء بـ Payload وNext.js، وبنية تقنية داخل البلاد.',
    result:
      'يعمل منذ 30 أغسطس 2026، وللفارسية فيه روابطها الخاصة التي تبلغها زواحف محركات البحث؛ ولا أدوات تحليل فيه بعد، وهذه الفجوة مسجّلة صراحةً.',
  },
  alt: {
    cover:
      'آرش رضواني على الهاتف — صفحة الخبرة الفارسية تنفتح على عنوانها «أكثر من لقب» بين جدران مسطّرة',
    practicesMobile:
      'آرش رضواني على الهاتف — المجالات التسعة صفوفًا مرقّمة، ينتهي خط كل منها عند حافة العمود',
    poetryMobile:
      'آرش رضواني على الهاتف — صفحة الشعر بالفارسية، عنوان كبير فوق سطر واحد عن الغزل والقصيدة والرباعي والشعر الحر',
    calendarMobile:
      'آرش رضواني على الهاتف — تقويم الحجز لشهر مهر بالأرقام الفارسية، يبدأ الأسبوع فيه بالسبت وأيام الجمعة مغلقة',
    experienceEn:
      'آرش رضواني على الحاسوب — صفحة الخبرة الإنجليزية، وعنوانها «أكثر من لقب»، بين جدارين مسطّرين',
    experienceFa:
      'آرش رضواني على الحاسوب — صفحة الخبرة نفسها بالفارسية، مصفوفة من اليمين إلى اليسار بلا تباعد بين الحروف',
    booksFa:
      'آرش رضواني على الحاسوب — صفحة الكتب الفارسية، وتقول في مطلعها إن ستة من قرابة عشرة عناوين مُدرجة، وإن البقية لم تُدرج بعد',
    lattice:
      'آرش رضواني على الحاسوب — قائمة المجالات بخطوط صفوفها وعمودها، يختمها شريط بلون الحبر من الأرقام الموثّقة',
    hoursEn:
      'آرش رضواني على الحاسوب — يوم مختار، السبت 4 مهر 1405 مع تاريخه الميلادي، وأرباع الساعات المتاحة فيه بتوقيت طهران',
    calendarFa:
      'آرش رضواني على الحاسوب — تقويم الحجز الفارسي، شبكة مربّعة تظهر فيها الأيام الماضية وأيام الجمعة باللون الرمادي',
    postsFa:
      'آرش رضواني على الحاسوب — اليوميات الفارسية، مؤرّخة بالتقويم الشمسي وقابلة للتصفية حسب المجال',
  },
  context: {
    heading: 'مسيرة تأبى عنوانًا واحدًا',
    body: [
      'آرش رضواني كاتب وشاعر ومعلّم ومصوّر ومغامر. وبحسب روايته، نشر قرابة عشرة كتب وأكثر من مئة قصيدة، ودرّب على ركوب الدراجات خمسة عشر عامًا، ومارس التسلّق أكثر من خمسة وعشرين عامًا، والتصوير أكثر من ثلاثين. وكان المطلوب موقعًا شخصيًا ويوميات تتّسع لذلك كله.',
      'الفارسية لغته ولغة قرّائه، لذا فهي اللغة الافتراضية للموقع، والإنجليزية إلى جانبها. وتسمّي صفحة خبرته هذه الصعوبة في عنوانها: «أكثر من لقب».',
    ],
    figureItems: [
      '/en/experience: الصفحة الإنجليزية، بحروف لاتينية كبيرة.',
      '/fa/experience: الصفحة نفسها بالفارسية، التي لا يُباعَد بين حروفها أبدًا.',
    ],
    figureCaption:
      'صفحة واحدة، ورابطان: كل لغة وثيقة قائمة بذاتها، لا ترجمة تُبدَّل بملف تعريف ارتباط.',
  },
  problem: {
    heading: 'ضبط الحقيقة وإمكانية الوصول',
    body: [
      'كانت المشكلة الأولى هي الحقيقة. فحياة بهذا التنوّع تغري بتضخيم الأرقام، لذا صارت السيرة وثيقة مرجعية فيها جدول للأرقام الموثّقة، كل رقم منها ذكره آرش كتابةً أو في رسالة، ولا شيء فيها مستنتَج.',
      'والثانية كانت الوصول. فلكاتب كتبه وقرّاؤه بالفارسية، يجب أن يُعثر على الصفحات الفارسية في عناوينها الخاصة. والموقع الذي يعرض الفارسية جيدًا لكنه لا يقدّمها لأي زاحف من زواحف محركات البحث قد أخفق في الشيء الوحيد الذي وُجد من أجله.',
    ],
    figureCaption:
      'تعلن صفحة الكتب حدودها بنفسها: قرابة عشرة عناوين كُتبت وتُرجمت ونُشرت، أُدرج ستة منها، والبقية لم تُدرج بعد.',
  },
  rule: {
    text: '«لا شيء هنا مستنتَج، ولا يجوز أن يظهر على الموقع أي رقم من خارج هذا الجدول.»',
    attribution: 'جدول الأرقام الموثّقة في السيرة',
    method: 'مبنيّ على رواية آرش نفسه وعشر رسائل أرسلها، رسالة لكل مجال',
  },
  ownership: {
    heading: 'مصمّم ومطوّر واحد، وكاتب واحد',
    intro:
      'المصمّم والمطوّر الوحيد، بالعمل مباشرة مع آرش؛ ويسجّل سجلّ النشر عدة تغييرات أُجريت بطلب منه.',
    own: [
      'هوية العلامة ولغة التصميم المكتوبة',
      'نموذج المحتوى: 8 مجموعات و4 إعدادات عامة و21 كتلة للصفحات',
      'البناء بـ Payload وNext.js، بلغتين',
      'نظام الحجز وتقويمه',
      'البنية التقنية داخل البلاد وسجلّ نشرها',
    ],
    collaborate: ['آرش: سيرته، ونصوص مجالاته، وقراراته بشأن المحتوى'],
    note: 'كل رقم على الموقع يعود إلى كلماته هو؛ وحيث يختلف الموقع مع مسوّدة، تكون الكلمة الفصل للسيرة.',
  },
  approach: {
    heading: 'مسلّمة واحدة، وكل صفحة تُقاس عليها',
    body: [
      'انطلق الموقع أولًا بنظام هوية تحريري ولوحة ألوان مستمدّة من صور آرش نفسه: الحبر الدافئ، والكهرماني، والورق، والضباب البارد، والكوبالتي. وقيس التباين في كل زوج من الألوان. فجاء الكهرماني على الورق بنسبة 2.1:1، لذا لا يُستخدم الكهرماني أبدًا لونًا لنص على الأبيض، وصار «كهرماني واحد في كل مشهد» قاعدة.',
      'بعد ثلاثة أيام دُوِّنت لغة التصميم في جملة واحدة، «لا خطّ بلا نهاية»، مع ثلاث طرق مشروعة لتوقّف الخط: عند جدار، أو عند خط آخر، أو عند تغيّر الأرضية. وكل ما عدا ذلك عيب لا أسلوب، وأُعيد بناء كل صفحة وقياسها على هذه الجملة.',
    ],
    insight:
      'وتطبّق قاعدة ثانية المسلّمة نفسها على المحتوى: الصفحة تقول الشيء مرة واحدة. وقد وجد تدقيق التطبيق أربعة عشر تكرارًا في خمس صفحات، وكان كل إصلاح حذفًا.',
    processHeading: 'من البناء إلى بنية تقنية حيّة ثنائية اللغة',
    steps: [
      { label: 'البناء', note: 'Payload داخل Next.js، ولوحة إدارة فارسية، ومسار للنشر' },
      { label: 'نظام الهوية', note: 'لوحة ألوان مقيسة من صوره، أُطلقت في 30 أغسطس' },
      {
        label: 'الشبكة (The Lattice)',
        note: 'مسلّمة واحدة لكل خط؛ وأُعيد بناء الصفحات على السيرة الحقيقية',
      },
      { label: 'روابط مستقلة', note: 'لكل لغة بادئتها الخاصة، مع hreflang وخرائط الموقع' },
      { label: 'الحجز', note: 'تقويم شمسي لمكالمات من خمس عشرة دقيقة، مفتوح منذ 12 سبتمبر' },
    ],
    annotations: [
      'تنتهي خطوط الصفوف عند خط العمود: خط يتوقّف عند خط آخر.',
      'ينتهي خط العمود عند خط الشريط أسفل القائمة.',
      'تتوقّف الجدران حيث يتحوّل الورق إلى حبر: تغيّر الأرضية حافة.',
      'كل رقم في الشريط مأخوذ من الجدول الموثّق، مع الإبقاء على ≈ و+.',
    ],
    figureCaption:
      'صفحة الخبرة بالفارسية: الجدران وخطوط الصفوف وخط العمود، يختمها شريط الأرقام بلون الحبر.',
  },
  decisions: {
    heading: 'أربعة قرارات صمدت',
    lede: 'فرض كلًّا منها الجمهور أو الشبكة، لا الذوق.',
    items: [
      {
        title: 'رابط مستقل لكل لغة',
        why: 'كان الإصدار الفارسي الأول يختار اللغة عبر ملف تعريف الارتباط: رابط واحد، وعرضان. وزاحف محركات البحث لا يحمل ملفات تعريف ارتباط، فلم تكن أي صفحة مترجمة متاحة على أي رابط، ولم يكن ممكنًا إصدار أي وسم hreflang. أما الآن فالإنجليزية تحت /en، والفارسية تحت /fa، والرابط المجرّد يُحوَّل إلى الفارسية.',
        alternatives: 'رابط واحد، واللغة تُختار عبر ملف تعريف الارتباط',
        tradeoff:
          'يجب أن يحمل كل رابط داخلي بادئته، ويجب أن يكون تبديل اللغة تحميلًا كاملًا للصفحة.',
      },
      {
        title: 'حماية الحجوزات بفهرس في قاعدة البيانات، لا بخطّاف',
        why: 'لا يمكن أبدًا أن تتشارك مكالمتان مؤكَّدتان وقت البدء نفسه. وخيارات الفهرسة في Payload نفسه لا تستطيع التعبير عن «فريد بين الصفوف المؤكَّدة فقط»، لذا يبني التطبيق فهرسًا فريدًا جزئيًا عند الإقلاع، وتمرّ الحجوزات العامة عبر نقطة وصول واحدة. واختُبر ذلك كسباق متزامن: استجابة 201 واحدة، و409 واحدة، وصف واحد.',
        alternatives: 'فحص للتكرار في خطّاف الحفظ',
        tradeoff:
          'إن فشل بناء الفهرس، يواصل الموقع العمل من دون هذا الضمان، لذا يجب قراءة سجلّ الإقلاع.',
      },
      {
        title: 'تحميل الفيديو فقط عند طلبه',
        why: 'داخل إيران، يحتاج مشغّل YouTube إلى VPN. وكل أغنية بطاقة تُحمَّل عند النقر، يأتي ملصقها وعنوانها من تخزين الموقع نفسه، فتكتمل البطاقة من دون VPN ولا يُحمَّل أي مشغّل قبل النقر.',
        alternatives: 'تضمين المشغّل في الصفحة',
        tradeoff: 'الملصقات تُخزَّن وتُستبدل يدويًا.',
      },
      {
        title: 'إبقاء البنية التقنية كلها داخل إيران',
        why: 'يردّ Docker Hub على الخادم بالرمز 403: فشلت خمس عمليات نشر عند سحب الصورة الأساسية قبل أن تصل عبر مرآة إيرانية. والتخزين وGit ومنصة النشر والبريد كلها تعمل داخل البلاد.',
        alternatives: 'السجلات العامة وGit المستضاف',
        tradeoff:
          'أعباء أكثر على خادم صغير واحد: نفدت الذاكرة في إحدى عمليات البناء فأسقطت خادم Git معها.',
      },
    ],
    hoursEvidence:
      'أرباع الساعات المتاحة في يوم واحد بتوقيت طهران؛ وفي الإنجليزية يحمل التاريخ الشمسي تاريخه الميلادي تحته.',
  },
  solution: {
    heading: 'حجز شمسي، ووصول، ولوحة إدارة فارسية',
    body: 'Payload 3.88 داخل Next.js 16.3 على MongoDB: 8 مجموعات و4 إعدادات عامة و21 كتلة للصفحات، مع المسوّدات والمعاينة الحيّة والنشر المجدول، وتحمل 11 صفحة و21 تدوينة و6 كتب و5 أغانٍ باللغتين. وحول المحتوى:',
    bullets: [
      'حجز على تقويم شمسي يبدأ بالسبت، بتوقيت طهران؛ واليوم الذي لا موعد متاحًا فيه يُعطَّل ويذكر السبب.',
      'الوصول: روابط أساسية (canonical)، وأزواج hreflang مع x-default على الفارسية، وبيانات منظّمة للأشخاص والمقالات والكتب والفيديوهات، وصور مشاركة لكل لغة، وخلاصة RSS لكل لغة، وخرائط للموقع.',
      'بحث يقرأ الفهرس بلغة الصفحة نفسها، فتحمل النتائج الفارسية عناوين فارسية.',
      'لوحة إدارة فارسية، حلّ فيها توقيع آرش المرسوم بيده محلّ الشعار النصي لـ Payload.',
    ],
    figureItems: [
      'التقويم: السبت أولًا، والأرقام الفارسية، والجمعة مغلقة.',
      'اليوميات: كل تدوينة مؤرّخة بالتقويم الشمسي وقابلة للتصفية حسب المجال.',
    ],
    figureCaption: 'كلاهما بالفارسية، حيث يبدأ الموقع.',
  },
  outcomes: {
    heading: 'يعمل، والفجوات مسمّاة',
    intro:
      'يعمل على arashrezvani.me منذ 30 أغسطس 2026 ويستقبل الحجوزات منذ 12 سبتمبر. ولا أرقام عن الزوار لأنه لا توجد أدوات تحليل من أي نوع — وهذه فجوة لا موقف. ولم يُثبَّت مشغّل CI قط، لذا لا يزال أي دفع إلى الفرع main يصل إلى الموقع من دون فحص lint أو فحص الأنواع.',
    measured: [
      {
        label: 'تكرارات عُثر عليها وأُزيلت',
        context: 'تدقيق قاعدة «قل الشيء مرة واحدة» في خمس صفحات؛ وكان كل إصلاح حذفًا.',
        source: 'تدقيق التطبيق في لغة التصميم',
      },
      {
        label: 'اختبارات ناجحة عند آخر بوابة إصدار',
        context: 'إلى جانب فحص الأنواع وlint وبناء الإنتاج واختبار سريع للتشغيل قبل الدفع.',
        source: 'سجلّ النشر، 18 سبتمبر 2026',
      },
    ],
    delivered: [
      {
        label: 'الفارسية والإنجليزية على روابطهما الخاصة',
        context: 'الفارسية افتراضيًا، والنصفان كلاهما في hreflang وفي خرائط الموقع.',
      },
      {
        label: 'سجلّ نشر يحتفظ بإخفاقاته',
        context:
          'سُجّلت 18 عملية تشغيل في الإنتاج، فشلت خمس منها، إلى جانب سجلّ منفصل لكل كتابة للمحتوى وكل تراجع.',
      },
    ],
    shipped: [
      'حجز شمسي',
      'رابط لكل لغة',
      'بيانات منظّمة',
      'فيديو يُحمَّل عند النقر',
      'لوحة إدارة فارسية',
      'RSS لكل لغة',
    ],
  },
  lessons: {
    heading: 'ما يستحق الإبقاء، وما كان موجعًا',
    items: [
      {
        title: 'صُغ لغة التصميم في جملة واحدة',
        body: 'حسمت «لا خطّ بلا نهاية» الخلافات من دون اجتماع آخر، لأن كل خلاف كان يُختزل في سؤال واحد: هل يصل هذا الخط إلى مكان ما؟',
      },
      {
        title: 'الموقع الثنائي اللغة ليس ثنائي اللغة حتى يكون لكل لغة رابط',
        body: 'اجتاز نظام ملف تعريف الارتباط كل اختبار يستطيع شخص إجراءه، وأخفق تمامًا مع الزائر الأهم لموقع أي كاتب: زاحف محركات البحث.',
      },
      {
        title: 'التحسين الذي لا يستطيع أن يفشل بأمان ليس تحسينًا',
        body: 'ألقى تأثير إظهار بالتمرير مبنيّ على WebGL خطأً في المتصفحات التي لا تدعم WebGL، فحلّت رسالة خطأ محلّ صفحة فارسية كاملة. ثم عاد خلف فحص لقدرات المتصفح وحدٍّ للأخطاء يستقر على الصورة البسيطة.',
      },
    ],
  },
}

const ES: ArrCopy = {
  statement:
    'Un sitio primero en persa para un escritor, poeta y profesor, sobre un lenguaje de diseño escrito y una regla: ninguna cifra sin fuente llega a la página.',
  industry: 'Sitio personal · edición',
  team: 'Único diseñador y desarrollador, en trato directo con el autor',
  heroCaption:
    'El sitio en persa en un móvil: las nueve prácticas en filas separadas por reglas, la página de poesía y el calendario de reservas en el calendario solar persa (Shamsi).',
  snapshot: {
    problem:
      'Una vida tan variada invita a redondear al alza, y el sitio de un escritor persa vale poco si los rastreadores nunca llegan a las páginas en persa.',
    role: 'Único diseñador y desarrollador: marca, lenguaje de diseño, modelo de contenido, el desarrollo con Payload y Next.js, y una infraestructura dentro del país.',
    result:
      'En línea desde el 30 de agosto de 2026, con el persa en sus propias URL rastreables; aún sin analítica, y esa carencia se declara abiertamente.',
  },
  alt: {
    cover:
      'Arash Rezvani en un móvil: la página de experiencia en persa, que abre con su titular, «Más que un título», entre muros trazados con reglas',
    practicesMobile:
      'Arash Rezvani en un móvil: las nueve prácticas como filas numeradas, cada regla termina en el borde de la columna',
    poetryMobile:
      'Arash Rezvani en un móvil: la página de poesía en persa, un gran titular sobre una sola línea acerca del gazal, la casida, el rubai y el verso libre',
    calendarMobile:
      'Arash Rezvani en un móvil: el calendario de reservas del mes de Mehr en números persas, con la semana empezando en sábado y los viernes cerrados',
    experienceEn:
      'Arash Rezvani en escritorio: la página de experiencia en inglés, encabezada por «Más que un título», entre dos muros trazados con reglas',
    experienceFa:
      'Arash Rezvani en escritorio: la misma página de experiencia en persa, compuesta de derecha a izquierda y sin espaciado entre letras',
    booksFa:
      'Arash Rezvani en escritorio: la página de libros en persa, cuya entrada indica que figuran seis de cerca de diez títulos y que el resto todavía no',
    lattice:
      'Arash Rezvani en escritorio: la lista de prácticas con sus reglas de fila y de columna, cerrada por una banda de tinta con cifras con fuente',
    hoursEn:
      'Arash Rezvani en escritorio: un día elegido, sábado 4 de Mehr de 1405, con su fecha gregoriana, y sus cuartos de hora libres en hora de Teherán',
    calendarFa:
      'Arash Rezvani en escritorio: el calendario de reservas en persa, una cuadrícula cuadrada con los días pasados y los viernes en gris',
    postsFa:
      'Arash Rezvani en escritorio: el diario en persa, con sus entradas fechadas en Shamsi y filtradas por práctica',
  },
  context: {
    heading: 'Una carrera que no cabe en un solo titular',
    body: [
      'Arash Rezvani es escritor, poeta, profesor, fotógrafo y aventurero. Según su propio relato, ha publicado cerca de diez libros y más de cien poemas, ha sido entrenador de ciclismo durante quince años, escala desde hace más de veinticinco y fotografía desde hace más de treinta. El encargo era un sitio personal y un diario para todo ello.',
      'El persa es su lengua y la de sus lectores, así que el persa es el idioma predeterminado del sitio, con el inglés al lado. Su página de experiencia nombra la dificultad en su titular: más que un título.',
    ],
    figureItems: [
      '/en/experience: la página en inglés, compuesta en mayúsculas latinas.',
      '/fa/experience: la misma página en persa, que nunca lleva espaciado entre letras.',
    ],
    figureCaption:
      'Una página, dos URL: cada idioma es su propio documento, no una traducción que se cambia con una cookie.',
  },
  problem: {
    heading: 'Control de la verdad y alcance',
    body: [
      'El primer problema era la verdad. Una vida tan variada invita a redondear al alza, así que la biografía se convirtió en el documento de referencia, con una tabla de cifras con fuente: cada una declarada por Arash por escrito o en un mensaje, y nada inferido.',
      'El segundo era el alcance. Para un escritor cuyos libros y lectores son persas, las páginas en persa tienen que poder encontrarse en sus propias direcciones. Un sitio que muestra bien el persa pero no se lo sirve a ningún rastreador ha fallado en lo único para lo que existe.',
    ],
    figureCaption:
      'La página de libros declara sus propios límites: cerca de diez títulos escritos, traducidos y publicados, seis de ellos listados, el resto todavía no.',
  },
  rule: {
    text: '«Aquí no hay nada inferido, y ninguna cifra fuera de esta tabla puede aparecer en el sitio.»',
    attribution: 'La tabla de cifras con fuente de la biografía',
    method:
      'Construida a partir del propio relato de Arash y de diez mensajes que él envió, uno por práctica',
  },
  ownership: {
    heading: 'Un diseñador-desarrollador, un autor',
    intro:
      'Único diseñador y desarrollador, en trato directo con Arash; el registro de despliegues recoge varios cambios hechos por indicación suya.',
    own: [
      'La marca y el lenguaje de diseño escrito',
      'El modelo de contenido: 8 colecciones, 4 globales y 21 bloques de página',
      'El desarrollo con Payload y Next.js, en dos idiomas',
      'El sistema de reservas y su calendario',
      'La infraestructura dentro del país y su registro de despliegues',
    ],
    collaborate: [
      'Arash: su biografía, sus textos sobre cada práctica y sus decisiones sobre el contenido',
    ],
    note: 'Cada cifra del sitio se remonta a sus propias palabras; cuando el sitio y un borrador no coinciden, manda la biografía.',
  },
  approach: {
    heading: 'Un axioma, y cada página medida con él',
    body: [
      'El sitio salió primero en línea con un sistema de marca editorial y una paleta tomada de la propia fotografía de Arash: una tinta cálida, ámbar, papel, una bruma fría y cobalto. Se midió cada par. El ámbar sobre papel dio un contraste de 2.1:1, así que el ámbar nunca es texto sobre blanco, y un solo ámbar por vista se volvió regla.',
      'Tres días después, el lenguaje de diseño quedó escrito en una sola frase, «Ninguna línea sin final», con tres formas legítimas de que una línea se detenga: en un muro, en otra línea o en un cambio de fondo. Cualquier otra cosa es un defecto, no un estilo, y cada página se rehízo y se midió con esa frase.',
    ],
    insight:
      'Una segunda regla aplica el mismo axioma al contenido: una página dice algo una sola vez. Su auditoría de implantación encontró catorce repeticiones en cinco páginas, y cada corrección fue una resta.',
    processHeading: 'De la construcción a una infraestructura bilingüe en línea',
    steps: [
      {
        label: 'Construcción',
        note: 'Payload dentro de Next.js, un panel de administración en persa y una cadena de despliegue',
      },
      {
        label: 'Sistema de marca',
        note: 'Una paleta medida a partir de su fotografía, en línea el 30 de agosto',
      },
      {
        label: 'La Retícula',
        note: 'Un axioma para cada línea; páginas rehechas sobre la biografía real',
      },
      {
        label: 'URL propias',
        note: 'Cada idioma en su propio prefijo, con hreflang y mapas del sitio',
      },
      {
        label: 'Reservas',
        note: 'Un calendario Shamsi para llamadas de quince minutos, abierto desde el 12 de septiembre',
      },
    ],
    annotations: [
      'Las reglas de fila terminan en la regla de columna: una línea se detiene en otra línea.',
      'La regla de columna termina en la regla de banda bajo la lista.',
      'Los muros se detienen donde el papel se vuelve tinta: un cambio de fondo es un borde.',
      'Cada cifra de la banda procede de la tabla con fuente, con sus ≈ y + intactos.',
    ],
    figureCaption:
      'La página de experiencia en persa: muros, reglas de fila y una regla de columna, cerrados por la banda de cifras en tinta.',
  },
  decisions: {
    heading: 'Cuatro decisiones que se sostuvieron',
    lede: 'Cada una la impuso el público o la red, no el gusto.',
    items: [
      {
        title: 'Dar a cada idioma su propia URL',
        why: 'La primera versión en persa elegía el idioma por cookie: una URL, dos renderizados. Un rastreador no lleva cookies, así que ninguna página traducida era accesible en ninguna URL y no se podía emitir ningún hreflang. Ahora el inglés vive bajo /en, el persa bajo /fa, y una URL sin prefijo redirige al persa.',
        alternatives: 'Una sola URL, con el idioma elegido por cookie',
        tradeoff:
          'Cada enlace interno debe llevar su prefijo, y el cambio de idioma tiene que ser una carga de página completa.',
      },
      {
        title: 'Proteger las reservas con un índice de base de datos, no con un hook',
        why: 'Dos llamadas confirmadas nunca pueden compartir hora de inicio. Las opciones de índice del propio Payload no pueden expresar «único solo entre las filas confirmadas», así que la aplicación crea un índice único parcial al arrancar, y las reservas públicas pasan por un único endpoint. Probado como condición de carrera: un 201, un 409, una fila.',
        alternatives: 'Una comprobación de duplicados en un hook de guardado',
        tradeoff:
          'Si el índice no llega a crearse, el sitio sigue funcionando sin la garantía, así que hay que leer el registro de arranque.',
      },
      {
        title: 'Cargar un video solo cuando se pide',
        why: 'Dentro de Irán, un reproductor de YouTube necesita una VPN. Cada canción es una tarjeta que se carga con un clic, cuyo póster y título vienen del almacenamiento del propio sitio, así que la tarjeta está completa sin VPN y ningún reproductor se carga hasta el clic.',
        alternatives: 'Incrustar el reproductor en la página',
        tradeoff: 'Los pósteres se guardan, y se sustituyen, a mano.',
      },
      {
        title: 'Mantener toda la infraestructura dentro de Irán',
        why: 'Docker Hub responde al servidor con un 403: cinco despliegues fallaron al descargar la imagen base antes de que llegara a través de un espejo iraní. El almacenamiento, Git, la plataforma de despliegue y el correo funcionan todos dentro del país.',
        alternatives: 'Registros públicos y Git alojado',
        tradeoff:
          'Más cosas que mantener en un único servidor pequeño: una compilación se quedó sin memoria y tumbó con ella el servidor de Git.',
      },
    ],
    hoursEvidence:
      'Los cuartos de hora libres de un día, en hora de Teherán; en inglés, la fecha Shamsi lleva debajo su fecha gregoriana.',
  },
  solution: {
    heading: 'Reservas Shamsi, alcance y administración en persa',
    body: 'Payload 3.88 dentro de Next.js 16.3 sobre MongoDB: 8 colecciones, 4 globales y 21 bloques de página, con borradores, vista previa en vivo y publicación programada, que sostienen 11 páginas, 21 entradas, 6 libros y 5 canciones en ambos idiomas. Alrededor del contenido:',
    bullets: [
      'Reservas en un calendario Shamsi que empieza en sábado, en hora de Teherán; un día sin nada libre aparece desactivado y explica por qué.',
      'Alcance: URL canónicas, pares hreflang con x-default en el persa, datos estructurados para personas, artículos, libros y videos, imágenes para compartir por idioma, un feed RSS por idioma y mapas del sitio.',
      'Una búsqueda que lee el índice en el idioma de la propia página, de modo que los resultados en persa llevan títulos en persa.',
      'Un panel de administración en persa, con el logotipo de Payload sustituido por la firma dibujada de Arash.',
    ],
    figureItems: [
      'El calendario: la semana empieza en sábado, números persas, viernes cerrados.',
      'El diario: cada entrada fechada en Shamsi y filtrada por práctica.',
    ],
    figureCaption: 'Ambos en persa, donde empieza el sitio.',
  },
  outcomes: {
    heading: 'En línea, con las carencias nombradas',
    intro:
      'En línea en arashrezvani.me desde el 30 de agosto de 2026 y aceptando reservas desde el 12 de septiembre. No hay cifras de visitantes porque no hay analítica de ningún tipo: una carencia, no una postura. El ejecutor de CI nunca se instaló, así que un push a main sigue llegando al sitio sin lint ni comprobaciones de tipos.',
    measured: [
      {
        label: 'Repeticiones encontradas y eliminadas',
        context:
          'La auditoría de «decirlo una vez» en cinco páginas; cada corrección fue una resta.',
        source: 'La auditoría de implantación del lenguaje de diseño',
      },
      {
        label: 'Pruebas superadas en el último control de publicación',
        context:
          'Junto a las comprobaciones de tipos, el lint, una compilación de producción y una prueba de humo antes del push.',
        source: 'Registro de despliegues, 18 de septiembre de 2026',
      },
    ],
    delivered: [
      {
        label: 'Persa e inglés en sus propias URL',
        context: 'El persa por defecto, ambas mitades en hreflang y en los mapas del sitio.',
      },
      {
        label: 'Un registro de despliegues que conserva sus fallos',
        context:
          '18 ejecuciones en producción registradas, cinco de ellas fallidas, junto a un registro aparte de cada escritura de contenido y cada reversión.',
      },
    ],
    shipped: [
      'Reservas Shamsi',
      'Una URL por idioma',
      'Datos estructurados',
      'Video que se carga con un clic',
      'Administración en persa',
      'RSS por idioma',
    ],
  },
  lessons: {
    heading: 'Lo que conservaría, y lo que me pasó factura',
    items: [
      {
        title: 'Formular el lenguaje en una sola frase',
        body: '«Ninguna línea sin final» zanjó discusiones sin otra reunión, porque cada desacuerdo se reducía a una pregunta: ¿llega esta línea a alguna parte?',
      },
      {
        title: 'Un sitio bilingüe no es bilingüe hasta que cada idioma tiene una URL',
        body: 'El esquema de cookies pasaba todas las pruebas que una persona podía hacer, y fallaba por completo ante el visitante que más importa en el sitio de un escritor: el rastreador.',
      },
      {
        title: 'Una mejora que no puede fallar de forma segura no es una mejora',
        body: 'Una animación de aparición con WebGL al desplazarse fallaba en navegadores sin WebGL y sustituía una página entera en persa por un error. Volvió detrás de una comprobación de capacidades y de un límite de errores que se queda en la imagen simple.',
      },
    ],
  },
}

const DE: ArrCopy = {
  statement:
    'Persisch zuerst – die Website eines Schriftstellers, Dichters und Lehrers, mit schriftlicher Designsprache und der Regel: keine unbelegte Zahl auf der Seite.',
  industry: 'Persönliche Website · Verlagswesen',
  team: 'Alleiniger Designer und Entwickler, in direkter Zusammenarbeit mit dem Autor',
  heroCaption:
    'Die persische Website auf dem Smartphone: die neun Tätigkeitsfelder als durch Linien getrennte Zeilen, die Lyrikseite und der Shamsi-Buchungskalender.',
  snapshot: {
    problem:
      'Ein vielseitiges Leben verleitet zum Aufrunden, und die Website eines persischen Schriftstellers ist wenig wert, wenn Crawler das Persische nie erreichen.',
    role: 'Alleiniger Designer und Entwickler: Marke, Designsprache, Content-Modell, die Umsetzung mit Payload und Next.js und ein Stack im Land.',
    result:
      'Live seit dem 30. August 2026, mit Persisch unter eigenen, crawlbaren URLs; noch ohne Analytics, und diese Lücke ist offen benannt.',
  },
  alt: {
    cover:
      'Arash Rezvani auf dem Smartphone: die persische Erfahrungsseite öffnet mit ihrer Überschrift „Mehr als ein Titel“, zwischen Wänden aus Linien',
    practicesMobile:
      'Arash Rezvani auf dem Smartphone: die neun Tätigkeitsfelder als nummerierte Zeilen, jede Linie endet an der Kante der Spalte',
    poetryMobile:
      'Arash Rezvani auf dem Smartphone: die Lyrikseite auf Persisch, eine große Überschrift über einer einzigen Zeile zu Ghasel, Kasside, Rubai und freiem Vers',
    calendarMobile:
      'Arash Rezvani auf dem Smartphone: der Buchungskalender für den Monat Mehr in persischen Ziffern, mit Samstag als erstem Wochentag und geschlossenen Freitagen',
    experienceEn:
      'Arash Rezvani auf dem Desktop: die englische Erfahrungsseite mit der Überschrift „Mehr als ein Titel“, zwischen zwei Wänden aus Linien',
    experienceFa:
      'Arash Rezvani auf dem Desktop: dieselbe Erfahrungsseite auf Persisch, von rechts nach links gesetzt und ohne Sperrung',
    booksFa:
      'Arash Rezvani auf dem Desktop: die persische Bücherseite, deren Einstieg sagt, dass sechs von fast zehn Titeln aufgeführt sind und der Rest noch nicht',
    lattice:
      'Arash Rezvani auf dem Desktop: die Liste der Tätigkeitsfelder mit ihren Zeilen- und Spaltenlinien, abgeschlossen von einem Tintenband belegter Zahlen',
    hoursEn:
      'Arash Rezvani auf dem Desktop: ein gewählter Tag, Samstag, 4. Mehr 1405, mit seinem gregorianischen Datum und seinen freien Viertelstunden in Teheraner Zeit',
    calendarFa:
      'Arash Rezvani auf dem Desktop: der persische Buchungskalender, ein quadratisches Raster mit ausgegrauten vergangenen Tagen und Freitagen',
    postsFa:
      'Arash Rezvani auf dem Desktop: das persische Journal, seine Einträge in Shamsi datiert und nach Tätigkeitsfeld gefiltert',
  },
  context: {
    heading: 'Eine Laufbahn, die sich keiner einzelnen Schlagzeile fügt',
    body: [
      'Arash Rezvani ist Schriftsteller, Dichter, Lehrer, Fotograf und Abenteurer. Nach eigener Darstellung hat er fast zehn Bücher und mehr als hundert Gedichte veröffentlicht, fünfzehn Jahre lang als Radsporttrainer gearbeitet, klettert seit mehr als fünfundzwanzig Jahren und fotografiert seit mehr als dreißig. Der Auftrag war eine persönliche Website mit einem Journal für all das.',
      'Persisch ist seine Sprache und die seiner Leser, also ist Persisch die Standardsprache der Website, Englisch steht daneben. Seine Erfahrungsseite benennt die Schwierigkeit schon in der Überschrift: mehr als ein Titel.',
    ],
    figureItems: [
      '/en/experience: die englische Seite, in lateinischen Großbuchstaben gesetzt.',
      '/fa/experience: dieselbe Seite auf Persisch, die nie gesperrt wird.',
    ],
    figureCaption:
      'Eine Seite, zwei URLs: Jede Sprache ist ein eigenes Dokument, keine per Cookie umgeschaltete Übersetzung.',
  },
  problem: {
    heading: 'Wahrheitskontrolle und Erreichbarkeit',
    body: [
      'Das erste Problem war die Wahrheit. Ein so vielseitiges Leben verleitet zum Aufrunden, also wurde die Biografie zum maßgeblichen Referenzdokument, mit einer Tabelle belegter Zahlen: jede von Arash schriftlich oder in einer Nachricht angegeben, nichts erschlossen.',
      'Das zweite war die Erreichbarkeit. Für einen Schriftsteller, dessen Bücher und Leser persisch sind, müssen die persischen Seiten unter eigenen Adressen auffindbar sein. Eine Website, die Persisch gut darstellt, es aber keinem Crawler ausliefert, hat an dem Einzigen versagt, wofür sie da ist.',
    ],
    figureCaption:
      'Die Bücherseite nennt ihre eigenen Grenzen: fast zehn Titel geschrieben, übersetzt und veröffentlicht, sechs davon aufgeführt, der Rest noch nicht.',
  },
  rule: {
    text: '„Nichts hier ist erschlossen, und keine Zahl außerhalb dieser Tabelle darf auf der Website erscheinen.“',
    attribution: 'Die Tabelle belegter Zahlen der Biografie',
    method:
      'Erstellt aus Arashs eigener Darstellung und zehn Nachrichten, die er geschickt hat, eine pro Tätigkeitsfeld',
  },
  ownership: {
    heading: 'Ein Designer-Entwickler, ein Autor',
    intro:
      'Alleiniger Designer und Entwickler, in direkter Zusammenarbeit mit Arash; das Deploy-Protokoll verzeichnet mehrere Änderungen, die auf sein Wort hin gemacht wurden.',
    own: [
      'Die Marke und die schriftlich festgehaltene Designsprache',
      'Das Content-Modell: 8 Collections, 4 Globals und 21 Seitenblöcke',
      'Die Umsetzung mit Payload und Next.js, in zwei Sprachen',
      'Das Buchungssystem und sein Kalender',
      'Der Stack im Land und sein Deploy-Protokoll',
    ],
    collaborate: [
      'Arash: seine Biografie, seine Texte zu jedem Tätigkeitsfeld und seine Entscheidungen zum Inhalt',
    ],
    note: 'Jede Zahl auf der Website geht auf seine eigenen Worte zurück; wo sich Website und ein Entwurf widersprechen, gilt die Biografie.',
  },
  approach: {
    heading: 'Ein Axiom, und jede Seite daran gemessen',
    body: [
      'Die Website ging zuerst mit einem redaktionellen Markensystem live, dessen Palette aus Arashs eigener Fotografie stammt: eine warme Tinte, Bernstein, Papier, ein kühler Nebel und Kobalt. Jedes Paar wurde gemessen. Bernstein auf Papier kam auf einen Kontrast von 2,1:1, also steht Bernstein nie als Text auf Weiß, und ein Bernstein pro Ansicht wurde zur Regel.',
      'Drei Tage später wurde die Designsprache in einem einzigen Satz festgehalten, „Keine Linie ohne Ende“, mit drei zulässigen Arten, wie eine Linie enden darf: an einer Wand, an einer anderen Linie oder an einem Wechsel des Grundes. Alles andere ist ein Fehler, kein Stil, und jede Seite wurde neu gebaut und an diesem Satz gemessen.',
    ],
    insight:
      'Eine zweite Regel wendet dasselbe Axiom auf den Inhalt an: Eine Seite sagt eine Sache nur einmal. Ihr Rollout-Audit fand vierzehn Wiederholungen auf fünf Seiten, und jede Korrektur war eine Streichung.',
    processHeading: 'Von der Umsetzung zu einem zweisprachigen Live-Stack',
    steps: [
      {
        label: 'Aufbau',
        note: 'Payload in Next.js, ein persisches Admin-Panel und eine Deploy-Pipeline',
      },
      {
        label: 'Markensystem',
        note: 'Eine an seiner Fotografie gemessene Palette, live am 30. August',
      },
      {
        label: 'Das Gitter',
        note: 'Ein Axiom für jede Linie; Seiten neu gebaut auf der echten Biografie',
      },
      {
        label: 'Eigene URLs',
        note: 'Jede Sprache unter eigenem Präfix, mit hreflang und Sitemaps',
      },
      {
        label: 'Buchung',
        note: 'Ein Shamsi-Kalender für fünfzehnminütige Gespräche, geöffnet seit dem 12. September',
      },
    ],
    annotations: [
      'Zeilenlinien enden an der Spaltenlinie: Eine Linie endet an einer anderen Linie.',
      'Die Spaltenlinie endet an der Bandlinie unter der Liste.',
      'Die Wände enden, wo Papier zu Tinte wird: Ein Wechsel des Grundes ist eine Kante.',
      'Jede Zahl im Band stammt aus der belegten Tabelle, ihre ≈ und + beibehalten.',
    ],
    figureCaption:
      'Die Erfahrungsseite auf Persisch: Wände, Zeilenlinien und eine Spaltenlinie, abgeschlossen vom Tintenband der Zahlen.',
  },
  decisions: {
    heading: 'Vier Entscheidungen, die gehalten haben',
    lede: 'Jede wurde vom Publikum oder vom Netz erzwungen, nicht vom Geschmack.',
    items: [
      {
        title: 'Jeder Sprache eine eigene URL geben',
        why: 'Die erste persische Version wählte die Sprache per Cookie: eine URL, zwei Renderings. Ein Crawler trägt kein Cookie, also war keine übersetzte Seite unter irgendeiner URL erreichbar, und kein hreflang ließ sich ausgeben. Jetzt liegt Englisch unter /en, Persisch unter /fa, und eine URL ohne Präfix leitet auf Persisch weiter.',
        alternatives: 'Eine einzige URL, die Sprache per Cookie gewählt',
        tradeoff:
          'Jeder interne Link muss sein Präfix tragen, und der Sprachwechsel muss ein vollständiger Seitenaufruf sein.',
      },
      {
        title: 'Buchungen mit einem Datenbankindex absichern, nicht mit einem Hook',
        why: 'Zwei bestätigte Gespräche dürfen nie dieselbe Startzeit haben. Payloads eigene Index-Optionen können „eindeutig nur unter bestätigten Zeilen“ nicht ausdrücken, also legt die App beim Start einen partiellen eindeutigen Index an, und öffentliche Buchungen laufen über einen einzigen Endpoint. Als Race Condition getestet: ein 201, ein 409, eine Zeile.',
        alternatives: 'Eine Duplikatprüfung in einem Save-Hook',
        tradeoff:
          'Wenn der Index nicht angelegt werden kann, läuft die Website ohne die Garantie weiter, also muss das Boot-Log gelesen werden.',
      },
      {
        title: 'Ein Video erst laden, wenn es angefordert wird',
        why: 'Im Iran braucht ein YouTube-Player ein VPN. Jeder Song ist eine Karte, die per Klick lädt und deren Posterbild und Titel aus dem eigenen Speicher der Website kommen, sodass die Karte auch ohne VPN vollständig ist und kein Player lädt, bevor geklickt wird.',
        alternatives: 'Den Player direkt in die Seite einbetten',
        tradeoff: 'Posterbilder werden von Hand gespeichert und ersetzt.',
      },
      {
        title: 'Den ganzen Stack im Iran halten',
        why: 'Docker Hub antwortet dem Server mit 403: Fünf Deployments scheiterten beim Pull des Basis-Images, bevor es über einen iranischen Mirror durchkam. Speicher, Git, die Deploy-Plattform und Mail laufen alle im Land.',
        alternatives: 'Öffentliche Registries und gehostetes Git',
        tradeoff:
          'Mehr auf einem kleinen Server zu betreiben: Ein Build lief aus dem Speicher und riss den Git-Server mit.',
      },
    ],
    hoursEvidence:
      'Die freien Viertelstunden eines Tages in Teheraner Zeit; auf Englisch steht unter dem Shamsi-Datum das gregorianische Datum.',
  },
  solution: {
    heading: 'Shamsi-Buchung, Erreichbarkeit, ein persisches Admin-Panel',
    body: 'Payload 3.88 in Next.js 16.3 auf MongoDB: 8 Collections, 4 Globals und 21 Seitenblöcke, mit Entwürfen, Live-Vorschau und geplanter Veröffentlichung, die 11 Seiten, 21 Beiträge, 6 Bücher und 5 Songs in beiden Sprachen tragen. Rund um den Inhalt:',
    bullets: [
      'Buchung auf einem Shamsi-Kalender, der mit Samstag beginnt, in Teheraner Zeit; ein Tag ohne freie Zeit ist deaktiviert und sagt, warum.',
      'Erreichbarkeit: kanonische URLs, hreflang-Paare mit x-default auf Persisch, strukturierte Daten für Personen, Artikel, Bücher und Videos, Vorschaubilder zum Teilen pro Sprache, ein RSS-Feed pro Sprache und Sitemaps.',
      'Eine Suche, die den Index in der Sprache der jeweiligen Seite liest, sodass persische Ergebnisse persische Titel tragen.',
      'Ein persisches Admin-Panel, in dem Arashs gezeichnete Unterschrift die Wortmarke von Payload ersetzt.',
    ],
    figureItems: [
      'Der Kalender: Samstag zuerst, persische Ziffern, Freitage geschlossen.',
      'Das Journal: jeder Eintrag in Shamsi datiert und nach Tätigkeitsfeld gefiltert.',
    ],
    figureCaption: 'Beide auf Persisch, wo die Website beginnt.',
  },
  outcomes: {
    heading: 'Live, mit benannten Lücken',
    intro:
      'Live unter arashrezvani.me seit dem 30. August 2026 und seit dem 12. September offen für Buchungen. Es gibt keine Besucherzahlen, weil es keinerlei Analytics gibt – eine Lücke, keine Haltung. Der CI-Runner wurde nie installiert, also erreicht ein Push auf main die Website weiterhin ohne Lint oder Typprüfungen.',
    measured: [
      {
        label: 'Gefundene und entfernte Wiederholungen',
        context: 'Das „Einmal-sagen“-Audit über fünf Seiten; jede Korrektur war eine Streichung.',
        source: 'Das Rollout-Audit der Designsprache',
      },
      {
        label: 'Bestandene Tests beim letzten Release-Gate',
        context:
          'Neben Typprüfungen, Lint, einem Produktions-Build und einem Smoke-Test vor dem Push.',
        source: 'Deploy-Protokoll, 18. September 2026',
      },
    ],
    delivered: [
      {
        label: 'Persisch und Englisch unter eigenen URLs',
        context: 'Persisch als Standard, beide Hälften in hreflang und in den Sitemaps.',
      },
      {
        label: 'Ein Deploy-Protokoll, das seine Fehlschläge behält',
        context:
          '18 Produktionsläufe verzeichnet, fünf davon fehlgeschlagen, neben einem separaten Protokoll jedes Schreibvorgangs am Inhalt und jedes Rollbacks.',
      },
    ],
    shipped: [
      'Shamsi-Buchung',
      'Eine URL pro Sprache',
      'Strukturierte Daten',
      'Video per Klick',
      'Persisches Admin-Panel',
      'RSS pro Sprache',
    ],
  },
  lessons: {
    heading: 'Was ich behalten würde, und was sich gerächt hat',
    items: [
      {
        title: 'Die Sprache in einem Satz formulieren',
        body: '„Keine Linie ohne Ende“ entschied Streitfragen ohne weiteres Meeting, weil jede Meinungsverschiedenheit auf eine Frage hinauslief: Kommt diese Linie irgendwo an?',
      },
      {
        title: 'Eine zweisprachige Website ist erst zweisprachig, wenn jede Sprache eine URL hat',
        body: 'Das Cookie-Schema bestand jeden Test, den ein Mensch durchführen konnte, und versagte vollständig bei dem einen Besucher, der für die Website eines Schriftstellers am meisten zählt: dem Crawler.',
      },
      {
        title: 'Eine Verbesserung, die nicht sicher scheitern kann, ist keine',
        body: 'Ein WebGL-Scroll-Reveal warf in Browsern ohne WebGL einen Fehler und ersetzte eine ganze persische Seite durch eine Fehlermeldung. Es kam zurück, hinter einer Fähigkeitsprüfung und einer Error Boundary, die auf das einfache Bild zurückfällt.',
      },
    ],
  },
}

const FR: ArrCopy = {
  statement:
    'Un site d’abord en persan pour un écrivain, poète et enseignant, fondé sur un langage de design écrit et une règle : aucun chiffre non sourcé sur la page.',
  industry: 'Site personnel · édition',
  team: 'Seul designer et développeur, en lien direct avec l’auteur',
  heroCaption:
    'Le site persan sur mobile : les neuf pratiques en rangées tracées au filet, la page poésie et le calendrier de réservation Shamsi.',
  snapshot: {
    problem:
      'Une vie aussi variée incite à arrondir à la hausse, et le site d’un écrivain persan ne vaut pas grand-chose si les robots d’indexation n’atteignent jamais le persan.',
    role: 'Seul designer et développeur : marque, langage de design, modèle de contenu, développement Payload et Next.js, et une infrastructure dans le pays.',
    result:
      'En ligne depuis le 30 août 2026, le persan sur ses propres URL indexables ; pas encore de mesure d’audience, et cette lacune est consignée.',
  },
  alt: {
    cover:
      'Arash Rezvani sur mobile — la page expérience en persan, qui s’ouvre sur son accroche, « Plus qu’un titre », entre des murs de filets',
    practicesMobile:
      'Arash Rezvani sur mobile — les neuf pratiques en rangées numérotées, chaque filet s’arrêtant au bord de la colonne',
    poetryMobile:
      'Arash Rezvani sur mobile — la page poésie en persan, un grand titre au-dessus d’une ligne sur le ghazal, la qasida, le rubai et le vers libre',
    calendarMobile:
      'Arash Rezvani sur mobile — le calendrier de réservation du mois de Mehr en chiffres persans, la semaine commençant le samedi, les vendredis fermés',
    experienceEn:
      'Arash Rezvani sur ordinateur — la page expérience en anglais, intitulée « Plus qu’un titre », entre deux murs de filets',
    experienceFa:
      'Arash Rezvani sur ordinateur — la même page expérience en persan, composée de droite à gauche, sans interlettrage',
    booksFa:
      'Arash Rezvani sur ordinateur — la page des livres en persan, dont l’ouverture indique que six titres sur près de dix sont présentés et que les autres ne le sont pas encore',
    lattice:
      'Arash Rezvani sur ordinateur — la liste des pratiques avec ses filets de rangée et de colonne, fermée par une bande couleur encre portant les chiffres sourcés',
    hoursEn:
      'Arash Rezvani sur ordinateur — un jour choisi, samedi 4 Mehr 1405 avec sa date grégorienne, et ses quarts d’heure libres à l’heure de Téhéran',
    calendarFa:
      'Arash Rezvani sur ordinateur — le calendrier de réservation en persan, une grille carrée où les jours passés et les vendredis sont grisés',
    postsFa:
      'Arash Rezvani sur ordinateur — le journal en persan, ses entrées datées en Shamsi et filtrées par pratique',
  },
  context: {
    heading: 'Une carrière qui ne tient pas en un seul titre',
    body: [
      'Arash Rezvani est écrivain, poète, enseignant, photographe et aventurier. Selon ses propres dires, il a publié près de dix livres et plus d’une centaine de poèmes, entraîné des cyclistes pendant quinze ans, fait de l’escalade pendant plus de vingt-cinq ans et de la photographie pendant plus de trente. La commande : un site personnel et un journal pour tout cela.',
      'Le persan est sa langue et celle de ses lecteurs ; c’est donc la langue par défaut du site, avec l’anglais à ses côtés. Sa page expérience nomme la difficulté dès son accroche : plus qu’un titre.',
    ],
    figureItems: [
      '/en/experience : la page anglaise, composée en capitales latines.',
      '/fa/experience : la même page en persan, une écriture qu’on n’interlettre jamais.',
    ],
    figureCaption:
      'Une page, deux URL : chaque langue est un document à part entière, pas une traduction basculée par un cookie.',
  },
  problem: {
    heading: 'Contrôle de la vérité et trouvabilité',
    body: [
      'Le premier problème était la vérité. Une vie aussi variée incite à arrondir à la hausse ; la biographie est donc devenue un document de référence, avec un tableau des chiffres sourcés, chacun énoncé par Arash par écrit ou dans un message, sans rien de déduit.',
      'Le second était la portée. Pour un écrivain dont les livres et les lecteurs sont persans, les pages persanes doivent pouvoir être trouvées à leurs propres adresses. Un site qui affiche bien le persan mais ne le sert à aucun robot d’indexation a échoué dans la seule chose pour laquelle il existe.',
    ],
    figureCaption:
      'La page des livres énonce ses propres limites : près de dix titres écrits, traduits et publiés, six d’entre eux présentés, les autres pas encore.',
  },
  rule: {
    text: '« Rien ici n’est déduit, et aucun chiffre absent de ce tableau ne peut apparaître sur le site. »',
    attribution: 'Le tableau des chiffres sourcés de la biographie',
    method:
      'Établi à partir du récit d’Arash lui-même et de dix messages qu’il a envoyés, un par pratique',
  },
  ownership: {
    heading: 'Un designer-développeur, un auteur',
    intro:
      'Seul designer et développeur, en lien direct avec Arash ; le journal de déploiement consigne plusieurs changements faits à sa demande.',
    own: [
      'La marque et le langage de design écrit',
      'Le modèle de contenu : 8 collections, 4 globals et 21 blocs de page',
      'Le développement Payload et Next.js, en deux langues',
      'Le système de réservation et son calendrier',
      'L’infrastructure dans le pays et son journal de déploiement',
    ],
    collaborate: [
      'Arash : sa biographie, ses textes sur chacune de ses pratiques et ses arbitrages sur le contenu',
    ],
    note: 'Chaque chiffre du site remonte à ses propres mots ; quand le site et un brouillon divergent, c’est la biographie qui l’emporte.',
  },
  approach: {
    heading: 'Un axiome, et chaque page mesurée à son aune',
    body: [
      'Le site a d’abord été mis en ligne sur un système de marque éditorial, avec une palette tirée des photographies d’Arash : une encre chaude, l’ambre, le papier, une brume froide et le cobalt. Chaque paire a été mesurée. L’ambre sur papier ressortait à 2,1:1 ; l’ambre n’est donc jamais du texte sur blanc, et un seul ambre par vue est devenu une règle.',
      'Trois jours plus tard, le langage de design a été écrit en une seule phrase, « Aucune ligne sans fin », avec trois façons légitimes pour une ligne de s’arrêter : sur un mur, sur une autre ligne ou sur un changement de fond. Tout le reste est un défaut, pas un style, et chaque page a été reconstruite et mesurée à cette aune.',
    ],
    insight:
      'Une seconde règle applique le même axiome au contenu : une page dit une chose une seule fois. L’audit de déploiement de la règle a relevé quatorze répétitions sur cinq pages, et chaque correction a été une soustraction.',
    processHeading: 'De la construction à une infrastructure bilingue en ligne',
    steps: [
      {
        label: 'Mise en place',
        note: 'Payload dans Next.js, une administration en persan et un pipeline de déploiement',
      },
      {
        label: 'Système de marque',
        note: 'Une palette mesurée à partir de ses photographies, en ligne le 30 août',
      },
      {
        label: 'Le Treillis',
        note: 'Un axiome pour chaque ligne ; les pages reconstruites sur la vraie biographie',
      },
      {
        label: 'URL dédiées',
        note: 'Chaque langue sous son propre préfixe, avec hreflang et sitemaps',
      },
      {
        label: 'Réservation',
        note: 'Un calendrier Shamsi pour des appels de quinze minutes, ouvert depuis le 12 septembre',
      },
    ],
    annotations: [
      'Les filets de rangée s’arrêtent sur le filet de colonne : une ligne s’arrête sur une autre ligne.',
      'Le filet de colonne s’arrête sur le filet de bande sous la liste.',
      'Les murs s’arrêtent là où le papier devient encre : un changement de fond est un bord.',
      'Chaque chiffre de la bande vient du tableau des chiffres sourcés, ses ≈ et ses + conservés.',
    ],
    figureCaption:
      'La page expérience en persan : des murs, des filets de rangée et un filet de colonne, fermés par la bande couleur encre des chiffres.',
  },
  decisions: {
    heading: 'Quatre décisions qui ont tenu',
    lede: 'Chacune a été imposée par le public ou par le réseau, pas par le goût.',
    items: [
      {
        title: 'Donner à chaque langue sa propre URL',
        why: 'La première version persane choisissait la langue par cookie : une URL, deux rendus. Un robot d’indexation ne porte pas de cookie ; aucune page traduite n’était donc accessible à une quelconque URL, et aucun hreflang ne pouvait être émis. Désormais, l’anglais vit sous /en, le persan sous /fa, et une URL nue redirige vers le persan.',
        alternatives: 'Une seule URL, la langue étant choisie par cookie',
        tradeoff:
          'Chaque lien interne doit porter son préfixe, et le changement de langue impose un rechargement complet de la page.',
      },
      {
        title: 'Protéger les réservations par un index de base de données, pas par un hook',
        why: 'Deux appels confirmés ne peuvent jamais partager la même heure de début. Les options d’index de Payload ne savent pas exprimer « unique parmi les seules lignes confirmées » ; l’application construit donc un index unique partiel au démarrage, et les réservations publiques passent par un seul endpoint. Testé en situation de concurrence : un 201, un 409, une ligne.',
        alternatives: 'Une vérification des doublons dans un hook d’enregistrement',
        tradeoff:
          'Si l’index ne se construit pas, le site continue de tourner sans la garantie ; il faut donc lire le journal de démarrage.',
      },
      {
        title: 'Ne charger une vidéo que lorsqu’on la demande',
        why: 'En Iran, un lecteur YouTube exige un VPN. Chaque chanson est une carte chargée au clic, dont l’affiche et le titre viennent du stockage propre au site : la carte est complète sans VPN, et aucun lecteur ne se charge avant le clic.',
        alternatives: 'Intégrer le lecteur dans la page',
        tradeoff: 'Les affiches sont stockées, et remplacées, à la main.',
      },
      {
        title: 'Garder toute l’infrastructure en Iran',
        why: 'Docker Hub répond au serveur par un 403 : cinq déploiements ont échoué au téléchargement de l’image de base avant qu’elle ne passe par un miroir iranien. Le stockage, Git, la plateforme de déploiement et la messagerie tournent tous dans le pays.',
        alternatives: 'Des registres publics et un Git hébergé',
        tradeoff:
          'Davantage à faire tourner sur un seul petit serveur : un build a manqué de mémoire et a entraîné le serveur Git dans sa chute.',
      },
    ],
    hoursEvidence:
      'Les quarts d’heure libres d’une journée, à l’heure de Téhéran ; en anglais, la date Shamsi porte sa date grégorienne en dessous.',
  },
  solution: {
    heading: 'Réservation Shamsi, portée, administration en persan',
    body: 'Payload 3.88 dans Next.js 16.3 sur MongoDB : 8 collections, 4 globals et 21 blocs de page, avec brouillons, aperçu en direct et publication programmée, portant 11 pages, 21 articles, 6 livres et 5 chansons dans les deux langues. Autour du contenu :',
    bullets: [
      'La réservation sur un calendrier Shamsi qui commence le samedi, à l’heure de Téhéran ; un jour sans créneau libre est désactivé et dit pourquoi.',
      'La portée : URL canoniques, paires hreflang avec x-default sur le persan, données structurées pour les personnes, les articles, les livres et les vidéos, images de partage par langue, un flux RSS par langue et des sitemaps.',
      'Une recherche qui lit l’index dans la langue de la page, si bien que les résultats en persan portent des titres persans.',
      'Un panneau d’administration en persan, où le logotype de Payload est remplacé par la signature dessinée d’Arash.',
    ],
    figureItems: [
      'Le calendrier : le samedi en premier, des chiffres persans, les vendredis fermés.',
      'Le journal : chaque entrée datée en Shamsi et filtrée par pratique.',
    ],
    figureCaption: 'Tous deux en persan, là où le site commence.',
  },
  outcomes: {
    heading: 'En ligne, lacunes comprises',
    intro:
      'En ligne sur arashrezvani.me depuis le 30 août 2026, et ouvert aux réservations depuis le 12 septembre. Il n’existe aucun chiffre de fréquentation, faute de toute mesure d’audience — une lacune, pas une position. Le runner de CI n’a jamais été installé : un push sur main atteint donc toujours le site sans lint ni vérification des types.',
    measured: [
      {
        label: 'Répétitions relevées et supprimées',
        context:
          'L’audit « le dire une fois » sur cinq pages ; chaque correction a été une soustraction.',
        source: 'L’audit de déploiement de la règle du langage de design',
      },
      {
        label: 'Tests réussis au dernier contrôle avant mise en production',
        context:
          'En plus des vérifications de types, du lint, d’un build de production et d’un smoke test avant le push.',
        source: 'Journal de déploiement, 18 septembre 2026',
      },
    ],
    delivered: [
      {
        label: 'Le persan et l’anglais à leurs propres URL',
        context: 'Le persan par défaut, les deux moitiés dans hreflang et dans les sitemaps.',
      },
      {
        label: 'Un journal de déploiement qui garde ses échecs',
        context:
          '18 exécutions en production consignées, dont cinq en échec, à côté d’un journal distinct de chaque écriture de contenu et de chaque retour en arrière.',
      },
    ],
    shipped: [
      'Réservation Shamsi',
      'Une URL par langue',
      'Données structurées',
      'Vidéo chargée au clic',
      'Administration en persan',
      'RSS par langue',
    ],
  },
  lessons: {
    heading: 'Ce que je garderais, et ce qui m’a piégé',
    items: [
      {
        title: 'Énoncer le langage en une seule phrase',
        body: '« Aucune ligne sans fin » a tranché les débats sans réunion de plus, car chaque désaccord se ramenait à une seule question : cette ligne aboutit-elle quelque part ?',
      },
      {
        title: 'Un site bilingue ne l’est pas tant que chaque langue n’a pas son URL',
        body: 'Le système par cookie passait tous les tests qu’une personne pouvait mener, et échouait complètement pour le visiteur qui compte le plus pour le site d’un écrivain : le robot d’indexation.',
      },
      {
        title: 'Une amélioration qui ne sait pas échouer proprement n’en est pas une',
        body: 'Une apparition au défilement en WebGL levait une erreur dans les navigateurs sans WebGL et remplaçait toute une page persane par un message d’erreur. Elle est revenue derrière une détection de capacité et une error boundary qui se replie sur l’image simple.',
      },
    ],
  },
}

const JA: ArrCopy = {
  statement:
    'ペルシャ語を第一とする、作家・詩人・教師のためのサイト。文書化されたデザイン言語と、出典のない数字はページに載せないというルールの上に築かれている。',
  industry: '個人サイト・出版',
  team: 'デザインと開発を一人で担当し、著者本人と直接協働',
  heroCaption:
    'スマートフォンで見るペルシャ語のサイト。罫線で区切られた行として並ぶ9つの活動、詩のページ、そしてイラン暦（シャムシー暦）の予約カレンダー。',
  snapshot: {
    problem:
      '多彩な経歴は数字を盛りたくさせる。そしてペルシャ語で書く作家のサイトは、クローラーがペルシャ語のページに届かなければほとんど意味がない。',
    role: 'デザインと開発を一人で担当。ブランド、デザイン言語、コンテンツモデル、PayloadとNext.jsによる構築、そして国内スタック。',
    result:
      '2026年8月30日から公開中で、ペルシャ語はクロール可能な独自のURLを持つ。アクセス解析はまだなく、その欠落も記録に残している。',
  },
  alt: {
    cover:
      'スマートフォン上のArash Rezvani — ペルシャ語の経歴ページ。罫線の壁の内側で、見出し「肩書き以上のもの」から始まる',
    practicesMobile:
      'スマートフォン上のArash Rezvani — 番号付きの行として並ぶ9つの活動。どの罫線も列の端で止まる',
    poetryMobile:
      'スマートフォン上のArash Rezvani — ペルシャ語の詩のページ。大きな見出しの下に、ガザル、カスィーダ、ルバーイイ、自由詩について述べた一行',
    calendarMobile:
      'スマートフォン上のArash Rezvani — ペルシャ数字で表したメヘル月の予約カレンダー。週は土曜始まりで、金曜は受付なし',
    experienceEn:
      'デスクトップ上のArash Rezvani — 英語の経歴ページ。見出しは「肩書き以上のもの」で、2本の罫線の壁の内側に収まる',
    experienceFa:
      'デスクトップ上のArash Rezvani — 同じ経歴ページのペルシャ語版。右から左へ組まれ、字間は空けない',
    booksFa:
      'デスクトップ上のArash Rezvani — ペルシャ語の著書ページ。冒頭で、10点近い著書のうち6点を掲載し、残りはまだだと述べている',
    lattice:
      'デスクトップ上のArash Rezvani — 行の罫線と列の罫線を備えた活動一覧。出典のある数字を載せたインク色の帯で締めくくられる',
    hoursEn:
      'デスクトップ上のArash Rezvani — 選んだ日、1405年メヘル月4日（土）とその西暦の日付、そしてテヘラン時間で空いている15分単位の枠',
    calendarFa:
      'デスクトップ上のArash Rezvani — ペルシャ語の予約カレンダー。正方形のグリッドで、過ぎた日と金曜はグレーで表示される',
    postsFa:
      'デスクトップ上のArash Rezvani — ペルシャ語のジャーナル。記事はシャムシー暦で日付が付けられ、活動ごとに絞り込める',
  },
  context: {
    heading: 'ひとつの見出しには収まらない経歴',
    body: [
      'Arash Rezvaniは作家であり、詩人、教師、写真家、冒険家でもある。本人によれば、10冊近い本と100篇を超える詩を発表し、15年にわたって自転車競技のコーチを務め、25年以上クライミングを続け、30年以上写真を撮ってきた。依頼は、そのすべてを収める個人サイトとジャーナルだった。',
      'ペルシャ語は彼の言語であり、読者の言語でもある。だからサイトの既定言語はペルシャ語で、英語がその隣に並ぶ。経歴ページは、その難しさを見出しそのもので言い表している。「肩書き以上のもの」だ。',
    ],
    figureItems: [
      '/en/experience：ラテン文字の大文字で組まれた英語のページ。',
      '/fa/experience：同じページのペルシャ語版。ペルシャ語は決して字間を空けない。',
    ],
    figureCaption:
      'ひとつのページに2つのURL。各言語はそれぞれ独立した文書であり、Cookieで切り替わる翻訳ではない。',
  },
  problem: {
    heading: '真実性の管理と到達性',
    body: [
      '最初の問題は真実性だった。これほど多彩な人生は数字を盛りたくさせる。そこで経歴は信頼できる唯一の情報源となる文書にまとめられ、出典のある数字の表を備えた。どの数字もArashが文面かメッセージで述べたもので、推測によるものは含まない。',
      '次の問題は到達性だった。著書も読者もペルシャ語である作家にとって、ペルシャ語のページはそれ自身のアドレスで見つけられなければならない。ペルシャ語をきれいに表示できても、それをどのクローラーにも届けないサイトは、存在理由そのものを果たせていない。',
    ],
    figureCaption:
      '著書ページは自らの限界を明記している。執筆・翻訳・出版された10点近い書名のうち、掲載は6点で、残りはまだだ。',
  },
  rule: {
    text: '「ここに推測によるものはない。この表にない数字をサイトに載せてはならない」',
    attribution: '経歴文書にある、出典のある数字の表',
    method: 'Arash本人の話と、彼が活動ごとに1通ずつ送った10通のメッセージをもとに作成',
  },
  ownership: {
    heading: 'デザイナー兼開発者が一人、著者が一人',
    intro:
      'デザインと開発を一人で担い、Arashと直接やり取りした。デプロイ記録には、彼の言葉を受けて行われた変更がいくつも残っている。',
    own: [
      'ブランドと、文書化されたデザイン言語',
      'コンテンツモデル：8つのコレクション、4つのグローバル、21のページブロック',
      'PayloadとNext.jsによる2言語の構築',
      '予約システムとそのカレンダー',
      '国内スタックとそのデプロイ記録',
    ],
    collaborate: ['Arash：本人の経歴、各活動についての言葉、コンテンツに関する判断'],
    note: 'サイト上のすべての数字は本人の言葉にさかのぼる。サイトと草稿が食い違えば、経歴が優先される。',
  },
  approach: {
    heading: 'ひとつの公理と、それに照らして測られたすべてのページ',
    body: [
      'サイトはまず、Arash自身の写真から色を取ったパレットによる、エディトリアルなブランドシステムで公開された。温かみのあるインク、アンバー、紙、冷たいミスト、コバルト。すべての組み合わせを測定した。紙の上のアンバーは2.1:1にとどまったため、アンバーを白地の文字に使うことは決してなく、1画面にアンバーは1つまでというルールが生まれた。',
      'その3日後、デザイン言語は「終わりのない線はない」という一文に書き留められた。線が止まってよい正当な方法は3つ。壁で止まるか、別の線で止まるか、地の切り替わりで止まるかだ。それ以外はスタイルではなく欠陥であり、すべてのページがこの一文に照らして作り直され、測定された。',
    ],
    insight:
      '2つ目のルールは、同じ公理をコンテンツに当てはめる。ページは同じことを一度しか言わない。その展開監査では5ページにわたって14か所の繰り返しが見つかり、修正はすべて削除だった。',
    processHeading: '構築から、公開中のバイリンガルなスタックへ',
    steps: [
      {
        label: '基盤構築',
        note: 'Next.jsに組み込んだPayload、ペルシャ語の管理画面、デプロイパイプライン',
      },
      { label: 'ブランドシステム', note: '彼の写真から測ったパレット。8月30日に公開' },
      { label: 'ラティス', note: 'すべての線にひとつの公理。本物の経歴をもとにページを作り直す' },
      { label: '独自のURL', note: '言語ごとに独自のプレフィックス。hreflangとサイトマップ付き' },
      { label: '予約', note: '15分の通話のためのシャムシー暦カレンダー。9月12日から受付中' },
    ],
    annotations: [
      '行の罫線は列の罫線で終わる。線は別の線で止まる。',
      '列の罫線は、一覧の下にある帯の罫線で終わる。',
      '壁は紙がインクに変わるところで止まる。地の切り替わりは縁である。',
      '帯の数字はすべて出典のある数字の表から取り、≈や+もそのまま残している。',
    ],
    figureCaption:
      'ペルシャ語の経歴ページ。壁、行の罫線、列の罫線が、数字を載せたインク色の帯で締めくくられる。',
  },
  decisions: {
    heading: '持ちこたえた4つの判断',
    lede: 'どれも好みではなく、読者かネットワークに迫られての判断だった。',
    items: [
      {
        title: '言語ごとに独自のURLを持たせる',
        why: '最初のペルシャ語版は、言語をCookieで選んでいた。1つのURLに2通りの描画。クローラーはCookieを持たないため、翻訳したページはどれもどのURLからも到達できず、hreflangも出力できなかった。いまは英語が/en、ペルシャ語が/faの下にあり、プレフィックスのないURLはペルシャ語へリダイレクトされる。',
        alternatives: '1つのURLで、言語はCookieで選ぶ',
        tradeoff:
          'すべての内部リンクにプレフィックスが必要になり、言語の切り替えはページ全体の再読み込みになる。',
      },
      {
        title: 'フックではなくデータベースのインデックスで予約を守る',
        why: '確定した2件の通話が同じ開始時刻を共有することは決してない。Payload自身のインデックス設定では「確定済みの行の中でだけ一意」とは表現できないため、アプリは起動時に部分ユニークインデックスを作り、公開予約は1つのエンドポイントだけを通す。競合状態として試験した結果は、201が1件、409が1件、行は1つ。',
        alternatives: '保存フックでの重複チェック',
        tradeoff:
          'インデックスの作成に失敗しても、サイトは保証のないまま動き続ける。だから起動ログを読む必要がある。',
      },
      {
        title: '動画は求められたときにだけ読み込む',
        why: 'イラン国内では、YouTubeのプレーヤーにVPNが必要になる。各曲はクリックで読み込むカードで、ポスター画像とタイトルはサイト自身のストレージから配信される。だからVPNがなくてもカードは欠けず、クリックするまでプレーヤーは読み込まれない。',
        alternatives: 'ページにプレーヤーを埋め込む',
        tradeoff: 'ポスター画像の保存と差し替えは手作業になる。',
      },
      {
        title: 'スタック全体をイラン国内に置く',
        why: 'Docker Hubはサーバーに403を返す。ベースイメージの取得で5回のデプロイが失敗し、イランのミラーを経由してようやく取得できた。ストレージ、Git、デプロイ基盤、メールはすべて国内で動いている。',
        alternatives: '公開レジストリとホスティング型のGit',
        tradeoff:
          '小さなサーバー1台で動かすものが増える。あるビルドはメモリ不足に陥り、Gitサーバーを道連れに落ちた。',
      },
    ],
    hoursEvidence:
      'テヘラン時間で示した、ある日の15分単位の空き枠。英語版では、シャムシー暦の日付の下に西暦の日付が添えられる。',
  },
  solution: {
    heading: 'シャムシー暦の予約、到達性、ペルシャ語の管理画面',
    body: 'MongoDB上で、Next.js 16.3にPayload 3.88を組み込んだ。8つのコレクション、4つのグローバル、21のページブロックに、下書き、ライブプレビュー、予約公開を備え、11ページ、21本の記事、6冊の本、5曲を両言語で載せている。コンテンツの周りには次のものがある。',
    bullets: [
      '土曜始まりのシャムシー暦カレンダーによる、テヘラン時間での予約。空きのない日は選べず、その理由も表示される。',
      '到達性：正規URL、ペルシャ語にx-defaultを置いたhreflangの組、人物・記事・書籍・動画の構造化データ、言語ごとのシェア画像、言語ごとのRSSフィード、そしてサイトマップ。',
      'ページ自身の言語でインデックスを読む検索。ペルシャ語の検索結果にはペルシャ語のタイトルが付く。',
      'ペルシャ語の管理画面。Payloadのワードマークは、Arashの手描きの署名に置き換えられている。',
    ],
    figureItems: [
      'カレンダー：土曜始まり、ペルシャ数字、金曜は受付なし。',
      'ジャーナル：どの記事もシャムシー暦で日付が付き、活動ごとに絞り込める。',
    ],
    figureCaption: 'どちらもペルシャ語。サイトはそこから始まる。',
  },
  outcomes: {
    heading: '公開中、欠けているものも明記して',
    intro:
      '2026年8月30日からarashrezvani.meで公開され、9月12日から予約を受け付けている。アクセス解析が一切ないため、訪問者数はない。それは立場ではなく欠落だ。CIランナーは結局インストールされず、mainへのpushはいまもlintや型チェックを経ずにサイトに届く。',
    measured: [
      {
        label: '見つけて削除した繰り返し',
        context: '5ページにわたる「一度だけ言う」監査。修正はすべて削除だった。',
        source: 'デザイン言語の展開監査',
      },
      {
        label: '直近のリリースゲートで通過したテスト',
        context: '型チェック、lint、本番ビルド、push前のスモークテストに加えて。',
        source: 'デプロイ記録、2026年9月18日',
      },
    ],
    delivered: [
      {
        label: 'ペルシャ語と英語がそれぞれ独自のURLに',
        context: '既定はペルシャ語。両方の言語がhreflangとサイトマップに載る。',
      },
      {
        label: '失敗も残すデプロイ記録',
        context:
          '本番での実行18回を記録し、そのうち5回は失敗。これとは別に、コンテンツの書き込みとロールバックをすべて記録したログもある。',
      },
    ],
    shipped: [
      'シャムシー暦の予約',
      '言語ごとのURL',
      '構造化データ',
      'クリックで読み込む動画',
      'ペルシャ語の管理画面',
      '言語ごとのRSS',
    ],
  },
  lessons: {
    heading: '残したいもの、そして痛い目を見たこと',
    items: [
      {
        title: 'デザイン言語を一文で言い表す',
        body: '「終わりのない線はない」は、会議を重ねることなく議論に決着をつけた。どんな意見の食い違いも、この線はどこかにたどり着いているか、というひとつの問いに帰着したからだ。',
      },
      {
        title: '言語ごとにURLを持つまで、バイリンガルサイトはバイリンガルではない',
        body: 'Cookie方式は人が行えるあらゆるテストを通過したが、作家のサイトにとって最も重要な訪問者、つまりクローラーに対しては完全に失敗していた。',
      },
      {
        title: '安全に失敗できない拡張は、拡張ではない',
        body: 'WebGLによるスクロール演出は、WebGLのないブラウザで例外を投げ、ペルシャ語のページ全体をエラー表示に置き換えてしまった。機能チェックと、素の画像に落ち着くエラーバウンダリの背後に置いて復活させた。',
      },
    ],
  },
}

const COPY: Record<Locale, ArrCopy> = { en: EN, fa: FA, ar: AR, es: ES, de: DE, fr: FR, ja: JA }

const imageryKey = (file: string) => file.replace(/\.jpg$/, '') as ImageryKey
const liveKey = (file: string) => `live/${file.replace(/\.(jpg|png)$/, '')}` as LiveKey
const LIVE_SPECS = [...ARR_LIVE_DESKTOP_HERO, ARR_LIVE_WAYS, ...ARR_LIVE_PHONE, ...ARR_LIVE_LOWER]

export const ARR_MEDIA = {
  ...Object.fromEntries(
    (Object.keys(MEDIA_FILES) as CaptureKey[]).map((key) => [
      key,
      {
        file: `${CAPTURE_DIR}/${MEDIA_FILES[key].file}`,
        name: MEDIA_FILES[key].name,
        alt: Object.fromEntries(LOCALES.map((locale) => [locale, COPY[locale].alt[key]])),
      },
    ]),
  ),
  ...Object.fromEntries(
    [...ARR_TURNAROUNDS, ...ARR_SITE_IMAGES, ...ARR_STUDIES].map((spec) => [
      imageryKey(spec.file),
      {
        file: `imagery/${spec.file}`,
        name: `arash-rezvani--${imageryKey(spec.file).replace('/', '-')}.jpg`,
        alt: spec.alt,
      },
    ]),
  ),
  ...Object.fromEntries(
    LIVE_SPECS.map((spec) => [
      liveKey(spec.file),
      {
        file: `${ARR_LIVE_DIR}/${spec.file}`,
        name: `arash-rezvani--live-${spec.file.replace('/', '-')}`,
        alt: spec.alt,
      },
    ]),
  ),
} as Record<ArrMediaKey, MediaSpec>

const PROCESS_CODES: Five = ['BLD', 'BRND', 'LATT', 'URL', 'BOOK']
const MEASURED_VALUES: Two = ['14', '307']

export function arrSections(locale: Locale, media: ArrMediaIds): Sections {
  const c = COPY[locale]
  const dir = dirFor(locale)
  const item = (key: ArrMediaKey, id: string, caption?: string) =>
    media[key] ? [{ id, media: media[key]!, caption: caption ?? '' }] : []
  const img = ARR_IMAGERY_COPY[locale]
  const gallery = (specs: { file: string }[], prefix: string) =>
    specs.flatMap((spec, index) =>
      item(imageryKey(spec.file), `${prefix}-${String(index + 1).padStart(2, '0')}`),
    )
  const live = ARR_LIVE_COPY[locale]
  const liveItems = (specs: { file: string }[], prefix: string) =>
    specs.flatMap((spec, index) => item(liveKey(spec.file), `${prefix}-${index + 1}`))

  return [
    {
      id: 'arr-s01',
      blockType: 'csNarrative',
      label: 'context',
      heading: c.context.heading,
      body: prose(dir, ...c.context.body.map((value) => paragraph(value, dir))),
      insight: '',
    },
    {
      id: 'arr-s02',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'plain',
      items: [
        ...item('experienceEn', 'arr-f02-1', c.context.figureItems[0]),
        ...item('experienceFa', 'arr-f02-2', c.context.figureItems[1]),
      ],
      annotations: [],
      caption: c.context.figureCaption,
    },
    {
      id: 'arr-s03',
      blockType: 'csNarrative',
      label: 'problem',
      heading: c.problem.heading,
      body: prose(dir, ...c.problem.body.map((value) => paragraph(value, dir))),
      insight: '',
    },
    {
      id: 'arr-s04',
      blockType: 'csFinding',
      kind: 'quote',
      text: c.rule.text,
      attribution: c.rule.attribution,
      method: c.rule.method,
    },
    {
      id: 'arr-s05',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'plain',
      items: item('booksFa', 'arr-f05-1'),
      annotations: [],
      caption: c.problem.figureCaption,
    },
    {
      id: 'arr-s06',
      blockType: 'csOwnership',
      heading: c.ownership.heading,
      intro: c.ownership.intro,
      own: [...c.ownership.own, img.own],
      collaborate: c.ownership.collaborate,
      note: c.ownership.note,
    },
    {
      id: 'arr-s07',
      blockType: 'csNarrative',
      label: 'approach',
      heading: c.approach.heading,
      body: prose(dir, ...c.approach.body.map((value) => paragraph(value, dir))),
      insight: c.approach.insight,
    },
    {
      id: 'arr-s08',
      blockType: 'csProcess',
      kind: 'process',
      heading: c.approach.processHeading,
      steps: c.approach.steps.map((step, index) => ({
        id: `arr-p${String(index + 1).padStart(2, '0')}`,
        code: PROCESS_CODES[index],
        label: step.label,
        note: step.note,
      })),
    },
    {
      id: 'arr-s09',
      blockType: 'csFigure',
      layout: 'annotated',
      treatment: 'plain',
      items: item('lattice', 'arr-f09-1'),
      annotations: c.approach.annotations.map((text, index) => ({
        id: `arr-a${String(index + 1).padStart(2, '0')}`,
        text,
      })),
      caption: c.approach.figureCaption,
    },
    {
      id: 'arr-s20',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: img.label,
      heading: img.heading,
      body: prose(dir, ...img.body.map((value) => paragraph(value, dir))),
      insight: img.insight,
    },
    {
      id: 'arr-s24',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'plain',
      items: liveItems(ARR_LIVE_DESKTOP_HERO, 'arr-f24'),
      annotations: [],
      caption: live.heroCaption,
    },
    {
      id: 'arr-s25',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'plain',
      items: liveItems([ARR_LIVE_WAYS], 'arr-f25'),
      annotations: [],
      caption: live.waysCaption,
    },
    {
      id: 'arr-s26',
      blockType: 'csFigure',
      layout: 'sequence',
      treatment: 'screen',
      items: liveItems(ARR_LIVE_PHONE, 'arr-f26'),
      annotations: [],
      caption: live.phoneCaption,
    },
    {
      id: 'arr-s21',
      blockType: 'csFigure',
      layout: 'gallery',
      treatment: 'plain',
      items: gallery(ARR_TURNAROUNDS, 'arr-f21'),
      annotations: [],
      caption: img.turnaroundsCaption,
    },
    {
      id: 'arr-s22',
      blockType: 'csFigure',
      layout: 'gallery',
      treatment: 'plain',
      items: gallery(ARR_SITE_IMAGES, 'arr-f22'),
      annotations: [],
      caption: img.siteCaption,
    },
    {
      id: 'arr-s23',
      blockType: 'csFigure',
      layout: 'gallery',
      treatment: 'plain',
      items: gallery(ARR_STUDIES, 'arr-f23'),
      annotations: [],
      caption: img.studiesCaption,
    },
    {
      id: 'arr-s10',
      blockType: 'csDecisions',
      heading: c.decisions.heading,
      lede: c.decisions.lede,
      items: c.decisions.items.map((decision, index) => ({
        id: `arr-d${String(index + 1).padStart(2, '0')}`,
        title: decision.title,
        why: decision.why,
        alternatives: decision.alternatives,
        tradeoff: decision.tradeoff,
        evidence: index === 1 ? c.decisions.hoursEvidence : '',
        ...(index === 1 && media.hoursEn ? { media: media.hoursEn } : {}),
      })),
    },
    {
      id: 'arr-s11',
      blockType: 'csNarrative',
      label: 'solution',
      heading: c.solution.heading,
      body: prose(dir, paragraph(c.solution.body, dir), bullets(c.solution.bullets, dir)),
      insight: '',
    },
    {
      id: 'arr-s12',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'plain',
      items: [
        ...item('calendarFa', 'arr-f12-1', c.solution.figureItems[0]),
        ...item('postsFa', 'arr-f12-2', c.solution.figureItems[1]),
      ],
      annotations: [],
      caption: c.solution.figureCaption,
    },
    {
      id: 'arr-s27',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'plain',
      items: liveItems(ARR_LIVE_LOWER, 'arr-f27'),
      annotations: [],
      caption: live.lowerCaption,
    },
    {
      id: 'arr-s13',
      blockType: 'csOutcomes',
      heading: c.outcomes.heading,
      intro: c.outcomes.intro,
      items: [
        ...c.outcomes.measured.map((outcome, index) => ({
          id: `arr-o${String(index + 1).padStart(2, '0')}`,
          kind: 'measured' as const,
          value: MEASURED_VALUES[index],
          label: outcome.label,
          context: outcome.context,
          source: outcome.source,
        })),
        ...c.outcomes.delivered.map((outcome, index) => ({
          id: `arr-o${String(index + 3).padStart(2, '0')}`,
          kind: 'delivered' as const,
          label: outcome.label,
          context: outcome.context,
        })),
      ],
      shipped: c.outcomes.shipped,
    },
    {
      id: 'arr-s14',
      blockType: 'csLessons',
      heading: c.lessons.heading,
      items: c.lessons.items.map((lesson, index) => ({
        id: `arr-l${String(index + 1).padStart(2, '0')}`,
        title: lesson.title,
        body: lesson.body,
      })),
    },
  ]
}

export function arrLocalizedFields(locale: Locale, media: ArrMediaIds) {
  const c = COPY[locale]
  const identity = ARCHIVE.text(locale)
  return {
    ...identity,
    statement: c.statement,
    industry: c.industry,
    team: c.team,
    hero: {
      items: (['practicesMobile', 'poetryMobile', 'calendarMobile'] as const)
        .filter((key) => media[key])
        .map((key, index) => ({
          id: `arr-h${String(index + 1).padStart(2, '0')}`,
          media: media[key]!,
        })),
      caption: c.heroCaption,
    },
    snapshot: c.snapshot,
    sections: arrSections(locale, media),
    meta: {
      title: identity.title,
      description: identity.summary,
      ...(media.cover ? { image: media.cover } : {}),
    },
  }
}

export const ARR_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  projectStatus: 'shipped',
  tools: [
    'Payload',
    'Next.js',
    'MongoDB',
    'Tailwind CSS',
    'ArvanCloud',
    'Coolify',
    'Gitea',
    'Docker',
  ],
  period: { start: '2026-08-01T00:00:00.000Z', present: true },
}
