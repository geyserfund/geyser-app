import { HStack, Spinner } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import {
  FundingContributionFragment,
  FundingContributionPaymentDetailsFragment,
  ProjectReviewFragment,
  useProjectLaunchReviewsQuery,
} from '@/types/index.ts'

import { projectReviewsAtom } from '../../states/projectReviewAtom.ts'
import { useLaunchContributionCreate } from './hooks/useLaunchContributionCreate.ts'
import { LaunchFees } from './views/LaunchFees.tsx'
import { LaunchPaymentPassword } from './views/LaunchPaymentPassword.tsx'
import { LaunchFeesStripe } from './views/LaunchFeesStripe.tsx'
import { LaunchFinalize } from './views/LaunchFinalize.tsx'
import { LaunchPaymentMethod, LaunchPaymentMethodSelection } from './views/LaunchPaymentMethodSelection.tsx'
import { LaunchReview } from './views/LaunchReview.tsx'
import { LaunchStrategySelection, ProjectLaunchStrategy } from './views/LaunchStrategySelection.tsx'

enum LaunchStep {
  Review = 'review',
  Strategy = 'strategy',
  PaymentMethod = 'payment-method',
  Password = 'password',
  FeesBitcoin = 'fees-bitcoin',
  FeesStripe = 'fees-stripe',
  Finalize = 'finalize',
}

export const Launch = () => {
  const { project, loading: projectLoading } = useProjectAtom()
  const navigate = useNavigate()

  const [step, setStep] = useState<LaunchStep>(LaunchStep.Review)
  const [strategy, setStrategy] = useState<ProjectLaunchStrategy>(ProjectLaunchStrategy.STARTER_LAUNCH)
  const [paymentMethod, setPaymentMethod] = useState<LaunchPaymentMethod>(LaunchPaymentMethod.Lightning)
  const [pendingPasswordMethod, setPendingPasswordMethod] = useState<LaunchPaymentMethod | null>(null)
  const [paymentMethodError, setPaymentMethodError] = useState('')

  const [contributionData, setContributionData] = useState<FundingContributionFragment>()
  const [paymentsData, setPaymentsData] = useState<FundingContributionPaymentDetailsFragment>()

  const {
    createContribution,
    loading: contributionLoading,
    launchPaymentProjectLoading,
  } = useLaunchContributionCreate(strategy)

  const setProjectReviews = useSetAtom(projectReviewsAtom)

  /** Fetch the project reviews and set to the atom */
  const { loading } = useProjectLaunchReviewsQuery({
    skip: !project.id,
    variables: {
      where: {
        id: project.id,
      },
    },
    onCompleted(data) {
      setProjectReviews(data.projectGet?.reviews as ProjectReviewFragment[])
    },
  })

  useEffect(() => {
    if (project.paidLaunch) {
      setStep(LaunchStep.Finalize)
    }

    return () => {}
  }, [project.paidLaunch])

  const handleNext = useCallback(() => {
    if (step === LaunchStep.Review) {
      if (project.paidLaunch) {
        setStep(LaunchStep.Finalize)
      } else {
        setStep(LaunchStep.Strategy)
      }
    }

    if (step === LaunchStep.FeesBitcoin || step === LaunchStep.FeesStripe) {
      setStep(LaunchStep.Finalize)
    }
  }, [project.paidLaunch, step])

  const handleBack = useCallback(() => {
    if (step === LaunchStep.Finalize) {
      navigate(getPath('launchPayment', project?.id))
    }

    if (step === LaunchStep.FeesBitcoin || step === LaunchStep.FeesStripe) {
      setContributionData(undefined)
      setPaymentsData(undefined)
      setStep(LaunchStep.PaymentMethod)
    }

    if (step === LaunchStep.Password) {
      setPendingPasswordMethod(null)
      setStep(LaunchStep.PaymentMethod)
    }

    if (step === LaunchStep.PaymentMethod) {
      setStep(LaunchStep.Strategy)
    }

    if (step === LaunchStep.Strategy) {
      setStep(LaunchStep.Review)
    }
  }, [step, project?.id, navigate])

  const handleNextStrategy = useCallback((selectedStrategy: ProjectLaunchStrategy) => {
    setStrategy(selectedStrategy)
    setStep(LaunchStep.PaymentMethod)
  }, [])

  const handleContributionResult = useCallback(
    async (method: LaunchPaymentMethod) => {
      setPaymentMethod(method)
      setPaymentMethodError('')

      const result = await createContribution(method)

      if (!result.ok) {
        if (result.reason === 'password_required') {
          setPendingPasswordMethod(method)
          setStep(LaunchStep.Password)
          return
        }

        setPaymentMethodError(result.error)
        return
      }

      setContributionData(result.contribution)
      setPaymentsData(result.payments)
      setStep(method === LaunchPaymentMethod.CreditCard ? LaunchStep.FeesStripe : LaunchStep.FeesBitcoin)
    },
    [createContribution],
  )

  if (projectLoading || loading || launchPaymentProjectLoading) {
    return (
      <HStack h="80%" minH="320px" justify="center" align="center">
        <Spinner size="xl" color="primary.400" />
      </HStack>
    )
  }

  switch (step) {
    case LaunchStep.Review:
      return <LaunchReview handleNext={handleNext} />
    case LaunchStep.Strategy:
      return <LaunchStrategySelection handleNext={handleNextStrategy} handleBack={handleBack} />
    case LaunchStep.PaymentMethod:
      return (
        <LaunchPaymentMethodSelection
          selectedMethod={paymentMethod}
          paymentMethodError={paymentMethodError}
          isLoading={contributionLoading}
          handleNext={handleContributionResult}
          onSelectMethod={setPaymentMethod}
          handleBack={handleBack}
        />
      )
    case LaunchStep.Password:
      return (
        <LaunchPaymentPassword
          isLoading={contributionLoading}
          onBack={handleBack}
          onComplete={async ({ password } = {}) => {
            if (!pendingPasswordMethod) {
              setStep(LaunchStep.PaymentMethod)
              return
            }

            const result = await createContribution(pendingPasswordMethod, password)

            if (!result.ok) {
              setPaymentMethodError(result.error)
              setStep(LaunchStep.PaymentMethod)
              return
            }

            setPaymentMethod(pendingPasswordMethod)
            setPendingPasswordMethod(null)
            setContributionData(result.contribution)
            setPaymentsData(result.payments)
            setStep(
              pendingPasswordMethod === LaunchPaymentMethod.CreditCard ? LaunchStep.FeesStripe : LaunchStep.FeesBitcoin,
            )
          }}
        />
      )
    case LaunchStep.FeesBitcoin:
      return contributionData && paymentsData ? (
        <LaunchFees
          paymentMethod={paymentMethod}
          handleNext={handleNext}
          handleBack={handleBack}
          strategy={strategy}
          contributionData={contributionData}
          paymentsData={paymentsData}
        />
      ) : null
    case LaunchStep.FeesStripe:
      return contributionData && paymentsData ? (
        <LaunchFeesStripe
          handleNext={handleNext}
          handleBack={handleBack}
          strategy={strategy}
          contributionData={contributionData}
          paymentsData={paymentsData}
        />
      ) : null
    case LaunchStep.Finalize:
      return <LaunchFinalize handleBack={handleBack} />
    default:
      return <LaunchReview handleNext={handleNext} />
  }
}
