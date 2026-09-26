/**
 * One-off (delete after use): seed only the VIN case study, for its new roadmap chapter and the
 * two workbook downloads. Refuses to run if any existing VIN upload changed on disk — with S3 on,
 * a replaced upload is renamed and its old object deleted, which breaks production.
 *   pnpm exec tsx .seed-vin-roadmap.mts [--apply]
 */
import 'dotenv/config'

import fs from 'fs/promises'
import path from 'path'
import { getPayload } from 'payload'

import { CASE_STUDIES } from './src/endpoints/seed/case-studies'
import {
  assertNoUnseededLocales,
  seedCaseStudy,
} from './src/endpoints/seed/case-studies/seed-case-study'
import { VIN_SLUG } from './src/endpoints/seed/case-studies/vin-app'
import config from './src/payload.config'

const apply = process.argv.includes('--apply')
const payload = await getPayload({ config })
const vin = CASE_STUDIES.find((study) => study.slug === VIN_SLUG)!
const assetsDir = path.resolve(process.cwd(), vin.assetsDir)

const changed: string[] = []
for (const spec of Object.values(vin.media) as { file: string; name: string }[]) {
  const { docs } = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 1,
    pagination: false,
    where: { filename: { equals: spec.name } },
  })
  const size = (await fs.stat(path.resolve(assetsDir, spec.file))).size
  const doc = docs[0]
  const state = !doc ? 'new' : doc.filesize === size ? 'same' : 'CHANGED'
  console.log(`${state.padEnd(7)} ${spec.name}  disk=${size} db=${doc?.filesize ?? '-'}`)
  if (state === 'CHANGED') changed.push(spec.name)
}

if (changed.length) {
  console.error(`Refusing: ${changed.length} changed upload(s) would be replaced on S3.`)
  process.exit(1)
}
if (!apply) {
  console.log('Dry run: nothing written. Re-run with --apply.')
  process.exit(0)
}

await assertNoUnseededLocales(payload, vin)
const result = await seedCaseStudy(payload, vin)
console.log(JSON.stringify(result, null, 2))
process.exit(0)
