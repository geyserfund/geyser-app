import { VStack } from '@chakra-ui/react'

import { CardLayout } from '@/shared/components/layouts/CardLayout'

import { FundingPaymentSummary } from '../components/FundingPaymentSummary.tsx'

export const FundingPaymentBottomContent = () => {
  return <FundingPaymentsSummary />
}

export const FundingPaymentSideContent = () => {
  return (
    <CardLayout w="full" h="full" padding={0}>
      <FundingPaymentsSummary />
    </CardLayout>
  )
}

export const FundingPaymentsSummary = () => {
  return (
    <VStack
      width={'100%'}
      height="100%"
      padding={{ base: 0, lg: 6 }}
      overflowY={'auto'}
      borderRadius={'md'}
      spacing={4}
      alignItems="start"
    >
      <FundingPaymentSummary />
    </VStack>
  )
}
