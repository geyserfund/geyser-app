import { Button, ButtonProps, useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'
import { MdEmail } from 'react-icons/md'

import { AUTH_SERVICE_ENDPOINT } from '../../constants'
import { useAuthContext } from '../../context'
import { MfaAction, OtpResponseFragment } from '../../types'
import { useNotification } from '../../utils'
import { VerifyYourEmail } from '../otp'

interface ConnectWithEmailProps extends ButtonProps {
  onClose?: () => void
}

export const ConnectWithEmail = ({
  onClose,
  ...rest
}: ConnectWithEmailProps) => {
  const { isOpen, onClose: onModalClose, onOpen } = useDisclosure()
  const { isLoggedIn, queryCurrentUser } = useAuthContext()
  const { toast } = useNotification()

  const handleClick = async () => {
    onOpen()
  }

  useEffect(() => {
    if (isLoggedIn) {
      onModalClose()
    }
  }, [isLoggedIn, onModalClose])

  const handleLogin = async (
    otpCode: Number,
    otpData: OtpResponseFragment,
    email?: string,
  ) => {
    if (email) {
      fetch(`${AUTH_SERVICE_ENDPOINT}/email`, {
        method: 'POST',
        body: JSON.stringify({
          otp: otpCode,
          otpVerificationToken: otpData.otpVerificationToken,
          email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then(() => {
          queryCurrentUser()
          if (onClose) {
            onClose()
          }

          onModalClose()
        })
        .catch((error) => {
          toast({
            status: 'error',
            title: 'Failed to login with email',
            description: 'Please try again',
          })
        })
    }
  }

  return (
    <>
      <Button
        variant="primary"
        w="100%"
        leftIcon={<MdEmail />}
        onClick={handleClick}
        textDecoration={'none'}
        {...rest}
      >
        Email
      </Button>
      <VerifyYourEmail
        isOpen={isOpen}
        onClose={onModalClose}
        action={MfaAction.Login}
        handleVerify={handleLogin}
      />
    </>
  )
}
