import { useTranslation } from 'react-i18next'

import { TransactionProcessing } from '../onchain/components'
import { useRefundTransactionId } from '../onchain/states/onChainTransaction'
import { BLOCK_EXPLORER_BASE_URL } from '../onchain/views/OnChainProcessing'

export const RefundInitiated = () => {
  const { t } = useTranslation()
  const refundTransactionId = useRefundTransactionId()

  return (
    <>
      <TransactionProcessing
        title={t('Your refund has been successfully intiated.')}
        subTitle={t(
          'We apologize for any inconvenience caused. In future transactions, please ensure to set a higher transaction fee for timely processing.',
        )}
        //  buttonUrl={`${BLOCK_EXPLORER_BASE_URL}${transactionId}`}
        buttonUrl={`${BLOCK_EXPLORER_BASE_URL}/${refundTransactionId}`}
      />
    </>
  )
}
