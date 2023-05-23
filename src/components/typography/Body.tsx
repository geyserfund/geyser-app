import { Text, TextProps } from '@chakra-ui/react'

import { fonts } from '../../styles'

export interface BodyProps extends TextProps {
  semiBold?: boolean
  bold?: boolean
  to?: string
}

export const Body1 = ({ children, bold, semiBold, ...rest }: BodyProps) => {
  return (
    <Text
      fontSize={{ base: '14px', lg: '16px' }}
      fontWeight={bold ? 600 : semiBold ? 500 : 'inherited'}
      fontFamily={fonts.inter}
      {...rest}
    >
      {children}
    </Text>
  )
}

export const Body2 = ({ children, bold, semiBold, ...rest }: BodyProps) => {
  return (
    <Text
      fontSize={{ base: '12px', lg: '14px' }}
      fontWeight={bold ? 600 : semiBold ? 500 : 'inherited'}
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
      fontWeight={bold ? 600 : semiBold ? 500 : 'inherited'}
      fontFamily={fonts.inter}
      {...rest}
    >
      {children}
    </Text>
  )
}
