import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { useProjectRewardCreateMutation, useProjectRewardsLazyQuery, useRewardUpdateMutation } from '@/types'

import { useProjectAtom } from '../hooks/useProjectAtom'
import { projectAtom } from '../state/projectAtom'
import { addUpdateRewardsAtom, initialRewardsLoadAtom, rewardsAtom } from '../state/rewardsAtom'
import { useCustomMutation } from './custom/useCustomMutation'

/** Fetch project rewards for project context, pass true to fetch on render */
export const useProjectRewardsAPI = (load?: boolean) => {
  const setRewards = useSetAtom(rewardsAtom)
  const addUpdateRewards = useSetAtom(addUpdateRewardsAtom)

  const [initialRewardsLoad, setInitialRewardsLoad] = useAtom(initialRewardsLoadAtom)

  const { project, loading } = useProjectAtom()

  const [queryProjectRewards, queryProjectRewardsOptions] = useProjectRewardsLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      input: {
        where: {
          projectId: project.id,
        },
      },
    },
    onCompleted(data) {
      if (data?.projectRewardsGet) {
        setRewards(data?.projectRewardsGet)
        setInitialRewardsLoad(true)
      }
    },
  })

  const [createReward, createRewardOptions] = useCustomMutation(useProjectRewardCreateMutation, {
    onCompleted(data) {
      addUpdateRewards(data.projectRewardCreate)
    },
  })

  const [updateReward, updateRewardOptions] = useCustomMutation(useRewardUpdateMutation, {
    onCompleted(data) {
      addUpdateRewards(data.projectRewardUpdate)
    },
  })

  useEffect(() => {
    if (project.id && !loading && load && !initialRewardsLoad) {
      queryProjectRewards()
    }
  }, [project.id, load, loading, initialRewardsLoad, queryProjectRewards])

  return {
    queryProjectRewards: {
      execute: queryProjectRewards,
      ...queryProjectRewardsOptions,
    },
    createReward: {
      execute: createReward,
      ...createRewardOptions,
    },
    updateReward: {
      execute: updateReward,
      ...updateRewardOptions,
    },
  }
}
