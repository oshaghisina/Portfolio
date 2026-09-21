import { cn } from '@/utilities/ui'
import React from 'react'

export interface ProcessDiagramNode {
  /** 0–100, percentage position within the diagram's viewBox. */
  x: number
  y: number
  label: string
  annotation?: string
  active?: boolean
}

export interface ProcessDiagramProps {
  nodes: ProcessDiagramNode[]
  /** Index pairs into `nodes`. */
  connections: [number, number][]
  className?: string
}

/**
 * Shared hairline node+connector diagram — same `var(--line)` visual language as Workspace's
 * node/polyline canvas and Tracks/Illustrations.tsx's DimensionLine/Annotation primitives.
 * Layout (node positions, connections) is a fixed constant per caller, not CMS-driven; only
 * label/annotation text comes from Payload.
 *
 * These are conceptual flow diagrams (Business → Product → …), not literal drafting art like
 * Workspace's canvas (which is explicitly documented as *not* mirrored under RTL) — their
 * reading order is semantic, so the whole diagram mirrors under `dir="rtl"` and each label
 * counter-mirrors once more so its glyphs stay upright.
 */
export const ProcessDiagram: React.FC<ProcessDiagramProps> = ({ className, connections, nodes }) => {
  if (!nodes.length) return null

  return (
    <div className={cn('relative aspect-[4/3] w-full rtl:-scale-x-100 sm:aspect-[2/1]', className)}>
      <svg aria-hidden className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
        {connections.map(([from, to], i) => {
          const a = nodes[from]
          const b = nodes[to]
          if (!a || !b) return null
          return (
            <line
              key={i}
              stroke="var(--line)"
              strokeWidth={0.6}
              vectorEffect="non-scaling-stroke"
              x1={a.x}
              x2={b.x}
              y1={a.y}
              y2={b.y}
            />
          )
        })}
      </svg>
      {nodes.map((node, i) => (
        <div
          className="absolute flex w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center sm:w-36"
          key={i}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <span
            aria-hidden
            className={cn('size-2 shrink-0 rounded-full', node.active ? 'bg-brand' : 'border border-line bg-background')}
          />
          <span className="eyebrow rtl:-scale-x-100">{node.label}</span>
          {node.annotation ? <span className="text-caption text-ink-2 rtl:-scale-x-100">{node.annotation}</span> : null}
        </div>
      ))}
    </div>
  )
}
