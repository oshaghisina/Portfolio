import React from 'react'

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'

import { FormBlockClient } from './Component.client'
import type { ContactPathData } from './ContactPaths'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  closingNote?: DefaultTypedEditorState | null
  emailPath?: ContactPathData | null
  enableIntro?: boolean | null
  form: FormType
  formPath?: ContactPathData | null
  introContent?: DefaultTypedEditorState
  /** Supplied by `RenderBlocks`; the field components read their chrome from `uiCopy`. */
  locale?: Locale
  sectionTitle?: string | null
}

/**
 * Server wrapper: resolves the Footer mailto once so the Contact paths strip does not hardcode
 * Sina’s address. The interactive form lives in `FormBlockClient`.
 */
export const FormBlock: React.FC<{ id?: string } & FormBlockType> = async (props) => {
  const locale = props.locale ?? DEFAULT_LOCALE
  const footer = await getCachedGlobal('footer', locale, 1)()
  const emailHref =
    footer?.contact?.linkHref?.startsWith('mailto:')
      ? footer.contact.linkHref
      : footer?.social?.find((row) => row.kind === 'email')?.href ?? null

  return <FormBlockClient {...props} emailHref={emailHref} />
}
