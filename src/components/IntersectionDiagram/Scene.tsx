import {
  ACCENT,
  EDGE,
  Ground,
  INK,
  points,
  Solid,
  Wire,
} from '@/blocks/CapabilityIllustrations/objects'

/** Product — stacked interface planes (people & experience). */
function ProductModule() {
  return (
    <g className="ix-anim ix-module ix-module-product">
      <Solid d={46} h={4} tone="muted" w={58} x={-29} y={-108} z={12} />
      <Solid d={46} h={5} tone="paper" w={58} x={-33} y={-112} z={20}>
        <rect
          fill="none"
          height="28"
          rx="2"
          stroke={INK}
          strokeWidth="1.8"
          width="42"
          x="8"
          y="9"
        />
        <path d="M8 17h42M20 17v20" stroke={INK} strokeWidth="1.6" />
        <path d="M26 24h18M26 30h12" stroke={EDGE} strokeWidth="2" />
        <circle className="ix-anim ix-signal" cx="14" cy="12" fill={ACCENT} r="2.2" />
      </Solid>
    </g>
  )
}

/** Business — stepped value blocks (value & growth). */
function BusinessModule() {
  return (
    <g className="ix-anim ix-module ix-module-business">
      <Solid d={52} h={8} tone="muted" w={56} x={-112} y={8} z={10} />
      <Solid d={40} h={11} tone="paper" w={46} x={-107} y={14} z={20}>
        <path
          d="M10 30 H40 M12 26 L20 16 L28 22 L38 8"
          fill="none"
          stroke={INK}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path d="M32 8 H38 V14" fill="none" stroke={EDGE} strokeWidth="1.8" />
        <circle className="ix-anim ix-signal" cx="12" cy="10" fill={ACCENT} r="2.2" />
      </Solid>
    </g>
  )
}

/** Technology — stacked system planes (systems & delivery). */
function TechnologyModule() {
  return (
    <g className="ix-anim ix-module ix-module-technology">
      <Solid d={50} h={6} tone="muted" w={56} x={42} y={8} z={10} />
      <Solid d={42} h={5} tone="paper" w={48} x={46} y={12} z={20} />
      <Solid d={34} h={6} tone="paper" w={40} x={50} y={16} z={30}>
        <path d="M6 10 L20 4 L34 10 L20 16 Z" fill="none" stroke={INK} strokeWidth="1.7" />
        <path
          d="M6 18 L20 24 L34 18 M6 26 L20 32 L34 26"
          fill="none"
          stroke={EDGE}
          strokeWidth="1.5"
        />
        <path d="M20 16 V32" stroke={INK} strokeWidth="1.4" />
        <circle className="ix-anim ix-signal" cx="10" cy="8" fill={ACCENT} r="2.2" />
      </Solid>
    </g>
  )
}

/** Central operating core — where the three disciplines become one system. */
function Core() {
  return (
    <g className="ix-anim ix-core">
      <Solid d={44} h={8} tone="muted" w={44} x={-22} y={-22} z={16} />
      <Solid d={26} h={18} tone="accent" w={26} x={-13} y={-13} z={26}>
        <path
          d="M8 13h10M13 8v10"
          stroke="var(--cap-highlight)"
          strokeLinecap="round"
          strokeWidth="2.4"
        />
      </Solid>
    </g>
  )
}

/**
 * Three distinct isometric disciplines feed one raised orange core.
 * Static SVG is the fully assembled (resolved) state; motion offsets from there.
 */
export function IntersectionScene() {
  return (
    <g>
      <Ground wide />
      <g className="cap-scene">
        {/* Construction field */}
        <polygon
          fill="none"
          points={points([
            [-88, -88],
            [88, -88],
            [88, 88],
            [-88, 88],
          ])}
          stroke={EDGE}
          strokeDasharray="3 5"
          strokeOpacity=".7"
        />
        <Solid d={168} h={7} tone="paper" w={168} x={-84} y={-84} z={1}>
          <path
            d="M56 0v168M112 0v168M0 56h168M0 112h168"
            stroke={EDGE}
            strokeOpacity=".5"
            strokeWidth=".8"
          />
        </Solid>

        {/* Quiet drafting ticks */}
        <g fill="none" stroke={EDGE} strokeWidth="1" opacity=".55">
          <path d="M28 36 V22 H42 M372 22 H386 V36 M28 244 V258 H42 M372 258 H386 V244" />
          <path d="M200 8 V18 M12 150 H22 M378 150 H388" />
        </g>

        <ProductModule />
        <BusinessModule />
        <TechnologyModule />

        {/* Connectors — draw in via stroke-dash during the cycle */}
        <Wire
          accent
          className="ix-anim ix-wire ix-wire-product"
          vertices={[
            [0, -85, 28],
            [0, -40, 28],
            [0, -22, 42],
          ]}
        />
        <Wire
          accent
          className="ix-anim ix-wire ix-wire-business"
          vertices={[
            [-80, 28, 28],
            [-40, 8, 28],
            [-22, 0, 42],
          ]}
        />
        <Wire
          accent
          className="ix-anim ix-wire ix-wire-technology"
          vertices={[
            [70, 28, 28],
            [36, 8, 28],
            [22, 0, 42],
          ]}
        />

        {/* Accent packets ride the same paths */}
        <Wire
          accent
          className="ix-anim ix-packet ix-packet-product"
          vertices={[
            [0, -85, 28],
            [0, -40, 28],
            [0, -22, 42],
          ]}
        />
        <Wire
          accent
          className="ix-anim ix-packet ix-packet-business"
          vertices={[
            [-80, 28, 28],
            [-40, 8, 28],
            [-22, 0, 42],
          ]}
        />
        <Wire
          accent
          className="ix-anim ix-packet ix-packet-technology"
          vertices={[
            [70, 28, 28],
            [36, 8, 28],
            [22, 0, 42],
          ]}
        />

        <Core />
      </g>
    </g>
  )
}
