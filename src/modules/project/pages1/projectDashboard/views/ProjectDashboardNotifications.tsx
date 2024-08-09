import { useQuery } from '@apollo/client'
import { VStack } from '@chakra-ui/react'
import { useState } from 'react'

import { QUERY_PROJECT_NOTIFICATIONS_SETTINGS } from '@/modules/profile/graphql/queries/projectNotificationSettingsQuery'
import { CreatorNotifications } from '@/modules/profile/pages/profileSettings/components/CreatorNotifications'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { Body } from '@/shared/components/typography'
import { CreatorNotificationSettings } from '@/types'

import { DashboardLayout } from '../common'

export const ProjectDashboardNotifications = () => {
  const { project } = useProjectAtom()

  const [creatorNotificationSetting, setCreatorNotificationSetting] = useState<CreatorNotificationSettings>()

  useQuery(QUERY_PROJECT_NOTIFICATIONS_SETTINGS, {
    variables: { projectId: project.id },
    onCompleted(data) {
      setCreatorNotificationSetting(data?.projectNotificationSettingsGet || null)
    },
  })

  return (
    <DashboardLayout width="full">
      <VStack w="100%" spacing={6} flexGrow={1} px={{ base: 0, lg: 6 }}>
        <VStack w="100%" alignItems="flex-start">
          <Body fontSize={'24px'} medium>
            Notifications
          </Body>
          <Body size="xs" color="neutralAlpha.11" regular>
            Customize your project notifications.
          </Body>
        </VStack>
        {creatorNotificationSetting && (
          <CreatorNotifications creatorNotificationSettings={[creatorNotificationSetting]} />
        )}
      </VStack>
    </DashboardLayout>
  )
}
