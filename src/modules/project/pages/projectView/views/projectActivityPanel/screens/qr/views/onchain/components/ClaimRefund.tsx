import { t } from 'i18next'

import { Body2 } from '../../../../../../../../../../../components/typography'
import { ClaimRefundForm } from './ClaimRefundForm'
import { FeedbackCard } from './FeedbackCard'

export const ClaimRefund = () => {
  return (
    <FeedbackCard variant="primary" title={t('Claim refund')}>
      <Body2>
        {t(
          'Do you wish to initiate a refund now? You can request a refund at any time if you have your refund file ready.',
        )}
      </Body2>

      <ClaimRefundForm />
    </FeedbackCard>
  )
}
