import type { TextField } from '@payloadcms/plugin-form-builder/types'
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

export const Text: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    locale?: Locale
  }
> = ({ name, defaultValue, errors, label, register, required, width, locale = DEFAULT_LOCALE }) => {
  const autocomplete =
    name === 'full-name' ? 'name' : name === 'company' ? 'organization' : undefined

  return (
    <Width width={width}>
      <Label className={formLabelClassName} htmlFor={name}>
        {label}
        {required ? (
          <span className="required">
            {' '}
            * <span className="sr-only">{uiCopy[locale].requiredField}</span>
          </span>
        ) : null}
      </Label>
      <Input
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        aria-invalid={Boolean(errors[name])}
        autoComplete={autocomplete}
        className={cn(formControlClassName)}
        defaultValue={defaultValue}
        id={name}
        type="text"
        {...register(name, {
          required: required ? uiCopy[locale].fieldRequired : false,
        })}
      />
      {errors[name] ? <Error locale={locale} name={name} /> : null}
    </Width>
  )
}
