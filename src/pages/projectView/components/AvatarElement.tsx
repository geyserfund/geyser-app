import { Avatar, HStack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { User } from '../../../types/generated/graphql'

interface IAvatarElement {
  user: User
}

export const AvatarElement = ({ user }: IAvatarElement) => (
  <Link to={`/profile/${user.id}`}>
    <HStack>
      <Avatar size="xs" borderRadius="4px" src={`${user.imageUrl}`} />
      <Text color="brand.neutral600">{user.username}</Text>
    </HStack>
  </Link>
)
