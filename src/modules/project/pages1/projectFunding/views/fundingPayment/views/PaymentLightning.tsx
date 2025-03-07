import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { PiCopy } from 'react-icons/pi'

import { useListenFundingContributionSuccess } from '@/modules/project/funding/hooks/useListenFundingContributionSuccess'
import { fundingPaymentDetailsAtom } from '@/modules/project/funding/state/fundingPaymentAtom.ts'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton'

import { QRCodeComponent } from '../components/QRCodeComponent'
import { TotalAmountToPay } from '../components/TotalAmountToPay'
import { WaitingForPayment } from '../components/WaitingForPayment'

export const PaymentLightning = () => {
  useListenFundingContributionSuccess()

  const fundingPaymentDetails = useAtomValue(fundingPaymentDetailsAtom)

  const { hasCopied, onCopy } = useCopyToClipboard(fundingPaymentDetails.lightning?.paymentRequest || '')

  if (!fundingPaymentDetails.lightning?.paymentRequest) {
    return null
  }

  return (
    <VStack w="full">
      <QRCodeComponent value={fundingPaymentDetails.lightning.paymentRequest} onClick={onCopy} isColored={hasCopied} />
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
