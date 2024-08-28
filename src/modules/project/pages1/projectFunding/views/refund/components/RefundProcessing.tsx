import { useTranslation } from 'react-i18next'

import { TransactionProcessing } from '@/modules/project/pages1/projectFunding/views/fundingPayment/views/paymentOnchain/components'

import { CardLayoutProps } from '../../../../../../../shared/components/layouts'
import { useRefundedSwapData } from '../../../../../funding/state'

export const RefundProcessing = (props: CardLayoutProps) => {
  const { t } = useTranslation()
  const [refundedSwapData] = useRefundedSwapData()

  return (
    <TransactionProcessing
      id="refund-initiated-card"
      title={t('Your refund has been successfully intiated.')}
      subTitle={t('We apologize for any inconvenience caused.')}
      transactionId={refundedSwapData?.refundTx ? refundedSwapData?.refundTx : undefined}
      {...props}
    />
  )
}
