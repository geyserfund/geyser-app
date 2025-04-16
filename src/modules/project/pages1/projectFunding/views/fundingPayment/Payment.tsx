import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { fundingContributionAtom } from '@/modules/project/funding/state/fundingContributionAtom.ts'
import { fundingPaymentDetailsAtom } from '@/modules/project/funding/state/fundingPaymentAtom.ts'
import { H1 } from '@/shared/components/typography'
import { useSpeedWalletParams } from '@/shared/hooks/useSpeedWalletParams.tsx'

import { FundingDisclaimer } from './components/FundingDisclaimer.tsx'
import { ReachOutForHelpButton } from './components/ReachOutForHelpButton'
import { PaymentMethodSelection } from './sections/PaymentMethodSelection'

export const Payment = () => {
  const { isSpeedWalletApp, sendSpeedWalletData } = useSpeedWalletParams()

  const fundingPaymentDetails = useAtomValue(fundingPaymentDetailsAtom)
  const fundingContribution = useAtomValue(fundingContributionAtom)

  useEffect(() => {
    if (isSpeedWalletApp && fundingPaymentDetails.lightning?.paymentRequest && fundingContribution.amount) {
      sendSpeedWalletData({
        invoice: fundingPaymentDetails.lightning?.paymentRequest,
        amount: fundingContribution.amount,
      })
    }
  }, [isSpeedWalletApp, sendSpeedWalletData, fundingPaymentDetails, fundingContribution])

  return (
    <>
      <VStack flex={1} w="full" alignItems="start">
        <H1 size="2xl" bold>
          {t('Invoice')}
        </H1>
        <VStack w="full" spacing={6}>
          <PaymentMethodSelection />
          <Outlet />
        </VStack>
      </VStack>

      <VStack w="full" spacing={3}>
        <ReachOutForHelpButton />
        <FundingDisclaimer />
      </VStack>
    </>
  )
}
