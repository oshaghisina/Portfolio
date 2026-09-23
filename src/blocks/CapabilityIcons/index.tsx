import React from 'react'

import type { SkillKey, SpotlightKey } from './keys'

/**
 * The capability icon system: four large spotlight illustrations, sixteen mini marks and four
 * compact spotlight marks for the homepage preview — all in one drawing language.
 *
 * The language is the house drafting vocabulary already used by `Tracks/Illustrations.tsx` and
 * `components/IntersectionDiagram` — `var(--line)` hairlines at 1.25, `var(--panel)` plates at
 * half opacity, `var(--paper)` knockouts, registration corners, dashed tolerance zones, and
 * dimension lines with perpendicular end ticks instead of arrowheads. As in those files, the
 * accent (`var(--track-accent)`) appears in **exactly one place per drawing**: whatever the
 * capability actually turns on.
 *
 * Flat orthographic, not the isometric projection Tracks uses. Sixteen isometric marks collapse
 * into identical grey blobs at 32px; flat construction stays legible and still reads as the same
 * family.
 *
 * No `<text>` anywhere. Labels inside art would need seven locales and would reintroduce exactly
 * the overlap that `ProcessDiagram` and `IntersectionDiagram` were rebuilt to make impossible —
 * so every concept here is carried by geometry, and the words live in HTML beside the mark.
 *
 * Art never mirrors: `direction: 'ltr'` on every root `<svg>`. `rtl-persian` is not an exception —
 * it depicts both directions inside its own geometry, which is the point of it.
 */

const STROKE = 'var(--line)'
const SW = 1.25
const ACCENT = 'var(--track-accent)'
const ASW = 1.5

// ─────────────────────────────────────────────────────────────────────────────
// Mini marks — 32×32, one per skill. Content is inset to roughly 3…29.
// ─────────────────────────────────────────────────────────────────────────────

/** Scope, framing and prioritisation held together: satellite panels coordinated from one edge. */
const ProductManagementMark: React.FC = () => (
  <>
    <rect fill="var(--panel)" fillOpacity={0.5} height={12} stroke={STROKE} strokeWidth={SW} width={13} x={3} y={8} />
    <g fill="var(--paper)" stroke={STROKE} strokeWidth={SW}>
      <rect height={7} width={8} x={21} y={4} />
      <rect height={9} width={8} x={21} y={17} />
    </g>
    <g stroke={STROKE} strokeWidth={SW}>
      <line x1={16} x2={21} y1={12} y2={7.5} />
      <line x1={16} x2={21} y1={16} y2={21.5} />
    </g>
    {/* the coordinating edge — where both dependencies are held */}
    <line stroke={ACCENT} strokeWidth={ASW} x1={16} x2={16} y1={10} y2={18} />
  </>
)

/** Surface signal, then the layer under it, then the root — which is never quite where you looked. */
const ProductDiscoveryMark: React.FC = () => (
  <>
    <circle cx={16} cy={16} r={12.5} stroke={STROKE} strokeDasharray="2 6" strokeWidth={SW} />
    <circle cx={16.9} cy={16.9} r={7.6} fill="var(--panel)" fillOpacity={0.5} stroke={STROKE} strokeWidth={SW} />
    <circle cx={17.8} cy={17.8} r={3.4} fill="var(--paper)" stroke={STROKE} strokeWidth={SW} />
    <circle cx={17.8} cy={17.8} fill={ACCENT} r={1.7} />
  </>
)

/** Several actors, each with its own touchpoint, resolving onto one service. */
const ServiceDesignMark: React.FC = () => (
  <>
    <g stroke={STROKE} strokeWidth={SW}>
      <line x1={4} x2={24.5} y1={16} y2={16} />
      <line x1={7} x2={7} y1={9.8} y2={16} />
      <line x1={14} x2={14} y1={22.2} y2={16} />
      <line x1={21} x2={21} y1={9.8} y2={16} />
    </g>
    <g fill="var(--paper)" stroke={STROKE} strokeWidth={SW}>
      <circle cx={7} cy={7.2} r={2.6} />
      <circle cx={14} cy={24.8} r={2.6} />
      <circle cx={21} cy={7.2} r={2.6} />
    </g>
    {/* the service every actor resolves onto */}
    <circle cx={27} cy={16} fill={ACCENT} r={2.4} />
  </>
)

/** Input, one rule, then the branches — and the exception that has to be written down too. */
const RequirementsMark: React.FC = () => (
  <>
    <g stroke={STROKE} strokeWidth={SW}>
      <line x1={3} x2={10} y1={16} y2={16} />
      <line x1={17} x2={21} y1={16} y2={16} />
      <line x1={21} x2={21} y1={8.5} y2={23.5} />
      <line x1={21} x2={24} y1={8.5} y2={8.5} />
      <line x1={21} x2={24} y1={23.5} y2={23.5} />
    </g>
    <rect fill="var(--panel)" fillOpacity={0.5} height={9} stroke={STROKE} strokeWidth={SW} width={7} x={10} y={11.5} />
    <rect fill="var(--paper)" height={5.5} stroke={STROKE} strokeWidth={SW} width={5} x={24} y={5.75} />
    {/* the exception branch — the one everybody forgets to specify */}
    <rect fill="none" height={5.5} stroke={ACCENT} strokeWidth={ASW} width={5} x={24} y={20.75} />
  </>
)

/** Context in, agents around, one human decision in the middle, execution out. */
const AiProductDevelopmentMark: React.FC = () => (
  <>
    <g fill="var(--paper)" stroke={STROKE} strokeWidth={SW}>
      <rect height={5} width={6} x={3} y={5} />
      <rect height={5} width={6} x={23} y={5} />
      <rect height={5} width={6} x={3} y={22} />
    </g>
    <g stroke={STROKE} strokeWidth={SW}>
      <line x1={9} x2={12.6} y1={7.5} y2={13.2} />
      <line x1={23} x2={19.4} y1={7.5} y2={13.2} />
      <line x1={9} x2={12.6} y1={24.5} y2={18.8} />
      <line x1={19.8} x2={26} y1={18.6} y2={24} />
      <line x1={24} x2={28} y1={25.7} y2={22.3} />
    </g>
    {/* the decision node — a person, not a model */}
    <rect
      fill="none"
      height={8}
      stroke={ACCENT}
      strokeWidth={ASW}
      transform="rotate(45 16 16)"
      width={8}
      x={12}
      y={12}
    />
  </>
)

/** A process path that forks, with the checkpoint that decides whether it may continue. */
const ProcessOperationsMark: React.FC = () => (
  <>
    <g stroke={STROKE} strokeWidth={SW}>
      <line x1={3} x2={12} y1={11} y2={11} />
      <line x1={19} x2={23.5} y1={11} y2={11} />
      <line x1={15.5} x2={15.5} y1={18} y2={23} />
      <line x1={15.5} x2={27} y1={23} y2={23} />
    </g>
    <rect fill="var(--panel)" fillOpacity={0.5} height={7} stroke={STROKE} strokeWidth={SW} width={7} x={12} y={7.5} />
    <circle cx={27} cy={23} fill="var(--paper)" r={2.2} stroke={STROKE} strokeWidth={SW} />
    {/* the operational checkpoint */}
    <rect fill="none" height={5} stroke={ACCENT} strokeWidth={ASW} width={5} x={23.5} y={8.5} />
  </>
)

/** Customer, product, revenue and operations — four parts that only work as one model. */
const BusinessModelingMark: React.FC = () => (
  <>
    <g fill="var(--panel)" fillOpacity={0.5} stroke={STROKE} strokeWidth={SW}>
      <rect height={10} width={10} x={4} y={4} />
      <rect height={10} width={10} x={18} y={4} />
      <rect height={10} width={10} x={4} y={18} />
      <rect height={10} width={10} x={18} y={18} />
    </g>
    <g stroke={STROKE} strokeWidth={SW}>
      <line x1={14} x2={16} y1={14} y2={16} />
      <line x1={18} x2={16} y1={14} y2={16} />
      <line x1={14} x2={16} y1={18} y2={16} />
      <line x1={18} x2={16} y1={18} y2={16} />
    </g>
    {/* the point where the four stop being separate */}
    <circle cx={16} cy={16} fill={ACCENT} r={2} />
  </>
)

/** A product surface with the API, data and infrastructure it actually rests on. */
const TechnicalPmMark: React.FC = () => (
  <>
    <rect fill="var(--panel)" fillOpacity={0.5} height={7} stroke={STROKE} strokeWidth={SW} width={22} x={5} y={4} />
    <g stroke={STROKE} strokeWidth={SW}>
      <line x1={11} x2={11} y1={4} y2={11} />
      <line x1={5} x2={27} y1={7.5} y2={7.5} />
    </g>
    <g fill="var(--paper)" stroke={STROKE} strokeWidth={SW}>
      <rect height={4.5} width={18} x={7} y={14} />
      <rect height={4.5} width={18} x={7} y={21.5} />
    </g>
    {/* the bus that makes them one product, not four systems */}
    <line stroke={ACCENT} strokeWidth={ASW} x1={21} x2={21} y1={11} y2={26} />
  </>
)

/** A written document resolved into the linked blocks engineering can build from. */
const DocumentationSpecMark: React.FC = () => (
  <>
    <rect fill="var(--panel)" fillOpacity={0.5} height={22} stroke={STROKE} strokeWidth={SW} width={11} x={3} y={5} />
    <g stroke={STROKE} strokeWidth={1}>
      <line x1={5.5} x2={11.5} y1={10} y2={10} />
      <line x1={5.5} x2={11.5} y1={14} y2={14} />
      <line x1={5.5} x2={9.5} y1={18} y2={18} />
      <line x1={5.5} x2={11.5} y1={22} y2={22} />
    </g>
    <g fill="var(--paper)" stroke={STROKE} strokeWidth={SW}>
      <rect height={5} width={9} x={20} y={6} />
      <rect height={5} width={9} x={20} y={13.5} />
      <rect height={5} width={9} x={20} y={21} />
    </g>
    <g stroke={STROKE} strokeWidth={SW}>
      <line x1={17} x2={20} y1={8.5} y2={8.5} />
      <line x1={17} x2={20} y1={16} y2={16} />
      <line x1={17} x2={20} y1={23.5} y2={23.5} />
      <line x1={14} x2={17} y1={16} y2={16} />
    </g>
    {/* the spine that keeps them one specification instead of three documents */}
    <line stroke={ACCENT} strokeWidth={ASW} x1={17} x2={17} y1={8.5} y2={23.5} />
  </>
)

/** A measured baseline, the point where an experiment splits off it, and the result observed. */
const AnalyticsExperimentationMark: React.FC = () => (
  <>
    <line stroke={STROKE} strokeDasharray="2 5" strokeWidth={SW} x1={17} x2={17} y1={5} y2={27} />
    <g fill="none" stroke={STROKE} strokeWidth={SW}>
      <polyline points="4,23 10,20 17,21" />
      <polyline points="17,21 24,22 29,22" />
      <polyline points="17,21 23,14 28,10" />
    </g>
    <circle cx={10} cy={20} fill="var(--paper)" r={1.8} stroke={STROKE} strokeWidth={SW} />
    {/* the observed result */}
    <circle cx={28} cy={10} fill={ACCENT} r={2.2} />
  </>
)

/** An interface plane with a real hierarchy on it — what reads first, and what follows. */
const UxDirectionMark: React.FC = () => (
  <>
    <rect fill="var(--panel)" fillOpacity={0.5} height={22} stroke={STROKE} strokeWidth={SW} width={26} x={3} y={5} />
    <g fill="var(--paper)" stroke={STROKE} strokeWidth={SW}>
      <rect height={9} width={8} x={6} y={15} />
      <rect height={4} width={9} x={17} y={15} />
      <rect height={3} width={9} x={17} y={21} />
    </g>
    {/* the top of the hierarchy — the one thing that reads first */}
    <rect fill="none" height={3.5} stroke={ACCENT} strokeWidth={ASW} width={20} x={6} y={8.5} />
  </>
)

/** Separate functions, each with its own stake, converging on one decision. */
const StakeholderManagementMark: React.FC = () => (
  <>
    <g stroke={STROKE} strokeWidth={SW}>
      <line x1={7.4} x2={18.5} y1={5} y2={14.6} />
      <line x1={7.4} x2={18.5} y1={12} y2={15.4} />
      <line x1={7.4} x2={18.5} y1={20} y2={16.6} />
      <line x1={7.4} x2={18.5} y1={27} y2={17.4} />
    </g>
    <g fill="var(--paper)" stroke={STROKE} strokeWidth={SW}>
      <circle cx={5} cy={5} r={2.4} />
      <circle cx={5} cy={12} r={2.4} />
      <circle cx={5} cy={20} r={2.4} />
      <circle cx={5} cy={27} r={2.4} />
    </g>
    {/* the decision they all converge on */}
    <rect
      fill="none"
      height={8}
      stroke={ACCENT}
      strokeWidth={ASW}
      transform="rotate(45 23 16)"
      width={8}
      x={19}
      y={12}
    />
  </>
)

/** Value moving through the product and the system that has to settle it. */
const FintechStrategyMark: React.FC = () => (
  <>
    <g fill="var(--panel)" fillOpacity={0.5} stroke={STROKE} strokeWidth={SW}>
      <rect height={7} width={7} x={3} y={12.5} />
      <rect height={7} width={7} x={13} y={5} />
      <rect height={7} width={7} x={13} y={20} />
    </g>
    <g stroke={STROKE} strokeWidth={SW}>
      <line x1={10} x2={13} y1={15} y2={9.5} />
      <line x1={10} x2={13} y1={17} y2={22.5} />
      <line x1={20} x2={23} y1={9.5} y2={14.5} />
      <line x1={20} x2={23} y1={22.5} y2={17.5} />
    </g>
    {/* where the value actually lands */}
    <rect fill="none" height={8} stroke={ACCENT} strokeWidth={ASW} width={6} x={23} y={12} />
  </>
)

/** Two reading directions, two systems, one product that has to hold both. */
const RtlPersianMark: React.FC = () => (
  <>
    <rect fill="var(--panel)" fillOpacity={0.5} height={9} stroke={STROKE} strokeWidth={SW} width={26} x={3} y={3} />
    <g stroke={STROKE} strokeWidth={1}>
      <line x1={17} x2={27} y1={6} y2={6} />
      <line x1={12} x2={27} y1={9} y2={9} />
    </g>
    <rect fill="var(--panel)" fillOpacity={0.5} height={9} stroke={STROKE} strokeWidth={SW} width={26} x={3} y={20} />
    <g stroke={STROKE} strokeWidth={1}>
      <line x1={5} x2={15} y1={23} y2={23} />
      <line x1={5} x2={20} y1={26} y2={26} />
    </g>
    {/* the crossing — the same system read both ways */}
    <g stroke={ACCENT} strokeWidth={ASW}>
      <line x1={11} x2={21} y1={12} y2={20} />
      <line x1={21} x2={11} y1={12} y2={20} />
    </g>
  </>
)

/** States, the transitions between them, and the loop that makes progression feel like progress. */
const GamificationMark: React.FC = () => (
  <>
    <g stroke={STROKE} strokeWidth={SW}>
      <line x1={17.7} x2={24.1} y1={9.2} y2={19.3} />
      <line x1={22.4} x2={9.6} y1={24} y2={24} />
      <line x1={13} x2={13} y1={20.5} y2={19} />
      <line x1={23} x2={24.4} y1={15.5} y2={16.3} />
    </g>
    <g fill="var(--paper)" stroke={STROKE} strokeWidth={SW}>
      <circle cx={16} cy={6.5} r={3} />
      <circle cx={26} cy={24} r={3} />
      <circle cx={6} cy={24} r={3} />
    </g>
    {/* the return leg — the transition that closes the loop and starts the next cycle */}
    <line stroke={ACCENT} strokeWidth={ASW} x1={7.9} x2={14.3} y1={21.7} y2={9.2} />
  </>
)

/** An undefined system on one side, an operating model on the other. */
const ProductFunctionSetupMark: React.FC = () => (
  <>
    <rect height={17} stroke={STROKE} strokeDasharray="2 6" strokeWidth={SW} width={10} x={3} y={7.5} />
    <rect fill="var(--panel)" fillOpacity={0.5} height={17} stroke={STROKE} strokeWidth={SW} width={10} x={19} y={7.5} />
    <g stroke={STROKE} strokeWidth={1}>
      <line x1={19} x2={29} y1={13} y2={13} />
      <line x1={19} x2={29} y1={19} y2={19} />
      <line x1={24} x2={24} y1={13} y2={24.5} />
    </g>
    {/* the move from one to the other — a dimension line, no arrowhead */}
    <g stroke={ACCENT} strokeWidth={ASW}>
      <line x1={14} x2={18} y1={16} y2={16} />
      <line x1={18} x2={18} y1={13.8} y2={18.2} />
    </g>
  </>
)

const SKILL_MARKS = {
  'ai-product-development': AiProductDevelopmentMark,
  'analytics-experimentation': AnalyticsExperimentationMark,
  'business-modeling': BusinessModelingMark,
  'documentation-spec': DocumentationSpecMark,
  'fintech-strategy': FintechStrategyMark,
  gamification: GamificationMark,
  'process-operations': ProcessOperationsMark,
  'product-discovery': ProductDiscoveryMark,
  'product-function-setup': ProductFunctionSetupMark,
  'product-management': ProductManagementMark,
  requirements: RequirementsMark,
  'rtl-persian': RtlPersianMark,
  'service-design': ServiceDesignMark,
  'stakeholder-management': StakeholderManagementMark,
  'technical-pm': TechnicalPmMark,
  'ux-direction': UxDirectionMark,
} satisfies Record<SkillKey, React.FC>

/**
 * One skill's mark. Decorative by contract: the skill's title is always rendered beside it, so
 * the SVG stays out of the accessibility tree entirely (§49) rather than exposing sixteen
 * unlabelled graphics.
 */
export const SkillIcon: React.FC<{ className?: string; skillKey: SkillKey }> = ({
  className,
  skillKey,
}) => {
  const Mark = SKILL_MARKS[skillKey]
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      style={{ direction: 'ltr' }}
      viewBox="0 0 32 32"
    >
      <Mark />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Spotlight illustrations — 400×240, one per primary capability.
// Same vocabulary as the mini marks, given room to make a longer argument.
// ─────────────────────────────────────────────────────────────────────────────

/** Two registration corners on a frame — the mark that says "this is a drawing, not a picture". */
const Corners: React.FC<{ h: number; w: number; x: number; y: number }> = ({ h, w, x, y }) => (
  <g stroke={STROKE} strokeWidth={SW}>
    <line x1={x} x2={x - 14} y1={y} y2={y} />
    <line x1={x} x2={x} y1={y} y2={y - 14} />
    <line x1={x + w} x2={x + w + 14} y1={y + h} y2={y + h} />
    <line x1={x + w} x2={x + w} y1={y + h} y2={y + h + 14} />
  </g>
)

/**
 * 001 — Product Discovery. Three nested fields: the signal you were handed, the layer under it,
 * and the root. Each field's centre drifts from the last, because the real problem is never
 * concentric with the brief. A leader hands the root down to the caption rather than labelling it
 * over the art.
 */
const DiscoverySpotlight: React.FC = () => (
  <>
    <rect height={150} stroke={STROKE} strokeDasharray="2 6" strokeWidth={SW} width={320} x={40} y={22} />
    <Corners h={150} w={320} x={40} y={22} />
    <rect
      fill="var(--panel)"
      fillOpacity={0.5}
      height={96}
      stroke={STROKE}
      strokeWidth={SW}
      width={216}
      x={96}
      y={52}
    />
    <rect fill="var(--paper)" height={52} stroke={STROKE} strokeWidth={SW} width={112} x={160} y={78} />
    {/* construction inside the middle field — the assumptions that got tested */}
    <g stroke={STROKE} strokeWidth={1}>
      <line x1={96} x2={160} y1={104} y2={104} />
      <line x1={272} x2={312} y1={104} y2={104} />
      <line x1={216} x2={216} y1={52} y2={78} />
    </g>
    {/* the leader hands off to the HTML caption instead of writing on the drawing */}
    <g stroke={STROKE} strokeWidth={SW}>
      <line strokeDasharray="2 5" x1={216} x2={216} y1={110} y2={204} />
      <line x1={206} x2={226} y1={204} y2={204} />
    </g>
    {/* the root */}
    <circle cx={216} cy={104} fill={ACCENT} r={6} />
  </>
)

/**
 * 002 — Service Design. Four actors, each a system in its own right, docked onto one service
 * spine. The orchestration point is the only thing that touches all four, and it is the only
 * thing that is not an interface.
 */
const ServiceSpotlight: React.FC = () => {
  const plates: Array<[number, number]> = [
    [64, 30],
    [248, 30],
    [64, 158],
    [248, 158],
  ]
  return (
    <>
      <line stroke={STROKE} strokeWidth={SW} x1={40} x2={360} y1={120} y2={120} />
      {plates.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect
            fill="var(--panel)"
            fillOpacity={0.5}
            height={52}
            stroke={STROKE}
            strokeWidth={SW}
            width={88}
            x={x}
            y={y}
          />
          <g stroke={STROKE} strokeWidth={1}>
            <line x1={x + 12} x2={x + 52} y1={y + 18} y2={y + 18} />
            <line x1={x + 12} x2={x + 68} y1={y + 32} y2={y + 32} />
          </g>
        </g>
      ))}
      <g stroke={STROKE} strokeWidth={SW}>
        <line x1={108} x2={108} y1={82} y2={120} />
        <line x1={292} x2={292} y1={82} y2={120} />
        <line x1={108} x2={108} y1={158} y2={120} />
        <line x1={292} x2={292} y1={158} y2={120} />
      </g>
      <Corners h={180} w={296} x={52} y={22} />
      {/* the orchestration point — the part of the service no screen ever shows */}
      <rect
        fill="var(--paper)"
        height={34}
        stroke={STROKE}
        strokeWidth={SW}
        transform="rotate(45 200 120)"
        width={34}
        x={183}
        y={103}
      />
      <rect
        fill="none"
        height={34}
        stroke={ACCENT}
        strokeWidth={ASW}
        transform="rotate(45 200 120)"
        width={34}
        x={183}
        y={103}
      />
      <circle cx={200} cy={120} fill={ACCENT} r={5} />
    </>
  )
}

/**
 * 003 — Product Systems. Six modules — requirements, operations, the business model, the
 * technical surface — wired as one operating system rather than six deliverables. The bus runs
 * through all of them; the integration point is where it stops being a diagram and starts being
 * something a team has to run.
 *
 * Deliberately not a component library: no repeated identical cells, no nesting. A design system
 * and an operating system are different arguments and should not share a drawing.
 */
const SystemsSpotlight: React.FC = () => {
  const modules: Array<[number, number]> = [
    [44, 42],
    [155, 42],
    [266, 42],
    [44, 142],
    [155, 142],
    [266, 142],
  ]
  return (
    <>
      {modules.map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <rect
            fill="var(--panel)"
            fillOpacity={0.5}
            height={56}
            stroke={STROKE}
            strokeWidth={SW}
            width={90}
            x={x}
            y={y}
          />
          <g stroke={STROKE} strokeWidth={1}>
            <line x1={x + 12} x2={x + 78} y1={y + 18} y2={y + 18} />
            {i % 2 === 0 ? (
              <line x1={x + 12} x2={x + 50} y1={y + 34} y2={y + 34} />
            ) : (
              <line x1={x + 34} x2={x + 34} y1={y + 18} y2={y + 44} />
            )}
          </g>
        </g>
      ))}
      <g stroke={STROKE} strokeWidth={SW}>
        <line x1={134} x2={155} y1={70} y2={70} />
        <line x1={245} x2={266} y1={70} y2={70} />
        <line x1={134} x2={155} y1={170} y2={170} />
        <line x1={245} x2={266} y1={170} y2={170} />
      </g>
      <Corners h={156} w={312} x={44} y={42} />
      {/* the bus, drawn last so it reads as running through every module */}
      <line stroke={STROKE} strokeWidth={SW} x1={200} x2={200} y1={28} y2={212} />
      {/* the integration point — where six parts become one system someone has to operate */}
      <rect fill="var(--paper)" height={20} stroke={STROKE} strokeWidth={SW} width={20} x={190} y={110} />
      <rect fill="none" height={20} stroke={ACCENT} strokeWidth={ASW} width={20} x={190} y={110} />
    </>
  )
}

/**
 * 004 — AI-assisted Execution. Context on the left, agents working it in the middle, one human
 * decision node, then execution. The decision is the accent because that is the part that does
 * not get delegated — the workflow is the architecture, the model is not the point.
 */
const AiExecutionSpotlight: React.FC = () => {
  const rows = [59, 120, 181]
  return (
    <>
      {rows.map((cy) => (
        <g key={cy}>
          <rect
            fill="var(--panel)"
            fillOpacity={0.5}
            height={30}
            stroke={STROKE}
            strokeWidth={SW}
            width={62}
            x={30}
            y={cy - 15}
          />
          <rect fill="var(--paper)" height={30} stroke={STROKE} strokeWidth={SW} width={58} x={124} y={cy - 15} />
          <g stroke={STROKE} strokeWidth={1}>
            <line x1={40} x2={72} y1={cy} y2={cy} />
            <line x1={138} x2={138} y1={cy - 8} y2={cy + 8} />
            <line x1={148} x2={148} y1={cy - 5} y2={cy + 5} />
            <line x1={158} x2={158} y1={cy - 8} y2={cy + 8} />
          </g>
          <line stroke={STROKE} strokeWidth={SW} x1={92} x2={124} y1={cy} y2={cy} />
        </g>
      ))}
      <g stroke={STROKE} strokeWidth={SW}>
        <line x1={182} x2={226} y1={59} y2={113} />
        <line x1={182} x2={226} y1={120} y2={120} />
        <line x1={182} x2={226} y1={181} y2={127} />
        {/* execution path — a dimension line, ticks not arrowheads */}
        <line x1={271} x2={310} y1={120} y2={120} />
        <line x1={271} x2={271} y1={114} y2={126} />
      </g>
      <rect fill="var(--paper)" height={52} stroke={STROKE} strokeWidth={SW} width={56} x={310} y={94} />
      <g stroke={STROKE} strokeWidth={1}>
        <line x1={320} x2={356} y1={110} y2={110} />
        <line x1={320} x2={344} y1={122} y2={122} />
        <line x1={320} x2={356} y1={134} y2={134} />
      </g>
      <Corners h={168} w={336} x={30} y={36} />
      {/* the decision that stays human */}
      <rect
        fill="var(--paper)"
        height={32}
        stroke={STROKE}
        strokeWidth={SW}
        transform="rotate(45 248 120)"
        width={32}
        x={232}
        y={104}
      />
      <rect
        fill="none"
        height={32}
        stroke={ACCENT}
        strokeWidth={ASW}
        transform="rotate(45 248 120)"
        width={32}
        x={232}
        y={104}
      />
    </>
  )
}

const SPOTLIGHT_ART = {
  'ai-execution': AiExecutionSpotlight,
  discovery: DiscoverySpotlight,
  service: ServiceSpotlight,
  systems: SystemsSpotlight,
} satisfies Record<SpotlightKey, React.FC>

/**
 * One primary capability's illustration. Decorative for the same reason as `SkillIcon`: the
 * capability title and its principle sit directly beneath it in HTML, so nothing here is the
 * only carrier of meaning.
 */
export const SpotlightIllustration: React.FC<{
  className?: string
  spotlightKey: SpotlightKey
}> = ({ className, spotlightKey }) => {
  const Art = SPOTLIGHT_ART[spotlightKey]
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      style={{ direction: 'ltr' }}
      viewBox="0 0 400 240"
    >
      <Art />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Compact spotlight marks — 48×48, one per primary capability.
// The homepage preview's version of the four illustrations above: same motif,
// stripped to the one idea each drawing is actually making. Not a scaled-down
// copy — the 400×240 art mushes below roughly 12rem, which is the same reason
// the 32×32 skill family exists at all.
// 48 rather than 32 so the mark renders at `size-12` with the 1.25 stroke
// landing at exactly 1.25px, matching the hairline that rules the page.
// ─────────────────────────────────────────────────────────────────────────────

/** 001 — nested fields whose centres drift, and the root that is never concentric with the brief. */
const DiscoveryMark: React.FC = () => (
  <>
    <rect height={34} stroke={STROKE} strokeDasharray="2 4" strokeWidth={SW} width={40} x={4} y={7} />
    <rect fill="var(--panel)" fillOpacity={0.5} height={22} stroke={STROKE} strokeWidth={SW} width={26} x={12} y={12} />
    <rect fill="var(--paper)" height={12} stroke={STROKE} strokeWidth={SW} width={14} x={20} y={18} />
    <circle cx={27} cy={24} fill={ACCENT} r={2.75} />
  </>
)

/** 002 — four actors docked on one spine, and the orchestration point no screen ever shows. */
const ServiceMark: React.FC = () => (
  <>
    <line stroke={STROKE} strokeWidth={SW} x1={3} x2={45} y1={24} y2={24} />
    <g fill="var(--panel)" fillOpacity={0.5} stroke={STROKE} strokeWidth={SW}>
      <rect height={9} width={15} x={6} y={7} />
      <rect height={9} width={15} x={27} y={7} />
      <rect height={9} width={15} x={6} y={32} />
      <rect height={9} width={15} x={27} y={32} />
    </g>
    <g stroke={STROKE} strokeWidth={1}>
      <line x1={13.5} x2={13.5} y1={16} y2={24} />
      <line x1={34.5} x2={34.5} y1={16} y2={24} />
      <line x1={13.5} x2={13.5} y1={32} y2={24} />
      <line x1={34.5} x2={34.5} y1={32} y2={24} />
    </g>
    <rect fill="var(--paper)" height={11} stroke={STROKE} strokeWidth={SW} transform="rotate(45 24 24)" width={11} x={18.5} y={18.5} />
    <rect fill="none" height={11} stroke={ACCENT} strokeWidth={ASW} transform="rotate(45 24 24)" width={11} x={18.5} y={18.5} />
  </>
)

/** 003 — modules wired as one operating system, and the point where a diagram becomes something to run. */
const SystemsMark: React.FC = () => (
  <>
    <g fill="var(--panel)" fillOpacity={0.5} stroke={STROKE} strokeWidth={SW}>
      <rect height={14} width={17} x={4} y={6} />
      <rect height={14} width={17} x={27} y={6} />
      <rect height={14} width={17} x={4} y={28} />
      <rect height={14} width={17} x={27} y={28} />
    </g>
    <g stroke={STROKE} strokeWidth={1}>
      <line x1={7.5} x2={17.5} y1={11} y2={11} />
      <line x1={30.5} x2={40.5} y1={11} y2={11} />
      <line x1={7.5} x2={17.5} y1={33} y2={33} />
      <line x1={30.5} x2={40.5} y1={33} y2={33} />
    </g>
    {/* the bus, drawn last so it reads as running through every module */}
    <line stroke={STROKE} strokeWidth={SW} x1={24} x2={24} y1={3} y2={45} />
    <rect fill="var(--paper)" height={9} stroke={STROKE} strokeWidth={SW} width={9} x={19.5} y={19.5} />
    <rect fill="none" height={9} stroke={ACCENT} strokeWidth={ASW} width={9} x={19.5} y={19.5} />
  </>
)

/** 004 — context feeding agents, the one decision that stays human, then execution. */
const AiExecutionMark: React.FC = () => (
  <>
    <g fill="var(--panel)" fillOpacity={0.5} stroke={STROKE} strokeWidth={SW}>
      <rect height={8} width={11} x={3} y={7} />
      <rect height={8} width={11} x={3} y={20} />
      <rect height={8} width={11} x={3} y={33} />
    </g>
    <g stroke={STROKE} strokeWidth={SW}>
      <line x1={14} x2={22} y1={11} y2={20} />
      <line x1={14} x2={22} y1={24} y2={24} />
      <line x1={14} x2={22} y1={37} y2={28} />
      {/* execution path — a dimension line, ticks not arrowheads */}
      <line x1={36} x2={45} y1={24} y2={24} />
      <line x1={36} x2={36} y1={20} y2={28} />
    </g>
    <rect fill="var(--paper)" height={12} stroke={STROKE} strokeWidth={SW} transform="rotate(45 27 24)" width={12} x={21} y={18} />
    <rect fill="none" height={12} stroke={ACCENT} strokeWidth={ASW} transform="rotate(45 27 24)" width={12} x={21} y={18} />
  </>
)

const SPOTLIGHT_MARKS = {
  'ai-execution': AiExecutionMark,
  discovery: DiscoveryMark,
  service: ServiceMark,
  systems: SystemsMark,
} satisfies Record<SpotlightKey, React.FC>

/**
 * One primary capability's compact mark, for the homepage preview. Decorative by the same
 * contract as `SkillIcon` and `SpotlightIllustration`: the capability's title and principle are
 * always rendered beside it, so nothing here is the only carrier of meaning.
 */
export const SpotlightMark: React.FC<{ className?: string; spotlightKey: SpotlightKey }> = ({
  className,
  spotlightKey,
}) => {
  const Mark = SPOTLIGHT_MARKS[spotlightKey]
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      style={{ direction: 'ltr' }}
      viewBox="0 0 48 48"
    >
      <Mark />
    </svg>
  )
}
