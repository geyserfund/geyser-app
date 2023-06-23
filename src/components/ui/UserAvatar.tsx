import {
  Avatar,
  AvatarProps,
  Button,
  ButtonProps,
  Text,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { getPath } from '../../constants'
import { User } from '../../types'

type Props = {
  seed?: number
  user?: Pick<User, 'id' | 'imageUrl' | 'username'> | null
} & AvatarProps

export const UserAvatar = ({ user, seed, ...props }: Props) => {
  const image = user?.imageUrl || undefined
  return (
    <Avatar
      p={0}
      src={image}
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
      minWidth="initial"
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

export const UserAvatarButton = ({
  seed,
  avatarProps,
  user,
  ...props
}: Pick<Props, 'seed' | 'user'> & {
  avatarProps?: AvatarProps
} & ButtonProps) => {
  const avatar = (
    <UserAvatar size="2xs" seed={seed} user={user} {...avatarProps} />
  )

  if (user) {
    return (
      <Button
        justifyContent="start"
        variant="ghost"
        leftIcon={avatar}
        {...props}
      >
        <Text overflow="ellipsis" isTruncated>
          {user.username}
        </Text>
      </Button>
    )
  }

  return (
    <Button variant="ghost" {...props}>
      {avatar}
    </Button>
  )
}
