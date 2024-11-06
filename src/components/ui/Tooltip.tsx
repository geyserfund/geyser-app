import { Tooltip as ChakraTooltip, TooltipProps } from '@chakra-ui/react'
import React from 'react'

import { useMobileMode } from '../../utils'

interface CustomTooltipProps extends Omit<TooltipProps, 'children' | 'content'> {
  content: React.ReactNode
  children: React.ReactNode
}

export const Tooltip: React.FC<CustomTooltipProps> = ({ content, children, ...props }) => {
  const isMobile = useMobileMode()

  return (
    <ChakraTooltip
      label={content}
      bg="neutral.900"
      color="neutral.0"
      borderRadius={8}
      placement="top-start"
      fontSize="12px"
      fontWeight="600"
      padding={0}
      px={4}
      py={2}
      hasArrow
      shouldWrapChildren
      openDelay={isMobile ? 100 : 0}
      closeDelay={isMobile ? 100 : 0}
      closeOnClick={isMobile}
      {...props}
    >
      {children}
    </ChakraTooltip>
  )
}
