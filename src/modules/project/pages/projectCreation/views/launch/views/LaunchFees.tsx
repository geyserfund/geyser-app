import { Button, HStack, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'
import Confetti from 'react-confetti'
import { PiCopy } from 'react-icons/pi'

import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'
import { FundingErrorUrl } from '@/shared/constants/index.ts'
import { lightModeColors } from '@/shared/styles/colors.ts'
import { SuccessImageBackgroundGradient } from '@/shared/styles/custom.ts'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton'
import { FundingContributionFragment, FundingContributionPaymentDetailsFragment } from '@/types/index.ts'
import { commaFormatted, useMobileMode, useNotification } from '@/utils/index.ts'

import { QRCodeComponent } from '../../../../projectFunding/views/fundingPayment/components/QRCodeComponent'
import { WaitingForPayment } from '../../../../projectFunding/views/fundingPayment/components/WaitingForPayment'
import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'
import { LAUNCH_FEE_USD_CENTS } from '../constants/launchFees.ts'
import { useListenToContributionConfirmed } from '../hooks/useListenToContributionConfirmed.ts'
import { ProjectLaunchStrategy } from './LaunchStrategySelection.tsx'

/** Lightning payment screen for the launch fee. Receives already-created contribution data from Launch.tsx. */
export const LaunchFees = ({
  handleNext,
  handleBack,
  strategy,
  contributionData,
  paymentsData,
}: {
  handleNext: () => void
  handleBack: () => void
  strategy: ProjectLaunchStrategy
  contributionData: FundingContributionFragment
  paymentsData: FundingContributionPaymentDetailsFragment
}) => {
  const isMobile = useMobileMode()
  const toast = useNotification()

  const { project, partialUpdateProject } = useProjectAtom()

  const [isPaid, setIsPaid] = useState(false)

  // Update project state to mark it as paid
  const onCompleted = () => {
    setIsPaid(true)
    partialUpdateProject({ paidLaunch: true })
  }

  // Listen for funding success using the custom hook
  useListenToContributionConfirmed({
    contributionId: contributionData.id,
    onCompleted,
  })

  const { getSatoshisFromUSDCents } = useBTCConverter()

  const { hasCopied, onCopy } = useCopyToClipboard(paymentsData?.lightning?.paymentRequest || '')

  const handleCopy = () => {
    onCopy()
    toast.success({
      title: t('Invoice copied to clipboard'),
    })
  }

  /** Handles opening lightning payment in mobile wallets */
  const handleLightningPayment = () => {
    const paymentRequest = paymentsData?.lightning?.paymentRequest
    if (!paymentRequest) return

    const lightningUri = `lightning:${paymentRequest}`

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

  const totalSats = getSatoshisFromUSDCents(LAUNCH_FEE_USD_CENTS[strategy])
  const totalUsdCent = LAUNCH_FEE_USD_CENTS[strategy]

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

  const renderPaymentContent = () => {
    if (!paymentsData?.lightning?.paymentRequest) {
      return (
        <VStack w="full" spacing={6}>
          <Image
            src={FundingErrorUrl}
            height="200px"
            width="auto"
            objectFit="contain"
            alt={t('No payment request found')}
          />
          <VStack w="full" spacing={0} alignItems="center">
            <Body>{t('We were unable to generate a payment request. Please try again.')}</Body>
            <Body>{t('If the problem persists, please contact us for support.')}</Body>
            <Body>{t('Email: hello@geyser.fund')}</Body>
          </VStack>
        </VStack>
      )
    }

    return (
      <VStack w="full" spacing={6}>
        <QRCodeComponent
          value={paymentsData.lightning.paymentRequest}
          onClick={handleLightningPayment}
          isColored={hasCopied}
        />
        <HStack w="full" justifyContent="center">
          <Body light>{t(' Total to pay')}: </Body>

          <Body>
            {`${commaFormatted(totalSats)} `}

            <Body as="span" light>
              sats
            </Body>
          </Body>
          <Body light>{`($${commaFormatted(totalUsdCent / 100)})`}</Body>
        </HStack>
        <VStack w="full" spacing={6} pt={4}>
          <WaitingForPayment title={t('Scan and pay invoice with Bitcoin Lightning.')} />
          <Button
            id={'copy-lightning-invoice-button'}
            width="310px"
            size="lg"
            variant="solid"
            colorScheme="primary1"
            onClick={handleCopy}
            rightIcon={<PiCopy />}
          >
            {t('Copy Lightning invoice')}
          </Button>
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
      <Body>{t('Please pay the launch fee with Lightning to continue.')}</Body>
      {isPaid ? renderSuccessContent() : renderPaymentContent()}
    </ProjectCreationPageWrapper>
  )
}
