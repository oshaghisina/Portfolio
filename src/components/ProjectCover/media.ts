import type { Media, Project } from '@/payload-types'

/** Any project shape that can supply a lead visual — the archive cover and the case-study hero. */
export type ProjectMediaSource = Partial<Pick<Project, 'cover' | 'hero'>>

/**
 * The visual a project leads with: its archive cover, else the first hero screen. Returns the
 * unpopulated `cover` (an id, or nothing) when neither is a real document, which `ProjectCover`
 * reads as "no media" and answers with the pending plate.
 */
export const projectMedia = (
  project: ProjectMediaSource,
): Media | string | number | null | undefined => {
  if (project.cover && typeof project.cover === 'object') return project.cover
  const first = project.hero?.items?.[0]?.media
  return first && typeof first === 'object' ? first : project.cover
}
