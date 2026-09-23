import type { Locale } from '@/utilities/locale'

import type { SectionHeaderCopy } from './home-copy'

/**
 * The About page in the five locales it was missing — `ar`, `es`, `de`, `fr`, `ja`.
 *
 * Deliberately **not** all seven. English and Persian are already seeded and working
 * (`about-page-content.ts`'s `…En` / `…Fa` pairs, applied by `localizeAboutLayoutFa`), and
 * rewriting them through a new table would risk changing copy that is already correct in order
 * to satisfy a symmetry nobody asked for. `AboutLocale` is the five that need writing; the
 * overlay simply never runs for `en` or `fa`.
 *
 * Only localized leaves. Block order, row ids, the `experience` relationship on each career
 * stage and the `personalSide` media all come from the English document at write time.
 */
export type AboutLocale = Exclude<Locale, 'en' | 'fa'>

export interface AboutCopy {
  title: string
  meta: { title: string; description: string }
  hero: { heading: string; lede: string }
  biography: { heading: string; body: [string, string, string, string] }
  /** Narratives in `careerStageOrder` order: A1Paradise, Arvan Cloud, Carsparency, Digikala, Independent. */
  journey: {
    header: SectionHeaderCopy
    narratives: [string, string, string, string, string]
    /** Only the Digikala stage carries one. */
    relatedProjectLabel: string
  }
  thinking: { header: SectionHeaderCopy; nodes: { label: string; annotation: string }[] }
  principles: {
    header: SectionHeaderCopy
    items: { title: string; description: string; evidenceLabel: string }[]
  }
  teamProcess: {
    header: SectionHeaderCopy
    nodes: { label: string; annotation: string }[]
    statements: { title: string; description: string }[]
  }
  personal: { header: SectionHeaderCopy; items: { title: string; description: string }[] }
  now: { header: SectionHeaderCopy; statement: string }
  contact: { heading: string; body: string; primaryLabel: string; secondaryLabel: string }
}

export const aboutCopy: Record<AboutLocale, AboutCopy> = {
  ar: {
    title: 'نبذة',
    meta: {
      title: 'نبذة — سينا أوشاقي',
      description:
        'كيف أصبح مصمم منتج شخصًا يفكّر عبر المنتج والأعمال والنمو والأنظمة — المسار والمبادئ والاتجاه الحالي.',
    },
    hero: {
      heading: 'يشغلني الحدّ الذي يتوقّف عنده المنتج والأعمال والتقنية عن كونها تخصّصات منفصلة.',
      lede: 'عشر سنوات من الانتقال من تصميم الواجهات نحو ملكية أوسع — الرؤية والنمو والأنظمة ولوحات المعلومات تحتها — لأن المشكلة الحقيقية عادةً ما تكون هناك.',
    },
    biography: {
      heading: 'هجين، بالمصادفة أولًا ثم بالاختيار.',
      body: [
        'أصمّم المنتجات الرقمية وأديرها، ثم أحرص على أن تنمو. على مدى عشر سنوات امتدّ العمل إلى التقنية المالية (الذهب الرقمي في ديجيكالا)، والبنية السحابية (أروان كلاود)، وأسواق السيارات (Carsparency و Khodro45)، والتعليم (أوتيتشر، بايوميز)، والإعلام (ديدستان)، والاتصالات (A1Paradise).',
        'النمط المشترك بين تلك الأدوار غير مألوف: الشخص نفسه يُجري البحث، ويصمّم المنتج، ويقود الدخول إلى السوق، ويبني لوحات المعلومات التي تقول إن كان ذلك قد نجح. في ديجيكالا عنى ذلك تحديد الرؤية والمزايا للذهب الرقمي، وتصميم حملات بلا رسوم وبالتقسيط وبطاقات الهدايا، وبناء نماذج تقسيم المستخدمين بحسب الأصول والخصائص والسلوك، واستبدال جداول الفريق بلوحات ذكاء أعمال تتابع NMV وCTR وCPC والتحويل — مع طرح مفاهيم مثل الشراء الآن والدفع لاحقًا والائتمان المضمون بالذهب.',
        'وقبل ذلك، في أروان كلاود، أنتجت إعادةُ تصميم معمارية معلومات المنصّة حول المؤشّرات التي احتاجها المستخدمون فعلًا نموًّا ملموسًا في NPS. وفي كارسبارنسي، صُمّمت منصّة بيع وشراء كاملة لسوق الإمارات واختُبرت حتى ارتفع معدّل البيع.',
        'درستُ التصميم الصناعي في جامعة آزاد، وأواصل دراسة تصميم التفاعل عبر Interaction Design Foundation. وخارج الشاشة: الدرّاجات النارية والجبال، واهتمام دائم بالتحليل النفسي — وهو مفيد لبحث المستخدم كما تبيّن.',
      ],
    },
    journey: {
      header: {
        tag: 'المسار',
        lead: 'كيف وصلتُ',
        tail: 'إلى هنا',
        lede: 'خمس مراحل غيّرت ما كنتُ مسؤولًا عنه، لا ما كنتُ أبنيه فحسب.',
      },
      narratives: [
        'أول موجز حقيقي: تحويل فكرة خام لألعاب مصغّرة وتطبيق اتصال إلى واجهات يمكن للناس استخدامها فعلًا. جاءت الحرفة أولًا — الشاشات والمسارات، وانضباط شحن شيء يعمل، لا شيء يبدو صحيحًا فقط.',
        'انتقال من الشاشات إلى الأنظمة. إعادة تصميم منصّة سحابية عنت تعلّم ما تعنيه المؤشّرات على الشاشة فعلًا للمهندسين الذين يقرؤونها — لم تعد الواجهة هي المنتج، وصارت معمارية المعلومات مشكلة التصميم الحقيقية.',
        'ملكية منصّة كاملة لأول مرة — لا شاشة واحدة ولا مسارًا واحدًا، بل سوق Carsparency الإنجليزية/الإماراتية. أربعة أسطح في وقت واحد: Pro، وكنسول المشغّل، وأداة الفاحص الميدانية، ورحلة البائع على الويب، جميعها على نظام تصميم واحد كتبتُه بنفسي.',
        'النقطة التي توقّف عندها التصميم والمنتج والنمو عن كونها وظائف منفصلة. الرؤية والواجهة وحملات بلا رسوم والتقسيط ونماذج التقسيم ولوحات المعلومات التي حلّت محلّ جداول الفريق — كلّها ممارسة واحدة مترابطة، مملوكة من البداية إلى النهاية.',
        'الآن: مستقلّ، وأستخدم هذا المدى بشروطي — تقليص رؤية أكبر بكثير إلى ما يستطيع فريق صغير شحنه فعلًا، وتوثيق القرارات وقت اتّخاذها، والتعامل مع الذكاء الاصطناعي كطبقة عمل لاستكشاف اتجاهات أكثر قبل الالتزام بواحد.',
      ],
      relatedProjectLabel: 'عمل مختار ← الذهب الرقمي',
    },
    thinking: {
      header: {
        tag: 'كيف أفكّر',
        lead: 'رسم خريطة',
        tail: 'النظام، لا الشاشة',
        lede: 'خريطة تقريبية لكيفية انتقال مشكلة من قيد إلى قرار إلى نتيجة.',
      },
      nodes: [
        { label: 'الأعمال', annotation: 'كل قرار تصميمي يلتقي بقيد تجاري في النهاية — من الأفضل معرفته منذ البداية.' },
        { label: 'المنتج', annotation: 'حيث تتصالح احتياجات المستخدم وقيود الأعمال في خارطة طريق واحدة.' },
        { label: 'المستخدم', annotation: 'البحث ليس مرحلة — إنه ما يُبقي النظام صادقًا.' },
        { label: 'النظام', annotation: 'ارسم خريطة النظام كلّه قبل تحسين أيّ سطح منه.' },
        { label: 'التنفيذ', annotation: 'اشحن أصغر نسخة تختبر الافتراض فعلًا.' },
        { label: 'التعلّم', annotation: 'لوحات المعلومات بدل التخمين — تُراجَع القرارات حين تقول البيانات ذلك.' },
      ],
    },
    principles: {
      header: {
        tag: 'المبادئ',
        lead: 'ما الذي يوجّه',
        tail: 'القرارات فعلًا',
        lede: 'محدَّدة بما يكفي لتكون مفيدة لمن سيعمل معي لاحقًا.',
      },
      items: [
        {
          title: 'ارسم خريطة النظام قبل تحسين السطح.',
          description:
            'الشاشة المُعاد تصميمها بقدر جودة معمارية المعلومات تحتها — وعادةً لا تكون الواجهة هي المشكلة الحقيقية.',
          evidenceLabel: 'ظهر في ← أروان كلاود',
        },
        {
          title: 'تُوثَّق القرارات بمبرّراتها، لا بنتائجها فقط.',
          description:
            'سجلّ مؤرَّخ لسبب اتّخاذ القرار — لا لما تقرّر فحسب — يُبقي الفريق يعمل من الحقيقة الحالية نفسها بدل الجدال من افتراضات قديمة.',
          evidenceLabel: 'ظهر في ← RP1 / مستقل',
        },
        {
          title: 'الملكية تعني لوحة المعلومات، لا التصميم وحده.',
          description:
            'امتلاك منتج من البداية إلى النهاية يعني تحمّل مسؤولية الرقم الذي يثبت نجاحه، لا تسليم ذلك بمجرّد شحن الواجهة.',
          evidenceLabel: 'ظهر في ← الذهب الرقمي',
        },
        {
          title: 'قلّص النطاق إلى ما يستطيع فريق صغير شحنه فعلًا.',
          description:
            'من السهل وصف رؤية كبيرة ومن الصعب بناؤها — المهارة المفيدة هي تقليصها إلى أصغر نسخة تختبر الافتراض الحقيقي.',
          evidenceLabel: 'ظهر في ← RP1 / مستقل',
        },
      ],
    },
    teamProcess: {
      header: {
        tag: 'العمل مع الفرق',
        lead: 'كيف تتحرّك',
        tail: 'القرارات فعلًا',
        lede: 'عملية، لا ادّعاء بالتعاون.',
      },
      nodes: [
        { label: 'سياق الأعمال', annotation: 'من أين يأتي القيد فعلًا — الميزانية، الجدول الزمني، الهدف الحقيقي لصاحب مصلحة.' },
        { label: 'قرار المنتج', annotation: 'شخص واحد يملك القرار، والسياق مرئي لكل من يتأثّر به.' },
        { label: 'التصميم', annotation: 'يستكشف فضاء الخيارات قبل الالتزام باتجاه واحد.' },
        { label: 'الهندسة', annotation: 'تدخل مبكّرًا بما يكفي لتشكيل ما هو ممكن، لا لبناء ما تقرّر سلفًا.' },
        { label: 'التحقّق', annotation: 'اختبارات قابلية الاستخدام وبيانات الاستخدام الفعلي، لا الآراء، تحسم الخلافات.' },
        { label: 'التعلّم', annotation: 'ما نجح وما لم ينجح يغذّي مباشرةً سياق الأعمال التالي.' },
      ],
      statements: [
        {
          title: 'تُحسم الخلافات في ضوء سجلّ مؤرَّخ، لا الذاكرة.',
          description:
            'حين تعارضت مواصفتان، فازت الأحدث والأكثر إحالةً مرجعية — مُعلَّمة صراحةً، لا مُستبدَلة بهدوء، ليبقى الفريق يعمل من الحقيقة الحالية نفسها.',
        },
      ],
    },
    personal: {
      header: { tag: 'خارج العمل', lead: 'ما الذي يشكّل', tail: 'العمل أيضًا' },
      items: [
        { title: 'الدرّاجات النارية والجبال', description: 'مغامرة وطبيعة، على عجلتين غالبًا.' },
        { title: 'السفر', description: 'الاحتكاك بأنظمة وأسواق وطرق مختلفة يحلّ بها الناس المشكلات نفسها.' },
        {
          title: 'التحليل النفسي',
          description: 'اهتمام دائم تبيّن أنه مفيد لبحث المستخدم — نادرًا ما يقول الناس السبب الحقيقي أولًا.',
        },
      ],
    },
    now: {
      header: { tag: 'الآن', lead: 'ما الذي', tail: 'أستكشفه' },
      statement:
        'التفكير في كيف يغيّر الذكاء الاصطناعي طريقة تحديد نطاق المنتجات وتصميمها وقياسها — وبناء تجارب صغيرة لاختبار ذلك، لا القراءة عنه فقط.',
    },
    contact: {
      heading: 'إن بدت طريقة العمل هذه مفيدة، فلنتحدّث.',
      body: 'لأعمال المنتج والتصميم والنمو، أو لتبادل الخبرات حول الأنظمة والذكاء الاصطناعي.',
      primaryLabel: 'راسل سينا',
      secondaryLabel: 'لينكدإن',
    },
  },

  es: {
    title: 'Sobre mí',
    meta: {
      title: 'Sobre mí — Sina Oshaghi',
      description:
        'Cómo un diseñador de producto llegó a pensar a la vez en producto, negocio, crecimiento y sistemas: trayectoria, principios y dirección actual.',
    },
    hero: {
      heading: 'Me interesa el punto donde producto, negocio y tecnología dejan de ser disciplinas separadas.',
      lede: 'Diez años pasando del diseño de interfaces a una responsabilidad más amplia — visión, crecimiento, y los sistemas y paneles que hay debajo — porque ahí suele estar el problema real.',
    },
    biography: {
      heading: 'Un híbrido, primero por accidente y luego por elección.',
      body: [
        'Diseño y gestiono productos digitales, y después me aseguro de que crezcan. En diez años el trabajo ha abarcado fintech (el Digital Gold de Digikala), infraestructura cloud (Arvan Cloud), marketplaces de automoción (Carsparency y Khodro45), educación (OTeacher, Biomaze), medios (Didestan) y telecomunicaciones (A1Paradise).',
        'El patrón que se repite en esos roles es poco habitual: la misma persona hace la investigación, diseña el producto, lleva la salida al mercado y construye los paneles que dicen si funcionó. En Digikala eso significó definir la visión y las funcionalidades de Digital Gold, diseñar las campañas sin comisiones, a plazos y de tarjetas regalo, construir modelos de segmentación por activos, demografía y comportamiento, y sustituir las hojas de cálculo del equipo por paneles de BI que seguían NMV, CTR, CPC y conversión, además de introducir conceptos como el pago aplazado y el crédito respaldado por oro.',
        'Antes, en Arvan Cloud, rediseñar la arquitectura de información de la plataforma en torno a las métricas que los usuarios realmente necesitaban produjo un crecimiento medible del NPS. En Carsparency se diseñó y probó una plataforma completa de compraventa para el mercado de los Emiratos hasta que subió la tasa de venta.',
        'Me formé en diseño industrial en la Universidad Azad y sigo estudiando diseño de interacción con la Interaction Design Foundation. Fuera de la pantalla: motos, montaña y un interés persistente por el psicoanálisis, que resulta útil para la investigación con usuarios.',
      ],
    },
    journey: {
      header: {
        tag: 'Trayectoria',
        lead: 'Cómo llegué',
        tail: 'hasta aquí',
        lede: 'Cinco etapas que cambiaron de qué era responsable, no solo qué construía.',
      },
      narratives: [
        'El primer encargo real: convertir una idea en bruto de microjuegos y una app de llamadas en interfaces que la gente pudiera usar de verdad. El oficio vino primero: pantallas, flujos y la disciplina de lanzar algo que funcionara, no solo algo que pareciera correcto.',
        'Un paso de las pantallas a los sistemas. Rediseñar una plataforma cloud supuso entender qué significaban realmente las métricas en pantalla para los ingenieros que las leían: la interfaz dejó de ser el producto y la arquitectura de información pasó a ser el verdadero problema de diseño.',
        'Responsabilidad completa sobre una plataforma por primera vez: no una pantalla ni un flujo, sino el marketplace en inglés/EAU de Carsparency. Cuatro superficies a la vez: Pro, la consola del operador, la herramienta de campo del inspector y el recorrido web del vendedor, todas sobre un sistema de diseño que escribí yo.',
        'El punto en el que diseño, producto y crecimiento dejaron de ser trabajos separados. Visión, interfaz, las campañas sin comisiones y a plazos, los modelos de segmentación y los paneles que sustituyeron a las hojas de cálculo del equipo: una sola práctica conectada, asumida de principio a fin.',
        'Ahora: independiente, usando ese rango en mis propios términos — reduciendo una visión mucho mayor a lo que un equipo pequeño puede lanzar de verdad, dejando las decisiones documentadas según se toman, y tratando la IA como una capa de trabajo para explorar más direcciones antes de comprometerse con una.',
      ],
      relatedProjectLabel: 'Trabajo seleccionado → Digital Gold',
    },
    thinking: {
      header: {
        tag: 'Cómo pienso',
        lead: 'Mapear el',
        tail: 'sistema, no la pantalla',
        lede: 'Un mapa aproximado de cómo un problema pasa de restricción a decisión y a resultado.',
      },
      nodes: [
        { label: 'Negocio', annotation: 'Toda decisión de diseño acaba topando con una restricción de negocio; mejor saberlo de entrada.' },
        { label: 'Producto', annotation: 'Donde las necesidades del usuario y las restricciones del negocio se reconcilian en una hoja de ruta.' },
        { label: 'Usuario', annotation: 'La investigación no es una fase: es lo que mantiene honesto al sistema.' },
        { label: 'Sistema', annotation: 'Mapea el sistema entero antes de optimizar cualquiera de sus superficies.' },
        { label: 'Ejecución', annotation: 'Lanza la versión más pequeña que de verdad ponga a prueba la hipótesis.' },
        { label: 'Aprendizaje', annotation: 'Paneles antes que suposiciones: las decisiones se revisan cuando los datos lo piden.' },
      ],
    },
    principles: {
      header: {
        tag: 'Principios',
        lead: 'Qué guía',
        tail: 'de verdad las decisiones',
        lede: 'Lo bastante concretos como para servirle a quien trabaje conmigo después.',
      },
      items: [
        {
          title: 'Mapea el sistema antes de optimizar la superficie.',
          description:
            'Una pantalla rediseñada vale lo que vale la arquitectura de información que tiene debajo: la interfaz no suele ser el problema real.',
          evidenceLabel: 'Visto en → Arvan Cloud',
        },
        {
          title: 'Las decisiones se documentan con su porqué, no solo con su resultado.',
          description:
            'Un registro fechado de por qué se tomó una decisión — no solo qué se decidió — mantiene al equipo trabajando sobre la misma verdad actual en lugar de discutir desde supuestos caducados.',
          evidenceLabel: 'Visto en → RP1 / Independiente',
        },
        {
          title: 'Hacerse cargo significa el panel, no solo el diseño.',
          description:
            'Asumir un producto de principio a fin significa responder por el número que demuestra que funcionó, no delegarlo en cuanto la interfaz se lanza.',
          evidenceLabel: 'Visto en → Digital Gold',
        },
        {
          title: 'Recorta hasta lo que un equipo pequeño pueda lanzar de verdad.',
          description:
            'Una visión grande es fácil de describir y difícil de construir: la habilidad útil es recortarla a la versión más pequeña que aún ponga a prueba la hipótesis real.',
          evidenceLabel: 'Visto en → RP1 / Independiente',
        },
      ],
    },
    teamProcess: {
      header: {
        tag: 'Trabajar con equipos',
        lead: 'Cómo avanzan',
        tail: 'de verdad las decisiones',
        lede: 'Un proceso, no una declaración de ser colaborativo.',
      },
      nodes: [
        { label: 'Contexto de negocio', annotation: 'De dónde viene realmente la restricción: presupuesto, plazos, el objetivo real de alguien.' },
        { label: 'Decisión de producto', annotation: 'Una persona asume la decisión, con el contexto visible para todos los afectados.' },
        { label: 'Diseño', annotation: 'Explora el espacio de opciones antes de comprometerse con una dirección.' },
        { label: 'Ingeniería', annotation: 'Entra lo bastante pronto como para dar forma a lo viable, no solo construir lo ya decidido.' },
        { label: 'Validación', annotation: 'Las pruebas de usabilidad y el uso real, no las opiniones, resuelven los desacuerdos.' },
        { label: 'Aprendizaje', annotation: 'Lo que funcionó y lo que no alimenta directamente el siguiente contexto de negocio.' },
      ],
      statements: [
        {
          title: 'Los desacuerdos se resuelven contra un registro fechado, no contra la memoria.',
          description:
            'Cuando dos especificaciones se contradecían, ganaba la más reciente y mejor referenciada — marcada de forma explícita, no sustituida en silencio, para que el equipo siguiera trabajando sobre la misma verdad actual.',
        },
      ],
    },
    personal: {
      header: { tag: 'Fuera del trabajo', lead: 'Qué más', tail: 'da forma al trabajo' },
      items: [
        { title: 'Moto y montaña', description: 'Aventura y naturaleza, casi siempre sobre dos ruedas.' },
        { title: 'Viajar', description: 'Exponerse a otros sistemas, mercados y formas de resolver los mismos problemas.' },
        {
          title: 'Psicoanálisis',
          description: 'Un interés persistente que resulta útil para la investigación con usuarios: la gente rara vez dice primero el motivo real.',
        },
      ],
    },
    now: {
      header: { tag: 'Ahora', lead: 'Qué estoy', tail: 'explorando' },
      statement:
        'Pensando en cómo la IA cambia la forma de acotar, diseñar y medir productos, y construyendo pequeños experimentos para comprobarlo, no solo leyendo sobre ello.',
    },
    contact: {
      heading: 'Si esta forma de trabajar te sirve, hablemos.',
      body: 'Para trabajo de producto, diseño y crecimiento, o para intercambiar ideas sobre sistemas e IA.',
      primaryLabel: 'Escribir a Sina',
      secondaryLabel: 'LinkedIn',
    },
  },

  de: {
    title: 'Über mich',
    meta: {
      title: 'Über mich — Sina Oshaghi',
      description:
        'Wie aus einem Produktdesigner jemand wurde, der über Produkt, Geschäft, Growth und Systeme hinweg denkt – Werdegang, Prinzipien und aktuelle Richtung.',
    },
    hero: {
      heading: 'Mich interessiert der Punkt, an dem Produkt, Geschäft und Technologie aufhören, getrennte Disziplinen zu sein.',
      lede: 'Zehn Jahre Weg vom Interface-Design hin zu breiterer Verantwortung – Vision, Growth, die Systeme und Dashboards darunter – weil dort meistens das eigentliche Problem liegt.',
    },
    biography: {
      heading: 'Ein Hybrid, erst zufällig und dann absichtlich.',
      body: [
        'Ich gestalte und verantworte digitale Produkte und sorge anschließend dafür, dass sie wachsen. Über zehn Jahre reichte die Arbeit von Fintech (Digikalas Digital Gold) über Cloud-Infrastruktur (Arvan Cloud), Automarktplätze (Carsparency und Khodro45), Bildung (OTeacher, Biomaze), Medien (Didestan) bis Telekommunikation (A1Paradise).',
        'Das Muster über diese Rollen hinweg ist ungewöhnlich: dieselbe Person macht die Recherche, gestaltet das Produkt, führt den Go-to-Market und baut die Dashboards, die sagen, ob es funktioniert hat. Bei Digikala hieß das: Vision und Funktionen für Digital Gold definieren, die gebührenfreien, Raten- und Geschenkkarten-Kampagnen gestalten, Segmentierungsmodelle nach Vermögen, Demografie und Verhalten bauen und die Tabellen des Teams durch BI-Dashboards mit NMV, CTR, CPC und Conversion ersetzen – und dabei Konzepte wie Buy-now-pay-later und goldgedeckten Kredit einführen.',
        'Zuvor bei Arvan Cloud führte eine Neugestaltung der Informationsarchitektur rund um die Metriken, die Nutzer tatsächlich brauchten, zu messbarem NPS-Wachstum. Bei Carsparency wurde eine vollständige Kauf- und Verkaufsplattform für den Markt der Emirate gestaltet und getestet, bis die Verkaufsquote stieg.',
        'Ich habe Industriedesign an der Azad-Universität studiert und bilde mich über die Interaction Design Foundation weiter im Interaktionsdesign. Abseits des Bildschirms: Motorräder, Berge und ein anhaltendes Interesse an Psychoanalyse – das sich für Nutzerforschung als nützlich erweist.',
      ],
    },
    journey: {
      header: {
        tag: 'Werdegang',
        lead: 'Wie ich',
        tail: 'hierher kam',
        lede: 'Fünf Stationen, die verändert haben, wofür ich verantwortlich war – nicht nur, was ich gebaut habe.',
      },
      narratives: [
        'Der erste echte Auftrag: eine rohe Idee für Microgames und eine Calling-App in Interfaces verwandeln, die Menschen wirklich benutzen konnten. Das Handwerk kam zuerst – Screens, Flows und die Disziplin, etwas auszuliefern, das funktioniert, nicht nur etwas, das richtig aussieht.',
        'Ein Wechsel von Screens zu Systemen. Eine Cloud-Plattform neu zu gestalten hieß zu lernen, was die Metriken auf dem Bildschirm den Ingenieuren, die sie lasen, tatsächlich bedeuteten – das Interface war nicht länger das Produkt, und die Informationsarchitektur wurde zum eigentlichen Designproblem.',
        'Zum ersten Mal volle Plattformverantwortung – kein einzelner Screen und kein einzelner Flow, sondern Carsparencys englischsprachiger/VAE-Marktplatz. Vier Oberflächen gleichzeitig: Pro, die Operator-Konsole, das Feldwerkzeug der Prüfer und die Verkäufer-Website, alle auf einem Designsystem, das ich verfasst habe.',
        'Der Punkt, an dem Design, Produkt und Growth aufhörten, getrennte Aufgaben zu sein. Vision, Interface, die gebührenfreien und Ratenkampagnen, die Segmentierungsmodelle und die Dashboards, die die Tabellen des Teams ersetzten – eine zusammenhängende Praxis, Ende zu Ende verantwortet.',
        'Jetzt: unabhängig, und diese Bandbreite zu meinen eigenen Bedingungen genutzt – eine sehr viel größere Vision auf das herunterschneiden, was ein kleines Team wirklich ausliefern kann, Entscheidungen dokumentieren, während sie fallen, und KI als Arbeitsschicht behandeln, um mehr Richtungen zu erkunden, bevor man sich auf eine festlegt.',
      ],
      relatedProjectLabel: 'Ausgewählte Arbeit → Digital Gold',
    },
    thinking: {
      header: {
        tag: 'Wie ich denke',
        lead: 'Das System',
        tail: 'kartieren, nicht den Screen',
        lede: 'Eine grobe Karte, wie ein Problem von der Restriktion über die Entscheidung zum Ergebnis wandert.',
      },
      nodes: [
        { label: 'Geschäft', annotation: 'Jede Designentscheidung trifft irgendwann auf eine Geschäftsrestriktion – besser, man kennt sie vorher.' },
        { label: 'Produkt', annotation: 'Wo Nutzerbedürfnisse und Geschäftsrestriktionen zu einer Roadmap zusammenfinden.' },
        { label: 'Nutzer', annotation: 'Recherche ist keine Phase – sie hält das System ehrlich.' },
        { label: 'System', annotation: 'Das ganze System kartieren, bevor eine einzelne Oberfläche optimiert wird.' },
        { label: 'Umsetzung', annotation: 'Die kleinste Version ausliefern, die die Annahme wirklich prüft.' },
        { label: 'Lernen', annotation: 'Dashboards statt Vermutungen – Entscheidungen werden revidiert, wenn die Daten es sagen.' },
      ],
    },
    principles: {
      header: {
        tag: 'Prinzipien',
        lead: 'Was die Entscheidungen',
        tail: 'wirklich leitet',
        lede: 'Konkret genug, um für alle nützlich zu sein, die als Nächstes mit mir arbeiten.',
      },
      items: [
        {
          title: 'Das System kartieren, bevor die Oberfläche optimiert wird.',
          description:
            'Ein neu gestalteter Screen ist nur so gut wie die Informationsarchitektur darunter – das Interface ist meist nicht das eigentliche Problem.',
          evidenceLabel: 'Zu sehen bei → Arvan Cloud',
        },
        {
          title: 'Entscheidungen werden mit Begründung dokumentiert, nicht nur mit Ergebnis.',
          description:
            'Ein datiertes Protokoll, warum eine Entscheidung fiel – nicht nur was entschieden wurde – hält ein Team auf derselben aktuellen Grundlage, statt aus veralteten Annahmen zu streiten.',
          evidenceLabel: 'Zu sehen bei → RP1 / Unabhängig',
        },
        {
          title: 'Verantwortung heißt das Dashboard, nicht nur das Design.',
          description:
            'Ein Produkt Ende zu Ende zu verantworten heißt, für die Zahl geradezustehen, die den Erfolg belegt – und sie nicht abzugeben, sobald das Interface ausgeliefert ist.',
          evidenceLabel: 'Zu sehen bei → Digital Gold',
        },
        {
          title: 'Auf das herunterschneiden, was ein kleines Team wirklich ausliefern kann.',
          description:
            'Eine große Vision ist leicht beschrieben und schwer gebaut – die nützliche Fähigkeit ist, sie auf die kleinste Version zu kürzen, die die eigentliche Annahme noch prüft.',
          evidenceLabel: 'Zu sehen bei → RP1 / Unabhängig',
        },
      ],
    },
    teamProcess: {
      header: {
        tag: 'Arbeit mit Teams',
        lead: 'Wie Entscheidungen',
        tail: 'wirklich vorankommen',
        lede: 'Ein Prozess, keine Behauptung, kollaborativ zu sein.',
      },
      nodes: [
        { label: 'Geschäftskontext', annotation: 'Woher die Restriktion wirklich kommt – Budget, Zeitplan, das echte Ziel eines Stakeholders.' },
        { label: 'Produktentscheidung', annotation: 'Eine Person trifft die Entscheidung, mit sichtbarem Kontext für alle Betroffenen.' },
        { label: 'Design', annotation: 'Erkundet den Optionsraum, bevor eine Richtung festgelegt wird.' },
        { label: 'Engineering', annotation: 'Kommt früh genug dazu, um Machbares mitzuformen, statt nur Beschlossenes zu bauen.' },
        { label: 'Validierung', annotation: 'Usability-Tests und echte Nutzungsdaten klären Uneinigkeit, nicht Meinungen.' },
        { label: 'Lernen', annotation: 'Was funktioniert hat und was nicht, fließt direkt in den nächsten Geschäftskontext.' },
      ],
      statements: [
        {
          title: 'Uneinigkeit wird an einem datierten Protokoll geklärt, nicht am Gedächtnis.',
          description:
            'Wenn zwei Spezifikationen sich widersprachen, gewann die neuere und gründlicher querverwiesene – ausdrücklich markiert, nicht still ersetzt, damit das Team auf derselben aktuellen Grundlage weiterarbeitete.',
        },
      ],
    },
    personal: {
      header: { tag: 'Außerhalb der Arbeit', lead: 'Was die Arbeit', tail: 'sonst noch prägt' },
      items: [
        { title: 'Motorrad & Berge', description: 'Abenteuer und Natur, meist auf zwei Rädern.' },
        { title: 'Reisen', description: 'Kontakt mit anderen Systemen, Märkten und Wegen, dieselben Probleme zu lösen.' },
        {
          title: 'Psychoanalyse',
          description: 'Ein anhaltendes Interesse, das sich für Nutzerforschung als nützlich erweist – Menschen nennen den wahren Grund selten zuerst.',
        },
      ],
    },
    now: {
      header: { tag: 'Jetzt', lead: 'Woran ich', tail: 'gerade arbeite' },
      statement:
        'Darüber nachdenken, wie KI verändert, wie Produkte zugeschnitten, gestaltet und gemessen werden – und kleine Experimente bauen, um es zu prüfen, statt nur darüber zu lesen.',
    },
    contact: {
      heading: 'Wenn diese Arbeitsweise nützlich klingt, sprechen wir.',
      body: 'Für Produkt-, Design- und Growth-Arbeit, oder um sich über Systeme und KI auszutauschen.',
      primaryLabel: 'Sina schreiben',
      secondaryLabel: 'LinkedIn',
    },
  },

  fr: {
    title: 'À propos',
    meta: {
      title: 'À propos — Sina Oshaghi',
      description:
        'Comment un designer produit en est venu à penser à la fois produit, business, croissance et systèmes — parcours, principes et direction actuelle.',
    },
    hero: {
      heading: 'Ce qui m’intéresse, c’est le point où produit, business et technologie cessent d’être des disciplines séparées.',
      lede: 'Dix ans à passer du design d’interface à une responsabilité plus large — la vision, la croissance, les systèmes et les tableaux de bord en dessous — parce que c’est généralement là que se trouve le vrai problème.',
    },
    biography: {
      heading: 'Un hybride, par accident d’abord puis par choix.',
      body: [
        'Je conçois et pilote des produits numériques, puis je m’assure qu’ils croissent. En dix ans, le travail a couvert la fintech (le Digital Gold de Digikala), l’infrastructure cloud (Arvan Cloud), les marketplaces automobiles (Carsparency et Khodro45), l’éducation (OTeacher, Biomaze), les médias (Didestan) et les télécoms (A1Paradise).',
        'Le motif qui traverse ces rôles est inhabituel : la même personne mène la recherche, conçoit le produit, pilote la mise sur le marché et construit les tableaux de bord qui disent si cela a marché. Chez Digikala, cela a voulu dire définir la vision et les fonctionnalités de Digital Gold, concevoir les campagnes sans frais, en plusieurs fois et cartes cadeaux, bâtir des modèles de segmentation sur les actifs, la démographie et le comportement, et remplacer les tableurs de l’équipe par des tableaux de bord BI suivant NMV, CTR, CPC et conversion — tout en introduisant des concepts comme le paiement différé et le crédit adossé à l’or.',
        'Plus tôt, chez Arvan Cloud, repenser l’architecture de l’information de la plateforme autour des métriques dont les utilisateurs avaient réellement besoin a produit une croissance mesurable du NPS. Chez Carsparency, une plateforme complète d’achat-vente pour le marché émirati a été conçue et testée jusqu’à ce que le taux de vente augmente.',
        'J’ai étudié le design industriel à l’université Azad et je continue à me former au design d’interaction via l’Interaction Design Foundation. Hors écran : moto, montagne, et un intérêt durable pour la psychanalyse — qui s’avère utile en recherche utilisateur.',
      ],
    },
    journey: {
      header: {
        tag: 'Parcours',
        lead: 'Comment j’en suis',
        tail: 'arrivé là',
        lede: 'Cinq étapes qui ont changé ce dont j’étais responsable, pas seulement ce que je construisais.',
      },
      narratives: [
        'Le premier vrai brief : transformer une idée brute de micro-jeux et d’une app d’appels en interfaces réellement utilisables. Le métier d’abord — les écrans, les parcours, et la discipline de livrer quelque chose qui fonctionne, pas seulement quelque chose qui a l’air juste.',
        'Un passage des écrans aux systèmes. Repenser une plateforme cloud a voulu dire comprendre ce que les métriques à l’écran signifiaient vraiment pour les ingénieurs qui les lisaient — l’interface a cessé d’être le produit, et l’architecture de l’information est devenue le vrai problème de design.',
        'Pour la première fois, la responsabilité d’une plateforme entière — pas un écran ni un parcours, mais la marketplace anglophone/Émirats de Carsparency. Quatre surfaces à la fois : Pro, la console de l’opérateur, l’outil de terrain de l’inspecteur et le parcours web du vendeur, toutes sur un design system que j’ai écrit.',
        'Le moment où design, produit et croissance ont cessé d’être des métiers séparés. La vision, l’interface, les campagnes sans frais et en plusieurs fois, les modèles de segmentation, et les tableaux de bord qui ont remplacé les tableurs de l’équipe — une seule pratique connectée, portée de bout en bout.',
        'Aujourd’hui : indépendant, et cette polyvalence utilisée à mes conditions — ramener une vision bien plus vaste à ce qu’une petite équipe peut réellement livrer, documenter les décisions au moment où elles se prennent, et traiter l’IA comme une couche de travail pour explorer plus de directions avant d’en choisir une.',
      ],
      relatedProjectLabel: 'Travail sélectionné → Digital Gold',
    },
    thinking: {
      header: {
        tag: 'Ma façon de penser',
        lead: 'Cartographier le',
        tail: 'système, pas l’écran',
        lede: 'Une carte approximative du trajet d’un problème, de la contrainte à la décision puis au résultat.',
      },
      nodes: [
        { label: 'Business', annotation: 'Toute décision de design finit par rencontrer une contrainte business — autant la connaître dès le départ.' },
        { label: 'Produit', annotation: 'Là où les besoins utilisateurs et les contraintes business se concilient en une feuille de route.' },
        { label: 'Utilisateur', annotation: 'La recherche n’est pas une phase — c’est ce qui garde le système honnête.' },
        { label: 'Système', annotation: 'Cartographier le système entier avant d’optimiser l’une de ses surfaces.' },
        { label: 'Exécution', annotation: 'Livrer la plus petite version qui teste réellement l’hypothèse.' },
        { label: 'Apprentissage', annotation: 'Des tableaux de bord plutôt que des suppositions — on revient sur les décisions quand les données le disent.' },
      ],
    },
    principles: {
      header: {
        tag: 'Principes',
        lead: 'Ce qui guide',
        tail: 'vraiment les décisions',
        lede: 'Assez précis pour être utiles à qui travaillera avec moi ensuite.',
      },
      items: [
        {
          title: 'Cartographier le système avant d’optimiser la surface.',
          description:
            'Un écran repensé ne vaut que ce que vaut l’architecture de l’information en dessous — l’interface n’est généralement pas le vrai problème.',
          evidenceLabel: 'Vu chez → Arvan Cloud',
        },
        {
          title: 'Les décisions sont documentées avec leur raison, pas seulement leur résultat.',
          description:
            'Un journal daté du pourquoi d’une décision — et pas seulement du quoi — maintient l’équipe sur la même vérité courante plutôt que sur des hypothèses périmées.',
          evidenceLabel: 'Vu chez → RP1 / Indépendant',
        },
        {
          title: 'Assumer un produit, c’est le tableau de bord, pas seulement le design.',
          description:
            'Porter un produit de bout en bout, c’est répondre du chiffre qui prouve qu’il a marché, pas s’en dessaisir dès que l’interface est livrée.',
          evidenceLabel: 'Vu chez → Digital Gold',
        },
        {
          title: 'Réduire à ce qu’une petite équipe peut réellement livrer.',
          description:
            'Une grande vision est facile à décrire et difficile à construire — la compétence utile est de la ramener à la plus petite version qui teste encore la vraie hypothèse.',
          evidenceLabel: 'Vu chez → RP1 / Indépendant',
        },
      ],
    },
    teamProcess: {
      header: {
        tag: 'Travailler en équipe',
        lead: 'Comment les décisions',
        tail: 'avancent vraiment',
        lede: 'Un processus, pas une déclaration d’intention collaborative.',
      },
      nodes: [
        { label: 'Contexte business', annotation: 'D’où vient réellement la contrainte — budget, calendrier, l’objectif réel d’une partie prenante.' },
        { label: 'Décision produit', annotation: 'Une personne tranche, avec un contexte visible pour tous ceux que cela concerne.' },
        { label: 'Design', annotation: 'Explore l’espace des options avant de s’engager dans une direction.' },
        { label: 'Ingénierie', annotation: 'Entre assez tôt pour façonner le faisable, pas seulement construire ce qui est déjà décidé.' },
        { label: 'Validation', annotation: 'Les tests d’utilisabilité et l’usage réel, pas les avis, tranchent les désaccords.' },
        { label: 'Apprentissage', annotation: 'Ce qui a marché et ce qui n’a pas marché alimente directement le contexte business suivant.' },
      ],
      statements: [
        {
          title: 'Les désaccords se tranchent sur un relevé daté, pas sur la mémoire.',
          description:
            'Quand deux spécifications se contredisaient, la plus récente et la mieux recoupée l’emportait — marquée explicitement, pas remplacée en silence, pour que l’équipe continue sur la même vérité courante.',
        },
      ],
    },
    personal: {
      header: { tag: 'Hors du travail', lead: 'Ce qui façonne', tail: 'aussi le travail' },
      items: [
        { title: 'Moto et montagne', description: 'Aventure et nature, le plus souvent sur deux roues.' },
        { title: 'Voyages', description: 'Se confronter à d’autres systèmes, marchés et façons de résoudre les mêmes problèmes.' },
        {
          title: 'Psychanalyse',
          description: 'Un intérêt durable qui s’avère utile en recherche utilisateur — les gens disent rarement la vraie raison en premier.',
        },
      ],
    },
    now: {
      header: { tag: 'En ce moment', lead: 'Ce que', tail: 'j’explore' },
      statement:
        'Réfléchir à la façon dont l’IA change le cadrage, la conception et la mesure des produits — et construire de petites expériences pour le vérifier, pas seulement en lire des choses.',
    },
    contact: {
      heading: 'Si cette façon de travailler vous parle, échangeons.',
      body: 'Pour des missions produit, design et croissance, ou pour comparer nos vues sur les systèmes et l’IA.',
      primaryLabel: 'Écrire à Sina',
      secondaryLabel: 'LinkedIn',
    },
  },

  ja: {
    title: '自己紹介',
    meta: {
      title: '自己紹介 — Sina Oshaghi',
      description:
        'プロダクトデザイナーが、プロダクト・ビジネス・グロース・システムを横断して考える人間になるまで。軌跡、原則、そして今の方向。',
    },
    hero: {
      heading: 'プロダクトとビジネスとテクノロジーが、別々の専門であることをやめる地点に関心があります。',
      lede: 'インターフェースのデザインから、より広い責任へ移ってきた10年。ビジョン、グロース、その下にあるシステムとダッシュボード。本当の問題はたいていそこにあるからです。',
    },
    biography: {
      heading: '偶然に、そして選択としてのハイブリッド。',
      body: [
        'デジタルプロダクトをデザインし、マネジメントし、その後きちんと伸ばすところまでを担います。10年のあいだに、フィンテック（DigikalaのDigital Gold）、クラウドインフラ（Arvan Cloud）、自動車マーケットプレイス（CarsparencyとKhodro45）、教育（OTeacher、Biomaze）、メディア（Didestan）、通信（A1Paradise）へと広がってきました。',
        'これらの役割に共通する型は珍しいものです。同じ人間がリサーチをし、プロダクトをデザインし、市場投入を進め、それがうまくいったかを示すダッシュボードまで作る。Digikalaではそれが、Digital Goldのビジョンと機能の定義、手数料ゼロ・分割・ギフトカードの各キャンペーンの設計、資産・属性・行動に基づくセグメンテーションモデルの構築、そしてチームのスプレッドシートをNMV・CTR・CPC・コンバージョンを追うBIダッシュボードに置き換えることを意味しました。あわせて、後払いや金を担保とした与信といった構想も持ち込みました。',
        'それ以前のArvan Cloudでは、ユーザーが実際に必要としていた指標を軸に情報設計を組み直したことで、NPSが明確に改善しました。Carsparencyでは、UAE市場向けの売買プラットフォームを一式設計し、成約率が上がるまでテストを重ねました。',
        'アザド大学でインダストリアルデザインを学び、現在もInteraction Design Foundationでインタラクションデザインを学び続けています。画面の外では、バイク、山、そして精神分析への変わらぬ関心。これがユーザーリサーチに案外役立ちます。',
      ],
    },
    journey: {
      header: {
        tag: '軌跡',
        lead: 'ここに',
        tail: '至るまで',
        lede: '作ったものではなく、何に責任を持つかを変えた5つの段階。',
      },
      narratives: [
        '最初の本物の依頼。ミニゲームと通話アプリの粗いアイデアを、人が実際に使えるインターフェースにすること。まず手を動かす技術が先でした。画面、フロー、そして見た目が正しいだけのものではなく、動くものを出す規律。',
        '画面からシステムへの移行。クラウドプラットフォームの再設計とは、画面上の指標がそれを読むエンジニアにとって本当は何を意味するのかを学ぶことでした。インターフェースはもはやプロダクトではなくなり、情報設計こそが本当のデザイン課題になりました。',
        '初めてプラットフォーム全体を任されました。1画面でも1フローでもなく、Carsparencyの英語圏／UAEマーケットプレイス。4つの面を同時に——Pro、オペレーターコンソール、検査員の現場ツール、出品者のウェブ導線。すべて私が書いた1つのデザインシステムの上に。',
        'デザインとプロダクトとグロースが、別々の仕事であることをやめた地点。ビジョン、インターフェース、手数料ゼロと分割のキャンペーン、セグメンテーションモデル、そしてチームのスプレッドシートを置き換えたダッシュボード。すべてがひとつにつながった実践として、最初から最後まで自分の責任でした。',
        '現在は独立し、この幅を自分の条件で使っています。はるかに大きなビジョンを、小さなチームが実際に出せる大きさまで削ること。決定をその場で記録に残すこと。そしてAIを、ひとつに絞る前により多くの方向を探るための作業レイヤーとして扱うこと。',
      ],
      relatedProjectLabel: '主な仕事 → Digital Gold',
    },
    thinking: {
      header: {
        tag: '考え方',
        lead: '画面ではなく',
        tail: 'システムを描く',
        lede: '課題が制約から決定へ、そして結果へと進む道筋のおおまかな地図。',
      },
      nodes: [
        { label: 'ビジネス', annotation: 'どのデザイン上の判断も、いずれビジネス上の制約にぶつかる。最初から知っておくほうがいい。' },
        { label: 'プロダクト', annotation: 'ユーザーのニーズとビジネスの制約が、ひとつのロードマップとして折り合う場所。' },
        { label: 'ユーザー', annotation: 'リサーチは工程ではない。システムを正直に保つものだ。' },
        { label: 'システム', annotation: 'どれかひとつの面を最適化する前に、システム全体を描く。' },
        { label: '実行', annotation: '仮説を実際に検証できる最小のバージョンを出す。' },
        { label: '学習', annotation: '推測よりダッシュボード。データが求めるときに決定を見直す。' },
      ],
    },
    principles: {
      header: {
        tag: '原則',
        lead: '実際に判断を',
        tail: '導いているもの',
        lede: '次に一緒に働く人の役に立つ程度には、具体的に。',
      },
      items: [
        {
          title: '面を最適化する前に、システムを描く。',
          description:
            '再設計された画面は、その下にある情報設計の質を超えない。たいていインターフェースは本当の問題ではありません。',
          evidenceLabel: '事例 → Arvan Cloud',
        },
        {
          title: '決定は結果だけでなく、理由とともに記録する。',
          description:
            '何を決めたかだけでなく、なぜ決めたのかを日付つきで残すと、チームは古い前提から議論せず、同じ最新の事実を土台に動けます。',
          evidenceLabel: '事例 → RP1 / 独立',
        },
        {
          title: 'オーナーシップとは、デザインだけでなくダッシュボードのこと。',
          description:
            'プロダクトを最初から最後まで持つとは、うまくいったと示す数字にも責任を持つということ。インターフェースを出した時点で手放すことではありません。',
          evidenceLabel: '事例 → Digital Gold',
        },
        {
          title: '小さなチームが実際に出せる大きさまで削る。',
          description:
            '大きなビジョンは語るのが簡単で、作るのは難しい。役に立つ技術は、本当の仮説をまだ検証できる最小のバージョンまで削ることです。',
          evidenceLabel: '事例 → RP1 / 独立',
        },
      ],
    },
    teamProcess: {
      header: {
        tag: 'チームとの仕事',
        lead: '決定が実際に',
        tail: '動くしくみ',
        lede: '協働しているという主張ではなく、プロセスとして。',
      },
      nodes: [
        { label: 'ビジネスの文脈', annotation: '制約が本当はどこから来ているのか。予算、期限、関係者の実際の目的。' },
        { label: 'プロダクトの決定', annotation: '一人が決める。ただしその文脈は、影響を受ける全員に見えている。' },
        { label: 'デザイン', annotation: 'ひとつの方向に決める前に、選択肢の広がりを探る。' },
        { label: 'エンジニアリング', annotation: '決まったものを作るだけでなく、実現可能性を形づくれるだけ早く入る。' },
        { label: '検証', annotation: '意見ではなく、ユーザビリティテストと実際の利用データが対立を解く。' },
        { label: '学習', annotation: 'うまくいったこと、いかなかったことが、次のビジネスの文脈に直接つながる。' },
      ],
      statements: [
        {
          title: '意見の対立は記憶ではなく、日付のある記録で解決する。',
          description:
            '2つの仕様が食い違ったときは、新しく、より丁寧に相互参照されたほうを採用しました。静かに差し替えるのではなく明示的に印をつけ、チームが同じ最新の事実の上で作業を続けられるように。',
        },
      ],
    },
    personal: {
      header: { tag: '仕事の外で', lead: '仕事を形づくる', tail: 'そのほかのこと' },
      items: [
        { title: 'バイクと山', description: '冒険と自然。たいていは二輪で。' },
        { title: '旅', description: '異なる仕組み、市場、そして同じ問題の解き方に触れること。' },
        {
          title: '精神分析',
          description: '変わらぬ関心。ユーザーリサーチに役立ちます。人は本当の理由を最初には言わないものなので。',
        },
      ],
    },
    now: {
      header: { tag: '現在', lead: '今', tail: '探っていること' },
      statement:
        'AIがプロダクトの範囲の決め方、デザイン、計測をどう変えるのかを考えています。読むだけでなく、小さな実験を作って確かめながら。',
    },
    contact: {
      heading: 'この働き方が役に立ちそうなら、お話ししましょう。',
      body: 'プロダクト、デザイン、グロースのお仕事について。あるいはシステムとAIについて意見を交わしたい方も。',
      primaryLabel: 'Sinaにメール',
      secondaryLabel: 'LinkedIn',
    },
  },
}
