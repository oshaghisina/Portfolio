import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

/**
 * Small builders for hand-authored Lexical trees. The seed data needs several headings/
 * paragraphs/lists across two files — writing that much raw Lexical JSON by hand (as the
 * template originally did) is exactly the kind of repetition that produces structurally
 * invalid trees. These mirror the node shapes Payload's default lexicalEditor emits.
 */

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

export const heading = (value: string, tag: 'h1' | 'h2' | 'h3' | 'h4' = 'h2'): LexicalNode => ({
  type: 'heading',
  children: [text(value)],
  direction: 'ltr',
  format: '',
  indent: 0,
  tag,
  version: 1,
})

export const paragraph = (value: string): LexicalNode => ({
  type: 'paragraph',
  children: [text(value)],
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

export const listItem = (value: string, index: number): LexicalNode => ({
  type: 'listitem',
  children: [text(value)],
  direction: 'ltr',
  format: '',
  indent: 0,
  value: index + 1,
  version: 1,
})

export const list = (items: string[], listType: 'bullet' | 'number' = 'bullet'): LexicalNode => ({
  type: 'list',
  children: items.map((item, index) => listItem(item, index)),
  direction: 'ltr',
  format: '',
  indent: 0,
  listType,
  start: 1,
  tag: listType === 'number' ? 'ol' : 'ul',
  version: 1,
})

export const richText = (...children: LexicalNode[]): DefaultTypedEditorState =>
  ({
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }) as DefaultTypedEditorState
