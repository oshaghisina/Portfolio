'use client'

export { WrittenHeadline, type WrittenHeadlineProps } from './WrittenHeadline'
export {
  fullTextFromTones,
  segmentText,
  unitsFromTones,
  type WrittenTone,
  type WriteUnit,
} from './segment'
export { WRITE_MAX_MS, WRITE_MIN_MS, WRITE_START_DELAY_MS, writeDurationMs } from './timing'
