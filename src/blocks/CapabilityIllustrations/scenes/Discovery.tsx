import React from 'react'

import {
  ACCENT,
  CapAnno,
  CapBox,
  CapDotField,
  CapFrame,
  CapNode,
  CapPlate,
  CapRegistration,
  CapSignal,
  STROKE,
  STROKE_INK,
  STROKE_WIDTH,
  project,
} from '../spatial'

/**
 * Product Discovery — layered diagnostic environment.
 * Resolved: frames aligned, peripheral signals dim, orange root raised.
 * Motion: signals → scan → recede → align → root activates.
 */
export const DiscoveryScene: React.FC = () => {
  return (
    <g>
      <CapRegistration />
      <CapPlate />
      <CapDotField step={2} />

      {/* Scattered evidence — bright mid-cycle, dim when resolved */}
      <g className="cap-discovery-signals">
        <CapSignal gx={-1.8} gy={0.4} z={12} />
        <CapSignal gx={5.2} gy={-1.2} z={18} />
        <CapSignal gx={-0.6} gy={5.4} z={10} />
        <CapSignal gx={6} gy={4.2} z={14} />
        <CapSignal gx={1.2} gy={-2.2} z={8} />
        <CapSignal gx={4.8} gy={6} z={16} />
      </g>

      {/* Nested problem frames — start offset, settle aligned */}
      <g className="cap-discovery-frame-outer">
        <CapFrame fillOpacity={0.14} gx0={-1.8} gx1={5.8} gy0={-1.8} gy1={5.8} stroke={STROKE} z={36} />
      </g>
      <g className="cap-discovery-frame-mid">
        <CapFrame fillOpacity={0.2} gx0={-0.6} gx1={4.6} gy0={-0.6} gy1={4.6} stroke={STROKE_INK} z={52} />
      </g>
      <g className="cap-discovery-frame-inner">
        <CapFrame fillOpacity={0.28} gx0={0.6} gx1={3.4} gy0={0.6} gy1={3.4} stroke={STROKE_INK} z={68} />
      </g>

      {/* Scanning plane — invisible at rest */}
      <g className="cap-discovery-scan">
        <CapFrame fillOpacity={0.08} gx0={-1.8} gx1={5.8} gy0={-1.8} gy1={5.8} stroke={ACCENT} z={78} />
        <line
          stroke={ACCENT}
          strokeWidth={1.6}
          x1={project(-1.8, 2, 78)[0]}
          x2={project(5.8, 2, 78)[0]}
          y1={project(-1.8, 2, 78)[1]}
          y2={project(5.8, 2, 78)[1]}
        />
      </g>

      {/* Central raised target / root */}
      <g className="cap-discovery-root">
        <CapBox fill="var(--paper)" gx0={1.35} gx1={2.65} gy0={1.35} gy1={2.65} z0={68} z1={92} />
        <CapNode gx={2} gy={2} size={0.32} z={92} />
        <CapAnno align="middle" gx={2} gy={3.5} text="ROOT" z={92} />
      </g>

      {/* Construction guides */}
      <g className="cap-anno" fill="none" stroke={STROKE} strokeDasharray="2 5" strokeWidth={STROKE_WIDTH}>
        <path
          d={`M${project(2, 2, 92)[0]} ${project(2, 2, 92)[1]} L${project(2, 2, 36)[0]} ${project(2, 2, 36)[1]}`}
        />
      </g>
    </g>
  )
}
