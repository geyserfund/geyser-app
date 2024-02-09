import { Link, MenuItem, MenuItemProps } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

type Props = MenuItemProps & {
  destinationPath: string
  isExternal?: boolean
}

export const MenuItemLink = ({ children, destinationPath, isExternal, ...rest }: Props) => {
  return (
    <MenuItem {...rest}>
      {isExternal ? (
        <Link
          textDecoration="none"
          _hover={{ textDecoration: 'none' }}
          href={destinationPath}
          isExternal
          width="100%"
          _focus={{}}
        >
          {children}
        </Link>
      ) : (
        <Link
          as={ReactRouterLink}
          textDecoration="none"
          _hover={{ textDecoration: 'none' }}
          to={destinationPath}
          width="100%"
          _focus={{}}
        >
          {children}
        </Link>
      )}
    </MenuItem>
  )
}
