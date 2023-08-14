import { Text, VStack } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Loader from '../../../../../components/ui/Loader'
import { UseFundingFlowReturn } from '../../../../../hooks'
import {
  FundingStatus,
  InvoiceStatus,
} from '../../../../../types/generated/graphql'
import { getBip21Invoice } from '../../../../../utils/lightning/bip21'
import {
  FundingErrorView,
  GeneratingInvoice,
  InvoiceErrorView,
  QRCodeImage,
} from './components'

type Props = {
  fundingFlow: UseFundingFlowReturn
}

export enum PaymentMethods {
  LIGHTNING = 'LIGHTNING',
  ONCHAIN = 'ONCHAIN',
}

enum QRDisplayState {
  REFRESHING = 'REFRESHING',

  AWAITING_PAYMENT = 'AWAITING_PAYMENT',

  AWAITING_PAYMENT_WEB_LN = 'AWAITING_PAYMENT_WEB_LN',

  INVOICE_CANCELLED = 'INVOICE_CANCELLED',

  FUNDING_CANCELED = 'FUNDING_CANCELED',
}

export const QRCodeSection = ({ fundingFlow }: Props) => {
  const { t } = useTranslation()

  const [lightningInvoice, setLightningInvoice] = useState<string>('')
  const [onchainAddress, setOnchainAddress] = useState<string>('')

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>(
    PaymentMethods.LIGHTNING,
  )

  const {
    fundingTx,
    fundingRequestErrored,
    invoiceRefreshErrored,
    invoiceRefreshLoading,
    fundingRequestLoading,
    hasWebLN,
    weblnErrored,
    error,
    refreshFundingInvoice,
    retryFundingFlow,
  } = fundingFlow

  const qrDisplayState = useMemo(() => {
    if (invoiceRefreshLoading || fundingRequestLoading) {
      return QRDisplayState.REFRESHING
    }

    if (fundingRequestErrored || fundingTx.status === FundingStatus.Canceled) {
      return QRDisplayState.FUNDING_CANCELED
    }

    if (
      fundingTx.invoiceStatus === InvoiceStatus.Canceled ||
      invoiceRefreshErrored
    ) {
      return QRDisplayState.INVOICE_CANCELLED
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
  ])

  useEffect(() => {
    const { id, paymentRequest, address, amount } = fundingTx

    if (id === 0) {
      setOnchainAddress('')
      setLightningInvoice('')
      // setFallbackAddress('')
      return
    }

    // setFallbackAddress(getBip21Invoice(amount, address, paymentRequest))
    setOnchainAddress(getBip21Invoice(amount, address))
    setLightningInvoice(paymentRequest || '')
  }, [
    fundingTx,
    fundingTx.paymentRequest,
    fundingTx.address,
    refreshFundingInvoice,
  ])

  switch (qrDisplayState) {
    case QRDisplayState.AWAITING_PAYMENT:
      return (
        <QRCodeImage
          {...{
            paymentMethod,
            setPaymentMethod,
            lightningInvoice,
            onchainAddress,
          }}
        />
      )

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
      return <FundingErrorView error={error} />

    default:
      return <GeneratingInvoice refreshInvoice={retryFundingFlow} />
  }
}
