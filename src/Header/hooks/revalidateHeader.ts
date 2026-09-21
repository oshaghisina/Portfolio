import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import { LOCALES } from '@/utilities/locale'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header`)

    // Nav labels are localized (D-009); invalidate every locale's cache since the hook doesn't
    // know which locale's save this was.
    for (const locale of LOCALES) revalidateTag(`global_header_${locale}`, 'max')
  }

  return doc
}
