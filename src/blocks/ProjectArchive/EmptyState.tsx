import React from 'react'

import type { Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import { cn } from '@/utilities/ui'

/** Editorial, not CMS-flavoured: one honest sentence when this locale has nothing published yet. */
export const EmptyState: React.FC<{ locale: Locale; className?: string }> = ({ className, locale }) => (
  <div className={cn('border-t border-line pt-section-sm', className)}>
    <p className="max-w-measure text-lede text-ink-2">{uiCopy[locale].workEmpty}</p>
  </div>
)
