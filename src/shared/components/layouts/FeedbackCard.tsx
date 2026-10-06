import { Divider, HStack } from '@chakra-ui/react'
import React from 'react'
import { PiWarningFill } from 'react-icons/pi'

import type { CardLayoutProps } from '@/shared/components/layouts/CardLayout.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'

type FeedbackCardVariants = 'primary' | 'warning' | 'neutral' | 'danger'

interface FeedbackCardProps extends CardLayoutProps {
  variant?: FeedbackCardVariants
  title: string
  icon?: React.ReactNode
  noIcon?: boolean
}

const feedbackCardVariantColors: { [key in FeedbackCardVariants]: string } = {
  primary: 'primary1.9',
  warning: 'warning.9',
  neutral: 'neutral1.9',
  danger: 'error.9',
}

/** Bordered card with a titled header row, used for inline feedback and warnings. */
export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  variant = 'neutral',
  title,
  icon,
  noIcon,
  children,
  ...rest
}) => {
  return (
    <CardLayout borderColor={feedbackCardVariantColors[variant]} padding="20px" spacing="10px" {...rest}>
      <HStack spacing="10px">
        {noIcon ? null : icon ? icon : <PiWarningFill size="24" aria-hidden />}
        <H3>{title}</H3>
      </HStack>
      <Divider borderColor="neutral1.6" />
      {children}
    </CardLayout>
  )
}
