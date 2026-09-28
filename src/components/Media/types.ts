import type { StaticImageData } from 'next/image'
import type { ElementType, Ref } from 'react'

import type { Media as MediaType } from '@/payload-types'

import type { ImageUsage } from './responsive'

export interface Props {
  alt?: string
  className?: string
  fill?: boolean // for NextImage only
  htmlElement?: ElementType | null
  pictureClassName?: string
  imgClassName?: string
  onClick?: () => void
  /** A missing file — lets a caller swap in its own fallback. */
  onError?: () => void
  onLoad?: () => void
  loading?: 'lazy' | 'eager' // for NextImage only
  /** The page's main hero only: loads eagerly at high fetch priority. */
  priority?: boolean // for NextImage only
  ref?: Ref<HTMLImageElement | HTMLVideoElement | null>
  resource?: MediaType | string | number | null // for Payload media
  size?: string // for NextImage only
  src?: StaticImageData // for static media
  /** Which of the upload's copies the image may load; see `ImageUsage`. Default `figure`. */
  usage?: ImageUsage
  videoClassName?: string
}
