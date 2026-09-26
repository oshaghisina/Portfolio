import React from 'react'

import type { Media, Page } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import { AboutImpactHero } from '@/heros/AboutImpact'
import { ContactImpactHero } from '@/heros/ContactImpact'
import { ExperienceImpactHero } from '@/heros/ExperienceImpact'
import { HighImpactHero } from '@/heros/HighImpact'
import { HomeImpactHero } from '@/heros/HomeImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'

const heroes = {
  aboutImpact: AboutImpactHero,
  contactImpact: ContactImpactHero,
  experienceImpact: ExperienceImpactHero,
  highImpact: HighImpactHero,
  homeImpact: HomeImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

export const RenderHero: React.FC<
  Page['hero'] & { locale?: Locale; portrait?: Media | string | null }
> = (props) => {
  const { type, portrait, ...heroProps } = props

  if (!type || type === 'none') return null

  // Portrait is identity data from the `about` global — only the About opener consumes it.
  if (type === 'aboutImpact') {
    return <AboutImpactHero {...heroProps} portrait={portrait} type={type} />
  }

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...heroProps} type={type} />
}
