import { cn } from '@/utilities/ui'
import React from 'react'

import type { SelectedWorkBlock as SelectedWorkBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { SectionHeader } from '@/components/SectionHeader'
import { Tag } from '@/components/Tag'

export type SelectedWorkProps = Pick<SelectedWorkBlockProps, 'items' | 'sectionHeader'> & {
  className?: string
  disableInnerContainer?: boolean
}

type WorkItem = NonNullable<SelectedWorkBlockProps['items']>[number]

const withLink = (item: WorkItem, children: React.ReactNode) =>
  item.enableLink && item.link ? (
    <CMSLink appearance="inline" className="block" {...item.link}>
      {children}
    </CMSLink>
  ) : (
    children
  )

/** Featured Project: one large full-canvas visual event, not a multi-project grid. */
export const SelectedWorkBlock: React.FC<SelectedWorkProps> = ({
  className,
  disableInnerContainer,
  items,
  sectionHeader,
}) => {
  const item = (items ?? [])[0]
  if (!item) return null

  const media = item.media

  return (
    <section
      className={cn(!disableInnerContainer && 'container', 'pb-[28vh] lg:pb-[34vh]', className)}
      id="selected-work"
    >
      <SectionHeader {...sectionHeader} className="mb-10" tagTone="brand" />
      {withLink(
        item,
        <div className="flex flex-col gap-8">
          {media && typeof media === 'object' ? (
            <Media
              className="overflow-hidden rounded-media"
              imgClassName="aspect-[21/9] object-cover"
              resource={media}
            />
          ) : (
            <div className="relative flex aspect-[21/9] items-end overflow-hidden rounded-media border border-line bg-panel p-8">
              <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-brand" />
              <span className="text-num tracking-num font-medium leading-none text-ink-3/20 tabular-nums">
                01
              </span>
            </div>
          )}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <div className="flex items-baseline gap-4">
              <span className="index-code text-ink-3">01</span>
              <h3 className="text-h2 font-medium text-foreground">{item.title}</h3>
            </div>
            <div className="flex flex-wrap items-baseline gap-3">
              <Tag tone="soft">{item.category}</Tag>
              {item.role ? <span className="eyebrow text-ink-3">{item.role}</span> : null}
            </div>
          </div>
          <p className="max-w-measure text-body text-ink-2">{item.summary}</p>
        </div>,
      )}
    </section>
  )
}
