import type { Event, EventHint } from '@sentry/react'

const tawkPatterns = ['tawk', 'twk-', '$_tawk']
const serviceWorkerPatterns = [
  'serviceworker',
  'service worker',
  'sw.js',
  'background sync is disabled',
  'newestworker is null',
  "reading 'waiting'",
  'workbox-window',
]
const chunkLoadPatterns = [
  'chunkloaderror',
  'failed to fetch dynamically imported module',
  'error loading dynamically imported module',
  'importing a module script failed',
  'unable to preload css',
  'not a valid javascript mime type',
]
const networkNoisePatterns = [
  'typeerror: failed to fetch',
  'apolloerror: failed to fetch',
  'typeerror: load failed',
  'apolloerror: load failed',
  'networkerror when attempting to fetch resource',
]
const localStoragePatterns = [
  'localstorage.getitem',
  'localstorage.setitem',
  'window.localstorage.getitem',
  'failed to access storage',
]
const expectedProjectLookupPatterns = [
  'apolloerror: you do not have permission to view this project',
  'you do not have permission to view this project',
  'apolloerror: project not found for name:',
  'project not found for name:',
]
const keepVisiblePatterns = [
  'stripe',
  'sk_live_',
  'acct_',
  'webassembly',
  'lexical',
  'userverificationmodal',
  'sumsub',
  'reviewanswer',
]

const getExceptionValues = (event: Event): string[] =>
  event.exception?.values?.flatMap((exception) => [exception.type, exception.value]).filter(Boolean) as string[]

const getFrameValues = (event: Event): string[] =>
  (event.exception?.values?.flatMap((exception) =>
    exception.stacktrace?.frames?.flatMap((frame) => [frame.filename, frame.function, frame.module]).filter(Boolean),
  ) as string[] | undefined) || []

const getTagValues = (event: Event): string[] =>
  Object.entries(event.tags || {}).map(([key, value]) => `${key}:${String(value)}`)

const getExtraValues = (event: Event): string[] => {
  if (!event.extra) {
    return []
  }

  return Object.values(event.extra)
    .map((value) => {
      if (typeof value === 'string') {
        return value
      }

      try {
        return JSON.stringify(value)
      } catch {
        return ''
      }
    })
    .filter(Boolean)
}

const getOriginalExceptionText = (hint?: EventHint): string => {
  const originalException = hint?.originalException

  if (!originalException) {
    return ''
  }

  if (typeof originalException === 'string') {
    return originalException
  }

  if (originalException instanceof Error) {
    return `${originalException.name}: ${originalException.message}`
  }

  try {
    return JSON.stringify(originalException)
  } catch {
    return String(originalException)
  }
}

const getSearchText = (event: Event, hint?: EventHint): string =>
  [
    event.message,
    event.transaction,
    event.request?.url,
    ...getExceptionValues(event),
    ...getFrameValues(event),
    ...getTagValues(event),
    ...getExtraValues(event),
    getOriginalExceptionText(hint),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

const hasPattern = (text: string, patterns: string[]): boolean => patterns.some((pattern) => text.includes(pattern))

const isChromeMobileWebViewToLowerCaseNoise = (event: Event, text: string): boolean => {
  const browserName = String(event.tags?.['browser.name'] || event.contexts?.browser?.name || '').toLowerCase()
  const browser = String(event.tags?.browser || event.contexts?.browser?.browser || '').toLowerCase()

  return text.includes("reading 'tolowercase'") && (browserName.includes('webview') || browser.includes('webview'))
}

const isExpectedProjectLookupNoise = (event: Event, text: string): boolean => {
  const notFoundTag = String(event.tags?.['not-found'] || '').toLowerCase()

  return hasPattern(text, expectedProjectLookupPatterns) && (notFoundTag === 'projectget' || text.includes('/project/'))
}

/** Returns true when a Sentry event matches a known non-actionable production noise class. */
export const shouldDropSentryEvent = (event: Event, hint?: EventHint): boolean => {
  const text = getSearchText(event, hint)

  if (hasPattern(text, keepVisiblePatterns)) {
    return false
  }

  return (
    hasPattern(text, tawkPatterns) ||
    hasPattern(text, serviceWorkerPatterns) ||
    hasPattern(text, chunkLoadPatterns) ||
    hasPattern(text, networkNoisePatterns) ||
    hasPattern(text, localStoragePatterns) ||
    isChromeMobileWebViewToLowerCaseNoise(event, text) ||
    isExpectedProjectLookupNoise(event, text)
  )
}

/** Sentry beforeSend hook that drops known non-actionable production noise. */
export const filterSentryEvent = (event: Event, hint: EventHint): Event | null => {
  if (shouldDropSentryEvent(event, hint)) {
    return null
  }

  return event
}
