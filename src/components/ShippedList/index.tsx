import { cn } from '@/utilities/ui'
import React from 'react'

import type { Locale } from '@/utilities/locale'
import { DEFAULT_LOCALE } from '@/utilities/locale'

/**
 * DS-27 "What shipped" list: 3–4 concrete outcomes under a small mono label. The label is
 * configurable because marketing work ships campaigns, not apps.
 */
export const SHIPPED_LABELS = {
  shipped: { en: 'What shipped', fa: 'چه چیزی منتشر شد' },
  changed: { en: 'What changed', fa: 'چه چیزی تغییر کرد' },
  learned: { en: 'What we learned', fa: 'چه یاد گرفتیم' },
} as const satisfies Record<string, Record<Locale, string>>
export type ShippedLabel = keyof typeof SHIPPED_LABELS

export interface ShippedListProps {
  items: string[]
  /** A preset key or a free label. */
  label?: ShippedLabel | string
  locale?: Locale
  className?: string
}

const isPreset = (l: string): l is ShippedLabel => l in SHIPPED_LABELS

export const ShippedList: React.FC<ShippedListProps> = ({ className, items, label = 'shipped', locale = DEFAULT_LOCALE }) => {
  if (!items.length) return null
  const text = isPreset(label) ? SHIPPED_LABELS[label][locale] : label

  return (
    <section className={cn('border-t border-line pt-6 flex flex-col gap-4', className)}>
      <h3 className="eyebrow text-ink-3">{text}</h3>
      <ul className="flex flex-col gap-3">
        {items.map((item, i) => (
          <li className="flex gap-4 text-small text-foreground" key={i}>
            <span aria-hidden className="text-brand font-mono shrink-0 rtl:-scale-x-100">
              ↳
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
