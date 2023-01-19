import { Link, LinkProps } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

type Props = LinkProps & {
  destinationPath: string;
  children: ReactNode;
};

export const MenuItemLink = ({
  children,
  destinationPath,
  isExternal,
  ...rest
}: Props) => {
  return (
    <>
      {isExternal ? (
        <Link
          px={2}
          py={1}
          textDecoration="none"
          _hover={{ textDecoration: 'none' }}
          href={destinationPath}
          isExternal
          width="100%"
          _focus={{}}
          {...rest}
        >
          {children}
        </Link>
      ) : (
        <Link
          as={ReactRouterLink}
          px={2}
          py={1}
          textDecoration="none"
          _hover={{ textDecoration: 'none' }}
          to={destinationPath}
          width="100%"
          _focus={{}}
          {...rest}
        >
          {children}
        </Link>
      )}
    </>
  );
};
