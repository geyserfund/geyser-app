import { Button, Link } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'

import { Body1, Body2 } from '../../../../../../../../../../../components/typography'
import { GeyserFAQUrl } from '../../../../../../../../../../../constants'
import { useMobileMode } from '../../../../../../../../../../../utils'
import { RefundPolicyNote } from '../../../components'
import { useDownloadRefund } from '../hooks/useDownloadRefund'
import { FeedbackCard } from './FeedbackCard'

export const DownloadRefund = () => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  const { downloadRefundJson, downloadRefundQr } = useDownloadRefund()

  const handleClick = () => {
    if (isMobile) {
      downloadRefundQr()
    } else {
      downloadRefundJson()
    }
  }

  return (
    <FeedbackCard variant="warning" title={t('Do not close this window')}>
      <Body1>
        <strong>{t('Download and securely store your Refund File.')}</strong>{' '}
        {t(
          'If you did so, and you have determined that you do not wish to proceed with a refund at this moment, it is completely safe for you to close this window',
        )}
      </Body1>
      <Button variant="secondary" onClick={handleClick}>
        {t('Download refund file')}
      </Button>
      <RefundPolicyNote />
    </FeedbackCard>
  )
}
