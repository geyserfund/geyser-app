import { Navigate } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { getPath } from '@/shared/constants/index.ts'

export const ActivityDirection = () => {
  const { isLoggedIn } = useAuthContext()

  if (isLoggedIn) {
    return <Navigate to={getPath('discoveryActivityFollowed')} replace />
  }

  return <Navigate to={getPath('discoveryActivityGlobal')} replace />
}
