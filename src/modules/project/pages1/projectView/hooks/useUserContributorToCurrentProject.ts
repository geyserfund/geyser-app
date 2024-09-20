import { useEffect, useState } from 'react'

import { useAuthContext } from '@/context'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import {
  ContributionSummaryPeriod,
  ProjectLeaderboardContributorsFragment,
  useProjectUserContributorQuery,
} from '@/types'

export const useUserContributorToCurrentProject = ({
  funders = [],
  period,
}: {
  funders?: ProjectLeaderboardContributorsFragment[]
  period?: ContributionSummaryPeriod
} = {}) => {
  const { user } = useAuthContext()
  const { project } = useProjectAtom()

  const [skipIndividualUser, setSkipIndividualUser] = useState(true)

  useEffect(() => {
    if (funders.length > 0 && user.id && !funders.some((funder) => funder?.user?.id === user.id)) {
      setSkipIndividualUser(false)
    } else {
      setSkipIndividualUser(true)
    }
  }, [funders, user.id])

  const {
    data,
    loading: userContributorLoading,
    refetch,
  } = useProjectUserContributorQuery({
    skip: !user.id || !project.id || skipIndividualUser,
    variables: {
      input: {
        projectId: project.id,
        userId: user.id,
      },
      period,
    },
  })

  const contributor = data?.contributor

  return {
    userContributor: contributor
      ? {
          user: contributor.user,
          funderId: contributor.id,
          contributionsTotal: contributor.contributionSummary?.contributionsTotal || 0,
          contributionsTotalUsd: contributor.contributionSummary?.contributionsTotalUsd || 0,
          contributionsCount: contributor.contributionSummary?.contributionsCount || 0,
          commentsCount: contributor.contributionSummary?.commentsCount || 0,
        }
      : undefined,
    userAllTimeRank: contributor?.rank,
    loading: userContributorLoading,
    refetch,
  }
}
