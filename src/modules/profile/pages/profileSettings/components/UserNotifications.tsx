import { Select, Skeleton, Switch, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect } from 'react'

import { useAuthContext } from '@/context'
import { Body } from '@/shared/components/typography'

import { HorizontalFormField } from '../common/HorizontalFormField'
import { UserConfigName, UserNotificationType, useUserNotificationSettings } from '../hooks/useUserNotificationSettings'

export const UserNotifications = () => {
  const { user } = useAuthContext()
  const {
    loadingUserNotificationSettings,
    userNotificationSettings,
    getUserNotificationConfigValue,
    updateUserNotificationConfigValue,
    setUserNotificationSettings,
  } = useUserNotificationSettings(user.id)

  useEffect(() => {
    setUserNotificationSettings(userNotificationSettings)
  }, [userNotificationSettings, setUserNotificationSettings])

  if (loadingUserNotificationSettings) return <Skeleton />

  return (
    <>
      <VStack spacing={6} align="stretch" width="100%">
        <Body size="lg" bold>
          {t('Notifications for Projects I follow')}
        </Body>
        <VStack spacing={4} align="stretch" p={4}>
          <HorizontalFormField label="Project Updates" htmlFor="project-updates">
            <Select
              value={
                getUserNotificationConfigValue(UserNotificationType.PROJECT_SUMMARY, UserConfigName.FREQUENCY) || ''
              }
              onChange={(e) =>
                updateUserNotificationConfigValue(
                  UserNotificationType.PROJECT_SUMMARY,
                  UserConfigName.FREQUENCY,
                  e.target.value,
                )
              }
              size="sm"
              placeholder="Select frequency"
              width="auto"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </Select>
            <Switch
              id="project-updates"
              isChecked={
                getUserNotificationConfigValue(UserNotificationType.PROJECT_SUMMARY, UserConfigName.IS_ENABLED) ===
                'true'
              }
              onChange={(e) => {
                updateUserNotificationConfigValue(
                  UserNotificationType.PROJECT_SUMMARY,
                  UserConfigName.IS_ENABLED,
                  e.target.checked ? 'true' : 'false',
                )
              }}
            />
          </HorizontalFormField>

          <HorizontalFormField label="Geyser product updates" htmlFor="geyser-product-updates">
            <Switch
              id="geyser-product-updates"
              isChecked={
                getUserNotificationConfigValue(UserNotificationType.PRODUCT_UPDATES, UserConfigName.IS_ENABLED) ===
                'true'
              }
              onChange={(e) =>
                updateUserNotificationConfigValue(
                  UserNotificationType.PRODUCT_UPDATES,
                  UserConfigName.IS_ENABLED,
                  e.target.checked ? 'true' : 'false',
                )
              }
            />
          </HorizontalFormField>
        </VStack>
      </VStack>
    </>
  )
}
