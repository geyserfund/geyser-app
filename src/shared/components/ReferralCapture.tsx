import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { referrerHeroIdAtom } from '@/shared/state/referralAtom.ts'

/** Component to handle capturing the referring hero ID from URL */
export const ReferralCapture = () => {
  const { pathname } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [referrerHeroId, setReferrerHeroId] = useAtom(referrerHeroIdAtom)
  const { user } = useAuthContext()

  useEffect(() => {
    if (pathname.startsWith('/launch')) {
      return
    }

    const heroIdFromUrl = searchParams.get('hero')
    if (!heroIdFromUrl) {
      return
    }

    if (heroIdFromUrl === user.heroId) {
      return
    }

    // Capture First logic: only set if a heroId is in URL and we haven't captured one yet.
    if (referrerHeroId === null) {
      const nextSearchParams = new URLSearchParams(searchParams)
      nextSearchParams.delete('hero')
      setReferrerHeroId(heroIdFromUrl)
      setSearchParams(nextSearchParams, { replace: true })
    }
  }, [pathname, referrerHeroId, searchParams, setReferrerHeroId, setSearchParams, user.heroId])

  // This component doesn't render anything itself
  return null
}
