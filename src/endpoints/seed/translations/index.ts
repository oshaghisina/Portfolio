import type { Payload } from 'payload'

import { seedAboutTranslations } from './about'
import { seedContactTranslations } from './contact'
import { seedExperiencePageTranslations } from './experience'
import { seedExperienceTranslations } from './experiences'
import { seedReviewFlags } from './flags'
import { seedHomeTranslations } from './home'
import { seedNavTranslations } from './nav'
import { seedProjectTranslations } from './projects'

/**
 * Write every CMS surface in every site locale, additively, against a live database.
 *
 * The destructive full seed (`POST /next/seed`) creates English; this fills in the other six
 * languages, and re-running it is a no-op beyond rewriting the same values. Surfaces are
 * independent, so a caller can name just the one it is working on:
 *
 *   pnpm seed:translations            # every surface
 *   pnpm seed:translations home       # just the homepage
 *
 * Runs with no Next server, so every write carries `context: { disableRevalidate: true }` and a
 * hard refresh (or a `pnpm dev` restart) is needed before the new pages are visible — the page
 * cache and the `global_<slug>_<locale>` tags are not busted from here.
 */
export const TRANSLATION_SURFACES = {
  nav: seedNavTranslations,
  home: seedHomeTranslations,
  contact: seedContactTranslations,
  about: seedAboutTranslations,
  experiencePage: seedExperiencePageTranslations,
  projects: seedProjectTranslations,
  experiences: seedExperienceTranslations,
  // Last: it states what is true about everything the surfaces above just wrote.
  flags: seedReviewFlags,
} as const

export type TranslationSurface = keyof typeof TRANSLATION_SURFACES

export const isTranslationSurface = (value: string): value is TranslationSurface =>
  Object.prototype.hasOwnProperty.call(TRANSLATION_SURFACES, value)

export async function seedTranslations({
  only,
  payload,
}: {
  /** Surfaces to write; every surface when omitted. */
  only?: TranslationSurface[]
  payload: Payload
}) {
  const surfaces = only?.length ? only : (Object.keys(TRANSLATION_SURFACES) as TranslationSurface[])
  const results: Record<string, unknown> = {}

  // Sequential on purpose: two surfaces can touch the same document (the homepage's tools block
  // and its layout, say), and parallel writes to one document on a versioned collection race.
  for (const surface of surfaces) {
    results[surface] = await TRANSLATION_SURFACES[surface]({ payload })
  }

  return results
}
