import { Button } from '@chakra-ui/react'

import { NostrSvgIcon } from '../../components/icons'
import { useNostrExtensonLogin } from '../../hooks/useNostrExtensionLogin'
type Props = {
  onClose?: () => void
}
export const ConnectWithNostr = ({ onClose }: Props) => {
  const { connect } = useNostrExtensonLogin()

  const handleClick = async () => {
    try {
      await connect()
    } catch (e) {
      // noop
    } finally {
      onClose?.()
    }
  }

  return (
    <>
      <Button
        w="100%"
        backgroundColor="brand.nostr"
        leftIcon={<NostrSvgIcon height="20px" width="20px" />}
        color="white"
        _hover={{}}
        onClick={() => handleClick()}
      >
        Nostr
      </Button>
    </>
  )
}
