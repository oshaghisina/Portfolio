import { ArrowDown } from 'lucide-react'
import React from 'react'

import type { CaseStudyDownloadsBlock } from '@/payload-types'

import { pad } from '@/components/CaseStudy/plate'
import { Button } from '@/components/ui/button'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

import type { CaseStudyBlockContext } from '../types'

export type DownloadsBlockProps = CaseStudyDownloadsBlock & CaseStudyBlockContext

/** "XLSX" from `vin-app--problem-inventory.xlsx` — a Latin code in every locale. */
export function fileFormat(filename: string | null | undefined): string | null {
  const extension = filename?.match(/\.([a-z0-9]+)$/i)?.[1]
  return extension ? extension.toUpperCase() : null
}

/** The size in the page language, in whole kilobytes below a megabyte: "39 kB", "۳۹ kB". */
export function fileSize(bytes: number | null | undefined, locale: Locale): string | null {
  if (!bytes || bytes <= 0) return null
  const mega = bytes >= 1_000_000
  return new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : locale, {
    style: 'unit',
    unit: mega ? 'megabyte' : 'kilobyte',
    unitDisplay: 'short',
    maximumFractionDigits: mega ? 1 : 0,
  }).format(Math.max(1, bytes / (mega ? 1_000_000 : 1_000)))
}

/**
 * The chapter's working files as numbered hairline rows: what the file is and what is inside on
 * the start side, its format and size and a hairline download button on the end side. A row whose
 * upload is missing is skipped rather than rendered as a dead link.
 */
export const DownloadsBlock: React.FC<DownloadsBlockProps> = ({ copy, heading, items, locale }) => {
  const rows = (items ?? []).flatMap((item) =>
    typeof item.file === 'object' && item.file?.url ? [{ ...item, file: item.file }] : [],
  )
  if (!rows.length) return null

  return (
    <div>
      {heading ? (
        <h3 className="text-h3 font-medium text-balance text-foreground">{heading}</h3>
      ) : null}
      <ul className={cn('border-b border-line', heading && 'mt-8')}>
        {rows.map((row, i) => {
          const facts = [fileFormat(row.file.filename), fileSize(row.file.filesize, locale)]
            .filter(Boolean)
            .join(' · ')
          return (
            <li
              className="grid gap-x-8 gap-y-4 border-t border-line py-6 md:grid-cols-[2.5rem_minmax(0,1fr)_auto] md:items-center"
              key={row.id ?? i}
            >
              <span aria-hidden className="hidden index-code md:block">
                {pad(i + 1)}
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-small font-medium text-foreground">{row.title}</p>
                {row.description ? (
                  <p className="max-w-measure text-small text-ink-2">{row.description}</p>
                ) : null}
              </div>
              <div className="flex items-center gap-4 md:justify-end">
                {facts ? <span className="eyebrow text-ink-3">{facts}</span> : null}
                <Button asChild size="sm" variant="outline">
                  <a download={row.file.filename || true} href={getMediaUrl(row.file.url)}>
                    <ArrowDown aria-hidden className="size-3.5" />
                    {copy.download}{' '}
                    <span className="sr-only">{row.title}</span>
                  </a>
                </Button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
