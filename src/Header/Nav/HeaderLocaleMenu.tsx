'use client'

import { Globe } from 'lucide-react'
import React, { useEffect, useId, useRef, useState } from 'react'

import { localeDestinations } from '@/components/LocaleSwitcher/destinations'
import type { Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'
import { uiCopy } from '@/utilities/uiCopy'

interface HeaderLocaleMenuProps {
  className?: string
  locale: Locale
  logicalPath: string
  readiness: Partial<Record<Locale, boolean>>
}

export const HeaderLocaleMenu: React.FC<HeaderLocaleMenuProps> = ({ className, locale, logicalPath, readiness }) => {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const id = useId()
  const label = uiCopy[locale].language
  const options = localeDestinations(locale, logicalPath, readiness)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  return (
    <div
      className={cn('relative', className)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.preventDefault()
          setOpen(false)
          triggerRef.current?.focus()
        }
      }}
      ref={rootRef}
    >
      <button
        aria-controls={id}
        aria-expanded={open}
        aria-label={label}
        className="inline-flex size-(--size-control-height-sm) items-center justify-center rounded-control text-foreground transition-colors duration-(--duration-fast) ease-standard hover:bg-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        onClick={() => setOpen((value) => !value)}
        ref={triggerRef}
        title={label}
        type="button"
      >
        <Globe aria-hidden className="size-[1.0625rem]" />
      </button>
      {open && (
        <div className="absolute end-0 top-full z-30 mt-2 min-w-44 border border-line bg-background p-2" id={id}>
          <p className="eyebrow border-b border-line px-2 pb-2 text-ink-3">{options.find((option) => option.current)?.label}</p>
          <ul className="pt-1">
            {options.filter((option) => !option.current).map((option) => (
              <li key={option.locale}>
                <a
                  aria-label={option.switchLabel}
                  className="block px-2 py-1.5 text-small text-foreground hover:bg-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  dir="auto"
                  href={option.href}
                  hrefLang={option.locale}
                  lang={option.locale}
                >
                  {option.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
