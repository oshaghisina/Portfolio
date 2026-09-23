import type { Locale } from '@/utilities/locale'

import type {
  SkillGroupKey,
  SkillKey,
  SpotlightKey,
} from '@/blocks/CapabilityIcons/keys'

/**
 * `/experience` page copy for every site locale.
 *
 * Everything here is page content, so it is hand-translated seven ways like `workCopy`. What is
 * *not* here is structure: which skill sits in which group, which evidence attaches to which
 * capability, and which project a reference points at all live in `experience-page-content.ts`,
 * shared across locales. One capability system, seven languages (§46).
 *
 * Evidence names are keyed rather than written per skill, so "Digikala" is translated once and
 * not once per place it appears.
 *
 * Every claim below is traceable to `Docs/` — the résumé, the company READMEs and the project
 * files under `Docs/Experience/`. Nothing is written here that is not written there.
 */

/** The named pieces of work capabilities can point at. Localized because a company name still has a script-appropriate form. */
export const EVIDENCE_KEYS = [
  'a1paradise',
  'arashRezvani',
  'arvan',
  'biomaze',
  'carsparency',
  'digikala',
  'fayman',
  'fibona',
  'greenrest',
  'khodro45',
  'marqevon',
  'nimDang',
  'oteacher',
  'portfolio',
  'razhmana',
  'renova',
  'rp1',
  'vin',
  'yaravan',
] as const
export type EvidenceKey = (typeof EVIDENCE_KEYS)[number]

export interface SectionHeaderCopy {
  tag: string
  lead: string
  tail: string
  lede: string
}

export interface EvidenceItemCopy {
  label: string
  note: string
  /** Short display forms, positionally matched to `EVIDENCE_COMBINATIONS[i].capabilities`. */
  capabilities: string[]
}

export interface ExperiencePageCopy {
  title: string
  meta: { title: string; description: string }
  hero: { heading: string; lede: string }
  spotlight: {
    header: SectionHeaderCopy
    items: Record<SpotlightKey, { title: string; principle: string; description: string }>
  }
  matrix: {
    header: SectionHeaderCopy
    evidenceLabel: string
    groups: Record<SkillGroupKey, string>
    skills: Record<SkillKey, { title: string; description: string }>
  }
  evidence: { header: SectionHeaderCopy; items: EvidenceItemCopy[] }
  model: { header: SectionHeaderCopy; disciplines: string[]; outputLabel: string; output: string }
  cta: { heading: string; workLabel: string; contactLabel: string }
  evidenceNames: Record<EvidenceKey, string>
}

/** The homepage teaser that points here. Lives beside the page it advertises. */
export interface ExperienceTeaserCopy {
  /**
   * Home-length lede. The tag and the heading are deliberately absent: the teaser reuses
   * `spotlight.header`'s tag/lead/tail verbatim, so Home and `/experience` cannot drift into
   * naming or describing the same section differently. Only the supporting sentence is shorter
   * on Home, and only the link label is Home's own.
   */
  lede: string
  linkLabel: string
}

const en: ExperiencePageCopy = {
  title: 'Experience',
  meta: {
    title: 'Experience — Sina Oshaghi',
    description:
      'The capabilities behind ten years of product work — discovery, service design, requirements engineering, operations and AI-assisted delivery, each tied to where it was actually used.',
  },
  hero: {
    heading: 'Turning ambiguity into systems that can be built, measured and operated.',
    lede: 'Ten years across fintech, cloud, automotive, edtech and retail — defining what a product should be, writing the rules it runs on, and staying close enough to delivery to see it ship.',
  },
  spotlight: {
    header: {
      tag: 'Capabilities',
      lead: 'How the work',
      tail: 'actually runs.',
      lede: 'Four ways of operating that sit under everything below. Not job titles, and not the full list.',
    },
    items: {
      discovery: {
        title: 'Product Discovery',
        principle: 'Understand before building.',
        description:
          'Find the real problem, map the constraints and cut the ambiguity before execution starts.',
      },
      service: {
        title: 'Service Design',
        principle: 'Design the service, not the screen.',
        description:
          'Customer, operator, admin and vendor in one flow — including the parts no interface ever shows.',
      },
      systems: {
        title: 'Product Systems',
        principle: 'Rules that survive contact with reality.',
        description:
          'Requirements, states, exceptions and operating models written so engineering can start without re-asking the founder.',
      },
      'ai-execution': {
        title: 'AI-assisted Execution',
        principle: 'Context first, then agents.',
        description:
          'Multi-agent workflows with a documented source of truth, so AI-assisted delivery stays accountable.',
      },
    },
  },
  matrix: {
    header: {
      tag: 'Capability system',
      lead: 'Sixteen capabilities,',
      tail: 'in four groups.',
      lede: 'Core defines the practice, systems support it, execution proves it, and specialised experience differentiates it. Each one is tied to where it was used.',
    },
    evidenceLabel: 'Evidence',
    groups: {
      core: 'Core',
      systems: 'Systems',
      execution: 'Execution & evidence',
      specialized: 'Specialized experience',
    },
    skills: {
      'product-management': {
        title: 'Product Management',
        description:
          'Scope, prioritisation, PRDs, backlog and the KPI and MVP calls that decide what a team builds next.',
      },
      'product-discovery': {
        title: 'Product Discovery & Problem Framing',
        description:
          'Challenging the brief, framing the problem space, and deciding what should not be built.',
      },
      'service-design': {
        title: 'Service Design',
        description:
          'Multi-actor systems — customer, admin, operator, vendor — mapped end to end across their touchpoints.',
      },
      requirements: {
        title: 'Requirements Engineering',
        description:
          'Rules, states, exceptions and edge cases translated into implementation-ready specifications.',
      },
      'ai-product-development': {
        title: 'AI-assisted Product Development',
        description:
          'Multi-agent workflows, context engineering and cost control — workflow architecture, not prompt tricks.',
      },
      'process-operations': {
        title: 'Process & Operations Design',
        description:
          'Process maps, SOPs, RACI and the exception paths an operation actually runs on.',
      },
      'business-modeling': {
        title: 'Business & Product Modeling',
        description:
          'Revenue, cost, incentives and partnership structures modelled alongside the product.',
      },
      'technical-pm': {
        title: 'Technical Product Management',
        description:
          'Comfortable across APIs, CMS, databases and deployment decisions with engineers — a technically fluent PM, not an engineer.',
      },
      'documentation-spec': {
        title: 'Documentation & Specification Design',
        description:
          'Briefs, BRDs, SOPs and execution packets structured so the next person can act without asking.',
      },
      'analytics-experimentation': {
        title: 'Analytics & Experimentation',
        description:
          'Instrumentation, funnels, segmentation and A/B tests feeding dashboards a team can decide from.',
      },
      'ux-direction': {
        title: 'UX / Product Design Direction',
        description:
          'User flows, information hierarchy and interaction structure — product direction rather than visual styling.',
      },
      'stakeholder-management': {
        title: 'Stakeholder & Cross-functional Management',
        description:
          'Aligning product, design, engineering, business, operations and vendors around one decision.',
      },
      'fintech-strategy': {
        title: 'Fintech Product Strategy',
        description:
          'Financial products, their economics, and the trust a payment or an asset balance has to earn.',
      },
      'rtl-persian': {
        title: 'RTL & Persian Product Design',
        description:
          'Persian-first and bilingual interfaces where RTL is the design constraint, not a translation pass.',
      },
      gamification: {
        title: 'Gamification Design',
        description:
          'Progression, competition and motivation designed as system mechanics, using frameworks such as Octalysis.',
      },
      'product-function-setup': {
        title: 'Product Function Setup',
        description:
          'Standing up a product function where none existed — ownership, process, roles and decision rights.',
      },
    },
  },
  evidence: {
    header: {
      tag: 'Selected evidence',
      lead: 'Where capabilities',
      tail: 'combined.',
      lede: 'Five pieces of work, described by what had to come together rather than by a job title.',
    },
    items: [
      {
        label: 'Digikala — Digital Gold',
        note: 'Product vision, campaigns, user segmentation and the BI dashboards behind them.',
        capabilities: ['Product Management', 'Fintech', 'Analytics'],
      },
      {
        label: 'Yaravan',
        note: 'A warranty platform built over an after-sales operation nobody had written down.',
        capabilities: ['Service Design', 'Requirements', 'AI-assisted Development'],
      },
      {
        label: 'Razhmana',
        note: 'A design-file audit turned into a 42-process architecture and an input-readiness gate.',
        capabilities: ['Discovery', 'Process Design', 'Documentation'],
      },
      {
        label: 'RP1 Arena',
        note: 'A multi-game play-to-earn arena — competitive mechanics and the economy underneath them.',
        capabilities: ['Gamification', 'Business Modeling', 'Product Design'],
      },
      {
        label: 'Fayman',
        note: 'A Persian RTL storefront rebuilt around Iranian payments and an in-country stack.',
        capabilities: ['Technical PM', 'RTL & Persian', 'Fintech'],
      },
    ],
  },
  model: {
    header: {
      tag: 'Working across disciplines',
      lead: 'Six fields,',
      tail: 'one delivery.',
      lede: 'None of these is the job on its own. The job is what happens where they meet.',
    },
    disciplines: ['Business', 'Product', 'Design', 'Technology', 'Operations', 'AI'],
    outputLabel: 'Feeding',
    output: 'System · Decision · Delivery',
  },
  cta: {
    heading: 'Want to see the work behind it?',
    workLabel: 'Work',
    contactLabel: 'Get in touch',
  },
  evidenceNames: {
    a1paradise: 'A1Paradise',
    arashRezvani: 'Arash Rezvani',
    arvan: 'Arvan Cloud',
    biomaze: 'Biomaze',
    carsparency: 'Carsparency',
    digikala: 'Digikala',
    fayman: 'Fayman',
    fibona: 'Fibona',
    greenrest: 'GreenRest',
    khodro45: 'Khodro45',
    marqevon: 'Marqevon',
    nimDang: 'Nim Dang',
    oteacher: 'OTeacher',
    portfolio: 'This site',
    razhmana: 'Razhmana',
    renova: 'Renova+',
    rp1: 'RP1 Arena',
    vin: 'VIN',
    yaravan: 'Yaravan',
  },
}

const fa: ExperiencePageCopy = {
  title: 'تجربه',
  meta: {
    title: 'تجربه — سینا عشاقی',
    description:
      'ده سال تجربه در کشف محصول، طراحی خدمات، مهندسی نیازمندی‌ها، عملیات و اجرا با کمک هوش مصنوعی؛ همراه با نمونه‌هایی از کاربرد هر توانمندی.',
  },
  hero: {
    heading: 'از مسئلهٔ مبهم تا محصولی که می‌شود ساخت، سنجید و اداره کرد.',
    lede: 'در ده سال کار در فین‌تک، زیرساخت ابری، خودرو، آموزش و خرده‌فروشی، مسیر محصول را تعریف کرده‌ام، قواعد کارش را نوشته‌ام و تا زمان انتشار درگیر اجرا مانده‌ام.',
  },
  spotlight: {
    header: {
      tag: 'توانمندی‌ها',
      lead: 'کار در عمل',
      tail: 'چطور پیش می‌رود',
      lede: 'این چهار شیوه، پایهٔ کارهایی‌اند که در ادامه می‌بینید؛ نه عنوان شغلی‌اند و نه فهرست کامل توانمندی‌ها.',
    },
    items: {
      discovery: {
        title: 'کشف محصول',
        principle: 'اول بفهمیم، بعد بسازیم.',
        description: 'پیش از اجرا، مسئلهٔ واقعی را پیدا می‌کنم، محدودیت‌ها را می‌شناسم و ابهام را کمتر می‌کنم.',
      },
      service: {
        title: 'طراحی خدمات',
        principle: 'خدمت فراتر از صفحه است.',
        description:
          'تجربهٔ مشتری را کنار کار اپراتور، مدیر و تأمین‌کننده می‌بینم؛ از نقاط تماس تا فرایندهای پشت صحنه.',
      },
      systems: {
        title: 'سیستم‌های محصول',
        principle: 'قواعدی که در عمل جواب بدهند.',
        description:
          'نیازمندی‌ها، وضعیت‌ها، استثناها و مدل عملیاتی را چنان روشن می‌کنم که تیم فنی بتواند کار را پیش ببرد.',
      },
      'ai-execution': {
        title: 'اجرا با کمک هوش مصنوعی',
        principle: 'اول زمینه، بعد عامل‌ها.',
        description:
          'برای جریان کار چندعاملی، زمینه و مرجع سنجش مکتوب می‌سازم تا نتیجه قابل بررسی و پیگیری باشد.',
      },
    },
  },
  matrix: {
    header: {
      tag: 'نقشهٔ توانمندی‌ها',
      lead: 'شانزده توانمندی،',
      tail: 'در چهار گروه.',
      lede: 'توانمندی‌های اصلی جهت کار را مشخص می‌کنند؛ سیستم‌ها و اجرا آن را پیش می‌برند و تجربهٔ تخصصی به آن عمق می‌دهد. برای هر توانمندی نمونهٔ کاربرد آورده‌ام.',
    },
    evidenceLabel: 'شواهد',
    groups: {
      core: 'هسته',
      systems: 'سیستم‌ها',
      execution: 'اجرا و شواهد',
      specialized: 'تجربهٔ تخصصی',
    },
    skills: {
      'product-management': {
        title: 'مدیریت محصول',
        description:
          'تعیین دامنه و اولویت‌ها، نوشتن PRD و بک‌لاگ و تصمیم‌گیری با KPI و MVP برای مشخص‌کردن گام بعدی تیم.',
      },
      'product-discovery': {
        title: 'کشف محصول و صورت‌بندی مسئله',
        description:
          'بررسی فرض‌های بریف، روشن‌کردن مسئله و تصمیم‌گیری دربارهٔ چیزهایی که نباید ساخته شوند.',
      },
      'service-design': {
        title: 'طراحی خدمات',
        description:
          'طراحی جریان کامل خدمت برای مشتری، مدیر، اپراتور و تأمین‌کننده در همهٔ نقاط تماس.',
      },
      requirements: {
        title: 'مهندسی نیازمندی‌ها',
        description:
          'تبدیل قواعد، وضعیت‌ها، استثناها و حالت‌های مرزی به مشخصاتی که تیم فنی بتواند پیاده کند.',
      },
      'ai-product-development': {
        title: 'توسعه‌ی محصول با کمک هوش مصنوعی',
        description:
          'طراحی جریان کار چندعاملی، آماده‌سازی زمینه و کنترل هزینه؛ با تمرکز بر معماری اجرا.',
      },
      'process-operations': {
        title: 'طراحی فرایند و عملیات',
        description:
          'ترسیم فرایندها، رویه‌های استاندارد، ماتریس RACI و مسیر رسیدگی به استثناها برای کار روزمرهٔ عملیات.',
      },
      'business-modeling': {
        title: 'مدل‌سازی کسب‌وکار و محصول',
        description: 'بررسی درآمد، هزینه، انگیزه‌ها و شکل مشارکت در کنار تصمیم‌های محصول.',
      },
      'technical-pm': {
        title: 'مدیریت محصول فنی',
        description:
          'گفت‌وگوی دقیق با مهندسان دربارهٔ API، CMS، پایگاه داده و استقرار؛ از جایگاه مدیر محصولی که زبان فنی را می‌فهمد.',
      },
      'documentation-spec': {
        title: 'طراحی مستندات و مشخصات',
        description:
          'نوشتن بریف، BRD، رویهٔ استاندارد و بستهٔ اجرایی به شکلی که نفر بعد بتواند بر اساس آن کار کند.',
      },
      'analytics-experimentation': {
        title: 'تحلیل و آزمایش',
        description:
          'تعریف رویدادها، قیف‌ها، بخش‌بندی و آزمون A/B برای ساختن داده‌ای که به تصمیم تیم کمک کند.',
      },
      'ux-direction': {
        title: 'راهبری تجربه و طراحی محصول',
        description:
          'راهبری جریان کاربر، سلسله‌مراتب اطلاعات و شیوهٔ تعامل با تمرکز بر کارکرد محصول.',
      },
      'stakeholder-management': {
        title: 'مدیریت ذی‌نفعان و میان‌تیمی',
        description:
          'هم‌سوکردن تیم‌های محصول، طراحی، مهندسی، کسب‌وکار، عملیات و تأمین‌کنندگان برای رسیدن به تصمیم مشترک.',
      },
      'fintech-strategy': {
        title: 'راهبرد محصول فین‌تک',
        description:
          'طراحی محصول مالی با توجه به مدل اقتصادی آن و اعتمادی که کاربر برای پرداخت یا نگهداری دارایی نیاز دارد.',
      },
      'rtl-persian': {
        title: 'طراحی محصول فارسی و راست‌به‌چپ',
        description:
          'طراحی رابط فارسی و دوزبانه با درنظرگرفتن راست‌به‌چپ از آغاز کار، نه در مرحلهٔ ترجمه.',
      },
      gamification: {
        title: 'طراحی گیمیفیکیشن',
        description:
          'طراحی سازوکارهای پیشرفت، رقابت و انگیزش با کمک چارچوب‌هایی مانند اکتالیسیس.',
      },
      'product-function-setup': {
        title: 'راه‌اندازی واحد محصول',
        description: 'ساختن واحد محصول از صفر؛ از تعریف نقش‌ها و مالکیت تا فرایندها و اختیار تصمیم‌گیری.',
      },
    },
  },
  evidence: {
    header: {
      tag: 'شواهد منتخب',
      lead: 'جایی که توانمندی‌ها',
      tail: 'کنار هم آمدند.',
      lede: 'پنج نمونه از کارهایی که برای انجامشان چند توانمندی را هم‌زمان به کار گرفته‌ام.',
    },
    items: [
      {
        label: 'دیجی‌کالا — طلای دیجیتال',
        note: 'چشم‌انداز محصول، کمپین‌ها، بخش‌بندی کاربران و داشبوردهای هوش تجاریِ پشتیبان آن‌ها.',
        capabilities: ['مدیریت محصول', 'فین‌تک', 'تحلیل'],
      },
      {
        label: 'یاراوان',
        note: 'پلتفرم گارانتی بر پایهٔ فرایندهای خدمات پس از فروش که پیش‌تر مستند نشده بودند.',
        capabilities: ['طراحی خدمات', 'نیازمندی‌ها', 'توسعه با هوش مصنوعی'],
      },
      {
        label: 'راژمانا',
        note: 'ممیزی فایل طراحی که به معماری ۴۲ فرایند و یک معیار آمادگی برای شروع اجرا رسید.',
        capabilities: ['کشف محصول', 'طراحی فرایند', 'مستندسازی'],
      },
      {
        label: 'آرنای RP1',
        note: 'عرصه‌ای با چند بازی از نوع «بازی کن و درآمد بگیر»؛ با سازوکارهای رقابتی و اقتصادیِ پشتیبان آن.',
        capabilities: ['گیمیفیکیشن', 'مدل‌سازی کسب‌وکار', 'طراحی محصول'],
      },
      {
        label: 'فایمن',
        note: 'بازسازی فروشگاه فارسی و راست‌به‌چپ با پرداخت ایرانی و زیرساخت داخل کشور.',
        capabilities: ['مدیریت محصول فنی', 'فارسی و راست‌به‌چپ', 'فین‌تک'],
      },
    ],
  },
  model: {
    header: {
      tag: 'کار میان‌رشته‌ای',
      lead: 'شش حوزه،',
      tail: 'یک نتیجه.',
      lede: 'کار من در پیوند این حوزه‌ها شکل می‌گیرد و به تصمیم، سیستم و محصول قابل ارائه می‌رسد.',
    },
    disciplines: ['کسب‌وکار', 'محصول', 'طراحی', 'فناوری', 'عملیات', 'هوش مصنوعی'],
    outputLabel: 'حاصل کار',
    output: 'سیستم · تصمیم · اجرا',
  },
  cta: {
    heading: 'نمونه‌های این شیوهٔ کار را ببینید',
    workLabel: 'دیدن پروژه‌ها',
    contactLabel: 'تماس با من',
  },
  evidenceNames: {
    a1paradise: 'A1Paradise',
    arashRezvani: 'آرش رضوانی',
    arvan: 'ابر آروان',
    biomaze: 'بایومیز',
    carsparency: 'کارسپرنسی',
    digikala: 'دیجی‌کالا',
    fayman: 'فایمن',
    fibona: 'فیبونا',
    greenrest: 'گرین‌رست',
    khodro45: 'خودرو۴۵',
    marqevon: 'مارکوون',
    nimDang: 'نیم‌دانگ',
    oteacher: 'اوتیچر',
    portfolio: 'همین سایت',
    razhmana: 'راژمانا',
    renova: 'رنووا+',
    rp1: 'آرنای RP1',
    vin: 'VIN',
    yaravan: 'یاراوان',
  },
}

const ar: ExperiencePageCopy = {
  title: 'الخبرة',
  meta: {
    title: 'الخبرة — سينا أوشاقي',
    description:
      'القدرات خلف عشر سنوات من العمل على المنتجات — الاستكشاف وتصميم الخدمة وهندسة المتطلبات والعمليات والتنفيذ بمساعدة الذكاء الاصطناعي، كلٌّ منها مرتبط بالمكان الذي استُخدم فيه فعلاً.',
  },
  hero: {
    heading: 'تحويل الغموض إلى أنظمة يمكن بناؤها وقياسها وتشغيلها.',
    lede: 'عشر سنوات في التقنية المالية والحوسبة السحابية والسيارات والتعليم والتجزئة — تحديد ما ينبغي أن يكون عليه المنتج، وكتابة القواعد التي يعمل بها، والبقاء قريباً من التنفيذ بما يكفي لرؤيته يُطلَق.',
  },
  spotlight: {
    header: {
      tag: 'القدرات',
      lead: 'كيف يسير',
      tail: 'العمل فعلاً.',
      lede: 'أربع طرق للعمل تقوم تحت كل ما يلي. ليست مسميات وظيفية وليست القائمة الكاملة.',
    },
    items: {
      discovery: {
        title: 'استكشاف المنتج',
        principle: 'افهم قبل أن تبني.',
        description: 'إيجاد المشكلة الحقيقية، ورسم القيود، وتقليص الغموض قبل بدء التنفيذ.',
      },
      service: {
        title: 'تصميم الخدمة',
        principle: 'صمّم الخدمة، لا الشاشة.',
        description:
          'العميل والمشغّل والمسؤول والمورّد في مسار واحد — بما في ذلك الأجزاء التي لا تُظهرها أي واجهة.',
      },
      systems: {
        title: 'أنظمة المنتج',
        principle: 'قواعد تصمد أمام الواقع.',
        description:
          'متطلبات وحالات واستثناءات ونماذج تشغيل مكتوبة بحيث تبدأ الهندسة دون إعادة السؤال.',
      },
      'ai-execution': {
        title: 'التنفيذ بمساعدة الذكاء الاصطناعي',
        principle: 'السياق أولاً، ثم الوكلاء.',
        description:
          'مسارات عمل متعددة الوكلاء بمرجع حقيقة موثَّق، كي يبقى التنفيذ بمساعدة الذكاء الاصطناعي قابلاً للمساءلة.',
      },
    },
  },
  matrix: {
    header: {
      tag: 'منظومة القدرات',
      lead: 'ست عشرة قدرة،',
      tail: 'في أربع مجموعات.',
      lede: 'الأساس يحدّد الممارسة، والأنظمة تسندها، والتنفيذ يثبتها، والخبرة المتخصصة تميّزها. كل واحدة مرتبطة بالمكان الذي استُخدمت فيه.',
    },
    evidenceLabel: 'الدليل',
    groups: {
      core: 'الأساس',
      systems: 'الأنظمة',
      execution: 'التنفيذ والأدلة',
      specialized: 'خبرة متخصصة',
    },
    skills: {
      'product-management': {
        title: 'إدارة المنتج',
        description:
          'النطاق والأولويات ووثائق المتطلبات وقائمة العمل وقرارات المؤشرات والمنتج الأصغر القابل للتطبيق.',
      },
      'product-discovery': {
        title: 'استكشاف المنتج وصياغة المشكلة',
        description: 'مساءلة الموجز، وصياغة فضاء المشكلة، وتحديد ما لا ينبغي بناؤه.',
      },
      'service-design': {
        title: 'تصميم الخدمة',
        description:
          'أنظمة متعددة الأطراف — عميل ومسؤول ومشغّل ومورّد — مرسومة من طرف إلى طرف عبر نقاط التماس.',
      },
      requirements: {
        title: 'هندسة المتطلبات',
        description: 'قواعد وحالات واستثناءات وحالات حدّية مترجَمة إلى مواصفات جاهزة للتنفيذ.',
      },
      'ai-product-development': {
        title: 'تطوير المنتج بمساعدة الذكاء الاصطناعي',
        description:
          'مسارات متعددة الوكلاء وهندسة السياق وضبط التكلفة — بنية لمسار العمل، لا حيل في الأوامر.',
      },
      'process-operations': {
        title: 'تصميم العمليات والتشغيل',
        description:
          'خرائط العمليات وإجراءات التشغيل المعيارية ومصفوفة المسؤوليات ومسارات الاستثناء التي تعمل بها العملية فعلاً.',
      },
      'business-modeling': {
        title: 'نمذجة الأعمال والمنتج',
        description: 'الإيراد والتكلفة والحوافز وهياكل الشراكة، مُنمذجة إلى جانب المنتج.',
      },
      'technical-pm': {
        title: 'إدارة المنتج التقنية',
        description:
          'إلمام مريح بواجهات البرمجة وأنظمة المحتوى وقواعد البيانات وقرارات النشر مع المهندسين — مدير منتج ملمّ تقنياً، لا مهندس.',
      },
      'documentation-spec': {
        title: 'تصميم التوثيق والمواصفات',
        description:
          'موجزات ووثائق متطلبات وإجراءات تشغيل وحزم تنفيذ، مهيكلة بحيث يتصرّف التالي دون سؤال.',
      },
      'analytics-experimentation': {
        title: 'التحليلات والتجريب',
        description:
          'قياس الأحداث والمسارات والتقسيم واختبارات A/B تغذّي لوحات يمكن للفريق أن يقرّر منها.',
      },
      'ux-direction': {
        title: 'توجيه تجربة وتصميم المنتج',
        description: 'مسارات المستخدم وتسلسل المعلومات وبنية التفاعل — توجيه المنتج لا التنميق البصري.',
      },
      'stakeholder-management': {
        title: 'إدارة أصحاب المصلحة والعمل المشترك',
        description: 'مواءمة المنتج والتصميم والهندسة والأعمال والعمليات والموردين حول قرار واحد.',
      },
      'fintech-strategy': {
        title: 'استراتيجية منتجات التقنية المالية',
        description: 'المنتجات المالية واقتصادياتها، والثقة التي يجب أن تكسبها عملية دفع أو رصيد أصل.',
      },
      'rtl-persian': {
        title: 'تصميم المنتجات بالفارسية ومن اليمين إلى اليسار',
        description:
          'واجهات فارسية أولاً وثنائية اللغة، حيث الاتجاه من اليمين إلى اليسار قيد تصميمي لا خطوة ترجمة.',
      },
      gamification: {
        title: 'تصميم التلعيب',
        description: 'التقدّم والتنافس والتحفيز مصمَّمة كميكانيكا نظام، بأطر مثل أوكتاليسيس.',
      },
      'product-function-setup': {
        title: 'تأسيس وظيفة المنتج',
        description: 'إنشاء وظيفة منتج من الصفر — الملكية والعملية والأدوار وصلاحيات القرار.',
      },
    },
  },
  evidence: {
    header: {
      tag: 'أدلة مختارة',
      lead: 'حيث اجتمعت',
      tail: 'القدرات.',
      lede: 'خمسة أعمال، موصوفة بما وجب أن يجتمع فيها، لا بمسمّى وظيفي.',
    },
    items: [
      {
        label: 'ديجي‌كالا — الذهب الرقمي',
        note: 'رؤية المنتج والحملات وتقسيم المستخدمين ولوحات ذكاء الأعمال خلفها.',
        capabilities: ['إدارة المنتج', 'التقنية المالية', 'التحليلات'],
      },
      {
        label: 'ياراوان',
        note: 'منصة ضمان بُنيت فوق عملية ما بعد بيع لم يوثّقها أحد.',
        capabilities: ['تصميم الخدمة', 'المتطلبات', 'التطوير بالذكاء الاصطناعي'],
      },
      {
        label: 'راجمانا',
        note: 'تدقيق ملف تصميم تحوّل إلى بنية من ٤٢ عملية وبوابة جاهزية مدخلات.',
        capabilities: ['الاستكشاف', 'تصميم العمليات', 'التوثيق'],
      },
      {
        label: 'ساحة RP1',
        note: 'ساحة ألعاب متعددة للعب مقابل الربح — ميكانيكا تنافسية واقتصاد تحتها.',
        capabilities: ['التلعيب', 'نمذجة الأعمال', 'تصميم المنتج'],
      },
      {
        label: 'فايمن',
        note: 'متجر فارسي من اليمين إلى اليسار، أُعيد بناؤه حول المدفوعات الإيرانية وبنية داخلية.',
        capabilities: ['إدارة المنتج التقنية', 'الفارسية واليمين إلى اليسار', 'التقنية المالية'],
      },
    ],
  },
  model: {
    header: {
      tag: 'العمل عبر التخصصات',
      lead: 'ستة مجالات،',
      tail: 'تسليم واحد.',
      lede: 'لا أحد منها هو العمل وحده. العمل هو ما يحدث عند تقاطعها.',
    },
    disciplines: ['الأعمال', 'المنتج', 'التصميم', 'التقنية', 'العمليات', 'الذكاء الاصطناعي'],
    outputLabel: 'تصبّ في',
    output: 'نظام · قرار · تسليم',
  },
  cta: {
    heading: 'هل تريد رؤية العمل خلف ذلك؟',
    workLabel: 'الأعمال',
    contactLabel: 'تواصل معي',
  },
  evidenceNames: {
    a1paradise: 'A1Paradise',
    arashRezvani: 'آرش رضواني',
    arvan: 'أروان كلاود',
    biomaze: 'بايوميز',
    carsparency: 'كارسبارنسي',
    digikala: 'ديجي‌كالا',
    fayman: 'فايمن',
    fibona: 'فيبونا',
    greenrest: 'غرين‌رست',
    khodro45: 'خودرو45',
    marqevon: 'ماركيفون',
    nimDang: 'نيم دانغ',
    oteacher: 'أو تيتشر',
    portfolio: 'هذا الموقع',
    razhmana: 'راجمانا',
    renova: 'رينوفا+',
    rp1: 'ساحة RP1',
    vin: 'VIN',
    yaravan: 'ياراوان',
  },
}

const es: ExperiencePageCopy = {
  title: 'Experiencia',
  meta: {
    title: 'Experiencia — Sina Oshaghi',
    description:
      'Las capacidades detrás de diez años de trabajo de producto: descubrimiento, diseño de servicios, ingeniería de requisitos, operaciones y ejecución asistida por IA, cada una ligada a dónde se usó realmente.',
  },
  hero: {
    heading: 'Convertir la ambigüedad en sistemas que se pueden construir, medir y operar.',
    lede: 'Diez años en fintech, cloud, automoción, edtech y retail: definir qué debe ser un producto, escribir las reglas con las que funciona y mantenerme lo bastante cerca de la entrega como para verlo salir.',
  },
  spotlight: {
    header: {
      tag: 'Capacidades',
      lead: 'Cómo funciona',
      tail: 'el trabajo en realidad.',
      lede: 'Cuatro formas de operar que sostienen todo lo que viene debajo. No son cargos, ni la lista completa.',
    },
    items: {
      discovery: {
        title: 'Descubrimiento de producto',
        principle: 'Entender antes de construir.',
        description:
          'Encontrar el problema real, mapear las restricciones y reducir la ambigüedad antes de empezar a ejecutar.',
      },
      service: {
        title: 'Diseño de servicios',
        principle: 'Diseña el servicio, no la pantalla.',
        description:
          'Cliente, operador, administrador y proveedor en un solo flujo, incluidas las partes que ninguna interfaz muestra.',
      },
      systems: {
        title: 'Sistemas de producto',
        principle: 'Reglas que sobreviven al contacto con la realidad.',
        description:
          'Requisitos, estados, excepciones y modelos operativos escritos para que ingeniería pueda empezar sin volver a preguntar.',
      },
      'ai-execution': {
        title: 'Ejecución asistida por IA',
        principle: 'Primero el contexto, después los agentes.',
        description:
          'Flujos multiagente con una fuente de verdad documentada, para que la entrega asistida por IA siga siendo responsable.',
      },
    },
  },
  matrix: {
    header: {
      tag: 'Sistema de capacidades',
      lead: 'Dieciséis capacidades,',
      tail: 'en cuatro grupos.',
      lede: 'El núcleo define la práctica, los sistemas la sostienen, la ejecución la demuestra y la experiencia especializada la diferencia. Cada una está ligada a dónde se usó.',
    },
    evidenceLabel: 'Evidencia',
    groups: {
      core: 'Núcleo',
      systems: 'Sistemas',
      execution: 'Ejecución y evidencia',
      specialized: 'Experiencia especializada',
    },
    skills: {
      'product-management': {
        title: 'Gestión de producto',
        description:
          'Alcance, priorización, PRD, backlog y las decisiones de KPI y MVP que determinan qué construye el equipo.',
      },
      'product-discovery': {
        title: 'Descubrimiento y formulación del problema',
        description:
          'Cuestionar el brief, delimitar el espacio del problema y decidir qué no debe construirse.',
      },
      'service-design': {
        title: 'Diseño de servicios',
        description:
          'Sistemas multiactor —cliente, administrador, operador, proveedor— mapeados de extremo a extremo en sus puntos de contacto.',
      },
      requirements: {
        title: 'Ingeniería de requisitos',
        description:
          'Reglas, estados, excepciones y casos límite traducidos a especificaciones listas para implementar.',
      },
      'ai-product-development': {
        title: 'Desarrollo de producto asistido por IA',
        description:
          'Flujos multiagente, ingeniería de contexto y control de coste: arquitectura de flujo de trabajo, no trucos de prompt.',
      },
      'process-operations': {
        title: 'Diseño de procesos y operaciones',
        description:
          'Mapas de proceso, SOP, RACI y las rutas de excepción con las que una operación funciona de verdad.',
      },
      'business-modeling': {
        title: 'Modelado de negocio y producto',
        description: 'Ingresos, costes, incentivos y estructuras de alianza modelados junto al producto.',
      },
      'technical-pm': {
        title: 'Gestión técnica de producto',
        description:
          'Cómodo con API, CMS, bases de datos y decisiones de despliegue junto a ingeniería: un PM con soltura técnica, no un ingeniero.',
      },
      'documentation-spec': {
        title: 'Diseño de documentación y especificaciones',
        description:
          'Briefs, BRD, SOP y paquetes de ejecución estructurados para que el siguiente pueda actuar sin preguntar.',
      },
      'analytics-experimentation': {
        title: 'Analítica y experimentación',
        description:
          'Instrumentación, embudos, segmentación y tests A/B que alimentan cuadros de mando con los que decidir.',
      },
      'ux-direction': {
        title: 'Dirección de UX y diseño de producto',
        description:
          'Flujos de usuario, jerarquía de información y estructura de interacción: dirección de producto, no estilo visual.',
      },
      'stakeholder-management': {
        title: 'Gestión de stakeholders e interfuncional',
        description:
          'Alinear producto, diseño, ingeniería, negocio, operaciones y proveedores en torno a una decisión.',
      },
      'fintech-strategy': {
        title: 'Estrategia de producto fintech',
        description:
          'Productos financieros, su economía y la confianza que un pago o un saldo tiene que ganarse.',
      },
      'rtl-persian': {
        title: 'Diseño de producto en persa y RTL',
        description:
          'Interfaces bilingües y con el persa primero, donde el RTL es la restricción de diseño y no una fase de traducción.',
      },
      gamification: {
        title: 'Diseño de gamificación',
        description:
          'Progresión, competición y motivación diseñadas como mecánicas de sistema, con marcos como Octalysis.',
      },
      'product-function-setup': {
        title: 'Puesta en marcha de la función de producto',
        description:
          'Montar una función de producto donde no existía: propiedad, proceso, roles y derechos de decisión.',
      },
    },
  },
  evidence: {
    header: {
      tag: 'Evidencia seleccionada',
      lead: 'Donde las capacidades',
      tail: 'se combinaron.',
      lede: 'Cinco trabajos, descritos por lo que tuvo que juntarse y no por un cargo.',
    },
    items: [
      {
        label: 'Digikala — Digital Gold',
        note: 'Visión de producto, campañas, segmentación de usuarios y los cuadros de mando detrás.',
        capabilities: ['Gestión de producto', 'Fintech', 'Analítica'],
      },
      {
        label: 'Yaravan',
        note: 'Una plataforma de garantía construida sobre una operación posventa que nadie había documentado.',
        capabilities: ['Diseño de servicios', 'Requisitos', 'Desarrollo con IA'],
      },
      {
        label: 'Razhmana',
        note: 'Una auditoría de archivo de diseño convertida en 42 procesos y una puerta de preparación de entradas.',
        capabilities: ['Descubrimiento', 'Diseño de procesos', 'Documentación'],
      },
      {
        label: 'RP1 Arena',
        note: 'Una arena multijuego play-to-earn: mecánicas competitivas y la economía que las sostiene.',
        capabilities: ['Gamificación', 'Modelado de negocio', 'Diseño de producto'],
      },
      {
        label: 'Fayman',
        note: 'Una tienda persa RTL reconstruida en torno a los pagos iraníes y una infraestructura local.',
        capabilities: ['PM técnico', 'Persa y RTL', 'Fintech'],
      },
    ],
  },
  model: {
    header: {
      tag: 'Trabajar entre disciplinas',
      lead: 'Seis campos,',
      tail: 'una entrega.',
      lede: 'Ninguno es el trabajo por sí solo. El trabajo es lo que ocurre donde se cruzan.',
    },
    disciplines: ['Negocio', 'Producto', 'Diseño', 'Tecnología', 'Operaciones', 'IA'],
    outputLabel: 'Alimentan',
    output: 'Sistema · Decisión · Entrega',
  },
  cta: {
    heading: '¿Quieres ver el trabajo detrás?',
    workLabel: 'Trabajo',
    contactLabel: 'Contactar',
  },
  evidenceNames: {
    a1paradise: 'A1Paradise',
    arashRezvani: 'Arash Rezvani',
    arvan: 'Arvan Cloud',
    biomaze: 'Biomaze',
    carsparency: 'Carsparency',
    digikala: 'Digikala',
    fayman: 'Fayman',
    fibona: 'Fibona',
    greenrest: 'GreenRest',
    khodro45: 'Khodro45',
    marqevon: 'Marqevon',
    nimDang: 'Nim Dang',
    oteacher: 'OTeacher',
    portfolio: 'Este sitio',
    razhmana: 'Razhmana',
    renova: 'Renova+',
    rp1: 'RP1 Arena',
    vin: 'VIN',
    yaravan: 'Yaravan',
  },
}

const de: ExperiencePageCopy = {
  title: 'Erfahrung',
  meta: {
    title: 'Erfahrung — Sina Oshaghi',
    description:
      'Die Fähigkeiten hinter zehn Jahren Produktarbeit — Discovery, Service-Design, Requirements Engineering, Operations und KI-gestützte Umsetzung, jede mit dem Ort verknüpft, an dem sie tatsächlich zum Einsatz kam.',
  },
  hero: {
    heading: 'Aus Unklarheit Systeme machen, die sich bauen, messen und betreiben lassen.',
    lede: 'Zehn Jahre in Fintech, Cloud, Automotive, EdTech und Handel — definieren, was ein Produkt sein soll, die Regeln aufschreiben, nach denen es läuft, und nah genug an der Umsetzung bleiben, um es live gehen zu sehen.',
  },
  spotlight: {
    header: {
      tag: 'Fähigkeiten',
      lead: 'Wie die Arbeit',
      tail: 'tatsächlich läuft.',
      lede: 'Vier Arbeitsweisen, die unter allem Folgenden liegen. Keine Jobtitel und nicht die vollständige Liste.',
    },
    items: {
      discovery: {
        title: 'Product Discovery',
        principle: 'Verstehen, bevor gebaut wird.',
        description:
          'Das eigentliche Problem finden, die Rahmenbedingungen kartieren und die Unklarheit reduzieren, bevor die Umsetzung beginnt.',
      },
      service: {
        title: 'Service-Design',
        principle: 'Den Service gestalten, nicht den Screen.',
        description:
          'Kundschaft, Betrieb, Verwaltung und Lieferant in einem Ablauf — auch die Teile, die keine Oberfläche je zeigt.',
      },
      systems: {
        title: 'Produktsysteme',
        principle: 'Regeln, die der Realität standhalten.',
        description:
          'Anforderungen, Zustände, Ausnahmen und Betriebsmodelle so geschrieben, dass die Entwicklung ohne Rückfragen starten kann.',
      },
      'ai-execution': {
        title: 'KI-gestützte Umsetzung',
        principle: 'Erst der Kontext, dann die Agenten.',
        description:
          'Multi-Agenten-Workflows mit dokumentierter Wahrheitsquelle, damit KI-gestützte Lieferung nachvollziehbar bleibt.',
      },
    },
  },
  matrix: {
    header: {
      tag: 'Fähigkeitssystem',
      lead: 'Sechzehn Fähigkeiten,',
      tail: 'in vier Gruppen.',
      lede: 'Der Kern definiert die Praxis, Systeme stützen sie, Umsetzung belegt sie, spezialisierte Erfahrung unterscheidet sie. Jede ist mit ihrem Einsatzort verknüpft.',
    },
    evidenceLabel: 'Belege',
    groups: {
      core: 'Kern',
      systems: 'Systeme',
      execution: 'Umsetzung & Belege',
      specialized: 'Spezialisierte Erfahrung',
    },
    skills: {
      'product-management': {
        title: 'Produktmanagement',
        description:
          'Scope, Priorisierung, PRDs, Backlog und die KPI- und MVP-Entscheidungen, die bestimmen, was ein Team als Nächstes baut.',
      },
      'product-discovery': {
        title: 'Product Discovery & Problemrahmung',
        description:
          'Das Briefing hinterfragen, den Problemraum abstecken und entscheiden, was nicht gebaut werden sollte.',
      },
      'service-design': {
        title: 'Service-Design',
        description:
          'Mehrakteurssysteme — Kundschaft, Verwaltung, Betrieb, Lieferant — über alle Kontaktpunkte hinweg kartiert.',
      },
      requirements: {
        title: 'Requirements Engineering',
        description:
          'Regeln, Zustände, Ausnahmen und Randfälle, übersetzt in umsetzungsreife Spezifikationen.',
      },
      'ai-product-development': {
        title: 'KI-gestützte Produktentwicklung',
        description:
          'Multi-Agenten-Workflows, Context Engineering und Kostenkontrolle — Workflow-Architektur, keine Prompt-Tricks.',
      },
      'process-operations': {
        title: 'Prozess- und Betriebsgestaltung',
        description:
          'Prozesslandkarten, SOPs, RACI und die Ausnahmepfade, auf denen ein Betrieb wirklich läuft.',
      },
      'business-modeling': {
        title: 'Geschäfts- und Produktmodellierung',
        description: 'Erlöse, Kosten, Anreize und Partnerstrukturen, modelliert neben dem Produkt.',
      },
      'technical-pm': {
        title: 'Technisches Produktmanagement',
        description:
          'Sicher bei APIs, CMS, Datenbanken und Deployment-Entscheidungen mit der Entwicklung — ein technisch versierter PM, kein Entwickler.',
      },
      'documentation-spec': {
        title: 'Dokumentations- und Spezifikationsdesign',
        description:
          'Briefs, BRDs, SOPs und Umsetzungspakete so strukturiert, dass die nächste Person ohne Rückfrage handeln kann.',
      },
      'analytics-experimentation': {
        title: 'Analytics & Experimente',
        description:
          'Instrumentierung, Funnels, Segmentierung und A/B-Tests, die Dashboards speisen, auf deren Basis ein Team entscheiden kann.',
      },
      'ux-direction': {
        title: 'UX- und Produktdesign-Direction',
        description:
          'User Flows, Informationshierarchie und Interaktionsstruktur — Produktrichtung statt visueller Politur.',
      },
      'stakeholder-management': {
        title: 'Stakeholder- und bereichsübergreifendes Management',
        description:
          'Produkt, Design, Entwicklung, Business, Betrieb und Lieferanten auf eine Entscheidung ausrichten.',
      },
      'fintech-strategy': {
        title: 'Fintech-Produktstrategie',
        description:
          'Finanzprodukte, ihre Ökonomie und das Vertrauen, das eine Zahlung oder ein Guthaben erst verdienen muss.',
      },
      'rtl-persian': {
        title: 'Persisches und RTL-Produktdesign',
        description:
          'Persisch-zuerst und zweisprachige Oberflächen, in denen RTL die Designbedingung ist und kein Übersetzungsschritt.',
      },
      gamification: {
        title: 'Gamification-Design',
        description:
          'Progression, Wettbewerb und Motivation als Systemmechanik entworfen, mit Frameworks wie Octalysis.',
      },
      'product-function-setup': {
        title: 'Aufbau der Produktfunktion',
        description:
          'Eine Produktfunktion dort aufbauen, wo es keine gab — Verantwortung, Prozess, Rollen und Entscheidungsrechte.',
      },
    },
  },
  evidence: {
    header: {
      tag: 'Ausgewählte Belege',
      lead: 'Wo Fähigkeiten',
      tail: 'zusammenkamen.',
      lede: 'Fünf Arbeiten, beschrieben durch das, was zusammenkommen musste — nicht durch einen Jobtitel.',
    },
    items: [
      {
        label: 'Digikala — Digital Gold',
        note: 'Produktvision, Kampagnen, Nutzersegmentierung und die BI-Dashboards dahinter.',
        capabilities: ['Produktmanagement', 'Fintech', 'Analytics'],
      },
      {
        label: 'Yaravan',
        note: 'Eine Garantieplattform auf einem After-Sales-Betrieb, den niemand je dokumentiert hatte.',
        capabilities: ['Service-Design', 'Anforderungen', 'KI-gestützte Entwicklung'],
      },
      {
        label: 'Razhmana',
        note: 'Ein Design-Datei-Audit, aus dem eine 42-Prozess-Architektur und ein Input-Readiness-Gate wurde.',
        capabilities: ['Discovery', 'Prozessdesign', 'Dokumentation'],
      },
      {
        label: 'RP1 Arena',
        note: 'Eine Multi-Game-Play-to-Earn-Arena — Wettbewerbsmechanik und die Ökonomie darunter.',
        capabilities: ['Gamification', 'Geschäftsmodellierung', 'Produktdesign'],
      },
      {
        label: 'Fayman',
        note: 'Ein persischer RTL-Shop, neu gebaut um iranische Zahlungen und einen Stack im Land.',
        capabilities: ['Technisches PM', 'Persisch & RTL', 'Fintech'],
      },
    ],
  },
  model: {
    header: {
      tag: 'Über Disziplinen hinweg',
      lead: 'Sechs Felder,',
      tail: 'eine Lieferung.',
      lede: 'Keines davon ist für sich die Arbeit. Die Arbeit ist das, was an ihren Schnittstellen passiert.',
    },
    disciplines: ['Business', 'Produkt', 'Design', 'Technologie', 'Betrieb', 'KI'],
    outputLabel: 'Fließt in',
    output: 'System · Entscheidung · Lieferung',
  },
  cta: {
    heading: 'Die Arbeit dahinter sehen?',
    workLabel: 'Arbeiten',
    contactLabel: 'Kontakt',
  },
  evidenceNames: {
    a1paradise: 'A1Paradise',
    arashRezvani: 'Arash Rezvani',
    arvan: 'Arvan Cloud',
    biomaze: 'Biomaze',
    carsparency: 'Carsparency',
    digikala: 'Digikala',
    fayman: 'Fayman',
    fibona: 'Fibona',
    greenrest: 'GreenRest',
    khodro45: 'Khodro45',
    marqevon: 'Marqevon',
    nimDang: 'Nim Dang',
    oteacher: 'OTeacher',
    portfolio: 'Diese Website',
    razhmana: 'Razhmana',
    renova: 'Renova+',
    rp1: 'RP1 Arena',
    vin: 'VIN',
    yaravan: 'Yaravan',
  },
}

const fr: ExperiencePageCopy = {
  title: 'Expérience',
  meta: {
    title: 'Expérience — Sina Oshaghi',
    description:
      'Les compétences derrière dix ans de travail produit : discovery, design de service, ingénierie des exigences, opérations et exécution assistée par IA, chacune rattachée à l’endroit où elle a réellement servi.',
  },
  hero: {
    heading: 'Transformer l’ambiguïté en systèmes que l’on peut construire, mesurer et exploiter.',
    lede: 'Dix ans dans la fintech, le cloud, l’automobile, l’edtech et le commerce — définir ce que le produit doit être, écrire les règles qui le font tourner, et rester assez près de la livraison pour le voir sortir.',
  },
  spotlight: {
    header: {
      tag: 'Compétences',
      lead: 'Comment le travail',
      tail: 'fonctionne vraiment.',
      lede: 'Quatre façons d’opérer qui sous-tendent tout ce qui suit. Ni des intitulés de poste, ni la liste complète.',
    },
    items: {
      discovery: {
        title: 'Discovery produit',
        principle: 'Comprendre avant de construire.',
        description:
          'Trouver le vrai problème, cartographier les contraintes et réduire l’ambiguïté avant de lancer l’exécution.',
      },
      service: {
        title: 'Design de service',
        principle: 'Concevoir le service, pas l’écran.',
        description:
          'Client, opérateur, administrateur et fournisseur dans un même flux — y compris les parties qu’aucune interface ne montre.',
      },
      systems: {
        title: 'Systèmes produit',
        principle: 'Des règles qui résistent au réel.',
        description:
          'Exigences, états, exceptions et modèles opérationnels écrits pour que l’ingénierie puisse démarrer sans reposer la question.',
      },
      'ai-execution': {
        title: 'Exécution assistée par IA',
        principle: 'Le contexte d’abord, les agents ensuite.',
        description:
          'Des workflows multi-agents avec une source de vérité documentée, pour que la livraison assistée par IA reste redevable.',
      },
    },
  },
  matrix: {
    header: {
      tag: 'Système de compétences',
      lead: 'Seize compétences,',
      tail: 'en quatre groupes.',
      lede: 'Le noyau définit la pratique, les systèmes la soutiennent, l’exécution la prouve et l’expérience spécialisée la distingue. Chacune est rattachée à son terrain.',
    },
    evidenceLabel: 'Preuves',
    groups: {
      core: 'Noyau',
      systems: 'Systèmes',
      execution: 'Exécution et preuves',
      specialized: 'Expérience spécialisée',
    },
    skills: {
      'product-management': {
        title: 'Product management',
        description:
          'Périmètre, priorisation, PRD, backlog et les arbitrages KPI et MVP qui décident de la suite.',
      },
      'product-discovery': {
        title: 'Discovery et cadrage du problème',
        description:
          'Remettre le brief en question, cadrer l’espace du problème et décider de ce qu’il ne faut pas construire.',
      },
      'service-design': {
        title: 'Design de service',
        description:
          'Systèmes multi-acteurs — client, administrateur, opérateur, fournisseur — cartographiés de bout en bout.',
      },
      requirements: {
        title: 'Ingénierie des exigences',
        description:
          'Règles, états, exceptions et cas limites traduits en spécifications prêtes à implémenter.',
      },
      'ai-product-development': {
        title: 'Développement produit assisté par IA',
        description:
          'Workflows multi-agents, ingénierie du contexte et maîtrise des coûts : une architecture de workflow, pas des astuces de prompt.',
      },
      'process-operations': {
        title: 'Design des processus et des opérations',
        description:
          'Cartes de processus, modes opératoires, RACI et les chemins d’exception sur lesquels une opération tourne vraiment.',
      },
      'business-modeling': {
        title: 'Modélisation business et produit',
        description: 'Revenus, coûts, incitations et structures de partenariat modélisés avec le produit.',
      },
      'technical-pm': {
        title: 'Product management technique',
        description:
          'À l’aise sur les API, le CMS, les bases de données et les décisions de déploiement avec les ingénieurs : un PM techniquement fluide, pas un ingénieur.',
      },
      'documentation-spec': {
        title: 'Design de la documentation et des spécifications',
        description:
          'Briefs, BRD, modes opératoires et dossiers d’exécution structurés pour que le suivant agisse sans demander.',
      },
      'analytics-experimentation': {
        title: 'Analytics et expérimentation',
        description:
          'Instrumentation, tunnels, segmentation et tests A/B qui alimentent des tableaux de bord exploitables.',
      },
      'ux-direction': {
        title: 'Direction UX et design produit',
        description:
          'Parcours, hiérarchie de l’information et structure d’interaction : direction produit plutôt que finition visuelle.',
      },
      'stakeholder-management': {
        title: 'Gestion des parties prenantes et transverse',
        description:
          'Aligner produit, design, ingénierie, business, opérations et fournisseurs autour d’une décision.',
      },
      'fintech-strategy': {
        title: 'Stratégie produit fintech',
        description:
          'Produits financiers, leur économie, et la confiance qu’un paiement ou un solde doit mériter.',
      },
      'rtl-persian': {
        title: 'Design produit persan et RTL',
        description:
          'Interfaces bilingues et pensées d’abord en persan, où le RTL est une contrainte de design et non une étape de traduction.',
      },
      gamification: {
        title: 'Design de gamification',
        description:
          'Progression, compétition et motivation conçues comme des mécaniques de système, avec des cadres comme Octalysis.',
      },
      'product-function-setup': {
        title: 'Mise en place de la fonction produit',
        description:
          'Créer une fonction produit là où il n’y en avait pas : responsabilité, processus, rôles et droits de décision.',
      },
    },
  },
  evidence: {
    header: {
      tag: 'Preuves choisies',
      lead: 'Là où les compétences',
      tail: 'se sont combinées.',
      lede: 'Cinq travaux, décrits par ce qui devait se rejoindre plutôt que par un intitulé.',
    },
    items: [
      {
        label: 'Digikala — Digital Gold',
        note: 'Vision produit, campagnes, segmentation des utilisateurs et les tableaux de bord derrière.',
        capabilities: ['Product management', 'Fintech', 'Analytics'],
      },
      {
        label: 'Yaravan',
        note: 'Une plateforme de garantie bâtie sur un service après-vente que personne n’avait documenté.',
        capabilities: ['Design de service', 'Exigences', 'Développement assisté par IA'],
      },
      {
        label: 'Razhmana',
        note: 'Un audit de fichier de design devenu une architecture de 42 processus et un sas de préparation des entrées.',
        capabilities: ['Discovery', 'Design de processus', 'Documentation'],
      },
      {
        label: 'RP1 Arena',
        note: 'Une arène multi-jeux play-to-earn : mécaniques compétitives et l’économie qui les porte.',
        capabilities: ['Gamification', 'Modélisation business', 'Design produit'],
      },
      {
        label: 'Fayman',
        note: 'Une boutique persane RTL reconstruite autour des paiements iraniens et d’une infrastructure locale.',
        capabilities: ['PM technique', 'Persan et RTL', 'Fintech'],
      },
    ],
  },
  model: {
    header: {
      tag: 'Travailler entre disciplines',
      lead: 'Six domaines,',
      tail: 'une livraison.',
      lede: 'Aucun n’est le métier à lui seul. Le métier, c’est ce qui se passe à leur intersection.',
    },
    disciplines: ['Business', 'Produit', 'Design', 'Technologie', 'Opérations', 'IA'],
    outputLabel: 'Alimentent',
    output: 'Système · Décision · Livraison',
  },
  cta: {
    heading: 'Envie de voir le travail derrière ?',
    workLabel: 'Travaux',
    contactLabel: 'Me contacter',
  },
  evidenceNames: {
    a1paradise: 'A1Paradise',
    arashRezvani: 'Arash Rezvani',
    arvan: 'Arvan Cloud',
    biomaze: 'Biomaze',
    carsparency: 'Carsparency',
    digikala: 'Digikala',
    fayman: 'Fayman',
    fibona: 'Fibona',
    greenrest: 'GreenRest',
    khodro45: 'Khodro45',
    marqevon: 'Marqevon',
    nimDang: 'Nim Dang',
    oteacher: 'OTeacher',
    portfolio: 'Ce site',
    razhmana: 'Razhmana',
    renova: 'Renova+',
    rp1: 'RP1 Arena',
    vin: 'VIN',
    yaravan: 'Yaravan',
  },
}

const ja: ExperiencePageCopy = {
  title: '経歴',
  meta: {
    title: '経歴 — Sina Oshaghi',
    description:
      '10年のプロダクト業務を支えてきた能力 — ディスカバリー、サービスデザイン、要件定義、オペレーション、AI支援による実行。それぞれ実際に使われた現場と結びつけています。',
  },
  hero: {
    heading: '曖昧さを、つくれて・測れて・運用できるシステムに変える。',
    lede: 'フィンテック、クラウド、自動車、教育、小売で10年。プロダクトが何であるべきかを定義し、それが動くルールを書き、出荷を見届けられる距離で実行に関わってきました。',
  },
  spotlight: {
    header: {
      tag: '能力',
      lead: '仕事は実際に',
      tail: 'どう動くか。',
      lede: '以下のすべての土台にある四つの働き方。肩書きでもなければ、全リストでもありません。',
    },
    items: {
      discovery: {
        title: 'プロダクトディスカバリー',
        principle: 'つくる前に、理解する。',
        description: '本当の問題を見つけ、制約を描き、実行を始める前に曖昧さを減らす。',
      },
      service: {
        title: 'サービスデザイン',
        principle: '画面ではなく、サービスを設計する。',
        description:
          '顧客・運用者・管理者・取引先をひとつの流れに。どのインターフェースにも現れない部分を含めて。',
      },
      systems: {
        title: 'プロダクトシステム',
        principle: '現実に触れても壊れないルール。',
        description:
          '要件・状態・例外・運用モデルを、エンジニアリングが聞き直さずに着手できる形で書く。',
      },
      'ai-execution': {
        title: 'AI支援による実行',
        principle: 'まず文脈、次にエージェント。',
        description:
          '信頼できる情報源を文書化したマルチエージェントの流れで、AI支援の実行に説明責任を残す。',
      },
    },
  },
  matrix: {
    header: {
      tag: '能力システム',
      lead: '16の能力を、',
      tail: '4つのグループに。',
      lede: 'コアが実務を定義し、システムが支え、実行が証明し、専門経験が差をつくる。それぞれ使われた現場と結びついています。',
    },
    evidenceLabel: '根拠',
    groups: {
      core: 'コア',
      systems: 'システム',
      execution: '実行と根拠',
      specialized: '専門経験',
    },
    skills: {
      'product-management': {
        title: 'プロダクトマネジメント',
        description:
          'スコープ、優先順位、PRD、バックログ、そしてチームが次に何をつくるかを決めるKPIとMVPの判断。',
      },
      'product-discovery': {
        title: 'ディスカバリーと問題の定義',
        description: 'ブリーフを疑い、問題空間を定義し、つくるべきでないものを決める。',
      },
      'service-design': {
        title: 'サービスデザイン',
        description:
          '顧客・管理者・運用者・取引先といった多主体のシステムを、接点ごとに端から端まで描く。',
      },
      requirements: {
        title: '要件定義',
        description: 'ルール、状態、例外、エッジケースを実装可能な仕様に翻訳する。',
      },
      'ai-product-development': {
        title: 'AI支援によるプロダクト開発',
        description:
          'マルチエージェントの流れ、コンテキスト設計、コスト管理 — プロンプトの小技ではなくワークフローの設計。',
      },
      'process-operations': {
        title: 'プロセスとオペレーション設計',
        description: 'プロセスマップ、標準手順、RACI、そして現場が実際に回っている例外経路。',
      },
      'business-modeling': {
        title: 'ビジネスとプロダクトのモデリング',
        description: '収益、コスト、インセンティブ、提携構造をプロダクトと並べてモデル化する。',
      },
      'technical-pm': {
        title: 'テクニカルプロダクトマネジメント',
        description:
          'API、CMS、データベース、デプロイの判断をエンジニアと無理なく議論できる — 技術に明るいPMであり、エンジニアではありません。',
      },
      'documentation-spec': {
        title: 'ドキュメントと仕様の設計',
        description:
          'ブリーフ、BRD、標準手順、実行パッケージを、次の人が聞かずに動ける形に構造化する。',
      },
      'analytics-experimentation': {
        title: '分析と実験',
        description:
          '計測、ファネル、セグメンテーション、A/Bテストが、チームが判断できるダッシュボードに流れ込む。',
      },
      'ux-direction': {
        title: 'UX・プロダクトデザインの方向づけ',
        description:
          'ユーザーフロー、情報の階層、インタラクション構造 — 見た目の仕上げではなくプロダクトの方向づけ。',
      },
      'stakeholder-management': {
        title: 'ステークホルダーと部門横断のマネジメント',
        description:
          'プロダクト、デザイン、エンジニアリング、事業、運用、取引先をひとつの意思決定に揃える。',
      },
      'fintech-strategy': {
        title: 'フィンテックのプロダクト戦略',
        description: '金融プロダクトとその経済性、そして決済や残高が獲得しなければならない信頼。',
      },
      'rtl-persian': {
        title: 'ペルシャ語・RTLのプロダクトデザイン',
        description:
          'ペルシャ語を起点とする二言語インターフェース。RTLは翻訳工程ではなく設計条件です。',
      },
      gamification: {
        title: 'ゲーミフィケーション設計',
        description:
          '進行、競争、動機づけをシステムの仕組みとして設計する。Octalysisなどのフレームワークを用いて。',
      },
      'product-function-setup': {
        title: 'プロダクト機能の立ち上げ',
        description: '存在しなかったプロダクト機能を立ち上げる — 責任、プロセス、役割、意思決定権限。',
      },
    },
  },
  evidence: {
    header: {
      tag: '選んだ根拠',
      lead: '能力が',
      tail: '重なった場所。',
      lede: '五つの仕事を、肩書きではなく「何が噛み合う必要があったか」で説明します。',
    },
    items: [
      {
        label: 'Digikala — Digital Gold',
        note: 'プロダクトの構想、キャンペーン、ユーザーセグメンテーション、その裏のBIダッシュボード。',
        capabilities: ['プロダクトマネジメント', 'フィンテック', '分析'],
      },
      {
        label: 'Yaravan',
        note: '誰も書き残していなかったアフターサービス業務の上に築いた保証プラットフォーム。',
        capabilities: ['サービスデザイン', '要件定義', 'AI支援開発'],
      },
      {
        label: 'Razhmana',
        note: 'デザインファイルの監査が、42プロセスの体系と入力準備ゲートになった。',
        capabilities: ['ディスカバリー', 'プロセス設計', 'ドキュメント'],
      },
      {
        label: 'RP1 Arena',
        note: '複数ゲームのplay-to-earnアリーナ — 競争の仕組みと、その下の経済。',
        capabilities: ['ゲーミフィケーション', 'ビジネスモデリング', 'プロダクトデザイン'],
      },
      {
        label: 'Fayman',
        note: 'イランの決済と国内スタックを軸に組み直したペルシャ語RTLストア。',
        capabilities: ['テクニカルPM', 'ペルシャ語とRTL', 'フィンテック'],
      },
    ],
  },
  model: {
    header: {
      tag: '分野をまたいで働く',
      lead: '六つの分野、',
      tail: 'ひとつの成果。',
      lede: 'どれ単体が仕事なのではありません。仕事は、それらが交わる場所で起きます。',
    },
    disciplines: ['ビジネス', 'プロダクト', 'デザイン', 'テクノロジー', 'オペレーション', 'AI'],
    outputLabel: '流れ込む先',
    output: 'システム · 意思決定 · デリバリー',
  },
  cta: {
    heading: 'その裏にある仕事を見ますか？',
    workLabel: '仕事',
    contactLabel: 'お問い合わせ',
  },
  evidenceNames: {
    a1paradise: 'A1Paradise',
    arashRezvani: 'Arash Rezvani',
    arvan: 'Arvan Cloud',
    biomaze: 'Biomaze',
    carsparency: 'Carsparency',
    digikala: 'Digikala',
    fayman: 'Fayman',
    fibona: 'Fibona',
    greenrest: 'GreenRest',
    khodro45: 'Khodro45',
    marqevon: 'Marqevon',
    nimDang: 'Nim Dang',
    oteacher: 'OTeacher',
    portfolio: 'このサイト',
    razhmana: 'Razhmana',
    renova: 'Renova+',
    rp1: 'RP1 Arena',
    vin: 'VIN',
    yaravan: 'Yaravan',
  },
}

/**
 * The homepage teaser's own words — the short lede and the link label, and nothing else. Not
 * `as Record<Locale, …>`: an unannotated cast would let a locale go missing silently, the plain
 * annotation makes that a compile error.
 */
export const experienceTeaserCopy: Record<Locale, ExperienceTeaserCopy> = {
  en: {
    lede: 'Four ways of operating that connect ambiguity to decisions, systems and delivery.',
    linkLabel: 'Explore experience',
  },
  fa: {
    lede: 'چهار شیوهٔ کار برای رسیدن از ابهام به تصمیم، سیستم و اجرا.',
    linkLabel: 'دیدن تجربه',
  },
  ar: {
    lede: 'أربع طرائق للعمل تصل الغموض بالقرارات والأنظمة والتسليم.',
    linkLabel: 'استكشف الخبرة',
  },
  es: {
    lede: 'Cuatro formas de operar que conectan la ambigüedad con decisiones, sistemas y entrega.',
    linkLabel: 'Explorar experiencia',
  },
  de: {
    lede: 'Vier Arbeitsweisen, die Unklarheit mit Entscheidungen, Systemen und Lieferung verbinden.',
    linkLabel: 'Erfahrung ansehen',
  },
  fr: {
    lede: 'Quatre façons d’opérer qui relient l’ambiguïté aux décisions, aux systèmes et à la livraison.',
    linkLabel: 'Explorer l’expérience',
  },
  ja: {
    lede: '曖昧さを意思決定、システム、そしてデリバリーへとつなぐ四つの仕事の進め方。',
    linkLabel: '経歴を見る',
  },
}

/** Every locale, annotated rather than cast — a forgotten locale is a compile error (§46). */
export const experiencePageCopy: Record<Locale, ExperiencePageCopy> = {
  en,
  fa,
  ar,
  es,
  de,
  fr,
  ja,
}
