import { Navigate, useParams } from 'react-router'

import { getPath } from '@/shared/constants'

const GRANT_TO_IMPACT_FUND_NAME_MAP: Record<string, string> = {
  // Fill this map as legacy rounds are consolidated into impact funds.
}

export const LegacyGrantRedirectPage = () => {
  const { grantId } = useParams<{ grantId: string }>()

  const mappedName = grantId ? GRANT_TO_IMPACT_FUND_NAME_MAP[grantId] : undefined

  if (mappedName) {
    return <Navigate to={getPath('impactFunds', encodeURIComponent(mappedName))} replace />
  }

  return <Navigate to={getPath('impactFunds')} replace />
}
