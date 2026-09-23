import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

/**
 * Work Mosaic: the homepage's project wall. One ruled grid whose cells are projects at four
 * editorial weights — not a card grid, not masonry. The block owns *how* the work appears here
 * (which projects, in what order, at what size); each project record owns *what* it is — title,
 * organisation, role, summary, cover — so Home and `/work` can never disagree (D-021).
 *
 * Row order is the visual order, and the DOM follows it exactly: no dense packing, no
 * reflowing behind the editor's back. Sizes are weights on a 12-column row, so a row fills when
 * its tiles add up — one wide, or two halves, or four quarters. A row that does not add up
 * leaves paper rather than a broken tile, and the closing index cell always squares off the last
 * row (see `sizes.ts`).
 */
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
          'One tile per project, in reading order — drag to reorder. Size is a weight on a row: Wide fills a row, two halves (Large or Medium) fill a row, four quarters (Small) fill a row. Mix sizes so each row adds up, or the row will end in empty paper.',
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
            description: 'How much of a row this project claims, and how much it says.',
          },
          options: [
            { label: 'Wide — full row, banner media, summary', value: 'wide' },
            { label: 'Large — half row, 4:3 media, summary', value: 'large' },
            { label: 'Medium — half row, 16:9 media, no summary', value: 'medium' },
            { label: 'Small — quarter row, square media, title only', value: 'small' },
          ],
        },
        {
          name: 'mediaOverride',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description:
              'Optional. Overrides what this tile shows. Leave empty to use the project cover, then the first case-study hero visual, then the pending plate.',
          },
        },
      ],
    },
  ],
}
