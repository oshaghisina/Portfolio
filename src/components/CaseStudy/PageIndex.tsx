'use client'

import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import React, { useEffect, useId, useRef, useState } from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { isRtl, type Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

import type { CaseStudyCopy } from './copy'
import { pad } from './plate'
import { ScreenFrame } from './ScreenFrame'

/** What the client needs of an upload — not the whole media document with its seven sizes. */
export type PageShot = Pick<
  MediaType,
  'alt' | 'height' | 'id' | 'mimeType' | 'updatedAt' | 'url' | 'width'
>

/** One page of the site: its first screen at desktop and phone width, and each whole page. */
export interface PageEntry {
  id: string
  label: string
  desktop: PageShot
  mobile?: PageShot
  desktopFull?: PageShot
  mobileFull?: PageShot
}

type View = 'desktop' | 'mobile'

/** A sheet of the index: four rows of three, three of four or two of six — never a long wall. */
const PER_SHEET = 12

const TILE_SIZES: Record<View, string> = {
  desktop: '(min-width: 64rem) 20vw, (min-width: 48rem) 26vw, 50vw',
  mobile: '(min-width: 64rem) 13vw, (min-width: 40rem) 20vw, 33vw',
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
 * counts, sheets of twelve first screens, and a viewer that opens the whole page. The grid only
 * ever loads twelve thumbnails; a whole-page capture loads when it is opened. Captures are never
 * mirrored in RTL — only the controls are.
 */
export const PageIndex: React.FC<PageIndexProps> = ({ copy, locale, pages }) => {
  const baseId = useId()
  const views = (['desktop', 'mobile'] as const).filter((view) =>
    pages.some((entry) => firstScreen(entry, view)),
  )
  const [view, setView] = useState<View>(views[0] ?? 'desktop')
  const [sheet, setSheet] = useState(0)
  const [open, setOpen] = useState<number | null>(null)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const panelRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const overflowRef = useRef('')

  const rtl = isRtl(locale)
  const list = pages.filter((entry) => firstScreen(entry, view))
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

  if (!list.length) return null

  const chooseView = (index: number) => {
    const next = views[index]
    if (!next) return
    setView(next)
    tabsRef.current[index]?.focus({ preventScroll: true })
  }

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const at = views.indexOf(view)
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
        next = views.length - 1
        break
      default:
        return
    }
    if (next < 0 || next >= views.length) return
    event.preventDefault()
    chooseView(next)
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

  return (
    <div data-reveal-skip="">
      {views.length > 1 ? (
        <div
          aria-label={copy.views}
          className="flex border-b border-line"
          onKeyDown={onTabKeyDown}
          role="tablist"
        >
          {views.map((option, index) => {
            const selected = option === view
            return (
              <button
                aria-controls={panelId}
                aria-selected={selected}
                className={cn(
                  'relative flex min-h-11 items-baseline gap-2 px-4 py-3 first:ps-0',
                  'transition-colors duration-(--duration-fast) ease-standard',
                  'hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  selected ? 'text-foreground' : 'text-ink-3',
                )}
                id={tabId(index)}
                key={option}
                onClick={() => chooseView(index)}
                ref={(element) => {
                  tabsRef.current[index] = element
                }}
                role="tab"
                tabIndex={selected ? 0 : -1}
                type="button"
              >
                {selected ? (
                  <span aria-hidden className="absolute inset-x-0 -bottom-px h-0.5 bg-brand" />
                ) : null}
                <span className="eyebrow text-current">{copy[option]}</span>
                <span className="index-code" dir="ltr">
                  {pages.filter((page) => firstScreen(page, option)).length}
                </span>
              </button>
            )
          })}
        </div>
      ) : null}

      <div
        aria-labelledby={views.length > 1 ? tabId(views.indexOf(view)) : undefined}
        className="scroll-mt-28 pt-6"
        id={panelId}
        ref={panelRef}
        role={views.length > 1 ? 'tabpanel' : undefined}
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
                    />
                  ) : (
                    <ScreenFrame
                      className="w-full transition-colors duration-(--duration-fast) ease-standard group-hover:border-ink-3"
                      resource={shot as MediaType}
                      sizes={TILE_SIZES.mobile}
                    />
                  )}
                  <span className="flex items-baseline gap-2 text-caption">
                    <span className="index-code shrink-0" dir="ltr">
                      {pad(index + 1)}
                    </span>
                    <span className="text-ink-2 transition-colors duration-(--duration-fast) ease-standard group-hover:text-foreground">
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

      <dialog
        aria-labelledby={titleId}
        className="m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 text-foreground backdrop:bg-background/95 open:flex open:flex-col"
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
                <span className="text-ink-3"> · {copy[view]}</span>
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
                />
              </div>
            </div>
          </>
        ) : null}
      </dialog>
    </div>
  )
}
