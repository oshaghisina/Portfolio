import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

/** DS-22 tag chip: eyebrow type in a hairline box (or brand fill). */
export const tagVariants = cva(
  'inline-flex items-center gap-1 rounded-chip px-2.5 h-7 eyebrow whitespace-nowrap',
  {
    variants: {
      tone: {
        neutral: 'border border-line text-ink-2',
        brand: 'bg-brand text-brand-foreground',
        soft: 'bg-panel text-ink-2',
      },
    },
    defaultVariants: { tone: 'neutral' },
  },
)

export interface TagProps extends React.ComponentProps<'span'>, VariantProps<typeof tagVariants> {
  /** Render the child element (e.g. a <Link>) instead of a <span>. */
  asChild?: boolean
}

export const Tag: React.FC<TagProps> = ({ asChild = false, className, tone, ...props }) => {
  const Comp = asChild ? Slot : 'span'
  return <Comp className={cn(tagVariants({ tone }), className)} data-slot="tag" {...props} />
}

/** A row of tags. */
export const TagList: React.FC<{ items: string[]; tone?: TagProps['tone']; className?: string }> = ({
  className,
  items,
  tone,
}) => (
  <ul className={cn('flex flex-wrap gap-2', className)}>
    {items.map((item) => (
      <li key={item}>
        <Tag tone={tone}>{item}</Tag>
      </li>
    ))}
  </ul>
)
