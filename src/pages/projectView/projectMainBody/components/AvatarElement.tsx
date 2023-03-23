import { Avatar, AvatarProps, Box, HStack, StackProps } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { Body2 } from '../../../../components/typography'
import { User } from '../../../../types/generated/graphql'

interface IAvatarElement extends AvatarProps {
  avatarOnly?: boolean
  user: User
  wrapperProps?: StackProps
  noLink?: BooleanConstructor
}

export const AvatarElement = ({
  avatarOnly = false,
  user,
  wrapperProps,
  noLink,
  ...rest
}: IAvatarElement) => {
  const avatar = <AvatarCircle src={`${user.imageUrl}`} {...rest} />

  if (avatarOnly) {
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

export const AvatarCircle = (props: AvatarProps) => (
  <Avatar size="xs" borderRadius="4px" {...props} />
)
