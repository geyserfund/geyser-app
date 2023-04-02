import { useMutation } from '@apollo/client'
import { Box, Link, Tooltip } from '@chakra-ui/react'
import { nip19 } from 'nostr-tools'
import { useState } from 'react'

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
  const [copy, setCopy] = useState(false)

  const handleCopyPubkey = (npub: string) => {
    navigator.clipboard.writeText(npub)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 1000)
  }

  const { toast } = useNotification()
  const [unlinkAccount] = useMutation(MUTATION_UNLINK_ACCOUNT, {
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
  })

  const handleAccountDisconnect = () => {
    unlinkAccount({ variables: { id: toInt(account.id) } })
  }

  const isNostr = account.type === ExternalAccountType.nostr
  const isTwitter = account.type === ExternalAccountType.twitter

  if (isTwitter) {
    return (
      <ExternalAccountBody
        type={account.type as ExternalAccountType}
        username={account.externalUsername}
        handleDelete={isEdit ? handleAccountDisconnect : undefined}
        as={Link}
        href={`https://twitter.com/${account.externalUsername}`}
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
            handleDelete={isEdit ? handleAccountDisconnect : undefined}
            onClick={() => handleCopyPubkey(npub)}
            backgroundColor={copy ? 'brand.primary' : 'neutral.100'}
          />
        </Box>
      </Tooltip>
    )
  }

  return (
    <ExternalAccountBody
      type={account.type as ExternalAccountType}
      username={account.externalUsername}
      handleDelete={isEdit ? handleAccountDisconnect : undefined}
    />
  )
}
