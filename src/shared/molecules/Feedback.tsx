import { HStack, StackProps } from '@chakra-ui/react'
import { useMemo } from 'react'
import { PiCheckCircle, PiInfo, PiXCircle } from 'react-icons/pi'

import { useCustomTheme } from '@/utils'

import { Body } from '../components/typography'

export enum FeedBackVariant {
  WARNING = 'warning',
  INFO = 'info',
  ERROR = 'error',
  SUCCESS = 'success',
}

type FeedbackProps = {
  variant: FeedBackVariant
  text: string
} & StackProps

const icons = {
  [FeedBackVariant.WARNING]: PiInfo,
  [FeedBackVariant.INFO]: PiInfo,
  [FeedBackVariant.ERROR]: PiXCircle,
  [FeedBackVariant.SUCCESS]: PiCheckCircle,
}

export const Feedback = ({ variant, text, ...props }: FeedbackProps) => {
  const { colors } = useCustomTheme()

  const feedbackColors = useMemo(
    () => ({
      [FeedBackVariant.WARNING]: {
        bg: colors.warning[2],
        border: colors.warning[6],
        color: colors.warning[11],
      },
      [FeedBackVariant.INFO]: {
        bg: colors.info[2],
        border: colors.info[6],
        color: colors.info[11],
      },
      [FeedBackVariant.ERROR]: {
        bg: colors.error[2],
        border: colors.error[6],
        color: colors.error[11],
      },
      [FeedBackVariant.SUCCESS]: {
        bg: colors.success[2],
        border: colors.success[6],
        color: colors.success[11],
      },
    }),
    [colors],
  )

  const feedbackColor = feedbackColors[variant]

  const Icon = icons[variant]

  return (
    <HStack
      padding={4}
      backgroundColor={feedbackColor.bg}
      spacing={3}
      w="full"
      borderRadius="12px"
      alignItems={'start'}
      justifyContent="start"
      border="1px solid"
      borderColor={feedbackColor.border}
      {...props}
    >
      <Icon color={feedbackColor.color} fontSize="30px" />
      <Body size="sm" color={feedbackColor.color}>
        {text}
      </Body>
    </HStack>
  )
}
