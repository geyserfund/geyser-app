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
  PRIORITY = 'priority',
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
  [FeedBackVariant.PRIORITY]: PiInfo,
}

export const Feedback = ({ variant, text, children, icon, noIcon, iconProps, ...props }: FeedbackProps) => {
  const { colors } = useCustomTheme()

  /** Unfilled tiles with a hairline border (see DESIGN.md): the variant shows in the border, icon and text colour. */
  const feedbackColors = useMemo(
    () => ({
      [FeedBackVariant.WARNING]: { border: colors.warning[6], color: colors.warning[11] },
      [FeedBackVariant.INFO]: { border: colors.neutral1[6], color: colors.neutral1[11] },
      [FeedBackVariant.ERROR]: { border: colors.error[6], color: colors.error[11] },
      [FeedBackVariant.SUCCESS]: { border: colors.primary1[6], color: colors.primary1[11] },
      [FeedBackVariant.NEUTRAL]: { border: colors.neutral1[6], color: colors.neutral1[11] },
      [FeedBackVariant.PRIORITY]: { border: colors.primary1[8], color: colors.primary1[11] },
    }),
    [colors],
  )

  const feedbackColor = feedbackColors[variant]

  return (
    <HStack
      padding={4}
      spacing={3}
      w="full"
      borderRadius="innerCard"
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
        <Icon
          as={icons[variant]}
          color={feedbackColor.color}
          fontSize="24px"
          flexShrink={0}
          aria-hidden
          {...iconProps}
        />
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
