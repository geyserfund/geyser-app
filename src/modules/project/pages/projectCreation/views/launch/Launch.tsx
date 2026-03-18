import { useSetAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import Loader from '@/components/ui/Loader.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectReviewFragment, useProjectLaunchReviewsQuery } from '@/types/index.ts'

import { projectReviewsAtom } from '../../states/projectReviewAtom.ts'
import { LaunchFees } from './views/LaunchFees.tsx'
import { LaunchFeesStripe } from './views/LaunchFeesStripe.tsx'
import { LaunchFinalize } from './views/LaunchFinalize.tsx'
import { LaunchPaymentMethod, LaunchPaymentMethodSelection } from './views/LaunchPaymentMethodSelection.tsx'
import { LaunchReview } from './views/LaunchReview.tsx'
import { LaunchStrategySelection, ProjectLaunchStrategy } from './views/LaunchStrategySelection.tsx'

enum LaunchStep {
  Review = 'review',
  Strategy = 'strategy',
  PaymentMethod = 'payment-method',
  FeesLightning = 'fees-lightning',
  FeesStripe = 'fees-stripe',
  Finalize = 'finalize',
}

export const Launch = () => {
  const { project, loading: projectLoading } = useProjectAtom()
  const navigate = useNavigate()

  const [step, setStep] = useState<LaunchStep>(LaunchStep.Review)
  const [strategy, setStrategy] = useState<ProjectLaunchStrategy>(ProjectLaunchStrategy.STARTER_LAUNCH)
  const [paymentMethod, setPaymentMethod] = useState<LaunchPaymentMethod>(LaunchPaymentMethod.Lightning)
  const [paymentMethodError, setPaymentMethodError] = useState('')

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

    if (step === LaunchStep.FeesLightning || step === LaunchStep.FeesStripe) {
      setStep(LaunchStep.Finalize)
    }
  }, [project.paidLaunch, step])

  const handleBack = useCallback(() => {
    if (step === LaunchStep.Finalize) {
      navigate(getPath('launchPayment', project?.id))
    }

    if (step === LaunchStep.FeesLightning || step === LaunchStep.FeesStripe) {
      setStep(LaunchStep.PaymentMethod)
    }

    if (step === LaunchStep.PaymentMethod) {
      setStep(LaunchStep.Strategy)
    }

    if (step === LaunchStep.Strategy) {
      setStep(LaunchStep.Review)
    }
  }, [step, project?.id, navigate])

  const handleNextStrategy = useCallback((strategy: ProjectLaunchStrategy) => {
    setStrategy(strategy)
    setStep(LaunchStep.PaymentMethod)
  }, [])

  const handleSelectPaymentMethod = useCallback((method: LaunchPaymentMethod) => {
    setPaymentMethod(method)
    setStep(method === LaunchPaymentMethod.Lightning ? LaunchStep.FeesLightning : LaunchStep.FeesStripe)
    setPaymentMethodError('')
  }, [])

  const handleStripeUnavailable = useCallback((message: string) => {
    setPaymentMethodError(message)
    setStep(LaunchStep.PaymentMethod)
  }, [])

  if (projectLoading || loading) return <Loader />

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
          handleNext={handleSelectPaymentMethod}
          onSelectMethod={setPaymentMethod}
          handleBack={handleBack}
        />
      )
    case LaunchStep.FeesLightning:
      return (
        <LaunchFees
          handleNext={handleNext}
          handleBack={handleBack}
          strategy={strategy}
          selectedMethod={paymentMethod}
          onSelectMethod={handleSelectPaymentMethod}
        />
      )
    case LaunchStep.FeesStripe:
      return (
        <LaunchFeesStripe
          handleNext={handleNext}
          handleBack={handleBack}
          strategy={strategy}
          selectedMethod={paymentMethod}
          onSelectMethod={handleSelectPaymentMethod}
          onStripeUnavailable={handleStripeUnavailable}
        />
      )
    case LaunchStep.Finalize:
      return <LaunchFinalize handleBack={handleBack} />
    default:
      return <LaunchReview handleNext={handleNext} />
  }
}
