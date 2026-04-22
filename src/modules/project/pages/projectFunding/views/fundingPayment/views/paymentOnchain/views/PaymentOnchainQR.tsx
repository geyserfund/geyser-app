import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { PiCopy, PiLink } from 'react-icons/pi'

import { fundingPaymentDetailsAtom } from '@/modules/project/funding/state/fundingPaymentAtom.ts'
import { currentOnChainToRskSwapIdAtom, currentSwapIdAtom } from '@/modules/project/funding/state/swapAtom.ts'
import { __development__ } from '@/shared/constants/index.ts'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton'
import { getBip21Invoice } from '@/utils/lightning/bip21'

import { QRCodeComponent } from '../../../components/QRCodeComponent'
import { TotalAmountToPay } from '../../../components/TotalAmountToPay'
import { WaitingForPayment } from '../../../components/WaitingForPayment'
import { useListenOnchainTransactionUpdate } from '../hooks/useListenOnchainTransactionUpdate'

export const PaymentOnchainQR = () => {
  const fundingPaymentDetails = useAtomValue(fundingPaymentDetailsAtom)
  const address = fundingPaymentDetails.onChainToRskSwap?.address
  const amountDue = fundingPaymentDetails.onChainToRskSwap?.amountDue

  if (!address || !amountDue || amountDue <= 0) {
    return null
  }

  return <PaymentOnchainQRContent address={address} totalAmountSats={amountDue} />
}

export const PaymentOnchainQRContent = ({
  address,
  totalAmountSats,
}: {
  address: string
  totalAmountSats: number
}) => {
  useListenOnchainTransactionUpdate()

  const currentOnchainToRskSwapId = useAtomValue(currentOnChainToRskSwapIdAtom)
  const setCurrentSwapId = useSetAtom(currentSwapIdAtom)

  const onChainBip21Invoice = __development__
    ? `address=${address} amount=${totalAmountSats}`
    : getBip21Invoice(totalAmountSats, address)

  const { onCopy: onCopyBip21Invoice, hasCopied: hasCopiedBip21Invoice } = useCopyToClipboard(onChainBip21Invoice)

  useEffect(() => {
    if (currentOnchainToRskSwapId) {
      setCurrentSwapId(currentOnchainToRskSwapId)
    }
  }, [currentOnchainToRskSwapId, setCurrentSwapId])

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
    </VStack>
  )
}
