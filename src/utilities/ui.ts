import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Type roles from Docs/Design-System/tokens/sina.tokens.json (`font.size.*`). tailwind-merge
 * cannot tell `text-h2` (a size) from `text-foreground` (a colour) on its own and would drop
 * one of them — so the roles are declared here. Kept in sync by tests/int/tokens-build.
 */
export const TYPE_ROLES = [
  'display',
  'h1',
  'h2',
  'h3',
  'lede',
  'body',
  'small',
  'caption',
  'eyebrow',
  'button',
  'num',
  'track-title',
] as const

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: [...TYPE_ROLES] }],
      leading: [{ leading: [...TYPE_ROLES] }],
      tracking: [{ tracking: [...TYPE_ROLES] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
