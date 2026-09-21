import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { SystemLandscape } from '@/components/SystemLandscape'
import { localePath, localizeInternalHref } from '@/i18n/navigation'
import type { Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

import { MetaStrip } from './MetaStrip'
import { SocialLinks } from './SocialLinks'

interface FooterProps {
  locale: Locale
  logicalPath: string
  readiness: Partial<Record<Locale, boolean>>
}

export async function Footer({ locale, logicalPath, readiness }: FooterProps) {
  const footerData = await getCachedGlobal('footer', locale, 1)()

  const navItems = footerData?.navItems || []
  const legalLinks = footerData?.legalLinks || []
  const about = footerData?.about
  const contact = footerData?.contact

  return (
    <footer className="mt-auto bg-background text-foreground">
      <div className={cn(logicalPath === '/' ? 'canvas' : 'container')}>
        <SystemLandscape labels={['Figma', 'Cursor', 'Claude']} />

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 py-10 md:gap-8 md:py-14 lg:grid-cols-4">
          <div className="col-span-2 flex min-w-0 flex-col gap-3 lg:col-span-1">
            <Link className="text-small font-medium text-ink-2" href={localePath(locale, '/')}>
              Sina Oshaghi
            </Link>
            {footerData?.description ? <p className="max-w-measure text-small text-ink-2">{footerData.description}</p> : null}
            <SocialLinks items={footerData?.social} />
          </div>

          <nav
            aria-label={footerData?.navLabel ?? 'Footer navigation'}
            className="flex min-w-0 flex-col gap-3"
          >
            {footerData?.pagesTitle ? <h4 className="eyebrow text-ink-3">{footerData.pagesTitle}</h4> : null}
            <ul className="flex flex-col gap-3">
              {navItems.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink className="text-small text-ink-3 hover:text-brand" locale={locale} {...link} />
                </li>
              ))}
            </ul>
          </nav>

          {about?.title || about?.text ? (
            <div className="flex min-w-0 flex-col gap-3">
              {about.title ? <h4 className="eyebrow text-ink-3">{about.title}</h4> : null}
              {about.text ? <p className="max-w-measure text-small text-ink-2">{about.text}</p> : null}
              {about.linkLabel && about.linkHref ? (
                <Link
                  className="text-small text-brand underline-offset-4 hover:underline"
                  href={localizeInternalHref(locale, about.linkHref)}
                >
                  {about.linkLabel}
                </Link>
              ) : null}
            </div>
          ) : null}

          {contact?.title || contact?.text ? (
            <div className="flex min-w-0 flex-col gap-3">
              {contact.title ? <h4 className="eyebrow text-ink-3">{contact.title}</h4> : null}
              {contact.text ? <p className="max-w-measure text-small text-ink-2">{contact.text}</p> : null}
              {contact.linkLabel && contact.linkHref ? (
                <Link
                  className="text-small text-brand underline-offset-4 hover:underline"
                  href={localizeInternalHref(locale, contact.linkHref)}
                >
                  {contact.linkLabel}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="hidden md:block">
          <MetaStrip rows={footerData?.metaBlock} />
        </div>

        <div className="flex flex-col items-start gap-3 border-t border-line-soft py-5 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-4 md:py-6">
          <p className="text-small text-ink-3">{footerData?.copyright}</p>
          <div className="flex w-full flex-wrap items-center gap-4 md:w-auto md:gap-6">
            {legalLinks.length ? (
              <ul className="flex flex-wrap gap-6">
                {legalLinks.map(({ link }, i) => (
                  <li key={i}>
                    <CMSLink className="text-small text-ink-3 hover:text-brand" locale={locale} {...link} />
                  </li>
                ))}
              </ul>
            ) : null}
            <LocaleSwitcher className="ms-auto md:ms-0" locale={locale} logicalPath={logicalPath} readiness={readiness} />
          </div>
        </div>
      </div>
    </footer>
  )
}
