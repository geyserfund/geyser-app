import { Popover, PopoverBody, PopoverBodyProps, PopoverContent, PopoverProps, PopoverTrigger } from '@chakra-ui/react'
import React from 'react'

import { useMobileMode } from '@/utils/index.ts'

import { Body } from '../typography/Body.tsx'

type TooltipPopoverProps = {
  children: React.ReactNode
  text?: string
  bodyProps?: PopoverBodyProps
} & PopoverProps

export const TooltipPopover = ({ children, text, bodyProps, ...props }: TooltipPopoverProps) => {
  const isMobile = useMobileMode()

  if (!text) {
    return children
  }

  return (
    <Popover strategy="fixed" trigger={isMobile ? 'click' : 'hover'} {...props}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverBody maxWidth="300px" {...bodyProps}>
          <Body size="sm" light whiteSpace="normal" textAlign="left">
            {text}
          </Body>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
