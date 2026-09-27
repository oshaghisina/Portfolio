import React from 'react'

import { SIGNATURE_INTRO, signatureIntro } from './intro'
import { SignatureDraw } from './SignatureDraw'

/**
 * The first-load intro's controller, as a blocking <head> script. A plain inline script rather
 * than `next/script`: that runs only once the framework has loaded, and this has to decide before
 * the first paint.
 */
export const SignatureIntroScript: React.FC = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `(${signatureIntro.toString()})(${JSON.stringify(SIGNATURE_INTRO)})`,
    }}
  />
)

/** Ruled lines drawn beside the sheet: enough 2.5rem rows for a screen about 2000px tall. */
const FRAME_RULES = Array.from({ length: 48 }, (_, rule) => rule)

/**
 * The page's frame, ruled on the curtain while the name is written: the header's bottom border,
 * the sheet's two rails, then the ruled lines beside the sheet (`signature.css`). It is built from
 * the page's own `.canvas` and the header's height, so each line lands on the page's line and holds
 * still when the curtain lifts off the page.
 */
const SignatureFrame: React.FC = () => (
  <div className="signature-frame">
    <div className="canvas signature-frame-rails" />
    <div className="canvas signature-frame-header border-b border-line">
      <div className="h-14 xl:h-16" />
    </div>
    <div className="signature-frame-rules">
      {FRAME_RULES.map((rule) => (
        <span key={rule} style={{ '--signature-frame-rule': rule } as React.CSSProperties} />
      ))}
    </div>
  </div>
)

/**
 * The first-load curtain: a blank sheet the name is written on before it docks into the header.
 * Rendered on every page but shown only while the script above has marked <html>, so returning
 * visitors, crawlers and readers without JavaScript never see it. Decorative; any input skips it.
 */
export const SignatureIntro: React.FC = () => (
  <div aria-hidden="true" className="signature-intro" data-lenis-prevent="">
    <div className="signature-intro-curtain">
      <SignatureFrame />
    </div>
    <div className="signature-intro-mark">
      <SignatureDraw mode="write" />
    </div>
  </div>
)
