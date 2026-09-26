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
 * `workCopy[locale].cta.linkLabel` and the footer approach link, and "About" is the About page
 * label. Lab is intentionally omitted from chrome (reachable at `/lab` by URL only).
 */

export interface NavCopy {
  header: { work: string; about: string; experience: string; contact: string }
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
    header: { work: 'Work', about: 'About', experience: 'Experience', contact: 'Contact' },
    footer: {
      description: 'Product designer — product strategy, design, growth and AI.',
      pagesTitle: 'Explore',
      navLabel: 'Footer navigation',
      social: ['Email Sina', 'Sina on LinkedIn', 'Sina on Dribbble', 'Sina on Behance'],
      about: {
        title: 'Approach',
        text: 'I work from product definition and research through design, experiments and launch.',
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
    header: { work: 'پروژه‌ها', about: 'درباره', experience: 'تجربه', contact: 'تماس' },
    footer: {
      description: 'طراح محصول، با تمرکز بر استراتژی محصول، طراحی، رشد و هوش مصنوعی.',
      pagesTitle: 'صفحه‌ها',
      navLabel: 'پیوندهای پایین صفحه',
      social: ['ایمیل به سینا', 'سینا در لینکدین', 'سینا در دریبل', 'سینا در بی‌هنس'],
      about: {
        title: 'رویکرد',
        text: 'از تعریف محصول و پژوهش شروع می‌کنم و کار را تا طراحی، آزمایش و عرضه پیش می‌برم.',
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
    header: { work: 'العمل', about: 'نبذة', experience: 'الخبرة', contact: 'تواصل' },
    footer: {
      description: 'مصمم منتج — استراتيجية المنتج والتصميم والنمو والذكاء الاصطناعي.',
      pagesTitle: 'استكشف',
      navLabel: 'تنقّل التذييل',
      social: ['راسل سينا', 'سينا على لينكدإن', 'سينا على دريبل', 'سينا على بيهانس'],
      about: {
        title: 'المنهج',
        text: 'أعمل من تعريف المنتج والبحث، مرورًا بالتصميم والتجارب، حتى الإطلاق.',
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
      about: 'Sobre mí',
      experience: 'Experiencia',
      contact: 'Contacto',
    },
    footer: {
      description: 'Diseñador de producto: estrategia de producto, diseño, crecimiento e IA.',
      pagesTitle: 'Explorar',
      navLabel: 'Navegación del pie de página',
      social: ['Escribir a Sina', 'Sina en LinkedIn', 'Sina en Dribbble', 'Sina en Behance'],
      about: {
        title: 'Enfoque',
        text: 'Trabajo desde la definición del producto y la investigación hasta el diseño, los experimentos y el lanzamiento.',
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
      about: 'Über mich',
      experience: 'Erfahrung',
      contact: 'Kontakt',
    },
    footer: {
      description: 'Produktdesigner – Produktstrategie, Design, Growth und KI.',
      pagesTitle: 'Entdecken',
      navLabel: 'Fußzeilen-Navigation',
      social: ['Sina schreiben', 'Sina auf LinkedIn', 'Sina auf Dribbble', 'Sina auf Behance'],
      about: {
        title: 'Ansatz',
        text: 'Ich arbeite von der Produktdefinition und Recherche über Design und Experimente bis zum Launch.',
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
      about: 'À propos',
      experience: 'Expérience',
      contact: 'Contact',
    },
    footer: {
      description: 'Designer produit — stratégie produit, design, croissance et IA.',
      pagesTitle: 'Explorer',
      navLabel: 'Navigation du pied de page',
      social: ['Écrire à Sina', 'Sina sur LinkedIn', 'Sina sur Dribbble', 'Sina sur Behance'],
      about: {
        title: 'Approche',
        text: 'Je travaille de la définition produit et de la recherche jusqu’au design, aux expérimentations et au lancement.',
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
    header: { work: '仕事', about: '自己紹介', experience: '経歴', contact: 'お問い合わせ' },
    footer: {
      description: 'プロダクトデザイナー。プロダクト戦略、デザイン、グロース、AI。',
      pagesTitle: '見る',
      navLabel: 'フッターナビゲーション',
      social: ['Sinaにメール', 'LinkedInのSina', 'DribbbleのSina', 'BehanceのSina'],
      about: {
        title: 'アプローチ',
        text: 'プロダクトの定義とリサーチから、デザイン、実験、ローンチまでを手がける。',
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
