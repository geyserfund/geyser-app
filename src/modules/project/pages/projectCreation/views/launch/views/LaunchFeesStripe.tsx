import { HStack, VStack } from '@chakra-ui/react'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { t } from 'i18next'
import { useCallback, useMemo, useState } from 'react'
import Confetti from 'react-confetti'
import { createUseStyles } from 'react-jss'

import { AppTheme } from '@/context'
import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'
import { VITE_APP_STRIPE_API_KEY } from '@/shared/constants/config/env.ts'
import { lightModeColors } from '@/shared/styles/colors.ts'
import { SuccessImageBackgroundGradient } from '@/shared/styles/custom.ts'
import {
  ContributionFiatPaymentDetailsFragment,
  FundingContributionFragment,
  FundingContributionPaymentDetailsFragment,
} from '@/types/index.ts'
import { commaFormatted } from '@/utils/index.ts'

import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'
import { LAUNCH_FEE_USD_CENTS } from '../constants/launchFees.ts'
import { useListenToContributionConfirmed } from '../hooks/useListenToContributionConfirmed.ts'
import { ProjectLaunchStrategy } from './LaunchStrategySelection.tsx'

const stripePromiseByAccount = new Map<string, ReturnType<typeof loadStripe>>()

const getStripePromiseForAccount = (stripeAccountId: string) => {
  let stripePromise = stripePromiseByAccount.get(stripeAccountId)
  if (!stripePromise) {
    stripePromise = loadStripe(VITE_APP_STRIPE_API_KEY, { stripeAccount: stripeAccountId })
    stripePromiseByAccount.set(stripeAccountId, stripePromise)
  }

  return stripePromise
}

const useStyles = createUseStyles(({ colors }: AppTheme) => ({
  container: {
    backgroundColor: colors.utils.pbg,
    width: '100%',
  },
}))

/** Stripe payment screen for the launch fee. Receives already-created contribution data from Launch.tsx. */
export const LaunchFeesStripe = ({
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
  const classes = useStyles()

  const { project, partialUpdateProject } = useProjectAtom()
  const { getSatoshisFromUSDCents } = useBTCConverter()

  const [isPaid, setIsPaid] = useState(false)
  const [isCheckoutCompleted, setIsCheckoutCompleted] = useState(false)

  const onCompleted = useCallback(() => {
    setIsPaid(true)
    partialUpdateProject({ paidLaunch: true })
  }, [partialUpdateProject])

  useListenToContributionConfirmed({
    contributionId: contributionData.id,
    onCompleted,
  })

  const paymentDetails = useMemo<ContributionFiatPaymentDetailsFragment | null>(() => {
    const { fiat } = paymentsData
    if (!fiat?.stripeClientSecret || !fiat?.stripeAccountId) return null
    return { stripeClientSecret: fiat.stripeClientSecret, stripeAccountId: fiat.stripeAccountId }
  }, [paymentsData])

  const stripeClientSecret = useMemo(() => {
    const clientSecret = paymentDetails?.stripeClientSecret
    if (!clientSecret) return ''
    if (!clientSecret.includes('%')) return clientSecret

    try {
      return decodeURIComponent(clientSecret)
    } catch {
      return clientSecret
    }
  }, [paymentDetails?.stripeClientSecret])

  const stripeAccountId = paymentDetails?.stripeAccountId || ''

  const stripeOptions = useMemo(() => {
    if (!stripeClientSecret) return undefined

    return {
      clientSecret: stripeClientSecret,
      onComplete: () => setIsCheckoutCompleted(true),
    }
  }, [stripeClientSecret])

  const stripePromise = useMemo(() => {
    if (!stripeAccountId) return undefined
    return getStripePromiseForAccount(stripeAccountId)
  }, [stripeAccountId])

  const launchFeeInSats = getSatoshisFromUSDCents(LAUNCH_FEE_USD_CENTS[strategy])
  const launchFeeInUsd = LAUNCH_FEE_USD_CENTS[strategy] / 100

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

  const renderStripePayment = () => {
    if (!stripeClientSecret || !stripeOptions || !stripePromise) {
      return null
    }

    return (
      <VStack w="full" spacing={6}>
        <HStack w="full" justifyContent="center">
          <Body light>{t(' Total to pay')}: </Body>
          <Body>
            {`${commaFormatted(launchFeeInSats)} `}
            <Body as="span" light>
              sats
            </Body>
          </Body>
          <Body light>{`($${commaFormatted(launchFeeInUsd)})`}</Body>
        </HStack>

        <EmbeddedCheckoutProvider stripe={stripePromise} options={stripeOptions}>
          <EmbeddedCheckout className={classes.container} />
        </EmbeddedCheckoutProvider>

        <Body size="sm" light>
          {t('This checkout is charged in USD. Your bank or card issuer may convert to your local currency.')}
        </Body>
        {isCheckoutCompleted ? (
          <Body size="sm" light>
            {t('Payment submitted. We will unlock launch once Stripe confirmation is received.')}
          </Body>
        ) : null}
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
      <Body>{t('Pay the launch fee with credit card to continue.')}</Body>
      {isPaid ? renderSuccessContent() : renderStripePayment()}
    </ProjectCreationPageWrapper>
  )
}
