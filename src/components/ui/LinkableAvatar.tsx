import { HStack, Link } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/react'
import { ReactElement } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link as ReactRouterLink } from 'react-router-dom'

import { getPath } from '../../constants'
import { useMediumScreen, useMobileMode } from '../../utils'
import { Body2 } from '../typography'

type Props = {
  avatarUsername: string
  userProfileID: string
  imageSrc: string
  textColor?: string
  badgeElements?: ReactElement[]
  badgeNames?: string[]
  fontSize?: number | string
  imageSize?: number | string
  showFullUsername?: boolean
}

export const LinkableAvatar = ({
  avatarUsername,
  userProfileID,
  imageSrc,
  textColor,
  badgeNames,
  badgeElements,
  fontSize,
  imageSize = '30px',
  showFullUsername,
}: Props) => {
  const isMedium = useMediumScreen()
  const isMobile = useMobileMode()

  const calculateBadgesLength = () => {
    if (!badgeNames) {
      return 0
    }

    return badgeNames.reduce((accumulatedLength, badgeName) => {
      return accumulatedLength + badgeName.length
    }, 0)
  }

  const getFormattedUsername = () => {
    if (!avatarUsername) {
      return
    }

    if (showFullUsername) {
      return avatarUsername
    }

    if (
      (badgeElements &&
        badgeElements.length === 0 &&
        avatarUsername.length > (isMedium ? 12 : 21)) ||
      (!badgeElements && avatarUsername.length > (isMedium ? 12 : 21))
    ) {
      return `${avatarUsername.slice(0, isMedium ? 10 : 19)}...`
    }

    if (
      badgeElements &&
      badgeElements.length >= (isMobile ? 2 : isMedium ? 1 : 3)
    ) {
      return
    }

    if (
      badgeElements &&
      badgeElements.length &&
      avatarUsername.length + calculateBadgesLength() > (isMedium ? 13 : 21)
    ) {
      return `${avatarUsername.slice(0, isMedium ? 3 : 6)}...`
    }

    return avatarUsername
  }

  return (
    <Link
      as={ReactRouterLink}
      pointerEvents={userProfileID ? 'all' : 'none'}
      to={userProfileID ? getPath('userProfile', userProfileID) : '/'}
      color={textColor}
      _hover={{ textDecoration: 'none' }}
      _active={{ textDecoration: 'none' }}
      _focus={{ textDecoration: 'none' }}
    >
      <HStack spacing="5px" display="flex">
        <Avatar
          width={imageSize}
          height={imageSize}
          scale={0.8}
          backgroundColor="transparent"
          src={imageSrc}
          sx={{
            '& .chakra-avatar__initials': {
              lineHeight: `${imageSize}`,
            },
          }}
          color="neutral.600"
          icon={<FaUserCircle fontSize="25px" size={'1em'} />}
        />

        <Body2
          fontSize={fontSize}
          semiBold
          _hover={{ textDecoration: 'underline' }}
        >
          {' '}
          {getFormattedUsername()}
        </Body2>

        {badgeElements}
      </HStack>
    </Link>
  )
}
