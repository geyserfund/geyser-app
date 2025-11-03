import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { WaitingForPayment } from '../../../components/WaitingForPayment.tsx'
import { BitcoinPurchaseNotice } from './BitcoinPurchaseNotice.tsx'
import { RedirectionNotice } from './RedirectionNotice.tsx'

/** Component for displaying awaiting payment UI in fiat swap flow */
export const FiatSwapAwaitingPayment: React.FC = () => {
  return (
    <VStack w="full" spacing={6} paddingTop={10}>
      <WaitingForPayment title={t('Waiting for payment to be confirmed')} />
      <RedirectionNotice />
      <BitcoinPurchaseNotice />
    </VStack>
  )
}
