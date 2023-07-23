import { useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'

import { useAuthContext } from '../../context'
import { MfaAction } from '../../types'
import { VerifyYourEmail } from './VerifyYourEmail'

export const EmailVerificationTriggered = 'EmailVerificationTriggered'

export const DefaultEmailVerify = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { user, isUserAProjectCreator } = useAuthContext()

  useEffect(() => {
    if (
      user.id &&
      (!user.email || !user.isEmailVerified) &&
      (isUserAProjectCreator ||
        !(localStorage.getItem(EmailVerificationTriggered) === 'true'))
    ) {
      onOpen()
    } else {
      onClose()
    }
  }, [user, isUserAProjectCreator, onClose, onOpen])

  const handleCloseForNonCreators = () => {
    localStorage.setItem(EmailVerificationTriggered, 'true')
    onClose()
  }

  return (
    <VerifyYourEmail
      isOpen={isOpen}
      onClose={isUserAProjectCreator ? () => {} : handleCloseForNonCreators}
      noClose={isUserAProjectCreator}
      action={MfaAction.UserEmailVerification}
    />
  )
}
