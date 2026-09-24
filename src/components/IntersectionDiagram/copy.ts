import type { Locale } from '@/utilities/locale'

type IntersectionCopy = { lenses: [string, string, string]; outcome: string }
export const intersectionCopy: Record<Locale, IntersectionCopy> = {
  en: {
    lenses: ['People & experience', 'Value & growth', 'Systems & delivery'],
    outcome: 'Useful to people. Viable for the business. Built to work.',
  },
  fa: {
    lenses: ['آدم‌ها و تجربه', 'ارزش و رشد', 'سیستم و اجرا'],
    outcome: 'مفید برای آدم‌ها؛ ارزشمند برای کسب‌وکار؛ قابل‌اجرا در عمل.',
  },
  ar: {
    lenses: ['الأشخاص والتجربة', 'القيمة والنمو', 'الأنظمة والتنفيذ'],
    outcome: 'مفيد للناس، مجدٍ للأعمال، وقابل للتنفيذ.',
  },
  es: {
    lenses: ['Personas y experiencia', 'Valor y crecimiento', 'Sistemas y entrega'],
    outcome: 'Útil para las personas. Viable para el negocio. Hecho para funcionar.',
  },
  de: {
    lenses: ['Menschen & Erlebnis', 'Wert & Wachstum', 'Systeme & Umsetzung'],
    outcome: 'Nützlich für Menschen. Tragfähig fürs Geschäft. Umsetzbar in der Praxis.',
  },
  fr: {
    lenses: ['Personnes et expérience', 'Valeur et croissance', 'Systèmes et réalisation'],
    outcome: 'Utile aux personnes. Viable pour l’entreprise. Conçu pour fonctionner.',
  },
  ja: {
    lenses: ['人と体験', '価値と成長', '仕組みと実装'],
    outcome: '人に役立ち、事業として成立し、実際に機能する。',
  },
}
