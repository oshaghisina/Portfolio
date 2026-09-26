/**
 * The Skills section's seven capability rows, in the order they render. The two-digit index code
 * (01–07) follows this order, not admin row order, so a drag in the CMS can never scramble the
 * numbering. Titles, skills and notes are content and live in the CMS, localized; the labels below
 * are admin-only.
 *
 * The rows name what the work delivers, not the software behind it — product, design, evidence,
 * growth, delivery, AI (D-043). Tools are a short "Selected tools" row under the list: evidence of
 * the workflow, not its identity.
 *
 * Dependency-free for the same reason as `./toolLogos`: `config.ts` imports it, and that config is
 * evaluated by the server, by the admin client bundle and by `payload generate:types`.
 */
export const CAPABILITY_KEYS = [
  'product',
  'design',
  'research',
  'data',
  'growth',
  'delivery',
  'ai',
] as const

export type CapabilityKey = (typeof CAPABILITY_KEYS)[number]

const CAPABILITY_LABELS: Record<CapabilityKey, string> = {
  ai: 'AI',
  data: 'Data',
  delivery: 'Delivery',
  design: 'Design',
  growth: 'Growth',
  product: 'Product',
  research: 'Research',
}

/**
 * Derived rather than hand-written, so a new key without a label is a compile error. The order is
 * the render order, which is also the order the two-digit index codes follow.
 */
export const CAPABILITY_OPTIONS: { label: string; value: CapabilityKey }[] = CAPABILITY_KEYS.map(
  (value) => ({ label: CAPABILITY_LABELS[value], value }),
)

export const isCapabilityKey = (value: unknown): value is CapabilityKey =>
  typeof value === 'string' && (CAPABILITY_KEYS as readonly string[]).includes(value)
