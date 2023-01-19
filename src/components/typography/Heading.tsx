import React from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';
import { fonts } from '../../constants';
import { isMobileMode } from '../../utils';

export const H1 = ({ children, ...rest }: HeadingProps) => {
  const isMobile = isMobileMode();
  return (
    <Heading
      as="h1"
      fontSize={isMobile ? '25px' : '35px'}
      fontWeight={700}
      fontFamily={fonts.inter}
      {...rest}
    >
      {children}
    </Heading>
  );
};

export const H2 = ({ children, ...rest }: HeadingProps) => {
  const isMobile = isMobileMode();
  return (
    <Heading
      as="h2"
      fontSize={isMobile ? '20px' : '24px'}
      fontWeight={700}
      fontFamily={fonts.inter}
      {...rest}
    >
      {children}
    </Heading>
  );
};

export const H3 = ({ children, ...rest }: HeadingProps) => {
  const isMobile = isMobileMode();
  return (
    <Heading
      as="h3"
      fontSize={isMobile ? '15px' : '18px'}
      fontWeight={600}
      fontFamily={fonts.inter}
      {...rest}
    >
      {children}
    </Heading>
  );
};
