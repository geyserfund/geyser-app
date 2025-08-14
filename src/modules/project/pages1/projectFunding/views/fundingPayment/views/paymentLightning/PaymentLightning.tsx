import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { PiCopy } from 'react-icons/pi'

import { useListenFundingContributionSuccess } from '@/modules/project/funding/hooks/useListenFundingContributionSuccess'
import { fundingPaymentDetailsAtom } from '@/modules/project/funding/state/fundingPaymentAtom.ts'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton'
import { useMobileMode, useNotification } from '@/utils/index.ts'

import { QRCodeComponent } from '../../components/QRCodeComponent'
import { TotalAmountToPay } from '../../components/TotalAmountToPay'
import { WaitingForPayment } from '../../components/WaitingForPayment'

export const PaymentLightning = () => {
  const fundingPaymentDetails = useAtomValue(fundingPaymentDetailsAtom)

  if (!fundingPaymentDetails.lightning?.paymentRequest && !fundingPaymentDetails.lightningToRskSwap?.paymentRequest) {
    return null
  }

  return (
    <PaymentLightningContent
      paymentRequest={
        fundingPaymentDetails.lightning?.paymentRequest ||
        fundingPaymentDetails.lightningToRskSwap?.paymentRequest ||
        ''
      }
    />
  )
}

export const PaymentLightningContent = ({ paymentRequest }: { paymentRequest: string }) => {
  useListenFundingContributionSuccess()

  const isMobile = useMobileMode()

  const toast = useNotification()

  const { hasCopied, onCopy } = useCopyToClipboard(paymentRequest)

  const handleCopy = () => {
    onCopy()
    toast.success({
      title: t('Invoice copied to clipboard'),
    })
  }

  /** Handles opening lightning payment in mobile wallets */
  const handleLightningPayment = () => {
    if (!paymentRequest) return

    // Lightning invoice URI scheme
    const lightningUri = `lightning:${paymentRequest}`

    // Only attempt to open lightning wallets on mobile devices
    if (isMobile) {
      const a = document.createElement('a')
      a.href = lightningUri
      a.rel = 'noopener noreferrer'
      a.click()
      a.remove()
    } else {
      handleCopy()
    }
  }

  return (
    <VStack w="full">
      <QRCodeComponent value={paymentRequest} onClick={handleLightningPayment} isColored={hasCopied} />
      <TotalAmountToPay />
      <VStack w="full" spacing={6} pt={4}>
        <WaitingForPayment />
        <Button
          id={'copy-lightning-invoice-button'}
          width="310px"
          size="lg"
          variant="solid"
          colorScheme="primary1"
          onClick={onCopy}
          rightIcon={<PiCopy />}
        >
          {t('Copy invoice')}
        </Button>
      </VStack>
    </VStack>
  )
}
