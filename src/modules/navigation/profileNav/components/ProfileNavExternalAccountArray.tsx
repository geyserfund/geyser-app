import { HStack, IconButton } from '@chakra-ui/react'

import { ExternalAccountType } from '../../../../pages/auth'
import { externalAccountIconMap } from '../../../../shared/constants/platform/externalAccountIcons'
import { ExternalAccountFragment } from '../../../../types'

export const ProfileNavExternalAccountArray = ({
  externalAccounts,
}: {
  externalAccounts: ExternalAccountFragment[]
}) => {
  return (
    <HStack w="full" flexWrap={'wrap'}>
      {externalAccounts.map((account) => {
        return <ProfileExternalAccountIcon key={account.id} account={account} />
      })}
    </HStack>
  )
}

const ProfileExternalAccountIcon = ({ account }: { account: ExternalAccountFragment }) => {
  const Icon = externalAccountIconMap[account.accountType as ExternalAccountType]

  return (
    <IconButton
      borderRadius="4px"
      variant="solid"
      colorScheme="neutral1"
      aria-label={`${account.accountType}-icon`}
      icon={<Icon boxSize={3} width="14px" height="14px" />}
      overflow={'hidden'}
      maxHeight="20px"
      maxWidth={'20px'}
      minWidth="20px"
    />
  )
}
