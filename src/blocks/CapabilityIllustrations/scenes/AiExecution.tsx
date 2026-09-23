import React from 'react'

import {
  ACCENT,
  CapAnno,
  CapBox,
  CapDotField,
  CapFrame,
  CapLink,
  CapNode,
  CapPlate,
  CapRegistration,
  CapSignal,
  STROKE,
  STROKE_INK,
} from '../spatial'

/**
 * AI-assisted Execution — context → orchestrator → agents/tools → output.
 * Resolved: pipeline assembled, orange only on final output.
 * Motion: context enters → orchestrate → split → process → return → output rises.
 */
export const AiExecutionScene: React.FC = () => (
  <g>
    <CapRegistration />
    <CapPlate />
    <CapDotField step={2} />

    {/* Context stack — thin document planes */}
    <g className="cap-ai-context">
      <CapFrame fillOpacity={0.16} gx0={-2.6} gx1={0} gy0={0.2} gy1={3.8} stroke={STROKE} z={16} />
      <CapFrame fillOpacity={0.22} gx0={-2.6} gx1={0} gy0={0.2} gy1={3.8} stroke={STROKE_INK} z={26} />
      <CapFrame fillOpacity={0.3} gx0={-2.6} gx1={0} gy0={0.2} gy1={3.8} stroke={STROKE_INK} z={36} />
      <CapBox fill="var(--paper)" gx0={-2.4} gx1={-0.2} gy0={0.4} gy1={3.6} z0={36} z1={46} />
      <CapLink from={[-2, 1.1, 46]} stroke={STROKE} to={[-0.6, 1.1, 46]} />
      <CapLink from={[-2, 1.8, 46]} stroke={STROKE} to={[-0.8, 1.8, 46]} />
      <CapLink from={[-2, 2.5, 46]} stroke={STROKE} to={[-0.7, 2.5, 46]} />
    </g>

    {/* Structural ink links (always present) */}
    <g fill="none" stroke={STROKE} strokeWidth={1.15}>
      <CapLink from={[-0.2, 2, 42]} to={[1.2, 2, 58]} />
      <CapLink from={[2, 2, 58]} to={[3.2, 0.2, 42]} />
      <CapLink from={[2, 2, 58]} to={[3.2, 3.8, 38]} />
      <CapLink from={[2, 2, 58]} to={[3.4, 2, 34]} />
      <CapLink from={[3.8, 0.2, 42]} to={[5.1, 2, 30]} />
      <CapLink from={[3.8, 3.8, 38]} to={[5.1, 2, 30]} />
      <CapLink from={[4, 2, 34]} to={[5.1, 2, 30]} />
    </g>

    {/* Accent signal paths — animate during the cycle, quiet when resolved */}
    <CapLink
      className="cap-ai-input"
      from={[-0.2, 2, 42]}
      pathLength={1}
      stroke={ACCENT}
      strokeWidth={1.6}
      to={[1.2, 2, 58]}
    />
    <g className="cap-ai-branches">
      <CapLink from={[2, 2, 58]} pathLength={1} stroke={ACCENT} strokeWidth={1.6} to={[3.2, 0.2, 42]} />
      <CapLink from={[2, 2, 58]} pathLength={1} stroke={ACCENT} strokeWidth={1.6} to={[3.2, 3.8, 38]} />
      <CapLink from={[2, 2, 58]} pathLength={1} stroke={ACCENT} strokeWidth={1.6} to={[3.4, 2, 34]} />
    </g>
    <g className="cap-ai-return">
      <CapLink from={[3.8, 0.2, 42]} pathLength={1} stroke={ACCENT} strokeWidth={1.6} to={[5.1, 2, 30]} />
      <CapLink from={[3.8, 3.8, 38]} pathLength={1} stroke={ACCENT} strokeWidth={1.6} to={[5.1, 2, 30]} />
      <CapLink from={[4, 2, 34]} pathLength={1} stroke={ACCENT} strokeWidth={1.6} to={[5.1, 2, 30]} />
    </g>

    {/* Orchestrator */}
    <g className="cap-ai-orchestrator">
      <CapBox fill="var(--paper)" gx0={1.1} gx1={2.9} gy0={1.1} gy1={2.9} z0={14} z1={58} />
      <CapNode className="cap-ai-orch-node" fill="var(--panel)" gx={2} gy={2} size={0.3} z={58} />
    </g>

    {/* Agent / tool blocks */}
    <g className="cap-ai-agent-a">
      <CapBox fill="var(--panel)" gx0={2.9} gx1={4.7} gy0={-0.8} gy1={1.1} z1={42} />
      <CapSignal className="cap-ai-packet-a" fill={ACCENT} gx={3.8} gy={0.15} r={2.3} z={44} />
    </g>
    <g className="cap-ai-agent-b">
      <CapBox fill="var(--panel)" gx0={2.9} gx1={4.7} gy0={2.9} gy1={4.8} z1={38} />
      <CapSignal className="cap-ai-packet-b" fill={ACCENT} gx={3.8} gy={3.85} r={2.3} z={40} />
    </g>
    <g className="cap-ai-tool">
      <CapBox fill="var(--paper)" gx0={3.1} gx1={4.5} gy0={1.35} gy1={2.65} z1={34} />
      <CapLink from={[3.3, 1.75, 34]} stroke={STROKE} to={[4.3, 1.75, 34]} />
      <CapLink from={[3.3, 2.25, 34]} stroke={STROKE} to={[4.2, 2.25, 34]} />
    </g>

    {/* Output — orange only here when resolved */}
    <g className="cap-ai-output">
      <CapBox fill="var(--paper)" gx0={4.9} gx1={6.7} gy0={0.9} gy1={3.1} z0={8} z1={54} />
      <CapBox
        className="cap-ai-output-accent"
        fill={ACCENT}
        fillOpacity={0.95}
        gx0={5.2}
        gx1={6.4}
        gy0={1.2}
        gy1={2.8}
        z0={54}
        z1={60}
      />
      <CapAnno align="middle" className="cap-anno" gx={5.8} gy={3.5} text="OUTPUT" z={54} />
    </g>

    <CapAnno className="cap-anno" gx={-2.5} gy={-0.3} text="CONTEXT" z={46} />
  </g>
)
