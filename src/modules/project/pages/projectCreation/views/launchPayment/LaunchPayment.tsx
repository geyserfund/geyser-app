import { Navigate, Outlet, useLocation, useParams } from 'react-router'

import { TEMPORARY_BOLTZ_CONTINGENCY_ENABLED } from '@/modules/project/constants/temporaryBoltzContingency.ts'
import { getPath } from '@/shared/constants/index.ts'

export const LaunchPayment = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const location = useLocation()
  const directPaymentPath = getPath('launchPayment', projectId || 'new')

  if (TEMPORARY_BOLTZ_CONTINGENCY_ENABLED && location.pathname !== directPaymentPath) {
    return <Navigate to={directPaymentPath} replace />
  }

  return <Outlet />
}
