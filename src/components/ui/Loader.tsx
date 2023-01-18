import { Box, BoxProps } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/spinner';
import React from 'react';

interface ILoader extends BoxProps {
  size?: string;
}

const Loader = ({ size, ...rest }: ILoader) => (
  <Box
    height="80%"
    display="flex"
    justifyContent="center"
    alignItems="center"
    {...rest}
  >
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="brand.primary"
      size={size ? size : 'xl'}
    />
  </Box>
);

export default Loader;
