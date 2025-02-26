import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { useFundingTxAtom } from '@/modules/project/funding/state/fundingTxAtom.ts'
import { Body, H1 } from '@/shared/components/typography'
import { useSpeedWalletParams } from '@/shared/hooks/useSpeedWalletParams.tsx'

import { ReachOutForHelpButton } from './components/ReachOutForHelpButton'
import { PaymentMethodSelection } from './sections/PaymentMethodSelection'

export const Payment = () => {
  const { isSpeedWalletApp, sendSpeedWalletData } = useSpeedWalletParams()
  const { fundingTx } = useFundingTxAtom()

  useEffect(() => {
    if (isSpeedWalletApp && fundingTx.paymentRequest && fundingTx.amount) {
      sendSpeedWalletData({
        invoice: fundingTx.paymentRequest,
        amount: fundingTx.amount,
      })
    }
  }, [isSpeedWalletApp, sendSpeedWalletData, fundingTx])

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
        <Body light size="xs">
          {t(
            'Geyser is not a store. It’s a way to bring creative projects to life using Bitcoin. Your donation will support a creative project that has yet to be developed. There’s a risk that, despite a creator’s best efforts, your reward will not be fulfilled, and we urge you to consider this risk prior to backing it. Geyser is not responsible for project claims or reward fulfillment.',
          )}
        </Body>
      </VStack>
    </>
  )
}
