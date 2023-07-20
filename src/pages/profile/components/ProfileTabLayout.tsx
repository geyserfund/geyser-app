import { Divider, HStack } from '@chakra-ui/react'
import React from 'react'

import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { H3 } from '../../../components/typography'
import { useMobileMode } from '../../../utils'

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
  const isMobile = useMobileMode()
  return (
    <CardLayout
      noMobileBorder
      spacing="20px"
      padding={{ base: '10px', lg: '20px' }}
      maxHeight="100%"
      overflowY="auto"
      {...rest}
    >
      {isMobile ? (
        headerContent
      ) : (
        <>
          <HStack w="full" justifyContent="space-between" alignItems={'center'}>
            {!isMobile && <H3 color="neutral.900">{title}</H3>}
            {headerContent}
          </HStack>
          <Divider border={'1px solid'} borderColor={'neutral.200'} />
        </>
      )}

      {children}
    </CardLayout>
  )
}
