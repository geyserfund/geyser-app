import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'

import { RefundPolicyNote } from '../../../components/RefundPolicyNote'
import { DownloadRefundButton } from './DownloadRefundButton'
import { FeedbackCard } from './FeedbackCard'

export const DownloadRefund = () => {
  const { t } = useTranslation()

  return (
    <FeedbackCard variant="warning" title={t('Do not close this window')}>
      <Body>
        <strong>{t('Download and securely store your Refund File.')}</strong>{' '}
        {t(
          'If you did so, and you have determined that you do not wish to proceed with a refund at this moment, it is completely safe for you to close this window',
        )}
      </Body>
      <DownloadRefundButton />
      <RefundPolicyNote />
    </FeedbackCard>
  )
}
