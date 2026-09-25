import React, { type CSSProperties, type ReactNode } from 'react'
import { ACCENT, EDGE, INK, PAPER, Solid } from '@/blocks/CapabilityIllustrations/objects'
import { cn } from '@/utilities/ui'

export type TrackKey = 'productDesign' | 'aiWorkflow' | 'designSystems'
const Stage = ({ x, children }: { x: number; children: ReactNode }) => (
  <g transform={`translate(${x - 200} 65)`}>{children}</g>
)
const Move = ({
  children,
  kind = 'lift',
  delay = 0,
}: {
  children: ReactNode
  kind?: string
  delay?: number
}) => (
  <g className={`exp-anim exp-${kind}`} style={{ '--exp-delay': `${delay}s` } as CSSProperties}>
    {children}
  </g>
)

function Page({
  x = -56,
  y = -54,
  z = 18,
  w = 112,
  d = 124,
  type = 'document',
}: {
  x?: number
  y?: number
  z?: number
  w?: number
  d?: number
  type?: 'document' | 'screen' | 'components'
}) {
  return (
    <Solid x={x} y={y} z={z} w={w} d={d} h={7}>
      <rect x="9" y="10" width={w - 18} height="9" rx="2" fill={INK} />
      {type === 'document' ? (
        <>
          {[34, 47, 60, 73].map((line, i) => (
            <rect
              key={line}
              x="12"
              y={line}
              width={w - 27 - (i % 2) * 15}
              height="3"
              fill="var(--cap-muted)"
            />
          ))}
          <circle cx="24" cy={d - 23} r="8" fill={ACCENT} />
          <path d={`M39 ${d - 23}h${w - 53}`} stroke={EDGE} strokeWidth="4" />
        </>
      ) : type === 'components' ? (
        <>
          <rect x="11" y="31" width={w - 22} height="19" rx="5" fill={ACCENT} />
          <path d={`M25 40h${w - 50}`} stroke={PAPER} strokeWidth="3" />
          <rect
            x="11"
            y="61"
            width={w - 22}
            height="18"
            rx="3"
            fill="none"
            stroke={EDGE}
            strokeWidth="2"
          />
          <rect x="11" y="91" width="26" height="20" rx="3" fill="var(--cap-left)" />
          <path d={`M47 94h${w - 61}m-${w - 61} 9h${w - 71}`} stroke={INK} strokeWidth="3" />
        </>
      ) : (
        <>
          <rect x="10" y="30" width={w - 20} height={d * 0.33} rx="2" fill="var(--cap-left)" />
          <path d={`M17 43h${w * 0.4}m-${w * 0.4} 12h${w * 0.28}`} stroke={INK} strokeWidth="4" />
          <path
            d={`M12 ${d - 35}h${w - 24}m-${w - 24} 9h${w * 0.45}`}
            stroke={EDGE}
            strokeWidth="3"
          />
          <rect x="12" y={d - 18} width={w - 24} height="9" rx="3" fill={ACCENT} />
        </>
      )}
    </Solid>
  )
}

const Flow = ({ returnPath = false, rtl = false }: { returnPath?: boolean; rtl?: boolean }) => (
  <g
    transform={rtl ? 'translate(640 0) scale(-1 1)' : undefined}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {['M184 216C210 216 219 194 242 194', 'M393 194C418 194 425 216 451 216'].map((d, i) => (
      <g key={d}>
        <path d={d} stroke={EDGE} strokeWidth="1.8" />
        <path
          d={d}
          pathLength="1"
          className="exp-anim exp-signal"
          stroke={ACCENT}
          strokeWidth="4"
          style={{ '--exp-delay': `${i * 1.1}s` } as CSSProperties}
        />
      </g>
    ))}
    <path d="m235 189 7 5-7 5m209 12 7 5-7 5" stroke={ACCENT} strokeWidth="2" />
    {returnPath ? (
      <>
        <path
          d="M527 298C527 339 320 352 113 302"
          stroke={EDGE}
          strokeDasharray="3 7"
          strokeWidth="1.2"
        />
        <path
          d="M527 298C527 339 320 352 113 302"
          className="exp-anim exp-signal"
          pathLength="1"
          stroke={ACCENT}
          strokeWidth="2.4"
          style={{ '--exp-delay': '1.8s' } as CSSProperties}
        />
        <path d="m119 296-7 6 5 8" stroke={ACCENT} strokeWidth="2" />
      </>
    ) : null}
  </g>
)

function Research() {
  return (
    <>
      <Solid x={-62} y={-53} w={114} d={123} h={5} tone="muted" />
      <Move kind="slide">
        <Page x={-57} y={-56} z={19} />
      </Move>
      <path d="m189 132-44 38" stroke={INK} strokeWidth="14" strokeLinecap="round" />
      <ellipse
        cx="218"
        cy="104"
        rx="39"
        ry="28"
        fill="var(--cap-glass)"
        stroke={INK}
        strokeWidth="8"
      />
      <circle cx="218" cy="104" r="7" fill={ACCENT} />
    </>
  )
}
function Decisions() {
  return (
    <>
      <Solid x={-61} y={-47} w={124} d={104} h={8} tone="muted" />
      <Solid x={-31} y={-54} w={62} d={36} z={20} h={7}>
        <path d="M12 12h35m-35 10h24" stroke={INK} strokeWidth="3" />
      </Solid>
      <path d="M199 129v29m0 0-37 21m37-21 39 21" fill="none" stroke={EDGE} strokeWidth="2.4" />
      <Solid x={-56} y={18} w={39} d={35} h={10} z={12} tone="paper" />
      <Move kind="choose">
        <Solid x={24} y={18} w={39} d={35} h={10} z={12} tone="accent">
          <path d="m11 17 6 6 13-14" stroke={PAPER} strokeWidth="3" fill="none" />
        </Solid>
      </Move>
    </>
  )
}
function Screens() {
  return (
    <>
      <Page x={-65} y={-66} w={120} d={130} z={21} type="screen" />
      <Move kind="layer" delay={0.45}>
        <Page x={45} y={-2} w={43} d={78} z={41} type="screen" />
      </Move>
    </>
  )
}
function Agents() {
  return (
    <>
      <path d="M177 176 200 145 230 176M200 145V102" stroke={EDGE} strokeWidth="2" fill="none" />
      {[
        [-56, 6],
        [14, 6],
        [-20, -66],
      ].map(([x, y], i) => (
        <Move key={i} delay={i * 0.3}>
          <Solid x={x} y={y} w={44} d={44} h={23} z={14} tone={i === 2 ? 'accent' : 'ink'}>
            <rect
              x="11"
              y="11"
              width="22"
              height="22"
              rx="2"
              fill="none"
              stroke={PAPER}
              strokeWidth="2"
            />
            <path
              d="M16 4v7m12-7v7m-12 22v7m12-7v7M4 16h7m-7 12h7m22-12h7m-7 12h7"
              stroke={PAPER}
              strokeWidth="1.5"
            />
          </Solid>
        </Move>
      ))}
    </>
  )
}
function HumanReview() {
  return (
    <>
      <Page x={-61} y={-52} w={107} d={118} type="screen" />
      <g transform="translate(261 157)">
        <ellipse cx="0" cy="29" rx="21" ry="10" fill="var(--cap-left)" />
        <path
          d="M-18 24v-10a18 18 0 0 1 36 0v10q-18 12-36 0Z"
          fill={PAPER}
          stroke={EDGE}
          strokeWidth="1.5"
        />
        <circle cy="-17" r="14" fill={INK} />
      </g>
      <Move kind="choose">
        <Solid x={-20} y={-35} w={40} d={40} h={9} z={42} tone="accent">
          <path d="m9 19 7 7 15-17" fill="none" stroke={PAPER} strokeWidth="3" />
        </Solid>
      </Move>
    </>
  )
}
function Tokens() {
  return (
    <>
      <Solid x={-57} y={-54} w={114} d={119} h={9}>
        {[0, 1, 2].map((i) => (
          <circle
            cx={24 + i * 32}
            cy="26"
            r="11"
            fill={i === 0 ? ACCENT : i === 1 ? INK : 'var(--cap-muted)'}
            key={i}
          />
        ))}
        <path d="M14 59h61m-61 15h85m-85 12h47" stroke={INK} strokeWidth="5" />
        <path d="M14 104h85m-85-5v10m22-10v10m28-10v10m35-10v10" stroke={EDGE} strokeWidth="2" />
      </Solid>
      <Move kind="lift">
        <Solid x={-44} y={-44} w={23} d={23} z={22} h={8} tone="accent" />
      </Move>
    </>
  )
}
function Components() {
  return (
    <>
      <Solid x={-65} y={-57} w={114} d={130} h={6} tone="muted" />
      <Move kind="layer">
        <Page x={-57} y={-63} z={27} w={114} d={130} type="components" />
      </Move>
    </>
  )
}

const place = (x: number, rtl: boolean) => (rtl ? 640 - x : x)
const scenes: Record<TrackKey, React.FC<{ rtl: boolean }>> = {
  productDesign: ({ rtl }) => (
    <>
      <Flow returnPath rtl={rtl} />
      <Stage x={place(110, rtl)}>
        <Research />
      </Stage>
      <Stage x={place(320, rtl)}>
        <Decisions />
      </Stage>
      <Stage x={place(527, rtl)}>
        <Screens />
      </Stage>
    </>
  ),
  aiWorkflow: ({ rtl }) => (
    <>
      <Flow returnPath rtl={rtl} />
      <Stage x={place(110, rtl)}>
        <Solid x={-67} y={-50} w={112} d={124} h={6} tone="muted" />
        <Move kind="slide">
          <Page />
        </Move>
      </Stage>
      <Stage x={place(320, rtl)}>
        <Agents />
      </Stage>
      <Stage x={place(527, rtl)}>
        <HumanReview />
      </Stage>
    </>
  ),
  designSystems: ({ rtl }) => (
    <>
      <Flow rtl={rtl} />
      <Stage x={place(110, rtl)}>
        <Tokens />
      </Stage>
      <Stage x={place(320, rtl)}>
        <Components />
      </Stage>
      <Stage x={place(527, rtl)}>
        <Screens />
      </Stage>
    </>
  ),
}

export const TrackIllustration: React.FC<{
  className?: string
  trackKey: TrackKey
  rtl?: boolean
}> = ({ className, trackKey, rtl = false }) => {
  const Scene = scenes[trackKey]
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={cn('cap-illustration tracks-story-art', className)}
      data-track-art={trackKey}
      fill="none"
      style={{ direction: 'ltr' }}
      viewBox="0 0 640 400"
    >
      <g fill="var(--cap-shadow)">
        {[110, 320, 527].map((x) => (
          <ellipse key={x} cx={x} cy="308" rx="84" ry="13" />
        ))}
      </g>
      <Scene rtl={rtl} />
    </svg>
  )
}
