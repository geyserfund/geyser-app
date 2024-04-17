import { Button, ListItem, UnorderedList } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body2 } from '../../../../../../../../../../../components/typography'
import { useMobileMode } from '../../../../../../../../../../../utils'
import { useDownloadRefund } from '../hooks/useDownloadRefund'
import { FeedbackCard } from './FeedbackCard'

export const PaymentAndRefundInstructions = () => {
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
    <FeedbackCard variant="warning" title={t('Critical payment & refund Instructions')}>
      <UnorderedList>
        <ListItem>
          <strong>Send the exact payment amount in Satoshis</strong> to ensure successful processing and avoid payment
          being rejected.
        </ListItem>
        <ListItem>
          <strong>Set the transaction fee to medium or high</strong> and adjust the fee rate in satoshis per byte
          (sat/B) to ensure your swap processes within 24 hours.
        </ListItem>
        <ListItem>
          <strong>Download and securely store your Refund File;</strong> if in doubt, re-download to ensure its safety.
        </ListItem>
      </UnorderedList>

      <Button variant="secondary" onClick={handleClick}>
        {t('Download refund file')}
      </Button>
      <Body2 pt="10px">{t('For more info on Refund Policies and Fees click here.')}</Body2>
    </FeedbackCard>
  )
}
