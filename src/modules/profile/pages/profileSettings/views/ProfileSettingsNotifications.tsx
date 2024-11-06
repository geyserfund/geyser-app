import { Divider, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography'
import { useMobileMode } from '@/utils'

import { ProfileSettingsLayout } from '../common/ProfileSettingsLayout'
import { CreatorNotifications } from '../components/CreatorNotifications'
import { FollowedProjectsList } from '../components/FollowedProjectsList'
import { UserNotifications } from '../components/UserNotifications'

export const ProfileSettingsNotifications = () => {
  const isMobile = useMobileMode()

  return (
    <ProfileSettingsLayout>
      <VStack w="100%" spacing={6} flexGrow={1} px={{ base: 0, lg: 6 }}>
        <VStack w="100%" alignItems="flex-start">
          {!isMobile && (
            <Body fontSize={'24px'} medium>
              {t('Notifications')}
            </Body>
          )}
          <Body size="sm" color="neutralAlpha.11" regular>
            {t('Customize your profile and project notifications.')}
          </Body>
        </VStack>
        <CreatorNotifications />
        <Divider />
        <UserNotifications />
        <FollowedProjectsList />
      </VStack>
    </ProfileSettingsLayout>
  )
}
