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
 * Shared capability machines for Home (ExperienceTeaser) and Experience (CapabilitySpotlight).
 * Markup is the fully resolved state so reduced-motion / no-JS still reads as complete systems.
 */
export const CapabilityIllustration: React.FC<{ spotlightKey: SpotlightKey }> = ({ spotlightKey }) => {
  const Scene = scenes[spotlightKey]

  return (
    <svg
      aria-hidden="true"
      className={`cap-illustration cap-illustration--${spotlightKey} h-full w-full`}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      style={{ direction: 'ltr' }}
      viewBox="0 0 400 280"
    >
      <Scene />
    </svg>
  )
}
