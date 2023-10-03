import { Avatar, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { useContext } from 'react'

import { AuthContext } from '../../../context'

export const NavBarUserProfileMenuItem = () => {
  const { user } = useContext(AuthContext)

  return (
    <VStack spacing={2} padding={4} alignItems="flex-start" width="100%">
      <Text
        textTransform={'uppercase'}
        fontSize="xs"
        fontWeight={'bold'}
        color={'neutral.500'}
      >
        Profile
      </Text>

      <HStack spacing={1} overflow={'hidden'} width={'full'}>
        <Avatar height="22px" width="22px" src={user.imageUrl || ''} />

        <Heading fontWeight={600} fontSize="16px" as={'h6'} isTruncated>
          {user.username}
        </Heading>
      </HStack>
    </VStack>
  )
}
