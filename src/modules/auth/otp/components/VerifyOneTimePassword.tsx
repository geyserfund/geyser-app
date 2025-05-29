import { Box, Button, HStack, Icon, Input, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiArrowClockwise } from 'react-icons/pi'
import OtpInput from 'react-otp-input'

import { useAuthContext } from '@/context'
import { Body } from '@/shared/components/typography'
import { MfaAction, OtpResponseFragment, useUserEmailVerifyMutation } from '@/types'
import { toInt, useNotification } from '@/utils'

const DEFAULT_WAIT_SECONDS_FOR_RESEND = 60

interface VerifyOneTimePasswordProps {
  action: MfaAction
  otp: OtpResponseFragment
  handleSendOtpByEmail(email: string): void
  handleVerify?: (otpCode: number, otpData: OtpResponseFragment, email?: string) => void
  inputEmail: string
  onClose?: () => void
}

export const VerifyOneTimePassword = ({
  action,
  otp,
  handleSendOtpByEmail,
  handleVerify,
  inputEmail,
  onClose,
}: VerifyOneTimePasswordProps) => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const { queryCurrentUser } = useAuthContext()

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
        title: t('Failed to verify email.'),
        description: t('Please try again'),
      })
    },
    onCompleted() {
      queryCurrentUser()
      toast({ status: 'success', title: t('Email verification successfull!') })
      onClose?.()
    },
  })

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
    if (inputEmail) {
      handleSendOtpByEmail(inputEmail)
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
      <VStack spacing={6}>
        <VStack w="full" alignItems="start">
          <Body medium>
            {`${t('We sent you an OTP code to')}: `}
            <Body as="span" bold>
              {inputEmail}
            </Body>
          </Body>
          <Body>{t('Paste (or type) it below to continue.')}</Body>
        </VStack>
        <OtpInput
          value={otpCode}
          onChange={setOptCode}
          numInputs={6}
          renderSeparator={<Box width="20px" />}
          inputType="tel"
          shouldAutoFocus
          renderInput={(props) => (
            <Input minWidth="40px" px={1} size="md" w="full" fontWeight={700} textAlign="center" {...props} />
          )}
        />

        <HStack w="full" spacing="10px">
          <Button
            flex={1}
            variant="soft"
            colorScheme="neutral1"
            size="lg"
            onClick={handleSendCodeAgain}
            isDisabled={!inputEmail || timeLeft > 0}
            rightIcon={timeLeft > 0 ? undefined : <Icon as={PiArrowClockwise} />}
          >
            {t('Resend code')}
            {timeLeft > 0 && ` (${timeLeft}s)`}
          </Button>
          <Button
            flex={1}
            variant="solid"
            colorScheme="primary1"
            size="lg"
            onClick={handleConfirm}
            isLoading={loading}
            isDisabled={!otpCode || otpCode.length !== 6}
          >
            {getButtonText()}
          </Button>
        </HStack>
      </VStack>
    </>
  )
}
