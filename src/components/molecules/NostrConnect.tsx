import Icon from '@chakra-ui/icon'

import { useNostrExtensonLogin } from '../../hooks/useNostrExtensionLogin'
import { colors } from '../../styles'
import { NostrSvgIcon } from '../icons'
import { ButtonComponent } from '../ui'

type Props = {
  onClose?: () => void
}

export const NostrConnect = ({ onClose }: Props) => {
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
    <ButtonComponent
      w="full"
      standard
      backgroundColor={colors.nostr}
      _hover={{ backgroundColor: colors.nostrDark }}
      color={colors.textWhite}
      leftIcon={<Icon as={NostrSvgIcon} />}
      onClick={handleClick}
    >
      Nostr
    </ButtonComponent>
  )
}
