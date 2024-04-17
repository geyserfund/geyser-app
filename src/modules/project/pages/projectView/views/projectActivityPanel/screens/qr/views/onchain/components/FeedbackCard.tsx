import { Divider, HStack, Icon } from '@chakra-ui/react'
import React from 'react'
import { BsExclamationSquareFill } from 'react-icons/bs'

import { CardLayout, CardLayoutProps } from '../../../../../../../../../../../components/layouts'
import { H3 } from '../../../../../../../../../../../components/typography'

type FeedbackCardVariants = 'primary' | 'warning' | 'neutral' | 'danger'

interface FeedbackCardProps extends CardLayoutProps {
  variant: FeedbackCardVariants
  title: string
  icon?: React.ReactNode
}

const feedbackCardVariantColors: { [key in FeedbackCardVariants]: string } = {
  primary: 'primary.400',
  warning: 'secondary.orange',
  neutral: 'neutral.900',
  danger: 'secondary.red',
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ variant, title, icon, children, ...rest }) => {
  return (
    <CardLayout borderColor={feedbackCardVariantColors[variant]} padding="20px" spacing="10px" {...rest}>
      <HStack spacing="10px">
        {icon ? icon : <BsExclamationSquareFill size="24" />}
        <H3>{title}</H3>
      </HStack>
      <Divider borderColor="neutral.200" />
      {children}
    </CardLayout>
  )
}
