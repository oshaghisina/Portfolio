import React from 'react'

import { Signature } from '@/components/Signature'

/**
 * The admin's login-screen logo (`admin.components.graphics.Logo`): Sina's signature in place of
 * Payload's wordmark, on the login, create-first-user, forgot and reset screens.
 *
 * The admin doesn't load Tailwind, so size and colour are inline. `currentColor` follows the admin
 * theme's text colour, the same token Payload's own logo fills with.
 */
export const Logo: React.FC = () => (
  <div aria-label="Sina Oshaghi" role="img" style={{ color: 'var(--theme-elevation-1000)' }}>
    <Signature style={{ height: '4.5rem', maxWidth: '100%' }} />
  </div>
)
