import { HStack } from '@chakra-ui/react'
import { PiArrowDown, PiArrowUp } from 'react-icons/pi'

import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import { commaFormatted, useCustomTheme } from '@/utils'

interface StatsBlockProps extends CardLayoutProps {
  title: string
  value: number
  prevValue: number
  isPercent?: boolean
}

export const StatsBlock = ({ title, value, prevValue, isPercent, ...rest }: StatsBlockProps) => {
  const { colors } = useCustomTheme()

  const isHigher = prevValue && value > prevValue ? Math.round(((value - prevValue) / prevValue) * 100) : 0

  const isLower = prevValue && value < prevValue ? Math.round(((prevValue - value) / prevValue) * 100) : 0

  return (
    <CardLayout
      padding={3}
      spacing={0}
      minWidth="150px"
      minHeight="64px"
      borderRadius="innerCard"
      boxShadow="none"
      {...rest}
    >
      <HStack w="full" justifyContent="space-between">
        <Body size="sm" color="neutral1.11">
          {title}:
        </Body>
        <HStack spacing="0">
          {isHigher > 0 && (
            <>
              <PiArrowUp color={colors.primary1[11]} fontSize="14px" />
              <Body size="sm" color="primary1.11" bold>
                {isHigher}%
              </Body>
            </>
          )}
          {isLower > 0 && (
            <>
              <PiArrowDown color={colors.warning[11]} fontSize="14px" />
              <Body size="sm" color="warning.11" bold isTruncated>
                {isLower}%
              </Body>
            </>
          )}
        </HStack>
      </HStack>

      <Body size="sm" color="utils.text" medium>
        {isPercent ? `${commaFormatted(value) || 0}%` : commaFormatted(value) || 0}
      </Body>
    </CardLayout>
  )
}
