import { useAtomValue } from 'jotai'

import { projectAffiliateAtom } from '../../pages/projectView/state/affiliateAtom'

export const useProjectAffiliateWithProjectName = (projectName?: string) => {
  const projectAffiliates = useAtomValue(projectAffiliateAtom)

  if (!projectName) return undefined

  const currentProjectAffiliate = projectAffiliates.find((r) => r.projectName === projectName)

  if (!currentProjectAffiliate) return undefined

  return currentProjectAffiliate.refId
}
