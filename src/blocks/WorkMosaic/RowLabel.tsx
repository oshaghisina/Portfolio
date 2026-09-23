'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

import type { WorkMosaicBlock } from '@/payload-types'

const SIZE_LABEL: Record<string, string> = {
  wide: 'Wide',
  large: 'Large',
  medium: 'Medium',
  small: 'Small',
}

/**
 * `3. Large — VIN` so the mosaic can be read without opening a single row. The relationship is a
 * bare id until the admin has populated it, in which case the label degrades to the size alone —
 * a row label must never fetch.
 */
export const RowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<NonNullable<WorkMosaicBlock['items']>[number]>()

  const position = `${(rowNumber ?? 0) + 1}.`
  const size = SIZE_LABEL[data?.size ?? ''] ?? 'Tile'
  const title = typeof data?.project === 'object' ? data.project?.title : null

  return <div>{title ? `${position} ${size} — ${title}` : `${position} ${size}`}</div>
}
