import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type LexicalNode = {
  type?: string
  tag?: string
  text?: string
  children?: LexicalNode[]
  [key: string]: unknown
}

/**
 * Pull the first `h1` heading out of a hero Lexical tree so it can be authored by
 * `WrittenHeadline`; remaining nodes stay as supporting RichText.
 */
export function splitHeroRichText(data: DefaultTypedEditorState): {
  title: string
  body: DefaultTypedEditorState | null
} {
  const root = data?.root as LexicalNode | undefined
  const children = (root?.children ?? []) as LexicalNode[]
  const headingIndex = children.findIndex(
    (node) => node?.type === 'heading' && node.tag === 'h1',
  )

  if (headingIndex < 0) {
    return { title: '', body: data }
  }

  const title = extractPlainText(children[headingIndex]!)
  const rest = children.filter((_, i) => i !== headingIndex)

  if (rest.length === 0) {
    return { title, body: null }
  }

  return {
    title,
    body: {
      ...data,
      root: {
        ...data.root,
        children: rest,
      },
    } as DefaultTypedEditorState,
  }
}

function extractPlainText(node: LexicalNode): string {
  if (typeof node.text === 'string') return node.text
  if (!Array.isArray(node.children)) return ''
  return node.children.map(extractPlainText).join('')
}
