import { Divider, HStack } from '@chakra-ui/react'
import React from 'react'

import { H3 } from '@/shared/components/typography'

import { CardLayout, CardLayoutProps } from '../../../../../shared/components/layouts'
import { useMobileMode } from '../../../../../utils'

interface ProfileTabLayoutProps extends CardLayoutProps {
  heading: React.ReactNode
  headerContent?: React.ReactNode
  children: React.ReactNode
}

export const ProfileTabLayout = ({ heading, headerContent, children, ...rest }: ProfileTabLayoutProps) => {
  const isMobile = useMobileMode()
  return (
    <CardLayout
      noMobileBorder
      spacing="20px"
      padding={{ base: '10px', lg: '20px' }}
      maxHeight="100%"
      height="100%"
      overflowY="auto"
      alignItems="start"
      {...rest}
    >
      {isMobile ? (
        headerContent
      ) : (
        <>
          <HStack w="full" justifyContent="space-between" alignItems={'center'}>
            {!isMobile && (
              <H3 size="lg" py="5px">
                {heading}
              </H3>
            )}
            {headerContent}
          </HStack>
          <Divider border={'1px solid'} borderColor={'neutral.200'} />
        </>
      )}

      {children}
    </CardLayout>
  )
}
