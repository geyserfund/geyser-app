import { HStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { dimensions } from '@/shared/constants'

import { toInt, useMobileMode } from '../../../../utils'
import { ProfileError } from '../../components/ProfileError'
import { useUserProfile } from '../../hooks/useUserProfile'
import { Account } from './views/account/Account'
import { ProfileTabs } from './views/profileTabs'

export const Profile = () => {
  const isMobile = useMobileMode()

  const params = useParams<{ userId: string }>()
  const userId = useMemo(() => {
    return toInt(params.userId)
  }, [params])

  const { error } = useUserProfile(userId)

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
