import { HStack, StackProps, VStack } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

export const FundingSummaryWrapper: React.FC<PropsWithChildren<StackProps>> = ({ children, ...rest }) => {
  return (
    <VStack
      paddingX={{ base: 0, lg: 6 }}
      paddingTop={{ base: 0, lg: 6 }}
      width={'100%'}
      height={'calc(100% - 80px)'}
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
    <HStack w="full" padding={{ base: 0, lg: 6 }} {...rest}>
      {children}
    </HStack>
  )
}
