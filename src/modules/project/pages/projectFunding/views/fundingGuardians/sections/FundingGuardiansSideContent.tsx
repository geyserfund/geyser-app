import { VStack } from '@chakra-ui/react'

import { CardLayout } from '@/shared/components/layouts/CardLayout'

import { ContinueWithButtons } from '../../../components/ContinueWithButtons.tsx'
import { ProjectFundingSummary } from '../../../components/ProjectFundingSummary'
import { FundingCheckoutWrapper, FundingSummaryWrapper } from '../../../layouts/FundingSummaryWrapper'
import { TAndCs } from '../../fundingInit/sections/FundingInitSideContent.tsx'

export const FundingGuardiansBottomContent = () => {
  return <FundingGuardiansSummary />
}

export const FundingGuardiansSideContent = () => {
  return (
    <CardLayout w="full" h="full" padding={0}>
      <FundingGuardiansSummary />
    </CardLayout>
  )
}

export const FundingGuardiansSummary = () => {
  return (
    <VStack
      width="100%"
      height="100%"
      maxHeight={{ base: 'calc(100vh - 177px)', lg: 'auto' }}
      overflowY="auto"
      justifyContent={'space-between'}
    >
      <FundingSummaryWrapper>
        <ProjectFundingSummary />
      </FundingSummaryWrapper>

      <FundingCheckoutWrapper>
        <VStack w="full" alignItems="flex-start">
          <TAndCs disableMobile={true} />
          <ContinueWithButtons />
        </VStack>
      </FundingCheckoutWrapper>
    </VStack>
  )
}
