import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { EditorialGrid } from './EditorialGrid'

export { EditorialGrid }

const colsSpanClasses = {
  full: '12',
  half: '6',
  oneThird: '4',
  twoThirds: '8',
}

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props
  // Rows created before the field existed have no value → columns.
  const layout = props.layout ?? 'columns'

  const cells = (columns ?? []).map((col, index) => {
    const { enableLink, link, richText } = col
    return (
      <React.Fragment key={index}>
        {richText && <RichText data={richText} enableGutter={false} />}
        {enableLink && <CMSLink {...link} />}
      </React.Fragment>
    )
  })

  if (layout === 'editorial') {
    return (
      <div className="container">
        <EditorialGrid>{cells}</EditorialGrid>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {(columns ?? []).map((col, index) => {
          const { size } = col
          return (
            <div
              className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size ?? 'oneThird']}`, {
                'md:col-span-2': size !== 'full',
              })}
              key={index}
            >
              {cells[index]}
            </div>
          )
        })}
      </div>
    </div>
  )
}
