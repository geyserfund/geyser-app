import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { referringHeroIdAtom } from '@/shared/state/referralAtom.ts'

/** Component to handle capturing the referring hero ID from URL */
export const ReferralCapture = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [referringHeroId, setReferringHeroId] = useAtom(referringHeroIdAtom)

  useEffect(() => {
    const heroIdFromUrl = searchParams.get('hero')

    // Capture First logic: Only set if a heroId is in URL and we haven't captured one yet.
    if (heroIdFromUrl && referringHeroId === null) {
      setReferringHeroId(heroIdFromUrl)
      // Optional: Remove the param from URL - consider if needed globally
      setSearchParams(
        (prev) => {
          prev.delete('hero')
          return prev
        },
        { replace: true },
      )
    }
    // Add referringHeroId to dependency array to re-run if it changes (e.g., manually cleared)
    // Add setReferringHeroId to satisfy exhaustive-deps rule.
  }, [searchParams, referringHeroId, setReferringHeroId, setSearchParams])

  // This component doesn't render anything itself
  return null
}
