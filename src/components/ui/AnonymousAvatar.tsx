import React from 'react';
import { Avatar, Box, Text, HStack } from '@chakra-ui/react';
import { getRandomOrb } from '../../utils';

export const AnonymousAvatar = ({
  seed,
  image,
}: {
  seed: number;
  image?: string;
}) => (
  <HStack spacing="5px" display="flex">
    <Avatar
      icon={
        <Box
          width="30px"
          height="30px"
          borderRadius="50%"
          backgroundColor="brand.gray50"
        />
      }
      width="30px"
      height="3	0px"
      name={'Anonymous'}
      src={image ? image : getRandomOrb(seed)}
      sx={{
        '& .chakra-avatar__initials': {
          lineHeight: '30px',
        },
      }}
    />
    <Text fontSize="16px"> {''}</Text>
  </HStack>
);
