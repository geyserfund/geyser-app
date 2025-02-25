import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { useFundingTxAtom } from '@/modules/project/funding/state/fundingTxAtom.ts'
import { Body, H1 } from '@/shared/components/typography'
import { useSpeedWalletParams } from '@/shared/hooks/useSpeedWalletParams.tsx'

import { ReachOutForHelpButton } from './components/ReachOutForHelpButton'
import { PaymentMethodSelection } from './sections/PaymentMethodSelection'

export const Payment = () => {
  const { isSpeedWalletApp, sendSpeedWalletData, walletParams } = useSpeedWalletParams()
  const { fundingTx } = useFundingTxAtom()

  const [url, setUrl] = useState('')

  useEffect(() => {
    if (isSpeedWalletApp && fundingTx.paymentRequest && fundingTx.amount && walletParams.accountId) {
      const data = {
        version: '2022-10-15',
        account_id: walletParams.accountId,
        data: {
          amount: fundingTx.amount,
          currency: 'SATS',
          target_currency: 'SATS',
          deposit_address: fundingTx.paymentRequest,
          note: 'Payment for geyser via Speed Wallet',
        },
      }

      const url = JSON.stringify(data)

      setUrl(url)

      sendSpeedWalletData({
        invoice: fundingTx.paymentRequest,
        amount: fundingTx.amount,
        accountId: walletParams.accountId,
      })
    }
  }, [isSpeedWalletApp, sendSpeedWalletData, fundingTx, walletParams])

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
        <Body light size="xs">
          {url}
        </Body>
      </VStack>
    </>
  )
}
