import { Box, Button, IconButton } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

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

  const { t } = useTranslation()

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
        variant="login"
        color={'social.nostr'}
        onClick={handleClick}
        {...buttonProps}
        {...rest}
      >
        {!isIconOnly && (
          <Box as="span" color="neutral.900">
            {t('Continue with Nostr')}
          </Box>
        )}
      </ButtonComponent>
      <NostrHelpModal {...nostrHelpModal} />
      <FailedToConnectAccount {...failedModal} />
    </>
  )
}
