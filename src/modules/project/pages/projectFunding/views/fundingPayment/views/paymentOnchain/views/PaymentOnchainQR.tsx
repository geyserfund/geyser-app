import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { PiCopy, PiLink } from 'react-icons/pi'

import { fundingPaymentDetailsAtom } from '@/modules/project/funding/state/fundingPaymentAtom.ts'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton'
import { getBip21Invoice } from '@/utils/lightning/bip21'

import { QRCodeComponent } from '../../../components/QRCodeComponent'
import { TotalAmountToPay } from '../../../components/TotalAmountToPay'
import { WaitingForPayment } from '../../../components/WaitingForPayment'
import { PaymentAndRefundInstructions } from '../components'
import { useListenOnchainTransactionUpdate } from '../hooks/useListenOnchainTransactionUpdate'

export const PaymentOnchainQR = () => {
  const fundingPaymentDetails = useAtomValue(fundingPaymentDetailsAtom)
  if (!fundingPaymentDetails.onChainSwap?.address && !fundingPaymentDetails.onChainToRskSwap?.address) {
    return null
  }

  return (
    <PaymentOnchainQRContent
      address={fundingPaymentDetails.onChainSwap?.address || fundingPaymentDetails.onChainToRskSwap?.address || ''}
    />
  )
}

export const PaymentOnchainQRContent = ({ address }: { address: string }) => {
  useListenOnchainTransactionUpdate()

  const fundingPaymentDetails = useAtomValue(fundingPaymentDetailsAtom)
  const totalAmountSats =
    fundingPaymentDetails.onChainSwap?.amountDue || fundingPaymentDetails.onChainToRskSwap?.amountDue || 0

  const onChainBip21Invoice = getBip21Invoice(totalAmountSats, address)

  const { onCopy: onCopyBip21Invoice, hasCopied: hasCopiedBip21Invoice } = useCopyToClipboard(onChainBip21Invoice)

  return (
    <VStack flexWrap="wrap" width="100%" spacing={6}>
      <VStack w="full">
        <QRCodeComponent value={onChainBip21Invoice} onClick={onCopyBip21Invoice} isColored={hasCopiedBip21Invoice} />
        <TotalAmountToPay />
      </VStack>
      <WaitingForPayment />

      <Button
        id="copy-onchain-address-button"
        size="lg"
        minWidth="310px"
        leftIcon={hasCopiedBip21Invoice ? <PiLink /> : <PiCopy />}
        onClick={onCopyBip21Invoice}
        variant="solid"
        colorScheme="primary1"
        isDisabled={!onChainBip21Invoice}
      >
        {hasCopiedBip21Invoice ? t('Copied!') : t('Copy onchain address')}
      </Button>

      <PaymentAndRefundInstructions />
    </VStack>
  )
}
