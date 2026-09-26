import { cn } from '@/utilities/ui'
import React from 'react'

import { resolveCompany, type CompanyMark, type CompanyMarkFit } from './companyLogos'

/**
 * One or two employer brand marks for an ExperienceGrid cell.
 *
 * Decorative by design: the company name is the cell's h3, so every image is `alt=""` +
 * `aria-hidden` and a screen reader announces the name exactly once.
 *
 * Plain `<img>`, not `next/image`: `images.localPatterns` in next.config.ts only permits
 * `/api/media/file/**`. Greyscale at rest in both themes; native brand colour on cell
 * `group-hover` / `group-focus-within`. Never mirror in RTL — brand marks are not
 * directional UI.
 */

const FRAME = 'flex h-8 max-w-32 shrink-0 items-center justify-end gap-2'

const FIT: Record<CompanyMarkFit, string> = {
  wordmark: 'max-h-5 max-w-28',
  lockup: 'max-h-8 max-w-24',
  tile: 'max-h-7 max-w-7',
}

const REST =
  'grayscale opacity-70 transition-[filter,opacity] duration-(--duration-fast) motion-reduce:transition-none group-hover:grayscale-0 group-hover:opacity-100 group-focus-within:grayscale-0 group-focus-within:opacity-100'

export interface CompanyLogoProps {
  className?: string
  companyKey: string
}

function markTreatment(mark: CompanyMark): string {
  const onLight = mark.onLight === 'invert' ? 'invert dark:invert-0' : ''
  const onDark =
    mark.onDark === 'invert'
      ? 'dark:invert dark:group-hover:invert-0 dark:group-focus-within:invert-0'
      : ''
  return cn(onLight, onDark)
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({ className, companyKey }) => {
  const entry = resolveCompany(companyKey)
  if (!entry?.marks.length) return null

  /* eslint-disable @next/next/no-img-element -- local PNG; next/image is blocked by images.localPatterns */
  return (
    <span aria-hidden className={cn(FRAME, className)}>
      {entry.marks.map((mark) => (
        <img
          alt=""
          aria-hidden
          className={cn(
            'h-auto w-auto object-contain',
            FIT[mark.fit],
            REST,
            markTreatment(mark),
          )}
          decoding="async"
          height={mark.height}
          key={mark.src}
          loading="lazy"
          src={mark.src}
          width={mark.width}
        />
      ))}
    </span>
  )
  /* eslint-enable @next/next/no-img-element */
}
