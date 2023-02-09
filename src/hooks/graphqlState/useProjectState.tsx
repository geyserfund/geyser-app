import { QueryHookOptions, useQuery } from '@apollo/client'
import { useCallback, useState } from 'react'

import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../graphql'
import { Project } from '../../types'
import { toInt } from '../../utils'
import { useListenerState } from '../useListenerState'

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
  const [project, setProject] = useState<Project>({} as Project)

  const { loading } = useQuery<TProjectData, TProjectVariables>(
    QUERY_PROJECT_BY_NAME_OR_ID,
    {
      variables: {
        where: { [type]: type === 'name' ? projectId : toInt(projectId) },
      },
      ...options,
      onCompleted(data) {
        const { project } = data
        setProject(project)
        if (options?.onCompleted) {
          options?.onCompleted(data)
        }
      },
    },
  )

  const updateProject = (value: Project) => {
    setProject({ ...project, ...value })
  }

  return { loading, project, updateProject }
}
