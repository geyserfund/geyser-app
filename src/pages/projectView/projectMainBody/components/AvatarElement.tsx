import { Avatar, AvatarProps, Box, HStack, StackProps } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { Body2, BodyProps } from '../../../../components/typography'
import { Maybe, User } from '../../../../types/generated/graphql'
import { getRandomOrb } from '../../../../utils'

interface IAvatarElement extends AvatarProps {
  avatarOnly?: boolean
  user?: Maybe<Partial<User>>
  seed?: number
  wrapperProps?: StackProps
  noLink?: boolean
  textProps?: BodyProps
}

export const AvatarElement = ({
  avatarOnly = false,
  user,
  seed,
  wrapperProps,
  noLink,
  textProps,
  ...rest
}: IAvatarElement) => {
  const image = user?.imageUrl || getRandomOrb(seed || 1)

  const avatar = (
    <Avatar
      size="xs"
      borderRadius="4px"
      src={image}
      alt={user ? `user-${user.username}-avatar` : 'anonymous-avatar'}
      {...rest}
    />
  )

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
      <Body2 semiBold color="neutral.600" isTruncated {...textProps}>
        {user.username || 'Anonymous'}
      </Body2>
    </HStack>
  )
}

export const AvatarCircle = (props: AvatarProps) => (
  <Avatar size="xs" borderRadius="4px" {...props} />
)
