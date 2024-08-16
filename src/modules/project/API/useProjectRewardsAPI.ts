import { useAtom, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import {
  useProjectRewardCreateMutation,
  useProjectRewardsLazyQuery,
  useRewardDeleteMutation,
  useRewardUpdateMutation,
} from '@/types'

import { useProjectAtom } from '../hooks/useProjectAtom'
import { updateProjectItemCountsAtom } from '../state/projectAtom'
import { addUpdateRewardsAtom, deleteRewardAtom, initialRewardsLoadAtom, rewardsAtom } from '../state/rewardsAtom'
import { updateProjectItemCountCache } from './cache/projectBodyCache'
import { useCustomMutation } from './custom/useCustomMutation'

/**
 * Query, Create, Update, Delete project rewards for current Project context
 * @param load - Load rewards on mount
 */
export const useProjectRewardsAPI = (load?: boolean) => {
  const setRewards = useSetAtom(rewardsAtom)
  const addUpdateRewards = useSetAtom(addUpdateRewardsAtom)
  const removeReward = useSetAtom(deleteRewardAtom)

  const updateProjectItemCounts = useSetAtom(updateProjectItemCountsAtom)

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
      updateProjectItemCounts({ addReward: true })
    },
    update(cache, { data }) {
      if (data?.projectRewardCreate) {
        updateProjectItemCountCache(cache, {
          projectName: project.name,
          addReward: true,
        })
      }
    },
  })

  const [updateReward, updateRewardOptions] = useCustomMutation(useRewardUpdateMutation, {
    onCompleted(data, clientOptions) {
      addUpdateRewards(data.projectRewardUpdate)
      if (data.projectRewardUpdate.id !== clientOptions?.variables?.input?.projectRewardId) {
        removeReward(clientOptions?.variables?.input?.projectRewardId)
      }
    },
  })

  const [deleteReward, deleteRewardOptions] = useCustomMutation(useRewardDeleteMutation, {
    onCompleted(_, clientOptions) {
      if (clientOptions?.variables?.input?.projectRewardId) {
        removeReward(clientOptions?.variables?.input?.projectRewardId)
        updateProjectItemCounts({ removeReward: true })
      }
    },
    update(cache, { data }) {
      if (data?.projectRewardDelete) {
        updateProjectItemCountCache(cache, {
          projectName: project.name,
          removeReward: true,
        })
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
