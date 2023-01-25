import { Link, LinkProps } from '@chakra-ui/react';

type Props = LinkProps & {
  children: any;
};

export const UndecoratedLink = ({ children, ...rest }: Props) => (
  <Link {...rest} _hover={{ textDecoration: 'none' }}>
    {children}
  </Link>
);
