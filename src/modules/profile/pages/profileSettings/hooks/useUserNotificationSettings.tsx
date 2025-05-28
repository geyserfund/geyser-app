import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'

import { MUTATION_UPDATE_USER_NOTIFICATIONS_SETTINGS } from '@/modules/profile/graphql/mutations/userNotificationsMutation'
import { useProfileNotificationsSettingsQuery, UserNotificationSettings } from '@/types'
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

export const useUserNotificationSettings = (userId: string) => {
  const toast = useNotification()
  const [userNotificationSettings, setUserNotificationSettings] = useState<UserNotificationSettings>(
    {} as UserNotificationSettings,
  )

  const { refetch: refetchUserNotificationSettings, loading: loadingUserNotificationSettings } =
    useProfileNotificationsSettingsQuery({
      skip: !userId,
      variables: { userId },
      onCompleted(data) {
        if (data?.userNotificationSettingsGet?.userSettings) {
          setUserNotificationSettings(data.userNotificationSettingsGet.userSettings)
        }
      },
    })

  const [updateUserNotificationSetting] = useMutation(MUTATION_UPDATE_USER_NOTIFICATIONS_SETTINGS)

  const getUserNotificationConfigValue = (type: UserNotificationType, name: UserConfigName) => {
    if (!userNotificationSettings?.notificationSettings) return ''
    const setting = userNotificationSettings?.notificationSettings.find((s) => s.notificationType === type)
    return setting?.configurations.find((c) => c.name === name)?.value
  }

  const getUserNotificationConfigId = (type: UserNotificationType, name: UserConfigName) => {
    if (!userNotificationSettings?.notificationSettings) return ''
    const setting = userNotificationSettings?.notificationSettings.find((s) => s.notificationType === type)
    return setting?.configurations.find((c) => c.name === name)?.id
  }

  const updateUserNotificationSettingsMap = (
    prevSettings: UserNotificationSettings,
    type: UserNotificationType,
    name: UserConfigName,
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

  const updateUserNotificationConfigValue = async (type: UserNotificationType, name: UserConfigName, value: string) => {
    const configId = getUserNotificationConfigId(type, name)

    if (!configId) return
    // Optimistically update the UI
    setUserNotificationSettings((prevSettings) => {
      if (prevSettings) {
        return updateUserNotificationSettingsMap(prevSettings, type, name, value)
      }

      return prevSettings
    })

    try {
      await updateUserNotificationSetting({
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
      setUserNotificationSettings((prevSettings) => {
        if (prevSettings) {
          return updateUserNotificationSettingsMap(
            prevSettings,
            type,
            name,
            getUserNotificationConfigValue(type, name) || '',
          )
        }

        return prevSettings
      })

      // Show error toast
      toast.error({
        title: 'Update failed',
        description: (error as Error).message,
      })
    }
  }

  useEffect(() => {
    refetchUserNotificationSettings()
  }, [userId, refetchUserNotificationSettings])

  return {
    loadingUserNotificationSettings,
    userNotificationSettings,
    refetchUserNotificationSettings,
    getUserNotificationConfigValue,
    updateUserNotificationConfigValue,
    setUserNotificationSettings,
  }
}
