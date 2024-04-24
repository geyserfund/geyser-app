import React, { createContext, PropsWithChildren, useContext } from 'react'

import { FundingInput, FundingTxFragment, ProjectFragment } from '../../../types'
import { useFundingFlow } from '../funding/hooks/useFundingFlow'
import { useProjectContext } from './ProjectProvider'

type FundingContextProps = {
  fundingRequestErrored: Error | boolean
  fundingRequestLoading: boolean
  requestFunding: (input: FundingInput) => Promise<void>
  retryFundingFlow: () => void
  resetFundingFlow: () => void
  fundingTx: Omit<FundingTxFragment, 'funder'>
  error: string
  weblnErrored: boolean
  hasWebLN: boolean
  project?: Partial<ProjectFragment> | null
}

export const FundingContext = createContext<FundingContextProps>({} as FundingContextProps)

export const useFundingContext = () => useContext(FundingContext)

// This component is used to wrap the children of the FundingProvider
// It ensures there is a different scope for the atoms used in the funding flow

export const FundingProvider: React.FC<PropsWithChildren<{ project?: Partial<ProjectFragment> | null }>> = ({
  children,
  project,
}) => {
  const fundingFlow = useFundingFlow({ project })
  return <FundingContext.Provider value={{ ...fundingFlow, project }}>{children}</FundingContext.Provider>
}

export const FundingProviderWithProjectContext: React.FC<PropsWithChildren> = ({ children }) => {
  const { project } = useProjectContext()
  return <FundingProvider project={project}>{children}</FundingProvider>
}
