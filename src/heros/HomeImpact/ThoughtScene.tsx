import type { ReactNode } from 'react'

import { ACCENT, EDGE, INK, PAPER } from '@/blocks/CapabilityIllustrations/objects'

/** The open upper hook and broad lower sweep echo the handwritten S, rather than a typed glyph. */
const THREAD =
  'M470 108 C536 25 391 31 252 85 C116 138 92 196 164 214 C238 233 337 181 409 239 C516 325 345 438 192 480 C85 509 55 465 117 426 C152 404 191 392 227 377'
const FEEDBACK = 'M227 377 C195 346 174 298 219 261 C239 245 258 238 284 233'

/** Shallow oblique paper planes: the shared material palette, with a more readable face angle. */
function Sheet({
  x,
  y,
  w,
  h,
  children,
  className,
}: {
  x: number
  y: number
  w: number
  h: number
  children: ReactNode
  className?: string
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={className}>
        <g transform="matrix(.96 .28 -.42 .82 0 0)">
          <rect x="7" y="17" width={w} height={h} rx="5" fill="var(--cap-shadow)" />
          <path
            d={`M0 ${h - 4}V${h + 4}Q0 ${h + 8} 4 ${h + 8}H${w - 4}Q${w} ${h + 8} ${w} ${h + 4}V4L${w - 6} 0Z`}
            fill="var(--cap-right)"
            stroke={EDGE}
            strokeWidth="1.1"
          />
          <rect width={w} height={h} rx="4" fill={PAPER} stroke={EDGE} strokeWidth="1.2" />
          {children}
        </g>
      </g>
    </g>
  )
}

function Evidence() {
  return (
    <g data-thought-object="evidence">
      <Sheet x={147} y={116} w={112} h={84}>
        <path d="M13 18h39M13 30h78M13 41h68M13 52h74" stroke={EDGE} strokeWidth="3" />
        <path d="M13 66h29" stroke={INK} strokeWidth="3" />
      </Sheet>
      <Sheet x={180} y={93} w={112} h={84} className="thought-evidence">
        <circle cx="25" cy="24" r="10" fill="var(--cap-left)" />
        <circle cx="25" cy="21" r="3" fill={INK} />
        <path d="M19 30c0-8 12-8 12 0" fill={INK} />
        <path d="M44 20h46M44 28h31" stroke={INK} strokeWidth="3" />
        <path d="M17 46h76M17 56h61M17 66h35" stroke={EDGE} strokeWidth="3" />
        <path d="M69 66h24" stroke={ACCENT} strokeWidth="4" />
      </Sheet>
      {/* A genuine choice: one open alternative, one committed direction. */}
      <path d="M269 160l25 8m0 0 24-19m-24 19 16 24" fill="none" stroke={EDGE} strokeWidth="1.5" />
      <path d="M294 168l16 24 24 7" fill="none" stroke={ACCENT} strokeWidth="2" />
      <g transform="matrix(.96 .28 -.42 .82 319 138)">
        <rect width="37" height="23" rx="3" fill={PAPER} stroke={EDGE} strokeDasharray="3 3" />
        <path d="M9 11h19" stroke={EDGE} strokeWidth="2" />
      </g>
      <g transform="matrix(.96 .28 -.42 .82 309 183)" className="thought-choice">
        <rect width="37" height="23" rx="3" fill={ACCENT} />
        <path d="m11 11 5 5 11-10" fill="none" stroke="var(--cap-highlight)" strokeWidth="2.5" />
      </g>
    </g>
  )
}

function Product() {
  return (
    <g data-thought-object="product">
      {/* Visible execution layer: a shared context feeds three coordinated operations. */}
      <Sheet x={310} y={252} w={212} h={164}>
        <path
          d="M24 128h166M58 117v22M108 117v22M158 117v22"
          fill="none"
          stroke={EDGE}
          strokeWidth="2"
        />
        {[42, 92, 142].map((x) => (
          <g key={x}>
            <rect
              x={x}
              y="128"
              width="28"
              height="21"
              rx="3"
              fill="var(--cap-left)"
              stroke={EDGE}
            />
            <path d={`m${x + 9} 139 4 4 7-8`} fill="none" stroke={ACCENT} strokeWidth="2" />
          </g>
        ))}
      </Sheet>
      <path d="M289 340v22M494 291v24" stroke={EDGE} strokeDasharray="3 4" strokeWidth="1.3" />
      <Sheet x={306} y={211} w={224} h={170} className="thought-product">
        {/* Recognisable browser and interface, without fabricated project metrics or copy. */}
        <path d="M0 25h224" stroke={EDGE} />
        {[12, 20, 28].map((x) => (
          <circle key={x} cx={x} cy="13" r="2" fill={EDGE} />
        ))}
        <rect x="71" y="9" width="90" height="7" rx="3.5" fill="var(--cap-left)" />
        <path d="M51 25v145" stroke={EDGE} />
        <rect x="12" y="39" width="27" height="7" rx="2" fill={INK} />
        {[62, 81, 100].map((y, i) => (
          <g key={y}>
            <rect x="12" y={y} width="6" height="6" rx="1" fill={i === 0 ? ACCENT : EDGE} />
            <path d={`M24 ${y + 3}h15`} stroke={i === 0 ? INK : EDGE} strokeWidth="2" />
          </g>
        ))}
        <path d="M65 43h91" stroke={INK} strokeWidth="4" />
        <path d="M65 53h63" stroke={EDGE} strokeWidth="2.5" />
        <rect x="65" y="66" width="144" height="49" rx="3" fill="var(--cap-left)" />
        <rect x="76" y="78" width="25" height="25" rx="3" fill={PAPER} />
        <path d="m82 91 5 5 9-12" stroke={ACCENT} strokeWidth="2.5" fill="none" />
        <path d="M113 81h79M113 91h52M113 101h66" stroke={INK} strokeWidth="2.5" />
        <path d="M65 130h79M65 141h55M65 151h69" stroke={EDGE} strokeWidth="2.5" />
        <rect x="160" y="128" width="49" height="25" rx="4" fill={ACCENT} />
        <path
          d="M172 141h24m-5-5 5 5-5 5"
          fill="none"
          stroke="var(--cap-highlight)"
          strokeWidth="2"
        />
      </Sheet>
      {/* One observed interaction leads into the measurement loop. */}
      <path d="m446 350 5 20 5-8 8-4Z" fill={INK} stroke={PAPER} strokeWidth="1.5" />
      <circle
        className="thought-use"
        cx="444"
        cy="347"
        r="12"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2"
      />
    </g>
  )
}

function Learning() {
  return (
    <g data-thought-object="learning">
      <Sheet x={133} y={351} w={137} h={104} className="thought-learning">
        <path d="M14 17h57" stroke={INK} strokeWidth="3" />
        <circle cx="120" cy="17" r="3" fill={ACCENT} />
        <path d="M15 40h108M15 58h108M15 76h108" stroke={EDGE} strokeOpacity=".45" />
        <path
          d="M18 79V64M38 79V56M58 79V64M78 79V47M98 79V40M118 79V46"
          stroke="var(--cap-muted)"
          strokeWidth="7"
        />
        <path d="m18 58 20-11 20 8 20-21 20-6 20 9" fill="none" stroke={ACCENT} strokeWidth="2.5" />
        <circle cx="78" cy="34" r="4" fill={PAPER} stroke={ACCENT} strokeWidth="2" />
        <path d="M15 92h32m8 0h21" stroke={EDGE} strokeWidth="2" />
      </Sheet>
    </g>
  )
}

export function ThoughtScene() {
  return (
    <svg
      aria-hidden="true"
      className="thought-art cap-illustration"
      fill="none"
      focusable="false"
      viewBox="0 0 600 540"
      width="600"
      height="540"
    >
      {/* Local shadows ground the objects; there is deliberately no shared plinth. */}
      <ellipse cx="354" cy="398" rx="146" ry="24" fill="var(--cap-shadow)" />
      <ellipse cx="166" cy="456" rx="94" ry="14" fill="var(--cap-shadow)" />
      <g stroke={EDGE} strokeWidth="1" opacity=".55">
        <path d="M40 95V81h14M545 81h14v14M40 445v14h14M545 459h14v-14" />
        <path d="M299 23v9M24 269h9M567 269h9M299 515v9" />
      </g>
      <path d={THREAD} stroke="var(--cap-shadow)" strokeWidth="12" transform="translate(0 5)" />
      <path d={THREAD} stroke={PAPER} strokeWidth="10" />
      <path
        d={THREAD}
        stroke={ACCENT}
        strokeWidth="2.2"
        strokeOpacity=".58"
        strokeLinecap="round"
      />
      <path
        d={THREAD}
        className="thought-travel"
        pathLength="1"
        stroke={ACCENT}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d={FEEDBACK} stroke={EDGE} strokeWidth="1.5" strokeDasharray="3 5" />
      <path
        d={FEEDBACK}
        className="thought-return"
        pathLength="1"
        stroke={ACCENT}
        strokeWidth="2.5"
      />
      <path d="m275 229 9 4-6 7" stroke={ACCENT} strokeWidth="1.7" />
      <Evidence />
      <Product />
      <Learning />
      <circle cx="470" cy="108" r="4" fill={PAPER} stroke={ACCENT} strokeWidth="2" />
      <circle cx="227" cy="377" r="4" fill={ACCENT} />
    </svg>
  )
}
