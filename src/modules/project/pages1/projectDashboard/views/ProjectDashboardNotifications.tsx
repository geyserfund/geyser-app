import { HStack, VStack } from '@chakra-ui/react'

import { CreatorNotifications } from '@/modules/profile/pages/profileSettings/components/CreatorNotifications'
import { Body } from '@/shared/components/typography'

import { DashboardLayout } from '../common'

export const ProjectDashboardNotifications = () => {
  return (
    <DashboardLayout width="full">
      <VStack w="100%" spacing={6} flexGrow={1} px={{ base: 0, lg: 6 }}>
        <VStack w="100%" alignItems="flex-start">
          <Body size="lg" bold>
            Notifications
          </Body>
          <HStack w="100%" justifyContent="space-between">
            <Body>Customize your profile and project notifications.</Body>
          </HStack>
        </VStack>
        <CreatorNotifications />
      </VStack>
    </DashboardLayout>
  )
}
