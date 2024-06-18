import { Text, TextProps } from '@chakra-ui/react'

import { getFontColor, getFontWeight, TextColorProps, TextWeightProps } from './common'

interface BodyProps extends TextProps, TextWeightProps, TextColorProps {}

export const Body = ({ thin, medium, bold, light, muted, dark, size = 'md', ...rest }: BodyProps) => {
  return (
    <Text
      fontWeight={getFontWeight({ thin, medium, bold })}
      color={getFontColor({ light, muted, dark })}
      fontSize={size}
      {...rest}
    />
  )
}
