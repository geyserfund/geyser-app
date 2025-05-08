import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { historyRouteAtom } from '@/config/routes/state/historyRouteAtom.ts'
import { getPath } from '@/shared/constants/index.ts'

import { followModalAtom } from '../state/followModalAtom.ts'
import { userFollowsProjectAtom } from '../state/projectAtom.ts'
import { useProjectAtom } from './useProjectAtom.ts'

export const useFollowOnBackModal = () => {
  const { project } = useProjectAtom()

  const setEnableFollowModal = useSetAtom(followModalAtom)
  const userFollowsProject = useAtomValue(userFollowsProjectAtom)

  const history = useAtomValue(historyRouteAtom)

  const recentHistory = history[history.length - 2]
  const currentHistory = history[history.length - 1]

  const isContributeTheLastRoute =
    recentHistory === getPath('projectFunding', project?.name) &&
    !currentHistory?.includes(getPath('projectFunding', project?.name))

  useEffect(() => {
    if (isContributeTheLastRoute && !userFollowsProject) {
      setEnableFollowModal(true)
    }
  }, [isContributeTheLastRoute, setEnableFollowModal, userFollowsProject])
}
