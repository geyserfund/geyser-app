import { HStack } from '@chakra-ui/react'
import { useEffect, useMemo } from 'react'
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

  const params = useParams<{ userId: string; heroId: string }>()

  const userId = useMemo(() => {
    return params.userId
  }, [params])

  const heroId = useMemo(() => {
    return params.heroId
  }, [params])

  const { error, userProfile, isLoading } = useUserProfile({ userId, heroId })

  useEffect(() => {
    if (!isLoading && userId && userProfile.heroId && userProfile.id === userId) {
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
