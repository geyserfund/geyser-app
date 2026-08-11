import { Navigate, Outlet, useLocation, useParams } from 'react-router'

import { TEMPORARY_BOLTZ_CONTINGENCY_ENABLED } from '@/modules/project/constants/temporaryBoltzContingency.ts'
import { isManagedRecoverableGrantProject } from '@/modules/project/domain/managedRecoverableGrant.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'

export const LaunchPayment = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const { project } = useProjectAtom()
  const location = useLocation()
  const directPaymentPath = getPath('launchPayment', projectId || 'new')

  if (isManagedRecoverableGrantProject(project)) {
    return <Navigate to={getPath('launchFinalize', project?.id || projectId || 'new')} replace />
  }

  if (TEMPORARY_BOLTZ_CONTINGENCY_ENABLED && location.pathname !== directPaymentPath) {
    return <Navigate to={directPaymentPath} replace />
  }

  return <Outlet />
}
