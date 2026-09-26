/**
 * One-off: seed only the CProperty case study, without running the full `seed:case-studies`
 * (another session has unfinished Yaravan work registered there). Deleted after use.
 *
 *   pnpm exec cross-env NODE_OPTIONS=--no-deprecation tsx .seed-cproperty.mts
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import { CASE_STUDIES } from './src/endpoints/seed/case-studies'
import { assertNoUnseededLocales, seedCaseStudy } from './src/endpoints/seed/case-studies/seed-case-study'
import config from './src/payload.config'

const payload = await getPayload({ config })
const study = CASE_STUDIES.find((candidate) => candidate.slug === 'cproperty')
if (!study) throw new Error('no case-study config for cproperty')

await assertNoUnseededLocales(payload, study)
const result = await seedCaseStudy(payload, study)
console.log(JSON.stringify({ projectId: result.projectId, created: result.created, media: result.media }, null, 2))
process.exit(0)
