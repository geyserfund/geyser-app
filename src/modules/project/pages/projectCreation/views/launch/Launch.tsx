import { HStack, Spinner } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import { useCallback, useReducer } from 'react'
import { useNavigate } from 'react-router'

import { TEMPORARY_BOLTZ_CONTINGENCY_ENABLED } from '@/modules/project/constants/temporaryBoltzContingency.ts'
import { isManagedRecoverableGrantProject } from '@/modules/project/domain/managedRecoverableGrant.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import {
  FundingContributionFragment,
  FundingContributionPaymentDetailsFragment,
  ProjectReviewFragment,
  useProjectLaunchReviewsQuery,
} from '@/types/index.ts'
import { isLaunchFeeWaived } from '@/utils/index.ts'

import { projectReviewsAtom } from '../../states/projectReviewAtom.ts'
import { useLaunchContributionCreate } from './hooks/useLaunchContributionCreate.ts'
import { ProjectLaunchStrategy } from './launchStrategy.ts'
import { LaunchFees } from './views/LaunchFees.tsx'
import { LaunchFeesStripe } from './views/LaunchFeesStripe.tsx'
import { LaunchFinalize } from './views/LaunchFinalize.tsx'
import { LaunchPaymentMethod, LaunchPaymentMethodSelection } from './views/LaunchPaymentMethodSelection.tsx'
import { LaunchPaymentPassword } from './views/LaunchPaymentPassword.tsx'
import { LaunchReview } from './views/LaunchReview.tsx'
import { LaunchStrategySelection } from './views/LaunchStrategySelection.tsx'

enum LaunchStep {
  Review = 'review',
  Strategy = 'strategy',
  PaymentMethod = 'payment-method',
  Password = 'password',
  FeesBitcoin = 'fees-bitcoin',
  FeesStripe = 'fees-stripe',
  Finalize = 'finalize',
}

type LaunchState = {
  step: LaunchStep
  strategy: ProjectLaunchStrategy
  paymentMethod: LaunchPaymentMethod
  pendingPasswordMethod: LaunchPaymentMethod | null
  paymentMethodError: string
  contributionData?: FundingContributionFragment
  paymentsData?: FundingContributionPaymentDetailsFragment
}

const initialLaunchState: LaunchState = {
  step: LaunchStep.Review,
  strategy: ProjectLaunchStrategy.STARTER_LAUNCH,
  paymentMethod: LaunchPaymentMethod.Lightning,
  pendingPasswordMethod: null,
  paymentMethodError: '',
}

const launchReducer = (state: LaunchState, updates: Partial<LaunchState>): LaunchState => ({ ...state, ...updates })

export const Launch = () => {
  const { project, loading: projectLoading } = useProjectAtom()
  const navigate = useNavigate()

  const [state, updateState] = useReducer(launchReducer, initialLaunchState)
  const { step, strategy, paymentMethod, pendingPasswordMethod, paymentMethodError, contributionData, paymentsData } =
    state
  const setStep = (value: LaunchStep) => updateState({ step: value })
  const setStrategy = (value: ProjectLaunchStrategy) => updateState({ strategy: value })
  const setPaymentMethod = (value: LaunchPaymentMethod) => updateState({ paymentMethod: value })
  const setPendingPasswordMethod = (value: LaunchPaymentMethod | null) => updateState({ pendingPasswordMethod: value })
  const setPaymentMethodError = (value: string) => updateState({ paymentMethodError: value })
  const setContributionData = (value?: FundingContributionFragment) => updateState({ contributionData: value })
  const setPaymentsData = (value?: FundingContributionPaymentDetailsFragment) => updateState({ paymentsData: value })

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

  const launchFeeWaived = TEMPORARY_BOLTZ_CONTINGENCY_ENABLED || isLaunchFeeWaived(project)
  const isManagedRecoverableGrant = isManagedRecoverableGrantProject(project)
  const projectLaunchStrategy = (project as { launchStrategy?: string | null }).launchStrategy
  const hasPaidLaunchStrategy = Object.values(ProjectLaunchStrategy).includes(
    projectLaunchStrategy as ProjectLaunchStrategy,
  )

  const handleNext = useCallback(() => {
    if (step === LaunchStep.Review) {
      setStep(isManagedRecoverableGrant || hasPaidLaunchStrategy ? LaunchStep.Finalize : LaunchStep.Strategy)
    }

    if (step === LaunchStep.FeesBitcoin || step === LaunchStep.FeesStripe) {
      setStep(LaunchStep.Finalize)
    }
  }, [hasPaidLaunchStrategy, isManagedRecoverableGrant, step])

  const handleBack = useCallback(() => {
    if (step === LaunchStep.Finalize) {
      navigate(getPath(isManagedRecoverableGrant ? 'launchAboutYou' : 'launchPayment', project?.id))
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
  }, [isManagedRecoverableGrant, navigate, project?.id, step])

  const handleNextStrategy = useCallback(
    (selectedStrategy: ProjectLaunchStrategy) => {
      setStrategy(selectedStrategy)

      if (launchFeeWaived && selectedStrategy === ProjectLaunchStrategy.STARTER_LAUNCH) {
        setStep(LaunchStep.Finalize)
        return
      }

      setStep(LaunchStep.PaymentMethod)
    },
    [launchFeeWaived],
  )

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
      return (
        <LaunchStrategySelection
          launchFeeWaived={launchFeeWaived}
          handleNext={handleNextStrategy}
          handleBack={handleBack}
        />
      )
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
