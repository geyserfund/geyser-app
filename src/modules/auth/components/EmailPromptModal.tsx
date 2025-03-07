import { useMutation } from '@apollo/client'
import { Box, Button, Image, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAuthContext } from '@/context'
import { MUTATION_UPDATE_USER_NOTIFICATIONS_SETTINGS } from '@/modules/profile/graphql/mutations/userNotificationsMutation'
import { ControlledTextInput } from '@/shared/components/controlledInput'
import { ControlledCheckboxInput } from '@/shared/components/controlledInput/ControlledCheckboxInput'
import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { NotificationSettings, useUserNotificationsSettingsQuery } from '@/types'
import { useNotification } from '@/utils'

import { EmailPromptModalUrl } from '../../../shared/constants'
import { useEmailPrompt } from '../hooks/useEmailPrompt'

type EmailPromptModalProps = {
  onCloseAction?: () => void
  onClose: () => void
  isOpen: boolean
}

export const EmailPromptModal = ({ onCloseAction, onClose, isOpen }: EmailPromptModalProps) => {
  const { user } = useAuthContext()
  const { t } = useTranslation()
  const toast = useNotification()

  const { control, handleSubmit, onSubmit, enableSave, reset, shouldPrompt } = useEmailPrompt()
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

  const [updateNotificationSetting] = useMutation(MUTATION_UPDATE_USER_NOTIFICATIONS_SETTINGS)

  const updateProductUpdatesNotification = async (data: any) => {
    const configId = productUpdatesNotificationSetting?.configurations.find(
      (config) => config.name === 'is_enabled',
    )?.id
    if (!configId) return

    const value = data.email ? 'true' : 'false'

    try {
      await updateNotificationSetting({
        variables: {
          userNotificationConfigurationId: configId,
          value,
        },
      })
    } catch (error) {
      toast.error({
        title: 'Update failed',
        description: 'Failed to update product updates notification setting. Please try again.',
      })
    }
  }

  useEffect(() => {
    if (isOpen) {
      reset()
    }
  }, [isOpen, reset])

  const handleEmailPrompSubmit = (data: any) => {
    onSubmit(data)
    updateProductUpdatesNotification(data)
    onCloseAction?.()
    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen && shouldPrompt} onClose={onClose} title={t('Email')} size="lg">
        <form onSubmit={handleSubmit(handleEmailPrompSubmit)}>
          <VStack justifyContent="flex-start" alignItems="flex-start" w="100%" gap={4}>
            <Box w="100%" height="200px" display="flex" justifyContent="center" alignItems="center">
              <Image height="100%" src={EmailPromptModalUrl} alt="Email illustration" objectFit="contain" />
            </Box>
            <VStack justifyContent="flex-start" alignItems="flex-start" w="100%" gap={1}>
              <Body size="sm" medium>
                {t('Receive email notifications for projects you follow')}
              </Body>
              <Body size="sm" light>
                {t(
                  'Stay up to date with projects you follow by receiving recurring project updates and Geyser product announcements. Drop email below, and unsubscribe anytime.',
                )}
              </Body>
            </VStack>
            <VStack w="100%" gap={2}>
              <ControlledTextInput control={control} name="email" label="" placeholder="satoshi@gmx.com" />
              <ControlledCheckboxInput control={control} name="dontAskAgain" label={t("Don't ask again")} />
            </VStack>
            <Button w="100%" variant="solid" colorScheme="primary1" type="submit" isDisabled={!enableSave}>
              {t('Save')}
            </Button>
          </VStack>
        </form>
      </Modal>
    </>
  )
}
