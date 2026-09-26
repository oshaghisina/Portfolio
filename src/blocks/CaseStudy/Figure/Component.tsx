import React from 'react'

import type { CaseStudyFigureBlock } from '@/payload-types'

import { FigureMedia, resolveTreatment } from '@/components/CaseStudy/FigureMedia'
import { PageIndex, type PageEntry, type PageShot } from '@/components/CaseStudy/PageIndex'
import { isPortraitMedia } from '@/components/ProjectCover'
import { PLATE_STYLE, pad } from '@/components/CaseStudy/plate'
import { cn } from '@/utilities/ui'

import type { CaseStudyBlockContext } from '../types'
import type { FigureLayout } from './config'

export type FigureBlockProps = CaseStudyFigureBlock &
  CaseStudyBlockContext & {
    /** "02", "03" … — the hero is Figure 01 when it has media. */
    number: string
  }

type Visual = NonNullable<CaseStudyFigureBlock['items']>[number]

/**
 * `sizes` per layout — the widest an image can render in that pattern, as a share of the canvas
 * (`size.canvas` = 78vw from `md`, capped at `size.container` = 86rem from ~110rem up).
 */
const SIZES: Record<FigureLayout, string> = {
  full: '(min-width: 110rem) 76rem, (min-width: 48rem) 78vw, 100vw',
  split: '(min-width: 48rem) 39vw, 100vw',
  sequence: '(min-width: 64rem) 20vw, 50vw',
  annotated: '(min-width: 64rem) 45vw, 100vw',
  compare: '(min-width: 48rem) 39vw, 100vw',
  gallery: '(min-width: 64rem) 26vw, 50vw',
  pages: '(min-width: 64rem) 20vw, 50vw',
}

/** The few fields the client-side page index needs — never a whole media document. */
const pageShot = (resource: unknown): PageShot | undefined => {
  if (!resource || typeof resource !== 'object') return undefined
  const { alt, height, id, mimeType, updatedAt, url, width } = resource as PageShot
  return url ? { alt, height, id, mimeType, updatedAt, url, width } : undefined
}

/** Literal class strings so the Tailwind scanner sees every count. */
const SEQUENCE_COLUMNS: Record<number, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
}

const PLATE = 'border border-line bg-panel p-4 sm:p-8 lg:p-12'

/** Same-aspect sets keep reading order in a grid; mixed aspects pack into columns without holes. */
const sameAspect = (visuals: { media: unknown }[]) => {
  const ratios = visuals.map(({ media }) => {
    const { width, height } = (media ?? {}) as { width?: number | null; height?: number | null }
    return width && height ? Math.round((width / height) * 100) : null
  })
  return ratios.every((ratio) => ratio !== null && ratio === ratios[0])
}

/**
 * DS-30 figure patterns. Every layout stacks or halves on phones (a pair stacks, a sequence goes
 * two-up) — never a body-level horizontal scroll. Rows made only of phone screens sit on the
 * drafting plate as one composition; mixed or landscape rows keep their natural aspect.
 */
export const FigureBlock: React.FC<FigureBlockProps> = ({
  annotations,
  caption,
  copy,
  items,
  layout,
  locale,
  number,
  treatment,
}) => {
  const visuals = (items ?? []).filter(
    (item): item is Visual & { media: object } => typeof item.media === 'object' && !!item.media,
  )
  if (!visuals.length) return null

  const label = `${copy.figure} ${number}`
  const sizes = SIZES[layout]
  const allScreens = visuals.every((item) => resolveTreatment(treatment, item.media) === 'screen')

  const cell = (
    item: Visual,
    i: number,
    lead?: React.ReactNode,
    className?: string,
    mediaClassName?: string,
  ) => (
    <div className={cn('flex flex-col gap-3', className)} key={item.id ?? i}>
      {lead}
      <FigureMedia
        className={mediaClassName}
        resource={item.media}
        sizes={sizes}
        standalone={layout === 'full' || layout === 'annotated'}
        treatment={treatment}
      />
      {item.caption ? <p className="text-caption text-ink-3">{item.caption}</p> : null}
    </div>
  )

  let body: React.ReactNode
  switch (layout) {
    case 'split':
      body = (
        <div
          className={cn('grid gap-4 md:grid-cols-2 md:gap-6', allScreens && PLATE)}
          style={allScreens ? PLATE_STYLE : undefined}
        >
          {visuals.slice(0, 2).map((item, i) => cell(item, i))}
        </div>
      )
      break
    case 'sequence': {
      const row = visuals.slice(0, 4)
      body = (
        <div
          className={cn(
            'grid grid-cols-2 gap-3 md:gap-6',
            SEQUENCE_COLUMNS[row.length] ?? 'lg:grid-cols-4',
            allScreens && PLATE,
          )}
          style={allScreens ? PLATE_STYLE : undefined}
        >
          {row.map((item, i) => cell(item, i))}
        </div>
      )
      break
    }
    case 'annotated': {
      const key = (annotations ?? []).filter((a) => a.text?.trim())
      // A full-page portrait capture shown whole (the key points at parts below the first
      // viewport) is kept to a phone's width on large screens instead of filling the column.
      const tall =
        isPortraitMedia(visuals[0]!.media) &&
        resolveTreatment(treatment, visuals[0]!.media) !== 'screen'
      body = (
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-12">
          {cell(visuals[0]!, 0, undefined, 'lg:col-span-7', tall ? 'lg:max-w-xs' : undefined)}
          {key.length ? (
            <ol className="flex flex-col gap-4 lg:col-span-5 lg:pt-2">
              {key.map((a, i) => (
                <li className="flex gap-4 text-small text-foreground" key={a.id ?? i}>
                  <span className="index-code shrink-0 pt-0.5">{pad(i + 1)}</span>
                  <span>{a.text}</span>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      )
      break
    }
    case 'compare':
      body = (
        <div
          className={cn('grid gap-6 md:grid-cols-2 md:gap-8', allScreens && PLATE)}
          style={allScreens ? PLATE_STYLE : undefined}
        >
          {visuals
            .slice(0, 2)
            .map((item, i) =>
              cell(
                item,
                i,
                <span className="eyebrow text-ink-3">
                  {i === 0 ? copy.compare.before : copy.compare.after}
                </span>,
              ),
            )}
        </div>
      )
      break
    case 'gallery':
      body = sameAspect(visuals) ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
          {visuals.map((item, i) => cell(item, i))}
        </div>
      ) : (
        <div className="columns-2 gap-3 md:columns-3 md:gap-6">
          {visuals.map((item, i) => cell(item, i, undefined, 'mb-3 break-inside-avoid md:mb-6'))}
        </div>
      )
      break
    case 'pages':
      body = (
        <PageIndex
          copy={copy.pages}
          locale={locale}
          pages={visuals.flatMap((item, i): PageEntry[] => {
            const desktop = pageShot(item.media)
            if (!desktop) return []
            return [
              {
                id: item.id ?? String(i),
                label: item.caption || pad(i + 1),
                desktop,
                mobile: pageShot(item.mobile),
                desktopFull: pageShot(item.full),
                mobileFull: pageShot(item.mobileFull),
              },
            ]
          })}
        />
      )
      break
    default:
      body = cell(visuals[0]!, 0)
  }

  return (
    <figure>
      {body}
      <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-caption text-ink-3">
        <span className="eyebrow text-ink-3">{label}</span>
        {caption ? <span className="max-w-measure">{caption}</span> : null}
      </figcaption>
    </figure>
  )
}
