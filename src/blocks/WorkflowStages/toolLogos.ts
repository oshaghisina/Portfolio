/**
 * The tool set behind the TOOLS / STACK section: stable `toolKey` → canonical product name →
 * local brand mark. The `toolKey` select options in `config.ts`, the `<img src>` in
 * `ToolLogo.tsx` and the visible product name all read this one file, so the schema and the
 * renderer cannot drift apart.
 *
 * Deliberately dependency-free — no React, no node built-ins and above all no `@/payload-types`.
 * `config.ts` imports this module, and that config is evaluated by the server, by the admin
 * client bundle and by `payload generate:types`, where importing the file being generated is a
 * circular dependency that surfaces as an opaque loader error.
 *
 * Marks are committed under `public/tool-logos/`, sourced from official brand resources or
 * permissively licensed catalogues. Nothing here is a Lucide substitution or a hand-drawn
 * approximation: a tool with no verified mark carries `src: null` and renders as a name-only
 * cell until its file lands (see `ToolLogo.tsx`).
 *
 * SVG wherever the vendor publishes one. Two do not publish a vector anywhere reachable, so they
 * carry their own icon as PNG instead — `ToolLogo` renders a plain `<img>`, so the format is free,
 * and both files are well above the 40px box they land in. A PNG here means "no vector exists",
 * never "no-one looked".
 */

/**
 * How a mark survives the near-black dark paper (`--paper` is `oklch(20% 0.012 262)`).
 *
 * - `none`   — the mark carries its own brand colour and reads on both surfaces.
 * - `invert` — a black-and-white mark with *internal* contrast (a black container plus a white
 *              glyph). Plain `dark:invert` flips it to a white container with a black glyph,
 *              which is the official light-on-dark treatment. Never add `brightness-0` here: it
 *              would flatten the glyph into the container and leave a solid blob.
 * - `whiten` — a flat, single-colour dark mark with no internal contrast.
 *              `dark:brightness-0 dark:invert` renders it as a clean white silhouette.
 * - `asset`  — an official light-on-dark file exists; `srcDark` is required.
 */
export type ToolLogoOnDark = 'asset' | 'invert' | 'none' | 'whiten'

type ToolLogoBase = {
  /** Canonical, human-visible product name. Never localized — a brand name is a brand name. */
  name: string
  /** Path under `public/`, or `null` while no verified mark has been sourced. */
  src: null | string
}

export type ToolLogo = ToolLogoBase &
  ({ onDark: 'asset'; srcDark: string } | { onDark: 'invert' | 'none' | 'whiten'; srcDark?: never })

/** Render order within a category comes from the CMS rows, not from this map. */
export const TOOL_LOGOS = {
  // 01 · Design & Prototyping
  figma: { name: 'Figma', onDark: 'none', src: '/tool-logos/figma.svg' },
  // No FigJam entry on purpose. Figma publishes no standalone FigJam symbol — not in its brand
  // kit, its static app icons or any catalogue — and FigJam is a surface of Figma rather than a
  // separate tool, so the Figma mark stands for both. Add it back here the day a real mark exists.
  // Lime tile with a black glyph, so it holds on both surfaces as shipped.
  higgsfield: { name: 'Higgsfield', onDark: 'none', src: '/tool-logos/higgsfield.png' },

  // 02 · AI & Agents
  chatgpt: {
    name: 'ChatGPT',
    onDark: 'asset',
    src: '/tool-logos/chatgpt.svg',
    srcDark: '/tool-logos/chatgpt-dark.svg',
  },
  claude: { name: 'Claude', onDark: 'none', src: '/tool-logos/claude.svg' },
  grok: {
    name: 'Grok',
    onDark: 'asset',
    src: '/tool-logos/grok.svg',
    srcDark: '/tool-logos/grok-dark.svg',
  },
  codex: {
    name: 'Codex',
    onDark: 'asset',
    src: '/tool-logos/codex.svg',
    srcDark: '/tool-logos/codex-dark.svg',
  },
  githubCopilot: {
    name: 'GitHub Copilot',
    onDark: 'asset',
    src: '/tool-logos/github-copilot.svg',
    srcDark: '/tool-logos/github-copilot-dark.svg',
  },
  openrouter: {
    name: 'OpenRouter',
    onDark: 'asset',
    src: '/tool-logos/openrouter.svg',
    srcDark: '/tool-logos/openrouter-dark.svg',
  },
  // Official mark, official colour: a pale blue that reads soft on light paper by design.
  langchain: { name: 'LangChain', onDark: 'none', src: '/tool-logos/langchain.svg' },
  typesafeAi: {
    name: 'TypeSafe AI',
    onDark: 'asset',
    src: '/tool-logos/typesafe-ai.svg',
    srcDark: '/tool-logos/typesafe-ai-dark.svg',
  },

  // 03 · Build & Delivery
  cursor: {
    name: 'Cursor',
    onDark: 'asset',
    src: '/tool-logos/cursor.svg',
    srcDark: '/tool-logos/cursor-dark.svg',
  },
  // Full colour with its own internal gradients — no dark treatment applies or is needed.
  antigravity: { name: 'Google Antigravity', onDark: 'none', src: '/tool-logos/antigravity.svg' },
  vscode: { name: 'Visual Studio Code', onDark: 'none', src: '/tool-logos/vscode.svg' },
  payloadCms: {
    name: 'Payload CMS',
    onDark: 'asset',
    src: '/tool-logos/payload.svg',
    srcDark: '/tool-logos/payload-dark.svg',
  },
  // Black disc with a white wordmark — `invert` gives the official white-disc treatment.
  nextjs: { name: 'Next.js', onDark: 'invert', src: '/tool-logos/nextjs.svg' },
  docker: { name: 'Docker', onDark: 'none', src: '/tool-logos/docker.svg' },

  // 04 · Data & Product Intelligence
  ga4: { name: 'Google Analytics 4', onDark: 'none', src: '/tool-logos/ga4.svg' },
  amplitude: { name: 'Amplitude', onDark: 'none', src: '/tool-logos/amplitude.svg' },
  // Two ink bars beside two brand-green ones; the ink pair goes white on dark, as Heap's own
  // light-on-dark lockup does.
  heap: {
    name: 'Heap',
    onDark: 'asset',
    src: '/tool-logos/heap.svg',
    srcDark: '/tool-logos/heap-dark.svg',
  },
  // Favicon-sourced: the black container tile was stripped so only the starburst remains.
  fullstory: { name: 'FullStory', onDark: 'invert', src: '/tool-logos/fullstory.svg' },
  // Full-colour gradient prism, so it needs no dark treatment.
  clarity: { name: 'Microsoft Clarity', onDark: 'none', src: '/tool-logos/clarity.png' },
  hotjar: { name: 'Hotjar', onDark: 'none', src: '/tool-logos/hotjar.svg' },
  // Flat black, no internal contrast — the silhouette treatment, same as Sentry below.
  umami: { name: 'Umami', onDark: 'whiten', src: '/tool-logos/umami.svg' },

  // 05 · Growth & Measurement
  googleTagManager: {
    name: 'Google Tag Manager',
    onDark: 'none',
    src: '/tool-logos/google-tag-manager.svg',
  },
  googleAds: { name: 'Google Ads', onDark: 'none', src: '/tool-logos/google-ads.svg' },
  googleSearchConsole: {
    name: 'Google Search Console',
    onDark: 'none',
    src: '/tool-logos/google-search-console.svg',
  },

  // 06 · Infrastructure & Operations
  supabase: { name: 'Supabase', onDark: 'none', src: '/tool-logos/supabase.svg' },
  vercel: {
    name: 'Vercel',
    onDark: 'asset',
    src: '/tool-logos/vercel.svg',
    srcDark: '/tool-logos/vercel-dark.svg',
  },
  coolify: { name: 'Coolify', onDark: 'none', src: '/tool-logos/coolify.svg' },
  gitea: { name: 'Gitea', onDark: 'none', src: '/tool-logos/gitea.svg' },
  // Flat #362D59 — unreadable on dark paper, and Sentry's own dark mark is white.
  sentry: { name: 'Sentry', onDark: 'whiten', src: '/tool-logos/sentry.svg' },
} as const satisfies Record<string, ToolLogo>

export type ToolKey = keyof typeof TOOL_LOGOS

export const TOOL_KEYS = Object.keys(TOOL_LOGOS) as ToolKey[]

/** Payload select options, derived so `config.ts` can never list a key the renderer can't draw. */
export const TOOL_OPTIONS = TOOL_KEYS.map((value) => ({ label: TOOL_LOGOS[value].name, value }))

export const isToolKey = (value: unknown): value is ToolKey =>
  typeof value === 'string' && Object.prototype.hasOwnProperty.call(TOOL_LOGOS, value)

export const resolveTool = (value: unknown): ToolLogo | undefined =>
  isToolKey(value) ? TOOL_LOGOS[value] : undefined

/**
 * The six categories, in the order they are rendered. The index code (01–06) comes from this
 * order, not from admin row order, so a drag in the CMS can never scramble the numbering.
 * `title` is content and lives in the CMS, localized.
 */
export const CATEGORY_KEYS = [
  'designPrototyping',
  'aiAgents',
  'buildDelivery',
  'dataIntelligence',
  'growthMeasurement',
  'infraOperations',
] as const

export type CategoryKey = (typeof CATEGORY_KEYS)[number]

export const CATEGORY_OPTIONS: { label: string; value: CategoryKey }[] = [
  { label: 'Design & Prototyping', value: 'designPrototyping' },
  { label: 'AI & Agents', value: 'aiAgents' },
  { label: 'Build & Delivery', value: 'buildDelivery' },
  { label: 'Data & Product Intelligence', value: 'dataIntelligence' },
  { label: 'Growth & Measurement', value: 'growthMeasurement' },
  { label: 'Infrastructure & Operations', value: 'infraOperations' },
]
