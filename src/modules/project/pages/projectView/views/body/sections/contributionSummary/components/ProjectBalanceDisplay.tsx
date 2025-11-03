import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { isAllOrNothing } from '@/utils/index.ts'

import { AonProjectBalanceDisplay } from './AonProjectBalanceDisplay.tsx'
import { TiaProjectBalanceDisplay } from './TiaProjectBalanceDisplay.tsx'

export const ProjectBalanceDisplay = () => {
  const {project} = useProjectAtom()

 if (isAllOrNothing(project)) {
  return <AonProjectBalanceDisplay />
 }
 return <TiaProjectBalanceDisplay />

}

