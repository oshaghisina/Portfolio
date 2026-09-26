import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { WorkMosaicBlock as WorkMosaicBlockProps } from '@/payload-types'

import { padIndex } from '@/blocks/ProjectArchive/rows'
import { SectionHeader } from '@/components/SectionHeader'
import { localePath } from '@/i18n/navigation'
import { WORK_PATH } from '@/i18n/routes'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import { cn } from '@/utilities/ui'

import { MosaicTile } from './Tile'
import { toMosaicSize } from './sizes'
import './mosaic.css'

export type WorkMosaicProps = Pick<WorkMosaicBlockProps, 'items' | 'sectionHeader'> & {
  className?: string
  locale?: Locale
}

/** Featured stories and short project notes share the CMS order, including on mobile. */
export const WorkMosaicBlock: React.FC<WorkMosaicProps> = ({
  className,
  items,
  locale = DEFAULT_LOCALE,
  sectionHeader,
}) => {
  const copy = uiCopy[locale]
  const tiles = (items ?? []).flatMap((item) => {
    // Access control leaves unpublished relationships unpopulated in the requested locale.
    if (!item.project || typeof item.project !== 'object') return []
    return [{ ...item, project: item.project, size: toMosaicSize(item.size) }]
  })
  if (!tiles.length) return null

  return (
    <section className={cn('selected-work scroll-mt-28', className)} id="selected-work">
      <SectionHeader {...sectionHeader} className="mb-10 max-md:mb-8" tagTone="mono" />
      <div className="work-selection" data-reveal-group="">
        {tiles.map((tile, i) => (
          <MosaicTile
            index={padIndex(i)}
            key={tile.id ?? tile.project.id}
            locale={locale}
            mediaOverride={tile.mediaOverride}
            project={tile.project}
            size={tile.size}
          />
        ))}
      </div>
      <Link className="work-selection-footer" href={localePath(locale, WORK_PATH)}>
        <span className="eyebrow text-ink-3">{copy.workArchiveTag}</span>
        <span className="work-selection-archive-label">
          {copy.workIndexTitle}
          <ArrowRight aria-hidden className="size-5 rtl:-scale-x-100" />
        </span>
      </Link>
    </section>
  )
}
