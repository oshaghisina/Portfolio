'use client'
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/utilities/ui'
import { useRouter } from 'next/navigation'
import React from 'react'

import { localePath } from '@/i18n/navigation'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'

export const Pagination: React.FC<{
  /** Logical (unprefixed) path this page number is appended to, e.g. `/lab/page`. */
  basePath: string
  className?: string
  locale?: Locale
  page: number
  totalPages: number
}> = (props) => {
  const router = useRouter()

  const { basePath, className, locale = DEFAULT_LOCALE, page, totalPages } = props
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const hasExtraPrevPages = page - 1 > 1
  const hasExtraNextPages = page + 1 < totalPages

  const goToPage = (n: number) => router.push(localePath(locale, `${basePath}/${n}`))
  const copy = uiCopy[locale]

  return (
    <div className={cn('my-12', className)}>
      <PaginationComponent label={copy.pagination}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={!hasPrevPage}
              onClick={() => {
                goToPage(page - 1)
              }}
            >
              {copy.previous}
            </PaginationPrevious>
          </PaginationItem>

          {hasExtraPrevPages && (
            <PaginationItem>
              <PaginationEllipsis>{copy.morePages}</PaginationEllipsis>
            </PaginationItem>
          )}

          {hasPrevPage && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  goToPage(page - 1)
                }}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink
              isActive
              onClick={() => {
                goToPage(page)
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>

          {hasNextPage && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  goToPage(page + 1)
                }}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {hasExtraNextPages && (
            <PaginationItem>
              <PaginationEllipsis>{copy.morePages}</PaginationEllipsis>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              disabled={!hasNextPage}
              onClick={() => {
                goToPage(page + 1)
              }}
            >
              {copy.next}
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    </div>
  )
}
