import type { CaseStudyCopy } from '@/components/CaseStudy/copy'
import type { Locale } from '@/utilities/locale'

/** What every case-study block component receives besides its own Payload fields. */
export interface CaseStudyBlockContext {
  locale: Locale
  copy: CaseStudyCopy
}
