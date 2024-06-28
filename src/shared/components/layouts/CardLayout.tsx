import { Box, Stack, StackProps } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { Link, LinkProps } from 'react-router-dom'

import { useMobileMode } from '../../../utils'

export interface CardLayoutProps extends StackProps, Partial<Pick<LinkProps, 'to'>> {
  noborder?: boolean
  noMobileBorder?: boolean
  mobileDense?: boolean
  hover?: boolean
  click?: boolean
  topRightComponent?: React.ReactNode
}

export const CardLayout = forwardRef<HTMLDivElement, CardLayoutProps>(
  ({ noMobileBorder, mobileDense, children, noborder, click, hover, topRightComponent, ...rest }, ref) => {
    const isMobile = useMobileMode()
    const props: StackProps = {
      spacing: 3,
      tabIndex: -1,
      overflow: 'hidden',
      backgroundColor: 'neutral1.1',
      border: '1px solid',
      transition: 'border-color 0.5s',
      boxShadow: 'none',
      as: rest.to ? Link : undefined,
      _hover: hover ? { cursor: 'pointer', borderColor: 'neutral1.8' } : {},
      _active: click ? { borderColor: 'primary1.9' } : {},
      _focus: click ? { borderColor: 'primary1.9' } : {},
      ...rest,
      borderColor: noborder || (isMobile && noMobileBorder) ? 'transparent' : rest.borderColor || 'neutral1.6',
      position: 'relative',
    }

    if (mobileDense && isMobile) {
      return (
        <Stack ref={ref} p={'10px'} width="100%" {...props} border="none">
          {children}
        </Stack>
      )
    }

    return (
      <Stack ref={ref} p={5} borderRadius="8px" {...props}>
        <Box position="absolute" top="8px" right="8px">
          {topRightComponent}
        </Box>
        {children}
      </Stack>
    )
  },
)
