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

  return (
    <>
      <TransactionFailed error={onChainError} />
      <FeedbackCard variant="primary" title={t('Claim refund')}>
        <Body2>
          {t(
            'Do you wish to initiate a refund now? You can request a refund at any time if you have your refund file ready.',
          )}
        </Body2>

        <ClaimRefundForm showUpload={!refundFile} />
      </FeedbackCard>
      <DownloadRefund />
    </>
  )
}
