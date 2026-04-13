import { Button, HStack, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useMemo, useState } from 'react'
import { useAtomValue } from 'jotai'
import Confetti from 'react-confetti'
import { PiCopy, PiDownloadSimple, PiLink } from 'react-icons/pi'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import {
  currentLightningToRskSwapIdAtom,
  currentOnChainToRskSwapIdAtom,
} from '@/modules/project/funding/state/swapAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'
import { __development__, FundingErrorUrl } from '@/shared/constants/index.ts'
import { lightModeColors } from '@/shared/styles/colors.ts'
import { SuccessImageBackgroundGradient } from '@/shared/styles/custom.ts'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton'
import {
  FundingContributionFragment,
  FundingContributionPaymentDetailsFragment,
  PaymentFeePayer,
  PaymentFeeType,
} from '@/types/index.ts'
import { commaFormatted, useMobileMode, useNotification } from '@/utils/index.ts'
import { getBip21Invoice } from '@/utils/lightning/bip21'

import { QRCodeComponent } from '../../../../projectFunding/views/fundingPayment/components/QRCodeComponent'
import { WaitingForPayment } from '../../../../projectFunding/views/fundingPayment/components/WaitingForPayment'
import { TransactionProcessing } from '../../../../projectFunding/views/fundingPayment/views/paymentOnchain/components/TransactionProcessing.tsx'
import { useDownloadRefund } from '../../../../projectFunding/views/fundingPayment/views/paymentOnchain/hooks/useDownloadRefund'
import {
  useTransactionStatusUpdate,
  type SwapStatusUpdate,
} from '../../../../projectFunding/views/fundingPayment/views/paymentOnchain/hooks/useTransactionStatusUpdate.ts'
import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'
import { LAUNCH_FEE_USD_CENTS } from '../constants/launchFees.ts'
import { useListenToContributionConfirmed } from '../hooks/useListenToContributionConfirmed.ts'
import { LaunchPaymentMethod } from './LaunchPaymentMethodSelection.tsx'
import { ProjectLaunchStrategy } from './LaunchStrategySelection.tsx'

const getTotalBitcoinAmount = (
  paymentMethod: LaunchPaymentMethod,
  paymentsData: FundingContributionPaymentDetailsFragment,
): number => {
  if (paymentMethod === LaunchPaymentMethod.Onchain) {
    const contributorOnChainFees =
      paymentsData.onChainSwap?.fees.reduce((acc, fee) => {
        if (fee.feePayer === PaymentFeePayer.Contributor && fee.feeType !== PaymentFeeType.Tip) {
          return acc + fee.feeAmount
        }

        return acc
      }, 0) || 0

    if (paymentsData.onChainSwap) {
      return paymentsData.onChainSwap.amountDue + contributorOnChainFees
    }

    return paymentsData.onChainToRskSwap?.amountDue || 0
  }

  return paymentsData.lightningToRskSwap?.amountDue || 0
}

/** Bitcoin payment screen for the launch fee across Lightning and on-chain payment paths. */
export const LaunchFees = ({
  paymentMethod,
  handleNext,
  handleBack,
  strategy,
  contributionData,
  paymentsData,
}: {
  paymentMethod: LaunchPaymentMethod
  handleNext: () => void
  handleBack: () => void
  strategy: ProjectLaunchStrategy
  contributionData: FundingContributionFragment
  paymentsData: FundingContributionPaymentDetailsFragment
}) => {
  const isMobile = useMobileMode()
  const toast = useNotification()
  const { buttonProps: refundButtonProps } = useDownloadRefund()

  const { project, partialUpdateProject } = useProjectAtom()
  const currentLightningToRskSwapId = useAtomValue(currentLightningToRskSwapIdAtom)
  const currentOnChainToRskSwapId = useAtomValue(currentOnChainToRskSwapIdAtom)

  const [isPaid, setIsPaid] = useState(false)
  const [hasUnlockedOnchainFlow, setHasUnlockedOnchainFlow] = useState(!paymentsData.onChainSwap?.swapJson)
  const [isAwaitingConfirmation, setIsAwaitingConfirmation] = useState(false)
  const [processingTransactionId, setProcessingTransactionId] = useState('')

  const launchFeeUsd = LAUNCH_FEE_USD_CENTS[strategy] / 100
  const totalSats = getTotalBitcoinAmount(paymentMethod, paymentsData)

  const lightningPaymentRequest = paymentsData.lightningToRskSwap?.paymentRequest || ''
  const onChainAddress = paymentsData.onChainSwap?.address || paymentsData.onChainToRskSwap?.address || ''
  const onChainBip21Invoice =
    onChainAddress && totalSats
      ? __development__
        ? `address=${onChainAddress} amount=${totalSats}`
        : getBip21Invoice(totalSats, onChainAddress)
      : ''
  const requiresRefundDownload = Boolean(paymentsData.onChainSwap?.swapJson)
  const launchSwapId =
    paymentMethod === LaunchPaymentMethod.Onchain
      ? currentOnChainToRskSwapId || undefined
      : currentLightningToRskSwapId || undefined

  useEffect(() => {
    setHasUnlockedOnchainFlow(!requiresRefundDownload)
  }, [requiresRefundDownload])

  useEffect(() => {
    if (isPaid) {
      setIsAwaitingConfirmation(false)
    }
  }, [isPaid])

  const { hasCopied: hasCopiedLightning, onCopy: onCopyLightning } = useCopyToClipboard(lightningPaymentRequest)
  const { hasCopied: hasCopiedOnchain, onCopy: onCopyOnchain } = useCopyToClipboard(onChainBip21Invoice)

  const launchCopy = useMemo(
    () => ({
      intro:
        paymentMethod === LaunchPaymentMethod.Onchain
          ? t('Please pay the launch fee with Bitcoin on-chain to continue.')
          : t('Please pay the launch fee with Bitcoin Lightning to continue.'),
      waitingTitle:
        paymentMethod === LaunchPaymentMethod.Onchain
          ? t('Send the exact amount from your Bitcoin wallet.')
          : t('Scan and pay invoice with Bitcoin Lightning.'),
    }),
    [paymentMethod],
  )

  const launchIntro = isAwaitingConfirmation
    ? t('Your payment was received. You will be able to launch the project once the confirmation is complete.')
    : launchCopy.intro

  const onCompleted = () => {
    setIsPaid(true)
    partialUpdateProject({ paidLaunch: true })
  }

  useListenToContributionConfirmed({
    contributionId: contributionData.id,
    onCompleted,
  })

  const handleSwapProcessing = (update?: SwapStatusUpdate) => {
    setIsAwaitingConfirmation(true)
    setProcessingTransactionId(update?.transaction?.id || '')
  }

  useTransactionStatusUpdate({
    swapId: launchSwapId,
    handleProcessing: handleSwapProcessing,
    handleConfirmed: handleSwapProcessing,
    handleClaimCoins: handleSwapProcessing,
    handleClaimed: handleSwapProcessing,
  })

  const handleLightningCopy = () => {
    onCopyLightning()
    toast.success({
      title: t('Invoice copied to clipboard'),
    })
  }

  const handleOnchainCopy = () => {
    onCopyOnchain()
    toast.success({
      title: t('Address copied to clipboard'),
    })
  }

  const handleLightningPayment = () => {
    if (!lightningPaymentRequest) {
      return
    }

    const lightningUri = `lightning:${lightningPaymentRequest}`

    if (isMobile) {
      const a = document.createElement('a')
      a.href = lightningUri
      a.rel = 'noopener noreferrer'
      a.click()
      a.remove()
    } else {
      handleLightningCopy()
    }
  }

  const renderSuccessContent = () => {
    return (
      <CardLayout mobileDense w="full" padding={0} alignItems="center">
        <Confetti
          gravity={0.07}
          numberOfPieces={250}
          colors={[
            lightModeColors.primary1[5],
            lightModeColors.primary1[6],
            lightModeColors.primary1[8],
            lightModeColors.primary1[9],
            lightModeColors.amber[6],
            lightModeColors.amber[8],
            lightModeColors.orange[6],
            lightModeColors.orange[8],
            lightModeColors.ruby[6],
            lightModeColors.ruby[8],
          ]}
        />
        <VStack w="full" maxWidth="800px" alignItems="start" spacing={6}>
          <VStack w="full" alignItems="start">
            <VStack
              id="successful-contribution-banner"
              padding="6%"
              w="full"
              spacing={4}
              justifyContent="center"
              borderRadius={8}
              border="1px solid"
              borderColor="neutral1.3"
              aspectRatio={2.16}
              pl={8}
              pr={8}
              background={SuccessImageBackgroundGradient}
              backgroundColor="utils.pbg"
              position="relative"
            >
              <VStack w="full" spacing={1} zIndex={1}>
                <H3 color={lightModeColors.neutral1[11]} fontSize="3xl" regular w="full" textAlign={'center'}>
                  {t('Successfully paid launch fee')}
                </H3>
                <H3 color={lightModeColors.neutral1[12]} bold fontSize="4xl">
                  {t('Launch your project!')}
                </H3>
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </CardLayout>
    )
  }

  const renderAwaitingConfirmationContent = () => {
    return (
      <VStack w="full" spacing={6}>
        <TransactionProcessing
          title={t('Payment submitted')}
          subTitle={t(
            'Your launch fee payment is being finalized on Rootstock. You will be able to launch the project as soon as the confirmation completes.',
          )}
          transactionId={processingTransactionId || undefined}
        />
        <Body size="sm" light textAlign="center">
          {t('Keep this page open for a moment. The launch step will unlock automatically once the payment is confirmed.')}
        </Body>
      </VStack>
    )
  }

  const renderMissingPaymentContent = () => {
    return (
      <VStack w="full" spacing={6}>
        <Image src={FundingErrorUrl} height="200px" width="auto" objectFit="contain" alt={t('No payment found')} />
        <VStack w="full" spacing={0} alignItems="center">
          <Body>{t('We were unable to generate a payment request. Please try again.')}</Body>
          <Body>{t('If the problem persists, please contact us for support.')}</Body>
          <Body>{t('Email: hello@geyser.fund')}</Body>
        </VStack>
      </VStack>
    )
  }

  const renderLightningPayment = () => {
    if (!lightningPaymentRequest) {
      return renderMissingPaymentContent()
    }

    return (
      <VStack w="full" spacing={6}>
        <QRCodeComponent value={lightningPaymentRequest} onClick={handleLightningPayment} isColored={hasCopiedLightning} />
        <HStack w="full" justifyContent="center">
          <Body light>{t('Total to pay')}:</Body>
          <Body>
            {`${commaFormatted(totalSats)} `}
            <Body as="span" light>
              sats
            </Body>
          </Body>
          <Body light>{`($${commaFormatted(launchFeeUsd)})`}</Body>
        </HStack>
        <VStack w="full" spacing={6} pt={4}>
          <WaitingForPayment title={launchCopy.waitingTitle} />
          <Button
            id="copy-lightning-invoice-button"
            width="310px"
            size="lg"
            variant="solid"
            colorScheme="primary1"
            onClick={handleLightningCopy}
            rightIcon={<PiCopy />}
          >
            {t('Copy Lightning invoice')}
          </Button>
        </VStack>
      </VStack>
    )
  }

  const renderOnchainDownloadPrompt = () => {
    return (
      <VStack w="full" spacing={6}>
        <CardLayout w="full" spacing={3}>
          <Body bold>{t('Download refund file before continuing')}</Body>
          <Body size="sm" light>
            {t(
              'On-chain launch-fee payments require a refund file as backup in the rare case the payment swap fails.',
            )}
          </Body>
          <Body size="sm" light>
            {t('Download and store the refund file, then continue to the payment QR.')}
          </Body>
        </CardLayout>
        <Button
          {...refundButtonProps}
          size="lg"
          variant="solid"
          minWidth="310px"
          colorScheme="primary1"
          rightIcon={<PiDownloadSimple />}
          isDisabled={!refundButtonProps.href}
          onClick={() => setHasUnlockedOnchainFlow(true)}
        >
          {t('Download refund file & continue')}
        </Button>
      </VStack>
    )
  }

  const renderOnchainPayment = () => {
    if (!onChainAddress || !onChainBip21Invoice) {
      return renderMissingPaymentContent()
    }

    if (requiresRefundDownload && !hasUnlockedOnchainFlow) {
      return renderOnchainDownloadPrompt()
    }

    return (
      <VStack w="full" spacing={6}>
        <QRCodeComponent value={onChainBip21Invoice} onClick={handleOnchainCopy} isColored={hasCopiedOnchain} />
        <HStack w="full" justifyContent="center">
          <Body light>{t('Total to pay')}:</Body>
          <Body>
            {`${commaFormatted(totalSats)} `}
            <Body as="span" light>
              sats
            </Body>
          </Body>
          <Body light>{`($${commaFormatted(launchFeeUsd)})`}</Body>
        </HStack>
        <VStack w="full" spacing={6} pt={4}>
          <WaitingForPayment title={launchCopy.waitingTitle} />
          <Button
            id="copy-onchain-address-button"
            width="310px"
            size="lg"
            variant="solid"
            colorScheme="primary1"
            onClick={handleOnchainCopy}
            rightIcon={hasCopiedOnchain ? <PiLink /> : <PiCopy />}
          >
            {hasCopiedOnchain ? t('Copied!') : t('Copy on-chain address')}
          </Button>
          {requiresRefundDownload ? (
            <Button
              {...refundButtonProps}
              size="lg"
              variant="surface"
              colorScheme="primary1"
              minWidth="310px"
              rightIcon={<PiDownloadSimple />}
              isDisabled={!refundButtonProps.href}
            >
              {t('Download refund file')}
            </Button>
          ) : null}
        </VStack>
      </VStack>
    )
  }

  const continueButtonProps = {
    onClick: handleNext,
    isDisabled: !project.paidLaunch,
  }
  const backButtonProps = {
    onClick: handleBack,
  }

  return (
    <ProjectCreationPageWrapper
      title={t('Launch Payment')}
      continueButtonProps={continueButtonProps}
      backButtonProps={backButtonProps}
    >
      <Body>{launchIntro}</Body>
      {isPaid
        ? renderSuccessContent()
        : isAwaitingConfirmation
        ? renderAwaitingConfirmationContent()
        : paymentMethod === LaunchPaymentMethod.Onchain
        ? renderOnchainPayment()
        : renderLightningPayment()}
    </ProjectCreationPageWrapper>
  )
}
