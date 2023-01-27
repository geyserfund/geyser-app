import { Avatar } from '@chakra-ui/avatar'
import { HStack, Text } from '@chakra-ui/layout'

import { UserSkeleton } from '../ui'

export interface IIdComponent {
  URL: string
  username: string
  fullName: string
  twitter: boolean
}

export const IdComponent = ({ URL, username, fullName }: IIdComponent) => (
  <HStack spacing="5px" display="flex">
    <Avatar
      icon={<UserSkeleton />}
      width="30px"
      height="30px"
      name={fullName}
      src={URL}
      sx={{
        '& .chakra-avatar__initials': {
          lineHeight: '30px',
        },
      }}
    />
    <Text> {username}</Text>
  </HStack>
)
