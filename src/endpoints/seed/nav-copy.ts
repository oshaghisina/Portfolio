import type { Locale } from '@/utilities/locale'

/**
 * Header and footer chrome in every site locale. Without this the six non-English locales render
 * with **no navigation at all** — `navItems[].link.label` is a localized leaf, so under
 * `fallback: false` an unseeded locale gets an empty string and `CMSLink` renders nothing.
 *
 * Only localized leaves. `link.type`, `link.url`, `link.reference`, `social[].kind`,
 * `social[].href` and the two `linkHref`s are shared structure and stay in the seed, carried into
 * each locale by the overlay.
 *
 * Nav labels deliberately reuse wording already settled elsewhere so the site does not call the
 * same page two things: "Work" matches `workCopy[locale].title`, "Experience" matches
 * `workCopy[locale].cta.linkLabel` and the footer approach link, "Lab" matches
 * `uiCopy[locale].labArchiveTitle`, and "About" is the About page label.
 */

export interface NavCopy {
  header: { work: string; lab: string; about: string; experience: string; contact: string }
  footer: {
    description: string
    pagesTitle: string
    /** `aria-label` on the footer's `<nav>` — screen-reader only. */
    navLabel: string
    /** Four `aria-label`s, in seed order: email, LinkedIn, Dribbble, Behance. */
    social: [string, string, string, string]
    about: { title: string; text: string; linkLabel: string }
    contact: { title: string; text: string; linkLabel: string }
  }
}

export const navCopy: Record<Locale, NavCopy> = {
  en: {
    header: { work: 'Work', lab: 'Lab', about: 'About', experience: 'Experience', contact: 'Contact' },
    footer: {
      description: 'Product, design, growth and AI systems — built as one connected practice.',
      pagesTitle: 'Explore',
      navLabel: 'Footer navigation',
      social: ['Email Sina', 'Sina on LinkedIn', 'Sina on Dribbble', 'Sina on Behance'],
      about: {
        title: 'Approach',
        text: 'Turning ambiguous product and business problems into structured systems and shipped outcomes.',
        linkLabel: 'Experience',
      },
      contact: {
        title: 'Get in touch',
        text: 'For product, design and growth work.',
        linkLabel: 'Email Sina',
      },
    },
  },

  fa: {
    header: { work: 'پروژه‌ها', lab: 'آزمایشگاه', about: 'درباره', experience: 'تجربه', contact: 'تماس' },
    footer: {
      description: 'محصول، طراحی، رشد و سیستم‌های هوش مصنوعی را در پیوند با هم پیش می‌برم.',
      pagesTitle: 'صفحه‌ها',
      navLabel: 'پیوندهای پایین صفحه',
      social: ['ایمیل به سینا', 'سینا در لینکدین', 'سینا در دریبل', 'سینا در بی‌هنس'],
      about: {
        title: 'رویکرد',
        text: 'مسئله‌های مبهم محصول و کسب‌وکار را به تصمیم‌های روشن، سیستم‌های کارآمد و محصول قابل ارائه تبدیل می‌کنم.',
        linkLabel: 'تجربه',
      },
      contact: {
        title: 'با من در تماس باشید',
        text: 'برای کار در محصول، طراحی و رشد.',
        linkLabel: 'ارسال ایمیل',
      },
    },
  },

  ar: {
    header: { work: 'العمل', lab: 'المختبر', about: 'نبذة', experience: 'الخبرة', contact: 'تواصل' },
    footer: {
      description: 'المنتج والتصميم والنمو وأنظمة الذكاء الاصطناعي — ممارسة واحدة مترابطة.',
      pagesTitle: 'استكشف',
      navLabel: 'تنقّل التذييل',
      social: ['راسل سينا', 'سينا على لينكدإن', 'سينا على دريبل', 'سينا على بيهانس'],
      about: {
        title: 'المنهج',
        text: 'تحويل مشكلات المنتج والأعمال الغامضة إلى أنظمة منظَّمة ونتائج تُشحن فعلًا.',
        linkLabel: 'الخبرة',
      },
      contact: {
        title: 'تواصل معي',
        text: 'لأعمال المنتج والتصميم والنمو.',
        linkLabel: 'راسل سينا',
      },
    },
  },

  es: {
    header: {
      work: 'Trabajo',
      lab: 'Laboratorio',
      about: 'Sobre mí',
      experience: 'Experiencia',
      contact: 'Contacto',
    },
    footer: {
      description: 'Producto, diseño, crecimiento y sistemas de IA: una sola práctica conectada.',
      pagesTitle: 'Explorar',
      navLabel: 'Navegación del pie de página',
      social: ['Escribir a Sina', 'Sina en LinkedIn', 'Sina en Dribbble', 'Sina en Behance'],
      about: {
        title: 'Enfoque',
        text: 'Convertir problemas ambiguos de producto y negocio en sistemas estructurados y resultados lanzados.',
        linkLabel: 'Experiencia',
      },
      contact: {
        title: 'Hablemos',
        text: 'Para trabajo de producto, diseño y crecimiento.',
        linkLabel: 'Escribir a Sina',
      },
    },
  },

  de: {
    header: {
      work: 'Arbeit',
      lab: 'Labor',
      about: 'Über mich',
      experience: 'Erfahrung',
      contact: 'Kontakt',
    },
    footer: {
      description: 'Produkt, Design, Growth und KI-Systeme – als eine zusammenhängende Praxis.',
      pagesTitle: 'Entdecken',
      navLabel: 'Fußzeilen-Navigation',
      social: ['Sina schreiben', 'Sina auf LinkedIn', 'Sina auf Dribbble', 'Sina auf Behance'],
      about: {
        title: 'Ansatz',
        text: 'Mehrdeutige Produkt- und Geschäftsprobleme in strukturierte Systeme und ausgelieferte Ergebnisse überführen.',
        linkLabel: 'Erfahrung',
      },
      contact: {
        title: 'Kontakt aufnehmen',
        text: 'Für Produkt-, Design- und Growth-Arbeit.',
        linkLabel: 'Sina schreiben',
      },
    },
  },

  fr: {
    header: {
      work: 'Travail',
      lab: 'Laboratoire',
      about: 'À propos',
      experience: 'Expérience',
      contact: 'Contact',
    },
    footer: {
      description: 'Produit, design, croissance et systèmes IA — une seule pratique connectée.',
      pagesTitle: 'Explorer',
      navLabel: 'Navigation du pied de page',
      social: ['Écrire à Sina', 'Sina sur LinkedIn', 'Sina sur Dribbble', 'Sina sur Behance'],
      about: {
        title: 'Approche',
        text: 'Transformer des problèmes produit et métier ambigus en systèmes structurés et en résultats livrés.',
        linkLabel: 'Expérience',
      },
      contact: {
        title: 'Me contacter',
        text: 'Pour des missions produit, design et croissance.',
        linkLabel: 'Écrire à Sina',
      },
    },
  },

  ja: {
    header: { work: '仕事', lab: 'ラボ', about: '自己紹介', experience: '経歴', contact: 'お問い合わせ' },
    footer: {
      description: 'プロダクト、デザイン、グロース、AIシステム。ひとつにつながった実践として。',
      pagesTitle: '見る',
      navLabel: 'フッターナビゲーション',
      social: ['Sinaにメール', 'LinkedInのSina', 'DribbbleのSina', 'BehanceのSina'],
      about: {
        title: 'アプローチ',
        text: '曖昧なプロダクトとビジネスの課題を、構造化された仕組みと実際に出せる成果に変える。',
        linkLabel: '経歴',
      },
      contact: {
        title: 'お問い合わせ',
        text: 'プロダクト、デザイン、グロースのお仕事について。',
        linkLabel: 'Sinaにメール',
      },
    },
  },
}
