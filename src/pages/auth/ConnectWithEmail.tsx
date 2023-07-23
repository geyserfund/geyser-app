import { Button, ButtonProps, useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'
import { MdEmail } from 'react-icons/md'

import { useAuthContext } from '../../context'
import { MfaAction } from '../../types'
import { VerifyYourEmail } from '../otp'

interface ConnectWithEmailProps extends ButtonProps {
  onClose?: () => void
}

export const ConnectWithEmail = ({
  onClose,
  ...rest
}: ConnectWithEmailProps) => {
  const { isOpen, onClose: onModalClose, onOpen } = useDisclosure()
  const { isLoggedIn } = useAuthContext()

  const handleClick = async () => {
    onOpen()
  }

  useEffect(() => {
    if (isLoggedIn) {
      onModalClose()
    }
  }, [isLoggedIn, onModalClose])

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
      />
    </>
  )
}
