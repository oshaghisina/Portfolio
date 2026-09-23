/**
 * The tool set behind the TOOLS / STACK section: stable `toolKey` → canonical product name →
 * local brand mark → official product URL. The `toolKey` select options in `config.ts`, the
 * `<img src>` in `ToolLogo.tsx`, the visible product name and the destination of each cell link
 * all read this one file, so the schema and the renderer cannot drift apart.
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
 * SVG wherever the vendor publishes one. Four do not publish a vector anywhere reachable, so they
 * carry their own icon as PNG instead — `ToolLogo` renders a plain `<img>`, so the format is free,
 * and every one of those files is well above the 40px box it lands in. A PNG here means "no vector
 * exists", never "no-one looked".
 *
 * `url` is the canonical official destination (product site, app page, or docs/landing — never a
 * search result, Wikipedia page or third-party mirror). Ownership matches name/logo: code, not CMS.
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
  /** Official product / platform URL opened by the full-cell link. */
  url: string
}

export type ToolLogo = ToolLogoBase &
  ({ onDark: 'asset'; srcDark: string } | { onDark: 'invert' | 'none' | 'whiten'; srcDark?: never })

/** Render order within a category comes from the CMS rows, not from this map. */
export const TOOL_LOGOS = {
  // 01 · Design & Creative Production
  figma: { name: 'Figma', onDark: 'none', src: '/tool-logos/figma.svg', url: 'https://www.figma.com/' },
  // No FigJam entry on purpose. Figma publishes no standalone FigJam symbol — not in its brand
  // kit, its static app icons or any catalogue — and FigJam is a surface of Figma rather than a
  // separate tool, so the Figma mark stands for both. Add it back here the day a real mark exists.
  sketch: { name: 'Sketch', onDark: 'none', src: '/tool-logos/sketch.svg', url: 'https://www.sketch.com/' },
  // Adobe's own CC product icons. Both are a near-black navy tile (#00005B) carrying a bright
  // lavender glyph, which is exactly how Adobe renders them on a dark surface — the tile going
  // darker than the paper is the official look, so no dark treatment applies. Media Encoder's
  // mark is 240×234 rather than square; `object-contain` keeps that proportion as shipped.
  afterEffects: {
    name: 'Adobe After Effects',
    onDark: 'none',
    src: '/tool-logos/after-effects.svg',
    url: 'https://www.adobe.com/products/aftereffects.html',
  },
  mediaEncoder: {
    name: 'Adobe Media Encoder',
    onDark: 'none',
    src: '/tool-logos/media-encoder.svg',
    url: 'https://www.adobe.com/products/media-encoder.html',
  },
  // Lime tile with a black glyph, so it holds on both surfaces as shipped.
  higgsfield: {
    name: 'Higgsfield',
    onDark: 'none',
    src: '/tool-logos/higgsfield.png',
    url: 'https://higgsfield.ai/',
  },

  // 02 · AI & Agents
  chatgpt: {
    name: 'ChatGPT',
    onDark: 'asset',
    src: '/tool-logos/chatgpt.svg',
    srcDark: '/tool-logos/chatgpt-dark.svg',
    url: 'https://chatgpt.com/',
  },
  claude: { name: 'Claude', onDark: 'none', src: '/tool-logos/claude.svg', url: 'https://claude.ai/' },
  // The 2025 multi-colour spark on a transparent ground, so it needs no dark treatment. The
  // macOS app icon would have worked too, but it bakes in a white tile that glares on dark paper.
  gemini: {
    name: 'Google Gemini',
    onDark: 'none',
    src: '/tool-logos/gemini.svg',
    url: 'https://gemini.google.com/',
  },
  grok: {
    name: 'Grok',
    onDark: 'asset',
    src: '/tool-logos/grok.svg',
    srcDark: '/tool-logos/grok-dark.svg',
    url: 'https://grok.com/',
  },
  codex: {
    name: 'Codex',
    onDark: 'asset',
    src: '/tool-logos/codex.svg',
    srcDark: '/tool-logos/codex-dark.svg',
    url: 'https://openai.com/codex/',
  },
  // Nous Research's `hermes-agent`, the self-improving CLI agent — not the React Native JS engine
  // that happens to share the name. No vector is published, so the mark is its own app icon.
  hermes: {
    name: 'Hermes Agent',
    onDark: 'none',
    src: '/tool-logos/hermes.png',
    url: 'https://hermes-agent.nousresearch.com/',
  },
  // A different product from `grok` above, not a second label for it: the desktop agent app that
  // ships under the name "Grok Bot" (bundle `com.anysphere.sand`, code-signed by Anysphere).
  // Labelled and marked exactly as it ships, since no vector exists either.
  grokBot: {
    name: 'Grok Bot',
    onDark: 'none',
    src: '/tool-logos/grok-bot.png',
    url: 'https://x.ai/bot',
  },
  // The open-source multi-channel agent gateway (MIT, `openclaw/openclaw`), formerly Clawdbot and
  // then Moltbot. Unaffiliated with Anthropic — "Claw" is not "Claude", and `claude` above is a
  // separate entry. Mark is the project's own lobster, taken from the published package.
  openclaw: {
    name: 'OpenClaw',
    onDark: 'none',
    src: '/tool-logos/openclaw.svg',
    url: 'https://openclaw.ai/',
  },
  openrouter: {
    name: 'OpenRouter',
    onDark: 'asset',
    src: '/tool-logos/openrouter.svg',
    srcDark: '/tool-logos/openrouter-dark.svg',
    url: 'https://openrouter.ai/',
  },
  // Official mark, official colour: a pale blue that reads soft on light paper by design.
  langchain: {
    name: 'LangChain',
    onDark: 'none',
    src: '/tool-logos/langchain.svg',
    url: 'https://www.langchain.com/',
  },
  typesafeAi: {
    name: 'TypeSafe AI',
    onDark: 'asset',
    src: '/tool-logos/typesafe-ai.svg',
    srcDark: '/tool-logos/typesafe-ai-dark.svg',
    url: 'https://typesafe.ai/',
  },

  // 03 · Build & Delivery
  cursor: {
    name: 'Cursor',
    onDark: 'asset',
    src: '/tool-logos/cursor.svg',
    srcDark: '/tool-logos/cursor-dark.svg',
    url: 'https://cursor.com/',
  },
  // Full colour with its own internal gradients — no dark treatment applies or is needed.
  antigravity: {
    name: 'Google Antigravity',
    onDark: 'none',
    src: '/tool-logos/antigravity.svg',
    url: 'https://antigravity.google/',
  },
  vscode: {
    name: 'Visual Studio Code',
    onDark: 'none',
    src: '/tool-logos/vscode.svg',
    url: 'https://code.visualstudio.com/',
  },
  payloadCms: {
    name: 'Payload CMS',
    onDark: 'asset',
    src: '/tool-logos/payload.svg',
    srcDark: '/tool-logos/payload-dark.svg',
    url: 'https://payloadcms.com/',
  },
  // Black disc with a white wordmark — `invert` gives the official white-disc treatment.
  nextjs: {
    name: 'Next.js',
    onDark: 'invert',
    src: '/tool-logos/nextjs.svg',
    url: 'https://nextjs.org/',
  },
  docker: { name: 'Docker', onDark: 'none', src: '/tool-logos/docker.svg', url: 'https://www.docker.com/' },

  // 04 · Data & Product Intelligence
  ga4: {
    name: 'Google Analytics 4',
    onDark: 'none',
    src: '/tool-logos/ga4.svg',
    url: 'https://marketingplatform.google.com/about/analytics/',
  },
  amplitude: {
    name: 'Amplitude',
    onDark: 'none',
    src: '/tool-logos/amplitude.svg',
    url: 'https://amplitude.com/',
  },
  // Two ink bars beside two brand-green ones; the ink pair goes white on dark, as Heap's own
  // light-on-dark lockup does.
  heap: {
    name: 'Heap',
    onDark: 'asset',
    src: '/tool-logos/heap.svg',
    srcDark: '/tool-logos/heap-dark.svg',
    url: 'https://www.heap.io/',
  },
  // Favicon-sourced: the black container tile was stripped so only the starburst remains.
  fullstory: {
    name: 'FullStory',
    onDark: 'invert',
    src: '/tool-logos/fullstory.svg',
    url: 'https://www.fullstory.com/',
  },
  // Full-colour gradient prism, so it needs no dark treatment.
  clarity: {
    name: 'Microsoft Clarity',
    onDark: 'none',
    src: '/tool-logos/clarity.png',
    url: 'https://clarity.microsoft.com/',
  },
  hotjar: { name: 'Hotjar', onDark: 'none', src: '/tool-logos/hotjar.svg', url: 'https://www.hotjar.com/' },
  // Flat black, no internal contrast — the silhouette treatment, same as Sentry below.
  umami: { name: 'Umami', onDark: 'whiten', src: '/tool-logos/umami.svg', url: 'https://umami.is/' },

  // 05 · Growth & Measurement
  googleTagManager: {
    name: 'Google Tag Manager',
    onDark: 'none',
    src: '/tool-logos/google-tag-manager.svg',
    url: 'https://marketingplatform.google.com/about/tag-manager/',
  },
  googleAds: {
    name: 'Google Ads',
    onDark: 'none',
    src: '/tool-logos/google-ads.svg',
    url: 'https://ads.google.com/',
  },
  googleSearchConsole: {
    name: 'Google Search Console',
    onDark: 'none',
    src: '/tool-logos/google-search-console.svg',
    url: 'https://search.google.com/search-console/about',
  },

  // 06 · Infrastructure & Operations
  supabase: {
    name: 'Supabase',
    onDark: 'none',
    src: '/tool-logos/supabase.svg',
    url: 'https://supabase.com/',
  },
  vercel: {
    name: 'Vercel',
    onDark: 'asset',
    src: '/tool-logos/vercel.svg',
    srcDark: '/tool-logos/vercel-dark.svg',
    url: 'https://vercel.com/',
  },
  coolify: { name: 'Coolify', onDark: 'none', src: '/tool-logos/coolify.svg', url: 'https://coolify.io/' },
  // The three git platforms sit together. GitHub's mark is a flat black Octocat whose eyes and
  // gaps are cut-outs rather than white fills, so the silhouette treatment gives exactly the
  // white-on-dark lockup GitHub publishes. Mark from GitHub's own Octicons set (`mark-github-24`).
  github: { name: 'GitHub', onDark: 'whiten', src: '/tool-logos/github.svg', url: 'https://github.com/' },
  // The tanuki, straight from `gitlab-org/gitlab` — four brand oranges, legible on both surfaces.
  gitlab: { name: 'GitLab', onDark: 'none', src: '/tool-logos/gitlab.svg', url: 'https://gitlab.com/' },
  gitea: { name: 'Gitea', onDark: 'none', src: '/tool-logos/gitea.svg', url: 'https://gitea.com/' },
  // Flat #362D59 — unreadable on dark paper, and Sentry's own dark mark is white.
  sentry: { name: 'Sentry', onDark: 'whiten', src: '/tool-logos/sentry.svg', url: 'https://sentry.io/' },

  // 07 · Knowledge & Research
  obsidian: {
    name: 'Obsidian',
    onDark: 'none',
    src: '/tool-logos/obsidian.svg',
    url: 'https://obsidian.md/',
  },
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
 * The seven categories, in the order they are rendered. The index code (01–07) comes from this
 * order, not from admin row order, so a drag in the CMS can never scramble the numbering.
 * `title` is content and lives in the CMS, localized; the labels below are admin-only.
 */
export const CATEGORY_KEYS = [
  'designPrototyping',
  'aiAgents',
  'buildDelivery',
  'dataIntelligence',
  'growthMeasurement',
  'infraOperations',
  'knowledgeResearch',
] as const

export type CategoryKey = (typeof CATEGORY_KEYS)[number]

/**
 * `designPrototyping` is a historical key: the category widened to cover motion and encoding, and
 * renaming it would invalidate the stored select value on every existing row — the same trade the
 * block already makes by keeping its `workflowStages` slug. The label is what changed.
 */
const CATEGORY_LABELS: Record<CategoryKey, string> = {
  aiAgents: 'AI & Agents',
  buildDelivery: 'Build & Delivery',
  dataIntelligence: 'Data & Product Intelligence',
  designPrototyping: 'Design & Creative Production',
  growthMeasurement: 'Growth & Measurement',
  infraOperations: 'Infrastructure & Operations',
  knowledgeResearch: 'Knowledge & Research',
}

/**
 * Derived rather than hand-written, so a new key without a label is a compile error. The order is
 * the render order, which is also the order the two-digit index codes follow.
 */
export const CATEGORY_OPTIONS: { label: string; value: CategoryKey }[] = CATEGORY_KEYS.map(
  (value) => ({ label: CATEGORY_LABELS[value], value }),
)
