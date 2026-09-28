import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { s3Storage } from '@payloadcms/storage-s3'
import { Plugin } from 'payload'
import {
  notifyContactSubmission,
  rejectRepeatedSubmission,
  submissionKeyField,
} from '@/hooks/contactSubmission'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post, Project } from '@/payload-types'
import { docPath, isRoutedCollection } from '@/i18n/routes'
import { getServerSideURL } from '@/utilities/getURL'
import { withSiteName } from '@/utilities/site'

const s3Enabled = Boolean(process.env.S3_BUCKET && process.env.S3_PUBLIC_URL)
const s3PublicUrl = (process.env.S3_PUBLIC_URL || '').replace(/\/$/, '')

const generateTitle: GenerateTitle<Post | Page | Project> = ({ doc }) => withSiteName(doc?.title)

const generateURL: GenerateURL<Post | Page | Project> = ({ collectionSlug, doc }) => {
  const url = getServerSideURL()
  const collection = isRoutedCollection(collectionSlug) ? collectionSlug : 'pages'

  return doc?.slug ? `${url}${docPath(collection, doc.slug)}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts', 'projects'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    // The form's own "Emails" list never sends: the laptop DB still holds the template's demo
    // auto-reply (from demo@payloadcms.com, to the visitor). The one email per message is
    // `notifyContactSubmission` below (R01).
    beforeEmail: () => [],
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
    formSubmissionOverrides: {
      fields: ({ defaultFields }) => [...defaultFields, submissionKeyField],
      hooks: {
        afterChange: [notifyContactSubmission],
        beforeValidate: [rejectRepeatedSubmission],
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  s3Storage({
    enabled: s3Enabled,
    bucket: process.env.S3_BUCKET || '',
    acl: 'public-read',
    collections: {
      media: {
        disablePayloadAccessControl: true,
        generateFileURL: ({ filename, prefix }) => {
          const key = prefix ? `${prefix}/${filename}` : filename
          return `${s3PublicUrl}/${key}`
        },
      },
    },
    config: {
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
      },
      region: process.env.S3_REGION || 'ir-thr-at1',
      endpoint: process.env.S3_ENDPOINT,
      forcePathStyle: true,
    },
  }),
  mcpPlugin({
    overrideApiKeyCollection: (collection) => {
      collection.access = {
        create: ({ req }) => Boolean(req.user),
        delete: ({ req }) => Boolean(req.user),
        read: ({ req }) => Boolean(req.user),
        unlock: ({ req }) => Boolean(req.user),
        update: ({ req }) => Boolean(req.user),
      }
      return collection
    },
    collections: {
      pages: { enabled: true, description: 'Marketing / content pages.' },
      posts: { enabled: true, description: 'Blog posts.' },
      projects: { enabled: true, description: 'Portfolio projects.' },
      experiences: { enabled: true, description: 'Work experience catalogue.' },
      media: { enabled: true, description: 'Uploads / images.' },
      categories: { enabled: true, description: 'Taxonomy for posts.' },
    },
    globals: {
      header: { enabled: true },
      footer: { enabled: true },
      about: { enabled: true },
    },
  }),
]
