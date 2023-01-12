import { Box } from '@chakra-ui/react';
import React from 'react';
import { dimensions } from '../../constants';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  console.log('');
  return (
    <Box
      position="relative"
      paddingTop={`${dimensions.topNavBar.desktop.height}px`}
      width="full"
      height="full"
    >
      {children}
    </Box>
  );
};
