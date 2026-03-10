import { Box, Button, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'

import Loader from '@/components/ui/Loader'
import { useAuthContext } from '@/context'
import { EmailPromptFormValues, useEmailPrompt } from '@/modules/auth/hooks/useEmailPrompt.ts'
import { VerifyOneTimePassword } from '@/modules/auth/otp/components/VerifyOneTimePassword.tsx'
import { EmailPromptVariant } from '@/modules/auth/state/emailPromptAtom'
import { ControlledTextInput } from '@/shared/components/controlledInput'
import { ControlledCheckboxInput } from '@/shared/components/controlledInput/ControlledCheckboxInput'
import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import {
  MfaAction,
  NotificationSettings,
  OtpResponseFragment,
  useSendOtpByEmailMutation,
  useUserNotificationsSettingsQuery,
  useUserNotificationsSettingsUpdateMutation,
} from '@/types'
import { useNotification } from '@/utils'

import { EmailPromptModalUrl } from '../../../shared/constants'

type EmailPromptModalProps = {
  onClose: (options?: { runOnCloseAction?: boolean }) => void
  isOpen: boolean
  variant: EmailPromptVariant
}

export const EmailPromptModal = ({ onClose, isOpen, variant }: EmailPromptModalProps) => {
  const { logout, user } = useAuthContext()
  const toast = useNotification()

  const isMandatory = variant === 'mandatory_after_login'
  const [otpData, setOtpData] = useState<OtpResponseFragment | null>(null)
  const [otpEmail, setOtpEmail] = useState<string>('')

  const { control, handleSubmit, onSubmit, enableSave, reset, shouldPrompt } = useEmailPrompt({
    emailRequired: isMandatory,
  })
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
  const [sendOtpByEmail, { loading: sendingOtp }] = useSendOtpByEmailMutation({
    onError(error) {
      toast.error({
        title: t('Failed to generate OTP.'),
        description: error.message,
      })
    },
    onCompleted(data) {
      const otpResponse = data.sendOTPByEmail
      if (otpResponse) {
        setOtpData(otpResponse)
      }
    },
  })

  const handleSendOtpByEmail = (email: string) => {
    setOtpEmail(email)
    sendOtpByEmail({
      variables: {
        input: {
          email,
          action: MfaAction.UserEmailVerification,
        },
      },
    })
  }

  const updateProductUpdatesNotification = async (data: EmailPromptFormValues) => {
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
    } catch {
      toast.error({
        title: t('Update failed'),
        description: t('Failed to update product updates notification setting. Please try again.'),
      })
    }
  }

  useEffect(() => {
    if (isOpen) {
      reset()
      setOtpData(null)
      setOtpEmail('')
    }
  }, [isOpen, reset])

  const handleEmailPromptSubmit = async (data: EmailPromptFormValues) => {
    const hasSubmitted = await onSubmit(data)

    if (!hasSubmitted) {
      if (isMandatory) {
        toast.error({
          title: t('Update failed'),
          description: t('Please add a valid email to continue.'),
        })
      }

      return
    }

    await updateProductUpdatesNotification(data)

    const submittedEmail = data.email?.trim()
    if (submittedEmail) {
      handleSendOtpByEmail(submittedEmail)
      return
    }

    onClose()
  }

  const isOtpStep = Boolean(otpEmail)
  const shouldShowPrompt = isOtpStep || (isMandatory ? Boolean(user.id && !user.email) : shouldPrompt)

  const handleMandatoryLogout = () => {
    logout()
    setOtpData(null)
    setOtpEmail('')
    onClose({ runOnCloseAction: false })
  }

  const handleOtpVerified = () => {
    setOtpData(null)
    setOtpEmail('')
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen && shouldShowPrompt}
      onClose={() => onClose()}
      title={isMandatory ? t('Add your email') : t('Email')}
      size="lg"
      noClose={isMandatory}
      closeOnEsc={!isMandatory}
      closeOnOverlayClick={!isMandatory}
    >
      {isOtpStep ? (
        <VStack justifyContent="center" alignItems="center" w="100%" gap={4}>
          <VStack w="100%" maxWidth="500px" alignItems="center" gap={4}>
            <Body size="sm" medium textAlign="center">
              {t('Verify your email')}
            </Body>
            <Box w="100%">
              {sendingOtp && !otpData ? (
                <Loader />
              ) : otpData ? (
                <VerifyOneTimePassword
                  action={MfaAction.UserEmailVerification}
                  otp={otpData}
                  inputEmail={otpEmail}
                  handleSendOtpByEmail={handleSendOtpByEmail}
                  onClose={handleOtpVerified}
                />
              ) : null}
            </Box>
            {isMandatory && (
              <Button w="100%" variant="outline" colorScheme="neutral1" onClick={handleMandatoryLogout}>
                {t('Log out')}
              </Button>
            )}
          </VStack>
        </VStack>
      ) : (
        <form onSubmit={handleSubmit(handleEmailPromptSubmit)}>
          <VStack justifyContent="flex-start" alignItems="flex-start" w="100%" gap={4}>
            <Box w="100%" height="200px" display="flex" justifyContent="center" alignItems="center">
              <Image height="100%" src={EmailPromptModalUrl} alt="Email illustration" objectFit="contain" />
            </Box>
            <VStack justifyContent="flex-start" alignItems="flex-start" w="100%" gap={1}>
              <Body size="sm" medium>
                {isMandatory ? t('Add your email') : t('Receive email notifications for projects you follow')}
              </Body>
              <Body size="sm" light>
                {isMandatory
                  ? t(
                      'We need your email to better support you and keep you informed about important account activity.',
                    )
                  : t(
                      'Stay up to date with projects you follow by receiving recurring project updates and Geyser product announcements. Drop email below, and unsubscribe anytime.',
                    )}
              </Body>
              {isMandatory && (
                <Body size="sm" color="warning.10">
                  {t('If you choose to close this step, you will be logged out.')}
                </Body>
              )}
            </VStack>
            <VStack w="100%" gap={2}>
              <ControlledTextInput control={control} name="email" label="" placeholder="satoshi@gmx.com" />
              {!isMandatory && (
                <ControlledCheckboxInput control={control} name="dontAskAgain" label={t("Don't ask again")} />
              )}
            </VStack>
            <VStack w="100%" gap={2}>
              <Button w="100%" variant="solid" colorScheme="primary1" type="submit" isDisabled={!enableSave}>
                {t('Save')}
              </Button>
              {isMandatory && (
                <Button w="100%" variant="outline" colorScheme="neutral1" onClick={handleMandatoryLogout}>
                  {t('Log out')}
                </Button>
              )}
            </VStack>
          </VStack>
        </form>
      )}
    </Modal>
  )
}
