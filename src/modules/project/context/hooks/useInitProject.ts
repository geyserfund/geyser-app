import { LazyQueryExecFunction } from '@apollo/client'
import { captureException } from '@sentry/react'
import { useAtom, useSetAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getPath } from '../../../../constants'
import { Exact, ProjectPageBodyQuery, UniqueProjectQueryInput, useProjectPageBodyLazyQuery } from '../../../../types'
import { projectAtom, projectLoadingAtom, ProjectState, useProjectReset } from '../../state/projectAtom'
import { useInitWallet, UseInitWalletReturn } from './useInitWallet'

export type UseInitProjectProps = {
  /** Don't use together with projectName prop */
  projectId?: number
  /** Don't use together with projectId prop */
  projectName?: string
  /** Pass true, if we want wallet to be initialized */
  initializeWallet?: boolean
}

export type UseInitProjectReturn = {
  /** Query Project Data for the Project in context */
  queryProject: LazyQueryExecFunction<
    ProjectPageBodyQuery,
    Exact<{
      where: UniqueProjectQueryInput
    }>
  >
} & UseInitWalletReturn

/**  Must be initialized before using project context */
export const useInitProject = ({
  projectId,
  projectName,
  initializeWallet,
}: UseInitProjectProps): UseInitProjectReturn => {
  const navigate = useNavigate()
  const [project, setProject] = useAtom(projectAtom)
  const setProjectLoading = useSetAtom(projectLoadingAtom)

  const resetProject = useProjectReset()

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
      resetProject()
      queryProject()
    }
  }, [projectId, projectName, queryProject, resetProject])

  const { queryProjectWallet } = useInitWallet({
    projectId: project.id,
    skip: !initializeWallet,
  })

  return {
    queryProject,
    queryProjectWallet,
  }
}
