import type { Payload } from 'payload'

import { DEFAULT_LOCALE, LOCALES } from '@/utilities/locale'

import { navCopy } from '../nav-copy'

/**
 * Write the header and footer globals in every locale.
 *
 * Without this, `/fa/work` and friends render with **no navigation**: `link.label` is localized,
 * so an unseeded locale holds an empty string and `CMSLink` renders nothing at all — the page
 * looks like a design bug rather than a missing translation.
 *
 * Both globals are overlaid onto the English document, never rebuilt, so `navItems[].id`,
 * `link.reference` (a relationship to the work/about/contact pages), `link.url`, `social[].kind`
 * and `social[].href` all survive untouched. Labels are matched by **position**, which is safe
 * because nav order is seeded, not editorial — the assertions below fail loudly if that changes.
 */
export async function seedNavTranslations({ payload }: { payload: Payload }) {
  const header = await payload.findGlobal({ slug: 'header', depth: 0, locale: DEFAULT_LOCALE })
  const footer = await payload.findGlobal({ slug: 'footer', depth: 0, locale: DEFAULT_LOCALE })

  const headerRows = header.navItems ?? []
  const footerRows = footer.navItems ?? []
  const socialRows = footer.social ?? []

  // Position-matched labels only work if the seeded shape is the one this copy was written for.
  if (headerRows.length !== 5) {
    throw new Error(`Expected 5 header nav items, found ${headerRows.length} — re-run the full seed.`)
  }
  if (footerRows.length !== 4) {
    throw new Error(`Expected 4 footer nav items, found ${footerRows.length} — re-run the full seed.`)
  }
  if (socialRows.length !== 4) {
    throw new Error(`Expected 4 footer social links, found ${socialRows.length} — re-run the full seed.`)
  }

  for (const locale of LOCALES) {
    const copy = navCopy[locale]
    const headerLabels = [copy.header.work, copy.header.lab, copy.header.about, copy.header.experience, copy.header.contact]
    const footerLabels = [copy.header.work, copy.header.lab, copy.header.about, copy.header.experience]

    await payload.updateGlobal({
      slug: 'header',
      context: { disableRevalidate: true },
      data: {
        _status: 'published',
        navItems: headerRows.map((row, i) => ({ ...row, link: { ...row.link, label: headerLabels[i]! } })),
      },
      depth: 0,
      locale,
    })

    await payload.updateGlobal({
      slug: 'footer',
      context: { disableRevalidate: true },
      data: {
        _status: 'published',
        about: { ...footer.about, ...copy.footer.about },
        contact: { ...footer.contact, ...copy.footer.contact },
        // The year is computed, not translated — carried through from the English document so a
        // re-run in December does not silently disagree with the English copyright line.
        copyright: footer.copyright,
        description: copy.footer.description,
        navItems: footerRows.map((row, i) => ({ ...row, link: { ...row.link, label: footerLabels[i]! } })),
        navLabel: copy.footer.navLabel,
        pagesTitle: copy.footer.pagesTitle,
        social: socialRows.map((row, i) => ({ ...row, ariaLabel: copy.footer.social[i]! })),
      },
      depth: 0,
      locale,
    })
  }

  payload.logger.info(`— Header and footer written in ${LOCALES.join(', ')}`)

  return { locales: [...LOCALES] }
}
