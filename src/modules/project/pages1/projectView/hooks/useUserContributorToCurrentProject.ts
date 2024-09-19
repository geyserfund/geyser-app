import { useEffect, useState } from 'react'

import { useAuthContext } from '@/context'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import {
  ProjectLeaderboardContributorsFragment,
  ProjectLeaderboardPeriod,
  useProjectLeaderboardContributorsGetQuery,
  useProjectUserContributorQuery,
} from '@/types'

export const useUserContributorToCurrentProject = ({
  funders = [],
  period,
}: {
  funders?: ProjectLeaderboardContributorsFragment[]
  period?: ProjectLeaderboardPeriod
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
    data: userContributorData,
    loading: userContributorLoading,
    refetch,
  } = useProjectUserContributorQuery({
    skip: !user.id || !project.id || skipIndividualUser,
    variables: {
      input: {
        projectId: project.id,
        userId: user.id,
      },
    },
  })

  const funderId = userContributorData?.contributor?.id

  const { data, loading: projectLeaderboardContributorLoading } = useProjectLeaderboardContributorsGetQuery({
    skip: !user.id || !project.id || !funderId || skipIndividualUser,
    variables: {
      input: {
        period: period || ProjectLeaderboardPeriod.AllTime,
        projectId: project.id,
        top: 1,
        funderId,
      },
    },
  })
  const userContributor = data?.projectLeaderboardContributorsGet?.[0]

  return {
    userContributor,
    userAllTimeRank: userContributorData?.contributor.rank,
    loading: userContributorLoading || projectLeaderboardContributorLoading,
    refetch,
  }
}
