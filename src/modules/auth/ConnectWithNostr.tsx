import { Button, IconButton } from '@chakra-ui/react'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { NostrIcon } from '@/shared/components/icons'

import { useModal } from '../../shared/hooks/useModal'
import { isAccountDuplicateError } from '../../utils'
import { FailedToConnectAccount } from './components/FailedToConnectAccount'
import { LastUsedBadge } from './components/LastUsedBadge'
import { NostrHelpModal } from './components/NostrHelpModal'
import { useNostrExtensonLogin } from './hooks/useNostrExtensionLogin'
import { lastAuthMethodAtom, loginMethodAtom } from './state'
import { AuthFlowIntent, ConnectWithButtonProps, ExternalAccountType } from './type'

export const ConnectWithNostr = ({
  onClose,
  isIconOnly,
  showLastUsed = true,
  authFlowIntent = AuthFlowIntent.login,
  ...rest
}: Omit<ConnectWithButtonProps, 'accountType'>) => {
  const setLoginMethod = useSetAtom(loginMethodAtom)
  const setLastAuthMethod = useSetAtom(lastAuthMethodAtom)
  const lastAuthMethod = useAtomValue(lastAuthMethodAtom)

  const { connect, error, clearError } = useNostrExtensonLogin()

  const { t } = useTranslation()

  const failedModal = useModal()
  const nostrHelpModal = useModal()

  const handleClick = async () => {
    if (!window.nostr) {
      return nostrHelpModal.onOpen()
    }

    const connected = await connect(authFlowIntent)
    if (!connected) return

    setLoginMethod(ExternalAccountType.nostr)
    setLastAuthMethod(ExternalAccountType.nostr)
    onClose?.()
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
        icon: <NostrIcon boxSize={'16px'} />,
      }
    : {
        leftIcon: <NostrIcon boxSize={'16px'} />,
      }

  if (!window.nostr) {
    return null
  }

  return (
    <>
      <ButtonComponent
        aria-label="Connect with Nostr"
        size="lg"
        variant="solid"
        colorScheme="violet"
        onClick={handleClick}
        {...buttonProps}
        {...rest}
      >
        {!isIconOnly && (rest.children || t('Nostr'))}
        {!isIconOnly && showLastUsed && lastAuthMethod === ExternalAccountType.nostr && <LastUsedBadge />}
      </ButtonComponent>
      <NostrHelpModal {...nostrHelpModal} />
      <FailedToConnectAccount {...failedModal} />
    </>
  )
}
