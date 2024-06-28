import { LazyQueryExecFunction } from '@apollo/client'
import { captureException } from '@sentry/react'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getPath } from '../../../../constants'
import { Exact, ProjectPageBodyQuery, UniqueProjectQueryInput, useProjectPageBodyLazyQuery } from '../../../../types'
import { projectAtom, projectLoadingAtom, ProjectState } from '../../state/projectAtom'
import { useInitEntries, UseInitEntriesReturn } from './useInitEntries'
import { useInitGoals, UseInitGoalsReturn } from './useInitGoals'
import { useInitProjectDetails, UseInitProjectDetailsReturn } from './useInitProjectDetails'
import { useInitRewards, UseInitRewardsReturn } from './useInitRewards'
import { useInitWallet, UseInitWalletReturn } from './useInitWallet'

export type UseInitProjectProps = {
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
  /** Pass true, if we want posts to be initialized */
  initializeEntries?: boolean
  /** Pass true, if we want project details to be initialized */
  initializeDetails?: boolean
}

export type UseInitProjectReturn = {
  /** Query Project Data for the Project in context */
  queryProject: LazyQueryExecFunction<
    ProjectPageBodyQuery,
    Exact<{
      where: UniqueProjectQueryInput
    }>
  >
} & UseInitGoalsReturn &
  UseInitWalletReturn &
  UseInitRewardsReturn &
  UseInitEntriesReturn &
  UseInitProjectDetailsReturn

/**  Must be initialized before using project context */
export const useInitProject = ({
  projectId,
  projectName,
  initializeGoals,
  initializeWallet,
  initializeRewards,
  initializeEntries,
  initializeDetails,
}: UseInitProjectProps): UseInitProjectReturn => {
  const navigate = useNavigate()
  const [project, setProject] = useAtom(projectAtom)
  const setProjectLoading = useSetAtom(projectLoadingAtom)

  const [queryProject] = useProjectPageBodyLazyQuery({
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
      setProject(project as ProjectState)
    },
  })

  useEffect(() => {
    if (projectId || projectName) {
      queryProject()
    }
  }, [projectId, projectName, queryProject])

  const { queryCompletedGoals, queryInProgressGoals } = useInitGoals({
    projectId: project.id,
    skip: !initializeGoals,
  })

  const { queryProjectWallet } = useInitWallet({
    projectId: project.id,
    skip: !initializeWallet,
  })

  const { queryProjectRewards } = useInitRewards({
    projectId: project.id,
    skip: !initializeRewards,
  })

  const { queryProjectEntries, queryUnpublishedProjectEntries } = useInitEntries({
    projectId: project.id,
    skip: !initializeEntries,
  })

  const { queryProjectDetails } = useInitProjectDetails({
    projectId: project.id,
    skip: !initializeDetails,
  })

  return {
    queryProject,
    queryInProgressGoals,
    queryCompletedGoals,
    queryProjectWallet,
    queryProjectRewards,
    queryProjectEntries,
    queryUnpublishedProjectEntries,
    queryProjectDetails,
  }
}
