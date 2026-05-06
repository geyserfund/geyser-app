import { captureException } from '@sentry/react'
import { useSetAtom } from 'jotai'
import { useCallback, useEffect, useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'

import { getPath } from '../../../shared/constants'
import {
  type UniqueProjectQueryInput,
  useCreateProjectMutation,
  useProjectActiveMatchingGetLazyQuery,
  useProjectAonGoalLazyQuery,
  useProjectPageBodyLazyQuery,
  useProjectPublishMutation,
  useProjectStatusUpdateMutation,
  useUpdateProjectMutation,
} from '../../../types'
import { isAllOrNothing } from '../../../utils'
import {
  normalizeProjectState,
  partialUpdateProjectAtom,
  projectAonGoalErrorAtom,
  projectAonGoalLoadingAtom,
  projectAtom,
  projectLoadingAtom,
  ProjectState,
} from '../state/projectAtom'
import { useCustomMutation } from './custom/useCustomMutation'

export type UseInitProjectProps = {
  /** Load project at hook invocation */
  load?: boolean
  /** Don't use together with projectName prop */
  projectId?: number
  /** Don't use together with projectId prop */
  projectName?: string
}

/**
 * Query, create, update, delete project for current Project context
 * @param load - Load project on mount
 */
export const useProjectAPI = (props?: UseInitProjectProps) => {
  const navigate = useNavigate()

  const location = useLocation()
  const params = useParams<{ projectName: string }>()
  const { projectName: projectNameParam } = params

  const launchModalShouldOpen = location.search.includes('launch')
  const draftModalShouldOpen = location.search.includes('draft')

  const setProject = useSetAtom(projectAtom)
  const setProjectLoading = useSetAtom(projectLoadingAtom)
  const setProjectAonGoalLoading = useSetAtom(projectAonGoalLoadingAtom)
  const setProjectAonGoalError = useSetAtom(projectAonGoalErrorAtom)
  const partialUpdateProject = useSetAtom(partialUpdateProjectAtom)

  const { load, projectId, projectName } = props || {}

  const [queryProject, queryProjectOptions] = useProjectPageBodyLazyQuery()
  const [queryProjectAonGoal] = useProjectAonGoalLazyQuery()
  const [queryProjectActiveMatching] = useProjectActiveMatchingGetLazyQuery()
  const aonGoalRequestIdRef = useRef(0)
  const activeMatchingRequestIdRef = useRef(0)

  const queryProjectAonGoalMethod = useCallback(
    (where: UniqueProjectQueryInput) => {
      const aonGoalRequestId = ++aonGoalRequestIdRef.current
      setProjectAonGoalLoading(true)
      setProjectAonGoalError(null)

      queryProjectAonGoal({
        variables: {
          where,
        },
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      })
        .then(({ data: aonGoalData, error }) => {
          if (aonGoalRequestIdRef.current !== aonGoalRequestId) {
            return
          }

          setProjectAonGoalLoading(false)
          if (error) {
            setProjectAonGoalError(error)
            captureException(error, {
              tags: {
                'project-aon-goal': 'projectGet.aonGoal',
                'error.on': 'query error',
              },
            })
          }

          partialUpdateProject({ aonGoal: aonGoalData?.projectGet?.aonGoal ?? null })
        })
        .catch((error) => {
          if (aonGoalRequestIdRef.current !== aonGoalRequestId) {
            return
          }

          setProjectAonGoalLoading(false)
          setProjectAonGoalError(error)
          captureException(error, {
            tags: {
              'project-aon-goal': 'projectGet.aonGoal',
              'error.on': 'query error',
            },
          })
        })
    },
    [partialUpdateProject, queryProjectAonGoal, setProjectAonGoalError, setProjectAonGoalLoading],
  )

  const queryProjectMethod = useCallback(() => {
    queryProject({
      variables: {
        where: { name: projectName || projectNameParam, id: projectId },
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
        setProject(normalizeProjectState(project as ProjectState))

        if (isAllOrNothing(project)) {
          queryProjectAonGoalMethod({ name: projectName || projectNameParam, id: projectId })
        } else {
          setProjectAonGoalLoading(false)
          setProjectAonGoalError(null)
        }

        const activeMatchingRequestId = ++activeMatchingRequestIdRef.current
        queryProjectActiveMatching({
          variables: {
            where: { name: projectName || projectNameParam, id: projectId },
          },
          fetchPolicy: 'cache-and-network',
          errorPolicy: 'all',
          onCompleted(activeMatchingData) {
            if (activeMatchingRequestIdRef.current !== activeMatchingRequestId) {
              return
            }

            if (activeMatchingData?.projectGet) {
              partialUpdateProject({ activeMatching: activeMatchingData.projectGet.activeMatching })
            }
          },
          onError(error) {
            if (activeMatchingRequestIdRef.current !== activeMatchingRequestId) {
              return
            }

            captureException(error, {
              tags: {
                'project-matching': 'projectGet.activeMatching',
                'error.on': 'query error',
              },
            })
          },
        })
      },
    })
  }, [
    partialUpdateProject,
    queryProject,
    queryProjectActiveMatching,
    queryProjectAonGoalMethod,
    projectName,
    projectId,
    setProjectAonGoalError,
    setProjectAonGoalLoading,
    setProjectLoading,
    navigate,
    launchModalShouldOpen,
    draftModalShouldOpen,
    setProject,
    projectNameParam,
  ])

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
        if (isAllOrNothing(data.updateProject)) {
          queryProjectAonGoalMethod({ id: data.updateProject.id, name: data.updateProject.name })
        }
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
      queryProjectMethod()
    }
  }, [load, projectId, projectName, queryProjectMethod])

  return {
    queryProject: {
      execute: queryProjectMethod,
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
