import type { RequiredDataFromCollectionSlug } from 'payload'

import { buildWorkPage, workCopy } from './work-content'

/**
 * Static `/work` for an empty database (English only, like `homeStatic`). Only the page shell is
 * static — the archive block still reads the `projects` collection, so with no database content it
 * renders its honest empty state rather than a second, hand-kept project list.
 */
export const workStatic: RequiredDataFromCollectionSlug<'pages'> = buildWorkPage(workCopy.en)
