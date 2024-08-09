import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiCopy } from 'react-icons/pi'

import { useListenFundingSuccess } from '@/modules/project/funding/hooks/useListenFundingSuccess'
import { useFundingTxAtom } from '@/modules/project/funding/state'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton'

import { QRCodeComponent } from '../components/QRCodeComponent'
import { TotalAmountToPay } from '../components/TotalAmountToPay'
import { WaitingForPayment } from '../components/WaitingForPayment'

export const PaymentLightning = () => {
  useListenFundingSuccess()

  const { fundingTx } = useFundingTxAtom()

  const { hasCopied, onCopy } = useCopyToClipboard(fundingTx.paymentRequest || '')

  if (!fundingTx.paymentRequest) {
    return null
  }

  return (
    <VStack w="full">
      <QRCodeComponent value={fundingTx.paymentRequest} onClick={onCopy} isColored={hasCopied} />
      <TotalAmountToPay />
      <VStack w="full" spacing={6} pt={4}>
        <WaitingForPayment />
        <Button width="310px" size="lg" variant="solid" colorScheme="primary1" onClick={onCopy} rightIcon={<PiCopy />}>
          {t('Copy invoice')}
        </Button>
      </VStack>
    </VStack>
  )
}
