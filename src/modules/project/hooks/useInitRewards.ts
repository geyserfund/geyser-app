import { LazyQueryExecFunction } from '@apollo/client'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { Exact, GetProjectRewardInput, ProjectRewardsQuery, useProjectRewardsLazyQuery } from '@/types'

import { projectAtom } from '../state/projectAtom'
import { rewardsAtom } from '../state/rewardsAtom'

export type UseInitRewardsReturn = {
  /** Query Rewards for the Project in context */
  queryProjectRewards: LazyQueryExecFunction<
    ProjectRewardsQuery,
    Exact<{
      input: GetProjectRewardInput
    }>
  >
  /** If the query is loading */
  rewardsLoading: boolean
}

/** Fetch project rewards for project context, pass true to fetch on render */
export const useInitRewards = (load?: boolean): UseInitRewardsReturn => {
  const setRewards = useSetAtom(rewardsAtom)
  const { id: projectId } = useAtomValue(projectAtom)

  const [queryProjectRewards, { loading: rewardsLoading }] = useProjectRewardsLazyQuery({
    fetchPolicy: 'network-only',
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
    if (projectId && load) {
      queryProjectRewards()
    }
  }, [projectId, load, queryProjectRewards])

  return {
    queryProjectRewards,
    rewardsLoading,
  }
}
