/** The site's name — the `<title>` suffix and the Open Graph `siteName`. */
export const SITE_NAME = 'Sina Oshaghi'

/**
 * `"Page | Sina Oshaghi"` — never doubled: the homepage's meta title already carries the name,
 * and a title that mentions it anywhere is left alone.
 */
export const withSiteName = (title?: string | null): string =>
  !title ? SITE_NAME : title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
