import { useMutation } from '@apollo/client'
import { Link, useDisclosure } from '@chakra-ui/react'
import { nip19 } from 'nostr-tools'

import { MUTATION_UNLINK_ACCOUNT } from '../../../graphql'
import { ExternalAccount } from '../../../types'
import { copyTextToClipboard, toInt, useNotification } from '../../../utils'
import { ExternalAccountType } from '../../auth'
import { UserProfileState } from '../type'
import { ExternalAccountBody } from './ExternalAccountBody'
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
  const isTwitter = account.accountType === ExternalAccountType.twitter

  const renderExternalAccountBody = () => {
    if (isTwitter) {
      return (
        <ExternalAccountBody
          type={account.accountType as ExternalAccountType}
          username={account.externalUsername}
          handleDelete={isEdit ? onOpen : undefined}
          as={Link}
          href={`https://twitter.com/${account.externalUsername}`}
          isLoading={unlinkAccountLoading}
          isExternal
        />
      )
    }

    if (isNostr) {
      const npub = nip19.npubEncode(account.externalId)
      return (
        <ExternalAccountBody
          type={account.accountType as ExternalAccountType}
          username={npub}
          handleDelete={isEdit ? onOpen : undefined}
          handleCopy={() => handleCopyPubkey(npub)}
          isLoading={unlinkAccountLoading}
        />
      )
    }

    return (
      <ExternalAccountBody
        type={account.accountType as ExternalAccountType}
        username={account.externalUsername}
        handleDelete={isEdit ? onOpen : undefined}
        isLoading={unlinkAccountLoading}
      />
    )
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
