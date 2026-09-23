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

    {/* Backstage shelf — lower operational layer */}
    <CapBox
      fill="var(--panel)"
      fillOpacity={0.5}
      gx0={-2}
      gx1={6}
      gy0={3.4}
      gy1={6.6}
      z0={0}
      z1={7}
    />

    {/* Structural channels (always visible, ink) */}
    <g fill="none" stroke={STROKE} strokeWidth={STROKE_WIDTH}>
      <CapLink from={[-0.2, 1.2, 34]} to={[2, 2, 56]} via={[[2, 1.2, 12]]} />
      <CapLink from={[4.2, 1.2, 34]} to={[2, 2, 56]} via={[[2, 1.2, 12]]} />
      <CapLink from={[-0.2, 5, 26]} to={[2, 2, 56]} via={[[2, 5, 12]]} />
      <CapLink from={[4.2, 5, 26]} to={[2, 2, 56]} via={[[2, 5, 12]]} />
    </g>

    {/* Active route — draws during motion */}
    <CapLink
      className="cap-service-route"
      from={[-0.2, 1.2, 34]}
      pathLength={1}
      stroke={ACCENT}
      strokeWidth={1.7}
      to={[2, 2, 56]}
      via={[
        [2, 1.2, 12],
        [2, 2, 12],
      ]}
    />
    <CapLink
      className="cap-service-backstage"
      from={[-0.2, 5, 26]}
      pathLength={1}
      stroke={STROKE_INK}
      to={[4.2, 5, 26]}
      via={[[2, 5, 12]]}
    />

    {/* Frontstage */}
    <g className="cap-service-mod-a">
      <CapBox fill="var(--paper)" gx0={-1.8} gx1={0.6} gy0={0} gy1={2} z1={34} />
      <CapBox fill="var(--panel)" fillOpacity={0.7} gx0={-1.4} gx1={0.2} gy0={0.35} gy1={1.65} z0={34} z1={40} />
      <CapSignal className="cap-service-emit" fill={ACCENT} gx={-0.6} gy={1} r={2.8} z={42} />
    </g>
    <g className="cap-service-mod-b">
      <CapBox fill="var(--paper)" gx0={3.4} gx1={5.8} gy0={0} gy1={2} z1={34} />
      <CapBox fill="var(--panel)" fillOpacity={0.7} gx0={3.8} gx1={5.4} gy0={0.35} gy1={1.65} z0={34} z1={40} />
      <CapSignal className="cap-service-recv-b" fill={ACCENT} gx={4.6} gy={1} r={2.4} z={42} />
    </g>

    {/* Backstage */}
    <g className="cap-service-mod-c">
      <CapBox fill="var(--panel)" gx0={-1.8} gx1={0.6} gy0={4.2} gy1={5.8} z1={26} />
      <CapSignal className="cap-service-recv-c" fill={ACCENT} gx={-0.6} gy={5} r={2.4} z={28} />
    </g>
    <g className="cap-service-mod-d">
      <CapBox fill="var(--panel)" gx0={3.4} gx1={5.8} gy0={4.2} gy1={5.8} z1={26} />
      <CapSignal className="cap-service-recv-d" fill={ACCENT} gx={4.6} gy={5} r={2.4} z={28} />
    </g>

    {/* Central service router — tallest volume */}
    <g className="cap-service-router">
      <CapBox fill="var(--paper)" gx0={1.05} gx1={2.95} gy0={1.05} gy1={2.95} z0={12} z1={56} />
      <CapNode className="cap-service-core" gx={2} gy={2} size={0.32} z={56} />
    </g>

    <CapAnno className="cap-anno" gx={-1.7} gy={-0.4} text="FRONT" z={34} />
    <CapAnno className="cap-anno" gx={-1.7} gy={6.8} text="BACK" z={7} />
  </g>
)
