import { VStack } from '@chakra-ui/react'

import { CreatorNotifications } from '@/modules/profile/pages/profileSettings/components/CreatorNotifications'
import { Body } from '@/shared/components/typography'

import { DashboardLayout } from '../common'

export const ProjectDashboardNotifications = () => {
  return (
    <DashboardLayout width="full">
      <VStack w="100%" spacing={6} flexGrow={1} px={{ base: 0, lg: 6 }}>
        <VStack w="100%" alignItems="flex-start">
          <Body fontSize={'24px'} medium>
            Notifications
          </Body>
          <Body size="sm" light>
            Customize your project notifications.
          </Body>
        </VStack>

        <CreatorNotifications />
      </VStack>
    </DashboardLayout>
  )
}
