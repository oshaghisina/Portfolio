'use client'

import { cn } from '@/utilities/ui'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import { ArrowUpRight } from 'lucide-react'
import * as React from 'react'

/**
 * DS-16 button pair. Two real styles — filled brand (`default`) and hairline (`outline`) —
 * plus the quiet ones the template already relied on. Sizes come from the control tokens
 * (`--size-control-*`); `default` is the CTA size. The focus ring is a deliberate token
 * (`--ring`), never the browser default.
 */
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-control text-button font-medium leading-none',
    'transition-[color,background-color,border-color,translate,opacity] duration-(--duration-fast) ease-standard',
    'hover:translate-y-(--lift) active:translate-y-0',
    'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.0625rem]",
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-brand text-brand-foreground hover:bg-brand/90',
        outline: 'border border-line bg-transparent text-foreground hover:border-foreground hover:bg-panel/60',
        secondary: 'bg-panel text-foreground hover:bg-panel/70',
        ghost: 'text-foreground hover:bg-panel',
        link: 'text-foreground underline-offset-4 hover:underline hover:translate-y-0',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        clear: '',
        sm: 'h-(--size-control-height-sm) px-4 text-small',
        default: 'h-(--size-control-height) px-(--size-control-pad-x)',
        lg: 'h-14 px-8',
        icon: 'size-(--size-control-height) rounded-control',
        'icon-sm': 'size-(--size-control-height-sm) rounded-control',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

/** The ↗ that trails a CTA; flips to ↖ in RTL. Exported so links can place it themselves. */
const ButtonArrow: React.FC<{ className?: string }> = ({ className }) => (
  <ArrowUpRight aria-hidden className={cn('rtl:-scale-x-100', className)} />
)

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /** Trailing arrow (DS-16). Works with `asChild` too — the child keeps its own children. */
  arrow?: boolean
}

const Button: React.FC<ButtonProps> = ({
  arrow = false,
  asChild = false,
  children,
  className,
  size,
  variant,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {asChild ? <Slottable>{children}</Slottable> : children}
      {arrow && <ButtonArrow />}
    </Comp>
  )
}

export { Button, ButtonArrow, buttonVariants }
