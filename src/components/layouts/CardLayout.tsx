import { Stack, StackProps } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { Link, LinkProps } from 'react-router-dom'

import { useMobileMode } from '../../utils'

export interface CardLayoutProps
  extends StackProps,
    Partial<Pick<LinkProps, 'to'>> {
  noborder?: boolean
  noMobileBorder?: boolean
  mobileDense?: boolean
  hover?: boolean
  click?: boolean
}

export const CardLayout = forwardRef<HTMLDivElement, CardLayoutProps>(
  (
    { noMobileBorder, mobileDense, children, noborder, click, hover, ...rest },
    ref,
  ) => {
    const isMobile = useMobileMode()
    const props = {
      ref,
      spacing: 3,
      tabIndex: -1,
      overflow: 'hidden',
      backgroundColor: 'neutral.0',
      border: '2px solid',
      transition: 'border-color 0.5s',
      boxShadow: 'none',
      as: rest.to ? Link : undefined,
      borderColor:
        noborder || (isMobile && noMobileBorder)
          ? 'transparent'
          : 'neutral.200',
      _hover: hover ? { cursor: 'pointer', borderColor: 'neutral.400' } : {},
      _active: click ? { borderColor: 'primary.400' } : {},
      _focus: click ? { borderColor: 'primary.400' } : {},
      ...rest,
    }

    if (mobileDense && isMobile) {
      return (
        <Stack p={'10px'} width="100%" {...props} border="none">
          {children}
        </Stack>
      )
    }

    return (
      <Stack p={5} borderRadius="8px" {...props}>
        {children}
      </Stack>
    )
  },
)
