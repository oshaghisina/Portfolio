/**
 * CMS rich text standing in for a page opener's copy: the `h1` takes the display role and the
 * paragraph becomes the lede, so an editor-written hero matches a hand-composed one.
 */
export const HERO_RICH_TEXT_CLASS =
  '[&_h1]:text-display [&_h1]:tracking-display [&_h1]:font-medium [&_h1]:text-foreground [&_h1]:text-balance [&_p]:mt-6 [&_p]:max-w-[34ch] md:[&_p]:max-w-[34rem] [&_p]:text-lede [&_p]:text-ink-2'

/** Hero media inside the sheet: at most the canvas width, full viewport below `md`. */
export const HERO_MEDIA_SIZES = '(min-width: 48rem) 78vw, 100vw'
