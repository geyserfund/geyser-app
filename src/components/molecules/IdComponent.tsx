import { Avatar } from '@chakra-ui/avatar';
import { HStack, Text, Box } from '@chakra-ui/layout';
import React from 'react';

export interface IIdComponent {
  URL: string;
  username: string;
  fullName: string;
  twitter: boolean;
}

export const IdComponent = ({ URL, username, fullName }: IIdComponent) => (
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
      height="30px"
      name={fullName}
      src={URL}
      sx={{
        '& .chakra-avatar__initials': {
          lineHeight: '30px',
        },
      }}
    />
    <Text> {username}</Text>
  </HStack>
);
