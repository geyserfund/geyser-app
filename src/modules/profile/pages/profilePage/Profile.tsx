import { HStack } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router'

import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { PathName } from '@/shared/constants/index.ts'

import { useMobileMode } from '../../../../utils'
import { ProfileError } from '../../components/ProfileError'
import { useUserProfile } from '../../hooks/useUserProfile'
import { Account } from './views/account/Account'
import { ProfileTabs } from './views/profileTabs'

export const Profile = () => {
  const rewriteUrlToHero = (path: string, userId: string, heroId: string) => {
    window.history.replaceState(
      null,
      '',
      path.replace(`/${PathName.userProfile}/${userId}`, `/${PathName.heroProfile}/${heroId}`),
    )
  }

  const isMobile = useMobileMode()

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
    <>
      <HStack h="full" w="full" spacing={dimensions.profile.sideNav.gap}>
        {!isMobile && <Account />}
        <ProfileTabs />
      </HStack>
    </>
  )
}

export default Profile
