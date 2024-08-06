import { useMutation } from '@apollo/client'
import { Avatar, HStack, Select, Switch, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { PiStar } from 'react-icons/pi'

import { ImageWithReload } from '@/components/ui'
import { MUTATION_UPDATE_CREATOR_NOTIFICATIONS_SETTINGS } from '@/modules/profile/graphql/mutations/creatorNotificationMutation'
import { CardLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { CreatorNotificationSettings } from '@/types'

import { HorizontalFormField } from '../common/HorizontalFormField'

enum NotificationType {
  PROJECT_SUMMARY = 'creator.projectSummary',
  GOAL_REACHED = 'creator.goalReached',
  SALE_MADE = 'creator.saleMade',
  CONTRIBUTION_RECEIVED = 'creator.contributionReceived',
}

enum ConfigName {
  FREQUENCY = 'frequency',
  IS_ENABLED = 'is_enabled',
  THRESHOLD = 'threshold',
}

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

  const getConfigValue = (
    creatorNotificationSettings: CreatorNotificationSettings,
    type: NotificationType,
    name: ConfigName,
  ) => {
    const setting = creatorNotificationSettings.notificationSettings.find((s) => s.notificationType === type)
    return setting?.configurations.find((c) => c.name === name)?.value
  }

  const getConfigId = (
    creatorNotificationSettings: CreatorNotificationSettings,
    type: NotificationType,
    name: ConfigName,
  ) => {
    const setting = creatorNotificationSettings.notificationSettings.find((s) => s.notificationType === type)
    return setting?.configurations.find((c) => c.name === name)?.id
  }

  const updateConfigValue = async (
    creatorNotificationSettings: CreatorNotificationSettings,
    type: NotificationType,
    name: ConfigName,
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

  console.log(settings)

  return (
    <VStack spacing={6} align="stretch" width="100%">
      <Body size="md" medium>
        Creator notifications
      </Body>
      {settings.map((setting, index) => (
        <CardLayout key={index} spacing={5}>
          <VStack align="stretch">
            <HStack>
              {setting.project.image && (
                <ImageWithReload
                  src={setting.project.image}
                  width={'28px'}
                  height={'28px'}
                  maxHeight="28px"
                  alignSelf={'start'}
                  borderRadius="6px"
                  objectFit="cover"
                />
              )}
              <Body size="md" medium>
                {setting.project.title}
              </Body>
            </HStack>

            <HorizontalFormField label="Creator summary email" htmlFor="creator-summary" icon={<PiStar />}>
              <Select
                value={getConfigValue(setting, NotificationType.PROJECT_SUMMARY, ConfigName.FREQUENCY) || ''}
                onChange={(e) =>
                  updateConfigValue(setting, NotificationType.PROJECT_SUMMARY, ConfigName.FREQUENCY, e.target.value)
                }
                size="sm"
                placeholder="Select frequency"
                width="auto"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </Select>
              <Switch
                id="creator-summary"
                isChecked={getConfigValue(setting, NotificationType.PROJECT_SUMMARY, ConfigName.IS_ENABLED) === 'true'}
                onChange={(e) =>
                  updateConfigValue(
                    setting,
                    NotificationType.PROJECT_SUMMARY,
                    ConfigName.IS_ENABLED,
                    e.target.checked ? 'true' : 'false',
                  )
                }
              />
            </HorizontalFormField>
            <Body size="sm" regular color="neutral1.10">
              Receive a monthly email about your project summary: stats, goal progress and, hot rewards..
            </Body>

            <HorizontalFormField label="Goal Reached Email" htmlFor="goal-reached">
              <Switch
                id="goal-reached"
                isChecked={getConfigValue(setting, NotificationType.GOAL_REACHED, ConfigName.IS_ENABLED) === 'true'}
                onChange={(e) =>
                  updateConfigValue(
                    setting,
                    NotificationType.GOAL_REACHED,
                    ConfigName.IS_ENABLED,
                    e.target.checked ? 'true' : 'false',
                  )
                }
              />
            </HorizontalFormField>

            <HorizontalFormField label="Sale Made" htmlFor="sale-made">
              <Switch
                id="sale-made"
                isChecked={getConfigValue(setting, NotificationType.SALE_MADE, ConfigName.IS_ENABLED) === 'true'}
                onChange={(e) =>
                  updateConfigValue(
                    setting,
                    NotificationType.SALE_MADE,
                    ConfigName.IS_ENABLED,
                    e.target.checked ? 'true' : 'false',
                  )
                }
              />
            </HorizontalFormField>

            <HorizontalFormField label="Contribution received" htmlFor="contribution-received">
              <Select
                value={getConfigValue(setting, NotificationType.CONTRIBUTION_RECEIVED, ConfigName.THRESHOLD) || ''}
                onChange={(e) =>
                  updateConfigValue(
                    setting,
                    NotificationType.CONTRIBUTION_RECEIVED,
                    ConfigName.THRESHOLD,
                    e.target.value,
                  )
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
                isChecked={
                  getConfigValue(setting, NotificationType.CONTRIBUTION_RECEIVED, ConfigName.IS_ENABLED) === 'true'
                }
                onChange={(e) =>
                  updateConfigValue(
                    setting,
                    NotificationType.CONTRIBUTION_RECEIVED,
                    ConfigName.IS_ENABLED,
                    e.target.checked ? 'true' : 'false',
                  )
                }
              />
            </HorizontalFormField>
          </VStack>
        </CardLayout>
      ))}
    </VStack>
  )
}
