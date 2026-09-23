import React from 'react'

import type { SpotlightKey } from '../CapabilityIcons/keys'

const line = 'var(--ink-3)'
const guide = 'var(--line)'
const accent = 'var(--track-accent)'
const strokeWidth = 1.25

/** Shared drafting details. They mark the drawing's bounds without making another card. */
const Registration: React.FC = () => (
  <g fill="none" stroke={guide} strokeWidth={strokeWidth}>
    <path d="M35 48V35h13M352 35h13v13M35 192v13h13M352 205h13v-13" />
    <path d="M200 22v8M200 210v8M22 120h8M370 120h8" />
  </g>
)

const Module: React.FC<{ children?: React.ReactNode; h: number; w: number; x: number; y: number }> = ({
  children,
  h,
  w,
  x,
  y,
}) => (
  <g>
    <rect fill="var(--paper)" height={h} stroke={line} strokeWidth={strokeWidth} width={w} x={x} y={y} />
    {children}
  </g>
)

/** Scattered evidence is tested against two offset frames; only one root survives the scan. */
const Discovery: React.FC = () => (
  <>
    <Registration />
    <rect x={54} y={43} width={292} height={154} fill="none" stroke={guide} strokeDasharray="2 7" />
    <g className="cap-discovery-noise" fill={line}>
      <circle cx={77} cy={70} r={2.5} />
      <circle cx={105} cy={160} r={2} />
      <circle cx={141} cy={64} r={2.5} />
      <circle cx={299} cy={65} r={2} />
      <circle cx={328} cy={156} r={2.5} />
      <circle cx={282} cy={182} r={2} />
    </g>
    <g className="cap-discovery-field">
      <rect x={101} y={63} width={220} height={118} fill="var(--panel)" fillOpacity={0.32} stroke={line} strokeWidth={strokeWidth} />
      <path d="M101 76h-10M101 168H91M321 76h10M321 168h10" stroke={guide} strokeWidth={strokeWidth} />
      <rect x={160} y={86} width={112} height={70} fill="var(--paper)" stroke={line} strokeWidth={strokeWidth} />
      <path d="M216 63v23M160 121h-59M272 121h49M216 156v25" stroke={guide} strokeWidth={strokeWidth} />
    </g>
    <g className="cap-discovery-scan" stroke={accent} strokeWidth={1.5}>
      <path d="M101 73h220" />
      <path d="M210 68v10M222 68v10" />
    </g>
    <path d="M191 121h50M216 96v50" stroke={line} strokeWidth={strokeWidth} />
    <circle cx={216} cy={121} r={13} fill="var(--paper)" stroke={line} strokeWidth={strokeWidth} />
    <circle className="cap-discovery-root" cx={216} cy={121} r={4.5} fill={accent} />
    <path d="M216 134v32h34" fill="none" stroke={guide} strokeDasharray="2 5" strokeWidth={strokeWidth} />
    <path d="M247 162v8" stroke={guide} strokeWidth={strokeWidth} />
  </>
)

/** Frontstage touchpoints connect through an operational backbone below the service router. */
const Service: React.FC = () => (
  <>
    <Registration />
    <path d="M42 123h316M42 159h316" stroke={guide} strokeWidth={strokeWidth} />
    <path d="M83 84v39h117M317 84v39H200M83 159v21h88M317 159v21h-88" fill="none" stroke={line} strokeWidth={strokeWidth} />
    <path className="cap-service-route" pathLength={1} d="M83 84v39h117v36h117v-75" fill="none" stroke={accent} strokeWidth={1.6} />
    <path className="cap-service-backstage" pathLength={1} d="M83 159v21h88l29-21 29 21h88v-21" fill="none" stroke={line} strokeWidth={strokeWidth} />
    <Module x={50} y={45} w={66} h={39}>
      <circle cx={71} cy={64} r={5} fill="none" stroke={line} strokeWidth={strokeWidth} />
      <path d="M83 59h22M83 68h15" stroke={guide} strokeWidth={strokeWidth} />
    </Module>
    <Module x={284} y={45} w={66} h={39}>
      <path d="M296 58h42v15h-42zM305 65h24" fill="none" stroke={guide} strokeWidth={strokeWidth} />
    </Module>
    <Module x={50} y={180} w={66} h={28}>
      <path d="M61 192h44M61 198h30" stroke={guide} strokeWidth={strokeWidth} />
    </Module>
    <Module x={284} y={180} w={66} h={28}>
      <path d="M295 192h44M295 198h30" stroke={guide} strokeWidth={strokeWidth} />
    </Module>
    <path d="M200 101l22 22-22 22-22-22z" fill="var(--paper)" stroke={line} strokeWidth={strokeWidth} />
    <path d="M190 123h20M200 113v20" stroke={guide} strokeWidth={strokeWidth} />
    <circle className="cap-service-core" cx={200} cy={123} r={4} fill={accent} />
    <g className="cap-service-signal" fill={accent}>
      <circle cx={83} cy={123} r={3} />
      <circle cx={317} cy={123} r={3} />
      <circle cx={200} cy={159} r={3} />
    </g>
  </>
)

/** Distinct operating modules share rules; a constraint in one propagates through the bus. */
const Systems: React.FC = () => (
  <>
    <Registration />
    <path d="M200 54v132M85 120h230" stroke={guide} strokeWidth={strokeWidth} />
    <path className="cap-systems-links" pathLength={1} d="M116 77h84v43h84M116 163h84v-43h84" fill="none" stroke={line} strokeWidth={strokeWidth} />
    <g className="cap-systems-change">
      <Module x={49} y={52} w={67} h={50}>
        <path d="M61 67h42M61 77h26M61 87h34" stroke={guide} strokeWidth={strokeWidth} />
      </Module>
    </g>
    <Module x={284} y={52} w={67} h={50}>
      <circle cx={307} cy={77} r={9} fill="none" stroke={guide} strokeWidth={strokeWidth} />
      <path d="M316 77h22M307 68v18" stroke={guide} strokeWidth={strokeWidth} />
    </Module>
    <Module x={49} y={138} w={67} h={50}>
      <path d="M61 174v-22h14v22M82 174v-14h22v14" fill="none" stroke={guide} strokeWidth={strokeWidth} />
    </Module>
    <Module x={284} y={138} w={67} h={50}>
      <path d="M296 152h43v9h-43zM296 168h26" fill="none" stroke={guide} strokeWidth={strokeWidth} />
    </Module>
    <path d="M181 101h38v38h-38z" fill="var(--paper)" stroke={line} strokeWidth={strokeWidth} />
    <path d="M190 120h20M200 110v20" stroke={guide} strokeWidth={strokeWidth} />
    <path className="cap-systems-core" d="M195 115h10v10h-10z" fill="none" stroke={accent} strokeWidth={1.6} />
    <g className="cap-systems-response" fill={accent}>
      <circle cx={200} cy={77} r={2.5} />
      <circle cx={200} cy={163} r={2.5} />
    </g>
  </>
)

/** Context is routed to agents and tools, reconciled at a decision, then executed once. */
const AiExecution: React.FC = () => (
  <>
    <Registration />
    <path d="M104 120h36M188 120h20M254 73l35 47-35 47M309 120h25" fill="none" stroke={line} strokeWidth={strokeWidth} />
    <path className="cap-ai-input" pathLength={1} d="M104 120h36" stroke={accent} strokeWidth={1.6} />
    <path className="cap-ai-branches" pathLength={1} d="M188 120h20l17-47h29M208 120l17 47h29" fill="none" stroke={accent} strokeWidth={1.6} />
    <path className="cap-ai-return" pathLength={1} d="M254 73l35 47-35 47M309 120h25" fill="none" stroke={accent} strokeWidth={1.6} />
    <Module x={37} y={92} w={67} h={56}>
      <path d="M49 105h42M49 116h31M49 127h37" stroke={guide} strokeWidth={strokeWidth} />
    </Module>
    <Module x={140} y={94} w={48} h={52}>
      <path d="M152 107h24M152 120h24M152 133h24" stroke={guide} strokeWidth={strokeWidth} />
    </Module>
    <Module x={225} y={50} w={50} h={46}>
      <path d="M236 62h28M236 73h20M236 83h28" stroke={guide} strokeWidth={strokeWidth} />
    </Module>
    <Module x={225} y={144} w={50} h={46}>
      <circle cx={243} cy={167} r={8} fill="none" stroke={guide} strokeWidth={strokeWidth} />
      <path d="M251 167h13" stroke={guide} strokeWidth={strokeWidth} />
    </Module>
    <path d="M289 102l18 18-18 18-18-18z" fill="var(--paper)" stroke={line} strokeWidth={strokeWidth} />
    <circle className="cap-ai-decision" cx={289} cy={120} r={3.5} fill={accent} />
    <Module x={334} y={93} w={40} h={54}>
      <path d="M344 106h20M344 118h20M344 130h14" stroke={guide} strokeWidth={strokeWidth} />
    </Module>
    <path className="cap-ai-output" d="M339 98h30v44h-30z" fill="none" stroke={accent} strokeWidth={1.6} />
  </>
)

const scenes = {
  discovery: Discovery,
  service: Service,
  systems: Systems,
  'ai-execution': AiExecution,
} satisfies Record<SpotlightKey, React.FC>

export const CapabilityIllustration: React.FC<{ spotlightKey: SpotlightKey }> = ({ spotlightKey }) => {
  const Scene = scenes[spotlightKey]

  return (
    <svg
      aria-hidden="true"
      className={`cap-illustration cap-illustration--${spotlightKey} h-full w-full max-w-[25rem]`}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      style={{ direction: 'ltr' }}
      viewBox="0 0 400 240"
    >
      <Scene />
    </svg>
  )
}
