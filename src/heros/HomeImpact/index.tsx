import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ConsolePanel } from '@/components/ConsolePanel'
import { PageOpener } from '@/components/PageOpener'
import RichText from '@/components/RichText'
import type { Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

import { HERO_RICH_TEXT_CLASS } from '../richText'

/**
 * The homepage's take on `PageOpener`: the shared opening gesture plus a small workspace console
 * preview as an always-visible visual anchor, then the technical-landscape strip bridging into
 * the Workbench below. The panel mirrors the Workbench's own categories and chrome — decorative,
 * non-CMS chrome, not new data (see Docs/Benchmarks/Content/pleurat-com.md).
 */
const WORKSPACE_INDEX = [
  { code: '01', label: 'Product' },
  { code: '02', label: 'Design' },
  { code: '03', label: 'Research' },
  { code: '04', label: 'Growth' },
]

export const HomeImpactHero: React.FC<Page['hero'] & { locale?: Locale }> = ({
  links,
  locale,
  richText,
}) => (
  <PageOpener
    actions={
      links?.length
        ? // Phones: one dominant full-width primary, the secondary reduced to a quiet text line
          // on the same node (no duplicate DOM); from `sm` the CMS appearances return.
          links.map(({ link }, i) => (
            <CMSLink
              arrow={i === 0}
              className={
                i === 0
                  ? 'w-full sm:w-auto'
                  : 'max-sm:h-auto max-sm:justify-start max-sm:border-0 max-sm:bg-transparent max-sm:px-0 max-sm:text-small max-sm:text-ink-2 max-sm:hover:translate-y-0 max-sm:hover:bg-transparent max-sm:hover:text-foreground'
              }
              key={i}
              locale={locale}
              {...link}
            />
          ))
        : null
    }
    aside={
      // The preview console only earns its place beside the copy at lg; on phones it would just
      // repeat the standalone Workbench one screen later.
      <ConsolePanel
        className="hidden w-full shrink-0 lg:block lg:w-[22rem]"
        status="Active"
        title="sina — workspace"
      >
        <ol className="flex flex-col gap-4">
          {WORKSPACE_INDEX.map((row) => (
            <li className="flex items-center gap-3" key={row.code}>
              <span aria-hidden className="size-1.5 rounded-full bg-brand" />
              <span className="index-code text-ink-3">{row.code}</span>
              <span className="eyebrow text-ink-2">{row.label}</span>
            </li>
          ))}
        </ol>
      </ConsolePanel>
    }
    eyebrow="Sina Oshaghi"
    railLabels={WORKSPACE_INDEX.map((row) => `${row.code} · ${row.label}`)}
    titleSlot={
      richText ? (
        <RichText
          className={cn('mt-4', HERO_RICH_TEXT_CLASS)}
          data={richText}
          enableGutter={false}
          enableProse={false}
        />
      ) : null
    }
  />
)
