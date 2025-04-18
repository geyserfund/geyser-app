import { captureException } from '@sentry/react'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { getPath } from '../../../shared/constants'
import {
  useCreateProjectMutation,
  useProjectPageBodyLazyQuery,
  useProjectPublishMutation,
  useProjectStatusUpdateMutation,
  useUpdateProjectMutation,
} from '../../../types'
import { partialUpdateProjectAtom, projectAtom, projectLoadingAtom, ProjectState } from '../state/projectAtom'
import { useCustomMutation } from './custom/useCustomMutation'
import { useProjectWalletAPI } from './useProjectWalletAPI'

export type UseInitProjectProps = {
  /** Load project at hook invocation */
  load?: boolean
  /** Don't use together with projectName prop */
  projectId?: number
  /** Don't use together with projectId prop */
  projectName?: string
  /** Pass true, if we want wallet to be initialized */
  initializeWallet?: boolean
}

/**
 * Query, create, update, delete project for current Project context
 * @param load - Load project on mount
 */
export const useProjectAPI = (props?: UseInitProjectProps) => {
  const navigate = useNavigate()

  const location = useLocation()

  const launchModalShouldOpen = location.search.includes('launch')
  const draftModalShouldOpen = location.search.includes('draft')

  const setProject = useSetAtom(projectAtom)
  const setProjectLoading = useSetAtom(projectLoadingAtom)
  const partialUpdateProject = useSetAtom(partialUpdateProjectAtom)

  const { load, projectId, projectName, initializeWallet } = props || {}

  const [queryProject, queryProjectOptions] = useProjectPageBodyLazyQuery({
    variables: {
      where: { name: projectName, id: projectId },
    },
    fetchPolicy: launchModalShouldOpen || draftModalShouldOpen ? 'network-only' : 'cache-and-network',
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

  const [createProject, createProjectOptions] = useCustomMutation(useCreateProjectMutation, {
    onCompleted({ createProject }) {
      if (createProject && createProject.owners[0]) {
        partialUpdateProject(createProject)
      }
    },
  })

  const [updateProject, updateProjectOptions] = useCustomMutation(useUpdateProjectMutation, {
    onCompleted(data) {
      if (data.updateProject) {
        partialUpdateProject(data.updateProject)
      }
    },
  })

  const [updateProjectStatus, updateProjectStatusOptions] = useCustomMutation(useProjectStatusUpdateMutation, {
    onCompleted(data) {
      if (data.projectStatusUpdate) {
        partialUpdateProject(data.projectStatusUpdate)
      }
    },
  })

  const [publishProject, publishProjectOptions] = useCustomMutation(useProjectPublishMutation, {
    onCompleted(data) {
      if (data.projectPublish) {
        partialUpdateProject(data.projectPublish)
      }
    },
  })

  useEffect(() => {
    if (load && (projectId || projectName)) {
      queryProject()
    }
  }, [load, projectId, projectName, queryProject])

  useProjectWalletAPI(initializeWallet)

  return {
    queryProject: {
      execute: queryProject,
      ...queryProjectOptions,
    },
    createProject: {
      execute: createProject,
      ...createProjectOptions,
    },
    updateProject: {
      execute: updateProject,
      ...updateProjectOptions,
    },
    publishProject: {
      execute: publishProject,
      ...publishProjectOptions,
    },
    updateProjectStatus: {
      execute: updateProjectStatus,
      ...updateProjectStatusOptions,
    },
  }
}
