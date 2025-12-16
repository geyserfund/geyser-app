import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { PiCopy } from 'react-icons/pi'
import { useLocation, useNavigate } from 'react-router'

import { useListenFundingContributionSuccess } from '@/modules/project/funding/hooks/useListenFundingContributionSuccess.ts'
import { fundingContributionAtom } from '@/modules/project/funding/state/fundingContributionAtom.ts'
import { fundingPaymentDetailsAtom } from '@/modules/project/funding/state/fundingPaymentAtom.ts'
import {
  currentLightningToRskSwapIdAtom,
  currentSwapIdAtom,
  swapAtom,
} from '@/modules/project/funding/state/swapAtom.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton'
import { PaymentStatus, PaymentType } from '@/types/index.ts'
import { isAllOrNothing, useMobileMode, useNotification } from '@/utils/index.ts'

import { QRCodeComponent } from '../../components/QRCodeComponent'
import { TotalAmountToPay } from '../../components/TotalAmountToPay'
import { WaitingForPayment } from '../../components/WaitingForPayment'
import { useTransactionStatusUpdate } from '../paymentOnchain/hooks/useTransactionStatusUpdate.ts'

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

  const { project } = useProjectAtom()
  const isAon = isAllOrNothing(project)

  const currentLightningToRskSwapId = useAtomValue(currentLightningToRskSwapIdAtom)
  const setCurrentSwapId = useSetAtom(currentSwapIdAtom)

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

  useEffect(() => {
    if (isAon && currentLightningToRskSwapId) {
      setCurrentSwapId(currentLightningToRskSwapId)
    }
  }, [isAon, currentLightningToRskSwapId, setCurrentSwapId])

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
      {isAon && <PaymentLightningAonComponent />}
    </VStack>
  )
}

export const PaymentLightningAonComponent = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { project } = useProjectAtom()

  const [fundingContribution, setFundingContribution] = useAtom(fundingContributionAtom)
  const currentLightningToRskSwapId = useAtomValue(currentLightningToRskSwapIdAtom)

  const allSwaps = useAtomValue(swapAtom)
  const currentSwap = allSwaps[currentLightningToRskSwapId]

  const handleConfirmed = () => {
    const payments = fundingContribution.payments.map((payment) => {
      if (payment.paymentType === PaymentType.LightningToRskSwap) {
        return {
          ...payment,
          status: PaymentStatus.Pending,
        }
      }

      return payment
    })

    setFundingContribution({
      ...fundingContribution,
      payments,
    })

    navigate({ pathname: getPath('fundingSuccess', project.name), search: location.search })
  }

  const handleFailed = () => {
    navigate({ pathname: getPath('fundingPaymentFailed', project.name), search: location.search })
  }

  useTransactionStatusUpdate({
    handleConfirmed,
    handleFailed,
    swapId: currentSwap?.id,
  })

  return null
}
