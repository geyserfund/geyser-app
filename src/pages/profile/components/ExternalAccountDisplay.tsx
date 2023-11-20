import { useMutation } from '@apollo/client'
import { Link, useDisclosure } from '@chakra-ui/react'
import { nip19 } from 'nostr-tools'

import { MUTATION_UNLINK_ACCOUNT } from '../../../graphql'
import { ExternalAccount } from '../../../types'
import { copyTextToClipboard, toInt, useNotification } from '../../../utils'
import { ExternalAccountType } from '../../auth'
import { UserProfileState } from '../type'
import {
  ExternalAccountBody,
  ExternalAccountBodyProps,
} from './ExternalAccountBody'
import { RemoveExternalAccountModal } from './RemoveExternalAccountModal'

interface ExternalAccountDisplayProps extends UserProfileState {
  account: ExternalAccount
  isEdit?: boolean
}

export const ExternalAccountDisplay = ({
  account,
  isEdit,
  userProfile,
  setUserProfile,
}: ExternalAccountDisplayProps) => {
  const { toast } = useNotification()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleCopyPubkey = (npub: string) => {
    copyTextToClipboard(npub)
  }

  const [unlinkAccount, { loading: unlinkAccountLoading }] = useMutation(
    MUTATION_UNLINK_ACCOUNT,
    {
      onError(error) {
        toast({
          title: 'Failed to unlink account',
          description: `${error.message}`,
          status: 'error',
        })
      },
      onCompleted(data) {
        setUserProfile({ ...userProfile, ...data.unlinkExternalAccount })
      },
    },
  )

  const handleAccountDisconnect = () => {
    unlinkAccount({ variables: { id: toInt(account.id) } })
  }

  const isNostr = account.accountType === ExternalAccountType.nostr

  const renderExternalAccountBody = () => {
    let props: ExternalAccountBodyProps = {
      type: account.accountType as ExternalAccountType,
      username: account.externalUsername,
      handleDelete: isEdit ? onOpen : undefined,
      isLoading: unlinkAccountLoading,
    }

    switch (account.accountType) {
      case ExternalAccountType.nostr:
        props = {
          ...props,
          username: nip19.npubEncode(account.externalId),
          handleCopy: () =>
            handleCopyPubkey(nip19.npubEncode(account.externalId)),
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
        return null
      default:
        break
    }

    return <ExternalAccountBody {...props} />
  }

  return (
    <>
      {renderExternalAccountBody()}
      {isEdit && (
        <RemoveExternalAccountModal
          isOpen={isOpen}
          onClose={onClose}
          isNostr={isNostr}
          confirm={handleAccountDisconnect}
          isLoading={unlinkAccountLoading}
        />
      )}
    </>
  )
}
