import { useEffect, useRef, useState } from 'react'

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

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

/**
 * Fetches Open Graph / SEO metadata for a URL via the microlink.io free-tier API.
 * Results are cached in memory for the session lifetime.
 */
export const useOgPreview = (url: string | null | undefined) => {
  const [state, setState] = useState<OgPreviewState>({ data: null, loading: false, error: false })
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!url) {
      setState({ data: null, loading: false, error: false })
      return
    }

    if (ogCache.has(url)) {
      setState({ data: ogCache.get(url)!, loading: false, error: false })
      return
    }

    abortRef.current?.abort()
    abortRef.current = new AbortController()
    setState({ data: null, loading: true, error: false })

    fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`, {
      signal: abortRef.current.signal,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 'success') {
          const data: OgData = {
            title: json.data?.title ?? undefined,
            description: json.data?.description ?? undefined,
            image: json.data?.image?.url ?? undefined,
            url: json.data?.url ?? url,
            domain: extractDomain(json.data?.url ?? url),
          }
          ogCache.set(url, data)
          setState({ data, loading: false, error: false })
        } else {
          setState({ data: null, loading: false, error: true })
        }
      })
      .catch((err: Error) => {
        if (err.name === 'AbortError') return
        setState({ data: null, loading: false, error: true })
      })

    return () => {
      abortRef.current?.abort()
    }
  }, [url])

  return state
}
