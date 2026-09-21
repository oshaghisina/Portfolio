/**
 * `about` global seed data — compact, sitewide identity facts from Docs/About-Me/Brand-Brief.md.
 * `basedIn`/`openTo`/`portrait` stay empty: not yet confirmed in the source brief (open questions
 * Q2/Q3), and no appropriate editorial portrait exists to use.
 */
export const aboutGlobalEn = {
  name: 'Sina Oshaghi',
  headline: 'Product Designer & Manager',
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
    'طراح و مدیر محصولی که رشد را هم می‌سازد — از پژوهش تا کمپین تا داشبوردهایی که نتیجه را نشان می‌دهند.',
}
