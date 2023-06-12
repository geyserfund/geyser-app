import { Avatar, AvatarProps, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { getPath } from '../../constants'
import { User } from '../../types'
import { getRandomOrb } from '../../utils'

type Props = {
  seed?: number
  user?: Pick<User, 'id' | 'imageUrl' | 'username'> | null
} & AvatarProps

export const UserAvatar = ({ user, seed, ...props }: Props) => {
  const navigate = useNavigate()
  const image = user?.imageUrl || getRandomOrb(seed || 1)
  return (
    <Avatar
      as={user ? Button : undefined}
      p={0}
      onClick={
        user ? () => navigate(getPath('userProfile', user.id)) : undefined
      }
      src={image}
      size="xs"
      alt={user ? `user-${user.username}-avatar` : 'anonymous-avatar'}
      {...props}
    />
  )
}
