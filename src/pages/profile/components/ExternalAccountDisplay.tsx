import { useMutation } from '@apollo/client'
import { Box, Link, Tooltip, useDisclosure } from '@chakra-ui/react'
import { nip19 } from 'nostr-tools'
import { useState } from 'react'

import { DeleteConfirmModal } from '../../../components/molecules'
import { MUTATION_UNLINK_ACCOUNT } from '../../../graphql'
import { ExternalAccount } from '../../../types'
import { toInt, useNotification } from '../../../utils'
import { ExternalAccountType } from '../../auth'
import { UserProfileState } from '../type'
import { ExternalAccountBody } from './ExternalAccountBody'

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

  const [copy, setCopy] = useState(false)

  const handleCopyPubkey = (npub: string) => {
    navigator.clipboard.writeText(npub)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 1000)
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

  const isNostr = account.type === ExternalAccountType.nostr
  const isTwitter = account.type === ExternalAccountType.twitter

  const renderExternalAccountBody = () => {
    if (isTwitter) {
      return (
        <ExternalAccountBody
          type={account.type as ExternalAccountType}
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
        <Tooltip label={copy ? 'copied!' : 'copy'} placement="top-start">
          <Box w="full">
            <ExternalAccountBody
              type={account.type as ExternalAccountType}
              username={npub}
              handleDelete={isEdit ? onOpen : undefined}
              onClick={() => handleCopyPubkey(npub)}
              backgroundColor={copy ? 'brand.primary' : 'neutral.100'}
              isLoading={unlinkAccountLoading}
            />
          </Box>
        </Tooltip>
      )
    }

    return (
      <ExternalAccountBody
        type={account.type as ExternalAccountType}
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
        <DeleteConfirmModal
          title={`Are you sure you want to disconnect your ${account.type} account ?`}
          description={`${account.externalUsername} will be removed from your geyser account.`}
          isOpen={isOpen}
          onClose={onClose}
          confirm={handleAccountDisconnect}
          isLoading={unlinkAccountLoading}
        />
      )}
    </>
  )
}
