import { useMutation } from '@apollo/client'
import { Select, Switch, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { MUTATION_UPDATE_USER_NOTIFICATIONS_SETTINGS } from '@/modules/profile/graphql/mutations/userNotificationsMutation'
import { Body } from '@/shared/components/typography'
import { UserNotificationSettings } from '@/types'
import { useNotification } from '@/utils'

import { HorizontalFormField } from '../common/HorizontalFormField'

enum NotificationType {
  PROJECT_SUMMARY = 'user.projectUpdatesSummary',
  PRODUCT_UPDATES = 'user.productUpdates',
}

enum ConfigName {
  FREQUENCY = 'frequency',
  IS_ENABLED = 'is_enabled',
}

export const ProjectNotifications = ({
  userNotificationSettings,
}: {
  userNotificationSettings: UserNotificationSettings
}) => {
  const [settings, setSettings] = useState<UserNotificationSettings>(userNotificationSettings)

  useEffect(() => {
    setSettings(userNotificationSettings)
  }, [userNotificationSettings])

  const [updateNotificationSetting] = useMutation(MUTATION_UPDATE_USER_NOTIFICATIONS_SETTINGS)
  const toast = useNotification()

  const getConfigValue = (type: NotificationType, name: ConfigName) => {
    const setting = settings.notificationSettings.find((s) => s.notificationType === type)
    return setting?.configurations.find((c) => c.name === name)?.value
  }

  const getConfigId = (type: NotificationType, name: ConfigName) => {
    const setting = settings.notificationSettings.find((s) => s.notificationType === type)
    return setting?.configurations.find((c) => c.name === name)?.id
  }

  const updateSettingsMap = (
    prevSettings: UserNotificationSettings,
    type: NotificationType,
    name: ConfigName,
    newValue: string,
  ): UserNotificationSettings => {
    return {
      ...prevSettings,
      notificationSettings: prevSettings.notificationSettings.map((s) =>
        s.notificationType === type
          ? {
              ...s,
              configurations: s.configurations.map((c) => (c.name === name ? { ...c, value: newValue } : c)),
            }
          : s,
      ),
    }
  }

  const updateConfigValue = async (type: NotificationType, name: ConfigName, value: string) => {
    const configId = getConfigId(type, name)
    if (!configId) return

    // Optimistically update the UI
    setSettings((prevSettings) => updateSettingsMap(prevSettings, type, name, value))

    try {
      await updateNotificationSetting({
        variables: {
          userNotificationConfigurationId: configId,
          value,
        },
      })

      // Show success toast
      toast.success({
        title: 'Update successful',
        description: 'Notification setting has been updated.',
      })
    } catch (error) {
      // Revert the optimistic update
      setSettings((prevSettings) => updateSettingsMap(prevSettings, type, name, getConfigValue(type, name) || ''))

      // Show error toast
      toast.error({
        title: 'Update failed',
        description: 'Failed to update notification setting. Please try again.',
      })
    }
  }

  return (
    <VStack spacing={6} align="stretch" width="100%">
      <Body size="lg" bold>
        Notifications for Projects I follow
      </Body>
      <VStack spacing={4} align="stretch" p={4}>
        <HorizontalFormField label="Project Updates" htmlFor="project-updates">
          <Select
            value={getConfigValue(NotificationType.PROJECT_SUMMARY, ConfigName.FREQUENCY) || ''}
            onChange={(e) => updateConfigValue(NotificationType.PROJECT_SUMMARY, ConfigName.FREQUENCY, e.target.value)}
            size="sm"
            placeholder="Select frequency"
            width="auto"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </Select>
          <Switch
            id="project-updates"
            isChecked={getConfigValue(NotificationType.PROJECT_SUMMARY, ConfigName.IS_ENABLED) === 'true'}
            onChange={(e) =>
              updateConfigValue(
                NotificationType.PROJECT_SUMMARY,
                ConfigName.IS_ENABLED,
                e.target.checked ? 'true' : 'false',
              )
            }
          />
        </HorizontalFormField>

        <HorizontalFormField label="Geyser product updates" htmlFor="geyser-product-updates">
          <Switch
            id="geyser-product-updates"
            isChecked={getConfigValue(NotificationType.PRODUCT_UPDATES, ConfigName.IS_ENABLED) === 'true'}
            onChange={(e) =>
              updateConfigValue(
                NotificationType.PRODUCT_UPDATES,
                ConfigName.IS_ENABLED,
                e.target.checked ? 'true' : 'false',
              )
            }
          />
        </HorizontalFormField>
      </VStack>
    </VStack>
  )
}
