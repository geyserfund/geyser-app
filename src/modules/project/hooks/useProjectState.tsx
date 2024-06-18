import { QueryHookOptions } from '@apollo/client'
import { useAtomValue, useSetAtom } from 'jotai'

import {
  ProjectByNameOrIdQuery,
  ProjectByNameOrIdQueryVariables,
  UpdateProjectInput,
  useProjectByNameOrIdQuery,
  useUpdateProjectMutation,
} from '../../../types'
import { linkToHttps, toInt, useNotification } from '../../../utils'
import {
  baseProjectAtom,
  diffProjectAtom,
  partialUpdateProjectAtom,
  projectAtom,
  syncProjectAtom,
} from '../state/projectAtom'

export const useProjectState = (
  projectId?: string | number,
  options?: QueryHookOptions<ProjectByNameOrIdQuery, ProjectByNameOrIdQueryVariables>,
  type: 'name' | 'id' = 'name',
) => {
  const { toast } = useNotification()

  const project = useAtomValue(projectAtom)
  const baseProject = useAtomValue(baseProjectAtom)

  const updateProject = useSetAtom(partialUpdateProjectAtom)
  const syncProject = useSetAtom(syncProjectAtom)

  const [isDiff, diffKeys] = useAtomValue(diffProjectAtom)

  const idType = type === 'name' && typeof projectId === 'string' ? 'name' : 'id'
  const invalidId = idType === 'name' && String(projectId).length < 3

  const { loading, error, refetch } = useProjectByNameOrIdQuery({
    variables: {
      where: {
        [idType]: type === 'name' ? projectId : toInt(projectId),
      },
    },
    skip: !projectId || invalidId,
    ...options,
    onCompleted(data) {
      const { projectGet } = data
      if (projectGet) {
        syncProject(projectGet)
      }

      if (options?.onCompleted) {
        options?.onCompleted(data)
      }
    },
  })

  const [updateProjectMutation, { loading: saving }] = useUpdateProjectMutation({
    onError() {
      toast({
        status: 'error',
        title: 'failed to update project',
      })
    },
    onCompleted(data) {
      if (data.updateProject) {
        syncProject({ ...baseProject, ...data.updateProject })
      }
    },
  })

  const saveProject = async () => {
    if (!isDiff || !diffKeys || !project) {
      return
    }

    const input = {} as UpdateProjectInput

    diffKeys.map((key) => {
      if (key === 'location') {
        input.countryCode = project.location?.country?.code
        input.region = project.location?.region
        return
      }

      if (key === 'links') {
        input.links = project.links.filter((link) => link).map((link) => linkToHttps(link))
        return
      }

      input[key as keyof UpdateProjectInput] = project[key]
    })
    input.projectId = toInt(project.id)

    await updateProjectMutation({ variables: { input } })
  }

  return {
    loading,
    error,
    saving,
    project,
    updateProject,
    saveProject,
    refetch,
    isDirty: isDiff,
  }
}
