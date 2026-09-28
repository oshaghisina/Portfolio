/**
 * R14: page-speed measurement on a production build (or the live site), read-only.
 *
 *   npx tsx scripts/perf/measure.mts --base http://localhost:3300 --label local --out <dir>
 *   npx tsx scripts/perf/measure.mts --base https://sinaoshaghi.com --label live --out <dir> --nav
 *   npx tsx scripts/perf/measure.mts --base http://localhost:3300 --label local --out <dir> --inventory
 *
 * Options:
 *   --base <url>          site origin (required)
 *   --label <name>        tag for the output files (default: host name)
 *   --out <dir>           where raw JSON + summary go (default: <tmp>/perf-<label>)
 *   --runs <n>            cold+warm pairs per route and profile (default 3)
 *   --routes a,b,c        default /,/work,/work/vin-app
 *   --profiles a,b        mobile,desktop (default both)
 *   --nav                 on the Home warm load, also time a client navigation Home -> Work
 *   --reduced-motion      emulate prefers-reduced-motion: reduce (no intro, no loader hold)
 *   --max-load <n>        wait while the 1-min load average is above this; re-run a batch that
 *                         went above it (default 8)
 *   --inventory           instead of timing: scroll each page to the bottom (no throttling) and
 *                         list every image it loads, with the Payload sizes that exist for it.
 *                         Local servers only (it would make a remote site prefetch every link).
 *
 * Profiles: mobile = 390x844 @3x, touch, CPU 4x slower, 9 Mbps down / 1.5 Mbps up / +150 ms;
 * desktop = 1440x1000 @1x, no CPU throttle, 10 Mbps / 5 Mbps / +40 ms (cable-like).
 * Cold = first load in a fresh browser (empty cache and storage: the first-visit signature intro
 * plays). Warm = the same URL loaded again in that tab (HTTP cache warm, intro already seen).
 * Page loads are GETs only; the only clicks are the menu / language button and, with --nav, the
 * Work link. Nothing is submitted.
 */
import { chromium } from '@playwright/test'
import type { Browser, BrowserContext, CDPSession, Page } from '@playwright/test'
import { mkdirSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

// ---------------------------------------------------------------------------------------- args

const argv = process.argv.slice(2)
const flag = (name: string) => argv.includes(`--${name}`)
const opt = (name: string, fallback?: string) => {
  const i = argv.indexOf(`--${name}`)
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : fallback
}

const base = opt('base')
if (!base) {
  console.error('Usage: npx tsx scripts/perf/measure.mts --base <url> [--label x] [--out dir] [--runs 3] [--nav] [--inventory]')
  process.exit(1)
}
const baseUrl = new URL(base)
const label = opt('label', baseUrl.hostname)!
const outDir = path.resolve(opt('out', path.join(os.tmpdir(), `perf-${label}`))!)
const runs = Number(opt('runs', '3'))
const routes = opt('routes', '/,/work,/work/vin-app')!.split(',')
const profileNames = opt('profiles', 'mobile,desktop')!.split(',') as ProfileName[]
const withNav = flag('nav')
const reducedMotion = flag('reduced-motion')
const maxLoad = Number(opt('max-load', '8'))
const inventory = flag('inventory')
const isLocal = ['localhost', '127.0.0.1', '::1', '[::1]'].includes(baseUrl.hostname)

if (inventory && !isLocal) {
  console.error('--inventory scrolls whole pages and would make a remote site prefetch every link; run it against a local server.')
  process.exit(1)
}

mkdirSync(outDir, { recursive: true })

// ------------------------------------------------------------------------------------ profiles

type ProfileName = 'mobile' | 'desktop'
interface Profile {
  viewport: { width: number; height: number }
  dpr: number
  mobile: boolean
  cpu: number
  net: { latency: number; downloadThroughput: number; uploadThroughput: number }
  netLabel: string
  interaction: string
  navLink: string
}

const PROFILES: Record<ProfileName, Profile> = {
  mobile: {
    viewport: { width: 390, height: 844 },
    dpr: 3,
    mobile: true,
    cpu: 4,
    net: { latency: 150, downloadThroughput: (9_000_000 / 8) | 0, uploadThroughput: (1_500_000 / 8) | 0 },
    netLabel: '9 Mbps down / 1.5 Mbps up / +150 ms RTT (Fast 4G-like), CPU 4x',
    interaction: 'button[aria-label="Open menu"]',
    navLink: 'dialog[open] a[href="/work"]',
  },
  desktop: {
    viewport: { width: 1440, height: 1000 },
    dpr: 1,
    mobile: false,
    cpu: 1,
    net: { latency: 40, downloadThroughput: (10_000_000 / 8) | 0, uploadThroughput: (5_000_000 / 8) | 0 },
    netLabel: '10 Mbps down / 5 Mbps up / +40 ms RTT (cable-like), no CPU throttle',
    interaction: 'header button[aria-label="Language"]',
    navLink: 'header nav a[href="/work"]',
  },
}

// ------------------------------------------------------------------ in-page observer (a string)

/** Runs before any page script. Records paint/LCP/CLS/long tasks/events and the page's own
 * visibility milestones on every animation frame. Plain JS text: tsx rewrites functions. */
const OBSERVER = `(() => {
  if (window.__perf) return;
  const P = window.__perf = { fcp: null, lcp: null, lcpTag: null, lcpUrl: null, lcpSize: 0, shifts: [], longTasks: [], events: [],
    themeAt: null, introSeen: false, introFirstAt: null, introEndAt: null, loaderSeenAt: null, loaderGoneAt: null, contentAt: null, nav: null };
  const obs = (type, fn, extra) => { try { new PerformanceObserver((list) => { for (const e of list.getEntries()) fn(e); })
    .observe(Object.assign({ type: type, buffered: true }, extra || {})); } catch (err) {} };
  obs('paint', (e) => { if (e.name === 'first-contentful-paint') P.fcp = e.startTime; });
  obs('largest-contentful-paint', (e) => { P.lcp = e.startTime; P.lcpSize = e.size; P.lcpUrl = e.url || null;
    const el = e.element; P.lcpTag = el ? el.tagName.toLowerCase() + (el.getAttribute('class') ? '.' + String(el.getAttribute('class')).trim().split(/\\s+/).slice(0, 2).join('.') : '') : null; });
  obs('layout-shift', (e) => { if (!e.hadRecentInput) P.shifts.push([e.startTime, e.value]); });
  obs('longtask', (e) => { P.longTasks.push([e.startTime, e.duration]); });
  obs('event', (e) => { P.events.push([e.name, e.startTime, e.duration, e.interactionId || 0]); }, { durationThreshold: 16 });
  const loaderVisible = () => { const all = document.querySelectorAll('[role="status"][aria-busy="true"]');
    for (const el of all) if (el.getClientRects().length > 0) return true; return false; };
  const h1Visible = () => { const hs = document.querySelectorAll('h1');
    for (const h of hs) { const r = h.getBoundingClientRect(); if (r.height > 0 && r.width > 0) return h; } return null; };
  const tick = () => {
    const now = performance.now();
    const root = document.documentElement;
    if (!root) { requestAnimationFrame(tick); return; }
    if (P.themeAt === null && root.hasAttribute('data-theme')) P.themeAt = now;
    if (root.hasAttribute('data-signature-intro')) { if (!P.introSeen) { P.introSeen = true; P.introFirstAt = now; } }
    else if (P.introSeen && P.introEndAt === null) P.introEndAt = now;
    const busy = loaderVisible();
    if (busy && P.loaderSeenAt === null) P.loaderSeenAt = now;
    if (!busy && P.loaderSeenAt !== null && P.loaderGoneAt === null) P.loaderGoneAt = now;
    if (P.contentAt === null && P.themeAt !== null && !root.hasAttribute('data-signature-intro') && !busy && h1Visible()) P.contentAt = now;
    const n = P.nav;
    if (n && n.contentAt === null) {
      if (busy && n.loaderAt === null) n.loaderAt = now;
      if (!busy && n.loaderAt !== null && n.loaderGoneAt === null) n.loaderGoneAt = now;
      if (n.urlAt === null && location.pathname !== n.from) n.urlAt = now;
      if (n.urlAt !== null && !busy) { const h = h1Visible(); if (h && h.textContent !== n.h1Before) n.contentAt = now; }
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})()`

/** Everything read back from the page after it settles. */
const COLLECT = `(() => {
  const P = window.__perf || {};
  const nav = performance.getEntriesByType('navigation')[0] || {};
  const dpr = window.devicePixelRatio;
  const imgs = Array.from(document.images).filter((i) => i.currentSrc && i.naturalWidth > 0).map((i) => {
    const r = i.getBoundingClientRect(); const cs = getComputedStyle(i);
    return { src: i.currentSrc, nw: i.naturalWidth, nh: i.naturalHeight, dw: Math.round(r.width), dh: Math.round(r.height),
      fit: cs.objectFit, inFirstScreen: r.top < innerHeight && r.bottom > 0 && r.width > 0,
      loading: i.getAttribute('loading') || 'eager', priority: i.getAttribute('fetchpriority') || null, alt: (i.alt || '').slice(0, 80) };
  });
  return {
    url: location.href, dpr: dpr, docHeight: document.documentElement.scrollHeight,
    nav: { dns: nav.domainLookupEnd - nav.domainLookupStart, connect: nav.connectEnd - nav.connectStart, requestStart: nav.requestStart,
      responseStart: nav.responseStart, responseEnd: nav.responseEnd, dcl: nav.domContentLoadedEventEnd, load: nav.loadEventEnd,
      transferSize: nav.transferSize, encodedBodySize: nav.encodedBodySize, decodedBodySize: nav.decodedBodySize, protocol: nav.nextHopProtocol },
    perf: { fcp: P.fcp, lcp: P.lcp, lcpTag: P.lcpTag, lcpUrl: P.lcpUrl, lcpSize: P.lcpSize, shifts: P.shifts, longTasks: P.longTasks,
      themeAt: P.themeAt, introSeen: P.introSeen, introFirstAt: P.introFirstAt, introEndAt: P.introEndAt,
      loaderSeenAt: P.loaderSeenAt, loaderGoneAt: P.loaderGoneAt, contentAt: P.contentAt },
    images: imgs,
    counts: { img: document.images.length, lazy: document.querySelectorAll('img[loading="lazy"]').length }
  };
})()`

// ------------------------------------------------------------------------------ network (CDP)

interface Req {
  url: string
  type: string
  method: string
  start: number
  wallStart: number
  status?: number
  mime?: string
  bytes: number
  decoded: number
  cached: false | 'disk' | 'memory' | 'prefetch' | 'sw'
  finished: boolean
  failed?: string
  ttfbMs?: number
  headers?: Record<string, string>
}

class NetLog {
  reqs = new Map<string, Req>()
  constructor(cdp: CDPSession) {
    cdp.on('Network.requestWillBeSent', (e: any) => {
      if (e.request.url.startsWith('data:') || e.request.url.startsWith('blob:')) return
      this.reqs.set(e.requestId, {
        url: e.request.url, type: e.type ?? 'Other', method: e.request.method, start: e.timestamp, wallStart: Date.now(),
        bytes: 0, decoded: 0, cached: false, finished: false,
      })
    })
    cdp.on('Network.requestServedFromCache', (e: any) => {
      const r = this.reqs.get(e.requestId)
      if (r) r.cached = 'memory'
    })
    cdp.on('Network.responseReceived', (e: any) => {
      const r = this.reqs.get(e.requestId)
      if (!r) return
      const res = e.response
      r.status = res.status
      r.mime = res.mimeType
      r.type = e.type ?? r.type
      if (res.fromDiskCache) r.cached = 'disk'
      else if (res.fromPrefetchCache) r.cached = 'prefetch'
      else if (res.fromServiceWorker) r.cached = 'sw'
      if (res.timing) r.ttfbMs = res.timing.receiveHeadersStart ?? res.timing.receiveHeadersEnd
      if (e.type === 'Document') {
        const h: Record<string, string> = {}
        for (const [k, v] of Object.entries(res.headers ?? {})) {
          if (/^(cache-control|content-encoding|server|x-nextjs-cache|x-nextjs-prerender|server-timing|cf-cache-status|x-cache|age|vary)$/i.test(k)) h[k.toLowerCase()] = String(v)
        }
        r.headers = h
      }
    })
    cdp.on('Network.dataReceived', (e: any) => {
      const r = this.reqs.get(e.requestId)
      if (r) r.decoded += e.dataLength
    })
    cdp.on('Network.loadingFinished', (e: any) => {
      const r = this.reqs.get(e.requestId)
      if (!r) return
      r.bytes = r.cached ? 0 : e.encodedDataLength
      r.finished = true
    })
    cdp.on('Network.loadingFailed', (e: any) => {
      const r = this.reqs.get(e.requestId)
      if (!r) return
      r.failed = e.errorText
      r.finished = true
    })
  }
  reset() {
    this.reqs = new Map()
  }
  /** Requests still open, ignoring any stuck for over 20 s. */
  inflight() {
    const now = Date.now()
    let n = 0
    for (const r of this.reqs.values()) if (!r.finished && now - r.wallStart < 20_000 && r.type !== 'EventSource' && r.type !== 'WebSocket') n++
    return n
  }
  list() {
    return [...this.reqs.values()]
  }
}

const hostKind = (url: string): 'same' | 'bucket' | 'other' => {
  try {
    const u = new URL(url)
    if (u.origin === baseUrl.origin) return 'same'
    if (u.hostname.endsWith('arvanstorage.ir')) return 'bucket'
    return 'other'
  } catch {
    return 'other'
  }
}

function summarizeNet(reqs: Req[]) {
  const sum = (f: (r: Req) => boolean, key: 'bytes' | 'decoded' = 'bytes') => reqs.filter(f).reduce((a, r) => a + r[key], 0)
  const isImg = (r: Req) => r.type === 'Image'
  const rsc = (r: Req) => r.type === 'Fetch' || r.type === 'XHR'
  return {
    requests: reqs.length,
    netRequests: reqs.filter((r) => !r.cached).length,
    cachedRequests: reqs.filter((r) => r.cached).length,
    failed: reqs.filter((r) => r.failed && r.failed !== 'net::ERR_ABORTED').length,
    bytes: {
      total: sum(() => true),
      doc: sum((r) => r.type === 'Document'),
      js: sum((r) => r.type === 'Script'),
      jsDecoded: sum((r) => r.type === 'Script', 'decoded'),
      css: sum((r) => r.type === 'Stylesheet'),
      font: sum((r) => r.type === 'Font'),
      img: sum(isImg),
      imgBucket: sum((r) => isImg(r) && hostKind(r.url) === 'bucket'),
      imgSame: sum((r) => isImg(r) && hostKind(r.url) === 'same'),
      imgOther: sum((r) => isImg(r) && hostKind(r.url) === 'other'),
      media: sum((r) => r.type === 'Media'),
      fetch: sum(rsc),
      other: sum((r) => !['Document', 'Script', 'Stylesheet', 'Font', 'Image', 'Media', 'Fetch', 'XHR'].includes(r.type)),
    },
    counts: {
      js: reqs.filter((r) => r.type === 'Script').length,
      img: reqs.filter(isImg).length,
      imgBucket: reqs.filter((r) => isImg(r) && hostKind(r.url) === 'bucket').length,
      fetch: reqs.filter(rsc).length,
    },
  }
}

// --------------------------------------------------------------------------------- page helpers

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function settle(page: Page, net: NetLog, capMs: number) {
  const t0 = Date.now()
  let quietSince = Date.now()
  while (Date.now() - t0 < capMs) {
    let st: any = null
    try {
      st = await page.evaluate(`(() => { const P = window.__perf; return P ? { c: P.contentAt, i: P.introSeen, e: P.introEndAt, rs: document.readyState } : null })()`)
    } catch {
      // navigation in progress
    }
    if (net.inflight() > 0) quietSince = Date.now()
    const ready = st && st.c !== null && (!st.i || st.e !== null) && st.rs === 'complete'
    if (ready && Date.now() - quietSince >= 2000) return { settled: true, waitedMs: Date.now() - t0 }
    await sleep(250)
  }
  return { settled: false, waitedMs: Date.now() - t0 }
}

async function perfMetrics(cdp: CDPSession) {
  const { metrics } = (await cdp.send('Performance.getMetrics')) as any
  const m: Record<string, number> = {}
  for (const { name, value } of metrics) m[name] = value
  return { script: m.ScriptDuration ?? 0, task: m.TaskDuration ?? 0, layout: m.LayoutDuration ?? 0, style: m.RecalcStyleDuration ?? 0, heap: m.JSHeapUsedSize ?? 0 }
}

function cls(shifts: [number, number][]) {
  let max = 0
  let cur = 0
  let first = -1
  let prev = -1
  for (const [t, v] of shifts) {
    if (first < 0 || t - prev > 1000 || t - first > 5000) {
      cur = 0
      first = t
    }
    cur += v
    prev = t
    max = Math.max(max, cur)
  }
  return max
}

function topImages(reqs: Req[], images: any[], dpr: number, n = 5) {
  const byUrl = new Map<string, any>()
  for (const img of images) {
    byUrl.set(img.src, img)
    try {
      byUrl.set(new URL(img.src).pathname, byUrl.get(new URL(img.src).pathname) ?? img)
    } catch {}
  }
  return reqs
    .filter((r) => r.type === 'Image' && !r.cached && r.bytes > 0)
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, n)
    .map((r) => {
      let img = byUrl.get(r.url)
      if (!img) {
        try {
          img = byUrl.get(new URL(r.url).pathname)
        } catch {}
      }
      return {
        url: r.url.replace(/\?.*$/, ''),
        origin: hostKind(r.url),
        bytes: r.bytes,
        mime: r.mime,
        natural: img ? `${img.nw}x${img.nh}` : null,
        displayed: img ? `${img.dw}x${img.dh}` : null,
        widthRatio: img && img.dw > 0 ? +(img.nw / (img.dw * dpr)).toFixed(2) : null,
        inFirstScreen: img?.inFirstScreen ?? null,
        loading: img?.loading ?? null,
      }
    })
}

// ------------------------------------------------------------------------------------ one load

async function newBrowser(): Promise<Browser> {
  return chromium.launch({ channel: 'chromium', args: ['--disable-features=Translate'] })
}

async function newContext(browser: Browser, p: Profile, skipIntro = false): Promise<BrowserContext> {
  const major = browser.version().split('.')[0]
  const ua = p.mobile
    ? `Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${major}.0.0.0 Mobile Safari/537.36`
    : `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${major}.0.0.0 Safari/537.36`
  const ctx = await browser.newContext({
    viewport: p.viewport,
    deviceScaleFactor: p.dpr,
    isMobile: p.mobile,
    hasTouch: p.mobile,
    userAgent: ua,
    locale: 'en-US',
    reducedMotion: reducedMotion ? 'reduce' : 'no-preference',
  })
  await ctx.addInitScript({ content: OBSERVER })
  if (skipIntro) await ctx.addInitScript({ content: `try { localStorage.setItem('signature-intro', String(Date.now())) } catch (e) {}` })
  return ctx
}

async function throttle(cdp: CDPSession, p: Profile, on = true) {
  await cdp.send('Network.enable')
  await cdp.send('Performance.enable')
  await cdp.send('Network.emulateNetworkConditions', on
    ? { offline: false, ...p.net }
    : { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 })
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: on ? p.cpu : 1 })
}

async function measureLoad(page: Page, cdp: CDPSession, net: NetLog, url: string, p: Profile, kind: 'cold' | 'warm', doNav: boolean) {
  net.reset()
  const before = await perfMetrics(cdp)
  const load0 = os.loadavg()[0]
  let gotoError: string | null = null
  const res = await page.goto(url, { waitUntil: 'commit', timeout: 90_000 }).catch((e) => {
    gotoError = String(e).slice(0, 200)
    return null
  })
  const s = await settle(page, net, p.mobile ? 60_000 : 40_000)
  const after = await perfMetrics(cdp)
  const c: any = await page.evaluate(COLLECT)
  const reqs = net.list()
  const doc = reqs.find((r) => r.type === 'Document')

  // One scripted interaction (menu on the phone, language menu on desktop) for a latency reading.
  let interaction: any = null
  const target = page.locator(p.interaction).first()
  if (await target.isVisible().catch(() => false)) {
    const tClick: number = await page.evaluate('performance.now()')
    if (p.mobile) await target.tap({ timeout: 5000 }).catch(() => {})
    else await target.click({ timeout: 5000 }).catch(() => {})
    await sleep(800)
    const ev: [string, number, number, number][] = await page.evaluate('window.__perf.events')
    const mine = ev.filter((e) => e[3] > 0 && e[1] >= tClick - 5)
    interaction = { target: p.interaction, latencyMs: mine.length ? Math.max(...mine.map((e) => e[2])) : null, events: mine.map((e) => e[0]) }
  }

  // Client navigation Home -> Work: how long the between-pages loader holds (D-049).
  let navResult: any = null
  if (doNav) {
    if (!p.mobile) {
      await page.keyboard.press('Escape').catch(() => {})
      await sleep(300)
    }
    const link = page.locator(p.navLink).first()
    if (await link.isVisible().catch(() => false)) {
      await page.evaluate(`(() => { const h = Array.from(document.querySelectorAll('h1')).find((x) => x.getBoundingClientRect().height > 0);
        window.__perf.nav = { t0: performance.now(), from: location.pathname, h1Before: h ? h.textContent : '', loaderAt: null, loaderGoneAt: null, urlAt: null, contentAt: null }; })()`)
      const navWall = Date.now()
      if (p.mobile) await link.tap({ timeout: 5000 }).catch(() => {})
      else await link.click({ timeout: 5000 }).catch(() => {})
      const tEnd = Date.now() + 20_000
      let n: any = null
      while (Date.now() < tEnd) {
        n = await page.evaluate('window.__perf.nav').catch(() => null)
        if (n && n.contentAt !== null) break
        await sleep(100)
      }
      const navReqs = net.list().filter((r) => r.wallStart >= navWall && (r.type === 'Fetch' || r.type === 'XHR'))
      navResult = n && {
        loaderShownMs: n.loaderAt !== null ? +(n.loaderAt - n.t0).toFixed(0) : null,
        loaderHeldMs: n.loaderAt !== null && n.loaderGoneAt !== null ? +(n.loaderGoneAt - n.loaderAt).toFixed(0) : null,
        urlMs: n.urlAt !== null ? +(n.urlAt - n.t0).toFixed(0) : null,
        contentMs: n.contentAt !== null ? +(n.contentAt - n.t0).toFixed(0) : null,
        rsc: navReqs.map((r) => ({ url: r.url.replace(baseUrl.origin, ''), status: r.status, bytes: r.bytes, ttfbMs: r.ttfbMs != null ? +r.ttfbMs.toFixed(0) : null })),
      }
    }
  }

  const P = c.perf
  const fcp = P.fcp
  const tbt = (P.longTasks as [number, number][])
    .filter(([t]) => fcp == null || t >= fcp)
    .reduce((a, [, d]) => a + Math.max(0, d - 50), 0)
  const round = (x: number | null | undefined) => (x == null ? null : Math.round(x))
  return {
    kind,
    url,
    status: res?.status() ?? null,
    gotoError,
    settled: s.settled,
    loadavgStart: +load0.toFixed(2),
    loadavgEnd: +os.loadavg()[0].toFixed(2),
    docHeaders: doc?.headers ?? null,
    // Chrome applies the emulated latency of a repeat navigation before the page's time origin, so
    // warm times below miss one emulated round trip; the summary adds it back.
    hiddenLatencyMs: kind === 'warm' ? p.net.latency : 0,
    t: {
      connectionSetup: round(c.nav.requestStart),
      ttfb: round(c.nav.responseStart),
      serverWait: round(c.nav.responseStart - c.nav.requestStart),
      htmlDone: round(c.nav.responseEnd),
      fcp: round(fcp),
      pageVisible: round(P.themeAt),
      lcp: round(P.lcp),
      dcl: round(c.nav.dcl),
      load: round(c.nav.load),
      // How long a visitor could see the loader: it is hidden while the page is still invisible
      // (before InitTheme) and while the first-visit intro's curtain covers the page.
      loaderShownMs: P.loaderSeenAt != null && P.loaderGoneAt != null && P.themeAt != null
        ? Math.max(0, round(P.loaderGoneAt - Math.max(P.loaderSeenAt, P.themeAt, P.introEndAt ?? 0))!) : 0,
      loaderGone: round(P.loaderGoneAt),
      introEnd: round(P.introEndAt),
      contentVisible: round(P.contentAt),
    },
    lcpElement: { tag: P.lcpTag, url: P.lcpUrl ? String(P.lcpUrl).replace(/\?.*$/, '') : null, size: P.lcpSize },
    cls: +cls(P.shifts).toFixed(4),
    tbt: Math.round(tbt),
    longTaskMs: Math.round((P.longTasks as [number, number][]).reduce((a, [, d]) => a + d, 0)),
    mainThread: {
      scriptMs: Math.round((after.script - before.script) * 1000),
      taskMs: Math.round((after.task - before.task) * 1000),
      layoutMs: Math.round((after.layout - before.layout) * 1000),
      styleMs: Math.round((after.style - before.style) * 1000),
    },
    interaction,
    nav: navResult,
    net: summarizeNet(reqs),
    doc: { transfer: c.nav.transferSize, encoded: c.nav.encodedBodySize, decoded: c.nav.decodedBodySize, protocol: c.nav.protocol },
    topImages: topImages(reqs, c.images, c.dpr),
    domImages: c.counts,
    docHeight: c.docHeight,
  }
}

// ------------------------------------------------------------------------------------- batches

async function waitForQuietMachine() {
  const t0 = Date.now()
  while (os.loadavg()[0] > maxLoad && Date.now() - t0 < 15 * 60_000) {
    console.log(`  load ${os.loadavg()[0].toFixed(1)} > ${maxLoad}, waiting…`)
    await sleep(20_000)
  }
}

async function runBatch(profileName: ProfileName, route: string) {
  const p = PROFILES[profileName]
  const url = new URL(route, baseUrl).toString()
  const results: any[] = []
  for (let run = 1; run <= runs; run++) {
    const browser = await newBrowser()
    try {
      const ctx = await newContext(browser, p)
      const page = await ctx.newPage()
      const cdp = await ctx.newCDPSession(page)
      const net = new NetLog(cdp)
      await throttle(cdp, p)
      const cold = await measureLoad(page, cdp, net, url, p, 'cold', false)
      const warm = await measureLoad(page, cdp, net, url, p, 'warm', withNav && route === '/')
      const record = { label, base: baseUrl.origin, profile: profileName, route, run, at: new Date().toISOString(), browser: browser.version(), reducedMotion, cold, warm }
      const file = path.join(outDir, `${label}${reducedMotion ? '-reduced' : ''}-${profileName}-${route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '_')}-run${run}.json`)
      writeFileSync(file, JSON.stringify(record, null, 2))
      results.push(record)
      const f = (x: any) => (x == null ? '–' : x)
      console.log(`  run ${run}: cold ttfb ${f(cold.t.ttfb)} fcp ${f(cold.t.fcp)} lcp ${f(cold.t.lcp)} content ${f(cold.t.contentVisible)} img ${Math.round(cold.net.bytes.img / 1024)}KB js ${Math.round(cold.net.bytes.js / 1024)}KB | warm ttfb ${f(warm.t.ttfb)} fcp ${f(warm.t.fcp)} lcp ${f(warm.t.lcp)} content ${f(warm.t.contentVisible)}${warm.nav ? ` nav ${f(warm.nav.contentMs)}ms (loader ${f(warm.nav.loaderHeldMs)})` : ''} [load ${cold.loadavgStart}→${warm.loadavgEnd}]`)
    } finally {
      await browser.close()
    }
  }
  return results
}

// ----------------------------------------------------------------------------------- inventory

async function mediaSizes(filename: string) {
  const q = new URL('/api/media', baseUrl)
  q.searchParams.set('where[filename][equals]', filename)
  q.searchParams.set('limit', '1')
  q.searchParams.set('depth', '0')
  const res = await fetch(q).catch(() => null)
  if (!res || !res.ok) return null
  const j: any = await res.json()
  const d = j.docs?.[0]
  if (!d) return null
  const sizes = Object.entries(d.sizes ?? {})
    .filter(([name, s]: any) => s?.width && !['square', 'og'].includes(name))
    .map(([name, s]: any) => ({ name, width: s.width, height: s.height, bytes: s.filesize }))
    .sort((a, b) => a.width - b.width)
  return { width: d.width, height: d.height, bytes: d.filesize, mime: d.mimeType, sizes }
}

async function runInventory(profileName: ProfileName, route: string) {
  const p = PROFILES[profileName]
  const url = new URL(route, baseUrl).toString()
  const browser = await newBrowser()
  try {
    const ctx = await newContext(browser, p, true)
    const page = await ctx.newPage()
    const cdp = await ctx.newCDPSession(page)
    const net = new NetLog(cdp)
    await throttle(cdp, p, false)
    await page.goto(url, { waitUntil: 'commit', timeout: 60_000 })
    await settle(page, net, 30_000)
    const firstScreen = summarizeNet(net.list())
    // Walk down the page so every lazy image near the viewport loads.
    let y = 0
    for (let i = 0; i < 400; i++) {
      const h: number = await page.evaluate('document.documentElement.scrollHeight')
      if (y >= h) break
      y += Math.round(p.viewport.height * 0.8)
      await page.evaluate(`window.scrollTo(0, ${y})`)
      await sleep(200)
    }
    await sleep(1500)
    await settle(page, net, 20_000)
    const c: any = await page.evaluate(COLLECT)
    const reqs = net.list()
    const full = summarizeNet(reqs)
    const byUrl = new Map<string, any>()
    for (const img of c.images) byUrl.set(img.src, img)
    const imgs = reqs.filter((r) => r.type === 'Image' && r.bytes > 0).sort((a, b) => b.bytes - a.bytes)
    const rows: any[] = []
    for (const r of imgs) {
      const img = byUrl.get(r.url)
      const origin = hostKind(r.url)
      const pathname = new URL(r.url).pathname
      const needW = img && img.dw > 0 ? Math.ceil(img.dw * c.dpr) : null
      const meta = origin === 'bucket' ? await mediaSizes(decodeURIComponent(pathname.replace(/^\//, ''))) : null
      const fit = meta && needW ? meta.sizes.find((s) => s.width >= needW) ?? null : null
      rows.push({
        url: r.url.replace(/\?.*$/, ''),
        origin,
        bytes: r.bytes,
        mime: r.mime,
        natural: img ? `${img.nw}x${img.nh}` : null,
        displayed: img ? `${img.dw}x${img.dh}` : null,
        neededWidth: needW,
        widthRatio: img && needW ? +(img.nw / needW).toFixed(2) : null,
        inFirstScreenAtLoad: null,
        loading: img?.loading ?? null,
        smallestCoveringSize: fit ? { name: fit.name, width: fit.width, bytes: fit.bytes } : meta ? (meta.width >= (needW ?? 0) ? { name: 'original', width: meta.width, bytes: meta.bytes } : null) : null,
        sizesAvailable: meta ? meta.sizes.map((s) => `${s.name}:${s.width}`).join(' ') : null,
      })
    }
    const savings = rows.reduce((a, r) => a + (r.smallestCoveringSize && r.smallestCoveringSize.bytes < r.bytes ? r.bytes - r.smallestCoveringSize.bytes : 0), 0)
    const record = {
      label, base: baseUrl.origin, profile: profileName, route, at: new Date().toISOString(), browser: browser.version(), dpr: c.dpr,
      docHeight: c.docHeight, firstScreen: firstScreen.bytes, full: full.bytes, fullCounts: full.counts,
      imageCount: rows.length, imageBytes: rows.reduce((a, r) => a + r.bytes, 0), bytesSavedWithExistingSizes: savings, images: rows,
    }
    const file = path.join(outDir, `${label}-inventory-${profileName}-${route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '_')}.json`)
    writeFileSync(file, JSON.stringify(record, null, 2))
    console.log(`  inventory: ${rows.length} images, ${Math.round(record.imageBytes / 1024)} KB after a full scroll (first screen ${Math.round(firstScreen.bytes.img / 1024)} KB); existing Payload sizes would save ~${Math.round(savings / 1024)} KB`)
    return record
  } finally {
    await browser.close()
  }
}

// --------------------------------------------------------------------------------------- summary

const median = (xs: (number | null)[]) => {
  const s = xs.filter((x): x is number => x != null && !Number.isNaN(x)).sort((a, b) => a - b)
  if (!s.length) return null
  const m = s.length >> 1
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}
const spread = (xs: (number | null)[]) => {
  const s = xs.filter((x): x is number => x != null && !Number.isNaN(x))
  return s.length ? [Math.min(...s), Math.max(...s)] : null
}

function summarize(all: any[]) {
  const rows: any[] = []
  // Times from navigation start, with a warm load's hidden emulated latency added back.
  const at = (x: number | null, l: any) => (x == null ? null : x + (l.hiddenLatencyMs ?? 0))
  const pick: Record<string, (l: any) => number | null> = {
    ttfb: (l) => at(l.t.ttfb, l),
    htmlDone: (l) => at(l.t.htmlDone, l),
    fcp: (l) => at(l.t.fcp, l),
    pageVisible: (l) => at(l.t.pageVisible, l),
    lcp: (l) => at(l.t.lcp, l),
    introEnd: (l) => at(l.t.introEnd, l),
    loaderShown: (l) => l.t.loaderShownMs,
    contentVisible: (l) => at(l.t.contentVisible, l),
    load: (l) => at(l.t.load, l),
    cls: (l) => l.cls,
    tbt: (l) => l.tbt,
    scriptMs: (l) => l.mainThread.scriptMs,
    interactionMs: (l) => l.interaction?.latencyMs,
    totalKB: (l) => Math.round(l.net.bytes.total / 1024),
    jsKB: (l) => Math.round(l.net.bytes.js / 1024),
    imgKB: (l) => Math.round(l.net.bytes.img / 1024),
    imgBucketKB: (l) => Math.round(l.net.bytes.imgBucket / 1024),
    imgSameKB: (l) => Math.round(l.net.bytes.imgSame / 1024),
    docKB: (l) => Math.round(l.net.bytes.doc / 1024),
    requests: (l) => l.net.requests,
    netRequests: (l) => l.net.netRequests,
    navContentMs: (l) => l.nav?.contentMs,
    navLoaderHeldMs: (l) => l.nav?.loaderHeldMs,
  }
  const groups = new Map<string, any[]>()
  for (const r of all) {
    for (const kind of ['cold', 'warm'] as const) {
      const key = `${r.profile}|${r.route}|${kind}`
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key)!.push(r[kind])
    }
  }
  for (const [key, loads] of groups) {
    const [profile, route, kind] = key.split('|')
    const row: any = { profile, route, kind, n: loads.length, loadavg: spread(loads.flatMap((l) => [l.loadavgStart, l.loadavgEnd])) }
    for (const [name, f] of Object.entries(pick)) {
      const xs = loads.map(f)
      row[name] = { median: median(xs), spread: spread(xs) }
    }
    row.lcpElements = [...new Set(loads.map((l) => `${l.lcpElement.tag ?? '?'}${l.lcpElement.url ? ' ' + l.lcpElement.url.split('/').pop() : ''}`))]
    rows.push(row)
  }
  return rows
}

function toMarkdown(rows: any[]) {
  const cols = ['ttfb', 'htmlDone', 'pageVisible', 'fcp', 'lcp', 'introEnd', 'loaderShown', 'contentVisible', 'cls', 'tbt', 'interactionMs', 'jsKB', 'imgKB', 'totalKB', 'requests']
  const fmt = (c: any, name: string) => {
    if (!c || c.median == null) return '–'
    const m = name === 'cls' ? c.median.toFixed(3) : c.median
    const sp = c.spread ? (name === 'cls' ? `${c.spread[0].toFixed(3)}–${c.spread[1].toFixed(3)}` : `${c.spread[0]}–${c.spread[1]}`) : ''
    return `${m} (${sp})`
  }
  const head = `| profile | route | load | ${cols.join(' | ')} |\n| ${['---', '---', '---', ...cols.map(() => '---')].join(' | ')} |`
  const body = rows.map((r) => `| ${r.profile} | ${r.route} | ${r.kind} | ${cols.map((c) => fmt(r[c], c)).join(' | ')} |`).join('\n')
  return `${head}\n${body}`
}

// ------------------------------------------------------------------------------------------ main

const meta = {
  label, base: baseUrl.origin, at: new Date().toISOString(), runs, routes, profiles: profileNames.map((n) => ({ name: n, ...PROFILES[n] })),
  reducedMotion, withNav, machine: { cpus: os.cpus().length, model: os.cpus()[0]?.model, memGB: Math.round(os.totalmem() / 2 ** 30), loadavg: os.loadavg() },
}

if (inventory) {
  const inv: any[] = []
  for (const pn of profileNames) for (const route of routes) {
    console.log(`[inventory ${pn} ${route}]`)
    inv.push(await runInventory(pn, route))
  }
  writeFileSync(path.join(outDir, `${label}-inventory-summary.json`), JSON.stringify({ meta, pages: inv.map(({ images, ...rest }) => ({ ...rest, top: images.slice(0, 8) })) }, null, 2))
} else {
  const all: any[] = []
  const batches: any[] = []
  for (const pn of profileNames) for (const route of routes) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      await waitForQuietMachine()
      const loadBefore = os.loadavg()[0]
      console.log(`[${label} ${pn} ${route}] attempt ${attempt}, load ${loadBefore.toFixed(2)}`)
      const res = await runBatch(pn, route)
      const peak = Math.max(...res.flatMap((r) => [r.cold.loadavgStart, r.cold.loadavgEnd, r.warm.loadavgEnd]))
      batches.push({ profile: pn, route, attempt, loadBefore: +loadBefore.toFixed(2), loadAfter: +os.loadavg()[0].toFixed(2), peak })
      if (peak <= maxLoad || attempt === 3) {
        all.push(...res)
        break
      }
      console.log(`  load peaked at ${peak} (> ${maxLoad}); re-running this batch`)
    }
  }
  const rows = summarize(all)
  const tops: Record<string, any> = {}
  for (const r of all) {
    const key = `${r.profile} ${r.route}`
    if (r.run === 1) tops[key] = r.cold.topImages
  }
  writeFileSync(path.join(outDir, `${label}${reducedMotion ? '-reduced' : ''}-summary.json`), JSON.stringify({ meta, batches, rows, topImagesColdRun1: tops }, null, 2))
  const md = `# ${label}${reducedMotion ? ' (reduced motion)' : ''} ${meta.at}\n\nTimes in ms from navigation start, median (min–max) over ${runs} runs. Warm times include the emulated round trip Chrome hides on a repeat navigation.\n\n${toMarkdown(rows)}\n`
  writeFileSync(path.join(outDir, `${label}${reducedMotion ? '-reduced' : ''}-summary.md`), md)
  console.log('\n' + md)
}
