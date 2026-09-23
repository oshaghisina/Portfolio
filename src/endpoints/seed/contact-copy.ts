import type { Locale } from '@/utilities/locale'

/**
 * The `/contact` page and its form, in every site locale.
 *
 * Hero eyebrow is locale chrome (like homepage disciplines). Headline, aside, paths, form labels,
 * and closing notes are written into Payload by the contact translation seed.
 */

export interface ContactPathCopy {
  index: string
  title: string
  description: string
  ctaLabel: string
}

export interface ContactCopy {
  /** Admin/document title. */
  title: string
  meta: { title: string; description: string }
  /** PageOpener eyebrow — code-owned chrome, not a CMS field. */
  eyebrow: string
  /** Hero h1. */
  headline: string
  /** Right-column context beside the headline. */
  aside: string
  /** Heading above the form grid. */
  sectionTitle: string
  paths: {
    email: ContactPathCopy
    form: ContactPathCopy
  }
  /** Reply expectation + privacy, seeded as closingNote rich text. */
  closingNote: string
  form: {
    submitLabel: string
    /** Confirmation heading after submit. */
    confirmationTitle: string
    /** Confirmation body after submit. */
    confirmation: string
    emailSubject: string
    emailBody: string
    labels: {
      fullName: string
      email: string
      company: string
      projectType: string
      message: string
    }
    /** Stable English `value`; labels localized per locale. */
    projectTypes: Array<{ value: string; label: string }>
  }
}

const PROJECT_TYPE_VALUES = [
  'product',
  'service-operations',
  'design',
  'ai-automation',
  'growth',
  'research-strategy',
  'other',
] as const

function projectTypes(labels: [string, string, string, string, string, string, string]) {
  return PROJECT_TYPE_VALUES.map((value, i) => ({ value, label: labels[i]! }))
}

export const contactCopy: Record<Locale, ContactCopy> = {
  en: {
    title: 'Contact',
    meta: {
      title: 'Contact — Sina Oshaghi',
      description:
        'Start a conversation about product, service, systems, growth or AI — especially when the problem is still ambiguous.',
    },
    eyebrow: 'Contact',
    headline: 'Have something worth figuring out?',
    aside:
      'Product, service, systems, growth or AI — if the problem is still ambiguous, that’s usually a good place to start.',
    sectionTitle: 'Start a conversation',
    paths: {
      email: {
        index: '01',
        title: 'Email',
        description: 'For direct conversations.',
        ctaLabel: 'Email Sina',
      },
      form: {
        index: '02',
        title: 'Project / collaboration',
        description: 'Share a project, problem or collaboration.',
        ctaLabel: 'Start below',
      },
    },
    closingNote:
      'I usually reply within a reasonable timeframe. Your details are only used to respond to your message.',
    form: {
      submitLabel: 'Send message',
      confirmationTitle: 'Message received',
      confirmation: 'Thanks — I’ll get back to you soon.',
      emailSubject: 'You’ve received a new message.',
      emailBody: 'Your contact form submission was successfully received.',
      labels: {
        fullName: 'Full name',
        email: 'Email',
        company: 'Company / team',
        projectType: 'Project type',
        message: 'What are you working on?',
      },
      projectTypes: projectTypes([
        'Product',
        'Service / Operations',
        'Design',
        'AI / Automation',
        'Growth',
        'Research / Strategy',
        'Other',
      ]),
    },
  },
  fa: {
    title: 'تماس',
    meta: {
      title: 'تماس — سینا عشاقی',
      description:
        'اگر مسئله‌ای در محصول، سرویس، سیستم، رشد یا AI دارید که هنوز روشن نیست، از همین‌جا گفتگو را شروع کنید.',
    },
    eyebrow: 'تماس',
    headline: 'چیزی هست که ارزش روشن‌کردن داشته باشد؟',
    aside:
      'محصول، سرویس، سیستم، رشد یا AI — اگر مسئله هنوز مبهم است، معمولاً همین نقطهٔ شروع خوبی است.',
    sectionTitle: 'شروع گفتگو',
    paths: {
      email: {
        index: '01',
        title: 'ایمیل',
        description: 'برای گفتگوی مستقیم.',
        ctaLabel: 'ایمیل به سینا',
      },
      form: {
        index: '02',
        title: 'پروژه / همکاری',
        description: 'پروژه، مسئله یا همکاری‌تان را بنویسید.',
        ctaLabel: 'از پایین شروع کنید',
      },
    },
    closingNote:
      'معمولاً در زمان معقولی پاسخ می‌دهم. جزئیاتتان فقط برای پاسخ به پیام استفاده می‌شود.',
    form: {
      submitLabel: 'ارسال پیام',
      confirmationTitle: 'پیام دریافت شد',
      confirmation: 'ممنون — به‌زودی با شما در تماس می‌گیرم.',
      emailSubject: 'پیام تازه‌ای دریافت کرده‌اید.',
      emailBody: 'پیام تازه‌ای از فرم تماس سایت دریافت شد.',
      labels: {
        fullName: 'نام و نام خانوادگی',
        email: 'ایمیل',
        company: 'شرکت / تیم',
        projectType: 'نوع پروژه',
        message: 'روی چه چیزی کار می‌کنید؟',
      },
      projectTypes: projectTypes([
        'محصول',
        'سرویس / عملیات',
        'طراحی',
        'AI / اتوماسیون',
        'رشد',
        'تحقیق / استراتژی',
        'سایر',
      ]),
    },
  },
  ar: {
    title: 'تواصل',
    meta: {
      title: 'تواصل — سينا أوشاقي',
      description:
        'ابدأ محادثة حول المنتج أو الخدمة أو الأنظمة أو النمو أو الذكاء الاصطناعي — خاصة عندما تكون المشكلة غير واضحة بعد.',
    },
    eyebrow: 'تواصل',
    headline: 'هل لديك شيء يستحق أن نفكّر فيه؟',
    aside:
      'منتج أو خدمة أو أنظمة أو نمو أو ذكاء اصطناعي — إذا كانت المشكلة لا تزال غامضة، فهذه عادة نقطة بداية جيدة.',
    sectionTitle: 'ابدأ محادثة',
    paths: {
      email: {
        index: '01',
        title: 'البريد',
        description: 'للمحادثات المباشرة.',
        ctaLabel: 'راسل سينا',
      },
      form: {
        index: '02',
        title: 'مشروع / تعاون',
        description: 'شارك مشروعاً أو مشكلة أو تعاوناً.',
        ctaLabel: 'ابدأ أدناه',
      },
    },
    closingNote:
      'أردّ عادةً خلال فترة معقولة. تُستخدم تفاصيلك فقط للرد على رسالتك.',
    form: {
      submitLabel: 'إرسال الرسالة',
      confirmationTitle: 'وصلت الرسالة',
      confirmation: 'شكراً — سأردّ عليك قريباً.',
      emailSubject: 'وصلتك رسالة جديدة.',
      emailBody: 'تم استلام نموذج التواصل الخاص بك بنجاح.',
      labels: {
        fullName: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        company: 'الشركة / الفريق',
        projectType: 'نوع المشروع',
        message: 'على ماذا تعمل؟',
      },
      projectTypes: projectTypes([
        'منتج',
        'خدمة / عمليات',
        'تصميم',
        'ذكاء اصطناعي / أتمتة',
        'نمو',
        'بحث / استراتيجية',
        'أخرى',
      ]),
    },
  },
  es: {
    title: 'Contacto',
    meta: {
      title: 'Contacto — Sina Oshaghi',
      description:
        'Empieza una conversación sobre producto, servicio, sistemas, growth o IA — sobre todo si el problema aún no está claro.',
    },
    eyebrow: 'Contacto',
    headline: '¿Tienes algo que merezca aclararse?',
    aside:
      'Producto, servicio, sistemas, growth o IA — si el problema sigue siendo ambiguo, suele ser un buen punto de partida.',
    sectionTitle: 'Empieza una conversación',
    paths: {
      email: {
        index: '01',
        title: 'Email',
        description: 'Para conversaciones directas.',
        ctaLabel: 'Escribir a Sina',
      },
      form: {
        index: '02',
        title: 'Proyecto / colaboración',
        description: 'Cuéntame un proyecto, problema o colaboración.',
        ctaLabel: 'Empieza abajo',
      },
    },
    closingNote:
      'Suelo responder en un plazo razonable. Tus datos solo se usan para responder a tu mensaje.',
    form: {
      submitLabel: 'Enviar mensaje',
      confirmationTitle: 'Mensaje recibido',
      confirmation: 'Gracias — te responderé pronto.',
      emailSubject: 'Has recibido un mensaje nuevo.',
      emailBody: 'Tu envío del formulario de contacto se ha recibido correctamente.',
      labels: {
        fullName: 'Nombre completo',
        email: 'Correo electrónico',
        company: 'Empresa / equipo',
        projectType: 'Tipo de proyecto',
        message: '¿En qué estás trabajando?',
      },
      projectTypes: projectTypes([
        'Producto',
        'Servicio / Operaciones',
        'Diseño',
        'IA / Automatización',
        'Growth',
        'Investigación / Estrategia',
        'Otro',
      ]),
    },
  },
  de: {
    title: 'Kontakt',
    meta: {
      title: 'Kontakt — Sina Oshaghi',
      description:
        'Starten Sie ein Gespräch zu Produkt, Service, Systemen, Growth oder KI — besonders wenn das Problem noch unklar ist.',
    },
    eyebrow: 'Kontakt',
    headline: 'Gibt es etwas, das sich zu klären lohnt?',
    aside:
      'Produkt, Service, Systeme, Growth oder KI — wenn das Problem noch unklar ist, ist das oft ein guter Einstieg.',
    sectionTitle: 'Gespräch beginnen',
    paths: {
      email: {
        index: '01',
        title: 'E-Mail',
        description: 'Für direkte Gespräche.',
        ctaLabel: 'Sina schreiben',
      },
      form: {
        index: '02',
        title: 'Projekt / Zusammenarbeit',
        description: 'Projekt, Problem oder Zusammenarbeit teilen.',
        ctaLabel: 'Unten starten',
      },
    },
    closingNote:
      'Ich antworte in der Regel in angemessener Zeit. Ihre Angaben dienen nur der Antwort auf Ihre Nachricht.',
    form: {
      submitLabel: 'Nachricht senden',
      confirmationTitle: 'Nachricht erhalten',
      confirmation: 'Danke — ich melde mich bald.',
      emailSubject: 'Sie haben eine neue Nachricht erhalten.',
      emailBody: 'Ihre Kontaktformular-Einsendung wurde erfolgreich empfangen.',
      labels: {
        fullName: 'Vollständiger Name',
        email: 'E-Mail',
        company: 'Unternehmen / Team',
        projectType: 'Projekttyp',
        message: 'Woran arbeiten Sie?',
      },
      projectTypes: projectTypes([
        'Produkt',
        'Service / Operations',
        'Design',
        'KI / Automatisierung',
        'Growth',
        'Research / Strategie',
        'Sonstiges',
      ]),
    },
  },
  fr: {
    title: 'Contact',
    meta: {
      title: 'Contact — Sina Oshaghi',
      description:
        'Démarrez une conversation sur le produit, le service, les systèmes, la growth ou l’IA — surtout si le problème n’est pas encore clair.',
    },
    eyebrow: 'Contact',
    headline: 'Vous avez quelque chose qui mérite d’être clarifié ?',
    aside:
      'Produit, service, systèmes, growth ou IA — si le problème est encore ambigu, c’est souvent un bon point de départ.',
    sectionTitle: 'Démarrer une conversation',
    paths: {
      email: {
        index: '01',
        title: 'E-mail',
        description: 'Pour les échanges directs.',
        ctaLabel: 'Écrire à Sina',
      },
      form: {
        index: '02',
        title: 'Projet / collaboration',
        description: 'Parlez d’un projet, d’un problème ou d’une collaboration.',
        ctaLabel: 'Commencer ci-dessous',
      },
    },
    closingNote:
      'Je réponds généralement dans un délai raisonnable. Vos informations ne servent qu’à répondre à votre message.',
    form: {
      submitLabel: 'Envoyer le message',
      confirmationTitle: 'Message reçu',
      confirmation: 'Merci — je vous réponds bientôt.',
      emailSubject: 'Vous avez reçu un nouveau message.',
      emailBody: 'Votre envoi du formulaire de contact a bien été reçu.',
      labels: {
        fullName: 'Nom complet',
        email: 'E-mail',
        company: 'Entreprise / équipe',
        projectType: 'Type de projet',
        message: 'Sur quoi travaillez-vous ?',
      },
      projectTypes: projectTypes([
        'Produit',
        'Service / Opérations',
        'Design',
        'IA / Automatisation',
        'Growth',
        'Recherche / Stratégie',
        'Autre',
      ]),
    },
  },
  ja: {
    title: 'お問い合わせ',
    meta: {
      title: 'お問い合わせ — Sina Oshaghi',
      description:
        'プロダクト、サービス、システム、グロース、AIについて。まだ曖昧な課題ほど、ここから会話を始められます。',
    },
    eyebrow: 'お問い合わせ',
    headline: '一緒に整理する価値のある課題はありますか？',
    aside:
      'プロダクト、サービス、システム、グロース、AI — 課題がまだ曖昧でも、そこが多くの場合よい出発点です。',
    sectionTitle: '会話を始める',
    paths: {
      email: {
        index: '01',
        title: 'メール',
        description: '直接のやりとり向け。',
        ctaLabel: 'Sinaにメール',
      },
      form: {
        index: '02',
        title: 'プロジェクト / 協業',
        description: 'プロジェクトや課題、協業の相談を送る。',
        ctaLabel: '下のフォームへ',
      },
    },
    closingNote:
      '通常、妥当な範囲で返信します。いただいた情報は返信のためだけに使います。',
    form: {
      submitLabel: 'メッセージを送る',
      confirmationTitle: 'メッセージを受け取りました',
      confirmation: 'ありがとうございます。追ってご連絡します。',
      emailSubject: '新しいメッセージが届きました。',
      emailBody: 'お問い合わせフォームの送信を受け付けました。',
      labels: {
        fullName: 'お名前',
        email: 'メールアドレス',
        company: '会社 / チーム',
        projectType: 'プロジェクト種別',
        message: 'いま取り組んでいることは？',
      },
      projectTypes: projectTypes([
        'プロダクト',
        'サービス / オペレーション',
        'デザイン',
        'AI / オートメーション',
        'グロース',
        'リサーチ / 戦略',
        'その他',
      ]),
    },
  },
}
