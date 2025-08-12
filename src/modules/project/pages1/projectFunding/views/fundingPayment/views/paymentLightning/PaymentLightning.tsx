import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { PiCopy } from 'react-icons/pi'

import { useAuthContext } from '@/context/auth.tsx'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom.ts'
import { useListenFundingContributionSuccess } from '@/modules/project/funding/hooks/useListenFundingContributionSuccess'
import { fundingPaymentDetailsAtom } from '@/modules/project/funding/state/fundingPaymentAtom.ts'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton'
import { ProjectFundingStrategy } from '@/types/index.ts'
import { useMobileMode, useNotification } from '@/utils/index.ts'

import { PaymentAccountPassword } from '../../components/PaymentAccountPassword.tsx'
import { QRCodeComponent } from '../../components/QRCodeComponent'
import { TotalAmountToPay } from '../../components/TotalAmountToPay'
import { WaitingForPayment } from '../../components/WaitingForPayment'

export const PaymentLightning = () => {
  const { project } = useFundingFormAtom()
  const { isLoggedIn } = useAuthContext()

  const [passwordAccepted, setPasswordAccepted] = useState(false)

  const fundingPaymentDetails = useAtomValue(fundingPaymentDetailsAtom)

  if (!fundingPaymentDetails.lightning?.paymentRequest && !fundingPaymentDetails.lightningToRskSwap?.paymentRequest) {
    return null
  }

  if (!passwordAccepted && project.fundingStrategy === ProjectFundingStrategy.AllOrNothing) {
    if (isLoggedIn) {
      return <PaymentAccountPassword onComplete={() => setPasswordAccepted(true)} />
    }

    return <PaymentAccountPassword onComplete={() => setPasswordAccepted(true)} />
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
