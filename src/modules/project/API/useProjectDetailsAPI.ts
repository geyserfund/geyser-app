import { useAtom, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { useProjectPageDetailsLazyQuery } from '../../../types'
import { useProjectAtom } from '../hooks/useProjectAtom'
import { initialProjectDetailsLoadAtom, partialUpdateProjectAtom } from '../state/projectAtom'

/**
 * Query project details for project context
 * @param load - Load project details on mount
 */
export const useProjectDetailsAPI = (load?: boolean) => {
  const partialUpdateProject = useSetAtom(partialUpdateProjectAtom)
  const [initialProjectDetailsLoad, setInitialProjectDetailsLoad] = useAtom(initialProjectDetailsLoadAtom)

  const { project, loading } = useProjectAtom()

  const [queryProjectDetails, queryProjectDetailsOptions] = useProjectPageDetailsLazyQuery({
    variables: {
      where: { id: project.id },
    },
    fetchPolicy: 'cache-first',

    onCompleted(data) {
      if (!data.projectGet) {
        return
      }

      partialUpdateProject(data.projectGet)
      setInitialProjectDetailsLoad(true)
    },
  })

  useEffect(() => {
    console.log('project.id', project.id)
    console.log('loading', loading)
    console.log('load', load)
    console.log('initialProjectDetailsLoad', initialProjectDetailsLoad)
    if (project.id && !loading && load && !initialProjectDetailsLoad) {
      queryProjectDetails()
    }
  }, [project.id, loading, load, queryProjectDetails, initialProjectDetailsLoad])

  return {
    queryProjectDetails: {
      execute: queryProjectDetails,
      ...queryProjectDetailsOptions,
    },
  }
}
