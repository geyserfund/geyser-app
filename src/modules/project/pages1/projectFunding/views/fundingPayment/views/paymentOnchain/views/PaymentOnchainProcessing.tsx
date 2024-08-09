import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useListenFundingSuccess } from '@/modules/project/funding/hooks/useListenFundingSuccess'
import { Body } from '@/shared/components/typography'

import { TransactionProcessing, UpdateFundingTxEmailAddress } from '../components'
import { DownloadRefundButton } from '../components/DownloadRefundButton'
import { useSwapTransactionValue } from '../states/onChainTransaction'

export const PaymentOnchainProcessing = () => {
  useListenFundingSuccess()

  const swapTransaction = useSwapTransactionValue()
  return (
    <VStack w="full" spacing={6}>
      <TransactionProcessing
        title={t('Transaction is being processed')}
        subTitle={t(
          'Completion time may vary due to Bitcoin network conditions, such as mempool size and transaction fees. Thank you for your patience.',
        )}
        transactionId={swapTransaction.id}
      />
      <UpdateFundingTxEmailAddress />
      <VStack w="full" spacing={0} maxWidth="310px">
        <DownloadRefundButton variant="surface" colorScheme="primary1" size="lg" width="310px" />
        <Body size="xs" light>
          {t('Download and securely store your Refund File; if in doubt, re-download to ensure its safety.')}
        </Body>
      </VStack>
    </VStack>
  )
}
