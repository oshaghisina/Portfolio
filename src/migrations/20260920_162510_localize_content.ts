import type { Field } from 'payload'

import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-mongodb'
import { localizeStatus } from 'payload'

import { Categories } from '@/collections/Categories'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Posts } from '@/collections/Posts'
import { Footer } from '@/Footer/config'
import { Header } from '@/Header/config'
import { DEFAULT_LOCALE, LOCALES } from '@/utilities/locale'

/**
 * Rewrites every field newly marked `localized: true` (D-009) from a bare scalar to a
 * locale-keyed object (`{ en: <value> }`), and migrates `_status` to per-locale status via
 * Payload's own `localizeStatus` helper. Existing English content becomes the `en` value —
 * nothing is translated or invented, and every other locale stays empty until an editor fills
 * it in through the admin UI.
 */

function isLocaleKeyed(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false
  const keys = Object.keys(value)
  return keys.length > 0 && keys.every((key) => (LOCALES as readonly string[]).includes(key))
}

function wrapScalar(obj: Record<string, unknown>, name: string) {
  const value = obj[name]
  if (value === undefined || value === null || isLocaleKeyed(value)) return
  obj[name] = { [DEFAULT_LOCALE]: value }
}

function unwrapScalar(obj: Record<string, unknown>, name: string) {
  const value = obj[name]
  if (!isLocaleKeyed(value)) return
  obj[name] = value[DEFAULT_LOCALE] ?? Object.values(value)[0]
}

type LeafOp = typeof wrapScalar

/** Walks `fields` against `obj` — the object those fields' data lives directly on — applying
 *  `leafOp` to every `localized: true` leaf and recursing into groups/arrays/blocks/rows/tabs. */
function walkFields(fields: Field[], obj: unknown, leafOp: LeafOp) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return
  const target = obj as Record<string, unknown>

  for (const field of fields) {
    switch (field.type) {
      case 'row':
      case 'collapsible':
        walkFields(field.fields, target, leafOp)
        break
      case 'tabs':
        for (const tab of field.tabs) {
          if ('name' in tab && tab.name) walkFields(tab.fields, target[tab.name], leafOp)
          else walkFields(tab.fields, target, leafOp)
        }
        break
      case 'group':
        if (!('name' in field)) walkFields(field.fields, target, leafOp)
        else if (field.localized) leafOp(target, field.name)
        else walkFields(field.fields, target[field.name], leafOp)
        break
      case 'array': {
        const rows = target[field.name]
        if (Array.isArray(rows)) for (const row of rows) walkFields(field.fields, row, leafOp)
        break
      }
      case 'blocks': {
        const rows = target[field.name]
        if (Array.isArray(rows)) {
          for (const row of rows) {
            if (!row || typeof row !== 'object') continue
            const blockRow = row as Record<string, unknown>
            const block = field.blocks.find((b) => b.slug === blockRow.blockType)
            if (block) walkFields(block.fields, blockRow, leafOp)
          }
        }
        break
      }
      default:
        if ('name' in field && 'localized' in field && field.localized) leafOp(target, field.name)
    }
  }
}

const COLLECTIONS: Array<{ slug: string; fields: Field[] }> = [
  { slug: 'pages', fields: Pages.fields },
  { slug: 'posts', fields: Posts.fields },
  { slug: 'categories', fields: Categories.fields },
  { slug: 'media', fields: Media.fields },
]

const GLOBALS: Array<{ slug: string; fields: Field[] }> = [
  { slug: 'header', fields: Header.fields },
  { slug: 'footer', fields: Footer.fields },
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const connection = payload.db.connection

  for (const { slug, fields } of COLLECTIONS) {
    const docs = await connection.collection(slug).find({}).toArray()
    for (const doc of docs) {
      walkFields(fields, doc, wrapScalar)
      await connection.collection(slug).replaceOne({ _id: doc._id }, doc)
    }
    payload.logger.info({ msg: `localize-content: migrated ${docs.length} ${slug} document(s)` })
  }

  for (const { slug, fields } of GLOBALS) {
    const doc = await connection.collection('globals').findOne({ globalType: slug })
    if (doc) {
      walkFields(fields, doc, wrapScalar)
      await connection.collection('globals').replaceOne({ _id: doc._id }, doc)
    }
    payload.logger.info({ msg: `localize-content: migrated global ${slug}` })
  }

  for (const slug of ['pages', 'posts'] as const) {
    await localizeStatus.up({ collectionSlug: slug, payload, req })
  }
  for (const slug of ['header', 'footer'] as const) {
    await localizeStatus.up({ globalSlug: slug, payload, req })
  }

  // `localizeStatus.up` defaults every locale to the document's pre-existing single status, to
  // avoid un-publishing English. But "published in every locale" is exactly the state D-009
  // forbids: a locale isn't ready just because English is. Only English has real translated
  // content today, so every other locale goes back to draft until an editor actually publishes it.
  const nonDefaultLocales = LOCALES.filter((locale) => locale !== DEFAULT_LOCALE)
  for (const slug of ['pages', 'posts'] as const) {
    const statusSet = Object.fromEntries(nonDefaultLocales.map((locale) => [`_status.${locale}`, 'draft']))
    await connection.collection(slug).updateMany({}, { $set: statusSet })
    const versionStatusSet = Object.fromEntries(
      nonDefaultLocales.map((locale) => [`version._status.${locale}`, 'draft']),
    )
    await connection.collection(`_${slug}_versions`).updateMany({}, { $set: versionStatusSet })
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  const connection = payload.db.connection

  for (const slug of ['pages', 'posts'] as const) {
    await localizeStatus.down({ collectionSlug: slug, payload, req })
  }
  for (const slug of ['header', 'footer'] as const) {
    await localizeStatus.down({ globalSlug: slug, payload, req })
  }

  for (const { slug, fields } of COLLECTIONS) {
    const docs = await connection.collection(slug).find({}).toArray()
    for (const doc of docs) {
      walkFields(fields, doc, unwrapScalar)
      await connection.collection(slug).replaceOne({ _id: doc._id }, doc)
    }
  }

  for (const { slug, fields } of GLOBALS) {
    const doc = await connection.collection('globals').findOne({ globalType: slug })
    if (doc) {
      walkFields(fields, doc, unwrapScalar)
      await connection.collection('globals').replaceOne({ _id: doc._id }, doc)
    }
  }
}
