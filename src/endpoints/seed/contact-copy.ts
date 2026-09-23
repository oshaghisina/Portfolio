import type { Locale } from '@/utilities/locale'

/**
 * The `/contact` page and its form, in every site locale.
 *
 * The form needs no schema change: `@payloadcms/plugin-form-builder` already ships
 * `submitButtonLabel`, `confirmationMessage`, `emails[].subject`, `emails[].message` and each
 * field block's `label` as `localized: true`. They were simply never written in any locale but
 * English, which under `fallback: false` renders as unlabelled inputs and a blank submit button.
 *
 * The English heading was `"Example contact form:"` — unedited Payload starter-template text on a
 * live page. Translating that placeholder into six languages would have shipped the same debris
 * six more times, so it is replaced here with a real heading in every locale, English included.
 * Revert `en.intro` alone if the original wording is wanted back.
 */

export interface ContactCopy {
  /** Admin/document title. */
  title: string
  meta: { title: string; description: string }
  /** The `h3` above the form. */
  intro: string
  form: {
    submitLabel: string
    /** Shown in place of the form once it has been sent. */
    confirmation: string
    emailSubject: string
    emailBody: string
    /** In seed order: full-name, email, phone, message. */
    labels: [string, string, string, string]
  }
}

export const contactCopy: Record<Locale, ContactCopy> = {
  en: {
    title: 'Contact',
    meta: {
      title: 'Contact — Sina Oshaghi',
      description: 'Get in touch about product, design and growth work.',
    },
    intro: 'Get in touch',
    form: {
      submitLabel: 'Send',
      confirmation: 'Thanks — your message came through. I’ll reply soon.',
      emailSubject: 'You’ve received a new message.',
      emailBody: 'Your contact form submission was successfully received.',
      labels: ['Full name', 'Email', 'Phone', 'Message'],
    },
  },
  fa: {
    title: 'تماس',
    meta: {
      title: 'تماس — سینا اوشاقی',
      description: 'برای همکاری در محصول، طراحی و رشد با من تماس بگیرید.',
    },
    intro: 'با من در تماس باشید',
    form: {
      submitLabel: 'ارسال پیام',
      confirmation: 'ممنون، پیامتان را دریافت کردم. به‌زودی پاسخ می‌دهم.',
      emailSubject: 'پیام تازه‌ای دریافت کرده‌اید.',
      emailBody: 'پیام تازه‌ای از فرم تماس سایت دریافت شد.',
      labels: ['نام و نام خانوادگی', 'ایمیل', 'تلفن', 'پیام'],
    },
  },
  ar: {
    title: 'تواصل',
    meta: {
      title: 'تواصل — سينا أوشاقي',
      description: 'تواصل بشأن أعمال المنتج والتصميم والنمو.',
    },
    intro: 'تواصل معي',
    form: {
      submitLabel: 'إرسال',
      confirmation: 'شكرًا — وصلت رسالتك. سأردّ قريبًا.',
      emailSubject: 'وصلتك رسالة جديدة.',
      emailBody: 'تم استلام نموذج التواصل الخاص بك بنجاح.',
      labels: ['الاسم الكامل', 'البريد الإلكتروني', 'الهاتف', 'الرسالة'],
    },
  },
  es: {
    title: 'Contacto',
    meta: {
      title: 'Contacto — Sina Oshaghi',
      description: 'Ponte en contacto para trabajo de producto, diseño y crecimiento.',
    },
    intro: 'Hablemos',
    form: {
      submitLabel: 'Enviar',
      confirmation: 'Gracias, tu mensaje ha llegado. Responderé pronto.',
      emailSubject: 'Has recibido un mensaje nuevo.',
      emailBody: 'Tu envío del formulario de contacto se ha recibido correctamente.',
      labels: ['Nombre completo', 'Correo electrónico', 'Teléfono', 'Mensaje'],
    },
  },
  de: {
    title: 'Kontakt',
    meta: {
      title: 'Kontakt — Sina Oshaghi',
      description: 'Melden Sie sich für Produkt-, Design- und Growth-Arbeit.',
    },
    intro: 'Kontakt aufnehmen',
    form: {
      submitLabel: 'Senden',
      confirmation: 'Danke – Ihre Nachricht ist angekommen. Ich melde mich bald.',
      emailSubject: 'Sie haben eine neue Nachricht erhalten.',
      emailBody: 'Ihre Kontaktformular-Einsendung wurde erfolgreich empfangen.',
      labels: ['Vollständiger Name', 'E-Mail', 'Telefon', 'Nachricht'],
    },
  },
  fr: {
    title: 'Contact',
    meta: {
      title: 'Contact — Sina Oshaghi',
      description: 'Écrivez-moi pour des missions produit, design et croissance.',
    },
    intro: 'Me contacter',
    form: {
      submitLabel: 'Envoyer',
      confirmation: 'Merci — votre message est bien arrivé. Je réponds bientôt.',
      emailSubject: 'Vous avez reçu un nouveau message.',
      emailBody: 'Votre envoi du formulaire de contact a bien été reçu.',
      labels: ['Nom complet', 'E-mail', 'Téléphone', 'Message'],
    },
  },
  ja: {
    title: 'お問い合わせ',
    meta: {
      title: 'お問い合わせ — Sina Oshaghi',
      description: 'プロダクト、デザイン、グロースのお仕事についてご連絡ください。',
    },
    intro: 'お問い合わせ',
    form: {
      submitLabel: '送信',
      confirmation: 'ありがとうございます。メッセージを受け取りました。追ってご返信します。',
      emailSubject: '新しいメッセージが届きました。',
      emailBody: 'お問い合わせフォームの送信を受け付けました。',
      labels: ['お名前', 'メールアドレス', '電話番号', 'メッセージ'],
    },
  },
}
