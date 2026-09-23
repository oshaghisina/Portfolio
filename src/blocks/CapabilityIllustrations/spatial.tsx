import React from 'react'

/**
 * Capabilities-owned shallow dimetric kit. Parallel to Tracks' iso grammar but scoped here so
 * mechanism scenes stay distinct from Tracks territory illustrations. Slightly taller elevation
 * than Tracks so volumes read larger inside capability cells.
 */

export const CELL_X = 16
export const CELL_Y = 9
export const ORIGIN = { x: 200, y: 168 }

export const STROKE = 'var(--line)'
export const STROKE_SOFT = 'var(--line-soft)'
export const STROKE_INK = 'var(--ink-3)'
export const STROKE_WIDTH = 1.25
export const ACCENT = 'var(--track-accent)'

export function project(gx: number, gy: number, hpx = 0): [number, number] {
  return [ORIGIN.x + (gx - gy) * CELL_X, ORIGIN.y + (gx + gy) * CELL_Y - hpx]
}

export function pts(coords: Array<[number, number, number?]>): string {
  return coords.map(([gx, gy, h]) => project(gx, gy, h ?? 0).join(',')).join(' ')
}

export type CapBoxProps = {
  className?: string
  fill?: string
  fillOpacity?: number
  gx0: number
  gx1: number
  gy0: number
  gy1: number
  stroke?: string
  z0?: number
  z1: number
}

/** Extruded box: top + two visible faces, opacity-shaded from a single fill token. */
export const CapBox: React.FC<CapBoxProps> = ({
  className,
  fill = 'var(--panel)',
  fillOpacity = 1,
  gx0,
  gx1,
  gy0,
  gy1,
  stroke = STROKE,
  z0 = 0,
  z1,
}) => (
  <g className={className}>
    <polygon
      fill={fill}
      fillOpacity={fillOpacity}
      points={pts([
        [gx0, gy0, z1],
        [gx1, gy0, z1],
        [gx1, gy1, z1],
        [gx0, gy1, z1],
      ])}
      stroke={stroke}
      strokeLinejoin="round"
      strokeWidth={STROKE_WIDTH}
    />
    <polygon
      fill={fill}
      fillOpacity={fillOpacity * 0.78}
      points={pts([
        [gx0, gy1, z1],
        [gx1, gy1, z1],
        [gx1, gy1, z0],
        [gx0, gy1, z0],
      ])}
      stroke={stroke}
      strokeLinejoin="round"
      strokeWidth={STROKE_WIDTH}
    />
    <polygon
      fill={fill}
      fillOpacity={fillOpacity * 0.6}
      points={pts([
        [gx1, gy0, z1],
        [gx1, gy1, z1],
        [gx1, gy1, z0],
        [gx1, gy0, z0],
      ])}
      stroke={stroke}
      strokeLinejoin="round"
      strokeWidth={STROKE_WIDTH}
    />
  </g>
)

/** Thin outlined slab — translucent frame / plane without solid side mass. */
export const CapFrame: React.FC<{
  className?: string
  fillOpacity?: number
  gx0: number
  gx1: number
  gy0: number
  gy1: number
  stroke?: string
  z: number
}> = ({ className, fillOpacity = 0.22, gx0, gx1, gy0, gy1, stroke = STROKE_INK, z }) => (
  <polygon
    className={className}
    fill="var(--panel)"
    fillOpacity={fillOpacity}
    points={pts([
      [gx0, gy0, z],
      [gx1, gy0, z],
      [gx1, gy1, z],
      [gx0, gy1, z],
    ])}
    stroke={stroke}
    strokeLinejoin="round"
    strokeWidth={STROKE_WIDTH}
  />
)

/** Shared construction plate under every capability scene. */
export const CapPlate: React.FC<{ className?: string }> = ({ className }) => (
  <CapBox
    className={className}
    fill="var(--paper)"
    fillOpacity={1}
    gx0={-3.2}
    gx1={7.2}
    gy0={-3.2}
    gy1={7.2}
    z0={-5}
    z1={0}
  />
)

export const CapDotField: React.FC<{
  className?: string
  gx0?: number
  gx1?: number
  gy0?: number
  gy1?: number
  step?: number
  z?: number
}> = ({
  className = 'cap-anno',
  gx0 = -2.5,
  gx1 = 6.5,
  gy0 = -2.5,
  gy1 = 6.5,
  step = 1.5,
  z = 0.5,
}) => {
  const dots: Array<[number, number]> = []
  for (let gx = gx0; gx <= gx1 + 0.001; gx += step) {
    for (let gy = gy0; gy <= gy1 + 0.001; gy += step) {
      dots.push([gx, gy])
    }
  }
  return (
    <g className={className} fill={STROKE} fillOpacity={0.55}>
      {dots.map(([gx, gy], i) => {
        const [x, y] = project(gx, gy, z)
        return <circle cx={x} cy={y} key={i} r={0.85} />
      })}
    </g>
  )
}

/** Corner registration marks — drafting bounds, not a card chrome. */
export const CapRegistration: React.FC = () => (
  <g className="cap-anno" fill="none" stroke={STROKE} strokeWidth={STROKE_WIDTH}>
    <path d="M28 42V28h14M358 28h14v14M28 238v14h14M358 252h14v-14" />
    <path d="M200 16v8M200 262v8M16 140h8M376 140h8" />
  </g>
)

export const CapLink: React.FC<{
  className?: string
  from: [number, number, number?]
  pathLength?: number
  stroke?: string
  strokeWidth?: number
  to: [number, number, number?]
  via?: Array<[number, number, number?]>
}> = ({
  className,
  from,
  pathLength,
  stroke = STROKE_INK,
  strokeWidth = STROKE_WIDTH,
  to,
  via = [],
}) => {
  const points = [from, ...via, to].map(([gx, gy, h]) => project(gx, gy, h ?? 0))
  const d = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ')
  return (
    <path
      className={className}
      d={d}
      fill="none"
      pathLength={pathLength}
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  )
}

/** Small raised accent node on a top face. */
export const CapNode: React.FC<{
  className?: string
  fill?: string
  gx: number
  gy: number
  size?: number
  z: number
}> = ({ className, fill = ACCENT, gx, gy, size = 0.35, z }) => (
  <CapBox
    className={className}
    fill={fill}
    gx0={gx - size}
    gx1={gx + size}
    gy0={gy - size}
    gy1={gy + size}
    z0={z}
    z1={z + 8}
  />
)

/** Tiny LTR technical annotation — English drafting marks only, used sparingly. */
export const CapAnno: React.FC<{
  align?: 'end' | 'middle' | 'start'
  className?: string
  gx: number
  gy: number
  text: string
  z?: number
}> = ({ align = 'start', className = 'cap-anno', gx, gy, text, z = 0 }) => {
  const [x, y] = project(gx, gy, z)
  return (
    <text
      className={className}
      fill={STROKE_INK}
      fontFamily="var(--font-mono)"
      fontSize={8.5}
      letterSpacing="0.06em"
      textAnchor={align}
      x={x}
      y={y}
    >
      {text}
    </text>
  )
}

/** Signal marker — projected circle at a grid point. */
export const CapSignal: React.FC<{
  className?: string
  fill?: string
  gx: number
  gy: number
  r?: number
  z?: number
}> = ({ className, fill = STROKE_INK, gx, gy, r = 2.4, z = 4 }) => {
  const [x, y] = project(gx, gy, z)
  return <circle className={className} cx={x} cy={y} fill={fill} r={r} />
}
