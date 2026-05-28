import { type TooltipProps, Tooltip as ChakraTooltip } from '@chakra-ui/react'
import type { ReactNode } from 'react'

import { useMobileMode } from '@/utils'

type DashboardTooltipProps = Omit<TooltipProps, 'children' | 'content'> & {
  content: ReactNode
  children: ReactNode
}

export function DashboardTooltip({ content, children, ...props }: DashboardTooltipProps) {
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
