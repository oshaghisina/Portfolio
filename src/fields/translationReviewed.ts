import type { Field } from 'payload'

/**
 * Per-locale review flag so machine-drafted translations are visible as such (D-022).
 *
 * Shared rather than case-study-specific: every localized surface is drafted the same way, so
 * Pages, Projects and Experiences all carry the same checkbox. `localized: true` is the whole
 * point — the flag is per language, not per document, so ticking Persian says nothing about
 * German.
 *
 * `defaultValue: false` is the honest default: a locale nobody has looked at reads as
 * unreviewed. The seeds set it `true` only for the locale they authored from (English), and
 * `false` on every locale they drafted.
 */
export const translationReviewedField: Field = {
  name: 'translationReviewed',
  type: 'checkbox',
  localized: true,
  defaultValue: false,
  label: 'Translation reviewed',
  admin: {
    description:
      'Tick per language once a native speaker has reviewed this locale. Machine-drafted locales stay unticked.',
    position: 'sidebar',
  },
}
