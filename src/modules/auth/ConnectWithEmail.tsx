import { Button, ButtonProps, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { ControlledTextInput } from '@/shared/components/controlledInput'

import { getAuthEndPoint } from '../../config/domain'
import { useAuthContext } from '../../context'
import { MfaAction, OtpResponseFragment } from '../../types'
import { emailValidationSchema, useNotification } from '../../utils'
import { useNotificationPromptModal } from './hooks/useNotificationPromptModal'
import { VerifyYourEmailContent } from './otp/VerifyYourEmailContent.tsx'

interface ConnectWithEmailProps extends ButtonProps {
  onClose?: () => void
  isOTPStarted?: (_: boolean) => void
}

export const ConnectWithEmail = ({ onClose, isOTPStarted, ...rest }: ConnectWithEmailProps) => {
  const { isLoggedIn, queryCurrentUser } = useAuthContext()
  const { toast } = useNotification()

  const { notificationPromptOnOpen } = useNotificationPromptModal()

  const authServiceEndPoint = getAuthEndPoint()

  const [initEmail, setInitEmail] = useState<string | undefined>()

  const { control, handleSubmit } = useForm<{
    email: string
  }>({
    resolver: yupResolver(emailValidationSchema),
  })

  const handleClick = async (values: any) => {
    setInitEmail(values.email)
    isOTPStarted?.(true)
  }

  useEffect(() => {
    if (isLoggedIn) {
      onClose?.()
      isOTPStarted?.(false)
    }
  }, [isLoggedIn, isOTPStarted, onClose])

  const handleLogin = async (otpCode: Number, otpData: OtpResponseFragment, email?: string) => {
    if (email) {
      try {
        const response = await fetch(`${authServiceEndPoint}/email`, {
          method: 'POST',
          body: JSON.stringify({
            otp: otpCode,
            otpVerificationToken: otpData.otpVerificationToken,
            email,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }).then((response) => response.json())

        if (response?.status === 'ok') {
          queryCurrentUser()
          notificationPromptOnOpen()
          onClose?.()
          isOTPStarted?.(false)
        } else {
          toast({
            status: 'error',
            title: t('Failed to login with email'),
            description: t('Please try again'),
          })
        }
      } catch (error) {
        toast({
          status: 'error',
          title: t('Failed to login with email'),
          description: t('Please try again'),
        })
      }
    }
  }

  return (
    <>
      {initEmail ? (
        <VStack w="full">
          <VerifyYourEmailContent initEmail={initEmail} action={MfaAction.Login} handleVerify={handleLogin} />
        </VStack>
      ) : (
        <VStack as={'form'} onSubmit={handleSubmit(handleClick)} w="full">
          <ControlledTextInput label={t('Email')} name="email" placeholder="example@email.com" control={control} />
          <Button
            size="lg"
            type="submit"
            variant="solid"
            colorScheme="primary1"
            w="100%"
            textDecoration={'none'}
            {...rest}
          >
            {t('Continue with email')}
          </Button>
        </VStack>
      )}
    </>
  )
}
