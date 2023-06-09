import { Avatar, AvatarProps } from '@chakra-ui/react'

import { User } from '../../types'
import { getRandomOrb } from '../../utils'

type Props = {
  seed?: number
  user?: Pick<User, 'id' | 'imageUrl' | 'username'> | null
} & AvatarProps

export const UserAvatar = ({ user, seed, ...props }: Props) => {
  const image = user?.imageUrl || getRandomOrb(seed || 1)
  return (
    <Avatar
      src={image}
      size="xs"
      alt={user ? `user-${user.username}-avatar` : 'anonymous-avatar'}
      {...props}
    />
  )
}
