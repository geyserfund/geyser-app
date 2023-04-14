import { Divider } from '@chakra-ui/react'
import React from 'react'

import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { H3 } from '../../../components/typography'

interface ProfileTabLayoutProps extends CardLayoutProps {
  title: string
  children: React.ReactNode
}

export const ProfileTabLayout = ({
  title,
  children,
  ...rest
}: ProfileTabLayoutProps) => {
  return (
    <CardLayout spacing="20px" maxHeight="100%" overflowY="auto" {...rest}>
      <H3 color="neutral.900">{title}</H3>
      <Divider borderBottomWidth="2px" />
      {children}
    </CardLayout>
  )
}
