'use client'

import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import React, { useEffect, useId, useRef, useState } from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { capDensity } from '@/components/Media/responsive'
import { isRtl, type Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

import type { CaseStudyCopy } from './copy'
import { pad } from './plate'
import { ScreenFrame } from './ScreenFrame'

/**
 * What the client needs of an upload — not the whole media document. A first screen also carries
 * its scaled copies (only the fields a `srcset` reads), so a tile loads one of those; a whole
 * page opens as the original.
 */
export type PageShot = Pick<
  MediaType,
  'alt' | 'filesize' | 'height' | 'id' | 'mimeType' | 'sizes' | 'updatedAt' | 'url' | 'width'
>

/**
 * One page of the site: its first screen at desktop and phone width, and each whole page. An
 * app's screen has the phone width only.
 */
export interface PageEntry {
  id: string
  label: string
  /** The section the page belongs to (an app's flow); two or more sections become the tabs. */
  group?: string
  desktop?: PageShot
  mobile?: PageShot
  desktopFull?: PageShot
  mobileFull?: PageShot
}

type View = 'desktop' | 'mobile'

/** A tab of the index: every page at one width, or one section's pages. */
interface Tab {
  key: string
  label: string
  view: View
  entries: PageEntry[]
}

/** A sheet of the index: four rows of three, three of four or two of six — never a long wall. */
const PER_SHEET = 12

/**
 * Tile widths measured at 360–2560 px (R11): two, three, then four desktop tiles a row; three,
 * four, then six phone screens.
 */
const TILE_SIZES: Record<View, string> = {
  desktop: '(min-width: 1800px) 266px, (min-width: 1024px) 15vw, (min-width: 768px) 23.5vw, 47vw',
  mobile:
    '(min-width: 1800px) 170px, (min-width: 1024px) 9.5vw, (min-width: 768px) 17vw, (min-width: 640px) 22.5vw, 30vw',
}

const firstScreen = (entry: PageEntry, view: View) =>
  view === 'desktop' ? entry.desktop : entry.mobile
const wholePage = (entry: PageEntry, view: View) =>
  (view === 'desktop' ? entry.desktopFull : entry.mobileFull) ?? firstScreen(entry, view)

const CONTROL =
  'grid size-10 shrink-0 place-items-center border border-line text-ink-2 transition-colors duration-(--duration-fast) ease-standard hover:border-ink-3 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

export interface PageIndexProps {
  copy: CaseStudyCopy['pages']
  locale: Locale
  pages: PageEntry[]
}

/**
 * DS-25 inside a case study: every page of a site as an index, with viewport tabs and their
 * counts, sheets of twelve first screens, and a viewer that opens the whole page. When every page
 * names a section and there are two or more, the sections are the tabs instead — an app's screens,
 * flow by flow, at the one width they have. The grid only ever loads twelve thumbnails; a
 * whole-page capture loads when it is opened. Captures are never mirrored in RTL — only the
 * controls are.
 */
export const PageIndex: React.FC<PageIndexProps> = ({ copy, locale, pages }) => {
  const baseId = useId()
  const views = (['desktop', 'mobile'] as const).filter((view) =>
    pages.some((entry) => firstScreen(entry, view)),
  )
  const groups = [...new Set(pages.map((entry) => entry.group))]
  const grouped = groups.length > 1 && groups.every(Boolean)
  const tabs: Tab[] = (
    grouped
      ? groups.map((group) => {
          const view = views[0] ?? 'desktop'
          return {
            key: `group-${group}`,
            label: group!,
            view,
            entries: pages.filter((entry) => entry.group === group && firstScreen(entry, view)),
          }
        })
      : views.map((view) => ({
          key: view,
          label: copy[view],
          view,
          entries: pages.filter((entry) => firstScreen(entry, view)),
        }))
  ).filter((tab) => tab.entries.length)
  const [selected, setSelected] = useState(0)
  const [sheet, setSheet] = useState(0)
  const [open, setOpen] = useState<number | null>(null)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const panelRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const overflowRef = useRef('')
  const rowRef = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ start: false, end: false })

  const rtl = isRtl(locale)
  const at = Math.min(selected, Math.max(0, tabs.length - 1))
  const tab = tabs[at]
  const view = tab?.view ?? 'desktop'
  const list = tab?.entries ?? []
  const sheets = Math.max(1, Math.ceil(list.length / PER_SHEET))
  const current = Math.min(sheet, sheets - 1)
  const start = current * PER_SHEET
  const shown = list.slice(start, start + PER_SHEET)
  const entry = open === null ? undefined : list[open]
  const whole = entry ? wholePage(entry, view) : undefined

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open === null) {
      if (dialog.open) dialog.close()
      return
    }
    if (!dialog.open) {
      overflowRef.current = document.documentElement.style.overflow
      document.documentElement.style.overflow = 'hidden'
      dialog.showModal()
    }
    const viewer = viewerRef.current
    if (!viewer) return
    viewer.scrollTop = 0
    viewer.focus({ preventScroll: true })
  }, [open])

  // Leaving the page with the viewer open must not leave the document unscrollable.
  useEffect(
    () => () => {
      if (dialogRef.current?.open) document.documentElement.style.overflow = overflowRef.current
    },
    [],
  )

  // On a phone the sections run in one row that scrolls sideways: note which edge hides more.
  useEffect(() => {
    const row = rowRef.current
    if (!row || !grouped) return
    const measure = () => {
      const hidden = row.scrollWidth - row.clientWidth
      // Right to left, the row scrolls to negative offsets.
      const scrolled = Math.abs(row.scrollLeft)
      const start = hidden > 1 && scrolled > 1
      const end = hidden > 1 && scrolled < hidden - 1
      setEdges((was) => (was.start === start && was.end === end ? was : { start, end }))
    }
    measure()
    row.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      row.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [grouped])

  if (!list.length) return null

  const chooseTab = (index: number) => {
    if (!tabs[index]) return
    // Another width shows the same pages, so the sheet stays; another section starts at its first.
    if (grouped && index !== at) setSheet(0)
    setSelected(index)
    const element = tabsRef.current[index]
    element?.focus({ preventScroll: true })
    // A row of sections outruns a phone's width: keep the chosen one in sight.
    if (typeof element?.scrollIntoView === 'function') {
      element.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }
  }

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    let next: number
    switch (event.key) {
      case 'ArrowLeft':
        next = rtl ? at + 1 : at - 1
        break
      case 'ArrowRight':
        next = rtl ? at - 1 : at + 1
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = tabs.length - 1
        break
      default:
        return
    }
    if (next < 0 || next >= tabs.length) return
    event.preventDefault()
    chooseTab(next)
  }

  const turnTo = (next: number) => {
    setSheet(next)
    const panel = panelRef.current
    if (panel && panel.getBoundingClientRect().top < 0) panel.scrollIntoView({ block: 'start' })
  }

  const step = (delta: number) =>
    setOpen((index) => (index === null ? index : (index + delta + list.length) % list.length))

  const onDialogKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    step((event.key === 'ArrowRight') !== rtl ? 1 : -1)
  }

  const onDialogClose = () => {
    document.documentElement.style.overflow = overflowRef.current
    setOpen(null)
    openerRef.current?.focus({ preventScroll: true })
  }

  const closeOnBackdrop = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) dialogRef.current?.close()
  }

  const tabId = (index: number) => `${baseId}-tab-${index}`
  const panelId = `${baseId}-panel`
  const titleId = `${baseId}-title`
  // The row's start is its right edge in RTL.
  const fadeLeft = rtl ? edges.end : edges.start
  const fadeRight = rtl ? edges.start : edges.end
  const rowMask =
    fadeLeft || fadeRight
      ? `linear-gradient(to right, ${fadeLeft ? 'transparent' : '#000'}, #000 2rem, #000 calc(100% - 2rem), ${fadeRight ? 'transparent' : '#000'})`
      : undefined

  return (
    <div data-reveal-skip="">
      {tabs.length > 1 ? (
        // An app's sections are DS-22 chips: from `lg` they wrap, every one in view, since tabs
        // stacked in rows read as tiers. On a phone or tablet they run in one row that scrolls
        // sideways, its hidden edge faded — wrapped there, fourteen flows took four rows before
        // the first screen (`data-lenis-prevent-horizontal` leaves the swipe to the row; the
        // padding keeps focus rings inside the scroll box). The two widths stay tabs on one rule,
        // an inset shadow, since a scroll box would clip an indicator hung over a border.
        <div
          aria-label={grouped ? copy.groups : copy.views}
          className={cn(
            'flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
            grouped
              ? '-mx-1 scroll-px-8 gap-2 p-1 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:p-0'
              : 'gap-x-8 shadow-[inset_0_-1px_0_var(--color-line)]',
          )}
          data-lenis-prevent-horizontal=""
          onKeyDown={onTabKeyDown}
          ref={rowRef}
          role="tablist"
          style={rowMask ? { maskImage: rowMask, WebkitMaskImage: rowMask } : undefined}
        >
          {tabs.map((option, index) => {
            const chosen = index === at
            return (
              <button
                aria-controls={panelId}
                aria-selected={chosen}
                className={cn(
                  'relative flex shrink-0 whitespace-nowrap',
                  'transition-colors duration-(--duration-fast) ease-standard',
                  'focus-visible:outline-2 focus-visible:outline-ring',
                  grouped
                    ? 'h-9 items-center gap-2 rounded-chip border px-3 focus-visible:outline-offset-2'
                    : 'h-11 items-baseline gap-2 py-3 hover:text-foreground focus-visible:-outline-offset-2',
                  grouped &&
                    (chosen
                      ? 'border-brand bg-brand text-brand-foreground'
                      : 'border-line text-ink-2 hover:border-ink-3 hover:text-foreground'),
                  !grouped && (chosen ? 'text-foreground' : 'text-ink-3'),
                )}
                id={tabId(index)}
                key={option.key}
                onClick={() => chooseTab(index)}
                ref={(element) => {
                  tabsRef.current[index] = element
                }}
                role="tab"
                tabIndex={chosen ? 0 : -1}
                type="button"
              >
                {chosen && !grouped ? (
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-brand" />
                ) : null}
                <span className="eyebrow text-current">{option.label}</span>
                <span
                  className={cn('index-code', grouped && chosen && 'text-current opacity-75')}
                  dir="ltr"
                >
                  {option.entries.length}
                </span>
              </button>
            )
          })}
        </div>
      ) : null}

      <div
        aria-labelledby={tabs.length > 1 ? tabId(at) : undefined}
        className="scroll-mt-28 pt-6"
        id={panelId}
        ref={panelRef}
        role={tabs.length > 1 ? 'tabpanel' : undefined}
      >
        <ol
          className={cn(
            'grid gap-x-3 gap-y-6 md:gap-x-5',
            view === 'desktop'
              ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              : 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-6',
          )}
        >
          {shown.map((page, i) => {
            const index = start + i
            const shot = firstScreen(page, view)!
            return (
              <li key={`${view}-${page.id}`}>
                <button
                  aria-label={`${page.label} — ${copy.open}`}
                  className="group flex w-full flex-col gap-2 text-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  onClick={(event) => {
                    openerRef.current = event.currentTarget
                    setOpen(index)
                  }}
                  type="button"
                >
                  {view === 'desktop' ? (
                    <Media
                      className="relative aspect-[1440/900] w-full overflow-hidden rounded-media border border-line bg-panel transition-colors duration-(--duration-fast) ease-standard group-hover:border-ink-3"
                      fill
                      imgClassName="object-cover object-top"
                      resource={shot as MediaType}
                      size={TILE_SIZES.desktop}
                      usage="thumbnail"
                    />
                  ) : (
                    // ScreenFrame loads every screen as a readable figure; a tile is a
                    // preview, so its `sizes` arrive with the 2× cap already applied.
                    <ScreenFrame
                      className="w-full transition-colors duration-(--duration-fast) ease-standard group-hover:border-ink-3"
                      resource={shot as MediaType}
                      sizes={capDensity(TILE_SIZES.mobile)}
                    />
                  )}
                  <span className="flex items-baseline gap-2 text-caption">
                    <span className="index-code shrink-0" dir="ltr">
                      {pad(index + 1)}
                    </span>
                    <span className="min-w-0 break-words hyphens-auto text-ink-2 transition-colors duration-(--duration-fast) ease-standard group-hover:text-foreground">
                      {page.label}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>

        {sheets > 1 ? (
          <nav aria-label={copy.sheets} className="mt-8 flex flex-wrap gap-2">
            {Array.from({ length: sheets }, (_, index) => {
              const from = index * PER_SHEET + 1
              const to = Math.min(list.length, from + PER_SHEET - 1)
              const selected = index === current
              return (
                <button
                  aria-current={selected ? 'true' : undefined}
                  aria-label={copy.sheet
                    .replace('{from}', String(from))
                    .replace('{to}', String(to))}
                  className={cn(
                    CONTROL,
                    'index-code',
                    selected && 'border-ink-3 bg-panel text-foreground',
                  )}
                  dir="ltr"
                  key={index}
                  onClick={() => turnTo(index)}
                  type="button"
                >
                  {pad(index + 1)}
                </button>
              )
            })}
          </nav>
        ) : null}
      </div>

      {/* `data-lenis-prevent`: root-mode Lenis cancels every wheel event on the page, including
          ones meant for the viewer's own scroll area — this hands the wheel back to the browser. */}
      <dialog
        aria-labelledby={titleId}
        className="m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 text-foreground backdrop:bg-background/95 open:flex open:flex-col"
        data-lenis-prevent=""
        onClose={onDialogClose}
        onKeyDown={onDialogKeyDown}
        ref={dialogRef}
      >
        {entry && whole && open !== null ? (
          <>
            <div className="flex items-center gap-2 border-b border-line bg-background px-4 py-3 sm:gap-3 sm:px-6">
              <span className="index-code shrink-0" dir="ltr">
                {pad(open + 1)} / {pad(list.length)}
              </span>
              <p className="min-w-0 flex-1 truncate text-small text-foreground" id={titleId}>
                {entry.label}
                {/* The tab it came from — its width or its section. Only worth saying when there
                    is another tab: a deck of slides or a set of boards has none. */}
                {tab && tabs.length > 1 ? <span className="text-ink-3"> · {tab.label}</span> : null}
              </p>
              <button
                aria-label={copy.previous}
                className={CONTROL}
                onClick={() => step(-1)}
                type="button"
              >
                <ArrowLeft aria-hidden className="size-4 rtl:-scale-x-100" />
              </button>
              <button
                aria-label={copy.next}
                className={CONTROL}
                onClick={() => step(1)}
                type="button"
              >
                <ArrowRight aria-hidden className="size-4 rtl:-scale-x-100" />
              </button>
              <button
                aria-label={copy.close}
                className={CONTROL}
                onClick={() => dialogRef.current?.close()}
                type="button"
              >
                <X aria-hidden className="size-4" />
              </button>
            </div>
            <div
              aria-labelledby={titleId}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain outline-none"
              onClick={closeOnBackdrop}
              ref={viewerRef}
              role="region"
              tabIndex={-1}
            >
              <div
                className={cn(
                  'mx-auto px-4 py-6 sm:px-8 sm:py-10',
                  view === 'desktop' ? 'max-w-7xl' : 'max-w-[26rem]',
                )}
                onClick={closeOnBackdrop}
              >
                <Media
                  className="overflow-hidden rounded-media border border-line bg-panel"
                  imgClassName="h-auto w-full"
                  key={whole.id}
                  loading="eager"
                  resource={whole as MediaType}
                  size={view === 'desktop' ? '(min-width: 80rem) 80rem, 100vw' : '26rem'}
                  usage="viewer"
                />
              </div>
            </div>
          </>
        ) : null}
      </dialog>
    </div>
  )
}
