import React, { ReactElement } from 'react';
import { Text, HStack, Box, Link } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/react';
import { IAvatarMetadata } from '../../interfaces';
import { isMediumScreen, isMobileMode } from '../../utils';
import { useHistory } from 'react-router';

interface ILinkableAvatar {
  avatarMetadata: IAvatarMetadata;
  badges?: ReactElement[];
}

export const LinkableAvatar = ({ avatarMetadata, badges }: ILinkableAvatar) => {
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
          width="30px"
          height="30px"
          src={avatarMetadata.image}
          icon={
            <Box
              width="30px"
              height="30px"
              borderRadius="50%"
              backgroundColor="brand.gray50"
            />
          }
          sx={{
            '& .chakra-avatar__initials': {
              lineHeight: '30px',
            },
          }}
          _focus={{}}
        />
        <Text
          fontSize="16px"
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
