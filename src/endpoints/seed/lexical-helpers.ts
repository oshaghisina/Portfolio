import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

/**
 * Small builders for hand-authored Lexical trees. The seed data needs several headings/
 * paragraphs/lists across two files — writing that much raw Lexical JSON by hand (as the
 * template originally did) is exactly the kind of repetition that produces structurally
 * invalid trees. These mirror the node shapes Payload's default lexicalEditor emits.
 *
 * Every builder takes a trailing `direction`, defaulting to `'ltr'` so the pre-existing English
 * call sites are unchanged. Persian and Arabic trees must pass `'rtl'` (see `dirFor(locale)` in
 * `@/utilities/locale`) or the admin editor opens them left-to-right and the stored tree
 * disagrees with the `dir` the page renders with. `direction` is set on the root as well as on
 * each node, because Lexical reads it at both levels.
 */

type LexicalNode = Record<string, unknown>

export type TextDirection = 'ltr' | 'rtl'

const text = (value: string): LexicalNode => ({
  type: 'text',
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  text: value,
  version: 1,
})

export const heading = (
  value: string,
  tag: 'h1' | 'h2' | 'h3' | 'h4' = 'h2',
  direction: TextDirection = 'ltr',
): LexicalNode => ({
  type: 'heading',
  children: [text(value)],
  direction,
  format: '',
  indent: 0,
  tag,
  version: 1,
})

export const paragraph = (value: string, direction: TextDirection = 'ltr'): LexicalNode => ({
  type: 'paragraph',
  children: [text(value)],
  direction,
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

export const listItem = (value: string, index: number, direction: TextDirection = 'ltr'): LexicalNode => ({
  type: 'listitem',
  children: [text(value)],
  direction,
  format: '',
  indent: 0,
  value: index + 1,
  version: 1,
})

export const list = (
  items: string[],
  listType: 'bullet' | 'number' = 'bullet',
  direction: TextDirection = 'ltr',
): LexicalNode => ({
  type: 'list',
  children: items.map((item, index) => listItem(item, index, direction)),
  direction,
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
      // Take the root's direction from its first child so a caller never has to state it twice.
      direction: (children[0]?.direction as TextDirection | undefined) ?? 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }) as DefaultTypedEditorState
