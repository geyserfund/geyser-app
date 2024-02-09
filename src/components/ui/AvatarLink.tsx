import { Avatar, HStack } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { toSmallImageUrl } from '../../utils'
import { Body2 } from '../typography'

type Props = {
  textColor?: string
  title: string
  path: string
  imageSrc: string
  rounded?: boolean
}

export const AvatarLink = ({ title, path, imageSrc, textColor = 'neutral.700', rounded }: Props) => {
  const avatarSrc = toSmallImageUrl(imageSrc)

  return (
    <HStack as={ReactRouterLink} to={path} color={textColor} spacing={1} w="full" overflow="hidden">
      <Avatar borderRadius={rounded ? '50%' : '4px'} src={avatarSrc} boxSize={'1em'} />
      <Body2 semiBold isTruncated _hover={{ textDecoration: 'underline' }}>
        {title}
      </Body2>
    </HStack>
  )
}
