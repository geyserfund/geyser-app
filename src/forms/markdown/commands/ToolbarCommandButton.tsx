import { IconButton, IconButtonProps, Tooltip } from '@chakra-ui/react'
import { forwardRef } from 'react'

import { ToolbarCommandProps } from './ToolbarCommand'

export const ToolbarCommandButton = forwardRef<
  HTMLButtonElement,
  Pick<ToolbarCommandProps, 'name' | 'label'> &
    Omit<IconButtonProps, 'aria-label'>
>(({ name, label, ...props }, ref) => {
  return (
    <Tooltip openDelay={300} isDisabled={!label} label={label}>
      <IconButton
        ref={ref}
        variant="secondary"
        aria-label={`editor ${name} command`}
        {...props}
      >
        {props.children}
      </IconButton>
    </Tooltip>
  )
})
