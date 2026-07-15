import { Text, TextProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

import { getFontColor, getFontWeight, TextColorProps, TextWeightProps } from './common'

export interface BodyProps extends TextProps, TextWeightProps, TextColorProps {
  href?: string
  to?: string
  underline?: boolean
}

export const Body = forwardRef<HTMLParagraphElement, BodyProps>(
  ({ thin, medium, bold, light, muted, dark, size, underline, ...rest }, ref) => {
    return (
      <Text
        ref={ref}
        fontWeight={getFontWeight({ thin, medium, bold })}
        color={getFontColor({ light, muted, dark })}
        fontSize={size || 'inherit'}
        textDecoration={underline ? 'underline' : 'none'}
        _hover={{ textDecoration: underline ? 'underline' : 'none' }}
        {...rest}
      />
    )
  },
)

Body.displayName = 'Body'
