import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

/** Curated stories in CMS order. Project records remain the source of facts and imagery. */
export const WorkMosaic: Block = {
  slug: 'workMosaic',
  interfaceName: 'WorkMosaicBlock',
  labels: { singular: 'Work mosaic', plural: 'Work mosaic' },
  fields: [
    sectionHeader(),
    {
      name: 'items',
      type: 'array',
      minRows: 3,
      maxRows: 12,
      required: true,
      labels: { singular: 'Tile', plural: 'Tiles' },
      admin: {
        initCollapsed: true,
        components: { RowLabel: '@/blocks/WorkMosaic/RowLabel#RowLabel' },
        description:
          'One project per entry, in reading order. Wide is a full-width feature with image beside text; Large is a visual story; Medium and Small are compact project notes. The archive link has its own footer.',
      },
      /**
       * The same project twice would read as an editing mistake and would also shift the packing
       * of every row after it. Ten lines here beat silently dropping a tile at render, which
       * would open a gap the editor could not explain.
       */
      validate: (value: unknown) => {
        if (!Array.isArray(value)) return true
        const ids = value
          .map((row) => {
            const project = (row as { project?: unknown } | null)?.project
            return typeof project === 'object' && project !== null
              ? (project as { id?: unknown }).id
              : project
          })
          .filter((id) => id !== undefined && id !== null && id !== '')
        return new Set(ids).size === ids.length
          ? true
          : 'Each project may appear once in the mosaic.'
      },
      fields: [
        {
          name: 'project',
          type: 'relationship',
          relationTo: 'projects',
          required: true,
          admin: {
            description:
              'Project facts come from the Projects collection. Publish the project in each language it should appear in — a project left unpublished in a language is skipped there.',
          },
        },
        {
          name: 'size',
          type: 'select',
          required: true,
          defaultValue: 'small',
          admin: {
            description:
              'The emphasis this project receives; mobile always follows the same reading order.',
          },
          options: [
            { label: 'Wide — full row, image beside story', value: 'wide' },
            { label: 'Large — half row, paired screens and story', value: 'large' },
            { label: 'Medium — half row, project note with summary', value: 'medium' },
            { label: 'Small — half row, compact project note', value: 'small' },
          ],
        },
        {
          name: 'mediaOverride',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description:
              'Optional. Overrides what this tile shows. Leave empty to use the project cover, then the first case-study hero visual, then a typographic initial. Overrides are shown on their own.',
          },
        },
      ],
    },
  ],
}
