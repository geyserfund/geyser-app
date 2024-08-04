import { VStack } from '@chakra-ui/react'

import { ProfileSettingsLayout } from '../common/ProfileSettingsLayout'

export const ProfileSettingsNotifications = () => {
  return (
    <ProfileSettingsLayout>
      <VStack w="100%" spacing={6} flexGrow={1} px={{ base: 0, lg: 6 }}>
        <p>ProfileSettingsNotifications</p>
      </VStack>
    </ProfileSettingsLayout>
  )
}
