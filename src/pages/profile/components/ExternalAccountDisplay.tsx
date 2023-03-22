import { useMutation } from '@apollo/client'
import { Box, Link, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'

import { useAuthContext } from '../../../context'
import { MUTATION_UNLINK_ACCOUNT } from '../../../graphql'
import { ExternalAccount } from '../../../types'
import { toInt, useNotification } from '../../../utils'
import { ExternalAccountType } from '../../auth'
import { ExternalAccountBody } from './ExternalAccountBody'

interface ExternalAccountDisplayProps {
  account: ExternalAccount
  isEdit?: boolean
}

export const ExternalAccountDisplay = ({
  account,
  isEdit,
}: ExternalAccountDisplayProps) => {
  const [copy, setCopy] = useState(false)

  const handleCopyPubkey = () => {
    navigator.clipboard.writeText(account.externalId)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 1000)
  }

  const { setUser, user } = useAuthContext()
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
      setUser({ ...user, ...data.unlinkExternalAccount })
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
        account={account}
        handleDelete={isEdit ? handleAccountDisconnect : undefined}
        as={Link}
        href={`https://twitter.com/${account.externalUsername}`}
        isExternal
      />
    )
  }

  if (isNostr) {
    return (
      <Tooltip label={copy ? 'copied!' : 'copy'} placement="top-start">
        <Box w="full">
          <ExternalAccountBody
            account={account}
            handleDelete={isEdit ? handleAccountDisconnect : undefined}
            onClick={handleCopyPubkey}
            backgroundColor={copy ? 'primary.200' : 'neutral.100'}
          />
        </Box>
      </Tooltip>
    )
  }

  return (
    <ExternalAccountBody
      account={account}
      handleDelete={isEdit ? handleAccountDisconnect : undefined}
    />
  )
}
