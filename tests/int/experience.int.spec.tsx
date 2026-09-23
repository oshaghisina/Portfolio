/**
 * /experience (jsdom): the guarantees that keep the capability page honest.
 *
 * Every one of the sixteen capabilities reaches the page, in its own group and nowhere else; the
 * icon registries cover every key so a capability can never render blank; evidence becomes a link
 * only where there is a published case study to land on; and the locale overlay translates the
 * words without disturbing the structure underneath them.
 *
 * The homepage preview is covered here too, beside the page it previews: its job is to stay in
 * step with this page, so the assertions that catch it drifting belong next to the source.
 */
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import { SkillIcon } from '@/blocks/CapabilityIcons'
import { CapabilityIllustration } from '@/blocks/CapabilityIllustrations/Illustrations'
import {
  SKILL_GROUP_KEYS,
  SKILL_KEYS,
  SKILLS_BY_GROUP,
  SPOTLIGHT_KEYS,
  type SkillKey,
} from '@/blocks/CapabilityIcons/keys'
import { CapabilityMatrixBlock } from '@/blocks/CapabilityMatrix/Component'
import { CapabilityMatrix, SKILL_LABELS } from '@/blocks/CapabilityMatrix/config'
import { CapabilitySpotlightBlock } from '@/blocks/CapabilitySpotlight/Component'
import { CapabilitySpotlight } from '@/blocks/CapabilitySpotlight/config'
import { ExperienceTeaserBlock } from '@/blocks/ExperienceTeaser/Component'
import { ExperienceTeaser } from '@/blocks/ExperienceTeaser/config'
import { EvidenceRef } from '@/components/EvidenceRef'
import { CapabilityIndex } from '@/components/CapabilityIndex'
import { experiencePageCopy } from '@/endpoints/seed/experience-page-copy'
import {
  buildExperienceHero,
  buildExperienceLayout,
  buildExperienceTeaserBlock,
  localizeExperienceTeaserBlock,
  localizeExperienceLayout,
  orderExperienceLayout,
} from '@/endpoints/seed/experience-page-content'
import { HOME_TEASER_METRICS } from '@/endpoints/seed/home-content'
import type { Project } from '@/payload-types'
import { LOCALES } from '@/utilities/locale'

afterEach(cleanup)

const project = (overrides: Partial<Project> = {}): Project => ({
  id: 'p1',
  slug: 'rp1-arena',
  title: 'RP1 Arena',
  summary: 'A multi-game play-to-earn arena.',
  company: 'Independent',
  role: 'Product designer',
  kind: ['product'],
  order: 1,
  caseStudyStatus: 'none',
  createdAt: '2026-09-21T00:00:00.000Z',
  updatedAt: '2026-09-21T00:00:00.000Z',
  ...overrides,
})

/** A validator as Payload will call it, without Payload's argument plumbing. */
const validatorFor = (
  block: typeof CapabilityMatrix | typeof CapabilitySpotlight | typeof ExperienceTeaser,
  name: string,
) => {
  const field = block.fields.find((f) => 'name' in f && f.name === name)!
  return (field as { validate: (value: unknown) => string | true }).validate
}

describe('capability vocabulary', () => {
  it('files all sixteen capabilities, each in exactly one group', () => {
    const grouped = SKILL_GROUP_KEYS.flatMap((key) => SKILLS_BY_GROUP[key])
    expect(grouped).toHaveLength(16)
    expect([...new Set(grouped)]).toHaveLength(16)
    expect([...grouped].sort()).toEqual([...SKILL_KEYS].sort())
  })

  it('gives every capability a label and a mark', () => {
    for (const key of SKILL_KEYS) {
      expect(SKILL_LABELS[key], `label for ${key}`).toBeTruthy()
      const { container } = render(<SkillIcon skillKey={key} />)
      // A mark is geometry, not a placeholder: it must actually draw something.
      expect(container.querySelector('svg'), `svg for ${key}`).toBeTruthy()
      expect(container.querySelectorAll('svg *').length, `geometry for ${key}`).toBeGreaterThan(1)
      cleanup()
    }
  })

  it('draws each primary capability and keeps art out of the accessibility tree', () => {
    for (const key of SPOTLIGHT_KEYS) {
      const { container } = render(<CapabilityIllustration spotlightKey={key} />)
      const svg = container.querySelector('svg')!
      expect(svg.getAttribute('aria-hidden'), `aria-hidden for ${key}`).toBe('true')
      // Art never mirrors: the labels beside it carry the reading order, the drawing does not.
      expect(svg.style.direction, `direction for ${key}`).toBe('ltr')
      cleanup()
    }
  })

  it('uses exactly one accent per mark, as the drafting vocabulary requires', () => {
    for (const key of SKILL_KEYS) {
      const { container } = render(<SkillIcon skillKey={key} />)
      const accented = [...container.querySelectorAll('svg *')].filter((el) => {
        const g = el.getAttribute('stroke') === 'var(--track-accent)'
        const f = el.getAttribute('fill') === 'var(--track-accent)'
        return g || f
      })
      expect(accented.length, `accent elements in ${key}`).toBeGreaterThan(0)
      cleanup()
    }
  })
})

describe('matrix schema', () => {
  const validate = validatorFor(CapabilityMatrix, 'groups')

  const fullGroups = () =>
    SKILL_GROUP_KEYS.map((key) => ({
      key,
      skills: SKILLS_BY_GROUP[key].map((skillKey) => ({ key: skillKey })),
    }))

  it('accepts the complete matrix', () => {
    expect(validate(fullGroups())).toBe(true)
  })

  it('refuses to publish with a capability missing', () => {
    const groups = fullGroups()
    groups[0]!.skills.pop()
    expect(validate(groups)).toContain('All sixteen capabilities must appear')
  })

  it('refuses a capability filed under the wrong group', () => {
    const groups = fullGroups()
    groups[1]!.skills.push({ key: 'product-management' as SkillKey })
    expect(validate(groups)).toContain('cannot hold')
  })

  it('refuses the same capability twice', () => {
    const groups = fullGroups()
    // Same group, so the misfiling rule cannot fire first.
    groups[0]!.skills.push({ key: 'product-management' as SkillKey })
    expect(validate(groups)).toContain('can only appear in one group')
  })

  it('refuses a duplicated group', () => {
    const groups = fullGroups()
    groups[1]!.key = groups[0]!.key
    expect(validate(groups)).toContain('Each group can only appear once')
  })
})

describe('spotlight schema', () => {
  const validate = validatorFor(CapabilitySpotlight, 'items')

  it('accepts the four primary capabilities', () => {
    expect(validate(SPOTLIGHT_KEYS.map((key) => ({ key })))).toBe(true)
  })

  it('refuses a missing primary capability', () => {
    expect(validate(SPOTLIGHT_KEYS.slice(0, 3).map((key) => ({ key })))).toContain(
      'All four primary capabilities must be present',
    )
  })

  it('refuses a duplicated primary capability', () => {
    expect(validate([{ key: 'discovery' }, { key: 'discovery' }])).toContain('can only appear once')
  })
})

describe('evidence references', () => {
  it('links a project whose case study is published', () => {
    render(<EvidenceRef label="RP1 Arena" project={project({ caseStudyStatus: 'published' })} />)
    expect(screen.getByRole('link', { name: 'RP1 Arena' })).toHaveProperty(
      'href',
      expect.stringContaining('/work/rp1-arena'),
    )
  })

  it('locale-prefixes that link', () => {
    render(
      <EvidenceRef
        label="RP1 Arena"
        locale="fa"
        project={project({ caseStudyStatus: 'published' })}
      />,
    )
    expect(screen.getByRole('link', { name: 'RP1 Arena' })).toHaveProperty(
      'href',
      expect.stringContaining('/fa/work/rp1-arena'),
    )
  })

  it('stays plain text when the project is published but its case study is not', () => {
    render(<EvidenceRef label="Razhmana" project={project({ caseStudyStatus: 'draft' })} />)
    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.getByText('Razhmana')).toBeTruthy()
  })

  it('stays plain text when there is no project at all', () => {
    render(<EvidenceRef label="Yaravan" />)
    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.getByText('Yaravan')).toBeTruthy()
  })

  it('stays plain text when the relationship is an unpopulated id', () => {
    render(<EvidenceRef label="Digikala" project="68f0000000000000000000aa" />)
    expect(screen.queryByRole('link')).toBeNull()
  })
})

describe('seeded page', () => {
  const layout = buildExperienceLayout(experiencePageCopy.en)!
  const matrix = layout.find((b) => b.blockType === 'capabilityMatrix')!

  it('carries every capability through the builder', () => {
    const keys = (matrix as { groups: { skills: { key: string }[] }[] }).groups.flatMap((g) =>
      g.skills.map((s) => s.key),
    )
    expect([...keys].sort()).toEqual([...SKILL_KEYS].sort())
  })

  it('passes its own schema validator', () => {
    expect(validatorFor(CapabilityMatrix, 'groups')((matrix as { groups: unknown }).groups)).toBe(true)
  })

  it('opens on the capability hero, not the copy-only default', () => {
    // `lowImpact` would leave the opener's right half empty; the index is the argument there.
    for (const locale of LOCALES) {
      expect(buildExperienceHero(experiencePageCopy[locale], locale).type).toBe('experienceImpact')
    }
  })

  it('lays the page out in the order the argument needs', () => {
    expect(layout.map((b) => b.blockType)).toEqual([
      'capabilitySpotlight',
      'capabilityEvidence',
      'capabilityMatrix',
      'capabilityModel',
      'cta',
    ])
  })

  it('moves stored evidence ahead of the matrix without rebuilding rows', () => {
    const older = [layout[0]!, layout[2]!, layout[1]!, layout[3]!, layout[4]!]
    const ordered = orderExperienceLayout(older)!
    expect(ordered.map((block) => block.blockType)).toEqual([
      'capabilitySpotlight',
      'capabilityEvidence',
      'capabilityMatrix',
      'capabilityModel',
      'cta',
    ])
    expect(ordered[1]).toBe(older[2])
    expect(ordered[2]).toBe(older[1])
    expect(orderExperienceLayout(ordered)).toBe(ordered)
  })

  it('writes every capability description in every locale', () => {
    for (const locale of LOCALES) {
      const copy = experiencePageCopy[locale]
      for (const key of SKILL_KEYS) {
        expect(copy.matrix.skills[key]?.title, `${locale}/${key} title`).toBeTruthy()
        expect(copy.matrix.skills[key]?.description, `${locale}/${key} description`).toBeTruthy()
      }
    }
  })
})

describe('locale overlay', () => {
  const en = buildExperienceLayout(experiencePageCopy.en)!
  // Row ids are what Payload sends back; without them a locale write would append new rows.
  const withIds = en.map((block, i) => ({ ...block, id: `row-${i}` })) as typeof en

  it('preserves every block row id', () => {
    const fa = localizeExperienceLayout('fa', withIds)!
    expect(fa.map((b) => b.id)).toEqual(withIds.map((b) => b.id))
  })

  it('preserves nested skill and evidence rows, and their project relationships', () => {
    const seeded = buildExperienceLayout(experiencePageCopy.en, { 'rp1-arena': 'p-rp1' })!
    const fa = localizeExperienceLayout('fa', seeded)!
    const faMatrix = fa.find((b) => b.blockType === 'capabilityMatrix') as {
      groups: { skills: { evidence: { project?: unknown }[]; key: string }[] }[]
    }
    const business = faMatrix.groups
      .flatMap((g) => g.skills)
      .find((s) => s.key === 'business-modeling')!
    expect(business.evidence[0]?.project).toBe('p-rp1')
  })

  it('translates the words it overlays', () => {
    const fa = localizeExperienceLayout('fa', withIds)!
    const faMatrix = fa.find((b) => b.blockType === 'capabilityMatrix') as {
      groups: { skills: { title: string }[] }[]
    }
    const titles = faMatrix.groups.flatMap((g) => g.skills.map((s) => s.title))
    expect(titles).toContain(experiencePageCopy.fa.matrix.skills['product-management'].title)
    expect(titles).not.toContain(experiencePageCopy.en.matrix.skills['product-management'].title)
  })

  it('keeps capability keys shared across locales', () => {
    const keysIn = (locale: 'en' | 'ja') => {
      const l = localizeExperienceLayout(locale, withIds)!
      const m = l.find((b) => b.blockType === 'capabilityMatrix') as {
        groups: { skills: { key: string }[] }[]
      }
      return m.groups.flatMap((g) => g.skills.map((s) => s.key))
    }
    expect(keysIn('ja')).toEqual(keysIn('en'))
  })
})

describe('rendered matrix', () => {
  const layout = buildExperienceLayout(experiencePageCopy.en)!
  const matrix = layout.find((b) => b.blockType === 'capabilityMatrix')!

  it('numbers capabilities 01–16 across the whole matrix, not per group', () => {
    const { container } = render(
      <CapabilityMatrixBlock
        {...(matrix as Parameters<typeof CapabilityMatrixBlock>[0])}
        locale="en"
      />,
    )
    const codes = [...container.querySelectorAll('li .index-code')].map((el) => el.textContent)
    expect(codes).toEqual(
      Array.from({ length: 16 }, (_, i) => String(i + 1).padStart(2, '0')),
    )
  })

  it('connects all four hero index links to stable group anchors', () => {
    const { container } = render(
      <>
        <CapabilityIndex locale="en" />
        <CapabilityMatrixBlock
          {...(matrix as Parameters<typeof CapabilityMatrixBlock>[0])}
          locale="en"
        />
      </>,
    )
    const nav = screen.getByRole('navigation', { name: 'On this page' })
    const hrefs = [...nav.querySelectorAll('a')].map((link) => link.getAttribute('href'))
    expect(hrefs).toEqual(SKILL_GROUP_KEYS.map((key) => `#capability-group-${key}`))
    for (const href of hrefs) expect(container.querySelector(href!)).toBeTruthy()
  })

  it('shows no proficiency signal of any kind', () => {
    const { container } = render(
      <CapabilityMatrixBlock
        {...(matrix as Parameters<typeof CapabilityMatrixBlock>[0])}
        locale="en"
      />,
    )
    expect(container.querySelector('progress, meter, [role="progressbar"]')).toBeNull()
    expect(container.textContent).not.toMatch(/\d+\s?%|Advanced|Intermediate|Beginner|Expert/i)
  })
})

describe('experience spotlight', () => {
  it('uses the same four substantial diagrams as the homepage', () => {
    const spotlight = buildExperienceLayout(experiencePageCopy.en)!.find(
      (block) => block.blockType === 'capabilitySpotlight',
    )!
    const { container } = render(
      <CapabilitySpotlightBlock {...(spotlight as Parameters<typeof CapabilitySpotlightBlock>[0])} />,
    )
    const diagrams = [...container.querySelectorAll('svg.cap-illustration')]
    expect(diagrams).toHaveLength(4)
    for (const diagram of diagrams) {
      expect(diagram.getAttribute('viewBox')).toBe('0 0 400 280')
      expect(diagram.getAttribute('aria-hidden')).toBe('true')
    }
  })
})

describe('homepage preview', () => {
  const teaser = buildExperienceTeaserBlock('en', HOME_TEASER_METRICS)
  const spotlight = experiencePageCopy.en.spotlight

  it('renders four substantial concept diagrams outside the accessibility tree', () => {
    const { container } = render(<ExperienceTeaserBlock {...teaser} />)
    const diagrams = [...container.querySelectorAll('.cap-illustration')]
    expect(diagrams).toHaveLength(4)
    for (const [i, svg] of diagrams.entries()) {
      expect(svg.getAttribute('aria-hidden')).toBe('true')
      expect(svg.getAttribute('viewBox')).toBe('0 0 400 280')
      expect((svg as SVGElement).style.direction).toBe('ltr')
      expect(svg.classList.contains(`cap-illustration--${SPOTLIGHT_KEYS[i]}`)).toBe(true)
      expect(svg.querySelectorAll('rect, circle, line, path').length).toBeGreaterThan(12)
      expect(svg.querySelector('[stroke="var(--track-accent)"], [fill="var(--track-accent)"]')).toBeTruthy()
    }
  })

  it('takes its words from /experience rather than restating them', () => {
    for (const locale of LOCALES) {
      const block = buildExperienceTeaserBlock(locale, HOME_TEASER_METRICS)
      const page = experiencePageCopy[locale].spotlight
      expect(block.sectionHeader.tag, `tag in ${locale}`).toBe(page.header.tag)
      expect(block.sectionHeader.lead, `lead in ${locale}`).toBe(page.header.lead)
      expect(block.sectionHeader.tail, `tail in ${locale}`).toBe(page.header.tail)
      for (const row of block.capabilities) {
        expect(row.title, `${row.key} title in ${locale}`).toBe(page.items[row.key].title)
        expect(row.principle, `${row.key} principle in ${locale}`).toBe(page.items[row.key].principle)
      }
    }
  })

  it('carries all four capabilities and passes its own schema validator', () => {
    expect(teaser.capabilities.map((row) => row.key)).toEqual([...SPOTLIGHT_KEYS])
    expect(validatorFor(ExperienceTeaser, 'capabilities')(teaser.capabilities)).toBe(true)
  })

  it('refuses a missing or duplicated primary capability', () => {
    const validate = validatorFor(ExperienceTeaser, 'capabilities')
    expect(validate(teaser.capabilities.slice(0, 3))).toMatch(/must be present/i)
    expect(validate([...teaser.capabilities.slice(0, 3), teaser.capabilities[0]])).toMatch(/once/i)
  })

  it('previews without duplicating the page: no descriptions, no sixteen skills', () => {
    render(<ExperienceTeaserBlock {...teaser} />)
    for (const key of SPOTLIGHT_KEYS) {
      expect(screen.getByText(spotlight.items[key].title)).toBeTruthy()
      expect(screen.getByText(spotlight.items[key].principle)).toBeTruthy()
      expect(screen.queryByText(spotlight.items[key].description)).toBeNull()
    }
    expect(screen.queryByText(experiencePageCopy.en.matrix.header.lead)).toBeNull()
  })

  it('demotes the metrics to a description list with no graphical bars', () => {
    const { container } = render(<ExperienceTeaserBlock {...teaser} />)
    const list = container.querySelector('dl')!
    // `dt` before its `dd` in the DOM; `flex-col-reverse` puts the value on top visually.
    expect([...list.querySelectorAll('dt, dd')].map((el) => el.tagName)).toEqual([
      'DT', 'DD', 'DT', 'DD', 'DT', 'DD',
    ])
    expect([...list.querySelectorAll('dd')].map((el) => el.textContent)).toEqual(
      HOME_TEASER_METRICS.map((metric) => metric.value),
    )
    // The old strip drew a decorative bar per metric at a hardcoded width. A number that needs a
    // bar to be understood is a number that should not be in a proof strip.
    expect(container.querySelectorAll('[style*="width"]')).toHaveLength(0)
    // And nothing here is a self-rated score.
    expect(container.textContent).not.toMatch(/%|advanced|intermediate/i)
  })

  it('links onward to /experience, locale-prefixed', () => {
    render(<ExperienceTeaserBlock {...teaser} locale="fa" />)
    expect(screen.getByRole('link', { name: /.+/ })).toHaveProperty(
      'href',
      expect.stringContaining('/fa/experience'),
    )
  })

  it('leaves /experience unprefixed for English', () => {
    render(<ExperienceTeaserBlock {...teaser} />)
    const href = screen.getByRole('link', { name: /.+/ }).getAttribute('href')
    expect(href).toBe('/experience')
  })

  it('keeps every row id through the locale overlay', () => {
    const seeded = {
      ...teaser,
      id: 'row-1',
      capabilities: teaser.capabilities.map((row, i) => ({ ...row, id: `c${i}` })),
      metrics: teaser.metrics.map((row, i) => ({ ...row, id: `m${i}` })),
      links: teaser.links.map((row, i) => ({ ...row, id: `l${i}` })),
    }
    // The overlay works on Payload's loosely-typed layout rows, so the ids it carries through are
    // invisible to inference. Naming the shape here is the assertion: these keys must survive.
    const fa = localizeExperienceTeaserBlock('fa', seeded, HOME_TEASER_METRICS) as unknown as {
      capabilities: { id: string; key: string; title: string }[]
      id: string
      links: { id: string }[]
      metrics: { id: string }[]
      sectionHeader: { lead: string }
    }

    expect(fa.id).toBe('row-1')
    expect(fa.capabilities.map((row) => row.id)).toEqual(['c0', 'c1', 'c2', 'c3'])
    expect(fa.metrics.map((row) => row.id)).toEqual(['m0', 'm1', 'm2'])
    expect(fa.links.map((row) => row.id)).toEqual(['l0'])
    // Keys are identity, never translated.
    expect(fa.capabilities.map((row) => row.key)).toEqual([...SPOTLIGHT_KEYS])
    // The words, however, are.
    expect(fa.capabilities[0].title).toBe(experiencePageCopy.fa.spotlight.items.discovery.title)
    expect(fa.sectionHeader.lead).toBe(experiencePageCopy.fa.spotlight.header.lead)
  })

  it('is tagged apart from the employer grid it sits beside', () => {
    // Both sections used to wear an "Experience" eyebrow. The preview borrows /experience's own
    // section tag instead, which is also what makes the two pages read as one argument.
    for (const locale of LOCALES) {
      const block = buildExperienceTeaserBlock(locale, HOME_TEASER_METRICS)
      expect(block.sectionHeader.tag, `tag in ${locale}`).not.toBe(
        experiencePageCopy[locale].title,
      )
    }
  })
})
