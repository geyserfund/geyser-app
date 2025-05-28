import { HStack, Icon, IconProps, StackProps } from '@chakra-ui/react'
import { useMemo } from 'react'
import { PiCheckCircle, PiInfo, PiXCircle } from 'react-icons/pi'

import { useCustomTheme } from '@/utils'

import { Body } from '../components/typography'

export enum FeedBackVariant {
  WARNING = 'warning',
  INFO = 'info',
  ERROR = 'error',
  SUCCESS = 'success',
  NEUTRAL = 'neutral',
}

type FeedbackProps = {
  variant: FeedBackVariant
  text?: string | React.ReactNode
  children?: React.ReactNode
  icon?: React.ReactNode
  iconProps?: IconProps
  noIcon?: boolean
} & StackProps

const icons = {
  [FeedBackVariant.WARNING]: PiInfo,
  [FeedBackVariant.INFO]: PiInfo,
  [FeedBackVariant.ERROR]: PiXCircle,
  [FeedBackVariant.SUCCESS]: PiCheckCircle,
  [FeedBackVariant.NEUTRAL]: PiInfo,
}

export const Feedback = ({ variant, text, children, icon, noIcon, iconProps, ...props }: FeedbackProps) => {
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
        bg: colors.primary1[2],
        border: colors.primary1[6],
        color: colors.primary1[11],
      },
      [FeedBackVariant.NEUTRAL]: {
        bg: colors.neutral1[2],
        border: colors.neutral1[6],
        color: colors.neutral1[11],
      },
    }),
    [colors],
  )

  const feedbackColor = feedbackColors[variant]

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
      color={feedbackColor.color}
      {...props}
    >
      {noIcon ? null : icon ? (
        icon
      ) : (
        <Icon as={icons[variant]} color={feedbackColor.color} fontSize="30px" {...iconProps} />
      )}
      {children ? (
        children
      ) : (
        <Body size="sm" color={feedbackColor.color}>
          {text}
        </Body>
      )}
    </HStack>
  )
}
