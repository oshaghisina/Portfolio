'use client'

import { cn } from '@/utilities/ui'
import { useLenis } from 'lenis/react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useId, useRef, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { hrefFromLink } from '@/components/Link'
import { Signature } from '@/components/Signature'
import { Button } from '@/components/ui/button'
import { isActivePath, localePath, localizeInternalHref, parseLocalePath } from '@/i18n/navigation'
import type { Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'

/** Full-screen site navigation, retaining native dialog focus, Escape, and inert-page behavior. */
export interface MobileNavProps {
  data: HeaderType
  locale: Locale
  /** Bottom region; the global header supplies its inline language list. */
  foot?: React.ReactNode
  /** Show the trigger at every width (style guide); default is below `xl`. */
  alwaysVisible?: boolean
  className?: string
}

export const MobileNav: React.FC<MobileNavProps> = ({ alwaysVisible = false, className, data, foot, locale }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const id = useId()
  const navItems = data?.navItems || []
  const lenis = useLenis()

  const close = useCallback(() => setOpen(false), [])

  // The drawer's own backdrop doesn't stop Lenis's window-level wheel listener from smooth-
  // scrolling the page underneath it — pause/resume inertial scroll in sync with the dialog.
  useEffect(() => {
    if (open) lenis?.stop()
    else lenis?.start()
  }, [open, lenis])

  // Drive the native element from state so React owns the open/close lifecycle.
  // (jsdom has no showModal/close — hence the guards.)
  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (open && !el.open) {
      if (typeof el.showModal === 'function') el.showModal()
      else el.setAttribute('open', '')
    } else if (!open && el.open) {
      if (typeof el.close === 'function') el.close()
      else el.removeAttribute('open')
    }
  }, [open])

  // Navigating closes the drawer: close the element, the `close` event updates state.
  useEffect(() => {
    const el = dialogRef.current
    if (el?.open && typeof el.close === 'function') el.close()
  }, [pathname])

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const fullNav = window.matchMedia('(min-width: 80rem)')
    const closeAtDesktop = () => {
      if (fullNav.matches) close()
    }
    fullNav.addEventListener('change', closeAtDesktop)
    closeAtDesktop()
    return () => fullNav.removeEventListener('change', closeAtDesktop)
  }, [close])

  return (
    <div className={cn(!alwaysVisible && 'xl:hidden', className)}>
      <Button
        aria-controls={id}
        aria-expanded={open}
        aria-label={uiCopy[locale].openMenu}
        className="hover:translate-y-0"
        onClick={() => setOpen(true)}
        size="icon-sm"
        variant="ghost"
      >
        <Menu />
      </Button>

      <dialog
        aria-label={uiCopy[locale].openMenu}
        className={cn(
          'fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-background p-0 text-foreground',
          'open:flex open:flex-col',
          'open:animate-in open:fade-in-0 open:duration-(--duration-fast) open:ease-standard motion-reduce:open:animate-none',
        )}
        id={id}
        onCancel={(e) => {
          e.preventDefault()
          close()
        }}
        onClose={close}
        ref={dialogRef}
      >
        <div className="canvas flex h-full min-h-0 flex-col">
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-line">
            <Link
              aria-label="Sina Oshaghi"
              className="text-foreground transition-opacity duration-(--duration-fast) hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              href={localePath(locale, '/')}
              onClick={close}
            >
              <Signature className="h-9" />
            </Link>
            <Button aria-label={uiCopy[locale].closeMenu} autoFocus className="hover:translate-y-0" onClick={close} size="icon-sm" variant="ghost">
              <X />
            </Button>
          </div>

          <nav className="min-h-0 flex-1 overflow-y-auto pt-5" id={`${id}-navigation`}>
            <ol className="flex flex-col">
              {navItems.map(({ link }, i) => {
              // An untranslated locale leaves `label` empty — a numbered link with no name is
              // the same "visible but empty" failure `CMSLink` guards against, so skip it too
              // (this drawer builds its own `<Link>` rather than going through `CMSLink`).
              if (!link?.label) return null

              const logicalHref = hrefFromLink(link) ?? '#'
              const active = isActivePath(parseLocalePath(pathname).logicalPath, logicalHref)
              const href = localizeInternalHref(locale, logicalHref)
                return (
                  <li className="border-b border-line" key={i}>
                    <Link
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex items-baseline gap-4 border-s-2 py-4 ps-3 text-track-title font-medium transition-[color,border-color] duration-(--duration-fast) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                        active ? 'border-brand text-foreground' : 'border-transparent text-ink-2 hover:border-line hover:text-foreground',
                      )}
                      href={href}
                      onClick={close}
                      {...(link?.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
                    >
                      <span className="index-code">{String(i + 1).padStart(2, '0')}</span>
                      {link?.label}
                    </Link>
                  </li>
                )
              })}
            </ol>
          </nav>

          {foot ? <div className="shrink-0 border-t border-line pb-6 pt-5">{foot}</div> : null}
        </div>
      </dialog>
    </div>
  )
}
