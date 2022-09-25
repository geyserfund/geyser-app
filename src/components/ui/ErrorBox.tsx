import { Box, Text } from '@chakra-ui/react';
import React from 'react';

interface IErrorBoxProp {
  message: string;
}

export const ErrorBox = ({ message, ...rest }: IErrorBoxProp) => (
  <Box
    padding="10px"
    width="100%"
    borderRadius="10px"
    backgroundColor="brand.bgLightRed"
    {...rest}
  >
    <Text>{message}</Text>
  </Box>
);
