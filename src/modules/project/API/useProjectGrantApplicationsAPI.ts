import { useAtom, useSetAtom } from 'jotai'

import {
  ProjectGrantApplicationsWhereInputEnum,
  useProjectGrantApplicationsLazyQuery,
  useProjectGrantApplicationsQuery,
} from '../../../types'
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

  useProjectGrantApplicationsQuery({
    skip: !project.id || loading || !load || initialProjectGrantApplicationsLoad,
    fetchPolicy: 'cache-first',
    variables: {
      where: { id: project.id },
      input: {
        where: {
          grantStatus: ProjectGrantApplicationsWhereInputEnum.FundingOpen,
        },
      },
    },
    onCompleted(data) {
      if (!data.projectGet) {
        return
      }

      partialUpdateProject(data.projectGet)
      setInitialProjectGrantApplicationsLoad(true)
    },
  })

  return {
    queryProjectGrantApplications: {
      execute: queryProjectGrantApplications,
      ...queryProjectGrantApplicationsOptions,
    },
  }
}
