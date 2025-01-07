import { HStack, StackProps, VStack } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

export const FundingSummaryWrapper: React.FC<PropsWithChildren<StackProps>> = ({ children, ...rest }) => {
  return (
    <VStack
      paddingX={{ base: 0, lg: 6 }}
      paddingTop={{ base: 0, lg: 6 }}
      width={'100%'}
      height={{ base: 'calc(100% - 80px)', lg: 'calc(100% - 120px)' }}
      overflowY={'auto'}
      borderRadius={'md'}
      spacing={4}
      alignItems="start"
      {...rest}
    >
      {children}
    </VStack>
  )
}

export const FundingCheckoutWrapper: React.FC<PropsWithChildren<StackProps>> = ({ children, ...rest }) => {
  return (
    <HStack
      alignItems={'flex-end'}
      w="full"
      height={{ base: '80px', lg: '120px' }}
      padding={{ base: 0, lg: 6 }}
      {...rest}
    >
      {children}
    </HStack>
  )
}
