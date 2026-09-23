import type { SelectField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { useMemo } from 'react'

import { contactCopy } from '@/endpoints/seed/contact-copy'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import { cn } from '@/utilities/ui'
import { Controller } from 'react-hook-form'

import { Error } from '../Error'
import { formControlClassName, formLabelClassName } from '../fieldStyles'
import { Width } from '../Width'

export const Select: React.FC<
  SelectField & {
    control: Control
    errors: Partial<FieldErrorsImpl>
    locale?: Locale
  }
> = ({
  name,
  control,
  errors,
  label,
  options,
  required,
  width,
  defaultValue,
  locale = DEFAULT_LOCALE,
}) => {
  const resolvedOptions = useMemo(() => {
    if (name !== 'project-type') return options
    const byValue = Object.fromEntries(
      contactCopy[locale].form.projectTypes.map((row) => [row.value, row.label]),
    )
    return options.map((opt) => ({
      ...opt,
      label: byValue[opt.value] || opt.label || opt.value,
    }))
  }, [locale, name, options])

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
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field: { onChange, value } }) => {
          const controlledValue = resolvedOptions.find((t) => t.value === value)

          return (
            <SelectComponent onValueChange={(val) => onChange(val)} value={controlledValue?.value}>
              <SelectTrigger
                aria-describedby={errors[name] ? `${name}-error` : undefined}
                aria-invalid={Boolean(errors[name])}
                className={cn(formControlClassName, 'h-11 w-full')}
                id={name}
              >
                <SelectValue placeholder={label} />
              </SelectTrigger>
              <SelectContent>
                {resolvedOptions.map(({ label: optionLabel, value: optionValue }) => (
                  <SelectItem key={optionValue} value={optionValue}>
                    {optionLabel}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectComponent>
          )
        }}
        rules={{ required: required ? uiCopy[locale].fieldRequired : false }}
      />
      {errors[name] ? <Error locale={locale} name={name} /> : null}
    </Width>
  )
}
