import { Text, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import Loader from '../../../../../../../../components/ui/Loader'
import { FundingStatus, InvoiceStatus } from '../../../../../../../../types/generated/graphql'
import { useFundingContext } from '../../../../../../context/FundingProvider'
import { useRefreshInvoice } from '../../../../../../funding/hooks/useRefreshInvoice'
import { useRefundedSwapData } from '../../../../../../funding/state'
import { GeneratingInvoice, InvoiceErrorView, QRCodeImage } from './components'
import { FundingError } from './views/error'
import { RefundInitiated } from './views/refund/RefundInitiated'

enum QRDisplayState {
  REFRESHING = 'REFRESHING',

  AWAITING_PAYMENT = 'AWAITING_PAYMENT',

  AWAITING_PAYMENT_WEB_LN = 'AWAITING_PAYMENT_WEB_LN',

  REFUND_INITIALIZED = 'REFUND_INITIALIZED',

  INVOICE_CANCELLED = 'INVOICE_CANCELLED',

  FUNDING_CANCELED = 'FUNDING_CANCELED',
}

export const QRCodeSection = ({ onCloseClick }: { onCloseClick: () => void }) => {
  const { t } = useTranslation()
  const [refundedSwapData] = useRefundedSwapData()
  const { invoiceRefreshErrored, invoiceRefreshLoading, refreshFundingInvoice } = useRefreshInvoice()

  const { fundingTx, fundingRequestErrored, fundingRequestLoading, hasWebLN, weblnErrored, error, retryFundingFlow } =
    useFundingContext()
  console.log('chekcing refund transactionId in qrcodesection:', refundedSwapData)
  const qrDisplayState = useMemo(() => {
    if (invoiceRefreshLoading || fundingRequestLoading) {
      return QRDisplayState.REFRESHING
    }

    if (fundingRequestErrored || error || fundingTx.status === FundingStatus.Canceled) {
      return QRDisplayState.FUNDING_CANCELED
    }

    if (fundingTx.invoiceStatus === InvoiceStatus.Canceled || invoiceRefreshErrored) {
      return QRDisplayState.INVOICE_CANCELLED
    }

    if (refundedSwapData?.refundTx) {
      return QRDisplayState.REFUND_INITIALIZED
    }

    if (hasWebLN && !weblnErrored) {
      return QRDisplayState.AWAITING_PAYMENT_WEB_LN
    }

    return QRDisplayState.AWAITING_PAYMENT
  }, [
    invoiceRefreshLoading,
    fundingRequestLoading,
    fundingRequestErrored,
    fundingTx.status,
    fundingTx.invoiceStatus,
    invoiceRefreshErrored,
    hasWebLN,
    weblnErrored,
    refundedSwapData?.refundTx,
    error,
  ])

  const renderQRCodeSection = () => {
    switch (qrDisplayState) {
      case QRDisplayState.AWAITING_PAYMENT:
        return <QRCodeImage />

      case QRDisplayState.REFUND_INITIALIZED:
        return <RefundInitiated />

      case QRDisplayState.AWAITING_PAYMENT_WEB_LN:
        return (
          <VStack width={'350px'} height={'335px'} justifyContent={'center'}>
            <VStack>
              <Loader />
              <Text>{t('Awaiting Payment')}</Text>
            </VStack>
          </VStack>
        )
      case QRDisplayState.INVOICE_CANCELLED:
        return <InvoiceErrorView onRefreshSelected={refreshFundingInvoice} />

      case QRDisplayState.FUNDING_CANCELED:
        return <FundingError onCloseClick={onCloseClick} />

      default:
        return <GeneratingInvoice refreshInvoice={retryFundingFlow} />
    }
  }

  return <>{renderQRCodeSection()}</>
}
