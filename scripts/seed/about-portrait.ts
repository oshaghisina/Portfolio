/**
 * Upload-or-reuse `Docs/About-Me/portrait.jpg` and set it on the `about` global:
 *   pnpm seed:about-portrait
 *
 * Additive and idempotent — does not wipe other about fields. Hard-refresh `/about` (or restart
 * `pnpm dev`) afterwards; the script runs with no Next server, so revalidation is disabled.
 */
import 'dotenv/config'

import path from 'node:path'

import { getPayload } from 'payload'

import {
  ABOUT_PORTRAIT_ASSETS_DIR,
  ABOUT_PORTRAIT_MEDIA,
} from '../../src/endpoints/seed/about-global'
import { upsertMedia } from '../../src/endpoints/seed/media'
import config from '../../src/payload.config'

const payload = await getPayload({ config })

const portraitId = await upsertMedia(
  payload,
  path.resolve(process.cwd(), ABOUT_PORTRAIT_ASSETS_DIR),
  {
    file: ABOUT_PORTRAIT_MEDIA.file,
    name: ABOUT_PORTRAIT_MEDIA.name,
    alt: { ...ABOUT_PORTRAIT_MEDIA.alt },
  },
)

if (!portraitId) {
  console.error(
    JSON.stringify(
      {
        ok: false,
        error: `Portrait asset missing: ${ABOUT_PORTRAIT_ASSETS_DIR}/${ABOUT_PORTRAIT_MEDIA.file}`,
      },
      null,
      2,
    ),
  )
  process.exit(1)
}

await payload.updateGlobal({
  slug: 'about',
  data: { portrait: portraitId },
  context: { disableRevalidate: true },
})

console.log(JSON.stringify({ ok: true, portraitId }, null, 2))

process.exit(0)
