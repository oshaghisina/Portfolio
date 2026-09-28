'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import { localePath } from '@/i18n/navigation'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'

import { cleanSearchQuery, MAX_SEARCH_LENGTH, SEARCH_PATH, searchHref } from './url'

/** How long typing pauses before the results follow. */
const TYPING_DELAY = 250

/**
 * The `/search` field. It starts from the URL's `q` and never navigates on its own first render,
 * so a pasted or refreshed `/search?q=…` keeps its query. Typing *replaces* the URL — one history
 * entry per visit, not one per pause — so Back leaves the page instead of replaying keystrokes.
 * Without JavaScript the form is a plain GET to the same URL.
 */
export const Search: React.FC<{ locale?: Locale; query?: string }> = ({
  locale = DEFAULT_LOCALE,
  query = '',
}) => {
  const router = useRouter()
  const copy = uiCopy[locale]
  const [value, setValue] = useState(query)
  // The URL's query as this field last saw it, and the last query the field itself asked for.
  const [seen, setSeen] = useState(query)
  const [requested, setRequested] = useState(query)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Back/Forward or the header's search link changed `q` underneath the field: follow it. Our own
  // replace arriving after the visitor kept typing must not overwrite what they typed since.
  if (query !== seen) {
    setSeen(query)
    if (query !== requested) {
      setValue(query)
      setRequested(query)
    }
  }

  useEffect(() => () => clearTimeout(timer.current), [])

  const request = (next: string) => {
    clearTimeout(timer.current)
    const q = cleanSearchQuery(next)
    if (q === requested) return
    setRequested(q)
    router.replace(searchHref(locale, q), { scroll: false })
  }

  return (
    <div>
      <form
        action={localePath(locale, SEARCH_PATH)}
        method="get"
        onSubmit={(e) => {
          e.preventDefault()
          request(value)
        }}
        role="search"
      >
        <Label htmlFor="search" className="sr-only">
          {copy.search}
        </Label>
        <Input
          autoComplete="off"
          enterKeyHint="search"
          id="search"
          maxLength={MAX_SEARCH_LENGTH}
          name="q"
          onChange={(event) => {
            const next = event.target.value
            setValue(next)
            clearTimeout(timer.current)
            timer.current = setTimeout(() => request(next), TYPING_DELAY)
          }}
          placeholder={copy.searchPlaceholder}
          type="search"
          value={value}
        />
        <button type="submit" className="sr-only">
          {locale === 'fa' ? copy.search : copy.submit}
        </button>
      </form>
    </div>
  )
}
