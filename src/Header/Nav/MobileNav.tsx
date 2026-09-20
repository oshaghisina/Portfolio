'use client'

import { cn } from '@/utilities/ui'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useId, useRef, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { hrefFromLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import type { Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'

/**
 * DS-32 mobile drawer: numbered oversized links, the active one in brand, a foot row for
 * contact / location / language. A native <dialog> gives the focus trap, ESC, top layer
 * and an inert page for free; it slides in from the inline-end side (so from the left in RTL).
 */
export interface MobileNavProps {
  data: HeaderType
  locale: Locale
  /** Bottom row: contact, location, language switch … */
  foot?: React.ReactNode
  /** Show the trigger at every width (style guide); default is below `md`. */
  alwaysVisible?: boolean
  className?: string
}

export const MobileNav: React.FC<MobileNavProps> = ({ alwaysVisible = false, className, data, foot, locale }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const id = useId()
  const navItems = data?.navItems || []

  const close = useCallback(() => setOpen(false), [])

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

  return (
    <div className={cn(!alwaysVisible && 'md:hidden', className)}>
      <Button
        aria-controls={id}
        aria-expanded={open}
        aria-label={uiCopy[locale].openMenu}
        onClick={() => setOpen(true)}
        size="icon-sm"
        variant="ghost"
      >
        <Menu />
      </Button>

      <dialog
        aria-label={uiCopy[locale].openMenu}
        className={cn(
          // reset the UA dialog box, then pin to the inline-end edge
          'fixed inset-y-0 end-0 start-auto m-0 h-dvh max-h-none w-full max-w-sm p-0',
          'bg-background text-foreground border-s border-line',
          'backdrop:bg-ink/40 backdrop:backdrop-blur-[2px]',
          'open:flex flex-col',
          'open:animate-in open:slide-in-from-right rtl:open:slide-in-from-left open:duration-(--duration-base) open:ease-standard',
        )}
        id={id}
        onCancel={(e) => {
          e.preventDefault()
          close()
        }}
        onClick={(e) => {
          // backdrop click — the dialog itself is the event target
          if (e.target === e.currentTarget) close()
        }}
        onClose={close}
        ref={dialogRef}
      >
        <div className="flex items-center justify-end px-4 pt-4">
          <Button aria-label={uiCopy[locale].closeMenu} autoFocus onClick={close} size="icon-sm" variant="ghost">
            <X />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 pt-10">
          <ol className="flex flex-col">
            {navItems.map(({ link, labelFa }, i) => {
              const href = hrefFromLink(link) ?? '#'
              const active = pathname === href
              return (
                <li className="border-b border-line" key={i}>
                  <Link
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex items-baseline gap-4 py-5 text-h2 font-medium tracking-h2 transition-colors duration-(--duration-fast)',
                      active ? 'text-brand' : 'text-foreground hover:text-brand',
                    )}
                    href={href}
                    onClick={close}
                    {...(link?.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
                  >
                    <span className="index-code">{String(i + 1).padStart(2, '0')}</span>
                    {locale === 'fa' && labelFa ? labelFa : link?.label}
                  </Link>
                </li>
              )
            })}
          </ol>
        </nav>

        {foot ? <div className="mt-auto flex flex-wrap items-center justify-between gap-4 px-6 py-6 eyebrow">{foot}</div> : null}
      </dialog>
    </div>
  )
}
