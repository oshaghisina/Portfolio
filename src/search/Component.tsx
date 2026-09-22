'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter } from 'next/navigation'

import { localePath } from '@/i18n/navigation'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'

export const Search: React.FC<{ locale?: Locale }> = ({ locale = DEFAULT_LOCALE }) => {
  const [value, setValue] = useState('')
  const router = useRouter()
  const copy = uiCopy[locale]

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    router.push(localePath(locale, `/search${debouncedValue ? `?q=${debouncedValue}` : ''}`))
  }, [debouncedValue, locale, router])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Label htmlFor="search" className="sr-only">
          {copy.search}
        </Label>
        <Input
          id="search"
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder={copy.searchPlaceholder}
        />
        <button type="submit" className="sr-only">
          {uiCopy[locale].submit}
        </button>
      </form>
    </div>
  )
}
