import { Heading, HeadingProps } from '@chakra-ui/react'

import { fonts } from '../../styles'

export const H1 = ({ children, ...rest }: HeadingProps) => {
  return (
    <Heading
      as="h1"
      fontSize={{ base: '25px', lg: '35px' }}
      fontWeight={700}
      fontFamily={fonts.inter}
      {...rest}
    >
      {children}
    </Heading>
  )
}

export const H2 = ({ children, ...rest }: HeadingProps) => {
  return (
    <Heading
      as="h2"
      fontSize={{ base: '20px', lg: '24px' }}
      fontWeight={700}
      fontFamily={fonts.inter}
      {...rest}
    >
      {children}
    </Heading>
  )
}

export const H3 = ({ children, ...rest }: HeadingProps) => {
  return (
    <Heading
      as="h3"
      fontSize={{ base: '15px', lg: '18px' }}
      fontWeight={600}
      fontFamily={fonts.inter}
      {...rest}
    >
      {children}
    </Heading>
  )
}
