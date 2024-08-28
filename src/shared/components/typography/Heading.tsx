import { Heading, HeadingProps } from '@chakra-ui/react'

import { getFontColor, getFontWeight, TextColorProps, TextWeightProps } from './common'

interface HeaderProps extends HeadingProps, TextWeightProps, TextColorProps {}

/** H1 heading, default size: 4xl / 36px */
export const H1 = (props: HeaderProps) => {
  return <BaseHeading as="h1" size="4xl" {...props} />
}

/** H2 heading, default size: 2xl / 24px */
export const H2 = (props: HeaderProps) => {
  return <BaseHeading as="h2" size="2xl" {...props} />
}

/** H3 heading, default size: lg / 18px */
export const H3 = (props: HeaderProps) => {
  return <BaseHeading as="h3" size="lg" {...props} />
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

export const BaseHeading = ({ thin, medium, bold, light, muted, size = 'md', ...rest }: HeaderProps) => {
  return (
    <Heading
      fontWeight={getFontWeight({ thin, medium, bold })}
      color={getFontColor({ light, muted })}
      fontSize={size}
      {...rest}
    />
  )
}
