/**
 * Shared chrome for Contact form fields: square geometry, hairline borders, no card shadows.
 * Applied via className on Input / Textarea / SelectTrigger so global UI primitives stay unchanged.
 */
export const formControlClassName =
  [
    'h-11 rounded-none border-0 border-b border-line bg-transparent px-0 shadow-none',
    'text-base text-foreground placeholder:text-ink-3',
    'focus-visible:border-foreground focus-visible:ring-0 focus-visible:outline-none',
    'aria-invalid:border-danger dark:aria-invalid:border-danger',
    'disabled:opacity-50 md:text-sm',
  ].join(' ')

export const formTextareaClassName =
  [
    'min-h-32 rounded-none border-0 border-b border-line bg-transparent px-0 py-2 shadow-none',
    'text-base text-foreground placeholder:text-ink-3',
    'focus-visible:border-foreground focus-visible:ring-0 focus-visible:outline-none',
    'aria-invalid:border-danger dark:aria-invalid:border-danger',
    'disabled:opacity-50 md:text-sm',
  ].join(' ')

export const formLabelClassName = 'mb-3 block text-small font-medium uppercase tracking-wide text-ink-3'

export const formCellClassName = 'min-w-0 border-b border-line p-4 md:p-5'
