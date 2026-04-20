import { useEffect, useMemo } from 'react'

const prerenderUserAgentPattern = /prerender|bot|crawler|spider|discordbot|slackbot|twitterbot|facebookexternalhit/i

const isPrerenderUserAgent = (userAgent: string) => prerenderUserAgentPattern.test(userAgent)

type UsePrerenderReadyProps = {
  prerenderReady: boolean
}

/**
 * Detects whether the current runtime appears to be prerender/crawler traffic.
 */
export const useIsPrerenderRuntime = () => {
  return useMemo(() => {
    if (typeof navigator === 'undefined') return false
    return isPrerenderUserAgent(navigator.userAgent || '')
  }, [])
}

/**
 * Syncs prerender readiness to `window.prerenderReady` using runtime-specific readiness rules.
 * @param options Prerender readiness state.
 */
export const usePrerenderReady = (options: UsePrerenderReadyProps) => {
  const { prerenderReady } = options
  const isPrerenderRuntime = useIsPrerenderRuntime()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prerenderWindow = window as Window & { prerenderReady?: boolean }
    prerenderWindow.prerenderReady = prerenderReady
  }, [prerenderReady])

  return {
    isPrerenderRuntime,
    prerenderReady,
  }
}
