import type { CategoryKey } from '@/blocks/WorkflowStages/toolLogos'
import type { Locale } from '@/utilities/locale'

/**
 * The homepage's own copy in every site locale — the counterpart to `work-content.ts`'s
 * `workCopy`, and the reason `/fa`, `/ar`, `/es`, `/de`, `/fr` and `/ja` stop 404ing.
 *
 * `Record<Locale, HomeCopy>` is the point of the shape: `localization.fallback` is `false`, so a
 * locale this table forgets renders as an empty page rather than English — a missing locale must
 * be a compile error, not a runtime surprise.
 *
 * Only localized leaves live here. Structure, block types, hrefs, row keys, metric values and
 * the `index`/`code` labels stay in `home-content.ts`, shared by every locale.
 *
 * Latin `tag` strings are stored Title Case: `.eyebrow` applies `text-transform: uppercase` and
 * exempts only `:lang(fa)` / `:lang(ar)` (globals.css), so a pre-uppercased Persian tag would be
 * wrong while a Title Case Latin one is uppercased for free.
 *
 * Digits follow the locale's own existing content: Persian digits in `fa` (as `experiences.ts`
 * already writes durations), Latin digits everywhere else including `ar`, matching the Arabic
 * case-study copy already in the repo.
 */

export interface SectionHeaderCopy {
  tag: string
  lead: string
  tail: string
  /** Omitted by the metrics strip, which has no lede. */
  lede?: string
}

export interface HomeCopy {
  /** Admin/document title. */
  title: string
  meta: { title: string; description: string }
  hero: { heading: string; lede: string; primaryLabel: string; secondaryLabel: string }
  /** Four stages; `code` (S1–S4) is shared, not translated. */
  workbench: { header: SectionHeaderCopy; stages: { label: string; description: string }[] }
  /** Three tracks; `key` is shared. Only Product Design carries an `experience` value. */
  tracks: { header: SectionHeaderCopy; items: { title: string; experience?: string; description: string }[] }
  /**
   * Three metrics. `value` is localized because it is not a bare numeral — "10 yrs" carries a
   * unit word. `source` is a document filename and stays verbatim, carried into every locale by
   * the overlay rather than retyped here.
   */
  proof: { header: SectionHeaderCopy; metrics: { value: string; caption: string }[] }
  tools: { header: SectionHeaderCopy; categories: Record<CategoryKey, string> }
  /** Nine employers. `index` (A1–A9) is ornament and stays Latin; `name` takes each script's form. */
  experience: { header: SectionHeaderCopy; items: { name: string; role: string; blurb: string }[] }
  featured: { header: SectionHeaderCopy }
  contact: { heading: string; body: string; primaryLabel: string; secondaryLabel: string }
}

export const homeCopy: Record<Locale, HomeCopy> = {
  en: {
    title: 'Home',
    meta: {
      title: 'Sina Oshaghi — Product Designer & Manager',
      description:
        'Product designer and manager who also runs growth — from research to campaigns to the dashboards that prove it.',
    },
    hero: {
      heading: 'Product designer who also runs growth',
      lede: 'From research to campaigns to the dashboards that prove it — ten years across fintech, cloud, automotive, edtech and media.',
      primaryLabel: 'Selected work',
      secondaryLabel: 'Email Sina',
    },
    workbench: {
      header: {
        tag: 'Workspace',
        lead: 'How I',
        tail: 'work',
        lede: 'Own the problem, ship something real, measure what happened, and learn from it.',
      },
      stages: [
        { label: 'Own', description: 'Take a vague business problem and turn it into a clear vision and roadmap.' },
        { label: 'Ship', description: 'Design and build the product, campaign or system, end to end.' },
        {
          label: 'Measure',
          description: 'Instrument it so the dashboards say what actually happened, not what we hoped.',
        },
        { label: 'Learn', description: 'Feed the data back into the next iteration.' },
      ],
    },
    tracks: {
      header: {
        tag: 'Tracks',
        lead: 'Primarily',
        tail: 'focused on',
        lede: 'Ten years across product design, day-to-day AI tooling, and the systems that hold it together.',
      },
      items: [
        {
          title: 'Product Design',
          experience: '10 yrs',
          description:
            'Product ownership and roadmapping, interaction design, and the research that proves what shipped actually worked.',
        },
        {
          title: 'AI Workflow',
          description:
            'Day-to-day work runs through Cursor and Claude, plus the analytics stack — GA4, Amplitude, Search Console — that keeps decisions instrumented.',
        },
        {
          title: 'Design Systems',
          description:
            'Built a design system at Biomaze that let developers ship fast — the product became the first mover in its category.',
        },
      ],
    },
    proof: {
      header: { tag: 'Proof', lead: 'Ten years,', tail: 'by the numbers.' },
      metrics: [
        { value: '10 yrs', caption: 'Experience across product design and growth' },
        { value: '9', caption: 'Companies and products' },
        { value: '7', caption: 'Industries spanned' },
      ],
    },
    tools: {
      header: {
        tag: 'Tools / Stack',
        lead: 'The systems behind how I',
        tail: 'think, design & ship.',
        lede: 'Research, design, build, measurement and the infrastructure it runs on — one connected stack, not six separate toolkits.',
      },
      categories: {
        designPrototyping: 'Design & Prototyping',
        aiAgents: 'AI & Agents',
        buildDelivery: 'Build & Delivery',
        dataIntelligence: 'Data & Product Intelligence',
        growthMeasurement: 'Growth & Measurement',
        infraOperations: 'Infrastructure & Operations',
      },
    },
    experience: {
      header: {
        tag: 'Experience',
        lead: "Where I've",
        tail: 'worked',
        lede: 'Selected roles across product, design, growth and technical collaboration.',
      },
      items: [
        {
          name: 'Digikala (Digital Gold)',
          role: 'Designer / Marketer / BI developer · 2.5 yr',
          blurb:
            'Replaced spreadsheets with BI dashboards and ran the campaigns that grew acquisition and engagement.',
        },
        {
          name: 'Carsparency & Khodro45',
          role: 'Product designer · 2.5 yr',
          blurb: 'Raised sell-through with usability testing and validated prototypes across the full car marketplace.',
        },
        {
          name: 'Hadish Mall',
          role: 'Marketing · 1 yr',
          blurb:
            'Grew visitor turnout through campaigns and influencer partnerships, and proposed a mall management app.',
        },
        {
          name: 'Fibona',
          role: 'Product Manager · 2 yr',
          blurb: 'Aligned stakeholders around a new brand identity, tagline and website from the ground up.',
        },
        {
          name: 'OTeacher',
          role: 'Product Manager & designer · 1 yr',
          blurb: 'Turned educator and learner research into a validated teacher–student matchmaking roadmap.',
        },
        {
          name: 'Arvan Cloud',
          role: 'Product designer · 2 yr',
          blurb: 'Redesigned the platform around the server metrics users actually needed, lifting NPS.',
        },
        {
          name: 'Biomaze',
          role: 'Product Manager & designer · 3 yr',
          blurb: 'Built the website, education panel and a design system so developers could ship fast.',
        },
        {
          name: 'Didestan',
          role: 'UI/UX designer · 8 mos',
          blurb: 'Designed a data-driven video platform prototype from lean UX research.',
        },
        {
          name: 'A1Paradise',
          role: 'UI/UX designer · 1.2 yr',
          blurb: 'Designed gamified microgames and a desktop and B2C calling app.',
        },
      ],
    },
    featured: {
      header: {
        tag: 'Work',
        lead: 'Featured',
        tail: 'project',
        lede: 'One project from the range — product, growth and research across nine companies.',
      },
    },
    contact: {
      heading: "Let's talk",
      body: "If you're hiring, building something, or want to compare notes on product and growth — reach out.",
      primaryLabel: 'Email Sina',
      secondaryLabel: 'LinkedIn',
    },
  },

  fa: {
    title: 'خانه',
    meta: {
      title: 'سینا اوشاقی — طراح و مدیر محصول',
      description:
        'طراح و مدیر محصول که رشد را هم پیش می‌برد — از پژوهش تا کمپین تا داشبوردهایی که نتیجه را نشان می‌دهند.',
    },
    hero: {
      heading: 'طراح محصولی که رشد را هم پیش می‌برد',
      lede: 'از پژوهش تا کمپین تا داشبوردهایی که نتیجه را نشان می‌دهند — ده سال در فین‌تک، ابر، خودرو، آموزش و رسانه.',
      primaryLabel: 'کارهای منتخب',
      secondaryLabel: 'ایمیل به سینا',
    },
    workbench: {
      header: {
        tag: 'میز کار',
        lead: 'چطور',
        tail: 'کار می‌کنم',
        lede: 'مسئله را برعهده بگیر، چیزی واقعی بساز و منتشر کن، اندازه بگیر چه اتفاقی افتاد، و از آن یاد بگیر.',
      },
      stages: [
        { label: 'مالکیت', description: 'یک مسئلهٔ مبهم کسب‌وکار را به چشم‌انداز و نقشهٔ راهی روشن تبدیل می‌کنم.' },
        { label: 'ساخت', description: 'محصول، کمپین یا سیستم را از ابتدا تا انتها طراحی و اجرا می‌کنم.' },
        {
          label: 'سنجش',
          description: 'آن را ابزارگذاری می‌کنم تا داشبوردها بگویند واقعاً چه شد، نه آنچه امیدش را داشتیم.',
        },
        { label: 'یادگیری', description: 'داده را به تکرار بعدی برمی‌گردانم.' },
      ],
    },
    tracks: {
      header: {
        tag: 'مسیرها',
        lead: 'تمرکز',
        tail: 'اصلی روی',
        lede: 'ده سال در طراحی محصول، ابزارهای روزمرهٔ هوش مصنوعی، و سیستم‌هایی که همه را کنار هم نگه می‌دارند.',
      },
      items: [
        {
          title: 'طراحی محصول',
          experience: '۱۰ سال',
          description:
            'مالکیت محصول و نقشهٔ راه، طراحی تعامل، و پژوهشی که ثابت می‌کند آنچه منتشر شد واقعاً کار کرده است.',
        },
        {
          title: 'گردش‌کار هوش مصنوعی',
          description:
            'کار روزمره از Cursor و Claude می‌گذرد، در کنار پشتهٔ تحلیلی — GA4، Amplitude، Search Console — که تصمیم‌ها را اندازه‌پذیر نگه می‌دارد.',
        },
        {
          title: 'سیستم‌های طراحی',
          description:
            'در بایومیز سیستم طراحی‌ای ساختم که به توسعه‌دهنده‌ها اجازه داد سریع منتشر کنند — محصول اولین بازیگر دستهٔ خودش شد.',
        },
      ],
    },
    proof: {
      header: { tag: 'سند', lead: 'ده سال،', tail: 'به زبان عدد.' },
      metrics: [
        { value: '۱۰ سال', caption: 'تجربه در طراحی محصول و رشد' },
        { value: '۹', caption: 'شرکت و محصول' },
        { value: '۷', caption: 'صنعتی که در آن کار کرده‌ام' },
      ],
    },
    tools: {
      header: {
        tag: 'ابزارها / پشته',
        lead: 'سیستم‌هایی که پشت',
        tail: 'فکر، طراحی و انتشار من هستند.',
        lede: 'پژوهش، طراحی، ساخت، سنجش و زیرساختی که روی آن اجرا می‌شود — یک پشتهٔ به‌هم‌پیوسته، نه شش جعبه‌ابزار جدا.',
      },
      categories: {
        designPrototyping: 'طراحی و پروتوتایپ',
        aiAgents: 'هوش مصنوعی و ایجنت‌ها',
        buildDelivery: 'ساخت و تحویل',
        dataIntelligence: 'داده و هوشمندی محصول',
        growthMeasurement: 'رشد و سنجش',
        infraOperations: 'زیرساخت و عملیات',
      },
    },
    experience: {
      header: {
        tag: 'تجربه',
        lead: 'کجا',
        tail: 'کار کرده‌ام',
        lede: 'نقش‌هایی منتخب در محصول، طراحی، رشد و همکاری فنی.',
      },
      items: [
        {
          name: 'دیجی‌کالا (طلای دیجیتال)',
          role: 'طراح / بازاریاب / توسعه‌دهندهٔ BI · ۲.۵ سال',
          blurb: 'جای صفحه‌گسترده‌ها را با داشبوردهای BI گرفتم و کمپین‌هایی را اجرا کردم که جذب و تعامل را بالا برد.',
        },
        {
          name: 'کارسپرنسی و خودرو۴۵',
          role: 'طراح محصول · ۲.۵ سال',
          blurb: 'با تست کاربردپذیری و پروتوتایپ‌های اعتبارسنجی‌شده در کل مارکت‌پلیس خودرو، نرخ فروش را بالا بردم.',
        },
        {
          name: 'مجتمع هدیش',
          role: 'بازاریابی · ۱ سال',
          blurb:
            'با کمپین‌ها و همکاری با اینفلوئنسرها حضور بازدیدکننده را بیشتر کردم و اپی برای مدیریت مرکز خرید پیشنهاد دادم.',
        },
        {
          name: 'فیبونا',
          role: 'مدیر محصول · ۲ سال',
          blurb: 'ذی‌نفعان را حول هویت برند، شعار و وب‌سایتی تازه — از صفر — هم‌راستا کردم.',
        },
        {
          name: 'اوتیچر',
          role: 'مدیر محصول و طراح · ۱ سال',
          blurb: 'پژوهش مدرس و زبان‌آموز را به نقشهٔ راهِ اعتبارسنجی‌شدهٔ تطبیق معلم و دانش‌آموز تبدیل کردم.',
        },
        {
          name: 'ابر آروان',
          role: 'طراح محصول · ۲ سال',
          blurb: 'پلتفرم را حول شاخص‌های سروری که کاربران واقعاً لازم داشتند بازطراحی کردم و NPS بالا رفت.',
        },
        {
          name: 'بایومیز',
          role: 'مدیر محصول و طراح · ۳ سال',
          blurb: 'وب‌سایت، پنل آموزش و سیستم طراحی را ساختم تا توسعه‌دهنده‌ها سریع منتشر کنند.',
        },
        {
          name: 'دیدستان',
          role: 'طراح UI/UX · ۸ ماه',
          blurb: 'از دل پژوهش لین UX، پروتوتایپ یک پلتفرم ویدئوی داده‌محور را طراحی کردم.',
        },
        {
          name: 'A1Paradise',
          role: 'طراح UI/UX · ۱.۲ سال',
          blurb: 'میکروگیم‌های گیمیفای‌شده و یک اپ تماس دسکتاپ و B2C طراحی کردم.',
        },
      ],
    },
    featured: {
      header: {
        tag: 'کار',
        lead: 'پروژهٔ',
        tail: 'منتخب',
        lede: 'یک پروژه از میان دامنه‌ای از کارها — محصول، رشد و پژوهش در نُه شرکت.',
      },
    },
    contact: {
      heading: 'گفت‌وگو کنیم',
      body: 'اگر در حال استخدام‌اید، چیزی می‌سازید، یا می‌خواهید دربارهٔ محصول و رشد هم‌فکری کنیم — در تماس باشید.',
      primaryLabel: 'ایمیل به سینا',
      secondaryLabel: 'لینکدین',
    },
  },

  ar: {
    title: 'الرئيسية',
    meta: {
      title: 'سينا أوشاقي — مصمم ومدير منتج',
      description:
        'مصمم ومدير منتج يقود النمو أيضًا — من البحث إلى الحملات إلى لوحات المعلومات التي تُثبت النتيجة.',
    },
    hero: {
      heading: 'مصمم منتج يقود النمو أيضًا',
      lede: 'من البحث إلى الحملات إلى لوحات المعلومات التي تُثبت النتيجة — عشر سنوات في التقنية المالية والسحابة والسيارات والتعليم والإعلام.',
      primaryLabel: 'أعمال مختارة',
      secondaryLabel: 'راسل سينا',
    },
    workbench: {
      header: {
        tag: 'مساحة العمل',
        lead: 'كيف',
        tail: 'أعمل',
        lede: 'تملّك المشكلة، اشحن شيئًا حقيقيًا، قِس ما حدث فعلًا، ثم تعلّم منه.',
      },
      stages: [
        { label: 'التملّك', description: 'آخذ مشكلة عمل غامضة وأحوّلها إلى رؤية وخارطة طريق واضحتين.' },
        { label: 'الشحن', description: 'أصمّم وأبني المنتج أو الحملة أو النظام من البداية إلى النهاية.' },
        {
          label: 'القياس',
          description: 'أجهّزه بالقياس حتى تقول لوحات المعلومات ما حدث فعلًا، لا ما كنّا نأمله.',
        },
        { label: 'التعلّم', description: 'أُعيد البيانات إلى الدورة التالية.' },
      ],
    },
    tracks: {
      header: {
        tag: 'المسارات',
        lead: 'التركيز',
        tail: 'الأساسي على',
        lede: 'عشر سنوات في تصميم المنتج، وأدوات الذكاء الاصطناعي اليومية، والأنظمة التي تجمعها معًا.',
      },
      items: [
        {
          title: 'تصميم المنتج',
          experience: '10 سنوات',
          description:
            'ملكية المنتج وخارطة الطريق، وتصميم التفاعل، والبحث الذي يُثبت أن ما شُحن قد نجح فعلًا.',
        },
        {
          title: 'سير عمل الذكاء الاصطناعي',
          description:
            'يمرّ العمل اليومي عبر Cursor وClaude، إلى جانب حزمة التحليلات — GA4 وAmplitude وSearch Console — التي تُبقي القرارات قابلة للقياس.',
        },
        {
          title: 'أنظمة التصميم',
          description:
            'بنيتُ في Biomaze نظام تصميم سمح للمطوّرين بالشحن بسرعة — وأصبح المنتج أول المتحرّكين في فئته.',
        },
      ],
    },
    proof: {
      header: { tag: 'الدليل', lead: 'عشر سنوات،', tail: 'بالأرقام.' },
      metrics: [
        { value: '10 سنوات', caption: 'خبرة في تصميم المنتج والنمو' },
        { value: '9', caption: 'شركة ومنتج' },
        { value: '7', caption: 'قطاعًا عملتُ فيه' },
      ],
    },
    tools: {
      header: {
        tag: 'الأدوات / الحزمة',
        lead: 'الأنظمة التي تقف خلف',
        tail: 'تفكيري وتصميمي وشحني.',
        lede: 'البحث والتصميم والبناء والقياس والبنية التحتية التي تعمل عليها — حزمة واحدة مترابطة، لا ستّ صناديق أدوات منفصلة.',
      },
      categories: {
        designPrototyping: 'التصميم والنمذجة',
        aiAgents: 'الذكاء الاصطناعي والوكلاء',
        buildDelivery: 'البناء والتسليم',
        dataIntelligence: 'البيانات وذكاء المنتج',
        growthMeasurement: 'النمو والقياس',
        infraOperations: 'البنية التحتية والتشغيل',
      },
    },
    experience: {
      header: {
        tag: 'الخبرة',
        lead: 'أين',
        tail: 'عملت',
        lede: 'أدوار مختارة في المنتج والتصميم والنمو والتعاون التقني.',
      },
      items: [
        {
          name: 'ديجيكالا (الذهب الرقمي)',
          role: 'مصمم / مسوّق / مطوّر ذكاء أعمال · سنتان ونصف',
          blurb: 'استبدلتُ الجداول بلوحات معلومات ذكاء الأعمال، وأدرتُ الحملات التي رفعت الاكتساب والتفاعل.',
        },
        {
          name: 'كارسبارنسي وخودرو45',
          role: 'مصمم منتج · سنتان ونصف',
          blurb: 'رفعتُ معدّل البيع باختبارات قابلية الاستخدام ونماذج أوّلية مُتحقَّق منها عبر سوق السيارات بالكامل.',
        },
        {
          name: 'هديش مول',
          role: 'تسويق · سنة',
          blurb: 'زدتُ إقبال الزوّار عبر الحملات وشراكات المؤثّرين، واقترحتُ تطبيقًا لإدارة المركز التجاري.',
        },
        {
          name: 'فيبونا',
          role: 'مدير منتج · سنتان',
          blurb: 'واءمتُ أصحاب المصلحة حول هوية علامة وشعار وموقع جديد من الصفر.',
        },
        {
          name: 'أوتيتشر',
          role: 'مدير منتج ومصمم · سنة',
          blurb: 'حوّلتُ بحث المعلّمين والمتعلّمين إلى خارطة طريق مُتحقَّق منها لمطابقة المعلّم بالطالب.',
        },
        {
          name: 'أروان كلاود',
          role: 'مصمم منتج · سنتان',
          blurb: 'أعدتُ تصميم المنصّة حول مؤشّرات الخوادم التي احتاجها المستخدمون فعلًا، فارتفع مؤشّر NPS.',
        },
        {
          name: 'بايوميز',
          role: 'مدير منتج ومصمم · ثلاث سنوات',
          blurb: 'بنيتُ الموقع ولوحة التعليم ونظام تصميم مكّن المطوّرين من الشحن بسرعة.',
        },
        {
          name: 'ديدستان',
          role: 'مصمم واجهات وتجربة · ثمانية أشهر',
          blurb: 'صمّمتُ نموذجًا أوّليًا لمنصّة فيديو قائمة على البيانات انطلاقًا من بحث تجربة مستخدم مُقتصد.',
        },
        {
          name: 'A1Paradise',
          role: 'مصمم واجهات وتجربة · سنة وشهران',
          blurb: 'صمّمتُ ألعابًا مصغّرة مُلعَّبة وتطبيق اتصال لسطح المكتب وللمستهلك.',
        },
      ],
    },
    featured: {
      header: {
        tag: 'العمل',
        lead: 'مشروع',
        tail: 'مختار',
        lede: 'مشروع واحد من المدى — منتج ونمو وبحث عبر تسع شركات.',
      },
    },
    contact: {
      heading: 'لنتحدّث',
      body: 'إن كنت توظّف، أو تبني شيئًا، أو تريد تبادل الخبرات حول المنتج والنمو — تواصل معي.',
      primaryLabel: 'راسل سينا',
      secondaryLabel: 'لينكدإن',
    },
  },

  es: {
    title: 'Inicio',
    meta: {
      title: 'Sina Oshaghi — Diseñador y gestor de producto',
      description:
        'Diseñador y gestor de producto que además lleva el crecimiento: de la investigación a las campañas y a los paneles que lo demuestran.',
    },
    hero: {
      heading: 'Diseñador de producto que además lleva el crecimiento',
      lede: 'De la investigación a las campañas y a los paneles que lo demuestran: diez años en fintech, cloud, automoción, edtech y medios.',
      primaryLabel: 'Trabajo seleccionado',
      secondaryLabel: 'Escribir a Sina',
    },
    workbench: {
      header: {
        tag: 'Espacio de trabajo',
        lead: 'Cómo',
        tail: 'trabajo',
        lede: 'Hacerme cargo del problema, lanzar algo real, medir qué pasó y aprender de ello.',
      },
      stages: [
        { label: 'Apropiar', description: 'Tomar un problema de negocio difuso y convertirlo en una visión y una hoja de ruta claras.' },
        { label: 'Lanzar', description: 'Diseñar y construir el producto, la campaña o el sistema, de principio a fin.' },
        {
          label: 'Medir',
          description: 'Instrumentarlo para que los paneles digan lo que pasó de verdad, no lo que esperábamos.',
        },
        { label: 'Aprender', description: 'Devolver los datos a la siguiente iteración.' },
      ],
    },
    tracks: {
      header: {
        tag: 'Líneas',
        lead: 'Centrado',
        tail: 'sobre todo en',
        lede: 'Diez años entre diseño de producto, herramientas de IA en el día a día y los sistemas que lo sostienen todo.',
      },
      items: [
        {
          title: 'Diseño de producto',
          experience: '10 años',
          description:
            'Propiedad del producto y hoja de ruta, diseño de interacción y la investigación que demuestra que lo lanzado funcionó de verdad.',
        },
        {
          title: 'Flujo de trabajo con IA',
          description:
            'El día a día pasa por Cursor y Claude, más el stack de analítica — GA4, Amplitude, Search Console — que mantiene las decisiones medidas.',
        },
        {
          title: 'Sistemas de diseño',
          description:
            'Construí en Biomaze un sistema de diseño que permitió a los desarrolladores lanzar rápido: el producto se convirtió en el primero de su categoría.',
        },
      ],
    },
    proof: {
      header: { tag: 'Pruebas', lead: 'Diez años,', tail: 'en cifras.' },
      metrics: [
        { value: '10 años', caption: 'Experiencia entre diseño de producto y crecimiento' },
        { value: '9', caption: 'Empresas y productos' },
        { value: '7', caption: 'Sectores recorridos' },
      ],
    },
    tools: {
      header: {
        tag: 'Herramientas / Stack',
        lead: 'Los sistemas detrás de cómo',
        tail: 'pienso, diseño y lanzo.',
        lede: 'Investigación, diseño, construcción, medición y la infraestructura sobre la que corre: un único stack conectado, no seis cajas de herramientas sueltas.',
      },
      categories: {
        designPrototyping: 'Diseño y prototipado',
        aiAgents: 'IA y agentes',
        buildDelivery: 'Construcción y entrega',
        dataIntelligence: 'Datos e inteligencia de producto',
        growthMeasurement: 'Crecimiento y medición',
        infraOperations: 'Infraestructura y operaciones',
      },
    },
    experience: {
      header: {
        tag: 'Experiencia',
        lead: 'Dónde he',
        tail: 'trabajado',
        lede: 'Roles seleccionados en producto, diseño, crecimiento y colaboración técnica.',
      },
      items: [
        {
          name: 'Digikala (Digital Gold)',
          role: 'Diseñador / Marketer / Desarrollador BI · 2,5 años',
          blurb:
            'Sustituí las hojas de cálculo por paneles de BI y dirigí las campañas que hicieron crecer la captación y la interacción.',
        },
        {
          name: 'Carsparency & Khodro45',
          role: 'Diseñador de producto · 2,5 años',
          blurb:
            'Elevé la tasa de venta con pruebas de usabilidad y prototipos validados en todo el marketplace de coches.',
        },
        {
          name: 'Hadish Mall',
          role: 'Marketing · 1 año',
          blurb:
            'Aumenté la afluencia de visitantes con campañas y acuerdos con influencers, y propuse una app de gestión del centro comercial.',
        },
        {
          name: 'Fibona',
          role: 'Product Manager · 2 años',
          blurb: 'Alineé a las partes interesadas en torno a una nueva identidad de marca, eslogan y web desde cero.',
        },
        {
          name: 'OTeacher',
          role: 'Product Manager y diseñador · 1 año',
          blurb:
            'Convertí la investigación con docentes y estudiantes en una hoja de ruta validada de emparejamiento profesor–alumno.',
        },
        {
          name: 'Arvan Cloud',
          role: 'Diseñador de producto · 2 años',
          blurb:
            'Rediseñé la plataforma en torno a las métricas de servidor que los usuarios realmente necesitaban, subiendo el NPS.',
        },
        {
          name: 'Biomaze',
          role: 'Product Manager y diseñador · 3 años',
          blurb:
            'Construí la web, el panel de formación y un sistema de diseño para que los desarrolladores lanzaran rápido.',
        },
        {
          name: 'Didestan',
          role: 'Diseñador UI/UX · 8 meses',
          blurb: 'Diseñé el prototipo de una plataforma de vídeo basada en datos a partir de investigación lean UX.',
        },
        {
          name: 'A1Paradise',
          role: 'Diseñador UI/UX · 1,2 años',
          blurb: 'Diseñé microjuegos gamificados y una app de llamadas de escritorio y B2C.',
        },
      ],
    },
    featured: {
      header: {
        tag: 'Trabajo',
        lead: 'Proyecto',
        tail: 'destacado',
        lede: 'Un proyecto del conjunto: producto, crecimiento e investigación en nueve empresas.',
      },
    },
    contact: {
      heading: 'Hablemos',
      body: 'Si estás contratando, construyendo algo o quieres intercambiar ideas sobre producto y crecimiento, escríbeme.',
      primaryLabel: 'Escribir a Sina',
      secondaryLabel: 'LinkedIn',
    },
  },

  de: {
    title: 'Startseite',
    meta: {
      title: 'Sina Oshaghi — Produktdesigner & Produktmanager',
      description:
        'Produktdesigner und Produktmanager, der auch Growth verantwortet – von der Recherche über Kampagnen bis zu den Dashboards, die es belegen.',
    },
    hero: {
      heading: 'Produktdesigner, der auch Growth verantwortet',
      lede: 'Von der Recherche über Kampagnen bis zu den Dashboards, die es belegen – zehn Jahre in Fintech, Cloud, Automotive, Edtech und Medien.',
      primaryLabel: 'Ausgewählte Arbeiten',
      secondaryLabel: 'Sina schreiben',
    },
    workbench: {
      header: {
        tag: 'Werkbank',
        lead: 'Wie ich',
        tail: 'arbeite',
        lede: 'Das Problem übernehmen, etwas Echtes ausliefern, messen was passiert ist, und daraus lernen.',
      },
      stages: [
        { label: 'Übernehmen', description: 'Ein vages Geschäftsproblem in eine klare Vision und Roadmap überführen.' },
        { label: 'Ausliefern', description: 'Das Produkt, die Kampagne oder das System gestalten und bauen, Ende zu Ende.' },
        {
          label: 'Messen',
          description: 'So instrumentieren, dass die Dashboards sagen, was wirklich passiert ist – nicht, was wir gehofft hatten.',
        },
        { label: 'Lernen', description: 'Die Daten zurück in die nächste Iteration geben.' },
      ],
    },
    tracks: {
      header: {
        tag: 'Schwerpunkte',
        lead: 'Vor allem',
        tail: 'fokussiert auf',
        lede: 'Zehn Jahre zwischen Produktdesign, täglichem KI-Werkzeug und den Systemen, die alles zusammenhalten.',
      },
      items: [
        {
          title: 'Produktdesign',
          experience: '10 Jahre',
          description:
            'Produktverantwortung und Roadmapping, Interaktionsdesign und die Recherche, die belegt, dass das Ausgelieferte wirklich funktioniert hat.',
        },
        {
          title: 'KI-Workflow',
          description:
            'Die tägliche Arbeit läuft über Cursor und Claude, dazu der Analytics-Stack – GA4, Amplitude, Search Console – der Entscheidungen messbar hält.',
        },
        {
          title: 'Design-Systeme',
          description:
            'Bei Biomaze ein Design-System gebaut, mit dem Entwickler schnell ausliefern konnten – das Produkt wurde First Mover seiner Kategorie.',
        },
      ],
    },
    proof: {
      header: { tag: 'Belege', lead: 'Zehn Jahre,', tail: 'in Zahlen.' },
      metrics: [
        { value: '10 Jahre', caption: 'Erfahrung in Produktdesign und Growth' },
        { value: '9', caption: 'Unternehmen und Produkte' },
        { value: '7', caption: 'Branchen abgedeckt' },
      ],
    },
    tools: {
      header: {
        tag: 'Werkzeuge / Stack',
        lead: 'Die Systeme hinter meinem',
        tail: 'Denken, Gestalten und Ausliefern.',
        lede: 'Recherche, Design, Build, Messung und die Infrastruktur darunter – ein zusammenhängender Stack, nicht sechs getrennte Werkzeugkästen.',
      },
      categories: {
        designPrototyping: 'Design & Prototyping',
        aiAgents: 'KI & Agenten',
        buildDelivery: 'Build & Delivery',
        dataIntelligence: 'Daten & Produktintelligenz',
        growthMeasurement: 'Growth & Messung',
        infraOperations: 'Infrastruktur & Betrieb',
      },
    },
    experience: {
      header: {
        tag: 'Erfahrung',
        lead: 'Wo ich',
        tail: 'gearbeitet habe',
        lede: 'Ausgewählte Rollen in Produkt, Design, Growth und technischer Zusammenarbeit.',
      },
      items: [
        {
          name: 'Digikala (Digital Gold)',
          role: 'Designer / Marketer / BI-Entwickler · 2,5 Jahre',
          blurb:
            'Tabellen durch BI-Dashboards ersetzt und die Kampagnen geführt, die Neukundengewinnung und Engagement gesteigert haben.',
        },
        {
          name: 'Carsparency & Khodro45',
          role: 'Produktdesigner · 2,5 Jahre',
          blurb:
            'Die Verkaufsquote mit Usability-Tests und validierten Prototypen über den gesamten Automarktplatz hinweg erhöht.',
        },
        {
          name: 'Hadish Mall',
          role: 'Marketing · 1 Jahr',
          blurb:
            'Besucherzahlen über Kampagnen und Influencer-Partnerschaften gesteigert und eine App zur Center-Verwaltung vorgeschlagen.',
        },
        {
          name: 'Fibona',
          role: 'Product Manager · 2 Jahre',
          blurb: 'Stakeholder um eine neue Markenidentität, Tagline und Website von Grund auf ausgerichtet.',
        },
        {
          name: 'OTeacher',
          role: 'Product Manager & Designer · 1 Jahr',
          blurb:
            'Recherche mit Lehrenden und Lernenden in eine validierte Roadmap für Lehrer-Schüler-Matching übersetzt.',
        },
        {
          name: 'Arvan Cloud',
          role: 'Produktdesigner · 2 Jahre',
          blurb:
            'Die Plattform um die Servermetriken herum neu gestaltet, die Nutzer wirklich brauchten – der NPS stieg.',
        },
        {
          name: 'Biomaze',
          role: 'Product Manager & Designer · 3 Jahre',
          blurb:
            'Website, Schulungspanel und ein Design-System gebaut, damit Entwickler schnell ausliefern konnten.',
        },
        {
          name: 'Didestan',
          role: 'UI/UX-Designer · 8 Monate',
          blurb: 'Aus schlanker UX-Recherche den Prototyp einer datengetriebenen Videoplattform gestaltet.',
        },
        {
          name: 'A1Paradise',
          role: 'UI/UX-Designer · 1,2 Jahre',
          blurb: 'Gamifizierte Microgames und eine Desktop- und B2C-Calling-App gestaltet.',
        },
      ],
    },
    featured: {
      header: {
        tag: 'Arbeit',
        lead: 'Ausgewähltes',
        tail: 'Projekt',
        lede: 'Ein Projekt aus der Bandbreite – Produkt, Growth und Research über neun Unternehmen.',
      },
    },
    contact: {
      heading: 'Sprechen wir',
      body: 'Ob Sie einstellen, etwas bauen oder sich über Produkt und Growth austauschen wollen – melden Sie sich.',
      primaryLabel: 'Sina schreiben',
      secondaryLabel: 'LinkedIn',
    },
  },

  fr: {
    title: 'Accueil',
    meta: {
      title: 'Sina Oshaghi — Designer et manager produit',
      description:
        'Designer et manager produit qui pilote aussi la croissance — de la recherche aux campagnes jusqu’aux tableaux de bord qui le prouvent.',
    },
    hero: {
      heading: 'Designer produit qui pilote aussi la croissance',
      lede: 'De la recherche aux campagnes jusqu’aux tableaux de bord qui le prouvent — dix ans dans la fintech, le cloud, l’automobile, l’edtech et les médias.',
      primaryLabel: 'Travaux sélectionnés',
      secondaryLabel: 'Écrire à Sina',
    },
    workbench: {
      header: {
        tag: 'Établi',
        lead: 'Comment je',
        tail: 'travaille',
        lede: 'Prendre le problème en charge, livrer quelque chose de réel, mesurer ce qui s’est passé, et en tirer les leçons.',
      },
      stages: [
        { label: 'Prendre en charge', description: 'Transformer un problème métier flou en une vision et une feuille de route claires.' },
        { label: 'Livrer', description: 'Concevoir et construire le produit, la campagne ou le système, de bout en bout.' },
        {
          label: 'Mesurer',
          description: 'L’instrumenter pour que les tableaux de bord disent ce qui s’est réellement passé, pas ce qu’on espérait.',
        },
        { label: 'Apprendre', description: 'Réinjecter les données dans l’itération suivante.' },
      ],
    },
    tracks: {
      header: {
        tag: 'Axes',
        lead: 'Principalement',
        tail: 'centré sur',
        lede: 'Dix ans entre design produit, outillage IA au quotidien et les systèmes qui tiennent l’ensemble.',
      },
      items: [
        {
          title: 'Design produit',
          experience: '10 ans',
          description:
            'Propriété du produit et feuille de route, design d’interaction, et la recherche qui prouve que ce qui a été livré a réellement fonctionné.',
        },
        {
          title: 'Workflow IA',
          description:
            'Le quotidien passe par Cursor et Claude, plus la stack analytique — GA4, Amplitude, Search Console — qui garde les décisions mesurées.',
        },
        {
          title: 'Design systems',
          description:
            'Chez Biomaze, j’ai construit un design system qui a permis aux développeurs de livrer vite — le produit est devenu le premier de sa catégorie.',
        },
      ],
    },
    proof: {
      header: { tag: 'Preuves', lead: 'Dix ans,', tail: 'en chiffres.' },
      metrics: [
        { value: '10 ans', caption: 'Expérience entre design produit et croissance' },
        { value: '9', caption: 'Entreprises et produits' },
        { value: '7', caption: 'Secteurs parcourus' },
      ],
    },
    tools: {
      header: {
        tag: 'Outils / Stack',
        lead: 'Les systèmes derrière ma façon de',
        tail: 'penser, concevoir et livrer.',
        lede: 'Recherche, design, build, mesure et l’infrastructure qui les fait tourner — une seule stack connectée, pas six boîtes à outils séparées.',
      },
      categories: {
        designPrototyping: 'Design et prototypage',
        aiAgents: 'IA et agents',
        buildDelivery: 'Build et livraison',
        dataIntelligence: 'Données et intelligence produit',
        growthMeasurement: 'Croissance et mesure',
        infraOperations: 'Infrastructure et exploitation',
      },
    },
    experience: {
      header: {
        tag: 'Expérience',
        lead: 'Où j’ai',
        tail: 'travaillé',
        lede: 'Rôles sélectionnés en produit, design, croissance et collaboration technique.',
      },
      items: [
        {
          name: 'Digikala (Digital Gold)',
          role: 'Designer / Marketeur / Développeur BI · 2,5 ans',
          blurb:
            'J’ai remplacé les tableurs par des tableaux de bord BI et mené les campagnes qui ont fait croître l’acquisition et l’engagement.',
        },
        {
          name: 'Carsparency & Khodro45',
          role: 'Designer produit · 2,5 ans',
          blurb:
            'J’ai augmenté le taux de vente grâce aux tests d’utilisabilité et à des prototypes validés sur l’ensemble de la marketplace auto.',
        },
        {
          name: 'Hadish Mall',
          role: 'Marketing · 1 an',
          blurb:
            'J’ai fait croître la fréquentation via des campagnes et des partenariats d’influence, et proposé une app de gestion du centre commercial.',
        },
        {
          name: 'Fibona',
          role: 'Product Manager · 2 ans',
          blurb: 'J’ai aligné les parties prenantes autour d’une nouvelle identité de marque, d’une accroche et d’un site, partis de zéro.',
        },
        {
          name: 'OTeacher',
          role: 'Product Manager et designer · 1 an',
          blurb:
            'J’ai transformé la recherche auprès des enseignants et des apprenants en une feuille de route validée d’appariement professeur–élève.',
        },
        {
          name: 'Arvan Cloud',
          role: 'Designer produit · 2 ans',
          blurb:
            'J’ai repensé la plateforme autour des métriques serveur dont les utilisateurs avaient réellement besoin, faisant monter le NPS.',
        },
        {
          name: 'Biomaze',
          role: 'Product Manager et designer · 3 ans',
          blurb:
            'J’ai construit le site, le panneau de formation et un design system pour que les développeurs livrent vite.',
        },
        {
          name: 'Didestan',
          role: 'Designer UI/UX · 8 mois',
          blurb: 'J’ai conçu le prototype d’une plateforme vidéo pilotée par les données, à partir d’une recherche lean UX.',
        },
        {
          name: 'A1Paradise',
          role: 'Designer UI/UX · 1,2 an',
          blurb: 'J’ai conçu des micro-jeux gamifiés et une app d’appels desktop et B2C.',
        },
      ],
    },
    featured: {
      header: {
        tag: 'Travail',
        lead: 'Projet',
        tail: 'à la une',
        lede: 'Un projet parmi l’ensemble — produit, croissance et recherche dans neuf entreprises.',
      },
    },
    contact: {
      heading: 'Parlons-en',
      body: 'Si vous recrutez, construisez quelque chose, ou voulez échanger sur le produit et la croissance — écrivez-moi.',
      primaryLabel: 'Écrire à Sina',
      secondaryLabel: 'LinkedIn',
    },
  },

  ja: {
    title: 'ホーム',
    meta: {
      title: 'Sina Oshaghi — プロダクトデザイナー／マネージャー',
      description:
        'グロースも担うプロダクトデザイナー兼マネージャー。リサーチからキャンペーン、そしてそれを裏づけるダッシュボードまで。',
    },
    hero: {
      heading: 'グロースも担うプロダクトデザイナー',
      lede: 'リサーチからキャンペーン、そしてそれを裏づけるダッシュボードまで。フィンテック、クラウド、自動車、エドテック、メディアにわたる10年。',
      primaryLabel: '主な仕事',
      secondaryLabel: 'Sinaにメール',
    },
    workbench: {
      header: {
        tag: 'ワークスペース',
        lead: '仕事の',
        tail: '進め方',
        lede: '問題を引き受け、実際に動くものを出し、何が起きたかを測り、そこから学ぶ。',
      },
      stages: [
        { label: '引き受ける', description: '曖昧なビジネス課題を、明確なビジョンとロードマップに変える。' },
        { label: '出す', description: 'プロダクト、キャンペーン、システムを最初から最後まで設計し、つくる。' },
        {
          label: '測る',
          description: '計測を仕込み、ダッシュボードが期待ではなく実際に起きたことを語るようにする。',
        },
        { label: '学ぶ', description: 'そのデータを次のイテレーションに戻す。' },
      ],
    },
    tracks: {
      header: {
        tag: 'トラック',
        lead: '主に',
        tail: '取り組んでいること',
        lede: 'プロダクトデザイン、日常的なAIツール、そしてそれらを支えるシステムにわたる10年。',
      },
      items: [
        {
          title: 'プロダクトデザイン',
          experience: '10年',
          description:
            'プロダクトオーナーシップとロードマップ、インタラクションデザイン、そしてリリースしたものが実際に機能したと示すリサーチ。',
        },
        {
          title: 'AIワークフロー',
          description:
            '日々の仕事はCursorとClaudeを通り、GA4・Amplitude・Search Consoleという分析スタックが意思決定を計測可能に保つ。',
        },
        {
          title: 'デザインシステム',
          description:
            'Biomazeで開発者が速くリリースできるデザインシステムを構築。プロダクトはそのカテゴリの先行者になった。',
        },
      ],
    },
    proof: {
      header: { tag: '実績', lead: '10年を、', tail: '数字で。' },
      metrics: [
        { value: '10年', caption: 'プロダクトデザインとグロースの経験' },
        { value: '9', caption: '企業とプロダクト' },
        { value: '7', caption: '関わった業界' },
      ],
    },
    tools: {
      header: {
        tag: 'ツール / スタック',
        lead: '考え、デザインし、',
        tail: 'リリースするための仕組み。',
        lede: 'リサーチ、デザイン、ビルド、計測、そしてそれを動かすインフラ。6つの別々の道具箱ではなく、ひとつにつながったスタック。',
      },
      categories: {
        designPrototyping: 'デザインとプロトタイピング',
        aiAgents: 'AIとエージェント',
        buildDelivery: 'ビルドとデリバリー',
        dataIntelligence: 'データとプロダクトインテリジェンス',
        growthMeasurement: 'グロースと計測',
        infraOperations: 'インフラと運用',
      },
    },
    experience: {
      header: {
        tag: '経歴',
        lead: 'これまでの',
        tail: '仕事先',
        lede: 'プロダクト、デザイン、グロース、技術的な協働にわたる主な役割。',
      },
      items: [
        {
          name: 'Digikala（Digital Gold）',
          role: 'デザイナー／マーケター／BI開発 · 2.5年',
          blurb: 'スプレッドシートをBIダッシュボードに置き換え、獲得とエンゲージメントを伸ばしたキャンペーンを運用。',
        },
        {
          name: 'Carsparency・Khodro45',
          role: 'プロダクトデザイナー · 2.5年',
          blurb: 'ユーザビリティテストと検証済みプロトタイプで、自動車マーケットプレイス全体の成約率を引き上げた。',
        },
        {
          name: 'Hadish Mall',
          role: 'マーケティング · 1年',
          blurb: 'キャンペーンとインフルエンサー連携で来場者を増やし、モール管理アプリを提案した。',
        },
        {
          name: 'Fibona',
          role: 'プロダクトマネージャー · 2年',
          blurb: '新しいブランドアイデンティティ、タグライン、ウェブサイトをゼロから立ち上げ、関係者の合意を形成した。',
        },
        {
          name: 'OTeacher',
          role: 'プロダクトマネージャー／デザイナー · 1年',
          blurb: '教える側と学ぶ側へのリサーチを、検証済みの教師・生徒マッチングのロードマップに落とし込んだ。',
        },
        {
          name: 'Arvan Cloud',
          role: 'プロダクトデザイナー · 2年',
          blurb: 'ユーザーが実際に必要としていたサーバー指標を軸にプラットフォームを再設計し、NPSを改善した。',
        },
        {
          name: 'Biomaze',
          role: 'プロダクトマネージャー／デザイナー · 3年',
          blurb: '開発者が速くリリースできるよう、ウェブサイト、教育パネル、デザインシステムを構築した。',
        },
        {
          name: 'Didestan',
          role: 'UI/UXデザイナー · 8か月',
          blurb: 'リーンUXリサーチから、データドリブンな動画プラットフォームのプロトタイプを設計した。',
        },
        {
          name: 'A1Paradise',
          role: 'UI/UXデザイナー · 1.2年',
          blurb: 'ゲーミフィケーションを取り入れたミニゲームと、デスクトップおよびB2Cの通話アプリを設計した。',
        },
      ],
    },
    featured: {
      header: {
        tag: '仕事',
        lead: '注目の',
        tail: 'プロジェクト',
        lede: '幅広い仕事のなかから1つ。9社にわたるプロダクト、グロース、リサーチ。',
      },
    },
    contact: {
      heading: '話しましょう',
      body: '採用をお考えの方、何かをつくっている方、プロダクトとグロースについて意見を交わしたい方は、ご連絡ください。',
      primaryLabel: 'Sinaにメール',
      secondaryLabel: 'LinkedIn',
    },
  },
}
