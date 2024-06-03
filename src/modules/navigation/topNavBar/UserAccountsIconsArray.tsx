import { HStack, IconButton } from '@chakra-ui/react'

import { ExternalAccountType } from '../../../pages/auth'
import { ExternalAccountFragment } from '../../../types'
import { externalAccountIconMap } from '../constant/externalAccountIcons'

export const UserAccountsIconsArray = ({ externalAccounts }: { externalAccounts: ExternalAccountFragment[] }) => {
  return (
    <HStack w="full" flexWrap={'wrap'}>
      {externalAccounts.map((account) => {
        return <UserAccountsIcons key={account.id} account={account} />
      })}
    </HStack>
  )
}

const UserAccountsIcons = ({ account }: { account: ExternalAccountFragment }) => {
  const Icon = externalAccountIconMap[account.accountType as ExternalAccountType]
  return (
    <IconButton
      size="sm"
      borderRadius="4px"
      variant="solid"
      colorScheme="neutral1"
      aria-label={`${account.accountType}-icon`}
      icon={<Icon boxSize={4} width="16px" height="16px" />}
      overflow={'hidden'}
    />
  )
}
