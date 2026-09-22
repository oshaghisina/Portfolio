import { Dribbble, Instagram, Mail } from 'lucide-react'
import React from 'react'

import type { Footer } from '@/payload-types'

/** Derived from the generated global so the platform union lives in `Footer/config.ts` alone. */
export type SocialLinkItem = NonNullable<Footer['social']>[number]
type SocialKind = SocialLinkItem['kind']

/**
 * Fixed display order, independent of admin row order — the same order `kind`'s options are
 * listed in `Footer/config.ts`. Identity channels first, portfolios last.
 */
const ORDER = ['email', 'linkedin', 'telegram', 'instagram', 'dribbble', 'behance'] as const

type IconProps = { 'aria-hidden'?: boolean; className?: string }

/** Shared lucide geometry, so the hand-drawn marks below sit at the same weight as the lucide ones. */
const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: 2,
  viewBox: '0 0 24 24',
} as const

/** lucide-react has no LinkedIn-style solid glyph here; kept as the original inline mark. */
const LinkedInIcon: React.FC<IconProps> = ({ className }) => (
  <svg aria-hidden className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
  </svg>
)

/** Neither Telegram nor Behance ships with lucide, so both are drawn to match its stroke language. */
const TelegramIcon: React.FC<IconProps> = ({ className }) => (
  <svg aria-hidden className={className} {...strokeProps}>
    <path d="M21.9 3.2 2.5 10.8a.55.55 0 0 0 .03 1.04l4.8 1.55 1.86 5.5a.55.55 0 0 0 .98.15l2.5-3.3 4.8 3.55a.55.55 0 0 0 .87-.32L22.8 3.9a.55.55 0 0 0-.9-.7Z" />
    <path d="m9.33 13.39 9.9-8.4" />
  </svg>
)

const BehanceIcon: React.FC<IconProps> = ({ className }) => (
  <svg aria-hidden className={className} {...strokeProps}>
    <path d="M2 5h4.4a3.25 3.25 0 0 1 0 6.5H2Z" />
    <path d="M2 11.5h4.6a3.75 3.75 0 0 1 0 7.5H2Z" />
    <path d="M14.5 6H21" />
    <path d="M17.9 10.1a4.4 4.4 0 1 0 3.6 6.92" />
    <path d="M13.5 14.5h8.8" />
  </svg>
)

const ICONS: Record<SocialKind, React.FC<IconProps>> = {
  behance: BehanceIcon,
  dribbble: Dribbble,
  email: Mail,
  instagram: Instagram,
  linkedin: LinkedInIcon,
  telegram: TelegramIcon,
}

export const SocialLinks: React.FC<{ items?: SocialLinkItem[] | null; className?: string }> = ({ className, items }) => {
  const rows = items ?? []
  // One row per platform: a second row for the same `kind` is ignored rather than rendered twice.
  const links = ORDER.map((kind) => rows.find((item) => item.kind === kind && item.href)).filter(
    (item): item is SocialLinkItem => Boolean(item),
  )
  if (!links.length) return null

  return (
    <div className={className ?? 'flex flex-wrap gap-3'}>
      {links.map((item, i) => {
        const Icon = ICONS[item.kind]
        const isExternal = item.kind !== 'email'

        return (
          <a
            aria-label={item.ariaLabel ?? undefined}
            className="flex size-8 shrink-0 items-center justify-center border border-line text-ink-3 transition-colors duration-(--duration-fast) hover:border-foreground hover:text-foreground"
            href={item.href}
            key={item.id ?? i}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            target={isExternal ? '_blank' : undefined}
          >
            <Icon aria-hidden className="size-3.5" />
          </a>
        )
      })}
    </div>
  )
}
