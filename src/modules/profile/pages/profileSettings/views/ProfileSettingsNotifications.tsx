import { Divider, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { Body } from '@/shared/components/typography'
import { CreatorNotificationSettings, useProfileNotificationsSettingsQuery, UserNotificationSettings } from '@/types'
import { useMobileMode } from '@/utils'

import { ProfileSettingsLayout } from '../common/ProfileSettingsLayout'
import { CreatorNotifications, CreatorNotificationsSkeleton } from '../components/CreatorNotifications'
import { FollowedProjectsList } from '../components/FollowedProjectsList'
import { UserNotifications } from '../components/UserNotifications'

export const ProfileSettingsNotifications = () => {
  const { userId } = useParams()
  const isMobile = useMobileMode()
  const [creatorNotificationSettings, setCreatorNotificationSettings] = useState<CreatorNotificationSettings[]>([])
  const [userNotificationSettings, setUserNotificationSettings] = useState<UserNotificationSettings>()

  const { refetch, loading } = useProfileNotificationsSettingsQuery({
    variables: { userId },
    onCompleted(data) {
      setCreatorNotificationSettings(data?.userNotificationSettingsGet.creatorSettings || [])
      setUserNotificationSettings(data?.userNotificationSettingsGet.userSettings || null)
    },
  })

  useEffect(() => {
    refetch()
  }, [refetch])

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
        {loading ? (
          <CreatorNotificationsSkeleton />
        ) : (
          <CreatorNotifications creatorNotificationSettings={creatorNotificationSettings} />
        )}
        <Divider />
        {userNotificationSettings && <UserNotifications userNotificationSettings={userNotificationSettings} />}
        {!loading && <FollowedProjectsList />}
      </VStack>
    </ProfileSettingsLayout>
  )
}
