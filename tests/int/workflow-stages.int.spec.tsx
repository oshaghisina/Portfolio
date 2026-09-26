/**
 * Skills section (the `workflowStages` block, D-043): seven capability rows in canonical order and
 * one small "Selected tools" row whose marks link to each product's official site.
 */
import { cleanup, render, screen, within } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import { CAPABILITY_KEYS } from '@/blocks/WorkflowStages/capabilities'
import { WorkflowStagesBlock } from '@/blocks/WorkflowStages/Component'
import { TOOL_KEYS, TOOL_LOGOS } from '@/blocks/WorkflowStages/toolLogos'
import {
  buildHomeLayout,
  buildToolsStackBlock,
  HOME_MOSAIC,
  localizeHomeLayout,
  SELECTED_TOOLS,
} from '@/endpoints/seed/home-content'
import { homeCopy } from '@/endpoints/seed/home-copy'

afterEach(cleanup)

describe('TOOL_LOGOS destinations', () => {
  it('gives every tool a non-empty https URL', () => {
    expect(TOOL_KEYS.length).toBeGreaterThan(0)
    for (const key of TOOL_KEYS) {
      const { name, url } = TOOL_LOGOS[key]
      expect(url, `${key} (${name})`).toMatch(/^https:\/\//)
      expect(url.trim().length, `${key} (${name})`).toBeGreaterThan('https://'.length)
    }
  })
})

describe('WorkflowStagesBlock', () => {
  it('numbers capability rows by canonical key, not by row order', () => {
    render(
      <WorkflowStagesBlock
        capabilities={[
          { key: 'ai', title: 'AI', skills: ['Agents'] },
          { key: 'product', title: 'Product', skills: ['Strategy', 'Discovery'] },
        ]}
        sectionHeader={{ tag: 'Skills', lead: 'What I do' }}
      />,
    )

    const rows = within(screen.getAllByRole('list')[0]!).getAllByRole('heading', { level: 3 })
    expect(rows.map((heading) => heading.textContent)).toEqual(['Product', 'AI'])
    expect(rows[0]!.closest('[data-capability]')?.querySelector('.index-code')?.textContent).toBe(
      '01',
    )
    expect(rows[1]!.closest('[data-capability]')?.querySelector('.index-code')?.textContent).toBe(
      '07',
    )
  })

  it('lists skills as items and hides the separators from assistive tech', () => {
    render(
      <WorkflowStagesBlock
        capabilities={[
          {
            key: 'delivery',
            title: 'Delivery',
            skills: ['QA', 'Launch'],
            note: 'I also build and ship products myself.',
          },
        ]}
      />,
    )

    expect(screen.getByText('QA').tagName).toBe('LI')
    expect(screen.getByText('Launch').tagName).toBe('LI')
    const separator = screen.getByText('QA').querySelector('[aria-hidden]')
    expect(separator?.textContent).toBe(' ·')
    // The last item carries no trailing separator.
    expect(screen.getByText('Launch').querySelector('[aria-hidden]')).toBeNull()
    expect(screen.getByText('I also build and ship products myself.')).toBeTruthy()
  })

  it('uses the katakana middle dot in Japanese', () => {
    render(
      <WorkflowStagesBlock
        capabilities={[{ key: 'growth', title: 'グロース', skills: ['獲得', 'リテンション'] }]}
        locale="ja"
      />,
    )

    expect(screen.getByText('獲得').querySelector('[aria-hidden]')?.textContent).toBe('・')
  })

  it('drops a capability row with no skills', () => {
    render(
      <WorkflowStagesBlock
        capabilities={[
          { key: 'product', title: 'Product', skills: ['Strategy'] },
          { key: 'data', title: 'Data', skills: ['  '] },
        ]}
      />,
    )

    expect(screen.queryByRole('heading', { name: 'Data' })).toBeNull()
  })

  it('renders each selected tool as one external link under its label', () => {
    render(
      <WorkflowStagesBlock
        capabilities={[{ key: 'design', title: 'Design', skills: ['UX'] }]}
        tools={[{ toolKey: 'figma' }, { toolKey: 'claude' }]}
        toolsLabel="Selected tools"
      />,
    )

    expect(screen.getByRole('heading', { name: 'Selected tools' })).toBeTruthy()

    const figma = screen.getByRole('link', { name: 'Figma' })
    expect(figma.getAttribute('href')).toBe(TOOL_LOGOS.figma.url)
    expect(figma.getAttribute('target')).toBe('_blank')
    expect(figma.getAttribute('rel')).toContain('noopener')
    expect(figma.getAttribute('rel')).toContain('noreferrer')

    expect(screen.getByRole('link', { name: 'Claude' }).getAttribute('href')).toBe(
      TOOL_LOGOS.claude.url,
    )
  })
})

describe('Skills seed', () => {
  it('builds all seven capabilities and the selected tools from the English copy', () => {
    const block = buildToolsStackBlock(homeCopy.en)
    if (block.blockType !== 'workflowStages') throw new Error('wrong block type')

    expect(block.capabilities?.map((row) => row.key)).toEqual([...CAPABILITY_KEYS])
    expect(block.tools?.map((tool) => tool.toolKey)).toEqual(SELECTED_TOOLS)
    expect(block.toolsLabel).toBe('Selected tools')
    // Only Delivery carries the build note.
    expect(block.capabilities?.filter((row) => row.note).map((row) => row.key)).toEqual([
      'delivery',
    ])
  })

  it('keeps row ids and keys while translating leaves', () => {
    const projects = Object.fromEntries(HOME_MOSAIC.map(({ slug }) => [slug, `p-${slug}`]))
    const en = buildHomeLayout({ locale: 'en', projects })!
    const withIds = en.map((block, i) =>
      block.blockType === 'workflowStages'
        ? {
            ...block,
            id: `b-${i}`,
            capabilities: (block.capabilities ?? []).map((row, j) => ({ ...row, id: `c-${j}` })),
            tools: (block.tools ?? []).map((tool, j) => ({ ...tool, id: `t-${j}` })),
          }
        : { ...block, id: `b-${i}` },
    ) as typeof en

    const enSkills = withIds.find((b) => b.blockType === 'workflowStages')!
    const faSkills = localizeHomeLayout('fa', withIds)!.find(
      (b) => b.blockType === 'workflowStages',
    )!

    expect(faSkills.id).toBe(enSkills.id)
    expect(faSkills.capabilities?.map((row) => [row.id, row.key])).toEqual(
      enSkills.capabilities?.map((row) => [row.id, row.key]),
    )
    expect(faSkills.tools).toEqual(enSkills.tools)
    expect(faSkills.toolsLabel).toBe(homeCopy.fa.tools.toolsLabel)

    const faProduct = faSkills.capabilities?.find((row) => row.key === 'product')
    expect(faProduct?.skills).toEqual(homeCopy.fa.tools.capabilities.product.skills)
    expect(faProduct?.contribution).toBe(homeCopy.fa.tools.capabilities.product.contribution)
    // A row without a note is written as null, so a stale note cannot survive in a locale.
    expect(faProduct?.note).toBeNull()
    expect(faSkills.capabilities?.find((row) => row.key === 'delivery')?.note).toBe(
      homeCopy.fa.tools.capabilities.delivery.note,
    )
  })
})
