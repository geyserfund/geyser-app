import { Avatar, HStack, VStack } from '@chakra-ui/react'

import { Body } from '../../../../shared/components/typography'
import { UserMeFragment } from '../../../../types'
import { ProfileNavExternalAccountArray } from './ProfileNavExternalAccountArray'

export const ProfileNavUserInfo = ({ user }: { user: UserMeFragment }) => {
  return (
    <HStack spacing={2}>
      <Avatar src={user.imageUrl || ''} />
      <VStack flex={1} spacing={0}>
        <Body fontSize="xl" bold>
          {user.username}
        </Body>
        <ProfileNavExternalAccountArray externalAccounts={user.externalAccounts} />
      </VStack>
    </HStack>
  )
}
