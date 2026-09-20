import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { SystemLandscape } from '@/components/SystemLandscape'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-line bg-background text-foreground">
      <div className="container">
        <SystemLandscape labels={['Figma', 'Cursor', 'Claude']} />
      </div>
      <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <Link className="flex items-center text-small font-medium text-ink-2" href="/">
          Sina Oshaghi
        </Link>

        <nav className="flex flex-col items-start gap-4 md:flex-row md:items-center">
          {navItems.map(({ link }, i) => {
            return <CMSLink className="eyebrow text-ink-3 hover:text-brand" key={i} {...link} />
          })}
        </nav>
      </div>
    </footer>
  )
}
