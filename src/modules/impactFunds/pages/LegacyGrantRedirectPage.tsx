import { Navigate, useParams } from 'react-router'

import { getPath } from '@/shared/constants'

const GRANT_TO_IMPACT_FUND_SLUG_MAP: Record<string, string> = {
  // Fill this map as legacy rounds are consolidated into impact funds.
}

export const LegacyGrantRedirectPage = () => {
  const { grantId } = useParams<{ grantId: string }>()

  const mappedSlug = grantId ? GRANT_TO_IMPACT_FUND_SLUG_MAP[grantId] : undefined

  if (mappedSlug) {
    return <Navigate to={getPath('impactFunds', mappedSlug)} replace />
  }

  return <Navigate to={getPath('impactFunds')} replace />
}
