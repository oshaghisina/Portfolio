import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

import { CATEGORY_OPTIONS, TOOL_LOGOS, TOOL_OPTIONS } from './toolLogos'

/**
 * TOOLS / STACK — the working stack as categorised brand marks, grouped by what each tool is used
 * for: think, design, build, automate, ship and measure, read as one connected stack rather than
 * a shelf of separate toolkits.
 *
 * The slug stays `workflowStages` so the existing homepage layout records survive; only the
 * field list changed (it previously modelled stage → comma-separated tool names).
 *
 * House pattern — shared array, localized leaves: the arrays themselves are not localized,
 * `key` and `toolKey` are shared identities, and only `title` is translated. Product names are
 * never localized; they come from `./toolLogos`, which also supplies the select options.
 */
export const WorkflowStages: Block = {
  slug: 'workflowStages',
  interfaceName: 'WorkflowStagesBlock',
  fields: [
    sectionHeader(),
    {
      name: 'categories',
      type: 'array',
      admin: {
        description:
          'Rendered in the canonical order defined in toolLogos.ts (01 Design & Creative Production → 07 Knowledge & Research). The two-digit index follows that order, not the row order here.',
        initCollapsed: true,
      },
      labels: { plural: 'Categories', singular: 'Category' },
      maxRows: 7,
      minRows: 2,
      // Payload has no cross-row uniqueness constraint, so the two rules that would otherwise
      // read as mistakes on the page are enforced here.
      validate: (value: unknown) => {
        const rows = Array.isArray(value) ? value : []

        const categoryKeys = rows
          .map((row) => (row as { key?: string })?.key)
          .filter(Boolean) as string[]
        const duplicateCategories = [
          ...new Set(categoryKeys.filter((key, i) => categoryKeys.indexOf(key) !== i)),
        ]
        if (duplicateCategories.length) {
          return `Each category can only appear once. Duplicated: ${duplicateCategories.join(', ')}.`
        }

        const toolKeys = rows.flatMap((row) => {
          const tools = (row as { tools?: unknown })?.tools
          return Array.isArray(tools)
            ? (tools.map((tool) => (tool as { toolKey?: string })?.toolKey).filter(Boolean) as string[])
            : []
        })
        const duplicateTools = [...new Set(toolKeys.filter((key, i) => toolKeys.indexOf(key) !== i))]
        if (duplicateTools.length) {
          const names = duplicateTools.map(
            (key) => TOOL_LOGOS[key as keyof typeof TOOL_LOGOS]?.name ?? key,
          )
          return `A tool can only appear in one category. Duplicated: ${names.join(', ')}.`
        }

        return true
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'key',
              type: 'select',
              admin: {
                description: 'Stable id — sets the render order and the index code',
                width: '50%',
              },
              options: CATEGORY_OPTIONS,
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              admin: {
                description: 'Shown above the matrix, e.g. "Design & Creative Production"',
                width: '50%',
              },
              localized: true,
              required: true,
            },
          ],
        },
        {
          name: 'tools',
          type: 'array',
          labels: { plural: 'Tools', singular: 'Tool' },
          // A category is no longer capped at a single row: at `lg` the matrix balances itself
          // into as many rows as it needs (see Component.tsx), so the cap is only about how much
          // one category can reasonably claim of the section. Twelve is two full rows of six.
          maxRows: 12,
          minRows: 1,
          fields: [
            {
              name: 'toolKey',
              type: 'select',
              admin: {
                description: 'Resolves to a brand mark and its canonical product name (toolLogos.ts).',
              },
              options: TOOL_OPTIONS,
              required: true,
            },
          ],
        },
      ],
    },
  ],
  labels: { plural: 'Tools / stack', singular: 'Tools / stack' },
}
