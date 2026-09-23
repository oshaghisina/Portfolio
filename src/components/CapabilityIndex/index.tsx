import React from 'react'

import { SkillIcon } from '@/blocks/CapabilityIcons'
import { SKILL_GROUP_KEYS, SKILL_KEYS, SKILLS_BY_GROUP } from '@/blocks/CapabilityIcons/keys'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import { cn } from '@/utilities/ui'

/**
 * The `/experience` opener's aside: four anchored capability groups, their marks, and the count.
 *
 * It says in one glance what the headline says in a sentence, so the right half of the opener
 * stops being whitespace (the same job `IntersectionDiagram` does on About, and the console does
 * on the homepage). It is an *index*, not a preview: no titles, no descriptions, no evidence —
 * all of that is the matrix's, further down.
 *
 * Counts come from `SKILLS_BY_GROUP`, never from a literal. Stable keys in the hrefs mean a CMS
 * group reorder does not break the links.
 */
export const CapabilityIndex: React.FC<{ className?: string; locale?: Locale }> = ({
  className,
  locale = DEFAULT_LOCALE,
}) => {
  const copy = uiCopy[locale].capabilityIndex

  return (
    <nav aria-label={copy.indexLabel} className={cn('m-0', className)}>
      <p className="mb-3 eyebrow text-ink-3">{copy.indexLabel}</p>
      <div className="border-y border-line">
        {SKILL_GROUP_KEYS.map((groupKey, i) => {
          const skills = SKILLS_BY_GROUP[groupKey]
          return (
            <a
              className="flex items-center gap-4 border-line py-4 transition-colors duration-(--duration-fast) ease-standard hover:bg-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring not-first:border-t"
              href={`#capability-group-${groupKey}`}
              key={groupKey}
            >
              <span className="index-code text-ink-3" dir="ltr">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0 flex-1 eyebrow text-ink-2">{copy.groups[i]}</span>
              <span aria-hidden className="flex shrink-0 items-center gap-1.5">
                {skills.map((skillKey) => (
                  <SkillIcon className="size-5" key={skillKey} skillKey={skillKey} />
                ))}
              </span>
            </a>
          )
        })}
      </div>
      <p className="mt-3 eyebrow text-track-accent">
        <span dir="ltr">{copy.total.replace('{n}', String(SKILL_KEYS.length))}</span>
      </p>
      <span className="sr-only">{copy.description}</span>
    </nav>
  )
}
