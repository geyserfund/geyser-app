import React, { ReactElement } from 'react';
import { Text, HStack, Link } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/react';
import { IAvatarMetadata } from '../../interfaces';
import { isMediumScreen, isMobileMode } from '../../utils';
import { useHistory } from 'react-router';
import { FaUser } from 'react-icons/fa';

type Props = {
  avatarMetadata: IAvatarMetadata;
  badges?: ReactElement[];
  textColor?: string;
  fontSize?: number | string;
  imageSize?: number | string;
};

export const LinkableAvatar = ({
  avatarMetadata,
  badges,
  textColor,
  fontSize = '16px',
  imageSize = '30px',
}: Props) => {
  const isMedium = isMediumScreen();
  const isMobile = isMobileMode();
  const history = useHistory();

  const calculateBadgesLength = () => {
    if (!badges) {
      return 0;
    }

    return badges.reduce(
      (length, element) => length + element.props.badge.length,
      0,
    );
  };

  const getFormattedUsername = () => {
    if (!avatarMetadata.username) {
      return;
    }

    if (
      (badges &&
        badges.length === 0 &&
        avatarMetadata.username.length > (isMedium ? 12 : 21)) ||
      (!badges && avatarMetadata.username.length > (isMedium ? 12 : 21))
    ) {
      return `${avatarMetadata.username.slice(0, isMedium ? 10 : 19)}...`;
    }

    if (badges && badges.length >= (isMobile ? 2 : isMedium ? 1 : 3)) {
      return;
    }

    if (
      badges &&
      badges.length &&
      avatarMetadata.username.length + calculateBadgesLength() >
        (isMedium ? 13 : 21)
    ) {
      return `${avatarMetadata.username.slice(0, isMedium ? 3 : 6)}...`;
    }

    return avatarMetadata.username;
  };

  return (
    <Link
      color={textColor}
      isExternal={Boolean(
        avatarMetadata.link && avatarMetadata.link.includes('https'),
      )}
      href={avatarMetadata.link || ''}
      onClick={(e) => {
        if (avatarMetadata.link && !avatarMetadata.link.includes('https')) {
          e.preventDefault();
          history.push(avatarMetadata.link);
        }
      }}
    >
      <HStack
        spacing="5px"
        display="flex"
        cursor={avatarMetadata.link ? 'pointer' : 'normal'}
      >
        <Avatar
          width={imageSize}
          height={imageSize}
          scale={0.8}
          backgroundColor="transparent"
          name={'Anonymous'}
          src={avatarMetadata.image}
          sx={{
            '& .chakra-avatar__initials': {
              lineHeight: `${imageSize}`,
            },
          }}
          icon={<FaUser fontSize="2rem" />}
        />
        <Text
          fontSize={fontSize}
          _hover={{ fontWeight: 500, textDecoration: 'underline' }}
        >
          {' '}
          {getFormattedUsername()}
        </Text>
        {badges}
      </HStack>
    </Link>
  );
};
