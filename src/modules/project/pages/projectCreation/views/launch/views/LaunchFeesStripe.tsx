import { HStack, VStack } from '@chakra-ui/react'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Confetti from 'react-confetti'
import { createUseStyles } from 'react-jss'

import Loader from '@/components/ui/Loader.tsx'
import { AppTheme } from '@/context'
import { useAuthContext } from '@/context/auth.tsx'
import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { useStripeEmbeddedTheme } from '@/modules/project/funding/hooks/useStripeEmbeddedTheme.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'
import { GEYSER_LAUNCH_PROJECT_ID, ORIGIN, VITE_APP_STRIPE_API_KEY } from '@/shared/constants/config/env.ts'
import { usdRateAtom } from '@/shared/state/btcRateAtom.ts'
import { lightModeColors } from '@/shared/styles/colors.ts'
import { SuccessImageBackgroundGradient } from '@/shared/styles/custom.ts'
import {
  ContributionFiatPaymentDetailsFragment,
  FundingContributionFragment,
  FundingResourceType,
  QuoteCurrency,
  useContributionCreateMutation,
} from '@/types/index.ts'
import { commaFormatted, useNotification } from '@/utils/index.ts'

import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'
import { LAUNCH_FEE_USD_CENTS } from '../constants/launchFees.ts'
import { useListenToContributionConfirmed } from '../hooks/useListenToContributionConfirmed.ts'
import { LaunchPaymentMethod, LaunchPaymentMethodTabs } from './LaunchPaymentMethodSelection.tsx'
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

export const LaunchFeesStripe = ({
  handleNext,
  handleBack,
  strategy,
  selectedMethod,
  onSelectMethod,
  onStripeUnavailable,
}: {
  handleNext: () => void
  handleBack: () => void
  strategy: ProjectLaunchStrategy
  selectedMethod: LaunchPaymentMethod
  onSelectMethod: (method: LaunchPaymentMethod) => void
  onStripeUnavailable: (message: string) => void
}) => {
  const classes = useStyles()
  const toast = useNotification()
  const stripeEmbeddedTheme = useStripeEmbeddedTheme()

  const { user } = useAuthContext()
  const { project, partialUpdateProject } = useProjectAtom()

  const [contributionData, setContributionData] = useState<FundingContributionFragment>()
  const [paymentDetails, setPaymentDetails] = useState<ContributionFiatPaymentDetailsFragment>()
  const [isPaid, setIsPaid] = useState(false)
  const [isCheckoutCompleted, setIsCheckoutCompleted] = useState(false)

  const usdRate = useAtomValue(usdRateAtom)
  const { getSatoshisFromUSDCents } = useBTCConverter()
  const donationAmount = getSatoshisFromUSDCents(LAUNCH_FEE_USD_CENTS[strategy])

  const handleUnavailable = useCallback(
    (description: string) => {
      toast.error({
        title: t('Stripe checkout unavailable'),
        description,
      })
      onStripeUnavailable(description)
    },
    [onStripeUnavailable, toast],
  )

  const [contributionCreate, { loading }] = useContributionCreateMutation({
    onCompleted(data) {
      if (!data.contributionCreate) return

      setContributionData(data.contributionCreate.contribution)

      const fiatPayment = data.contributionCreate.payments.fiat
      if (!fiatPayment?.stripeClientSecret || !fiatPayment?.stripeAccountId) {
        handleUnavailable(t('Unable to initialize card checkout. Please choose Lightning or try again.'))
        return
      }

      setPaymentDetails({
        stripeClientSecret: fiatPayment.stripeClientSecret,
        stripeAccountId: fiatPayment.stripeAccountId,
      })
    },
    onError(error) {
      console.error(error)
      handleUnavailable(error.message || t('Something went wrong. Please try again.'))
    },
  })

  const onCompleted = useCallback(() => {
    setIsPaid(true)
    partialUpdateProject({ paidLaunch: true })
  }, [partialUpdateProject])

  useListenToContributionConfirmed({
    contributionId: contributionData?.id,
    onCompleted,
  })

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

  const returnUrl = useMemo(() => {
    if (project.name) {
      return `${ORIGIN}/project/${project.name}/funding/success`
    }

    return `${ORIGIN}/`
  }, [project.name])

  const launchFeeInSats = getSatoshisFromUSDCents(LAUNCH_FEE_USD_CENTS[strategy])
  const launchFeeInUsd = LAUNCH_FEE_USD_CENTS[strategy] / 100

  const createContribution = useCallback(() => {
    if (!project?.id || !user?.id || !usdRate) {
      return
    }

    contributionCreate({
      variables: {
        input: {
          projectId: GEYSER_LAUNCH_PROJECT_ID,
          anonymous: false,
          refundable: false,
          donationAmount,
          metadataInput: {
            email: user?.email,
            privateComment: JSON.stringify({
              paidLaunch: true,
              projectId: project?.id,
              launchStrategy: strategy,
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
          sourceResourceInput: { resourceId: project.id.toString(), resourceType: FundingResourceType.Project },
          paymentsInput: {
            fiat: {
              create: true,
              stripe: {
                returnUrl,
                theme: stripeEmbeddedTheme,
              },
            },
          },
        },
      },
    })
  }, [
    contributionCreate,
    donationAmount,
    project?.id,
    returnUrl,
    strategy,
    stripeEmbeddedTheme,
    usdRate,
    user?.email,
    user?.id,
  ])

  useEffect(() => {
    if (!user?.id || !project?.id || !usdRate) return
    if (contributionData?.id || paymentDetails || loading) return
    createContribution()
  }, [contributionData?.id, createContribution, loading, paymentDetails, project?.id, usdRate, user?.id])

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
    if (loading) {
      return <Loader />
    }

    if (!stripeClientSecret || !stripeOptions || !stripePromise) {
      return <Loader />
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
      <HStack w="full" justifyContent="space-between">
        <Body>{t('Choose your payment method. Lightning is the default option.')}</Body>
      </HStack>
      <LaunchPaymentMethodTabs selectedMethod={selectedMethod} onSelectMethod={onSelectMethod} />
      <Body>{t('Pay the launch fee with credit card to continue.')}</Body>
      {isPaid ? renderSuccessContent() : renderStripePayment()}
    </ProjectCreationPageWrapper>
  )
}
