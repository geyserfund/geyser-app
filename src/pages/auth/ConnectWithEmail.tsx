import { Button, ButtonProps, useDisclosure, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { ControlledTextInput } from '@/shared/components/controlledInput'

import { getAuthEndPoint } from '../../config/domain'
import { useAuthContext } from '../../context'
import { MfaAction, OtpResponseFragment } from '../../types'
import { emailValidationSchema, useNotification } from '../../utils'
import { VerifyYourEmail } from '../otp'

interface ConnectWithEmailProps extends ButtonProps {
  onClose?: () => void
}

export const ConnectWithEmail = ({ onClose, ...rest }: ConnectWithEmailProps) => {
  const { isOpen, onClose: onModalClose, onOpen } = useDisclosure()
  const { isLoggedIn, queryCurrentUser } = useAuthContext()
  const { toast } = useNotification()

  const authServiceEndPoint = getAuthEndPoint()

  const [initEmail, setInitEmail] = useState<string | undefined>()

  const { control, handleSubmit } = useForm<{
    email: string
  }>({
    resolver: yupResolver(emailValidationSchema),
  })

  const handleClick = async (values: any) => {
    setInitEmail(values.email)
    onOpen()
  }

  useEffect(() => {
    if (isLoggedIn) {
      onModalClose()
    }
  }, [isLoggedIn, onModalClose])

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
        }).then((response) => response.json())

        if (response?.status === 'ok') {
          queryCurrentUser()
        } else {
          toast({
            status: 'error',
            title: 'Failed to login with email',
            description: 'Please try again',
          })
        }

        if (onClose) {
          onClose()
        }

        onModalClose()
      } catch (error) {
        console.log('checking error', error)
        toast({
          status: 'error',
          title: 'Failed to login with email',
          description: 'Please try again',
        })
      }
    }
  }

  return (
    <>
      <VStack as={'form'} onSubmit={handleSubmit(handleClick)} w="full">
        <ControlledTextInput label={t('Email')} name="email" placeholder="example@email.com" control={control} />
        <Button type="submit" variant="solid" colorScheme="primary1" w="100%" textDecoration={'none'} {...rest}>
          {t('Continue with email')}
        </Button>
      </VStack>
      {initEmail && (
        <VerifyYourEmail
          isOpen={isOpen}
          onClose={onModalClose}
          action={MfaAction.Login}
          handleVerify={handleLogin}
          initEmail={initEmail}
        />
      )}
    </>
  )
}
