import React, { type CSSProperties, type ReactNode } from 'react'

/** Solid, opaque faces keep these small sculptures legible in either theme. */
export const ACCENT = 'var(--track-accent)'
export const EDGE = 'var(--cap-edge)'
export const INK = 'var(--cap-dark)'
export const PAPER = 'var(--cap-top)'

type Point = [number, number, number?]
type Tone = 'paper' | 'muted' | 'ink' | 'accent'

export const project = (x: number, y: number, z = 0): [number, number] => [
  200 + (x - y) * 0.866,
  150 + (x + y) * 0.5 - z,
]

export const points = (vertices: Point[]) =>
  vertices.map(([x, y, z]) => project(x, y, z).join(',')).join(' ')

export function motion(name: string, values: Record<string, string | number> = {}): CSSProperties {
  return { '--cap-animation': name, ...values } as CSSProperties
}

/** Children are drawn in local coordinates on the top face of the object. */
export const Solid = ({
  x,
  y,
  w,
  d,
  z = 0,
  h = 8,
  tone = 'paper',
  children,
}: {
  x: number
  y: number
  w: number
  d: number
  z?: number
  h?: number
  tone?: Tone
  children?: ReactNode
}) => {
  const palette = {
    paper: [PAPER, 'var(--cap-left)', 'var(--cap-right)'],
    muted: ['var(--cap-left)', 'var(--cap-right)', 'var(--cap-muted)'],
    ink: [INK, 'var(--cap-dark-left)', 'var(--cap-dark-right)'],
    accent: [ACCENT, 'var(--cap-accent-left)', 'var(--cap-accent-right)'],
  }[tone]
  const [sx, sy] = project(x, y, z + h)

  return (
    <g stroke={EDGE} strokeLinejoin="round" strokeWidth={0.85}>
      <polygon
        fill={palette[1]}
        points={points([
          [x, y + d, z + h],
          [x + w, y + d, z + h],
          [x + w, y + d, z],
          [x, y + d, z],
        ])}
      />
      <polygon
        fill={palette[2]}
        points={points([
          [x + w, y, z + h],
          [x + w, y + d, z + h],
          [x + w, y + d, z],
          [x + w, y, z],
        ])}
      />
      <polygon
        fill={palette[0]}
        points={points([
          [x, y, z + h],
          [x + w, y, z + h],
          [x + w, y + d, z + h],
          [x, y + d, z + h],
        ])}
      />
      {children ? (
        <g stroke="none" transform={`matrix(.866 .5 -.866 .5 ${sx} ${sy})`}>
          {children}
        </g>
      ) : null}
    </g>
  )
}

export const Wire = ({
  vertices,
  accent = false,
  className,
  style,
}: {
  vertices: Point[]
  accent?: boolean
  className?: string
  style?: CSSProperties
}) => (
  <polyline
    className={className}
    fill="none"
    pathLength={1}
    points={points(vertices)}
    stroke={accent ? ACCENT : EDGE}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={accent ? 2.5 : 1.1}
    style={style}
  />
)

/** Contact shadows are geometry, not animated blur filters. */
export const Ground = ({ wide = false }: { wide?: boolean }) => (
  <g>
    {/* Soft ambient lift — --cap-ground is transparent unless a theme opts in. */}
    <ellipse cx="202" cy="228" fill="var(--cap-ground)" rx={wide ? 168 : 132} ry="26" />
    <ellipse cx="202" cy="228" fill="var(--cap-shadow)" rx={wide ? 142 : 112} ry="17" />
    <ellipse cx="202" cy="228" fill="var(--cap-shadow)" rx={wide ? 108 : 82} ry="10" />
    <g fill="var(--ink-3)" opacity=".25">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <React.Fragment key={i}>
          <circle cx={52 + i * 8} cy={232 + (i % 2) * 5} r=".8" />
          <circle cx={309 + i * 8} cy={232 + (i % 2) * 5} r=".8" />
        </React.Fragment>
      ))}
    </g>
  </g>
)

export const DocumentLines = ({ width = 54 }: { width?: number }) => (
  <g fill="var(--cap-muted)">
    <rect x="12" y="16" width={width * 0.6} height="5" rx="1" fill={INK} />
    {[32, 42, 52].map((y, i) => (
      <rect height="2.5" key={y} rx="1" width={width - i * 7} x="12" y={y} />
    ))}
  </g>
)
