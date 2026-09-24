import { HStack, Spinner } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { isOpenFundingCreationProject } from '@/modules/project/domain/managedCircularGrant.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectReviewFragment, useProjectLaunchReviewsQuery } from '@/types/index.ts'

import { projectReviewsAtom } from '../../states/projectReviewAtom.ts'
import { LaunchFinalize } from './views/LaunchFinalize.tsx'
import { LaunchReview } from './views/LaunchReview.tsx'

export const Launch = () => {
  const navigate = useNavigate()
  const { project, loading: projectLoading } = useProjectAtom()
  const [showFinalize, setShowFinalize] = useState(false)
  const hasPaymentDetails = Boolean(
    project.directPaymentDetails?.btcAddress || project.directPaymentDetails?.lightningAddress,
  )

  useEffect(() => {
    if (!projectLoading && isOpenFundingCreationProject(project) && !hasPaymentDetails) {
      navigate(getPath('launchPaymentDetails', project.id), { replace: true })
    }
  }, [hasPaymentDetails, navigate, project, projectLoading])
  const setProjectReviews = useSetAtom(projectReviewsAtom)

  const { loading: reviewsLoading } = useProjectLaunchReviewsQuery({
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

  if (projectLoading || reviewsLoading || (isOpenFundingCreationProject(project) && !hasPaymentDetails)) {
    return (
      <HStack h="80%" minH="320px" justify="center" align="center">
        <Spinner size="xl" color="primary.400" />
      </HStack>
    )
  }

  if (showFinalize) {
    return <LaunchFinalize handleBack={() => setShowFinalize(false)} />
  }

  return <LaunchReview handleNext={() => setShowFinalize(true)} />
}
