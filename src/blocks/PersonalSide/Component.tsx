import { cn } from '@/utilities/ui'
import React from 'react'

import type { PersonalSideBlock as PersonalSideBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { SectionHeader } from '@/components/SectionHeader'

export type PersonalSideProps = Pick<PersonalSideBlockProps, 'items' | 'sectionHeader'> & {
  className?: string
}

/** "Outside work" — a compact, typography-first strip. Renders cleanly with or without media. */
export const PersonalSideBlock: React.FC<PersonalSideProps> = ({ className, items, sectionHeader }) => {
  const rows = items ?? []
  if (!rows.length) return null

  return (
    <section className={cn(className)}>
      <SectionHeader {...sectionHeader} className="mb-10 max-md:mb-8 max-md:border-t-0 max-md:pt-0" tagTone="mono" />
      <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((item, i) => (
          <li className="flex flex-col gap-3" key={item.id ?? i}>
            {item.media && typeof item.media === 'object' ? (
              <Media className="aspect-[4/3] w-full overflow-hidden" imgClassName="size-full object-cover" resource={item.media} />
            ) : null}
            <h3 className="text-small font-medium text-foreground">{item.title}</h3>
            <p className="text-small text-ink-2">{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
