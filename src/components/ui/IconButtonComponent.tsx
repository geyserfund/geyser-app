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
  const backgroundColor = useColorModeValue(colors.bgWhite, colors.bgDark)
  const textColor = useColorModeValue(colors.textBlack, colors.textWhite)

  return (
    <IconButton
      ref={ref}
      variant="solid"
      backgroundColor={
        noBorder ? 'transparent' : primary ? 'primary.400' : backgroundColor
      }
      borderRadius="50%"
      color={primary ? 'black' : textColor}
      _hover={primary ? { bg: 'primary.400Tint' } : undefined}
      border={noBorder ? undefined : `1px solid ${colors.neutral300}`}
      {...rest}
    />
  )
})
