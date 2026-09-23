'use client'

import * as React from 'react'
import { useFormContext } from 'react-hook-form'

import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'

export const Error = ({ locale = DEFAULT_LOCALE, name }: { locale?: Locale; name: string }) => {
  const {
    formState: { errors },
  } = useFormContext()

  const message = (errors[name]?.message as string | undefined) || uiCopy[locale].fieldRequired

  return (
    <p className="mt-2 text-small text-danger" id={`${name}-error`} role="alert">
      {message}
    </p>
  )
}
