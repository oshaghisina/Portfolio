import React from 'react'

import { ACCENT, EDGE, Ground, INK, motion, PAPER, points, Solid } from '../objects'

const modules = [
  [0, 0],
  [1, 0],
  [0, 1],
  [2, 0],
  [0, 2],
  [1, 1],
  [2, 1],
  [1, 2],
  [2, 2],
] as const

function ModuleMark({ kind, accent }: { kind: number; accent: boolean }) {
  if (accent)
    return (
      <path
        d="M14 23h18M23 14v18"
        stroke="var(--cap-highlight)"
        strokeLinecap="round"
        strokeWidth="3"
      />
    )
  if (kind % 3 === 0)
    return (
      <g fill="none" stroke={INK} strokeWidth="2">
        <rect height="20" rx="2" width="25" x="10" y="12" />
        <path d="M10 18h25M18 18v14" />
      </g>
    )
  if (kind % 3 === 1)
    return (
      <g fill={INK}>
        <rect height="5" rx="2.5" width="26" x="10" y="12" />
        <rect height="4" rx="2" width="18" x="10" y="22" opacity=".55" />
        <rect height="4" rx="2" width="22" x="10" y="30" opacity=".3" />
      </g>
    )
  return (
    <g fill="none" stroke={INK} strokeWidth="2">
      <rect height="12" rx="6" width="27" x="10" y="17" />
      <circle cx="29" cy="23" fill={INK} r="3" />
    </g>
  )
}

/** Individual components expand, then snap into one shared product language. */
export const SystemsScene: React.FC = () => (
  <g>
    <Ground />
    <g className="cap-scene">
      <polygon
        fill="none"
        points={points([
          [-91, -91],
          [91, -91],
          [91, 91],
          [-91, 91],
        ])}
        stroke={EDGE}
        strokeDasharray="3 5"
      />
      <Solid d={166} h={7} tone="ink" w={166} x={-83} y={-83} z={2}>
        <path d="M55 0v166M111 0v166M0 55h166M0 111h166" stroke={PAPER} strokeOpacity=".2" />
      </Solid>
      {modules.map(([col, row], i) => {
        const core = col === 1 && row === 1
        return (
          <g
            className="cap-anim"
            key={`${col}-${row}`}
            style={motion(core ? 'cap-system-core' : 'cap-module', {
              '--cap-dx': `${(col - row) * 12}px`,
              '--cap-dy': `${(col + row - 2) * 6 - 13}px`,
              '--cap-delay': `${-(col + row) * 0.045}s`,
            })}
          >
            <Solid
              d={46}
              h={core ? 36 : 20}
              tone={core ? 'accent' : 'paper'}
              w={46}
              x={-79 + col * 56}
              y={-79 + row * 56}
              z={10}
            >
              <ModuleMark accent={core} kind={i} />
            </Solid>
          </g>
        )
      })}
      <g
        className="cap-anim"
        fill="none"
        stroke={ACCENT}
        strokeLinecap="round"
        strokeWidth="2"
        style={motion('cap-system-lock')}
      >
        <path d="m52 135 6 4 8-5M332 135l6 4 8-5M192 246l8 5 8-5" />
      </g>
    </g>
  </g>
)
