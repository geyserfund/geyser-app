import { LazyQueryExecFunction } from '@apollo/client'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { Exact, ProjectPageDetailsQuery, UniqueProjectQueryInput, useProjectPageDetailsLazyQuery } from '../../../types'
import { initialProjectDetailsLoadAtom, partialUpdateProjectAtom, projectAtom } from '../state/projectAtom'

export type UseInitProjectDetailsReturn = {
  /** Query Project Details for the Project in context */
  queryProjectDetails: LazyQueryExecFunction<
    ProjectPageDetailsQuery,
    Exact<{
      where: UniqueProjectQueryInput
    }>
  >
  /** If the project details query is loading */
  projectDetailsLoading?: boolean
}

/**  /** Fetch project details for project context */
export const useInitProjectDetails = (load?: boolean): UseInitProjectDetailsReturn => {
  const partialUpdateProject = useSetAtom(partialUpdateProjectAtom)
  const [initialProjectDetailsLoad, setInitialProjectDetailsLoad] = useAtom(initialProjectDetailsLoadAtom)

  const { id: projectId } = useAtomValue(projectAtom)

  const [queryProjectDetails, { loading: projectDetailsLoading }] = useProjectPageDetailsLazyQuery({
    variables: {
      where: { id: projectId },
    },
    fetchPolicy: 'cache-first',

    onCompleted(data) {
      if (!data.projectGet) {
        return
      }

      const { projectGet: project } = data
      partialUpdateProject(project)
      setInitialProjectDetailsLoad(true)
    },
  })

  useEffect(() => {
    if (projectId && load && !initialProjectDetailsLoad) {
      queryProjectDetails()
    }
  }, [projectId, load, queryProjectDetails, initialProjectDetailsLoad])

  return {
    queryProjectDetails,
    projectDetailsLoading,
  }
}
