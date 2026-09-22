import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { NowSectionBlock as NowSectionBlockProps } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import RichText from '@/components/RichText'
import { SectionHeader } from '@/components/SectionHeader'
import { localizeInternalHref } from '@/i18n/navigation'
import { DEFAULT_LOCALE } from '@/utilities/locale'

export type NowSectionProps = Pick<NowSectionBlockProps, 'link' | 'sectionHeader' | 'statement'> & {
  className?: string
  locale?: Locale
}

/** Small, quiet closing composition before the contact CTA — statement, then an optional link toward /lab. */
export const NowSectionBlock: React.FC<NowSectionProps> = ({
  className,
  link,
  locale = DEFAULT_LOCALE,
  sectionHeader,
  statement,
}) => {
  if (!statement) return null

  return (
    <section className={cn(className)}>
      <SectionHeader {...sectionHeader} className="mb-8 max-md:border-t-0 max-md:pt-0" tagTone="mono" />
      <RichText
        className="text-lede text-ink-2 max-w-measure [&_p]:mt-0"
        data={statement}
        enableGutter={false}
        enableProse={false}
        locale={locale}
      />
      {link?.url && link?.label ? (
        <Link
          className="eyebrow mt-6 inline-flex items-center gap-2 text-foreground underline-offset-4 hover:underline"
          href={localizeInternalHref(locale, link.url)}
        >
          {link.label}
        </Link>
      ) : null}
    </section>
  )
}
