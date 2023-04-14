import { Divider, HStack } from '@chakra-ui/react'
import React from 'react'

import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { H3 } from '../../../components/typography'

interface ProfileTabLayoutProps extends CardLayoutProps {
  title: string
  headerContent?: React.ReactNode
  children: React.ReactNode
}

export const ProfileTabLayout = ({
  title,
  headerContent,
  children,
  ...rest
}: ProfileTabLayoutProps) => {
  return (
    <CardLayout spacing="20px" maxHeight="100%" overflowY="auto" {...rest}>
      <HStack w="full" justifyContent="space-between">
        <H3 color="neutral.900">{title}</H3>
        {headerContent}
      </HStack>
      <Divider borderBottomWidth="2px" />
      {children}
    </CardLayout>
  )
}
