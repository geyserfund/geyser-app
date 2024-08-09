import { VStack } from '@chakra-ui/react'

import { CardLayout } from '@/shared/components/layouts'

import { ProjectFundingSummary } from '../../../components/ProjectFundingSummary'

export const FundingPaymentBottomContent = () => {
  return <FundingPaymentsSummary />
}

export const FundingPaymentSideContent = () => {
  return (
    <CardLayout w="full" h="full">
      <FundingPaymentsSummary />
    </CardLayout>
  )
}

export const FundingPaymentsSummary = () => {
  return (
    <VStack width={'100%'} borderRadius={'md'} spacing={4} alignItems="start">
      <ProjectFundingSummary />
    </VStack>
  )
}
