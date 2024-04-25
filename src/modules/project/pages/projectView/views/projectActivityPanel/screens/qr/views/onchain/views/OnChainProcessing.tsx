import { useTranslation } from 'react-i18next'

import { TransactionProcessing } from '../components'
import { UpdateFundingTxEmailAddress } from '../components/UpdateFundingTxEmailAddress'
import { useSwapTransaction } from '../hooks/useSwapTransaction'

export const BLOCK_EXPLORER_BASE_URL = 'https://mempool.space/tx/'

export const OnChainProcessing = () => {
  const { t } = useTranslation()
  const transaction = useSwapTransaction()

  return (
    <>
      <TransactionProcessing
        title={t('Transaction is being processed...')}
        subTitle={t(
          'Completion time may vary due to Bitcoin network conditions, such as mempool size and transaction fees. Thank you for your patience.',
        )}
        buttonUrl={`${BLOCK_EXPLORER_BASE_URL}${transaction.hex}`}
      />
      <UpdateFundingTxEmailAddress />
    </>
  )
}
