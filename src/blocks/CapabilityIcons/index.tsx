import React from 'react'
import type { SkillKey } from './keys'
import { SkillArtwork } from '@/components/ExperienceVisuals/Artwork'
import { cn } from '@/utilities/ui'

const INK = 'var(--ink-3)'
const PAPER = 'var(--paper)'
const PANEL = 'var(--panel)'
const ACCENT = 'var(--track-accent)'

/** Optical small-size counterparts of the isometric scenes. No miniature drafting hairlines. */
const SKILL_MARKS: Record<SkillKey, React.ReactNode> = {
  'product-management': (
    <>
      <rect x="3" y="4" width="26" height="24" rx="1" fill={PANEL} />
      <path d="M3 11h26M11 11v17M20 11v17" />
      <path d="M6 16h2m6 6h3" strokeWidth="3" />
      <rect x="22" y="14" width="5" height="7" fill={ACCENT} stroke={ACCENT} />
    </>
  ),
  'product-discovery': (
    <>
      <path d="M5 7V4h22v19h-4M3 11v16h16" />
      <circle cx="19" cy="13" r="8" fill={PAPER} strokeWidth="2" />
      <path d="m13 20-8 8" strokeWidth="4" />
      <circle cx="19" cy="13" r="2.5" fill={ACCENT} stroke={ACCENT} />
    </>
  ),
  'service-design': (
    <>
      <path d="M3 12h26M3 24h26M8 12v12m16-12v12" />
      <circle cx="8" cy="6" r="3" fill={PAPER} />
      <circle cx="24" cy="6" r="3" fill={PAPER} />
      <rect x="5" y="21" width="6" height="6" fill={PANEL} />
      <rect x="21" y="21" width="6" height="6" fill={ACCENT} stroke={ACCENT} />
    </>
  ),
  requirements: (
    <>
      <rect x="3" y="3" width="12" height="25" rx="1" fill={PANEL} />
      <path d="M6 7h6M6 11h4M15 16h5V8h4m-4 8v9h4" />
      <rect x="24" y="5" width="5" height="6" fill={PAPER} />
      <rect x="24" y="22" width="5" height="6" fill={ACCENT} stroke={ACCENT} />
      <path d="m9 16 3 3-3 3-3-3Z" fill={INK} />
    </>
  ),
  'ai-product-development': (
    <>
      <rect x="2" y="4" width="7" height="11" fill={PANEL} />
      <path d="M4 7h3m-3 3h3M9 10h4m7 7v6h3" />
      <rect x="13" y="8" width="11" height="11" rx="1" fill={PAPER} />
      <path d="M16 5v3m5-3v3m-5 11v3M24 11h3m-3 5h3" />
      <path d="m16 13 2 2 4-5" stroke={ACCENT} strokeWidth="2" />
      <rect x="23" y="23" width="7" height="6" fill={PANEL} />
    </>
  ),
  'process-operations': (
    <>
      <path d="M5 9h22v16H6v-7m-3 3 3-3 3 3" />
      <rect x="3" y="6" width="6" height="6" fill={PANEL} />
      <rect x="23" y="6" width="6" height="6" fill={PAPER} />
      <rect x="13" y="6" width="6" height="6" fill={ACCENT} stroke={ACCENT} />
      <rect x="13" y="22" width="6" height="6" fill={PAPER} />
    </>
  ),
  'business-modeling': (
    <>
      <path d="M8 8h16v16H8Z" />
      <rect x="3" y="3" width="10" height="10" fill={PANEL} />
      <rect x="19" y="3" width="10" height="10" fill={PANEL} />
      <rect x="3" y="19" width="10" height="10" fill={PANEL} />
      <rect x="19" y="19" width="10" height="10" fill={PANEL} />
      <path d="M6 8h4m12 16 2-2 3 1M8 22v4m-2-2h4" />
      <circle cx="16" cy="16" r="3" fill={ACCENT} stroke={ACCENT} />
    </>
  ),
  'technical-pm': (
    <>
      <path d="m3 19 13 7 13-7M3 25l13 6 13-6" />
      <path d="M3 8 16 2l13 6v7l-13 7-13-7Z" fill={PANEL} />
      <path d="m3 8 13 7 13-7m-13 7v7" />
      <path d="M24 18v10" stroke={ACCENT} strokeWidth="2.5" />
    </>
  ),
  'documentation-spec': (
    <>
      <path d="M3 3h11l4 4v21H3Z" fill={PANEL} />
      <path d="M14 3v5h4M6 12h8m-8 5h8m-8 5h5M18 16h4V7h4m-4 9v9h4" />
      <rect x="26" y="4" width="4" height="6" fill={PAPER} />
      <rect x="26" y="22" width="4" height="6" fill={PAPER} />
      <path d="M22 7v18" stroke={ACCENT} strokeWidth="2" />
    </>
  ),
  'analytics-experimentation': (
    <>
      <path d="M3 4v24h26M5 24l8-8 7 5 8-1" />
      <path d="m13 16 7-7 8-4" stroke={ACCENT} strokeWidth="2" />
      <circle cx="28" cy="5" r="2" fill={ACCENT} stroke={ACCENT} />
      <path d="M28 11v14H13" strokeDasharray="2 3" />
    </>
  ),
  'ux-direction': (
    <>
      <rect x="2" y="11" width="7" height="15" fill={PANEL} />
      <rect x="12" y="4" width="10" height="20" fill={PAPER} />
      <rect x="25" y="11" width="5" height="15" fill={PANEL} />
      <path d="M9 18h3m10 0h3M15 13h4m-4 4h4" />
      <path d="M14 8h6" stroke={ACCENT} strokeWidth="3" />
    </>
  ),
  'stakeholder-management': (
    <>
      <circle cx="6" cy="6" r="3" fill={PAPER} />
      <circle cx="26" cy="6" r="3" fill={PAPER} />
      <circle cx="16" cy="27" r="3" fill={PAPER} />
      <path d="m8 9 5 5m11-5-5 5m-3 6v4" />
      <path d="m16 11 6 5-6 5-6-5Z" fill={ACCENT} stroke={ACCENT} />
    </>
  ),
  'fintech-strategy': (
    <>
      <rect x="2" y="10" width="14" height="17" rx="2" fill={PANEL} />
      <path d="M11 16h5v6h-5Z" fill={PAPER} />
      <rect x="22" y="5" width="8" height="23" fill={PAPER} />
      <path d="M24 10h4m-4 5h4m-4 5h4" />
      <circle cx="9" cy="5" r="3" fill={ACCENT} stroke={ACCENT} />
      <path d="M16 19h6" stroke={ACCENT} strokeWidth="2" />
    </>
  ),
  'rtl-persian': (
    <>
      <rect x="2" y="3" width="12" height="18" fill={PANEL} />
      <rect x="18" y="3" width="12" height="18" fill={PANEL} />
      <path d="M5 7h6M5 11h4M21 7h6m-4 4h4" />
      <path d="M4 26h24m-4-4 4 4-4 4M8 22l-4 4 4 4" stroke={ACCENT} />
    </>
  ),
  gamification: (
    <>
      <path d="M3 28V21h7v-7h7V7h8v21Z" fill={PANEL} />
      <path d="M3 28h26" />
      <path d="M25 8V2l5 2-5 3" stroke={ACCENT} strokeWidth="2" />
      <path d="M28 13v16H7" strokeDasharray="2 3" />
    </>
  ),
  'product-function-setup': (
    <>
      <path d="M16 11v6H6v5m10-5h10v5m-10-5v5" />
      <rect x="2" y="22" width="8" height="7" fill={PANEL} />
      <rect x="12" y="22" width="8" height="7" fill={PANEL} />
      <rect x="22" y="22" width="8" height="7" fill={PANEL} />
      <rect x="11" y="3" width="10" height="8" fill={ACCENT} stroke={ACCENT} />
    </>
  ),
}

/** Labels remain HTML. The default compact variant is safe for existing callers. */
export const SkillIcon: React.FC<{
  className?: string
  skillKey: SkillKey
  variant?: 'compact' | 'illustration'
}> = ({ className, skillKey, variant = 'compact' }) => {
  if (variant === 'illustration') return <SkillArtwork className={className} skillKey={skillKey} />
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={cn('experience-compact-art', className)}
      data-artwork={skillKey}
      fill="none"
      stroke={INK}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ direction: 'ltr' }}
      viewBox="0 0 32 32"
    >
      {SKILL_MARKS[skillKey]}
    </svg>
  )
}
