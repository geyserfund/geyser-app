import { VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useParams } from 'react-router'

import { useUserProfile } from '@/modules/profile/hooks/useUserProfile'

import { ProfileSettingsLayout } from '../common/ProfileSettingsLayout'
import { ProfileForm } from '../components/ProfileForm'

export const ProfileSettingsGeneral = () => {
  // TODO: get user from context - refactor to not allow users consulting other users profiles
  const params = useParams<{ userId: string }>()
  const userId = useMemo(() => {
    return params.userId
  }, [params])

  const { isLoading } = useUserProfile(userId)

  return (
    <ProfileSettingsLayout>
      <VStack w="100%" spacing={6} flexGrow={1} px={{ base: 0, lg: 6 }}>
        <ProfileForm isLoading={isLoading} />
      </VStack>
    </ProfileSettingsLayout>
  )
}
