import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Project } from '../../../payload-types'
import { projectPath, WORK_PATH } from '../../../i18n/routes'

/**
 * A project shows up in two places: its own future `/work/<slug>` and the `/work` archive that
 * lists it (which lives in `pages`, hence the pages-sitemap tag). Both are request-rendered
 * because they read the locale header, so these calls are cheap insurance rather than a hot path.
 */
const revalidate = (doc: Pick<Project, 'slug'>) => {
  revalidatePath(WORK_PATH)
  revalidatePath(projectPath(doc))
  revalidateTag('pages-sitemap', 'max')
}

export const revalidateProject: CollectionAfterChangeHook<Project> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating project at path: ${projectPath(doc)}`)
      revalidate(doc)
    }

    // Un-publishing or renaming: the old path has to drop out of the archive too
    if (previousDoc?._status === 'published' && (doc._status !== 'published' || previousDoc.slug !== doc.slug)) {
      payload.logger.info(`Revalidating old project at path: ${projectPath(previousDoc)}`)
      revalidate(previousDoc)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Project> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate && doc?.slug) {
    revalidate(doc)
  }

  return doc
}
