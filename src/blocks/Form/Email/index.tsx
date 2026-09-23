import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import { cn } from '@/utilities/ui'

import { Error } from '../Error'
import { formControlClassName, formLabelClassName } from '../fieldStyles'
import { Width } from '../Width'

export const Email: React.FC<
  EmailField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    locale?: Locale
  }
> = ({ name, defaultValue, errors, label, register, required, width, locale = DEFAULT_LOCALE }) => {
  const copy = uiCopy[locale]

  return (
    <Width width={width}>
      <Label className={formLabelClassName} htmlFor={name}>
        {label}
        {required ? (
          <span className="required">
            {' '}
            * <span className="sr-only">{copy.requiredField}</span>
          </span>
        ) : null}
      </Label>
      <Input
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        aria-invalid={Boolean(errors[name])}
        autoComplete="email"
        className={cn(formControlClassName)}
        defaultValue={defaultValue}
        dir="ltr"
        id={name}
        inputMode="email"
        type="email"
        {...register(name, {
          pattern: {
            value: /^\S[^\s@]*@\S+$/,
            message: copy.invalidEmail,
          },
          required: required ? copy.fieldRequired : false,
        })}
      />
      {errors[name] ? <Error locale={locale} name={name} /> : null}
    </Width>
  )
}
