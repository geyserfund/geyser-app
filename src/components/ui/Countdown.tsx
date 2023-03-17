import { BoxProps, HStack, Text, TextProps } from '@chakra-ui/react'

import { useCountdown } from '../../hooks/useCountdown'

interface Props {
  endDate?: number
  sectionProps?: TextProps
  dividerProps?: TextProps
}

export const Countdown = ({
  endDate,
  sectionProps = {},
  dividerProps = {},
  ...props
}: Props & BoxProps) => {
  const { days, hours, minutes } = useCountdown(endDate)

  const Divider = (
    <Text as="span" {...dividerProps}>
      :
    </Text>
  )

  return (
    <HStack spacing={0} {...props}>
      <Text as="span" {...sectionProps}>
        <span>{days}</span>
        <span>d</span>
      </Text>
      {Divider}
      <Text as="span" {...sectionProps}>
        <span>{hours}</span>
        <span>h</span>
      </Text>
      {Divider}
      <Text as="span" {...sectionProps}>
        <span>{minutes}</span>
        <span>m</span>
      </Text>
    </HStack>
  )
}
