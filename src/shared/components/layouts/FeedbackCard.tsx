import { Divider, HStack } from '@chakra-ui/react'
import React from 'react'
import { BsExclamationSquareFill } from 'react-icons/bs'

import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout'
import { H3 } from '@/shared/components/typography'

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
        {noIcon ? null : icon ? icon : <BsExclamationSquareFill size="24" />}
        <H3>{title}</H3>
      </HStack>
      <Divider borderBottomWidth="2px" borderColor="neutral1." />
      {children}
    </CardLayout>
  )
}
