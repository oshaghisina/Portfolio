import { HeaderClient } from './Component.client'
import { hrefFromLink } from '@/components/Link'
import { isLabArchiveHref, isLogicalPathReady } from '@/i18n/contentReady'
import { COLLECTION_PATH_PREFIX } from '@/i18n/routes'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Locale } from '@/utilities/locale'

interface HeaderProps {
  locale: Locale
  logicalPath: string
  readiness: Partial<Record<Locale, boolean>>
}

export async function Header({ locale, logicalPath, readiness }: HeaderProps) {
  const headerData = await getCachedGlobal('header', locale, 1)()
  // Posts are EN-only today — keep Lab out of the chrome for locales with an empty archive.
  const labReady = await isLogicalPathReady(COLLECTION_PATH_PREFIX.posts, locale)
  const data =
    labReady || !headerData?.navItems
      ? headerData
      : {
          ...headerData,
          navItems: headerData.navItems.filter((item) => !isLabArchiveHref(hrefFromLink(item.link))),
        }

  return <HeaderClient data={data} locale={locale} logicalPath={logicalPath} readiness={readiness} />
}
