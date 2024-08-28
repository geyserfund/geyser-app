import { HStack } from '@chakra-ui/react'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'

import { CardLayout, CardLayoutProps } from '@/shared/components/layouts'
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
    <CardLayout padding={3} spacing={0} minWidth="150px" minHeight="64px" {...rest}>
      <HStack w="full" justifyContent="space-between">
        <Body size="sm" light>
          {title}:
        </Body>
        <HStack spacing="0">
          {isHigher > 0 && (
            <>
              <BsArrowUp color={colors.primary[600]} fontSize="14px" />
              <Body size="sm" color="primary1.10" bold>
                {isHigher}%
              </Body>
            </>
          )}
          {isLower > 0 && (
            <>
              <BsArrowDown color={colors.secondary.red} fontSize="14px" />
              <Body size="sm" color="warning.9" bold isTruncated>
                {isLower}%
              </Body>
            </>
          )}
        </HStack>
      </HStack>

      <Body size="sm" dark medium>
        {isPercent ? `${commaFormatted(value) || 0}%` : commaFormatted(value) || 0}
      </Body>
    </CardLayout>
  )
}
