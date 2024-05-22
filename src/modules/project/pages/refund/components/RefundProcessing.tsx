import { useTranslation } from 'react-i18next'

import { CardLayoutProps } from '../../../../../components/layouts'
import { useRefundedSwapData } from '../../../funding/state'
import { TransactionProcessing } from '../../projectView/views/projectActivityPanel/screens/qr/views/onchain/components'
import { BLOCK_EXPLORER_BASE_URL } from '../../projectView/views/projectActivityPanel/screens/qr/views/onchain/views/OnChainProcessing'

export const RefundProcessing = (props: CardLayoutProps) => {
  const { t } = useTranslation()
  const [refundedSwapData] = useRefundedSwapData()

  return (
    <TransactionProcessing
      id="refund-initiated-card"
      title={t('Your refund has been successfully intiated.')}
      subTitle={t('We apologize for any inconvenience caused.')}
      buttonUrl={refundedSwapData?.refundTx ? `${BLOCK_EXPLORER_BASE_URL}${refundedSwapData?.refundTx}` : undefined}
      {...props}
    />
  )
}
