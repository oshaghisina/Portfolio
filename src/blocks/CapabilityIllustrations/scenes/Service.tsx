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
 * Service Design — frontstage / backstage modules on one operational platform.
 * Resolved: channels connected, router active, all touchpoints linked.
 * Motion: idle → emit → travel → router → sequential receive → connected.
 */
export const ServiceScene: React.FC = () => (
  <g>
    <CapRegistration />
    <CapPlate />
    <CapDotField step={2} />

    {/* Backstage shelf — slightly lower operational layer */}
    <CapBox
      className="cap-service-backstage-plate"
      fill="var(--panel)"
      fillOpacity={0.55}
      gx0={-1.8}
      gx1={5.8}
      gy0={3.2}
      gy1={6.4}
      z0={0}
      z1={8}
    />

    {/* Infrastructure channels */}
    <g fill="none" stroke={STROKE} strokeWidth={STROKE_WIDTH}>
      <CapLink from={[0.2, 1.4, 28]} to={[2, 2, 48]} />
      <CapLink from={[3.8, 1.4, 28]} to={[2, 2, 48]} />
      <CapLink from={[0.2, 4.8, 22]} to={[2, 2, 48]} via={[[2, 4.8, 14]]} />
      <CapLink from={[3.8, 4.8, 22]} to={[2, 2, 48]} via={[[2, 4.8, 14]]} />
    </g>

    {/* Active route — draws during motion, visible when resolved */}
    <CapLink
      className="cap-service-route"
      from={[0.2, 1.4, 28]}
      pathLength={1}
      stroke={ACCENT}
      strokeWidth={1.6}
      to={[2, 2, 48]}
      via={[[2, 1.4, 14], [2, 2, 14]]}
    />

    {/* Frontstage actors */}
    <g className="cap-service-mod-a">
      <CapBox fill="var(--paper)" gx0={-1.4} gx1={0.8} gy0={0.2} gy1={2} z1={28} />
      <CapSignal className="cap-service-emit" fill={ACCENT} gx={-0.3} gy={1.1} r={2.8} z={30} />
    </g>
    <g className="cap-service-mod-b">
      <CapBox fill="var(--paper)" gx0={3.2} gx1={5.4} gy0={0.2} gy1={2} z1={28} />
      <CapSignal className="cap-service-recv-b" fill={ACCENT} gx={4.3} gy={1.1} r={2.4} z={30} />
    </g>

    {/* Backstage operations */}
    <g className="cap-service-mod-c">
      <CapBox fill="var(--panel)" gx0={-1.4} gx1={0.8} gy0={4} gy1={5.6} z1={22} />
      <CapSignal className="cap-service-recv-c" fill={ACCENT} gx={-0.3} gy={4.8} r={2.4} z={24} />
    </g>
    <g className="cap-service-mod-d">
      <CapBox fill="var(--panel)" gx0={3.2} gx1={5.4} gy0={4} gy1={5.6} z1={22} />
      <CapSignal className="cap-service-recv-d" fill={ACCENT} gx={4.3} gy={4.8} r={2.4} z={24} />
    </g>

    {/* Central service router */}
    <g className="cap-service-router">
      <CapBox fill="var(--paper)" gx0={1.15} gx1={2.85} gy0={1.15} gy1={2.85} z0={14} z1={48} />
      <CapNode className="cap-service-core" gx={2} gy={2} size={0.28} z={48} />
    </g>

    <CapAnno className="cap-anno" gx={-1.5} gy={-0.2} text="FRONT" z={28} />
    <CapAnno className="cap-anno" gx={-1.5} gy={6.6} text="BACK" z={8} />

    {/* Soft backstage link draw */}
    <CapLink
      className="cap-service-backstage"
      from={[0.2, 4.8, 22]}
      pathLength={1}
      stroke={STROKE_INK}
      to={[3.8, 4.8, 22]}
      via={[[2, 4.8, 14]]}
    />
  </g>
)
