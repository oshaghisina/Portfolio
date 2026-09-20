import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    // Forced dark scope: an inverted band in the light theme, the same slate in the dark one.
    <footer className="mt-auto border-t border-line bg-background text-foreground" data-theme="dark">
      <div className="container py-10 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center text-h3 font-medium tracking-h3" href="/">
          Sina Oshaghi
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-small hover:text-brand" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
