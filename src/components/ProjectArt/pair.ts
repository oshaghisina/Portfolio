import type { Media, Project } from '@/payload-types'

/** Any project shape that can supply cover art — the archive row, a mosaic tile, the next case. */
export type ProjectArtSource = Partial<Pick<Project, 'cover' | 'coverCompanion' | 'hero'>>

export interface CoverPair {
  lead: Media | null
  companion: Media | null
}

const hasUrl = (media: unknown): media is Media =>
  typeof media === 'object' && media !== null && 'url' in media && Boolean(media.url)

const isVideo = (media: Media): boolean => Boolean(media.mimeType?.startsWith('video/'))

/**
 * The two screens a project's cover shows. The lead is the archive cover, else the first
 * populated hero screen. The companion is the chosen `coverCompanion`, else the hero's second
 * frame (its first often repeats the cover in full), and never the lead again or a video. An
 * explicit override stands alone: it must not acquire unrelated companion imagery.
 */
export function coverPair(project: ProjectArtSource, override?: unknown): CoverPair {
  if (hasUrl(override)) return { lead: override, companion: null }
  const hero = project.hero?.items?.map((item) => item.media) ?? []
  const lead = [project.cover, ...hero].find(hasUrl) ?? null
  if (!lead) return { lead: null, companion: null }
  const companion =
    [project.coverCompanion, ...hero.slice(1), hero[0]].find(
      (media): media is Media =>
        hasUrl(media) && !isVideo(media) && media.id !== lead.id && media.url !== lead.url,
    ) ?? null
  return { lead, companion }
}

/** A phone screen, or a tall capture of one — framed as a phone and cropped from the top. */
export const isPhoneScreen = (media: Media): boolean =>
  !isVideo(media) &&
  typeof media.width === 'number' &&
  typeof media.height === 'number' &&
  media.height / media.width >= 1.6

/**
 * How the plate arranges its screens. Two phones is the house composition; a desktop screen sits
 * behind a phone or another desktop screen when the product has no second phone to show.
 */
export type ArtLayout = 'phone' | 'phones' | 'desktop' | 'desktop-phone' | 'desktop-pair'

export function artLayout({
  lead,
  companion,
}: {
  lead: Media
  companion: Media | null
}): ArtLayout {
  const leadPhone = isPhoneScreen(lead)
  if (!companion) return leadPhone ? 'phone' : 'desktop'
  const companionPhone = isPhoneScreen(companion)
  if (leadPhone && companionPhone) return 'phones'
  if (leadPhone || companionPhone) return 'desktop-phone'
  return 'desktop-pair'
}
