import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router'

import { projectCreationReferrerHeroIdAtom } from '@/shared/state/projectReferralAtom.ts'

export const ProjectCreationReferralCapture = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [referrerHeroId, setReferrerHeroId] = useAtom(projectCreationReferrerHeroIdAtom)

  useEffect(() => {
    const heroIdFromUrl = searchParams.get('hero')

    if (!heroIdFromUrl) {
      return
    }

    if (referrerHeroId === null) {
      setReferrerHeroId(heroIdFromUrl)
    }

    setSearchParams(
      (prev) => {
        prev.delete('hero')
        return prev
      },
      { replace: true },
    )
  }, [referrerHeroId, searchParams, setReferrerHeroId, setSearchParams])

  return null
}
