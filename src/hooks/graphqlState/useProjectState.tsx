import { QueryHookOptions } from '@apollo/client'
import { useMemo, useState } from 'react'

import {
  ProjectByNameOrIdQuery,
  ProjectByNameOrIdQueryVariables,
  ProjectFragment,
  UpdateProjectInput,
  useProjectByNameOrIdQuery,
  useUpdateProjectMutation,
} from '../../types'
import { getDiff, toInt, useNotification } from '../../utils'

export const useProjectState = (
  projectId?: string | number,
  options?: QueryHookOptions<
    ProjectByNameOrIdQuery,
    ProjectByNameOrIdQueryVariables
  >,
  type: 'name' | 'id' = 'name',
) => {
  const { toast } = useNotification()

  const [project, setProject] = useState<ProjectFragment | null>(null)
  const [baseProject, setBaseProject] = useState<ProjectFragment>(
    {} as ProjectFragment,
  )

  const idType =
    type === 'name' && typeof projectId === 'string' ? 'name' : 'id'

  const { loading, error } = useProjectByNameOrIdQuery({
    variables: {
      where: {
        [idType]: type === 'name' ? projectId : toInt(projectId),
      },
    },
    skip: !projectId,
    ...options,
    onCompleted(data) {
      const { project } = data
      if (project) {
        syncProject(project)
      }

      if (options?.onCompleted) {
        options?.onCompleted(data)
      }
    },
  })

  const [updateProjectMutation, { loading: saving }] = useUpdateProjectMutation(
    {
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
    },
  )

  const syncProject = (project: ProjectFragment) => {
    setProject(project)
    setBaseProject(project)
  }

  const updateProject = (value: Partial<ProjectFragment>) => {
    setProject((current) =>
      current ? { ...current, ...value } : { ...baseProject, ...value },
    )
  }

  const [isDiff, diffKeys] = useMemo(
    () =>
      project
        ? getDiff(project, baseProject, [
            'location',
            'description',
            'expiresAt',
            'fundingGoal',
            'image',
            'rewardCurrency',
            'shortDescription',
            'status',
            'thumbnailImage',
            'title',
            'links',
          ])
        : [],
    [baseProject, project],
  )

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
        input.links = project.links.filter((link) => link)
        return
      }

      input[key as keyof UpdateProjectInput] = project[key]
    })
    input.projectId = toInt(project.id)

    await updateProjectMutation({ variables: { input } })
  }

  console.log({ tags: project?.tags, project })

  return {
    loading,
    error,
    saving,
    project,
    updateProject,
    saveProject,
    isDirty: isDiff,
  }
}
