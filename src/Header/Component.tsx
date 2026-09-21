import { HeaderClient } from './Component.client'
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

  return <HeaderClient data={headerData} locale={locale} logicalPath={logicalPath} readiness={readiness} />
}
