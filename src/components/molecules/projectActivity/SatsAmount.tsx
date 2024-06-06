import { HStack, StackProps, Text, TextProps } from '@chakra-ui/react'

import { commaFormatted, getShortAmountLabel } from '../../../utils'
import { SatoshiIcon, SatoshiIconProps } from '../../icons'

type Props = TextProps & {
  label?: string
  isLoading?: boolean
  wrapperProps?: StackProps
  iconProps?: SatoshiIconProps
  isShortened?: boolean
  isDecimal?: boolean
}

export const SatsAmount = ({
  isShortened = false,
  isDecimal = false,
  wrapperProps,
  iconProps,
  children,
  ...rest
}: Props) => {
  return (
    <HStack alignItems="center" spacing={'2px'} {...wrapperProps}>
      <SatoshiIcon size="md" color={rest.color} {...iconProps} />
      <Text {...rest}>
        {isShortened ? getShortAmountLabel(Number(children), isDecimal) : commaFormatted(Number(children))}
      </Text>
    </HStack>
  )
}
