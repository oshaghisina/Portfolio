/**
 * `about` global seed data — compact, sitewide identity facts from Docs/About-Me/Brand-Brief.md.
 *
 * `openTo` is now `['freelance']`: the brief's Q8 was resolved on 2026-09-23 against eleven
 * independent engagements under Docs/Experience/Projects/, one with a quoted fee and two with
 * drafted engagement agreements. Whether full-time, consulting or advisory also apply is still
 * the brief's Q3, so they stay off rather than being guessed.
 *
 * `basedIn`/`portrait` stay empty: still unconfirmed (brief Q2), and no appropriate editorial
 * portrait exists to use.
 */
export const aboutGlobalEn = {
  name: 'Sina Oshaghi',
  headline: 'Product Designer & Manager',
  openTo: ['freelance' as const],
  tagline: 'Product, design and growth, end to end.',
  bioShort:
    'Product designer and manager who also runs growth — from research to campaigns to the dashboards that prove it.',
  links: [
    { platform: 'email' as const, url: 'mailto:sinaoshaghi@gmail.com' },
    { platform: 'linkedin' as const, url: 'https://ir.linkedin.com/in/sinaoshaghi' },
    { platform: 'dribbble' as const, url: 'https://dribbble.com/ceendesign' },
    { platform: 'behance' as const, url: 'https://behance.net/sinaoshaghi' },
  ],
}

export const aboutGlobalFa = {
  name: 'سینا اوشاقی',
  headline: 'طراح و مدیر محصول',
  tagline: 'محصول، طراحی و رشد، از ابتدا تا انتها.',
  bioShort:
    'طراح و مدیر محصول؛ از پژوهش و کمپین تا سنجش رشد و نتیجه با داده.',
}
