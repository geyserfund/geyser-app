import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'
import { Button, ButtonProps, HStack, InputGroup, InputRightElement, StackProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { VerifyYourEmail } from '@/modules/auth/otp/VerifyYourEmail.tsx'
import { Body, H3 } from '@/shared/components/typography'
import { TextField } from '@/shared/markdown/components/TextField'

import { useAuthContext } from '../../../../../context'
import { MfaAction } from '../../../../../types'
import { useUpdateVerifyEmail } from '../hooks/useUpdateVerifyEmail'

export const UpdateVerifyEmail = ({
  verifyButtonMode,
  verifyButtonProps,
  inputWrapperProps,
}: {
  verifyButtonMode?: boolean
  verifyButtonProps?: ButtonProps
  inputWrapperProps?: StackProps
}) => {
  const { t } = useTranslation()
  const { user } = useAuthContext()

  const {
    formState,
    control,
    otpSent,
    otpData,
    currentMfaAction,
    onSubmit,
    handleModalClosed,
    handleVerifyEmailClick,
    handleEmailUpdate,
    verifyEmailModal,
  } = useUpdateVerifyEmail()

  const isSavedEmailUnverified = !formState.isDirty && user.email && !user.isEmailVerified

  const isSavedEmailVerfied = !formState.isDirty && user.isEmailVerified

  return (
    <>
      <form onSubmit={onSubmit} style={{ width: '100%' }}>
        {!verifyButtonMode ? (
          <VStack spacing="10px" alignItems="start">
            <H3 size="lg">{t('Email')}</H3>
            <Body size="sm">
              {t(
                'Verify your email to secure your account and be able to edit project wallet information. This email will be used to notify you on important project and wallet updates.',
              )}
            </Body>

            <HStack w="full" alignItems="start" {...inputWrapperProps}>
              <VStack w="full" spacing="0px" flex={1}>
                <InputGroup>
                  <TextField required control={control} name="email" />
                  <InputRightElement>
                    {isSavedEmailVerfied && <CheckCircleIcon color={'primary1.9'} />}
                    {isSavedEmailUnverified && <WarningIcon color={'neutral1.9'} />}
                  </InputRightElement>
                </InputGroup>
                {isSavedEmailVerfied && (
                  <Body light w="full" textAlign="right">
                    {t('This email has been verified')}
                  </Body>
                )}

                {isSavedEmailUnverified && (
                  <Body light w="full" textAlign="right">
                    {t('This email has not been verified')}
                  </Body>
                )}
              </VStack>

              {!user.isEmailVerified && !formState.isDirty && user.email ? (
                <Button size="lg" variant="outline" colorScheme="neutral1" onClick={handleVerifyEmailClick}>
                  {t('Verify email')}
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="outline"
                  colorScheme="neutral1"
                  type="submit"
                  isDisabled={!formState.isDirty}
                >
                  {t('Update email')}
                </Button>
              )}
            </HStack>
          </VStack>
        ) : (
          <HStack w="full">
            <Button
              size="lg"
              variant="outline"
              colorScheme="neutral1"
              onClick={handleVerifyEmailClick}
              {...verifyButtonProps}
            >
              {t('Verify email')}
            </Button>
          </HStack>
        )}
      </form>
      {verifyEmailModal.isOpen && (
        <VerifyYourEmail
          onClose={handleModalClosed}
          isOpen={verifyEmailModal.isOpen}
          handleVerify={currentMfaAction === MfaAction.UserEmailUpdate ? handleEmailUpdate : undefined}
          action={currentMfaAction}
          otpSent={otpSent}
          otpData={otpData}
        />
      )}
    </>
  )
}
