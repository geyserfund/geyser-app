import { useEffect, useState } from 'react'

export type OgData = {
  title?: string
  description?: string
  image?: string
  url?: string
  domain?: string
}

type OgPreviewState = {
  data: OgData | null
  loading: boolean
  error: boolean
}

/** Module-level cache so the same URL is never fetched twice per session */
const ogCache = new Map<string, OgData>()
const ogInFlight = new Map<string, Promise<OgData>>()
const MAX_CONCURRENT_OG_REQUESTS = 3
let activeOgRequests = 0
const queuedOgRequests: Array<() => void> = []

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export const resetOgPreviewCacheForTests = () => {
  ogCache.clear()
  ogInFlight.clear()
  activeOgRequests = 0
  queuedOgRequests.splice(0, queuedOgRequests.length)
}

const runWithOgRequestLimit = async <T>(request: () => Promise<T>): Promise<T> => {
  if (activeOgRequests >= MAX_CONCURRENT_OG_REQUESTS) {
    await new Promise<void>((resolve) => {
      queuedOgRequests.push(resolve)
    })
  }

  activeOgRequests += 1

  try {
    return await request()
  } finally {
    activeOgRequests -= 1
    queuedOgRequests.shift()?.()
  }
}

export const fetchOgPreviewData = async (url: string): Promise<OgData> => {
  if (ogCache.has(url)) {
    return ogCache.get(url) as OgData
  }

  if (ogInFlight.has(url)) {
    return ogInFlight.get(url) as Promise<OgData>
  }

  const request = runWithOgRequestLimit(async () => {
    const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`)
    const json = await res.json()

    if (json.status !== 'success') {
      throw new Error('Open Graph preview unavailable')
    }

    const data: OgData = {
      title: json.data?.title ?? undefined,
      description: json.data?.description ?? undefined,
      image: json.data?.image?.url ?? undefined,
      url: json.data?.url ?? url,
      domain: extractDomain(json.data?.url ?? url),
    }

    ogCache.set(url, data)
    return data
  }).finally(() => {
    ogInFlight.delete(url)
  })

  ogInFlight.set(url, request)
  return request
}

/**
 * Fetches Open Graph / SEO metadata for a URL via the microlink.io free-tier API.
 * Results are cached in memory for the session lifetime.
 */
export const useOgPreview = (url: string | null | undefined, { enabled = true }: { enabled?: boolean } = {}) => {
  const [state, setState] = useState<OgPreviewState>({ data: null, loading: false, error: false })

  useEffect(() => {
    if (!url || !enabled) {
      setState({ data: null, loading: false, error: false })
      return
    }

    if (ogCache.has(url)) {
      setState({ data: ogCache.get(url) as OgData, loading: false, error: false })
      return
    }

    let isCurrent = true
    setState({ data: null, loading: true, error: false })

    fetchOgPreviewData(url)
      .then((data) => {
        if (isCurrent) {
          setState({ data, loading: false, error: false })
        }
      })
      .catch(() => {
        if (isCurrent) {
          setState({ data: null, loading: false, error: true })
        }
      })

    return () => {
      isCurrent = false
    }
  }, [enabled, url])

  return state
}
