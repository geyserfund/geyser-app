import { Button, VStack } from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Body1 } from '../../../components/typography'
import { TextInputBox } from '../../../components/ui'
import { useAuthContext } from '../../../context'
import { OtpResponseFragment, useUserEmailVerifyMutation } from '../../../types'
import { toInt, useNotification } from '../../../utils'

const DEFAULT_WAIT_SECONDS_FOR_RESEND = 60

interface VerifyOneTimePasswordProps {
  otp: OtpResponseFragment
  handleSendOtpByEmail(email: string): void
}

export const VerifyOneTimePassword = ({
  otp,
  handleSendOtpByEmail,
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
    },
  })

  const handleOtpCodeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 6) {
      setOptCode(event.target.value)
    }
  }

  const handleConfirm = () => {
    verifyUserEmail({
      variables: {
        input: {
          otp: toInt(otpCode),
          otpVerificationToken: otp.otpVerificationToken,
        },
      },
    })
  }

  const handleSendCodeAgain = () => {
    if (user.email) {
      handleSendOtpByEmail(user.email)
      handleIntervalTimeLeft()
    }
  }

  return (
    <>
      <VStack spacing="10px">
        <VStack spacing="10px">
          <Body1 semiBold>
            {t('Input the One Time Password that was sent to your email.')}
          </Body1>
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
          >
            {t('Confirm')}
          </Button>
        </VStack>
      </VStack>
    </>
  )
}
