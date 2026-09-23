import canUseDOM from './canUseDOM'

export const getServerSideURL = () => {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000')
  )
}

/** Origins allowed for CORS (canonical + alternate production hosts). */
export const getAllowedOrigins = (): string[] => {
  const origins = new Set<string>()
  const primary = getServerSideURL()
  if (primary) origins.add(primary.replace(/\/$/, ''))
  for (const extra of [
    process.env.NEXT_PUBLIC_ALT_SERVER_URL,
    'https://sinaoshaghi.com',
    'https://sinaoshaghi.ir',
  ]) {
    if (extra) origins.add(extra.replace(/\/$/, ''))
  }
  return [...origins]
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}
