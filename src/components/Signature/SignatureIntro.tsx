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

/**
 * The first-load curtain: a blank sheet the name is written on before it docks into the header.
 * Rendered on every page but shown only while the script above has marked <html>, so returning
 * visitors, crawlers and readers without JavaScript never see it. Decorative; any input skips it.
 */
export const SignatureIntro: React.FC = () => (
  <div aria-hidden="true" className="signature-intro" data-lenis-prevent="">
    <div className="signature-intro-curtain" />
    <div className="signature-intro-mark">
      <SignatureDraw mode="write" />
    </div>
  </div>
)
