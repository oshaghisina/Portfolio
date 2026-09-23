import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Sina Oshaghi Portfolio</h4>
      </Banner>
      Content and chrome for this site:
      <ul className={`${baseClass}__instructions`}>
        <li>
          <SeedButton />
          {' to load or refresh pages, projects, case studies, and localizations, then '}
          <a href="/" target="_blank">
            open the site
          </a>
          {' to check the result.'}
        </li>
        <li>
          Edit <strong>Pages</strong>, <strong>Projects</strong>, <strong>Experiences</strong>, and{' '}
          <strong>Posts</strong> (Lab) here. Header and Footer globals control navigation.
        </li>
        <li>
          Prefer the additive seed scripts (<code>pnpm seed:*</code>) for bulk updates so local Docs
          assets stay the source of truth.
        </li>
      </ul>
    </div>
  )
}

export default BeforeDashboard
