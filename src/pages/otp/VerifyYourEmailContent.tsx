import { useEffect, useState } from 'react'

import Loader from '@/components/ui/Loader'

import { useAuthContext } from '../../context'
import { MfaAction, OtpResponseFragment, useSendOtpByEmailMutation } from '../../types'
import { useNotification } from '../../utils'
import { ReceiveOneTimePassword, VerifyOneTimePassword } from './components'

export interface VerifyYourEmailContentProps {
  action: MfaAction
  otpSent?: boolean
  otpData?: OtpResponseFragment
  initEmail?: string
  handleVerify?: (otpCode: number, otpData: OtpResponseFragment, email?: string) => void
}

export const VerifyYourEmailContent = ({
  initEmail,
  action,
  handleVerify,
  otpSent,
  otpData: otp,
}: VerifyYourEmailContentProps) => {
  const { toast } = useNotification()
  const { user } = useAuthContext()

  const [sentOtp, setSentOtp] = useState(otpSent || false)
  const [otpData, setOtpData] = useState<OtpResponseFragment | undefined>(otp)
  const [inputEmail, setInputEmail] = useState('')

  const [sendOtpByEmail, { loading }] = useSendOtpByEmailMutation({
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

  useEffect(() => {
    if (initEmail) {
      setInputEmail(initEmail)
      handleSendOtpByEmail(initEmail)
    }
  }, [initEmail])

  if (initEmail && loading) {
    return <Loader />
  }

  return (
    <>
      {sentOtp && otpData ? (
        <VerifyOneTimePassword
          action={action}
          otp={otpData}
          handleSendOtpByEmail={handleSendOtpByEmail}
          inputEmail={inputEmail || user.email || ''}
          handleVerify={handleVerify}
        />
      ) : (
        <ReceiveOneTimePassword
          action={action}
          setInputEmail={setInputEmail}
          handleSendOtpByEmail={handleSendOtpByEmail}
          loading={loading}
        />
      )}
    </>
  )
}
