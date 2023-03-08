import { Text, TextProps } from '@chakra-ui/react'

import { fonts } from '../../styles'

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
  return (
    <Text
      fontSize={{ base: '26px', md: '30px' }}
      fontWeight={bold ? 600 : semiBold ? 500 : 400}
      fontFamily={fonts.mono}
      {...rest}
    >
      {children}
    </Text>
  )
}

export const MonoBody1 = ({ children, bold, semiBold, ...rest }: MonoProps) => {
  return (
    <Text
      fontSize={{ base: '14px', md: '16px' }}
      fontWeight={bold ? 600 : semiBold ? 500 : 400}
      fontFamily={fonts.mono}
      {...rest}
    >
      {children}
    </Text>
  )
}

export const MonoBody2 = ({ children, bold, semiBold, ...rest }: MonoProps) => {
  return (
    <Text
      fontSize={{ base: '12px', md: '14px' }}
      fontWeight={bold ? 600 : semiBold ? 500 : 400}
      fontFamily={fonts.mono}
      {...rest}
    >
      {children}
    </Text>
  )
}
