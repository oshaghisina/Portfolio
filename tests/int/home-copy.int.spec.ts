/**
 * Guards for the homepage copy after the positioning review (D-043):
 * - every locale's Skills list keeps English's shape, so no language silently drops a skill;
 * - the Selected work lede counts the projects the mosaic actually shows;
 * - the phrases the review flagged as positioning language stay out of the English copy.
 */
import { describe, expect, it } from 'vitest'

import { CAPABILITY_KEYS } from '@/blocks/WorkflowStages/capabilities'
import { aboutGlobalEn } from '@/endpoints/seed/about-global'
import { HOME_MOSAIC } from '@/endpoints/seed/home-content'
import { homeCopy } from '@/endpoints/seed/home-copy'
import { navCopy } from '@/endpoints/seed/nav-copy'
import { LOCALES } from '@/utilities/locale'

describe('Skills copy parity', () => {
  const en = homeCopy.en.tools

  for (const locale of LOCALES) {
    it(`${locale} matches English's shape`, () => {
      const copy = homeCopy[locale].tools
      expect(copy.toolsLabel.trim(), 'toolsLabel').not.toBe('')
      expect(copy.header.lead?.trim(), 'header.lead').toBeTruthy()

      for (const key of CAPABILITY_KEYS) {
        const row = copy.capabilities[key]
        expect(row.title.trim(), `${key}.title`).not.toBe('')
        expect(row.skills, `${key}.skills`).toHaveLength(en.capabilities[key].skills.length)
        for (const skill of row.skills) expect(skill.trim(), `${key} skill`).not.toBe('')
        expect(Boolean(row.note), `${key}.note`).toBe(Boolean(en.capabilities[key].note))
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
    ...Object.values(homeCopy.en.tools.header),
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
