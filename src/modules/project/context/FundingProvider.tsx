import React, { createContext, PropsWithChildren, useContext, useEffect } from 'react'

import { useFundingFormState, UseFundingFormStateReturn } from '../../../hooks'
import { FundingInput, FundingTxFragment, ProjectFragment, WalletLimitsFragment } from '../../../types'
import { useFundingFlow } from '../funding/hooks/useFundingFlow'
import { FundingFlowGraphQLError } from '../funding/state'
import { useProjectContext } from './ProjectProvider2'

type FundingContextProps = {
  fundingRequestErrored: Error | boolean
  fundingRequestLoading: boolean
  requestFunding: (input: FundingInput) => Promise<void>
  refetchFundingFlow: () => void
  retryFundingFlow: () => void
  resetFundingFlow: () => void
  fundingTx: Omit<FundingTxFragment, 'funder'>
  error?: FundingFlowGraphQLError
  weblnErrored: boolean
  hasWebLN: boolean
  project?: Partial<ProjectFragment> | null // Partial Project context, for usage inside fundingFlow, Only useful when ProjctProvider is not used
  limits?: WalletLimitsFragment | null
  fundForm: UseFundingFormStateReturn
  projectGoalId?: string | null
}

interface FundingProviderProps extends PropsWithChildren {
  project?: Partial<ProjectFragment> | null
  limits?: WalletLimitsFragment | null
  projectGoalId?: string | null
}

export const FundingContext = createContext<FundingContextProps>({} as FundingContextProps)

export const useFundingContext = () => useContext(FundingContext)

/** Used if the project context is not available */
export const FundingProvider = ({ children, project, limits, projectGoalId }: FundingProviderProps) => {
  const fundingFlow = useFundingFlow({ project, projectGoalId })

  const fundForm = useFundingFormState({
    rewards: project ? project.rewards : undefined,
    rewardCurrency: project && project.rewardCurrency ? project.rewardCurrency : undefined,
    walletLimits: limits?.contribution || ({} as any),
  })

  useEffect(() => {
    return () => {
      fundingFlow.resetFundingFlow()
      fundForm.resetForm()
    }
  }, [])

  return (
    <FundingContext.Provider value={{ ...fundingFlow, project, limits, fundForm }}>{children}</FundingContext.Provider>
  )
}

/** Used if the project context is available */
export const FundingProviderWithProjectContext: React.FC<PropsWithChildren> = ({ children }) => {
  const { project, walletLimits, goals } = useProjectContext()
  return (
    <FundingProvider project={project} limits={walletLimits} projectGoalId={goals.projectGoalId}>
      {children}
    </FundingProvider>
  )
}
