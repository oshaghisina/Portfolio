/**
 * Write every CMS surface in every site locale, without wiping anything:
 *   pnpm seed:translations            # every surface
 *   pnpm seed:translations home       # one surface
 * Additive and idempotent. Hard-refresh the site (or restart `pnpm dev`) afterwards; the script
 * runs with no Next server, so revalidation is disabled.
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import { isTranslationSurface, seedTranslations, TRANSLATION_SURFACES } from '../../src/endpoints/seed/translations'
import config from '../../src/payload.config'

const requested = process.argv.slice(2).filter((arg) => !arg.startsWith('-'))
const unknown = requested.filter((arg) => !isTranslationSurface(arg))

if (unknown.length) {
  console.error(
    `Unknown surface(s): ${unknown.join(', ')}. Known: ${Object.keys(TRANSLATION_SURFACES).join(', ')}.`,
  )
  process.exit(1)
}

const payload = await getPayload({ config })
const results = await seedTranslations({
  only: requested.filter(isTranslationSurface),
  payload,
})

console.log(JSON.stringify(results, null, 2))

process.exit(0)
