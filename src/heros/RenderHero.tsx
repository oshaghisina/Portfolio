import React from 'react'

import type { Page } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import { HighImpactHero } from '@/heros/HighImpact'
import { HomeImpactHero } from '@/heros/HomeImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'

const heroes = {
  highImpact: HighImpactHero,
  homeImpact: HomeImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

export const RenderHero: React.FC<Page['hero'] & { locale?: Locale }> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
