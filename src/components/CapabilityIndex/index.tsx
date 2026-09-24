import React from 'react'

import { GroupArtwork } from '@/components/ExperienceVisuals/Artwork'
import { ExperienceMotionControl } from '@/components/ExperienceVisuals/Motion.client'
import { capabilityNumber, experienceVisualCopy } from '@/components/ExperienceVisuals/copy'
import { SKILL_GROUP_KEYS, SKILL_KEYS, SKILLS_BY_GROUP } from '@/blocks/CapabilityIcons/keys'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import { cn } from '@/utilities/ui'

/**
 * Four legible scenes introduce the practice. Counts and stable anchors share the matrix vocabulary.
 */
export const CapabilityIndex: React.FC<{ className?: string; locale?: Locale }> = ({
  className,
  locale = DEFAULT_LOCALE,
}) => {
  const copy = uiCopy[locale].capabilityIndex

  return (
    <nav aria-label={copy.indexLabel} className={cn('m-0', className)}>
      <p className="mb-3 eyebrow text-ink-3">{copy.indexLabel}</p>
      <ol className="experience-index-grid">
        {SKILL_GROUP_KEYS.map((groupKey, i) => {
          const skills = SKILLS_BY_GROUP[groupKey]
          return (
            <li className="experience-index-card" data-experience-scene="" key={groupKey}>
              <a href={`#capability-group-${groupKey}`}>
                <span className="experience-index-meta">
                  <span className="index-code text-ink-3" dir="ltr">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="experience-index-count">
                    {copy.total.replace('{n}', capabilityNumber(skills.length, locale))}
                  </span>
                </span>
                <div className="experience-index-art">
                  <GroupArtwork groupKey={groupKey} />
                </div>
                <span className="experience-index-title">{copy.groups[i]}</span>
                <p className="experience-index-description">
                  {experienceVisualCopy[locale].groups[groupKey]}
                </p>
              </a>
            </li>
          )
        })}
      </ol>
      <div className="experience-index-footer">
        <p className="eyebrow text-track-accent">
          {copy.total.replace('{n}', capabilityNumber(SKILL_KEYS.length, locale))}
        </p>
        <ExperienceMotionControl locale={locale} />
      </div>
      <span className="sr-only">{copy.description}</span>
    </nav>
  )
}
