import React from 'react';

import { isMobileMode } from '../../../utils';

import {
  Grid,
  GridItem,
  Box,
  Text,
  Avatar,
  Wrap,
  WrapItem,
  Center,
  Link,
} from '@chakra-ui/react';

interface BitcoinersProp {
  image: string;
  name: string;
  role?: string;
  link: string;
}

export const BitcoinerCard = ({ image, name, role, link }: BitcoinersProp) => {
  const isMobile = isMobileMode();
  return (
    <Link href={link} isExternal style={{ textDecoration: 'none' }}>
      <WrapItem>
        <Center>
          <Box
            boxShadow={'md'}
            display="flex"
            p="2"
            width={'165px'}
            height={'142px'}
            alignItems={'center'}
            justifyContent="center"
            flexDirection="column"
          >
            <Box width={'60px'} height="60px" rounded={'full'}>
              <Avatar src={image} size="full" />
            </Box>
            <Text fontWeight={'700'} fontSize="15px" mt={2}>
              {name}
            </Text>
            <Text fontWeight={'700'} fontSize="15px" mt={2}>
              {role}
            </Text>
          </Box>
        </Center>
      </WrapItem>
    </Link>
  );
};
