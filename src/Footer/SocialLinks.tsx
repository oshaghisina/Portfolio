import { Mail } from 'lucide-react'
import React from 'react'

export interface SocialLinkItem {
  kind?: ('linkedin' | 'email') | null
  href?: string | null
  ariaLabel?: string | null
  id?: string | null
}

/** lucide-react has no brand glyphs, so LinkedIn gets a small inline SVG; email reuses lucide's Mail. */
const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg aria-hidden className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
  </svg>
)

export const SocialLinks: React.FC<{ items?: SocialLinkItem[] | null; className?: string }> = ({ className, items }) => {
  const links = (items ?? []).filter(
    (item): item is SocialLinkItem & { kind: 'linkedin' | 'email'; href: string } => Boolean(item.href && item.kind),
  )
  if (!links.length) return null

  return (
    <div className={className ?? 'flex gap-3'}>
      {links.map((item, i) => (
        <a
          aria-label={item.ariaLabel ?? undefined}
          className="flex size-8 items-center justify-center border border-line text-ink-3 transition-colors duration-(--duration-fast) hover:border-foreground hover:text-foreground"
          href={item.href}
          key={item.id ?? i}
          rel={item.kind === 'email' ? undefined : 'noopener noreferrer'}
          target={item.kind === 'email' ? undefined : '_blank'}
        >
          {item.kind === 'email' ? <Mail aria-hidden className="size-3.5" /> : <LinkedInIcon className="size-3.5" />}
        </a>
      ))}
    </div>
  )
}
