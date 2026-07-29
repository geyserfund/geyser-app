import { Box } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router'

import { PathName } from '@/shared/constants/index.ts'

import { ProfileError } from '../../components/ProfileError'
import { useUserProfile } from '../../hooks/useUserProfile'
import { HeroProfileLedger } from './views/heroProfile/HeroProfileLedger'

export const Profile = () => {
  const rewriteUrlToHero = (path: string, userId: string, heroId: string) => {
    window.history.replaceState(
      null,
      '',
      path.replace(`/${PathName.userProfile}/${userId}`, `/${PathName.heroProfile}/${heroId}`),
    )
  }

  const { userId, heroId } = useParams<{ userId: string; heroId: string }>()
  const rewrittenProfileKeyRef = useRef<string | null>(null)

  const { error, userProfile, isLoading } = useUserProfile({ userId, heroId })

  useEffect(() => {
    const isMatchingUserId = userId !== undefined && String(userProfile.id) === String(userId)
    const rewriteKey = userId && userProfile.heroId ? `${userId}:${userProfile.heroId}` : null

    if (
      !isLoading &&
      userId &&
      userProfile.heroId &&
      isMatchingUserId &&
      rewriteKey &&
      rewrittenProfileKeyRef.current !== rewriteKey
    ) {
      rewrittenProfileKeyRef.current = rewriteKey
      rewriteUrlToHero(window.location.pathname, userId, userProfile.heroId)
    }
  }, [isLoading, userId, userProfile?.heroId, userProfile?.id])

  if (error) {
    return <ProfileError />
  }

  return (
    <Box w="full">
      <HeroProfileLedger />
    </Box>
  )
}

export default Profile
