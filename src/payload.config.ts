import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { ar } from '@payloadcms/translations/languages/ar'
import { de } from '@payloadcms/translations/languages/de'
import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'
import { fa } from '@payloadcms/translations/languages/fa'
import { fr } from '@payloadcms/translations/languages/fr'
import { ja } from '@payloadcms/translations/languages/ja'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Experiences } from './collections/Experiences'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { Users } from './collections/Users'
import { About } from './About/config'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { LOCALES } from './utilities/locale'
import { getAllowedOrigins } from './utilities/getURL'
import { SITE_NAME } from './utilities/site'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
      // Sina's signature in place of Payload's logo (login screens) and mark (nav breadcrumb).
      graphics: {
        Icon: '@/components/Logo/Icon#Icon',
        Logo: '@/components/Logo/Logo#Logo',
      },
    },
    // Tab title, favicon and link preview: without these Payload brands the admin as its own.
    meta: {
      defaultOGImageType: 'off',
      icons: [
        { rel: 'icon', sizes: '32x32', url: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' },
      ],
      openGraph: {
        description: 'Admin for sinaoshaghi.com',
        images: [{ height: 630, url: '/sina-oshaghi-OG.webp', width: 1200 }],
        siteName: SITE_NAME,
        title: SITE_NAME,
      },
      titleSuffix: `| ${SITE_NAME}`,
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  collections: [Pages, Posts, Projects, Media, Categories, Experiences, Users],
  cors: getAllowedOrigins(),
  globals: [Header, Footer, About],
  // Visitor-facing content locales (D-009). English is the default and the only one with
  // content today; every other locale is dormant until translated in the admin UI — public
  // queries always pass `fallbackLocale: false`, so an untranslated locale never silently
  // shows English.
  localization: {
    locales: [
      { code: 'en', label: 'English' },
      { code: 'fa', label: 'فارسی', rtl: true },
      { code: 'ar', label: 'العربية', rtl: true },
      { code: 'es', label: 'Español' },
      { code: 'de', label: 'Deutsch' },
      { code: 'fr', label: 'Français' },
      { code: 'ja', label: '日本語' },
    ].filter((locale) => (LOCALES as readonly string[]).includes(locale.code)),
    defaultLocale: 'en',
    fallback: false,
  },
  // Admin UI translations, independent of the visitor-facing `localization` locales above.
  i18n: {
    supportedLanguages: { ar, de, en, es, fa, fr, ja },
    fallbackLanguage: 'en',
  },
  // Per-locale publish status: a locale can't be treated as publicly ready just because
  // English is published (Pages/Posts/Header/Footer opt in via `versions.drafts.localizeStatus`).
  experimental: {
    localizeStatus: true,
  },
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
