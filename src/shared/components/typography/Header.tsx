import { Heading, HeadingProps } from '@chakra-ui/react'

import { getFontColor, getFontWeight, TextColorProps, TextWeightProps } from './common'

interface HeaderProps extends HeadingProps, TextWeightProps, TextColorProps {}

export const H1 = (props: HeaderProps) => {
  return <BaseHeading as="h1" {...props} />
}

export const H2 = (props: HeaderProps) => {
  return <BaseHeading as="h2" {...props} />
}

export const H3 = (props: HeaderProps) => {
  return <BaseHeading as="h3" {...props} />
}

export const H4 = (props: HeaderProps) => {
  return <BaseHeading as="h4" {...props} />
}

export const H5 = (props: HeaderProps) => {
  return <BaseHeading as="h5" {...props} />
}

export const H6 = (props: HeaderProps) => {
  return <BaseHeading as="h6" {...props} />
}

const BaseHeading = ({ thin, medium, bold, light, muted, ...rest }: HeaderProps) => {
  return <Heading fontWeight={getFontWeight({ thin, medium, bold })} color={getFontColor({ light, muted })} {...rest} />
}
