import { Avatar, AvatarProps, HStack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { User } from '../../../types/generated/graphql'

interface IAvatarElement extends AvatarProps {
  user: User
}

export const AvatarElement = ({ user, ...rest }: IAvatarElement) => (
  <Link to={`/profile/${user.id}`}>
    <HStack>
      <Avatar size="xs" borderRadius="4px" src={`${user.imageUrl}`} {...rest} />
      <Text color="brand.neutral600">{user.username}</Text>
    </HStack>
  </Link>
)
