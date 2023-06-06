import { IconButton, IconButtonProps } from '@chakra-ui/button'
import { forwardRef } from 'react'

export interface IconButtonComponentProps extends IconButtonProps {
  primary?: boolean
  href?: string
  isExternal?: boolean
  noBorder?: boolean
}

export const IconButtonComponent = forwardRef<
  HTMLButtonElement,
  IconButtonComponentProps
>(({ primary, noBorder, ...rest }, ref) => {
  return (
    <IconButton
      ref={ref}
      variant="solid"
      backgroundColor={
        noBorder ? 'transparent' : primary ? 'primary.400' : 'neutral.0'
      }
      borderRadius="50%"
      color={'neutral.1000'}
      _hover={primary ? { bg: 'primary.400Tint' } : undefined}
      border={noBorder ? undefined : `1px solid ${'neutral.300'}`}
      {...rest}
    />
  )
})
