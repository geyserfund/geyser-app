import { Text, TextProps } from '@chakra-ui/react'

import { getFontColor, getFontWeight, TextColorProps, TextWeightProps } from './common'

export interface BodyProps extends TextProps, TextWeightProps, TextColorProps {
  href?: string
  to?: string
  underline?: boolean
}

export const Body = ({ thin, medium, bold, light, muted, dark, size, underline, ...rest }: BodyProps) => {
  return (
    <Text
      fontWeight={getFontWeight({ thin, medium, bold })}
      color={getFontColor({ light, muted, dark })}
      fontSize={size || 'inherit'}
      textDecoration={underline ? 'underline' : 'none'}
      _hover={{ textDecoration: underline ? 'underline' : 'none' }}
      {...rest}
    />
  )
}
