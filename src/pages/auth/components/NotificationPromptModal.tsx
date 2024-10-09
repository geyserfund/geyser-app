import { Box, Button, Image, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAuthContext } from '@/context'
import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import {
  NotificationSettings,
  useUserNotificationsSettingsQuery,
  useUserNotificationsSettingsUpdateMutation,
} from '@/types'
import { useNotification } from '@/utils'

import { EmailPromptModalUrl } from '../../../shared/constants'

type NotificationPromptModalProps = {
  onCloseAction?: () => void
  onClose: () => void
  isOpen: boolean
}

export const NotificationPromptModal = ({ onCloseAction, onClose, isOpen }: NotificationPromptModalProps) => {
  const { user } = useAuthContext()
  const { t } = useTranslation()
  const toast = useNotification()

  const [productUpdatesNotificationSetting, setProductUpdatesNotificationSetting] = useState<NotificationSettings>()

  useUserNotificationsSettingsQuery({
    skip: !user?.id,
    variables: {
      userId: user?.id,
    },
    onCompleted(data) {
      const productUpdatesSetting = data?.userNotificationSettingsGet.userSettings.notificationSettings.find(
        (setting: NotificationSettings) => setting.notificationType === 'user.productUpdates',
      )
      setProductUpdatesNotificationSetting(productUpdatesSetting)
    },
  })

  const [updateNotificationSetting] = useUserNotificationsSettingsUpdateMutation()

  const updateProductUpdatesNotification = async () => {
    const configId = productUpdatesNotificationSetting?.configurations.find(
      (config) => config.name === 'is_enabled',
    )?.id
    if (!configId) return

    try {
      await updateNotificationSetting({
        variables: {
          userNotificationConfigurationId: configId,
          value: 'true',
        },
      })
      onCloseAction?.()
    } catch (error) {
      toast.error({
        title: 'Update failed',
        description: 'Failed to update product updates notification setting. Please try again.',
      })
    }

    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={t('Stay informed')}>
        <VStack justifyContent="flex-start" alignItems="flex-start" w="100%" gap={4}>
          <Box w="100%" height="200px" display="flex" justifyContent="center" alignItems="center">
            <Image height="100%" src={EmailPromptModalUrl} alt="Email illustration" objectFit="contain" />
          </Box>
          <VStack justifyContent="flex-start" alignItems="flex-start" w="100%" gap={1}>
            <Body medium>{t('Do you want to receive monthly email updates of the projects you follow?')}</Body>
            <Body size="sm">
              {t(
                'Stay up to date with projects you follow by receiving recurring project updates and Geyser product updates.',
              )}
            </Body>
          </VStack>
          <VStack width="100%">
            <Button w="100%" variant="solid" colorScheme="primary1" onClick={updateProductUpdatesNotification}>
              {t('Yes, please send me updates')}
            </Button>
            <Button w="100%" variant="outline" colorScheme="neutral1" onClick={onClose}>
              {t('No, no project updates')}
            </Button>
          </VStack>
        </VStack>
      </Modal>
    </>
  )
}
