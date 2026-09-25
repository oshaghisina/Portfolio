/**
 * Seed every case study into the current database without wiping anything:
 *   pnpm seed:case-studies
 * Additive and idempotent — media is reused by filename, each project is matched by slug.
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import { seedCaseStudies } from '../../src/endpoints/seed/case-studies'
import { syncCarsparencyNextProjects } from '../../src/endpoints/seed/sync-carsparency-next'
import config from '../../src/payload.config'

const payload = await getPayload({ config })
const { results } = await seedCaseStudies({ payload })
const carsparencyNext = await syncCarsparencyNextProjects({ payload })

console.log(
  JSON.stringify(
    {
      caseStudies: results.map((result) => ({
        projectId: result.projectId,
        created: result.created,
        media: Object.keys(result.media).length,
        mediaIds: result.media,
      })),
      carsparencyNext,
    },
    null,
    2,
  ),
)

process.exit(0)
