import { useAtom, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import {
  useProjectRewardCreateMutation,
  useProjectRewardsLazyQuery,
  useRewardDeleteMutation,
  useRewardUpdateMutation,
} from '@/types'

import { useProjectAtom } from '../hooks/useProjectAtom'
import { addUpdateRewardsAtom, deleteRewardAtom, initialRewardsLoadAtom, rewardsAtom } from '../state/rewardsAtom'
import { useCustomMutation } from './custom/useCustomMutation'

/**
 * Query, Create, Update, Delete project rewards for current Project context
 * @param load - Load rewards on mount
 */
export const useProjectRewardsAPI = (load?: boolean) => {
  const setRewards = useSetAtom(rewardsAtom)
  const addUpdateRewards = useSetAtom(addUpdateRewardsAtom)
  const removeReward = useSetAtom(deleteRewardAtom)

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
    onCompleted(data, clientOptions) {
      addUpdateRewards(data.projectRewardUpdate)
      removeReward(clientOptions?.variables?.input?.projectRewardId)
    },
  })

  const [deleteReward, deleteRewardOptions] = useCustomMutation(useRewardDeleteMutation, {
    onCompleted(_, clientOptions) {
      if (clientOptions?.variables?.projectRewardId) {
        removeReward(clientOptions?.variables?.projectRewardId)
      }
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
    deleteReward: {
      execute: deleteReward,
      ...deleteRewardOptions,
    },
  }
}
