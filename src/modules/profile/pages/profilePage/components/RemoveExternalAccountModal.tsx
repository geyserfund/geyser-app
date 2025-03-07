import { useTranslation } from 'react-i18next'

import { ExternalAccountType } from '@/modules/auth'
import { Body } from '@/shared/components/typography'
import { AlertDialogue } from '@/shared/molecules/AlertDialogue'

interface IDeleteConfirmModal {
  isOpen: boolean
  onClose: () => void
  confirm: () => any
  isLoading?: boolean

  type: string
}

export const RemoveExternalAccountModal = ({ isOpen, onClose, confirm, type, isLoading }: IDeleteConfirmModal) => {
  const { t } = useTranslation()

  const isNostr = type === ExternalAccountType.nostr
  return (
    <AlertDialogue
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      isCentered
      title={t(`Disconnect ${type}`)}
      description={`${isNostr ? t('Your badges are connected to this Nostr account.') : ''} ${t(
        `Are you sure you want to disconnect this account?`,
      )}`}
      hasCancel
      negativeButtonProps={{
        children: t('Disconnect'),
        onClick: confirm,
        isLoading,
      }}
    >
      {isNostr && (
        <Body size="sm" medium wordBreak="break-word">
          {t(
            'By disconnecting this Nostr account from your Geyser profile you will be able to connect a different Nostr account. However, you will be unable to create a new Geyser profile with this existing Nostr account.',
          )}
        </Body>
      )}
    </AlertDialogue>
  )
}
