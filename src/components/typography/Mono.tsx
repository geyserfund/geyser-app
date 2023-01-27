import { Text, TextProps } from '@chakra-ui/react'

import { fonts } from '../../styles'
import { useMobileMode } from '../../utils'

interface MonoProps extends TextProps {
  semiBold?: boolean
  bold?: boolean
}

export const MonoHeader = ({
  children,
  bold,
  semiBold,
  ...rest
}: MonoProps) => {
  const isMobile = useMobileMode()
  return (
    <Text
      fontSize={isMobile ? '26px' : '30px'}
      fontWeight={bold ? 600 : semiBold ? 500 : 400}
      fontFamily={fonts.mono}
      {...rest}
    >
      {children}
    </Text>
  )
}

export const MonoBody1 = ({ children, bold, semiBold, ...rest }: MonoProps) => {
  const isMobile = useMobileMode()
  return (
    <Text
      fontSize={isMobile ? '14px' : '16px'}
      fontWeight={bold ? 600 : semiBold ? 500 : 400}
      fontFamily={fonts.mono}
      {...rest}
    >
      {children}
    </Text>
  )
}

export const MonoBody2 = ({ children, bold, semiBold, ...rest }: MonoProps) => {
  const isMobile = useMobileMode()
  return (
    <Text
      fontSize={isMobile ? '12px' : '14px'}
      fontWeight={bold ? 600 : semiBold ? 500 : 400}
      fontFamily={fonts.mono}
      {...rest}
    >
      {children}
    </Text>
  )
}
