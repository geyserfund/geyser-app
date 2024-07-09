import { useAtomValue } from 'jotai'

import { refferalAtom } from '../../pages/projectView/state/affiliateAtom'

export const useRefferalWithProjectName = (projectName?: string) => {
  const refferals = useAtomValue(refferalAtom)

  if (!projectName) return undefined

  const currentRefferal = refferals.find((r) => r.projectName === projectName)

  if (!currentRefferal) return undefined

  return currentRefferal.refId
}
