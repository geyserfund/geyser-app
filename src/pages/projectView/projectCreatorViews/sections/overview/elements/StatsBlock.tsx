import { HStack } from '@chakra-ui/react'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'

import {
  CardLayout,
  CardLayoutProps,
} from '../../../../../../components/layouts'
import { Body2, H2 } from '../../../../../../components/typography'
import { commaFormatted, useCustomTheme } from '../../../../../../utils'

interface StatsBlockProps extends CardLayoutProps {
  title: string
  value: number
  prevValue: number
}

export const StatsBlock = ({
  title,
  value,
  prevValue,
  ...rest
}: StatsBlockProps) => {
  const { colors } = useCustomTheme()

  const isHigher =
    value > prevValue ? Math.round(((value - prevValue) / prevValue) * 100) : 0

  const isLower =
    value < prevValue ? Math.round(((prevValue - value) / prevValue) * 100) : 0

  return (
    <CardLayout padding="10px 20px" {...rest}>
      <Body2 color="neutral.600" xBold>
        {title}
      </Body2>
      <HStack w="full" justifyContent="start" spacing="0" alignItems="end">
        <H2>{commaFormatted(value)}</H2>
        <HStack spacing="0">
          {isHigher > 0 && (
            <>
              <BsArrowUp color={colors.primary[600]} fontSize="14px" />
              <Body2 color="primary.500" xBold>
                {isHigher}%
              </Body2>
            </>
          )}
          {isLower > 0 && (
            <>
              <BsArrowDown color={colors.secondary.red} fontSize="14px" />
              <Body2 color="secondary.red" xBold>
                {isLower.toFixed(2)}%
              </Body2>
            </>
          )}
        </HStack>
      </HStack>
    </CardLayout>
  )
}
