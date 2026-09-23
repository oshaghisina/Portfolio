import React from 'react'

import {
  ACCENT,
  CapAnno,
  CapBox,
  CapDotField,
  CapLink,
  CapNode,
  CapPlate,
  CapRegistration,
  CapSignal,
  STROKE,
  STROKE_INK,
  STROKE_WIDTH,
} from '../spatial'

/**
 * Product Systems — modular architecture with a shared operating core.
 * Resolved: modules locked into one lattice, orange core on.
 * Motion: independent → rails extend → one shifts → neighbors react → settle.
 */
export const SystemsScene: React.FC = () => (
  <g>
    <CapRegistration />
    <CapPlate />
    <CapDotField step={2} />

    {/* Connector rails — retract mid-cycle, then lock */}
    <g className="cap-systems-rails" fill="none" stroke={STROKE_INK} strokeWidth={STROKE_WIDTH}>
      <CapLink className="cap-systems-rail-a" from={[0.6, 0.8, 36]} pathLength={1} to={[1.6, 1.6, 52]} />
      <CapLink className="cap-systems-rail-b" from={[3.4, 0.8, 40]} pathLength={1} to={[2.4, 1.6, 52]} />
      <CapLink className="cap-systems-rail-c" from={[0.6, 3.4, 32]} pathLength={1} to={[1.6, 2.4, 52]} />
      <CapLink className="cap-systems-rail-d" from={[3.4, 3.4, 44]} pathLength={1} to={[2.4, 2.4, 52]} />
    </g>

    {/* Rules module — the one that shifts during the cycle */}
    <g className="cap-systems-mod-rules">
      <CapBox fill="var(--paper)" gx0={-1.6} gx1={0.6} gy0={-1.2} gy1={1} z1={36} />
      <CapLink from={[-1.2, -0.6, 36]} stroke={STROKE} to={[0.2, -0.6, 36]} />
      <CapLink from={[-1.2, 0, 36]} stroke={STROKE} to={[-0.2, 0, 36]} />
      <CapLink from={[-1.2, 0.5, 36]} stroke={STROKE} to={[0, 0.5, 36]} />
    </g>

    {/* Product module */}
    <g className="cap-systems-mod-product">
      <CapBox fill="var(--panel)" gx0={3.4} gx1={5.6} gy0={-1.2} gy1={1} z1={40} />
      <CapBox
        fill="var(--paper)"
        fillOpacity={0.7}
        gx0={3.85}
        gx1={5.15}
        gy0={-0.75}
        gy1={0.55}
        z0={40}
        z1={48}
      />
    </g>

    {/* Operations module */}
    <g className="cap-systems-mod-ops">
      <CapBox fill="var(--panel)" gx0={-1.6} gx1={0.6} gy0={3.2} gy1={5.4} z1={32} />
      <CapBox fill="var(--paper)" fillOpacity={0.65} gx0={-1.2} gx1={-0.5} gy0={3.6} gy1={5} z0={32} z1={44} />
      <CapBox fill="var(--paper)" fillOpacity={0.65} gx0={-0.2} gx1={0.4} gy0={3.6} gy1={5} z0={32} z1={40} />
    </g>

    {/* Data module */}
    <g className="cap-systems-mod-data">
      <CapBox fill="var(--paper)" gx0={3.4} gx1={5.6} gy0={3.2} gy1={5.4} z1={44} />
      <CapLink from={[3.7, 3.7, 44]} stroke={STROKE} to={[5.3, 3.7, 44]} />
      <CapLink from={[3.7, 4.2, 44]} stroke={STROKE} to={[5.1, 4.2, 44]} />
      <CapLink from={[3.7, 4.7, 44]} stroke={STROKE} to={[4.9, 4.7, 44]} />
    </g>

    {/* Central system core */}
    <g className="cap-systems-core-wrap">
      <CapBox fill="var(--paper)" gx0={1.3} gx1={2.7} gy0={1.3} gy1={2.7} z0={14} z1={52} />
      <CapNode className="cap-systems-core" gx={2} gy={2} size={0.3} z={52} />
    </g>

    {/* Propagation markers */}
    <g className="cap-systems-response">
      <CapSignal fill={ACCENT} gx={2} gy={0.2} r={2.2} z={20} />
      <CapSignal fill={ACCENT} gx={2} gy={3.8} r={2.2} z={20} />
    </g>

    <CapAnno className="cap-anno" gx={-1.8} gy={1.2} text="RULE" z={40} />
  </g>
)
