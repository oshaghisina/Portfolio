import React from 'react'

import { ACCENT, EDGE, Ground, INK, motion, PAPER, project, Solid, Wire } from '../objects'

const stops = [-69, -1, 67]

/** One customer journey, visibly supported by the people and processes below it. */
export const ServiceScene: React.FC = () => (
  <g>
    <Ground wide />
    <g className="cap-scene">
      <g transform="translate(0 12)">
        <Solid d={66} h={8} tone="muted" w={202} x={-102} y={-30} z={0} />
        <Wire
          vertices={[
            [-83, 5, 10],
            [82, 5, 10],
          ]}
        />
        {stops.map((x, i) => (
          <g key={x}>
            <Solid d={34} h={23} tone="ink" w={38} x={x - 19} y={-12} z={8}>
              <g fill="none" stroke={PAPER} strokeLinecap="round" strokeWidth="2">
                {i === 0 ? <path d="M10 11h18M10 17h12M10 23h15" /> : null}
                {i === 1 ? (
                  <>
                    <circle cx="19" cy="17" r="7" />
                    <path d="m16 17 2 2 4-5" />
                  </>
                ) : null}
                {i === 2 ? (
                  <>
                    <path d="M10 23v-7M19 23V9M28 23V13" />
                    <path d="M8 26h22" />
                  </>
                ) : null}
              </g>
            </Solid>
            <Wire
              vertices={[
                [x, 5, 32],
                [x, 5, 90],
              ]}
            />
            <Wire
              accent
              className="cap-anim cap-packet"
              style={motion('cap-service-drop', { '--cap-delay': `${i * -0.45}s` })}
              vertices={[
                [x, 5, 90],
                [x, 5, 32],
              ]}
            />
          </g>
        ))}
        <g className="cap-anim" style={motion('cap-service-deck')}>
          <Solid d={66} h={7} w={202} x={-102} y={-30} z={82}>
            <path d="M26 35H175" fill="none" stroke={EDGE} strokeLinecap="round" strokeWidth="10" />
            <path d="M26 35H175" fill="none" stroke={PAPER} strokeWidth="7" />
            <path
              d="M26 35H175"
              fill="none"
              pathLength="1"
              stroke={ACCENT}
              strokeLinecap="round"
              strokeWidth="3"
            />
            <path
              d="m166 29 8 6-8 6"
              fill="none"
              stroke={ACCENT}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            {stops.map((x) => (
              <circle
                cx={x + 102}
                cy="35"
                fill={PAPER}
                key={x}
                r="10"
                stroke={INK}
                strokeWidth="1.5"
              />
            ))}
          </Solid>
          {stops.map((x, i) => {
            const [sx, sy] = project(x, 5, 90)
            return (
              <g key={x} transform={`translate(${sx} ${sy})`}>
                <g
                  className="cap-anim"
                  style={motion('cap-touchpoint', { '--cap-delay': `${i * -0.5}s` })}
                >
                  {i === 0 ? (
                    <g stroke={INK} strokeWidth="1.7">
                      <rect fill={PAPER} height="30" rx="3" width="18" x="-9" y="-31" />
                      <path d="M-4-26h8M-3-6h6" />
                      <path d="m-3-17 2 2 4-5" fill="none" stroke={ACCENT} />
                    </g>
                  ) : i === 1 ? (
                    <g fill={ACCENT} stroke={ACCENT} strokeWidth="1.7">
                      <path d="M-9-2v-6a9 9 0 0 1 18 0v6" />
                      <circle cy="-24" r="6" />
                    </g>
                  ) : (
                    <g stroke={INK} strokeLinejoin="round" strokeWidth="1.7">
                      <path d="M-12-28h24v19H1l-7 6v-6h-6z" fill={PAPER} />
                      <path d="M-6-21H6M-6-16h8" />
                    </g>
                  )}
                </g>
              </g>
            )
          })}
          <Wire
            accent
            className="cap-anim cap-packet"
            style={motion('cap-journey')}
            vertices={[
              [-69, 5, 91],
              [67, 5, 91],
            ]}
          />
        </g>
        <path
          d="M72 127v35l20 12M321 103v35l-12 7"
          fill="none"
          stroke={EDGE}
          strokeDasharray="2 4"
        />
      </g>
    </g>
  </g>
)
