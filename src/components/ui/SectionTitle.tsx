import { Text, TextProps } from '@chakra-ui/react';
import React from 'react';

export const SectionTitle = ({ children, ...rest }: TextProps) => (
  <Text fontSize="18px" lineHeight="26px" fontWeight={'semibold'} {...rest}>
    {children}
  </Text>
);
