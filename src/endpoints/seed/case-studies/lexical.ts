import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

/**
 * Direction-aware Lexical builders for case-study prose. `../lexical-helpers.ts` hard-codes
 * `direction: 'ltr'`; a Persian or Arabic tree should carry `rtl` so the admin editor opens it
 * the way it will read.
 */
export type TextDirection = 'ltr' | 'rtl'

type LexicalNode = Record<string, unknown>

const text = (value: string): LexicalNode => ({
  type: 'text',
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  text: value,
  version: 1,
})

export const paragraph = (value: string, direction: TextDirection): LexicalNode => ({
  type: 'paragraph',
  children: [text(value)],
  direction,
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

export const bullets = (items: string[], direction: TextDirection): LexicalNode => ({
  type: 'list',
  children: items.map((item, index) => ({
    type: 'listitem',
    children: [text(item)],
    direction,
    format: '',
    indent: 0,
    value: index + 1,
    version: 1,
  })),
  direction,
  format: '',
  indent: 0,
  listType: 'bullet',
  start: 1,
  tag: 'ul',
  version: 1,
})

export const prose = (
  direction: TextDirection,
  ...children: LexicalNode[]
): DefaultTypedEditorState =>
  ({
    root: {
      type: 'root',
      children,
      direction,
      format: '',
      indent: 0,
      version: 1,
    },
  }) as DefaultTypedEditorState
