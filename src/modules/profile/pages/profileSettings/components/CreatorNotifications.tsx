import { HStack, Select, Skeleton, Switch, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiStar } from 'react-icons/pi'

import { useAuthContext } from '@/context'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import { CreatorNotificationSettings } from '@/types'

import { HorizontalFormField } from '../common/HorizontalFormField'
import { useCreatorNotificationSettings } from '../hooks/useCreatorNotificationSettings'
import { CreatorConfigName, CreatorNotificationType } from '../hooks/useUserNotificationSettings'

export const CreatorNotifications = () => {
  const { t } = useTranslation()
  const { user } = useAuthContext()
  const { project } = useProjectAtom()

  const {
    creatorNotificationSettings: settings,
    updateCreatorNotificationConfigValue,
    getCreatorNotificationConfigValue,
    loadingProjectCreatorNotificationSettings,
  } = useCreatorNotificationSettings(user.id, project.id)

  const handleUpdateConfigValue = async (
    setting: CreatorNotificationSettings,
    type: CreatorNotificationType,
    name: CreatorConfigName,
    value: string,
  ) => {
    const oldValue = getCreatorNotificationConfigValue(setting, type, name)
    try {
      await updateCreatorNotificationConfigValue(setting, type, name, value)
    } catch (error) {
      // If the update fails, revert to the old value
      updateCreatorNotificationConfigValue(setting, type, name, oldValue || '')
    }
  }

  return (
    <VStack spacing={6} align="stretch" width="100%">
      <Body size="md" medium>
        {t('Creator notifications')}
      </Body>
      {loadingProjectCreatorNotificationSettings && <CreatorNotificationsSkeleton />}
      {settings &&
        settings.map((setting, index) => (
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
                  value={
                    getCreatorNotificationConfigValue(
                      setting,
                      CreatorNotificationType.PROJECT_SUMMARY,
                      CreatorConfigName.FREQUENCY,
                    ) || ''
                  }
                  onChange={(e) =>
                    handleUpdateConfigValue(
                      setting,
                      CreatorNotificationType.PROJECT_SUMMARY,
                      CreatorConfigName.FREQUENCY,
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
                  id="creator-summary"
                  isChecked={
                    getCreatorNotificationConfigValue(
                      setting,
                      CreatorNotificationType.PROJECT_SUMMARY,
                      CreatorConfigName.IS_ENABLED,
                    ) === 'true'
                  }
                  onChange={(e) =>
                    handleUpdateConfigValue(
                      setting,
                      CreatorNotificationType.PROJECT_SUMMARY,
                      CreatorConfigName.IS_ENABLED,
                      e.target.checked ? 'true' : 'false',
                    )
                  }
                />
              </HorizontalFormField>
              <Body size="sm" regular color="neutral1.10">
                {t('Receive a monthly email about your project summary: stats, goal progress and, hot products.')}
              </Body>

              <HorizontalFormField label="Goal Reached Email" htmlFor="goal-reached">
                <Switch
                  id="goal-reached"
                  isChecked={
                    getCreatorNotificationConfigValue(
                      setting,
                      CreatorNotificationType.GOAL_REACHED,
                      CreatorConfigName.IS_ENABLED,
                    ) === 'true'
                  }
                  onChange={(e) =>
                    handleUpdateConfigValue(
                      setting,
                      CreatorNotificationType.GOAL_REACHED,
                      CreatorConfigName.IS_ENABLED,
                      e.target.checked ? 'true' : 'false',
                    )
                  }
                />
              </HorizontalFormField>

              <HorizontalFormField label="Sale Made" htmlFor="sale-made">
                <Switch
                  id="sale-made"
                  isChecked={
                    getCreatorNotificationConfigValue(
                      setting,
                      CreatorNotificationType.SALE_MADE,
                      CreatorConfigName.IS_ENABLED,
                    ) === 'true'
                  }
                  onChange={(e) =>
                    handleUpdateConfigValue(
                      setting,
                      CreatorNotificationType.SALE_MADE,
                      CreatorConfigName.IS_ENABLED,
                      e.target.checked ? 'true' : 'false',
                    )
                  }
                />
              </HorizontalFormField>

              <HorizontalFormField label="Contribution received" htmlFor="contribution-received">
                <Select
                  value={
                    getCreatorNotificationConfigValue(
                      setting,
                      CreatorNotificationType.CONTRIBUTION_RECEIVED,
                      CreatorConfigName.THRESHOLD,
                    ) || ''
                  }
                  onChange={(e) =>
                    handleUpdateConfigValue(
                      setting,
                      CreatorNotificationType.CONTRIBUTION_RECEIVED,
                      CreatorConfigName.THRESHOLD,
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
                    getCreatorNotificationConfigValue(
                      setting,
                      CreatorNotificationType.CONTRIBUTION_RECEIVED,
                      CreatorConfigName.IS_ENABLED,
                    ) === 'true'
                  }
                  onChange={(e) =>
                    handleUpdateConfigValue(
                      setting,
                      CreatorNotificationType.CONTRIBUTION_RECEIVED,
                      CreatorConfigName.IS_ENABLED,
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

export const CreatorNotificationsSkeleton = () => {
  return (
    <VStack spacing={6} align="stretch" width="100%">
      <Skeleton height="24px" width="200px" />

      {[1, 2, 3].map((index) => (
        <CardLayout key={index} spacing={5}>
          <VStack align="stretch">
            <HStack>
              <Skeleton width="28px" height="28px" borderRadius="6px" />
              <Skeleton height="20px" width="100%" />
            </HStack>

            {[1, 2, 3, 4].map((fieldIndex) => (
              <HStack key={fieldIndex} justify="space-between">
                <Skeleton height="20px" width="350px" />
                <HStack>
                  <Skeleton height="32px" width="100px" />
                  <Skeleton height="32px" width="40px" />
                </HStack>
              </HStack>
            ))}

            <Skeleton height="16px" width="100%" />
          </VStack>
        </CardLayout>
      ))}
    </VStack>
  )
}
