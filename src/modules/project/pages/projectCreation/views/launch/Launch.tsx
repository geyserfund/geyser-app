import { useSetAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import Loader from '@/components/ui/Loader.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectReviewFragment, useProjectLaunchReviewsQuery } from '@/types/index.ts'

import { projectReviewsAtom } from '../../states/projectReviewAtom.ts'
import { LaunchFees } from './views/LaunchFees.tsx'
import { LaunchFinalize } from './views/LaunchFinalize.tsx'
import { LaunchReview } from './views/LaunchReview.tsx'
import { LaunchStrategySelection, ProjectLaunchStrategy } from './views/LaunchStrategySelection.tsx'

enum LaunchStep {
  Review = 'review',
  Strategy = 'strategy',
  Fees = 'fees',
  Finalize = 'finalize',
}

export const Launch = () => {
  const { project, loading: projectLoading } = useProjectAtom()
  const navigate = useNavigate()

  const [step, setStep] = useState<LaunchStep>(LaunchStep.Review)
  const [strategy, setStrategy] = useState<ProjectLaunchStrategy>(ProjectLaunchStrategy.STARTER_LAUNCH)

  const setProjectReviews = useSetAtom(projectReviewsAtom)

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

    if (step === LaunchStep.Fees) {
      setStep(LaunchStep.Finalize)
    }
  }, [project.paidLaunch, step])

  const handleBack = useCallback(() => {
    if (step === LaunchStep.Finalize) {
      navigate(getPath('launchPayment', project?.id))
    }

    if (step === LaunchStep.Fees) {
      setStep(LaunchStep.Strategy)
    }

    if (step === LaunchStep.Strategy) {
      setStep(LaunchStep.Review)
    }
  }, [step, project?.id, navigate])

  const handleNextStrategy = useCallback((strategy: ProjectLaunchStrategy) => {
    setStrategy(strategy)
    setStep(LaunchStep.Fees)
  }, [])

  if (projectLoading || loading) return <Loader />

  switch (step) {
    case LaunchStep.Review:
      return <LaunchReview handleNext={handleNext} />
    case LaunchStep.Strategy:
      return <LaunchStrategySelection handleNext={handleNextStrategy} handleBack={handleBack} />
    case LaunchStep.Fees:
      return <LaunchFees handleNext={handleNext} handleBack={handleBack} strategy={strategy} />
    case LaunchStep.Finalize:
      return <LaunchFinalize handleBack={handleBack} />
    default:
      return <LaunchReview handleNext={handleNext} />
  }
}
