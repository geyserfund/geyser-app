import { Button, Image } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsArrowLeft } from 'react-icons/bs'

import { Body1 } from '../../components/typography'
import { VerifyEmailImageUrl } from '../../constants'
import {
  MfaAction,
  OtpResponseFragment,
  useSendOtpByEmailMutation,
} from '../../types'
import { useNotification } from '../../utils'
import { ReceiveOneTimePassword, VerifyOneTimePassword } from './components'

export interface VerifyYourEmailContentProps {
  action: MfaAction
  otpSent?: boolean
  otpData?: OtpResponseFragment
  handleVerify?: (
    otpCode: number,
    otpData: OtpResponseFragment,
    email?: string,
  ) => void
}

export const VerifyYourEmailContent = ({
  action,
  handleVerify,
  otpSent,
  otpData: otp,
}: VerifyYourEmailContentProps) => {
  const { t } = useTranslation()
  const { toast } = useNotification()

  const [sentOtp, setSentOtp] = useState(otpSent || false)
  const [otpData, setOtpData] = useState<OtpResponseFragment | undefined>(otp)
  const [inputEmail, setInputEmail] = useState('')

  const [sendOtpByEmail] = useSendOtpByEmailMutation({
    onError() {
      toast({
        status: 'error',
        title: 'Failed to generate otp.',
        description: 'Please try again',
      })
    },
    onCompleted(data) {
      const otp = data.sendOTPByEmail
      if (otp) {
        setSentOtp(true)
        setOtpData(otp)
      }
    },
  })

  const handleSendOtpByEmail = (email: string) => {
    sendOtpByEmail({
      variables: {
        input: {
          action,
          email,
        },
      },
    })
  }

  const getDescription = () => {
    if (action === MfaAction.ProjectWalletUpdate) {
      return t(
        'You can update your wallet securely by using the One Time Password sent to your verified email.',
      )
    }

    if (action === MfaAction.UserEmailUpdate) {
      return t(
        'You can update your email securely by using One Time Password sent to your last verfied email.',
      )
    }

    return t(
      'Backup your Geyser account and project with your email. This will ensure that you can always access Geyser (in case of social media censorship) and can securely update your project information.',
    )
  }

  return (
    <>
      {sentOtp && (
        <Button
          variant="secondary"
          size={{ base: 'sm', lg: 'md' }}
          leftIcon={<BsArrowLeft fontSize="20px" />}
          onClick={() => setSentOtp(false)}
          alignSelf="start"
        >
          {'Back'}
        </Button>
      )}
      <Image
        src={VerifyEmailImageUrl}
        alt="verify-email-image"
        w={200}
        h={200}
        alignSelf="center"
      />

      <Body1 semiBold>{getDescription()}</Body1>
      {sentOtp && otpData ? (
        <VerifyOneTimePassword
          action={action}
          otp={otpData}
          handleSendOtpByEmail={handleSendOtpByEmail}
          inputEmail={inputEmail}
          handleVerify={handleVerify}
        />
      ) : (
        <ReceiveOneTimePassword
          action={action}
          setInputEmail={setInputEmail}
          handleSendOtpByEmail={handleSendOtpByEmail}
        />
      )}
    </>
  )
}
