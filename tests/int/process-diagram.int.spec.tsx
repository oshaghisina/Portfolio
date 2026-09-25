import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FORK_FLOW_SHAPE, PROCESS_ART, ProcessDiagram, toRows } from '@/components/ProcessDiagram'

const nodes = ['Business', 'Product', 'User', 'System', 'Execution', 'Learning'].map(
  (label, i) => ({ label, annotation: `Description ${i + 1}`, index: `0${i + 1}` }),
)

describe('About process illustrations', () => {
  it('illustrates all six stages without tying artwork to translated text', () => {
    const { container } = render(
      <ProcessDiagram rows={toRows(nodes, FORK_FLOW_SHAPE)} variant="thinking" />,
    )
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(6)
    expect(container.querySelectorAll('.process-card-art svg')).toHaveLength(6)
    expect(
      [...container.querySelectorAll('.process-card-art svg')].map((svg) =>
        svg.getAttribute('data-artwork'),
      ),
    ).toEqual(PROCESS_ART.thinking)
    expect(container.querySelectorAll('.process-band--fork .process-card')).toHaveLength(2)
  })

  it('keeps the team return rail and a separate six-image visual narrative', () => {
    const { container } = render(
      <ProcessDiagram loopBack rows={toRows(nodes, FORK_FLOW_SHAPE)} variant="team" />,
    )
    expect(container.querySelector('.process-return-rail')).not.toBeNull()
    expect(
      [...container.querySelectorAll('.process-card-art svg')].map((svg) =>
        svg.getAttribute('data-artwork'),
      ),
    ).toEqual(PROCESS_ART.team)
    expect(new Set(PROCESS_ART.team).size).toBe(6)
  })
})
