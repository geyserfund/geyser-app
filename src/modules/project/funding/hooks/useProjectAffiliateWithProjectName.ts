import { useAtomValue } from 'jotai'

import { projectAffiliateAtom, ProjectAffiliateAtomType } from '../../pages1/projectView/state/affiliateAtom'

export const useProjectAffiliateWithProjectName = (projectName?: string) => {
  const projectAffiliates = useAtomValue(projectAffiliateAtom)

  return getRefIdFromProjectAffiliates(projectAffiliates, projectName)
}

export const getRefIdFromProjectAffiliates = (affiliates: ProjectAffiliateAtomType[], projectName?: string) => {
  if (!projectName) return undefined

  const currentProjectAffiliate = affiliates.find((r) => r.projectName === projectName)

  if (!currentProjectAffiliate) return undefined

  return currentProjectAffiliate.refId
}
