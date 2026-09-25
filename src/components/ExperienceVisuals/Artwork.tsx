import React, { type CSSProperties, type ReactNode } from 'react'
import type { SkillGroupKey, SkillKey } from '@/blocks/CapabilityIcons/keys'
import {
  ACCENT,
  EDGE,
  Ground,
  INK,
  PAPER,
  Solid,
  Wire,
  project,
} from '@/blocks/CapabilityIllustrations/objects'
import type { DisciplineKey } from './copy'

/** Large silhouettes and opaque faces survive the 64px matrix size. Detail stays on the top face. */
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

const Check = ({ x = 0, y = 0, size = 1 }: { x?: number; y?: number; size?: number }) => (
  <path
    d="m0 7 6 6L20 0"
    fill="none"
    stroke={PAPER}
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    transform={`translate(${x} ${y}) scale(${size})`}
  />
)

const Plinth = () => <Solid x={-105} y={-75} w={200} d={142} h={5} tone="muted" />

const Sheet = ({
  x,
  y,
  z = 12,
  tone = 'paper',
  type = 'document',
  w = 82,
  d = 100,
}: {
  x: number
  y: number
  z?: number
  tone?: 'paper' | 'ink' | 'accent' | 'muted'
  type?: 'document' | 'interface' | 'chart' | 'rule' | 'rtl'
  w?: number
  d?: number
}) => (
  <Solid x={x} y={y} z={z} w={w} d={d} h={5} tone={tone}>
    {type === 'interface' ? (
      <>
        <rect x="9" y="9" width={w - 18} height="10" fill={INK} rx="1" />
        <rect x="9" y="29" width={(w - 24) * 0.45} height={d - 40} fill="var(--cap-left)" />
        <path
          d={`M${w * 0.56} 31h${w * 0.28}m-${w * 0.28} 13h${w * 0.22}m-${w * 0.22} 13h${w * 0.28}`}
          stroke={EDGE}
          strokeWidth="4"
        />
        <rect x={w * 0.56} y={d - 27} width={w * 0.25} height="10" rx="1" fill={ACCENT} />
      </>
    ) : type === 'chart' ? (
      <>
        <path d={`M12 12v${d - 24}h${w - 24}`} fill="none" stroke={EDGE} strokeWidth="2" />
        <path
          d={`M16 ${d - 22}L${w * 0.38} ${d * 0.55}L${w * 0.58} ${d * 0.66}L${w - 14} 20`}
          fill="none"
          stroke={ACCENT}
          strokeWidth="5"
        />
        <circle cx={w - 14} cy="20" r="5" fill={ACCENT} />
      </>
    ) : type === 'rule' ? (
      <>
        <path
          d={`M${w / 2} 14v17m0 23v14M19 68h${w - 38}`}
          stroke={INK}
          strokeWidth="3"
          fill="none"
        />
        <path d={`M${w / 2} 30l12 12-12 12-12-12Z`} fill={ACCENT} />
        <rect x="12" y="68" width="15" height="15" fill="var(--cap-muted)" />
        <rect x={w - 27} y="68" width="15" height="15" fill={ACCENT} />
      </>
    ) : type === 'rtl' ? (
      <>
        <path
          d={`M${w - 12} 18H${w * 0.45}m${w * 0.55 - 12} 14H12m${w - 24} 14H${w * 0.3}`}
          stroke={INK}
          strokeWidth="4"
        />
        <path
          d={`M${w - 14} ${d - 23}H14l10-8m-10 8 10 8`}
          fill="none"
          stroke={ACCENT}
          strokeWidth="3.5"
        />
      </>
    ) : (
      <>
        <rect x="12" y="14" width={w - 30} height="8" fill={tone === 'ink' ? PAPER : INK} />
        {[36, 49, 62]
          .filter((v) => v < d - 10)
          .map((v, i) => (
            <path
              d={`M12 ${v}h${w - 24 - i * 7}`}
              key={v}
              stroke={tone === 'ink' ? PAPER : EDGE}
              strokeWidth="3"
            />
          ))}
      </>
    )}
  </Solid>
)

const Tile = ({
  x,
  y,
  z = 12,
  tone = 'paper',
  mark,
}: {
  x: number
  y: number
  z?: number
  tone?: 'paper' | 'ink' | 'accent' | 'muted'
  mark?: 'check' | 'person' | 'coin' | 'progress' | 'directions' | 'roles'
}) => (
  <Solid x={x} y={y} z={z} w={48} d={48} h={12} tone={tone}>
    {mark === 'check' ? <Check x={13} y={18} /> : null}
    {mark === 'coin' ? (
      <>
        <circle cx="24" cy="24" r="13" fill="none" stroke={INK} strokeWidth="3" />
        <path d="M24 15v18m-7-13h14m-14 8h14" stroke={INK} strokeWidth="2.5" />
      </>
    ) : null}
    {mark === 'person' ? (
      <>
        <circle cx="24" cy="16" r="7" fill={INK} />
        <path d="M12 36v-4a12 12 0 0 1 24 0v4Z" fill={INK} />
      </>
    ) : null}
    {mark === 'progress' ? (
      <path d="M10 36V28h9V20h9V12h10" fill="none" stroke={INK} strokeWidth="5" />
    ) : null}
    {mark === 'directions' ? (
      <path
        d="M9 17h28l-7-6m7 6-7 6M39 32H11l7-6m-7 6 7 6"
        fill="none"
        stroke={INK}
        strokeWidth="2.5"
      />
    ) : null}
    {mark === 'roles' ? (
      <g fill={INK}>
        <rect x="19" y="8" width="10" height="9" />
        <rect x="8" y="29" width="10" height="9" />
        <rect x="30" y="29" width="10" height="9" />
        <path d="M24 17v7H13v5m11-5h11v5" fill="none" stroke={INK} strokeWidth="2" />
      </g>
    ) : null}
  </Solid>
)

const Signal = ({
  vertices,
  delay = 0,
}: {
  vertices: [number, number, number?][]
  delay?: number
}) => (
  <>
    <Wire vertices={vertices} />
    <Wire
      vertices={vertices}
      accent
      className="exp-anim exp-signal"
      style={{ '--exp-delay': `${delay}s` } as CSSProperties}
    />
  </>
)

const Coin = ({ x, y, z = 25 }: { x: number; y: number; z?: number }) => {
  const [cx, cy] = project(x, y, z)
  return (
    <g stroke={EDGE} strokeWidth="1.5">
      <path d={`M${cx - 25} ${cy}v14a25 14 0 0 0 50 0v-14`} fill="var(--cap-accent-right)" />
      <ellipse cx={cx} cy={cy} rx="25" ry="14" fill={ACCENT} />
      <ellipse cx={cx} cy={cy} rx="17" ry="8" fill="none" stroke={PAPER} strokeWidth="1.7" />
    </g>
  )
}

const Person = ({ x, y, z = 24 }: { x: number; y: number; z?: number }) => {
  const [cx, cy] = project(x, y, z)
  return (
    <g stroke={EDGE} strokeWidth="1.3">
      <ellipse cx={cx} cy={cy + 24} rx="18" ry="8" fill="var(--cap-left)" />
      <path d={`M${cx - 17} ${cy + 22}v-12a17 17 0 0 1 34 0v12q-17 12-34 0Z`} fill={PAPER} />
      <circle cx={cx} cy={cy - 13} r="12" fill={INK} />
    </g>
  )
}

function ProductManagement() {
  return (
    <>
      <Solid x={-110} y={-75} w={204} d={142} h={8}>
        <path d="M12 46h180M12 94h180M60 12v120M122 12v120" stroke={EDGE} strokeWidth="2" />
        <path d="M12 21h31m31 0h31m31 0h43" stroke={INK} strokeWidth="5" />
      </Solid>
      <Tile x={-94} y={-24} z={12} tone="muted" />
      <Tile x={-29} y={18} z={12} />
      <Move kind="choose">
        <Tile x={34} y={-28} z={24} tone="accent" mark="check" />
      </Move>
    </>
  )
}

function Discovery() {
  return (
    <>
      <Sheet x={-97} y={-55} z={5} w={136} d={112} />
      <Move kind="slide">
        <Sheet x={-82} y={-63} z={18} w={136} d={112} />
      </Move>
      <Tile x={3} y={-39} z={30} tone="accent" />
      <Move kind="search">
        <path d="m170 149-57 48" stroke={INK} strokeWidth="21" strokeLinecap="round" />
        <path d="m130 183-17 14" stroke={ACCENT} strokeWidth="21" strokeLinecap="round" />
        <ellipse
          cx="223"
          cy="108"
          rx="64"
          ry="46"
          stroke={INK}
          strokeWidth="12"
          fill="var(--cap-glass)"
        />
        <path d="M178 99q9-23 37-26" stroke={PAPER} strokeWidth="3" strokeLinecap="round" />
      </Move>
    </>
  )
}

function Service() {
  return (
    <>
      <Solid x={-108} y={-72} w={210} d={138} h={10} tone="muted" />
      <Signal
        vertices={[
          [-86, -34, 14],
          [70, -34, 14],
          [70, 42, 14],
          [-50, 42, 14],
        ]}
      />
      <Solid x={-106} y={-67} z={60} w={200} d={47} h={5} />
      <Signal
        vertices={[
          [-80, -43, 68],
          [61, -43, 68],
          [61, -43, 16],
        ]}
        delay={0.4}
      />
      <Person x={-60} y={-40} z={89} />
      <Person x={39} y={-40} z={89} />
      <Tile x={-60} y={16} z={16} tone="ink" />
      <Move>
        <Tile x={30} y={16} z={16} tone="accent" mark="check" />
      </Move>
    </>
  )
}

function Requirements() {
  return (
    <>
      <Sheet x={-96} y={-62} w={94} d={126} type="rule" />
      <Signal
        vertices={[
          [1, -9, 18],
          [27, -9, 18],
          [27, -59, 18],
          [64, -59, 18],
        ]}
      />
      <Signal
        vertices={[
          [1, -9, 18],
          [27, -9, 18],
          [27, 43, 18],
          [64, 43, 18],
        ]}
        delay={1}
      />
      <Tile x={48} y={-79} z={21} tone="paper" />
      <Move kind="choose">
        <Tile x={48} y={23} z={21} tone="accent" mark="check" />
      </Move>
    </>
  )
}

function AiDevelopment() {
  return (
    <>
      <Sheet x={-116} y={-73} z={25} w={76} d={95} />
      <Signal
        vertices={[
          [-38, -18, 26],
          [0, -18, 26],
          [0, 42, 26],
          [70, 42, 26],
        ]}
      />
      <Solid x={-16} y={-48} w={55} d={55} h={31} tone="ink">
        <path d="M12 14h31v27H12Z M19 21h17v13H19Z" fill="none" stroke={PAPER} strokeWidth="2" />
      </Solid>
      <Move>
        <Tile x={-17} y={-48} z={40} tone="accent" mark="check" />
      </Move>
      <Sheet x={49} y={14} z={15} w={75} d={90} type="interface" />
    </>
  )
}

function Operations() {
  return (
    <>
      <Plinth />
      <Signal
        vertices={[
          [-88, -37, 11],
          [61, -37, 11],
          [61, 46, 11],
          [-65, 46, 11],
          [-65, -37, 11],
        ]}
      />
      <Tile x={-100} y={-61} tone="ink" />
      <Move kind="choose">
        <Tile x={-28} y={-61} z={22} tone="accent" mark="check" />
      </Move>
      <Tile x={43} y={-61} />
      <Tile x={-12} y={24} tone="muted" />
    </>
  )
}

function BusinessModel() {
  return (
    <>
      <Signal
        vertices={[
          [-57, -55, 20],
          [57, -55, 20],
          [57, 52, 20],
          [-57, 52, 20],
          [-57, -55, 20],
        ]}
      />
      <Tile x={-89} y={-87} mark="person" />
      <Tile x={36} y={-87} tone="ink" />
      <Tile x={-89} y={22} mark="coin" />
      <Tile x={36} y={22} mark="progress" />
      <Move>
        <Coin x={0} y={-3} z={44} />
      </Move>
      <Wire
        vertices={[
          [-40, -39, 20],
          [0, 0, 22],
          [45, 38, 20],
        ]}
        accent
      />
    </>
  )
}

function Technical() {
  return (
    <>
      <Solid x={-91} y={-70} w={180} d={133} h={18} tone="ink">
        <path d="M12 19h154M12 44h154M12 70h154" stroke={PAPER} strokeWidth="3" />
      </Solid>
      <Move kind="layer">
        <Solid x={-87} y={-66} z={30} w={172} d={125} h={10} tone="muted" />
      </Move>
      <Sheet x={-83} y={-62} z={55} w={164} d={117} type="interface" />
      <Signal
        vertices={[
          [75, 54, 60],
          [75, 54, 22],
          [42, 54, 22],
        ]}
      />
    </>
  )
}

function Documentation() {
  return (
    <>
      <Sheet x={-113} y={-61} w={91} d={127} />
      <Signal
        vertices={[
          [-17, 0, 20],
          [16, 0, 20],
          [16, -72, 20],
          [53, -72, 20],
        ]}
      />
      <Signal
        vertices={[
          [16, 0, 20],
          [53, 0, 20],
        ]}
        delay={0.4}
      />
      <Signal
        vertices={[
          [16, 0, 20],
          [16, 72, 20],
          [53, 72, 20],
        ]}
        delay={0.8}
      />
      {[-93, -20, 53].map((y, i) => (
        <Move delay={i * 0.3} key={y}>
          <Sheet x={47} y={y} z={17} w={65} d={48} />
        </Move>
      ))}
      <Solid x={-111} y={-60} w={9} d={125} h={8} z={18} tone="accent" />
    </>
  )
}

function Analytics() {
  return (
    <>
      <Solid x={-98} y={-80} w={192} d={155} h={8}>
        <path d="M15 18v118h161M15 96h160M15 56h160" stroke={EDGE} strokeWidth="2" fill="none" />
        <path d="M17 128 63 92 97 104 160 95" stroke={INK} strokeWidth="5" fill="none" />
        <path d="M63 92 98 56 160 26" stroke={ACCENT} strokeWidth="5" fill="none" />
      </Solid>
      <Move kind="choose">
        <Tile x={40} y={-67} z={18} tone="accent" mark="check" />
      </Move>
      <Signal
        vertices={[
          [70, -58, 22],
          [111, -58, 22],
          [111, 88, 22],
          [-71, 88, 22],
          [-71, 47, 22],
        ]}
        delay={1}
      />
    </>
  )
}

function UxDirection() {
  return (
    <>
      <Sheet x={-122} y={-45} w={67} d={91} type="interface" />
      <Sheet x={-26} y={-61} z={29} w={78} d={107} type="interface" />
      <Sheet x={84} y={-36} w={61} d={83} type="interface" />
      <Signal
        vertices={[
          [-50, 8, 20],
          [-22, 8, 36],
          [60, 8, 36],
          [85, 8, 20],
        ]}
      />
      <Move kind="choose">
        <Solid x={-17} y={-50} w={60} d={12} z={38} h={5} tone="accent" />
      </Move>
    </>
  )
}

function Stakeholders() {
  return (
    <>
      <Solid x={-62} y={-61} w={122} d={121} z={30} h={9} />
      <Signal
        vertices={[
          [-109, 0, 25],
          [0, 0, 43],
          [98, 0, 25],
        ]}
      />
      <Signal
        vertices={[
          [0, -99, 25],
          [0, 0, 43],
          [0, 98, 25],
        ]}
        delay={0.6}
      />
      <Person x={0} y={-100} />
      <Person x={-105} y={0} />
      <Person x={103} y={0} />
      <Person x={0} y={102} />
      <Move>
        <Tile x={-24} y={-25} z={47} tone="accent" mark="check" />
      </Move>
    </>
  )
}

function Fintech() {
  return (
    <>
      <Solid x={-102} y={-63} w={96} d={99} h={37} tone="ink">
        <rect x="54" y="30" width="42" height="31" fill={PAPER} rx="3" />
        <circle cx="66" cy="45" r="4" fill={INK} />
      </Solid>
      <Sheet x={26} y={-44} w={95} d={123} />
      <Signal
        vertices={[
          [-13, 20, 46],
          [8, 20, 46],
          [8, 22, 22],
          [40, 22, 22],
        ]}
      />
      <Move kind="transfer">
        <Coin x={-32} y={-61} z={73} />
      </Move>
      <Coin x={80} y={48} z={31} />
    </>
  )
}

function Rtl() {
  return (
    <>
      <Sheet x={-116} y={-62} w={98} d={120} type="interface" />
      <Sheet x={22} y={-62} w={98} d={120} type="rtl" z={25} />
      <Signal
        vertices={[
          [-69, 74, 21],
          [72, 74, 21],
        ]}
      />
      <path d="m132 220-10 7 12 4m126-19 11-7-12-4" stroke={ACCENT} strokeWidth="3" fill="none" />
      <Move kind="choose">
        <Solid x={33} y={-54} w={74} d={9} h={5} z={31} tone="accent" />
      </Move>
    </>
  )
}

function Gamification() {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <Solid
          key={i}
          x={-105 + i * 51}
          y={-23}
          w={50}
          d={83}
          h={16 + i * 19}
          tone={i === 3 ? 'accent' : i === 0 ? 'muted' : 'paper'}
        />
      ))}
      <Move>
        <Tile x={50} y={-20} z={85} tone="accent" mark="check" />
      </Move>
      <Signal
        vertices={[
          [80, 66, 88],
          [103, 88, 16],
          [-102, 88, 16],
          [-102, 30, 20],
        ]}
        delay={1}
      />
    </>
  )
}

function FunctionSetup() {
  return (
    <>
      <Plinth />
      <Tile x={-89} y={12} mark="person" />
      <Tile x={-20} y={12} mark="person" />
      <Tile x={49} y={12} mark="person" />
      <Signal
        vertices={[
          [-65, 14, 24],
          [-65, -12, 24],
          [5, -12, 24],
          [75, -12, 24],
          [75, 14, 24],
        ]}
      />
      <Signal
        vertices={[
          [5, 14, 24],
          [5, -37, 24],
        ]}
        delay={0.4}
      />
      <Move kind="choose">
        <Tile x={-19} y={-82} z={25} tone="accent" mark="roles" />
      </Move>
    </>
  )
}

const skillScenes = {
  'product-management': ProductManagement,
  'product-discovery': Discovery,
  'service-design': Service,
  requirements: Requirements,
  'ai-product-development': AiDevelopment,
  'process-operations': Operations,
  'business-modeling': BusinessModel,
  'technical-pm': Technical,
  'documentation-spec': Documentation,
  'analytics-experimentation': Analytics,
  'ux-direction': UxDirection,
  'stakeholder-management': Stakeholders,
  'fintech-strategy': Fintech,
  'rtl-persian': Rtl,
  gamification: Gamification,
  'product-function-setup': FunctionSetup,
} satisfies Record<SkillKey, React.FC>

function Art({
  children,
  className = '',
  name,
}: {
  children: ReactNode
  className?: string
  name: string
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`cap-illustration experience-art ${className}`}
      data-artwork={name}
      fill="none"
      viewBox="0 0 400 280"
      style={{ direction: 'ltr' }}
    >
      <Ground />
      <g className="experience-art-object">{children}</g>
    </svg>
  )
}

export function SkillArtwork({ skillKey, className }: { skillKey: SkillKey; className?: string }) {
  const Scene = skillScenes[skillKey]
  return (
    <Art className={className} name={skillKey}>
      <Scene />
    </Art>
  )
}

function CoreGroup() {
  return (
    <>
      <ProductManagement />
      <Move kind="slide" delay={0.35}>
        <Sheet x={-95} y={-91} z={36} w={60} d={75} />
      </Move>
    </>
  )
}
function SystemsGroup() {
  return (
    <>
      <Technical />
      <Move kind="choose" delay={0.4}>
        <Tile x={-49} y={-24} z={63} tone="accent" mark="check" />
      </Move>
    </>
  )
}
function ExecutionGroup() {
  return (
    <>
      <Sheet x={-108} y={-50} w={119} d={138} type="interface" />
      <Move kind="layer">
        <Sheet x={18} y={-93} z={43} w={103} d={123} type="chart" />
      </Move>
      <Signal
        vertices={[
          [104, 5, 48],
          [124, 5, 48],
          [124, 90, 19],
          [-21, 90, 19],
          [-21, 32, 19],
        ]}
        delay={0.5}
      />
      <Move kind="choose">
        <Tile x={-9} y={28} z={32} tone="accent" mark="check" />
      </Move>
    </>
  )
}
function SpecializedGroup() {
  return (
    <>
      <Plinth />
      <Signal
        vertices={[
          [-62, -55, 16],
          [58, -55, 16],
          [58, 44, 16],
          [-62, 44, 16],
          [-62, -55, 16],
        ]}
      />
      <Tile x={-91} y={-77} mark="coin" />
      <Tile x={35} y={-77} mark="directions" />
      <Tile x={-91} y={20} mark="progress" />
      <Tile x={35} y={20} mark="roles" />
      <Move kind="choose">
        <Tile x={-25} y={-32} z={48} tone="accent" mark="check" />
      </Move>
    </>
  )
}
const groupScenes = {
  core: CoreGroup,
  systems: SystemsGroup,
  execution: ExecutionGroup,
  specialized: SpecializedGroup,
} satisfies Record<SkillGroupKey, React.FC>
export function GroupArtwork({ groupKey }: { groupKey: SkillGroupKey }) {
  const Scene = groupScenes[groupKey]
  return (
    <Art name={`group-${groupKey}`}>
      <Scene />
    </Art>
  )
}

const disciplineSkills: Record<DisciplineKey, SkillKey> = {
  business: 'business-modeling',
  product: 'product-management',
  design: 'ux-direction',
  technology: 'technical-pm',
  operations: 'process-operations',
  ai: 'ai-product-development',
}
export function DisciplineArtwork({ disciplineKey }: { disciplineKey?: DisciplineKey }) {
  if (disciplineKey) return <SkillArtwork skillKey={disciplineSkills[disciplineKey]} />
  return (
    <Art name="custom-discipline">
      <Plinth />
      <Tile x={-24} y={-24} z={34} tone="accent" />
    </Art>
  )
}

/** Six contributions assemble into one complete product; static output is the resolved state. */
export function DeliveryArtwork() {
  return (
    <Art name="shared-delivery" className="experience-delivery-art">
      <Solid x={-97} y={-68} w={190} d={139} h={18} tone="ink" />
      <Move kind="layer">
        <Solid x={-91} y={-62} z={30} w={178} d={127} h={9} tone="muted" />
      </Move>
      <Move kind="layer" delay={0.35}>
        <Sheet x={-85} y={-56} z={56} w={166} d={115} type="interface" />
      </Move>
      <Move kind="choose" delay={0.8}>
        <Tile x={-12} y={-21} z={73} tone="accent" mark="check" />
      </Move>
      <Signal
        vertices={[
          [-147, 8, 25],
          [-94, 8, 25],
          [-71, 8, 62],
        ]}
      />
      <Signal
        vertices={[
          [8, -140, 25],
          [8, -69, 25],
          [8, -45, 62],
        ]}
        delay={0.4}
      />
      <Signal
        vertices={[
          [148, 8, 25],
          [97, 8, 25],
          [72, 8, 62],
        ]}
        delay={0.8}
      />
      <Signal
        vertices={[
          [8, 132, 25],
          [8, 71, 25],
          [8, 47, 62],
        ]}
        delay={1.2}
      />
    </Art>
  )
}
