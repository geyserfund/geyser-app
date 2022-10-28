import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { FaPodcast, FaTelegram, FaTwitter } from 'react-icons/fa';

export const GrantFooter = () => {
  return (
    <Box
      bg="brand.primary50"
      minWidth={'100%'}
      px="4"
      py={6}
      position={'abosolute'}
      bottom="0px"
    >
      <Box display="flex" justifyContent={'space-between'} alignItems="center">
        <Box
          display="flex"
          alignItems={'center'}
          gap={4}
          color="brand.neutral600"
        >
          <Box>
            <FaTwitter />
          </Box>
          <Box>
            <FaTelegram />
          </Box>
          <Box>
            <FaPodcast />
          </Box>
          <Box ml={4}>
            <Button bg={'brand.bgWhite'} fontSize="sm" size={'sm'}>
              Subscribe
            </Button>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems={'center'}
          gap={4}
          color="brand.neutral600"
          fontWeight={'500'}
          fontSize="12px"
        >
          <Text>Geyser</Text>
          <Text>₿ = ❤</Text>
          <Text>Privacy</Text>
          <Text>T&C</Text>
          <Text>Analytics</Text>
        </Box>
      </Box>
    </Box>
  );
};
