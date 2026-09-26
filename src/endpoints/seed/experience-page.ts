import type { Payload } from 'payload'

import { DEFAULT_LOCALE, LOCALES } from '@/utilities/locale'

import { experiencePageCopy } from './experience-page-copy'
import { HOME_TEASER_METRICS, localizeHomeLayout } from './home-content'
import {
  buildExperienceHero,
  buildExperiencePage,
  buildExperienceTeaserBlock,
  EXPERIENCE_PATH,
  EXPERIENCE_SLUG,
  localizeExperienceLayout,
} from './experience-page-content'

/**
 * Create (or refresh) `/experience` in the current database without wiping anything, then point
 * the navigation at it and bring the homepage's Experience section in step with it:
 *
 *   pnpm seed:experience
 *
 * Additive and idempotent. The full seed (`POST /next/seed`) is destructive — it clears nine
 * collections and re-reads `Docs/About-Me/Resume.pdf` from disk — so this is the path to use
 * while the page is being built.
 *
 * Runs with no Next server, so every write carries `disableRevalidate`. The page itself appears
 * immediately, but **the navigation will not**: header and footer are served through
 * `getCachedGlobal`'s `unstable_cache`, whose `global_<slug>_<locale>` tags can only be busted
 * from inside Next (see `app/(frontend)/next/seed/route.ts`). That cache is on disk, so it
 * outlives a restart. To see the repointed nav, either run the admin Seed button once — it calls
 * `revalidateTag` for every global and locale — or:
 *
 *   rm -rf .next/cache && pnpm dev
 *
 * Until then the site still links to the old `/#experience` anchor even though the database no
 * longer holds it.
 */
export async function seedExperiencePage({ payload }: { payload: Payload }) {
  // Project ids power the evidence relationships. A missing project is not fatal: the reference
  // simply stays plain text, which is what it would render as anyway until a case study publishes.
  const { docs: projects } = await payload.find({
    collection: 'projects',
    depth: 0,
    draft: true,
    limit: 0,
    locale: DEFAULT_LOCALE,
    pagination: false,
  })
  const projectIds = new Map(projects.map((project) => [project.slug, project.id]))

  const { docs: existing } = await payload.find({
    collection: 'pages',
    depth: 0,
    draft: true,
    limit: 1,
    locale: DEFAULT_LOCALE,
    pagination: false,
    where: { slug: { equals: EXPERIENCE_SLUG } },
  })

  const data = buildExperiencePage(experiencePageCopy.en, projectIds)

  const page = existing[0]
    ? await payload.update({
        collection: 'pages',
        id: existing[0].id,
        context: { disableRevalidate: true },
        data,
        depth: 0,
        locale: DEFAULT_LOCALE,
      })
    : await payload.create({
        collection: 'pages',
        context: { disableRevalidate: true },
        data,
        depth: 0,
      })

  // Re-read so the locale pass overlays the row ids the write just produced, not the ones we sent.
  const stored = await payload.findByID({
    collection: 'pages',
    id: page.id,
    depth: 0,
    draft: true,
    locale: DEFAULT_LOCALE,
  })

  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue
    const copy = experiencePageCopy[locale]
    await payload.update({
      collection: 'pages',
      id: page.id,
      context: { disableRevalidate: true },
      data: {
        _status: 'published',
        hero: buildExperienceHero(copy, locale),
        layout: localizeExperienceLayout(locale, stored.layout),
        meta: { ...stored.meta, description: copy.meta.description, title: copy.meta.title },
        title: copy.title,
        translationReviewed: false,
      },
      depth: 0,
      locale,
    })
  }

  const nav = await repointNavigation({ payload, pageId: page.id })
  const home = await syncHomeExperienceSection({ payload })

  payload.logger.info(`— /experience ${existing[0] ? 'updated' : 'created'} (page ${page.id})`)

  return { pageId: page.id, created: !existing[0], nav, home }
}

/**
 * Swap the header and footer "Experience" rows from the old `/#experience` anchor to the real
 * page, and repoint the footer's "Approach" card.
 *
 * Rows are rewritten in place, never added or removed: `translations/nav.ts` maps labels
 * **positionally** and throws if the header row count is not 5 or the footer's not 4.
 */
async function repointNavigation({ payload, pageId }: { payload: Payload; pageId: string }) {
  // `url: null` is load-bearing. Payload merges fields it is not sent, so omitting `url` would
  // leave the old `/#experience` on the row — dead data that `hrefFromLink` ignores today but
  // that would resurrect the anchor the moment anyone flipped the type back to `custom`.
  const reference = {
    type: 'reference' as const,
    label: 'Experience',
    reference: { relationTo: 'pages' as const, value: pageId },
    url: null,
  }

  const isExperienceRow = (row: { link?: { label?: null | string; url?: null | string } }) =>
    row.link?.label === 'Experience' || row.link?.url === '/#experience'

  const header = await payload.findGlobal({ slug: 'header', depth: 0, locale: DEFAULT_LOCALE })
  const headerRows = (header.navItems ?? []).map((row) =>
    isExperienceRow(row) ? { ...row, link: reference } : row,
  )
  await payload.updateGlobal({
    slug: 'header',
    context: { disableRevalidate: true },
    data: { navItems: headerRows },
    depth: 0,
    locale: DEFAULT_LOCALE,
  })

  const footer = await payload.findGlobal({ slug: 'footer', depth: 0, locale: DEFAULT_LOCALE })
  const footerRows = (footer.navItems ?? []).map((row) =>
    isExperienceRow(row) ? { ...row, link: reference } : row,
  )
  await payload.updateGlobal({
    slug: 'footer',
    context: { disableRevalidate: true },
    data: {
      navItems: footerRows,
      ...(footer.about ? { about: { ...footer.about, linkHref: EXPERIENCE_PATH } } : {}),
    },
    depth: 0,
    locale: DEFAULT_LOCALE,
  })

  return { header: headerRows.length, footer: footerRows.length }
}

/**
 * Bring the homepage's Experience section up to date: insert it if missing, otherwise rewrite it
 * in place, and retire the standalone "Proof" metrics strip it absorbed. Placed just after the
 * employer grid, so "where I worked" hands off to "what that took" and the counts land directly
 * beneath the grid that substantiates them.
 *
 * Idempotent, and id-preserving: the teaser row and every array row inside it keep the ids they
 * already have, so re-running churns no ids and `audit:translations` stays quiet. A row written
 * without its id would be a *new* row, and the layout array is shared across locales.
 */
async function syncHomeExperienceSection({ payload }: { payload: Payload }) {
  const { docs } = await payload.find({
    collection: 'pages',
    depth: 0,
    draft: true,
    limit: 1,
    locale: DEFAULT_LOCALE,
    pagination: false,
    where: { slug: { equals: 'home' } },
  })

  const home = docs[0]
  if (!home?.layout?.length) return { reason: 'no home page', synced: false }

  const fresh = buildExperienceTeaserBlock(DEFAULT_LOCALE, HOME_TEASER_METRICS)
  const previous = home.layout.find((block) => block.blockType === 'experienceTeaser')

  // Carry forward whatever ids already exist; `undefined` simply lets Payload mint a new one.
  const keepIds = <T,>(rows: T[], existing: undefined | { id?: null | string }[]) =>
    rows.map((row, i) => ({ ...row, id: existing?.[i]?.id ?? undefined }))

  const block = {
    ...fresh,
    ...(previous?.id ? { id: previous.id } : {}),
    capabilities: keepIds(fresh.capabilities, previous?.capabilities ?? undefined),
    links: keepIds(fresh.links, previous?.links ?? undefined),
    metrics: keepIds(fresh.metrics, previous?.metrics ?? undefined),
  }

  // The metrics strip is now the proof row inside this section — drop the standalone one so the
  // page never carries the same three numbers twice.
  const withoutRetired = home.layout.filter(
    (row) => row.blockType !== 'metricsStrip' && row.blockType !== 'experienceTeaser',
  )
  const at = withoutRetired.findIndex((row) => row.blockType === 'experienceCatalogue')
  const index = at === -1 ? withoutRetired.length : at + 1
  const layout = [
    ...withoutRetired.slice(0, index),
    block,
    ...withoutRetired.slice(index),
  ] as typeof home.layout

  await payload.update({
    collection: 'pages',
    id: home.id,
    context: { disableRevalidate: true },
    data: { layout },
    depth: 0,
    locale: DEFAULT_LOCALE,
  })

  // Re-read for the row ids the write produced, then carry the section into every other locale.
  const stored = await payload.findByID({
    collection: 'pages',
    id: home.id,
    depth: 0,
    draft: true,
    locale: DEFAULT_LOCALE,
  })

  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue
    await payload.update({
      collection: 'pages',
      id: home.id,
      context: { disableRevalidate: true },
      data: { layout: localizeHomeLayout(locale, stored.layout!) },
      depth: 0,
      locale,
    })
  }

  return { existed: Boolean(previous), index, synced: true }
}
