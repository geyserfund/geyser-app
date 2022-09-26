import { Link, LinkProps } from '@chakra-ui/react';
import React from 'react';

interface ILinkin extends LinkProps {
  children: any;
}

export const Linkin = ({ children, ...rest }: ILinkin) => (
  <Link {...rest} _hover={{ textDecoration: 'none' }}>
    {children}
  </Link>
);
