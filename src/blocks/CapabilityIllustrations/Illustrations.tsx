import React from 'react'

import type { SpotlightKey } from '../CapabilityIcons/keys'

import { AiExecutionScene } from './scenes/AiExecution'
import { DiscoveryScene } from './scenes/Discovery'
import { ServiceScene } from './scenes/Service'
import { SystemsScene } from './scenes/Systems'

const scenes = {
  discovery: DiscoveryScene,
  service: ServiceScene,
  systems: SystemsScene,
  'ai-execution': AiExecutionScene,
} satisfies Record<SpotlightKey, React.FC>

/**
 * Four distinct capability sculptures, shared by Home and Experience.
 * Server-rendered SVG stays complete with reduced motion or without JavaScript.
 */
export const CapabilityIllustration: React.FC<{ spotlightKey: SpotlightKey }> = ({
  spotlightKey,
}) => {
  const Scene = scenes[spotlightKey]

  return (
    <svg
      aria-hidden="true"
      className={`cap-illustration cap-illustration--${spotlightKey} h-full w-full`}
      fill="none"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      style={{ direction: 'ltr' }}
      viewBox="0 0 400 280"
    >
      <Scene />
    </svg>
  )
}
