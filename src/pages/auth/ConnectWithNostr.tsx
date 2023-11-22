import { Button, IconButton } from '@chakra-ui/react'
import { useEffect } from 'react'

import { NostrSvgIcon } from '../../components/icons'
import { useModal } from '../../hooks/useModal'
import { useNostrExtensonLogin } from '../../hooks/useNostrExtensionLogin'
import { isAccountDuplicateError } from '../../utils'
import { FailedToConnectAccount } from './components/FailedToConnectAccount'
import { NostrHelpModal } from './components/NostrHelpModal'
import { ConnectWithButtonProps } from './type'

export const ConnectWithNostr = ({
  onClose,
  isIconOnly,
  ...rest
}: Omit<ConnectWithButtonProps, 'accountType'>) => {
  const { connect, error, clearError } = useNostrExtensonLogin()

  const failedModal = useModal()
  const nostrHelpModal = useModal()

  const handleClick = async () => {
    if (!window.nostr) {
      return nostrHelpModal.onOpen()
    }

    try {
      await connect()
    } finally {
      onClose?.()
    }
  }

  useEffect(() => {
    if (error) {
      if (isAccountDuplicateError(error)) {
        failedModal.onOpen()
      }

      clearError()
    }
  }, [error])

  const ButtonComponent = isIconOnly ? IconButton : Button

  const buttonProps = isIconOnly
    ? {
        icon: <NostrSvgIcon boxSize={'16px'} />,
      }
    : {
        leftIcon: <NostrSvgIcon boxSize={'16px'} />,
      }

  return (
    <>
      <ButtonComponent
        aria-label="Connect with Nostr"
        w="100%"
        variant="secondaryNeutral"
        color={'social.nostr'}
        fontWeight={600}
        onClick={handleClick}
        {...buttonProps}
        {...rest}
      >
        {!isIconOnly && 'Nostr'}
      </ButtonComponent>
      <NostrHelpModal {...nostrHelpModal} />
      <FailedToConnectAccount {...failedModal} />
    </>
  )
}
