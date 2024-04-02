import { useAtom } from 'jotai'
import { ScopeProvider } from 'jotai-scope'
import React, { createContext, PropsWithChildren, useContext } from 'react'

import { authUserAtom } from '../../../../pages/auth/state'
import { FundingInput, FundingTxFragment } from '../../../../types'
import { useFundingFlow } from '../hooks/useFundingFlow'
import { fundingTxEffect } from '../state/fundingTxAtom'

type FundingContextProps = {
  fundingRequestErrored: boolean
  fundingRequestLoading: boolean
  requestFunding: (input: FundingInput) => Promise<void>
  retryFundingFlow: () => void
  resetFundingFlow: () => void
  fundingTx: FundingTxFragment
  error: string
  weblnErrored: boolean
  hasWebLN: boolean
}

export const FundingContext = createContext<FundingContextProps>({} as FundingContextProps)

export const useFundingContext = () => useContext(FundingContext)

// This component is used to wrap the children of the FundingProvider
// It ensures there is a different scope for the atoms used in the funding flow

export const FundingProvider: React.FC<PropsWithChildren> = ({ children }) => {
  useAtom(fundingTxEffect)

  // To enable access of atoms outside the scope, we need to add the atoms that need to be acessed outside the scope
  return (
    <ScopeProvider atoms={[authUserAtom]}>
      <FundingContextProvider>{children}</FundingContextProvider>
    </ScopeProvider>
  )
}

export const FundingContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const fundingFlow = useFundingFlow()
  return <FundingContext.Provider value={{ ...fundingFlow }}>{children}</FundingContext.Provider>
}
