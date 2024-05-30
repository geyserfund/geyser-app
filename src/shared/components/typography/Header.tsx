import { Heading, HeadingProps } from '@chakra-ui/react'
import React from 'react'

interface TextWeightProps {
  /** Uses fontWeight: 300 */
  thin?: boolean
  /** Uses fontWeight: 400 */
  regular?: boolean
  /** Uses fontWeight: 500 */
  medium?: boolean
  /** Uses fontWeight: 700 */
  bold?: boolean
}

interface TextColorProps {
  /** Uses color: neutral.12 */
  dark?: boolean
  /** Uses color: neutral.11 */
  light?: boolean
  /** Uses color: neutral.9 */
  muted?: boolean
}

const getFontWeight = ({ thin, medium, bold, regular }: TextWeightProps) => {
  if (bold) return 700
  if (medium) return 500
  if (thin) return 300
  return 400
}

const getFontColor = ({ light, muted }: TextColorProps) => {
  if (light) return 'neutral.11'
  if (muted) return 'neutral.9'
  return 'neutral.12'
}

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
