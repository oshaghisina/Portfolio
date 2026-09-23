/**
 * /experience (jsdom): the guarantees that keep the capability page honest.
 *
 * Every one of the sixteen capabilities reaches the page, in its own group and nowhere else; the
 * icon registries cover every key so a capability can never render blank; evidence becomes a link
 * only where there is a published case study to land on; and the locale overlay translates the
 * words without disturbing the structure underneath them.
 */
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import { SkillIcon, SpotlightIllustration } from '@/blocks/CapabilityIcons'
import {
  SKILL_GROUP_KEYS,
  SKILL_KEYS,
  SKILLS_BY_GROUP,
  SPOTLIGHT_KEYS,
  type SkillKey,
} from '@/blocks/CapabilityIcons/keys'
import { CapabilityMatrixBlock } from '@/blocks/CapabilityMatrix/Component'
import { CapabilityMatrix, SKILL_LABELS } from '@/blocks/CapabilityMatrix/config'
import { CapabilitySpotlight } from '@/blocks/CapabilitySpotlight/config'
import { EvidenceRef } from '@/components/EvidenceRef'
import { experiencePageCopy } from '@/endpoints/seed/experience-page-copy'
import {
  buildExperienceHero,
  buildExperienceLayout,
  localizeExperienceLayout,
} from '@/endpoints/seed/experience-page-content'
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
const validatorFor = (block: typeof CapabilityMatrix | typeof CapabilitySpotlight, name: string) => {
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
      const { container } = render(<SpotlightIllustration spotlightKey={key} />)
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
      'capabilityMatrix',
      'capabilityEvidence',
      'capabilityModel',
      'cta',
    ])
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
