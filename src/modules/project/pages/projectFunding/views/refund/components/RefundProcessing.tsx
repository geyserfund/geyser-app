import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'

import { TransactionProcessing } from '@/modules/project/pages/projectFunding/views/fundingPayment/views/paymentOnchain/components'
import { CardLayoutProps } from '@/shared/components/layouts/CardLayout'

import { refundedSwapDataAtom } from '../../../../../funding/state/swapAtom.ts'

export const RefundProcessing = (props: CardLayoutProps) => {
  const { t } = useTranslation()
  const refundedSwapData = useAtomValue(refundedSwapDataAtom)

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
