'use client'

import * as React from 'react'
import { useFormContext } from 'react-hook-form'

import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'

export const Error = ({ locale = DEFAULT_LOCALE, name }: { locale?: Locale; name: string }) => {
  const {
    formState: { errors },
  } = useFormContext()
  return (
    <div className="mt-2 text-red-500 text-sm">
      {(errors[name]?.message as string) || uiCopy[locale].fieldRequired}
    </div>
  )
}
