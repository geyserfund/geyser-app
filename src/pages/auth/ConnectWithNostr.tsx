import { Button, IconButton } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { NostrSvgIcon } from '../../components/icons'
import { useModal } from '../../shared/hooks/useModal'
import { useNostrExtensonLogin } from '../../shared/hooks/useNostrExtensionLogin'
import { isAccountDuplicateError, useCustomTheme } from '../../utils'
import { FailedToConnectAccount } from './components/FailedToConnectAccount'
import { NostrHelpModal } from './components/NostrHelpModal'
import { loginMethodAtom } from './state'
import { ConnectWithButtonProps, ExternalAccountType } from './type'
import { useAuthToken, useCanLogin } from './useAuthToken'

export const ConnectWithNostr = ({ onClose, isIconOnly, ...rest }: Omit<ConnectWithButtonProps, 'accountType'>) => {
  useAuthToken()

  const canLogin = useCanLogin()

  const { colors } = useCustomTheme()

  const setLoginMethod = useSetAtom(loginMethodAtom)

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
      setLoginMethod(ExternalAccountType.nostr)
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
        icon: <NostrSvgIcon color={colors.social.nostr} boxSize={'16px'} />,
      }
    : {
        leftIcon: <NostrSvgIcon color={colors.social.nostr} boxSize={'16px'} />,
      }

  return (
    <>
      <ButtonComponent
        aria-label="Connect with Nostr"
        size="lg"
        variant="outline"
        colorScheme="neutral1"
        onClick={handleClick}
        isDisabled={!canLogin}
        {...buttonProps}
        {...rest}
      >
        {!isIconOnly && t('Continue with Nostr')}
      </ButtonComponent>
      <NostrHelpModal {...nostrHelpModal} />
      <FailedToConnectAccount {...failedModal} />
    </>
  )
}
