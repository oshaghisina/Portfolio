import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import type { Payload } from 'payload'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { CAPABILITY_KEYS } from '@/blocks/WorkflowStages/capabilities'
import { WorkflowStagesBlock } from '@/blocks/WorkflowStages/Component'
import { buildToolsStackBlock, SELECTED_TOOLS } from '@/endpoints/seed/home-content'
import { homeCopy } from '@/endpoints/seed/home-copy'
import { seedHomeSkillNotes, withSkillNotes } from '@/endpoints/seed/home-skill-notes'
import type { Page } from '@/payload-types'
import { LOCALES } from '@/utilities/locale'

afterEach(cleanup)

describe('practical Skills notes', () => {
  for (const locale of LOCALES) {
    it(`renders seven distinct contributions and all selected tools in ${locale}`, () => {
      const block = buildToolsStackBlock(homeCopy[locale])
      if (block.blockType !== 'workflowStages') throw new Error('wrong block')
      const { container } = render(<WorkflowStagesBlock {...block} locale={locale} />)
      expect(
        [...container.querySelectorAll('[data-capability]')].map((el) =>
          el.getAttribute('data-capability'),
        ),
      ).toEqual([...CAPABILITY_KEYS])
      const contributions = CAPABILITY_KEYS.map(
        (key) => homeCopy[locale].tools.capabilities[key].contribution,
      )
      expect(new Set(contributions).size).toBe(7)
      for (const contribution of contributions)
        expect(screen.getByRole('heading', { name: contribution })).toBeTruthy()
      expect(screen.getAllByRole('link')).toHaveLength(SELECTED_TOOLS.length)
      expect(container.querySelectorAll('[role="tablist"], button')).toHaveLength(0)
      expect(container.querySelector('.skills-personal-note')?.textContent).toBe(
        homeCopy[locale].tools.capabilities.delivery.note,
      )
    })
  }

  it('filters empty entries and refuses duplicate notes or tool links at render time', () => {
    const row = {
      key: 'product' as const,
      title: 'Product',
      skills: ['Strategy'],
      contribution: 'Choose a direction.',
    }
    const { container } = render(
      <WorkflowStagesBlock
        capabilities={[row, row, { key: 'data', title: 'Data', skills: [' '] }]}
        tools={[{ toolKey: 'figma' }, { toolKey: 'figma' }]}
      />,
    )
    expect(container.querySelectorAll('[data-capability]')).toHaveLength(1)
    expect(screen.getAllByRole('link')).toHaveLength(1)
  })
})

describe('non-destructive Skills copy upgrade', () => {
  function originalLayout(): Page['layout'] {
    const built = buildToolsStackBlock(homeCopy.en)
    if (built.blockType !== 'workflowStages') throw new Error('wrong block')
    return [
      {
        blockType: 'cta',
        id: 'unrelated',
        blockName: 'Editor-owned content',
        links: [
          { id: 'link', link: { type: 'custom', label: 'Custom translation', url: '/contact' } },
        ],
      },
      {
        ...built,
        id: 'skills',
        sectionHeader: { lead: 'Old heading' },
        capabilities: built.capabilities?.map((row, index) => ({
          ...row,
          id: `skill-${index}`,
          contribution: null,
          note: index === 0 ? 'Keep the editor note' : row.note,
        })),
        tools: built.tools?.map((row, index) => ({ ...row, id: `tool-${index}` })),
      },
    ]
  }

  it('preserves block/row IDs, custom notes, tools and unrelated translations on repeat runs', () => {
    const before = originalLayout()
    const snapshot = structuredClone(before)
    const first = withSkillNotes(before, 'fa')
    const second = withSkillNotes(first, 'fa')
    expect(first).toEqual(second)
    expect(before).toEqual(snapshot)
    expect(first[0]).toBe(before[0])
    const old = before[1],
      updated = first[1]
    if (old.blockType !== 'workflowStages' || updated.blockType !== 'workflowStages')
      throw new Error('wrong block')
    expect(updated.id).toBe(old.id)
    expect(updated.tools).toBe(old.tools)
    expect(
      updated.capabilities?.map((row) => [row.id, row.key, row.title, row.skills, row.note]),
    ).toEqual(old.capabilities?.map((row) => [row.id, row.key, row.title, row.skills, row.note]))
    expect(updated.capabilities?.[0].contribution).toBe(
      homeCopy.fa.tools.capabilities.product.contribution,
    )
  })

  it('keeps each locale publication state and makes no writes on the second run', async () => {
    const pages = Object.fromEntries(
      LOCALES.map((locale) => [
        locale,
        {
          id: 'home',
          title: locale,
          _status: locale === 'ja' ? 'draft' : 'published',
          layout: originalLayout(),
        },
      ]),
    )
    const find = vi.fn(async ({ locale }: { locale: string }) => ({ docs: [pages[locale]] }))
    const update = vi.fn(
      async ({
        locale,
        data,
        draft,
      }: {
        locale: string
        data: Record<string, unknown>
        draft: boolean
      }) => {
        expect(draft).toBe(locale === 'ja')
        expect(data._status).toBe(pages[locale]._status)
        Object.assign(pages[locale], data)
      },
    )
    const payload = { find, update } as unknown as Payload
    expect((await seedHomeSkillNotes({ payload })).updated).toEqual([...LOCALES])
    expect(update).toHaveBeenCalledTimes(7)
    expect((await seedHomeSkillNotes({ payload })).unchanged).toEqual([...LOCALES])
    expect(update).toHaveBeenCalledTimes(7)
    expect(find).toHaveBeenCalledWith(expect.objectContaining({ depth: 0, fallbackLocale: false }))
  })
})
