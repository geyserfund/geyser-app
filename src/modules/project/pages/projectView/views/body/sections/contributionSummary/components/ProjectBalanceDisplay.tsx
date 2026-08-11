import { isManagedRecoverableGrantProject } from '@/modules/project/domain/managedRecoverableGrant.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { isAllOrNothing } from '@/utils/index.ts'

import { AonProjectBalanceDisplay } from './AonProjectBalanceDisplay.tsx'
import { ManagedRecoverableGrantBalanceDisplay } from './ManagedRecoverableGrantBalanceDisplay.tsx'
import { TiaProjectBalanceDisplay } from './TiaProjectBalanceDisplay.tsx'

export const ProjectBalanceDisplay = () => {
  const { project } = useProjectAtom()

  if (isAllOrNothing(project)) {
    return <AonProjectBalanceDisplay />
  }

  if (isManagedRecoverableGrantProject(project)) {
    return <ManagedRecoverableGrantBalanceDisplay />
  }

  return <TiaProjectBalanceDisplay />
}
