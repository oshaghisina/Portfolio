/**
 * Tools / Stack catalog: every tool carries a canonical https destination so the section
 * renderer can wrap each cell without a separate URL map.
 */
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import { WorkflowStagesBlock } from '@/blocks/WorkflowStages/Component'
import { TOOL_KEYS, TOOL_LOGOS } from '@/blocks/WorkflowStages/toolLogos'

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

describe('WorkflowStagesBlock links', () => {
  it('wraps each rendered tool in one full-cell external link', () => {
    render(
      <WorkflowStagesBlock
        categories={[
          {
            key: 'designPrototyping',
            title: 'Design & Creative Production',
            tools: [{ toolKey: 'figma' }, { toolKey: 'sketch' }],
          },
        ]}
        sectionHeader={{ tag: 'Tools / Stack', lead: 'Tools', lede: 'The working stack.' }}
      />,
    )

    const figma = screen.getByRole('link', { name: 'Figma' })
    expect(figma.getAttribute('href')).toBe(TOOL_LOGOS.figma.url)
    expect(figma.getAttribute('target')).toBe('_blank')
    expect(figma.getAttribute('rel')).toContain('noopener')
    expect(figma.getAttribute('rel')).toContain('noreferrer')

    const sketch = screen.getByRole('link', { name: 'Sketch' })
    expect(sketch.getAttribute('href')).toBe(TOOL_LOGOS.sketch.url)
  })
})
