import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { FormEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useAuthContext } from '../../../../../context'
import { useModal } from '../../../../../shared/hooks/useModal'
import {
  MfaAction,
  OtpResponseFragment,
  useSendOtpByEmailMutation,
  useUserEmailUpdateMutation,
} from '../../../../../types'
import { emailValidationSchema, useNotification } from '../../../../../utils'

export const useUpdateVerifyEmail = () => {
  const { toast } = useNotification()
  const { user, setUser } = useAuthContext()

  const verifyEmailModal = useModal()

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

  const [otpSent, setSentOtp] = useState(false)
  const [otpData, setOtpData] = useState<OtpResponseFragment>()
  const [currentMfaAction, setCurrentMfaAction] = useState(MfaAction.UserEmailUpdate)

  const [sendOtpByEmail] = useSendOtpByEmailMutation({
    onError(error) {
      toast({
        status: 'error',
        title: t('Failed to generate OTP.'),
        description: error.message,
      })
    },
    onCompleted(data) {
      toast({
        status: 'info',
        title: t('OTP Sent to the updated email'),
      })

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
    onError(error) {
      toast({
        status: 'error',
        title: t('Failed to update email.'),
        description: `${error.message}`,
      })
    },
    onCompleted(data) {
      const emailUpdateUser = data.userEmailUpdate
      if (emailUpdateUser && emailUpdateUser.email) {
        setUser((current) => ({ ...current, ...emailUpdateUser }))
        verifyEmailModal.onClose()
        sendOtpByEmail({
          variables: {
            input: {
              email: emailUpdateUser.email,
              action: MfaAction.UserEmailVerification,
            },
          },
        })
        toast({
          status: 'success',
          title: t('Successfully updated user email'),
        })
        toast({
          status: 'info',
          title: t('OTP Sent to the updated email'),
        })
      }
    },
  })

  const submitFunction = async ({ email }: { email: string }) => {
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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation()
    e.preventDefault()
    handleSubmit(submitFunction)(e)
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

  return {
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
  }
}
