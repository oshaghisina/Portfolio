import type { ButtonProps } from '@/components/ui/button'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import * as React from 'react'

/**
 * `label` and the `children` of Previous/Next/Ellipsis are the translated strings — this
 * primitive holds no copy of its own, so `uiCopy` stays the one place UI chrome is written.
 */
const Pagination = ({
  className,
  label,
  ...props
}: { label?: string } & React.ComponentProps<'nav'>) => (
  <nav
    aria-label={label}
    className={cn('mx-auto flex w-full justify-center', className)}
    role="navigation"
    {...props}
  />
)

const PaginationContent: React.FC<
  { ref?: React.Ref<HTMLUListElement> } & React.HTMLAttributes<HTMLUListElement>
> = ({ className, ref, ...props }) => (
  <ul className={cn('flex flex-row items-center gap-1', className)} ref={ref} {...props} />
)

const PaginationItem: React.FC<
  { ref?: React.Ref<HTMLLIElement> } & React.HTMLAttributes<HTMLLIElement>
> = ({ className, ref, ...props }) => <li className={cn('', className)} ref={ref} {...props} />

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'button'>

const PaginationLink = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => (
  <button
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        size,
        variant: isActive ? 'outline' : 'ghost',
      }),
      className,
    )}
    {...props}
  />
)

// `ps-2.5` not `pl-2.5`, and the chevron flips under RTL: "previous" is inline-start, which is
// the right-hand side in Persian and Arabic.
const PaginationPrevious = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label={typeof children === 'string' ? children : undefined}
    className={cn('gap-1 ps-2.5', className)}
    size="default"
    {...props}
  >
    <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
    <span>{children}</span>
  </PaginationLink>
)

const PaginationNext = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label={typeof children === 'string' ? children : undefined}
    className={cn('gap-1 pe-2.5', className)}
    size="default"
    {...props}
  >
    <span>{children}</span>
    <ChevronRight className="h-4 w-4 rtl:rotate-180" />
  </PaginationLink>
)

const PaginationEllipsis = ({ children, className, ...props }: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">{children}</span>
  </span>
)

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
