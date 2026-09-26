/**
 * `about` global seed data — compact, sitewide identity facts from Docs/About-Me/Brand-Brief.md.
 *
 * `openTo` is now `['freelance']`: the brief's Q8 was resolved on 2026-09-23 against eleven
 * independent engagements under Docs/Experience/Projects/, one with a quoted fee and two with
 * drafted engagement agreements. Whether full-time, consulting or advisory also apply is still
 * the brief's Q3, so they stay off rather than being guessed.
 *
 * `basedIn` stays empty (brief Q2 still unconfirmed). `portrait` is seeded from
 * `Docs/About-Me/portrait.jpg` when that file is present (see seed index / about-portrait sync).
 */
export const aboutGlobalEn = {
  name: 'Sina Oshaghi',
  headline: 'Product Designer',
  openTo: ['freelance' as const],
  tagline: 'Product, design and growth, end to end.',
  bioShort:
    'Product designer with ten years in fintech, cloud, automotive, edtech and media — product strategy, design, growth and AI.',
  links: [
    { platform: 'email' as const, url: 'mailto:sinaoshaghi@gmail.com' },
    { platform: 'linkedin' as const, url: 'https://ir.linkedin.com/in/sinaoshaghi' },
    { platform: 'dribbble' as const, url: 'https://dribbble.com/ceendesign' },
    { platform: 'behance' as const, url: 'https://behance.net/sinaoshaghi' },
  ],
}

export const aboutGlobalFa = {
  name: 'سینا عشاقی',
  headline: 'طراح محصول',
  tagline: 'محصول، طراحی و رشد، از ابتدا تا انتها.',
  bioShort:
    'طراح محصول با ده سال تجربه در فین‌تک، زیرساخت ابری، خودرو، آموزش و رسانه. روی استراتژی محصول، طراحی، رشد و هوش مصنوعی کار می‌کنم.',
}

/** Idempotent media spec for the About opener portrait (`upsertMedia`). */
export const ABOUT_PORTRAIT_MEDIA = {
  file: 'portrait.jpg',
  name: 'sina-oshaghi-portrait.jpg',
  alt: {
    en: 'Sina Oshaghi',
    fa: 'سینا عشاقی',
  },
} as const

export const ABOUT_PORTRAIT_ASSETS_DIR = 'Docs/About-Me'
