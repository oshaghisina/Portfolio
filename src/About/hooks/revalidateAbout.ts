import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import { LOCALES } from '@/utilities/locale'

export const revalidateAbout: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating about`)

    for (const locale of LOCALES) revalidateTag(`global_about_${locale}`, 'max')
  }

  return doc
}
