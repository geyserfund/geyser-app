import { useMutation, useQuery } from '@apollo/client'
import { FormControl, FormLabel, HStack, Select, Switch, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useParams } from 'react-router'

import { MUTATION_UPDATE_USER_NOTIFICATIONS_SETTINGS } from '@/modules/profile/graphql/mutations/userNotificationsMutation'
import { QUERY_USER_NOTIFICATIONS_SETTINGS } from '@/modules/profile/graphql/queries/userNotificationSettingsQuery'
import { Body } from '@/shared/components/typography'

type NotificationConfiguration = {
  id: string
  name: string
  value: string
  type: string
  options?: string[]
}

type NotificationSettings = {
  notificationType: string
  isEnabled: boolean
  configurations: NotificationConfiguration[]
}

export const ProjectNotifications = () => {
  const { userId } = useParams()

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings[]>([])

  useQuery(QUERY_USER_NOTIFICATIONS_SETTINGS, {
    variables: { userId },
    onCompleted(data) {
      setNotificationSettings(data?.settingsNotificationsUserGet.notificationSettings || [])
    },
  })

  const [updateNotificationSetting] = useMutation(MUTATION_UPDATE_USER_NOTIFICATIONS_SETTINGS)

  const getConfigValue = (type: string, name: string) => {
    const setting = notificationSettings.find((s) => s.notificationType === type)
    return setting?.configurations.find((c) => c.name === name)?.value
  }

  const getConfigId = (type: string, name: string) => {
    const setting = notificationSettings.find((s) => s.notificationType === type)
    return setting?.configurations.find((c) => c.name === name)?.id
  }

  const updateConfigValue = async (type: string, name: string, value: string) => {
    const configId = getConfigId(type, name)
    if (!configId) return

    try {
      await updateNotificationSetting({
        variables: {
          userNotificationConfigurationId: configId,
          value,
        },
      })

      setNotificationSettings((prevSettings) =>
        prevSettings.map((setting) =>
          setting.notificationType === type
            ? {
                ...setting,
                configurations: setting.configurations.map((config) =>
                  config.name === name ? { ...config, value } : config,
                ),
              }
            : setting,
        ),
      )
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
        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel htmlFor="project-updates" mb="0">
            <Body size="lg">Project Updates</Body>
          </FormLabel>
          <HStack spacing={4}>
            <Select
              value={getConfigValue('user.projectUpdatesSummary', 'frequency') || ''}
              onChange={(e) => updateConfigValue('user.projectUpdatesSummary', 'frequency', e.target.value)}
              size="sm"
              placeholder="Select frequency"
              width="auto"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </Select>
            <Switch
              id="project-updates"
              isChecked={getConfigValue('user.projectUpdatesSummary', 'is_enabled') === 'true'}
              onChange={(e) =>
                updateConfigValue('user.projectUpdatesSummary', 'is_enabled', e.target.checked ? 'true' : 'false')
              }
            />
          </HStack>
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel htmlFor="geyser-product-updates" mb="0">
            <Body size="lg">Geyser product updates</Body>
          </FormLabel>
          <Switch
            id="geyser-product-updates"
            isChecked={getConfigValue('user.productUpdates', 'is_enabled') === 'true'}
            onChange={(e) =>
              updateConfigValue('user.productUpdates', 'is_enabled', e.target.checked ? 'true' : 'false')
            }
          />
        </FormControl>
      </VStack>
    </VStack>
  )
}
