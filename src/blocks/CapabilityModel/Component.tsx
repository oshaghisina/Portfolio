import React, { type CSSProperties } from 'react'
import type { CapabilityModelBlock as CapabilityModelBlockProps } from '@/payload-types'
import { SectionHeader } from '@/components/SectionHeader'
import { DeliveryArtwork, DisciplineArtwork } from '@/components/ExperienceVisuals/Artwork'
import { experienceVisualCopy, isDisciplineKey } from '@/components/ExperienceVisuals/copy'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

export type CapabilityModelProps = Pick<
  CapabilityModelBlockProps,
  'disciplines' | 'output' | 'outputLabel' | 'sectionHeader'
> & {
  className?: string
  locale?: Locale
}

/** Stable discipline identities attach meaning to geometry; arbitrary CMS labels remain valid. */
export const CapabilityModelBlock: React.FC<CapabilityModelProps> = ({
  className,
  disciplines,
  output,
  outputLabel,
  sectionHeader,
  locale = DEFAULT_LOCALE,
}) => {
  const rows = (disciplines ?? []).filter((row) => row.label)
  if (!rows.length || !output) return null
  return (
    <section className={cn(className)} id="capability-model">
      <SectionHeader {...sectionHeader} className="mb-10 max-md:mb-8" tagTone="mono" />
      <div
        className="experience-model-network"
        style={{ '--discipline-rows': Math.ceil(rows.length / 2) } as CSSProperties}
      >
        <ol className="experience-model-inputs">
          {rows.map((row, i) => {
            const key = isDisciplineKey(row.disciplineKey) ? row.disciplineKey : undefined
            return (
              <li
                className="experience-model-input"
                data-experience-scene=""
                key={row.id ?? i}
                style={
                  {
                    '--discipline-row': Math.floor(i / 2) + 1,
                    '--discipline-column': i % 2 === 0 ? 1 : 3,
                  } as CSSProperties
                }
              >
                <div className="experience-model-input-art">
                  <DisciplineArtwork disciplineKey={key} />
                </div>
                <div className="min-w-0">
                  <span className="index-code text-ink-3" dir="ltr">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="experience-model-label">{row.label}</h3>
                  {key ? (
                    <p className="experience-model-contribution">
                      {experienceVisualCopy[locale].disciplines[key]}
                    </p>
                  ) : null}
                </div>
              </li>
            )
          })}
        </ol>
        <figure className="experience-model-delivery" data-experience-scene="">
          <DeliveryArtwork />
          <figcaption>
            <span className="eyebrow text-ink-3">{outputLabel}</span>
            <p className="experience-model-output">{output}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
