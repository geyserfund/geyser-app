import { IconButton, IconButtonProps } from '@chakra-ui/button'
import { useColorModeValue } from '@chakra-ui/system'
import { forwardRef } from 'react'

import { colors } from '../../styles'

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
  const backgroundColor = useColorModeValue('neutral.0', colors.bgDark)
  const textColor = useColorModeValue('neutral.1000', 'neutral.0')

  return (
    <IconButton
      ref={ref}
      variant="solid"
      backgroundColor={
        noBorder ? 'transparent' : primary ? 'primary.400' : backgroundColor
      }
      borderRadius="50%"
      color={primary ? 'neutral.1000' : textColor}
      _hover={primary ? { bg: 'primary.400Tint' } : undefined}
      border={noBorder ? undefined : `1px solid ${'neutral.300'}`}
      {...rest}
    />
  )
})
