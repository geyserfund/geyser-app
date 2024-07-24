import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Body2 } from '../../../../../../../../../../../components/typography'
import { commaFormatted } from '../../../../../../../../../../../utils'
import { SwapData } from '../../../../../../../../../funding/state'
import { DownloadRefund, FeedbackCard, TransactionFailed } from '../components'
import { ClaimRefundForm } from '../components/ClaimRefundForm'
import { useSwapTransaction } from '../hooks/useSwapTransaction'
import { useSetOnChainErrorValue } from '../states'
import { extractValuesFromError } from '../utils/parseError'

export const OnChainRefund = ({ refundFile }: { refundFile?: SwapData }) => {
  const { t } = useTranslation()

  const onChainError = useSetOnChainErrorValue()

  useSwapTransaction()

  const errorMessage = useMemo(() => {
    if (!onChainError) return

    switch (onChainError.status) {
      case 'transaction.lockupFailed': {
        const values = extractValuesFromError(onChainError.failureReason || '')

        if (values.locked && values.expected) {
          if (values.locked < values.expected) {
            return `Amount received ${commaFormatted(values.locked)} sats was less than expected ${commaFormatted(
              values.expected,
            )} sats`
          }

          return `Amount received ${commaFormatted(values.locked)} sats was more than expected ${commaFormatted(
            values.expected,
          )} sats`
        }

        return 'Transaction amount was not enough to cover the invoice'
      }

      case 'invoice.failedToPay':
        return 'Failed to pay invoice'
      case 'swap.expired':
        return 'Transaction has expired no payment detected'
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

        <ClaimRefundForm refundFile={refundFile} showUpload={!refundFile} />
      </FeedbackCard>
      <DownloadRefund />
    </>
  )
}
