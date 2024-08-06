import { useMutation } from '@apollo/client'
import { Select, Switch, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { MUTATION_UPDATE_USER_NOTIFICATIONS_SETTINGS } from '@/modules/profile/graphql/mutations/userNotificationsMutation'
import { Body } from '@/shared/components/typography'
import { UserNotificationSettings } from '@/types'

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

  const getConfigValue = (type: NotificationType, name: ConfigName) => {
    const setting = settings.notificationSettings.find((s) => s.notificationType === type)
    return setting?.configurations.find((c) => c.name === name)?.value
  }

  const getConfigId = (type: NotificationType, name: ConfigName) => {
    const setting = settings.notificationSettings.find((s) => s.notificationType === type)
    return setting?.configurations.find((c) => c.name === name)?.id
  }

  const updateConfigValue = async (type: NotificationType, name: ConfigName, value: string) => {
    const configId = getConfigId(type, name)
    if (!configId) return

    try {
      await updateNotificationSetting({
        variables: {
          userNotificationConfigurationId: configId,
          value,
        },
      })

      setSettings((prevSettings) => ({
        ...prevSettings,
        notificationSettings: prevSettings.notificationSettings.map((s) =>
          s.notificationType === type
            ? {
                ...s,
                configurations: s.configurations.map((c) => (c.name === name ? { ...c, value } : c)),
              }
            : s,
        ),
      }))
    } catch (error) {
      console.error('Failed to update notification setting:', error)
    }
  }

  return (
    <VStack spacing={6} align="stretch" width="100%">
      <Body size="lg" bold>
        Project notifications
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
