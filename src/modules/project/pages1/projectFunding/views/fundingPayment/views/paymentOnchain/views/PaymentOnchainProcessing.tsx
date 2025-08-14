import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'

import { useAuthContext } from '@/context/auth.tsx'
import { useListenFundingContributionSuccess } from '@/modules/project/funding/hooks/useListenFundingContributionSuccess'
import { Body } from '@/shared/components/typography'

import { TransactionProcessing, UpdateFundingContributionEmailAddress } from '../components'
import { DownloadRefundButton } from '../components/DownloadRefundButton'
import { swapTransactionAtom } from '../states/onChainTransaction.ts'

export const PaymentOnchainProcessing = () => {
  const { isLoggedIn } = useAuthContext()

  useListenFundingContributionSuccess()

  const swapTransaction = useAtomValue(swapTransactionAtom)

  return (
    <VStack w="full" spacing={6}>
      <TransactionProcessing
        id={'onchain-transaction-processing-card'}
        title={t('Transaction is being processed')}
        subTitle={t(
          'Completion time may vary due to Bitcoin network conditions, such as mempool size and transaction fees. Thank you for your patience.',
        )}
        transactionId={swapTransaction.id}
      />
      <UpdateFundingContributionEmailAddress />
      {isLoggedIn && (
        <VStack w="full" spacing={0} maxWidth="310px">
          <DownloadRefundButton variant="surface" colorScheme="primary1" size="lg" width="310px" />
          <Body size="xs" light>
            {t('Download and securely store your Refund File; if in doubt, re-download to ensure its safety.')}
          </Body>
        </VStack>
      )}
    </VStack>
  )
}
