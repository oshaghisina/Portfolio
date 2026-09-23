import React from 'react'

import { cn } from '@/utilities/ui'

import {
  ARTIFACT_OPACITY,
  BENCH,
  BRIEF_POSES,
  DATA_GHOST,
  EDGE_OPACITY,
  FRAGMENT_LABELS,
  FRAGMENT_POSES,
  LANE_LABELS,
  LANE_OPACITY,
  LANE_Y,
  PATH_OPACITY,
  PROBLEM_POSES,
  RETURN_EDGE_OPACITY,
  SIGNAL_OPACITY,
  SPEC_OPACITY,
  type StageKey,
} from './stages'

const line = 'var(--ink-3)'
const guide = 'var(--line)'
const accent = 'var(--brand)'
const strokeWidth = 1.25

const EASE = 'var(--ease-standard, cubic-bezier(0.2, 0, 0, 1))'
const DUR = '650ms'

type BenchProps = {
  className?: string
  /** Mobile: fewer fragments, no lane labels, 3 spec rows. */
  compact?: boolean
  stage: StageKey
}

/**
 * One persistent SVG whose objects transform per stage. Driven by `data-stage` + CSS transitions
 * so absolute states (01→05) animate straight to the target pose. Drafting art — not mirrored
 * under RTL. Decorative: the stage panel carries the meaning (`aria-hidden` on the root).
 */
export const WorkspaceBench: React.FC<BenchProps> = ({ className, compact = false, stage }) => {
  const fragments = compact
    ? FRAGMENT_LABELS.slice(0, BENCH.compactFragments)
    : [...FRAGMENT_LABELS]
  const specCount = compact ? BENCH.compactSpecRows : BENCH.specRows
  const poses = FRAGMENT_POSES[stage]
  const problem = PROBLEM_POSES[stage]
  const brief = BRIEF_POSES[stage]

  // Map edges: problem hub → each in-scope fragment centre (simplified star).
  const mapEdges = fragments.map((id) => {
    const p = poses[id]
    return { id, x2: p.x, y2: p.y }
  })

  const pathIds = BENCH.decidePath.filter((id) => fragments.includes(id))

  return (
    <div
      aria-hidden
      className={cn(
        'workbench-bench relative w-full overflow-hidden border border-line bg-panel/20',
        'motion-reduce:[&_*]:!transition-none',
        className,
      )}
      data-stage={stage}
      style={{
        aspectRatio: compact ? '4 / 3' : '16 / 9',
        backgroundImage: 'radial-gradient(var(--line) 1px, transparent 1px)',
        backgroundSize: '1.5rem 1.5rem',
      }}
    >
      <svg
        className="h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        viewBox={`0 0 ${BENCH.width} ${BENCH.height}`}
      >
        {/* Domain lanes */}
        <g
          style={{
            opacity: LANE_OPACITY[stage],
            transition: `opacity ${DUR} ${EASE}`,
          }}
        >
          {LANE_Y.map((y, i) => (
            <g key={LANE_LABELS[i]}>
              <line
                stroke={guide}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
                x1={48}
                x2={compact ? 760 : 500}
                y1={y}
                y2={y}
              />
              {!compact ? (
                <text
                  className="fill-ink-3"
                  fontFamily="var(--font-mono), ui-monospace, monospace"
                  fontSize={10}
                  x={52}
                  y={y - 6}
                >
                  {LANE_LABELS[i]}
                </text>
              ) : null}
            </g>
          ))}
        </g>

        {/* Graph edges (Map+) */}
        <g
          style={{
            opacity: EDGE_OPACITY[stage],
            transition: `opacity ${DUR} ${EASE}`,
          }}
        >
          {mapEdges.map(({ id, x2, y2 }) => (
            <line
              key={`edge-${id}`}
              stroke={guide}
              strokeWidth={strokeWidth}
              style={{
                transition: `x2 ${DUR} ${EASE}, y2 ${DUR} ${EASE}`,
              }}
              vectorEffect="non-scaling-stroke"
              x1={problem.x}
              x2={x2}
              y1={problem.y}
              y2={y2}
            />
          ))}
        </g>

        {/* Brand path (Decide+) */}
        <g
          style={{
            opacity: PATH_OPACITY[stage],
            transition: `opacity ${DUR} ${EASE}`,
          }}
        >
          {pathIds.map((id) => {
            const p = poses[id]
            return (
              <line
                key={`path-${id}`}
                stroke={accent}
                strokeWidth={strokeWidth}
                vectorEffect="non-scaling-stroke"
                x1={problem.x}
                x2={p.x}
                y1={problem.y}
                y2={p.y}
              />
            )
          })}
        </g>

        {/* Brief dashed box (Frame) */}
        <rect
          height={140}
          rx={0}
          stroke={line}
          strokeDasharray="6 4"
          strokeWidth={strokeWidth}
          style={{
            opacity: brief.opacity,
            transition: `opacity ${DUR} ${EASE}`,
          }}
          vectorEffect="non-scaling-stroke"
          width={220}
          x={brief.x - 40}
          y={brief.y - 40}
        />

        {/* Problem node */}
        <g
          style={{
            opacity: problem.opacity,
            transform: `translate(${problem.x}px, ${problem.y}px)`,
            transition: `transform ${DUR} ${EASE}, opacity ${DUR} ${EASE}`,
          }}
        >
          <rect
            fill="var(--background)"
            height={36}
            stroke={problem.variant === 'hub' || problem.variant === 'target' ? accent : line}
            strokeWidth={strokeWidth}
            vectorEffect="non-scaling-stroke"
            width={88}
            x={-44}
            y={-18}
          />
          <text
            className="fill-foreground"
            fontFamily="var(--font-sans), system-ui, sans-serif"
            fontSize={11}
            fontWeight={500}
            textAnchor="middle"
            y={4}
          >
            problem
          </text>
        </g>

        {/* Fragments */}
        {fragments.map((id) => {
          const p = poses[id]
          const cut = p.variant === 'cut'
          const out = p.variant === 'out'
          return (
            <g
              key={id}
              style={{
                opacity: p.opacity,
                transform: `translate(${p.x}px, ${p.y}px) scale(${p.scale ?? 1})`,
                transition: `transform ${DUR} ${EASE}, opacity ${DUR} ${EASE}`,
              }}
            >
              <rect
                fill="var(--background)"
                height={28}
                stroke={cut || out ? guide : line}
                strokeWidth={strokeWidth}
                vectorEffect="non-scaling-stroke"
                width={compact ? 28 : 64}
                x={compact ? -14 : -32}
                y={-14}
              />
              {cut ? (
                <line
                  stroke={line}
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                  x1={-28}
                  x2={28}
                  y1={0}
                  y2={0}
                />
              ) : null}
              {!compact ? (
                <text
                  className="fill-ink-3"
                  fontFamily="var(--font-mono), ui-monospace, monospace"
                  fontSize={10}
                  textAnchor="middle"
                  y={4}
                >
                  {id}
                </text>
              ) : null}
            </g>
          )
        })}

        {/* Spec rows (Decide) */}
        <g
          style={{
            opacity: SPEC_OPACITY[stage],
            transition: `opacity ${DUR} ${EASE}`,
          }}
        >
          {Array.from({ length: specCount }, (_, i) => {
            const y = 90 + i * 56
            return (
              <g key={`spec-${i}`}>
                <line
                  stroke={guide}
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                  x1={480}
                  x2={760}
                  y1={y + 28}
                  y2={y + 28}
                />
                <text
                  className="fill-ink-3"
                  fontFamily="var(--font-mono), ui-monospace, monospace"
                  fontSize={11}
                  x={488}
                  y={y + 8}
                >
                  {`R${i + 1}`}
                </text>
                <circle
                  cx={740}
                  cy={y + 4}
                  fill="none"
                  r={4}
                  stroke={accent}
                  strokeWidth={strokeWidth}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            )
          })}
        </g>

        {/* Artifact frame (Ship / Measure) */}
        <g
          style={{
            opacity: ARTIFACT_OPACITY[stage],
            transition: `opacity ${DUR} ${EASE}`,
          }}
        >
          <rect
            fill="var(--background)"
            height={240}
            stroke={line}
            strokeWidth={strokeWidth}
            vectorEffect="non-scaling-stroke"
            width={280}
            x={140}
            y={120}
          />
          <rect fill={accent} height={8} width={8} x={152} y={132} />
          <text
            className="fill-ink-3"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize={10}
            x={166}
            y={140}
          >
            live
          </text>
          {/* Metric ticks on blocks */}
          {[
            { x: 200, y: 180 },
            { x: 300, y: 180 },
            { x: 200, y: 260 },
            { x: 300, y: 260 },
          ]
            .slice(0, specCount)
            .map((tick, i) => (
              <circle
                key={`tick-${i}`}
                cx={tick.x + 40}
                cy={tick.y - 20}
                fill="none"
                r={3.5}
                stroke={accent}
                strokeWidth={strokeWidth}
                vectorEffect="non-scaling-stroke"
              />
            ))}
        </g>

        {/* Signal glyphs (Measure) */}
        <g
          style={{
            opacity: SIGNAL_OPACITY[stage],
            transition: `opacity ${DUR} ${EASE}`,
          }}
        >
          {[
            { x: 250, y: 150, bars: [8, 14, 10] },
            { x: 340, y: 150, bars: [6, 12, 16] },
            { x: 250, y: 230, bars: [10, 8, 14] },
          ].map((sig, i) => (
            <g key={`sig-${i}`} transform={`translate(${sig.x}, ${sig.y})`}>
              {sig.bars.map((h, j) => (
                <rect
                  fill={accent}
                  height={h}
                  key={j}
                  width={3}
                  x={j * 6}
                  y={-h}
                />
              ))}
            </g>
          ))}
        </g>

        {/* Ghost of moved data node (Measure) */}
        <g
          style={{
            opacity: stage === 'measure' ? 0.25 : 0,
            transition: `opacity ${DUR} ${EASE}`,
          }}
        >
          <rect
            fill="none"
            height={28}
            stroke={guide}
            strokeDasharray="3 3"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            width={compact ? 28 : 64}
            x={DATA_GHOST.x - (compact ? 14 : 32)}
            y={DATA_GHOST.y - 14}
          />
        </g>

        {/* Return edge Measure → model (problem / data) */}
        <g
          style={{
            opacity: RETURN_EDGE_OPACITY[stage],
            transition: `opacity ${DUR} ${EASE}`,
          }}
        >
          <path
            d={`M 360 140 C 420 80, 480 120, ${FRAGMENT_POSES.measure.data.x} ${FRAGMENT_POSES.measure.data.y}`}
            id="workbench-return-path"
            stroke={accent}
            strokeDasharray="5 4"
            strokeWidth={strokeWidth}
            vectorEffect="non-scaling-stroke"
          />
          {/* Static arrowhead */}
          <polygon
            fill={accent}
            points={`${FRAGMENT_POSES.measure.data.x},${FRAGMENT_POSES.measure.data.y} ${FRAGMENT_POSES.measure.data.x - 8},${FRAGMENT_POSES.measure.data.y - 10} ${FRAGMENT_POSES.measure.data.x - 2},${FRAGMENT_POSES.measure.data.y - 12}`}
          />
          {/* Ambient travelling dot — CSS animation, gated off under motion-reduce */}
          {stage === 'measure' ? (
            <circle
              className="workbench-return-dot motion-reduce:hidden"
              fill={accent}
              r={4}
            >
              <animateMotion
                begin="0s"
                dur="5s"
                keyPoints="0;1"
                keyTimes="0;1"
                path={`M 360 140 C 420 80, 480 120, ${FRAGMENT_POSES.measure.data.x} ${FRAGMENT_POSES.measure.data.y}`}
                repeatCount="indefinite"
              />
            </circle>
          ) : null}
        </g>
      </svg>
    </div>
  )
}
