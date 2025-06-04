import { LinkProps as ChakraLinkProps, Stack, StackProps } from '@chakra-ui/react'
import { Link, LinkProps } from 'react-router-dom'

import { useMobileMode } from '../../../utils'

export interface CardLayoutProps
  extends StackProps,
    Partial<Pick<LinkProps, 'to' | 'state'>>,
    Partial<Pick<ChakraLinkProps, 'href'>> {
  noborder?: boolean
  noMobileBorder?: boolean
  mobileDense?: boolean
  dense?: boolean
  hover?: boolean
  click?: boolean
  raiseOnHover?: boolean
}

export const CardLayout = ({
  noMobileBorder,
  mobileDense,
  dense,
  children,
  noborder,
  click,
  hover,
  raiseOnHover,
  ...rest
}: CardLayoutProps) => {
  const isMobile = useMobileMode()

  const props: StackProps = {
    spacing: 3,
    tabIndex: -1,
    overflow: 'hidden',
    as: rest.to ? Link : undefined,
    backgroundColor: 'utils.pbg',
    border: noborder ? 'none' : '1px solid',
    transition: 'border-color 0.5s',
    boxShadow: 'none',
    _hover: hover
      ? {
          cursor: 'pointer',
          borderColor: 'neutral1.9',
          transition: 'border-color 0.1s ease-in',
        }
      : {},
    _active: click ? { borderColor: 'primary1.9' } : {},
    _focus: click ? { borderColor: 'primary1.9' } : {},
    borderColor: noborder || (isMobile && noMobileBorder) ? 'transparent' : rest.borderColor || 'neutral1.6',
    position: 'relative',
    ...rest,
  }

  if (mobileDense && isMobile) {
    return (
      <Stack padding={0} width="100%" {...props} {...rest} border="none">
        {children}
      </Stack>
    )
  }

  return (
    <Stack padding={dense ? 0 : { base: 3, lg: 6 }} borderRadius="8px" {...props} {...rest}>
      {children}
    </Stack>
  )
}
