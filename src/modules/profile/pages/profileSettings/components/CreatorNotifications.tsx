import { useMutation, useQuery } from '@apollo/client'
import { Avatar, FormControl, FormLabel, HStack, Select, Switch, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useParams } from 'react-router'

import { MUTATION_UPDATE_CREATOR_NOTIFICATIONS_SETTINGS } from '@/modules/profile/graphql/mutations/creatorNotificationMutation'
import { QUERY_CREATOR_NOTIFICATIONS_SETTINGS } from '@/modules/profile/graphql/queries/creatorNotificationSettingsQuery'
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

export const CreatorNotifications = () => {
  const { userId } = useParams()
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings[]>([])
  const [project, setProject] = useState<any>(null)

  useQuery(QUERY_CREATOR_NOTIFICATIONS_SETTINGS, {
    variables: { userId },
    onCompleted(data) {
      setNotificationSettings(data?.settingsNotificationsCreatorGet.notificationSettings || [])
      setProject(data?.settingsNotificationsCreatorGet.project || null)
    },
  })

  const [updateNotificationSetting] = useMutation(MUTATION_UPDATE_CREATOR_NOTIFICATIONS_SETTINGS)

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
          creatorNotificationConfigurationId: configId,
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

  if (!project) return null

  return (
    <VStack spacing={6} align="stretch" width="100%">
      <Body size="lg" bold>
        Creator notifications
      </Body>
      <VStack spacing={4} align="stretch" p={4}>
        <HStack>
          <Avatar src={project.avatarUrl} name={project.title} size="sm" />
          <Body bold>{project.title}</Body>
        </HStack>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel htmlFor="creator-summary" mb="0">
            <Body size="lg">Creator summary email</Body>
          </FormLabel>
          <HStack spacing={4}>
            <Select
              value={getConfigValue('creator.projectSummary', 'frequency') || ''}
              onChange={(e) => updateConfigValue('creator.projectSummary', 'frequency', e.target.value)}
              size="sm"
              placeholder="Select frequency"
              width="auto"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </Select>
            <Switch
              id="creator-summary"
              isChecked={getConfigValue('creator.projectSummary', 'is_enabled') === 'true'}
              onChange={(e) =>
                updateConfigValue('creator.projectSummary', 'is_enabled', e.target.checked ? 'true' : 'false')
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
          Get notified with an email as soon as important events takes place in your project, from making a reward sale,
          to receiving a contribution above a certain amount, and reaching a goal.
        </Body>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel htmlFor="goal-reached" mb="0">
            <Body size="lg">Goal Reached Email</Body>
          </FormLabel>
          <Switch
            id="goal-reached"
            isChecked={getConfigValue('creator.goalReached', 'is_enabled') === 'true'}
            onChange={(e) =>
              updateConfigValue('creator.goalReached', 'is_enabled', e.target.checked ? 'true' : 'false')
            }
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel htmlFor="sale-made" mb="0">
            <Body size="lg">Sale Made</Body>
          </FormLabel>
          <Switch
            id="sale-made"
            isChecked={getConfigValue('creator.saleMade', 'is_enabled') === 'true'}
            onChange={(e) => updateConfigValue('creator.saleMade', 'is_enabled', e.target.checked ? 'true' : 'false')}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel htmlFor="contribution-received" mb="0">
            <Body size="lg">Contribution received</Body>
          </FormLabel>
          <HStack spacing={4}>
            <Select
              value={getConfigValue('creator.contributionReceived', 'threshold') || ''}
              onChange={(e) => updateConfigValue('creator.contributionReceived', 'threshold', e.target.value)}
              size="sm"
              placeholder="Select threshold"
              width="auto"
            >
              <option value="10000"> {'> 10,000'} </option>
              <option value="50000"> {'> 50,000'} </option>
              <option value="100000"> {'> 100,000'} </option>
              <option value="all">All</option>
            </Select>
            <Switch
              id="contribution-received"
              isChecked={getConfigValue('creator.contributionReceived', 'is_enabled') === 'true'}
              onChange={(e) =>
                updateConfigValue('creator.contributionReceived', 'is_enabled', e.target.checked ? 'true' : 'false')
              }
            />
          </HStack>
        </FormControl>
      </VStack>
    </VStack>
  )
}
