import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useListenFundingContributionSuccess } from '@/modules/project/funding/hooks/useListenFundingContributionSuccess'
import { H1 } from '@/shared/components/typography'

import { FundingDisclaimer } from './components/FundingDisclaimer.tsx'
import { ReachOutForHelpButton } from './components/ReachOutForHelpButton'
import { PaymentStripe } from './views/PaymentStripe'

export const Subscription = () => {
  useListenFundingContributionSuccess()
  return (
    <>
      <VStack flex={1} w="full" alignItems="start">
        <H1 size="2xl" bold>
          {t('Subscribe')}
        </H1>
        <VStack w="full" spacing={6}>
          <PaymentStripe />
        </VStack>
      </VStack>

      <VStack w="full" spacing={3}>
        <ReachOutForHelpButton />
        <FundingDisclaimer />
      </VStack>
    </>
  )
}
