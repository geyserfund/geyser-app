import { Button, useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'

import { NostrSvgIcon } from '../../components/icons'
import { useNostrExtensonLogin } from '../../hooks/useNostrExtensionLogin'
import { FailedToConnectAccount } from './FailedToConnectAccount'
type Props = {
  onClose?: () => void
}
export const ConnectWithNostr = ({ onClose }: Props) => {
  const { isOpen, onOpen, onClose: onClosePopup } = useDisclosure()

  const { connect, error, clearError } = useNostrExtensonLogin()

  const handleClick = async () => {
    try {
      await connect()
    } finally {
      onClose?.()
    }
  }

  useEffect(() => {
    if (error) {
      onOpen()
      clearError()
    }
  }, [error])

  return (
    <>
      <Button
        w="100%"
        backgroundColor="brand.nostr"
        leftIcon={<NostrSvgIcon height="20px" width="20px" />}
        color="white"
        _hover={{ backgroundColor: 'brand.nostrDark' }}
        onClick={() => handleClick()}
      >
        Nostr
      </Button>
      <FailedToConnectAccount isOpen={isOpen} onClose={onClosePopup} />
    </>
  )
}
