import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'
import { Button, HStack, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { TextField } from '@/shared/markdown/components/TextField'

import { Body2, H3 } from '../../../../../components/typography'
import { useAuthContext } from '../../../../../context'
import { VerifyYourEmail } from '../../../../../pages/otp'
import { MfaAction } from '../../../../../types'
import { useUpdateVerifyEmail } from '../hooks/useUpdateVerifyEmail'

export const UpdateVerifyEmail = () => {
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
      <form onSubmit={onSubmit}>
        <VStack spacing="10px" alignItems="start">
          <H3>{t('Email')}</H3>
          <Body2>
            {t(
              'Verify your email to secure your account and be able to edit project wallet information. This email will be used to notify you on important project and wallet updates.',
            )}
          </Body2>
          <HStack w="full" alignItems="start">
            <VStack w="full" spacing="0px" flex={1}>
              <InputGroup>
                <TextField required control={control} name="email" />
                <InputRightElement>
                  {isSavedEmailVerfied && <CheckCircleIcon color={'primary.400'} />}
                  {isSavedEmailUnverified && <WarningIcon color={'neutral.600'} />}
                </InputRightElement>
              </InputGroup>
              {isSavedEmailVerfied && (
                <Text color="primary.400" w="full" textAlign="right">
                  {t('This email has been verified')}
                </Text>
              )}

              {isSavedEmailUnverified && (
                <Text color="neutral.600" w="full" textAlign="right">
                  {t('This email has not been verified')}
                </Text>
              )}
            </VStack>

            {!user.isEmailVerified && !formState.isDirty && user.email ? (
              <Button variant="secondary" onClick={handleVerifyEmailClick}>
                {t('Verify email')}
              </Button>
            ) : (
              <Button variant="secondary" type="submit" isDisabled={!formState.isDirty}>
                {t('Update email')}
              </Button>
            )}
          </HStack>
        </VStack>
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
