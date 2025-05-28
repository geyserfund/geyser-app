import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'

import { MUTATION_UPDATE_CREATOR_NOTIFICATIONS_SETTINGS } from '@/modules/profile/graphql/mutations/creatorNotificationMutation'
import {
  CreatorNotificationSettings,
  useProfileNotificationsSettingsQuery,
  useProjectNotificationSettingsQuery,
} from '@/types'
import { useNotification } from '@/utils'

export enum CreatorNotificationType {
  PROJECT_SUMMARY = 'creator.projectSummary',
  GOAL_REACHED = 'creator.goalReached',
  SALE_MADE = 'creator.saleMade',
  CONTRIBUTION_RECEIVED = 'creator.contributionReceived',
}

export enum CreatorConfigName {
  FREQUENCY = 'frequency',
  IS_ENABLED = 'is_enabled',
  THRESHOLD = 'threshold',
}

export enum UserNotificationType {
  PROJECT_SUMMARY = 'user.projectUpdatesSummary',
  PRODUCT_UPDATES = 'user.productUpdates',
}

export enum UserConfigName {
  FREQUENCY = 'frequency',
  IS_ENABLED = 'is_enabled',
}

export const useCreatorNotificationSettings = (userId: string, projectId?: string) => {
  const toast = useNotification()
  const [creatorNotificationSettings, setCreatorNotificationSettings] = useState<CreatorNotificationSettings[]>([])
  const [updateCreatorNotificationSetting] = useMutation(MUTATION_UPDATE_CREATOR_NOTIFICATIONS_SETTINGS)

  const { refetch: refetchProjectCreatorNotificationSettings, loading: loadingProjectCreatorNotificationSettings } =
    useProjectNotificationSettingsQuery({
      variables: { projectId },
      skip: !projectId,
      onCompleted(data) {
        if (data?.projectNotificationSettingsGet) {
          setCreatorNotificationSettings([data.projectNotificationSettingsGet])
        }
      },
    })

  const { refetch: refetchUserCreatorNotificationSettings } = useProfileNotificationsSettingsQuery({
    variables: { userId },
    skip: Boolean(projectId) || !userId,
    onCompleted(data) {
      if (data?.userNotificationSettingsGet?.creatorSettings) {
        setCreatorNotificationSettings(data.userNotificationSettingsGet.creatorSettings)
      }
    },
  })

  const getCreatorNotificationConfigValue = (
    creatorNotificationSettings: CreatorNotificationSettings,
    type: CreatorNotificationType,
    name: CreatorConfigName,
  ) => {
    const setting = creatorNotificationSettings.notificationSettings.find((s) => s.notificationType === type)
    return setting?.configurations.find((c) => c.name === name)?.value
  }

  const getCreatorConfigId = (
    creatorNotificationSettings: CreatorNotificationSettings,
    type: CreatorNotificationType,
    name: CreatorConfigName,
  ) => {
    const setting = creatorNotificationSettings.notificationSettings.find((s) => s.notificationType === type)
    return setting?.configurations.find((c) => c.name === name)?.id
  }

  const updateCreatorNotificationConfigValue = async (
    creatorNotificationSetting: CreatorNotificationSettings,
    type: CreatorNotificationType,
    name: CreatorConfigName,
    value: string,
  ) => {
    const configId = getCreatorConfigId(creatorNotificationSetting, type, name)
    if (!configId) return

    // Optimistically update the UI
    setCreatorNotificationSettings((prevSettings) =>
      updateCreatorSettingsMap(prevSettings, creatorNotificationSetting.project.id, type, name, value),
    )

    try {
      await updateCreatorNotificationSetting({
        variables: {
          creatorNotificationConfigurationId: configId,
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
      setCreatorNotificationSettings((prevSettings) =>
        updateCreatorSettingsMap(
          prevSettings,
          creatorNotificationSetting.project.id,
          type,
          name,
          getCreatorNotificationConfigValue(creatorNotificationSetting, type, name) || '',
        ),
      )

      // Show error toast
      toast.error({
        title: 'Update failed',
        description: 'Failed to update notification setting. Please try again.',
      })
    }
  }

  const updateCreatorSettingsMap = (
    prevSettings: CreatorNotificationSettings[],
    projectId: string,
    type: CreatorNotificationType,
    name: CreatorConfigName,
    newValue: string,
  ) => {
    return prevSettings.map((setting) => {
      if (setting.project.id === projectId) {
        return {
          ...setting,
          notificationSettings: setting.notificationSettings.map((notifSetting) => {
            if (notifSetting.notificationType === type) {
              return {
                ...notifSetting,
                configurations: notifSetting.configurations.map((config) =>
                  config.name === name ? { ...config, value: newValue } : config,
                ),
              }
            }

            return notifSetting
          }),
        }
      }

      return setting
    })
  }

  useEffect(() => {
    if (projectId) {
      refetchProjectCreatorNotificationSettings()
    } else {
      refetchUserCreatorNotificationSettings()
    }
  }, [projectId, userId, refetchProjectCreatorNotificationSettings, refetchUserCreatorNotificationSettings])

  const refetchCreatorNotificationSettings = () => {
    if (projectId) {
      refetchProjectCreatorNotificationSettings()
    } else {
      refetchUserCreatorNotificationSettings()
    }
  }

  return {
    loadingProjectCreatorNotificationSettings,
    creatorNotificationSettings,
    setCreatorNotificationSettings,
    getCreatorNotificationConfigValue,
    updateCreatorNotificationConfigValue,
    refetchCreatorNotificationSettings,
  }
}
