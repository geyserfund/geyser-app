import { Button } from '@chakra-ui/react'
import { useEffect } from 'react'

import { NostrSvgIcon } from '../../components/icons'
import { useModal } from '../../hooks/useModal'
import { useNostrExtensonLogin } from '../../hooks/useNostrExtensionLogin'
import { isAccountDuplicateError } from '../../utils'
import { FailedToConnectAccount } from './components/FailedToConnectAccount'
import { NostrHelpModal } from './components/NostrHelpModal'
type Props = {
  onClose?: () => void
}
export const ConnectWithNostr = ({ onClose }: Props) => {
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

  return (
    <>
      <Button
        w="100%"
        backgroundColor="brand.nostr"
        leftIcon={<NostrSvgIcon height="20px" width="20px" />}
        color="white"
        _hover={{ backgroundColor: 'brand.nostrDark' }}
        onClick={handleClick}
      >
        Nostr
      </Button>
      <NostrHelpModal {...nostrHelpModal} />
      <FailedToConnectAccount {...failedModal} />
    </>
  )
}
