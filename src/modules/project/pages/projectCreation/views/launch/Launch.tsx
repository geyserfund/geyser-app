import { HStack, Spinner } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import { useState } from 'react'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { ProjectReviewFragment, useProjectLaunchReviewsQuery } from '@/types/index.ts'

import { projectReviewsAtom } from '../../states/projectReviewAtom.ts'
import { LaunchFinalize } from './views/LaunchFinalize.tsx'
import { LaunchReview } from './views/LaunchReview.tsx'

export const Launch = () => {
  const { project, loading: projectLoading } = useProjectAtom()
  const [showFinalize, setShowFinalize] = useState(false)
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

  if (projectLoading || reviewsLoading) {
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
