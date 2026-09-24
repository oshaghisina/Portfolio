import React, { type ReactNode } from 'react'
import {
  ACCENT,
  EDGE,
  Ground,
  INK,
  PAPER,
  Solid,
  Wire,
  points,
  project,
} from '../CapabilityIllustrations/objects'
import type { IndustryKey } from './catalogue'

const Base = () => <Solid x={-78} y={-58} w={156} d={116} h={5} tone="muted" />
const Face = ({ x, y, z, children }: { x: number; y: number; z: number; children: ReactNode }) => {
  const [sx, sy] = project(x, y, z)
  return <g transform={`matrix(.866 .5 0 -1 ${sx} ${sy})`}>{children}</g>
}
const Wheel = ({ x, y, z = 18 }: { x: number; y: number; z?: number }) => (
  <Face x={x} y={y} z={z}>
    <circle r="12" fill={INK} stroke={EDGE} />
    <circle r="5" fill="var(--cap-left)" />
    <circle r="2" fill={PAPER} />
  </Face>
)
const Cylinder = ({
  x,
  y,
  z = 5,
  r = 22,
  h = 28,
  accent = false,
}: {
  x: number
  y: number
  z?: number
  r?: number
  h?: number
  accent?: boolean
}) => {
  const [sx, sy] = project(x, y, z)
  const rx = r * 1.225,
    ry = r * 0.707
  return (
    <g stroke={EDGE} strokeWidth=".9">
      <path
        d={`M${sx - rx} ${sy - h} V${sy} a${rx} ${ry} 0 0 0 ${rx * 2} 0 V${sy - h}`}
        fill={accent ? 'var(--cap-accent-right)' : 'var(--cap-right)'}
      />
      <ellipse cx={sx} cy={sy - h} rx={rx} ry={ry} fill={accent ? ACCENT : PAPER} />
    </g>
  )
}

function Finance() {
  return (
    <>
      <Base />
      <Solid x={-54} y={-24} w={52} d={30} h={21} z={5} tone="accent" />
      <Solid x={-42} y={12} w={52} d={30} h={21} z={5} tone="accent" />
      <Solid x={-48} y={-6} w={52} d={30} h={18} z={26} tone="paper" />
      {[5, 12, 19, 26].map((z) => (
        <Cylinder key={z} x={43} y={-16} z={z} r={20} h={6} accent />
      ))}
    </>
  )
}
function Automotive() {
  return (
    <>
      <Base />
      <Wheel x={-38} y={-27} />
      <Wheel x={43} y={-27} />
      <Solid x={-64} y={-27} w={126} d={54} h={20} z={18} />
      <g stroke={EDGE} strokeLinejoin="round">
        <polygon
          fill="var(--cap-left)"
          points={points([
            [-39, -24, 38],
            [-21, -24, 64],
            [20, -24, 64],
            [39, -24, 38],
          ])}
        />
        <polygon
          fill={PAPER}
          points={points([
            [-21, -24, 64],
            [-21, 24, 64],
            [20, 24, 64],
            [20, -24, 64],
          ])}
        />
        <polygon
          fill="var(--cap-dark)"
          points={points([
            [-39, 24, 38],
            [-21, 24, 64],
            [20, 24, 64],
            [39, 24, 38],
          ])}
        />
        <polygon
          fill="var(--cap-glass)"
          points={points([
            [20, -24, 64],
            [20, 24, 64],
            [39, 24, 38],
            [39, -24, 38],
          ])}
        />
      </g>
      <Wheel x={-38} y={28} />
      <Wheel x={43} y={28} />
      <Face x={-4} y={28} z={26}>
        <rect width="25" height="6" fill={ACCENT} />
      </Face>
    </>
  )
}
function Education() {
  return (
    <>
      <Base />
      <Solid x={-56} y={-38} w={116} d={78} h={10} z={5} tone="ink" />
      <Solid x={-59} y={-34} w={116} d={78} h={10} z={15} />
      <Solid x={-54} y={-38} w={108} d={76} h={5} z={25} tone="accent" />
      <g stroke={EDGE} strokeWidth="1.2" strokeLinejoin="round">
        <polygon
          fill={PAPER}
          points={points([
            [-57, -35, 35],
            [-5, -35, 48],
            [0, 38, 35],
            [-55, 38, 43],
          ])}
        />
        <polygon
          fill="var(--cap-left)"
          points={points([
            [-5, -35, 48],
            [54, -35, 55],
            [54, 38, 51],
            [0, 38, 35],
          ])}
        />
        <polyline
          fill="none"
          stroke={ACCENT}
          strokeWidth="3"
          points={points([
            [-5, -35, 49],
            [0, 38, 36],
            [0, 50, 27],
          ])}
        />
      </g>
      {[-16, -2, 12].map((y) => (
        <Wire
          key={y}
          vertices={[
            [-44, y, 43],
            [-18, y, 44],
          ]}
        />
      ))}
    </>
  )
}
function Cloud() {
  return (
    <>
      <Base />
      <Wire
        vertices={[
          [-52, 40, 7],
          [0, 40, 7],
          [0, 15, 7],
          [60, 15, 7],
        ]}
        accent
      />
      {[8, 34, 60].map((z, i) => (
        <React.Fragment key={z}>
          <Solid x={-42} y={-30} w={84} d={58} h={20} z={z} tone={i === 2 ? 'paper' : 'muted'} />
          <Face x={-31} y={29} z={z + 9}>
            <rect width="32" height="3" fill={INK} />
            <circle cx="58" cy="2" r="3" fill={ACCENT} />
          </Face>
        </React.Fragment>
      ))}
      <Solid x={-60} y={34} w={14} d={14} h={6} z={5} tone="accent" />
    </>
  )
}
function Travel() {
  const plane: [number, number, number][] = [
    [0, -76, 42],
    [9, -24, 42],
    [62, 20, 42],
    [58, 34, 42],
    [10, 12, 42],
    [7, 58, 42],
    [27, 71, 42],
    [25, 80, 42],
    [0, 69, 42],
    [-25, 80, 42],
    [-27, 71, 42],
    [-7, 58, 42],
    [-10, 12, 42],
    [-58, 34, 42],
    [-62, 20, 42],
    [-9, -24, 42],
  ]
  return (
    <>
      <path
        d="M91 184 C28 142 125 78 197 88 S347 140 304 185"
        stroke={EDGE}
        strokeDasharray="4 5"
        strokeWidth="1.3"
      />
      <polygon
        points={points(plane.map(([x, y, z]) => [x, y, z - 6]))}
        fill="var(--cap-right)"
        stroke={EDGE}
      />
      <polygon points={points(plane)} fill={PAPER} stroke={EDGE} strokeLinejoin="round" />
      <polygon
        points={points([
          [-7, 40, 43],
          [7, 40, 43],
          [7, 60, 43],
          [0, 69, 43],
          [-7, 60, 43],
        ])}
        fill={ACCENT}
      />
      <Wire
        vertices={[
          [0, -49, 43],
          [0, -9, 43],
        ]}
      />
      <circle cx="305" cy="185" r="4" fill={ACCENT} />
    </>
  )
}
function Retail() {
  return (
    <>
      <Base />
      <Solid x={-50} y={-34} w={90} d={64} h={57} z={5} />
      <Face x={-42} y={31} z={5}>
        <rect width="26" height="42" fill={INK} />
        <rect x="37" y="17" width="34" height="25" fill="var(--cap-left)" stroke={EDGE} />
        <path d="M54 17 V42" stroke={EDGE} />
      </Face>
      <Solid x={-56} y={-40} w={102} d={76} h={7} z={62} tone="ink" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Solid
          key={i}
          x={-56 + i * 17}
          y={24}
          w={17}
          d={20}
          h={5}
          z={55}
          tone={i % 2 ? 'paper' : 'accent'}
        />
      ))}
      <Solid x={43} y={20} w={30} d={28} h={30} z={5} tone="muted">
        <rect x="12" y="0" width="5" height="28" fill={ACCENT} />
      </Solid>
    </>
  )
}
function Media() {
  return (
    <>
      <Base />
      <Solid x={7} y={-41} w={57} d={76} h={7} z={33}>
        <rect x="9" y="12" width="38" height="17" fill="var(--cap-muted)" />
        {[40, 48, 56].map((y) => (
          <rect key={y} x="9" y={y} width="32" height="2" fill={INK} />
        ))}
      </Solid>
      <Face x={-60} y={26} z={24}>
        <rect width="93" height="76" rx="3" fill={INK} stroke={EDGE} />
        <rect x="6" y="10" width="81" height="59" fill={PAPER} />
        <path d="M37 26 L60 40 L37 54 Z" fill={ACCENT} />
        <rect x="36" y="-14" width="22" height="14" fill="var(--cap-right)" />
        <rect x="18" y="-17" width="58" height="4" fill={INK} />
      </Face>
    </>
  )
}
function Telecom() {
  return (
    <>
      <Base />
      <Solid x={-22} y={-20} w={44} d={40} h={14} z={5} tone="ink" />
      <Wire
        vertices={[
          [-17, 0, 19],
          [0, 0, 119],
          [17, 0, 19],
          [-17, 0, 19],
          [12, 0, 51],
          [-8, 0, 76],
          [6, 0, 89],
        ]}
      />
      <g fill="none" stroke={EDGE} strokeWidth="3" strokeLinecap="round">
        <path d="M174 18 Q152 36 174 57 M160 5 Q125 36 160 73 M226 18 Q248 36 226 57 M240 5 Q275 36 240 73" />
      </g>
      <circle cx="200" cy="31" r="7" fill={ACCENT} />
    </>
  )
}
function Gaming() {
  const [x, y] = project(-66, -40, 40)
  const shape =
    'M24 3 H108 Q119 3 124 19 L142 68 Q148 91 129 93 Q120 93 105 71 H28 Q9 98 -3 90 Q-13 85 -8 66 L8 19 Q12 3 24 3 Z'
  return (
    <>
      <Base />
      <g transform={`matrix(.866 .5 -.866 .5 ${x} ${y + 7})`}>
        <path d={shape} fill={INK} stroke={EDGE} strokeWidth="2" />
      </g>
      <g transform={`matrix(.866 .5 -.866 .5 ${x} ${y})`}>
        <path d={shape} fill={PAPER} stroke={EDGE} strokeWidth="2" />
        <path d="M24 25 H36 V37 H48 V49 H36 V61 H24 V49 H12 V37 H24Z" fill={INK} />
        <circle cx="104" cy="29" r="7" fill={ACCENT} />
        <circle cx="118" cy="43" r="7" fill={INK} />
        <circle cx="90" cy="43" r="7" fill={INK} />
        <circle cx="104" cy="57" r="7" fill={ACCENT} />
        <rect x="59" y="34" width="15" height="5" rx="2" fill="var(--cap-muted)" />
      </g>
    </>
  )
}
function RealEstate() {
  return (
    <>
      <Base />
      <Solid x={-46} y={-34} w={86} d={66} h={58} z={5} />
      <g stroke={EDGE} strokeLinejoin="round">
        <polygon
          fill="var(--cap-accent-right)"
          points={points([
            [-55, 39, 63],
            [-3, 39, 104],
            [49, 39, 63],
          ])}
        />
        <polygon
          fill={ACCENT}
          points={points([
            [-55, -41, 63],
            [-3, -41, 104],
            [-3, 39, 104],
            [-55, 39, 63],
          ])}
        />
        <polygon
          fill="var(--cap-accent-left)"
          points={points([
            [-3, -41, 104],
            [49, -41, 63],
            [49, 39, 63],
            [-3, 39, 104],
          ])}
        />
      </g>
      <Face x={-32} y={33} z={5}>
        <rect width="23" height="36" fill={INK} />
        <rect x="39" y="21" width="21" height="23" fill={PAPER} stroke={EDGE} />
      </Face>
      <Solid x={45} y={14} w={26} d={24} h={17} z={5} tone="muted" />
      <Solid x={50} y={19} w={19} d={19} h={12} z={22} />
    </>
  )
}
function Energy() {
  return (
    <>
      <Base />
      <Wire
        vertices={[
          [0, 0, 12],
          [52, 0, 12],
          [52, 38, 12],
          [72, 38, 12],
        ]}
        accent
      />
      <Cylinder x={-12} y={-7} r={33} h={75} />
      <Cylinder x={-12} y={-7} z={35} r={34} h={20} accent />
      <ellipse cx={195.67} cy={project(-12, -7, 80)[1]} rx="29" ry="16" fill="none" stroke={EDGE} />
      <Solid x={44} y={29} w={17} d={18} h={13} z={5} tone="ink" />
      <Wire
        vertices={[
          [52, 37, 18],
          [52, 37, 35],
        ]}
      />
      <Wire
        vertices={[
          [40, 37, 35],
          [64, 37, 35],
        ]}
        accent
      />
    </>
  )
}
function Logistics() {
  return (
    <>
      <Base />
      <Wheel x={-39} y={-30} />
      <Wheel x={49} y={-30} />
      <Solid x={-59} y={-30} w={79} d={60} h={58} z={18} />
      <Solid x={20} y={-30} w={45} d={60} h={37} z={18} tone="accent" />
      <Face x={28} y={31} z={35}>
        <rect width="28" height="15" fill={INK} />
        <rect x="-77" y="11" width="31" height="4" fill="var(--cap-muted)" />
        <rect x="-77" y="0" width="22" height="4" fill="var(--cap-muted)" />
      </Face>
      <Wheel x={-39} y={31} />
      <Wheel x={49} y={31} />
    </>
  )
}
function AfterSales() {
  return (
    <>
      <Base />
      <g transform="translate(225 106)">
        <path
          d="M0-62 L48-43 V0 Q48 38 0 62 Q-48 38-48 0 V-43Z"
          fill="var(--cap-right)"
          stroke={EDGE}
        />
        <path d="M-5-66 L40-47 V-4 Q40 31-5 55 Q-50 31-50-4 V-47Z" fill={PAPER} stroke={EDGE} />
        <path
          d="M-26-4 L-10 12 L18-19"
          fill="none"
          stroke={ACCENT}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(142 146) rotate(-27)">
        <path
          d="M-9 37 V-9 Q-27-25-14-42 L-9-23 H9 L14-42 Q27-25 9-9 V37 Q0 46-9 37Z"
          fill={INK}
          stroke={EDGE}
        />
        <circle cy="31" r="3" fill={PAPER} />
      </g>
    </>
  )
}
function Networking() {
  const people = [
    { x: 0, y: -39 },
    { x: -45, y: 32 },
    { x: 45, y: 32 },
  ]
  return (
    <>
      <Base />
      <Wire
        vertices={[
          [0, -39, 7],
          [-45, 32, 7],
          [45, 32, 7],
          [0, -39, 7],
        ]}
        accent
      />
      {people.map(({ x, y }, i) => {
        const [sx, sy] = project(x, y, 37)
        return (
          <g key={i}>
            <Cylinder x={x} y={y} r={15} h={20} accent={i === 0} />
            <path
              d={`M${sx - 16} ${sy + 7} Q${sx - 16} ${sy - 10} ${sx} ${sy - 10} Q${sx + 16} ${sy - 10} ${sx + 16} ${sy + 7}Z`}
              fill={i === 0 ? ACCENT : INK}
              stroke={EDGE}
            />
            <circle cx={sx} cy={sy - 22} r="10" fill={i === 0 ? ACCENT : PAPER} stroke={EDGE} />
          </g>
        )
      })}
    </>
  )
}
function Consulting() {
  return (
    <>
      <Base />
      {[-62, 48].map((x) => (
        <Solid key={x} x={x} y={-2} w={25} d={32} h={26} z={5} tone="ink" />
      ))}
      <Solid x={-25} y={-19} w={50} d={38} h={29} z={5} tone="muted" />
      <Solid x={-53} y={-32} w={106} d={64} h={8} z={34}>
        <rect x="23" y="14" width="57" height="35" fill={PAPER} stroke={EDGE} />
        {[12, 21, 29].map((h, i) => (
          <rect
            key={h}
            x={32 + i * 12}
            y={43 - h}
            width="7"
            height={h}
            fill={i === 2 ? ACCENT : INK}
          />
        ))}
      </Solid>
      <Face x={-10} y={-28} z={68}>
        <path d="M0 0 V39 H53 V0 H24 L13-10 V0Z" fill={PAPER} stroke={EDGE} />
        <path d="M11 26 H41 M11 15 H31" stroke={ACCENT} strokeWidth="3" />
      </Face>
    </>
  )
}

const scenes: Record<IndustryKey, React.FC> = {
  finance: Finance,
  automotive: Automotive,
  education: Education,
  cloud: Cloud,
  travel: Travel,
  retail: Retail,
  media: Media,
  telecom: Telecom,
  gaming: Gaming,
  'real-estate': RealEstate,
  energy: Energy,
  logistics: Logistics,
  'after-sales': AfterSales,
  networking: Networking,
  consulting: Consulting,
}

/** Static, opaque miniatures use the capability palette without starting any animation loops. */
export function IndustryIllustration({ industry }: { industry: IndustryKey }) {
  const Scene = scenes[industry]
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="industry-illustration cap-illustration"
      viewBox="0 0 400 280"
      fill="none"
    >
      <Ground />
      <Scene />
    </svg>
  )
}
