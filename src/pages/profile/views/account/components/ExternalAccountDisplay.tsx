import { Link, useDisclosure } from '@chakra-ui/react'
import { nip19 } from 'nostr-tools'
import { useCallback } from 'react'

import { ExternalAccountFragment } from '../../../../../types'
import { copyTextToClipboard, toInt, useNotification } from '../../../../../utils'
import { ExternalAccountType } from '../../../../auth'
import { RemoveExternalAccountModal } from '../../../components/RemoveExternalAccountModal'
import { useViewingOwnProfileAtomValue } from '../../../state'
import { useAccountUnlink } from '../hooks/useAccountUnlink'
import { ExternalAccountBody, ExternalAccountBodyProps } from './ExternalAccountBody'

interface ExternalAccountDisplayProps {
  account: ExternalAccountFragment
}

export const ExternalAccountDisplay = ({ account }: ExternalAccountDisplayProps) => {
  const { toast } = useNotification()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const isViewingOwnProfile = useViewingOwnProfileAtomValue()

  const { isLoading, handleAccountUnlink, isEdit } = useAccountUnlink({
    accountId: toInt(account.id),
    accountType: account.accountType as ExternalAccountType,
    mutationProps: {
      onError(error) {
        toast({
          title: 'Failed to unlink account',
          description: `${error.message}`,
          status: 'error',
        })
      },
    },
  })

  const handleCopyPubkey = useCallback((npub: string) => {
    copyTextToClipboard(npub)
  }, [])

  const isNostr = account.accountType === ExternalAccountType.nostr

  const renderExternalAccountBody = useCallback(() => {
    let props: ExternalAccountBodyProps = {
      type: account.accountType as ExternalAccountType,
      username: account.externalUsername,
      handleDelete: isEdit ? onOpen : undefined,
      isLoading,
    }

    switch (account.accountType) {
      case ExternalAccountType.nostr:
        props = {
          ...props,
          username: nip19.npubEncode(account.externalId),
          handleCopy: () => handleCopyPubkey(nip19.npubEncode(account.externalId)),
        }
        break
      case ExternalAccountType.twitter:
        props = {
          ...props,
          as: Link,
          href: `https://twitter.com/${account.externalUsername}`,
          isExternal: true,
        }
        break
      case ExternalAccountType.google:
        props = {
          ...props,
          isExternal: true,
          username: '',
        }
        break
      case ExternalAccountType.lightning:
        props = {
          ...props,
          isExternal: true,
          username: isViewingOwnProfile ? account.externalId : '',
        }
        break
      case ExternalAccountType.facebook:
        props = {
          ...props,
          as: Link,
          href: `https://facebook.com/${account.externalUsername}`,
          isExternal: true,
        }
        break
      default:
        break
    }

    return <ExternalAccountBody {...props} />
  }, [account, handleCopyPubkey, isLoading, isEdit, onOpen, isViewingOwnProfile])

  return (
    <>
      {renderExternalAccountBody()}
      {isEdit && (
        <RemoveExternalAccountModal
          isOpen={isOpen}
          onClose={onClose}
          isNostr={isNostr}
          confirm={handleAccountUnlink}
          isLoading={isLoading}
        />
      )}
    </>
  )
}
