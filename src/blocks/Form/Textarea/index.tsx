import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import React from 'react'

import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import { cn } from '@/utilities/ui'

import { Error } from '../Error'
import { formLabelClassName, formTextareaClassName } from '../fieldStyles'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    locale?: Locale
    rows?: number
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required,
  rows = 6,
  width,
  locale = DEFAULT_LOCALE,
}) => {
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
      <TextAreaComponent
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        aria-invalid={Boolean(errors[name])}
        className={cn(formTextareaClassName)}
        defaultValue={defaultValue}
        id={name}
        rows={rows}
        {...register(name, {
          required: required ? uiCopy[locale].fieldRequired : false,
        })}
      />
      {errors[name] ? <Error locale={locale} name={name} /> : null}
    </Width>
  )
}
