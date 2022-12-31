import React from 'react';

import { Box, Text, Avatar, WrapItem, Center, Link } from '@chakra-ui/react';

interface BitcoinersProp {
  image: string;
  name: string;
  role?: string;
  link: string;
}

export const BitcoinerCard = ({ image, name, role, link }: BitcoinersProp) => {
  return (
    <Link href={link} isExternal style={{ textDecoration: 'none' }}>
      <WrapItem>
        <Center>
          <Box
            boxShadow={'sm'}
            display="flex"
            p="2"
            width={'165px'}
            height={'142px'}
            alignItems={'center'}
            justifyContent="center"
            flexDirection="column"
            _hover={{ shadow: 'lg' }}
            transition="box-shadow ease-out 0.3s"
            borderRadius="4px"
            border="1px solid"
            borderColor="brand.neutral100"
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
