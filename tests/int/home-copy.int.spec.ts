/**
 * Guards for the homepage copy after the positioning review (D-043):
 * - every locale titles every Tools / Stack category, so no language renders a blank label;
 * - the Selected work lede counts the projects the mosaic actually shows;
 * - the phrases the review flagged as positioning language stay out of the English copy.
 */
import { describe, expect, it } from 'vitest'

import { CATEGORY_KEYS } from '@/blocks/WorkflowStages/toolLogos'
import { aboutGlobalEn } from '@/endpoints/seed/about-global'
import { HOME_MOSAIC } from '@/endpoints/seed/home-content'
import { homeCopy } from '@/endpoints/seed/home-copy'
import { navCopy } from '@/endpoints/seed/nav-copy'
import { LOCALES } from '@/utilities/locale'

describe('Tools / Stack copy parity', () => {
  for (const locale of LOCALES) {
    it(`${locale} titles every category`, () => {
      const copy = homeCopy[locale].tools
      expect(copy.header.lead?.trim(), 'header.lead').toBeTruthy()
      for (const key of CATEGORY_KEYS) {
        expect(copy.categories[key]?.trim(), key).toBeTruthy()
      }
    })
  }
})

describe('Selected work lede', () => {
  it('counts the projects the mosaic shows', () => {
    const words = [
      'Zero',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
      'Ten',
    ]
    const lede = homeCopy.en.selectedWork.header.lede ?? ''
    expect(lede.startsWith(`${words[HOME_MOSAIC.length]} projects`), lede).toBe(true)
  })
})

describe('Positioning language', () => {
  const english = [
    homeCopy.en.meta.title,
    homeCopy.en.meta.description,
    homeCopy.en.hero.heading,
    homeCopy.en.hero.lede,
    navCopy.en.footer.description,
    navCopy.en.footer.about.text,
    aboutGlobalEn.headline,
    aboutGlobalEn.bioShort,
  ].join('\n')

  for (const phrase of [
    'also runs growth',
    'dashboards that prove',
    'one connected',
    'ambiguous',
    'shipped outcomes',
    'Designer & Manager',
  ]) {
    it(`does not say "${phrase}"`, () => {
      expect(english).not.toContain(phrase)
    })
  }
})
