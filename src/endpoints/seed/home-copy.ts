import { industryCountLabel } from '@/blocks/IndustryGrid/catalogue'
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
  /** Optional — some openers are a tag and a heading only. */
  lede?: string
}

export interface HomeCopy {
  /** Admin/document title. */
  title: string
  meta: { title: string; description: string }
  hero: { heading: string; lede: string; primaryLabel: string; secondaryLabel: string }
  /**
   * Five operating-loop stages; `key` (frame|map|decide|ship|measure) is shared, not translated.
   * `principle` is the ownership bracket; `loopLabel` is the return-edge caption.
   */
  workbench: {
    header: SectionHeaderCopy
    principle: string
    loopLabel: string
    stages: {
      label: string
      statement: string
      question: string
      description: string
      output: string
    }[]
  }
  /** Three tracks; `key` is shared. Only Product Design carries an `experience` value. */
  tracks: {
    header: SectionHeaderCopy
    items: { title: string; experience?: string; description: string }[]
  }
  /**
   * Three metrics, rendered as the proof strip beneath the Experience section's capabilities.
   * `value` is localized because it is not a bare numeral — "10 yrs" carries a unit word.
   * `source` is a document filename and stays verbatim, carried into every locale by the overlay
   * rather than retyped here. There is no header: the section is opened by `/experience`'s own
   * spotlight heading, so that the two can never name it differently.
   */
  proof: { metrics: { value: string; caption: string }[] }
  tools: { header: SectionHeaderCopy; categories: Record<CategoryKey, string> }
  /** Eleven employers. `index` (A1–A11) is ornament and stays Latin; `name` takes each script's form. */
  experience: { header: SectionHeaderCopy; items: { name: string; role: string; blurb: string }[] }
  /** The project mosaic's opener. Tile order and sizes are structure, not copy — see `HOME_MOSAIC`. */
  selectedWork: { header: SectionHeaderCopy }
  contact: { heading: string; body: string; primaryLabel: string; secondaryLabel: string }
}

export const homeCopy: Record<Locale, HomeCopy> = {
  en: {
    title: 'Home',
    meta: {
      title: 'Sina Oshaghi — Product Designer',
      description:
        'Product designer with ten years across fintech, cloud, automotive, edtech and media.',
    },
    hero: {
      heading: 'Product designer working across product strategy, design, growth and AI',
      lede: 'From defining the problem to designing, shipping and improving the product — ten years across fintech, cloud, automotive, edtech and media.',
      primaryLabel: 'Selected work',
      secondaryLabel: 'Email Sina',
    },
    workbench: {
      header: {
        tag: 'How I work',
        lead: 'How I',
        tail: 'work',
        lede: 'I stay with a problem from the first vague ask to the numbers after launch.',
      },
      principle: 'Own the problem — at every stage',
      loopLabel: 'Evidence reopens the model',
      stages: [
        {
          label: 'Frame',
          statement: "The brief isn't the problem.",
          question: 'What is actually wrong, and for whom?',
          description:
            "I map who's affected, what it costs and what's constrained, then restate the problem in terms the business can measure.",
          output: 'Problem statement + success metric',
        },
        {
          label: 'Map',
          statement: 'See the whole system first.',
          question: 'What system is this problem part of?',
          description:
            'Actors, operations, money and data on one model, so the interface is drawn last.',
          output: 'System & service map',
        },
        {
          label: 'Decide',
          statement: 'Choose, cut, and write it down.',
          question: 'What do we build, what do we cut, and how will we know it worked?',
          description:
            'Priorities, scope and requirements precise enough that design, engineering and operations can build without guessing.',
          output: 'Scoped requirements with metrics',
        },
        {
          label: 'Ship',
          statement: 'Make it real, then run it.',
          question: 'Does it work in the real world, including the operations behind it?',
          description:
            'Design and deliver the product, service or campaign end to end — including the operations that keep it working after launch.',
          output: 'Live product, service or campaign',
        },
        {
          label: 'Measure',
          statement: 'Let the numbers argue back.',
          question: 'What actually happened, and what does it change?',
          description:
            'Tracking is planned in the spec, before launch. What the data shows updates the model and the next decision.',
          output: 'Evidence → the next decision',
        },
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
            'I use AI every day to explore more directions before committing to one, and to prototype and build faster.',
        },
        {
          title: 'Design Systems',
          description:
            'Authored the design system under Carsparency’s four product surfaces — twelve colour ramps, a five-weight type scale and a full button state matrix.',
        },
      ],
    },
    proof: {
      metrics: [
        { value: '10 yrs', caption: 'Experience across product design and growth' },
        { value: '11', caption: 'Companies and products' },
        { value: industryCountLabel('en'), caption: 'Industries spanned' },
      ],
    },
    tools: {
      header: {
        tag: 'Tools / Stack',
        lead: 'The systems behind how I',
        tail: 'think, design & ship.',
        lede: 'Grouped by what I use each tool for, in the order the work runs: think, design, build, automate, ship and measure.',
      },
      categories: {
        knowledgeResearch: 'Think & Research',
        designPrototyping: 'Design & Creative',
        buildDelivery: 'Build',
        aiAgents: 'AI Agents & Automation',
        infraOperations: 'Ship & Run',
        growthMeasurement: 'Measure & Grow',
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
          name: 'Taha Gasht',
          role: 'Product designer & strategist · Part time',
          blurb:
            'Product design and strategy across a travel business’s booking site, design system and internal panel.',
        },
        {
          name: 'Digikala (Digital Gold)',
          role: 'Designer / Marketer / BI developer · 2.5 yr',
          blurb:
            'Replaced spreadsheets with BI dashboards and ran the campaigns that grew acquisition and engagement.',
        },
        {
          name: 'Carsparency',
          role: 'Product designer · 1 yr',
          blurb:
            'Designed the English/UAE car marketplace across Pro, operator console, inspection tool and seller web, on one design system.',
        },
        {
          name: 'Khodro45',
          role: 'Product designer · 1.5 yr',
          blurb:
            'Designed the Persian RTL dealer app for the Iran marketplace — timed auction, fair-price and escrow flows.',
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
          blurb:
            'Aligned stakeholders around a new brand identity, tagline and website from the ground up.',
        },
        {
          name: 'OTeacher',
          role: 'Product Manager & designer · 1 yr',
          blurb:
            'Turned educator and learner research into a validated teacher–student matchmaking roadmap.',
        },
        {
          name: 'Arvan Cloud',
          role: 'Product designer · 2 yr',
          blurb:
            'Redesigned the platform around the server metrics users actually needed, lifting NPS.',
        },
        {
          name: 'Biomaze',
          role: 'Product Manager & designer · 3 yr · Part time',
          blurb:
            'Designed the education panel and website pages that went live, on a design system built in Figma variables.',
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
    selectedWork: {
      header: {
        tag: 'Work',
        lead: 'Selected',
        tail: 'work',
        lede: 'Seven projects from the range — product, growth and research across eleven companies.',
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
      title: 'سینا عشاقی — طراح محصول',
      description: 'طراح محصول، با ده سال تجربه در فین‌تک، زیرساخت ابری، خودرو، آموزش و رسانه.',
    },
    hero: {
      heading: 'طراح محصولی که روی استراتژی محصول، طراحی، رشد و هوش مصنوعی کار می‌کند',
      lede: 'مسئله را تعریف می‌کنم، محصول را طراحی و عرضه می‌کنم و بعد از عرضه هم بهبودش می‌دهم. ده سال در فین‌تک، زیرساخت ابری، خودرو، آموزش و رسانه کار کرده‌ام.',
      primaryLabel: 'پروژه‌های منتخب',
      secondaryLabel: 'تماس با من',
    },
    workbench: {
      header: {
        tag: 'چطور کار می‌کنم',
        lead: 'چطور',
        tail: 'کار می‌کنم',
        lede: 'از درخواست مبهم اولیه تا سنجش نتیجه پس از عرضه، مسئولیت مسئله را می‌پذیرم.',
      },
      principle: 'مسئولیت مسئله، در تمام مراحل',
      loopLabel: 'یافته‌ها مسیر را بازنگری می‌کنند',
      stages: [
        {
          label: 'صورت‌بندی',
          statement: 'درخواست اولیه، خودِ مسئله نیست.',
          question: 'مشکل واقعی چیست و چه کسانی با آن روبه‌رو هستند؟',
          description:
            'افراد درگیر، هزینه‌ی مسئله و محدودیت‌ها را بررسی می‌کنم. بعد مسئله را طوری صورت‌بندی می‌کنم که بتوان نتیجه را سنجید.',
          output: 'تعریف مسئله و شاخص موفقیت',
        },
        {
          label: 'نقشه',
          statement: 'اول تصویر کامل را ببین.',
          question: 'این مسئله بخشی از چه سیستمی است؟',
          description:
            'آدم‌ها، عملیات، جریان مالی و داده را در یک نقشه کنار هم می‌گذارم تا پیش از طراحی رابط، خودِ سیستم روشن شود.',
          output: 'نقشه‌ی سیستم و خدمات',
        },
        {
          label: 'تصمیم',
          statement: 'انتخاب کن، کنار بگذار و ثبت کن.',
          question: 'چه چیزی می‌سازیم، چه چیزی را کنار می‌گذاریم و موفقیت را چطور می‌سنجیم؟',
          description:
            'اولویت‌ها، دامنه و نیازمندی‌ها را روشن می‌کنم تا تیم‌های طراحی، مهندسی و عملیات برای اجرا نیاز به حدس‌زدن نداشته باشند.',
          output: 'نیازمندی‌های مشخص و شاخص‌های سنجش',
        },
        {
          label: 'عرضه',
          statement: 'راه‌حل باید در عمل کار کند.',
          question: 'محصول و عملیات پشت آن، هر دو آماده‌ی اجرا هستند؟',
          description:
            'محصول، خدمت یا کمپین را تا عرضه پیش می‌برم و به عملیاتی می‌پردازم که پس از عرضه آن را سرپا نگه می‌دارد.',
          output: 'محصول، خدمت یا کمپینِ در حال اجرا',
        },
        {
          label: 'سنجش',
          statement: 'نتیجه را با داده بسنج.',
          question: 'چه اتفاقی افتاد و بر اساس آن چه چیزی باید تغییر کند؟',
          description:
            'سنجش را از همان زمان تعریف نیازمندی‌ها در نظر می‌گیرم. داده‌ها مبنای بازنگری در مدل و تصمیم بعدی‌اند.',
          output: 'شواهد برای تصمیم بعدی',
        },
      ],
    },
    tracks: {
      header: {
        tag: 'حوزه‌های تمرکز',
        lead: 'بیشتر روی',
        tail: 'این‌ها کار می‌کنم',
        lede: 'ده سال تجربه در طراحی محصول، کار روزمره با ابزارهای هوش مصنوعی و ساخت سیستم‌هایی که این کارها را به هم وصل می‌کنند.',
      },
      items: [
        {
          title: 'طراحی محصول',
          experience: '۱۰ سال',
          description:
            'از تصمیم‌های محصول و نقشه‌ی راه تا طراحی تعامل و پژوهشی که نشان می‌دهد محصول پس از عرضه چطور عمل کرده است.',
        },
        {
          title: 'جریان‌های کاری هوش مصنوعی',
          description:
            'هر روز با هوش مصنوعی کار می‌کنم. پیش از انتخاب یک مسیر، گزینه‌های بیشتری را بررسی می‌کنم و نمونه‌سازی و ساخت سریع‌تر پیش می‌رود.',
        },
        {
          title: 'سیستم‌های طراحی',
          description:
            'سیستم طراحیِ چهار محصول Carsparency را تدوین کردم: دوازده طیف رنگ، پنج وزن تایپ و ماتریس کامل حالت‌های دکمه.',
        },
      ],
    },
    proof: {
      metrics: [
        { value: '۱۰ سال', caption: 'تجربه در طراحی محصول و رشد' },
        { value: '۱۱', caption: 'شرکت و محصول' },
        { value: industryCountLabel('fa'), caption: 'حوزه‌ی فعالیت' },
      ],
    },
    tools: {
      header: {
        tag: 'ابزارها و فناوری‌ها',
        lead: 'ابزارهایی برای',
        tail: 'فکرکردن، ساختن و سنجیدن',
        lede: 'هر ابزار بر اساس کاری که با آن انجام می‌دهم دسته‌بندی شده، به ترتیب مراحل کار: فکر کردن، طراحی، ساخت، خودکارسازی، انتشار و سنجش.',
      },
      categories: {
        knowledgeResearch: 'تفکر و پژوهش',
        designPrototyping: 'طراحی و خلاقیت',
        buildDelivery: 'ساخت',
        aiAgents: 'عامل‌های هوش مصنوعی و خودکارسازی',
        infraOperations: 'انتشار و نگهداری',
        growthMeasurement: 'سنجش و رشد',
      },
    },
    experience: {
      header: {
        tag: 'تجربه',
        lead: 'کجا',
        tail: 'کار کرده‌ام',
        lede: 'نقش‌هایی در محصول، طراحی، رشد و همکاری با تیم‌های فنی.',
      },
      items: [
        {
          name: 'طاهاگشت',
          role: 'طراح و استراتژیست محصول · پاره‌وقت',
          blurb:
            'روی طراحی و استراتژی سایت رزرو، سیستم طراحی و پنل داخلی یک کسب‌وکار سفر کار کردم.',
        },
        {
          name: 'دیجی‌کالا (طلای دیجیتال)',
          role: 'طراح، بازاریاب و توسعه‌دهنده‌ی BI · ۲.۵ سال',
          blurb:
            'داشبوردهای BI را جایگزین صفحه‌گسترده‌های تیم کردم و کمپین‌هایی برای افزایش جذب و تعامل اجرا کردم.',
        },
        {
          name: 'Carsparency',
          role: 'طراح محصول · ۱ سال',
          blurb:
            'بازارگاه خودروی انگلیسی‌زبانِ امارات را در چهار بخش طراحی کردم: Pro، کنسول اپراتور، ابزار بازرسی و وب فروشنده؛ همه بر پایه‌ی یک سیستم طراحی.',
        },
        {
          name: 'Khodro45',
          role: 'طراح محصول · ۱.۵ سال',
          blurb:
            'اپ راست‌به‌چپ نمایشگاه‌داران در بازار ایران را طراحی کردم؛ با مزایده‌ی زمان‌دار، راهنمای قیمت منصفانه و فرایند تسویه‌ی امانی.',
        },
        {
          name: 'مجتمع هدیش',
          role: 'بازاریابی · ۱ سال',
          blurb:
            'با کمپین‌ها و همکاری با اینفلوئنسرها به افزایش بازدید کمک کردم و طرح یک اپ برای مدیریت مرکز خرید را پیشنهاد دادم.',
        },
        {
          name: 'فیبونا',
          role: 'مدیر محصول · ۲ سال',
          blurb: 'ذی‌نفعان را برای تدوین هویت برند، شعار و طراحی یک وب‌سایت تازه همراه کردم.',
        },
        {
          name: 'اوتیچر',
          role: 'مدیر محصول و طراح · ۱ سال',
          blurb:
            'با پژوهش درباره‌ی مدرس‌ها و زبان‌آموزان، نقشه‌ی راهی اعتبارسنجی‌شده برای تطبیق آن‌ها تدوین کردم.',
        },
        {
          name: 'ابر آروان',
          role: 'طراح محصول · ۲ سال',
          blurb:
            'پلتفرم را بر اساس شاخص‌های سروریِ موردنیاز کاربران بازطراحی کردم؛ پس از آن NPS افزایش یافت.',
        },
        {
          name: 'بایومیز',
          role: 'مدیر محصول و طراح · ۳ سال · پاره‌وقت',
          blurb:
            'پنل آموزش و صفحه‌های وب‌سایت را طراحی کردم و همه منتشر شدند؛ سیستم طراحی را هم با متغیرهای فیگما ساختم.',
        },
        {
          name: 'دیدستان',
          role: 'طراح UI/UX · ۸ ماه',
          blurb:
            'با تکیه بر پژوهش ناب UX، نمونه‌ی اولیه‌ی یک پلتفرم ویدئویی داده‌محور را طراحی کردم.',
        },
        {
          name: 'A1Paradise',
          role: 'طراح UI/UX · ۱.۲ سال',
          blurb: 'بازی‌های کوچک و یک اپ تماس برای دسکتاپ و کاربران عادی طراحی کردم.',
        },
      ],
    },
    selectedWork: {
      header: {
        tag: 'پروژه‌ها',
        lead: 'پروژه‌های',
        tail: 'منتخب',
        lede: 'هفت پروژه در حوزه‌های محصول، رشد و پژوهش، از میان تجربه‌ی همکاری با یازده شرکت.',
      },
    },
    contact: {
      heading: 'گفت‌وگو کنیم',
      body: 'اگر برای محصول، طراحی یا رشد به همکاری نیاز دارید، خوشحال می‌شوم گفت‌وگو کنیم.',
      primaryLabel: 'ایمیل به من',
      secondaryLabel: 'لینکدین',
    },
  },

  ar: {
    title: 'الرئيسية',
    meta: {
      title: 'سينا أوشاقي — مصمم منتج',
      description:
        'مصمم منتج بخبرة عشر سنوات في التقنية المالية والسحابة والسيارات والتعليم والإعلام.',
    },
    hero: {
      heading: 'مصمم منتج يعمل في استراتيجية المنتج والتصميم والنمو والذكاء الاصطناعي',
      lede: 'من تحديد المشكلة إلى تصميم المنتج وإطلاقه وتحسينه — عشر سنوات في التقنية المالية والسحابة والسيارات والتعليم والإعلام.',
      primaryLabel: 'أعمال مختارة',
      secondaryLabel: 'راسل سينا',
    },
    workbench: {
      header: {
        tag: 'كيف أعمل',
        lead: 'كيف',
        tail: 'أعمل',
        lede: 'أبقى مع المشكلة من أول طلب غامض حتى الأرقام بعد الإطلاق.',
      },
      principle: 'ملك المشكلة — في كل مرحلة',
      loopLabel: 'الأدلة تعيد فتح النموذج',
      stages: [
        {
          label: 'التأطير',
          statement: 'الموجز ليس المشكلة.',
          question: 'ما الخطأ فعليًا، ولمن؟',
          description:
            'أرسم من يتأثر، وما التكلفة، وما القيود، ثم أعيد صياغة المشكلة بمصطلحات يمكن للعمل قياسها.',
          output: 'بيان المشكلة + مقياس النجاح',
        },
        {
          label: 'الخريطة',
          statement: 'انظر إلى النظام كله أولًا.',
          question: 'أي نظام هذه المشكلة جزء منه؟',
          description:
            'الفاعلون والعمليات والمال والبيانات على نموذج واحد، حتى تُرسم الواجهة في النهاية.',
          output: 'خريطة النظام والخدمة',
        },
        {
          label: 'القرار',
          statement: 'اختر، احذف، واكتب.',
          question: 'ماذا نبني، وماذا نقطع، وكيف نعرف أنه نجح؟',
          description:
            'أولويات ونطاق ومتطلبات دقيقة بما يكفي ليبني التصميم والهندسة والعمليات بلا تخمين.',
          output: 'متطلبات محددة بمقاييس',
        },
        {
          label: 'الشحن',
          statement: 'اجعله حقيقيًا، ثم شغّله.',
          question: 'هل يعمل في العالم الحقيقي، بما في ذلك العمليات خلفه؟',
          description:
            'أصمّم وأسلّم المنتج أو الخدمة أو الحملة من البداية إلى النهاية — بما في ذلك العمليات التي تبقيه يعمل بعد الإطلاق.',
          output: 'منتج أو خدمة أو حملة حية',
        },
        {
          label: 'القياس',
          statement: 'دع الأرقام تجادل.',
          question: 'ماذا حدث فعليًا، وماذا يغيّر؟',
          description:
            'يُخطَّط للقياس في المواصفات قبل الإطلاق. ما تُظهره البيانات يحدّث النموذج والقرار التالي.',
          output: 'الأدلة → القرار التالي',
        },
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
            'أستخدم الذكاء الاصطناعي يوميًا لاستكشاف اتجاهات أكثر قبل الالتزام بأحدها، ولتسريع النمذجة الأولية والبناء.',
        },
        {
          title: 'أنظمة التصميم',
          description:
            'كتبتُ نظام التصميم تحت أربعة أسطح منتج في كارسبارنسي — اثنا عشر تدرّجًا لونيًا، ومقياس طباعي بخمسة أوزان، ومصفوفة كاملة لحالات الأزرار.',
        },
      ],
    },
    proof: {
      metrics: [
        { value: '10 سنوات', caption: 'خبرة في تصميم المنتج والنمو' },
        { value: '11', caption: 'شركة ومنتج' },
        { value: industryCountLabel('ar'), caption: 'قطاعًا عملتُ فيه' },
      ],
    },
    tools: {
      header: {
        tag: 'الأدوات / الحزمة',
        lead: 'الأنظمة التي تقف خلف',
        tail: 'تفكيري وتصميمي وشحني.',
        lede: 'مصنّفة حسب ما أستخدم كل أداة من أجله، بترتيب سير العمل: التفكير، والتصميم، والبناء، والأتمتة، والإطلاق، والقياس.',
      },
      categories: {
        knowledgeResearch: 'التفكير والبحث',
        designPrototyping: 'التصميم والإبداع',
        buildDelivery: 'البناء',
        aiAgents: 'وكلاء الذكاء الاصطناعي والأتمتة',
        infraOperations: 'الإطلاق والتشغيل',
        growthMeasurement: 'القياس والنمو',
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
          name: 'طاها غشت',
          role: 'مصمم منتج واستراتيجي · بدوام جزئي',
          blurb:
            'تصميم واستراتيجية المنتج عبر موقع الحجز ونظام التصميم واللوحة الداخلية لشركة سفر.',
        },
        {
          name: 'ديجيكالا (الذهب الرقمي)',
          role: 'مصمم / مسوّق / مطوّر ذكاء أعمال · سنتان ونصف',
          blurb:
            'استبدلتُ الجداول بلوحات معلومات ذكاء الأعمال، وأدرتُ الحملات التي رفعت الاكتساب والتفاعل.',
        },
        {
          name: 'Carsparency',
          role: 'مصمم منتج · سنة',
          blurb:
            'صمّمتُ سوق السيارات الإنجليزية/الإماراتية عبر Pro وكنسول المشغّل وأداة الفحص وويب البائع، على نظام تصميم واحد.',
        },
        {
          name: 'Khodro45',
          role: 'مصمم منتج · سنة ونصف',
          blurb:
            'صمّمتُ تطبيق التجّار الفارسي RTL لسوق إيران — مزاد موقّت وسعر عادل وتدفّقات الضمان.',
        },
        {
          name: 'هديش مول',
          role: 'تسويق · سنة',
          blurb:
            'زدتُ إقبال الزوّار عبر الحملات وشراكات المؤثّرين، واقترحتُ تطبيقًا لإدارة المركز التجاري.',
        },
        {
          name: 'فيبونا',
          role: 'مدير منتج · سنتان',
          blurb: 'واءمتُ أصحاب المصلحة حول هوية علامة وشعار وموقع جديد من الصفر.',
        },
        {
          name: 'أوتيتشر',
          role: 'مدير منتج ومصمم · سنة',
          blurb:
            'حوّلتُ بحث المعلّمين والمتعلّمين إلى خارطة طريق مُتحقَّق منها لمطابقة المعلّم بالطالب.',
        },
        {
          name: 'أروان كلاود',
          role: 'مصمم منتج · سنتان',
          blurb:
            'أعدتُ تصميم المنصّة حول مؤشّرات الخوادم التي احتاجها المستخدمون فعلًا، فارتفع مؤشّر NPS.',
        },
        {
          name: 'بايوميز',
          role: 'مدير منتج ومصمم · ثلاث سنوات · بدوام جزئي',
          blurb: 'صمّمتُ لوحة التعليم وصفحات الموقع التي أُطلقت كلها، ونظام تصميم بُني بمتغيرات Figma.',
        },
        {
          name: 'ديدستان',
          role: 'مصمم واجهات وتجربة · ثمانية أشهر',
          blurb:
            'صمّمتُ نموذجًا أوّليًا لمنصّة فيديو قائمة على البيانات انطلاقًا من بحث تجربة مستخدم مُقتصد.',
        },
        {
          name: 'A1Paradise',
          role: 'مصمم واجهات وتجربة · سنة وشهران',
          blurb: 'صمّمتُ ألعابًا مصغّرة مُلعَّبة وتطبيق اتصال لسطح المكتب وللمستهلك.',
        },
      ],
    },
    selectedWork: {
      header: {
        tag: 'العمل',
        lead: 'أعمال',
        tail: 'مختارة',
        lede: 'سبعة مشاريع من المدى — منتج ونمو وبحث عبر إحدى عشرة شركة.',
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
      title: 'Sina Oshaghi — Diseñador de producto',
      description:
        'Diseñador de producto con diez años de experiencia en fintech, cloud, automoción, edtech y medios.',
    },
    hero: {
      heading:
        'Diseñador de producto que trabaja en estrategia de producto, diseño, crecimiento e IA',
      lede: 'Desde definir el problema hasta diseñar, lanzar y mejorar el producto: diez años en fintech, cloud, automoción, edtech y medios.',
      primaryLabel: 'Trabajo seleccionado',
      secondaryLabel: 'Escribir a Sina',
    },
    workbench: {
      header: {
        tag: 'Cómo trabajo',
        lead: 'Cómo',
        tail: 'trabajo',
        lede: 'Acompaño el problema desde la primera petición vaga hasta los números tras el lanzamiento.',
      },
      principle: 'Dueño del problema — en cada etapa',
      loopLabel: 'La evidencia reabre el modelo',
      stages: [
        {
          label: 'Enmarcar',
          statement: 'El brief no es el problema.',
          question: '¿Qué está mal de verdad, y para quién?',
          description:
            'Mapeo a quién afecta, cuánto cuesta y qué lo limita, y reformulo el problema en términos que el negocio pueda medir.',
          output: 'Enunciado del problema + métrica de éxito',
        },
        {
          label: 'Mapear',
          statement: 'Primero el sistema entero.',
          question: '¿De qué sistema forma parte este problema?',
          description:
            'Actores, operaciones, dinero y datos en un solo modelo, para que la interfaz se dibuje al final.',
          output: 'Mapa de sistema y servicio',
        },
        {
          label: 'Decidir',
          statement: 'Elegir, cortar y escribirlo.',
          question: '¿Qué construimos, qué cortamos y cómo sabremos que funcionó?',
          description:
            'Prioridades, alcance y requisitos lo bastante precisos para que diseño, ingeniería y operaciones construyan sin adivinar.',
          output: 'Requisitos acotados con métricas',
        },
        {
          label: 'Lanzar',
          statement: 'Hazlo real, luego opéralo.',
          question: '¿Funciona en el mundo real, incluidas las operaciones detrás?',
          description:
            'Diseño y entrego el producto, servicio o campaña de extremo a extremo — incluidas las operaciones que lo mantienen tras el lanzamiento.',
          output: 'Producto, servicio o campaña en vivo',
        },
        {
          label: 'Medir',
          statement: 'Que los números respondan.',
          question: '¿Qué pasó de verdad, y qué cambia?',
          description:
            'La medición se planifica en la especificación, antes del lanzamiento. Lo que muestran los datos actualiza el modelo y la siguiente decisión.',
          output: 'Evidencia → la siguiente decisión',
        },
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
            'Uso IA a diario para explorar más direcciones antes de decidirme por una, y para prototipar y construir más rápido.',
        },
        {
          title: 'Sistemas de diseño',
          description:
            'Escribí el sistema de diseño bajo las cuatro superficies de producto de Carsparency: doce rampas de color, una escala tipográfica de cinco pesos y una matriz completa de estados de botón.',
        },
      ],
    },
    proof: {
      metrics: [
        { value: '10 años', caption: 'Experiencia entre diseño de producto y crecimiento' },
        { value: '11', caption: 'Empresas y productos' },
        { value: industryCountLabel('es'), caption: 'Sectores recorridos' },
      ],
    },
    tools: {
      header: {
        tag: 'Herramientas / Stack',
        lead: 'Los sistemas detrás de cómo',
        tail: 'pienso, diseño y lanzo.',
        lede: 'Agrupadas según para qué uso cada herramienta, en el orden en que avanza el trabajo: pensar, diseñar, construir, automatizar, desplegar y medir.',
      },
      categories: {
        knowledgeResearch: 'Pensamiento e investigación',
        designPrototyping: 'Diseño y creatividad',
        buildDelivery: 'Desarrollo',
        aiAgents: 'Agentes de IA y automatización',
        infraOperations: 'Despliegue y operación',
        growthMeasurement: 'Medición y crecimiento',
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
          name: 'Taha Gasht',
          role: 'Diseñador de producto y estratega · Media jornada',
          blurb:
            'Diseño y estrategia de producto para el sitio de reservas, el sistema de diseño y el panel interno de una empresa de viajes.',
        },
        {
          name: 'Digikala (Digital Gold)',
          role: 'Diseñador / Marketer / Desarrollador BI · 2,5 años',
          blurb:
            'Sustituí las hojas de cálculo por paneles de BI y dirigí las campañas que hicieron crecer la captación y la interacción.',
        },
        {
          name: 'Carsparency',
          role: 'Diseñador de producto · 1 año',
          blurb:
            'Diseñé el marketplace de coches en inglés/EAU en Pro, consola del operador, herramienta de inspección y web del vendedor, sobre un mismo sistema de diseño.',
        },
        {
          name: 'Khodro45',
          role: 'Diseñador de producto · 1,5 años',
          blurb:
            'Diseñé la app de concesionarios en persa RTL para el marketplace de Irán: subasta temporizada, precio justo y flujos de custodia.',
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
          blurb:
            'Alineé a las partes interesadas en torno a una nueva identidad de marca, eslogan y web desde cero.',
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
          role: 'Product Manager y diseñador · 3 años · Media jornada',
          blurb:
            'Diseñé el panel de formación y las páginas web que salieron a producción, con un sistema de diseño en variables de Figma.',
        },
        {
          name: 'Didestan',
          role: 'Diseñador UI/UX · 8 meses',
          blurb:
            'Diseñé el prototipo de una plataforma de vídeo basada en datos a partir de investigación lean UX.',
        },
        {
          name: 'A1Paradise',
          role: 'Diseñador UI/UX · 1,2 años',
          blurb: 'Diseñé microjuegos gamificados y una app de llamadas de escritorio y B2C.',
        },
      ],
    },
    selectedWork: {
      header: {
        tag: 'Trabajo',
        lead: 'Trabajo',
        tail: 'seleccionado',
        lede: 'Siete proyectos del conjunto: producto, crecimiento e investigación en once empresas.',
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
      title: 'Sina Oshaghi — Produktdesigner',
      description:
        'Produktdesigner mit zehn Jahren Erfahrung in Fintech, Cloud, Automotive, Edtech und Medien.',
    },
    hero: {
      heading: 'Produktdesigner für Produktstrategie, Design, Growth und KI',
      lede: 'Ich definiere das Problem, gestalte und launche das Produkt und verbessere es danach weiter – zehn Jahre in Fintech, Cloud, Automotive, Edtech und Medien.',
      primaryLabel: 'Ausgewählte Arbeiten',
      secondaryLabel: 'Sina schreiben',
    },
    workbench: {
      header: {
        tag: 'Wie ich arbeite',
        lead: 'Wie ich',
        tail: 'arbeite',
        lede: 'Ich bleibe an einem Problem dran, vom ersten vagen Auftrag bis zu den Zahlen nach dem Launch.',
      },
      principle: 'Das Problem übernehmen — in jeder Phase',
      loopLabel: 'Evidenz öffnet das Modell erneut',
      stages: [
        {
          label: 'Rahmen',
          statement: 'Das Briefing ist nicht das Problem.',
          question: 'Was ist wirklich falsch, und für wen?',
          description:
            'Ich kartiere, wer betroffen ist, was es kostet und was begrenzt, und formuliere das Problem so um, dass das Business es messen kann.',
          output: 'Problemstellung + Erfolgsmetrik',
        },
        {
          label: 'Kartieren',
          statement: 'Zuerst das ganze System sehen.',
          question: 'Zu welchem System gehört dieses Problem?',
          description:
            'Akteure, Betrieb, Geld und Daten auf einem Modell, damit die Oberfläche zuletzt gezeichnet wird.',
          output: 'System- und Servicekarte',
        },
        {
          label: 'Entscheiden',
          statement: 'Wählen, streichen, aufschreiben.',
          question: 'Was bauen wir, was streichen wir, und woran merken wir, dass es wirkt?',
          description:
            'Prioritäten, Scope und Anforderungen so präzise, dass Design, Engineering und Betrieb ohne Raten bauen können.',
          output: 'Abgegrenzte Anforderungen mit Metriken',
        },
        {
          label: 'Ausliefern',
          statement: 'Real machen, dann betreiben.',
          question: 'Funktioniert es in der Realität — inklusive dem Betrieb dahinter?',
          description:
            'Produkt, Service oder Kampagne Ende zu Ende gestalten und liefern — inklusive dem Betrieb, der es nach dem Launch am Laufen hält.',
          output: 'Live-Produkt, -Service oder -Kampagne',
        },
        {
          label: 'Messen',
          statement: 'Die Zahlen sollen antworten.',
          question: 'Was ist wirklich passiert, und was ändert es?',
          description:
            'Die Messung wird in der Spezifikation geplant, vor dem Launch. Was die Daten zeigen, aktualisiert das Modell und die nächste Entscheidung.',
          output: 'Evidenz → die nächste Entscheidung',
        },
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
            'Ich nutze KI täglich, um mehr Richtungen zu prüfen, bevor ich mich festlege, und um schneller zu prototypen und zu bauen.',
        },
        {
          title: 'Design-Systeme',
          description:
            'Das Designsystem unter Carsparencys vier Produktoberflächen verfasst – zwölf Farbrampen, eine Typo-Skala mit fünf Schnitten und eine vollständige Button-Zustandsmatrix.',
        },
      ],
    },
    proof: {
      metrics: [
        { value: '10 Jahre', caption: 'Erfahrung in Produktdesign und Growth' },
        { value: '11', caption: 'Unternehmen und Produkte' },
        { value: industryCountLabel('de'), caption: 'Branchen abgedeckt' },
      ],
    },
    tools: {
      header: {
        tag: 'Werkzeuge / Stack',
        lead: 'Die Systeme hinter meinem',
        tail: 'Denken, Gestalten und Ausliefern.',
        lede: 'Geordnet danach, wofür ich jedes Werkzeug nutze, in der Reihenfolge der Arbeit: denken, gestalten, entwickeln, automatisieren, ausliefern und messen.',
      },
      categories: {
        knowledgeResearch: 'Denken & Recherche',
        designPrototyping: 'Design & Kreation',
        buildDelivery: 'Entwicklung',
        aiAgents: 'KI-Agenten & Automatisierung',
        infraOperations: 'Deployment & Betrieb',
        growthMeasurement: 'Messung & Wachstum',
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
          name: 'Taha Gasht',
          role: 'Produktdesigner & Stratege · Teilzeit',
          blurb:
            'Produktdesign und -strategie für Buchungsseite, Designsystem und internes Panel eines Reiseunternehmens.',
        },
        {
          name: 'Digikala (Digital Gold)',
          role: 'Designer / Marketer / BI-Entwickler · 2,5 Jahre',
          blurb:
            'Tabellen durch BI-Dashboards ersetzt und die Kampagnen geführt, die Neukundengewinnung und Engagement gesteigert haben.',
        },
        {
          name: 'Carsparency',
          role: 'Produktdesigner · 1 Jahr',
          blurb:
            'Den englischsprachigen/VAE-Automarktplatz über Pro, Operator-Konsole, Prüfwerkzeug und Verkäufer-Website gestaltet — auf einem Designsystem.',
        },
        {
          name: 'Khodro45',
          role: 'Produktdesigner · 1,5 Jahre',
          blurb:
            'Die persische RTL-Händler-App für den iranischen Marktplatz gestaltet — zeitgesteuerte Auktion, Fair Price und Treuhand-Flows.',
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
          blurb:
            'Stakeholder um eine neue Markenidentität, Tagline und Website von Grund auf ausgerichtet.',
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
          role: 'Product Manager & Designer · 3 Jahre · Teilzeit',
          blurb:
            'Schulungspanel und Website-Seiten gestaltet, die alle live gingen, auf einem Design-System aus Figma-Variablen.',
        },
        {
          name: 'Didestan',
          role: 'UI/UX-Designer · 8 Monate',
          blurb:
            'Aus schlanker UX-Recherche den Prototyp einer datengetriebenen Videoplattform gestaltet.',
        },
        {
          name: 'A1Paradise',
          role: 'UI/UX-Designer · 1,2 Jahre',
          blurb: 'Gamifizierte Microgames und eine Desktop- und B2C-Calling-App gestaltet.',
        },
      ],
    },
    selectedWork: {
      header: {
        tag: 'Arbeit',
        lead: 'Ausgewählte',
        tail: 'Arbeiten',
        lede: 'Sieben Projekte aus der Bandbreite – Produkt, Growth und Research über elf Unternehmen.',
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
      title: 'Sina Oshaghi — Designer produit',
      description:
        'Designer produit, dix ans d’expérience dans la fintech, le cloud, l’automobile, l’edtech et les médias.',
    },
    hero: {
      heading: 'Designer produit, entre stratégie produit, design, croissance et IA',
      lede: 'De la définition du problème à la conception, au lancement et à l’amélioration du produit — dix ans dans la fintech, le cloud, l’automobile, l’edtech et les médias.',
      primaryLabel: 'Travaux sélectionnés',
      secondaryLabel: 'Écrire à Sina',
    },
    workbench: {
      header: {
        tag: 'Comment je travaille',
        lead: 'Comment je',
        tail: 'travaille',
        lede: 'J’accompagne un problème de la première demande floue jusqu’aux chiffres après le lancement.',
      },
      principle: 'Propriétaire du problème — à chaque étape',
      loopLabel: 'Les preuves rouvrent le modèle',
      stages: [
        {
          label: 'Cadrer',
          statement: 'Le brief n’est pas le problème.',
          question: 'Qu’est-ce qui ne va vraiment pas, et pour qui ?',
          description:
            'Je cartographie qui est touché, ce que ça coûte et ce qui contraint, puis je reformule le problème en termes mesurables pour le métier.',
          output: 'Énoncé du problème + métrique de succès',
        },
        {
          label: 'Cartographier',
          statement: 'Voir d’abord tout le système.',
          question: 'De quel système ce problème fait-il partie ?',
          description:
            'Acteurs, opérations, argent et données sur un seul modèle, pour que l’interface soit dessinée en dernier.',
          output: 'Carte système et service',
        },
        {
          label: 'Décider',
          statement: 'Choisir, couper, écrire.',
          question:
            'Que construisons-nous, que coupons-nous, et comment saurons-nous que ça a marché ?',
          description:
            'Priorités, périmètre et exigences assez précises pour que design, ingénierie et opérations construisent sans deviner.',
          output: 'Exigences cadrées avec métriques',
        },
        {
          label: 'Livrer',
          statement: 'Le rendre réel, puis l’opérer.',
          question: 'Est-ce que ça marche dans le monde réel, y compris les opérations derrière ?',
          description:
            'Je conçois et livre le produit, le service ou la campagne de bout en bout — y compris les opérations qui le maintiennent après le lancement.',
          output: 'Produit, service ou campagne en live',
        },
        {
          label: 'Mesurer',
          statement: 'Que les chiffres répondent.',
          question: 'Qu’est-il vraiment arrivé, et qu’est-ce que ça change ?',
          description:
            'La mesure est prévue dans la spécification, avant le lancement. Ce que montrent les données met à jour le modèle et la décision suivante.',
          output: 'Preuves → la décision suivante',
        },
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
            'J’utilise l’IA au quotidien pour explorer plus de pistes avant d’en choisir une, et pour prototyper et construire plus vite.',
        },
        {
          title: 'Design systems',
          description:
            'J’ai écrit le design system sous les quatre surfaces produit de Carsparency — douze rampes de couleur, une échelle typographique à cinq graisses et une matrice complète d’états de bouton.',
        },
      ],
    },
    proof: {
      metrics: [
        { value: '10 ans', caption: 'Expérience entre design produit et croissance' },
        { value: '11', caption: 'Entreprises et produits' },
        { value: industryCountLabel('fr'), caption: 'Secteurs parcourus' },
      ],
    },
    tools: {
      header: {
        tag: 'Outils / Stack',
        lead: 'Les systèmes derrière ma façon de',
        tail: 'penser, concevoir et livrer.',
        lede: 'Classés selon l’usage que j’en fais, dans l’ordre du travail : réfléchir, concevoir, développer, automatiser, déployer et mesurer.',
      },
      categories: {
        knowledgeResearch: 'Réflexion et recherche',
        designPrototyping: 'Design et création',
        buildDelivery: 'Développement',
        aiAgents: 'Agents IA et automatisation',
        infraOperations: 'Déploiement et exploitation',
        growthMeasurement: 'Mesure et croissance',
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
          name: 'Taha Gasht',
          role: 'Designer produit & stratège · Temps partiel',
          blurb:
            'Design et stratégie produit pour le site de réservation, le design system et le panneau interne d’une entreprise de voyage.',
        },
        {
          name: 'Digikala (Digital Gold)',
          role: 'Designer / Marketeur / Développeur BI · 2,5 ans',
          blurb:
            'J’ai remplacé les tableurs par des tableaux de bord BI et mené les campagnes qui ont fait croître l’acquisition et l’engagement.',
        },
        {
          name: 'Carsparency',
          role: 'Designer produit · 1 an',
          blurb:
            'J’ai conçu la marketplace auto anglophone/Émirats sur Pro, console opérateur, outil d’inspection et web vendeur, sur un même design system.',
        },
        {
          name: 'Khodro45',
          role: 'Designer produit · 1,5 an',
          blurb:
            'J’ai conçu l’app concessionnaires persane RTL pour le marketplace iranien — enchère minutée, prix équitable et flux d’escrow.',
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
          blurb:
            'J’ai aligné les parties prenantes autour d’une nouvelle identité de marque, d’une accroche et d’un site, partis de zéro.',
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
          role: 'Product Manager et designer · 3 ans · Temps partiel',
          blurb:
            'J’ai conçu le panneau de formation et les pages du site, tous mis en ligne, sur un design system en variables Figma.',
        },
        {
          name: 'Didestan',
          role: 'Designer UI/UX · 8 mois',
          blurb:
            'J’ai conçu le prototype d’une plateforme vidéo pilotée par les données, à partir d’une recherche lean UX.',
        },
        {
          name: 'A1Paradise',
          role: 'Designer UI/UX · 1,2 an',
          blurb: 'J’ai conçu des micro-jeux gamifiés et une app d’appels desktop et B2C.',
        },
      ],
    },
    selectedWork: {
      header: {
        tag: 'Travail',
        lead: 'Travaux',
        tail: 'sélectionnés',
        lede: 'Sept projets parmi l’ensemble — produit, croissance et recherche dans onze entreprises.',
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
      title: 'Sina Oshaghi — プロダクトデザイナー',
      description:
        'フィンテック、クラウド、自動車、エドテック、メディアで10年の経験を持つプロダクトデザイナー。',
    },
    hero: {
      heading: 'プロダクト戦略、デザイン、グロース、AIに取り組むプロダクトデザイナー',
      lede: '課題の定義から、プロダクトのデザイン、リリース、改善まで。フィンテック、クラウド、自動車、エドテック、メディアにわたる10年。',
      primaryLabel: '主な仕事',
      secondaryLabel: 'Sinaにメール',
    },
    workbench: {
      header: {
        tag: '仕事の進め方',
        lead: '仕事の',
        tail: '進め方',
        lede: '最初の曖昧な依頼から、ローンチ後の数字まで、ひとつの問題に向き合い続ける。',
      },
      principle: '問題を引き受ける — すべての段階で',
      loopLabel: '証拠がモデルを再び開く',
      stages: [
        {
          label: 'フレーミング',
          statement: 'ブリーフは問題ではない。',
          question: '本当に何がおかしく、誰のためか？',
          description:
            '誰が影響を受け、何がコストで、何が制約かを地図にし、ビジネスが測れる言葉で問題を言い直す。',
          output: '問題定義 + 成功指標',
        },
        {
          label: 'マップ',
          statement: 'まずシステム全体を見る。',
          question: 'この問題はどのシステムの一部か？',
          description:
            'アクター、運用、お金、データを一つのモデルにまとめ、インターフェースは最後に描く。',
          output: 'システム＆サービスマップ',
        },
        {
          label: '決定',
          statement: '選び、切り、書き留める。',
          question: '何を作り、何を切り、どうやって効いたと知るか？',
          description:
            'デザイン・エンジニアリング・運用が推測なしで作れる精度の優先順位、スコープ、要件。',
          output: '指標付きのスコープ済み要件',
        },
        {
          label: '出荷',
          statement: '現実にして、動かす。',
          question: '裏側の運用も含め、現実世界で動くか？',
          description:
            'プロダクト、サービス、キャンペーンを端から端まで設計・納品する — ローンチ後も動かし続ける運用を含めて。',
          output: 'ライブのプロダクト / サービス / キャンペーン',
        },
        {
          label: '測定',
          statement: '数字に反論させる。',
          question: '実際に何が起き、何が変わるか？',
          description:
            '計測はリリース前に仕様の段階で計画する。データが示すものが、モデルと次の決定を更新する。',
          output: '証拠 → 次の決定',
        },
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
            '毎日AIを使い、ひとつに決める前により多くの方向性を検討し、プロトタイピングと実装を速めている。',
        },
        {
          title: 'デザインシステム',
          description:
            'Carsparencyの4つのプロダクト面を支えるデザインシステムを設計。12のカラーランプ、5ウェイトのタイプスケール、ボタン状態の完全なマトリクス。',
        },
      ],
    },
    proof: {
      metrics: [
        { value: '10年', caption: 'プロダクトデザインとグロースの経験' },
        { value: '11', caption: '企業とプロダクト' },
        { value: industryCountLabel('ja'), caption: '関わった業界' },
      ],
    },
    tools: {
      header: {
        tag: 'ツール / スタック',
        lead: '考え、デザインし、',
        tail: 'リリースするための仕組み。',
        lede: 'ツールは使い道ごとに、仕事の流れの順に並べています。考える、デザインする、つくる、自動化する、届ける、測る。',
      },
      categories: {
        knowledgeResearch: '思考とリサーチ',
        designPrototyping: 'デザインとクリエイティブ',
        buildDelivery: '開発',
        aiAgents: 'AIエージェントと自動化',
        infraOperations: 'デプロイと運用',
        growthMeasurement: '計測とグロース',
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
          name: 'Taha Gasht',
          role: 'プロダクトデザイナー兼ストラテジスト · パートタイム',
          blurb:
            '旅行事業の予約サイト、デザインシステム、社内管理画面にわたるプロダクトデザインと戦略。',
        },
        {
          name: 'Digikala（Digital Gold）',
          role: 'デザイナー／マーケター／BI開発 · 2.5年',
          blurb:
            'スプレッドシートをBIダッシュボードに置き換え、獲得とエンゲージメントを伸ばしたキャンペーンを運用。',
        },
        {
          name: 'Carsparency',
          role: 'プロダクトデザイナー · 1年',
          blurb:
            '英語圏／UAEの自動車マーケットプレイスを、Pro・オペレーターコンソール・点検ツール・出品者ウェブとして1つのデザインシステム上に設計。',
        },
        {
          name: 'Khodro45',
          role: 'プロダクトデザイナー · 1.5年',
          blurb:
            'イラン向けマーケットプレイスのペルシア語RTLディーラーアプリを設計。時間制オークション、公正価格、エスクローフロー。',
        },
        {
          name: 'Hadish Mall',
          role: 'マーケティング · 1年',
          blurb: 'キャンペーンとインフルエンサー連携で来場者を増やし、モール管理アプリを提案した。',
        },
        {
          name: 'Fibona',
          role: 'プロダクトマネージャー · 2年',
          blurb:
            '新しいブランドアイデンティティ、タグライン、ウェブサイトをゼロから立ち上げ、関係者の合意を形成した。',
        },
        {
          name: 'OTeacher',
          role: 'プロダクトマネージャー／デザイナー · 1年',
          blurb:
            '教える側と学ぶ側へのリサーチを、検証済みの教師・生徒マッチングのロードマップに落とし込んだ。',
        },
        {
          name: 'Arvan Cloud',
          role: 'プロダクトデザイナー · 2年',
          blurb:
            'ユーザーが実際に必要としていたサーバー指標を軸にプラットフォームを再設計し、NPSを改善した。',
        },
        {
          name: 'Biomaze',
          role: 'プロダクトマネージャー／デザイナー · 3年 · パートタイム',
          blurb:
            '教育パネルとウェブサイトの各ページをデザインし、すべて公開された。デザインシステムはFigma変数で構築した。',
        },
        {
          name: 'Didestan',
          role: 'UI/UXデザイナー · 8か月',
          blurb:
            'リーンUXリサーチから、データドリブンな動画プラットフォームのプロトタイプを設計した。',
        },
        {
          name: 'A1Paradise',
          role: 'UI/UXデザイナー · 1.2年',
          blurb:
            'ゲーミフィケーションを取り入れたミニゲームと、デスクトップおよびB2Cの通話アプリを設計した。',
        },
      ],
    },
    selectedWork: {
      header: {
        tag: '仕事',
        lead: '主な',
        tail: '仕事',
        lede: '幅広い仕事のなかから7つ。11社にわたるプロダクト、グロース、リサーチ。',
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
