/**
 * Process map (jsdom): nodes show the step's position unless the block opts into codes, long
 * sequences wrap into balanced rows (never a loop), and a loop names the step it returns to.
 */
import { cleanup, render, screen, within } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import { ProcessBlock, processColumns } from '@/blocks/CaseStudy/Process/Component'
import { caseStudyCopy } from '@/components/CaseStudy/copy'
import type { CaseStudyProcessBlock } from '@/payload-types'

afterEach(cleanup)

const steps = (count: number): NonNullable<CaseStudyProcessBlock['steps']> =>
  Array.from({ length: count }, (_, i) => ({
    id: `s${i + 1}`,
    code: `C${i + 1}`,
    label: `Step ${i + 1}`,
  }))

const renderProcess = (block: Partial<CaseStudyProcessBlock>) =>
  render(
    <ProcessBlock
      blockType="csProcess"
      copy={caseStudyCopy.en}
      locale="en"
      steps={steps(4)}
      {...block}
    />,
  )

const markers = () =>
  within(screen.getByRole('list'))
    .getAllByRole('listitem')
    .map((item) => item.querySelector('.index-code')?.textContent)

describe('process map', () => {
  it('numbers the nodes by default, even when codes are stored', () => {
    renderProcess({})
    expect(markers()).toEqual(['01', '02', '03', '04'])
  })

  it('shows the codes only when the block opts into them', () => {
    renderProcess({ markers: 'code' })
    expect(markers()).toEqual(['C1', 'C2', 'C3', 'C4'])
  })

  it('wraps long sequences into balanced rows, but never a loop', () => {
    expect([4, 5, 6, 7, 8].map((n) => processColumns(n, 'process'))).toEqual([4, 5, 3, 4, 4])
    expect(processColumns(8, 'loop')).toBe(8)
    const tablet = { oneRowMax: 3, rowMax: 3 }
    expect([3, 4, 5, 6].map((n) => processColumns(n, 'process', tablet))).toEqual([3, 2, 3, 3])
  })

  it('names the step a loop returns to, by its marker and label', () => {
    renderProcess({ kind: 'loop', markers: 'code' })
    // once on the desktop return arc, once on the phone's terminal row (CSS shows one of them)
    const returns = screen.getAllByText((_, el) => el?.textContent === 'returns to C1 · Step 1')
    expect(returns.length).toBeGreaterThanOrEqual(2)
  })

  it('draws no return path for a sequence', () => {
    renderProcess({ kind: 'process' })
    expect(screen.queryByText(/returns to/)).toBeNull()
  })
})
