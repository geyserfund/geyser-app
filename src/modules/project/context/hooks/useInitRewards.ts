import { LazyQueryExecFunction } from '@apollo/client'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { Exact, GetProjectRewardInput, ProjectRewardsQuery, useProjectRewardsLazyQuery } from '../../../../types'
import { rewardsAtom } from '../../state/rewardsAtom'

type UseInitRewardsProps = {
  /** The id of the project */
  projectId: number | undefined
  /** If true, the query will not be executed */
  skip?: boolean
}

export type UseInitRewardsReturn = {
  /** Query Rewards for the Project in context */
  queryProjectRewards: LazyQueryExecFunction<
    ProjectRewardsQuery,
    Exact<{
      input: GetProjectRewardInput
    }>
  >
}

/** Fetch project rewards for project context */
export const useInitRewards = ({ projectId, skip }: UseInitRewardsProps): UseInitRewardsReturn => {
  const setRewards = useSetAtom(rewardsAtom)

  const [queryProjectRewards] = useProjectRewardsLazyQuery({
    fetchPolicy: 'cache-first',

    notifyOnNetworkStatusChange: true,
    variables: {
      input: {
        where: {
          projectId,
        },
      },
    },
    onCompleted(data) {
      if (data?.projectRewardsGet) {
        setRewards(data?.projectRewardsGet)
      }
    },
  })

  useEffect(() => {
    if (projectId && !skip) {
      queryProjectRewards()
    }
  }, [projectId, skip, queryProjectRewards])

  return {
    queryProjectRewards,
  }
}
