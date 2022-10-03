import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { isMobileMode } from '../../utils';

export const FailedAuth = () => {
  const isMobile = isMobileMode();
  return (
    <VStack
      height="100vh"
      width="100%"
      justifyContent="center"
      alignItems="center"
      spacing="20px"
    >
      <Text
        fontWeight="bold"
        fontSize={isMobile ? '2xl' : '3xl'}
        textAlign="center"
      >
        Error
      </Text>
      <Box
        bg="brand.error"
        borderRadius="full"
        width="75px"
        height="75px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CloseIcon w={7} h={7} />
      </Box>
      <Text
        fontSize={isMobile ? 'md' : 'lg'}
        w={isMobile ? '90%' : '550px'}
        textAlign="center"
      >
        Authentication failed. Please go back to try again.
      </Text>
    </VStack>
  );
};
