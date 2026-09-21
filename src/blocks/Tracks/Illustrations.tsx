import React from 'react'

/**
 * Shared isometric illustration system for the Tracks viewer (DS-40 territory, but scoped to
 * just this block — see the plan's "DS-numbering" note). One shallow projection, one shared
 * plate, one generic box primitive reused at different proportions for every object across all
 * three states. Every color comes from an existing CSS custom property; the three "token cube"
 * accents reuse --brand/--success/--danger at reduced opacity rather than adding new tokens.
 */

export type TrackKey = 'productDesign' | 'aiWorkflow' | 'designSystems'

// Shallow dimetric projection: one grid unit right = (+CELL_X, +CELL_Y) on screen, one grid unit
// "back" = (-CELL_X, +CELL_Y), one height unit = straight up. Flatter than true 30° isometric,
// matching the spec's "shallow" plate.
const CELL_X = 17
const CELL_Y = 8
const ORIGIN = { x: 195, y: 128 }

function project(gx: number, gy: number, hpx = 0): [number, number] {
  return [ORIGIN.x + (gx - gy) * CELL_X, ORIGIN.y + (gx + gy) * CELL_Y - hpx]
}

function pts(coords: Array<[number, number, number?]>): string {
  return coords.map(([gx, gy, h]) => project(gx, gy, h ?? 0).join(',')).join(' ')
}

const STROKE = 'var(--line)'
const STROKE_WIDTH = 1.25

/** Generic isometric box: one box footprint (gx0..gx1, gy0..gy1) extruded from z0 to z1. Renders
 *  its top face plus the two visible side faces, shaded by opacity alone so a single `fill`
 *  covers all three faces (no extra color tokens needed per object). */
const IsoBox: React.FC<{
  fill: string
  fillOpacity?: number
  gx0: number
  gx1: number
  gy0: number
  gy1: number
  z0?: number
  z1: number
}> = ({ fill, fillOpacity = 1, gx0, gx1, gy0, gy1, z0 = 0, z1 }) => (
  <g>
    <polygon
      fill={fill}
      fillOpacity={fillOpacity}
      points={pts([
        [gx0, gy0, z1],
        [gx1, gy0, z1],
        [gx1, gy1, z1],
        [gx0, gy1, z1],
      ])}
      stroke={STROKE}
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
      stroke={STROKE}
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
      stroke={STROKE}
      strokeLinejoin="round"
      strokeWidth={STROKE_WIDTH}
    />
  </g>
)

/** A smaller inset square let into a box's top face — used for the AI Workflow centerpiece. */
const InsetTop: React.FC<{ gx0: number; gx1: number; gy0: number; gy1: number; inset?: number; z: number }> = ({
  gx0,
  gx1,
  gy0,
  gy1,
  inset = 0.22,
  z,
}) => {
  const dx = (gx1 - gx0) * inset
  const dy = (gy1 - gy0) * inset
  return (
    <polygon
      fill="none"
      points={pts([
        [gx0 + dx, gy0 + dy, z],
        [gx1 - dx, gy0 + dy, z],
        [gx1 - dx, gy1 - dy, z],
        [gx0 + dx, gy1 - dy, z],
      ])}
      stroke={STROKE}
      strokeWidth={STROKE_WIDTH}
    />
  )
}

/** A regular grid of small construction dots on the ground plane, real SVG circles (this file is
 *  inline-SVG only, no CSS background tricks). */
const DotField: React.FC<{ gx0: number; gx1: number; gy0: number; gy1: number; step?: number; z?: number }> = ({
  gx0,
  gx1,
  gy0,
  gy1,
  step = 1,
  z = 0,
}) => {
  const dots: Array<[number, number]> = []
  for (let gx = gx0; gx <= gx1 + 0.001; gx += step) {
    for (let gy = gy0; gy <= gy1 + 0.001; gy += step) {
      dots.push([gx, gy])
    }
  }
  return (
    <g fill="var(--line)" fillOpacity={0.6}>
      {dots.map(([gx, gy], i) => {
        const [x, y] = project(gx, gy, z)
        return <circle cx={x} cy={y} key={i} r={0.9} />
      })}
    </g>
  )
}

/** A small mono annotation label, e.g. "U1" or "1440 · 12 COL". */
const Annotation: React.FC<{ align?: 'end' | 'middle' | 'start'; gx: number; gy: number; z?: number; text: string }> = ({
  align = 'start',
  gx,
  gy,
  z = 0,
  text,
}) => {
  const [x, y] = project(gx, gy, z)
  return (
    <text
      fill="var(--ink-3)"
      fontFamily="var(--font-mono)"
      fontSize={9.5}
      letterSpacing="0.04em"
      textAnchor={align}
      x={x}
      y={y}
    >
      {text}
    </text>
  )
}

/** A hairline dimension line with small perpendicular end ticks — no arrowheads. */
const DimensionLine: React.FC<{ from: [number, number, number?]; tick?: number; to: [number, number, number?] }> = ({
  from,
  tick = 3,
  to,
}) => {
  const [x1, y1] = project(from[0], from[1], from[2])
  const [x2, y2] = project(to[0], to[1], to[2])
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const px = (-dy / len) * tick
  const py = (dx / len) * tick
  return (
    <g stroke="var(--line)" strokeWidth={1}>
      <line x1={x1} x2={x2} y1={y1} y2={y2} />
      <line x1={x1 - px} x2={x1 + px} y1={y1 - py} y2={y1 + py} />
      <line x1={x2 - px} x2={x2 + px} y1={y2 - py} y2={y2 + py} />
    </g>
  )
}

/** The shared shallow base every track's objects sit on — warm ivory top, thin warm-gray
 *  outline, minimal lower thickness. Identical across all three states. */
const IsoPlate: React.FC = () => (
  <IsoBox fill="var(--paper)" fillOpacity={1} gx0={-2.4} gx1={6.4} gy0={-2.4} gy1={6.4} z0={-6} z1={0} />
)

const ProductDesignIllustration: React.FC = () => (
  <g>
    {/* larger neutral block, back/above */}
    <IsoBox fill="var(--panel)" gx0={1.4} gx1={4.6} gy0={0.6} gy1={2.6} z1={64} />
    {/* dominant accent slab, front/lower-left */}
    <IsoBox fill="var(--track-accent)" gx0={-1.6} gx1={2.6} gy0={2.6} gy1={5.6} z1={30} />
    {/* smaller slotted prism, right */}
    <IsoBox fill="var(--panel)" gx0={4.2} gx1={6.2} gy0={-1.2} gy1={1.4} z1={46} />
    {/* slot lines on the prism's top face */}
    <g stroke="var(--line)" strokeWidth={1}>
      {[0.3, 0.55, 0.8].map((t) => {
        const [x1, y1] = project(4.2 + (6.2 - 4.2) * t, -1.2, 46)
        const [x2, y2] = project(4.2 + (6.2 - 4.2) * t, 1.4, 46)
        return <line key={t} x1={x1} x2={x2} y1={y1} y2={y2} />
      })}
    </g>
    <Annotation gx={-1.5} gy={5.9} text="U1" z={30} />
    <Annotation gx={1.5} gy={0.5} text="ART" z={64} />
    <DimensionLine from={[-2, 6.4]} to={[6.4, 6.4]} />
    <Annotation align="middle" gx={2.2} gy={6.4} text="1440 · 12 COL" />
  </g>
)

const AiWorkflowIllustration: React.FC = () => {
  const centre = { gx0: 1.6, gx1: 4, gy0: 1.6, gy1: 4 }
  return (
    <g>
      {/* peripheral blocks */}
      <IsoBox fill="var(--panel)" gx0={-1.4} gx1={0.6} gy0={0} gy1={1.8} z1={34} />
      <IsoBox fill="var(--panel)" gx0={4.6} gx1={6.4} gy0={0.4} gy1={2.2} z1={26} />
      <IsoBox fill="var(--panel)" gx0={-0.4} gx1={1.6} gy0={4} gy1={5.8} z1={30} />
      <IsoBox fill="var(--panel)" gx0={4} gx1={6} gy0={4} gy1={5.8} z1={44} />
      {/* tallest central block with inset top */}
      <IsoBox fill="var(--panel)" {...centre} z1={104} />
      <InsetTop {...centre} z={104} />
      {/* small accent node + one thin connecting line */}
      <IsoBox fill="var(--track-accent)" gx0={2.5} gx1={3.1} gy0={2.5} gy1={3.1} z1={116} />
      <DimensionLine from={[2.8, 2.8, 116]} to={[5, 4.9, 44]} tick={0} />
      <Annotation gx={1.7} gy={1.2} text="PLAN" z={104} />
      <Annotation gx={-1.3} gy={1.9} text="B01" z={0} />
    </g>
  )
}

const DesignSystemsIllustration: React.FC = () => {
  const footprint = { gx0: 2, gx1: 4.5, gy0: 2, gy1: 4.5 }
  return (
    <g>
      {/* three small diagonal token cubes, upper-left/back — existing semantic roles, restrained opacity */}
      <IsoBox fill="var(--brand)" fillOpacity={0.4} gx0={-1.6} gx1={-0.6} gy0={-1.6} gy1={-0.6} z1={20} />
      <IsoBox fill="var(--success)" fillOpacity={0.4} gx0={-0.6} gx1={0.3} gy0={-2.4} gy1={-1.5} z1={20} />
      <IsoBox fill="var(--danger)" fillOpacity={0.4} gx0={-2.4} gx1={-1.5} gy0={-0.6} gy1={0.3} z1={20} />
      {/* layered central cube: lower neutral, middle brand, top accent — same footprint, stacked */}
      <IsoBox fill="var(--panel)" fillOpacity={0.55} z0={0} z1={34} {...footprint} />
      <IsoBox fill="var(--brand)" z0={34} z1={66} {...footprint} />
      <IsoBox fill="var(--track-accent)" z0={66} z1={92} {...footprint} />
      <Annotation gx={-2} gy={-1.9} text="TOKENS" z={20} />
      <DimensionLine from={[2, 4.7]} to={[4.5, 4.7]} />
      <Annotation align="middle" gx={3.25} gy={4.7} text="12 PARTS · V3" />
    </g>
  )
}

export const TrackIllustration: React.FC<{ className?: string; trackKey: TrackKey }> = ({ className, trackKey }) => (
  <svg aria-hidden="true" className={className} style={{ direction: 'ltr' }} viewBox="0 0 400 240">
    <IsoPlate />
    <DotField gx0={-2} gx1={6} gy0={-2} gy1={6} step={2} z={0.01} />
    {trackKey === 'productDesign' && <ProductDesignIllustration />}
    {trackKey === 'aiWorkflow' && <AiWorkflowIllustration />}
    {trackKey === 'designSystems' && <DesignSystemsIllustration />}
  </svg>
)
