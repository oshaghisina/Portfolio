import type { Project } from '@/payload-types'
import { dirFor, LOCALES, type Locale } from '@/utilities/locale'

import type { MediaSpec } from '../media'
import { archiveIdentity } from './archive'
import { bullets, paragraph, prose } from './lexical'

/**
 * Biomaze website & education panel (`/work/biomaze-website-education-panel`) — Maz / biomaze.ir.
 * Source: `Docs/Experience/Biomaze/website-education-panel/README.md` and the BioMaze | Design
 * Figma file (`1lhDcyLLBzaS2nFcJMh5LU`), scanned 2026-09-24 (32 pages).
 *
 * Publication gates (held here and in `tests/int/case-study-seeds.int.spec.ts`):
 * - No Brand Brief Tier-1 claim: never “first player in the official education system” (or
 *   translations). Keep outcomes qualitative / Figma-scope only.
 * - No invented conversion, NPS or revenue numbers.
 * - Placeholder student name “سینا عشاقی” appears in some panel frames — do not treat as a claim
 *   about the live product’s users.
 */
export const BIO_SLUG = 'biomaze-website-education-panel'
export const BIO_ASSETS = 'Docs/Experience/Biomaze/website-education-panel/assets'
export const BIO_LOCALES = LOCALES

const ARCHIVE = archiveIdentity(BIO_SLUG)

const MEDIA_FILES = {
  cover: { file: 'biomaze--panel-classes-desktop.png', name: ARCHIVE.row.cover.name },
  classesTablet: {
    file: 'biomaze--panel-classes-tablet.png',
    name: 'biomaze--panel-classes-tablet.png',
  },
  login: { file: 'biomaze--panel-login-desktop.png', name: 'biomaze--panel-login-desktop.png' },
  live: { file: 'biomaze--panel-live-desktop.png', name: 'biomaze--panel-live-desktop.png' },
  wallet: { file: 'biomaze--panel-wallet-desktop.png', name: 'biomaze--panel-wallet-desktop.png' },
  examDesktop: {
    file: 'biomaze--panel-exam-desktop.png',
    name: 'biomaze--panel-exam-desktop.png',
  },
  examMobile: { file: 'biomaze--panel-exam-mobile.png', name: 'biomaze--panel-exam-mobile.png' },
  websiteHero: { file: 'biomaze--website-hero.png', name: 'biomaze--website-hero.png' },
  websiteCampaign: {
    file: 'biomaze--website-campaign.png',
    name: 'biomaze--website-campaign.png',
  },
  websiteShop: {
    file: 'biomaze--website-shop-product.png',
    name: 'biomaze--website-shop-product.png',
  },
  brand: { file: 'biomaze--cover-brand.png', name: 'biomaze--cover-brand.png' },
  dsColor: { file: 'biomaze--ds-color.png', name: 'biomaze--ds-color.png' },
  dsButtons: { file: 'biomaze--ds-buttons.png', name: 'biomaze--ds-buttons.png' },
  dsForms: { file: 'biomaze--ds-forms.png', name: 'biomaze--ds-forms.png' },
} as const

export type BioMediaKey = keyof typeof MEDIA_FILES
type BioMediaIds = Partial<Record<BioMediaKey, string>>
type Sections = NonNullable<Project['sections']>

type Two<T = string> = [T, T]
type Three<T = string> = [T, T, T]
type Four<T = string> = [T, T, T, T]
type Five<T = string> = [T, T, T, T, T]

export interface BioCopy {
  statement: string
  industry: string
  team: string
  heroCaption: string
  snapshot: { problem: string; role: string; result: string }
  alt: Record<BioMediaKey, string>
  context: { heading: string; body: Two; figureCaption: string }
  problem: { heading: string; intro: string; bullets: Five }
  ownership: { heading: string; intro: string; own: Five; collaborate: [string]; note: string }
  approach: {
    heading: string
    body: Two
    insight: string
    processHeading: string
    steps: Five<{ label: string; note: string }>
  }
  decisions: {
    heading: string
    lede: string
    items: Four<{ title: string; why: string; alternatives: string; tradeoff: string }>
  }
  solutionPanel: {
    heading: string
    body: string
    bullets: Four
    figureCaption: string
  }
  solutionWeb: {
    heading: string
    body: string
    bullets: Three
    figureCaption: string
  }
  designSystem: {
    heading: string
    body: Two
    figureCaption: string
  }
  outcomes: {
    heading: string
    intro: string
    measured: Three<{ label: string; context: string; source: string }>
    delivered: { label: string; context: string }
    shipped: Five
  }
  lessons: { heading: string; items: Three<{ title: string; body: string }> }
}

const EN: BioCopy = {
  statement:
    'Public site and RTL learning panel for Maz: classes, exams, live class and wallet — one Figma file with the design system built alongside.',
  industry: 'Edtech · Konkur education (Iran)',
  team: 'Product manager & designer, part-time, working with Biomaze’s engineering team',
  heroCaption:
    'The education panel’s classes surface on desktop — teacher cards, schedule chips and the shared panel chrome.',
  snapshot: {
    problem:
      'A growing Konkur brand needed one coherent digital surface for prospects on the web and students inside a logged-in panel — without diverging UI on every page.',
    role: 'Product manager & designer across the public website, the learning panel and the shared design system.',
    result:
      'The learning panel and the public website both went live on biomaze.ir, designed in one 32-page file with a shared kit.',
  },
  alt: {
    cover:
      'Biomaze education panel — the classes list on desktop in Persian, with teacher cards, schedule chips and the panel chrome',
    classesTablet: 'Biomaze education panel — classes list on a tablet-width frame',
    login: 'Biomaze education panel — desktop login screen in Persian',
    live: 'Biomaze education panel — live class surface on desktop',
    wallet: 'Biomaze education panel — wallet screen on desktop',
    examDesktop: 'Biomaze education panel — exam flow on desktop',
    examMobile: 'Biomaze education panel — exam flow on a phone-width frame',
    websiteHero: 'Biomaze public website — home hero exploration from the playground page',
    websiteCampaign: 'Biomaze public website — a campaign landing page',
    websiteShop: 'Biomaze public website — a shop product page',
    brand: 'Maz educational group mark — open-mind maze logo with Persian calligraphy',
    dsColor: 'Biomaze design system — colour board',
    dsButtons: 'Biomaze design system — button type and state matrix',
    dsForms: 'Biomaze design system — form field states for RTL inputs',
  },
  context: {
    heading: 'Maz needed a site students could trust and a panel they could live in',
    body: [
      'Biomaze / گروه آموزشی ماز is a nationwide Iranian Konkur education brand. The live property is biomaze.ir — packages, online classes and national practice exams under one roof.',
      'Part-time from 2022 to 2025, the brief was to design the public website and the learning panel, and to leave engineers a design system so both surfaces could ship without reinventing chrome on every screen.',
    ],
    figureCaption: 'Brand mark from the BioMaze | Design cover page — ماز as maze and growth.',
  },
  problem: {
    heading: 'Three jobs, one brand, no shared language yet',
    intro: 'The product had to serve three audiences without looking like three products:',
    bullets: [
      'Prospects discovering packages, Konkur tools and campaigns on the public web.',
      'Students attending classes, sitting exams, submitting homework, asking questions and paying inside a panel.',
      'Engineers implementing both surfaces without a one-off button language on every page.',
      'RTL Persian as the default reading direction — not a mirrored afterthought.',
      'A résumé-safe outcome: ship faster from a shared kit, not an unverified market-share claim.',
    ],
  },
  ownership: {
    heading: 'What the design owned',
    intro: 'Part-time product management and design across the digital surfaces of Maz.',
    own: [
      'Information architecture for the public website and the learning panel.',
      'UI for classes, exams, live class, wallet, auth and package commerce.',
      'Responsive frames at desktop, tablet and phone widths.',
      'The design-system boards consumed by both surfaces.',
      'Keeping playground and warehouse website iterations readable beside “main”.',
    ],
    collaborate: ['Engineering delivery of biomaze.ir and the panel.'],
    note: 'Part-time, 2022–2025. Every panel page and every website page shipped; the home page on biomaze.ir today is not this work.',
  },
  approach: {
    heading: 'The file is the process record',
    body: [
      'BioMaze | Design holds thirty-two pages. Panel pages are named by domain — P.Classes, P.Exam & Test, P.Login & Signup, P.Live & Chat, P.Wallet — so the inventory reads as jobs, not artboards.',
      'Website work keeps playground, main and warehouse pages side by side. The design system lives in the same file, so every panel instance of Buttons or Pannel Header points at a board engineers can open.',
    ],
    insight:
      'Named sections inside P.Classes — Classes, Class Detail, رفع اشکال, تکلیف — make the panel scannable even when individual frames are still labelled Tilte.',
    processHeading: 'How the work moved',
    steps: [
      { label: 'Map the jobs', note: 'Separate prospect web from student panel domains.' },
      { label: 'Design the panel shell', note: 'Header, side menu, footer and main box shared across pages.' },
      { label: 'Fill domain pages', note: 'Classes, exams, live, wallet, auth, basket, invoices.' },
      { label: 'Iterate the public site', note: 'Playground → main → warehouse, with live captures for shop and packages.' },
      { label: 'Publish the kit', note: 'Colour, type, buttons, forms and chrome boards for engineering.' },
    ],
  },
  decisions: {
    heading: 'Decisions the file still shows',
    lede: 'Four choices visible without a separate process deck.',
    items: [
      {
        title: 'One file for website, panel and system',
        why: 'Engineers and designers share one source of truth; panel instances resolve to boards in the same document.',
        alternatives: 'Separate library file or Sketch handoff.',
        tradeoff: 'A large file — 32 pages — that needs a page map to navigate.',
      },
      {
        title: 'Panel pages named by student job',
        why: 'Classes, exams, live and wallet are how students think; page names match.',
        alternatives: 'One mega “Panel” page with unlabeled frames.',
        tradeoff: 'Some frames still use generic Tilte labels inside those pages.',
      },
      {
        title: 'Keep website playground and warehouse',
        why: 'Decision history stays visible next to the main site boards.',
        alternatives: 'Delete explorations once a home ships.',
        tradeoff: 'Reviewers must know which page is canonical.',
      },
      {
        title: 'Responsive triples, not mobile-only',
        why: 'Panel work repeats key screens at 1440 / 1028 / 360 widths.',
        alternatives: 'Desktop-first with fluid CSS assumed.',
        tradeoff: 'More frames to maintain when a pattern changes.',
      },
    ],
  },
  solutionPanel: {
    heading: 'The learning panel',
    body: 'Fifteen panel-side pages cover the student job: class list and detail, exams and tests, homework and Q&A, live class, wallet and basket, invoices, upgrades, calendar, notifications, errors, profile and a coin system.',
    bullets: [
      'P.Classes — Classes, Class Detail, Class View, رفع اشکال, تکلیف.',
      'P.Exam & Test — Exams, Exam Detail, Start Exams, reports.',
      'P.Login & Signup — OTP, password, forget and change flows.',
      'P.Live & Chat, P.Wallet, P.Basket — attendance, money and checkout.',
    ],
    figureCaption: 'Classes, login, live class and wallet from the panel pages.',
  },
  solutionWeb: {
    heading: 'The public website',
    body: 'Eight website pages cover home, Konkur and rank tools, packages and shop, schedule and campaign landings — with playground and warehouse iterations kept beside main. The Konkur tools, shop, schedule and campaign pages went live; the home page on biomaze.ir today is not this work, so the hero below is an exploration.',
    bullets: [
      'Website | Main — Home, Konkoor, Nahai and Shop sections.',
      'Website | Playground and Warehouse — home and shop explorations plus live-site captures.',
      'W.Konkur & Rotbeh, W.Product, W.Campaign Landing, W.Schedule — tools and commerce.',
    ],
    figureCaption: 'Home hero exploration, campaign landing and shop product.',
  },
  designSystem: {
    heading: 'Design system as a chapter, not a separate case study',
    body: [
      'The Design System page holds colour, typography, buttons, form fields, modal, side menu, header and footer, toast, profile, breadcrumbs, toggles and brand icons — versioned as 0.0.1 on the boards. Its tokens became Figma variables, not just static boards.',
      'BIO-02 stays an archive row on /work; this case study is the published umbrella, with the kit shown as the shared language behind both surfaces.',
    ],
    figureCaption: 'Colour, button states and RTL form fields from the kit.',
  },
  outcomes: {
    heading: 'What the file proves',
    intro: 'Scope facts from the 2026-09-24 Figma scan — not marketing metrics.',
    measured: [
      {
        label: '32 pages',
        context: 'Cover, panel, website, system and support pages in one design file.',
        source: 'Figma REST files?depth=1 · 2026-09-24',
      },
      {
        label: '15 panel pages',
        context: 'Named student jobs from classes and exams through wallet and live class.',
        source: 'BioMaze | Design page index',
      },
      {
        label: '8 website pages',
        context: 'Main, playground, warehouse and Konkur / product / campaign / schedule boards.',
        source: 'BioMaze | Design page index',
      },
    ],
    delivered: {
      label: '1 shared kit',
      context: 'Design System with its tokens as Figma variables, plus icon and tooltip pages consumed by panel instances.',
    },
    shipped: [
      'Public website pages for Konkur tools, shop and campaigns',
      'Learning panel for classes, exams, live and wallet',
      'Auth flows (OTP and password)',
      'Responsive panel frames at three widths',
      'Figma variables plus colour, button and form boards for engineering',
    ],
  },
  lessons: {
    heading: 'What this work reinforces',
    items: [
      {
        title: 'Name pages after jobs',
        body: 'P.Classes and P.Exam & Test are searchable in a 32-page file; a dump of untitled frames is not.',
      },
      {
        title: 'Keep the discarded iterations',
        body: 'Playground and warehouse pages make the website decisions legible without a separate changelog.',
      },
      {
        title: 'Never publish Tier-1 claims',
        body: 'Unverified market-leadership lines stay off the site until an independent corpus source exists. The design file already carries enough proof of scope.',
      },
    ],
  },
}

const FA: BioCopy = {
  statement:
    'وب‌سایت عمومی و پنل یادگیری راست‌به‌چپ ماز: کلاس، آزمون، کلاس زنده و کیف پول — یک فایل Figma با سیستم طراحی موازی.',
  industry: 'آموزش · کنکور (ایران)',
  team: 'مدیر محصول و طراح، پاره‌وقت، کنار تیم فنی بایومیز',
  heroCaption: 'سطح کلاس‌های پنل آموزش روی دسکتاپ — کارت استاد، زمان‌بندی و کروم مشترک پنل.',
  snapshot: {
    problem:
      'برند رو‌به‌رشد کنکور به یک سطح دیجیتال منسجم نیاز داشت: وب برای متقاضی و پنل برای دانش‌آموز — بدون واگرایی UI در هر صفحه.',
    role: 'مدیر محصول و طراح روی وب‌سایت عمومی، پنل یادگیری و سیستم طراحی مشترک.',
    result:
      'پنل یادگیری و وب‌سایت عمومی هر دو روی biomaze.ir منتشر شدند، با طراحی در یک فایل ۳۲صفحه‌ای و یک کیت مشترک.',
  },
  alt: {
    cover: 'پنل آموزش بایومیز — فهرست کلاس‌ها روی دسکتاپ به فارسی، با کارت استاد و کروم پنل',
    classesTablet: 'پنل آموزش بایومیز — فهرست کلاس‌ها در عرض تبلت',
    login: 'پنل آموزش بایومیز — ورود دسکتاپ به فارسی',
    live: 'پنل آموزش بایومیز — سطح کلاس زنده روی دسکتاپ',
    wallet: 'پنل آموزش بایومیز — کیف پول روی دسکتاپ',
    examDesktop: 'پنل آموزش بایومیز — جریان آزمون روی دسکتاپ',
    examMobile: 'پنل آموزش بایومیز — جریان آزمون در عرض موبایل',
    websiteHero: 'وب‌سایت عمومی بایومیز — اکتشاف هیروی خانه از صفحه playground',
    websiteCampaign: 'وب‌سایت عمومی بایومیز — لندینگ کمپین',
    websiteShop: 'وب‌سایت عمومی بایومیز — صفحه محصول فروشگاه',
    brand: 'نشان گروه آموزشی ماز — لوگوی ماز با خوشنویسی فارسی',
    dsColor: 'سیستم طراحی بایومیز — برد رنگ',
    dsButtons: 'سیستم طراحی بایومیز — ماتریس نوع و حالت دکمه',
    dsForms: 'سیستم طراحی بایومیز — حالت‌های فیلد فرم RTL',
  },
  context: {
    heading: 'ماز به سایتی قابل اعتماد و پنلی برای زندگی روزمره نیاز داشت',
    body: [
      'بایومیز / گروه آموزشی ماز برند سراسری آموزش کنکور است. ملک زنده biomaze.ir است — بسته، کلاس آنلاین و آزمون آزمایشی زیر یک سقف.',
      'از ۲۰۲۲ تا ۲۰۲۵ و به‌صورت پاره‌وقت، کار طراحی وب‌سایت عمومی و پنل یادگیری بود و گذاشتن سیستم طراحی برای تیم فنی تا هر دو سطح بدون اختراع دوباره‌ی کروم منتشر شوند.',
    ],
    figureCaption: 'نشان از صفحه Cover فایل BioMaze | Design.',
  },
  problem: {
    heading: 'سه شغل، یک برند، هنوز بدون زبان مشترک',
    intro: 'محصول باید سه مخاطب را پوشش می‌داد بدون آنکه سه محصول به نظر برسد:',
    bullets: [
      'متقاضیانی که بسته، ابزار کنکور و کمپین را در وب می‌بینند.',
      'دانش‌آموزانی که در پنل کلاس می‌روند، آزمون می‌دهند، تکلیف می‌فرستند و پرداخت می‌کنند.',
      'مهندس‌هایی که هر دو سطح را بدون زبان دکمه‌ی یک‌بارمصرف پیاده می‌کنند.',
      'فارسی راست‌به‌چپ به‌عنوان جهت پیش‌فرض — نه بازتاب بعدی.',
      'نتیجه‌ی امن برای رزومه: انتشار سریع‌تر از کیت مشترک، نه ادعای سهم بازار تأییدنشده.',
    ],
  },
  ownership: {
    heading: 'آنچه طراحی مالک آن بود',
    intro: 'مدیریت محصول و طراحی پاره‌وقت روی سطوح دیجیتال ماز.',
    own: [
      'معماری اطلاعات وب‌سایت عمومی و پنل یادگیری.',
      'UI کلاس، آزمون، کلاس زنده، کیف پول، احراز هویت و تجارت بسته.',
      'فریم‌های ریسپانسیو در عرض دسکتاپ، تبلت و موبایل.',
      'بردهای سیستم طراحی مصرف‌شده در هر دو سطح.',
      'خوانا نگه داشتن تکرارهای playground و warehouse کنار main.',
    ],
    collaborate: ['تحویل مهندسی biomaze.ir و پنل.'],
    note: 'پاره‌وقت، ۲۰۲۲ تا ۲۰۲۵. همه‌ی صفحه‌های پنل و همه‌ی صفحه‌های وب‌سایت منتشر شدند؛ صفحه‌ی اصلی فعلی biomaze.ir جزو این کار نیست.',
  },
  approach: {
    heading: 'فایل همان سابقه‌ی فرایند است',
    body: [
      'BioMaze | Design سی‌ودو صفحه دارد. صفحات پنل با دامنه نام‌گذاری شده‌اند تا فهرست مثل شغل خوانده شود نه آرت‌بورد.',
      'کار وب، playground و warehouse را کنار main نگه می‌دارد. سیستم طراحی در همان فایل است تا هر نمونه‌ی Buttons به بردی اشاره کند که مهندس باز می‌کند.',
    ],
    insight:
      'سکشن‌های نام‌دار داخل P.Classes — Classes، Class Detail، رفع اشکال، تکلیف — پنل را حتی با فریم‌های Tilte قابل پیمایش می‌کنند.',
    processHeading: 'مسیر کار',
    steps: [
      { label: 'نقشه‌ی شغل‌ها', note: 'جدا کردن وب متقاضی از دامنه‌های پنل دانش‌آموز.' },
      { label: 'پوسته‌ی پنل', note: 'هدر، منوی کناری، فوتر و جعبه‌ی اصلی مشترک.' },
      { label: 'پر کردن صفحات دامنه', note: 'کلاس، آزمون، زنده، کیف پول، احراز هویت، سبد.' },
      { label: 'تکرار وب عمومی', note: 'Playground → main → warehouse با کپچر زنده.' },
      { label: 'انتشار کیت', note: 'برد رنگ، تایپ، دکمه، فرم و کروم برای مهندسی.' },
    ],
  },
  decisions: {
    heading: 'تصمیم‌هایی که فایل هنوز نشان می‌دهد',
    lede: 'چهار انتخاب بدون نیاز به دک جداگانه‌ی فرایند.',
    items: [
      {
        title: 'یک فایل برای وب، پنل و سیستم',
        why: 'منبع حقیقت مشترک؛ نمونه‌های پنل به بردهای همان سند وصل می‌شوند.',
        alternatives: 'کتابخانه جدا یا تحویل Sketch.',
        tradeoff: 'فایل بزرگ — ۳۲ صفحه — که به نقشه‌ی صفحه نیاز دارد.',
      },
      {
        title: 'نام صفحات پنل بر اساس شغل دانش‌آموز',
        why: 'کلاس، آزمون، زنده و کیف پول همان ذهنیت دانش‌آموز است.',
        alternatives: 'یک صفحه‌ی عظیم Panel بدون برچسب.',
        tradeoff: 'برخی فریم‌ها هنوز Tilte عمومی دارند.',
      },
      {
        title: 'نگه داشتن playground و warehouse',
        why: 'سابقه‌ی تصمیم کنار بردهای اصلی می‌ماند.',
        alternatives: 'حذف اکتشاف‌ها پس از انتشار خانه.',
        tradeoff: 'باید بدانید کدام صفحه مرجع است.',
      },
      {
        title: 'سه‌گانه‌ی ریسپانسیو، نه فقط موبایل',
        why: 'صفحات کلیدی در عرض ۱۴۴۰ / ۱۰۲۸ / ۳۶۰ تکرار می‌شوند.',
        alternatives: 'فقط دسکتاپ با فرض CSS روان.',
        tradeoff: 'فریم‌های بیشتر هنگام تغییر الگو.',
      },
    ],
  },
  solutionPanel: {
    heading: 'پنل یادگیری',
    body: 'پانزده صفحه‌ی سمت پنل شغل دانش‌آموز را پوشش می‌دهد: فهرست و جزئیات کلاس، آزمون، تکلیف و رفع اشکال، کلاس زنده، کیف پول و سبد، فاکتور، ارتقا، تقویم، اعلان، خطا، پروفایل و سیستم سکه.',
    bullets: [
      'P.Classes — Classes، Class Detail، Class View، رفع اشکال، تکلیف.',
      'P.Exam & Test — Exams، Exam Detail، Start Exams، گزارش.',
      'P.Login & Signup — OTP، رمز، فراموشی و تغییر.',
      'P.Live & Chat، P.Wallet، P.Basket — حضور، پول و تسویه.',
    ],
    figureCaption: 'کلاس‌ها، ورود، کلاس زنده و کیف پول از صفحات پنل.',
  },
  solutionWeb: {
    heading: 'وب‌سایت عمومی',
    body: 'هشت صفحه‌ی وب خانه، ابزار کنکور و رتبه، بسته و فروشگاه، برنامه و لندینگ کمپین را پوشش می‌دهد — با تکرارهای playground و warehouse کنار main. صفحه‌های ابزار کنکور، فروشگاه، برنامه و کمپین منتشر شدند؛ صفحه‌ی اصلی فعلی biomaze.ir جزو این کار نیست، پس هیروی زیر یک اکتشاف است.',
    bullets: [
      'Website | Main — Home، Konkoor، Nahai و Shop.',
      'Website | Playground و Warehouse — اکتشاف خانه و فروشگاه به‌همراه کپچر زنده.',
      'W.Konkur & Rotbeh، W.Product، W.Campaign Landing، W.Schedule.',
    ],
    figureCaption: 'هیروی خانه، لندینگ کمپین و محصول فروشگاه.',
  },
  designSystem: {
    heading: 'سیستم طراحی به‌عنوان فصل، نه مطالعه‌ی جدا',
    body: [
      'صفحه‌ی Design System رنگ، تایپ، دکمه، فیلد فرم، مودال، منوی کناری، هدر و فوتر، توست، پروفایل، بردکرامب، تاگل و آیکون برند را نگه می‌دارد — نسخه‌ی ۰٫۰٫۱ روی بردها. توکن‌ها به متغیرهای Figma تبدیل شدند، نه فقط بردهای ثابت.',
      'BIO-02 ردیف آرشیو می‌ماند؛ این مطالعه چتر منتشرشده است و کیت را زبان مشترک هر دو سطح نشان می‌دهد.',
    ],
    figureCaption: 'رنگ، حالت دکمه و فیلدهای RTL از کیت.',
  },
  outcomes: {
    heading: 'آنچه فایل ثابت می‌کند',
    intro: 'واقعیت‌های دامنه از اسکن Figma در ۲۴ سپتامبر ۲۰۲۶ — نه متریک بازاریابی.',
    measured: [
      {
        label: '۳۲ صفحه',
        context: 'Cover، پنل، وب، سیستم و صفحات پشتیبان در یک فایل.',
        source: 'Figma REST files?depth=1 · ۲۰۲۶-۰۹-۲۴',
      },
      {
        label: '۱۵ صفحه پنل',
        context: 'شغل‌های نام‌دار دانش‌آموز از کلاس و آزمون تا کیف پول و زنده.',
        source: 'فهرست صفحات BioMaze | Design',
      },
      {
        label: '۸ صفحه وب',
        context: 'Main، playground، warehouse و بردهای کنکور / محصول / کمپین / برنامه.',
        source: 'فهرست صفحات BioMaze | Design',
      },
    ],
    delivered: {
      label: '۱ کیت مشترک',
      context: 'Design System با توکن‌هایی به‌شکل متغیرهای Figma، به‌همراه صفحات آیکون و تولتیپ مصرف‌شده در نمونه‌های پنل.',
    },
    shipped: [
      'صفحه‌های وب عمومی برای ابزار کنکور، فروشگاه و کمپین',
      'پنل یادگیری برای کلاس، آزمون، زنده و کیف پول',
      'جریان‌های احراز هویت (OTP و رمز)',
      'فریم‌های ریسپانسیو پنل در سه عرض',
      'متغیرهای Figma و برد رنگ، دکمه و فرم برای مهندسی',
    ],
  },
  lessons: {
    heading: 'آنچه این کار تقویت می‌کند',
    items: [
      {
        title: 'صفحات را با شغل نام بگذارید',
        body: 'P.Classes و P.Exam در فایل ۳۲صفحه‌ای قابل جست‌وجو هستند؛ توده‌ی فریم بی‌عنوان نیست.',
      },
      {
        title: 'تکرارهای کنارگذاشته را نگه دارید',
        body: 'صفحات playground و warehouse تصمیم‌های وب را بدون changelog جدا خوانا می‌کنند.',
      },
      {
        title: 'ادعای Tier-1 منتشر نکنید',
        body: 'ادعاهای رهبری بازار بدون منبع مستقل روی سایت نمی‌آید. فایل طراحی برای دامنه کافی است.',
      },
    ],
  },
}

const AR: BioCopy = {
  ...EN,
  statement:
    'موقع عام ولوحة تعلّم من اليمين لليسار لماز: صفوف وامتحانات وبث ومحفظة — ملف Figma واحد مع نظام تصميم موازٍ.',
  industry: 'تعليم · كنكور (إيران)',
  team: 'مدير منتج ومصمم بدوام جزئي مع فريق هندسة بايوميز',
  heroCaption: 'سطح الصفوف في لوحة التعليم على سطح المكتب.',
  snapshot: {
    problem:
      'علامة كنكور نامية احتاجت سطحاً رقمياً متماسكاً للزائر على الويب وللطالب داخل اللوحة — دون تباعد واجهات في كل صفحة.',
    role: 'مدير منتج ومصمم عبر الموقع العام ولوحة التعلّم ونظام التصميم المشترك.',
    result:
      'أُطلقت لوحة التعلّم والموقع العام كلاهما على biomaze.ir، بتصميم في ملف واحد من 32 صفحة مع عدّة مشتركة.',
  },
  alt: {
    cover: 'لوحة تعليم بايوميز — قائمة الصفوف على سطح المكتب بالفارسية',
    classesTablet: 'لوحة تعليم بايوميز — قائمة الصفوف بعرض الجهاز اللوحي',
    login: 'لوحة تعليم بايوميز — شاشة الدخول على سطح المكتب',
    live: 'لوحة تعليم بايوميز — سطح الصف المباشر',
    wallet: 'لوحة تعليم بايوميز — المحفظة على سطح المكتب',
    examDesktop: 'لوحة تعليم بايوميز — مسار الامتحان على سطح المكتب',
    examMobile: 'لوحة تعليم بايوميز — مسار الامتحان بعرض الهاتف',
    websiteHero: 'موقع بايوميز العام — استكشاف بطل الصفحة الرئيسية',
    websiteCampaign: 'موقع بايوميز العام — صفحة هبوط حملة',
    websiteShop: 'موقع بايوميز العام — صفحة منتج المتجر',
    brand: 'شعار مجموعة ماز التعليمية',
    dsColor: 'نظام تصميم بايوميز — لوحة الألوان',
    dsButtons: 'نظام تصميم بايوميز — مصفوفة الأزرار',
    dsForms: 'نظام تصميم بايوميز — حالات حقول النماذج',
  },
  context: {
    heading: 'ماز احتاج موقعاً يُوثق به ولوحة يُعاش فيها',
    body: [
      'بايوميز / مجموعة ماز التعليمية علامة كنكور إيرانية على مستوى البلاد. الملك الحي biomaze.ir.',
      'من 2022 إلى 2025 بدوام جزئي كان العمل تصميم الموقع ولوحة التعلّم وترك نظام تصميم للمهندسين.',
    ],
    figureCaption: 'شعار الغلاف من ملف BioMaze | Design.',
  },
  problem: {
    heading: 'ثلاث مهام وعلامة واحدة بلا لغة مشتركة بعد',
    intro: 'كان على المنتج خدمة ثلاث جماهير دون أن يبدو ثلاثة منتجات:',
    bullets: [
      'زوار يكتشفون الحزم وأدوات الكنكور والحملات على الويب.',
      'طلاب يحضرون الصفوف ويمتحنون ويدفعون داخل اللوحة.',
      'مهندسون ينفّذون السطحين دون لغة أزرار لمرة واحدة.',
      'الفارسية من اليمين لليسار اتجاهاً افتراضياً.',
      'نتيجة آمنة للسيرة: شحن أسرع من عدة مشتركة لا ادعاء حصة سوق غير موثّق.',
    ],
  },
  ownership: {
    heading: 'ما ملكه التصميم',
    intro: 'إدارة منتج وتصميم بدوام جزئي على أسطح ماز الرقمية.',
    own: [
      'بنية المعلومات للموقع ولوحة التعلّم.',
      'واجهة الصفوف والامتحانات والبث والمحفظة والهوية وتجارة الحزم.',
      'إطارات متجاوبة بثلاثة عروض.',
      'ألواح نظام التصميم التي يستهلكها السطحان.',
      'الإبقاء على تكرارات playground وwarehouse مقروءة.',
    ],
    collaborate: ['تسليم هندسة biomaze.ir واللوحة.'],
    note: 'بدوام جزئي، 2022–2025. أُطلقت كل صفحات اللوحة وكل صفحات الموقع؛ الصفحة الرئيسية الحالية لـ biomaze.ir ليست من هذا العمل.',
  },
  approach: {
    heading: 'الملف هو سجل العملية',
    body: [
      'يحوي BioMaze | Design اثنتين وثلاثين صفحة. صفحات اللوحة مسماة بالنطاق.',
      'عمل الموقع يبقي playground وwarehouse بجانب main. نظام التصميم في الملف نفسه.',
    ],
    insight: 'الأقسام المسماة داخل P.Classes تجعل اللوحة قابلة للمسح.',
    processHeading: 'كيف تحرك العمل',
    steps: [
      { label: 'رسم المهام', note: 'فصل ويب الزائر عن نطاقات لوحة الطالب.' },
      { label: 'تصميم صدفة اللوحة', note: 'رأس وقائمة جانبية وتذييل وصندوق رئيسي.' },
      { label: 'ملء صفحات النطاق', note: 'صفوف وامتحانات وبث ومحفظة وهوية.' },
      { label: 'تكرار الموقع', note: 'Playground → main → warehouse.' },
      { label: 'نشر العدّة', note: 'ألوان وأزرار ونماذج للإندسة.' },
    ],
  },
  decisions: {
    heading: 'قرارات ما زال الملف يُظهرها',
    lede: 'أربعة خيارات بلا عرض عملية منفصل.',
    items: [
      {
        title: 'ملف واحد للموقع واللوحة والنظام',
        why: 'مصدر حقيقة مشترك للمهندسين والمصممين.',
        alternatives: 'مكتبة منفصلة أو تسليم Sketch.',
        tradeoff: 'ملف كبير يحتاج خريطة صفحات.',
      },
      {
        title: 'تسمية صفحات اللوحة بمهام الطالب',
        why: 'الصفوف والامتحانات والبث والمحفظة كما يفكر الطالب.',
        alternatives: 'صفحة Panel عملاقة بلا تسميات.',
        tradeoff: 'بعض الإطارات ما زالت Tilte عامة.',
      },
      {
        title: 'الإبقاء على playground وwarehouse',
        why: 'تاريخ القرار يبقى مرئياً.',
        alternatives: 'حذف الاستكشافات بعد الشحن.',
        tradeoff: 'يجب معرفة الصفحة المرجعية.',
      },
      {
        title: 'ثلاثية متجاوبة لا جوال فقط',
        why: 'تكرار الشاشات عند 1440 / 1028 / 360.',
        alternatives: 'سطح مكتب أولاً مع CSS مرن.',
        tradeoff: 'إطارات أكثر عند تغيير النمط.',
      },
    ],
  },
  solutionPanel: {
    heading: 'لوحة التعلّم',
    body: 'خمس عشرة صفحة تغطي مهمة الطالب: الصفوف والامتحانات والبث والمحفظة والهوية وغيرها.',
    bullets: [
      'P.Classes — الصفوف والتفاصيل ورفع الإشكال والتكليف.',
      'P.Exam & Test — الامتحانات والتفاصيل والبدء.',
      'P.Login & Signup — OTP وكلمة المرور.',
      'P.Live وP.Wallet وP.Basket — الحضور والمال.',
    ],
    figureCaption: 'الصفوف وتسجيل الدخول والبث والمحفظة.',
  },
  solutionWeb: {
    heading: 'الموقع العام',
    body: 'ثماني صفحات للموقع تغطي الرئيسية وأدوات الكنكور والمتجر والحملات. أُطلقت صفحات أدوات الكنكور والمتجر والجدول والحملات؛ الصفحة الرئيسية الحالية ليست من هذا العمل، لذا فالواجهة أدناه استكشاف.',
    bullets: [
      'Website | Main — الرئيسية وكنكور ونهاي والمتجر.',
      'Playground وWarehouse — استكشافات مع لقطات حية.',
      'صفحات الكنكور والمنتج والحملة والجدول.',
    ],
    figureCaption: 'بطل الرئيسية وهبوط الحملة ومنتج المتجر.',
  },
  designSystem: {
    heading: 'نظام التصميم كفصل لا دراسة منفصلة',
    body: [
      'صفحة Design System تحوي اللون والنوع والأزرار والنماذج والإطار — الإصدار 0.0.1. تحوّلت رموز التصميم إلى متغيرات Figma، لا مجرد ألواح ثابتة.',
      'BIO-02 يبقى صف أرشيف؛ هذه الدراسة هي المظلة المنشورة.',
    ],
    figureCaption: 'اللون وحالات الأزرار وحقول RTL.',
  },
  outcomes: {
    heading: 'ما يثبته الملف',
    intro: 'حقائق النطاق من مسح Figma في 2026-09-24 — لا مقاييس تسويق.',
    measured: [
      {
        label: '32 صفحة',
        context: 'الغلاف واللوحة والموقع والنظام في ملف واحد.',
        source: 'Figma REST · 2026-09-24',
      },
      {
        label: '15 صفحة لوحة',
        context: 'مهام الطالب المسماة من الصفوف إلى المحفظة.',
        source: 'فهرس صفحات BioMaze | Design',
      },
      {
        label: '8 صفحات موقع',
        context: 'Main وplayground وwarehouse وألواح الكنكور والتجارة.',
        source: 'فهرس صفحات BioMaze | Design',
      },
    ],
    delivered: {
      label: 'عدّة واحدة مشتركة',
      context: 'نظام التصميم برموز على شكل متغيرات Figma، مع صفحات الأيقونات والتلميحات.',
    },
    shipped: [
      'صفحات الموقع لأدوات الكنكور والمتجر والحملات',
      'لوحة التعلّم للصفوف والامتحانات والبث والمحفظة',
      'مسارات الهوية',
      'إطارات متجاوبة بثلاثة عروض',
      'متغيرات Figma وألواح اللون والأزرار والنماذج',
    ],
  },
  lessons: {
    heading: 'ما يعززه هذا العمل',
    items: [
      {
        title: 'سمِّ الصفحات بالمهام',
        body: 'P.Classes وP.Exam قابلتان للبحث في ملف من 32 صفحة.',
      },
      {
        title: 'أبقِ التكرارات المستبعدة',
        body: 'playground وwarehouse تجعل قرارات الموقع مقروءة.',
      },
      {
        title: 'لا تنشر ادعاءات المستوى الأول',
        body: 'عبارات ريادة السوق غير الموثّقة تبقى خارج الموقع بلا مصدر مستقل. ملف التصميم يكفي لإثبات النطاق.',
      },
    ],
  },
}

const ES: BioCopy = {
  ...EN,
  statement:
    'Sitio público y panel RTL de Maz: clases, exámenes, clase en vivo y monedero — un archivo Figma con el design system en paralelo.',
  industry: 'Edtech · educación Konkur (Irán)',
  team: 'Product manager y diseñador a tiempo parcial con el equipo de ingeniería de Biomaze',
  heroCaption: 'La superficie de clases del panel en escritorio.',
  snapshot: {
    problem:
      'Una marca Konkur en crecimiento necesitaba una superficie digital coherente para prospectos en la web y alumnos en el panel.',
    role: 'Product manager y diseñador del sitio público, el panel de aprendizaje y el design system compartido.',
    result:
      'El panel de aprendizaje y la web pública salieron en vivo en biomaze.ir, diseñados en un archivo de 32 páginas con un kit compartido.',
  },
  alt: {
    cover: 'Panel Biomaze — lista de clases en escritorio en persa',
    classesTablet: 'Panel Biomaze — lista de clases en ancho tableta',
    login: 'Panel Biomaze — inicio de sesión en escritorio',
    live: 'Panel Biomaze — clase en vivo en escritorio',
    wallet: 'Panel Biomaze — monedero en escritorio',
    examDesktop: 'Panel Biomaze — flujo de examen en escritorio',
    examMobile: 'Panel Biomaze — flujo de examen en móvil',
    websiteHero: 'Web Biomaze — exploración del héroe de inicio',
    websiteCampaign: 'Web Biomaze — landing de campaña',
    websiteShop: 'Web Biomaze — página de producto de tienda',
    brand: 'Marca del grupo educativo Maz',
    dsColor: 'Design system Biomaze — tablero de color',
    dsButtons: 'Design system Biomaze — matriz de botones',
    dsForms: 'Design system Biomaze — estados de formularios RTL',
  },
  context: {
    heading: 'Maz necesitaba un sitio de confianza y un panel habitable',
    body: [
      'Biomaze / grupo educativo Maz es una marca Konkur iraní de alcance nacional. La propiedad en vivo es biomaze.ir.',
      'De 2022 a 2025, a tiempo parcial, el encargo fue diseñar el sitio y el panel, y dejar un design system para ingeniería.',
    ],
    figureCaption: 'Marca de la portada de BioMaze | Design.',
  },
  problem: {
    heading: 'Tres trabajos, una marca, aún sin lenguaje compartido',
    intro: 'El producto debía servir a tres audiencias sin parecer tres productos:',
    bullets: [
      'Prospectos que descubren paquetes, herramientas Konkur y campañas en la web.',
      'Alumnos que asisten a clase, examinan y pagan dentro del panel.',
      'Ingenieros que implementan ambas superficies sin un lenguaje de botón desechable.',
      'Persa RTL como dirección por defecto.',
      'Resultado seguro para el currículum: enviar más rápido desde un kit compartido, no una cuota de mercado no verificada.',
    ],
  },
  ownership: {
    heading: 'Qué poseía el diseño',
    intro: 'Product management y diseño a tiempo parcial en las superficies digitales de Maz.',
    own: [
      'Arquitectura de información del sitio y del panel.',
      'UI de clases, exámenes, vivo, monedero, auth y comercio de paquetes.',
      'Marcos responsive en tres anchos.',
      'Tableros del design system consumidos por ambas superficies.',
      'Mantener legibles playground y warehouse junto a main.',
    ],
    collaborate: ['Entrega de ingeniería de biomaze.ir y el panel.'],
    note: 'A tiempo parcial, 2022–2025. Todas las páginas del panel y de la web salieron en vivo; la página de inicio actual de biomaze.ir no es parte de este trabajo.',
  },
  approach: {
    heading: 'El archivo es el registro del proceso',
    body: [
      'BioMaze | Design tiene treinta y dos páginas. Las del panel se nombran por dominio.',
      'El trabajo web conserva playground y warehouse junto a main. El design system vive en el mismo archivo.',
    ],
    insight: 'Las secciones nombradas dentro de P.Classes hacen el panel rastreable.',
    processHeading: 'Cómo avanzó el trabajo',
    steps: [
      { label: 'Mapear los trabajos', note: 'Separar web de prospecto y dominios del panel.' },
      { label: 'Diseñar el shell', note: 'Cabecera, menú lateral, pie y caja principal.' },
      { label: 'Rellenar dominios', note: 'Clases, exámenes, vivo, monedero, auth.' },
      { label: 'Iterar el sitio', note: 'Playground → main → warehouse.' },
      { label: 'Publicar el kit', note: 'Color, botones y formularios para ingeniería.' },
    ],
  },
  decisions: {
    heading: 'Decisiones que el archivo aún muestra',
    lede: 'Cuatro elecciones visibles sin un deck de proceso aparte.',
    items: [
      {
        title: 'Un archivo para web, panel y sistema',
        why: 'Una sola fuente de verdad para diseño e ingeniería.',
        alternatives: 'Librería separada o entrega en Sketch.',
        tradeoff: 'Archivo grande que necesita un mapa de páginas.',
      },
      {
        title: 'Páginas del panel nombradas por trabajo del alumno',
        why: 'Clases, exámenes, vivo y monedero coinciden con cómo piensa el alumno.',
        alternatives: 'Una mega página Panel sin etiquetas.',
        tradeoff: 'Algunos marcos siguen llamándose Tilte.',
      },
      {
        title: 'Conservar playground y warehouse',
        why: 'La historia de decisión permanece visible.',
        alternatives: 'Borrar exploraciones al publicar el home.',
        tradeoff: 'Hay que saber cuál página es canónica.',
      },
      {
        title: 'Ternas responsive, no solo móvil',
        why: 'Pantallas clave a 1440 / 1028 / 360.',
        alternatives: 'Solo escritorio con CSS fluido.',
        tradeoff: 'Más marcos cuando cambia un patrón.',
      },
    ],
  },
  solutionPanel: {
    heading: 'El panel de aprendizaje',
    body: 'Quince páginas cubren el trabajo del alumno: clases, exámenes, vivo, monedero, auth y más.',
    bullets: [
      'P.Classes — clases, detalle, Q&A y deberes.',
      'P.Exam & Test — exámenes, detalle e inicio.',
      'P.Login & Signup — OTP y contraseña.',
      'P.Live, P.Wallet, P.Basket — asistencia y dinero.',
    ],
    figureCaption: 'Clases, login, clase en vivo y monedero.',
  },
  solutionWeb: {
    heading: 'El sitio público',
    body: 'Ocho páginas web cubren inicio, Konkur, tienda y campañas. Las páginas de Konkur, tienda, calendario y campañas salieron en vivo; el inicio actual no es parte de este trabajo, así que el héroe de abajo es una exploración.',
    bullets: [
      'Website | Main — Home, Konkoor, Nahai y Shop.',
      'Playground y Warehouse — exploraciones con capturas en vivo.',
      'Páginas Konkur, producto, campaña y horario.',
    ],
    figureCaption: 'Héroe de inicio, landing de campaña y producto de tienda.',
  },
  designSystem: {
    heading: 'Design system como capítulo, no como caso aparte',
    body: [
      'La página Design System guarda color, tipografía, botones, formularios y chrome — versión 0.0.1. Sus tokens se convirtieron en variables de Figma, no solo tableros estáticos.',
      'BIO-02 sigue siendo fila de archivo; este caso es el paraguas publicado.',
    ],
    figureCaption: 'Color, estados de botón y campos RTL.',
  },
  outcomes: {
    heading: 'Lo que prueba el archivo',
    intro: 'Hechos de alcance del escaneo Figma del 2026-09-24 — no métricas de marketing.',
    measured: [
      {
        label: '32 páginas',
        context: 'Portada, panel, web y sistema en un archivo.',
        source: 'Figma REST · 2026-09-24',
      },
      {
        label: '15 páginas de panel',
        context: 'Trabajos del alumno desde clases hasta monedero.',
        source: 'Índice de páginas BioMaze | Design',
      },
      {
        label: '8 páginas web',
        context: 'Main, playground, warehouse y tableros Konkur/comercio.',
        source: 'Índice de páginas BioMaze | Design',
      },
    ],
    delivered: {
      label: '1 kit compartido',
      context: 'Design System con sus tokens como variables de Figma, más iconos y tooltips.',
    },
    shipped: [
      'Páginas web de Konkur, tienda y campañas',
      'Panel de clases, exámenes, vivo y monedero',
      'Flujos de autenticación',
      'Marcos responsive a tres anchos',
      'Variables de Figma y tableros de color, botón y formulario',
    ],
  },
  lessons: {
    heading: 'Qué refuerza este trabajo',
    items: [
      {
        title: 'Nombra las páginas por trabajos',
        body: 'P.Classes y P.Exam son buscables en un archivo de 32 páginas.',
      },
      {
        title: 'Conserva las iteraciones descartadas',
        body: 'Playground y warehouse hacen legibles las decisiones del sitio.',
      },
      {
        title: 'No publiques afirmaciones Tier-1',
        body: 'Las líneas de liderazgo de mercado sin fuente independiente no salen al sitio. El archivo de diseño ya prueba el alcance.',
      },
    ],
  },
}

const DE: BioCopy = {
  ...EN,
  statement:
    'Öffentliche Website und RTL-Lernpanel für Maz: Kurse, Prüfungen, Live-Klasse und Wallet — eine Figma-Datei mit parallel gebautem Design-System.',
  industry: 'Edtech · Konkur-Bildung (Iran)',
  team: 'Product Manager & Designer in Teilzeit mit Biomazes Engineering-Team',
  heroCaption: 'Die Kursfläche des Panels auf dem Desktop.',
  snapshot: {
    problem:
      'Eine wachsende Konkur-Marke brauchte eine kohärente digitale Fläche für Interessenten im Web und Schüler im Panel.',
    role: 'Product Manager & Designer für Website, Lernpanel und gemeinsames Design-System.',
    result:
      'Lernpanel und öffentliche Website gingen beide auf biomaze.ir live, gestaltet in einer 32-Seiten-Datei mit gemeinsamem Kit.',
  },
  alt: {
    cover: 'Biomaze-Panel — Kursliste auf dem Desktop auf Persisch',
    classesTablet: 'Biomaze-Panel — Kursliste in Tablet-Breite',
    login: 'Biomaze-Panel — Login auf dem Desktop',
    live: 'Biomaze-Panel — Live-Klasse auf dem Desktop',
    wallet: 'Biomaze-Panel — Wallet auf dem Desktop',
    examDesktop: 'Biomaze-Panel — Prüfungsfluss auf dem Desktop',
    examMobile: 'Biomaze-Panel — Prüfungsfluss auf dem Handy',
    websiteHero: 'Biomaze-Website — Home-Hero-Exploration',
    websiteCampaign: 'Biomaze-Website — Kampagnen-Landing',
    websiteShop: 'Biomaze-Website — Shop-Produktseite',
    brand: 'Markenzeichen der Bildungsgruppe Maz',
    dsColor: 'Biomaze-Design-System — Farbboard',
    dsButtons: 'Biomaze-Design-System — Button-Matrix',
    dsForms: 'Biomaze-Design-System — RTL-Formularzustände',
  },
  context: {
    heading: 'Maz brauchte eine vertrauenswürdige Site und ein bewohnbares Panel',
    body: [
      'Biomaze / Bildungsgruppe Maz ist eine landesweite iranische Konkur-Marke. Die Live-Präsenz ist biomaze.ir.',
      'Von 2022 bis 2025 ging es in Teilzeit um Website und Lernpanel sowie ein Design-System für die Entwicklung.',
    ],
    figureCaption: 'Markenzeichen von der Cover-Seite in BioMaze | Design.',
  },
  problem: {
    heading: 'Drei Jobs, eine Marke, noch ohne gemeinsame Sprache',
    intro: 'Das Produkt musste drei Zielgruppen bedienen, ohne wie drei Produkte zu wirken:',
    bullets: [
      'Interessenten, die Pakete, Konkur-Tools und Kampagnen im Web entdecken.',
      'Schüler, die im Panel Kurse besuchen, prüfen und zahlen.',
      'Ingenieure, die beide Flächen ohne Einmal-Button-Sprache umsetzen.',
      'Persisch RTL als Standardleserichtung.',
      'Lebenslauf-sicheres Ergebnis: schneller ausliefern aus einem gemeinsamen Kit, kein unverifizierter Marktanteil.',
    ],
  },
  ownership: {
    heading: 'Was das Design besaß',
    intro: 'Teilzeit-Produktmanagement und Design an Maz’ digitalen Flächen.',
    own: [
      'Informationsarchitektur von Website und Panel.',
      'UI für Kurse, Prüfungen, Live, Wallet, Auth und Pakethandel.',
      'Responsive Frames in drei Breiten.',
      'Design-System-Boards für beide Flächen.',
      'Playground- und Warehouse-Iterationen lesbar neben main halten.',
    ],
    collaborate: ['Engineering-Lieferung von biomaze.ir und Panel.'],
    note: 'Teilzeit, 2022–2025. Alle Panel- und Website-Seiten gingen live; die heutige Startseite von biomaze.ir gehört nicht zu dieser Arbeit.',
  },
  approach: {
    heading: 'Die Datei ist das Prozessprotokoll',
    body: [
      'BioMaze | Design hat zweiunddreißig Seiten. Panel-Seiten sind nach Domäne benannt.',
      'Website-Arbeit behält Playground und Warehouse neben main. Das Design-System liegt in derselben Datei.',
    ],
    insight: 'Benannte Abschnitte in P.Classes machen das Panel durchsuchbar.',
    processHeading: 'Wie die Arbeit lief',
    steps: [
      { label: 'Jobs kartieren', note: 'Web für Interessenten von Panel-Domänen trennen.' },
      { label: 'Panel-Shell gestalten', note: 'Header, Seitenmenü, Footer, Main Box.' },
      { label: 'Domänen füllen', note: 'Kurse, Prüfungen, Live, Wallet, Auth.' },
      { label: 'Website iterieren', note: 'Playground → main → warehouse.' },
      { label: 'Kit veröffentlichen', note: 'Farbe, Buttons, Formulare für Engineering.' },
    ],
  },
  decisions: {
    heading: 'Entscheidungen, die die Datei noch zeigt',
    lede: 'Vier Wahlentscheidungen ohne separates Prozessdeck.',
    items: [
      {
        title: 'Eine Datei für Web, Panel und System',
        why: 'Eine gemeinsame Wahrheitsquelle für Design und Engineering.',
        alternatives: 'Separate Library oder Sketch-Übergabe.',
        tradeoff: 'Große Datei, die eine Seitenkarte braucht.',
      },
      {
        title: 'Panel-Seiten nach Schülerjob benennen',
        why: 'Kurse, Prüfungen, Live und Wallet entsprechen dem Denken der Schüler.',
        alternatives: 'Eine Mega-Panel-Seite ohne Labels.',
        tradeoff: 'Einige Frames heißen noch Tilte.',
      },
      {
        title: 'Playground und Warehouse behalten',
        why: 'Entscheidungshistorie bleibt sichtbar.',
        alternatives: 'Explorationen nach dem Home-Ship löschen.',
        tradeoff: 'Man muss die kanonische Seite kennen.',
      },
      {
        title: 'Responsive Dreier, nicht nur Mobile',
        why: 'Schlüssel-Screens bei 1440 / 1028 / 360.',
        alternatives: 'Nur Desktop mit fluidem CSS.',
        tradeoff: 'Mehr Frames bei Pattern-Änderungen.',
      },
    ],
  },
  solutionPanel: {
    heading: 'Das Lernpanel',
    body: 'Fünfzehn Panel-Seiten decken den Schülerjob ab: Kurse, Prüfungen, Live, Wallet, Auth und mehr.',
    bullets: [
      'P.Classes — Kurse, Detail, Q&A und Hausaufgaben.',
      'P.Exam & Test — Prüfungen, Detail und Start.',
      'P.Login & Signup — OTP und Passwort.',
      'P.Live, P.Wallet, P.Basket — Anwesenheit und Geld.',
    ],
    figureCaption: 'Kurse, Login, Live-Klasse und Wallet.',
  },
  solutionWeb: {
    heading: 'Die öffentliche Website',
    body: 'Acht Website-Seiten decken Home, Konkur, Shop und Kampagnen ab. Konkur-, Shop-, Termin- und Kampagnenseiten gingen live; die heutige Startseite gehört nicht zu dieser Arbeit, der Hero unten ist daher eine Exploration.',
    bullets: [
      'Website | Main — Home, Konkoor, Nahai und Shop.',
      'Playground und Warehouse — Explorationen mit Live-Captures.',
      'Konkur-, Produkt-, Kampagnen- und Stundenplan-Seiten.',
    ],
    figureCaption: 'Home-Hero, Kampagnen-Landing und Shop-Produkt.',
  },
  designSystem: {
    heading: 'Design-System als Kapitel, nicht als eigene Case Study',
    body: [
      'Die Design-System-Seite hält Farbe, Typo, Buttons, Formulare und Chrome — Version 0.0.1. Die Tokens wurden zu Figma-Variablen, nicht nur statische Boards.',
      'BIO-02 bleibt Archivzeile; diese Case Study ist der veröffentlichte Schirm.',
    ],
    figureCaption: 'Farbe, Button-Zustände und RTL-Felder.',
  },
  outcomes: {
    heading: 'Was die Datei belegt',
    intro: 'Umfangsfakten aus dem Figma-Scan vom 2026-09-24 — keine Marketing-Metriken.',
    measured: [
      {
        label: '32 Seiten',
        context: 'Cover, Panel, Web und System in einer Datei.',
        source: 'Figma REST · 2026-09-24',
      },
      {
        label: '15 Panel-Seiten',
        context: 'Benannte Schülerjobs von Kursen bis Wallet.',
        source: 'BioMaze | Design Seitenindex',
      },
      {
        label: '8 Website-Seiten',
        context: 'Main, Playground, Warehouse und Konkur-/Commerce-Boards.',
        source: 'BioMaze | Design Seitenindex',
      },
    ],
    delivered: {
      label: '1 gemeinsames Kit',
      context: 'Design-System mit Tokens als Figma-Variablen, plus Icon- und Tooltip-Seiten.',
    },
    shipped: [
      'Website-Seiten für Konkur, Shop und Kampagnen',
      'Lernpanel für Kurse, Prüfungen, Live und Wallet',
      'Auth-Flows',
      'Responsive Panel-Frames in drei Breiten',
      'Figma-Variablen plus Farb-, Button- und Formular-Boards',
    ],
  },
  lessons: {
    heading: 'Was diese Arbeit verstärkt',
    items: [
      {
        title: 'Seiten nach Jobs benennen',
        body: 'P.Classes und P.Exam sind in einer 32-Seiten-Datei auffindbar.',
      },
      {
        title: 'Verworfene Iterationen behalten',
        body: 'Playground und Warehouse machen Website-Entscheidungen lesbar.',
      },
      {
        title: 'Keine Tier-1-Claims veröffentlichen',
        body: 'Unverifizierte Marktführerschafts-Zeilen bleiben ohne unabhängige Quelle von der Site. Die Designdatei belegt den Umfang bereits.',
      },
    ],
  },
}

const FR: BioCopy = {
  ...EN,
  statement:
    'Site public et panneau RTL de Maz : cours, examens, classe en direct et portefeuille — un fichier Figma avec le design system en parallèle.',
  industry: 'Edtech · éducation Konkur (Iran)',
  team: 'Product manager et designer à temps partiel avec l’équipe d’ingénierie de Biomaze',
  heroCaption: 'La surface des cours du panneau sur ordinateur.',
  snapshot: {
    problem:
      'Une marque Konkur en croissance avait besoin d’une surface numérique cohérente pour les prospects sur le web et les élèves dans le panneau.',
    role: 'Product manager et designer du site public, du panneau d’apprentissage et du design system partagé.',
    result:
      'Le panneau d’apprentissage et le site public ont été mis en ligne sur biomaze.ir, conçus dans un seul fichier de 32 pages avec un kit partagé.',
  },
  alt: {
    cover: 'Panneau Biomaze — liste des cours sur bureau en persan',
    classesTablet: 'Panneau Biomaze — liste des cours en largeur tablette',
    login: 'Panneau Biomaze — connexion sur bureau',
    live: 'Panneau Biomaze — classe en direct sur bureau',
    wallet: 'Panneau Biomaze — portefeuille sur bureau',
    examDesktop: 'Panneau Biomaze — parcours d’examen sur bureau',
    examMobile: 'Panneau Biomaze — parcours d’examen sur mobile',
    websiteHero: 'Site Biomaze — exploration du héros d’accueil',
    websiteCampaign: 'Site Biomaze — landing de campagne',
    websiteShop: 'Site Biomaze — page produit boutique',
    brand: 'Marque du groupe éducatif Maz',
    dsColor: 'Design system Biomaze — planche couleur',
    dsButtons: 'Design system Biomaze — matrice de boutons',
    dsForms: 'Design system Biomaze — états de champs RTL',
  },
  context: {
    heading: 'Maz avait besoin d’un site de confiance et d’un panneau habitable',
    body: [
      'Biomaze / groupe éducatif Maz est une marque Konkur iranienne nationale. La propriété live est biomaze.ir.',
      'De 2022 à 2025, à temps partiel, le brief était de concevoir le site et le panneau, et de laisser un design system à l’ingénierie.',
    ],
    figureCaption: 'Marque de la page Cover de BioMaze | Design.',
  },
  problem: {
    heading: 'Trois jobs, une marque, pas encore de langage partagé',
    intro: 'Le produit devait servir trois audiences sans ressembler à trois produits :',
    bullets: [
      'Des prospects qui découvrent forfaits, outils Konkur et campagnes sur le web.',
      'Des élèves qui suivent les cours, passent les examens et paient dans le panneau.',
      'Des ingénieurs qui livrent les deux surfaces sans langage de bouton jetable.',
      'Le persan RTL comme sens de lecture par défaut.',
      'Résultat sûr pour le CV : livrer plus vite depuis un kit partagé, pas une part de marché non vérifiée.',
    ],
  },
  ownership: {
    heading: 'Ce que le design possédait',
    intro: 'Product management et design à temps partiel sur les surfaces numériques de Maz.',
    own: [
      'Architecture d’information du site et du panneau.',
      'UI des cours, examens, live, portefeuille, auth et commerce de forfaits.',
      'Cadres responsive sur trois largeurs.',
      'Planches du design system consommées par les deux surfaces.',
      'Garder playground et warehouse lisibles à côté de main.',
    ],
    collaborate: ['Livraison ingénierie de biomaze.ir et du panneau.'],
    note: 'Temps partiel, 2022–2025. Toutes les pages du panneau et du site ont été mises en ligne ; la page d’accueil actuelle de biomaze.ir ne fait pas partie de ce travail.',
  },
  approach: {
    heading: 'Le fichier est le registre du process',
    body: [
      'BioMaze | Design compte trente-deux pages. Les pages panneau sont nommées par domaine.',
      'Le travail web conserve playground et warehouse à côté de main. Le design system vit dans le même fichier.',
    ],
    insight: 'Les sections nommées dans P.Classes rendent le panneau parcourable.',
    processHeading: 'Comment le travail a avancé',
    steps: [
      { label: 'Cartographier les jobs', note: 'Séparer le web prospect des domaines panneau.' },
      { label: 'Concevoir le shell', note: 'En-tête, menu latéral, pied et boîte principale.' },
      { label: 'Remplir les domaines', note: 'Cours, examens, live, portefeuille, auth.' },
      { label: 'Itérer le site', note: 'Playground → main → warehouse.' },
      { label: 'Publier le kit', note: 'Couleur, boutons, formulaires pour l’ingénierie.' },
    ],
  },
  decisions: {
    heading: 'Décisions que le fichier montre encore',
    lede: 'Quatre choix visibles sans deck de process séparé.',
    items: [
      {
        title: 'Un fichier pour site, panneau et système',
        why: 'Une seule source de vérité pour design et ingénierie.',
        alternatives: 'Bibliothèque séparée ou handoff Sketch.',
        tradeoff: 'Gros fichier qui demande une carte des pages.',
      },
      {
        title: 'Pages panneau nommées d’après le job élève',
        why: 'Cours, examens, live et portefeuille collent à la façon dont l’élève pense.',
        alternatives: 'Une méga page Panel sans labels.',
        tradeoff: 'Certains cadres s’appellent encore Tilte.',
      },
      {
        title: 'Garder playground et warehouse',
        why: 'L’historique de décision reste visible.',
        alternatives: 'Supprimer les explorations une fois l’accueil livré.',
        tradeoff: 'Il faut savoir quelle page est canonique.',
      },
      {
        title: 'Triplets responsive, pas mobile seul',
        why: 'Écrans clés à 1440 / 1028 / 360.',
        alternatives: 'Bureau seul avec CSS fluide.',
        tradeoff: 'Plus de cadres quand un pattern change.',
      },
    ],
  },
  solutionPanel: {
    heading: 'Le panneau d’apprentissage',
    body: 'Quinze pages couvrent le job élève : cours, examens, live, portefeuille, auth et plus.',
    bullets: [
      'P.Classes — cours, détail, Q&R et devoirs.',
      'P.Exam & Test — examens, détail et démarrage.',
      'P.Login & Signup — OTP et mot de passe.',
      'P.Live, P.Wallet, P.Basket — présence et argent.',
    ],
    figureCaption: 'Cours, connexion, classe en direct et portefeuille.',
  },
  solutionWeb: {
    heading: 'Le site public',
    body: 'Huit pages web couvrent l’accueil, Konkur, la boutique et les campagnes. Les pages Konkur, boutique, planning et campagnes ont été mises en ligne ; l’accueil actuel ne fait pas partie de ce travail, le hero ci-dessous est donc une exploration.',
    bullets: [
      'Website | Main — Home, Konkoor, Nahai et Shop.',
      'Playground et Warehouse — explorations avec captures live.',
      'Pages Konkur, produit, campagne et emploi du temps.',
    ],
    figureCaption: 'Héros d’accueil, landing campagne et produit boutique.',
  },
  designSystem: {
    heading: 'Design system comme chapitre, pas comme étude séparée',
    body: [
      'La page Design System tient couleur, type, boutons, formulaires et chrome — version 0.0.1. Ses tokens sont devenus des variables Figma, pas seulement des planches statiques.',
      'BIO-02 reste une ligne d’archive ; cette étude est le parapluie publié.',
    ],
    figureCaption: 'Couleur, états de bouton et champs RTL.',
  },
  outcomes: {
    heading: 'Ce que le fichier prouve',
    intro: 'Faits de périmètre du scan Figma du 2026-09-24 — pas de métriques marketing.',
    measured: [
      {
        label: '32 pages',
        context: 'Cover, panneau, site et système dans un fichier.',
        source: 'Figma REST · 2026-09-24',
      },
      {
        label: '15 pages panneau',
        context: 'Jobs élève nommés des cours au portefeuille.',
        source: 'Index des pages BioMaze | Design',
      },
      {
        label: '8 pages site',
        context: 'Main, playground, warehouse et planches Konkur/commerce.',
        source: 'Index des pages BioMaze | Design',
      },
    ],
    delivered: {
      label: '1 kit partagé',
      context: 'Design system avec ses tokens en variables Figma, plus icônes et tooltips.',
    },
    shipped: [
      'Pages du site pour Konkur, boutique et campagnes',
      'Panneau pour cours, examens, live et portefeuille',
      'Parcours d’authentification',
      'Cadres responsive sur trois largeurs',
      'Variables Figma et planches couleur, bouton et formulaire',
    ],
  },
  lessons: {
    heading: 'Ce que ce travail renforce',
    items: [
      {
        title: 'Nommer les pages d’après les jobs',
        body: 'P.Classes et P.Exam sont trouvables dans un fichier de 32 pages.',
      },
      {
        title: 'Garder les itérations écartées',
        body: 'Playground et warehouse rendent lisibles les décisions du site.',
      },
      {
        title: 'Ne pas publier d’affirmations Tier-1',
        body: 'Les lignes de leadership de marché non vérifiées restent hors site sans source indépendante. Le fichier de design prouve déjà le périmètre.',
      },
    ],
  },
}

const JA: BioCopy = {
  ...EN,
  statement:
    'Mazの公開サイトとRTL学習パネル。授業・試験・ライブ・ウォレットを、デザインシステムと並行した1つのFigmaファイルで設計した。',
  industry: 'エドテック · コンクール教育（イラン）',
  team: 'プロダクトマネージャー／デザイナー（パートタイム）、Biomazeのエンジニアリングチームと連携',
  heroCaption: '教育パネルの授業一覧。デスクトップ。',
  snapshot: {
    problem:
      '成長中のコンクールブランドには、Webの見込み客とパネル内の生徒をつなぐ一貫したデジタル面が必要だった。',
    role: '公開サイト、学習パネル、共有デザインシステムを担うプロダクトマネージャー／デザイナー。',
    result:
      '学習パネルと公開サイトはともに biomaze.ir で公開された。設計は共有キットを持つ32ページのファイル1つで行った。',
  },
  alt: {
    cover: 'Biomaze教育パネル — デスクトップの授業一覧（ペルシア語）',
    classesTablet: 'Biomaze教育パネル — タブレット幅の授業一覧',
    login: 'Biomaze教育パネル — デスクトップのログイン',
    live: 'Biomaze教育パネル — デスクトップのライブ授業',
    wallet: 'Biomaze教育パネル — デスクトップのウォレット',
    examDesktop: 'Biomaze教育パネル — デスクトップの試験フロー',
    examMobile: 'Biomaze教育パネル — モバイル幅の試験フロー',
    websiteHero: 'Biomaze公開サイト — ホームヒーローの探索',
    websiteCampaign: 'Biomaze公開サイト — キャンペーンランディング',
    websiteShop: 'Biomaze公開サイト — ショップの商品ページ',
    brand: 'Maz教育グループのマーク',
    dsColor: 'Biomazeデザインシステム — カラーボード',
    dsButtons: 'Biomazeデザインシステム — ボタン行列',
    dsForms: 'Biomazeデザインシステム — RTLフォーム状態',
  },
  context: {
    heading: 'Mazには信頼できるサイトと、生活できるパネルが必要だった',
    body: [
      'Biomaze／教育グループMazはイラン全国のコンクール教育ブランド。ライブのプロパティは biomaze.ir。',
      '2022年から2025年までパートタイムで担った課題は、公開サイトと学習パネルを設計し、エンジニアが両面を出荷できるデザインシステムを残すことだった。',
    ],
    figureCaption: 'BioMaze | Design のカバーにあるブランドマーク。',
  },
  problem: {
    heading: '3つの仕事、1つのブランド、まだ共有言語がない',
    intro: '3つの聴衆を、3製品に見せずに支える必要があった。',
    bullets: [
      'Webでパッケージやコンクール道具、キャンペーンを探す見込み客。',
      'パネルで授業・試験・提出・支払をする生徒。',
      '使い捨てボタン言語なしで両面を実装するエンジニア。',
      '既定の読み方向としてのRTLペルシア語。',
      '履歴書に安全な結果：共有キットからの速い出荷。未検証の市場シェア主張はしない。',
    ],
  },
  ownership: {
    heading: 'デザインが担った範囲',
    intro: 'Mazのデジタル面におけるパートタイムのPMとデザイン。',
    own: [
      '公開サイトと学習パネルの情報設計。',
      '授業・試験・ライブ・ウォレット・認証・パッケージ販売のUI。',
      '3幅のレスポンシブフレーム。',
      '両面が消費するデザインシステムボード。',
      'playground と warehouse を main の隣で読める状態に保つこと。',
    ],
    collaborate: ['biomaze.ir とパネルのエンジニアリング納品。'],
    note: 'パートタイム、2022〜2025年。パネルとWebサイトの全ページが公開された。現在の biomaze.ir のホームページはこの仕事ではない。',
  },
  approach: {
    heading: 'ファイルそのものがプロセス記録',
    body: [
      'BioMaze | Design は32ページ。パネルページは領域名で整理されている。',
      'Web作業は playground と warehouse を main の隣に残す。デザインシステムも同じファイルにある。',
    ],
    insight: 'P.Classes 内の名前付きセクションが、パネルを走査可能にする。',
    processHeading: '仕事の進め方',
    steps: [
      { label: '仕事を地図化する', note: '見込み客Webと生徒パネル領域を分ける。' },
      { label: 'パネルシェルを設計', note: 'ヘッダー、サイドメニュー、フッター、メインボックス。' },
      { label: '領域ページを埋める', note: '授業、試験、ライブ、ウォレット、認証。' },
      { label: '公開サイトを反復', note: 'Playground → main → warehouse。' },
      { label: 'キットを公開', note: 'カラー、ボタン、フォームをエンジニアへ。' },
    ],
  },
  decisions: {
    heading: 'ファイルが今も示す判断',
    lede: '別プロセスデッキなしで見える4つの選択。',
    items: [
      {
        title: 'Web・パネル・システムを1ファイルに',
        why: 'デザインとエンジニアリングの単一の真実源。',
        alternatives: '別ライブラリや Sketch 引き渡し。',
        tradeoff: 'ページ地図が必要な大きなファイル。',
      },
      {
        title: 'パネルページを生徒の仕事名で呼ぶ',
        why: '授業・試験・ライブ・ウォレットは生徒の思考に合う。',
        alternatives: 'ラベルなしの巨大 Panel ページ。',
        tradeoff: '一部フレームはまだ Tilte。',
      },
      {
        title: 'playground と warehouse を残す',
        why: '判断の履歴が見える。',
        alternatives: 'ホーム出荷後に探索を削除。',
        tradeoff: 'どのページが正かが必要。',
      },
      {
        title: 'モバイルだけではなくレスポンシブ三つ組',
        why: '主要画面を 1440 / 1028 / 360 で繰り返す。',
        alternatives: '流動CSS前提のデスクトップのみ。',
        tradeoff: 'パターン変更時のフレームが増える。',
      },
    ],
  },
  solutionPanel: {
    heading: '学習パネル',
    body: '15のパネルページが生徒の仕事を覆う。授業、試験、ライブ、ウォレット、認証など。',
    bullets: [
      'P.Classes — 授業、詳細、質問、課題。',
      'P.Exam & Test — 試験、詳細、開始。',
      'P.Login & Signup — OTP とパスワード。',
      'P.Live、P.Wallet、P.Basket — 出席と金銭。',
    ],
    figureCaption: '授業、ログイン、ライブ授業、ウォレット。',
  },
  solutionWeb: {
    heading: '公開ウェブサイト',
    body: '8つのWebページがホーム、コンクール、ショップ、キャンペーンを覆う。コンクール、ショップ、スケジュール、キャンペーンのページは公開された。現在のホームはこの仕事ではないため、下のヒーローは探索案として示す。',
    bullets: [
      'Website | Main — Home、Konkoor、Nahai、Shop。',
      'Playground と Warehouse — ライブキャプチャ付きの探索。',
      'コンクール、商品、キャンペーン、スケジュールのページ。',
    ],
    figureCaption: 'ホームヒーロー、キャンペーンLP、ショップ商品。',
  },
  designSystem: {
    heading: '別ケースではなく章としてのデザインシステム',
    body: [
      'Design System ページはカラー、タイプ、ボタン、フォーム、クロムを持つ — バージョン 0.0.1。トークンは静的なボードにとどまらず、Figma変数になった。',
      'BIO-02 はアーカイブ行のまま。このケースが公開された傘になる。',
    ],
    figureCaption: 'カラー、ボタン状態、RTLフォーム。',
  },
  outcomes: {
    heading: 'ファイルが証明すること',
    intro: '2026-09-24 の Figma スキャンによる範囲事実 — マーケ指標ではない。',
    measured: [
      {
        label: '32ページ',
        context: 'カバー、パネル、Web、システムが1ファイル。',
        source: 'Figma REST · 2026-09-24',
      },
      {
        label: '15のパネルページ',
        context: '授業からウォレットまでの名前付き生徒ジョブ。',
        source: 'BioMaze | Design ページ一覧',
      },
      {
        label: '8のWebページ',
        context: 'Main、playground、warehouse とコンクール／商用ボード。',
        source: 'BioMaze | Design ページ一覧',
      },
    ],
    delivered: {
      label: '共有キット1つ',
      context: 'トークンをFigma変数として持つデザインシステムと、アイコン／ツールチップページ。',
    },
    shipped: [
      'コンクール・ショップ・キャンペーンのWebページ',
      '授業・試験・ライブ・ウォレットの学習パネル',
      '認証フロー',
      '3幅のレスポンシブパネルフレーム',
      'Figma変数とカラー・ボタン・フォームボード',
    ],
  },
  lessons: {
    heading: 'この仕事が強めること',
    items: [
      {
        title: 'ページを仕事名で呼ぶ',
        body: '32ページのファイルでも P.Classes と P.Exam は探せる。',
      },
      {
        title: '捨てた反復を残す',
        body: 'playground と warehouse がサイト判断を読めるようにする。',
      },
      {
        title: 'Tier-1 主張を公開しない',
        body: '独立ソースのない市場リーダー主張はサイトに出さない。デザインファイルがすでに範囲の証拠になる。',
      },
    ],
  },
}

const COPY: Record<Locale, BioCopy> = { en: EN, fa: FA, ar: AR, es: ES, de: DE, fr: FR, ja: JA }

export const BIO_MEDIA = Object.fromEntries(
  (Object.keys(MEDIA_FILES) as BioMediaKey[]).map((key) => [
    key,
    {
      ...MEDIA_FILES[key],
      alt: Object.fromEntries(LOCALES.map((locale) => [locale, COPY[locale].alt[key]])),
    },
  ]),
) as Record<BioMediaKey, MediaSpec>

const PROCESS_CODES: Five = ['MAP', 'HUD', 'DOM', 'WEB', 'KIT']
const MEASURED_VALUES: Three = ['32', '15', '8']

export function bioSections(locale: Locale, media: BioMediaIds): Sections {
  const c = COPY[locale]
  const dir = dirFor(locale)
  const item = (key: BioMediaKey, id: string, caption?: string) =>
    media[key] ? [{ id, media: media[key]!, ...(caption ? { caption } : {}) }] : []

  return [
    {
      id: 'bio-s01',
      blockType: 'csNarrative',
      label: 'context',
      heading: c.context.heading,
      body: prose(dir, ...c.context.body.map((value) => paragraph(value, dir))),
    },
    {
      id: 'bio-s02',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'plain',
      items: [...item('brand', 'bio-f02-1')],
      caption: c.context.figureCaption,
    },
    {
      id: 'bio-s03',
      blockType: 'csNarrative',
      label: 'problem',
      heading: c.problem.heading,
      body: prose(dir, paragraph(c.problem.intro, dir), bullets(c.problem.bullets, dir)),
    },
    {
      id: 'bio-s04',
      blockType: 'csOwnership',
      heading: c.ownership.heading,
      intro: c.ownership.intro,
      own: c.ownership.own,
      collaborate: c.ownership.collaborate,
      note: c.ownership.note,
    },
    {
      id: 'bio-s05',
      blockType: 'csNarrative',
      label: 'approach',
      heading: c.approach.heading,
      body: prose(dir, ...c.approach.body.map((value) => paragraph(value, dir))),
      insight: c.approach.insight,
    },
    {
      id: 'bio-s06',
      blockType: 'csProcess',
      kind: 'process',
      heading: c.approach.processHeading,
      steps: c.approach.steps.map((step, index) => ({
        id: `bio-p${String(index + 1).padStart(2, '0')}`,
        code: PROCESS_CODES[index],
        label: step.label,
        note: step.note,
      })),
    },
    {
      id: 'bio-s07',
      blockType: 'csDecisions',
      heading: c.decisions.heading,
      lede: c.decisions.lede,
      items: c.decisions.items.map((decision, index) => ({
        id: `bio-d${String(index + 1).padStart(2, '0')}`,
        title: decision.title,
        why: decision.why,
        alternatives: decision.alternatives,
        tradeoff: decision.tradeoff,
      })),
    },
    {
      id: 'bio-s08',
      blockType: 'csNarrative',
      label: 'solution',
      heading: c.solutionPanel.heading,
      body: prose(
        dir,
        paragraph(c.solutionPanel.body, dir),
        bullets(c.solutionPanel.bullets, dir),
      ),
    },
    {
      id: 'bio-s09',
      blockType: 'csFigure',
      layout: 'sequence',
      treatment: 'plain',
      items: [
        ...item('classesTablet', 'bio-f09-1'),
        ...item('login', 'bio-f09-2'),
        ...item('live', 'bio-f09-3'),
        ...item('wallet', 'bio-f09-4'),
      ],
      caption: c.solutionPanel.figureCaption,
    },
    // The exam flow at both widths: a figure has one treatment, so the desktop frame and the phone
    // frame are two figures rather than one split that would crop the desktop into a phone.
    {
      id: 'bio-s10',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'plain',
      items: [...item('examDesktop', 'bio-f10-1')],
      caption: c.alt.examDesktop,
    },
    {
      id: 'bio-s10b',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'screen',
      items: [...item('examMobile', 'bio-f10-2')],
      caption: c.alt.examMobile,
    },
    {
      id: 'bio-s11',
      blockType: 'csNarrative',
      label: 'solution',
      heading: c.solutionWeb.heading,
      body: prose(dir, paragraph(c.solutionWeb.body, dir), bullets(c.solutionWeb.bullets, dir)),
    },
    {
      id: 'bio-s12',
      blockType: 'csFigure',
      layout: 'sequence',
      treatment: 'plain',
      items: [
        ...item('websiteHero', 'bio-f12-1'),
        ...item('websiteCampaign', 'bio-f12-2'),
        ...item('websiteShop', 'bio-f12-3'),
      ],
      caption: c.solutionWeb.figureCaption,
    },
    {
      id: 'bio-s13',
      blockType: 'csNarrative',
      label: 'solution',
      heading: c.designSystem.heading,
      body: prose(dir, ...c.designSystem.body.map((value) => paragraph(value, dir))),
    },
    {
      id: 'bio-s14',
      blockType: 'csFigure',
      layout: 'sequence',
      treatment: 'plain',
      items: [
        ...item('dsColor', 'bio-f14-1'),
        ...item('dsButtons', 'bio-f14-2'),
        ...item('dsForms', 'bio-f14-3'),
      ],
      caption: c.designSystem.figureCaption,
    },
    {
      id: 'bio-s15',
      blockType: 'csOutcomes',
      heading: c.outcomes.heading,
      intro: c.outcomes.intro,
      items: [
        ...c.outcomes.measured.map((outcome, index) => ({
          id: `bio-o${String(index + 1).padStart(2, '0')}`,
          kind: 'measured' as const,
          value: MEASURED_VALUES[index],
          label: outcome.label,
          context: outcome.context,
          source: outcome.source,
        })),
        {
          id: 'bio-o04',
          kind: 'delivered' as const,
          label: c.outcomes.delivered.label,
          context: c.outcomes.delivered.context,
        },
      ],
      shipped: c.outcomes.shipped,
    },
    {
      id: 'bio-s16',
      blockType: 'csLessons',
      heading: c.lessons.heading,
      items: c.lessons.items.map((lesson, index) => ({
        id: `bio-l${String(index + 1).padStart(2, '0')}`,
        title: lesson.title,
        body: lesson.body,
      })),
    },
  ]
}

export function bioLocalizedFields(locale: Locale, media: BioMediaIds) {
  const c = COPY[locale]
  const identity = ARCHIVE.text(locale)
  return {
    ...identity,
    statement: c.statement,
    industry: c.industry,
    team: c.team,
    hero: {
      // One desktop screen: a hero of two or three renders every item in a phone frame.
      items: (['cover'] as const)
        .filter((key) => media[key])
        .map((key, index) => ({
          id: `bio-h${String(index + 1).padStart(2, '0')}`,
          media: media[key]!,
        })),
      caption: c.heroCaption,
    },
    snapshot: c.snapshot,
    sections: bioSections(locale, media),
    meta: {
      title: identity.title,
      description: identity.summary,
      ...(media.cover ? { image: media.cover } : {}),
    },
  }
}

export const BIO_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  projectStatus: 'shipped',
  tools: ['Figma'],
  // Sina, 2026-09-27: part-time from 2022 to 2025.
  period: { start: '2022-01-01T00:00:00.000Z', end: '2025-01-01T00:00:00.000Z' },
}
