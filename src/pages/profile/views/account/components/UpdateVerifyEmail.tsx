import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'
import {
  Button,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Body1, Body2 } from '../../../../../components/typography'
import { useAuthContext } from '../../../../../context'
import { TextField } from '../../../../../forms/components/TextField'
import { useModal } from '../../../../../hooks/useModal'
import {
  MfaAction,
  OtpResponseFragment,
  useSendOtpByEmailMutation,
  useUserEmailUpdateMutation,
} from '../../../../../types'
import { emailValidationSchema, useNotification } from '../../../../../utils'
import { VerifyYourEmail } from '../../../../otp'

export const UpdateVerifyEmail = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const { user, setUser } = useAuthContext()

  const [otpSent, setSentOtp] = useState(false)
  const [otpData, setOtpData] = useState<OtpResponseFragment>()

  const verifyEmailModal = useModal()

  const [currentMfaAction, setCurrentMfaAction] = useState(
    MfaAction.UserEmailUpdate,
  )

  const { formState, control, handleSubmit, getValues } = useForm<{
    email: string
  }>({
    resolver: yupResolver(emailValidationSchema),
    values: user.email
      ? {
          email: user.email,
        }
      : undefined,
  })

  const [sendOtpByEmail] = useSendOtpByEmailMutation({
    onError() {
      toast({
        status: 'error',
        title: 'Failed to generate OTP.',
        description: 'Please try again',
      })
    },
    onCompleted(data) {
      const otp = data.sendOTPByEmail
      if (otp) {
        setSentOtp(true)
        setOtpData(otp)
        setCurrentMfaAction(MfaAction.UserEmailVerification)
        verifyEmailModal.onOpen()
      }
    },
  })

  const [updateUserEmail] = useUserEmailUpdateMutation({
    onError() {
      toast({
        status: 'error',
        title: 'Failed to update email.',
        description: 'Please try again',
      })
    },
    onCompleted(data) {
      const emailUpdateUser = data.userEmailUpdate
      if (emailUpdateUser && emailUpdateUser.email) {
        setUser((current) => ({ ...current, ...emailUpdateUser }))
        sendOtpByEmail({
          variables: {
            input: {
              email: user.email,
              action: MfaAction.UserEmailVerification,
            },
          },
        })
        toast({
          status: 'success',
          title: 'Successfully updated user email',
        })
        toast({
          status: 'info',
          title: 'OTP Sent to the updated email',
        })
      }
    },
  })

  const onSubmit = async ({ email }: { email: string }) => {
    if (!user.email || !user.isEmailVerified) {
      updateUserEmail({
        variables: {
          input: {
            email,
          },
        },
      })
    } else {
      setCurrentMfaAction(MfaAction.UserEmailUpdate)
      verifyEmailModal.onOpen()
    }
  }

  const handleModalClosed = () => {
    setOtpData(undefined)
    setSentOtp(false)
    verifyEmailModal.onClose()
  }

  const handleVerifyEmailClick = () => {
    if (user.email) {
      sendOtpByEmail({
        variables: {
          input: {
            email: user.email,
            action: MfaAction.UserEmailVerification,
          },
        },
      })
    }
  }

  const handleEmailUpdate = (otpCode: number, otpData: OtpResponseFragment) => {
    const formValues = getValues()
    if (formValues.email) {
      updateUserEmail({
        variables: {
          input: {
            email: formValues.email,
            twoFAInput: {
              OTP: {
                otp: otpCode,
                otpVerificationToken: otpData.otpVerificationToken,
              },
            },
          },
        },
      })
    }
  }

  const isSavedEmailUnverified =
    !formState.isDirty && user.email && !user.isEmailVerified

  const isSavedEmailVerfied = !formState.isDirty && user.isEmailVerified

  return (
    <>
      <form
        onSubmit={(e) => {
          e.stopPropagation()
          e.preventDefault()
          handleSubmit(onSubmit)(e)
        }}
      >
        <VStack spacing="10px" alignItems="start">
          <Body1 semiBold>{t('Email')}</Body1>
          <Body2>
            {t(
              'Verify your email to secure your account and be able to edit project wallet information. This email will be used to notify you on important project and wallet updates.',
            )}
          </Body2>
          <VStack w="full" spacing="0px">
            <InputGroup>
              <TextField required control={control} name="email" />
              <InputRightElement>
                {isSavedEmailVerfied && (
                  <CheckCircleIcon color={'primary.400'} />
                )}
                {isSavedEmailUnverified && (
                  <WarningIcon color={'neutral.600'} />
                )}
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
            <Button w="full" variant="primary" onClick={handleVerifyEmailClick}>
              {t('Verify email')}
            </Button>
          ) : (
            <Button
              variant="primary"
              w="full"
              type="submit"
              isDisabled={!formState.isDirty}
            >
              {t('Update email')}
            </Button>
          )}
        </VStack>
      </form>

      <VerifyYourEmail
        onClose={handleModalClosed}
        isOpen={verifyEmailModal.isOpen}
        handleVerify={
          currentMfaAction === MfaAction.UserEmailUpdate
            ? handleEmailUpdate
            : undefined
        }
        action={currentMfaAction}
        otpSent={otpSent}
        otpData={otpData}
      />
    </>
  )
}
