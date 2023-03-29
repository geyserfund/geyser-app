import { Avatar, AvatarProps, Box, HStack, StackProps } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { Body2 } from '../../../../components/typography'
import { Maybe, User } from '../../../../types/generated/graphql'
import { getRandomOrb } from '../../../../utils'

interface IAvatarElement extends AvatarProps {
  avatarOnly?: boolean
  user: Maybe<User>
  seed?: number
  wrapperProps?: StackProps
  noLink?: boolean
}

export const AvatarElement = ({
  avatarOnly = false,
  user,
  seed,
  wrapperProps,
  noLink,
  ...rest
}: IAvatarElement) => {
  const image = user?.imageUrl || getRandomOrb(seed || 1)

  const avatar = <Avatar size="xs" borderRadius="4px" src={image} {...rest} />

  if (avatarOnly || !user) {
    return <Box {...wrapperProps}>{avatar}</Box>
  }

  return (
    <HStack
      as={noLink ? 'div' : Link}
      to={`/profile/${user.id}`}
      overflow="hidden"
      _hover={noLink ? {} : { textDecoration: 'underline', fontWeight: 500 }}
      {...wrapperProps}
    >
      {avatar}
      <Body2 semiBold color="brand.neutral600" isTruncated>
        {user.username}
      </Body2>
    </HStack>
  )
}
