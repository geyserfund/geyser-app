import { isManagedCircularGrantProject } from '@/modules/project/domain/managedCircularGrant.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { isAllOrNothing } from '@/utils/index.ts'

import { AonProjectBalanceDisplay } from './AonProjectBalanceDisplay.tsx'
import { ManagedCircularGrantBalanceDisplay } from './ManagedCircularGrantBalanceDisplay.tsx'
import { TiaProjectBalanceDisplay } from './TiaProjectBalanceDisplay.tsx'

export const ProjectBalanceDisplay = () => {
  const { project } = useProjectAtom()

  if (isAllOrNothing(project)) {
    return <AonProjectBalanceDisplay />
  }

  if (isManagedCircularGrantProject(project)) {
    return <ManagedCircularGrantBalanceDisplay />
  }

  return <TiaProjectBalanceDisplay />
}
