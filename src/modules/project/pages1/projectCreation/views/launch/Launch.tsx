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

enum LaunchStep {
  Review = 'review',
  Fees = 'fees',
  Finalize = 'finalize',
}

export const Launch = () => {
  const { project, loading: projectLoading } = useProjectAtom()
  const navigate = useNavigate()

  const [step, setStep] = useState<LaunchStep>(LaunchStep.Review)

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
        setStep(LaunchStep.Fees)
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
      setStep(LaunchStep.Review)
    }
  }, [step, project?.id, navigate])

  if (projectLoading || loading) return <Loader />

  switch (step) {
    case LaunchStep.Review:
      return <LaunchReview handleNext={handleNext} />
    case LaunchStep.Fees:
      return <LaunchFees handleNext={handleNext} handleBack={handleBack} />
    case LaunchStep.Finalize:
      return <LaunchFinalize handleBack={handleBack} />
    default:
      return <LaunchReview handleNext={handleNext} />
  }
}
