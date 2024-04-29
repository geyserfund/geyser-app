import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Body2 } from '../../../../../../../../../../../components/typography'
import { useRefundFileValue } from '../../../../../../../../../funding/state'
import { DownloadRefund, FeedbackCard, TransactionFailed } from '../components'
import { ClaimRefundForm } from '../components/ClaimRefundForm'
import { useSwapTransaction } from '../hooks/useSwapTransaction'
import { useSetOnChainErrorValue } from '../states'

export const OnChainRefund = () => {
  const { t } = useTranslation()
  const refundFile = useRefundFileValue()
  const onChainError = useSetOnChainErrorValue()

  useSwapTransaction()

  const errorMessage = useMemo(() => {
    if (!onChainError) return

    switch (onChainError.status) {
      case 'transaction.lockupFailed':
        return 'Transaction fee set was not high enough to ensure transaction within 24 hours'

      case 'invoice.failedToPay':
        return 'Transaction amount was not enough to cover the invoice'
      case 'swap.expired':
        return 'Transaction has expired'
      default:
        return onChainError.failureReason || 'Transaction failed'
    }
  }, [onChainError])

  return (
    <>
      <TransactionFailed error={errorMessage} />
      <FeedbackCard variant="primary" title={t('Claim refund')}>
        <Body2>
          {t('You can get your payment refund now or at a later point in time with the use of the refund file.')}
        </Body2>

        <ClaimRefundForm showUpload={!refundFile} />
      </FeedbackCard>
      <DownloadRefund />
    </>
  )
}
