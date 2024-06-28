import { Avatar } from '@chakra-ui/react'

import { UserAvatarFragment } from '@/types'
import { getRandomOrb, toInt } from '@/utils'

export const UserAvatar = ({ id, user }: { id?: number | string; user?: UserAvatarFragment | null }) => {
  if (user) {
    return <Avatar height="40px" width="40px" src={user.imageUrl || ''} aria-label={user.username} />
  }

  if (id) {
    return <Avatar height="40px" width="40px" src={getRandomOrb(toInt(`${id}`))} />
  }

  return null
}
