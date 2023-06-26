import { Stack, StackProps, styled } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { Link, LinkProps } from 'react-router-dom'

import { useMobileMode } from '../../utils'

export interface CardLayoutProps
  extends StackProps,
    Partial<Pick<LinkProps, 'to'>> {
  noborder?: boolean
  mobileDense?: boolean
  hover?: boolean
  click?: boolean
}

const CardComponent = styled(Stack, {
  baseStyle: () => ({
    spacing: 3,
    tabIndex: -1,
    overflow: 'hidden',
    backgroundColor: 'neutral.0',
    border: '2px solid',
    transition: 'border-color 0.5s',
    boxShadow: 'none',
  }),
})

export const CardLayout = forwardRef<HTMLDivElement, CardLayoutProps>(
  ({ mobileDense, children, noborder, click, hover, ...rest }, ref) => {
    const isMobile = useMobileMode()
    const props = {
      ref,
      as: rest.to ? Link : undefined,
      borderColor: noborder ? 'transparent' : 'neutral.200',
      _hover: hover ? { cursor: 'pointer', borderColor: 'neutral.400' } : {},
      _active: click ? { borderColor: 'primary.400' } : {},
      _focus: click ? { borderColor: 'primary.400' } : {},
      ...rest,
    }

    if (mobileDense && isMobile) {
      return (
        <CardComponent p={4} width="100%" border="none" {...props}>
          {children}
        </CardComponent>
      )
    }

    return (
      <CardComponent p={5} borderRadius="8px" {...props}>
        {children}
      </CardComponent>
    )
  },
)
