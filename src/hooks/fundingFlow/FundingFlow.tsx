import { useAtom } from 'jotai'
import { ScopeProvider } from 'jotai-scope'
import React, { PropsWithChildren } from 'react'

import { authUserAtom } from '../../pages/auth/state'
import { fundingTxEffect } from './state/fundingTxAtom'

// This component is used to wrap the children of the FundingFlowProvider
// It ensures there is a different scope for the atoms used in the funding flow

export const FundingFlow: React.FC<PropsWithChildren> = ({ children }) => {
  useAtom(fundingTxEffect)

  // To enable access of atoms outside the scope, we need to add the atoms that need to be acessed outside the scope
  return <ScopeProvider atoms={[authUserAtom]}>{children}</ScopeProvider>
}
