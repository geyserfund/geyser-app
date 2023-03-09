import { Avatar, AvatarProps, HStack, StackProps } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { Body2 } from '../../../../components/typography'
import { User } from '../../../../types/generated/graphql'

interface IAvatarElement extends AvatarProps {
  user: User
  wrapperProps?: StackProps
  noLink?: boolean
}

export const AvatarElement = ({
  user,
  wrapperProps,
  noLink,
  ...rest
}: IAvatarElement) => (
  <HStack
    as={noLink ? 'div' : Link}
    to={`/profile/${user.id}`}
    overflow="hidden"
    _hover={noLink ? {} : { textDecoration: 'underline', fontWeight: 500 }}
    {...wrapperProps}
  >
    <Avatar size="xs" borderRadius="4px" src={`${user.imageUrl}`} {...rest} />
    <Body2 semiBold color="brand.neutral600" isTruncated>
      {user.username}
    </Body2>
  </HStack>
)
