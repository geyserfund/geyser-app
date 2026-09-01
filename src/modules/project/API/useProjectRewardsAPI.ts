import { useAtom, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { useProjectRewardsLazyQuery } from '@/types'

import { useProjectAtom } from '../hooks/useProjectAtom'
import { initialRewardsLoadAtom, initialRewardsLoadingAtom, rewardsAtom } from '../state/rewardsAtom'

/**
 * Query project rewards for the current Project context.
 * @param load - Load rewards on mount
 */
export const useProjectRewardsAPI = (load?: boolean) => {
  const setRewards = useSetAtom(rewardsAtom)
  const setInitialRewardsLoading = useSetAtom(initialRewardsLoadingAtom)

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

      setInitialRewardsLoading(false)
    },
    onError() {
      setInitialRewardsLoading(false)
    },
  })

  useEffect(() => {
    if (project.id && !loading && load && !initialRewardsLoad) {
      setInitialRewardsLoading(true)
      queryProjectRewards()
    }
  }, [project.id, load, loading, initialRewardsLoad, queryProjectRewards, setInitialRewardsLoading])

  return {
    queryProjectRewards: {
      execute: queryProjectRewards,
      ...queryProjectRewardsOptions,
    },
  }
}
