import { ApolloQueryResult } from '@apollo/client'
import { useSetAtom } from 'jotai'

import { Exact, GetProjectRewardInput, ProjectRewardsQuery, useProjectRewardsQuery } from '../../../../types'
import { rewardsAtom } from '../../state/rewardsAtom'

type UseInitRewardsProps = {
  /** The id of the project */
  projectId: number | undefined
  /** If true, the query will not be executed */
  skip?: boolean
}

export type UseInitRewardsReturn = {
  /** Refetch Rewards for the Project in context */
  refetchProjectRewards: (
    variables?:
      | Partial<
          Exact<{
            input: GetProjectRewardInput
          }>
        >
      | undefined,
  ) => Promise<ApolloQueryResult<ProjectRewardsQuery>>
}

/** Fetch project rewards for project context */
export const useInitRewards = ({ projectId, skip }: UseInitRewardsProps): UseInitRewardsReturn => {
  const setRewards = useSetAtom(rewardsAtom)

  const { refetch: refetchProjectRewards } = useProjectRewardsQuery({
    fetchPolicy: 'cache-first',
    skip: !projectId || skip,
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

  return {
    refetchProjectRewards,
  }
}
