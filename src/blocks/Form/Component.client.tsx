'use client'

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { useRouter } from 'next/navigation'
import React, { useCallback, useRef, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

import { fields } from './fields'
import { ContactClosingNote, ContactPaths, type ContactPathData } from './ContactPaths'
import { getClientSideURL } from '@/utilities/getURL'
import { formCellClassName } from './fieldStyles'

export type FormBlockClientProps = {
  blockName?: string
  blockType?: 'formBlock'
  closingNote?: DefaultTypedEditorState | null
  emailHref?: string | null
  emailPath?: ContactPathData | null
  enableIntro?: boolean | null
  form: FormType
  formPath?: ContactPathData | null
  introContent?: DefaultTypedEditorState
  locale?: Locale
  sectionTitle?: string | null
}

const FORM_ANCHOR_ID = 'contact-form'

function newSubmissionKey(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  // randomUUID needs a secure context; plain-http previews fall back to this.
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`
}

export const FormBlockClient: React.FC<{ id?: string } & FormBlockClientProps> = (props) => {
  const {
    closingNote,
    emailHref,
    emailPath,
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    formPath,
    introContent,
    locale = DEFAULT_LOCALE,
    sectionTitle,
  } = props

  const copy = uiCopy[locale]
  const statusRef = useRef<HTMLDivElement>(null)

  const formMethods = useForm()
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<{ message: string } | undefined>()
  const router = useRouter()
  // One key per filled form: a retry after a lost response is recognised, not saved twice (R01).
  const [submissionKey] = useState(newSubmissionKey)
  const sendingRef = useRef(false)

  const onSubmit = useCallback(
    (data: Record<string, unknown>) => {
      const submitForm = async () => {
        if (sendingRef.current) return
        sendingRef.current = true
        setError(undefined)
        setIsLoading(true)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
              submissionKey,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          // 409: this key was saved by an earlier try, so the message is already received.
          if (!req.ok && req.status !== 409) {
            setIsLoading(false)
            setError({ message: copy.formError })
            statusRef.current?.focus()
            return
          }

          setIsLoading(false)
          setHasSubmitted(true)
          queueMicrotask(() => statusRef.current?.focus())

          if (confirmationType === 'redirect' && redirect?.url) {
            router.push(redirect.url)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: copy.formError,
          })
          statusRef.current?.focus()
        } finally {
          sendingRef.current = false
        }
      }

      void submitForm()
    },
    [copy.formError, router, formID, redirect, confirmationType, submissionKey],
  )

  return (
    <div className="flex flex-col gap-section-sm">
      <ContactPaths
        emailHref={emailHref}
        emailPath={emailPath}
        formAnchorId={FORM_ANCHOR_ID}
        formPath={formPath}
        locale={locale}
      />

      <div className="flex flex-col" id={FORM_ANCHOR_ID}>
        {sectionTitle && !hasSubmitted ? (
          <h2 className="mb-6 text-h2 tracking-h2 font-medium text-foreground md:mb-8">
            {sectionTitle}
          </h2>
        ) : null}

        {enableIntro && introContent && !hasSubmitted ? (
          <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
        ) : null}

        <div className="border border-line">
          <FormProvider {...formMethods}>
            <div
              aria-live="polite"
              className={cn(!hasSubmitted && !error && !isLoading && 'sr-only')}
              ref={statusRef}
              tabIndex={-1}
            >
              {!isLoading && hasSubmitted && confirmationType === 'message' && confirmationMessage ? (
                <div className={cn(formCellClassName, 'flex flex-col gap-3')}>
                  <RichText
                    className="[&_h2]:text-h2 [&_h2]:tracking-h2 [&_h2]:font-medium [&_h2]:text-foreground [&_p]:mt-2 [&_p]:text-lede [&_p]:text-ink-2"
                    data={confirmationMessage}
                    enableGutter={false}
                    enableProse={false}
                  />
                </div>
              ) : null}

              {error ? (
                <div className={cn(formCellClassName, 'flex flex-col gap-3')}>
                  <p className="text-small text-danger">{error.message}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      className="text-small font-medium text-foreground underline-offset-4 hover:underline"
                      onClick={() => setError(undefined)}
                      type="button"
                    >
                      {copy.tryAgain}
                    </button>
                    {emailHref ? (
                      <a
                        className="text-small font-medium text-foreground underline-offset-4 hover:underline"
                        dir="ltr"
                        href={emailHref}
                      >
                        {emailPath?.ctaLabel || emailHref}
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>

            {!hasSubmitted ? (
              <form id={formID} noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap">
                  {formFromProps?.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (!Field) return null
                    return (
                      <Field
                        form={formFromProps}
                        key={index}
                        locale={locale}
                        {...field}
                        {...formMethods}
                        control={control}
                        errors={errors}
                        register={register}
                      />
                    )
                  })}
                </div>

                <div className={cn(formCellClassName)}>
                  <Button arrow disabled={isLoading} type="submit" variant="default">
                    {isLoading ? copy.formSubmitting : submitButtonLabel}
                  </Button>
                </div>
              </form>
            ) : null}
          </FormProvider>
        </div>

        {!hasSubmitted ? <ContactClosingNote note={closingNote} /> : null}
      </div>
    </div>
  )
}
