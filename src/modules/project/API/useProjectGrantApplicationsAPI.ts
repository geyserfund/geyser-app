import { useAtom, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { ProjectGrantApplicationsWhereInputEnum, useProjectGrantApplicationsLazyQuery } from '../../../types'
import { useProjectAtom } from '../hooks/useProjectAtom'
import { initialProjectGrantApplicationsLoadAtom, partialUpdateProjectAtom } from '../state/projectAtom'

/**
 * Query project grant applications for project context
 * @param load - Load project grant applications on mount
 */
export const useProjectGrantApplicationsAPI = (load?: boolean) => {
  const partialUpdateProject = useSetAtom(partialUpdateProjectAtom)
  const [initialProjectGrantApplicationsLoad, setInitialProjectGrantApplicationsLoad] = useAtom(
    initialProjectGrantApplicationsLoadAtom,
  )

  const { project, loading } = useProjectAtom()

  const [queryProjectGrantApplications, queryProjectGrantApplicationsOptions] = useProjectGrantApplicationsLazyQuery({
    variables: {
      where: { id: project.id },
      input: {
        where: {
          grantStatus: ProjectGrantApplicationsWhereInputEnum.FundingOpen,
        },
      },
    },
    fetchPolicy: 'cache-first',

    onCompleted(data) {
      if (!data.projectGet) {
        return
      }

      partialUpdateProject(data.projectGet)
      setInitialProjectGrantApplicationsLoad(true)
    },
  })

  useEffect(() => {
    if (project.id && !loading && load && !initialProjectGrantApplicationsLoad) {
      queryProjectGrantApplications()
    }
  }, [project.id, loading, load, queryProjectGrantApplications, initialProjectGrantApplicationsLoad])

  return {
    queryProjectGrantApplications: {
      execute: queryProjectGrantApplications,
      ...queryProjectGrantApplicationsOptions,
    },
  }
}
