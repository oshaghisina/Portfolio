import React from 'react'

import type { Locale } from '@/utilities/locale'

/** Keep discrete Latin names and terms in reading order inside Persian headings. */
export function BidiText({ text, locale }: { text: string; locale: Locale }) {
  if (locale !== 'fa') return text

  const parts = text.split(/([A-Za-z][A-Za-z0-9+._/-]*(?:\s+[A-Za-z][A-Za-z0-9+._/-]*)*)/g)
  return parts.map((part, index) =>
    /^[A-Za-z]/.test(part) ? <bdi className="whitespace-nowrap" dir="ltr" key={index}>{part}</bdi> : part,
  )
}
