import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Locale } from '@/utilities/locale'

export async function Header({ locale }: { locale: Locale }) {
  const headerData = await getCachedGlobal('header', 1)()

  return <HeaderClient data={headerData} locale={locale} />
}
