import { Avatar, Stack } from '@chakra-ui/react'

import { getRandomOrb } from '../../utils'
import { UserSkeleton } from './UserSkeleton'

type Props = {
  seed: number
  image?: string
  imageSize?: number | string
  textColor?: string
}

export const AnonymousAvatar = ({
  seed,
  image,
  textColor,
  imageSize = '30px',
}: Props) => (
  <Stack
    width={imageSize}
    height={imageSize}
    borderRadius="50%"
    align="center"
    justify="center"
    p={'4px'}
    backgroundColor="neutral.100"
  >
    <Avatar
      width={imageSize}
      height={imageSize}
      scale={0.8}
      backgroundColor="transparent"
      name={'Anonymous'}
      src={image ? image : getRandomOrb(seed)}
      sx={{
        '& .chakra-avatar__initials': {
          lineHeight: `${imageSize}`,
        },
      }}
      color={textColor}
      icon={<UserSkeleton />}
    />
  </Stack>
)
