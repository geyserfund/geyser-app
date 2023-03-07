import { Avatar, HStack, Link } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { toSmallImageUrl } from '../../utils'
import { Body2 } from '../typography'

type Props = {
  textColor?: string
  title: string
  path: string
  imageSrc: string
}

export const AvatarLink = ({
  title,
  path,
  imageSrc,
  textColor = 'brand.neutral700',
}: Props) => {
  const avatarSrc = toSmallImageUrl(imageSrc)

  return (
    <Link as={ReactRouterLink} to={path} color={textColor}>
      <HStack spacing={1}>
        <Avatar borderRadius="4px" src={avatarSrc} boxSize={'1em'} />
        <Body2 semiBold isTruncated _hover={{ textDecoration: 'underline' }}>
          {title}
        </Body2>
      </HStack>
    </Link>
  )
}
