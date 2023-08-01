import { Button, VStack } from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Body1 } from '../../../components/typography'
import { TextInputBox } from '../../../components/ui'
import { useAuthContext } from '../../../context'
import {
  MfaAction,
  OtpResponseFragment,
  useUserEmailVerifyMutation,
} from '../../../types'
import { toInt, useNotification } from '../../../utils'

const DEFAULT_WAIT_SECONDS_FOR_RESEND = 60

interface VerifyOneTimePasswordProps {
  action: MfaAction
  otp: OtpResponseFragment
  handleSendOtpByEmail(email: string): void
  handleVerify?: (
    otpCode: number,
    otpData: OtpResponseFragment,
    email?: string,
  ) => void
  inputEmail: string
}

export const VerifyOneTimePassword = ({
  action,
  otp,
  handleSendOtpByEmail,
  handleVerify,
  inputEmail,
}: VerifyOneTimePasswordProps) => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const { user, queryCurrentUser } = useAuthContext()

  const [otpCode, setOptCode] = useState('')

  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    handleIntervalTimeLeft()
  }, [])

  const handleIntervalTimeLeft = () => {
    setTimeLeft(DEFAULT_WAIT_SECONDS_FOR_RESEND)
    const interval = setInterval(() => {
      setTimeLeft((current) => {
        if (current === 1) {
          clearInterval(interval)
        }

        return current - 1
      })
    }, 1000)
  }

  const [verifyUserEmail, { loading }] = useUserEmailVerifyMutation({
    onError() {
      toast({
        status: 'error',
        title: 'Failed to verify email.',
        description: 'Please try again',
      })
    },
    onCompleted() {
      queryCurrentUser()
      toast({ status: 'success', title: 'Email verification successfull!' })
    },
  })

  const handleOtpCodeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 6) {
      setOptCode(event.target.value)
    }
  }

  const handleConfirm = () => {
    if (handleVerify) {
      handleVerify(toInt(otpCode), otp, inputEmail)
    } else {
      verifyUserEmail({
        variables: {
          input: {
            otp: toInt(otpCode),
            otpVerificationToken: otp.otpVerificationToken,
          },
        },
      })
    }

    setOptCode('')
  }

  const handleSendCodeAgain = () => {
    if (user.email) {
      handleSendOtpByEmail(user.email)
      handleIntervalTimeLeft()
    }
  }

  const getButtonText = () => {
    if (action === MfaAction.ProjectWalletUpdate) {
      return t('Save')
    }

    return t('Confirm')
  }

  return (
    <>
      <VStack spacing="10px">
        <VStack spacing="10px" w="full">
          <Body1 semiBold>{t('OTP input')}</Body1>
          <TextInputBox
            size="lg"
            placeholder="12123"
            w="full"
            fontWeight={700}
            textAlign="center"
            type="number"
            value={otpCode}
            onChange={handleOtpCodeInput}
          />
        </VStack>

        <VStack w="full" spacing="10px">
          <Button
            w="full"
            variant="secondary"
            onClick={handleSendCodeAgain}
            isDisabled={!user.email || timeLeft > 0}
          >
            {t('Send code again')}
            {timeLeft > 0 && `( ${timeLeft}s )`}
          </Button>
          <Button
            w="full"
            variant="primary"
            onClick={handleConfirm}
            isLoading={loading}
            isDisabled={!otpCode || otpCode.length !== 6}
          >
            {getButtonText()}
          </Button>
        </VStack>
      </VStack>
    </>
  )
}
