import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { PiCopy, PiLink } from 'react-icons/pi'

import { fundingPaymentDetailsAtom } from '@/modules/project/funding/state/fundingPaymentAtom.ts'
import { currentOnChainToRskSwapIdAtom, currentSwapIdAtom } from '@/modules/project/funding/state/swapAtom.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { __development__ } from '@/shared/constants/index.ts'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton'
import { PaymentFeePayer, PaymentFeeType } from '@/types/index.ts'
import { isAllOrNothing } from '@/utils/index.ts'
import { ProjectFundingStrategy } from '@/types/index.ts'
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

  const { project } = useProjectAtom()
  const creatorRskAddress = project?.owners?.[0]?.user?.accountKeys?.rskKeyPair?.address || ''
  const isPrismTia = project?.fundingStrategy === ProjectFundingStrategy.TakeItAll && Boolean(creatorRskAddress)
  const isRskSwapFlow = isAllOrNothing(project) || isPrismTia
  const currentOnchainToRskSwapId = useAtomValue(currentOnChainToRskSwapIdAtom)
  const setCurrentSwapId = useSetAtom(currentSwapIdAtom)

  const fundingPaymentDetails = useAtomValue(fundingPaymentDetailsAtom)

  const onChainSwapContributorFees =
    fundingPaymentDetails.onChainSwap?.fees.reduce(
      (acc, fee) =>
        fee.feePayer === PaymentFeePayer.Contributor && fee.feeType !== PaymentFeeType.Tip ? acc + fee.feeAmount : acc,
      0,
    ) || 0

  const totalAmountSats =
    (fundingPaymentDetails.onChainSwap?.amountDue || 0) + onChainSwapContributorFees ||
    fundingPaymentDetails.onChainToRskSwap?.amountDue ||
    0

  console.log('onChainSwapContributorFees', onChainSwapContributorFees)
  console.log('fundingPaymentDetails.onChainSwap?.amountDue', fundingPaymentDetails.onChainSwap?.amountDue)
  console.log('fundingPaymentDetails.onChainToRskSwap?.amountDue', fundingPaymentDetails.onChainToRskSwap?.amountDue)

  const onChainBip21Invoice = __development__
    ? `address=${address} amount=${totalAmountSats}`
    : getBip21Invoice(totalAmountSats, address)

  const { onCopy: onCopyBip21Invoice, hasCopied: hasCopiedBip21Invoice } = useCopyToClipboard(onChainBip21Invoice)

  useEffect(() => {
    if (isRskSwapFlow && currentOnchainToRskSwapId) {
      setCurrentSwapId(currentOnchainToRskSwapId)
    }
  }, [isRskSwapFlow, currentOnchainToRskSwapId, setCurrentSwapId])

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
