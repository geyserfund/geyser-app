import { Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { PiCopy } from 'react-icons/pi'

import Loader from '@/components/ui/Loader.tsx'
import { useAuthContext } from '@/context/auth.tsx'
import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'
import { __production__, __staging__ } from '@/shared/constants/index.ts'
import { usdRateAtom } from '@/shared/state/btcRateAtom.ts'
import { lightModeColors } from '@/shared/styles/colors.ts'
import { SuccessImageBackgroundGradient } from '@/shared/styles/custom.ts'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton'
import {
  FundingContributionFragment,
  FundingContributionPaymentDetailsFragment,
  FundingResourceType,
  QuoteCurrency,
  USDCents,
  useContributionCreateMutation,
} from '@/types/index.ts'
import { commaFormatted, useMobileMode, useNotification } from '@/utils/index.ts'

import { QRCodeComponent } from '../../../../projectFunding/views/fundingPayment/components/QRCodeComponent'
import { WaitingForPayment } from '../../../../projectFunding/views/fundingPayment/components/WaitingForPayment'
import { ProjectCreationLayout } from '../../../Layouts/ProjectCreationLayout.tsx'
import { useListenToContributionConfirmed } from '../hooks/useListenToContributionConfirmed.ts'
import { ProjectLaunchStrategy } from './LaunchStrategySelection.tsx'

const PROJECT_ID_FOR_GEYSER_LAUNCH = __production__ ? 3075 : __staging__ ? 839 : 839

const LAUNCH_FEE_USD_CENTS = {
  [ProjectLaunchStrategy.STARTER_LAUNCH]: 2500 as USDCents, // 25 USD
  [ProjectLaunchStrategy.GROWTH_LAUNCH]: 5000 as USDCents, // 50 USD
  [ProjectLaunchStrategy.PRO_LAUNCH]: 35000 as USDCents, // 350 USD
}

export const LaunchFees = ({
  handleNext,
  handleBack,
  strategy,
}: {
  handleNext: () => void
  handleBack: () => void
  strategy: ProjectLaunchStrategy
}) => {
  const { user } = useAuthContext()
  const isMobile = useMobileMode()
  const toast = useNotification()

  const { project, partialUpdateProject } = useProjectAtom()

  const [contributionData, setContributionData] = useState<FundingContributionFragment>()
  const [paymentsData, setPaymentsData] = useState<FundingContributionPaymentDetailsFragment>()

  const [isPaid, setIsPaid] = useState(false)

  const [contributionCreate, { loading }] = useContributionCreateMutation({
    onCompleted(data) {
      if (data.contributionCreate) {
        setContributionData(data.contributionCreate.contribution)
        setPaymentsData(data.contributionCreate.payments)
      }
    },
  })

  const usdRate = useAtomValue(usdRateAtom)

  const { getSatoshisFromUSDCents } = useBTCConverter()

  const donationAmount = getSatoshisFromUSDCents(LAUNCH_FEE_USD_CENTS[strategy])

  const { hasCopied, onCopy } = useCopyToClipboard(paymentsData?.lightning?.paymentRequest || '')

  // Update project state to mark it as paid
  const onCompleted = () => {
    setIsPaid(true)
    partialUpdateProject({ paidLaunch: true })
  }

  // Listen for funding success using the custom hook
  useListenToContributionConfirmed({
    contributionId: contributionData?.id,
    onCompleted,
  })

  useEffect(() => {
    if (!user.id || !project.id || !usdRate) return

    contributionCreate({
      variables: {
        input: {
          projectId: PROJECT_ID_FOR_GEYSER_LAUNCH,
          anonymous: false,
          refundable: false,
          donationAmount,
          metadataInput: {
            email: user?.email,
            privateComment: JSON.stringify({
              paidLaunch: true,
              projectId: project?.id,
            }),
            followProject: true,
          },
          orderInput: {
            bitcoinQuote: {
              quote: usdRate,
              quoteCurrency: QuoteCurrency.Usd,
            },
            items: [],
          },
          sourceResourceInput: {
            resourceId: project?.id.toString(),
            resourceType: FundingResourceType.Project,
          },
          paymentsInput: {
            lightning: {
              create: true,
            },
          },
        },
      },
      onError(error) {
        console.error(error)
        toast.error({
          title: t('Error creating contribution'),
          description: error.message || t('Something went wrong. Please try again.'),
        })
      },
    })
  }, [contributionCreate, donationAmount, project?.id, usdRate, user])

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
    if (loading) {
      return <Loader />
    }

    if (!paymentsData?.lightning?.paymentRequest) {
      return null
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
    <ProjectCreationLayout
      title={t('Launch Payment')}
      continueButtonProps={continueButtonProps}
      backButtonProps={backButtonProps}
    >
      <HStack w="full" justifyContent="space-between">
        <Body>{t('Please pay the launch fee with lightning to continue.')}</Body>
      </HStack>
      {isPaid ? renderSuccessContent() : renderPaymentContent()}
    </ProjectCreationLayout>
  )
}
