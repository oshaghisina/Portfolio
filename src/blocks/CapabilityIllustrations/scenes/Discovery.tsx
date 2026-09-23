import React from 'react'

import { ACCENT, DocumentLines, EDGE, Ground, INK, motion, PAPER, Solid } from '../objects'

/** Evidence separates; the lens searches, locks on, and reveals the actual problem. */
export const DiscoveryScene: React.FC = () => (
  <g>
    <Ground />
    <g className="cap-scene">
      <g className="cap-anim" style={motion('cap-evidence-back')}>
        <Solid d={112} h={4} tone="muted" w={136} x={-74} y={-49} z={5} />
      </g>
      <g className="cap-anim" style={motion('cap-evidence-mid')}>
        <Solid d={112} h={4} w={136} x={-78} y={-53} z={15} />
      </g>
      <Solid d={112} h={5} w={136} x={-82} y={-57} z={27}>
        <DocumentLines width={44} />
        <path d="M12 79H55M12 87H45" stroke={EDGE} strokeWidth="2.5" />
        <rect fill="var(--cap-left)" height="26" rx="2" width="25" x="88" y="72" />
        <path d="m94 90 5-6 5 3 4-8" fill="none" stroke={INK} strokeWidth="2" />
        <circle cx="100" cy="26" fill="none" r="9" stroke={EDGE} strokeWidth="2" />
        <path d="M94 26h12M100 20v12" stroke={EDGE} strokeWidth="1.5" />
      </Solid>
      <g className="cap-anim" style={motion('cap-insight')}>
        <Solid d={31} h={17} tone="accent" w={31} x={-8} y={-30} z={36}>
          <path
            d="M10 16h11M15.5 10.5v11"
            stroke="var(--cap-highlight)"
            strokeLinecap="round"
            strokeWidth="2.3"
          />
        </Solid>
      </g>
      <g className="cap-anim" style={motion('cap-lens')}>
        <path
          d="m174 147-44 44"
          stroke="var(--cap-dark-right)"
          strokeLinecap="round"
          strokeWidth="19"
        />
        <path d="m174 140-44 44" stroke={INK} strokeLinecap="round" strokeWidth="16" />
        <path d="m145 171-13 13" stroke={ACCENT} strokeLinecap="round" strokeWidth="16" />
        <ellipse
          cx="220"
          cy="113"
          fill="none"
          rx="60"
          ry="42"
          stroke="var(--cap-dark-right)"
          strokeWidth="12"
        />
        <ellipse
          cx="220"
          cy="106"
          fill="var(--cap-glass)"
          rx="60"
          ry="42"
          stroke={INK}
          strokeWidth="10"
        />
        <ellipse
          cx="220"
          cy="104"
          fill="none"
          rx="59"
          ry="41"
          stroke="var(--cap-lens-edge)"
          strokeWidth="1.2"
        />
        <path
          d="M176 101c3-12 16-23 32-26"
          fill="none"
          stroke={PAPER}
          strokeLinecap="round"
          strokeWidth="3"
        />
        <g
          className="cap-anim"
          fill="none"
          stroke={ACCENT}
          strokeWidth="1.8"
          style={motion('cap-focus')}
        >
          <path d="M202 93v-6h8M230 87h8v6M238 115v6h-8M210 121h-8v-6" />
        </g>
      </g>
      <g className="cap-anim" style={motion('cap-insight-mark')}>
        <path
          d="M298 61v-9M312 70l7-5M303 87h10"
          stroke={ACCENT}
          strokeLinecap="round"
          strokeWidth="2"
        />
      </g>
    </g>
  </g>
)
