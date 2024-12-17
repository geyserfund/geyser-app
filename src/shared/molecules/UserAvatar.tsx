import { Avatar, AvatarProps } from '@chakra-ui/react'

import { UserAvatarFragment } from '@/types'
import { getRandomAvatar, toInt } from '@/utils'

import { ProfileAvatar } from '../components/display/ProfileAvatar'

type UserAvatarProps = {
  id?: number | string
  user?: UserAvatarFragment | null
} & AvatarProps

export const UserAvatar = ({ id, user, ...props }: UserAvatarProps) => {
  if (user) {
    return (
      <ProfileAvatar
        guardian={user.guardianType}
        height="40px"
        width="40px"
        src={user.imageUrl || ''}
        aria-label={user.username}
        {...props}
      />
    )
  }

  if (id) {
    return <Avatar height="40px" width="40px" src={getRandomAvatar(toInt(`${id}`))} {...props} />
  }

  return null
}
