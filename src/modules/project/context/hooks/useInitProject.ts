import { ApolloQueryResult } from '@apollo/client'
import { captureException } from '@sentry/react'
import { useAtom, useSetAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'

import { getPath } from '../../../../constants'
import { Exact, ProjectPageBodyQuery, UniqueProjectQueryInput, useProjectPageBodyQuery } from '../../../../types'
import { projectAtom, projectLoadingAtom } from '../../state/projectAtom'
import { useInitGoals, UseInitGoalsReturn } from './useInitGoals'
import { useInitRewards, UseInitRewardsReturn } from './useInitRewards'
import { useInitWallet, UseInitWalletReturn } from './useInitWallet'

type UseInitProjectProps = {
  /** Don't use together with projectName prop */
  projectId?: number
  /** Don't use together with projectId prop */
  projectName?: string
  /** Pass true, if we want goals project goals to be initialized */
  initializeGoals?: boolean
  /** Pass true, if we want wallet to be initialized */
  initializeWallet?: boolean
  /** Pass true, if we want rewards to be initialized */
  initializeRewards?: boolean
}

export type UseInitProjectReturn = {
  /** Refetch Project Data for the Project in context */
  refetchProject: (
    variables?:
      | Partial<
          Exact<{
            where: UniqueProjectQueryInput
          }>
        >
      | undefined,
  ) => Promise<ApolloQueryResult<ProjectPageBodyQuery>>
} & UseInitGoalsReturn &
  UseInitWalletReturn &
  UseInitRewardsReturn

/**  Must be initialized before using project context */
export const useInitProject = ({
  projectId,
  projectName,
  initializeGoals,
  initializeWallet,
  initializeRewards,
}: UseInitProjectProps): UseInitProjectReturn => {
  const navigate = useNavigate()
  const [project, setProject] = useAtom(projectAtom)
  const setProjectLoading = useSetAtom(projectLoadingAtom)

  const { refetch: refetchProject } = useProjectPageBodyQuery({
    variables: {
      where: { name: projectName, id: projectId },
    },

    fetchPolicy: 'cache-first',
    onError(error) {
      setProjectLoading(false)
      captureException(error, {
        tags: {
          'not-found': 'projectGet',
          'error.on': 'query error',
        },
      })
      navigate(getPath('projectNotFound'))
    },
    onCompleted(data) {
      setProjectLoading(false)

      if (!data?.projectGet) {
        captureException(data, {
          tags: {
            'not-found': 'projectGet',
            'error.on': 'invalid data',
          },
        })
        navigate(getPath('projectNotFound'))
        return
      }

      const { projectGet: project } = data
      setProject(project)
    },
  })

  const { refetchCompletedGoals, refetchInProgressGoals } = useInitGoals({
    projectId: project.id,
    skip: !initializeGoals,
  })

  const { refetchProjectWallet } = useInitWallet({
    projectId: project.id,
    skip: !initializeWallet,
  })

  const { refetchProjectRewards } = useInitRewards({
    projectId: project.id,
    skip: !initializeRewards,
  })

  return {
    refetchProject,
    refetchInProgressGoals,
    refetchCompletedGoals,
    refetchProjectWallet,
    refetchProjectRewards,
  }
}
