import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Project, WorkMosaicBlock as WorkMosaicBlockProps } from '@/payload-types'

import { padIndex } from '@/blocks/ProjectArchive/rows'
import { SectionHeader } from '@/components/SectionHeader'
import { localePath } from '@/i18n/navigation'
import { WORK_PATH } from '@/i18n/routes'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import { cn } from '@/utilities/ui'

import { MosaicTile } from './Tile'
import { tailSpan, toMosaicSize, type MosaicSize } from './sizes'

export type WorkMosaicProps = Pick<WorkMosaicBlockProps, 'items' | 'sectionHeader'> & {
  className?: string
  locale?: Locale
}

/**
 * Work Mosaic: the homepage's project wall — one ruled composition, not a gallery of cards. The
 * grid owns all geometry and every boundary; a tile owns only its project's content. Cells paint
 * their own top and inline-start hairline and the section closes the outer bottom and end edge,
 * so each rule is drawn exactly once and no two 1px borders ever stack into a 2px line.
 *
 * Why not the ruled-matrix idiom used by ExperienceGrid and WorkflowStages (a `gap-px` grid over a
 * `bg-line` surface): `--line` is 16%-alpha ink, so any unfilled grid area renders there as a
 * solid tinted block. Those grids can guard the trailing orphan with `nth-child` arithmetic only
 * because every cell is the same width. With mixed spans that is not expressible, and a mistaken
 * size sequence would paint a grey band. Here an unfilled area is paper on paper — invisible.
 *
 * Reading order is the CMS order, at every width: no `grid-auto-flow: dense`, no reordering for a
 * tighter pack. Accessibility and the editor's intent outrank an empty cell.
 *
 * The block sits sixth of seven on Home, so no tile is ever above the fold and none takes
 * `priority` — `ImageMedia` lazy-loads by default. If this block is ever placed first on a page,
 * pass `priority` to the first tile only.
 */
export const WorkMosaicBlock: React.FC<WorkMosaicProps> = ({
  className,
  items,
  locale = DEFAULT_LOCALE,
  sectionHeader,
}) => {
  const copy = uiCopy[locale]

  // A bare id means the project isn't published in this locale (access control leaves the
  // relationship unpopulated) — drop the tile rather than show an English fallback. The tail span
  // is computed from the survivors, so a dropped tile can never leave the last row ragged.
  const tiles = (items ?? []).flatMap((item) => {
    if (!item.project || typeof item.project !== 'object') return []
    return [
      {
        id: item.id ?? (item.project as Project).id,
        mediaOverride: item.mediaOverride,
        project: item.project as Project,
        size: toMosaicSize(item.size),
      },
    ]
  })

  if (!tiles.length) return null

  const sizes: MosaicSize[] = tiles.map((tile) => tile.size)

  return (
    <section className={cn('scroll-mt-28', className)} id="selected-work">
      <SectionHeader {...sectionHeader} className="mb-10 max-md:mb-8" tagTone="brand" />
      <div className="grid grid-cols-1 border-b border-e border-line bg-paper min-[420px]:grid-cols-2 lg:grid-cols-12">
        {tiles.map((tile, i) => (
          <MosaicTile
            index={padIndex(i)}
            key={tile.id}
            locale={locale}
            mediaOverride={tile.mediaOverride}
            project={tile.project}
            size={tile.size}
          />
        ))}
        {/*
          The closing index cell, sized to whatever the last row has left over so the mosaic can
          never end on a ragged edge. It is the way into the full archive, not a project tile, and
          so is the one cell in the grid that carries no media. The spans are custom properties
          because a computed `col-span-N` would be invisible to the Tailwind scanner.
        */}
        <Link
          className="group flex min-w-0 flex-col justify-end gap-2 border-t border-s border-line p-5 min-[420px]:col-span-(--tail-pair) lg:col-span-(--tail-lg) lg:p-6"
          href={localePath(locale, WORK_PATH)}
          style={
            {
              '--tail-pair': tailSpan(sizes, 'pair'),
              '--tail-lg': tailSpan(sizes, 'lg'),
            } as React.CSSProperties
          }
        >
          <span className="eyebrow text-ink-3">{copy.workArchiveTag}</span>
          <span
            className={cn(
              'inline-flex items-center gap-2 text-body font-medium text-foreground',
              'transition-colors duration-(--duration-fast) group-hover:text-brand motion-reduce:transition-none',
            )}
          >
            {copy.workIndexTitle}
            <ArrowRight aria-hidden className="size-3.5 rtl:-scale-x-100" />
          </span>
        </Link>
      </div>
    </section>
  )
}
