import { useQuery } from '@apollo/client'
import { Button, Divider, HStack, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useParams } from 'react-router'

import { QUERY_PROFILE_NOTIFICATIONS_SETTINGS } from '@/modules/profile/graphql/queries/profileNotificationSettingsQuery'
import { Body } from '@/shared/components/typography'
import { CreatorNotificationSettings, UserNotificationSettings } from '@/types'

import { ProfileSettingsLayout } from '../common/ProfileSettingsLayout'
import { CreatorNotifications } from '../components/CreatorNotifications'
import { ProjectNotifications } from '../components/ProjectNotifications'

export const ProfileSettingsNotifications = () => {
  const { userId } = useParams()
  const [creatorNotificationSettings, setCreatorNotificationSettings] = useState<CreatorNotificationSettings[]>([])
  const [userNotificationSettings, setUserNotificationSettings] = useState<UserNotificationSettings>()

  useQuery(QUERY_PROFILE_NOTIFICATIONS_SETTINGS, {
    variables: { userId },
    onCompleted(data) {
      setCreatorNotificationSettings(data?.userNotificationSettingsGet.creatorSettings || [])
      setUserNotificationSettings(data?.userNotificationSettingsGet.userSettings || null)
    },
  })

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
        <CreatorNotifications creatorNotificationSettings={creatorNotificationSettings} />
        <Divider />
        {userNotificationSettings && <ProjectNotifications userNotificationSettings={userNotificationSettings} />}
      </VStack>
    </ProfileSettingsLayout>
  )
}
