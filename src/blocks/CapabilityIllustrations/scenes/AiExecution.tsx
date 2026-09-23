import React from 'react'

import { ACCENT, DocumentLines, EDGE, Ground, INK, motion, PAPER, Solid, Wire } from '../objects'

/** A brief feeds a processor; deliberate orchestration produces a usable interface. */
export const AiExecutionScene: React.FC = () => (
  <g>
    <Ground wide />
    <g className="cap-scene">
      <path
        d="M104 155h36l33-19M229 135h24l30-26M223 156h36l23 13"
        fill="none"
        stroke={EDGE}
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="cap-anim cap-packet"
        d="M104 155h36l33-19"
        fill="none"
        pathLength="1"
        stroke={ACCENT}
        strokeWidth="3"
        style={motion('cap-ai-feed')}
      />
      <path
        className="cap-anim cap-packet"
        d="M229 135h24l30-26"
        fill="none"
        pathLength="1"
        stroke={ACCENT}
        strokeWidth="3"
        style={motion('cap-ai-build')}
      />
      <path
        className="cap-anim cap-packet"
        d="M223 156h36l23 13"
        fill="none"
        pathLength="1"
        stroke={ACCENT}
        strokeWidth="3"
        style={motion('cap-ai-build', { '--cap-delay': '-.2s' })}
      />
      <g transform="translate(54 87) skewY(14)">
        <g className="cap-anim" style={motion('cap-brief')}>
          <rect
            fill="var(--cap-right)"
            height="90"
            rx="3"
            stroke={EDGE}
            width="66"
            x="-10"
            y="12"
          />
          <rect fill="var(--cap-left)" height="90" rx="3" stroke={EDGE} width="66" x="-5" y="6" />
          <rect fill={PAPER} height="90" rx="3" stroke={EDGE} width="66" />
          <DocumentLines width={42} />
          <rect fill={ACCENT} height="5" rx="1" width="18" x="12" y="69" />
        </g>
      </g>
      <g>
        {[-21, -7, 7, 21].map((v) => (
          <React.Fragment key={v}>
            <Wire
              vertices={[
                [-41, v, 15],
                [-29, v, 15],
              ]}
            />
            <Wire
              vertices={[
                [29, v, 15],
                [41, v, 15],
              ]}
            />
            <Wire
              vertices={[
                [v, -41, 15],
                [v, -29, 15],
              ]}
            />
            <Wire
              vertices={[
                [v, 29, 15],
                [v, 41, 15],
              ]}
            />
          </React.Fragment>
        ))}
        <Solid d={62} h={12} tone="ink" w={62} x={-31} y={-31} z={12} />
        <g className="cap-anim" style={motion('cap-processor')}>
          <Solid d={43} h={8} tone="accent" w={43} x={-21.5} y={-21.5} z={25}>
            <text
              fill="var(--cap-highlight)"
              fontFamily="var(--font-mono)"
              fontSize="18"
              fontWeight="600"
              textAnchor="middle"
              x="21.5"
              y="28"
            >
              AI
            </text>
          </Solid>
        </g>
      </g>
      <g transform="translate(275 69) skewY(-14)">
        <g className="cap-anim" style={motion('cap-output')}>
          <path
            d="m0 0 7 5v126l-7-5zM0 126l7 5h83l-7-5z"
            fill="var(--cap-right)"
            stroke={EDGE}
            strokeLinejoin="round"
          />
          <rect fill={PAPER} height="126" rx="3" stroke={INK} strokeWidth="1.2" width="83" />
          <path d="M0 18h83" stroke={EDGE} />
          {[9, 16, 23].map((x) => (
            <circle cx={x} cy="9" fill={x === 9 ? ACCENT : EDGE} key={x} r="1.6" />
          ))}
          <rect fill={INK} height="5" rx="1" width="43" x="10" y="29" />
          <rect fill="var(--cap-muted)" height="2.5" rx="1" width="57" x="10" y="40" />
          <g className="cap-anim" style={motion('cap-output-content')}>
            <rect fill="var(--cap-left)" height="41" rx="2" width="63" x="10" y="54" />
            <path
              d="M18 85l12-11 10 5 13-17 11 5"
              fill="none"
              stroke={ACCENT}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            <rect fill={ACCENT} height="10" rx="2" width="27" x="10" y="104" />
            <path d="M47 108h23M47 113h16" stroke={EDGE} strokeWidth="2" />
          </g>
        </g>
        <g className="cap-anim" style={motion('cap-approved')}>
          <circle cx="76" cy="-1" fill={ACCENT} r="12" stroke={PAPER} strokeWidth="3" />
          <path
            d="m71-1 3 3 6-7"
            fill="none"
            stroke="var(--cap-highlight)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
      </g>
    </g>
  </g>
)
