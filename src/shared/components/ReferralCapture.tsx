import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router'

import { referrerHeroIdAtom } from '@/shared/state/referralAtom.ts'

/** Component to handle capturing the referring hero ID from URL */
export const ReferralCapture = () => {
  const { pathname } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [referrerHeroId, setReferrerHeroId] = useAtom(referrerHeroIdAtom)

  useEffect(() => {
    if (pathname.startsWith('/launch')) {
      return
    }

    const heroIdFromUrl = searchParams.get('hero')

    // Capture First logic: Only set if a heroId is in URL and we haven't captured one yet.
    if (heroIdFromUrl && referrerHeroId === null) {
      setReferrerHeroId(heroIdFromUrl)
      // Optional: Remove the param from URL - consider if needed globally
      setSearchParams(
        (prev) => {
          prev.delete('hero')
          return prev
        },
        { replace: true },
      )
    }
    // Add referrerHeroId to dependency array to re-run if it changes (e.g., manually cleared)
    // Add setReferrerHeroId to satisfy exhaustive-deps rule.
  }, [pathname, searchParams, referrerHeroId, setReferrerHeroId, setSearchParams])

  // This component doesn't render anything itself
  return null
}
