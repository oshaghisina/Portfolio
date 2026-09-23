/**
 * Homepage “How I work” (jsdom): tab semantics, key-ordered stages, evidence gating, and the
 * locale overlay that translates leaves without rewriting structure.
 */
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import { WorkspaceBlock } from '@/blocks/Workspace/Component'
import { Workspace } from '@/blocks/Workspace/config'
import { orderStages, STAGE_KEYS, type StageKey } from '@/blocks/Workspace/stages'
import { homeCopy } from '@/endpoints/seed/home-copy'
import { buildHomeLayout, localizeHomeLayout } from '@/endpoints/seed/home-content'
import type { Project } from '@/payload-types'

afterEach(() => {
  cleanup()
})

const publishedProject = (overrides: Partial<Project> & Pick<Project, 'id' | 'slug' | 'title'>): Project =>
  ({
    caseStudyStatus: 'published',
    ...overrides,
  }) as Project

const draftProject = (overrides: Partial<Project> & Pick<Project, 'id' | 'slug' | 'title'>): Project =>
  ({
    caseStudyStatus: 'draft',
    ...overrides,
  }) as Project

const stageFixture = (overrides: {
  evidence?: Project | string | null
  key?: StageKey
  shuffle?: boolean
} = {}) => {
  const keys = overrides.shuffle
    ? (['measure', 'frame', 'ship', 'map', 'decide'] as StageKey[])
    : [...STAGE_KEYS]
  return keys.map((key, i) => {
    const copy = homeCopy.en.workbench.stages[STAGE_KEYS.indexOf(key)]!
    return {
      key: overrides.key && i === 0 ? overrides.key : key,
      id: `stage-${key}`,
      label: copy.label,
      statement: copy.statement,
      question: copy.question,
      description: copy.description,
      output: copy.output,
      evidence: key === 'frame' ? (overrides.evidence ?? null) : null,
    }
  })
}

describe('Workspace schema', () => {
  it('requires exactly the five stage keys', () => {
    const field = Workspace.fields.find((f) => 'name' in f && f.name === 'stages')
    expect(field && 'validate' in field && typeof field.validate === 'function').toBe(true)
    const validate = (field as { validate: (v: unknown) => true | string }).validate
    expect(validate([{ key: 'frame' }])).toMatch(/exactly these keys/)
    expect(
      validate(STAGE_KEYS.map((key) => ({ key }))),
    ).toBe(true)
  })
})

describe('orderStages', () => {
  it('orders by key regardless of CMS array order', () => {
    const shuffled = stageFixture({ shuffle: true })
    expect(shuffled.map((s) => s.key)).toEqual(['measure', 'frame', 'ship', 'map', 'decide'])
    expect(orderStages(shuffled).map((s) => s.key)).toEqual([...STAGE_KEYS])
  })
})

describe('WorkspaceBlock', () => {
  const baseProps = {
    loopLabel: homeCopy.en.workbench.loopLabel,
    principle: homeCopy.en.workbench.principle,
    sectionHeader: homeCopy.en.workbench.header,
  }

  it('renders a real tablist with five tabs and matching panels', () => {
    render(
      <WorkspaceBlock
        {...baseProps}
        locale="en"
        stages={stageFixture()}
      />,
    )
    const tablist = screen.getByRole('tablist')
    const tabs = within(tablist).getAllByRole('tab')
    expect(tabs).toHaveLength(5)
    expect(tabs[0]!.getAttribute('aria-selected')).toBe('true')
    expect(tabs[1]!.getAttribute('aria-selected')).toBe('false')
    expect(tabs[0]!.tabIndex).toBe(0)
    expect(tabs[1]!.tabIndex).toBe(-1)

    const panels = screen.getAllByRole('tabpanel', { hidden: true })
    expect(panels).toHaveLength(5)
    expect(panels[0]!.getAttribute('aria-hidden')).not.toBe('true')
  })

  it('moves selection with arrow keys (LTR)', () => {
    render(
      <WorkspaceBlock
        {...baseProps}
        locale="en"
        stages={stageFixture()}
      />,
    )
    const tablist = screen.getByRole('tablist')
    fireEvent.keyDown(tablist, { key: 'ArrowRight' })
    const tabs = within(tablist).getAllByRole('tab')
    expect(tabs[1]!.getAttribute('aria-selected')).toBe('true')
    fireEvent.keyDown(tablist, { key: 'Home' })
    expect(tabs[0]!.getAttribute('aria-selected')).toBe('true')
    fireEvent.keyDown(tablist, { key: 'End' })
    expect(tabs[4]!.getAttribute('aria-selected')).toBe('true')
  })

  it('hides Seen in when the project has no published case study', () => {
    render(
      <WorkspaceBlock
        {...baseProps}
        locale="en"
        stages={stageFixture({
          evidence: draftProject({ id: 'p1', slug: 'digital-gold', title: 'Digital Gold' }),
        })}
      />,
    )
    expect(screen.queryByText(homeCopy.en.workbench.stages[0]!.output)).toBeTruthy()
    expect(screen.queryByText(/Seen in/i)).toBeNull()
    expect(screen.queryByRole('link', { name: 'Digital Gold' })).toBeNull()
  })

  it('shows Seen in only for a published case study', () => {
    render(
      <WorkspaceBlock
        {...baseProps}
        locale="en"
        stages={stageFixture({
          evidence: publishedProject({ id: 'p1', slug: 'digital-gold', title: 'Digital Gold' }),
        })}
      />,
    )
    const link = screen.getByRole('link', { name: 'Digital Gold' })
    expect(link.getAttribute('href')).toContain('/work/digital-gold')
  })

  it('marks the bench with motion-reduce-safe classes', () => {
    const { container } = render(
      <WorkspaceBlock
        {...baseProps}
        locale="en"
        stages={stageFixture()}
      />,
    )
    const benches = container.querySelectorAll('.workbench-bench')
    expect(benches.length).toBeGreaterThan(0)
    benches.forEach((el) => {
      expect(el.className).toMatch(/motion-reduce/)
    })
  })

  it('cycles Next through stages and Back to Frame on the last', () => {
    render(
      <WorkspaceBlock
        {...baseProps}
        locale="en"
        stages={stageFixture()}
      />,
    )
    const next = screen.getByRole('button', { name: /Next:.*Map/i })
    fireEvent.click(next)
    expect(
      within(screen.getByRole('tablist')).getAllByRole('tab')[1]!.getAttribute('aria-selected'),
    ).toBe('true')

    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'End' })
    const back = screen.getByRole('button', { name: /Back to Frame/i })
    fireEvent.click(back)
    expect(
      within(screen.getByRole('tablist')).getAllByRole('tab')[0]!.getAttribute('aria-selected'),
    ).toBe('true')
  })
})

describe('locale overlay', () => {
  const projects = {
    'digital-gold': 'p-dg',
    'vin-app': 'p-vin',
    'rp1-arena': 'p-rp1',
    'arvan-cloud-platform-redesign': 'p-arvan',
    'khodro45-dealer-app': 'p-k45',
    'oteacher-matchmaking-redesign': 'p-ot',
    'fibona-website': 'p-fib',
  }

  it('preserves stage row ids and keys while translating leaves', () => {
    const en = buildHomeLayout({ locale: 'en', projects })!
    const withIds = en.map((block, i) => {
      if (block.blockType !== 'workspace') return { ...block, id: `b-${i}` }
      return {
        ...block,
        id: `b-${i}`,
        stages: (block.stages ?? []).map((s, j) => ({ ...s, id: `s-${j}` })),
      }
    }) as typeof en

    const fa = localizeHomeLayout('fa', withIds)!
    const enWs = withIds.find((b) => b.blockType === 'workspace')!
    const faWs = fa.find((b) => b.blockType === 'workspace')!

    expect(faWs.id).toBe(enWs.id)
    expect(faWs.stages?.map((s) => s.id)).toEqual(enWs.stages?.map((s) => s.id))
    expect(faWs.stages?.map((s) => s.key)).toEqual(enWs.stages?.map((s) => s.key))
    expect(faWs.principle).toBe(homeCopy.fa.workbench.principle)
    expect(faWs.stages?.[0]?.label).toBe(homeCopy.fa.workbench.stages[0]!.label)
    expect(faWs.stages?.[0]?.label).not.toBe(homeCopy.en.workbench.stages[0]!.label)
  })

  it('keeps evidence relationships when overlaying by key', () => {
    const en = buildHomeLayout({ locale: 'en', projects })!
    const fa = localizeHomeLayout('fa', en)!
    const faWs = fa.find((b) => b.blockType === 'workspace')!
    const frame = faWs.stages?.find((s) => s.key === 'frame')
    const ship = faWs.stages?.find((s) => s.key === 'ship')
    expect(frame?.evidence).toBe('p-dg')
    expect(ship?.evidence).toBeUndefined()
  })
})
