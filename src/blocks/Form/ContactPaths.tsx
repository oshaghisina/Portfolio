import React from 'react'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'
import { ButtonArrow } from '@/components/ui/button'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import { cn } from '@/utilities/ui'

export type ContactPathData = {
  index?: string | null
  title?: string | null
  description?: string | null
  ctaLabel?: string | null
}

type ContactPathsProps = {
  emailHref?: string | null
  emailPath?: ContactPathData | null
  formPath?: ContactPathData | null
  formAnchorId: string
  locale?: Locale
}

function PathCell({
  cta,
  description,
  index,
  title,
}: {
  cta: React.ReactNode
  description?: string | null
  index?: string | null
  title?: string | null
}) {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-5">
      <div className="flex items-center gap-2">
        {index ? <span className="index-code text-ink-3">{index}</span> : null}
        {title ? <h3 className="eyebrow text-ink-3">{title}</h3> : null}
      </div>
      {description ? <p className="max-w-measure text-small text-ink-2">{description}</p> : null}
      <div className="mt-auto pt-2">{cta}</div>
    </div>
  )
}

/**
 * Editorial 2-column strip: direct email + jump to the form. No cards, shared hairlines.
 */
export const ContactPaths: React.FC<ContactPathsProps> = ({
  emailHref,
  emailPath,
  formAnchorId,
  formPath,
  locale = DEFAULT_LOCALE,
}) => {
  if (!emailPath?.title && !formPath?.title) return null

  return (
    <nav
      aria-label={uiCopy[locale].contactPathsLabel}
      className="grid grid-cols-1 border border-line md:grid-cols-2"
    >
      {emailPath?.title ? (
        <PathCell
          cta={
            emailHref ? (
              <a
                className={cn(
                  'inline-flex items-center gap-2 text-small font-medium text-foreground',
                  'underline-offset-4 hover:underline',
                )}
                dir={emailHref.startsWith('mailto:') ? 'ltr' : undefined}
                href={emailHref}
              >
                {emailPath.ctaLabel || emailHref}
                <ButtonArrow />
              </a>
            ) : null
          }
          description={emailPath.description}
          index={emailPath.index}
          title={emailPath.title}
        />
      ) : null}
      {formPath?.title ? (
        <div className="border-t border-line md:border-t-0 md:border-s md:border-line">
          <PathCell
            cta={
              <a
                className={cn(
                  'inline-flex items-center gap-2 text-small font-medium text-foreground',
                  'underline-offset-4 hover:underline',
                )}
                href={`#${formAnchorId}`}
              >
                {formPath.ctaLabel || '↓'}
                <span aria-hidden>↓</span>
              </a>
            }
            description={formPath.description}
            index={formPath.index}
            title={formPath.title}
          />
        </div>
      ) : null}
    </nav>
  )
}

export const ContactClosingNote: React.FC<{ note?: DefaultTypedEditorState | null }> = ({
  note,
}) => {
  if (!note) return null
  return (
    <RichText
      className="mt-6 max-w-measure text-small text-ink-3 [&_p]:text-small [&_p]:text-ink-3"
      data={note}
      enableGutter={false}
      enableProse={false}
    />
  )
}
