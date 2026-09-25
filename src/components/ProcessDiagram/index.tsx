import { cn } from '@/utilities/ui'
import React from 'react'

import { SkillArtwork } from '@/components/ExperienceVisuals/Artwork'
import type { SkillKey } from '@/blocks/CapabilityIcons/keys'

import './process.css'

export interface ProcessDiagramNode {
  label: string
  annotation?: string
  active?: boolean
  /** Latin ornament, decorative and independent of the content locale. */
  index?: string
}

export interface ProcessDiagramProps {
  className?: string
  /** Learning returns to the next business context in the team process. */
  loopBack?: boolean
  /** The two diagrams share a topology, but tell different visual stories. */
  variant?: 'thinking' | 'team'
  rows: ProcessDiagramNode[][]
}

export const FORK_FLOW_SHAPE = [1, 1, 2, 1, 1] as const

export function toRows(
  nodes: ProcessDiagramNode[],
  shape: readonly number[],
): ProcessDiagramNode[][] {
  const out: ProcessDiagramNode[][] = []
  let at = 0
  for (const size of shape) {
    const band = nodes.slice(at, at + size)
    if (!band.length) break
    out.push(band)
    at += size
  }
  return out
}

/** Stable imagery follows the fixed six-stage CMS order, never translated labels. */
export const PROCESS_ART: Record<
  NonNullable<ProcessDiagramProps['variant']>,
  readonly SkillKey[]
> = {
  thinking: [
    'business-modeling',
    'product-management',
    'product-discovery',
    'technical-pm',
    'process-operations',
    'analytics-experimentation',
  ],
  team: [
    'stakeholder-management',
    'requirements',
    'ux-direction',
    'technical-pm',
    'analytics-experimentation',
    'documentation-spec',
  ],
}

export const ProcessDiagram: React.FC<ProcessDiagramProps> = ({
  className,
  loopBack = false,
  rows,
  variant = 'thinking',
}) => {
  const clean = rows.map((row) => row.slice(0, 2)).filter((row) => row.length > 0)
  if (!clean.length) return null

  let nodePosition = 0
  return (
    <div
      className={cn('process-diagram', className)}
      data-process-loop={loopBack}
      data-process-variant={variant}
    >
      {loopBack && clean.length > 1 ? (
        <span aria-hidden="true" className="process-return-rail" />
      ) : null}
      <ol className="process-flow">
        {clean.map((row, rowIndex) => (
          <li
            className={cn('process-band', row.length === 2 && 'process-band--fork')}
            key={rowIndex}
          >
            <div className="process-band-cards">
              {row.map((node) => {
                const position = nodePosition++
                return (
                  <article
                    className={cn('process-card', node.active && 'process-card--active')}
                    key={`${rowIndex}-${position}`}
                  >
                    <div className="process-card-art" aria-hidden="true">
                      <SkillArtwork
                        skillKey={PROCESS_ART[variant][position] ?? 'product-management'}
                      />
                    </div>
                    <div className="process-card-copy">
                      {node.index ? (
                        <span className="process-card-index index-code" dir="ltr">
                          {node.index}
                        </span>
                      ) : null}
                      <h3 className="process-card-title">{node.label}</h3>
                      {node.annotation ? (
                        <p className="process-card-description">{node.annotation}</p>
                      ) : null}
                    </div>
                  </article>
                )
              })}
            </div>
            {rowIndex < clean.length - 1 ? (
              <span
                aria-hidden="true"
                className={cn(
                  'process-connector',
                  row.length === 2 && 'process-connector--merge',
                  clean[rowIndex + 1]?.length === 2 && 'process-connector--split',
                )}
              >
                <span className="process-connector-dot" />
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  )
}
