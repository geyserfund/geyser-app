import { Text, TextProps } from '@chakra-ui/react'

import { fonts } from '../../styles'
import { useMobileMode } from '../../utils'

interface BodyProps extends TextProps {
  semiBold?: boolean
  bold?: boolean
  to?: string
}

export const Body1 = ({ children, bold, semiBold, ...rest }: BodyProps) => {
  const isMobile = useMobileMode()
  return (
    <Text
      fontSize={isMobile ? '14px' : '16px'}
      fontWeight={bold ? 600 : semiBold ? 500 : 400}
      fontFamily={fonts.inter}
      {...rest}
    >
      {children}
    </Text>
  )
}

export const Body2 = ({ children, bold, semiBold, ...rest }: BodyProps) => {
  const isMobile = useMobileMode()
  return (
    <Text
      fontSize={isMobile ? '12px' : '14px'}
      fontWeight={bold ? 600 : semiBold ? 500 : 400}
      fontFamily={fonts.inter}
      {...rest}
    >
      {children}
    </Text>
  )
}

export const Caption = ({ children, bold, semiBold, ...rest }: BodyProps) => {
  return (
    <Text
      fontSize="10px"
      fontWeight={bold ? 600 : semiBold ? 500 : 400}
      fontFamily={fonts.inter}
      {...rest}
    >
      {children}
    </Text>
  )
}
