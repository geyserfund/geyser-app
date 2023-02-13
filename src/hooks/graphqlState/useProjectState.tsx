import { QueryHookOptions, useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'

import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../graphql'
import { MUTATION_UPDATE_PROJECT } from '../../graphql/mutations'
import { Project, UpdateProjectInput } from '../../types'
import { checkDiff, getDiff, toInt, useNotification } from '../../utils'

type TProjectVariables = {
  where?: {
    id?: Number
    name?: string
  }
}

type TProjectData = {
  project: Project
}

export const useProjectState = (
  projectId: string | number,
  options?: QueryHookOptions<TProjectData, TProjectVariables>,
  type: 'name' | 'id' = 'name',
) => {
  const { toast } = useNotification()

  const [project, setProject] = useState<Project>({} as Project)
  const [baseProject, setBaseProject] = useState<Project>({} as Project)

  const { loading } = useQuery<TProjectData, TProjectVariables>(
    QUERY_PROJECT_BY_NAME_OR_ID,
    {
      variables: {
        where: { [type]: type === 'name' ? projectId : toInt(projectId) },
      },
      ...options,
      onCompleted(data) {
        const { project } = data
        syncProject(project)
        if (options?.onCompleted) {
          options?.onCompleted(data)
        }
      },
    },
  )

  const [updateProjectMutation, { loading: saving }] = useMutation<
    { updateProject: Project },
    { input: UpdateProjectInput }
  >(MUTATION_UPDATE_PROJECT, {
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

  const syncProject = (project: Project) => {
    setProject(project)
    setBaseProject(project)
  }

  const updateProject = (value: Project) => {
    setProject({ ...project, ...value })
  }

  const saveProject = async () => {
    const [isDiff, diffKeys] = getDiff(project, baseProject, [
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
    ])

    if (!isDiff) {
      return
    }

    const input = {} as UpdateProjectInput

    diffKeys.map((key) => {
      if (key === 'location') {
        input.countryCode = project.location?.country?.code
        input.region = project.location?.region
        return
      }

      input[key as keyof UpdateProjectInput] = project[key]
    })
    input.projectId = toInt(project.id)

    await updateProjectMutation({ variables: { input } })
  }

  return { loading, saving, project, updateProject, saveProject }
}
