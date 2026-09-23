import React from 'react'

import { cn } from '@/utilities/ui'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'

/**
 * The About hero's visual argument: three professional domains that begin as separate systems and
 * keep converging on one shared point. It says in geometry exactly what the headline beside it says
 * in words, so the right half of the opener stops being whitespace.
 *
 * Built from the house drafting vocabulary — `var(--line)` hairlines at 1.25, `var(--panel)`
 * plates, registration corners, a dashed tolerance zone, a broken dimension line with perpendicular
 * end ticks and no arrowheads (Tracks/Illustrations.tsx). The accent (`--track-accent`) appears in
 * exactly one place: the convergence. Deliberately not three coloured circles — three equal plates
 * carrying different construction read as systems, a Venn diagram does not.
 *
 * Server component. The motion is CSS keyframes (see the `.ix-*` block in globals.css), not JS and
 * not a library — the repo has no animation dependency and this does not justify adding one.
 *
 * EVERY label is real HTML in its own `auto` grid row, including the centre one, which the drawing
 * reaches with a dashed leader rather than an overlay. So a longer German or Japanese label grows
 * its own row and can never collide with the geometry or with another label — the same lesson as
 * ProcessDiagram, which used to overlap because text was positioned over fixed-size art.
 */

const VIEW = { h: 320, w: 400 }
const C = { x: 200, y: 174 }
/** Radius of the dashed tolerance zone; the leader starts here and the plates stay outside it. */
const ZONE = 40
/** Where the leader hands off to the HTML label below the drawing. */
const LEADER_END = 296

/** Every domain sits on the same 132×86 plate — same grammar, different construction inside. */
const PLATE = { h: 74, w: 120 }
const PLATES = {
  business: { x: 24, y: 214 },
  product: { x: 140, y: 20 },
  technology: { x: 256, y: 214 },
} as const

/**
 * Each domain's dock (where its relationship line meets its plate) and its unit vector toward the
 * centre, scaled to the ~7px of travel the convergence is allowed. Subtle on purpose: this loops
 * forever beside a reader's eyeline.
 */
const DOMAINS = {
  business: { dock: { x: 144, y: 214 }, dx: '5.7px', dy: '-4.1px' },
  product: { dock: { x: 200, y: 94 }, dx: '0px', dy: '7px' },
  technology: { dock: { x: 256, y: 214 }, dx: '-5.7px', dy: '-4.1px' },
} as const

const STROKE = 'var(--line)'
const SW = 1.25

/** The intersection field: each dock pulled 42% of the way in to the centre. */
const FIELD = ([DOMAINS.product.dock, DOMAINS.business.dock, DOMAINS.technology.dock] as const)
  .map((p) => `${(C.x + (p.x - C.x) * 0.42).toFixed(1)},${(C.y + (p.y - C.y) * 0.42).toFixed(1)}`)
  .join(' ')

const domainStyle = (key: keyof typeof DOMAINS): React.CSSProperties =>
  ({ '--ix-dx': DOMAINS[key].dx, '--ix-dy': DOMAINS[key].dy }) as React.CSSProperties

/** The shared plate plus one registration corner — the part every domain has in common. */
const Plate: React.FC<{ corner: [number, number]; of: keyof typeof PLATES }> = ({ corner, of }) => {
  const { x, y } = PLATES[of]
  const [sx, sy] = corner
  const cx = sx < 0 ? x : x + PLATE.w
  const cy = sy < 0 ? y : y + PLATE.h
  return (
    <g>
      <rect fill="var(--panel)" fillOpacity={0.5} height={PLATE.h} stroke={STROKE} strokeWidth={SW} width={PLATE.w} x={x} y={y} />
      <g stroke={STROKE} strokeWidth={SW}>
        <line x1={cx} x2={cx + 10 * sx} y1={cy} y2={cy} />
        <line x1={cx} x2={cx} y1={cy} y2={cy + 10 * sy} />
      </g>
    </g>
  )
}

/** 01 — a product surface: a plate ruled into regions, the thing a decision is actually made on. */
const ProductDomain: React.FC = () => (
  <g className="ix-domain" style={domainStyle('product')}>
    <Plate corner={[-1, -1]} of="product" />
    <g stroke={STROKE} strokeWidth={SW}>
      <line x1={140} x2={260} y1={36} y2={36} />
      <line x1={184} x2={184} y1={36} y2={94} />
      <line x1={184} x2={260} y1={66} y2={66} />
      <line x1={222} x2={222} y1={66} y2={94} />
    </g>
  </g>
)

/** 02 — a value chain: nodes and the paths between them, funnelling into one exit. */
const BusinessDomain: React.FC = () => {
  const nodes: Array<[number, number]> = [
    [40, 266],
    [64, 232],
    [74, 278],
    [100, 250],
    [122, 272],
  ]
  const edges: Array<[number, number]> = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [3, 4],
    [2, 4],
  ]
  return (
    <g className="ix-domain ix-lag-1" style={domainStyle('business')}>
      <Plate corner={[-1, 1]} of="business" />
      <g stroke={STROKE} strokeWidth={SW}>
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a]![0]} x2={nodes[b]![0]} y1={nodes[a]![1]} y2={nodes[b]![1]} />
        ))}
        {/* the chain's exit, up to the plate corner the relationship line docks at */}
        <line x1={100} x2={144} y1={250} y2={214} />
      </g>
      {nodes.map(([x, y], i) => (
        <circle cx={x} cy={y} fill="var(--paper)" key={i} r={i === 3 ? 5.5 : 4} stroke={STROKE} strokeWidth={SW} />
      ))}
    </g>
  )
}

/** 03 — a stack: modules layered into an architecture, tapering toward the surface. */
const TechnologyDomain: React.FC = () => (
  <g className="ix-domain ix-lag-2" style={domainStyle('technology')}>
    <Plate corner={[1, 1]} of="technology" />
    <g stroke={STROKE} strokeWidth={SW}>
      {[
        [270, 226, 96],
        [270, 246, 80],
        [270, 266, 64],
      ].map(([x, y, w]) => (
        <rect fill="var(--paper)" height={14} key={y} width={w} x={x} y={y} />
      ))}
      {/* the bus running through every layer, out to the docking corner */}
      <line x1={286} x2={286} y1={226} y2={280} />
      <line x1={270} x2={256} y1={226} y2={214} />
    </g>
  </g>
)

/** The three lines that dock each domain into the shared point, drawn in on every cycle. */
const RelationshipLines: React.FC = () => (
  <g stroke="var(--track-accent)" strokeWidth={1.5}>
    {(['product', 'business', 'technology'] as const).map((key, i) => (
      <line
        className={cn('ix-link', i === 1 && 'ix-lag-1', i === 2 && 'ix-lag-2')}
        key={key}
        pathLength={1}
        x1={DOMAINS[key].dock.x}
        x2={C.x}
        y1={DOMAINS[key].dock.y}
        y2={C.y}
      />
    ))}
  </g>
)

/** The convergence itself — the only accent on the page, and the point of the whole drawing. */
const CentralNode: React.FC = () => (
  <g>
    {/* tolerance zone: never animated, so the centre reads as a place even at rest */}
    <circle cx={C.x} cy={C.y} fill="none" r={ZONE} stroke={STROKE} strokeDasharray="2 6" strokeWidth={SW} />
    <polygon
      className="ix-field"
      fill="var(--track-accent)"
      fillOpacity={0.16}
      points={FIELD}
      stroke="var(--track-accent)"
      strokeOpacity={0.55}
      strokeWidth={SW}
    />
    <rect
      fill="var(--paper)"
      height={18}
      stroke={STROKE}
      strokeWidth={SW}
      transform={`rotate(45 ${C.x} ${C.y})`}
      width={18}
      x={C.x - 9}
      y={C.y - 9}
    />
    <g className="ix-core">
      <rect
        fill="none"
        height={18}
        stroke="var(--track-accent)"
        strokeWidth={1.5}
        transform={`rotate(45 ${C.x} ${C.y})`}
        width={18}
        x={C.x - 9}
        y={C.y - 9}
      />
      <circle cx={C.x} cy={C.y} fill="var(--track-accent)" r={4} />
    </g>
  </g>
)

/**
 * The callout from the convergence down to its HTML label. A dashed leader keeps the label out of
 * the drawing entirely — the reason nothing here can ever overlap the geometry — and the dimension
 * line breaks around it the way a drafted one does.
 */
const CentreLeader: React.FC = () => (
  <g stroke={STROKE} strokeWidth={SW}>
    <line strokeDasharray="2 5" x1={C.x} x2={C.x} y1={C.y + ZONE} y2={LEADER_END} />
  </g>
)

/** Drafting furniture: construction dots and a dimension line broken around the leader. */
const TechnicalAnnotations: React.FC = () => (
  <g>
    <g className="ix-mark" fill="var(--line)">
      {[
        [200, 10],
        [10, 174],
        [390, 174],
      ].map(([x, y]) => (
        <circle cx={x} cy={y} key={`${x}-${y}`} r={2} />
      ))}
    </g>
    {/* no arrowheads — perpendicular end ticks, the DimensionLine idiom from Tracks */}
    <g stroke={STROKE} strokeWidth={SW}>
      <line x1={24} x2={182} y1={302} y2={302} />
      <line x1={218} x2={376} y1={302} y2={302} />
      <line x1={24} x2={24} y1={297} y2={307} />
      <line x1={376} x2={376} y1={297} y2={307} />
    </g>
  </g>
)

export interface IntersectionDiagramProps {
  className?: string
  locale?: Locale
}

export const IntersectionDiagram: React.FC<IntersectionDiagramProps> = ({ className, locale }) => {
  const copy = uiCopy[locale ?? DEFAULT_LOCALE].aboutIntersection
  const [product, business, technology] = copy.domains

  const label = (index: string, text: string) => (
    <span className="flex flex-col items-center gap-1 text-center">
      <span className="index-code" dir="ltr">
        {index}
      </span>
      <span className="eyebrow max-w-full break-words">{text}</span>
    </span>
  )

  return (
    <figure
      className={cn(
        // The three domains are conceptual, not directional, so this never mirrors — same policy
        // as Workspace's canvas and TrackIllustration. Only the label text is localized.
        'grid grid-cols-3 [--ix-cycle:9s]',
        className,
      )}
      dir="ltr"
    >
      <span className="col-start-2 row-start-1 justify-self-center">{label('01', product!)}</span>

      <svg aria-hidden className="col-start-1 col-end-4 row-start-2 mt-2 w-full" fill="none" viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}>
        <TechnicalAnnotations />
        <CentreLeader />
        <RelationshipLines />
        <ProductDomain />
        <BusinessDomain />
        <TechnologyDomain />
        <CentralNode />
      </svg>

      <span className="col-start-1 row-start-3 justify-self-center">{label('02', business!)}</span>
      <span className="col-start-2 row-start-3 flex flex-col items-center gap-0.5 justify-self-center px-2 text-center">
        <span className="eyebrow text-foreground">{copy.centre}</span>
        {/* the annotation the brief asks for at the peak of the cycle — fades up with the field */}
        <span className="ix-mark eyebrow text-track-accent">{copy.caption}</span>
      </span>
      <span className="col-start-3 row-start-3 justify-self-center">{label('03', technology!)}</span>

      <figcaption className="sr-only">{copy.description}</figcaption>
    </figure>
  )
}
