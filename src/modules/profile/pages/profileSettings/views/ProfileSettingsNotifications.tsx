import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography'

import { ProfileSettingsLayout } from '../common/ProfileSettingsLayout'
import { FollowedProjectsList } from '../components/FollowedProjectsList'
import { GeyserNewsletterNotifications } from '../components/GeyserNewsletterNotifications.tsx'
import { UserNotifications } from '../components/UserNotifications'

export const ProfileSettingsNotifications = () => {
  return (
    <ProfileSettingsLayout desktopTitle={t('Notifications')}>
      <VStack w="100%" spacing={6} flexGrow={1} px={{ base: 0, lg: 6 }}>
        <VStack w="100%" alignItems="flex-start">
          <Body size="sm" color="neutralAlpha.11" regular>
            {t('Customize your profile and project notifications.')}
          </Body>
        </VStack>
        <GeyserNewsletterNotifications />
        <CardLayout w="full" p={{ base: 4, lg: 5 }} spacing={6}>
          <UserNotifications />
          <FollowedProjectsList />
        </CardLayout>
      </VStack>
    </ProfileSettingsLayout>
  )
}
