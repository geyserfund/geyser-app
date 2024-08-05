import { useMutation } from '@apollo/client'
import { Avatar, FormControl, FormLabel, HStack, Select, Switch, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { MUTATION_UPDATE_CREATOR_NOTIFICATIONS_SETTINGS } from '@/modules/profile/graphql/mutations/creatorNotificationMutation'
import { Body } from '@/shared/components/typography'
import { CreatorNotificationSettings } from '@/types'

export const CreatorNotifications = ({
  creatorNotificationSettings,
}: {
  creatorNotificationSettings: CreatorNotificationSettings[]
}) => {
  const [settings, setSettings] = useState<CreatorNotificationSettings[]>(creatorNotificationSettings)

  useEffect(() => {
    setSettings(creatorNotificationSettings)
  }, [creatorNotificationSettings])

  const [updateNotificationSetting] = useMutation(MUTATION_UPDATE_CREATOR_NOTIFICATIONS_SETTINGS)

  const getConfigValue = (creatorNotificationSettings: CreatorNotificationSettings, type: string, name: string) => {
    const setting = creatorNotificationSettings.notificationSettings.find((s) => s.notificationType === type)
    return setting?.configurations.find((c) => c.name === name)?.value
  }

  const getConfigId = (creatorNotificationSettings: CreatorNotificationSettings, type: string, name: string) => {
    const setting = creatorNotificationSettings.notificationSettings.find((s) => s.notificationType === type)
    return setting?.configurations.find((c) => c.name === name)?.id
  }

  const updateConfigValue = async (
    creatorNotificationSettings: CreatorNotificationSettings,
    type: string,
    name: string,
    value: string,
  ) => {
    const configId = getConfigId(creatorNotificationSettings, type, name)
    if (!configId) return

    try {
      await updateNotificationSetting({
        variables: {
          creatorNotificationConfigurationId: configId,
          value,
        },
      })

      setSettings((prevSettings) =>
        prevSettings.map((setting) => {
          if (setting.project.id === creatorNotificationSettings.project.id) {
            return {
              ...setting,
              notificationSettings: setting.notificationSettings.map((notifSetting) => {
                if (notifSetting.notificationType === type) {
                  return {
                    ...notifSetting,
                    configurations: notifSetting.configurations.map((config) =>
                      config.name === name ? { ...config, value } : config,
                    ),
                  }
                }

                return notifSetting
              }),
            }
          }

          return setting
        }),
      )
    } catch (error) {
      console.error('Failed to update notification setting:', error)
    }
  }

  return (
    <VStack spacing={6} align="stretch" width="100%">
      <Body size="lg" bold>
        Creator notifications
      </Body>
      {settings.map((setting, index) => (
        <VStack key={index} spacing={4} align="stretch" p={4}>
          <HStack>
            {setting.project.image && <Avatar src={setting.project.image} name={setting.project.title} size="sm" />}
            <Body bold>{setting.project.title}</Body>
          </HStack>

          <FormControl display="flex" alignItems="center" justifyContent="space-between">
            <FormLabel htmlFor="creator-summary" mb="0">
              <Body size="lg">Creator summary email</Body>
            </FormLabel>
            <HStack spacing={4}>
              <Select
                value={getConfigValue(setting, 'creator.projectSummary', 'frequency') || ''}
                onChange={(e) => updateConfigValue(setting, 'creator.projectSummary', 'frequency', e.target.value)}
                size="sm"
                placeholder="Select frequency"
                width="auto"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </Select>
              <Switch
                id="creator-summary"
                isChecked={getConfigValue(setting, 'creator.projectSummary', 'is_enabled') === 'true'}
                onChange={(e) =>
                  updateConfigValue(
                    setting,
                    'creator.projectSummary',
                    'is_enabled',
                    e.target.checked ? 'true' : 'false',
                  )
                }
              />
            </HStack>
          </FormControl>
          <Body size="sm">
            Receive a monthly email about your project summary: stats, goal progress and, hot rewards..
          </Body>

          <Body size="lg" bold>
            Event alerts
          </Body>
          <Body size="sm">
            Get notified with an email as soon as important events takes place in your project, from making a reward
            sale, to receiving a contribution above a certain amount, and reaching a goal.
          </Body>

          <FormControl display="flex" alignItems="center" justifyContent="space-between">
            <FormLabel htmlFor="goal-reached" mb="0">
              <Body size="lg">Goal Reached Email</Body>
            </FormLabel>
            <Switch
              id="goal-reached"
              isChecked={getConfigValue(setting, 'creator.goalReached', 'is_enabled') === 'true'}
              onChange={(e) =>
                updateConfigValue(setting, 'creator.goalReached', 'is_enabled', e.target.checked ? 'true' : 'false')
              }
            />
          </FormControl>

          <FormControl display="flex" alignItems="center" justifyContent="space-between">
            <FormLabel htmlFor="sale-made" mb="0">
              <Body size="lg">Sale Made</Body>
            </FormLabel>
            <Switch
              id="sale-made"
              isChecked={getConfigValue(setting, 'creator.saleMade', 'is_enabled') === 'true'}
              onChange={(e) =>
                updateConfigValue(setting, 'creator.saleMade', 'is_enabled', e.target.checked ? 'true' : 'false')
              }
            />
          </FormControl>

          <FormControl display="flex" alignItems="center" justifyContent="space-between">
            <FormLabel htmlFor="contribution-received" mb="0">
              <Body size="lg">Contribution received</Body>
            </FormLabel>
            <HStack spacing={4}>
              <Select
                value={getConfigValue(setting, 'creator.contributionReceived', 'threshold') || ''}
                onChange={(e) =>
                  updateConfigValue(setting, 'creator.contributionReceived', 'threshold', e.target.value)
                }
                size="sm"
                placeholder="Select threshold"
                width="auto"
              >
                <option value="1"> {'> 1 USD'} </option>
                <option value="100"> {'> 100 USD'} </option>
                <option value="1000"> {'> 1 000 USD'} </option>
                <option value="10000"> {'> 10 000 USD'} </option>
              </Select>
              <Switch
                id="contribution-received"
                isChecked={getConfigValue(setting, 'creator.contributionReceived', 'is_enabled') === 'true'}
                onChange={(e) =>
                  updateConfigValue(
                    setting,
                    'creator.contributionReceived',
                    'is_enabled',
                    e.target.checked ? 'true' : 'false',
                  )
                }
              />
            </HStack>
          </FormControl>
        </VStack>
      ))}
    </VStack>
  )
}
