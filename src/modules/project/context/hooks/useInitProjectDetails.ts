import { LazyQueryExecFunction } from '@apollo/client'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

import {
  Exact,
  ProjectPageDetailsQuery,
  UniqueProjectQueryInput,
  useProjectPageDetailsLazyQuery,
} from '../../../../types'
import { partialUpdateProjectAtom, projectDetailsLoadingAtom } from '../../state/projectAtom'

type UseInitProjectDetailsProps = {
  /** The id of the project */
  projectId: number | undefined
  /** If true, the query will not be executed */
  skip?: boolean
}

export type UseInitProjectDetailsReturn = {
  /** Query Project Details for the Project in context */
  queryProjectDetails: LazyQueryExecFunction<
    ProjectPageDetailsQuery,
    Exact<{
      where: UniqueProjectQueryInput
    }>
  >
}

/**  /** Fetch project details for project context */
export const useInitProjectDetails = ({ projectId, skip }: UseInitProjectDetailsProps): UseInitProjectDetailsReturn => {
  const partialUpdateProject = useSetAtom(partialUpdateProjectAtom)
  const setProjectDetailsLoading = useSetAtom(projectDetailsLoadingAtom)

  const [queryProjectDetails] = useProjectPageDetailsLazyQuery({
    variables: {
      where: { id: projectId },
    },
    fetchPolicy: 'cache-first',
    onError() {
      setProjectDetailsLoading(false)
    },
    onCompleted(data) {
      setProjectDetailsLoading(false)
      if (!data.projectGet) {
        return
      }

      const { projectGet: project } = data
      partialUpdateProject(project)
    },
  })

  useEffect(() => {
    if (projectId && !skip) {
      queryProjectDetails()
    }
  }, [projectId, skip, queryProjectDetails])

  return {
    queryProjectDetails,
  }
}
