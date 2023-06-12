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
  const image = user?.imageUrl || getRandomOrb(seed || 1)
  return (
    <Avatar
      p={0}
      src={image}
      size="xs"
      alt={user ? `user-${user.username}-avatar` : 'anonymous-avatar'}
      {...props}
    />
  )
}

export const UserAvatarWithLink = ({ ...props }: Props) => {
  const navigate = useNavigate()
  return (
    <UserAvatar
      as={props.user ? Button : undefined}
      p={0}
      onClick={
        props.user
          ? () => navigate(getPath('userProfile', props.user?.id))
          : undefined
      }
      {...props}
    />
  )
}
