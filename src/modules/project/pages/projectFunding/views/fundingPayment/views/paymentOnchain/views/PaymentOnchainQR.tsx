import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { PiCopy, PiLink } from 'react-icons/pi'

import { useListenFundingContributionSuccess } from '@/modules/project/funding/hooks/useListenFundingContributionSuccess.ts'
import { fundingContributionAtom } from '@/modules/project/funding/state/fundingContributionAtom.ts'
import { fundingPaymentDetailsAtom } from '@/modules/project/funding/state/fundingPaymentAtom.ts'
import { currentOnChainToRskSwapIdAtom, currentSwapIdAtom } from '@/modules/project/funding/state/swapAtom.ts'
import { __development__ } from '@/shared/constants/index.ts'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton'
import type { BitcoinQuote } from '@/types/index.ts'
import { getBip21Invoice } from '@/utils/lightning/bip21'

import { QRCodeComponent } from '../../../components/QRCodeComponent'
import { TotalAmountToPay } from '../../../components/TotalAmountToPay'
import { WaitingForPayment } from '../../../components/WaitingForPayment'
import { useListenOnchainTransactionUpdate } from '../hooks/useListenOnchainTransactionUpdate'

export const PaymentOnchainQR = () => {
  const fundingContribution = useAtomValue(fundingContributionAtom)
  const fundingPaymentDetails = useAtomValue(fundingPaymentDetailsAtom)
  const legacyManagedPayment = fundingPaymentDetails.strike?.address ? fundingPaymentDetails.strike : undefined
  const managedPayment = fundingPaymentDetails.strikeOnChain?.address
    ? fundingPaymentDetails.strikeOnChain
    : legacyManagedPayment
  const managedAddress = managedPayment?.address
  const address = managedAddress || fundingPaymentDetails.onChainToRskSwap?.address
  const amountDue = managedPayment?.amountDue || fundingPaymentDetails.onChainToRskSwap?.amountDue

  if (!address || !amountDue || amountDue <= 0) {
    return null
  }

  if (managedAddress) {
    return (
      <ManagedPaymentOnchainQRContent
        address={address}
        totalAmountSats={amountDue}
        bitcoinQuote={fundingContribution.bitcoinQuote}
        deriveBip21
      />
    )
  }

  return (
    <PaymentOnchainQRContent
      address={address}
      totalAmountSats={amountDue}
      bitcoinQuote={fundingContribution.bitcoinQuote}
    />
  )
}

const ManagedPaymentOnchainQRContent = (props: {
  address: string
  totalAmountSats: number
  bitcoinQuote?: BitcoinQuote | null
  deriveBip21?: boolean
}) => {
  useListenFundingContributionSuccess()
  return <PaymentOnchainQRDisplay {...props} />
}

export const PaymentOnchainQRContent = ({
  address,
  totalAmountSats,
  bitcoinQuote,
}: {
  address: string
  totalAmountSats: number
  bitcoinQuote?: BitcoinQuote | null
}) => {
  useListenOnchainTransactionUpdate()

  const currentOnchainToRskSwapId = useAtomValue(currentOnChainToRskSwapIdAtom)
  const setCurrentSwapId = useSetAtom(currentSwapIdAtom)

  useEffect(() => {
    if (currentOnchainToRskSwapId) {
      setCurrentSwapId(currentOnchainToRskSwapId)
    }
  }, [currentOnchainToRskSwapId, setCurrentSwapId])

  return <PaymentOnchainQRDisplay address={address} totalAmountSats={totalAmountSats} bitcoinQuote={bitcoinQuote} />
}

const PaymentOnchainQRDisplay = ({
  address,
  totalAmountSats,
  bitcoinQuote,
  deriveBip21 = false,
}: {
  address: string
  totalAmountSats: number
  bitcoinQuote?: BitcoinQuote | null
  deriveBip21?: boolean
}) => {
  const onChainBip21Invoice =
    deriveBip21 || !__development__
      ? getBip21Invoice(totalAmountSats, address)
      : `address=${address} amount=${totalAmountSats}`

  const { onCopy: onCopyBip21Invoice, hasCopied: hasCopiedBip21Invoice } = useCopyToClipboard(onChainBip21Invoice)

  return (
    <VStack flexWrap="wrap" width="100%" spacing={6}>
      <VStack w="full">
        <QRCodeComponent value={onChainBip21Invoice} onClick={onCopyBip21Invoice} isColored={hasCopiedBip21Invoice} />
        <TotalAmountToPay amountDueSats={totalAmountSats} bitcoinQuote={bitcoinQuote} />
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
