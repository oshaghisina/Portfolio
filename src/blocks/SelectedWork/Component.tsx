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
    <CMSLink appearance="inline" className="block h-full" {...item.link}>
      {children}
    </CMSLink>
  ) : (
    children
  )

/**
 * Feature rail: featured rows read as the portfolio showcase (big title, media anchor),
 * remaining rows read as a compact supporting list — hierarchy by typographic scale rather
 * than by image, since no real case-study media exists yet.
 */
export const SelectedWorkBlock: React.FC<SelectedWorkProps> = ({
  className,
  disableInnerContainer,
  items,
  sectionHeader,
}) => {
  const rows = items ?? []
  if (!rows.length) return null

  const featured = rows.filter((item) => item.featured)
  const supporting = rows.filter((item) => !item.featured)

  return (
    <section className={cn(!disableInnerContainer && 'container', className)} id="selected-work">
      <SectionHeader {...sectionHeader} className="mb-10" />

      {featured.length ? (
        <ol className="grid grid-cols-1 gap-x-10 gap-y-14 border-t border-line pt-10 lg:grid-cols-2">
          {featured.map((item, i) => {
            const media = item.media
            return (
              <li key={item.id ?? `featured-${i}`}>
                {withLink(
                  item,
                  <div className="flex h-full flex-col gap-4">
                    <span className="index-code text-ink-3">{String(i + 1).padStart(2, '0')}</span>
                    {media && typeof media === 'object' ? (
                      <Media
                        className="overflow-hidden rounded-media"
                        imgClassName="aspect-video object-cover"
                        resource={media}
                      />
                    ) : null}
                    <Tag className="self-start" tone="soft">
                      {item.category}
                    </Tag>
                    <h3 className="text-h2 font-medium text-foreground">{item.title}</h3>
                    {item.role ? <span className="eyebrow text-ink-3">{item.role}</span> : null}
                    <p className="max-w-measure text-body text-ink-2">{item.summary}</p>
                  </div>,
                )}
              </li>
            )
          })}
        </ol>
      ) : null}

      {supporting.length ? (
        <ol
          className={cn(
            'divide-y divide-line',
            featured.length ? 'mt-14 border-t border-line' : 'border-t border-line',
          )}
        >
          {supporting.map((item, i) => (
            <li className="py-5" key={item.id ?? `supporting-${i}`}>
              {withLink(
                item,
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <div className="flex items-baseline gap-4">
                    <span className="index-code text-ink-3">
                      {String(featured.length + i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-h3 font-medium text-foreground">{item.title}</h3>
                  </div>
                  <div className="flex flex-wrap items-baseline gap-3 ps-9 sm:ps-0">
                    <Tag tone="soft">{item.category}</Tag>
                    {item.role ? <span className="eyebrow text-ink-3">{item.role}</span> : null}
                  </div>
                </div>,
              )}
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  )
}
