import { Navigate, useParams } from 'react-router'

import { getPath } from '@/shared/constants/config/routerPaths.ts'

export const LegacyCreationPaymentRedirect = () => {
  const { projectId } = useParams<{ projectId: string }>()

  return <Navigate to={getPath('launchProjectDetails', projectId || 'new')} replace />
}
