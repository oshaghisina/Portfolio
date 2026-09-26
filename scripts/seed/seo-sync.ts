/**
 * Apply SEO DB follow-ups without a full projects sync:
 *   DATABASE_URL=… pnpm exec tsx scripts/seed/seo-sync.ts
 * Idempotent — retired `/work/<slug>` → `/work` redirects + Carsparency nextProject chain.
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import { syncCarsparencyNextProjects } from '../../src/endpoints/seed/sync-carsparency-next'
import { syncRetiredRedirects } from '../../src/endpoints/seed/sync-retired-redirects'
import config from '../../src/payload.config'

const payload = await getPayload({ config })
const redirects = await syncRetiredRedirects({ payload })
const carsparencyNext = await syncCarsparencyNextProjects({ payload })

console.log(JSON.stringify({ redirects, carsparencyNext }, null, 2))

process.exit(0)
