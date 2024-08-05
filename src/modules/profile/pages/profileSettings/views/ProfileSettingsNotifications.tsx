import { Button, Divider, HStack, VStack } from '@chakra-ui/react'

import { Body } from '@/shared/components/typography'

import { ProfileSettingsLayout } from '../common/ProfileSettingsLayout'
import { CreatorNotifications } from '../components/CreatorNotifications'
import { ProjectNotifications } from '../components/ProjectNotifications'

export const ProfileSettingsNotifications = () => {
  return (
    <ProfileSettingsLayout>
      <VStack w="100%" spacing={6} flexGrow={1} px={{ base: 0, lg: 6 }}>
        <VStack w="100%" alignItems="flex-start">
          <Body size="lg" bold>
            Notifications
          </Body>
          <HStack w="100%" justifyContent="space-between">
            <Body>Customize your profile and project notifications.</Body>
            <Button variant="outline" colorScheme="neutral1">
              <Body>Set to default</Body>
            </Button>
          </HStack>
        </VStack>
        <CreatorNotifications />
        <Divider />
        <ProjectNotifications />
      </VStack>
    </ProfileSettingsLayout>
  )
}
